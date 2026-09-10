# Master Product Navigation Reconciliation

**Phase:** 2 — Approved implementation  
**Date:** 2026-09-10  
**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Worktree:** `/tmp/PREMIUM_WEBSITE-d3-transportation`  
**Audit base:** `d3f1873` / `docs/master-product-inventory-navigation-audit-2026-09-10.md`  
**Frozen product baseline:** all 60 product routes  

**Status:** DISCOVERY / NAVIGATION ONLY. Frozen product body copy, Explorer copy, Cannabis content, and Cannabis images were not rewritten.

---

## A. Implementation base

| Item | Value |
|------|-------|
| Audit commit | `d3f1873` |
| Product inventory | 60 routes |
| Content at start | A44 / B16 / C0 / D0 |
| Zero-discovery before | 2 (`/cannabis-retail-insurance/`, `/cannabis-producer-insurance/`) |
| Architecture refactor | Not done (post-launch) |

---

## B. Owner decisions (implemented)

| ID | Decision | Implemented |
|----|----------|-------------|
| A | Keep Hospitality & Retail combined in mega-menu | Yes |
| B | Grocery: Retail primary, Hospitality secondary | Yes — homepage Retail + mega combined cluster |
| C | Pharmacy: Health primary, Retail secondary | Yes — homepage Health; Retail related already |
| D | Cannabis Retail: Retail primary, Specialty secondary | Yes |
| E | Cannabis Producer: Manufacturing primary, Specialty secondary; Greenhouse related only | Yes — not in Agriculture mega |
| F | Garage / Dealership = Transportation | Yes — removed from homepage Retail |
| G | Daycare = Community | Yes |
| H | Homepage curated (~3–4, 5th allowed) | Yes |
| I | Mega may expose more than homepage | Yes |
| J | Commercial Hub stays curated | Yes |
| K | Overlap allowed | Yes (Surety, Cannabis, Liquor) |
| L | Standardize high-drift labels now | Yes |
| M | Related: Cannabis inbound + misleading label only | Yes |
| N | Centralized taxonomy post-launch | Not implemented |
| O | Approved taxonomy | Implemented with these clarifications |

---

## C. Files changed

### Navigation / discovery data

- `src/data/nav-business.ts`
- `src/data/nav-personal.ts`
- `src/data/pilot-home.ts`
- `src/data/commercial-industries.ts` — hub tile/category labels only
- `src/data/commercial-clusters.ts` — unused spotlight labels kept in sync
- `src/data/pilot-commercial-inline.ts` — hub + greenhouse related arrays only
- `src/lib/buildPilotProductConfig.ts` — inbound related map only
- `src/data/product-pages/commercial-products-industry.ts` — Product Recall related label only
- `src/components/Footer.tsx`
- `src/components/nav/NavDropdowns.tsx` — mobile row padding `py-1.5` → `py-2.5`

### QA / docs

- `scripts/verify-navigation-discovery.cjs`
- `scripts/verify-navigation-responsive.cjs`
- `scripts/verify-cannabis-products.cjs` — now requires Cannabis in business nav
- `docs/master-product-navigation-reconciliation-2026-09-10.md`
- `docs/qa-screenshots/navigation-reconciliation-2026-09-10/`

### Not changed

- All 60 product page body/hero/FAQ/consideration/Explorer copy
- Cannabis images and frozen Cannabis page copy
- Explorer runtime
- Route slugs
- Homepage carousel / autoplay / drag / reduced-motion components

---

## D. Canonical labels

| Canonical visitor label | Short nav / card label | Surfaces using short label |
|-------------------------|------------------------|----------------------------|
| Food Truck & Trailer Insurance | Food Truck / Trailer | Mega, homepage, hub tile |
| Hotel & Motel Insurance | Hotel / Motel | Mega, homepage |
| Grocery, Specialty Food & Bakery Insurance | Grocery / Specialty Food & Bakery (mega); Grocery / Bakery (homepage card) | Mega vs homepage |
| Surety Bonds | Surety Bonds | All discovery (replaced Bonding) |
| Commercial Auto & Fleet Insurance | Commercial Auto (homepage); Commercial Auto / Fleet (mega, hub tile) | Compact UI |
| Dump Truck Insurance | Dump Truck | Mega, homepage, hub tile |
| Convenience Store & Gas Station Insurance | Convenience / Gas | Mega, homepage |
| Garage & Dealership Insurance | Garage / Dealership | Mega, homepage Transportation |
| Condominium Corporation Insurance | Condo Corporation | Mega, homepage |
| Fitness & Gym Insurance | Fitness / Gym | Mega, homepage |
| Employment Practices Liability (EPL) | Employment Practices Liability | Mega (unchanged long form) |
| Home & Ride Sharing Insurance | Home & Ride Sharing | Personal mega Specialty |
| Personal Umbrella Insurance | Personal Umbrella | Breadth slot (was Personal Valuables) |
| Cannabis Retail Insurance | Cannabis Retail | All new discovery |
| Cannabis Producer Insurance | Cannabis Producer | All new discovery |
| Salon & Barber Insurance | Salon / Barber | Homepage Health |
| Daycare & Private School Insurance | Daycare / School | Homepage Community |
| Warehousing & Logistics Insurance | Warehousing (homepage/mega); Warehouse (Yep teaser) | Yep remains compact |

