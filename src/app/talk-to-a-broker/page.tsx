import PlaceholderPage from "@/components/PlaceholderPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Talk to a Broker | PremiumIB",
  description: "Speak with a Premium Insurance Brokers advisor.",
};

export default function TalkToABrokerPage() {
  return (
    <PlaceholderPage
      title="Talk to a Broker"
      description="Full contact form coming soon. Call us at 226-782-6000 in the meantime."
      primaryCta={{ label: "Call 226-782-6000", href: "tel:+12267826000" }}
      secondaryCta={{ label: "Get a Quote", href: "/get-a-quote/" }}
    />
  );
}
