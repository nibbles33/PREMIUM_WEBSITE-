# Coverage Explorer Final Wiring — QA Report

**Branch:** `cursor/coverage-explorer-wiring-7402`  
**Date:** 2026-09-05  
**Status:** Ready for owner review — do not merge/deploy

## 58/58 Route Coverage Confirmed

All 58 live product routes are mapped in `ROUTE_TO_INTERACTIVE_MASTER_FILE` with on-disk assets verified present. The commercial insurance hub (`/commercial-insurance/`) is mapped but intentionally has no Coverage Explorer UI (empty `coverageItems`, hub layout only).

| Category | Count |
|----------|-------|
| Total mapped routes | 58 |
| Routes with explorer UI | 57 product + Auto |
| Extras preserved (unwired) | 6 |

## Route → Asset Map (with alias resolutions)

Canonical source: `src/data/coverage-explorer/interactive-master-assets.ts`

| Route slug | Asset filename |
|------------|----------------|
| `bonding-insurance` | `bonding-surety-interactive-master.png` |
| `commercial-auto-insurance` | `commercial-auto-fleet-interactive-master.png` |
| `commercial-insurance` | `commercial-insurance-hub-interactive-master.png` |
| `convenience-store-insurance` | `convenience-store-gas-station-insurance-interactive-master.png` |
| `food-truck-insurance` | `food-truck-trailer-insurance-interactive-master.png` |
| `greenhouse-agribusiness-insurance` | `greenhouse-insurance-interactive-master.png` |
| `grocery-specialty-food-insurance` | `grocery-specialty-food-bakery-insurance-interactive-master.png` |
| `professional-liability-insurance` | `professional-liability-eo-interactive-master.png` |
| `employment-practices-liability-insurance` | `employment-practices-liability-interactive-master.png` |
| `pollution-liability-insurance` | `pollution-liability-interactive-master.png` |

All other 48 routes use `{route-slug}-interactive-master.png` naming.

### Preserved extras (not wired)

- `bus-insurance-interactive-master.png`
- `cannabis-retail-insurance-interactive-master.png`
- `commercial-general-liability-interactive-master.png`
- `nonprofit-church-insurance-interactive-master.png`
- `wholesale-distribution-insurance-interactive-master.png`
- `winery-brewery-insurance-interactive-master.png`

### Preserved legacy assets

Set A (`premium-*.png`), Set B dioramas, and photorealistic batch files remain on disk. `premium-restaurant.png` is documented as excellent fallback reference in `interactive-master-assets.ts`.

## Implementation Summary

- **Registry:** `getCoverageExplorerConfig(slug, coverageIds)` builds per-route config via `buildRouteExplorerConfig`
- **Visual stage:** `CoverageVisualStage` renders `interactive-master` mode with SVG path zones (viewBox 0 0 100 100)
- **Auto:** Migrated from `premium-miniature-car.png` plinth to shared system using `auto-insurance-interactive-master.png` street diorama
- **Interaction:** 250–500ms transitions, 15% scene dim, reduced-motion disables pulse animation
- **Accessibility:** Arrow/Home/End keyboard navigation on coverage tablists

## Verification Results

Runtime verification via `scripts/verify-coverage-explorer-wiring.cjs` against production build on port 3010:

| Check | Result |
|-------|--------|
| 10 alias routes | ✅ All pass |
| 12 sample routes (Auto, Home, Condo, Restaurant, Trucking, Farm, Daycare, Gym, Non-Profit, Salon, Cyber, Religious) | ✅ All pass — visual highlight + text change per state |
| Auto uses new street diorama (not premium-miniature-car) | ✅ Pass |
| Reduced motion | ✅ Active zones visible, pulse disabled, text available |
| Mobile 390px | ✅ No horizontal overflow, master image renders |
| Build | ✅ Pass |
| Console errors during verification | ✅ None |

## Flagged Manifest States

**None.** All manifest-specified coverage zones validated against archetype zone IDs (0 mismatches). No states flagged as un-implementable.

## Screenshots

Committed to `docs/qa-screenshots/coverage-explorer-wiring/`:

- `auto-diorama-desktop.png` — new street diorama master
- `auto-collision-state-desktop.png` — collision coverage state
- `auto-mobile-390.png` — mobile layout
- `home-explorer-desktop.png`, `restaurant-explorer-desktop.png`
- `bonding-alias-desktop.png`, `greenhouse-alias-desktop.png`, `fleet-alias-desktop.png`
- `daycare-new-route-desktop.png`, `gym-new-route-desktop.png`, `nonprofit-new-route-desktop.png`
- `cyber-explorer-desktop.png`, `home-reduced-motion.png`
