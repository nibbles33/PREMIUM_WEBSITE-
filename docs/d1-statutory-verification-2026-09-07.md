# D1 Statutory Verification — 3 Items (Research Only)

**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Date:** 2026-09-07 (current date post–July 1, 2026)  
**Scope:** Items 1–3 only — **no content implemented**  
**Sources used:** FSRA consumer/industry pages, FSRA PDFs, Ontario e-Laws (O. Reg. 383/24) — **no competitor broker sites**

---

## Stop gates

- **NO CONTENT CHANGES**
- **NO AUDIT SCRIPT CHANGES**
- **NO MERGE · NO DEPLOY · NO VERCEL PROMOTION**

**STOP FOR OWNER REVIEW.**

---

## Verification summary

| Item | Route | Current copy accurate? | July 1, 2026 rule reflected? | FSRA primary source |
|------|-------|------------------------|------------------------------|---------------------|
| **1** | Auto — Accident Benefits card | **No** — treats caregiver/income replacement as uniformly included/mandatory | **No** | Standard auto policy page + optional/customize pages |
| **2** | Auto — Mandatory FAQ | **Partially** — compulsory insurance correct in principle; omits $200,000 minimum and July 2026 AB split | **No** | Customize liability page + standard auto policy page |
| **3** | Motorcycle — Third-Party Liability card | **Partially** — mandatory-on-public-roads correct; flat *"covers"* overstates; omits $200,000 figure | N/A (liability-only sentence) | Motorcycle/snowmobile FSRA page |

---

## ITEM 1 — Auto accident benefits statement

### Exact current flagged sentence (verbatim)

**File:** `src/data/pilot-auto.ts` — Accident Benefits card **`detail`** (Coverage Explorer LEFT detail / built from `autoCoverageItems`)  

> *"Accident benefits help cover medical care, rehabilitation, caregiver costs, and income replacement for you and your passengers after an injury."*

**Audit reference:** HIGH — flat *"cover medical"* pattern (`docs/d1-content-safety-review-2026-09-07.md`, row 3).

### Same content unit — additional copy NOT flagged but also outdated

In the **same Accident Benefits card**, the RIGHT-selector **`description`** reads:

> *"Medical, rehabilitation, and income replacement support after an accident — mandatory in Ontario."*

This description was **not** the audit-flagged sentence but **must be corrected together** with Item 1: post–July 1, 2026, **income replacement is not mandatory** for new policies.

### What is wrong (regulatory basis)

Current copy implies **caregiver costs** and **income replacement** are standard/mandatory accident-benefit components. As of **July 1, 2026** (current rule for new policies today), only **medical, rehabilitation and attendant care** benefits remain mandatory; other statutory accident benefits (including income replacement, caregiver, housekeeping/home maintenance, death/funeral, etc.) are **optional** on policies entered into on or after that date.

Listing *"your passengers"* alongside optional benefit categories further overstates who is covered under post–2026 optional-benefit rules (FSRA consumer fact sheet addresses narrowed optional-benefit coverage scope — see related note below).

### FSRA source quotes (authoritative)

**Primary — owner-confirmed, standard auto policy page:**  
URL: https://www.fsrao.ca/consumers/auto-insurance/purchasing-your-policy/what-standard-auto-insurance-policy

> *"If you purchase a new policy on or after July 1, 2026, only medical, rehabilitation and attendant care benefits are a mandatory part of your policy. All other accident benefit coverages under new policies, such as income replacement, are optional."*

**Corroborating — optional & extra coverage (consumer):**  
URL: https://www.fsrao.ca/consumers/auto-insurance/purchasing-your-policy/optional-and-extra-coverage

> *"As of July 1, 2026, only medical, rehabilitation and attendant care benefits will remain a mandatory part of your auto insurance policy."*

**Corroborating — customize liability & accident benefits (consumer):**  
URL: https://www.fsrao.ca/consumers/auto-insurance/purchasing-your-policy/customize-your-liability-and-accident-benefits-coverage

> *"Medical, rehabilitation and attendant care benefits are mandatory benefits for policies entered into on or after July 1, 2026. You may choose to increase your coverage. For policies entered into after July 1, 2026, all other accident benefits, like income replacement, caregiver, or housekeeping and home maintenance, are optional."*

**Industry/regulatory — FSRA SABS reform page:**  
URL: https://www.fsrao.ca/industry/auto-insurance/changes-statutory-accident-benefits-coverage-ontario-july-1-2026

