/**
 * Cannabis Phase 2 — NEW industry pages (not part of the frozen 58-route baseline).
 * Appended into industryPages via commercial-industries.ts.
 */
import {
  AlertTriangle,
  Building2,
  Factory,
  FlaskConical,
  Leaf,
  Lock,
  Package,
  Shield,
  Store,
  Wrench,
} from "lucide-react";
import type { CoverageCard, ConsiderationItem } from "@/components/LineInsurancePage";
import type { FaqItem } from "@/components/FaqAccordion";

type CannabisIndustryPage = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  subhead: string;
  whoItIsFor?: string;
  quoteHref: string;
  quoteLabel: string;
  coverageIntro: string;
  coverageTypes: CoverageCard[];
  considerations?: ConsiderationItem[];
  faqTitle: string;
  faqItems: FaqItem[];
  ctaHeading: string;
  ctaSubhead: string;
  serviceName: string;
};

const QUOTE = "/get-a-quote?type=business";

export const cannabisIndustryPages: CannabisIndustryPage[] = [
  {
    slug: "cannabis-retail-insurance",
    metaTitle:
      "Cannabis Retail Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Cannabis retail insurance for Ontario authorized cannabis stores — premises liability, property and cannabis stock, product liability, crime, and business interruption through an independent Windsor-Essex broker.",
    headline: "Cannabis Retail Insurance",
    subhead:
      "Ontario authorized cannabis retail stores combine storefront liability, high-value packaged inventory, landlord and Ontario Cannabis Store (OCS) contract requirements, and theft exposure in a way that differs from ordinary retail. Coverage is organized around how your store actually operates — premises and general liability, property and cannabis stock, product liability, crime, and business interruption where purchased — each subject to the policies and wording you buy. AGCO licensing regulates the store; it is not the same thing as an insurance policy. Premium Insurance Brokers can help Windsor–Essex cannabis retailers review programs against lease, security, and wholesale-contract expectations.",
    quoteHref: QUOTE,
    quoteLabel: "Get a Cannabis Retail Quote",
    coverageIntro:
      "Cannabis retail insurance is grouped here around five storefront exposures Ontario operators commonly review first — premises liability, property and stock, product liability, crime, and income after a covered physical loss — because each agreement has different triggers, limits, and exclusions.",
    coverageTypes: [
      {
        id: "general-liability",
        title: "Premises & General Liability",
        shortLabel: "Liability",
        description:
          "May help respond to certain third-party bodily injury or property-damage claims arising from customer or visitor incidents at your authorized store — subject to commercial general liability terms, exclusions, and limits.",
        detailTitle: "A slip at the entrance is a premises claim — not a licensing issue",
        detailDescription:
          "Authorized cannabis stores still face ordinary retail premises exposure: winter entrances, sales-floor traffic, ID-check queues, and parking areas. Commercial general liability may address certain covered third-party injury or property-damage claims subject to wording — it does not replace AGCO compliance, and it does not automatically satisfy every landlord or OCS contractual insurance schedule. Additional-insured requests and limit requirements should be compared to the certificate your policy can actually support.",
        icon: Shield,
      },
      {
        id: "cannabis-property-stock",
        title: "Property & Cannabis Stock",
        shortLabel: "Property",
        description:
          "May help address direct physical loss to tenant improvements, fixtures, equipment, security systems, and packaged cannabis inventory you own or must insure — where the form and cannabis appetite allow, subject to valuation, limits, and conditions.",
        detailTitle: "Packaged cannabis stock is not ordinary boutique inventory",
        detailDescription:
          "Store build-outs, display fixtures, safes, surveillance equipment, and sealed cannabis SKUs often drive the property conversation. Ordinary commercial property does not automatically treat cannabis inventory the same as general merchandise — specialty appetite, sublimits, security warranties, and valuation basis can all apply. Confirm how packaged stock is scheduled or limited rather than assuming a generic retail contents limit is enough.",
        icon: Package,
      },
      {
        id: "cannabis-product-liability",
        title: "Cannabis Product Liability",
        shortLabel: "Products",
        description:
          "May help respond to certain bodily injury or property-damage claims alleging harm from cannabis products sold or distributed at your store — subject to products-completed operations wording, cannabis restrictions, and limits.",
        detailTitle: "Selling sealed product can still put your store on a claim",
        detailDescription:
          "Even when products arrive through OCS in sealed packaging, retailers can be named in allegations involving contamination, labelling, potency, or injury tied to a purchased product. Products-completed operations coverage on a CGL program may address certain covered claims subject to exclusions — it is not a guarantee every allegation responds, and it is not the same as product recall expense coverage for withdrawal costs.",
        icon: AlertTriangle,
      },
      {
        id: "cannabis-crime-theft",
        title: "Crime, Theft & Cash",
        shortLabel: "Crime",
        description:
          "Property theft, robbery, employee dishonesty, and funds-transfer fraud are related but not identical exposures — cannabis retail often needs a deliberate crime and property review rather than one assumption that “theft is covered.”",
        detailTitle: "Burglary, employee theft, and social engineering are different coverages",
        detailDescription:
          "External break-in or robbery of stock may sit under property terms with security conditions. Employee dishonesty and certain internal inventory losses typically need crime/fidelity coverage. Social engineering or funds-transfer fraud is another conversation again. High-value portable inventory and cash handling make these distinctions material for authorized cannabis stores — do not treat them as one automatic grant.",
        icon: Lock,
      },
      {
        id: "business-interruption",
        title: "Business Interruption",
        shortLabel: "BI",
        description:
          "Where purchased with property, may help replace certain lost income and continuing expenses after a covered direct physical loss forces a necessary suspension of store operations — subject to waiting periods and policy terms.",
        detailTitle: "Rent continues when a covered loss closes the doors",
        detailDescription:
          "A covered fire, major water loss, or other insured physical damage can idle an authorized store while lease and payroll obligations continue. Business interruption, where added, is built around that covered physical-loss trigger — not AGCO licence suspension, regulatory shutdown alone, OCS supply delay, or every security incident without insured property damage. Coordinate BI values with realistic rebuild time for a cannabis retail fit-out.",
        icon: Store,
      },
    ],
    whoItIsFor:
      "For Windsor–Essex and Ontario operators of AGCO-authorized cannabis retail stores — reviewed through an independent broker who can coordinate liability, property and stock, product liability, crime, and business interruption against lease and OCS contract expectations without treating every cannabis business like a cultivator.",
    considerations: [
      {
        title: "AGCO licensing is not an insurance policy",
        description:
          "Retail Operator Licences, Retail Store Authorizations, and Cannabis Retail Manager Licences (where required) regulate who may operate a store and how. Those rules address security, storage, advertising, and age controls — they are not the same as commercial insurance wording, limits, or claims response.",
      },
      {
        title: "OCS contractual insurance vs statutory insurance",
        description:
          "The Cannabis Licence Act and O. Reg. 468/18 do not impose a statutory minimum insurance dollar limit. Separately, OCS retailer agreements commonly require commercial general liability of at least $5 million per occurrence, with specified coverages and OCS named as an additional insured, before wholesale ordering — confirm the current agreement and certificate form rather than assuming every policy automatically matches.",
      },
      {
        title: "Security systems and underwriting conditions",
        description:
          "Surveillance, secure storage, and access controls matter for AGCO Registrar’s Standards and for property or crime underwriting. Alarm warranties, safe requirements, and after-hours procedures can affect whether a theft claim responds — disclose the systems you actually operate.",
      },
      {
        title: "Landlord certificates and additional insured requests",
        description:
          "Leases often demand specific CGL limits, waiver wording, or additional-insured status. Compare certificate requests to what your insurer will endorse — a certificate does not expand coverage beyond the policy.",
      },
      {
        title: "Packaged stock valuation and peak inventory",
        description:
          "Cannabis SKU mix and on-hand values change with assortment and receiving schedules. Report realistic inventory values and ask how cannabis stock is limited or valued on the form — underinsurance and coinsurance can reduce recovery after a partial loss on many commercial property programs.",
      },
      {
        title: "Cyber, POS, and customer data",
        description:
          "Age-gate platforms, payment systems, and customer records create privacy and ransomware exposure that property and CGL typically do not fully address. Cyber coverage, where purchased, is a separate review — see our cyber insurance page when card data or online ordering is material.",
      },
      {
        title: "Delivery and commercial auto",
        description:
          "Where lawful delivery or staff vehicle use is part of operations, commercial auto or hired/non-owned auto may be needed. Do not assume premises liability covers cannabis delivery on public roads — disclose delivery practices when quoting.",
      },
      {
        title: "Product recall is separate from product liability",
        description:
          "Product liability may address certain third-party injury claims. First-party recall or withdrawal expense — notice, retrieval, disposal — is typically a different coverage. Authorized retailers should still understand recall/return procedures; insurance response depends on the forms purchased. See our product recall insurance page when expense coverage is in scope.",
      },
    ],
    faqTitle: "Cannabis retail insurance FAQ",
    faqItems: [
      {
        question: "What insurance does an Ontario cannabis store typically need?",
        answer:
          "Most authorized stores review commercial general liability, commercial property for improvements and stock, product liability, crime, and business interruption where income protection is needed after a covered physical loss. Landlord and OCS contract schedules may add specific limit or additional-insured requirements. Exact components depend on the policies you purchase — there is no single automatic cannabis retail package.",
      },
      {
        question: "Does AGCO require a minimum insurance limit?",
        answer:
          "AGCO licensing and Registrar’s Standards regulate retail operations (including security and storage). The Cannabis Licence Act and O. Reg. 468/18 do not impose a statutory minimum insurance dollar limit. Treat licensing separately from insurance contracts and confirm any insurer or counterparty requirements with your broker.",
      },
      {
        question: "What is the OCS insurance requirement?",
        answer:
          "OCS retailer agreements are contractual. Current OCS retailer handbook materials describe commercial general liability of not less than $5 million per occurrence, including specified coverages such as non-owned automobile and products/completed operations, with OCS named as an additional insured / certificate holder before ordering. Confirm the live agreement and COI form — meeting OCS paperwork is not the same as proving every cannabis claim is covered.",
      },
      {
        question: "Does ordinary property insurance treat cannabis inventory like general merchandise?",
        answer:
          "Not necessarily. Packaged cannabis stock may require specialty appetite, explicit scheduling, sublimits, or security conditions. Ordinary retail contents wording should not be assumed to treat cannabis inventory like general merchandise — disclose values, storage, and security when placing coverage.",
      },
      {
        question: "Does product liability include product recall expenses?",
        answer:
          "Generally no. Product liability under a CGL program may address certain third-party injury or property-damage claims subject to wording. Recall or withdrawal expenses are typically first-party costs under a separate product recall coverage. See our product recall insurance page for expense-oriented discussion.",
      },
    ],
    ctaHeading: "Ready to review cannabis retail coverage?",
    ctaSubhead:
      "Share your store authorization status, lease insurance schedule, security controls, and inventory profile — we will compare markets and explain what may fit, subject to underwriting.",
    serviceName: "Cannabis Retail Insurance",
  },
  {
    slug: "cannabis-producer-insurance",
    metaTitle:
      "Cannabis Producer Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Cannabis producer insurance for Health Canada–licensed cultivation, nursery, and processing operations — property, living plants and stock, equipment breakdown, product liability, recall expense, and business interruption through an independent Windsor-Essex broker.",
    headline: "Cannabis Producer Insurance",
    subhead:
      "Federally licensed cannabis cultivation, nursery, and processing operations combine production infrastructure, living plant and stock values, environmental controls, product liability, and recall-ready quality systems in a risk profile that differs from retail stores and from ordinary manufacturing. Depending on your licence class — including standard or micro cultivation, nursery, and standard or micro processing — that can mean commercial property for buildings and grow infrastructure, specialized treatment of living plants and cannabis stock, equipment breakdown where purchased, products liability, product recall expense coverage, and business interruption after a covered physical loss. Health Canada licensing and Good Production Practices set compliance duties; they do not replace insurance wording. Premium Insurance Brokers can help licensed operators in and around Windsor–Essex review programs against how you actually cultivate, process, and ship.",
    quoteHref: QUOTE,
    quoteLabel: "Get a Cannabis Producer Quote",
    coverageIntro:
      "Cannabis producer insurance is organized here around six production exposures cultivators and processors commonly review — infrastructure property, living plants and stock, equipment breakdown, product liability, recall expense, and business interruption — because triggers and valuations differ sharply across those agreements.",
    coverageTypes: [
      {
        id: "cannabis-property-infrastructure",
        title: "Property & Production Infrastructure",
        shortLabel: "Infrastructure",
        description:
          "May help address direct physical loss to buildings, tenant improvements, grow rooms, HVAC, lighting, irrigation, environmental controls, security systems, processing equipment, and certain materials — subject to cannabis property appetite, causes of loss, and limits.",
        detailTitle: "The grow room is a production asset — not just a warehouse bay",
        detailDescription:
          "Licensed sites concentrate value in specialized rooms, sealed environments, electrical capacity, climate systems, and processing lines. One property form does not automatically insure every fixture, control system, or outdoor area the same way. Disclose construction, occupancy, and equipment schedules so limits match the infrastructure you would actually have to rebuild after a covered loss.",
        icon: Building2,
      },
      {
        id: "cannabis-crop-stock",
        title: "Living Plants, Crop & Stock",
        shortLabel: "Crop & Stock",
        description:
          "Living plants, seedlings, harvested cannabis, work-in-progress, and finished goods are often treated differently from ordinary commercial stock — coverage, if available, depends on specialty wording, stage definitions, and limits rather than a universal property grant.",
        detailTitle: "Living plants are not finished packaged inventory",
        detailDescription:
          "Cultivation exposure moves through living plants and crop stages into harvested material, WIP, and finished products. Ordinary commercial property should not be assumed to automatically cover living cannabis plants or every crop loss scenario. Specialty cannabis or crop-oriented terms — where offered — may define stages, valuation, and exclusions differently by insurer. Do not rely on a single valuation rule; disclose canopy, stages, and storage methods when quoting.",
        icon: Leaf,
      },
      {
        id: "equipment-breakdown",
        title: "Equipment Breakdown",
        shortLabel: "Breakdown",
        description:
          "Where purchased — typically not automatic on standard property forms — may help address certain sudden and accidental internal mechanical or electrical failures of HVAC, lighting, irrigation, environmental controls, or processing equipment, subject to policy terms.",
        detailTitle: "A failed HVAC motor is not the same claim as a fire",
        detailDescription:
          "Climate and lighting failures can threaten crop health quickly, but equipment breakdown coverage (where added) responds to defined breakdown events — not wear and tear, poor maintenance, or every consequential crop loss. Spoilage, crop damage, or business interruption after breakdown often need explicit extensions. Confirm what is included before assuming property insurance already handles mechanical failure.",
        icon: Wrench,
      },
      {
        id: "cannabis-product-liability",
        title: "Product Liability",
        shortLabel: "Products",
        description:
          "May help respond to certain third-party bodily injury or property-damage claims alleging harm from cannabis you cultivate, process, package, or distribute — subject to products-completed operations wording, cannabis restrictions, and limits.",
        detailTitle: "Finished goods can generate claims long after release",
        detailDescription:
          "Contamination, labelling, potency, processing defects, and completed-product allegations are central for licensed processors and many cultivators selling into the supply chain. CGL products coverage may address certain covered claims subject to exclusions — extracts, edibles, and other product types can face tighter appetite. Product liability is not the same as paying first-party recall expenses.",
        icon: FlaskConical,
      },
      {
        id: "cannabis-product-recall",
        title: "Product Recall Expense",
        shortLabel: "Recall",
        description:
          "Where purchased, product recall insurance may help with certain first-party costs of a covered withdrawal — such as notification, retrieval, or disposal — distinct from Health Canada recall obligations and distinct from product liability claims.",
        detailTitle: "A regulatory recall duty is not an insurance cheque",
        detailDescription:
          "Cannabis Regulations require licence holders to maintain recall control systems and run recall simulations; the Minister may also order a recall. Those duties exist whether or not insurance responds. Product recall coverage, where bought, is typically aimed at defined first-party expense — not automatic CGL payment for withdrawal, replacement, or disposal. Deep specialty detail lives on our product recall insurance page.",
        icon: AlertTriangle,
      },
      {
        id: "business-interruption",
        title: "Business Interruption",
        shortLabel: "BI",
        description:
          "Where purchased with property, may help replace certain lost income and continuing expenses when a covered direct physical loss to insured property necessarily suspends production — subject to waiting periods, indemnity limits, and form wording.",
        detailTitle: "Payroll and fixed costs continue when a covered loss stops production",
        detailDescription:
          "Rebuilding sealed rooms and re-establishing canopy can take longer than a typical retail repair. BI generally follows a covered physical-loss trigger — it does not automatically respond to licence suspension, regulatory shutdown alone, contamination without insured property damage, recall decisions, equipment failure without the right forms, or supplier interruption unless a specific contingent endorsement applies. See our business interruption page for trigger principles.",
        icon: Factory,
      },
    ],
    whoItIsFor:
      "For Health Canada–licensed cultivators, nursery operators, and processors — including micro-cultivation and micro-processing where that licence class applies — reviewed through an independent broker who can coordinate infrastructure property, living plant and stock treatment, equipment breakdown, products liability, recall expense, and business interruption without treating your site like a retail storefront.",
    considerations: [
      {
        title: "Licence class changes the compliance picture",
        description:
          "Standard cultivation/processing and micro or nursery classes do not share identical physical-security matrices under Health Canada guidance. Describe your actual licence class, site layout, and activities so underwriting and risk engineering questions match operations — do not assume every producer is underwritten alike.",
      },
      {
        title: "Good Production Practices are compliance — not coverage",
        description:
          "Quality systems, sanitation, recordkeeping, and release controls support regulatory compliance and may influence underwriting questions. They do not by themselves create insurance coverage for product claims or recall expense.",
      },
      {
        title: "Living plants vs harvested stock vs finished goods",
        description:
          "Ask how each stage is defined and limited on proposed wording. A policy that addresses finished goods may still restrict living plants or crop. Avoid universal valuation assumptions — stage, market price, and input cost methods vary by insurer and form.",
      },
      {
        title: "Equipment breakdown and consequential crop loss",
        description:
          "HVAC, lighting, irrigation, and processing equipment failures can cascade into crop damage. Breakdown coverage, spoilage extensions, and BI after breakdown are often separate purchases — confirm the chain rather than assuming one endorsement solves all consequential loss.",
      },
      {
        title: "Product liability vs product recall expense",
        description:
          "Third-party injury lawsuits and first-party recall costs are different problems. Keep both in the program conversation when you release products into the supply chain, and use our product recall page for expense-oriented depth.",
      },
      {
        title: "Pollution and environmental handling",
        description:
          "Fertilizers, pesticides, solvents, wastewater, and extraction processes can create pollution exposure that CGL forms often restrict. Pollution liability may be reviewed as a supporting coverage when chemical and waste handling is material. See our pollution liability page.",
      },
      {
        title: "Crime and site security",
        description:
          "High-value plant material and finished stock attract theft. Property theft conditions and employee dishonesty/crime coverage should be reviewed against your physical security plan — especially where Health Canada security expectations already shape site design.",
      },
      {
        title: "Cyber and operational technology",
        description:
          "Environmental control systems, production software, and business networks can be ransomware targets. Cyber coverage is separate from property and CGL — review when OT/IT downtime would halt cultivation or processing.",
      },
      {
        title: "Transit between licensed sites",
        description:
          "Movement of cannabis between licensed locations or to wholesale channels can create cargo or stock-in-transit questions. Do not assume CGL or building property automatically covers goods in transit — disclose shipping patterns when relevant.",
      },
    ],
    faqTitle: "Cannabis producer insurance FAQ",
    faqItems: [
      {
        question: "What insurance may a cannabis cultivator or processor need?",
        answer:
          "Licensed producers commonly review commercial property for infrastructure, specialty treatment of living plants and cannabis stock, equipment breakdown, commercial general liability including products, product recall expense, and business interruption after covered physical loss. Crime, cyber, pollution, and cargo may be added when exposures warrant. Needs vary by licence class and activities — micro sites and standard processors are not identical.",
      },
      {
        question: "Do living cannabis plants need specialty treatment on property forms?",
        answer:
          "Yes — living plants and crop are frequently distinguished from ordinary stock and may require specialty wording, stage definitions, and separate limits. Do not assume a standard commercial property form insures living cannabis plants the same way as finished goods.",
      },
      {
        question: "Does property insurance include equipment breakdown?",
        answer:
          "Often not automatically. Many property forms restrict internal mechanical or electrical breakdown. Equipment breakdown coverage, where purchased, may address certain sudden failures of HVAC, lighting, or production equipment subject to exclusions — consequential crop or spoilage loss may need additional terms.",
      },
      {
        question: "Is product recall included with product liability?",
        answer:
          "Usually not. Product liability may respond to certain third-party injury or property-damage claims. Product recall insurance, where purchased, targets defined first-party withdrawal expenses. Regulatory recall obligations under the Cannabis Regulations exist independently of either coverage.",
      },
      {
        question: "What information helps quote a cannabis producer?",
        answer:
          "Expect questions about licence class and activities, site diagrams, security measures, building and equipment values, canopy or production capacity, plant/stock stage values, products manufactured, quality/recall systems, prior losses, and contract insurance requirements. Accurate stage values and equipment lists improve specialty market submissions.",
      },
    ],
    ctaHeading: "Ready to review cannabis producer coverage?",
    ctaSubhead:
      "Share your licence class, site profile, plant and stock values, and processing activities — we will compare specialty markets and explain what may fit, subject to underwriting.",
    serviceName: "Cannabis Producer Insurance",
  },
];
