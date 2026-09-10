# Final Whole-Site Pre-Launch Audit — Phase 1 (Audit Only)

**Date:** 2026-09-10  
**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Worktree:** `/tmp/PREMIUM_WEBSITE-d3-transportation`  
**Navigation freeze:** `4e68fc4`  
**Audit commit:** *(pending — this document)*  
**Base URL tested:** `http://127.0.0.1:3019` (local production build)  
**Scope:** Audit only — no production code changes in this phase.

---

## A. Audit Base

| Item | Value |
|------|-------|
| Product routes (inventory) | **60 / 60** |
| Content grades | **A44 / B16 / C0 / D0** |
| Zero-discovery routes | **0** |
| Explorer baseline | **236 / 236 checks pass** (59 explorer routes × 4 viewports) |
| Navigation reconciliation | Pass (`scripts/verify-navigation-discovery.cjs`) |
| Frozen product copy | Not reopened in this audit |

**Artifacts generated (audit-only):**

- `docs/qa-screenshots/final-prelaunch-audit-2026-09-10/route-inventory.json`
- `docs/qa-screenshots/final-prelaunch-audit-2026-09-10/link-audit.json`
- `docs/qa-screenshots/final-prelaunch-audit-2026-09-10/runtime-console.json`
- `docs/qa-screenshots/final-prelaunch-audit-2026-09-10/seo-static.json`
- `scripts/final-prelaunch-audit.cjs` (partial run — route/link/runtime helpers)
- `scripts/prelaunch-seo-static.cjs`

**Reused baseline artifacts:**

- `docs/qa-screenshots/site-integration-final-7402/explorer-full-regression.json` — 236/236 pass
- `docs/qa-screenshots/navigation-reconciliation-2026-09-10/discovery-matrix.json`

---

## B. Route Inventory

### Summary

| Category | Count |
|----------|------:|
| **TOTAL PUBLIC ROUTES** | **79** |
| **200 OK** | **78** |
| **REDIRECT** | **0** (canonical URLs tested without trailing slash) |
| **404** | **1** (intentional fake route) |
| **500** | **0** |
| **BROKEN** | **0** |

### Route classes verified

| Class | Status |
|-------|--------|
| 60 product `*-insurance` routes | ✅ 200 |
| Homepage `/` | ✅ 200 |
| About, Careers (+ job slug), Claims, Partners, Resources, Contact | ✅ 200 |
| Get a Quote, Talk to a Broker, Newsletter, Payment, Compliance, Team | ✅ 200 |
| Privacy Policy | ✅ 200 |
| `/sitemap.xml` | ✅ 200 (76 `<loc>` entries) |
| `/robots.txt` | ✅ 200 — allows all, sitemap `https://premiumib.com/sitemap.xml` |
| Fake 404 probe | ✅ 404 (default Next.js — no custom `not-found.tsx`) |
| Legacy redirects in `next.config.ts` | None configured |
| Dynamic careers slug | ✅ `/careers/licensed-customer-service-representative` → 200 |

### URL convention note (not a broken route)

- **Canonical served URLs:** no trailing slash (e.g. `/restaurant-insurance` → 200).
- **Internal links / sitemap / canonical tags:** often use trailing slash (e.g. `/restaurant-insurance/` → **308** redirect to non-trailing).
- **Impact:** Functional (308 is permanent redirect) but creates URL inconsistency for SEO canonical alignment. Classified **P1**, not a broken route.

---

## C. Link Integrity

### Crawl scope

- Header / mega-menu data (`nav-personal`, `nav-business`, `nav-agriculture`, `nav-resources`, `nav.ts`)
- Footer columns
- Product related-link data (`src/data/product-pages/*`)
- Seed pages: homepage, commercial hub, claims, partners, careers, contact, about, resources, privacy

### Results

| Metric | Value |
|--------|------:|
| Unique internal hrefs checked | **72** |
| Card navigation unique hrefs | **58** (276 click targets — `card-navigation-hrefs.cjs`) |
| **Broken internal links** | **0** |
| Wrong destination (nav reconciliation) | **0** |
| Stale legacy URLs found | **0** |
| Hash/anchor failures tested | Not exhaustively automated; claims `#carrier-directory` anchor present in source |
| mailto/tel | `info@premiumib.com`, `tel:+12267826000` — format consistent |
| External links | Facebook/Instagram/RIBO PDF — not HTTP-probed; `rel="noopener noreferrer"` on social |

