# D1 Content-Safety Review — Research/Proposal Only

**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Baseline:** Corrected `docs/product-content-audit-2026-09-07.md` + `docs/product-content-remediation-matrix-2026-09-07.md`  
**Scope:** 9 D1 routes only — **no content implemented**  
**Status:** **STOP FOR OWNER REVIEW**

---

## Stop gates

- **NO MERGE · NO DEPLOY · NO CONTENT CHANGES**
- No Explorer `detailTitle`/`detailDescription` population
- No shared component changes
- No SEO / JSON-LD / geographic targeting changes

---

## Summary

| Metric | Count |
|--------|------:|
| D1 pages reviewed | **9** |
| Total HIGH flags | **10** |
| Total MEDIUM flags | **4** |
| **Total flags reviewed** | **14** |
| Current audit class for all 9 pages | **D** (content-safety) |

### Problem-type classification (item 8)

| Type | Meaning | Count |
|------|---------|------:|
| **A** | Wording / over-certainty only — underlying assertion likely sound if hedged | **7** |
| **B** | Underlying assertion requires authoritative verification before rewrite | **3** |
| **C** | Potentially incorrect / misleading characterization | **0** |
| **D** | Audit false positive (or sentence-level flag ignoring same-unit qualification) | **4** |

### Implementation readiness (proposed)

| Group | Count | Description |
|-------|------:|-------------|
| **GROUP 1** — Safe wording corrections | **7 flags** | Underlying meaning appears sound; hedge/reframe in place |
| **GROUP 2** — Research/verification first | **4 flags** | Ontario statutory / mandatory framing — verify before approving copy |
| **GROUP 3** — Owner review (possible false positives) | **3 flags** | Audit or sentence-split issue; may need no copy change |

> **Note:** Some rows span both A and B (e.g. motorcycle card combines verifiable mandatory framing with a flat “covers” verb). Group assignment uses the **gating** concern — statutory claims go to Group 2 even when wording also needs softening.

---

## Statement-level review table

