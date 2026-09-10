import type { Metadata } from "next";
import {
  KeyRound,
  Scale,
  Shield,
  Sofa,
} from "lucide-react";
import LineInsurancePage, {
  insuranceAgencyProvider,
  sharedBrokerCopy,
} from "@/components/LineInsurancePage";

export const metadata: Metadata = {
  title: "Condo Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Condo insurance for Windsor-Essex unit owners — contents, improvements, liability, and loss assessment coverage explained by an independent broker.",
  alternates: { canonical: "/condo-insurance/" },
};

const coverageTypes = [
  {
    title: "Unit Contents & Improvements",
    description:
      "Covers your belongings and upgrades you have made inside the unit — finishes, fixtures, and betterments beyond what the corporation's policy includes.",
    icon: Sofa,
  },
  {
    title: "Personal Liability",
    description:
      "Protects you if someone is injured in your unit or you are responsible for damage to another unit or common areas.",
    icon: Shield,
  },
  {
    title: "Loss Assessment Coverage",
    description:
      "Can help with your share of a special assessment if the condominium corporation's master policy limits are exceeded by a covered loss.",
    icon: Scale,
  },
  {
    title: "Additional Living Expenses",
    description:
      "May cover temporary housing and related costs if a covered loss makes your unit uninhabitable while repairs are underway.",
    icon: KeyRound,
  },
];

const faqItems = [
  {
    question: "Doesn't my condo corporation already have insurance?",
    answer:
      "Yes — the corporation carries a master policy for the building and common elements. Your unit policy fills gaps: your contents, improvements inside the unit, personal liability, and often loss assessment coverage. What the master policy covers varies by corporation, so it is worth reviewing your status certificate and policy with a broker.",
  },
  {
    question: "What is loss assessment coverage?",
    answer:
      "If a major insured loss hits the building and the corporation's master policy limits are not enough, owners may be assessed for the shortfall. Loss assessment coverage on your condo policy can help with your portion, subject to policy limits and conditions.",
  },
  {
    question: "Do I need condo insurance if I rent out my unit?",
    answer:
      "If you lease your unit, you still need appropriate coverage for your interests as an owner — and landlord-related risks may require different limits or endorsements. Tell your broker how the unit is used so the policy reflects that.",
  },
  {
    question: "How much contents coverage do I need?",
    answer:
      "That depends on what you own — furniture, electronics, clothing, and any upgrades you have paid for inside the unit. A room-by-room inventory helps avoid underinsuring. Your broker can help you think through realistic limits.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Condo Insurance",
  description:
    "Condo insurance for Windsor-Essex unit owners — contents, liability, improvements, and loss assessment.",
  provider: insuranceAgencyProvider(),
  areaServed: { "@type": "AdministrativeArea", name: "Windsor-Essex" },
  serviceType: "Condo Insurance",
};

export default function CondoInsurancePage() {
  return (
    <LineInsurancePage
      heroHeadingId="condo-hero-heading"
      eyebrow="Personal Insurance"
      headline="Condo Insurance"
      subhead="Coverage for what your corporation's master policy does not — your unit, your belongings, and your liability as an owner."
      photographySlug="condo"
      quoteHref="/get-a-quote?type=home&homeType=condo"
      quoteLabel="Get a Condo Quote"
      coverageIntro="Condo policies focus on the gaps between your corporation's coverage and what you actually own inside the unit."
      coverageAccent="#6B7A8A"
      coverageTypes={coverageTypes}
      whoItIsFor="Condo insurance is for unit owners in Windsor-Essex — whether you live in the unit full time, use it as a secondary residence, or own it as an investment. It is designed around the split between the corporation's master policy and your personal interest in the unit."
      considerations={[
        {
          title: "Master policy vs. unit policy",
          description:
            "Review what your corporation insures — common elements, standard unit finishes, and liability for the corporation — so your personal policy complements rather than duplicates coverage.",
        },
        {
          title: "Upgrades and betterments",
          description:
            "Kitchen renovations, upgraded flooring, and custom built-ins may exceed standard unit definitions. Document improvements so contents and betterments limits reflect what you have invested.",
        },
        {
          title: "Deductible assessments",
          description:
            "Some policies include coverage if the corporation assesses owners for the master policy deductible after a claim. Limits and eligibility vary by carrier.",
        },
      ]}
      relatedLinks={[
        { label: "Home Insurance", href: "/home-insurance/" },
        { label: "Tenant Insurance", href: "/tenant-insurance/" },
        { label: "Landlord Insurance", href: "/landlord-insurance/" },
        { label: "Cottage Insurance", href: "/cottage-insurance/" },
      ]}
      brokerCopy={sharedBrokerCopy}
      faqTitle="Condo insurance FAQ"
      faqIntro="Common questions about condo coverage in Ontario."
      faqItems={faqItems}
      ctaHeadingId="condo-cta-heading"
      ctaHeading="Ready to protect your condo?"
      ctaSubhead="Tell us about your unit — we will compare options and explain how your policy fits with the corporation's master coverage."
      jsonLd={jsonLd}
    />
  );
}