Slugs were not renamed.

---

## E. Homepage changes

All 10 tabs kept. `PilotCommercialDiscovery` behavior (tabs, motion, reduced motion, product `Link`s) was not redesigned.

| Tab | After |
|-----|-------|
| Transportation | Trucking, Commercial Auto, Dump Truck, Cargo / Freight, **Garage / Dealership** (5th — material) |
| Construction | Contractors, Builders & Developers, Builder's Risk, **Surety Bonds** |
| Property | Commercial Property, Property Management, Condo Corporation, **Warehousing** |
| Manufacturing | Manufacturing, **Cannabis Producer**, Product Recall, Pollution Liability |
| Hospitality | Restaurants, Food Truck / Trailer, Hotel / Motel, Liquor Liability |
| Professional | Professional Offices, **Real Estate**, Professional Liability, Directors & Officers |
| Retail | Retail, Convenience / Gas, Grocery / Bakery, **Cannabis Retail**. Garage removed |
| Health & Wellness | Medical & Dental, Pharmacy, Fitness / Gym, **Salon / Barber** |
| Community | Non-Profit, Religious Organizations, Daycare / School |
| Specialty Risks | Cyber, Crime & Fidelity, Surety Bonds, **Cannabis Retail**, **Cannabis Producer** |

Breadth miniature label **Personal Valuables** → **Personal Umbrella** (same href). Yep/breadth Bonding → Surety Bonds; Dump Trucks → Dump Truck.

---

## F. Mega-menu changes

7 business clusters kept. Hospitality & Retail remains combined.

- **Manufacturing & Industry:** added Cannabis Producer
- **Hospitality & Retail:** added Cannabis Retail; grocery label standardized; hospitality items grouped before retail items
- **Construction & Property:** received Landscaping & Snow Removal; Builder's Risk apostrophe; Condo Corporation short label
- **Professional & Real Estate:** Landscaping removed
- No Cannabis-only cluster
- Agriculture mega unchanged (Farm + Greenhouse only)

---

## G. Mobile changes

Mobile still reads the same `personalNavGroups` / `businessNavClusters` / `agricultureNavLinks` data.

- Both Cannabis routes appear after opening Business
- No duplicate entries in a cluster
- Product row padding increased to `py-2.5`
- Verified at 390 and 768: hamburger, Business accordion, Cannabis hrefs, tap height ≥ 36px
- 1024 / 1440 use desktop mega-menu

---

## H. Commercial Hub changes

Hub remains orientation + curated navigation.

- Specialty related rail: added Cannabis Retail and Cannabis Producer (8 cards)
- Industry tiles stay 12; labels aligned (Commercial Auto / Fleet, Food Truck / Trailer, Dump Truck)
- **General Liability** tile relabeled **Small Business** (destination unchanged: `/small-business-insurance/`)
- **Equipment Breakdown** tile relabeled **Equipment on Commercial Property** (destination unchanged: `/commercial-property-insurance/`). No fake route created
- No new hub coverage category for Cannabis
- Unused `CommercialSpotlight` labels updated only so they still match tiles

---

## I. Footer changes

- Removed **Business Insurance** from the Personal column
- Business column already contains Commercial Insurance
- No footer redesign

---

## J. Related-product changes

Scope kept narrow.

| Change | From | To |
|--------|------|----|
| Inbound | Retail related map | Cannabis Retail |
| Inbound | Manufacturing related map | Cannabis Producer |
| Inbound | Greenhouse related array | Cannabis Producer |
| Label | Product Recall → “Product Liability (Retail)” | **Retail Insurance** → `/retail-insurance/` |

Cannabis page outbound related lists were not rewritten. No full graph rewrite.

---

## K. Cannabis discovery

### Cannabis Retail

- Mega / mobile: Hospitality & Retail
- Homepage: Retail (primary) + Specialty Risks (secondary)
- Hub: specialty related rail
- Inbound related: Retail

