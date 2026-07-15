import type { StarBeastVisualLayerKind } from "../types/starBeastAssetArchitecture";
import type {
  StarBeastAssetPrototypeReadinessBlockedReason,
  StarBeastAssetPrototypeReadinessInput,
  StarBeastAssetPrototypeReadinessResult,
  StarBeastAssetPrototypeReadinessUnavailableReason,
} from "../types/starBeastAssetPrototypeReadiness";

const REQUIRED_VISUAL_LAYERS: readonly StarBeastVisualLayerKind[] =
  Object.freeze([
    "CORE_BONE",
    "STAR_CORE",
    "STAR_PATTERN",
    "LIGHT_BOUNDARY",
    "COSMIC_CONSCIOUSNESS",
    "CRYSTAL_IMPRINT",
  ]);

const READINESS_BOUNDARY = Object.freeze({
  noAssetCreation: true,
  noConsumption: true,
  noRenderExecution: true,
  noLifeStateMutation: true,
  noStorageWrite: true,
});

const unavailable = (
  input: StarBeastAssetPrototypeReadinessInput,
  reason: StarBeastAssetPrototypeReadinessUnavailableReason,
  missingLayers: readonly string[] = Object.freeze([]),
): StarBeastAssetPrototypeReadinessResult =>
  Object.freeze({
    status: "UNAVAILABLE",
    readiness: "UNAVAILABLE",
    source: "star_beast_asset_prototype_readiness",
    reason,
    missingLayers,
    input,
    boundary: READINESS_BOUNDARY,
  });

const blocked = (
  input: StarBeastAssetPrototypeReadinessInput,
  reason: StarBeastAssetPrototypeReadinessBlockedReason,
): StarBeastAssetPrototypeReadinessResult =>
  Object.freeze({
    status: "BLOCKED",
    readiness: "BLOCKED",
    source: "star_beast_asset_prototype_readiness",
    reason,
    input,
    boundary: READINESS_BOUNDARY,
  });

export function resolveStarBeastAssetPrototypeReadiness(
  input: StarBeastAssetPrototypeReadinessInput,
): StarBeastAssetPrototypeReadinessResult {
  const assetDefinition = input.assetDefinitionReference;
  const lifeArchetypeProfile = input.lifeArchetypeProfileReference;

  if (!assetDefinition) {
    return unavailable(input, "ASSET_DEFINITION_REQUIRED");
  }
  if (!lifeArchetypeProfile) {
    return unavailable(input, "LIFE_ARCHETYPE_PROFILE_REFERENCE_REQUIRED");
  }
  if (!input.visualStateCompatibilityReference) {
    return unavailable(input, "VISUAL_STATE_COMPATIBILITY_REFERENCE_REQUIRED");
  }
  if (!input.rendererContractReference) {
    return unavailable(input, "RENDERER_CONTRACT_REFERENCE_REQUIRED");
  }

  if (
    input.visualStateCompatibilityReference.referenceType !==
    "STAR_BEAST_VISUAL_STATE_COMPATIBILITY"
  ) {
    return blocked(input, "VISUAL_STATE_COMPATIBILITY_REFERENCE_INVALID");
  }
  if (
    input.rendererContractReference.referenceType !==
    "STAR_BEAST_RENDERER_CONTRACT"
  ) {
    return blocked(input, "RENDERER_CONTRACT_REFERENCE_INVALID");
  }
  if (
    assetDefinition.archetype.referenceType !== "LIFE_ARCHETYPE_PROFILE" ||
    assetDefinition.archetype.sourceProfileReference !== lifeArchetypeProfile ||
    assetDefinition.archetype.code !== lifeArchetypeProfile.code
  ) {
    return blocked(input, "LIFE_ARCHETYPE_SOURCE_MISMATCH");
  }
  if (
    assetDefinition.semanticRole !== "STAR_BEAST_ASSET_DEFINITION" ||
    assetDefinition.rendererConsumable !== true ||
    assetDefinition.visualReferenceOnly !== true ||
    assetDefinition.noFourSymbolInference !== true ||
    assetDefinition.noLifeStateMutation !== true ||
    assetDefinition.noImageGeneration !== true ||
    assetDefinition.noModelGeneration !== true ||
    assetDefinition.noRendererCreation !== true
  ) {
    return blocked(input, "ASSET_ARCHITECTURE_BOUNDARY_INVALID");
  }

  const layerKinds = new Set(
    assetDefinition.visualLayers.map(({ kind }) => kind),
  );
  const missingLayers = Object.freeze(
    REQUIRED_VISUAL_LAYERS.filter((kind) => !layerKinds.has(kind)),
  );
  if (missingLayers.length > 0) {
    return unavailable(input, "ASSET_VISUAL_LAYER_MISSING", missingLayers);
  }

  return Object.freeze({
    status: "READY",
    readiness: "READY_FOR_PROTOTYPE_RENDERER_CONSUMPTION",
    source: "star_beast_asset_prototype_readiness",
    input,
    assetDefinitionReference: assetDefinition,
    lifeArchetypeProfileReference: lifeArchetypeProfile,
    visualStateCompatibilityReference:
      input.visualStateCompatibilityReference,
    rendererContractReference: input.rendererContractReference,
    boundary: READINESS_BOUNDARY,
  });
}
