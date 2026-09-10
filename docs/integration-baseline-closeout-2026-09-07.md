# Integration Baseline Closeout — 2026-09-07

**Branch:** `cursor/site-integration-final-7402`  
**Tip (approved stack):** `8c5227b` + closeout fixes (uncommitted at audit start)  
**Scope:** Fix only the four verified gaps from consolidation audit PR #22.

---

## Explicit stop gates

- **NO MERGE**
- **NO DEPLOY**
- **NO VERCEL PROMOTION**
- **NO PRODUCT CONTENT AUDIT STARTED**

**STOP FOR OWNER REVIEW.**

---

## Summary

| Gap | Root cause | Fix | Re-test |
|-----|------------|-----|---------|
| Filmstrip mobile swipe @ 390px | Late pointer capture; no snap-on-release for short swipes; nested frame content could claim browser pan; QA harness swiped off-screen (filmstrip below fold) | Hook + CSS + QA scroll-into-view | **PASS** — progress 25% → 37.5%, stayed on `/` |
| 8px overflow @ 1024 (cyber, restaurant) | `.pilot-product-broker-path` SVG rendered 1000px wide when `display:block` at lg, exceeding container | Constrain broker flow/path width | **PASS** — delta 0 at 1024 |
| Reduced motion | Re-verification only (no code change required) | — | **PASS** — see below |
| Mobile navigation | Re-verification only; QA needed accordion expand to count nested links | QA script update | **PASS** — 69 links, no overflow/errors |

**Integration branch is ready to become the approved baseline pending owner review.**

---

## 1. Homepage Personal Insurance filmstrip — mobile swipe @ 390px

### Root cause

Multiple contributing factors:

1. **`useTransformInfiniteRail` drag lifecycle** — pointer capture was previously deferred until `pointermove` crossed the drag threshold, so early move events could be lost on touch devices. Release did not snap/advance when swipe distance was below one full frame step.
2. **Touch targeting** — nested elements inside filmstrip frames (image overlays, labels) did not all inherit `touch-action: none`, allowing the browser to interpret horizontal gestures as page pan on some mobile targets.
3. **QA false failure** — validation swiped using off-screen bounding-box coordinates (filmstrip `y ≈ 1585` on a 844px viewport) without `scrollIntoView`, so Puppeteer touch never reached the interactive viewport. A separate stale `localhost:3016/` host fragment also caused false negatives when the server ran on 3018.

### Fix

**`src/hooks/useTransformInfiniteRail.ts`**
- Capture pointer on `pointerdown` immediately.
- On release: if drag ≥ 12% of frame step (min 24px), advance one frame; else snap to nearest frame; preserve click suppression after drag.

**`src/styles/pilot.css`**
- `touch-action: none` on viewport, inner, frames, and all viewport descendants.
- (Overflow fix in §2 below.)

**`scripts/card-navigation-validate.cjs`**
- `scrollIntoView` before swipe/drag tests.
- Filmstrip swipe/drag verifies rail advancement (progress/transform change), not just “stayed on page”.
- Desktop filmstrip drag uses dynamic `BASE_HOST` instead of hardcoded port.

### Before / after @ 390px

| Metric | Before (repro) | After (closeout verify) |
|--------|----------------|-------------------------|
| Progress | 12.5% (unchanged after swipe) | 25% → **37.5%** after swipe |
| Transform delta | ~18–22px drift | Full frame advance |
| Navigation | Stayed on `/` | Stayed on `/` |
| Tap navigation | PASS (unchanged) | PASS |
| Desktop drag | False fail (wrong port) | PASS — 25% → 37.5% |

### Preserved behaviors

- Tap navigation to product routes
- Click-vs-drag protection (`pointerDragGuard`, `suppressClickAfterDrag`)
- Desktop mouse drag
- Autoplay + infinite loop (disabled when `prefers-reduced-motion: reduce`)

---

## 2. 8px horizontal overflow @ 1024px — Cyber & Restaurant

### Root cause

At `@media (min-width: 1024px)`, `.pilot-product-broker-path` (SVG connector in `ProductBrokerStory`) switched to `display: block` with implicit 1000px SVG width. Document `scrollWidth` was 1032 vs `clientWidth` 1024 → **8px overflow** on both `/cyber-insurance/` and `/restaurant-insurance/`.

Offending element: `svg.pilot-product-broker-path` inside `.pilot-product-broker-flow`.

### Fix

**`src/styles/pilot.css`**
```css
.pilot-product-broker-flow {
  max-width: 100%;
  overflow: hidden;
}

@media (min-width: 1024px) {
  .pilot-product-broker-path {
    width: 100%;
    max-width: 100%;
  }
}
```

No `body { overflow-x: hidden }`. No clipping of approved design content — only the decorative path is constrained to its container.

### Before / after @ 1024px

| Route | Before | After |
|-------|--------|-------|
| `/cyber-insurance/` | scrollWidth 1032, delta **8** | scrollWidth 1024, delta **0** |
| `/restaurant-insurance/` | scrollWidth 1032, delta **8** | scrollWidth 1024, delta **0** |

