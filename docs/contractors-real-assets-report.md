# Contractors Animation — Real Transparent Assets Report

**Branch:** `cursor/contractors-motion-7402`  
**Scope:** `/contractors-insurance/` only.  
**Status:** Real assets wired — **first visual review ready**. Do not merge or deploy.

---

## Asset status

| Layer | Status |
|---|---|
| Clean backgrounds | **FINAL** — `contractors-tools-clean-background.png`, `contractors-builders-clean-background.png` |
| Object layers | **FINAL** — 9 full-canvas RGBA transparent PNGs (1672×941 each) |
| Composite proofs | Reference only — used for alignment validation |
| Approved state PNGs | **FINAL** — unchanged handoff crossfade targets |
| Placeholder shapes | **REMOVED** — no labeled stand-ins remain |

All transparent object files confirmed RGBA with genuine alpha (range 0–255), not baked checkerboard.

---

## Implementation

Full-canvas compositing at (0,0) — no manual placement coordinates:

- `src/data/coverage-explorer/contractors-animation-assets.ts` — asset path registry
- `contractors-motion-recipes.ts` — real clean backgrounds + 5 tools / 4 builders object layers with `fullCanvas: true`
- `CoverageMotionOverlay.tsx` — full-canvas layer rendering with scene dimensions
- `pilot.css` — `ce-motion-object-descend-hold-full` animation (opacity 1 at settle)

### Object inventory

**Tools & Equipment (5):** worklight → toolbox → power-tools → saw → generator  
**Builder's Risk (4):** lumber-stack-1 → lumber-stack-2 → material-stack → wrapped-materials

---

## Visual alignment analysis

Pixel comparison (`scripts/validate-contractors-animation-alignment.py`):

| Scene | Stacked → composite-proof | Stacked → final state | Composite-proof → final state |
|---|---|---|---|
| **Builders** | **high** (mean 0.0) | **low** (mean 92.97) | **low** (mean 92.97) |
| **Tools** | **low**\* (mean 0.007, max 178) | **low** (mean 67.65) | **low** (mean 67.65) |

\*Tools stacked composite matches proof almost perfectly by mean; 152 localized pixels differ (likely anti-aliasing at object edges).

### Handoff review answers

1. **Do objects land in correct final position?**  
   **Builders: yes** — stacked transparent assets exactly match composite-proof. Objects appear at correct site positions in mid-choreography screenshots.  
   **Tools: mostly yes** — composite alignment is near-perfect; minor edge pixels differ from proof.

2. **Is the crossfade invisible?**  
   **No — visible mismatch likely at handoff.** Stacked choreography composite and approved final state PNGs differ substantially (mean pixel diff 68–93). Composite-proof and final state are equally different, indicating the approved state images were not exported from the same composite as the animation assets. Expect a visible transition jump unless final state PNGs are regenerated to match composite-proof.

3. **Do objects look integrated (scale, lighting)?**  
   **Yes during choreography** — objects composite naturally onto clean backgrounds with consistent isometric lighting. No pasted-on appearance observed in mid-animation screenshots. Equipment glow/shimmer effects remain subtle overlay accents.

**Stage flag:** `data-handoff-confidence="low"` on both handoff states.

---

## QA results

```
npm run build                                          → PASS
python3 scripts/validate-contractors-animation-alignment.py → metrics saved
node scripts/verify-contractors-motion-prototype.cjs   → PASS (all checks)
node scripts/capture-contractors-motion-prototype.cjs  → 14 screenshots
```

| Check | Result |
|---|---|
| Real assets loaded (no placeholders) | PASS — `data-asset-mode="final"`, 4–5 full-canvas objects |
| Dedicated clean backgrounds | PASS |
| Handoff sequence completes | PASS |
| Rapid switching | PASS |
| Reduced motion | PASS |
| Mobile 390px | PASS |
| Console errors | PASS — none |

### Screenshot sequence

`docs/qa-screenshots/contractors-motion-prototype/`:

| File | Content |
|---|---|
| `builders-01-clean-bg` | Clean background after tab select |
| `builders-02-mid-choreography` | **Mid-animation** — materials descending |
| `builders-03-handoff` | Crossfade moment |
| `builders-04-settled` | Final approved state |
| `tools-01-clean-bg` through `tools-04-settled` | Full Tools sequence |
| `mobile-builders-mid-choreography` | Mobile mid-animation frame |

---

## Owner actions

1. **Review mid-choreography screenshots** — confirm falling motion timing and stagger feel right
2. **Decide on handoff mismatch** — regenerate approved state PNGs from composite-proof, OR accept visible crossfade, OR adjust handoff target to composite-proof
3. **Tools edge pixels** — optional: verify 152-pixel localized diff against composite-proof is acceptable

**Do not merge. Do not deploy. STOP for owner review.**
