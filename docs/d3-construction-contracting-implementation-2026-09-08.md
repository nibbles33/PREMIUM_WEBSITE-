# D3 Construction & Contracting — Phase 2 Implementation

**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Research commit:** `e246fbc`  
**Research report:** `docs/d3-construction-contracting-research-2026-09-08.md`  
**Implementation date:** 2026-09-08 / 2026-09-09  
**Isolated worktree:** `/tmp/PREMIUM_WEBSITE-d3-transportation`

---

## Worktree verification (Step 0)

| Check | Result |
|-------|--------|
| **WORKTREE** | `/tmp/PREMIUM_WEBSITE-d3-transportation` |
| **BRANCH** | `cursor/coverage-explorer-ux-v2-2026-09-07` |
| **HEAD (pre-impl)** | `e246fbc` (research) |
| **STATUS** | Known pre-existing modified QA screenshot `restaurant-desktop_1440.png` — **not committed, not reverted** |

---

## Owner decisions applied

| Decision | Applied |
|----------|---------|
| Remove `fidelity-bonds` from Bonding Explorer (5 → 4) | **YES** |
| Visitor-facing name **Surety Bonds**; route remains `/bonding-insurance/` | **YES** |
| No Tarion / HCRA / residential warranty tariff numeric claims | **YES** — omitted |

---

## Before → after (four routes)

| Route | Grade | Words | HIGH | MEDIUM | LOW | Explorer states | Considerations | FAQs |
|-------|-------|------:|-----:|-------:|----:|----------------:|---------------:|-----:|
| `/builders-risk-insurance/` **before** | D | 292 | 2 | 0 | 0 | 4 | 0 | 4 |
| `/builders-risk-insurance/` **after** | **A** | **1051** | **0** | **0** | **0** | 4 | **8** | **5** |
| `/bonding-insurance/` **before** | D | 448 | 0 | 3 | 1 | **5** | 0 | 5 |
| `/bonding-insurance/` **after** | **A** | **1257** | **0** | **0** | **3** | **4** | **8** | **5** |
| `/contractors-insurance/` **before** | D | 345 | 1 | 0 | 0 | 4 | 0 | 5 |
| `/contractors-insurance/` **after** | **A** | **1014** | **0** | **0** | **0** | 4 | **8** | **5** |
| `/builders-developers-insurance/` **before** | D | 380 | 1 | 0 | 0 | 4 | 0 | 5 |
| `/builders-developers-insurance/` **after** | **A** | **991** | **0** | **0** | **1** | 4 | **8** | **5** |

LOW flags remaining (acceptable; not HIGH/MEDIUM):

- Bonding: surety technical use of “guarantees”; verified `$500,000` Construction Act citations (scanner “verify numeric” LOW).
- Builders & Developers: scanner false-positive on “without treating every optional product as mandatory.”

---

## Site classification totals

| | A | B | C | D |
|--|--:|--:|--:|--:|
| **SITE BEFORE** | 16 | 16 | 18 | 8 |
| **SITE AFTER** | **20** | 16 | 18 | **4** |

Four construction D routes remediations → A (+4 A, −4 D).

---

## Bonding Explorer change

| Check | Result |
|-------|--------|
| **BONDING STATE COUNT** | **5 → 4** |
| **FIDELITY STATE REMOVED** | **YES** |
| Remaining IDs | `bid-bonds`, `performance-bonds`, `labour-material-payment-bonds`, `licence-permit-bonds` |
| Zone map key `fidelity-bonds` removed from | `src/data/coverage-explorer/interaction-manifest/routes.ts` |
| Crime/Fidelity product page | **Unchanged** (still live at `/crime-fidelity-insurance/`); cross-linked from Surety related rail |

---

## Contractors Explorer — protected architecture

| Check | Result |
|-------|--------|
| **CONTRACTORS STATIC ARCHITECTURE PRESERVED** | **YES** |
| STATIC IMAGE COUNT | **4** |
| MOTION INTRODUCED | **NO** |
| IMAGE MAPPINGS CHANGED | **NO** |
| State IDs unchanged | `general-liability`, `tools-equipment-coverage`, `builder-s-risk`, `wrap-up-liability` |
| Mapping | liability / tools-equipment / property / installation-work |
| Files NOT modified | `contractors-coverage-state-images.ts`, `buildRouteExplorerConfig.ts` contractors branch, `public/images/contractors-insurance-state-*.png` |

