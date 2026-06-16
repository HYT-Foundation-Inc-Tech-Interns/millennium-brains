// Ambient types for the Cloudflare bindings we read via `cloudflare:workers`.
// Declared by hand so we don't need the full @cloudflare/workers-types package —
// only the small D1 surface this app actually uses is described here.

interface D1Result {
  success: boolean;
}

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  run(): Promise<D1Result>;
  first<T = unknown>(colName?: string): Promise<T | null>;
  all<T = unknown>(): Promise<{ results: T[] }>;
}

interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

// Everything bound to the Worker in wrangler.jsonc. Add new bindings here
// (e.g. secrets, KV) as they are introduced so `env.X` stays typed.
interface CloudflareEnv {
  DB: D1Database;
  RESEND_API_KEY?: string; // Resend API key (set via `wrangler secret put`)
  LEAD_NOTIFY_EMAIL?: string; // inbox that gets a notification per submission
}

declare module "cloudflare:workers" {
  export const env: CloudflareEnv;
}
