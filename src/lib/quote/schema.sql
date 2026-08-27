-- Quote funnel schema (Vercel Postgres / Neon)
-- Applied automatically by ensureQuoteSchema() on first API use.
-- You can also run this manually in the Vercel / Neon SQL console.

CREATE TABLE IF NOT EXISTS quote_leads (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  answers JSONB NOT NULL DEFAULT '{}'::jsonb,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  preferred_contact_method TEXT NOT NULL,
  email_sent BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS quote_rate_limits (
  id BIGSERIAL PRIMARY KEY,
  ip TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS quote_rate_limits_ip_created_idx
  ON quote_rate_limits (ip, created_at DESC);
