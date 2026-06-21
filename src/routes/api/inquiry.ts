import { createFileRoute } from "@tanstack/react-router";

// Server route: POST /api/inquiry
// Validates a form submission and stores it in the D1 `leads` table.
// Runs inside the same Cloudflare Worker that serves the site.

// `cloudflare:workers` is a workerd runtime built-in. Importing it at the top
// level breaks plain `vite dev` (and any non-Worker SSR), because the router
// loads every route module during SSR. We load it lazily inside the handler so
// the binding is only resolved in the real Worker; locally it returns {} and
// the handler falls back to its "not configured" paths.
type WorkerEnv = {
  DB?: D1Database;
  TURNSTILE_SECRET_KEY?: string;
  RESEND_API_KEY?: string;
  LEAD_NOTIFY_EMAIL?: string;
};

async function getWorkerEnv(): Promise<WorkerEnv> {
  try {
    const mod = await import("cloudflare:workers");
    return (mod.env as WorkerEnv) ?? {};
  } catch {
    return {};
  }
}

type InquiryBody = {
  type?: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  details?: Record<string, unknown>;
  turnstileToken?: string;
};

const VALID_TYPES = new Set(["lease", "demo", "newsletter"]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}

// Verify a Cloudflare Turnstile token. If no secret is configured, verification
// is skipped (returns true) so the forms keep working before keys are set up.
async function verifyTurnstile(
  token: string | undefined,
  ip: string | null,
  env: WorkerEnv,
): Promise<boolean> {
  const secret = env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured yet
  if (!token) return false;

  try {
    const form = new FormData();
    form.append("secret", secret);
    form.append("response", token);
    if (ip) form.append("remoteip", ip);

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: form,
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error("Turnstile verification failed", err);
    return false;
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Build a readable HTML summary of the submission for the notification email.
function buildEmailHtml(type: string, body: InquiryBody): string {
  const rows: Array<[string, string]> = [
    ["Type", type],
    ["Name", body.name ?? "—"],
    ["Email", body.email ?? "—"],
    ["Phone", body.phone ?? "—"],
    ["Company", body.company ?? "—"],
  ];
  for (const [key, val] of Object.entries(body.details ?? {})) {
    rows.push([key, val == null ? "—" : String(val)]);
  }
  const cells = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#666;vertical-align:top">${escapeHtml(k)}</td>` +
        `<td style="padding:4px 0">${escapeHtml(v)}</td></tr>`,
    )
    .join("");
  return `<h2>New ${escapeHtml(type)} inquiry</h2><table style="font-family:sans-serif;font-size:14px">${cells}</table>`;
}

// Best-effort email notification via Resend. Never throws — if it fails, the
// lead is already saved in D1, so we just log and move on.
async function sendNotificationEmail(
  type: string,
  body: InquiryBody,
  env: WorkerEnv,
): Promise<void> {
  const apiKey = env.RESEND_API_KEY;
  const to = env.LEAD_NOTIFY_EMAIL;
  if (!apiKey || !to) return; // not configured yet — skip silently

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        // Resend test mode: sender must be onboarding@resend.dev and the
        // recipient must be your own Resend account email until you verify a domain.
        from: "Millennium Leads <onboarding@resend.dev>",
        to: [to],
        reply_to: body.email,
        subject: `New ${type} inquiry${body.name ? ` — ${body.name}` : ""}`,
        html: buildEmailHtml(type, body),
      }),
    });
    if (!res.ok) {
      console.error("Resend returned an error", res.status, await res.text());
    }
  } catch (err) {
    console.error("Failed to send notification email", err);
  }
}

export const Route = createFileRoute("/api/inquiry")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: InquiryBody;
        try {
          body = (await request.json()) as InquiryBody;
        } catch {
          return json({ error: "Invalid request body." }, 400);
        }

        const type = String(body.type ?? "");
        const email = String(body.email ?? "").trim();

        if (!VALID_TYPES.has(type)) {
          return json({ error: "Unknown inquiry type." }, 400);
        }
        if (!EMAIL_RE.test(email)) {
          return json({ error: "A valid email address is required." }, 400);
        }

        const env = await getWorkerEnv();

        const humanVerified = await verifyTurnstile(
          body.turnstileToken,
          request.headers.get("CF-Connecting-IP"),
          env,
        );
        if (!humanVerified) {
          return json({ error: "Verification failed. Please try again." }, 403);
        }

        const db = env.DB;
        if (!db) {
          // Binding missing — e.g. running `vite dev` without wrangler, or the
          // D1 binding hasn't been attached to the deployed Worker yet.
          return json(
            { error: "Submissions are temporarily unavailable. Please email us directly." },
            503,
          );
        }

        try {
          await db
            .prepare(
              "INSERT INTO leads (type, name, email, phone, company, details) VALUES (?, ?, ?, ?, ?, ?)",
            )
            .bind(
              type,
              body.name?.trim() || null,
              email,
              body.phone?.trim() || null,
              body.company?.trim() || null,
              body.details ? JSON.stringify(body.details) : null,
            )
            .run();
        } catch (err) {
          console.error("Failed to store inquiry", err);
          return json({ error: "Could not save your request. Please try again." }, 500);
        }

        // Lead is saved; notifying by email is best-effort and won't block success.
        await sendNotificationEmail(type, body, env);

        return json({ ok: true });
      },
    },
  },
});
