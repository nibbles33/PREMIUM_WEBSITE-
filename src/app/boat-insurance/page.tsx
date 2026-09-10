import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import PilotPersonalPage from "@/components/pilot/product/PilotPersonalPage";

export const metadata: Metadata = buildPageMetadata({
  title: "Boat Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Boat and watercraft insurance for Windsor-Essex — hull coverage, liability, equipment, and navigation territory explained by an independent broker.",
  path: "/boat-insurance/",
});

export default function BoatInsurancePage() {
  return <PilotPersonalPage slug="boat-insurance" />;
}
