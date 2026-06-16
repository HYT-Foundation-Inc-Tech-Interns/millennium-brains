-- Millennium Brains — lead capture table.
-- Apply with:  npx wrangler d1 execute millennium-leads --file=./schema.sql
-- (add --remote to apply to the deployed database, --local for local dev)

CREATE TABLE IF NOT EXISTS leads (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  type        TEXT NOT NULL,                       -- 'lease' | 'demo' | 'newsletter'
  name        TEXT,
  email       TEXT NOT NULL,
  phone       TEXT,
  company     TEXT,
  details     TEXT,                                -- JSON blob of the type-specific fields
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at);
CREATE INDEX IF NOT EXISTS idx_leads_type       ON leads (type);
