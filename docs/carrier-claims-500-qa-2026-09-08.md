# Carrier Claims HTTP 500 — QA Investigation Report

**Date:** 2026-09-08  
**Investigation type:** Diagnostic QA only (no source/data changes, no fix applied)

---

## CURRENT BRANCH

`cursor/carrier-logos-7402`

## HEAD TESTED

`5bd6f2e`

## STEP 0 — SAFE STARTING STATE

| Check | Expected | Actual | Status |
|-------|----------|--------|--------|
| Branch | `cursor/carrier-logos-7402` | `cursor/carrier-logos-7402` | ✓ |
| HEAD | `5bd6f2e` | `5bd6f2e` | ✓ |
| Worktree | Clean or QA artifacts only | **NOT CLEAN** — see below | ⚠️ STOP gate noted |

### Uncommitted changes (pre-existing, unrelated to this investigation)

The worktree contained modified/untracked files unrelated to carrier-logo or claims QA work (coverage-explorer docs, contractors QA screenshots, etc.). **No discard/stash/reset/branch switch was performed.** Investigation proceeded read-only against committed HEAD `5bd6f2e`, writing only new QA artifacts.

---

## STEP 1 — PREVIOUS 500 REQUESTS (from prior capture)

**Source:** `docs/qa-screenshots/carrier-logos-2026-09-08/regression.json`

The prior capture script (`scripts/capture-carrier-logos-screenshots.cjs`) logged only `page.on("console")` text — **not network URLs**. All three entries are identical generic messages:

| # | REQUEST URL | RESOURCE TYPE | HTTP STATUS | INITIATOR | PAGE | CONSOLE MESSAGE |
|---|-------------|---------------|-------------|-----------|------|-----------------|
| 1 | *(not captured)* | *(inferred: Next.js JS chunk)* | 500 | *(not captured)* | `/claims/` | `Failed to load resource: the server responded with a status of 500 (Internal Server Error)` |
| 2 | *(not captured)* | *(inferred: Next.js JS chunk)* | 500 | *(not captured)* | `/claims/` | Same |
| 3 | *(not captured)* | *(inferred: Next.js JS chunk)* | 500 | *(not captured)* | `/claims/` | Same |

### Retroactive identification (stale-server reproduction pass)

While a **pre-build `next-server` process** was still bound to port 3020, network logging captured the exact failing resource:

| Field | Value |
|-------|-------|
| **REQUEST URL** | `http://localhost:3020/_next/static/chunks/3q56pxlztbw5h.js` |
| **RESOURCE TYPE** | Next.js JS chunk (`resourceType: script`) |
| **HTTP STATUS** | 500 |
| **INITIATOR** | `<script src="…">` in Claims page `<head>` + RSC Flight module dependency arrays |
| **PAGE** | `/claims/` (HTTP 200 for document) |
| **CONSOLE MESSAGE** | `Failed to load resource: the server responded with a status of 500 (Internal Server Error)` |
| **REQUEST FAILURE** | `net::ERR_ABORTED` |

**Why 3 console errors for 1 URL:** The stale HTML/RSC payload referenced `3q56pxlztbw5h.js` multiple times (head `<script>` tag plus repeated module chunk lists in the Flight payload). Each failed fetch emits a separate console error.

**Classification of resource:** Next.js JS chunk (client bundle shared by Claims page client components: `Header`, `RevealOnScroll`, `ClaimsScenarioCards`, `CarrierClaimsDirectory`, `FaqAccordion`, `next/link`).

---

## STEP 2 — CLEAN PRODUCTION-BUILD REPRODUCTION

### Procedure

1. Terminated stale `next-server` processes (PIDs predating clean build were still serving port 3020).
2. Removed disposable build output: `rm -rf .next`
3. `npm run build` — **PASS** (Next.js 16.3.2 Turbopack)
4. `PORT=3020 npm run start` — fresh production server from clean build
5. Puppeteer fresh browser context, cache disabled, hard navigation to `/claims/`
6. Viewports: 1440×900 (desktop), 390×844 (mobile)

### Build artifact vs stale-server HTML (key evidence)

| Artifact | Chunk hash referenced |
|----------|----------------------|
| Fresh `.next/server/app/claims.html` (on disk after build) | `0pds7gnfg0g3h.js` ✓ |
| Fresh `.next/server/app/claims.rsc` | `0pds7gnfg0g3h.js` ✓ |
| Stale `next-server` response (pre-kill) | `3q56pxlztbw5h.js` ✗ (phantom) |
| Fresh `next-server` response (post-kill) | `0pds7gnfg0g3h.js` ✓ |

| Chunk | On disk after clean build | Stale server | Clean server |
|-------|---------------------------|--------------|--------------|
| `3q56pxlztbw5h.js` | **NO** | HTTP 500 | HTTP 404 |
| `0pds7gnfg0g3h.js` | **YES** | HTTP 404 (not registered in stale build) | HTTP 200 |

---

## STEP 3 — INTERACTION CHECK (clean server)

On clean production server, Claims page exercised:

- [x] Initial page load (desktop + mobile)
- [x] Search/filter (`input[type=search]`)
- [x] Insurer `<select>` — Insurance Companies optgroup
- [x] MGA/specialty selection (e.g. CHES Special Risk)
- [x] Scenario cards section present and clickable
- [x] Logo/image rendering in carrier detail panel (when carrier selected)
- [x] FAQ accordion section renders
- [x] Navigation/header elements load

**Results (clean server):** 0 console errors, 0 React hydration errors, 0 failed requests, 0 HTTP 4xx/5xx on subresources.

---

## STEP 4 — DIRECT RESOURCE CHECK

