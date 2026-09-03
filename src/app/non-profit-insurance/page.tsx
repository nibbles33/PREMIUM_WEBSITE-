import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("non-profit-insurance");
export const metadata = page.metadata;
export default page.default;
