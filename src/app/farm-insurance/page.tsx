import PlaceholderPage from "@/components/PlaceholderPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Farm Insurance | PremiumIB",
  description: "Farm insurance coverage from Premium Insurance Brokers.",
};

export default function FarmInsurancePage() {
  return (
    <PlaceholderPage
      title="Farm Insurance"
      description="Full page coming soon."
      primaryCta={{ label: "Get a Quote", href: "/get-a-quote?type=farm" }}
      secondaryCta={{
        label: "Talk to a Broker",
        href: "/talk-to-a-broker/",
      }}
    />
  );
}
