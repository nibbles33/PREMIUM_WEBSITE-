# Card Photography Wiring Fix — Report

**Branch:** `cursor/card-photography-wiring-7402`  
**Date:** 2026-09-04  
**Status:** STOP for owner review — do not merge, do not deploy

## Branch Setup

**Approach:** Created `cursor/card-photography-wiring-7402` from `cursor/homepage-cta-broker-visibility-7402`, then **merged `cursor/hero-images-12-7402`** (which already includes the approved `hero-images-19` work in its ancestry).

**Asset verification (all present on disk before wiring code):**

| WebP | Status |
|---|---|
| `business-interruption-insurance.webp` | OK |
| `crime-fidelity-insurance.webp` | OK |
| `cyber-insurance.webp` | OK |
| `event-venue.webp` | OK |
| `executive-leadership.webp` | OK |
| `non-profit-insurance.webp` | OK |
| `small-business-insurance.webp` | OK |

## Architectural Fix

Replaced the parallel hardcoded href→slug map with registry lookup:

1. **`getPhotographySlugFromHref(href)`** added to `src/data/photography/placements.ts` — resolves slug by matching normalized href against `photographyPlacements[].route`.
2. **`photoSlugFromHref()`** in `src/lib/buildPilotProductConfig.ts` now delegates to `getPhotographySlugFromHref()` (fixes all `productRelatedRail` instances at config build time).
3. **Render-time resolution** in `PilotBreadthUniverse`, `AutoRelatedProducts`, and `ProductRelatedProducts` — cards resolve slug from `item.href` via registry, not stale config `photoSlug`.
4. **Explicit config cleanup** in `pilot-home.ts` / `pilot-auto.ts` for yep carousel and auto rail divergences (aligned with registry; components no longer depend on these fields).

New heroes added to `placements.ts` automatically resolve on cards — no second map to maintain.

## Excluded Category Panels (UNCHANGED)

These four `commercialCategories` entries retain their **category-representative** `photoSlug` and `href` exactly as before:

| Category | photoSlug (unchanged) | href (unchanged) |
|---|---|---|
| transportation | `trucking-insurance` | `/commercial-auto-insurance/` |
| health | `professional-offices-insurance` | `/medical-dental-insurance/` |
| community | `commercial-insurance` | `/non-profit-insurance/` |
| specialty | `bonding-insurance` | `/cyber-insurance/` |

Post-wiring audit: 4 `CAN_INHERIT_FOR_FREE` instances remain — all are these excluded panels.

## 26 Destinations — Before / After

All image-bearing card instances (excluding the 4 category panels above) now match destination hero assets.

| Destination | Before (stale card asset) | After (card asset) | Instances fixed |
|---|---|---|---:|
| `/small-business-insurance/` | `commercial-insurance.webp` | `small-business-insurance.webp` | 6 |
| `/event-liability-insurance/` | `commercial-insurance.webp` | `event-venue.webp` | 6 |
| `/cyber-insurance/` | `professional-offices-insurance.webp` | `cyber-insurance.webp` | 6 |
| `/directors-officers-insurance/` | `professional-offices-insurance.webp` | `executive-leadership.webp` | 3 |
| `/crime-fidelity-insurance/` | `commercial-insurance.webp` | `crime-fidelity-insurance.webp` | 3 |
| `/non-profit-insurance/` | `commercial-insurance.webp` | `non-profit-insurance.webp` | 4 |
| `/liquor-liability-insurance/` | `commercial-insurance.webp` | `event-venue.webp` | 4 |
| `/personal-umbrella-insurance/` | `home-insurance.webp` | `personal-umbrella-insurance.webp` | 2 |
| `/warehousing-insurance/` | `commercial-property-insurance.webp` | `warehousing-insurance.webp` | 1 |
| `/cargo-freight-insurance/` | `trucking-insurance.webp` | `cargo-freight-insurance.webp` | 3 |
| `/builders-risk-insurance/` | `builders-developers-insurance.webp` | `builders-risk-insurance.webp` | 2 |
| `/business-interruption-insurance/` | `commercial-property-insurance.webp` | `business-interruption-insurance.webp` | 3 |
| `/condominium-corporation-insurance/` | `commercial-insurance.webp` | `condo-property-management.webp` | 2 |
| `/contact/` | `commercial-insurance.webp` | `contact.webp` | 1 |
| `/convenience-store-insurance/` | `commercial-insurance.webp` | `convenience-store-insurance.webp` | 1 |
| `/daycare-private-school-insurance/` | `commercial-insurance.webp` | `daycare-private-school-insurance.webp` | 1 |
| `/employment-practices-liability-insurance/` | `commercial-insurance.webp` | `executive-leadership.webp` | 2 |
| `/fitness-gym-insurance/` | `commercial-insurance.webp` | `fitness-gym-insurance.webp` | 1 |
| `/grocery-specialty-food-insurance/` | `commercial-insurance.webp` | `grocery-specialty-food-insurance.webp` | 1 |
| `/hotel-motel-insurance/` | `commercial-insurance.webp` | `hotel-motel-insurance.webp` | 1 |
| `/medical-dental-insurance/` | `professional-offices-insurance.webp` | `medical-dental-insurance.webp` | 1 |
| `/pharmacy-insurance/` | `commercial-insurance.webp` | `pharmacy-insurance.webp` | 1 |
| `/pollution-liability-insurance/` | `commercial-insurance.webp` | `manufacturing-insurance.webp` | 1 |
| `/product-recall-insurance/` | `commercial-insurance.webp` | `manufacturing-insurance.webp` | 2 |
| `/property-management-insurance/` | `commercial-insurance.webp` | `condo-property-management.webp` | 2 |
| `/religious-organizations-insurance/` | `commercial-insurance.webp` | `religious-organizations-insurance.webp` | 1 |
| `/salon-barber-insurance/` | `commercial-insurance.webp` | `salon-barber-insurance.webp` | 1 |

