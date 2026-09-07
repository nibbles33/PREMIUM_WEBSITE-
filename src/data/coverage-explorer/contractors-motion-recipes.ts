import type { CoverageMotionRecipesByCoverageId } from "@/types/coverage-motion";
import { CONTRACTORS_ANIMATION_ASSETS } from "@/data/coverage-explorer/contractors-animation-assets";
import { CONTRACTORS_STATE_FILES } from "@/data/coverage-explorer/contractors-coverage-state-images";

const { tools, builders } = CONTRACTORS_ANIMATION_ASSETS;

/**
 * Contractors motion — Property + Tools & Equipment handoff sequences.
 *
 * Sequence: dedicated clean bg → staggered full-canvas transparent objects →
 * crossfade to approved final state image.
 *
 * Each object PNG is 1672×941 with the object pre-positioned; layers composite
 * at (0,0) without manual placement coordinates.
 */
export const CONTRACTORS_MOTION_RECIPES: CoverageMotionRecipesByCoverageId = {
  "builder-s-risk": {
    type: "vertical-reveal-settle",
    durationMs: 1480,
    cleanBgSrc: builders.cleanBackground,
    handoffAtMs: 980,
    handoffDurationMs: 420,
    // Approved state PNGs are composite-proof renders — handoff seamless by construction
    handoffAlignmentConfidence: "high",
    objectLayers: [
      {
        id: "lumber-stack-1",
        src: builders.objects.lumberStack1,
        fullCanvas: true,
        delayMs: 120,
        durationMs: 720,
      },
      {
        id: "lumber-stack-2",
        src: builders.objects.lumberStack2,
        fullCanvas: true,
        delayMs: 260,
        durationMs: 760,
      },
      {
        id: "material-stack",
        src: builders.objects.materialStack,
        fullCanvas: true,
        delayMs: 400,
        durationMs: 800,
      },
      {
        id: "wrapped-materials",
        src: builders.objects.wrappedMaterials,
        fullCanvas: true,
        delayMs: 520,
        durationMs: 840,
      },
    ],
  },
  "tools-equipment-coverage": {
    type: "equipment-activate",
    durationMs: 1380,
    cleanBgSrc: tools.cleanBackground,
    handoffAtMs: 860,
    handoffDurationMs: 400,
    handoffAlignmentConfidence: "high",
    emphasisCenter: { x: "62%", y: "54%" },
    objectLayers: [
      {
        id: "worklight",
        src: tools.objects.worklight,
        fullCanvas: true,
        delayMs: 80,
        durationMs: 620,
      },
      {
        id: "toolbox",
        src: tools.objects.toolbox,
        fullCanvas: true,
        delayMs: 200,
        durationMs: 680,
      },
      {
        id: "power-tools",
        src: tools.objects.powerTools,
        fullCanvas: true,
        delayMs: 320,
        durationMs: 720,
      },
      {
        id: "saw",
        src: tools.objects.saw,
        fullCanvas: true,
        delayMs: 440,
        durationMs: 760,
      },
      {
        id: "generator",
        src: tools.objects.generator,
        fullCanvas: true,
        delayMs: 560,
        durationMs: 800,
      },
    ],
  },
};

/** Final state PNG targets — derived from composite-proof renders for seamless handoff. */
export const CONTRACTORS_HANDOFF_FINAL_SRC = {
  "builder-s-risk": CONTRACTORS_STATE_FILES.property,
  "tools-equipment-coverage": CONTRACTORS_STATE_FILES["tools-equipment"],
} as const;
