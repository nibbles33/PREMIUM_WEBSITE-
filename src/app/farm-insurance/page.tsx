import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("farm-insurance");
export const metadata = page.metadata;
export default page.default;
