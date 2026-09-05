import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("pharmacy-insurance");
export const metadata = page.metadata;
export default page.default;
