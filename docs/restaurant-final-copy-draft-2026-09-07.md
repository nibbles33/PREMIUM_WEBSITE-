# Restaurant Insurance — Final Copy Draft (Owner Review)

**Route:** `/restaurant-insurance/`  
**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Source research:** `docs/2a-hospitality-food-research-2026-09-07.md`  
**Status:** Draft only — **NO IMPLEMENTATION · NO WEBSITE CHANGES**

---

## Stop gates

- **NO MERGE · NO DEPLOY · NO VERCEL PROMOTION**
- **Do not edit** `src/data/commercial-industries.ts` or any live product-page data until owner approves this draft
- Other 2A routes remain at research/architecture stage only

**STOP FOR OWNER REVIEW**

---

## Category key (internal — not for live page)

| Tag | Meaning |
|-----|---------|
| **[COVERAGE]** | Purchasable insurance product |
| **[UNDERWRITING]** | Insurer/broker evaluation factor |
| **[REGULATORY]** | Legal/licensing requirement (not insurance) |
| **[EXPOSURE]** | Operational risk (may or may not map to a coverage) |

---

## 1. Hero / Subhead

**Headline:** Restaurant Insurance

**Subhead:**

Restaurants in Windsor–Essex combine busy dining rooms, commercial kitchens, and — for many operators — AGCO-licensed alcohol service. Insurance needs to reflect those overlapping exposures: guest injury on your premises, property loss affecting kitchen equipment and inventory, food-related illness claims, and (where you serve alcohol) liability that standard general liability often excludes or limits. Ontario food service premises must also meet public health rules under O. Reg. 493/17, including having a certified food handler on site during operating hours — a regulatory requirement separate from what your insurance policy covers. A broker can help align property, liability, and optional endorsements to how your restaurant actually operates.

---

## 2. Coverage Explorer Cards (6)

Concise selector copy — hedged, same pattern as approved Daycare cards. Titles map to proposed Coverage Explorer V2 states (implementation note: live explorer currently has 4 states; adding Product Liability and Business Interruption will require explorer asset/mapping work — out of scope for this draft).

### Card 1 — General Liability
**Category:** [COVERAGE]

Helps protect against certain third-party bodily injury and property-damage claims arising from restaurant operations and your premises — such as slip-and-fall incidents in the dining room or parking area — subject to policy terms, exclusions, and limits.

### Card 2 — Commercial Property
**Category:** [COVERAGE]

May help cover your building (if owned or required under lease), tenant improvements, furniture, fixtures, and kitchen equipment against covered causes of loss, depending on how the policy is structured and which perils or endorsements apply.

### Card 3 — Liquor Liability
**Category:** [COVERAGE]

Where you sell or serve alcohol under an AGCO Liquor Sales Licence, liquor liability may address certain claims tied to alcohol service — a distinct coverage from general liability, which often excludes or limits liquor-related claims. Holding a licence authorizes legal sale and service; it does not include insurance, and the Liquor Licence and Control Act itself does not mandate liquor liability insurance as a statutory condition.

### Card 4 — Product Liability / Food Illness
**Category:** [COVERAGE]

May respond to certain claims alleging illness or injury from food you prepared or served, often as part of products-completed operations coverage within a CGL policy or by endorsement — scope and exclusions vary by carrier and wording.

### Card 5 — Equipment Breakdown & Spoilage
**Category:** [COVERAGE]

Equipment breakdown coverage may address sudden mechanical or electrical failure of covered kitchen or refrigeration equipment; spoilage endorsements may address inventory lost due to temperature change from specified causes — neither is automatic in a base property policy.

### Card 6 — Business Interruption
**Category:** [COVERAGE]

May help with lost business income and certain continuing expenses when a covered property loss forces you to close or scale back service, subject to waiting periods, limits, and policy terms — particularly relevant where payroll and rent continue during repairs.

---

## 3. Practical Considerations (9)

### 1. Disclosures your broker typically needs
**Category:** [UNDERWRITING]

Cuisine type, seating capacity, cooking methods (deep fryer, open flame, wood-fired oven), hours, delivery or catering model, and whether you hold an AGCO Liquor Sales Licence.

