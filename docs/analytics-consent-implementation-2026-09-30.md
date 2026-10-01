# Analytics + Cookie Consent Implementation — 2026-09-30

**Branch:** `cursor/homepage-authority-concept-f`  
**Baseline commit:** `78b543a` — polish: final pre-launch visual and UX refinement  
**Feature commit:** see COMMIT section at end (after push)  
**Scope:** Consent-controlled analytics only. No Production deploy. No premiumib.com / DNS changes. No Contact/Quote/Careers backend changes. No GTM publish.

> **Owner / legal review required** for Privacy Policy cookie disclosure language and before publishing the GTM container or marking GA4 Key Events.

---

## 1. Executive summary

Implemented a first-party, Premium-branded cookie consent system with Google Consent Mode v2, Google Tag Manager (`GTM-P54WZ855`), GA4 via GTM (`G-9HQNJZM5FW`), and Microsoft Clarity (`yq7xu77cle`) gated by Experience consent.

Architecture:

```
Website → Consent system → Consent Mode v2 → GTM → GA4
                ↘ Experience consent → Clarity
```

Semantic events flow through a single consent-aware `track()` abstraction into `dataLayer`. Events generated while Analytics consent is denied are **not** queued for later flush. Advertising / remarketing tags were not added.

---

## 2. Files changed

### New
- `src/lib/consent/types.ts` — consent record schema (`pib_consent`, v1, 180 days)
- `src/lib/consent/storage.ts` — cookie read/write + preferences event
- `src/lib/consent/consent-mode.ts` — Consent Mode update helpers
- `src/lib/analytics/config.ts` — public ID defaults / env overrides
- `src/lib/analytics/sanitize.ts` — allowlist + blocked-key PII guard
- `src/lib/analytics/track.ts` — consent-aware `track()`
- `src/lib/analytics/gtm.ts` — single GTM injector
- `src/lib/analytics/clarity.ts` — consent-gated Clarity + masking helpers
- `src/components/consent/ConsentBootstrapScript.tsx` — defaults DENIED before tags
- `src/components/consent/ConsentProvider.tsx` — consent state + vendor apply
- `src/components/consent/CookieConsentUi.tsx` — banner + preferences UI
- `src/components/analytics/AnalyticsProviders.tsx`
- `src/components/analytics/AnalyticsRoot.tsx` — SPA `page_view` + click delegation
- `src/styles/consent.css`
- `scripts/qa-analytics-consent.mjs`
- `docs/qa-screenshots/analytics-consent-2026-09-30/*`
- `docs/analytics-consent-implementation-2026-09-30.md` (this file)

### Modified
- `src/lib/analytics.ts` — re-exports consent-aware facade
- `src/app/layout.tsx` — bootstrap + providers + GTM noscript
- `src/components/Footer.tsx` — Cookie Preferences entry
- `src/app/privacy-policy/page.tsx` — cookies / storage disclosure alignment
- `.env.example` — documented public analytics env vars
- Navigation / discovery / forms instrumentation (observational only):
  - `NavDropdowns.tsx`, `PilotPersonalFilmstrip.tsx`, `PilotCommercialDiscovery.tsx`,
    `PilotBreadthUniverse.tsx`, `ProductCoverageExplorer.tsx`, `ProductRelatedProducts.tsx`,
    `PilotProductPage.tsx`, `CommercialHubCategorySection.tsx`,
    `useQuoteFlow.ts`, `QuoteFlowEngine.tsx`, `QuoteFlowClient.tsx`,
    `ContactForm.tsx`, `JobApplicationForm.tsx`

### Not modified
- Contact / Quote / Careers API routes
- Resend configuration / `RESEND_FROM_EMAIL`
- Private Blob architecture / DB persistence
- Visual homepage Concept F Rev3 baselines (carriers, awards, filmstrip behavior)

---

## 3. Packages added/updated

None. Used existing Next.js App Router patterns + already-installed `puppeteer` for QA.

---

## 4. Consent architecture

1. Inline bootstrap sets Consent Mode **defaults denied** + restores `pib_consent` if present.
2. `ConsentProvider` hydrates, shows banner when unset, applies vendors after choice.
3. GTM may load with denied Consent Mode (tags remain gated).
4. Clarity loads **only** after Experience consent.
5. `track()` emits to `dataLayer` only when Analytics consent is granted.
6. Footer **Cookie Preferences** reopens the preferences dialog.

Categories:
- **Necessary** — always on
- **Analytics** — GA4 via GTM
- **Experience** — Microsoft Clarity  
No Marketing category (no ads pixels installed).

---

## 5. Consent storage format

Cookie name: `pib_consent`  
Max-Age: **180 days**  
SameSite=Lax; Secure on HTTPS  

Example:

```json
{
  "version": 1,
  "necessary": true,
  "analytics": true,
  "experience": false,
  "timestamp": "2026-09-30T04:23:30.531Z"
}
```

---

## 6. Google Consent Mode implementation

Defaults (before any Google tag):

- `analytics_storage: denied`
- `ad_storage: denied`
- `ad_user_data: denied`
- `ad_personalization: denied`
- `wait_for_update: 500`
- `ads_data_redaction: true`

