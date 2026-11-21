# Batch A Expansion — Phase 1 Architecture Blueprint

**Status:** READ-ONLY AUDIT COMPLETE — docs-only deliverable for owner review. No production code, quote engine, photography, or Batch A implementation in this PR.  
**Date basis:** repository state inspected against current `src/` (post product inventory).  
**Scope:** 10 owner-approved commercial landing pages.

---

## 1. Current route inventory count

| Metric | Count |
|---|---:|
| Unique product + hub inventory routes (`*-insurance/`, `/personal/`, `/commercial-insurance/`, `/life-insurance/`, `/agriculture/`, `/group-benefits/`) | **70** |
| Dedicated product pages (excl. 4 hubs) | **66** |
| Proposed Batch A routes that already exist | **0** |

All 10 proposed routes are **FREE** (no `src/app/<slug>/page.tsx` today).

---

## 2. Collision and overlap report

### 2.1 Direct URL collisions

| Proposed route | Status |
|---|---|
| `/roofing-contractors-insurance/` | Free |
| `/electrical-contractors-insurance/` | Free |
| `/plumbing-hvac-insurance/` | Free |
| `/excavation-contractors-insurance/` | Free |
| `/commercial-landlord-insurance/` | Free |
| `/apartment-building-insurance/` | Free |
| `/mixed-use-property-insurance/` | Free |
| `/tow-truck-insurance/` | Free |
| `/commercial-umbrella-insurance/` | Free |
| `/equipment-breakdown-insurance/` | Free |

### 2.2 Content / SEO cannibalization risks (existing pages)

| New page | Closest existing page(s) | Risk | Differentiation required |
|---|---|---|---|
| Roofing / Electrical / Plumbing & HVAC / Excavation | `/contractors-insurance/` | **High** if copy restates general CGL/tools | Trade-specific exposures, contracts, certificates; keep Contractors as **hub** overview |
| Roofing / Electrical / Plumbing & HVAC / Excavation | `/builders-developers-insurance/`, `/builders-risk-insurance/` | Medium | Builders = development/GC programs; BR = project property; trades = operating trade CGL/tools |
| Commercial Landlord / Apartment / Mixed-Use | `/landlord-insurance/` (Personal) | **High** if titles say only “Landlord” | Explicit **commercial** framing; cross-link both ways with buyer-type labels |
| Commercial Landlord / Apartment / Mixed-Use | `/real-estate-insurance/`, `/property-management-insurance/`, `/commercial-property-insurance/`, `/condominium-corporation-insurance/` | Medium–High | Ownership vs brokerage ops vs master condo corp vs residential rental dwelling |
| Tow Truck | `/commercial-auto-insurance/`, `/garage-dealership-insurance/`, `/dump-truck-insurance/` | Medium | Towing ops, storage lots, on-hook liability, roadside vs garage |
| Commercial Umbrella | `/personal-umbrella-insurance/` | **High** naming confusion | Personal vs commercial excess; different underlying policies |
| Equipment Breakdown | `/commercial-property-insurance/` (+ explorer state `equipment-breakdown`) | **High** — hub already redirects EB interest to property | New page must own EB; property page later should defer (owner decision — see §B) |

### 2.3 Existing in-page “Equipment Breakdown” without a product route

Confirmed stand-in today:

```167:172:src/data/commercial-industries.ts
  {
    label: "Equipment on Commercial Property",
    href: "/commercial-property-insurance/",
    description:
      "Equipment breakdown is reviewed on the Commercial Property page — there is no separate equipment-breakdown product route.",
    icon: Wrench,
  },
```

Also: Coverage Explorer coverage IDs named `equipment-breakdown` on several commercial visuals (property, manufacturing, restaurant spoilage, greenhouse, etc.) — these are **explorer facets**, not routes.

---

## 3. Final recommended names and URLs

Owner-proposed URLs are accepted with minor naming notes. **Do not rename existing routes.**

