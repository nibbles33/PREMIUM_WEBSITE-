# Grade C Batch D — Retail / Grocery / Fitness / Religious — Phase 1 Research

**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Frozen HEAD:** `084bd20`  
**Research date:** 2026-09-09  
**Phase:** RESEARCH ONLY — no page copy implementation  
**Isolated worktree:** `/tmp/PREMIUM_WEBSITE-d3-transportation`  
**Site audit at research start:** A36 / B16 / C6 / D0

**Routes:**
- `/retail-insurance/`
- `/grocery-specialty-food-insurance/`
- `/fitness-gym-insurance/`
- `/religious-organizations-insurance/`

**Status:** **STOP FOR OWNER REVIEW** — do not implement copy until approved

---

## Category legend

| Tag | Meaning |
|-----|---------|
| **[STATUTORY]** | Ontario statute or regulation |
| **[REGULATORY]** | FSRA, AGCO, public health, WSIB, or other regulator |
| **[COMMON POLICY STRUCTURE]** | Standard CGL / commercial property forms and endorsements |
| **[INSURER-SPECIFIC]** | Varies by insurer/MGA wording |
| **[UNDERWRITING]** | Rating/eligibility input — not a coverage guarantee |
| **[EXPOSURE]** | Operational risk — may map to purchasable coverage |

---

## A. Worktree safety

| Check | Result |
|-------|--------|
| **WORKTREE** | `/tmp/PREMIUM_WEBSITE-d3-transportation` |
| **BRANCH** | `cursor/coverage-explorer-ux-v2-2026-09-07` |
| **HEAD** | `084bd20` (contains frozen factual-gate commit) |
| **STATUS** | Pre-existing dirty QA screenshots + modified `docs/product-content-audit-2026-09-07.md` (not touched). **No `src/` modifications.** |
| **Primary carrier worktree** | Untouched |

**Safety confirmation (pre-commit):** Only this research doc will be added. No production source, Explorer runtime, image, scanner, Batch A/B/C, or frozen route changes.

---

## B. Current-state audit

Audit basis: `docs/qa-screenshots/product-content-audit-2026-09-07/audit-data.json` + source extraction @ HEAD `084bd20`.

### Summary

| Route | Grade | Words | HIGH | MED | LOW | Explorer | Considerations | FAQs | V2 pairs |
|-------|-------|------:|-----:|----:|----:|---------:|---------------:|-----:|----------|
| `/retail-insurance/` | **C** | 292 | 0 | 0 | 0 | 4 | **0** | 4 | **None** |
| `/grocery-specialty-food-insurance/` | **C** | 251 | 0 | 0 | 0 | 4 | **0** | 4 | **None** |
| `/fitness-gym-insurance/` | **C** | 240 | 0 | 0 | 0 | 4 | **0** | 4 | **None** |
| `/religious-organizations-insurance/` | **C** | 215 | 0 | 0 | 0 | 4 | **0** | 4 | **None** |

**Grade C drivers (all four):** Below ~400 substantive words; no Explorer V2 left/right detail pairs; no expandable considerations; generic 11–17 word hero subheads; thin coverage cards (~20–28 words avg).

**Benchmark (architecture/tone only):** `/convenience-store-insurance/` and `/non-profit-insurance/` (A-grade hedged specialty pages), `/restaurant-insurance/` (frozen AGCO/liquor precision).

---

### B1. `/retail-insurance/`

| Item | Current |
|------|---------|
| **SOURCE FILE** | `src/data/commercial-industries.ts` (~1287–1351) |
| **PRODUCT NAME** | Retail Insurance |
| **META TITLE** | Retail Insurance in Windsor-Essex \| Premium Insurance Brokers |
| **META DESCRIPTION** | Retail insurance through an independent Windsor-Essex broker — general liability, property & inventory, business interruption, and product liability. |
| **HERO** | Headline: *"Retail Insurance"* · Subhead: *"Coverage for retail businesses — from the storefront to the stockroom."* (11 words — generic) |
| **WHO IT IS FOR** | *(none — uses generic subhead via adapter)* |
| **coverageIntro** | *"Coverages that protect your premises, stock, income, and product-related liability."* |
| **Considerations** | **0** |
| **V2 detail pairs** | **None** |
| **Explorer manifest** | `retail-insurance` · archetype **`retail-cutaway`** · visual family **`retail`** |

| Explorer ID | Current title | Card description (risk notes) |
|-------------|---------------|----------------------------|
| `general-liability` | General Liability | *"Helps protect against customer injury…"* — hedged OK; no tenant/online nuance |
| `property-inventory-coverage` | Property & Inventory Coverage | **"Covers fixtures, equipment, and stock…"** — categorical; no valuation/endorsement hedge |
| `business-interruption` | Business Interruption | *"Can help replace lost income…"* — OK hedge; no covered physical-loss trigger |
| `product-liability` | Product Liability | **"Addresses claims…"** — no products-completed-operations / distributed-brand nuance |

**Issues:** Thin hero; no crime/cyber/e-commerce; no inventory valuation (RC/ACV/selling price); no employee-theft vs external-theft distinction; overlaps `/small-business-insurance/`, `/commercial-property-insurance/`, `/grocery-specialty-food-insurance/`, `/convenience-store-insurance/`, `/pharmacy-insurance/` without differentiation; categorical **"Covers"** on property card.

**FAQ COUNT:** 4 (target ~5)

---

### B2. `/grocery-specialty-food-insurance/`

