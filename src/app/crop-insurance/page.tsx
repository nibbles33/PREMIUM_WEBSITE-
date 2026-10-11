import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("crop-insurance");
export const metadata = page.metadata;
export default page.default;
