# Food Truck & Trailer Insurance — Content Draft (Owner Review)

**Route:** `/food-truck-insurance/`  
**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Source research:** `docs/2a-hospitality-food-research-2026-09-07.md` (Module 2.3 + Layer 1 shared blocks)  
**Precedent drafts:** `docs/liquor-liability-content-draft-v2-2026-09-08.md`, `docs/restaurant-final-copy-draft-2026-09-07.md`  
**Status:** Draft only — **NO IMPLEMENTATION · NO WEBSITE CHANGES · NO COPY-TO-UI MAPPING**

---

## Stop gates

- **NO MERGE · NO DEPLOY · NO VERCEL PROMOTION**
- **Do not edit** `src/data/commercial-industries.ts`, Explorer config, images, or audit scanner until owner approves this draft
- **Do not touch** Restaurant, Liquor Liability, Hotel/Motel, Event Liability, Convenience Store, Daycare, Greenhouse

**STOP FOR OWNER REVIEW before any implementation or copy-to-UI mapping work begins.**

---

## Category key (internal — not for live page)

| Tag | Meaning |
|-----|---------|
| **[COVERAGE]** | Purchasable insurance product |
| **[UNDERWRITING]** | Insurer/broker evaluation factor |
| **[REGULATORY]** | Legal/licensing requirement (not insurance) |
| **[EXPOSURE]** | Operational risk (may or may not map to a coverage) |

**Four-category rule:** Do not write **[REGULATORY]** or **[EXPOSURE]** facts as if they were **[COVERAGE]**.

---

## 1. Current live-page audit

**Data source:** `src/data/commercial-industries.ts` → `food-truck-insurance`  
**Adapter:** `adaptCommercialIndustryContent()` in `buildPilotProductConfig.ts`  
**Audit baseline:** `docs/product-content-audit-2026-09-07.md` / `audit-data.json`

| Metric | Current (live) |
|--------|----------------|
| Substantive words | **307** |
| Hero words | **15** — generic (*"Mobile coverage for food trucks and trailers — on the road and at the event."*) |
| Hero specific? | **No** — could apply to any mobile vendor |
| Explorer states | **4** |
| detailTitle / detailDescription | **None** (fallback detail = description) |
| Practical Considerations | **0** |
| FAQ count | **4** |
| FAQ uniqueness | **No** — shares 2+ FAQ pattern with `/real-estate-insurance/` |
| Trust band | **Enabled** — uses `DEFAULT_COMMERCIAL_TRUST` boilerplate (same as all non-Restaurant industry pages); **not** food-truck-specific |
| HIGH flags | **1** |
| MEDIUM flags | **0** |
| LOW flags | **0** |
| Classification | **D** |

### Content-safety flag (HIGH)

| Field | Quote | Issue |
|-------|-------|-------|
| `coverage:Commercial Auto` | *"Covers the truck or trailer as a commercial vehicle — liability and physical damage while on the road."* | Flat coverage guarantee — unhedged "Covers" |

### Other live copy issues (research conflicts)

| Live copy | Problem |
|-----------|---------|
| Hero | Too thin; does not explain truck-vs-trailer or auto-vs-business split |
| `coverageIntro` | Generic; no qualification |
| Card descriptions | Product Liability uses *"Addresses claims…"* without hedging; Equipment uses *"Can protect…"* |
| FAQ #3 | Equipment breakdown vs auto PD — directionally OK but thin |
| No considerations | Commissary, propane, municipal licensing, food safety, event certificates absent |
| No Windsor-specific verified content | Meta mentions Windsor-Essex but body does not use legitimate local hooks |

### Hero / trust-band behavior (engineering — unchanged in this task)

- `showTrustBand: true` for food truck (Restaurant is the only industry page with trust band disabled)
- `trustStatement` = `DEFAULT_COMMERCIAL_TRUST` generic broker line — **not** distinct from hero substance
- **Recommendation at implementation:** Add food-truck-specific trust-band copy (see §11); consider distinct `trustStatement` field for industry pages or disable duplicate band if hero becomes substantive

---

## 2. Existing Explorer inventory (inspected — do not change in this task)

**Visual config:** `src/data/coverage-explorer/interaction-manifest/routes.ts` → `food-truck-insurance`  
**Archetype:** `fleet-vehicles`  
**Image asset:** `food-truck-trailer-insurance-interactive-master.png` (`interactive-master`)  
**ID derivation:** `slugify(title)` in `buildPilotProductConfig.ts`

