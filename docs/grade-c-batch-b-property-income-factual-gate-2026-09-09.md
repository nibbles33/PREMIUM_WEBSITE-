# Grade C Batch B — Core Commercial Property & Income — Phase 3 Factual Gate

**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Research commit:** `927f447`  
**Implementation commit:** `3b6366e`  
**Gate date:** 2026-09-09  
**Phase:** LITERAL-COPY FACTUAL GATE — no production copy changes  
**Site audit:** A32 / B16 / C10 / D0

**Artifacts:**
- `scripts/dump-grade-c-batch-b-literal-claims.ts`
- `docs/qa-screenshots/grade-c-batch-b-property-income-2026-09-09/literal-claim-dump.txt`

---

## A. Worktree safety

| Check | Result |
|-------|--------|
| **WORKTREE** | `/tmp/PREMIUM_WEBSITE-d3-transportation` |
| **BRANCH** | `cursor/coverage-explorer-ux-v2-2026-09-07` |
| **HEAD** | `3b6366e3bcb97f912031f88f8be3031697d199ca` (contains `3b6366e`) |
| **STATUS** | Pre-existing dirty QA screenshots and regenerated audit/regression files only. New untracked QA artifacts for this gate. **No unexpected SOURCE modifications.** |

---

## B. Literal dump stats

**Script:** `scripts/dump-grade-c-batch-b-literal-claims.ts`  
**Output:** `docs/qa-screenshots/grade-c-batch-b-property-income-2026-09-09/literal-claim-dump.txt`

| Metric | Expected | Actual |
|--------|----------|--------|
| **ROUTES** | 4 | **4** |
| **FAQ COUNT** | 20 | **20** |
| **CONSIDERATION COUNT** | 32 | **32** |
| **EXPLORER STATE COUNT** | 16 | **16** |
| **CHAR COUNT** | — | **83,610** |
| **TRUNCATION** | None | **None** |
| **BLANK FAQ ANSWERS** | 0 | **0** |

**Extraction method:** `getPilotCommercialConfig()` — resolved source strings, not DOM scrape.

**Explorer IDs verified in dump:**

| Route | IDs |
|-------|-----|
| Commercial Property | `building-coverage`, `contents-equipment`, `equipment-breakdown`, `commercial-landlord-property-owner` |
| Business Interruption | `lost-income`, `continuing-expenses`, `extra-expense`, `contingent-business-interruption` |
| Small Business | `general-liability`, `commercial-property`, `commercial-auto`, `business-interruption` |
| Condo Corporation | `master-property-policy`, `general-liability`, `equipment-breakdown`, `directors-officers` |

---

## C. Commercial Property — findings

| Check | Result |
|-------|--------|
| Replacement cost automatic | **Denied** — "Neither is automatic in every policy" (consideration [1]); hero "policy-dependent" |
| Equipment breakdown automatic | **Denied** — "Where purchased"; FAQ [3] "Not automatically on most base property forms" |
| BI automatic | **Denied** — "separate coverage"; consideration [7] "typically not automatic" |
| Flood/sewer/earthquake automatic | **Denied** — hero + consideration [5] + FAQ [0] |
| All-risk / every cause | **Denied** — FAQ [0] "does not automatically cover every cause of loss" |
| Tenant improvements always fully insured | **Denied** — "may not be covered"; scheduling required |
| Owner vs tenant conflation | **Clean** — owned/leased/lessor split throughout |
| `commercial-landlord-property-owner` | See below |

### `commercial-landlord-property-owner` check

| Item | Result |
|------|--------|
| **TECHNICAL ID PRESERVED** | **YES** — `commercial-landlord-property-owner` |
| **VISITOR TITLE** | **Commercial Property Owner / Lessor** |
| **Duplicate of `/landlord-insurance/`?** | **NO** — LEFT detail explicitly distinguishes "commercial property owner exposure, not the same product as a residential landlord policy on a separate route"; focuses on commercial lessor/building/rental-income coordination |

### Issues

| ROUTE | EXACT FIELD | EXACT CURRENT WORDING | ISSUE TYPE | WHY | SEVERITY | RECOMMENDED NARROW FIX |
|-------|-------------|----------------------|------------|-----|----------|------------------------|
| *(none requiring fix)* | — | — | — | — | — | — |

**Observation (LOW — no fix required):** Consideration [7] "Business interruption coordination" uses "Commercial property covers physical damage" as a product-category descriptor in contrast to BI — not a flat visitor guarantee; acceptable in context.

**FACTUAL STATUS: CLEAN**

