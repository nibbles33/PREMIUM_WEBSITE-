"use client";

import {
  Banknote,
  Beef,
  FileCheck,
  Gavel,
  ScrollText,
  Shield,
  ShieldCheck,
  Tractor,
  Warehouse,
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
      { label: "Commercial Insurance Hub", href: "/commercial-insurance/" },
      { label: "Food Truck & Trailer", href: "/food-truck-insurance/" },
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
};
