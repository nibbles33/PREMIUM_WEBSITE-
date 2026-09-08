# Product Content Remediation Matrix — 2026-09-07

**Source:** `docs/qa-screenshots/product-content-audit-2026-09-07/audit-data.json` + `docs/product-content-audit-2026-09-07.md`  
**Branch:** `cursor/content-audit-7402` (audit snapshot)  
**Scope:** Triage/classification only — **no research, drafting, or fixes performed**

---

## Stop gates

- **NO MERGE**
- **NO DEPLOY**
- **NO VERCEL PROMOTION**
- **NO CONTENT WORK STARTED**

**STOP FOR OWNER REVIEW.** Proceed only after matrix review and batch approval.

---

## Classification standard (explicit)

**Greenhouse (757w) and Daycare (765w) are quality-bar references, not word-count targets.** Buckets prioritize accuracy, specificity, and appropriate hedging for each subject matter. Pages with lower legitimate complexity (e.g. Tenant, Travel) were **not** pushed toward C2/D2 solely for being below 700 words. Where a page has adequate depth but flat wording, it lands in **D1** regardless of word count.

---

## Bucket definitions (applied)

| Bucket | Meaning |
|--------|---------|
| **D1** | Safety wording only — validate existing assertions, hedge flat "Covers…" language; no research expansion |
| **D2** | Safety + thin — both unhedged wording and inadequate substance |
| **D3** | Specialized/high-risk — dedicated research required even if moderate length |
| **C1** | Modest depth improvement — incremental considerations/FAQ/card depth |
| **C2** | Substantial researched expansion — thin across sections, Greenhouse/Daycare-style investment |

---

## Bucket counts (49 C/D pages)

| Bucket | Count |
|--------|------:|
| D1 | 6 |
| D2 | 11 |
| D3 | 12 |
| C1 | 7 |
| C2 | 9 |
| **Total** | **45** |

---

## Full remediation matrix (49 rows)

