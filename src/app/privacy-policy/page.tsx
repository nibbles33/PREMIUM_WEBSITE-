import PlaceholderPage from "@/components/PlaceholderPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | PremiumIB",
  description: "Privacy policy for Premium Insurance Brokers.",
};

export default function PrivacyPolicyPage() {
  return (
    <PlaceholderPage
      title="Privacy Policy"
      description="Full page coming soon."
      primaryCta={{ label: "Talk to a Broker", href: "/talk-to-a-broker/" }}
      secondaryCta={{ label: "Get a Quote", href: "/get-a-quote/" }}
    />
  );
}
