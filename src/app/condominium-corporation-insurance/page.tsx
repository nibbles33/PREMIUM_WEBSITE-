import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("condominium-corporation-insurance");
export const metadata = page.metadata;
export default page.default;
