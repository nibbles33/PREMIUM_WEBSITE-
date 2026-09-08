# Restaurant Copy → UI Mapping (Owner Review)

**Route:** `/restaurant-insurance/`  
**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Source copy:** `docs/restaurant-final-copy-draft-2026-09-07.md`  
**Status:** Mapping / architecture decision only — **NO IMPLEMENTATION · NO WEBSITE CHANGES**

---

## Stop gates

- **NO MERGE · NO DEPLOY · NO VERCEL PROMOTION**
- **Do not change** Coverage Explorer imagery, interaction behavior, or state-image assets
- **Do not edit** live product-page data until owner approves mapping + copy

**STOP FOR OWNER REVIEW**

---

## Current page template (what exists today)

Restaurant renders through `PilotProductPage` → `adaptCommercialIndustryContent()` (`src/lib/buildPilotProductConfig.ts`). Relevant UI zones, top to bottom:

| # | UI section | Component | Data fields | Restaurant today |
|---|------------|-----------|-------------|------------------|
| A | **Hero** | `ProductHero` | `headline`, `heroLead` (= `subhead`) | ✓ |
| B | **Trust band** | inline in `PilotProductPage` | `trustStatement` (= `subhead` again for industry routes) | ✓ (duplicates hero) |
| C | **Coverage Explorer** | `ProductCoverageExplorer` | `coverageIntro`, `coverageItems[]` | ✓ 4 tabs |
| C-left | Explorer visual stage | `ProductCoverageVisualStage` → `CoverageStateImageStage` | Per-tab `id` → state PNG | ✓ 4 state images |
| C-left | Explorer detail panel | gold box under image | `detailTitle`, `detailDescription` | ✗ not populated live |
| C-right | Coverage tab cards | same `coverageItems[]` tablist | `shortLabel`, `description` | ✓ 4 tabs |
| D | **Practical Considerations** | `ProductConsiderations` | `considerations[]` | ✗ **not wired** — `IndustryPageContent` has no `considerations` field; adapter does not pass them |
| E | Broker story | `ProductBrokerStory` | shared steps | ✓ |
| F | Related products | `ProductRelatedProducts` | related links | ✓ |
| G | **FAQ** | `PremiumProductFAQ` | `faqItems[]` | ✓ 4 live / 5 proposed |
| H | Final CTA | `ProductFinalCta` | cta fields | ✓ |

### Critical architecture facts

1. **There is no separate non-Explorer coverage list.** All coverage topics share one tablist inside `ProductCoverageExplorer`. There is no template slot for “static cards beside the Explorer.”
2. **Restaurant Explorer mode is `coverage-state-images`** — four dedicated PNG states plus base master (`src/data/coverage-explorer/restaurant-coverage-state-images.ts`). Tabs whose `id` is unmapped fall back to the **base master image** (no wrong image, but no distinct visual state).
3. **Tab `id` is auto-slugified from card `title`** (`buildPilotProductConfig.toCoverageItems`). State images map only these four ids:

   | Card title (must slugify to…) | Explorer state key | State PNG |
   |-------------------------------|--------------------|-----------|
   | `General Liability` | `general-liability` | `restaurant-insurance-state-general-liability.png` |
   | `Property Coverage` | `property-coverage` → `property` | `restaurant-insurance-state-property.png` |
   | `Liquor Liability` | `liquor-liability` | `restaurant-insurance-state-liquor-liability.png` |
   | `Equipment Breakdown & Spoilage` | `equipment-breakdown-spoilage` → `equipment-breakdown` | `restaurant-insurance-state-equipment-breakdown.png` |

   Renaming **Property Coverage** → **Commercial Property** would slugify to `commercial-property` and **break** the property state image unless the data model gains an explicit `id` override (not present today).

4. **Practical Considerations is a valid page section** (see Daycare, Greenhouse, commercial-products-core routes) but **requires a data-model + adapter change** for industry pages before the nine proposed consideration items can render.

---

## Recommended mapping (4-state Explorer preserved)

