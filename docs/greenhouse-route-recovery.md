# Greenhouse & Agribusiness Route Recovery (Review Pack)

**Branch:** `cursor/greenhouse-route-recovery-7402`  
**Status:** Ready for owner review — **STOP before merge/deploy**

---

## 1. Audit — historical content recovered

Searched repository and full git history for: `greenhouse`, `agribusiness`, `greenhouse-insurance`, `greenhouse-agribusiness-insurance`, `Leamington`, `Essex County greenhouse`, `Product Expansion 2.0`.

### Finding: no dedicated page was ever committed

| Artifact searched | Result |
|---|---|
| `/greenhouse-agribusiness-insurance/` route | **Never existed** in any branch or commit |
| `greenhouse-insurance` slug variants | **Not found** |
| Product page content / coverage spec | **Not found** |
| FAQ copy | **Not found** |
| Leamington / Essex County greenhouse copy | **Not found** |
| Product Expansion 2.0 docs | **Not found** (`wave1-placements.json` noted as never committed in `PHOTOGRAPHY_EXPANSION_TODO.md`) |

### Recoverable approved fragments (used on new page)

| Source | Recovered content |
|---|---|
| `src/data/nav-agriculture.ts` (since e94533c) | Label: **"Greenhouse / Agribusiness"**; description: **"Greenhouse, crop, and agribusiness operations."** |
| `src/data/photography/placements.ts` + `image-mapping.json` | Hero: **`greenhouse.webp`** (HIGH confidence); alt: **"Commercial greenhouse with hydroponic herb rows"**; quote funnel: **`/get-a-quote?type=business&industry=greenhouse`** |
| `scripts/photography-pipeline.py` | Same photography assignment — "Only greenhouse scene — quote/agriculture placement" |

### Not recovered (content gaps — owner review required)

The following were **not** found in repo history and are **intentionally omitted** from the page rather than invented:

- Coverage category titles and descriptions (property, equipment, BI, crop, pollution, etc.)
- FAQ questions and answers
- Detailed positioning copy beyond nav description
- Regulatory or statistical claims
- Carrier appetite or limit statements

The page ships with **hero, trust statement, broker story, related products, and CTA** — Coverage Explorer and FAQ sections are structurally ready but **empty until owner-approved content is supplied**.

---

## 2. Final route

**`/greenhouse-agribusiness-insurance/`**

Built on shared `PilotProductPage` system (`PilotCommercialPage` loader).

---

## 3. Files created/changed

| File | Change |
|---|---|
| `src/app/greenhouse-agribusiness-insurance/page.tsx` | **Created** — route entry |
| `src/data/pilot-commercial-inline.ts` | **Added** inline config; farm related link updated |
| `src/lib/createPilotCommercialPage.tsx` | Greenhouse metadata |
| `src/lib/buildPilotProductConfig.ts` | `photoSlugFromHref` mapping |
| `src/data/photography/placements.ts` | Route updated to dedicated page |
| `src/data/nav-agriculture.ts` | Nav href → dedicated route |
| `src/data/pilot-home.ts` | Greenhouse discovery links → dedicated route (4 entries) |
| `src/app/sitemap.ts` | Added route |
| `src/components/pilot/product/PilotProductPage.tsx` | Skip FAQ when empty (supports content-gap pages) |
| `scripts/greenhouse-route-validate.cjs` | Validation + screenshots |
| `docs/greenhouse-route-recovery.md` | This report |

**Not modified:** `/auto-insurance/`, `/claims/`, `/get-a-quote/` flows, global nav structure (only Greenhouse destination href).

---

## 4. Hero asset

| Field | Value |
|---|---|
| File | `/images/photography/commercial/greenhouse.webp` |
| Placement slug | `greenhouse` |
| Confidence | HIGH (per photography audit) |
| Alt | Commercial greenhouse with hydroponic herb rows |

---

## 5. Content source

All on-page copy derived from recovered fragments only:

- **Headline / eyebrow:** nav label "Greenhouse / Agribusiness"
- **Hero lead / trust:** nav description + Windsor-Essex broker framing (same pattern as farm page location convention, no coverage claims)
- **Quote CTA:** `/get-a-quote?type=business&industry=greenhouse` (from photography mapping)
- **Related products:** Farm Insurance + Commercial Hub (existing routes)

---

## 6. Unresolved content gaps (owner action)

1. **Coverage Explorer categories** — need approved greenhouse/agribusiness coverage types before explorer can render
2. **FAQ section** — need approved Q&A; section hidden when empty
3. **Extended positioning** — Essex County / Leamington greenhouse cluster copy if desired (not found in repo)
4. **Considerations section** — optional, not populated

Page architecture supports adding `coverageItems`, `faqItems`, and future `miniature` without rebuild.

---

## 7. Validation results

| Check | Result |
|---|---|
| `npm run build` | PASS |
| Route HTTP 200 | PASS |
| Dedicated greenhouse hero loads | PASS |
| Coverage Explorer | **N/A — content gap** (no states; section hidden) |
| No duplicated coverage text | N/A (no explorer) |
| Related-products rail | PASS |
| Talk to a Broker visible (no hover) | PASS |
| No horizontal overflow | PASS |
| Farm page intact (headline + 4-state explorer) | PASS |
| Agriculture nav → `/greenhouse-agribusiness-insurance/` | PASS (source verified) |
| Homepage / Auto / Claims / quote unchanged | PASS (regression routes 200) |

---

## 8. Screenshots (committed to repo)

| Viewport | Path |
|---|---|
| Desktop 1440px | `docs/qa-screenshots/greenhouse-route/greenhouse-agribusiness-insurance/desktop_1440.png` |
| Mobile 390px | `docs/qa-screenshots/greenhouse-route/greenhouse-agribusiness-insurance/mobile_390.png` |

Validation report: `docs/qa-screenshots/greenhouse-route/validation-report.json`

---

## Checkpoint

**Greenhouse route recovery complete. Awaiting owner review before merge/deploy.**

Next step after approval: owner supplies coverage categories + FAQ content for Coverage Explorer population.
