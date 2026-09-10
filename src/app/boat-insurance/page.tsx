import type { Metadata } from "next";
import PilotPersonalPage from "@/components/pilot/product/PilotPersonalPage";

export const metadata: Metadata = {
  title: "Boat Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Boat and watercraft insurance for Windsor-Essex — hull coverage, liability, equipment, and navigation territory explained by an independent broker.",
  alternates: { canonical: "/boat-insurance/" },
};

export default function BoatInsurancePage() {
  return <PilotPersonalPage slug="boat-insurance" />;
}