| Item | Current |
|------|---------|
| **SOURCE FILE** | `src/data/product-pages/commercial-products-specialty.ts` (~285–358) |
| **PRODUCT NAME** | Grocery, Specialty Food & Bakery Insurance |
| **META TITLE** | Grocery, Specialty Food & Bakery Insurance in Windsor-Essex \| Premium Insurance Brokers |
| **META DESCRIPTION** | Grocery, specialty food, and bakery insurance — spoilage, product liability, equipment breakdown, and retail property for Windsor-Essex food sellers. |
| **HERO** | *"Coverage for food retailers and artisan producers — spoilage, refrigeration breakdown, product liability, and customer-facing premises risk."* (17 words) |
| **WHO IT IS FOR** | Grocers, butcher shops, bakeries, specialty food stores, delis selling perishable products |
| **coverageIntro** | *"Food retail combines inventory spoilage, product liability, and equipment failure exposures unique to perishable goods."* |
| **Considerations** | **0** |
| **V2 pairs** | **None** |
| **Explorer manifest** | `grocery-specialty-food-insurance` · archetype **`retail-cutaway`** · visual family **`restaurant-hospitality`** ⚠ |

| Explorer ID | Current title | Card description (risk notes) |
|-------------|---------------|----------------------------|
| `commercial-property-inventory` | Commercial Property & Inventory | **"Covers stock… against… equipment failure"** — conflates property PD with EB/spoilage triggers |
| `spoilage-refrigeration-breakdown` | Spoilage & Refrigeration Breakdown | **"Can cover inventory lost when coolers fail or power is interrupted"** — implies automatic spoilage response |
| `product-liability` | Product Liability | **"Addresses illness or injury claims…"** — no recall-expense distinction |
| `general-liability` | General Liability | **"Covers customer injury on premises"** — categorical |

**Issues:** Highest trigger-precision risk in batch (spoilage/power/EB); FAQ *"Yes — allergen claims…"* on bakeries is categorical; no product-recall vs product-liability split; no liquor/AGCO hedge if grocery sells alcohol; delivery/auto gap; visual family **`restaurant-hospitality`** while page job is **retail food** — semantic overlap with `/restaurant-insurance/`.

**FAQ COUNT:** 4

---

### B3. `/fitness-gym-insurance/`

| Item | Current |
|------|---------|
| **SOURCE FILE** | `src/data/product-pages/commercial-products-specialty.ts` (~633–706) |
| **PRODUCT NAME** | Fitness & Gym Insurance |
| **META TITLE** | Fitness & Gym Insurance in Windsor-Essex \| Premium Insurance Brokers |
| **META DESCRIPTION** | Fitness and gym insurance — general liability, professional liability for trainers, property, and participant injury for Windsor-Essex fitness businesses. |
| **HERO** | *"Coverage for gyms, studios, and fitness operators — participant injury, equipment, trainer liability, and premises risk."* (16 words) |
| **WHO IT IS FOR** | Gyms, CrossFit boxes, yoga studios, martial arts schools, personal training businesses |
| **coverageIntro** | *"Fitness businesses face participant injury claims, equipment liability, and professional exposure from trainers and instructors."* |
| **Considerations** | **0** |
| **V2 pairs** | **None** |
| **Explorer manifest** | `fitness-gym-insurance` · archetype **`gym-studio`** · dedicated interactive master |

| Explorer ID | Current title | Card description (risk notes) |
|-------------|---------------|----------------------------|
| `general-liability` | General Liability | **"Covers member slip-and-fall, equipment-related injury…"** — implies participant injury always GL |
| `professional-liability` | Professional Liability | *"Addresses claims alleging negligent instruction…"* — good split concept |
| `commercial-property` | Commercial Property | **"Covers cardio machines, weights…"** — categorical |
| `sexual-abuse-misconduct` | Sexual Abuse & Misconduct | *"Some markets offer coverage… important for youth…"* — OK hedge; sensitive wording |

**Issues:** Waiver FAQ partially OK but needs Occupiers' Liability Act / enforceability precision; martial arts broadens scope beyond pure gym; no BI/cyber/member-data; participant vs premises injury boundary thin; **"Covers"** on GL card overbroad for instruction claims.

**FAQ COUNT:** 4

---

### B4. `/religious-organizations-insurance/`

| Item | Current |
|------|---------|
| **SOURCE FILE** | `src/data/product-pages/commercial-products-specialty.ts` (~967–1040) |
| **PRODUCT NAME** | Religious Organization Insurance |
| **META TITLE** | Religious Organization Insurance in Windsor-Essex \| Premium Insurance Brokers |
| **META DESCRIPTION** | Church and religious organization insurance — property, liability, abuse coverage, and event exposure for Windsor-Essex faith communities. |
| **HERO** | *"Coverage for churches, temples, and faith communities — worship premises, events, pastoral counselling liability, and property."* (16 words) |
| **WHO IT IS FOR** | Churches, mosques, synagogues, temples, faith-based community centres |
| **coverageIntro** | *"Religious organizations combine property, congregation liability, and sensitive counselling and youth program exposures."* |
| **Considerations** | **0** |
| **V2 pairs** | **None** |
| **Explorer manifest** | `religious-organizations-insurance` · archetype **`church-campus`** · dedicated interactive master |

| Explorer ID | Current title | Card description (risk notes) |
|-------------|---------------|----------------------------|
| `commercial-property` | Commercial Property | **"Covers sanctuaries, halls, offices, and contents…"** — categorical |
| `general-liability` | General Liability | **"Addresses injury claims on premises…"** — no hall-rental / off-site hedge |
| `pastoral-counselling-liability` | Pastoral Counselling Liability | *"May address professional counselling claims…"* — OK hedge |
| `abuse-molestation` | Abuse & Molestation | **"Critical coverage for organizations with youth…"** — pressure language; not automatic |

**Issues:** FAQ *"typically require abuse… coverage"* reads mandatory; no D&O cross-link precision vs frozen `/directors-officers-insurance/`; volunteer/WSIB gap; heritage/stained-glass valuation; neutral multi-faith framing OK in whoItIsFor; overlaps `/non-profit-insurance/` and `/daycare-private-school-insurance/`.

**FAQ COUNT:** 4

