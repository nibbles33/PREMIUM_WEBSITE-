import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("bonding-insurance");
export const metadata = page.metadata;
export default page.default;
