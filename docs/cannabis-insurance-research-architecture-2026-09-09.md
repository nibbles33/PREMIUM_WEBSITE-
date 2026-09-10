# Cannabis Insurance — Ontario Research + Site Architecture

**Phase:** 1 — Research & architecture only  
**Date researched:** 2026-09-10  
**Filename date (per brief):** 2026-09-09  
**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Worktree:** `/tmp/PREMIUM_WEBSITE-d3-transportation`  
**Frozen content base:** `caf33c0` (A42 / B16 / C0 / D0 · 58 routes)  
**Docs closeout reference:** `4eb4460` / Batch E freeze chain  

**Status:** RESEARCH ONLY — no route, navigation, copy, image, Explorer, or production-source changes.

---

## A. Worktree safety

| Check | Result |
|-------|--------|
| **BRANCH** | `cursor/coverage-explorer-ux-v2-2026-09-07` |
| **WORKTREE** | `/tmp/PREMIUM_WEBSITE-d3-transportation` |
| **BASELINE ANCESTOR** | `caf33c0` present |
| **PRODUCTION SOURCE CHANGED** | **NO** (this phase) |
| **ROUTES ADDED** | **NO** |
| **NAVIGATION CHANGED** | **NO** |
| **EXPLORER CHANGED** | **NO** |
| **IMAGES CHANGED** | **NO** |
| **SCANNER CHANGED** | **NO** |
| **FROZEN ROUTES CHANGED** | **NO** |
| **COMMERCIAL HUB CHANGED** | **NO** |
| **THIS DELIVERABLE** | `docs/cannabis-insurance-research-architecture-2026-09-09.md` only |

---

## B. Executive recommendation

### Primary question answer

**Recommended architecture: OPTION B — separate product routes**

1. **`/cannabis-retail-insurance/`** — AGCO-authorized Ontario cannabis retail stores  
2. **`/cannabis-producer-insurance/`** — Health Canada–licensed cultivation, nursery, processing (including micro classes)

**Not recommended as the launch model:** OPTION A — one broad `/cannabis-insurance/` product page that tries to teach retail + cultivation + processing in a single Explorer.

**Optional later (OPTION C lite):** a thin orientation hub `/cannabis-insurance/` that only routes visitors to the two product pages — **after** both product pages exist. Do **not** launch a hub-first shell that implies a single insurance product.

### Why (one paragraph)

Ontario cannabis retail and federal licensed production sit under **different regulators**, **different licence stacks**, **different distribution rules**, and **materially different property/stock treatments** (finished packaged inventory vs living plants / crops / WIP / finished goods). The Canadian specialty market also underwrites retail storefronts and licensed producers with different appetite packages. A single Explorer would either bury crop/equipment-breakdown depth (hurting producers) or overwhelm retailers with cultivation content they do not need — and would collide with Premium’s existing Retail, Manufacturing, Greenhouse, Product Recall, Crime, and Pollution routes.

### Launch sequencing (owner choice)

| Sequence | Recommendation |
|----------|----------------|
| **If only one page can ship first** | Ship **`/cannabis-retail-insurance/`** first (higher Windsor–Essex storefront density; clearer OCS contractual insurance hook; closer to frozen Retail taxonomy). |
| **Producer page** | Ship second; do not fold into Retail. |
| **Hub** | Optional third; navigation only. |

---

## C. Cannabis business segmentation

| Segment | Regulator / gate | In Premium Cannabis scope? | Notes |
|---------|------------------|----------------------------|-------|
| **A. Ontario cannabis retail stores** | AGCO ROL + RSA (+ CRM licence where required); product via OCS | **YES — primary** | Storefront / e-comm pickup / delivery-from-store exposures |
| **B. Federally licensed cultivators** | Health Canada cultivation (standard / micro / nursery) | **YES — producer page** | Living plants, HVAC, security, crop valuation |
| **C. Processors / manufacturers** | Health Canada processing (standard / micro) | **YES — producer page** | Extraction, packaging, GPP, product liability / recall |
| **D. Micro-cultivation / micro-processing** | Health Canada micro classes | **YES — within producer page** | Same family as standard LP; lighter security threshold for some micro/nursery classes — still not “retail” |
| **E. Nursery** | Health Canada nursery | **YES — within producer page** (supporting) | Starting material; crop-like stock |
| **F. Ancillary (labs, consultants, landlords, accessories-only, clinics)** | Mixed | **NO as core Cannabis Explorer states** | Mention only as “related / ask a broker”; do not bloat core pages |
| **Industrial hemp (non-cannabis licence path)** | Separate federal hemp framework | **OUT OF SCOPE** unless owner expands later | Do not equate hemp with cannabis retail/LP |
| **Illegal / grey-market** | N/A | **OUT** | No coverage promises; compliance is underwriting gate |

**Do not imply** that all cannabis businesses share one licence or one insurance program.

---

## D. Ontario retail regulation

### Licensing stack [LICENSING] [REGULATORY]

