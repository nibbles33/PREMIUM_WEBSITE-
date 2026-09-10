import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import { randomUUID } from "crypto";
import type { ValidatedContactMessage } from "./validate";

let schemaReady: Promise<void> | null = null;

function getSql(): NeonQueryFunction<false, false> {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set.");
  }
  return neon(url);
}

export async function ensureContactSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      const sql = getSql();
      await sql`
        CREATE TABLE IF NOT EXISTS contact_messages (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT,
          message TEXT NOT NULL,
          email_sent BOOLEAN NOT NULL DEFAULT FALSE,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS contact_rate_limits (
          id BIGSERIAL PRIMARY KEY,
          ip TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`
        CREATE INDEX IF NOT EXISTS contact_rate_limits_ip_created_idx
        ON contact_rate_limits (ip, created_at DESC)
      `;
    })().catch((err) => {
      schemaReady = null;
      throw err;
    });
  }
  await schemaReady;
}

export async function saveContactMessage(
  data: ValidatedContactMessage,
): Promise<{ id: string }> {
  await ensureContactSchema();
  const sql = getSql();
  const id = randomUUID();

  await sql`
    INSERT INTO contact_messages (
      id, name, email, phone, message, email_sent
    )
    VALUES (
      ${id},
      ${data.name},
      ${data.email},
      ${data.phone},
      ${data.message},
      FALSE
    )
  `;

  return { id };
}

export async function markContactEmailSent(id: string): Promise<void> {
  const sql = getSql();
  await sql`
    UPDATE contact_messages SET email_sent = TRUE WHERE id = ${id}
  `;
}

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterMinutes: number };

export async function checkAndRecordContactRateLimit(
  ip: string,
): Promise<RateLimitResult> {
  await ensureContactSchema();
  const sql = getSql();
  const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();

  const recent = await sql`
    SELECT COUNT(*)::int AS count
    FROM contact_rate_limits
    WHERE ip = ${ip}
      AND created_at >= ${windowStart}::timestamptz
  `;
  const count = Number(recent[0]?.count ?? 0);
  if (count >= RATE_LIMIT_MAX) {
    return { allowed: false, retryAfterMinutes: 10 };
  }

  await sql`INSERT INTO contact_rate_limits (ip) VALUES (${ip})`;
  return { allowed: true };
}