---

## D. Business Interruption — findings

### 4A. Trigger review

Every sentence describing or implying a BI trigger:

| EXACT WORDING (excerpt) | FIELD | UNIVERSAL? | HEDGED? | FORM-DEPENDENT? | SAFE? | ACTION |
|-------------------------|-------|------------|---------|-----------------|-------|--------|
| "commonly responds when a covered cause of physical loss or damage affects insured property and results in a qualifying interruption, **subject to the policy form**" | heroLead | No | Yes ("commonly") | Yes | **Yes** | KEEP |
| "standard property-linked business interruption **typically requires** direct physical loss or damage" | heroLead | No | Yes ("typically") | Yes | **Yes** | KEEP |
| "not protection against **every shutdown**, market downturn, or supply-chain delay" | heroLead | No | Yes (negation) | — | **Yes** | KEEP |
| Same "commonly responds… subject to the policy form" pattern | consideration [0], FAQ [0] | No | Yes | Yes | **Yes** | KEEP |
| "Standard property-linked BI **typically requires** direct physical loss or damage" | FAQ [0] | No | Yes | Yes | **Yes** | KEEP |
| "after **covered direct physical loss** to insured property" | Explorer states | No | Yes ("covered") | Yes | **Yes** | KEEP |
| "When a **covered fire, water loss, or other insured peril** damages your premises" | lost-income LEFT | No | Yes | Yes | **Yes** | KEEP |

**Prohibited patterns searched:** "BI covers when…", "coverage begins when…", "if your business closes…", "when revenue stops…", "any insured interruption…", "any covered shutdown…" — **none found unqualified.**

### 4B. Contingent business interruption

| Check | Result |
|-------|--------|
| Any supplier failure covered | **Denied** — "financial failure… may not trigger" |
| Any customer disruption covered | **Denied** — named dependent + covered physical loss required |
| Non-delivery alone triggers | **Denied** |
| Supply-chain alone sufficient | **Denied** — "not general supply-chain disruption insurance" |

**Verdict: CLEAN**

### 4C. Indemnity / restoration / waiting periods

| EXACT WORDING | FIELD | UNIVERSAL NUMERIC? | HEDGED? | ACTION |
|---------------|-------|-------------------|---------|--------|
| "often **24 to 72 hours** on many forms, though periods vary" | consideration [1] | No | Yes | KEEP |
| "commonly **12, 18, or 24 months** on many programs, though options vary" | consideration [2] | No | Yes | KEEP |
| "indemnity period — sometimes called the period of restoration" | FAQ [2] | Terminology noted as form-dependent | Yes | KEEP |

No invented universal duration. Indemnity vs restoration terminology appropriately hedged.

### Issues

| ROUTE | EXACT FIELD | EXACT CURRENT WORDING | ISSUE TYPE | WHY | SEVERITY | RECOMMENDED NARROW FIX |
|-------|-------------|----------------------|------------|-----|----------|------------------------|
| *(none requiring fix)* | — | — | — | — | — | — |

**Observation (LOW):** Consideration [5] "Extra expense pays additional costs" — educational product-mechanics sentence; not a universal coverage promise.

**FACTUAL STATUS: CLEAN**

---

## E. Small Business — findings

| Check | Result |
|-------|--------|
| No universal policy claim | **Consistent** — hero opens "There is no single universal small-business insurance policy"; FAQ [0]–[1] reinforce |
| No contradictory bundling | **Clean** — "may be assembled"; "Not every industry qualifies" |
| Commercial auto conditional | **Clean** — "when you own, lease, or regularly use vehicles"; "not every small business has that exposure" |
| Home-based absolute exclusions | **Clean** — "typically limits or excludes" (not "always"/"never") |
| Cyber in considerations not Explorer | **As designed** |

### 5A. Commercial Auto

Explorer RIGHT, LEFT, FAQ [2], hero — all conditional on ownership/lease/regular business use. Businesses with no vehicles explicitly acknowledged.

### 5B. Home-based business

FAQ [3]: "often need… beyond a personal home policy, which **typically limits or excludes** business activity" — policy-dependent, not absolute.

### Issues

| ROUTE | EXACT FIELD | EXACT CURRENT WORDING | ISSUE TYPE | WHY | SEVERITY | RECOMMENDED NARROW FIX |
|-------|-------------|----------------------|------------|-----|----------|------------------------|
| *(none requiring fix)* | — | — | — | — | — | — |

**FACTUAL STATUS: CLEAN**

---

## F. Condominium Corporation — statutory findings

