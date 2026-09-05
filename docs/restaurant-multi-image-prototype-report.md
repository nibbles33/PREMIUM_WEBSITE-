# Restaurant Multi-Image Coverage Explorer — Prototype Report

**Branch:** `cursor/coverage-explorer-wiring-7402`  
**Scope:** Restaurant route only (`/restaurant-insurance/`). No other Coverage Explorer routes modified.  
**Status:** Ready for owner review — do not merge or deploy.

---

## Objective

Replace the rejected SVG/masking/illumination prototype with a multi-image state crossfade system using owner-supplied proof assets.

---

## Coverage ID → Image Mapping

| Site coverage ID | Manifest key | Image file |
|---|---|---|
| `general-liability` | `general-liability` | `restaurant-insurance-state-general-liability.png` |
| `property-coverage` | `property` | `restaurant-insurance-state-property.png` |
| `liquor-liability` | `liquor-liability` | `restaurant-insurance-state-liquor-liability.png` |
| `equipment-breakdown-spoilage` | `equipment-breakdown` | `restaurant-insurance-state-equipment-breakdown.png` |

**Explicit ID mismatches (manifest → site registry):**
- `property` → `property-coverage`
- `equipment-breakdown` → `equipment-breakdown-spoilage`

**Default/base image (unchanged):** `/images/restaurant-insurance-interactive-master.png`

Mapping source: `src/data/coverage-explorer/restaurant-coverage-state-images.ts`

---

## Files Added

- `public/images/premium-coverage-explorer-restaurant-proof/` (manifest, QA contact sheet, 4 state images)
- `src/data/coverage-explorer/restaurant-coverage-state-images.ts`
- `src/components/pilot/coverage-explorer/CoverageStateImageStage.tsx`
- `src/hooks/usePreloadCoverageStateImages.ts`
- `scripts/verify-restaurant-multi-image-prototype.cjs`
- `scripts/capture-restaurant-multi-image-prototype.cjs`
- `docs/qa-screenshots/restaurant-multi-image-prototype/` (7 screenshots)
- `docs/restaurant-multi-image-prototype-report.md`

## Files Modified

- `src/types/coverage-explorer.ts` — `sceneMode: "coverage-state-images"`, `baseSceneSrc`, `stateImagesByCoverageId`
- `src/data/coverage-explorer/buildRouteExplorerConfig.ts` — Restaurant-only state-image config
- `src/components/pilot/coverage-explorer/CoverageVisualStage.tsx` — routes to `CoverageStateImageStage`; skips scene layers for state-images mode
- `src/components/pilot/product/ProductCoverageExplorer.tsx` — IntersectionObserver preloading, `hasImageInteracted`, mobile width fix
- `src/components/pilot/product/ProductCoverageVisualStage.tsx` — passes `hasImageInteracted`
- `src/components/pilot/product/PilotProductPage.tsx` — passes slug (if needed for explorer wiring)
- `src/styles/pilot.css` — state-image crossfade stack, mobile aspect-ratio fix

## Preserved (not used by Restaurant)

- `MaskedIlluminationStage.tsx` — kept for reference; other routes unaffected
- `restaurant-highlight-effects.ts` — no longer wired for Restaurant

---

## Image Loading / Preloading Strategy

1. **Default master** loads normally via Next.js `<Image priority>` on first paint.
2. **State images** preload when the Restaurant Coverage Explorer section enters the viewport (`IntersectionObserver`, `rootMargin: 240px`, `threshold: 0.05`) — scoped to Restaurant route only via `sceneMode === "coverage-state-images"`.
3. **On coverage click**, `preloadCoverageStateImage()` resolves before crossfade begins; generation counter prevents stale images from winning race conditions during rapid clicks.

---

## Transition Implementation

- Dual-layer stack: outgoing `--current` fades out while incoming `--next` fades in.
- Duration: **400ms** normal (`opacity ease-in-out`); **80ms** for `prefers-reduced-motion: reduce`.
- Same container dimensions, aspect-ratio, `object-fit: contain`, `object-position: center`.
- Background gradient on stack prevents white/black flash between images.
- No zoom, pan, parallax, glow, or pulse.

---

## Default / Base State Behavior

- Coverage tablist preserves existing semantics: **General Liability tab is selected on load** (first tab, `aria-selected="true"`).
- Visual image shows the **clean base master** until the user clicks any coverage tab (`hasImageInteracted = false`).
- After first click, image crossfades to the selected coverage's state image.
- Text panel reflects the selected tab throughout (unchanged existing behavior).

---

## Failed Image Loading

- Preload failure → fallback to base master (`restaurant-insurance-interactive-master.png`).
- `<Image onError>` → immediate fallback to base master.
- Generation counter ensures failed/stale transitions do not overwrite a newer selection.

---

## Reduced Motion

- `prefers-reduced-motion: reduce` → 80ms opacity transition instead of 400ms crossfade.

---

## QA Results

**Runtime verification:** `node scripts/verify-restaurant-multi-image-prototype.cjs` — **PASS**

| Test | Result |
|---|---|
| Base master on load (`data-interacted="false"`) | PASS |
| General Liability state + text | PASS |
| Property state + text | PASS |
| Liquor Liability state + text | PASS |
| Equipment Breakdown state + text | PASS |
| Direct switching (GL → EQ → Liq → Prop → GL) | PASS |
| Rapid click race condition | PASS |
| Reduced motion (80ms transition) | PASS |
| Mobile 390px — no horizontal overflow | PASS |
| No masked-scene elements | PASS |
| Console errors | PASS (none after clean server restart) |
| Build | PASS |

**Screenshots:** `docs/qa-screenshots/restaurant-multi-image-prototype/`

---

## Desktop Result

All five visual states render correctly with smooth 400ms crossfade. No layout shift, flashing, or stale images during rapid switching.

## 390px Mobile Result

Stage constrained to viewport (358px content width). No page-level horizontal scroll. State images retain crop via `object-fit: contain`. Fixed min-height + aspect-ratio interaction that caused internal overflow on narrow viewports.

## Visual Notes

- Internal frame briefly exceeded stage bounds before CSS fix (`min-height` + `aspect-ratio` on interactive-master frame); resolved with `min-height: 0` on state-images frame variant.
- Crossfade is restrained and functional; no animation artifacts observed during QA.

---

## Not In Scope

- Other 57 Coverage Explorer routes (unchanged — still interactive-master + dim-only SVG)
- New imagery generation
- Merge or deploy

**STOP for owner review.**
