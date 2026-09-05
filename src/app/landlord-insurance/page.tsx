import type { Metadata } from "next";
import {
  Building2,
  DollarSign,
  Hammer,
  Shield,
} from "lucide-react";
import LineInsurancePage, {
  insuranceAgencyProvider,
  sharedBrokerCopy,
} from "@/components/LineInsurancePage";

export const metadata: Metadata = {
  title: "Landlord Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Landlord insurance for Windsor-Essex rental property owners — dwelling, liability, loss of rental income, and tenant-related risks explained by an independent broker.",
  alternates: { canonical: "/landlord-insurance/" },
};

const coverageTypes = [
  {
    title: "Rental Dwelling Coverage",
    description:
      "Protects the building you rent out — structure, attached fixtures, and landlord-owned items on the premises — against covered perils.",
    icon: Building2,
  },
  {
    title: "Landlord Liability",
    description:
      "Covers injury or property damage claims tied to your role as a rental property owner, subject to policy terms.",
    icon: Shield,
  },
  {
    title: "Loss of Rental Income",
    description:
      "May replace lost rent if a covered loss makes the unit uninhabitable during repairs, within policy limits and waiting periods.",
    icon: DollarSign,
  },
  {
    title: "Tenant-Caused Damage",
    description:
      "Optional coverage may respond when a tenant causes intentional or accidental damage beyond normal wear and tear — wording and limits vary.",
    icon: Hammer,
  },
];

const faqItems = [
  {
    question: "Is landlord insurance the same as home insurance?",
    answer:
      "No. A standard home policy assumes you live in the property. Rental properties face different occupancy, liability, and maintenance risks. Landlord or rental-dwelling policies are designed for properties you lease to others.",
  },
  {
    question: "Should my tenant have their own insurance?",
    answer:
      "Yes — tenant insurance protects the renter's belongings and liability. It does not replace landlord coverage for the building. Requiring tenant insurance in your lease is a common and sensible practice.",
  },
  {
    question: "Does landlord insurance cover tenant default on rent?",
    answer:
      "Standard property policies focus on physical damage and liability, not rent default. Loss of rental income coverage applies when a covered peril makes the unit uninhabitable — not when a tenant stops paying. Eviction and rent guarantee products are separate considerations.",
  },
  {
    question: "What if I rent out a basement suite in my home?",
    answer:
      "Partial rentals and secondary suites change your risk profile. Your existing home policy may not cover rental activity. Tell your broker exactly how the property is occupied so the right product or endorsement is in place.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Landlord Insurance",
  description:
    "Landlord insurance for Windsor-Essex rental property owners — dwelling, liability, and loss of rental income.",
  provider: insuranceAgencyProvider(),
  areaServed: { "@type": "AdministrativeArea", name: "Windsor-Essex" },
  serviceType: "Landlord Insurance",
};

export default function LandlordInsurancePage() {
  return (
    <LineInsurancePage
      heroHeadingId="landlord-hero-heading"
      eyebrow="Personal Insurance"
      headline="Landlord Insurance"
      subhead="Coverage built for rental property owners — protect the dwelling, manage liability, and plan for income interruption after a covered loss."
      photographySlug="landlord"
      quoteHref="/get-a-quote?type=home&homeType=landlord"
      quoteLabel="Get a Landlord Quote"
      coverageIntro="Landlord policies address the risks that come with owning property someone else lives in."
      coverageAccent="#8A7A6A"
      coverageTypes={coverageTypes}
      whoItIsFor="Landlord insurance is for Windsor-Essex property owners who rent out houses, duplexes, condo units, or other residential dwellings. Whether you have one rental or several, the right policy reflects how each property is occupied and maintained."
      considerations={[
        {
          title: "Vacancy and seasonal gaps",
          description:
            "Extended vacancies can affect coverage or require notification to your insurer. Tell your broker if a unit will be empty between tenants.",
        },
        {
          title: "Maintenance and inspections",
          description:
            "Insurers expect reasonable upkeep — working smoke detectors, safe stairs and railings, and timely repairs. Good maintenance supports both tenant safety and insurability.",
        },
        {
          title: "Short-term rentals",
          description:
            "Platforms like Airbnb change occupancy and liability exposure. Standard landlord policies may exclude or limit short-term rental activity — disclose how the property is marketed.",
        },
      ]}
      relatedLinks={[
        { label: "Home Insurance", href: "/home-insurance/" },
        { label: "Condo Insurance", href: "/condo-insurance/" },
        { label: "Tenant Insurance", href: "/tenant-insurance/" },
        { label: "Cottage Insurance", href: "/cottage-insurance/" },
      ]}
      brokerCopy={sharedBrokerCopy}
      faqTitle="Landlord insurance FAQ"
      faqIntro="Questions rental property owners ask most often."
      faqItems={faqItems}
      ctaHeadingId="landlord-cta-heading"
      ctaHeading="Ready to protect your rental property?"
      ctaSubhead="Tell us about your rental units — we will compare landlord options and explain the coverage gaps to watch for."
      jsonLd={jsonLd}
    />
  );
}
