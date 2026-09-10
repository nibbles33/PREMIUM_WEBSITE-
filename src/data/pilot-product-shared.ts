import type { ProductBrokerStep } from "@/types/pilot-product";

export const PILOT_BROKER_HREF = "/talk-to-a-broker/";

export const personalBrokerSteps: ProductBrokerStep[] = [
  {
    id: "client",
    label: "Your situation",
    detail: "Your property, belongings, or vehicle — and how you actually use them.",
  },
  {
    id: "markets",
    label: "Multiple insurance markets",
    detail: "Independent access to personal lines carriers — not one company's shelf.",
  },
  {
    id: "broker",
    label: "Premium broker",
    detail: "Windsor-Essex advice that explains options in plain language.",
  },
  {
    id: "fit",
    label: "Right-fit coverage",
    detail: "Coverage matched to your real risks — not a one-size template.",
  },
];

export const commercialBrokerSteps: ProductBrokerStep[] = [
  {
    id: "business",
    label: "Your operation",
    detail: "Your industry, locations, and how the business actually runs day to day.",
  },
  {
    id: "markets",
    label: "Multiple insurance markets",
    detail: "Independent access to commercial carriers — options compared side by side.",
  },
  {
    id: "broker",
    label: "Premium broker",
    detail: "Windsor-Essex guidance that translates policy wording into decisions.",
  },
  {
    id: "fit",
    label: "Right-fit coverage",
    detail: "Protection aligned to your operations — not generic off-the-shelf limits.",
  },
];

export const DEFAULT_RELATED_HEADING =
  "A lot to protect? Good thing we have options.";

export const DEFAULT_RELATED_INTRO =
  "One policy is rarely the whole picture. Explore other personal coverage from Premium.";