| Instrument | Role |
|------------|------|
| **Retail Operator Licence (ROL)** | Person/entity licensed to operate cannabis retail |
| **Retail Store Authorization (RSA)** | Store-specific authorization (one store per authorization) |
| **Cannabis Retail Manager Licence (CRM / CRML)** | Required for individuals performing defined manager functions (unless sole prop / certain partnership exemptions) |

Sources: AGCO “Steps to become a cannabis retailer”; AGCO Cannabis Retail Regulation Guide (updated 2025-12-12); *Cannabis Licence Act, 2018*; O. Reg. 468/18.

### Operational / premises themes relevant to exposure [REGULATORY] [EXPOSURE]

From **Registrar’s Standards for Cannabis Retail Stores** (physical store requirements; last noted update May 23, 2025 on AGCO physical-requirements page):

- High-resolution surveillance with 24-hour coverage of interior + immediate exterior (entrances/ID check, pickup, POS, receiving, sales floor, storage); recordings retained **≥ 30 days**
- Cannabis stored securely; staff-only access from receipt to sale / destruction / return to OCRC or Licensed Producer
- Segregation of recalled / damaged / ineligible stock
- Secure access points
- Sensory display containers locked / tamper-proof; inventory accounted via POS
- Age **19+** controls; advertising / inducement restrictions (Standards 5–6)

### Distribution structure [STATUTORY]

Under *Cannabis Licence Act, 2018* **s. 19**, an RSA holder may purchase cannabis for sale **only from the Ontario Cannabis Retail Corporation (OCS)**, subject to regulations. OCS is the exclusive wholesaler to authorized private retailers.  
[Source: CLA s. 19; AGCO “Ontario’s Cannabis Retail Regulation Landscape”; OCS “Doing Business With OCS”.]

**Implication for Premium copy (later):** do **not** imply retailers freely source / truck cannabis from any LP warehouse like ordinary wholesale retail. Transit exposures for retailers are typically OCS delivery + limited store-level movement / customer delivery rules — not open cargo programs.

### Municipal / proximity [REGULATORY]

- Municipal opt-in / prohibition maps matter for location risk and business viability  
- School proximity rules apply to RSA locations (AGCO journey map: >150 m framing in applicant guidance; verify current measurement rules at implementation)

---

## E. Federal cultivation / processing regulation

### Licence classes [LICENSING] [STATUTORY] [REGULATORY]

Under the *Cannabis Act* and *Cannabis Regulations* (SOR/2018-144), commercial activity is licence-based. Plain-language Health Canada licensing pages describe:

| Class | Authorized activity (high level) | Scale notes (verify current thresholds at implementation) |
|-------|----------------------------------|-----------------------------------------------------------|
| **Micro-cultivation** | Grow plants / produce fresh & dried cannabis, seeds, pollen | Grow surface area cap (Health Canada pages cite **up to 800 m²** after 2025 streamlining updates) |
| **Nursery** | Starting material (plants, seeds, pollen) | Smaller flowering canopy + harvested flowering-head limits |
| **Standard cultivation** | Same cultivation family, no micro area cap | Full-scale indoor/outdoor possible |
| **Micro-processing** | Process cannabis (not cultivate) | Annual possession cap (Health Canada cites **2,400 kg dried equivalent**/year in micro guidance) |
| **Standard processing** | Process without micro possession cap | Manufacturing-like |
| **Sale for medical purposes** | Medical sales channel | Include only if owner expands medical-dispensing scope; not core recreational retail |
| **Analytical testing / research** | Lab / research | Ancillary — not core commercial page |

Sources: Health Canada “Types of cannabis and industrial hemp licences”; “Applying for micro-cultivation, nursery and micro-processing”; fee pages current to 2026–2027.

### Physical security (producer) [REGULATORY] [EXPOSURE]

Part 4 *Cannabis Regulations* + Health Canada physical-security guides:

- Site perimeter barriers; restricted access  
- For **standard** cultivation/processing (and medical sale with possession): visual monitoring + intrusion detection on operations/storage with continuous monitoring expectations  
- **Micro-cultivation / nursery / micro-processing:** lighter matrix (perimeter designed to prevent unauthorized access; storage physical barriers; visual/intrusion **not** required to the same standard-class extent per Health Canada comparison tables)

**Do not** convert these into “insurance automatically covers security system failure.”

### Good production / recall system [REGULATORY]

- GPP / sanitation / quality systems for processing  
- **Recall control system** required (*Cannabis Regulations* s. 46) + annual recall simulation  
- Minister may order recall (*Cannabis Act* s. 76); voluntary recall reporting under s. 247  

---

## F. Insurance requirement findings

### Critical finding