| # | Recommended display name | Recommended URL | Notes |
|---|---|---|---|
| 1 | Roofing Contractors Insurance | `/roofing-contractors-insurance/` | As proposed |
| 2 | Electrical Contractors Insurance | `/electrical-contractors-insurance/` | As proposed |
| 3 | Plumbing & HVAC Contractors Insurance | `/plumbing-hvac-insurance/` | Shorter slug OK; H1 should still say Plumbing & HVAC Contractors |
| 4 | Excavation, Concrete & Sewer/Watermain Insurance | `/excavation-contractors-insurance/` | Slug omits concrete/sewer; H1/title should include full trade set |
| 5 | Commercial Landlord Insurance | `/commercial-landlord-insurance/` | Distinct from personal `/landlord-insurance/` |
| 6 | Apartment Building Insurance | `/apartment-building-insurance/` | As proposed |
| 7 | Mixed-Use Property Insurance | `/mixed-use-property-insurance/` | As proposed |
| 8 | Tow Truck Operators Insurance | `/tow-truck-insurance/` | As proposed |
| 9 | Commercial Umbrella & Excess Liability Insurance | `/commercial-umbrella-insurance/` | Distinct from `/personal-umbrella-insurance/` |
| 10 | Equipment Breakdown Insurance | `/equipment-breakdown-insurance/` | Requires later hub/property link decisions (§B) |

---

## 4. Product-page architecture (reuse plan)

### 4.1 Current commercial pattern (verified)

| Layer | Location | Role |
|---|---|---|
| Route shell | `src/app/<slug>/page.tsx` | `createPilotCommercialPageExports(slug)` |
| Factory | `src/lib/createPilotCommercialPage.tsx` | Metadata + `<PilotCommercialPage />` |
| Registry | `src/data/pilot-commercial-registry.ts` | Resolves config from industry / product-pages / inline |
| Content | `src/data/commercial-industries.ts` **or** `src/data/product-pages/commercial-products-*.ts` **or** `pilot-commercial-inline.ts` | Page copy, FAQ, related links |
| Adapter | `src/lib/buildPilotProductConfig.ts` | Hero, explorer, FAQ, CTA, `serviceStructuredData` |
| UI | `src/components/pilot/product/PilotCommercialPage.tsx` (+ ProductHero, Coverage Explorer, FAQ, related) |
| Photos | `src/data/photography/placements.ts` + `public/images/photography/commercial/` | Per-slug hero |
| Explorer | `src/data/coverage-explorer/registry.ts` + families | Optional visual family by slug |
| Quote CTA | product `quoteHref` + `src/lib/quote/contextualQuoteHref.ts` allowlist | Prefill |
| Sitemap | `src/app/sitemap.ts` static list + `getAllProductPageSlugs()` | Inclusion |

### 4.2 Recommended implementation pattern for Batch A

Reuse **`createPilotCommercialPageExports` + PilotCommercialPage** for all 10 pages (same as existing commercial products).

**Content placement recommendation:**

| Cluster | Suggested content home | Why |
|---|---|---|
| Four contractor trades | New entries in `commercial-industries.ts` *or* a new `commercial-products-trades.ts` imported into `product-pages/index.ts` | Matches existing contractors/builders industry depth; keep Contractors page as hub |
| Commercial landlord / apartment / mixed-use | `commercial-products-industry.ts` (Real Estate cluster) | Aligns with real-estate / property-management patterns |
| Tow truck | `commercial-products-industry.ts` near garage/dump-truck/commercial-auto | Transportation ops |
| Commercial umbrella | `commercial-products-specialty.ts` | Specialty line, parallel to cyber/crime/EPL |
| Equipment breakdown | `commercial-products-core.ts` or specialty | Cross-cutting property endorsement/line; must not duplicate full property page |

**Coverage Explorer:**  
- Trades → reuse `construction` family (same as contractors/builders).  
- Landlord / apartment / mixed-use → reuse `commercial-building` (same as commercial property / real estate).  
- Tow truck → reuse `fleet-commercial-vehicle` or `garage-dealership` (owner preference; garage if lot/storage heavy).  
- Commercial umbrella → **no explorer required** initially (like many specialty pages).  
- Equipment breakdown → can share `commercial-building` or manufacturing family with EB-focused states; do **not** invent new photography masters in Phase 1.

**Do not** invent unsupported quote params. Prefer allowlisted `type` + existing `businessType` values (see §5).

---

## 5. Navigation placement matrix

Business mega-menu today: 10 industries in `nav-business.ts`. Avoid new top-level industries.

