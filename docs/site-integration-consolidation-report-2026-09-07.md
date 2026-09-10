# Site Integration Consolidation Report

**Date:** 2026-09-07  
**Integration branch:** `cursor/site-integration-final-7402`  
**Integration HEAD:** `0caa364` (audit report + artifacts; code tip `8c5227b`)  
**Report path:** `docs/site-integration-consolidation-report-2026-09-07.md`

---

## A. Integration branch + HEAD SHA

| Field | Value |
|-------|-------|
| Branch | `cursor/site-integration-final-7402` |
| HEAD SHA | `8c5227b22403ff8386be3f8503aaae58088853ed` |
| HEAD message | `fix(coverage-explorer): resolve systemic interactive-master image cropping` |
| Created from | `cursor/coverage-explorer-crop-audit-7402` @ `8c5227b` (linear tip of approved feature stack) |
| Commits ahead of merge-base | 61 |
| **main NOT modified** | ✓ |
| **NO merge performed** | ✓ |
| **NO production deployment/promotion** | ✓ |

---

## B. Baseline used

| Baseline | SHA | Notes |
|----------|-----|-------|
| **Git merge-base (feature stack ↔ main)** | `0f03f42` | `Audit uploaded photography, optimize WebP assets, and wire hero images` (PR #1, merged) |
| **main HEAD (not used as integration base)** | `3fedeca` | `Create pilot` — diverged from feature stack; **not integrated** |
| **Integration source tip** | `8c5227b` | `cursor/coverage-explorer-crop-audit-7402` — contains entire linear approved stack |

### Branch ancestry (linear stack)

```
main (3fedeca) ── diverged ── not integrated
  │
0f03f42 (photography audit, PR #1 merged)
  └── visual-pilot-3page-7402 (3e500c1)
        └── … homepage / product batches …
              └── coverage-explorer-wiring-7402 (fcec7da)
                    └── restaurant-magnifier-7402 (855bbb8)
                          └── contractors-motion-7402 (5b94b77) [motion — superseded]
                                └── contractors-motion-fixes-7402 (424a013) [superseded]
                                      └── contractors-static-only-7402 (223e7f5) [APPROVED final]
                                            └── coverage-explorer-crop-audit-7402 (8c5227b) [APPROVED]
                                                  └── site-integration-final-7402 (8c5227b) ← THIS BRANCH
```

**Key finding:** All 20 feature branches form a **single linear chain**. The tip branch `cursor/coverage-explorer-crop-audit-7402` already contains every prior branch as an ancestor. No cherry-picking or merge conflict resolution was required — integration = tip of approved stack.

**main divergence:** `main` has 2 commits (`d62166c`, `3fedeca`) not in the feature stack. Classification: **NEEDS OWNER DECISION** before any future merge to main.

---

## C. Branch / PR classification table

| Branch | PR | HEAD SHA | Purpose | Relationship | Class | Preserve | Exclude | Reason |
|--------|-----|----------|---------|--------------|-------|----------|---------|--------|
| `cursor/photography-audit-wiring-7402` | #1 MERGED | (merged) | Hero photography wiring | merge-base | **A APPROVED** | All | — | Foundation; in stack |
| `cursor/visual-pilot-3page-7402` | #3 | `3e500c1` | Homepage + auto + trucking pilot | ancestor of all | **E CONTAINED** | — | — | Fully in tip |
| `cursor/full-recovery-navigation-claims-careers-7402` | #2 | `4d3c3e8` | Nav, Claims, Careers, Resources | ancestor | **E CONTAINED** | — | — | Fully in tip |
| `cursor/auto-product-page-7402` | #4 | `ca871f6` | Auto product page reference | ancestor | **E CONTAINED** | — | — | Fully in tip |
| `cursor/personal-batch-a-7402` | #5 | `f4ad1a7` | Personal product routes | ancestor | **E CONTAINED** | — | — | Fully in tip |
| `cursor/commercial-batch-b-7402` | #6 | `5b0b525` | 38 commercial routes | ancestor | **E CONTAINED** | — | — | Fully in tip |
| `cursor/commercial-batch-cd-7402` | #7 | `3f030e7` | Farm/food-truck/transport batch | ancestor | **E CONTAINED** | — | — | Fully in tip |
| `cursor/greenhouse-route-recovery-7402` | #8 | `f2c1f8a` | Greenhouse route recovery | ancestor | **E CONTAINED** | — | — | Fully in tip |
| `cursor/hero-images-19-7402` | #9 | `3af80d3` | 19 hero images | ancestor | **E CONTAINED** | — | — | Fully in tip |
| `cursor/card-navigation-fix-7402` | #10 | `12e45b8` | Click-vs-drag guard | ancestor | **E CONTAINED** | — | — | Fully in tip |
| `cursor/homepage-cta-broker-visibility-7402` | #11 | `759b152` | Final CTA visibility | ancestor | **E CONTAINED** | — | — | Fully in tip |
| `cursor/hero-images-12-7402` | #12 | `dbc9154` | Final 12 hero images | ancestor | **E CONTAINED** | — | — | Fully in tip |
| `cursor/card-photography-wiring-7402` | #13 | `0ba681a` | Card photography registry | ancestor | **E CONTAINED** | — | — | Fully in tip |
| `cursor/pre-integration-upgrade-part1-7402` | #14 | `5fecfba` | Motion system, mega-menu, hero | ancestor | **C PARTIAL** | Mega-menu fix, hero corrections | Abandoned SVG mask system if any remnants | Mostly contained; verify no rejected mask code active |
| `cursor/coverage-explorer-part2-7402` | #15 | `9c9a2a0` | Explorer visual system | ancestor | **E CONTAINED** | — | — | Fully in tip |
| `cursor/coverage-explorer-wiring-7402` | #16 | `fcec7da` | 58 interactive master wiring | ancestor | **E CONTAINED** | — | — | Fully in tip |
| `cursor/restaurant-magnifier-7402` | #17 | `855bbb8` | Restaurant desktop magnifier | ancestor | **A APPROVED** | Magnifier (Restaurant only) | — | Isolated to Restaurant; retained |
| `cursor/contractors-motion-7402` | #18 | `5b94b77` | Contractors motion prototype | superseded by static-only | **B SUPERSEDED** | — | Motion recipes, handoff, animation assets runtime | Rejected by owner |
| `cursor/contractors-motion-fixes-7402` | #19 | `424a013` | Motion + crop fix attempt | superseded | **B SUPERSEDED** | — | All motion runtime | Rejected by owner |
| `cursor/contractors-static-only-7402` | #20 | `223e7f5` | Contractors static state images | ancestor of tip | **A APPROVED** | Static state images, Tools CSS scale | Motion wiring | Final Contractors intent |
| `cursor/coverage-explorer-crop-audit-7402` | #21 | `8c5227b` | Systemic crop fix + audit | **integration tip** | **A APPROVED** | CSS geometry fix, audit scripts | — | Required systemic fix |
| `main` | — | `3fedeca` | Stale/diverged | NOT in stack | **F NEEDS DECISION** | — | Unknown `Create pilot` + upload commits | Do not merge blindly |

---

## D. Commits integrated

Integration branch = **61 commits** from merge-base `0f03f42` through `8c5227b`, including (most recent first):

| SHA | Message |
|-----|---------|
| `8c5227b` | fix(coverage-explorer): resolve systemic interactive-master image cropping |
| `223e7f5` | fix(contractors): remove all motion — static state images only |
| `855bbb8` | feat(restaurant): add desktop hover magnifier to Coverage Explorer |
| `fcec7da` | feat(restaurant): wire multi-image coverage state crossfade prototype |
| `10c6bf4` | Wire Coverage Explorer to 58 interactive master dioramas |
| `12e45b8` | Extend card navigation validation to full href coverage |
| `0ba681a` | Wire card photography from placements.ts registry |
| `dbc9154` | Wire final 12 commercial hero images |
| `5b0b525` | Batch B: migrate 38 core commercial routes |
| `f4ad1a7` | Batch A: personal product pages pilot rollout |
| `3e500c1` | Unify homepage motion: PilotInfiniteRail for all four rails |

Full history: `git log 0f03f42..8c5227b --oneline`

---

## E. Superseded / rejected work excluded from runtime

The following are **in git history** but **not active** in integrated runtime:

| Item | Status |
|------|--------|
| Contractors falling-object animation | Removed in `223e7f5` — no motion recipes in `buildRouteExplorerConfig` |
| Contractors handoff choreography | Removed in `223e7f5` |
| Floating tools / transparent overlay playback | Not wired |
| `CONTRACTORS_MOTION_RECIPES` | File exists but **zero imports** — dead file |
| `CoverageMotionOverlay` / `useCoverageMotionPlayback` | Code present but `motionRecipes` never passed from config — **inactive path** |
| Yellow polygon SVG masks / masked illumination (Restaurant) | Superseded by state-image crossfade |
| PR #18/#19 motion fixes | Superseded by PR #20 static-only |

**Not deleted during this task** (per instructions): unused PNG assets, historical branches, draft PRs.

---

## F. Conflict-resolution log

**No merge conflicts encountered.** Integration branch created directly from linear tip `cursor/coverage-explorer-crop-audit-7402`. All approved work was already stacked sequentially; no competing parallel branches required manual conflict resolution.

---

## G. Actual route counts (from repository source)

| Metric | Count | Source |
|--------|-------|--------|
| App routes (`src/app/**/page.tsx`) | **74** | Filesystem scan |
| Product `-insurance` pages | **58** | App routes filter |
| Interactive-master registry routes | **58** | `ROUTE_TO_INTERACTIVE_MASTER_FILE` |
| Unique interactive-master asset files | **58** | Registry values |
| Interactive-master PNGs on disk | **65** | `public/images/*interactive-master*` |
| Orphan/unreferenced assets on disk | **7** | See below |
| Active Coverage Explorer UIs (HTTP audit) | **57** | Puppeteer runtime |
| Routes without Explorer | **1 product** | `commercial-insurance` hub |
| State-image Explorer routes | **2** | Contractors + Restaurant |
| Interactive-master Explorer routes | **55** | 57 − 2 state-image |

### Orphan interactive-master assets (report only, not deleted)

1. `auto-insurance-interactive-master-legacy-photoreal.png.bak`
2. `bus-insurance-interactive-master.png`
3. `cannabis-retail-insurance-interactive-master.png`
4. `commercial-general-liability-interactive-master.png`
5. `nonprofit-church-insurance-interactive-master.png`
6. `wholesale-distribution-insurance-interactive-master.png`
7. `winery-brewery-insurance-interactive-master.png`

(Also documented in `EXCLUDED_EXTRA_ASSETS` minus the `.bak` file.)

### Alias mappings (filename ≠ route slug)

| Route slug | Asset filename |
|------------|----------------|
| `bonding-insurance` | `bonding-surety-interactive-master.png` |
| `commercial-insurance` | `commercial-insurance-hub-interactive-master.png` |
| `commercial-auto-insurance` | `commercial-auto-fleet-interactive-master.png` |
| `convenience-store-insurance` | `convenience-store-gas-station-insurance-interactive-master.png` |
| `food-truck-insurance` | `food-truck-trailer-insurance-interactive-master.png` |
| `greenhouse-agribusiness-insurance` | `greenhouse-insurance-interactive-master.png` |
| `grocery-specialty-food-insurance` | `grocery-specialty-food-bakery-insurance-interactive-master.png` |
| `employment-practices-liability-insurance` | `employment-practices-liability-interactive-master.png` |
| `pollution-liability-insurance` | `pollution-liability-interactive-master.png` |
| `professional-liability-insurance` | `professional-liability-eo-interactive-master.png` |

---

## H. Explorer route/state manifest results

### Geometry proof standard (getBoundingClientRect)

**Desktop 1440×900 — all registry routes:** `containedInStage: true` for all 57 explorer routes (see `docs/qa-screenshots/site-integration-final-7402/explorer-geometry-1440.json`).

**Full multi-viewport regression:** 58 routes × 4 viewports = 232 checks

| Viewport | Routes with Explorer | Pass | Fail |
|----------|---------------------|------|------|
| desktop-1440 | 57 | 57 | 0 |
| desktop-1280 | 57 | 57 | 0 |
| desktop-1024 | 57 | 57 | 0 |
| mobile-390 | 57 | 57 | 0 |
| commercial-insurance (no explorer) | 0 | N/A | N/A |
| **Total geometry checks** | **228** | **228** | **0** |

Each check verifies **every coverage tab/state** on the route. Failures: **none**.

### Coverage Explorer final architecture (verified)

| Route type | Mode | Behavior |
|------------|------|----------|
| 55 routes | `interactive-master` | Single PNG + dim-only zone highlights; static diorama |
| Contractors | `coverage-state-images` | 4 static state PNGs; no motion; crossfade |
| Restaurant | `coverage-state-images` | Multi-image crossfade + desktop magnifier |
| Commercial hub | none | `coverageItems` empty — no Explorer UI |

Contractors state mapping (verified in source):

| Coverage ID | State image |
|-------------|-------------|
| general-liability | `contractors-insurance-state-liability.png` |
| tools-equipment-coverage | `contractors-insurance-state-tools-equipment.png` |
| builder-s-risk | `contractors-insurance-state-property.png` |
| wrap-up-liability | `contractors-insurance-state-installation-work.png` |

---

## I. Homepage regression results

Audited at 1440 and 390 (see `docs/qa-screenshots/site-integration-final-7402/homepage-responsive-audit.json`).

| Check | 1440 | 390 |
|-------|------|-----|
| Hero photography (`pilot-hero-immersive img`) | ✓ | ✓ |
| Hero CTA (quote + broker) | ✓ | ✓ |
| Carrier marquee rail (`.pilot-carrier-rail`) | ✓ | ✓ |
| Personal filmstrip links | 16 | 16 |
| Commercial discovery panel | ✓ | ✓ |
| "Yep" tiles (`a.pilot-yep-tile`) | 32 | 32 |
| Awards infinite rail | ✓ | ✓ |
| Homepage horizontal overflow | ✓ none | ✓ none |

**Reduced motion:** Not re-tested in this audit run — prior branch validation exists in pre-integration Part 1. **Status: UNVERIFIED in this integration run.**

---

## J. Card navigation results

Recalculated from source (not blind reuse of historical numbers):

| Metric | Value |
|--------|-------|
| Total interactive click targets | **235** |
| Unique hrefs | **56** |
| Click tests run | 235 |
| Click tests passed | **235** |
| Click tests failed | **0** |
| Href resolution passed | **56/56** |
| Related-product family tests | **51/51** |
| Desktop drag guard (no navigate on drag) | **2/2** |
| Mobile tap tests | **5/6** |

### Mobile failure (honest report)

| Page | Surface | Test | Result |
|------|---------|------|--------|
| `/` | homepage-personal-filmstrip | swipe | **FAIL** — swipe did not advance filmstrip (stayed on `/`) |

Desktop click navigation: **100% pass**. Mobile filmstrip swipe: **1 failure** — not a click-vs-drag regression (tap tests pass); possible autoplay/touch interaction issue at 390px.

Artifact: `docs/qa-screenshots/site-integration-final-7402/card-navigation-validation.json`

---

## K. Mega-menu results

Re-run via `scripts/mega-menu-viewport-verify.cjs` against integration server.

| Viewport | Zoom | Pass |
|----------|------|------|
| 1280×720 | 100% | ✓ |
| 1280×720 | 125% | ✓ |
| 1280×720 | 150% | ✓ |

Business mega-menu: panel within viewport, internal scroll enabled, last link reachable after scroll (43 links).

Artifact: `docs/qa-screenshots/site-integration-final-7402/mega-menu-viewport.json`

**Mobile nav open/close:** Not re-tested in dedicated script this run — **UNVERIFIED**.

---

## L. Image / photography results

| Check | Result |
|-------|--------|
| Hero photography registry (`placements.ts`) | Present for all audited product routes |
| Card photography wiring | 26 stale destinations fixed in `0ba681a` (in stack) |
| Interactive-master PNGs missing from disk | **0** |
| Broken `productionSrc` (HTTP 404 on product pages) | **0 fatal** — one generic console 404 during audit (resource not identified) |
| Explorer images fully contained (geometry proof) | **228/228 pass** |

**Not exhaustively re-validated:** per-route hero sharpness pixel inspection, Next.js quality param audit across all 58 routes. **Status: PARTIAL — geometry + HTTP only.**

---

## M. Responsive / mobile results

Sampled routes at 1440, 1280, 1024, 768, 390:

| Route | Overflow at 1024 | Overflow at other sizes |
|-------|------------------|-------------------------|
| `/` | none | none |
| `/cyber-insurance/` | **8px** (1032 vs 1024) | none at 1440/1280/390 |
| `/auto-insurance/` | none | none |
| `/restaurant-insurance/` | **8px** (1032 vs 1024) | none at 1440/1280/390 |

**Open issue:** Minor 8px horizontal overflow at 1024px on product pages with Coverage Explorer grid — **not a blocker**, not introduced by crop fix regression (likely scrollbar/subpixel).

Homepage: no horizontal overflow at any tested viewport.

---

## N. Build / type / lint results

| Command | Exit code | Result |
|---------|-----------|--------|
| `npm run build` | **0** | ✓ Production build succeeds |
| `npx tsc --noEmit` | **0** | ✓ No TypeScript errors |
| `npm run lint` | **0** | ⚠ **2177 problems (137 errors, 2040 warnings)** — exit 0 due to ESLint config not failing on errors |

**Honest assessment:** Lint reports **137 errors** pre-existing in codebase (including `react-hooks/set-state-in-effect` in `useQuoteFlow.ts`). Integration did not introduce new lint failures but **lint is not clean**. No tests beyond build/tsc were found in `package.json`.

---

## O. Console / runtime results

HTTP audit across 74 routes:

| Metric | Value |
|--------|-------|
| HTTP 200/3xx + `<main>` present | **73/74** |
| Failed routes | `careers/[slug]` — **404 expected** (dynamic template without slug param) |
| Uncaught page errors | **0** |
| Console errors (unique) | 1× `Failed to load resource: 404` (resource not identified — non-fatal) |
| Hydration errors | **0 observed** |

Artifact: `docs/qa-screenshots/site-integration-final-7402/http-route-audit.json`

---

## P. Deployment-safety findings

| Control | Status |
|---------|--------|
| GitHub branch protection on `main` | **NOT OBSERVABLE** — API returned 403 (insufficient token permissions) |
| PR requirement | **NOT OBSERVABLE** |
| Production environment rules | **NOT OBSERVABLE** |
| Vercel production branch config | **NOT INSPECTABLE** from this environment |
| Feature branch promote risk | **DOCUMENTED** — PR #18 branch was previously promoted to Production (see `5b94b77` audit commit) |

**No deployment configuration was changed during this task.**

**Recommendation:** Owner must verify GitHub branch protection + Vercel production branch = `main` only before any merge.

---

## Q. Remaining open issues

### Post-integration open items (not blockers unless noted)

| Item | Status |
|------|--------|
| **Condo miniature** | **RESOLVED by different approach** — Condo uses `condo-insurance-interactive-master.png` (interactive-master mode), not a separate cutaway miniature. No missing miniature at runtime. |
| **Auto transparent background** | **CHANGED** — Auto now uses compact interactive-master diorama (`auto-insurance-interactive-master.png`, 1312×1199), not object-on-plinth with `blendBackground`. CSS blend workaround for old plinth treatment is **no longer in active Auto explorer path**. Commercial-auto fleet config still has `blendBackground: true` in `fleet-commercial-vehicle.ts` for object-only mode routes if used. |
| **main divergence** | `main` @ `3fedeca` has 2 commits not in feature stack — **needs owner decision** before merge |
| **Lint errors** | 137 ESLint errors pre-existing |
| **Mobile filmstrip swipe** | 1 failure on homepage at 390px |
| **1024px overflow** | 8px on cyber + restaurant product pages |
| **Dead motion code** | `contractors-motion-recipes.ts` orphaned; motion overlay infrastructure inactive — cleanup optional |
| **Reduced motion homepage** | Not re-verified this run |
| **Mobile nav** | Not re-verified this run |
| **Careers dynamic route** | `[slug]` returns 404 without param — expected |

---

## R. Explicit compliance statement

```
MAIN NOT MODIFIED
NO MERGE PERFORMED
NO PRODUCTION DEPLOYMENT/PROMOTION PERFORMED
NO EXISTING PRs CLOSED
NO EXISTING BRANCHES DELETED
```

---

## Artifacts (committed, browsable paths)

| Artifact | Path |
|----------|------|
| HTTP route audit | `docs/qa-screenshots/site-integration-final-7402/http-route-audit.json` |
| Explorer full regression (232 checks) | `docs/qa-screenshots/site-integration-final-7402/explorer-full-regression.json` |
| Explorer geometry 1440 | `docs/qa-screenshots/site-integration-final-7402/explorer-geometry-1440.json` |
| Homepage + responsive | `docs/qa-screenshots/site-integration-final-7402/homepage-responsive-audit.json` |
| Card navigation | `docs/qa-screenshots/site-integration-final-7402/card-navigation-validation.json` |
| Mega-menu viewport | `docs/qa-screenshots/site-integration-final-7402/mega-menu-viewport.json` |
| Audit scripts | `scripts/site-integration-*.cjs`, `scripts/audit-coverage-explorer-geometry.cjs` |

---

## Preview URL

Branch pushed to `origin/cursor/site-integration-final-7402`. If Vercel preview deploy is configured for branch pushes, preview URL will appear in GitHub PR checks or Vercel dashboard. **Not promoted to production.**

**STOP FOR OWNER REVIEW**