On Analytics accept: `analytics_storage → granted`.  
Advertising signals remain **denied**.

---

## 7. GTM integration

- Container ID: `GTM-P54WZ855` (default; overridable via `NEXT_PUBLIC_GTM_ID`)
- Loaded once client-side after Consent Mode defaults
- Noscript iframe in `<body>`
- **Container not published from this repo**

---

## 8. GA4 integration

- Measurement ID: `G-9HQNJZM5FW`
- **Chosen page-view model:** application emits semantic `page_view` to `dataLayer` on route changes (and once when Analytics consent is newly granted). GTM should fire the GA4 page_view/config from this custom event — **not** from an unrestricted All Pages trigger — to avoid double counting with SPA navigation.
- Enhanced Measurement remains enabled in GA4; app does **not** emit duplicate scroll/outbound clones.

---

## 9. Clarity integration

- Project ID: `yq7xu77cle`
- Loads only when Experience = true
- On revoke: `clarity('consent', false)` + `clarity('stop')` (script may remain in DOM; documented limitation)

---

## 10. Clarity masking / privacy controls

Code:
- `data-clarity-mask="true"` / `.pib-clarity-mask` on Contact, Careers, Quote wrappers
- Runtime MutationObserver reapplies mask attributes to `input, textarea, select, form`

**Owner should also enable in Clarity project UI:**
1. Open Clarity project `yq7xu77cle`
2. Settings → Masking
3. Prefer **Strict** / mask all input content
4. Confirm recordings do not show form values on Contact / Quote / Careers

---

## 11. Event taxonomy implemented

| Event | Source |
|---|---|
| `page_view` | AnalyticsRoot (SPA) |
| `product_view` | AnalyticsRoot on product routes |
| `cta_click` / nav / phone / email / external profile | delegated clicks |
| `get_quote_click` / `contact_click` | delegated |
| `nav_open` / `nav_link_click` | NavDropdowns (+ mobile) |
| `personal_product_select` | filmstrip |
| `commercial_category_select` | homepage + hub |
| `commercial_product_select` | homepage commercial panel |
| `coverage_explorer_interact` | Coverage Explorer (`action=select`) |
| `yep_tile_click` / `related_product_click` | discovery rails |
| `quote_start` / `quote_step_view` / `quote_step_back` | useQuoteFlow |
| `quote_submit` / `quote_submit_success` / `quote_submit_error` | useQuoteFlow (success only after API ok) |
| `contact_submit_success` / `contact_submit_error` | ContactForm |
| `careers_submit_success` / `careers_submit_error` | JobApplicationForm (`position_slug` only) |

Hover spam not implemented.

---

## 12. PII protections

- Allowlisted parameter keys only (`sanitize.ts`)
- Blocked keys: name/email/phone/message/notes/address/answers/resume/ids/raw errors, etc.
- String values must match a conservative pattern; emails / long digit runs dropped
- Success events carry only slugs / categories / generic `error_code`
- Denied events are not stockpiled

QA marker strings did not appear in sanitized payloads / inspected dataLayer app events.

---

## 13. Quote sessionStorage treatment

- Key pattern: `quote-flow-{category}`
- **Functional / necessary** — preserves in-progress Quote draft
- Not classified as analytics; available regardless of Analytics consent
- Cleared on successful quote submission (unchanged behavior)
- Contains step answers for UX continuity; not sent to analytics events

---

## 14. Privacy Policy changes

Updated Usage Data + Cookies sections to describe:
- Necessary / functional storage (`pib_consent`, Quote `sessionStorage`)
- Optional Analytics (GTM/GA4) under consent
- Optional Experience (Clarity) under consent
- Cookie Preferences reopen path
- No Marketing category currently
- Flagged for owner/legal review  
Last updated date set to September 30, 2026.

---

## 15. Accessibility QA

- Banner region label
- Preferences `role="dialog"` + `aria-modal` + labelled title
- Escape closes preferences; overlay click closes
- Focus moves into dialog
- Visible focus styles on controls
- Minimum ~44px tap targets
- `prefers-reduced-motion` respected for control transitions
- Accept / Reject / Preferences all equally available (no dark patterns)

---

## 16. Consent matrix results

From `docs/qa-screenshots/analytics-consent-2026-09-30/qa-results.json`:

| Case | Result |
|---|---|
| A First visit / no choice | **PASS** — banner on, GTM loaded, Clarity off, analytics denied, no semantic events |
| B Reject non-essential | **PASS** — usable, no page_view, Clarity off |
| C Accept all | **PASS** — GTM + Clarity + page_view |
| D Analytics ON / Experience OFF | **PASS** |
| E Analytics OFF / Experience ON | **PASS** — Clarity on, no page_view |
| F Accept → Reject | **PASS** — analytics revoked; Clarity script may remain (API stop/consent false) |
| G Return visit | **PASS** — preference restored, banner hidden, Cookie Preferences available |

---

## 17. Event QA results

Verified in local production build via dataLayer inspection:

- `page_view` PASS
- `product_view` PASS
- `personal_product_select` PASS
- `yep_tile_click` PASS
- `phone_click` PASS
- `get_quote_click` PASS

