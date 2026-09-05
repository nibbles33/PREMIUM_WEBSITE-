import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("business-interruption-insurance");
export const metadata = page.metadata;
export default page.default;
