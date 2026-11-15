import type { Metadata } from "next";
import PilotAutoPage from "@/components/pilot/PilotAutoPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Car & Auto Insurance in Windsor | Premium Insurance Brokers",
  description:
    "Windsor car and auto insurance from an independent Ontario broker. Liability, DCPD, accident benefits, and optional collision and comprehensive.",
  path: "/auto-insurance/",
});

export default function AutoInsurancePage() {
  return <PilotAutoPage />;
}
