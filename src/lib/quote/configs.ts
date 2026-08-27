import {
  CONTACT_STEPS,
  COVERAGE_TIMING_OPTIONS,
  CURRENTLY_INSURED_OPTIONS,
} from "./sharedSteps";
import type { QuoteCategory, QuoteStepDef } from "./types";

const autoSteps: QuoteStepDef[] = [
  {
    id: "vehicleBodyType",
    question: "What are you insuring?",
    type: "select",
    paramKey: "vehicleBodyType",
    mandatory: true,
    options: [
      { id: "car", label: "Car" },
      { id: "suv", label: "SUV" },
      { id: "pickup", label: "Pickup" },
      { id: "van", label: "Van" },
    ],
    skipIf: {
      paramIn: { key: "vehicleType", values: ["motorcycle", "boat"] },
    },
  },
  {
    id: "vehicleCount",
    question: "How many vehicles?",
    type: "select",
    mandatory: true,
    options: [
      { id: "1", label: "1" },
      { id: "2", label: "2" },
      { id: "3+", label: "3+" },
    ],
    // Motorcycle/boat arrivals skip body type and jump to insured status
    skipIf: {
      paramIn: { key: "vehicleType", values: ["motorcycle", "boat"] },
    },
  },
  {
    id: "currentlyInsured",
    question: "Are you currently insured?",
    type: "select",
    mandatory: true,
    options: [...CURRENTLY_INSURED_OPTIONS],
  },
  {
    id: "primaryUse",
    question: "Primary use",
    type: "select",
    mandatory: true,
    options: [
      { id: "personal", label: "Personal / commuting" },
      { id: "business", label: "Business use" },
      { id: "pleasure", label: "Pleasure" },
    ],
  },
  {
    id: "coverageTiming",
    question: "When do you need coverage?",
    type: "select",
    mandatory: true,
    options: [...COVERAGE_TIMING_OPTIONS],
  },
];

const homeSteps: QuoteStepDef[] = [
  {
    id: "homeType",
    question: "Home type",
    type: "select",
    paramKey: "homeType",
    mandatory: true,
    options: [
      { id: "home", label: "Home" },
      { id: "condo", label: "Condo" },
      { id: "tenant", label: "Tenant" },
      { id: "landlord", label: "Landlord" },
    ],
    skipIf: { paramPresent: "homeType" },
  },
  {
    id: "currentlyInsured",
    question: "Are you currently insured?",
    type: "select",
    mandatory: true,
    options: [...CURRENTLY_INSURED_OPTIONS],
  },
  {
    id: "occupancy",
    question: "Occupancy",
    type: "select",
    mandatory: true,
    options: [
      { id: "primary", label: "Primary residence" },
      { id: "secondary", label: "Secondary or seasonal" },
      { id: "rental", label: "Rental" },
    ],
    skipIf: {
      answerIn: { key: "homeType", values: ["tenant", "landlord"] },
    },
  },
  {
    id: "coverageTiming",
    question: "When do you need coverage?",
    type: "select",
    mandatory: true,
    options: [...COVERAGE_TIMING_OPTIONS],
  },
];

const businessSteps: QuoteStepDef[] = [
  {
    id: "businessType",
    question: "What kind of business?",
    type: "select",
    paramKey: "businessType",
    mandatory: true,
    options: [
      { id: "contractor", label: "Contractor" },
      { id: "restaurant", label: "Restaurant" },
      { id: "manufacturing", label: "Manufacturing" },
      { id: "retail", label: "Retail" },
      { id: "professional", label: "Professional" },
      { id: "other", label: "Other" },
    ],
    skipIf: { paramPresent: "businessType" },
  },
  {
    id: "size",
    question: "How big is the business?",
    type: "select",
    paramKey: "size",
    mandatory: true,
    options: [
      { id: "just-me", label: "Just me" },
      { id: "2-5", label: "2–5" },
      { id: "6-20", label: "6–20" },
      { id: "20+", label: "20+" },
    ],
    skipIf: { paramPresent: "size" },
  },
  {
    id: "yearsOperating",
    question: "How long have you been operating?",
    type: "select",
    mandatory: true,
    options: [
      { id: "lt-1", label: "Less than 1 year" },
      { id: "1-5", label: "1–5 years" },
      { id: "5+", label: "5+ years" },
    ],
  },
  {
    id: "currentlyInsured",
    question: "Are you currently insured?",
    type: "select",
    mandatory: true,
    options: [...CURRENTLY_INSURED_OPTIONS],
  },
  {
    id: "notes",
    question: "Anything specific on your mind?",
    type: "freetext",
    mandatory: false,
    placeholder:
      "Optional — e.g. upcoming renewal, recent claim, specific concern",
  },
];

const commercialAutoSteps: QuoteStepDef[] = [
  {
    id: "fleetSize",
    question: "How many vehicles?",
    type: "select",
    mandatory: true,
    options: [
      { id: "1", label: "Just one" },
      { id: "2-5", label: "2–5" },
      { id: "6-20", label: "6–20" },
      { id: "20+", label: "20+" },
    ],
  },
  {
    id: "vehicleTypes",
    question: "What type of vehicles?",
    type: "select",
    mandatory: true,
    options: [
      { id: "cars-vans", label: "Cars / vans" },
      { id: "trucks", label: "Trucks" },
      { id: "trailers", label: "Trailers" },
      { id: "mixed", label: "Mixed fleet" },
    ],
  },
  {
    id: "primaryUse",
    question: "Primary use",
    type: "select",
    mandatory: true,
    options: [
      { id: "local-delivery", label: "Local delivery" },
      { id: "long-haul", label: "Long-haul / cross-border" },
      { id: "hauling", label: "Hauling equipment or materials" },
      { id: "passenger", label: "Passenger transport" },
    ],
  },
  {
    id: "currentlyInsured",
    question: "Are you currently insured?",
    type: "select",
    mandatory: true,
    options: [...CURRENTLY_INSURED_OPTIONS],
  },
  {
    id: "coverageTiming",
    question: "When do you need coverage?",
    type: "select",
    mandatory: true,
    options: [...COVERAGE_TIMING_OPTIONS],
  },
];

/** Farm keeps existing product-page deep links working with a short path. */
const farmSteps: QuoteStepDef[] = [
  {
    id: "currentlyInsured",
    question: "Are you currently insured?",
    type: "select",
    mandatory: true,
    options: [...CURRENTLY_INSURED_OPTIONS],
  },
  {
    id: "coverageTiming",
    question: "When do you need coverage?",
    type: "select",
    mandatory: true,
    options: [...COVERAGE_TIMING_OPTIONS],
  },
];

const CATEGORY_STEPS: Record<QuoteCategory, QuoteStepDef[]> = {
  auto: autoSteps,
  home: homeSteps,
  business: businessSteps,
  commercialAuto: commercialAutoSteps,
  farm: farmSteps,
};

export function getCategorySteps(category: QuoteCategory): QuoteStepDef[] {
  return [...CATEGORY_STEPS[category], ...CONTACT_STEPS];
}
