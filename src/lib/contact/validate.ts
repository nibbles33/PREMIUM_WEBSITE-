const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s().+\-]{7,20}$/;

export type ContactFieldErrors = Partial<
  Record<"name" | "email" | "phone" | "message", string>
>;

export type ValidatedContactMessage = {
  name: string;
  email: string;
  phone: string | null;
  message: string;
};

export function isContactHoneypotTriggered(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

export function validateContactPayload(body: unknown):
  | { ok: true; data: ValidatedContactMessage }
  | { ok: false; error: string; fieldErrors: ContactFieldErrors } {
  if (!body || typeof body !== "object") {
    return {
      ok: false,
      error: "Invalid request body.",
      fieldErrors: {},
    };
  }

  const raw = body as Record<string, unknown>;
  const fieldErrors: ContactFieldErrors = {};

  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  const email = typeof raw.email === "string" ? raw.email.trim().toLowerCase() : "";
  const phoneRaw = typeof raw.phone === "string" ? raw.phone.trim() : "";
  const message = typeof raw.message === "string" ? raw.message.trim() : "";

  if (!name || name.length < 2) {
    fieldErrors.name = "Enter your full name.";
  }
  if (!email || !EMAIL_RE.test(email)) {
    fieldErrors.email = "Enter a valid email address.";
  }
  if (phoneRaw && !PHONE_RE.test(phoneRaw)) {
    fieldErrors.phone = "Enter a valid phone number.";
  }
  if (!message || message.length < 10) {
    fieldErrors.message = "Please enter a message (at least 10 characters).";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      error: "Please correct the highlighted fields.",
      fieldErrors,
    };
  }

  return {
    ok: true,
    data: {
      name,
      email,
      phone: phoneRaw || null,
      message,
    },
  };
}
