/** Extensible motion recipe types for Coverage Explorer state transitions. */

export type CoverageMotionType =
  | "none"
  /** Clean-bg choreography → handoff to final state (Property) */
  | "vertical-reveal-settle"
  /** Clean-bg choreography → handoff to final state (Tools & Equipment) */
  | "equipment-activate";

/** Confidence that clean-bg + object choreography aligns with the final state PNG. */
export type HandoffAlignmentConfidence = "low" | "medium" | "high";

/**
 * Object layer slot — supports transparent PNG assets OR placeholder shapes
 * for choreography preview before final art is supplied.
 */
export type CoverageMotionObjectLayer = {
  id: string;
  /** Final transparent PNG — omit until asset is ready */
  src?: string;
  /** PLACEHOLDER: when true, render labeled stand-in shape instead of src */
  placeholder?: boolean;
  /** PLACEHOLDER: visible label on stand-in (choreography review only) */
  placeholderLabel?: string;
  delayMs: number;
  durationMs: number;
  /** Percentage position within rendered image area */
  left: string;
  top: string;
  width: string;
  height?: string;
};

export type CoverageMotionRecipe = {
  type: CoverageMotionType;
  /** Total sequence duration until fully settled on final state (ms) */
  durationMs: number;
  /**
   * Clean background shown during object choreography (no state-specific elements).
   * PLACEHOLDER: until dedicated clean PNGs exist, recipes may reference a stand-in.
   */
  cleanBgSrc?: string;
  /** Ms after choreography begins to start crossfade clean → final state */
  handoffAtMs?: number;
  /** Crossfade duration for clean+objects → final state (ms) */
  handoffDurationMs?: number;
  /** Owner review flag — whether invisible handoff is achievable with current assets */
  handoffAlignmentConfidence?: HandoffAlignmentConfidence;
  /** Staggered object layers (placeholders and/or transparent PNGs) */
  objectLayers?: CoverageMotionObjectLayer[];
  /** Equipment-activate: optional radial emphasis during choreography */
  emphasisCenter?: { x: string; y: string };
};

export type CoverageMotionRecipesByCoverageId = Record<string, CoverageMotionRecipe>;

/** Handoff sequence phases exposed on the stage for QA/debugging. */
export type CoverageHandoffPhase =
  | "idle"
  | "clean-transition"
  | "choreography"
  | "handoff"
  | "settled";