### 6A. Section 99

| Check | Result |
|-------|--------|
| Replacement cost scoped to corporation obligation | **Yes** — s.99(7) cited; "subject to a reasonable deductible" |
| Improvements excluded above standard unit | **Yes** — s.99(4) throughout |
| Major perils not expanded beyond Act | **Yes** — lists s.99(2) perils + "other perils listed in the Act / declaration / by-laws" |
| Not described as unlimited all-risk | **Yes** — major perils enumerated; flood distinguished |

### 6B. Water escape vs flood

**WATER ESCAPE / FLOOD DISTINCTION: CLEAN**

- Hero, master-policy LEFT, consideration [2], FAQ [0] all distinguish water escape (statutory major peril) from overland flood (not in s.99(2)).
- Commercial Property route uses "overland flood" only in optional-endorsement context — no cross-route contradiction.

### 6C. D&O — Section 39

Every D&O reference includes **"if reasonably available"** or equivalent:

| FIELD | PHRASE PRESENT? |
|-------|-----------------|
| metaDescription | Yes |
| heroLead | Yes ("if reasonably available under s.39") |
| Explorer directors-officers RIGHT | Yes |
| Explorer directors-officers LEFT | Yes |
| consideration [6] | Yes |
| FAQ [4] | Yes (twice) |

No unconditional mandatory D&O language found.

### 6D. Equipment breakdown

| Check | Result |
|-------|--------|
| Not called statutory | **Yes** — "not required by the Condominium Act" |
| Not called mandatory | **Yes** |
| Policy/insurer dependent | **Yes** — "availability depends on insurer and master policy form" |
| Examples as exposures not guarantees | **Yes** — boilers/HVAC/elevators framed as systems that "may help address" failure losses "where purchased" |

**"availability depends on insurer and master policy form"** — factually sound in full sentence context; accurately conveys non-statutory, form-variable availability without implying inclusion or exclusion.

### 6E. Deductibles — Section 105

| Check | Result |
|-------|--------|
| Deductible as common expense (s.105(1)) | **Correct** |
| Chargeback framework (s.105(2)-(3)) | **Correct** — conditional on act/omission; by-law extension noted |
| Invented deductible amounts | **None** |
| Universal automatic chargeback | **Denied** — "may be charged back"; "Outcomes depend on corporation by-laws and the facts of each loss" |

### 6F. Standard unit

| Check | Result |
|-------|--------|
| s.56(1)(h) / s.43(5)(h) cited | **Yes** |
| O. Reg. 484/07 | **Absent** (correct) |
| Universal identical definition | **Denied** — "review your corporation's documents rather than assuming a universal definition" |

### 6G. Appraisal

| Check | Result |
|-------|--------|
| Mandatory 3-year / fixed interval | **Absent** |
| Correct hedge | consideration [1]: "The Act does not prescribe a fixed appraisal interval" |

### Issue requiring fix

| ROUTE | EXACT FIELD | EXACT CURRENT WORDING | ISSUE TYPE | WHY | SEVERITY | RECOMMENDED NARROW FIX |
|-------|-------------|----------------------|------------|-----|----------|------------------------|
| `/condominium-corporation-insurance/` | FAQ [3] answer | "Unit owners **may insurable** chargeback amounts under their own policies — confirm with their broker." | TERMINOLOGY | Grammatical error — "insurable" used as verb; obscures accurate s.105(4) insurable-interest concept for readers | **MEDIUM** | Replace with: "Unit owners **may insure** chargeback amounts under their own policies — confirm limits with their broker." (Consideration [4] already uses correct "may be insurable" phrasing.) |

**FACTUAL STATUS: PRECISION FIX REQUIRED** (1 field)

---

## G. Condo statutory claim register