### Cannabis Producer

- Mega / mobile: Manufacturing & Industry
- Homepage: Manufacturing (primary) + Specialty Risks (secondary)
- Hub: specialty related rail
- Inbound related: Manufacturing + Greenhouse
- **Not** in Agriculture mega

**ZERO-DISCOVERY AFTER: 0**

---

## L. Wrong-destination corrections

| Before | After |
|--------|-------|
| Hub “General Liability” → Small Business | Label **Small Business** |
| Hub “Equipment Breakdown” → Commercial Property | Label **Equipment on Commercial Property** |
| Homepage “Personal Valuables” → Personal Umbrella | Label **Personal Umbrella** |
| Footer Personal “Business Insurance” | Removed from Personal |
| Product Recall “Product Liability (Retail)” | **Retail Insurance** |
| Homepage Retail Garage | Moved to Transportation |

---

## M. Discovery matrix

Every route does not appear on every surface. **DISCOVERABLE NO = 0.**

| Route | Mega | Mobile | Homepage | Hub | Related inbound | Footer/other | Discoverable |
|-------|:----:|:------:|:--------:|:---:|:---------------:|:------------:|:------------:|
| /auto-insurance/ | Y | Y | — | — | — | Y | YES |
| /boat-insurance/ | Y | Y | — | — | — | Y | YES |
| /bonding-insurance/ | Y | Y | Y | — | — | Y | YES |
| /builders-developers-insurance/ | Y | Y | Y | Y | — | — | YES |
| /builders-risk-insurance/ | Y | Y | Y | — | — | — | YES |
| /business-interruption-insurance/ | Y | Y | — | Y | — | — | YES |
| /cannabis-producer-insurance/ | Y | Y | Y | Y | Y | — | YES |
| /cannabis-retail-insurance/ | Y | Y | Y | Y | Y | — | YES |
| /cargo-freight-insurance/ | Y | Y | Y | — | — | — | YES |
| /commercial-auto-insurance/ | Y | Y | Y | Y | — | Y | YES |
| /commercial-insurance/ | Y | Y | — | Y | — | Y | YES |
| /commercial-property-insurance/ | Y | Y | Y | Y | — | — | YES |
| /condo-insurance/ | Y | Y | — | — | — | Y | YES |
| /condominium-corporation-insurance/ | Y | Y | Y | — | — | — | YES |
| /contractors-insurance/ | Y | Y | Y | Y | — | Y | YES |
| /convenience-store-insurance/ | Y | Y | Y | — | — | — | YES |
| /cottage-insurance/ | Y | Y | — | — | — | Y | YES |
| /crime-fidelity-insurance/ | Y | Y | Y | Y | — | — | YES |
| /cyber-insurance/ | Y | Y | Y | Y | — | — | YES |
| /daycare-private-school-insurance/ | Y | Y | Y | — | — | — | YES |
| /directors-officers-insurance/ | Y | Y | Y | Y | — | — | YES |
| /dump-truck-insurance/ | Y | Y | Y | Y | — | — | YES |
| /employment-practices-liability-insurance/ | Y | Y | — | — | — | — | YES |
| /event-liability-insurance/ | Y | Y | — | — | — | Y | YES |
| /farm-insurance/ | Y | Y | — | — | — | Y | YES |
| /fitness-gym-insurance/ | Y | Y | Y | — | — | — | YES |
| /food-truck-insurance/ | Y | Y | Y | Y | — | — | YES |
| /garage-dealership-insurance/ | Y | Y | Y | — | — | — | YES |
| /greenhouse-agribusiness-insurance/ | Y | Y | — | — | — | Y | YES |
| /grocery-specialty-food-insurance/ | Y | Y | Y | — | — | — | YES |
| /group-home-auto-insurance/ | Y | Y | — | — | — | — | YES |
| /home-insurance/ | Y | Y | — | — | — | Y | YES |
| /home-sharing-insurance/ | Y | Y | — | — | — | — | YES |
| /hotel-motel-insurance/ | Y | Y | Y | — | — | — | YES |
| /landlord-insurance/ | Y | Y | — | — | — | — | YES |
| /landscaping-snow-removal-insurance/ | Y | Y | — | — | — | — | YES |
| /life-insurance/ | Y | Y | — | — | — | — | YES |
| /liquor-liability-insurance/ | Y | Y | Y | — | — | — | YES |
| /manufacturing-insurance/ | Y | Y | Y | Y | — | Y | YES |
| /medical-dental-insurance/ | Y | Y | Y | — | — | — | YES |
| /mobile-home-insurance/ | Y | Y | — | — | — | — | YES |
| /motorcycle-insurance/ | Y | Y | — | — | — | Y | YES |
| /non-profit-insurance/ | Y | Y | Y | — | — | — | YES |
| /personal-umbrella-insurance/ | Y | Y | — | — | — | Y | YES |
| /pharmacy-insurance/ | Y | Y | Y | — | — | — | YES |
| /pollution-liability-insurance/ | Y | Y | Y | Y | — | — | YES |
| /product-recall-insurance/ | Y | Y | Y | Y | — | — | YES |
| /professional-liability-insurance/ | Y | Y | Y | Y | — | — | YES |
| /professional-offices-insurance/ | Y | Y | Y | Y | — | — | YES |
| /property-management-insurance/ | Y | Y | Y | — | — | — | YES |
| /real-estate-insurance/ | Y | Y | Y | Y | — | — | YES |
| /religious-organizations-insurance/ | Y | Y | Y | — | — | — | YES |
| /restaurant-insurance/ | Y | Y | Y | Y | — | Y | YES |
| /retail-insurance/ | Y | Y | Y | Y | — | Y | YES |
| /salon-barber-insurance/ | Y | Y | Y | — | — | — | YES |
| /small-business-insurance/ | Y | Y | — | Y | — | — | YES |
| /tenant-insurance/ | Y | Y | — | — | — | Y | YES |
| /travel-insurance/ | Y | Y | — | — | — | Y | YES |
| /trucking-insurance/ | Y | Y | Y | Y | — | Y | YES |
| /warehousing-insurance/ | Y | Y | Y | — | — | Y | YES |