| Product | Recommended mega-menu placement | Label suggestion | Overcrowding note |
|---|---|---|---|
| Roofing Contractors | **Construction & Contractors** | Roofing Contractors | Add under Contractors; consider “Contractors (overview)” wording on existing Contractors link later |
| Electrical Contractors | **Construction & Contractors** | Electrical Contractors | Same |
| Plumbing & HVAC Contractors | **Construction & Contractors** | Plumbing & HVAC | Same |
| Excavation / Concrete / Sewer-Watermain | **Construction & Contractors** | Excavation & Concrete | Same; cluster grows from 6 → 10 links — acceptable if overview stays first |
| Commercial Landlord | **Real Estate** | Commercial Landlord | Beside Real Estate / Commercial Property / Property Management |
| Apartment Building | **Real Estate** | Apartment Buildings | Same |
| Mixed-Use Property | **Real Estate** | Mixed-Use Property | Same |
| Tow Truck Operators | **Transportation & Trucking** | Tow Truck Operators | Beside Commercial Auto / Garage / Dump Truck |
| Commercial Umbrella | **Professional Services** *or* **Specialty & Community** | Commercial Umbrella | Prefer Professional Services (with D&O/Cyber/Crime) — umbrella is often package with commercial liability programs; Specialty if owner wants “specialty lines” grouping |
| Equipment Breakdown | **Real Estate** *or* link only from Commercial Hub category (not mega-menu) | Equipment Breakdown | Mega-menu optional; hub category (§B) is higher priority than menu density |

**Mobile:** Cascading Business menu reads the same `businessNavCategories` — no separate mobile product list to redesign.

**Footer:** Curated subset today; Batch A need not flood footer. Optional later: add Commercial Landlord + Equipment Breakdown only if owner wants.

**Homepage commercial discovery:** Product lists are derived from `nav-business` — adding mega-menu links automatically surfaces them on homepage industry tabs (except Agriculture, which is excluded). Construction/Real Estate/Transportation tabs will grow accordingly.

---

## 6. Quote-funnel integration matrix

### Supported params today (verified)

- `type`: `vehicle` | `home` | `business` | `commercial-vehicles` | `farm`
- For `business`: `businessType` ∈ `contractor` | `restaurant` | `manufacturing` | `retail` | `professional` | `other`
- Also: `size`, `homeType`, `vehicleType`, `vehicleBodyType` where configured
- Header CTA uses **allowlist** in `contextualQuoteHref.ts` — unknown slugs fall back to `/get-a-quote/`

**Unsupported today:** trade-specific `businessType` values (`roofer`, `electrician`, etc.), `propertyType=commercial-landlord`, umbrella flags. **Do not invent them in Batch A without an engine change** (restricted for this phase).

| Product | Recommended quote URL | Category | Prefill | Engine change needed? |
|---|---|---|---|---|
| Roofing Contractors | `/get-a-quote?type=business&businessType=contractor` | business | contractor | No — reuse contractors pattern |
| Electrical Contractors | same | business | contractor | No |
| Plumbing & HVAC | same | business | contractor | No |
| Excavation Contractors | same | business | contractor | No |
| Commercial Landlord | `/get-a-quote?type=business` | business | none (or `businessType=other`) | No — **do not** use `type=home&homeType=landlord` |
| Apartment Building | `/get-a-quote?type=business` | business | none / other | No |
| Mixed-Use Property | `/get-a-quote?type=business` | business | none / other | No |
| Tow Truck Operators | `/get-a-quote?type=commercial-vehicles` | commercialAuto | fleet flow | No — matches dump/garage/trucking pattern |
| Commercial Umbrella | `/get-a-quote?type=business` | business | none / other | No |
| Equipment Breakdown | `/get-a-quote?type=business` | business | none / other | No |

**Required allowlist updates (implementation phase, not now):** add all 10 slugs to `PATH_QUOTE_ALLOWLIST` in `contextualQuoteHref.ts` so header CTA matches on-page CTA.

**Optional notes field:** Trade/landlord pages can encourage free-text in the existing optional “Anything specific on your mind?” step — no schema change.

**Preserve:** Neon `quote_leads`, Resend notify, Supabase CRM push, honeypot, rate limits — untouched.

