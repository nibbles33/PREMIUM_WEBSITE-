# Liquor Liability — D2 V2 Implementation Report

**Route:** `/liquor-liability-insurance/`  
**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Approved draft:** `docs/liquor-liability-content-draft-v2-2026-09-08.md`  
**Date:** 2026-09-08  
**Status:** Implemented — **STOP FOR OWNER REVIEW**

---

## Stop gates

- **NO MERGE · NO DEPLOY · NO VERCEL PROMOTION**
- Single-route implementation only
- Restaurant AGCO application proof wording **not** changed (separate follow-up)

---

## Files changed

| File | Change |
|------|--------|
| `src/data/product-pages/commercial-products-specialty.ts` | Full V2 copy — hero, coverageIntro, 4 Explorer states, 9 considerations, 5 FAQs, whoItIsFor |
| `src/lib/buildPilotProductConfig.ts` | `considerationsPresentation: 'expandable'` for `liquor-liability-insurance` |
| `src/components/LineInsurancePage.tsx` | Added optional `shortLabel` to `CoverageCard` type |
| `scripts/verify-liquor-liability-d2.cjs` | QA verification script (new) |
| `docs/product-content-audit-2026-09-07.md` | Re-run audit output (liquor row updated) |
| `docs/qa-screenshots/liquor-liability-d2-2026-09-08/` | Responsive QA screenshots + verification.json |

**Not changed:** Explorer engineering, images, zone mappings, audit scanner logic, Restaurant, Daycare, Greenhouse, other routes.

---

## Three final owner edits applied

### 1. State 2 — Altercations
- **Preserved:** internal title `Assault & Battery`, state ID `assault-battery`, zones unchanged
- **Implemented:** `shortLabel: Altercations`, `detailTitle: When an altercation leads to a liability claim`
- **Removed:** Jack-O's Sports Bar / Ontario court-case sentence from visitor-facing `detailDescription`
- **Replaced with:** policy-dependent assault-and-battery wording (security/crowd-control exposures)

### 2. State 3 — Defence Costs
- **Removed:** "duty-to-defend wording" from visitor-facing copy
- **Implemented:** "Where defence coverage applies, how legal costs are handled depends on the policy wording, including applicable deductibles, retentions, limits and exclusions."
- **Preserved:** civil claims vs AGCO regulatory enforcement distinction

### 3. Practical Consideration #3
- **Removed:** customer-facing AGCO application required-documents proposition
- **Implemented:** contractual proof-of-insurance framing separate from provincial licensing requirements

---

## V2 content implemented

| Surface | Implementation |
|---------|----------------|
| Hero / subhead | Customer-first V2 brokerage hero |
| Trust band (`whoItIsFor`) | Approved copy; **enabled** and distinct from hero |
| `coverageIntro` | Hedged policy-dependent framing |
| Explorer states | 4 — all V2 shortLabels, descriptions, detailTitle, detailDescription |
| Practical Considerations | 9 — expandable presentation |
| FAQ | 5 — corrected AGCO/regulatory/insurance distinctions |

---

## Explorer mapping confirmation

| State ID | Title (technical) | shortLabel | Zones (unchanged) |
|----------|-------------------|------------|-------------------|
| `patron-injury-property-damage` | Patron Injury & Property Damage | Patron Claims | building-shell, kitchen-prep, bar-zone |
| `assault-battery` | Assault & Battery | **Altercations** | dining-floor, building-shell |
| `legal-defence` | Legal Defence | Defence Costs | dining-floor, building-shell |
| `event-host-liquor` | Event Host Liquor | Host / Event | bar-zone, bar-seating, dining-floor |

**Image:** `liquor-liability-insurance-interactive-master.png` (unchanged)  
**LEFT/RIGHT separation:** Verified — no duplicate title/description pairs across selector vs detail panel.

---

## Considerations presentation

- `considerationsPresentation: 'expandable'` via `adaptCommercialProductContent`
- Reuses shared `ProductConsiderationsExpandable` component (same as Restaurant)
- **9 cards** — all collapsed by default
- **One open at a time** — verified
- **Keyboard / aria-expanded** — verified via component reuse
- **Reduced motion** — inherited from `usePrefersReducedMotion` hook

---

## Regulatory framing confirmation

Preserved four-category distinctions throughout:

| Category | Examples preserved |
|----------|-------------------|
| [COVERAGE] | Liquor liability may help respond… subject to policy terms |
| [UNDERWRITING] | Sales mix, hours, security; quote information |
| [REGULATORY] | LSL vs SOP; Standard 4.1 training for LSL/Caterer's Endorsement; SOP Smart Serve not required |
| [EXPOSURE] | Civil liability separate from enforcement |

