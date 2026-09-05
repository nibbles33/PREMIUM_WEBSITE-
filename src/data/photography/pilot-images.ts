/** Pilot homepage image delivery settings — photography quality only. */

export const PILOT_HERO_IMAGE = {
  quality: 90,
  /** Cap hint at native master width (1672px) to avoid overscaled derivatives. */
  sizes: "(min-width: 1680px) 1672px, 100vw",
  unoptimized: false,
} as const;

export const PILOT_FILMSTRIP_IMAGE = {
  quality: 85,
  /** Card ~220px; 280px sizes hint pulls 384px+ srcset for crisp 1x/2x delivery. */
  sizes: "(max-width: 767px) 200px, 360px",
} as const;

export const PILOT_CHIP_IMAGE = {
  quality: 85,
  /** 44px chip thumbnail at 2x DPR. */
  sizes: "88px",
} as const;

export const PILOT_YEP_TILE_IMAGE = {
  quality: 85,
  /** ~96px photo at 2x DPR inside premium media tiles. */
  sizes: "192px",
} as const;

export const PILOT_COMMERCIAL_PANEL_IMAGE = {
  quality: 85,
  sizes: "(max-width: 1024px) 100vw, 720px",
} as const;

export const PILOT_AUTO_HERO_IMAGE = {
  quality: 90,
  sizes: "(max-width: 1024px) 100vw, 640px",
} as const;

export const PILOT_AUTO_RELATED_IMAGE = {
  quality: 85,
  sizes: "(max-width: 767px) 240px, 400px",
} as const;

export const PILOT_AUTO_COVERAGE_CAR = {
  src: "/images/miniatures/premium-miniature-car.png",
  width: 1254,
  height: 1254,
  quality: 92,
  /** Stage ~560px desktop; cap at native 1254px for crisp 2x. */
  sizes: "(max-width: 767px) min(100vw, 360px), 560px",
} as const;
