import type { Metadata } from "next";
import PilotPersonalPage from "@/components/pilot/product/PilotPersonalPage";

export const metadata: Metadata = {
  title: "Personal Umbrella Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Personal umbrella liability insurance for Windsor-Essex — extra limits above your home and auto policies, explained by an independent broker.",
  alternates: { canonical: "/personal-umbrella-insurance/" },
};

export default function PersonalUmbrellaInsurancePage() {
  return <PilotPersonalPage slug="personal-umbrella-insurance" />;
}
