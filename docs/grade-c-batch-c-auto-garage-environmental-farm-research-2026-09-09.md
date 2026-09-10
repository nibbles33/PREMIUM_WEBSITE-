# Grade C Batch C — Auto / Garage / Environmental / Farm — Phase 1 Research

**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Frozen HEAD:** `d280ee5`  
**Research date:** 2026-09-09  
**Phase:** RESEARCH ONLY — no page copy implementation  
**Isolated worktree:** `/tmp/PREMIUM_WEBSITE-d3-transportation`  
**Site audit at research start:** A32 / B16 / C10 / D0

**Routes:**
- `/commercial-auto-insurance/`
- `/garage-dealership-insurance/`
- `/pollution-liability-insurance/`
- `/farm-insurance/`

**Status:** **STOP FOR OWNER REVIEW** — do not implement copy until approved

---

## Category legend

| Tag | Meaning |
|-----|---------|
| **[STATUTORY]** | Ontario statute or regulation |
| **[REGULATORY]** | FSRA, MTO, MECP, OMVIC, or other regulator |
| **[FACILITY ASSOCIATION]** | Facility Association residual-market manual / bulletins only |
| **[COMMON POLICY STRUCTURE]** | Standard Ontario policy forms (OAP 1, OAP 4, CGL, farm package) |
| **[INSURER-SPECIFIC]** | Varies by insurer/MGA wording |
| **[UNDERWRITING]** | Rating/underwriting input — not a coverage guarantee |
| **[EXPOSURE]** | Operational risk — may map to purchasable coverage |

---

## A. Worktree safety

| Check | Result |
|-------|--------|
| **WORKTREE** | `/tmp/PREMIUM_WEBSITE-d3-transportation` |
| **BRANCH** | `cursor/coverage-explorer-ux-v2-2026-09-07` |
| **HEAD** | `d280ee581c444574c70aba1a8918cf45038dea4c` (contains `d280ee5`) |
| **STATUS** | Pre-existing dirty QA screenshots + modified `docs/product-content-audit-2026-09-07.md` (not touched). **No `src/` modifications.** |
| **Primary carrier worktree** | Untouched |

**Safety confirmation (pre-commit):** Only this research doc will be added. No production source, Explorer, image, scanner, Batch A, or Batch B changes.

---

## B. Current-state audit

Audit basis: `docs/qa-screenshots/product-content-audit-2026-09-07/audit-data.json` + source extraction @ HEAD `d280ee5`.

### Summary

| Route | Grade | Words | HIGH | MED | LOW | Explorer states | Considerations | FAQs | V2 pairs |
|-------|-------|------:|-----:|----:|----:|------------------:|---------------:|-----:|----------|
| `/commercial-auto-insurance/` | **C** | 323 | 0 | 0 | 0 | 4 | **0** | 4 | **None** |
| `/garage-dealership-insurance/` | **C** | 283 | 0 | 0 | 0 | 4 | **0** | 4 | **None** |
| `/pollution-liability-insurance/` | **C** | 252 | 0 | 0 | 0 | 4 | **0** | 4 | **None** |
| `/farm-insurance/` | **C** | 332 | 0 | 0 | 0 | 4 | **0** | 4 | **None** |

**Grade C drivers (all four):** Below ~400 substantive words; no Explorer V2 left/right detail pairs; no expandable considerations; thin hero/subhead on three routes.

**Benchmark (architecture/tone only):** `/trucking-insurance/` (A-grade, hedged Ontario auto + CVOR split), `/commercial-property-insurance/` post-Batch B (V2 pairs + considerations).

---

### B1. `/commercial-auto-insurance/`

**Source:** `src/data/commercial-industries.ts` (~151–216)  
**Explorer manifest:** `commercial-auto-insurance` · archetype **`fleet-vehicles`** (same archetype family as food-truck; visual overlap with trucking semi imagery risk)

| Item | Current |
|------|---------|
| **PRODUCT NAME** | Commercial Auto & Fleet Insurance |
| **META TITLE** | Commercial Auto & Fleet Insurance in Windsor-Essex \| Premium Insurance Brokers |
| **META DESCRIPTION** | Commercial auto and fleet insurance through an independent Windsor-Essex broker — liability, physical damage, hired & non-owned auto, and multi-vehicle coverage. |
| **HERO COPY** | Headline: *"Commercial Auto & Fleet Insurance"* · Subhead: *"Coverage for the vehicles that keep your business moving — from a single work truck to a full fleet."* (19 words — generic) |
| **coverageIntro** | *"Core coverages that protect business vehicles and the liability that comes with putting them on the road."* |
| **Considerations** | **0** |
| **V2 detail pairs** | **None** |

| Explorer ID | Current title | Card description (flag notes) |
|-------------|---------------|-------------------------------|
| `liability-coverage` | Liability Coverage | *"Helps protect your business if a company vehicle causes injury or damage to others."* — no Ontario statutory framing |
| `physical-damage-coverage` | Physical Damage Coverage | *"Helps repair or replace your business vehicles after collision or comprehensive losses."* — implies optional PD is standard package |
| `hired-non-owned-auto` | Hired & Non-Owned Auto | *"Can cover liability when employees drive rented, borrowed, or personal vehicles for work."* — **"Can cover"** OK; not automatic on every policy |
| `fleet-discounts-multi-vehicle-management` | Fleet Discounts & Multi-Vehicle Management | *"Structured coverage for multiple vehicles…"* — reads as product feature, not underwriting concept |

**Issues identified:**
- **Thin vs A-grade trucking** — no Ontario regulated-auto framing, no DCPD/uninsured/mandatory vs optional distinction, no July 2026 SABS hedge.
- **Explorer archetype `fleet-vehicles`** — zones (`highway-lane`, `lead-truck`, `yard-staging`) visually echo trucking; page job should be **light/medium commercial auto**, not motor carrier.
- **Overlap with `/trucking-insurance/`**, `/dump-truck-insurance/`, `/cargo-freight-insurance/` — current copy does not differentiate for-hire freight, CVOR, cargo, or specialty haulers.
- **No considerations** — missing vehicle use/class, radius, U.S. exposure, driver records, fleet size, values, HNOA, cargo distinction.
- **Categorical language** — "Core coverages that protect…" understates mandatory vs optional structure.
- **Hired/non-owned** presented as peer Explorer state — valid exposure but often endorsement/CGL extension; owner decision whether core vs supporting.
- **Numerical statements:** none (safe).
- **Regulatory:** none cited (gap for Ontario page).

**FAQ COUNT:** 4 (target ~5)

---

### B2. `/garage-dealership-insurance/`

**Source:** `src/data/product-pages/commercial-products-industry.ts` (~159–231)  
**Explorer manifest:** `garage-dealership-insurance` · archetype `garage-service`

| Item | Current |
|------|---------|
| **PRODUCT NAME** | Garage & Dealership Insurance |
| **META TITLE** | Garage & Dealership Insurance in Windsor-Essex \| Premium Insurance Brokers |
| **META DESCRIPTION** | Garage and auto dealership insurance — garagekeepers liability, lot coverage, test drives, and repair operations for Windsor-Essex dealers and shops. |
| **HERO COPY** | *"Coverage for dealers, repair shops, and service garages — from customer vehicles on your lot to test drives and completed repairs."* |
| **whoItIsFor** | New/used dealers, repair garages, body shops, detailers, tire centres holding customer vehicles |
| **Considerations** | **0** |
| **V2 detail pairs** | **None** |

| Explorer ID | Current title | Card description (flag notes) |
|-------------|---------------|-------------------------------|
| `garagekeepers-liability` | Garagekeepers Liability | *"Covers customer vehicles…"* — **unhedged "Covers"**; US term; Ontario form is OAP 4 Section 6 |
| `dealer-open-lot` | Dealer Open Lot | *"Protects inventory vehicles on your lot…"* — open-lot/theft wording varies by policy |
| `garage-liability` | Garage Liability | *"Addresses operations liability — faulty repairs, test drive accidents…"* — conflates OAP 4 auto liability with CGL/garage liability program |
| `physical-damage-on-inventory` | Physical Damage on Inventory | *"Comprehensive and collision coverage for owned and consigned units…"* — optional PD, not automatic |

