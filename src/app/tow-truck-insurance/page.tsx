import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("tow-truck-insurance");
export const metadata = page.metadata;
export default page.default;