| # | Route | Product | Section / field | Exact flagged sentence (verbatim) | Severity | Audit rule | Underlying insurance assertion | Problem type | Proposed replacement wording (NOT implemented) | External research required? |
|---|-------|---------|-----------------|-----------------------------------|----------|------------|----------------------------------|--------------|--------------------------------------------------|----------------------------|
| 1 | `/auto-insurance/` | Auto Insurance | Coverage Explorer — **Collision Coverage** card (`detail`; also appears in RIGHT selector as description) | *"Collision covers damage to your own vehicle from a crash with another car or object — useful when fault isn't clear or you're at fault."* | HIGH | `\bcovers?\s+(your\|the\|…\|damage\|…)\b` with `requireHedge` — no hedge word in sentence | When **collision coverage is purchased**, it is intended to respond to physical damage to the insured vehicle from a collision, including at-fault scenarios — subject to deductibles, limits, exclusions, and policy form | **A** | *"When collision coverage is on your policy, it is intended to respond to damage to your own vehicle from a crash with another car or object — including situations where fault isn't clear or you're at fault, subject to deductibles, limits, and policy terms."* | **No** — standard optional auto physical-damage coverage; not a statutory claim |
| 2 | `/auto-insurance/` | Auto Insurance | Coverage Explorer — **Comprehensive Coverage** card (`description` / RIGHT selector) | *"Covers theft, vandalism, weather damage, and other non-collision events."* | HIGH | Same flat-`covers` rule | When **comprehensive coverage is purchased**, it is intended to address specified non-collision losses (theft, vandalism, weather, animal strike, etc.) — not mandatory in Ontario | **A** | *"When comprehensive coverage is on your policy, it is intended to address theft, vandalism, weather damage, and other non-collision events — subject to deductibles, limits, exclusions, and policy terms."* | **No** |
| 3 | `/auto-insurance/` | Auto Insurance | Coverage Explorer — **Accident Benefits** card (`detail`) | *"Accident benefits help cover medical care, rehabilitation, caregiver costs, and income replacement for you and your passengers after an injury."* | HIGH | `\bcovers?\s+…\|medical\|…` — matches **"cover medical"** inside *"help cover medical"* | Ontario auto policies include **statutory accident benefits** with defined benefit categories, but amounts, eligibility, and optional enhancements vary by policy and regulation — not an unlimited medical guarantee | **B** | *"Accident benefits are part of standard Ontario auto insurance and can provide defined benefits toward medical care, rehabilitation, caregiver costs, and income replacement after an injury — subject to statutory limits, policy wording, and eligibility rules."* | **Yes** — verify current Ontario accident-benefits categories and mandatory vs optional components against **FSRA / Insurance Act / statutory auto policy provisions** (not marketing summaries) |
| 4 | `/auto-insurance/` | Auto Insurance | FAQ — *"Is auto insurance mandatory in Ontario?"* (`answer`) | *"All Ontario drivers are legally required to carry auto insurance."* | MEDIUM | `\b(required by law\|legally required)\b` — no Ontario-context skip on answers | Ontario law requires **automobile insurance** before operating a motor vehicle on a highway — minimum coverages are prescribed (third-party liability, accident benefits, uninsured automobile, DCPD in applicable cases) | **B** | *"Ontario law requires motorists to carry automobile insurance with at least the prescribed coverages before driving on a public highway — typically including third-party liability and accident benefits. Optional coverages such as collision and comprehensive protect your own vehicle when purchased."* | **Yes** — verify exact requirement and minimum coverages against **Compulsory Automobile Insurance Act (Ontario)** and current FSRA/auto policy standard |
| 5 | `/auto-insurance/` | Auto Insurance | FAQ — *"What's the difference between collision and comprehensive coverage?"* (`answer`, second sentence) | *"Collision covers damage to your vehicle from a crash with another vehicle or object, regardless of fault."* | HIGH | Flat-`covers` rule | Same as row 1 — describes optional collision coverage scope when purchased | **A** | *"Collision coverage is intended to respond to damage to your vehicle from a crash with another vehicle or object — fault determination affects how claims are handled, subject to policy terms."* | **No** |
| 6 | `/condo-insurance/` | Condo Insurance | Coverage card — **Unit Contents & Improvements** (`description` / Explorer selector) | *"Covers your belongings and upgrades you have made inside the unit — finishes, fixtures, and betterments beyond what the corporation's policy includes."* | HIGH | Flat-`covers` rule | Condo unit policies are **designed** to insure the owner's contents and betterments/improvements inside the unit — scope depends on policy form, limits, and master-policy coordination | **A** | *"Intended to insure your belongings and upgrades inside the unit — finishes, fixtures, and betterments beyond what the corporation's master policy includes — subject to your policy limits, definitions, and exclusions."* | **No** — standard condo unit-owner proposition; master/ unit split already referenced elsewhere on page |
| 7 | `/condo-insurance/` | Condo Insurance | Practical consideration — **Deductible assessments** (full card: title + description) | *"Some policies include coverage if the corporation assesses owners for the master policy deductible after a claim."* | MEDIUM | `\bincludes?\s+(liability\|property\|coverage\|protection)\b` with `requireHedge` — **"Some"** not in hedge-word list | Some condo unit policies **may** offer deductible-assessment / loss-assessment coverage for master-policy deductible chargebacks — availability and limits vary by form and carrier | **D** | **Optional:** *"Some policies may include coverage for assessments if the corporation charges owners for the master policy deductible after a claim."* — or **no change** if owner accepts same-unit qualification | **No** for wording; **same content unit** already continues: *"Limits and eligibility vary by carrier."* Flag is sentence-split artifact |
| 8 | `/cottage-insurance/` | Cottage Insurance | Coverage card — **Liability Protection** (`description` / Explorer selector) | *"Covers injury or property damage claims arising from your ownership or use of the cottage property, including guest and recreational activity exposure."* | HIGH | Flat-`covers` rule | Personal liability coverage on a seasonal-dwelling policy is **intended** to respond to third-party bodily injury / property damage claims tied to the insured premises and activities — subject to exclusions (rental use, certain recreational exposures, etc.) | **A** | *"Personal liability coverage is intended to respond to certain injury or property-damage claims arising from your ownership or use of the cottage property, including some guest and recreational exposures — subject to policy limits, definitions, and exclusions."* | **No** — ordinary personal-lines liability proposition; rental-use caveat already elsewhere on page |
| 9 | `/home-insurance/` | Home Insurance | FAQ — *"Do I need home insurance if I own my home outright?"* (`answer`, first sentence) | *"It isn't legally required in Ontario if you own your home free and clear, but it's strongly recommended."* | MEDIUM | `\b(required by law\|legally required)\b` — **no negation skip** | Ontario does **not** impose a general statutory requirement to carry home insurance for free-and-clear owners (mortgage contracts are separate) — sentence states a **negative** legal requirement | **D** | **No change recommended** — sentence is accurate cautionary framing; audit matched substring *"legally required"* without recognizing negation | **No** — widely accepted; optional cite to FSRA consumer guidance if owner wants explicit source |
| 10 | `/landlord-insurance/` | Landlord Insurance | FAQ — *"Does landlord insurance cover tenant default on rent?"* (`answer`, last sentence) | *"Eviction and rent guarantee products are separate considerations."* | MEDIUM | `\bguarantee[ds]?\b` — no product-name exception | Names a **separate product category** (rent-guarantee / rent-default products), not a promise that landlord policy guarantees rent | **D** | **No change recommended** — or minor clarity: *"Eviction processes and rent-guarantee products are separate from standard landlord property policies."* | **No** |
| 11 | `/motorcycle-insurance/` | Motorcycle Insurance | Coverage card — **Third-Party Liability** (`description` / Explorer selector) | *"Mandatory in Ontario — covers injury or damage you cause to others while operating your motorcycle on public roads."* | HIGH | Flat-`covers` rule (matches *"covers injury"*) — **"Mandatory in Ontario"** separately triggers low-severity `mandatory` rule (not this flag) | **Two assertions in one sentence:** (1) Third-party liability is **legally required** for motorcycle use on Ontario public roads; (2) liability coverage **responds to** third-party injury/property damage — both generally accepted but statutory wording should be verified | **B** (mandatory) + **A** (covers verb) | *"Third-party liability is required in Ontario before riding on public roads. This coverage is intended to respond when you are legally liable for injury or property damage to others — subject to limits, exclusions, and policy terms."* | **Yes** for mandatory portion — verify against **Ontario compulsory auto/motorcycle insurance requirements** (same framework as automobiles) |
| 12 | `/small-business-insurance/` | Small Business Insurance | Coverage card — **Commercial Property** (`description` / Explorer selector) | *"Covers your equipment, inventory, and leasehold improvements against covered theft, fire, or other insured losses."* | HIGH | Flat-`covers` rule | Commercial property coverage is **intended** to insure business personal property and improvements for listed perils when purchased — sentence already says *"covered"* / *"insured losses"* but leads with absolute *"Covers"* | **A** | *"Intended to insure your equipment, inventory, and leasehold improvements for theft, fire, and other insured perils — subject to causes of loss, limits, deductibles, and policy terms."* | **No** |
| 13 | `/tenant-insurance/` | Tenant Insurance | FAQ — *"Does tenant insurance cover my roommate's belongings?"* (`answer`, first sentence) | *"Generally, a tenant policy covers the named insured and their household as defined in the policy."* | HIGH | Flat-`covers` rule — **"Generally"** not in hedge-word list | Tenant policies insure **named insured(s) and household members as defined in the policy** — roommates not listed may not be covered; assertion is standard industry practice | **D** | **Optional softening:** *"Typically, a tenant policy insures the named insured and household members as defined in the policy wording."* — current copy already qualified by *"Generally"* and *"as defined in the policy"* in the **same FAQ answer** | **No** |
| 14 | `/travel-insurance/` | Travel Insurance | Coverage card — **Baggage & Personal Effects** (`description` / Explorer selector) | *"Covers loss, theft, or damage to luggage and personal belongings during your trip, within stated limits and deductibles."* | HIGH | Flat-`covers` rule | Baggage coverage on travel policies **pays toward** specified perils up to sub-limits and deductibles — sentence already states limits in the **same card description** | **A** | *"Can pay toward loss, theft, or damage to luggage and personal belongings during your trip, within stated limits, deductibles, and policy exclusions."* — or lead with limits: *"Within stated limits and deductibles, baggage coverage is intended to address loss, theft, or damage to luggage and personal belongings during your trip."* | **No** |

