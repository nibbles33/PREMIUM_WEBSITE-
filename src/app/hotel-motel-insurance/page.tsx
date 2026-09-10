import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("hotel-motel-insurance");
export const metadata = page.metadata;
export default page.default;