| # | State ID (slugified) | Current title | Current shortLabel (default) | Current description | detailTitle / detailDescription | Mapped zones |
|---|---------------------|---------------|------------------------------|---------------------|--------------------------------|--------------|
| 1 | `general-liability` | General Liability | General | *"Helps protect against customer injury or property damage claims at events, parks, and service locations."* | — *(fallback)* | highway-lane, lead-truck, yard-staging |
| 2 | `commercial-auto` | Commercial Auto | Commercial | *"Covers the truck or trailer…"* **[HIGH]** | — | lead-truck, trailing-unit, highway-lane |
| 3 | `equipment-coverage` | Equipment Coverage | Equipment | *"Can protect cooking equipment, generators, and fitted interiors…"* | — | cargo-trailer, yard-staging |
| 4 | `product-liability` | Product Liability | Product | *"Addresses claims that food you prepared or sold caused illness or injury."* | — | highway-lane, lead-truck, yard-staging |

**Explorer state count:** **4** — **recommend keeping 4** (see architecture note below)

### Architecture recommendation (draft only — not implemented)

**Keep 4 states.** The existing four topics map to genuinely distinct insurance components for mobile food operations:

| State | Why it stays |
|-------|--------------|
| General Liability | Third-party injury/property at events and service locations |
| Commercial Auto | FSRA-regulated automobile exposure — separate from CGL |
| Equipment Coverage | Kitchen/generator/fitted gear — often not fully addressed by auto PD alone |
| Product Liability | Foodborne illness / products-completed operations — distinct GL sub-topic |

**Do not add** a 5th state for:
- **Business Interruption** — belongs in Considerations / FAQ; triggering peril and policy structure too variable for a selector tab
- **Liquor Liability** — uncommon on food trucks; Considerations + FAQ footnote only
- **Spoilage / Equipment Breakdown** — endorsements under property/equipment; fold into Equipment state LEFT detail + Considerations

**Do not rename state IDs** — titles must stay aligned with `slugify(title)` for zone mapping.

---

## 3. Research findings by category

### A. General / product liability [COVERAGE] + [EXPOSURE]

| Finding | Category | Source basis |
|---------|----------|--------------|
| Mobile food operators face third-party **bodily injury** and **property damage** claims at festivals, parking lots, private property, and commissaries | [EXPOSURE] | Industry practice; event/vendor context |
| **General liability** may respond to certain premises/operations claims subject to policy terms — **off-premises/mobile locations depend on wording** | [COVERAGE] | Market practice — policy-dependent |
| **Products-completed operations** / product liability extension may address certain **foodborne illness** allegations — often part of CGL or by endorsement; **not automatic** | [COVERAGE] | Industry practice; Restaurant draft precedent |
| Event organizers, municipalities, and property owners may require **certificates of insurance**, **additional insured** status, or **minimum limits** | [UNDERWRITING] | Contractual — Windsor application materials cite CGL proof for Class 3 mobile vendors |
| CGL **does not insure automobile liability** — Ontario automobile risks require **automobile insurance** regulated by FSRA | [COVERAGE] boundary | FSRA auto insurance regulatory framework; standard CGL/auto policy separation |

### B. Truck / trailer / auto exposure [COVERAGE] + [REGULATORY] + [EXPOSURE]

| Operation type | Insurance consideration | Category |
|----------------|----------------------|----------|
| **Self-propelled food truck** (motorized unit) | Typically requires **commercial automobile insurance** for on-road liability and optional physical damage — FSRA-regulated | [COVERAGE] + [REGULATORY] |
| **Towable food trailer** | Trailer may be insured under commercial auto policy (liability/physical damage for the trailer unit) **or** require separate scheduling — **confirm per policy** | [COVERAGE] — policy-dependent |
| **Personal vehicle towing a commercial food trailer** | Personal automobile policy often **excludes or restricts commercial use**; business towing may require **commercial auto** or appropriate business extension — **do not assume** personal policy covers business towing | [COVERAGE] + [UNDERWRITING] |
| **Kitchen/business liability at an event** | **Not** a substitute for commercial auto; **GL/product liability** may address food-service claims separate from road use | [COVERAGE] boundary |
| Windsor Class 3 mobile vendor application | Requires **Motor Vehicle Liability Insurance Card** ("pink slip") and **proof of Commercial General Liability Insurance** | [REGULATORY] + [UNDERWRITING] — **City of Windsor application requirements** (Class 3); not verified as universal across all municipalities |

**Critical boundary:** Do **not** write that CGL "covers the truck on the road" or that commercial auto "covers food liability."

### C. Property / equipment [COVERAGE] + [UNDERWRITING]

