import type { Metadata } from "next";
import PilotAutoPage from "@/components/pilot/PilotAutoPage";

export const metadata: Metadata = {
  title: "Auto Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Ontario auto insurance through an independent Windsor-Essex broker — liability, collision, comprehensive, and accident benefits explained in plain language.",
};

export default function AutoInsurancePage() {
  return <PilotAutoPage />;
}
