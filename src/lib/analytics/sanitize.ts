/**
 * Defensive allowlist for analytics parameters.
 * Unknown keys and blocked keys are dropped; free-text values are rejected.
 */

const BLOCKED_KEYS = new Set([
  "name",
  "email",
  "phone",
  "message",
  "notes",
  "address",
  "street",
  "postal",
  "zip",
  "postalcode",
  "postal_code",
  "dob",
  "dateofbirth",
  "date_of_birth",
  "resume",
  "filename",
  "file",
  "resume_url",
  "resumeurl",
  "resume_pathname",
  "applicationid",
  "application_id",
  "leadid",
  "lead_id",
  "messageid",
  "message_id",
  "preferredcontactmethod",
  "preferred_contact_method",
  "firstname",
  "first_name",
  "lastname",
  "last_name",
  "fullname",
  "full_name",
  "applicant",
  "customer",
  "error",
  "errormessage",
  "error_message",
  "raw",
  "body",
  "payload",
  "answers",
]);

const ALLOWED_KEYS = new Set([
  "page_type",
  "page_slug",
  "cta_id",
  "cta_location",
  "destination",
  "destination_id",
  "menu",
  "link_slug",
  "location",
  "product_slug",
  "line",
  "surface",
  "category_id",
  "category",
  "coverage_id",
  "action",
  "from_slug",
  "to_slug",
  "intent",
  "prefilled",
  "step_id",
  "error_code",
  "position_slug",
]);

const ALLOWED_STRING =
  /^[a-zA-Z0-9][a-zA-Z0-9_./:-]{0,80}$/;

export type AnalyticsValue = string | number | boolean | null | undefined;
export type AnalyticsPayload = Record<string, AnalyticsValue>;

function isBlockedKey(key: string): boolean {
  const normalized = key.toLowerCase().replace(/[^a-z0-9_]/g, "");
  return BLOCKED_KEYS.has(normalized);
}

function isSafeString(value: string): boolean {
  if (!ALLOWED_STRING.test(value)) return false;
  // Reject anything that looks like an email or phone fragment.
  if (value.includes("@")) return false;
  if (/\d{7,}/.test(value.replace(/\D/g, "")) && value.replace(/\D/g, "").length >= 10) {
    return false;
  }
  return true;
}

export function sanitizeAnalyticsPayload(
  payload: AnalyticsPayload,
): Record<string, string | number | boolean | null> {
  const clean: Record<string, string | number | boolean | null> = {};
  for (const [key, value] of Object.entries(payload)) {
    if (value === undefined) continue;
    if (isBlockedKey(key)) continue;
    if (!ALLOWED_KEYS.has(key)) continue;

    if (typeof value === "string") {
      if (!isSafeString(value)) continue;
      clean[key] = value;
      continue;
    }
    if (typeof value === "number") {
      if (!Number.isFinite(value)) continue;
      clean[key] = value;
      continue;
    }
    if (typeof value === "boolean" || value === null) {
      clean[key] = value;
    }
  }
  return clean;
}
