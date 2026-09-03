import type { Metadata } from "next";
import PilotPersonalPage from "@/components/pilot/product/PilotPersonalPage";

export const metadata: Metadata = {
  title: "Travel Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Travel insurance guidance for Windsor-Essex travellers — emergency medical, trip cancellation, and travel-related risks explained by an independent broker.",
  alternates: { canonical: "/travel-insurance/" },
};

export default function TravelInsurancePage() {
  return <PilotPersonalPage slug="travel-insurance" />;
}
