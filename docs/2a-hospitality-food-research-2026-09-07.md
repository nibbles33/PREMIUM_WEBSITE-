# 2A Research — Hospitality/Food Risk Family

**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Date:** 2026-09-07  
**Scope:** Research + content architecture only — **NO WEBSITE CHANGES**  
**Routes:** 6 D2 hospitality/food routes (Restaurant, Liquor Liability, Food Truck, Hotel/Motel, Event Liability, Convenience Store)  
**Status:** **STOP FOR OWNER REVIEW** — do not implement copy until approved

---

## Stop gates

- **NO MERGE · NO DEPLOY · NO VERCEL PROMOTION**
- **NO CONTENT CHANGES · NO AUDIT SCRIPT CHANGES · NO SHARED COMPONENT CHANGES**
- **Pharmacy excluded** — remains D2 in audit matrix; receives D3-level individual research on its own turn (not part of this batch)

---

## Category legend (apply throughout)

Every research finding and proposed content statement is tagged with one primary category:

| Tag | Meaning |
|-----|---------|
| **[COVERAGE]** | An insurance product or policy coverage a customer could purchase |
| **[UNDERWRITING]** | Something an insurer evaluates when deciding whether/how to write a policy — not itself a coverage |
| **[REGULATORY]** | Something Ontario law, AGCO, municipal rules, or public health requires — not itself an insurance product |
| **[EXPOSURE]** | A real operational risk the business faces — may or may not map to a specific purchasable coverage |

**Critical rule:** Do not write **[REGULATORY]** or **[EXPOSURE]** facts as if they were **[COVERAGE]**. Example of the error to avoid: *"AGCO requires liquor liability insurance"* or *"convenience stores sell lottery products"* does **not** automatically mean there is a named insurance coverage to advertise for that fact.

---

## Current-state audit snapshot (6 routes)

All six routes are Class **D** with a single **HIGH** flat *"Covers…"* card description and **0** Practical Considerations. See `docs/d2-kickoff-2026-09-07.md` for per-route flag quotes.

| Route | Flagged card | Current FAQ issue to fix in proposed copy |
|-------|--------------|-------------------------------------------|
| `/restaurant-insurance/` | Property Coverage — *"Covers your building…"* | FAQ says liquor liability *"commonly required by landlords and licensing bodies"* — conflates regulatory vs contractual vs coverage |
| `/liquor-liability-insurance/` | Patron Injury & Property Damage — *"Covers claims…"* | FAQ asks *"Does AGCO require liquor liability?"* — answer implies licensing bodies require it; **AGCO does not mandate liquor liability insurance for licence issuance** |
| `/food-truck-insurance/` | Commercial Auto — *"Covers the truck…"* | Templated FAQ pattern; no commissary/mobile-premises regulatory context |
| `/hotel-motel-insurance/` | Commercial Property — *"Covers the building…"* | FAQ *"Yes — serving alcohol requires liquor liability"* — oversimplifies; AGCO licensing ≠ insurance mandate |
| `/event-liability-insurance/` | Third-Party Bodily Injury — *"Covers claims…"* | `coverageIntro` uses flat *"Event liability covers…"* — not flagged but needs hedging |
| `/convenience-store-insurance/` | Commercial Property — *"Covers…tobacco and lottery products"* | Embeds inventory/regulatory product assertion inside a flat coverage guarantee |

---

# Layer 1 — Shared Foundation (Ontario hospitality/food)

Reusable across all six routes unless a route module explicitly overrides. Findings are tagged by category.

---

## 1.1 Property — building, contents, fixtures

