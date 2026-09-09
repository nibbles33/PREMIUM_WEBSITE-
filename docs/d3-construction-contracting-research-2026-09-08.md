# D3 Construction & Contracting — Phase 1 Research + Content Architecture

**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Baseline HEAD:** `09f83f4` (Transportation precision fix)  
**Research date:** 2026-09-08  
**Phase:** RESEARCH ONLY — no page copy implementation  
**Isolated worktree:** `/tmp/PREMIUM_WEBSITE-d3-transportation`

---

## Worktree verification (Step 0)

| Check | Result |
|-------|--------|
| **WORKTREE PATH** | `/tmp/PREMIUM_WEBSITE-d3-transportation` |
| **BRANCH** | `cursor/coverage-explorer-ux-v2-2026-09-07` |
| **HEAD** | `09f83f4` |
| **HEAD includes 09f83f4** | YES |
| **WORKTREE STATUS** | **Not fully clean** — one pre-existing modified QA screenshot (`docs/qa-screenshots/coverage-explorer-ux-v2-2026-09-07/restaurant-desktop_1440.png`) unrelated to this research. No source changes made. Primary carrier worktree untouched. |

---

## A. Current-state audit (four routes)

Audit source: `docs/product-content-audit-2026-09-07.md` + `docs/qa-screenshots/product-content-audit-2026-09-07/audit-data.json` @ HEAD `09f83f4`.

### Summary table

| Route | Grade | Substantive words | HIGH | MEDIUM | LOW | Considerations | FAQ count | V2 detail pairs |
|-------|-------|------------------:|-----:|-------:|----:|----------------|----------:|-----------------|
| `/builders-risk-insurance/` | **D** | 292 | 2 | 0 | 0 | 0 | 4 | **None** |
| `/bonding-insurance/` | **D** | 448 | 0 | 3 | 1 | 0 | 5 | **None** |
| `/contractors-insurance/` | **D** | 345 | 1 | 0 | 0 | 0 | 5 | **None** |
| `/builders-developers-insurance/` | **D** | 380 | 1 | 0 | 0 | 0 | 5 | **None** |

All four routes: shallow depth, no practical considerations, no Explorer V2 `detailTitle`/`detailDescription` split, generic hero copy, duplicated builder's-risk concepts across pages.

---

### 1. `/builders-risk-insurance/`

**Source file:** `src/data/product-pages/commercial-products-industry.ts` (slug `builders-risk-insurance`)

#### Classification flags

| Severity | Field | Issue |
|----------|-------|-------|
| **HIGH** | `coverageIntro` | Flat guarantee: "Builder's risk covers the project itself during construction" |
| **HIGH** | `coverage:Work in Progress` | Flat guarantee: "Covers the structure and installed materials…" |

#### Hero

- **Headline:** Builder's Risk Insurance
- **Subhead:** Project-specific property coverage while construction or major renovation is underway — protecting materials and work in progress.

#### Coverage Explorer (4 states — no V2 detail pairs)

| # | State ID | Title | shortLabel | detailTitle | detailDescription | Image zones |
|---|----------|-------|------------|-------------|-------------------|-------------|
| 0 | `work-in-progress` | Work in Progress | *(auto: Work)* | — | — | active-build, scaffold-zone |
| 1 | `materials-on-site-in-transit` | Materials On Site & In Transit | *(auto: Materials)* | — | — | material-stack, active-build, site-perimeter |
| 2 | `soft-costs` | Soft Costs | *(auto: Soft)* | — | — | trailer-office, active-build |
| 3 | `existing-structure` | Existing Structure | *(auto: Existing)* | — | — | active-build, scaffold-zone |

**Image mappings:** `builders-risk-insurance-interactive-master.png` · archetype `construction-site` · zones per `interaction-manifest/routes.ts`.

#### Practical considerations

**Count:** 0

#### FAQ (4)

1. Who should buy builder's risk — owner or contractor?
2. When does builder's risk end?
3. Is theft of materials covered?
4. Does builder's risk cover faulty workmanship?

#### CTA

- **Heading:** Starting a construction project?
- **Subhead:** Share project value, timeline, and contract requirements — we will arrange builder's risk aligned with your build.

#### Audit findings

- Absolute "Covers…" language on cards and intro (HIGH flags).
- Card copy implies soft costs, transit, existing structure are included by default — **not form-guaranteed**.
- No distinction new build vs renovation vs occupied-building renovation.
- No lender/contract placement discussion beyond FAQ #1.
- Duplicates builder's-risk explanations on Contractors and Builders & Developers pages.

---

### 2. `/bonding-insurance/`

**Source file:** `src/data/pilot-commercial-inline.ts` (slug `bonding-insurance`)

#### Classification flags

| Severity | Field | Issue |
|----------|-------|-------|
| **MEDIUM** | `coverage:Bid Bonds` | "guarantees you will honour your bid" — surety guarantee wording needs precision |
| **MEDIUM** | `coverage:Performance Bonds` | "Guarantees completion…" — same |
| **MEDIUM** | `faq` | "Insurance protects you against covered losses" — unhedged |
| **LOW** | `faq` | Three-party "guarantee" — industry term; acceptable with context |

#### Hero

- **Headline:** Bond Insurance
- **Eyebrow:** Bond Insurance
- **Lead:** Surety bonds for contractors and businesses that need to meet contract, licensing, or bidding requirements.

#### Coverage Explorer (5 states — no V2 detail pairs)

| # | State ID | Title | shortLabel | detailTitle | detailDescription | Image zones |
|---|----------|-------|------------|-------------|-------------------|-------------|
| 0 | `bid-bonds` | Bid Bonds | *(auto: Bid)* | — | — | trailer-office, site-perimeter |
| 1 | `performance-bonds` | Performance Bonds | *(auto: Performance)* | — | — | active-build, scaffold-zone, crane-pad |
| 2 | `labour-material-payment-bonds` | Labour & Material Payment Bonds | *(auto: Labour)* | — | — | material-stack, active-build |
| 3 | `licence-permit-bonds` | Licence & Permit Bonds | *(auto: Licence)* | — | — | trailer-office, site-perimeter |
| 4 | `fidelity-bonds` | Fidelity Bonds | *(auto: Fidelity)* | — | — | trailer-office, material-stack |

