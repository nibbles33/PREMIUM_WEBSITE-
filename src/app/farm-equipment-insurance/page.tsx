import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("farm-equipment-insurance");
export const metadata = page.metadata;
export default page.default;