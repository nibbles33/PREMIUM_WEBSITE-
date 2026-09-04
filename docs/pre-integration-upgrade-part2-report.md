# Pre-Integration Upgrade — Part 2 Report

**Branch:** `cursor/coverage-explorer-part2-7402`  
**Base:** `cursor/pre-integration-upgrade-part1-7402` (Part 1 approved stack)  
**Status:** STOP FOR OWNER REVIEW — do not merge, do not deploy

---

## H. Coverage Explorer Architecture

### Components created/changed

| File | Role |
|------|------|
| `src/types/coverage-explorer.ts` | Shared types: `CoverageVisualFamily`, zones, states, explorer config |
| `src/data/coverage-explorer/registry.ts` | Slug → family mapping, config resolver, audit helpers |
| `src/data/coverage-explorer/families/*.ts` | Per-family zone/state configs (6 families) |
| `src/components/pilot/coverage-explorer/CoverageVisualStage.tsx` | Shared visual stage renderer |
| `src/components/pilot/product/ProductCoverageVisualStage.tsx` | Routes to shared stage or icon fallback |
| `src/components/pilot/product/ProductCoverageExplorer.tsx` | Passes `coverageExplorer` config |
| `src/lib/buildPilotProductConfig.ts` | Auto-attaches explorer config by slug |
| `src/types/pilot-product.ts` | Added `coverageExplorer` to page config |
| `src/components/pilot/auto/AutoCoverageVisualStage.tsx` | Car integration fix (wrap + blend) |
| `src/styles/pilot.css` | Auto car fix + `.pilot-ce-*` shared explorer system |

### Data model (conceptual)

```typescript
CoverageExplorerVisualConfig {
  visualFamily, sceneSrc?, object?, objectLayout?,
  sceneMode: "css-cutaway" | "photo-scene" | "object-only",
  cssSceneClass?, zones[], coverageStates[]
}

CoverageStateConfig {
  coverageId,        // slugified coverage title
  activeZoneIds[],
  ambient?, sceneModifier?, callouts?
}
```

Coverage IDs match existing `toCoverageItems()` slugify — no content changes.

### Visual families supported

| Family | Implemented | Slugs mapped |
|--------|-------------|--------------|
| **house** | Yes (CSS cutaway) | home, landlord, cottage, tenant, mobile-home, home-sharing, group-home-auto |
| **boat** | Yes (photo + zones) | boat-insurance |
| **restaurant-hospitality** | Yes (CSS cutaway placeholder) | restaurant, food-truck, hotel-motel, grocery, convenience-store |
| **garage-dealership** | Yes (photo + zones) | garage-dealership-insurance |
| **greenhouse** | Yes (photo + zones) | greenhouse-agribusiness-insurance |
| **transport-truck** | Yes (photo + zones) | trucking, cargo-freight |
| **auto** | Yes (separate Auto explorer, fixed) | auto-insurance (dedicated component) |
| condo | Mapped only | condo-insurance |
| commercial-building | Mapped only | commercial-property, business-interruption, property-management, real-estate, condominium-corporation |
| construction | Mapped only | contractors, builders-risk, builders-developers, landscaping |
| factory-industrial | Mapped only | manufacturing, product-recall, warehousing |
| fleet-commercial-vehicle | Mapped only | commercial-auto, dump-truck |
| farm | Mapped only | farm-insurance |

Unmapped product slugs retain icon-only fallback (unchanged behavior).

---

## I. Auto Explorer Fix

**Asset:** `public/images/miniatures/premium-miniature-car.png` — 1254×1254 RGB, **no alpha channel** (baked rectangular background). No transparent alternative found in repository.

**Fixes applied:**
- Car enlarged: ~92% stage width (desktop max 28rem, was 17.5rem)
- Radial mask fades rectangular PNG edges into champagne stage
- `mix-blend-mode: multiply` blends baked ivory background with stage gradient
- Wider soft contact shadow platform (62% width, blurred radial)
- Image wrap centers car with `object-position: center bottom`

**Asset requirement:** Transparent car PNG (or WebP with alpha) would eliminate blend workaround and improve edge quality.

---

## J. Restaurant Explorer

**RESTAURANT INTERACTIVE SCENE ASSET REQUIRED** — No layered restaurant/isometric artwork exists in repo. Implemented CSS isometric cutaway placeholder with zone overlays.

### State-by-state behavior

| Coverage | Zones highlighted | Visual treatment |
|----------|-------------------|------------------|
| General Liability | dining-floor, entrance-path | Gold radial ambient on guest/dining area; perimeter glow + path pulse |
| Property Coverage | building-shell, interior-fixtures | Warm outline on premises shell; fill on fixtures zone |
| Liquor Liability | bar-area, bottle-display | Bar glow + bottle display pulse; scene dim 15% |
| Equipment Breakdown & Spoilage | kitchen-zone, cooking-equipment, refrigeration | Kitchen outline; oven/refrigeration pulse; cool ambient |

