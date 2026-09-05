import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("contractors-insurance");
export const metadata = page.metadata;
export default page.default;
