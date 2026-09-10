# Pre-Launch Production Operational Gate — Batch 1B

**Date:** 2026-09-10  
**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Worktree:** `/tmp/PREMIUM_WEBSITE-d3-transportation`  
**Functional remediation base:** `cef0446`  
**Prior report:** `docs/prelaunch-batch-1-functional-remediation-2026-09-10.md`

**Scope:** Verification only — no deploy, merge, promote, alias, or DNS changes.

---

## A. Functional Base

Batch 1 (`cef0446`) implemented:

| Flow | Code status |
|------|-------------|
| Contact | `POST /api/contact-submit` — Neon + Resend |
| Quote | `POST /api/quote-submit` — unchanged, production-capable |
| Careers | `POST /api/job-apply` — unchanged, production-capable |
| Newsletter | Submit disabled (coming-soon) |

This gate verifies **Production configuration** and **E2E readiness** — not code architecture.

---

## B. Vercel Project Linkage

| Item | Finding |
|------|---------|
| **PROJECT NAME** | `premium-website` (inferred from deployment URLs) |
| **TEAM/ACCOUNT** | `nabil-g-s-projects` (Vercel team slug in deployment URLs) |
| **PRODUCTION BRANCH** | **`main`** (GitHub Production deployments track `main`; latest Production SHA `b7a4bb8`) |
| **KNOWN PRODUCTION DOMAIN** | `https://premiumib.com` — **currently serves WordPress** (wp-json headers), **not** the Next.js rebuild |
| **Vercel Production URL** | `https://premium-website-62xgohoy4-nabil-g-s-projects.vercel.app` (GitHub deployment `6364193597`, SHA `b7a4bb8`) |
| **Feature Preview URL (cef0446)** | `https://premium-website-hqqkhxfn3-nabil-g-s-projects.vercel.app` (GitHub deployment `6373357174`) |
| **LOCAL VERCEL LINKAGE** | **CANNOT VERIFY** — no `.vercel/` directory; `vercel whoami` → **Logged out** |
| **GitHub repo** | `nibbles33/PREMIUM_WEBSITE-` |

### Deployment vs code matrix

| Environment | SHA | Contains `cef0446` contact API? |
|-------------|-----|--------------------------------|
| **Production (Vercel/main)** | `b7a4bb8` | **NO** — asset-only PR #23 merge |
| **Preview (feature branch)** | `cef0446` | **YES** |
| **premiumib.com (public)** | WordPress | **N/A** — not Next.js rebuild |

**Critical:** Production E2E for Batch 1 code **cannot** validate `cef0446` until that commit is deployed to the target environment.

---

## C. Production Environment Matrix

Vercel CLI session: **logged out**. No access to `vercel env ls production`. Secret values were **never queried or printed**.

| VARIABLE | REQUIRED BY | PRODUCTION STATUS |
|----------|-------------|-------------------|
| `DATABASE_URL` | Contact, Quote, Careers APIs | **CANNOT VERIFY** |
| `RESEND_API_KEY` | Contact, Quote, Careers email (optional for API success) | **CANNOT VERIFY** |
| `BLOB_READ_WRITE_TOKEN` | Careers resume upload | **CANNOT VERIFY** |
| `CONTACT_NOTIFY_TO` | Contact email recipient override | **CANNOT VERIFY** (optional; defaults to `info@premiumib.com`) |
| `CAREERS_NOTIFY_TO` | Careers email recipient override | **CANNOT VERIFY** (optional; defaults to `info@premiumib.com`) |
| `RESEND_FROM_EMAIL` | Contact, Quote, Careers sender (optional; defaults to sandbox) | **CANNOT VERIFY** |

### Additional env vars (not secrets)

None beyond the above. All form APIs use server-side `process.env` only.

---

## D. Database Requirements

All three flows use **`CREATE TABLE IF NOT EXISTS`** on first API call via `@neondatabase/serverless` tagged templates. No separate migration runner. No destructive migrations were run.

| Table | Schema source | Production table status |
|-------|---------------|-------------------------|
| `contact_messages` | `src/lib/contact/saveMessage.ts` | **CANNOT VERIFY** — auto-created on first contact submit when `DATABASE_URL` set |
| `contact_rate_limits` | same | **CANNOT VERIFY** |
| `quote_leads` | `src/lib/quote/saveLead.ts`, `src/lib/quote/schema.sql` | **CANNOT VERIFY** — auto-created on first quote submit |
| `quote_rate_limits` | same | **CANNOT VERIFY** |
| `job_applications` | `src/lib/jobs/saveApplication.ts` | **CANNOT VERIFY** — auto-created on first job apply |
| `job_apply_rate_limits` | same | **CANNOT VERIFY** |

**Schema evidence:** **CONFIRMED in code** for all three primary tables.  
**Production DB presence:** **CANNOT VERIFY** without `DATABASE_URL` access.