Copy-only: V2 `shortLabel` / `description` / `detailTitle` / `detailDescription`, hero, considerations, FAQs.

---

## Safety / freeze checks

| Check | Result |
|-------|--------|
| **FROZEN ROUTES UNCHANGED** | **YES** |
| TRANSPORTATION ROUTES CHANGED | **NO** |
| Restaurant / Liquor / Food Truck / Hotel / Event / etc. content | **NO** |
| Carrier inventory / Partners / Claims / homepage | **NO** |
| Shared Explorer runtime | **NO** (only bonding zone-map key removal) |
| Images added/changed | **NO** (QA screenshots only) |
| Restaurant screenshot | **Not committed** |

---

## Validation

| Check | Result |
|-------|--------|
| **BUILD** | **PASS** (`npm run build`) |
| **TSC** | **PASS** (`npx tsc --noEmit`) |
| **CONTENT AUDIT** | **PASS** — all four routes **A**, 0 HIGH, 0 MEDIUM |
| **EXPLORER REGRESSION** | **PASS** (`verify-coverage-explorer-ux-v2.cjs` — daycare/restaurant/contractors) |
| **VISUAL QA** | **PASS** (`scripts/verify-d3-construction-batch.cjs` — 390/768/1024/1440; 0 overflow; Explorer tabs; expandable considerations; FAQs; 0 console errors) |

Artifacts:

- `docs/qa-screenshots/d3-construction-batch-2026-09-08/verification.json`
- Per-route screenshots under `docs/qa-screenshots/d3-construction-batch-2026-09-08/{slug}/`
- `docs/qa-screenshots/d3-construction-batch-2026-09-08/literal-claim-dump.txt`

---

## Files modified

### Content / wiring

| File | Change |
|------|--------|
| `src/data/product-pages/commercial-products-industry.ts` | Builder's Risk full remediation |
| `src/data/pilot-commercial-inline.ts` | Surety Bonds page; fidelity removed; V2 + considerations |
| `src/data/commercial-industries.ts` | Contractors + Builders & Developers full remediation |
| `src/lib/buildPilotProductConfig.ts` | Expandable considerations whitelist; trust-band overrides; related label |
| `src/lib/createPilotCommercialPage.tsx` | Bonding metadata → Surety Bonds |
| `src/data/nav-business.ts` | Nav label → Surety Bonds (href unchanged) |
| `src/components/Footer.tsx` | Footer label → Surety Bonds |
| `src/data/coverage-explorer/interaction-manifest/routes.ts` | Remove `fidelity-bonds` zone entry |
| `src/data/product-pages/commercial-products-specialty.ts` | Crime/Fidelity related link label → Surety Bonds |

### QA / tooling / docs

| File | Change |
|------|--------|
| `scripts/verify-d3-construction-batch.cjs` | **New** dedicated verifier |
| `docs/qa-screenshots/d3-construction-batch-2026-09-08/**` | Visual QA + claim dump |
| `docs/product-content-audit-2026-09-07.md` | Regenerated |
| `docs/qa-screenshots/product-content-audit-2026-09-07/audit-data.json` | Regenerated |
| `docs/qa-screenshots/coverage-explorer-ux-v2-2026-09-07/contractors-desktop_1440.png` | Updated from UX v2 regression |
| `docs/d3-construction-contracting-implementation-2026-09-08.md` | This report |

---

## Implementation highlights by route

### Builder's Risk

- Project-property / course-of-construction focus; explicit non-overlap with CGL, surety, developer enterprise.
- Soft costs, transit/off-site, existing structures, flood/earthquake framed as **not automatic**.
- 4 Explorer IDs preserved with V2 pairs; 8 expandable considerations; 5 FAQs.

### Surety Bonds (`/bonding-insurance/`)

- Headline/eyebrow/meta → **Surety Bonds**.
- Three-party principal / obligee / surety + indemnity taught in hero and considerations.
- Ontario Construction Act public-contract bonding: careful wording for **certain public contracts ≥ $500,000** requiring performance + labour/material payment bonds; general minimum **50% of contract price** each — **not** “all Ontario construction.”
- Bid bonds framed as tender/contractual, not the s.85.1 statutory performance/payment rule.
- Fidelity removed from Explorer; crime/fidelity distinguished and cross-linked.

