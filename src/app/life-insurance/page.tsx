import type { Metadata } from "next";
import PilotPersonalPage from "@/components/pilot/product/PilotPersonalPage";

export const metadata: Metadata = {
  title: "Life Insurance Guidance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Life insurance inquiry coordination for Windsor-Essex — Premium connects you with licensed life-insurance professionals through Oracle/head office.",
  alternates: { canonical: "/life-insurance/" },
};

export default function LifeInsurancePage() {
  return <PilotPersonalPage slug="life-insurance" />;
}
