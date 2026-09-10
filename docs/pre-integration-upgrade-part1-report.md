# Pre-Integration Upgrade — Part 1 Report

**Branch:** `cursor/pre-integration-upgrade-part1-7402`  
**Date:** 2026-09-04  
**Status:** STOP for owner review — do not merge, do not deploy  
**Part 2 (Coverage Explorer rebuild):** NOT started

---

## A. Branch Setup

| Field | Value |
|---|---|
| **Branch** | `cursor/pre-integration-upgrade-part1-7402` |
| **Base branch** | `cursor/card-photography-wiring-7402` |
| **Base commit** | `0ba681a6fc384c3953bee308408c51ed15aacb73` |
| **Why this base** | Most complete approved stack: product rollout, hero-images-19 + hero-images-12 (merged), card-navigation fix, CTA visibility fix, card-photography registry wiring |

**Inherited approved work on base:**
- Hero photography registry (`placements.ts`) with hero-images-12 assets on disk
- `getPhotographySlugFromHref()` card source-of-truth wiring
- Card navigation fix + `pointerDragGuard.ts` (235-target suite)
- Homepage CTA broker visibility fix
- All product routes and Greenhouse recovery

**Expected but missing:** Nothing critical — all 7 hero-images-12 WebPs present; card navigation suite available; photography registry complete.

---

## B. Existing Image Library Inventory

**Script:** `scripts/image-library-inventory.cjs`  
**Output:** `docs/qa-screenshots/pre-integration-part1/image-library-inventory.json`

| Category | Asset count |
|---|---:|
| Commercial photography | 38 |
| Personal photography | 14 |
| Special photography | 4 |
| Awards | 9 |
| Partners/carriers | 56 |
| Miniatures | 2 |
| Logo/other | 17 |
| **Total** | **140** |

**Findings:**
- All photography WebPs in `public/images/photography/**` are referenced in `placements.ts` (0 unused hero photography files).
- No PNG/JPEG hero alternatives in repo beyond WebP production set.
- `assets-source/website-photography/image-mapping.json` documents original assignment rationale.

**Replacements made (existing assets only):**
1. Liquor Liability → `restaurant-insurance.webp`
2. Property Management → `real-estate-insurance.webp`

**Products still needing new artwork (not created in this task):**
| Product | Recommendation |
|---|---|
| Non-Profit Insurance | **NEW ASSET RECOMMENDED** — current classroom/Montessori scene; no stronger community-org image in library |
| Religious Organizations | **OWNER OPTIONAL** — current church interior is relevant but denomination-specific; no broader multifaith alternative in library |
| Tenant Insurance | No action — acceptable generic; no clearly superior renter-specific asset |
| Group Home & Auto | Unchanged — acceptable |

---

## C. Hero Corrections

| Product | Before | After | Reason |
|---|---|---|---|
| **Liquor Liability** | `event-venue.webp` | **`restaurant-insurance.webp`** | Commercial kitchen/restaurant better communicates hospitality alcohol service vs outdoor event venue |
| **Event Liability** | `event-venue.webp` | **unchanged** | Defensible event-oriented hero; no clearly superior alternative |
| **Non-Profit** | `non-profit-insurance.webp` | **unchanged** | No stronger community-org asset in library — flagged for new artwork |
| **Religious Organizations** | `religious-organizations-insurance.webp` | **unchanged** | Relevant but church-specific — flagged as owner optional |
| **Property Management** | `condo-property-management.webp` | **`real-estate-insurance.webp`** | Differentiates from Condo Corp; blueprint/planning professional scene |
| **Condominium Corporation** | `condo-property-management.webp` | **unchanged** | Building/common-elements imagery remains appropriate |
| **Tenant Insurance** | `tenant.webp` | **unchanged** | Acceptable; no clearly better renter asset |
| **Group Home & Auto** | `group-home-auto-insurance.webp` | **unchanged** | Acceptable |

Screenshots: `docs/qa-screenshots/pre-integration-part1/hero-*.png`

---

## D. Duplicate Photography Audit

| Asset | Routes | Intentional? | Visually acceptable? | Action |
|---|---|---:|---|---|
| `manufacturing-insurance.webp` | Manufacturing, Pollution Liability, Product Recall | Yes | Yes | **Preserve** (approved consolidation) |
| `professional-offices-insurance.webp` | Professional Offices, Professional Liability | Yes | Yes | Preserve (family reuse) |
| `executive-leadership.webp` | D&O, EPLI | Yes | Yes | Preserve (shared leadership visual) |
| `restaurant-insurance.webp` | Restaurant, **Liquor Liability** | Partial | Acceptable | **New** — liquor now shares restaurant kitchen (semantically closer than event venue) |
| `condo-property-management.webp` | Condominium Corporation only | Yes | Yes | Preserve — Property Management moved to real-estate |
| `event-venue.webp` | Event Liability only | Yes | Yes | Preserve — liquor no longer shares |

No visually indistinguishable product pairs remain beyond approved/intentional reuse.

---

## E. Business Mega-Menu Fix

**Root cause:** `DropdownPanel` had no `max-height` or internal scroll — 7-cluster Business menu grew taller than viewport at 100% zoom on common laptop heights.

