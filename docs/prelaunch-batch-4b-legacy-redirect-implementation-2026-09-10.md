# Pre-Launch Batch 4B — Approved Legacy Redirect Implementation

**Date:** 2026-09-10  
**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Base:** `c8958b9`  
**Scope:** Implement owner-approved Batch 4 redirects + confirmed-junk 410s only.  
**Live WordPress / DNS / deploy:** **NOT modified.**

**Map:** `docs/internal/legacy-wordpress-redirect-map-2026-09-10.csv` (updated with `owner_status` / `implementation_status`)  
**Rules source:** `src/data/legacy-wordpress-cutover.ts`  
**Runtime:** `src/middleware.ts` (+ `skipTrailingSlashRedirect` in `next.config.ts`)

---

## A. Owner-approved mappings

| Old path | New path | Confidence | Status |
|----------|----------|------------|--------|
| `/about-us/` | `/about/` | HIGH | **IMPLEMENTED** |
| `/contact-02/` | `/contact/` | HIGH | **IMPLEMENTED** |
| `/contractor-construction-insurance/` | `/contractors-insurance/` | HIGH | **IMPLEMENTED** |
| `/landscaping-insurance/` | `/landscaping-snow-removal-insurance/` | HIGH | **IMPLEMENTED** |
| `/snow-removal-insurance/` | `/landscaping-snow-removal-insurance/` | HIGH | **IMPLEMENTED** |
| `/manufacturer-insurance/` | `/manufacturing-insurance/` | HIGH | **IMPLEMENTED** |
| `/rented-dwelling-insurance/` | `/landlord-insurance/` | HIGH | **IMPLEMENTED** |
| `/request-quote/` | `/get-a-quote/` | HIGH | **IMPLEMENTED** |
| `/watercraft-insurance/` | `/boat-insurance/` | HIGH | **IMPLEMENTED** |

**9 / 9 HIGH-confidence redirects implemented.**

---

## B. Implemented permanent redirects

HTTP **308** (Next.js permanent redirect). Query strings preserved.

Also implemented (conditional owner approval — see §C):

| Old | New |
|-----|-----|
| `/insurance/` | `/` |

Both `/path` and `/path/` variants one-hop to the trailing-slash destination.

**Preserved unchanged:** `/talk-to-a-broker/` → `/contact/?intent=broker` (page-level `permanentRedirect`).

---

## C. `/insurance/` evidence and decision

**OLD URL:** `https://premiumib.com/insurance/`  
**TITLE:** Insurance | Premium Insurance Brokers  
**META:** Concatenation of Auto / Home / Motorcycle / Tenant / Commercial / Bonding / Rented Dwelling / Snow / Farm / Manufacturer / Small Business / Landscaping / Watercraft listings  
**VISIBLE CONTENT:** Broad brokerage directory hub listing personal + commercial lines; footer/about boilerplate only — **not** a distinct single product page  
**DECISION:** Matches owner conditional approval (“broad/general brokerage insurance landing page”)  
**RESULT:** **IMPLEMENTED** `308` → `/`

---

## D. `/pool-and-spa/` full evidence block (NO runtime change)

**OLD URL:** `https://premiumib.com/pool-and-spa/`  
**OLD TITLE:** Pool And Spa | Premium Insurance Brokers  
**OLD H1:** *(none extracted — theme page uses non-h1 hero text)*  
**META DESCRIPTION:** Begins “Where Premium and Quality Meet Auto Insurance…” then DCPD / Accident Benefits copy  
**SUMMARY OF VISIBLE CONTENT:** Title says Pool & Spa, but body is **Ontario auto insurance** coverage list (Third-Party Liability, DCPD, Accident Benefits, Uninsured Automobile, Collision). No meaningful pool/spa underwriting content found.  
**PERSONAL OR COMMERCIAL:** Title implies commercial/specialty; body is **personal auto**  
**WHAT BUSINESS / RISK IT APPEARS TO COVER:** **Mismatched** — labeled pool/spa, content is auto  
**INDEXABLE:** Yes (sitemap + max-image-preview robots)  
**IN SITEMAP:** Yes (`page-sitemap.xml`)  
**CURRENT INTERNAL LINKS:** Present in WP nav/sitemap set; homepage link harvest intermittent under Cloudflare 429 during re-check  
**PROPOSED BEST NEW DESTINATION:** None safe — do **not** map to `/auto-insurance/` solely because body text is auto (wrong label); do **not** invent a pool/spa product  
**ALTERNATIVE DESTINATION:** `/commercial-insurance/` only if owner confirms intent was commercial specialty (weak)  
**OR 410:** Reasonable if owner confirms page is broken theme placeholder  
**CONFIDENCE:** LOW  
**RECOMMENDATION:** **OWNER REVIEW** — treat as broken/misbuilt page; choose new product page, 410, or migrate real pool/spa content later  

