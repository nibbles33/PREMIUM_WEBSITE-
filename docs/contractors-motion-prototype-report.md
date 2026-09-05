# Contractors Coverage Explorer — Motion Prototype Report

**Branch:** `cursor/contractors-motion-7402`  
**Scope:** `/contractors-insurance/` only. No other routes modified.  
**Status:** Ready for owner review — do not merge or deploy.

---

## Phase 1 — Architecture Before Change

| Item | Finding |
|---|---|
| Route | `/contractors-insurance/` via `src/app/contractors-insurance/page.tsx` |
| Coverage IDs | `general-liability`, `tools-equipment-coverage`, `builder-s-risk`, `wrap-up-liability` |
| Prior Explorer mode | `interactive-master` + `dim-only` SVG (single static master PNG, subtle dim on tab change) |
| State images | **Not wired** — 4 new PNGs existed on `origin/main` but were unused |
| Image dimensions | All **1672 × 941** |
| Restaurant reference | Multi-image crossfade via `CoverageStateImageStage`; magnifier exists but **not** added to Contractors |

**Transparent object assets:** None found in repo (no separate lumber/crate/tool PNG overlays).

---

## Phase 2 — Multi-Image State Switching (Contractors Only)

Contractors now uses `sceneMode: "coverage-state-images"` with the same crossfade stack as Restaurant.

### State-image mapping

| Site coverage ID | Tab title | State image |
|---|---|---|
| `general-liability` | General Liability | `/images/contractors-insurance-state-liability.png` |
| `tools-equipment-coverage` | Tools & Equipment Coverage | `/images/contractors-insurance-state-tools-equipment.png` |
| `builder-s-risk` | Builder's Risk | `/images/contractors-insurance-state-property.png` |
| `wrap-up-liability` | Wrap-Up Liability | `/images/contractors-insurance-state-installation-work.png` |

**Explicit ID mismatches (filename → site registry):**
- Asset `liability` → site `general-liability`
- Asset `property` → site `builder-s-risk` (Builder's Risk / materials coverage)
- Asset `installation-work` → site `wrap-up-liability`

**Base/fallback master (unchanged):** `/images/contractors-insurance-interactive-master.png`

Default behavior matches Restaurant: first tab selected in UI; **clean master shown until first coverage click** (`hasImageInteracted`).

---

## Phase 3 — Motion Prototype

### Architecture

```
coverage selected
    ↓
state image crossfade (400ms / 80ms reduced motion)
    ↓
motion recipe lookup (contractors-motion-recipes.ts)
    ↓
CoverageMotionOverlay + image CSS class (if recipe exists)
    ↓
motion settles (800–1300ms)
    ↓
final approved state image — idle
```

**Reusable pieces:**
- `src/types/coverage-motion.ts` — recipe types
- `src/hooks/useCoverageMotionPlayback.ts` — generation-counter playback, cancel on rapid switch
- `src/components/pilot/coverage-explorer/CoverageMotionOverlay.tsx` — overlay renderer
- Recipe config per route: `contractors-motion-recipes.ts`

Motion recipes wired only for:
- `builder-s-risk` → **Property** (`vertical-reveal-settle`, 1300ms)
- `tools-equipment-coverage` → **Tools & Equipment** (`equipment-activate`, 1000ms)

Other states: crossfade only.

### Property animation behavior

**Transparent object layers are required for the full falling-material effect.**

No suitable transparent PNG assets exist. Property uses an **interim restrained transition**:
- 400ms crossfade to approved Property state image
- Then 1300ms **vertical reveal + micro-settle** on the full state image (`clip-path` + slight `translateY` / `scale`)
- Object layer slots defined in recipe (3 material positions) but **not rendered** (no `src` values)

### Tools & Equipment animation behavior

No isolated tool/light transparent assets. Uses **interim restrained effect** on full state image:
- 400ms crossfade to Tools state image
- Soft radial **work-light glow** at emphasis center (62%, 54%) — single pulse, fades out
- Subtle 2–3px image settle — **no continuous pulse, no neon**

---

## Files Added

- `public/images/contractors-insurance-state-*.png` (4 state images, from origin/main)
- `src/types/coverage-motion.ts`
- `src/data/coverage-explorer/contractors-coverage-state-images.ts`
- `src/data/coverage-explorer/contractors-motion-recipes.ts`
- `src/hooks/useCoverageMotionPlayback.ts`
- `src/components/pilot/coverage-explorer/CoverageMotionOverlay.tsx`
- `scripts/verify-contractors-motion-prototype.cjs`
- `scripts/capture-contractors-motion-prototype.cjs`
- `docs/qa-screenshots/contractors-motion-prototype/` (8 screenshots)
- `docs/contractors-motion-prototype-report.md`

## Files Modified

- `src/data/coverage-explorer/buildRouteExplorerConfig.ts`
- `src/types/coverage-explorer.ts`
- `src/components/pilot/coverage-explorer/CoverageStateImageStage.tsx`
- `src/components/pilot/coverage-explorer/CoverageVisualStage.tsx`
- `src/components/pilot/product/ProductCoverageExplorer.tsx`
- `src/styles/pilot.css`

**Not modified:** Restaurant Explorer, Restaurant magnifier, other routes, homepage, navigation.

---

## Additional Assets Required (for full Property falling-material effect)

To implement independent descending materials, supply **transparent PNG overlays** for slots already defined in `CONTRACTORS_MOTION_RECIPES["builder-s-risk"].objectLayers`:
- `material-stack-a` (~18% left, 32% top)
- `material-stack-b` (~34% left, 28% top)
- `material-crate` (~52% left, 36% top)

Optional for Tools: transparent work-light or equipment emphasis PNG at emphasis center.

---

## QA Results

| Test | Result |
|---|---|
| Build | PASS |
| Base master on load | PASS |
| All 4 coverage states + correct images | PASS |
| Property motion plays and settles | PASS |
| Tools motion plays and settles | PASS |
| Liability / Installation (crossfade only) | PASS |
| Rapid switching (no ghost overlays) | PASS |
| Reduced motion (no object animation) | PASS |
| Mobile 390px (no overflow) | PASS |
| Console errors | PASS |

**Verification:** `node scripts/verify-contractors-motion-prototype.cjs`  
**Screenshots:** `docs/qa-screenshots/contractors-motion-prototype/`

### Animation timing tested (Property)

| Time | State |
|---|---|
| 0ms | Click Property tab, crossfade begins |
| ~400ms | Property state image visible |
| ~440ms | Vertical reveal motion starts (`data-motion=playing`) |
| ~1740ms | Motion idle, final Property PNG stable |

### Animation timing tested (Tools)

| Time | State |
|---|---|
| 0ms | Click Tools tab |
| ~400ms | Tools state image visible |
| ~440ms | Equipment glow + settle begins |
| ~1440ms | Motion idle, final Tools PNG stable |

---

## Limitations

1. **Full falling-material motion not implemented** — flattened PNGs only; transparent object layers required.
2. **Tools light effect** is a tasteful CSS radial glow, not isolated equipment geometry.
3. Motion screenshots capture approximate mid/settle frames; see timing table above for sequence.

**STOP for owner review.**
