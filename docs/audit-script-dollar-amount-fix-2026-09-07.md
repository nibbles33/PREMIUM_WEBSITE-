# Audit Script Fix — Verified Dollar Amounts / Statutory Figures

**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Date:** 2026-09-07  
**File changed:** `scripts/product-content-audit.ts` only  
**Website content:** unchanged

---

## Stop gates

- **NO MERGE · NO DEPLOY · NO VERCEL PROMOTION**
- **NO CONTENT CHANGES**

**STOP FOR OWNER REVIEW.**

---

## Problem

The motorcycle Third-Party Liability card cites a **verified** FSRA minimum:

> *"FSRA specifies minimum third-party liability coverage of at least $200,000."*

The audit flagged this as **HIGH** — *"Specific dollar amount — unverified limit/deductible"* — solely because the regex `/\$\s?\d[\d,]*(?:\.\d{2})?/` matched any dollar figure at HIGH severity with no distinction between:

- **(A)** a dollar amount present in otherwise qualified/regulatory copy, and  
- **(B)** an unsafe absolute numerical assertion.

The same false-positive pattern affected:

- Auto mandatory FAQ (`$200,000` minimum liability — FSRA-verified in D1 pass 1)
- Professional liability FAQ (`$1M to $5M … is common` — hedged industry range)

---

## Root cause

```132:141:scripts/product-content-audit.ts (before)
{
  regex: /\$\s?\d[\d,]*(?:\.\d{2})?/,
  issue: "Specific dollar amount — unverified limit/deductible",
  severity: "high",
},
{
  regex: /\b\d+\s*(?:million|thousand)\b/i,
  issue: "Specific numeric limit — may be unverified",
  severity: "high",
},
```

Any `$` + digits → automatic HIGH. No hedge check, no absolute-claim detection, no severity split.

---

## Fix (narrow — no hard-coded exemptions)

### 1. Generic dollar / numeric presence → **LOW** (informational)

- Dollar figures (including `$1M` shorthand): flagged **low** for manual verification when cited as fact.
- Million/thousand word forms: same **low** treatment.
- Skipped when a dedicated HIGH absolute-claim pattern also matches (avoid duplicate flags).

### 2. New **HIGH** patterns — absolute/universal numeric assertions only

| Pattern | Example flagged HIGH |
|---------|---------------------|
| `(your\|the) (deductible\|premium\|limit) is $…` | "Your deductible is $500" |
| `(costs\|priced at\|starting at) $…` | "Insurance costs $1,200 per year" |
| `(this\|the) policy pays $…` | "This policy pays $100,000" |
| `(will pay\|pays) $…` without hedge / with skip for up-to/at-least/minimum/statutory | "Pays $50,000 per claim" |
| `coverage is $…` without hedge | "Coverage is $2 million" |
| `(legal\|statutory) minimum is $…` | "The legal minimum is $200,000" (unsupported flat claim) |
| `always\|guaranteed` … `$` or million/thousand | "Coverage is always $2 million" |

**Not flagged HIGH** (LOW informational only, or no flag):

- `"FSRA specifies minimum … of at least $200,000"`
- `"minimum third-party liability coverage of $200,000"` (statutory framing, not "minimum is $")
- `"Contract requirements vary — $1M to $5M … is common"`
- `"may pay up to $50,000 subject to policy terms"` (hedged — LOW if `$` present)

No `$200,000` hard-code. Rule is general.

---

## Motorcycle regression (primary target)

| | Before fix | After fix |
|---|------------|-----------|
| **$200,000 HIGH flag** | Present | **Cleared** (downgraded to LOW informational) |
| **Classification** | **D** | **B** |
| **High/medium flags** | 1 | **0** |
| **Low flags** | 0 | 1 (dollar amount cited — verify basis) |

---

## Full 58-page audit impact

### A/B/C/D counts

| Class | Before | After | Δ |
|-------|-------:|------:|--:|
| A | 2 | 2 | 0 |
| B | 10 | **11** | +1 |
| C | 17 | **18** | +1 |
| D | 29 | **27** | −2 |

### Routes with classification change

| Route | Before → After | Cause |
|-------|----------------|-------|
| `/motorcycle-insurance/` | **D → B** | Sole HIGH flag was dollar-amount false positive |
| `/professional-liability-insurance/` | **D → C** | Sole HIGH flag was hedged `$1M–$5M` FAQ range |

**No other routes** changed classification.

### Flags removed / downgraded

| Route | Flag change |
|-------|-------------|
| `/motorcycle-insurance/` | HIGH *"Specific dollar amount — unverified limit/deductible"* → **LOW** *"Specific dollar amount cited — verify limit, deductible, or regulatory basis"* |
| `/auto-insurance/` | Same HIGH → **LOW** on FAQ `$200,000` sentence; **class stays D** (3 remaining HIGH: collision/comprehensive flat-*covers*) |
| `/professional-liability-insurance/` | Same HIGH → **LOW** on FAQ `$1M–$5M` sentence |

### Legitimate numeric safety flags lost?

**None identified.** No product-page copy matched the new HIGH absolute-claim patterns before or after. All three prior dollar HIGH flags were informational/regulatory citations, not absolute promises.

Spot-checks on synthetic sentences confirmed HIGH still fires for:
- "Coverage is always $2 million"
- "Your deductible is $500"
- "This policy pays $100,000"
- "Insurance costs $1,200 per year"
- "The legal minimum is $200,000"

And does **not** HIGH-fire for verified/regulatory/hedged examples.

---

## Remediation matrix changes

Command: `node scripts/generate-remediation-matrix.mjs`

Compared matrix regenerated from audit snapshot **immediately before** this script change vs after (isolates this fix from earlier D1 pass drift):

| Bucket | Before this fix | After | Δ |
|--------|----------------:|------:|--:|
| D1 | 7 | **6** | −1 |
| D2 | 11 | 11 | 0 |
| D3 | 12 | 12 | 0 |
| C1 | 7 | 7 | 0 |
| C2 | 9 | 9 | 0 |
| **Total C/D rows** | **46** | **45** | −1 |

**Matrix row changes from this fix only:**

- `/motorcycle-insurance/` — **removed from matrix** (D → B; was D1 bucket)
- `/professional-liability-insurance/` — **audit class D → C**; remains in matrix at bucket **D3** (assignment unchanged; no longer content-safety flagged)

---

## Scope confirmation

**Not modified:**
- Website content (all routes)
- Auto collision/comprehensive / FAQs (content)
- Group 3 pages (Condo/Home/Landlord/Tenant)
- Motorcycle Accident Benefits
- Explorer architecture, SEO, JSON-LD
- Remediation matrix assignment logic (only regenerated from updated audit)

---

## Verification commands

```bash
npx tsx scripts/product-content-audit.ts
node scripts/generate-remediation-matrix.mjs
```

---

## Stop gates (repeat)

- **NO MERGE · NO DEPLOY · NO VERCEL PROMOTION**

**STOP FOR OWNER REVIEW.**
