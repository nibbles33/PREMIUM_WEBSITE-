import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("restaurant-insurance");
export const metadata = page.metadata;
export default page.default;
