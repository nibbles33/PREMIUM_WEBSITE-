import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("professional-offices-insurance");
export const metadata = page.metadata;
export default page.default;
