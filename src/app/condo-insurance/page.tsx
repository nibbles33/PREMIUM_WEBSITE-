import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import PilotPersonalPage from "@/components/pilot/product/PilotPersonalPage";

export const metadata: Metadata = buildPageMetadata({
  title: "Condo Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Condo insurance for Windsor-Essex unit owners — contents, improvements, liability, and loss assessment. Get a quote from a local independent brokerage.",
  path: "/condo-insurance/",
});

export default function CondoInsurancePage() {
  return <PilotPersonalPage slug="condo-insurance" />;
}
