import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("commercial-property-insurance");
export const metadata = page.metadata;
export default page.default;
