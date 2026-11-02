import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("plumbing-hvac-insurance");
export const metadata = page.metadata;
export default page.default;
