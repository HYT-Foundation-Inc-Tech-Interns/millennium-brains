import { createFileRoute } from "@tanstack/react-router";
import { env } from "cloudflare:workers";

// Server route: POST /api/inquiry
// Validates a form submission and stores it in the D1 `leads` table.
// Runs inside the same Cloudflare Worker that serves the site.

type InquiryBody = {
  type?: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  details?: Record<string, unknown>;
};

const VALID_TYPES = new Set(["lease", "demo", "newsletter"]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
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

        return json({ ok: true });
      },
    },
  },
});
