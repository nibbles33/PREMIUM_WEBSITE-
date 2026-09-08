# D2 Hospitality Batch — Hotel/Motel · Event Liability · Convenience Store

**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Date:** 2026-09-08  
**Prior baseline:** A 5 / B 16 / C 18 / D 19 (post Food Truck `d0e23d4`)  
**Status:** Batch complete — **STOP FOR OWNER REVIEW**

---

## Stop gates

- **NO MERGE · NO DEPLOY · NO VERCEL PROMOTION**
- Committed to feature branch only
- Restaurant, Liquor Liability, Food Truck, Daycare, Greenhouse content **unchanged**

---

## 1. Executive summary

Three controlled D2 remediations completed in one batch. Each route was researched independently, internally critiqued for coverage/regulatory boundaries, implemented with V2 Explorer detail pairs, route-specific considerations (expandable), and 5 FAQs. All three moved **D → A**, eliminating one HIGH content-safety flag each.

| Route | Before class | After class | Words before → after | HIGH eliminated |
|-------|-------------|-------------|----------------------|-----------------|
| `/hotel-motel-insurance/` | D | **A** | 263 → **1,181** | 1 (Commercial Property "Covers…") |
| `/event-liability-insurance/` | D | **A** | 266 → **1,094** | 1 (Third-Party BI "Covers…") |
| `/convenience-store-insurance/` | D | **A** | 214 → **1,141** | 1 (Commercial Property "Covers…tobacco and lottery") |

**Site-wide delta:** A **5 → 8** (+3) · D **19 → 16** (−3) · B/C unchanged.

---

## 2. Files changed

| File | Change |
|------|--------|
| `src/data/product-pages/commercial-products-specialty.ts` | Hotel/Motel, Event Liability, Convenience Store — hero, V2 Explorer, considerations, FAQs, trust (`whoItIsFor`) |
| `src/lib/buildPilotProductConfig.ts` | Expandable considerations for three batch slugs |
| `scripts/verify-d2-hospitality-batch.cjs` | Batch verification script (new) |
| `docs/qa-screenshots/d2-hospitality-batch-2026-09-08/` | Per-route screenshots + verification JSON |
| `docs/qa-screenshots/product-content-audit-2026-09-07/audit-data.json` | Regenerated audit baseline |
| `docs/product-content-audit-2026-09-07.md` | Regenerated audit report |

**Not touched:** Explorer manifest, zone mappings, images, audit scanner, approved reference routes.

---

## 3. Per-route before/after audit

### Hotel / Motel

| Metric | Before | After |
|--------|--------|-------|
| Substantive words | 263 | **1,181** |
| Hero words | 19 (generic) | 108 (specific) |
| Explorer states | 4 (no V2) | 4 (V2 + shortLabels) |
| Considerations | 0 | **6** (341w, expandable) |
| FAQs | 4 | **5** |
| HIGH / MED / LOW | 1 / 0 / 0 | **0 / 0 / 0** |
| Classification | D | **A** |

### Event Liability

| Metric | Before | After |
|--------|--------|-------|
| Substantive words | 266 | **1,094** |
| Hero words | 18 (generic) | 120 (specific) |
| Explorer states | 4 (no V2) | 4 (V2 + shortLabels) |
| Considerations | 0 | **6** (329w, expandable) |
| FAQs | 4 | **5** |
| HIGH / MED / LOW | 1 / 0 / 0 | **0 / 0 / 0** |
| Classification | D | **A** |

### Convenience Store

| Metric | Before | After |
|--------|--------|-------|
| Substantive words | 214 | **1,141** |
| Hero words | 16 (generic) | 108 (specific) |
| Explorer states | 4 (no V2) | 4 (V2 + shortLabels) |
| Considerations | 0 | **7** (371w, expandable) |
| FAQs | 4 | **5** |
| HIGH / MED / LOW | 1 / 0 / 0 | **0 / 0 / 0** |
| Classification | D | **A** |

---

## 4. Per-route research / source summary

### Hotel / Motel
- **Innkeepers Act (R.S.O. 1990, c. I.7):** Statutory limit on operator liability for guest goods — [REGULATORY], not guest-property insurance
- **Guest belongings:** Typically excluded from operator property policy — [COVERAGE] exclusion pattern
- **AGCO Liquor Sales Licence:** Conditional liquor liability for on-site bar/restaurant — licence ≠ insurance mandate (Liquor V2 verified framing)
- **Pool/spa, parking, conference rentals:** [EXPOSURE] + [UNDERWRITING]
- **Business interruption:** Covered direct physical loss trigger — [COVERAGE], policy-dependent

