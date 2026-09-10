import type { Metadata } from "next";
import PilotAutoPage from "@/components/pilot/PilotAutoPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Auto Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Ontario auto insurance through an independent Windsor-Essex broker — liability, collision, comprehensive, and accident benefits explained in plain language.",
  path: "/auto-insurance/",
});

export default function AutoInsurancePage() {
  return <PilotAutoPage />;
}
