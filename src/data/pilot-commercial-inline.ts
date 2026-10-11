"use client";

import {
  Banknote,
  Beef,
  Briefcase,
  Building2,
  FileCheck,
  Gavel,
  Leaf,
  Package,
  ScrollText,
  Shield,
  Sprout,
  Tractor,
  Warehouse,
  Wrench,
  Zap,
} from "lucide-react";
import {
  AGRICORP_PRODUCTION_INSURANCE_URL,
  AGRICULTURE_ACCENT,
  QUOTE_FARM,
  agricultureRelatedExcept,
} from "@/data/agriculture";
import {
  COMMERCIAL_ACCENT,
  QUOTE_BUSINESS,
  commercialBrokerCopy,
  commercialHubCategories,
  commercialHubFaqs,
} from "@/data/commercial-industries";
import {
  buildPilotProductConfig,
  relatedLinksToProducts,
} from "@/lib/buildPilotProductConfig";
import { commercialBrokerSteps } from "@/data/pilot-product-shared";
import type { PilotProductPageConfig } from "@/types/pilot-product";

const commercialHubCoverageItems = commercialHubCategories.map((category) => ({
  id: category.label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, ""),
  title: category.label,
  shortLabel: category.label.split(" ")[0] ?? category.label,
  description: category.description,
  href: category.href,
  icon: category.icon,
}));

