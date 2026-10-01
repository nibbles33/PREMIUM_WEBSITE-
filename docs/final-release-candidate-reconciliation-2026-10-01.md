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
5. **Provide higher-resolution homepage hero master** (≥2880×1620, preferred 3840×2160) — see §23.

---

## 23. Patch — image quality + authority count-up (2026-10-01)

### Image-quality root causes

1. **Legacy office thumbnails upscaled in large panels**  
   - `office-1.jpg` = **255×325** used in Why Premium (~520px+ tall panel)  
   - `office-2.jpg` = **353×454** used in Windsor/Oracle panel  
   → Primary cause of visibly soft homepage editorial photography.

2. **Production photography masters are 1672×941**  
   All `/images/photography/**/*.webp` masters are **1672×941**.  
   Full-bleed homepage hero on Retina desktops wants ~2880–3840 CSS×DPR pixels → source cannot support crisp Retina full-bleed. Delivery was already capped at native width (correct); cannot invent pixels in code.

3. **Delivery settings**  
   Quality was already ~90; some `sizes` hints under-requested vs available 1672px master for product/commercial panels. Adjusted without disabling Next optimization or forcing quality=100 globally.

### Image audit table (prominent)

| IMAGE | SOURCE FILE | SOURCE DIMENSIONS | MAX RENDERED (approx) | CURRENT DELIVERY ISSUE | FIX | REPLACEMENT REQUIRED |
|---|---|---|---|---|---|---|
| Homepage hero | `photography/special/homepage-hero.webp` | 1672×941 | Full viewport ~1440–1920 CSS (×2 Retina) | Source too small for Retina full-bleed | quality 92; sizes capped at 1672 | **YES** — ≥2880×1620 (pref 3840×2160) |
| Why Premium panel | was `office-1.jpg` | 255×325 | ~534–720 CSS px | Thumbnail upscaled | Switched to `photography/special/team.webp` + q92 | No (until hero-class office shoot exists) |
| Windsor/Oracle panel | was `office-2.jpg` | 353×454 | ~580–720 CSS px | Thumbnail upscaled | Switched to `photography/special/about.webp` + q92 | No (optional dedicated office master later) |
| Personal filmstrip | `photography/personal/*.webp` | 1672×941 | ~220–280 CSS cards | Minor under-request | sizes/quality tuned (420px / q92) | Optional higher-res if cards grow |
| Commercial panel | `photography/commercial/*.webp` | 1672×941 | ~720–960 CSS | sizes capped low | sizes → 960px / q92 | Optional |
| Product page heroes | same 1672×941 webps | 1672×941 | ~540–960 CSS | sizes 640px underused source | sizes → 960px / q92 via PageHeroPhoto + PILOT_AUTO_HERO | Optional |
| About/Team/Contact heroes | special/*.webp | 1672×941 | ~960 CSS | default quality 75 risk | PageHeroPhoto quality 92 | Optional |
| Careers | (text hero, no photo) | n/a | n/a | n/a | unchanged | No |
| Award badges | awards assets | often ≥1000px | 88–100 CSS | missing sizes/quality | width 200 + sizes 100px q90 | No |

### Count-up implementation

- New `CountUpStat` client component (no animation library)
- Viewport IntersectionObserver (~35% visible), **once** per mount
- Ease-out cubic, ~1.5s
- Formats `2700 → 2,700+`, `31 → 31+`, `9 → 9`
- `prefers-reduced-motion: reduce` → final values immediately
- `tabular-nums`; SSR shows final values (no layout shift / hydration mismatch)
- **50+ Insurance Carriers:** **HELD FOR OWNER CONFIRMATION**  
  - `allPartners` in repo = **44 unique** names (featured rail remains exact 12)  
  - Public site unchanged for this metric

### Patch QA

| Check | Result |
|---|---|
| tsc / production build | PASS |
| Commercial 10/10 · 54/54 | PASS |
| Personal 14/14 | PASS (unchanged) |
| Featured carriers 12 | PASS (unchanged) |
| office-1 / office-2 removed from homepage | PASS |
| Count-up finals 2,700+ / 31+ / 9 | PASS |
| 50+ not shown | PASS (held) |
| Reduced motion | PASS |
| Authority viewports 390–1920 no overflow | PASS |
| Analytics / forms / GTM | untouched |

Screenshots: `docs/qa-screenshots/rc-image-authority-patch-2026-10-01/`

### Patch commit / Preview

- **Patch commit:** `11073e9` — polish: sharpen imagery and animate authority metrics  
- **Count-up viewport fix:** see follow-up commit (start at 0; trigger only when strip is meaningfully in view; owner-protocol QA PASS)  
- **Authoritative Preview (branch):** https://premium-website-git-cursor-homepage-a-6b58b4-nabil-g-s-projects.vercel.app  
- Vercel deployment for `11073e9`: SUCCESS

---

FINAL RELEASE CANDIDATE PREVIEW: https://premium-website-git-cursor-homepage-a-6b58b4-nabil-g-s-projects.vercel.app

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