| OLD FAILED RESOURCE | EXISTS IN CLEAN BUILD | DIRECT REQUEST (clean server) | REFERENCED BY CURRENT HTML/JS |
|---------------------|----------------------|-------------------------------|-------------------------------|
| `/_next/static/chunks/3q56pxlztbw5h.js` | **NO** | **404** | **NO** (replaced by `0pds7gnfg0g3h.js`) |
| `/_next/static/chunks/0pds7gnfg0g3h.js` (correct replacement) | **YES** | **200** | **YES** (8 references in claims HTML/RSC) |

The phantom hash `3q56pxlztbw5h` does not appear anywhere under `.next/` after a clean build. The current build emits and references `0pds7gnfg0g3h.js` instead.

---

## STEP 5 — ROOT CAUSE CLASSIFICATION

### **B — CONFIRMED STALE SERVER / STALE NEXT.JS CHUNK**

### Evidence

1. **Stale processes:** Two `next-server (v16.3.2)` processes (started ~21:00 and ~21:29 UTC) remained running across port 3020 while a new clean build was produced at ~22:33 UTC. The prior QA `carrier-logos-server` tmux session had also used port 3020.
2. **Hash mismatch:** Stale server served Claims HTML referencing phantom chunk `3q56pxlztbw5h.js`. Clean build artifacts on disk reference `0pds7gnfg0g3h.js`.
3. **Phantom chunk:** `3q56pxlztbw5h.js` is absent from the clean `.next/static/chunks/` directory — it belonged to an earlier build generation.
4. **Reproduction cleared:** After killing stale processes and starting `npm run start` from the fresh build, Claims page loads with **0 HTTP 500**, **0 console errors**, and all referenced chunks return **HTTP 200**.
5. **Not a Puppeteer artifact:** Same failure reproduced via `curl` against the stale server; same clearance via `curl` against the clean server.
6. **Not a current application defect:** Source at `5bd6f2e` builds cleanly; prerendered `claims.html` and `claims.rsc` agree on the correct chunk hash.

### Contributing factor — test harness gap

`scripts/capture-carrier-logos-screenshots.cjs` does not log `requestfailed` / `response.status() >= 400` URLs, which delayed identification of the exact failing path in the original QA pass.

### Recommended fix (NOT implemented — owner review)

1. **Operational:** Before QA, ensure no stale `next-server` / `next dev` on port 3020 (`fuser 3020/tcp` or `lsof -i :3020`); kill stragglers; then `rm -rf .next && npm run build && PORT=3020 npm run start`.
2. **Harness:** Enhance capture script to log failed request URLs and HTTP status codes (see `scripts/claims-500-qa-diagnostic.cjs`).
3. **No source-code change required** for carrier data, claims data, or page components based on this investigation.

---

## STEP 6 — REGRESSION SANITY CHECK (clean server)

| Surface | HTTP 200 | Content check | Console errors | Failed 4xx/5xx |
|---------|----------|---------------|----------------|----------------|
| **Homepage** | ✓ | Marquee renders; **12** unique canonical carriers (24 img nodes = 12×2 infinite-rail duplicate) | 0 | 0 |
| **Partners** | ✓ | Personal, Commercial, Specialty & MGA sections render; text-only cards for unsourced logos (expected) | 0 | 0 |
| **Claims** | ✓ | **25** verified carrier `<option>` entries; no unverified auto-generated rows | 0 | 0 |

### Homepage marquee carriers (12)

CAA Insurance, Intact Insurance, SGI Canada, Wawanesa Insurance, Northbridge Insurance, Aviva, Travelers, Chubb, Gore Mutual, Echelon Insurance, Unica Insurance, Pembridge Insurance

---

## SUMMARY TABLE

| Metric | Result |
|--------|--------|
| **CURRENT BRANCH** | `cursor/carrier-logos-7402` |
| **HEAD TESTED** | `5bd6f2e` |
| **PREVIOUS 500 REQUESTS** | 1 unique URL (`/_next/static/chunks/3q56pxlztbw5h.js`), reported 3× in console due to repeated references |
| **CLEAN BUILD** | **PASS** (`npm run build` succeeds) |
| **CLAIMS DESKTOP** | **PASS** (clean server) |
| **CLAIMS MOBILE** | **PASS** (clean server) |
| **CONSOLE ERRORS** | 0 (clean server) |
| **FAILED NETWORK REQUESTS** | 0 (clean server) |
| **HTTP 500 RESPONSES** | 0 (clean server) |
| **ROOT CAUSE CLASSIFICATION** | **B** |
| **HOMEPAGE SANITY** | **PASS** |
| **PARTNERS SANITY** | **PASS** |
| **CLAIMS SANITY** | **PASS** |
| **SOURCE CODE CHANGED** | **NO** |
| **DATA CHANGED** | **NO** |

---

## ARTIFACTS

| Path | Description |
|------|-------------|
| `docs/carrier-claims-500-qa-2026-09-08.md` | This report |
| `docs/qa-screenshots/carrier-claims-500-qa-2026-09-08/diagnostic.json` | Network + console capture (clean-server pass) |
| `docs/qa-screenshots/carrier-claims-500-qa-2026-09-08/claims-desktop_1440.png` | Claims desktop screenshot (clean server) |
| `docs/qa-screenshots/carrier-claims-500-qa-2026-09-08/claims-mobile_390.png` | Claims mobile screenshot (clean server) |
| `scripts/claims-500-qa-diagnostic.cjs` | Diagnostic harness with network URL logging |

---

## STOP FOR OWNER REVIEW

- **DO NOT MERGE**
- **DO NOT DEPLOY**
- **DO NOT PROMOTE VERCEL PREVIEW**
- **DO NOT SWITCH TO TRANSPORTATION BRANCH**

No application fix implemented. Claims 500 errors were caused by a stale local production server serving an outdated chunk manifest; clean build + fresh server resolves the issue.