---

## 7. SEO architecture (per route)

Canonical pattern: `https://www.premiumib.com/<slug>/` via existing `buildPageMetadata` / `absoluteUrl`.  
Structured data: `serviceStructuredData` (`Service` + breadcrumbs + FAQ) via pilot config — same as other commercial products.  
Sitemap: add to `staticRoutes` **and/or** ensure slug is in `getAllProductPageSlugs()` so `sitemap.ts` Set-union includes them.

| Route | Recommended title (≤~60–65 chars target) | H1 | Primary intent | Parents / related | Meta description focus |
|---|---|---|---|---|---|
| `/roofing-contractors-insurance/` | Roofing Contractors Insurance in Windsor-Essex \| Premium… | Roofing Contractors Insurance in Windsor-Essex | Commercial roofing trade insurance | Contractors hub; Builder's Risk; Pollution; Bonding | Fall/height/hot work, CGL, tools, certificates |
| `/electrical-contractors-insurance/` | Electrical Contractors Insurance in Windsor-Essex \| … | Electrical Contractors Insurance in Windsor-Essex | Electrical trade | Contractors; Professional Liability if design; Bonding | Live work, completed ops, tools, COIs |
| `/plumbing-hvac-insurance/` | Plumbing & HVAC Contractors Insurance in Windsor-Essex \| … | Plumbing & HVAC Contractors Insurance | Plumbing/HVAC trade | Contractors; Pollution (limited); Bonding | Water damage, refrigerant, completed ops |
| `/excavation-contractors-insurance/` | Excavation & Concrete Contractors Insurance in Windsor-Essex \| … | Excavation, Concrete & Sewer/Watermain Insurance | Earthwork/underground | Contractors; Dump Truck; Pollution; Bonding | Cave-in, underground utilities, heavy equip |
| `/commercial-landlord-insurance/` | Commercial Landlord Insurance in Windsor-Essex \| … | Commercial Landlord Insurance | Commercial rental ownership | Real Estate; Commercial Property; **Personal Landlord (contrast)** | Buildings leased to businesses; not residential dwelling landlords |
| `/apartment-building-insurance/` | Apartment Building Insurance in Windsor-Essex \| … | Apartment Building Insurance | Multi-residential commercial property | Commercial Landlord; Property Management; Condo Corp (contrast) | Multi-unit residential as commercial property program |
| `/mixed-use-property-insurance/` | Mixed-Use Property Insurance in Windsor-Essex \| … | Mixed-Use Property Insurance | Mixed occupancy buildings | Commercial Property; Commercial Landlord; Restaurant/Retail tenants | Retail+residential stacks; occupancy disclosure |
| `/tow-truck-insurance/` | Tow Truck Operators Insurance in Windsor-Essex \| … | Tow Truck Operators Insurance | Towing fleet / on-hook | Commercial Auto; Garage; Dump Truck | On-hook, storage lots, roadside liability |
| `/commercial-umbrella-insurance/` | Commercial Umbrella & Excess Liability in Windsor-Essex \| … | Commercial Umbrella & Excess Liability Insurance | Commercial excess liability | Small Business; Contractors; **Personal Umbrella (contrast)** | Excess over CGL/auto; not personal umbrella |
| `/equipment-breakdown-insurance/` | Equipment Breakdown Insurance in Windsor-Essex \| … | Equipment Breakdown Insurance | Boiler/machinery breakdown | Commercial Property; Manufacturing; BI | Mechanical/electrical breakdown ≠ named perils fire |

**Avoid:** titles that are only “Landlord Insurance” or “Umbrella Insurance” without Commercial/Personal qualifier.

---

## 8. Content differentiation outline (implementation guidance)

For each page, content should include (hedged — no coverage guarantees):

1. **Who it’s for** (buyer type) and **who it is not for** (link to sibling pages).  
2. **Operational exposures** unique to the trade/property/fleet.  
3. **Coverage types commonly reviewed** (CGL, property, inland marine, auto, umbrella, EB, etc.) with “where purchased / subject to wording”.  
4. **Underwriting / certificate** considerations.  
5. **Risk-management** practices that affect insurability (not legal advice).  
6. **FAQ** (4–6) answering comparison questions to hub pages.  
7. **Related products** linking hubs/siblings — not dumping identical cards.

