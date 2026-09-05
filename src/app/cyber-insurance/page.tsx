import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("cyber-insurance");
export const metadata = page.metadata;
export default page.default;