| Finding | Category |
|---------|----------|
| Cooking equipment, refrigeration, generators, POS, signage, and fitted interiors may be insured under **commercial property**, **equipment floater**, **inland marine**, or scheduled equipment coverage — **depending on policy** | [COVERAGE] |
| Equipment **permanently attached** to a truck/trailer may be treated differently from **portable** gear removed at events | [UNDERWRITING] |
| **Commercial auto physical damage** may cover the vehicle unit but **may not** fully cover permanently installed kitchen equipment, stock, or business personal property — **confirm per policy** | [COVERAGE] — market practice |
| Stock and ingredients may need **business personal property** or **stock/spoilage** coverage — separate from auto PD | [COVERAGE] |

### D. Equipment breakdown / spoilage [COVERAGE]

| Finding | Category |
|---------|----------|
| **Equipment breakdown** (boiler & machinery) may address sudden mechanical/electrical failure of covered equipment — **where purchased**, subject to terms | [COVERAGE] |
| **Spoilage** endorsements may cover inventory loss from temperature change due to specified equipment failure or power interruption — **not automatic** in base property forms | [COVERAGE] |
| Generator failure affecting refrigeration creates **operational** and **inventory** exposure — coverage depends on cause and endorsements | [EXPOSURE] + [COVERAGE] |
| Do **not** imply spoilage or breakdown is included by default | — |

### E. Fire / cooking / propane [REGULATORY] + [EXPOSURE] + [UNDERWRITING]

| Finding | Category | Source |
|---------|----------|--------|
| Windsor Schedule M2 requires **fire extinguisher** (2A or 3A-10BC rating) on licensed mobile food vehicles | [REGULATORY] | City of Windsor Business Licensing By-law 395-2004, Schedule M2, s.18 |
| Windsor requires **propane equipment testing/approval** at least annually when propane used for heating or refrigeration | [REGULATORY] | Schedule M2, s.15 |
| Deep fryers, grills, generators, and cooking oils create **fire** underwriting exposure | [EXPOSURE] + [UNDERWRITING] | Industry practice |
| Fire code / suppression / ventilation compliance is **regulatory** — not the same as purchasing fire insurance coverage | [REGULATORY] vs [COVERAGE] | Distinction per owner four-category rule |
| Insurers may ask about **suppression systems, maintenance, and cooking methods** during underwriting | [UNDERWRITING] | Market practice |

**Not verified in this pass:** Ontario Fire Code section numbers specific to food trucks; TSSA propane requirements beyond Windsor municipal cross-reference.

### F. Food safety [REGULATORY]

| Finding | Category | Source |
|---------|----------|--------|
| **Mobile food premise** defined under O. Reg. 493/17 as a trailer, cart, or vehicle-mounted premise where food is prepared and offered for sale | [REGULATORY] | O. Reg. 493/17, s.1 definition |
| Mobile premises must prepare and serve food within the unit; **single-service articles** required | [REGULATORY] | O. Reg. 493/17, s.4(1)(a)(b) |
| Potable/waste water tank requirements apply unless selling **only pre-packaged or non-hazardous food** | [REGULATORY] | O. Reg. 493/17, s.4(1)(c)(d), s.4(2) |
| **Food service premises** must have at least one **certified food handler** on site during operating hours | [REGULATORY] | O. Reg. 493/17, s.32; Ontario.ca food handler training page |
| Mobile food premises that prepare food for immediate consumption likely qualify as **food service premises** — confirm with local public health unit | [REGULATORY] | Regulatory inference from definitions; **not legal advice** |
| Windsor requires **WECHU food handler training** and **Board of Health approval/clearance** on vehicle for mobile vendor licensing | [REGULATORY] | City of Windsor mobile food vendor application requirements; Schedule M2 ss.16, 24 |
| Windsor Class 3: **yearly physical inspection** by WECHU | [REGULATORY] | Schedule M2, s.33 |
| Food safety compliance **does not replace** liability insurance | [REGULATORY] vs [COVERAGE] | Four-category rule |

### G. Municipal / Windsor-Essex context [REGULATORY] + [UNDERWRITING]

| Jurisdiction | Verified finding | Source |
|--------------|------------------|--------|
| **City of Windsor** | Mobile Vendor of Food licence under By-law 395-2004 Schedule M2; Classes 1–3; application requires WECHU clearance, food handler cert (where applicable), CGL proof and MVLIC for Class 3 | City of Windsor mobile food vendor licensing page + Schedule M2 |
| **City of Windsor** | Propane approval, fire extinguisher, vending zone rules, prohibited areas, special event permits | Schedule M2 |
| **LaSalle, Tecumseh, Amherstburg, Essex, Kingsville, Lakeshore** | **NOT independently verified** in this pass — do not generalize Windsor requirements county-wide | — |

**Windsor-Essex positioning (legitimate):** Premium may help operators understand insurance in the context of **Windsor mobile-vendor licensing** and **WECHU mobile food requirements** — without implying exclusive municipal partnerships.