### A. Personal Landlord vs Commercial Landlord / Apartment / Mixed-Use

**Existing `/landlord-insurance/` (verified):** Personal product via `PilotPersonalPage`; quote `type=home&homeType=landlord`; framed for **residential rental dwellings** (houses, duplexes, condo units). In Personal mega-menu, filmstrip, footer Personal, related links from cottage/condo/umbrella.

**Confusion vectors to neutralize in Batch A (and later small link-label tweaks):**

| Location | Current behaviour | Recommendation (Phase 2+; not now) |
|---|---|---|
| Personal nav “Landlord Insurance” | Residential only | Keep; optionally subtitle “Residential rentals” |
| Real Estate related link on `/real-estate-insurance/` → `/landlord-insurance/` | Points commercial real-estate visitors to **personal** landlord | Repoint to `/commercial-landlord-insurance/` once live; keep personal landlord linked as “Residential Landlord” |
| Metadata/H1 | “Landlord Insurance in Windsor-Essex” | Leave personal page as-is this phase; new pages must say **Commercial** |

**New pages must state explicitly:** commercial building ownership / multi-unit commercial programs vs personal rented dwelling.

### B. Links that stand in for Equipment Breakdown → `/commercial-property-insurance/`

Owner decision list (do **not** change in Phase 1):

| # | File | What | Current href |
|---|---|---|---|
| 1 | `src/data/commercial-industries.ts` → `commercialHubCategories` | Label **“Equipment on Commercial Property”**; description says there is **no separate EB route** | `/commercial-property-insurance/` |
| 2 | Coverage Explorer states `equipment-breakdown` on commercial-property / manufacturing / restaurant / greenhouse (etc.) | In-page explorer facet, not a link | N/A (same page) |
| 3 | Multiple product copy blocks referencing EB as endorsement on property/restaurant/cannabis/condo corp pages | Narrative only | Usually no dedicated EB href |

**Primary owner decision:** After `/equipment-breakdown-insurance/` ships, update hub category #1 label/description/href to the new route (and soft-update Commercial Property related links to include EB).

### C. Contractors hub-and-spoke

**Existing `/contractors-insurance/`** already describes trade diversity (electricians, plumbers/HVAC, roofers, excavation) inside hub copy, with related links to Commercial Hub, Surety Bonds, Builder's Risk, Small Business — **not** to trade children (none exist yet).

**Recommended structure:**

```
/contractors-insurance/          ← hub (overview, certificates, tools, wrap-up)
  ├─ /roofing-contractors-insurance/
  ├─ /electrical-contractors-insurance/
  ├─ /plumbing-hvac-insurance/
  └─ /excavation-contractors-insurance/

/builders-developers-insurance/  ← sibling (developer/GC programs), link to hub + BR
/builders-risk-insurance/        ← project property overlay, link to hub + trades when contract requires
/bonding-insurance/              ← surety, keep related from hub
```

**Implementation-phase link updates (not Phase 1):**  
- Add four children to Contractors `relatedLinks` / on-page “Trades we help” list.  
- Each trade page related: Contractors hub, Bonding, Builder's Risk, Dump Truck (excavation), Pollution (where relevant).  
- Builders & Developers related: keep Contractors hub; optionally “Trade contractor pages” once live.  
- **Do not** duplicate hub CGL/tools copy verbatim on each trade page.

---

## 9. Photography

| Product | Existing dedicated asset? | Reasonable temporary reuse | New photography needed? |
|---|---|---|---|
| Roofing | No | `contractors-insurance.webp` (framing — weak for roofing) | **Yes** — roofing work preferred |
| Electrical | No | `contractors-insurance.webp` | **Yes** |
| Plumbing & HVAC | No | `contractors-insurance.webp` | **Yes** |
| Excavation | No | `dump-truck-insurance.webp` / `builders-developers-insurance.webp` | **Yes** |
| Commercial Landlord | No | `commercial-property-insurance.webp` / `real-estate-insurance.webp` | Preferred yes |
| Apartment Building | No | `property-management-insurance.webp` / `condo-property-management.webp` | Preferred yes |
| Mixed-Use | No | `retail-insurance.webp` + property exteriors | Preferred yes |
| Tow Truck | No | `garage-dealership-insurance.webp` / `commercial-auto-insurance.webp` | **Yes** |
| Commercial Umbrella | No | Abstract/office (`professional-offices` / executive) | Optional |
| Equipment Breakdown | No | `commercial-property-insurance.webp` / `manufacturing-insurance.webp` | Preferred yes (mechanical room / boiler) |