**Owner decision required:** Fold the two topics without Explorer states into the two closest liability/property tabs. All six draft topics still appear on the page; four drive the Explorer; two are **merged** into sibling tabs rather than given separate tabs or imagery.

| # | Draft coverage topic | Live Explorer state | Primary UI location | Merge? |
|---|----------------------|---------------------|---------------------|--------|
| 1 | General Liability | **State 1 — General Liability** (`general-liability`) | Explorer right tab + left detail panel | No — anchor tab |
| 2 | Commercial Property | **State 2 — Property** (`property-coverage` id) | Explorer right tab + left detail panel | **Yes — merge Business Interruption in** |
| 3 | Liquor Liability | **State 3 — Liquor Liability** (`liquor-liability`) | Explorer right tab + left detail panel | No — anchor tab |
| 4 | Product Liability / Food Illness | **State 1 — General Liability** (same tab as #1) | Merged into General Liability tab + detail panel | **Yes — merge into General Liability** |
| 5 | Equipment Breakdown & Spoilage | **State 4 — Equipment Breakdown** (`equipment-breakdown-spoilage`) | Explorer right tab + left detail panel | No — anchor tab |
| 6 | Business Interruption | **State 2 — Property** (same tab as #2) | Merged into Property tab + detail panel | **Yes — merge into Commercial Property** |

**Not in Explorer (other draft sections):**

| Draft content | UI location |
|---------------|-------------|
| Hero subhead | **A — Hero** (`subhead` / `heroLead`) |
| Coverage section intro | **C — Explorer heading** (`coverageIntro` above tab grid) |
| Nine Practical Considerations | **D — Practical Considerations** (after adapter + type extension) |
| Five FAQs | **G — FAQ** |

---

## Mapping table (full)

| Coverage topic | Live Explorer state | UI location | Exact resulting copy (merged where applicable) | Detail-pair adjustment |
|----------------|--------------------|-------------|-----------------------------------------------|------------------------|
| **General Liability** | **General Liability** | Explorer tab 1 — `title`: **General Liability** · `shortLabel`: **General** (auto) · `id`: `general-liability` | **Tab `description`:** Helps protect against certain third-party bodily injury and property-damage claims arising from restaurant operations and your premises — such as slip-and-fall incidents in the dining room or parking area — subject to policy terms, exclusions, and limits. May also respond to certain claims alleging illness or injury from food you prepared or served, often as part of products-completed operations coverage within a CGL policy or by endorsement — scope and exclusions vary by carrier and wording. | **Rewrite required** — merge with Product Liability pair (below) |
| **Product Liability / Food Illness** | *(none — merged into General Liability)* | Same Explorer tab as General Liability (tab 1). Supplementary regulatory context also appears in **Practical Considerations #2** (food safety) and **FAQ #4** (O. Reg. 493/17). | *See merged General Liability tab text above.* Product-specific draft sentence preserved in merge: *"May also respond to certain claims alleging illness or injury from food you prepared or served…"* | Draft pair **not used standalone** — absorbed into merged General Liability `detailTitle` / `detailDescription` |
| **Commercial Property** | **Property** | Explorer tab 2 — `title`: **Property Coverage** *(keep for `property-coverage` id)* · `shortLabel`: **Property** · Display name “Commercial Property” can appear in `detailTitle` or intro only until explicit `id` field exists | **Tab `description`:** May help cover your building (if owned or required under lease), tenant improvements, furniture, fixtures, and kitchen equipment against covered causes of loss, depending on how the policy is structured and which perils or endorsements apply. Business interruption coverage may help with lost business income and certain continuing expenses when a covered property loss forces you to close or scale back service, subject to waiting periods, limits, and policy terms — particularly relevant where payroll and rent continue during repairs. | **Rewrite required** — merge with Business Interruption pair (below) |
| **Business Interruption** | *(none — merged into Property)* | Same Explorer tab as Commercial Property (tab 2). Seasonal/occupancy underwriting also in **Practical Considerations #6** (patio/seasonality) and **FAQ #5** (quote intake). | *See merged Property tab text above.* BI draft sentence preserved in merge: *"Business interruption coverage may help with lost business income…"* | Draft pair **not used standalone** — absorbed into merged Property `detailTitle` / `detailDescription` |
| **Liquor Liability** | **Liquor Liability** | Explorer tab 3 — `title`: **Liquor Liability** · `id`: `liquor-liability` | **Tab `description`:** Where you sell or serve alcohol under an AGCO Liquor Sales Licence, liquor liability may address certain claims tied to alcohol service — a distinct coverage from general liability, which often excludes or limits liquor-related claims. Holding a licence authorizes legal sale and service; it does not include insurance, and the Liquor Licence and Control Act itself does not mandate liquor liability insurance as a statutory condition. | **Use as-is** from approved draft |
| **Equipment Breakdown & Spoilage** | **Equipment Breakdown** | Explorer tab 4 — `title`: **Equipment Breakdown & Spoilage** · `id`: `equipment-breakdown-spoilage` | **Tab `description`:** Equipment breakdown coverage may address sudden mechanical or electrical failure of covered kitchen or refrigeration equipment; spoilage endorsements may address inventory lost due to temperature change from specified causes — neither is automatic in a base property policy. | **Use as-is** from approved draft |

---

## Exact merged detail pairs (Explorer left panel)

These replace the six draft pairs with **four** pairs aligned to the four Explorer states.

### Tab 1 — General Liability (+ Product Liability / Food Illness)

**detailTitle:** When a busy dining room — or a meal — becomes a liability claim

**detailDescription:** Restaurants concentrate people in high-traffic areas — dining rooms, patios, washrooms, and parking lots — where spills, crowded aisles, and seasonal ice create slip-and-fall exposure. Separately, foodborne illness allegations, undeclared allergen incidents, and contamination events can generate third-party claims distinct from a simple trip or fall. General liability may respond to certain injury and property-damage claims arising from premises and operations; products-completed operations coverage may address certain illness or injury claims tied to food you prepared or served — but scope, exclusions, and limits depend on your policy wording. Food handler compliance under O. Reg. 493/17 is a public health obligation, not a substitute for liability coverage.

**vs. draft:** Combines draft General Liability + Product Liability pairs. **Both drafts required rewrite** — neither usable as-is without losing the other topic.

---

### Tab 2 — Property Coverage / Commercial Property (+ Business Interruption)

**detailTitle:** Kitchen equipment, covered property loss, and income while you're closed

**detailDescription:** A restaurant's property exposure is weighted toward the kitchen — commercial ovens, fryers, walk-in coolers, hood systems, and built-in fixtures often represent a large share of insurable value alongside dining-room furniture and tenant improvements. Fire, water damage from suppression systems, and theft of equipment or alcohol stock are common loss scenarios carriers evaluate when structuring property coverage. When a covered property loss closes or scales back service, business interruption coverage may help with lost income and certain continuing expenses while lease payments, core staff, and supplier commitments continue — subject to waiting periods, limits, and policy terms. For seasonal or patio-driven revenue in Windsor–Essex, accurate peak-period values matter when underwriting business income.

**vs. draft:** Combines draft Commercial Property + Business Interruption pairs. **Both drafts required rewrite.**

---

### Tab 3 — Liquor Liability

**detailTitle:** Civil liability under the Act versus the coverage on your policy

**detailDescription:** Serving alcohol under an AGCO Liquor Sales Licence creates regulatory obligations and civil liability exposure if a patron is overserved or alcohol contributes to injury or property damage after they leave. AGCO's licensing guide addresses that civil exposure directly — it is not the same as carrying liquor liability insurance, and the Act does not prescribe a named insurance product as a licence condition. Liquor liability coverage, where included in your program, is meant to address many alcohol-related claims that standard general liability excludes or limits; landlords and other counterparties may still require proof of coverage contractually.

**vs. draft:** ✅ **Use as-is** — no adjustment needed.

---

### Tab 4 — Equipment Breakdown & Spoilage

**detailTitle:** When the walk-in fails on a Friday night

**detailDescription:** Refrigeration and cooking equipment are operationally critical — a sudden compressor failure or electrical breakdown can destroy thousands of dollars in perishable inventory and force you to stop service. Base property policies often handle fire or theft differently from mechanical breakdown or temperature-change spoilage. Equipment breakdown and spoilage endorsements exist precisely because restaurants depend on a continuous cold chain and functioning kitchen lines; triggers and sublimits vary, especially for off-premises power failures versus on-site equipment failure.

**vs. draft:** ✅ **Use as-is** — no adjustment needed.

---

## Detail-pair adjustment summary

| Draft pair | Disposition |
|------------|-------------|
| General Liability | **Rewritten** — merged with Product Liability |
| Commercial Property | **Rewritten** — merged with Business Interruption |
| Liquor Liability | **As-is** |
| Product Liability / Food Illness | **Not standalone** — content absorbed into General Liability merged pair |
| Equipment Breakdown & Spoilage | **As-is** |
| Business Interruption | **Not standalone** — content absorbed into Property merged pair |

---

## Alternative placements considered (not recommended)

| Option | Why not chosen under 4-state constraint |
|--------|----------------------------------------|
| **5th / 6th Explorer tab** (no new PNG) | Tab would render, but image stays on **base master** after first interaction — looks like a broken Explorer state; violates “preserve 4-state Explorer” intent. |
| **Standalone static cards** beside Explorer | **No template slot exists** — would require new component/architecture. Out of scope. |
| **Product Liability + BI only in Practical Considerations** | Considerations are for regulatory/underwriting context (Daycare pattern), not primary coverage cards; six coverage topics would be underrepresented in the Explorer section that owns “What’s covered.” |
| **Product Liability only in FAQ** | FAQ #4 is regulatory (food handler rules), not product-liability coverage; would leave a coverage gap in the main section. |

---

## Flagged future consideration (not part of this mapping)

If owner later approves **two additional state PNGs** + registry keys (`product-liability-food-illness`, `business-interruption`), Restaurant could match Daycare’s six-tab / six-state pattern without merged copy. That is **asset + architecture work**, explicitly out of scope here.

Until then, the mapping above is the **zero-compromise-on-Explorer-assets** path: all six topics appear in page copy; four drive distinct visuals; two merge into the closest semantic siblings (liability stack → GL tab; property income stack → Property tab).

---

## Fit summary

| Category | Count | Topics |
|----------|------:|--------|
| **Clean 1:1 fit** (own Explorer state, draft tab + detail pair usable with at most title/id nuance) | **2** | Liquor Liability · Equipment Breakdown & Spoilage |
| **1:1 state, merged copy required** | **2** | General Liability *(absorbs Product Liability)* · Property Coverage *(absorbs Business Interruption)* |
| **No Explorer state — merged into sibling tab** | **2** | Product Liability / Food Illness · Business Interruption |
| **Non-Explorer draft sections** (separate template zones) | **3 blocks** | Hero subhead · 9 Practical Considerations · 5 FAQs |

**Bottom line:** **2 of 6** topics fit cleanly as standalone Explorer tabs with draft copy unchanged. **4 of 6** require a **content merge decision** (2 into General Liability, 2 into Property) — not a new visual state. **0 of 6** have a dedicated fifth/sixth UI slot in the current template without either merge or future assets.

---

## Implementation prerequisites (for a later pass — not this task)

1. Extend `IndustryPageContent` + `adaptCommercialIndustryContent` to pass `considerations[]` so section **D** renders.
2. Keep card title **`Property Coverage`** (or add explicit `id` field) to preserve `property-coverage` → property PNG mapping.
3. Populate `detailTitle` / `detailDescription` on all four cards (live restaurant cards omit these today).
4. Update `coverageIntro`, hero `subhead`, and FAQ set from approved draft.
5. Optionally differentiate `trustStatement` from hero (today both = `subhead`).

---

## Stop gates (repeat)

- **NO MERGE · NO DEPLOY · NO VERCEL PROMOTION**
- **NO WEBSITE CHANGES UNTIL OWNER APPROVES THIS MAPPING**

**STOP FOR OWNER REVIEW.**
