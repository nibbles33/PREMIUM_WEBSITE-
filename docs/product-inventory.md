# PremiumIB product inventory

Read-only inventory of insurance products and coverage lines present in the `premiumib.com` codebase. Generated from navigation data, App Router pages, Coverage Explorer registry, footer links, homepage discovery data, and SEO structured-data helpers.

**Do not treat this as a sales catalog rewrite** — it reflects what the code ships today.

### Primary sources

| Source | Role |
|---|---|
| `src/data/nav-personal.ts` | Personal mega-menu |
| `src/data/nav-business.ts` | Business mega-menu (10 industries, including Agriculture) |
| `src/data/nav-life.ts` | Life Insurance mega-menu |
| `src/data/nav-agriculture.ts` | Agriculture helper links (hub + products; top-level Agriculture nav retired) |
| `src/data/nav.ts` | Top-level header categories |
| `src/app/*/page.tsx` | Dedicated routes |
| `src/data/coverage-explorer/registry.ts` | Coverage Explorer slug → visual family |
| `src/lib/seo/structured-data.ts` | `Service` / `WebPage` JSON-LD builders |
| `src/components/Footer.tsx` | Curated footer product columns |
| `src/data/pilot-home.ts` | Homepage filmstrip / commercial discovery |

---

## Summary counts

| Category | Product pages (excl. hub) | Category hub | Mega-menu product links |
|---|---:|---:|---:|
| Personal | 13 | `/personal/` | 13 |
| Commercial / Business (excl. Agriculture industry) | 43 | `/commercial-insurance/` | 43 |
| Agriculture | 5 | `/agriculture/` | 5 (under **Business → Agriculture**) |
| Life | 5 | `/life-insurance/` | 5 |
| **Total** | **66 products** | **4 hubs** | **70 unique inventory routes** |

Coverage Explorer is **not** a separate product list: it maps many of the URLs above to interactive visual families on those pages.

---

## Category hubs

| Product | URL | Page status | Nav status | Notes |
|---|---|---|---|---|
| Personal (hub) | `/personal/` | Dedicated page | Top-level header + Personal mega-menu hub | JSON-LD: `WebPage` (not `Service`) |
| Commercial / Business (hub) | `/commercial-insurance/` | Dedicated page | Top-level Business header + Business mega-menu hub | Also first footer Business link |
| Life Insurance (hub) | `/life-insurance/` | Dedicated page (`PilotPersonalPage`) | Top-level Life header + Life mega-menu hub | Also in Personal filmstrip + Footer Personal column; JSON-LD: `Service` via pilot config |
| Agriculture (hub) | `/agriculture/` | Dedicated page | Footer + `agricultureNavLinks` helper; **not** a Business mega-menu row | JSON-LD: `WebPage`; child products live under Business → Agriculture |

---

## Personal

Mega-menu groups from `nav-personal.ts`. All 13 links have dedicated pages. Homepage filmstrip (`personalFilmstripItems`) covers the same set plus Life hub.

| Product | URL | Page status | Nav status | Notes |
|---|---|---|---|---|
| Auto Insurance | `/auto-insurance/` | Dedicated page | Personal mega-menu; filmstrip; footer | Coverage Explorer: not in `SLUG_TO_VISUAL_FAMILY` (custom `PilotAutoPage`); `Service` JSON-LD |
| Motorcycle Insurance | `/motorcycle-insurance/` | Dedicated page | Personal mega-menu; filmstrip; footer | |
| Boat Insurance | `/boat-insurance/` | Dedicated page | Personal mega-menu; filmstrip | Coverage Explorer: `boat` |
| Travel Insurance | `/travel-insurance/` | Dedicated page | Personal mega-menu; filmstrip | |
| Home Insurance | `/home-insurance/` | Dedicated page | Personal mega-menu; filmstrip; footer | Coverage Explorer: `house` |
| Condo Insurance | `/condo-insurance/` | Dedicated page | Personal mega-menu; filmstrip; footer | Coverage Explorer: `condo` |
| Tenant Insurance | `/tenant-insurance/` | Dedicated page | Personal mega-menu; filmstrip; footer | Coverage Explorer: `house` |
| Landlord Insurance | `/landlord-insurance/` | Dedicated page | Personal mega-menu; filmstrip; footer | Coverage Explorer: `house` |
| Cottage Insurance | `/cottage-insurance/` | Dedicated page | Personal mega-menu; filmstrip | Coverage Explorer: `house` |
| Mobile / Manufactured Home | `/mobile-home-insurance/` | Dedicated page | Personal mega-menu; filmstrip | Coverage Explorer: `house` |
| Personal Umbrella | `/personal-umbrella-insurance/` | Dedicated page | Personal mega-menu; filmstrip; footer | |
| Group Home & Auto | `/group-home-auto-insurance/` | Dedicated page | Personal mega-menu; filmstrip | Coverage Explorer: `house` |
| Home & Ride Sharing | `/home-sharing-insurance/` | Dedicated page | Personal mega-menu; filmstrip | Coverage Explorer: `house` |