**Zero-discovery:** 0 routes (Cannabis Retail + Producer discoverable from mega-menu, mobile, homepage, hub, related).

---

## D. Forms / Lead Flow

| Path | Loads | Validation | Submit | Backend | Classification |
|------|-------|------------|--------|---------|----------------|
| **`/get-a-quote`** | ✅ | ✅ client + server schema | API `POST /api/quote-submit` | Requires `DATABASE_URL`; email via `RESEND_API_KEY` | **PARTIAL** — UI complete; local API returns **503** without DB |
| **`/contact`** | ✅ | ✅ HTML5 required fields | Client-only fake success | **Not connected** — explicit demo copy | **BROKEN** |
| **`/talk-to-a-broker`** | ✅ | N/A | Placeholder page | None | **NOT CONFIGURED** |
| **`/newsletter`** | ✅ | ✅ | Shows "not configured" honestly | No provider wired | **NOT CONFIGURED** |
| **`/careers/*` apply** | ✅ | ✅ + resume required | API `POST /api/job-apply` | Requires `DATABASE_URL` + `BLOB_READ_WRITE_TOKEN` + `RESEND_API_KEY` | **PARTIAL** — local API **503** without env |
| **`/careers/general-application`** | ✅ | Same as above | Same API | Same | **PARTIAL** |

### Detail

**Get a Quote (`ContactForm.tsx` not used here — uses `QuoteFlowClient`)**

- Multi-step flow with honeypot, rate limiting, validation (`scripts/quote-flow-smoke.ts` logic passes).
- Local smoke: `POST /api/quote-submit` → `503` with message *"Quote submissions are temporarily unavailable. Please call 226-782-6000."*
- Production configuration: **CANNOT VERIFY** from local repo.

**Contact (`src/components/ContactForm.tsx`)**

- On submit, shows success UI but states: *"This demo form isn't connected to a mailbox yet."*
- **No API route.** Misleading success state for a primary contact path → **launch blocker**.

**Careers (`JobApplicationForm.tsx`)**

- Resume upload field present; posts multipart to `/api/job-apply`.
- Local: **400** without resume file (expected validation); **503** when env missing.
- Vercel Blob integration coded but **CANNOT VERIFY** in production from local audit.

**Spam protection:** Honeypot on quote, job apply, newsletter. Rate limiting on quote + job APIs.

**Accessibility (forms):** Labels present on contact, careers, newsletter, quote steps use visible labels/buttons.

---

## E. Careers

| Check | Status |
|-------|--------|
| `/careers` loads | ✅ |
| Job listing renders | ✅ (1 open role: Licensed CSR) |
| Job detail `/careers/licensed-customer-service-representative` | ✅ |
| General application page | ✅ |
| Application CTA + form | ✅ |
| Resume upload UI | ✅ |
| Success state UI | ✅ (when API succeeds) |
| Mobile (nav responsive script) | ✅ |
| Vercel Blob + DB backend | **CANNOT VERIFY** locally — returns 503 without env |

**CAREERS STATUS:** **READY WITH MINOR FIXES** — UI complete; production backend must be confirmed before launch.

---

## F. Claims

| Check | Status |
|-------|--------|
| **CLAIMS UI** | ✅ Page loads; scenario cards, FAQ accordion, carrier directory render |
| Carrier cards | ✅ Verified entries show phones/emails/URLs; unverified show fallback message |
| Phone formatting | ✅ `tel:` hrefs generated via `phone()` helper |
| Mobile overflow | Not separately probed; no issues in spot check |
| 500 errors | None |
| **CLAIMS DATA** | 25 `verified: true` direct/MGA entries in `carrierClaims.ts`; additional unverified partner rows merged at runtime |
| **OFFICIAL-SOURCE REVERIFY** | **REQUIRED — NOT COMPLETE** |

