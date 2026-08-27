import type { QuoteStepDef } from "./types";

export const CURRENTLY_INSURED_OPTIONS = [
  { id: "switching", label: "Yes, switching" },
  { id: "renewing", label: "Yes, renewing soon" },
  { id: "new", label: "No, new to insurance" },
] as const;

export const COVERAGE_TIMING_OPTIONS = [
  { id: "asap", label: "ASAP" },
  { id: "30-days", label: "Within 30 days" },
  { id: "researching", label: "Just researching" },
] as const;

export const CONTACT_METHOD_OPTIONS = [
  { id: "phone", label: "Phone" },
  { id: "email", label: "Email" },
  { id: "text", label: "Text" },
] as const;

/** Shared final contact steps appended to every category config. */
export const CONTACT_STEPS: QuoteStepDef[] = [
  {
    id: "name",
    question: "What's your name?",
    type: "text",
    mandatory: true,
    placeholder: "Full name",
    autoComplete: "name",
  },
  {
    id: "phone",
    question: "What's the best phone number to reach you?",
    type: "tel",
    mandatory: true,
    placeholder: "Phone number",
    inputMode: "tel",
    autoComplete: "tel",
  },
  {
    id: "email",
    question: "And your email?",
    type: "email",
    mandatory: true,
    placeholder: "you@example.com",
    inputMode: "email",
    autoComplete: "email",
  },
  {
    id: "preferredContactMethod",
    question: "Preferred contact method",
    type: "select",
    mandatory: true,
    options: [...CONTACT_METHOD_OPTIONS],
  },
];
