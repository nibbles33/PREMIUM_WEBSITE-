import PlaceholderPage from "@/components/PlaceholderPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partners | PremiumIB",
  description: "Insurance partners of Premium Insurance Brokers.",
};

export default function PartnersPage() {
  return (
    <PlaceholderPage
      title="Partners"
      description="Full page coming soon."
      primaryCta={{ label: "Get a Quote", href: "/get-a-quote/" }}
      secondaryCta={{
        label: "Talk to a Broker",
        href: "/talk-to-a-broker/",
      }}
    />
  );
}
