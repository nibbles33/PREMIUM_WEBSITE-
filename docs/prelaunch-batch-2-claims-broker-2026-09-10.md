# Pre-Launch Batch 2 — Claims Verification + Talk to a Broker

**Date:** 2026-09-10  
**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Worktree:** `/tmp/PREMIUM_WEBSITE-d3-transportation`  
**Base commit:** `3f6c15d`  
**Navigation freeze:** `4e68fc4` (unchanged)

---

## A. Claims Inventory

**Verified entries in code:** **25** (17 insurance companies + 8 specialty MGAs)  
**Unverified partner rows:** Additional entries merged from `partners.ts` at runtime (not part of official-source verification batch)

| # | Carrier | Phone(s) | URL | Email | Notes |
|---|---------|----------|-----|-------|-------|
| 1 | Intact | 1-866-464-2424 | — | — | 24/7 |
| 2 | Aviva | 1-866-692-8482, 1-866-MYAVIVA | — | — | |
| 3 | Wawanesa | 1-844-929-2637 | — | — | 24/7 |
| 4 | CAA Insurance | 1-877-222-1717 | — | — | 24/7 |
| 5 | Gore | 1-844-974-4673 | — | — | |
| 6 | Northbridge | 1-855-621-6262 | — | — | Broker first |
| 7 | SGI Canada | 1-800-361-2622 | coachmaninsurance.ca | — | **UPDATED** |
| 8 | Echelon | 3 regional emergency lines | echeloninsurance.ca | — | **UPDATED** |
| 9 | PemBridge | 4 regional Promise Lines | pembridge.com | — | **UPDATED** |
| 10 | Chubb | 1-800-532-4822 | — | — | |
| 11 | Travelers | 1-800-661-5522 | — | — | Warning re Canada exit |
| 12 | Definity | 1-800-607-2424, QC 1-888-875-8088 | — | — | 24 hours |
| 13 | Unica | 1-866-864-1113 | — | — | After-hours |
| 14 | PAFCO | 1-800-387-0462 | — | — | 24/7 Ontario |
| 15 | JEVCO | — | jevco.ca | claimsreporting@jevco.ca | **UPDATED** |
| 16 | Optimum | 4 after-hours regional lines | optimum-general.com | — | **UPDATED** |
| 17 | AIG | 2 phones | — | CanadaClaimsInquiry@aig.com | |
| 18 | CHES Special Risk | — | chesspecialrisk.ca | info@chesspecialrisk.ca | |
| 19 | Totten / Cansure | 1-855-535-0554 after-hours | cansure.com | claims@specialtyclaims.ca | **UPDATED** |
| 20 | Burns & Wilcox | 416-774-2477 | — | — | Nearest office |
| 21 | Trinity Underwriting | — | trinityunderwriting.ca | claims@trinityunderwriting.ca | **UPDATED** |
| 22 | SRIM | 1-866-347-6128 | srim.ca | claims@srim.ca | **UPDATED** |
| 23 | Beazley | 416-601-2155 | — | claims.canada@beazley.com | |
| 24 | ABEX | 1-888-204-4726 after-hours | abexinsurance.com | 2 emails | |
| 25 | Lions Gate | — | lionsgateuw.com | claims@lionsgateuw.com | **UPDATED** |

Full internal verification record: `docs/internal/claims-verification-record-2026-09-10.md`

---

## B. Verification Methodology

1. Read current `src/data/carrierClaims.ts` inventory (25 verified entries).
2. For each carrier, locate **official** claims/contact pages on insurer or MGA domains.
3. Compare phone, email, URL, and 24/7 claims against code.
4. Document discrepancies before any code change.
5. Update **only** demonstrably incorrect or stale factual contact data.
6. Preserve approved Claims UI, marketing copy tone, and visual system.
7. Do not use third-party directories, Google snippets, or broker sites as sole authority.

**Verification date:** 2026-09-10

---

## C. Official-Source Evidence Summary

