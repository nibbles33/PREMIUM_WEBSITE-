# Grade C Batch E — Manufacturing / Commercial Hub — Phase 1 Research

**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Frozen HEAD:** `be615f9`  
**Research date:** 2026-09-09  
**Phase:** RESEARCH ONLY — no page copy implementation  
**Isolated worktree:** `/tmp/PREMIUM_WEBSITE-d3-transportation`  
**Site audit at research start:** A40 / B16 / C2 / D0

**Routes:**
- `/manufacturing-insurance/`
- `/commercial-insurance/` (hub)

**Status:** **STOP FOR OWNER REVIEW** — do not implement copy until approved

---

## Category legend

| Tag | Meaning |
|-----|---------|
| **[STATUTORY]** | Ontario statute or regulation |
| **[REGULATORY]** | MECP, CFIA, Health Canada, WSIB, or other regulator |
| **[COMMON POLICY STRUCTURE]** | Standard CGL / commercial property / BI / EB forms |
| **[INSURER-SPECIFIC]** | Varies by insurer/MGA wording |
| **[UNDERWRITING]** | Rating/eligibility input — not a coverage guarantee |
| **[EXPOSURE]** | Operational risk — may map to purchasable coverage |

---

## A. Worktree safety

| Check | Result |
|-------|--------|
| **WORKTREE** | `/tmp/PREMIUM_WEBSITE-d3-transportation` |
| **BRANCH** | `cursor/coverage-explorer-ux-v2-2026-09-07` |
| **HEAD** | `be615f9` (`be615f969ae997202c8610bdf5d13efc0c472f64`) |
| **STATUS** | Pre-existing dirty QA screenshots + modified `docs/product-content-audit-2026-09-07.md` (not touched). **No `src/` modifications during research.** |
| **Primary carrier worktree** | Untouched |

**Safety confirmation (pre-commit):** Only this research doc will be added. No production source, Explorer runtime, image, scanner, Batch A/B/C/D, or frozen route changes.

---

## B. Current-state audit

Audit basis: `docs/qa-screenshots/product-content-audit-2026-09-07/audit-data.json` + source extraction @ HEAD `be615f9`.

### Summary

| Route | Grade | Words | HIGH | MED | LOW | Explorer | Considerations | FAQs | V2 pairs |
|-------|-------|------:|-----:|----:|----:|---------:|---------------:|-----:|----------|
| `/manufacturing-insurance/` | **C** | 399 | 0 | 0 | 0 | 5 | **0** | 5 | **None** |
| `/commercial-insurance/` | **C** | 283 | 0 | 0 | 0 | **Not rendered** | **0** | 5 | **None** |

**Grade C drivers:**
- **Manufacturing:** Below ~400 substantive words; no V2 Explorer detail pairs; no considerations; generic 19-word hero; coverage cards avg ~29 words with categorical phrasing on property/EB.
- **Commercial hub:** Below ~400 words; **zero coverage cards by design**; no considerations; orientation copy only (hero + trust + industry grid + broker steps + FAQ + CTA); FAQ pattern shared with auto route.

**Benchmark (architecture/tone only):** `/contractors-insurance/` and `/commercial-property-insurance/` (A-grade industry pages with V2 pairs + considerations); `/small-business-insurance/` (A-grade coordination page); frozen `/product-recall-insurance/`, `/pollution-liability-insurance/`, `/business-interruption-insurance/`, `/crime-fidelity-insurance/`.

---

### B1. `/manufacturing-insurance/`

| Item | Current |
|------|---------|
| **ROUTE** | `/manufacturing-insurance/` |
| **SOURCE FILE** | `src/data/commercial-industries.ts` (~541–617) |
| **ADAPTER** | `src/lib/buildPilotProductConfig.ts` → `adaptCommercialIndustryContent()` |
| **PRODUCT NAME** | Manufacturing Insurance |
| **GRADE** | **C** |
| **SUBSTANTIVE WORD COUNT** | 399 |
| **HIGH / MEDIUM / LOW** | 0 / 0 / 0 (audit `safetyFlags: []`; risky wording flagged manually in §O) |
| **META TITLE** | Manufacturing Insurance in Windsor-Essex \| Premium Insurance Brokers |
| **META DESCRIPTION** | Manufacturing insurance for Windsor-Essex — product liability, commercial property, business interruption, equipment breakdown, and machine shop coverage through an independent broker. |
| **HERO** | Headline: *"Manufacturing Insurance"* · Subhead: *"Property, product liability, and business interruption coverage for Windsor-Essex manufacturers — including machine shops and tool and die operations."* (19 words — generic list) |
| **WHO IT IS FOR** | *(none — `whoItIsFor` unset; trust band falls back to subhead via adapter)* |
| **coverageIntro** | *"Coverages that address products, facilities, equipment, and income after a covered loss."* |
| **Considerations** | **0** |
| **V2 detail pairs** | **None** |
| **Explorer manifest** | `manufacturing-insurance` · archetype **`industrial-warehouse`** · visual family **`factory-industrial`** · interactive master asset present |

| Explorer ID | Current title | Card description (risk notes) |
|-------------|---------------|-------------------------------|
| `product-liability` | Product Liability | *"Helps protect against claims…"* — hedged OK; no products-completed-operations / recall split |
| `commercial-property` | Commercial Property | **"Covers buildings, machinery, and stock…"** — categorical; no valuation/coinsurance/tenant vs owner hedge |
| `business-interruption` | Business Interruption | *"Can help replace lost income…"* — OK hedge; no covered physical-loss trigger stated on card |
| `equipment-breakdown` | Equipment Breakdown | **"Addresses sudden mechanical or electrical breakdown…"** — reads like automatic coverage; no endorsement hedge |
| `machine-shop-tool-die` | Machine Shop & Tool & Die | Operational nuance OK; not a separate insuring agreement — exposure framing |

