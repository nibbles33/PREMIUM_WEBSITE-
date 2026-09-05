# Batch C/D — Specialty, Agriculture & Transportation Rollout (Review Pack)

**Branch:** `cursor/commercial-batch-cd-7402`  
**Status:** Ready for owner review — **STOP before merge/deploy**

## What shipped

Final pilot migration batch — **5 remaining commercial routes** moved to the shared `PilotProductPage` system:

| Batch | Routes | Count |
|---|---|---|
| **C — Specialty / Agriculture** | `/farm-insurance/`, `/food-truck-insurance/` | 2 |
| **D — Transportation** | `/trucking-insurance/`, `/commercial-auto-insurance/`, `/dump-truck-insurance/` | 3 |
| **Total Batch C/D** | | **5** |

Combined with Batch A (13 personal) + Batch B (38 commercial) = **56 product routes** on the pilot system.

### Implementation notes

- **Farm** — inline config in `pilot-commercial-inline.ts` (preserves `Farm Insurance` eyebrow, `#7A8B5C` accent, `/get-a-quote?type=farm` quote path, existing coverage/FAQ copy)
- **Food truck, commercial auto, dump truck** — adapted from `commercial-industries.ts` via `adaptCommercialIndustryContent()`
- **Trucking** — migrated from legacy `PilotTruckingPage` (custom dark hero + placeholder miniature) to standard pilot product layout for consistency with Batch B; dedicated `trucking-insurance.webp` hero retained
- **Greenhouse** — no dedicated route exists; homepage/agriculture cluster links to `/farm-insurance/` with `greenhouse.webp` used on related cards only (see missing-asset notes)

---

## Route matrix

| Route | Batch | Hero photo | Miniature | Explorer | Desktop | Mobile |
|---|---|---|---|---|---|---|
| `/farm-insurance/` | C | farm-insurance.webp | Icon-only | Interactive (4 states) | PASS | PASS |
| `/food-truck-insurance/` | C | food-truck-insurance.webp | Icon-only | Interactive (4 states) | PASS | PASS |
| `/trucking-insurance/` | D | trucking-insurance.webp | Icon-only | Interactive (4 states) | PASS | PASS |
| `/commercial-auto-insurance/` | D | commercial-auto-insurance.webp | Icon-only | Interactive (4 states) | PASS | PASS |
| `/dump-truck-insurance/` | D | dump-truck-insurance.webp | Icon-only | Interactive (4 states) | PASS | PASS |

All 5 routes: HTTP 200, hero photo present, no horizontal overflow.

**Not modified:** `/`, `/auto-insurance/`, global nav, quote/claims flows.

**Already migrated (Batch B):** `/cargo-freight-insurance/` — transportation-adjacent, no duplicate work.

---

## Coverage explorer — duplication fix verified

Explicitly re-verified on 3 Batch C/D pages:

| Route | States tested | Stage caption | Gold detail box | Result |
|---|---|---|---|---|
| `/farm-insurance/` | 4 | Hidden (icon-only) | Single source | PASS |
| `/food-truck-insurance/` | 4 | Hidden (icon-only) | Single source | PASS |
| `/trucking-insurance/` | 4 | Hidden (icon-only) | Single source | PASS |

Icon-only stage polish (`pilot-product-coverage-stage-frame--icon-only`) applied by default.

Coverage categories sourced from existing site content:
- **Farm:** property, equipment & machinery, liability, livestock
- **Food truck:** GL, commercial auto, equipment, product liability
- **Trucking:** cargo, liability, physical damage, cross-border
- **Commercial auto:** liability, physical damage, hired & non-owned, fleet
- **Dump truck:** commercial auto liability, physical damage, cargo & debris, non-trucking liability

---

## Missing-asset notes

| Item | Status |
|---|---|
| Commercial miniatures | None exist — icon-only fallback (same as Batch A/B) |
| **Greenhouse dedicated route** | **No `/greenhouse-insurance/` route exists.** Photography (`greenhouse.webp`) is wired in `placements.ts` for homepage cluster + quote funnel; agriculture nav links greenhouse to `/farm-insurance/`. Not invented — flagged for future route decision. |
| **Batch B generic hero fallback** | Tracked follow-up (not in scope): 28 Batch B product routes share `commercial-insurance.webp` fallback — unchanged in C/D |
| Batch C/D hero photography | All 5 routes have dedicated photos in `placements.ts` — no fallback needed |

---

## Validation results

| Check | Result |
|---|---|
| `npm run build` | PASS |
| All 5 Batch C/D routes HTTP 200 | PASS |
| All 5 routes hero photo present | PASS |
| Coverage duplication (farm, food-truck, trucking × 4 states) | PASS |
| Regression: `/`, Auto, commercial hub, contractors, claims, quote | PASS |
| Scope lock honored | PASS |

Screenshots: `docs/qa-screenshots/batch-cd/{slug}/desktop_1440.png` + `mobile_390.png` (10 PNGs)

Validation report: `docs/qa-screenshots/batch-cd/validation-report.json`

Script: `node scripts/batch-cd-validate.cjs` (requires running server)

---

## Screenshots (viewable in repo)

| Route | Desktop | Mobile |
|---|---|---|
| `/farm-insurance/` | `docs/qa-screenshots/batch-cd/farm-insurance/desktop_1440.png` | `mobile_390.png` |
| `/food-truck-insurance/` | `docs/qa-screenshots/batch-cd/food-truck-insurance/desktop_1440.png` | `mobile_390.png` |
| `/trucking-insurance/` | `docs/qa-screenshots/batch-cd/trucking-insurance/desktop_1440.png` | `mobile_390.png` |
| `/commercial-auto-insurance/` | `docs/qa-screenshots/batch-cd/commercial-auto-insurance/desktop_1440.png` | `mobile_390.png` |
| `/dump-truck-insurance/` | `docs/qa-screenshots/batch-cd/dump-truck-insurance/desktop_1440.png` | `mobile_390.png` |

---

## Checkpoint

**Batch C/D complete. All planned pilot product routes migrated. Awaiting owner review before merge/deploy.**