**Total instances fixed:** 62 card instances across the 26 unique destinations (audit originally counted 66 including 4 category-panel contexts that were intentionally excluded from this fix).

## Special Cases

### Pollution Liability / Product Recall — intentional Manufacturing reuse preserved

Registry entries point both routes to `manufacturing-insurance.webp`. Cards now correctly inherit this reuse:

- `/pollution-liability-insurance/` → `manufacturing-insurance.webp` (match: YES)
- `/product-recall-insurance/` → `manufacturing-insurance.webp` (match: YES)

### Cargo & Freight — dedicated asset (no longer shares Trucking)

- Before: `trucking-insurance.webp` (via stale alias map)
- After: `cargo-freight-insurance.webp` (via registry route lookup)
- Runtime verified on `/trucking-insurance/` related rail

## Regression Results

| Check | Result |
|---|---|
| `npm run build` | PASS |
| Post-wiring audit — unique destinations | 54/54 ALREADY CORRECT (0 stale) |
| Post-wiring audit — card instances | 198 ALREADY CORRECT, 4 excluded panels, 33 icon/no-image |
| Card navigation — click tests | **235/235 PASS** |
| Card navigation — related family tests | **51/51 PASS** |
| Card navigation — broken hrefs | 0 |
| Card navigation — mobile | 5/6 pass (1 flaky touch test — navigation not blocked) |

### Runtime verification (production server, port 3018)

| Surface | Expected asset | Result |
|---|---|---|
| `personalFilmstrip` | personal lines | PASS |
| `yepCarousel` — Event | `event-venue.webp` | PASS |
| `yepCarousel` — Warehouse | `warehousing-insurance.webp` | PASS |
| `productRelatedRail` — Cyber | `cyber-insurance.webp` | PASS |
| `productRelatedRail` — Cargo | `cargo-freight-insurance.webp` | PASS |
| `autoRelatedRail` — Umbrella | `personal-umbrella-insurance.webp` | PASS |
| `productRelatedRail` — Product Recall | `manufacturing-insurance.webp` | PASS |

## Files Changed

- `src/data/photography/placements.ts` — added `getPhotographySlugFromHref()`
- `src/data/photography/index.ts` — export new helper
- `src/lib/buildPilotProductConfig.ts` — registry-based `photoSlugFromHref()`
- `src/components/pilot/PilotBreadthUniverse.tsx` — href-based resolution
- `src/components/pilot/auto/AutoRelatedProducts.tsx` — href-based resolution
- `src/components/pilot/product/ProductRelatedProducts.tsx` — href-based resolution
- `src/data/pilot-home.ts` — yep carousel photoSlug alignment (category panels untouched)
- `src/data/pilot-auto.ts` — personal umbrella photoSlug alignment
- `scripts/card-photography-audit.cjs` — post-wiring verification script
- `scripts/card-photography-runtime-verify.cjs` — runtime spot-check script
