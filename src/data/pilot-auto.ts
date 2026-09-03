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
  icon: LucideIcon;
  /** SVG highlight zone on schematic vehicle */
  zone: "front" | "body" | "full" | "cabin" | "sides" | "wheels";
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
    zone: "front",
  },
  {
    id: "collision",
    title: "Collision Coverage",
    shortLabel: "Collision",
    description:
      "Repairs or replaces your vehicle after a collision, regardless of fault.",
    detail:
      "Collision covers damage to your own vehicle from a crash with another car or object — useful when fault isn't clear or you're at fault.",
    icon: Car,
    zone: "body",
  },
  {
    id: "comprehensive",
    title: "Comprehensive Coverage",
    shortLabel: "Comprehensive",
    description:
      "Covers theft, vandalism, weather damage, and other non-collision events.",
    detail:
      "Comprehensive protects against events outside your control — hail, fire, theft, vandalism, or hitting an animal.",
    icon: CloudLightning,
    zone: "full",
  },
  {
    id: "accident-benefits",
    title: "Accident Benefits",
    shortLabel: "Accident Benefits",
    description:
      "Medical, rehabilitation, and income replacement support after an accident — mandatory in Ontario.",
    detail:
      "Accident benefits help cover medical care, rehabilitation, caregiver costs, and income replacement for you and your passengers after an injury.",
    icon: HeartPulse,
    zone: "cabin",
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
    zone: "sides",
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
    zone: "wheels",
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
      "Yes. All Ontario drivers are legally required to carry auto insurance. At minimum, that includes third-party liability and accident benefits. Optional coverages like collision and comprehensive protect your own vehicle.",
  },
  {
    question:
      "What's the difference between collision and comprehensive coverage?",
    answer:
      "Collision covers damage to your vehicle from a crash with another vehicle or object, regardless of fault. Comprehensive covers non-collision events such as theft, vandalism, hail, fire, and hitting an animal.",
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
    photoSlug: "home-insurance",
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