| ROUTE FIELD | EXACT WORDING (summary) | ACT/REG | SECTION | WHAT SOURCE SAYS | MATCH | HEDGE | SAFE TO KEEP | ACTION |
|-------------|-------------------------|---------|---------|------------------|-------|-------|--------------|--------|
| heroLead | Corporation must maintain property insurance for major perils + declared perils, replacement cost, reasonable deductible | Condominium Act, 1998 | s.99(1),(7) | Shall obtain/maintain insurance; replacement cost subject to reasonable deductible | **Yes** | Reasonable deductible | **Yes** | KEEP |
| heroLead | Excluding improvements above standard unit | Condominium Act, 1998 | s.99(4) | Does not include improvements to unit | **Yes** | — | **Yes** | KEEP |
| Explorer master RIGHT | Major perils list incl. water escape | Condominium Act, 1998 | s.99(2) | Defined major peril list | **Yes** | "+ other perils in Act/declaration/by-laws" | **Yes** | KEEP |
| Explorer master LEFT | Not overland flood as major peril | Condominium Act, 1998 | s.99(2) | Flood not listed | **Yes** | Separate endorsement where available | **Yes** | KEEP |
| Explorer master LEFT | Standard unit via s.56(1)(h) or s.43(5)(h) | Condominium Act, 1998 | s.56(1)(h), s.43(5)(h) | By-law or declarant schedule | **Yes** | Corporation-specific | **Yes** | KEEP |
| heroLead / Explorer GL | Liability as occupier + machinery/motor vehicles | Condominium Act, 1998 | s.102 | Shall maintain insurance re occupier and specified liabilities | **Yes** | Subject to policy terms | **Yes** | KEEP |
| heroLead / Explorer D&O | D&O insurance if reasonably available | Condominium Act, 1998 | s.39 | Shall purchase/maintain if reasonably available | **Yes** | "If reasonably available"; good-faith exclusion in Explorer | **Yes** | KEEP |
| heroLead | Deductible common expense; chargebacks may apply | Condominium Act, 1998 | s.105(1)-(3) | Common expense; chargeback rules | **Yes** | Subject to by-laws; conditional chargeback | **Yes** | KEEP |
| consideration [5] | s.101 coordination master/unit policies | Condominium Act, 1998 | s.101 | Other insurance rules | **Yes** | — | **Yes** | KEEP |
| Explorer EB | Not required by Act; availability depends on insurer/form | — | — | EB not in Act | **N/A** | Optional endorsement | **Yes** | KEEP |

**Unsupported statutory claims in dump: NONE**

---

## H. Numeric / regulatory claim register (all routes)

| ROUTE | FIELD | CLAIM | TYPE | SOURCE | HEDGE | SAFE | ACTION |
|-------|-------|-------|------|--------|-------|------|--------|
| Commercial Property | consideration [2] | Coinsurance often 80% or 90% | POLICY-MECHANICS | IBC / common commercial forms | "often… though percentages vary" | **Yes** | KEEP |
| Business Interruption | consideration [1] | Waiting period often 24–72 hours | POLICY-MECHANICS | Chubb/IBC industry material | "often… though periods vary" | **Yes** | KEEP |
| Business Interruption | consideration [2] | Indemnity commonly 12, 18, or 24 months | POLICY-MECHANICS | Common market options | "commonly… though options vary" | **Yes** | KEEP |
| Condo Corporation | heroLead / FAQ [0] | Replacement cost statutory requirement | REGULATORY | s.99(7) | "subject to a reasonable deductible" | **Yes** | KEEP |
| Condo Corporation | consideration [1] | No fixed appraisal interval in Act | REGULATORY | Primary Act review | Explicit negation | **Yes** | KEEP |
| Condo Corporation | consideration [3] / FAQ [3] | Deductible amounts not fixed in Act | REGULATORY | s.105 | Explicit | **Yes** | KEEP |
| Small Business | consideration [6] | WSIB may apply when hiring | REGULATORY | Ontario WSIB | "may trigger" | **Yes** | KEEP |

**No invented dollar amounts. No universal numeric waiting/indemnity mandates.**

---

## I. Absolute-language review (material occurrences)

| ROUTE | FIELD | WORDING | FACTUALLY SAFE | HEDGED | ACTION |
|-------|-------|---------|----------------|--------|--------|
| Commercial Property | consideration [7] | "Commercial property **covers** physical damage" | Yes (category contrast) | Partial | KEEP — context limits to product role vs BI |
| Business Interruption | consideration [5] | "Extra expense **pays** additional costs" | Yes (mechanics) | Partial | KEEP — educational |
| Small Business | Explorer BI LEFT | "Business interruption… **addresses** that income gap" | Yes | Yes (preceded by covered fire) | KEEP |
| Condo Corporation | Explorer master RIGHT | "The corporation **must** obtain and maintain insurance" | Yes (statutory) | N/A | KEEP |
| Condo Corporation | FAQ [3] | "may **insurable** chargeback" | **No** (grammar) | — | **TIGHTEN** |

No material unhedged "automatically included", "all risk", "guarantees", or universal BI trigger promises found.

---

## J. Cross-page consistency

