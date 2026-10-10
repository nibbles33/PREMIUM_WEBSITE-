import type { Metadata } from "next";
import PilotAutoPage from "@/components/pilot/PilotAutoPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Car & Auto Insurance in Windsor | Premium Insurance Brokers",
  description:
    "Ontario car and auto insurance through a Windsor-Essex broker. Liability, collision, comprehensive, and accident benefits — explained clearly before you choose.",
  path: "/auto-insurance/",
});

export default function AutoInsurancePage() {
  return <PilotAutoPage />;
}
