# Pre-Launch Batch 2.5 — Owner-Reported Issues

**Date:** 2026-09-10  
**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Worktree:** `/tmp/PREMIUM_WEBSITE-d3-transportation`  
**Base commit:** `cfc7fee`  
**Navigation freeze:** `4e68fc4` (unchanged)

---

## A. Owner-reported issue inventory

| # | Issue | Action |
|---|--------|--------|
| 1 | Homepage commercial categories show curated subset only | Show all approved taxonomy products per tab + desktop grid |
| 2 | Some images look low quality | Inventory + technical delivery quality bumps; no asset replacement |
| 3 | Quote submissions not delivering notification emails | Trace path; improve observability; document operational cause |
| 4 | Partners page shows Core vs Our Markets | Unify into one public Partners collection |
| 5 | Partner logos too small in white boxes | Enlarge logo max dimensions; trim padding |

**Explicitly preserved (owner-approved):** carrier marquee, Yep rail, Awards rail, Personal filmstrip, Claims, Talk to Broker, Contact/Quote/Careers backends (except narrow Quote observability), Coverage Explorer, Cannabis, frozen 60 product body copy.

---

## B. Homepage category before/after matrix

**Sources**
- Homepage runtime: `src/data/pilot-home.ts` → now derives products from `src/data/homepage-category-taxonomy.ts`
- Approved taxonomy: `docs/master-product-inventory-navigation-audit-2026-09-10.md` Section X + reconciliation owner principles (`4e68fc4`)
- Specialty Risks: **PRIMARY only** (Section X primary list) — secondary specialties remain on industry tabs (Section K)

| Category | Before | After | Expected | Status |
|----------|-------:|------:|---------:|--------|
| Transportation | 5 | 5 | 5 | COMPLETE |
| Construction | 4 | 7 | 7 | COMPLETE |
| Property | 4 | 6 | 6 | COMPLETE |
| Manufacturing | 4 | 4 | 4 | COMPLETE |
| Hospitality | 4 | 5 | 5 | COMPLETE |
| Professional | 4 | 5 | 5 | COMPLETE |
| Retail | 4 | 6 | 6 | COMPLETE |
| Health & Wellness | 4 | 4 | 4 | COMPLETE |
| Community | 3 | 6 | 6 | COMPLETE |
| Specialty Risks | 5 | 6 | 6 | COMPLETE |
| **TOTAL links** | **41** | **54** | **54** | **10/10** |

Verifier: `scripts/verify-homepage-category-completeness.ts` → **10/10 PASS**, missing 0, extra 0, within-category duplicates 0.

### Desktop layout
- Product list → responsive grid (`1` col mobile/tablet; `2` cols at `lg+` when count > 4)
- Adaptive panel height; no internal scrollbar; image `object-cover` with stretch alignment
- Explore Category + All Commercial CTAs retained (`/commercial-insurance/`)

---

## C. Newly surfaced homepage products

| Product | Categories |
|---------|------------|
| Landscaping & Snow Removal | Construction |
| Dump Truck | Construction (secondary overlap; already Transportation) |
| Pollution Liability | Construction (secondary; already Manufacturing) |
| Business Interruption | Property |
| Real Estate | Property (secondary; already Professional) |
| Grocery / Bakery | Hospitality (secondary; already Retail) |
| Cyber | Professional (secondary; already Specialty) |
| Pharmacy | Retail (secondary; already Health) |
| Salon / Barber | Retail (secondary; already Health) |
| Event Liability | Community |
| Directors & Officers | Community (secondary; already Professional) |
| Employment Practices Liability | Community + Specialty |
| Employment Practices Liability | Specialty (primary addition) |

---

## D. Partners before/after architecture

| Item | Before | After |
|------|--------|-------|
| Public structure | Two H2 groups: **Core Markets** (12) + **Our Markets** (32) | **One unified collection** |
| Data | `allPartners` (44) partitioned by `homepageCarriers` names | `getPublicPartners()` → deduped `allPartners` |
| Homepage marquee | `homepageCarriers` (12) via `PilotCarrierMarquee` | **UNCHANGED** |
| Carriers added/removed | — | **0** |

