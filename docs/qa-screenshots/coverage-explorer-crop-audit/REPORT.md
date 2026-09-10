# Coverage Explorer Crop Audit Report

**Branch:** `cursor/coverage-explorer-crop-audit-7402`  
**Date:** 2026-09-07  
**Status:** STOP for owner review — not merged, not deployed

---

## Executive summary

| Metric | Pre-fix | Post-fix |
|--------|---------|----------|
| Routes audited | 72 | 72 |
| Explorer present | 57 | 57 |
| RENDERING/CSS failures | 49 | 0 |
| SOURCE-ASSET failures | 0 | 0 |
| Pass (geometry contained in stage) | 8 | 57 |
| NO EXPLORER / N/A | 15 | 15 |

**Issue type:** RENDERING/CSS ISSUE (systemic) — not SOURCE-ASSET  
**Root cause:** `min-height` on `.pilot-ce-stage-frame` (base + breakpoints) conflicted with `aspect-ratio` on `.pilot-ce-stage-frame--interactive-master`, expanding frame width past the explorer column; `overflow-hidden` on `.pilot-product-explorer-stage` clipped the right/top edges.

**Regression introduced:** `10c6bf4` — Wire Coverage Explorer to 58 interactive master dioramas (`min-height: 18rem` on interactive-master)  
**Partial fix existed for:** `a00f559` / `25cf55e` — Contractors state-images only (`min-height: 0`), not applied to 49 standard-ratio interactive-master routes

---

## Fix applied (shared / systemic)

`src/styles/pilot.css`:
- `.pilot-ce-stage-frame--interactive-master`: `min-height: 0 !important`, `width: 100%`, `max-width: 100%`, `aspect-ratio: var(--ce-aspect, 1672 / 941)`
- Breakpoint overrides: interactive-master + state-images exempt from `min-height` at lg/md/sm
- `.pilot-ce-stage`: `width: 100%; min-width: 0`
- `.pilot-ce-scene-interactive-master > span`: Next/Image wrapper fills container
- `.pilot-ce-scene-interactive-master-image`: `object-fit: contain`

`src/components/pilot/coverage-explorer/CoverageVisualStage.tsx`:
- `--ce-aspect` set as `1672 / 941` ratio string (not decimal) for valid CSS `aspect-ratio`

---

## Owner-reported routes — geometry proof (post-fix, desktop 1440×900)

### cyber-insurance

| Property | Value |
|----------|-------|
| Source file | `cyber-insurance-interactive-master.png` |
| Intrinsic (natural) | 559×314 (Next optimized) / 1672×941 source PNG |
| Rendered img (getBoundingClientRect) | 500×281 |
| Visual stage frame | 502×283 |
| Explorer stage container | 576×560 |
| object-fit | contain |
| object-position | 50% 50% |
| aspect-ratio (frame) | 1672 / 941 |
| Next/Image fill | no |
| transform | none |
| Painted content contained in frame | true |
| Painted content contained in stage | true |
| Overflow chain | img.clip → div.hidden → div.hidden |

Screenshot: `docs/qa-screenshots/coverage-explorer-crop-audit/cyber-insurance-post-fix/`

### travel-insurance

| Property | Value |
|----------|-------|
| Source file | `travel-insurance-interactive-master.png` |
| Intrinsic (natural) | 559×314 (Next optimized) / 1672×941 source PNG |
| Rendered img (getBoundingClientRect) | 500×281 |
| Visual stage frame | 502×283 |
| Explorer stage container | 576×537 |
| object-fit | contain |
| object-position | 50% 50% |
| aspect-ratio (frame) | 1672 / 941 |
| Next/Image fill | no |
| transform | none |
| Painted content contained in frame | true |
| Painted content contained in stage | true |
| Overflow chain | img.clip → div.hidden → div.hidden |

Screenshot: `docs/qa-screenshots/coverage-explorer-crop-audit/travel-insurance-post-fix/`

### mobile-home-insurance

| Property | Value |
|----------|-------|
| Source file | `mobile-home-insurance-interactive-master.png` |
| Intrinsic (natural) | 559×314 (Next optimized) / 1672×941 source PNG |
| Rendered img (getBoundingClientRect) | 500×281 |
| Visual stage frame | 502×283 |
| Explorer stage container | 576×537 |
| object-fit | contain |
| object-position | 50% 50% |
| aspect-ratio (frame) | 1672 / 941 |
| Next/Image fill | no |
| transform | none |
| Painted content contained in frame | true |
| Painted content contained in stage | true |
| Overflow chain | img.clip → div.hidden → div.hidden |

Screenshot: `docs/qa-screenshots/coverage-explorer-crop-audit/mobile-home-insurance-post-fix/`

---

## Full route accounting (72 rows)

