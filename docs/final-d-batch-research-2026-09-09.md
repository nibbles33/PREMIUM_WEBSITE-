# Final D Batch — Phase 1 Research + Content Architecture

**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Approved HEAD:** `6ad0ad6`  
**Research date:** 2026-09-09  
**Phase:** RESEARCH ONLY — no page copy implementation  
**Isolated worktree:** `/tmp/PREMIUM_WEBSITE-d3-transportation`

**Routes:**
- `/crime-fidelity-insurance/`
- `/directors-officers-insurance/`
- `/employment-practices-liability-insurance/`
- `/product-recall-insurance/`

**Site audit at research start:** A20 / B16 / C18 / D4

---

## Worktree verification (Step 0)

| Check | Result |
|-------|--------|
| **WORKTREE** | `/tmp/PREMIUM_WEBSITE-d3-transportation` |
| **BRANCH** | `cursor/coverage-explorer-ux-v2-2026-09-07` |
| **HEAD** | `6ad0ad6` |
| **HEAD contains 6ad0ad6** | YES |
| **STATUS** | Pre-existing dirty QA screenshot only: `docs/qa-screenshots/coverage-explorer-ux-v2-2026-09-07/restaurant-desktop_1440.png` — not modified/restored/committed. No unexpected SOURCE changes. Primary carrier worktree untouched. |

---

## A. Current-state audit

Audit basis: product-content audit @ HEAD `6ad0ad6` + source extraction.

### Summary

| Route | Grade | Words | HIGH | MED | LOW | Explorer | Considerations | FAQs | V2 detail pairs |
|-------|-------|------:|-----:|----:|----:|---------:|---------------:|-----:|-----------------|
| `/crime-fidelity-insurance/` | **D** | 253 | 1 | 0 | 0 | 4 | 0 | 4 | **None** |
| `/directors-officers-insurance/` | **D** | 331 | 1 | 0 | 0 | 4 | 3 (thin) | 4 | **None** |
| `/employment-practices-liability-insurance/` | **D** | 227 | 1 | 0 | 0 | 4 | 0 | 4 | **None** |
| `/product-recall-insurance/` | **D** | 252 | 2 | 0 | 0 | 4 | 0 | 4 | **None** |

All four: shallow depth, absolute “Covers…” language, no Explorer V2 left/right split, missing or thin practical considerations.

---

### A1. `/crime-fidelity-insurance/`

**Source:** `src/data/product-pages/commercial-products-specialty.ts` (~1404–1478)  
**Master image:** `crime-fidelity-insurance-interactive-master.png` · archetype `office-suite`

| Item | Current |
|------|---------|
| **Hero** | Headline: Crime & Fidelity Insurance · Subhead: Protection against internal theft, fraud, and criminal acts that commercial property and liability policies typically exclude. |
| **Coverage intro** | Crime policies address losses from employee dishonesty, forgery, theft of money and securities, and computer fraud. |
| **HIGH** | `coverage:Employee Dishonesty` — “Covers theft of money, securities, or property by employees acting fraudulently.” |

| State ID | Title | shortLabel | description (RIGHT) | detailTitle/detailDescription |
|----------|-------|------------|---------------------|-------------------------------|
| `employee-dishonesty` | Employee Dishonesty | *(auto)* | Covers theft… | — |
| `forgery-alteration` | Forgery & Alteration | *(auto)* | Addresses losses from forged… | — |
| `theft-of-money-securities` | Theft of Money & Securities | *(auto)* | Covers robbery and theft… | — |
| `computer-fraud` | Computer Fraud | *(auto)* | May cover… fraudulent electronic transfers and social engineering schemes. | — |

**Zones:** employee-dishonesty → reception-lobby, server-closet · forgery → reception-lobby, open-office · theft → reception-lobby, server-closet · computer-fraud → server-closet, open-office  

**Considerations:** 0  
**FAQs:** 4 (property vs crime; crime vs fidelity bonds; wire fraud; controls)  
**CTA:** Handle cash or client funds?  

**Issues:** Absolute “Covers…”; computer-fraud card **conflates social engineering with computer fraud** (factually risky under Canadian case law); fidelity vs surety distinction already improved on bonding page — this page must stay aligned.

---

### A2. `/directors-officers-insurance/`

**Source:** `src/data/product-pages/commercial-products-core.ts` (~296–386)  
**Master image:** `directors-officers-insurance-interactive-master.png` · archetype `office-suite`

| Item | Current |
|------|---------|
| **Hero** | Coverage for directors, officers, and board members when management decisions face legal challenge… |
| **Coverage intro** | D&O policies address personal liability exposures leaders face when acting in their official capacity. |
| **HIGH** | FAQ — “GL covers the organization's operational liability, not personal claims against directors…” |

