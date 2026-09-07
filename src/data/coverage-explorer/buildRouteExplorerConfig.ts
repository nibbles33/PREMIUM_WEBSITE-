import {
  getInteractiveMasterSrc,
  INTERACTIVE_MASTER_DIMENSIONS,
} from "@/data/coverage-explorer/interactive-master-assets";
import { ARCHETYPES } from "@/data/coverage-explorer/interaction-manifest/archetypes";
import { ROUTE_MANIFEST } from "@/data/coverage-explorer/interaction-manifest/routes";
import {
  getContractorsStateImageSrc,
  CONTRACTORS_BASE_MASTER_SRC,
  CONTRACTORS_STATE_IMAGE_DIMENSIONS,
} from "@/data/coverage-explorer/contractors-coverage-state-images";
import { CONTRACTORS_MOTION_RECIPES } from "@/data/coverage-explorer/contractors-motion-recipes";
import {
  getRestaurantStateImageSrc,
  RESTAURANT_BASE_MASTER_SRC,
  RESTAURANT_STATE_IMAGE_DIMENSIONS,
} from "@/data/coverage-explorer/restaurant-coverage-state-images";
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

/** Build Contractors multi-image state explorer config (motion prototype). */
function buildContractorsStateImageConfig(
  coverageIds: string[],
): CoverageExplorerVisualConfig {
  const stateImagesByCoverageId: Record<string, string> = {};
  const coverageStates: CoverageStateConfig[] = coverageIds.map((coverageId) => {
    const stateImageSrc = getContractorsStateImageSrc(coverageId);
    if (stateImageSrc) {
      stateImagesByCoverageId[coverageId] = stateImageSrc;
    }
    return {
      coverageId,
      activeZoneIds: [],
      sceneModifier: coverageId,
      stateImageSrc: stateImageSrc ?? undefined,
    };
  });

  return {
    visualFamily: "construction",
    sceneMode: "coverage-state-images",
    baseSceneSrc: CONTRACTORS_BASE_MASTER_SRC,
    sceneSrc: CONTRACTORS_BASE_MASTER_SRC,
    sceneDimensions: CONTRACTORS_STATE_IMAGE_DIMENSIONS,
    cssSceneClass: "contractors-insurance",
    zones: [],
    svgZones: [],
    coverageStates,
    stateImagesByCoverageId,
    motionRecipesByCoverageId: CONTRACTORS_MOTION_RECIPES,
  };
}

/** Build Restaurant multi-image state explorer config. */
function buildRestaurantStateImageConfig(
  coverageIds: string[],
): CoverageExplorerVisualConfig {
  const stateImagesByCoverageId: Record<string, string> = {};
  const coverageStates: CoverageStateConfig[] = coverageIds.map((coverageId) => {
    const stateImageSrc = getRestaurantStateImageSrc(coverageId);
    if (stateImageSrc) {
      stateImagesByCoverageId[coverageId] = stateImageSrc;
    }
    return {
      coverageId,
      activeZoneIds: [],
      sceneModifier: coverageId,
      stateImageSrc: stateImageSrc ?? undefined,
    };
  });

  return {
    visualFamily: "restaurant-hospitality",
    sceneMode: "coverage-state-images",
    baseSceneSrc: RESTAURANT_BASE_MASTER_SRC,
    sceneSrc: RESTAURANT_BASE_MASTER_SRC,
    sceneDimensions: RESTAURANT_STATE_IMAGE_DIMENSIONS,
    cssSceneClass: "restaurant-insurance",
    zones: [],
    svgZones: [],
    coverageStates,
    stateImagesByCoverageId,
  };
}

/** Build per-route interactive master explorer config from manifest + live coverage ids. */
export function buildRouteExplorerConfig(
  slug: string,
  coverageIds: string[],
): CoverageExplorerVisualConfig | null {
  if (slug === "restaurant-insurance") {
    return buildRestaurantStateImageConfig(coverageIds);
  }

  if (slug === "contractors-insurance") {
    return buildContractorsStateImageConfig(coverageIds);
  }

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
    highlightRenderer: "dim-only",
    sceneSrc,
    sceneDimensions: dims,
    cssSceneClass: slug,
    zones: [],
    svgZones,
    coverageStates: coverageStates.map((state) => ({
      ...state,
      ambient: { dimOpacity: 0.12 },
    })),
  };
}
