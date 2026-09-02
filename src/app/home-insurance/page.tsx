import type { Metadata } from "next";
import {
  Home,
  Package,
  Shield,
  Sofa,
} from "lucide-react";
import LineInsurancePage, {
  insuranceAgencyProvider,
  sharedBrokerCopy,
} from "@/components/LineInsurancePage";

export const metadata: Metadata = {
  title: "Home Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Home insurance through an independent Windsor-Essex broker — dwelling, contents, liability, and additional living expenses explained in plain language.",
};

const coverageTypes = [
  {
    title: "Dwelling Coverage",
    description:
      "Repairs or rebuilds your home's structure after covered damage.",
    icon: Home,
  },
  {
    title: "Contents Coverage",
    description:
      "Protects your belongings — furniture, electronics, valuables — against theft or damage.",
    icon: Sofa,
  },
  {
    title: "Liability Protection",
    description:
      "Covers you if someone is injured on your property or you're responsible for damage to others.",
    icon: Shield,
  },
  {
    title: "Additional Living Expenses",
    description:
      "Covers temporary housing and costs if your home becomes uninhabitable after a covered loss.",
    icon: Package,
  },
];

const faqItems = [
  {
    question: "Do I need home insurance if I own my home outright?",
    answer:
      "It isn't legally required in Ontario if you own your home free and clear, but it's strongly recommended. If you have a mortgage, your lender typically requires home insurance until the loan is paid off.",
  },
  {
    question: "Does home insurance cover flooding?",
    answer:
      "Standard home policies often exclude overland flooding (water that enters from outside, such as heavy rain or overflow). Optional flood coverage may be available depending on your property and carrier — worth discussing with a broker so you know what's included and what isn't.",
  },
  {
    question:
      "What's the difference between actual cash value and replacement cost coverage?",
    answer:
      "Actual cash value pays what your damaged property was worth at the time of the loss, after depreciation. Replacement cost aims to cover repairing or replacing with new items of similar kind and quality, without subtracting for age or wear — usually within policy limits and conditions.",
  },
  {
    question: "Do I need separate coverage for a home business?",
    answer:
      "Many home policies limit or exclude claims tied to business activity run from the home. If you work from home, keep inventory, or see clients there, flag it to a broker so they can check your limits or suggest a business endorsement or separate policy.",
  },
  {
    question: "What information do I need for a quote?",
    answer:
      "Have your property details ready (address, year built, approximate square footage, and construction basics), plus information about any current coverage. That helps your broker compare options accurately.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Home Insurance",
  description:
    "Home insurance through an independent Windsor-Essex broker — dwelling, contents, liability, and additional living expenses.",
  provider: insuranceAgencyProvider(),
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Windsor-Essex",
  },
  serviceType: "Home Insurance",
};

export default function HomeInsurancePage() {
  return (
    <LineInsurancePage
      heroHeadingId="home-hero-heading"
      eyebrow="Personal Insurance"
      headline="Home Insurance"
      subhead="Protection for your property, belongings, and liability — whether you own, rent, or somewhere in between."
      photographySlug="home-insurance"
      quoteHref="/get-a-quote?type=home"
      quoteLabel="Get a Home Quote"
      coverageIntro="Standard home insurance building blocks, explained without the jargon."
      coverageAccent="#B37A5A"
      coverageTypes={coverageTypes}
      brokerCopy={sharedBrokerCopy}
      faqTitle="Home insurance FAQ"
      faqIntro="Straight answers to common home insurance questions."
      faqItems={faqItems}
      ctaHeadingId="home-cta-heading"
      ctaHeading="Ready to protect your home?"
      ctaSubhead="Tell us about your property — we'll compare options and explain what actually fits."
      jsonLd={jsonLd}
    />
  );
}
