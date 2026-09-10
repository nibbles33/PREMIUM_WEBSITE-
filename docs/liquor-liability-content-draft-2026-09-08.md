# Liquor Liability Insurance — Content Draft (Owner Review)

**Route:** `/liquor-liability-insurance/`  
**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Source research:** `docs/2a-hospitality-food-research-2026-09-07.md` (Module 2.2 + AGCO reference block)  
**Verified AGCO/LLCA framing:** Restaurant final draft + live implementation (`docs/restaurant-final-copy-draft-2026-09-07.md`, `docs/restaurant-d2-calibration-implementation-2026-09-08.md`)  
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

## Corrected AGCO / LLCA framing (applied from the start)

This draft uses the **already-verified framing** from Restaurant implementation — not the live page's incorrect FAQ:

| Statement | Category | Draft usage |
|-----------|----------|-------------|
| The **Liquor Licence and Control Act itself does not mandate** liquor liability insurance as a statutory condition of holding a licence | [REGULATORY] | Hero, Considerations, FAQ Q1 |
| Licensees may face **civil liability** for harm tied to alcohol service — AGCO's licensing guide: *"Liability: There's more to lose than your licence"* — and recommends consulting an insurance professional | [REGULATORY] + [EXPOSURE] | Hero, Considerations, FAQ Q1 |
| **Proof of insurance** may still be requested during licensing/application, by a landlord, or under contractual terms — documentation/contractual practice, **not** a provincial insurance mandate | [UNDERWRITING] | Considerations, FAQ Q1 |
| **Special Occasion Permits (SOPs)** are distinct from a permanent Liquor Sales Licence; LCBO's SOP FAQ states provincial regulations do **not** require permit holders to carry party liability insurance, though a venue may require it | [REGULATORY] + [UNDERWRITING] | Considerations, FAQ Q3, Card 4 detail |
| **Liquor liability insurance** is a commercial product that may help respond to certain alcohol-related claims standard CGL excludes or limits | [COVERAGE] | Hero, cards, FAQ Q2 |

**Live copy to fix (do not repeat):** Current FAQ *"Does AGCO require liquor liability?"* answers *"Licensing bodies and landlords typically require proof…"* — conflates AGCO statutory mandate with contractual practice. Current Card 1 uses flat *"Covers claims…"* (audit **HIGH**).

---

## Existing Explorer state inventory (inspected from source)

**Data source:** `src/data/product-pages/commercial-products-specialty.ts` → `coverageTypes` (4 items)  
**ID derivation:** `slugify(title)` in `buildPilotProductConfig.ts`  
**Visual config:** `src/data/coverage-explorer/interaction-manifest/routes.ts` → `liquor-liability-insurance`  
**Image asset:** `liquor-liability-insurance-interactive-master.png` (interactive-master, `restaurant-cutaway` archetype)  
**Scene mode:** `interactive-master` — zone highlighting, **not** multi-image state PNGs

| # | State ID (slugified) | Current title | Current shortLabel (default) | Current description | detailTitle / detailDescription | Mapped zones | Image impact |
|---|---------------------|---------------|------------------------------|---------------------|--------------------------------|--------------|--------------|
| 1 | `patron-injury-property-damage` | Patron Injury & Property Damage | Patron *(first word)* | *"Covers claims that an intoxicated patron…"* **[HIGH flag]** | — *(fallback: title + description)* | building-shell, kitchen-prep, bar-zone | Existing master |
| 2 | `assault-battery` | Assault & Battery | Assault | *"May address altercations linked to alcohol service…"* | — | dining-floor, building-shell | Existing master |
| 3 | `legal-defence` | Legal Defence | Legal | *"Covers defence costs for covered liquor liability claims."* | — | dining-floor, building-shell | Existing master |
| 4 | `event-host-liquor` | Event Host Liquor | Event | *"Temporary coverage when hosting events…"* | — | bar-zone, bar-seating, dining-floor | Existing master |

**Explorer state count today:** **4**  
**Proposed Explorer state count:** **4** (unchanged — existing visual architecture accurately supports the four genuinely distinct purchasable coverage topics on this product page)

**No new imagery required.** Titles preserved so state IDs and zone mappings remain valid. Display `shortLabel` improvements proposed below.

### Topics intentionally NOT added as Explorer states

