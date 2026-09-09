# Grade C Batch B — Core Commercial Property & Income — Phase 1 Research

**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Frozen HEAD:** `280f4f6`  
**Research date:** 2026-09-09  
**Phase:** RESEARCH ONLY — no page copy implementation  
**Isolated worktree:** `/tmp/PREMIUM_WEBSITE-d3-transportation`  
**Site audit at research start:** A28 / B16 / C14 / D0

**Routes:**
- `/commercial-property-insurance/`
- `/business-interruption-insurance/`
- `/small-business-insurance/`
- `/condominium-corporation-insurance/`

**Status:** **STOP FOR OWNER REVIEW** — do not implement copy until approved

---

## Worktree verification (Step 0)

| Check | Result |
|-------|--------|
| **WORKTREE** | `/tmp/PREMIUM_WEBSITE-d3-transportation` |
| **BRANCH** | `cursor/coverage-explorer-ux-v2-2026-09-07` |
| **HEAD** | `280f4f637e9560b6ec0ed6f4ddfc281b7041b6fb` (contains `280f4f6`) |
| **STATUS** | Pre-existing dirty QA screenshots only (not modified/restored/staged/committed). No unexpected SOURCE modifications. |
| **Primary carrier worktree** | Untouched |

---

## Category legend

| Tag | Meaning |
|-----|---------|
| **[COVERAGE]** | Insurance product or policy coverage a customer could purchase |
| **[UNDERWRITING]** | Insurer evaluation input — not itself a coverage |
| **[REGULATORY]** | Ontario statute, regulator, or compliance obligation |
| **[LEGAL]** | Legal liability exposure or statutory duty — not an insurance product |
| **[CONTRACTUAL]** | Contract, lease, or certificate requirement |
| **[EXPOSURE]** | Operational risk — may or may not map to a purchasable coverage |

---

## A. Current-state audit

Audit basis: `docs/product-content-audit-2026-09-07.md` + `audit-data.json` @ HEAD `280f4f6` + source extraction from `commercial-industries.ts`, `commercial-products-core.ts`, `commercial-products-industry.ts`.

### Summary

| Route | Grade | Words | HIGH | MED | LOW | Explorer | Considerations | FAQs | V2 detail pairs |
|-------|-------|------:|-----:|----:|----:|----------:|---------------:|-----:|-----------------|
| `/commercial-property-insurance/` | **C** | 367 | 0 | 0 | 0 | 4 | **0** | 6 | **None** |
| `/business-interruption-insurance/` | **C** | 395 | 0 | 0 | 0 | 4 | 3 (thin ~66w) | 4 | **None** |
| `/small-business-insurance/` | **C** | 399 | 0 | 0 | 0 | 4 | 3 (thin ~63w) | 4 | **None** |
| `/condominium-corporation-insurance/` | **C** | 277 | 0 | 0 | 0 | 4 | **0** | 4 | **None** |

**Grade C drivers (all four):** Below ~400 substantive words; no Explorer V2 left/right detail pairs; cards average ~26–36 words; condo page thinnest overall.

**Benchmark (architecture/tone only — do not copy facts):** `/hotel-motel-insurance/` (A, 1252w), `/warehousing-insurance/` (A, 1034w), `/restaurant-insurance/` (A) — property + BI coordination with hedged cards and V2 pairs.

---

### A1. `/commercial-property-insurance/`

**Source:** `src/data/commercial-industries.ts` (~549–625)  
**Explorer manifest:** `commercial-property-insurance` · archetype `commercial-building`

| Item | Current |
|------|---------|
| **PRODUCT NAME** | Commercial Property Insurance |
| **HERO COPY** | *"Protection for the building, contents, and income your business depends on."* (11 words — generic) |
| **coverageIntro** | *"Building blocks for protecting commercial premises and the income they generate."* |
| **Considerations** | **0** |
| **V2 detail pairs** | **None** |

| Explorer ID | Current title | Card description (absolute-language notes) |
|-------------|---------------|---------------------------------------------|
| `building-coverage` | Building Coverage | *"Helps repair or rebuild the structure after covered damage such as fire or wind."* |
| `contents-equipment` | Contents & Equipment | *"Protects furniture, stock, and business equipment against covered theft or damage."* |
| `equipment-breakdown` | Equipment Breakdown | *"**Covers** sudden mechanical or electrical failure… not addressed by standard property forms."* — reads as included in page product |
| `commercial-landlord-property-owner` | Commercial Landlord / Property Owner | *"**Protects** rental property owners for building damage, landlord liability, and loss of rental income after a covered property loss."* — overlaps `/landlord-insurance/` audience |

**Issues identified:**
- **Thin hero** — no owned vs leased, valuation, or perils/end extensions distinction.
- **No considerations** — no coinsurance, replacement cost vs ACV, tenant improvements, vacancy, water/flood extensions, BI coordination.
- **No V2 detail pairs** — cards only.
- **Categorical verbs** — "Protects," "Covers" without "may help" / "where purchased" hedging used on A-grade routes.
- **Equipment breakdown** — presented as core fourth state; on A-grade routes EB is hedged as optional endorsement (see restaurant).
- **Landlord state on property page** — architecture tension with dedicated `/landlord-insurance/` (personal/commercial landlord product page exists).
- **metaDescription** bundles *"business interruption"* — BI is separate product route; should coordinate, not imply bundled.
- **FAQ template note:** audit flags *"Shares 2+ FAQ pattern with auto-insurance"* — generic quote-info pattern risk.
- **Numerical statements:** none in body (safe).

---

### A2. `/business-interruption-insurance/`

**Source:** `src/data/product-pages/commercial-products-core.ts` (~433–524)  
**Explorer manifest:** `business-interruption-insurance` · archetype `commercial-building`

| Item | Current |
|------|---------|
| **PRODUCT NAME** | Business Interruption Insurance |
| **HERO COPY** | *"Helps replace lost income and cover ongoing expenses when a covered property loss forces your business to slow down or shut temporarily."* (22 words — trigger partially hedged) |
| **whoItIsFor** | Windsor–Essex businesses that would struggle with rent/payroll/loans after fire/flood/covered property loss |
| **Considerations** | 3 thin (~66w total): underlying property; waiting periods; indemnity period |
| **V2 detail pairs** | **None** |

| Explorer ID | Current title | Notes |
|-------------|---------------|-------|
| `lost-income` | Lost Income | *"**Can replace** net income… subject to waiting periods and policy limits."* |
| `continuing-expenses` | Continuing Expenses | *"**Helps pay** rent, payroll, loan payments…"* — broad, no non-continuing/expense-type hedge |
| `extra-expense` | Extra Expense | Reasonable; still lacks trigger restatement |
| `contingent-business-interruption` | Contingent Business Interruption | *"**May address** income loss when a key supplier or customer suffers a covered loss…"* — good hedge |

