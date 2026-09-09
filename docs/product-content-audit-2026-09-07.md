# Product Content Audit — 2026-09-07

**Branch:** `cursor/content-audit-7402` (from approved baseline `cursor/site-integration-final-7402`)  
**Scope:** Audit only — **no content was changed** during this task.

---

## Explicit stop gates

- **NO MERGE**
- **NO DEPLOY**
- **NO VERCEL PROMOTION**
- **NO CONTENT REWRITES STARTED**

**STOP FOR OWNER REVIEW.** Actual content improvement work requires separate approved scope and owner/Claude drafting for specialized lines.

---

## Executive summary

| Classification | Count | Meaning |
|----------------|------:|---------|
| **A — STRONG** | 20 | Genuinely substantive, specific, no high/medium content-safety concerns |
| **B — ADEQUATE** | 16 | Reasonable depth; could be deepened; no high/medium safety flags |
| **C — THIN** | 18 | Noticeably shallow — similar pre-fix Greenhouse/Daycare pattern |
| **D — CONTENT-SAFETY** | 4 | High/medium content-safety language flagged (regardless of visual depth) |

**Total pages audited:** 58 live product routes.

**Key finding:** Only **Greenhouse & Agribusiness** (`/greenhouse-agribusiness-insurance/`) currently meets the STRONG bar established by the owner-approved fix. A large share of pages (4 D + 18 C = 22 pages, **38%**) combine thin or templated copy with unhedged "Covers…" / "Protects…" coverage-card language — the exact pattern Greenhouse was rewritten to avoid.

**Geographic targeting note:** No formal "Product Expansion 2.0" ratio document exists in the repo. This audit infers targeting from actual copy. Nearly all `metaTitle` values say Windsor-Essex; body copy varies between Windsor-Essex-primary, Windsor-Essex + Ontario, and Ontario-wide (common on personal lines).

---

## A. Full 58-row classification table