| State ID | Title | description notes |
|----------|-------|-------------------|
| `side-a-individual-coverage` | Side A — Individual Coverage | “Protects directors…” absolute |
| `side-b-corporate-reimbursement` | Side B — Corporate Reimbursement | Reimburses org when it indemnifies |
| `side-c-entity-coverage` | Side C — Entity Coverage | Partially hedged (“depending on policy form”) |
| `defence-costs` | Defence Costs | “often irrespective of outcome” — omit whether costs erode limits |

**Considerations:** 3 thin (private vs public; investor/lender; EPL overlap)  
**FAQs:** 4 including HIGH GL FAQ  
**CTA:** Protect your leadership team?

**Issues:** Flat GL FAQ language; Side A/B absolute verbs; defence costs silent on limit erosion; no claims-made/reporting depth.

---

### A3. `/employment-practices-liability-insurance/`

**Source:** `src/data/product-pages/commercial-products-specialty.ts` (~1479–1553)  
**Master image:** `employment-practices-liability-interactive-master.png` · archetype `office-suite`

| Item | Current |
|------|---------|
| **Hero** | Coverage for claims from current, former, and prospective employees alleging wrongful workplace practices. |
| **Coverage intro** | EPL addresses employment-related claims that general liability and D&O may not fully cover. |
| **HIGH** | `coverage:Wrongful Termination` — “Covers claims alleging improper dismissal or constructive dismissal.” |

| State ID | Title |
|----------|-------|
| `wrongful-termination` | Wrongful Termination |
| `harassment-discrimination` | Harassment & Discrimination |
| `retaliation-claims` | Retaliation Claims |
| `defence-costs` | Defence Costs |

**Considerations:** 0  
**FAQs:** 4 (EPL vs WSIB; small biz; D&O overlap; HR practices)  
**CTA:** Employ staff in Ontario?

**Issues:** Absolute “Covers…”; no ESA/human-rights hedging (must not imply insurance pays statutory termination/severance); defence-costs card absolute; thin Ontario employment-law context without becoming legal advice.

---

### A4. `/product-recall-insurance/`

**Source:** `src/data/product-pages/commercial-products-industry.ts` (~776–849)  
**Master image:** `product-recall-insurance-interactive-master.png` · archetype `industrial-warehouse`

| Item | Current |
|------|---------|
| **Hero** | Coverage for the cost of pulling products from the market — notification, transport, storage, and disposal… |
| **Coverage intro** | Product recall helps with expenses to withdraw… — separate from liability for injury claims. |
| **HIGH ×2** | FAQ — “Product liability covers…” · “Recall covers the cost of withdrawing products…” |

| State ID | Title | Risk |
|----------|-------|------|
| `recall-expenses` | Recall Expenses | Absolute “Covers costs…” |
| `replacement-costs` | Replacement Costs | Partially hedged |
| `consultant-lab-fees` | Consultant & Lab Fees | Absolute “Addresses…” |
| `brand-rehabilitation` | Brand Rehabilitation | Partially hedged |

**Considerations:** 0  
**FAQs:** 4 (liability vs recall; who triggers; lost profits; distributors)  
**CTA:** Manufacture or distribute consumer products?

**Issues:** Flat “covers” in FAQ and cards; hero implies cost elements are included; brand rehab/replacement/BI not universal; regulatory framing thin.

---

## B. Crime & Fidelity — research synthesis

### [COVERAGE]

Commercial crime / employee dishonesty (fidelity) is typically **first-party** coverage for the insured’s loss of money, securities, or property from defined dishonest acts — subject to insuring agreements, definitions, and exclusions.

Common Canadian/market insuring agreements (structure varies by form):

| Agreement | Concept |
|-----------|---------|
| Employee dishonesty / employee theft | Theft by a person meeting the policy’s **employee** definition |
| Forgery or alteration | Loss from forged or altered financial instruments |
| Theft of money and securities | Robbery/burglary/theft of money & securities on premises / in transit (wording-dependent) |
| Computer fraud | Often requires fraudulent use of a computer to **cause** a transfer — not merely email deception |
| Funds transfer fraud | Often requires fraudulent instructions to a **financial institution** without the insured’s knowledge/consent |
| Social engineering / fraudulent instruction | Frequently a **separate endorsement** with lower sublimits and verification conditions |

**Canadian case illustrations (coverage architecture — not page case cites for visitors):**  
- *The Brick Warehouse LP v. Chubb* (Alberta): vendor-impersonation / social engineering loss **not** within funds transfer fraud where the bank acted on the insured’s own authorized instructions.  
- *Future Electronics v. Chubb* (Quebec Superior Court, 2020): social engineering endorsement applied; computer fraud / funds transfer fraud agreements did **not** respond to the voluntary transfer facts as pled.

**CRITICAL for visitor copy:** Do **not** say computer fraud “covers social engineering.” Current page description does exactly that — must hedge and separate.

### [UNDERWRITING]

Typical quote inputs (not universal formulas): internal controls (dual authorization, segregation of duties), employee count/roles, cash handling, prior losses, background-check practices, limits/sublimits requested, whether client property or third-party crime is needed, desire for social-engineering endorsement.

