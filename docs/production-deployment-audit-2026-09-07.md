# Production Deployment Audit — 2026-09-07

**Status:** FULL STOP — process-safety issue. No feature work until owner resolves.

---

## 1. What is live right now (verified, not assumed)

### Public domains checked

| URL | What it serves | Contractors motion? |
|---|---|---|
| **`https://premiumib.com`** | **Legacy WordPress** (Cloudflare/LiteSpeed). Title: "Premium Insurance Brokers". `/contractors-insurance/` → **404**. | **No** — not the Next.js build |
| **`https://premium-website-chi.vercel.app`** | **Next.js Vercel production** for this repo. Deployment `dpl_DSKfmAT1C7S2p2W4swMaHpvviR5T`. | **Yes** — full Coverage Explorer + motion handoff |
| `https://premium-website.vercel.app` | **Wrong project** ("Nivaasini"). Not this repo. | No |
| `https://premium-website-*-nabil-g-s-projects.vercel.app` | SSO/deployment-protection gated. Same deployment family. | Cannot browse without auth |

### Live content on `premium-website-chi.vercel.app` (browser-verified)

**Deployment commit:** `f8a7508` — *"Regenerate Contractors state images from composite-proof for seamless handoff"*  
**Branch:** `cursor/contractors-motion-7402` (**NOT merged to `main`**)

| Page | Live behavior |
|---|---|
| `/contractors-insurance` | Pilot Coverage Explorer, 4 coverage tabs, motion handoff sequence, real transparent animation assets, `data-handoff-confidence="high"` on Tools/Builder's Risk |
| `/restaurant-insurance` | Pilot multi-image state explorer; magnifier code present (`enableMagnifier` for restaurant), active on fine-pointer desktop only |
| General Liability / Wrap-Up | Standard state images on load; no handoff animation |

**Important:** A real visitor on **`premiumib.com` does NOT see this work.** The unintended production exposure is on the **Vercel alias** (`premium-website-chi.vercel.app`), not the legacy public domain — unless a custom domain was added in Vercel outside this audit's reach (none found pointing to Next.js).

---

## 2. How the Contractors commit reached Production

### It was NOT merged to `main`

```
git merge-base --is-ancestor f8a7508 origin/main  →  FAIL (not on main)
PR #18 (cursor/contractors-motion-7402)           →  DRAFT, never merged
Commits on branch not in main                     →  56 commits
```

### Deployment timeline (GitHub Deployments API)

| Time (UTC) | Environment | Commit | Branch / source |
|---|---|---|---|
| **2026-09-07 00:39:00** | **Production** | `f8a7508` | `cursor/contractors-motion-7402` push |
| 2026-09-07 00:36:21 | Preview | `f8a7508` | same |
| 2026-09-06 01:38:48 | Production | `97f7d30` | `main` (upload commit) |
| 2026-09-06 01:29:04 | Production | `3abe4c5` | `main` (upload commit) |

### Exact mechanism

1. **Cursor Agent pushed** `f8a7508` to `cursor/contractors-motion-7402` at 00:35 UTC.
2. **Vercel GitHub integration** built a Preview deployment (~00:36 UTC).
3. **~3 minutes later**, the same commit was assigned to **Production** (00:39 UTC) — deployment `DSKfmAT1C7S2p2W4swMaHpvviR5T`, now served at `premium-website-chi.vercel.app`.

This pattern is consistent with **manual "Promote to Production"** in the Vercel dashboard (or CLI `vercel promote`), **not** a merge to `main`. GitHub records the deploy as `vercel[bot]` with `environment: Production`.

### Why nothing blocked it

| Control | Current state |
|---|---|
| PR merge required | **No** — PR #18 still draft; deploy bypasses PR entirely |
| Branch protection on `main` | **Not accessible / likely not configured** (API 403) |
| GitHub Production environment rules | **Empty** — `protection_rules: []`, `deployment_branch_policy: null`, `can_admins_bypass: true` |
| Vercel production branch lock | **Not enforced** — feature-branch commit holds Production slot |

---

## 3. "Add files via upload" commits on `main` (last several days)

All authored by **`nibbles33 <nibbles33@gmail.com>`** via GitHub web upload — direct to `main`, each triggering Production auto-deploy.