**Issues identified:**
- **Highest precision-risk route in batch** after condo statutory content.
- Hero uses "Helps" but subhead can still read as income replacement without emphasizing **physical damage trigger** every paragraph.
- **"Flood" in whoItIsFor** — overland flood is typically a separate endorsement in Ontario commercial property; "covered property loss" saves it but "fire, flood" pairing is imprecise.
- **No V2 pairs** — trigger mechanics need LEFT detail panels.
- **Considerations thin** — missing: coinsurance on BI values, ordinary payroll, dependent properties precision, utility/service interruption, civil authority, records/documentation, gross earnings vs profits forms.
- **FAQ count 4** — target 5; COVID FAQ is good precedent for infectious-disease exclusion.
- **No cross-precision** on CBI naming (supplier vs customer vs "dependent property").

---

### A3. `/small-business-insurance/`

**Source:** `src/data/product-pages/commercial-products-core.ts` (~19–110)  
**Explorer manifest:** `small-business-insurance` · archetype `commercial-building`

| Item | Current |
|------|---------|
| **PRODUCT NAME** | Small Business Insurance |
| **HERO COPY** | *"Core commercial coverages for Windsor-Essex small businesses — liability, property, and the endorsements that match how you actually operate."* (19 words) |
| **whoItIsFor** | Owner-operators, storefronts, home-based, growing teams |
| **Considerations** | 3 thin (~63w): home-based; contract requirements; scaling with growth |
| **V2 detail pairs** | **None** |

| Explorer ID | Current title | Notes |
|-------------|---------------|-------|
| `general-liability` | General Liability | *"**Helps protect** against third-party injury or property damage…"* |
| `commercial-property` | Commercial Property | Hedged with *"Intended to insure… subject to causes of loss, limits, deductibles, and policy terms."* — **best card in batch** |
| `commercial-auto` | Commercial Auto | *"**Addresses** vehicles used for business…"* — not every SMB owns vehicles |
| `business-interruption` | Business Interruption | *"**Can help replace** lost income if a **covered property loss** forces a temporary shutdown."* — good trigger hedge |

**Issues identified:**
- **Package page reads like four product blurbs** — does not yet teach assembly (BOP vs CPP vs separate policies).
- **Risk of near-duplicate with Commercial Property** if both pages list building/contents/EB without differentiation (see §H).
- **Commercial Auto as fixed 1-of-4** — valid for trades/delivery; less universal than cyber/crime/professional lines for office/service SMBs (Owner Decision C).
- **No cyber, crime, professional liability** mention in Explorer (acceptable if page stays coordination-focused, not exhaustive).
- **FAQ "Can I bundle?"** mentions BOP/package — good seed; needs precision that no universal package exists.

---

### A4. `/condominium-corporation-insurance/`

**Source:** `src/data/product-pages/commercial-products-industry.ts` (~625–699)  
**Explorer manifest:** `condominium-corporation-insurance` · archetype `commercial-building`

| Item | Current |
|------|---------|
| **PRODUCT NAME** | Condominium Corporation Insurance |
| **HERO COPY** | *"Master policy and liability coverage for condominium corporations — protecting common elements, shared systems, and the board's exposures."* (18 words) |
| **whoItIsFor** | Windsor-Essex condo boards, managers arranging master policies, residential/mixed-use |
| **Considerations** | **0** |
| **V2 detail pairs** | **None** |

| Explorer ID | Current title | Notes |
|-------------|---------------|-------|
| `master-property-policy` | Master Property Policy | *"**Covers** common elements, building structure, and shared systems…"* — absolute; no major-perils / standard-unit / improvements exclusion |
| `general-liability` | General Liability | *"**Addresses** injury claims in common areas…"* — should tie to s.102 occupier liability |
| `equipment-breakdown` | Equipment Breakdown | *"**Covers** sudden failure of boilers, elevators, and HVAC…"* — not statutory; reads mandatory |
| `directors-officers` | Directors & Officers | *"**Protects** board members against claims alleging wrongful governance…"* — s.39 nuance missing |

**Issues identified:**
- **Thinnest page in batch (277w)** — inadequate for Ontario statutory precision.
- **No Condominium Act citations** — statutory register required before implementation.
- **Corporation vs unit owner** FAQ is directionally correct but lacks standard-unit, improvements, deductible chargeback (s.105), and loss-assessment precision.
- **FAQ "Are special assessments covered?"** — imprecise: assessments arise when costs exceed insurance/recoveries; not a "coverage type."
- **D&O FAQ** says board "face personal liability" — true as exposure, but s.39 **requires** corporation to maintain insurance for directors/officers (if reasonably available) — currently undersells mandatory nature.
- **No link depth** to `/condo-insurance/` for unit-owner separation (related link exists — good).
- **CAO public materials** sometimes say "fire and flood" for major perils — **Act s.99(2) lists "water escape," not overland flood** — do not copy CAO imprecision.

---

## B. Commercial Property — research

### B1. What this product is

**[COVERAGE]** Commercial property insurance generally responds to **direct physical loss of or damage to** insured buildings, business personal property (contents), and sometimes other property interests (stock, equipment, tenant improvements), **subject to policy wording**, causes of loss, exclusions, limits, and deductibles.

**[COVERAGE — COMMON POLICY STRUCTURE]** Canadian commercial property is commonly written on:
- **Named perils** forms (specific listed perils), or
- **Broad / "all risks"** forms (all risks of direct physical loss except exclusions listed).

**Do not state** that all commercial property policies are "all risk" or that every cause of loss is covered.

**[COVERAGE]** Typical insurable interests:
- **Building** (owned structure or required by mortgage/lease)
- **Business personal property / contents** (furniture, equipment, inventory)
- **Tenant improvements / betterments** (leasehold improvements paid by tenant)
- **Property of others** / **equipment leased or held for others** (when scheduled/disclosed)
- **Property temporarily away from premises** (often sublimited — policy-specific)

**[COVERAGE — VALUATION]** Policies may settle on **replacement cost** or **actual cash value (ACV)** depending on form, endorsement, and property type. Replacement cost is common for commercial property but **not automatic** — confirm wording and any co-insurance / agreed-value requirements.

**[UNDERWRITING — COINSURANCE]** Many commercial property policies include a **coinsurance** clause (often 80%, 90%, or 100% of value). If declared limits fall below the required percentage of **replacement cost**, claim payments may be reduced proportionally — even partial losses. **[LEGAL/CONTRACTUAL]** This is policy structure, not statute (except condo corp replacement cost under s.99(7) — condo-only).

