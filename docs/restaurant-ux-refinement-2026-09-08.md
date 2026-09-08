# Restaurant UX Refinement — Trust Band Dedupe + Expandable Considerations

**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Route:** `/restaurant-insurance/` only  
**Date:** 2026-09-08  
**Status:** Implementation complete — **STOP FOR OWNER REVIEW**

---

## Stop gates

- **NO MERGE · NO DEPLOY · NO VERCEL PROMOTION**
- Approved Restaurant insurance copy **unchanged** (hero, Explorer, FAQs, considerations full text)
- Audit scanner **unchanged**
- Other routes **unchanged**

---

## 1. Duplicate intro — finding and decision

### Source wiring (`adaptCommercialIndustryContent`)

```typescript
heroLead: content.subhead,
trustStatement: content.subhead,  // ← identical assignment
```

For Restaurant, both fields resolve to the same approved `subhead` in `src/data/commercial-industries.ts`.

### Side-by-side — exact duplicated text

| Location | Component | Field | Renders |
|----------|-----------|-------|---------|
| **Hero intro** | `ProductHero` | `config.heroLead` | Below H1, above CTAs |
| **Trust band** | `PilotProductPage` | `config.trustStatement` | Full-width section immediately below hero |

**Both display this exact approved copy (106 words):**

> Restaurants in Windsor–Essex combine busy dining rooms, commercial kitchens, and — for many operators — AGCO-licensed alcohol service. Insurance needs to reflect those overlapping exposures: guest injury on your premises, property loss affecting kitchen equipment and inventory, food-related illness claims, and (where you serve alcohol) liability that standard general liability often excludes or limits. Ontario food service premises must also meet public health rules under O. Reg. 493/17, including having a certified food handler on site during operating hours — a regulatory requirement separate from what your insurance policy covers. A broker can help align property, liability, and optional endorsements to how your restaurant actually operates.

### Decision: **Remove the trust band** (keep hero intro)

| Instance | Structural role | Verdict |
|----------|-----------------|---------|
| Hero `subhead` | Primary page intro — paired with headline, eyebrow, photography, and quote CTAs | **Keep** — this is the approved hero value proposition |
| Trust band | Secondary trust/positioning strip — intended for a *distinct* shorter statement on other routes | **Remove for Restaurant** — adds zero new information when text is identical; creates a wall-of-text repeat before the Explorer |

**Implementation:** `showTrustBand: false` for `restaurant-insurance` only in `adaptCommercialIndustryContent()`. Hero subhead text in source data is untouched.

---

## 2. Reusable expandable considerations architecture

### New optional config props (`PilotProductPageConfig`)

| Prop | Type | Default | Purpose |
|------|------|---------|---------|
| `considerationsPresentation` | `'grid' \| 'expandable'` | `'grid'` | Opt-in presentation mode |
| `showTrustBand` | `boolean` | `true` | Hide trust band when `false` |

### Component structure

```
ProductConsiderations (variant router)
├── variant="grid"        → existing static 2-column card grid (unchanged)
└── variant="expandable"  → ProductConsiderationsExpandable (new)
```

### Expandable behavior

- All cards **collapsed by default** — title + extracted teaser visible
- **One open at a time** — expanding a card collapses the previous
- **Desktop:** 2-column grid (`sm:grid-cols-2`) — matches existing conventions
- **Mobile:** single column, full width
- **Keyboard:** focusable buttons, Enter/Space expand/collapse, `aria-expanded` + `aria-controls` + `role="region"`
- **Transition:** 300ms ease-out grid-row expand; `consideration-panel-enter` fade; **`prefers-reduced-motion`** disables animation

### Teaser extraction utility

`src/lib/extractConsiderationTeaser.ts` — truncates approved `description` text only (first sentence or word-boundary cut at ~140 chars). No new insurance claims composed.

### Restaurant opt-in

```typescript
// adaptCommercialIndustryContent — restaurant-insurance only
showTrustBand: content.slug !== "restaurant-insurance",
considerationsPresentation: content.slug === "restaurant-insurance" ? "expandable" : "grid",
```

All other routes: default `grid` + `showTrustBand: true` — **unchanged rendering**.

---

## 3. Teaser text — all 11 cards

**All teasers: extracted/truncated from approved full content. None written from scratch.**

