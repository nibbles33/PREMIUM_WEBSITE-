/** Shared homepage rail timing — reduced = ~2.5× normal (gentler, still moving) */

export const PILOT_RAIL_DURATIONS = {
  carrier: { normal: 110, reduced: 275 },
  awards: { normal: 130, reduced: 325 },
  yep: { normal: 100, reduced: 250 },
} as const;

/** Personal filmstrip: px per frame at ~60fps (~39px/s normal) */
export const PILOT_PERSONAL_RAIL_SPEED = {
  normal: 0.65,
  reduced: 0.26,
  mobile: 0.45,
  mobileReduced: 0.18,
} as const;

/** Awards interactive rail — ~16px/s normal (130s loop equivalent) */
export const PILOT_AWARDS_RAIL_SPEED = {
  normal: 0.35,
  reduced: 0.14,
  mobile: 0.3,
  mobileReduced: 0.12,
} as const;