### [REGULATORY] / [LEGAL]

No Ontario statute requires commercial crime insurance for all businesses. Some regulated professions/sectors impose fidelity or bonding-like requirements (already distinguished on Surety Bonds page) — do not conflate **surety bonds** with **crime insurance**.

### [EXPOSURE]

Insider theft; forged instruments; cash robbery; wire/payment fraud; inventory shortage disputes (inventory shortage alone often insufficient to prove employee dishonesty without other evidence — policy-dependent).

### [CONTRACTUAL]

Client contracts may require crime/fidelity evidence for parties handling client funds; certificates do not expand coverage.

**Preserve Explorer IDs:** YES — all four remain conceptually appropriate if computer-fraud copy is corrected.

**Owner flag:** Consider whether a future 5th state or card for social engineering is desirable — **not** required to change IDs in Phase 2; can address via computer-fraud LEFT copy + consideration + FAQ.

---

## C. D&O — research synthesis

### [COVERAGE]

Typical ABC structure (forms vary; not every policy is identical):

| Side | Who benefits | When it responds (conceptually) |
|------|--------------|----------------------------------|
| **A** | Individual directors/officers | When the organization **cannot or will not** indemnify (e.g., insolvency, legal prohibition) |
| **B** | Organization | Reimburses the organization after it **indemnifies** insured persons |
| **C / Entity** | Organization itself | Entity claims — **public** forms often limited to **securities** claims; **private/nonprofit** forms may be broader **or** narrower depending on wording |

Defence costs: commonly **claims-made**; frequently **erode** the shared limit (defence “inside the limits”) unless a form enhancement places defence outside limits. Do not imply defence is always outside limits or “irrespective of outcome” without hedging.

### [UNDERWRITING]

Organization type (private/public/nonprofit), financials, claims history, board composition, M&A/change-in-control plans, continuity/prior-and-pending dates, EPL whether separate or packaged, requested limits/retentions.

### [LEGAL] / [CONTRACTUAL]

Corporate statutes and by-laws govern **indemnification** capacity — insurance responds subject to policy and indemnification facts. D&O does **not** erase personal liability for all conduct (fraud/dishonesty exclusions with final adjudication language are common). Not legal advice.

### [EXPOSURE]

Alleged wrongful acts in management capacity; regulatory investigations (coverage highly wording-dependent); creditor claims in distress; employment-related claims that may belong in **EPL** instead of or in addition to D&O.

**Preserve Explorer IDs:** YES.  
**Side C copy must stress variance by organization type.**  
**Defence-costs state must mention possible limit erosion.**

---

## D. EPL — research synthesis

### [COVERAGE]

EPL may respond to certain **employment-related allegations** (wrongful dismissal/termination, discrimination, harassment, retaliation, failure to hire/promote, etc.) — **subject to policy definitions, exclusions, and claims-made conditions**. Defence costs often a major value of the product.

Does **not** automatically pay:

- ESA termination pay / severance pay as statutory wages  
- all common-law severance packages  
- all Human Rights Tribunal awards  
- fines/penalties  
- intentional criminal conduct  

Ontario case lesson (*Re Dr. Max Neiman and CGU*, Ont. S.C.J. commentary widely cited in Canadian EPL analyses): wording matters — contract exclusions, “damages” vs tribunal “compensation,” and duty-to-defend scope can defeat coverage even when allegations look “employment-related.”

### [REGULATORY] / [LEGAL] — Ontario context (context only — not legal advice)

| Source | Use on page |
|--------|-------------|
| **Employment Standards Act, 2000** | Employers may owe **termination pay** and, where applicable, **severance pay** as **statutory** obligations — separate from insurance. ESA guide: termination and severance rules are distinct; employees may have greater common-law rights. |
| **Human Rights Code, R.S.O. 1990, c. H.19** | Right to equal treatment in employment; workplace harassment protections (s.5). Allegations may drive EPL claims — insurance response still policy-specific. |
| **OHSA** | Workplace harassment policies/training obligations create **compliance** context for underwriting; not an insurance mandate. |
| **WSIB** | Injury/disease system — **not** EPL (current FAQ correctly distinguishes; preserve). |

### [UNDERWRITING]

Employee count, turnover, prior claims/complaints, written policies, training, restructuring/layoff plans, multi-jurisdiction workers, third-party EPL need, HR practices.

### [EXPOSURE]

Termination disputes; human rights complaints; harassment allegations; retaliation after complaints; hiring/promotion disputes.

**Preserve Explorer IDs:** YES.

---

## E. Product Recall — research synthesis

### [COVERAGE]

Product recall / contamination / withdrawal expense insurance addresses specified **first-party costs** of recalling or withdrawing products after a defined insured event — **not** third-party bodily injury/property damage (that is **product liability**).