**PARTNER RECORDS BEFORE:** 44 in `allPartners` (presented as 12 + 32)  
**UNIQUE PARTNERS:** 44  
**PUBLIC PARTNERS AFTER:** 44  
**DUPLICATES REMOVED:** 0 (none in source list)  
**PARTNERS REMOVED FOR OTHER REASON:** 0  

Internal `getPartnerGroups()` retained (deprecated) for tooling; not used by visitor UI.

---

## E. Partner logo sizing changes

**File:** `src/components/PartnerLogoCard.tsx` (`directory` size only; marquee untouched)

| Property | Before | After |
|----------|--------|-------|
| Shell height | 88 / 96px | 92 / 100px |
| Horizontal padding | px-5 / px-6 | px-3 / px-4 |
| Logo max-height | 48 / 56px | **68 / 76px** |
| Logo max-width | 160 / 180px | **175 / 200px** |
| object-fit | contain | contain |
| Next/Image quality | default 75 | **90** |

Measured QA (1440): avg rendered logo height ≈ **76px** (was capped at 56px). No crop/distortion; `object-contain` retained.

---

## F. Image quality inventory

**Artifact:** `docs/qa-screenshots/prelaunch-batch-2-5-2026-09-10/image-quality-inventory.json`  
**Script:** `scripts/image-quality-inventory.cjs`  
**Scope:** photography, partners, carriers, awards, Cannabis raster assets (125 files)

| Risk | Count |
|------|------:|
| HIGH | 2 |
| MEDIUM | 40 |
| LOW | 83 |
| **TOTAL** | **125** |

**HIGH (replacement assets recommended):**
1. `/images/partners/partner-coast-underwriters.png` — 170×170  
2. `/images/partners/partner-forward.png` — 150×93  

Medium risk items are mostly partner/carrier logos in the 180–320px band (acceptable but not retina-ideal). Photography masters generally ≥1400px long edge → LOW.

---

## G. Images technically fixed

No source files replaced. Delivery-only:

| Change | Detail |
|--------|--------|
| Pilot homepage image qualities | Filmstrip / chip / Yep / commercial panel / auto related: **85 → 90** (`pilot-images.ts`) |
| Partner directory logos | `quality={90}` + larger contain caps |

---

## H. Images requiring replacement assets

| Route / section | Current file | Min dimensions | Aspect | Depict |
|-----------------|--------------|----------------|--------|--------|
| `/partners/` directory | `partner-coast-underwriters.png` | ≥400×400 (prefer 800+) | Square-ish logo | Official Coast Underwriters wordmark/logo on transparent or white |
| `/partners/` directory | `partner-forward.png` | ≥600×400 | Wide wordmark | Official Forward Insurance logo |

Owner to source/generate separately. Do not substitute random stock.

---

## I. Quote email architecture trace

```
QuoteFlowEngine.submitQuote()
  → POST /api/quote-submit
  → honeypot / validateLeadPayload
  → rate limit → saveLead (Neon)  [hard fail if DB fails]
  → sendLeadNotification (Resend) [soft fail]
  → { ok: true, id, notified }
  → UI “You're all set”
```

| Step | Status |
|------|--------|
| Form | `QuoteFlowEngine` / `useQuoteFlow` |
| Endpoint | `src/app/api/quote-submit/route.ts` |
| DB write | `saveLead` — required for success |
| Email | `src/lib/quote/notify.ts` via Resend |
| FROM | `getResendFrom("PremiumIB Quotes")` → `RESEND_FROM_EMAIL` or sandbox `onboarding@resend.dev` |
| TO | `QUOTE_NOTIFY_TO` or default `info@premiumib.com` |

---

## J. Quote email likely failure

