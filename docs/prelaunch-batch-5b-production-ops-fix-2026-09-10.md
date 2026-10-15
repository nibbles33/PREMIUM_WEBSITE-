# Pre-Launch Batch 5B — Production Environment + Resend + Blob Operational Fix

**Date:** 2026-09-10  
**Repository:** `nibbles33/PREMIUM_WEBSITE-`  
**Production base (unchanged):** `f74d5d8afb635bd7a86dee08950d2551bee7d5e5`  
**Vercel project (intended):** `premium-website`  
**Vercel Production test URL:** https://premium-website-chi.vercel.app/  
**Public site:** https://premiumib.com/ — **WordPress still live**  
**Custom domain cutover:** **NOT PERFORMED**

---

## Executive result

**Operational env configuration could not be applied in this batch.**

| Gate | Result |
|------|--------|
| Vercel CLI auth | **NOT AUTHENTICATED** (`npx vercel whoami` → Logged out; `VERCEL_TOKEN` unset) |
| Production env mutation | **STOPPED** (Phase 1 rule) |
| Redeploy after env change | **NOT PERFORMED** (no env change) |
| Contact / Quote email | **STILL FAIL** (`notified: false` on Quote; Contact has no notified flag) |
| Careers Blob | **STILL FAIL** (HTTP 503 — token missing) |
| Code changes | **NONE** (defect is environment, not application logic) |
| DNS / Resend DNS | **NOT MODIFIED** |
| premiumib.com | **UNCHANGED WordPress** |

**STOP FOR OWNER ACTION** — exact dashboard steps below.

---

## A. Vercel auth / project access

| Item | Status |
|------|--------|
| `vercel` / `npx vercel` | Available (CLI 59.15.1) |
| `vercel whoami` | **Logged out** |
| `VERCEL_TOKEN` in agent env | **UNSET** |
| `.vercel` project link | **Absent** |
| GitHub Actions secrets API | 403 (integration cannot list) |
| Latest GitHub Production deployment | id `6381447122`, SHA `f74d5d8afb635bd7a86dee08950d2551bee7d5e5…`, success |

### VERCEL AUTH: NOT AUTHENTICATED  
### PROJECT ACCESS: FAIL (cannot read/write Production env)

---

## B. Production env inventory (from source at `f74d5d8afb635bd7a86dee08950d2551bee7d5e5`)

Authoritative variables used by Contact / Quote / Careers / email / DB / Blob:

| VARIABLE | USED BY | REQUIRED? | PRODUCTION PRESENT? | PREVIEW PRESENT? | DEVELOPMENT PRESENT? | NOTES |
|----------|---------|-----------|---------------------|------------------|----------------------|-------|
| `DATABASE_URL` | Contact, Quote, Careers persistence + rate limits | **YES** | **PRESENT** (inferred) | CANNOT VERIFY | CANNOT VERIFY | Contact + Quote return UUIDs |
| `RESEND_API_KEY` | Contact, Quote, Careers email | **YES** for email | **CANNOT VERIFY** | CANNOT VERIFY | CANNOT VERIFY | Missing → notify returns `false` / skip |
| `RESEND_FROM_EMAIL` | All Resend sends | **YES** for reliable delivery | **CANNOT VERIFY** | CANNOT VERIFY | CANNOT VERIFY | Defaults to `onboarding@resend.dev` sandbox |
| `QUOTE_NOTIFY_TO` | Quote | Optional | **CANNOT VERIFY** | CANNOT VERIFY | CANNOT VERIFY | Default `info@premiumib.com` |
| `CONTACT_NOTIFY_TO` | Contact | Optional | **CANNOT VERIFY** | CANNOT VERIFY | CANNOT VERIFY | Default `info@premiumib.com` |
| `CAREERS_NOTIFY_TO` | Careers | Optional | **CANNOT VERIFY** | CANNOT VERIFY | CANNOT VERIFY | Default `info@premiumib.com` |
| `BLOB_READ_WRITE_TOKEN` | Careers resume upload | **YES** for Careers | **MISSING** (inferred) | CANNOT VERIFY | CANNOT VERIFY | Explicit 503 when unset |
| `NODE_ENV` | analytics only | No | n/a | n/a | n/a | Not an ops secret |

**Do not guess presence of Resend vars.** Only `DATABASE_URL` and missing `BLOB_READ_WRITE_TOKEN` are evidenced by live API behavior.

Source references:

- `src/lib/email/resendConfig.ts`
- `src/lib/contact/notify.ts` / `saveMessage.ts`
- `src/lib/quote/notify.ts` / `saveLead.ts`
- `src/lib/jobs/notify.ts` / `saveApplication.ts`
- `src/app/api/contact-submit/route.ts`
- `src/app/api/quote-submit/route.ts`
- `src/app/api/job-apply/route.ts`
- `.env.example`