### 2. Food safety is regulatory — not an insurance substitute
**Category:** [REGULATORY]

O. Reg. 493/17 requires at least one certified food handler on site during all operating hours at food service premises. Compliance reduces illness risk but does not replace liability coverage.

### 3. Liquor licensing, civil liability, and insurance are three different things
**Category:** [REGULATORY] + [COVERAGE] + [EXPOSURE]

AGCO issues Liquor Sales Licences for eligible premises. Under the Liquor Licence and Control Act, licensees can face **civil liability** for harm tied to alcohol service — AGCO's own licensing guidance states there is more to lose than your licence and recommends consulting an insurance professional. That civil exposure exists **independently** of whether you carry insurance.

The Act itself does **not** mandate liquor liability insurance as a statutory condition of licensing. However, proof of insurance may still be requested during the licensing or application process, by a landlord, or under other contractual terms — that is a **documentation or contractual practice**, not the same thing as a provincial insurance mandate.

Liquor liability insurance, where purchased, is a **commercial product** that may help respond to certain alcohol-related claims standard general liability excludes or limits — confirm inclusion with your broker.

### 4. Delivery and app-based orders
**Category:** [EXPOSURE] + [UNDERWRITING]

In-house or third-party delivery can create commercial auto or hired and non-owned auto exposures when staff use personal vehicles. Disclose your delivery model — platform vendor agreements may impose their own certificate requirements.

### 5. Kitchen fire and suppression maintenance
**Category:** [REGULATORY] + [UNDERWRITING]

Hood and duct cleaning, fire suppression inspection, and fryer protocols affect both fire code compliance and property underwriting.

### 6. Patio and seasonal operations
**Category:** [REGULATORY] + [UNDERWRITING]

Outdoor seating may require municipal encroachment agreements and AGCO licensing of outdoor areas. Seasonality affects business income projections.

### 7. Lease and franchisor requirements
**Category:** [UNDERWRITING]

Leases often specify minimum liability limits, additional insured status, and evidence of property coverage. Franchise manuals may add requirements — including liquor liability certificates where alcohol is served.

### 8. WSIB and kitchen employee injuries
**Category:** [REGULATORY]

Most Ontario employers must carry WSIB coverage for workers. WSIB is a statutory workplace insurance system, separate from commercial general liability.

### 9. Did you know?
**Category:** [REGULATORY]

Municipal business licences, fire inspections, and public health inspections are operational and regulatory requirements — not insurance coverages. They are listed here to explain why restaurant risk profiles differ from generic retail.

---

## 4. FAQ (5)

### Q1. Do I need liquor liability if I serve alcohol?

**Category focus:** [COVERAGE] + [REGULATORY] + [UNDERWRITING]

If you sell or serve alcohol under an AGCO Liquor Sales Licence, liquor liability is commonly purchased because general liability often excludes or limits liquor-related claims. That is an insurance gap question — not the same as a provincial licensing rule.

The Liquor Licence and Control Act does not mandate liquor liability insurance as a statutory condition of holding a licence. AGCO's licensing guidance confirms licensees may face **civil liability** for harm caused by someone served liquor at the business — separate from administrative penalties such as suspension or revocation — and recommends consulting an insurance professional.

Proof of insurance may still be requested during the licensing or application process, by your landlord, or under a lease, franchise, or lender agreement. Those are contractual or documentation requirements; they do not change the fact that the Act itself does not prescribe a named insurance product.

If you also cater off-site events with alcohol under a Caterer's Endorsement or Special Occasion Permit, the same insurance-versus-regulation distinction applies: LCBO's Special Occasion Permit FAQ states provincial regulations do not require permit holders to carry party liability insurance, though a venue may require it — confirm what each contract actually asks for.

### Q2. Is food spoilage from a power outage covered?

**Category focus:** [COVERAGE]

Sometimes — often through spoilage or equipment breakdown endorsements, not the base property form alone. Coverage depends on the cause of the outage (on-premises equipment failure versus widespread grid failure) and your policy wording.