**Issues identified:**
- **Ontario terminology imprecision** — "garagekeepers liability" is common broker shorthand but regulated Ontario product is **OAP 4 (Garage Automobile Policy)** with distinct sections (owned autos, customer autos, TPL, AB, DCPD).
- **CGL vs garage automobile vs property** not taught — cards blur three policy silos.
- **Dealer vs repair shop** differences (inventory, OMVIC, test drives, dealer plates) not segmented in hero/cards.
- **FAQ "Covers damage to customer vehicles"** — oversimplifies legal-liability vs direct-primary forms and primary insurer/subrogation flow.
- **Test drives** — FAQ says "typically included" without OAP 4 / endorsement hedge.
- **No property/tools/BI/pollution** in Explorer — may belong in considerations or cross-links, not necessarily fourth state replacement.
- **Numerical statements:** none.

**FAQ COUNT:** 4

---

### B3. `/pollution-liability-insurance/`

**Source:** `src/data/product-pages/commercial-products-industry.ts` (~768–841)  
**Explorer manifest:** `pollution-liability-insurance`

| Item | Current |
|------|---------|
| **PRODUCT NAME** | Pollution Liability Insurance |
| **META TITLE** | Pollution Liability Insurance in Windsor-Essex \| Premium Insurance Brokers |
| **META DESCRIPTION** | Pollution liability insurance for Windsor-Essex — gradual and sudden environmental releases for contractors, manufacturers, and property owners. |
| **HERO COPY** | *"Coverage for environmental releases — sudden spills and gradual pollution conditions that standard liability policies often exclude."* |
| **whoItIsFor** | Contractors, manufacturers, gas stations, warehouses with refrigerants, UST owners |
| **Considerations** | **0** |
| **V2 detail pairs** | **None** |

| Explorer ID | Current title | Card description (flag notes) |
|-------------|---------------|-------------------------------|
| `contractors-pollution-liability` | Contractors Pollution Liability | *"Covers pollution conditions caused during construction…"* — **unhedged**; CPL is claims-made specialty form |
| `site-pollution` | Site Pollution | *"Addresses gradual leaks from storage tanks…"* — site/premises EIL is distinct product |
| `transportation-pollution` | Transportation Pollution | *"Covers releases during transit…"* — not on every pollution program |
| `cleanup-defence-costs` | Cleanup & Defence Costs | *"Can help with regulatory-mandated remediation and legal defence…"* — **regulatory fines/penalties generally excluded**; not stated |

**Issues identified:**
- **Highest precision-risk route in Batch C** after auto reform register.
- **FAQ "Standard GL policies typically exclude pollution unless sudden and accidental within a short time window"** — oversimplified; modern CGL often has **absolute/total pollution exclusion**; sudden-and-accidental legacy wording varies; **do not say CGL never covers pollution** or that pollution covers all environmental loss.
- **"Dedicated pollution coverage fills that gap"** — too categorical; gaps depend on form, trigger, retro date, known conditions.
- **Asbestos example in card** — high exclusion/latency risk; needs careful hedge if retained.
- **Regulatory cleanup vs insurable fines** not distinguished.
- **Explorer states read broader than typical policy** — FLAG for owner review.
- **Numerical statements:** none.

**FAQ COUNT:** 4

---

### B4. `/farm-insurance/`

**Source:** `src/data/pilot-commercial-inline.ts` (~202–280) via `buildPilotProductConfig`  
**Explorer manifest:** `farm-insurance` · archetype `farm-compound`

| Item | Current |
|------|---------|
| **PRODUCT NAME** | Farm Insurance |
| **META TITLE** | Farm Insurance in Windsor-Essex \| Premium Insurance Brokers |
| **META DESCRIPTION** | Farm insurance through an independent Windsor-Essex broker — farm property, equipment & machinery, farm liability, and livestock coverage for Essex County farms. |
| **HERO COPY** | *"Coverage built for Essex County's working farms — from the farmhouse to the equipment in the field."* |
| **trustStatement** | Repeats four coverage buckets |
| **Considerations** | **0** |
| **V2 detail pairs** | **None** |

| Explorer ID | Current title | Card description (flag notes) |
|-------------|---------------|-------------------------------|
| `farm-property-coverage` | Farm Property Coverage | *"Protects farmhouses, barns…"* — **"Protects"** unhedged; dwelling may be packaged or separate |
| `equipment-machinery` | Equipment & Machinery | *"Covers tractors, implements…"* — **unhedged**; licensed road vehicles may need OAP 1 |
| `farm-liability` | Farm Liability | *"Protects you if someone is injured…"* — not identical to CGL terminology |
| `livestock-coverage` | Livestock Coverage | *"Coverage for livestock against specified perils, where applicable."* — best hedge in batch |

**Issues identified:**
- **Inline pilot config** — implementation must touch `pilot-commercial-inline.ts` (not `commercial-industries.ts`).
- **Overlap with `/greenhouse-agribusiness-insurance/`** (A-grade, 6 Explorer states, BI, equipment breakdown) — farm page must stay **broad working-farm**; greenhouse/hydroponic commercial ops cross-link out.
- **Government AgriInsurance / Production Insurance** must not be described as ordinary farm property insurance.
- **No road-vehicle vs farm machinery distinction** in cards.
- **Agritourism** only in FAQ — good seed; needs Explorer/considerations coordination.
- **Numerical statements:** none.

**FAQ COUNT:** 4

---

## C. Commercial Auto research (Ontario)

### C1. Page role vs adjacent routes

| Route | Role |
|-------|------|
| **`/commercial-auto-insurance/`** | **Broad Ontario business automobile** — company-owned/leased light and medium units, service fleets, sales/delivery vans, contractor pickups, municipal-style service vehicles **not** primarily for-hire freight. Mandatory OAP 1 (or equivalent) framework + optional PD, HNOA, OPCF endorsements. |
| **`/trucking-insurance/`** | **For-hire motor carriers** — tractor/trailer, CVOR, motor truck cargo, shipper contracts, U.S. lanes. |
| **`/dump-truck-insurance/`** | **Construction/aggregate dump operations** — load/debris, non-trucking liability, jobsite radius. |
| **`/cargo-freight-insurance/`** | **Motor truck cargo / carrier freight** — goods in transit, not the automobile policy itself. |
| **`/small-business-insurance/`** | Package hub — may **mention** commercial auto if vehicles used; not primary auto education page. |

**Differentiation imperative:** Commercial Auto page teaches **Ontario regulated automobile coverages for business-use vehicles** and fleet assembly; it must **cross-link** trucking/dump/cargo when use case exceeds broad commercial auto, not duplicate trucking Explorer/narrative.

---

### C2. Ontario legal / regulatory base [STATUTORY] [REGULATORY]

**Compulsory insurance — [STATUTORY]**

- **Compulsory Automobile Insurance Act (CAIA):** Every owner/ lessee must carry **automobile insurance** meeting Insurance Act requirements before operating on Ontario highways. Penalties for driving without insurance are substantial (CAIA s. 2–3).
- **Insurance Act s. 251(1):** Every motor vehicle **liability policy** must insure **at least $200,000** per accident for BI/death and property damage (exclusive of interest/costs). **[STATUTORY]**
- **Insurance Act s. 258:** Insurer **absolute liability** to third parties at least to **statutory minimum** even if policy conditions breached (third party can sue insurer directly). **[STATUTORY]**

**Standard policy components — [REGULATORY] [COMMON POLICY STRUCTURE]**