### Event Liability
- **Temporary host liability:** Distinct from ongoing CGL — [COVERAGE]
- **Venue policy vs. host policy:** Venue protects owner, not necessarily organizer — [EXPOSURE]
- **AGCO Special Occasion Permit:** LCBO SOP FAQ — provincial regulations do not require party liability insurance; venues may require contractually — [REGULATORY] vs [UNDERWRITING]
- **SOP ≠ insurance:** Permit authorizes service; not a coverage product
- **Municipal permit specs:** Contractual/permit context — not universal Ontario statutory mandate
- **Cancellation/own equipment:** Explicitly excluded from event liability scope — [COVERAGE] boundary

### Convenience Store
- **Crime/hold-up, refrigeration, 24-hour exposure:** [EXPOSURE] + optional [COVERAGE]
- **AGCO Convenience Store Licence:** Retail alcohol subset only (Sept 2024 expanded market) — distinct from bar/restaurant liquor framework
- **OLG lottery + AGCO Seller registration:** [REGULATORY] — not lottery insurance
- **Tobacco/vape retail:** [REGULATORY] compliance — not a coverage product
- **UST/pollution:** Optional pollution coverage where fuel tanks present — [COVERAGE], not universal to all c-stores
- **Not every store sells alcohol, lottery, or fuel:** Conditional copy throughout

---

## 5. Final Explorer architecture

### Hotel / Motel (`restaurant-cutaway` · `hotel-motel-insurance-interactive-master.png`)

| State ID | Title | shortLabel |
|----------|-------|------------|
| `commercial-property` | Commercial Property | Property |
| `general-liability` | General Liability | Liability |
| `business-interruption` | Business Interruption | Income |
| `liquor-liability` | Liquor Liability | Liquor |

### Event Liability (`event-venue` · `event-liability-insurance-interactive-master.png`)

| State ID | Title | shortLabel |
|----------|-------|------------|
| `third-party-bodily-injury` | Third-Party Bodily Injury | Injury Claims |
| `property-damage` | Property Damage | Property Damage |
| `liquor-liability-events` | Liquor Liability (Events) | Host Liquor |
| `vendor-exhibitor-coverage` | Vendor & Exhibitor Coverage | Vendors |

### Convenience Store (`retail-cutaway` · `convenience-store-gas-station-insurance-interactive-master.png`)

| State ID | Title | shortLabel |
|----------|-------|------------|
| `commercial-property` | Commercial Property | Property |
| `general-liability` | General Liability | Liability |
| `pollution-liability` | Pollution Liability | Pollution |
| `crime-hold-up` | Crime & Hold-Up | Crime |

**All state IDs, titles, zone mappings, and images preserved.**

---

## 6. Considerations count / presentation

| Route | Count | Presentation |
|-------|------:|--------------|
| Hotel / Motel | 6 | `expandable` |
| Event Liability | 6 | `expandable` |
| Convenience Store | 7 | `expandable` |

Shared `ProductConsiderationsExpandable` — one open at a time, keyboard, `aria-expanded`, reduced-motion. Slug checks added in `adaptCommercialProductContent()`.

---

## 7. FAQ count

Each route: **5** route-specific FAQs (replacing templated/thin prior sets).

---

## 8. Regulatory claims included (verified / scoped)

| Claim | Route(s) | Classification |
|-------|----------|----------------|
| Innkeepers Act limits operator liability for guest goods | Hotel | VERIFIED [REGULATORY] |
| AGCO does not mandate liquor liability as licence condition | Hotel, Event | VERIFIED [REGULATORY] |
| LCBO SOP FAQ: provincial regulations do not require party liability insurance | Event | VERIFIED [REGULATORY] |
| SOP vs. Liquor Sales Licence distinction | Event | VERIFIED [REGULATORY] |
| OLG Retailer Agreement + AGCO Seller registration for lottery | Convenience | VERIFIED [REGULATORY] |
| AGCO Convenience Store Licence for retail alcohol (eligible subset) | Convenience | VERIFIED [REGULATORY] |
| Municipal/permit insurance specs vary — contractual context | Event | CONTRACTUAL / scoped |
| Certificate/additional-insured requirements from venues | All | UNDERWRITING / CONTRACTUAL |

---

## 9. Claims removed or corrected (internal critique)

