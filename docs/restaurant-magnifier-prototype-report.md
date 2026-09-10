# Restaurant Coverage Explorer — Magnifier Prototype Report

**Branch:** `cursor/restaurant-magnifier-7402`  
**Scope:** Restaurant route only (`/restaurant-insurance/`). No other Coverage Explorer routes modified.  
**Status:** Ready for owner review — do not merge or deploy.

---

## Objective

Add a desktop-only hover magnifier to the approved Restaurant multi-image Coverage Explorer so users can inspect 3D diorama and coverage-state imagery more closely.

---

## Files Added

- `src/lib/image-magnifier/getContainedImageRect.ts` — object-fit: contain geometry + magnifier background math
- `src/hooks/useFinePointerDevice.ts` — `(hover: hover) and (pointer: fine)` capability detection
- `src/components/pilot/coverage-explorer/ImageMagnifierLens.tsx` — circular lens component
- `scripts/verify-magnifier-math.cjs` — coordinate math unit checks
- `scripts/verify-restaurant-magnifier-prototype.cjs` — runtime verification
- `scripts/capture-restaurant-magnifier-prototype.cjs` — QA screenshot capture
- `docs/qa-screenshots/restaurant-magnifier-prototype/` (6 screenshots)
- `docs/restaurant-magnifier-prototype-report.md`

## Files Modified

- `src/components/pilot/coverage-explorer/CoverageStateImageStage.tsx` — magnifier + hint integration
- `src/components/pilot/coverage-explorer/CoverageVisualStage.tsx` — `enableMagnifier` for state-images mode (Restaurant only)
- `src/styles/pilot.css` — lens + hint styles (fine-pointer media query only)

---

## Magnifier Architecture

```
CoverageVisualStage (Restaurant state-images only)
  └── CoverageStateImageStage (enableMagnifier)
        ├── useFinePointerDevice() → gates magnifier + hint
        ├── pilot-ce-state-image-stack (pointer target ref)
        │     ├── Next/Image layers (crossfade)
        │     └── ImageMagnifierLens (RAF-driven DOM updates)
        └── pilot-ce-magnifier-hint (session-dismissed)
```

**Reusable pieces:** `ImageMagnifierLens`, `getContainedImageRect`, `useFinePointerDevice` — wired only for Restaurant via `enableMagnifier` on `CoverageStateImageStage`.

---

## Lens Specifications

| Property | Value |
|---|---|
| Diameter | **200px** |
| Magnification | **1.9×** |
| Shape | Circular |
| Border | 1px champagne/gold `rgba(208, 173, 38, 0.52)` |
| Shadow | Soft `0 6px 20px rgba(32, 39, 40, 0.14)` + subtle inset highlight |

---

## Coordinate Calculation

1. Read container `getBoundingClientRect()` from the image stack.
2. Compute rendered image rect via `getContainedImageRect()`:
   - `scale = min(containerW / sourceW, containerH / sourceH)`
   - `renderedW = sourceW × scale`, `renderedH = sourceH × scale`
   - Offsets from `object-position: center center` → `(freeX × 0.5, freeY × 0.5)`
3. Map pointer `(clientX, clientY)` → local coords → `(relX, relY)` within rendered rect.
4. **Letterboxing:** if pointer is outside rendered rect → lens hidden (no incorrect magnification).
5. Lens background:
   - `background-size: renderedW × zoom, renderedH × zoom`
   - `background-position: (radius − relX × zoom, radius − relY × zoom)`
6. Lens center clamped to container bounds (200px diameter inset).

---

## Active Coverage Image Switching

- Lens uses the currently visible image URL (`currentSrc`, or `nextSrc` when incoming — though lens is hidden during transition).
- **During 400ms crossfade:** lens hidden (`isTransitioning = Boolean(nextSrc)`).
- After transition completes: lens reappears with new image if pointer still over stack.
- No blending of two magnified states.

---

## Pointer Performance

- `pointermove` / `pointerenter` / `pointerleave` on stack container.
- Updates scheduled via `requestAnimationFrame` — direct DOM style writes on lens ref (no React state per mousemove).
- `ResizeObserver` on container recalculates geometry on viewport resize.

---

## Reduced Motion

- Lens fade: `140ms` opacity transition normally; **`transition: none`** under `prefers-reduced-motion: reduce`.
- Hint fade similarly disabled under reduced motion.

---

## Hover Hint

- Desktop-only text: **“Hover to explore details”**
- Positioned at bottom of image stage, understated (`0.6875rem`, secondary color).
- Becomes less prominent (`opacity: 0.38`) after first lens activation (session-only, not persisted).

---

## QA Results

**Math:** `node scripts/verify-magnifier-math.cjs` — **PASS**  
**Runtime:** `node scripts/verify-restaurant-magnifier-prototype.cjs` — **PASS**  
**Build:** **PASS**

| Test | Result |
|---|---|
| Desktop lens visible on image hover | PASS |
| Correct state image in lens (GL) | PASS |
| Letterbox → lens hidden | PASS |
| Coverage switch → lens hidden during crossfade, correct image after | PASS |
| Mobile 390px → no lens, no hint, no overflow | PASS |
| Reduced motion → no lens transition | PASS |
| Console errors | PASS |

**Screenshots:** `docs/qa-screenshots/restaurant-magnifier-prototype/`

---

## Desktop Result

Circular 200px / 1.9× lens follows cursor smoothly. Magnified region aligns with cursor position. Coverage-state images update correctly. Hint visible until first hover.

## Mobile Result (390px)

Magnifier disabled (`data-magnifier="disabled"`). No lens element rendered. No hint. Existing Coverage Explorer unchanged.

---

## Not In Scope

- Other Coverage Explorer routes
- Mobile pinch zoom
- Merge or deploy

**STOP for owner review.**