export const pilotCommercialInlineConfigs: Record<string, PilotProductPageConfig> = {
  "commercial-insurance": buildPilotProductConfig({
    layout: "commercial-hub",
    slug: "commercial-insurance",
    metaTitle: "Commercial Insurance in Windsor | Premium Insurance Brokers",
    metaDescription:
      "Commercial and business insurance for Windsor-Essex and Ontario operators. Explore industry coverage with an independent brokerage — then talk to a licensed broker.",
    eyebrow: "Commercial Insurance",
    headline: "Commercial insurance, built for your industry",
    heroLead:
      "Your Windsor–Essex commercial insurance starting point for businesses here and across Ontario — not a single bundled policy. Use the categories and industry links below to find routes that match how you operate, then talk to a broker about coverages your business may need.",
    heroSupporting:
      "Need a tighter small-business package first? Our small business insurance page goes deeper. Start here for orientation across the full commercial site — whether you operate in Windsor-Essex or elsewhere in Ontario.",
    photographySlug: "commercial-insurance",
    accentColor: COMMERCIAL_ACCENT,
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Commercial Quote",
    trustStatement: commercialBrokerCopy,
    coverageIntro:
      "Orientation only — each category links to a dedicated page. Not every business needs every line; programs are built from the policies you purchase.",
    coverageItems: commercialHubCoverageItems,
    considerations: [
      {
        title: "Start with your industry",
        description:
          "A machine shop, restaurant, fleet, and professional office are underwritten differently. Choose the industry route closest to your work first, then add specialty coverages only where contracts or exposures require them.",
      },
      {
        title: "Certificates and contract wording",
        description:
          "Landlords, GCs, and lenders often request certificates, additional insured status, or waiver wording. Those asks are reviewed against what your policies can actually provide — a certificate does not expand coverage.",
      },
      {
        title: "Keep personal and commercial separate",
        description:
          "Personal auto and home policies are not built for business use. Company vehicles, home-based production, or client work usually need a commercial program — mixing the two can leave gaps.",
      },
      {
        title: "Specialty coverages when base lines are not enough",
        description:
          "Pollution, product recall expense, crime, cyber, directors and officers, and surety bonding address exposures base liability or property may restrict. Follow specialty links when those topics are material — not every business needs them on day one.",
      },
    ],
    considerationsPresentation: "expandable",
    brokerSteps: commercialBrokerSteps,
    relatedProducts: relatedLinksToProducts([
      { label: "Small Business Insurance", href: "/small-business-insurance/" },
      { label: "Manufacturing Insurance", href: "/manufacturing-insurance/" },
      { label: "Product Recall", href: "/product-recall-insurance/" },
      { label: "Pollution Liability", href: "/pollution-liability-insurance/" },
      { label: "Crime & Fidelity", href: "/crime-fidelity-insurance/" },
      { label: "Directors & Officers", href: "/directors-officers-insurance/" },
      { label: "Cannabis Retail", href: "/cannabis-retail-insurance/" },
      { label: "Cannabis Producer", href: "/cannabis-producer-insurance/" },
    ]),
    relatedHeading: "Specialty & program routes",
    relatedIntro:
      "Explore specialty and program pages when core categories are not enough — without assuming one quote covers everything.",
    faqTitle: "Commercial insurance FAQ",
    faqIntro: "Short answers for Windsor–Essex business owners starting commercial coverage.",
    faqItems: commercialHubFaqs,
    ctaHeading: "Ready to review your business insurance?",
    ctaSubhead:
      "Tell us about your operations — we will compare commercial markets and explain what may fit, subject to policy terms.",
    serviceName: "Commercial Insurance",
  schemaKind: "commercial",
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
  schemaKind: "commercial",
  }),
  "farm-insurance": buildPilotProductConfig({
    slug: "farm-insurance",
    metaTitle: "Farm Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Farm insurance for Windsor-Essex and Essex County operations — farm property, machinery, liability, and livestock through an independent broker.",
    eyebrow: "Farm Insurance",
    headline: "Farm Insurance",
    heroLead:
      "Farm insurance packages address working agricultural property in Essex County — barns, machinery, farm liability, and livestock — where purchased and subject to causes of loss, limits, and endorsements on your policy. That is different from a standard homeowner policy for a rural residence, from greenhouse and controlled-environment agribusiness on a separate route, and from Agricorp Production Insurance or other government AgriInsurance programs for crop yield loss. Licensed trucks and passenger vehicles used on public roads still require Ontario automobile insurance. Premium Insurance Brokers can help family and commercial farms compare private farm property and liability programs for how you actually farm.",
    photographySlug: "farm-insurance",
    accentColor: AGRICULTURE_ACCENT,
    quoteHref: QUOTE_FARM,
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
      ...agricultureRelatedExcept("farm-insurance"),
      { label: "Commercial Auto", href: "/commercial-auto-insurance/" },
    ]),
    relatedIntro:
      "Crop programs, livestock, greenhouse or nursery operations, and equipment scheduling often need their own review — explore related Agriculture pages from Premium.",
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
          "Livestock is often insured against specified perils such as fire, lightning, windstorm, or collision on a scheduled basis. Separate mortality or disease programs may be available in some markets with different exclusions — government programs for disease control are not the same as private livestock insurance. Confirm perils, valuation, and epidemic exclusions with your broker. See our Livestock Insurance page for a deeper overview.",
      },
      {
        question: "Are farm vehicles included in a farm policy?",
        answer:
          "Unlicensed farm machinery and implements used on the farm are typically scheduled on the farm property policy. Licensed trucks, passenger vehicles, and farm plates used on public roads require Ontario automobile insurance — commercial or personal depending on use — coordinated alongside your farm package. One farm policy does not replace compulsory automobile coverage for road vehicles.",
      },
      {
        question: "What information do I need for a farm quote?",
        answer:
          "Expect questions about farm type and acreage, building descriptions and values, equipment lists, livestock counts and values, farming and side-income activities (including farm stands or agritourism), custom farming, fuel storage, prior claims, and current coverage. If you participate in Agricorp Production Insurance or other programs, note those separately — they are government crop programs administered by Agricorp, not products Premium sells or processes.",
      },
    ],
    ctaHeading: "Ready to cover your farm?",
    ctaSubhead:
      "Tell us about your buildings, equipment, livestock, and sales activities — we'll compare farm programs and explain what fits.",
    serviceName: "Farm Insurance",
    schemaKind: "agriculture",
  }),
  "greenhouse-agribusiness-insurance": buildPilotProductConfig({
    slug: "greenhouse-agribusiness-insurance",
    metaTitle:
      "Greenhouse & Nursery Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Greenhouse and nursery insurance for Leamington, Essex County, and Windsor-Essex operations — structures, equipment, stock treatment, and liability through an independent broker.",
    eyebrow: "Greenhouse & Nursery",
    headline: "Greenhouse & Nursery Insurance",
    heroLead:
      "Greenhouse and nursery operations in Leamington, Essex County, and Windsor-Essex rely on specialized structures, climate systems, and growing stock that standard commercial packages may not describe the same way as a retail shop or office. Premium Insurance Brokers helps review property, equipment, liability, and related coverages for how your controlled-environment or nursery operation actually runs — without treating Health Canada–licensed cannabis cultivation as the same product route.",
    photographySlug: "greenhouse",
    accentColor: "#6B8F71",
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Greenhouse Quote",
    trustStatement:
      "For greenhouse and nursery operators in Leamington, Essex County, and Windsor-Essex — reviewed through an independent broker who can coordinate structures, equipment, stock treatment, and liability without assuming every plant or crop exposure is automatic.",
    coverageIntro:
      "Coverage areas commonly reviewed for greenhouse and nursery operations — what applies depends on your policy, insurer, scheduled property, and how growing stock is defined.",
    coverageItems: [
      {
        title: "Greenhouse & Nursery Structures",
        shortLabel: "Structures",
        description:
          "Greenhouse structures, nursery buildings, and other insured property can represent a significant part of the operation's exposure. Coverage depends on the property insured, policy terms, and selected coverages.",
        detailTitle: "Why structures drive insurable values",
        detailDescription:
          "Glass bays, poly tunnels, climate-controlled houses, and nursery buildings in Leamington and Essex County often represent a large share of total property values alongside tenant improvements and packing areas. Building types, construction, and total property values should be reviewed with your broker so limits and descriptions reflect the operation accurately.",
        icon: Building2,
      },
      {
        title: "Equipment & Machinery",
        shortLabel: "Equipment",
        description:
          "Heating, ventilation, irrigation, and other specialized operational equipment may be central to greenhouse and nursery production. Coverage depends on the policy and coverages purchased.",
        detailTitle: "When climate and irrigation systems keep production running",
        detailDescription:
          "Greenhouse and nursery operations often depend on heating, ventilation, and irrigation — systems that may sit outside a basic property form's treatment of contents. Your broker should review how these assets are described and insured, especially where equipment values or specialized machinery endorsements apply.",
        icon: Wrench,
      },
      {
        title: "Business Property & Growing Stock",
        shortLabel: "Stock & Property",
        description:
          "Business contents, supplies, and eligible stock or growing property should be reviewed carefully. How plants, nursery stock, and seasonal inventory are insured varies by policy and insurer — and should not be assumed automatic.",
        detailTitle: "How plants, nursery stock, and supplies are treated",
        detailDescription:
          "Growing stock, plants, and seasonal inventory can be treated very differently from fixed equipment or building coverage. How particular property is insured varies by market; this warrants a focused review rather than a generic contents limit.",
        icon: Package,
      },
      {
        title: "Business Interruption",
        shortLabel: "Interruption",
        description:
          "A covered property loss can interrupt operations and affect business income. Business interruption coverage may respond to covered loss of income following an insured loss, subject to policy terms, limits, and coverage purchased.",
        detailTitle: "When a covered loss forces a shutdown",
        detailDescription:
          "A covered fire, equipment failure, or property loss can halt production during peak growing or shipping periods — when payroll, utilities, and lease costs may continue. Waiting periods, limits, and seasonal revenue patterns in Windsor–Essex operations affect what makes sense.",
        icon: Briefcase,
      },
      {
        title: "Commercial Liability",
        shortLabel: "Liability",
        description:
          "Greenhouse and nursery operations can have liability exposures from premises, visitors, contractors, and business activities. Appropriate protection depends on the nature and scale of the operation.",
        detailTitle: "Liability from premises, visitors, and daily operations",
        detailDescription:
          "Loading bays, customer pickup, contractor visits, and on-site activity create third-party injury or property-damage exposure distinct from stock or equipment losses. Limits and endorsements should reflect how the operation interacts with staff, suppliers, and the public.",
        icon: Shield,
      },
      {
        title: "Equipment Breakdown",
        shortLabel: "Breakdown",
        description:
          "Heating, electrical, ventilation, irrigation, and other critical systems can create equipment-breakdown exposure. Coverage may be available where purchased and remains subject to policy terms and exclusions.",
        detailTitle: "Critical system failure during peak season",
        detailDescription:
          "A compressor, boiler, or irrigation controller failure can disrupt climate control and threaten plant viability — losses that base property coverage may treat differently from sudden mechanical or electrical breakdown. Triggers, sublimits, and exclusions require careful review.",
        icon: Zap,
      },
    ],
    considerations: [
      {
        title: "Construction and total property values",
        description:
          "Building types, construction, and total property values should be reviewed with your broker so limits and descriptions reflect the greenhouse or nursery accurately.",
      },
      {
        title: "Heating, ventilation, and irrigation systems",
        description:
          "Climate and irrigation systems are often central to these operations — your broker should review how they are described and insured.",
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
        title: "Treatment of plants, nursery stock, and growing inventory",
        description:
          "How plants, nursery stock, and growing inventory are treated can vary significantly by policy and insurer — this should be reviewed rather than assumed.",
      },
      {
        title: "Seasonal changes in values or operations",
        description:
          "Seasonal shifts in inventory, revenue, or operations may affect what should be reported and when limits need updating.",
      },
    ],
    brokerSteps: commercialBrokerSteps,
    relatedProducts: relatedLinksToProducts([
      ...agricultureRelatedExcept("greenhouse-agribusiness-insurance"),
      { label: "Cannabis Producer", href: "/cannabis-producer-insurance/" },
    ]),
    relatedIntro:
      "Open-field farms, crop programs, livestock, and equipment scheduling are separate Agriculture routes — cannabis cultivation stays on its own commercial product page.",
    faqTitle: "Greenhouse & nursery FAQ",
    faqIntro: "Straight answers to common questions.",
    faqItems: [
      {
        question: "What insurance does a greenhouse or nursery need?",
        answer:
          "It depends on the operation. Structures, specialized equipment, business property, growing stock treatment, liability, business interruption, and equipment breakdown are commonly reviewed. Premium can help identify coverages that should be considered for how you operate — without promising that any specific item or peril is automatic.",
      },
      {
        question: "Does greenhouse or nursery insurance cover plants or stock?",
        answer:
          "Coverage for plants, nursery stock, and growing inventory can vary significantly by policy and insurer. It should not be assumed to be included automatically. We can review how your inventory is treated and identify options available in the markets we access.",
      },
      {
        question: "What happens if heating or other critical equipment breaks down?",
        answer:
          "Greenhouses and nurseries can depend heavily on heating, ventilation, irrigation, and related systems. Equipment breakdown and resulting losses require careful review because coverage depends on the policy, cause of loss, and endorsements purchased.",
      },
      {
        question: "Can business interruption coverage protect a greenhouse?",
        answer:
          "Business interruption coverage may help with covered loss of income following an insured loss, subject to the policy's terms, limits, waiting periods, and coverage purchased. Appropriate limits should reflect the operation's actual financial exposure.",
      },
      {
        question: "Do you insure greenhouse and nursery operations in Leamington and Essex County?",
        answer:
          "Premium Insurance Brokers serves operators throughout Windsor-Essex and can assist greenhouse and nursery businesses with reviewing their commercial insurance needs. Licensed cannabis cultivation is a separate product conversation.",
      },
    ],
    ctaHeading: "Ready to discuss your greenhouse or nursery?",
    ctaSubhead:
      "Tell us about your structures, systems, and stock — a broker will compare options and explain what may fit.",
    serviceName: "Greenhouse & Nursery Insurance",
    schemaKind: "agriculture",
  }),
  "crop-insurance": buildPilotProductConfig({
    slug: "crop-insurance",
    metaTitle:
      "Crop Insurance & Agricorp Referral | Premium Insurance Brokers",
    metaDescription:
      "Ontario Production Insurance is administered by Agricorp. Premium Insurance Brokers points you there for crop programs and can help with separate private farm insurance needs.",
    eyebrow: "Crop Insurance",
    headline: "Crop Insurance",
    heroLead:
      "Looking for crop Production Insurance in Ontario? That program is administered by Agricorp — the agency that handles enrolment, premiums, and claims for Production Insurance. Premium Insurance Brokers does not sell or administer Agricorp programs; we send you to their official resources so you can review details and apply directly.",
    heroSupporting:
      "If you also need private farm insurance — buildings, machinery, liability, livestock, and related coverages we can place — start a farm quote with us. We’re here for the parts of your farm program that go through private insurance markets.",
    photographySlug: "crop-insurance",
    accentColor: AGRICULTURE_ACCENT,
    quoteHref: AGRICORP_PRODUCTION_INSURANCE_URL,
    quoteLabel: "Visit Agricorp",
    secondaryCta: {
      label: "Get a Farm Quote",
      href: QUOTE_FARM,
    },
    trustStatement:
      "Agricorp administers Ontario Production Insurance. Premium can assist with separate private farm and agriculture coverages available through the markets we access.",
    coverageHeading: "How crop protection usually splits",
    coverageIntro:
      "Use this page to see where Agricorp fits — and where a private farm insurance conversation with Premium may still help.",
    coverageItems: [
      {
        id: "agricorp-production-insurance",
        title: "Agricorp Production Insurance",
        shortLabel: "Agricorp",
        description:
          "Ontario Production Insurance is a government program administered by Agricorp. It addresses certain production and yield risks defined in Agricorp contracts — enrolment, premiums, and claims run through Agricorp, not through this brokerage.",
        detailTitle: "Go to Agricorp for program details and applications",
        detailDescription:
          "Commodity eligibility, coverage levels, deadlines, and claim rules are set by Agricorp and the applicable program wording. Premium Insurance Brokers does not process Agricorp applications or represent Agricorp. Visit Agricorp’s Production Insurance pages for authoritative information and to enrol or manage a policy.",
        icon: Sprout,
      },
      {
        id: "private-farm-package",
        title: "Private Farm Package Coverages",
        shortLabel: "Farm Package",
        description:
          "Barns, outbuildings, scheduled machinery, farm liability, and related private farm coverages are typically placed through insurance markets — separate from Agricorp yield programs.",
        detailTitle: "What brokers can help quote",
        detailDescription:
          "If your question is about buildings, equipment, liability, or other private farm exposures, a farm insurance review with Premium is the right starting point. Those policies do not replace Agricorp Production Insurance for insured yield loss.",
        icon: Warehouse,
      },
      {
        id: "field-vs-structure",
        title: "Standing Crop vs Structures & Equipment",
        shortLabel: "Boundaries",
        description:
          "Yield loss on standing crops under a government program is a different risk than fire or storm damage to a barn, bin, or tractor. Confirm which agreement responds before assuming one policy covers both.",
        detailTitle: "Do not assume one policy covers every farm loss",
        detailDescription:
          "A production shortfall after drought or disease may belong under Agricorp wording where you are enrolled. Damage to buildings or scheduled equipment is usually a private property question. Mixing the two without checking often creates false comfort.",
        icon: Leaf,
      },
      {
        id: "greenhouse-nursery-path",
        title: "Greenhouse & Nursery Operations",
        shortLabel: "Greenhouse",
        description:
          "Controlled-environment and nursery operations often need a different commercial review than open-field crop programs. See our Greenhouse & Nursery page for that path.",
        detailTitle: "Different structures, different underwriting",
        detailDescription:
          "Glasshouses, poly tunnels, and nursery stock treatment are reviewed under greenhouse or nursery commercial programs — not as a substitute for Agricorp field-crop Production Insurance.",
        icon: Building2,
      },
    ],
    considerations: [
      {
        title: "Start with Agricorp for Production Insurance",
        description:
          "Enrolment, deadlines, and commodity rules for Ontario Production Insurance are published by Agricorp. Use their site for authoritative program details and applications.",
      },
      {
        title: "Private farm insurance is a separate conversation",
        description:
          "Buildings, machinery, liability, and related farm coverages are quoted through private markets when available — they are not a substitute for Agricorp Production Insurance.",
      },
      {
        title: "Ask about any specialty crop products before assuming coverage",
        description:
          "If you are interested in private specialty crop options, availability depends on markets and underwriting at the time of quote. A broker can tell you what can actually be placed.",
      },
      {
        title: "Greenhouse and nursery follow a different path",
        description:
          "Controlled-environment and nursery operations are reviewed on our Greenhouse & Nursery page rather than as open-field Production Insurance.",
      },
    ],
    considerationsPresentation: "expandable",
    brokerSteps: commercialBrokerSteps,
    relatedProducts: relatedLinksToProducts(
      agricultureRelatedExcept("crop-insurance"),
    ),
    relatedIntro:
      "When you need private farm, livestock, greenhouse, or equipment coverage — explore the Agriculture pages Premium can help quote.",
    faqTitle: "Crop insurance FAQ",
    faqIntro: "Clear answers about Agricorp and private farm coverage.",
    faqItems: [
      {
        question: "Does Premium Insurance Brokers sell Agricorp Production Insurance?",
        answer:
          "No. Agricorp administers Ontario Production Insurance and related government crop programs. We refer you to Agricorp for those products and help separately with private farm insurance we can place.",
      },
      {
        question: "Where do I apply for Production Insurance?",
        answer:
          "Apply and manage Production Insurance through Agricorp using their official website and processes. Start at Agricorp’s Production Insurance program pages for current enrolment information.",
      },
      {
        question: "What can Premium help with instead?",
        answer:
          "We can help review private farm property, buildings, machinery, farm liability, livestock scheduling, greenhouse or nursery commercial coverages, and related placements available in the markets we access — subject to underwriting and policy terms.",
      },
      {
        question: "If I have Agricorp coverage, do I still need farm insurance?",
        answer:
          "Often yes for buildings, equipment, liability, and other private exposures that Production Insurance is not designed to replace. The right mix depends on your operation — a broker can help separate government crop programs from private farm package needs.",
      },
    ],
    ctaHeading: "Ready for Agricorp — or a private farm review?",
    ctaSubhead:
      "Visit Agricorp for Production Insurance, or start a farm quote with Premium for private coverages we can place.",
    ctaQuoteLabel: "Visit Agricorp",
    serviceName: "Crop Insurance Information",
    schemaKind: "agriculture",
  }),
  "livestock-insurance": buildPilotProductConfig({
    slug: "livestock-insurance",
    metaTitle:
      "Livestock & Animal Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Livestock and animal insurance questions for Windsor-Essex farms — named perils, scheduling, mortality limitations, and how animals fit a farm package review.",
    eyebrow: "Livestock Insurance",
    headline: "Livestock / Animal Insurance",
    heroLead:
      "Dairy, beef, swine, poultry, and other animal operations often schedule livestock separately from barns and machinery. Private farm programs may offer named-peril livestock coverage, and some markets offer optional mortality products — each with its own valuation rules and exclusions. Disease, epidemic, and government disease-management programs are not the same as a private livestock schedule. Premium Insurance Brokers helps Windsor–Essex producers review how animals are described and insured alongside the rest of the farm package.",
    photographySlug: "livestock-insurance",
    accentColor: AGRICULTURE_ACCENT,
    quoteHref: QUOTE_FARM,
    quoteLabel: "Get a Farm Quote",
    trustStatement:
      "For Windsor–Essex livestock and mixed farms — reviewed through an independent broker who can discuss scheduling, valuation, and common limitations without promising mortality, disease, or epidemic coverage that a given market does not offer.",
    coverageHeading: "What we typically review",
    coverageIntro:
      "Livestock conversations usually cover how animals are scheduled, which perils may apply, and where private coverage stops — actual terms depend on the insurer and form.",
    coverageItems: [
      {
        id: "named-peril-livestock",
        title: "Named-Peril Livestock Scheduling",
        shortLabel: "Named Perils",
        description:
          "Many farm packages can schedule livestock against specified perils such as fire, lightning, windstorm, or collision — subject to scheduling, valuation methods, limits, and policy exclusions.",
        detailTitle: "A schedule is not a blanket guarantee",
        detailDescription:
          "Animals usually need to be described by type and value. Perils are defined in the form; losses outside those perils are not assumed covered. Update schedules after purchases or sales so limits reflect current herd or flock values.",
        icon: Beef,
      },
      {
        id: "mortality-programs",
        title: "Mortality Programs (Where Available)",
        shortLabel: "Mortality",
        description:
          "Optional livestock mortality coverage may be available in some markets with different underwriting and exclusions than a basic named-peril schedule. Availability is not guaranteed for every species or operation.",
        detailTitle: "Ask what can actually be quoted",
        detailDescription:
          "Mortality products, when offered, often exclude disease, epidemic, or other causes unless specifically endorsed. Premium will only present options available for your animals and location at the time of quote.",
        icon: Shield,
      },
      {
        id: "barns-and-confinement",
        title: "Barns, Confinement & Related Property",
        shortLabel: "Buildings",
        description:
          "Livestock housing, milking parlours, and related structures are usually property coverages — distinct from the animal schedule itself.",
        detailTitle: "Buildings and animals are often separate insuring agreements",
        detailDescription:
          "A barn fire may involve both building and livestock claims under different sections. Construction, heating, and vacancy affect property underwriting separately from herd valuation.",
        icon: Warehouse,
      },
      {
        id: "liability-and-escape",
        title: "Liability & Escape Exposures",
        shortLabel: "Liability",
        description:
          "Animals escaping onto roads or injuring visitors can create liability questions under farm liability forms — subject to definitions, exclusions, and endorsements.",
        detailTitle: "Operations and public interaction change the exposure",
        detailDescription:
          "Farm liability is not a substitute for every animal-related claim. Direct sales, agritourism, and custom work may need additional review beyond a base farm liability limit.",
        icon: FileCheck,
      },
    ],
    considerations: [
      {
        title: "Species, counts, and valuation basis",
        description:
          "Insurers review animal types, counts, and whether values use actual cash value, agreed value, or another basis. Keep schedules current after purchases or sales.",
      },
      {
        title: "Disease and epidemic exclusions are common",
        description:
          "Do not assume private livestock coverage responds to disease or epidemic loss. Confirm exclusions and any available buy-backs before a loss occurs.",
      },
      {
        title: "Government disease programs are separate",
        description:
          "Veterinary disease management and government response programs are not the same as private livestock insurance. Ask which agreement would actually respond.",
      },
      {
        title: "Mixed farms need a whole-package view",
        description:
          "Livestock rarely sits alone — buildings, feed, equipment, and liability belong in the same review as the animal schedule.",
      },
    ],
    considerationsPresentation: "expandable",
    brokerSteps: commercialBrokerSteps,
    relatedProducts: relatedLinksToProducts(
      agricultureRelatedExcept("livestock-insurance"),
    ),
    relatedIntro:
      "Livestock is usually one part of a wider Agriculture review — farm packages, crop programs, greenhouse routes, and equipment scheduling.",
    faqTitle: "Livestock insurance FAQ",
    faqIntro: "Straight answers about animals on farm insurance programs.",
    faqItems: [
      {
        question: "Does farm insurance automatically cover livestock?",
        answer:
          "Not automatically. Livestock is often scheduled separately against specified perils, with its own limits and valuation rules. Confirm what is listed on your policy rather than assuming animals are included with the barn.",
      },
      {
        question: "Is livestock mortality covered?",
        answer:
          "Basic named-peril livestock sections differ from optional mortality programs. Mortality coverage, where available, commonly excludes disease or epidemic causes unless specifically addressed. We will only describe options that can be quoted for your operation.",
      },
      {
        question: "What information do you need for a livestock quote?",
        answer:
          "Expect questions about species and counts, values, housing, related farm property, prior losses, and whether you also need buildings, equipment, or liability reviewed as part of a farm package.",
      },
      {
        question: "Do you cover hobby farms and commercial herds the same way?",
        answer:
          "Scale and purpose affect underwriting. Hobby, part-time, and commercial operations may land in different markets or forms. Accurate descriptions help us find an appropriate path.",
      },
    ],
    ctaHeading: "Ready to review livestock with your farm package?",
    ctaSubhead:
      "Tell us about your animals, housing, and related farm exposures — we will explain what markets may allow.",
    serviceName: "Livestock Insurance",
    schemaKind: "agriculture",
  }),
  "farm-equipment-insurance": buildPilotProductConfig({
    slug: "farm-equipment-insurance",
    metaTitle:
      "Farm Equipment Coverage in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Farm equipment and machinery coverage for Windsor-Essex operations — scheduled implements, transit considerations, and the line between field equipment and licensed road vehicles.",
    eyebrow: "Farm Equipment",
    headline: "Farm Equipment Coverage",
    heroLead:
      "Tractors, combines, implements, and portable farm equipment are usually scheduled on a farm property program — not treated like a personal auto policy. Licensed trucks and other road vehicles still need Ontario automobile insurance. Premium Insurance Brokers helps Essex County and Windsor–Essex producers review equipment lists, values, off-farm use, and how machinery fits alongside buildings and liability.",
    photographySlug: "farm-equipment-insurance",
    accentColor: AGRICULTURE_ACCENT,
    quoteHref: QUOTE_FARM,
    quoteLabel: "Get a Farm Quote",
    trustStatement:
      "For Windsor–Essex farms that depend on machinery — reviewed through an independent broker who separates field equipment scheduling from compulsory automobile insurance for licensed road vehicles.",
    coverageHeading: "Equipment topics we review",
    coverageIntro:
      "Equipment coverage is organized around scheduling, location, use, and the hard split between unlicensed field machinery and licensed vehicles.",
    coverageItems: [
      {
        id: "scheduled-machinery",
        title: "Scheduled Machinery & Implements",
        shortLabel: "Machinery",
        description:
          "Tractors, combines, implements, and portable farm equipment — where scheduled — may be insured against covered perils subject to location limits, deductibles, and policy terms.",
        detailTitle: "Lists and values matter",
        detailDescription:
          "Underinsurance after upgrades or new purchases is a common gap. Peak-season equipment in use should match what the schedule actually describes.",
        icon: Tractor,
      },
      {
        id: "transit-and-off-farm",
        title: "Transit & Off-Farm Use",
        shortLabel: "Transit",
        description:
          "Custom farming, equipment loaned to neighbours, and movement between locations may need transit or off-farm extensions — disclose how machinery is actually used.",
        detailTitle: "Own-farm assumptions break down quickly",
        detailDescription:
          "If equipment regularly leaves the premises for custom work or shared use, say so at quote time. Silent assumptions about location limits create claim disputes later.",
        icon: Wrench,
      },
      {
        id: "road-vs-field",
        title: "Licensed Road Vehicles vs Field Equipment",
        shortLabel: "Auto Boundary",
        description:
          "Pickup trucks, grain trucks, and other licensed vehicles on public roads require Ontario automobile insurance. Unlicensed field machinery is typically a farm property scheduling question.",
        detailTitle: "One farm policy does not replace auto insurance",
        detailDescription:
          "Coordinate commercial or personal auto policies for farm trucks with your farm package. Do not assume implements coverage extends to licensed road use.",
        icon: Shield,
      },
      {
        id: "breakdown-and-attachments",
        title: "Breakdown & High-Value Attachments",
        shortLabel: "Breakdown",
        description:
          "Equipment breakdown and high-value attachments may be treated differently from basic scheduled property. Availability depends on the market and endorsements purchased.",
        detailTitle: "Ask before assuming mechanical breakdown is included",
        detailDescription:
          "Sudden mechanical or electrical breakdown is not the same as a fire or collision peril on a property form. Review whether breakdown coverage is available and appropriate for critical machines.",
        icon: Zap,
      },
    ],
    considerations: [
      {
        title: "Keep the equipment schedule current",
        description:
          "New tractors, headers, and implements should be added promptly. Values should reflect what it would cost to replace scheduled items under the policy’s valuation basis.",
      },
      {
        title: "Custom farming and shared equipment",
        description:
          "Off-farm use and equipment shared with neighbours change exposure. Disclose custom-work revenue and borrowing arrangements when quoting.",
      },
      {
        title: "Seasonal peaks and storage",
        description:
          "Harvest and planting concentrate values and use. Storage locations and unattended equipment can affect underwriting questions.",
      },
      {
        title: "Separate auto policies for road vehicles",
        description:
          "Licensed vehicles need automobile insurance under Ontario’s compulsory framework. Align those policies with your farm package rather than assuming overlap.",
      },
    ],
    considerationsPresentation: "expandable",
    brokerSteps: commercialBrokerSteps,
    relatedProducts: relatedLinksToProducts([
      ...agricultureRelatedExcept("farm-equipment-insurance"),
      { label: "Commercial Auto", href: "/commercial-auto-insurance/" },
    ]),
    relatedIntro:
      "Equipment sits beside farm property, livestock, greenhouse operations, and — for licensed trucks — commercial auto.",
    faqTitle: "Farm equipment FAQ",
    faqIntro: "Straight answers about machinery on farm programs.",
    faqItems: [
      {
        question: "Is farm equipment covered automatically?",
        answer:
          "Equipment is typically scheduled with its own limits and terms. Do not assume every tractor or implement is included without checking the schedule and peril structure.",
      },
      {
        question: "Does farm equipment coverage include my farm truck?",
        answer:
          "Licensed trucks used on public roads generally need Ontario automobile insurance. Unlicensed field machinery is usually handled on the farm property schedule. Confirm both sides rather than relying on one policy.",
      },
      {
        question: "What if I do custom farming for neighbours?",
        answer:
          "Custom work can extend equipment and liability beyond own-farm use. Disclose that activity so transit, location, and liability questions can be reviewed accurately.",
      },
      {
        question: "Can I insure leased or financed equipment?",
        answer:
          "Leased or financed machinery often needs to be scheduled and may involve loss-payee interests. Bring finance documents to the quote so interests and values can be reflected correctly.",
      },
    ],
    ctaHeading: "Ready to review your farm equipment schedule?",
    ctaSubhead:
      "Share your machinery list, values, and how equipment is used — we will compare farm program options that may fit.",
    serviceName: "Farm Equipment Coverage",
    schemaKind: "agriculture",
  }),
};
