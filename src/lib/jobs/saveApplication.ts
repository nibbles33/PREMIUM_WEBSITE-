import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import { randomUUID } from "crypto";

let schemaReady: Promise<void> | null = null;

function getSql(): NeonQueryFunction<false, false> {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set.");
  }
  return neon(url);
}

export async function ensureJobApplicationSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      const sql = getSql();
      await sql`
        CREATE TABLE IF NOT EXISTS job_applications (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT NOT NULL,
          position TEXT NOT NULL,
          message TEXT,
          resume_url TEXT,
          email_sent BOOLEAN NOT NULL DEFAULT FALSE,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS job_apply_rate_limits (
          id BIGSERIAL PRIMARY KEY,
          ip TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`
        CREATE INDEX IF NOT EXISTS job_apply_rate_limits_ip_created_idx
        ON job_apply_rate_limits (ip, created_at DESC)
      `;
    })().catch((err) => {
      schemaReady = null;
      throw err;
    });
  }
  await schemaReady;
}

export type SaveJobApplicationInput = {
  name: string;
  email: string;
  phone: string;
  position: string;
  message: string;
  resumeUrl: string | null;
};

export async function saveJobApplication(
  data: SaveJobApplicationInput,
): Promise<{ id: string }> {
  await ensureJobApplicationSchema();
  const sql = getSql();
  const id = randomUUID();

  await sql`
    INSERT INTO job_applications (
      id, name, email, phone, position, message, resume_url, email_sent
    )
    VALUES (
      ${id},
      ${data.name},
      ${data.email},
      ${data.phone},
      ${data.position},
      ${data.message || null},
      ${data.resumeUrl},
      FALSE
    )
  `;

  return { id };
}

export async function markJobApplicationEmailSent(id: string): Promise<void> {
  const sql = getSql();
  await sql`
    UPDATE job_applications SET email_sent = TRUE WHERE id = ${id}
  `;
}

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterMinutes: number };

export async function checkAndRecordJobApplyRateLimit(
  ip: string,
): Promise<RateLimitResult> {
  await ensureJobApplicationSchema();
  const sql = getSql();
  const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();

  const recent = await sql`
    SELECT COUNT(*)::int AS count
    FROM job_apply_rate_limits
    WHERE ip = ${ip}
      AND created_at >= ${windowStart}::timestamptz
  `;
  const count = Number(recent[0]?.count ?? 0);
  if (count >= RATE_LIMIT_MAX) {
    return { allowed: false, retryAfterMinutes: 15 };
  }

  await sql`INSERT INTO job_apply_rate_limits (ip) VALUES (${ip})`;
  return { allowed: true };
}
