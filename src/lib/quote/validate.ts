import type { LeadPayload, QuoteCategory } from "./types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ValidationResult =
  | { ok: true; data: NormalizedLead }
  | { ok: false; error: string; fieldErrors: Record<string, string> };

export type NormalizedLead = {
  category: QuoteCategory;
  answers: Record<string, string>;
  name: string;
  phone: string;
  email: string;
  preferredContactMethod: string;
};

const VALID_CATEGORIES: QuoteCategory[] = [
  "auto",
  "home",
  "business",
  "commercialAuto",
  "farm",
];

export function validateLeadPayload(body: unknown): ValidationResult {
  if (!body || typeof body !== "object") {
    return {
      ok: false,
      error: "Invalid request body.",
      fieldErrors: {},
    };
  }

  const raw = body as Partial<LeadPayload> & {
    answers?: Record<string, unknown>;
  };
  const fieldErrors: Record<string, string> = {};

  if (
    !raw.category ||
    !VALID_CATEGORIES.includes(raw.category as QuoteCategory)
  ) {
    fieldErrors.category = "Invalid insurance category.";
  }

  const name = String(raw.name ?? raw.answers?.name ?? "").trim();
  const phone = String(raw.phone ?? raw.answers?.phone ?? "").trim();
  const email = String(raw.email ?? raw.answers?.email ?? "")
    .trim()
    .toLowerCase();
  const preferredContactMethod = String(
    raw.preferredContactMethod ?? raw.answers?.preferredContactMethod ?? "",
  ).trim();

  if (!name || name.length < 2) {
    fieldErrors.name = "Name is required.";
  }
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) {
    fieldErrors.phone = "Enter a valid phone number.";
  }
  if (!email || !EMAIL_RE.test(email)) {
    fieldErrors.email = "Enter a valid email address.";
  }
  if (!["phone", "email", "text"].includes(preferredContactMethod)) {
    fieldErrors.preferredContactMethod = "Select a preferred contact method.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors,
    };
  }

  const answers: Record<string, string> = {};
  if (raw.answers && typeof raw.answers === "object") {
    for (const [k, v] of Object.entries(raw.answers)) {
      if (typeof v === "string") answers[k] = v;
    }
  }
  // Ensure contact fields live on answers for broker email summary
  answers.name = name;
  answers.phone = phone;
  answers.email = email;
  answers.preferredContactMethod = preferredContactMethod;

  return {
    ok: true,
    data: {
      category: raw.category as QuoteCategory,
      answers,
      name,
      phone,
      email,
      preferredContactMethod,
    },
  };
}

/** True when honeypot was filled — treat as bot. */
export function isHoneypotTriggered(website: unknown): boolean {
  return typeof website === "string" && website.trim().length > 0;
}