> **Important:** The remaining pre-launch carrier task is official-source re-verification of the **25 claims contacts**. Current data renders correctly but must **not** be treated as launch-safe without owner sign-off.

**CLAIMS STATUS:** **NOT READY** for launch-safe claims data (UI ready; data verification pending).

---

## G. Partners / Carriers

| Check | Status |
|-------|--------|
| Homepage carrier rail | ✅ Present (marquee/rail component) |
| `/partners` directory | ✅ 200 |
| Logos + text fallbacks | ✅ `next/image` with alt/fallback patterns |
| Duplicate entities | Controlled — verified IDs dedupe unverified partner rows |
| Mobile | ✅ Nav responsive pass |
| Autoplay/marquee | Present on homepage; **reduced-motion** handling exists in CSS/JS patterns (not exhaustively re-tested) |
| Broken assets | None detected in runtime probe |

**PARTNERS STATUS:** **READY**

---

## H. Homepage

Sections audited via `site-integration-homepage-responsive.cjs` + spot check:

| Section | Status |
|---------|--------|
| Hero | ✅ |
| Car journey | ✅ |
| Carrier marquee | ✅ |
| Personal rail | ✅ |
| Commercial discovery | ✅ |
| Awards | ✅ |
| Local proof | ✅ |
| Final CTA | ✅ |
| Horizontal overflow (390/768/1024/1440) | ✅ **pass all** |
| Console errors | ✅ None on isolated probe |

**HOMEPAGE STATUS:** **READY**

**SEO note:** Homepage inherits root layout metadata (`PremiumIB | Windsor-Essex Insurance Brokers`) — no page-level override. See Section K.

---

## I. Coverage Explorer

| Metric | Expected | Actual |
|--------|----------|--------|
| Routes with Explorer | 59 | ✅ 59 (auto + 58 commercial/personal interactive routes) |
| Viewport checks | 236 | ✅ **236 / 236 pass** |
| Requery-click strategy | Required | ✅ Used in `site-integration-explorer-regression.cjs` |
| Image containment / no crop | Required | ✅ All checks pass |
| Restaurant magnifier | Special case | ✅ Included in regression suite |
| Contractors static behavior | Special case | ✅ Included |
| Cannabis Retail / Producer | Required | ✅ Explorer present; `verify-cannabis-products.cjs` pass |

**EXPLORER STATUS:** **READY**

---

## J. Responsive Audit

### Automated runs

| Script / scope | 390 | 768 | 1024 | 1440 |
|----------------|-----|-----|------|------|
| Homepage (`site-integration-homepage-responsive.cjs`) | ✅ | ✅ | ✅ | ✅ |
| Navigation shell (`verify-navigation-responsive.cjs`) | ✅ | ✅ | ✅ | ✅ |
| Cannabis products (`verify-cannabis-products.cjs`) | ✅ | ✅ | ✅ | ✅ |

### Key routes — spot / partial

Full 12-route × 4-viewport matrix attempted via `final-prelaunch-audit.cjs`; run interrupted by Puppeteer timeout after SEO pass. Based on homepage, nav, cannabis, explorer regression (all viewports), and zero overflow flags on cannabis verification:

| Route | Assessment |
|-------|------------|
| Homepage | ✅ |
| Commercial hub | ✅ (nav + hub loads) |
| Personal product (home-insurance) | ✅ (route 200; explorer pass) |
| Commercial product (restaurant) | ✅ |
| Restaurant / Contractors / Cannabis ×2 | ✅ |
| Claims / Partners / Careers / About / Contact | ✅ (200; nav responsive pass) |

**RESPONSIVE STATUS:** **READY WITH MINOR FIXES** — no overflow failures detected in completed automated runs; full matrix not fully re-run in this session.

---

## K. SEO Audit

### Runtime samples

| Route | Title | Meta description | Canonical | H1 |
|-------|-------|------------------|-----------|-----|
| `/` | PremiumIB \| Windsor-Essex Insurance Brokers | Generic root description | None | ✅ |
| `/restaurant-insurance` | Restaurant Insurance in Windsor-Essex \| Premium Insurance Brokers | ✅ Unique | `/restaurant-insurance/` | ✅ |
| `/about` | About Us \| Premium Insurance Brokers | ✅ | Not in page export | ✅ |

