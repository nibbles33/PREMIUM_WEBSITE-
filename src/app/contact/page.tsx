import PlaceholderPage from "@/components/PlaceholderPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | PremiumIB",
  description: "Contact Premium Insurance Brokers.",
};

export default function ContactPage() {
  return (
    <PlaceholderPage
      title="Contact Us"
      description="Full page coming soon."
      primaryCta={{ label: "Talk to a Broker", href: "/talk-to-a-broker/" }}
      secondaryCta={{ label: "Get a Quote", href: "/get-a-quote/" }}
    />
  );
}
