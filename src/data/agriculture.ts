import type { LucideIcon } from "lucide-react";
import {
  Beef,
  Leaf,
  Sprout,
  Tractor,
  Warehouse,
} from "lucide-react";

/** Shared agriculture visual accent (aligned with existing farm/greenhouse greens). */
export const AGRICULTURE_ACCENT = "#7A8B5C";

/**
 * Agriculture hero photography inventory (Batch 1).
 * Sources imported from PR #46 PNGs; published as WebP 1672×941 q≈92.
 */
export const AGRICULTURE_PHOTOGRAPHY_ASSETS = [
  {
    slug: "agriculture",
    filename: "agriculture.webp",
    path: "public/images/photography/commercial/agriculture.webp",
    sourcePng: "agriculture-overview-hero.png",
    dimensions: "1672×941",
    objectPosition: "46% 42%",
  },
  {
    slug: "crop-insurance",
    filename: "crop-insurance.webp",
    path: "public/images/photography/commercial/crop-insurance.webp",
    sourcePng: "crop-insurance-hero.png",
    dimensions: "1672×941",
    objectPosition: "50% 58%",
  },
  {
    slug: "livestock-insurance",
    filename: "livestock-insurance.webp",
    path: "public/images/photography/commercial/livestock-insurance.webp",
    sourcePng: "livestock-insurance-hero.png",
    dimensions: "1672×941",
    objectPosition: "58% 42%",
  },
  {
    slug: "farm-equipment-insurance",
    filename: "farm-equipment-insurance.webp",
    path: "public/images/photography/commercial/farm-equipment-insurance.webp",
    sourcePng: "farm-equipment-hero.png",
    dimensions: "1672×941",
    objectPosition: "62% 48%",
  },
] as const;

/** Official Agricorp Production Insurance program page (Ontario). */
export const AGRICORP_PRODUCTION_INSURANCE_URL =
  "https://www.agricorp.com/en-ca/Programs/ProductionInsurance/Pages/Default.aspx";

export const QUOTE_FARM = "/get-a-quote?type=farm";
export const QUOTE_BUSINESS = "/get-a-quote?type=business";

export type AgricultureHubCategory = {
  label: string;
  href: string;
  description: string;
  icon: LucideIcon;
};

/** Hub cards + nav peers for the Agriculture section. */
export const agricultureHubCategories: AgricultureHubCategory[] = [
  {
    label: "Farm Insurance",
    href: "/farm-insurance/",
    description:
      "Private farm property, buildings, machinery, liability, and related farm package coverages — reviewed through an independent broker.",
    icon: Warehouse,
  },
  {
    label: "Crop Insurance",
    href: "/crop-insurance/",
    description:
      "Ontario Production Insurance and related crop programs are delivered by Agricorp. We explain the distinction and refer you to the official source.",
    icon: Sprout,
  },
  {
    label: "Livestock / Animal Insurance",
    href: "/livestock-insurance/",
    description:
      "How livestock and animal exposures are typically reviewed on farm programs — including named perils, scheduling, and common limitations.",
    icon: Beef,
  },
  {
    label: "Greenhouse & Nursery",
    href: "/greenhouse-agribusiness-insurance/",
    description:
      "Controlled-environment greenhouse and nursery operations — structures, equipment, stock treatment, and liability where markets allow.",
    icon: Leaf,
  },
  {
    label: "Farm Equipment Coverage",
    href: "/farm-equipment-insurance/",
    description:
      "Field machinery and implements versus licensed road vehicles — how equipment is usually scheduled and what still needs automobile insurance.",
    icon: Tractor,
  },
];

export const agricultureRelatedLinks = [
  { label: "Farm Insurance", href: "/farm-insurance/" },
  { label: "Crop Insurance", href: "/crop-insurance/" },
  { label: "Livestock Insurance", href: "/livestock-insurance/" },
  {
    label: "Greenhouse & Nursery Insurance",
    href: "/greenhouse-agribusiness-insurance/",
  },
  { label: "Farm Equipment Coverage", href: "/farm-equipment-insurance/" },
] as const;

export function agricultureRelatedExcept(slug: string) {
  return agricultureRelatedLinks.filter((link) => {
    const linkSlug = link.href.replace(/^\/|\/$/g, "");
    return linkSlug !== slug;
  });
}