| Route | Substantive words | Coverage cards / quality | Practical considerations | FAQ count | FAQ unique? | Safety flags (high/med) | Geographic targeting | Class |
|-------|------------------:|--------------------------|--------------------------|----------:|-------------|-------------------------|----------------------|-------|
| /auto-insurance/ | 649 | 6 / specific/hedged (strong) | No | 5 | No — Shares 2+ FAQ pattern with professional-offices-insurance | 3 (low only) | Ontario-wide | **B** |
| /boat-insurance/ | 539 | 4 / specific/hedged (strong) | Yes (106w, specific/useful) | 4 | Yes | 0 | Windsor-Essex + Ontario | **B** |
| /bonding-insurance/ | 1257 | 4 / specific/hedged (strong) | Yes (491w, specific/useful) | 5 | Yes | 3 (low only) | Windsor-Essex + Ontario | **A** |
| /builders-developers-insurance/ | 1022 | 4 / specific/hedged (strong) | Yes (355w, specific/useful) | 5 | Yes | 1 (low only) | Windsor-Essex-primary | **A** |
| /builders-risk-insurance/ | 1071 | 4 / specific/hedged (strong) | Yes (393w, specific/useful) | 5 | Yes | 0 | Windsor-Essex + Ontario | **A** |
| /business-interruption-insurance/ | 395 | 4 / specific/hedged (strong) | Yes (66w, moderate) | 4 | Yes | 0 | Windsor-Essex-primary | **C** |
| /cargo-freight-insurance/ | 1127 | 4 / specific/hedged (strong) | Yes (386w, specific/useful) | 5 | Yes | 0 | Windsor-Essex + Ontario | **A** |
| /commercial-auto-insurance/ | 323 | 4 / specific/hedged (strong) | No | 4 | Yes | 0 | Windsor-Essex-primary | **C** |
| /commercial-insurance/ | 283 | 0 / none | No | 5 | No — Shares 2+ FAQ pattern with auto-insurance | 0 | Windsor-Essex-primary | **C** |
| /commercial-property-insurance/ | 367 | 4 / specific (good) | No | 6 | No — Shares 2+ FAQ pattern with auto-insurance | 0 | Windsor-Essex-primary | **C** |
| /condo-insurance/ | 565 | 4 / specific/hedged (strong) | Yes (83w, moderate) | 4 | Yes | 0 | Windsor-Essex-primary | **B** |
| /condominium-corporation-insurance/ | 277 | 4 / specific (good) | No | 4 | Yes | 0 | Windsor-Essex-primary | **C** |
| /contractors-insurance/ | 1025 | 4 / specific/hedged (strong) | Yes (388w, specific/useful) | 5 | Yes | 0 | Windsor-Essex-primary | **A** |
| /convenience-store-insurance/ | 1141 | 4 / specific/hedged (strong) | Yes (371w, specific/useful) | 5 | Yes | 0 | Windsor-Essex-primary | **A** |
| /cottage-insurance/ | 555 | 4 / specific/hedged (strong) | Yes (108w, specific/useful) | 4 | Yes | 0 | Windsor-Essex-primary | **B** |
| /crime-fidelity-insurance/ | 253 | 4 / specific (good) | No | 4 | Yes | 1 | Windsor-Essex-primary | **D** |
| /cyber-insurance/ | 409 | 4 / specific/hedged (strong) | Yes (67w, moderate) | 4 | Yes | 0 | Windsor-Essex-primary | **B** |
| /daycare-private-school-insurance/ | 956 | 6 / specific/hedged (strong) | Yes (186w, moderate) | 5 | Yes | 0 | Windsor-Essex + Ontario | **A** |
| /directors-officers-insurance/ | 331 | 4 / specific/hedged (strong) | Yes (70w, moderate) | 4 | Yes | 1 | Windsor-Essex-primary | **D** |
| /dump-truck-insurance/ | 1075 | 4 / specific/hedged (strong) | Yes (322w, specific/useful) | 5 | Yes | 0 | Windsor-Essex + Ontario | **A** |
| /employment-practices-liability-insurance/ | 227 | 4 / specific (good) | No | 4 | Yes | 1 | Windsor-Essex-primary | **D** |
| /event-liability-insurance/ | 1094 | 4 / specific/hedged (strong) | Yes (329w, specific/useful) | 5 | Yes | 0 | Windsor-Essex-primary | **A** |
| /farm-insurance/ | 332 | 4 / specific (good) | No | 4 | Yes | 0 | Windsor-Essex-primary (local) | **C** |
| /fitness-gym-insurance/ | 240 | 4 / specific (good) | No | 4 | Yes | 0 | Windsor-Essex-primary | **C** |
| /food-truck-insurance/ | 1624 | 4 / specific/hedged (strong) | Yes (576w, specific/useful) | 5 | Yes | 0 | Windsor-Essex + Ontario | **A** |
| /garage-dealership-insurance/ | 283 | 4 / specific (good) | No | 4 | Yes | 0 | Windsor-Essex-primary | **C** |
| /greenhouse-agribusiness-insurance/ | 757 | 6 / specific/hedged (strong) | Yes (164w, specific/useful) | 5 | Yes | 0 | Windsor-Essex-primary (local) | **A** |
| /grocery-specialty-food-insurance/ | 251 | 4 / specific (good) | No | 4 | Yes | 0 | Windsor-Essex-primary | **C** |
| /group-home-auto-insurance/ | 488 | 4 / specific/hedged (strong) | Yes (102w, specific/useful) | 4 | Yes | 0 | Windsor-Essex-primary | **B** |
| /home-insurance/ | 571 | 5 / specific (good) | Yes (70w, moderate) | 6 | No — Shares 2+ FAQ pattern with auto-insurance | 0 | Windsor-Essex + Ontario | **B** |
| /home-sharing-insurance/ | 588 | 4 / specific/hedged (strong) | Yes (123w, specific/useful) | 4 | Yes | 0 | Windsor-Essex-primary | **B** |
| /hotel-motel-insurance/ | 1252 | 4 / specific/hedged (strong) | Yes (378w, specific/useful) | 5 | Yes | 0 | Windsor-Essex + Ontario | **A** |
| /landlord-insurance/ | 497 | 4 / specific/hedged (strong) | Yes (79w, moderate) | 4 | Yes | 0 | Windsor-Essex-primary | **B** |
| /landscaping-snow-removal-insurance/ | 400 | 4 / specific (good) | Yes (68w, moderate) | 4 | Yes | 0 | Windsor-Essex-primary | **B** |
| /life-insurance/ | 513 | 4 / specific/hedged (strong) | Yes (109w, specific/useful) | 4 | Yes | 0 | Windsor-Essex-primary | **B** |
| /liquor-liability-insurance/ | 2005 | 4 / specific/hedged (strong) | Yes (839w, specific/useful) | 5 | Yes | 1 (low only) | Windsor-Essex-primary | **A** |
| /manufacturing-insurance/ | 399 | 5 / specific (good) | No | 5 | Yes | 0 | Windsor-Essex-primary | **C** |
| /medical-dental-insurance/ | 242 | 4 / specific (good) | No | 4 | Yes | 0 | Windsor-Essex + Ontario | **C** |
| /mobile-home-insurance/ | 506 | 4 / specific/hedged (strong) | Yes (102w, specific/useful) | 4 | Yes | 0 | Windsor-Essex + Ontario | **B** |
| /motorcycle-insurance/ | 535 | 4 / specific/hedged (strong) | Yes (102w, specific/useful) | 4 | Yes | 1 (low only) | Windsor-Essex + Ontario | **B** |
| /non-profit-insurance/ | 1088 | 4 / specific/hedged (strong) | Yes (355w, specific/useful) | 5 | Yes | 0 | Windsor-Essex-primary | **A** |
| /personal-umbrella-insurance/ | 472 | 4 / specific/hedged (strong) | Yes (95w, moderate) | 4 | Yes | 0 | Windsor-Essex-primary | **B** |
| /pharmacy-insurance/ | 1430 | 4 / specific/hedged (strong) | Yes (553w, specific/useful) | 5 | Yes | 1 (low only) | Windsor-Essex + Ontario | **A** |
| /pollution-liability-insurance/ | 252 | 4 / specific (good) | No | 4 | Yes | 0 | Windsor-Essex-primary | **C** |
| /product-recall-insurance/ | 252 | 4 / specific (good) | No | 4 | Yes | 2 | Windsor-Essex-primary | **D** |
| /professional-liability-insurance/ | 391 | 4 / specific (good) | Yes (66w, moderate) | 4 | Yes | 1 (low only) | Windsor-Essex-primary | **C** |
| /professional-offices-insurance/ | 325 | 4 / specific (good) | No | 4 | No — Shares 2+ FAQ pattern with auto-insurance | 0 | Windsor-Essex-primary | **C** |
| /property-management-insurance/ | 1174 | 4 / specific/hedged (strong) | Yes (378w, specific/useful) | 5 | Yes | 0 | Windsor-Essex + Ontario | **A** |
| /real-estate-insurance/ | 283 | 4 / specific (good) | No | 4 | No — Shares 2+ FAQ pattern with home-insurance | 0 | Windsor-Essex-primary | **C** |
| /religious-organizations-insurance/ | 215 | 4 / specific (good) | No | 4 | Yes | 0 | Windsor-Essex-primary | **C** |
| /restaurant-insurance/ | 1614 | 4 / specific/hedged (strong) | Yes (646w, specific/useful) | 5 | Yes | 0 | Windsor-Essex + Ontario | **A** |
| /retail-insurance/ | 292 | 4 / specific (good) | No | 4 | Yes | 0 | Windsor-Essex-primary | **C** |
| /salon-barber-insurance/ | 1072 | 4 / specific/hedged (strong) | Yes (316w, specific/useful) | 5 | Yes | 0 | Windsor-Essex-primary | **A** |
| /small-business-insurance/ | 399 | 4 / specific/hedged (strong) | Yes (63w, moderate) | 4 | Yes | 0 | Windsor-Essex-primary | **C** |
| /tenant-insurance/ | 519 | 4 / specific (good) | Yes (81w, moderate) | 4 | Yes | 0 | Windsor-Essex + Ontario | **B** |
| /travel-insurance/ | 540 | 4 / specific/hedged (strong) | Yes (109w, specific/useful) | 4 | Yes | 0 | Windsor-Essex-primary | **B** |
| /trucking-insurance/ | 1244 | 4 / specific/hedged (strong) | Yes (440w, specific/useful) | 5 | Yes | 0 | Windsor-Essex + Ontario | **A** |
| /warehousing-insurance/ | 1034 | 4 / specific/hedged (strong) | Yes (306w, specific/useful) | 5 | Yes | 0 | Windsor-Essex-primary | **A** |

