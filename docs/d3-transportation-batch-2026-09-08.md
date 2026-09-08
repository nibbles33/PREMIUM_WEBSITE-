# D3 Batch 1 — Transportation (Trucking · Dump Truck · Cargo / Freight)

**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Date:** 2026-09-08  
**Prior baseline:** A 13 / B 16 / C 18 / D 11  
**Status:** Batch complete — **STOP FOR OWNER REVIEW**

---

## Stop gates

- **NO MERGE · NO DEPLOY · NO VERCEL PROMOTION**
- Committed to feature branch only
- Twenty-two frozen routes **unchanged**

---

## 1. Executive summary

Independent D3 remediation for three Ontario transportation routes. Each received route-specific primary-source research, internal claim classification, V2 Explorer detail pairs, expandable considerations, and five FAQs. All three moved **D → A**, eliminating four HIGH content-safety flags.

| Route | Before | After | Words before → after | HIGH eliminated |
|-------|--------|-------|----------------------|-----------------|
| `/trucking-insurance/` | D | **A** | 293 → **1,241** | 1 (flat liability/cargo FAQ) |
| `/dump-truck-insurance/` | D | **A** | 326 → **1,072** | 1 (flat liability/cargo FAQ) |
| `/cargo-freight-insurance/` | D | **A** | 286 → **1,117** | 2 (flat intro + FAQ) |

**Site-wide delta:** A **13 → 16** (+3) · D **11 → 8** (−3) · B/C unchanged.

**Validation:** `npm run build` ✅ · `npx tsc --noEmit` ✅ · product-content audit ✅ · Explorer UX v2 regression ✅ · route QA ✅ (390 / 768 / 1024 / 1440 all three routes).

---

## 2. Before-state problems

### Trucking
- Generic corridor hero interchangeable with commercial auto
- No V2 Explorer detail pairs; thin card copy
- HIGH flat FAQ: “Liability covers injury… cargo is about the freight itself”
- No considerations; CVOR not distinguished from insurance
- “Cross-border coverage” presented as product label without territory/filing nuance

### Dump Truck
- Read as generic commercial truck page
- No jobsite/tipping/own-material vs for-hire distinction
- HIGH flat FAQ on liability/cargo split
- No considerations for pollution, material type, or road vs jobsite exposure

### Cargo / Freight
- HIGH flat intro and FAQ on liability/cargo dichotomy
- “Covers loss or damage to freight” on Motor Truck Cargo card
- No distinction from warehousing (already remediated)
- Carrier legal liability vs direct MTC not explained
- Only four FAQs; no considerations

---

## 3. Research sources by route

### All routes (shared boundaries)
| Source | Use |
|--------|-----|
| Ontario MTO — CVOR certificate page (ontario.ca) | CVOR is regulatory registration for qualifying commercial motor vehicles — not insurance |
| FSRA — Ontario automobile insurance regulation | Commercial auto liability is regulated separately from cargo/CGL |
| Insurance market practice (hedged) | Automobile ≠ cargo ≠ CGL ≠ warehouse legal liability |

### Trucking
| Source | Use |
|--------|-----|
| MTO CVOR application/renewal guidance | Operators of buses, trucks, tow trucks need valid CVOR where required; safety rating monitored |
| MTO CVOR learning & assessment (Nov 2024+) | Online assessment replaces in-person DriveTest for new Ontario applicants |
| Cross-border | Territory extensions, contractual shipper limits — no universal “cross-border product” claim; MCS-90/filing specifics omitted unless verified |

### Dump Truck
| Source | Use |
|--------|-----|
| Commercial automobile framework | Highway vs jobsite trigger distinction — POLICY-DEPENDENT |
| Construction operations practice | Own-material vs for-hire hauling affects underwriting |
| Pollution liability market | Conditional — not universal requirement |