**[COVERAGE — EXTENSIONS NOT AUTOMATIC]**
- **Overland flood** — typically separate endorsement in Ontario; not part of standard major-perils condo statutory list.
- **Sewer backup / water damage** — may be limited, sublimited, or require endorsement.
- **Earthquake** — optional/subject to sublimits in most Ontario commercial programs.
- **Equipment breakdown (boiler & machinery)** — **separate endorsement or policy** on most commercial property programs; standard property forms often exclude mechanical/electrical breakdown (see current FAQ — directionally correct).

**[COVERAGE — VACANCY/UNOCCUPANCY]** Vacant or unoccupied buildings often face **reduced coverage or exclusions** after a specified number of days — disclose vacancy to broker.

**[COVERAGE — COMMERCIAL LANDLORD / LESSOR]** Owners who rent out commercial or residential units insurable as a landlord/investment property may need **landlord property**, **landlord liability**, and **rental income / loss of rents** coverage — related to but not identical to an operating business property program. Dedicated route: `/landlord-insurance/`.

**[COVERAGE — BI RELATIONSHIP]** Business interruption is **typically** purchased with or as an endorsement to commercial property — see §C. Property page should **coordinate**, not imply BI is included.

### B2. What belongs here vs adjacent routes

| Topic | This page | Adjacent route |
|-------|-----------|----------------|
| Building, contents, stock, tenant improvements | **Core** | — |
| Equipment breakdown | Mention as **optional** | Restaurant, manufacturing, condo corp pages |
| Business interruption | Coordinate only | `/business-interruption-insurance/` |
| Commercial landlord / rental income | Cross-link; optional Explorer state | `/landlord-insurance/` |
| Builder's risk / renovation | Not core | `/builders-risk-insurance/` |
| Flood / earthquake extensions | Considerations + hedge | Property page depth |

**No dedicated `/equipment-breakdown-insurance/` route** exists in site nav — EB is handled as endorsement across industry pages.

---

## C. Business Interruption — research

### C1. Terminology

**[COVERAGE]** Market terms include **business interruption (BI)**, **business income**, **loss of income**, **gross earnings**, and **profits forms** — **not interchangeable** in limit calculation or period of indemnity. Policy-specific.

### C2. The trigger (MOST IMPORTANT)

**[COVERAGE — COMMON POLICY STRUCTURE]** Standard Canadian commercial BI tied to property policies generally requires:
1. **Direct physical loss or damage** to insured property (or property of a dependent/interdependent party for CBI extensions),
2. Caused by a **covered peril** under the property policy,
3. Resulting in **necessary suspension** or interruption of operations during the **period of restoration / indemnity period**.

**[LEGAL]** Ontario Court of Appeal (*SIR Corp. v. Aviva*, 2023 ONCA 778) affirmed that **loss of use alone** (e.g., pandemic closure without physical damage) **does not** trigger standard property-linked BI.

**Do NOT state:**
- "Business interruption covers you whenever your business cannot operate."
- Revenue drop alone triggers coverage.
- Every shutdown is insured.

**[COVERAGE — EXTENSIONS / EXCEPTIONS]** Non-standard triggers may exist **only by endorsement** — examples to research in wording, not assert universally:
- **Civil authority** (access prohibited due to physical damage at adjacent property — policy-specific),
- **Utility / service interruption** (often requires endorsement; duration and distance limits),
- **Contingent / dependent properties** (named supplier, customer, or "leader" location — CBI),
- **Ingress/egress** extensions.

**[COVERAGE]** BI is **typically not standalone** — usually part of commercial property program (current FAQ correct).

### C3. Key mechanics

| Mechanic | Research note | Tag |
|----------|---------------|-----|
| **Waiting period (hours/days)** | BI often begins after a deductible/waiting period | [COVERAGE] |
| **Indemnity / restoration period** | Maximum weeks/months of coverage; must align with realistic rebuild | [COVERAGE] |
| **Continuing expenses** | Some fixed costs continue; others reduce (saved expenses offset BI) | [COVERAGE] |
| **Extra expense** | Additional costs to **reduce** the BI loss (temp location, expediting) — may pay even if > BI loss depending on form | [COVERAGE] |
| **Ordinary payroll** | Optional inclusion/exclusion of payroll during shutdown — material for labour-heavy firms | [COVERAGE] |
| **Coinsurance on BI values** | BI limits may be subject to coinsurance based on projected earnings — underinsurance reduces payout | [COVERAGE] |
| **Contingent BI** | Requires covered physical damage to **named dependent** property; not all supplier failures | [COVERAGE] |
| **Professional fees / CPAs** | Some forms cover accountant fees to establish BI loss | [COVERAGE] |
| **Infectious disease / pandemic** | Widely excluded post-COVID litigation; mention only as exclusion context | [COVERAGE] |

---

## D. Small Business — research

### D1. Page job

**[COVERAGE]** This is an **entry-point / coordination** page — not a single universal "small business policy."

**[COVERAGE — COMMON STRUCTURE]** Windsor–Essex SMB programs may be assembled through:
- **Business Owners Policy (BOP)** — bundled GL + property (eligibility/size limits apply),
- **Commercial package policy (CPP)** — modular GL, property, crime, etc.,
- **Separate policies / endorsements** — auto, cyber, professional liability, umbrella.

**[UNDERWRITING]** Typical quote inputs (vary by carrier):
- Operations / NAICS, revenue, payroll, employee count
- Premises (owned/leased, sq ft, construction, alarms)
- Property values (contents, inventory, improvements)
- Vehicles and radius
- Subcontractor use, products sold, professional services
- Prior claims, loss history
- U.S. sales or operations exposure
- Certificates / lease requirements

### D2. What the four Explorer states should teach

Each state = **category** (RIGHT) + **why an SMB might need it** (LEFT) — not "you automatically have all four."

| State | Coordination note |
|-------|-------------------|
| GL | Premises/operations/products BI-PD — often first line |
| Property | Contents, inventory, improvements — even leased |
| Commercial Auto | **If** business-owned or business-use vehicles |
| BI | **If** physical damage shutdown would threaten cash flow — links to BI page |

**Do not duplicate** Commercial Property depth (valuation, coinsurance, water extensions) — **link outward**.

---

## E. Condominium Corporation — research

### E1. Define the customer

**[REGULATORY]** This page is for **Ontario condominium corporations** (boards/managers placing **master** policies) — **NOT** individual unit owners (`/condo-insurance/`).

### E2. Corporation vs unit owner (boundary)

| Layer | Corporation (master) | Unit owner (individual policy) |
|-------|----------------------|--------------------------------|
| **Property** | Common elements + units to **standard unit** definition; major/other perils per declaration/by-laws; **replacement cost** (s.99(7)); **excludes improvements** (s.99(4)) | Improvements/betterments above standard unit; contents; personal property; loss assessment; deductible chargeback coverage |
| **Liability** | Occupier of common elements (s.102(a)); machinery/auto liability (s.102(b)) | Personal liability inside unit; occupier of unit |
| **D&O / board** | s.39 insurance for directors/officers (if reasonably available) | N/A — may purchase own unit policy |

