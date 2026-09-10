import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("dump-truck-insurance");
export const metadata = page.metadata;
export default page.default;
