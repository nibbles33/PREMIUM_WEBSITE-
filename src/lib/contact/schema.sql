-- Contact form persistence schema.
-- Applied automatically by ensureContactSchema() on first API use.
-- Additive only — existing rows are preserved.

CREATE TABLE IF NOT EXISTS contact_messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  inquiry TEXT,
  email_sent BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Existing deployments: add inquiry without rewriting historical rows.
ALTER TABLE contact_messages
  ADD COLUMN IF NOT EXISTS inquiry TEXT;

-- Restrict non-null inquiry values to the application allowlist.
-- NULL remains valid for rows created before this column existed.
DO $$
BEGIN
  ALTER TABLE contact_messages
    ADD CONSTRAINT contact_messages_inquiry_check
    CHECK (inquiry IS NULL OR inquiry IN ('general', 'life', 'group'));
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS contact_rate_limits (
  id BIGSERIAL PRIMARY KEY,
  ip TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS contact_rate_limits_ip_created_idx
  ON contact_rate_limits (ip, created_at DESC);
