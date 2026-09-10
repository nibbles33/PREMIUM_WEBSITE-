# Pre-Launch Batch 4 — Legacy WordPress URL Inventory + Redirect Map

**Date:** 2026-09-10  
**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Base:** `6a6327c`  
**Live site audited:** `https://premiumib.com` (WordPress + All in One SEO)  
**Rebuild target:** Next.js rebuild (not live)  
**Scope:** **READ-ONLY inventory + mapping. NO redirects implemented.**

**Machine-readable map:** `docs/internal/legacy-wordpress-redirect-map-2026-09-10.csv`

---

## A. Methodology

1. Read-only HTTP(S) fetches with a descriptive User-Agent; no login, forms, or wp-admin.
2. Discovered sitemaps via `robots.txt` → `https://premiumib.com/sitemap.xml` (AIOSEO index).
3. Downloaded child sitemaps: `page`, `post`, `portfolio`, `service`, `noxiy_builder`.
4. Slow per-URL fetch for status / title / H1 / meta / canonical / robots (with retries after Cloudflare rate limits).
5. Supplemental homepage link extraction + public web search (`site:premiumib.com`).
6. Mapped to current rebuild routes from `src/app` + `sitemap.ts` (trailing-slash policy).
7. Validated proposed 301 destinations exist in rebuild; checked for loops/chains/conflicts.

**Not used:** Search Console API, authenticated WP, backlink databases.

---

## B. Sitemap discovery

| URL | Result |
|-----|--------|
| `/robots.txt` | **FOUND** — Disallow `/wp-admin/`; Sitemap: `sitemap.xml`, `sitemap.rss` |
| `/sitemap.xml` | **FOUND** — AIOSEO sitemap **index** (200) |
| `/wp-sitemap.xml` | Redirect/unavailable (302) |
| `/sitemap_index.xml` | Redirect/unavailable (302) |
| `/sitemap.rss` | Intermittent 429 during crawl |

**Child sitemaps in index:**

| Child | Approx URLs | Notes |
|-------|------------:|-------|
| `post-sitemap.xml` | 1 | Only `/blog/` |
| `page-sitemap.xml` | 36 | Real + theme demo pages |
| `portfolio-sitemap.xml` | 1 | Theme demo |
| `service-sitemap.xml` | 17 | Theme `/service/*` templates |
| `noxiy_builder-sitemap.xml` | 17 | Theme builder fragments |

---

## C. Legacy URL inventory (summary)

| Metric | Count |
|-------:|
| Unique sitemap URLs discovered | **71** |
| Extra crawl URLs (`/blog/`, `/services-01/`, `/request-quote/` already partly covered) | included in **73** probed |
| Technical / theme excluded | **46** |
| Meaningful business URLs | **26** |
| Meaningful + treated indexable | **26** |

### Meaningful legacy business URLs (high level)

Home, Team, Partners, Payment, Compliance, Privacy, Contact (`contact-02`), About (`about-us`), Quote (`request-quote`), Personal hub (`insurance`), Auto, Home, Tenant, Motorcycle, Watercraft, Commercial, Small Business, Farm, Bonding, Contractor/Construction, Manufacturer, Landscaping, Snow Removal, Rented Dwelling, Pool & Spa, Blog.

---

## D. Host / slash behavior (current WordPress)

| Request | Behavior |
|---------|----------|
| `http://premiumib.com/` | **301** → `https://premiumib.com/` |
| `http://www.premiumib.com/` | **301** → `https://www…` → **301** → `https://premiumib.com/` |
| `https://www.premiumib.com/` | **301** → `https://premiumib.com/` |
| `https://premiumib.com/` | **200** (canonical host) |
| `/auto-insurance` (no slash) | **301** → `/auto-insurance/` |
| `/auto-insurance/` | **200** |

**Preferred host today:** `https://premiumib.com` (apex, HTTPS).  
**Slash:** WordPress prefers **trailing slash** — compatible with rebuild Batch 3 policy.