**CROSS-LINKS** (`industryRelatedLinks`): Commercial Insurance Hub, Commercial Property, Product Recall

**Thin areas:** No hero depth on audience segmentation (light fab vs food vs plastics); no GL/CGL framing; no pollution/cyber/crime/supply-chain; no valuation/WIP distinction; no cross-link to BI or Pollution specialty routes; CTA *"Ready to cover your manufacturing operation?"* uses unhedged "cover."

**Duplication risk:** Overlaps `/commercial-property-insurance/`, `/business-interruption-insurance/`, `/product-recall-insurance/`, `/pollution-liability-insurance/` without differentiation matrix.

**Inappropriate for hub?** N/A — this is a product/industry route (appropriate depth target ~1000–1300w at Grade A).

**FAQ COUNT:** 5 (equipment breakdown and BI FAQs partially hedged — good baseline)

---

### B2. `/commercial-insurance/` (HUB)

| Item | Current |
|------|---------|
| **ROUTE** | `/commercial-insurance/` |
| **SOURCE FILE** | `src/data/pilot-commercial-inline.ts` (~32–58) + shared `commercialHubFaqs`, `commercialBrokerCopy`, `commercialIndustryTiles` from `src/data/commercial-industries.ts` |
| **LAYOUT** | `layout: "commercial-hub"` |
| **PRODUCT NAME** | Commercial Insurance (hub) |
| **GRADE** | **C** |
| **SUBSTANTIVE WORD COUNT** | 283 |
| **HIGH / MEDIUM / LOW** | 0 / 0 / 0 |
| **META TITLE** | Commercial Insurance in Windsor-Essex \| Premium Insurance Brokers |
| **META DESCRIPTION** | Commercial insurance for Windsor-Essex manufacturers, trucking fleets, contractors, restaurants, and more — industry-specific coverage through an independent broker. |
| **HERO** | Eyebrow: *Commercial Insurance* · Headline: *"Commercial insurance, built for your industry"* · Lead: *"Windsor-Essex runs on manufacturing, trucking, and trades. We build coverage around the risks specific to your industry — not a generic business policy."* (23 words in lead) |
| **WHO IT IS FOR** | Implied via Windsor-Essex industry reference — no explicit audience paragraph |
| **coverageIntro** | *(empty)* |
| **Coverage cards** | **0** (`coverageItems: []`) |
| **Considerations** | **0** |
| **EXPLORER PRESENT** | **NO** — `PilotProductPage.tsx` renders `CommercialIndustryGrid` when `isCommercialHub`; skips `ProductCoverageExplorer` |
| **EXPLORER STATE COUNT** | 0 on page (manifest entry exists with empty `coverageZones`) |
| **V2 PAIRS** | None |
| **Trust band** | `commercialBrokerCopy` — independent advice, multiple carriers, plain language |
| **Main body** | `CommercialIndustryGrid` — 12 industry tiles |
| **Broker story** | `commercialBrokerSteps` (4 steps) |
| **Related products** | **None** on hub config |
| **CTA** | *"Ready to protect your business?"* — generic "protect" |

**Hub manifest** (`routes.ts`): `commercial-insurance` · archetype **`hub-campus`** · **`coverageZones: {}`** (empty). Interactive master asset file exists but Explorer is **not shown**.

**Navigation role:** Primary business entry in `nav-business.ts` (`businessNavHub.href = /commercial-insurance/`); mega-menu has 7 clusters (Commercial Hub, Transportation, Construction, Manufacturing & Industry, Hospitality & Retail, Professional, Specialty).

**FAQ COUNT:** 5 (`commercialHubFaqs`) — shares 2+ FAQ pattern with auto-insurance per audit; orientation-level content.

**Thin areas:** No category map (property vs liability vs auto vs specialty); no specialty coverage navigation block; no explicit hub vs small-business distinction; no local proof beyond Windsor-Essex mention; grade C driven by word count not missing product-page template.

**Duplication risk vs:** `/small-business-insurance/` (deep A-grade coordination page), every industry route, `/commercial-property-insurance/`.

**Appropriate for hub:** Deep product explanations, legal/regulatory detail, duplicated child FAQs, false all-in-one bundle implication — **currently mostly absent** (good); hero/CTA generic phrasing could improve.

---

## C. Manufacturing research

### Page job

**Primary job:** Windsor–Essex **ordinary manufacturing and industrial operations** entry point — light manufacturing, fabrication, machining, metalworking, plastics, assembly, industrial warehouse/production, and **job-shop / tool & die** operations called out in current copy.

**Audience (supported):**
- Owner-operated machine shops and precision parts suppliers
- Fabrication and metalworking
- Plastics and assembly lines
- Food manufacturing **only where current route intends** — mention as possible sub-segment with cross-link to grocery/food specialty if primary exposure is retail food distribution; do **not** silently absorb highly regulated pharma, firearms, or nuclear without owner split decision

**Not this page's core job:** Deep pollution law treatise (→ `/pollution-liability-insurance/`), recall expense scheduling (→ `/product-recall-insurance/`), standalone BI treatise (→ `/business-interruption-insurance/`), or commercial property landlord depth (→ `/commercial-property-insurance/`).

---

### A. Property [COMMON POLICY STRUCTURE] [UNDERWRITING]

**Insurable interests commonly reviewed for manufacturers:**
- **Buildings** — owned structure or tenant leasehold improvements
- **Machinery & production equipment** — CNC, presses, robotics, boilers (scheduling/values critical)
- **Tools, dies, molds** — often high value; may need scheduling
- **Stock** — raw materials, packaging, finished goods
- **Work in progress (WIP)** — custom/job-shop WIP valuation differs from commodity finished goods
- **Tenant improvements** — when leasing industrial space
- **Property away from premises** — exhibitions, consignment, temporary storage (often sublimited)

