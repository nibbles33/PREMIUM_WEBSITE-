import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import { randomUUID } from "crypto";
import type { NormalizedLead } from "./validate";

let schemaReady: Promise<void> | null = null;

function getSql(): NeonQueryFunction<false, false> {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Provision Vercel Postgres (or Neon) and add DATABASE_URL to the environment.",
    );
  }
  return neon(url);
}

export async function ensureQuoteSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      const sql = getSql();
      await sql`
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
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS quote_rate_limits (
          id BIGSERIAL PRIMARY KEY,
          ip TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`
        CREATE INDEX IF NOT EXISTS quote_rate_limits_ip_created_idx
        ON quote_rate_limits (ip, created_at DESC)
      `;
    })().catch((err) => {
      schemaReady = null;
      throw err;
    });
  }
  await schemaReady;
}

export type SaveLeadResult = {
  id: string;
};

/**
 * Isolated persistence entrypoint — safe to extend later (CRM push, etc.)
 * without touching the quote engine or UI.
 */
export async function saveLead(data: NormalizedLead): Promise<SaveLeadResult> {
  await ensureQuoteSchema();
  const sql = getSql();
  const id = randomUUID();

  await sql`
    INSERT INTO quote_leads (
      id,
      category,
      answers,
      name,
      phone,
      email,
      preferred_contact_method,
      email_sent
    )
    VALUES (
      ${id},
      ${data.category},
      ${JSON.stringify(data.answers)},
      ${data.name},
      ${data.phone},
      ${data.email},
      ${data.preferredContactMethod},
      FALSE
    )
  `;

  return { id };
}

export async function markLeadEmailSent(id: string): Promise<void> {
  const sql = getSql();
  await sql`
    UPDATE quote_leads
    SET email_sent = TRUE
    WHERE id = ${id}
  `;
}

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterMinutes: number };

export async function checkAndRecordRateLimit(
  ip: string,
): Promise<RateLimitResult> {
  await ensureQuoteSchema();
  const sql = getSql();
  const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();

  const recent = await sql`
    SELECT COUNT(*)::int AS count
    FROM quote_rate_limits
    WHERE ip = ${ip}
      AND created_at >= ${windowStart}::timestamptz
  `;
  const count = Number(recent[0]?.count ?? 0);
  if (count >= RATE_LIMIT_MAX) {
    return { allowed: false, retryAfterMinutes: 10 };
  }

  await sql`
    INSERT INTO quote_rate_limits (ip) VALUES (${ip})
  `;
  return { allowed: true };
}
