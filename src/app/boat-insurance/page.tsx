import type { Metadata } from "next";
import {
  Anchor,
  Compass,
  Shield,
  Wrench,
} from "lucide-react";
import LineInsurancePage, {
  insuranceAgencyProvider,
  sharedBrokerCopy,
} from "@/components/LineInsurancePage";

export const metadata: Metadata = {
  title: "Boat Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Boat and watercraft insurance for Windsor-Essex — hull coverage, liability, equipment, and navigation territory explained by an independent broker.",
  alternates: { canonical: "/boat-insurance/" },
};

const coverageTypes = [
  {
    title: "Hull & Machinery",
    description:
      "Covers physical damage to your boat, motor, and permanently attached equipment — often on an agreed value or actual cash value basis depending on the policy.",
    icon: Anchor,
  },
  {
    title: "Liability Coverage",
    description:
      "Protects you if your watercraft causes injury or property damage to others — including collisions with other vessels, docks, or swimmers.",
    icon: Shield,
  },
  {
    title: "Equipment & Trailers",
    description:
      "Trolling motors, fish finders, life jackets, and boat trailers may need explicit coverage or scheduled limits beyond the base hull amount.",
    icon: Wrench,
  },
  {
    title: "Navigation & Use Territory",
    description:
      "Policies define where you may operate — inland lakes, Great Lakes, coastal waters — and may restrict racing or commercial use.",
    icon: Compass,
  },
];

const faqItems = [
  {
    question: "Is boat insurance required in Ontario?",
    answer:
      "Unlike auto insurance, boat insurance is not legally mandated for private pleasure craft in Ontario. However, marinas, lenders, and provincial registration requirements may still expect proof of coverage. Liability-only policies are common for smaller boats.",
  },
  {
    question: "Does my home insurance cover my boat?",
    answer:
      "Home policies sometimes include very limited coverage for small boats or motors, often with low limits and strict size restrictions. Most powerboats and larger watercraft need a dedicated boat policy.",
  },
  {
    question: "What is agreed value vs. actual cash value?",
    answer:
      "Agreed value pays a set amount for a total loss based on a value you and the insurer establish at purchase. Actual cash value deducts depreciation. The right basis depends on your boat's age, condition, and how you would replace it.",
  },
  {
    question: "Am I covered when the boat is in storage?",
    answer:
      "Policies typically cover stored boats over winter, but conditions apply — drainage, shrink-wrapping, and theft prevention may matter. Confirm lay-up periods and whether liability extends when the boat is on a trailer at home.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Boat Insurance",
  description:
    "Boat and watercraft insurance for Windsor-Essex — hull, liability, equipment, and navigation territory.",
  provider: insuranceAgencyProvider(),
  areaServed: { "@type": "AdministrativeArea", name: "Windsor-Essex" },
  serviceType: "Boat Insurance",
};

export default function BoatInsurancePage() {
  return (
    <LineInsurancePage
      heroHeadingId="boat-hero-heading"
      eyebrow="Personal Insurance"
      headline="Boat Insurance"
      subhead="Protection on and off the water — hull coverage, liability, and equipment built around how you use your boat in Ontario."
      photographySlug="boat"
      quoteHref="/get-a-quote?type=vehicle&vehicleType=boat"
      quoteLabel="Get a Boat Quote"
      coverageIntro="Boat policies reflect hull value, where you navigate, and what you carry on board."
      coverageAccent="#4A8A8A"
      coverageTypes={coverageTypes}
      whoItIsFor="Boat insurance is for Windsor-Essex owners of powerboats, fishing boats, pontoons, and other pleasure craft on inland lakes, the Detroit River, and Lake St. Clair — whether you trailer to launches or keep a slip at a marina."
      considerations={[
        {
          title: "Hull value basis",
          description:
            "Document your boat's make, model, year, motor size, and upgrades. Agreed-value policies suit newer or customized boats; older craft may be rated on actual cash value.",
        },
        {
          title: "Navigation territory",
          description:
            "Tell your broker where you operate — local lakes only, Great Lakes cruising, or cross-border waters. Territory limits affect both eligibility and premium.",
        },
        {
          title: "Seasonality and lay-up",
          description:
            "Winter storage still carries theft and fire risk. Confirm how your policy treats boats on trailers, in marinas, or at cottage properties during the off-season.",
        },
        {
          title: "Towing and emergency assistance",
          description:
            "On-water breakdown and towing may be optional add-ons. If you boat far from launch ramps, ask about emergency towing limits.",
        },
      ]}
      relatedLinks={[
        { label: "Auto Insurance", href: "/auto-insurance/" },
        { label: "Motorcycle Insurance", href: "/motorcycle-insurance/" },
        { label: "Cottage Insurance", href: "/cottage-insurance/" },
      ]}
      brokerCopy={sharedBrokerCopy}
      faqTitle="Boat insurance FAQ"
      faqIntro="Common questions about insuring watercraft in Ontario."
      faqItems={faqItems}
      ctaHeadingId="boat-cta-heading"
      ctaHeading="Ready to protect your boat?"
      ctaSubhead="Tell us about your watercraft — we will compare hull and liability options for how you actually boat."
      jsonLd={jsonLd}
    />
  );
}