Ontario **OAP 1** (Owner's Policy) and commercial automobile policies aligned to OAP 1 structure typically include:

| Coverage | Mandatory? | Notes |
|----------|------------|-------|
| Third-party liability | **Yes** (min $200,000) | $1M–$2M commonly purchased **[UNDERWRITING]** |
| Accident benefits (SABS) | **Partially mandatory** post–Jul 1, 2026 | See §D reform register |
| Uninsured automobile | **Yes** | Includes unidentified motorist; UMC limits tied to jurisdiction minimum **[STATUTORY]** |
| DCPD | **Yes unless OPCF 49** | Opt-out available Jan 1, 2024+ **[REGULATORY]** |
| Collision / comprehensive / specified perils | **Optional** | Not compulsory **[COMMON POLICY STRUCTURE]** |

**Commercial vs private passenger — [REGULATORY] [UNDERWRITING]**

- Business use, vehicle weight/class, radius, and registration (personal vs commercial plate) affect **rating class and eligibility**, not the fundamental **statutory compulsory coverages** on Ontario automobile policies.
- **Do not assume** July 2026 SABS optionality mechanics identically affect every commercial fleet without confirming **OAP 1 / commercial policy** and **OEF 47R (garage)** filings — FSRA lists both **OAP 1** and **OAP 4** as impacted.
- **CVOR:** Required for **qualifying commercial motor vehicles** under MTO rules — **safety registration, not insurance**. Belongs on **trucking/dump/heavy commercial** pages primarily; mention on commercial auto only where **heavy units** may trigger CVOR — cross-link, do not conflate.

**Hired / non-owned — [COMMON POLICY STRUCTURE] [INSURER-SPECIFIC]**

- **Not automatic** on every commercial auto policy. Often **OPCF 27** (or CGL hired/non-owned auto endorsement) where purchased.
- Employees using **personal vehicles** for work may create **gap** if personal policy excludes business use — HNOA addresses **business liability**, not physical damage to employee's car unless separately arranged.

**Cargo vs automobile — [EXPOSURE]**

- **Goods carried in/on a business vehicle** are generally **not** covered by automobile liability; **inland marine / cargo** policies may apply. For-hire freight → `/cargo-freight-insurance/`.

**DCPD opt-out — [REGULATORY]**

- **OPCF 49** effective **January 1, 2024**: named insured may agree not to recover DCPD (and linked collision/all perils treatment per insurer guidance). **Optional** — default remains DCPD included. **[REGULATORY]** FSRA / O. Reg. 664.

**U.S. exposure — [UNDERWRITING] [FACILITY ASSOCIATION]**

- Operating in U.S. may require **territory extension**, **filings**, higher limits — insurer-specific. Facility Rule 228 (residual market) describes surcharges and 75% default exposure for new out-of-province/U.S. history — **[FACILITY ASSOCIATION]**, not universal market rule.

---

### C3. Commercial coverage structure (research notes)

| Topic | Safe page treatment |
|-------|---------------------|
| Owned vs leased vehicles | Both insurable; long-term lease may require **OPCF 5** / lessor as additional interest **[COMMON POLICY STRUCTURE]** |
| Fleet vs individually rated | Fleet = experience-rated programs (often 10+ units) **[UNDERWRITING]**; Facility Rule 239 defines 10+ self-propelled under common ownership **[FACILITY ASSOCIATION]** |
| Physical damage valuation | Stated amount / ACV per policy; optional |
| Loss of use | Optional endorsement (e.g. OPCF 20) where available **[INSURER-SPECIFIC]** |
| OPCF endorsements | 27 HNOA, 44R family protection, 49 DCPD waiver, 47R post-2026 optional AB — cite as **may be available**, not bundled |

---

## D. 2026 Ontario Auto Reform register

**Effective date:** **July 1, 2026** (new business and renewals per FSRA)  
**Primary sources:** FSRA SABS optionality page; FSRA Fact Sheet (29826); O. Reg. 34/10 (SABS); IBC consumer summary (Sept 2026 context)

| CLAIM | CURRENT RULE | EFFECTIVE | APPLIES TO | SOURCE | SAFE FOR COMMERCIAL AUTO PAGE? | PROPOSED WORDING (hedged) |
|-------|--------------|-----------|------------|--------|-------------------------------|---------------------------|
| Mandatory third-party liability minimum $200,000 | Min $200,000 per accident BI + PD | Ongoing | All Ontario motor vehicle liability policies | Insurance Act s. 251; CAIA | **YES** | *Ontario automobile policies must include third-party liability of at least $200,000 per accident — many businesses purchase $1 million or $2 million.* |
| Mandatory uninsured automobile coverage | Required component of automobile policy | Ongoing | Ontario automobile policies | CAIA; Ins Act s. 265; Reg 676 | **YES** | *Uninsured and unidentified motorist coverage is part of Ontario's compulsory automobile insurance framework.* |
| DCPD mandatory unless opted out | Standard unless OPCF 49 signed | Jan 1, 2024 opt-out | Ontario policies | FSRA OPCF 49; O. Reg. 664 | **YES** | *Direct Compensation Property Damage (DCPD) remains standard on Ontario auto policies unless the named insured opts out using OPCF 49 — an uncommon choice for most business fleets.* |
| Mandatory accident benefits after Jul 1, 2026 | **Medical, rehabilitation, and attendant care** remain mandatory | Jul 1, 2026 | Ontario automobile policies (incl. commercial OAP 1 structure) | FSRA; O. Reg. 34/10 | **YES — with commercial hedge** | *As of July 1, 2026, standard medical, rehabilitation, and attendant care accident benefits remain mandatory on Ontario automobile policies; other statutory accident benefits become optional where the policy form allows.* |
| Optional accident benefits | Income replacement, caregiver, death/funeral, etc. become **optional** for new/revised terms | Jul 1, 2026 | Ontario automobile policies | FSRA fact sheet | **YES** | *Income replacement, caregiver, death and funeral, and other benefits may be purchased optionally — confirm selections at purchase or renewal.* |
| Optional AB eligible persons narrowed | Optional AB covers named insured, spouse, dependants, **listed drivers** only | Jul 1, 2026 | Policies with optional AB | FSRA; IBC | **YES — liability gap note** | *Optional accident benefits apply only to named insureds, spouses, dependants, and listed drivers — pedestrians, cyclists, and some passengers may rely more on third-party liability claims if optional benefits do not apply to them.* |
| Existing renewals retain limits unless changed | Renewals keep prior optional AB unless insured agrees in writing to change | Jul 1, 2026 | Renewing policies | FSRA fact sheet | **YES** | *Renewing policies generally continue prior accident-benefit selections unless you agree in writing to change them — but who qualifies for optional benefits changes July 1, 2026 regardless of renewal date.* |
| OPCF 47R / OEF 47R | Priority-of-payment endorsement for purchased optional AB | Jul 1, 2026 | OAP 1 / OAP 4 respectively | FSRA form list; FA Rule 243 bulletin | **YES (brief)** | *Insurers may attach OPCF 47R (or OEF 47R on garage policies) where optional accident benefits are purchased — confirm certificate wording with your broker.* |
| Physical damage mandatory | **No** — collision/comp/specific perils optional | Ongoing | All | OAP 1 | **YES** | *Collision and comprehensive coverage are optional in Ontario — lenders or lessors may require them contractually.* |
| Commercial identical to personal reform | **Hedge required** | Jul 1, 2026 | Commercial automobile uses same SABS/OAP 1 framework | FSRA impacted forms include OAP 1, OPCF 21A fleet | **YES with hedge** | *July 2026 accident-benefit changes apply to Ontario automobile policy forms used for business vehicles — fleet and garage policies may use related forms (e.g. OPCF 21A, OAP 4); confirm how your insurer implements optional benefits on commercial policies.* |
| Facility fleet optional AB: only death/funeral on fleets | Fleet policies: only optional death & funeral unless vehicle removed to separate POL 1 | Jul 1, 2026 | **FA fleet policies only** | FA Manual Rule 202/302 bulletins | **ONLY AS [FACILITY ASSOCIATION] EXAMPLE** | *In Facility Association fleet programs, optional accident benefits beyond death and funeral may be restricted — standard market fleet policies may differ.* |

**TOP FINDINGS (2026 reform):**
1. **Mandatory AB narrows** to med/rehab/attendant care; everything else optional on new terms.
2. **Eligible population for optional AB shrinks** — potential **third-party liability exposure** for injuries to non-listed persons (IBAO/Canadian Underwriter Sept 2026 reporting).
3. **Commercial auto page must use post–July 2026 wording** — no pre-reform "all accident benefits mandatory" blanket statements.
4. **Garage (OAP 4) explicitly in FSRA reform scope** — relevant cross-link for garage route.

---

## E. Facility Association commercial manual findings

**Manual reviewed:** `1773411911187-ON_Manual_Effective_July_1_2026 V2.pdf` (downloaded from Facility Association, July 1, 2026 effective — **not in repo**; extracted for research).  
**All findings below tagged [FACILITY ASSOCIATION] unless independently supported.**

### Rule 228 — Outside Province Exposure

| Field | Content |
|-------|---------|
| **RULE** | 228 |
| **WHAT IT SAYS** | Commercial and interurban vehicles operated in the **U.S. or another Canadian jurisdiction** are subject to **surcharge or discount**. If Named Insured has **no prior insurance** and no prior out-of-province/U.S. travel history, vehicles **underwritten with 75% Out of Province/Territory or U.S. Exposure surcharge**. U.S. exposure % from **IFTA reports (last 4 quarters)**. Insureds must be asked if **proof of insurance filing** required; U.S. filings use **minimum FMCSA** limits by carriage/commodity/state. Interurban classes 61–64, 99 use Rule 228.C. **Currency differential surcharge** on liability when U.S. proof required (bulletin notes discontinuation/modernization in progress). |
| **WHO IT APPLIES TO** | **Facility Association** commercial and interurban risks in Ontario residual market |
| **FACILITY-SPECIFIC** | **YES** |
| **SAFE FOR GENERAL PIB PAGE** | **ONLY AS EXAMPLE** — e.g. *"Insurers review radius, territory, and U.S. exposure — residual-market manuals may apply surcharges when filing proof of U.S. insurance."* Do **not** state 75% surcharge as universal. |

### Rule 239 — Fleets

| Field | Content |
|-------|---------|
| **RULE** | 239 |
| **WHAT IT SAYS** | Fleet = **10+ self-propelled vehicles**, common ownership/management, business/commercial/public use, includes long-term leased units; applicant needs **120 vehicle-months** of liability insurance in past 12 months. Common management requires attestation + agreement. Fleet policies **annual only**; **experience rated**; premium may exceed DR0 quote; specific submission forms (Fleet Schedule, Fleet Vehicle Count Calculation, etc.). |
| **WHO IT APPLIES TO** | **Facility Association** fleet-rated commercial risks |
| **FACILITY-SPECIFIC** | **YES** |
| **SAFE FOR GENERAL PIB PAGE** | **ONLY AS EXAMPLE** for fleet definition threshold — *"Many insurers treat 10 or more power units as fleet experience-rated business — definitions vary by market."* |

### Rule 241 — Carrying Explosives

| Field | Content |
|-------|---------|
| **RULE** | 241 |
| **WHAT IT SAYS** | Standard exclusion for explosives may be modified by **END 4A** for specified explosives only (all coverages or mandatory only). **Explosive Questionnaire** required. Commercial manufacturer/dealer vehicles rated per Commercial Section; other vehicles additional premium. |
| **WHO IT APPLIES TO** | FA policies carrying explosives |
| **FACILITY-SPECIFIC** | **YES** |
| **SAFE FOR GENERAL PIB PAGE** | **NO** (niche) — omit unless owner wants hazardous-materials consideration bullet |

### Rule 242 — Carrying Radioactive Material

| Field | Content |
|-------|---------|
| **RULE** | 242 |
| **WHAT IT SAYS** | Exclusion modified by **END 4B** for specified radioactive material; **Radioactive Materials Questionnaire**; additional premium. |
| **WHO IT APPLIES TO** | FA policies carrying radioactive material |
| **FACILITY-SPECIFIC** | **YES** |
| **SAFE FOR GENERAL PIB PAGE** | **NO** (niche) |

### Rule 243 — Endorsements / POL 1

| Field | Content |
|-------|---------|
| **RULE** | 243 |
| **WHAT IT SAYS** | Lists approved endorsements for POL 1 commercial vehicles; post–Jul 1, 2026 includes **OPCF 47R** (optional AB + priority of payment) — provided **without charge** when optional AB purchased; must appear on certificate. Also END 30/31 attached equipment, OPCF 21A fleet reporting, etc. |
| **WHO IT APPLIES TO** | FA POL 1 commercial automobile policies |
| **FACILITY-SPECIFIC** | **YES** for endorsement inventory/rating; **OPCF 47R existence** supported by FSRA **[REGULATORY]** |
| **SAFE FOR GENERAL PIB PAGE** | **PARTIAL** — OPCF 47R safe at high level; FA-specific END numbering not needed on PIB page |

---

## F. Garage / Dealership research (Ontario)

### F1. Businesses this route should serve

| Segment | Distinct exposures |
|---------|-------------------|
| New/used **auto dealerships** | Inventory PD, open lot, test drives, dealer plates, OMVIC registration, floorplan/lender requirements |
| **Repair garages / mechanics** | Customer vehicles in C/C/C, hoist/tools, faulty repair liability, loaners/courtesy cars |
| **Body shops / collision** | Spray booth, environmental, total-loss storage, sublet |
| **Tire / quick-lube / detail** | Lower severity C/C/C, drive-through liability |
| **Storage / parking** | Bailees exposure, theft, fire |
| **Towing** (if included) | On-hook / storage — may need specialty market; **FLAG** if page overclaims |

**Do not pretend** identical policy structure for all — **one combined route OK** if copy segments dealer vs garage sub-audiences in hero, considerations, FAQs.

### F2. Garage auto exposure — [REGULATORY] [COMMON POLICY STRUCTURE]

**Ontario Garage Automobile Policy — OAP 4** (FSRA; OAP4-EN_2026 effective July 1, 2026):

| Section / concept | Purpose |
|-------------------|---------|
| **Section 1 — Third-party liability** | BI/PD from ownership/use of **owned** autos and garage operations |
| **Section 2 — Accident benefits** | SABS framework (Jul 2026 reforms apply — **OEF 47R** for garage) |
| **Section 3 — Uninsured automobile** | Mandatory framework component |
| **Section 4 — DCPD** | Property damage to insured autos not at fault |
| **Section 5 — Loss/damage to owned automobiles** | Optional PD on owned/dealer inventory units |
| **Section 6 — Liability for damage to customer's automobile** | **Legal liability** for customer vehicles in C/C/C — Ontario analogue to "garagekeepers" |

**Terminology guidance:**
- Use **"OAP 4" / "garage automobile policy"** as Ontario-primary terms.
- **"Garagekeepers"** acceptable as visitor shorthand with explanation that OAP 4 Section 6 covers **legal liability** for customer vehicles — **direct primary** vs **legal liability** forms vary in specialty/US-influenced programs **[INSURER-SPECIFIC]**.
- Customer's **own auto policy** may be **first loss**; garage policy responds to **garage's legal liability** (subrogation flow) **[COMMON POLICY STRUCTURE]** OAP 4 definitions.

**CGL vs garage automobile vs property:**

| Policy | Role |
|--------|------|
| **OAP 4** | Automobile TPL, AB, DCPD, owned-vehicle PD, customer-auto legal liability |
| **CGL / "garage liability" package** | Premises/operations, products-completed ops for auto service — **does not replace OAP 4** for auto exposures |
| **Commercial property** | Building, tools, equipment, stock — separate from automobile form |

### F3. Dealership regulation — OMVIC / MTO [REGULATORY]

| Topic | Finding |
|-------|---------|
| **OMVIC mandates specific insurance product?** | **No explicit product mandate found.** OMVIC Dealer Premises Guideline: dealers must comply with **Compulsory Automobile Insurance Act** and have **"appropriate insurance"** — questions on other insurance → legal/regulatory advice. |
| **MTO Garage Licence (SR-LV-053E)** | Application requires **Certificate of Insurance** under **"standard garage automobile policy"** with insurer name/policy number — **[REGULATORY]** evidence of OAP 4-class coverage for licensed garage/dealer operations. |
| **Safe visitor wording** | *Licensed motor vehicle dealers and repair garages in Ontario must maintain automobile insurance under the standard garage policy form (OAP 4) as part of licensing — your broker can align limits and sections with your operations.* |

---

## G. Pollution Liability research

### G1. Product landscape — what this route should own

| Product type | Typical buyer | Own on this route? |
|--------------|---------------|-------------------|
| **Contractors Pollution Liability (CPL)** | Excavation, remediation, utilities, general contractors | **Yes — primary audience** |
| **Site / Premises Pollution (EIL)** | Property owners, gas stations, UST, warehouses | **Yes — secondary** |
| **Transportation pollution** | Carriers, waste haulers | **Mention + cross-link** cargo/auto |
| **Professional environmental liability** | Consultants | **Brief mention / cross-link** E&O |
| **CGL with pollution buyback** | Various | Explain as **alternative structure**, not replacement for dedicated form |

**Positioning:** Route may remain **broad pollution liability** with CPL-weighted Explorer — owner decision (§P).

### G2. CGL pollution exclusions — [COMMON POLICY STRUCTURE] [LEGAL]

**Do NOT say:** "CGL never covers pollution" or "Pollution liability covers all environmental losses."

**Safe framing:**
- CGL policies often contain **pollution exclusions** (sudden-and-accidental legacy, **absolute/total pollution exclusion** modern).
- Application depends on **wording, pleadings, and activity** (*Miracle* ONCA 2011 — gas bar UST migration excluded; *Hemlow* ONCA 2021 — not every property damage claim is "pollution" despite liquid release).
- Pollution policies are **often arranged to address gaps** — cleanup, gradual contamination, defence — subject to **claims-made** trigger, **retroactive date**, **known pollution** exclusions.

### G3. Trigger / policy structure

| Element | Research note |
|---------|---------------|
| Claims-made vs occurrence | **Many CPL/site forms are claims-made** — retroactive date critical |
| Known pollution / pre-existing | **Typically excluded** — disclose site history |
| Sudden vs gradual | Dedicated pollution may cover **gradual** where CGL excludes; **not universal** |
| Cleanup / remediation | May include **on-site/off-site cleanup costs** subject to limits — **not regulatory fines** |
| Third-party BI/PD | May be included per form |
| Defence costs | Often within limit — erodes limit |
| Transportation | Separate insuring agreement on some programs |
| Non-owned disposal sites | Endorsement-dependent |
| Mold/microbial | Often sublimited or excluded |
| Storage tanks | UST/AST schedules common |
| Fines/penalties | **Generally uninsurable** in Ontario public policy — do not imply coverage |

---

## H. Ontario environmental law register (insurance-relevant only)

| LAW | SECTION | EXACT REQUIREMENT | WHO | INSURANCE RELEVANCE | SAFE VISITOR WORDING |
|-----|---------|-------------------|-----|---------------------|----------------------|
| **Environmental Protection Act** | **s. 92(2)** | Person who knows or ought to know of a spill must **report** immediately | Spiller / person in charge of pollutant | Pollution policies may address **cleanup costs and third-party claims** — **reporting is a legal duty independent of insurance** | *Ontario law requires prompt reporting of spills — insurance may help with certain cleanup and liability costs if a covered pollution event occurs, but reporting obligations apply regardless.* |
| **EPA** | **s. 93(1)** | Owner/controller of spilled pollutant must **prevent, eliminate adverse effects, restore environment** | Owner/controller of pollutant | Insurable remediation may overlap — ** statutory duty persists whether or not insured** | *Those responsible for a spill must take reasonable steps to mitigate and remediate — pollution insurance, where purchased, may respond to certain costs subject to policy terms.* |
| **EPA** | **s. 97** | Minister may **order** responsible persons to clean up spills | Responsible parties | Orders create **legal exposure**; **defence** may be covered; **fines** typically excluded | *Regulators can order cleanup — pollution liability may address certain defence and remediation costs, but regulatory penalties are generally not insurable.* |
| **EPA** | **s. 17–18** | Director may order **remedial/preventive** measures for discharge/contamination | Owners/persons with management/control of source property | **Owner/purchaser** site liability driver for **EIL** | *Property owners and operators can be ordered to remediate contamination on site — site pollution coverage may be considered where historical or ongoing pollution risks exist.* |
| **EPA** | **s. 91.1** | Certain facilities must have **spill prevention/contingency plans** | Prescribed industrial facilities | **Underwriting / compliance** — not insurance product | *Some Ontario facilities must maintain spill prevention plans — your broker can discuss how insurance fits your overall environmental risk management.* |
| **Ontario.ca — Report pollution** | — | Spills Action Centre **1-800-268-6060** | Public | Operational reference only — **not legal advice** | Optional FAQ: *Report spills to the Spills Action Centre and your broker as required by law and contract.* |

---

## I. Farm insurance research (Ontario)

### I1. Customer scope

**Primary:** Working **family and commercial farms** in Essex County / Windsor-Essex — crop, livestock, mixed, farm property + liability.

**Not primary (cross-link):** Greenhouse/hydroponic **agribusiness** (`/greenhouse-agribusiness-insurance/`), **AgriInsurance** crop production programs, large **agribusiness processing** (may need CGL/property package).

### I2. Property — [COMMON POLICY STRUCTURE] [INSURER-SPECIFIC]

Typical **private farm package** (e.g. mutual insurer farm forms) may include:

- Farm dwelling (sometimes integrated) — **not identical to home policy**
- Barns, outbuildings, silos, bins
- Farm machinery/equipment (scheduled or blanket)
- Livestock — often **named perils**; mortality optional
- Produce, feed, supplies
- Replacement cost vs ACV — **policy-specific**
- Perils: fire, wind, hail, theft — **not "all risk" unless stated**
- Water, flood, collapse, vacancy — **endorsement-dependent**
- **Equipment breakdown** — optional, not universal

### I3. Liability — [COMMON POLICY STRUCTURE]

- **Farm liability** — premises + farming operations; may differ from ISO CGL labels
- Products / completed ops for farm produce
- **Roadside stands / U-pick / agritourism** — often **endorsement or gap** (current FAQ acknowledges)
- **Custom farming** — equipment liability + contract exposure
- **Pollution** — limited farmer's pollution extension on some forms — not full EIL

### I4. Vehicles / machinery — [STATUTORY] [EXPOSURE]

| Asset | Insurance path |
|-------|----------------|
| **Licensed trucks/cars/plates on public roads** | **Ontario automobile insurance (OAP 1)** — compulsory framework |
| **Farm tractors/implement on farm/private land** | Often **farm property policy** scheduled equipment |
| **Tractors on road occasionally** | May need **automobile or farm policy extension** — disclose use |

**Do not imply** all machinery on one form.

### I5. Business interruption / income — [INSURER-SPECIFIC]

- **Farm income / loss of earnings** extensions exist on some mutual packages
- **Distinct from** commercial BI — farm forms use farm-specific triggers/values
- **Crop revenue loss** — **AgriInsurance / Production Insurance** (Agricorp) — **government program**, not private farm property policy

### I6. Specialized coverages — mention with separation

| Topic | Treatment |
|-------|-----------|
| Livestock mortality | Optional private coverage |
| Crop insurance | **AgriInsurance** — cross-link Agricorp/OFA resources, not "farm property" |
| Greenhouse structures | **`/greenhouse-agribusiness-insurance/`** |
| Cyber / crime | Optional; not core farm Explorer |
| Equipment breakdown | Optional endorsement |

**Source:** OFA insurance summary; Peel Mutual FarmInsure; Trillium farm product pages; Ontario SCAP AgriInsurance operational doc.

---

## J. Cross-page differentiation matrix

| Dimension | Commercial Auto | Garage / Dealership | Pollution Liability | Farm |
|-----------|-----------------|---------------------|---------------------|------|
| **PRIMARY CUSTOMER** | Businesses with company vehicles (vans, pickups, light/medium fleet) | Dealers, repairers, service bays holding customer autos | Contractors, manufacturers, property owners with chemical/UST exposure | Working farms — crop/livestock/mixed |
| **PAGE JOB** | Teach **Ontario business automobile** mandatory vs optional coverages; fleet basics | Teach **OAP 4 + property/CGL coordination** for auto service/dealer | Teach **CGL gap + pollution form triggers** | Teach **farm package vs auto vs crop programs** |
| **CORE INSURANCE CONCEPTS** | TPL, AB, UM, DCPD, optional PD, HNOA, OPCFs | OAP 4 sections, customer auto legal liability, inventory PD, garage liability, property | CPL, site EIL, claims-made, retro date, cleanup/defence | Farm property, machinery, farm liability, livestock |
| **WHAT BELONGS** | Vehicle scheduling, drivers, radius, HNOA, fleet structure | Test drives, C/C/C, inventory lot, tools/building | Site history, gradual pollution, UST, contractor ops | Barns, equipment, livestock, agritourism, farm vehicles coordination |
| **WHAT DOES NOT BELONG** | Motor truck cargo, CVOR depth, shipper contracts, U.S. filing detail | Full pollution treatise, personal auto | Generic CGL replacement narrative | Greenhouse commercial ops, AgriInsurance as "farm policy", detailed trucking |
| **BEST CROSS-LINKS** | Trucking, dump truck, cargo, small business | Commercial auto, commercial property, pollution, convenience store (UST) | Contractors, manufacturing, commercial property | Greenhouse, commercial auto (farm trucks), pollution |
| **OVERLAP RISKS** | **Trucking page** (fleet archetype, highway imagery) | **Commercial auto** (owned dealer trucks vs OAP 4) | **CGL / contractors page** | **Greenhouse page** |
| **EXPLORER PURPOSE** | Four pillars of **business auto program** | Four pillars of **garage/dealer program** | Four **pollution coverage buckets** (must not overstate breadth) | Four **farm package pillars** |

### Adjacent route notes

| Adjacent route | Relationship |
|----------------|--------------|
| **Trucking** | For-hire freight + CVOR + cargo — **redirect** heavy for-hire users |
| **Dump truck** | Construction hauling + NTL — specialty |
| **Cargo/freight** | Freight in transit — not automobile policy |
| **Commercial property** | Building/contents — garage and farm cross-link |
| **Equipment breakdown** | Optional endorsement — farm/greenhouse mention only |
| **Greenhouse** | Controlled-environment agribusiness — farm cross-link out |
| **Contractors** | CPL audience overlap — pollution page owns environmental form detail |
| **Small business** | Package hub — may link commercial auto if vehicles |

---

## K. Explorer V2 plan (all Batch C states)

**Pattern:** RIGHT = WHAT · LEFT = WHY IT MATTERS (farm: farm-specific WHY)

### Commercial Auto (`/commercial-auto-insurance/`)

| STATE ID | CURRENT TITLE | KEEP / RETITLE / FLAG | PROPOSED VISITOR TITLE | SHORT LABEL | RIGHT DESCRIPTION CONCEPT | DETAIL TITLE | LEFT DETAIL DESCRIPTION CONCEPT | FACTUAL CAUTION |
|----------|---------------|----------------------|--------------------------|-------------|----------------------------|--------------|-----------------------------------|-----------------|
| `liability-coverage` | Liability Coverage | **RETITLE** | Third-Party Auto Liability | Auto Liability | Ontario-regulated **third-party liability** on business vehicles — minimum $200,000 statutory; higher limits common | Why automobile liability limits matter for business operations | Contractual requirements, severity of highway accidents, Jul 2026 optional-AB population shift may increase liability claims exposure | Do not imply one limit fits all; statutory min is $200k |
| `physical-damage-coverage` | Physical Damage Coverage | **KEEP** | Collision & Comprehensive (Optional) | Phys. Damage | **Optional** collision/comp/specified perils on owned/leased units — where purchased | Why optional physical damage is a separate business decision | Lender lease requirements, fleet replacement cost, downtime | **Not mandatory** in Ontario |
| `hired-non-owned-auto` | Hired & Non-Owned Auto | **KEEP** | Hired & Non-Owned Auto | HNOA | **Endorsement/CGL extension** for liability when employees/reps use rented or personal vehicles for work — where purchased | Why employee vehicle use is a hidden fleet exposure | Personal auto business-use exclusions, delivery/errand exposure | **Not automatic** on base policy |
| `fleet-discounts-multi-vehicle-management` | Fleet Discounts & Multi-Vehicle Management | **RETITLE** | Fleet & Multi-Vehicle Programs | Fleet | Scheduling multiple units, certificates, experience rating, OPCF 21A-style reporting on some programs | Why fleet structure affects pricing and compliance | 10+ unit experience rating, driver eligibility, renewal data | Facility 10-vehicle fleet rule is **[FACILITY ASSOCIATION]** example only |

### Garage / Dealership (`/garage-dealership-insurance/`)

| STATE ID | CURRENT TITLE | KEEP / RETITLE / FLAG | PROPOSED VISITOR TITLE | SHORT LABEL | RIGHT DESCRIPTION CONCEPT | DETAIL TITLE | LEFT DETAIL DESCRIPTION CONCEPT | FACTUAL CAUTION |
|----------|---------------|----------------------|--------------------------|-------------|----------------------------|--------------|-----------------------------------|-----------------|
| `garagekeepers-liability` | Garagekeepers Liability | **RETITLE** | Customer Vehicles (Legal Liability) | Customer Autos | OAP 4 **Section 6** — legal liability for damage to **customer vehicles** in C/C/C during service/storage | Why customer cars are not covered by your personal auto policy | Primary insurer/subrogation; legal liability vs direct-primary forms | Avoid unhedged "covers"; Ontario term is garage policy section |
| `dealer-open-lot` | Dealer Open Lot | **RETITLE** | Dealer Inventory & Open Lot | Open Lot | **Physical damage** on owned/dealer inventory — open lot theft/vandalism/hail subject to causes of loss | Why lot inventory is a separate values exposure | Stated amounts, reporting, seasonal inventory swings | Not all service-only garages need open-lot wording |
| `garage-liability` | Garage Liability | **RETITLE** | Garage Operations Liability | Operations | **Premises/operations** — faulty repair, slips, property damage from garage work — typically **CGL/garage liability package**, not a substitute for OAP 4 | Why CGL does not replace garage automobile coverage | Completed operations, test drive BI, hoist injuries | **FLAG:** title "Garage Liability" confused with OAP 4 — clarify split |
| `physical-damage-on-inventory` | Physical Damage on Inventory | **KEEP** | Owned & Inventory Physical Damage | Inventory PD | OAP 4 **Section 5** optional PD on **owned** units held for sale or use | Why dealer-owned units need scheduled values | Consignment, floorplan, lender loss payee | Consigned units — confirm insurable interest |

### Pollution Liability (`/pollution-liability-insurance/`)

| STATE ID | CURRENT TITLE | KEEP / RETITLE / FLAG | PROPOSED VISITOR TITLE | SHORT LABEL | RIGHT DESCRIPTION CONCEPT | DETAIL TITLE | LEFT DETAIL DESCRIPTION CONCEPT | FACTUAL CAUTION |
|----------|---------------|----------------------|--------------------------|-------------|----------------------------|--------------|-----------------------------------|-----------------|
| `contractors-pollution-liability` | Contractors Pollution Liability | **KEEP** | Contractors Pollution Liability | CPL | **Claims-made** coverage for pollution conditions from **contracting operations** — where purchased | Why excavating and utility work triggers CPL contracts | Bid specs, sudden/gradual, defence within limits | Asbestos/disturbance — high exclusion risk |
| `site-pollution` | Site Pollution | **RETITLE** | Site / Premises Pollution | Site Pollution | **Owned/operated site** gradual contamination, UST, storage — EIL/site form | Why property ownership retains environmental liability | Phase I/II history, known conditions exclusion | **FLAG:** card currently overstates breadth |
| `transportation-pollution` | Transportation Pollution | **RETITLE / FLAG** | Transportation Pollution (Where Included) | Trans. Pollution | Pollution releases **during transport** of waste/materials — **endorsement-specific** | Why auto liability and cargo do not cover environmental cleanup | Waste haulers, spill in transit | Not all pollution policies include — **FLAG FOR OWNER** |
| `cleanup-defence-costs` | Cleanup & Defence Costs | **RETITLE** | Cleanup & Defence Costs | Cleanup | **Remediation and legal defence** for covered pollution events — sublimits apply | Why cleanup costs exceed typical CGL | EPA orders vs insurable remediation; fines excluded | **Do not imply regulatory fines insured** |

### Farm (`/farm-insurance/`)

| STATE ID | CURRENT TITLE | KEEP / RETITLE / FLAG | PROPOSED VISITOR TITLE | SHORT LABEL | RIGHT DESCRIPTION CONCEPT | DETAIL TITLE | LEFT DETAIL DESCRIPTION CONCEPT | FACTUAL CAUTION |
|----------|---------------|----------------------|--------------------------|-------------|----------------------------|--------------|-----------------------------------|-----------------|
| `farm-property-coverage` | Farm Property Coverage | **KEEP** | Farm Property & Buildings | Farm Property | Barns, outbuildings, dwelling if scheduled — **perils per policy** | Why farm structures exceed homeowner limits | Replacement cost vs ACV, detached outbuildings | Not all items automatic |
| `equipment-machinery` | Equipment & Machinery | **RETITLE** | Farm Machinery & Equipment | Equipment | Tractors, implements, combines — scheduled; **road use** may need auto | Why equipment values spike at seed/harvest | Off-farm use, custom work, lender requirements | **Licensed road vehicles → commercial auto** |
| `farm-liability` | Farm Liability | **KEEP** | Farm Liability | Liability | BI/PD from **farming operations** and premises — farm form, not generic CGL label | Why visitors, workers, and neighbours create liability | Agritourism, livestock straying, custom farming | Agritourism may need endorsement |
| `livestock-coverage` | Livestock Coverage | **KEEP** | Livestock Coverage | Livestock | Named-peril or mortality extensions for cattle, swine, poultry — **where purchased** | Why herd loss affects farm income | Disease exclusions, transit, fair-market valuation | Separate from **AgriInsurance** crop programs |

**Explorer changes recommended:** **16 states — all KEEP IDs**; **RETITLE** 9 visitor titles; **FLAG** 3 (garage-liability naming, transportation-pollution breadth, site-pollution breadth).

---

## L. Considerations plan (~6–8 per route)

### Commercial Auto
1. **Vehicle type, weight, and business use class** — rating/eligibility  
2. **Driver records and licence class** — underwriting  
3. **Radius and territory** (local vs interprovincial vs U.S.) — OPCF/territory  
4. **Fleet size and experience rating** — 10+ units  
5. **Physical damage values and deductibles** — optional  
6. **Hired/non-owned and employee personal vehicles** — endorsement gap  
7. **Cargo vs automobile** — cross-link cargo/freight  
8. **July 2026 accident benefits choices** — optional AB + liability gap  

### Garage / Dealership
1. **Customer vehicles in care/custody/control** — OAP 4 Section 6 limits/deductibles  
2. **Dealer inventory values and open lot** — theft/hail  
3. **Test drives and dealer plates** — driver eligibility  
4. **Owned shop vehicles vs OAP 4** — scheduling  
5. **Tools, hoists, diagnostic equipment** — property policy  
6. **Spray booth / environmental** — pollution cross-link  
7. **Business interruption** — downtime  
8. **OMVIC/MTO licensing evidence** — certificate of garage policy  

### Pollution Liability
1. **Site history and Phase I/II** — known conditions  
2. **Operations and materials** — chemicals, waste, refrigerants  
3. **Storage tanks (UST/AST)** — scheduling  
4. **Contractual CPL requirements** — contractors  
5. **Transportation of waste/materials** — endorsement  
6. **Waste disposal and non-owned sites**  
7. **Claims-made retroactive date** — renewals/M&A  
8. **Regulatory cleanup vs insurable costs** — fines exclusion  

### Farm
1. **Acreage and operation type** (crop/livestock/mixed)  
2. **Buildings and replacement values**  
3. **Machinery schedules and seasonal peaks**  
4. **Livestock type and mortality options**  
5. **Farm products and storage**  
6. **Licensed farm vehicles** — OAP 1 coordination  
7. **Custom farming and ag contractors**  
8. **Agritourism / farm stand** — endorsement  
9. **Pollution and fuel storage** — limited extension vs EIL  

---

## M. FAQ plan (~5 per route)

### Commercial Auto
| # | Question | Research support | Answer direction (not final copy) |
|---|----------|------------------|-----------------------------------|
| 1 | What makes a vehicle **commercial**? | CAIA; FSRA business use classes | Business use, registration, weight, carrying goods/passengers for business — insurer classification |
| 2 | What coverage is **mandatory** in Ontario? | Ins Act s.251; CAIA; Jul 2026 FSRA | TPL min $200k; UM; DCPD unless OPCF 49; med/rehab/attendant care AB post-Jul 2026 |
| 3 | Are **collision/comprehensive mandatory**? | OAP 1 structure | **No** — optional; lenders may require |
| 4 | What about **employees using personal vehicles**? | OPCF 27 / HNOA | Endorsement may be needed; personal policy may exclude business use |
| 5 | What information is needed to **quote**? | Market practice | Vehicle list, VINs, drivers, use, radius, limits, loss history |

### Garage / Dealership
| # | Question | Research support |
|---|----------|------------------|
| 1 | What insurance does a **repair garage** need? | OAP 4; MTO SR-LV-053E |
| 2 | How are **customer vehicles** addressed? | OAP 4 §6; legal liability concept |
| 3 | How is **dealership inventory** insured? | OAP 4 §5; open lot |
| 4 | Does **CGL replace garage auto** coverage? | OAP 4 vs CGL — **no** |
| 5 | What information is needed to **quote**? | Operations, services, lot size, inventory values, lifts, loss history |

### Pollution Liability
| # | Question | Research support |
|---|----------|------------------|
| 1 | Doesn't **CGL already cover pollution**? | CGL exclusions; case law hedge |
| 2 | Can pollution insurance address **gradual** pollution? | CPL/EIL forms — claims-made |
| 3 | What **cleanup costs** may be covered? | Policy insuring agreements; EPA s.93 duty |
| 4 | Can **existing contamination** be insured? | Known conditions exclusion |
| 5 | **Who should consider** pollution liability? | Contractors, UST, manufacturing — not everyone |

### Farm
| # | Question | Research support |
|---|----------|------------------|
| 1 | What does **farm insurance** cover? | Farm package structure — hedged |
| 2 | Are **barns and machinery** insured? | Property section — perils/end limits |
| 3 | What about **livestock**? | Named perils/mortality optional |
| 4 | Are **farm vehicles** included? | OAP 1 for licensed road vehicles |
| 5 | What information is needed to **quote**? | Acreage, buildings, equipment, livestock, activities |

---

## N. Numeric / legal / coverage claim register

| ROUTE | CLAIM | TYPE | SOURCE | SOURCE DATE | EXACT SUPPORT | ONTARIO-WIDE OR FA/INSURER | SAFE | HEDGE | KEEP / OMIT / OWNER |
|-------|-------|------|--------|-------------|---------------|----------------------------|------|-------|---------------------|
| Commercial Auto | Min TPL **$200,000** | Statutory | Insurance Act s.251(1) | Current | "at least $200,000… per accident" | Ontario-wide | Yes | Recommend higher limits | **KEEP** |
| Commercial Auto | **$1M / $2M** common limits | Market | IBC/broker practice | 2026 | Industry norm | Ontario-wide common | Yes | "Many businesses purchase…" | **KEEP** |
| Commercial Auto | DCPD **optional** via OPCF 49 | Regulatory | FSRA; Jan 1 2024 | 2024 | Opt-out endorsement | Ontario-wide | Yes | Uncommon for fleets | **KEEP** |
| Commercial Auto | Jul 1 2026 **mandatory AB** = med/rehab/attendant care only | Regulatory | FSRA SABS page | 2026 | FSRA statement | Ontario-wide | Yes | Fleet/garage form hedge | **KEEP** |
| Commercial Auto | Optional AB only for named insured, spouse, dependants, listed drivers | Regulatory | FSRA fact sheet | 2026 | Listed categories | Ontario-wide | Yes | Liability gap note | **KEEP** |
| Commercial Auto | Uninsured motorist **$200,000** min reference | Statutory | Ins Act s.251; Reg 676 | Current | ON minimum for UMC | Ontario-wide | Yes | Per occurrence shared | **KEEP** (optional detail) |
| Commercial Auto | Fleet = **10+ vehicles** | Underwriting | FA Rule 239 | Jul 2026 | "10 or more self-propelled" | **FA-specific** | Only as example | "Insurers may…" | **KEEP (hedged)** |
| Commercial Auto | **75%** out-of-province surcharge no prior travel | Underwriting | FA Rule 228 | Jul 2026 | FA NOTE | **FA-specific** | No as universal | FA example only | **OMIT** or owner footnote |
| Garage | **Standard garage automobile policy** for licence | Regulatory | MTO SR-LV-053E | 2022 form | Certificate field | Ontario-wide licensing | Yes | OAP 4 alignment | **KEEP** |
| Garage | OMVIC mandates **specific limits** | Regulatory | OMVIC guideline | Current | "Appropriate insurance" — not specific product | Ontario-wide | No categorical mandate | — | **OMIT** |
| Pollution | CGL **never** covers pollution | Coverage | — | — | Not supported | — | **No** | — | **OMIT** |
| Pollution | Pollution covers **all** environmental loss | Coverage | — | — | Not supported | — | **No** | — | **OMIT** |
| Pollution | **Regulatory fines** insurable | Legal | Public policy | — | Generally excluded | Ontario-wide | No | — | **OMIT** |
| Pollution | **Known contamination** insurable after discovery | Coverage | Market | — | Typically excluded | Market | Yes | Application disclosure | **KEEP** |
| Farm | **AgriInsurance** = farm property policy | Program | Ontario.ca SCAP | Current | Separate program | Ontario-wide | No — distinguish | Government crop program | **OMIT conflation** |
| Farm | **All farm packages all-risk** | Coverage | — | — | Not supported | — | No | — | **OMIT** |
| All | Universal **"Covers/Protects"** on cards | Wording | Internal audit | 2026 | Unhedged | — | No | Use "may help" | **FIX at implement** |

---

## O. Unsupported / risky claims (current + proposed avoidance)

1. **Commercial auto Explorer/trucking visual merge** — `fleet-vehicles` archetype implies highway tractor fleet.  
2. **"Core coverages that protect…"** — implies collision/HNOA included.  
3. **Garage "Covers customer vehicles"** — omits legal-liability structure and primary insurer order.  
4. **Garage FAQ test drives "typically included"** — needs OAP 4 / endorsement hedge.  
5. **Pollution FAQ "Standard GL typically excludes… short time window"** — outdated/overbroad.  
6. **Pollution "Dedicated pollution coverage fills that gap"** — categorical.  
7. **Pollution card "Covers regulatory-mandated remediation"** — blurs insurable remediation vs **orders/fines**.  
8. **Pollution asbestos in card** — latent/exclusion hotspot.  
9. **Farm "Protects/Covers"** unhedged on property/equipment/liability cards.  
10. **Farm hero implies dwelling always in farm policy** — may be separate.  
11. **Facility 75% surcharge or 10-vehicle rule as market universal** — FA-only.  
12. **CVOR on commercial auto page as primary narrative** — belongs trucking/dump.  

---

## P. Owner decisions

### A. Commercial Auto — Explorer states
**Question:** Are the current four Explorer states still the best four? Should **hired/non-owned auto** be core Explorer or supporting content?

**Research recommendation:** **KEEP all four IDs.** Retitle liability/physical damage/fleet states for Jul 2026 precision. **HNOA remains core Explorer** — common SMB gap — but add consideration + FAQ depth; optional fifth consideration for cargo distinction without fifth Explorer state.

### B. Garage / Dealership — combined route
**Question:** Does one combined route still make sense? How distinguish dealers vs repair shops?

**Research recommendation:** **YES — keep combined route** with **whoItIsFor segmentation** (already present), plus considerations blocks for **dealer inventory/test drives** vs **repair C/C/C**. Explorer four states map well if **`garage-liability` retitled** to clarify CGL/operations vs OAP 4.

### C. Pollution Liability — positioning
**Question:** Broad pollution vs primarily contractors pollution?

**Research recommendation:** **Keep broad route** with **CPL-weighted** hero and contractor cross-links — site/UST audiences in whoItIsFor. **FLAG `transportation-pollution` state** — owner may demote to consideration if misreads as universal.

### D. Farm — vs Greenhouse
**Question:** Broad farm with Greenhouse cross-link?

**Research recommendation:** **YES** — farm stays **field/barn/livestock/traditional ops**; link greenhouse for controlled-environment agribusiness. Do not duplicate greenhouse BI/EB states.

### E. Explorer IDs — misleading comprehension
**Question:** Any IDs fundamentally misleading?

**Research recommendation:** **Preserve all IDs.** **FLAG for owner review:** `garage-liability` (conflicts with OAP 4 naming), `transportation-pollution` (optional not universal), `fleet-discounts-multi-vehicle-management` ( sounds like discount marketing not insurance structure). Retitling fixes visitor comprehension without ID churn.

---

## Q. Proposed implementation scope

**Target grade:** A (~1000–1300+ substantive words per route)  
**Pattern:** Batch B — V2 detail pairs, 6–8 expandable considerations, 5 hedged FAQs, trust band, Windsor–Essex geo.

| Route | Primary source file | Est. words |
|-------|---------------------|----------|
| Commercial Auto | `src/data/commercial-industries.ts` | ~1100–1300 |
| Garage / Dealership | `src/data/product-pages/commercial-products-industry.ts` | ~1100–1300 |
| Pollution Liability | `src/data/product-pages/commercial-products-industry.ts` | ~1200–1400 (precision-heavy) |
| Farm | `src/data/pilot-commercial-inline.ts` | ~1100–1300 |

**Shared touch:** `src/lib/buildPilotProductConfig.ts` — expandable considerations (if farm needs variant).

**Do NOT change without owner approval:** Explorer IDs, manifest zones, images, scanner, frozen Batch A/B routes.

---

## R. Expected files to change (implementation phase only)

| File | Purpose |
|------|---------|
| `src/data/commercial-industries.ts` | Commercial Auto content |
| `src/data/product-pages/commercial-products-industry.ts` | Garage + Pollution |
| `src/data/pilot-commercial-inline.ts` | Farm insurance |
| `src/lib/buildPilotProductConfig.ts` | Considerations/trust if needed |
| `scripts/verify-grade-c-batch-c.cjs` | Batch verifier (new, QA) |
| `docs/grade-c-batch-c-auto-garage-environmental-farm-implementation-2026-09-09.md` | Phase 2 report |

**NOT expected:** Explorer manifest (`routes.ts`), images, runtime, navigation, Batch A/B sources.

---

## S. Sources

### Statutory / regulatory
- Compulsory Automobile Insurance Act, RSO 1990, c C.25 — https://www.canlii.org/en/on/laws/stat/rso-1990-c-c25/latest/
- Insurance Act, RSO 1990, c I.8 (ss. 251, 258, 265) — CanLII
- Environmental Protection Act, RSO 1990, c E.19 (ss. 17, 18, 91.1, 92, 93, 97) — https://www.ontario.ca/laws/statute/90e19
- Report pollution and spills — https://www.ontario.ca/page/report-pollution-and-spills
- FSRA — Changes in SABS coverage July 1, 2026 — https://www.fsrao.ca/industry/auto-insurance/changes-statutory-accident-benefits-coverage-ontario-july-1-2026
- FSRA Fact Sheet: 2026 Accident Benefits Reforms — https://www.fsrao.ca/media/29826/download
- FSRA OAP 4 Garage Policy — https://www.fsrao.ca/oap-4-ontario-garage-automobile-policy
- OAP 4 policy wording (OAP4-EN_2026) — https://www.fsrao.ca/media/28941/download
- MTO SR-LV-053E Application for Garage Licence — https://forms.mgcs.gov.on.ca/ (Form SR-LV-053E)
- OMVIC Dealer Premises Guideline — https://www.omvic.ca/selling/dealer-guidelines-and-resources/dealer-premises-guideline/

### Industry
- IBC Ontario Auto Insurance Changes — https://www.ibc.ca/issues-and-advocacy/auto-insurance/ontario-auto-insurance-changes
- IBC / broker commentary on OPCF 49 (DCPD opt-out) — FSRA, BrokerLink, Ratehub 2024
- Canadian Underwriter — liability gap Jul 2026 — https://canadianunderwriter.ca/2026/07/09/new-liability-gap-under-ontario-auto-reform-prompts-some-drivers-to-raise-coverage-limits/
- OFA — Insurance coverage for Ontario farmers — https://ofa.on.ca/resources/insurance-coverage-for-ontario-farmers-a-summary-prepared-by-ofa/
- Ontario SCAP AgriInsurance operational document — https://www.ontario.ca/document/operational-document-related-sustainable-canadian-agricultural-partnership-federal

### Legal / commentary
- *ING v Miracle*, 2011 ONCA 321 — pollution exclusion
- *Hemlow Estate v Co-operators*, 2021 ONCA 908 — pollution exclusion pleadings
- Blaney McMurtry / RBS — absolute pollution exclusion commentary

### Facility Association [FACILITY ASSOCIATION]
- ON Manual Effective July 1, 2026 V2 (`1773411911187-ON_Manual_Effective_July_1_2026 V2.pdf`) — downloaded 2026-09-09 from facilityassociation.com
- ON Manual Bulletins 2025 V2 / 2026 — Rules 228, 239, 241, 242, 243 change summaries

### Internal
- `src/data/commercial-industries.ts`, `commercial-products-industry.ts`, `pilot-commercial-inline.ts`
- `src/data/coverage-explorer/interaction-manifest/routes.ts`
- `docs/qa-screenshots/product-content-audit-2026-09-07/audit-data.json`
- Benchmark: `docs/grade-c-batch-b-property-income-research-2026-09-09.md`

---

## READY FOR IMPLEMENTATION

**NO** — pending owner decisions §P (especially **Commercial Auto vs Trucking differentiation**, **Pollution breadth**, **Garage-liability naming**).

**BATCH C PHASE 1 RESEARCH COMPLETE — STOP FOR OWNER REVIEW**
