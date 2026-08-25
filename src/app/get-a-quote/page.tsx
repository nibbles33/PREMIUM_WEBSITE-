import PlaceholderPage from "@/components/PlaceholderPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a Quote | PremiumIB",
  description: "Request an insurance quote from Premium Insurance Brokers.",
};

export default function GetAQuotePage() {
  return (
    <PlaceholderPage
      title="Get a Quote"
      description="Full quote form coming soon."
      primaryCta={{ label: "Talk to a Broker", href: "/talk-to-a-broker/" }}
    />
  );
}
