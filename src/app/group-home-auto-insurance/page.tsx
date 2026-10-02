import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import PilotPersonalPage from "@/components/pilot/product/PilotPersonalPage";

export const metadata: Metadata = buildPageMetadata({
  title: "Group Home & Auto Insurance Programs | Premium Insurance Brokers",
  description:
    "Group home and auto program inquiries for Windsor-Essex employers and associations — Premium coordinates specialist access through Oracle.",
  path: "/group-home-auto-insurance/",
});

export default function GroupHomeAutoInsurancePage() {
  return <PilotPersonalPage slug="group-home-auto-insurance" />;
}
