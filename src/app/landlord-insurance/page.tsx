import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import PilotPersonalPage from "@/components/pilot/product/PilotPersonalPage";

export const metadata: Metadata = buildPageMetadata({
  title: "Landlord Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Landlord insurance for Windsor-Essex rental property owners — dwelling, liability, loss of rental income, and tenant-related risks explained by an independent broker.",
  path: "/landlord-insurance/",
});

export default function LandlordInsurancePage() {
  return <PilotPersonalPage slug="landlord-insurance" />;
}