### Q3. Do I need coverage for delivery drivers?

**Category focus:** [COVERAGE] + [UNDERWRITING]

If staff deliver in company or personal vehicles, commercial auto and/or hired and non-owned auto exposures should be reviewed. Third-party delivery platforms may impose their own insurance requirements in vendor agreements.

### Q4. What food safety rules apply in Ontario?

**Category focus:** [REGULATORY]

Food service premises must comply with O. Reg. 493/17, including food handler certification on site during operating hours. Public health units inspect and enforce these rules — separate from your insurance policy.

### Q5. What information do I need for a restaurant quote?

**Category focus:** [UNDERWRITING]

Cuisine type, seating capacity, liquor sales percentage (if licensed), hours, cooking methods, location and construction details, equipment and inventory values, delivery model, prior claims, and any lease, franchisor, or lender insurance requirements.

---

## 5. Coverage Explorer V2 — Contextual Detail Pairs (6)

Restaurant-specific depth for the detail panel — does not repeat card copy.

### General Liability
**detailTitle:** When a busy dining room becomes a liability claim

**detailDescription:** Restaurants concentrate people in high-traffic areas — dining rooms, patios, washrooms, and parking lots — where spills, crowded aisles, and seasonal ice create slip-and-fall exposure. General liability may respond to certain third-party injury or property-damage claims arising from these premises and from day-to-day operations, but scope depends on how your policy defines your premises, operations, and any off-premises catering or delivery activities.

---

### Commercial Property
**detailTitle:** Why kitchen equipment drives property values

**detailDescription:** A restaurant's property exposure is weighted toward the kitchen — commercial ovens, fryers, walk-in coolers, hood systems, and built-in fixtures often represent a large share of insurable value alongside dining-room furniture and tenant improvements. Fire, water damage from suppression systems, and theft of equipment or alcohol stock are common loss scenarios carriers evaluate when structuring property coverage and deductibles.

---

### Liquor Liability
**detailTitle:** Civil liability under the Act versus the coverage on your policy

**detailDescription:** Serving alcohol under an AGCO Liquor Sales Licence creates regulatory obligations and civil liability exposure if a patron is overserved or alcohol contributes to injury or property damage after they leave. AGCO's licensing guide addresses that civil exposure directly — it is not the same as carrying liquor liability insurance, and the Act does not prescribe a named insurance product as a licence condition. Liquor liability coverage, where included in your program, is meant to address many alcohol-related claims that standard general liability excludes or limits; landlords and other counterparties may still require proof of coverage contractually.

---

### Product Liability / Food Illness
**detailTitle:** When a meal becomes a products claim

**detailDescription:** Foodborne illness allegations, undeclared allergen incidents, and contamination events can generate third-party claims distinct from a simple slip-and-fall. Restaurants face heightened scrutiny because they prepare and serve food on site for immediate consumption. Product or products-completed operations coverage may respond to certain illness or injury claims tied to food you served, but policy exclusions, recall costs, and regulatory enforcement actions are treated differently — food handler compliance under O. Reg. 493/17 is a public health obligation, not a substitute for liability coverage.

---

### Equipment Breakdown & Spoilage
**detailTitle:** When the walk-in fails on a Friday night

**detailDescription:** Refrigeration and cooking equipment are operationally critical — a sudden compressor failure or electrical breakdown can destroy thousands of dollars in perishable inventory and force you to stop service. Base property policies often handle fire or theft differently from mechanical breakdown or temperature-change spoilage. Equipment breakdown and spoilage endorsements exist precisely because restaurants depend on continuous cold chain and functioning kitchen lines; triggers and sublimits vary, especially for off-premises power failures versus on-site equipment failure.

---

### Business Interruption
**detailTitle:** Paying rent and payroll while the kitchen is closed

**detailDescription:** After a covered fire, major water loss, or extended equipment failure, repairs can take weeks while fixed costs continue — lease payments, core staff, loan obligations, and supplier commitments do not pause automatically. Business interruption coverage may help with lost income and certain continuing expenses during a covered suspension, subject to waiting periods and policy limits. For restaurants with seasonal tourism or patio-driven revenue in Windsor–Essex, accurate revenue projections and peak-period values matter when underwriting this coverage.

