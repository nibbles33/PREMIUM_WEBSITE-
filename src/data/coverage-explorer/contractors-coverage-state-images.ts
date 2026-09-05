/**
 * Contractors Coverage Explorer — multi-image state system (motion prototype).
 *
 * Base master (unchanged): /images/contractors-insurance-interactive-master.png
 * State images: owner-supplied PNGs in /images/
 */

import { INTERACTIVE_MASTER_DIMENSIONS } from "@/data/coverage-explorer/interactive-master-assets";

export const CONTRACTORS_BASE_MASTER_SRC =
  "/images/contractors-insurance-interactive-master.png";

export const CONTRACTORS_STATE_FILES = {
  liability: "/images/contractors-insurance-state-liability.png",
  property: "/images/contractors-insurance-state-property.png",
  "tools-equipment": "/images/contractors-insurance-state-tools-equipment.png",
  "installation-work": "/images/contractors-insurance-state-installation-work.png",
} as const;

/**
 * Explicit mapping: live site coverage IDs → state image keys.
 *
 * Site registry titles differ from asset naming:
 * - general-liability → liability state image
 * - builder-s-risk → property state image (Builder's Risk / materials)
 * - wrap-up-liability → installation-work state image
 */
export const CONTRACTORS_COVERAGE_ID_TO_STATE_KEY: Record<
  string,
  keyof typeof CONTRACTORS_STATE_FILES
> = {
  "general-liability": "liability",
  "tools-equipment-coverage": "tools-equipment",
  "builder-s-risk": "property",
  "wrap-up-liability": "installation-work",
};

export function getContractorsStateImageSrc(coverageId: string): string | null {
  const key = CONTRACTORS_COVERAGE_ID_TO_STATE_KEY[coverageId];
  if (!key) return null;
  return CONTRACTORS_STATE_FILES[key];
}

export function getContractorsStateImagePreloadUrls(): string[] {
  return Object.values(CONTRACTORS_STATE_FILES);
}

export const CONTRACTORS_STATE_IMAGE_DIMENSIONS = INTERACTIVE_MASTER_DIMENSIONS.standard;
