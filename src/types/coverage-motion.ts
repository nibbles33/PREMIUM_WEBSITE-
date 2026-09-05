/** Extensible motion recipe types for Coverage Explorer state transitions. */

export type CoverageMotionType =
  | "none"
  /** Interim: vertical reveal + settle on full state image (Property) */
  | "vertical-reveal-settle"
  /** Interim: localized equipment/light emphasis (Tools & Equipment) */
  | "equipment-activate";

/** Future transparent overlay slot — plug in `src` when assets exist. */
export type CoverageMotionObjectLayer = {
  id: string;
  src?: string;
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
  /** Total motion duration until fully settled (ms) */
  durationMs: number;
  /** Optional independent object layers (require transparent PNG assets) */
  objectLayers?: CoverageMotionObjectLayer[];
  /** Equipment-activate: radial emphasis center (% of stage) */
  emphasisCenter?: { x: string; y: string };
};

export type CoverageMotionRecipesByCoverageId = Record<string, CoverageMotionRecipe>;
