# Pre-Launch Batch 5 — Controlled Vercel Production Deployment + Operational E2E Gate

**Date:** 2026-09-10  
**Repository:** `nibbles33/PREMIUM_WEBSITE-`  
**Approved source baseline:** `1514588` (`15145889acead838b44a16db8d352fd45c45cdf3`)
**Source branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Merge vehicle branch:** `cursor/batch5-vercel-production-gate-2026-09-10`  
**PR:** [#24](https://github.com/nibbles33/PREMIUM_WEBSITE-/pull/24)  
**Merge commit (squash on `main`):** `f74d5d8afb635bd7a86dee08950d2551bee7d5e5`
**Main parent before merge:** `b7a4bb8c996b902022a23f4efad034c224b5d86c`
**Vercel Production test URL:** https://premium-website-chi.vercel.app/
**Custom domain cutover:** **NOT PERFORMED** (WordPress remains live on premiumib.com)

---

## Authorization boundary (honored)

| Authorized | Not authorized |
|------------|----------------|
| Merge approved rebuild to `main` after gates | Change premiumib.com / www DNS |
| Vercel Production deploy from `main` | Attach custom domains to Vercel |
| Test at `premium-website-chi.vercel.app` | Replace / remove WordPress |
| Operational Contact / Quote / Careers E2E | Resend DNS / registrar changes |
| | Disclosure PDF edit |

---

## A. Source / main preflight

| Field | Value |
|-------|-------|
| CURRENT SOURCE BRANCH | `cursor/coverage-explorer-ux-v2-2026-09-07` (merged via batch-5 vehicle branch) |
| SOURCE HEAD (approved) | `1514588` — confirmed included |
| EXPECTED SOURCE HEAD | `1514588` |
| MAIN HEAD BEFORE | `b7a4bb8c996b902022a23f4efad034c224b5d86c` |
| SOURCE CLEAN/DIRTY | Dirty unrelated QA screenshots present — **stashed, not merged** |
| MAIN DIVERGENCE | Main carried Cannabis asset-upload commits. Source later restored identical bytes. Merge probe found **10 add/add binary conflicts** (auto interactive master + contractors animation assets); resolved **favoring source `1514588`**. |
| MERGE BASE | Historical `0f03f42…` family |
| UNTRACKED / UNRELATED | QA screenshots — excluded from merge |

### Change summary entering main (by category)

| Category | Summary |
|----------|---------|
| product/content | Full rebuild product library; grades **A44 / B16 / C0 / D0**; **60** product routes |
| homepage | Personal 14, Commercial 10/10 · 54/54, carrier marquee 12 logical carriers × 4 sequences |
| navigation | Desktop/mobile Personal 14/14; broker CTA → `/contact/?intent=broker` |
| Personal | Hub `/personal/`; zero accidental zero-discovery |
| Commercial | Hub `/commercial-insurance/` |
| Partners | Unified public collection **44/44** |
| Claims | Verified directory **25/25** |
| forms/API | Contact / Quote / Careers (`DATABASE_URL` + Resend + Blob) |
| SEO | `metadataBase` / canonicals → `https://premiumib.com` + trailing slash |
| redirects/410s | **10** permanent + **49** Gone; `/pool-and-spa/` + `/faqs/` → 410 |
| assets | Cannabis + carrier/partner images; disclosure PDF path preserved |
| test/report files | Prior batch docs/verifiers; **this report** |

**CONFLICT RISK:** MEDIUM (binary add/add) — resolved safely favoring approved source.

---

## B. Exact merge diff

- **PR #24** squash-merged to `main`.
- Merge commit: **`f74d5d8afb635bd7a86dee08950d2551bee7d5e5`**.
- Parent before merge: **`b7a4bb8c996b902022a23f4efad034c224b5d86c`**.
- Diff = approved rebuild vs prior main tip, with conflict resolutions preferring `1514588`.
- **No secrets, no `.env` values, no DNS config, no WordPress mods, no unrelated screenshots** in the merged PR.

---

## C. Protected regression (pre-merge)

Local pre-merge gates on approved history: **PASS**

| Gate | Result |
|------|--------|
| `npm run build` / `npx tsc --noEmit` | PASS |
| Personal discovery | 14/14 homepage · desktop · mobile · hub; zero-discovery **0** |
| Commercial homepage | **10/10 · 54/54** |
| Partners / Claims | **44/44 · 25/25** |
| Content grades | **A44 / B16 / C0 / D0** |
| Product routes | **60** |
| Explorer | **236/236** (pre-merge suite) |
| SEO / navigation | PASS |
| Carrier marquee ultrawide | 1440–3840 PASS; **0** gaps |
| Legacy | **10** redirects · **49** Gone · **0** loops · **0** chains |
| Broker journey | PASS |

---

## D. Production environment audit

Vercel CLI **not authenticated** in this agent environment (no `vercel` binary / no token). Secret values were **never printed**.

Inference from live API behavior against Production URL:

| VARIABLE | STATUS | ENVIRONMENT SCOPE | NOTES |
|----------|--------|-------------------|-------|
| `DATABASE_URL` | **PRESENT** | Production (inferred) | Contact + Quote returned UUIDs (DB write succeeded) |
| `RESEND_API_KEY` | **CANNOT VERIFY** | Production | Quote returned `notified: false` (key missing **or** Resend API error) |
| `RESEND_FROM_EMAIL` | **CANNOT VERIFY** | Production | Code defaults to `onboarding@resend.dev` if unset |
| `QUOTE_NOTIFY_TO` | **CANNOT VERIFY** | Production | Optional; defaults to `info@premiumib.com` |
| `CONTACT_NOTIFY_TO` | **CANNOT VERIFY** | Production | Optional; defaults to `info@premiumib.com` |
| `CAREERS_NOTIFY_TO` | **CANNOT VERIFY** | Production | Optional; defaults to `info@premiumib.com` |
| `BLOB_READ_WRITE_TOKEN` | **MISSING** | Production (inferred) | Careers API returned explicit 503 resume-upload-not-configured |

### Additional vars referenced in source

Only the variables above. APIs: `src/app/api/contact-submit`, `src/app/api/quote-submit`, `src/app/api/job-apply`.

---

## E. Resend audit

| Item | Finding |
|------|---------|
| Quote API | `POST /api/quote-submit/` → persists then Resend notify; response includes `notified` |
| Contact API | `POST /api/contact-submit/` → persists then Resend notify (**no** `notified` in JSON) |
| Shared FROM helper | `src/lib/email/resendConfig.ts` — `RESEND_FROM_EMAIL` or sandbox `onboarding@resend.dev` |
| CURRENT FROM | **CANNOT VERIFY** (env opaque); sandbox default if unset |
| CURRENT QUOTE TO | `QUOTE_NOTIFY_TO` or `info@premiumib.com` |
| CURRENT CONTACT TO | `CONTACT_NOTIFY_TO` or `info@premiumib.com` |
| DOMAIN VERIFIED | **CANNOT VERIFY** (no Resend dashboard access) |
| Production evidence | Quote E2E: `notified: false` on multiple submissions |

**RESEND DOMAIN VERIFICATION REQUIRED** before treating email as production-ready. Do **not** invent DNS records in this batch.

---

## F. DB audit

| Item | Status |
|------|--------|
| `DATABASE_URL` | **PRESENT** (inferred) |
| Quote table (`quote_leads` + rate limits) | **READY** (live insert succeeded) |
| Contact table (`contact_messages` + rate limits) | **READY** (live insert succeeded) |
| Careers storage (`job_applications`) | **CANNOT VERIFY** — blocked before DB by missing Blob token |
| Migrations | Schema auto-`CREATE TABLE IF NOT EXISTS` on first use — no destructive migration run |

---

## G. Blob / Careers audit

| Item | Status |
|------|--------|
| Careers API code | Ready in source |
| `BLOB_READ_WRITE_TOKEN` | **MISSING** on Production |
| Database | **CANNOT VERIFY** this env (Blob gate first) |
| Email | **CANNOT VERIFY** (not reached) |
| **CAREERS API (live)** | **NOT READY** — HTTP 503 |

Exact Production response:

```json
{"ok":false,"error":"Resume upload is not configured on this environment. Please email your resume to info@premiumib.com and include the position you are applying for."}
```

---

## H. PR / merge

| Item | Value |
|------|-------|
| PR | **#24** — *Pre-launch approved rebuild for Vercel production testing* |
| Strategy | **Squash merge** (repo ruleset allows squash) |
| Merge | **COMPLETED** 2026-09-10T21:23:13Z |
| Merge commit | `f74d5d8afb635bd7a86dee08950d2551bee7d5e5` |
| Merged source lineage | includes approved `1514588` |

---

## I. Vercel deployment

| Item | Value |
|------|-------|
| GitHub Production deployment id | `6381447122` |
| Deployed git SHA | `f74d5d8afb635bd7a86dee08950d2551bee7d5e5` |
| Status | **success** (“Deployment has completed”) |
| Vercel deployment id (from asset URLs) | `dpl_GNSuv5k6NgJ1mE8io2XwR2x8Y1b4` |
| Dashboard target observed | `https://vercel.com/nabil-g-s-projects/premium-website/GNSuv5k6NgJ1mE8io2XwR2x8Y1b4` |
| Vercel Production URL | https://premium-website-chi.vercel.app/ |
| Alternate deployment hostname observed | `premium-website-piagrbgan-nabil-g-s-projects.vercel.app` |
| **CUSTOM DOMAIN CHANGES** | **NONE** |

---

## J. Production smoke test (`premium-website-chi.vercel.app`)

| Path | HTTP | Notes |
|------|------|-------|
| `/` | 200 | Rebuild homepage |
| `/personal/` | 200 | Hub |
| `/commercial-insurance/` | 200 | Commercial hub (**not** `/commercial/`) |
| `/auto-insurance/` | 200 | |
| `/cannabis-retail-insurance/` | 200 | |
| `/cannabis-producer-insurance/` | 200 | |
| `/partners/` | 200 | |
| `/claims/` | 200 | |
| `/contact/` | 200 | Form present |
| `/get-a-quote/` | 200 | Quote flow (**not** `/quote/`) |
| `/careers/` | 200 | Form present |

Alias 404s expected for shorthand `/commercial/` and `/quote/` (not product routes).

API note: middleware trailing-slash enforce returns **308** for `/api/*` without slash; clients must POST to `/api/.../`.

---

## K. Redirects / 410s (Production)

`BASE_URL=https://premium-website-chi.vercel.app node scripts/validate-legacy-cutover.cjs`:

| Metric | Result |
|--------|--------|
| Permanent redirects | **10/10 VALID** (20 slash variants PASS) |
| Gone paths | **49/49** → HTTP 410 |
| Loops | **0** |
| Chains | **0** |
| `/talk-to-a-broker/` | 308 → `/contact/?intent=broker` |
| `/pool-and-spa/`, `/faqs/`, `/blog/` | 410 |
| Disclosure PDF | 200 |

Note: static theme asset URLs with file extensions are **outside** middleware matcher (by design); e.g. hello-elementor `.js` may 403/404 rather than 410 — not part of the 49 HTML Gone set.

---

## L. Contact E2E

| Check | Result |
|-------|--------|
| CONTACT UI | **PASS** (`/contact/` renders form) |
| CONTACT API | **PASS** — `POST /api/contact-submit/` → `200 {"ok":true,"id":"..."}` |
| CONTACT DB | **PASS** (id returned) |
| CONTACT EMAIL | **FAIL** (inferred) — shared Resend path; Quote `notified:false`; inbox not observable here |
| CONTACT TEST RECORD IDS | Earlier session + `e5f9fd01-6e08-45f2-80de-6442569acf61` (Batch 5 B) |

Payload marker: *Prelaunch Contact Test* / *Production prelaunch E2E test — safe to delete.*

---

## M. Quote E2E (high-priority gate)

| Check | Result |
|-------|--------|
| QUOTE UI | **PASS** (`/get-a-quote/`) |
| QUOTE API | **PASS** — HTTP 200 `ok:true` |
| QUOTE DB | **PASS** |
| QUOTE NOTIFICATION ATTEMPT | **FAIL** (`notified: false`) |
| QUOTE NOTIFIED FLAG | **FALSE** |
| QUOTE EMAIL RECEIVED | **NO** / **CANNOT VERIFY** inbox — flag proves send did not succeed |
| Record IDs | Earlier session + `5fd3fd88-5aad-4ac2-af3a-04e42c6f19e0` (Batch 5 B, `notified:false`) |

**Quote must not be marked operational PASS while email fails.**

---

## N. Quote email diagnosis / fix

| Classification | Detail |
|----------------|--------|
| **ROOT CAUSE** | **CANNOT DETERMINE** exact subclass without Vercel runtime logs |
| Narrowed set | `MISSING RESEND_API_KEY` **or** `RESEND API ERROR` **or** `UNVERIFIED SENDER DOMAIN` / sandbox FROM |
| Evidence | Consistent `notified:false` after successful DB save; no agent access to Production logs or Resend dashboard |
| Safe code fix without DNS? | **None applied** — failure is environmental / sender verification |
| Owner action | Configure Production `RESEND_API_KEY`, set `RESEND_FROM_EMAIL` to a **verified** Premium sender (e.g. `website@premiumib.com`), confirm `QUOTE_NOTIFY_TO` / `CONTACT_NOTIFY_TO`. If domain unverified → **OWNER ACTION — RESEND DOMAIN VERIFICATION** (DNS outside this batch) |

---

## O. Careers E2E

| Check | Result |
|-------|--------|
| CAREERS UI | **PASS** |
| CAREERS API | **FAIL** — 503 Blob not configured |
| CAREERS BLOB | **FAIL** / token **MISSING** |
| CAREERS DB | **CANNOT VERIFY** |
| CAREERS EMAIL | **CANNOT VERIFY** |

Owner action: set Production `BLOB_READ_WRITE_TOKEN`, then re-run one marked test application.

---

## P. Homepage responsive QA (Production)

Puppeteer coverage against Production URL (carrier + rails):

| Width | Result |
|-------|--------|
| 390 / 768 / 1024 | PASS |
| 1440 / 1920 / 2560 / 3440 / 3840 | PASS |

Carrier: **12 approved logical carriers** (10 under `/images/carriers/` + Travelers + Unica under `/images/partners/`); **0 visible gaps** in ultrawide verifier.

---

## Q. Personal production QA

| Surface | Result |
|---------|--------|
| Homepage | **14/14** |
| Desktop nav | **14/14** |
| Mobile nav | **14/14** |
| Personal hub (tab click-through) | **14/14** |
| Zero discovery | **0** |
| Product route HTTP | all 14 → 200 |

---

## R. Commercial production QA

| Metric | Result |
|--------|--------|
| Categories | **10/10** |
| Homepage placements | **54/54** |
| Hub | `/commercial-insurance/` 200 |

---

## S. Partners / Claims

| Metric | Result |
|--------|--------|
| Partners | **44/44** unified collection |
| Claims | **25/25** verified carriers (source + page live) |

---

## T. Production SEO

| Check | Result |
|-------|--------|
| Homepage title | Premium Insurance Brokers \| Personal & Business Insurance in Windsor-Essex |
| Canonical | **`https://premiumib.com/`** (not rewritten to vercel.app) |
| robots meta | `index, follow` |
| og:url | `https://premiumib.com/` |
| sitemap.xml | 200; hosts **premiumib.com** only (0× vercel.app) |
| robots.txt | 200 |

**Owner recommendation (optional, non-blocking for this test URL):** add temporary Vercel hostname anti-indexing (e.g. middleware noindex **only** when `Host` is `*.vercel.app`) **without** changing `metadataBase` or premiumib.com canonicals. Not applied silently in this batch.

**Indexing note:** `premium-website-chi.vercel.app` currently emits `index,follow` while canonical points at premiumib.com — generally OK for SEO intent, but the Vercel hostname itself could still be crawled.

---

## U. Disclosure status

| Item | Status |
|------|--------|
| Path | `/wp-content/uploads/2025/05/disclosure.pdf` |
| Production | **200** application/pdf (~115 KB) |
| Known typo | **CONFIRMED** — extracted text contains `226 780 6000` |
| Correct number | Still required: **226-782-6000** |
| PDF edited? | **NO** |
| Vercel test deployment blocker | **NO** |
| Public cutover blocker | **YES** |

---

## V. GitHub / Vercel safeguards

| Item | Status |
|------|--------|
| GitHub main protected | **YES** — ruleset **Protect main** (`22498266`), enforcement active |
| Direct main push | **BLOCKED** (PR required) |
| Force push / deletion | Blocked (`non_fast_forward`, `deletion`) |
| Conversation resolution | Required |
| Allowed merge methods | **squash** |
| Vercel production branch | **`main`** (Production deployments track main) |
| Preview manual promotion | **CANNOT VERIFY** (no Vercel project settings access) |
| Production protection status | **ACTION REQUIRED** — owner should confirm Vercel Deployment Protection / disable unprotected Promote-to-Production if available |

Recommended Vercel menu path (owner):  
**Project → Settings → Deployment Protection** (and Git → Production Branch = `main` only). Ensure previews cannot be casually promoted over Production without review.

---

## W. WordPress / DNS safety

| Check | Result |
|-------|--------|
| `https://premiumib.com/` | **WordPress still live** (`wp-json`, `x-nginx-cache: WordPress`) |
| DNS cutover | **NOT PERFORMED** |
| Custom domain on new Vercel project | **NO** |
| If WP had disappeared | would STOP IMMEDIATELY — **did not occur** |

---

## X. Remaining operational blockers

1. **Quote / Contact email** — `notified:false`; configure Resend Production env + verified sender domain (DNS may be required).
2. **Careers Blob** — set `BLOB_READ_WRITE_TOKEN` on Production.
3. **Vercel CLI/env visibility** — agent could not list env matrix; owner should confirm scopes in dashboard.
4. **Optional:** temporary noindex for `*.vercel.app` hostnames.
5. **Test data cleanup** — leave Batch 5 records (IDs below) until owner deletes from Postgres; tooling here has no DB URL.

---

## Y. Public-cutover readiness

| Item | Ready? |
|------|--------|
| Use Vercel Production URL for owner review | **YES** (with known ops gaps) |
| Cut over premiumib.com | **NO** |

Public cutover blockers:

1. Corrected disclosure PDF (phone typo)
2. Resend domain verification + reliable Quote/Contact email receipt proof
3. Careers Blob configured + one successful application E2E
4. Explicit owner authorization for DNS / custom domain attach
5. Confirm Vercel Production protection settings

---

## Test data inventory (do not delete real submissions)

| Type | Identifier | Marker |
|------|------------|--------|
| Contact | `e5f9fd01-6e08-45f2-80de-6442569acf61` | Prelaunch Contact Test B |
| Quote | `5fd3fd88-5aad-4ac2-af3a-04e42c6f19e0` | PRELAUNCH QUOTE TEST B (`notified:false`) |
| Prior Contact/Quote | Created earlier in Batch 5 session (same markers; keep for cleanup) | Prelaunch / PRELAUNCH |
| Careers | *(none created)* | blocked by Blob |

Cleanup: **deferred** — no safe DB admin access from this agent.

---

## Final operational classification

| Area | Classification |
|------|----------------|
| VERCEL PRODUCTION DEPLOYMENT | **PASS** |
| CONTACT | **PARTIAL** — UI/API/DB PASS; email FAIL |
| QUOTE | **FAIL** as operational gate (email) — UI/API/DB PASS |
| QUOTE EMAIL | **FAIL** |
| CAREERS | **FAIL** (Blob) |
| DATABASE | **PARTIAL** — Quote/Contact READY; Careers unverified |
| RESEND | **OWNER ACTION** |
| BLOB | **OWNER ACTION** |
| DEPLOYMENT SAFEGUARDS | **ACTION REQUIRED** (confirm Vercel promote locks) |
| CUSTOM DOMAIN CUTOVER | **NOT PERFORMED** |

---

**STOP FOR OWNER REVIEW. DO NOT CUT OVER PREMIUMIB.COM.**
