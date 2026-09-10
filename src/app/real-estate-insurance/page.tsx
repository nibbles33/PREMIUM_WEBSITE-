import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("real-estate-insurance");
export const metadata = page.metadata;
export default page.default;