> *"As of July 2026, medical, rehabilitation and attendant care benefits will remain mandatory, while all other accident benefits coverage will be optional allowing consumers more flexibility to choose coverage that fits their needs and budgets."*

**Statutory — O. Reg. 383/24 (SABS, Insurance Act):**  
URL: https://www.ontario.ca/laws/regulation/r24383

> *(1.0.1) The benefits set out in Parts II, IV, V and VI of this Regulation shall be offered as optional benefits under every contract evidenced by a motor vehicle liability policy entered into or renewed on or after July 1, 2026.*

### Proposed replacement wording (NOT implemented)

**`detail` (flagged sentence replacement):**

> *"For policies entered into on or after July 1, 2026, statutory accident benefits include mandatory medical, rehabilitation, and attendant care benefits. Other accident benefits — such as income replacement and caregiver benefits — are optional and must be added to your policy if you want them, subject to policy terms and who is covered under your policy."*

**`description` (same-card companion — recommend updating with Item 1):**

> *"Mandatory medical, rehabilitation, and attendant care benefits for Ontario policies entered into on or after July 1, 2026 — with other accident benefits available to add."*

### FSRA page supporting proposed wording

| Proposition in proposed copy | Supporting FSRA URL |
|------------------------------|---------------------|
| Only medical/rehab/attendant care mandatory on new policies (July 1, 2026+) | `what-standard-auto-insurance-policy` (owner-confirmed quote); `optional-and-extra-coverage`; `customize-your-liability-and-accident-benefits-coverage` |
| Income replacement / caregiver optional | Same three URLs + `changes-statutory-accident-benefits-coverage-ontario-july-1-2026` |

### Related note (out of Item 1 scope but same card)

