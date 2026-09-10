import type { Metadata } from "next";
import {
  HeartPulse,
  Luggage,
  Plane,
  Shield,
} from "lucide-react";
import LineInsurancePage, {
  insuranceAgencyProvider,
  sharedBrokerCopy,
} from "@/components/LineInsurancePage";

export const metadata: Metadata = {
  title: "Travel Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Travel insurance guidance for Windsor-Essex travellers — emergency medical, trip cancellation, and travel-related risks explained by an independent broker.",
  alternates: { canonical: "/travel-insurance/" },
};

const coverageTypes = [
  {
    title: "Emergency Medical",
    description:
      "Covers unexpected medical treatment while travelling outside your home province — hospital visits, physician fees, and emergency services subject to policy limits and exclusions.",
    icon: HeartPulse,
  },
  {
    title: "Trip Cancellation & Interruption",
    description:
      "May reimburse prepaid, non-refundable trip costs if you must cancel or cut a trip short for covered reasons defined in the policy.",
    icon: Plane,
  },
  {
    title: "Baggage & Personal Effects",
    description:
      "Covers loss, theft, or damage to luggage and personal belongings during your trip, within stated limits and deductibles.",
    icon: Luggage,
  },
  {
    title: "Travel Liability",
    description:
      "Protects you if you accidentally cause injury or property damage to others while travelling abroad or within Canada.",
    icon: Shield,
  },
];

const faqItems = [
  {
    question: "Do I need travel insurance within Canada?",
    answer:
      "Provincial health plans cover only limited services outside your home province. An ambulance ride, hospital admission, or specialist visit in another province can leave you with out-of-pocket costs. Travel medical coverage fills those gaps for domestic trips.",
  },
  {
    question: "Does my credit card include travel insurance?",
    answer:
      "Some credit cards include travel medical or trip cancellation if you charge the trip to the card. Coverage varies widely — age limits, trip length caps, and exclusions are common. Review the certificate with a broker before relying on it as your only protection.",
  },
  {
    question: "Are pre-existing medical conditions covered?",
    answer:
      "Stability periods and medical questionnaires apply to most travel medical policies. Conditions must typically be stable for a defined period before departure. Disclose your health history accurately — incomplete disclosure can affect claims.",
  },
  {
    question: "When should I buy trip cancellation coverage?",
    answer:
      "Cancellation coverage is usually most effective when purchased soon after you make your first trip deposit, before any foreseeable reason to cancel arises. Waiting until illness or weather concerns appear can limit what is covered.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Travel Insurance",
  description:
    "Travel insurance guidance for Windsor-Essex — emergency medical, trip cancellation, and travel-related risks.",
  provider: insuranceAgencyProvider(),
  areaServed: { "@type": "AdministrativeArea", name: "Windsor-Essex" },
  serviceType: "Travel Insurance",
};

export default function TravelInsurancePage() {
  return (
    <LineInsurancePage
      heroHeadingId="travel-hero-heading"
      eyebrow="Personal Insurance"
      headline="Travel Insurance"
      subhead="Medical emergency and trip protection for travellers — explained clearly so you know what is covered before you leave Windsor-Essex."
      photographySlug="travel-insurance"
      quoteHref="/talk-to-a-broker/"
      quoteLabel="Talk to a Broker About Travel Coverage"
      secondaryCta={{ label: "Contact Us", href: "/contact/" }}
      coverageIntro="Travel policies address medical emergencies away from home and financial protection when plans change unexpectedly."
      coverageAccent="#6A7A8A"
      coverageTypes={coverageTypes}
      whoItIsFor="Travel insurance is for Windsor-Essex residents heading out of province or abroad — family vacations, snowbird stays, business travel, and students studying away from home. The right plan depends on your destination, health history, and trip cost."
      considerations={[
        {
          title: "Destination matters",
          description:
            "Coverage limits and eligibility differ for travel within Canada, to the United States, and overseas. Higher medical costs in the U.S. often require higher emergency medical limits.",
        },
        {
          title: "Trip cost and deposits",
          description:
            "If you have significant prepaid flights, tours, or accommodations, trip cancellation/interruption may be worth discussing. Know what reasons are covered and what documentation is required.",
        },
        {
          title: "Existing health coverage",
          description:
            "Workplace benefits or credit card coverage may overlap with a travel policy. A broker can help you avoid paying for duplicate protection — or identify gaps.",
        },
        {
          title: "Adventure and specialty activities",
          description:
            "Scuba diving, skiing, and organized sports may be excluded or require add-ons. Disclose planned activities before you purchase.",
        },
      ]}
      relatedLinks={[
        { label: "Auto Insurance", href: "/auto-insurance/" },
        { label: "Contact Us", href: "/contact/" },
      ]}
      brokerCopy={sharedBrokerCopy}
      faqTitle="Travel insurance FAQ"
      faqIntro="Questions travellers ask before they depart."
      faqItems={faqItems}
      ctaHeadingId="travel-cta-heading"
      ctaHeading="Planning a trip?"
      ctaSubhead="Speak with a broker about medical limits, pre-existing conditions, and trip cancellation options for your specific travel plans."
      ctaButtonLabel="Talk to a Broker"
      jsonLd={jsonLd}
    />
  );
}
