"use client";

import { industryPages } from "@/data/commercial-industries";
import { getProductPage } from "@/data/product-pages";
import {
  adaptCommercialIndustryContent,
  adaptCommercialProductContent,
} from "@/lib/buildPilotProductConfig";
import type { PilotProductPageConfig } from "@/types/pilot-product";
import { pilotCommercialInlineConfigs } from "@/data/pilot-commercial-inline";

/** Batch C — farm, food truck */
const BATCH_C_INDUSTRY_SLUGS = new Set([
  "farm-insurance",
  "food-truck-insurance",
]);

/** Batch D — trucking, commercial auto, dump truck */
const BATCH_D_INDUSTRY_SLUGS = new Set([
  "trucking-insurance",
  "commercial-auto-insurance",
  "dump-truck-insurance",
]);

export const BATCH_B_INDUSTRY_SLUGS = [
  "contractors-insurance",
  "manufacturing-insurance",
  "commercial-property-insurance",
  "restaurant-insurance",
  "professional-offices-insurance",
  "real-estate-insurance",
  "builders-developers-insurance",
  "retail-insurance",
] as const;

export const BATCH_B_PRODUCT_SLUGS = [
  "small-business-insurance",
  "landscaping-snow-removal-insurance",
  "cyber-insurance",
  "directors-officers-insurance",
  "business-interruption-insurance",
  "professional-liability-insurance",
  "cargo-freight-insurance",
  "garage-dealership-insurance",
  "builders-risk-insurance",
  "warehousing-insurance",
  "property-management-insurance",
  "condominium-corporation-insurance",
  "pollution-liability-insurance",
  "product-recall-insurance",
  "hotel-motel-insurance",
  "convenience-store-insurance",
  "grocery-specialty-food-insurance",
  "medical-dental-insurance",
  "pharmacy-insurance",
  "fitness-gym-insurance",
  "salon-barber-insurance",
  "non-profit-insurance",
  "religious-organizations-insurance",
  "daycare-private-school-insurance",
  "event-liability-insurance",
  "liquor-liability-insurance",
  "crime-fidelity-insurance",
  "employment-practices-liability-insurance",
] as const;

function buildRegistry(): Map<string, PilotProductPageConfig> {
  const map = new Map<string, PilotProductPageConfig>(
    Object.entries(pilotCommercialInlineConfigs),
  );

  for (const slug of BATCH_B_INDUSTRY_SLUGS) {
    const content = industryPages.find((page) => page.slug === slug);
    if (content) {
      map.set(slug, adaptCommercialIndustryContent(content));
    }
  }

  for (const slug of BATCH_B_PRODUCT_SLUGS) {
    const content = getProductPage(slug);
    if (content) {
      map.set(slug, adaptCommercialProductContent(content));
    }
  }

  return map;
}

const registry = buildRegistry();

export function getPilotCommercialConfig(slug: string): PilotProductPageConfig {
  const config = registry.get(slug);
  if (!config) {
    throw new Error(`Unknown pilot commercial page slug: ${slug}`);
  }
  return config;
}

export function getPilotCommercialSlugs(): string[] {
  return Array.from(registry.keys());
}

export function isBatchBIndustrySlug(slug: string): boolean {
  return (BATCH_B_INDUSTRY_SLUGS as readonly string[]).includes(slug);
}

export function isReservedCommercialSlug(slug: string): boolean {
  return BATCH_C_INDUSTRY_SLUGS.has(slug) || BATCH_D_INDUSTRY_SLUGS.has(slug);
}
