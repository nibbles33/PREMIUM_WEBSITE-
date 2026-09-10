import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("manufacturing-insurance");
export const metadata = page.metadata;
export default page.default;
