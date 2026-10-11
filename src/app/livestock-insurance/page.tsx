import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("livestock-insurance");
export const metadata = page.metadata;
export default page.default;
