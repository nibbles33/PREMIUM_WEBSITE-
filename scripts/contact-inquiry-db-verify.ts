/**
 * Safe local DB verification for contact inquiry persistence.
 * Applies schema via psql and inserts using the same columns as saveContactMessage.
 * Does NOT use the Neon HTTP driver (local Postgres only).
 *
 * DATABASE_URL=postgresql://... npx tsx scripts/contact-inquiry-db-verify.ts
 */
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { validateContactPayload } from "../src/lib/contact/validate";

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  throw new Error("DATABASE_URL is required.");
}
const db: string = dbUrl;

function psql(sql: string): string {
  return execFileSync("psql", [db, "-v", "ON_ERROR_STOP=1", "-At", "-c", sql], {
    encoding: "utf8",
  }).trim();
}

function esc(value: string): string {
  return value.replace(/'/g, "''");
}

// Reset to a pre-migration table, then apply additive schema file.
psql("DROP TABLE IF EXISTS contact_messages CASCADE;");
psql(`
CREATE TABLE contact_messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  email_sent BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
`);
psql(`
INSERT INTO contact_messages (id, name, email, message)
VALUES ('legacy-1', 'Legacy', 'legacy@example.com', 'Historical row before inquiry column.');
`);
execFileSync("psql", [db, "-v", "ON_ERROR_STOP=1", "-f", "src/lib/contact/schema.sql"], {
  encoding: "utf8",
  stdio: "inherit",
});

const cases: Array<{ label: string; inquiry?: string; expected: string }> = [
  { label: "GENERAL", expected: "general" },
  { label: "LIFE", inquiry: "life", expected: "life" },
  { label: "GROUP", inquiry: "group", expected: "group" },
  { label: "INVALID", inquiry: "random-test", expected: "general" },
];

for (const testCase of cases) {
  const validated = validateContactPayload({
    name: "QA Tester",
    email: "qa-inquiry@example.com",
    message: `Persistence check for ${testCase.label} inquiry classification.`,
    inquiry: testCase.inquiry,
  });
  assert.equal(validated.ok, true);
  if (!validated.ok) throw new Error("validation failed");
  assert.equal(validated.data.inquiry, testCase.expected);

  const id = `qa-${testCase.label.toLowerCase()}`;
  // Mirrors saveContactMessage INSERT columns/order.
  psql(`
    INSERT INTO contact_messages (
      id, name, email, phone, message, inquiry, email_sent
    ) VALUES (
      '${id}',
      '${esc(validated.data.name)}',
      '${esc(validated.data.email)}',
      NULL,
      '${esc(validated.data.message)}',
      '${esc(validated.data.inquiry)}',
      FALSE
    );
  `);

  const stored = psql(`SELECT inquiry FROM contact_messages WHERE id='${id}';`);
  assert.equal(stored, testCase.expected);
  console.log(`✓ ${testCase.label} DB inquiry=${stored}`);
}

let rejected = false;
try {
  psql(`
    INSERT INTO contact_messages (id, name, email, message, inquiry)
    VALUES ('bad', 'Bad', 'bad@example.com', 'Should fail check constraint.', 'not-allowed');
  `);
} catch {
  rejected = true;
}
assert.equal(rejected, true);
console.log("✓ CHECK rejects not-allowed");

const legacy = psql(
  `SELECT COALESCE(inquiry, 'NULL') FROM contact_messages WHERE id='legacy-1';`,
);
assert.equal(legacy, "NULL");
console.log("✓ EXISTING RECORDS PRESERVED inquiry=NULL");

const constraint = psql(`
  SELECT conname FROM pg_constraint WHERE conname='contact_messages_inquiry_check';
`);
assert.equal(constraint, "contact_messages_inquiry_check");
console.log("✓ CHECK constraint present");

psql(`DELETE FROM contact_messages WHERE id LIKE 'qa-%' OR id IN ('legacy-1','bad');`);
console.log("\nDB persistence verification PASS");