---

## Commercial / Business

Mega-menu from `nav-business.ts` (Agriculture industry listed in its own section below). **43** non-agriculture product links; all have dedicated pages.

### Construction & Contractors

| Product | URL | Page status | Nav status | Notes |
|---|---|---|---|---|
| Contractors | `/contractors-insurance/` | Dedicated page | Business mega-menu; footer | Coverage Explorer: `construction` |
| Builders & Developers | `/builders-developers-insurance/` | Dedicated page | Business mega-menu | Coverage Explorer: `construction` |
| Builder's Risk | `/builders-risk-insurance/` | Dedicated page | Business mega-menu | Coverage Explorer: `construction` |
| Landscaping & Snow Removal | `/landscaping-snow-removal-insurance/` | Dedicated page | Business mega-menu | Coverage Explorer: `construction` |
| Surety Bonds | `/bonding-insurance/` | Dedicated page | Business mega-menu; footer | URL slug is `bonding-insurance` (label ≠ slug) |
| Pollution Liability | `/pollution-liability-insurance/` | Dedicated page | Business mega-menu | |

### Manufacturing

| Product | URL | Page status | Nav status | Notes |
|---|---|---|---|---|
| Manufacturing | `/manufacturing-insurance/` | Dedicated page | Business mega-menu | Coverage Explorer: `factory-industrial` |
| Cannabis Producer | `/cannabis-producer-insurance/` | Dedicated page | Business mega-menu | Coverage Explorer: `factory-industrial` |
| Product Recall | `/product-recall-insurance/` | Dedicated page | Business mega-menu | Coverage Explorer: `factory-industrial` |
| Warehousing | `/warehousing-insurance/` | Dedicated page | Business mega-menu | Coverage Explorer: `factory-industrial` |
| Business Interruption | `/business-interruption-insurance/` | Dedicated page | Business mega-menu | Coverage Explorer: `commercial-building` |

### Hospitality & Restaurants

| Product | URL | Page status | Nav status | Notes |
|---|---|---|---|---|
| Restaurants | `/restaurant-insurance/` | Dedicated page | Business mega-menu | Coverage Explorer: `restaurant-hospitality` |
| Food Truck / Trailer | `/food-truck-insurance/` | Dedicated page | Business mega-menu | Coverage Explorer: `restaurant-hospitality` |
| Hotel / Motel | `/hotel-motel-insurance/` | Dedicated page | Business mega-menu | Coverage Explorer: `restaurant-hospitality` |
| Liquor Liability | `/liquor-liability-insurance/` | Dedicated page | Business mega-menu | |

### Retail & Grocery

| Product | URL | Page status | Nav status | Notes |
|---|---|---|---|---|
| Retail | `/retail-insurance/` | Dedicated page | Business mega-menu | Coverage Explorer: `retail` |
| Convenience / Gas | `/convenience-store-insurance/` | Dedicated page | Business mega-menu | Coverage Explorer: `restaurant-hospitality` |
| Grocery / Specialty Food & Bakery | `/grocery-specialty-food-insurance/` | Dedicated page | Business mega-menu | Coverage Explorer: `restaurant-hospitality` |
| Cannabis Retail | `/cannabis-retail-insurance/` | Dedicated page | Business mega-menu | Coverage Explorer: `retail` |
| Small Business | `/small-business-insurance/` | Dedicated page | Business mega-menu | |

### Transportation & Trucking

