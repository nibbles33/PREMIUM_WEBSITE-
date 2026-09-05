import type { CoverageMotionRecipesByCoverageId } from "@/types/coverage-motion";

/**
 * Contractors motion prototype — Property + Tools & Equipment only.
 *
 * Property objectLayers are defined as slots for future transparent PNG assets.
 * No src values are supplied; falling-material motion uses interim vertical reveal.
 */
export const CONTRACTORS_MOTION_RECIPES: CoverageMotionRecipesByCoverageId = {
  "builder-s-risk": {
    type: "vertical-reveal-settle",
    durationMs: 1300,
    objectLayers: [
      {
        id: "material-stack-a",
        delayMs: 120,
        durationMs: 720,
        left: "18%",
        top: "32%",
        width: "14%",
        height: "10%",
      },
      {
        id: "material-stack-b",
        delayMs: 260,
        durationMs: 760,
        left: "34%",
        top: "28%",
        width: "12%",
        height: "9%",
      },
      {
        id: "material-crate",
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
    durationMs: 1000,
    emphasisCenter: { x: "62%", y: "54%" },
  },
};
