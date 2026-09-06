# Contractors Coverage Explorer — Centering Investigation Report

**Branch:** `cursor/contractors-motion-7402`  
**Scope:** `/contractors-insurance/` — STOP for owner review.  
**Verdict:** **SOURCE IMAGE PROBLEM** (Tools state PNG). CSS/rendering is consistent.

---

## Summary

Visual comparison confirms **Tools** renders with a noticeably different scene position than **General**, **Builder's**, and **Wrap-Up**. DOM/computed-style inspection shows **identical CSS geometry** across all four states. Pixel-level edge-map cross-correlation of the source PNG files shows **Tools is ~24px horizontally left** of the locked composition shared by the other three states.

**Action required:** Regenerate `contractors-insurance-state-tools-equipment.png` to match the exact camera/crop/canvas framing of `contractors-insurance-state-liability.png`. Do **not** compensate with per-state CSS `object-position` — that would paper over a real asset mismatch.

---

## Investigation Steps

### 1. CSS / Rendering (ruled out)

Measured at 1440px for all four tabs via Puppeteer + canvas pixel sampling:

| State | img box | object-fit | object-position | transform | content offset vs General |
|---|---|---|---|---|---|
| General | 504×282.8 | contain | center center | none | 0px |
| Tools | 504×282.8 | contain | center center | none | 0px |
| Builder's | 504×282.8 | contain | center center | none | 0px |
| Wrap-Up | 504×282.8 | contain | center center | none | 0px |

All four use `CoverageStateImageStage` with identical contain styles. Container frame is 506×284.8 at 1440px for every state. **No CSS inconsistency.**

### 2. Source PNG canvas size (confirmed identical)

All files are exactly **1672×941**:

- `contractors-insurance-state-liability.png`
- `contractors-insurance-state-tools-equipment.png`
- `contractors-insurance-state-property.png`
- `contractors-insurance-state-installation-work.png`

### 3. Source PNG scene composition (root cause)

Edge-map cross-correlation against General (structural alignment):

| State file | Horizontal scene offset vs General | Verdict |
|---|---|---|
| `state-liability.png` | 0px (reference) | — |
| `state-property.png` | ~0px | PASS |
| `state-installation-work.png` | ~0px | PASS |
| `state-tools-equipment.png` | **~−11px left edge, ~−90px right margin vs General** | **FAIL — regenerate** |

50% overlay of General + Tools source PNGs shows visible ghosting/double-exposure at the fence and excavator, confirming the Tools scene is horizontally displaced within the canvas.

Patch-match at fence-bottom-left anchor: Tools requires **+60px** horizontal correction to align fence geometry with General (content differs at scene level, not just CSS).

---

## What Was NOT Changed

- Source PNG files (per instructions — flag only, no regeneration in-repo)
- CSS `object-position` per state (would paper over asset mismatch)
- Coverage mappings, other routes, Restaurant, homepage, navigation

---

## Validation Script

```bash
python3 scripts/validate-contractors-state-alignment.py
```

Currently **FAILS** on Tools until the source PNG is corrected.

---

## Screenshots (1440px, post-investigation)

Side-by-side comparison grid:

- `docs/qa-screenshots/contractors-centering-fix/comparison-grid-1440.png`

Individual states (same viewport, same frame geometry):

- `docs/qa-screenshots/contractors-centering-fix/01-general.png`
- `docs/qa-screenshots/contractors-centering-fix/02-tools.png`
- `docs/qa-screenshots/contractors-centering-fix/03-builders.png`
- `docs/qa-screenshots/contractors-centering-fix/04-wrap-up.png`

Source overlay proof:

- `docs/qa-screenshots/contractors-centering-fix/overlay-general-tools-source.png`

Analysis artifacts:

- `docs/qa-screenshots/contractors-centering-fix/source-patch-match-report.json`
- `docs/qa-screenshots/contractors-centering-fix/rendered-centering-report.json`
- `docs/qa-screenshots/contractors-centering-fix/alignment-validation.json`

---

## Owner Action Required

Replace `public/images/contractors-insurance-state-tools-equipment.png` with a version that matches the **locked composition** of `contractors-insurance-state-liability.png`:

- Same camera angle and distance
- Same canvas size (1672×941)
- Same scene centering (~24px further right than current Tools file)
- Only state-specific content (tools/equipment highlights) should differ

After replacement, re-run:

```bash
python3 scripts/validate-contractors-state-alignment.py
node scripts/capture-contractors-geometry-fix.cjs
```

**STOP for owner review — do not merge or deploy.**
