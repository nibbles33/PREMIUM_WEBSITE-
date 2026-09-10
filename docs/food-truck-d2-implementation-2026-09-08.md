# Food Truck & Trailer Insurance — D2 Implementation Report

**Route:** `/food-truck-insurance/`  
**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Source draft:** `docs/food-truck-content-draft-2026-09-08.md`  
**Date:** 2026-09-08  
**Status:** Implementation complete — **STOP FOR OWNER REVIEW**

---

## Stop gates

- **NO MERGE · NO DEPLOY · NO VERCEL PROMOTION**
- Committed to feature branch only
- Restaurant, Liquor Liability, Hotel/Motel, Event Liability, Convenience Store, Daycare, Greenhouse, Explorer engineering, images, manifest, and audit scanner **unchanged**

---

## Files changed

| File | Change |
|------|--------|
| `src/data/commercial-industries.ts` | Food Truck hero, coverageIntro, 4 V2 Explorer cards, 8 considerations, 5 FAQs |
| `src/lib/buildPilotProductConfig.ts` | Slug-specific trust band + `considerationsPresentation: 'expandable'` for food truck |
| `scripts/verify-food-truck-d2.cjs` | D2 verification script (new) |
| `docs/qa-screenshots/food-truck-d2-2026-09-08/` | Responsive QA screenshots + `verification.json` |

**Not touched:** Explorer manifest, zone mappings, images, audit scanner, other industry/product routes.

---

## Seven final owner edits — applied

| # | Edit | Where applied |
|---|------|---------------|
| 1 | **Commercial auto / trailer distinction** — self-propelled truck or tow vehicle needs appropriate auto coverage; trailer PD depends on policy/scheduling | State 2 (`commercial-auto`) description + LEFT detail; Consideration #1; FAQ Q1 |
| 2 | **Personal vehicle towing** — disclose business use; do not assume personal policy is appropriate | State 2 LEFT detail; Consideration #1; FAQ Q1 |
| 3 | **Simplify equipment terminology** — primary wording: commercial property or equipment coverage; equipment floater once; no inland marine | State 3 LEFT detail; Consideration #3; FAQ Q2 |
| 4 | **Fire / propane** — Windsor municipal licensing only + separate underwriting sentence; no Ontario Fire Code generalization | Consideration #4 |
| 5 | **Food-handler** — O. Reg. 493/17 mobile premises; food-handler depends on operation type; Windsor WECHU/food-handler for applicable licence classes | State 4 LEFT detail; Consideration #5 |
| 6 | **Alcohol FAQ** — removed prevalence claim; kept AGCO Caterer's Endorsement / SOP framing; no standalone mobile liquor licence | FAQ Q5 |
| 7 | **Spoilage FAQ** — policy-dependent wording; no broad market-form language | FAQ Q4 |

**Forbidden phrases verified absent** on live page (verification script scan): inland marine, “often exclude or restrict commercial use”, Fire Code compliance claims, “Most food trucks do not sell”, standard property/auto spoilage market language, universal food-handler-on-site claim.

---

## Final Explorer mapping (4 states — unchanged architecture)

| State ID | Title | shortLabel | RIGHT (description) | LEFT detailTitle |
|----------|-------|------------|---------------------|------------------|
| `general-liability` | General Liability | Liability | May help respond to certain third-party BI/PD claims at events, commissaries, service locations — subject to policy terms | When a line at your service window becomes a liability claim |
| `commercial-auto` | Commercial Auto | Auto | May help with auto liability/PD for self-propelled truck or commercial vehicle; trailer scheduling policy-dependent — FSRA-regulated, separate from GL | On the road is a different policy question than at the service window |
| `equipment-coverage` | Equipment Coverage | Equipment | May help cover cooking equipment, refrigeration, generators, POS — subject to scheduling and causes of loss | The kitchen inside the truck is not always insured like the truck itself |
| `product-liability` | Product Liability | Food Claims | May help respond to illness/allergic reaction/injury claims — often products-completed operations — subject to policy terms | Foodborne illness claims are a distinct exposure from a slip-and-fall |

**Preserved:** state IDs, titles, zone mappings (`routes.ts`), `fleet-vehicles` archetype, `food-truck-trailer-insurance-interactive-master.png`.  
**No 5th states** for liquor liability, business interruption, or spoilage.

---

## Final considerations (8 — expandable)

1. Self-propelled truck, towable trailer, or tow vehicle  
2. Commercial auto does not replace business liability or kitchen property coverage  
3. Attached, portable, and off-premises equipment  
4. Propane, cooking equipment, and fire safety *(Windsor municipal only)*  
5. Mobile food premises and food-handler requirements  
6. Commissary prep, storage, and where food is made  
7. Festivals, events, and certificate requirements  
8. Refrigeration, spoilage, and income after a covered loss  

`considerationsPresentation: 'expandable'` via slug check in `adaptCommercialIndustryContent()` — reuses shared `ProductConsiderationsExpandable` (one open at a time, keyboard, `aria-expanded`, reduced-motion).

---

## Final FAQ set (5)

1. Is a towable food trailer insured differently from a self-propelled food truck?  
2. Does my commercial auto policy cover the kitchen equipment inside my truck?  
3. Do I need insurance to vend at festivals, farmers markets, or private events?  
4. Is food spoilage automatically covered if my refrigerator or generator fails?  
5. Can a food truck serve alcohol in Ontario?  

Templated FAQ overlap with `/real-estate-insurance/` **removed**.

---

## Trust-band handling

**Approach:** Slug-specific override in `adaptCommercialIndustryContent()` — no new `IndustryPageContent` field or adapter redesign.