| Removed / corrected | Reason |
|---------------------|--------|
| "Covers the building…" (Hotel Property) | UNVERIFIED flat guarantee → hedged |
| "Covers claims when attendees are injured…" (Event BI) | UNVERIFIED flat guarantee → hedged |
| "Covers building…tobacco and lottery" (C-store Property) | UNVERIFIED + implied universal product mix |
| "Covers underground storage tank leaks" (C-store Pollution) | UNVERIFIED flat guarantee → hedged + conditional on fuel |
| "Event liability covers third-party…" (`coverageIntro`) | Flat product guarantee → hedged boundary language |
| "Yes — serving alcohol requires liquor liability" (Hotel FAQ) | Conflated service with insurance mandate → AGCO-corrected |
| "What do municipalities require?" (Event FAQ title) | Implied universal statutory mandate → contractual/permit variation |
| Universal liquor liability for all hotels / all events | UNVERIFIED → conditional on licence/permit |
| Universal pollution for all c-stores | UNVERIFIED → fuel-tank conditional |
| Windsor-specific municipal event rules county-wide | Not independently verified → omitted |

---

## 10. Shared changes

| Change | Scope | Backwards compatible |
|--------|-------|---------------------|
| `considerationsPresentation: 'expandable'` slug checks | Hotel, Event, Convenience (+ existing Liquor) | Yes — grid default unchanged for other product pages |

No new trust-band architecture. Product pages continue using distinct `subhead` (hero) + `whoItIsFor` (trust band).

---

## 11. Responsive QA

`node scripts/verify-d2-hospitality-batch.cjs` → **pass: true**

| Check | Hotel | Event | Convenience |
|-------|-------|-------|-------------|
| Hero + distinct trust | ✅ | ✅ | ✅ |
| 4 Explorer states + V2 LEFT/RIGHT | ✅ | ✅ | ✅ |
| Considerations + one-open-at-a-time | ✅ 6 | ✅ 6 | ✅ 7 |
| 5 FAQs | ✅ | ✅ | ✅ |
| Overflow 390 / 1440 | ✅ 0 | ✅ 0 | ✅ 0 |
| Forbidden legacy phrases | ✅ none | ✅ none | ✅ none |
| Console errors | ✅ none | ✅ none | ✅ none |

**Screenshots:** `docs/qa-screenshots/d2-hospitality-batch-2026-09-08/{route}/`

---

## 12. Regression results

| Check | Result |
|-------|--------|
| `npm run build` | ✅ Pass |
| `npx tsc --noEmit` | ✅ Pass |
| `npx tsx scripts/product-content-audit.ts` | ✅ Pass |
| `node scripts/verify-coverage-explorer-ux-v2.cjs` | ✅ Pass |
| Restaurant (1,622w, A) | ✅ Unchanged |
| Liquor Liability (2,005w, A) | ✅ Unchanged |
| Food Truck (1,624w, A) | ✅ Unchanged |
| Daycare (956w, A) | ✅ Unchanged |
| Greenhouse (757w, A) | ✅ Unchanged |

---

## 13. Full-site classification delta

| Class | Before batch | After batch | Change |
|-------|-------------:|------------:|-------:|
| **A** | 5 | **8** | +3 |
| **B** | 16 | 16 | — |
| **C** | 18 | 18 | — |
| **D** | 19 | **16** | −3 |

**Classification changes in this batch:**
- `/hotel-motel-insurance/` D → **A**
- `/event-liability-insurance/` D → **A**
- `/convenience-store-insurance/` D → **A**

---

## 14. Screenshots

| Route | Files |
|-------|-------|
| Hotel/Motel | `hotel-motel-insurance/hero_1440.png`, `explorer_390.png`, `explorer_1440.png` |
| Event Liability | `event-liability-insurance/hero_1440.png`, `explorer_390.png`, `explorer_1440.png` |
| Convenience Store | `convenience-store-insurance/hero_1440.png`, `explorer_390.png`, `explorer_1440.png` |

Batch verification: `docs/qa-screenshots/d2-hospitality-batch-2026-09-08/verification.json`

---

## 15. Remaining concerns for owner review

1. **Hotel liquor card presence:** Fourth Explorer state remains `Liquor Liability` for architectural continuity; copy is conditional ("where you sell or serve…"). Lodging-only properties should read this as optional, not required.
2. **Convenience Store headline:** Still includes "Gas Station" — accurate for combined operators; retail-only stores may prefer future headline refinement.
3. **Windsor municipal event requirements:** Not generalized — Event Consideration #2 hedges municipality-by-municipality. Independent Windsor primary-source pass deferred.
4. **Restaurant AGCO proof-of-insurance wording:** Separate known backlog — not addressed in this batch.
5. **Liquor Liability page:** Retains 1 pre-existing LOW audit flag (unchanged).

---

## Stop gates (repeat)

- **NO MERGE · NO DEPLOY · NO VERCEL PROMOTION**
- **STOP FOR OWNER REVIEW**
