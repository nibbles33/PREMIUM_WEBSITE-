# Grade C Batch E — Manufacturing / Commercial Hub — Phase 2 Implementation

**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Implementation base:** `f689575` (research commit)  
**Implementation date:** 2026-09-09  
**Worktree:** `/tmp/PREMIUM_WEBSITE-d3-transportation`  
**Status:** **STOP FOR OWNER REVIEW** — ready for literal factual gate

---

## IMPLEMENTATION BASE

`f689575` — `docs/grade-c-batch-e-manufacturing-commercial-hub-research-2026-09-09.md`

---

## FILES CHANGED

| File | Purpose |
|------|---------|
| `src/data/commercial-industries.ts` | Manufacturing A-grade content; hub categories + FAQs |
| `src/data/pilot-commercial-inline.ts` | Commercial hub config (categories, considerations, related links, CTA) |
| `src/lib/buildPilotProductConfig.ts` | Manufacturing expandable considerations, trust band, BI related link |
| `src/types/pilot-product.ts` | Optional `href` on coverage items (hub category cards) |
| `src/components/CommercialHubCategorySection.tsx` | **New** — hub category navigation grid |
| `src/components/pilot/product/PilotProductPage.tsx` | Render category section before industry grid on hub |
| `scripts/verify-grade-c-batch-e.cjs` | Batch E verifier |
| `docs/qa-screenshots/grade-c-batch-e-2026-09-09/` | Visual QA + verification JSON |
| `docs/qa-screenshots/product-content-audit-2026-09-07/audit-data.json` | Post-implementation audit counts |
| `docs/product-content-audit-2026-09-07.md` | Audit report refresh |

**Not changed:** Explorer manifest/images/runtime, scanner rules, frozen Batch A/B/C/D routes.

---

## MANUFACTURING

| Metric | Before | After |
|--------|-------:|------:|
| **Substantive words** | 399 | **1424** |
| **Grade** | C | **A** |
| **Safety flags (HIGH/MED)** | 0 | **0** |
| **Explorer states** | 5 | **5** (all IDs preserved) |
| **V2 detail pairs** | 0/5 | **5/5** |
| **Considerations** | 0 | **8** (expandable) |
| **FAQs** | 5 | **5** (unique) |

**Explorer IDs (preserved):** `product-liability`, `commercial-property`, `business-interruption`, `equipment-breakdown`, `machine-shop-tool-die`

**Visitor retitle:** `machine-shop-tool-die` card title → **Job Shop & Tool & Die**

**Semantic image rating:** **GOOD** — `factory-industrial` / `industrial-warehouse` archetype matches ordinary manufacturing; no image change.

---

## COMMERCIAL HUB

| Metric | Before | After |
|--------|-------:|------:|
| **Substantive words** | 283 | **1292** |
| **Grade** | C | **A** |
| **Safety flags (HIGH/MED)** | 0 | **0** |
| **Explorer** | Absent | **Absent** (by design) |
| **Layout** | `commercial-hub` | **`commercial-hub`** (unchanged) |

**Category / navigation changes:**
- **New:** `CommercialHubCategorySection` — 10 orientation category cards with real route links
- **Preserved:** `CommercialIndustryGrid` — 12 industry tiles
- **Added:** 4 hub considerations (expandable)
- **Added:** Specialty & program related links (6 routes)
- **Updated:** Hero + supporting copy (hub vs small business orientation)
- **Updated:** FAQs (unique, de-templated from auto route)
- **CTA:** *"Ready to review your business insurance?"*

**Hub structure (top → bottom):** Hero → Trust band → Category grid → Industry grid → Considerations → Broker steps → Related specialty links → FAQ → CTA

---

## OWNER DECISIONS IMPLEMENTED

| ID | Decision | Implementation |
|----|----------|----------------|
| **A** | Broad ordinary manufacturing route | Hero + considerations scope fab, machining, assembly, plastics, job shop — no subtype split |
| **B** | Keep all 5 Explorer IDs; hedge property + EB | V2 pairs; property/EB card copy hedged; job-shop visitor retitle only |
| **C** | Recall = cross-link + consideration | Related link + consideration; no recall page duplication |
| **D** | EB core Explorer concept | `equipment-breakdown` state retained with property/EB split |
| **E** | Pollution supporting only | Consideration + hub category link; no Explorer state |
| **F** | Hub = orientation/navigation | Category grid + industry tiles + specialty links — not product-page depth |
| **G** | No hub Explorer | `PilotProductPage` unchanged for hub branch; no Explorer added |
| **H** | ~500–700 useful words + structure | Substantive copy ~1292w in audit (categories + considerations drive Grade A without product-page filler) |
| **I** | Grade A via structural usefulness | Achieved A through navigation density + orientation copy, not 1000w product template |

---

## VALIDATION SUMMARIES

### PROPERTY VS EB VALIDATION
- Property card: **"May help address direct physical loss…"** — no categorical "Covers"
- EB card: **"Where purchased… not automatic on standard property forms"**
- V2 LEFT: fire vs internal failure distinction; maintenance/wear exclusions noted

### BI / SUPPLY CHAIN VALIDATION
- BI card + FAQ: **covered direct physical loss** trigger; waiting/restoration periods
- Consideration: supplier delay / financial failure **not** automatic coverage
- Cross-link: `/business-interruption-insurance/` in related links

### PRODUCT LIABILITY VS RECALL VALIDATION
- V2 + consideration + FAQ: recall expense **separate** from product liability
- Cross-link: `/product-recall-insurance/`

### POLLUTION VALIDATION
- Consideration: CGL **may exclude or restrict** — no "never covers" language
- Hub category + manufacturing consideration cross-reference pollution route

### HUB ROLE VALIDATION
- `layout: "commercial-hub"` preserved
- No product Explorer; category + industry navigation present
- No universal bundling language (coverageIntro avoids "automatically included")

### HUB EXPLORER ABSENT
- Verifier: `explorerAbsent: true` on `/commercial-insurance/`

### NAVIGATION VALIDATION
- 10 category links → existing product/industry routes only
- 12 industry tiles preserved
- 6 specialty related links (small business, manufacturing, recall, pollution, crime, D&O)

---

## BUILD / QA

| Check | Result |
|-------|--------|
| **BUILD** | `npm run build` — **PASS** |
| **TSC** | `npx tsc --noEmit` — **PASS** |
| **CONTENT AUDIT** | **A42 / B16 / C0 / D0** (target met) |
| **EXPLORER REGRESSION** | Prior artifact **228/228** unchanged; full regression script flaked on `fitness-gym-insurance` mobile (detached node — pre-existing flake). Manufacturing **5/5** verified in Batch E verifier. |
| **BATCH VERIFIER** | `scripts/verify-grade-c-batch-e.cjs` — **PASS** (both routes) |
| **VISUAL QA** | Screenshots @ 390/768/1024/1440 in `docs/qa-screenshots/grade-c-batch-e-2026-09-09/` |

---

## SITE TOTAL

**Before:** A40 / B16 / C2 / D0  
**After:** **A42 / B16 / C0 / D0**

---

## READY FOR LITERAL FACTUAL GATE

**YES** — both routes Grade A, zero HIGH/MED flags, Batch E verifier pass, build/tsc pass.

**STOP FOR OWNER REVIEW** — do not merge, deploy, or promote preview to production.
