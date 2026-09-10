/**
 * Contractors animation assets — full 1672×941 canvas transparent object PNGs
 * and dedicated clean-background scenes for handoff choreography.
 *
 * Each transparent object is pre-positioned within the full diorama canvas;
 * composite at (0,0) over the matching clean background without manual offsets.
 */

const BASE = "/images/premium-contractors-animation-assets";

export const CONTRACTORS_ANIMATION_ASSETS = {
  tools: {
    cleanBackground: `${BASE}/contractors-tools-clean-background.png`,
    compositeProof: `${BASE}/contractors-tools-composite-proof.png`,
    objects: {
      generator: `${BASE}/contractors-tools-generator-transparent.png`,
      powerTools: `${BASE}/contractors-tools-power-tools-transparent.png`,
      saw: `${BASE}/contractors-tools-saw-transparent.png`,
      toolbox: `${BASE}/contractors-tools-toolbox-transparent.png`,
      worklight: `${BASE}/contractors-tools-worklight-transparent.png`,
    },
  },
  builders: {
    cleanBackground: `${BASE}/contractors-builders-clean-background.png`,
    compositeProof: `${BASE}/contractors-builders-composite-proof.png`,
    objects: {
      lumberStack1: `${BASE}/contractors-builders-lumber-stack-1-transparent.png`,
      lumberStack2: `${BASE}/contractors-builders-lumber-stack-2-transparent.png`,
      materialStack: `${BASE}/contractors-builders-material-stack-transparent.png`,
      wrappedMaterials: `${BASE}/contractors-builders-wrapped-materials-transparent.png`,
    },
  },
} as const;

/** All animation asset URLs for preload during handoff sequences. */
export function getContractorsAnimationPreloadUrls(): string[] {
  const { tools, builders } = CONTRACTORS_ANIMATION_ASSETS;
  return [
    tools.cleanBackground,
    builders.cleanBackground,
    ...Object.values(tools.objects),
    ...Object.values(builders.objects),
  ];
}
