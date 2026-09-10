# Liquor Liability Insurance — Content Draft V2 (Owner Review)

**Route:** `/liquor-liability-insurance/`  
**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Prior draft:** `docs/liquor-liability-content-draft-2026-09-08.md` (V1)  
**Source research:** `docs/2a-hospitality-food-research-2026-09-07.md` (Module 2.2 + AGCO reference block)  
**Status:** Draft only — **NO IMPLEMENTATION · NO WEBSITE CHANGES · NO COPY-TO-UI MAPPING**

---

## Stop gates

- **NO MERGE · NO DEPLOY · NO VERCEL PROMOTION**
- **Do not edit** `src/data/product-pages/commercial-products-specialty.ts` or any live product-page data until owner approves this draft
- **Do not touch** Restaurant, Food Truck, Hotel/Motel, Event Liability, or Convenience Store
- **Do not change** Explorer engineering, images, registry, or audit scanner

**STOP FOR OWNER REVIEW before any implementation or copy-to-UI mapping work begins.**

---

## Category key (internal — not for live page)

| Tag | Meaning |
|-----|---------|
| **[COVERAGE]** | Purchasable insurance product |
| **[UNDERWRITING]** | Insurer/broker evaluation factor |
| **[REGULATORY]** | Legal/licensing requirement (not insurance) |
| **[EXPOSURE]** | Operational risk (may or may not map to a coverage) |

**Four-category rule (mandatory throughout this draft):** Do not write **[REGULATORY]** or **[EXPOSURE]** facts as if they were **[COVERAGE]**. Maintain the distinction between insurance coverage · underwriting consideration · regulatory/legal requirement · operational exposure.

---

## V2 summary — what changed from V1

