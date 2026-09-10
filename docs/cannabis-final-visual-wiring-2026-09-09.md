# Cannabis Insurance — Phase 4B Final Visual Wiring

**Date:** 2026-09-10  
**Feature branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Worktree:** `/tmp/PREMIUM_WEBSITE-d3-transportation`  
**Content freeze:** `d8bf75d`  
**PR #23 merge commit:** `b7a4bb8c996b902022a23f4efad034c224b5d86c`

No merge of main. No rebase. No cherry-pick of the PR merge. No Vercel alias changes.

---

## A. PR #23 reconciliation

| Field | Value |
|-------|--------|
| **PR** | [#23](https://github.com/nibbles33/PREMIUM_WEBSITE-/pull/23) “Add files via upload” |
| **State** | MERGED 2026-09-10T03:52:16Z |
| **MERGE COMMIT** | `b7a4bb8c996b902022a23f4efad034c224b5d86c` |
| **Parent** | `97f7d30600db897ae44fad3486c6b79d303c3b83` (previous main) |
| **FILES INTRODUCED** | 4 image files only |
| **ANY NON-ASSET FILES** | **NO** |
| **PR #23 ASSET-ONLY** | **YES** |

Method: `git checkout b7a4bb8c996b902022a23f4efad034c224b5d86c -- <four paths>`

---

## B. Asset paths

Exact repository paths on main / this branch:

1. `public/images/CANNABIS/cannabis-retail-insurance.webp`
2. `public/images/CANNABIS/cannabis-retail-insurance-interactive-master.png`
3. `public/images/CANNABIS/cannabis-producer-insurance.webp`
4. `public/images/CANNABIS/cannabis-producer-insurance-interactive-master.png`

Filenames match the four owner-approved assets. They live in `public/images/CANNABIS/` (GitHub upload folder), not under `public/images/photography/commercial/`. Wiring uses those exact paths.

---

## C. SHA-256 verification

Feature-branch copies are **byte-identical** to `b7a4bb8`:

| File | SHA-256 |
|------|---------|
| cannabis-retail-insurance.webp | `8fa030b66903c3596c77290d454df217a2afb114c25d16479ce1e32e2bd0467f` |
| cannabis-retail-insurance-interactive-master.png | `aeb0d2b10b2035448f1c82f38c09ec05fa4c6140e5612f86eb4d5d5a8f4054fb` |
| cannabis-producer-insurance.webp | `76f14339201683270bf43968eb7593a628c949277d6a223a5bcc515c9daa62e1` |
| cannabis-producer-insurance-interactive-master.png | `c6c499ec6b4cda83e88502a75e3eae53185f22d2b0f862672ffedd1b80b33a47` |

**SHA MATCH MAIN: 4 / 4**

---

## D. Image technical properties

| Asset | Container | Actual format | Size | Landscape | Readable |
|-------|-----------|---------------|------|-----------|----------|
| Retail Explorer | PNG | PNG RGB | **1672 × 941** | YES | YES |
| Producer Explorer | PNG | PNG RGB | **1672 × 941** | YES | YES |
| Retail Hero | `.webp` filename | **PNG bytes** (not WebP) | 1672 × 941 | YES | YES |
| Producer Hero | `.webp` filename | **PNG bytes** (not WebP) | 1672 × 941 | YES | YES |

Explorer masters: full isometric compositions, correct orientation, not corrupt.

Hero note: files are named `.webp` but `file(1)` / Pillow report PNG. Static HTTP serves `Content-Type: image/webp` for PNG bytes. **Next.js `next/image` optimizer still decodes them and returns `image/png`**, so routed heroes render. See §N.

---

## E. Retail final wiring

| Surface | Before | After |
|---------|--------|--------|
| Hero | `/images/photography/commercial/retail-insurance.webp` (temporary) | `/images/CANNABIS/cannabis-retail-insurance.webp` |
| Explorer | `cannabis-retail-insurance-interactive-master.png` (Phase-2 stand-in at `public/images/`) | `CANNABIS/cannabis-retail-insurance-interactive-master.png` |
| Placement flags | `isTemporary: true` | removed; `confidence: HIGH` |
| Alt | temporary stand-in text | “Customer and staff at the counter of an authorized cannabis retail store…” |

Copy, Explorer IDs, V2 copy, considerations, FAQs, SEO, slug: **unchanged**.

---

## F. Producer final wiring

| Surface | Before | After |
|---------|--------|--------|
| Hero | `/images/photography/commercial/manufacturing-insurance.webp` (temporary) | `/images/CANNABIS/cannabis-producer-insurance.webp` |
| Explorer | `manufacturing-insurance-interactive-master.png` (temporary reuse) | `CANNABIS/cannabis-producer-insurance-interactive-master.png` |
| Placement flags | `isTemporary: true` | removed; `confidence: HIGH` |
| Alt | temporary stand-in text | “Technician inspecting cannabis plants in a licensed indoor cultivation room…” |

Copy, Explorer IDs, V2 copy, considerations, FAQs, SEO, slug: **unchanged**.

---

## G. Temporary-reference cleanup

Removed from live Cannabis wiring:

- TODO BEFORE LAUNCH Cannabis Explorer markers
- TEMPORARY comments on master map
- `isTemporary` / `temporaryNote` on both Cannabis placements
- Verifier assertions that required those TODOs (replaced with asserts that approved `CANNABIS/` paths are wired)

Left untouched (unrelated):

- About Us / Team `TEMPORARY_NOTE` photography
- Frozen Retail / Manufacturing hero assets
- Historical Phase 2/3 reports

Root-level `public/images/cannabis-retail-insurance-interactive-master.png` (old Phase-2 stand-in, different SHA) remains on disk as an unused extra and is listed in `EXCLUDED_EXTRA_ASSETS`. It is **not** referenced by either Cannabis route.

**TEMP REFERENCES REMAINING (live Cannabis wiring): 0**

---

## H. Explorer containment

Shared CSS (unchanged):

```
.pilot-ce-scene-interactive-master-image {
  object-fit: contain;
  object-position: center center;
}
```

Measured at 1440:

| Route | object-fit | object-position |
|-------|------------|-----------------|
| Retail | `contain` | `50% 50%` |
| Producer | `contain` | `50% 50%` |

No `cover`, zoom-to-fill, page-specific scaling, or Cannabis crop hacks. Full isometric compositions remain visible (letterboxed in the stage). Viewports 390 / 768 / 1024 / 1440: no overflow; no painted-content clip on the masters.

---

## I. Hero responsive QA

Shared hero uses `object-cover object-center` (existing ProductHero). **No page-specific object-position hacks added.**

| Viewport | Retail | Producer |
|----------|--------|----------|
| 390 | Photo below copy (mobile stack); after load, counter/customer/staff visible; slight right-edge crop of staff — acceptable cover crop | Same stack; 1440 crop shows technician + plants; not awkwardly cut |
| 768 | Full store aisle + counter subjects sharp | Loaded on desktop captures; timing-flake empty frames during concurrent regression are not broken assets |
| 1024 | H1 readable; overlay/readability OK | H1 readable |
| 1440 | Strong crop: customer + staff + packaged product; cameras visible | Strong crop: technician, canopy, lighting, aisle |

Correct `CANNABIS` URLs confirmed in `next/image` `src`. No horizontal overflow. H1 readable at all four widths.

---

## J. Explorer state QA

| Route | States | V2 LEFT/RIGHT | Keyboard | Reduced motion | Master |
|-------|--------|---------------|----------|----------------|--------|
| Retail | **5/5** | PASS | ArrowDown selects | Explorer remains | CANNABIS retail master |
| Producer | **6/6** | PASS | ArrowDown selects | Explorer remains | CANNABIS producer master |

IDs unchanged from content freeze.

---

## K. Content / frozen baseline

| Check | Result |
|-------|--------|
| Cannabis visitor copy | **UNCHANGED** |
| Frozen 58 copy | **UNCHANGED** |
| Nav / mega-menu / hub | **UNCHANGED** |
| Content audit | 60 routes **A44 / B16 / C0 / D0** (frozen 58 still A42 / B16 / C0 / D0) |

---

## L. Regression

| Check | Result |
|-------|--------|
| `npx tsc --noEmit` | PASS |
| `npm run build` | PASS |
| Content audit | A44 / B16 / C0 / D0 |
| `scripts/verify-cannabis-products.cjs` | PASS |
| Coverage Explorer regression | **236 / 236** (0 fail) |

Scanner/tests not weakened.

---

## M. Deployment incident check

| Question | Finding |
|----------|---------|
| **MAIN CHANGED** | **YES** — `origin/main` advanced `97f7d30` → `b7a4bb8` via PR #23 |
| **PR #23 ASSET-ONLY** | **YES** |
| **PRODUCTION DEPLOYMENT EVIDENCE** | **YES** — GitHub deployment `6364193597`, environment `Production`, SHA `b7a4bb8`, created 2026-09-10T03:53:01Z, status `success`, target `https://premium-website-62xgohoy4-nabil-g-s-projects.vercel.app` |
| **PRODUCTION ALIAS MODIFIED** | **CANNOT DETERMINE LOCALLY** — GitHub reports a Production-environment deployment to a hashed `*.vercel.app` URL. Whether the production domain alias moved was **not** verified (Vercel was not queried/altered). |

This branch was **not** merged, deployed, or promoted.

---

## N. Remaining issues

1. **Hero files are PNG bytes with a `.webp` extension.** Next/image still renders them. Optional later: true WebP re-export **without** changing composition (would be a new owner-approved asset, not this SHA). Not converted here — would break SHA match to PR #23.
2. Unused Phase-2 stand-in still at `public/images/cannabis-retail-insurance-interactive-master.png` (excluded extra). Safe to delete in a later cleanup; not referenced.
3. Historical Phase 2/3 docs still describe temporary visuals (accurate as of those commits).

No crop issue requiring shared-hero redesign.

---

## O. Visual freeze recommendation

**READY TO FREEZE CANNABIS VISUALS: YES**  
(Approved PR #23 assets wired; containment/regression pass. Optional MIME/extension cleanup is not a freeze blocker.)

**READY FOR MASTER PRODUCT INVENTORY + NAVIGATION RECONCILIATION: YES**