### Contractors

- Operating contractor business; trade differentiation; certificates/AI/wrap vs own GL.
- **Copy-only** on frozen 4-static-image Explorer.

### Builders & Developers

- Enterprise/pipeline coordination; per-project BR; entity GL; wrap sponsorship; completed ops; lender/JV/handover.
- No residential warranty tariff claims.

---

## Post-implementation factual gate (literal claim dump)

Full dump: `docs/qa-screenshots/d3-construction-batch-2026-09-08/literal-claim-dump.txt`

### BUILDERS RISK — selected complete values

**FIELD PATH:** `heroLead`  
**COMPLETE CURRENT VALUE:** Builder's risk — also called course-of-construction insurance — addresses physical loss or damage to a project while it is being built or renovated. It is project-specific property coverage for the structure and work in progress, not the contractor's everyday commercial general liability policy, not a surety bond, and not a developer's full enterprise insurance program. Policies are typically arranged for a defined construction period and completed value. What responds after fire, theft, vandalism, wind, water damage, or collapse depends on the policy form, causes of loss, deductibles, exclusions, and any endorsements purchased. Soft costs, delay-in-completion, flood, earthquake, materials in transit, off-site storage, and existing structures are not automatic — each must be reviewed against wording and underwriting. Premium Insurance Brokers can help align project value, timeline, and contract or lender requirements for Windsor-Essex builds.

**FIELD PATH:** `coverageItems[1].description` (Materials On Site & In Transit)  
**COMPLETE CURRENT VALUE:** May address building materials awaiting installation on site — and, where policy wording or endorsements apply, materials in transit or at temporary storage — subject to limits, territory, and conditions.

**FIELD PATH:** `coverageItems[2].description` (Soft Costs)  
**COMPLETE CURRENT VALUE:** May address certain delay-related expenses after a covered loss — where delay-in-completion or soft-cost endorsements are purchased and subject to policy wording.

**FIELD PATH:** `coverageItems[3].description` (Existing Structure)  
**COMPLETE CURRENT VALUE:** Renovation projects may need scheduled coverage for the existing building while work proceeds — subject to underwriting and policy wording.

**FIELD PATH:** `faqItems[2].answer`  
**COMPLETE CURRENT VALUE:** Builder's risk is project property coverage — it does not replace commercial general liability or surety bonds. Soft costs, delay-in-completion, transit, and off-site storage may be available only where endorsed or expressly included. Flood, earthquake, equipment breakdown, and contractor tools are likewise not automatic. Review causes of loss and endorsements with your broker.

### SURETY — selected complete values

**FIELD PATH:** `heroLead`  
**COMPLETE CURRENT VALUE:** Surety bonding is structurally different from conventional insurance. A surety bond is a three-party obligation among the principal (usually the contractor), the obligee (the project owner or authority that requires the bond), and the surety. The bond backs the principal's contractual or licence obligation to the obligee — it does not primarily protect the contractor the way a liability policy protects an insured. If the surety pays or arranges completion after a default, the principal typically remains responsible under an indemnity agreement. Common construction instruments include bid bonds, performance bonds, and labour and material payment bonds; licence and permit bonds serve separate regulatory purposes. Employee dishonesty or crime coverage is insurance — not a construction surety bond — and is addressed on a separate product page. Premium Insurance Brokers can help Windsor-Essex contractors navigate prequalification, capacity, and tender timelines.

**FIELD PATH:** `considerations[2].description` (Ontario public contracts)  
**COMPLETE CURRENT VALUE:** Under Ontario's Construction Act, certain public contracts with a contract price of $500,000 or more require the contractor to provide both a performance bond and a labour and material payment bond on entering the contract. The general regulatory minimum coverage limit for each bond is 50 per cent of the contract price — owners may require higher amounts. This regime applies to public contracts as defined in the Act and regulations — not to every private construction project in Ontario. Bid bonds are typically set by tender documents, not by that statutory performance-and-payment rule.

**FIELD PATH:** `faqItems[2].answer`  
**COMPLETE CURRENT VALUE:** Under Ontario's Construction Act, certain public contracts with a contract price of $500,000 or more require both a performance bond and a labour and material payment bond when the contractor enters the contract. The general regulatory minimum coverage for each is 50 per cent of the contract price. This does not mean every private Ontario construction project is bonded by statute — private requirements follow the contract and tender.

