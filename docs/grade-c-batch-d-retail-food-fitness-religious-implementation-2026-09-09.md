# Grade C Batch D — Retail / Grocery / Fitness / Religious — Phase 2 Implementation

**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Research commit:** `ea6a05b`  
**Implementation date:** 2026-09-09  
**Worktree:** `/tmp/PREMIUM_WEBSITE-d3-transportation`

---

## IMPLEMENTATION BASE

| Item | Value |
|------|-------|
| Research commit | `ea6a05b` |
| Research report | `docs/grade-c-batch-d-retail-food-fitness-religious-research-2026-09-09.md` |
| Site audit before | A36 / B16 / C6 / D0 |
| Site audit after | **A40 / B16 / C2 / D0** |

---

## FILES CHANGED

| File | Purpose |
|------|---------|
| `src/data/commercial-industries.ts` | Retail content + V2 pairs + 8 considerations + 5 FAQs |
| `src/data/product-pages/commercial-products-specialty.ts` | Grocery, Fitness, Religious content |
| `src/lib/buildPilotProductConfig.ts` | Expandable considerations + trust band + retail related links |
| `scripts/verify-grade-c-batch-d.cjs` | Batch D visual/structural verifier (new) |
| `docs/grade-c-batch-d-retail-food-fitness-religious-implementation-2026-09-09.md` | This report |
| `docs/qa-screenshots/grade-c-batch-d-2026-09-09/` | Visual QA (4 routes × 4 viewports + state shots) |

**Not changed:** Explorer runtime, manifest IDs, images, scanner rules, navigation, Batch A/B/C routes, frozen A-grade routes.

---

## BEFORE / AFTER BY ROUTE

### Retail (`/retail-insurance/`)

| Metric | Before | After |
|--------|-------:|------:|
| Substantive words | 292 | **1246** |
| Grade | C | **A** |
| HIGH / MED / LOW flags | 0 / 0 / 0 | **0 / 0 / 0** |
| Explorer V2 pairs | 0 | **4 / 4** |
| Considerations | 0 | **8** (expandable) |
| FAQs | 4 | **5** |

**Explorer IDs preserved:** `general-liability`, `property-inventory-coverage`, `business-interruption`, `product-liability`

**Visitor retitles:** Premises & Customer Liability · Property, Stock & Fixtures · Business Income (Optional) · Products You Sell

**Precision fixes:** Removed categorical "Covers fixtures, equipment, and stock"; crime vs property theft distinction; inventory valuation (RC/ACV/sold stock) hedged; e-commerce/POS/cyber context; cross-links to Small Business, Commercial Property, Grocery, Convenience Store, Pharmacy.

---

### Grocery / Specialty Food (`/grocery-specialty-food-insurance/`)

| Metric | Before | After |
|--------|-------:|------:|
| Substantive words | 251 | **1284** |
| Grade | C | **A** |
| HIGH / MED / LOW flags | 0 / 0 / 0 | **0 / 0 / 0** |
| Explorer V2 pairs | 0 | **4 / 4** |
| Considerations | 0 | **8** (expandable) |
| FAQs | 4 | **5** |

**Explorer IDs preserved:** `commercial-property-inventory`, `spoilage-refrigeration-breakdown`, `product-liability`, `general-liability`

**Visitor retitles:** Store Property & Stock · Spoilage & Refrigeration (Optional) · Food Products Liability · Customer Premises Liability

**Precision fixes:** Removed HIGH-risk automatic spoilage/power-outage wording; spoilage/EB/utility/off-premises power kept distinct; product liability vs product recall separated; AGCO grocery licence noted without insurance mandate; delivery auto/HNOA distinguished from CGL/property; cross-links to Product Recall and Restaurant.

**Visual:** `restaurant-hospitality` family **ACCEPTABLE** (owner-approved; no image change). Future visual-polish item only.

---

### Fitness / Gym (`/fitness-gym-insurance/`)

| Metric | Before | After |
|--------|-------:|------:|
| Substantive words | 240 | **1225** |
| Grade | C | **A** |
| HIGH / MED / LOW flags | 0 / 0 / 0 | **0 / 0 / 0** |
| Explorer V2 pairs | 0 | **4 / 4** |
| Considerations | 0 | **8** (expandable) |
| FAQs | 4 | **5** |

**Explorer IDs preserved:** `general-liability`, `professional-liability`, `commercial-property`, `sexual-abuse-misconduct`

**Visitor retitles:** Premises & Operations Liability · Trainer & Instruction Liability · Equipment & Fit-Out Property · Abuse & Misconduct (Where Available)

**Precision fixes:** GL vs professional/instruction split strengthened; waivers hedged (do not replace insurance / prevent lawsuits / guarantee enforceability); Occupiers' Liability Act referenced; abuse coverage policy-dependent; no indemnification of intentional criminal conduct implied.

---

### Religious Organizations (`/religious-organizations-insurance/`)

