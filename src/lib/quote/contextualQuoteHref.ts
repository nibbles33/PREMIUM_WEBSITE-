/**
 * Allowlisted contextual Get a Quote URLs.
 *
 * Only params/values supported by QuoteUrlParams + seedAnswersFromParams.
 * Paths not listed (hub, personal, agriculture, resources, unknown) fall back
 * to the generic quote entry.
 */

export const GENERIC_QUOTE_HREF = "/get-a-quote/";

const QUOTE_BUSINESS = "/get-a-quote?type=business";
const QUOTE_COMMERCIAL_VEHICLES = "/get-a-quote?type=commercial-vehicles";

/**
 * Explicit pathname slug → verified commercial quote URL.
 * Keys are route slugs without leading/trailing slashes.
 *
 * Excludes:
 * - commercial-insurance (hub — keep generic)
 * - agriculture hub / crop-insurance (Agricorp referral — keep generic)
 */
const PATH_QUOTE_ALLOWLIST: Readonly<Record<string, string>> = {
  // Agriculture product pages (supported quote params only)
  "farm-insurance": "/get-a-quote?type=farm",
  "livestock-insurance": "/get-a-quote?type=farm",
  "farm-equipment-insurance": "/get-a-quote?type=farm",
  "greenhouse-agribusiness-insurance": QUOTE_BUSINESS,
  // Focus + typed peers (match existing product quoteHref)
  "contractors-insurance": `${QUOTE_BUSINESS}&businessType=contractor`,
  "landscaping-snow-removal-insurance": `${QUOTE_BUSINESS}&businessType=contractor`,
  "restaurant-insurance": `${QUOTE_BUSINESS}&businessType=restaurant`,
  "hotel-motel-insurance": `${QUOTE_BUSINESS}&businessType=restaurant`,
  "liquor-liability-insurance": `${QUOTE_BUSINESS}&businessType=restaurant`,
  "manufacturing-insurance": `${QUOTE_BUSINESS}&businessType=manufacturing`,
  "professional-liability-insurance": `${QUOTE_BUSINESS}&businessType=professional`,
  "cyber-insurance": `${QUOTE_BUSINESS}&businessType=professional`,
  "directors-officers-insurance": `${QUOTE_BUSINESS}&businessType=professional`,
  "employment-practices-liability-insurance": `${QUOTE_BUSINESS}&businessType=professional`,
  "medical-dental-insurance": `${QUOTE_BUSINESS}&businessType=professional`,
  "commercial-auto-insurance": QUOTE_COMMERCIAL_VEHICLES,
  "trucking-insurance": QUOTE_COMMERCIAL_VEHICLES,
  "dump-truck-insurance": QUOTE_COMMERCIAL_VEHICLES,
  "cargo-freight-insurance": QUOTE_COMMERCIAL_VEHICLES,
  "garage-dealership-insurance": QUOTE_COMMERCIAL_VEHICLES,
  "food-truck-insurance": QUOTE_COMMERCIAL_VEHICLES,
  "commercial-property-insurance": QUOTE_BUSINESS,

  // Other commercial products whose page quoteHref is verified type=business
  "small-business-insurance": QUOTE_BUSINESS,
  "builders-developers-insurance": QUOTE_BUSINESS,
  "builders-risk-insurance": QUOTE_BUSINESS,
  "business-interruption-insurance": QUOTE_BUSINESS,
  "bonding-insurance": QUOTE_BUSINESS,
  "cannabis-producer-insurance": QUOTE_BUSINESS,
  "cannabis-retail-insurance": QUOTE_BUSINESS,
  "condominium-corporation-insurance": QUOTE_BUSINESS,
  "convenience-store-insurance": QUOTE_BUSINESS,
  "crime-fidelity-insurance": QUOTE_BUSINESS,
  "daycare-private-school-insurance": QUOTE_BUSINESS,
  "event-liability-insurance": QUOTE_BUSINESS,
  "fitness-gym-insurance": QUOTE_BUSINESS,
  "grocery-specialty-food-insurance": QUOTE_BUSINESS,
  "non-profit-insurance": QUOTE_BUSINESS,
  "pharmacy-insurance": QUOTE_BUSINESS,
  "pollution-liability-insurance": QUOTE_BUSINESS,
  "product-recall-insurance": QUOTE_BUSINESS,
  "professional-offices-insurance": QUOTE_BUSINESS,
  "property-management-insurance": QUOTE_BUSINESS,
  "real-estate-insurance": QUOTE_BUSINESS,
  "religious-organizations-insurance": QUOTE_BUSINESS,
  "retail-insurance": `${QUOTE_BUSINESS}&businessType=retail`,
  "salon-barber-insurance": QUOTE_BUSINESS,
  "warehousing-insurance": QUOTE_BUSINESS,
};

export type DiscoveryQuoteCta = {
  href: string;
  label: string;
};

/**
 * Homepage commercial discovery: contextual quote for the selected category.
 * Specialty & Community and Healthcare omit a CTA (ambiguous / misleading).
 */
const DISCOVERY_QUOTE_BY_CATEGORY: Readonly<
  Record<string, DiscoveryQuoteCta | null>
> = {
  "construction-contractors": {
    href: `${QUOTE_BUSINESS}&businessType=contractor`,
    label: "Get a Contractors Quote",
  },
  manufacturing: {
    href: `${QUOTE_BUSINESS}&businessType=manufacturing`,
    label: "Get a Manufacturing Quote",
  },
  "hospitality-restaurants": {
    href: `${QUOTE_BUSINESS}&businessType=restaurant`,
    label: "Get a Restaurant Quote",
  },
  "retail-grocery": {
    href: `${QUOTE_BUSINESS}&businessType=retail`,
    label: "Get a Retail Quote",
  },
  "transportation-trucking": {
    href: QUOTE_COMMERCIAL_VEHICLES,
    label: "Get a Fleet Quote",
  },
  "professional-services": {
    href: `${QUOTE_BUSINESS}&businessType=professional`,
    label: "Get a Professional Quote",
  },
  "real-estate": {
    href: QUOTE_BUSINESS,
    label: "Get a Business Quote",
  },
  // professional would mislabel medical/pharmacy/fitness as a "professional" quote flow
  "healthcare-wellness": null,
  "specialty-community": null,
};

function slugFromPathname(pathname: string | null | undefined): string {
  if (!pathname) return "";
  const trimmed = pathname.replace(/\/+$/, "").replace(/^\//, "");
  return trimmed;
}

/** Resolve header Get a Quote href from the current pathname. */
export function contextualQuoteHrefFromPathname(
  pathname: string | null | undefined,
): string {
  const slug = slugFromPathname(pathname);
  if (!slug) return GENERIC_QUOTE_HREF;
  return PATH_QUOTE_ALLOWLIST[slug] ?? GENERIC_QUOTE_HREF;
}

/** Resolve homepage discovery quote CTA for a nav-business category id. */
export function contextualQuoteCtaForDiscoveryCategory(
  categoryId: string,
): DiscoveryQuoteCta | null {
  if (!(categoryId in DISCOVERY_QUOTE_BY_CATEGORY)) return null;
  return DISCOVERY_QUOTE_BY_CATEGORY[categoryId] ?? null;
}