If `DATABASE_URL` is set but first submit fails with schema errors, run manual SQL from `src/lib/quote/schema.sql` (quote) or inspect `ensureContactSchema` / `ensureJobApplicationSchema` in code.

---

## E. Contact Prerequisites

**Endpoint:** `POST /api/contact-submit`

| Requirement | Detail |
|-------------|--------|
| `DATABASE_URL` | **Required** — 503 if missing |
| `RESEND_API_KEY` | **Optional** — email skipped if missing; **success still returned after DB save** |
| Recipient | `CONTACT_NOTIFY_TO` or default `info@premiumib.com` |
| Sender | `RESEND_FROM_EMAIL` or default `onboarding@resend.dev` (sandbox) |
| Success condition | Valid payload + rate limit OK + **DB write succeeds** → `{ ok: true }` |
| Email required for success? | **NO** |
| Failure | 400 validation, 429 rate limit, 503 missing DB, 500 save error |
| Client behavior | Success UI **only** on `{ ok: true }`; errors preserve form |

---

## F. Quote Prerequisites

**Endpoint:** `POST /api/quote-submit`

| Requirement | Detail |
|-------------|--------|
| `DATABASE_URL` | **Required** — 503 if missing |
| `RESEND_API_KEY` | **Optional** — lead saved even if email fails |
| Recipient | Hardcoded `info@premiumib.com` |
| Sender | `RESEND_FROM_EMAIL` or sandbox default |
| Success | DB save → `{ ok: true, id }` |
| Email required for success? | **NO** |
| Failure | 400/429/503/500 with user-facing message; **no confirmation screen** |

---

## G. Careers Prerequisites

**Endpoint:** `POST /api/job-apply` (multipart FormData)

| Requirement | Detail |
|-------------|--------|
| `DATABASE_URL` | **Required** — 503 if missing |
| `BLOB_READ_WRITE_TOKEN` | **Required** — 503 if missing |
| `RESEND_API_KEY` | **Optional** |
| Recipient | `CAREERS_NOTIFY_TO` or `info@premiumib.com` |
| Sender | `RESEND_FROM_EMAIL` or sandbox default |
| Resume types | PDF, DOC, DOCX |
| Resume size limit | 5 MB |
| Success | Blob upload + DB save → `{ ok: true, id }` |
| Email required for success? | **NO** |
| Failure | 400 validation/upload, 503 missing env, 500 errors |

---

## H. Resend Sender Audit

### Before Batch 1B

| Flow | From (hardcoded) |
|------|------------------|
| Contact | `PremiumIB Contact <onboarding@resend.dev>` |
| Quote | `PremiumIB Quotes <onboarding@resend.dev>` |
| Careers | `PremiumIB Careers <onboarding@resend.dev>` |

### After Batch 1B (minimal code change)

Centralized in `src/lib/email/resendConfig.ts`:

- `RESEND_FROM_EMAIL` env var (optional)
- Fallback: `onboarding@resend.dev` (Resend sandbox — **TEST ONLY**)

| Item | Status |
|------|--------|
| **CURRENT FROM (default)** | `onboarding@resend.dev` |
| **HARDCODED OR ENV-BASED** | **Env-based with sandbox fallback** |
| **DOMAIN VERIFIED IN CODE/CONFIG** | **NO** — no verification logic; owner must verify in Resend dashboard |
| **RECOMMENDED PRODUCTION VALUE** | `website@premiumib.com` or other Premium-verified address via `RESEND_FROM_EMAIL` |

**RESEND SENDER classification:** **TEST ONLY** until `RESEND_FROM_EMAIL` set to verified domain address in Production.

---

## I. Notification Recipient Audit

| Flow | Recipient | Classification |
|------|-----------|----------------|
| Contact | `info@premiumib.com` (or `CONTACT_NOTIFY_TO`) | **VALID** — intended business inbox |
| Quote | `info@premiumib.com` | **VALID** |
| Careers | `info@premiumib.com` (or `CAREERS_NOTIFY_TO`) | **VALID** |

No developer/test/localhost/placeholder recipients found in code.

---

## J. Safe Production E2E Test Plan

**Do not run until:** (1) target environment deploys `cef0446` or later, (2) owner confirms env vars SET, (3) owner has Vercel SSO access if deployment is protected.

### CONTACT TEST

| Step | Detail |
|------|--------|
| **Action** | POST `/api/contact-submit` or submit `/contact` form |
| **Payload** | name: `Website QA Test`, email: owner-controlled test inbox, phone: `2265550199`, message: `PRE-LAUNCH QA TEST — DELETE` |
| **Expected HTTP** | 200 `{ ok: true, id: "..." }` |
| **Expected DB** | Row in `contact_messages` with matching id |
| **Expected email** | Notification to `info@premiumib.com` if Resend configured |
| **Expected UI** | "Message sent — thank you." |
| **Cleanup** | Delete test row from `contact_messages`; archive/delete test email |

### QUOTE TEST

