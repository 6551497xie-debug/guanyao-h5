import type { LifeArchetypeProfile } from "../types/originalSelfLifeSchema";
import type {
  StarBeastAssetArchitectureResult,
  StarBeastAssetDefinition,
  StarBeastAssetNormalizedAnchor,
  StarBeastVisualLayer,
} from "../types/starBeastAssetArchitecture";

const visualLayer = (
  order: StarBeastVisualLayer["order"],
  kind: StarBeastVisualLayer["kind"],
  semanticRole: StarBeastVisualLayer["semanticRole"],
): StarBeastVisualLayer =>
  Object.freeze({
    order,
    kind,
    semanticRole,
    expressionOnly: true,
    notLifeFact: true,
  });

const QIAN_VISUAL_LAYERS: readonly StarBeastVisualLayer[] = Object.freeze([
  visualLayer(1, "CORE_BONE", "LIFE_STRUCTURE"),
  visualLayer(2, "STAR_CORE", "ORIGINAL_SELF_SOURCE"),
  visualLayer(3, "STAR_PATTERN", "LIFE_TRAJECTORY"),
  visualLayer(4, "LIGHT_BOUNDARY", "LIFE_PRESENCE"),
  visualLayer(5, "COSMIC_CONSCIOUSNESS", "BREATH_FLOW_CONSCIOUSNESS"),
  visualLayer(6, "CRYSTAL_IMPRINT", "LIFE_EXPERIENCE_IMPRINT"),
]);

const normalizedAnchor = (
  anchorId: string,
  x: number,
  y: number,
): StarBeastAssetNormalizedAnchor =>
  Object.freeze({ anchorId, x, y, normalized: true });

const QIAN_STAR_CORE_ANCHORS: readonly StarBeastAssetNormalizedAnchor[] =
  Object.freeze([
    normalizedAnchor("QIAN_PRIMARY_CORE", 0.5, 0.36),
    normalizedAnchor("QIAN_ASCENDING_CORE", 0.5, 0.2),
  ]);

const QIAN_CRYSTAL_ANCHORS: readonly StarBeastAssetNormalizedAnchor[] =
  Object.freeze([normalizedAnchor("QIAN_CRYSTAL_ORBIT", 0.5, 0.62)]);

function createQianAssetDefinition(
  lifeArchetypeProfile: LifeArchetypeProfile,
): StarBeastAssetDefinition {
  return Object.freeze({
    semanticRole: "STAR_BEAST_ASSET_DEFINITION",
    assetDefinitionId: "STAR_BEAST_ASSET_QIAN_V1",
    identity: Object.freeze({
      referenceType: "STAR_BEAST_ASSET_IDENTITY",
      referenceId: "STAR_BEAST_ASSET_QIAN_V1",
    }),
    archetype: Object.freeze({
      referenceType: "LIFE_ARCHETYPE_PROFILE",
      code: "QIAN",
      sourceProfileReference: lifeArchetypeProfile,
    }),
    visualLayers: QIAN_VISUAL_LAYERS,
    coreSystem: Object.freeze({
      structureDirection: "UPWARD_OUTWARD",
      boneLogic: "RADIANT_LOAD_BEARING_AXIS",
      starCoreAnchors: QIAN_STAR_CORE_ANCHORS,
    }),
    patternSystem: Object.freeze({
      patternLogic: "CENTER_TO_PERIPHERY_ASCENDING",
      trajectoryContinuity: "UNBROKEN",
    }),
    boundarySystem: Object.freeze({
      boundaryBehavior: "OPEN_EXPANSION",
      lightFlowDirection: "RADIAL_ASCENDING",
    }),
    consciousnessSystem: Object.freeze({
      stardustDistribution: "CORE_TO_PERIPHERY",
      consciousnessFlow: "RISING_CIRCULATION",
    }),
    crystalSystem: Object.freeze({
      crystalAnchors: QIAN_CRYSTAL_ANCHORS,
      imprintLogic: "ORBIT_PRIMARY_CORE",
      presenceSource: "CRYSTAL_REFERENCE_ONLY",
    }),
    rendererConsumable: true,
    visualReferenceOnly: true,
    noFourSymbolInference: true,
    noLifeStateMutation: true,
    noImageGeneration: true,
    noModelGeneration: true,
    noRendererCreation: true,
  });
}

export function resolveStarBeastAssetDefinition(
  lifeArchetypeProfile: LifeArchetypeProfile,
): StarBeastAssetArchitectureResult {
  if (lifeArchetypeProfile.code !== "QIAN") {
    return Object.freeze({
      status: "NOT_AVAILABLE",
      reason: "ASSET_DEFINITION_NOT_ESTABLISHED",
      sourceLifeArchetypeReference: lifeArchetypeProfile,
    });
  }

  return Object.freeze({
    status: "AVAILABLE",
    sourceLifeArchetypeReference: lifeArchetypeProfile,
    assetDefinition: createQianAssetDefinition(lifeArchetypeProfile),
  });
}
