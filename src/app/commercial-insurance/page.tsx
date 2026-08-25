import LinePlaceholderPage from "@/components/LinePlaceholderPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commercial Insurance | PremiumIB",
  description: "Commercial insurance coverage from Premium Insurance Brokers.",
};

export default function CommercialInsurancePage() {
  return (
    <LinePlaceholderPage
      title="Commercial Insurance"
      quoteHref="/get-a-quote?type=business"
    />
  );
}
