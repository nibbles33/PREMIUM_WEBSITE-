import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("employment-practices-liability-insurance");
export const metadata = page.metadata;
export default page.default;