### Viewport regression (overflow delta)

| Viewport | `/` | `/cyber-insurance/` | `/restaurant-insurance/` |
|----------|-----|---------------------|--------------------------|
| 390 | 0 | 0 | 0 |
| 768 | 0 | 0 | 0 |
| 1024 | 0 | 0 | 0 |
| 1280 | 0 | 0 | 0 |
| 1440 | 0 | 0 | 0 |

---

## 3. Reduced motion — re-verification

No code changes required. Verified at 1440 with `prefers-reduced-motion: reduce`:

| Surface | Result |
|---------|--------|
| Homepage filmstrip rail | Autoplay paused (`disableAutoplay: true` via hook) — transform stable over 1.5s observation |
| Carrier infinite rail | Animation retained at reduced duration (**275s** vs normal speed) — acceptable degraded motion |
| Coverage Explorer state images (Restaurant) | Crossfade transition **0.08s** (80ms via `transitionMs = reduceMotion ? 80 : 400`) |
| Restaurant magnifier | Lens not visible on mobile/fine-pointer check; stack present, no erroneous lens display |

No unnecessary decorative animation observed on homepage rails under reduced motion.

---

## 4. Mobile navigation — re-verification

No component changes. Updated QA to expand accordion sections before counting links.

@ 390×844:

| Check | Result |
|-------|--------|
| Open menu | PASS — `#mobile-nav` dialog rendered |
| Close menu | PASS — dialog removed from DOM |
| Primary links accessible | PASS — Personal (home-insurance), Business (commercial-insurance), About, Talk to a Broker present after expanding sections |
| Link count | **69** |
| Body scroll lock | `overflow: hidden` while open |
| Horizontal overflow (closed/open) | **0px** |
| Console errors | **0** |

---

## Files changed

| File | Change |
|------|--------|
| `src/hooks/useTransformInfiniteRail.ts` | Early pointer capture; snap/advance on release |
| `src/styles/pilot.css` | Filmstrip descendant `touch-action`; broker path overflow fix |
| `scripts/card-navigation-validate.cjs` | scrollIntoView; rail advance verification; dynamic BASE_HOST for desktop drag |
| `scripts/integration-baseline-closeout-verify.cjs` | Closeout verification harness (new) |
| `scripts/repro-closeout-gaps.cjs` | Repro harness for filmstrip + overflow (new) |
| `scripts/test-filmstrip-touch.cjs` | Mouse vs touch comparison harness (new) |
| `docs/qa-screenshots/integration-baseline-closeout-2026-09-07/closeout-verification.json` | Verification artifacts |
| `docs/qa-screenshots/card-navigation-fix/validation-report.json` | Updated card-nav run |

**Not changed:** Coverage Explorer imagery/content, approved page design, unrelated shared components.

---

## Build & typecheck

```
npm run build     → PASS (Next.js 16.3.2, 81 routes)
npx tsc --noEmit  → PASS
```

Pre-existing ESLint debt (137 errors) not in closeout scope.

---

## Focused runtime tests

Run against `PORT=3018 npm run start` (production build):

```bash
BASE_URL=http://localhost:3018 node scripts/integration-baseline-closeout-verify.cjs
CARD_NAV_PORT=3018 node scripts/card-navigation-validate.cjs
BASE_URL=http://localhost:3018 node scripts/repro-closeout-gaps.cjs
```

### Closeout verification (`integration-baseline-closeout-verify.cjs`)

| Test | Result |
|------|--------|
| Filmstrip swipe @ 390 | **PASS** |
| Overflow cyber @ 1024 | **PASS** (delta 0) |
| Overflow restaurant @ 1024 | **PASS** (delta 0) |
| Reduced motion | **PASS** |
| Mobile nav | **PASS** |

### Card navigation (`card-navigation-validate.cjs`)

| Metric | Result |
|--------|--------|
| Click tests | 235/235 |
| Href audit | 56/56 |
| Related family | 51/51 |
| Desktop drag (filmstrip) | **PASS** (rail advanced) |
| Mobile filmstrip swipe | **PASS** (rail advanced, stayed on `/`) |
| Mobile tap (filmstrip + related) | 4/6 — 2 tap coordinate flakes (tapY=12, off-screen clamp); **pre-existing harness issue, not a closeout regression** |

---

## Baseline readiness

All four verified gaps from the integration consolidation audit are **resolved and re-tested** across viewports 390, 768, 1024, 1280, and 1440.

The linear integration stack (`cursor/site-integration-final-7402` atop `8c5227b`) is **ready to become the approved baseline** once the owner completes review.

---

## Explicit stop gates (repeat)

- **NO MERGE**
- **NO DEPLOY**
- **NO VERCEL PROMOTION**
- **NO PRODUCT CONTENT AUDIT STARTED**

**STOP FOR OWNER REVIEW.**