**[COVERAGE]** *Commercial property* insurance (often packaged in a business owner's policy or standalone commercial property form) may help cover the insured's **building** (if owned or required to insure under lease), **business personal property** (contents, inventory, stock in trade), and **tenant improvements/betterments** (leasehold improvements, fixtures). What is covered, how values are established, and how claims are paid depend on **causes of loss**, **limits**, **deductibles**, and **endorsements** in the specific policy — not on industry type alone.

**[UNDERWRITING]** Carriers typically ask about: construction type (frame, masonry, non-combustible); year built/renovated; square footage; cooking exposure (deep fryers, open flame, wood-fired ovens); fire suppression and hood/duct cleaning; distance to hydrant/fire hall; prior losses; and total insured values for building, contents, and business income.

**[EXPOSURE]** Hospitality and food operations carry elevated **fire** exposure from cooking equipment, grease accumulation, and high electrical load. **Water damage** from suppression systems, plumbing, or neighbouring units is common in multi-tenant buildings. **Theft** of cash, alcohol, and high-value inventory affects both food service and retail formats.

**Sources:** Industry/brokerage framing consistent with IBC commercial property concepts; no Ontario statute mandates commercial property insurance for general restaurants (contrast daycare — O. Reg. 137/15 s. 71 — which is **not** part of this family).

---

## 1.2 Premises / general liability

**[COVERAGE]** *Commercial general liability (CGL)* may help respond to certain **third-party bodily injury**, **property damage**, and (where included) **personal and advertising injury** claims arising from business operations and premises, subject to policy terms, exclusions, and limits. This is distinct from professional liability, liquor liability, product liability extensions, and employer liability.

**[EXPOSURE]** Common hospitality/food premises claims include **slip-and-fall** (wet floors, ice at entrances, parking lots), **trip hazards**, **burns/scalds**, **allergic reactions** (where not excluded or addressed elsewhere), and **off-premises** incidents tied to catering or delivery.

**[UNDERWRITING]** Carriers evaluate: seating capacity; annual revenue; liquor sales percentage (where applicable); prior liability claims; contract requirements; and whether operations include high-hazard activities (live entertainment, dancing, outdoor patios, amusement devices).

**[REGULATORY]** Ontario **Occupiers' Liability Act** imposes a duty on occupiers to take reasonable care to see that persons entering premises are reasonably safe — this creates **legal liability exposure**, not an insurance product by itself. Public health and fire codes affect operational compliance but do not create named insurance coverages.

**Sources:** Occupiers' Liability Act, R.S.O. 1990, c. O.2 (regulatory/legal context); CGL as standard commercial product (industry).

---

## 1.3 Food operations — spoilage, contamination, food safety

**[EXPOSURE]** Food businesses face **foodborne illness** allegations, **contamination** (physical, chemical, biological), **cross-contamination**, **improper holding temperatures**, and **allergen** incidents. A single outbreak allegation can generate multiple third-party claims and reputational harm.

**[COVERAGE]** *Product liability* or *products-completed operations* coverage (often part of CGL or available by endorsement) may address certain claims alleging **injury or illness caused by food products** sold or served, subject to exclusions and policy wording. This is **not** the same as regulatory food-safety compliance.

**[COVERAGE]** *Spoilage* or *food contamination* endorsements (where available) may address **financial loss from spoiled inventory** from specified causes — distinct from liability coverage.

**[REGULATORY]** Ontario **O. Reg. 493/17** (*Food Premises*, under the Health Protection and Promotion Act) sets minimum standards for food premises, including:
- **s. 32:** every operator of a **food service premise** must ensure at least one **food handler or supervisor** with completed food handler training is on site **during every hour of operation**.
- **s. 33:** food handler hygiene and illness requirements.
- Definitions include **mobile food premises** and **food handler training** standards.

Food handler certification is typically valid **five years** (Ministry/public health guidance). Inspection and enforcement are through **local public health units** — not an insurance product.

**[UNDERWRITING]** Insurers may ask about HACCP practices, supplier traceability, cooking/holding procedures, and prior health-unit orders or closures.

**Sources:** O. Reg. 493/17 — https://www.ontario.ca/laws/regulation/170493/ ; Food Premises Reference Document, 2019 (Ontario Ministry of Health); Operational Approaches for Food Safety Guideline, 2019 (Ontario Ministry of Health).

---

## 1.4 Equipment — kitchen, refrigeration, POS

**[EXPOSURE]** Sudden **mechanical or electrical breakdown** of refrigeration, ovens, fryers, HVAC, or POS systems can halt service and trigger repair/replacement costs. **Power interruption** may cause cascading inventory loss.

**[COVERAGE]** *Equipment breakdown* (boiler and machinery) coverage — where purchased — may address sudden and accidental breakdown of covered equipment, distinct from standard property "named perils" or all-risk forms. **Inland marine** or **equipment floaters** may cover mobile or scheduled equipment (relevant to food trucks).

**[UNDERWRITING]** Equipment schedules, maintenance records, age/condition of refrigeration, and backup power may be requested.

**Sources:** Industry standard equipment breakdown product descriptions (brokerage/insurer filings); not Ontario-regulated as a mandatory coverage.

---

## 1.5 Refrigeration / spoilage (specific exposure)

**[EXPOSURE]** Perishable inventory concentration makes **refrigeration failure** and **power outage** a high-severity loss scenario for restaurants, grocers, food trucks with onboard coolers, and convenience stores with extensive cold chain.

**[COVERAGE]** *Spoilage* endorsements may cover inventory loss from temperature change caused by specified equipment failure or power interruption — **cause and sublimit matter**. Base property forms often **exclude** or narrowly cover spoilage without endorsement.

**[UNDERWRITING]** Insurers may ask about cooler redundancy, generator/backup power, temperature monitoring, and inventory values at risk.

**Sources:** Industry endorsement practice; no Ontario statute creates a "spoilage insurance" requirement.

---

## 1.6 Business interruption

**[COVERAGE]** *Business interruption* / *business income* coverage (often tied to commercial property) may help with **lost income** and certain **continuing expenses** when operations are suspended due to a **covered direct physical loss** to insured property, subject to waiting periods, limits, and policy terms.

**[EXPOSURE]** Hospitality businesses often have thin margins and fixed costs (rent, payroll, loan payments) — even short closures from fire, water, or equipment loss can be material.

**[UNDERWRITING]** Carriers typically require **business income worksheets** (revenue, seasonality, payroll, fixed costs) and may distinguish partial vs. full suspension.

**Sources:** Industry standard BI coverage concepts.

---

## 1.7 Employees — foundational employment exposure

**[REGULATORY]** Ontario **Workplace Safety and Insurance Act** — most employers must register with **WSIB** and provide workplace insurance coverage for workers. This is a **statutory workplace insurance system**, not a commercial CGL/EPL product.

**[COVERAGE]** *Employers liability* (often part of commercial auto or CGL structure) and *Employment Practices Liability (EPL)* are **distinct optional coverages** — not assumed in base hospitality packages. This batch does not deep-dive EPL; flag for owner if any route needs an EPL card later.

**[EXPOSURE]** Kitchen burns/cuts, lifting injuries, slip injuries, and workplace violence (including late-night retail/hospitality) are common. Staff turnover and training gaps affect both regulatory compliance and claim frequency.

**[UNDERWRITING]** Payroll, number of employees, roles (kitchen vs. serving vs. security), and prior WSIB experience may be requested.

**Sources:** WSIB Ontario (regulatory); industry coverage distinctions (brokerage).

---

## 1.8 Delivery / off-premises operations

**[EXPOSURE]** Restaurants, hotels with room service, convenience stores with delivery, and food trucks operating at **events, festivals, and temporary sites** extend liability and property exposure **beyond the primary address**.

**[COVERAGE]**
- *Commercial auto* — for **owned** delivery vehicles.
- *Hired and non-owned auto (HNOA)* — may address certain **liability** when employees use **personal or rented** vehicles for business deliveries (not physical damage to those vehicles).
- *General liability* — may extend to **off-premises operations** and catering locations depending on policy wording — **not automatic**.

**[UNDERWRITING]** Insurers ask: delivery radius; percentage of sales from delivery; use of third-party apps (DoorDash, Uber Eats, etc.); driver screening; and whether drivers use personal vehicles.

**[REGULATORY]** Third-party delivery platform agreements are **contractual** — they may impose insurance certificate requirements on the operator (**[UNDERWRITING]** / contractual, not a provincial statute).

**Sources:** Industry HNOA/commercial auto practice; FSRA regulates **automobile insurance** in Ontario (relevant boundary for food truck **vehicle** coverage — see Food Truck module).

---

## 1.9 Contractual exposures

**[EXPOSURE]** Leases, supplier agreements, franchise agreements, event venue contracts, and municipal permits often impose **certificate of insurance**, **additional insured**, **waiver of subrogation**, or **minimum limit** requirements.

**[UNDERWRITING]** Brokers need copies of **lease clauses**, **franchisor specs**, and **event contracts** to structure limits and endorsements.

**[REGULATORY]** Contractual requirements are **not** the same as government-mandated insurance products — though failure to comply can prevent operations (e.g., losing a lease or event permit).

**Sources:** Common commercial lease/franchise practice (industry).

---

## 1.10 Underwriting information — generally requested (hospitality/food)

Typical quote intake across this family:

| Information | Category | Why it matters |
|-------------|----------|----------------|
| Business legal name, years in operation, revenue/payroll | [UNDERWRITING] | Rating and eligibility |
| Address(es), owned vs. leased, construction, sq ft | [UNDERWRITING] | Property and liability rating |
| Seating capacity, hours, seasonal peaks | [UNDERWRITING] | Occupancy and BI |
| Cooking methods (deep fryer, wood oven, open flame) | [UNDERWRITING] | Fire suppression underwriting |
| Liquor sales % / licensed vs. unlicensed | [UNDERWRITING] | Liquor liability eligibility |
| Delivery model (in-house, apps, catering) | [UNDERWRITING] | Auto/HNOA/GL extension |
| Equipment list and values | [UNDERWRITING] | Property/equipment breakdown |
| Inventory values (food, alcohol, tobacco, lottery) | [UNDERWRITING] | Property limits |
| Prior claims (5 years) | [UNDERWRITING] | Experience rating |
| Leases, franchise, event contracts | [UNDERWRITING] | Additional insured/limit needs |
| WSIB clearance / payroll | [REGULATORY] + [UNDERWRITING] | Compliance and EL exposure |

---

## 1.11 Ontario-specific considerations (broad hospitality/food)

| Topic | Category | Summary |
|-------|----------|---------|
| **Food Premises Regulation (O. Reg. 493/17)** | [REGULATORY] | Food service operators must meet public health standards; certified food handler on site during all operating hours (food service premises). |
| **Municipal business licensing** | [REGULATORY] | Many Ontario municipalities require business licences for restaurants, food vendors, and retailers — requirements vary by municipality (e.g., City of Windsor business licensing). **Not** a standardized provincial insurance mandate. |
| **Fire Code / OBC compliance** | [REGULATORY] | Commercial kitchens, assembly occupancies, and lodging often subject to fire and building inspections — operational compliance, not an insurance product. |
| **WSIB registration** | [REGULATORY] | Employer workplace insurance obligation for most Ontario employers. |
| **Occupiers' Liability Act** | [REGULATORY] | Statutory framework for premises safety duties — creates liability exposure CGL may address if purchased. |
| **No general provincial mandate for CGL/property insurance** | [REGULATORY] | Unlike licensed daycare (O. Reg. 137/15 s. 71), generic restaurants/hotels/c-stores are **not** universally required by Ontario statute to carry CGL — though **landlords, franchisors, lenders, and event venues commonly require it contractually** [UNDERWRITING]. |

**Sources:** O. Reg. 493/17; Occupiers' Liability Act; municipal business licensing pages (verify per municipality when implementing local Windsor-Essex copy); WSIB (regulatory).

---

# Layer 2 — Route-Specific Modules

---

## Module A — AGCO / Liquor (reference block)

Use this block **only where the route module says "AGCO module applied."** Do not paste wholesale onto routes where alcohol is absent or uncommon.

### AGCO licensing landscape (Ontario) — regulatory facts

| Licence / permit | Category | What it authorizes | Source |
|------------------|----------|-------------------|--------|
| **Liquor Sales Licence** | [REGULATORY] | Store, sell, or serve liquor for **on-site consumption** (restaurants, bars, lounges, nightclubs, hotel bars) | AGCO — Liquor Sales Licence |
| **Mini Bar Licence** | [REGULATORY] | Smaller consumption-premises format | AGCO — Section 1: Liquor Sales Licences |
| **Convenience Store Licence** | [REGULATORY] | **Retail** sale of beer, wine (incl. cider), RTD beverages in eligible stores ≤4,000 sq ft retail floor space (expanded market since Sept 5, 2024) | AGCO — Convenience/Grocery Store Licences |
| **Grocery Store Licence** | [REGULATORY] | Retail alcohol in stores >4,000 sq ft | AGCO — Apply for convenience/grocery licence |
| **Special Occasion Permit (SOP)** | [REGULATORY] | Temporary sale/service of alcohol at events **outside** licensed establishments (private events, public/charity events, BYO events in specified circumstances) — **distinct from permanent premises licence** | AGCO — SOP Guide |
| **Caterer's Endorsement** | [REGULATORY] | Add-on to existing **Liquor Sales Licence** — sell/serve at off-site events up to 10 days; **not** available as standalone mobile food-truck licence | AGCO — Section 3: Endorsements |
| **Retail sales hours (c-store/grocery licence)** | [REGULATORY] | 7:00 a.m. – 11:00 p.m.; LCBO is exclusive wholesaler; staff 18+ with AGCO-approved training | AGCO — Selling alcohol in c-stores/grocery |

### Liquor liability — insurance vs. licensing

| Statement | Category | Verified? |
|-----------|----------|-----------|
| Licensees may face **civil liability** for harm caused by patrons served liquor | [EXPOSURE] + [REGULATORY] context | Yes — AGCO guides advise consulting legal/insurance advisors; LLCA civil liability framework |
| **AGCO does not require proof of liquor liability insurance** as a condition of obtaining a Liquor Sales Licence | [REGULATORY] | Yes — LLCA licensing conditions do not include mandatory liability insurance (Toronto Council report, 2001, analyzing LLCA; AGCO guides recommend insurance professional consultation but do not mandate product) |
| **Landlords, municipalities, event venues, and franchisors** may require liquor liability certificates | [UNDERWRITING] + contractual | Yes — common commercial practice; distinct from AGCO licensing mandate |
| **Smart Serve / AGCO server training** | [REGULATORY] | Required for staff selling/serving under LLCA standards — training certificate, not an insurance coverage |
| **Liquor liability insurance** as purchasable coverage | [COVERAGE] | Commercial product addressing alcohol-related liability often **excluded from standard CGL** — must be confirmed in policy |

**Sources (authoritative):** AGCO Liquor Sales Licence Guide (Section 1); AGCO SOP Guide; AGCO Convenience Store Licence Obligation Guide; AGCO Selling alcohol in convenience and grocery stores; Toronto CA report on liquor liability insurance (2001) — https://www.toronto.ca/legdocs/2001/agendas/council/cc010724/plt8rpt/cl010.pdf

---

## 2.1 Restaurant — calibration route (FULL DRAFT-READY PROPOSAL)

**Route:** `/restaurant-insurance/`  
**AGCO module:** **APPLIED** — for operators with Liquor Sales Licence / on-site alcohol service (subset of all restaurants; page must serve both licensed and unlicensed models)  
**Coverage Explorer:** Existing interactive explorer — **implementation must preserve** `restaurant-insurance` explorer config (out of scope for this research task)

### Research findings (restaurant-specific)

| Finding | Category |
|---------|----------|
| Full-service and QSR restaurants combine **kitchen fire**, **food illness**, **slip/fall**, **liquor** (if licensed), **delivery**, and **seasonal patio** exposures | [EXPOSURE] |
| Deep fryers, grease hoods, and wood-fired cooking drive **property and liability underwriting** | [UNDERWRITING] |
| Liquor Sales Licence required for on-site sale/service of alcohol (not for alcohol-free restaurants) | [REGULATORY] |
| Smart Serve/server training required for staff under LLCA standards where alcohol sold/served | [REGULATORY] |
| Food handler on site all hours of operation (food service premise) | [REGULATORY] |
| Liquor liability as distinct coverage when alcohol served | [COVERAGE] |
| Equipment breakdown + spoilage endorsements for cooler/power failure | [COVERAGE] |
| HNOA/commercial auto when delivery uses vehicles | [COVERAGE] |

### Proposed hero / intro

**Headline:** *(unchanged)* Restaurant Insurance

**Subhead (proposed — draft-ready):**

> Restaurants in Windsor–Essex combine busy dining rooms, commercial kitchens, and — for many operators — AGCO-licensed alcohol service. Insurance needs to reflect those overlapping exposures: guest injury on your premises, property loss affecting kitchen equipment and inventory, food-related illness claims, and (where you serve alcohol) liability that standard general liability often excludes or limits. Ontario food service premises must also meet public health rules under O. Reg. 493/17, including having a certified food handler on site during operating hours — a regulatory requirement separate from what your insurance policy covers. A broker can help align property, liability, and optional endorsements to how your restaurant actually operates.

**coverageIntro (proposed):**

> Coverage options commonly reviewed for restaurants — from premises liability and property to liquor liability and spoilage — depend on your licence status, kitchen equipment, delivery model, and lease requirements.

---

### Proposed coverage cards (6) — with category labels

| # | Card title | Category | Proposed description (draft-ready) |
|---|------------|----------|-----------------------------------|
| 1 | **General Liability** | [COVERAGE] | Helps protect against certain third-party bodily injury and property-damage claims arising from restaurant operations and your premises — such as slip-and-fall incidents in the dining room or parking area — subject to policy terms, exclusions, and limits. |
| 2 | **Commercial Property** | [COVERAGE] | May help cover your building (if owned or required under lease), tenant improvements, furniture, fixtures, and kitchen equipment against covered causes of loss, depending on how the policy is structured and which perils or endorsements apply. |
| 3 | **Liquor Liability** | [COVERAGE] | Where you hold an AGCO Liquor Sales Licence or otherwise sell or serve alcohol, liquor liability may address certain claims tied to alcohol service — a distinct coverage from general liability, which often excludes or limits liquor-related claims. Confirm inclusion with your broker; AGCO licensing itself does not substitute for insurance. |
| 4 | **Product Liability / Food Illness** | [COVERAGE] | May respond to certain claims alleging illness or injury from food you prepared or served, often as part of products-completed operations coverage within a CGL policy or by endorsement — scope and exclusions vary by carrier and wording. |
| 5 | **Equipment Breakdown & Spoilage** | [COVERAGE] | Equipment breakdown coverage may address sudden mechanical or electrical failure of covered kitchen or refrigeration equipment; spoilage endorsements may address inventory lost due to temperature change from specified causes — neither is automatic in a base property policy. |
| 6 | **Business Interruption** | [COVERAGE] | May help with lost business income and certain continuing expenses when a covered property loss forces you to close or scale back service, subject to waiting periods, limits, and policy terms — particularly relevant where payroll and rent continue during repairs. |

**Optional detail panels (for explorer parity — propose if owner wants Daycare-level depth):**

- **GL detail:** Distinguish dining room vs. patio vs. parking lot occupier exposures.
- **Liquor detail:** Civil liability under LLCA vs. purchasable liquor liability coverage; Smart Serve as regulatory training.
- **Spoilage detail:** Power outage vs. equipment failure — different policy triggers.

---

### Proposed Practical Considerations (9 items — draft-ready)

| # | Title | Body | Primary category |
|---|-------|------|------------------|
| 1 | **Disclosures your broker typically needs** | Cuisine type, seating capacity, cooking methods (deep fryer, open flame, wood-fired oven), hours, delivery/catering model, and whether you hold an AGCO Liquor Sales Licence. | [UNDERWRITING] |
| 2 | **Food safety is regulatory — not an insurance substitute** | O. Reg. 493/17 requires at least one certified food handler on site during all operating hours at food service premises. Compliance reduces illness risk but does not replace liability coverage. | [REGULATORY] |
| 3 | **Liquor licensing ≠ liquor liability insurance** | AGCO issues Liquor Sales Licences for eligible premises; AGCO guides note civil liability exposure and recommend consulting an insurance professional — but **liquor liability insurance is not stated as a licence issuance requirement**. Landlords and contracts may still require proof. | [REGULATORY] + [COVERAGE] |
| 4 | **Delivery and app-based orders** | In-house or third-party delivery can create **commercial auto** or **hired/non-owned auto** exposures when staff use personal vehicles. Disclose your delivery model — platform agreements may impose certificate requirements. | [EXPOSURE] + [UNDERWRITING] |
| 5 | **Kitchen fire and suppression maintenance** | Hood/duct cleaning, fire suppression inspection, and fryer protocols affect both fire code compliance and property underwriting. | [REGULATORY] + [UNDERWRITING] |
| 6 | **Patio and seasonal operations** | Outdoor seating may require municipal encroachment agreements and AGCO licensing of outdoor areas. Seasonality affects business income projections. | [REGULATORY] + [UNDERWRITING] |
| 7 | **Lease and franchisor requirements** | Leases often specify minimum liability limits, additional insured status, and evidence of property coverage. Franchise manuals may add requirements. | [UNDERWRITING] |
| 8 | **WSIB and kitchen employee injuries** | Most Ontario employers must carry WSIB coverage for workers. WSIB is separate from commercial general liability. | [REGULATORY] |
| 9 | **Did you know?** | Municipal business licences, fire inspections, and health-unit inspections are operational/regulatory requirements — not insurance coverages. They are listed here to explain why restaurant risk profiles differ from generic retail. | [REGULATORY] |

---

### Proposed FAQ (5 items — draft-ready)

| Question | Proposed answer | Notes |
|----------|-----------------|-------|
| **Do I need liquor liability if I serve alcohol?** | If you sell or serve alcohol under an AGCO Liquor Sales Licence, liquor liability is commonly purchased because general liability often excludes or limits liquor-related claims. AGCO does not list liquor liability insurance as a licence requirement, but landlords, lenders, and contracts may require proof — confirm what your lease and licence conditions actually require. | Fixes current FAQ conflating "licensing bodies require" with AGCO mandate |
| **Is food spoilage from a power outage covered?** | Sometimes — often through spoilage or equipment breakdown endorsements, not the base property form alone. Coverage depends on the cause of the outage (on-premises equipment failure vs. widespread grid failure) and your policy wording. | [COVERAGE] hedged |
| **Do I need coverage for delivery drivers?** | If staff deliver in company or personal vehicles, commercial auto and/or hired and non-owned auto exposures should be reviewed. Third-party delivery platforms may impose their own insurance requirements in vendor agreements. | [COVERAGE] + [UNDERWRITING] |
| **What food safety rules apply in Ontario?** | Food service premises must comply with O. Reg. 493/17, including food handler certification on site during operating hours. Public health units inspect and enforce these rules — separate from your insurance policy. | [REGULATORY] — not framed as coverage |
| **What information do I need for a restaurant quote?** | Cuisine type, seating capacity, liquor sales percentage (if licensed), hours, cooking methods, location and construction details, equipment and inventory values, delivery model, prior claims, and any lease or franchisor insurance requirements. | [UNDERWRITING] |

---

### Restaurant — implementation notes for owner

- Expand from **4 → 6** coverage cards (add Product Liability/Food Illness and Business Interruption; split current combined Equipment/Spoilage card per proposed wording).
- Add **9** consideration cards (currently absent).
- Replace **4** FAQs with **5** proposed FAQs above.
- Hedging pattern: follow Daycare Class A — *"Helps protect"*, *"May help cover"*, *"subject to policy terms"*.
- **Do not break** Coverage Explorer zone mapping for `restaurant-insurance`.

---

## 2.2 Liquor Liability — AGCO-primary route

**Route:** `/liquor-liability-insurance/`  
**AGCO module:** **FULLY APPLIED** — this route exists specifically for alcohol-regulated liability exposure

### Research findings

| Finding | Category |
|---------|----------|
| LLCA creates framework for licensing and **civil liability** for overservice/harm | [REGULATORY] + [EXPOSURE] |
| Liquor Sales Licence, SOP, Caterer's Endorsement, and Convenience/Grocery Store Licence are **different regulatory instruments** with different service/sale models | [REGULATORY] |
| Liquor liability **insurance** is a commercial product; **not** synonymous with obtaining any AGCO licence | [COVERAGE] vs [REGULATORY] |
| Smart Serve / AGCO-approved training for servers and retail staff | [REGULATORY] |
| Assault & battery coverage may be **limited or excluded** in liquor policies — wording matters | [COVERAGE] + [UNDERWRITING] |
| Host liquor / event liquor for SOP events or BYO models | [COVERAGE] — distinct underwriting |

### Proposed hero direction

Focus on **civil liability exposure from alcohol service** and the **CGL exclusion gap** — not on "AGCO requires this insurance."

**Subhead (direction):**

> When a patron is overserved or alcohol contributes to an injury, property damage, or other harm, Ontario licensees can face civil claims — separate from AGCO administrative penalties. Liquor liability insurance is designed to address many alcohol-related liability claims that standard general liability excludes or limits. Holding an AGCO licence authorizes legal alcohol sale/service; it does not automatically include insurance.

### Proposed coverage cards (direction + categories)

| Card | Category | Direction |
|------|----------|-----------|
| **Patron Injury & Property Damage** | [COVERAGE] | Hedged: *"May help with certain claims alleging harm tied to alcohol served at your licensed premises or permitted event, subject to policy terms"* — remove flat *"Covers claims…"* |
| **Assault & Battery** | [COVERAGE] | Keep *"May address…subject to policy terms"* pattern; note exclusions common |
| **Legal Defence** | [COVERAGE] | Hedged: defence costs **for covered claims** — not all claims |
| **Host / Event Liquor** | [COVERAGE] | For SOP events, BYO functions, or temporary service without permanent licence — distinct from premises liquor liability |
| *(Optional 5th)* **Retail Alcohol Sales (C-store/Grocery licence)** | [COVERAGE] | Only if owner wants product page to address **off-premise retail** exposure under Convenience Store Licence — otherwise cross-link to c-store route |

### Proposed Practical Considerations (direction — 7–9 items)

1. **Licence type matters** [REGULATORY] — Liquor Sales Licence vs. SOP vs. Caterer's Endorsement vs. retail licence.
2. **AGCO does not mandate liquor liability insurance for licence issuance** [REGULATORY] — cite AGCO guide language on consulting insurance professionals.
3. **Landlord / venue / municipal contract requirements** [UNDERWRITING].
4. **Smart Serve and responsible service** [REGULATORY] — may also be **[UNDERWRITING]** for insurers.
5. **Sales mix and hours** [UNDERWRITING] — late-night bar vs. restaurant with wine only.
6. **Security and crowd control** [EXPOSURE] + [UNDERWRITING].
7. **Did you know?** — Administrative penalties (licence suspension) are AGCO enforcement — separate from civil lawsuits insurance may address [REGULATORY] vs [COVERAGE].

### Proposed FAQ directions

| FAQ direction | Category focus |
|---------------|----------------|
| **Does AGCO require liquor liability insurance?** | Answer: **No** for licence issuance per LLCA/AGCO guides; landlords/contracts may require proof [REGULATORY] vs [UNDERWRITING]. **Fix current live FAQ.** |
| **Is liquor liability included in restaurant insurance?** | Often packaged but distinct — confirm [COVERAGE]. |
| **What is the difference between a Liquor Sales Licence and a Special Occasion Permit?** | Permanent premises vs. temporary event authorizations [REGULATORY]. |
| **Does Smart Serve affect my insurance?** | Training is regulatory; insurers may ask for documentation [REGULATORY] + [UNDERWRITING]. |
| **Are BYO events covered?** | Host liquor coverage may be needed; SOP rules may apply [REGULATORY] + [COVERAGE]. |

---

## 2.3 Food Truck & Trailer

**Route:** `/food-truck-insurance/`  
**AGCO module:** **PARTIAL / CONDITIONAL** — see AGCO flag section below

### Research findings

| Finding | Category |
|---------|----------|
| **Mobile food premises** defined under O. Reg. 493/17 — subject to public health inspection | [REGULATORY] |
| Commissary/kitchen prep requirements vary by public health unit | [REGULATORY] |
| Dual exposure: **commercial auto** (vehicle on road) + **GL/property/product** (food operation) | [COVERAGE] + [EXPOSURE] |
| **Commercial Auto boundary:** FSRA-regulated automobile insurance for licensed vehicles; food equipment and business liability are **separate** policy components — do not duplicate full Commercial Auto route | [COVERAGE] boundary |
| Event/fair permits often require **certificates of insurance** with additional insured | [UNDERWRITING] |
| Alcohol at food trucks: **No standalone mobile bar licence.** Alcohol service typically via **Caterer's Endorsement** on someone else's Liquor Sales Licence, or **SOP** at events — **not common as core food-truck exposure** | [REGULATORY] |

### Proposed hero direction

Emphasize **mobile dual exposure** (vehicle + kitchen) and **temporary locations** — not a static restaurant.

### Proposed coverage cards (direction)

| Card | Category | Direction |
|------|----------|-----------|
| **General Liability** | [COVERAGE] | Events, parks, private property — hedged premises/operations wording |
| **Commercial Auto** | [COVERAGE] | **Cross-link** to `/commercial-auto-insurance/` for fleet depth; hedged: liability and physical damage for owned truck/trailer **subject to FSRA auto policy** |
| **Equipment / Inland Marine** | [COVERAGE] | Fitted kitchen equipment, generators — may not be fully covered by auto physical damage |
| **Product Liability** | [COVERAGE] | Food illness claims — hedged |
| *(Optional)* **Spoilage / Equipment Breakdown** | [COVERAGE] | Onboard refrigeration |

### Proposed Practical Considerations (direction)

1. **Commissary and prep location** [REGULATORY] + [UNDERWRITING].
2. **Event organiser certificate requirements** [UNDERWRITING].
3. **Commercial auto vs. business package boundary** [COVERAGE] — flag, don't duplicate auto route.
4. **Propane/generator fire exposure** [EXPOSURE].
5. **Alcohol service uncommon on trucks** [REGULATORY] — if served, Caterer's Endorsement/SOP path; liquor liability may apply — disclose to broker.
6. **Did you know?** Health unit permits for mobile food premises are regulatory — not insurance products.

### Proposed FAQ directions

- Truck as vehicle **and** as business — two policy components [COVERAGE].
- Event/fair insurance certificates [UNDERWRITING].
- Equipment breakdown vs. auto physical damage [COVERAGE].
- **Do food trucks need liquor liability?** — Only if legally serving/selling alcohol under AGCO authorization; most trucks do not [REGULATORY] + [COVERAGE].

---

## 2.4 Hotel & Motel

**Route:** `/hotel-motel-insurance/`  
**AGCO module:** **CONDITIONAL** — only for subset with on-site bar/restaurant under Liquor Sales Licence

### Research findings

| Finding | Category |
|---------|----------|
| **Innkeepers Act** (R.S.O. 1990, c. I.7) — statutory **limit on innkeeper liability for guest goods** ($40 cap unless safe-deposit exception/wilful act) | [REGULATORY] — **not** guest-property insurance |
| Guest **personal property** generally **excluded** from hotel property policies — guests use travel/home insurance | [COVERAGE] exclusion pattern |
| Pool/spa, gyms, parking lots — **premises liability** underwriting | [EXPOSURE] + [UNDERWRITING] |
| On-site restaurant/bar — **Liquor Sales Licence** + liquor liability [REGULATORY] + [COVERAGE] |
| Extended-stay / RTA boundary — occupancy character affects legal framework | [REGULATORY] — mention carefully, not deep-dive |
| Business interruption tied to **room revenue seasonality** | [COVERAGE] + [UNDERWRITING] |

### Proposed hero direction

Overnight hospitality — rooms, amenities, guest injury — distinguish **operator property/liability** from **guest belongings**.

### Proposed coverage cards (direction)

| Card | Category | Direction |
|------|----------|-----------|
| **Commercial Property** | [COVERAGE] | Building, furnishings, linens, equipment — hedged (*"May help cover…covered causes of loss"*) |
| **General Liability** | [COVERAGE] | Guest slip/fall, common areas, pool/spa — hedged |
| **Business Interruption** | [COVERAGE] | Room revenue loss from covered property damage |
| **Liquor Liability** | [COVERAGE] | **Conditional card copy:** *"If you operate a licensed bar or restaurant on site…"* — not universal |
| *(Optional 5th)* **Equipment Breakdown** | [COVERAGE] | Boilers, HVAC, commercial laundry |

### Proposed Practical Considerations (direction)

1. **Guest property vs. your property** [REGULATORY] Innkeepers Act + [COVERAGE] exclusions.
2. **Pool/spa safety and fencing** [REGULATORY] + [UNDERWRITING].
3. **Licensed on-site alcohol service** [REGULATORY] — AGCO module subset.
4. **Occupancy and seasonality** [UNDERWRITING].
5. **Parking lot and vehicle theft exposure** [EXPOSURE] — operator liability may differ from guest vehicle coverage.
6. **Did you know?** Posting Innkeepers Act s. 4 notice affects statutory limitation defence [REGULATORY].

### Proposed FAQ directions

- Guest belongings — excluded; Innkeepers Act limits [REGULATORY] + [COVERAGE].
- Hotel bar liquor liability — conditional on licensed service [COVERAGE].
- Pool/spa — liability underwriting [UNDERWRITING].
- Occupancy/BI values [UNDERWRITING].

---

## 2.5 Event Liability

**Route:** `/event-liability-insurance/`  
**AGCO module:** **CONDITIONAL** — where event includes licensed alcohol service via SOP or licensed venue

### Research findings — distinct framing

| Finding | Category |
|---------|----------|
| **Temporary / defined-period** exposure — fundamentally different from ongoing operations | [EXPOSURE] |
| Shares **CGL-type third-party injury/property damage** concepts but often written on **short-term event policy** or endorsement | [COVERAGE] |
| **Does NOT automatically include** property coverage for organiser's own equipment, cancellation, weather — separate products | [COVERAGE] boundary |
| Venue policy protects **venue owner**, not necessarily **event host** | [EXPOSURE] + [UNDERWRITING] |
| Municipal permits often require **minimum limits + additional insured** | [UNDERWRITING] + [REGULATORY] context |
| **SOP** required for most public/charity/BYO alcohol sales outside licensed venues | [REGULATORY] |
| SOP guide: **no requirement to serve food** under SOP, but **prevent intoxication** is permit holder responsibility | [REGULATORY] |
| Inflatables/amusements — often **separate operator policy** or endorsement | [COVERAGE] + [UNDERWRITING] |
| Vendor/exhibitor extension — **optional** coverage structure | [COVERAGE] |

### Shared foundation applicability

| Layer 1 section | Applies to Event? | Notes |
|-----------------|-------------------|-------|
| Property / BI | Partial | Usually **not** core event liability product — flag gap |
| Food operations | Partial | If event serves food — product liability angle |
| Employees | Partial | Volunteers/staff — WSIB may still apply |
| Delivery | Low | Unless event includes off-site catering |
| AGCO / liquor | Conditional | SOP vs. venue licence |

### Proposed hero direction

Short-term **host liability** for a defined date/location — certificates for venues and municipalities.

**Fix `coverageIntro`:** Replace flat *"Event liability covers…"* with hedged language.

### Proposed coverage cards (direction)

| Card | Category | Direction |
|------|----------|-----------|
| **Third-Party Bodily Injury** | [COVERAGE] | Hedged — trips, falls, crowd incidents **subject to policy** |
| **Property Damage to Third Parties** | [COVERAGE] | Rented venue, neighbouring property — hedged |
| **Liquor Liability (Events)** | [COVERAGE] | When alcohol served under SOP or host liquor — **separate or endorsement**; SOP is [REGULATORY] |
| **Vendor / Exhibitor Extension** | [COVERAGE] | Optional — market organisers only |

### Proposed Practical Considerations (direction)

1. **Venue certificate requirements** [UNDERWRITING].
2. **Municipal permit insurance specs** [REGULATORY] context + [UNDERWRITING].
3. **SOP vs. venue Liquor Sales Licence** [REGULATORY].
4. **Amusements/inflatables** — separate coverage [COVERAGE].
5. **Event dates, attendance, activities** — underwriting facts [UNDERWRITING].
6. **Did you know?** Event cancellation/weather is generally **not** event liability — different product [COVERAGE] boundary.

### Proposed FAQ directions

- Single-day policies [COVERAGE].
- Venue insurance vs. host insurance [EXPOSURE].
- Municipal permit limits [REGULATORY] + [UNDERWRITING].
- Alcohol at events — SOP and liquor liability [REGULATORY] + [COVERAGE].

---

## 2.6 Convenience Store & Gas Station

**Route:** `/convenience-store-insurance/`  
**AGCO module:** **CONDITIONAL SUBSET ONLY** — stores with AGCO **Convenience Store Licence** for retail alcohol (expanded Ontario market since Sept 2024); **excluded** for stores without alcohol authorization

### Research findings

| Finding | Category |
|---------|----------|
| High **theft/robbery** exposure — especially late night | [EXPOSURE] |
| **Crime / hold-up** coverage is optional commercial product | [COVERAGE] |
| **Tobacco retail** — federal/provincial licensing and display rules (Smoke-Free Ontario Act, etc.) | [REGULATORY] — **not** "tobacco insurance" |
| **OLG lottery retailer** — requires OLG Retailer Agreement + AGCO **Seller registration** | [REGULATORY] — **not** "lottery insurance" |
| **Fuel / UST** — environmental pollution exposure; TSSA regulates technical standards for fuel equipment | [EXPOSURE] + [REGULATORY] |
| **Pollution liability** — optional coverage for gradual/seepage pollution from tanks | [COVERAGE] |
| **Retail alcohol** (subset): Convenience Store Licence, LCBO wholesale, staff training, 7 a.m.–11 p.m. sales | [REGULATORY] |
| Inventory including tobacco/lottery may be insurable **property** subject to limits and security conditions | [COVERAGE] + [UNDERWRITING] |

### Proposed hero direction

High-traffic retail + optional fuel — **crime, liability, pollution** — explicitly **not** every c-store sells alcohol, lottery, or fuel.

### Proposed coverage cards (direction)

| Card | Category | Direction |
|------|----------|-----------|
| **Commercial Property** | [COVERAGE] | Building, coolers, shelving, inventory — hedged; **remove** flat *"Covers…tobacco and lottery"* opener; mention inventory types as examples **subject to limits/theft conditions** |
| **General Liability** | [COVERAGE] | Slips, pump island, parking lot — hedged |
| **Pollution Liability** | [COVERAGE] | **If fuel tanks** — hedged; not universal to all c-stores |
| **Crime & Hold-Up** | [COVERAGE] | Optional — hedged |

### Proposed Practical Considerations (direction)

1. **Fuel tanks vs. retail-only** [EXPOSURE] — pollution card only where relevant.
2. **Tobacco retail compliance** [REGULATORY] — not a coverage claim.
3. **OLG lottery Seller registration** [REGULATORY] — AGCO gaming registration, not insurance product.
4. **Retail alcohol (if licensed)** [REGULATORY] — Convenience Store Licence obligations; cross-link liquor/regulatory context without inventing "liquor liability" for off-premise retail unless broker confirms product need.
5. **Security cameras, safes, drop schedules** [UNDERWRITING] for crime coverage.
6. **Franchise requirements** [UNDERWRITING].
7. **Did you know?** Selling lottery tickets requires OLG agreement and AGCO Seller registration — regulatory steps separate from property insurance [REGULATORY].

### Proposed FAQ directions

- Gas pumps — property vs. pollution [COVERAGE].
- Lottery/tobacco inventory — property coverage vs. licensing [COVERAGE] + [REGULATORY].
- Hold-up coverage [COVERAGE].
- **Does my c-store need liquor liability?** — Only if selling alcohol under AGCO retail licence; retail alcohol liability framing differs from on-premise service — broker review [REGULATORY] + [COVERAGE].
- Franchise certificates [UNDERWRITING].

---

# AGCO / Liquor Module — Application Matrix

| Route | AGCO module status | Rationale |
|-------|-------------------|-----------|
| **Restaurant** | **APPLIED** (conditional content) | Many restaurants hold Liquor Sales Licence; page must serve unlicensed restaurants too — liquor card and considerations conditional on licence |
| **Liquor Liability** | **FULLY APPLIED** | Route purpose is alcohol-related liability; full licensing vs. insurance distinction required |
| **Food Truck** | **EXCLUDED by default; footnote only** | Ontario food trucks do **not** hold standalone mobile liquor licences; alcohol service is uncommon and requires Caterer's Endorsement on another licence or SOP — mention in considerations, not hero/cards unless owner expands scope |
| **Hotel/Motel** | **CONDITIONAL subset** | Only properties with on-site licensed bar/restaurant — not universal to lodging |
| **Event Liability** | **CONDITIONAL** | SOP and host-liquor context when alcohol served; distinct from permanent Liquor Sales Licence |
| **Convenience Store** | **CONDITIONAL subset** | As of Sept 2024, eligible c-stores **may** hold Convenience Store Licence for **retail** alcohol — AGCO module applies only to that subset; most regulatory content on page should be theft/fuel/lottery/tobacco |

---

# Operational / Regulatory Facts — Resisted as Coverage Claims

These facts were researched and **intentionally NOT written as insurance coverages**:

| Fact | Category | Why not a coverage card |
|------|----------|-------------------------|
| AGCO Liquor Sales Licence / SOP / Convenience Store Licence | [REGULATORY] | Licences authorize legal sale/service — not insurance products |
| Smart Serve / AGCO-approved retail alcohol training | [REGULATORY] | Training certificates — insurers may ask, but not a named coverage |
| O. Reg. 493/17 food handler certification | [REGULATORY] | Public health compliance |
| WSIB employer registration | [REGULATORY] | Statutory workplace insurance system — not CGL |
| OLG Retailer Agreement + AGCO Seller registration for lottery | [REGULATORY] | Gaming retail authorization |
| Tobacco retail licensing/display rules | [REGULATORY] | Compliance context only |
| TSSA fuel equipment technical standards | [REGULATORY] | Equipment regulation — pollution **coverage** is separate optional product |
| Municipal business licences & event permits | [REGULATORY] | Permit to operate — may require insurance proof contractually |
| Innkeepers Act $40 guest-goods cap | [REGULATORY] | Statutory liability limit — not "guest property coverage" |
| LCBO exclusive wholesaler for licensed retail alcohol | [REGULATORY] | Supply chain rule for c-store/grocery licence holders |
| Convenience stores "sell lottery/tobacco" | [EXPOSURE] + [REGULATORY] | Inventory/theft exposure may exist; **no** "lottery insurance" or "tobacco insurance" product to advertise |
| Selling alcohol at c-stores (post-2024 expansion) | [REGULATORY] | Does **not** automatically mean a standard liquor liability card applies unchanged — retail vs. on-premise service models differ; broker confirmation |

---

# Sources Used

### Authoritative / regulatory (primary)

| Source | Used for |
|--------|----------|
| **AGCO** — Liquor Sales Licence overview | On-site consumption licensing |
| **AGCO** — Section 1 & 3 Licence Guides | Licensing responsibilities, Caterer's Endorsement |
| **AGCO** — Special Occasion Permit Guide | Temporary event alcohol rules |
| **AGCO** — Convenience Store Licence Obligation Guide; Selling alcohol in c-stores/grocery | Retail alcohol expansion, training, hours |
| **AGCO** — Apply/Manage convenience or grocery store licence | Eligibility, fees, floor-space thresholds |
| **AGCO** — Lottery retailers (Sellers) registration; Seller Application Guide | OLG seller registration — regulatory |
| **O. Reg. 493/17** (Food Premises) | Food handler, mobile food premises, hygiene |
| **Ontario Innkeepers Act**, R.S.O. 1990, c. I.7 | Guest property liability cap |
| **Occupiers' Liability Act**, R.S.O. 1990, c. O.2 | Premises duty of care |
| **Toronto CA Report** (2001) — Liability Insurance for Premises Licensed to Sell Liquor | LLCA does not mandate liability insurance for licence |
| **OLG Retailer Policy Manual** | Seller registration requirements |

### Industry / brokerage (secondary — coverage descriptions)

| Source | Used for |
|--------|----------|
| IBC / standard commercial insurance concepts | CGL, property, BI, equipment breakdown, crime, pollution — general product framing |
| Existing site copy (`commercial-industries.ts`, `commercial-products-specialty.ts`) | Current-state gaps and audit flags |
| `docs/d2-kickoff-2026-09-07.md` | D2 inventory and batch rationale |
| `docs/daycare-content-implementation-2026-09-07.md` | Class A calibration pattern for Restaurant draft |

### Verify at implementation (not required for architecture approval)

| Item | Why |
|------|-----|
| City of Windsor business licensing specifics | Local regulatory citations in hero if desired |
| TSSA UST registration details for fuel pages | Pollution consideration depth |
| Exact liquor liability product wording for **retail** alcohol vs. **on-premise service** | Carrier form differences |

---

# Owner review checklist

- [ ] Approve **Layer 1 shared foundation** as reusable backbone for 2A implementation pass
- [ ] Approve **Restaurant draft-ready copy** (hero, 6 cards, 9 considerations, 5 FAQs) as calibration standard
- [ ] Approve **AGCO application matrix** (especially food truck exclusion default; c-store conditional subset)
- [ ] Confirm **Event Liability** as separate short-term framing (not forced into ongoing-operation template)
- [ ] Confirm **6 vs. 5** coverage cards for non-Restaurant routes
- [ ] Authorize **implementation batch** after review — this document alone makes **no website changes**

---

## Stop gates (repeat)

- **NO MERGE · NO DEPLOY · NO VERCEL PROMOTION**
- **NO CONTENT CHANGES UNTIL OWNER APPROVES THIS RESEARCH**

**STOP FOR OWNER REVIEW.**
