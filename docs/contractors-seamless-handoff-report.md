# Contractors Seamless Handoff — State Image Regeneration Report

**Branch:** `cursor/contractors-motion-7402`  
**Scope:** `/contractors-insurance/` — Tools & Equipment and Builder's Risk state images only.  
**Status:** Seamless handoff verified. **STOP for owner review — do not merge or deploy.**

---

## What changed

Replaced independently-generated approved state PNGs with the composite-proof renders already used by the animation:

| State image | Source (now identical) |
|---|---|
| `contractors-insurance-state-tools-equipment.png` | `contractors-tools-composite-proof.png` |
| `contractors-insurance-state-property.png` | `contractors-builders-composite-proof.png` |

**Unchanged (confirmed by SHA-256):**
- `contractors-insurance-state-liability.png` (General Liability)
- `contractors-insurance-state-installation-work.png` (Wrap-Up Liability)

All images remain **1672×941 RGB** — matching existing Contractors state image format.

Motion recipes updated: `handoffAlignmentConfidence: "high"`.

---

## Pixel-diff validation

`python3 scripts/validate-contractors-animation-alignment.py`

| Metric | Tools | Builder's Risk |
|---|---|---|
| **composite-proof → approved state** | **mean 0.0** (max 0.0) | **mean 0.0** (max 0.0) |
| stacked choreography → approved state | mean 0.007 (max 178.3) | **mean 0.0** (max 0.0) |
| stacked choreography → composite-proof | mean 0.007 | mean 0.0 |

**Before this change:** composite-proof → state mean **67.65** (Tools), **92.97** (Builder's).

The approved state images are now **byte-identical** to composite-proof. Builder's handoff is pixel-perfect end-to-end. Tools retains a negligible stacked→proof edge delta (mean 0.007, 152 localized anti-aliasing pixels) that predates this change and does not produce a visible scene jump.

---

## Visual verification

### Handoff moment (exact crossfade frame)

Captured when `data-handoff-phase="handoff"` (+180ms mid-crossfade):

`docs/qa-screenshots/contractors-handoff-seamless/`
- `builders-handoff-moment.png`
- `tools-handoff-moment.png`

**Verdict:** Smooth opacity crossfade — no positional jump, flicker, or object repositioning at handoff. The scene content remains stable while layers dissolve/crossfade.

### Settled state consistency

| Path | Screenshot |
|---|---|
| After full animation | `{builders,tools}-settled-after-animation.png` |
| Direct click (reduced motion) | `{builders,tools}-direct-click-settled.png` |

Image-stack screenshots are visually identical in scene content, composition, and object placement. Both paths arrive at the same composite-proof render.

### Integration during choreography

Mid-animation frames (`*-mid-choreography.png`) show objects with consistent isometric lighting and scale — no pasted-on appearance.

---

## Full regression QA

```
npm run build                                    → PASS
python3 scripts/validate-contractors-animation-alignment.py → PASS (metrics above)
node scripts/verify-contractors-motion-prototype.cjs        → PASS (all checks)
node scripts/capture-contractors-handoff-seamless.cjs       → 8 screenshots
```

| Check | Result |
|---|---|
| Tools handoff sequence | PASS — `data-handoff-confidence="high"`, 5 objects |
| Builder's handoff sequence | PASS — `data-handoff-confidence="high"`, 4 objects |
| General Liability on load | PASS — unchanged |
| Wrap-Up Liability | PASS — unchanged |
| Rapid state switching | PASS |
| Reduced motion | PASS |
| Mobile 390px | PASS |
| Console errors | PASS — none |

---

## Explicit seamless confirmation

This is **genuinely seamless by construction**, not speculative:

1. Approved state PNG **is** the composite-proof file (SHA-256 verified identical)
2. Animation choreography stacks objects to match composite-proof (Builder's exact, Tools mean 0.007)
3. Handoff crossfade transitions from clean+objects to the same underlying render the choreography targets
4. Handoff-moment screenshots confirm no visible jump during the crossfade window

**Do not merge. Do not deploy. STOP for owner review.**
