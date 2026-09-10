import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("daycare-private-school-insurance");
export const metadata = page.metadata;
export default page.default;
