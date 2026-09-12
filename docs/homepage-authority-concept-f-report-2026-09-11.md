# Homepage Authority Upgrade — Concept F / “Premium Actual”

**Date:** 2026-09-11 (completed 2026-09-12 UTC)  
**Branch:** `cursor/homepage-authority-concept-f`  
**Base:** `origin/main` @ `f74d5d8afb635bd7a86dee08950d2551bee7d5e5`  
**Commit SHA:** `32a06dfcdc6fe20f21c7747e588a6c176ab0753f`  
**Worktree note:** branch tracks feature work only; not merged.

---

## Explicit stop-gate status

| Gate | Status |
|------|--------|
| **MERGED TO MAIN** | **NO** |
| **VERCEL PRODUCTION DEPLOYED** | **NO** |
| **PREMIUMIB.COM CHANGED** | **NO** |
| DNS / WordPress / Resend DNS | Untouched |
| Carrier inventory | Unchanged (12 approved) |
| Coverage Explorer architecture | Untouched |
| Unrelated dirty files | Not committed |

**Deliverable:** feature branch → automated QA → Vercel Preview (if auth available) → **owner visual review → STOP**.

---

## Objective delivered

Homepage evolved (not redesigned) to combine:

1. Existing Premium design system / rails / interactions  
2. Stronger institutional credibility  
3. Better social proof (Google Places live architecture)  
4. Better commercial authority copy  
5. Stronger Windsor-Essex + Oracle RMS framing  
6. Verified facts + awards rail (with 9th-award discrepancy flagged)  
7. Live Google rating/count architecture (server-side; graceful fallback)

---

## Homepage sequence (implemented)

1. Enhanced hero (`PilotHomeHero`) — proof line: Windsor-Essex · A Division of Oracle RMS; “Real brokers. Real advice.”  
2. Authority proof strip (`PilotAuthorityStrip`) — editorial band, not SaaS cards  
3. Carrier market access (`PilotCarrierMarquee`) — “More markets. More choice.” framing; **existing marquee + ultrawide preserved**  
4. Personal filmstrip (`PilotPersonalFilmstrip`) — **2,400+ homes covered** annotation; 14 products preserved  
5. Commercial discovery (`PilotCommercialDiscovery`) — “Serious insurance for serious businesses.”; 10 tabs / 54 placements preserved  
6. Why Premium (`PilotWhyPremium`) — editorial split, four lined proof statements  
7. Yep / Breadth (`PilotBreadthUniverse`) — preserved  
8. Google social proof (`PilotGoogleReviews`) — live Places rating/count when keyed; no fake reviews  
9. Awards (`PilotLocalProof`) — “Recognized locally. Recognized nationally.”; rail motion preserved  
10. Windsor + Oracle (`PilotWindsorOracle`) — “Built here. Connected beyond here.”  
11. Team credibility (`PilotTeamCredibility`) — real team photos only  
12. Final CTA (`PilotFinalCta`) — “Insurance should feel simpler from here.” + Home · Auto · Business · Specialty  

---

## Files changed / added

### Added
- `src/data/homepage-authority.ts` — verified facts, Why Premium points, featured team names, Google Place metadata  
- `src/lib/google/places.ts` — server-side Places API (New) fetch + 6h revalidate cache  
- `src/components/pilot/PilotAuthorityStrip.tsx`  
- `src/components/pilot/PilotWhyPremium.tsx`  
- `src/components/pilot/PilotGoogleReviews.tsx`  
- `src/components/pilot/PilotWindsorOracle.tsx`  
- `src/components/pilot/PilotTeamCredibility.tsx`  
- `scripts/concept-f-homepage-qa.cjs`  
- `scripts/concept-f-recapture-screenshots.cjs`  
- `docs/qa-screenshots/homepage-authority-concept-f-2026-09-11/`  
- `docs/homepage-authority-concept-f-report-2026-09-11.md` (this file)

### Modified
- `src/components/pilot/PilotHomePage.tsx` — async assembly + Google fetch; new section order  
- `src/components/pilot/PilotHomeHero.tsx` — restrained institutional proof line  
- `src/components/pilot/PilotCarrierMarquee.tsx` — market-access framing copy  
- `src/components/pilot/PilotPersonalFilmstrip.tsx` — homes-covered annotation  
- `src/components/pilot/PilotCommercialDiscovery.tsx` — commercial authority copy  
- `src/components/pilot/PilotLocalProof.tsx` — awards hierarchy copy + `#awards-heading` anchor  
- `src/components/pilot/PilotFinalCta.tsx` — closing conversion copy + taxonomy  
- `.env.example` — documents `GOOGLE_PLACES_API_KEY`

### Reused (not rewritten)
- Carrier / Yep / Awards / Personal rails & drag-swipe  
- Ultrawide carrier continuity  
- Reduced-motion behaviors  
- Header / Footer / product routes / Coverage Explorer  

---

## Verified facts used

| Fact | Placement |
|------|-----------|
| 2,700+ clients | Authority strip |
| 31+ years combined experience | Authority strip (+ team section) |
| 9 awards & recognitions | Authority strip (**see awards discrepancy**) |
| A Division of Oracle RMS | Hero + authority strip + Windsor section |
| 2,400+ homes covered | Personal section annotation only |
| **No GWP** | Not published |

