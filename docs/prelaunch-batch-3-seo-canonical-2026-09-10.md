# Pre-Launch Batch 3 — SEO + Canonical Precision Remediation

**Date:** 2026-09-10  
**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Worktree:** `/tmp/PREMIUM_WEBSITE-d3-transportation`  
**Base:** `35cb6c6` (Batch 2.5 retained)  
**Navigation freeze:** `4e68fc4`

---

## A. Current route inventory

| Metric | Count |
|--------|------:|
| App `page.tsx` routes | **76** |
| Product `*-insurance` routes | **60** |
| Expected template 404 | `careers/[slug]` when job closed/missing |
| Intentional redirect route | `/talk-to-a-broker/` → `/contact/?intent=broker` (308) |

Sampled HTTP (local rebuild server): indexable marketing/product routes return **200** with trailing slash.

---

## B. Indexable route inventory

| Set | Count |
|-----|------:|
| Sitemap `<loc>` entries | **75** |
| Includes | Homepage, 60 products, Claims, Partners, About, Contact, Careers (+ open jobs + general application), Resources, Payment, Compliance, Privacy, Newsletter, Quote |
| Excluded from sitemap | `/talk-to-a-broker/` (redirect + `noindex`), `/api/*` |

Indexable intent: public marketing + product + support pages that should be crawlable after cutover.

---

## C. Homepage metadata before/after

| Field | BEFORE | AFTER |
|-------|--------|-------|
| Title | `PremiumIB \| Windsor-Essex Insurance Brokers` (root layout only) | `Premium Insurance Brokers \| Personal & Business Insurance in Windsor-Essex` |
| Description | `Compare insurance options with help from a real broker — not a call centre.` | `Independent insurance brokerage in Windsor-Essex. Personal auto, home, and commercial coverage through a licensed local broker — not a call centre.` |
| Canonical | none | `https://premiumib.com/` |
| OG title | none | `Premium Insurance Brokers \| Windsor-Essex` |
| OG description | none | Personal/business broker positioning |
| Visible H1 | unchanged | **unchanged** (no hero rewrite) |

---

## D. Title issues + changes

| Route | BEFORE | AFTER | Reason |
|-------|--------|-------|--------|
| `/` | PremiumIB \| … | Premium Insurance Brokers \| Personal & Business… | Generic brand / weak homepage SEO |
| `/partners/` | Our Partners \| PremiumIB | Our Partners \| Premium Insurance Brokers | Brand inconsistency |
| `/get-a-quote/` | Get a Quote \| PremiumIB | Get a Quote \| Premium Insurance Brokers | Brand inconsistency |

**Title issues before:** 3 meaningful  
**Title issues after:** 0 remaining of those  
Product titles already unique and accurate — not rewritten for style.

---

## E. Meta-description issues + changes

| Route | Change |
|-------|--------|
| `/` | Replaced generic call-centre line with accurate brokerage + Windsor-Essex positioning |

Other descriptions reviewed; no mass rewrite. Cannabis / commercial / personal descriptions retained.

**Meta issues before:** 1 meaningful (homepage)  
**Meta issues after:** 0

---

## F. Selected canonical policy

### **TRAILING SLASH**

**Why**
1. Existing internal hrefs (nav, Batch 2.5 homepage products, sitemap) already use trailing slashes.
2. Existing product canonicals were already authored as `/slug/`.
3. Next.js default (`trailingSlash: false`) caused avoidable **308** hops from those links.
4. Enabling `trailingSlash: true` in `next.config.ts` aligns served URLs with hrefs/canonicals/sitemap without rewriting 54 homepage placements or the frozen nav.

Evidence after change: `HEAD /commercial-insurance` → **308** → `/commercial-insurance/`.

---

## G. Canonical issues + changes