---

## C. Resend configuration (code behavior)

| Topic | Finding |
|-------|---------|
| Client init | `new Resend(process.env.RESEND_API_KEY)` inside each notify helper |
| FROM | `getResendFrom(...)` → `RESEND_FROM_EMAIL` or **`onboarding@resend.dev`** |
| Contact TO | `CONTACT_NOTIFY_TO` \|\| `info@premiumib.com` |
| Quote TO | `QUOTE_NOTIFY_TO` \|\| `info@premiumib.com` |
| Careers TO | `CAREERS_NOTIFY_TO` \|\| `info@premiumib.com` |
| Is `RESEND_FROM_EMAIL` mandatory? | **Mandatory for reliable production delivery.** Sandbox FROM is development-only. |
| Can `onboarding@resend.dev` be used? | **Not for production inbox delivery** to arbitrary recipients. Resend sandbox restricts delivery. |
| Missing `RESEND_API_KEY` | Logs warning; returns `false`; **does not fail** visitor-facing API after DB save |
| Quote `notified:false` | **Correct behavior** when key missing or Resend API returns error |

### Exact Production requirements (owner must supply)

1. `RESEND_API_KEY` — from Resend dashboard API Keys  
2. `RESEND_FROM_EMAIL` — address on a **verified** domain (preferred: `website@premiumib.com` **only if verified**)  
3. `QUOTE_NOTIFY_TO` — optional; set if not using default `info@premiumib.com`  
4. Optionally `CONTACT_NOTIFY_TO` / `CAREERS_NOTIFY_TO`

---

## D. Resend domain status

| Item | Status |
|------|--------|
| RESEND API ACCESS | **NO** (no key in agent environment) |
| DOMAIN | `premiumib.com` |
| DOMAIN STATUS | **CANNOT VERIFY** |
| USABLE VERIFIED FROM ADDRESSES | **CANNOT VERIFY** |

**OWNER DNS ACTION REQUIRED** if domain not already verified in Resend:

1. Resend → Domains → Add `premiumib.com` (or open existing)  
2. Copy **exactly** the DNS records Resend displays (do not invent)  
3. Add them at the DNS host for `premiumib.com`  
4. Wait for Resend status **Verified**  
5. Then set Production `RESEND_FROM_EMAIL=website@premiumib.com` (or another verified mailbox)

This batch **did not** and **must not** modify DNS.

---

## E. Contact E2E (Production URL)

| Check | Result |
|-------|--------|
| CONTACT UI | **PASS** (`/contact/` renders) |
| CONTACT API | **PASS** — `POST /api/contact-submit/` → `200 {"ok":true,"id":"bcbb8557-e6cb-4dc8-843c-21dc3ee70468"}` |
| CONTACT DB | **PASS** |
| CONTACT NOTIFICATION | **FAIL** (inferred — shared Resend path; Quote `notified:false`) |
| CONTACT EMAIL RECEIVED | **CANNOT VERIFY** / treated **FAIL** operationally |

Marker: *Batch5B Contact Probe — safe to delete.*

---

## F. Quote E2E (Production URL) — required gate

| Check | Result |
|-------|--------|
| QUOTE UI | **PASS** (`/get-a-quote/`) |
| QUOTE API | **PASS** — `200 ok:true` |
| QUOTE DB | **PASS** |
| QUOTE NOTIFICATION | **FAIL** |
| QUOTE NOTIFIED FLAG | **FALSE** |
| QUOTE EMAIL RECEIVED | **NO** / **CANNOT VERIFY** inbox — flag proves send did not succeed |

Probe id: `2bdad98f-c8eb-42cd-a843-a772dd9fa5af` (`notified:false`).

### QUOTE FAILURE ROOT CAUSE

**CANNOT DETERMINE exact subclass without Vercel runtime logs / Resend dashboard.**

Narrowed set (unchanged from Batch 5):

- `MISSING RESEND_API_KEY`, **or**
- `RESEND API ERROR`, **or**
- `UNVERIFIED / SANDBOX SENDER` (`onboarding@resend.dev`)

Safe diagnostics unavailable: Resend HTTP status, message id, Vercel log lines (no auth).

---

## G. Blob configuration

| Item | Status |
|------|--------|
| Implementation | `@vercel/blob` `put(...)` with `token: process.env.BLOB_READ_WRITE_TOKEN` |
| BLOB STORE | **CANNOT VERIFY** (no Vercel project access) |
| BLOB TOKEN | **MISSING** on Production (inferred from 503) |
| PROJECT BINDING | **CANNOT VERIFY** |