---

## C. Retail research

### Page job

**Broad ordinary storefront retail** for Windsor–Essex shops selling goods to the public — clothing, gifts, electronics, furniture, specialty retail — **not** a duplicate of small-business hub, commercial property deep-dive, grocery/food, pharmacy, or convenience/fuel retail.

### A. Property [COMMON POLICY STRUCTURE] [UNDERWRITING]

| Topic | Research note |
|-------|---------------|
| Stock/inventory | Insured under commercial property as business personal property — limits, causes of loss, and valuation basis are policy-dependent **[COMMON POLICY STRUCTURE]** |
| Valuation — unsold stock | Often **actual cash value** or replacement cost depending on form/endorsement; not automatic retail selling price **[COMMON POLICY STRUCTURE]** |
| Valuation — sold stock | Many commercial property forms value **sold but undelivered stock** at **selling price** (less discounts/expenses) when that valuation condition applies — still endorsement/form-specific **[COMMON POLICY STRUCTURE]** |
| Tenant improvements | Leasehold improvements typically tenant's insurable interest — separate from landlord building **[EXPOSURE]** |
| Seasonal peaks | Higher inventory periods may need reporting, blanket limits, or peak-season endorsements **[UNDERWRITING]** |
| Theft | External theft may be covered cause of loss on property — subject to security conditions **[COMMON POLICY STRUCTURE]** |
| BI | Separate coverage; requires covered direct physical loss trigger per policy — cross-link `/business-interruption-insurance/` **[COMMON POLICY STRUCTURE]** |
| Equipment breakdown | Optional endorsement — not automatic in base property **[COMMON POLICY STRUCTURE]** |

**Do NOT imply** all inventory automatically insured at retail selling price.

### B. Liability [COMMON POLICY STRUCTURE]

- Premises slip/fall, customer injury — typical CGL premises/operations **[EXPOSURE]**
- Products liability — claims from products sold/distributed; may include products-completed operations depending on wording **[COMMON POLICY STRUCTURE]**
- Tenant legal liability — where endorsed **[INSURER-SPECIFIC]**
- Advertising injury — personal/advertising injury coverage where included in CGL form **[COMMON POLICY STRUCTURE]**

### C. Crime / theft distinction [COMMON POLICY STRUCTURE]

| Loss type | Typical product |
|-----------|-----------------|
| External theft of stock | Commercial property (subject to causes/security) |
| Employee dishonesty | Crime/fidelity endorsement or separate crime policy — **not automatic** in standard property **[COMMON POLICY STRUCTURE]** |

Cross-link `/crime-fidelity-insurance/` where relevant.

### D. Cyber / e-commerce [EXPOSURE] [INSURER-SPECIFIC]

- POS systems, customer PII, online sales — cyber/privacy coverage where purchased **[INSURER-SPECIFIC]**
- **Do NOT invent PCI DSS insurance mandates** — PCI is a payment-card industry standard; insurance is commercial product choice, not PCI compliance itself **[REGULATORY/N/A]**

### E. Explorer audit — Retail

| STATE ID | CURRENT TITLE | REC | PROPOSED VISITOR TITLE | FACTUAL CAUTION |
|----------|---------------|-----|------------------------|-----------------|
| `general-liability` | General Liability | **RETITLE** | Premises & Customer Liability | Do not guarantee all customer claims covered |
| `property-inventory-coverage` | Property & Inventory Coverage | **RETITLE** | Property, Stock & Fixtures | Valuation basis policy-dependent; remove "Covers" |
| `business-interruption` | Business Interruption | **KEEP/RETITLE** | Business Income (After Covered Loss) | Physical-loss trigger required |
| `product-liability` | Product Liability | **KEEP/RETITLE** | Products You Sell | Distinct from recall expense route |

---

## D. Grocery / Specialty Food research

### Page job

**Retail food operations** with perishable inventory and limited in-store preparation — grocers, specialty markets, butchers, bakeries, delis — **distinct from** full-service `/restaurant-insurance/`, fuel-heavy `/convenience-store-insurance/`, and generic `/retail-insurance/`.

**Current audience (preserve):** whoItIsFor lists grocers, butchers, bakeries, specialty stores, delis — **do not silently broaden** to full restaurants or industrial food manufacturing.

### A. Property / stock / spoilage [COMMON POLICY STRUCTURE]

| Trigger | Research note |
|---------|---------------|
| Equipment breakdown | Optional **equipment breakdown** endorsement — mechanical failure of refrigeration **[COMMON POLICY STRUCTURE]** |
| Spoilage | Typically **spoilage endorsement** (e.g. CP 04 40 pattern) — perishable stock only; own limit/deductible; maintenance conditions may apply **[COMMON POLICY STRUCTURE]** |
| Power interruption — on premises | May be covered under spoilage endorsement if scheduled **[INSURER-SPECIFIC]** |
| Power interruption — off premises | Often **excluded** on base property; may require **utility services — direct damage** + spoilage endorsement working together **[COMMON POLICY STRUCTURE]** |
| Contamination / refrigerant | Spoilage forms may cover contamination by refrigerant — form-specific **[INSURER-SPECIFIC]** |
| BI after spoilage | Utility time-element or BI endorsements — separate triggers **[COMMON POLICY STRUCTURE]** |

**CRITICAL:** Spoilage does **not** automatically respond because food became unusable — endorsement, cause of loss, waiting period, and off-premises power rules matter.

### B. Food / product liability vs recall [COMMON POLICY STRUCTURE] [EXPOSURE]

| Product | Role |
|---------|------|
| Product liability (CGL) | May address certain third-party BI/PD from products sold — subject to products-completed operations wording **[COMMON POLICY STRUCTURE]** |
| Product recall / withdrawal expense | **Separate** first-party recall expense product — **not automatic** in CGL **[COMMON POLICY STRUCTURE]** |

