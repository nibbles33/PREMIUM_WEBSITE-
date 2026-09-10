import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import PilotPersonalPage from "@/components/pilot/product/PilotPersonalPage";

export const metadata: Metadata = buildPageMetadata({
  title: "Tenant Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Tenant insurance for Windsor-Essex renters — contents, personal liability, and additional living expenses explained by an independent broker.",
  path: "/tenant-insurance/",
});

export default function TenantInsurancePage() {
  return <PilotPersonalPage slug="tenant-insurance" />;
}