| Step | Detail |
|------|--------|
| **Action** | Complete `/get-a-quote?type=auto` with synthetic data |
| **Payload** | name: `Website QA Test`, email: owner test address, phone: `2265550199`, preferredContactMethod: `email` |
| **Expected HTTP** | 200 `{ ok: true, id }` |
| **Expected DB** | Row in `quote_leads` |
| **Expected email** | Quote notification if Resend configured |
| **Expected UI** | Quote confirmation screen |
| **Cleanup** | Delete test row from `quote_leads` |

### CAREERS TEST

| Step | Detail |
|------|--------|
| **Action** | Submit application with file `premium-website-qa-test.pdf` (minimal synthetic PDF) |
| **Payload** | name: `Website QA Test`, email: owner test address, phone: `2265550199`, position: `general-application`, message: `PRE-LAUNCH QA TEST — DELETE` |
| **Expected HTTP** | 200 `{ ok: true, id }` |
| **Expected DB** | Row in `job_applications` with `resume_url` |
| **Expected Blob** | File at `careers/general-application/...` |
| **Expected email** | Careers notification if Resend configured |
| **Expected UI** | "Application received" |
| **Cleanup** | Delete DB row, Blob object, test email |

---

## K. Preview Test Possibility

| Item | Finding |
|------|---------|
| Preview deployment exists for `cef0446` | **YES** — `6373357174` |
| Preview URL | `https://premium-website-hqqkhxfn3-nabil-g-s-projects.vercel.app` |
| Accessible without auth | **NO** — Vercel Deployment Protection (`vercel_auth_enabled: true`, HTTP 401) |
| Preview env vars | **CANNOT VERIFY** |
| Preview/Production DB isolation | **CANNOT VERIFY** — do not submit test data without owner confirmation |
| **PREVIEW E2E** | **NOT RUN** — SSO-protected; env isolation unconfirmed |

---

## L. Production Deployment Dependency

Three distinct gates:

| Gate | Status |
|------|--------|
| **A. PRODUCTION ENV CONFIG VERIFIED** | **NOT CLEARED** — CANNOT VERIFY |
| **B. CURRENT FEATURE CODE DEPLOYED** | **NOT CLEARED** — Production on `b7a4bb8`; feature code at `cef0446` only on Preview |
| **C. PRODUCTION E2E VERIFIED** | **NOT CLEARED** — blocked by A + B |

**PRODUCTION E2E:** **BLOCKED UNTIL APPROVED DEPLOYMENT**

Additionally, `premiumib.com` does not yet serve the Next.js rebuild — domain cutover is a separate owner decision.

---

## M. Final P0 Decision

| Gate | Status |
|------|--------|
| **CODE P0** | **CLEARED** (`cef0446` + sender centralization) |
| **PRODUCTION CONFIG P0** | **CANNOT VERIFY** |
| **PRODUCTION E2E P0** | **BLOCKED UNTIL APPROVED DEPLOYMENT** |
| **RESEND SENDER** | **TEST ONLY** (sandbox default until `RESEND_FROM_EMAIL` set) |
| **FINAL P0 COUNT** | **1** (operational gate: env verify + deploy + E2E + production sender) |

The operational gate cannot close from this environment alone.

---

## N. Exact Owner Actions Required

1. **Log in to Vercel** and confirm Production + Preview env vars:
   - `DATABASE_URL` → SET
   - `RESEND_API_KEY` → SET
   - `BLOB_READ_WRITE_TOKEN` → SET
   - `RESEND_FROM_EMAIL` → SET to verified Premium address (e.g. `website@premiumib.com`)

2. **Verify Resend domain** for `premiumib.com` in Resend dashboard (no DNS changes from this task).

3. **Confirm Preview/Production DB isolation** before any E2E test submissions.

4. **Deploy `cef0446` (or merge + deploy)** to the environment that will receive launch traffic — Production currently lacks contact API.

5. **Run E2E smoke tests** (Section J) on the deployed environment with owner-controlled test data.

6. **Delete QA test rows** from DB and Blob after smoke test.

7. **Plan domain cutover** — `premiumib.com` still WordPress; Next.js rebuild on Vercel `*.vercel.app` URLs only.

8. **Disable or bypass Vercel Deployment Protection** temporarily for smoke testing, or run tests while authenticated.

---

## Batch 1B Code Change (minimal)

| File | Change |
|------|--------|
| `src/lib/email/resendConfig.ts` | **New** — `RESEND_FROM_EMAIL` centralization |
| `src/lib/contact/notify.ts` | Use shared sender config |
| `src/lib/quote/notify.ts` | Use shared sender config |
| `src/lib/jobs/notify.ts` | Use shared sender config |
| `.env.example` | Document `RESEND_FROM_EMAIL` |

No product copy, navigation, or form logic changes.

---

**DO NOT MERGE · DO NOT DEPLOY · DO NOT PROMOTE · STOP FOR OWNER REVIEW**
