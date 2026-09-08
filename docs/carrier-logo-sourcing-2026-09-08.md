# Carrier Logo Sourcing + Site Wiring Report

**Branch:** `cursor/carrier-logos-7402`  
**Date:** 2026-09-08  
**Status:** STOP FOR OWNER REVIEW — do not merge, do not deploy, do not promote Vercel

---

## 1. Step 1 — Audit Findings (Before Changes)

### A. Homepage Carrier Marquee (`PilotCarrierMarquee`)

| Item | Finding |
|---|---|
| **Component** | `src/components/pilot/PilotCarrierMarquee.tsx` |
| **Motion** | `PilotInfiniteRail` with `PILOT_RAIL_DURATIONS.carrier` (normal + reduced-motion) |
| **Prior curation** | 12 carriers from `homepageCarriers` in `src/data/partners.ts` |
| **Prior carriers** | CAA, Intact, SGI, Wawanesa, Northbridge, Aviva, Travelers, Chubb, Gore, Echelon, Unica, PemBridge |
| **Asset locations** | Mixed: `/images/carriers/carrier-*.jpg/png` (marquee) + `/images/partners/partner-*` (some entries) |
| **Behavior preserved** | Autoplay infinite rail, edge fades via `.pilot-carrier-rail`, gap/spacing, reduced-motion — unchanged |

Legacy `CarrierStrip.tsx` also exists (older non-pilot homepage variant) — not modified; pilot homepage uses `PilotCarrierMarquee`.

### B. Partners Page (`/partners/`)

| Item | Finding |
|---|---|
| **Prior state** | 44 partners in `allPartners`, grouped as "Core Markets" (12 marquee) + "Our Markets" (32 additional) |
| **Asset dir** | `public/images/partners/partner-*.{jpg,png,jpeg}` (44 files) |
| **Gap** | Owner spreadsheet lists ~80 unique entities; ~36 carriers/MGAs from spreadsheet were not represented |
| **Removed from directory** | AM Fredericks (duplicate of SWG), The Guarantee (not in owner list — dropped from public inventory) |

### C. Claims Page Carrier Directory

| Item | Finding |
|---|---|
| **Component** | `src/components/claims/CarrierClaimsDirectory.tsx` |
| **Data** | `src/data/carrierClaims.ts` |
| **Verified insurers (17)** | Intact, Aviva, Wawanesa, CAA, Gore, Northbridge, SGI Canada, Echelon, PemBridge, Chubb, Travelers, Definity, Unica, PAFCO, JEVCO, Optimum, AIG |
| **Verified MGAs (8)** | CHES Special Risk, Totten/Cansure, Burns & Wilcox, Trinity, SRIM, Beazley, ABEX, Lions Gate |
| **Prior behavior** | Auto-generated unverified entries from `allPartners` — populated dropdown with carriers lacking verified numbers |
| **Prior research location** | Verified contacts live in `src/data/carrierClaims.ts` (confirmed specification comments). No separate external claims research doc found in repo beyond this file and `src/data/claimsContent.ts`. |

---

## 2. Homepage Marquee Recommendation

| Option | Description | Recommendation |
|---|---|---|
| **A** | Retain current 12-carrier curation | Safe default |
| **B** | Expand to 13 core markets — add **Definity** (Economical) | **✅ RECOMMENDED** |
| **C** | Full ~80-carrier marquee | ❌ Not recommended — trust surface becomes unreadable |

**Implemented: Option B** — adds Definity as a major Ontario personal/commercial carrier already in verified claims research. All other marquee motion, sizing, and rail behavior preserved.

---

## 3. Entity Variant Resolution

| Variant(s) in spreadsheet | Canonical public entity | Decision |
|---|---|---|
| Intact / Intact Public Entities / Intact Specialty Solutions | Three separate Partners entries | **Shared Intact logo**; IPE & ISS classified as `specialty-underwriting` divisions |
| South Western General / SWG Specialty / AM Fredericks | **South Western Insurance Group (SWG)** | One entry, `swg.png`; AM Fredericks removed as duplicate |
| Economical / Definity | **Definity** | One logo; aliases include "Economical" |
| Gore / Gore Mutual / Gore Insurance Company | **Gore Mutual** | One logo |
| Nordic / Facility Association | **Facility Association** | One logo (residual market) |
| Coachman / SGI | Separate Partners entries | Coachman noted as SGI Ontario high-risk division; claims collapsed to SGI number |
| Totten / Cansure / SPGC | **Totten Group** + **Cansure** as related MGAs | Separate entries; claims combined in verified Totten/Cansure entry |
| Victor / Encon | **Victor Insurance Canada** | Alias "Encon" |
| Forward / Jet | **Forward Insurance Managers** | Alias "Jet" |

