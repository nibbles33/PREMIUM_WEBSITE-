# D1 Final Closeout — Remaining Live Flags

**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Date:** 2026-09-07  
**Status:** **STOP FOR OWNER REVIEW**

---

## Stop gates

- **NO MERGE · NO DEPLOY · NO VERCEL PROMOTION**
- **NO website content modified outside approved D1 scope**

---

## Pre-pass baseline (regenerated at task start)

Command: `npx tsx scripts/product-content-audit.ts` + `node scripts/generate-remediation-matrix.mjs`

### Site-wide A/B/C/D (pre-closeout)

| A | B | C | D |
|--:|--:|--:|--:|
| 2 | 11 | 18 | 27 |

### Remediation matrix (pre-closeout)

| D1 | D2 | D3 | C1 | C2 | Total C/D |
|---:|---:|---:|---:|---:|----------:|
| 6 | 11 | 12 | 7 | 9 | **45** |

### Live HIGH/MEDIUM flags on original D1 routes (pre-closeout)

| Route | Class | Words | HIGH | MED | Flags |
|-------|-------|------:|-----:|----:|-------|
| `/auto-insurance/` | D | 564 | 3 | 0 | Collision card, Comprehensive card, Collision FAQ — flat *covers* |
| `/condo-insurance/` | D | 565 | 0 | 1 | Considerations — flat *include coverage* |
| `/cottage-insurance/` | B | 555 | 0 | 0 | *(already clear)* |
| `/home-insurance/` | D | 571 | 0 | 1 | FAQ — *legally required* negation |
| `/landlord-insurance/` | D | 497 | 0 | 1 | FAQ — *rent guarantee products* |
| `/motorcycle-insurance/` | B | 535 | 0 | 0 | *(LOW dollar only — AB deferred)* |
| `/small-business-insurance/` | C | 399 | 0 | 0 | *(already clear — depth only)* |
| `/tenant-insurance/` | D | 519 | 1 | 0 | FAQ — flat *covers* with *Generally* |
| `/travel-insurance/` | B | 540 | 0 | 0 | *(already clear)* |

**No unanticipated live flags** on the nine routes beyond those above.

---

## Resolutions

### AUTO — Content fixes (`src/data/pilot-auto.ts`)

#### Collision Coverage — card `description`

| | Text |
|---|------|
| **Before** | Repairs or replaces your vehicle after a collision, regardless of fault. |
| **After** | Optional coverage that can help pay to repair or replace your vehicle after a crash — subject to deductibles, limits, and policy terms. |
| **Reason** | Genuine flat-coverage wording; collision is optional physical-damage coverage in Ontario. Wording-only — no new statutory claim. |

#### Collision Coverage — card `detail`

| | Text |
|---|------|
| **Before** | Collision covers damage to your own vehicle from a crash with another car or object — useful when fault isn't clear or you're at fault. |
| **After** | When collision coverage is on your policy, it is intended to respond to damage to your own vehicle from a crash with another car or object — including situations where fault isn't clear or you're at fault, subject to deductibles, limits, and policy terms. |
| **Reason** | Flagged HIGH flat-*covers*; optional-coverage framing with policy qualification. |

#### Comprehensive Coverage — card `description`

| | Text |
|---|------|
| **Before** | Covers theft, vandalism, weather damage, and other non-collision events. |
| **After** | Optional coverage intended to address theft, vandalism, weather damage, and other non-collision events — subject to deductibles, limits, exclusions, and policy terms. |
| **Reason** | Flagged HIGH flat-*Covers*; comprehensive is optional. |

#### Comprehensive Coverage — card `detail`

| | Text |
|---|------|
| **Before** | Comprehensive protects against events outside your control — hail, fire, theft, vandalism, or hitting an animal. |
| **After** | When comprehensive coverage is on your policy, it is intended to address events outside your control — hail, fire, theft, vandalism, or hitting an animal — subject to deductibles, limits, exclusions, and policy terms. |
| **Reason** | Align detail panel with optional/qualified card standard (detail was not flagged but updated for consistency). |

#### FAQ — *What's the difference between collision and comprehensive coverage?*

| | Text |
|---|------|
| **Before** | Collision covers damage to your vehicle from a crash with another vehicle or object, regardless of fault. Comprehensive covers non-collision events such as theft, vandalism, hail, fire, and hitting an animal. |
| **After** | Collision coverage is intended to respond to damage to your vehicle from a crash with another vehicle or object — fault determination affects how claims are handled, subject to policy terms. Comprehensive coverage addresses non-collision events such as theft, vandalism, hail, fire, and hitting an animal when purchased — also subject to policy terms. |
| **Reason** | Flagged HIGH on collision sentence; extended comprehensive sentence for same optional-coverage standard. Wording-only — mandatory FAQ already states collision/comprehensive are optional. |

