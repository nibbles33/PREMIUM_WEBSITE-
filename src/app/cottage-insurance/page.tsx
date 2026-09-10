import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import PilotPersonalPage from "@/components/pilot/product/PilotPersonalPage";

export const metadata: Metadata = buildPageMetadata({
  title: "Cottage Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Cottage and seasonal property insurance for Windsor-Essex — secondary homes, vacancy, water proximity, and winterization considerations explained by an independent broker.",
  path: "/cottage-insurance/",
});

export default function CottageInsurancePage() {
  return <PilotPersonalPage slug="cottage-insurance" />;
}