```typescript
trustStatement:
  content.slug === "food-truck-insurance"
    ? "For Windsor–Essex food trucks, mobile trailers, and event vendors — reviewed through an independent broker who can coordinate commercial auto, liability, and equipment coverage for how you actually operate."
    : content.subhead,
```

- Hero (`subhead`) carries substantive dual-exposure introduction  
- Trust band carries distinct Windsor–Essex coordination copy  
- Verified: hero ≠ trust (`verification.json` → `trustBand.distinct: true`)

---

## Regulatory / coverage boundary confirmation

| Category | Treatment |
|----------|-----------|
| **[COVERAGE]** | Hedged card copy (`may help`, `subject to policy terms`); spoilage/BI not automatic |
| **[UNDERWRITING]** | Event certificates, insurer questions on propane/cooking — separated from regulatory claims |
| **[REGULATORY]** | O. Reg. 493/17 mobile premises; Windsor Schedule M2 fire-extinguisher/propane only — **not** county-wide or Ontario Fire Code generalization |
| **[EXPOSURE]** | Dual vehicle/kitchen profile in hero; commissary/event context in considerations |

**Not stated:** universal $2M requirement, county-wide municipal rules, universal Fire Code, universal commercial-auto trailer treatment, universal food-handler classification, automatic spoilage/BI, standalone mobile liquor licence.

---

## Audit — Food Truck before → after

| Metric | Before (live baseline) | After (implementation) |
|--------|------------------------|--------------------------|
| Substantive words | **307** | **1,624** |
| Hero words | 15 (generic) | 96 (specific) |
| Explorer states | 4 (no detail pairs) | 4 (V2 detail pairs + shortLabels) |
| Considerations | 0 | **8** (576w, expandable) |
| FAQs | 4 (templated overlap) | **5** (food-truck-specific) |
| HIGH flags | **1** (Commercial Auto “Covers the truck or trailer…”) | **0** |
| MEDIUM flags | 0 | 0 |
| LOW flags | 0 | 0 |
| Classification | **D** | **A** |

---

## Site-wide classification delta

| Class | Before Food Truck D2* | After Food Truck D2 |
|-------|----------------------:|--------------------:|
| **A** | 4 | **5** (+1) |
| **B** | 16 | 16 |
| **C** | 18 | 18 |
| **D** | 20 | **19** (−1) |

\*Before counts from branch state immediately prior to this implementation (food truck was the remaining D-route among recently remediated hospitality lines).

**Regression — unchanged routes verified via audit word/class parity:**

| Route | Words | Class |
|-------|------:|-------|
| `/restaurant-insurance/` | 1,622 | A |
| `/liquor-liability-insurance/` | 2,005 | A |
| `/daycare-private-school-insurance/` | 956 | A |
| `/greenhouse-agribusiness-insurance/` | 757 | A |

---

## QA results

### Build / typecheck / audit

| Check | Result |
|-------|--------|
| `npm run build` | ✅ Pass |
| `npx tsc --noEmit` | ✅ Pass |
| `npx tsx scripts/product-content-audit.ts` | ✅ Pass — Food Truck **A**, 0 flags |
| `node scripts/verify-coverage-explorer-ux-v2.cjs` | ✅ Pass |
| `node scripts/verify-food-truck-d2.cjs` | ✅ Pass |

### Responsive verification (390 / 768 / 1024 / 1440)

| Check | Result |
|-------|--------|
| Hero + trust band | ✅ Distinct copy; Windsor–Essex trust present |
| 4 Explorer states | ✅ All tabs switch; unique LEFT/RIGHT pairs |
| Default state | ✅ `general-liability` |
| 8 expandable considerations | ✅ Count confirmed |
| One-open-at-a-time | ✅ Verified |
| Keyboard / aria-expanded | ✅ Shared expandable component |
| 5 FAQs | ✅ `.pilot-auto-faq-trigger` count = 5 |
| No horizontal overflow | ✅ All viewports overflow = 0 |
| No Explorer crop | ✅ `objectFit: contain`, image present |
| No console errors | ✅ Empty `consoleErrors` |

### Screenshots

| File | Viewport / section |
|------|-------------------|
| `docs/qa-screenshots/food-truck-d2-2026-09-08/hero_1440.png` | Hero + trust band |
| `docs/qa-screenshots/food-truck-d2-2026-09-08/explorer_390.png` | Explorer default |
| `docs/qa-screenshots/food-truck-d2-2026-09-08/explorer_768.png` | Explorer |
| `docs/qa-screenshots/food-truck-d2-2026-09-08/explorer_1024.png` | Explorer |
| `docs/qa-screenshots/food-truck-d2-2026-09-08/explorer_1440.png` | Explorer |
| `docs/qa-screenshots/food-truck-d2-2026-09-08/considerations_1440.png` | Practical considerations |
| `docs/qa-screenshots/food-truck-d2-2026-09-08/verification.json` | Automated verification payload |

---

## Unresolved concerns

1. **Restaurant AGCO proof-of-insurance during licensing** — remains separate backlog (not addressed in this task).  
2. **Trust-band architecture** — food truck uses slug-specific override in adapter; optional future `trustStatement` field on `IndustryPageContent` would generalize without slug checks (not in scope).  
3. **County municipal requirements** — LaSalle, Tecumseh, Amherstburg, Essex, Kingsville, Lakeshore mobile-vendor rules **not verified**; intentionally omitted.  
4. **QA server note** — stale `next-server` processes can serve HTML referencing missing chunks (404 hydration failure); verification requires fresh `next start` after `npm run build`.

---

## Stop gates (repeat)

- **NO MERGE · NO DEPLOY · NO VERCEL PROMOTION**
- **STOP FOR OWNER REVIEW**