**Source:** No new authoritative verification required — corrections are hedging/optional-coverage framing only; mandatory-vs-optional fact already established in mandatory FAQ (D1 pass 1, FSRA-verified).

---

### CONDO — Scanner false positive (copy unchanged)

**Flagged sentence (verbatim):**  
*"Some policies include coverage if the corporation assesses owners for the master policy deductible after a claim."*

**Same content unit (full consideration card — title + description):**  
*"Deductible assessments — Some policies include coverage if the corporation assesses owners for the master policy deductible after a claim. Limits and eligibility vary by carrier."*

**Adjudication:** YES — false positive.  
- *"Some policies"* limits universality.  
- Second sentence in the **same card** explicitly qualifies limits/eligibility.  
- A reasonable reader sees the card as a whole.

**Scanner limitation:** Sentence-level scan split the consideration item; `requireHedge` checked only the first sentence. `HEDGE_WORDS` listed `varies` but not `vary`.

**Scanner corrections (`scripts/product-content-audit.ts`):**
1. For `field === "considerations"`, apply unit-level hedge check against full item text when `requireHedge` is set.
2. Add `vary` to `HEDGE_WORDS` (missing lemma — *"Limits and eligibility vary by carrier"*).

**Proof legitimate patterns remain:** Flat *"Some policies include coverage"* without unit qualification would still flag on routes lacking hedge in the full consideration text.

---

### HOME — Scanner false positive (copy unchanged)

**Flagged sentence (verbatim):**  
*"It isn't legally required in Ontario if you own your home free and clear, but it's strongly recommended."*

**Same content unit (full FAQ answer):**  
*"It isn't legally required in Ontario if you own your home free and clear, but it's strongly recommended. If you have a mortgage, your lender typically requires home insurance until the loan is paid off."*

