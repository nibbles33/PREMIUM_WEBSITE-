import type { LucideIcon } from "lucide-react";
import {
  Car,
  CloudLightning,
  HeartPulse,
  Shield,
  ShieldAlert,
  Timer,
} from "lucide-react";

export const AUTO_QUOTE_HREF = "/get-a-quote?type=vehicle";
export const AUTO_BROKER_HREF = "/talk-to-a-broker/";
export const AUTO_ACCENT = "#5B7A99";

export type AutoCoverageItem = {
  id: string;
  title: string;
  shortLabel: string;
  description: string;
  detail: string;
  detailTitle?: string;
  detailDescription?: string;
  icon: LucideIcon;
  visualScene:
    | "liability"
    | "collision"
    | "comprehensive"
    | "accident-benefits"
    | "uninsured"
    | "loss-of-use";
  visualEyebrow: string;
  visualCaption: string;
  visualSubcaption: string;
};

export const autoCoverageItems: AutoCoverageItem[] = [
  {
    id: "liability",
    title: "Liability Coverage",
    shortLabel: "Liability",
    description:
      "Protects you if you're responsible for injury or damage to others.",
    detail:
      "Third-party liability is mandatory in Ontario. It responds when you're legally responsible for injuring someone or damaging their property in an accident.",
    icon: Shield,
    visualScene: "liability",
    visualEyebrow: "Protecting others",
    visualCaption: "Coverage extends beyond your vehicle",
    visualSubcaption:
      "Liability responds when someone else is injured or their property is damaged.",
  },
  {
    id: "collision",
    title: "Collision Coverage",
    shortLabel: "Collision",
    description:
      "Optional coverage that can help pay to repair or replace your vehicle after a crash — subject to deductibles, limits, and policy terms.",
    detail:
      "When collision coverage is on your policy, it is intended to respond to damage to your own vehicle from a crash with another car or object — including situations where fault isn't clear or you're at fault, subject to deductibles, limits, and policy terms.",
    icon: Car,
    visualScene: "collision",
    visualEyebrow: "Your vehicle",
    visualCaption: "Damage from a crash — covered",
    visualSubcaption:
      "Front-end impacts and body damage from collisions with cars or objects.",
  },
  {
    id: "comprehensive",
    title: "Comprehensive Coverage",
    shortLabel: "Comprehensive",
    description:
      "Optional coverage intended to address theft, vandalism, weather damage, and other non-collision events — subject to deductibles, limits, exclusions, and policy terms.",
    detail:
      "When comprehensive coverage is on your policy, it is intended to address events outside your control — hail, fire, theft, vandalism, or hitting an animal — subject to deductibles, limits, exclusions, and policy terms.",
    icon: CloudLightning,
    visualScene: "comprehensive",
    visualEyebrow: "Outside your control",
    visualCaption: "Weather, theft & the unexpected",
    visualSubcaption:
      "Hail, fire, vandalism, and animal strikes — not caused by a collision.",
  },
  {
    id: "accident-benefits",
    title: "Accident Benefits",
    shortLabel: "Accident Benefits",
    description:
      "Mandatory medical, rehabilitation, and attendant care benefits for Ontario policies entered into on or after July 1, 2026 — with other accident benefits available to add.",
    detail:
      "For policies entered into on or after July 1, 2026, statutory accident benefits include mandatory medical, rehabilitation, and attendant care benefits. Other accident benefits — such as income replacement and caregiver benefits — are optional and must be added to your policy if you want them, subject to policy terms and who is covered under your policy.",
    icon: HeartPulse,
    visualScene: "accident-benefits",
    visualEyebrow: "People first",
    visualCaption: "Support for you & your passengers",
    visualSubcaption:
      "Medical care, rehabilitation, and income help after an injury — not body damage.",
  },
  {
    id: "uninsured",
    title: "Uninsured Automobile",
    shortLabel: "Uninsured Auto",
    description:
      "Protection when you're involved with an uninsured or unidentified driver.",
    detail:
      "If the other driver has no insurance or can't be identified, this coverage helps protect you and your passengers from being left without support.",
    icon: ShieldAlert,
    visualScene: "uninsured",
    visualEyebrow: "When they can't pay",
    visualCaption: "Protection from uninsured drivers",
    visualSubcaption:
      "Coverage when the other driver has no insurance or can't be identified.",
  },
  {
    id: "loss-of-use",
    title: "Loss of Use",
    shortLabel: "Loss of Use",
    description:
      "Transportation replacement while your vehicle is being repaired after a covered claim.",
    detail:
      "Also called transportation replacement — helps cover rental or alternate transport costs so you're not stranded while your car is in the shop.",
    icon: Timer,
    visualScene: "loss-of-use",
    visualEyebrow: "Keep moving",
    visualCaption: "Replacement while yours is in the shop",
    visualSubcaption:
      "Rental or alternate transport during covered repairs.",
  },
];

