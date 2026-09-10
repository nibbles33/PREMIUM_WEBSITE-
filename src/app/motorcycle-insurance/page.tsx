import type { Metadata } from "next";
import {
  HardHat,
  Motorbike,
  Shield,
  Wrench,
} from "lucide-react";
import LineInsurancePage, {
  insuranceAgencyProvider,
  sharedBrokerCopy,
} from "@/components/LineInsurancePage";

export const metadata: Metadata = {
  title: "Motorcycle Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Motorcycle insurance for Windsor-Essex riders — liability, physical damage, seasonal use, and gear considerations explained by an independent broker.",
  alternates: { canonical: "/motorcycle-insurance/" },
};

const coverageTypes = [
  {
    title: "Third-Party Liability",
    description:
      "Mandatory in Ontario — covers injury or damage you cause to others while operating your motorcycle on public roads.",
    icon: Shield,
  },
  {
    title: "Collision & Comprehensive",
    description:
      "Optional physical damage coverage for your motorcycle — collision for crashes and comprehensive for theft, vandalism, and non-collision events.",
    icon: Motorbike,
  },
  {
    title: "Accident Benefits",
    description:
      "Ontario accident benefits apply to motorcycle policies — medical, rehabilitation, and income support after an accident, within policy terms.",
    icon: HardHat,
  },
  {
    title: "Accessories & Gear",
    description:
      "Aftermarket parts, saddlebags, and riding gear may need scheduled coverage or higher limits — standard policies often cap accessory values.",
    icon: Wrench,
  },
];

const faqItems = [
  {
    question: "Is motorcycle insurance mandatory in Ontario?",
    answer:
      "Yes. You need at least third-party liability and accident benefits to ride on public roads. Physical damage coverage for your bike is optional but recommended if replacing it would be a financial hardship.",
  },
  {
    question: "Can I reduce coverage in the off-season?",
    answer:
      "Some carriers offer seasonal lay-up or reduced-use options when the motorcycle is stored. You typically must maintain minimum liability if the bike is registered, even when garaged. Ask your broker what is available without leaving gaps.",
  },
  {
    question: "Does my auto policy cover my motorcycle?",
    answer:
      "No — motorcycles require a separate policy. Auto and motorcycle risks, licensing, and rating are treated differently by insurers.",
  },
  {
    question: "Are passengers covered?",
    answer:
      "Passenger liability and accident benefits depend on your policy and endorsements. If you regularly carry a passenger, confirm how they are protected before you ride.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Motorcycle Insurance",
  description:
    "Motorcycle insurance for Windsor-Essex riders — liability, physical damage, and seasonal riding.",
  provider: insuranceAgencyProvider(),
  areaServed: { "@type": "AdministrativeArea", name: "Windsor-Essex" },
  serviceType: "Motorcycle Insurance",
};

export default function MotorcycleInsurancePage() {
  return (
    <LineInsurancePage
      heroHeadingId="motorcycle-hero-heading"
      eyebrow="Personal Insurance"
      headline="Motorcycle Insurance"
      subhead="Coverage built for how you ride — on-road liability, physical damage for your bike, and options that reflect Ontario's riding season."
      photographySlug="motorcycle"
      quoteHref="/get-a-quote?type=vehicle&vehicleType=motorcycle"
      quoteLabel="Get a Motorcycle Quote"
      coverageIntro="Motorcycle policies address riding-specific liability, physical damage, and seasonal use patterns."
      coverageAccent="#5B7A99"
      coverageTypes={coverageTypes}
      whoItIsFor="Motorcycle insurance is for Windsor-Essex riders with street bikes, cruisers, touring motorcycles, and other on-road machines — whether you commute occasionally or ride primarily on weekends during the season."
      considerations={[
        {
          title: "Seasonal riding",
          description:
            "Many riders store their motorcycle over winter. Discuss lay-up options, minimum liability during storage, and when to restore full coverage before the first spring ride.",
        },
        {
          title: "Storage and security",
          description:
            "Garaged storage, disc locks, and tracking devices can matter to insurers. Tell your broker where and how the bike is stored in the off-season.",
        },
        {
          title: "Riding gear and accessories",
          description:
            "Helmets, jackets, and aftermarket parts may exceed default accessory limits. Itemize valuable additions so limits reflect replacement cost.",
        },
        {
          title: "Licensing and training",
          description:
            "M1/M2 graduated licensing and rider training courses can affect eligibility and pricing with some carriers. Share your licence class and any training completed.",
        },
      ]}
      relatedLinks={[
        { label: "Auto Insurance", href: "/auto-insurance/" },
        { label: "Boat Insurance", href: "/boat-insurance/" },
      ]}
      brokerCopy={sharedBrokerCopy}
      faqTitle="Motorcycle insurance FAQ"
      faqIntro="Straight answers for Ontario riders."
      faqItems={faqItems}
      ctaHeadingId="motorcycle-cta-heading"
      ctaHeading="Ready to ride with confidence?"
      ctaSubhead="Tell us about your motorcycle — we will compare options and explain seasonal coverage choices."
      jsonLd={jsonLd}
    />
  );
}
