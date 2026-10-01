# Final Release Candidate Reconciliation — 2026-10-01

## 1. Starting branch

`cursor/homepage-authority-concept-f`

## 2. Starting SHA

`c6c1f2f` — docs: record analytics consent Preview URL and commit SHA

## 3. Commits audited

Linear history on this branch (newest first at start of work):

| SHA | Message |
|---|---|
| `c6c1f2f` | docs: record analytics consent Preview URL and commit SHA |
| `8790f5a` | feat: add consent-controlled analytics and event tracking |
| `78b543a` | polish: final pre-launch visual and UX refinement |
| `c140cb4` | docs: record Careers private Blob remediation Preview status |
| `8c219ed` | fix(careers): private Blob resume upload with OIDC-compatible SDK |
| `6d7a3a4` | docs: record Concept F Rev3 Vercel Preview URL |
| `4af40fa` | Homepage Authority Concept F — Owner Visual Revision 3 polish |
| `61d5c0d` | Homepage Authority Concept F — Owner Visual Revision 2 |
| `fb0af74` | Homepage Authority Concept F — Premium Actual credibility upgrade |
| `f74d5d8` | Pre-launch approved rebuild (main merge-base) |

Compared peers: `origin/main` is an **ancestor** of this branch (no newer main website work). Other historical feature branches diverge and are **not** newer approved Concept F content.

## 4. Authoritative website/content commits identified

| Item | SHA |
|---|---|
| **A. Newest approved Homepage Concept F / Rev3** | `4af40fa` |
| **B. Final pre-launch visual/UX polish** | `78b543a` |
| **F. Newer homepage/content beyond analytics-test Preview?** | **None** — analytics Preview was built on this same branch after polish; website/content already present |

## 5. Analytics commits identified

| Item | SHA |
|---|---|
| **D. Consent-controlled analytics + event tracking** | `8790f5a` |
| **E. Analytics consent Preview documentation** | `c6c1f2f` |

## 6. Careers Blob commits identified

| Item | SHA |
|---|---|
| **C. Careers Private Blob remediation** | `8c219ed` |
| Careers Preview docs | `c140cb4` |

## 7. Reconciliation performed

1. Confirmed feature branch already contains Concept F Rev3 + polish + Careers Blob + analytics in one linear stack — **no multi-branch merge required**.
2. Preserved website baselines (no redesign).
3. Implemented **smallest safe dataLayer hygiene fix** for stale GTM parameter carry-over (see §9).
4. Re-ran build/typecheck, inventory, consent/analytics QA, responsive spot checks, screenshots.
5. Created release-candidate commit + new Vercel Preview (authoritative owner-review URL).

## 8. Conflicts encountered

**None.** Website, polish, Careers, and analytics were already sequential on `cursor/homepage-authority-concept-f`. No content discarded.

## 9. Stale dataLayer parameter investigation

### Finding

`get_quote_click` does **not** send `menu`, `page_type`, or `page_slug`.

Code path (`AnalyticsRoot`):

```js
track("get_quote_click", { location, destination_id })
```

Observed in GTM Tag Assistant earlier:

- `destination_id = get_a_quote`
- `location = header`
- `page_slug = home` ← **stale** (from prior `page_view`)
- `page_type = home` ← **stale**
- `menu = resources` ← **stale** (from prior `nav_open`)

**Root cause:** GTM Data Layer Variables retain previous values when a later push omits those keys.

### Fix (minimal)

In `track()` / `buildDataLayerEvent()`:

- Push every allowlisted parameter on each event.
- Set unused keys explicitly to `null` so DLVs clear.

Verified locally after fix:

- After `nav_open` with `menu: "resources"`, subsequent `get_quote_click` has `menu: null` and `page_type: null`.
- Intended keys remain: `location`, `destination_id`.

No broad analytics rewrite. No direct GA4 calls added.

## 10. Analytics event inventory (site-implemented)

```
page_view
product_view
nav_open
nav_link_click
phone_click
email_click
external_profile_click
get_quote_click
contact_click
personal_product_select
commercial_category_select
commercial_product_select
coverage_explorer_interact
yep_tile_click
related_product_click
quote_start
quote_step_view
quote_step_back
quote_submit
quote_submit_success
quote_submit_error
contact_submit_success
contact_submit_error
careers_submit_success
careers_submit_error
```

Infrastructure (not semantic GA4 content): `gtm.js`.

Not emitted: `cta_click`.

## 11. GTM trigger comparison

Published GTM Version 2 (“Premium GA4 Analytics + Consent Tracking – Launch Setup”) was verified by owner in Tag Assistant with:

- Google Tag `G-9HQNJZM5FW`, `send_page_view = false`
- Dedicated `page_view` tag on custom event `page_view`
- Reusable custom-event tag **excluding** `page_view`

Compared against the site inventory above (expected published regex from launch setup / prior audit):

