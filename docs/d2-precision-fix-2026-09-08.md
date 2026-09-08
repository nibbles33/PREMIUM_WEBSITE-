# D2 Precision Fix — 2026-09-08

**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Scope:** Five targeted factual/copy corrections only. No Pharmacy. No Explorer architecture changes.

---

## 1. Restaurant — remove unverified AGCO application claim

**File:** `src/data/commercial-industries.ts`  
**Primary source:** AGCO Liquor Sales Licence guidance; *Liquor Licence and Control Act* (no statutory liquor-liability insurance mandate). Unverified claim removed — no primary AGCO application-document source found for ordinary LSL applications.

### Field: `considerations[3].description` (title: "Liquor licensing, civil liability, and insurance are three different things")

**Before:**
> AGCO issues Liquor Sales Licences for eligible premises. Under the Liquor Licence and Control Act, licensees can face civil liability for harm tied to alcohol service — AGCO's own licensing guidance states there is more to lose than your licence and recommends consulting an insurance professional. That civil exposure exists independently of whether you carry insurance. The Act itself does not mandate liquor liability insurance as a statutory condition of licensing. **However, proof of insurance may still be requested during the licensing or application process, by a landlord, or under other contractual terms — that is a documentation or contractual practice, not the same thing as a provincial insurance mandate.** Liquor liability insurance, where purchased, is a commercial product that may help respond to certain alcohol-related claims standard general liability excludes or limits — confirm inclusion with your broker.

**After:**
> AGCO issues Liquor Sales Licences for eligible premises. Under the Liquor Licence and Control Act, licensees can face civil liability for harm tied to alcohol service — AGCO's own licensing guidance states there is more to lose than your licence and recommends consulting an insurance professional. That civil exposure exists independently of whether you carry insurance. The Act itself does not mandate liquor liability insurance as a statutory condition of licensing. **Separately, a landlord, lender, franchise, or other counterparty may require proof of liquor liability insurance under a lease or other contract — that is a contractual documentation requirement, not the same thing as a provincial insurance mandate.** Liquor liability insurance, where purchased, is a commercial product that may help respond to certain alcohol-related claims standard general liability excludes or limits — confirm inclusion with your broker.

### Field: `faqItems[0].answer` (question: "Do I need liquor liability if I serve alcohol?")

**Before:**
> … AGCO's licensing guidance confirms licensees may face civil liability for harm caused by someone served liquor at the business — separate from administrative penalties such as suspension or revocation — and recommends consulting an insurance professional. **Proof of insurance may still be requested during the licensing or application process, by your landlord, or under a lease, franchise, or lender agreement. Those are contractual or documentation requirements;** they do not change the fact that the Act itself does not prescribe a named insurance product. …

**After:**
> … AGCO's licensing guidance confirms licensees may face civil liability for harm caused by someone served liquor at the business — separate from administrative penalties such as suspension or revocation — and recommends consulting an insurance professional. **Separately, a landlord, lender, franchise, or other counterparty may require proof under a lease, franchise, or lender agreement — those are contractual documentation requirements;** they do not change the fact that the Act itself does not prescribe a named insurance product. …

---

## 2. Non-Profit — correct WSIB / volunteer framing

**File:** `src/data/product-pages/commercial-products-specialty.ts`  
**Primary sources:**
- WSIB OPM — *Individuals on Unpaid Training Placements* (community/charitable volunteers generally not learners/workers for WSIB purposes)
- WSIB OPM — *Volunteer Forces* (special statutory deemed-worker categories: municipal fire/ambulance brigades, auxiliary police)
- WSIB OPM — *Who Can Obtain Optional Insurance?* (optional insurance for IOs/SPs/partners/EOs — not general volunteer enrollment)

### Field: `coverageTypes[3].detailDescription` (Volunteer Accident)