| Question | Finding | Classification |
|----------|---------|----------------|
| Does **AGCO** / *Cannabis Licence Act* / O. Reg. 468/18 impose a **statutory minimum insurance policy** (CGL limit, property, crime, etc.)? | **No explicit statutory insurance mandate located** in CLA / O. Reg. 468/18 text searches for “insurance.” Registrar’s Standards address security/surveillance/storage — **not** policy limits. | [STATUTORY] / [REGULATORY] — **absence** |
| Does AGCO tell applicants to get insurance? | Yes — journey map says consider time to acquire insurance and **directs applicants to OCS** for insurance/banking information. That is **guidance / process**, not a cited statutory minimum. | [LICENSING] guidance |
| Is there a **hard insurance requirement** retailers actually face? | **Yes — contractual / wholesale onboarding** with **OCS**: maintain **Commercial General Liability not less than $5,000,000 per occurrence**, including non-owned auto, products & completed operations, employer’s liability, personal & advertising liability, severability/cross liability; **name Ontario Cannabis Retail Corporation d/b/a Ontario Cannabis Store as additional insured / certificate holder**; submit on OCS COI form before ordering. | [COMMON POLICY STRUCTURE via contract] **not** universal law |
| Does that OCS $5M rule apply to Health Canada LPs? | **No** — it is a **retailer–OCS agreement** requirement. LPs face lender/landlord/customer contract insurance schedules and underwriting norms, not this OCS retailer clause. | [INSURER-SPECIFIC] / contractual counterparties |

### Implementation guidance for future copy

- Safe: “Authorized Ontario cannabis retailers that buy through OCS are typically required under their OCS retailer agreement to carry at least $5 million CGL and name OCS as an additional insured — confirm current agreement wording.”  
- Unsafe: “Ontario law requires every cannabis business to carry $5 million liability.”  
- Unsafe: “AGCO will not license you without a $5M policy” (not established as statutory; AGCO points to OCS).

---

## G. Property / stock

### Retail [EXPOSURE] [COMMON POLICY STRUCTURE]

| Asset | Treatment caution |
|-------|-------------------|
| Building / TI / fixtures / POS / safes / surveillance | Generally insurable as commercial property / BPP — subject to cannabis appetite |
| Finished cannabis inventory (packaged SKUs from OCS) | High value + theft attractive; often needs **explicit cannabis-stock appetite**; valuation and sublimits common |
| Accessories / non-cannabis merchandise | Closer to ordinary retail stock |
| Cash | Crime / money & securities — not automatic on property |

### Producer [EXPOSURE] [INSURER-SPECIFIC]

Specialty cannabis markets (e.g., Canadian MGA materials such as SUM Cannabis brochure May 2025; broker LP pages) commonly **distinguish**:

- Living plant material / crops  
- Harvested / drying / WIP  
- Finished stock  
- Buildings, grow equipment, HVAC, lighting, irrigation  

**Do not state** a universal valuation basis (selling price vs replacement vs agreed value vs crop stage schedules).  
**Do not imply** ordinary commercial property automatically covers living plants or cannabis stock.

Greenhouse route (`/greenhouse-agribusiness-insurance/`) already discusses plants/crops for **agribusiness greenhouses** — cannabis LP crop is **regulated-commodity specialty**, not a drop-in duplicate.

---

## H. Equipment Breakdown

| Segment | Relevance | Caution |
|---------|-----------|---------|
| Retail | Moderate (HVAC, refrigeration for some SKUs, electrical, security power) | Not usually the hero exposure |
| Cultivation / processing | **High** — lighting, HVAC/environmental controls, irrigation, boilers, production/extraction equipment | EB ≠ property; consequential crop/spoilage often needs **explicit EB consequential / spoilage** discussion |

SUM and other specialty materials advertise boiler & machinery with consequential loss & spoilage as available extensions — **[INSURER-SPECIFIC]**, not automatic.

Align future copy with Premium Manufacturing / Greenhouse EB hedges: “where purchased,” “sudden and accidental breakdown,” not wear/tear.

---

## I. Business Interruption

### Align with frozen Premium BI principles

BI generally follows **insured physical loss** to insured property (policy-dependent).  

| Scenario | Typical insurance posture (hedged) |
|----------|-------------------------------------|
| Fire / theft damage to store or grow site | May support BI if covered cause of loss + BI purchased |
| Equipment breakdown | Only if EB + consequential BI/spoilage endorsed |
| Supplier interruption | Contingent BI — special; retail OCS dependency is operational but not automatically insured |
| Licence suspension / AGCO or Health Canada regulatory shutdown | **Generally not** a standard BI trigger — do not imply insured |
| Contamination / recall without covered property damage | Often **not** standard BI; may touch recall expense products instead |
| Power interruption | Highly conditional (off-premises power endorsements, etc.) |

---

## J. General Liability

| Segment | Core GL themes |
|---------|----------------|
| Retail | Premises/operations; customer injury; landlord additional insured; products & completed operations (OCS contract explicitly calls out products/completed ops within CGL structure) |
| Producer | Premises/ops; visitor/contractor injury; contractual AI requirements; completed operations |

**Do not** claim all allegations are covered (cannabis exclusions, intentional acts, professional services, employment-related, pollution — policy dependent).

---

## K. Product Liability

**High priority — especially producers; still relevant to retailers (products/completed ops).**

| Issue | Guidance |
|-------|----------|
| Bodily injury from product, contamination, labelling, potency, packaging, manufacturing defect, edibles/extracts | Common specialty underwriting focus for LPs/processors |
| Retailers | Sell sealed OCS-supplied products; still face products liability allegations; OCS CGL schedule contemplates products/completed ops |
| Market structure | Often included in cannabis package CGL or via specialty products liability — **[INSURER-SPECIFIC]**; some markets restrict edibles/vapes/extracts |