Live Careers response:

```json
{"ok":false,"error":"Resume upload is not configured on this environment. Please email your resume to info@premiumib.com and include the position you are applying for."}
```

HTTP **503**.

### Owner steps (exact)

1. Vercel → Project **`premium-website`** → **Storage** → create / open **Blob** store  
2. Connect store to project **`premium-website`**  
3. Ensure Production env receives **`BLOB_READ_WRITE_TOKEN`** (Vercel usually injects on connect; confirm under **Settings → Environment Variables** for Production)  
4. Redeploy Production from `main` at `f74d5d8afb635bd7a86dee08950d2551bee7d5e5…` (Redeploy without code change)  
5. Re-run one Careers E2E

---

## H. Careers E2E

| Check | Result |
|-------|--------|
| CAREERS UI | **PASS** (`/careers/`) |
| CAREERS API | **FAIL** — 503 Blob not configured |
| CAREERS BLOB | **FAIL** |
| CAREERS DB | **NOT REACHED** / **CANNOT VERIFY** |
| CAREERS EMAIL | **NOT REACHED** / **CANNOT VERIFY** |

No code defect found — blocked solely by missing Blob token.

---

## I. Production protection

| Item | Status |
|------|--------|
| PRODUCTION BRANCH | **`main`** (GitHub Production deployments track `main`; latest SHA `f74d5d8afb635bd7a86dee08950d2551bee7d5e5…`) |
| AUTOMATIC PRODUCTION DEPLOY FROM MAIN | **YES** (observed: merge to main → Production deployment) |
| PREVIEW MANUAL PROMOTION | **CANNOT VERIFY** (no Vercel settings access) |
| GIT INTEGRATION | **READY** (GitHub ↔ Vercel deployments present) |
| GitHub main protection | **YES** — ruleset **Protect main** (`22498266`): PR required, no force-push, no deletion, conversation resolution, squash |
| PRODUCTION DEPLOYMENT PROTECTION | **ACTION REQUIRED** |

### Owner click-path (Vercel)

1. Vercel → **`premium-website`** → **Settings** → **Git**  
   - Production Branch = **`main`** only  
2. **Settings** → **Deployment Protection**  
   - Enable protection appropriate to the account plan  
   - Disable or restrict **Promote to Production** from arbitrary Preview deployments if the UI offers it  
3. Confirm workflow: feature branch → Preview → PR → `main` → Production only  

Do **not** weaken GitHub ruleset **Protect main**.

---

## J. Test-data cleanup

**NOT PERFORMED** — no `DATABASE_URL` / DB admin access in agent environment; no Blob objects created (Careers never uploaded).

Clearly synthetic Batch 5 / 5B records to delete manually when DB access is available:

| Table (code) | Row ID | Test label |
|--------------|--------|------------|
| `contact_messages` | `bcbb8557-e6cb-4dc8-843c-21dc3ee70468` | Batch5B Contact Probe |
| `quote_leads` | `2bdad98f-c8eb-42cd-a843-a772dd9fa5af` | BATCH5B PROBE |
| `quote_leads` | `0ac7337e-d6de-49c9-9232-6440ff345709` | BATCH5B CLEANUP MARKER |
| Prior Batch 5 Contact/Quote IDs | (see Batch 5 report) | Prelaunch / PRELAUNCH markers |

**Do not delete real customer submissions.**

---

## K. Limited regression (baseline preserved)

| Gate | Result |
|------|--------|
| `npm run build` | **PASS** |
| `npx tsc --noEmit` | **PASS** |
| Personal | **14/14 · 14/14 · 14/14 · 14/14** |
| Commercial | **10/10 · 54/54** |
| Partners | **44/44** |
| Claims | **25/25** |
| Content | **A44 / B16 / C0 / D0** |
| Navigation | **PASS** (0 zero-discovery) |
| SEO static | **PASS** |
| Carrier ultrawide vs Production URL | **1440/1920/2560/3440/3840 PASS** |
| Legacy vs Production URL | **10/10 redirects · 49 410s · 0 loops · 0 chains** |
| Explorer UX v2 smoke vs Production | **PASS** (daycare/restaurant/contractors) |
| Full local explorer suite | Not used as regression signal (requires local server; Production baseline remains Batch 5 **236/236**) |
| Disclosure PDF | **200**; typo **226 780 6000** still present; **not edited** |
| premiumib.com | WordPress **still live** |

**No website content/design changes.**  
**Deployed SHA remains `f74d5d8afb635bd7a86dee08950d2551bee7d5e5…`.**

---

## L. Remaining owner actions

