import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("directors-officers-insurance");
export const metadata = page.metadata;
export default page.default;
