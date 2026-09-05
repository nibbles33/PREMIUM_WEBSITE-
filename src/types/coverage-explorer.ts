import type { LucideIcon } from "lucide-react";

/** Reusable visual families — one scene architecture per family, many product slugs. */
export type CoverageVisualFamily =
  | "auto"
  | "house"
  | "condo"
  | "boat"
  | "restaurant-hospitality"
  | "commercial-building"
  | "construction"
  | "garage-dealership"
  | "factory-industrial"
  | "transport-truck"
  | "fleet-commercial-vehicle"
  | "farm"
  | "greenhouse"
  | "retail";

export type CoverageHighlightStyle = "glow" | "pulse" | "outline" | "fill";

export type CoverageZonePosition = {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  width?: string;
  height?: string;
  transform?: string;
};

export type CoverageZoneConfig = {
  id: string;
  position: CoverageZonePosition;
  style?: CoverageHighlightStyle;
  /** CSS class suffix for family-specific zone shapes */
  shape?: string;
  label?: string;
};

/** Irregular SVG path zone — viewBox 0 0 100 100 (percentage space). */
export type CoverageSvgZoneConfig = {
  id: string;
  /** SVG path `d` attribute (polygon/path in 0–100 coordinate space) */
  path: string;
  style?: CoverageHighlightStyle;
  label?: string;
};

export type CoverageCalloutConfig = {
  id: string;
  text: string;
  position: CoverageZonePosition;
  icon?: LucideIcon;
};

export type CoverageAmbientConfig = {
  /** CSS gradient or color-mix value */
  background?: string;
  /** 0–1 scene dim for inactive areas */
  dimOpacity?: number;
};

/** Per-coverage pre-rendered state image (multi-image crossfade system). */
export type CoverageStateImageConfig = {
  coverageId: string;
  src: string;
};

export type CoverageStateConfig = {
  /** Matches slugified coverage item id */
  coverageId: string;
  activeZoneIds: string[];
  ambient?: CoverageAmbientConfig;
  callouts?: CoverageCalloutConfig[];
  /** Optional scene-specific modifier class */
  sceneModifier?: string;
  /** Pre-rendered state image for coverage-state-images mode */
  stateImageSrc?: string;
};

export type CoverageObjectAsset = {
  src: string;
  width: number;
  height: number;
  quality?: number;
  sizes?: string;
  /** When true, apply blend/mask treatment for non-transparent PNGs */
  blendBackground?: boolean;
};

export type CoverageObjectLayout = {
  width?: string;
  maxWidth?: string;
  bottom?: string;
  left?: string;
  transform?: string;
  mobileWidth?: string;
  mobileMaxWidth?: string;
};

export type CoverageExplorerVisualConfig = {
  visualFamily: CoverageVisualFamily;
  /** Hero/scene photography when available */
  sceneSrc?: string;
  sceneDimensions?: { width: number; height: number };
  sceneAlt?: string;
  /** Optional foreground object (car, boat silhouette asset, etc.) */
  object?: CoverageObjectAsset;
  objectLayout?: CoverageObjectLayout;
  /** Rectangular fallback zones (legacy family configs) */
  zones: CoverageZoneConfig[];
  /** SVG path zones aligned to interactive master artwork */
  svgZones?: CoverageSvgZoneConfig[];
  /** Per-coverage visual state */
  coverageStates: CoverageStateConfig[];
  /** Scene render mode */
  sceneMode:
    | "css-cutaway"
    | "photo-scene"
    | "cutaway-miniature"
    | "object-only"
    | "interactive-master"
    | "coverage-state-images";
  /** Base master for coverage-state-images mode (default / pre-interaction) */
  baseSceneSrc?: string;
  /** coverageId → state image src for coverage-state-images mode */
  stateImagesByCoverageId?: Record<string, string>;
  /** Highlight rendering strategy — defaults to dim-only for interactive-master */
  highlightRenderer?: "dim-only" | "masked-illumination";
  /** Whether family uses built-in CSS scene geometry */
  cssSceneClass?: string;
};