| Route | Explorer present? | State count | Source dimensions | Pre-fix status | Post-fix status | Issue type | Notes |
|-------|-------------------|-------------|-------------------|----------------|-----------------|------------|-------|
| about | NO | 0 | — | N/A | N/A | N/A | NO EXPLORER / NOT APPLICABLE |
| auto-insurance | YES | 6 | 479×438 | PASS | PASS | NONE |  |
| boat-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| bonding-insurance | YES | 5 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| builders-developers-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| builders-risk-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| business-interruption-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| careers | NO | 0 | — | N/A | N/A | N/A | NO EXPLORER / NOT APPLICABLE |
| careers/general-application | NO | 0 | — | N/A | N/A | N/A | NO EXPLORER / NOT APPLICABLE |
| cargo-freight-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| claims | NO | 0 | — | N/A | N/A | N/A | NO EXPLORER / NOT APPLICABLE |
| commercial-auto-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| commercial-insurance | NO | 0 | — | N/A | N/A | N/A | NO EXPLORER / NOT APPLICABLE |
| commercial-property-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| compliance | NO | 0 | — | N/A | N/A | N/A | NO EXPLORER / NOT APPLICABLE |
| condo-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| condominium-corporation-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| contact | NO | 0 | — | N/A | N/A | N/A | NO EXPLORER / NOT APPLICABLE |
| contractors-insurance | YES | 4 | 768×432 | PASS | PASS | NONE |  |
| convenience-store-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| cottage-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| crime-fidelity-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| cyber-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| daycare-private-school-insurance | YES | 4 | 479×438 | PASS | PASS | NONE |  |
| directors-officers-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| dump-truck-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| employment-practices-liability-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| event-liability-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| farm-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| fitness-gym-insurance | YES | 4 | 479×438 | PASS | PASS | NONE |  |
| food-truck-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| garage-dealership-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| get-a-quote | NO | 0 | — | N/A | N/A | N/A | NO EXPLORER / NOT APPLICABLE |
| greenhouse-agribusiness-insurance | YES | 6 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| grocery-specialty-food-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| group-home-auto-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| home-insurance | YES | 5 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| home-sharing-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| hotel-motel-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| landlord-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| landscaping-snow-removal-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| life-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| liquor-liability-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| manufacturing-insurance | YES | 5 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| medical-dental-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| mobile-home-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| motorcycle-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| newsletter | NO | 0 | — | N/A | N/A | N/A | NO EXPLORER / NOT APPLICABLE |
| non-profit-insurance | YES | 4 | 479×438 | PASS | PASS | NONE |  |
| partners | NO | 0 | — | N/A | N/A | N/A | NO EXPLORER / NOT APPLICABLE |
| payment | NO | 0 | — | N/A | N/A | N/A | NO EXPLORER / NOT APPLICABLE |
| personal-umbrella-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| pharmacy-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| pollution-liability-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| privacy-policy | NO | 0 | — | N/A | N/A | N/A | NO EXPLORER / NOT APPLICABLE |
| product-recall-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| professional-liability-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| professional-offices-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| property-management-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| real-estate-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| religious-organizations-insurance | YES | 4 | 479×438 | PASS | PASS | NONE |  |
| resources | NO | 0 | — | N/A | N/A | N/A | NO EXPLORER / NOT APPLICABLE |
| restaurant-insurance | YES | 4 | 559×314 | PASS | PASS | NONE |  |
| retail-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| salon-barber-insurance | YES | 4 | 479×438 | PASS | PASS | NONE |  |
| small-business-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| talk-to-a-broker | NO | 0 | — | N/A | N/A | N/A | NO EXPLORER / NOT APPLICABLE |
| team | NO | 0 | — | N/A | N/A | N/A | NO EXPLORER / NOT APPLICABLE |
| tenant-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| travel-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| trucking-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |
| warehousing-insurance | YES | 4 | 559×314 | FAIL | PASS | RENDERING/CSS ISSUE |  |

---

## Artifacts

- `geometry-audit-pre-fix.json` — full per-state measurements (pre-fix)
- `geometry-audit-post-fix.json` — full per-state measurements (post-fix)
- `scripts/audit-coverage-explorer-geometry.cjs` — reproducible Puppeteer audit
- Post-fix screenshots: `cyber-insurance-post-fix/`, `travel-insurance-post-fix/`, `mobile-home-insurance-post-fix/`

## Notes

- **58 interactive-master asset routes** in registry; **57** render Coverage Explorer on their product pages (`commercial-insurance` hub page has NO EXPLORER).
- **6 compact-ratio routes** (1312×1199) did not exhibit horizontal overflow pre-fix; **49 standard-ratio routes** (1672×941) failed.
- **Restaurant** and **Contractors** use `coverage-state-images` mode; pre-fix PASS inherited from prior `a00f559` min-height work.
- **0 SOURCE-ASSET ISSUE** — edge-bleed analysis found no systematic source PNG cropping; clipping was browser/CSS geometry.
- Separate from Contractors static-only work (`cursor/contractors-static-only-7402`).