**[LEGAL]** Standard unit defined per s.99(6): by-law under s.56(1)(h) **or** declarant schedule under s.43(5)(h) — **not** a standalone "O. Reg. 484/07" standard-unit regulation (that reg is unrelated — vehicle lights).

### E3. Equipment breakdown

**[COVERAGE]** Boilers, elevators, HVAC, pumps — significant corp exposure. **Not mandated** by Condominium Act. May be purchased as **equipment breakdown endorsement** if available — hedge on implementation.

### E4. D&O for condo boards

**[REGULATORY]** **s.39** — *"If the insurance is reasonably available, a corporation **shall** purchase and maintain insurance for the benefit of a director or officer…"* against matters in s.38(1)(a)/(b), **except** breach of duty to act honestly and in good faith.

**[COVERAGE]** This is **statutory insurance requirement** (when reasonably available) — functionally similar to D&O products but **do not blindly copy** corporate `/directors-officers-insurance/` A-grade copy (non-profit/governance allegations differ).

**[LEGAL]** s.38 permits **indemnification** by by-law — separate from insurance but related.

---

## F. Ontario Condominium Act — statutory claim register

Primary source: *Condominium Act, 1998*, S.O. 1998, c. 19 (Ontario e-Laws, current consolidation). CAO materials used for plain-language cross-check only — **Act controls** where CAO oversimplifies (e.g., "flood").

| CLAIM | ACT/REGULATION | SECTION | EXACT SUPPORT (summary) | CURRENT AS OF | MANDATORY | WHO MUST COMPLY | INSURANCE OR LEGAL | SAFE TO PUBLISH | HEDGE | PROPOSED VISITOR WORDING |
|-------|----------------|---------|------------------------|---------------|-----------|-----------------|-------------------|-----------------|-------|--------------------------|
| Corporation must maintain property insurance for units & common elements against major perils (+ other perils in declaration/by-laws) | Condominium Act, 1998 | **s.99(1)** | *"The corporation shall obtain and maintain insurance… for damage to the units and common elements that is caused by major perils or the other perils that the declaration or the by-laws specify."* | 2026-09-09 | **Yes** | Condominium corporation | **Insurance** | Yes | Note declaration/by-law perils | Ontario condominium corporations must maintain property insurance for damage to units and common elements caused by **major perils**, plus any **additional perils** specified in the corporation's declaration or by-laws. |
| "Major perils" defined | Condominium Act, 1998 | **s.99(2)** | Fire, lightning, smoke, windstorm, hail, explosion, **water escape**, strikes, riots/civil commotion, impact by aircraft/vehicles, vandalism/malicious acts | 2026-09-09 | Definitional | — | **Legal** | Yes | Do not say "flood" as major peril | Major perils include fire, lightning, smoke, windstorm, hail, explosion, **water escape**, and other listed perils in the Act — **not** the same as optional overland flood coverage in many commercial policies. |
| Insurance excludes improvements to units | Condominium Act, 1998 | **s.99(4)** | *"The obligation to insure… does **not** include insurance for damage to improvements made to a unit."* | 2026-09-09 | **Yes** (scope limit) | Corporation | **Insurance/Legal** | Yes | Tie to standard unit | The master policy insures units to the **standard unit** definition — **not** owner-installed improvements or betterments above that standard. |
| Standard unit determination | Condominium Act, 1998 | **s.99(6)** | By-law under s.56(1)(h) **or** declarant schedule s.43(5)(h) | 2026-09-09 | Conditional | Corporation | **Legal** | Yes | Corporation-specific | What counts as a **standard unit** is set out in the corporation's **standard-unit by-law** or the **declarant's schedule** if no by-law exists. |
| Replacement cost required | Condominium Act, 1998 | **s.99(7)** | *"Subject to a reasonable deductible, the insurance… shall cover the **replacement cost** of the property damaged…"* | 2026-09-09 | **Yes** | Corporation | **Insurance** | Yes | Reasonable deductible | Statutory property insurance must cover **replacement cost** of damaged property (subject to a **reasonable deductible**). |
| Faulty material/workmanship exclusion ineffective | Condominium Act, 1998 | **s.99(3)** | Exclusion ineffective for damage from faulty/improper material, workmanship, design that would otherwise be insured | 2026-09-09 | **Yes** | Corporation/insurer | **Legal** | Yes — technical | Optional depth | Certain exclusions for faulty workmanship/design may be ineffective for otherwise-insured damage — policy/legal review applies. |
| 60-day termination notice to corporation and insurance trustee | Condominium Act, 1998 | **s.99(9)** | Deemed policy clause: insurer cannot terminate without 60 days registered notice to corporation and **insurance trustee, if any** | 2026-09-09 | Deemed term | Insurer/corporation | **Insurance** | Yes | "if any" trustee | Master policies must include minimum notice periods before insurer cancellation — the corporation's insurance trustee (if appointed) receives notice. |
| Proceeds use for repair/replacement | Condominium Act, 1998 | **s.100(2)** | Corporation shall promptly use proceeds to repair/replace damaged units and common elements (unless termination vote s.123) | 2026-09-09 | **Yes** | Corporation | **Legal** | Yes | Unless termination vote | Insurance proceeds are generally applied to repair or replace damaged units and common elements unless owners vote to terminate under the Act. |
| Small-loss proceeds (<15% RC) paid to corporation | Condominium Act, 1998 | **s.100(1)** | If proceeds <15% of replacement cost, insurer pays corporation or specified person | 2026-09-09 | **Yes** | Insurer | **Insurance** | Optional | Threshold detail | For smaller losses, the Act directs how insurers pay proceeds — your broker can explain how this applies to your master policy. |
| Occupier + machinery/auto liability insurance | Condominium Act, 1998 | **s.102** | (a) occupier liability for common elements/land; (b) ownership/use of boilers, machinery, pressure vessels, motor vehicles | 2026-09-09 | **Yes** | Corporation | **Insurance** | Yes | Policy terms apply | Corporations must maintain **general liability** insurance for common-element occupier exposure and for certain **machinery and motor vehicle** liabilities. |
| Corporation deemed occupier of common elements | Condominium Act, 1998 | **s.26(1)** (occupier context) / common law | Unit owners not occupiers of common elements — corporation is | 2026-09-09 | **Yes** | Corporation | **Legal** | Yes | — | The corporation — not individual owners — is generally the **occupier** of common elements for liability purposes. |
| Deductible is common expense | Condominium Act, 1998 | **s.105(1)** | Portion of loss excluded by deductible clause = **common expense** | 2026-09-09 | **Yes** | Corporation (owners fund) | **Legal/Insurance** | Yes | — | The master policy **deductible** is generally treated as a **common expense** of the corporation. |
| Owner chargeback for damage from unit (act/omission) | Condominium Act, 1998 | **s.105(2)** | Lesser of repair cost or deductible limit added to owner's common expenses | 2026-09-09 | **Yes** (when conditions met) | Owner (source unit) | **Legal** | Yes | Act/omission of owner/lessee/resident | An owner may be charged back up to the **deductible** (or repair cost, if lower) when damage to their unit arises from an act or omission of the owner, lessee, or occupant with permission/knowledge. |
| Extended chargeback by by-law | Condominium Act, 1998 | **s.105(3)** | Corporation **may pass by-law** to extend chargeback circumstances | 2026-09-09 | Optional by-law | Corporation | **Legal** | Yes | If by-law enacted | Corporations may pass an **insurance deductible by-law** extending chargeback rules for damage to other units or common elements — review your corporation's by-laws. |
| Owner insurable interest in chargeback | Condominium Act, 1998 | **s.105(4)** | Chargeback amount = insurable interest of owner | 2026-09-09 | **Yes** | Owner | **Insurance** | Yes | Unit owner policy | Amounts an owner may owe under chargeback rules may be insurable under a **unit owner policy** — confirm limits with your broker. |
| Insurance information notice to owners | Condominium Act, 1998 | **s.105.1** | Board shall provide owners notice re insurance under ss.39, 99, 102, 105 per regulations | 2026-09-09 | **Yes** | Corporation board | **Regulatory** | Yes | Per regulations | Boards must provide owners with **prescribed insurance information** — ask management for the corporation's latest insurance certificate summary. |
| Director/officer insurance required if reasonably available | Condominium Act, 1998 | **s.39** | *"If the insurance is reasonably available, a corporation **shall** purchase and maintain insurance for the benefit of a director or officer…"* | 2026-09-09 | **Yes** (conditional) | Corporation | **Insurance** | Yes | "If reasonably available"; good-faith exclusion | Corporations must maintain **directors' and officers' liability insurance** for board members **if reasonably available** — excluding losses from breach of the duty to act **honestly and in good faith**. |
| Indemnification by corporation (by-law) | Condominium Act, 1998 | **s.38** | By-laws may indemnify directors/officers except breach of honest/good faith duty | 2026-09-09 | Permissive | Corporation | **Legal** | Yes | By-law dependent | Corporation by-laws may **indemnify** directors and officers for certain governance costs — separate from insurance policy wording. |
| Act prevails over conflicting policy provisions | Condominium Act, 1998 | **s.106** | If Insurance Act or policy conflicts with Act, **Act applies** | 2026-09-09 | **Yes** | All | **Legal** | Optional | — | Where the Condominium Act conflicts with policy wording, the **Act prevails**. |
| Double coverage / no contribution rules | Condominium Act, 1998 | **s.101** | Master policy not "other insurance" for unit owner policy to that extent; no reciprocal contribution except between s.99 policies | 2026-09-09 | **Yes** | Corporation/owners | **Insurance** | Optional | — | Master and unit policies are coordinated under the Act — unit policies typically cover gaps above the standard unit. |
| Insurance certificate to corporation | Condominium Act, 1998 | **s.104** | Insurer shall provide certificate/memorandum of coverage | 2026-09-09 | **Yes** | Insurer | **Insurance** | Yes | — | Insurers must provide the corporation with a **certificate of insurance** describing coverage carried for owners. |
| Standard-unit by-law power | Condominium Act, 1998 | **s.56(1)(h)** | Board may make by-law establishing standard unit for repair/insurance responsibility | 2026-09-09 | Permissive | Corporation board | **Legal** | Yes | — | Boards may pass a **standard-unit by-law** defining which unit components the corporation insures vs owners. |