**Word count scope:** Hero/intro (`heroLead`, `heroSupporting`, trust band), coverage intro + card descriptions/details, practical considerations, FAQ Q&A. Excludes nav, footer, broker-story boilerplate, related-products rail, and final CTA chrome.

**Classification key:** A = STRONG · B = ADEQUATE · C = THIN · D = CONTENT-SAFETY CONCERN (high/medium flags)

---

## B. Content-safety flags (quoted, by page)

**5 high/medium flags** across 4 pages.  
**11 low-severity flags** (mostly surety/bond industry "guarantee" terminology) listed where present — informational, not auto-classified as D.

### /auto-insurance/
  - **[LOW]** `coverage:Accident Benefits`: "For policies entered into on or after July 1, 2026, statutory accident benefits include mandatory medical, rehabilitation, and attendant care benefits." — Mandatory coverage stated — verify regulatory basis
  - **[LOW]** `faq`: "A standard policy includes minimum third-party liability coverage of $200,000, uninsured automobile coverage, and direct compensation–property damage coverage (with limited opt-out rights), along with statutory accident benefits." — Specific dollar amount cited — verify limit, deductible, or regulatory basis
  - **[LOW]** `faq`: "For policies entered into on or after July 1, 2026, only medical, rehabilitation, and attendant care benefits are mandatory within accident benefits — other accident benefits such as income replacement are optional." — Mandatory coverage stated — verify regulatory basis