Common expense categories (endorsement/form dependent): notification, shipping, storage, disposal/destruction, replacement, consultant/lab testing, crisis consultants, limited brand rehabilitation, sometimes BI/lost profit with separate triggers/sublimits.

### [REGULATORY] — Canada (safe framing)

| Authority | Supportable statement |
|-----------|----------------------|
| **CFIA** (food) | Most food recalls are **voluntary** company actions with CFIA oversight; Minister of Health may order **mandatory** recall if company unable/unwilling and food poses health risk. CFIA classifies Class I/II/III. (CFIA “How we decide to recall a food,” modified 2026-05-15.) |
| **Health Canada / CCPSA** | Non-food consumer products: suppliers often recall voluntarily; Minister may order recall if product is a danger to human health or safety. Some product categories excluded from CCPSA (drugs, medical devices, food, vehicles, etc. — other regimes). |

**Do NOT imply:** every regulatory request or voluntary withdrawal automatically triggers insurance; every Class I event is insured; CFIA “covers” costs.

### [UNDERWRITING]

Product types, distribution footprint, traceability/lot coding, recall plan, prior incidents, supply-chain role (manufacturer vs distributor vs importer), requested expense categories, SIRs/sublimits.

### [EXPOSURE]

Contamination, undeclared allergen, foreign material, labelling error, malicious tampering (often separate), component/ingredient recall cascading through customers.

**Preserve Explorer IDs:** YES.  
**Visitor title note:** “Replacement Costs” / “Brand Rehabilitation” should read as **conditional** expense categories, not automatic inclusions.

---

## F. Primary / authoritative sources

