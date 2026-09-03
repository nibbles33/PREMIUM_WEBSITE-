# Card Navigation Fix — Owner Review Pack

**Branch:** `cursor/card-navigation-fix-7402`  
**Status:** STOP for owner review — do not merge or deploy

---

## 1. Root cause

Both drag-enabled rails called **`setPointerCapture()` immediately on `pointerdown`**, before determining whether the user intended to click or drag.

That capture steals the pointer from child `<Link>` elements, so the browser never completes a normal click on product cards — cards looked interactive (cursor, hover) but did not navigate.

**Affected surfaces:**
- Homepage Personal Insurance carousel (`PilotPersonalFilmstrip`)
- Product-page related-products rail (`RelatedProductsScrollRail` → `ProductRelatedProducts`, `AutoRelatedProducts`)

**Not affected (already used plain `Link`, no capture):**
- “Yep. We insure that too.” tiles (`PilotBreadthUniverse` / `YepMediaTile`)
- Commercial discovery product rows (`PilotCommercialDiscovery`)
- Commercial category pills (buttons — tab switch only, by design)

---

## 2. Shared component(s) responsible

| Component | Role |
|---|---|
| `src/lib/pointerDragGuard.ts` | **New** — drag threshold + post-drag click suppression |
| `src/components/pilot/RelatedProductsScrollRail.tsx` | Shared scroll/drag shell for product + auto related rails |
| `src/components/pilot/PilotPersonalFilmstrip.tsx` | Homepage personal insurance carousel |

Card markup (`Link` wrapping entire card) was already correct — the drag layer was blocking navigation.

---

## 3. Files changed

| File | Change |
|---|---|
| `src/lib/pointerDragGuard.ts` | New — 8px movement threshold before drag activation |
| `src/components/pilot/RelatedProductsScrollRail.tsx` | Defer pointer capture until drag threshold crossed |
| `src/components/pilot/PilotPersonalFilmstrip.tsx` | Same threshold pattern for transform-based carousel |
| `src/styles/pilot.css` | `.is-dragging` cursor on related rail track |
| `scripts/card-navigation-validate.cjs` | Automated href + click/drag validation |
| `docs/qa-screenshots/card-navigation-fix/validation-report.json` | Runtime proof |

---

## 4. Drag/click suppression involved?

**Yes.** Immediate `setPointerCapture` on pointerdown was the bug.

**Fix:** Pointer capture activates only after **8px** of movement (`POINTER_DRAG_THRESHOLD_PX`). A tap/click without meaningful movement leaves the link’s native click intact. After a completed drag, a one-shot capture-phase listener suppresses the synthetic click that would otherwise fire.

---

## 5. Homepage Personal carousel — tested destinations

| Card | Destination | Result |
|---|---|---|
| Auto | `/auto-insurance/` | PASS |
| Home | `/home-insurance/` | PASS |
| Condo | `/condo-insurance/` | PASS |
| Tenant | `/tenant-insurance/` | PASS |
| Motorcycle | `/motorcycle-insurance/` | PASS |
| Boat | `/boat-insurance/` | PASS |
| Cottage | `/cottage-insurance/` | PASS |
| Travel | `/travel-insurance/` | PASS |

---

## 6. Product related-card examples — tested destinations

From `/commercial-property-insurance/` (owner screenshot context):

| Card | Configured route | Result |
|---|---|---|
| Commercial Insurance Hub | `/commercial-insurance/` | PASS |
| Business Interruption | `/business-interruption-insurance/` | PASS |
| Small Business | `/small-business-insurance/` | PASS |

Entire card surface + “Explore coverage →” footer share the same `Link` destination.

---

## 7. Yep / commercial discovery status

| Surface | Navigation | Status |
|---|---|---|
| Yep. We insure that too. | `Link` per tile | Already working — no code change needed |
| Commercial discovery product rows | `Link` per product | Already working — no code change needed |
| Commercial category pills | `button` tab switch | By design — not product navigation |

Sample Yep/commercial hrefs audited (HTTP 200): Trucking, Farm, Greenhouse, Retail, Commercial Auto, Contractors.

---

## 8. Configured product links audited

**~60 unique hrefs** across discovery + related-product configs (personal filmstrip, Yep carousel, commercial categories, auto related, all 57 product-page related rails).

Validation script audited **17 representative discovery hrefs** + **8 personal click tests** + **3 related click tests** — all PASS.

Full unique href inventory available via product registries in `pilot-home.ts`, `pilot-auto.ts`, `pilot-*-registry.ts`.

---

## 9. Broken/dead hrefs discovered

**None** in audited discovery/related href set (all HTTP 200).

---

## 10. Desktop click/drag test result

| Test | Result |
|---|---|
| Simple click on related card | Navigates PASS |
| Click title / image / Explore coverage | Same Link — PASS |
| Drag left 120–150px on filmstrip | Does NOT navigate PASS |
| Drag left 150px on related rail | Does NOT navigate PASS |
| Arrow buttons (filmstrip) | Unchanged — PASS |

---

## 11. Mobile tap/swipe test result

Automated drag simulation confirms swipe gestures do not trigger navigation. Tap navigation uses the same threshold logic as desktop click (pointer events unified).

---

## 12. Build result

`npm run build` — **PASS**

Report: `docs/qa-screenshots/card-navigation-fix/validation-report.json`
