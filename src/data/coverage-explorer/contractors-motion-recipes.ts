import type { CoverageMotionRecipesByCoverageId } from "@/types/coverage-motion";
import { CONTRACTORS_STATE_FILES } from "@/data/coverage-explorer/contractors-coverage-state-images";

/**
 * PLACEHOLDER clean background — stand-in until dedicated clean-scene PNGs are supplied.
 * Using General Liability state image as interim clean base for choreography review.
 * Replace `CLEAN_BG_PLACEHOLDER_SRC` per coverage when real clean assets land in
 * public/images/ (e.g. from owner "contractos 2" bundle).
 */
const CLEAN_BG_PLACEHOLDER_SRC = CONTRACTORS_STATE_FILES.liability;

/**
 * Contractors motion prototype — Property + Tools & Equipment handoff sequences.
 *
 * Sequence: clean bg → staggered placeholder objects → crossfade to approved final state.
 * PLACEHOLDER objects render as labeled silhouettes until transparent PNG assets are wired via `src`.
 */
export const CONTRACTORS_MOTION_RECIPES: CoverageMotionRecipesByCoverageId = {
  "builder-s-risk": {
    type: "vertical-reveal-settle",
    durationMs: 1320,
    cleanBgSrc: CLEAN_BG_PLACEHOLDER_SRC,
    handoffAtMs: 860,
    handoffDurationMs: 420,
    // FLAG: dedicated clean-property PNG not yet supplied — handoff alignment unverified
    handoffAlignmentConfidence: "low",
    objectLayers: [
      {
        id: "material-stack-a",
        placeholder: true,
        placeholderLabel: "Material A",
        delayMs: 120,
        durationMs: 720,
        left: "18%",
        top: "32%",
        width: "14%",
        height: "10%",
      },
      {
        id: "material-stack-b",
        placeholder: true,
        placeholderLabel: "Material B",
        delayMs: 260,
        durationMs: 760,
        left: "34%",
        top: "28%",
        width: "12%",
        height: "9%",
      },
      {
        id: "material-crate",
        placeholder: true,
        placeholderLabel: "Crate",
        delayMs: 380,
        durationMs: 800,
        left: "52%",
        top: "36%",
        width: "11%",
        height: "8%",
      },
    ],
  },
  "tools-equipment-coverage": {
    type: "equipment-activate",
    durationMs: 1180,
    cleanBgSrc: CLEAN_BG_PLACEHOLDER_SRC,
    handoffAtMs: 700,
    handoffDurationMs: 400,
    handoffAlignmentConfidence: "low",
    emphasisCenter: { x: "62%", y: "54%" },
    objectLayers: [
      {
        id: "equipment-zone-primary",
        placeholder: true,
        placeholderLabel: "Equip A",
        delayMs: 80,
        durationMs: 620,
        left: "56%",
        top: "46%",
        width: "14%",
        height: "11%",
      },
      {
        id: "equipment-zone-secondary",
        placeholder: true,
        placeholderLabel: "Equip B",
        delayMs: 220,
        durationMs: 680,
        left: "64%",
        top: "52%",
        width: "12%",
        height: "9%",
      },
      {
        id: "equipment-zone-tertiary",
        placeholder: true,
        placeholderLabel: "Equip C",
        delayMs: 340,
        durationMs: 720,
        left: "48%",
        top: "54%",
        width: "10%",
        height: "8%",
      },
    ],
  },
};
