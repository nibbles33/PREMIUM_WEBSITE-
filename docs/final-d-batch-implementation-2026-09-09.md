# Final D Batch — Phase 2 Implementation Report

**Date:** 2026-09-09  
**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Worktree:** `/tmp/PREMIUM_WEBSITE-d3-transportation`  
**Approved research commit:** `5c329c9`  
**Research report:** `docs/final-d-batch-research-2026-09-09.md`

**Routes implemented:**
- `/crime-fidelity-insurance/`
- `/directors-officers-insurance/`
- `/employment-practices-liability-insurance/`
- `/product-recall-insurance/`

---

## Worktree verification

| Check | Result |
|-------|--------|
| **WORKTREE** | `/tmp/PREMIUM_WEBSITE-d3-transportation` |
| **BRANCH** | `cursor/coverage-explorer-ux-v2-2026-09-07` |
| **HEAD at start** | `5c329c9` (research ancestor) |
| **STATUS** | Pre-existing dirty QA screenshot only: `docs/qa-screenshots/coverage-explorer-ux-v2-2026-09-07/restaurant-desktop_1440.png` — **not** modified for commit, restored, or deleted |
| Primary carrier worktree | Untouched |

---

## Owner decisions applied

1. **Social engineering:** No fifth Crime Explorer state. Preserved ID `computer-fraud`. Visitor copy distinguishes direct computer fraud from social-engineering / fraudulent-instruction losses and states those may need separate wording, endorsements, limits, or sublimits. Does **not** imply social engineering is automatic computer fraud.
2. **Product name:** Kept **Crime & Fidelity Insurance**; distinguished from surety bonding and cyber; route unchanged.

---

## Per-route before → after

Audit basis: `npx tsx scripts/product-content-audit.ts` (scanner rules unchanged).

### `/crime-fidelity-insurance/`

| Metric | Before | After |
|--------|--------|-------|
| Grade | **D** | **A** |
| Word count | 253 | **1175** |
| HIGH | 1 | **0** |
| MEDIUM | 0 | **0** |
| LOW | 0 | **0** |
| Explorer states | 4 | **4** |
| V2 detail pairs | 0 | **4** |
| Considerations | 0 | **8** (expandable) |
| FAQs | 4 | **5** |

**Key fixes:** Removed flat “Covers theft…”; separated social engineering from computer fraud; crime vs cyber vs surety distinctions; employee-definition / discovery / client-property considerations.

### `/directors-officers-insurance/`

| Metric | Before | After |
|--------|--------|-------|
| Grade | **D** | **A** |
| Word count | 331 | **1054** |
| HIGH | 1 | **0** |
| MEDIUM | 0 | **0** |
| LOW | 0 | **0** |
| Explorer states | 4 | **4** |
| V2 detail pairs | 0 | **4** |
| Considerations | 3 (thin) | **8** (expandable) |
| FAQs | 4 | **5** |

**Key fixes:** Replaced flat CGL FAQ; Side C variance by org type; defence-cost limit erosion; claims-made / prior-pending / M&A / runoff depth.

### `/employment-practices-liability-insurance/`

| Metric | Before | After |
|--------|--------|-------|
| Grade | **D** | **A** |
| Word count | 227 | **983** |
| HIGH | 1 | **0** |
| MEDIUM | 0 | **0** |
| LOW | 0 | **0** |
| Explorer states | 4 | **4** |
| V2 detail pairs | 0 | **4** |
| Considerations | 0 | **8** (expandable) |
| FAQs | 4 | **5** |

**Key fixes:** Removed “Covers claims alleging improper dismissal…”; ESA statutory pay ≠ insured claim; Ontario Human Rights Code / OHSA context without legal advice; hedged defence costs.

### `/product-recall-insurance/`

| Metric | Before | After |
|--------|--------|-------|
| Grade | **D** | **A** |
| Word count | 252 | **1068** |
| HIGH | 2 | **0** |
| MEDIUM | 0 | **0** |
| LOW | 0 | **1** (informational “mandatory” regulatory wording in hero — expected; not a D trigger) |
| Explorer states | 4 | **4** |
| V2 detail pairs | 0 | **4** |
| Considerations | 0 | **8** (expandable) |
| FAQs | 4 | **5** |

**Key fixes:** Product liability vs recall expense distinction; conditional replacement / consultants / brand rehab; voluntary vs ordered recall does not auto-trigger insurance; CFIA / CCPSA framing per research.

---

## Site totals

