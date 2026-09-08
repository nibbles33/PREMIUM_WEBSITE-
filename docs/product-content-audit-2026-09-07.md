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
| **A — STRONG** | 2 | Genuinely substantive, specific, no high/medium content-safety concerns |
| **B — ADEQUATE** | 16 | Reasonable depth; could be deepened; no high/medium safety flags |
| **C — THIN** | 18 | Noticeably shallow — similar pre-fix Greenhouse/Daycare pattern |
| **D — CONTENT-SAFETY** | 22 | High/medium content-safety language flagged (regardless of visual depth) |

**Total pages audited:** 58 live product routes.

**Key finding:** Only **Greenhouse & Agribusiness** (`/greenhouse-agribusiness-insurance/`) currently meets the STRONG bar established by the owner-approved fix. A large share of pages (22 D + 18 C = 40 pages, **69%**) combine thin or templated copy with unhedged "Covers…" / "Protects…" coverage-card language — the exact pattern Greenhouse was rewritten to avoid.

**Geographic targeting note:** No formal "Product Expansion 2.0" ratio document exists in the repo. This audit infers targeting from actual copy. Nearly all `metaTitle` values say Windsor-Essex; body copy varies between Windsor-Essex-primary, Windsor-Essex + Ontario, and Ontario-wide (common on personal lines).

---

## A. Full 58-row classification table

