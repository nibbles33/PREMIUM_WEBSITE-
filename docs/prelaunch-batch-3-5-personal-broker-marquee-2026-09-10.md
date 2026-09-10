# Pre-Launch Batch 3.5 — Personal Completeness + Broker Journey + Ultrawide Marquee

**Date:** 2026-09-10  
**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Base:** `7a66adf` (Batch 4B protected)  
**Scope:** Personal discovery completeness, broker CTA consolidation, carrier marquee ultrawide fix.

---

## A. Authoritative Personal inventory

**Total: 14**

| Product | Route | Source |
|---------|-------|--------|
| Auto Insurance | `/auto-insurance/` | Standalone `pilot-auto.ts` |
| Home Insurance | `/home-insurance/` | personal registry (inline) |
| Condo Insurance | `/condo-insurance/` | personal registry (inline) |
| Tenant Insurance | `/tenant-insurance/` | personal registry (inline) |
| Landlord Insurance | `/landlord-insurance/` | personal registry (inline) |
| Motorcycle Insurance | `/motorcycle-insurance/` | personal registry (inline) |
| Boat Insurance | `/boat-insurance/` | personal registry (inline) |
| Cottage Insurance | `/cottage-insurance/` | personal registry (inline) |
| Travel Insurance | `/travel-insurance/` | personal registry (inline) |
| Mobile & Manufactured Home | `/mobile-home-insurance/` | personal registry (specialty) |
| Personal Umbrella | `/personal-umbrella-insurance/` | personal registry (specialty) |
| Home & Ride Sharing | `/home-sharing-insurance/` | personal registry (specialty) |
| Life Insurance | `/life-insurance/` | personal registry (specialty) |
| Group Home & Auto | `/group-home-auto-insurance/` | personal registry (specialty) |

---

## B. Personal discovery matrix BEFORE

| Surface | Count | Notes |
|---------|------:|-------|
| Homepage Personal filmstrip | **8 / 14** | Missing 6 specialties/landlord |
| Desktop nav | **14 / 14** | Complete |
| Mobile nav | **14 / 14** | Same `personalNavGroups` |
| Personal hub (live) | **0 / 14** | Orphaned `PersonalInsurance` not mounted |
| Zero-discovery | **0** | All reachable via nav |

**Missing from homepage before:** Landlord, Mobile Home, Personal Umbrella, Home Sharing, Life, Group Home & Auto.

---

## C. Personal discovery matrix AFTER

| Surface | Count |
|---------|------:|
| Homepage Personal filmstrip | **14 / 14** |
| Desktop nav | **14 / 14** |
| Mobile nav | **14 / 14** |
| Personal hub `/personal/` | **14 / 14** |
| Zero-discovery | **0** |

Verifier: `scripts/verify-personal-discovery.cjs` → **PASS**

---

## D. Homepage Personal before/after

| | Before | After |
|--|-------:|------:|
| Shown | 8 | **14** |
| Missing | 6 | **0** |

**Implementation:** data-only update to `personalFilmstripItems` in `src/data/pilot-home.ts`.  
**Component preserved:** `PilotPersonalFilmstrip` (autoplay, drag, fades, styling, speed unchanged).  
**CTA:** “Explore all Personal →” now links to `/personal/`.

**Newly surfaced on homepage:** Landlord, Mobile Home, Umbrella, Home Sharing, Life, Group Home & Auto.

---

## E. Desktop Personal navigation

| | Before | After |
|--|-------:|------:|
| Products | 14 | 14 |
| Missing | 0 | 0 |

Top-level Personal hub href: `/auto-insurance/` → **`/personal/`** (`nav.ts` + `personalNavHub`).

---

## F. Mobile Personal navigation

| | Before | After |
|--|-------:|------:|
| Products | 14 | 14 |
| Missing | 0 | 0 |

Same data source as desktop. No accordion/touch-target regressions introduced.

---

## G. Personal Hub

| | Before | After |
|--|-------:|------:|
| Live hub | none | **`/personal/`** |
| Products | 0 (orphaned 7 unique + Motorcycle duplicate) | **14 unique** |

- Mounted existing `PersonalInsurance` design system on `/personal/`
- Rebuilt `personal-categories.ts` inventory (removed Motorcycle duplicate; added Specialty category)
- Indexable via sitemap (`/personal/` utility hub — not a product route)

---

## H. Personal route validation

| Metric | Result |
|--------|--------|
| Personal routes | **14** |
| HTTP 200 | **14 / 14** (sampled all including newly emphasized) |
| Broken | **0** |
| Wrong destinations | **0** |

---

## I. Personal verifier

`scripts/verify-personal-discovery.cjs`  
Artifact: `docs/qa-screenshots/prelaunch-batch-3-5-2026-09-10/personal-discovery.json`

**PERSONAL VERIFIER: PASS**  
**ZERO-DISCOVERY PERSONAL AFTER: 0**

---

## J. Broker-contact audit

No visitor CTAs labeled “Talk to Us” or “Meet a Broker” were found.

Meaningful concepts found:

| Label | Destination (before → after) | Role |
|-------|------------------------------|------|
| Talk to a Broker | `/talk-to-a-broker/` → **`/contact/?intent=broker`** | Primary broker CTA (header, home, company pages, products) |
| Contact Us | `/contact/` | General contact |
| Talk to a Broker (redirect stub) | `/talk-to-a-broker/` → `/contact/?intent=broker` | **Preserved** Batch 4B / Batch 2 alias |

---

## K. Duplicate broker pages

**BEFORE:** 0 duplicate indexable broker pages (redirect stub was already `noIndex`).  
Problem was **duplicate journeys** (many CTAs hopping via redirect).