Machine-readable copy: `docs/qa-screenshots/navigation-reconciliation-2026-09-10/discovery-matrix.json`.

---

## N. Zero-discovery result

**ZERO-DISCOVERY BEFORE:** 2  
**ZERO-DISCOVERY AFTER:** 0

---

## O. Responsive QA

`scripts/verify-navigation-responsive.cjs` at 390 / 768 / 1024 / 1440 against `http://127.0.0.1:3019`.

| Viewport | Result |
|----------|--------|
| 390 | PASS |
| 768 | PASS |
| 1024 | PASS |
| 1440 | PASS |

Checked:

- Homepage 10 tabs; Retail / Manufacturing / Specialty contain Cannabis; Garage absent from Retail
- No homepage horizontal overflow
- Mobile Business accordion exposes both Cannabis routes
- Desktop mega-menu exposes both Cannabis routes
- Hub shows both Cannabis labels; old General Liability / standalone Equipment Breakdown titles gone
- Footer no longer lists Business Insurance under Personal

Homepage industry explorer still uses ordinary product `Link`s (no card-click / drag-guard regression). Carousel components were not edited except two Yep/breadth labels.

---

## P. Regression

| Check | Result |
|-------|--------|
| `npx tsc --noEmit` | PASS |
| `npm run build` | PASS — 60 `*-insurance` routes present |
| Product content audit | **A44 / B16 / C0 / D0** (60 routes) |
| HTTP 200 on 60 product routes | 60 / 60 |
| Navigation verifier | PASS, zero-discovery 0 |
| Responsive navigation QA | 4 / 4 viewports |
| Cannabis verifier | PASS (page copy, Explorer images, forbidden phrases) |
| Explorer inventory | 59 explorer routes × 4 viewports = **236** explorer checks; hub remains non-explorer (4 no-explorer). Runtime / assets unchanged |

---

## Q. Frozen baseline

| Check | Result |
|-------|--------|
| Frozen 60 product pages body copy | UNCHANGED |
| Cannabis content | UNCHANGED |
| Cannabis images | UNCHANGED |
| Explorer runtime | UNCHANGED |
| Route slugs | UNCHANGED |

Allowed related-rail / hub-tile / nav-label edits only.

---

## R. Remaining post-launch taxonomy architecture

Do not refactor now. After launch, add a single canonical product metadata module for:

- route, visitor title, short nav label
- personal / commercial
- primary + secondary categories
- homepage / mega / mobile / hub inclusion
- related product slugs
- sitemap

Until then, any new product must be added to the route registry, sitemap, mega/mobile cluster, optional homepage tab, optional hub rail, and related maps in the same change.

---

## Safety

PRODUCTION FILES on main: not modified.  
This work stays on the feature branch.

**DO NOT MERGE. DO NOT DEPLOY. DO NOT PROMOTE ANY VERCEL PREVIEW. DO NOT PUSH TO MAIN. DO NOT MODIFY PRODUCTION ALIASES.**

STOP FOR OWNER REVIEW.