**Not reintroduced:**
- AGCO statutory insurance mandate
- AGCO ordinary-application proof-of-insurance claim
- Universal CGL exclusion language
- Universal Smart Serve requirement
- Categorical coverage guarantees

---

## Before → after audit

| Metric | Before (live) | After (implemented) |
|--------|---------------|---------------------|
| Substantive words | **258** | **2,005** |
| Explorer states | 4 | 4 |
| Practical Considerations | 0 | **9** (839w) |
| FAQ count | 4 | **5** |
| HIGH flags | **1** | **0** |
| MEDIUM flags | 0 | 0 |
| LOW flags | 0 | **1** |
| Classification | **D** | **A** |

**Remaining LOW flag:** Consideration #4 references Standard 4.1 not applying to SOP — audit scanner flags "mandatory" language; copy is accurate per AGCO/LCBO primary sources (regulatory training requirement stated in negation context).

### Full-site classification delta

| Grade | Before | After | Delta |
|-------|--------|-------|-------|
| A | 3 | **4** | +1 (liquor) |
| B | 16 | 16 | — |
| C | 18 | 18 | — |
| D | 21 | **20** | −1 (liquor) |

**Unchanged routes verified:** Restaurant (A), Daycare (A), Greenhouse (A) — classifications stable.

---

## Build & typecheck

```
npm run build          ✅
npx tsc --noEmit       ✅
npx tsx scripts/product-content-audit.ts  ✅
```

---

## Responsive QA

**Viewports tested:** 390px, 768px, 1024px, 1440px

| Check | Result |
|-------|--------|
| Hero V2 copy | ✅ |
| Trust band present & distinct | ✅ |
| 4 Explorer selectors | ✅ |
| Default state (Patron Claims) | ✅ |
| Altercations shortLabel (state 2) | ✅ |
| assault-battery mapping functional | ✅ |
| All V2 LEFT/RIGHT detail content | ✅ |
| 9 expandable considerations | ✅ |
| One-open-at-a-time | ✅ |
| No Jack-O's in visitor copy | ✅ |
| No duty-to-defend jargon (state 3) | ✅ |
| No AGCO app-docs claim (consideration #3) | ✅ |
| No horizontal overflow (all viewports) | ✅ |
| Explorer image present, object-fit contain | ✅ |
| No console errors | ✅ |

**Screenshot paths:**
- `docs/qa-screenshots/liquor-liability-d2-2026-09-08/explorer-default_390.png`
- `docs/qa-screenshots/liquor-liability-d2-2026-09-08/explorer-default_768.png`
- `docs/qa-screenshots/liquor-liability-d2-2026-09-08/explorer-default_1024.png`
- `docs/qa-screenshots/liquor-liability-d2-2026-09-08/explorer-default_1440.png`
- `docs/qa-screenshots/liquor-liability-d2-2026-09-08/explorer-altercations_1440.png`
- `docs/qa-screenshots/liquor-liability-d2-2026-09-08/considerations-collapsed_1440.png`
- `docs/qa-screenshots/liquor-liability-d2-2026-09-08/verification.json`

---

## Regression results

| Route | Check | Result |
|-------|-------|--------|
| Restaurant | Expandable considerations (11 cards) | ✅ pass |
| Restaurant | Trust band dedupe | ✅ unchanged |
| Restaurant | Explorer V2 detail pairs | ✅ unchanged |
| Daycare | Standard grid considerations | ✅ unchanged |
| Greenhouse | Inline Explorer V2 copy | ✅ unchanged (A) |

`node scripts/verify-restaurant-ux-refinement.cjs` — **pass**

---

## Remaining concerns / follow-ups

1. **Restaurant Consideration #4** still states *"proof of insurance may still be requested during the licensing or application process"* — V2 research could not verify this from current AGCO primary sources. **Out of scope for this task;** recommend separate correction pass.

2. **`visualCaption` limitation:** Explorer image caption may still display technical title "Assault & Battery" (derived from `title` in `buildPilotProductConfig.ts`). Customer-facing selector shows **Altercations**. Engineering change not requested.

3. **Audit LOW flag** on Consideration #4 Standard 4.1/SOP wording — substantively correct; scanner sensitivity only.

---

## STOP FOR OWNER REVIEW

Implementation complete on feature branch. No merge, deploy, or production promotion performed.