**Valuation [COMMON POLICY STRUCTURE]:**
- Policies may settle on **replacement cost** or **actual cash value (ACV)** — not universal
- **Inventory** may be valued at cost, selling price, or other basis depending on form/endorsement — **do not imply all stock/WIP valued identically**
- **Coinsurance** on many commercial property forms — underreported values can reduce claim payments
- **Seasonal / peak values** — production spikes, holiday inventory; monthly reporting or peak-season endorsements may apply [INSURER-SPECIFIC]

**Off-premises [COMMON POLICY STRUCTURE]:** Temporary storage, goods in transit to customers — typically sublimited or separate inland marine; not automatic in base property.

**Cross-check:** Frozen `/commercial-property-insurance/` owns building/contents/coinsurance/water extensions depth — manufacturing should **coordinate and cross-link**, not duplicate full property treatise.

---

### B. Equipment Breakdown [COMMON POLICY STRUCTURE] [EXPOSURE]

**Distinction (critical):**

| | Commercial property | Equipment breakdown (EB) / boiler & machinery |
|---|---------------------|-----------------------------------------------|
| **Typical trigger** | External insured perils — fire, wind, theft, vandalism, some water perils | **Internal** sudden and accidental mechanical, electrical, or pressure-system failure |
| **Examples** | Fire destroys CNC line | Motor burnout, electrical arcing, compressor seizure, boiler explosion |
| **Standard property form** | Often covers fire damage to machinery | **Often excludes** internal breakdown [COMMON POLICY STRUCTURE] |
| **EB form** | N/A | May cover repair/replacement, diagnostic labour, expediting; may include **EB-linked BI** and spoilage on some programs [INSURER-SPECIFIC] |

**Sources:** Northbridge Insurance, Federated Insurance, Acera Insurance (Canadian broker/insurer commentary); aligns with frozen commercial property FAQ and restaurant EB/spoilage card pattern.

**Manufacturing exposures:** CNC machines, presses, compressors, refrigeration, electrical panels, production-line automation, HVAC serving process.

**Do NOT state:**
- Ordinary property automatically covers internal mechanical/electrical breakdown
- Equipment breakdown automatically covers every resulting loss (wear/tear, lack of maintenance, installation errors commonly excluded)
- EB replaces property for fire/lightning damage to same equipment

**Extra expense / spoilage [INSURER-SPECIFIC]:** Some EB programs address spoilage of stock dependent on failed equipment or extra expense to resume production — triggers vary; food/pharma manufacturers need explicit review.

**Cross-check frozen routes:** `/commercial-property-insurance/` EB card; `/restaurant-insurance/` EB & spoilage; no standalone `/equipment-breakdown-insurance/` route — EB remains **endorsement/sublimit concept** across industry pages.

---

### C. Business Interruption [COMMON POLICY STRUCTURE] [LEGAL]

**Trigger [COMMON POLICY STRUCTURE]:** Property-linked BI typically requires:
1. **Direct physical loss or damage** to insured property (or qualifying dependent property for contingent BI endorsement)
2. From a **covered peril** under the property policy
3. Causing **necessary suspension** during **period of restoration / indemnity period**

**Ontario legal context:** *SIR Corp. v. Aviva* (2023 ONCA 778) — loss of use without physical damage does not trigger standard property-linked BI. [LEGAL commentary]

**Components [COMMON POLICY STRUCTURE]:**
- Lost business income / gross earnings
- Continuing expenses (rent, debt service, selective payroll)
- Extra expense to reduce BI or speed resumption
- **Waiting period** (hours/days) before BI pays
- **Indemnity/restoration period** cap

**Machinery breakdown interaction [INSURER-SPECIFIC]:** EB policies or endorsements may include limited BI for production interruption from covered breakdown — separate from fire/water BI on property policy; wording differs.

**Dependent property / contingent BI [COMMON POLICY STRUCTURE]:**
- May respond when a **named** key supplier, customer, or leader location suffers **covered direct physical loss** that disrupts your operations
- **Not** general supply-chain delay, financial failure, strike, or utility outage without qualifying physical damage endorsement

**Supply chain [EXPOSURE]:** Single-source raw materials, just-in-time components, outsourced coating/heat-treat — disclose; CBI requires endorsement and named locations.

**Cross-check:** Frozen `/business-interruption-insurance/` — manufacturing BI card and considerations should **link outward** for CBI depth.

---

### D. Product Liability [COMMON POLICY STRUCTURE]

**Typical CGL structure for manufacturers [COMMON POLICY STRUCTURE]:**
- **Coverage A** — bodily injury and property damage liability
- **Products-completed operations hazard** — claims arising from products after leaving premises / completed work
- Separate **products-completed operations aggregate limit** from general aggregate (IRMI/CGL commentary; Sovereign manufacturing extensions PDF)

**Scope [EXPOSURE]:** Manufactured products, component parts, private-label goods, reworked customer materials, precision parts to customer spec.

**Do NOT guarantee response** — defects, known contamination, contractual warranties, recall expenses, and punitive damages may be excluded or sublimited.

**Optional extensions [INSURER-SPECIFIC]:** Manufacturer's E&O, product rectification — Aviva/Markel manufacturing programs; not universal.

**Cross-check:** Distinct from `/professional-liability-insurance/` unless design/engineering services blur (disclose).

---

### E. Product Recall [COMMON POLICY STRUCTURE] vs Product Liability

| | Product liability (CGL) | Product recall / withdrawal expense |
|---|-------------------------|-------------------------------------|
| **Primary purpose** | Third-party BI/PD **claims** from products | **First-party** recall/withdrawal **expenses** |
| **Typical costs** | Lawsuit defence, judgments/settlements for injury/damage | Notification, retrieval, storage, disposal, consultants |
| **Automatic together?** | **No** — recall expense often separate endorsement or standalone policy |

