import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("food-truck-insurance");
export const metadata = page.metadata;
export default page.default;