### /bonding-insurance/
  - **[LOW]** `considerations`: "A surety bond guarantees the principal's obligation to an obligee." — Surety/bond industry uses 'guarantee' as technical term — verify wording is accurate
  - **[LOW]** `considerations`: "Under Ontario's Construction Act, certain public contracts with a contract price of $500,000 or more require the contractor to provide both a performance bond and a labour and material payment bond on entering the contract." — Specific dollar amount cited — verify limit, deductible, or regulatory basis
  - **[LOW]** `faq`: "Under Ontario's Construction Act, certain public contracts with a contract price of $500,000 or more require both a performance bond and a labour and material payment bond when the contractor enters the contract." — Specific dollar amount cited — verify limit, deductible, or regulatory basis

### /builders-developers-insurance/
  - **[LOW]** `hero`: "Premium Insurance Brokers can help Windsor-Essex developers structure coverage across projects without treating every optional product as mandatory." — Mandatory coverage stated — verify regulatory basis

### /crime-fidelity-insurance/
  - **[HIGH]** `coverage:Employee Dishonesty`: "Covers theft of money, securities, or property by employees acting fraudulently." — Flat coverage guarantee — states or implies automatic coverage without hedging

### /directors-officers-insurance/
  - **[HIGH]** `faq`: "GL covers the organization's operational liability, not personal claims against directors for management decisions." — Flat coverage guarantee — states or implies automatic coverage without hedging

### /employment-practices-liability-insurance/
  - **[HIGH]** `coverage:Wrongful Termination`: "Covers claims alleging improper dismissal or constructive dismissal." — Flat coverage guarantee — states or implies automatic coverage without hedging

### /liquor-liability-insurance/
  - **[LOW]** `considerations`: "Standard 4.1's mandatory training list does not include Special Occasion Permit among its applicable authorization types." — Mandatory coverage stated — verify regulatory basis

### /motorcycle-insurance/
  - **[LOW]** `coverage:Third-Party Liability`: "FSRA specifies minimum third-party liability coverage of at least $200,000." — Specific dollar amount cited — verify limit, deductible, or regulatory basis

### /pharmacy-insurance/
  - **[LOW]** `considerations`: "Part A pharmacists, pharmacy technicians, interns, and related registrants must maintain personal professional liability insurance (PPLI) in their own name under OCP By-Law requirements — currently a minimum of $2,000,000 per claim and $4,000,000 annual aggregate covering regulated professional services, with full prior-acts protection." — Specific dollar amount cited — verify limit, deductible, or regulatory basis

### /product-recall-insurance/
  - **[HIGH]** `faq`: "Product liability covers injury or damage claims from defective products." — Flat coverage guarantee — states or implies automatic coverage without hedging
  - **[HIGH]** `faq`: "Recall covers the cost of withdrawing products from the market." — Flat coverage guarantee — states or implies automatic coverage without hedging

### /professional-liability-insurance/
  - **[LOW]** `faq`: "Contract requirements vary — $1M to $5M per occurrence is common for mid-size engagements." — Specific dollar amount cited — verify limit, deductible, or regulatory basis

