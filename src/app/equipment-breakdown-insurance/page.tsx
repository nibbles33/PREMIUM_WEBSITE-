import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("equipment-breakdown-insurance");
export const metadata = page.metadata;
export default page.default;