Cross-link frozen `/product-recall-insurance/`. Do **not** say CGL pays recall costs.

### C. Liquor [REGULATORY]

- Eligible grocers may hold **AGCO Grocery Store Licence** for retail beer/wine/RTD — **[REGULATORY]** AGCO guides (2024–2026 expansion)
- **AGCO does not prescribe a named liquor liability insurance product/limit** in public grocery guides — same standard as restaurant route **[REGULATORY]**
- Retail alcohol is **packaged off-premises sale** — different from on-premises liquor service; do not copy restaurant liquor liability card verbatim
- If alcohol discussed: exposure may exist; insurance is commercial arrangement — not statutory mandate

### D. Delivery [EXPOSURE]

- In-store delivery with company/employee vehicles → **commercial auto / HNOA** — not property/CGL alone **[COMMON POLICY STRUCTURE]**
- Third-party delivery apps → contractual/auto gaps — disclose to broker **[UNDERWRITING]**

### E. Food safety [REGULATORY]

- **O. Reg. 493/17** (Food Premises) under **Health Protection and Promotion Act** applies to many grocery/deli operations **[STATUTORY]**
- Certified food handler on site when food prepared/served — regulatory obligation **separate from insurance** **[REGULATORY]**
- Compliance supports operations but **does not replace** product liability coverage

### F. Explorer audit — Grocery

| STATE ID | CURRENT TITLE | REC | PROPOSED VISITOR TITLE | FACTUAL CAUTION |
|----------|---------------|-----|------------------------|-----------------|
| `commercial-property-inventory` | Commercial Property & Inventory | **RETITLE** | Store Property & Stock | Separate EB/spoilage from base property |
| `spoilage-refrigeration-breakdown` | Spoilage & Refrigeration Breakdown | **FLAG/RETITLE** | Spoilage & Refrigeration (Where Purchased) | Endorsement + trigger dependent; power off-premises |
| `product-liability` | Product Liability | **RETITLE** | Food Products Liability | Not recall expense |
| `general-liability` | General Liability | **RETITLE** | Customer Premises Liability | Remove "Covers" |

**Visual flag:** Manifest archetype `retail-cutaway` but **`SLUG_TO_VISUAL_FAMILY` maps to `restaurant-hospitality`** — potential semantic overlap with restaurant/kitchen imagery. Owner review recommended (no image change in research phase).

---

## E. Fitness / Gym research

### Page job

**Fitness centres and studios** — gyms, boutique fitness, yoga/pilates, personal training; martial arts **only as currently listed** in whoItIsFor. Not general recreation/league sports hub.

### A. General liability [COMMON POLICY STRUCTURE] [EXPOSURE]

- Premises injury (slip/fall, equipment) — typical GL **[EXPOSURE]**
- Participant injury during activity — may be GL premises/operations **or** professional/instruction allegation depending on claim framing — **not automatically covered** as generic GL **[COMMON POLICY STRUCTURE]**

### B. Professional liability [COMMON POLICY STRUCTURE]

- Negligent instruction, programming, personal training advice — **professional / fitness liability** or E&O-style coverage **[COMMON POLICY STRUCTURE]**
- **CGL does not automatically respond** to professional instruction allegations — already a separate Explorer state (good)

### C. Waivers [REGULATORY] — HIGH PRECISION

| Safe concept | Unsupported concept |
|--------------|-------------------|
| Waivers may be **part of risk management** | "Waivers prevent lawsuits" |
| Enforceability depends on **wording, notice, activity, Occupiers' Liability Act context, facts** | "Waivers eliminate liability" |
| OLA s. 4(1) — duty may not apply to **risks willingly assumed** in some cases | Legal advice on waiver drafting |

Sources: Occupiers' Liability Act; Ontario case law (e.g. Arksey v Sky Zone; Kolsen v New Tecumseth — waiver drafting matters; presentation/reasonable steps matter).

### D. Abuse / misconduct [COMMON POLICY STRUCTURE] [INSURER-SPECIFIC]

- Youth programs, minors — specialized **abuse/molestation** coverage often **separate** from CGL; many CGL forms contain abuse exclusions **[COMMON POLICY STRUCTURE]**
- Not automatic; limits, defence inside/outside limits, and underwriting of screening practices vary **[INSURER-SPECIFIC]**
- Do not use sensational language; do not imply coverage for intentional criminal acts of perpetrators

### E. Property / equipment / BI / cyber [EXPOSURE]

- Exercise equipment, leasehold improvements — commercial property **[EXPOSURE]**
- Equipment breakdown — optional **[COMMON POLICY STRUCTURE]**
- BI — optional, physical-loss trigger **[COMMON POLICY STRUCTURE]**
- Member data / gym software — cyber where purchased **[INSURER-SPECIFIC]**

### F. Explorer audit — Fitness

| STATE ID | CURRENT TITLE | REC | PROPOSED VISITOR TITLE | FACTUAL CAUTION |
|----------|---------------|-----|------------------------|-----------------|
| `general-liability` | General Liability | **RETITLE** | Premises & Operations Liability | Not all participant claims are GL |
| `professional-liability` | Professional Liability | **KEEP** | Trainer & Instruction Liability | Core concept — keep |
| `commercial-property` | Commercial Property | **RETITLE** | Equipment & Fit-Out Property | Optional causes of loss |
| `sexual-abuse-misconduct` | Sexual Abuse & Misconduct | **RETITLE** | Abuse & Misconduct (Where Available) | Sensitive; not automatic; youth programs |

---

## F. Religious Organizations research

### Page job

**Faith communities and houses of worship** — neutral multi-faith framing (churches, mosques, synagogues, temples, faith-based centres). Windsor–Essex local positioning OK.

### A. Property [COMMON POLICY STRUCTURE] [UNDERWRITING]