---

## C. Count by classification

| Class | Count | Routes |
|-------|------:|--------|
| A | 20 | /bonding-insurance/, /builders-developers-insurance/, /builders-risk-insurance/, /cargo-freight-insurance/, /contractors-insurance/, /convenience-store-insurance/, /daycare-private-school-insurance/, /dump-truck-insurance/, /event-liability-insurance/, /food-truck-insurance/, /greenhouse-agribusiness-insurance/, /hotel-motel-insurance/, /liquor-liability-insurance/, /non-profit-insurance/, /pharmacy-insurance/, /property-management-insurance/, /restaurant-insurance/, /salon-barber-insurance/, /trucking-insurance/, /warehousing-insurance/ |
| B | 16 | /auto-insurance/, /boat-insurance/, /condo-insurance/, /cottage-insurance/, /cyber-insurance/, /group-home-auto-insurance/, /home-insurance/, /home-sharing-insurance/, /landlord-insurance/, /landscaping-snow-removal-insurance/, /life-insurance/, /mobile-home-insurance/, /motorcycle-insurance/, /personal-umbrella-insurance/, /tenant-insurance/, /travel-insurance/ |
| C | 18 | /business-interruption-insurance/, /commercial-auto-insurance/, /commercial-insurance/, /commercial-property-insurance/, /condominium-corporation-insurance/, /farm-insurance/, /fitness-gym-insurance/, /garage-dealership-insurance/, /grocery-specialty-food-insurance/, /manufacturing-insurance/, /medical-dental-insurance/, /pollution-liability-insurance/, /professional-liability-insurance/, /professional-offices-insurance/, /real-estate-insurance/, /religious-organizations-insurance/, /retail-insurance/, /small-business-insurance/ |
| D | 4 | /crime-fidelity-insurance/, /directors-officers-insurance/, /employment-practices-liability-insurance/, /product-recall-insurance/ |

---

## D. Geographic targeting inconsistencies

**Approved model (inferred — no Product Expansion 2.0 doc in repo):**
- **Commercial / specialty industry pages:** Windsor-Essex-primary in hero/trust/FAQ; metaTitle includes Windsor-Essex.
- **Personal lines:** Often Ontario-wide regulatory framing with Windsor-Essex broker positioning.
- **Agriculture (Greenhouse, Farm):** Local — Leamington / Essex County / Windsor-Essex.

**Pages with weak or inconsistent geographic framing in body copy:**