| Route | Class | Words | Safety flags (summary) | Severity | Depth problem? | Bucket | Risk family | Recommended treatment |
|-------|------:|------:|------------------------|----------|----------------|--------|-------------|----------------------|
| /auto-insurance/ | D | 564 | [HIGH] coverage:Collision Coverage — Flat coverage guarantee — states or implies automatic coverage without hedging; [HIGH] coverage:Comprehensive Coverage — Flat coverage guarantee — states or implies automatic coverage without hedging; [HIGH] faq — Flat coverage guarantee — states or implies automatic coverage without hedging | high | No | **D1** | Personal | Hedging pass on collision/comprehensive/accident-benefits card + FAQ wording; retain Ontario-mandatory framing where verifiable; no length expansion. |
| /bonding-insurance/ | D | 448 | [MEDIUM] coverage:Bid Bonds — Guarantee language — may overstate policy terms (or surety industry term); [MEDIUM] coverage:Performance Bonds — Guarantee language — may overstate policy terms (or surety industry term); [MEDIUM] faq — Unhedged protection claim | medium | Yes | **D3** | Construction (Bonding/Surety) | Dedicated surety research pass; separate bond-type accuracy from GL; fix unhedged FAQ; do not treat as generic wording-only. |
| /builders-developers-insurance/ | D | 380 | [HIGH] faq — Flat coverage guarantee — states or implies automatic coverage without hedging | high | Yes | **D3** | Construction | Researched expansion + hedging; builder's risk / CGL overlap needs technical review, not card rephrase alone. |
| /builders-risk-insurance/ | D | 292 | [HIGH] coverageIntro — Flat coverage guarantee — states or implies automatic coverage without hedging; [HIGH] coverage:Work in Progress — Flat coverage guarantee — states or implies automatic coverage without hedging | high | Yes | **D3** | Construction | Dedicated builders-risk research (policy period, who buys, vs CGL); replace flat 'covers structure' intro/cards with hedged, accurate framing. |
| /business-interruption-insurance/ | C | 395 | None | — | Yes | **C1** | Industrial/Coverage-Types | Incremental: deepen 4 card descriptions, add 1–2 BI-specific FAQs; considerations exist — extend, don't rebuild. |
| /cargo-freight-insurance/ | D | 286 | [HIGH] coverageIntro — Flat coverage guarantee — states or implies automatic coverage without hedging; [HIGH] faq — Flat coverage guarantee — states or implies automatic coverage without hedging | high | Yes | **D3** | Transportation | Dedicated motor-cargo research (cargo vs liability vs contingent); fix flat 'covers' intro/FAQ; thin page needs substance + hedging. |
| /commercial-auto-insurance/ | C | 323 | None | — | Yes | **C1** | Transportation | Add practical considerations (fleet disclosures, hired/non-owned); modest FAQ expansion; cards already hedged. |
| /commercial-insurance/ | C | 283 | None | — | Yes | **C2** | Industrial/Coverage-Types (Hub) | Hub page rebuild: intro/trust depth for Windsor-Essex commercial entry; not a coverage-card page — focus wayfinding copy, not Greenhouse-length target. |
| /commercial-property-insurance/ | C | 367 | None | — | Yes | **C1** | Industrial/Coverage-Types | Add practical considerations; deepen property-valuation/co-insurance FAQ; no safety flags — modest pass only. |
| /condo-insurance/ | D | 565 | [MEDIUM] considerations — Flat inclusion statement — may overstate standard policy | medium | No | **D1** | Personal | Hedging pass on unit-contents card + corporation-assessment consideration; depth adequate for personal condo — no length chase. |
| /condominium-corporation-insurance/ | C | 277 | None | — | Yes | **C2** | Industrial/Coverage-Types | Substantial researched expansion (master policy, deductibles, unit-owner vs corp); thin corp-specific content missing. |
| /contractors-insurance/ | D | 345 | [HIGH] faq — Flat coverage guarantee — states or implies automatic coverage without hedging | high | Yes | **D3** | Construction | Dedicated construction research despite explorer visuals; fix builder's-risk FAQ flat claim; add considerations for subs/tools/wrap-up. |
| /convenience-store-insurance/ | D | 214 | [HIGH] coverage:Commercial Property — Flat coverage guarantee — states or implies automatic coverage without hedging | high | Yes | **D2** | Hospitality/Food | Hospitality-family research batch + hedging; thin (214w) with flat property card; add considerations ( tobacco/lottery, hours). |
| /crime-fidelity-insurance/ | D | 253 | [HIGH] coverage:Employee Dishonesty — Flat coverage guarantee — states or implies automatic coverage without hedging | high | Yes | **D3** | Industrial/Coverage-Types | Specialized crime/fidelity research; flat employee-dishonesty card; thin page needs researched expansion, not wording-only. |
| /directors-officers-insurance/ | D | 331 | [HIGH] faq — Flat coverage guarantee — states or implies automatic coverage without hedging | high | Yes | **D3** | Professional/Institutional | Dedicated D&O research; fix GL-vs-D&O FAQ flat claim; extend considerations for side-A/B/C if accurate. |
| /dump-truck-insurance/ | D | 326 | [HIGH] faq — Flat coverage guarantee — states or implies automatic coverage without hedging | high | Yes | **D3** | Transportation | Dedicated heavy-commercial auto/cargo research; fix liability/cargo FAQ flat split; add hauling/disclosure considerations. |
| /employment-practices-liability-insurance/ | D | 227 | [HIGH] coverage:Wrongful Termination — Flat coverage guarantee — states or implies automatic coverage without hedging | high | Yes | **D3** | Professional/Institutional | Dedicated EPL research (Ontario employment context); thin + flat wrongful-termination card; needs researched expansion. |
| /event-liability-insurance/ | D | 266 | [HIGH] coverage:Third-Party Bodily Injury — Flat coverage guarantee — states or implies automatic coverage without hedging | high | Yes | **D2** | Hospitality/Food (adjacent — events) | Event-specific research within hospitality batch where possible; hedging on injury card; add venue/permit considerations. *(Note: Best-fit: Hospitality/Food batch for shared event/permit patterns; distinct from restaurant property.)* |
| /farm-insurance/ | C | 332 | None | — | Yes | **C2** | Agriculture | Agriculture research pass (distinct from Greenhouse reference); Essex County local framing; add considerations — not word-count parity with Greenhouse. |
| /fitness-gym-insurance/ | C | 240 | None | — | Yes | **C2** | Retail/Services | Substantial expansion: waivers, equipment, participant injury; add considerations + deeper cards; no safety flags yet but thin. |
| /food-truck-insurance/ | D | 307 | [HIGH] coverage:Commercial Auto — Flat coverage guarantee — states or implies automatic coverage without hedging | high | Yes | **D2** | Hospitality/Food | Hospitality batch research; fix commercial-auto flat card; add commissary/liquor/permit considerations. |
| /garage-dealership-insurance/ | C | 283 | None | — | Yes | **C1** | Transportation | Modest depth: garagekeepers/dealer open-lot considerations; FAQ expansion; no safety flags. |
| /grocery-specialty-food-insurance/ | C | 251 | None | — | Yes | **C2** | Hospitality/Food | Hospitality batch research; spoilage/refrigeration considerations; thin across sections — not D yet but shallow. |
| /home-insurance/ | D | 571 | [MEDIUM] faq — Legal/regulatory requirement stated without verifiable Ontario basis | medium | No | **D1** | Personal | Single medium FAQ hedging fix (legal requirement framing); otherwise adequate depth — no expansion for length. |
| /hotel-motel-insurance/ | D | 263 | [HIGH] coverage:Commercial Property — Flat coverage guarantee — states or implies automatic coverage without hedging | high | Yes | **D2** | Hospitality/Food | Hospitality batch; fix property flat card; add pool/guest-belongings/BI considerations. |
| /landlord-insurance/ | D | 497 | [MEDIUM] faq — Guarantee language — may overstate policy terms (or surety industry term) | medium | No | **D1** | Personal | FAQ hedging on eviction/guarantee products; core landlord depth adequate — specificity over length. |
| /liquor-liability-insurance/ | D | 258 | [HIGH] coverage:Patron Injury & Property Damage — Flat coverage guarantee — states or implies automatic coverage without hedging | high | Yes | **D2** | Hospitality/Food | Dedicated liquor-liability research within hospitality batch; fix patron-injury flat card; regulatory context if verified. |
| /manufacturing-insurance/ | C | 399 | None | — | Yes | **C1** | Industrial/Coverage-Types | Modest: add considerations (products/completed ops, supply chain); 5 cards present — incremental only. |
| /medical-dental-insurance/ | C | 242 | None | — | Yes | **C2** | Retail/Services | Regulated-professional research (malpractice coordination, privacy); thin — needs substance before hedging-only pass. *(Note: Regulated exposure — research depth closer to D3 but no safety flags in audit.)* |
| /non-profit-insurance/ | D | 244 | [HIGH] coverage:General Liability — Flat coverage guarantee — states or implies automatic coverage without hedging | high | Yes | **D2** | Professional/Institutional | Institutional batch; fix GL flat card; add board/volunteer/D&O cross-reference considerations. |
| /pharmacy-insurance/ | D | 205 | [HIGH] coverage:Commercial Property — Flat coverage guarantee — states or implies automatic coverage without hedging | high | Yes | **D2** | Retail/Services | Regulated retail research; thinnest D page (205w); fix property flat card; narcotics/compounding disclosures. |
| /pollution-liability-insurance/ | C | 252 | None | — | Yes | **C2** | Industrial/Coverage-Types | Dedicated pollution research despite C class — high-stakes technical exposure; add considerations + hedged cards proactively. *(Note: No audit safety flags; classify C2 with D3-equivalent research rigor.)* |
| /product-recall-insurance/ | D | 252 | [HIGH] faq — Flat coverage guarantee — states or implies automatic coverage without hedging; [HIGH] faq — Flat coverage guarantee — states or implies automatic coverage without hedging | high | Yes | **D3** | Industrial/Coverage-Types | Dedicated recall vs product-liability research; fix two flat FAQ claims; thin page. |
| /professional-liability-insurance/ | C | 391 | None | — | Yes | **D3** | Professional/Institutional | Dedicated E&O research; remove/unverify $1M–$5M FAQ claim; hedging pass on profession-specific scope. |
| /professional-offices-insurance/ | C | 325 | None | — | Yes | **C1** | Professional/Institutional | Modest: add considerations (client records, hybrid work); FAQ de-templating from auto; no safety flags. |
| /property-management-insurance/ | D | 261 | [HIGH] coverage:General Liability — Flat coverage guarantee — states or implies automatic coverage without hedging | high | Yes | **D2** | Industrial/Coverage-Types | Property-mgmt research; fix GL flat card; add tenant/legal-expense/pool considerations. |
| /real-estate-insurance/ | C | 283 | None | — | Yes | **C2** | Industrial/Coverage-Types | Substantial: E&O vs GL for agents/brokers; thin; FAQ templated with food-truck — needs researched rewrite. |
| /religious-organizations-insurance/ | C | 215 | None | — | Yes | **C2** | Professional/Institutional | Institutional batch; thin (215w); add abuse/counselling/property considerations — no audit flags but shallow. |
| /restaurant-insurance/ | D | 306 | [HIGH] coverage:Property Coverage — Flat coverage guarantee — states or implies automatic coverage without hedging | high | Yes | **D2** | Hospitality/Food | Hospitality batch priority; fix property flat card despite hedged family label; add spoilage/liquor/delivery considerations. |
| /retail-insurance/ | C | 292 | None | — | Yes | **C1** | Retail/Services | Modest: add considerations (inventory valuation, online sales); incremental card/FAQ depth. |
| /salon-barber-insurance/ | D | 239 | [HIGH] coverage:Product Liability — Flat coverage guarantee — states or implies automatic coverage without hedging | high | Yes | **D2** | Retail/Services | Retail/services batch; fix product-liability flat card; add professional/beauty-service considerations. |
| /small-business-insurance/ | C | 399 | None | — | No | **D1** | Industrial/Coverage-Types | Single commercial-property card hedging; considerations exist — wording-only pass, not Greenhouse-length expansion. |
| /tenant-insurance/ | D | 519 | [HIGH] faq — Flat coverage guarantee — states or implies automatic coverage without hedging | high | No | **D1** | Personal | FAQ hedging pass ('protects your belongings', household coverage scope); adequate for simpler personal line — resist length expansion. *(Note: Explicit: quality bar met with accuracy/specificity at lower word count than Greenhouse/Daycare.)* |
| /trucking-insurance/ | D | 293 | [HIGH] faq — Flat coverage guarantee — states or implies automatic coverage without hedging | high | Yes | **D3** | Transportation | Dedicated trucking research (MCS-90, cargo, bobtail, jurisdiction); fix liability/cargo FAQ; never wording-only. |
| /warehousing-insurance/ | D | 252 | [HIGH] coverage:Commercial Property — Flat coverage guarantee — states or implies automatic coverage without hedging | high | Yes | **D2** | Industrial/Coverage-Types | Warehouse/bailee research; fix property flat card; add bailee/legal-liability considerations. |