| | |
|--|--|
| **SITE BEFORE** | A20 / B16 / C18 / **D4** |
| **SITE AFTER** | **A24 / B16 / C18 / D0** |
| **D ZERO ACHIEVED** | **YES** |

If totals had differed: would report why without manipulating classification. Totals match target.

---

## Explorer / architecture invariants

| Check | Result |
|-------|--------|
| **CRIME EXPLORER STATES** | 4 |
| **D&O EXPLORER STATES** | 4 |
| **EPL EXPLORER STATES** | 4 |
| **PRODUCT RECALL EXPLORER STATES** | 4 |
| **ALL ORIGINAL IDS PRESERVED** | **YES** |
| **IMAGES CHANGED** | **NO** |
| **EXPLORER RUNTIME CHANGED** | **NO** |
| **FROZEN ROUTES UNCHANGED** | **YES** (D1/D2/Daycare/Greenhouse/Transportation/Builders Risk/Surety/Contractors/Builders & Developers; Restaurant custom behavior; homepage; carriers; Partners; Claims; nav; scanner rules) |

**Crime IDs:** `employee-dishonesty`, `forgery-alteration`, `theft-of-money-securities`, `computer-fraud`  
**D&O IDs:** `side-a-individual-coverage`, `side-b-corporate-reimbursement`, `side-c-entity-coverage`, `defence-costs`  
**EPL IDs:** `wrongful-termination`, `harassment-discrimination`, `retaliation-claims`, `defence-costs`  
**Recall IDs:** `recall-expenses`, `replacement-costs`, `consultant-lab-fees`, `brand-rehabilitation`

**Expandable whitelist:** added all four slugs to `adaptCommercialProductContent` in `src/lib/buildPilotProductConfig.ts`.

---

## Validation

| Check | Result |
|-------|--------|
| **BUILD** | **PASS** (`npm run build`) |
| **TSC** | **PASS** (`npx tsc --noEmit`) |
| **CONTENT AUDIT** | **PASS** — A24 / B16 / C18 / D0; each Final-D route preferred **A**, 0 HIGH, 0 MEDIUM |
| **EXPLORER REGRESSION** | **PASS** (`BASE_URL=http://127.0.0.1:3018 node scripts/verify-coverage-explorer-ux-v2.cjs` — daycare/restaurant/contractors) |
| **FINAL-D VERIFIER** | **PASS** (`scripts/verify-final-d-batch.cjs`) |
| **VISUAL QA** | **PASS** — 390 / 768 / 1024 / 1440 per route; 0 overflow; Explorer states selectable; V2 right/left correct; considerations accordion one-open; FAQs present; no page console errors in verifier |

**Artifacts:**
- `docs/qa-screenshots/final-d-batch-2026-09-09/` (per-route screenshots + `verification.json`)
- `docs/qa-screenshots/final-d-batch-2026-09-09/literal-claim-dump.txt`
- `scripts/verify-final-d-batch.cjs`

---

## Files changed (implementation)

| File | Purpose |
|------|---------|
| `src/data/product-pages/commercial-products-specialty.ts` | Crime & Fidelity; EPL |
| `src/data/product-pages/commercial-products-core.ts` | D&O |
| `src/data/product-pages/commercial-products-industry.ts` | Product Recall |
| `src/lib/buildPilotProductConfig.ts` | Expandable considerations whitelist |
| `scripts/verify-final-d-batch.cjs` | Dedicated Final-D verifier |
| `docs/final-d-batch-implementation-2026-09-09.md` | This report |
| `docs/qa-screenshots/final-d-batch-2026-09-09/**` | Visual QA + claim dump |
| `docs/product-content-audit-2026-09-07.md` | Regenerated audit report |
| `docs/qa-screenshots/product-content-audit-2026-09-07/audit-data.json` | Regenerated audit data |

**Not committed:** `docs/qa-screenshots/coverage-explorer-ux-v2-2026-09-07/restaurant-desktop_1440.png` (pre-existing dirty artifact).

---

## Safety

- **DO NOT MERGE**
- **DO NOT DEPLOY**
- **DO NOT PROMOTE VERCEL**
- **DO NOT PUSH DIRECTLY TO MAIN**
- **DO NOT MODIFY PRODUCTION ALIASES**
- **DO NOT TOUCH THE PRIMARY CARRIER WORKTREE**

**STOP FOR OWNER REVIEW**

---

## FINAL PRECISION FIX

**Date:** 2026-09-09  
**PRECISION BASE:** `7ac909c`  
**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Worktree:** `/tmp/PREMIUM_WEBSITE-d3-transportation`