**NOT supported / do not publish as statutory:**
- "O. Reg. 484/07" standard unit — **wrong regulation** (vehicle lights).
- "Major perils includes overland flood" — **not in s.99(2)**.
- "Equipment breakdown is required by the Act" — **not supported**.
- "Every corporation must carry a $X deductible" — **amount not in Act** (must be reasonable).
- "Appraisal every 3 years required by Act" — **not in Act** (industry best practice; declaration may specify).

---

## G. Authoritative sources

| Source | URL / reference | Use |
|--------|-----------------|-----|
| **Condominium Act, 1998**, S.O. 1998, c. 19 | https://www.ontario.ca/laws/statute/98c19 | ss.38, 39, 99–106, 56(1)(h), 43(5)(h) |
| **Condominium Authority of Ontario — Insurance** | https://www.condoauthorityontario.ca/before-you-buy-or-rent-a-condo/fees-and-finances/insurance/ | Plain language; verify against Act |
| **CAO Guide to Annual Condo Act Requirements (2024)** | https://www.condoauthorityontario.ca/wp-content/uploads/2023/04/CAO-Guide-to-Annual-Condo-Act-Requirements_2024_04_11.pdf | ss.39, 99, 102 compliance overview |
| **IBC — Types of business coverage (BI)** | https://www.ibc.ca/insurance-basics/business/types-of-business-insurance-coverage | BI trigger, gross earnings vs profits |
| **IBC — Properly insured (coinsurance)** | https://www.ibc.ca/news-insights/in-focus/are-you-properly-insured-what-small-businesses-can-learn-from-a-tragic-loss | Coinsurance penalty example |
| **Chubb Canada — BI basics** | https://www.chubb.com/ca-en/businesses/resources/business-interruption-insurance-coverage-basics.html | Waiting period, civil authority extension |
| ***SIR Corp. v. Aviva*, 2023 ONCA 778** | https://www.cwilson.com/policies-after-the-pandemic-covid-19-is-still-not-property-damage/ | Physical damage trigger |
| **CCI — Insurance & damage responsibility** | https://cci.ca/resource-centre/view/1754 | Deductible by-laws, standard unit repairs |
| **O. Reg. 48/01** (General, under Condominium Act) | https://www.ontario.ca/laws/regulation/r01048 | Declarant schedules; **not** standard-unit dollar rules |

---

## H. Cross-page differentiation matrix