**Regulatory context [REGULATORY]:**
- **Food:** CFIA oversight; most recalls company-led; Minister may order mandatory recall in defined circumstances
- **Consumer products:** Health Canada under Canada Consumer Product Safety Act
- Regulatory involvement **≠** insurance automatically responds (frozen product recall page)

**Cross-check:** Frozen `/product-recall-insurance/` — manufacturing should **cross-link**, not duplicate recall expense scheduling.

---

### F. Pollution [STATUTORY] [REGULATORY] [COMMON POLICY STRUCTURE]

**Manufacturing exposures [EXPOSURE]:** Chemical storage, solvents, paints, metal finishing, waste handling, forklift propane, refrigerants, dust collection, wastewater.

**Ontario [STATUTORY]:** *Environmental Protection Act* — duty to report spills to Spills Action Centre; owner/controller must prevent/eliminate adverse effects and undertake cleanup (Ontario.ca spill reporting; O. Reg. 675/98).

**CGL [COMMON POLICY STRUCTURE]:** Pollution exclusions common — from sudden-and-accidental narrow exceptions to absolute/total pollution exclusions. **Do not say CGL never covers pollution** — depends on wording and claim framing (frozen pollution page).

**Dedicated pollution [COMMON POLICY STRUCTURE]:** Site/premises environmental impairment, contractors pollution (if contracting off-site work), transportation pollution — claims-made triggers common.

**Manufacturing page role:** Supporting consideration + cross-link when material exposure; not default for every manufacturer.

---

### G. Crime / Cyber [COMMON POLICY STRUCTURE] [EXPOSURE]

**Crime/fidelity [EXPOSURE]:** Employee dishonesty (inventory, payroll), forgery, theft of money/securities; property forms often **exclude or restrict employee theft** (frozen crime page).

**Cyber [EXPOSURE]:** Ransomware, business email compromise, vendor-payment fraud — **not the same** as crime computer fraud or cyber insurance; social engineering often needs separate sublimit/endorsement.

**Operational technology (OT) [EXPOSURE]:** Production systems, SCADA, CNC networks — may blur cyber vs property; ordinary property may not address non-physical cyber events.

**Manufacturing page role:** Brief consideration + links to `/crime-fidelity-insurance/` and `/cyber-insurance/` when relevant — not core Explorer states unless owner expands.

---

### H. Supply Chain [EXPOSURE]

- Key suppliers, customers, outsourced processes, bottlenecks, single-source inputs
- **Contingent BI** may apply only with named dependent + covered physical loss at dependent location
- Supplier delay, port disruption, or contract dispute without physical damage — **generally not insured** under standard BI

---

## D. Equipment Breakdown analysis (manufacturing focus)

**Current manufacturing card:** *"Addresses sudden mechanical or electrical breakdown of critical production equipment — CNC machines, presses, and compressors."*

| Issue | Severity | Fix direction |
|-------|----------|---------------|
| "Addresses" without "where purchased" | **MED** | May help when EB endorsement/coverage purchased |
| Implies production equipment always covered | **MED** | Distinguish property (fire) vs EB (internal failure) |
| No wear/tear / maintenance exclusion | **LOW** | LEFT detail: maintenance and gradual deterioration commonly excluded |
| No BI/spoilage coordination | **LOW** | Note EB-linked income coverage may exist on some forms — link BI page |

**Recommended Explorer LEFT concept (equipment-breakdown):** *"A power surge can stop your line — but fire insurance and breakdown insurance respond to different failures."*

**Recommended RIGHT detail:** External perils vs internal arcing/mechanical failure; endorsement required; maintenance exclusions; may include expediting/extra expense on some forms [INSURER-SPECIFIC].

**Owner alignment:** Keep `equipment-breakdown` as core Explorer ID — concept is correct and differentiated from property card once hedged.

---

## E. BI / supply-chain analysis (manufacturing focus)

**Current manufacturing BI card:** *"Can help replace lost income and pay ongoing expenses if a covered property loss stops production."*

**Strengths:** "Can help" and "covered property loss" partially hedge.

**Gaps:**
- Card does not state **physical damage trigger** explicitly
- No waiting period / indemnity period mention
- No distinction: fire/water shutdown vs supplier delay vs pandemic
- FAQ mentions waiting periods — **keep and expand** in implementation

**Supply-chain consideration theme:** Name critical suppliers/customers; contingent BI is endorsement-based; financial failure of supplier not covered.

**Cross-link:** `/business-interruption-insurance/` for CBI and mechanics depth.

---

## F. Product Liability vs Recall (manufacturing focus)

**Current manufacturing product liability card:** *"Helps protect against claims that a product you make or sell caused injury or damage."*

**Gaps:** No products-completed operations aggregate mention; no recall expense distinction; no component-parts / customer-spec work nuance.

**Recommended FAQ (plan):** *"Is product recall included with product liability?"* → No — liability addresses third-party injury/damage claims; recall/withdrawal expenses are separate coverage/trigger (frozen recall page).

**Related links:** Already includes Product Recall — **keep**; add Pollution only if consideration added (optional third link vs BI).

---

## G. Pollution / Crime / Cyber analysis (manufacturing supporting role)

| Topic | Manufacturing depth | Owner route |
|-------|---------------------|-------------|
| Pollution | 1 consideration when chemicals/waste/tanks; cross-link | `/pollution-liability-insurance/` |
| Crime | 1 consideration for inventory/payroll theft | `/crime-fidelity-insurance/` |
| Cyber/OT | 1 consideration for ransomware/BEC/production IT | `/cyber-insurance/` |

**Do not add fourth/fifth Explorer states** for pollution/cyber unless owner requests — avoids hub-like sprawl on industry page.

**Language:** "May exclude or restrict" pollution on CGL; "Not automatic" for cyber/OT on property.

---

## H. Manufacturing Explorer plan