- Sanctuaries, halls, offices, AV equipment, kitchens — commercial property **[EXPOSURE]**
- Heritage/stained glass/specialty property — may need agreed value or specialty scheduling **[UNDERWRITING]**
- **Do not imply** automatic replacement-cost treatment for artistic/specialty property

### B. General liability [EXPOSURE]

- Congregation/visitor injury, parking lot, events — premises/operations **[EXPOSURE]**
- Hall rentals — may create tenant/user exposures; renters may need own event liability **[EXPOSURE]**
- Food service (kitchens, suppers) — premises/products exposure; not automatic for all events **[EXPOSURE]**

### C. Directors & Officers [EXPOSURE]

- Boards/trustees — governance claims; **D&O may respond** subject to Side A/B/C structure **[COMMON POLICY STRUCTURE]**
- **Cross-link** frozen `/directors-officers-insurance/` — do not duplicate Side A/B/C precision or contradict claims-made/defence-cost treatment
- Religious org page may mention governance exposure; **full D&O education stays on D&O route**

### D. Abuse / molestation [COMMON POLICY STRUCTURE] — HIGH PRECISION

- Youth/vulnerable persons programs — **abuse exclusions common on CGL**; specialized coverage may be available **[COMMON POLICY STRUCTURE]**
- Coverage protects **organization** response to allegations subject to wording — **not** indemnification of intentional criminal conduct **[INSURER-SPECIFIC]**
- Screening/supervision may affect underwriting — not a substitute for safeguarding policies
- Case law: abuse exclusions broadly interpreted when claim arises from abuse (e.g. *Paul v Hindu Sabha*, 2025 ONSC 6183)

### E. Volunteers [REGULATORY] [EXPOSURE]

- **True unpaid volunteers generally not WSIB workers** under WSIA **[STATUTORY/REGULATORY]**
- Religious organizations (NAICS 813110) — **WSIB not mandatory** for many; optional by-application coverage available **[REGULATORY]**
- Stipends/honorariums can change volunteer vs worker classification **[REGULATORY]**
- **Do NOT say** "volunteers are automatically insured" under GL or WSIB
- Optional **volunteer accident** coverage — limited medical benefits where purchased (see non-profit route pattern)

### F. Cyber / crime [EXPOSURE]

- Donations, online giving, member data — cyber/privacy **[EXPOSURE]**
- Employee/volunteer dishonesty — crime/fidelity separate from property theft **[COMMON POLICY STRUCTURE]**

### G. Explorer audit — Religious

| STATE ID | CURRENT TITLE | REC | PROPOSED VISITOR TITLE | FACTUAL CAUTION |
|----------|---------------|-----|------------------------|-----------------|
| `commercial-property` | Commercial Property | **RETITLE** | Worship Property & Contents | Specialty/heritage values |
| `general-liability` | General Liability | **RETITLE** | Congregation & Visitor Liability | Events/rentals hedged |
| `pastoral-counselling-liability` | Pastoral Counselling Liability | **KEEP/RETITLE** | Pastoral Counselling (Where Included) | Professional vs GL; credentials matter |
| `abuse-molestation` | Abuse & Molestation | **KEEP/RETITLE** | Abuse & Molestation (Where Available) | Not automatic; not mandatory wording |

---

## G. Cross-page differentiation matrix

### RETAIL

| vs | PRIMARY DIFFERENCE | CROSS-LINK |
|----|---------------------|------------|
| Small Business | SMB = package hub; Retail = storefront inventory/products focus | `/small-business-insurance/` |
| Commercial Property | CP = property-deep; Retail = GL+products+retail operations entry | `/commercial-property-insurance/` |
| Grocery | Grocery = perishable/spoilage/food safety; Retail = general merchandise | `/grocery-specialty-food-insurance/` |
| Convenience Store | C-store = fuel/crime/extended hours; Retail = ordinary shop | `/convenience-store-insurance/` |
| Pharmacy | Pharmacy = OCP/regulated dispensing; Retail = general goods | `/pharmacy-insurance/` |

**PAGE JOB:** Ordinary retail package entry — property/stock, GL, products, optional BI/cyber/crime.

---

### GROCERY

| vs | PRIMARY DIFFERENCE | CROSS-LINK |
|----|---------------------|------------|
| Restaurant | Restaurant = prepared food service + AGCO on-premises liquor; Grocery = retail perishables + limited prep | `/restaurant-insurance/` |
| Convenience Store | C-store = fuel/lottery/tobacco/crime; Grocery = food inventory/spoilage focus | `/convenience-store-insurance/` |
| Retail | Retail = non-food/general; Grocery = perishable food triggers | `/retail-insurance/` |
| Product Recall | Recall = first-party withdrawal expense; Grocery PL = third-party injury | `/product-recall-insurance/` |

**PAGE JOB:** Perishable retail food — spoilage/EB triggers, product liability, optional AGCO retail alcohol note.

---

### FITNESS

| vs | PRIMARY DIFFERENCE | CROSS-LINK |
|----|---------------------|------------|
| Small Business | SMB hub vs fitness-specific participant/professional split | `/small-business-insurance/` |
| Professional Liability | PL route = broad E&O; Fitness = instruction/participant context | `/professional-liability-insurance/` |
| Commercial Property | CP deep-dive vs equipment as one Explorer state | `/commercial-property-insurance/` |
| Event Liability | Off-site boot camps/events | `/event-liability-insurance/` |

**PAGE JOB:** Gym/studio liability stack — GL + professional/instruction + property + conditional abuse.

---

### RELIGIOUS ORGANIZATIONS