| # | Title | Teaser (extracted) | Source |
|---|-------|-------------------|--------|
| 1 | Disclosures your broker typically needs | Cuisine type, seating capacity, cooking methods (deep fryer, open flame, wood-fired oven), hours, delivery or catering model, and whether… | **extracted** |
| 2 | Food safety is regulatory — not an insurance substitute | O. Reg. 493/17 requires at least one certified food handler on site during all operating hours at food service premises. Compliance reduces… | **extracted** (first sentence + truncated continuation) |
| 3 | Product Liability / Food Illness | May respond to certain claims alleging illness or injury from food you prepared or served, often as part of products-completed operations… | **extracted** |
| 4 | Liquor licensing, civil liability, and insurance are three different things | AGCO issues Liquor Sales Licences for eligible premises. | **extracted** (first sentence) |
| 5 | Delivery and app-based orders | In-house or third-party delivery can create commercial auto or hired and non-owned auto exposures when staff use personal vehicles. | **extracted** (full — under 140 chars) |
| 6 | Kitchen fire and suppression maintenance | Hood and duct cleaning, fire suppression inspection, and fryer protocols affect both fire code compliance and property underwriting. | **extracted** (full) |
| 7 | Patio and seasonal operations | Outdoor seating may require municipal encroachment agreements and AGCO licensing of outdoor areas. | **extracted** (full) |
| 8 | Business Interruption | May help with lost business income and certain continuing expenses when a covered property loss forces you to close or scale back service,… | **extracted** |
| 9 | Lease and franchisor requirements | Leases often specify minimum liability limits, additional insured status, and evidence of property coverage. | **extracted** (full) |
| 10 | WSIB and kitchen employee injuries | Most Ontario employers must carry WSIB coverage for workers. | **extracted** (first sentence) |
| 11 | Did you know? | Municipal business licences, fire inspections, and public health inspections are operational and regulatory requirements — not insurance coverages. | **extracted** (full) |

**Cards flagged "written, not extracted":** **0**

---

## 4. Full content preservation

All 11 `considerations[].description` values in `src/data/commercial-industries.ts` are **unchanged**. Expanded panel renders `{item.description}` verbatim.

Verified in QA: card #1 expanded text matches approved source exactly.

---

## Files changed

| File | Change |
|------|--------|
| `src/lib/buildPilotProductConfig.ts` | `showTrustBand`, `considerationsPresentation` pass-through; Restaurant opt-in |
| `src/types/pilot-product.ts` | New optional config types |
| `src/components/pilot/product/PilotProductPage.tsx` | Conditional trust band; pass variant to considerations |
| `src/components/pilot/product/ProductConsiderations.tsx` | Variant router (`grid` \| `expandable`) |
| `src/components/pilot/product/ProductConsiderationsExpandable.tsx` | **New** reusable accordion component |
| `src/lib/extractConsiderationTeaser.ts` | **New** teaser extraction utility |
| `src/app/globals.css` | `consideration-panel-enter` animation + reduced-motion override |
| `scripts/verify-restaurant-ux-refinement.cjs` | **New** verification harness |
| `docs/qa-screenshots/restaurant-ux-refinement-2026-09-08/*` | Screenshots + verification.json |

**Not changed:** Restaurant approved copy, Explorer, images, audit scanner, other routes' data.

---

## Content audit — Restaurant re-confirmation

| Metric | Before UX refinement | After UX refinement |
|--------|---------------------:|--------------------:|
| Substantive words | 1622 | **1622** |
| Classification | A | **A** |
| HIGH / MED / LOW | 0 / 0 / 0 | **0 / 0 / 0** |

Audit reads full `considerations[].description` from source data — not collapsed teaser UI state. Class A status preserved.

**Full site:** No classification or flag changes (A:3, B:16, C:18, D:21).

---

## Verification results

| Check | Result |
|-------|--------|
| `npm run build` | **PASS** |
| `npx tsc --noEmit` | **PASS** |
| `scripts/verify-restaurant-ux-refinement.cjs` | **PASS** |

### Restaurant functional checks

| Check | Result |
|-------|--------|
| Trust band removed; hero intro present | **PASS** |
| 11 expandable consideration cards | **PASS** |
| Collapsed by default | **PASS** |
| One open at a time | **PASS** |
| Expanded text matches approved source | **PASS** |
| Keyboard Enter expand | **PASS** |
| 390 / 768 / 1024 / 1440 — no overflow | **PASS** |
| Console errors | **0** |

### Cross-route regression (standard grid unchanged)

| Route | Expandable? | Static cards | Result |
|-------|-------------|--------------|--------|
| `/daycare-private-school-insurance/` | No | 9 visible | **PASS** |
| `/greenhouse-agribusiness-insurance/` | No | 6 visible | **PASS** |

---

## Screenshot artifacts

**Directory:** `docs/qa-screenshots/restaurant-ux-refinement-2026-09-08/`

| File | Contents |
|------|----------|
| `considerations-collapsed_1440.png` | Desktop — all 11 cards collapsed |
| `considerations-one-expanded_1440.png` | Desktop — one card expanded |
| `considerations-collapsed_390.png` | Mobile full page — collapsed grid |
| `verification.json` | Automated check results |

---

## Commit

**Hash:** `b43e927`  
**Message:** `feat(restaurant): UX refinement — dedupe intro + expandable considerations`

---

## Stop gates (repeat)

- **NO MERGE · NO DEPLOY · NO VERCEL PROMOTION**

**STOP FOR OWNER REVIEW.**