**FIELD PATH:** `coverageItems[0].detailDescription` (Bid Bonds)  
**COMPLETE CURRENT VALUE:** Bid bonds and consents of surety are tender-phase instruments. They protect the owner if the low bidder withdraws — the surety's obligation is defined in the bond, and the principal typically indemnifies the surety for amounts paid. Bid bonds are generally tender or contractual requirements — not a universal statutory rule for every Ontario construction project.

### CONTRACTORS — selected complete values

**FIELD PATH:** `coverageItems[3].description` (Wrap-Up)  
**COMPLETE CURRENT VALUE:** On enrolled projects, wrap-up or OCIP programs may provide project-site liability coverage for participating trades — subject to enrollment and policy terms.

**FIELD PATH:** `coverageItems[3].detailDescription`  
**COMPLETE CURRENT VALUE:** Large projects may use an owner- or contractor-controlled wrap-up. Enrolled trades may rely on the wrap for onsite liability but typically still need their own coverage for off-site operations, auto, tools, and non-enrolled work. Read enrollment and exclusion language carefully.

**FIELD PATH:** `considerations[0].description` (certificates / additional insured)  
**COMPLETE CURRENT VALUE:** Owners and GCs often require certificates before mobilization, plus additional-insured status, waivers of subrogation, and primary/non-contributory wording. Those are contractual asks — your broker must confirm the policy can actually support them. A certificate alone does not expand coverage beyond the policy.

**FIELD PATH:** `faqItems[3].answer` (own GL if wrap-up)  
**COMPLETE CURRENT VALUE:** Often yes for off-site work, non-enrolled projects, commercial auto, tools, and any periods before or after enrollment. Wrap-ups may address certain onsite liability for enrolled parties during the project — they rarely eliminate the need for an operating contractor program entirely. Read enrollment documents carefully.

### BUILDERS & DEVELOPERS — selected complete values