Targeted visitor-facing copy tightening only — no page architecture, Explorer IDs, images, runtime, or scanner rule changes.

### FILES CHANGED

| File | Purpose |
|------|---------|
| `src/data/product-pages/commercial-products-specialty.ts` | Crime property/employee FAQ; EPL severance FAQ |
| `src/data/product-pages/commercial-products-industry.ts` | Product Recall trigger/expense precision |
| `scripts/dump-final-d-literal-claims.ts` | ES2018 regex flag fix (enables dump regeneration under tsc) |
| `scripts/verify-final-d-batch.cjs` | Updated Crime explorer detailTitle expectation |
| `docs/qa-screenshots/final-d-batch-2026-09-09/literal-claim-dump.txt` | Regenerated source-data literal dump |
| `docs/qa-screenshots/final-d-batch-2026-09-09/verification.json` | Regenerated verifier output |
| `docs/final-d-batch-implementation-2026-09-09.md` | This section |

**Not committed:** `docs/qa-screenshots/coverage-explorer-ux-v2-2026-09-07/restaurant-desktop_1440.png`

### FIELDS CHANGED BY ROUTE

#### CRIME (`/crime-fidelity-insurance/`)

| Field | Complete current value |
|-------|------------------------|
| `subhead` | Crime & Fidelity Insurance can address specified first-party losses involving employee dishonesty, theft, forgery, fraud, money and securities, or related crime events — depending on the policy form and the insuring agreements you purchase. It is not a surety bond, not cyber insurance for privacy or ransomware response, and not a substitute for ordinary commercial property coverage on stock and buildings. Many commercial property forms exclude or restrict theft by employees; business crime coverage may address specified employee dishonesty losses subject to the crime policy’s insuring agreement, definitions, conditions, limits, exclusions, and proof requirements. Computer fraud and social-engineering / fraudulent-instruction losses are not necessarily treated the same way — many forms require separate or specific wording, endorsements, limits, or sublimits for voluntary payment schemes. Premium Insurance Brokers can help Windsor–Essex businesses compare crime agreements against cash handling, payroll, client funds, and payment controls. |
| `coverageTypes[0].detailTitle` | Many property forms exclude or restrict insider theft |
| `coverageTypes[0].detailDescription` | Many commercial property forms exclude or restrict theft by employees. Business crime coverage may address specified employee dishonesty losses subject to the crime policy’s insuring agreement, definitions, conditions, limits, exclusions, and proof requirements. Inventory shortage alone often does not prove a covered employee-dishonesty loss without other evidence — follow policy proof requirements. Not every worker qualifies as an “employee” under the form. |
| `faqItems[3].answer` | The policy’s definition of “employee” controls. How permanent employees, temporary workers, leased workers, independent contractors, owners, directors, and volunteers are treated can vary by form — do not assume a universal list of included or excluded persons. If non-employees handle cash, property, or payment instructions, disclose that structure when quoting. |

#### D&O (`/directors-officers-insurance/`)

No visitor-facing fields changed — existing Side A/B/C and defence-cost wording already met precision standards.

#### EPL (`/employment-practices-liability-insurance/`)

| Field | Complete current value |
|-------|------------------------|
| `faqItems[0].answer` | EPL should not be treated as insurance for ordinary statutory or contractual pay obligations. Ontario’s Employment Standards Act, 2000 can require termination pay and, where applicable, severance pay as employer obligations regardless of insurance. Depending on policy wording, EPL may respond to certain covered allegations arising from employment decisions — including defence costs or covered damages where applicable — but it does not automatically pay statutory termination pay, severance pay, unpaid wages, vacation pay, or benefits. Keep employment obligations distinct from insured claims. |

#### PRODUCT RECALL (`/product-recall-insurance/`)

