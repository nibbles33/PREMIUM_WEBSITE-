import PlaceholderPage from "@/components/PlaceholderPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Make a Payment | PremiumIB",
  description: "Make a payment with Premium Insurance Brokers.",
};

export default function PaymentPage() {
  return (
    <PlaceholderPage
      title="Make a Payment"
      description="Full page coming soon."
      primaryCta={{ label: "Talk to a Broker", href: "/talk-to-a-broker/" }}
      secondaryCta={{ label: "Get a Quote", href: "/get-a-quote/" }}
    />
  );
}