**FIELD PATH:** `coverageItems[0].description` (Builder's Risk)  
**COMPLETE CURRENT VALUE:** May help address certain physical loss or damage to each project during construction — where a course-of-construction policy is purchased for that project.

**FIELD PATH:** `coverageItems[2].detailDescription` (Wrap-Up)  
**COMPLETE CURRENT VALUE:** Wrap-ups centralize certificates and limits for major projects but require active administration. They do not automatically replace every contractor's own CGL for off-site work, auto, or tools. Developers sponsoring OCIPs should coordinate insurance with counsel and any surety requirements separately.

**FIELD PATH:** `coverageItems[3].detailDescription` (Completed Operations)  
**COMPLETE CURRENT VALUE:** Latent defect and completed-operations claims may arise months or years after sale or lease-up. Policy limits, exclusions, and how long completed-operations coverage applies should be reviewed with your broker — coverage is not open-ended.

**FIELD PATH:** `considerations[1].description` (lender)  
**COMPLETE CURRENT VALUE:** Construction lenders commonly require evidence of builder's risk, liability limits, loss-payee or mortgage clauses, and sometimes wrap-up structures before releasing advances. Share loan insurance schedules early so certificates match lender conditions.

---

## STOP FOR OWNER REVIEW

**NO MERGE · NO DEPLOY · NO VERCEL PROMOTION · NO PUSH TO MAIN**

---

## FINAL PRECISION FIX (post `a4e1634`)

**Date:** 2026-09-09  
**Scope:** Targeted wording precision only — not a rewrite.

### Ontario public-contract bonding reconfirmation

| Claim | Primary source | Verified |
|-------|----------------|----------|
| **ONTARIO $500,000 THRESHOLD PRIMARY SOURCE VERIFIED** | [O. Reg. 304/18 s.12](https://www.ontario.ca/laws/regulation/180304) (current e-Laws consolidation through 2026-09-04): “Section 85.1 of the Act applies to a public contract if the contract price is $500,000 or more.” | **YES** |
| **50% MINIMUM PRIMARY SOURCE VERIFIED** | [O. Reg. 304/18 s.12.1(1)](https://www.ontario.ca/laws/regulation/180304) (via O. Reg. 260/24): minimum coverage limit for required labour/material payment and performance bonds is 50 per cent of the contract price (except as otherwise provided). | **YES** |

Surety Bonds page **not broadly rewritten**. Numeric public-contract statements retained.

### Fields changed

**Builder's Risk**

- `coverageItems[2].detailDescription` — removed “unless scheduled”; soft costs framed as form/endorsement/limits-dependent
- `considerations[2].description` — termination framed by policy wording
- `faqItems[3].answer` — same termination concept
- `considerations[6].title` — “Review workmanship, water, flood & earthquake wording”
- `considerations[5].description` — lender language de-universalized (aligned with financing-documents concept)

**Contractors** (Explorer architecture untouched)

- `faqItems[1].answer` — contract-driven subcontractor insurance (not “Usually yes…”)
- `coverageItems[3].description` / `detailDescription` — removed “rely on the wrap”
- `faqItems[3].answer` — wrap may provide certain coverage subject to wording; own program may still be needed outside wrap
- `considerations[2].description` — same wrap precision

**Builders & Developers**

- `coverageItems[0].detailDescription` / `considerations[1].description` — financing-documents-driven lender requirements
- `coverageItems[2].detailDescription` — wrap centralizes certain project liability coverage (not certificates/limits shorthand)
- `considerations[7].description` / `faqItems[3].answer` — BR ending depends on policy wording

### Literal phrase presence (post-fix)

| Phrase / concept | Present |
|------------------|---------|
| “unless scheduled” in Builders Risk soft-cost detail | **NO** |
| “Exclusions: faulty workmanship, water, flood, and earthquake” | **NO** |
| “Usually yes. General contractors and owners typically require” | **NO** |
| “Enrolled trades may rely on the wrap” | **NO** |
| “Construction lenders commonly require” | **NO** |
| “Wrap-ups centralize certificates and limits” | **NO** |
| “Substantial completion, occupancy, and ready-for-takeover often end” | **NO** |

### Validation

| Check | Result |
|-------|--------|
| **BUILD** | **PASS** |
| **TSC** | **PASS** |
| **CONTENT AUDIT** | **PASS** |
| **EXPLORER REGRESSION** | **PASS** |
| **D3 VERIFIER** | **PASS** |
| BONDING EXPLORER STATES | **4** |
| FIDELITY STATE | **ABSENT** |
| CONTRACTORS STATIC STATES | **4** |
| CONTRACTORS IMAGE MAPPINGS CHANGED | **NO** |
| CONTRACTORS MOTION INTRODUCED | **NO** |
| FROZEN ROUTES CHANGED | **NO** |
| TRANSPORTATION CHANGED | **NO** |

### Grades after precision fix

| Route | Grade | HIGH | MEDIUM |
|-------|-------|-----:|-------:|
| Builders Risk | **A** | 0 | 0 |
| Surety Bonds | **A** | 0 | 0 |
| Contractors | **A** | 0 | 0 |
| Builders & Developers | **A** | 0 | 0 |

**SITE TOTAL:** **A20 / B16 / C18 / D4**

### Complete current values for changed fields

**FIELD PATH:** `builders-risk-insurance` → `coverageItems[2].detailDescription`  
**COMPLETE CURRENT VALUE:** Interest, taxes, professional fees, and extended site overhead may require specific soft-cost coverage, limits, or endorsements depending on the policy form. Document and value soft costs explicitly — formula-only limits can understate exposure when a covered peril extends the construction period.

**FIELD PATH:** `builders-risk-insurance` → `considerations[2].description`  
**COMPLETE CURRENT VALUE:** Limits are commonly based on completed project value for the construction period defined by the policy. Completion, occupancy, policy expiry, or other conditions in the wording may affect when coverage ends. Delayed projects may require extensions before expiry, subject to insurer approval and policy terms.

**FIELD PATH:** `builders-risk-insurance` → `considerations[5].description`  
**COMPLETE CURRENT VALUE:** Construction financing agreements may require builder's risk with mortgage or loss-payee wording, minimum limits, and proof before advances — where the loan documents specify those terms. Share loan and contract insurance schedules with your broker early so certificates match what the financing actually requires.

**FIELD PATH:** `builders-risk-insurance` → `considerations[6].title`  
**COMPLETE CURRENT VALUE:** Review workmanship, water, flood & earthquake wording

**FIELD PATH:** `builders-risk-insurance` → `faqItems[3].answer`  
**COMPLETE CURRENT VALUE:** Builder's risk applies for the construction period defined by the policy. Completion, occupancy, policy expiry, or other conditions in the wording may affect when coverage ends. Delayed projects may require extensions before expiry, subject to insurer approval and policy terms. Occupancy during construction can also change how the policy responds.

**FIELD PATH:** `contractors-insurance` → `coverageItems[3].description`  
**COMPLETE CURRENT VALUE:** A wrap-up or OCIP may provide certain project-site liability coverage for enrolled trades — subject to program wording, enrollment, exclusions, and limits.

**FIELD PATH:** `contractors-insurance` → `coverageItems[3].detailDescription`  
**COMPLETE CURRENT VALUE:** Large projects may use an owner- or contractor-controlled wrap-up. A wrap-up may provide certain project-site liability coverage for enrolled trades, subject to program wording, enrollment, exclusions, and limits. Their own insurance program may still be needed for exposures outside the wrap — including off-site operations, auto, tools, and non-enrolled work.

**FIELD PATH:** `contractors-insurance` → `considerations[2].description`  
**COMPLETE CURRENT VALUE:** On Owner Controlled or Contractor Controlled Insurance Programs, a wrap-up may provide certain project-site liability coverage for enrolled trades, subject to program wording, enrollment, exclusions, and limits. Off-site operations, commercial auto, tools, and non-enrolled work usually still need your own policies. Enrollment is not a full replacement for an operating contractor program.

**FIELD PATH:** `contractors-insurance` → `faqItems[1].answer`  
**COMPLETE CURRENT VALUE:** Many contracts require subcontractors to carry their own liability insurance and provide evidence of coverage before starting work. Your own policy and a project wrap-up (where enrolled) do not automatically replace each subcontractor's contractual insurance obligations — confirm contract requirements for each tier.

**FIELD PATH:** `contractors-insurance` → `faqItems[3].answer`  
**COMPLETE CURRENT VALUE:** A wrap-up may provide certain project-site liability coverage for enrolled trades, subject to program wording, enrollment, exclusions, and limits. Your own insurance program may still be needed for exposures outside the wrap — including off-site work, non-enrolled projects, commercial auto, tools, and periods before or after enrollment. Read enrollment documents carefully.

**FIELD PATH:** `builders-developers-insurance` → `coverageItems[0].detailDescription`  
**COMPLETE CURRENT VALUE:** Developers typically arrange builder's risk per project (or via a master program) covering hard costs and endorsed extensions. Construction financing agreements may require evidence of builder's risk and other specified insurance before advances are released — including lender interests where the documents require them. Soft costs, transit, and existing structures remain endorsement-dependent.

**FIELD PATH:** `builders-developers-insurance` → `coverageItems[2].detailDescription`  
**COMPLETE CURRENT VALUE:** Wrap-ups can centralize certain project liability coverage for enrolled parties, subject to program wording, enrollment, exclusions, and limits. Administration and certificates can be discussed separately. They do not automatically replace every contractor's own CGL for off-site work, auto, or tools. Developers sponsoring OCIPs should coordinate insurance with counsel and any surety requirements separately.

**FIELD PATH:** `builders-developers-insurance` → `considerations[1].description`  
**COMPLETE CURRENT VALUE:** Construction financing agreements may require evidence of builder's risk and other specified insurance before advances are released. Required limits, lender interests, certificates, and project-specific liability requirements should be taken from the financing documents — not assumed as a universal package.

**FIELD PATH:** `builders-developers-insurance` → `considerations[7].description`  
**COMPLETE CURRENT VALUE:** Completion, occupancy, ready-for-takeover, policy expiry, or other events may affect when builder's risk ends depending on the policy wording. Permanent property, inventory, habitational, or condominium coverage should be coordinated as applicable before the construction coverage ends. Partial occupancy requires careful timing so neither policy leaves the asset uninsured.

**FIELD PATH:** `builders-developers-insurance` → `faqItems[3].answer`  
**COMPLETE CURRENT VALUE:** Completion, occupancy, ready-for-takeover, policy expiry, or other events may affect when builder's risk ends depending on the policy wording. Permanent property or inventory coverage should be coordinated as applicable before construction coverage ends. Liability for alleged post-handover injury or damage depends on completed-operations wording under the applicable GL or wrap program — review timing before units are sold or leased.

### STOP FOR OWNER REVIEW (precision fix)

**NO MERGE · NO DEPLOY · NO VERCEL PROMOTION · NO PUSH TO MAIN**
