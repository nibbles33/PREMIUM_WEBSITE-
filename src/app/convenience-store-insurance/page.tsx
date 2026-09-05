import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("convenience-store-insurance");
export const metadata = page.metadata;
export default page.default;