**Do not universalize** “always included” or “always excluded.”

---

## L. Product Recall

### Regulatory recall ≠ insurance recall

| Layer | Fact |
|-------|------|
| **Regulatory** | Licence holders must maintain recall control systems (*Cannabis Regulations* s. 46); simulations annually; voluntary recall reporting (s. 247); Ministerial recall orders (*Cannabis Act* s. 76) |
| **Insurance** | Product liability responds to **third-party injury/damage claims** (if covered). **Recall/withdrawal expense** (notice, shipping, disposal, replacement) is typically a **separate product / endorsement** |

Cross-link Premium frozen **`/product-recall-insurance/`**.  
For retailers: stock quarantine / return-to-OCS / destruction procedures are operational; insurance response still policy-specific.

---

## M. Crime / Theft

| Exposure | Coverage family |
|----------|-----------------|
| Burglary / robbery of inventory | Often property + inland marine / stock theft conditions; cannabis markets may impose safes, alarms, limits |
| Employee dishonesty / inventory shrinkage | **Crime / fidelity** — distinct from property theft |
| Social engineering / funds transfer | Crime/cyber boundary — not automatic |
| Cash | Money & securities |

Cross-link **`/crime-fidelity-insurance/`**. Retail cannabis is a **high-target** theft class due to cash + portable inventory + AGCO-visible security expectations.

---

## N. Cyber / Privacy

| Exposure | Notes |
|----------|-------|
| POS / payment / OCS data reporting integrations | Retail-critical |
| Customer age-gate / delivery PII | Privacy liability / breach response |
| Ransomware / BEC | Standard cyber themes |
| Producer ERP / environmental control networks | Operational tech risk |

**Do not** imply property/CGL covers cyber. Cross-link **`/cyber-insurance/`**. No cannabis-unique statutory cyber insurance mandate found.

---

## O. Cargo / Transit / Delivery

| Actor | Reality |
|-------|---------|
| Retailer inbound | Predominantly **OCS wholesale delivery** into store — not open-market LP pickup as default model |
| Retailer outbound | In-person store / adjacent area or **delivery** allowed under CLA distribution rules — commercial auto / courier / cargo questions arise |
| Producer | Licensed movement between sites / to OCS / to other licence holders — specialty cargo / stock throughput sometimes offered in cannabis packages **[INSURER-SPECIFIC]** |

**Core vs supporting:**  
- Retail page: **supporting consideration** (HNOA / delivery / OCS receiving) — not a hero Explorer state  
- Producer page: **supporting / optional Explorer** only if depth warrants; else cross-link Cargo  

Unsafe claims to avoid: CGL covers cargo; personal auto is fine for commercial cannabis delivery; retailers can freely transport wholesale cannabis outside OCS structure.

---

## P. Pollution / Environmental

| Segment | Materiality |
|---------|-------------|
| Retail | Usually low — supporting mention only |
| Cultivation | Fertilizers, pesticides, wastewater, mould — **supporting / cross-link** Pollution |
| Processing / extraction | Solvents, waste, spills — **higher**; Pollution Liability may be Explorer-adjacent or strong cross-link |

Cross-link **`/pollution-liability-insurance/`**. Do not say “CGL never covers pollution” (absolute); say pollution is often restricted and may need separate review.

---

## Q. Crop / Cultivation

**Decisive architecture factor.**

Living plants, stage-of-growth valuation, mould/pest contamination, HVAC/lighting failure, and consequential crop loss are **not** ordinary retail stock problems. They are closer to (but not identical to) greenhouse agribusiness — with **Cannabis Act** overlays and specialty insurer crop/stock definitions.

**Conclusion:** Crop/living plants belong on the **producer** page as a **core Explorer state**. Putting them on a combined retail+producer page creates visitor confusion and weak hedges.

---

## R. Existing Premium route overlap

| Cannabis concept | Own on Cannabis page(s) | Summarize + cross-link | Child route owns depth | Avoid duplication |
|------------------|-------------------------|------------------------|------------------------|-------------------|
| Storefront premises ops | Retail cannabis page | `/retail-insurance/` | Retail page for non-cannabis stores | Don’t rewrite all Retail |
| Finished inventory theft | Retail cannabis (cannabis-specific) | Crime + Retail | `/crime-fidelity-insurance/` for fidelity depth | |
| Living plants / crops | Producer page | `/greenhouse-agribusiness-insurance/` | Greenhouse for produce/flowers ag | Don’t call LP a “greenhouse florist” |
| Processing / extraction | Producer page | `/manufacturing-insurance/` | Manufacturing for ordinary plants | |
| Equipment breakdown | Producer core; retail light | Manufacturing / Greenhouse / Property | No standalone EB route today — keep with page | |
| BI principles | Both (segment examples) | `/business-interruption-insurance/` | BI page | No regulatory-shutdown promises |
| Product liability | Both (weight on producer) | Manufacturing | | |
| Product recall expense | Cross-link heavy | `/product-recall-insurance/` | Recall page | Don’t duplicate recall Explorer |
| Pollution | Producer supporting | `/pollution-liability-insurance/` | Pollution page | |
| Cyber | Supporting both | `/cyber-insurance/` | Cyber page | |
| Commercial auto / cargo | Supporting | `/commercial-auto-insurance/`, `/cargo-freight-insurance/` | those pages | |
| OCS $5M CGL contract | Retail cannabis **unique** | — | — | Don’t put on generic Retail |
| D&O / EPL / WSIB | Related links only | existing specialty routes | | Don’t bloat Explorer |