- **/condo-insurance/** — Windsor-Essex-primary. Windsor-Essex in copy. Meta title likely still says Windsor-Essex.
- **/cottage-insurance/** — Windsor-Essex-primary. Windsor-Essex in copy. Meta title likely still says Windsor-Essex.
- **/group-home-auto-insurance/** — Windsor-Essex-primary. Windsor-Essex in copy. Meta title likely still says Windsor-Essex.
- **/home-sharing-insurance/** — Windsor-Essex-primary. Windsor-Essex in copy. Meta title likely still says Windsor-Essex.
- **/landlord-insurance/** — Windsor-Essex-primary. Windsor-Essex in copy. Meta title likely still says Windsor-Essex.
- **/life-insurance/** — Windsor-Essex-primary. Windsor-Essex in copy. Meta title likely still says Windsor-Essex.
- **/personal-umbrella-insurance/** — Windsor-Essex-primary. Windsor-Essex in copy. Meta title likely still says Windsor-Essex.
- **/travel-insurance/** — Windsor-Essex-primary. Windsor-Essex in copy. Meta title likely still says Windsor-Essex.

**Observation:** JSON-LD `areaServed` is hardcoded to Windsor-Essex on all pilot pages regardless of Ontario-wide copy — not a content bug, but worth noting for SEO consistency review.

---

## E. Greenhouse / Daycare cross-check

### Greenhouse & Agribusiness (`/greenhouse-agribusiness-insurance/`) — **STRONG (reference example)**

| Check | Expected (owner-approved) | Audit finding |
|-------|---------------------------|---------------|
| Classification | STRONG | **A — STRONG** |
| Coverage cards | 6, hedged | 6 cards, avg **55.3** words, quality: specific/hedged (strong) |
| Practical considerations | 6 items | **Yes** — 164 words, specific/useful |
| FAQ | 5, Leamington/Essex | **5** questions, product-specific, local FAQ present |
| Content-safety | No flat coverage claims | **0 high/medium flags** |
| Local positioning | Leamington, Essex County, Windsor-Essex | Windsor-Essex-primary (local) |

Content matches approved final state described in `docs/greenhouse-route-recovery.md`.

### Daycare & Private School (`/daycare-private-school-insurance/`) — **NOT ADDRESSED**

| Check | Status at flagging | Audit finding |
|-------|-------------------|---------------|
| Classification | Was flagged as thin | **D — CONTENT-SAFETY** (also thin: **956w** total) |
| Coverage cards | 4, generic "Covers…" | 4 cards, avg 57.7w — **flat "Covers student…" / "Covers building contents…"** |
| Practical considerations | Absent | **Still absent** |
| FAQ | 4, somewhat specific | 4 questions — product-specific but shallow overall |
| Content-safety | — | **0 high flags** on unhedged "Covers…" card copy |

**Conclusion:** Daycare remains in the pre-fix Greenhouse/Daycare pattern. No content work has been applied since the original flag.

---

## F. Recommended prioritization for follow-up content work

Ranked by severity (D first, then C, then B). Do **not** start rewrites until owner approves scope. Specialized lines need researched, hedged drafting — not bulk AI generation.

1. **/employment-practices-liability-insurance/** (D) — 1 content-safety flag(s): Flat coverage guarantee — states or implies automatic coverage without hedging
2. **/product-recall-insurance/** (D) — 2 content-safety flag(s): Flat coverage guarantee — states or implies automatic coverage without hedging; Flat coverage guarantee — states or implies automatic coverage without hedging
3. **/crime-fidelity-insurance/** (D) — 1 content-safety flag(s): Flat coverage guarantee — states or implies automatic coverage without hedging
4. **/directors-officers-insurance/** (D) — 1 content-safety flag(s): Flat coverage guarantee — states or implies automatic coverage without hedging
5. **/religious-organizations-insurance/** (C) — Shallow depth (215w total, cards avg 20.5w, considerations absent)
6. **/fitness-gym-insurance/** (C) — Shallow depth (240w total, cards avg 23w, considerations absent)
7. **/medical-dental-insurance/** (C) — Shallow depth (242w total, cards avg 23.5w, considerations absent)
8. **/grocery-specialty-food-insurance/** (C) — Shallow depth (251w total, cards avg 26w, considerations absent)
9. **/pollution-liability-insurance/** (C) — Shallow depth (252w total, cards avg 25w, considerations absent)
10. **/condominium-corporation-insurance/** (C) — Shallow depth (277w total, cards avg 26.5w, considerations absent)
11. **/commercial-insurance/** (C) — Shallow depth (283w total, cards avg 0w, considerations absent)
12. **/garage-dealership-insurance/** (C) — Shallow depth (283w total, cards avg 27.5w, considerations absent)
13. **/real-estate-insurance/** (C) — Shallow depth (283w total, cards avg 26w, considerations absent)
14. **/retail-insurance/** (C) — Shallow depth (292w total, cards avg 28w, considerations absent)
15. **/commercial-auto-insurance/** (C) — Shallow depth (323w total, cards avg 26w, considerations absent)
16. **/professional-offices-insurance/** (C) — Shallow depth (325w total, cards avg 31w, considerations absent)
17. **/farm-insurance/** (C) — Shallow depth (332w total, cards avg 21w, considerations absent)
18. **/commercial-property-insurance/** (C) — Shallow depth (367w total, cards avg 31w, considerations absent)
19. **/professional-liability-insurance/** (C) — Shallow depth (391w total, cards avg 31w, considerations present but thin overall)
20. **/business-interruption-insurance/** (C) — Shallow depth (395w total, cards avg 34w, considerations present but thin overall)
21. **/manufacturing-insurance/** (C) — Shallow depth (399w total, cards avg 29.2w, considerations absent)
22. **/small-business-insurance/** (C) — Shallow depth (399w total, cards avg 36w, considerations present but thin overall)
23. **/landscaping-snow-removal-insurance/** (B) — Reasonable (400w) but lacks full depth — cards specific (good), considerations moderate
24. **/cyber-insurance/** (B) — Reasonable (409w) but lacks full depth — cards specific/hedged (strong), considerations moderate
25. **/personal-umbrella-insurance/** (B) — Reasonable (472w) but lacks full depth — cards specific/hedged (strong), considerations moderate
26. **/group-home-auto-insurance/** (B) — Reasonable (488w) but lacks full depth — cards specific/hedged (strong), considerations specific/useful
27. **/landlord-insurance/** (B) — Reasonable (497w) but lacks full depth — cards specific/hedged (strong), considerations moderate
28. **/mobile-home-insurance/** (B) — Reasonable (506w) but lacks full depth — cards specific/hedged (strong), considerations specific/useful
29. **/life-insurance/** (B) — Reasonable (513w) but lacks full depth — cards specific/hedged (strong), considerations specific/useful
30. **/tenant-insurance/** (B) — Reasonable (519w) but lacks full depth — cards specific (good), considerations moderate
31. **/motorcycle-insurance/** (B) — Reasonable (535w) but lacks full depth — cards specific/hedged (strong), considerations specific/useful
32. **/boat-insurance/** (B) — Reasonable (539w) but lacks full depth — cards specific/hedged (strong), considerations specific/useful
33. **/travel-insurance/** (B) — Reasonable (540w) but lacks full depth — cards specific/hedged (strong), considerations specific/useful
34. **/cottage-insurance/** (B) — Reasonable (555w) but lacks full depth — cards specific/hedged (strong), considerations specific/useful
35. **/condo-insurance/** (B) — Reasonable (565w) but lacks full depth — cards specific/hedged (strong), considerations moderate
36. **/home-insurance/** (B) — Reasonable (571w) but lacks full depth — cards specific (good), considerations moderate
37. **/home-sharing-insurance/** (B) — Reasonable (588w) but lacks full depth — cards specific/hedged (strong), considerations specific/useful
38. **/auto-insurance/** (B) — Reasonable (649w) but lacks full depth — cards specific/hedged (strong), considerations absent

### Suggested work packages (for owner scope approval)

1. **Content-safety pass (D pages, 32 routes):** Replace flat "Covers X" card copy with Greenhouse-style hedged language ("may cover… subject to policy terms"). Highest legal/reputational risk.
2. **Thin-content depth pass (C pages, 16 routes):** Add practical considerations, deepen hero/intro, expand FAQ — mirror Greenhouse structure.
3. **Adequate deepening (B pages, 9 routes):** Lower urgency; optional considerations sections and FAQ expansion.
4. **Daycare & Private School:** Combined D + thin — treat as pilot for next specialty rewrite after owner research (same process as Greenhouse).
5. **Geographic consistency review:** Align body copy with intended Windsor-Essex vs Ontario-wide model once Product Expansion 2.0 targeting doc is confirmed with owner.

---

## Methodology & limitations

- **Source of truth:** TypeScript product data (`src/data/product-pages/`, `commercial-industries.ts`, `pilot-*-inline.ts`, `pilot-auto.ts`) — not rendered DOM.
- **Auto page:** Hero copy from `AutoProductHero.tsx`; coverage/FAQ from `pilot-auto.ts`.
- **Safety scan:** Pattern-based; high/medium flags trigger class D. Low-severity surety "guarantee" terminology flagged separately. Negated guarantees ("aren't guaranteed"), negated inclusion ("shouldn't be assumed to be automatically included", "does not cover"), and conditional phrasing ("protects you if") excluded. **Dollar figures:** presence of a limit/deductible/regulatory amount is flagged **low** (informational review); **high** only when the sentence asserts an absolute/universal numeric claim (e.g. "your deductible is $500", "coverage is always $2M", "this policy pays $100,000") — the audit does not verify whether cited statutory figures are correct.
- **FAQ uniqueness:** Normalized comparison across all 58 pages; "Shares FAQ pattern" means ≥2 structurally similar questions vs another route.
- **Cannot confidently assess:** Whether specific commercial claims match actual carrier forms; whether industry pages' coverage categories are complete for every operation type. Flagged language needs broker/owner review, not automated clearance.

**Artifacts:** `docs/qa-screenshots/product-content-audit-2026-09-07/audit-data.json`

---

## Stop gates (repeat)

- **NO MERGE**
- **NO DEPLOY**
- **NO VERCEL PROMOTION**
- **NO CONTENT CHANGES STARTED**

**STOP FOR OWNER REVIEW.**
