# Audit Script Negation-Skip Fix — 2026-09-07

**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Script:** `scripts/product-content-audit.ts`  
**Status:** Fix applied — **STOP FOR OWNER REVIEW**

---

## Stop gates

- **NO MERGE**
- **NO DEPLOY**
- **NO CONTENT CHANGES** (Daycare content untouched)

---

## Problem

The `\bautomatically included\b` safety pattern flagged **any** occurrence as HIGH severity with no negation skip — unlike the existing `guarantee` pattern which uses `NEGATED_GUARANTEE` / `skipIf`.

This produced a HIGH flag on Daycare FAQ:

> *"Abuse and molestation liability is typically its own distinct coverage, separate from general liability — it shouldn't be assumed to be automatically included."*

---

## Fix applied

Added shared negation-skip regexes (same structural approach as `NEGATED_GUARANTEE`):

| Pattern | New skip regex | Example negated sentence |
|---------|----------------|--------------------------|
| `automatically included` | `NEGATED_AUTOMATIC_INCLUSION` | *"shouldn't be assumed to be automatically included"* |
| `covers …` (flat claim) | `NEGATED_COVER_CLAIM` | *"landlord's policy does not cover your stuff"* |
| `will cover` | `NEGATED_WILL_COVER` | *"will not cover"* / *"won't cover"* |
| `includes liability/property/…` | `NEGATED_INCLUDES` | *"does not include liability"* |

`scanSafety()` now accepts `skipIf: RegExp | RegExp[]` so the `covers` pattern can skip both FAQ-context phrases and negated claims.

**Gap audit:** `protects you` already had `skipIf: /\bprotects you if\b/` + `requireHedge`. `will cover` and `includes` lacked negation handling — now added. Dollar/limit patterns unchanged (no negation gap identified).

---

## Daycare re-audit (post-fix)

| Metric | Pre-fix | Post-fix |
|--------|--------:|---------:|
| HIGH/MEDIUM flags | 1 | **0** |
| Classification | **D** | **A** |
| Substantive words | 956 | 956 |
| Coverage cards | 6 | 6 |
| Considerations | 9 | 9 |
| FAQs | 5 | 5 |

**Classification reason (actual):** *"Substantive (956w), 6 cards avg 57.7w, considerations yes, FAQ unique"*

Daycare joins Greenhouse as the second **Class A** page. This reflects cleared safety flags + substantive depth — not an assumed outcome.

---

## Full 58-page audit — bucket count delta

| Class | Pre-fix | Post-fix | Δ |
|-------|--------:|---------:|--:|
| **A** | 1 | **2** | +1 |
| **B** | 8 | 8 | 0 |
| **C** | 16 | 16 | 0 |
| **D** | 33 | **32** | −1 |

### Pages with classification change

| Route | Pre | Post | Notes |
|-------|-----|------|-------|
| `/daycare-private-school-insurance/` | D | **A** | Only page whose class changed |

### Pages with flag count change (class unchanged)

| Route | Pre flags (high/med) | Post flags | Notes |
|-------|---------------------:|-----------:|-------|
| `/tenant-insurance/` | 2 | **1** | Negated *"does not cover your stuff"* no longer flagged; remains **D** due to unhedged *"covers the named insured"* FAQ |

No other pages affected.

---

## Remediation matrix impact

Regenerated via `scripts/generate-remediation-matrix.mjs` against post-fix audit data.

| Bucket | Pre-fix (49 rows) | Post-fix (48 rows) | Δ |
|--------|------------------:|-------------------:|--:|
| D1 | 9 | 9 | 0 |
| D2 | **12** | **11** | −1 |
| D3 | 12 | 12 | 0 |
| C1 | 7 | 7 | 0 |
| C2 | 9 | 9 | 0 |
| **Total C/D rows** | **49** | **48** | −1 |

**Change:** Daycare (`D2` assignment) **drops out** of the matrix — now Class **A**, no remediation bucket.

All other bucket counts unchanged. Batch planning numbers shift by one row only (D2 −1).

---

## Artifacts

| File | Purpose |
|------|---------|
| `docs/qa-screenshots/product-content-audit-2026-09-07/audit-data-pre-negation-fix.json` | Pre-fix snapshot |
| `docs/qa-screenshots/product-content-audit-2026-09-07/audit-data.json` | Post-fix audit |
| `docs/product-content-audit-2026-09-07.md` | Regenerated full report |
| `docs/product-content-remediation-matrix-2026-09-07.md` | Regenerated matrix |

---

## Verification

```bash
npx tsx scripts/product-content-audit.ts
node scripts/generate-remediation-matrix.mjs
```