---

## S. One-page vs multiple-page analysis

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| **A. One `/cannabis-insurance/`** | Fewer URLs; simple mega-menu entry | Mixes AGCO retail with HC production; crop vs packaged stock conflict; Explorer overload; SEO intent collision | **Reject as primary product page** |
| **B. `/cannabis-retail-insurance/` + `/cannabis-producer-insurance/`** | Matches regulation + underwriting + user jobs-to-be-done; clean Explorers; fits Premium taxonomy (Retail vs Manufacturing/Greenhouse split) | Two pages to maintain; need clear cross-links | **Recommend** |
| **C. Hub + children** | Best long-term IA if both segments grow | Hub-only launch risks empty orientation page; extra nav weight before content exists | **Optional Phase 3** after both product pages |

**What we lose with Option A:** precision on crop/EB/recall for producers; clarity for retailers facing OCS contract insurance; credibility vs AGCO/HC distinction.  
**What we lose with Option B:** single keyword URL capturing “cannabis insurance” — mitigate with retail page meta + producer page meta + optional later hub.

---

## T. Proposed Explorer architecture

### T1. `/cannabis-retail-insurance/` (5 states)

| # | Technical ID (proposed) | Visitor title | Represents | Why core | Factual caution | Cross-link |
|---|-------------------------|---------------|------------|----------|-----------------|------------|
| 1 | `premises-operations-liability` | Premises & customer liability | CGL premises/ops | Foot traffic + landlord AI | Not every claim; policy exclusions | `/retail-insurance/` |
| 2 | `property-cannabis-stock` | Store property & cannabis inventory | Building/TI/fixtures + packaged stock | High-value targeted stock | Stock valuation/sublimits; not automatic on ordinary forms | `/commercial-property-insurance/` |
| 3 | `products-completed-ops` | Products liability (retail) | Injury allegations tied to sold products | OCS CGL schedule contemplates products/completed ops | Not a guarantee OCS/LP liability transfers | Manufacturing / Retail products notes |
| 4 | `crime-theft` | Theft, robbery & crime | Property theft vs employee dishonesty | Security-heavy retail | Crime ≠ property; fidelity separate | `/crime-fidelity-insurance/` |
| 5 | `business-interruption` | Business interruption | Income after covered property loss | Lease/payroll continue | No licence-suspension BI | `/business-interruption-insurance/` |

**Not core retail Explorer:** crop/living plants; pollution; full recall expense (cross-link); cyber (supporting).

### T2. `/cannabis-producer-insurance/` (6 states max)

| # | Technical ID (proposed) | Visitor title | Represents | Why core | Factual caution | Cross-link |
|---|-------------------------|---------------|------------|----------|-----------------|------------|
| 1 | `property-grow-infrastructure` | Buildings & grow infrastructure | Structures, rooms, TI | Capex-heavy sites | Cannabis appetite required | `/commercial-property-insurance/`, Greenhouse |
| 2 | `crop-living-plants-stock` | Plants, crops & cannabis stock | Living plants → harvested → finished | Defines producer vs retail | Insurer definitions/stage limits vary | Greenhouse (plants) — differentiate |
| 3 | `equipment-breakdown` | Equipment breakdown | HVAC, lighting, irrigation, production equip | Consequential crop/spoilage risk | EB not automatic; consequential often endorsed | Manufacturing EB |
| 4 | `products-liability` | Products liability | Contaminated/mislabelled product injury | Core LP/processor exposure | Extracts/edibles appetite varies | Manufacturing |
| 5 | `product-recall-expense` | Product recall expense | Withdrawal/notification/disposal costs | Regulatory recall duties exist | **Recall insurance ≠ CGL**; regulatory duty ≠ coverage | `/product-recall-insurance/` |
| 6 | `business-interruption` | Business interruption | Income after covered physical loss | Long recovery times | Regulatory shutdown not standard BI | `/business-interruption-insurance/` |

**Supporting on producer page (copy, not Explorer):** pollution, crime, cyber, cargo, D&O.

**IDs are proposals only — do not implement yet.**

---

## U. Visual direction

| Page | Recommendation | Rationale |
|------|-----------------|-----------|
| **Retail** | **A. Premium licensed cannabis retail store** isometric cutaway | Matches AGCO storefront job; security, POS, secure storage, discreet exterior |
| **Producer** | **B. Cultivation / processing facility** cutaway | HVAC, grow rooms, secure storage — not a store |
| **Rejected** | Giant leaf branding, neon “stoner” tropes, gaming aesthetic, cartoon buds | Conflicts with Premium visual system |
| **Split single visual (if forced into one page)** | Worse — avoid by choosing Option B | |

Materials: restrained architectural finishes, realistic security hardware, no cannabis-leaf logo motif.