---

## 6. Sources

Every substantive claim in this draft maps to a primary source below. Regulatory sources are distinguished from industry/brokerage framing.

### Regulatory / authoritative (primary)

| Claim | Source |
|-------|--------|
| Food handler must be on site during all operating hours at food service premises | **O. Reg. 493/17**, s. 32 — https://www.ontario.ca/laws/regulation/170493/ |
| Food handler hygiene and illness duties | **O. Reg. 493/17**, s. 33 |
| Liquor Sales Licence authorizes on-site sale/service of liquor | **AGCO** — Section 1: Liquor Sales Licences — https://www.agco.ca/en/alcohol/responsibilities-and-resources/guides/section-1-liquor-sales-licences |
| Licensees may face **civil liability** for harm caused by someone served liquor; consult legal advisor and insurance professional | **AGCO** — Section 1: Liquor Sales Licences, **"Liability"** section (same URL) |
| LLCA licensing conditions do not include a statutory mandate for liability insurance (historical legislative analysis) | **City of Toronto** — Report on Liability Insurance for Premises Licensed to Sell Liquor (2001) — https://www.toronto.ca/legdocs/2001/agendas/council/cc010724/plt8rpt/cl010.pdf |
| Provincial regulations do not require SOP holders to carry party liability insurance; venue may require it | **LCBO** — Special Occasion Permit (SOP) FAQs, item 9 "Smart Serve and Liability Coverage" — https://hellolcbo.com/app/answers/detail/a_id/3103 |
| Smart Serve training for SOP context — recommended, not required by provincial regulations | Same LCBO SOP FAQ, item 9 |
| WSIB employer registration obligation | **WSIB Ontario** — employer registration requirements — https://www.wsib.ca/en/businesses/registration |
| Occupiers' duty of care on premises | **Occupiers' Liability Act**, R.S.O. 1990, c. O.2 — https://www.ontario.ca/laws/statute/90o02 |

### Industry / brokerage (secondary — coverage product framing)

| Claim | Basis |
|-------|--------|
| CGL may address third-party bodily injury and property damage subject to terms/exclusions | Standard commercial general liability product structure |
| Liquor liability often excluded or limited in standard CGL | Common market practice; confirm per policy |
| Equipment breakdown and spoilage typically require endorsements | Common property policy structure |
| Business interruption tied to covered direct physical loss with waiting periods | Standard business income coverage concepts |
| Hired and non-owned auto for delivery use of personal vehicles | Standard commercial auto extension |
| Landlords, franchisors, and lenders commonly require certificates and minimum limits | Commercial lease and franchise practice — contractual [UNDERWRITING], not provincial statute |

### Internal reference (research lineage)

| Document | Use |
|----------|-----|
| `docs/2a-hospitality-food-research-2026-09-07.md` | Layer 1 shared foundation; Restaurant calibration module |
| `docs/d2-kickoff-2026-09-07.md` | Current-state audit flags on live `/restaurant-insurance/` copy |
| `src/data/product-pages/commercial-products-specialty.ts` (Daycare entry) | Coverage Explorer V2 detail-pair pattern reference — **not modified in this task** |

---

## Owner review checklist

- [ ] Approve hero/subhead tone and Windsor–Essex localization
- [ ] Approve 6-card set (including new Product Liability and Business Interruption cards)
- [ ] Approve AGCO / liquor liability framing in Card 3, Consideration 3, and FAQ 1
- [ ] Approve 6 Coverage Explorer V2 detail pairs
- [ ] Confirm explorer implementation plan for 4 → 6 states before content goes live
- [ ] Authorize implementation into `src/data/commercial-industries.ts` in a separate task

---

## Stop gates (repeat)

- **NO MERGE · NO DEPLOY · NO VERCEL PROMOTION**
- **NO WEBSITE CHANGES UNTIL OWNER APPROVES THIS DRAFT**

**STOP FOR OWNER REVIEW.**
