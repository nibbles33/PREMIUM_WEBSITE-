/**
 * Interactive master diorama assets for Coverage Explorer wiring.
 *
 * Set A reference: `premium-restaurant.png` remains the legacy cutaway fallback
 * (`/images/premium-restaurant.png`) — not replaced by interactive masters.
 */

export const INTERACTIVE_MASTER_DIMENSIONS = {
  standard: { width: 1672, height: 941 },
  compact: { width: 1312, height: 1199 },
} as const;

/** Filename slug (without path) when it differs from the product route slug. */
export const INTERACTIVE_MASTER_FILE_ALIASES: Record<string, string> = {
  "bonding-insurance": "bonding-surety-interactive-master.png",
  "commercial-insurance": "commercial-insurance-hub-interactive-master.png",
  "commercial-auto-insurance": "commercial-auto-fleet-interactive-master.png",
  "convenience-store-insurance":
    "convenience-store-gas-station-insurance-interactive-master.png",
  "food-truck-insurance": "food-truck-trailer-insurance-interactive-master.png",
  "greenhouse-agribusiness-insurance": "greenhouse-insurance-interactive-master.png",
  "grocery-specialty-food-insurance":
    "grocery-specialty-food-bakery-insurance-interactive-master.png",
  "employment-practices-liability-insurance":
    "employment-practices-liability-interactive-master.png",
  "pollution-liability-insurance": "pollution-liability-interactive-master.png",
  "professional-liability-insurance":
    "professional-liability-eo-interactive-master.png",
};

/** All 58 live product routes → interactive master filename. */
export const ROUTE_TO_INTERACTIVE_MASTER_FILE: Record<string, string> = {
  "auto-insurance": "auto-insurance-interactive-master.png",
  "home-insurance": "home-insurance-interactive-master.png",
  "condo-insurance": "condo-insurance-interactive-master.png",
  "tenant-insurance": "tenant-insurance-interactive-master.png",
  "landlord-insurance": "landlord-insurance-interactive-master.png",
  "cottage-insurance": "cottage-insurance-interactive-master.png",
  "motorcycle-insurance": "motorcycle-insurance-interactive-master.png",
  "boat-insurance": "boat-insurance-interactive-master.png",
  "travel-insurance": "travel-insurance-interactive-master.png",
  "mobile-home-insurance": "mobile-home-insurance-interactive-master.png",
  "personal-umbrella-insurance":
    "personal-umbrella-insurance-interactive-master.png",
  "home-sharing-insurance": "home-sharing-insurance-interactive-master.png",
  "life-insurance": "life-insurance-interactive-master.png",
  "group-home-auto-insurance":
    "group-home-auto-insurance-interactive-master.png",
  "commercial-insurance": "commercial-insurance-hub-interactive-master.png",
  "commercial-auto-insurance": "commercial-auto-fleet-interactive-master.png",
  "trucking-insurance": "trucking-insurance-interactive-master.png",
  "contractors-insurance": "contractors-insurance-interactive-master.png",
  "builders-developers-insurance":
    "builders-developers-insurance-interactive-master.png",
  "manufacturing-insurance": "manufacturing-insurance-interactive-master.png",
  "commercial-property-insurance":
    "commercial-property-insurance-interactive-master.png",
  "restaurant-insurance": "restaurant-insurance-interactive-master.png",
  "food-truck-insurance": "food-truck-trailer-insurance-interactive-master.png",
  "retail-insurance": "retail-insurance-interactive-master.png",
  "professional-offices-insurance":
    "professional-offices-insurance-interactive-master.png",
  "real-estate-insurance": "real-estate-insurance-interactive-master.png",
  "farm-insurance": "farm-insurance-interactive-master.png",
  "dump-truck-insurance": "dump-truck-insurance-interactive-master.png",
  "bonding-insurance": "bonding-surety-interactive-master.png",
  "greenhouse-agribusiness-insurance":
    "greenhouse-insurance-interactive-master.png",
  "garage-dealership-insurance":
    "garage-dealership-insurance-interactive-master.png",
  "builders-risk-insurance": "builders-risk-insurance-interactive-master.png",
  "cargo-freight-insurance": "cargo-freight-insurance-interactive-master.png",
  "condominium-corporation-insurance":
    "condominium-corporation-insurance-interactive-master.png",
  "property-management-insurance":
    "property-management-insurance-interactive-master.png",
  "convenience-store-insurance":
    "convenience-store-gas-station-insurance-interactive-master.png",
  "daycare-private-school-insurance":
    "daycare-private-school-insurance-interactive-master.png",
  "grocery-specialty-food-insurance":
    "grocery-specialty-food-bakery-insurance-interactive-master.png",
  "fitness-gym-insurance": "fitness-gym-insurance-interactive-master.png",
  "hotel-motel-insurance": "hotel-motel-insurance-interactive-master.png",
  "landscaping-snow-removal-insurance":
    "landscaping-snow-removal-insurance-interactive-master.png",
  "medical-dental-insurance": "medical-dental-insurance-interactive-master.png",
  "pharmacy-insurance": "pharmacy-insurance-interactive-master.png",
  "religious-organizations-insurance":
    "religious-organizations-insurance-interactive-master.png",
  "salon-barber-insurance": "salon-barber-insurance-interactive-master.png",
  "warehousing-insurance": "warehousing-insurance-interactive-master.png",
  "directors-officers-insurance":
    "directors-officers-insurance-interactive-master.png",
  "employment-practices-liability-insurance":
    "employment-practices-liability-interactive-master.png",
  "cyber-insurance": "cyber-insurance-interactive-master.png",
  "small-business-insurance": "small-business-insurance-interactive-master.png",
  "non-profit-insurance": "non-profit-insurance-interactive-master.png",
  "event-liability-insurance":
    "event-liability-insurance-interactive-master.png",
  "liquor-liability-insurance":
    "liquor-liability-insurance-interactive-master.png",
  "business-interruption-insurance":
    "business-interruption-insurance-interactive-master.png",
  "crime-fidelity-insurance": "crime-fidelity-insurance-interactive-master.png",
  "professional-liability-insurance":
    "professional-liability-eo-interactive-master.png",
  "pollution-liability-insurance": "pollution-liability-interactive-master.png",
  "product-recall-insurance":
    "product-recall-insurance-interactive-master.png",
};

/** Asset files on disk without a live product route (6 extras beyond the 58-route set). */
export const EXCLUDED_EXTRA_ASSETS = [
  "bus-insurance-interactive-master.png",
  "cannabis-retail-insurance-interactive-master.png",
  "commercial-general-liability-interactive-master.png",
  "nonprofit-church-insurance-interactive-master.png",
  "wholesale-distribution-insurance-interactive-master.png",
  "winery-brewery-insurance-interactive-master.png",
] as const;

/** Reverse lookup: filename slug → route slug (only entries that differ). */
export const INTERACTIVE_MASTER_ROUTE_ALIASES: Record<string, string> =
  Object.fromEntries(
    Object.entries(INTERACTIVE_MASTER_FILE_ALIASES).map(([route, file]) => [
      file.replace(/\.png$/, ""),
      route,
    ]),
  );

export function getInteractiveMasterSrc(slug: string): string | null {
  const file = ROUTE_TO_INTERACTIVE_MASTER_FILE[slug];
  if (!file) return null;
  return `/images/${file}`;
}

export function getInteractiveMasterFilename(slug: string): string | null {
  return ROUTE_TO_INTERACTIVE_MASTER_FILE[slug] ?? null;
}
