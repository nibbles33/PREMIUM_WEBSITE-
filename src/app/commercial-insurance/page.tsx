import type { Metadata } from "next";
import CommercialIndustryGrid from "@/components/CommercialIndustryGrid";
import LineInsurancePage, {
  insuranceAgencyProvider,
} from "@/components/LineInsurancePage";
import {
  QUOTE_BUSINESS,
  commercialBrokerCopy,
  commercialHubFaqs,
} from "@/data/commercial-industries";

export const metadata: Metadata = {
  title: "Commercial Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Commercial insurance for Windsor-Essex manufacturers, trucking fleets, contractors, restaurants, and more — industry-specific coverage through an independent broker.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Commercial Insurance",
  description:
    "Commercial insurance for Windsor-Essex businesses — industry-specific coverage through an independent broker.",
  provider: insuranceAgencyProvider(),
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Windsor-Essex",
  },
  serviceType: "Commercial Insurance",
};

export default function CommercialInsurancePage() {
  return (
    <LineInsurancePage
      heroHeadingId="commercial-hub-hero-heading"
      eyebrow="Commercial Insurance"
      headline="Commercial insurance, built for your industry"
      subhead="Windsor-Essex runs on manufacturing, trucking, and trades. We build coverage around the risks specific to your industry — not a generic business policy."
      quoteHref={QUOTE_BUSINESS}
      quoteLabel="Get a Commercial Quote"
      middleSection={<CommercialIndustryGrid />}
      brokerHeading="Why commercial clients work with Premium"
      brokerCopy={commercialBrokerCopy}
      faqTitle="Commercial insurance FAQ"
      faqIntro="Straight answers to common commercial insurance questions."
      faqItems={commercialHubFaqs}
      ctaHeadingId="commercial-hub-cta-heading"
      ctaHeading="Ready to protect your business?"
      ctaSubhead="Tell us about your operations — we'll compare commercial markets and explain what fits."
      jsonLd={jsonLd}
    />
  );
}