**Runtime this batch:** **UNCHANGED**

---

## E. `/blog/` evidence and result

**Evidence:** Title “Blog | Premium Insurance Brokers”; body “Nothing Found / It seems we can’t find what you’re looking for”; post sitemap contains **0 article URLs** (only `/blog/`).  
**Meaningful unique content:** **No**  
**RESULT:** **410 IMPLEMENTED** (not homepage 301; no fake blog page)

---

## F. Service / theme junk review

| Metric | Count |
|-------:|
| **SERVICE URLS REVIEWED** | **17** |
| **CONFIRMED JUNK** | **17** |
| **LEGITIMATE / REVIEW** | **0** |
| **410 IMPLEMENTED** | **17** |

**Evidence:** Every sampled `/service/*` page uses the **same mismatched placeholder body** (“Life Insurance provides financial protection to homeowners…”), including product-like slugs previously flagged REVIEW (`car`, `cyber`, `farm`, `home`, `life`, `marine`, `travels`).  

**Rule applied:** 410 only — **no** keyword-similarity 301s into rebuild product pages.

---

## G. Other 410 candidate review

Original Batch 4 non-service 410 candidates reviewed individually.

| Classification | Examples | Action |
|----------------|----------|--------|
| **CONFIRMED TECHNICAL/JUNK** | `/noxiy_builder/*`, `/2-columns/`, `/3-columns/`, `/blog-grid/`, `/services-02/`, `/testimonials/` (Latin “Proin pretium” / fake “Sara Albert Web Designer”), `/book-a-appointment/` (raw `[booked-calendar]` shortcode), portfolio demo, sidebars, etc. | **410 IMPLEMENTED** |
| **AMBIGUOUS** | `/faqs/` — generic but real FAQ Q&A present | **LEFT UNTOUCHED** → owner review |
| **NOT IN THIS SET** | `/pool-and-spa/` | evidence only (§D) |

| Metric | Count |
|-------:|
| Other 410 candidates reviewed | **30** |
| Confirmed junk implemented | **29** |
| Ambiguous left untouched | **1** (`/faqs/`) |

**TOTAL 410 IMPLEMENTED:** **47** (= 17 service + 29 other + 1 blog)

---

## H. Disclosure PDF status

| Field | Value |
|-------|--------|
| **CURRENT OLD URL** | `https://premiumib.com/wp-content/uploads/2025/05/disclosure.pdf` |
| **CURRENT FILE ACCESSIBLE** | Yes (HTTP 200) |
| **CURRENT DOCUMENT TITLE** | “Premium Insurance Brokers Customer Disclosure Form” (PDF metadata Title is useless: `Microsoft Word - Document6`) |
| **CURRENT DOCUMENT DATE / VERSION** | PDF Creation/ModDate **2025-05-08** (`D:20250508113903-04'00'`) |
| **CURRENT FILE SIZE** | **115,563 bytes** (~113 KB), 1 page |
| **CURRENCY** | **CURRENT** (May 2025 contingent commission / incentives / financing disclosure). Note: PDF lists phone `226 780 6000` while site uses `226-782-6000` — flag for owner copy edit, not a reason to withhold hosting. |

**Migration performed in rebuild (not live WP):**

- Copied byte-identical PDF → `public/wp-content/uploads/2025/05/disclosure.pdf`  
- Updated `src/data/compliance.ts` Disclosure Form href to **same public path** `/wp-content/uploads/2025/05/disclosure.pdf`  
- Verified local `200` on rebuild server  

**DISCLOSURE MIGRATION:** **READY** (same path after cutover)

---

## I. Redirect implementation architecture

**Single runtime cutover mechanism:** `src/middleware.ts` reading `src/data/legacy-wordpress-cutover.ts`.