### H. Events / temporary locations [UNDERWRITING] + [EXPOSURE]

| Finding | Category |
|---------|----------|
| Festivals, fairs, farmers markets, and private events often require **proof of insurance** with event-specific **additional insured** wording | [UNDERWRITING] |
| GL **may** extend to temporary locations depending on policy — **not automatic** | [COVERAGE] |
| Windsor special occasion vending permits for mobile vendors — municipal process with fees and location limits | [REGULATORY] — Windsor Schedule M2, s.31 |
| Contractual certificate requirements ≠ provincial statutory insurance mandate | [UNDERWRITING] vs [REGULATORY] |

### I. Alcohol [REGULATORY] — Considerations/FAQ only

| Finding | Category | Source |
|---------|----------|--------|
| Ontario does **not** issue a standalone **mobile bar / food-truck liquor licence** | [REGULATORY] | AGCO Section 3 Endorsements; 2A research Module 2.3 |
| Alcohol service in connection with mobile/catered operations typically involves **Caterer's Endorsement** on an existing Liquor Sales Licence (event sponsored by another party, ≤10 days) or **Special Occasion Permit** at the event — **not** a routine food-truck default | [REGULATORY] | AGCO Caterer's Endorsement guide |
| **Liquor liability insurance** may be relevant **only if** legally selling/serving alcohol under AGCO authorization — most food trucks do not | [COVERAGE] + [REGULATORY] | Liquor Liability V2 verified framing |
| **Do not** add liquor liability as Explorer state | — | Architecture decision |

### J. Business interruption [COVERAGE]

| Finding | Category |
|---------|----------|
| BI may help with lost income/continuing expenses after a **covered direct physical loss** to insured property — subject to waiting periods and policy terms | [COVERAGE] |
| For mobile operators, triggering events may include **vehicle fire**, **equipment loss**, **commissary property damage** — **depends on what property is insured and what peril applies** | [COVERAGE] — policy-dependent |
| **Cannot operate** because of licence suspension, failed health inspection, or weather cancellation ≠ automatic BI trigger | [EXPOSURE] vs [COVERAGE] |
| Do **not** write "covers lost income whenever the truck cannot operate" | — |

---

## 4. Primary-source verification table

### Regulatory / authoritative

| Claim | What source establishes | Source |
|-------|------------------------|--------|
| Mobile food premise definition and s.4 requirements | Statutory/regulatory text | **O. Reg. 493/17** (Food Premises), s.1 definition, s.4 — https://www.ontario.ca/laws/regulation/r17493 |
| Certified food handler required during operating hours at food service premises | Regulatory requirement | O. Reg. 493/17, s.32 — same URL |
| Food handler training programs and PHU/commercial certification | Provincial guidance | **Ontario.ca** — Food handler training and certification — https://www.ontario.ca/page/food-handler-training-and-certification |
| Mobile food premises guidance (operators should speak with PHI) | Reference document | **Ontario MOH** — Food Premises Reference Document, 2019 — https://files.ontario.ca/moh-ophs-ref-food-premise-reference-document-2019-en.pdf |
| Windsor mobile vendor licence classes and operational rules | Municipal by-law | **City of Windsor** — Business Licensing By-law 395-2004, Schedule M2 — https://www.citywindsor.ca/Documents/city-hall/by-laws-online/395-2004-Business-Licensing-Bylaw.pdf |
| Windsor Class 3 application: CGL proof, MVLIC, WECHU clearance, food handler, propane approval | Application requirements | **City of Windsor** — Mobile Food Vendor licensing — https://www.citywindsor.ca/city-hall/licensing-and-registration/business-licences/mobile-food-vendor |
| No standalone mobile liquor licence; Caterer's Endorsement scope | AGCO regulatory | **AGCO** — Section 3: Endorsements (Caterer's Endorsement) |
| FSRA regulates Ontario automobile insurance | Regulatory authority | **FSRA** — Auto Insurance — https://www.fsrao.ca/industry/auto-insurance |

### Insurance / market (tagged)

| Claim | Source type |
|-------|-------------|
| CGL does not cover automobile liability | Market practice + FSRA auto boundary |
| Commercial auto PD may not fully cover fitted kitchen equipment | Market-practice inference — confirm per policy |
| Equipment floater / inland marine for portable or scheduled gear | Market-practice inference |
| Equipment breakdown and spoilage require endorsements | Market-practice inference |
| Event certificates / additional insured common | Market-practice inference [UNDERWRITING] |
| BI requires covered direct physical loss to insured property | Standard BI policy structure — policy-dependent |

---

## 5. Proposed hero / subhead

