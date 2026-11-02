import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("commercial-umbrella-insurance");
export const metadata = page.metadata;
export default page.default;