### Findings (issues only)

| Issue | Severity | Notes |
|-------|----------|-------|
| Homepage uses generic root title/description | P1 | No page-level metadata export in `src/app/page.tsx` |
| Brand inconsistency **PremiumIB** vs **Premium Insurance Brokers** | P1 | `/get-a-quote`, `/partners`, `/talk-to-a-broker` use "PremiumIB" in title |
| Trailing-slash canonical vs non-trailing served URL | P1 | e.g. canonical `href="/restaurant-insurance/"` but 200 at `/restaurant-insurance` |
| Duplicate title | P2 | "Careers \| Premium Insurance Brokers" ×2 (index + general-application) |
| Explicit canonical in source | P2 | Only ~13 pages export `alternates.canonical`; most product pages rely on defaults |
| Sitemap | ✅ | 76 URLs; includes open job slug |
| robots | ✅ | Allow all; sitemap declared |
| noindex mistakes | None found |
| Open Graph | P2 | No explicit OG tags beyond Next defaults on sampled pages |
| Geographic treatment | ✅ Consistent | **Windsor-Essex** primary; **Windsor** in address schema; **Ontario** in job/compliance context — not contradictory |

**SEO STATUS:** **READY WITH MINOR FIXES**

---

## L. Structured Data

| Schema | Where | Valid | Notes |
|--------|-------|-------|-------|
| `InsuranceAgency` | About page, `insuranceAgencyProvider()` | ✅ | Name, phone, address, URL |
| `Service` | Pilot product pages via `buildPilotProductConfig` | ✅ | areaServed: Windsor-Essex |
| `FAQPage` | Auto + select pages | ✅ | Where FAQ blocks present |
| `JobPosting` | `/careers/[slug]` | ✅ | Dynamic from job data |

**Provider details (consistent):**

- Name: Premium Insurance Brokers  
- Phone: +1-226-782-6000  
- Address: 3063 Dougall Ave, Windsor, ON N9E 1S7  
- URL: https://premiumib.com/

**Gaps:**

- Schema does not explicitly state "A Division of Oracle RMS" (present in visible copy/footer).
- BreadcrumbList schema not used.

**STRUCTURED DATA STATUS:** **READY WITH MINOR FIXES**

---

## M. Accessibility Basics

| Check | Finding | Severity |
|-------|---------|----------|
| Keyboard navigation | Header nav, explorer tabs support click; not full-tab-order audited | — |
| Visible focus | `focus-visible:outline` patterns on buttons/links | ✅ |
| Skip link | **Not present** | MEDIUM (P2) |
| Alt text | Logo alt present; decorative carrier logos use `alt=""` | ✅ |
| Buttons vs links | CTAs use appropriate elements | ✅ |
| Form labels | Contact, careers, newsletter labeled | ✅ |
| Accordion semantics | FAQ uses accordion component | ✅ |
| Mobile nav | Menu button + panel | ✅ |
| Contrast | Not formally measured | NOT VERIFIED |
| Reduced motion | CSS/animation patterns exist; not certified | Partial |
| Heading hierarchy | H1 present on sampled pages | ✅ |

**ACCESSIBILITY STATUS:** **READY WITH MINOR FIXES** — practical launch pass; not WCAG certification.

---

## N. Performance

| Check | Finding | Severity |
|-------|---------|----------|
| Homepage hero | ~436 KB webp | Acceptable |
| Cannabis hero files | **1.7–2.2 MB** PNG bytes named `.webp` | P2 (oversized + mislabeled) |
| Lazy loading | `next/image` used broadly | ✅ |
| Font loading | Archivo with `display: swap` | ✅ |
| Third-party scripts | Analytics shim only — no GA/GTM loaded in source | ✅ Light |
| Heavy JS | Next.js app — no bundle anomaly audit run | NOT VERIFIED |
| CLS / LCP | Not lab-tested (no Lighthouse run) | NOT VERIFIED |

**PERFORMANCE STATUS:** **READY WITH MINOR FIXES**

---

## O. Images / Assets

