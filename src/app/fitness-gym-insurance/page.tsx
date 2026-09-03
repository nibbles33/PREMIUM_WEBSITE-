import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("fitness-gym-insurance");
export const metadata = page.metadata;
export default page.default;
