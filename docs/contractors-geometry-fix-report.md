# Contractors Coverage Explorer — Geometry Unification Fix

**Branch:** `cursor/contractors-motion-7402`  
**Scope:** `/contractors-insurance/` only — STOP for owner review.

---

## 1. Exact Root Cause

**Two separate rendering paths were active:**

| Path | When | Image source | Visual result |
|---|---|---|---|
| Pre-interaction | Fresh load, General selected | `contractors-insurance-interactive-master.png` | Full diorama (low-contrast master) |
| Post-interaction | After any tab click | Per-coverage state PNG | Appeared larger/cropped |

Both used `CoverageStateImageStage`, but `resolveTargetSrc()` returned `baseSrc` (master) when `hasInteracted === false`. Contractors shared Restaurant's interaction gate, so General Liability on load did **not** match the selected coverage.

**Secondary cause:** Motion prototype applied `scale()` / `translateY()` transforms directly on the main state `<img>` via `.pilot-ce-state-image--motion-*` classes. With `overflow: hidden` on ancestors, scaled images were clipped during and after animation keyframes (e.g. `matrix(1.002, 0, 0, 1.002, 0, -1.38)` at Tools +500ms).

CSS `object-fit: contain` was correct on paper — the bug was **wrong source selection** + **main-image motion transforms**, not missing contain rules.

---

## 2. Component Paths

| State | Component | Layer |
|---|---|---|
| Fresh load (before fix) | `CoverageStateImageStage` | Master via `baseSrc` when `!hasInteracted` |
| Post-selection (before fix) | `CoverageStateImageStage` | State PNG via `stateImagesByCoverageId` |
| After fix (all states) | `CoverageStateImageStage` | Active coverage state PNG always |

No separate `interactive-master` div is rendered for Contractors (`sceneMode: coverage-state-images`).

---

## 3. Previously Different Geometry/Styles?

**Container geometry:** Identical frame/stack/img box dimensions (506×284.8 / 504×282.8 at 1440px) across all states — confirmed via `getBoundingClientRect()`.

**Visual geometry:** Appeared different because:
1. Master PNG vs state PNGs are different compositions at same 1672×941 canvas size
2. Main-image motion transforms scaled content inside `overflow: hidden` containers

---

## 4. Exact Fix

### A. Single canonical image source (Contractors)
- Added `alwaysUseStateImages` prop to `CoverageStateImageStage`
- Contractors pass `alwaysUseStateImages={true}` from `CoverageVisualStage`
- Removed Contractors from Restaurant interaction gate in `ProductCoverageExplorer`
- `currentSrc` / `visibleSrcRef` initialize to active coverage state image

### B. Main image never moves
- Removed `imageMotionClass` from state `<img>` elements
- Deleted `.pilot-ce-state-image--motion-vertical-reveal` and `--motion-equipment-settle` CSS
- Motion remains overlay-only (shimmer glow, equipment radial, future object layers)

---

## 5. Main-Image Transforms Removed?

**Yes.** Verified at Tools +500ms and Builder's +500ms: `transform: none`, `animation: none` on main image.

---

## 6. Source Files Displayed

| Moment | Before fix | After fix |
|---|---|---|
| First paint / fresh General | `contractors-insurance-interactive-master.png` | `contractors-insurance-state-liability.png` |
| After preload | master | `state-liability.png` |
| Click General again | `state-liability.png` | `state-liability.png` |

---

## 7. Source Image Validation

All exactly **1672×941**:

- `contractors-insurance-state-liability.png` ✓
- `contractors-insurance-state-tools-equipment.png` ✓
- `contractors-insurance-state-property.png` ✓
- `contractors-insurance-state-installation-work.png` ✓

---

## 8. Bounding-Box Comparison (1440px, after fix)

| Step | Frame (w×h) | Img box (w×h) | object-fit | transform |
|---|---|---|---|---|
| Fresh General | 506.0 × 284.8 | 504.0 × 282.8 | contain | none |
| Tools | 506.0 × 284.8 | 504.0 × 282.8 | contain | none |
| Builder's | 506.0 × 284.8 | 504.0 × 282.8 | contain | none |
| Wrap-Up | 506.0 × 284.8 | 504.0 × 282.8 | contain | none |
| General again | 506.0 × 284.8 | 504.0 × 282.8 | contain | none |

Rapid sequence (refresh → G → T → B → W → G → T → G): **zero drift** at all viewports.

---

## 9. QA Results

| Viewport | Contain | Full diorama | Geometry drift | Overflow |
|---|---|---|---|---|
| 1440px | PASS | PASS | none | none |
| 1280px | PASS | PASS | none | none |
| 1024px | PASS | PASS | none | none |
| 390px | PASS | PASS | none | none |

Scripts:
- `node scripts/inspect-contractors-geometry.cjs`
- `node scripts/capture-contractors-geometry-fix.cjs`
- `node scripts/verify-contractors-contain-fix.cjs`

---

## 10. Screenshots

**Before (bug — master on load, cropped state after click):**
- `docs/qa-screenshots/contractors-contain-fix/before/before-desktop-property.png`
- Pre-fix diagnostic: `geometry-report.json` in git history (sources show master → state switch)

**After (1440px — identical frame across all 5 steps):**
- `docs/qa-screenshots/contractors-geometry-fix/after/desktop-1440/01-fresh-general.png`
- `docs/qa-screenshots/contractors-geometry-fix/after/desktop-1440/02-selected-tools.png`
- `docs/qa-screenshots/contractors-geometry-fix/after/desktop-1440/03-selected-builders.png`
- `docs/qa-screenshots/contractors-geometry-fix/after/desktop-1440/04-selected-wrap-up.png`
- `docs/qa-screenshots/contractors-geometry-fix/after/desktop-1440/05-selected-general-again.png`

Also: `after/desktop-1280/`, `after/desktop-1024/`, `after/mobile-390/`

---

## Files Modified

- `src/components/pilot/coverage-explorer/CoverageStateImageStage.tsx`
- `src/components/pilot/coverage-explorer/CoverageVisualStage.tsx`
- `src/components/pilot/product/ProductCoverageExplorer.tsx`
- `src/hooks/useCoverageMotionPlayback.ts`
- `src/styles/pilot.css`

## Files Added

- `scripts/inspect-contractors-geometry.cjs`
- `scripts/capture-contractors-geometry-fix.cjs`
- `docs/contractors-geometry-fix-report.md`
- `docs/qa-screenshots/contractors-geometry-fix/`

**Not changed:** source images, coverage mappings, other routes, Restaurant, homepage, navigation.

**STOP for owner review — do not merge or deploy.**
