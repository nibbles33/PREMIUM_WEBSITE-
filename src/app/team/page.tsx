import PlaceholderPage from "@/components/PlaceholderPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet the Team | PremiumIB",
  description: "Meet the Premium Insurance Brokers team.",
};

export default function TeamPage() {
  return (
    <PlaceholderPage
      title="Meet the Team"
      description="Full page coming soon."
      primaryCta={{ label: "Talk to a Broker", href: "/talk-to-a-broker/" }}
      secondaryCta={{ label: "Get a Quote", href: "/get-a-quote/" }}
    />
  );
}
