import {
  getInteractiveMasterSrc,
  INTERACTIVE_MASTER_DIMENSIONS,
} from "@/data/coverage-explorer/interactive-master-assets";
import { ARCHETYPES } from "@/data/coverage-explorer/interaction-manifest/archetypes";
import { ROUTE_MANIFEST } from "@/data/coverage-explorer/interaction-manifest/routes";
import type {
  CoverageExplorerVisualConfig,
  CoverageStateConfig,
  CoverageSvgZoneConfig,
  CoverageVisualFamily,
} from "@/types/coverage-explorer";
import { getVisualFamilyForSlug } from "@/data/coverage-explorer/registry";

const COMPACT_MASTER_FILES = new Set([
  "auto-insurance-interactive-master.png",
  "daycare-private-school-insurance-interactive-master.png",
  "fitness-gym-insurance-interactive-master.png",
  "non-profit-insurance-interactive-master.png",
  "religious-organizations-insurance-interactive-master.png",
  "salon-barber-insurance-interactive-master.png",
]);

function resolveDimensions(filename: string) {
  return COMPACT_MASTER_FILES.has(filename)
    ? INTERACTIVE_MASTER_DIMENSIONS.compact
    : INTERACTIVE_MASTER_DIMENSIONS.standard;
}

/** Build per-route interactive master explorer config from manifest + live coverage ids. */
export function buildRouteExplorerConfig(
  slug: string,
  coverageIds: string[],
): CoverageExplorerVisualConfig | null {
  const manifest = ROUTE_MANIFEST[slug];
  const sceneSrc = getInteractiveMasterSrc(slug);
  if (!manifest || !sceneSrc) return null;

  const archetype = ARCHETYPES[manifest.archetype];
  if (!archetype) return null;

  const filename = sceneSrc.replace("/images/", "");
  const dims = resolveDimensions(filename);

  const svgZones: CoverageSvgZoneConfig[] = archetype.zones.map((zone) => ({
    id: zone.id,
    path: zone.path,
    style: zone.style,
    label: zone.label,
  }));

  const coverageStates: CoverageStateConfig[] = coverageIds.map(
    (coverageId, index) => {
      const mappedZones = manifest.coverageZones[coverageId];
      const activeZoneIds =
        mappedZones && mappedZones.length > 0
          ? mappedZones
          : [svgZones[index % svgZones.length]?.id].filter(Boolean);

      return {
        coverageId,
        activeZoneIds,
        sceneModifier: coverageId,
        ambient: {
          dimOpacity: 0.15,
          background:
            "radial-gradient(ellipse 72% 58% at 50% 54%, rgba(208, 173, 38, 0.12) 0%, transparent 72%)",
        },
      };
    },
  );

  const family: CoverageVisualFamily =
    getVisualFamilyForSlug(slug) ?? "commercial-building";

  return {
    visualFamily: family,
    sceneMode: "interactive-master",
    sceneSrc,
    sceneDimensions: dims,
    cssSceneClass: slug,
    zones: [],
    svgZones,
    coverageStates,
  };
}
