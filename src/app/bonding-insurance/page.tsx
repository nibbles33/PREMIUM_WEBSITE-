import PlaceholderPage from "@/components/PlaceholderPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bond Insurance | PremiumIB",
  description: "Bond insurance and surety coverage from Premium Insurance Brokers.",
};

export default function BondingInsurancePage() {
  return (
    <PlaceholderPage
      title="Bond Insurance"
      description="Full page coming soon."
      primaryCta={{ label: "Get a Quote", href: "/get-a-quote?type=bonding" }}
      secondaryCta={{
        label: "Talk to a Broker",
        href: "/talk-to-a-broker/",
      }}
    />
  );
}