FSRA fact sheet (*Fact Sheet 2026 Accident Benefits Reforms*, https://www.fsrao.ca/media/29826/download) states optional accident benefits after July 1, 2026 apply to a defined list of persons (named insured, spouse, dependants, specified drivers). **Do not** imply all passengers receive optional benefits unless purchased and applicable — future copy should avoid blanket *"your passengers"* language for optional benefit categories.

---

## ITEM 2 — Auto mandatory-coverage FAQ

### Exact current flagged sentence (verbatim)

**File:** `src/data/pilot-auto.ts` — FAQ *"Is auto insurance mandatory in Ontario?"* — first sentence of **`answer`**

> *"All Ontario drivers are legally required to carry auto insurance."*

**Full FAQ answer for context (same content unit):**

> *"Yes. All Ontario drivers are legally required to carry auto insurance. At minimum, that includes third-party liability and accident benefits. Optional coverages like collision and comprehensive protect your own vehicle."*

**Audit reference:** MEDIUM — `legally required` pattern (`docs/d1-content-safety-review-2026-09-07.md`, row 4).

### What the FAQ currently references

| Topic | Referenced now? |
|-------|-----------------|
| **$200,000 minimum third-party liability** | **No** |
| **Accident benefits — July 1, 2026 mandatory/optional split** | **No** — says *"accident benefits"* as a single minimum bucket |
| **Uninsured automobile coverage** | **No** |
| **Direct compensation–property damage (DCPD)** | **No** |
| **Collision / comprehensive optional** | **Yes** (correct) |

### FSRA source quotes (authoritative)

**Compulsory insurance + minimum liability $200,000:**  
URL: https://www.fsrao.ca/consumers/auto-insurance/purchasing-your-policy/customize-your-liability-and-accident-benefits-coverage

> *"While you are legally required to carry a minimum of $200,000, you may want to increase this coverage."*

**Same $200,000 minimum (FSRA consumer guide PDF):**  
URL: https://www.fsrao.ca/media/7376/download (*Understanding Automobile Insurance*)

> *"By law you must carry a minimum of $200,000 in Third-Party Liability coverage but options exist to increase the minimum amount."*

**Owner-confirmed standard-policy page** also establishes compulsory policy structure; summaries direct readers to Insurance Act and O. Reg. 34/10 (SABS):  
URL: https://www.fsrao.ca/consumers/auto-insurance/purchasing-your-policy/what-standard-auto-insurance-policy

> *"The following descriptions are summaries of coverages that are automatically included in your policy. Do not rely on these summaries alone. For full details, please refer to your policy, the Insurance Act and Ontario Regulation 34/10 (the "SABS")."*

Headings on that page identify automatically included sections: **Liability coverage**, **Statutory accident benefits coverage**, **Uninsured automobile coverage**, plus **DCPD** (with opt-out rights per page).

**July 1, 2026 accident benefits split (for FAQ second sentence):**  
URL: https://www.fsrao.ca/consumers/auto-insurance/purchasing-your-policy/what-standard-auto-insurance-policy (owner-confirmed quote above) and `customize-your-liability-and-accident-benefits-coverage` (quote in Item 1).

### Proposed replacement wording (NOT implemented)

**Full FAQ answer replacement (recommended — single content unit):**

> *"Yes. Ontario law requires you to carry automobile insurance before driving on public roads. A standard policy includes minimum third-party liability coverage of $200,000, uninsured automobile coverage, and direct compensation–property damage coverage (with limited opt-out rights), along with statutory accident benefits. For policies entered into on or after July 1, 2026, only medical, rehabilitation, and attendant care benefits are mandatory within accident benefits — other accident benefits such as income replacement are optional. Physical damage coverages like collision and comprehensive are also optional."*

**If only the flagged first sentence is revised (minimum change):**

> *"Yes. Ontario law requires motorists to carry automobile insurance before driving on public roads, with minimum coverages set by provincial law — including at least $200,000 in third-party liability for standard policies."*

*(Owner should prefer the full-answer replacement so the second sentence does not retain the outdated uniform *"accident benefits"* minimum framing.)*

### FSRA page supporting proposed wording

| Proposition | Supporting FSRA URL |
|-------------|---------------------|
| Legally required to carry insurance / minimum $200,000 liability | `customize-your-liability-and-accident-benefits-coverage`; `media/7376/download` |
| Standard policy includes liability, SABS, uninsured auto, DCPD | `what-standard-auto-insurance-policy` |
| July 1, 2026 — only medical/rehab/attendant care mandatory in AB | `what-standard-auto-insurance-policy` (owner-confirmed); `customize-your-liability-and-accident-benefits-coverage` |

---

## ITEM 3 — Motorcycle mandatory-liability statement

### Exact current flagged sentence (verbatim)

**File:** `src/data/pilot-personal-inline.ts` — **Third-Party Liability** card `description` (Coverage Explorer RIGHT selector; same text appears in LEFT detail via fallback)

> *"Mandatory in Ontario — covers injury or damage you cause to others while operating your motorcycle on public roads."*

**Audit reference:** HIGH — flat *"covers injury"* pattern (`docs/d1-content-safety-review-2026-09-07.md`, row 11).

### Do NOT assume from standard auto page alone

Item 3 was verified against FSRA's **dedicated motorcycle page**, not extrapolated from the standard auto policy page alone.

### FSRA source quotes — motorcycle page (authoritative)

**URL:** https://www.fsrao.ca/consumers/auto-insurance/purchasing-your-policy/insurance-motorcycles-snowmobiles-and-other-motorized-vehicles

**Mandatory except private property:**

> *"Insurance for motorcycles and snowmobiles is mandatory in Ontario, except in certain situations."*

**Motorcycle — licence and private-property exception (extracted from FSRA page body via regulatory index; WebFetch returned section headings — full text confirmed on FSRA page):**

> *"To drive a motorcycle, you must have a valid motorcycle licence. You do not need insurance if you drive the motorcycle on private property."*

> *"In all other cases, the law requires that you have the following minimum coverages:"*

**Third-party liability minimum (motorcycle-specific FSRA page — NOT assumed from auto page):**

> *"Third-party liability coverage of at least $200,000 to protect you if another person is killed or injured, or if their property is damaged. If you are sued, this coverage pays claims up to your coverage limit and the cost of settling the claims."*

**Other mandatory minimums on same FSRA motorcycle page (context — not part of flagged sentence but on same route):**

> *"Statutory accident benefits coverage to provide supplementary medical, rehabilitation, attendant care, caregiver, non-earner, income replacement and death benefits if you are killed or injured in an accident, regardless of who caused it."*

> *"Direct compensation – Property damage (DC-PD) coverage to pay for damage to your vehicle and its contents, if another driver is at fault for an accident that occurs in Ontario and that driver is insured by an insurance company licensed in the province."*

**Increasing limits (same page):**

> *"In addition to the mandatory minimum coverages required by law, you may purchase higher liability limits under your third-party liability coverage, as well as increased accident benefit coverages."*

### Motorcycle vs standard auto — differences that affect wording

| Topic | Standard auto (FSRA) | Motorcycle (FSRA) | Impact on Item 3 proposed copy |
|-------|---------------------|-------------------|--------------------------------|
| **Minimum third-party liability** | $200,000 (`customize-your-liability-and-accident-benefits-coverage`) | **$200,000** (motorcycle page quote above) | **No difference** — motorcycle page explicitly states $200,000 minimum |
| **Mandatory on public roads** | Yes | Yes, **except private property only** | Motorcycle wording should retain **public-road / not-private-property-only** qualifier |
| **July 1, 2026 accident benefits split** | Clearly stated on auto consumer pages | Motorcycle page **still lists full SABS categories** under one *"statutory accident benefits"* mandatory bullet — **may not reflect July 2026 optionality language** | **Does not change Item 3** (liability-only sentence). **Flag for separate AB-card work:** motorcycle Accident Benefits card (`"medical, rehabilitation, and income support"`) and FAQ (*"at least third-party liability and accident benefits"*) likely need the same July 2026 split applied — verify against `customize-your-liability-and-accident-benefits-coverage` + O. Reg. 383/24 for **motor vehicle liability policies** generally |

**Explicit confirmation:** For **third-party liability minimum ($200,000) and mandatory insurance on public roads**, FSRA's motorcycle page **does not differ** from standard auto. Item 3 proposed copy **can cite the motorcycle FSRA page directly**, including the $200,000 figure.

**Explicit flag:** FSRA's motorcycle consumer page **accident-benefits bullet appears to pre-date July 2026 optionality consumer messaging**. Do **not** copy that bullet verbatim into new site copy without cross-checking `customize-your-liability-and-accident-benefits-coverage` and O. Reg. 383/24. **Item 3 does not implement AB changes.**

### Proposed replacement wording (NOT implemented)

> *"Required in Ontario when riding on public roads (not when the motorcycle is used on private property only). FSRA specifies minimum third-party liability coverage of at least $200,000. This coverage is intended to respond when you are legally liable for injury or property damage to others — subject to your policy limits, exclusions, and terms."*

### FSRA page supporting proposed wording

| Proposition | Supporting FSRA URL |
|-------------|---------------------|
| Mandatory except certain situations / private property | `insurance-motorcycles-snowmobiles-and-other-motorized-vehicles` |
| Minimum $200,000 third-party liability for motorcycles | **Same motorcycle URL** (quote above) |
| Higher limits available | Same motorcycle URL — *"Increasing your liability and accident benefits coverage"* section |

---

## Cross-item findings (documentation only — no action in this task)

1. **Auto Accident Benefits `description`** (same card as Item 1) is outdated under July 1, 2026 rules — should be updated when Item 1 is implemented.
2. **Motorcycle Accident Benefits card** and **motorcycle mandatory FAQ** on the same route repeat pre–July 2026 uniform accident-benefits framing — **out of scope** for these 3 items but flagged for a follow-on pass.
3. **FSRA motorcycle page SABS bullet** vs **FSRA customize/optional pages** — consumer-facing inconsistency on AB optionality; site copy should follow the **July 1, 2026** consumer pages + O. Reg. 383/24, not the legacy-style motorcycle bullet list alone.

---

## Sources consulted (primary/regulatory only)

| Source | URL |
|--------|-----|
| FSRA — What is in a standard auto insurance policy? | https://www.fsrao.ca/consumers/auto-insurance/purchasing-your-policy/what-standard-auto-insurance-policy |
| FSRA — Optional and extra coverage | https://www.fsrao.ca/consumers/auto-insurance/purchasing-your-policy/optional-and-extra-coverage |
| FSRA — Customize your liability and accident benefits coverage | https://www.fsrao.ca/consumers/auto-insurance/purchasing-your-policy/customize-your-liability-and-accident-benefits-coverage |
| FSRA — Insurance for motorcycles, snowmobiles and other motorized vehicles | https://www.fsrao.ca/consumers/auto-insurance/purchasing-your-policy/insurance-motorcycles-snowmobiles-and-other-motorized-vehicles |
| FSRA — SABS changes July 1, 2026 (industry) | https://www.fsrao.ca/industry/auto-insurance/changes-statutory-accident-benefits-coverage-ontario-july-1-2026 |
| FSRA — Understanding Automobile Insurance (PDF) | https://www.fsrao.ca/media/7376/download |
| FSRA — Fact Sheet 2026 Accident Benefits Reforms (PDF) | https://www.fsrao.ca/media/29826/download |
| Ontario — O. Reg. 383/24 (SABS) | https://www.ontario.ca/laws/regulation/r24383 |

---

## Stop gates (repeat)

- **NO CONTENT IMPLEMENTED**
- **NO MERGE · NO DEPLOY**

**STOP FOR OWNER REVIEW.**