**Note:** Fidelity bonds are **insurance** (employee dishonesty), not construction surety — page currently blends product categories.

#### Practical considerations

**Count:** 0

#### FAQ (5)

1. What's the difference between insurance and a surety bond?
2. Do I need a bond to bid on a contract?
3. How is bond pricing determined?
4. What information do I need to apply for a bond?
5. What is a labour and material payment bond?

#### CTA

- **Heading:** Ready to get bonded?
- **Subhead:** Tell us about the contract or license — we'll help you arrange the right bond.

#### Audit findings

- Reads partly like insurance page; surety three-party structure under-explained.
- Performance/payment bond cards use "Guarantees" without explaining surety indemnity / principal default process.
- No Ontario public-contract statutory context (verified thresholds below).
- No bonding capacity / prequalification / indemnity discussion.
- Bid bond vs consent of surety not distinguished.
- FAQ #2 correctly hedges "Many public and private tenders" — good pattern to extend.

---

### 3. `/contractors-insurance/`

**Source file:** `src/data/commercial-industries.ts` (slug `contractors-insurance`)

**⚠️ PROTECTED EXPLORER:** Four static state images · NO motion · custom mapping in `contractors-coverage-state-images.ts`

#### Classification flags

| Severity | Field | Issue |
|----------|-------|-------|
| **HIGH** | `faq` (builder's risk answer) | Flat guarantee: "Builder's risk covers the structure and materials…" |

#### Hero

- **Headline:** Contractors Insurance
- **Subhead:** Liability, tools, and project coverage for contractors and tradespeople. *(9 words — very thin)*

#### Coverage Explorer (4 states — APPROVED STATIC ARCHITECTURE)

| # | State ID | Title | shortLabel | detailTitle | detailDescription | Static state image |
|---|----------|-------|------------|-------------|-------------------|--------------------|
| 0 | `general-liability` | General Liability | *(auto)* | — | — | `contractors-insurance-state-liability.png` |
| 1 | `tools-equipment-coverage` | Tools & Equipment Coverage | *(auto)* | — | — | `contractors-insurance-state-tools-equipment.png` |
| 2 | `builder-s-risk` | Builder's Risk | *(auto)* | — | — | `contractors-insurance-state-property.png` |
| 3 | `wrap-up-liability` | Wrap-Up Liability | *(auto)* | — | — | `contractors-insurance-state-installation-work.png` |

**Zone manifest (legacy):** general-liability → site-perimeter, active-build, trailer-office · etc.

#### Practical considerations

**Count:** 0

#### FAQ (5)

1. Do subcontractors need their own liability insurance?
2. Are my tools covered if stolen from a job site?
3. What is builder's risk insurance? *(HIGH flag)*
4. Do I need proof of insurance for every job?
5. What is OCIP and when does it apply to contractors?

#### CTA

- **Heading:** Ready to cover your contracting work?
- **Subhead:** Tell us about your trade, projects, and equipment — we'll compare options that fit.

#### Audit findings

- Generic hero; could apply to any trade.
- Builder's Risk card on operating-contractor page creates overlap with dedicated builder's risk route.
- Wrap-up/OCIP FAQ is strongest content on page — should inform hero/considerations.
- No trade-type differentiation (GC vs sub vs renovation).
- No certificates / additional insured / subcontractor compliance section.
- Explorer images and IDs are **frozen** — copy-only improvements allowed.

---

### 4. `/builders-developers-insurance/`

**Source file:** `src/data/commercial-industries.ts` (slug `builders-developers-insurance`)

#### Classification flags

| Severity | Field | Issue |
|----------|-------|-------|
| **HIGH** | `faq` | Flat guarantee on builder's risk definition |

#### Hero

- **Headline:** Builders & Developers Insurance
- **Subhead:** Project-based coverage for builders and developers — from groundbreaking to handover.

#### Coverage Explorer (4 states)

| # | State ID | Title | shortLabel | detailTitle | detailDescription | Image zones |
|---|----------|-------|------------|-------------|-------------------|-------------|
| 0 | `builder-s-risk` | Builder's Risk | *(auto)* | — | — | active-build, scaffold-zone, material-stack |
| 1 | `general-liability` | General Liability | *(auto)* | — | — | site-perimeter, active-build, trailer-office |
| 2 | `wrap-up-liability` | Wrap-Up Liability | *(auto)* | — | — | site-perimeter, active-build, trailer-office |
| 3 | `completed-operations` | Completed Operations | *(auto)* | — | — | active-build, site-perimeter |

#### Practical considerations

**Count:** 0

#### FAQ (5)

1. What is builder's risk insurance and when do I need it? *(HIGH)*
2. What is wrap-up liability?
3. What is OCIP and how does it relate to wrap-up coverage?
4. Am I covered after a project is completed?
5. What information do I need for a quote?

#### CTA

- **Heading:** Ready to cover your next project?
- **Subhead:** Tell us about your build — we'll compare project and liability options that fit.

#### Audit findings

- Enterprise/developer angle underdeveloped — reads like mini contractors + builder's risk duplicate.
- Completed Operations card uses absolute framing potential.
- No land/vacant property, unsold inventory, lender requirements, multi-project program discussion.
- Strong OCIP/CCIP FAQ content exists but not reflected in hero or considerations.

---

## B. Research findings by route

### B1. Builder's Risk — research synthesis

#### [COVERAGE]

- **Builder's risk / course of construction (COC)** is **property insurance** for the project during construction or major renovation — structure, materials incorporated or awaiting installation, and sometimes temporary works. [CCDC 21; market practice]
- Typically written on an **all-risk** or specified-perils basis depending on form — **covered causes of loss are policy-specific** (fire, wind, theft, vandalism commonly discussed; flood/earthquake often excluded or sub-limited unless endorsed). [CCDC 21; insurer forms]
- **Hard costs:** direct physical loss to the structure and materials in the insured project.
- **Soft costs / delay in completion:** **endorsement-based** — interest, taxes, professional fees, extended general conditions, insurance premiums during delay. Not automatic. [CCDC 21; Acera; AGC delay coverage paper]
- **Existing structures** in renovation: may require explicit scheduling/endorsement — not automatic when only "new work" is contemplated. [CCDC 21]
- **Materials in transit / off-site storage:** only when policy wording or endorsement extends beyond on-site property. Current card overstates universality.
- **Testing & commissioning, expediting expense, debris removal:** typically endorsement/sub-limit items. [CCDC 21]
- **Faulty workmanship / defective work:** often excluded or limited (DE4/DE5 style exclusions in Canadian forms) — BR does not replace liability for defective work. Current FAQ #4 direction is correct but needs hedging.
- **Does NOT replace:** CGL, contractor tools, equipment breakdown, or wrap-up liability.

#### [UNDERWRITING]

Brokers typically need (project-dependent, not universal mandates):

- Completed value / hard cost budget and construction type
- New build vs renovation; **existing structure value** if applicable
- Project location, duration, start/completion dates
- Named insured (owner, GC, or both) and insurable interest
- Contract type (CCDC, custom) and who is responsible for placing BR per contract
- Occupancy / partial occupancy plans
- Site security, fire protection, water exposure, neighbouring property
- Subcontractor role and whether materials are supplied by others
- Loss history and prior BR claims
- Lender requirements and mortgage clause needs

#### [REGULATORY]

- **Builder's risk is NOT mandated by Ontario statute** as a universal legal requirement. [Market consensus; FSRA regulates insurers/brokers, not BR product terms]
- **Practical requirements:** lenders, contracts (CCDC 2 etc.), and permit processes often require evidence of COC/BR before work proceeds. [CCDC 21; CCDC 2025 updates — insurance handover at ready-for-takeover/occupancy]
- **FSRA** regulates insurance sector conduct/licensing — not specific BR policy content.

#### [CONTRACTUAL]

- CCDC contracts allocate **who purchases** builder's risk (owner vs contractor varies by contract series).
- **Substantial performance / ready-for-takeover / occupancy** triggers handover from COC to permanent property insurance — timing must be coordinated. [CCDC 2025 updates]
- Contract may specify limits, named insureds, loss payees (lender).

#### [EXPOSURE]

- Fire, theft of materials, wind/hail, vandalism, water escape (policy-dependent), transit/storage losses (if covered), delay-driven soft costs (if endorsed), renovation damage to existing building (if scheduled).

---

### B2. Bonding / Surety — research synthesis

#### [COVERAGE] — Surety vs insurance

| | **Insurance** | **Surety bond** |
|---|---------------|-----------------|
| Parties | Insured + insurer | **Principal + obligee + surety** (three-party) |
| Purpose | Transfer insured risk | **Guarantee principal's obligation** to obligee |
| Default | Insurer pays covered loss | Surety may step in; **indemnity from principal** expected |
| Protects | Policyholder (within terms) | **Obligee** (and claimants on payment bond) |

- **Bid bond (CCDC 220):** Assures bidder will enter contract and provide required bonds if awarded — commonly ~10% of bid amount on private/CCDC work. **Not the same as Ontario statutory s.85.1 bond requirement.**
- **Performance bond (CCDC 221 / Ontario Form 32):** If principal defaults after declaration, surety may arrange completion, tender, or other remedies per bond — **not a blanket "insurance payout" to contractor.**
- **Labour & material payment bond (CCDC 222 / Ontario Form 31):** Protects **direct** subcontractors/suppliers to bonded contractor on bonded project; claim protocols and time limits apply (e.g., 120-day notice conventions in standard forms). [SAC; CCDC 2024 bond webinar]
- **Licence & permit bonds:** Regulatory/commercial licence compliance — separate from project performance.
- **Fidelity bonds:** **Insurance product** (employee dishonesty) — should not be presented as construction surety.

#### [UNDERWRITING]

Surety prequalification typically reviews:

- Financial statements (company + often personal indemnity of owners)
- Working capital, net worth, liquidity
- Work-in-progress / backlog vs capacity
- Experience on similar projects
- Bonding history and surety relationship
- Single-job limit vs aggregate program
- Project details (contract amount, owner, form of contract)

#### [REGULATORY] — Ontario Construction Act (verified)

**Construction Act, R.S.O. 1990, c. C.30, s. 85.1 + O. Reg. 304/18 s.12, O. Reg. 260/24 s.12.1:**

| Claim | Verified? | Safe publish? |
|-------|-----------|---------------|
| Applies to **public contracts** (Crown, municipality, broader public sector owner) | YES | YES — with definition |
| Threshold: contract price **$500,000 or more** | YES (O.Reg. 304/18 s.12) | YES |
| Requires **both** performance bond **and** labour & material payment bond on entering contract | YES (s.85.1(4)-(5)) | YES |
| Minimum coverage: **50% of contract price** each (general rule) | YES (O.Reg. 260/24 s.12.1(1)) | YES — note owners may require more |
| Non-P3 contracts **> $500M:** owner may set limit ≥ **$250M** subject to balance test | YES (s.12.1(2)-(3)) | YES — hedge as regulatory framework |
| **Bid bonds** required by statute for all public contracts | **NO** — s.85.1 addresses performance + payment bonds on contract entry | Do NOT imply universal statutory bid bond |
| All Ontario construction requires bonding | **NO** — private projects contract-dependent | REQUIRES HEDGING |

**Forms:** Ontario public contracts use prescribed **Form 31 (L&M Payment)** and **Form 32 (Performance)** — developed with Surety Association of Canada. CCDC 220/221/222 are industry standard forms often used on private/CCDC work. [SAC 2024; Ontario AG forms]

#### [CONTRACTUAL]

- Tender documents specify bid bond %, consent of surety, performance/payment bond amounts (often 100% on private even when 50% is statutory minimum on public).
- P3 / AFP projects: modified s.85.1 application per Construction Act s.85.1(4) adaptations.

#### [EXPOSURE]

- Principal default on performance; non-payment to subs/suppliers; bid withdrawal after award; licence violations (permit bonds).

---

### B3. Contractors (operating business) — research synthesis

#### [COVERAGE] — Common core vs conditional

**COMMON CORE (most operating contractors):**

- **Commercial general liability (CGL)** — third-party bodily injury / property damage from operations; products-completed operations component for completed work claims. [IBC/CGL market; CCDC 21]
- **Tools / contractors equipment / inland marine** — owned tools, mobile equipment; job-site theft subject to policy conditions.
- **Commercial auto** — if vehicles used in business (separate regulated auto policy).

**CONDITIONAL / PROJECT-DEPENDENT:**

- **Builder's risk** — when contractor is named or contractually required to place project property coverage (distinct from ongoing GL).
- **Wrap-up / OCIP / CCIP** — project-specific liability program; enrolled subs may rely on wrap for **on-site** work during enrollment — **not a substitute for off-site/auto/tools coverage.**
- **Installation floater / riggers liability** — trade-dependent (millwork, machinery rigging).
- **Professional liability** — where design-build or drafting responsibility exists.
- **Pollution liability** — excavation, fuel, silica, asbestos abatement trades.
- **Subcontractor default insurance, excess liability** — larger GC programs.

**Trade differentiation (underwriting, not identical needs):**

| Profile | Distinct exposures |
|---------|-------------------|
| General contractor | Sub compliance, wrap participation, broad operations |
| Electrical / mechanical | Installation, testing, fire causation, value of installed equipment |
| Excavation / concrete | Underground damage, collapse, pollution |
| Roofing | Height, open flame, water infiltration completed ops |
| Renovation / residential | Occupied buildings, existing property, dust/mould |
| Landscaping / snow | Seasonal ops, equipment, slip/fall |

#### [REGULATORY]

- **WSIB** coverage for employees — separate from insurance page scope but Ontario operational reality.
- **Commercial auto (FSRA-regulated)** if business vehicles.
- No universal Ontario statute requiring GL for all contractors — **contractual** requirement dominant.

#### [CONTRACTUAL]

- GC contracts require sub GL limits, WSIB clearance, additional insured, waiver of subrogation, primary/non-contributory wording.
- Certificates of insurance vs actual coverage — broker must match **policy** to **contract**.

#### [EXPOSURE]

- Job-site injury to third parties, property damage, defective work claims (completed ops), tool theft, damage to owner's property, auto while traveling between sites.

---

### B4. Builders & Developers — research synthesis

#### Focus: enterprise / project owner-developer (not trade contractor)

**CORE (entity-level + recurring development activity):**

- **CGL / development operations liability** — premises, sales offices, site supervision (policy-dependent).
- **Builder's risk per project** — each project typically its own COC policy or master program.
- **Wrap-up liability (OCIP/CCIP)** — for multi-trade projects; developer/owner sponsorship common on larger work.

**PROJECT-DEPENDENT:**

- **Completed operations / tail** — latent defect claims after handover; limits and duration policy-specific.
- **Vacant land / site liability** — ownership of undeveloped parcels.
- **Unsold completed inventory / spec building** — property coverage after BR expires.
- **Course of construction → permanent property** transition at occupancy.
- **Pollution / environmental** — brownfield, remediation, storage tanks.
- **Professional liability / contingent design** — when developer engages design professionals.
- **Commercial auto, cyber, crime, D&O** — entity-dependent.

**OPERATION-DEPENDENT:**

- Multi-project pipeline vs single build
- Joint ventures (who places which coverage)
- Lender/monitor requirements and loss payee clauses
- Condominium conversion / tariff of homes (if applicable — specialist review)

**Does NOT belong on this page (redirect mentally):**

- Trade tools coverage (contractors page)
- Statutory surety bond mechanics detail (bonding page) except when developer is **obligee** receiving bonds
- Long-haul cargo, fleet auto (other routes)

---

## C. Source list

| # | Source | Type | Use |
|---|--------|------|-----|
| 1 | [Construction Act, R.S.O. 1990, c. C.30](https://www.ontario.ca/laws/statute/90c30) — s.85.1 | Ontario statute | Public contract bonding |
| 2 | [O. Reg. 304/18](https://www.ontario.ca/laws/regulation/180304) s.12, s.12.1 | Ontario regulation | $500k threshold; 50% minimum coverage |
| 3 | [O. Reg. 260/24](https://www.ontario.ca/laws/regulation/r24260) | Ontario regulation | Large non-P3 bond floor ($250M / $500M+) |
| 4 | [Surety Association of Canada — CCDC Bond Forms Webinar PDF (June 2024)](https://suretycanada.com/common/Uploaded%20files/SAC-Files/PDFs/SAC-Webinar-CCDC-Bond-Forms-GCs-June252024.pdf) | Industry | CCDC 220/221/222; claims protocols |
| 5 | [SAC — Labour & Material Bonds](https://suretycanada.com/SAC/Surety-Bonds/Labour-Material-Bonds.aspx) | Industry | Payment bond claimants, timing, companion to performance |
| 6 | [CCDC 21 – Guide to Construction Insurance (2016)](https://www.ccdc.org/document/ccdc21/) | CCDC | BR, GL, wrap-up, endorsements |
| 7 | [CCDC 2025 contract updates (Mondaq summary)](https://www.mondaq.com/canada/construction-planning/1738884/2025-ccdc-contract-updates-what-construction-professioners-need-to-know) | Industry analysis | Insurance handover, liability caps context |
| 8 | [FSRA — fsrao.ca](https://www.fsrao.ca/) | Ontario regulator | Insurer/broker regulation (not product mandates) |
| 9 | [Infrastructure Ontario](https://www.infrastructureontario.ca/) | Ontario agency | Public infrastructure procurement context (bond requirements in RFPs — verify per project) |
| 10 | Internal: `docs/d3-transportation-batch-2026-09-08.md` | Prior D3 batch | Remediation pattern reference (hedging, V2 pairs, considerations) |

**Not used as regulatory authority:** Generic broker blog posts (Roughley, aha, isure, myboardwalk) — operational context only; statutory claims verified against Ontario.ca.

---

## D. Cross-page differentiation matrix

| Row | Builder's Risk | Bonding / Surety | Contractors | Builders & Developers |
|-----|----------------|------------------|-------------|---------------------|
| **PRIMARY CUSTOMER** | Owner, developer, or party named in contract to insure **the project property** | Contractor or vendor required to **post surety** to obligee | Operating **trade / GC business** | **Developer entity** managing projects + enterprise risk |
| **PRIMARY RISK** | Physical loss/damage to project & materials during construction | **Failure to perform or pay** on bonded obligation | Ongoing **operations liability**, tools, project participation | Multi-project **development lifecycle** — build, sell, hold |
| **WHAT PRODUCT ADDRESSES** | COC / builder's risk **property policy** (+ endorsements) | **Surety bonds** (bid, performance, payment) + separate licence/fidelity | **CGL, tools/equipment**, optional project coverages | **Entity GL + project BR + wrap-up + completed ops** coordination |
| **WHO/WHAT IS PROTECTED** | Project structure, materials (per policy) | **Obligee** (owner); subs/suppliers on payment bond | Contractor's business; third parties injured by operations | Developer entity, projects, post-handover claims |
| **KEY UNDERWRITING INPUTS** | Project value, duration, type, existing structure, security | Financials, capacity, experience, contract amount/form | Trade, revenue, subs, equipment values, contracts | Pipeline, project values, JV structure, lender reqs |
| **CONTRACTUAL ISSUES** | Who places BR; lender loss payee; substantial completion | Tender bond %, consent of surety, bond amounts, forms (31/32 vs CCDC) | Sub COI requirements, AI, OCIP enrollment | OCIP sponsorship, lender, tariff/warranty, handover |
| **PROJECT VS ENTERPRISE** | **Single project property** | **Single project obligation** (per bond) | **Enterprise** with project overlays | **Enterprise** across projects |
| **KEY COVERAGES** | WIP, materials, soft costs*, existing structure* | Bid, performance, payment, licence (*endorsement/conditional) | GL, tools, BR participation, wrap participation | BR program, GL, wrap, completed ops |
| **DOES NOT BELONG** | GL, surety bonds, trade tools as core | Builder's risk property, GL as substitute | Full developer enterprise D&O | Detailed surety mechanics (except as obligee context) |
| **BEST EXPLORER CONCEPTS** | WIP hard costs; materials transit*; soft costs*; existing structure* | Bid vs consent; performance default; payment to subs; licence | **Frozen 4 states:** GL ops; tools; project property role; wrap enrollment | Project BR; ops GL; wrap/OCIP; completed ops tail |
| **BEST CONSIDERATIONS** | Who buys; lender; occupancy; renovation; exclusions; extensions | Surety vs insurance; capacity; indemnity; Ontario public thresholds; claim timing | Sub COIs; OCIP vs own GL; tools limits; trade-specific; certificates | Multi-project scheduling; lender; handover; unsold inventory; JV |
| **BEST FAQ TOPICS** | Who buys; end date; theft; workmanship exclusion | Insurance vs surety; bid need; pricing; L&M bond; Ontario public bonds | Sub insurance; tools theft; OCIP; certificates; BR vs GL | BR timing; wrap vs traditional; completed ops; lender; quote info |

\*Conditional / endorsement-dependent — must hedge in copy.

---

## E. Explorer V2 content plan

**Pattern:** RIGHT = what is this? · LEFT = why it matters to this customer · **No duplicated sentences.**

### E1. Builder's Risk — preserve 4 IDs

| State ID | shortLabel | description (RIGHT) | detailTitle (LEFT) | detailDescription (LEFT) |
|----------|------------|---------------------|--------------------|---------------------------|
| `work-in-progress` | WIP | May help address certain physical loss or damage to the structure and installed work during construction — where purchased and subject to policy causes of loss, exclusions, and limits. | Hard costs stop when fire or wind hits mid-build | Builder's risk insures the project itself — not your contractor's everyday liability policy. Covered causes of loss, deductibles, and whether temporary works are included depend on form and endorsements. Accurate completed value and construction timeline support proper limits. |
| `materials-on-site-in-transit` | Materials | May extend to materials on site, in transit, or at temporary storage — **only where policy wording or endorsements apply**. | Materials off-site are not automatic | Lumber, fixtures, and equipment awaiting installation can represent a large share of project value. Transit and off-site storage are common **endorsement** items — confirm distance limits, security conditions, and who owns materials (owner vs sub). |
| `soft-costs` | Soft Costs | May address certain delay-related expenses after a **covered** loss — where delay-in-completion or soft-cost endorsements are purchased. | Delay expenses need their own line item | Interest, taxes, professional fees, and extended site overhead after an insured loss are not part of basic hard-cost coverage unless scheduled. Document and value soft costs explicitly — formulas like "25% of project value" can understate exposure. |
| `existing-structure` | Existing | Renovation projects may need scheduled coverage for the **existing building** while work proceeds — subject to underwriting and policy wording. | Occupied renovations change the property picture | Standard homeowner or commercial property policies may not respond once renovation scale or vacancy triggers exclusions. Existing structure values, demolition scope, and who retains property insurance during work should be resolved before demolition. |

**Proposed ID changes:** **NONE**

---

### E2. Bonding — preserve 5 IDs (note fidelity framing)

| State ID | shortLabel | description (RIGHT) | detailTitle (LEFT) | detailDescription (LEFT) |
|----------|------------|---------------------|--------------------|---------------------------|
| `bid-bonds` | Bid Bond | May be required with a tender — provides assurance to the project owner that a selected bidder will enter the contract and furnish required bonds if awarded, subject to bond terms. | Tender security is about commitment — not project completion | Bid bonds and consents of surety are tender-phase instruments. They protect the owner if the low bidder withdraws — the surety's obligation is defined in the bond, and the principal typically indemnifies the surety for amounts paid. |
| `performance-bonds` | Performance | A three-party surety bond that may respond if the contractor **defaults** on performance obligations under the bonded contract — subject to bond conditions and surety remedies. | Default triggers a process — not an automatic insurance payout | Performance bonds protect the **obligee** (project owner), not the contractor. If a default is declared, the surety may arrange completion, tender for a replacement contractor, or other remedies per the bond — then seek recovery from the principal. |
| `labour-material-payment-bonds` | Payment | May help ensure certain **direct** subcontractors and suppliers on the bonded project receive payment for approved work and materials — subject to bond form, notice periods, and claim documentation. | Subs and suppliers claim here — not on the performance bond | Payment bonds address upstream payment failure on the bonded job. Claimants generally must follow bond notice and documentation requirements. This is separate from the owner's performance bond claim process. |
| `licence-permit-bonds` | Licence | May satisfy licensing or permit bonding requirements for regulated trades or municipal licences — where required by the authority having jurisdiction. | Regulatory bonds are not project performance bonds | Licence and permit bonds guarantee compliance with licence obligations to a government or municipal obligee — different purpose, amount, and underwriting from construction performance programs. |
| `fidelity-bonds` | Fidelity | **Insurance** coverage that may address certain employee dishonesty losses — separate from construction surety bonds. | Employee theft is insurance — not surety | Fidelity coverage protects the business against defined employee theft or fraud losses subject to policy terms. It should not be confused with bid, performance, or payment surety bonds used in construction contracting. |

**Proposed ID changes:** **NONE** (consider future owner review: whether fidelity belongs on same page or cross-links to crime/fidelity route)

---

### E3. Contractors — **FROZEN IDs + static images**

| State ID | Image | shortLabel | description (RIGHT) | detailTitle (LEFT) | detailDescription (LEFT) |
|----------|-------|------------|---------------------|--------------------|---------------------------|
| `general-liability` | liability | GL | May help respond to certain third-party bodily injury or property-damage claims arising from your contracting operations — subject to policy terms, exclusions, and limits. | Job-site injury claims follow your operations — not the owner's property policy | CGL addresses third-party claims from your work — slips, property damage, and certain completed-operations allegations depending on wording. It does not insure your tools, your vehicles, or the building under construction. Contractual additional-insured and waiver requests must match actual policy capabilities. |
| `tools-equipment-coverage` | tools-equipment | Tools | May help cover owned tools and mobile equipment against covered theft or damage — where purchased and subject to scheduling, locations, and deductibles. | Stolen tools are rarely covered by liability alone | Tool and equipment policies or inland marine floaters schedule items, job-site limits, and overnight storage rules. A theft from a trailer may be excluded without proper coverage and security compliance. |
| `builder-s-risk` | property | Project Property | **Project** property coverage for work in progress — usually arranged **per project** when your contract requires it; separate from ongoing GL. | When the contract names you to insure the build | Contractors may be required to place or be named on a builder's risk policy for specific projects. That coverage insures the project structure and materials — not your commercial liability for injury claims. Confirm per contract; do not assume your GL replaces builder's risk. |
| `wrap-up-liability` | Wrap-Up | Wrap-Up | On enrolled projects, **wrap-up / OCIP** programs may provide project-site liability coverage for participating trades — subject to enrollment and policy terms. | OCIP changes whose policy responds on site | Large projects may use an owner- or contractor-controlled wrap-up. Enrolled trades may rely on the wrap for onsite liability but typically still need their own coverage for off-site operations, auto, tools, and non-enrolled work. Read enrollment and exclusion language carefully. |

**Proposed ID changes:** **NONE — owner approval required for any ID/image change**

---

### E4. Builders & Developers — preserve 4 IDs

| State ID | shortLabel | description (RIGHT) | detailTitle (LEFT) | detailDescription (LEFT) |
|----------|------------|---------------------|--------------------|---------------------------|
| `builder-s-risk` | BR | May help address certain physical loss or damage to each project during construction — where a course-of-construction policy is purchased for that project. | Each project needs its own property schedule | Developers typically arrange builder's risk per project (or via a master program) covering hard costs and endorsed extensions. Lenders often require loss payee status and evidence of coverage before draw releases. |
| `general-liability` | GL | May help respond to certain third-party injury or property-damage claims arising from development operations — subject to policy terms. | Sales centres and site supervision create liability | Development entities face premises and operations exposure at sales offices, model homes, and active sites. Project-specific wrap-up programs may alter how onsite claims are handled — entity GL still matters for non-enrolled activities. |
| `wrap-up-liability` | Wrap-Up | May consolidate liability for enrolled parties on a project under an owner- or sponsor-controlled program — where purchased and subject to enrollment terms. | OCIP reduces gaps between trades — at a cost | Wrap-ups centralize certificates and limits for major projects but require active administration. Developers sponsoring OCIPs should coordinate with counsel and surety/bonding requirements separately. |
| `completed-operations` | Completed Ops | May address certain liability claims alleging injury or damage **after** handover — where products-completed operations coverage applies under policy wording. | Defect claims can surface after occupancy | Latent defect and completed-operations claims may arise months or years after sale or lease-up. Policy tail, exclusions, and whether residential tariff/warranty obligations exist should be reviewed with your broker — coverage is not open-ended. |

**Proposed ID changes:** **NONE**

---

## F. Practical considerations plan (6–9 per page, expandable)

### Builder's Risk (8)

1. **Who should purchase the policy — owner, GC, or developer?** — Contract (CCDC/custom) allocation; lender may dictate named insured.
2. **New construction vs renovation of occupied buildings** — Existing structure scheduling; property insurance coordination.
3. **Completed value, timeline, and extensions** — Substantial completion, occupancy, policy expiry, delay extensions.
4. **Hard costs vs soft costs / delay endorsements** — Itemize soft costs; avoid formula-only limits.
5. **Materials, transit, and off-site storage** — Endorsement conditions, security, sub-supplied materials.
6. **Lender and loss payee requirements** — Mortgage clauses, advance conditions.
7. **Exclusions: faulty workmanship, water, flood, earthquake** — Policy-specific; optional buy-backs.
8. **Handover to permanent property insurance** — Ready-for-takeover / partial occupancy coordination.

### Bonding / Surety (8)

1. **Surety is not insurance — three-party structure and indemnity**
2. **Bonding capacity and prequalification** — Financial statements, WIP, aggregate program
3. **Ontario public contracts: performance + payment bonds at $500k+** — 50% minimum; forms 31/32
4. **Bid bonds vs consent of surety at tender**
5. **Performance bond default process** — Obligee declaration, surety remedies
6. **Payment bond claims for direct subs/suppliers** — Notice timing, documentation
7. **Private vs public form requirements (CCDC vs Ontario prescribed)**
8. **Licence bonds vs project bonds** — Separate obligees and purposes

### Contractors (8)

1. **Certificates, additional insured, and waiver wording**
2. **Subcontractor insurance requirements and COI review**
3. **OCIP / wrap enrollment vs your own GL**
4. **Tools and equipment — job-site theft and scheduling**
5. **When builder's risk applies to your contract role**
6. **Trade-specific exposures (height, excavation, design responsibility)**
7. **Commercial auto vs CGL — travelling between sites**
8. **Completed operations and defect claims after you leave site**

### Builders & Developers (8)

1. **Per-project builder's risk vs master programs**
2. **Lender requirements and draw conditions**
3. **OCIP/CCIP sponsorship decisions**
4. **Completed operations and post-handover tail**
5. **Unsold inventory / spec buildings after BR expires**
6. **Vacant land and pre-construction liability**
7. **Joint ventures — who places what coverage**
8. **Transition from construction to permanent property / habitational policies**

---

## G. FAQ plan (5 per page)

### Builder's Risk

1. Is builder's risk legally required in Ontario?
2. Should the owner or contractor buy the policy?
3. Does builder's risk cover theft, water damage, or faulty workmanship?
4. When does coverage start and end (substantial completion / occupancy)?
5. What project information is needed for a quote?

### Bonding

1. What is the difference between a surety bond and insurance?
2. When are performance and payment bonds required on Ontario public projects?
3. What is a bid bond and is it the same as a consent of surety?
4. How do sureties evaluate bonding capacity?
5. Who can claim under a labour and material payment bond?

### Contractors

1. Do I need my own GL if the project has a wrap-up?
2. What insurance do general contractors typically require from subs?
3. Are tools stolen from a job site covered?
4. When am I responsible for builder's risk vs the owner?
5. What is OCIP enrollment and what does it not cover?

### Builders & Developers

1. How does builder's risk fit into a development project?
2. What is an OCIP and when do developers sponsor wrap-ups?
3. What happens to coverage at substantial completion or occupancy?
4. How are completed-operations claims handled after units are sold?
5. What information do brokers need for a development insurance review?

---

## H. Literal claim register

| # | PROPOSED CLAIM | TYPE | SOURCE | SOURCE DATE | EXACT SUPPORT | SAFE TO PUBLISH |
|---|----------------|------|--------|-------------|---------------|-----------------|
| 1 | Public contract bonding applies at **$500,000+** contract price | REGULATORY | O.Reg. 304/18 s.12 | Current (e-Laws) | "applies to a public contract if the contract price is $500,000 or more" | **YES** — cite as Ontario public contracts |
| 2 | Performance + L&M payment bonds both required on entering public contract | REGULATORY | Construction Act s.85.1(4)-(5) | Current | Both subsections on entering contract | **YES** |
| 3 | Minimum bond coverage **50% of contract price** (general rule) | REGULATORY | O.Reg. 260/24 s.12.1(1) | Filed 2024 | "minimum coverage limit… is 50 per cent" | **YES** — note owners may require 100% |
| 4 | Non-P3 contracts **> $500M** may use **≥ $250M** bond limit with balance test | REGULATORY | O.Reg. 260/24 s.12.1(2)-(3) | 2024 | Subsections (2)-(3) | **YES** — hedge as regulatory framework |
| 5 | Bid bonds required by statute for all Ontario construction | REGULATORY | — | — | Not in s.85.1 | **NO** |
| 6 | Builder's risk legally required for all Ontario construction | REGULATORY | Market + FSRA scope | 2026 | Not in statute; lender/contract driven | **NO** — say "often required by contract/lender" |
| 7 | Builder's risk "covers" soft costs / transit / existing structure automatically | COVERAGE | CCDC 21 | 2016 | Endorsement-dependent | **NO** — REQUIRES HEDGING |
| 8 | Performance bond "guarantees" completion without default/conditions | COVERAGE | SAC CCDC 221 materials | 2024 | Default + surety options required | **NO** — REQUIRES HEDGING / process language |
| 9 | Surety bond protects the contractor | COVERAGE | SAC | — | Protects obligee | **NO** |
| 10 | Payment bond claimants have **120-day** notice convention | CONTRACTUAL | SAC L&M page; Form 31 schedules | Current | Standard bond claim protocol | **YES** — "subject to bond form" |
| 11 | Direct subs/suppliers (not sub-sub) on standard L&M bond | COVERAGE | SAC | Current | "direct contract with bonded contractor" | **YES** — hedge tier limits |
| 12 | FSRA mandates builder's risk policy terms | REGULATORY | FSRA mandate | — | FSRA regulates sector, not product | **NO** |
| 13 | CGL "covers" all job-site injury claims | COVERAGE | Policy forms | — | Exclusions apply | **NO** — REQUIRES HEDGING |
| 14 | OCIP eliminates need for contractor GL entirely | COVERAGE | Market / CCDC 21 | — | Off-site, auto, tools excluded | **NO** — REQUIRES HEDGING |
| 15 | All contractors need performance bonds | REGULATORY | — | — | Private contract optional | **NO** |

---

## I. Proposed implementation scope (Phase 2 — NOT STARTED)

### Target grades

| Route | Current | Target | Primary remediation |
|-------|---------|--------|---------------------|
| Builder's Risk | D | **A** | Hedge HIGH flags; add V2 pairs; 7–8 considerations; expand hero |
| Bonding | D | **A** | Surety precision; separate fidelity framing; Ontario public bond section; V2 pairs |
| Contractors | D | **A** | Trade/OCIP hero; V2 pairs (**copy only**); considerations; fix HIGH FAQ |
| Builders & Developers | D | **A** | Enterprise/developer angle; V2 pairs; considerations; fix HIGH FAQ |

### Files that would need modification (Phase 2)

| File | Routes affected |
|------|-----------------|
| `src/data/product-pages/commercial-products-industry.ts` | Builder's Risk |
| `src/data/pilot-commercial-inline.ts` | Bonding |
| `src/data/commercial-industries.ts` | Contractors, Builders & Developers |
| `src/lib/buildPilotProductConfig.ts` | Enable `considerationsPresentation: "expandable"` for routes (pattern exists for trucking/dump/cargo) |
| `scripts/verify-d3-construction-batch.cjs` | **New** batch verifier (mirror transportation script) |
| `docs/d3-construction-contracting-implementation-2026-09-08.md` | Implementation report |
| `docs/qa-screenshots/d3-construction-*` | QA artifacts |

### Files that must NOT change (Contractors Explorer)

- `src/data/coverage-explorer/contractors-coverage-state-images.ts`
- `src/data/coverage-explorer/buildRouteExplorerConfig.ts` (contractors branch logic)
- `public/images/contractors-insurance-state-*.png`
- Explorer motion/mask/crop architecture

---

## J. Unresolved questions / risky claims

1. **Fidelity bond on bonding page:** Keep as 5th Explorer state with clear "insurance not surety" framing, or move to crime/fidelity route cross-link? Owner decision.
2. **Bonding page name:** "Bond Insurance" vs "Surety Bonds" — SEO/branding vs accuracy.
3. **Residential tariff / warranty (Ontario new homes):** Developers page may need specialist review before any statutory warranty claims — **do not publish numeric warranty periods without legal review.**
4. **Infrastructure Ontario RFP bond percentages:** Project-specific — do not publish universal IO percentages without current RFP citation.
5. **Bid bond % on public work:** Statute silent — only publish "per tender documents" unless citing specific owner RFP.
6. **Contractors `builder-s-risk` card:** On operating contractor page, clarify participation vs placing policy — avoid duplicating full builder's risk page.
7. **Builders Risk FAQ count:** Currently 4 — plan assumes 5 for parity; acceptable to add one.

---

## K. Validation (research phase)

```text
git diff --stat (source files only):
  (no changes to src/ or public/images/)
```

| Check | Result |
|-------|--------|
| PRODUCTION SOURCE FILES CHANGED | **NO** |
| EXPLORER FILES CHANGED | **NO** |
| IMAGES CHANGED | **NO** |
| FROZEN ROUTES CHANGED | **NO** |
| TRANSPORTATION ROUTES CHANGED | **NO** |

---

## Concise summary for owner review

### BUILDERS RISK — key findings

- Project-specific **property** coverage; not statutory but practically required by lenders/contracts.
- Current page has **2 HIGH flags** from flat "Covers…" language.
- Soft costs, transit, existing structure are **endorsement-dependent** — must hedge.
- No considerations or V2 detail pairs today.

### BONDING — key findings

- Must emphasize **three-party surety** vs insurance; surety protects **obligee**, not contractor.
- Ontario **public contracts ≥ $500k** require performance + payment bonds at **≥50%** each (O.Reg.).
- Bid bonds are **tender/contractual**, not universal statute.
- Fidelity is **insurance** — currently mixed with surety on page.
- **3 MEDIUM** flags on guarantee language.

### CONTRACTORS — key findings

- Operating business focus; **OCIP/wrap and sub compliance** are strongest differentiators.
- **Protected 4-image static Explorer** — copy-only remediation.
- **1 HIGH flag** on builder's risk FAQ duplication.
- Builder's risk card should clarify **project participation**, not duplicate BR page.

### BUILDERS & DEVELOPERS — key findings

- Should emphasize **enterprise + multi-project** coordination, lender handover, completed ops tail.
- Currently duplicates builder's risk / wrap content without developer-specific depth.
- **1 HIGH flag** on flat builder's risk FAQ.

### TOP FACTUAL RISKS

1. Flat "Covers / guarantees" language (existing HIGH/MEDIUM flags)
2. Implying BR automatically includes soft costs, transit, existing structure
3. Treating surety bonds as contractor-protective insurance
4. Publishing bid bond as statutory requirement for all public work
5. OCIP/wrap described as full GL replacement for trades
6. Any unverified Ontario bonding threshold beyond cited O.Reg. provisions

### PROPOSED EXPLORER STATES

- **Builder's Risk:** 4 states (IDs unchanged) — add V2 pairs
- **Bonding:** 5 states (IDs unchanged) — add V2 pairs; reframe fidelity
- **Contractors:** 4 states (**frozen IDs + images**) — add V2 pairs only
- **Builders & Developers:** 4 states (IDs unchanged) — add V2 pairs

### READY FOR IMPLEMENTATION

**YES** — research and architecture complete. Phase 2 may proceed after owner review of fidelity placement, bonding page naming, and claim register.

---

**STOP FOR OWNER REVIEW — NO MERGE · NO DEPLOY · NO VERCEL PROMOTION**
