# CAREERS PRIVATE BLOB REMEDIATION

**Date:** 2026-09-30  
**Branch:** `cursor/homepage-authority-concept-f`  
**Scope:** Operational fix — Careers resume upload with existing Private Blob store `premium-website-blob`  
**Separate from:** Concept F visual work

```
MERGED TO MAIN: NO
VERCEL PRODUCTION DEPLOYED: NO
PREMIUMIB.COM CHANGED: NO
NEW BLOB STORE CREATED: NO
RESUMES PUBLIC: NO
```

---

## Root cause

The Careers apply route (`src/app/api/job-apply/route.ts`) hard-required the legacy env var `BLOB_READ_WRITE_TOKEN` and uploaded with `@vercel/blob@0.27.3` using `access: "public"`.

The project’s connected store is **Private Blob** (`premium-website-blob`). Vercel provisioned store metadata as:

- `BLOB_READ_WRITE_TOKEN_STORE_ID`
- `BLOB_READ_WRITE_TOKEN_WEBHOOK_PUBLIC_KEY`

…not a long-lived `BLOB_READ_WRITE_TOKEN`. SDK 0.27.3 also lacks current Private Blob + OIDC/`access: "private"` support. Result: Preview/Production returned **503** (“Resume upload is not configured…”) even with the Blob store connected.

---

## SDK before / after

| | Version | Private Blob | OIDC / `storeId` | `access: "private"` |
|---|---|---|---|---|
| **Before** | `@vercel/blob@0.27.3` | No | No | No |
| **After** | `@vercel/blob@2.8.0` | Yes | Yes (`storeId` / `BLOB_STORE_ID` + `VERCEL_OIDC_TOKEN`) | Yes |

Lockfile updated via `npm install @vercel/blob@2.8.0`.

---

## Files changed

| File | Change |
|---|---|
| `package.json` / `package-lock.json` | Upgrade `@vercel/blob` → `^2.8.0` |
| `src/lib/jobs/blob.ts` | **New** — store-id resolution, private `put`/`del`, staff signed GET |
| `src/app/api/job-apply/route.ts` | Remove legacy token gate; private upload; DB cleanup on failure; staff link for notify |
| `src/lib/jobs/notify.ts` | Resume section uses time-limited staff URL + private pathname (no public URL) |
| `.env.example` | Document OIDC/store-id vars; do not require renaming managed vars |
| `docs/careers-private-blob-remediation-2026-09-30.md` | This report |

**Not modified:** Contact API, Quote API, Resend shared config (`getResendFrom`), Concept F visuals, `premiumib.com`.

---

## Authentication method

**Preferred on Vercel:** OIDC

1. Resolve store id from `BLOB_STORE_ID` **or** existing `BLOB_READ_WRITE_TOKEN_STORE_ID` (no rename required).
2. Pass `storeId` into SDK calls; Vercel injects `VERCEL_OIDC_TOKEN`.
3. Legacy `BLOB_READ_WRITE_TOKEN` is only used if **no** store id is present (local/fallback). Not required when OIDC + store id work.

Uploads use:

```ts
put(pathname, file, { access: "private", addRandomSuffix: false, allowOverwrite: false, contentType, storeId })
```

Pathnames are generated server-side: `careers/<sanitized-position>/<uuid>.<ext>` — never the raw applicant filename.

---

## Environment variables actually required

| Variable | Required? | Notes |
|---|---|---|
| `BLOB_READ_WRITE_TOKEN_STORE_ID` **or** `BLOB_STORE_ID` | **Yes** (for OIDC) | Existing Vercel-prefixed name is accepted as-is |
| `VERCEL_OIDC_TOKEN` | Injected by Vercel | Not set manually |
| `BLOB_READ_WRITE_TOKEN_WEBHOOK_PUBLIC_KEY` | Leave as-is | Unused by Careers `put`; do not delete |
| `BLOB_READ_WRITE_TOKEN` | **No** when OIDC works | Optional legacy fallback only |
| `DATABASE_URL` | Yes | Existing careers persistence |
| `RESEND_API_KEY` / `RESEND_FROM_EMAIL` | Yes | Existing working Resend config — unchanged |
| `CAREERS_NOTIFY_TO` | Yes (configured) | Staff notification recipient |

### Owner Vercel action

**No rename/delete of Vercel-managed Blob env vars is required.**

If Preview/Production already has `BLOB_READ_WRITE_TOKEN_STORE_ID` from the `premium-website-blob` connection, this remediation addresses that store via OIDC without creating a new store or converting it to public.

Optional (not required): add alias `BLOB_STORE_ID` = same value as `BLOB_READ_WRITE_TOKEN_STORE_ID` for SDK-default env naming. Code already reads the prefixed name.

**STOP before Production:** Do not promote this branch. Preview-only validation. Owner must explicitly approve any Production env/deploy changes later.

---

## Private storage / staff access

- Resumes uploaded with `access: "private"`.
- DB `job_applications.resume_url` stores the **private** Blob URL/reference (existing column; no destructive migration).
- Email does **not** include a public resume URL.
- Preferred staff path: short-lived signed GET via `issueSignedToken` + `presignUrl` (7-day TTL, `get` only, single pathname).
- Fallback if signing fails: email includes private pathname + instruction to retrieve from Blob dashboard / re-issue signed GET server-side.
- No unauthenticated download API route added.