**Before:**
> Volunteers are not employees, and WSIB coverage rules depend on whether a volunteer is deemed a worker in the circumstances — a regulatory question separate from optional volunteer accident insurance. Volunteer accident coverage, where available, may address limited medical expenses for volunteers injured during approved activities — subject to policy terms. It does not replace general liability for third-party claims or abuse coverage where programs serve vulnerable persons.

**After:**
> Community and charitable volunteers who serve without pay are generally not covered under WSIB the way paid workers are — WSIB treats most unpaid volunteer service separately from mandatory employer coverage. Paid employees and certain special statutory categories — such as municipal volunteer fire or ambulance brigades — may fall under different WSIB rules. Optional volunteer accident insurance, where purchased, may address limited medical expenses for volunteers injured during approved activities — subject to policy terms. It does not replace WSIB where that coverage applies to paid workers, and it does not replace general liability for third-party claims or abuse coverage where programs serve vulnerable persons.

### Field: `considerations[1].description` (title: "Volunteers vs. employees")

**Before:**
> Volunteers, part-time staff, and paid employees create different injury and liability profiles. WSIB obligations depend on whether a person is deemed a worker — a regulatory question, not an automatic insurance product. Volunteer accident coverage, where purchased, is optional and limited — disclose how your organization uses volunteers during underwriting.

**After:**
> Paid employees, part-time staff, and unpaid volunteers create different injury and liability profiles. Most community volunteers are not automatically WSIB-covered; paid workers may require WSIB registration depending on your organization's industry and activities. Certain special statutory volunteer forces — such as municipal fire or ambulance brigades — follow different rules. Optional volunteer accident insurance, where purchased, is limited and separate from WSIB — disclose how your organization uses volunteers and paid staff during underwriting.

### Field: `faqItems[1].answer` (question: "Are volunteers covered if injured while serving?")

**Before:**
> Volunteer accident coverage, where purchased, may provide limited medical benefits for volunteers injured during approved activities — subject to policy terms. Volunteers are not employees, and WSIB coverage depends on whether a volunteer is deemed a worker in the circumstances. General liability may address certain third-party claims, but volunteer medical expenses are a separate coverage question — review with your broker.

**After:**
> Volunteer accident coverage, where purchased, may provide limited medical benefits for volunteers injured during approved activities — subject to policy terms. Community and charitable volunteers who serve without pay are generally not covered under WSIB the way paid workers are. Paid employees may require WSIB registration depending on your organization's industry and activities. General liability may address certain third-party claims, but volunteer medical expenses are a separate coverage question — review with your broker.

---

## 3. Property Management — CMRAO / CMSA precision