---

## Same-unit qualification notes (visual proximity)

Reviewed whether flagged sentences are already qualified **in the same coverage card, consideration item, or FAQ answer** — not elsewhere on the page.

| Row | Same-unit qualification present? | Assessment |
|-----|----------------------------------|------------|
| 1–2, 5–6, 8, 11–12 | **No** — absolute verb stands alone in the card/FAQ sentence | Wording change appropriate in that unit |
| 3 | Partial — card `description` says *"mandatory in Ontario"*; flagged `detail` sentence still overstates benefit breadth | Hedge benefit scope; verify statutory categories (Group 2) |
| 7 | **Yes** — second sentence in same consideration card: *"Limits and eligibility vary by carrier."* | Audit sentence-split issue (Group 3) |
| 9 | **Yes** — negation in same FAQ sentence (*"isn't legally required"*) | Audit false positive (Group 3) |
| 13 | **Yes** — *"Generally"* and *"as defined in the policy"* in same FAQ sentence; next sentence addresses roommates | Audit false positive / optional polish (Group 3) |
| 14 | **Yes** — *"within stated limits and deductibles"* in same card sentence | Wording lead-in still absolute; minor Group 1 polish optional |

**Important:** Other cards on these pages (e.g. Home **Liability Protection** *"Covers you if someone is injured…"*, Travel **Emergency Medical** *"Covers unexpected medical treatment… subject to policy limits"*) did not flag because the audit regex requires `covers` to be immediately followed by specific nouns — not because those cards are necessarily safer. They were **out of scope** for this flag table but should be reviewed in a future pass if D1 wording standardizes.