Preserve technical IDs. Add V2 `detailTitle` / `detailDescription` pairs at implementation (Batch B/D pattern).

| STATE ID | CURRENT TITLE | KEEP / RETITLE / FLAG | PROPOSED VISITOR TITLE | RIGHT CONCEPT | DETAIL TITLE (LEFT hook) | LEFT CONCEPT | FACTUAL CAUTION |
|----------|---------------|----------------------|------------------------|---------------|--------------------------|--------------|-----------------|
| `product-liability` | Product Liability | **KEEP** | Product Liability | Third-party injury/PD from products you make or sell | *"A defective part can follow your product long after it leaves the dock"* | Products-completed operations under CGL; separate aggregate; not recall expense | Do not guarantee coverage for every defect claim |
| `commercial-property` | Commercial Property | **KEEP — FLAG copy** | Commercial Property | Building, machinery, stock, improvements | *"Your landlord's policy doesn't cover your CNC machines"* | Direct physical loss to insured property; valuation and coinsurance matter | **Remove "Covers"** — use "May help cover… subject to…" |
| `business-interruption` | Business Interruption | **KEEP** | Business Interruption | Income/expenses after covered physical loss stops production | *"Rent and payroll don't pause when the line stops"* | Physical loss trigger; waiting period; restoration period | Not every shutdown; not supplier delay alone |
| `equipment-breakdown` | Equipment Breakdown | **KEEP — FLAG copy** | Equipment Breakdown | Internal mechanical/electrical failure — optional endorsement | *"Fire insurance and breakdown insurance respond to different failures"* | EB vs property peril split; CNC/press/compressor examples | Not wear/tear; not automatic on base property |
| `machine-shop-tool-die` | Machine Shop & Tool & Die | **KEEP** (retitle visitor only) | Job Shop & Tool & Die | WIP, tooling values, customer-spec parts exposure | *"Custom work-in-progress is hard to replace overnight"* | Job-shop disclosure; precision parts liability; equipment values | Not a separate policy name — exposure segment |

**Manifest zones (`routes.ts`):** Current zone mapping is coherent — **no manifest change** unless copy retitles only.

**V2 pairs:** **None today** — implementation must add all five LEFT/RIGHT pairs.

---

## I. Manufacturing considerations plan (6–8)

| # | Theme | Support | Cross-link |
|---|-------|---------|------------|
| 1 | **Building, machinery, and property values** | [COMMON POLICY STRUCTURE] RC/ACV, coinsurance, tenant vs owner | Commercial Property |
| 2 | **Raw materials, WIP, and finished goods valuation** | [UNDERWRITING] cost vs selling price; seasonal peaks | Commercial Property |
| 3 | **Equipment breakdown vs commercial property** | [COMMON POLICY STRUCTURE] internal vs external perils | — (in-page) |
| 4 | **Production interruption and business income** | [COMMON POLICY STRUCTURE] physical loss trigger, waiting period | Business Interruption |
| 5 | **Product liability and customer-spec parts** | [COMMON POLICY STRUCTURE] products-completed ops | — |
| 6 | **Product recall vs liability** | [COMMON POLICY STRUCTURE] | Product Recall |
| 7 | **Key suppliers and contingent BI** | [COMMON POLICY STRUCTURE] named dependent physical loss | Business Interruption |
| 8 | **Pollution, chemicals, and waste** (if operations warrant) | [STATUTORY] EPA spill duties | Pollution Liability |
| 9 | **Cyber, OT, and employee theft** (optional 8th/9th — pick 7–8 total) | [EXPOSURE] | Crime, Cyber |

**Implementation target:** 7 considerations (drop one of 8/9 based on word budget) or 8 if owner wants both cyber and pollution mentions.

---

## J. Manufacturing FAQ plan (5)

| # | Question | Answer direction (supported) |
|---|----------|------------------------------|
| 1 | What insurance does a manufacturer need? | No single policy — common stack: CGL/products, property, optional EB, BI with property, auto if applicable; specialty by exposure |
| 2 | Does property insurance cover machinery breakdown? | **Not always** — internal breakdown often excluded; EB endorsement often needed (current FAQ — expand slightly) |
| 3 | What happens if production stops due to a covered loss? | BI may help with income/continuing expenses — waiting periods, restoration limits (current FAQ — keep) |
| 4 | Is product recall included with product liability? | **No** — liability vs first-party recall expenses; separate trigger (link recall page) |
| 5 | What information is needed to quote a manufacturer? | Operations, products, revenue, building/contents values, equipment list, WIP/inventory, claims, contracts, suppliers |

---

## K. Commercial Hub architecture audit

### Correct job (confirmed)

The hub is **not a normal product page**. Its job:

1. **Orientation** — what commercial insurance is at a high level
2. **Route discovery** — industries + categories + specialty coverages
3. **Broker positioning** — independent, Windsor–Essex, multiple markets (`commercialBrokerCopy`)
4. **Entry point** — mega-menu anchor and homepage business path
5. **CTA** — quote / talk to broker

**Architecture evidence:**
```tsx
// PilotProductPage.tsx
{isCommercialHub ? <CommercialIndustryGrid /> : null}
{!isCommercialHub && hasCoverage ? <ProductCoverageExplorer ... /> : null}
```

**Explorer manifest** exists with empty zones — **legacy/asset placeholder**; page intentionally skips Explorer.

### Current sections (top → bottom)

| Section | Present | Assessment |
|---------|---------|------------|
| Hero | Yes | Keep — strengthen orientation copy |
| Trust band | Yes | Keep — approved broker positioning |
| Industry grid (12 tiles) | Yes | **Core hub value** — keep |
| Coverage Explorer | **No** | Correct for hub |
| Considerations | No | Optional 3–4 **hub-level** considerations (not product depth) |
| Broker steps | Yes | Keep |
| Related products | No | **Add** category/specialty link bands at implementation |
| FAQ | Yes | Keep — dedupe vs small business where needed |
| CTA | Yes | Retitle "protect" → "review" / "compare" |