**DO NOT generate images in this phase.**

---

## V. Navigation placement (recommendation only — no edits)

| Surface | Placement |
|---------|-----------|
| Homepage “Whatever kind of business you run” | Add **Cannabis Retail** (and later Producer) tiles when pages exist |
| Commercial Hub industry grid | Add cannabis retail (+ producer) tiles in a future hub update — **not now** |
| Mega-menu Business | Under Hospitality & Retail cluster: Cannabis Retail; under Manufacturing & Industry / Specialty: Cannabis Producer |
| Mobile nav | Mirror mega-menu labels |
| Related products | Retail ↔ Cannabis Retail; Manufacturing/Greenhouse/Recall/Pollution ↔ Cannabis Producer |
| Specialty Risks | Optional secondary discovery for Producer (recall/pollution adjacency) |

A product may appear in multiple discovery categories.

---

## W. SEO / terminology

| Item | Recommendation |
|------|----------------|
| **PRIMARY ROUTE TERMS** | Retail: **Cannabis Retail Insurance**; Producer: **Cannabis Producer Insurance** (H1-friendly) |
| **PRIMARY SLUGS** | `/cannabis-retail-insurance/`, `/cannabis-producer-insurance/` |
| **SECONDARY TERMS** | Cannabis business insurance; licensed producer insurance; cannabis cultivation insurance; AGCO cannabis store insurance (retail only, carefully) |
| **AVOID as sole H1** | “Marijuana insurance” (dated/US tone); “dispensary” as legal Ontario term (stores are authorized cannabis retail stores) |
| **META TITLE DIRECTION** | `Cannabis Retail Insurance in Windsor-Essex \| Premium…` / `Cannabis Producer Insurance…` |
| **H1 DIRECTION** | Match primary route term; geographic hedge in lead, not keyword stuffing |

Optional future hub slug `/cannabis-insurance/` can target head term once children exist.

---

## X. Factual-risk register

| # | CLAIM | TYPE | SOURCE | SOURCE DATE | EXACT SUPPORT | JURISDICTION | SAFE? | HEDGE | IMPLEMENTATION GUIDANCE |
|---|-------|------|--------|-------------|---------------|--------------|-------|-------|-------------------------|
| 1 | Ontario statute requires $5M CGL for cannabis stores | Statutory insurance | CLA / O. Reg. 468/18 search | 2026-09-10 | No insurance minimum located | Ontario | **NO** | N/A | Do not state |
| 2 | OCS retailer agreement requires ≥$5M CGL + OCS as AI | Contractual | OCS Retailer Handbook (Feb 2026 PDF); OCS COI form | 2026-02 handbook; COI forms 2024– | Handbook § insurance; COI minimum $5M | Ontario retail via OCS | **YES with hedge** | “under OCS retailer agreement / confirm current terms” | Retail page only |
| 3 | AGCO Registrar’s Standards require insurance limits | Regulatory | Registrar’s Standards physical/ads pages | 2025-05-23 physical | Standards require surveillance/storage — not policy limits | Ontario | **NO** as insurance mandate | — | Separate security vs insurance |
| 4 | Retailers must buy cannabis only from OCS | Statutory | CLA s. 19 | current consolidation | Purchase only from OCRC subject to regs | Ontario | **YES** | “subject to regulations” | Explain distribution; limit cargo myths |
| 5 | RSA holders may distribute in-store/adjacent or by delivery | Statutory | CLA s. 20 | current | Distribution limits | Ontario | **YES** | Cite delivery rules carefully | Auto/cargo supporting |
| 6 | Federal licence classes include cultivation/processing micro/standard/nursery | Licensing | Health Canada licensing pages | retrieved 2026-09-10 | Licence class descriptions | Federal | **YES** | Thresholds can change — verify at ship | Producer segmentation |
| 7 | Micro vs standard security matrices differ | Regulatory | HC physical security comparison tables | retrieved 2026-09-10 | Micro/nursery lighter visual/intrusion matrix | Federal | **YES** | Don’t overstate micro as “unsecured” | Underwriting context |
| 8 | Licence holders must maintain recall control systems + annual simulation | Regulatory | Cannabis Regulations s. 46 | current | s. 46(1)–(2) | Federal | **YES** | Duty ≠ insurance | Link recall insurance separately |
| 9 | Minister may order cannabis recall | Statutory | Cannabis Act s. 76 | current to 2026-06-17 note on laws page | s. 76 | Federal | **YES** | — | Distinguish ordered vs voluntary |
| 10 | Ordinary property always covers living plants | Common policy | Specialty market materials | 2025–2026 | Specialty forms define living plants/crops separately | Insurer-specific | **NO** | Always hedge | Producer Explorer |
| 11 | EB automatically included on property | Common policy | General Canadian commercial practice + specialty brochures | — | EB typically separate | Insurer-specific | **NO** | “where purchased” | Match Manufacturing hedges |
| 12 | Licence suspension triggers BI | Underwriting myth | BI principles / Premium BI freeze | — | Standard BI needs covered property loss | General | **NO** | Explicit negative | Both pages |
| 13 | CGL automatically pays recall expenses | Common policy | Recall vs liability distinction; Premium Product Recall page | — | Expense coverage separate | General | **NO** | Cross-link recall | Producer page |
| 14 | Surveillance retention ≥30 days | Regulatory | AGCO Registrar Standard 2.1 | updated 2025-05-23 page | 30-day retention | Ontario retail | **YES** | — | Security/crime context |
| 15 | Age of purchase 19 | Regulatory / statutory | Registrar Standards 5.x; CRA context | 2024–2025 pages | 19+ | Ontario | **YES** | — | Ops liability context only |
| 16 | SUM offers cannabis stock contamination/spoilage/EB consequential | Insurer-specific | SUM Cannabis brochure 5_2025.pdf | May 2025 | Marketing brochure capabilities | Insurer/MGA | **YES as example only** | Never universalize | Research footnote only |
| 17 | Cannabis retail = ordinary Retail page | Taxonomy | Premium `/retail-insurance/` who-it-is-for | frozen | Ordinary storefronts; no cannabis | Site | **NO** | Need dedicated retail cannabis | Architecture |
| 18 | Cannabis grow = Greenhouse page | Taxonomy | Premium greenhouse page (no cannabis) | frozen | Agri greenhouse framing | Site | **NO as substitute** | Overlap + differentiate | Producer page |