| Topic | Why not an Explorer tab |
|-------|-------------------------|
| General liability / CGL exclusion gap | Underlying policy context — belongs in hero, Considerations, FAQ Q2 |
| AGCO Liquor Sales Licence vs. SOP vs. Caterer's Endorsement | [REGULATORY] — Practical Considerations + FAQ |
| Smart Serve / AGCO server training | [REGULATORY] — Practical Considerations |
| Landlord / venue contractual certificate requirements | [UNDERWRITING] — Practical Considerations |
| Retail alcohol (Convenience Store Licence) | Different service model — cross-link to `/convenience-store-insurance/` if needed; not core to this route |
| Premises/general liability for non-alcohol operations | Belongs on restaurant/bar/hotel routes — cross-link |

---

## Copy-to-UI mapping (proposed — for implementation after approval)

| UI surface | Count | Notes |
|------------|------:|-------|
| Hero subhead | 1 | Full AGCO module introduction |
| `coverageIntro` | 1 | Hedged product-page framing |
| Coverage Explorer states | **4** | Preserve IDs; add V2 detail pairs + improved shortLabels |
| Practical Considerations | **9** | Full AGCO/regulatory module |
| FAQ | **5** | Liquor-liability-primary; not Restaurant FAQ repeat |

---

## 1. Hero / Subhead

**Headline:** Liquor Liability Insurance

**Subhead (proposed — draft-ready):**

> Bars, restaurants, event hosts, caterers, and other AGCO-authorized alcohol sellers in Windsor–Essex can face civil liability when alcohol service contributes to injury, property damage, or other harm — exposure that exists under the Liquor Licence and Control Act independently of whether you carry insurance. AGCO's own licensing guidance acknowledges there is more to lose than your licence and recommends consulting an insurance professional. Liquor liability coverage is designed to address many alcohol-related liability claims that standard general liability excludes or limits — but holding an AGCO licence authorizes legal sale or service; it does not automatically include insurance, and the Act itself does not mandate liquor liability insurance as a statutory condition. Proof of coverage may still be requested during licensing or application processes, by landlords, venues, or under other contractual terms — a documentation practice separate from the Act's licensing requirements.

**Category mix:** [EXPOSURE] + [REGULATORY] + [COVERAGE] + [UNDERWRITING] — framed as distinct concepts, not collapsed into "AGCO requires insurance."

---

## 2. coverageIntro

**Proposed:**

> Liquor liability may help respond to certain claims tied to alcohol service or permitted events — coverage that is often excluded or limited in a standard commercial general liability policy, subject to the policy purchased, terms, limits, and exclusions.

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
| **detailDescription** | Dram-shop-style allegations — that a patron was overserved or that alcohol contributed to a crash, assault, or other harm after leaving — are the core civil exposure AGCO's licensing guides describe separately from administrative licence penalties. Standard CGL often excludes or sub-limits liquor-related claims; liquor liability coverage, where purchased, is meant to address many of these alcohol-tied third-party injury and property-damage scenarios. What triggers coverage, who qualifies as an insured, and whether the claim arose from on-premises service versus a permitted off-site event depend on policy wording — confirm scope with your broker. |

---

### State 2 — `assault-battery`

**Category:** [COVERAGE]

**RIGHT selector**

| Field | Proposed copy |
|-------|---------------|
| **shortLabel** | Assault & Battery |
| **title** | Assault & Battery *(unchanged)* |
| **description** | May address certain altercation or assault-and-battery claims linked to alcohol service at your premises or event, where included in the policy — assault-and-battery coverage is commonly limited or excluded and must be confirmed in the wording. |

**LEFT contextual detail**

| Field | Proposed copy |
|-------|---------------|
| **detailTitle** | Bar fights and crowd incidents are a distinct coverage question |
| **detailDescription** | Late-night service, crowded patios, and special events can generate assault or battery allegations tied to intoxicated patrons or security response — losses carriers often treat differently from a simple slip-and-fall. Liquor liability programs sometimes include assault-and-battery extensions, but many policies cap, exclude, or sub-limit this exposure, especially where security staff or bouncers are involved. Your broker should review whether expected crowd-control and service hours are reflected in the policy you are purchasing, not assumed from a generic liability label. |

---

### State 3 — `legal-defence`

**Category:** [COVERAGE]

**RIGHT selector**

| Field | Proposed copy |
|-------|---------------|
| **shortLabel** | Defence Costs |
| **title** | Legal Defence *(unchanged)* |
| **description** | May help with legal defence costs for covered liquor liability claims, subject to policy terms, retentions, and whether the underlying allegation falls within insuring agreements — not all liquor-related lawsuits are covered. |