| Status | Events |
|---|---|
| **MATCH** | All 25 semantic events listed in §10 (including dedicated `page_view` handling) |
| **MISSING FROM GTM** | None identified vs launch setup inventory |
| **STALE IN GTM** | None identified in website code; prior Tag Assistant `menu`/`page_*` on `get_quote_click` was DLV carry-over (fixed in app push hygiene) |

**Do not silently modify the published GTM container.** Owner should re-check Tag Assistant once on this RC Preview that unused DLVs now null-clear.

Code architecture confirmation:

- Active container default: `GTM-P54WZ855`
- Single GTM injector (`data-pib-gtm`)
- No app-level direct `gtag('event', …)` / duplicate GA install
- `gtag/js?id=G-9HQNJZM5FW&…&gtm=…` appears **via GTM** after container load (expected)
- Events only via `dataLayer` through `track()`
- Consent gating intact (no `page_view` before Analytics accept; reject path emits none; Clarity Experience-gated)

## 12. Build / typecheck results

| Check | Result |
|---|---|
| `npx tsc --noEmit` | **PASS** |
| `npm run build` | **PASS** |

## 13. Personal QA

- **14/14** filmstrip products discoverable (runtime + data)
- No Personal autoplay (`animation-name: none`)
- No duplicate Personal CTA observed
- No 2,400+ homes pill on homepage

## 14. Commercial QA

- **10/10** categories (`verify-homepage-category-completeness.ts`)
- **54/54** placements (**PASS**, 0 errors)

## 15. Coverage Explorer QA

- Registry enumeration across personal + commercial product configs (excluding commercial hub layout): **58 pages / 241 coverage items**
- Prior documented baseline in Concept F reports: **236/236**
- No Coverage Explorer architecture removed in this reconciliation; delta vs historical 236 is noted for awareness (likely inventory growth since earlier baseline), not introduced by analytics RC work
- Representative Auto explorer screenshot captured; wiring-zone prototype checks are a separate older harness and not used as the RC gate

## 16. Carrier QA

Homepage roster (**exact 12**):

1. CAA  
2. Intact  
3. SGI  
4. Wawanesa  
5. Northbridge  
6. Aviva  
7. Travelers  
8. Chubb  
9. Gore  
10. Echelon  
11. Unica  
12. Pembridge  

## 17. Responsive QA

Homepage overflow spot checks:

| Viewport | Horizontal overflow |
|---|---|
| 390 | PASS |
| 430 | PASS |
| 1440 | PASS |
| 1920 | PASS |

Screenshots also include mobile nav, mega-menu, product/explorer/forms.

## 18. Forms / backend preservation

| System | Modified? |
|---|---|
| Contact API / DB / Resend | **NO** |
| Quote API / DB / Resend | **NO** |
| Careers API / DB / Private Blob / Resend | **NO** |
| `RESEND_FROM_EMAIL=website@premiumib.com` | **preserved** (not changed) |

Owner live verification of Careers private Blob remains authoritative (**YES**).

## 19. Final commit SHA

`c8bb52c` — chore: reconcile final website and analytics release candidate

## 20. Final Vercel Preview URL

https://premium-website-git-cursor-homepage-a-6b58b4-nabil-g-s-projects.vercel.app

(Vercel SSO may be required. This branch Preview now serves the RC commit above — do not use older analytics-only Preview notes as the website baseline.)

## 21. Screenshot paths

`docs/qa-screenshots/final-release-candidate-2026-10-01/`

- `homepage-390.png`
- `homepage-430.png`
- `homepage-1440.png`
- `homepage-1920.png`
- `desktop-megamenu-personal.png`
- `desktop-google-reviews.png`
- `desktop-awards-local.png`
- `desktop-footer.png`
- `desktop-personal-product-auto.png`
- `desktop-coverage-explorer-auto.png`
- `desktop-commercial-product-restaurant.png`
- `desktop-quote.png`
- `desktop-contact.png`
- `desktop-careers.png`
- `mobile-390-homepage.png`
- `mobile-390-nav.png`
- `qa-results.json`

## 22. Remaining issues / owner follow-ups

1. Re-validate Tag Assistant on **this** RC Preview after dataLayer null-clear fix (confirm `menu` / stale keys no longer attach to unrelated events).
2. Coverage item registry count is **241** vs historical doc baseline **236** — informational; not a reconciliation merge conflict.
3. Privacy Policy cookie disclosure still flagged for owner/legal review (from analytics batch).
4. Do not merge / Production-deploy until owner visual approval.

---

FINAL RELEASE CANDIDATE PREVIEW: <URL>

MERGED TO MAIN: NO  
VERCEL PRODUCTION DEPLOYED: NO  
PREMIUMIB.COM CHANGED: NO  

GTM VERSION 2 PUBLISHED: YES  
GA4/GTM PREVIEW VERIFIED: YES  

CONTACT BACKEND MODIFIED: NO  
QUOTE BACKEND MODIFIED: NO  
CAREERS BACKEND MODIFIED: NO  

CAREERS PRIVATE BLOB LIVE VERIFIED: YES  

READY FOR OWNER VISUAL REVIEW: YES