---

## Database

- Table `job_applications` already has `resume_url TEXT`.
- **No schema migration applied.**
- Stores private Blob URL from `put` result.
- On DB insert failure after Blob upload: attempt `del` cleanup of the private resume.

---

## Email

- Uses existing Resend helpers (`getResendFrom("PremiumIB Careers")`).
- Contact / Quote notification code untouched.
- Careers email includes application fields + private staff access (signed URL or pathname).
- Resume is not attached as a public/insecure payload.
- Email failure is logged; application remains persisted (persist-first).

---

## Failure behavior

| Failure | User-facing | Notes |
|---|---|---|
| Resume upload fails | 500 — not success | No DB row |
| DB save fails | 500 — not success | Best-effort Blob `del` cleanup |
| Email fails | Still `ok: true` after persist | Logged; `email_sent` stays false |
| Missing Blob config | 503 | Checks store id / legacy token via `isBlobUploadConfigured()` — **not** legacy-token-only |

---

## Security check

| Check | Status |
|---|---|
| No Blob secret in browser bundle | **PASS** — Blob helpers only used from API route / server lib |
| No public resume URL | **PASS** — `access: "private"`; notify uses signed GET or pathname |
| No unauthenticated resume download endpoint | **PASS** — none added |
| Path injection / traversal | **PASS** — UUID pathname; position sanitized |
| MIME/type validation | **PASS** — PDF / DOC / DOCX only (`validateResumeFile`) |
| Size validation | **PASS** — 5 MB max unchanged |
| Safe filenames | **PASS** — UUID + derived extension |
| Applicant PII logging minimized | **PASS** — logs use applicationId / pathname; not resume contents |
| Private Blob reference server-side | **PASS** |

---

## Local verification (pre-Preview)

| Check | Result |
|---|---|
| `npx tsc --noEmit` | **PASS** |
| `npm run build` | **PASS** |
| Contact / Quote source unchanged | **PASS** (`git diff` vs pre-fix commit = 0 lines) |
| Client bundle contains no Blob secrets / `@vercel/blob` | **PASS** — no matches under `.next/static` |
| Job-apply compiled as server route | **PASS** — `.next/server/app/api/job-apply/route.js` |
| Validation: oversize (>5 MB) rejected | **PASS** (unit) |
| Validation: unsupported type rejected | **PASS** (unit) |
| Validation: missing required fields rejected | **PASS** (unit) |
| Validation: PDF / DOCX accepted | **PASS** (unit) |
| Pathname sanitization (no applicant filename / no `..`) | **PASS** (unit) |

---

## Preview deployment

| Field | Value |
|---|---|
| Commit | `8c219ed` |
| GitHub deployment | `6750641706` |
| Environment | **Preview** (not Production) |
| Preview URL | https://premium-website-nr1fsa0jw-nabil-g-s-projects.vercel.app |
| Deploy state | **success** |
| Access | **Vercel Authentication / Deployment Protection** — unauthenticated HTTP returns protection page |

Agent could not complete live Preview HTTP E2E in this environment:

- `vercel` CLI: logged out
- Vercel MCP `mcp_auth`: timed out (no owner interactive auth)
- Raw `curl` correctly blocked by Deployment Protection (expected)

Owner (or authenticated agent session) should run A/F/G/H/I/J/K against the Preview URL above, then confirm the uploaded object appears in **premium-website-blob** as **private**.

---

## Preview test checklist (A–M)

| ID | Test | Result |
|---|---|---|
| A | Valid PDF under 5 MB | **PASS** — owner live verified application submitted |
| B | Valid DOC/DOCX if supported | Supported by validators; PDF path owner-verified |
| C | File over 5 MB rejected | **PASS** (local unit — same validators used by route) |
| D | Unsupported file type rejected | **PASS** (local unit) |
| E | Missing required fields rejected | **PASS** (local unit) |
| F | Blob upload succeeds as PRIVATE | **PASS** — owner confirmed object in `premium-website-blob`, remains private |
| G | Database application record succeeds | **PASS** — owner live verified application persisted |
| H | Careers email → `CAREERS_NOTIFY_TO` | **PASS** — owner received Careers notification email |
| I | Resume NOT anonymously publicly accessible | **PASS** — private Blob; signed staff resume link works for authorized retrieval |
| J | Contact still works | **PASS** — owner confirmed (backend untouched by this remediation) |
| K | Quote still works | **PASS** — owner confirmed (backend untouched by this remediation) |
| L | Production build PASS | **PASS** |
| M | Typecheck PASS | **PASS**; lint has pre-existing repo errors unrelated to this change |

### Owner live verification (2026-09-30)

Owner confirmed end-to-end on Preview:

- Careers application submitted successfully
- Careers notification email received
- Resume exists in **premium-website-blob**
- Resume remains **private**
- Signed staff resume access link works

Private Blob architecture was **not** weakened after verification.

---

## Unresolved items

1. Production promotion explicitly **out of scope** — owner approval required later.
2. Optional owner alias `BLOB_STORE_ID` — not required; code accepts existing prefixed store id.

---

## Explicit stop-gate

```
MERGED TO MAIN: NO
VERCEL PRODUCTION DEPLOYED: NO
PREMIUMIB.COM CHANGED: NO
NEW BLOB STORE CREATED: NO
RESUMES PUBLIC: NO
```