**LEFT contextual detail**

| Field | Proposed copy |
|-------|---------------|
| **detailTitle** | Defence costs can accrue before fault is determined |
| **detailDescription** | Civil claims alleging overservice or alcohol-related harm can require immediate legal response — even when you believe service was responsible. Liquor liability policies often include defence-cost coverage for claims that potentially fall within the insuring agreement, but retentions, duty-to-defend wording, and exclusions for punitive damages or regulatory fines vary. Administrative AGCO proceedings such as licence suspension are enforcement actions, not covered defence costs — insurance addresses civil lawsuits and covered defence, not licence revocation itself. |

---

### State 4 — `event-host-liquor`

**Category:** [COVERAGE]

**RIGHT selector**

| Field | Proposed copy |
|-------|---------------|
| **shortLabel** | Host / Event |
| **title** | Event Host Liquor *(unchanged)* |
| **description** | May address certain alcohol-related liability for temporary events, BYO functions, or service under a Special Occasion Permit or caterer's authorization — distinct from ongoing premises liquor liability under a Liquor Sales Licence, subject to policy terms. |

**LEFT contextual detail**

| Field | Proposed copy |
|-------|---------------|
| **detailTitle** | A one-night event is not the same risk profile as a licensed bar |
| **detailDescription** | Weddings, fundraisers, corporate functions, and catered off-site service often rely on Special Occasion Permits, Caterer's Endorsements, or host-liquor arrangements rather than a standing Liquor Sales Licence at a fixed address. LCBO's Special Occasion Permit FAQ states provincial regulations do not require permit holders to carry party liability insurance — but venues, municipalities, and rental contracts frequently do. Host liquor or event liquor coverage, where available, is underwritten separately from premises liquor liability; service model, permit type, attendance, and whether you control service must be disclosed to your broker. |

---

## 4. Practical Considerations (9 — proposed)

### 1. Licence type determines your regulatory framework
**Category:** [REGULATORY]

AGCO authorizes alcohol through different instruments — Liquor Sales Licence (ongoing on-premises service), Special Occasion Permit (temporary events), Caterer's Endorsement (off-site service tied to an existing licence), and retail licences for convenience or grocery stores. Each has different obligations and service models. Your broker needs to know which authorization applies because insurance structure follows how and where alcohol is legally sold or served — not every licence type maps to the same liquor liability wording.

### 2. Civil liability under the LLCA is not the same as carrying insurance
**Category:** [REGULATORY] + [EXPOSURE]

Under the Liquor Licence and Control Act, licensees and permit holders can face civil liability for harm tied to alcohol service. AGCO's Section 1 Liquor Sales Licence guide states directly: *"Liability: There's more to lose than your licence"* — and recommends consulting a legal advisor and insurance professional. That civil exposure exists independently of whether you purchase coverage. The Act itself does not mandate liquor liability insurance as a statutory condition of licensing.

### 3. Proof of insurance may still be requested — but that is not a provincial insurance mandate
**Category:** [UNDERWRITING] + [REGULATORY]

Proof of liquor liability insurance may be requested during the AGCO licensing or application process, by a landlord, by an event venue, or under a franchise, lender, or municipal contract. Those are documentation or contractual practices — not the same thing as the LLCA prescribing a named insurance product. Maintain copies of what each counterparty actually requires rather than assuming one certificate satisfies every relationship.

### 4. Smart Serve and responsible-service training are regulatory — not insurance
**Category:** [REGULATORY]

Staff who sell or serve alcohol under LLCA standards must meet AGCO training requirements — commonly Smart Serve or other AGCO-approved programs for servers, and AGCO-approved training for retail alcohol staff under newer convenience and grocery licences. Training reduces risk and supports compliance but does not replace liquor liability coverage. Insurers may ask about training programs during underwriting — that is an evaluation factor, not a coverage product.

### 5. Special Occasion Permits versus a Liquor Sales Licence
**Category:** [REGULATORY]

A Liquor Sales Licence authorizes ongoing alcohol service at licensed premises. A Special Occasion Permit authorizes temporary sale or service at defined events — private, public/charity, or BYO categories with different rules. LCBO's Special Occasion Permit FAQ confirms provincial regulations do not require permit holders to carry party liability insurance, though venues may require it. If your operation spans both models, disclose each scenario to your broker rather than relying on a single premises policy.

