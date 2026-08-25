import LinePlaceholderPage from "@/components/LinePlaceholderPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auto Insurance | PremiumIB",
  description: "Auto insurance coverage from Premium Insurance Brokers.",
};

export default function AutoInsurancePage() {
  return (
    <LinePlaceholderPage
      title="Auto Insurance"
      quoteHref="/get-a-quote?type=vehicle"
    />
  );
}