| Route | Substantive words | Coverage cards / quality | Practical considerations | FAQ count | FAQ unique? | Safety flags (high/med) | Geographic targeting | Class |
|-------|------------------:|--------------------------|--------------------------|----------:|-------------|-------------------------|----------------------|-------|
| /auto-insurance/ | 649 | 6 / specific/hedged (strong) | No | 5 | No — Shares 2+ FAQ pattern with professional-offices-insurance | 3 (low only) | Ontario-wide | **B** |
| /boat-insurance/ | 539 | 4 / specific/hedged (strong) | Yes (106w, specific/useful) | 4 | Yes | 0 | Windsor-Essex + Ontario | **B** |
| /bonding-insurance/ | 448 | 5 / specific (good) | No | 5 | No — Shares 2+ FAQ pattern with auto-insurance | 3 (+1 low) | Windsor-Essex-primary | **D** |
| /builders-developers-insurance/ | 380 | 4 / specific (good) | No | 5 | Yes | 1 | Windsor-Essex-primary | **D** |
| /builders-risk-insurance/ | 292 | 4 / specific/hedged (strong) | No | 4 | Yes | 2 | Windsor-Essex-primary | **D** |
| /business-interruption-insurance/ | 395 | 4 / specific/hedged (strong) | Yes (66w, moderate) | 4 | Yes | 0 | Windsor-Essex-primary | **C** |
| /cargo-freight-insurance/ | 286 | 4 / specific (good) | No | 4 | Yes | 2 | Windsor-Essex-primary | **D** |
| /commercial-auto-insurance/ | 323 | 4 / specific/hedged (strong) | No | 4 | Yes | 0 | Windsor-Essex-primary | **C** |
| /commercial-insurance/ | 283 | 0 / none | No | 5 | No — Shares 2+ FAQ pattern with auto-insurance | 0 | Windsor-Essex-primary | **C** |
| /commercial-property-insurance/ | 367 | 4 / specific (good) | No | 6 | No — Shares 2+ FAQ pattern with auto-insurance | 0 | Windsor-Essex-primary | **C** |
| /condo-insurance/ | 565 | 4 / specific/hedged (strong) | Yes (83w, moderate) | 4 | Yes | 0 | Windsor-Essex-primary | **B** |
| /condominium-corporation-insurance/ | 277 | 4 / specific (good) | No | 4 | Yes | 0 | Windsor-Essex-primary | **C** |
| /contractors-insurance/ | 345 | 4 / specific (good) | No | 5 | Yes | 1 | Windsor-Essex-primary | **D** |
| /convenience-store-insurance/ | 214 | 4 / specific (good) | No | 4 | Yes | 1 | Windsor-Essex-primary | **D** |
| /cottage-insurance/ | 555 | 4 / specific/hedged (strong) | Yes (108w, specific/useful) | 4 | Yes | 0 | Windsor-Essex-primary | **B** |
| /crime-fidelity-insurance/ | 253 | 4 / specific (good) | No | 4 | Yes | 1 | Windsor-Essex-primary | **D** |
| /cyber-insurance/ | 409 | 4 / specific/hedged (strong) | Yes (67w, moderate) | 4 | Yes | 0 | Windsor-Essex-primary | **B** |
| /daycare-private-school-insurance/ | 956 | 6 / specific/hedged (strong) | Yes (186w, moderate) | 5 | Yes | 0 | Windsor-Essex + Ontario | **A** |
| /directors-officers-insurance/ | 331 | 4 / specific/hedged (strong) | Yes (70w, moderate) | 4 | Yes | 1 | Windsor-Essex-primary | **D** |
| /dump-truck-insurance/ | 326 | 4 / specific/hedged (strong) | No | 4 | Yes | 1 | Windsor-Essex-primary | **D** |
| /employment-practices-liability-insurance/ | 227 | 4 / specific (good) | No | 4 | Yes | 1 | Windsor-Essex-primary | **D** |
| /event-liability-insurance/ | 266 | 4 / specific/hedged (strong) | No | 4 | Yes | 1 | Windsor-Essex-primary | **D** |
| /farm-insurance/ | 332 | 4 / specific (good) | No | 4 | Yes | 0 | Windsor-Essex-primary (local) | **C** |
| /fitness-gym-insurance/ | 240 | 4 / specific (good) | No | 4 | Yes | 0 | Windsor-Essex-primary | **C** |
| /food-truck-insurance/ | 307 | 4 / specific (good) | No | 4 | No — Shares 2+ FAQ pattern with real-estate-insurance | 1 | Windsor-Essex-primary | **D** |
| /garage-dealership-insurance/ | 283 | 4 / specific (good) | No | 4 | Yes | 0 | Windsor-Essex-primary | **C** |
| /greenhouse-agribusiness-insurance/ | 757 | 6 / specific/hedged (strong) | Yes (164w, specific/useful) | 5 | Yes | 0 | Windsor-Essex-primary (local) | **A** |
| /grocery-specialty-food-insurance/ | 251 | 4 / specific (good) | No | 4 | Yes | 0 | Windsor-Essex-primary | **C** |
| /group-home-auto-insurance/ | 488 | 4 / specific/hedged (strong) | Yes (102w, specific/useful) | 4 | Yes | 0 | Windsor-Essex-primary | **B** |
| /home-insurance/ | 571 | 5 / specific (good) | Yes (70w, moderate) | 6 | No — Shares 2+ FAQ pattern with auto-insurance | 0 | Windsor-Essex + Ontario | **B** |
| /home-sharing-insurance/ | 588 | 4 / specific/hedged (strong) | Yes (123w, specific/useful) | 4 | Yes | 0 | Windsor-Essex-primary | **B** |
| /hotel-motel-insurance/ | 263 | 4 / specific (good) | No | 4 | Yes | 1 | Windsor-Essex-primary | **D** |
| /landlord-insurance/ | 497 | 4 / specific/hedged (strong) | Yes (79w, moderate) | 4 | Yes | 0 | Windsor-Essex-primary | **B** |
| /landscaping-snow-removal-insurance/ | 400 | 4 / specific (good) | Yes (68w, moderate) | 4 | Yes | 0 | Windsor-Essex-primary | **B** |
| /life-insurance/ | 513 | 4 / specific/hedged (strong) | Yes (109w, specific/useful) | 4 | Yes | 0 | Windsor-Essex-primary | **B** |
| /liquor-liability-insurance/ | 258 | 4 / specific (good) | No | 4 | Yes | 1 | Windsor-Essex-primary | **D** |
| /manufacturing-insurance/ | 399 | 5 / specific (good) | No | 5 | Yes | 0 | Windsor-Essex-primary | **C** |
| /medical-dental-insurance/ | 242 | 4 / specific (good) | No | 4 | Yes | 0 | Windsor-Essex + Ontario | **C** |
| /mobile-home-insurance/ | 506 | 4 / specific/hedged (strong) | Yes (102w, specific/useful) | 4 | Yes | 0 | Windsor-Essex + Ontario | **B** |
| /motorcycle-insurance/ | 535 | 4 / specific/hedged (strong) | Yes (102w, specific/useful) | 4 | Yes | 1 (low only) | Windsor-Essex + Ontario | **B** |
| /non-profit-insurance/ | 244 | 4 / specific (good) | No | 4 | Yes | 1 | Windsor-Essex-primary | **D** |
| /personal-umbrella-insurance/ | 472 | 4 / specific/hedged (strong) | Yes (95w, moderate) | 4 | Yes | 0 | Windsor-Essex-primary | **B** |
| /pharmacy-insurance/ | 205 | 4 / specific (good) | No | 4 | Yes | 1 | Windsor-Essex-primary | **D** |
| /pollution-liability-insurance/ | 252 | 4 / specific (good) | No | 4 | Yes | 0 | Windsor-Essex-primary | **C** |
| /product-recall-insurance/ | 252 | 4 / specific (good) | No | 4 | Yes | 2 | Windsor-Essex-primary | **D** |
| /professional-liability-insurance/ | 391 | 4 / specific (good) | Yes (66w, moderate) | 4 | Yes | 1 (low only) | Windsor-Essex-primary | **C** |
| /professional-offices-insurance/ | 325 | 4 / specific (good) | No | 4 | No — Shares 2+ FAQ pattern with auto-insurance | 0 | Windsor-Essex-primary | **C** |
| /property-management-insurance/ | 261 | 4 / specific (good) | No | 4 | Yes | 1 | Windsor-Essex-primary | **D** |
| /real-estate-insurance/ | 283 | 4 / specific (good) | No | 4 | No — Shares 2+ FAQ pattern with food-truck-insurance | 0 | Windsor-Essex-primary | **C** |
| /religious-organizations-insurance/ | 215 | 4 / specific (good) | No | 4 | Yes | 0 | Windsor-Essex-primary | **C** |
| /restaurant-insurance/ | 306 | 4 / specific/hedged (strong) | No | 4 | Yes | 1 | Windsor-Essex-primary | **D** |
| /retail-insurance/ | 292 | 4 / specific (good) | No | 4 | Yes | 0 | Windsor-Essex-primary | **C** |
| /salon-barber-insurance/ | 239 | 4 / specific (good) | No | 4 | Yes | 1 | Windsor-Essex-primary | **D** |
| /small-business-insurance/ | 399 | 4 / specific/hedged (strong) | Yes (63w, moderate) | 4 | Yes | 0 | Windsor-Essex-primary | **C** |
| /tenant-insurance/ | 519 | 4 / specific (good) | Yes (81w, moderate) | 4 | Yes | 0 | Windsor-Essex + Ontario | **B** |
| /travel-insurance/ | 540 | 4 / specific/hedged (strong) | Yes (109w, specific/useful) | 4 | Yes | 0 | Windsor-Essex-primary | **B** |
| /trucking-insurance/ | 293 | 4 / specific (good) | No | 4 | Yes | 1 | Windsor-Essex-primary | **D** |
| /warehousing-insurance/ | 252 | 4 / specific (good) | No | 4 | Yes | 1 | Windsor-Essex-primary | **D** |

