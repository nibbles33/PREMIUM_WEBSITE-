import type { Metadata } from "next";
import {
  KeyRound,
  Package,
  Shield,
  Sofa,
} from "lucide-react";
import LineInsurancePage, {
  insuranceAgencyProvider,
  sharedBrokerCopy,
} from "@/components/LineInsurancePage";

export const metadata: Metadata = {
  title: "Tenant Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Tenant insurance for Windsor-Essex renters — contents, personal liability, and additional living expenses explained by an independent broker.",
  alternates: { canonical: "/tenant-insurance/" },
};

const coverageTypes = [
  {
    title: "Contents Coverage",
    description:
      "Protects your belongings — furniture, electronics, clothing, and personal items — against theft, fire, water damage, and other covered perils.",
    icon: Sofa,
  },
  {
    title: "Personal Liability",
    description:
      "Covers you if you accidentally cause injury or property damage to others — including incidents inside your rental unit.",
    icon: Shield,
  },
  {
    title: "Additional Living Expenses",
    description:
      "Helps with temporary housing and essential costs if a covered loss forces you out of your rental while repairs are made.",
    icon: Package,
  },
  {
    title: "No Building Coverage",
    description:
      "Tenant policies do not insure the building structure — that is the landlord's responsibility. Your policy focuses on what you own and your liability.",
    icon: KeyRound,
  },
];

const faqItems = [
  {
    question: "Is tenant insurance required in Ontario?",
    answer:
      "It is not mandated by provincial law, but many landlords require proof of tenant insurance in the lease. Even without a requirement, it protects your belongings and liability — the landlord's policy does not cover your stuff.",
  },
  {
    question: "Does tenant insurance cover my roommate's belongings?",
    answer:
      "Generally, a tenant policy covers the named insured and their household as defined in the policy. Roommates often need separate policies or need to be listed properly. Ask your broker how your household should be set up.",
  },
  {
    question: "Will tenant insurance cover water damage from another unit?",
    answer:
      "If water from a neighbouring unit damages your belongings, your contents coverage may respond depending on the cause and policy wording. Liability coverage may also apply if you cause damage to another unit. Specifics depend on the loss and policy — a broker can explain typical scenarios.",
  },
  {
    question: "How is tenant insurance different from condo insurance?",
    answer:
      "Tenants insure contents and liability only — they do not own the unit. Condo owners need coverage for their unit interests, improvements, and often loss assessment. The right product depends on whether you rent or own.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Tenant Insurance",
  description:
    "Tenant insurance for Windsor-Essex renters — contents, liability, and additional living expenses.",
  provider: insuranceAgencyProvider(),
  areaServed: { "@type": "AdministrativeArea", name: "Windsor-Essex" },
  serviceType: "Tenant Insurance",
};

export default function TenantInsurancePage() {
  return (
    <LineInsurancePage
      heroHeadingId="tenant-hero-heading"
      eyebrow="Personal Insurance"
      headline="Tenant Insurance"
      subhead="Protection for renters — your belongings, your liability, and help with living expenses if a covered loss displaces you."
      photographySlug="tenant"
      quoteHref="/get-a-quote?type=home&homeType=tenant"
      quoteLabel="Get a Tenant Quote"
      coverageIntro="Tenant insurance focuses on what you own and your personal liability — not the building itself."
      coverageAccent="#7A6B5A"
      coverageTypes={coverageTypes}
      whoItIsFor="Tenant insurance is for anyone renting an apartment, house, condo unit, or basement suite in Windsor-Essex. Whether you are a student, a young professional, or a long-term renter, a tenant policy protects your personal property and liability exposure."
      considerations={[
        {
          title: "Landlord requirements",
          description:
            "Many leases require minimum liability limits and proof of insurance. Keep your policy active for the full lease term and provide certificates when your landlord asks.",
        },
        {
          title: "Valuable items",
          description:
            "Jewellery, bikes, collectibles, and high-end electronics may need scheduled items or higher sub-limits. Tell your broker about anything that would be costly to replace.",
        },
        {
          title: "Home-based work",
          description:
            "If you run a business from your rental, standard tenant policies may limit business-related claims. Flag home office or client visit activity to your broker.",
        },
      ]}
      relatedLinks={[
        { label: "Home Insurance", href: "/home-insurance/" },
        { label: "Condo Insurance", href: "/condo-insurance/" },
        { label: "Landlord Insurance", href: "/landlord-insurance/" },
      ]}
      brokerCopy={sharedBrokerCopy}
      faqTitle="Tenant insurance FAQ"
      faqIntro="Straight answers for Ontario renters."
      faqItems={faqItems}
      ctaHeadingId="tenant-cta-heading"
      ctaHeading="Ready to protect your rental?"
      ctaSubhead="Tell us about your rental — we will compare tenant options and explain what is covered."
      jsonLd={jsonLd}
    />
  );
}