---

## Awards verification

**Owner states total = 9.**

**Repository / rail inventory = 8 badge assets** in `pilotAwardBadges`:

1. Windsor CommunityVotes Platinum 2024  
2. Windsor CommunityVotes Gold 2026  
3. Windsor CommunityVotes Platinum 2023  
4. Windsor CommunityVotes Platinum 2022  
5. Windsor CommunityVotes Platinum 2021  
6. Insurance Business Canada 5-Star Brokerage Ontario 2022  
7. Insurance Business Canada 5-Star Brokerage 2021  
8. Insurance Business Canada Fast Brokerages 2024  

Also present under awards media: `event-golf-sponsorship.jpg` — **event photography, not an award badge**.

**Ninth award: NOT IDENTIFIED in repository.**  
**Not invented.** Authority strip still shows owner-approved **9**; awards rail continues to display the **8 verified badges**.  

**Owner input required:** identify the ninth recognition (name + year + artwork if available).

---

## Google architecture

- **Business name:** Premium Insurance Brokers a division of ORACLE RMS  
- **Place ID:** `ChIJaVZQQZ0tO4gRXgDIvYqSQYs`  
- **Address:** 3063 Dougall Ave, Windsor, ON N9E 1S3, Canada  
- **Share URL CTA:** `https://share.google/TOTb2uanZ8DS8NMRQ`  
- **API:** Places API (New) Place Details  
- **Fields:** `rating,userRatingCount`  
- **Server-only env:** `GOOGLE_PLACES_API_KEY`  
- **Cache:** Next.js `fetch` revalidate **6 hours**  
- **Failure behavior:** status `unavailable`; UI shows explicit non-live fallback; **never** renders 0 reviews; **never** presents baseline 4.7 / 82 as live  
- **Baseline 4.7 / 82:** stored for owner validation only in `homepage-authority.ts`

### Google live status (this environment)

**NOT LIVE** — `GOOGLE_PLACES_API_KEY` not configured in agent/runtime.  
Homepage renders development/unavailable fallback + “Read Our Google Reviews” CTA.

### Owner setup (Preview / Production env — do not put in client)

1. Google Cloud project → enable **Places API (New)**  
2. Create API key restricted to Places API (New); keep server-side only  
3. Set Vercel env (Preview and/or Production): `GOOGLE_PLACES_API_KEY=...`  
4. Redeploy Preview (not Production unless separately approved)  
5. Confirm homepage shows live rating + review count without inventing excerpts  

---

## QA results

### Build
- `npm run build` — **PASS**

### Static / inventory
| Check | Result |
|-------|--------|
| Personal discovery | **14/14 PASS** |
| Commercial homepage categories | **10/10**, **54/54 PASS** |
| Product grades | **A44 / B16 / C0 / D0 PASS** |
| Navigation discovery | **0 errors PASS** |
| SEO canonical | **PASS** |
| Legacy cutover | **PASS** (incl. `/talk-to-a-broker/` → `/contact/?intent=broker`) |
| Partners public inventory | **44 unique** (unchanged by this batch) |
| Homepage carriers | **12 approved** unchanged |
| Claims directory | **Not modified** this batch |
| Coverage Explorer regression | **236/236 PASS**, 0 fail |
| Carrier marquee ultrawide | **PASS** 390→3840 |
| Card navigation | **231/231 click PASS**; drag/swipe checks PASS |
| Concept F homepage QA | **PASS** (no horizontal overflow; sections present) across 390–3840 |

### Responsive visual QA
Full-page screenshots: **390 / 1440 / 1920 / 2560**  
Section captures @1440: hero+authority, authority, carrier, personal, commercial, why-premium, yep, google, awards, windsor, team, final-cta  

Artifacts: `docs/qa-screenshots/homepage-authority-concept-f-2026-09-11/`

---

## Performance observations

- No new client Google Maps SDK  
- Google fetch is server-side only on homepage RSC  
- Reused existing office/team imagery  
- No large JS libraries added  
- Reveal-on-scroll preserved; reduced-motion path intact  

---

## Unresolved owner inputs

1. **Ninth award** — identify & provide badge art if needed  
2. **`GOOGLE_PLACES_API_KEY`** — add to Vercel Preview to enable live rating/count  
3. **Visual approval** of Concept F “Premium Actual” on Preview before any merge/promote  
4. Optional: prefer alternate commercial headline (“Built for business. Backed by expertise.”) if current feels too strong  
5. Optional: team section photography curation beyond the four featured faces  

---

## Known issues

1. Awards rail shows **8** badges while authority strip cites owner-approved **9** — flagged, not fabricated  
2. Google rating **not live** until env key is set  
3. Legacy `verify-motion-runtime.mjs` awards selector does not match current awards DOM (false “not found”; rail still present and covered by carrier-marquee / interactive QA)  
4. Unrelated dirty files existed in worktree from prior batches — **left unstaged**  

---

## Preview

If Vercel Preview creation is authenticated after push, Preview URL will be recorded below / in PR tooling.

**Do not promote to Production. Do not merge to main without explicit owner approval.**

```
MERGED TO MAIN: NO
VERCEL PRODUCTION DEPLOYED: NO
PREMIUMIB.COM CHANGED: NO
```
