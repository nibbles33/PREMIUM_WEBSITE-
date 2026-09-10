/**
 * Restaurant Coverage Explorer — per-state masked illumination effects.
 * SVG paths define mask geometry only; no visible filled polygons.
 */

export type RestaurantIlluminationValues = {
  brightness: number;
  contrast: number;
  saturate: number;
  sepia?: number;
};

export type RestaurantEdgeGlowValues = {
  strokeOpacity: number;
  strokeWidth: number;
  blurStdDeviation: number;
};

export type RestaurantHighlightEffect = {
  coverageId: string;
  /** Zone ids whose paths union into the illumination mask */
  maskZoneIds: string[];
  /** Non-target dim layer opacity (0–1) */
  dimOpacity: number;
  illumination: RestaurantIlluminationValues;
  edgeGlow: RestaurantEdgeGlowValues;
  /** Subtle pulse on specific zone edges (equipment) */
  pulse?: {
    zoneIds: string[];
    durationMs: number;
  };
  /** Perimeter path stroke animation (general liability) */
  pathTrace?: {
    zoneIds: string[];
    strokeOpacity: number;
    strokeWidth: number;
    durationMs: number;
  };
};

export const RESTAURANT_HIGHLIGHT_EFFECTS: Record<string, RestaurantHighlightEffect> = {
  "property-coverage": {
    coverageId: "property-coverage",
    maskZoneIds: ["kitchen-prep", "cooking-equipment", "cold-storage", "bar-zone"],
    dimOpacity: 0.06,
    illumination: { brightness: 1.14, contrast: 1.06, saturate: 1.08, sepia: 0.05 },
    edgeGlow: { strokeOpacity: 0.2, strokeWidth: 0.18, blurStdDeviation: 0.45 },
  },
  "liquor-liability": {
    coverageId: "liquor-liability",
    maskZoneIds: ["bar-zone", "bar-seating", "cold-storage"],
    dimOpacity: 0.05,
    illumination: { brightness: 1.16, contrast: 1.05, saturate: 1.12, sepia: 0.08 },
    edgeGlow: { strokeOpacity: 0.24, strokeWidth: 0.16, blurStdDeviation: 0.55 },
  },
  "equipment-breakdown-spoilage": {
    coverageId: "equipment-breakdown-spoilage",
    maskZoneIds: ["kitchen-prep", "cooking-equipment", "cold-storage"],
    dimOpacity: 0.06,
    illumination: { brightness: 1.12, contrast: 1.08, saturate: 1.06 },
    edgeGlow: { strokeOpacity: 0.18, strokeWidth: 0.14, blurStdDeviation: 0.35 },
    pulse: { zoneIds: ["cooking-equipment", "cold-storage"], durationMs: 2800 },
  },
  "general-liability": {
    coverageId: "general-liability",
    maskZoneIds: ["dining-floor", "entrance-facade"],
    dimOpacity: 0.05,
    illumination: { brightness: 1.1, contrast: 1.04, saturate: 1.05, sepia: 0.03 },
    edgeGlow: { strokeOpacity: 0.18, strokeWidth: 0.14, blurStdDeviation: 0.35 },
    pathTrace: {
      zoneIds: ["dining-floor", "entrance-facade"],
      strokeOpacity: 0.36,
      strokeWidth: 0.18,
      durationMs: 3200,
    },
  },
};

export function getRestaurantHighlightEffect(
  coverageId: string,
): RestaurantHighlightEffect | undefined {
  return RESTAURANT_HIGHLIGHT_EFFECTS[coverageId];
}

export function buildIlluminationFilter(values: RestaurantIlluminationValues): string {
  const sepia = values.sepia ?? 0;
  return `brightness(${values.brightness}) contrast(${values.contrast}) saturate(${values.saturate}) sepia(${sepia})`;
}
