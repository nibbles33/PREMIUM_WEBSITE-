import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("trucking-insurance");
export const metadata = page.metadata;
export default page.default;