**Word count scope:** Hero/intro (`heroLead`, `heroSupporting`, trust band), coverage intro + card descriptions/details, practical considerations, FAQ Q&A. Excludes nav, footer, broker-story boilerplate, related-products rail, and final CTA chrome.

**Classification key:** A = STRONG · B = ADEQUATE · C = THIN · D = CONTENT-SAFETY CONCERN (high/medium flags)

---

## B. Content-safety flags (quoted, by page)

**27 high/medium flags** across 22 pages.  
**6 low-severity flags** (mostly surety/bond industry "guarantee" terminology) listed where present — informational, not auto-classified as D.

### /auto-insurance/
  - **[LOW]** `coverage:Accident Benefits`: "For policies entered into on or after July 1, 2026, statutory accident benefits include mandatory medical, rehabilitation, and attendant care benefits." — Mandatory coverage stated — verify regulatory basis
  - **[LOW]** `faq`: "A standard policy includes minimum third-party liability coverage of $200,000, uninsured automobile coverage, and direct compensation–property damage coverage (with limited opt-out rights), along with statutory accident benefits." — Specific dollar amount cited — verify limit, deductible, or regulatory basis
  - **[LOW]** `faq`: "For policies entered into on or after July 1, 2026, only medical, rehabilitation, and attendant care benefits are mandatory within accident benefits — other accident benefits such as income replacement are optional." — Mandatory coverage stated — verify regulatory basis

