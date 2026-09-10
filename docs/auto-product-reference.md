# Auto Insurance Product Page — Approved Reference (FROZEN)

**Branch:** `cursor/auto-product-page-7402`  
**Route:** `/auto-insurance/`  
**Status:** Owner-approved. **Do not make further visual or structural changes to this page.**

Use this implementation as the visual and interaction reference when building remaining insurance product pages.

---

## Page composition (in order)

| # | Component | File |
|---|-----------|------|
| 1 | Header | `src/components/Header.tsx` |
| 2 | Auto hero | `src/components/pilot/auto/AutoProductHero.tsx` |
| 3 | Trust transition copy | inline in `PilotAutoPage.tsx` |
| 4 | Coverage Explorer | `src/components/pilot/auto/AutoCoverageExplorer.tsx` |
| 5 | Why a Broker | `src/components/pilot/auto/AutoBrokerStory.tsx` |
| 6 | Related products rail | `src/components/pilot/auto/AutoRelatedProducts.tsx` |
| 7 | FAQ | `src/components/pilot/auto/PremiumProductFAQ.tsx` |
| 8 | Final CTA | `src/components/pilot/auto/AutoFinalCta.tsx` |

**Page shell:** `src/components/pilot/PilotAutoPage.tsx`  
**Data:** `src/data/pilot-auto.ts`  
**Scoped styles:** `src/styles/pilot.css` (`.pilot-auto-*` selectors)

---

## Key assets

| Asset | Path |
|-------|------|
| Coverage miniature car | `public/images/miniatures/premium-miniature-car.png` |
| Hero photography | via `getPageHeroPhotography("auto-insurance")` |
| Related card photography | via `getPageHeroPhotography(item.photoSlug)` |

**Image delivery settings:** `src/data/photography/pilot-images.ts` (`PILOT_AUTO_COVERAGE_CAR`, `PILOT_AUTO_RELATED_IMAGE`, `PILOT_AUTO_HERO_IMAGE`)

---

## Mobile related-products rail — verified behaviour

Section: **“A lot to protect? Good thing we have options.”**  
Component: `AutoRelatedProducts` + `.pilot-auto-related-rail` / `.pilot-auto-related-track`

| Requirement | Implementation |
|-------------|----------------|
| Touch / swipe | `.pilot-auto-related-track { overflow-x: auto; -webkit-overflow-scrolling: touch; }` |
| Scroll snapping | `scroll-snap-type: x proximity` on track; `scroll-snap-align: start` on each `<li>` |
| No page-level horizontal overflow from rail | `.pilot-auto-related-rail { overflow: hidden; }` clips the scroll container |
| Partial next-card peek (swipe affordance) | Fixed card widths (`w-[220px]` mobile) inside padded container; edge mask gradient on rail |
| End padding after final card | Track padding (`0.375rem 0.25rem 1rem`) + section container inset (`px-4`) |

**No changes required** — behaviours confirmed in source (Sep 2026 verification pass).

---

## Explicitly frozen — do not modify on this branch

- Auto hero and hero photography
- Coverage Explorer (layout, miniature car, six coverage states, overlays)
- Why a Broker section
- FAQ section
- Final CTA section
- Footer
- Homepage and global navigation
- Global typography / colour system

---

## Applying to future product pages

When scaffolding a new product page from this reference:

1. Copy the **section order and spacing rhythm**, not the Auto-specific copy or data.
2. Reuse shared primitives: `PremiumGoldCTA`, `PremiumPilotButton`, `RevealOnScroll`, `PremiumProductFAQ` pattern.
3. Replace `AutoCoverageExplorer` with product-appropriate content; keep the **related-products rail pattern** for cross-sell.
4. Scope new styles under a product-specific prefix (e.g. `.pilot-home-*`) — do not edit approved `.pilot-auto-*` rules.
5. Do **not** propagate Auto changes to shared templates (`LineInsurancePage`, homepage pilot components) unless explicitly requested.

---

## Regression URLs (unchanged baseline)

- `/`
- `/auto-insurance/`
- `/trucking-insurance/`
- `/claims/`
- `/get-a-quote/`

Homepage motion/photography (`pilot-infinite-rail-track`) must remain untouched.