| | **Commercial Property** | **Business Interruption** | **Small Business** | **Condo Corporation** |
|--|-------------------------|---------------------------|--------------------|-----------------------|
| **PRIMARY CUSTOMER** | Business insuring **premises & property** (owner or tenant) | Business needing **income/expense protection** after property loss | **SMB entry point** — owner-operator coordination | **Ontario condo corporation** (master policy) |
| **PAGE JOB** | Deep **property** mechanics: building, contents, valuation, extensions, landlord cross-link | Deep **BI trigger & time** mechanics: waiting period, indemnity period, CBI | Explain **how coverage is assembled** — not one universal policy | **Statutory master policy** + unit-owner boundary + board insurance |
| **CORE COVERAGE** | Commercial property (building, contents, stock, TIs) | Business interruption / extra expense (property-linked) | GL + property + optional auto + BI **categories** | s.99 property + s.102 liability + s.39 board insurance |
| **ADJACENT COVERAGE** | EB endorsement, BI, crime, cyber, umbrella | Property, extra expense, CBI, utility endorsements | Cyber, crime, PL, product liability, umbrella | EB endorsement, umbrella, fidelity (if applicable) |
| **PROPERTY ROLE** | **Hero** | Supporting trigger prerequisite | One of four **categories** | **Hero** (master policy / standard unit) |
| **BI ROLE** | Coordinate / link | **Hero** | Category + link | Minimal (corp income N/A — mention loss of use of amenities only indirectly) |
| **LIABILITY ROLE** | Minimal (premises via GL elsewhere) | None | GL category | **s.102 occupier** liability |
| **AUTO ROLE** | None | None | **Fixed Explorer state** — not universal | s.102(b) corp-owned vehicles |
| **D&O ROLE** | None | None | None | **s.39 statutory** board insurance state |
| **REGULATORY ROLE** | Lease/mortgage; fire code occupancy | None (contractual indemnity only) | Home-based zoning; contract certs | **Condominium Act** primary |
| **WHAT DOES NOT BELONG** | Deep BI indemnity math; condo statutory tables | Building valuation tables; condo master policy | Exhaustive industry list; duplicate property depth | Unit-owner **personal** condo policy detail (link only) |
| **BEST CROSS-LINKS** | BI, Small Business, Landlord, Builders Risk | Commercial Property, Manufacturing, Restaurant | Commercial Property, BI, Commercial Auto, Cyber | `/condo-insurance/`, Property Management, D&O (reference), Commercial Property |
| **EXPLORER PURPOSE** | Property interest segments (building, contents, EB, owner/lessor) | BI component segments (income, expenses, extra expense, contingent) | Four **broad SMB categories** | Four **corp program pillars** (master, GL, EB, board) |

**Anti-duplication rule:** Commercial Property owns **valuation, perils, coinsurance, tenant improvements**. Small Business owns **assembly/coordination**. BI owns **trigger, time, and financial continuation**. Condo owns **statutory master vs unit owner**.

---

## I. Explorer V2 plan (16 states — IDs preserved)

### `/commercial-property-insurance/`

| STATE ID | CURRENT TITLE | KEEP / RETITLE / FLAG | PROPOSED VISITOR TITLE | SHORT LABEL | RIGHT (what) | DETAIL TITLE (LEFT) | LEFT (why) | FACTUAL CAUTION |
|----------|---------------|----------------------|------------------------|-------------|--------------|---------------------|------------|-----------------|
| `building-coverage` | Building Coverage | **KEEP** | Building Coverage | Building | May help repair/rebuild insured building structure after **covered direct physical loss**, subject to causes of loss, limits, deductibles | A fire doesn't pause your mortgage | Owned buildings and required lease/mortgage interests concentrate value in walls, roof, and attached improvements — valuation and co-insurance affect how much is recovered | Do not imply all-risk; hedge "covered" |
| `contents-equipment` | Contents & Equipment | **KEEP** | Contents & Business Property | Contents | May help cover furniture, equipment, inventory, and stock for **covered physical loss**, subject to schedules and limits | Your landlord's policy doesn't cover your desks | Tenants and owners both insurable interest in contents; landlord shell vs tenant property split | Tenant vs owner disclosure |
| `equipment-breakdown` | Equipment Breakdown | **RETITLE** (optional) → "Equipment Breakdown (Endorsement)" | Equipment Breakdown | Breakdown | **Where purchased**, may address certain mechanical/electrical failure losses **not covered by base property forms** | A failed compressor can stop production without fire | EB is typically **endorsement/separate** — restaurant/manufacturing pattern | Do not imply included in base property |
| `commercial-landlord-property-owner` | Commercial Landlord / Property Owner | **FLAG FOR OWNER REVIEW** — keep ID | Commercial Property Owner / Lessor | Owner/Lessor | May help address **building, landlord liability, and loss of rental income** for owners who rent property to tenants — **where purchased** | Rent cheques stop when the building is shut down | Overlaps `/landlord-insurance/` — use as cross-link segment, not second landlord product page | Distinct from tenant business property; owner decision A |

### `/business-interruption-insurance/`

| STATE ID | CURRENT TITLE | KEEP / RETITLE / FLAG | PROPOSED VISITOR TITLE | SHORT LABEL | RIGHT | DETAIL TITLE | LEFT | FACTUAL CAUTION |
|----------|---------------|----------------------|------------------------|-------------|-------|--------------|------|-----------------|
| `lost-income` | Lost Income | **KEEP** | Lost Business Income | Income | May help replace **net income/profits** during necessary suspension after **covered direct physical loss** to insured property, subject to waiting period and indemnity period | Revenue doesn't pause when the doors close | BI responds to **financial impact**, not the repair bill itself | Trigger in every card |
| `continuing-expenses` | Continuing Expenses | **KEEP** | Continuing Expenses | Expenses | May help pay **certain fixed costs** (e.g., rent, debt service, some payroll) that continue during shutdown, subject to policy definitions and saved-expense offsets | Rent and loan payments don't wait for repairs | Not all expenses continue; **ordinary payroll** treatment varies | Do not say "all continuing expenses" |
| `extra-expense` | Extra Expense | **KEEP** | Extra Expense | Extra Exp. | May help pay **additional costs** to reduce the BI loss or resume operations faster (temp space, expediting), subject to limits | A temporary location can cost more than staying shut | Extra expense may apply even when costs exceed lost income — **form-dependent** | — |
| `contingent-business-interruption` | Contingent Business Interruption | **KEEP** (precision) | Contingent Business Interruption | Contingent | **Where purchased**, may address income loss when a **named supplier, customer, or dependent property** suffers **covered direct physical loss**, subject to endorsements | Your key supplier's fire can idle your line | CBI is **not** all supply-chain disruption — named property and covered peril required | Owner decision B |

### `/small-business-insurance/`

