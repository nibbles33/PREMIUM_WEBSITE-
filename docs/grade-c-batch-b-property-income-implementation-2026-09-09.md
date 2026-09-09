# Grade C Batch B — Core Commercial Property & Income — Phase 2 Implementation

**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Implementation base:** `927f447` (research commit)  
**Implementation date:** 2026-09-09  
**Worktree:** `/tmp/PREMIUM_WEBSITE-d3-transportation`

---

## IMPLEMENTATION BASE

| Item | Value |
|------|-------|
| Frozen base | `280f4f6` |
| Research commit | `927f447` |
| Research report | `docs/grade-c-batch-b-property-income-research-2026-09-09.md` |

---

## FILES CHANGED

| File | Purpose |
|------|---------|
| `src/data/commercial-industries.ts` | Commercial Property content |
| `src/data/product-pages/commercial-products-core.ts` | Small Business + Business Interruption |
| `src/data/product-pages/commercial-products-industry.ts` | Condominium Corporation |
| `src/lib/buildPilotProductConfig.ts` | Expandable considerations + trust band for batch routes |
| `scripts/verify-grade-c-batch-b.cjs` | Batch B visual/structural verifier (new) |
| `docs/grade-c-batch-b-property-income-implementation-2026-09-09.md` | This report |

**Not changed:** Explorer runtime, manifest, images, scanner rules, navigation, Batch A routes, frozen A-grade routes.

---

## BEFORE / AFTER BY ROUTE

### Commercial Property (`/commercial-property-insurance/`)

| Metric | Before | After |
|--------|-------:|------:|
| Substantive words | 367 | **1306** |
| Grade | C | **A** |
| HIGH / MED / LOW flags | 0 / 0 / 0 | **0 / 0 / 0** |
| Explorer V2 pairs | 0 | **4 / 4** |
| Considerations | 0 | **8** (expandable) |
| FAQs | 6 | **5** |

**Explorer IDs preserved:** `building-coverage`, `contents-equipment`, `equipment-breakdown`, `commercial-landlord-property-owner`  
**Visitor retitle:** Commercial Property Owner / Lessor (ID unchanged)

---

### Business Interruption (`/business-interruption-insurance/`)

| Metric | Before | After |
|--------|-------:|------:|
| Substantive words | 395 | **1320** |
| Grade | C | **A** |
| HIGH / MED / LOW flags | 0 / 0 / 0 | **0 / 0 / 0** |
| Explorer V2 pairs | 0 | **4 / 4** |
| Considerations | 3 (thin) | **8** (expandable) |
| FAQs | 4 | **5** |

**Explorer IDs preserved:** `lost-income`, `continuing-expenses`, `extra-expense`, `contingent-business-interruption`

---

### Small Business (`/small-business-insurance/`)

| Metric | Before | After |
|--------|-------:|------:|
| Substantive words | 399 | **1177** |
| Grade | C | **A** |
| HIGH / MED / LOW flags | 0 / 0 / 0 | **0 / 0 / 1 (low)** |
| Explorer V2 pairs | 0 | **4 / 4** |
| Considerations | 3 (thin) | **8** (expandable) |
| FAQs | 4 | **5** |

**Explorer IDs preserved:** `general-liability`, `commercial-property`, `commercial-auto`, `business-interruption`  
**Low flag:** FAQ phrase "no single mandatory bundle" — informational mandatory-coverage scan; content is accurate hedged guidance.

---

### Condominium Corporation (`/condominium-corporation-insurance/`)

| Metric | Before | After |
|--------|-------:|------:|
| Substantive words | 277 | **1550** |
| Grade | C | **A** |
| HIGH / MED / LOW flags | 0 / 0 / 0 | **0 / 0 / 0** |
| Explorer V2 pairs | 0 | **4 / 4** |
| Considerations | 0 | **8** (expandable) |
| FAQs | 4 | **5** |

**Explorer IDs preserved:** `master-property-policy`, `general-liability`, `equipment-breakdown`, `directors-officers`

**Scanner fix during implementation:** Initial EB card used "not automatically included" — triggered HIGH automatic-inclusion flag. Rephrased to "availability depends on insurer and master policy form."

---

## OWNER DECISIONS IMPLEMENTED

| Decision | Implementation |
|----------|----------------|
| **A.** Keep `commercial-landlord-property-owner` | **YES** — retitled to "Commercial Property Owner / Lessor"; cross-link to landlord route in LEFT detail; not a duplicate landlord product page |
| **B.** Keep all four BI IDs | **YES** — CBI highly conditional (named dependent property, covered physical loss) |
| **C.** Keep Commercial Auto in SMB Explorer | **YES** — hedged for businesses that own, lease, or regularly use vehicles; cyber in considerations/FAQ only |
| **D.** Keep all four condo IDs + D&O core | **YES** — s.39 "if reasonably available"; EB optional/non-statutory |

---

## REGULATORY CLAIM REGISTER (implemented)

