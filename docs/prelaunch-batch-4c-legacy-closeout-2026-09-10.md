# Pre-Launch Batch 4C — Legacy Closeout: Pool/Spa + FAQs + Disclosure

**Date:** 2026-09-10  
**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Base:** `cdf7b36`  
**Scope:** Narrow closeout of three remaining legacy decisions. No redesign of Batch 3.5 / 4B protected work.

---

## A. `/pool-and-spa/` decision + implementation

**Owner decision:** REMOVE (410). Do not redirect to Auto / Commercial / homepage. Do not create a Pool/Spa product.

**Evidence (Batch 4B + reconfirm):** Title “Pool And Spa”; body is Ontario auto coverage (DCPD, Accident Benefits, etc.) — mismatched/broken.

**Implementation:** Added `/pool-and-spa/` to `LEGACY_GONE_PATHS` in `src/data/legacy-wordpress-cutover.ts` (existing middleware 410 architecture). Slash variants normalized by middleware.

**POOL-AND-SPA: 410 IMPLEMENTED**

---

## B. `/pool-and-spa/` validation

| Check | Result |
|-------|--------|
| `/pool-and-spa/` → 410 | Expected / verified in cutover validator |
| No `Location` redirect | Yes |
| Not in rebuild sitemap | Yes |
| No internal rebuild links | Yes |
| No indexable rebuild page | Yes |

---

## C. `/faqs/` legacy evidence (read-only live WP)

| Field | Value |
|-------|--------|
| OLD URL | `https://premiumib.com/faqs/` |
| HTTP STATUS | 200 |
| TITLE | FAQ’s \| Premium Insurance Brokers |
| H1 | *(none extracted — theme layout)* |
| META | Generic FAQ snippets (policy / deductible teaser) |
| CANONICAL | `https://premiumib.com/faqs/` |
| INDEXABLE | Yes (`max-image-preview:large`) |
| IN WP SITEMAP | Yes (`page-sitemap.xml`) |
| LAST-MODIFIED | Not reliably exposed in response headers during audit |
| VISIBLE FAQ COUNT | **9** question-like items |

---

## D. Legacy FAQ inventory

| # | Question | Answer summary |
|---|----------|----------------|
| 1 | What is an insurance policy? | Generic contract definition between insurer and individual/org |
| 2 | What is a deductible? | Out-of-pocket amount before coverage begins |
| 3 | Why do I need insurance? | Legal compliance / car & workers’ comp examples |
| 4 | What is a premium? | Regular payment to maintain a policy |
| 5 | What affects insurance cost? | Generic factors; mentions credit scores |
| 6 | How to file claim? | Contact insurer; forms/docs/adjuster |
| 7 | What is insurance? | Contract / premium in exchange for protection |
| 8 | What is the purpose of insurance? | Protect from financial losses |
| 9 | How does insurance work? | Risk pooling textbook explanation |

**Classification of page:** **DEMO / theme template insurance-101 filler** — not Premium-specific Windsor-Essex guidance; answers are generic and truncated theme copy.

---

## E. Rebuild FAQ comparison

| Legacy question | Classification | Rebuild location |
|-----------------|----------------|------------------|
| What is an insurance policy? | **THEME / DEMO JUNK** | Not migrated (generic) |
| What is a deductible? | **THEME / DEMO JUNK** (concept appears in product copy) | Product pages mention deductibles in context — not a standalone FAQ archive |
| Why do I need insurance? | **THEME / DEMO JUNK** | Not migrated |
| What is a premium? | **THEME / DEMO JUNK** | Claims FAQ discusses premium impact of filing — different intent |
| What affects insurance cost? | **STALE / SHOULD NOT MIGRATE** | Credit-score rating narrative is generic US-leaning theme filler |
| How to file claim? | **ALREADY COVERED** | `/claims/` + `claimsContent.ts` guidance |
| What is insurance? | **THEME / DEMO JUNK** | Not migrated |
| What is the purpose of insurance? | **THEME / DEMO JUNK** | Not migrated |
| How does insurance work? | **THEME / DEMO JUNK** | Not migrated |

**Counts:** ALREADY COVERED **1** · PARTIALLY COVERED **0** · NOT COVERED (meaningful Premium-specific) **0** · STALE/JUNK **8**

---

## F. `/faqs/` decision

**CASE 1** (demo/template) + **CASE 2** (only substantive claim-filing topic already on `/claims/`).

**ACTION:** **410 `/faqs/`** — no homepage catch-all redirect; no new FAQ page this batch.

**FAQ DECISION: 410 IMPLEMENTED**

---

## G. FAQ migration candidates

**None.** No Premium-specific, current, uncovered questions requiring migration approval.

---

## H. Disclosure PDF factual inventory