| Commit | Timestamp (UTC-4) | Files touched |
|---|---|---|
| `97f7d30` | 2026-09-05 21:37 | 13× `premium-contractors-animation-assets/*.png` (clean backgrounds, transparent objects, composite proofs) |
| `3abe4c5` | 2026-09-05 21:28 | 11× `Codex Image Sep 5*.png` (unreferenced raw images in `public/images/`) |
| `5986e5a` | 2026-09-05 12:05 | 4× `contractors-insurance-state-*.png` (liability, property, tools, installation-work) |
| `e7eb1ce` | 2026-09-05 01:10 | Restaurant proof contact sheet + 4× restaurant state PNGs + manifest CSV |
| `80a4ae3` | 2026-09-04 23:36 | 6× raw diorama PNGs (AUTO, DAYCARE, GYM, NON PROFIT, RELIGIOUS, SALON AND BARBER) |
| `431e49e` | 2026-09-04 16:42 | 4× interactive-master PNGs (trucking, warehousing, wholesale, winery) |
| `8c8c750` | 2026-09-04 16:41 | 11× interactive-master PNGs (pollution through travel) |
| `1649317` | 2026-09-04 16:41 | 11× interactive-master PNGs (landlord through pharmacy) |
| `a466884` | 2026-09-04 16:39 | 10× interactive-master PNGs (event through hotel) |
| `56a240e` | 2026-09-04 16:39 | 11× interactive-master PNGs (commercial-property through dump truck) |
| `d4c74d2` | 2026-09-04 16:38 | 12× interactive-master PNGs (auto through commercial hub) |
| `cc72863` | 2026-09-04 12:55 | 5× hero PNGs (daycare, farm, greenhouse, landscaping, religious) |
| `b10d14c` | 2026-09-04 12:54 | 7× hero PNGs (event, liquor, medical, nonprofit, pharmacy, offices, salon) |
| `65e1c14` | 2026-09-04 12:54 | 10× hero PNGs (builders, convenience, grocery, hotel, property mgmt, real estate, restaurant, retail, warehousing) |
| `a0d427f` | 2026-09-04 12:53 | 10× hero PNGs (bonding, bus, cargo, commercial auto, contractors, dump truck, food truck, garage, product recall, trucking) |
| `fa7ca63` | 2026-09-04 12:53 | 9× hero PNGs (crime, D&O, EPL, cyber, pollution, E&O, small business, restaurant interior, auto) |
| `3601f97` | 2026-09-04 12:52 | 9× personal-line hero PNGs (boat, cabin, home, apartment, condo, craftsman, duplex, motorcycle) |
| `6334217` | 2026-09-04 12:52 | 8× hero PNGs (airport, CGL, commercial hub, commercial property, group home, home-sharing, life, umbrella) |
| `506591c` | 2026-09-04 12:51 | 7× duplicate hero PNGs (root-level, same names as above) |
| `249d110` | 2026-09-03 23:52 | 8× `premium-*.png` miniature cutaways |

**Assessment:** These were asset-delivery commits, not feature code — but **every one auto-deployed to Production** because they landed on `main`. They bypassed all 17 draft PRs. The animation asset uploads (`97f7d30`, `5986e5a`) were especially meant to feed feature-branch work under review, not to ship motion code (which wasn't on `main` until the separate Vercel promote of `f8a7508`).

---

## 4. Restaurant magnifier branch (`cursor/restaurant-magnifier-7402`)

| Item | Finding |
|---|---|
| **Head commit** | `855bbb8` — `feat(restaurant): add desktop hover magnifier to Coverage Explorer` |
| **Built** | 2026-09-05 (~05:29 UTC PR #17 opened) |
| **On `main`?** | **No** |
| **In current Production (`f8a7508`)?** | **Yes** — branch stacks on restaurant-magnifier; magnifier code is live on `premium-website-chi.vercel.app` |
| **PR #17 status** | Draft, never merged |

Because `cursor/contractors-motion-7402` is based on `cursor/restaurant-magnifier-7402`, promoting the Contractors branch to Production **also shipped the Restaurant magnifier prototype** without its own review gate.

---

## 5. Recommended fixes (concrete)

### Immediate (owner action)

1. **Rollback Vercel Production** to last `main` deployment (`97f7d30` or earlier stable) via Vercel dashboard → Deployments → `97f7d30` → "Promote to Production" — until owner explicitly approves preview work going live.
2. **Confirm custom domains** in Vercel project settings — ensure `premiumib.com` is NOT aliased to preview/feature deployments unless intentional migration is underway.

### GitHub

3. **Enable branch protection on `main`:**
   - Require pull request before merging
   - Require at least 1 approving review
   - Restrict who can push (block direct uploads or require PR for all changes)
   - Do not allow bypassing (including admins, during stabilization)

4. **Configure GitHub Production environment:**
   - Deployment branch policy: **`main` only**
   - Required reviewers before production deploy
   - Remove `can_admins_bypass: true` or restrict admin bypass

### Vercel

5. **Set Production Branch = `main` only** (Project Settings → Git → Production Branch).
6. **Disable or restrict "Promote to Production"** for Preview deployments — limit to project owners, or disable entirely and use merge-to-main as the only production path.
7. **Enable Deployment Protection** on Production if the URL is publicly accessible (already on team URLs; `chi.vercel.app` is currently **unprotected and public**).
8. **Separate Preview vs Production domains** — do not assign stable production aliases to preview builds.

### Process

9. **Stop using GitHub "Upload files" directly to `main`** for asset batches — use PRs from feature branches even for binary assets.
10. **Keep all Coverage Explorer PRs draft** until process fixes land; no further Cursor pushes should be promoted manually.

---

## Summary

The Contractors seamless-handoff commit **`f8a7508` is live on `https://premium-website-chi.vercel.app`** despite never merging to `main` and every task marking it preview-only. This happened via **Vercel Production promotion of a feature-branch deployment**, not a git merge. The legacy domain **`premiumib.com` remains WordPress** and does not show this work. **`main` has been receiving unreviewed direct-upload commits that auto-deploy to Production.** Restaurant magnifier prototype code is also live as a side effect of the Contractors branch promotion.

**No feature work should continue until rollback and branch/deploy protections are in place.**
