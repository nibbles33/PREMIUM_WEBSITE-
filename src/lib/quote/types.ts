export type QuoteCategory =
  | "auto"
  | "home"
  | "business"
  | "commercialAuto"
  | "farm";

export type StepType = "select" | "text" | "email" | "tel" | "freetext";

export type SkipIf =
  | {
      /** Skip when a URL/answer param equals one of these values. */
      paramIn: { key: string; values: string[] };
    }
  | {
      /** Skip when the named answer is already set (from URL prefill). */
      paramPresent: string;
    }
  | {
      /** Skip when an answer is one of these values. */
      answerIn: { key: string; values: string[] };
    }
  | {
      /** Skip unless an answer is one of these values. */
      answerNotIn: { key: string; values: string[] };
    };

export type StepOption = {
  id: string;
  label: string;
};

export type QuoteStepDef = {
  id: string;
  question: string;
  type: StepType;
  options?: StepOption[];
  /** Maps this step's answer to a URL query param for prefill. */
  paramKey?: string;
  mandatory: boolean;
  skipIf?: SkipIf | SkipIf[];
  placeholder?: string;
  inputMode?: "text" | "email" | "tel";
  /** Autocomplete hint for contact fields */
  autoComplete?: string;
};

export type QuoteAnswers = Record<string, string>;

export type QuoteUrlParams = {
  type?: string | null;
  businessType?: string | null;
  vehicleType?: string | null;
  homeType?: string | null;
  size?: string | null;
  vehicleBodyType?: string | null;
};

export type LeadPayload = {
  category: QuoteCategory;
  answers: QuoteAnswers;
  name: string;
  phone: string;
  email: string;
  preferredContactMethod: string;
  /** Honeypot — must be empty for real users */
  website?: string;
};

export const CATEGORY_FROM_TYPE: Record<string, QuoteCategory> = {
  vehicle: "auto",
  home: "home",
  business: "business",
  "commercial-vehicles": "commercialAuto",
  farm: "farm",
};

export const TYPE_FROM_CATEGORY: Record<QuoteCategory, string> = {
  auto: "vehicle",
  home: "home",
  business: "business",
  commercialAuto: "commercial-vehicles",
  farm: "farm",
};

export const CATEGORY_LABELS: Record<QuoteCategory, string> = {
  auto: "Auto",
  home: "Home",
  business: "Business",
  commercialAuto: "Commercial Auto",
  farm: "Farm",
};