### Cargo / Freight
| Source | Use |
|--------|-----|
| Motor truck cargo / carrier legal liability forms (market) | Direct MTC vs carrier legal liability insuring agreements differ by policy edition |
| Warehousing remediation (internal reference) | Cargo in transit ≠ warehouse legal liability for stored goods |
| Reefer/spoilage endorsements (market) | Temperature loss triggers — POLICY-DEPENDENT |

**Not used:** Broker SEO pages for regulatory claims.

---

## 4. Regulatory findings

| Topic | Finding | Classification |
|-------|---------|----------------|
| CVOR | MTO registration program for qualifying commercial motor vehicle operators | VERIFIED REGULATORY |
| CVOR ≠ insurance | Registration does not pay claims or substitute for automobile insurance | VERIFIED REGULATORY |
| CVOR safety rating | May influence underwriting | UNDERWRITING PRACTICE |
| FSRA commercial auto | Third-party liability regulated under Ontario automobile framework | VERIFIED REGULATORY |
| Cross-border U.S. | Territory, limits, filings vary by insurer and contract | POLICY-DEPENDENT / CONTRACTUAL |
| Shipper cargo minimums | Contractual certificate requirements | CONTRACTUAL |
| Pollution (dump) | May apply to certain materials/sites — not universal mandate | POLICY-DEPENDENT |

---

## 5. Insurance vs regulatory vs contractual boundaries

| Layer | Trucking | Dump Truck | Cargo |
|-------|----------|------------|-------|
| **Regulatory** | CVOR where required; FSRA auto rules | CVOR where required; FSRA auto rules | None specific beyond carrier operations |
| **Insurance** | Auto liability, phys damage, MTC, territory extensions | Auto liability, phys damage, load/debris, NTL | MTC, carrier legal liability, reefer, contingent |
| **Contractual** | Shipper/broker limits, lease insurance | GC/quarry contracts, lease terms | BOL limits, broker certificates |
| **Operational** | Fleet safety, driver abstracts, commodities | Jobsite protocols, load securement | Theft controls, unattended vehicle rules |

Copy keeps regulatory compliance separate from purchasing insurance.

---

## 6. Claims rejected or softened

| Removed / softened | Tag | Action |
|--------------------|-----|--------|
| “Liability covers injury… cargo is about the freight itself” (all 3 routes) | UNVERIFIED flat guarantee | Replaced with hedged separation language |
| “Cargo insurance addresses the goods themselves; liability covers damage to others” | UNVERIFIED flat guarantee | Removed from cargo intro |
| “Covers loss or damage to freight you carry for hire” | UNVERIFIED flat guarantee | Hedged MTC card |
| “CVOR is insurance” / “CVOR guarantees insurance” | UNVERIFIED | Explicit rejection in considerations + FAQ |
| “Cross-border coverage” as universal product | POLICY-DEPENDENT | Reframed as territory/limit/filing coordination |
| Universal U.S. filing requirements (MCS-90 etc.) | UNVERIFIED | Omitted — disclose lanes instead |
| Universal pollution requirement for dump trucks | UNVERIFIED | Conditional consideration only |
| Automatic trailer coverage with tractor | POLICY-DEPENDENT | FAQ + phys damage detail |
| Cargo pays for any lost/damaged shipment | UNVERIFIED | Multiple hedges on cause, limits, exclusions |

---

## 7. Internal claim review (red-team)

| Challenge | Result |
|-----------|--------|
| CVOR confused with insurance? | **Corrected** — explicit separation in hero, consideration, FAQ |
| Facility Association rules as universal? | **Avoided** — FSRA/regulated auto referenced; no FAC rules cited |
| Cargo automatically included with trucking auto? | **Corrected** — separate Explorer states + FAQ |
| Cargo confused with warehouse legal liability? | **Corrected** — consideration + FAQ reference warehousing page |
| All dump trucks haul third-party goods? | **Corrected** — own-material vs for-hire distinction |
| Loading/unloading automatically CGL or auto? | **Hedged** — policy-dependent triggers in dump detail |
| Universal U.S. filing statements? | **Avoided** — territory disclosure only |
| Universal pollution claims? | **Avoided** — conditional consideration |
| Physical damage/cargo/spoilage promised? | **Hedged** — “where purchased,” causes of loss |
| Three pages genuinely different? | **Yes** — distinct heroes, detail pairs, considerations, FAQs |