### 6. Caterers, mobile bars, and off-site service
**Category:** [REGULATORY] + [COVERAGE]

Ontario does not issue a standalone mobile bar licence to food trucks or roaming operators. Off-site alcohol service typically requires a Caterer's Endorsement on an existing Liquor Sales Licence or an appropriate Special Occasion Permit at the event location. Liquor liability for off-site service may need to be confirmed separately from premises coverage — especially when you serve at venues you do not control.

### 7. How liquor liability relates to your underlying business policy
**Category:** [COVERAGE] + [UNDERWRITING]

Restaurants, bars, hotels, and event venues often carry a commercial package policy with general liability — but standard CGL frequently excludes or limits liquor-related claims. Liquor liability may be purchased as an endorsement, within a hospitality package, or as a standalone policy depending on carrier and operation. Confirm what your existing restaurant, bar, or event policy actually includes before assuming liquor liability is already in place.

### 8. Sales mix, hours, and security affect underwriting
**Category:** [UNDERWRITING] + [EXPOSURE]

Carriers evaluate alcohol as a percentage of revenue, latest service hours, patron capacity, entertainment, and whether you employ security or crowd-control staff. A wine-focused restaurant, a late-night nightclub, and a one-day charity beer garden present different liquor liability profiles even when all require AGCO authorization.

### 9. Did you know?
**Category:** [REGULATORY] vs [COVERAGE]

AGCO administrative penalties — warnings, suspensions, or revocation of a licence or permit — are regulatory enforcement actions. Civil lawsuits from injured third parties are a separate legal track. Liquor liability insurance may help respond to certain covered civil claims and defence costs; it does not prevent licence sanctions or substitute for responsible service obligations under the LLCA.

---

## 5. FAQ (5 — proposed)

### Q1. Does AGCO require liquor liability insurance?

**Category focus:** [REGULATORY] + [UNDERWRITING] + [COVERAGE]

**Proposed answer:**

No — the Liquor Licence and Control Act itself does not mandate liquor liability insurance as a statutory condition of holding a Liquor Sales Licence or related AGCO authorization. AGCO's licensing guidance confirms licensees may face civil liability for harm tied to alcohol service — separate from administrative penalties such as suspension or revocation — and recommends consulting an insurance professional because there is more to lose than your licence.

That said, proof of liquor liability insurance may still be requested during the licensing or application process, by your landlord, by an event venue, or under a lease, franchise, or lender agreement. Those are contractual or documentation requirements; they do not change the fact that the Act itself does not prescribe a named insurance product. If you are evaluating whether to purchase coverage, the relevant question is usually whether your operations create civil exposure and whether your general liability policy excludes or limits alcohol-related claims — not whether AGCO statutes require a specific policy by name.

**Differs from Restaurant FAQ Q1:** Same verified AGCO/LLCA facts, but framed as the **primary question for this product page** — not one topic among restaurant property, food safety, and delivery.

---

### Q2. How is liquor liability different from general liability on my business policy?

**Category focus:** [COVERAGE]

**Proposed answer:**

Commercial general liability may help with certain third-party injury or property-damage claims arising from your premises and operations, but standard CGL often excludes or sub-limits claims tied to alcohol service — especially overservice allegations and harm occurring after a patron leaves. Liquor liability is a distinct coverage product or endorsement meant to address many alcohol-related liability scenarios CGL does not fully cover. If you already have restaurant, bar, hotel, or event insurance, confirm with your broker whether liquor liability is included, endorsed, or needs to be added separately — do not assume from a policy label alone.

---

### Q3. What is the difference between a Liquor Sales Licence and a Special Occasion Permit?

**Category focus:** [REGULATORY] + [COVERAGE]

**Proposed answer:**

A Liquor Sales Licence authorizes ongoing sale and service of alcohol at licensed premises such as a restaurant, bar, or hotel lounge. A Special Occasion Permit (SOP) authorizes temporary alcohol service at a defined event — such as a wedding, festival, or charity function — outside the normal standing-licence model. The regulatory rules, permit categories, and service responsibilities differ. LCBO's Special Occasion Permit FAQ states provincial regulations do not require SOP holders to carry party liability insurance, though a venue or municipality may require proof of coverage contractually. Insurance should be structured around how you actually serve alcohol — permanent premises, catered events, BYO functions, or a mix — not assumed from one licence type alone.

---

### Q4. Do caterers and event hosts need different coverage than a bar or restaurant?

