import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("greenhouse-agribusiness-insurance");
export const metadata = page.metadata;
export default page.default;
