import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("electrical-contractors-insurance");
export const metadata = page.metadata;
export default page.default;
