import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("property-management-insurance");
export const metadata = page.metadata;
export default page.default;