Cloudflare rate limiting (429) occurred under sustained crawl; retries recovered all but intermittent motorcycle fetch (path confirmed 200 later / present in sitemap+nav).

---

## E. Existing redirects (live WP)

Documented normalization only (not a full WP redirect-plugin export — **cannot verify** plugin rules without admin access):

- HTTP → HTTPS
- www → apex
- no-slash → trailing slash (sampled)

No evidence gathered of complex multi-hop content redirects beyond host/slash.

---

## F. Rebuild inventory

| Metric | Count |
|-------:|
| Indexable sitemap URLs (rebuild) | **75** (includes dynamic open career jobs) |
| Core app content routes used for mapping | **~74** path inventory from `src/app` + static sitemap list |
| Canonical policy | **TRAILING SLASH** + `metadataBase https://premiumib.com` |

Intentional rebuild redirect (already implemented):

| Old | New | Notes |
|-----|-----|-------|
| `/talk-to-a-broker/` | `/contact/?intent=broker` | Not a WP sitemap URL — **NO ISSUE** |

---

## G. Old → new mapping summary

| Action | Count |
|--------|------:|
| **KEEP** | **14** |
| **301** | **10** |
| **410** | **40** |
| **REVIEW** | **9** |
| **Technical excluded** (subset of 410/REVIEW) | **46** |

**Proposed 301 destinations verified:** **10 / 10** exist in rebuild.  
**Redirect loops:** **0**  
**Redirect chains:** **0** (all proposed as one hop to final 200 pages)  
**Conflicts with existing rebuild redirects:** **0**

---

## H. KEEP SAME (14)

Same path works on rebuild (trailing slash):

| Old path | New path |
|----------|----------|
| `/` | `/` |
| `/auto-insurance/` | `/auto-insurance/` |
| `/home-insurance/` | `/home-insurance/` |
| `/tenant-insurance/` | `/tenant-insurance/` |
| `/motorcycle-insurance/` | `/motorcycle-insurance/` |
| `/commercial-insurance/` | `/commercial-insurance/` |
| `/small-business-insurance/` | `/small-business-insurance/` |
| `/farm-insurance/` | `/farm-insurance/` |
| `/bonding-insurance/` | `/bonding-insurance/` |
| `/partners/` | `/partners/` |
| `/team/` | `/team/` |
| `/payment/` | `/payment/` |
| `/compliance/` | `/compliance/` |
| `/privacy-policy/` | `/privacy-policy/` |

No explicit redirect rule required solely for platform change.

---

## I. 301 mappings (10) — proposed only

| Old URL | New URL | Confidence | Reason |
|---------|---------|------------|--------|
| `/about-us/` | `/about/` | HIGH | About renamed |
| `/contact-02/` | `/contact/` | HIGH | Contact renamed |
| `/request-quote/` | `/get-a-quote/` | HIGH | Quote flow equivalent |
| `/contractor-construction-insurance/` | `/contractors-insurance/` | HIGH | Same product intent |
| `/watercraft-insurance/` | `/boat-insurance/` | HIGH | Watercraft → Boat |
| `/landscaping-insurance/` | `/landscaping-snow-removal-insurance/` | HIGH | Consolidated product |
| `/snow-removal-insurance/` | `/landscaping-snow-removal-insurance/` | HIGH | Consolidated product |
| `/manufacturer-insurance/` | `/manufacturing-insurance/` | HIGH | Slug rename |
| `/rented-dwelling-insurance/` | `/landlord-insurance/` | HIGH | Landlord/rental dwelling |
| `/insurance/` | `/` | MEDIUM | Legacy directory hub → homepage discovery (**owner confirm**) |

---

## J. Removal / 410 candidates (40)

Primarily:

