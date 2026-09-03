import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("small-business-insurance");
export const metadata = page.metadata;
export default page.default;
