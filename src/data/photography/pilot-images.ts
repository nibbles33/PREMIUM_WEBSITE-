/**
 * Pilot homepage image delivery settings — photography quality only.
 *
 * All production photography webps are currently 1672×941.
 * sizes hints request near-native width for Retina without inventing pixels.
 * Soft full-bleed hero on large Retina displays requires higher-res SOURCE files.
 */

export const PILOT_HERO_IMAGE = {
  quality: 92,
  /** Cap at native master width (1672px) — do not request beyond source. */
  sizes: "(min-width: 1680px) 1672px, 100vw",
  unoptimized: false,
} as const;

export const PILOT_FILMSTRIP_IMAGE = {
  quality: 92,
  /** Card ~220–280px CSS; request enough for crisp 2x. */
  sizes: "(max-width: 767px) 220px, 420px",
} as const;

export const PILOT_CHIP_IMAGE = {
  quality: 90,
  /** 44px chip thumbnail at 2x DPR. */
  sizes: "88px",
} as const;

export const PILOT_YEP_TILE_IMAGE = {
  quality: 92,
  /** ~96–120px photo at 2x DPR inside premium media tiles. */
  sizes: "240px",
} as const;

export const PILOT_COMMERCIAL_PANEL_IMAGE = {
  quality: 92,
  /** Half/full panel — use more of the 1672px master on desktop. */
  sizes: "(max-width: 1024px) 100vw, 960px",
} as const;

export const PILOT_AUTO_HERO_IMAGE = {
  quality: 92,
  /** Product hero photo column — prefer near-native for Retina. */
  sizes: "(max-width: 1024px) 100vw, 960px",
} as const;

export const PILOT_AUTO_RELATED_IMAGE = {
  quality: 90,
  sizes: "(max-width: 767px) 260px, 420px",
} as const;

/** Homepage editorial panels (Why Premium / Windsor). */
export const PILOT_EDITORIAL_PANEL_IMAGE = {
  quality: 92,
  sizes: "(max-width: 1024px) 100vw, 720px",
} as const;

export const PILOT_AUTO_COVERAGE_CAR = {
  src: "/images/miniatures/premium-miniature-car.png",
  width: 1254,
  height: 1254,
  quality: 92,
  /** Stage ~560px desktop; cap at native 1254px for crisp 2x. */
  sizes: "(max-width: 767px) min(100vw, 360px), 560px",
} as const;