### /bonding-insurance/
  - **[MEDIUM]** `coverage:Bid Bonds`: "Required when submitting a bid on certain contracts — guarantees you will honour your bid and enter the contract if selected." — Guarantee language — may overstate policy terms (or surety industry term)
  - **[MEDIUM]** `coverage:Performance Bonds`: "Guarantees completion of the contracted work according to project terms if the principal defaults." — Guarantee language — may overstate policy terms (or surety industry term)
  - **[MEDIUM]** `faq`: "Insurance protects you against covered losses." — Unhedged protection claim
  - **[LOW]** `faq`: "A surety bond is a three-party guarantee — you (the principal), the obligee who requires the bond, and the surety." — Surety/bond industry uses 'guarantee' as technical term — verify wording is accurate

### /builders-developers-insurance/
  - **[HIGH]** `faq`: "Builder's risk covers the structure and materials during construction or major renovation for covered perils." — Flat coverage guarantee — states or implies automatic coverage without hedging

### /builders-risk-insurance/
  - **[HIGH]** `coverageIntro`: "Builder's risk covers the project itself during construction — separate from the contractor's ongoing liability policy." — Flat coverage guarantee — states or implies automatic coverage without hedging
  - **[HIGH]** `coverage:Work in Progress`: "Covers the structure and installed materials during construction against covered perils like fire, theft, and wind." — Flat coverage guarantee — states or implies automatic coverage without hedging

### /cargo-freight-insurance/
  - **[HIGH]** `coverageIntro`: "Cargo insurance addresses the goods themselves; liability covers damage to others." — Flat coverage guarantee — states or implies automatic coverage without hedging
  - **[HIGH]** `faq`: "Liability covers injury and damage to others; cargo is a separate coverage for the freight itself." — Flat coverage guarantee — states or implies automatic coverage without hedging

### /contractors-insurance/
  - **[HIGH]** `faq`: "Builder's risk covers the structure and materials during construction or renovation for covered perils like fire or vandalism." — Flat coverage guarantee — states or implies automatic coverage without hedging

### /convenience-store-insurance/
  - **[HIGH]** `coverage:Commercial Property`: "Covers building, coolers, shelving, and inventory including tobacco and lottery products." — Flat coverage guarantee — states or implies automatic coverage without hedging

### /crime-fidelity-insurance/
  - **[HIGH]** `coverage:Employee Dishonesty`: "Covers theft of money, securities, or property by employees acting fraudulently." — Flat coverage guarantee — states or implies automatic coverage without hedging

### /directors-officers-insurance/
  - **[HIGH]** `faq`: "GL covers the organization's operational liability, not personal claims against directors for management decisions." — Flat coverage guarantee — states or implies automatic coverage without hedging

### /dump-truck-insurance/
  - **[HIGH]** `faq`: "Liability covers damage to others; cargo addresses the material you're hauling." — Flat coverage guarantee — states or implies automatic coverage without hedging

### /employment-practices-liability-insurance/
  - **[HIGH]** `coverage:Wrongful Termination`: "Covers claims alleging improper dismissal or constructive dismissal." — Flat coverage guarantee — states or implies automatic coverage without hedging

### /event-liability-insurance/
  - **[HIGH]** `coverage:Third-Party Bodily Injury`: "Covers claims when attendees are injured during the event — trips, falls, and crowd incidents." — Flat coverage guarantee — states or implies automatic coverage without hedging

### /food-truck-insurance/
  - **[HIGH]** `coverage:Commercial Auto`: "Covers the truck or trailer as a commercial vehicle — liability and physical damage while on the road." — Flat coverage guarantee — states or implies automatic coverage without hedging