Code-path verified (success gated on API ok): quote/contact/careers success + error events.  
Full production form submissions were **not** executed to avoid polluting production data.

---

## 18. PII leakage test results

Dummy markers:

- Analytics Test Person
- analytics-test@example.com
- 519-555-0100
- PII_ANALYTICS_TEST_MARKER

Result: **PASS** — stripped by allowlist; Contact + Quote clarity masks present.

---

## 19. Regression QA

- `npx tsc --noEmit` — PASS
- `npm run build` — PASS
- Lint: pre-existing repo errors remain; analytics batch fixed its unused import. `useQuoteFlow` setState-in-effect warnings are pre-existing flow init patterns, not introduced as new backend logic.
- Viewport overflow 390–1920 — PASS (no horizontal overflow)
- Homepage baselines preserved (no Team restore, no Personal autoplay, carrier roster untouched in this batch)
- Contact / Quote / Careers API routes — **unchanged**

---

## 20. Performance observations

- GTM async; Clarity deferred until Experience consent
- Single GTM injection guard
- Consent CSS scoped; banner fixed (may cover bottom content until choice — expected)
- No new npm dependencies
- Event delegation is a single document capture listener

---

## 21. Screenshots

Under `docs/qa-screenshots/analytics-consent-2026-09-30/`:

- `desktop-first-visit-banner.png`
- `desktop-preferences-panel.png`
- `desktop-homepage-after-accept.png`
- `desktop-privacy-cookie-section.png`
- `mobile-390-first-visit-banner.png`
- `mobile-390-preferences-panel.png`
- `qa-results.json`

---

## 22. Vercel environment variables required

Public (optional overrides; defaults hard-coded to approved IDs):

```
NEXT_PUBLIC_GTM_ID=GTM-P54WZ855
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-9HQNJZM5FW
NEXT_PUBLIC_CLARITY_ID=yq7xu77cle
```

Preview can function without setting these because defaults match the approved IDs.  
**Do not change Production env vars without explicit owner authorization.**  
Do not expose server secrets (`DATABASE_URL`, `RESEND_API_KEY`, Blob tokens, `GOOGLE_PLACES_API_KEY`).

---

## 23. GTM manual configuration still required

**Do not publish without owner authorization.**

In GTM container `GTM-P54WZ855` (workspace → Preview → publish when authorized):

1. **Consent Overview** — enable Consent Mode; require `analytics_storage` for GA4 tags.
2. **Google tag / GA4 Configuration** — Measurement ID `G-9HQNJZM5FW`; consent required = analytics_storage.
3. **Page view strategy (required):**
   - Trigger: Custom Event `page_view` (from dataLayer)
   - GA4 Event tag or Google tag send with event name `page_view`
   - **Disable** automatic All Pages page_view if it would double-count SPA navigations
4. **Custom event triggers** for semantic events as needed (or one GA4 Event tag using Event Name = `{{Event}}` with a regex allowlist of known events).
5. **Data Layer variables** for params used: `page_type`, `page_slug`, `product_slug`, `category`, `step_id`, `cta_location`, `location`, `error_code`, `position_slug`, etc.
6. Verify with **Tag Assistant / GTM Preview** on the Vercel Preview URL after Accept All and Reject paths.
7. Publish container only after owner sign-off.

---

## 24. GA4 manual configuration still required

After events appear in DebugView / realtime:

Recommended **Key Events**:
- `quote_submit_success`
- `contact_submit_success`
- `careers_submit_success`

Optional secondary:
- `phone_click`
- `get_quote_click`

Do not mark every interaction as a Key Event.

Steps (GA4 UI): Admin → Events → mark Key events for the three success events after validation.

---

## 25. Clarity manual configuration still required

Project `yq7xu77cle`:

1. Masking → Strict / mask inputs
2. Confirm Contact, Quote, Careers recordings show masked fields
3. Optionally suppress sensitive URL query fragments if present

---

## 26. Known limitations

1. GTM/GA4 do not fully “work” until the GTM container is configured and published by the owner.
2. After Experience revoke, Clarity script may remain in DOM; collection gated via Clarity consent/stop APIs (cannot guarantee perfect unload).
3. Noscript GTM iframe is present for no-JS users; Consent Mode still defaults denied in JS bootstrap path.
4. Privacy Policy engineering copy awaits legal review.
5. Success-event end-to-end with live API was not exercised against production DB in this batch.

---

## 27. Exact Preview URL

https://premium-website-git-cursor-homepage-a-6b58b4-nabil-g-s-projects.vercel.app

---

## 28. Commit SHA

`8790f5a` — feat: add consent-controlled analytics and event tracking

---

## 29. Final stop status

```
MERGED TO MAIN: NO
VERCEL PRODUCTION DEPLOYED: NO
PREMIUMIB.COM CHANGED: NO
GTM CONTAINER PUBLISHED: NO
CONTACT/QUOTE/CAREERS BACKENDS MODIFIED: NO
CAREERS PRIVATE BLOB VERIFIED: YES
```

STOP after Preview. Awaiting owner review + GTM publish authorization.