**Headline:** Food Truck & Trailer Insurance *(unchanged — accurate)*

**Subhead (proposed — customer-first):**

> Food trucks and mobile food trailers combine two different risk profiles: a vehicle on Ontario roads and a kitchen that serves the public at events, commissaries, and temporary locations. Depending on how you operate, that can mean commercial automobile insurance for the truck or trailer, general liability and product liability for customer and food-related claims, and separate coverage for cooking equipment, refrigeration, and inventory — subject to the policies you purchase. Premium Insurance Brokers can help you map those pieces to your actual setup, whether you run a self-propelled truck, a towable trailer, or both.

**Category mix:** [COVERAGE] + [EXPOSURE] — brokerage coordination framing; regulatory detail deferred to Considerations/FAQs.

---

## 6. Proposed coverageIntro

> Mobile food insurance usually involves more than one policy component — from automobile coverage for the unit on the road to business liability and equipment coverage for the kitchen you operate at events and service locations. What you need depends on whether you use a self-propelled truck, a towable trailer, attached cooking equipment, and where you prep and serve food.

---

## 7. Coverage Explorer — V2 copy (4 states — preserve IDs)

### State 1 — `general-liability`

**Category:** [COVERAGE]

**RIGHT selector**

| Field | Proposed copy |
|-------|---------------|
| **shortLabel** | Liability |
| **title** | General Liability *(unchanged — preserves state ID)* |
| **description** | May help respond to certain third-party bodily injury or property-damage claims arising from your food-service operations at events, parking areas, commissaries, and other service locations, subject to policy terms, exclusions, and limits. |

**LEFT contextual detail**

| Field | Proposed copy |
|-------|---------------|
| **detailTitle** | When a line at your service window becomes a liability claim |
| **detailDescription** | A customer slip, scalding incident, or property damage at a festival, private event, or curbside service location can generate a third-party claim tied to your operations — not your vehicle's road use. General liability may address certain premises and operations claims, but whether a temporary location, off-site event, or commissary is covered depends on policy wording. Event organizers and municipalities often require certificates of insurance with specific limits or additional-insured status — those are contractual requirements separate from what any single policy automatically includes. |

---

### State 2 — `commercial-auto`

**Category:** [COVERAGE]

**RIGHT selector**

| Field | Proposed copy |
|-------|---------------|
| **shortLabel** | Auto |
| **title** | Commercial Auto *(unchanged)* |
| **description** | May help with automobile liability and, where purchased, physical damage for your owned food truck, trailer, or other commercial vehicle used in the business, subject to FSRA-regulated policy terms — separate from general liability for food-service claims. |

**LEFT contextual detail**

| Field | Proposed copy |
|-------|---------------|
| **detailTitle** | On the road is a different policy question than at the service window |
| **detailDescription** | Ontario automobile insurance for business use is regulated separately from commercial general liability. A self-propelled food truck, tow vehicle, or commercial trailer used on public roads typically needs appropriate commercial automobile coverage — not a personal auto policy assumed to cover business use. Physical damage coverage for the vehicle unit may not treat permanently installed kitchen equipment, stock, or business personal property the same way as a dedicated property or equipment form. If you tow a trailer with a personal vehicle, confirm with your broker whether business towing is excluded or requires a different structure. |

---

### State 3 — `equipment-coverage`

**Category:** [COVERAGE]

**RIGHT selector**

| Field | Proposed copy |
|-------|---------------|
| **shortLabel** | Equipment |
| **title** | Equipment Coverage *(unchanged)* |
| **description** | May help cover certain cooking equipment, refrigeration, generators, POS systems, and other business property — attached or portable — subject to how the policy schedules equipment and what causes of loss apply. |

**LEFT contextual detail**

| Field | Proposed copy |
|-------|---------------|
| **detailTitle** | The kitchen inside the truck is not always insured like the truck itself |
| **detailDescription** | Fryers, flat tops, refrigeration, generators, and fitted interiors can represent a large share of your insurable value — but commercial auto physical damage may not fully cover permanently installed kitchen equipment or inventory. Depending on the policy, equipment may be insured under commercial property, an equipment floater, inland marine, or scheduled equipment coverage, especially when gear is portable or used off-premises. Equipment breakdown and spoilage endorsements, where available, address different causes of loss than standard fire or theft — confirm triggers and sublimits with your broker rather than assuming refrigeration failure or spoiled stock is automatically covered. |

---

### State 4 — `product-liability`

**Category:** [COVERAGE]

**RIGHT selector**