1. **Authenticate Vercel for ops** (pick one):  
   - Local: `npx vercel login` then `npx vercel link` → select `premium-website`  
   - Or CI/agent: set `VERCEL_TOKEN` with project env read/write  
   - Or configure entirely in Vercel Dashboard (no CLI)
2. **Resend**  
   - Confirm/create API key  
   - Verify `premiumib.com` (add DNS records Resend shows — **owner DNS only**)  
   - Set Production: `RESEND_API_KEY`, `RESEND_FROM_EMAIL=website@premiumib.com` (only after verified), optional notify overrides  
3. **Blob**  
   - Create/connect Vercel Blob store to `premium-website`  
   - Confirm Production `BLOB_READ_WRITE_TOKEN`  
4. **Redeploy** Production from `main` @ `f74d5d8afb635bd7a86dee08950d2551bee7d5e5…` after env changes (no code change required)  
5. **Re-run** Contact + Quote + Careers E2E; confirm Quote `notified:true` and inbox receipt  
6. **Deployment Protection** — lock Preview promote-to-Production  
7. **Cleanup** synthetic Batch 5/5B DB rows when safe  
8. **Disclosure PDF** corrected source still required before public cutover (not a Vercel-review blocker)

---

## M. Public-cutover blockers (unchanged)

1. Corrected disclosure PDF (`226-782-6000`)  
2. Proven Contact + Quote email delivery on Production  
3. Careers Blob + successful application E2E  
4. Explicit owner authorization for DNS / custom domain attach  
5. Vercel Production protection confirmed  

**READY FOR OWNER FUNCTIONAL REVIEW ON VERCEL:** **NO** (email + Careers still broken)  
Use URL for visual/content review: **YES** (site renders; ops incomplete)  
**READY FOR PUBLIC DOMAIN CUTOVER:** **NO**

---

## Phase 5/6 configuration attempt log

| Action | Result |
|--------|--------|
| Read Production env via CLI | **BLOCKED** — not authenticated |
| Set `RESEND_*` / `BLOB_*` | **NOT ATTEMPTED** (no known secret values; Phase 1 STOP) |
| Redeploy `f74d5d8afb635bd7a86dee08950d2551bee7d5e5` | **NOT PERFORMED** |
| Code fix PR | **NOT NEEDED** — no application defect proven |

---

## Exact owner instructions — Vercel Production env (dashboard)

1. Open https://vercel.com → team → project **`premium-website`**  
2. **Settings → Environment Variables**  
3. For **Production** (and Preview if desired), set:

| Key | Value source |
|-----|----------------|
| `RESEND_API_KEY` | Resend → API Keys (paste once; never commit) |
| `RESEND_FROM_EMAIL` | Verified address only, e.g. `website@premiumib.com` |
| `QUOTE_NOTIFY_TO` | Optional; else defaults to `info@premiumib.com` |
| `CONTACT_NOTIFY_TO` | Optional |
| `CAREERS_NOTIFY_TO` | Optional |
| `BLOB_READ_WRITE_TOKEN` | From Blob store connection |
| `DATABASE_URL` | Confirm already present (forms already persist) |

4. **Deployments →** latest Production → **⋯ → Redeploy** (same commit `f74d5d8afb635bd7a86dee08950d2551bee7d5e5…`)  
5. Retest https://premium-website-chi.vercel.app/ `/contact/`, `/get-a-quote/`, `/careers/`

### Exact owner instructions — Vercel CLI (if preferred)

```bash
npx vercel login
cd /path/to/PREMIUM_WEBSITE-
npx vercel link   # select premium-website
npx vercel env ls production
# Then add secrets via dashboard or:
# npx vercel env add RESEND_API_KEY production
# npx vercel env add RESEND_FROM_EMAIL production
# npx vercel env add BLOB_READ_WRITE_TOKEN production
npx vercel redeploy <deployment-url-or-id>   # same SHA preferred
```

**Do not paste secret values into chat, git, or screenshots.**

---

## Disclosure status

| Item | Status |
|------|--------|
| Path | `/wp-content/uploads/2025/05/disclosure.pdf` |
| PDF phone typo | `226 780 6000` (confirmed previously) |
| Correct number | `226-782-6000` |
| Edited this batch? | **NO** |
| VERCEL OWNER-REVIEW BLOCKER | **NO** |
| PUBLIC CUTOVER BLOCKER | **YES** |

---

## Safety confirmation

- No premiumib.com / www DNS changes  
- No nameserver changes  
- No WordPress changes  
- No disclosure.pdf edits  
- No secret values printed  
- No invented Resend keys or DNS records  
- No broad code changes  
- No approved content/design modifications  
- No custom domain attach  

**STOP FOR OWNER REVIEW.**
