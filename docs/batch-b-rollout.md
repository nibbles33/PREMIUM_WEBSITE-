# Batch B — Core Commercial Rollout (Review Pack)

**Branch:** `cursor/commercial-batch-b-7402`  
**Status:** Ready for owner review — **STOP before Batch C/D**

## What shipped

Batch B migrates **38 core commercial routes** to the shared pilot product system (`PilotProductPage`), mirroring Batch A architecture:

| Layer | Path |
|---|---|
| Page shell | `src/components/pilot/product/PilotProductPage.tsx` (extended: hub layout + conditional sections) |
| Commercial loader | `src/components/pilot/product/PilotCommercialPage.tsx` |
| Registry | `src/data/pilot-commercial-registry.ts` |
| Inline configs | `src/data/pilot-commercial-inline.ts` (hub + bonding) |
| Adapters | `adaptCommercialIndustryContent()`, `adaptCommercialProductContent()` in `buildPilotProductConfig.ts` |
| Page helper | `createPilotCommercialPageExports()` in `src/lib/createPilotCommercialPage.tsx` |

### Route counts

| Category | Count | Source |
|---|---|---|
| Commercial hub | 1 | Inline (`commercial-insurance`) — industry grid preserved |
| Core industry pages | 8 | `commercial-industries.ts` |
| Bonding | 1 | Inline (`bonding-insurance`) |
| Specialty/product pages | 28 | `product-pages/commercial-products-*.ts` |
| **Total Batch B** | **38** | |

### Explicitly NOT migrated (reserved)

| Batch | Routes | Status |
|---|---|---|
| Batch C | `/farm-insurance/`, `/food-truck-insurance/` | Unchanged (legacy templates) |
| Batch D | `/trucking-insurance/`, `/commercial-auto-insurance/`, `/dump-truck-insurance/` | Unchanged (legacy templates) |

---

## Route matrix

| Route | Hero photo | Miniature | Explorer | Industry grid | Desktop | Mobile |
|---|---|---|---|---|---|---|
| `/commercial-insurance/` | commercial-insurance.webp | None | N/A (hub) | Yes | PASS | PASS |
| `/contractors-insurance/` | contractors-insurance.webp | None (icon) | Interactive | — | PASS | PASS |
| `/manufacturing-insurance/` | manufacturing-insurance.webp | None (icon) | Interactive | — | PASS | PASS |
| `/commercial-property-insurance/` | commercial-property-insurance.webp | None (icon) | Interactive | — | PASS | PASS |
| `/restaurant-insurance/` | restaurant-insurance.webp | None (icon) | Interactive | — | PASS | PASS |
| `/professional-offices-insurance/` | professional-offices-insurance.webp | None (icon) | Interactive | — | PASS | PASS |
| `/real-estate-insurance/` | real-estate-insurance.webp | None (icon) | Interactive | — | PASS | PASS |
| `/builders-developers-insurance/` | builders-developers-insurance.webp | None (icon) | Interactive | — | PASS | PASS |
| `/retail-insurance/` | retail-insurance.webp | None (icon) | Interactive | — | PASS | PASS |
| `/bonding-insurance/` | bonding-insurance.webp | None (icon) | Interactive | — | PASS | PASS |
| 28 product routes (e.g. `/cyber-insurance/`) | Fallback: commercial-insurance.webp | None (icon) | Interactive | — | PASS | PASS |

All 38 Batch B routes: HTTP 200, hero photo present, no horizontal overflow.

**Not modified:** `/`, `/auto-insurance/`, global nav, quote/claims flows.

---

## Coverage explorer — duplication fix verified

Explicitly re-verified on 3 commercial pages (not assumed from Batch A):

| Route | States tested | Stage caption visible | Gold detail box | Result |
|---|---|---|---|---|
| `/contractors-insurance/` | 4 | Hidden (icon-only) | Single source | PASS |
| `/restaurant-insurance/` | 4 | Hidden (icon-only) | Single source | PASS |
| `/commercial-property-insurance/` | 4 | Hidden (icon-only) | Single source | PASS |

Icon-only stage uses `pilot-product-coverage-stage-frame--icon-only` (reduced height + ambient background) by default — same treatment as Batch A.

Coverage categories are product-specific, sourced from existing `commercial-industries.ts` and `product-pages/` content (e.g. Contractors: GL, tools & equipment, builder's risk, wrap-up; Restaurant: property, equipment, liability, business interruption, spoilage).

---

## Missing-asset notes

| Asset type | Batch B status |
|---|---|
| Commercial miniatures | None exist (same as Batch A) — icon-only fallback applied |
| Dedicated hero photos (28 product pages) | No per-route photography in `placements.ts` — **fallback to `commercial-insurance.webp`** via `resolveCommercialPhotographySlug()` |
| Industry hero photos (9 routes + bonding) | All wired from existing `placements.ts` entries |

Product pages without dedicated photography are flagged here for a future photography pass; they render with the hub/commercial generic hero rather than a blank stage.

---

## Validation results

| Check | Result |
|---|---|
| `npm run build` | PASS |
| All 38 Batch B routes HTTP 200 | PASS |
| All 38 routes hero photo present | PASS |
| Commercial hub industry grid preserved | PASS |
| Coverage duplication (3 commercial pages × 4 states) | PASS |
| Regression: `/`, `/auto-insurance/`, `/home-insurance/`, Batch C/D routes, `/claims/`, `/get-a-quote/` | PASS |
| Batch C/D routes still on legacy templates | PASS |

Screenshots committed under `docs/qa-screenshots/batch-b/` (6 representative routes × desktop 1440 + mobile 390 = 12 PNGs).

Validation report: `docs/qa-screenshots/batch-b/validation-report.json`

Script: `node scripts/batch-b-validate.cjs` (requires running server)

---

## Screenshots (viewable in repo)

| Route | Desktop | Mobile |
|---|---|---|
| `/commercial-insurance/` | `docs/qa-screenshots/batch-b/commercial-insurance/desktop_1440.png` | `mobile_390.png` |
| `/contractors-insurance/` | `docs/qa-screenshots/batch-b/contractors-insurance/desktop_1440.png` | `mobile_390.png` |
| `/restaurant-insurance/` | `docs/qa-screenshots/batch-b/restaurant-insurance/desktop_1440.png` | `mobile_390.png` |
| `/commercial-property-insurance/` | `docs/qa-screenshots/batch-b/commercial-property-insurance/desktop_1440.png` | `mobile_390.png` |
| `/small-business-insurance/` | `docs/qa-screenshots/batch-b/small-business-insurance/desktop_1440.png` | `mobile_390.png` |
| `/cyber-insurance/` | `docs/qa-screenshots/batch-b/cyber-insurance/desktop_1440.png` | `mobile_390.png` |

---

## Checkpoint

**Batch B complete. Awaiting owner review before Batch C (Farm, Food Truck) or Batch D (Trucking, Commercial Auto, Dump Truck).**