| Issue before | Fix |
|--------------|-----|
| No `metadataBase` | `metadataBase: https://premiumib.com` in root layout |
| Relative canonicals unresolved | Absolute via `metadataBase` + `buildPageMetadata()` |
| Slash policy mismatch | `trailingSlash: true` |
| Missing canonicals (homepage, utility pages, auto) | Added via `src/lib/seo.ts` `buildPageMetadata` |
| Talk-to-broker indexable | `noIndex: true` + removed from sitemap |

**Canonical issues before:** high (missing base + coverage gaps + slash conflict)  
**Canonical issues after:** 0 on sampled indexable routes (SEO verifier PASS)

---

## H. Internal 308 before/after

| Metric | Before | After |
|--------|--------|-------|
| Policy | Default no-trailing; links used `/` | Trailing slash served |
| Avoidable slash 308s from primary nav/product links | Widespread (href `/x/` → served `/x`) | **Eliminated** for trailing-slash hrefs |
| Intentional 308 | Talk to Broker | Retained (`/talk-to-a-broker/` → `/contact/?intent=broker`) |
| No-slash requests | N/A preferred | 308 → slash (correct under chosen policy) |

Exact sitewide count of every historical 308 was not re-crawled from WordPress; rebuild-internal avoidable slash hops for trailing hrefs are resolved by config alignment.

---

## I. Sitemap audit

| Check | Result |
|-------|--------|
| Host | `https://premiumib.com` |
| Count | **75** |
| Cannabis Retail/Producer | Included |
| Claims / Partners | Included |
| Talk-to-broker | **Removed** |
| API routes | Not listed |
| Duplicate slash variants | None under trailing policy |
| localhost / vercel | None |

**SITEMAP: PASS**

---

## J. Robots audit

```
Allow: /
Disallow: /api/
Host: https://premiumib.com
Sitemap: https://premiumib.com/sitemap.xml
```

No site-wide noindex. Talk-to-broker page-level `noindex`.

**ROBOTS: PASS**

---

## K. Structured data

| Type | Status |
|------|--------|
| InsuranceAgency (shared provider) | Retained; added factual `parentOrganization: Oracle RMS` |
| Service (product pages) | Retained |
| JobPosting | Retained |
| FAQPage / BreadcrumbList / WebSite | Not present — not invented |

No fake ratings, hours, or review counts.

**STRUCTURED DATA: PASS** (minor enrichment only)

---

## L. Geographic consistency

| Pattern | Classification |
|---------|----------------|
| Windsor-Essex in product titles | CORRECT |
| Windsor address on Contact/About | CORRECT |
| Ontario on Careers/auto context | ACCEPTABLE |
| Not every title forced to “Windsor Ontario” | CORRECT (no stuffing) |

**GEOGRAPHIC CONSISTENCY: PASS**

---

## M. Cannabis SEO

| Route | Title unique | Description | Canonical | Sitemap | Body copy |
|-------|--------------|-------------|-----------|---------|-----------|
| `/cannabis-retail-insurance/` | Yes | Yes | Yes (`premiumib.com/.../`) | Yes | **Unchanged** |
| `/cannabis-producer-insurance/` | Yes | Yes | Yes | Yes | **Unchanged** |

**CANNABIS SEO: PASS**

---

## N. Product metadata duplication

Shared brand suffix `| Premium Insurance Brokers` is intentional.  
No confusing duplicate titles found across personal vs commercial product set in this pass.

---

## O. OG / social metadata

| Surface | Status |
|---------|--------|
| Root defaults | OG type/locale/siteName + default image |
| Homepage + products + utilities via `buildPageMetadata` | og:title, og:description, og:url, og:image, twitter card |
| Default image | Existing `/images/photography/special/homepage-hero.webp` (absolute via metadataBase) |

No new social-image design system.

**OG/SOCIAL: PASS**

---

## P. H1 audit

Sampled routes expose a clear primary H1. No frozen product H1 rewrites. Homepage hero H1 unchanged.

**H1: PASS** (sampled)

---

## Q. Internal-link normalization

