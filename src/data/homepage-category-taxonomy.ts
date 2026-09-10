/**
 * Approved homepage commercial category → product assignments.
 *
 * Source of truth: docs/master-product-inventory-navigation-audit-2026-09-10.md
 * Section X (canonical taxonomy) + reconciliation owner decisions (4e68fc4).
 *
 * Includes PRIMARY and approved SECONDARY assignments. Overlap across tabs is
 * intentional (e.g. Cannabis Retail → Retail + Specialty). Duplicates within a
 * single tab are prevented at build time.
 */

export type HomepageCategoryId =
  | "transportation"
  | "construction"
  | "property"
  | "manufacturing"
  | "hospitality"
  | "professional"
  | "retail"
  | "health"
  | "community"
  | "specialty";

/** Short visitor-facing labels for homepage product links. */
export const HOMEPAGE_PRODUCT_LABELS: Record<string, string> = {
  "/commercial-auto-insurance/": "Commercial Auto",
  "/trucking-insurance/": "Trucking",
  "/dump-truck-insurance/": "Dump Truck",
  "/cargo-freight-insurance/": "Cargo / Freight",
  "/garage-dealership-insurance/": "Garage / Dealership",
  "/contractors-insurance/": "Contractors",
  "/builders-developers-insurance/": "Builders & Developers",
  "/builders-risk-insurance/": "Builder's Risk",
  "/bonding-insurance/": "Surety Bonds",
  "/landscaping-snow-removal-insurance/": "Landscaping & Snow Removal",
  "/pollution-liability-insurance/": "Pollution Liability",
  "/commercial-property-insurance/": "Commercial Property",
  "/property-management-insurance/": "Property Management",
  "/condominium-corporation-insurance/": "Condo Corporation",
  "/warehousing-insurance/": "Warehousing",
  "/business-interruption-insurance/": "Business Interruption",
  "/real-estate-insurance/": "Real Estate",
  "/manufacturing-insurance/": "Manufacturing",
  "/cannabis-producer-insurance/": "Cannabis Producer",
  "/product-recall-insurance/": "Product Recall",
  "/restaurant-insurance/": "Restaurants",
  "/food-truck-insurance/": "Food Truck / Trailer",
  "/hotel-motel-insurance/": "Hotel / Motel",
  "/liquor-liability-insurance/": "Liquor Liability",
  "/grocery-specialty-food-insurance/": "Grocery / Bakery",
  "/retail-insurance/": "Retail",
  "/convenience-store-insurance/": "Convenience / Gas",
  "/cannabis-retail-insurance/": "Cannabis Retail",
  "/pharmacy-insurance/": "Pharmacy",
  "/salon-barber-insurance/": "Salon / Barber",
  "/professional-offices-insurance/": "Professional Offices",
  "/professional-liability-insurance/": "Professional Liability",
  "/directors-officers-insurance/": "Directors & Officers",
  "/cyber-insurance/": "Cyber",
  "/medical-dental-insurance/": "Medical & Dental",
  "/fitness-gym-insurance/": "Fitness / Gym",
  "/non-profit-insurance/": "Non-Profit",
  "/religious-organizations-insurance/": "Religious Organizations",
  "/daycare-private-school-insurance/": "Daycare / School",
  "/event-liability-insurance/": "Event Liability",
  "/employment-practices-liability-insurance/": "Employment Practices Liability",
  "/crime-fidelity-insurance/": "Crime & Fidelity",
};

/**
 * Approved product hrefs per homepage category (primary + secondary).
 * Order: primary industry products first, then secondary / cross-discovery.
 */
export const HOMEPAGE_CATEGORY_ASSIGNMENTS: Record<
  HomepageCategoryId,
  readonly string[]
> = {
  transportation: [
    "/commercial-auto-insurance/",
    "/trucking-insurance/",
    "/dump-truck-insurance/",
    "/cargo-freight-insurance/",
    "/garage-dealership-insurance/",
  ],
  construction: [
    "/contractors-insurance/",
    "/builders-developers-insurance/",
    "/builders-risk-insurance/",
    "/landscaping-snow-removal-insurance/",
    "/dump-truck-insurance/",
    "/bonding-insurance/",
    "/pollution-liability-insurance/",
  ],
  property: [
    "/commercial-property-insurance/",
    "/property-management-insurance/",
    "/condominium-corporation-insurance/",
    "/warehousing-insurance/",
    "/business-interruption-insurance/",
    "/real-estate-insurance/",
  ],
  manufacturing: [
    "/manufacturing-insurance/",
    "/cannabis-producer-insurance/",
    "/product-recall-insurance/",
    "/pollution-liability-insurance/",
  ],
  hospitality: [
    "/restaurant-insurance/",
    "/food-truck-insurance/",
    "/hotel-motel-insurance/",
    "/liquor-liability-insurance/",
    "/grocery-specialty-food-insurance/",
  ],
  professional: [
    "/professional-offices-insurance/",
    "/real-estate-insurance/",
    "/professional-liability-insurance/",
    "/directors-officers-insurance/",
    "/cyber-insurance/",
  ],
  retail: [
    "/retail-insurance/",
    "/convenience-store-insurance/",
    "/grocery-specialty-food-insurance/",
    "/cannabis-retail-insurance/",
    "/pharmacy-insurance/",
    "/salon-barber-insurance/",
  ],
  health: [
    "/medical-dental-insurance/",
    "/pharmacy-insurance/",
    "/fitness-gym-insurance/",
    "/salon-barber-insurance/",
  ],
  community: [
    "/non-profit-insurance/",
    "/religious-organizations-insurance/",
    "/daycare-private-school-insurance/",
    "/event-liability-insurance/",
    "/directors-officers-insurance/",
    "/employment-practices-liability-insurance/",
  ],
  // Specialty PRIMARY only (Section X). Secondary specialties remain housed
  // on their industry tabs — do not dump them here as homepage fixtures.
  specialty: [
    "/cyber-insurance/",
    "/crime-fidelity-insurance/",
    "/bonding-insurance/",
    "/cannabis-retail-insurance/",
    "/cannabis-producer-insurance/",
    "/employment-practices-liability-insurance/",
  ],
};

export type HomepageCategoryProduct = {
  label: string;
  href: string;
};

function dedupeHrefs(hrefs: readonly string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const href of hrefs) {
    if (seen.has(href)) continue;
    seen.add(href);
    out.push(href);
  }
  return out;
}

export function getHomepageCategoryProducts(
  categoryId: HomepageCategoryId,
): HomepageCategoryProduct[] {
  const hrefs = dedupeHrefs(HOMEPAGE_CATEGORY_ASSIGNMENTS[categoryId]);
  return hrefs.map((href) => {
    const label = HOMEPAGE_PRODUCT_LABELS[href];
    if (!label) {
      throw new Error(
        `Missing HOMEPAGE_PRODUCT_LABELS entry for ${href} (${categoryId})`,
      );
    }
    return { label, href };
  });
}

export const HOMEPAGE_CATEGORY_IDS = Object.keys(
  HOMEPAGE_CATEGORY_ASSIGNMENTS,
) as HomepageCategoryId[];