| ROUTE | CLAIM | SOURCE | SAFE | FINAL WORDING (summary) |
|-------|-------|--------|------|-------------------------|
| Condo | Property insurance obligation | Condominium Act s.99(1) | Yes | Corporation must maintain insurance for units/common elements against major perils + declared perils |
| Condo | Major perils list includes water escape | s.99(2) | Yes | Listed perils include water escape — distinguished from overland flood |
| Condo | Replacement cost | s.99(7) | Yes | To replacement cost subject to reasonable deductible |
| Condo | Improvements excluded | s.99(4) | Yes | Does not include improvements above standard unit |
| Condo | Standard unit | s.56(1)(h) / s.43(5)(h) | Yes | By-law or declarant schedule — not universal schedule |
| Condo | Occupier liability | s.102 | Yes | Liability as occupier of common elements + machinery/motor vehicle |
| Condo | D&O if reasonably available | s.39 | Yes | Must purchase/maintain if reasonably available |
| Condo | Deductible common expense | s.105(1) | Yes | Deductible portion = common expense |
| Condo | Chargeback | s.105(2)-(3) | Yes | Owner chargeback when conditions met; by-law may extend |
| BI | Physical loss trigger | IBC; *SIR Corp v. Aviva* | Yes | "Commonly responds when covered cause of physical loss or damage…" |
| CP | Coinsurance | IBC / common form | Yes | Hedged — "often 80% or 90% on many forms, though percentages vary" |
| CP | RC vs ACV | Common policy | Yes | Policy-dependent, not automatic |

**Unsupported claims removed / avoided:**
- Overland flood as statutory major peril
- Mandatory equipment breakdown (condo)
- Fixed appraisal interval (3-year)
- Invented deductible dollar amounts
- Universal BI trigger / any-shutdown wording
- Automatic flood/sewer/earthquake/EB/BI/replacement cost (commercial property)

---

## CONDO STATUTORY VALIDATION

| Check | Result |
|-------|--------|
| water escape ≠ overland flood | **PASS** — explicit distinction in hero, considerations, FAQ, master-policy V2 |
| D&O includes "if reasonably available" | **PASS** — hero, Explorer, considerations, FAQ |
| Equipment breakdown not statutory | **PASS** — "not required by the Condominium Act" |
| No 3-year appraisal claim | **PASS** |
| No invented deductible amount | **PASS** |
| Page scoped to corporations not unit owners | **PASS** — hero + cross-link to `/condo-insurance/` |

---

## BI TRIGGER VALIDATION

| Check | Result |
|-------|--------|
| No "any shutdown" wording | **PASS** — "not protection against every shutdown" |
| No absolute universal trigger | **PASS** — "commonly responds… subject to the policy form" |
| Contingent BI conditional | **PASS** — named dependent property, covered physical loss, endorsement |
| FAQ covers trigger / BI inclusion / indemnity period / CBI / quote info | **PASS** |

---

## V2 VALIDATION

| Route | IDs | V2 pairs | Detail titles match plan |
|-------|-----|----------|--------------------------|
| Commercial Property | 4/4 | 4/4 | Yes |
| Business Interruption | 4/4 | 4/4 | Yes |
| Small Business | 4/4 | 4/4 | Yes |
| Condo Corporation | 4/4 | 4/4 | Yes |

**Total:** 16/16 IDs preserved · 16/16 V2 detail pairs · No image changes

---

## VISUAL QA

Batch verifier: `node scripts/verify-grade-c-batch-b.cjs`  
Screenshots: `docs/qa-screenshots/grade-c-batch-b-2026-09-09/` (not committed)

| Route | 390 | 768 | 1024 | 1440 | Overflow | Verifier |
|-------|-----|-----|------|------|----------|----------|
| Commercial Property | ✓ | ✓ | ✓ | ✓ | 0 | PASS |
| Business Interruption | ✓ | ✓ | ✓ | ✓ | 0 | PASS |
| Small Business | ✓ | ✓ | ✓ | ✓ | 0 | PASS |
| Condo Corporation | ✓ | ✓ | ✓ | ✓ | 0 | PASS |

---

## BUILD / QA SUMMARY

| Check | Result |
|-------|--------|
| **BUILD** | PASS (`npm run build`) |
| **TSC** | PASS (`npx tsc --noEmit`) |
| **CONTENT AUDIT** | **A32 / B16 / C10 / D0** (all 4 batch routes → **A**) |
| **EXPLORER REGRESSION** | PASS — **228/228** checks, 0 failures |
| **BATCH VERIFIER** | PASS — 4/4 routes |

### Site totals (content audit)

| Grade | Count |
|-------|------:|
| A | 32 |
| B | 16 |
| C | 10 |
| D | 0 |

**Expected A32 / B16 / C10 / D0 — achieved.**

---

## READY FOR LITERAL FACTUAL GATE

**YES** — pending owner review of implementation copy and statutory phrasing on condominium corporation route before freeze.

---

**STOP FOR OWNER REVIEW** — do not merge, deploy, or promote preview to production.