**Fix:**
- `BusinessNavDropdown` uses `scrollable` panel variant
- `max-h-[min(calc(100dvh-5.5rem),calc(100vh-5.5rem))]` with internal `overflow-y-auto`
- Thin unobtrusive scrollbar styling in `globals.css`
- All 43 links remain; destinations unchanged

**Verification:** `scripts/mega-menu-viewport-verify.cjs` — **12/12 PASS**

| Viewport | 100% | 125% | 150% |
|---|---|---|---|
| 1920×1080 | PASS | PASS | PASS |
| 1440×900 | PASS | PASS | PASS |
| 1366×768 | PASS | PASS | PASS |
| 1280×720 | PASS | PASS | PASS |

Screenshot: `docs/qa-screenshots/pre-integration-part1/mega-menu-100pct-desktop.png`

---

## F. Personal Carousel — Implementation & Regression

**Implementation:**
- Extracted shared `useTransformInfiniteRail` hook (`src/hooks/useTransformInfiniteRail.ts`)
- Refactored `PilotPersonalFilmstrip` to use hook
- **Infinite loop:** 2× cloned items + `normalizeOffsetLtr()` wrap (no visible snap)
- **Touch/desktop drag:** Pointer events + `pointerDragGuard` (8px threshold, click suppression)
- **Momentum:** Subtle velocity decay on release (disabled when `prefers-reduced-motion`)
- **Autoplay:** RAF continuous scroll; pauses on hover/drag/interaction; resumes after 3.5s inactivity
- **Reduced motion:** Autoplay disabled; manual drag/arrows/keyboard only
- **`touch-action: none`** on viewport for reliable horizontal swipe

**Navigation regression (critical):**

| Metric | Result |
|---|---:|
| Click targets | **235/235 PASS** |
| Unique hrefs | **56/56 PASS** |
| Related-family tests | **51/51 PASS** |
| Desktop drag guard | 2/2 PASS |
| Mobile touch tests | 5/6 PASS (1 pre-existing flaky — navigation not blocked) |

Screenshot: `docs/qa-screenshots/pre-integration-part1/personal-carousel-mobile-390.png`

---

## G. Awards Rail

**Implementation:**
- Converted from CSS-only `PilotInfiniteRail` to interactive transform rail via `useTransformInfiniteRail`
- Touch swipe + desktop drag; autoplay with pause/resume; infinite loop without visible jump
- Awards remain non-clickable (display cards only)
- Reduced-motion: manual drag only, no autoplay

Screenshot: `docs/qa-screenshots/pre-integration-part1/awards-rail-mobile-390.png`

---

## H. Moving Rails Classification

| Surface | Class | Action in Part 1 |
|---|---|---|
| Carrier marquee | **A — Ambient marquee** | No change (CSS infinite rail appropriate) |
| Yep carousel | **A — Ambient marquee** | No change |
| Personal filmstrip | **B — Interactive carousel** | Upgraded (shared hook, momentum, touch) |
| Awards rail | **B — Interactive carousel** | Upgraded to match filmstrip interaction model |
| Related product rails | **C — Static scroll rail** | No change (finite scroll + drag; no autoplay correct) |
| Commercial discovery chips | **C — Static** | No change |

---

## I. Regression Summary

| Check | Result |
|---|---|
| `npm run build` | **PASS** |
| Card navigation 235/235 | **PASS** |
| Mega-menu 12 viewport/zoom combos | **PASS** |
| Runtime screenshots | Captured |
| Console errors during validation | None observed |

---

## J. Unexpected Findings

1. **Restaurant ↔ Liquor** now share `restaurant-insurance.webp` — semantically improved for liquor, but creates a new hero reuse pair (restaurant page + liquor page). Visually acceptable; owner may want dedicated liquor artwork later.
2. **Real-estate ↔ Property Management** now share `real-estate-insurance.webp` while Real Estate page also uses that asset — three-way semantic overlap possible if users visit both Real Estate and Property Management. Property Management differentiated from Condo Corp; Real Estate page still uses its own route hero (same file). Owner may eventually want a dedicated property-manager inspection photo.
3. Mobile navigation suite: 1/6 touch tests flaky (same as prior card-navigation runs) — not introduced by this work.

---

## Files Changed

- `src/hooks/useTransformInfiniteRail.ts` — shared infinite transform rail
- `src/components/pilot/PilotPersonalFilmstrip.tsx` — refactored to hook
- `src/components/pilot/PilotLocalProof.tsx` — interactive awards rail
- `src/components/nav/NavDropdowns.tsx` — scrollable business mega-menu
- `src/data/photography/placements.ts` — liquor + property management heroes
- `src/data/pilot-rail-durations.ts` — awards transform speed
- `src/styles/pilot.css` — filmstrip touch + awards interactive styles
- `src/app/globals.css` — mega-menu scrollbar styles
- `scripts/image-library-inventory.cjs`
- `scripts/mega-menu-viewport-verify.cjs`
- `scripts/pre-integration-part1-screenshots.cjs`

**STOP for owner review. Do not merge. Do not deploy. Do not begin Coverage Explorer (Part 2).**