| Field | Proposed copy |
|-------|---------------|
| **shortLabel** | Food Claims |
| **title** | Product Liability *(unchanged)* |
| **description** | May help respond to certain claims alleging illness, allergic reaction, or injury from food you prepared, handled, or sold, often as products-completed operations coverage within a general liability policy or by endorsement — subject to policy terms. |

**LEFT contextual detail**

| Field | Proposed copy |
|-------|---------------|
| **detailTitle** | Foodborne illness claims are a distinct exposure from a slip-and-fall |
| **detailDescription** | Allegations that your food caused illness, allergic reaction, or contamination can generate product liability or products-completed operations claims — separate from a simple premises injury at your service window. Food safety rules under O. Reg. 493/17, certified food-handler requirements, and public health inspections are regulatory obligations that support safe operations but do not replace this coverage. What triggers a product claim, how completed operations are defined, and whether off-site events are included depend on policy wording — confirm scope with your broker. |

---

## 8. Practical Considerations (8 — proposed)

### 1. Self-propelled truck, towable trailer, or tow vehicle
**Category:** [COVERAGE] + [EXPOSURE]

A self-propelled food truck, a towable trailer, and the vehicle that tows it create different insurance structures. Commercial automobile coverage addresses the licensed vehicle on the road; business liability and equipment coverage address the food operation and kitchen — the two are related but not interchangeable. If you use a personal vehicle for business towing, do not assume your personal auto policy covers that use without review.

### 2. Commercial auto does not replace business liability or kitchen property coverage
**Category:** [COVERAGE]

Ontario automobile insurance regulated by FSRA covers automobile exposures. Customer injury at your service window, foodborne illness allegations, and damage to fitted cooking equipment may fall under general liability, product liability, or property/equipment forms — depending on the policy. One policy type does not automatically cover every mobile food exposure.

### 3. Attached, portable, and off-premises equipment
**Category:** [COVERAGE] + [UNDERWRITING]

Equipment permanently installed in a truck or trailer may be underwritten differently from portable generators, POS terminals, or gear stored at a commissary. Insurers often ask for equipment schedules and values. Confirm whether gear removed from the vehicle at events is covered under the same form or needs inland marine or scheduled equipment coverage.

### 4. Propane, cooking equipment, and fire safety
**Category:** [REGULATORY] + [EXPOSURE] + [UNDERWRITING]

Deep fryers, grills, propane systems, and generators create fire and safety exposure that insurers evaluate during underwriting. In Windsor, licensed mobile food vehicles must carry a rated fire extinguisher and, where propane is used for heating or refrigeration, submit equipment for testing and approval on a schedule set by municipal licensing rules. Fire code compliance and suppression maintenance are regulatory and safety obligations — not substitutes for insurance coverage.

### 5. Mobile food premises and food-handler requirements
**Category:** [REGULATORY]

Ontario's Food Premises regulation defines mobile food premises and sets requirements for how food is prepared and served from movable units. Food service premises must have at least one certified food handler on site during operating hours. Windsor mobile vendor licensing also requires WECHU clearance and food-handler certification in applicable classes. Public health compliance reduces risk but is separate from liability insurance.

### 6. Commissary prep, storage, and where food is made
**Category:** [REGULATORY] + [EXPOSURE]

Some operators prep primarily on the truck; others use a commissary, rented kitchen, or central prep facility. Where food is prepared affects public health inspection scope and may affect how insurers evaluate your premises, off-premises operations, and property coverage. Municipal licensing rules may also restrict where certain foods may be prepared — Windsor's Schedule M2 includes restrictions on preparing or wrapping food in/at the vehicle for some licence classes. Disclose all prep and storage locations to your broker.

### 7. Festivals, events, and certificate requirements
**Category:** [UNDERWRITING]

Farmers markets, festivals, corporate events, and private venues often require proof of insurance — sometimes with specific limits, additional-insured wording, or waiver of subrogation. Those are contractual requirements from the event organizer or property owner, not provincial statutes. Bring event contracts to your broker so certificates match what you actually agreed to.

### 8. Refrigeration, spoilage, and income after a covered loss
**Category:** [COVERAGE] + [EXPOSURE]

Perishable inventory and onboard refrigeration make spoilage and equipment failure high-impact exposures for mobile food operators. Spoilage and equipment breakdown coverage, where purchased, may respond to certain inventory or equipment losses — subject to causes of loss, sublimits, and endorsements. Business interruption may help with lost income after a covered property loss, but a licence suspension, weather cancellation, or breakdown excluded by policy wording may not trigger the same coverage. Confirm what must happen before income coverage applies.

**Intentionally omitted as a separate consideration:** Universal **liquor liability** — covered in FAQ only (uncommon exposure).

**Count rationale:** Eight distinct topics; no padding to match Restaurant (11) or Liquor (9).

---

