import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("builders-risk-insurance");
export const metadata = page.metadata;
export default page.default;
