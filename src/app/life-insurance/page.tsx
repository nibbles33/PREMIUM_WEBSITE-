import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import PilotPersonalPage from "@/components/pilot/product/PilotPersonalPage";

export const metadata: Metadata = buildPageMetadata({
  title: "Life Insurance Guidance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Life insurance inquiry coordination for Windsor-Essex — Premium connects you with licensed life-insurance professionals through Oracle/head office.",
  path: "/life-insurance/",
});

export default function LifeInsurancePage() {
  return <PilotPersonalPage slug="life-insurance" />;
}