| Check | Finding | Classification |
|-------|---------|----------------|
| Missing/broken images | None on probed pages | — |
| Cannabis hero `.webp` with **PNG bytes** | `public/images/CANNABIS/cannabis-retail-insurance.webp`, `cannabis-producer-insurance.webp` | **POST-LAUNCH CLEANUP** (renders correctly; 1.7–2.2 MB) |
| Other extension mismatches | Only Cannabis heroes found via `file` magic scan | — |
| Placeholder/TODO visuals | None blocking on probed routes | — |
| Cannabis explorer masters | `.png` files — correct extension | ✅ |

**IMAGE STATUS:** **READY WITH MINOR FIXES**

---

## P. Visual Polish Backlog

| Item | Prior status | Classification |
|------|--------------|----------------|
| Grocery Explorer image | ACCEPTABLE (borderline) | **POST-LAUNCH** |
| Real Estate Explorer image | ACCEPTABLE | **POST-LAUNCH** |
| About/photography | Hero wired; no blocking TODO | **KEEP** |
| Cannabis hero PNG-as-webp | Known | **POST-LAUNCH CLEANUP** |

No redesign recommendations. Do not change approved sections in this phase.

---

## Q. Runtime / Console

**Isolated Puppeteer probe (11 key routes):** 0 console errors, 0 failed asset requests on successful navigation.

| Route | HTTP | Console errors |
|-------|------|----------------|
| `/`, commercial hub, restaurant, contractors, cannabis-retail, claims, partners, careers, contact, get-a-quote, about | 200 | None |

**Note:** A concurrent long-running Explorer regression caused frame-detachment noise in one batch run; isolated re-probe was clean.

**RUNTIME STATUS:** **READY**

---

## R. Security / Environment

| Check | Result |
|-------|--------|
| Committed `.env` files | ✅ None found |
| Hardcoded secrets in `src/` | ✅ None — env vars referenced by name only |
| `DATABASE_URL`, `RESEND_API_KEY`, `BLOB_READ_WRITE_TOKEN` | Server-side only |
| localhost references in `src/` | ✅ None |
| Debug endpoints | ✅ None exposed |
| Client-side env leaks | ✅ None observed |

**SECURITY/ENV STATUS:** **READY** — production env configuration is an **owner/deployment** responsibility.

---

## S. Deployment Safeguards

| Check | Result |
|-------|--------|
| `.github/workflows` | **Not present in repo** |
| `vercel.json` | **Not present in repo** |
| Main auto-deploys to production | **CANNOT VERIFY** (account-level) |
| Preview promotion bypassing PR approval | **CANNOT VERIFY** |
| Production alias protection | **CANNOT VERIFY** |
| GitHub Production environment protections | **CANNOT VERIFY** |
| Known incident: PR #23 asset-only merge → production deploy | **CONFIRMED RISK** — asset changes can trigger production if main auto-deploys |

### Pre-launch safeguard checklist (owner action)

1. ☐ Confirm Vercel **Production** deploys only from approved release process (not every `main` push unless intended).
2. ☐ Enable **deployment protection** on Production environment.
3. ☐ Restrict who can **promote Preview → Production**.
4. ☐ Protect production **domain aliases**.
5. ☐ Add GitHub Environment protection rules for Production (required reviewers).
6. ☐ Document rollback procedure for accidental asset-only deploys.
7. ☐ Verify production env vars: `DATABASE_URL`, `RESEND_API_KEY`, `BLOB_READ_WRITE_TOKEN`, `CAREERS_NOTIFY_TO`.

**DEPLOYMENT SAFETY STATUS:** **NOT READY** — account-level safeguards unverified; known auto-deploy risk.

---

## T. Legal / Footer

| Item | Status |
|------|--------|
| Privacy Policy (`/privacy-policy`) | ✅ Present — source note: *recommend legal review* |
| Terms of Use | ❌ **Not found** |
| Brokerage/licensing disclosure | ✅ RIBO references, compliance page, footer Oracle RMS division |
| Copyright | ✅ Footer |
| Contact details in footer | ✅ Address + phone |

**LEGAL/FOOTER STATUS:** **READY WITH MINOR FIXES** — Terms + legal review pending owner/legal.

---

## U. Contact Data Consistency