**AFTER:** **0** duplicate indexable broker pages.

---

## L. Broker-contact consolidation

- Canonical destination: **`/contact/?intent=broker`**
- Live CTAs updated to point directly (Header, home hero/final CTA, about/team/partners/payment/resources, product fallbacks, specialty quote/secondary CTAs)
- **`src/app/talk-to-a-broker/page.tsx` unchanged** (308 → contact intent)
- Batch 4B `legacy-wordpress-cutover.ts` / middleware cutover rules **unchanged**
- Redirect chains for broker CTAs: **0** (direct to canonical)

---

## M. CTA label audit

| Field | Value |
|-------|--------|
| PRIMARY BROKER LABEL | **Talk to a Broker** |
| CANONICAL BROKER DESTINATION | `/contact/?intent=broker` |
| GENERAL CONTACT LABEL | Contact Us |
| ALTERNATE BROKER LABELS RETAINED | Specialty long-form CTAs e.g. “Talk to a Broker About Umbrella Coverage” (same destination) |
| ALTERNATE BROKER ROUTES | `/talk-to-a-broker/` alias only (preserved) |
| DUPLICATE INDEXABLE BROKER PAGES AFTER | **0** |

---

## N. Carrier marquee root cause

With **2** DOM sequences of 12 cards (~2328px sequence width) and CSS animation `-50%` of track:

When **viewport width > one sequence width** (ultrawide ≥ ~2560), the visible rail can expose empty background during the cycle.

Secondary issue: `-50%` ≠ exact sequence+gap period when inter-segment flex gap exists.

---

## O. Carrier marquee implementation

Isolated to carrier rail (Yep still uses 2× / `-50%`):

1. Render **4** identical sequences of the approved **12** carriers  
2. `measureFirstChildShift` on `PilotInfiniteRail` sets `--pilot-rail-shift` = first sequence width + gap  
3. Animation translates exactly one sequence (`pilot-rail-scroll-ltr-shift`)  
4. Copy 0 focusable; copies 1–3 `aria-hidden` + `tabIndex={-1}`  
5. No carrier inventory changes; styling/autoplay/fades preserved  

---

## P. Mathematical coverage

For sequence width \(S \approx 2328\) and \(N=4\):

\[
(N-1)S \approx 6984 \ge 3840
\]

Translation distance = measured one-sequence period. Verifier confirms uncovered region ≈ 0 at 0/25/50/75/99% progress.

---

## Q. Ultrawide test matrix

| Width | Result |
|------:|--------|
| 390 | PASS |
| 768 | PASS |
| 1024 | PASS |
| **1440** | **PASS** |
| **1920** | **PASS** |
| **2560** | **PASS** |
| **3440** | **PASS** |
| **3840** | **PASS** |

Artifact: `docs/qa-screenshots/prelaunch-batch-3-5-2026-09-10/carrier-marquee-coverage.json`

**VISIBLE MARQUEE GAPS: 0**  
**MARQUEE LOOP SEAM: PASS**  
**MARQUEE COVERAGE VERIFIER: PASS**

---

## R. Accessibility

Carrier duplicates: non-primary sequences `aria-hidden` + links `tabIndex={-1}`.  
Logical inventory remains 12 carriers / one accessible sequence.

---

## S. Other homepage rail regression

| Rail | Result |
|------|--------|
| Yep | **PASS** (still present; shared rail default mode unchanged) |
| Awards | **PASS** |
| Personal rail | **PASS** (data expanded; component behavior preserved) |
| Pointer drag | **PASS** (personal filmstrip still uses `useTransformInfiniteRail` + pointer drag guard) |

---

## T. Responsive Personal QA

Personal filmstrip + hub + nav validated via discovery verifier + HTTP 200 route checks. No component redesign of the moving rail.

---

## U. Commercial regression

**10/10 categories · 54/54 placements** — unchanged (homepage completeness verifier PASS).

---

## V. Batch 4B redirect preservation

| Check | Result |
|-------|--------|
| `legacy-wordpress-cutover.ts` | **UNCHANGED** vs `7a66adf` |
| Middleware cutover 410/redirect rules | **UNCHANGED** |
| Talk-to-broker page redirect | **PRESERVED** |
| Legacy cutover validator | **20/20 redirects · 47/47 gone PASS** |
| `/pool-and-spa/` | **UNTOUCHED** |
| `/faqs/` | **UNTOUCHED** |
| Disclosure PDF phone | **UNTOUCHED** |

---

## W. Full regression

| Check | Result |
|-------|--------|
| `tsc --noEmit` | PASS |
| `npm run build` | PASS |
| Content | **A44 / B16 / C0 / D0** |
| Product routes | **60** |
| SEO verifier | **PASS** |
| Navigation | **PASS** |
| Homepage commercial | **10/10 · 54/54** |
| Partners | **44/44** · carriers **12/12** |
| Claims | **25/25** |
| Cannabis | PASS |
| Explorer UX v2 | PASS |
| Explorer 236 | **236 / 236 PASS** (`fail: 0`) — `docs/qa-screenshots/prelaunch-batch-3-5-2026-09-10/explorer-regression.log` |
| Personal discovery | PASS |
| Carrier ultrawide | PASS |
| Batch 4B cutover | PASS |

---

## X. Unresolved owner decisions

1. `/pool-and-spa/` (Batch 4B — intentionally open)  
2. `/faqs/` (Batch 4B — intentionally open)  
3. Disclosure PDF phone-number correction (Batch 4B — intentionally open)  

**No new owner decisions required for Batch 3.5 Personal/broker/marquee work.**

---

## Safety

- No merge / deploy / DNS / WordPress / production env changes  
- Batch 4B redirect implementation not altered  
- Stop for owner review