### What hub should NOT contain

- Deep product-specific explanations (→ child routes)
- Legal/regulatory detail (→ frozen specialty pages)
- Duplicated FAQs from BI, property, or manufacturing pages
- False "all-in-one commercial policy" implication
- Generic SEO filler paragraphs to hit 1000 words

---

## L. Commercial Hub navigation / content plan

### KEEP
- Hero + Windsor–Essex industry anchor
- Trust band (`commercialBrokerCopy`)
- **Industries we cover** grid (12 tiles)
- Broker story (4 steps)
- FAQ block (orientation questions)
- Final CTA
- **No Explorer**

### ADD (implementation)
1. **Commercial coverage categories** — 6–8 orientation cards (not Explorer):
   - General Liability
   - Commercial Property
   - Commercial Auto / Fleet
   - Business Interruption (link)
   - Professional / E&O (link)
   - Cyber (link)
   - Crime / Fidelity (link)
   - Surety Bonds (link)
   Each: 1–2 sentences + link; **may help** language; not "every business needs all."

2. **Specialty & industry solutions** — compact link row mirroring mega-menu clusters (Transportation, Construction, Manufacturing & Industry, Hospitality, Professional, Specialty) — **navigation only**, no duplicate copy from child pages.

3. **Hub vs Small Business** — one short paragraph distinguishing `/commercial-insurance/` (discovery/orientation) from `/small-business-insurance/` (program assembly depth).

4. **Optional hub considerations (3–4)** — e.g. certificates/contracts, mixing personal and commercial auto, when to talk to a broker about specialty coverage.

### CONDENSE
- Meta description — fine; avoid listing every industry twice (hero + meta)

### REMOVE
- Nothing structural; avoid adding Explorer for consistency alone

### CROSS-LINK
- Primary: industry tiles (existing)
- Secondary: category cards → core product routes
- Tertiary: mega-menu parity for specialty routes

### Above the fold vs lower

| Above the fold | Lower on page |
|----------------|---------------|
| Hero + trust | Category orientation cards |
| Start of industry grid (visible scroll) | Full 12-tile grid |
| Primary CTA in hero | Broker steps |
| | Specialty cluster links |
| | FAQ |
| | Final CTA |

### Grade A strategy for hub

**Recommendation:** Hub may reach Grade A through **structural usefulness** (navigation density, category map, deduped FAQs, considerations) at **~500–700 substantive words** — **not** by matching 1000+ word product-page density. Audit grader may need hub-specific criteria (owner decision I).

---

## M. Cross-page differentiation matrix

### Manufacturing vs adjacent routes

| Route | PRIMARY CUSTOMER | PAGE JOB | CORE CONTENT | CROSS-LINK OUT | DO NOT DUPLICATE | SEO ROLE | EXPLORER ROLE |
|-------|------------------|----------|--------------|----------------|------------------|----------|---------------|
| **Manufacturing** | Windsor–Essex manufacturers, fab, machine shops | Industry program coordination | Property, PL, BI, EB, job-shop WIP | Property, BI, Recall, Pollution, Hub | Full property valuation treatise; recall scheduling; pollution law | Industry head term + local | 5 states — production floor narrative |
| **Commercial Property** | Any commercial occupant/owner | Property insuring interests depth | Building, contents, EB optional, landlord | BI, Small Business | Manufacturing-specific WIP/job-shop | Property head term | Building cutaway |
| **Equipment Breakdown** *(no standalone route)* | — | Endorsement concept on industry pages | — | — | — | — | EB state on mfg + property + restaurant |
| **Business Interruption** | Any business with income interruption risk | BI trigger/mechanics depth | Income, continuing exp, extra exp, CBI | Property | Full BI copy on manufacturing card | BI head term | Income timeline |
| **Product Recall** | Manufacturers, importers, distributors | Recall expense vs liability | Triggers, expense categories | Manufacturing | Recall depth on mfg page | Recall head term | Recall expense focus |
| **Pollution Liability** | Env-exposed ops | Pollution forms/triggers | CPL, site, transport, cleanup | Manufacturing | EPA treatise on mfg | Pollution head term | Site/industrial |
| **Crime/Fidelity** | Cash/inventory/payment ops | Crime insuring agreements | Employee dishonesty, computer fraud | Cyber | Full crime copy on mfg | Crime head term | Crime agreements |
| **Cyber** | Data/system-dependent ops | Cyber/privacy/ransomware | Network, BI, social engineering | Crime | OT depth | Cyber head term | Cyber events |

### Commercial Hub vs adjacent

| Route | PRIMARY CUSTOMER | PAGE JOB | CORE CONTENT | CROSS-LINK OUT | DO NOT DUPLICATE | SEO ROLE | EXPLORER ROLE |
|-------|------------------|----------|--------------|----------------|------------------|----------|---------------|
| **Commercial Hub** | Any Windsor–Essex business seeking orientation | Discovery + navigation | Hero, categories, industry tiles, broker, FAQ | All major routes | Product depth, Explorer, child FAQs | "Commercial insurance Windsor" broad | **None** |
| **Small Business** | SMB assembling first program | Package coordination | GL, property, auto, BI explorer | Property, BI, Cyber | Hub industry grid duplication | SMB head term | 4 category states |
| **Commercial Property** | Property owners/tenants | Property depth | Building, contents, EB | BI | Category card depth | Property term | Building |
| **Industry routes** | Sector-specific ops | Sector exposures | Sector explorer | Hub + specialty | — | Long-tail industry | Sector visual |

---

## N. Numeric / legal / coverage claim register