| Field | Header | Footer | Contact | Schema | Claims |
|-------|--------|--------|---------|--------|--------|
| Premium Insurance Brokers | ✅ | ✅ | ✅ | ✅ | ✅ |
| A Division of Oracle RMS | — | ✅ | ✅ | — (visible copy) | — |
| 226-782-6000 | ✅ | ✅ | ✅ | ✅ (+1-226-782-6000) | ✅ |
| 3063 Dougall Ave, Windsor, ON N9E 1S7 | — | ✅ | ✅ | ✅ | — |
| info@premiumib.com | — | — | ✅ | — | ✅ (fallback) |

**CONTACT CONSISTENCY:** **READY** — minor schema omission of division name only.

---

## V. Browser / Interaction QA

| Environment | Status |
|-------------|--------|
| Chromium desktop (Puppeteer) | ✅ Tested |
| Mobile emulation (390px) | ✅ Tested |
| Safari | **NOT VERIFIED** |
| Firefox | **NOT VERIFIED** |
| Touch / swipe (homepage car journey) | Not re-tested in this session — prior QA scripts exist |

**BROWSER QA STATUS:** **READY WITH MINOR FIXES** — Chromium-only evidence.

---

## W. Launch-Blocker Matrix

### P0 — MUST FIX BEFORE LAUNCH

| # | ISSUE | ROUTE/FILE | SEVERITY | WHY | USER IMPACT | RECOMMENDED FIX | RISK OF FIX | OWNER DECISION |
|---|-------|------------|----------|-----|-------------|-----------------|-------------|----------------|
| 1 | Contact form shows fake success; no backend | `/contact`, `ContactForm.tsx` | P0 | Demo form explicitly not connected; violates primary contact path integrity | Users believe message was sent; leads lost | Wire to email/CRM API or remove success state until connected | Low–Med | **YES** — choose backend |
| 2 | Quote submit production backend unverified | `/api/quote-submit`, env | P0 | Local returns 503 without `DATABASE_URL` | Primary quote CTA may fail silently in prod if env missing | Verify Vercel Postgres + env on Production; smoke test | Low | **YES** |
| 3 | Careers apply production backend unverified | `/api/job-apply`, env | P0 | Requires DB + Blob + email | Job applications lost if env missing | Verify all env vars + end-to-end test with test file | Low | **YES** |

### P1 — SHOULD FIX BEFORE LAUNCH

| # | ISSUE | ROUTE/FILE | WHY | RECOMMENDED FIX | OWNER DECISION |
|---|-------|------------|-----|-----------------|----------------|
| 4 | Claims contacts not officially re-verified | `carrierClaims.ts` | 25 verified entries render but owner task incomplete | Complete official-source re-verification checklist | **YES** |
| 5 | Talk to a Broker is placeholder | `/talk-to-a-broker` | "Full contact form coming soon" | Wire form or redirect to contact/phone | **YES** |
| 6 | Homepage generic SEO metadata | `src/app/page.tsx`, `layout.tsx` | Inherits generic PremiumIB title | Add page-level metadata with brand + Windsor-Essex | NO |
| 7 | URL/canonical trailing-slash mismatch | Site-wide links, canonical tags | 308 redirects; split URL signals | Align canonical + internal links to served format | NO |
| 8 | Brand title inconsistency PremiumIB | get-a-quote, partners, talk-to-a-broker | Mixed branding in SERP | Standardize to "Premium Insurance Brokers" | NO |
| 9 | No Terms of Use page | — | Legal gap | Legal draft + publish if intended | **YES** |
| 10 | Deployment safeguards unverified | Vercel/GitHub | PR #23 prod deploy incident | Implement checklist Section S | **YES** |
| 11 | No custom 404 page | `not-found.tsx` missing | Default Next 404 off-brand | Add branded not-found | NO |

### P2 — SAFE POST-LAUNCH

| # | ISSUE | NOTES |
|---|-------|-------|
| 12 | Newsletter not configured | Honest UX; not primary lead path |
| 13 | Cannabis hero PNG-as-webp (1.7–2.2 MB) | Renders; convert to true webp |
| 14 | No skip-to-content link | A11y improvement |
| 15 | Privacy policy legal review | Flagged in source comment |
| 16 | Duplicate Careers title | Minor SEO |
| 17 | Safari/Firefox cross-browser QA | Schedule manual pass |
| 18 | Schema missing Oracle RMS division | Optional enrichment |

