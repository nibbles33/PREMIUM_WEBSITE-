# Batch A — Personal Lines Rollout (Review Pack)

**Branch:** `cursor/personal-batch-a-7402`  
**PR:** https://github.com/nibbles33/PREMIUM_WEBSITE-/pull/5  
**Status:** Ready for re-review — **STOP before Batch B**

## Fixes in this revision

1. **Viewable QA screenshots** committed under `docs/qa-screenshots/batch-a/` (26 PNGs — desktop 1440px + mobile 390px per route)
2. **Hero photography wired** for all 13 personal routes (including previously missing 5 specialty routes)
3. **Related products rail desktop scroll** fixed on Auto + all Batch A pages via shared `RelatedProductsScrollRail` (prev/next arrows, wheel scroll, drag)

---

## Hero photography — previously missing 5 routes

| Route | Placement slug | Image used | Source |
|---|---|---|---|
| `/mobile-home-insurance/` | `mobile-home-insurance` | `/images/photography/personal/landlord.webp` | Manufactured home scene (original audit asset for `landlord` placement) |
| `/personal-umbrella-insurance/` | `personal-umbrella-insurance` | `/images/photography/personal/home-insurance.webp` | Family/home asset protection context (same library asset used on Auto related card) |
| `/home-sharing-insurance/` | `home-sharing-insurance` | `/images/photography/personal/home-sharing-insurance.webp` | **New WebP** from inbox `ChatGPT Image Sep 1, 2026, 09_43_42 PM (10).png` (townhouse + ride-share arrival) |
| `/life-insurance/` | `life-insurance` | `/images/photography/special/contact.webp` | Professional consultation / inquiry coordination |
| `/group-home-auto-insurance/` | `group-home-auto-insurance` | `/images/photography/special/team.webp` | Team/group meeting scene |

All 13 personal routes now resolve hero photography via `placements.ts` + `photographySlug` in page config.

---

## Route matrix

| Route | Hero photo | Miniature | Explorer | Desktop | Mobile |
|---|---|---|---|---|---|
| `/home-insurance/` | home-insurance.webp | None | Interactive | PASS | PASS |
| `/condo-insurance/` | condo.webp | None | Interactive | PASS | PASS |
| `/tenant-insurance/` | tenant.webp | None | Interactive | PASS | PASS |
| `/landlord-insurance/` | landlord.webp | None | Interactive | PASS | PASS |
| `/motorcycle-insurance/` | motorcycle.webp | None | Interactive | PASS | PASS |
| `/boat-insurance/` | boat.webp | None | Interactive | PASS | PASS |
| `/cottage-insurance/` | cottage.webp | None | Interactive | PASS | PASS |
| `/travel-insurance/` | travel-insurance.webp | None | Interactive | PASS | PASS |
| `/mobile-home-insurance/` | landlord.webp | None | Interactive | PASS | PASS |
| `/personal-umbrella-insurance/` | home-insurance.webp | None | Interactive | PASS | PASS |
| `/home-sharing-insurance/` | home-sharing-insurance.webp | None | Interactive | PASS | PASS |
| `/life-insurance/` | contact.webp | None | Interactive | PASS | PASS |
| `/group-home-auto-insurance/` | team.webp | None | Interactive | PASS | PASS |

**Not modified:** `/auto-insurance/` (functional scroll fix only), `/` homepage

---

## Related products rail fix

**Root cause:** Desktop users had no discoverable way to reach overflow cards — scrollbar hidden (`.pilot-scroll-hide`), no arrow controls, and vertical mouse wheel does not scroll horizontal overflow by default. Wider cards from the polish pass (340px) increased overflow but did not cause the bug — it only made more cards unreachable.

**Fix:** Shared `RelatedProductsScrollRail` used by both `AutoRelatedProducts` and `ProductRelatedProducts`:
- Desktop prev/next gold-outline arrow buttons when overflow exists
- Vertical wheel → horizontal scroll while hovering the rail
- Click-and-drag on the track
- Mobile touch/swipe unchanged (scroll-snap + overflow-x preserved)

**Auto related products (7 cards):** Home, Condo, Tenant, Motorcycle, Boat, Cottage, Personal Umbrella — all reachable after fix (validated: maxScroll 1424px, next button advances scrollLeft).

---

## Validation

| Check | Result |
|---|---|
| `npm run build` | PASS |
| All 13 personal routes HTTP 200 | PASS |
| All 13 personal routes hero photo present | PASS |
| Auto related rail desktop scroll | PASS (7 cards, next button) |
| Home related rail (3 cards, no overflow) | PASS |
| Regression routes | PASS |
| Broker CTA default visibility | PASS |

Screenshots: `docs/qa-screenshots/batch-a/{slug}/desktop_1440.png` and `mobile_390.png`

---

## Checkpoint

**Awaiting owner re-review.** Do not proceed to Batch B until approved.
