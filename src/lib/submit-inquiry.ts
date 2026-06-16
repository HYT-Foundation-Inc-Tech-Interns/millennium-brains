// Client helper used by every form on the site. Posts a normalized payload to
// the /api/inquiry server route, which stores it in D1 (and, later, emails it).

export type InquiryType = "lease" | "demo" | "newsletter";

export type InquiryPayload = {
  type: InquiryType;
  email: string;
  name?: string;
  phone?: string;
  company?: string;
  /** Type-specific extras (dates, package, message, …). Stored as JSON. */
  details?: Record<string, unknown>;
  /** Cloudflare Turnstile token, verified server-side before saving. */
  turnstileToken?: string;
};

export async function submitInquiry(payload: InquiryPayload): Promise<void> {
  const res = await fetch("/api/inquiry", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let message = "Something went wrong. Please try again.";
    try {
      const data = (await res.json()) as { error?: string };
      if (data?.error) message = data.error;
    } catch {
      // response had no JSON body — keep the default message
    }
    throw new Error(message);
  }
}