| vs | PRIMARY DIFFERENCE | CROSS-LINK |
|----|---------------------|------------|
| Non-Profit | Non-profit = broad charity/governance/volunteer; Religious = worship premises, pastoral counselling, faith-neutral community framing | `/non-profit-insurance/` |
| D&O | Full Side A/B/C precision on D&O route | `/directors-officers-insurance/` |
| Crime/Fidelity | Crime route for dishonesty deep-dive | `/crime-fidelity-insurance/` |
| Daycare/School | Licensed childcare regulatory mandates — different route | `/daycare-private-school-insurance/` |
| Commercial Property | CP property-deep vs worship/specialty context | `/commercial-property-insurance/` |

**PAGE JOB:** House of worship package — property, congregation liability, pastoral counselling (where applicable), abuse (where programs warrant).

---

## H. Explorer V2 plan (all 16 states)

**Pattern:** RIGHT = WHAT · LEFT = WHY IT MATTERS · Preserve all technical IDs

### Retail (`/retail-insurance/`)

| ID | Proposed visitor title | Short label | RIGHT concept | LEFT detail title concept | LEFT detail concept | Caution |
|----|------------------------|-------------|---------------|---------------------------|---------------------|---------|
| `general-liability` | Premises & Customer Liability | Liability | May respond to customer slip/fall on sales floor | A wet entrance isn't just housekeeping | Premises claims vs products; limits/contracts | No guarantee |
| `property-inventory-coverage` | Property, Stock & Fixtures | Property | Stock, fixtures, equipment — subject to causes/limits | Seasonal inventory can outgrow your limit | Valuation RC/ACV/sold stock; peak reporting | Not auto selling price |
| `business-interruption` | Business Income (Optional) | BI | Income after covered physical property loss | A fire doesn't pause your lease | Trigger = covered property loss | Not any shutdown |
| `product-liability` | Products You Sell | Products | Claims from products sold/distributed | A defective product claim can name the seller | PL vs recall; distributed brands | Not recall expense |

### Grocery (`/grocery-specialty-food-insurance/`)

| ID | Proposed visitor title | Short label | RIGHT concept | LEFT detail title concept | Caution |
|----|------------------------|-------------|---------------|---------------------------|---------|
| `commercial-property-inventory` | Store Property & Stock | Property | Building contents, fixtures, stock | Coolers and peak holiday stock drive values | EB ≠ base property |
| `spoilage-refrigeration-breakdown` | Spoilage & Refrigeration (Optional) | Spoilage | Endorsement may cover perishable loss from breakdown/power | A compressor failure can empty the dairy case | Endorsement/trigger/waiting period |
| `product-liability` | Food Products Liability | Products | Illness/allergen claims from food sold | One allergen label error can reach the whole chain | Not recall costs |
| `general-liability` | Customer Premises Liability | Liability | Slip/fall in aisles, parking, entrances | Spills and carts create premises exposure | Not food illness (products) |

### Fitness (`/fitness-gym-insurance/`)

| ID | Proposed visitor title | Short label | RIGHT concept | LEFT detail title concept | Caution |
|----|------------------------|-------------|---------------|---------------------------|---------|
| `general-liability` | Premises & Operations Liability | GL | Premises/equipment injury claims | A loose cable on the gym floor is a premises claim | Not all instruction claims |
| `professional-liability` | Trainer & Instruction Liability | Prof. | Negligent programming/training advice | Bad programming allegations aren't ordinary slip-and-falls | CGL ≠ professional |
| `commercial-property` | Equipment & Fit-Out | Property | Machines, flooring, leasehold improvements | A treadmill fleet is a capital exposure | Optional PD |
| `sexual-abuse-misconduct` | Abuse & Misconduct (Where Available) | Abuse | Specialized coverage may exist for abuse allegations | Youth classes change the coverage conversation | Not automatic; sensitive |

### Religious (`/religious-organizations-insurance/`)

| ID | Proposed visitor title | Short label | RIGHT concept | LEFT detail title concept | Caution |
|----|------------------------|-------------|---------------|---------------------------|---------|
| `commercial-property` | Worship Property & Contents | Property | Sanctuary, halls, AV, contents | Stained glass and AV can exceed ordinary contents limits | Heritage valuation |
| `general-liability` | Congregation & Visitor Liability | Liability | Visitor injury on premises/parking | A winter parking-lot fall reaches the organization | Hall rentals hedged |
| `pastoral-counselling-liability` | Pastoral Counselling (Where Included) | Counselling | Counselling-related professional claims | Counselling allegations need the right policy part | Credentials/wording |
| `abuse-molestation` | Abuse & Molestation (Where Available) | Abuse | May address abuse allegations subject to form | Youth ministry deserves its own coverage review | Not automatic; exclusions common on GL |

---

## I. Considerations plan (~6–8 each)

### Retail
1. Inventory values and seasonal peaks  
2. Valuation basis (RC/ACV/sold stock)  
3. Tenant vs owner property interests  
4. Theft, security, and crime vs property  
5. Products sold vs manufactured  
6. E-commerce / POS / cyber  
7. Business interruption trigger  
8. Delivery / HNOA if applicable  

### Grocery
1. Refrigeration equipment and maintenance  
2. Spoilage endorsement vs utility interruption  
3. Food preparation level (deli/bakery vs prepack only)  
4. Product liability vs recall expense  
5. O. Reg. 493/17 food safety (regulatory ≠ insurance)  
6. AGCO retail alcohol (if applicable) — no insurance mandate  
7. Delivery and commercial auto  
8. BI after covered property loss  

### Fitness
1. Member volume and activity types  
2. Equipment values and maintenance logs  
3. Employee vs contract trainers  
4. Professional/instruction exposure  
5. Waivers as risk management (not replacement for insurance)  
6. Youth programs and abuse coverage  
7. Off-site boot camps / events  
8. Supplements/retail merchandise products exposure  

### Religious
1. Building use (worship, hall rental, kitchen)  
2. Attendance and event frequency  
3. Hall rental / third-party user certificates  
4. Youth and vulnerable-person programs  
5. Volunteers vs paid staff / WSIB context  
6. Board governance — D&O cross-link  
7. Heritage/specialty property values  
8. Donations, online giving, cyber/crime  