---

## Proposed implementation grouping

### GROUP 1 — Safe wording corrections (underlying assertion appears sound)

Implement after owner approval — **hedging/reframing only**, no new sections, no length expansion:

| Row(s) | Route | Field | Action |
|--------|-------|-------|--------|
| 1, 5 | Auto | Collision card + FAQ | Align collision copy; emphasize optional purchase + policy terms |
| 2 | Auto | Comprehensive card | Optional-coverage framing |
| 6 | Condo | Unit Contents card | Replace leading *"Covers"* with intended-to-insure framing |
| 8 | Cottage | Liability card | Add exclusions/limits reference in same card |
| 12 | Small Business | Commercial Property card | Lead with insured-perils language already implied |
| 14 | Travel | Baggage card | Reorder or soften verb; retain limits clause in same sentence |

### GROUP 2 — Research / verification before rewriting

Do **not** approve final wording until verified against authoritative sources (FSRA, Ontario legislation, standard policy/statutory auto provisions — **not** brokerage marketing pages alone):

| Row(s) | Route | Topic to verify | Why |
|--------|-------|-----------------|-----|
| 3 | Auto | Accident benefits — mandatory categories, limits, optional enhancements | Statutory/regulatory scope — avoid overstating medical/income breadth |
| 4 | Auto | Compulsory insurance requirement + minimum coverages | Legal-requirement MEDIUM flag; exact statutory language |
| 11 | Motorcycle | Compulsory liability for motorcycles on public roads | *"Mandatory in Ontario"* is a legal assertion in same flagged card |

**Suggested sources (owner/implementation phase):** FSRA-Ontario auto insurance consumer/regulatory materials; *Compulsory Automobile Insurance Act* (R.S.O. 1990, c. C.25); current Ontario Standard Auto Policy / accident benefits schedules.

### GROUP 3 — Possible audit false positives (owner review)

| Row(s) | Route | Recommendation |
|--------|-------|----------------|
| 7 | Condo | **Likely no copy change** — consideration already qualified in same card; document audit sentence-split limitation |
| 9 | Home | **No copy change** — accurate negation of legal requirement |
| 10 | Landlord | **No copy change** (or minimal product-name clarity) — *"guarantee"* refers to product category |
| 13 | Tenant | **Optional polish only** — same-answer qualification sufficient; not a cross-section hedge |

**Audit script note (document only — not changed in this task):** The `(required by law|legally required)` pattern lacks negation-skip (unlike `guarantee`) and does not skip when *"Ontario"* appears in the same sentence. The flat-`covers` pattern does not treat leading *"Generally"* / same-sentence limit clauses as qualification. No change made per scope.

---

## Full 58-page audit — bucket impact if D1 fixes applied (projected)

**Current corrected audit (unchanged):** A=2, B=8, C=16, D=32

If Group 1 wording fixes and Group 2 verifications resolve **all 14 flags** on these 9 routes (and Group 3 rows need no change):

| Route | Current class | Projected class (if all flags cleared) | Basis |
|-------|---------------|------------------------------------------|-------|
| Auto | D | **B** or **C** | 461w substantive — thin vs adequate threshold; not A without depth expansion |
| Condo | D | **B** | 547w, good card quality, considerations present |
| Cottage | D | **B** | 525w, considerations present |
| Home | D | **B** | 571w — Group 3 likely no change needed; class clears if flag dismissed |
| Landlord | D | **B** | 497w |
| Motorcycle | D | **B** or **C** | 463w |
| Small Business | D | **C** | 375w — may remain thin on words even after D1 wording pass |
| Tenant | D | **B** | 519w |
| Travel | D | **B** | 532w |

**Remediation matrix shift (if all 9 move out of class D):**

| | Current | Projected |
|---|--------:|----------:|
| D1 rows | 9 | **0** |
| D2 rows | 11 | 11 |
| D3 rows | 12 | 12 |
| C1 rows | 7 | 7 |
| C2 rows | 9 | **10** (small-business may drop from D1 to C band) |
| **Total C/D matrix rows** | 48 | **~39–41** |

Exact matrix regrouping requires re-running audit after approved copy changes — numbers above are **projections only**.

---

## Verification commands (future implementation phase)

```bash
npx tsx scripts/product-content-audit.ts
node scripts/generate-remediation-matrix.mjs
```

---

## Stop gates (repeat)

- **NO MERGE · NO DEPLOY · NO VERCEL PROMOTION**
- **NO CONTENT IMPLEMENTED IN THIS TASK**

**STOP FOR OWNER REVIEW.**