| ROUTE | CLAIM (current or proposed) | TYPE | SOURCE | SOURCE DATE | EXACT SUPPORT | SAFE | HEDGE | KEEP / OMIT / OWNER |
|-------|----------------------------|------|--------|-------------|---------------|------|-------|---------------------|
| Manufacturing | "Covers buildings, machinery, and stock" | Coverage | Current card | — | Property forms vary; causes of loss apply | No alone | May help cover… subject to… | **TIGHTEN** |
| Manufacturing | "Addresses sudden… breakdown" | Coverage | Current EB card | — | EB is optional endorsement on most programs | Partial | Where purchased | **TIGHTEN** |
| Manufacturing | "Helps protect against claims" (PL) | Coverage | Current card | — | CGL products ops | OK with hedge | Keep "may help" | **KEEP (minor tighten)** |
| Manufacturing | "Coverages that address… after a covered loss" | Coverage | coverageIntro | — | Implies bundle | Partial | "May address… where purchased" | **TIGHTEN** |
| Manufacturing | "Not always" (EB FAQ) | Coverage | Current FAQ | — | Industry standard | Yes | — | **KEEP** |
| Manufacturing | "Waiting periods and indemnity periods apply" (BI FAQ) | Coverage | Current FAQ | — | BI forms | Yes | — | **KEEP** |
| Manufacturing | "Inventory is often included" | Coverage | Current FAQ | — | Valuation varies | Yes | cost vs selling price | **KEEP** |
| Manufacturing | EPA spill reporting duty | Statutory | EPA; O. Reg. 675/98 | Current | Ontario.ca spill reporting | Yes | Applies regardless of insurance | **KEEP (consideration only)** |
| Manufacturing | WSIB for employees | Regulatory | WSIA | Current | If employees — separate from CGL | Qualified | Not insurance product | **OMIT unless consideration** |
| Hub | "We build coverage around… risks" | Marketing | Current hero | — | Broker positioning | OK | — | **KEEP** |
| Hub | "Ready to protect your business?" | Wording | CTA | — | Implies guarantee | Soft | "review" / "compare" | **TIGHTEN** |
| Hub | "General liability helps protect" (FAQ) | Coverage | commercialHubFaqs | — | CGL structure | Partial | "May help" | **TIGHTEN at implement** |
| Hub | "Business interruption can help… covered property loss" | Coverage | FAQ | — | Aligns frozen BI | Yes | — | **KEEP** |
| Proposed mfg | Products-completed ops separate aggregate | Coverage | IRMI; Sovereign mfg PDF | — | Standard CGL | Yes | Subject to policy | **ADD (hedged)** |
| Proposed mfg | CFIA / Health Canada recall context | Regulatory | Frozen recall page | 2026 freeze | Oversight ≠ insurance trigger | Yes | — | **Cross-link only** |

**No dollar amounts or percentages** currently on either route (safe baseline).

---

## O. Risky / unsupported language register (current copy)

| ROUTE | FIELD | EXACT WORDING | ISSUE | SEVERITY |
|-------|-------|---------------|-------|----------|
| Manufacturing | commercial-property card | "Covers buildings, machinery, and stock against covered property losses." | Categorical coverage | **MED** |
| Manufacturing | equipment-breakdown card | "Addresses sudden mechanical or electrical breakdown…" | Implies EB included | **MED** |
| Manufacturing | product-liability card | "Helps protect against claims…" | Mild — acceptable with V2 nuance | **LOW** |
| Manufacturing | coverageIntro | "Coverages that address products, facilities…" | Bundle implication | **LOW** |
| Manufacturing | ctaHeading | "Ready to cover your manufacturing operation?" | "Cover" without hedge | **LOW** |
| Hub | ctaHeading | "Ready to protect your business?" | "Protect" generic | **LOW** |
| Hub | commercialHubFaqs GL answer | "General liability helps protect your business…" | Categorical tone | **LOW** |
| Hub | heroLead | "We build coverage around the risks…" | Acceptable broker voice | **OK** |

**Not flagged:** FAQ "Not always" (EB); BI waiting period mention; inventory valuation hedge.

---

## P. Owner decisions

### A. MANUFACTURING POSITIONING

**Recommendation: YES** — Keep `/manufacturing-insurance/` as a **broad ordinary manufacturing** route (light fab, machining, metalworking, plastics, assembly, job shop/tool & die). Do **not** split by subtype in Batch E unless owner directs later. Mention food manufacturing only as a sub-segment with cross-link to grocery/food specialty when primary go-to-market is retail food — do not absorb pharma, firearms, or nuclear without explicit owner scope.

### B. MANUFACTURING EXPLORER

**Recommendation: KEEP all five technical IDs.** Retitle visitor copy only where noted. **FLAG** `commercial-property` and `equipment-breakdown` card copy for categorical language. **`machine-shop-tool-die`** is exposure segmentation, not a policy name — keep ID, clarify in LEFT copy. No state is fundamentally misleading once hedged.

### C. PRODUCT RECALL

**Recommendation: YES** — Manufacturing keeps recall as **supporting consideration + cross-link** (related link already present); do **not** duplicate frozen Product Recall page scheduling/trigger depth.

### D. EQUIPMENT BREAKDOWN

**Recommendation: YES** — Remain a **core Manufacturing Explorer concept** (`equipment-breakdown` ID). Critical differentiator vs property card. Align wording with frozen commercial property and restaurant EB patterns.

### E. POLLUTION

**Recommendation: YES** — Pollution remains **supporting consideration + cross-link** unless manufacturer has material environmental exposure (chemicals, tanks, waste, finishing). Do not add pollution Explorer state in Batch E unless owner requests.

### F. COMMERCIAL HUB ROLE

**Recommendation: CONFIRM** — Orientation/navigation hub, **not** a deep product page. Primary value = industry grid + category map + broker positioning + FAQ.

### G. COMMERCIAL HUB EXPLORER