Transitions: 320–380ms opacity/background (CSS only). Reduced-motion disables pulse animation.

---

## K. Other Explorers Upgraded

| Route | Family | Scene mode |
|-------|--------|------------|
| `/home-insurance/` | house | CSS cutaway (roof, contents, liability exterior, ALE, high-value) |
| `/boat-insurance/` | boat | Hero photo + hull/liability/equipment/navigation zones |
| `/garage-dealership-insurance/` | garage-dealership | Garage hero photo + bay/lot/inventory zones |
| `/trucking-insurance/` | transport-truck | Trucking hero photo + cargo/liability/physical-damage/route zones |
| `/greenhouse-agribusiness-insurance/` | greenhouse | Greenhouse hero photo + shell/equipment/stock/BI zones |
| `/restaurant-insurance/` | restaurant-hospitality | CSS cutaway flagship |

Hospitality slugs (food-truck, hotel-motel, etc.) inherit restaurant-hospitality config.

---

## L. Asset Gaps

| Route / Family | Required visual | Why existing library cannot support layered interaction |
|----------------|-----------------|--------------------------------------------------------|
| **auto** | Transparent car cutout PNG | Current `premium-miniature-car.png` is RGB with baked background; blend/mask is a workaround |
| **restaurant-hospitality** | Layered isometric/cutaway restaurant scene | No restaurant miniature or zone-separated artwork; only flat hero `restaurant-insurance.webp` |
| **condo** | Condo unit cutaway (unit vs. common elements) | No condo-specific scene asset |
| **commercial-building** | Building shell / tenant-area cutaway | Hero photos exist but no zone-separated layers for property vs. BI |
| **construction** | Site/building-under-construction scene | Contractors hero is flat photo; no phased zone artwork |
| **factory-industrial** | Factory floor / machinery zones | Manufacturing hero is flat photo |
| **fleet-commercial-vehicle** | Fleet lot / multi-vehicle scene | `commercial-auto-insurance.webp` is single flat hero |
| **farm** | Farm property / equipment / livestock zones | `farm-insurance.webp` is flat hero only |

---

## M. Performance

- **No new npm dependencies**
- **No canvas/WebGL/Three.js** — CSS transforms, opacity, gradients, Next/Image only
- Photo scenes use existing hero WebP assets (lazy-loaded below fold via page structure)
- Zone overlays are empty `<span>` elements — minimal DOM
- Transitions use CSS only (320–380ms)
- `sizes` hints on scene images: `(max-width: 767px) min(100vw, 360px), 560px`

---

## N. Regression

| Check | Result |
|-------|--------|
| `npm run build` | PASS |
| Card navigation 235/235 click targets | PASS |
| Href routes 56/56 | PASS |
| Related-family 51/51 | PASS |
| Coverage explorer runtime (7 routes, all states) | PASS |
| Console errors during explorer test | None |
| Mobile viewport (390px) | Stage min-height 16rem; no horizontal overflow observed in capture |
| Part 1 systems preserved | Filmstrip, awards rail, mega-menu, photography registry, CTA, routes |

**Note:** Card nav reported 1 mobile test failure (pre-existing drag/swipe edge case on port 3000 run); all 235 click targets and 56/51 href/related tests passed.

---

## O. Unexpected Findings

1. **Two parallel explorer implementations remain intentional:** Auto keeps bespoke scene overlays (6 scenes with icons/badges) as reference; generic products use shared `CoverageVisualStage`. Unifying Auto into the shared config would require encoding 6 complex overlay trees — deferred to avoid scope creep.

2. **`premium-miniature-car.png` not in glob index** but present on disk (1.6MB RGB PNG) — only miniature besides `car-placeholder.svg`.

3. **Restaurant hero photo** (`restaurant-insurance.webp`) is suitable for page hero but not for zone-separated explorer — CSS cutaway is the correct interim architecture.

4. **Greenhouse has 6 coverage items** — largest implemented photo-scene; BI state applies scene dim + photo desaturation via CSS filter.

---

## Screenshots

Committed to `docs/qa-screenshots/pre-integration-part2/`:

- `auto-explorer-desktop.png` / `auto-explorer-mobile.png`
- `restaurant-explorer-desktop.png` / `restaurant-explorer-mobile.png`
- `home-explorer-desktop.png`
- `boat-explorer-desktop.png`
- `garage-explorer-desktop.png`

---

**STOP FOR OWNER REVIEW. Do not merge. Do not deploy. Do not begin 57-page content audit.**