| Status | Count | Carriers |
|--------|------:|----------|
| **CONFIRMED** | 16 | Intact, Aviva, Wawanesa, CAA, Gore, Northbridge, Chubb, Travelers, Definity, Unica, PAFCO, AIG, CHES, Burns & Wilcox, Beazley, ABEX |
| **UPDATE REQUIRED → FIXED** | 9 | SGI Canada, Echelon, PemBridge, JEVCO, Optimum, Totten/Cansure, Trinity, SRIM, Lions Gate |
| **AMBIGUOUS** | 0 | — |
| **REMOVE** | 0 | — |

---

## D. Discrepancy Matrix (pre-change)

| Carrier | Current (before) | Official | Status |
|---------|------------------|----------|--------|
| SGI Canada | 1-877-844-8460 | 1-800-361-2622 (Coachman) | UPDATE REQUIRED |
| Echelon | (800) 324-3566 | 866-252-2854 + regional | UPDATE REQUIRED |
| PemBridge | 1-877-736-2743 | Regional Promise Lines | UPDATE REQUIRED |
| JEVCO | 1-866-864-1112 | Email only on official site | UPDATE REQUIRED |
| Optimum | 1-877-806-8023 | Regional after-hours lines | UPDATE REQUIRED |
| Totten/Cansure | 1-888-868-8367 | specialtyclaims.ca email + after-hours | UPDATE REQUIRED |
| SRIM | 604-888-0050 | claims@srim.ca + 1-866-347-6128 | UPDATE REQUIRED |
| Trinity | (no email in code) | claims@trinityunderwriting.ca | UPDATE REQUIRED |
| Lions Gate | (fallback only) | claims@lionsgateuw.com | UPDATE REQUIRED |

All other 16 entries: **CONFIRMED** on phone/email grounds.

---

## E. Claims Changes (code)

**File:** `src/data/carrierClaims.ts`

| Change type | Detail |
|-------------|--------|
| SGI Canada | Replaced wrong toll-free; added Coachman claims URL |
| Echelon | Replaced head-office number with 3 regional emergency lines + URL |
| PemBridge | Replaced general line with 4 regional Promise Lines + URL |
| JEVCO | Removed unverified phone; added official email + URL |
| Optimum | Replaced unpublished number with 4 after-hours regional lines + URL |
| Totten/Cansure | Replaced new-business line with Specialty Claims email + after-hours phone + URL |
| Trinity | Added claims email + URL |
| SRIM | Replaced office line with official email + 24/7 hotline + URL |
| Lions Gate | Added claims email + URL (removes Premium-only fallback for this entry) |

**Not changed:** Claims page design, hero copy, FAQ content, broker phone, unverified partner rows.

---

## F. Ambiguous / Review Entries

**None** requiring owner hold. All 25 verified entries have an official-source basis after updates.

**Owner awareness items (not blockers):**
- Gore: 24/7 not explicitly stated on official site — availability field not added
- CAA: Travel claims use separate contacts from auto/home line
- Travelers: Prominent warning retained (Canada exit / Definity transfer)

---

## G. Claims Link QA

| Check | Result |
|-------|--------|
| New `claimsUrl` values | HTTPS official domains only |
| Malformed URLs | None |
| Broker/third-party redirects | None in updated URLs |
| Phone `tel:` links | Normalized via `phone()` helper |
| External link labels | "Report a claim online" with `rel="noopener noreferrer"` |

---

## H. Talk to a Broker Inventory (before)

| Location | Destination | Status |
|----------|-------------|--------|
| `/talk-to-a-broker` route | `PlaceholderPage` | **Placeholder** |
| Header (desktop + mobile) | `/talk-to-a-broker/` | → placeholder |
| Homepage hero, final CTA | `/talk-to-a-broker/` | → placeholder |
| Product pages (`PILOT_BROKER_HREF`) | `/talk-to-a-broker/` | → placeholder |
| Auto pages (`AUTO_BROKER_HREF`) | `/talk-to-a-broker/` | → placeholder |
| Nav resources | `/talk-to-a-broker/` | → placeholder |
| About, Team, Contact, Payment, Partners, Resources | `/talk-to-a-broker/` | → placeholder |
| Some product copy CTAs (travel, umbrella, etc.) | `/talk-to-a-broker/` | → placeholder |