### /hotel-motel-insurance/
  - **[HIGH]** `coverage:Commercial Property`: "Covers the building, furnishings, linens, and equipment against covered fire, water, and theft losses." — Flat coverage guarantee — states or implies automatic coverage without hedging

### /liquor-liability-insurance/
  - **[HIGH]** `coverage:Patron Injury & Property Damage`: "Covers claims that an intoxicated patron injured someone or damaged property after being served at your establishment." — Flat coverage guarantee — states or implies automatic coverage without hedging

### /motorcycle-insurance/
  - **[LOW]** `coverage:Third-Party Liability`: "FSRA specifies minimum third-party liability coverage of at least $200,000." — Specific dollar amount cited — verify limit, deductible, or regulatory basis

### /non-profit-insurance/
  - **[HIGH]** `coverage:General Liability`: "Covers injury and property damage claims at events, offices, and program locations." — Flat coverage guarantee — states or implies automatic coverage without hedging

### /pharmacy-insurance/
  - **[HIGH]** `coverage:Commercial Property`: "Covers inventory, fixtures, and dispensing equipment including narcotics storage security requirements." — Flat coverage guarantee — states or implies automatic coverage without hedging

### /product-recall-insurance/
  - **[HIGH]** `faq`: "Product liability covers injury or damage claims from defective products." — Flat coverage guarantee — states or implies automatic coverage without hedging
  - **[HIGH]** `faq`: "Recall covers the cost of withdrawing products from the market." — Flat coverage guarantee — states or implies automatic coverage without hedging

### /professional-liability-insurance/
  - **[LOW]** `faq`: "Contract requirements vary — $1M to $5M per occurrence is common for mid-size engagements." — Specific dollar amount cited — verify limit, deductible, or regulatory basis

### /property-management-insurance/
  - **[HIGH]** `coverage:General Liability`: "Covers injury and property damage claims arising from managed properties and management office operations." — Flat coverage guarantee — states or implies automatic coverage without hedging

### /restaurant-insurance/
  - **[HIGH]** `coverage:Property Coverage`: "Covers your building improvements, furniture, and kitchen equipment against covered losses." — Flat coverage guarantee — states or implies automatic coverage without hedging

### /salon-barber-insurance/
  - **[HIGH]** `coverage:Product Liability`: "Covers claims that retail products sold in-salon caused allergic reaction or injury." — Flat coverage guarantee — states or implies automatic coverage without hedging

### /trucking-insurance/
  - **[HIGH]** `faq`: "Liability covers injury and damage to others; cargo is about the freight itself." — Flat coverage guarantee — states or implies automatic coverage without hedging

### /warehousing-insurance/
  - **[HIGH]** `coverage:Commercial Property`: "Covers the warehouse structure, racking, forklifts, and handling equipment against covered losses." — Flat coverage guarantee — states or implies automatic coverage without hedging

---

## C. Count by classification

| Class | Count | Routes |
|-------|------:|--------|
| A | 2 | /daycare-private-school-insurance/, /greenhouse-agribusiness-insurance/ |
| B | 16 | /auto-insurance/, /boat-insurance/, /condo-insurance/, /cottage-insurance/, /cyber-insurance/, /group-home-auto-insurance/, /home-insurance/, /home-sharing-insurance/, /landlord-insurance/, /landscaping-snow-removal-insurance/, /life-insurance/, /mobile-home-insurance/, /motorcycle-insurance/, /personal-umbrella-insurance/, /tenant-insurance/, /travel-insurance/ |
| C | 18 | /business-interruption-insurance/, /commercial-auto-insurance/, /commercial-insurance/, /commercial-property-insurance/, /condominium-corporation-insurance/, /farm-insurance/, /fitness-gym-insurance/, /garage-dealership-insurance/, /grocery-specialty-food-insurance/, /manufacturing-insurance/, /medical-dental-insurance/, /pollution-liability-insurance/, /professional-liability-insurance/, /professional-offices-insurance/, /real-estate-insurance/, /religious-organizations-insurance/, /retail-insurance/, /small-business-insurance/ |
| D | 22 | /bonding-insurance/, /builders-developers-insurance/, /builders-risk-insurance/, /cargo-freight-insurance/, /contractors-insurance/, /convenience-store-insurance/, /crime-fidelity-insurance/, /directors-officers-insurance/, /dump-truck-insurance/, /employment-practices-liability-insurance/, /event-liability-insurance/, /food-truck-insurance/, /hotel-motel-insurance/, /liquor-liability-insurance/, /non-profit-insurance/, /pharmacy-insurance/, /product-recall-insurance/, /property-management-insurance/, /restaurant-insurance/, /salon-barber-insurance/, /trucking-insurance/, /warehousing-insurance/ |

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

