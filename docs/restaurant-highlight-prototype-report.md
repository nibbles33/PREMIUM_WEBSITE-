# Restaurant Coverage Explorer — Highlight Prototype Report

**Branch:** `cursor/coverage-explorer-wiring-7402`  
**Scope:** `/restaurant-insurance/` ONLY — not rolled out globally  
**Status:** STOP for owner review — do not merge/deploy

## What Changed

### Rejected (removed globally)
- Visible filled/translucent yellow SVG polygons (`.pilot-ce-svg-zone` fills)
- Large `building-shell` mask on Property (entire-building envelope caused debug-box effect)

### Global interim (non-Restaurant routes)
- Yellow polygon rendering **disabled** on all other Coverage Explorer pages
- Other routes show base diorama + subtle full-scene dim only (`highlightRenderer: "dim-only"`, 12% opacity)
- Awaiting owner approval of Restaurant prototype before propagating new visual system

### Restaurant prototype (`highlightRenderer: "masked-illumination"`)
Architecture per owner spec:

```
base scene (Next/Image, untouched)
→ subtle non-target dim (SVG mask cuts out targets)
→ masked duplicate of master (SVG <image> + feComponentTransfer brightness/contrast/saturate, screen blend)
→ restrained edge stroke (fill:none, champagne stroke, feGaussianBlur)
→ optional pulse (equipment) or path trace (general liability)
```

SVG paths function as **mask geometry only** — no visible filled polygons.

---

## Per-Coverage State Specification

### 1. General Liability (`general-liability`)

| Property | Value |
|----------|-------|
| **Effect** | Guest-area illumination + perimeter path trace |
| **Mask zones** | `dining-floor`, `entrance-facade` |
| **Mask paths** | Archetype polygons in viewBox 0 0 100 100 |
| **Non-target dim** | `rgba(32,39,40, 0.05)` via `#dimMask` |
| **Illumination filter** | brightness 1.10, contrast 1.04, saturate 1.05, sepia 0.03 |
| **Lit layer opacity** | 0.72, blend mode: `screen` |
| **Edge glow** | stroke `rgba(208,173,38, 0.18)`, width 0.14, blur σ 0.35 |
| **Path trace animation** | dashed stroke on dining-floor + entrance-facade, opacity 0.36, width 0.18, 3200ms linear |
| **Reduced motion** | Path trace + pulse disabled; static illumination + edge retained |

**Intent:** Customer circulation / entrance / dining — NOT whole-restaurant wash.

---

### 2. Property Coverage (`property-coverage`)

| Property | Value |
|----------|-------|
| **Effect** | Warm architectural illumination on kitchen, equipment, cold storage, bar fixtures |
| **Mask zones** | `kitchen-prep`, `cooking-equipment`, `cold-storage`, `bar-zone` |
| **Non-target dim** | `rgba(32,39,40, 0.06)` |
| **Illumination filter** | brightness 1.14, contrast 1.06, saturate 1.08, sepia 0.05 |
| **Lit layer opacity** | 0.72, blend mode: `screen` |
| **Edge glow** | stroke `rgba(208,173,38, 0.20)`, width 0.18, blur σ 0.45 |
| **Animation** | None |
| **Reduced motion** | N/A (no motion effects) |

**Intent:** Building improvements, furniture, kitchen equipment — removed `building-shell` mega-zone.

---

### 3. Liquor Liability (`liquor-liability`)

| Property | Value |
|----------|-------|
| **Effect** | Localized bar/back-bar/wine-storage warm glow |
| **Mask zones** | `bar-zone`, `bar-seating`, `cold-storage` |
| **Non-target dim** | `rgba(32,39,40, 0.05)` |
| **Illumination filter** | brightness 1.16, contrast 1.05, saturate 1.12, sepia 0.08 |
| **Lit layer opacity** | 0.72, blend mode: `screen` |
| **Edge glow** | stroke `rgba(208,173,38, 0.24)`, width 0.16, blur σ 0.55 |
| **Animation** | None |

---

### 4. Equipment Breakdown & Spoilage (`equipment-breakdown-spoilage`)

| Property | Value |
|----------|-------|
| **Effect** | Kitchen/refrigeration illumination + subtle equipment pulse |
| **Mask zones** | `kitchen-prep`, `cooking-equipment`, `cold-storage` |
| **Non-target dim** | `rgba(32,39,40, 0.06)` |
| **Illumination filter** | brightness 1.12, contrast 1.08, saturate 1.06 |
| **Lit layer opacity** | 0.72, blend mode: `screen` |
| **Edge glow** | stroke `rgba(208,173,38, 0.18)`, width 0.14, blur σ 0.35 |
| **Pulse animation** | stroke-only on `cooking-equipment`, `cold-storage`, 2800ms ease-in-out |
| **Reduced motion** | Pulse disabled; static illumination retained |

---

## Reduced-Motion Behavior

- `prefers-reduced-motion: reduce` disables:
  - Equipment pulse edge animation
  - General liability path trace animation
- Preserved:
  - Masked illumination (static brightness lift)
  - Non-target dim
  - Edge stroke emphasis (no animation)

Screenshot: `restaurant-equipment-spoilage-reduced-motion-desktop.png`

---

## QA Screenshots (committed)

**Desktop (1440×900):**
- `restaurant-general-liability-desktop.png`
- `restaurant-property-coverage-desktop.png`
- `restaurant-liquor-liability-desktop.png`
- `restaurant-equipment-spoilage-desktop.png`

**Mobile (390×844):**
- `restaurant-general-liability-mobile-390.png`
- `restaurant-property-coverage-mobile-390.png`
- `restaurant-liquor-liability-mobile-390.png`
- `restaurant-equipment-spoilage-mobile-390.png`

**Reduced motion:**
- `restaurant-equipment-spoilage-reduced-motion-desktop.png`

Location: `docs/qa-screenshots/restaurant-highlight-prototype/`

---

## Key Files

| File | Purpose |
|------|---------|
| `src/components/pilot/coverage-explorer/MaskedIlluminationStage.tsx` | Restaurant mask/illumination renderer |
| `src/data/coverage-explorer/restaurant-highlight-effects.ts` | Per-state effect parameters |
| `src/data/coverage-explorer/buildRouteExplorerConfig.ts` | Restaurant-only `highlightRenderer: "masked-illumination"` |
| `src/components/pilot/coverage-explorer/CoverageVisualStage.tsx` | Routes to masked vs dim-only renderer |
| `scripts/capture-restaurant-highlight-prototype.cjs` | Screenshot capture + yellow-polygon guard |

---

## Owner Review Notes

- No visible `.pilot-ce-svg-zone` filled polygons on Restaurant (verified in capture script)
- Champagne accent applied via screen-blended illuminated duplicate + stroke-only edges — not flat fill
- Non-Restaurant routes temporarily show diorama without zone highlights until prototype approved
- Opacity/blend values may need owner tuning after visual review

**Do not propagate to remaining 57 routes until approved.**
