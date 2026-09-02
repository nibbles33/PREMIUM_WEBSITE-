import type { Metadata } from "next";
import {
  Car,
  CloudLightning,
  HeartPulse,
  Shield,
} from "lucide-react";
import LineInsurancePage, {
  insuranceAgencyProvider,
  sharedBrokerCopy,
} from "@/components/LineInsurancePage";

export const metadata: Metadata = {
  title: "Auto Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Ontario auto insurance through an independent Windsor-Essex broker — liability, collision, comprehensive, and accident benefits explained in plain language.",
};

const coverageTypes = [
  {
    title: "Liability Coverage",
    description:
      "Protects you if you're responsible for injury or damage to others.",
    icon: Shield,
  },
  {
    title: "Collision Coverage",
    description:
      "Repairs or replaces your vehicle after a collision, regardless of fault.",
    icon: Car,
  },
  {
    title: "Comprehensive Coverage",
    description:
      "Covers theft, vandalism, weather damage, and other non-collision events.",
    icon: CloudLightning,
  },
  {
    title: "Accident Benefits",
    description:
      "Medical, rehabilitation, and income replacement support after an accident — mandatory coverage in Ontario.",
    icon: HeartPulse,
  },
];

const faqItems = [
  {
    question: "Is auto insurance mandatory in Ontario?",
    answer:
      "Yes. All Ontario drivers are legally required to carry auto insurance. At minimum, that includes third-party liability and accident benefits. Optional coverages like collision and comprehensive protect your own vehicle.",
  },
  {
    question:
      "What's the difference between collision and comprehensive coverage?",
    answer:
      "Collision covers damage to your vehicle from a crash with another vehicle or object, regardless of fault. Comprehensive covers non-collision events such as theft, vandalism, hail, fire, and hitting an animal.",
  },
  {
    question: "Will my rates change if I switch brokers?",
    answer:
      "Your premium depends on your vehicle, driving history, coverage choices, and the carrier — not on which broker you call. An independent broker can compare multiple insurers, so you may find a better fit for your situation, but savings aren't guaranteed.",
  },
  {
    question: "What information do I need for a quote?",
    answer:
      "Have your vehicle details ready (make, model, year, and VIN if available), your driving history, and information about any current coverage. That helps your broker compare options accurately.",
  },
  {
    question: "Do I need collision and comprehensive coverage?",
    answer:
      "Not always. If your vehicle is financed or leased, your lender usually requires both. For an owned vehicle, it depends on the car's value and how much risk you're comfortable carrying. A broker can help you weigh the trade-offs.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Auto Insurance",
  description:
    "Ontario auto insurance through an independent Windsor-Essex broker — liability, collision, comprehensive, and accident benefits.",
  provider: insuranceAgencyProvider(),
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Windsor-Essex",
  },
  serviceType: "Auto Insurance",
};

export default function AutoInsurancePage() {
  return (
    <LineInsurancePage
      heroHeadingId="auto-hero-heading"
      eyebrow="Personal Insurance"
      headline="Auto Insurance"
      subhead="Coverage that keeps you moving — liability, collision, and comprehensive protection built around how you actually drive."
      photographySlug="auto-insurance"
      quoteHref="/get-a-quote?type=vehicle"
      quoteLabel="Get an Auto Quote"
      coverageIntro="Standard Ontario auto insurance building blocks, explained without the jargon."
      coverageAccent="#5B7A99"
      coverageTypes={coverageTypes}
      brokerCopy={sharedBrokerCopy}
      faqTitle="Auto insurance FAQ"
      faqIntro="Straight answers to common Ontario auto insurance questions."
      faqItems={faqItems}
      ctaHeadingId="auto-cta-heading"
      ctaHeading="Ready to get covered?"
      ctaSubhead="Tell us about your vehicle — we'll compare options and explain what actually fits."
      jsonLd={jsonLd}
    />
  );
}
