/**
 * Restaurant Coverage Explorer — multi-image state system (Phase 1 prototype).
 *
 * Base master (unchanged): /images/restaurant-insurance-interactive-master.png
 * State images: supplied proof pack under premium-coverage-explorer-restaurant-proof/
 */

import { INTERACTIVE_MASTER_DIMENSIONS } from "@/data/coverage-explorer/interactive-master-assets";

export const RESTAURANT_BASE_MASTER_SRC =
  "/images/restaurant-insurance-interactive-master.png";

const PROOF_BASE =
  "/images/premium-coverage-explorer-restaurant-proof/restaurant-insurance";

/** Manifest coverage_key → filename (from coverage-explorer-state-manifest.csv). */
export const RESTAURANT_STATE_FILES = {
  "general-liability": `${PROOF_BASE}/restaurant-insurance-state-general-liability.png`,
  property: `${PROOF_BASE}/restaurant-insurance-state-property.png`,
  "liquor-liability": `${PROOF_BASE}/restaurant-insurance-state-liquor-liability.png`,
  "equipment-breakdown": `${PROOF_BASE}/restaurant-insurance-state-equipment-breakdown.png`,
} as const;

/**
 * Explicit mapping: live site coverage IDs → manifest coverage_key.
 * Manifest uses `property` and `equipment-breakdown`; site registry uses longer ids.
 */
export const RESTAURANT_COVERAGE_ID_TO_STATE_KEY: Record<string, keyof typeof RESTAURANT_STATE_FILES> = {
  "general-liability": "general-liability",
  "property-coverage": "property",
  "liquor-liability": "liquor-liability",
  "equipment-breakdown-spoilage": "equipment-breakdown",
};

export function getRestaurantStateImageSrc(coverageId: string): string | null {
  const key = RESTAURANT_COVERAGE_ID_TO_STATE_KEY[coverageId];
  if (!key) return null;
  return RESTAURANT_STATE_FILES[key];
}

/** All state image URLs for preloading (excludes base master). */
export function getRestaurantStateImagePreloadUrls(): string[] {
  return Object.values(RESTAURANT_STATE_FILES);
}

export const RESTAURANT_STATE_IMAGE_DIMENSIONS = INTERACTIVE_MASTER_DIMENSIONS.standard;