---

## 8. Explorer architecture by route (unchanged)

### `/trucking-insurance/`
| Property | Value |
|----------|-------|
| Archetype | `truck-semi` |
| Image | `trucking-insurance-interactive-master.png` |
| States | 4 |

| State ID | Title | Zones |
|----------|-------|-------|
| `cargo-insurance` | Cargo Insurance | cargo-deck, trailer-body, highway-lane |
| `liability-coverage` | Liability Coverage | highway-lane, tractor-cab, yard-staging |
| `physical-damage` | Physical Damage | tractor-cab, trailer-body, cargo-deck |
| `cross-border-coverage` | Cross-Border Coverage | highway-lane, weigh-station, trailer-body |

### `/dump-truck-insurance/`
| Property | Value |
|----------|-------|
| Archetype | `truck-semi` |
| Image | `dump-truck-insurance-interactive-master.png` |
| States | 4 |

| State ID | Title | Zones |
|----------|-------|-------|
| `commercial-auto-liability` | Commercial Auto Liability | tractor-cab, trailer-body, highway-lane |
| `physical-damage` | Physical Damage | tractor-cab, trailer-body, cargo-deck |
| `cargo-debris-coverage` | Cargo & Debris Coverage | cargo-deck, trailer-body |
| `non-trucking-liability` | Non-Trucking Liability | highway-lane, tractor-cab, yard-staging |

### `/cargo-freight-insurance/`
| Property | Value |
|----------|-------|
| Archetype | `truck-semi` |
| Image | `cargo-freight-insurance-interactive-master.png` |
| States | 4 |

| State ID | Title | Zones |
|----------|-------|-------|
| `motor-truck-cargo` | Motor Truck Cargo | cargo-deck, trailer-body, highway-lane |
| `carrier-liability` | Carrier Liability | highway-lane, tractor-cab, yard-staging |
| `refrigerated-cargo` | Refrigerated Cargo | cargo-deck, trailer-body |
| `contingent-cargo` | Contingent Cargo | cargo-deck, highway-lane |

No new images. No manifest or zone ID changes.

---

## 9. Consideration structure

### Trucking (7, expandable)
1. CVOR is MTO registration — not insurance
2. Automobile liability, cargo, and CGL are different products
3. Fleet, owner-operator, and lease structures
4. Radius, commodities, and contract requirements
5. Drivers, abstracts, and loss history
6. Trailers, terminals, and equipment breakdown
7. Cross-border disclosure

### Dump Truck (6, expandable)
1. For-hire hauling vs. own-material or contractor use
2. Road exposure vs. jobsite and dumping operations
3. Material type and seasonal operations
4. Pollution and environmental exposure — conditional
5. Hydraulics, bodies, and equipment values
6. CVOR and heavy commercial vehicle rules

### Cargo / Freight (7, expandable)
1. Cargo in transit vs. warehousing — different products
2. Automobile liability does not insure the freight
3. Commodity, valuation, and limits
4. Theft, security, and unattended vehicles
5. Loading, unloading, and temporary storage
6. Territorial limits and cross-border freight
7. Contracts, bills of lading, and certificates

---

## 10. FAQ structure (5 each)

### Trucking
1. Does trucking insurance include cargo for customers' freight?
2. How does CVOR relate to trucking insurance?
3. Does operating in the U.S. change my insurance?
4. Are trailers automatically covered with the tractor?
5. What information affects a trucking insurance quote?

### Dump Truck
1. Is a dump truck insured differently from a regular commercial truck?
2. What about damage while dumping or unloading?
3. Does my policy cover the material I haul?
4. What if I work mainly on construction sites?
5. Does hauling soil or demolition material change underwriting?