## 9. Practical Considerations presentation — recommendation

**Recommend: `expandable`** (`considerationsPresentation: 'expandable'`)

| Factor | Assessment |
|--------|------------|
| Item count | **8** — moderate-high density |
| Regulatory mix | O. Reg. 493/17, Windsor Schedule M2, auto/CGL boundary — text-heavy |
| Mobile scanability | Collapsed teasers help on a page with multi-policy coordination messaging |
| Precedent | Restaurant and Liquor Liability use expandable successfully |

**Not recommended:** Static grid — eight long regulatory/boundary items would read as a wall without scan benefit.

---

## 10. FAQ (5 — proposed)

### Q1. Is a towable food trailer insured differently from a self-propelled food truck?

**Category focus:** [COVERAGE]

**Proposed answer:**

Often yes — or at minimum, the policy structure differs. A self-propelled food truck is typically insured as a commercial vehicle with both road-use and kitchen exposures to disclose. A towable trailer may need coverage for the trailer unit, the towing vehicle, and the business operation separately — especially if a personal vehicle tows the trailer for business. Commercial automobile coverage addresses the automobile exposure; general liability, product liability, and equipment coverage address the food-service and kitchen exposures. Your broker needs to know which units you own, how they are plated, and how you tow and operate at events.

---

### Q2. Does my commercial auto policy cover the kitchen equipment inside my truck?

**Category focus:** [COVERAGE]

**Proposed answer:**

Not necessarily — or not for every cause of loss. Commercial auto physical damage may cover the vehicle unit itself, but permanently installed cooking equipment, refrigeration, inventory, and portable gear may need commercial property, equipment, inland marine, or scheduled equipment coverage depending on the policy. Equipment breakdown and spoilage are separate endorsements with their own triggers. Review what is attached to the vehicle, what is removable, and what is stored off-premises so your broker can match coverage to how the kitchen is actually insured.

---

### Q3. Do I need insurance to vend at festivals, farmers markets, or private events?

**Category focus:** [UNDERWRITING] + [COVERAGE]

**Proposed answer:**

Provincial food-premises rules do not prescribe a named festival insurance product, but event organizers, municipalities, and venue owners frequently require proof of general liability insurance — often with minimum limits or additional-insured wording in the event contract. That is a contractual requirement from the organizer or property owner, not the same thing as a provincial licensing insurance mandate. Your existing business policies may respond to certain claims at temporary locations depending on policy wording, but the certificate requirements in your contract must be reviewed against what your policies can actually provide.

---

### Q4. Is food spoilage automatically covered if my refrigerator or generator fails?

**Category focus:** [COVERAGE]

**Proposed answer:**

No — not automatically. Standard property and commercial auto forms often do not fully address spoilage from temperature change or mechanical breakdown without specific endorsements. Spoilage and equipment breakdown coverage, where available, depends on the cause of loss, equipment type, sublimits, and policy terms. A generator failure, compressor breakdown, or power interruption may be treated differently depending on the wording purchased. Confirm with your broker rather than assuming onboard refrigeration is fully covered.

---

### Q5. Can a food truck serve alcohol in Ontario?

**Category focus:** [REGULATORY] + [COVERAGE]

**Proposed answer:**

Not under a standalone mobile bar or food-truck liquor licence — Ontario does not issue that type of authorization. Alcohol service in connection with mobile or catered food operations typically involves an AGCO framework such as a Caterer's Endorsement on an existing Liquor Sales Licence at a sponsored event, or a Special Occasion Permit at the event location — each with different rules and responsibilities. Most food trucks do not sell or serve alcohol as a core operation. If alcohol service applies to your business model, disclose it to your broker so liquor liability and event coverage can be reviewed separately from standard food-truck insurance.

---

## 11. whoItIsFor / trust-band recommendation

**Proposed trust-band copy:**

> For Windsor–Essex food trucks, mobile trailers, and event vendors — reviewed through an independent broker who can coordinate commercial auto, liability, and equipment coverage for how you actually operate.

**Implementation note:** Industry pages currently use generic `DEFAULT_COMMERCIAL_TRUST` for the trust band while the hero carries the substantive introduction. Recommend adding a distinct trust-band field (or food-truck-specific override) at implementation — similar to Liquor Liability's `whoItIsFor` pattern on product pages.

---

## 12. Claims / propositions that could NOT be independently verified