| Field | PDF value |
|-------|-----------|
| Document title (body) | Premium Insurance Brokers Customer Disclosure Form |
| PDF metadata Title | Microsoft Word - Document6 (useless) |
| Creation/ModDate | **2025-05-08** |
| Size | **115,563 bytes** (unchanged) |
| Entity | Premium Insurance Brokers a division of Oracle RMS |
| Website | www.premiumib.com |
| Email | info@premiumib.com |
| Phone | **226 780 6000** (one occurrence) |
| Address | *(not listed on the contact line)* |
| Topics | Contingent profit commissions; incentives; premium financing (First Insurance Funding); customer acknowledgment |
| Regulator/license refs | None in body |
| Signature/version | None beyond May 8 2025 PDF dates |

**File path preserved:** `public/wp-content/uploads/2025/05/disclosure.pdf`  
**Compliance link:** `/wp-content/uploads/2025/05/disclosure.pdf` (relative, same-path)

---

## I. Disclosure phone evidence

| Field | Value |
|-------|--------|
| PAGE | disclosure.pdf |
| CONTEXT | Closing contact sentence |
| FIELD/LABEL | “please contact us at …” |
| NUMBER | **226 780 6000** |
| OCCURRENCES | **1** |

**Approved website phone:** **226-782-6000**  
**Live WordPress homepage phones observed:** `226-782-6000` / `2267826000` only (no 780)  
**Rebuild:** consistently `226-782-6000` / `tel:+12267826000` (header, footer, contact, claims, forms)

**CLASSIFICATION: CONFIRMED TYPO**

---

## J. Other disclosure discrepancies

| Field | PDF | Rebuild | Match? | Severity | Recommendation |
|-------|-----|---------|--------|----------|----------------|
| Broker name | Premium Insurance Brokers | Premium Insurance Brokers | MATCH | — | — |
| Division | a division of Oracle RMS | A Division of Oracle RMS | MATCH (case/formatting) | Low | Keep |
| Phone | 226 780 6000 | 226-782-6000 | **MISMATCH** | **High** | Corrected PDF source |
| Email | info@premiumib.com | info@premiumib.com | MATCH | — | — |
| Website | www.premiumib.com | premiumib.com | MATCH (host) | Low | — |
| Address | not on PDF contact line | 3063 Dougall Ave, Windsor, ON N9E 1S7 | N/A (absent, not wrong) | Low | Optional add on next revision |
| Date | May 8, 2025 | — | Current enough | Low | Refresh when correcting phone |

---

## K. Disclosure recommendation

**DISCLOSURE ACTION: CORRECTED SOURCE REQUIRED**

- Do **not** edit/regenerate PDF in-repo this batch  
- Preserve same public path after owner supplies corrected file  
- Replace bytes at `public/wp-content/uploads/2025/05/disclosure.pdf` in a later compliance batch

---

## L. Redirect-map update

Updated `docs/internal/legacy-wordpress-redirect-map-2026-09-10.csv`:

| Path | Status |
|------|--------|
| `/pool-and-spa/` | APPROVED · **IMPLEMENTED** 410 |
| `/faqs/` | APPROVED · **IMPLEMENTED** 410 |
| `disclosure.pdf` | **DOCUMENT REPLACEMENT REQUIRED** · file preserved |

Original evidence columns retained.

---

## M. Legacy closeout status

| Item | Status |
|------|--------|
| LEGACY REDIRECT MAP | **COMPLETE** (URL decisions closed) |
| LEGACY URL DECISIONS | **COMPLETE** |
| DISCLOSURE MIGRATION | **REPLACEMENT REQUIRED** (path ready; corrected PDF not yet supplied) |
| SEO CUTOVER MAP | **READY** for redirects/removals; disclosure phone is a **compliance content** launch action, not a redirect-map gap |

---

## N. Regression

| Check | Result |
|-------|--------|
| `tsc --noEmit` | **PASS** |
| `npm run build` | **PASS** |
| Legacy cutover validator | **PASS** · 10 redirects (20 variants) · **49/49** gone · loops 0 · chains 0 |
| Personal discovery | **PASS** · 14/14 · zero-discovery 0 |
| Carrier ultrawide | **PASS** · 1440–3840 |
| Commercial homepage | **10/10 · 54/54** |
| Partners / claims / carriers | **44 / 25 / 12** |
| Content | **A44 / B16 / C0 / D0** |
| SEO / Navigation | **PASS** |
| Cannabis / Explorer UX v2 | **PASS** |
| Explorer 236 | **236 / 236 PASS** |
| Broker journey | **PASS** · talk-to-broker 308 → contact intent; no live CTA hrefs to alias |
| Disclosure PDF served | **200** at same public path |

---

## O. Remaining owner decisions

1. **Supply corrected disclosure.pdf** with phone **226-782-6000** (same path swap).  
2. Optional: add address line on next disclosure revision.

---

## P. Remaining launch blockers

1. Corrected disclosure PDF (compliance)  
2. Prior operational: Production quote email / Resend verification (unchanged; out of scope)  
3. DNS/cutover / deployment-safeguard batch (next)

---

## Safety

- Live WP read-only for `/faqs/` only  
- No PDF edit  
- No Personal / marquee / commercial redesign  
- Batch 4B redirects otherwise unchanged except owner-approved pool + faqs 410s  
- Stop for owner review
