import LinePlaceholderPage from "@/components/LinePlaceholderPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Insurance | PremiumIB",
  description: "Home insurance coverage from Premium Insurance Brokers.",
};

export default function HomeInsurancePage() {
  return (
    <LinePlaceholderPage
      title="Home Insurance"
      quoteHref="/get-a-quote?type=home"
    />
  );
}