> **Full flag quotes** for all D pages are listed in [Appendix A](#appendix-a-full-safety-flag-quotes).

---

## Risk family distribution

- **Agriculture:** C2×1
- **Construction:** D3×3
- **Construction (Bonding/Surety):** D3×1
- **Hospitality/Food:** D2×5, C2×1
- **Hospitality/Food (adjacent — events):** D2×1
- **Industrial/Coverage-Types:** C1×3, C2×3, D3×2, D2×2, D1×1
- **Industrial/Coverage-Types (Hub):** C2×1
- **Personal:** D1×5
- **Professional/Institutional:** D3×3, D2×1, C1×1, C2×1
- **Retail/Services:** C2×2, D2×2, C1×1
- **Transportation:** D3×3, C1×2

### Shared research pass feasibility

| Risk family | Shared research pass? | Rationale |
|-------------|----------------------|-----------|
| **Hospitality/Food** | **Yes — one pass, multiple pages** | Restaurant, food truck, grocery, convenience, hotel, liquor, event share premises/GL/property/liquor patterns. Event-liability is adjacent — shared permit/venue context, distinct short-term policy mechanics. |
| **Construction** | **Partial** | Contractors + builders-developers + landscaping can share construction CGL/wrap-up context. **Builders risk** and **bonding/surety** need **separate** research tracks (different products, different buyers). |
| **Transportation** | **Partial** | Commercial auto + dump truck + cargo share fleet/auto DNA. **Trucking** needs its own pass (federal/provincial, MCS-90, motor carrier). Garage/dealership is separate (garagekeepers, SEF 4). |
| **Professional/Institutional** | **Partial** | Non-profit + religious orgs share institutional/board/volunteer patterns. **D&O**, **EPL**, **professional liability**, and **daycare/education** each need **dedicated** research — high stakes, different policy forms. |
| **Retail/Services** | **Partial** | Retail + salon can share general retail GL/property patterns. **Medical/dental** and **pharmacy** need **separate** regulated-professional research. Fitness/gym shares retail batch for premises/waivers only. |
| **Agriculture** | **Separate from other families** | Farm pass distinct from Greenhouse (already STRONG reference). Do not batch with hospitality or industrial. |
| **Industrial/Coverage-Types** | **Partial** | Small business + commercial property + BI can share generic commercial core. **Pollution**, **product recall**, **crime/fidelity**, **condo corporation**, **real estate E&O**, **warehousing/bailee**, and **commercial hub** each need **separate** tracks. |
| **Personal** | **Partial — mostly D1 wording passes** | Auto/home/condo/tenant/motorcycle/travel/landlord/cottage share personal-lines hedging conventions. Tenant/travel need **minimal** expansion only — accuracy over length. Auto Ontario mandatory language is verifiable — preserve facts, hedge coverage-type descriptions. |

---

## Appendix A: Full safety flag quotes

#### /auto-insurance/
- **[HIGH]** `coverage:Collision Coverage`: "Collision covers damage to your own vehicle from a crash with another car or object — useful when fault isn't clear or you're at fault."
- **[HIGH]** `coverage:Comprehensive Coverage`: "Covers theft, vandalism, weather damage, and other non-collision events."
- **[HIGH]** `faq`: "Collision covers damage to your vehicle from a crash with another vehicle or object, regardless of fault."

#### /bonding-insurance/
- **[MEDIUM]** `coverage:Bid Bonds`: "Required when submitting a bid on certain contracts — guarantees you will honour your bid and enter the contract if selected."
- **[MEDIUM]** `coverage:Performance Bonds`: "Guarantees completion of the contracted work according to project terms if the principal defaults."
- **[MEDIUM]** `faq`: "Insurance protects you against covered losses."

#### /builders-developers-insurance/
- **[HIGH]** `faq`: "Builder's risk covers the structure and materials during construction or major renovation for covered perils."

#### /builders-risk-insurance/
- **[HIGH]** `coverageIntro`: "Builder's risk covers the project itself during construction — separate from the contractor's ongoing liability policy."
- **[HIGH]** `coverage:Work in Progress`: "Covers the structure and installed materials during construction against covered perils like fire, theft, and wind."

#### /cargo-freight-insurance/
- **[HIGH]** `coverageIntro`: "Cargo insurance addresses the goods themselves; liability covers damage to others."
- **[HIGH]** `faq`: "Liability covers injury and damage to others; cargo is a separate coverage for the freight itself."

#### /condo-insurance/
- **[MEDIUM]** `considerations`: "Some policies include coverage if the corporation assesses owners for the master policy deductible after a claim."

#### /contractors-insurance/
- **[HIGH]** `faq`: "Builder's risk covers the structure and materials during construction or renovation for covered perils like fire or vandalism."

#### /convenience-store-insurance/
- **[HIGH]** `coverage:Commercial Property`: "Covers building, coolers, shelving, and inventory including tobacco and lottery products."

#### /crime-fidelity-insurance/
- **[HIGH]** `coverage:Employee Dishonesty`: "Covers theft of money, securities, or property by employees acting fraudulently."

#### /directors-officers-insurance/
- **[HIGH]** `faq`: "GL covers the organization's operational liability, not personal claims against directors for management decisions."

#### /dump-truck-insurance/
- **[HIGH]** `faq`: "Liability covers damage to others; cargo addresses the material you're hauling."

#### /employment-practices-liability-insurance/
- **[HIGH]** `coverage:Wrongful Termination`: "Covers claims alleging improper dismissal or constructive dismissal."

#### /event-liability-insurance/
- **[HIGH]** `coverage:Third-Party Bodily Injury`: "Covers claims when attendees are injured during the event — trips, falls, and crowd incidents."

#### /food-truck-insurance/
- **[HIGH]** `coverage:Commercial Auto`: "Covers the truck or trailer as a commercial vehicle — liability and physical damage while on the road."

#### /home-insurance/
- **[MEDIUM]** `faq`: "It isn't legally required in Ontario if you own your home free and clear, but it's strongly recommended."

#### /hotel-motel-insurance/
- **[HIGH]** `coverage:Commercial Property`: "Covers the building, furnishings, linens, and equipment against covered fire, water, and theft losses."

#### /landlord-insurance/
- **[MEDIUM]** `faq`: "Eviction and rent guarantee products are separate considerations."

#### /liquor-liability-insurance/
- **[HIGH]** `coverage:Patron Injury & Property Damage`: "Covers claims that an intoxicated patron injured someone or damaged property after being served at your establishment."

#### /non-profit-insurance/
- **[HIGH]** `coverage:General Liability`: "Covers injury and property damage claims at events, offices, and program locations."

#### /pharmacy-insurance/
- **[HIGH]** `coverage:Commercial Property`: "Covers inventory, fixtures, and dispensing equipment including narcotics storage security requirements."

#### /product-recall-insurance/
- **[HIGH]** `faq`: "Product liability covers injury or damage claims from defective products."
- **[HIGH]** `faq`: "Recall covers the cost of withdrawing products from the market."

#### /property-management-insurance/
- **[HIGH]** `coverage:General Liability`: "Covers injury and property damage claims arising from managed properties and management office operations."

#### /restaurant-insurance/
- **[HIGH]** `coverage:Property Coverage`: "Covers your building improvements, furniture, and kitchen equipment against covered losses."

#### /salon-barber-insurance/
- **[HIGH]** `coverage:Product Liability`: "Covers claims that retail products sold in-salon caused allergic reaction or injury."

#### /tenant-insurance/
- **[HIGH]** `faq`: "Generally, a tenant policy covers the named insured and their household as defined in the policy."

#### /trucking-insurance/
- **[HIGH]** `faq`: "Liability covers injury and damage to others; cargo is about the freight itself."

#### /warehousing-insurance/
- **[HIGH]** `coverage:Commercial Property`: "Covers the warehouse structure, racking, forklifts, and handling equipment against covered losses."

---

## Audit notes

- **Daycare** row reflects **pre-implementation audit snapshot** (214w, 2 high flags). Owner-approved content landed on `cursor/daycare-content-2026-09-07` after audit — **re-classify after baseline merge**, do not schedule duplicate work.
- **Greenhouse** excluded (Class A reference).
- **Pollution liability** is Class C with **no audit flags** but assigned **C2 with D3-equivalent research** due to technical exposure risk.

---

## Stop gates (repeat)

- **NO MERGE**
- **NO DEPLOY**
- **NO CONTENT WORK STARTED**

**STOP FOR OWNER REVIEW.**
