import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("commercial-insurance");
export const metadata = page.metadata;
export default page.default;