**Recommendation: YES — remain without Explorer.** Current architecture intentionally skips Explorer (`isCommercialHub`). Empty manifest zones are legacy; **do not invent Explorer** for visual consistency. Owner decision required if marketing wants hub-campus interactive asset used.

### H. COMMERCIAL HUB DEPTH

**Recommendation: YES** — Target **substantive but concise orientation copy (~500–700 words)** plus structural sections — **not** 1000+ words solely to match product-page Grade A word counts.

### I. FINAL GRADE C OBJECTIVE

**Recommendation: YES** — Hub may achieve Grade A through **navigation usefulness, category cards, optional hub considerations, and FAQ refinement** rather than product-page density. **Manufacturing** should follow standard Batch B/D product pattern (~1000–1300 words, V2 pairs, 6–8 considerations). Confirm audit/scoring accepts hub-specific criteria.

---

## Q. Proposed implementation scope

### Manufacturing (`/manufacturing-insurance/`)

| Item | Target |
|------|--------|
| **Grade** | A (~1000–1300 substantive words) |
| **Pattern** | Batch B/D — V2 detail pairs on all 5 Explorer states, 7–8 expandable considerations, 5 hedged FAQs, dedicated trust band |
| **Primary file** | `src/data/commercial-industries.ts` |
| **Shared touch** | `src/lib/buildPilotProductConfig.ts` — add `manufacturing-insurance` to expandable considerations + trust band override |
| **Explorer** | Preserve IDs; add `detailTitle`/`detailDescription`; no manifest/image changes |
| **Cross-links** | Keep Hub, Commercial Property, Product Recall; consider BI in related links |

### Commercial Hub (`/commercial-insurance/`)

| Item | Target |
|------|--------|
| **Grade** | A via **structure** (~500–700 words + navigation sections) |
| **Pattern** | Hub-specific — category orientation cards, specialty cluster links, optional 3–4 considerations, FAQ tighten; **no Explorer** |
| **Primary file** | `src/data/pilot-commercial-inline.ts` |
| **Possible secondary** | `src/data/commercial-industries.ts` if hub category copy lives shared (owner choice at implement) |
| **Component** | May need lightweight hub section component OR inline config fields — **owner review before new component** |
| **Do NOT** | Add Explorer, duplicate small-business copy, modify `PilotProductPage` hub branch without approval |

---

## R. Expected files to change (implementation phase only)

| File | Manufacturing | Hub |
|------|:-------------:|:---:|
| `src/data/commercial-industries.ts` | ✓ | Maybe (hub FAQs/categories) |
| `src/data/pilot-commercial-inline.ts` | — | ✓ |
| `src/lib/buildPilotProductConfig.ts` | ✓ | Maybe (hub layout fields) |
| `scripts/verify-grade-c-batch-e.cjs` | ✓ (new QA) | ✓ |
| `docs/grade-c-batch-e-*-implementation-2026-09-09.md` | ✓ | ✓ |
| `src/data/coverage-explorer/**` | **NO** | **NO** |
| Frozen Batch A/B/C/D routes | **NO** | **NO** |

---

## S. Sources

### Statutory / regulatory
- **Environmental Protection Act**, R.S.O. 1990, c. E.19 — https://www.ontario.ca/laws/statute/90e19  
- **O. Reg. 675/98** (Spills and Discharges — reporting) — https://www.ontario.ca/laws/regulation/980675  
- Ontario spill reporting — https://www.ontario.ca/page/report-pollution-and-spills  
- **Canada Consumer Product Safety Act** (consumer product recalls — regulatory context)  
- CFIA food recall framework (regulatory — insurance trigger per frozen recall page)

### Policy structure / industry
- IBC / commercial insurance industry context (general)  
- IRMI — CGL aggregate limits / products-completed operations — https://www.irmi.com/articles/expert-commentary/how-the-limits-apply-in-the-cgl-policy  
- Northbridge Insurance — property vs equipment breakdown — https://www.northbridgeinsurance.ca/blog/commercial-property-vs-equipment-breakdown-insurance/  
- Federated Insurance — equipment breakdown (Canada) — https://www.federated.ca/blog/insurance/equipment-breakdown-insurance-and-why-do-i-need-it/  
- Acera Insurance — EB vs property (Canada) — https://acera.ca/business/equipment-breakdown-insurance/  
- Sovereign Insurance — manufacturing extensions PDF (CGL aggregates, limited recall extension) — https://files.sovereigninsurance.ca/industries-solutions/manufacturing/Extensions%20and%20Endorsements%20Manufacturing.pdf  
- Aviva Canada — manufacturing & wholesaling product features — https://www.aviva.ca/en/business/find-insurance/by-industry/manufacturing-and-wholesaling-insurance/  
- Markel Canada — CGL enhancements (recall expense reimbursement noted as endorsement) — https://www.markel.ca/products/property-and-casualty/commercial-general-liability  
- Chubb Canada — Premises Pollution Liability product overview (industrial/manufacturing segment) — https://www.chubb.com/ca-en/business-insurance.html  

### Legal commentary
- *SIR Corp. v. Aviva Insurance Company of Canada*, 2023 ONCA 778 — BI physical damage trigger (referenced on frozen BI page)

### Internal benchmarks (frozen / A-grade routes)
- `/commercial-property-insurance/` — property + optional EB  
- `/business-interruption-insurance/` — BI trigger, CBI, waiting periods  
- `/product-recall-insurance/` — recall vs PL  
- `/pollution-liability-insurance/` — CGL pollution exclusion nuance  
- `/crime-fidelity-insurance/` — employee dishonesty vs property  
- `/cyber-insurance/` — GL vs cyber split  
- `/small-business-insurance/` — coordination page pattern  
- `/contractors-insurance/` — industry A-grade tone  

---

**STOP FOR OWNER REVIEW** — Phase 2 implementation requires owner approval of decisions P.A–P.I and hub Grade A scoring criteria.
