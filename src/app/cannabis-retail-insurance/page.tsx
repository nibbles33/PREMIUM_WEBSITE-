import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("cannabis-retail-insurance");
export const metadata = page.metadata;
export default page.default;
