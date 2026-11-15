import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import PilotPersonalPage from "@/components/pilot/product/PilotPersonalPage";

export const metadata: Metadata = buildPageMetadata({
  title: "Condo Insurance Windsor, ON | Compare Quotes | Premium",
  description:
    "Compare condo insurance options in Windsor with Premium Insurance Brokers. Protect your belongings, improvements and liability. Request a quote today.",
  path: "/condo-insurance/",
});

export default function CondoInsurancePage() {
  return <PilotPersonalPage slug="condo-insurance" />;
}