**Do not** overwrite existing photography files. Register new placements in `placements.ts` when assets exist.

---

## 10. Source files requiring modification (implementation phase only)

| File / area | Change |
|---|---|
| `src/app/<10-slugs>/page.tsx` | New route shells via `createPilotCommercialPageExports` |
| Content module(s) under `src/data/product-pages/` and/or `commercial-industries.ts` | New page content objects |
| `src/data/product-pages/index.ts` | Export new pages if using product-pages arrays |
| `src/data/pilot-commercial-registry.ts` | Register slugs if needed |
| `src/data/nav-business.ts` | Mega-menu links |
| `src/lib/quote/contextualQuoteHref.ts` | Allowlist quote hrefs |
| `src/lib/buildPilotProductConfig.ts` | Related-link map entries for new slugs + Contractors children |
| `src/data/photography/placements.ts` + `public/images/photography/commercial/*` | Heroes when ready |
| `src/data/coverage-explorer/registry.ts` (+ optional family mapping) | Explorer families |
| `src/app/sitemap.ts` | Ensure routes included |
| Later (owner-gated): `commercialHubCategories` EB entry; personal/commercial landlord cross-links; Contractors hub related list | Post-launch linking |

**Out of scope / do not touch in Batch A unless owner expands scope:** quote engine step definitions, Neon/CRM/notify, personal landlord copy rewrite, DNS, analytics IDs.

---

## 11. Recommended implementation sequence

1. **Content + routes** for 4 contractor trades (hub-and-spoke with Contractors).  
2. **Real estate trio** (Commercial Landlord, Apartment, Mixed-Use) with explicit contrast to personal Landlord.  
3. **Tow Truck** (transportation cluster).  
4. **Commercial Umbrella** (specialty; contrast personal umbrella).  
5. **Equipment Breakdown** last — coordinate hub category repoint decision (§B) in same PR or immediate follow-up.  
6. Nav + quote allowlist + sitemap + related links.  
7. Photography as assets arrive (temporary reuse OK).  
8. Preview QA: desktop/mobile mega-menu, quote prefills, canonical/Service JSON-LD, no personal/commercial landlord mix-ups.

---

## 12. Technical risks and unresolved owner decisions

| ID | Item | Recommendation |
|---|---|---|
| R1 | Construction mega-menu grows to ~10 links | Keep Contractors first as overview; proceed |
| R2 | EB hub text currently denies separate route | Owner approve repoint of `commercialHubCategories` entry after EB page ships |
| R3 | Real Estate → personal Landlord related link | Repoint to Commercial Landlord when live |
| R4 | Trade-specific quote `businessType` values | **Defer**; use `contractor` + notes |
| R5 | `/plumbing-hvac-insurance/` slug vs longer name | Keep proposed slug; rich H1 |
| R6 | Commercial Umbrella nav bucket | Confirm Professional Services vs Specialty |
| R7 | Tow explorer family | Confirm fleet vs garage visual |
| R8 | Photography gaps | Commission Batch A photo set before/alongside launch |
| R9 | Cannibalization with Contractors hub | Hub must gain “Explore by trade” links; trade pages must not clone hub |
| R10 | Personal vs Commercial umbrella SERP | Distinct titles/H1s mandatory |

---

## Deliverables checklist

1. **Route inventory count:** 70 current product/hub routes; **0** Batch A collisions.  
2. **Collision/overlap report:** §2.  
3. **Final names/URLs:** §3 (proposed URLs accepted).  
4. **Navigation matrix:** §5.  
5. **Quote matrix:** §6.  
6. **Files to modify:** §10.  
7. **Sequence:** §11.  
8. **Risks/decisions:** §12.  
9. **Extras A/B/C:** §8 A–C.

**STOP — awaiting owner review before any Batch A implementation.**
