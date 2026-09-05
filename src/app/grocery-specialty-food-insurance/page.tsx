import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("grocery-specialty-food-insurance");
export const metadata = page.metadata;
export default page.default;
