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
  ShieldCheck,
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
    metaTitle: "Bond Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Surety bonds through an independent Windsor-Essex broker — contract & performance bonds, bid bonds, license & permit bonds, and fidelity bonds.",
    eyebrow: "Bond Insurance",
    headline: "Bond Insurance",
    heroLead:
      "Surety bonds for contractors and businesses that need to meet contract, licensing, or bidding requirements.",
    photographySlug: "bonding-insurance",
    accentColor: "#5B6B7A",
    quoteHref: "/get-a-quote?type=business",
    quoteLabel: "Get a Bond Quote",
    trustStatement:
      "Surety bonds through an independent Windsor-Essex broker — contract, performance, bid, license, and fidelity bonds arranged with plain-language guidance.",
    coverageIntro:
      "Common surety bonds for bidding, project performance, subcontractor payment, licensing, and employee dishonesty.",
    coverageItems: [
      {
        title: "Bid Bonds",
        description:
          "Required when submitting a bid on certain contracts — guarantees you will honour your bid and enter the contract if selected.",
        icon: Gavel,
      },
      {
        title: "Performance Bonds",
        description:
          "Guarantees completion of the contracted work according to project terms if the principal defaults.",
        icon: FileCheck,
      },
      {
        title: "Labour & Material Payment Bonds",
        description:
          "Ensures subcontractors and suppliers are paid for work and materials on a project, protecting the project owner from liens.",
        icon: Banknote,
      },
      {
        title: "Licence & Permit Bonds",
        description:
          "Meets bonding requirements for certain licences and permits — common for contractors and regulated trades.",
        icon: ScrollText,
      },
      {
        title: "Fidelity Bonds",
        description:
          "Protects a business against losses caused by employee dishonesty.",
        icon: ShieldCheck,
      },
    ],
    brokerSteps: commercialBrokerSteps,
    relatedProducts: [],
    faqTitle: "Bond insurance FAQ",
    faqIntro: "Straight answers to common surety bond questions.",
    faqItems: [
      {
        question: "What's the difference between insurance and a surety bond?",
        answer:
          "Insurance protects you against covered losses. A surety bond is a three-party guarantee — you (the principal), the obligee who requires the bond, and the surety. If you fail to meet the bonded obligation, the surety may pay the obligee and then seek recovery from you.",
      },
      {
        question: "Do I need a bond to bid on a contract?",
        answer:
          "Many public and private tenders require a bid bond with your submission, and a performance or payment bond if you win. Requirements vary by owner and project — check the tender documents, and your broker can help arrange the right bonds on the timeline you need.",
      },
      {
        question: "How is bond pricing determined?",
        answer:
          "Sureties look at the bond type and amount, your financial strength, experience, credit, and the project or license involved. Rates are typically a percentage of the bond amount and differ between bid, performance, and license bonds.",
      },
      {
        question: "What information do I need to apply for a bond?",
        answer:
          "Expect requests for business financials, personal financial statements for owners, project or license details, prior bonding history, and company experience. Larger bonds usually need more documentation than small license bonds.",
      },
      {
        question: "What is a labour and material payment bond?",
        answer:
          "It protects the project owner by ensuring subcontractors and suppliers get paid. If the contractor fails to pay, the surety may step in — then seek recovery from the contractor.",
      },
    ],
    ctaHeading: "Ready to get bonded?",
    ctaSubhead: "Tell us about the contract or license — we'll help you arrange the right bond.",
    serviceName: "Surety Bonds",
  }),
  "farm-insurance": buildPilotProductConfig({
    slug: "farm-insurance",
    metaTitle: "Farm Insurance in Windsor-Essex | Premium Insurance Brokers",
    metaDescription:
      "Farm insurance through an independent Windsor-Essex broker — farm property, equipment & machinery, farm liability, and livestock coverage for Essex County farms.",
    eyebrow: "Farm Insurance",
    headline: "Farm Insurance",
    heroLead:
      "Coverage built for Essex County's working farms — from the farmhouse to the equipment in the field.",
    photographySlug: "farm-insurance",
    accentColor: "#7A8B5C",
    quoteHref: "/get-a-quote?type=farm",
    quoteLabel: "Get a Farm Quote",
    trustStatement:
      "Farm insurance through an independent Windsor-Essex broker — farm property, equipment, liability, and livestock coverage for Essex County farms.",
    coverageIntro:
      "Core coverages that protect farm buildings, machinery, liability, and livestock.",
    coverageItems: [
      {
        title: "Farm Property Coverage",
        description:
          "Protects farmhouses, barns, and other structures on your property.",
        icon: Warehouse,
      },
      {
        title: "Equipment & Machinery",
        description:
          "Covers tractors, implements, and other farm equipment against damage or loss.",
        icon: Tractor,
      },
      {
        title: "Farm Liability",
        description:
          "Protects you if someone is injured on your property or by your farm operations.",
        icon: Shield,
      },
      {
        title: "Livestock Coverage",
        description:
          "Coverage for livestock against specified perils, where applicable.",
        icon: Beef,
      },
    ],
    brokerSteps: commercialBrokerSteps,
    relatedProducts: relatedLinksToProducts([
      { label: "Greenhouse & Agribusiness", href: "/greenhouse-agribusiness-insurance/" },
      { label: "Commercial Insurance Hub", href: "/commercial-insurance/" },
    ]),
    relatedIntro:
      "One policy is rarely the whole picture. Explore other coverage from Premium.",
    faqTitle: "Farm insurance FAQ",
    faqIntro: "Straight answers to common farm insurance questions.",
    faqItems: [
      {
        question: "Is farm insurance different from regular home insurance?",
        answer:
          "Yes. A standard home policy is built for residential risk. Farm insurance is designed for working agricultural property — barns, outbuildings, equipment, livestock, and liability tied to farming operations that personal home policies often exclude or limit.",
      },
      {
        question: "Does my policy cover farm equipment away from the property?",
        answer:
          "It depends on the wording. Some farm policies extend equipment coverage while machinery is in transit or working off-site; others limit coverage to the scheduled location. Tell your broker how and where equipment is used so limits and endorsements match.",
      },
      {
        question:
          "Do I need separate liability coverage for agritourism or farm-stand sales?",
        answer:
          "Often yes, or at least a specific endorsement. Activities that bring the public onto the farm — pick-your-own, farm stands, tours, or events — can fall outside a basic farm liability form. Flag those operations so coverage keeps up with how you earn income.",
      },
      {
        question: "What information do I need for a farm quote?",
        answer:
          "Expect questions about acreage, buildings and construction, equipment lists and values, livestock, farming activities, any public-facing sales or events, and your current coverage or claims history. That helps carriers price the risk accurately.",
      },
    ],
    ctaHeading: "Ready to cover your farm?",
    ctaSubhead: "Tell us about your operation — we'll compare options and explain what fits.",
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
        description:
          "Greenhouse structures and other insured buildings/property can represent a significant part of the operation's exposure. Coverage depends on the property insured, policy terms and selected coverages.",
        icon: Building2,
      },
      {
        title: "Equipment & Machinery",
        description:
          "Greenhouse operations may rely on heating, ventilation, irrigation and other specialized operational equipment. Coverage for equipment and machinery depends on the policy and coverages purchased.",
        icon: Wrench,
      },
      {
        title: "Business Property & Stock",
        description:
          "Consider business contents, supplies and eligible stock or property used in the operation. How particular property is insured varies by policy and insurer.",
        icon: Package,
      },
      {
        title: "Business Interruption",
        description:
          "A covered property loss can also interrupt operations and affect business income. Business interruption coverage may respond to covered loss of income following an insured loss, subject to the policy terms, limits and coverage purchased.",
        icon: Briefcase,
      },
      {
        title: "Commercial Liability",
        description:
          "Greenhouse and agribusiness operations can have liability exposures arising from their premises and business activities. The appropriate liability protection depends on the nature and scale of the operation.",
        icon: Shield,
      },
      {
        title: "Equipment Breakdown",
        description:
          "Heating, electrical, ventilation, irrigation and other critical systems can create significant equipment-breakdown exposure. Equipment breakdown coverage may be available where purchased and remains subject to policy terms and exclusions.",
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
