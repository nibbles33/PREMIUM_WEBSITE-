import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import PilotPersonalPage from "@/components/pilot/product/PilotPersonalPage";

export const metadata: Metadata = buildPageMetadata({
  title: "Group Home & Auto Insurance Programs | Premium Insurance Brokers",
  description:
    "Group home and auto program inquiry coordination for Windsor-Essex — Premium connects employers and associations with specialist access through Oracle/head office.",
  path: "/group-home-auto-insurance/",
});

export default function GroupHomeAutoInsurancePage() {
  return <PilotPersonalPage slug="group-home-auto-insurance" />;
}