---

## Y. Owner decisions A–O

| ID | Decision | Recommendation |
|----|----------|----------------|
| **A** | One page or multiple routes? | **Multiple — Option B** (retail + producer). Optional thin hub later. |
| **B** | Retail included? | **YES** |
| **C** | Cultivation / licensed producers included? | **YES — separate producer page** |
| **D** | Processors included? | **YES — on producer page** (not retail) |
| **E** | Micro-cultivation / micro-processing included? | **YES — within producer page** |
| **F** | Crop / living plants core or supporting? | **CORE on producer**; **absent on retail** |
| **G** | Product liability core Explorer? | **YES** on both (heavier on producer) |
| **H** | Product recall core or cross-link? | **CORE state on producer** + deep cross-link to Product Recall page; **cross-link only on retail** |
| **I** | Equipment breakdown core? | **CORE on producer**; supporting on retail |
| **J** | Crime / theft core? | **CORE on retail**; supporting on producer |
| **K** | Pollution core or supporting? | **Supporting / cross-link** (stronger on producer) |
| **L** | Visual direction? | **Retail store cutaway** + **separate cultivation/processing cutaway** |
| **M** | Navigation categories? | Retail cluster + Manufacturing/Specialty cluster; Commercial Hub tiles later |
| **N** | Route name / slug? | `/cannabis-retail-insurance/`, `/cannabis-producer-insurance/` |
| **O** | Add before final site-wide pre-launch audit? | **YES to schedule Phase 2 after owner approves architecture** — but **not** before this research is accepted. Do **not** silently insert into frozen 58-route baseline without a new-product authorization. |

---

## Z. Proposed Phase 2 scope (after owner approval)

1. Owner confirms decisions A–O (especially A, N, O).  
2. Implementation research → draft copy (hedged) for **retail page first** (unless owner prioritizes producer).  
3. Create route(s) + Explorer IDs + photography brief — **still no silent nav** until nav reconciliation pass.  
4. Cross-links only; no edits to frozen Retail/Manufacturing/Greenhouse/Recall bodies beyond adding related-link entries if authorized.  
5. Commercial Hub tile addition as a **separate authorized nav task**.  
6. Content audit expectation: new routes start outside the frozen 58; re-baseline after ship.

**Phase 2 must not:** invent statutory $5M AGCO mandates; promise BI for licence suspension; treat living plants as ordinary stock; merge retail+producer Explorers.

---

## AA. Sources

### Government / regulators (primary)