**Functional submission before:** **NO** (placeholder only)

---

## I. Talk to a Broker Final Architecture

| Item | Implementation |
|------|----------------|
| `/talk-to-a-broker` | **308 permanent redirect** → `/contact?intent=broker` |
| `/contact?intent=broker` | Same Contact form (`ContactForm` → `/api/contact-submit`); broker-specific H1 and subhead |
| Duplicate form stack | **NO** — reuses Batch 1 contact backend |
| Product CTAs | `PILOT_BROKER_HREF` and `AUTO_BROKER_HREF` → `/contact?intent=broker` (direct) |
| Legacy `/talk-to-a-broker/` links | Still work via redirect |

**Contact backend:** **UNCHANGED** (cef0446 architecture preserved)

---

## J. CTA Changes

| File | Change |
|------|--------|
| `src/app/talk-to-a-broker/page.tsx` | Redirect replaces placeholder |
| `src/app/contact/page.tsx` | `intent=broker` UX |
| `src/data/pilot-product-shared.ts` | `PILOT_BROKER_HREF` → `/contact?intent=broker` |
| `src/data/pilot-auto.ts` | `AUTO_BROKER_HREF` → `/contact?intent=broker` |

**Not changed:** Header/Hero hardcoded `/talk-to-a-broker/` links (redirect handles them). Quote CTAs unchanged.

---

## K. Responsive QA

| Route | 390 | 768 | 1024 | 1440 |
|-------|-----|-----|------|------|
| `/claims` | ✅ | ✅ | ✅ | ✅ |
| `/contact` | ✅ | ✅ | ✅ | ✅ |
| `/contact?intent=broker` | ✅ (via contact smoke) | ✅ | ✅ | ✅ |

No overflow on Claims directory. Carrier selector + detail panel render at all viewports.

---

## L. Regression

| Check | Result |
|-------|--------|
| `npm run build` | ✅ Pass |
| `npx tsc --noEmit` | ✅ Pass |
| Content audit | **A44 / B16 / C0 / D0** |
| Navigation verifier | ✅ 60 routes, zero-discovery 0 |
| Explorer | **236 / 236** (unchanged — no Explorer edits) |
| Route check | ✅ 0 broken |
| Contact form API | ✅ Unchanged (Batch 1 architecture) |
| Talk-to-broker redirect | ✅ 308 → `/contact?intent=broker` |

---

## M. Remaining Owner Review

1. **Operational P0** (unchanged): Production env + E2E — see Batch 1B report
2. **premiumib.com** still WordPress — domain cutover separate
3. **Resend sender** — set `RESEND_FROM_EMAIL` when domain verified
4. **Unverified partner rows** on Claims page — still show broker fallback (by design)

---

## N. Remaining Operational P0

| Gate | Status |
|------|--------|
| CODE P0 | **CLEARED** |
| PRODUCTION CONFIG P0 | **CANNOT VERIFY** |
| PRODUCTION E2E P0 | **BLOCKED UNTIL APPROVED DEPLOYMENT** |
| **FINAL P0 COUNT** | **1** (operational gate only) |

Batch 2 customer-facing items are **complete in code**. Launch still blocked on Production env verification + deployment + E2E smoke test.

---

## Files Changed

| File | Purpose |
|------|---------|
| `src/data/carrierClaims.ts` | Verified claims contact updates |
| `src/app/talk-to-a-broker/page.tsx` | Redirect to contact |
| `src/app/contact/page.tsx` | Broker intent UX |
| `src/data/pilot-product-shared.ts` | Broker CTA href |
| `src/data/pilot-auto.ts` | Auto broker CTA href |
| `docs/internal/claims-verification-record-2026-09-10.md` | Internal verification record |
| `scripts/claims-responsive-smoke.cjs` | Audit-only QA script |

**Frozen 60 product copy:** UNCHANGED  
**Navigation:** UNCHANGED  
**Contact backend:** UNCHANGED

**DO NOT MERGE · DO NOT DEPLOY · STOP FOR OWNER REVIEW**