| Comparison | Result |
|------------|--------|
| Commercial Property vs Small Business | **No contradiction** — SMB is assembly/coordination; CP is property depth; property card cross-links to CP page |
| Commercial Property vs Landlord (`/landlord-insurance/`) | **No duplicate** — CP lessor state distinguishes commercial owner exposure from residential landlord product |
| Business Interruption vs Commercial Property | **Aligned** — both use covered physical loss trigger; CP says BI "separate"/"where purchased" |
| Business Interruption vs Product Recall BI | **Not reviewed in dump** — no Batch B contradiction identified |
| Condo Corporation vs `/condo-insurance/` | **Clean boundary** — corporation master vs unit-owner personal; cross-link present |
| Condo D&O vs `/directors-officers-insurance/` | **Clean** — condo s.39 scoped; generic corporate D&O distinguished in Explorer LEFT |
| Equipment breakdown inclusion | **Consistent** — optional/endorsement on CP, condo; not statutory on condo |

**Exact contradictions found: NONE**

---

## K. Meta / SEO precision

| Route | metaDescription | Verdict |
|-------|-----------------|---------|
| Commercial Property | "building, contents, tenant improvements, and optional endorsements coordinated with business interruption **where needed**" | **CLEAN** — no automatic-inclusion compression |
| Business Interruption | "when **covered physical loss or damage** interrupts operations, **subject to policy form**" | **CLEAN** — trigger hedged in meta |
| Small Business | "how liability, property, commercial auto, and business interruption **may be assembled** through package policies, endorsements, or separate coverages" | **CLEAN** — no universal package claim |
| Condo Corporation | "master property under the Condominium Act… optional equipment breakdown… D&O **if reasonably available**" | **CLEAN** — statutory + conditional D&O |

---

## L. Explorer V2 review (16/16 IDs preserved)

| Route | States | Verdict |
|-------|--------|---------|
| **Commercial Property** | 4/4 | **CLEAN** — RIGHT hedged with "May help"/"Where purchased"; LEFT scenario-driven; lessor state distinct from landlord product |
| **Business Interruption** | 4/4 | **CLEAN** — trigger restated on income/expense states; CBI highly conditional |
| **Small Business** | 4/4 | **CLEAN** — RIGHT category-level; auto hedged; no Explorer copy more categorical than body |
| **Condo Corporation** | 4/4 | **CLEAN** — statutory RIGHT on master/GL/D&O; EB optional; no Explorer overstatement vs body |

---

## M. Visual-semantic review

No image changes in implementation. Existing `commercial-building` archetype imagery reviewed against state concepts:

| Route / State | IMAGE MATCH | Notes |
|---------------|-------------|-------|
| Commercial Property (all 4) | **ACCEPTABLE** | Generic commercial building supports building/contents/owner concepts |
| Business Interruption (all 4) | **ACCEPTABLE** | Same archetype; income/expense states are abstract — imagery does not contradict |
| Small Business (all 4) | **ACCEPTABLE** | Broad commercial building fits package entry point |
| Condo Corporation (all 4) | **ACCEPTABLE** | Multi-storey building imagery aligns with master policy / common elements |

**MISLEADING flags: 0** — no image change recommended.

---

## N. Route verdicts

| Route | FACTUAL STATUS |
|-------|----------------|
| `/commercial-property-insurance/` | **CLEAN** |
| `/business-interruption-insurance/` | **CLEAN** |
| `/small-business-insurance/` | **CLEAN** |
| `/condominium-corporation-insurance/` | **PRECISION FIX REQUIRED** |

### Fields requiring fix (exact)

| ROUTE | FIELD | CURRENT | WHY | RECOMMENDED NARROW FIX |
|-------|-------|---------|-----|------------------------|
| `/condominium-corporation-insurance/` | `faqItems[3].answer` | "Unit owners may insurable chargeback amounts…" | Grammar error; visitor-facing factual imprecision | "Unit owners may **insure** chargeback amounts under their own policies — confirm limits with their broker." |

---

## O. Freeze decision

| Route | Decision |
|-------|----------|
| **COMMERCIAL PROPERTY** | **FREEZE** |
| **BUSINESS INTERRUPTION** | **FREEZE** |
| **SMALL BUSINESS** | **FREEZE** |
| **CONDO CORPORATION** | **FIX REQUIRED** |

| Metric | Value |
|--------|-------|
| **BATCH B READY TO FREEZE** | **NO** |
| **FIELDS REQUIRING FIX** | **1** |

Pending owner-approved correction of condo FAQ [3] grammar, Batch B may proceed to literal freeze.

---

**STOP FOR OWNER REVIEW** — do not merge, deploy, or modify production copy until owner approves the single recommended fix (or accepts as-is).