| # | Source | Use |
|---|--------|-----|
| 1 | [Human Rights Code, R.S.O. 1990, c. H.19](https://www.ontario.ca/laws/statute/90h19) | Employment equality / workplace harassment rights |
| 2 | [ESA guide — Termination](https://www.ontario.ca/document/your-guide-employment-standards-act-0/termination-employment) | Termination pay vs insurance |
| 3 | [ESA guide — Severance pay](https://www.ontario.ca/document/your-guide-employment-standards-act-0/severance-pay) | Severance ≠ EPL payout |
| 4 | [CFIA — How we decide to recall a food](https://inspection.canada.ca/en/food-safety-consumers/how-recall-food-product) (modified 2026-05-15) | Voluntary vs mandatory food recall; Class I–III |
| 5 | [Canada Consumer Product Safety Act — Quick Reference](https://www.canada.ca/en/health-canada/services/consumer-product-safety/reports-publications/industry-professionals/canada-consumer-product-safety-act-guide.html) | Health Canada consumer product recall orders |
| 6 | [Recalling Consumer Products — Industry Guide](https://www.canada.ca/en/health-canada/services/consumer-product-safety/reports-publications/industry-professionals/recalling-consumer-products-guide-industry.html) | Voluntary industry practice vs order authority |
| 7 | Canadian case analyses: *Brick Warehouse v. Chubb*; *Future Electronics v. Chubb* (coverage architecture for social engineering) | Crime: computer fraud ≠ social engineering |
| 8 | Stikeman Elliott / Canadian counsel primers on D&O Side A/B/C | Management liability structure |
| 9 | Canadian EPL analyses citing *Neiman* (wording limits) | EPL not automatic for all employment claims |
| 10 | HSB Canada / specialty insurer EPL product outlines | Conditional coverage lists (market context only) |

**Not used as regulatory authority:** generic broker SEO blogs.

---

## G. Cross-page differentiation matrix

| Row | Crime & Fidelity | D&O | EPL | Product Recall |
|-----|------------------|-----|-----|----------------|
| **PRIMARY CUSTOMER** | Business handling money/property/employees with cash/controls exposure | Organizations with directors/officers/boards | Employers with workforce | Manufacturers/importers/distributors of products |
| **CORE EXPOSURE** | First-party loss from dishonest/fraudulent acts | Alleged wrongful acts in management capacity | Employment-related allegations | Cost of withdrawing/recalling products |
| **WHAT TRIGGERS DISCUSSION** | Theft, forgery, payment fraud, missing funds | Shareholder/regulator/creditor/stakeholder claims vs leadership | Termination, harassment, discrimination, retaliation claims | Contamination, defect, allergen, regulator/company recall |
| **WHAT PRODUCT MAY RESPOND TO** | Defined crime insuring agreements | Side A/B/C + defence (form-dependent) | Defined employment wrongful acts + defence | Defined recall/withdrawal expense categories |
| **MAJOR LIMITATIONS** | Employee definition; social engineering gaps; inventory shortage proof | Conduct exclusions; claims-made; Side C variance; limit erosion | Statutory pay exclusions; intentional acts; wording traps | Trigger definitions; BI/brand not automatic; liability separate |
| **UNDERWRITING INFO** | Controls, headcount, cash, prior loss | Org type, financials, M&A, claims | Headcount, HR policies, claims, restructuring | Products, traceability, recall plan, role in chain |
| **CLAIMS-MADE / DISCOVERY** | Often discovery or loss-sustained (form-specific) | Typically claims-made + reporting | Typically claims-made + reporting | Event/trigger based (form-specific) |
| **ADJACENT PRODUCTS** | Cyber, surety (distinct), CGL | EPL, professional liability, cyber | D&O, CGL, WSIB (distinct) | Product liability, CGL, BI |
| **DOES NOT BELONG** | Surety bond mechanics; cyber privacy response as core | Everyday CGL ops; tools; BR | ESA compliance advice; WSIB injury claims | Injury claims (product liability page) |
| **BEST EXPLORER** | Dishonesty; forgery; money/securities; computer fraud *(hedge SE)* | Side A; Side B; Side C; defence costs | Termination; harassment/discrimination; retaliation; defence | Recall expenses; replacement*; consultants*; brand rehab* |
| **BEST CONSIDERATIONS** | Employee definition; SE gap; controls; discovery | Org type; ABC; claims-made; erosion; runoff | ESA vs insurance; HR; claims-made; restructuring | Liability vs recall; voluntary vs mandatory; trigger; traceability |
| **BEST FAQs** | SE vs computer fraud; cyber overlap; employee definition | ABC; GL vs D&O; defence; nonprofit | Severance; WSIB; D&O overlap; quote info | Liability vs recall; every recall insured?; BI; quote info |

### Explicit adjacent distinctions

| Pair | Distinction |
|------|-------------|
| **Crime vs Cyber** | Crime = first-party money/property from defined dishonest/fraudulent acts. Cyber = network/privacy/incident response/extortion — may overlap on funds transfer but **not interchangeable**. |
| **D&O vs EPL** | D&O = management/governance wrongful acts. EPL = employment practices allegations. Overlap exists; often both needed. |
| **D&O vs Professional Liability** | Professional liability = errors in rendering professional services. D&O = management decisions / governance — different wrongful-act definitions. |
| **Product Recall vs Product Liability** | Recall = expense of withdrawal. Liability = third-party injury/damage claims from products. |

---

## H. Explorer V2 content plan

**Pattern:** RIGHT = what is this? · LEFT = why it matters · no duplicated sentences.  
**ID changes:** **NONE proposed for implementation without owner approval.**

### H1. Crime & Fidelity — preserve 4 IDs

| State ID | shortLabel | description (RIGHT) | detailTitle (LEFT) | detailDescription (LEFT) |
|----------|------------|---------------------|--------------------|---------------------------|
| `employee-dishonesty` | Employee Theft | May help address certain direct loss of money, securities, or property caused by employee theft or dishonesty — where purchased and subject to the policy’s employee definition, conditions, and exclusions. | Insider theft is usually excluded from ordinary property coverage | Standard commercial property policies typically exclude theft by employees. Crime coverage is a separate first-party product. Inventory shortage alone often does not prove a covered employee-dishonesty loss without other evidence — follow policy proof requirements. |
| `forgery-alteration` | Forgery | May help address certain losses from forgery or alteration of cheques or specified financial instruments — subject to policy wording. | A forged instrument can drain an account before anyone notices | Forgery and alteration agreements focus on instrument fraud, not every contract dispute. Banking controls and dual signatures affect both prevention and underwriting. |
| `theft-of-money-securities` | Money & Securities | May help address certain robbery, burglary, or theft of money and securities on premises or in transit — where the form provides those agreements and subject to limits. | Cash and negotiable instruments need their own crime agreements | Ordinary property forms often treat money and securities differently from stock-in-trade. Transit to the bank and on-premises holdup exposures should be scheduled accurately. |
| `computer-fraud` | Computer Fraud | May help address certain losses from computer fraud as defined in the policy — typically involving fraudulent use of a computer to cause a transfer. **Social engineering / voluntary fraudulent-instruction losses are often treated separately** and may require a specific endorsement. | A convincing email is not the same as a computer takeover | Canadian claim disputes show social-engineering losses frequently fall outside traditional computer-fraud or funds-transfer agreements when an employee voluntarily authorizes payment. Ask whether fraudulent-instruction coverage is included and at what sublimit. |

### H2. D&O — preserve 4 IDs

| State ID | shortLabel | description (RIGHT) | detailTitle (LEFT) | detailDescription (LEFT) |
|----------|------------|---------------------|--------------------|---------------------------|
| `side-a-individual-coverage` | Side A | May help respond to certain covered loss that insured directors or officers must bear personally when the organization cannot or does not indemnify them — subject to policy terms. | Personal assets are exposed when indemnification fails | Side A matters most in insolvency or non-indemnifiable situations. It does not erase every personal exposure — conduct exclusions and final-adjudication language still apply. |
| `side-b-corporate-reimbursement` | Side B | May reimburse the organization when it indemnifies directors or officers for covered claims — typically subject to a retention. | The company’s indemnity promise needs balance-sheet backup | Side B protects the entity’s cash after it advances defence or settlement for individuals. Deductibles/retentions usually attach here rather than on Side A. |
| `side-c-entity-coverage` | Side C | May extend to certain claims against the **organization itself** — scope varies materially by form and whether the insured is public, private, or nonprofit. | Entity coverage is not one-size-fits-all | Public-company Side C is often limited to securities claims. Private and nonprofit forms may be broader or packaged differently. Do not assume Side C covers every lawsuit naming the company. |
| `defence-costs` | Defence | May help with legal defence costs for covered claims — often on a claims-made basis. Defence costs frequently **erode** shared policy limits unless the form provides otherwise. | Legal bills can consume the limit before settlement | Management liability disputes are expensive. Confirm whether defence is inside or outside limits, how advancement works, and reporting deadlines after a claim or circumstance. |

### H3. EPL — preserve 4 IDs

| State ID | shortLabel | description (RIGHT) | detailTitle (LEFT) | detailDescription (LEFT) |
|----------|------------|---------------------|--------------------|---------------------------|
| `wrongful-termination` | Termination | May help respond to certain claims alleging wrongful dismissal, termination, or constructive dismissal — subject to policy definitions and exclusions. | Termination disputes are common — insurance is not severance pay | Ontario employers may owe ESA termination pay or severance as **statutory** obligations regardless of insurance. EPL, where purchased, addresses certain **claims/allegations** under policy wording — it does not automatically fund statutory wages or every common-law package. |
| `harassment-discrimination` | Harassment | May help respond to certain harassment or discrimination allegations in employment — subject to policy wording and exclusions. | Human rights and workplace allegations create defence exposure | The Ontario Human Rights Code protects equal treatment and freedom from workplace harassment. Allegations may lead to tribunal or court proceedings. Whether EPL defends or indemnifies depends on the policy — not on the allegation alone. |
| `retaliation-claims` | Retaliation | May help respond to certain allegations that an employer retaliated after a protected complaint or report — subject to policy wording. | Reporting misconduct can precede a second claim | Retaliation allegations often follow harassment, safety, or human-rights complaints. Documented investigation and non-retaliation practices matter for both risk management and underwriting. |
| `defence-costs` | Defence | May help with defence costs for covered employment claims — often claims-made, subject to limits, retentions, and exclusions. | Defence can dominate the cost of an employment claim | Even disputed claims generate legal expense. Confirm reporting conditions, whether human-rights proceedings are covered as “claims,” and how defence interacts with indemnity. |

### H4. Product Recall — preserve 4 IDs

| State ID | shortLabel | description (RIGHT) | detailTitle (LEFT) | detailDescription (LEFT) |
|----------|------------|---------------------|--------------------|---------------------------|
| `recall-expenses` | Recall Expense | May help with certain first-party expenses to notify, retrieve, store, and dispose of affected products after a covered recall or withdrawal event — subject to the policy trigger and exclusions. | Pulling product is an operations problem before it is a liability lawsuit | Product liability addresses injury/damage claims. Recall expense coverage addresses the cost of getting product out of the market when the insured event is met — voluntary or regulator-involved actions do not automatically equal coverage. |
| `replacement-costs` | Replacement | May help with certain costs to replace recalled product with conforming product — **only where the form or endorsement includes replacement expense**. | Replacement is a separate expense category — not automatic | Many programs schedule or sublimit replacement separately from basic recall expense. Confirm whether customer refunds, rework, or new production are included. |
| `consultant-lab-fees` | Consultants | May help with certain consultant, crisis-management, or laboratory testing costs tied to a covered recall event — where included. | Finding the source and scope drives both cost and credibility | Lab work and recall consultants can be required quickly for allergen, pathogen, or foreign-material events. These fees are not universally built into every recall form. |
| `brand-rehabilitation` | Brand Rehab | May help with limited crisis-communication or brand-restoration expenses after a covered event — **only where purchased and subject to sublimits**. | Reputation spend is optional coverage, not a free add-on | Brand rehabilitation is frequently limited or endorsed. Lost profits/business interruption, if available, usually need separate triggers — do not assume they follow recall expense automatically. |

---

## I. Practical considerations plan (~6–9 each)

### Crime & Fidelity (8)
1. Employee definition vs contractors/temps/owners  
2. Social engineering / fraudulent instruction vs computer fraud  
3. Money & securities limits and transit  
4. Internal controls insurers expect to see  
5. Discovery / loss-sustained / reporting conditions (form-specific)  
6. Prior loss and proof-of-loss expectations  
7. Client property / third-party crime if handling others’ funds  
8. Crime vs cyber coordination  

### D&O (8)
1. Private vs public vs nonprofit forms  
2. Side A / B / C structure and retentions  
3. Claims-made reporting and prior/pending litigation dates  
4. Defence costs inside vs outside limits  
5. Conduct / fraud exclusions  
6. EPL and professional liability overlap  
7. M&A / change in control / runoff  
8. Investor or lender insurance schedules  

### EPL (8)
1. Workforce size, turnover, and jurisdictions  
2. Written HR / harassment / investigation procedures  
3. Termination and restructuring planning  
4. ESA statutory pay vs insured claims (critical)  
5. Human rights / harassment allegation defence  
6. Claims-made reporting  
7. Wage/hour and contractual exclusions  
8. Third-party EPL (customers/vendors) where relevant  

### Product Recall (8)
1. Product type and regulatory regime (food vs consumer product)  
2. Traceability / lot coding / batch records  
3. Written recall plan and roles  
4. Manufacturer vs importer vs distributor contractual duties  
5. Insured event / trigger definitions  
6. Which expense categories are scheduled (replacement, consultants, brand, BI)  
7. Supply-chain cascading recalls  
8. Coordination with product liability limits  

---

## J. FAQ plan (5 each)

### Crime
1. Does commercial property cover employee theft?  
2. Is social engineering the same as computer fraud?  
3. Does cyber insurance replace crime coverage for stolen funds?  
4. Who counts as an “employee” under a crime policy?  
5. What information is needed to quote crime coverage?  

### D&O
1. Does D&O protect the company, the directors, or both?  
2. What are Side A, Side B, and Side C?  
3. Are defence costs covered — and do they reduce the limit?  
4. Does CGL cover management decisions? *(fix HIGH flag)*  
5. What happens to coverage after ownership or control changes?  

### EPL
1. Does EPL pay ESA termination pay or severance?  
2. What types of employment allegations may be insured?  
3. Are harassment and discrimination allegations included?  
4. Is EPL the same as WSIB?  
5. What information is needed to quote EPL?  

### Product Recall
1. Is product recall the same as product liability? *(fix HIGH flags)*  
2. Does every recall or withdrawal trigger insurance?  
3. Are voluntary recalls treated the same as mandatory recalls for coverage?  
4. Can replacement, testing, brand, or lost-profit costs be included?  
5. What information is needed to quote recall coverage?  

---

## K. Literal claim register

| # | PROPOSED CLAIM | TYPE | SOURCE | STATUS | EXACT SUPPORT | SAFE TO PUBLISH | HEDGE |
|---|----------------|------|--------|--------|---------------|-----------------|-------|
| 1 | Most Canadian **food** recalls are voluntary company actions with CFIA oversight; Minister of Health may order mandatory recall if company unable/unwilling and food poses health risk | REGULATORY | CFIA “How we decide to recall a food” | Current (modified 2026-05-15) | CFIA text on voluntary vs mandatory | **YES** — food context | Soften “most” OK |
| 2 | Health Canada may order recall of a **consumer product** under CCPSA if danger to human health or safety | REGULATORY | CCPSA quick reference / industry recall guide | Current | Minister order authority | **YES** — non-food consumer products; note exclusions | Yes — product scope |
| 3 | Ontario ESA creates employer duties for termination pay / severance (where applicable) separate from insurance | STATUTORY | ESA guides ontario.ca | Current | Termination & severance pages | **YES** as employment-law **context** | Must say insurance ≠ statutory pay |
| 4 | Ontario Human Rights Code protects equal treatment in employment and freedom from workplace harassment | STATUTORY | HRC s.5 | Current | Statute | **YES** as rights context | Insurance response still policy-specific |
| 5 | Social engineering is automatically covered under computer fraud | COVERAGE | Canadian case outcomes / form architecture | — | Brick; Future Electronics | **NO** | — |
| 6 | EPL pays all severance / ESA termination pay | COVERAGE | ESA + EPL wording practice | — | Statutory wages ≠ liability insurance | **NO** | — |
| 7 | Side C covers every claim against the entity | COVERAGE | D&O form variance | — | Public vs private differences | **NO** | REQUIRES HEDGING if discussed |
| 8 | Defence costs never reduce D&O/EPL limits | COVERAGE | Market forms | — | Often erode limits | **NO** | Say “may erode” |
| 9 | Every recall triggers product recall insurance | COVERAGE | Policy triggers | — | Event definitions vary | **NO** | — |
| 10 | Product liability pays recall withdrawal expenses | COVERAGE | Product distinction | — | Separate products | **NO** | — |
| 11 | “Covers theft…” / “Covers claims…” flat guarantees (current HIGH flags) | COVERAGE | — | — | Absolute language | **NO** as currently worded | Replace with may/subject to |
| 12 | Crime insurance is the same as a surety fidelity bond | COVERAGE | Surety vs insurance distinction | — | Three-party surety ≠ first-party crime | **NO** | Cross-link bonding/crime correctly |

---

## L. Risky / unsupported claims to avoid

1. Computer fraud “covers social engineering” (current crime card).  
2. EPL “covers” wrongful termination as if severance is insured.  
3. Flat “GL covers…” / “Product liability covers…” / “Recall covers…” FAQ openers.  
4. Side C as universal entity coverage.  
5. Defence costs “irrespective of outcome” without limit-erosion context.  
6. Brand rehabilitation / replacement / lost profits as automatic recall benefits.  
7. Invented numeric thresholds for EPL headcount mandates, D&O limit minimums, or crime deductibles.  
8. Tarion/HCRA-style residential warranty claims (out of scope).  
9. Legal advice on how to terminate employees or run a recall.  
10. Conflating WSIB, ESA, Human Rights Code remedies with insurance grants.

---

## M. Proposed implementation scope (Phase 2 — NOT STARTED)

| Route | Current | Target | Primary work |
|-------|---------|--------|--------------|
| Crime & Fidelity | D | **A** | Fix HIGH; separate SE from computer fraud; V2 pairs; 7–8 considerations; expand hero; hedge cards |
| D&O | D | **A** | Fix HIGH FAQ; Side C variance; defence erosion; deepen considerations; V2 pairs |
| EPL | D | **A** | Fix HIGH; ESA ≠ insurance; V2 pairs; 7–8 considerations; Ontario context without legal advice |
| Product Recall | D | **A** | Fix 2 HIGH FAQs; liability vs recall; conditional expense cards; CFIA/CCPSA careful framing; V2 pairs |

**Expandable considerations:** add these four slugs to `adaptCommercialProductContent` whitelist (same pattern as builders-risk/cargo).

---

## N. Files expected to change (Phase 2 only)

| File | Routes |
|------|--------|
| `src/data/product-pages/commercial-products-specialty.ts` | Crime & Fidelity; EPL |
| `src/data/product-pages/commercial-products-core.ts` | D&O |
| `src/data/product-pages/commercial-products-industry.ts` | Product Recall |
| `src/lib/buildPilotProductConfig.ts` | Expandable whitelist + optional trust-band overrides |
| `scripts/verify-final-d-batch.cjs` | **New** verifier |
| `docs/final-d-batch-implementation-*.md` | Implementation report |
| `docs/qa-screenshots/final-d-batch-*` | QA artifacts |

**Must NOT change:** Explorer runtime, images, interaction zone architecture (unless owner-approved ID change), frozen routes, transportation, construction batch, homepage, nav structure, carriers, Partners, Claims.

---

## O. Unresolved questions / owner decisions

1. **Crime — social engineering:** Keep as LEFT/FAQ/consideration under `computer-fraud`, or add a 5th Explorer state later? **Recommend Phase 2: no ID change; fix copy.**  
2. **Crime page naming:** Keep “Crime & Fidelity” (market-familiar) while clarifying fidelity ≠ surety — **recommend keep title**.  
3. **D&O defence-costs card:** Emphasize limit erosion vs “irrespective of outcome” — **recommend rewrite detail to erosion + claims-made**.  
4. **EPL “Wrongful Termination” title:** Keep ID/title; hedge body heavily regarding ESA — **recommend keep ID**.  
5. **Product Recall titles:** Keep IDs; ensure visitor titles remain expense-category labels with conditional copy — **no ID change**.  
6. **Nonprofit D&O depth:** Mention in considerations/FAQ; do not split into separate page in this batch.

---

## Concise summary for owner review

### TOP FINDINGS
- All four remain **Grade D** primarily from **flat “Covers…” language** plus thin depth (0–3 considerations; no V2 pairs).  
- Crime page incorrectly equates **computer fraud** with **social engineering** — contradicted by Canadian coverage outcomes.  
- EPL must separate **ESA statutory pay** from insured employment **claims**.  
- Product Recall must separate **withdrawal expense** from **product liability** and hedge replacement/brand/BI.  
- D&O needs Side C variance + defence-cost limit erosion.

### TOP FACTUAL RISKS
1. Social engineering treated as computer fraud  
2. EPL implied to pay severance/termination pay  
3. Absolute coverage verbs on cards/FAQs  
4. Side C overclaimed  
5. Recall expense elements treated as universal  
6. Regulatory recall authority overstated as insurance triggers  

### PROPOSED EXPLORER STATES
- Crime: 4 IDs unchanged (fix computer-fraud copy)  
- D&O: 4 IDs unchanged  
- EPL: 4 IDs unchanged  
- Product Recall: 4 IDs unchanged  

### OWNER DECISIONS NEEDED
1. Social engineering as copy-only under computer-fraud vs future 5th state  
2. Any display-title tweaks while preserving IDs  

### READY FOR IMPLEMENTATION
**YES** — research and architecture complete. Phase 2 may proceed after owner review of social-engineering placement.

---

## Phase 1 validation

```text
PRODUCTION SOURCE FILES CHANGED: NO
EXPLORER FILES CHANGED: NO
IMAGES CHANGED: NO
FROZEN ROUTES CHANGED: NO
TRANSPORTATION CHANGED: NO
CONSTRUCTION BATCH CHANGED: NO
```

**STOP FOR OWNER REVIEW — NO MERGE · NO DEPLOY · NO VERCEL PROMOTION**
