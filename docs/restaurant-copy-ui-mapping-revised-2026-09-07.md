# Restaurant Copy → UI Mapping (Revised — Owner Approved Architecture)

**Route:** `/restaurant-insurance/`  
**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Supersedes:** `docs/restaurant-copy-ui-mapping-2026-09-07.md` (merged-into approach **rejected**)  
**Source copy:** `docs/restaurant-final-copy-draft-2026-09-07.md`  
**Status:** Revised architecture + copy plan only — **NO IMPLEMENTATION**

---

## Stop gates

- **NO MERGE · NO DEPLOY · NO VERCEL PROMOTION**
- **No Explorer imagery, state count, or interaction changes**
- **No “merged into” copy** for Product Liability/Food Illness or Business Interruption

**STOP FOR OWNER REVIEW before implementation**

---

## Owner decisions captured

| Decision | Status |
|----------|--------|
| 4 Restaurant Explorer states unchanged | ✅ Approved |
| No new Restaurant imagery | ✅ Approved |
| No Explorer architecture change | ✅ Approved |
| Liquor + Equipment tabs: draft copy 1:1 | ✅ Approved |
| V2 `detailTitle` / `detailDescription` for all **four** Explorer states | ✅ Approved |
| 9 Practical Considerations (original draft text) | ✅ Approved — verbatim |
| 5 FAQs (original draft text) | ✅ Approved — verbatim |
| Product Liability + Business Interruption as **distinct** coverages | ✅ Required — **not** blended into GL or Property tab copy |

---

## 1. Architecture question: can `ProductConsiderations` extend to industry routes?

### Verdict: **YES — clean, small, additive change**

The rendering path already supports considerations end-to-end. The **only gap** is that `IndustryPageContent` omits the field and `adaptCommercialIndustryContent()` does not pass it through.

| Layer | Already supports `considerations`? |
|-------|-----------------------------------|
| `PilotProductPageConfig` | ✅ `considerations?: ConsiderationItem[]` |
| `buildPilotProductConfig()` | ✅ accepts and forwards `considerations` |
| `PilotProductPage` | ✅ renders `<ProductConsiderations items={config.considerations} />` when length > 0 |
| `ProductConsiderations` | ✅ generic grid — no route-type branching |
| `ProductPageContent` (specialty routes) | ✅ optional `considerations` — Daycare, Greenhouse, etc. |
| `IndustryPageContent` (industry routes) | ❌ **missing optional field** |
| `adaptCommercialIndustryContent()` | ❌ **does not pass `considerations`** |

**No component refactor required.** No Explorer changes. No new UI components.

### Proposed code change (plan only — not implemented)

**File 1 — `src/data/commercial-industries.ts`**

```typescript
// Add to imports (line ~18):
import type { ConsiderationItem, CoverageCard } from "@/components/LineInsurancePage";

// Extend type (IndustryPageContent):
export type IndustryPageContent = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  subhead: string;
  quoteHref: string;
  quoteLabel: string;
  coverageIntro: string;
  coverageTypes: CoverageCard[];
  considerations?: ConsiderationItem[];  // ← ADD (optional)
  faqTitle: string;
  faqItems: FaqItem[];
  ctaHeading: string;
  ctaSubhead: string;
  serviceName: string;
};
```

**File 2 — `src/lib/buildPilotProductConfig.ts`**

```typescript
// Inside adaptCommercialIndustryContent(), add one line to buildPilotProductConfig call:
return buildPilotProductConfig({
  // ...existing fields...
  considerations: content.considerations,  // ← ADD
  // ...existing fields...
});
```

**Optional (not required for Restaurant):** `CommercialIndustryPage.tsx` (legacy `LineInsurancePage` wrapper) does not render considerations today. Restaurant uses `PilotCommercialPage` → `adaptCommercialIndustryContent`. No change needed unless other legacy routes need parity.

### Scope assessment

| Expectation | Actual |
|-------------|--------|
| Files touched at implementation | **2** (`commercial-industries.ts`, `buildPilotProductConfig.ts`) |
| Lines changed (template plumbing) | **~4** |
| Shared component edits | **0** |
| Explorer / registry / image edits | **0** |
| Risk to other industry routes | **None** — field is optional; unset routes behave exactly as today |

**Flag:** This did **not** grow into a broader refactor. If implementation later adds explicit coverage `id` overrides (for display title vs. Explorer slug), that would be a **separate** small data-model enhancement — not required for this considerations extension.

---

## 2. Revised content mapping (no merge)

