import type { Metadata } from "next";
import PilotPersonalPage from "@/components/pilot/product/PilotPersonalPage";

export const metadata: Metadata = {
  title: "Condo Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Condo insurance for Windsor-Essex unit owners — contents, improvements, liability, and loss assessment coverage explained by an independent broker.",
  alternates: { canonical: "/condo-insurance/" },
};

export default function CondoInsurancePage() {
  return <PilotPersonalPage slug="condo-insurance" />;
}
