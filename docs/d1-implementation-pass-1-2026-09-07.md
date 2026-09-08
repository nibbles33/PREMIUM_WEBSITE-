# D1 Implementation Pass 1 — Group 1 + Verified Statutory Items

**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07` (continued from approved baseline — no new branch)  
**Date:** 2026-09-07  
**Scope:** Content corrections only — Group 1 wording fixes + statutory-verified items from `docs/d1-statutory-verification-2026-09-07.md`

---

## Stop gates

- **NO MERGE · NO DEPLOY · NO VERCEL PROMOTION**
- Audit script unchanged
- Shared components / Explorer architecture / SEO / JSON-LD unchanged
- Group 3 items and motorcycle accident benefits **deliberately untouched**

**STOP FOR OWNER REVIEW.**

---

## Summary

| Metric | Before pass | After pass |
|--------|------------:|-----------:|
| Site-wide A / B / C / D | 2 / 8 / 16 / 32 | **2 / 10 / 17 / 29** |
| D1 target pages at Class D | 6 / 6 | **3 / 6** |
| Content files modified | — | 3 |
| Routes with unexpected classification shift | — | **0** (only the 3 expected exits from D) |

---

## Changes implemented

### 1. Auto — Accident Benefits (`src/data/pilot-auto.ts`)

**Card `description` (RIGHT selector)**

| | Text |
|---|------|
| **Before** | Medical, rehabilitation, and income replacement support after an accident — mandatory in Ontario. |
| **After** | Mandatory medical, rehabilitation, and attendant care benefits for Ontario policies entered into on or after July 1, 2026 — with other accident benefits available to add. |

**Card `detail` (LEFT detail panel)**

| | Text |
|---|------|
| **Before** | Accident benefits help cover medical care, rehabilitation, caregiver costs, and income replacement for you and your passengers after an injury. |
| **After** | For policies entered into on or after July 1, 2026, statutory accident benefits include mandatory medical, rehabilitation, and attendant care benefits. Other accident benefits — such as income replacement and caregiver benefits — are optional and must be added to your policy if you want them, subject to policy terms and who is covered under your policy. |

**Basis:** FSRA standard auto policy page + customize liability/AB pages (July 1, 2026 mandatory/optional split).

---

### 2. Auto — Mandatory-coverage FAQ (`src/data/pilot-auto.ts`)

**FAQ:** *"Is auto insurance mandatory in Ontario?"* — full `answer` replacement

| | Text |
|---|------|
| **Before** | Yes. All Ontario drivers are legally required to carry auto insurance. At minimum, that includes third-party liability and accident benefits. Optional coverages like collision and comprehensive protect your own vehicle. |
| **After** | Yes. Ontario law requires you to carry automobile insurance before driving on public roads. A standard policy includes minimum third-party liability coverage of $200,000, uninsured automobile coverage, and direct compensation–property damage coverage (with limited opt-out rights), along with statutory accident benefits. For policies entered into on or after July 1, 2026, only medical, rehabilitation, and attendant care benefits are mandatory within accident benefits — other accident benefits such as income replacement are optional. Physical damage coverages like collision and comprehensive are also optional. |

**Basis:** FSRA customize liability page ($200,000 minimum), standard auto policy page (compulsory coverages + July 2026 AB split).

---

### 3. Motorcycle — Third-Party Liability (`src/data/pilot-personal-inline.ts`)

**Card `description` (RIGHT selector / LEFT detail fallback)**

| | Text |
|---|------|
| **Before** | Mandatory in Ontario — covers injury or damage you cause to others while operating your motorcycle on public roads. |
| **After** | Required in Ontario when riding on public roads (not when the motorcycle is used on private property only). FSRA specifies minimum third-party liability coverage of at least $200,000. This coverage is intended to respond when you are legally liable for injury or property damage to others — subject to your policy limits, exclusions, and terms. |

**Basis:** FSRA motorcycle/snowmobile page (mandatory except private property; $200,000 minimum stated on motorcycle-specific page).

---

### 4. Condo — Unit Contents & Improvements (`src/data/pilot-personal-inline.ts`) — Group 1

| | Text |
|---|------|
| **Before** | Covers your belongings and upgrades you have made inside the unit — finishes, fixtures, and betterments beyond what the corporation's policy includes. |
| **After** | Intended to insure your belongings and upgrades inside the unit — finishes, fixtures, and betterments beyond what the corporation's master policy includes — subject to your policy limits, definitions, and exclusions. |

---

### 5. Cottage — Liability Protection (`src/data/pilot-personal-inline.ts`) — Group 1

| | Text |
|---|------|
| **Before** | Covers injury or property damage claims arising from your ownership or use of the cottage property, including guest and recreational activity exposure. |
| **After** | Personal liability coverage is intended to respond to certain injury or property-damage claims arising from your ownership or use of the cottage property, including some guest and recreational exposures — subject to policy limits, definitions, and exclusions. |

---

### 6. Small Business — Commercial Property (`src/data/product-pages/commercial-products-core.ts`) — Group 1

| | Text |
|---|------|
| **Before** | Covers your equipment, inventory, and leasehold improvements against covered theft, fire, or other insured losses. |
| **After** | Intended to insure your equipment, inventory, and leasehold improvements for theft, fire, and other insured perils — subject to causes of loss, limits, deductibles, and policy terms. |

---

### 7. Travel — Baggage & Personal Effects (`src/data/pilot-personal-inline.ts`) — Group 1

| | Text |
|---|------|
| **Before** | Covers loss, theft, or damage to luggage and personal belongings during your trip, within stated limits and deductibles. |
| **After** | Can pay toward loss, theft, or damage to luggage and personal belongings during your trip, within stated limits, deductibles, and policy exclusions. |

---

## Deliberately left untouched

| Item | Route / field | Reason |
|------|---------------|--------|
| **Group 3 — Condo deductible consideration** | `/condo-insurance/` considerations | Owner review — audit sentence-split artifact; same card already qualifies with *"Limits and eligibility vary by carrier."* |
| **Group 3 — Home FAQ** | `/home-insurance/` | Owner review — accurate negation of legal requirement |
| **Group 3 — Landlord rent guarantee** | `/landlord-insurance/` FAQ | Owner review — *"guarantee"* refers to product category |
| **Group 3 — Tenant FAQ** | `/tenant-insurance/` FAQ | Owner review — same-answer qualification sufficient |
| **Motorcycle Accident Benefits card** | `/motorcycle-insurance/` coverage card | FSRA motorcycle page still lists full pre–July 2026 AB categories as mandatory; ambiguous vs standard auto pages — **deferred pending clarification** |
| **Motorcycle mandatory FAQ** | `/motorcycle-insurance/` FAQ | Same deferral — references uniform accident benefits minimum |
| **Auto collision / comprehensive cards + FAQ** | `/auto-insurance/` | Out of scope for this pass (Group 1 items not approved for implementation here) |
| **Audit script, shared components, Explorer architecture, SEO/JSON-LD** | — | Per task scope |

---

## Post-implementation audit results (actual)

Command: `npx tsx scripts/product-content-audit.ts`

### Target pages (6)

| Route | Before | After | Words | Remaining flags (non-low) | Notes |
|-------|--------|-------|------:|---------------------------|-------|
| `/auto-insurance/` | **D** | **D** | 564 | 4 HIGH (collision card, comprehensive card, FAQ $200k, FAQ collision) + 2 LOW (mandatory AB) | Statutory AB + FAQ fixes landed; flat-*covers* collision/comprehensive items remain (out of scope) |
| `/motorcycle-insurance/` | **D** | **D** | 535 | 1 HIGH — `$200,000` dollar-amount flag on verified FSRA figure | Flat-*covers* flag cleared; new flag is audit rule on specific dollar amounts |
| `/condo-insurance/` | **D** | **D** | 565 | 1 MEDIUM — Group 3 deductible consideration (untouched) | Unit Contents HIGH flag **cleared** |
| `/cottage-insurance/` | **D** | **B** | 555 | **0** | Liability card fix cleared sole HIGH flag |
| `/small-business-insurance/` | **D** | **C** | 399 | **0** | Commercial Property HIGH cleared; class C reflects shallow overall depth |
| `/travel-insurance/` | **D** | **B** | 540 | **0** | Baggage card HIGH cleared |

### Site-wide classification shifts

Only these routes changed class — all expected from this pass:

| Route | Before → After |
|-------|----------------|
| `/cottage-insurance/` | D → **B** |
| `/small-business-insurance/` | D → **C** |
| `/travel-insurance/` | D → **B** |

**No other page** changed classification unexpectedly.

---

## Regression verification

| Check | Result |
|-------|--------|
| `npm run build` | **Pass** |
| `npx tsc --noEmit` | **Pass** |
| `npx tsx scripts/product-content-audit.ts` | **Pass** (58 pages) |
| `node scripts/verify-coverage-explorer-ux-v2.cjs` | **Pass** (`pass: true`) |
| Console errors on touched routes | **None observed** during screenshot capture |
| Other routes affected | **None** — data-only edits in 3 content files |

---

## Screenshots

**Directory:** `docs/qa-screenshots/d1-implementation-pass-1-2026-09-07/`

| File | Shows |
|------|-------|
| `auto-insurance-coverage-explorer.png` | Accident Benefits card + LEFT detail (July 2026 AB split) |
| `auto-insurance-faq-mandatory.png` | Mandatory-coverage FAQ with $200k + AB split |
| `motorcycle-insurance-coverage-explorer.png` | Third-Party Liability card + detail ($200k, private-property qualifier) |
| `condo-insurance-coverage-explorer.png` | Unit Contents & Improvements hedged wording |
| `cottage-insurance-coverage-explorer.png` | Liability Protection hedged wording |
| `small-business-insurance-coverage-explorer.png` | Commercial Property hedged wording |
| `travel-insurance-coverage-explorer.png` | Baggage & Personal Effects hedged wording |
| `capture-results.json` | Puppeteer copy verification for all 6 pages |

Capture script: `scripts/capture-d1-pass1-screenshots.cjs` (QA helper only — not part of product runtime).

---

## Owner follow-ups (not in this pass)

1. **Motorcycle accident benefits** — reconcile FSRA motorcycle page vs July 2026 auto consumer pages before updating AB card/FAQ.
2. **Auto collision/comprehensive** — Group 1 wording fixes (rows 1, 2, 5 in content-safety review) remain available if owner approves a second pass.
3. **Audit dollar-amount rule** — verified FSRA figures ($200,000) still flag HIGH; may need audit rule exception or owner acceptance.
4. **Group 3 items** — condo consideration, home/landlord/tenant FAQs per content-safety review.

---

## Stop gates (repeat)

- **NO MERGE · NO DEPLOY · NO VERCEL PROMOTION**

**STOP FOR OWNER REVIEW.**