**File:** `src/data/product-pages/commercial-products-industry.ts`  
**Primary sources:**
- *Condominium Management Services Act*, 2015 (Ontario)
- O. Reg. 4/18, s. 4(1)–(2) (errors & omissions and fidelity insurance for licensed providers)
- CMRAO — Insurance Requirements (https://www.cmrao.ca/condo-managers/licences/insurance-requirements)

### Field: `considerations[2].description` (title: "Condominium management and CMRAO licensing")

**Before:**
> Condominium management providers in Ontario may be subject to licensing under the Condominium Management Services Act and oversight by the Condominium Management Regulatory Authority of Ontario — but not every property manager is a condominium manager. Residential rental and commercial portfolio managers face different regulatory contexts. Licensing is a regulatory requirement separate from purchasing insurance.

**After:**
> Condominium management in Ontario is regulated under the Condominium Management Services Act, administered by the Condominium Management Regulatory Authority of Ontario (CMRAO). Persons and providers that perform regulated condominium management services must hold the applicable licence under the Act and its regulations — but managing residential rentals or commercial property portfolios is a different regulatory context from licensed condominium management. Licensed condominium management providers must maintain errors and omissions insurance covering every condominium manager they employ, and fidelity insurance against client losses from dishonesty by managers, employees, directors, or officers — statutory requirements under O. Reg. 4/18 that apply to licensed providers, not to every general property management firm.

### Field: `faqItems[4].answer` (question: "What do management contracts typically require?")

**Before:**
> Management agreements often specify minimum general liability and E&O limits, additional-insured status for the owner or corporation, and certificate deadlines — contractual requirements reviewed against what your policies can provide. Condominium management contracts may include additional requirements depending on the arrangement. Bring agreements to your broker before signing new mandates.

**After:**
> Management agreements often specify minimum general liability and E&O limits, additional-insured status for the owner or corporation, and certificate deadlines — contractual requirements reviewed against what your policies can provide. Licensed condominium management providers also face statutory errors and omissions and fidelity insurance requirements under Ontario regulation — separate from what every residential or commercial portfolio manager must carry. Bring agreements to your broker before signing new mandates.

---

## 4. Hotel / Motel — Innkeepers Act precision

**File:** `src/data/product-pages/commercial-products-specialty.ts`  
**Primary source:** *Innkeepers Act*, R.S.O. 1990, c. I.7 — ss. 4(1)(a)–(b) (wilful act/default/neglect; goods deposited for safekeeping); s. 6 (conspicuous posting of s. 4). Dollar limit (s. 4(1)) intentionally omitted — not customer-useful on an insurance page.

### Field: `subhead`

**Before:**
> … Ontario's Innkeepers Act limits statutory liability for guest belongings in specific circumstances, which is separate from what your property policy covers for your own assets. …

**After:**
> … Ontario's Innkeepers Act can limit an innkeeper's statutory liability for guest goods in specified circumstances — separate from what your commercial property policy covers for your own assets. …

### Field: `coverageTypes[0].detailDescription` (Commercial Property)

**Before:**
> … Guest personal belongings are typically excluded from the operator's property policy; the Innkeepers Act addresses statutory limits on operator liability for guest goods in specific circumstances — separate from insuring your own property.

**After:**
> … Guest personal belongings are typically excluded from the operator's property policy; under the Innkeepers Act, statutory liability for guest goods may be limited in specified circumstances, with exceptions for loss through the innkeeper's wilful act, default, or neglect and for goods expressly deposited for safekeeping — separate from insuring your own property.

### Field: `considerations[0].description` (title: "Guest belongings vs. your property")

**Before:**
> Guest personal property is typically excluded from the hotel operator's property policy — guests generally rely on their own travel or homeowners insurance for belongings. Ontario's Innkeepers Act limits statutory liability for guest goods in specific circumstances when required notices are posted and safe-deposit procedures are followed — a regulatory framework separate from purchasing coverage for your building, furnishings, and business equipment.

**After:**
> Guest personal property is typically excluded from the hotel operator's property policy — guests generally rely on their own travel or homeowners insurance for belongings. Under Ontario's Innkeepers Act, an innkeeper's liability for guest goods may be limited in specified circumstances, but statutory exceptions apply — including loss through the innkeeper's wilful act, default, or neglect and for goods expressly deposited for safekeeping. Conspicuous posting of section 4 in the office, public rooms, and guest bedrooms is relevant to obtaining the Act's benefit. That legal liability framework is separate from purchasing coverage for your building, furnishings, and business equipment.

### Field: `faqItems[0].answer` (question: "Are guest belongings covered under my hotel policy?")

**Before:**
> Guest personal property is typically excluded from the operator's property policy. Guests generally rely on their own travel or homeowners insurance for belongings. Ontario's Innkeepers Act limits statutory liability for guest goods in specific circumstances when required notices are posted — a regulatory framework separate from insuring your own building, furnishings, and equipment.

**After:**
> Guest personal property is typically excluded from the operator's property policy. Guests generally rely on their own travel or homeowners insurance for belongings. Under Ontario's Innkeepers Act, an innkeeper's liability for guest goods may be limited in specified circumstances, with exceptions for loss through the innkeeper's wilful act, default, or neglect and for goods expressly deposited for safekeeping. Conspicuous posting of section 4 is relevant to obtaining the Act's benefit — a legal liability framework separate from insuring your own building, furnishings, and equipment.

---

## 5. Event Liability — CTA promise

**File:** `src/data/product-pages/commercial-products-specialty.ts`

### Field: `ctaSubhead`

**Before:**
> Share event date, location, attendance, and activities — we will arrange liability coverage venues accept.

**After:**
> Share event date, location, attendance, and activities — we will help structure liability coverage around your event and venue certificate requirements.

---

## Audit delta

| Metric | Before fix | After fix |
|--------|------------|-----------|
| **A / B / C / D** | 12 / 16 / 18 / 12 | **12 / 16 / 18 / 12** (unchanged) |
| **New HIGH flags** | — | **0** on changed routes |
| **New MEDIUM flags** | — | **0** on changed routes |

### Changed-route word counts (substantive)

| Route | Before | After | Δ |
|-------|-------:|------:|--:|
| `/restaurant-insurance/` | 1614 | 1614 | 0 |
| `/non-profit-insurance/` | ~1070* | 1088 | +18 |
| `/property-management-insurance/` | ~1150* | 1174 | +24 |
| `/hotel-motel-insurance/` | ~1230* | 1252 | +22 |
| `/event-liability-insurance/` | 1094 | 1094 | 0 |

\*Pre-fix approximate from prior audit pass; post-fix from regenerated `audit-data.json`.

### Frozen-route word counts (unchanged — regression check)

| Route | Words | Status |
|-------|------:|--------|
| `/liquor-liability-insurance/` | 2005 | ✅ unchanged |
| `/food-truck-insurance/` | 1624 | ✅ unchanged |
| `/convenience-store-insurance/` | 1141 | ✅ unchanged |
| `/salon-barber-insurance/` | 1072 | ✅ unchanged |
| `/warehousing-insurance/` | 1034 | ✅ unchanged |
| `/daycare-private-school-insurance/` | 1141 | ✅ unchanged |
| `/greenhouse-agribusiness-insurance/` | 956 | ✅ unchanged |

---

## Regression results

| Check | Result |
|-------|--------|
| `npm run build` | ✅ Pass |
| `npx tsc --noEmit` | ✅ Pass |
| `npx tsx scripts/product-content-audit.ts` | ✅ Pass — A 12 / B 16 / C 18 / D 12 |
| Explorer manifest state IDs | ✅ Unchanged — all affected routes retain prior state counts/IDs (source inspection of `interaction-manifest/routes.ts`) |
| Removed forbidden strings | ✅ Grep confirms removed phrases absent from `src/` |
| Puppeteer Explorer V2 verification | ⚠️ `verify-coverage-explorer-ux-v2.cjs` / `verify-d2-batch-2.cjs` hung in VM environment (`networkidle0` timeout); not re-run to completion. Source-level manifest and build checks substituted. |

---

## Unresolved concerns

1. **Restaurant AGCO application documents** — No replacement claim added. If owner later verifies a specific AGCO application/transfer document requirement, that should be cited with primary source before any reintroduction.
2. **Non-profit WSIB edge cases** — Copy now distinguishes ordinary volunteers, paid workers, and special statutory volunteer forces. Organizations with paid honoraria/stipends for “volunteers” may still need individual WSIB classification review — not expanded on page per scope.
3. **Licensed condominium management E&O/fidelity** — Described as statutory for licensed providers only; dollar minimums not stated (O. Reg. 4/18 does not prescribe amounts in the regulation text reviewed).
4. **Innkeepers Act $40 cap** — Omitted intentionally; statutory framework described without obsolete-looking dollar figure.
5. **Puppeteer QA** — Browser verification scripts should be re-run locally after fresh `next start` if owner wants screenshot-level confirmation.

---

**STOP FOR OWNER REVIEW — NO MERGE · NO DEPLOY · NO VERCEL PROMOTION**