export const autoBrokerSteps = [
  {
    id: "driver",
    label: "One driver",
    detail: "Your vehicle, your driving history, your coverage needs.",
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
    detail: "Coverage matched to how you actually drive — not a one-size template.",
  },
];

export const autoFaqItems = [
  {
    question: "Is auto insurance mandatory in Ontario?",
    answer:
      "Yes. Ontario law requires you to carry automobile insurance before driving on public roads. A standard policy includes minimum third-party liability coverage of $200,000, uninsured automobile coverage, and direct compensation–property damage coverage (with limited opt-out rights), along with statutory accident benefits. For policies entered into on or after July 1, 2026, only medical, rehabilitation, and attendant care benefits are mandatory within accident benefits — other accident benefits such as income replacement are optional. Physical damage coverages like collision and comprehensive are also optional.",
  },
  {
    question:
      "What's the difference between collision and comprehensive coverage?",
    answer:
      "Collision coverage is intended to respond to damage to your vehicle from a crash with another vehicle or object — fault determination affects how claims are handled, subject to policy terms. Comprehensive coverage addresses non-collision events such as theft, vandalism, hail, fire, and hitting an animal when purchased — also subject to policy terms.",
  },
  {
    question: "Will my rates change if I switch brokers?",
    answer:
      "Your premium depends on your vehicle, driving history, coverage choices, and the carrier — not on which broker you call. An independent broker can compare multiple insurers, so you may find a better fit for your situation, but savings aren't guaranteed.",
  },
  {
    question: "What information do I need for a quote?",
    answer:
      "Have your vehicle details ready (make, model, year, and VIN if available), your driving history, and information about any current coverage. That helps your broker compare options accurately.",
  },
  {
    question: "Do I need collision and comprehensive coverage?",
    answer:
      "Not always. If your vehicle is financed or leased, your lender usually requires both. For an owned vehicle, it depends on the car's value and how much risk you're comfortable carrying. A broker can help you weigh the trade-offs.",
  },
];

export const autoRelatedProducts = [
  { label: "Home", href: "/home-insurance/", photoSlug: "home-insurance" },
  { label: "Condo", href: "/condo-insurance/", photoSlug: "condo" },
  { label: "Tenant", href: "/tenant-insurance/", photoSlug: "tenant" },
  { label: "Motorcycle", href: "/motorcycle-insurance/", photoSlug: "motorcycle" },
  { label: "Boat", href: "/boat-insurance/", photoSlug: "boat" },
  { label: "Cottage", href: "/cottage-insurance/", photoSlug: "cottage" },
  {
    label: "Personal Umbrella",
    href: "/personal-umbrella-insurance/",
    photoSlug: "personal-umbrella-insurance",
  },
];

export const autoJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Auto Insurance",
  description:
    "Ontario auto insurance through an independent Windsor-Essex broker — liability, collision, comprehensive, and accident benefits.",
  serviceType: "Auto Insurance",
};
