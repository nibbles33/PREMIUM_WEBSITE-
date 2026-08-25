import type { Metadata } from "next";
import {
  Warehouse,
  Tractor,
  Shield,
  Beef,
} from "lucide-react";
import LineInsurancePage, {
  insuranceAgencyProvider,
  sharedBrokerCopy,
} from "@/components/LineInsurancePage";

export const metadata: Metadata = {
  title: "Farm Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Farm insurance through an independent Windsor-Essex broker — farm property, equipment & machinery, farm liability, and livestock coverage for Essex County farms.",
};

const coverageTypes = [
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
];

const faqItems = [
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
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Farm Insurance",
  description:
    "Farm insurance through an independent Windsor-Essex broker — farm property, equipment, liability, and livestock coverage.",
  provider: insuranceAgencyProvider(),
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Windsor-Essex",
  },
  serviceType: "Farm Insurance",
};

export default function FarmInsurancePage() {
  return (
    <LineInsurancePage
      heroHeadingId="farm-hero-heading"
      eyebrow="Farm Insurance"
      headline="Farm Insurance"
      subhead="Coverage built for Essex County's working farms — from the farmhouse to the equipment in the field."
      quoteHref="/get-a-quote?type=farm"
      quoteLabel="Get a Farm Quote"
      coverageIntro="Core coverages that protect farm buildings, machinery, liability, and livestock."
      coverageAccent="#7A8B5C"
      coverageTypes={coverageTypes}
      brokerCopy={sharedBrokerCopy}
      faqTitle="Farm insurance FAQ"
      faqIntro="Straight answers to common farm insurance questions."
      faqItems={faqItems}
      ctaHeadingId="farm-cta-heading"
      ctaHeading="Ready to cover your farm?"
      ctaSubhead="Tell us about your operation — we'll compare options and explain what fits."
      jsonLd={jsonLd}
    />
  );
}