---

## J. FAQ plan (~5 each)

### Retail
| # | Question | Answer direction (not final copy) |
|---|----------|-----------------------------------|
| 1 | What does retail insurance typically combine? | CGL + property (+ optional BI, crime, cyber) — hedged package language |
| 2 | How should inventory values be insured? | Report peaks; valuation basis policy-dependent |
| 3 | Is employee theft covered by property insurance? | External theft vs employee dishonesty — crime endorsement |
| 4 | What if I also sell online? | Cyber/POS exposure; not automatic in base retail |
| 5 | What information is needed to quote? | Sq ft, stock values, product types, security, sales split |

### Grocery
| # | Question | Answer direction |
|---|----------|------------------|
| 1 | Does insurance cover spoiled refrigerated stock? | Spoilage/EB endorsements — triggers, waiting periods, off-premises power |
| 2 | What if a customer alleges foodborne illness? | Product liability — not automatic; policy wording |
| 3 | Is product recall included with liability? | No — recall expense separate route |
| 4 | What about refrigeration breakdown or power failure? | EB + spoilage + utility endorsements — distinct |
| 5 | What information is needed to quote? | Product mix, refrigeration, prep level, alcohol licence, values |

### Fitness
| # | Question | Answer direction |
|---|----------|------------------|
| 1 | What insurance does a gym need? | GL + professional + property; abuse if youth — all hedged |
| 2 | Does general liability cover trainer advice? | Often professional/instruction exposure — separate |
| 3 | Do waivers replace insurance? | No — waivers may help risk management; enforceability fact-specific |
| 4 | What if we run youth programs? | Abuse/molestation review; screening; not automatic on GL |
| 5 | What information is needed to quote? | Members, activities, trainers, equipment, locations |

### Religious
| # | Question | Answer direction |
|---|----------|------------------|
| 1 | What insurance does a house of worship need? | Property + GL + conditional pastoral/abuse — package hedged |
| 2 | Are volunteers automatically covered? | No — WSIB/volunteer accident/GL distinctions |
| 3 | What about youth programs? | Abuse coverage review — not assumed on GL |
| 4 | Does the policy cover hall rentals/events? | Premises vs renter liability; certificates |
| 5 | What information is needed to quote? | Building, programs, attendance, rentals, payroll/volunteers |

---

## K. Numeric / legal / coverage claim register

| ROUTE | CLAIM (current or proposed) | TYPE | SOURCE | SAFE | KEEP/OMIT/OWNER |
|-------|----------------------------|------|--------|------|-----------------|
| Grocery | Spoilage "can cover" power outage | Coverage | CP 04 40 pattern | Only with endorsement + triggers | **TIGHTEN** |
| Grocery | "Yes" bakeries need product liability | Coverage | CGL products | Hedge — "often need" | **TIGHTEN** |
| Grocery | Food handler / O. Reg. 493/17 | Regulatory | HPPA; O. Reg. 493/17 | Yes — separate from insurance | **KEEP (qualified)** |
| Grocery | AGCO grocery liquor licence | Regulatory | AGCO guides 2024–2026 | Yes — no insurance mandate | **KEEP (qualified)** |
| Retail | Inventory theft "often yes" | Coverage | Property form | OK with limits/security hedge | **KEEP** |
| Retail | Sold stock at selling price | Coverage | Commercial property valuation | Form-specific | **KEEP (hedged)** |
| Fitness | Waivers vs insurance | Legal/exposure | OLA; case law | Do not overstate waiver | **KEEP (careful)** |
| Religious | Youth "typically require" abuse coverage | Coverage | Market practice | Not statutory mandatory | **TIGHTEN** |
| Religious | WSIB for volunteers | Regulatory | WSIA; WSIB | Volunteers generally not automatic | **KEEP (qualified)** |
| All | "Covers/Protects" on cards | Wording | Internal audit | Unhedged | **FIX at implement** |

**No dollar amounts, percentages, or statutory insurance mandates** currently published on these four routes (safe baseline).

---

## L. Risky / unsupported language register (current copy)

| ROUTE | FIELD | EXACT WORDING | ISSUE | SEVERITY |
|-------|-------|---------------|-------|----------|
| Retail | property card | "Covers fixtures, equipment, and stock" | Categorical coverage | **MED** |
| Retail | coverageIntro | "Coverages that protect your premises…" | Implies bundle inclusion | **LOW** |
| Grocery | spoilage card | "Can cover inventory lost when coolers fail or power is interrupted" | Implies spoilage automatic | **HIGH** |
| Grocery | property card | "Covers stock… equipment failure" | Conflates EB/spoilage with property | **MED** |
| Grocery | GL card | "Covers customer injury" | Categorical | **MED** |
| Grocery | FAQ bakery | "Yes — allergen claims…" | Categorical | **MED** |
| Fitness | GL card | "Covers member slip-and-fall, equipment-related injury" | Overbroad for participant/instruction | **MED** |
| Fitness | property card | "Covers cardio machines…" | Categorical | **LOW** |
| Religious | property card | "Covers sanctuaries, halls…" | Categorical | **LOW** |
| Religious | abuse card | "Critical coverage for organizations with youth" | Pressure/mandatory tone | **MED** |
| Religious | FAQ youth | "typically require abuse… coverage" | Sounds mandatory | **MED** |

Harmless grammar uses of "may," "can help," "subject to" in FAQs — not flagged.

---

## M. Owner decisions

### A. RETAIL — broad ordinary storefront?

**Recommendation: YES.** Keep `/retail-insurance/` as the generic Windsor–Essex storefront entry. Cross-link grocery, convenience, pharmacy, small business, commercial property. Do not absorb food-specific spoilage or fuel/crime narratives.

### B. GROCERY — include bakeries/delis with limited prep?