- `/noxiy_builder/*` (17) — theme builder fragments
- Theme demos: `/2-columns/`, `/3-columns/`, `/blog-grid/`, `/faqs/`, `/testimonials/`, `/services-02/`, `/book-a-appointment/`, sidebars, portfolio demo, etc.
- Remaining `/service/*` demos without clear product match (health, medical, dental, disability, fire, term/whole/universal/final expense, liability)
- `/services-01/` — already **404** on WordPress

These should not be migrated as content. Prefer **410** or omit from sitemap after cutover (implementation later).

---

## K. Owner-review mappings (explicit)

### 1. Legacy personal/commercial directory

- **OLD PAGE:** Insurance directory hub  
- **OLD URL:** `https://premiumib.com/insurance/`  
- **PROPOSED ACTION:** 301 → `/`  
- **PROPOSED DESTINATION:** `https://premiumib.com/`  
- **ALTERNATIVE:** Soft-land on a future Personal hub if created; or keep a thin rebuild page at `/insurance/`  
- **WHY:** Hub lists many products; rebuild uses homepage category discovery instead of `/insurance/`.

### 2. Pool & Spa

- **OLD PAGE:** Pool And Spa  
- **OLD URL:** `https://premiumib.com/pool-and-spa/`  
- **PROPOSED ACTION:** REVIEW  
- **PROPOSED DESTINATION:** none in rebuild  
- **ALTERNATIVE:** New product page; redirect to closest commercial/personal product; or 410  
- **WHY:** No rebuild route; may have local search value.

### 3. Blog

- **OLD PAGE:** Blog index  
- **OLD URL:** `https://premiumib.com/blog/`  
- **PROPOSED ACTION:** REVIEW  
- **PROPOSED DESTINATION:** none (rebuild has no blog)  
- **ALTERNATIVE:** Migrate blog later; 301 → `/resources/`; or 410 if empty  
- **WHY:** Post sitemap contains only `/blog/` — no article URLs discovered.

### 4–9. Theme `/service/*` product-like slugs

| Old | Proposed if kept | Why review |
|-----|------------------|------------|
| `/service/cyber-insurance/` | `/cyber-insurance/` | Likely theme demo |
| `/service/life-insurance/` | `/life-insurance/` | Likely theme demo |
| `/service/home-insurance/` | `/home-insurance/` | Likely theme demo |
| `/service/car-insurance/` | `/auto-insurance/` | Likely theme demo |
| `/service/farm-insurance/` | `/farm-insurance/` | Likely theme demo |
| `/service/travels-insurance/` | `/travel-insurance/` | Likely theme demo |
| `/service/marine-insurance/` | `/boat-insurance/` | Likely theme demo |

**Default recommendation if owner does not want demo URLs kept:** **410** (not 301), because content is probably theme placeholder, not Premium-authored pages. Confirm before implementing.

---

## L. Blog / resources

| Item | Finding |
|------|---------|
| Blog posts in sitemap | **0 article URLs** (only `/blog/`) |
| News/guides | Not found as separate sitemap content |
| Rebuild resources | `/resources/` utility hub exists (not a 1:1 blog) |

**BLOG/RESOURCE URLs:** 1 (`/blog/`) + theme blog templates  

---

## M. Documents / PDFs

| URL | Status | Notes |
|-----|--------|-------|
| `https://premiumib.com/wp-content/uploads/2025/05/disclosure.pdf` | **200** | Linked from compliance; rebuild still references this live WP asset path today |

**Recommendation:** Before cutover, copy disclosure PDF (and any other linked PDFs) into rebuild `public/` **or** keep a stable CDN/path strategy — **owner decision**. Do not leave critical docs only on doomed WP uploads without a plan.

**DOCUMENT/PDF URLs flagged:** **1** meaningful (disclosure). Full media library not inventoried (excluded by design).

---

## N. Existing rebuild redirect conflicts

| Rebuild redirect | WP overlap | Verdict |
|------------------|------------|---------|
| `/talk-to-a-broker/` → `/contact/?intent=broker` | Not in WP sitemap | **NO ISSUE** |

**CURRENT REBUILD REDIRECT CONFLICTS: 0**