| STATE ID | CURRENT TITLE | KEEP / RETITLE / FLAG | PROPOSED VISITOR TITLE | SHORT LABEL | RIGHT | DETAIL TITLE | LEFT | FACTUAL CAUTION |
|----------|---------------|----------------------|------------------------|-------------|-------|--------------|------|-----------------|
| `general-liability` | General Liability | **KEEP** | General Liability | GL | May help respond to certain **third-party bodily injury and property-damage** claims from operations/premises/products, subject to policy terms | A customer slip-and-fall is often a GL claim | First line for many SMBs with public contact | Not professional errors |
| `commercial-property` | Commercial Property | **KEEP** | Commercial Property | Property | May help cover **contents, inventory, and tenant improvements** for covered physical loss — where purchased | Stolen laptops aren't a liability claim | Link to Commercial Property page for depth | Coordination not duplication |
| `commercial-auto` | Commercial Auto | **FLAG FOR OWNER REVIEW** | Commercial Auto | Auto | May help address **owned or leased business vehicles** and liability arising from business use, subject to Ontario auto rules | Delivery vans create a separate auto policy conversation | Not every SMB owns vehicles — Owner decision C | Cross-link `/commercial-auto-insurance/` |
| `business-interruption` | Business Interruption | **KEEP** | Business Interruption | BI | **Where purchased with property**, may help with income and certain expenses after **covered direct physical loss**, subject to waiting periods | Could you pay rent if a fire closed you for three months? | Link to BI page; trigger required | Not standalone income insurance |

### `/condominium-corporation-insurance/`

| STATE ID | CURRENT TITLE | KEEP / RETITLE / FLAG | PROPOSED VISITOR TITLE | SHORT LABEL | RIGHT | DETAIL TITLE | LEFT | FACTUAL CAUTION |
|----------|---------------|----------------------|------------------------|-------------|-------|--------------|------|-----------------|
| `master-property-policy` | Master Property Policy | **KEEP** | Master Property (s.99) | Master | Corporation must maintain insurance for units and common elements against **major perils** (+ declared perils) to **replacement cost**, **excluding unit improvements** above the **standard unit** | A pipe burst can reach units and corridors at once | Cite s.99(1),(4),(7); **not** overland flood as statutory major peril | Statutory precision |
| `general-liability` | General Liability | **KEEP** | Common Element Liability (s.102) | GL | Corporation must maintain liability insurance as **occupier** of common elements and for certain **machinery/motor vehicle** exposures | A slip-and-fall in the parking garage is a corporation exposure | Tie to s.102 — not unit owner occupier | — |
| `equipment-breakdown` | Equipment Breakdown | **KEEP** (hedge) | Equipment Breakdown | Breakdown | **Where purchased**, may help address sudden failure of boilers, elevators, HVAC, and pressure equipment serving the corporation | An elevator outage affects every floor | **Not statutory** — optional endorsement | Do not imply in all master policies |
| `directors-officers` | Directors & Officers | **KEEP** | Directors & Officers (s.39) | D&O | Corporation **must** maintain insurance for directors/officers **if reasonably available**, for governance-related liabilities except **bad-faith breaches** | A board decision can still draw a personal claim | s.39 mandatory (conditional); distinguish from corporate D&O page copy | Owner decision D |

---

## J. Practical considerations plan (~6–8 each)

### Commercial Property
1. **Owned vs leased premises** — building vs contents/TIs [CONTRACTUAL/COVERAGE]
2. **Replacement cost vs ACV and stated values** [COVERAGE]
3. **Coinsurance and underinsurance penalties** [COVERAGE]
4. **Tenant improvements and betterments** [COVERAGE/CONTRACTUAL]
5. **Water escape, sewer backup, overland flood, earthquake** — extensions not automatic [COVERAGE]
6. **Vacancy and unoccupancy** [UNDERWRITING/COVERAGE]
7. **Equipment breakdown coordination** [COVERAGE]
8. **Business interruption link** — property trigger prerequisite [COVERAGE]

### Business Interruption
1. **Covered physical loss trigger** [COVERAGE]
2. **Waiting periods** [COVERAGE]
3. **Indemnity / restoration period length** [COVERAGE]
4. **Continuing expenses vs saved expenses / ordinary payroll** [COVERAGE]
5. **Extra expense vs loss reduction** [COVERAGE]
6. **Dependent/contingent properties** [COVERAGE]
7. **Utility or civil authority extensions** — if purchased [COVERAGE]
8. **Financial records for proof of loss** [UNDERWRITING]

### Small Business
1. **Operations and industry class** [UNDERWRITING]
2. **Premises — owned, leased, home-based** [EXPOSURE/CONTRACTUAL]
3. **Property and inventory values** [UNDERWRITING]
4. **General liability and contracts** [CONTRACTUAL]
5. **Vehicles and business use** [COVERAGE]
6. **Products vs professional services** [EXPOSURE]
7. **Cyber and data for offices** [COVERAGE] — brief, link cyber page
8. **Subcontractors and certificates** [CONTRACTUAL]

### Condo Corporation
1. **Standard unit definition (s.56 / s.43 schedule)** [REGULATORY]
2. **Replacement cost and insurable values** [REGULATORY/COVERAGE]
3. **Master policy deductible as common expense (s.105(1))** [REGULATORY]
4. **Chargebacks and insurance deductible by-law (s.105(2)(3))** [REGULATORY]
5. **Unit-owner policy coordination (s.101)** [REGULATORY/COVERAGE]
6. **Equipment breakdown for shared systems** [COVERAGE]
7. **Board D&O / s.39 insurance** [REGULATORY/COVERAGE]
8. **Repair obligations after insured loss (s.100)** [REGULATORY]

---

## K. FAQ plan (~5 each — questions only; answers after implementation research)

### Commercial Property
1. What does commercial property insurance cover?
2. Does it cover inventory and equipment?
3. What if I lease my premises?
4. Is equipment breakdown included automatically?
5. How are property limits and values determined?

### Business Interruption
1. What triggers business interruption coverage?
2. Is BI automatically included with commercial property?
3. What is an indemnity period (period of restoration)?
4. What is contingent business interruption?
5. What information is needed to quote BI?

### Small Business
1. What insurance does a small business need?
2. Is there one package that includes everything?
3. Do I need commercial auto?
4. What if I run a business from home?
5. What information is needed for a quote?

### Condo Corporation
1. What does the corporation's master policy insure?
2. What does each unit owner insure separately?
3. What is a standard unit?
4. How do master policy deductibles affect unit owners?
5. Does a condo corporation need directors and officers insurance?

---

## L. Numeric / legal / coverage claim register (cross-route)