### P3 — OPTIONAL POLISH

| # | ISSUE | NOTES |
|---|-------|-------|
| 19 | Grocery Explorer image borderline | Previously ACCEPTABLE |
| 20 | Real Estate Explorer image | Previously ACCEPTABLE |
| 21 | Open Graph tags | Enhancement |
| 22 | BreadcrumbList schema | Enhancement |

**Counts:** P0 **3** · P1 **8** · P2 **7** · P3 **4**

---

## X. Readiness Scorecard

| Area | Score |
|------|-------|
| CONTENT | **READY** (A44/B16/C0/D0) |
| NAVIGATION | **READY** (60/60, zero-discovery 0) |
| FORMS | **NOT READY** (contact broken; backends unverified) |
| SEO | **READY WITH MINOR FIXES** |
| RESPONSIVE | **READY WITH MINOR FIXES** |
| ACCESSIBILITY | **READY WITH MINOR FIXES** |
| PERFORMANCE | **READY WITH MINOR FIXES** |
| IMAGES | **READY WITH MINOR FIXES** |
| CLAIMS | **NOT READY** (data re-verify pending) |
| CAREERS | **READY WITH MINOR FIXES** (backend unverified) |
| RUNTIME | **READY** |
| DEPLOYMENT SAFETY | **NOT READY** (safeguards unverified) |
| LEGAL/FOOTER | **READY WITH MINOR FIXES** |

### OVERALL LAUNCH READINESS

# **READY AFTER FIXES**

The site is structurally complete: routes, navigation, Explorer, homepage, partners, and runtime are solid. Launch is blocked by **form/backend configuration**, **contact form integrity**, **claims data sign-off**, and **deployment safeguard verification**.

---

## Y. Remediation Batches (Do Not Implement in Phase 1)

### BATCH 1 — P0 functional blockers
1. Wire `/contact` to real backend OR disable misleading success state.
2. Verify Production env: `DATABASE_URL`, `RESEND_API_KEY`, `BLOB_READ_WRITE_TOKEN`.
3. End-to-end smoke: quote submit + careers apply on Production (test payloads).

### BATCH 2 — Claims + contact verification
1. Official-source re-verification of 25 claims contacts.
2. Resolve Talk to a Broker placeholder strategy.

### BATCH 3 — SEO / metadata
1. Homepage page-level metadata.
2. Brand/title consistency (PremiumIB → Premium Insurance Brokers).
3. Canonical + trailing-slash alignment.

### BATCH 4 — Deployment safeguards
1. Vercel/GitHub Production protection rules.
2. Document deploy + rollback runbook.

### BATCH 5 — Optional polish
1. Cannabis hero true-webp conversion.
2. Custom 404, skip link, Terms of Use (legal).
3. Newsletter provider when ready.

---

## Z. Owner Decisions Required

1. **Contact form:** Which backend (Resend, CRM, email service)? Is demo form acceptable for launch? **(Recommended: NO)**
2. **Production env:** Confirm all API env vars set on Vercel Production.
3. **Claims:** Sign off on 25 verified contacts after official-source re-verification — or defer claims directory to post-launch?
4. **Talk to a Broker:** Redirect to contact/phone or build real form?
5. **Terms of Use:** Required for launch?
6. **Deployment:** Is main → Production auto-deploy intentional? Enable protections?
7. **Newsletter:** Launch without, or block page until configured?

---

## Safety Confirmation

| Check | Value |
|-------|-------|
| PRODUCTION FILES CHANGED | **NO** |
| PRODUCT COPY CHANGED | **NO** |
| NAVIGATION CHANGED | **NO** |
| ROUTES CHANGED | **NO** |
| IMAGES CHANGED | **NO** |
| FROZEN 60 CHANGED | **NO** |

**DO NOT MERGE · DO NOT DEPLOY · DO NOT PROMOTE PREVIEW · STOP FOR OWNER REVIEW**
