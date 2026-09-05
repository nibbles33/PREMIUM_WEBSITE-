import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("garage-dealership-insurance");
export const metadata = page.metadata;
export default page.default;
