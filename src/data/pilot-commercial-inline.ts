"use client";

import {
  Banknote,
  Beef,
  Briefcase,
  Building2,
  FileCheck,
  Gavel,
  Package,
  ScrollText,
  Shield,
  Tractor,
  Warehouse,
  Wrench,
  Zap,
} from "lucide-react";
import {
  COMMERCIAL_ACCENT,
  QUOTE_BUSINESS,
  commercialBrokerCopy,
  commercialHubFaqs,
} from "@/data/commercial-industries";
import {
  buildPilotProductConfig,
  relatedLinksToProducts,
} from "@/lib/buildPilotProductConfig";
import { commercialBrokerSteps } from "@/data/pilot-product-shared";
import type { PilotProductPageConfig } from "@/types/pilot-product";

export const pilotCommercialInlineConfigs: Record<string, PilotProductPageConfig> = {
  "commercial-insurance": buildPilotProductConfig({
    layout: "commercial-hub",
    slug: "commercial-insurance",
    metaTitle: "Commercial Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Commercial insurance for Windsor-Essex manufacturers, trucking fleets, contractors, restaurants, and more — industry-specific coverage through an independent broker.",
    eyebrow: "Commercial Insurance",
    headline: "Commercial insurance, built for your industry",
    heroLead:
      "Windsor-Essex runs on manufacturing, trucking, and trades. We build coverage around the risks specific to your industry — not a generic business policy.",
    photographySlug: "commercial-insurance",
    accentColor: COMMERCIAL_ACCENT,
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Commercial Quote",
    trustStatement: commercialBrokerCopy,
    coverageIntro: "",
    coverageItems: [],
    brokerSteps: commercialBrokerSteps,
    relatedProducts: [],
    faqTitle: "Commercial insurance FAQ",
    faqIntro: "Straight answers to common commercial insurance questions.",
    faqItems: commercialHubFaqs,
    ctaHeading: "Ready to protect your business?",
    ctaSubhead:
      "Tell us about your operations — we'll compare commercial markets and explain what fits.",
    serviceName: "Commercial Insurance",
  }),
  "bonding-insurance": buildPilotProductConfig({
    slug: "bonding-insurance",
    metaTitle: "Surety Bonds in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Surety bonds through an independent Windsor-Essex broker — bid bonds, performance bonds, labour and material payment bonds, and licence and permit bonds.",
    eyebrow: "Surety Bonds",
    headline: "Surety Bonds",
    heroLead:
      "Surety bonding is structurally different from conventional insurance. A surety bond is a three-party obligation among the principal (usually the contractor), the obligee (the project owner or authority that requires the bond), and the surety. The bond backs the principal's contractual or licence obligation to the obligee — it does not primarily protect the contractor the way a liability policy protects an insured. If the surety pays or arranges completion after a default, the principal typically remains responsible under an indemnity agreement. Common construction instruments include bid bonds, performance bonds, and labour and material payment bonds; licence and permit bonds serve separate regulatory purposes. Employee dishonesty or crime coverage is insurance — not a construction surety bond — and is addressed on a separate product page. Premium Insurance Brokers can help Windsor-Essex contractors navigate prequalification, capacity, and tender timelines.",
    photographySlug: "bonding-insurance",
    accentColor: "#5B6B7A",
    quoteHref: "/get-a-quote?type=business",
    quoteLabel: "Get a Surety Bond Quote",
    trustStatement:
      "For Windsor–Essex contractors and vendors who must post surety for tenders, contracts, or licences — reviewed through an independent broker who can explain principal, obligee, and surety roles in plain language.",
    considerationsPresentation: "expandable",
    coverageHeading: "Common surety bonds",
    coverageIntro:
      "Surety bonds back obligations to an obligee — bid security, performance after award, payment to certain subcontractors and suppliers, and licence or permit compliance where required.",
    coverageItems: [
      {
        title: "Bid Bonds",
        shortLabel: "Bid Bond",
        description:
          "May be required with a tender — provides assurance to the project owner that a selected bidder will enter the contract and furnish required bonds if awarded, subject to bond terms.",
        detailTitle: "Tender security is about commitment — not project completion",
        detailDescription:
          "Bid bonds and consents of surety are tender-phase instruments. They protect the owner if the low bidder withdraws — the surety's obligation is defined in the bond, and the principal typically indemnifies the surety for amounts paid. Bid bonds are generally tender or contractual requirements — not a universal statutory rule for every Ontario construction project.",
        icon: Gavel,
      },
      {
        title: "Performance Bonds",
        shortLabel: "Performance",
        description:
          "A three-party surety bond that may respond if the contractor defaults on performance obligations under the bonded contract — subject to bond conditions and surety remedies.",
        detailTitle: "Default triggers a process — not an automatic insurance payout",
        detailDescription:
          "Performance bonds protect the obligee (project owner), not the contractor. If a default is declared, the surety may arrange completion, tender for a replacement contractor, or other remedies per the bond — then seek recovery from the principal under indemnity.",
        icon: FileCheck,
      },
      {
        title: "Labour & Material Payment Bonds",
        shortLabel: "Payment",
        description:
          "May help ensure certain direct subcontractors and suppliers on the bonded project receive payment for approved work and materials — subject to bond form, notice periods, and claim documentation.",
        detailTitle: "Subs and suppliers claim here — not on the performance bond",
        detailDescription:
          "Payment bonds address upstream payment failure on the bonded job. Claimants generally must follow bond notice and documentation requirements. This process is separate from the owner's performance bond claim path.",
        icon: Banknote,
      },
      {
        title: "Licence & Permit Bonds",
        shortLabel: "Licence",
        description:
          "May satisfy licensing or permit bonding requirements for regulated trades or municipal licences — where required by the authority having jurisdiction.",
        detailTitle: "Regulatory bonds are not project performance bonds",
        detailDescription:
          "Licence and permit bonds guarantee compliance with licence obligations to a government or municipal obligee — different purpose, amount, and underwriting from construction performance programs.",
        icon: ScrollText,
      },
    ],
    considerations: [
      {
        title: "Surety is not insurance — three parties and indemnity",
        description:
          "Insurance transfers defined risk from an insured to an insurer. A surety bond guarantees the principal's obligation to an obligee. The surety may step in after a default, then look to the principal (and often personal or corporate indemnitors) for reimbursement. Do not treat a performance bond as coverage that protects the contractor like a CGL policy.",
      },
      {
        title: "Prequalification, financial strength, and bonding capacity",
        description:
          "Sureties typically review financial statements, working capital, net worth, experience on similar work, backlog or work program, and prior bonding history before setting single-job and aggregate program capacity. Criteria are underwriting judgments — not universal formulas published for every contractor.",
      },
      {
        title: "Ontario public contracts — performance and payment bonds",
        description:
          "Under Ontario's Construction Act, certain public contracts with a contract price of $500,000 or more require the contractor to provide both a performance bond and a labour and material payment bond on entering the contract. The general regulatory minimum coverage limit for each bond is 50 per cent of the contract price — owners may require higher amounts. This regime applies to public contracts as defined in the Act and regulations — not to every private construction project in Ontario. Bid bonds are typically set by tender documents, not by that statutory performance-and-payment rule.",
      },
      {
        title: "Bid bonds vs consent of surety at tender",
        description:
          "A bid bond accompanies many tenders as security that the bidder will enter the contract and furnish required bonds if awarded. A consent of surety is a related tender-phase assurance that the surety is prepared to issue those bonds. Percentages and forms follow the tender — not a single Ontario-wide statutory bid-bond amount.",
      },
      {
        title: "Performance bond default process",
        description:
          "When an obligee declares a contractor default under a performance bond, the surety evaluates options under the bond wording — which may include arranging completion, tendering for a replacement contractor, or other remedies. Remedies and timelines are bond-specific; this is not an automatic insurance payout to the principal.",
      },
      {
        title: "Payment bond claims for direct subcontractors and suppliers",
        description:
          "Labour and material payment bonds generally address claims by certain direct subcontractors and suppliers on the bonded project. Notice periods, documentation, and who qualifies as a claimant depend on the bond form (including Ontario prescribed forms on applicable public contracts). Sub-sub tiers may not have the same rights under every form.",
      },
      {
        title: "Private vs public bond forms",
        description:
          "Ontario public contracts within the Construction Act bonding regime typically use prescribed performance and payment bond forms. Private and CCDC projects often use industry standard bond forms (such as CCDC bid, performance, and payment forms). Always match the form the owner actually requires in the tender or contract.",
      },
      {
        title: "Licence bonds vs project bonds",
        description:
          "Licence and permit bonds serve a regulatory or municipal obligee and are underwritten for licence compliance — separate from bid, performance, and payment bonds on a construction contract. Capacity used for licence bonds may interact with your overall surety program; ask how your surety treats them together.",
      },
    ],
    brokerSteps: commercialBrokerSteps,
    relatedProducts: relatedLinksToProducts([
      { label: "Contractors Insurance", href: "/contractors-insurance/" },
      { label: "Builder's Risk", href: "/builders-risk-insurance/" },
      { label: "Crime & Fidelity", href: "/crime-fidelity-insurance/" },
    ]),
    faqTitle: "Surety bonds FAQ",
    faqIntro: "Straight answers to common surety bond questions.",
    faqItems: [
      {
        question: "Is a surety bond the same as insurance?",
        answer:
          "No. Conventional insurance protects an insured against covered losses under a two-party policy. A surety bond is a three-party instrument among principal, obligee, and surety that backs the principal's obligation to the obligee. If the surety pays or arranges completion, the principal typically remains liable under indemnity. Employee dishonesty (fidelity) insurance is a separate insurance product — not a construction surety bond.",
      },
      {
        question: "Who does a construction surety bond protect?",
        answer:
          "Primarily the obligee — usually the project owner or the authority requiring the bond. A labour and material payment bond may also allow certain direct subcontractors and suppliers to claim for unpaid work or materials on the bonded project, subject to the bond form. The bond does not primarily protect the contractor/principal like a liability policy.",
      },
      {
        question: "When are performance and payment bonds required on Ontario public projects?",
        answer:
          "Under Ontario's Construction Act, certain public contracts with a contract price of $500,000 or more require both a performance bond and a labour and material payment bond when the contractor enters the contract. The general regulatory minimum coverage for each is 50 per cent of the contract price. This does not mean every private Ontario construction project is bonded by statute — private requirements follow the contract and tender.",
      },
      {
        question: "What information does a surety review for bonding capacity?",
        answer:
          "Sureties commonly review company (and often personal) financial statements, working capital and net worth, experience, backlog or work program, prior bonding history, and details of the contract or licence. They may set single-job and aggregate program limits. Exact documentation varies by surety and bond size — it is underwriting, not a published universal checklist.",
      },
      {
        question: "What are common construction bonds, and is a bid bond always required?",
        answer:
          "Common construction surety instruments include bid bonds, performance bonds, and labour and material payment bonds. Licence and permit bonds address separate regulatory requirements. Bid bonds are typically required by tender documents where the owner wants tender security — they are not the same as the Construction Act's statutory performance-and-payment bond rule for applicable public contracts.",
      },
    ],
    ctaHeading: "Need surety for a tender or contract?",
    ctaSubhead:
      "Share the tender or contract documents, bond amounts, and your company financials — we will help arrange the right surety instruments.",
    serviceName: "Surety Bonds",
  }),
  "farm-insurance": buildPilotProductConfig({
    slug: "farm-insurance",
    metaTitle: "Farm Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Farm insurance through an independent Windsor-Essex broker — farm property, machinery, farm liability, and livestock coverage for working Essex County farms, distinct from greenhouse agribusiness and government crop programs.",
    eyebrow: "Farm Insurance",
    headline: "Farm Insurance",
    heroLead:
      "Farm insurance packages address working agricultural property in Essex County — barns, machinery, farm liability, and livestock — where purchased and subject to causes of loss, limits, and endorsements on your policy. That is different from a standard homeowner policy for a rural residence, from greenhouse and controlled-environment agribusiness on a separate route, and from Agricorp Production Insurance or other government AgriInsurance programs for crop yield loss. Licensed trucks and passenger vehicles used on public roads still require Ontario automobile insurance. Premium Insurance Brokers can help family and commercial farms compare private farm property and liability programs for how you actually farm.",
    photographySlug: "farm-insurance",
    accentColor: "#7A8B5C",
    quoteHref: "/get-a-quote?type=farm",
    quoteLabel: "Get a Farm Quote",
    trustStatement:
      "For Windsor–Essex working farms — family, mixed, crop, and livestock operations — reviewed through an independent broker who can coordinate farm property, liability, machinery, and livestock coverage without duplicating greenhouse agribusiness or government crop programs.",
    considerationsPresentation: "expandable",
    coverageIntro:
      "Farm insurance is organized here by farm property and buildings, machinery and equipment, farm liability, and livestock — because each insuring agreement uses different perils, schedules, and limits on most Ontario farm packages.",
    coverageItems: [
      {
        id: "farm-property-coverage",
        title: "Farm Property & Buildings",
        shortLabel: "Property",
        description:
          "May help address direct physical loss or damage to farm dwellings where scheduled, barns, outbuildings, silos, and other farm structures — subject to named or broad-form perils, replacement cost or actual cash value basis, limits, deductibles, and policy terms.",
        detailTitle: "Barns and outbuildings are farm assets — not ordinary home attachments",
        detailDescription:
          "Working farms carry values in barns, machine sheds, grain storage, and fencing that exceed what a typical homeowner policy contemplates. Farm property sections schedule structures and may use different peril packages for dwellings versus outbuildings. Vacant barns, seasonal occupancy, and wood-frame construction affect underwriting. Accurate building values support proper limits after expansions or new construction — underinsurance reduces partial-loss payments on many forms.",
        icon: Warehouse,
      },
      {
        id: "equipment-machinery",
        title: "Farm Machinery & Equipment",
        shortLabel: "Equipment",
        description:
          "Tractors, combines, implements, and portable farm equipment — where scheduled — may be insured against covered perils subject to location limits, in-transit extensions, and deductibles defined in the policy.",
        detailTitle: "Field equipment and licensed road vehicles follow different rules",
        detailDescription:
          "Unlicensed tractors and implements used on the farm are typically scheduled on the farm property policy. Pickup trucks, grain trucks, and other licensed vehicles driven on public roads require Ontario commercial or personal automobile insurance — not automatic inclusion as farm machinery. Custom farming off your premises, equipment loaned to neighbours, and peak-season values should be disclosed so transit and off-farm use extensions match reality.",
        icon: Tractor,
      },
      {
        id: "farm-liability",
        title: "Farm Liability",
        shortLabel: "Liability",
        description:
          "Farm liability coverage may address certain third-party bodily injury or property-damage claims arising from farming operations and premises — subject to policy definitions, exclusions for employers liability, and endorsements for direct sales or agritourism where purchased.",
        detailTitle: "Visitors, custom work, and roadside stands change liability exposure",
        detailDescription:
          "Farm liability forms differ from generic commercial general liability labels — they are tailored to agricultural operations but still contain exclusions. Livestock escaping onto roads, custom spraying for neighbours, farm-stand sales, and pick-your-own activities may need endorsements or separate limits. Products liability for produce sold off-farm, pollution from fuel tanks, and agritourism events should be flagged at application — not assumed covered by a base farm liability limit.",
        icon: Shield,
      },
      {
        id: "livestock-coverage",
        title: "Livestock Coverage",
        shortLabel: "Livestock",
        description:
          "Livestock may be insured against specified perils such as fire, lightning, windstorm, or collision — or through optional mortality programs where available — subject to scheduling, valuation methods, and disease exclusions on the policy.",
        detailTitle: "Herd loss can mean lost income — not just lost animals",
        detailDescription:
          "Dairy, beef, swine, and poultry operations may schedule livestock values separately from barn coverage. Named-peril livestock sections differ from optional mortality or disease programs that may be available in some markets. Government programs and veterinary disease management are separate from private livestock insurance — confirm what your policy actually covers before assuming disease or epidemic losses are insured.",
        icon: Beef,
      },
    ],
    considerations: [
      {
        title: "Acreage, operation type, and mixed farming",
        description:
          "Crop-only, livestock-only, and mixed farms present different property and liability profiles. Insurers review total acreage, farming income sources, and whether operations are full-time or hobby scale. Accurate descriptions support eligibility in farm markets versus standard commercial programs.",
      },
      {
        title: "Buildings, construction, and seasonal use",
        description:
          "Barn age, construction type, heating sources, and seasonal vacancy affect property underwriting. Detached outbuildings need scheduled values; assuming one blanket limit covers every structure without review can leave gaps after a partial loss.",
      },
      {
        title: "Machinery values and seasonal peaks",
        description:
          "Equipment lists should reflect current market values for tractors, combines, and attachments — especially before planting and harvest when more machinery is active. Peak-season inventory of fuel, chemicals, and feed may need separate contents limits.",
      },
      {
        title: "Livestock type and valuation",
        description:
          "Schedule herds by type and value; update after purchases or sales. Optional mortality coverage differs from named-peril livestock sections — disease and epidemic exclusions are common. Verify valuation basis (actual cash value versus agreed value) at renewal.",
      },
      {
        title: "Direct sales, farm stands, and agritourism",
        description:
          "Roadside stands, pick-your-own, corn mazes, and farm tours bring the public onto the farm — exposures that base farm liability may restrict. Endorsements or separate liability limits may be required; flag revenue from public-facing activities when quoting.",
      },
      {
        title: "Licensed farm vehicles vs field machinery",
        description:
          "Automobile insurance under Ontario's compulsory framework applies to licensed vehicles on public roads. Farm machinery in the field is typically property coverage. Coordinate automobile policies for farm trucks with your farm package — do not assume one policy covers both without confirmation.",
      },
      {
        title: "Pollution and fuel storage",
        description:
          "Bulk fuel, propane, and chemical storage create environmental exposure that farm liability may limit. See our pollution liability page when tanks or waste handling exceed base farm form comfort levels.",
      },
      {
        title: "Custom farming and contractor use",
        description:
          "Performing custom harvest, spraying, or trucking for neighbours extends equipment and liability beyond own-farm use. Disclose custom-work revenue and whether employees or subcontractors are used — certificates of insurance may be requested by customers.",
      },
    ],
    brokerSteps: commercialBrokerSteps,
    relatedProducts: relatedLinksToProducts([
      { label: "Greenhouse & Agribusiness", href: "/greenhouse-agribusiness-insurance/" },
      { label: "Commercial Auto", href: "/commercial-auto-insurance/" },
      { label: "Commercial Insurance Hub", href: "/commercial-insurance/" },
    ]),
    relatedIntro:
      "Greenhouse operations, farm trucks, and broader commercial coverage may need separate routes — explore related products from Premium.",
    faqTitle: "Farm insurance FAQ",
    faqIntro: "Straight answers to common farm insurance questions.",
    faqItems: [
      {
        question: "What does farm insurance cover?",
        answer:
          "Farm insurance packages typically combine farm property (dwellings where scheduled, barns, outbuildings), scheduled machinery and equipment, farm liability for operations and premises, and livestock coverage against specified perils where purchased — each subject to causes of loss, limits, deductibles, and endorsements on your policy. Not every farm program covers every item or peril automatically; optional extensions may address equipment breakdown, loss of farm income, or agritourism where available.",
      },
      {
        question: "Are barns and machinery insured on the same policy?",
        answer:
          "Most Ontario farm packages schedule buildings and machinery on one policy with separate limits and peril structures for each category — but the wording matters. Barns may be insured on a broad-form or named-peril basis while equipment uses its own deductibles and transit extensions. Licensed vehicles on roads generally need automobile insurance in addition to farm property scheduling for implements.",
      },
      {
        question: "What about livestock — is mortality covered?",
        answer:
          "Livestock is often insured against specified perils such as fire, lightning, windstorm, or collision on a scheduled basis. Separate mortality or disease programs may be available in some markets with different exclusions — government programs for disease control are not the same as private livestock insurance. Confirm perils, valuation, and epidemic exclusions with your broker.",
      },
      {
        question: "Are farm vehicles included in a farm policy?",
        answer:
          "Unlicensed farm machinery and implements used on the farm are typically scheduled on the farm property policy. Licensed trucks, passenger vehicles, and farm plates used on public roads require Ontario automobile insurance — commercial or personal depending on use — coordinated alongside your farm package. One farm policy does not replace compulsory automobile coverage for road vehicles.",
      },
      {
        question: "What information do I need for a farm quote?",
        answer:
          "Expect questions about farm type and acreage, building descriptions and values, equipment lists, livestock counts and values, farming and side-income activities (including farm stands or agritourism), custom farming, fuel storage, prior claims, and current coverage. If you participate in Agricorp Production Insurance or other programs, note those separately — they are government crop programs, not substitutes for private farm property insurance.",
      },
    ],
    ctaHeading: "Ready to cover your farm?",
    ctaSubhead:
      "Tell us about your buildings, equipment, livestock, and sales activities — we'll compare farm programs and explain what fits.",
    serviceName: "Farm Insurance",
  }),
  "greenhouse-agribusiness-insurance": buildPilotProductConfig({
    slug: "greenhouse-agribusiness-insurance",
    metaTitle:
      "Greenhouse & Agribusiness Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Greenhouse and agribusiness operations in Leamington, Essex County, and Windsor-Essex — reviewed through an independent broker.",
    eyebrow: "Greenhouse & Agribusiness",
    headline: "Greenhouse & Agribusiness Insurance",
    heroLead:
      "Greenhouse and agribusiness operations in Leamington, Essex County, and Windsor-Essex.",
    photographySlug: "greenhouse",
    accentColor: "#6B8F71",
    quoteHref: "/get-a-quote?type=business&industry=greenhouse",
    quoteLabel: "Get a Greenhouse Quote",
    trustStatement:
      "Greenhouse and agribusiness operations in Leamington, Essex County, and Windsor-Essex — reviewed through an independent broker.",
    coverageIntro:
      "Coverage areas commonly reviewed for greenhouse and agribusiness operations — what applies depends on your policy, insurer, and operation.",
    coverageItems: [
      {
        title: "Greenhouse Buildings & Structures",
        shortLabel: "Greenhouse Property",
        description:
          "Greenhouse structures and other insured buildings/property can represent a significant part of the operation's exposure. Coverage depends on the property insured, policy terms and selected coverages.",
        detailTitle: "Why greenhouse structures drive insurable values",
        detailDescription:
          "Glass bays, poly tunnels, and climate-controlled structures in Leamington and Essex County often represent a large share of total property values alongside tenant improvements and attached packing areas. Building types, construction, and total property values should be reviewed with your broker so limits and descriptions reflect the operation accurately — coverage depends on what is scheduled and how the policy defines insured property.",
        icon: Building2,
      },
      {
        title: "Equipment & Machinery",
        shortLabel: "Equipment",
        description:
          "Greenhouse operations may rely on heating, ventilation, irrigation and other specialized operational equipment. Coverage for equipment and machinery depends on the policy and coverages purchased.",
        detailTitle: "When heating and irrigation systems keep the operation running",
        detailDescription:
          "Greenhouse operations depend heavily on heating, ventilation, and irrigation — systems that are often central to daily production and may sit outside a basic property form's treatment of contents. Your broker should review how these assets are described and insured, especially where equipment values or specialized machinery endorsements apply.",
        icon: Wrench,
      },
      {
        title: "Business Property & Stock",
        shortLabel: "Stock & Property",
        description:
          "Consider business contents, supplies and eligible stock or property used in the operation. How particular property is insured varies by policy and insurer.",
        detailTitle: "How plants, supplies, and stock are treated on the policy",
        detailDescription:
          "Growing stock, plants, and seasonal inventory can be treated very differently from fixed equipment or building coverage — and should not be assumed to be included automatically. How particular property is insured varies by policy and insurer; this warrants a focused review rather than a generic contents limit.",
        icon: Package,
      },
      {
        title: "Business Interruption",
        shortLabel: "Interruption",
        description:
          "A covered property loss can also interrupt operations and affect business income. Business interruption coverage may respond to covered loss of income following an insured loss, subject to the policy terms, limits and coverage purchased.",
        detailTitle: "When a covered loss forces a shutdown",
        detailDescription:
          "A covered fire, equipment failure, or property loss can halt production during peak growing or shipping periods — when payroll, utilities, and lease costs may continue. Business interruption coverage may help with covered loss of income following an insured loss, subject to waiting periods, limits, and the policy terms purchased. Seasonal revenue patterns in Windsor–Essex operations can affect what limits make sense.",
        icon: Briefcase,
      },
      {
        title: "Commercial Liability",
        shortLabel: "Liability",
        description:
          "Greenhouse and agribusiness operations can have liability exposures arising from their premises and business activities. The appropriate liability protection depends on the nature and scale of the operation.",
        detailTitle: "Liability from premises, visitors, and daily operations",
        detailDescription:
          "Loading bays, customer pickup areas, contractor visits, and on-site activity create third-party injury or property-damage exposure distinct from crop or equipment losses. The appropriate liability protection depends on the nature and scale of the operation — limits and endorsements should reflect how the greenhouse actually interacts with staff, suppliers, and the public.",
        icon: Shield,
      },
      {
        title: "Equipment Breakdown",
        shortLabel: "Breakdown",
        description:
          "Heating, electrical, ventilation, irrigation and other critical systems can create significant equipment-breakdown exposure. Equipment breakdown coverage may be available where purchased and remains subject to policy terms and exclusions.",
        detailTitle: "Critical system failure during peak season",
        detailDescription:
          "A compressor, boiler, or irrigation controller failure can disrupt climate control and threaten crop viability — losses that base property coverage may treat differently from sudden mechanical or electrical breakdown. Equipment breakdown coverage may be available where purchased; triggers, sublimits, and exclusions require careful review because coverage depends on the policy, cause of loss, and endorsements in place.",
        icon: Zap,
      },
    ],
    considerations: [
      {
        title: "Greenhouse construction and total property values",
        description:
          "Building types, construction, and total property values should be reviewed with your broker so limits and descriptions reflect the operation accurately.",
      },
      {
        title: "Heating, ventilation, and irrigation systems",
        description:
          "Heating, ventilation, and irrigation systems are often central to greenhouse operations — your broker should review how these are described and insured.",
      },
      {
        title: "Dependence on utilities and critical equipment",
        description:
          "Operations that depend heavily on utilities and critical equipment may need careful review of how downtime and equipment failure are treated under the policy.",
      },
      {
        title: "Business interruption exposure",
        description:
          "The financial impact of a shutdown can vary by season and operation — business interruption limits and terms warrant a focused broker review.",
      },
      {
        title: "Treatment of plants, crops, and growing stock",
        description:
          "How plants, crops, and growing stock are treated can vary significantly by policy and insurer — this should be reviewed rather than assumed.",
      },
      {
        title: "Seasonal changes in values or operations",
        description:
          "Seasonal shifts in inventory, revenue, or operations may affect what should be reported and when limits need updating.",
      },
    ],
    brokerSteps: commercialBrokerSteps,
    relatedProducts: relatedLinksToProducts([
      { label: "Farm Insurance", href: "/farm-insurance/" },
      { label: "Commercial Insurance Hub", href: "/commercial-insurance/" },
    ]),
    relatedIntro:
      "One policy is rarely the whole picture. Explore other coverage from Premium.",
    faqTitle: "Greenhouse & agribusiness FAQ",
    faqIntro: "Straight answers to common questions.",
    faqItems: [
      {
        question: "What insurance does a greenhouse business need?",
        answer:
          "It depends on the operation. A greenhouse may have exposures involving buildings, specialized equipment, business property, liability, business interruption and other risks. Premium can review the operation and help identify the coverages that should be considered.",
      },
      {
        question: "Does greenhouse insurance cover plants or crops?",
        answer:
          "Coverage for plants, crops and growing stock can vary significantly by policy and insurer. It should not be assumed to be included automatically. We can review how your inventory is treated and identify available coverage options.",
      },
      {
        question: "What happens if heating or other critical equipment breaks down?",
        answer:
          "Greenhouses can depend heavily on heating, ventilation, irrigation and other systems. Equipment breakdown and resulting losses require careful review because coverage depends on the policy, cause of loss and endorsements purchased.",
      },
      {
        question: "Can business interruption coverage protect a greenhouse?",
        answer:
          "Business interruption coverage may help with covered loss of income following an insured loss, subject to the policy's terms, limits, waiting periods and coverage purchased. The appropriate limits should reflect the operation's actual financial exposure.",
      },
      {
        question: "Do you insure greenhouse operations in Leamington and Essex County?",
        answer:
          "Premium Insurance Brokers serves businesses throughout Windsor-Essex and can assist greenhouse and agribusiness operations with reviewing their commercial insurance needs.",
      },
    ],
    ctaHeading: "Ready to discuss your greenhouse operation?",
    ctaSubhead:
      "Tell us about your operation — a broker will compare options and explain what fits.",
    serviceName: "Greenhouse & Agribusiness Insurance",
  }),
};
