import type { Metadata } from "next";
import {
  FileCheck,
  Gavel,
  ScrollText,
  ShieldCheck,
} from "lucide-react";
import LineInsurancePage, {
  insuranceAgencyProvider,
  sharedBrokerCopy,
} from "@/components/LineInsurancePage";

export const metadata: Metadata = {
  title: "Bond Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Surety bonds through an independent Windsor-Essex broker — contract & performance bonds, bid bonds, license & permit bonds, and fidelity bonds.",
};

const coverageTypes = [
  {
    title: "Contract & Performance Bonds",
    description:
      "Guarantees a contracted project will be completed as agreed.",
    icon: FileCheck,
  },
  {
    title: "Bid Bonds",
    description:
      "Required when submitting a bid on certain contracts, guaranteeing you'll honor your bid.",
    icon: Gavel,
  },
  {
    title: "License & Permit Bonds",
    description:
      "Meets bonding requirements for certain licenses and permits.",
    icon: ScrollText,
  },
  {
    title: "Fidelity Bonds",
    description:
      "Protects a business against losses caused by employee dishonesty.",
    icon: ShieldCheck,
  },
];

const faqItems = [
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
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Bond Insurance",
  description:
    "Surety bonds through an independent Windsor-Essex broker — contract, performance, bid, license, and fidelity bonds.",
  provider: insuranceAgencyProvider(),
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Windsor-Essex",
  },
  serviceType: "Surety Bonds",
};

export default function BondingInsurancePage() {
  return (
    <LineInsurancePage
      heroHeadingId="bond-hero-heading"
      eyebrow="Bond Insurance"
      headline="Bond Insurance"
      subhead="Surety bonds for contractors and businesses that need to meet contract, licensing, or bidding requirements."
      photographySlug="bonding-insurance"
      quoteHref="/get-a-quote?type=business"
      quoteLabel="Get a Bond Quote"
      coverageIntro="Common surety bonds that help you bid, contract, license, and protect against employee dishonesty."
      coverageAccent="#5B6B7A"
      coverageTypes={coverageTypes}
      brokerCopy={sharedBrokerCopy}
      faqTitle="Bond insurance FAQ"
      faqIntro="Straight answers to common surety bond questions."
      faqItems={faqItems}
      ctaHeadingId="bond-cta-heading"
      ctaHeading="Ready to get bonded?"
      ctaSubhead="Tell us about the contract or license — we'll help you arrange the right bond."
      jsonLd={jsonLd}
    />
  );
}