| Source | URL | Retrieved / noted |
|--------|-----|-------------------|
| AGCO — Steps to become a cannabis retailer | https://www.agco.ca/en/cannabis/steps-become-cannabis-retailer | 2026-09-10 |
| AGCO — Cannabis retail regulation guide | https://www.agco.ca/en/cannabis/cannabis-retail-regulation-guide | Updated 2025-12-12 |
| AGCO — Registrar’s Standards 2.0 Physical Store Requirements | https://www.agco.ca/en/cannabis/registrars-standards-cannabis-retail-stores/20-physical-store-requirements | Updated 2025-05-23 |
| AGCO — Ontario’s Cannabis Retail Regulation Landscape | https://www.agco.ca/en/cannabis/cannabis-retail-regulation-ontario/ontarios-cannabis-retail-regulation-landscape | 2026-09-10 |
| AGCO — Apply for retail manager licence | https://www.agco.ca/en/cannabis/apply-retail-manager-licence | 2026-09-10 |
| AGCO — Advertising & promotions standards summary | https://www.agco.ca/en/cannabis/responsibilities-and-resources/policies/60-advertising-and-promotions | 2026-09-10 |
| *Cannabis Licence Act, 2018* | https://www.ontario.ca/laws/statute/18c12 | 2026-09-10 |
| O. Reg. 468/18 | https://www.ontario.ca/laws/regulation/180468 | 2026-09-10 |
| CanLII CLA consolidation (s. 18–20 purchase/distribution) | https://www.canlii.org/en/on/laws/stat/so-2018-c-12-sch-2/latest/so-2018-c-12-sch-2.html | 2026-09-10 |
| Health Canada — Types of cannabis licences | https://www.canada.ca/en/health-canada/services/drugs-medication/cannabis/industry-licensees-applicants/applying-licence.html | 2026-09-10 |
| Health Canada — Micro-cultivation / nursery / micro-processing applying | https://www.canada.ca/en/health-canada/services/drugs-medication/cannabis/industry-licensees-applicants/licensing-summary/micro-cultivation-nursery-micro-processing-applying.html | 2026-09-10 |
| Health Canada — Physical security (standard classes) | https://www.canada.ca/en/health-canada/services/drugs-medication/cannabis/laws-regulations/regulations-support-cannabis-act/guide-physical-security-measures/standard-cultivation-standard-processing-sale-medical-purposes-possession-cannabis.html | 2026-09-10 |
| Health Canada — Physical security principles/practices | https://www.canada.ca/en/health-canada/services/drugs-medication/cannabis/laws-regulations/regulations-support-cannabis-act/guide-physical-security-measures/principles-practices.html | 2026-09-10 |
| Health Canada — Before you start applying (security comparison table) | https://www.canada.ca/en/health-canada/services/drugs-medication/cannabis/industry-licensees-applicants/licensing-summary/before-you-start-applying-cultivation-processing-sale-medical.html | 2026-09-10 |
| *Cannabis Regulations* s. 46 (recall system) | https://laws-lois.justice.gc.ca/eng/regulations/SOR-2018-144/ | 2026-09-10 |
| *Cannabis Regulations* s. 247 (voluntary recall reporting) | justice laws pages | 2026-09-10 |
| *Cannabis Act* s. 76 (ministerial recall) | https://laws-lois.justice.gc.ca/eng/acts/C-24.5/section-76.html | page note current to 2026-06-17 |
| Health Canada — Cannabis voluntary recall guide | https://www.canada.ca/en/health-canada/services/publications/drugs-health-products/cannabis-voluntary-recall/guide.html | 2026-09-10 |
| OCS — Doing Business / exclusive wholesaler framing | https://doingbusinesswithocs.ca/pricing-guide/ | 2026-09-10 |
| OCS Wholesale Authorized Cannabis Retailers Handbook | https://learn.ocswholesale.ca/wp-content/uploads/2026/02/OCS-Wholesale-Authorized-Cannabis-Retailers-Handbook-February2026.pdf | Feb 2026 |
| OCS Certificate of Insurance (licensed retailers) | https://learn.ocswholesale.ca/wp-content/uploads/2024/05/Licensed-Retailers-Certificate-of-Insurance-May2024.pdf | May 2024 form |
| OCS onboarding guide (insurance docs list) | https://learn.ocswholesale.ca/retailer-support/ | 2026-09-10 |

### Insurance market (secondary — not universal rules)

| Source | URL | Use |
|--------|-----|-----|
| SUM Insurance — Cannabis brochure | http://www.suminsurance.ca/Content/Products/Cannabis%20Brochure%205_2025.pdf | May 2025 — appetite illustration only |
| AC&D — Cannabis cultivation insurance page | https://www.acdinsurance.com/Business-Insurance/Cannabis-Cultivation-Insurance | Broker LP framing; underwriting conditions example |
| Canadian Underwriter — insurance implications of legalization | https://www.canadianunderwriter.ca/news/claims/insurance-implications-of-marijuana-legalization/ | Historical market commentary |
| PLRisk — cannabis commercial property definitions | https://www.plrisk.com/cannabis-commercial-property/ | Living plant / finished stock definition examples (US-leaning site — use cautiously) |

### Premium internal (frozen taxonomy)

| Route | Role |
|-------|------|
| `/retail-insurance/` | Ordinary retail — not cannabis-specific |
| `/manufacturing-insurance/` | Fabrication/manufacturing — not HC cannabis processing |
| `/greenhouse-agribusiness-insurance/` | Agri greenhouse — plants/crops without cannabis regulatory overlay |
| `/business-interruption-insurance/` | BI principles |
| `/product-recall-insurance/` | Recall expense depth |
| `/crime-fidelity-insurance/` | Crime/fidelity |
| `/pollution-liability-insurance/` | Pollution |
| `/cyber-insurance/` | Cyber |
| `/commercial-property-insurance/` | Property principles |
| `/commercial-auto-insurance/`, `/cargo-freight-insurance/` | Auto/cargo |
| `/commercial-insurance/` | Hub — do not modify this phase |

---

## STOP FOR OWNER REVIEW

**READY FOR IMPLEMENTATION:** **NO** — awaiting owner decisions A–O (especially architecture Option B and launch sequencing).

DO NOT MERGE. DO NOT DEPLOY. DO NOT PROMOTE VERCEL. DO NOT PUSH TO MAIN. DO NOT MODIFY PRODUCTION ALIASES.  
DO NOT CREATE ROUTES OR NAV ENTRIES UNTIL AUTHORIZED.
