# Contractors Handoff Choreography — Architecture Report

**Branch:** `cursor/contractors-motion-7402`  
**Scope:** `/contractors-insurance/` only. No other routes modified.  
**Status:** **Choreography preview — PLACEHOLDER assets.** Ready for owner review. Do not merge or deploy.

---

## Executive summary

This iteration implements the full **clean-background → staggered object choreography → invisible handoff to approved final state** sequence architecture for Contractors Property and Tools & Equipment tabs.

**This is not final visual output.** Object layers render as labeled placeholder silhouettes. The clean background is a stand-in (`state-liability.png`). Handoff alignment confidence is flagged **`low`** — the invisible crossfade cannot be verified until dedicated clean-scene PNGs and transparent object assets are supplied.

---

## Asset status (explicit)

| Layer | Current | Final (when supplied) |
|---|---|---|
| Clean background | **PLACEHOLDER** — `contractors-insurance-state-liability.png` reused as interim clean base | Dedicated per-coverage clean-scene PNGs (owner bundle e.g. `public/images/contractos 2` — **not found in repo**) |
| Object layers | **PLACEHOLDER** — labeled rectangles/silhouettes at configured positions | Transparent-alpha PNGs wired via `objectLayers[].src` only |
| Final state image | **FINAL** — approved state PNGs (crossfade target) | Unchanged |
| Handoff alignment | **`data-handoff-confidence="low"`** | Requires full-scene reference comparison after real assets land |

Swapping in final art requires **no architecture changes** — only update `cleanBgSrc` and `objectLayers[].src` in `contractors-motion-recipes.ts`.

---

## Sequence architecture

```
Tab selected (Property or Tools)
    ↓
Phase: clean-transition — crossfade to cleanBgSrc (400ms)
    ↓
Phase: choreography — staggered placeholder objects animate in (hold positions)
    ↓
Phase: handoff — crossfade clean+objects → final state PNG; placeholders dissolve
    ↓
Phase: settled — final approved state image, motion idle
```

Non-handoff states (General Liability, Wrap-Up): direct crossfade to final state, `data-asset-mode="final"`.

**Reduced motion:** skips choreography; crossfades directly to final state.

**Rapid tab switching:** generation counter cancels in-flight sequence; no ghost overlays.

---

## Implementation map

| File | Role |
|---|---|
| `src/types/coverage-motion.ts` | Handoff types: `cleanBgSrc`, `handoffAtMs`, `handoffDurationMs`, `handoffAlignmentConfidence`, `CoverageHandoffPhase`, placeholder fields on object layers |
| `src/hooks/useCoverageHandoffSequence.ts` | Orchestrates phase transitions; accepts `crossfadeTo` directly (no registration race) |
| `src/data/coverage-explorer/contractors-motion-recipes.ts` | Property + Tools recipes with 3 placeholder object layers each |
| `src/components/pilot/coverage-explorer/CoverageStateImageStage.tsx` | Integrates handoff hook; exposes `data-handoff-phase`, `data-asset-mode`, `data-handoff-confidence` |
| `src/components/pilot/coverage-explorer/CoverageMotionOverlay.tsx` | Renders labeled placeholder divs; handoff-phase dissolve |
| `src/styles/pilot.css` | `ce-motion-object-descend-hold`, placeholder styles, handoff dissolve keyframes |

### Recipe timing

| Coverage | handoffAtMs | handoffDurationMs | Placeholder objects |
|---|---|---|---|
| `builder-s-risk` (Property) | 860 | 420 | Material A, Material B, Crate |
| `tools-equipment-coverage` | 700 | 400 | Equip A, Equip B, Equip C |

---

## Invisible handoff — confidence flag

The critical requirement is that the animated clean-background-plus-objects composition must visually match the approved final state closely enough (same camera/scale/positioning) that the crossfade is imperceptible.

**Current verdict: NOT achievable with confidence.**

Reasons:
1. No dedicated clean-scene PNGs — using General Liability state image as stand-in
2. Placeholder shapes do not match final object silhouettes
3. Tools & Equipment final PNG has known source centering misalignment (see `docs/contractors-centering-investigation-report.md`) — separate from handoff but affects perceived jump

The stage exposes `data-handoff-confidence="low"` on handoff states so QA and owner review never treat this as production-ready visual output.

---

## QA results

Run against production build on `http://localhost:3012` after `npm run build && npx next start -p 3012`.

```
node scripts/verify-contractors-motion-prototype.cjs   → PASS
node scripts/capture-contractors-motion-prototype.cjs  → 10 screenshots saved
```

| Check | Result |
|---|---|
| General liability on load | PASS — `state-liability.png`, `data-asset-mode="final"` |
| Property handoff choreography | PASS — placeholder mode, low confidence flagged |
| Tools handoff choreography | PASS — placeholder mode, low confidence flagged |
| Wrap-Up (no handoff) | PASS — direct crossfade |
| Rapid state switching | PASS — no ghost overlays, correct final image |
| Reduced motion | PASS — skips choreography, lands on final state |
| Mobile 390px | PASS — no overflow, sequence completes |
| Console errors | PASS — none |

Screenshots: `docs/qa-screenshots/contractors-motion-prototype/`

---

## Owner actions required (not code)

1. **Supply clean-scene PNGs** per coverage (possibly from `contractos 2` bundle referenced by owner — folder not present in workspace)
2. **Regenerate** `contractors-insurance-state-tools-equipment.png` for centering alignment with other states
3. **Supply transparent object PNGs** when choreography timing is approved — wire via `objectLayers[].src`
4. **Re-review handoff** after real assets land; update `handoffAlignmentConfidence` when alignment is verified

---

## Do not merge / do not deploy

STOP for owner review of choreography timing and sequence architecture before final art integration.
