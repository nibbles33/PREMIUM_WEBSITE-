import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("medical-dental-insurance");
export const metadata = page.metadata;
export default page.default;
