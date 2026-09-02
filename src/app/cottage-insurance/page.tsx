import type { Metadata } from "next";
import {
  Droplets,
  Home,
  Snowflake,
  Sun,
} from "lucide-react";
import LineInsurancePage, {
  insuranceAgencyProvider,
  sharedBrokerCopy,
} from "@/components/LineInsurancePage";

export const metadata: Metadata = {
  title: "Cottage Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Cottage and seasonal property insurance for Windsor-Essex — secondary homes, vacancy, water proximity, and winterization considerations explained by an independent broker.",
  alternates: { canonical: "/cottage-insurance/" },
};

const coverageTypes = [
  {
    title: "Seasonal Dwelling Coverage",
    description:
      "Protects your cottage or seasonal home's structure and landlord-owned fixtures against covered perils while the property is used part of the year.",
    icon: Home,
  },
  {
    title: "Contents & Personal Property",
    description:
      "Covers belongings kept at the cottage — furniture, appliances, watercraft stored on site, and recreational equipment — within policy limits.",
    icon: Sun,
  },
  {
    title: "Liability Protection",
    description:
      "Covers injury or property damage claims arising from your ownership or use of the cottage property, including guest and recreational activity exposure.",
    icon: Droplets,
  },
  {
    title: "Additional Living Expenses",
    description:
      "May help with temporary accommodation if a covered loss makes the cottage uninhabitable during the season you planned to use it.",
    icon: Snowflake,
  },
];

const faqItems = [
  {
    question: "Is cottage insurance different from home insurance?",
    answer:
      "Often yes. Seasonal and secondary properties have different occupancy patterns, maintenance expectations, and distance from emergency services. Carriers may use specific cottage or seasonal-dwelling forms with distinct conditions around vacancy, heating, and water proximity.",
  },
  {
    question: "Do I need to winterize my cottage for coverage?",
    answer:
      "Many policies require specific winterization steps if the cottage is closed for the season — draining plumbing, maintaining heat, or having someone check the property. Failure to follow policy conditions can affect a claim. Your broker can outline what your carrier expects.",
  },
  {
    question: "Does cottage insurance cover my boat at the dock?",
    answer:
      "Boats and motors are usually insured separately under a watercraft policy or endorsement. Tell your broker what you keep at the cottage so nothing important is left uninsured.",
  },
  {
    question: "What if I rent my cottage occasionally?",
    answer:
      "Short-term or seasonal rentals change liability and property exposure. Standard cottage policies may restrict or exclude rental use. Disclose any rental activity so your broker can check eligibility and endorsements.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Cottage Insurance",
  description:
    "Cottage and seasonal property insurance for Windsor-Essex — secondary homes, vacancy, and water-related risks.",
  provider: insuranceAgencyProvider(),
  areaServed: { "@type": "AdministrativeArea", name: "Windsor-Essex" },
  serviceType: "Cottage Insurance",
};

export default function CottageInsurancePage() {
  return (
    <LineInsurancePage
      heroHeadingId="cottage-hero-heading"
      eyebrow="Personal Insurance"
      headline="Cottage Insurance"
      subhead="Coverage for seasonal and secondary properties — built around part-year occupancy, waterfront risks, and the realities of closing up for winter."
      photographySlug="cottage"
      quoteHref="/get-a-quote?type=home&homeType=home"
      quoteLabel="Get a Cottage Quote"
      coverageIntro="Cottage policies account for how seasonal properties are used, maintained, and left unattended."
      coverageAccent="#4A7A6A"
      coverageTypes={coverageTypes}
      whoItIsFor="Cottage insurance is for Windsor-Essex owners of seasonal homes, lake properties, and secondary residences used part of the year — whether you visit on weekends, for the summer season, or eventually plan to retire there."
      considerations={[
        {
          title: "Seasonal occupancy",
          description:
            "Tell your broker how many months the cottage is occupied and who checks on it when you are away. Extended vacancy periods may require specific policy conditions.",
        },
        {
          title: "Water proximity",
          description:
            "Properties on lakes or rivers may face different wind, ice, and flood exposure. Sewer backup and overland water options should be discussed based on location.",
        },
        {
          title: "Winterization",
          description:
            "If you close the cottage for winter, follow your policy's requirements for heat, plumbing, and property checks. Document what you do each fall.",
        },
        {
          title: "Road access and emergency response",
          description:
            "Remote or island properties may have longer emergency response times. Fire department distance and water supply can affect how carriers view the risk.",
        },
      ]}
      relatedLinks={[
        { label: "Home Insurance", href: "/home-insurance/" },
        { label: "Condo Insurance", href: "/condo-insurance/" },
        { label: "Boat Insurance", href: "/boat-insurance/" },
        { label: "Landlord Insurance", href: "/landlord-insurance/" },
      ]}
      brokerCopy={sharedBrokerCopy}
      faqTitle="Cottage insurance FAQ"
      faqIntro="Common questions about insuring seasonal Ontario properties."
      faqItems={faqItems}
      ctaHeadingId="cottage-cta-heading"
      ctaHeading="Ready to protect your cottage?"
      ctaSubhead="Tell us about your seasonal property — we will compare options and explain occupancy and winterization requirements."
      jsonLd={jsonLd}
    />
  );
}
