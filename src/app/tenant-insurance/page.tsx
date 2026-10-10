import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import PilotPersonalPage from "@/components/pilot/product/PilotPersonalPage";

export const metadata: Metadata = buildPageMetadata({
  title:
    "Tenant & Renters Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Tenant and renters insurance in Windsor-Essex — contents, liability, and living expenses. Get a quote from an independent local brokerage.",
  path: "/tenant-insurance/",
});

export default function TenantInsurancePage() {
  return <PilotPersonalPage slug="tenant-insurance" />;
}