---

## 4. Claims Number Conflicts

**No conflicts found** between owner spreadsheet data and prior verified research in `carrierClaims.ts`. Spreadsheet underwriter names, extensions, and broker codes were **not** imported (privacy boundary enforced).

| Note | Detail |
|---|---|
| Travelers | Prominent warning retained — existing policies only; new business transfers to Definity |
| Gore | Note retained — legal name transition / Beneva branding |
| Coachman | Not in claims dropdown — covered under SGI Canada alias |
| Facility Association | Not in claims dropdown — residual market; broker routing typical |
| Unverified partners | **Removed** from claims dropdown (prior auto-generated unverified rows eliminated) |

---

## 5. Carrier-by-Carrier Sourcing Log

Assets stored at `public/images/carriers/{slug}.{ext}` unless noted.

| Carrier | Status | File | Size | Classification / Notes |
|---|---|---|---|---|
| ABEX | sourced | /images/carriers/abex.png | 27607b | mga-wholesale |
| Agile Underwriting | **not sourced** | — | — | Logo not sourced. |
| AIG | sourced | /images/carriers/aig.jpg | 13519b | insurance-carrier |
| Apollo Exchange | sourced | /images/carriers/apollo.png | 6073b | mga-wholesale |
| April Canada | sourced | /images/carriers/april.jpg | 5490b | mga-wholesale |
| Aurora Underwriting | **not sourced** | — | — | Logo not sourced. |
| Aviva | sourced | /images/carriers/aviva.jpg | 18675b | insurance-carrier |
| AXA XL | sourced | /images/carriers/axa-xl.svg | 4603b | insurance-carrier — Wikimedia Commons |
| Beazley Canada | sourced | /images/carriers/beazley.jpg | 36079b | mga-wholesale |
| Berkley Canada | **not sourced** | — | — | Official CDN 404/blocked |
| Berkshire Hathaway Specialty Insurance | **not sourced** | — | — | Official CDN 404/blocked |
| BOXX Insurance | **not sourced** | — | — | Official CDN 404/blocked |
| Burns & Wilcox Canada | sourced | /images/carriers/burns-wilcox.png | 30127b | mga-wholesale |
| CAA Insurance | sourced | /images/carriers/caa.png | 41387b | insurance-carrier |
| CannGenn Insurance Canada | **not sourced** | — | — | Official CDN 404/blocked |
| Cansure | sourced | /images/carriers/cansure.png | 13966b | mga-wholesale |
| CFC Underwriting | **not sourced** | — | — | Official CDN 404/blocked |
| CHES Special Risk | sourced | /images/carriers/ches-special-risk.jpg | 6422b | mga-wholesale |
| Chieftain Insurance | **not sourced** | — | — | Site timeout / no confident official asset |
| Chubb | sourced | /images/carriers/chubb.jpg | 5096b | insurance-carrier |
| Chutter Underwriting | **not sourced** | — | — | Official CDN 404/blocked |
| CNA | **not sourced** | — | — | Wikimedia/official CDN blocked in environment |
| Coachman Insurance | sourced | /images/carriers/coachman.png | 24357b | insurance-carrier |
| Coalition | **not sourced** | — | — | Wikimedia/official CDN blocked |
| Coast Underwriting | sourced | /images/carriers/coast-underwriting.png | 17884b | specialty-underwriting |
| Definity | sourced | /images/carriers/definity.png | 5906b | insurance-carrier |
| Dufferin Mutual Insurance | **not sourced** | — | — | Official site 404 |
| Eagle Underwriting | **not sourced** | — | — | Official CDN 404/blocked |
| Ecclesiastical Insurance | sourced | /images/carriers/ecclesiastical.png | 15114b | insurance-carrier |
| Echelon Insurance | sourced | /images/carriers/echelon.jpg | 23204b | insurance-carrier |
| Facility Association | sourced | /images/carriers/facility-association.jpg | 36343b | specialty-underwriting |
| Forward Insurance Managers | sourced | /images/carriers/forward.png | 8487b | mga-wholesale |
| Gameday Insurance | **not sourced** | — | — | Download returned HTML error page |
| GASS | **not sourced** | — | — | Official CDN 429/blocked |
| Gore Mutual | sourced | /images/carriers/gore.jpg | 8217b | insurance-carrier |
| GroupOne Insurance | sourced | /images/carriers/group-one.jpg | 7317b | mga-wholesale |
| Hagerty | sourced | /images/carriers/hagerty.svg | 119169b | insurance-carrier — Wikimedia Commons |
| HDI Global | **not sourced** | — | — | Official CDN 404 |
| High Risk MGA | **not sourced** | — | — | Owner review — confirm public identity |
| HSB Canada | **not sourced** | — | — | Download returned HTML error page |
| Intact Insurance | sourced | /images/carriers/intact.jpg | 22498b | insurance-carrier |
| Intact Public Entities | sourced (shared) | /images/carriers/intact.jpg | 22498b | specialty-underwriting |
| Intact Specialty Solutions | sourced (shared) | /images/carriers/intact.jpg | 22498b | specialty-underwriting |
| JEVCO | sourced | /images/carriers/jevco.png | 62374b | insurance-carrier |
| K&K Insurance Canada | **not sourced** | — | — | CDN returned JS/HTML, not image |
| Liberty Mutual | sourced | /images/carriers/liberty-mutual.svg | 8439b | insurance-carrier — Wikimedia Commons |
| Lions Gate Underwriting | sourced | /images/carriers/lions-gate.jpg | 2960b | mga-wholesale |
| Markel | **not sourced** | — | — | Wikimedia blocked |
| Milnco Insurance | sourced | /images/carriers/milnco.jpeg | 16199b | mga-wholesale |
| Northbridge Insurance | sourced | /images/carriers/northbridge.jpg | 7499b | insurance-carrier |
| NovaRisk | **not sourced** | — | — | Official CDN 404/blocked |
| Nuclear Insurance Association of Canada | **not sourced** | — | — | Download returned HTML error page |
| ODIS Underwriting | **not sourced** | — | — | Official CDN 404/blocked |
| Optimum Insurance | sourced | /images/carriers/optimum.png | 7373b | insurance-carrier |
| PAFCO | sourced | /images/carriers/pafco.png | 123541b | insurance-carrier |
| PAL Insurance | sourced | /images/carriers/pal.jpg | 47856b | mga-wholesale |
| Pembridge Insurance | sourced | /images/carriers/pembridge.jpg | 6410b | insurance-carrier |
| Premier Marine | sourced | /images/carriers/premier.jpg | 3728b | specialty-underwriting |
| Raise Underwriting | **not sourced** | — | — | Domain did not resolve |
| REVAU | **not sourced** | — | — | Official CDN 404/blocked |
| Ridge Canada Cyber Solutions | **not sourced** | — | — | Official CDN 404/blocked |
| SGI Canada | sourced | /images/carriers/sgi.jpg | 16151b | insurance-carrier |
| Signature Risk | **not sourced** | — | — | Official CDN 404 |
| South Western Insurance Group | sourced | /images/carriers/swg.png | 149251b | mga-wholesale |
| Sovereign Insurance | sourced | /images/carriers/sovereign.png | 177864b | insurance-carrier |
| Special Risk Insurance Managers | sourced | /images/carriers/special-risk-srim.png | 23064b | mga-wholesale |
| Sport and Fitness Insurance Canada | **not sourced** | — | — | sfic.ca 404 |
| STARR Insurance | **not sourced** | — | — | Official CDN 404 |
| Strategic Underwriting Managers | sourced | /images/carriers/sum.png | 215459b | mga-wholesale |
| Tokio Marine | **not sourced** | — | — | Wikimedia blocked |
| Totten Group | sourced | /images/carriers/totten.jpg | 4956b | mga-wholesale |
| Travelers | sourced | /images/carriers/travelers.jpg | 30768b | insurance-carrier |
| Trinity Underwriting | sourced | /images/carriers/trinity.png | 134997b | mga-wholesale |
| Trisura | **not sourced** | — | — | Wikimedia/official CDN blocked |
| Unica Insurance | sourced | /images/carriers/unica.png | 13933b | insurance-carrier |
| Unique Risk Management | sourced | /images/carriers/unique-risk.png | 299280b | mga-wholesale |
| Victor Insurance Canada | sourced | /images/carriers/victor.png | 16551b | mga-wholesale |
| Wawanesa Insurance | sourced | /images/carriers/wawanesa.jpg | 14038b | insurance-carrier |
| Wynward Insurance | **not sourced** | — | — | Official CDN 404 |
| Zurich Insurance | sourced | /images/carriers/zurich.svg | 8202b | insurance-carrier — Wikimedia Commons |

