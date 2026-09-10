# Pre-Integration Upgrade — Part 2 Addendum: Real Miniature Explorers

**Branch:** `cursor/coverage-explorer-part2-7402`  
**Status:** STOP FOR OWNER REVIEW — do not merge, do not deploy

---

## Assets confirmed (8 files in `public/images/`)

| File | Dimensions | Mode |
|------|------------|------|
| `premium-restaurant.png` | 1315×1196 | Cutaway miniature |
| `premium-commercial-building.png` | 1199×1312 | Cutaway miniature |
| `premium-construction-site.png` | 1402×1122 | Cutaway miniature |
| `premium-factory.png` | 1402×1122 | Cutaway miniature |
| `premium-farm.png` | 1313×1198 | Cutaway miniature |
| `premium-house.png` | 1341×1173 | Cutaway miniature |
| `premium-work-truck-fleet.png` | 1402×1122 | Object-on-plinth (Auto-style) |
| `premium-retail-store.png` | 1329×1183 | Cutaway miniature |

Asset registry: `src/data/coverage-explorer/miniature-assets.ts`

---

## Explorers rebuilt with real artwork

### Cutaway miniatures (`sceneMode: cutaway-miniature`)

Zone overlays positioned against visible artwork regions (not CSS placeholders):

| Family | Asset | Example routes |
|--------|-------|----------------|
| restaurant-hospitality | premium-restaurant.png | `/restaurant-insurance/` |
| house | premium-house.png | `/home-insurance/` |
| commercial-building | premium-commercial-building.png | `/commercial-property-insurance/`, `/business-interruption-insurance/` |
| construction | premium-construction-site.png | `/contractors-insurance/` |
| factory-industrial | premium-factory.png | `/manufacturing-insurance/` |
| farm | premium-farm.png | `/farm-insurance/` |
| retail | premium-retail-store.png | `/retail-insurance/` |

**Restaurant zone mapping (verified against artwork):**
- General Liability → dining floor, entrance facade, bar stools
- Property → building shell, kitchen, bar structure
- Liquor → bar counter + stool seating (right side of cutaway)
- Equipment → kitchen zone, range/hood, refrigeration

### Fleet / commercial auto (`sceneMode: object-only`)

| Family | Asset | Treatment |
|--------|-------|-------------|
| fleet-commercial-vehicle | premium-work-truck-fleet.png | Auto-style: enlarged object, radial mask, multiply blend, overlay rings around truck + van |

Routes: `/commercial-auto-insurance/`, `/dump-truck-insurance/`

---

## Remaining asset gaps (Part 2 list closed except)

| Gap | Status |
|-----|--------|
| Restaurant cutaway scene | **CLOSED** — `premium-restaurant.png` |
| Commercial building scene | **CLOSED** — `premium-commercial-building.png` |
| Construction scene | **CLOSED** — `premium-construction-site.png` |
| Factory/industrial scene | **CLOSED** — `premium-factory.png` |
| Farm scene | **CLOSED** — `premium-farm.png` |
| Fleet scene | **CLOSED** — `premium-work-truck-fleet.png` (object-overlay) |
| Retail scene | **CLOSED** — `premium-retail-store.png` (bonus) |
| House scene | **CLOSED** — `premium-house.png` |
| **Condo** | **Still open** — no condo miniature; icon-only fallback |
| **Auto transparent car** | **Still open** — `premium-miniature-car.png` RGB workaround remains |

Still using hero photography (not miniatures): boat, garage-dealership, greenhouse, transport-truck.

---

## Validation

| Check | Result |
|-------|--------|
| `npm run build` | PASS |
| Explorer runtime (13 routes, all states) | PASS |
| Premium images load (no broken assets) | PASS |
| Console errors | None |

Screenshots updated in `docs/qa-screenshots/pre-integration-part2/` including commercial-building, construction, factory, farm, fleet, retail.

---

**STOP FOR OWNER REVIEW.**