| Issue | V1 problem | V2 correction |
|-------|------------|---------------|
| Assault & Battery customer language | Blunt claims-industry `shortLabel` / `detailTitle` | Customer-facing **Altercations** + **When an altercation leads to a liability claim**; internal title preserved for state ID |
| Hero | Legalistic; conflated civil liability, LLCA, AGCO, statutory vs contractual in one paragraph | Customer-first insurance brokerage hero; regulatory detail moved to Considerations/FAQs |
| AGCO proof of insurance | Repeatedly implied AGCO requests proof during licensing/application | **Removed** — not supported by current AGCO primary sources; narrowed to contractual counterparties |
| Smart Serve (#4) | Universal requirement across all liquor service models | Licence/authorization-specific training requirements; SOP explicitly **not** a Smart Serve mandate |
| Civil liability wording (#2) | "Under the LLCA, licensees can face civil liability…" | Civil liability framed as exposure from alcohol service; AGCO guidance cited; no overstatement that LLCA creates every civil cause of action |
| Consideration #9 | Generic "Did you know?" heading | **Licence enforcement and civil claims are different** — substantive heading with softened insurance claims |
| Insurance-market claims | Presented as universal market facts | Verified where possible; hedged with "depending on the policy" where wording varies |
| Explorer State 1 | Used "dram-shop-style" (U.S.-leaning) | Removed; Ontario-appropriate framing |

**Architecture preserved:** 4 Explorer states · existing state IDs · existing zone mappings · existing interactive-master image · 9 Practical Considerations · 5 FAQs · expandable considerations recommendation · no fifth General Liability Explorer state.

---

## Explorer state ID / customer-facing title — architecture note

**Inspected:** `src/lib/buildPilotProductConfig.ts` derives Explorer state IDs via `slugify(item.title)`.

| If title were changed to… | Resulting state ID | Impact |
|---------------------------|-------------------|--------|
| `Assault & Battery` *(current)* | `assault-battery` | ✅ Matches `interaction-manifest/routes.ts` zone mapping |
| `Altercations & Security Incidents` | `altercations-security-incidents` | ❌ Breaks zone mapping |

**Conclusion:** Do **not** change the `title` field for State 2 during implementation. Preserve `"Assault & Battery"` as the technical title required for state identity.

**Customer-facing wording fields (no engineering change):**

| Field | State 2 value |
|-------|---------------|
| `shortLabel` | **Altercations** |
| `title` | **Assault & Battery** *(unchanged — internal/technical)* |
| `detailTitle` | **When an altercation leads to a liability claim** |
| `description` | May reference that policies commonly use the term "assault and battery" |

**Implementation limitation to note:** `visualCaption` is currently derived from `title` in `buildPilotProductConfig.ts`, so the image caption may still display "Assault & Battery" until/unless Explorer engineering adds a separate display-title field. This draft does **not** propose that engineering change.

---

## Existing Explorer state inventory (unchanged)

**Data source:** `src/data/product-pages/commercial-products-specialty.ts` → `coverageTypes` (4 items)  
**Visual config:** `src/data/coverage-explorer/interaction-manifest/routes.ts` → `liquor-liability-insurance`  
**Image asset:** `liquor-liability-insurance-interactive-master.png`

| # | State ID | Title (preserved) | Zones |
|---|----------|-------------------|-------|
| 1 | `patron-injury-property-damage` | Patron Injury & Property Damage | building-shell, kitchen-prep, bar-zone |
| 2 | `assault-battery` | Assault & Battery | dining-floor, building-shell |
| 3 | `legal-defence` | Legal Defence | dining-floor, building-shell |
| 4 | `event-host-liquor` | Event Host Liquor | bar-zone, bar-seating, dining-floor |

---

## 1. Hero / Subhead

**Headline:** Liquor Liability Insurance

**Subhead (proposed — V2, customer-first):**

> Liquor liability insurance helps protect bars, restaurants, caterers, event hosts, and other businesses that sell or serve alcohol against certain alcohol-related liability claims. If alcohol service contributes to an injury or property damage, the resulting claim may fall outside standard commercial general liability coverage or be limited by policy wording. Premium Insurance Brokers can help you understand how liquor liability fits with your existing business insurance, your AGCO authorization, and the way you actually serve alcohol.

**Category mix:** [COVERAGE] + [EXPOSURE] — brokerage introduction; regulatory detail deferred to Considerations and FAQs.

**Fact-check note:** The CGL gap statement is directionally supported by Ontario market practice and case law on liquor-related exclusions (see verification notes §11), but is hedged because policy wording varies.

---

## 2. coverageIntro

**Proposed:**

> Liquor liability may help respond to certain claims tied to alcohol service or permitted events — coverage that, depending on the policy, may be excluded, restricted, sub-limited, or require separate liquor liability coverage alongside standard commercial general liability.

---

## 3. Coverage Explorer — 4 states (proposed full copy)

### State 1 — `patron-injury-property-damage`

**Category:** [COVERAGE]

**RIGHT selector**

| Field | Proposed copy |
|-------|---------------|
| **shortLabel** | Patron Claims |
| **title** | Patron Injury & Property Damage *(unchanged — preserves state ID)* |
| **description** | May help respond to certain claims alleging that a patron served alcohol at your licensed premises or permitted event caused bodily injury or property damage to a third party, subject to policy terms, exclusions, and limits. |

**LEFT contextual detail**

| Field | Proposed copy |
|-------|---------------|
| **detailTitle** | When service at the bar becomes a third-party claim |
| **detailDescription** | Claims that a patron was overserved, or that alcohol contributed to a crash, assault, or other harm after leaving, are a core civil exposure AGCO's licensing guides describe separately from administrative licence penalties. Depending on the policy, alcohol-related third-party injury and property-damage claims may be excluded, sub-limited, or addressed through liquor liability coverage purchased alongside general liability. What triggers coverage, who qualifies as an insured, and whether the claim arose from on-premises service versus a permitted off-site event depend on policy wording — confirm scope with your broker. |

---

### State 2 — `assault-battery`

**Category:** [COVERAGE]

**RIGHT selector**

| Field | Proposed copy |
|-------|---------------|
| **shortLabel** | **Altercations** |
| **title** | Assault & Battery *(unchanged — preserves state ID `assault-battery`)* |
| **description** | May address certain altercation or security-incident claims linked to alcohol service at your premises or event, where included in the policy. Insurance policies commonly refer to this exposure as "assault and battery" — confirm whether it is covered, capped, or excluded in your wording. |

**LEFT contextual detail**

| Field | Proposed copy |
|-------|---------------|
| **detailTitle** | **When an altercation leads to a liability claim** |
| **detailDescription** | Late-night service, crowded patios, and special events can generate altercation or security-response allegations tied to intoxicated patrons — losses carriers often treat differently from a simple slip-and-fall. Depending on the policy, assault-and-battery coverage may be included, sub-limited, or excluded, especially where security staff or bouncers are involved. Ontario courts have upheld broad assault-and-battery exclusions in both CGL and liquor liability policies when allegations are connected to removal, ejection, or use of force — policy wording matters. Your broker should review whether your expected crowd-control and service hours are reflected in the coverage you are purchasing. |

---

### State 3 — `legal-defence`

**Category:** [COVERAGE]

**RIGHT selector**

| Field | Proposed copy |
|-------|---------------|
| **shortLabel** | Defence Costs |
| **title** | Legal Defence *(unchanged)* |
| **description** | May help with legal defence costs for covered liquor liability claims, subject to policy terms, deductibles or retentions, and whether the underlying allegation falls within the insuring agreement. |

**LEFT contextual detail**

| Field | Proposed copy |
|-------|---------------|
| **detailTitle** | Defence costs can accrue before fault is determined |
| **detailDescription** | Civil claims alleging overservice or alcohol-related harm can require immediate legal response — even when you believe service was responsible. Where a liquor liability policy includes defence-cost coverage, it typically responds to claims that potentially fall within the insuring agreement, but deductibles, duty-to-defend wording, and exclusions vary by carrier and policy form. Treatment of punitive damages, regulatory fines, and administrative proceedings also depends on policy wording — do not assume they are covered or excluded without review. AGCO licence suspension or revocation is a regulatory enforcement action, separate from a third-party civil lawsuit. |

---

### State 4 — `event-host-liquor`

**Category:** [COVERAGE]

**RIGHT selector**

| Field | Proposed copy |
|-------|---------------|
| **shortLabel** | Host / Event |
| **title** | Event Host Liquor *(unchanged)* |
| **description** | May address certain alcohol-related liability for temporary events, bring-your-own functions, or service under a Special Occasion Permit or caterer's authorization — distinct from ongoing premises liquor liability under a Liquor Sales Licence, subject to policy terms. |

**LEFT contextual detail**

| Field | Proposed copy |
|-------|---------------|
| **detailTitle** | A one-night event is not the same risk profile as a licensed bar |
| **detailDescription** | Weddings, fundraisers, corporate functions, and catered off-site service often rely on Special Occasion Permits, Caterer's Endorsements, or host-liquor arrangements rather than a standing Liquor Sales Licence at a fixed address. LCBO's Special Occasion Permit FAQ states provincial regulations do not require permit holders to carry party liability insurance — but venues, municipalities, and rental contracts frequently do. Host liquor or event liquor coverage, where available, is often underwritten separately from premises liquor liability; service model, permit type, attendance, and whether you control service must be disclosed to your broker. |

---

## 4. Practical Considerations (9 — proposed)

### 1. Licence type determines your regulatory framework
**Category:** [REGULATORY]

AGCO authorizes alcohol through different instruments — Liquor Sales Licence (ongoing on-premises service), Special Occasion Permit (temporary events), Caterer's Endorsement (off-site service tied to an existing licence), and retail licences for convenience or grocery stores. Each has different obligations and service models. Your broker needs to know which authorization applies because insurance structure follows how and where alcohol is legally sold or served — not every licence type maps to the same liquor liability wording.

### 2. Civil liability is not the same as carrying insurance
**Category:** [REGULATORY] + [EXPOSURE]

Businesses that sell or serve alcohol can face civil liability when alcohol service contributes to harm — separately from AGCO licensing or enforcement consequences. AGCO's Section 1 Liquor Sales Licence guide states that, beyond administrative sanctions, you may be held **civilly liable** for harm caused by someone who was served liquor in your business, and recommends consulting a legal advisor and insurance professional. That civil exposure exists independently of whether you purchase coverage. The Liquor Licence and Control Act authorizes licensing and sets regulatory standards; it does not, by itself, mandate liquor liability insurance as a statutory condition of holding a licence.

### 3. Contractual proof of insurance is different from a provincial insurance mandate
**Category:** [UNDERWRITING] + [REGULATORY]

A landlord, venue, municipality, franchise, or lender may separately require proof of liquor liability insurance — certificates, minimum limits, or additional-insured status — under a lease, event contract, or other agreement. Those are contractual documentation requirements, not the same thing as the LLCA prescribing a named insurance product for licence issuance. AGCO's Liquor Sales Licence application required-documents list does not include proof of liquor liability insurance. Maintain copies of what each counterparty actually requires rather than assuming one certificate satisfies every relationship.

### 4. Responsible-service training depends on your authorization — and is not insurance
**Category:** [REGULATORY]

Training requirements differ by licence or authorization type:

- **Liquor Sales Licence and related endorsements** (including Caterer's Endorsement): Registrar Standard 4.1 requires persons involved in the sale, service, sampling, or delivery of liquor — and security staff employed by the licensee — to hold valid certification from an AGCO Board-approved training program (commonly Smart Serve for on-premises service).
- **Special Occasion Permit:** LCBO's SOP FAQ states Smart Serve is **not a requirement** for permit holders, though training is recommended. Standard 4.1's mandatory training list does not include Special Occasion Permit among its applicable authorization types.
- **Convenience / grocery retail:** Separate AGCO Board-approved liquor retail training programs apply to retail store employees under the Registrar's Standards for Grocery and Convenience Stores.

Training supports regulatory compliance and responsible service but does not replace liquor liability coverage. Insurers may ask about training during underwriting — that is an evaluation factor, not a coverage product.

### 5. Special Occasion Permits versus a Liquor Sales Licence
**Category:** [REGULATORY]

A Liquor Sales Licence authorizes ongoing alcohol service at licensed premises. A Special Occasion Permit authorizes temporary sale or service at defined events — private, public/charity, bring-your-own, and other categories with different rules. LCBO's Special Occasion Permit FAQ confirms provincial regulations do not require permit holders to carry party liability insurance, though venues may require it contractually. If your operation spans both models, disclose each scenario to your broker rather than relying on a single premises policy.

### 6. Caterers, mobile bars, and off-site service
**Category:** [REGULATORY] + [COVERAGE]

Ontario does not issue a standalone mobile bar licence to food trucks or roaming operators. Off-site alcohol service typically requires a Caterer's Endorsement on an existing Liquor Sales Licence or an appropriate Special Occasion Permit at the event location. A caterer serving under a Caterer's Endorsement does not need a separate SOP for that catered event, but the licence holder remains responsible for compliance. Liquor liability for off-site service may need to be confirmed separately from premises coverage — especially when you serve at venues you do not control.

### 7. How liquor liability relates to your underlying business policy
**Category:** [COVERAGE] + [UNDERWRITING]

Restaurants, bars, hotels, and event venues often carry a commercial package policy with general liability — but depending on the policy, alcohol-related liability may be excluded, restricted, sub-limited, or require separate liquor liability coverage. Liquor liability may be purchased as an endorsement, within a hospitality package, or as a standalone policy depending on carrier and operation. Confirm what your existing restaurant, bar, or event policy actually includes before assuming liquor liability is already in place.

### 8. Sales mix, hours, and security affect underwriting
**Category:** [UNDERWRITING] + [EXPOSURE]

Carriers evaluate alcohol as a percentage of revenue, latest service hours, patron capacity, entertainment, and whether you employ security or crowd-control staff. A wine-focused restaurant, a late-night nightclub, and a one-day charity beer garden present different liquor liability profiles even when all require AGCO authorization.

### 9. Licence enforcement and civil claims are different
**Category:** [REGULATORY] vs [COVERAGE]

AGCO administrative action — warnings, monetary penalties, suspension, or revocation of a licence or permit — is regulatory enforcement under the Liquor Licence and Control Act framework. A civil lawsuit from an injured third party is a separate legal track. Liquor liability insurance may help respond to certain covered civil claims and defence costs, subject to policy terms; it does not prevent licence sanctions or substitute for responsible service obligations. Whether regulatory fines, punitive damages, or costs of responding to AGCO proceedings are insured depends on the specific policy wording — confirm with your broker rather than assuming they are always excluded or always covered.

---

## 5. FAQ (5 — proposed)

### Q1. Does AGCO require liquor liability insurance?

**Category focus:** [REGULATORY] + [UNDERWRITING] + [COVERAGE]

**Proposed answer:**

No — the Liquor Licence and Control Act does not mandate liquor liability insurance as a statutory condition of holding a Liquor Sales Licence or related AGCO authorization. AGCO's Section 1 Liquor Sales Licence guide states that, beyond administrative sanctions, you may be held civilly liable for harm caused by someone served liquor at your business, and recommends consulting an insurance professional — but that is guidance on civil exposure, not a named insurance requirement for licence issuance. AGCO's required application documents for a Liquor Sales Licence do not include proof of liquor liability insurance.

Separately, a landlord, venue, municipality, franchise, or lender may require proof of coverage under a lease, event contract, or other agreement. Those are contractual documentation requirements; they do not change the fact that the Act itself does not prescribe a named insurance product. If you are evaluating whether to purchase coverage, the relevant question is usually whether your operations create civil exposure and whether your general liability policy excludes or limits alcohol-related claims — confirm with your broker.

---

### Q2. How is liquor liability different from general liability on my business policy?

**Category focus:** [COVERAGE]

**Proposed answer:**

Commercial general liability may help with certain third-party injury or property-damage claims arising from your premises and operations, but depending on the policy, claims tied to alcohol service — including overservice allegations and harm occurring after a patron leaves — may be excluded, sub-limited, or require separate liquor liability coverage. Liquor liability is a distinct coverage product or endorsement meant to address many alcohol-related liability scenarios that CGL may not fully cover. If you already have restaurant, bar, hotel, or event insurance, confirm with your broker whether liquor liability is included, endorsed, or needs to be added separately — do not assume from a policy label alone.

---

### Q3. What is the difference between a Liquor Sales Licence and a Special Occasion Permit?

**Category focus:** [REGULATORY] + [COVERAGE]

**Proposed answer:**

A Liquor Sales Licence authorizes ongoing sale and service of alcohol at licensed premises such as a restaurant, bar, or hotel lounge. A Special Occasion Permit (SOP) authorizes temporary alcohol service at a defined event — such as a wedding, festival, or charity function — outside the normal standing-licence model. The regulatory rules, permit categories, and service responsibilities differ. LCBO's Special Occasion Permit FAQ states provincial regulations do not require SOP holders to carry party liability insurance, though a venue or municipality may require proof of coverage contractually. Insurance should be structured around how you actually serve alcohol — permanent premises, catered events, bring-your-own functions, or a mix — not assumed from one licence type alone.

---

### Q4. Do caterers and event hosts need different coverage than a bar or restaurant?

**Category focus:** [COVERAGE] + [REGULATORY]

**Proposed answer:**

Coverage needs depend on your service model and policy wording — not every caterer or event host requires a categorically different product, but the exposures differ. A fixed bar operating under a Liquor Sales Licence has different risks from a caterer serving under a Caterer's Endorsement or a charity hosting a public event under a Special Occasion Permit. Host liquor or event liquor coverage may be relevant when you do not control service in the same way as a licensed establishment, or when alcohol service occurs off your primary premises. Bring-your-own events and temporary venues can also trigger certificate and additional-insured requirements from landlords and municipalities that a standard premises policy may not address. Disclose every service scenario to your broker so coverage can be matched to how you actually operate.

---

### Q5. What information do I need for a liquor liability quote?

**Category focus:** [UNDERWRITING]

**Proposed answer:**

Insurers and brokers commonly ask for: licence or permit type (Liquor Sales Licence, Special Occasion Permit, Caterer's Endorsement, or other AGCO authorization), business legal name, premises address(es) and event locations, annual revenue and estimated alcohol sales percentage, seating capacity or expected event attendance, hours of service, entertainment or security arrangements, prior liquor-related claims or incidents, and any landlord, venue, franchise, or municipal insurance requirements in your contracts.

Training certification may also be requested during underwriting — for example, Smart Serve for Liquor Sales Licence staff subject to Standard 4.1, or liquor retail training for convenience/grocery staff. Training requirements are set by AGCO standards and differ by authorization type; what an insurer asks about during underwriting is separate from what the law requires for licensing. If you also carry a restaurant, bar, or event policy, bring your existing declarations page so your broker can identify gaps rather than duplicate coverage.

---

## 6. whoItIsFor (trust band — proposed)

**Proposed:**

> For Windsor–Essex bars, restaurants, breweries, caterers with alcohol service, event hosts under Special Occasion Permits, and other AGCO-authorized sellers — reviewed through an independent broker who can confirm how liquor liability fits alongside your existing business coverage.

---

## 7. Practical Considerations presentation — recommendation

**Recommend: expandable presentation** (`considerationsPresentation: 'expandable'`)

| Factor | Assessment |
|--------|------------|
| Item count | **9** considerations |
| Average body length | Long — items 2, 3, 4, 5, and 7 carry multi-sentence regulatory framing |
| Regulatory density | High — AGCO/LLCA/SOP content is inherently text-heavy |
| Mobile scanability | Collapsed cards with extracted teasers reduce wall-of-text risk |
| Precedent | Restaurant uses expandable mode successfully |

**Not recommended:** Standard static grid — would reproduce scroll-heavy regulatory wall without scanability.

**Consideration overlap review (V2):** Items 1, 3, 4, 5, and 9 remain distinct after V2 corrections:

| Pair | Distinction |
|------|-------------|
| #1 vs #5 | #1 = authorization taxonomy; #5 = LSL vs SOP operational comparison |
| #3 vs #5 | #3 = contractual proof requirements; #5 = permit vs licence service models |
| #4 vs #5 | #4 = training requirements by authorization; #5 = permit vs licence structure |
| #9 vs #2 | #9 = enforcement track vs civil lawsuit track; #2 = civil exposure vs insurance purchase |

No consolidation recommended — each item serves a distinct purpose.

---

## 8. Sources (updated — V2)

Every substantive claim maps to a primary source where available. Insurance-market claims are tagged by source type.

### Regulatory / authoritative (primary)

| Claim | What the source establishes | Source |
|-------|----------------------------|--------|
| Liquor Sales Licence authorizes on-site sale/service of liquor | Defines licence purpose and application requirements | **AGCO** — Section 1: Liquor Sales Licences — https://www.agco.ca/en/alcohol/responsibilities-and-resources/guides/section-1-liquor-sales-licences |
| Licensees may be held **civilly liable** for harm from alcohol service; consult legal advisor and insurance professional | AGCO acknowledges civil liability exposure **separate from** administrative sanctions; recommends insurance professional consultation — **does not** mandate a named insurance product | Same URL — **Liability** section |
| AGCO administrative enforcement (warnings, penalties, suspension, revocation) is distinct from civil liability | Inspections / Notices of Proposal sections describe regulatory track | Same URL — **Inspections**, **Notices of Proposal / Hearings** sections |
| Liquor Sales Licence application required documents do **not** include proof of liquor liability insurance | Fee, disclosures, floor plans, tax compliance, agency letters — no insurance certificate listed | Same URL — **Required Information**, **Additional Documents** sections |
| Standard 4.1 mandatory training for sale/service/security staff | Applies to Liquor Sales Licence, Caterer's Endorsement, and listed endorsements — **not** Special Occasion Permit in applicable-to list | **AGCO** — Registrar's Interim Standards 4.1 — https://www.agco.ca/en/alcohol/registrars-interim-standards-and-requirements-liquor/4-responsible-sale-service-and |
| AGCO Board-approved training programs by role | Smart Serve for broader sector including bars/restaurants; separate retail and delivery programs | **AGCO** — Responsible liquor sale, service and delivery training — https://www.agco.ca/en/alcohol/responsible-liquor-sale-service-and-delivery-training |
| SOP: provincial regulations do **not** require party liability insurance; venue may require it | Explicit FAQ answer | **LCBO** — SOP FAQs, item 9 — https://hellolcbo.com/app/answers/detail/a_id/3103 |
| SOP: Smart Serve **not a requirement** for permit holders; recommended | Explicit FAQ answer in same item 9 | Same LCBO URL |
| SOP categories, temporary-event rules, application documentation | SOP guide structure and required documentation (sketches, municipal notifications — not insurance) | **AGCO** — Section 7: Submitting an SOP Application — https://www.agco.ca/en/alcohol/responsibilities-and-resources/guides/section-7-submitting-sop-application |
| Caterer's Endorsement — off-site service tied to existing Liquor Sales Licence; SOP not required for catered event | Endorsement scope and 10-day limit | **AGCO** — Section 3: Endorsements — https://www.agco.ca/en/alcohol/responsibilities-and-resources/guides/section-3-endorsements |
| Risk-based licensing may attach conditions (e.g., bond/letter of credit) | Conditions section — **different product** from liquor liability insurance | Section 1 guide — **Conditions** section |
| LLCA licensing conditions do not include statutory mandate for liability insurance *(historical analysis)* | 2001 Council report analyzing LLCA — **contextual/historical only, not sole 2026 authority** | **City of Toronto** — Report on Liability Insurance for Premises Licensed to Sell Liquor (2001) — https://www.toronto.ca/legdocs/2001/agendas/council/cc010724/plt8rpt/cl010.pdf |
| Retail alcohol — convenience/grocery training obligations | Separate Registrar's Standards for Grocery and Convenience Stores | **AGCO** — Convenience Store Licence Obligation Guide — https://www.agco.ca/en/alcohol/responsibilities-and-resources/guides/convenience-store-licence-obligation-guide |

### Insurance / market (secondary — tagged by source type)

| Claim | Source type | Basis |
|-------|-------------|-------|
| CGL may exclude or sub-limit liquor-related claims | **Ontario court decision (policy wording)** + market practice | *Jack-O's Sports Bar v. US Liability Insurance Co.*, 2023 ONSC 5925 — assault-and-battery exclusion in CGL/liquor policy denied duty to defend |
| Assault-and-battery coverage commonly limited or excluded | **Ontario court decision (policy wording)** | Same case — broad A&B exclusion language upheld |
| Defence costs respond only for claims within insuring agreements; duty to defend varies | **Ontario court decision (policy wording)** + standard liability policy structure | Same case |
| Host liquor / event liquor distinct from premises liquor liability | **Market-practice inference** — common hospitality product segmentation; confirm per policy |
| Landlords, venues, municipalities commonly require certificates and minimum limits | **Market-practice inference** — commercial lease and event-contract practice [UNDERWRITING] |
| Liquor liability may be endorsement, package component, or standalone | **Market-practice inference** — confirm per carrier/program |
| Punitive damages / regulatory fines treatment | **Policy-dependent** — not verified as universally excluded or covered; confirm per wording |

### Internal reference (research lineage)

| Document | Use |
|----------|-----|
| `docs/2a-hospitality-food-research-2026-09-07.md` | Module 2.2 Liquor Liability; AGCO reference block |
| `docs/liquor-liability-content-draft-2026-09-08.md` | V1 draft (superseded by this document for owner review) |
| `docs/restaurant-final-copy-draft-2026-09-07.md` | Verified AGCO/LLCA/SOP framing lineage |
| `src/data/product-pages/commercial-products-specialty.ts` | Current live page baseline |
| `src/data/coverage-explorer/interaction-manifest/routes.ts` | Existing 4-state Explorer inventory |
| `src/lib/buildPilotProductConfig.ts` | State ID derivation from `title` |

---

## 9. Claim-by-claim verification notes (V2)

### A. Assault & Battery customer-facing language

| Proposition | Status | Notes |
|-------------|--------|-------|
| Internal state ID must remain `assault-battery` | **Verified (engineering)** | `slugify("Assault & Battery")` → `assault-battery`; matches manifest |
| Customer-facing `shortLabel` can be "Altercations" | **Safe — no ID impact** | `shortLabel` does not affect state ID |
| Customer-facing title "Altercations & Security Incidents" cannot replace `title` without breaking mapping | **Verified (engineering)** | Would produce `altercations-security-incidents` |
| Policies commonly use "assault and battery" terminology | **Verified (policy wording / case law)** | *Jack-O's Sports Bar*, 2023 ONSC 5925 — explicit A&B exclusion definitions in CGL and liquor policy |

### B. Hero simplification

| Proposition | Status | Notes |
|-------------|--------|-------|
| Liquor liability helps protect businesses that sell/serve alcohol against certain alcohol-related claims | **Market-practice inference** — standard product description; accurate as brokerage framing |
| Alcohol-related claims may fall outside or be limited by standard CGL | **Directionally verified — policy-dependent** | Ontario case law supports exclusions; must remain hedged |
| Premium Insurance Brokers can help align coverage with authorization and service model | **Brokerage positioning** — not a regulatory claim |

### C. AGCO proof of insurance during application

| Proposition | Status | Notes |
|-------------|--------|-------|
| AGCO requires proof of liquor liability insurance during ordinary Liquor Sales Licence application | **NOT VERIFIED — REMOVED from V2 public copy** | Section 1 required/additional documents list has no insurance certificate |
| Landlord/venue/municipality may require proof contractually | **Verified (LCBO SOP FAQ)** for venue context; general commercial practice for leases |
| AGCO recommends consulting insurance professional for civil liability | **Verified** | Section 1 Liability section — recommendation, not mandate |
| Risk-based licensing may impose bond/letter of credit | **Verified — different product** | Section 1 Conditions section; do not conflate with liquor liability insurance |

### D. Smart Serve / training (Consideration #4)

| Authorization | Training requirement | Source |
|---------------|---------------------|--------|
| Liquor Sales Licence + Caterer's Endorsement + listed endorsements | Standard 4.1 — AGCO Board-approved training required for sale/service/security staff | AGCO Standard 4.1 |
| Special Occasion Permit | Smart Serve **not required**; recommended | LCBO SOP FAQ item 9 |
| Convenience / grocery retail | AGCO Board-approved liquor **retail** training programs | AGCO training page + Convenience Store Obligation Guide |

### E. Civil liability / LLCA wording (Consideration #2)

| Proposition | Status | Notes |
|-------------|--------|-------|
| "Under the LLCA, licensees can face civil liability…" | **Overbroad — corrected in V2** | AGCO says you "may be held civilly liable" — does not attribute every cause of action to LLCA text |
| Businesses can face civil liability when alcohol service contributes to harm | **Verified (AGCO guidance)** | Section 1 Liability section |
| Civil exposure exists separately from AGCO licensing/enforcement | **Verified** | Liability section vs Inspections/Notices of Proposal sections |

### F. Enforcement vs civil claims (Consideration #9)

| Proposition | Status | Notes |
|-------------|--------|-------|
| Licence suspension/revocation is regulatory enforcement | **Verified** | AGCO Section 1 — Inspections, Notices of Proposal |
| Civil lawsuit is a separate track | **Verified** | AGCO Liability section distinguishes civil liability from administrative sanctions |
| Liquor liability may respond to covered civil claims/defence costs | **Policy-dependent** — hedged in V2 |
| Regulatory fines/penalties/administrative defence never insured | **NOT verified as universal — softened** | Treatment depends on policy wording; V2 avoids categorical never/always |

### G. Insurance-market claims (Explorer + FAQ)

| Proposition | Status | Notes |
|-------------|--------|-------|
| CGL frequently excludes liquor-related claims | **Directionally verified — not universal** | *Jack-O's* case; hedge with "depending on the policy" |
| A&B commonly limited/excluded | **Verified as market pattern — policy-dependent** | *Jack-O's* — broad exclusion upheld |
| Host/event liquor underwritten separately | **Market-practice inference** — not verified from single primary insurer document |
| Defence cost treatment / duty to defend | **Policy-dependent** | *Jack-O's* illustrates variation |
| Punitive damages / regulatory fines | **Policy-dependent — not categorically stated** |
| Liquor liability as endorsement/package/standalone | **Market-practice inference** |

### H. Explorer terminology review

| Term | V2 treatment |
|------|--------------|
| "dram-shop-style" | **Removed** — U.S.-leaning; replaced with Ontario-appropriate overservice/harm framing |
| "duty to defend" | Retained in State 3 — standard insurance term, explained in context |
| "retentions" | Changed to "deductibles or retentions" in State 3 description for clarity |
| "punitive damages / regulatory fines" | Retained with policy-dependent hedging |
| "host liquor / BYO / Caterer's Endorsement / SOP" | Retained where tied to verified AGCO/LCBO definitions |

---

## 10. Propositions Cursor could NOT independently verify

The following remain **unverified from a current primary source** and are hedged or removed accordingly in V2 public copy:

| # | Proposition | V2 treatment |
|---|-------------|--------------|
| 1 | AGCO requests proof of liquor liability insurance during ordinary licensing/application | **Removed** — no primary AGCO application document supports this |
| 2 | Every standard CGL policy excludes all liquor-related claims | **Softened** — "depending on the policy… may be excluded, restricted, sub-limited" |
| 3 | Host/event liquor is **always** underwritten separately from premises liquor liability | **Softened** — "often underwritten separately" / "where available" |
| 4 | Regulatory fines, punitive damages, and AGCO proceeding costs are **never** insured | **Softened** — "depends on policy wording" |
| 5 | Which specific statute or common-law doctrine creates every possible civil cause of action against a licensee | **Not stated** — intentionally avoided; AGCO civil-liability guidance used instead |
| 6 | Universal landlord/venue minimum limit amounts or certificate formats | **Not stated** — contractual practice referenced generically |
| 7 | That purchasing liquor liability guarantees coverage for any alcohol-related lawsuit | **Not stated** — exclusions and limits emphasized throughout |

**Note for Restaurant route:** Live Restaurant copy (implemented in D2 calibration) still includes "proof of insurance may still be requested during the licensing or application process" — that wording was **not re-verified here** and is **out of scope** for this liquor-liability-only draft. Owner may wish a separate correction pass on Restaurant if AGCO application proof remains unverified.

---

## 11. CHANGE LOG — V1 → V2

### Assault & Battery presentation change
- **V1:** `shortLabel` "Assault & Battery"; `detailTitle` "Bar fights and crowd incidents are a distinct coverage question"
- **V2:** `shortLabel` **Altercations**; `title` unchanged (**Assault & Battery**); `detailTitle` **When an altercation leads to a liability claim**; description notes policies commonly use "assault and battery"
- **Architecture:** Documented `slugify(title)` constraint; no Explorer engineering change proposed

### Hero simplification
- **V1:** Single paragraph covering civil liability, LLCA, AGCO guidance, statutory requirements, contractual proof, CGL gaps
- **V2:** Three-sentence customer-first brokerage hero; AGCO/LLCA/statutory detail relocated to Considerations #2, #3, #9 and FAQ Q1

### AGCO proof-of-insurance correction
- **V1:** Stated or implied AGCO may request proof during licensing/application (hero, Consideration #3, FAQ Q1)
- **V2:** Removed AGCO-as-requester language; Consideration #3 retitled to **Contractual proof of insurance is different from a provincial insurance mandate**; cites absence from AGCO required application documents

### Smart Serve correction
- **V1:** Universal "Staff who sell or serve alcohol under LLCA standards must meet AGCO training requirements — commonly Smart Serve"
- **V2:** Licence/authorization-specific breakdown (LSL/Caterer's Endorsement vs SOP vs retail); explicit SOP non-requirement per LCBO FAQ; training ≠ insurance distinction preserved

### Civil-liability wording correction
- **V1:** "Under the Liquor Licence and Control Act, licensees and permit holders can face civil liability…"
- **V2:** "Businesses that sell or serve alcohol can face civil liability when alcohol service contributes to harm — separately from AGCO licensing or enforcement consequences" + AGCO Section 1 civil-liability guidance

### Enforcement-vs-civil refinement
- **V1:** Heading "Did you know?"; categorical tone on regulatory proceedings vs insurance
- **V2:** Heading **Licence enforcement and civil claims are different**; policy-dependent hedging on fines/punitive damages/administrative costs

### Insurance-market wording / source changes
- **V1:** "Standard CGL frequently excludes…", "assault-and-battery coverage is commonly limited or excluded" without case citation
- **V2:** "Depending on the policy…" pattern throughout; *Jack-O's Sports Bar v. US Liability Insurance Co.*, 2023 ONSC 5925 cited for A&B/CGL exclusion pattern; source table tags market-practice inference vs policy wording vs regulatory primary

### Explorer copy refinements
- Removed "dram-shop-style" from State 1
- Added Ontario case-law reference in State 2 detail
- Softened categorical defence/fine/punitive statements in State 3
- FAQ Q4 softened from "Often yes" to "Coverage needs depend on service model and policy wording"
- FAQ Q5 separated insurer/broker information requests from legal/licensing training requirements

---

## Owner review checklist

- [ ] Approve V2 hero/subhead (customer-first, not legalistic)
- [ ] Approve **Altercations** `shortLabel` with preserved **Assault & Battery** technical `title`
- [ ] Approve architecture note on `title` / state ID limitation
- [ ] Approve removal of AGCO proof-of-insurance-during-application language
- [ ] Approve licence-specific Smart Serve / training framing (Consideration #4)
- [ ] Approve civil-liability wording (Consideration #2)
- [ ] Approve Consideration #9 heading and body
- [ ] Approve hedged insurance-market language across Explorer states and FAQs
- [ ] Approve **9** Practical Considerations (unchanged count)
- [ ] Approve **expandable** considerations presentation recommendation
- [ ] Approve **5** FAQ items
- [ ] Review unverified propositions list (§10)
- [ ] Authorize copy-to-UI mapping in a **separate task** after this draft is approved
- [ ] Authorize implementation into `commercial-products-specialty.ts` only after mapping approval

---

## Stop gates (repeat)

- **NO MERGE · NO DEPLOY · NO VERCEL PROMOTION**
- **NO WEBSITE CHANGES · NO EXPLORER ENGINEERING CHANGES · NO AUDIT SCANNER CHANGES**
- **Other 2A routes remain untouched**

**STOP FOR OWNER REVIEW.**