| Concern | Mechanism |
|---------|-----------|
| Permanent legacy redirects | Middleware **308** |
| Confirmed junk removals | Middleware **410** |
| Trailing-slash policy | `trailingSlash: true` + `skipTrailingSlashRedirect: true` so middleware can one-hop legacy URLs **and** still enforce `/path` → `/path/` for normal routes |
| Talk-to-a-broker | Existing page `permanentRedirect` **unchanged** |

**Why `skipTrailingSlashRedirect`:** Without it, Next’s built-in no-slash→slash hop ran *before* legacy rules (`/about-us` → `/about-us/` → `/about/` = chain).  

**Why `new URL(path, request.url)`:** Mutating `NextURL.pathname` stripped trailing slashes and caused redirect loops under `skipTrailingSlashRedirect`.

---

## J. Redirect validation

Validator: `scripts/validate-legacy-cutover.cjs`  
Artifact: `docs/qa-screenshots/prelaunch-batch-4b-2026-09-10/legacy-cutover-validation.json`

| Check | Result |
|------:|
| Configured permanent redirects | **10** |
| Variant checks (`/` and no-slash) | **20 / 20 PASS** |
| Final destination 200 | **20 / 20** |
| Hops | **1** |
| Talk-to-a-broker preserved | **308** → `/contact/?intent=broker` |

Example:

| OLD PATH | STATUS | LOCATION | FINAL STATUS | HOPS |
|----------|-------:|----------|-------------:|-----:|
| `/about-us/` | 308 | `/about/` | 200 | 1 |
| `/about-us` | 308 | `/about/` | 200 | 1 |
| `/insurance/` | 308 | `/` | 200 | 1 |
| `/watercraft-insurance/` | 308 | `/boat-insurance/` | 200 | 1 |

---

## K. 410 validation

| Check | Result |
|------:|
| Configured gone paths | **47** |
| Trailing-slash form returns **410** | **47 / 47** |
| No `Location` header | **PASS** |
| `X-Robots-Tag: noindex, nofollow` | **PASS** |
| `/pool-and-spa/`, `/faqs/` untouched | **PASS** (not 410 / not redirect) |

---

## L. Loop / chain tests

| Check | Result |
|------:|
| Redirect loops | **0** |
| Redirect chains (legacy 308→308) | **0** |
| Destination 404s | **0** |
| Normal `/auto-insurance` → `/auto-insurance/` → 200 | **PASS** (one slash hop) |

---

## M. Updated mapping status

CSV columns added/confirmed:

- `owner_status`: `APPROVED` | `PENDING OWNER REVIEW`
- `implementation_status`: `IMPLEMENTED` | `KEEP SAME (no redirect needed)` | `PENDING OWNER REVIEW`
- `batch_4b_notes`

Original Batch 4 evidence columns retained.

---

## N. Regression

| Check | Result |
|-------|--------|
| `npx tsc --noEmit` | **PASS** |
| `npm run build` | **PASS** (middleware present) |
| SEO verifier | **PASS** · 60 product routes |
| Navigation verifier | **PASS** · 0 errors |
| Homepage completeness | **10/10 · 54/54** |
| Content audit | **A44 / B16 / C0 / D0** |
| Partners | **44/44** |
| Claims verified | **25/25** |
| Cannabis verifier | **PASS** (with `BASE_URL=http://localhost:3000`) |
| Explorer UX v2 smoke | **PASS** |
| Explorer full 236 suite | **236 / 236 PASS** (`fail: 0`) — log `docs/qa-screenshots/prelaunch-batch-4b-2026-09-10/explorer-regression.log` |
| Legacy cutover validator | **PASS** |
| Frozen 60 product routes | **UNCHANGED YES** |

---

## O. Unresolved owner decisions

1. **`/pool-and-spa/`** — broken label vs auto body; choose migrate / 410 / other (see §D).  
2. **`/faqs/`** — ambiguous FAQ content; 410 vs keep/migrate.  
3. **Disclosure PDF phone typo** — `226 780 6000` vs live `226-782-6000` (optional copy refresh; hosting already ready).  

---

## Safety confirmation

- No WordPress login / wp-admin / forms  
- No DNS / Vercel production / deploy / merge to main  
- Stop for owner review before deployment-safeguard batch  

**READY TO FREEZE LEGACY REDIRECTS:** **YES** (for implemented set)  
**READY FOR DEPLOYMENT-SAFEGUARD BATCH:** **YES** (after owner notes pool/faqs if desired)