**Category focus:** [COVERAGE] + [REGULATORY]

**Proposed answer:**

Often yes — or at minimum, a careful review of policy territory and service model. A fixed bar operating under a Liquor Sales Licence has different exposures from a caterer serving under a Caterer's Endorsement or a charity hosting a public event under a Special Occasion Permit. Host liquor or event liquor coverage may be needed when you do not control service in the same way as a licensed establishment, or when alcohol service occurs off your primary premises. BYO events and temporary venues introduce certificate and additional-insured requirements from landlords and municipalities that a standard premises policy may not address. Disclose every service scenario to your broker.

---

### Q5. What information do I need for a liquor liability quote?

**Category focus:** [UNDERWRITING]

**Proposed answer:**

Licence or permit type (Liquor Sales Licence, Special Occasion Permit, Caterer's Endorsement, or other AGCO authorization), business legal name, premises address(es) and event locations, annual revenue and estimated alcohol sales percentage, seating capacity or expected event attendance, hours of service, entertainment or security arrangements, staff training program (such as Smart Serve), prior liquor-related claims or incidents, and any landlord, venue, franchise, or municipal insurance requirements in your contracts. If you also carry a restaurant, bar, or event policy, bring your existing declarations page so your broker can identify gaps rather than duplicate coverage.

---

## 6. whoItIsFor (trust band — proposed)

**Proposed:**

> For Windsor–Essex bars, restaurants, breweries, caterers with alcohol service, event hosts under Special Occasion Permits, and other AGCO-authorized sellers — reviewed through an independent broker who can confirm how liquor liability fits alongside your existing business coverage.

**Note:** On this route, `whoItIsFor` is distinct from the hero subhead (unlike Restaurant's duplicate pattern). Implementation may keep both without repetition if `whoItIsFor` remains this shorter trust-band variant.

---

## 7. Practical Considerations presentation — recommendation

**Recommend: expandable presentation** (`considerationsPresentation: 'expandable'`)

| Factor | Assessment |
|--------|------------|
| Item count | **9** considerations — same density class as Restaurant post-calibration (11) |
| Average body length | Long — several items exceed 80 words; items 2, 3, 5, and 7 carry multi-sentence regulatory framing |
| Regulatory density | High — AGCO/LLCA/SOP content is inherently text-heavy |
| Mobile scanability | Collapsed cards with extracted teasers reduce wall-of-text risk on a page whose hero is already substantive |
| Precedent | Restaurant uses expandable mode successfully; liquor route has comparable consideration depth |

**Not recommended:** Standard static grid — would reproduce the scroll-heavy 11-card issue Restaurant addressed, without adding scanability for a regulatory-primary page.

**Backward compatibility:** Expandable mode is opt-in per route; other pages unchanged.

---

## 8. Explorer engineering — implementation constraints (for later pass)

| Constraint | Status |
|------------|--------|
| Keep **4** Explorer states | ✅ Proposed |
| Preserve state IDs | ✅ Titles unchanged |
| Preserve `liquor-liability-insurance-interactive-master.png` | ✅ No new assets |
| Add V2 `detailTitle` / `detailDescription` per state | ✅ Proposed above |
| Improve `shortLabel` only where safe | ✅ Proposed — no ID impact |
| Do not add General Liability as 5th state | ✅ Placed in Considerations / FAQ |

---

## 9. Sources

Every substantive claim maps to a primary source. Regulatory sources are distinguished from industry/brokerage framing.

### Regulatory / authoritative (primary)

| Claim | Source |
|-------|--------|
| Liquor Sales Licence authorizes on-site sale/service of liquor | **AGCO** — Section 1: Liquor Sales Licences — https://www.agco.ca/en/alcohol/responsibilities-and-resources/guides/section-1-liquor-sales-licences |
| *"Liability: There's more to lose than your licence"* — civil liability for harm from alcohol service; consult legal advisor and insurance professional | **AGCO** — Section 1: Liquor Sales Licences, **Liability** section (same URL) |
| Special Occasion Permit categories and temporary-event rules | **AGCO** — Special Occasion Permit Guide — https://www.agco.ca/en/alcohol/responsibilities-and-resources/guides/special-occasion-permits |
| Caterer's Endorsement — off-site service tied to existing Liquor Sales Licence; not standalone mobile licence | **AGCO** — Section 3: Endorsements — https://www.agco.ca/en/alcohol/responsibilities-and-resources/guides/section-3-endorsements |
| LLCA licensing conditions do not include statutory mandate for liability insurance | **City of Toronto** — Report on Liability Insurance for Premises Licensed to Sell Liquor (2001) — https://www.toronto.ca/legdocs/2001/agendas/council/cc010724/plt8rpt/cl010.pdf |
| Provincial regulations do not require SOP holders to carry party liability insurance; venue may require it | **LCBO** — Special Occasion Permit FAQs, item 9 — https://hellolcbo.com/app/answers/detail/a_id/3103 |
| Smart Serve / AGCO-approved server training under LLCA standards | **AGCO** — LLCA server training requirements; Smart Serve Ontario — https://www.smartserve.ca/ |
| Retail alcohol — Convenience Store Licence obligations and AGCO-approved training | **AGCO** — Convenience Store Licence Obligation Guide — https://www.agco.ca/en/alcohol/responsibilities-and-resources/guides/convenience-store-licence-obligation-guide |
| No standalone mobile bar / food-truck liquor licence | **AGCO** — Section 3 Endorsements; 2A research Module 2.3 |

### Industry / brokerage (secondary — coverage product framing)

| Claim | Basis |
|-------|--------|
| Liquor liability addresses alcohol-related claims CGL excludes or limits | Standard commercial market practice — confirm per policy |
| Assault-and-battery often limited or excluded in liquor policies | Common carrier wording — confirm per policy |
| Defence costs covered only for claims within insuring agreements | Standard liability policy structure |
| Host liquor / event liquor distinct from premises liquor liability | Common hospitality insurance product segmentation |
| Landlords, venues, municipalities commonly require certificates and minimum limits | Commercial lease and event-contract practice — [UNDERWRITING] |

### Internal reference (research lineage)

| Document | Use |
|----------|-----|
| `docs/2a-hospitality-food-research-2026-09-07.md` | Module 2.2 Liquor Liability; AGCO reference block |
| `docs/restaurant-final-copy-draft-2026-09-07.md` | Verified AGCO/LLCA/SOP framing |
| `docs/restaurant-d2-calibration-implementation-2026-09-08.md` | Confirmed live implementation of corrected liquor copy |
| `src/data/product-pages/commercial-products-specialty.ts` | Current live page (4 cards, 0 considerations, 4 FAQs, 1 HIGH) |
| `src/data/coverage-explorer/interaction-manifest/routes.ts` | Existing 4-state Explorer inventory |
| `docs/product-content-audit-2026-09-07.md` | Current Class D / HIGH flag baseline |

---

## 10. Current vs. proposed summary

| Element | Current (live) | Proposed (draft) |
|---------|----------------|------------------|
| Substantive words (audit) | 258 | Substantive increase expected (hero + 9 considerations + expanded cards/FAQ) — **no word-count target** |
| Classification | **D** (1 HIGH) | Target: eliminate HIGH via hedged card copy |
| Explorer states | 4 (fallback detail) | 4 (V2 detail pairs) |
| Considerations | 0 | **9** |
| FAQ | 4 (AGCO inaccuracy in Q2) | **5** (corrected AGCO module) |
| AGCO framing | Incorrect mandate implication | Corrected from Restaurant-verified sources |
| Considerations UI | n/a | **Recommend expandable** |

---

## Owner review checklist

- [ ] Approve hero/subhead as primary AGCO/LLCA module for this route
- [ ] Approve **4** Explorer states (unchanged count) and proposed V2 detail pairs
- [ ] Approve improved `shortLabel` set (Patron Claims, Assault & Battery, Defence Costs, Host / Event)
- [ ] Approve **9** Practical Considerations
- [ ] Approve **expandable** considerations presentation recommendation
- [ ] Approve **5** FAQ items — especially corrected Q1 (AGCO does not statutorily mandate)
- [ ] Confirm no 5th Explorer state needed (General Liability gap stays in Considerations/FAQ)
- [ ] Authorize copy-to-UI mapping document in a **separate task** after this draft is approved
- [ ] Authorize implementation into `commercial-products-specialty.ts` only after mapping approval

---

## Stop gates (repeat)

- **NO MERGE · NO DEPLOY · NO VERCEL PROMOTION**
- **NO WEBSITE CHANGES · NO EXPLORER ENGINEERING CHANGES · NO AUDIT SCANNER CHANGES**
- **Other 2A routes remain untouched**

**STOP FOR OWNER REVIEW.**