**Recommendation: YES — aligned with current source.** Headline/meta already say "Bakery"; whoItIsFor includes butchers, bakeries, delis. Keep **limited preparation** positioning; cross-link `/restaurant-insurance/` for primarily prepared-food/service operations.

### C. FITNESS — professional/instructor liability as core Explorer?

**Recommendation: YES — already present.** `professional-liability` is a core Explorer state — retain and strengthen GL vs professional split in V2 LEFT copy. Do not demote to consideration-only.

### D. RELIGIOUS — abuse/molestation core Explorer?

**Recommendation: YES — with high precision.** Keep `abuse-molestation` ID; retitle visitor copy to "Where Available"; remove "Critical"/"typically require" mandatory tone; align safeguarding/underwriting language with daycare/non-profit frozen patterns.

### E. RELIGIOUS vs NON-PROFIT distinction?

**Recommendation:**
| | Religious | Non-Profit |
|---|-----------|------------|
| **Center** | Worship premises, faith community programs, pastoral counselling | Charitable programs, governance, grants, general community orgs |
| **Explorer** | Property, GL, pastoral counselling, abuse | GL, D&O, property, volunteer accident |
| **Overlap** | Youth abuse, events, volunteers — cross-link not duplicate |
| **D&O** | Mention + link to `/directors-officers-insurance/` | D&O as core Explorer on non-profit route |

### F. EXPLORER IDs — fundamentally misleading?

| ID | Assessment |
|----|------------|
| Retail four IDs | **KEEP** — retitle only |
| Grocery `spoilage-refrigeration-breakdown` | **KEEP ID — FLAG copy** (trigger precision) |
| Fitness `sexual-abuse-misconduct` vs Religious `abuse-molestation` | **KEEP both IDs** — naming inconsistency is technical debt only; visitor retitles can harmonize |
| Grocery visual family `restaurant-hospitality` | **FLAG for owner** — may confuse grocery vs restaurant (manifest uses `retail-cutaway`) |

### G. VISUALS — semantic match after retitles?

| Route | Archetype / family | Assessment |
|-------|-------------------|------------|
| Retail | `retail-cutaway` / `retail` | **GOOD** |
| Grocery | manifest `retail-cutaway` / family **`restaurant-hospitality`** | **ACCEPTABLE / borderline MISLEADING** — owner review |
| Fitness | `gym-studio` + dedicated master | **GOOD** |
| Religious | `church-campus` + dedicated master | **GOOD** |

No image changes during research.

---

## N. Proposed implementation scope

**Target grade:** A (~1000–1300 substantive words per route)  
**Pattern:** Batch B/C — V2 detail pairs, 6–8 expandable considerations, 5 hedged FAQs, trust band, Windsor–Essex geo.

| Route | Primary source file | Est. words |
|-------|---------------------|------------|
| Retail | `src/data/commercial-industries.ts` | ~1000–1200 |
| Grocery | `src/data/product-pages/commercial-products-specialty.ts` | ~1100–1300 |
| Fitness | `src/data/product-pages/commercial-products-specialty.ts` | ~1000–1200 |
| Religious | `src/data/product-pages/commercial-products-specialty.ts` | ~1000–1200 |

**Shared touch:** `src/lib/buildPilotProductConfig.ts` — expandable considerations + trust band overrides for four slugs.

**Do NOT change without owner approval:** Explorer IDs, manifest zones, images, scanner, frozen Batch A/B/C routes.

---

## O. Expected files to change (implementation phase only)

| File | Purpose |
|------|---------|
| `src/data/commercial-industries.ts` | Retail content |
| `src/data/product-pages/commercial-products-specialty.ts` | Grocery, Fitness, Religious |
| `src/lib/buildPilotProductConfig.ts` | Considerations/trust if needed |
| `scripts/verify-grade-c-batch-d.cjs` | Batch verifier (new, QA) |
| `docs/grade-c-batch-d-retail-food-fitness-religious-implementation-2026-09-09.md` | Phase 2 report |

**NOT expected:** Explorer manifest (`routes.ts`), images, runtime, navigation, frozen routes.

---

## P. Sources

### Statutory / regulatory
- Health Protection and Promotion Act; **O. Reg. 493/17** (Food Premises) — https://www.ontario.ca/laws/regulation/170493  
- **Liquor Licence and Control Act, 2019**; AGCO Grocery Store Licence Obligation Guide — https://www.agco.ca/en/alcohol/guides/grocery-store-licence-obligation-guide  
- **Occupiers' Liability Act**, R.S.O. 1990, c. O.2 — waiver/assumption of risk context  
- **Workplace Safety and Insurance Act**; WSIB optional coverage — https://www.wsib.ca/en/businesses/registration-and-coverage/can-i-choose-have-wsib-insurance  

### Policy structure / industry
- IBC / commercial property valuation concepts (stock ACV vs selling price)  
- CP 04 40 Spoilage Coverage endorsement pattern — equipment breakdown vs power outage vs contamination  
- Utility Services Direct Damage / Time Element — off-premises power (food industry commentary)  
- Amwins / Dentons — abuse & molestation exclusions on CGL (Canada)  
- *Paul v. Hindu Sabha*, 2025 ONSC 6183 — abuse exclusion interpretation  

### Internal benchmarks (frozen routes)
- `/restaurant-insurance/` — AGCO liquor precision standard  
- `/convenience-store-insurance/` — retail food + AGCO retail alcohol + crime  
- `/non-profit-insurance/` — volunteer/WSIB/abuse hedging  
- `/directors-officers-insurance/` — Side A/B/C precision  
- `/product-recall-insurance/` — recall vs product liability  
- `/crime-fidelity-insurance/` — employee dishonesty distinction  

---

**STOP FOR OWNER REVIEW** — Phase 2 implementation requires owner approval of decisions M.A–M.G and grocery visual-family flag.