| Product | URL | Page status | Nav status | Notes |
|---|---|---|---|---|
| Commercial Auto / Fleet | `/commercial-auto-insurance/` | Dedicated page | Business mega-menu; footer (“Commercial Auto”) | Coverage Explorer: `fleet-commercial-vehicle`; near-duplicate label vs footer |
| Trucking | `/trucking-insurance/` | Dedicated page | Business mega-menu | Coverage Explorer: `transport-truck` |
| Dump Truck | `/dump-truck-insurance/` | Dedicated page | Business mega-menu | Coverage Explorer: `fleet-commercial-vehicle` |
| Cargo / Freight | `/cargo-freight-insurance/` | Dedicated page | Business mega-menu | Coverage Explorer: `transport-truck` |
| Garage / Dealership | `/garage-dealership-insurance/` | Dedicated page | Business mega-menu | Coverage Explorer: `garage-dealership` |

### Professional Services

| Product | URL | Page status | Nav status | Notes |
|---|---|---|---|---|
| Professional Offices | `/professional-offices-insurance/` | Dedicated page | Business mega-menu | |
| Professional Liability / E&O | `/professional-liability-insurance/` | Dedicated page | Business mega-menu | |
| D&O | `/directors-officers-insurance/` | Dedicated page | Business mega-menu | |
| Cyber | `/cyber-insurance/` | Dedicated page | Business mega-menu | |
| Crime / Fidelity | `/crime-fidelity-insurance/` | Dedicated page | Business mega-menu | Explorer states include `employee-dishonesty` (coverage facet, not a product page) |
| Employment Practices Liability | `/employment-practices-liability-insurance/` | Dedicated page | Business mega-menu | |

### Real Estate

| Product | URL | Page status | Nav status | Notes |
|---|---|---|---|---|
| Real Estate | `/real-estate-insurance/` | Dedicated page | Business mega-menu | Coverage Explorer: `commercial-building` |
| Commercial Property | `/commercial-property-insurance/` | Dedicated page | Business mega-menu | Coverage Explorer: `commercial-building` |
| Property Management | `/property-management-insurance/` | Dedicated page | Business mega-menu | Coverage Explorer: `commercial-building` |
| Condo Corporation | `/condominium-corporation-insurance/` | Dedicated page | Business mega-menu | Label vs slug wording differs; Coverage Explorer: `commercial-building` |

### Healthcare & Wellness

| Product | URL | Page status | Nav status | Notes |
|---|---|---|---|---|
| Medical / Dental | `/medical-dental-insurance/` | Dedicated page | Business mega-menu | |
| Pharmacy | `/pharmacy-insurance/` | Dedicated page | Business mega-menu | |
| Fitness / Gym | `/fitness-gym-insurance/` | Dedicated page | Business mega-menu | |
| Salon / Barber | `/salon-barber-insurance/` | Dedicated page | Business mega-menu | |

### Specialty & Community

| Product | URL | Page status | Nav status | Notes |
|---|---|---|---|---|
| Non-Profit | `/non-profit-insurance/` | Dedicated page | Business mega-menu | |
| Religious Organizations | `/religious-organizations-insurance/` | Dedicated page | Business mega-menu | |
| Daycare / School | `/daycare-private-school-insurance/` | Dedicated page | Business mega-menu | |
| Event Liability | `/event-liability-insurance/` | Dedicated page | Business mega-menu | Also appears in **Personal** homepage discovery as “Events” / “Wedding / Event” (`pilot-home.ts`) |

---

## Agriculture

Child products are in **Business → Agriculture** mega-menu and duplicated in `nav-agriculture.ts` + footer. Hub is separate.

| Product | URL | Page status | Nav status | Notes |
|---|---|---|---|---|
| Farm Insurance | `/farm-insurance/` | Dedicated page | Business mega-menu; agri helper; footer | Coverage Explorer: `farm` |
| Crop Insurance | `/crop-insurance/` | Dedicated page | Business mega-menu; agri helper; footer | Coverage Explorer: `farm`; Agricorp referral framing in page metadata |
| Livestock / Animal Insurance | `/livestock-insurance/` | Dedicated page | Business mega-menu; agri helper; footer (“Livestock Insurance”) | Coverage Explorer: `farm`; near-duplicate label vs footer |
| Greenhouse & Nursery | `/greenhouse-agribusiness-insurance/` | Dedicated page | Business mega-menu; agri helper; footer | Coverage Explorer: `greenhouse` |
| Farm Equipment Coverage | `/farm-equipment-insurance/` | Dedicated page | Business mega-menu; agri helper; footer (“Farm Equipment”) | Coverage Explorer: `farm`; near-duplicate label vs footer |

---

## Life

