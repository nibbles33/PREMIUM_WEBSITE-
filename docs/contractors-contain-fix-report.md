# Contractors Coverage Explorer — Image Contain Fix Report

**Branch:** `cursor/contractors-motion-7402`  
**Scope:** `/contractors-insurance/` visual fit correction only.

---

## Root Cause of Cropping

Two issues combined to make the diorama appear cropped:

1. **Breakpoint `min-height` on `.pilot-ce-stage-frame`** — At `min-width: 1024px`, global CSS sets `min-height: 23.5rem` on all stage frames. This overrode the state-image `min-height: 0` rule, breaking the strict **1672:941** aspect ratio and forcing a taller frame. Combined with `overflow: hidden`, the layout no longer matched the contained image geometry.

2. **Property motion `clip-path` animation** — The `vertical-reveal-settle` motion applied `clip-path: inset(0 0 22% 0)` directly on the state image, visually cropping up to 22% of the bottom of the diorama during and after animation keyframes.

Secondary: explorer stage `sm:max-w-lg` / `lg:max-w-xl` capped the visual smaller than the available grid column.

---

## Files Modified

- `src/styles/pilot.css` — Contractors contain overrides; property motion without clip-path; larger stage width
- `src/components/pilot/coverage-explorer/CoverageStateImageStage.tsx` — explicit `object-fit: contain` inline; contained-image insets for overlays
- `src/components/pilot/coverage-explorer/CoverageMotionOverlay.tsx` — overlay positioned on rendered image rect
- `src/components/pilot/coverage-explorer/CoverageVisualStage.tsx` — contractors `sizes` for sharper images
- `src/components/pilot/product/ProductCoverageExplorer.tsx` — contractors stage fills grid column (`max-w-full`)
- `src/hooks/useContainedImageInsets.ts` — **new** hook for contain geometry

## Files Added

- `scripts/verify-contractors-contain-fix.cjs`
- `scripts/capture-contractors-contain-fix.cjs`
- `docs/qa-screenshots/contractors-contain-fix/` (before + after screenshots)
- `docs/contractors-contain-fix-report.md`

---

## Exact CSS / Component Changes

### Contain geometry (Contractors)
```css
.pilot-ce-stage-frame--contractors-insurance.pilot-ce-stage-frame--state-images {
  aspect-ratio: 1672 / 941;
  min-height: 0 !important;
}
.pilot-ce-stage-frame--contractors-insurance .pilot-ce-state-image {
  object-fit: contain !important;
  object-position: center center !important;
}
```

### Stage width
- Contractors explorer panel: `max-w-full` / `width: 100%` (fills grid column; no `sm:max-w-lg` cap)

### Property motion (no image crop)
- Removed `clip-path` keyframes from image animation
- Replaced with subtle `translate/scale/opacity` settle on image + separate shimmer overlay div

### Inline styles (all state layers)
```tsx
objectFit: "contain", objectPosition: "center center"
```

---

## State Layers — All Use `object-fit: contain`

Yes — base master, all four crossfade layers, and both crossfade stacks (`--current` / `--next`) share identical contain styles.

---

## Motion Overlays — Contained-Image Coordinates

Yes — `useContainedImageInsets` measures the letterboxed image rect inside the stack. `CoverageMotionOverlay` positions with:

```tsx
left: offsetX, top: offsetY, width: renderedWidth, height: renderedHeight
```

Equipment glow and future object layers are relative to the **actual painted image area**, not the outer frame.

---

## QA Results

| Viewport | Contain | Aspect ratio | Clip-path | Overflow |
|---|---|---|---|---|
| 1440px | PASS | 1.777 | none | none |
| 1280px | PASS | 1.777 | none | none |
| 1024px | PASS | 1.777 | none | ~8px page-level (pre-existing) |
| 390px | PASS | 1.777 | none | none |

**Verification:** `node scripts/verify-contractors-contain-fix.cjs`

**Screenshots:**
- Before: `docs/qa-screenshots/contractors-contain-fix/before/`
- After: `docs/qa-screenshots/contractors-contain-fix/after-*.png`

**Build:** PASS

---

## Not Changed

- Source images, coverage mappings, motion recipe architecture, other routes, Restaurant, homepage, navigation.

**STOP for owner review.**
