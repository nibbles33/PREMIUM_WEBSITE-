# Batch A — Personal Lines Rollout

**Branch:** `cursor/personal-batch-a-7402`  
**Reference:** `/auto-insurance/` (frozen — not modified)  
**Status:** Complete — **STOP for owner review** before Batch B

## Summary

Rolled the approved Auto visual system across **13 personal product routes** using shared pilot product architecture (`.pilot-product-*` CSS/classes). Auto page, homepage, and global nav were not modified.

### Shared architecture

| Component | Path |
|---|---|
| Page shell | `src/components/pilot/product/PilotProductPage.tsx` |
| Client loader | `src/components/pilot/product/PilotPersonalPage.tsx` |
| Config registry | `src/data/pilot-personal-registry.ts` |
| Inline configs | `src/data/pilot-personal-inline.ts` |
| Specialty adapter | `adaptProductPageContent()` in `src/lib/buildPilotProductConfig.ts` |
| Styles | `src/styles/pilot.css` (`.pilot-product-*` section) |

### Miniature assets

Only **`premium-miniature-car.png`** exists (Auto only). All Batch A pages use **icon-based Coverage Explorer stages** — no fabricated miniature paths.

Missing miniatures (aspirational, not in repo): home, condo, tenant, motorcycle, boat, cottage, travel, etc.

---

## Route matrix

| Route | Old template | New template | Hero photo | Miniature | Explorer type | FAQ | Desktop | Mobile |
|---|---|---|---|---|---|---|---|---|
| `/home-insurance/` | LineInsurancePage | PilotProductPage | home-insurance.webp | None (icon stage) | Interactive | Preserved (6) | PASS | PASS |
| `/condo-insurance/` | LineInsurancePage | PilotProductPage | condo.webp | None | Interactive | Preserved (4) | PASS | PASS |
| `/tenant-insurance/` | LineInsurancePage | PilotProductPage | tenant.webp | None | Interactive | Preserved (4) | PASS | PASS |
| `/landlord-insurance/` | LineInsurancePage | PilotProductPage | landlord.webp | None | Interactive | Preserved (4) | PASS | PASS |
| `/motorcycle-insurance/` | LineInsurancePage | PilotProductPage | motorcycle.webp | None | Interactive | Preserved (4) | PASS | PASS |
| `/boat-insurance/` | LineInsurancePage | PilotProductPage | boat.webp | None | Interactive | Preserved (4) | PASS | PASS |
| `/cottage-insurance/` | LineInsurancePage | PilotProductPage | cottage.webp | None | Interactive | Preserved (4) | PASS | PASS |
| `/travel-insurance/` | LineInsurancePage | PilotProductPage | travel-insurance.webp | None | Interactive | Preserved (4) | PASS | PASS |
| `/mobile-home-insurance/` | ProductLinePage | PilotProductPage | **None assigned** | None | Interactive | Preserved (4) | PASS | PASS |
| `/personal-umbrella-insurance/` | ProductLinePage | PilotProductPage | **None assigned** | None | Interactive | Preserved (4) | PASS | PASS |
| `/home-sharing-insurance/` | ProductLinePage | PilotProductPage | **None assigned** | None | Interactive | Preserved (4) | PASS | PASS |
| `/life-insurance/` | ProductLinePage | PilotProductPage | **None assigned** | None | Interactive | Preserved (4) | PASS | PASS |
| `/group-home-auto-insurance/` | ProductLinePage | PilotProductPage | **None assigned** | None | Interactive | Preserved (4) | PASS | PASS |

**Not modified:** `/auto-insurance/`, `/` (homepage)

### Related products (preserved from existing content)

See each page config in `src/data/pilot-personal-inline.ts` and `src/data/product-pages/personal-specialty.ts`.

### Special CTA cases preserved

- **Travel:** Primary → `/talk-to-a-broker/`; secondary → Contact Us
- **Life / Group:** Primary → `/contact/?inquiry=...`; secondary → Talk to a Broker
- **Umbrella / Home-sharing:** Broker-first primary CTAs preserved

### Final CTA broker button

All 13 routes: `.pilot-product-final-broker-btn` visible in default state (no hover required). Validated via Puppeteer.

---

## Validation

| Check | Result |
|---|---|
| `npm run build` | PASS |
| `npm run lint` | Pre-existing errors only (21 errors in unrelated files); no new errors in pilot product files |
| All 13 personal routes HTTP 200 | PASS |
| Regression: `/`, `/auto-insurance/`, `/trucking-insurance/`, `/claims/`, `/get-a-quote/` | PASS (200) |
| Horizontal overflow (390px) | PASS (none detected) |
| Broker CTA default visibility | PASS (all 13) |

Screenshots: `/opt/cursor/artifacts/screenshots/batch-a/{slug}/desktop_1440.png` and `mobile_390.png` for each route.

---

## Checkpoint

**Batch A complete. Awaiting owner approval before Batch B (Core Commercial).**

Do not merge to `main` or deploy production until approved.