| Product | URL | Page status | Nav status | Notes |
|---|---|---|---|---|
| Term Life Insurance | `/term-life-insurance/` | Dedicated page | Life mega-menu | `Service` JSON-LD via life pilot pages |
| Whole Life Insurance | `/whole-life-insurance/` | Dedicated page | Life mega-menu | |
| Universal Life Insurance | `/universal-life-insurance/` | Dedicated page | Life mega-menu | |
| Disability Insurance | `/disability-insurance/` | Dedicated page | Life mega-menu | |
| Group Benefits | `/group-benefits/` | Dedicated page | Life mega-menu | URL does not end in `-insurance` |

---

## Structured data (`Service` / `Offer`)

| Mechanism | What it covers | Match to nav? |
|---|---|---|
| `serviceStructuredData()` via `buildPilotProductConfig` / pilot product pages | Per-product `@type: Service` for personal, commercial, agri product pages, auto, trucking, and life product pages (including life hub rendered as `PilotPersonalPage`) | **Yes** — one Service per product slug that uses the pilot product pipeline |
| `webPageStructuredData()` | Personal hub, Agriculture hub (and other non-product pages) | Hubs are **WebPage**, not Service |
| `brokerageLocalBusiness()` on homepage | LocalBusiness only — **no** `hasOfferCatalog` / Offer list of products | Does **not** enumerate the nav product list |
| `Offer` schema | **Not found** in `src/lib/seo/` | N/A |

No sitewide Offer catalog was found. Service nodes are generated per product page rather than as a single nav-matching catalog.

---

## Unconfirmed

| Item | File | Why unconfirmed |
|---|---|---|
| `critical-illness-insurance` | `src/components/pilot/PilotPersonalFilmstrip.tsx` (`ALT_BY_SLUG`) | Alt-text map key only; **no** `page.tsx`, **no** nav link, **not** in `personalFilmstripItems` |
| Coverage Explorer state `employee-dishonesty` | `src/data/coverage-explorer/interaction-manifest/routes.ts` | Interactive coverage **facet** on Crime/Fidelity-related explorers, not a standalone product route |

---

## Issues

1. **Duplicate Agriculture listings** — Farm, Crop, Livestock, Greenhouse, Farm Equipment appear in both `nav-business.ts` (Business → Agriculture) and `nav-agriculture.ts` / footer. Same URLs; intentional dual surfaces after Agriculture was folded into Business.
2. **Agriculture hub orphaned from Business mega-menu** — `/agriculture/` has a dedicated page and footer link, but is **not** a Business mega-menu item (only the five child products are).
3. **Near-duplicate labels (same URL)** — e.g. “Commercial Auto / Fleet” (mega-menu) vs “Commercial Auto” (footer); “Livestock / Animal Insurance” vs “Livestock Insurance”; “Farm Equipment Coverage” vs “Farm Equipment”; “Surety Bonds” label vs `/bonding-insurance/` slug; “Condo Corporation” vs `/condominium-corporation-insurance/`.
4. **Cross-category surfacing** — Event Liability (Business Specialty) also appears in Personal homepage discovery lanes as “Events” / “Wedding / Event”. Life hub appears under Personal filmstrip and Footer Personal column while owned by Life mega-menu.
5. **Footer is a curated subset, not full nav** — Footer Personal omits Boat, Travel, Cottage, Mobile Home, Group Home & Auto, Home Sharing, etc.; Footer Business lists only four destinations. Not broken routes, but nav completeness differs by surface.
6. **No mega-menu link without a page** — All primary mega-menu product hrefs resolve to existing `page.tsx` routes (verified).
7. **No product page missing from primary mega-menu** — Except Agriculture hub (issue 2) and top-level hubs (expected). All 66 product pages appear in Personal, Business, or Life mega-menus.
8. **Structured-data shape mismatch vs nav** — Products emit per-page `Service`; hubs mostly `WebPage`; LocalBusiness does not mirror the mega-menu as an Offer catalog.
9. **Unconfirmed leftover** — `critical-illness-insurance` alt key with no product page or nav entry.

**Issue count (tracked items above): 9**  
(Issues 1–8 are confirmed code mismatches/duplications/orphans; issue 9 is unconfirmed leftover.)

---

## Totals (for quick reference)

| Metric | Count |
|---|---:|
| Unique product pages (excl. hubs) | **66** |
| Category hubs | **4** |
| Unique inventory routes | **70** |
| Primary mega-menu product links (Personal + Business products + Life products) | **66** |
| Issues listed | **9** |
