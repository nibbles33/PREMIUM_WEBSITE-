/**
 * Homepage commercial discovery taxonomy helpers.
 *
 * Canonical industry IDs, titles, product labels, and URLs live in
 * `src/data/nav-business.ts`. This module documents analytics ID migration
 * and exposes helpers that read product lists from that single source.
 */

import {
  businessNavCategories,
  businessNavIndustries,
  businessNavSpecialtyGroup,
  type BusinessNavCategory,
} from "@/data/nav-business";

/**
 * Canonical homepage discovery category IDs (nav-business).
 * Agriculture is Business-nav only for now — excluded from homepage discovery.
 */
export type HomepageCategoryId = Exclude<
  BusinessNavCategory["id"],
  "agriculture"
>;

/**
 * Analytics ID migration — old homepage tab IDs → canonical nav IDs.
 * Use when interpreting historical `commercial_category_select` /
 * `commercial_product_select` events that still carry pre-alignment IDs.
 *
 * Old ID              → New ID
 * -------------------   -------------------------
 * transportation      → transportation-trucking
 * construction        → construction-contractors
 * property            → real-estate
 * manufacturing       → manufacturing
 * hospitality         → hospitality-restaurants
 * professional        → professional-services
 * retail              → retail-grocery
 * health              → healthcare-wellness
 * community           → specialty-community
 * specialty           → specialty-community
 *                     (former Specialty Risks products now live under their
 *                      industry tabs; the secondary Specialty & Community
 *                      control only surfaces Non-Profit / Religious / Daycare)
 */
export const HOMEPAGE_ANALYTICS_ID_MIGRATION: Record<string, HomepageCategoryId> =
  {
    transportation: "transportation-trucking",
    construction: "construction-contractors",
    property: "real-estate",
    manufacturing: "manufacturing",
    hospitality: "hospitality-restaurants",
    professional: "professional-services",
    retail: "retail-grocery",
    health: "healthcare-wellness",
    community: "specialty-community",
    specialty: "specialty-community",
  };

/**
 * Every product URL previously shown on any homepage commercial tab.
 * Alignment must keep each href discoverable via an industry tab or
 * Specialty & Community (verified at build time by the completeness script).
 */
export const LEGACY_HOMEPAGE_PRODUCT_URLS: readonly string[] = [
  "/commercial-auto-insurance/",
  "/trucking-insurance/",
  "/dump-truck-insurance/",
  "/cargo-freight-insurance/",
  "/garage-dealership-insurance/",
  "/contractors-insurance/",
  "/builders-developers-insurance/",
  "/builders-risk-insurance/",
  "/bonding-insurance/",
  "/landscaping-snow-removal-insurance/",
  "/pollution-liability-insurance/",
  "/commercial-property-insurance/",
  "/property-management-insurance/",
  "/condominium-corporation-insurance/",
  "/warehousing-insurance/",
  "/business-interruption-insurance/",
  "/real-estate-insurance/",
  "/manufacturing-insurance/",
  "/cannabis-producer-insurance/",
  "/product-recall-insurance/",
  "/restaurant-insurance/",
  "/food-truck-insurance/",
  "/hotel-motel-insurance/",
  "/liquor-liability-insurance/",
  "/grocery-specialty-food-insurance/",
  "/retail-insurance/",
  "/convenience-store-insurance/",
  "/cannabis-retail-insurance/",
  "/pharmacy-insurance/",
  "/salon-barber-insurance/",
  "/professional-offices-insurance/",
  "/professional-liability-insurance/",
  "/small-business-insurance/",
  "/directors-officers-insurance/",
  "/cyber-insurance/",
  "/medical-dental-insurance/",
  "/fitness-gym-insurance/",
  "/non-profit-insurance/",
  "/religious-organizations-insurance/",
  "/daycare-private-school-insurance/",
  "/event-liability-insurance/",
  "/employment-practices-liability-insurance/",
  "/crime-fidelity-insurance/",
];

export type HomepageCategoryProduct = {
  label: string;
  href: string;
};

function categoryById(categoryId: HomepageCategoryId): BusinessNavCategory {
  const category = businessNavCategories.find((c) => c.id === categoryId);
  if (!category) {
    throw new Error(`Unknown homepage/nav category id: ${categoryId}`);
  }
  return category;
}

/** Product list for a category — delegated to nav-business (no duplicate lists). */
export function getHomepageCategoryProducts(
  categoryId: HomepageCategoryId,
): HomepageCategoryProduct[] {
  return categoryById(categoryId).links.map((link) => ({
    label: link.label,
    href: link.href,
  }));
}

/** Primary industry IDs in approved display order (excludes Specialty & Community). */
export const HOMEPAGE_INDUSTRY_IDS: HomepageCategoryId[] =
  businessNavIndustries.map((c) => c.id);

/** Specialty & Community group id. */
export const HOMEPAGE_SPECIALTY_ID: HomepageCategoryId =
  businessNavSpecialtyGroup.id;

/** All discovery category IDs (8 industries + specialty group). */
export const HOMEPAGE_CATEGORY_IDS: HomepageCategoryId[] = [
  ...HOMEPAGE_INDUSTRY_IDS,
  HOMEPAGE_SPECIALTY_ID,
];

/**
 * Assignment map derived from nav-business for completeness tooling.
 * Not an independent product source — mirrors canonical nav links.
 * Excludes Agriculture (Business mega-menu only until homepage expands).
 */
export const HOMEPAGE_CATEGORY_ASSIGNMENTS: Record<
  HomepageCategoryId,
  readonly string[]
> = Object.fromEntries(
  businessNavCategories
    .filter((category): category is BusinessNavCategory & { id: HomepageCategoryId } =>
      category.id !== "agriculture",
    )
    .map((category) => [
      category.id,
      category.links.map((link) => link.href),
    ]),
) as Record<HomepageCategoryId, readonly string[]>;

/** Union of every href currently offered in homepage discovery. */
export function getAllHomepageDiscoveryHrefs(): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const category of businessNavCategories) {
    for (const link of category.links) {
      if (seen.has(link.href)) continue;
      seen.add(link.href);
      out.push(link.href);
    }
  }
  return out;
}
