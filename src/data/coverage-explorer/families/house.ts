import type { CoverageExplorerVisualConfig } from "@/types/coverage-explorer";

export const houseExplorer: CoverageExplorerVisualConfig = {
  visualFamily: "house",
  sceneMode: "css-cutaway",
  cssSceneClass: "house",
  zones: [
    {
      id: "dwelling-structure",
      shape: "dwelling-structure",
      style: "outline",
      position: { left: "18%", top: "18%", width: "64%", height: "52%" },
      label: "Dwelling structure",
    },
    {
      id: "roof-walls",
      shape: "roof-walls",
      style: "glow",
      position: { left: "16%", top: "12%", width: "68%", height: "28%" },
      label: "Roof & walls",
    },
    {
      id: "interior-contents",
      shape: "interior-contents",
      style: "fill",
      position: { left: "24%", top: "38%", width: "52%", height: "32%" },
      label: "Contents",
    },
    {
      id: "exterior-liability",
      shape: "exterior-liability",
      style: "pulse",
      position: { left: "6%", bottom: "10%", width: "88%", height: "22%" },
      label: "Exterior & visitors",
    },
    {
      id: "driveway-zone",
      shape: "driveway-zone",
      style: "glow",
      position: { left: "8%", bottom: "8%", width: "38%", height: "14%" },
      label: "Driveway",
    },
    {
      id: "ale-indicator",
      shape: "ale-indicator",
      style: "pulse",
      position: { right: "10%", bottom: "16%", width: "28%", height: "24%" },
      label: "Temporary accommodation",
    },
    {
      id: "high-value-callout",
      shape: "high-value-callout",
      style: "glow",
      position: { left: "32%", top: "42%", width: "36%", height: "18%" },
      label: "High-value items",
    },
  ],
  coverageStates: [
    {
      coverageId: "dwelling-coverage",
      activeZoneIds: ["dwelling-structure", "roof-walls"],
      sceneModifier: "dwelling-coverage",
      ambient: {
        background:
          "radial-gradient(ellipse 70% 55% at 50% 38%, rgba(179, 122, 90, 0.14) 0%, transparent 72%)",
      },
    },
    {
      coverageId: "contents-coverage",
      activeZoneIds: ["interior-contents"],
      sceneModifier: "contents-coverage",
      ambient: {
        background:
          "radial-gradient(ellipse 50% 40% at 50% 52%, rgba(208, 173, 38, 0.12) 0%, transparent 70%)",
      },
    },
    {
      coverageId: "liability-protection",
      activeZoneIds: ["exterior-liability", "driveway-zone"],
      sceneModifier: "liability-protection",
      ambient: {
        background:
          "radial-gradient(ellipse 85% 35% at 50% 88%, rgba(208, 173, 38, 0.1) 0%, transparent 70%)",
      },
    },
    {
      coverageId: "additional-living-expenses",
      activeZoneIds: ["ale-indicator"],
      sceneModifier: "additional-living-expenses",
      ambient: {
        background:
          "radial-gradient(circle at 78% 72%, rgba(91, 122, 153, 0.12) 0%, transparent 55%)",
        dimOpacity: 0.2,
      },
    },
    {
      coverageId: "high-value-home-considerations",
      activeZoneIds: ["high-value-callout", "interior-contents"],
      sceneModifier: "high-value-home-considerations",
      ambient: {
        background:
          "radial-gradient(circle at 50% 48%, rgba(208, 173, 38, 0.16) 0%, transparent 58%)",
      },
    },
  ],
};
