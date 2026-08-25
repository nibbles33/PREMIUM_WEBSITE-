import PlaceholderPage from "@/components/PlaceholderPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compliance | PremiumIB",
  description: "Compliance information for Premium Insurance Brokers.",
};

export default function CompliancePage() {
  return (
    <PlaceholderPage
      title="Compliance"
      description="Full page coming soon."
      primaryCta={{ label: "Talk to a Broker", href: "/talk-to-a-broker/" }}
      secondaryCta={{ label: "Get a Quote", href: "/get-a-quote/" }}
    />
  );
}