**Adjudication:** YES — false positive.  
The flagged substring is a **negated** legal-requirement statement (*isn't legally required*) — accurate cautionary framing, not an unsupported affirmative legal claim.

**Scanner limitation:** `(required by law|legally required)` pattern lacked negation-skip (unlike `guarantee`).

**Scanner correction:** Added `NEGATED_LEGAL_REQUIREMENT` skip for *isn't/is not/are not/not … legally required|required by law*.

---

### LANDLORD — Scanner false positive (copy unchanged)

**Flagged sentence (verbatim):**  
*"Eviction and rent guarantee products are separate considerations."*

**Same content unit (full FAQ answer):**  
*"Standard property policies focus on physical damage and liability, not rent default. Loss of rental income coverage applies when a covered peril makes the unit uninhabitable — not when a tenant stops paying. Eviction and rent guarantee products are separate considerations."*

**Adjudication:** YES — false positive.  
*"Guarantee"* names a **separate product category** (*rent guarantee products*), not a promise that landlord insurance guarantees rent.

**Scanner correction:** Added `GUARANTEE_PRODUCT_CATEGORY` skip for `rent guarantee products`.

---

### TENANT — Scanner false positive (copy unchanged)

**Flagged sentence (verbatim):**  
*"Generally, a tenant policy covers the named insured and their household as defined in the policy."*

**Same content unit (full FAQ answer):**  
*"Generally, a tenant policy covers the named insured and their household as defined in the policy. Roommates often need separate policies or need to be listed properly. Ask your broker how your household should be set up."*

**Adjudication:** YES — false positive.  
- *"Generally"* scopes the assertion.  
- *"as defined in the policy"* limits coverage to policy-defined household.  
- Following sentence clarifies roommate limitations.

**Scanner correction:** Added `QUALIFIED_HOUSEHOLD_COVERS` skip — `/\bGenerally,.+\bas defined in the policy\b/i` on flat-*covers* pattern only. Does not broadly skip all *Generally* sentences site-wide.

---

## Deferred (explicit)

### Motorcycle Accident Benefits

**Not modified.** FSRA motorcycle-specific material may still list full pre–July 2026 accident-benefit categories as mandatory, while standard auto consumer pages reflect July 1, 2026 optionality. This inconsistency requires separate research — **do not infer from Auto**.

Current audit: **0 HIGH/MEDIUM** on `/motorcycle-insurance/`; **1 LOW** (verified FSRA `$200,000` figure). **Does not block D1 closeout.**

---

## Post-pass audit

### Site-wide A/B/C/D

| | Pre | Post | Δ |
|---|----:|-----:|--:|
| A | 2 | 2 | 0 |
| B | 11 | **16** | +5 |
| C | 18 | 18 | 0 |
| D | 27 | **22** | −5 |

### Remediation matrix

| Bucket | Pre | Post | Δ |
|--------|----:|-----:|--:|
| D1 | 6 | **1** | −5 |
| D2 | 11 | 11 | 0 |
| D3 | 12 | 12 | 0 |
| C1 | 7 | 7 | 0 |
| C2 | 9 | 9 | 0 |
| **Total C/D rows** | **45** | **40** | −5 |

The sole remaining **D1 bucket** row is `/small-business-insurance/` (Class **C** — shallow depth at 399w, **0 safety flags**; commercial-property hedging completed in D1 pass 1).

### Final state — nine original D1 routes

| Route | Final class | Words | HIGH | MED | LOW | In matrix? | Notes |
|-------|-------------|------:|-----:|----:|----:|:----------:|-------|
| `/auto-insurance/` | **B** | 649 | 0 | 0 | 3 | No | Mandatory AB / $200k LOW informational only |
| `/condo-insurance/` | **B** | 565 | 0 | 0 | 0 | No | — |
| `/cottage-insurance/` | **B** | 555 | 0 | 0 | 0 | No | — |
| `/home-insurance/` | **B** | 571 | 0 | 0 | 0 | No | — |
| `/landlord-insurance/` | **B** | 497 | 0 | 0 | 0 | No | — |
| `/motorcycle-insurance/` | **B** | 535 | 0 | 0 | 1 | No | AB deferred; $200k LOW only |
| `/small-business-insurance/` | **C** | 399 | 0 | 0 | 0 | **Yes — D1 bucket** | Depth-only; safety clear |
| `/tenant-insurance/` | **B** | 519 | 0 | 0 | 0 | No | — |
| `/travel-insurance/` | **B** | 540 | 0 | 0 | 0 | No | — |

**All nine routes: 0 HIGH/MEDIUM flags.**

---

## Cross-site audit impact

### Classification changes (pre-closeout → post-closeout)

| Route | Change | Cause |
|-------|--------|-------|
| `/auto-insurance/` | D → **B** | Content fixes (collision/comprehensive/FAQ) |
| `/condo-insurance/` | D → **B** | Scanner false-positive fix (considerations unit hedge) |
| `/home-insurance/` | D → **B** | Scanner false-positive fix (negated legal requirement) |
| `/landlord-insurance/` | D → **B** | Scanner false-positive fix (rent guarantee product category) |
| `/tenant-insurance/` | D → **B** | Scanner false-positive fix (qualified household FAQ) |

**No other routes** changed classification or HIGH/MEDIUM flag count.

**Confirmation:** NO website content outside Auto was modified. Scanner changes affected only the five routes above; no collateral flag loss on non-D1 routes.

---

## D1 closeout assessment

| Question | Answer |
|----------|--------|
| **Can D1 content-safety be considered closed?** | **Yes** — all nine original D1 routes have **zero HIGH/MEDIUM flags**. |
| **Routes remaining in D1 bucket?** | **One:** `/small-business-insurance/` — Class C (depth), not safety. |
| **Routes remaining Class D among original D1 set?** | **None.** |
| **Motorcycle AB** | **Explicitly deferred** — separate research item. |

---

## Regression

| Check | Result |
|-------|--------|
| `npm run build` | **PASS** |
| `npx tsc --noEmit` | **PASS** |
| `verify-coverage-explorer-ux-v2.cjs` | **PASS** |
| Auto @ 390px horizontal overflow | **0px — PASS** |
| Console errors on changed routes | **None observed** |
| Explorer imagery / Restaurant / Contractors | **Unchanged** |
| Shared components | **Unchanged** |

### Screenshots (content changes — Auto only)

`docs/qa-screenshots/d1-final-closeout-2026-09-07/`

| File | Shows |
|------|-------|
| `auto-collision-coverage.png` | Collision card + detail — optional/qualified wording |
| `auto-comprehensive-coverage.png` | Comprehensive card + detail — optional/qualified wording |
| `auto-collision-comprehensive-faq.png` | Collision vs comprehensive FAQ |
| `auto-mobile-390-explorer.png` | Mobile explorer — no overflow |
| `auto-mobile-390-overflow.json` | `{ "overflow": 0, "pass": true }` |

---

## Files changed

| File | Change type |
|------|-------------|
| `src/data/pilot-auto.ts` | Content — collision/comprehensive cards + FAQ |
| `scripts/product-content-audit.ts` | Scanner — four demonstrated false-positive fixes + `vary` hedge lemma |
| `scripts/capture-d1-closeout-screenshots.cjs` | QA capture helper |
| `docs/product-content-audit-2026-09-07.md` | Regenerated audit report |
| `docs/product-content-remediation-matrix-2026-09-07.md` | Regenerated matrix |
| `docs/qa-screenshots/product-content-audit-2026-09-07/audit-data.json` | Regenerated audit data |
| `docs/qa-screenshots/d1-final-closeout-2026-09-07/*` | Screenshots |
| `docs/d1-final-closeout-2026-09-07.md` | This report |

**Commit:** `cccac94`

---

## Stop gates (repeat)

- **NO MERGE · NO DEPLOY · NO VERCEL PROMOTION**

**STOP FOR OWNER REVIEW.**
