import { createPilotLifePageExports } from "@/lib/createPilotLifePage";

const page = createPilotLifePageExports("group-benefits");
export const metadata = page.metadata;
export default page.default;
