import type { Metadata } from "next";
import PilotPersonalPage from "@/components/pilot/product/PilotPersonalPage";

export const metadata: Metadata = {
  title: "Home & Ride Sharing Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Home, car, and ride-sharing insurance guidance for Windsor-Essex — how personal policies interact with Airbnb, Turo, and platform use, explained by a broker.",
  alternates: { canonical: "/home-sharing-insurance/" },
};

export default function HomeSharingInsurancePage() {
  return <PilotPersonalPage slug="home-sharing-insurance" />;
}
