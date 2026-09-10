import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("builders-developers-insurance");
export const metadata = page.metadata;
export default page.default;
