import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("mixed-use-property-insurance");
export const metadata = page.metadata;
export default page.default;