| Check | Evidence |
|-------|----------|
| QUOTE DB WRITE | **CANNOT VERIFY** in this environment (no Production env access); code path is implemented |
| QUOTE EMAIL CALL | **IMPLEMENTED** |
| EMAIL FAILURE HANDLING | Persist-first: DB success + email fail still returns visitor success |
| UI FALSE SUCCESS POSSIBLE | **YES** (by design — lead kept; broker may not be notified) |
| RESEND API KEY | **CANNOT VERIFY** (Production) |
| RESEND FROM | Env-driven; defaults to **sandbox** `onboarding@resend.dev` |
| RESEND TO | `info@premiumib.com` (or `QUOTE_NOTIFY_TO`) |
| DOMAIN VERIFICATION | **NOT VERIFIED** (prior Batch 1B) |

**MOST LIKELY FAILURE CAUSE:** Production still on WordPress / rebuild not cut over **and/or** Resend sender still sandbox (`onboarding@resend.dev`) / `RESEND_API_KEY` unset / domain not verified — so Resend accepts or skips while `info@premiumib.com` never receives production mail. Code path itself invokes Resend after a successful DB save.

---

## K. Quote email code changes

| File | Change |
|------|--------|
| `src/lib/quote/notify.ts` | `QUOTE_NOTIFY_TO` support; sandbox FROM warning; richer failure logs (no secrets) |
| `src/app/api/quote-submit/route.ts` | Explicit error log when lead saved but `notified === false`; response includes `notified` boolean for operators |
| `.env.example` | Document `QUOTE_NOTIFY_TO` |

**Does not:** delete leads on email failure; expose config to visitors; change DNS/Resend account; deploy.

Customer UI confirmation text unchanged (still “You're all set”).

---

## L. Exact remaining owner operational actions

1. **Do not expect Quote emails from WordPress `premiumib.com`** — rebuild email stack is Next.js only after approved cutover.
2. Set Production **`RESEND_API_KEY`**.
3. Verify Premium domain in Resend; set **`RESEND_FROM_EMAIL`** to a verified address (e.g. `website@premiumib.com`).
4. Confirm **`DATABASE_URL`** on the environment that serves `/get-a-quote`.
5. Optional: set **`QUOTE_NOTIFY_TO`** if different from `info@premiumib.com`.
6. After staging deploy: submit one controlled test quote; confirm Resend dashboard + inbox; check logs for `notified: false`.
7. Provide higher-res logos for Coast Underwriters + Forward (see H).

---

## M. Responsive QA

| Surface | 390 | 430 | 768 | 1024 | 1440 |
|---------|-----|-----|-----|------|------|
| Homepage category discovery | PASS | PASS | PASS | PASS | PASS |
| Partners unified grid + logos | PASS (sampled) | — | — | — | PASS |

- Category switching: PASS  
- All Commercial CTA: `/commercial-insurance` PASS  
- Largest category Construction (7) / Specialty (6): accessible, no clip  
- Working rails present: marquee YES, Yep YES, Personal filmstrip YES  

Artifact: `docs/qa-screenshots/prelaunch-batch-2-5-2026-09-10/homepage-partners-qa.json`

---

## N. Regression

| Check | Result |
|-------|--------|
| `npm run build` | PASS |
| `npx tsc --noEmit` | PASS |
| Content audit | **A44 / B16 / C0 / D0** |
| Navigation verifier | PASS — 60 routes, zero-discovery 0 |
| Homepage completeness | **10/10** |
| Cannabis verifier | PASS |
| Explorer | **236/236** PASS (no Explorer code changes) |
| Claims / Talk to Broker | Untouched this batch |

---

## O. Remaining issues

1. Operational P0: Production env + Resend domain + approved deploy + E2E (unchanged)
2. Quote email delivery: blocked on operational config, not missing Resend call
3. Two partner logos need higher-resolution source assets
4. SEO / canonical remediation: next batch

**DO NOT MERGE · DO NOT DEPLOY · STOP FOR OWNER REVIEW**