| Field | Complete current value |
|-------|------------------------|
| `subhead` | Product recall insurance addresses specified first-party recall or withdrawal costs — and other scheduled expenses — only where the policy trigger and selected coverage apply. It is not the same product as product liability insurance. Product liability generally addresses certain third-party bodily-injury or property-damage claims arising from products, subject to policy wording. Product recall insurance may address specified withdrawal or recall expenses when the policy’s covered trigger and selected coverage apply — such as notification, transportation, storage, disposal, and — only where included — replacement, consultant or lab fees, crisis management, brand rehabilitation, or limited business interruption. Whether a voluntary or government-directed recall is insured depends on the policy’s covered trigger, definitions, exclusions, and selected coverage — a voluntary withdrawal, regulator-involved recall, or customer demand does not automatically trigger coverage. In Canada, most food recalls are company-led actions with Canadian Food Inspection Agency oversight, and the Minister of Health may order a mandatory food recall in defined circumstances; consumer products may involve Health Canada authorities under the Canada Consumer Product Safety Act — regulatory involvement alone does not mean the insurance will respond. Premium Insurance Brokers can help Windsor–Essex manufacturers, importers, and distributors compare recall expense forms against product type, traceability, and supply-chain role. |
| `coverageTypes[0].detailDescription` | Product liability generally addresses certain third-party bodily-injury or property-damage claims arising from products, subject to policy wording. Product recall insurance may address specified withdrawal or recall expenses when the policy’s covered trigger and selected coverage apply — whether a voluntary or government-directed recall is insured depends on the policy’s covered trigger, definitions, exclusions, and selected coverage. Confirm how the form defines the insured event, contaminated product, or malicious act. |
| `considerations[7].description` | Recall expense coverage does not replace product liability for certain third-party bodily-injury or property-damage claims arising from products, subject to policy wording. Keep both conversations open when you manufacture or distribute consumer goods — and do not assume one policy pays the other’s loss categories. |

### LITERAL PROOF RESULTS

#### CRIME

| Check | Result |
|-------|--------|
| Exact phrase: `Standard commercial property policies typically exclude theft by employees` | **NO** |
| Exact phrase: `Permanent employees are usually included` | **NO** |
| Concept: crime page says social engineering automatically equals computer fraud | **NO** |

#### D&O

| Check | Result |
|-------|--------|
| Concept: Side C universally covers the entity/company | **NO** |
| Concept: defence costs are universally outside limits | **NO** |
| Concept: defence costs universally erode limits | **NO** |

#### EPL

| Check | Result |
|-------|--------|
| Concept: EPL automatically pays statutory termination/severance obligations | **NO** |
| Concept: EPL automatically pays wages/vacation/benefits | **NO** |
| Concept: Ontario employment statutes themselves determine insurance coverage | **NO** |

#### PRODUCT RECALL

| Check | Result |
|-------|--------|
| Concept: every recall triggers insurance | **NO** |
| Concept: voluntary recall automatically triggers insurance | **NO** |
| Concept: government-directed/mandatory recall automatically triggers insurance | **NO** |
| Concept: replacement costs universally included | **NO** |
| Concept: testing/lab/consultant costs universally included | **NO** |
| Concept: brand rehabilitation universally included | **NO** |
| Concept: business interruption/lost profit universally included | **NO** |

*Note:* Product Recall retains accurate regulatory context (“mandatory food recall in defined circumstances”) with explicit qualifier that regulatory involvement alone does not mean insurance responds. Audit LOW retained (1 low only on hero — regulatory accuracy preserved).

### VALIDATION

| Check | Result |
|-------|--------|
| **BUILD** | PASS |
| **TSC** | PASS |
| **CONTENT AUDIT** | **A24 / B16 / C18 / D0** |
| **EXPLORER REGRESSION** | PASS (`verify-coverage-explorer-ux-v2.cjs`) |
| **FINAL-D VERIFIER** | PASS (4/4 routes, 0 console errors) |
| **LITERAL DUMP** | Regenerated — FAQ answers complete (62 blocks, 0 blank); considerations separated |

#### Per-route audit (post-fix)

| Route | Grade | HIGH | MEDIUM | LOW |
|-------|-------|------|--------|-----|
| Crime & Fidelity | **A** | 0 | 0 | 0 |
| D&O | **A** | 0 | 0 | 0 |
| EPL | **A** | 0 | 0 | 0 |
| Product Recall | **A** | 0 | 0 | 1 |

**SITE TOTAL:** A **24** / B **16** / C **18** / D **0**

### REGRESSION SAFETY

| Check | Result |
|-------|--------|
| ALL 16 EXPLORER IDS PRESERVED | **YES** |
| CRIME STATES | **4** |
| D&O STATES | **4** |
| EPL STATES | **4** |
| PRODUCT RECALL STATES | **4** |
| EXPLORER IMAGES CHANGED | **NO** |
| EXPLORER RUNTIME CHANGED | **NO** |
| FROZEN ROUTES OUTSIDE FINAL-D BATCH CHANGED | **NO** |
| TRANSPORTATION CHANGED | **NO** |
| CONSTRUCTION BATCH CHANGED | **NO** |
| RESTAURANT CHANGED | **NO** |
| SCANNER RULES CHANGED | **NO** |

### READY TO FREEZE

**YES** — pending owner review of precision edits and literal proof.

**STOP FOR OWNER REVIEW**
