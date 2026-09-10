import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("warehousing-insurance");
export const metadata = page.metadata;
export default page.default;