| ROUTE | CLAIM | TYPE | SOURCE | SOURCE DATE | EXACT SUPPORT | SAFE | HEDGE | ACTION |
|-------|-------|------|--------|-------------|---------------|------|-------|--------|
| Condo | Replacement cost required for s.99 property insurance | Regulatory | s.99(7) | 2026-09-09 | Act text | Yes | Reasonable deductible | **KEEP** |
| Condo | Major perils list includes water escape (not overland flood) | Regulatory | s.99(2) | 2026-09-09 | Act text | Yes | Do not equate to flood endorsement | **KEEP** |
| Condo | D&O insurance required if reasonably available | Regulatory | s.39 | 2026-09-09 | Act text | Yes | If reasonably available; good-faith carve-out | **KEEP** |
| Condo | Deductible = common expense | Regulatory | s.105(1) | 2026-09-09 | Act text | Yes | — | **KEEP** |
| Condo | Owner chargeback up to deductible | Regulatory | s.105(2) | 2026-09-09 | Act text | Yes | Act/omission conditions | **KEEP** |
| Condo | 15% of RC small-loss proceeds rule | Regulatory | s.100(1) | 2026-09-09 | Act text | Optional depth | — | **KEEP** (optional FAQ) |
| Condo | 60-day cancellation notice | Regulatory | s.99(9) | 2026-09-09 | Act text | Yes | Insurance trustee if any | **KEEP** (low priority) |
| Property | Coinsurance 80–100% penalty example | Coverage | IBC/industry | 2026 | Illustrative | Yes | Policy-dependent % | **KEEP** (hedged) |
| Property | Overland flood not automatic | Coverage | IBC/Ontario market | 2026 | Market practice | Yes | Where purchased | **KEEP** |
| BI | Physical damage trigger | Coverage/Legal | IBC; *SIR Corp.* | 2023 | Case + IBC | Yes | Most property-linked forms | **KEEP** |
| BI | 12-month indemnity period example | Coverage | IBC | 2026 | "Usually 12 months" | Yes | Policy-specific | **KEEP** (hedged) |
| BI | COVID/pandemic generally excluded | Coverage | Market post-2020 | 2026 | Litigation outcomes | Yes | Standard property-BI | **KEEP** |
| SMB | BOP/package exists | Coverage | Market | 2026 | Common structure | Yes | Eligibility limits | **KEEP** |
| All | Universal "all risk" property | — | — | — | Not supported | No | — | **OMIT** |
| All | "$X minimum property limit" | — | — | — | Not found | No | — | **OMIT** |
| Condo | CAO "fire and flood" as major perils | — | CAO web | 2026 | Conflicts with s.99(2) | No | — | **OMIT** (use water escape) |

---

## M. Unsupported / risky claims to avoid

1. **All commercial property policies are "all risk."**
2. **Every cause of loss is covered** (fire, flood, earthquake, sewer, theft universally).
3. **Replacement cost is automatic** on all property forms.
4. **Equipment breakdown is included** in standard commercial property.
5. **Business interruption applies whenever the business cannot operate** (market downturn, pandemic, licence suspension without property damage).
6. **Every supplier/customer failure triggers CBI.**
7. **Government closure always triggers BI** without physical damage (unless specific endorsement).
8. **Small business package includes everything.**
9. **Every small business needs commercial auto.**
10. **Condo master policy covers owner improvements and contents.**
11. **Overland flood is a Condominium Act "major peril."** (Act: **water escape**)
12. **D&O is purely optional for Ontario condo corporations.** (s.39: **shall** if reasonably available)
13. **Special assessments are a "coverage type"** — assessments are funding mechanism when costs exceed recoveries.
14. **O. Reg. 484/07 defines standard units** — wrong regulation.

---

## N. Owner decisions (pre-implementation)

### A. Commercial Property — `commercial-landlord-property-owner` state

**Question:** Should this remain a core Explorer state, or swap for a more universally commercial-property concept (e.g., tenant improvements, catastrophe extensions, loss of rents as endorsement)?

**Research recommendation:** **KEEP ID** — retitle visitor copy to **Commercial Property Owner / Lessor**, hedge heavily, **cross-link `/landlord-insurance/`**, clarify this page remains **operating business + commercial owner** coordination — not duplicate landlord product page. **FLAG FOR OWNER REVIEW** if owner prefers removing lessor segment entirely.

### B. Business Interruption — `contingent-business-interruption`

**Question:** Are all four Explorer concepts accurate/useful?

**Research recommendation:** **YES — KEEP ALL FOUR IDs.** CBI remains valid but needs **highest precision** (named dependent, covered physical damage, endorsement). Consider visitor retitle to **Contingent / Dependent Properties** while preserving ID.

### C. Small Business — `commercial-auto` as fixed Explorer state

**Question:** Keep Commercial Auto as 1-of-4, or substitute broader exposure (cyber, crime)?

**Research recommendation:** **KEEP ID** for now — auto is a distinct mandatory line for many Windsor–Essex SMBs (trades, delivery, service vans). Implementation should **hedge** ("if your business owns or uses vehicles") and consider **cyber** in considerations/FAQ, not Explorer, unless owner swaps state.

### D. Condo Corporation — four states + D&O as core

**Question:** Are all four states appropriate? Does D&O belong as core?

**Research recommendation:** **YES — all four IDs appropriate.** D&O state is **statutorily grounded (s.39)** and should remain core — but copy must reflect **condo s.39 insurance**, not generic corporate D&O page. EB state stays **optional/endorsement** language.

---

## O. Proposed implementation scope

**Target grade:** A (~1000–1300+ substantive words per route)  
**Pattern:** Batch A / restaurant / warehousing — V2 detail pairs, 6–8 expandable considerations, 5 hedged FAQs, trust band, geo Windsor–Essex.

| Route | Primary source file | Est. word target |
|-------|---------------------|------------------|
| Commercial Property | `src/data/commercial-industries.ts` | ~1100–1300 |
| Business Interruption | `src/data/product-pages/commercial-products-core.ts` | ~1200–1400 (precision-heavy) |
| Small Business | `src/data/product-pages/commercial-products-core.ts` | ~1100–1300 |
| Condo Corporation | `src/data/product-pages/commercial-products-industry.ts` | ~1200–1400 (statutory-heavy) |

**Likely shared touch:**
- `src/lib/buildPilotProductConfig.ts` — expandable considerations variant for batch routes (if not already generic).

**Do NOT change in implementation without owner approval:**
- Explorer IDs, images, manifest zones, scanner rules, frozen Batch A routes.

---

## P. Expected files to change (implementation phase only)

| File | Purpose |
|------|---------|
| `src/data/commercial-industries.ts` | Commercial Property content |
| `src/data/product-pages/commercial-products-core.ts` | Small Business + Business Interruption |
| `src/data/product-pages/commercial-products-industry.ts` | Condominium Corporation |
| `src/lib/buildPilotProductConfig.ts` | Considerations variant / trust band if needed |
| `scripts/verify-grade-c-batch-b.cjs` | Batch verifier (new, QA) |
| `docs/grade-c-batch-b-property-income-implementation-2026-09-09.md` | Implementation report (Phase 2) |
| QA screenshots under `docs/qa-screenshots/grade-c-batch-b-2026-09-09/` | Visual verification |

**NOT expected:** Explorer manifest, images, runtime, scanner, navigation, Batch A sources.

---

## READY FOR IMPLEMENTATION

**YES** — pending owner decisions on §N (especially **A: landlord Explorer state** and **C: commercial auto**).

---

**STOP FOR OWNER REVIEW** — do not merge, deploy, or modify production copy until approved.
