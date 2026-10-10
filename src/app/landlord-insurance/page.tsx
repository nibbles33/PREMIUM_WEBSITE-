import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import PilotPersonalPage from "@/components/pilot/product/PilotPersonalPage";

export const metadata: Metadata = buildPageMetadata({
  title: "Landlord Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Landlord and rental property insurance for Windsor-Essex owners — dwelling, liability, and loss of rents through an independent brokerage serving Ontario.",
  path: "/landlord-insurance/",
});

export default function LandlordInsurancePage() {
  return <PilotPersonalPage slug="landlord-insurance" />;
}