- Policy aligned to trailing slash (config).
- Broker intent links normalized to `/contact/?intent=broker`.
- Batch 2.5 homepage product hrefs already trailing — **preserved**.
- Completeness verifier: **10/10**, **54** placements, **0** missing.

---

## R. Production-domain safety

Production-facing metadata uses **`https://premiumib.com` only**.  
No localhost / vercel.app in `src/` metadata, sitemap, or robots.

Note: live DNS still WordPress — metadata preparation only.

---

## S. Legacy WordPress evidence

| Source | Finding |
|--------|---------|
| `next.config` redirects | **None** for WP paths |
| Repo redirect map / CSV | **Not found** |
| Docs | Confirm `premiumib.com` still WordPress |
| Live asset still referenced | `premiumib.com/wp-content/uploads/.../disclosure.pdf` (compliance) |

**LEGACY WORDPRESS URL INVENTORY: STILL REQUIRED**  
Do not invent mappings.

---

## T. Legacy cutover checklist (planning only)

1. Crawl/export current `premiumib.com` URLs (Screaming Frog / similar)
2. Export WordPress sitemap(s)
3. Pull Search Console indexed URLs where available
4. Build mapping table: OLD → NEW → KEEP SAME / 301 / 410 / OWNER REVIEW
5. Implement permanent redirects in Next (or edge) — never blind homepage dump
6. Test chains (max one hop), 404s, important money pages
7. Confirm trailing-slash canonicals + sitemap + robots on production host
8. DNS/cutover only after owner approval
9. GSC property verification + sitemap submit
10. Monitor 404/coverage/indexing 2–4 weeks post-launch

**LEGACY REDIRECT MAPPING: BLOCKED UNTIL INVENTORY**

---

## U. SEO verifier

**Script:** `scripts/verify-seo-canonical.cjs`  
**Result:** **PASS** (static + live against local rebuild)

Checks: trailingSlash config, metadataBase, homepage brand, sitemap/robots hosts, Cannabis membership, sample titles/canonicals/OG, no localhost, product route count 60.

---

## V. Regression

| Check | Result |
|-------|--------|
| `npm run build` | PASS |
| `npx tsc --noEmit` | PASS |
| Content | **A44 / B16 / C0 / D0** |
| Navigation | PASS, zero-discovery 0 |
| Homepage categories | **10/10**, **54** placements |
| Partners | **44** unified (no Core/Our Markets) |
| Claims / Quote observability | Retained |
| Cannabis verifier | PASS |
| Explorer | **236/236** (expected; no Explorer edits — confirm in CI log) |
| Working rails | Not redesigned |

---

## W. Remaining SEO issues

| Sev | Item |
|-----|------|
| **P0** | Legacy WordPress URL inventory + 301 map before domain cutover |
| **P0** | Production operational gate (env/Resend/E2E) — not SEO, still open |
| **P1** | Post-cutover GSC monitoring / 404 watch |
| **P2** | Optional dedicated OG images per hub (currently shared hero default) |
| **P3** | Footer/TrustBar still say “PremiumIB” in aria labels (not metadata) |

---

## X. Owner decisions required

1. Approve trailing-slash URL policy for cutover communications.
2. Authorize legacy WP crawl + redirect mapping project (separate batch).
3. Do **not** cut DNS until redirect map is complete.
4. Confirm Production Resend/domain/env for Quote/Contact email (operational P0).
5. Supply higher-res partner logos (Coast, Forward) — unrelated to SEO batch.

---

## Batch 2.5 preservation

| Item | Status |
|------|--------|
| Homepage 10/10 + 54 placements | RETAINED |
| Partners unified 44 + larger logos | RETAINED |
| Quote email observability / QUOTE_NOTIFY_TO | RETAINED |
| Claims 25/25 | RETAINED |
| Talk to Broker → Contact | RETAINED (slash-normalized) |
| Image quality delivery bumps | RETAINED |

**DO NOT MERGE · DO NOT DEPLOY · STOP FOR OWNER REVIEW**