**Summary:** 80 canonical entities · **48 logos sourced** · **32 not sourced** (text fallback cards on Partners page)

---

## 6. Questionable Classifications — Owner Review

| Entity | Classification | Question |
|---|---|---|
| High Risk MGA | mga-wholesale | Confirm public-facing name/branding |
| Facility Association | specialty-underwriting | Residual market — confirm customer-facing description |
| AIG | insurance-carrier | In claims research but not in owner spreadsheet — retain? |
| Trinity Underwriting | mga-wholesale | Retained from prior site; not in owner spreadsheet |
| Intact Public Entities / ISS | specialty-underwriting | Listed separately for transparency; same logo as Intact |
| Premier Marine | specialty-underwriting | Named "Premier Marine" — confirm vs generic "Premier" from prior site |

---

## 7. Final Wiring Summary

### A. Homepage Marquee — Option B (13 carriers)

Unchanged: `PilotInfiniteRail`, durations, spacing, reduced-motion, edge treatment.  
Updated: data driven from `HOMEPAGE_MARQUEE_SLUGS` in `src/data/carrierInventory.ts`.  
Added: **Definity**. All logos now use canonical `/images/carriers/` paths.

### B. Partners Page — Full Directory

Three categories:
1. **Personal Insurance Markets** (23 entities)
2. **Commercial Insurance Markets** (combined carrier/commercial entries)
3. **Specialty & MGA Markets** (wholesale/program markets)