| Metric | Before | After |
|--------|-------:|------:|
| Substantive words | 215 | **1241** |
| Grade | C | **A** |
| HIGH / MED / LOW flags | 0 / 0 / 0 | **0 / 0 / 0** |
| Explorer V2 pairs | 0 | **4 / 4** |
| Considerations | 0 | **8** (expandable) |
| FAQs | 4 | **5** |

**Explorer IDs preserved:** `commercial-property`, `general-liability`, `pastoral-counselling-liability`, `abuse-molestation`

**Visitor retitles:** Worship Property & Contents · Congregation & Visitor Liability · Pastoral Counselling (Where Included) · Abuse & Molestation (Where Available)

**Precision fixes:** Removed "Critical coverage" and "typically require" abuse wording; volunteers not automatically covered; WSIB qualified; pastoral counselling distinct; D&O cross-link without Side A/B/C duplication; faith-neutral framing preserved.

---

## OWNER DECISIONS IMPLEMENTED

| Decision | Implementation |
|----------|----------------|
| **A.** Retail broad ordinary storefront | **YES** — cross-links Grocery, Convenience Store, Pharmacy, Small Business, Commercial Property |
| **B.** Grocery includes limited-prep food retail | **YES** — butchers, bakeries, delis; Restaurant cross-link for primarily prepared-food/service |
| **C.** Fitness keeps professional liability core Explorer | **YES** — `professional-liability` retained; GL vs professional split in cards, V2 LEFT, FAQs |
| **D.** Religious keeps abuse/molestation with precision | **YES** — mandatory tone removed; "Where Available" retitles |
| **E.** Religious vs Non-Profit distinct | **YES** — worship/faith/pastoral center; Non-Profit and D&O cross-links |
| **F.** Preserve all 16 Explorer IDs | **YES** — 16/16 IDs; 16/16 V2 detailTitle/detailDescription pairs |
| **G.** Grocery visual acceptable | **YES** — no image changes; recorded as future polish only |

---

## EXPLORER V2 SUMMARY (16/16)

| Route | ID | detailTitle |
|-------|-----|-------------|
| Retail | `general-liability` | A wet entrance isn't just housekeeping |
| Retail | `property-inventory-coverage` | Seasonal inventory can outgrow your limit |
| Retail | `business-interruption` | A fire doesn't pause your lease |
| Retail | `product-liability` | A defective product claim can name the seller |
| Grocery | `commercial-property-inventory` | Coolers and peak holiday stock drive values |
| Grocery | `spoilage-refrigeration-breakdown` | A compressor failure can empty the dairy case |
| Grocery | `product-liability` | One allergen label error can reach the whole chain |
| Grocery | `general-liability` | Spills and carts create premises exposure |
| Fitness | `general-liability` | A loose cable on the gym floor is a premises claim |
| Fitness | `professional-liability` | Bad programming allegations aren't ordinary slip-and-falls |
| Fitness | `commercial-property` | A treadmill fleet is a capital exposure |
| Fitness | `sexual-abuse-misconduct` | Youth classes change the coverage conversation |
| Religious | `commercial-property` | Stained glass and AV can exceed ordinary contents limits |
| Religious | `general-liability` | A winter parking-lot fall reaches the organization |
| Religious | `pastoral-counselling-liability` | Counselling allegations need the right policy part |
| Religious | `abuse-molestation` | Youth ministry deserves its own coverage review |

---

## VALIDATION RESULTS

| Check | Result |
|-------|--------|
| `npm run build` | **PASS** |
| `npx tsc --noEmit` | **PASS** |
| Content audit (Batch D routes) | **4/4 Grade A — 0 HIGH — 0 MEDIUM** |
| Site total | **A40 / B16 / C2 / D0** |
| Explorer regression | **228 / 228 PASS** |
| Batch D verifier | **4 / 4 PASS** |
| Responsive QA | **390 / 768 / 1024 / 1440 — 0 horizontal overflow** |

---

## IMAGE SEMANTIC RATINGS

| Route | Archetype / family | Rating |
|-------|-------------------|--------|
| Retail | `retail-cutaway` / `retail` | **GOOD** |
| Grocery | `retail-cutaway` / `restaurant-hospitality` | **ACCEPTABLE** (owner-approved; future polish) |
| Fitness | `gym-studio` + dedicated master | **GOOD** |
| Religious | `church-campus` + dedicated master | **GOOD** |

---

## RISKY LANGUAGE REMOVED

| Route | Removed / fixed |
|-------|-----------------|
| Retail | "Covers fixtures, equipment, and stock" → policy-dependent property language |
| Grocery | "Can cover inventory lost when coolers fail or power is interrupted" → endorsement/trigger precision |
| Grocery | "Covers customer injury" / categorical bakery FAQ → hedged products/premises split |
| Fitness | "Covers member slip-and-fall…" → premises vs professional framing |
| Religious | "Critical coverage" / "typically require abuse" → "Where Available" / review language |

---

## READY FOR LITERAL FACTUAL GATE

**YES** — pending owner review of implementation copy. Phase 3 literal-claim dump recommended before freeze (Batch C pattern).

---

**STOP FOR OWNER REVIEW** — do not merge, deploy, or promote Vercel preview to production.
