import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("cargo-freight-insurance");
export const metadata = page.metadata;
export default page.default;