Carriers without sourced logos render as **premium text cards** (name only — no broken images).  
Shared logos reused across categories (no duplicate assets).

### C. Claims Page — Verified Only

- **25 verified entries** (17 insurers + 8 MGAs) — unchanged contact data
- **Removed** auto-generated unverified partner rows
- Copy updated implicitly: dropdown now lists only verified carriers
- No spreadsheet phone extensions or individual contacts published

---

## 8. Files Changed

| File | Change |
|---|---|
| `src/data/carrierInventory.ts` | **NEW** — canonical 80-entity inventory + classifications |
| `src/data/partners.ts` | Refactored to use inventory; 3-group Partners page |
| `src/data/carrierClaims.ts` | Verified-only claims directory; logo lookup via inventory |
| `src/components/PartnerLogoCard.tsx` | Text fallback for unsourced logos; SVG `unoptimized` |
| `src/components/claims/CarrierClaimsDirectory.tsx` | SVG `unoptimized` for claims logos |
| `public/images/carriers/*` | Migrated + newly sourced logos (canonical slugs) |
| `scripts/migrate-and-source-carrier-logos.cjs` | Logo migration/sourcing script |
| `scripts/capture-carrier-logos-screenshots.cjs` | QA screenshot script |

**Not touched:** Coverage Explorer, D2/D3 content batches, unrelated routes.

---

## 9. Screenshots

`docs/qa-screenshots/carrier-logos-2026-09-08/`

| File | Surface |
|---|---|
| `homepage-marquee-desktop_1440.png` | Homepage marquee — desktop |
| `homepage-marquee-mobile_390.png` | Homepage marquee — mobile |
| `partners-desktop_1440.png` | Partners page — desktop (full page) |
| `partners-mobile_390.png` | Partners page — mobile (full page) |
| `claims-desktop_1440.png` | Claims page — desktop (full page) |
| `claims-mobile_390.png` | Claims page — mobile (full page) |

---

## 10. Regression

| Check | Result |
|---|---|
| `npm run build` | ✅ Pass |
| Console errors (homepage, partners, claims) | ✅ 0 errors |
| Marquee motion/behavior | ✅ Preserved |
| Other routes | ✅ Not modified |

---

## STOP FOR OWNER REVIEW

**Do not merge · Do not deploy · Do not promote Vercel**

### Owner decisions requested:
1. Confirm **Option B** marquee (13 carriers incl. Definity) vs revert to 12
2. Provide official logo files for **32 unsourced** carriers (or approve text-only cards)
3. Confirm questionable classifications in §6
4. Confirm removal of **The Guarantee** and **AM Fredericks** from public directory
5. Confirm **AIG** and **Trinity** retention (prior site / claims research, not in spreadsheet)