| # | Proposition | Draft treatment |
|---|-------------|-----------------|
| 1 | Universal $2M CGL minimum for all Ontario food trucks | **Not stated** — Windsor Class 3 application cites CGL proof; limit amount not verified in Schedule M2 body text for mobile vendors specifically |
| 2 | LaSalle, Tecumseh, Amherstburg, Essex, Kingsville mobile-vendor insurance requirements | **Not stated** — Windsor verified only |
| 3 | Every mobile food premise is a "food service premise" under s.32 | **Hedged** — regulatory inference; recommend confirm with local PHU |
| 4 | Commercial auto PD never covers any kitchen equipment | **Softened** — "may not fully cover" |
| 5 | Specific insurer availability for food-truck programs in Windsor-Essex | **Not stated** |
| 6 | Farmers market insurance requirements across Windsor-Essex | **Generalized** as contractual/organizer practice only |
| 7 | Ontario Fire Code sections specific to food-truck suppression | **Not cited** — Windsor municipal extinguisher rule used instead |
| 8 | Commissary mandatory for all Ontario mobile food operators | **Not stated** — PHU-dependent; Windsor restricts on-vehicle prep for some classes |

---

## 13. Current → proposed structural comparison

| Element | Current (live) | Proposed (draft) |
|---------|----------------|------------------|
| Substantive words (audit est.) | 307 | Substantial increase expected (hero + 8 considerations + V2 cards/FAQ) |
| Classification | **D** (1 HIGH) | Target: eliminate HIGH via hedged card copy |
| Explorer states | 4 (no detail pairs) | **4** (V2 detail pairs — IDs unchanged) |
| Considerations | 0 | **8** |
| FAQ | 4 (templated overlap) | **5** (food-truck-specific) |
| Trust band | Generic commercial boilerplate | Food-truck-specific recommendation |
| Considerations UI | n/a | **Recommend expandable** |
| Liquor Explorer state | n/a | **Not recommended** |
| Architecture change | — | **None** — keep 4 states, zones, image |

---

## 14. Architecture change recommendations (draft only)

| Recommendation | Rationale |
|----------------|-----------|
| **Keep 4 Explorer states** | Maps to distinct purchasable components; zones already assigned |
| **Do not add Liquor Liability state** | Uncommon; AGCO path belongs in FAQ/Considerations |
| **Do not add Business Interruption state** | Policy-trigger complexity; better in Considerations #8 |
| **Do not merge Commercial Auto + Equipment** | Owner-facing distinction is critical for food trucks |
| **Add V2 detailTitle/detailDescription** | Same V2 UX pattern as Restaurant, Liquor, Greenhouse |
| **Add considerations + expandable mode** | Regulatory/boundary density warrants it |
| **Optional future:** `trustStatement` override on industry pages | Avoid generic trust band when hero is substantive |

**No new imagery. No Explorer engineering changes in this task.**

---

## 15. Conflicts between live content and verified research

| Live content | Conflict | Draft correction |
|--------------|----------|------------------|
| Commercial Auto: *"Covers the truck or trailer…"* | Unhedged guarantee; audit HIGH | Hedged auto wording; FSRA/CGL boundary in LEFT detail |
| Implied single policy covers vehicle + kitchen | CGL/auto/property boundary | Hero + Considerations #1–2 |
| No food safety / mobile premises content | O. Reg. 493/17 is core operator context | Considerations #5–6 |
| No municipal/event certificate context | Windsor + contractual practice verified | Considerations #7; FAQ Q3 |
| FAQ overlap with real-estate route | Template reuse | Replace with food-truck-specific FAQ set |
| No alcohol framework | AGCO verified: no mobile bar licence | FAQ Q5 only |
| Generic hero | Fails food-truck-specific test | New hero emphasizing dual exposure |

---

## Owner review checklist

- [ ] Approve customer-first hero emphasizing truck/trailer + kitchen dual exposure
- [ ] Approve **4** Explorer states (unchanged count) and V2 detail pairs
- [ ] Approve improved `shortLabel` set (Liability, Auto, Equipment, Food Claims)
- [ ] Approve **8** Practical Considerations (not padded to 9/11)
- [ ] Approve **expandable** considerations recommendation
- [ ] Approve **5** FAQ items — especially truck vs trailer, auto vs equipment, alcohol
- [ ] Approve Windsor-specific references (verified only — no county-wide generalization)
- [ ] Confirm no 5th Explorer state (liquor, BI, spoilage as separate tabs)
- [ ] Authorize copy-to-UI mapping in a **separate task** after draft approval
- [ ] Authorize implementation into `commercial-industries.ts` only after mapping approval

---

## Stop gates (repeat)

- **NO MERGE · NO DEPLOY · NO VERCEL PROMOTION**
- **NO WEBSITE CHANGES · NO EXPLORER ENGINEERING CHANGES · NO AUDIT SCANNER CHANGES**
- **Restaurant, Liquor Liability, and other routes remain untouched**

**STOP FOR OWNER REVIEW.**