### Cargo / Freight
1. Who insures customers' goods while I transport them?
2. Does cargo insurance cover theft of a loaded trailer?
3. How are high-value loads handled?
4. What about refrigerated or temperature-sensitive freight?
5. Is cargo insurance the same as warehouse legal liability?

---

## 11. Before / after audit

### Per route

| Route | Before | After | Words | Cons | FAQs | HIGH | MED | LOW |
|-------|--------|-------|------:|-----:|-----:|-----:|----:|----:|
| Trucking | D | **A** | 293→1,241 | 0→440 | 4→5 | 1→0 | 0 | 0 |
| Dump Truck | D | **A** | 326→1,072 | 0→319 | 4→5 | 1→0 | 0 | 0 |
| Cargo/Freight | D | **A** | 286→1,117 | 0→376 | 4→5 | 2→0 | 0 | 0 |

### Site-wide

| Grade | Before | After | Delta |
|-------|--------|-------|-------|
| A | 13 | **16** | +3 |
| B | 16 | 16 | — |
| C | 18 | 18 | — |
| D | 11 | **8** | −3 |

---

## 12. Responsive QA

Screenshots: `docs/qa-screenshots/d3-transportation-batch-2026-09-08/`

| Route | 390 | 768 | 1024 | 1440 | Explorer 4/4 | Trust | Cons | FAQ | Forbidden |
|-------|:---:|:---:|:----:|:----:|:------------:|:-----:|:----:|:---:|:---------:|
| Trucking | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 7 | 5 | 0 |
| Dump Truck | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 6 | 5 | 0 |
| Cargo/Freight | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 7 | 5 | 0 |

All routes: overflow 0 all viewports · no console errors · RIGHT/LEFT distinct · one-open-at-a-time considerations ✅

---

## 13. Frozen-route regression

Verified unchanged (word counts and classification):

| Route | Class | Words |
|-------|:-----:|------:|
| Pharmacy | A | 1,430 |
| Warehousing | A | 1,034 |
| Restaurant | A | 1,614 |
| (+ 19 other frozen routes per matrix) | — | — |

Explorer UX v2 regression (daycare, restaurant, contractors): **pass**

---

## 14. Unresolved concerns

1. **Cross-border filings:** Specific U.S. financial responsibility filings (e.g., BMC-91, MCS-90) not cited — would need verified FMCSA/insurer primary sources before adding to visitor copy.
2. **CVOR weight thresholds:** MTO page references qualifying commercial motor vehicles without publishing a single weight threshold in the copy — operators directed to MTO to confirm applicability.
3. **Dump truck pollution:** Included as conditional consideration only; site-specific contracts may impose environmental requirements beyond insurance.
4. **Carrier legal liability vs MTC:** Policy forms vary by insurer edition — copy explains distinction but cannot specify which form a given carrier uses.
5. **Shared truck-semi archetype:** Dump and cargo share visual archetype with trucking — content differentiated in copy; no architectural change permitted.

---

## Files changed

| File | Change |
|------|--------|
| `src/data/commercial-industries.ts` | Trucking + dump truck D3 content |
| `src/data/product-pages/commercial-products-industry.ts` | Cargo/freight D3 content |
| `src/lib/buildPilotProductConfig.ts` | Expandable considerations + trust bands for three routes |
| `scripts/verify-d3-transportation-batch.cjs` | Batch verification (new) |
| `docs/d3-transportation-batch-2026-09-08.md` | This report |
| `docs/qa-screenshots/d3-transportation-batch-2026-09-08/` | Screenshots + verification JSON |
| `docs/qa-screenshots/product-content-audit-2026-09-07/audit-data.json` | Regenerated audit |
| `docs/product-content-audit-2026-09-07.md` | Regenerated audit report |

**Not touched:** Explorer manifest, zone mappings, images, audit scanner, frozen routes.

---

## Stop gates (repeat)

- **NO MERGE · NO DEPLOY · NO VERCEL PROMOTION**
- **STOP FOR OWNER REVIEW**
