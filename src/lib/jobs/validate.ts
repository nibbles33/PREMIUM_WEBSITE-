export type JobApplicationFieldErrors = Partial<
  Record<"name" | "email" | "phone" | "position" | "resume", string>
>;

export type ValidatedJobApplication = {
  name: string;
  email: string;
  phone: string;
  position: string;
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s().+\-]{7,20}$/;

export function isJobHoneypotTriggered(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

export function validateJobApplicationFields(input: {
  name: unknown;
  email: unknown;
  phone: unknown;
  position: unknown;
  message: unknown;
}):
  | { ok: true; data: ValidatedJobApplication }
  | { ok: false; error: string; fieldErrors: JobApplicationFieldErrors } {
  const fieldErrors: JobApplicationFieldErrors = {};

  const name = typeof input.name === "string" ? input.name.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim() : "";
  const phone = typeof input.phone === "string" ? input.phone.trim() : "";
  const position =
    typeof input.position === "string" ? input.position.trim() : "";
  const message = typeof input.message === "string" ? input.message.trim() : "";

  if (!name || name.length < 2) fieldErrors.name = "Enter your full name.";
  if (!email || !EMAIL_RE.test(email)) fieldErrors.email = "Enter a valid email.";
  if (!phone || !PHONE_RE.test(phone)) fieldErrors.phone = "Enter a valid phone number.";
  if (!position) fieldErrors.position = "Position is required.";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      error: "Please correct the highlighted fields.",
      fieldErrors,
    };
  }

  return {
    ok: true,
    data: { name, email, phone, position, message },
  };
}

export const MAX_RESUME_BYTES = 5 * 1024 * 1024;
export const ALLOWED_RESUME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export function validateResumeFile(file: File | null):
  | { ok: true }
  | { ok: false; error: string; field: "resume" } {
  if (!file || file.size === 0) {
    return { ok: false, error: "Resume is required.", field: "resume" };
  }
  if (file.size > MAX_RESUME_BYTES) {
    return { ok: false, error: "Resume must be 5 MB or smaller.", field: "resume" };
  }
  if (!ALLOWED_RESUME_TYPES.has(file.type)) {
    return {
      ok: false,
      error: "Upload a PDF or Word document.",
      field: "resume",
    };
  }
  return { ok: true };
}