### Coverage topics → UI locations

| Coverage topic | Explorer state | Primary UI location |
|----------------|----------------|---------------------|
| **General Liability** | State 1 — `general-liability` | Explorer tab 1 + detail panel |
| **Commercial Property** | State 2 — `property-coverage` → Property PNG | Explorer tab 2 + detail panel |
| **Liquor Liability** | State 3 — `liquor-liability` | Explorer tab 3 + detail panel |
| **Equipment Breakdown & Spoilage** | State 4 — `equipment-breakdown-spoilage` | Explorer tab 4 + detail panel |
| **Product Liability / Food Illness** | *No Explorer state* | **Practical Considerations** — standalone card (#3 of 11) |
| **Business Interruption** | *No Explorer state* | **Practical Considerations** — standalone card (#8 of 11) |

**Contextual relationship to Explorer (copy only — not merged):**

- Product Liability consideration sits **after** Consideration #2 (food safety / O. Reg. 493/17) and **before** Consideration #3 (liquor licensing). Reader flow: regulatory food safety → **distinct insurance coverage for food-illness claims** → liquor regulatory block.
- Business Interruption consideration sits **after** Consideration #6 (patio / seasonality — which mentions business income projections) and **before** Consideration #7 (lease requirements). Reader flow: seasonal revenue context → **distinct BI coverage** → contractual insurance requirements.

### Why interleave (11 cards) instead of append (9 + 2 at end)

- Owner required the **9 original considerations unchanged** — interleaving preserves their exact text and order relative to each other while placing each orphan coverage **next to its thematic neighbor** (food safety ↔ product liability; seasonality ↔ business interruption).
- Appending #10 and #11 at the end would satisfy “in addition to” but would disconnect coverage topics from the Explorer-adjacent narrative flow.

---

## 3. Four Explorer states — approved copy (unchanged by this revision)

Explorer holds **four tabs only**. General Liability and Commercial Property use **their standalone draft text** — no Product Liability or Business Interruption language in tab `description` or detail panels.

### Tab 1 — General Liability (`general-liability`)

**Tab `description` (right selector):**

Helps protect against certain third-party bodily injury and property-damage claims arising from restaurant operations and your premises — such as slip-and-fall incidents in the dining room or parking area — subject to policy terms, exclusions, and limits.

**detailTitle:** When a busy dining room becomes a liability claim

**detailDescription:** Restaurants concentrate people in high-traffic areas — dining rooms, patios, washrooms, and parking lots — where spills, crowded aisles, and seasonal ice create slip-and-fall exposure. General liability may respond to certain third-party injury or property-damage claims arising from these premises and from day-to-day operations, but scope depends on how your policy defines your premises, operations, and any off-premises catering or delivery activities.

---

### Tab 2 — Property Coverage (`property-coverage`)

*Implementation note: keep `title` **Property Coverage** so slugified `id` maps to Property state PNG. “Commercial Property” may appear in user-facing detail title only.*

**Tab `description`:**

May help cover your building (if owned or required under lease), tenant improvements, furniture, fixtures, and kitchen equipment against covered causes of loss, depending on how the policy is structured and which perils or endorsements apply.

**detailTitle:** Why kitchen equipment drives property values

**detailDescription:** A restaurant's property exposure is weighted toward the kitchen — commercial ovens, fryers, walk-in coolers, hood systems, and built-in fixtures often represent a large share of insurable value alongside dining-room furniture and tenant improvements. Fire, water damage from suppression systems, and theft of equipment or alcohol stock are common loss scenarios carriers evaluate when structuring property coverage and deductibles.

---

### Tab 3 — Liquor Liability (`liquor-liability`) — 1:1 approved draft

**Tab `description`:**

Where you sell or serve alcohol under an AGCO Liquor Sales Licence, liquor liability may address certain claims tied to alcohol service — a distinct coverage from general liability, which often excludes or limits liquor-related claims. Holding a licence authorizes legal sale and service; it does not include insurance, and the Liquor Licence and Control Act itself does not mandate liquor liability insurance as a statutory condition.

**detailTitle:** Civil liability under the Act versus the coverage on your policy

**detailDescription:** Serving alcohol under an AGCO Liquor Sales Licence creates regulatory obligations and civil liability exposure if a patron is overserved or alcohol contributes to injury or property damage after they leave. AGCO's licensing guide addresses that civil exposure directly — it is not the same as carrying liquor liability insurance, and the Act does not prescribe a named insurance product as a licence condition. Liquor liability coverage, where included in your program, is meant to address many alcohol-related claims that standard general liability excludes or limits; landlords and other counterparties may still require proof of coverage contractually.

---

### Tab 4 — Equipment Breakdown & Spoilage (`equipment-breakdown-spoilage`) — 1:1 approved draft

**Tab `description`:**

Equipment breakdown coverage may address sudden mechanical or electrical failure of covered kitchen or refrigeration equipment; spoilage endorsements may address inventory lost due to temperature change from specified causes — neither is automatic in a base property policy.

**detailTitle:** When the walk-in fails on a Friday night

**detailDescription:** Refrigeration and cooking equipment are operationally critical — a sudden compressor failure or electrical breakdown can destroy thousands of dollars in perishable inventory and force you to stop service. Base property policies often handle fire or theft differently from mechanical breakdown or temperature-change spoilage. Equipment breakdown and spoilage endorsements exist precisely because restaurants depend on continuous cold chain and functioning kitchen lines; triggers and sublimits vary, especially for off-premises power failures versus on-site equipment failure.

---

## 4. Practical Considerations — full list (11 cards)

Items **1–2, 4–7, 9–11** are **verbatim** from `docs/restaurant-final-copy-draft-2026-09-07.md` §3. Items **3** and **8** are **new standalone coverage cards** (this revision). Display order below is final proposed order.

---

### 1. Disclosures your broker typically needs *(draft #1 — unchanged)*

Cuisine type, seating capacity, cooking methods (deep fryer, open flame, wood-fired oven), hours, delivery or catering model, and whether you hold an AGCO Liquor Sales Licence.

---

### 2. Food safety is regulatory — not an insurance substitute *(draft #2 — unchanged)*

O. Reg. 493/17 requires at least one certified food handler on site during all operating hours at food service premises. Compliance reduces illness risk but does not replace liability coverage.

---

### 3. Product Liability / Food Illness *(NEW — standalone coverage)*

**Exact proposed text:**

May respond to certain claims alleging illness or injury from food you prepared or served, often as part of products-completed operations coverage within a CGL policy or by endorsement — scope and exclusions vary by carrier and wording.

Foodborne illness allegations, undeclared allergen incidents, and contamination events can generate third-party claims distinct from a slip-and-fall or other premises injury. Product liability / products-completed operations is a **separate coverage topic** from general liability — which addresses certain premises and operations claims in the Explorer above — and should be confirmed with your broker, not assumed from a standard CGL label alone. Food handler compliance under O. Reg. 493/17 is a public health obligation, not a substitute for this coverage.

---

### 4. Liquor licensing, civil liability, and insurance are three different things *(draft #3 — unchanged)*

AGCO issues Liquor Sales Licences for eligible premises. Under the Liquor Licence and Control Act, licensees can face **civil liability** for harm tied to alcohol service — AGCO's own licensing guidance states there is more to lose than your licence and recommends consulting an insurance professional. That civil exposure exists **independently** of whether you carry insurance.

The Act itself does **not** mandate liquor liability insurance as a statutory condition of licensing. However, proof of insurance may still be requested during the licensing or application process, by a landlord, or under other contractual terms — that is a **documentation or contractual practice**, not the same thing as a provincial insurance mandate.

Liquor liability insurance, where purchased, is a **commercial product** that may help respond to certain alcohol-related claims standard general liability excludes or limits — confirm inclusion with your broker.

---

### 5. Delivery and app-based orders *(draft #4 — unchanged)*

In-house or third-party delivery can create commercial auto or hired and non-owned auto exposures when staff use personal vehicles. Disclose your delivery model — platform vendor agreements may impose their own certificate requirements.

---

### 6. Kitchen fire and suppression maintenance *(draft #5 — unchanged)*

Hood and duct cleaning, fire suppression inspection, and fryer protocols affect both fire code compliance and property underwriting.

---

### 7. Patio and seasonal operations *(draft #6 — unchanged)*

Outdoor seating may require municipal encroachment agreements and AGCO licensing of outdoor areas. Seasonality affects business income projections.

---

### 8. Business Interruption *(NEW — standalone coverage)*

**Exact proposed text:**

May help with lost business income and certain continuing expenses when a covered property loss forces you to close or scale back service, subject to waiting periods, limits, and policy terms — particularly relevant where payroll and rent continue during repairs.

After a covered fire, major water loss, or extended equipment failure, repairs can take weeks while fixed costs continue — lease payments, core staff, loan obligations, and supplier commitments do not pause automatically. Business interruption is a **distinct coverage** from commercial property insurance for physical damage to the building or contents; it addresses income and continuing expense loss during a covered suspension. For seasonal or patio-driven revenue in Windsor–Essex, accurate peak-period projections matter when underwriting this coverage — separate from the property values discussed in the Explorer above.

---

### 9. Lease and franchisor requirements *(draft #7 — unchanged)*

Leases often specify minimum liability limits, additional insured status, and evidence of property coverage. Franchise manuals may add requirements — including liquor liability certificates where alcohol is served.

---

### 10. WSIB and kitchen employee injuries *(draft #8 — unchanged)*

Most Ontario employers must carry WSIB coverage for workers. WSIB is a statutory workplace insurance system, separate from commercial general liability.

---

### 11. Did you know? *(draft #9 — unchanged)*

Municipal business licences, fire inspections, and public health inspections are operational and regulatory requirements — not insurance coverages. They are listed here to explain why restaurant risk profiles differ from generic retail.

---

## 5. Five FAQs — unchanged

Verbatim from `docs/restaurant-final-copy-draft-2026-09-07.md` §4:

1. **Do I need liquor liability if I serve alcohol?** — full approved answer (AGCO / LLCA / contractual distinction)
2. **Is food spoilage from a power outage covered?**
3. **Do I need coverage for delivery drivers?**
4. **What food safety rules apply in Ontario?**
5. **What information do I need for a restaurant quote?**

*(No edits in this revision — refer to final copy draft for full answer text.)*

---

## 6. Detail-pair disposition for six draft pairs

| Draft pair | Where it lives after revision |
|------------|------------------------------|
| General Liability | Explorer tab 1 — **unchanged** |
| Commercial Property | Explorer tab 2 — **unchanged** |
| Liquor Liability | Explorer tab 3 — **unchanged** |
| Equipment Breakdown & Spoilage | Explorer tab 4 — **unchanged** |
| Product Liability / Food Illness | **Practical Consideration #3** — detail content adapted into standalone consideration (not Explorer detail panel) |
| Business Interruption | **Practical Consideration #8** — detail content adapted into standalone consideration (not Explorer detail panel) |

Draft detail pairs for Product Liability and Business Interruption are **not discarded** — their substance appears in Considerations #3 and #8 with explicit “separate coverage” framing and light cross-reference to the related Explorer state **without merging tab copy**.

---

## 7. Summary table

| Coverage topic | Explorer state | UI location | Merged? |
|----------------|----------------|-------------|---------|
| General Liability | General Liability | Explorer tab 1 | No |
| Commercial Property | Property | Explorer tab 2 | No |
| Liquor Liability | Liquor Liability | Explorer tab 3 | No |
| Equipment Breakdown & Spoilage | Equipment Breakdown | Explorer tab 4 | No |
| Product Liability / Food Illness | None | Practical Considerations #3 | **No — distinct card** |
| Business Interruption | None | Practical Considerations #8 | **No — distinct card** |

| Metric | Count |
|--------|------:|
| Explorer states (visual) | 4 |
| Explorer tabs at implementation | 4 |
| Distinct coverage topics represented on page | 6 |
| Practical Consideration cards | 11 (9 original + 2 coverage) |
| Template plumbing files for considerations on industry routes | 2 |
| Explorer / image / interaction changes | 0 |

---

## 8. Fallback (not needed)

If the considerations extension were blocked: the next-best option would be a **second gold detail block** under the Explorer stage keyed off active tab (show Product Liability blurb when GL selected; show BI blurb when Property selected). That would require **component changes** and still risks reading as sub-feature of the active tab — **worse than Practical Considerations**. The extension path above avoids that.

---

## 9. Implementation sequence (for a future pass — not this task)

1. Apply 2-file template plumbing (`considerations?` on `IndustryPageContent` + adapter pass-through).
2. Populate Restaurant `coverageTypes` (4 cards + detail pairs) and `considerations` (11 items) in `commercial-industries.ts`.
3. Update hero, `coverageIntro`, FAQs from approved final copy draft.
4. Verify Explorer still maps four ids → four PNGs.
5. Regression: other industry routes unchanged (no `considerations` field set).

---

## Stop gates (repeat)

- **NO MERGE · NO DEPLOY · NO VERCEL PROMOTION**
- **NO IMPLEMENTATION UNTIL OWNER APPROVES THIS REVISED MAPPING**

**STOP FOR OWNER REVIEW.**
