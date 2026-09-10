import type { CoverageExplorerVisualConfig } from "@/types/coverage-explorer";

export const garageDealershipExplorer: CoverageExplorerVisualConfig = {
  visualFamily: "garage-dealership",
  sceneMode: "photo-scene",
  sceneSrc: "/images/photography/commercial/garage-dealership-insurance.webp",
  cssSceneClass: "garage",
  zones: [
    {
      id: "customer-vehicles",
      shape: "customer-vehicles",
      style: "glow",
      position: { left: "12%", bottom: "22%", width: "38%", height: "32%" },
      label: "Customer vehicles",
    },
    {
      id: "inventory-row",
      shape: "inventory-row",
      style: "outline",
      position: { right: "8%", bottom: "18%", width: "42%", height: "28%" },
      label: "Inventory lot",
    },
    {
      id: "service-bay",
      shape: "service-bay",
      style: "pulse",
      position: { left: "28%", top: "28%", width: "44%", height: "38%" },
      label: "Service bay",
    },
    {
      id: "circulation-zone",
      shape: "circulation-zone",
      style: "glow",
      position: { left: "8%", bottom: "8%", width: "84%", height: "18%" },
      label: "Customer circulation",
    },
    {
      id: "body-panels",
      shape: "body-panels",
      style: "fill",
      position: { right: "14%", bottom: "24%", width: "32%", height: "22%" },
      label: "Inventory body",
    },
  ],
  coverageStates: [
    {
      coverageId: "garagekeepers-liability",
      activeZoneIds: ["customer-vehicles"],
      sceneModifier: "garagekeepers-liability",
      ambient: {
        background:
          "radial-gradient(circle at 32% 62%, rgba(208, 173, 38, 0.14) 0%, transparent 55%)",
      },
    },
    {
      coverageId: "dealer-open-lot",
      activeZoneIds: ["inventory-row", "body-panels"],
      sceneModifier: "dealer-open-lot",
      ambient: {
        background:
          "radial-gradient(circle at 72% 58%, rgba(91, 122, 153, 0.12) 0%, transparent 52%)",
      },
    },
    {
      coverageId: "garage-liability",
      activeZoneIds: ["service-bay", "circulation-zone"],
      sceneModifier: "garage-liability",
      ambient: {
        background:
          "radial-gradient(ellipse 65% 50% at 50% 48%, rgba(208, 173, 38, 0.1) 0%, transparent 70%)",
      },
    },
    {
      coverageId: "physical-damage-on-inventory",
      activeZoneIds: ["inventory-row", "body-panels"],
      sceneModifier: "physical-damage-on-inventory",
      ambient: {
        background:
          "radial-gradient(circle at 68% 55%, rgba(179, 122, 90, 0.14) 0%, transparent 58%)",
      },
    },
  ],
};
