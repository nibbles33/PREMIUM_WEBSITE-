import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("religious-organizations-insurance");
export const metadata = page.metadata;
export default page.default;