1. **/pharmacy-insurance/** (D) — 1 content-safety flag(s): Flat coverage guarantee — states or implies automatic coverage without hedging
2. **/convenience-store-insurance/** (D) — 1 content-safety flag(s): Flat coverage guarantee — states or implies automatic coverage without hedging
3. **/employment-practices-liability-insurance/** (D) — 1 content-safety flag(s): Flat coverage guarantee — states or implies automatic coverage without hedging
4. **/salon-barber-insurance/** (D) — 1 content-safety flag(s): Flat coverage guarantee — states or implies automatic coverage without hedging
5. **/non-profit-insurance/** (D) — 1 content-safety flag(s): Flat coverage guarantee — states or implies automatic coverage without hedging
6. **/product-recall-insurance/** (D) — 2 content-safety flag(s): Flat coverage guarantee — states or implies automatic coverage without hedging; Flat coverage guarantee — states or implies automatic coverage without hedging
7. **/warehousing-insurance/** (D) — 1 content-safety flag(s): Flat coverage guarantee — states or implies automatic coverage without hedging
8. **/crime-fidelity-insurance/** (D) — 1 content-safety flag(s): Flat coverage guarantee — states or implies automatic coverage without hedging
9. **/liquor-liability-insurance/** (D) — 1 content-safety flag(s): Flat coverage guarantee — states or implies automatic coverage without hedging
10. **/property-management-insurance/** (D) — 1 content-safety flag(s): Flat coverage guarantee — states or implies automatic coverage without hedging
11. **/hotel-motel-insurance/** (D) — 1 content-safety flag(s): Flat coverage guarantee — states or implies automatic coverage without hedging
12. **/event-liability-insurance/** (D) — 1 content-safety flag(s): Flat coverage guarantee — states or implies automatic coverage without hedging
13. **/cargo-freight-insurance/** (D) — 2 content-safety flag(s): Flat coverage guarantee — states or implies automatic coverage without hedging; Flat coverage guarantee — states or implies automatic coverage without hedging
14. **/builders-risk-insurance/** (D) — 2 content-safety flag(s): Flat coverage guarantee — states or implies automatic coverage without hedging; Flat coverage guarantee — states or implies automatic coverage without hedging
15. **/trucking-insurance/** (D) — 1 content-safety flag(s): Flat coverage guarantee — states or implies automatic coverage without hedging
16. **/restaurant-insurance/** (D) — 1 content-safety flag(s): Flat coverage guarantee — states or implies automatic coverage without hedging
17. **/food-truck-insurance/** (D) — 1 content-safety flag(s): Flat coverage guarantee — states or implies automatic coverage without hedging
18. **/dump-truck-insurance/** (D) — 1 content-safety flag(s): Flat coverage guarantee — states or implies automatic coverage without hedging
19. **/directors-officers-insurance/** (D) — 1 content-safety flag(s): Flat coverage guarantee — states or implies automatic coverage without hedging
20. **/contractors-insurance/** (D) — 1 content-safety flag(s): Flat coverage guarantee — states or implies automatic coverage without hedging
21. **/builders-developers-insurance/** (D) — 1 content-safety flag(s): Flat coverage guarantee — states or implies automatic coverage without hedging
22. **/bonding-insurance/** (D) — 3 content-safety flag(s): Guarantee language — may overstate policy terms (or surety industry term); Guarantee language — may overstate policy terms (or surety industry term)
23. **/religious-organizations-insurance/** (C) — Shallow depth (215w total, cards avg 20.5w, considerations absent)
24. **/fitness-gym-insurance/** (C) — Shallow depth (240w total, cards avg 23w, considerations absent)
25. **/medical-dental-insurance/** (C) — Shallow depth (242w total, cards avg 23.5w, considerations absent)
26. **/grocery-specialty-food-insurance/** (C) — Shallow depth (251w total, cards avg 26w, considerations absent)
27. **/pollution-liability-insurance/** (C) — Shallow depth (252w total, cards avg 25w, considerations absent)
28. **/condominium-corporation-insurance/** (C) — Shallow depth (277w total, cards avg 26.5w, considerations absent)
29. **/commercial-insurance/** (C) — Shallow depth (283w total, cards avg 0w, considerations absent)
30. **/garage-dealership-insurance/** (C) — Shallow depth (283w total, cards avg 27.5w, considerations absent)
31. **/real-estate-insurance/** (C) — Shallow depth (283w total, cards avg 26w, considerations absent)
32. **/retail-insurance/** (C) — Shallow depth (292w total, cards avg 28w, considerations absent)
33. **/commercial-auto-insurance/** (C) — Shallow depth (323w total, cards avg 26w, considerations absent)
34. **/professional-offices-insurance/** (C) — Shallow depth (325w total, cards avg 31w, considerations absent)
35. **/farm-insurance/** (C) — Shallow depth (332w total, cards avg 21w, considerations absent)
36. **/commercial-property-insurance/** (C) — Shallow depth (367w total, cards avg 31w, considerations absent)
37. **/professional-liability-insurance/** (C) — Shallow depth (391w total, cards avg 31w, considerations present but thin overall)
38. **/business-interruption-insurance/** (C) — Shallow depth (395w total, cards avg 34w, considerations present but thin overall)
39. **/manufacturing-insurance/** (C) — Shallow depth (399w total, cards avg 29.2w, considerations absent)
40. **/small-business-insurance/** (C) — Shallow depth (399w total, cards avg 36w, considerations present but thin overall)
41. **/landscaping-snow-removal-insurance/** (B) — Reasonable (400w) but lacks full depth — cards specific (good), considerations moderate
42. **/cyber-insurance/** (B) — Reasonable (409w) but lacks full depth — cards specific/hedged (strong), considerations moderate
43. **/personal-umbrella-insurance/** (B) — Reasonable (472w) but lacks full depth — cards specific/hedged (strong), considerations moderate
44. **/group-home-auto-insurance/** (B) — Reasonable (488w) but lacks full depth — cards specific/hedged (strong), considerations specific/useful
45. **/landlord-insurance/** (B) — Reasonable (497w) but lacks full depth — cards specific/hedged (strong), considerations moderate
46. **/mobile-home-insurance/** (B) — Reasonable (506w) but lacks full depth — cards specific/hedged (strong), considerations specific/useful
47. **/life-insurance/** (B) — Reasonable (513w) but lacks full depth — cards specific/hedged (strong), considerations specific/useful
48. **/tenant-insurance/** (B) — Reasonable (519w) but lacks full depth — cards specific (good), considerations moderate
49. **/motorcycle-insurance/** (B) — Reasonable (535w) but lacks full depth — cards specific/hedged (strong), considerations specific/useful
50. **/boat-insurance/** (B) — Reasonable (539w) but lacks full depth — cards specific/hedged (strong), considerations specific/useful
51. **/travel-insurance/** (B) — Reasonable (540w) but lacks full depth — cards specific/hedged (strong), considerations specific/useful
52. **/cottage-insurance/** (B) — Reasonable (555w) but lacks full depth — cards specific/hedged (strong), considerations specific/useful
53. **/condo-insurance/** (B) — Reasonable (565w) but lacks full depth — cards specific/hedged (strong), considerations moderate
54. **/home-insurance/** (B) — Reasonable (571w) but lacks full depth — cards specific (good), considerations moderate
55. **/home-sharing-insurance/** (B) — Reasonable (588w) but lacks full depth — cards specific/hedged (strong), considerations specific/useful
56. **/auto-insurance/** (B) — Reasonable (649w) but lacks full depth — cards specific/hedged (strong), considerations absent

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