---

## O. Canonical compatibility

All proposed KEEP/301 destinations use:

`https://premiumib.com{path}/` with trailing slash.

No localhost / vercel.app destinations.

**CANONICAL COMPATIBILITY: PASS**

---

## P. Loop / chain validation

| Check | Result |
|-------|--------|
| Loops | **0** |
| Chains (A→B→C) | **0** proposed |
| Duplicate old paths | **0** |
| Conflicting destinations | **0** |
| Destination missing in rebuild | **0** for proposed 301s |

---

## Q. Search discovery

Public web search (`site:premiumib.com`) surfaced homepage, `/insurance/`, `/auto-insurance/`, `/home-insurance/`, `/compliance/` — consistent with crawl. No additional high-value article URLs discovered beyond sitemap set.

**SEARCH-DISCOVERED EXTRA URLs:** **0** material additions beyond sitemap/crawl set  
**CONFIRMED INDEXED:** **UNKNOWN** (no Search Console auth)

---

## R. Backlink limitations

**BACKLINK DATA: CANNOT VERIFY**

Priority preservation still recommended for: homepage, Auto, Home, Commercial, Contact/About variants, Compliance, Partners, primary product pages in nav/sitemap.

---

## S. Cutover SEO risk

### **MEDIUM**

**Why not LOW**
- 10 path changes require 301s
- Pool & Spa has no equivalent
- Blog strategy undefined
- Theme `/service/*` URLs may be indexed noise
- WP upload PDF dependency
- Rebuild adds many new URLs (good) but WordPress → Next is still a platform cutover

**Why not HIGH**
- Preferred host/slash already match rebuild policy
- Core product paths largely KEEP SAME
- Clear high-confidence 301 set for renamed products
- Large share of sitemap URLs are theme junk (safe to 410)

---

## T. Implementation recommendations (later batch — not now)

1. Owner approves KEEP / 301 / 410 / REVIEW decisions.
2. Implement **only approved** 301s in Next `redirects` (or edge), one hop, trailing slash.
3. Copy critical PDFs into rebuild public assets; update compliance links.
4. After DNS cutover: submit rebuild sitemap; monitor GSC 404s.
5. Do **not** blanket-redirect unknown URLs to homepage.

---

## U. Exact owner decisions (checklist)

1. Approve **301** list of 9 HIGH-confidence renames (exclude `/insurance/` until #2).  
2. Decide `/insurance/` → `/` vs keep thin page.  
3. Decide `/pool-and-spa/` fate (new page / redirect / 410).  
4. Decide `/blog/` fate (migrate / `/resources/` / 410).  
5. Decide theme `/service/*` product-like URLs: **410** vs soft **301**.  
6. Plan for `disclosure.pdf` hosting after WP decommission.

---

## V. Regression (inventory-only batch)

Re-run at commit time (docs-only change; no runtime redirect code):

| Check | Result |
|-------|--------|
| `npx tsc --noEmit` | **PASS** |
| `npm run build` | **PASS** |
| SEO verifier (`verify-seo-canonical.cjs`) | **PASS** · 60 product routes |
| Navigation verifier | **PASS** · 0 errors |
| Homepage category completeness | **10/10 · 54/54** |
| Content audit | **A44 / B16 / C0 / D0** |
| Partners | **44/44** |
| Claims (verified) | **25/25** |
| Explorer | **236/236 baseline retained** (no explorer code changes; interactive-master route inventory unchanged; sample routes 200). Full puppeteer multi-viewport suite not re-executed this batch after hang risk on long run — static + smoke only. |
| Runtime redirects modified | **NO** |

---

## Safety confirmation

- No WordPress login / wp-admin  
- No forms submitted  
- No DNS / Vercel / production changes  
- **No redirects implemented**  
- Docs + CSV only  

**DO NOT MERGE TO MAIN · DO NOT DEPLOY · STOP FOR OWNER REDIRECT APPROVAL**
