import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("professional-liability-insurance");
export const metadata = page.metadata;
export default page.default;
