import type { StarBeastVisualLayerKind } from "../types/starBeastAssetArchitecture";
import type {
  StarBeastAssetPrototypeAdapterBlockedReason,
  StarBeastAssetPrototypeAdapterInput,
  StarBeastAssetPrototypeAdapterResult,
  StarBeastAssetPrototypeAdapterUnavailableReason,
  StarBeastPrototypeExpressionChannels,
} from "../types/starBeastAssetPrototypeAdapter";

const ADAPTER_BOUNDARY = Object.freeze({
  referenceProjectionOnly: true,
  noAssetFactCopy: true,
  noRenderExecution: true,
  noCanvasConnection: true,
  noAnimationDevelopment: true,
  noLifeStateMutation: true,
  noStorageWrite: true,
});

const REQUIRED_LAYER_KINDS: readonly StarBeastVisualLayerKind[] = Object.freeze([
  "CORE_BONE",
  "STAR_CORE",
  "STAR_PATTERN",
  "LIGHT_BOUNDARY",
  "COSMIC_CONSCIOUSNESS",
  "CRYSTAL_IMPRINT",
]);

const unavailable = (
  input: StarBeastAssetPrototypeAdapterInput,
  reason: StarBeastAssetPrototypeAdapterUnavailableReason,
): StarBeastAssetPrototypeAdapterResult =>
  Object.freeze({
    status: "UNAVAILABLE",
    source: "star_beast_asset_prototype_adapter",
    reason,
    input,
    noExpressionChannels: true,
    boundary: ADAPTER_BOUNDARY,
  });

const blocked = (
  input: StarBeastAssetPrototypeAdapterInput,
  reason: StarBeastAssetPrototypeAdapterBlockedReason,
  missingChannelSources: readonly string[] = Object.freeze([]),
): StarBeastAssetPrototypeAdapterResult =>
  Object.freeze({
    status: "BLOCKED",
    source: "star_beast_asset_prototype_adapter",
    reason,
    input,
    missingChannelSources,
    noExpressionChannels: true,
    boundary: ADAPTER_BOUNDARY,
  });

export function adaptStarBeastAssetPrototype(
  input: StarBeastAssetPrototypeAdapterInput,
): StarBeastAssetPrototypeAdapterResult {
  const assetDefinition = input.assetDefinitionReference;
  const prototypeConsumption = input.prototypeConsumptionReference;
  const visualStateReference = input.visualStateReference;
  const rendererContractReference = input.rendererContractReference;

  if (assetDefinition === null) {
    return unavailable(input, "ASSET_DEFINITION_REFERENCE_REQUIRED");
  }
  if (prototypeConsumption === null) {
    return unavailable(input, "PROTOTYPE_CONSUMPTION_REFERENCE_REQUIRED");
  }
  if (visualStateReference === null) {
    return unavailable(input, "VISUAL_STATE_REFERENCE_REQUIRED");
  }
  if (rendererContractReference === null) {
    return unavailable(input, "RENDERER_CONTRACT_REFERENCE_REQUIRED");
  }

  if (prototypeConsumption.assetDefinitionReference !== assetDefinition) {
    return blocked(input, "ASSET_CONSUMPTION_REFERENCE_MISMATCH");
  }
  if (
    visualStateReference.compatibilityReference !==
    prototypeConsumption.visualStateCompatibilityReference
  ) {
    return blocked(input, "VISUAL_STATE_COMPATIBILITY_REFERENCE_MISMATCH");
  }
  if (
    rendererContractReference !== prototypeConsumption.rendererContractReference
  ) {
    return blocked(input, "RENDERER_CONTRACT_REFERENCE_MISMATCH");
  }
  if (
    prototypeConsumption.semanticRole !==
      "STAR_BEAST_ASSET_PROTOTYPE_CONSUMPTION" ||
    prototypeConsumption.consumptionStatus !==
      "AVAILABLE_FOR_FUTURE_PROTOTYPE_ADAPTER" ||
    prototypeConsumption.referenceOnly !== true ||
    prototypeConsumption.notRendererOutput !== true ||
    prototypeConsumption.boundary.noAssetCreation !== true ||
    prototypeConsumption.boundary.noRenderExecution !== true ||
    prototypeConsumption.boundary.noCanvasConnection !== true ||
    prototypeConsumption.boundary.noLifeStateMutation !== true ||
    prototypeConsumption.boundary.noStorageWrite !== true
  ) {
    return blocked(input, "PROTOTYPE_CONSUMPTION_BOUNDARY_INVALID");
  }

  const layerByKind = new Map(
    assetDefinition.visualLayers.map((layer) => [layer.kind, layer]),
  );
  const missingChannelSources = Object.freeze(
    REQUIRED_LAYER_KINDS.filter((kind) => !layerByKind.has(kind)),
  );
  if (missingChannelSources.length > 0) {
    return blocked(
      input,
      "ASSET_EXPRESSION_LAYER_MISSING",
      missingChannelSources,
    );
  }

  const expressionChannels: StarBeastPrototypeExpressionChannels =
    Object.freeze([
      Object.freeze({
        channelKind: "CORE_BONE_CHANNEL",
        semanticRole: "LIFE_STRUCTURE_EXPRESSION",
        sourceAssetDefinitionReference: assetDefinition,
        sourceLayerReference: layerByKind.get("CORE_BONE")!,
        sourceVisualStateReference: visualStateReference,
        structureDirectionReference: assetDefinition.coreSystem,
      }),
      Object.freeze({
        channelKind: "STAR_CORE_CHANNEL",
        semanticRole: "ORIGINAL_SELF_SOURCE_EXPRESSION",
        sourceAssetDefinitionReference: assetDefinition,
        sourceLayerReference: layerByKind.get("STAR_CORE")!,
        sourceVisualStateReference: visualStateReference,
        corePositionReference: assetDefinition.coreSystem,
        manifestationIntensityReference: visualStateReference,
      }),
      Object.freeze({
        channelKind: "STAR_PATTERN_CHANNEL",
        semanticRole: "LIFE_TRAJECTORY_EXPRESSION",
        sourceAssetDefinitionReference: assetDefinition,
        sourceLayerReference: layerByKind.get("STAR_PATTERN")!,
        sourceVisualStateReference: visualStateReference,
        lifePathReference: assetDefinition.patternSystem,
      }),
      Object.freeze({
        channelKind: "LIGHT_BOUNDARY_CHANNEL",
        semanticRole: "LIFE_PRESENCE_EXPRESSION",
        sourceAssetDefinitionReference: assetDefinition,
        sourceLayerReference: layerByKind.get("LIGHT_BOUNDARY")!,
        sourceVisualStateReference: visualStateReference,
        presenceBoundaryReference: assetDefinition.boundarySystem,
      }),
      Object.freeze({
        channelKind: "COSMIC_CONSCIOUSNESS_CHANNEL",
        semanticRole: "BREATH_FLOW_SPACE_EXPRESSION",
        sourceAssetDefinitionReference: assetDefinition,
        sourceLayerReference: layerByKind.get("COSMIC_CONSCIOUSNESS")!,
        sourceVisualStateReference: visualStateReference,
        consciousnessFlowReference: assetDefinition.consciousnessSystem,
      }),
      Object.freeze({
        channelKind: "CRYSTAL_IMPRINT_CHANNEL",
        semanticRole: "LIFE_IMPRINT_EXPRESSION",
        sourceAssetDefinitionReference: assetDefinition,
        sourceLayerReference: layerByKind.get("CRYSTAL_IMPRINT")!,
        sourceVisualStateReference: visualStateReference,
        crystalImprintReference: assetDefinition.crystalSystem,
      }),
    ]);

  return Object.freeze({
    status: "AVAILABLE",
    source: "star_beast_asset_prototype_adapter",
    input,
    sourceConsumptionReference: prototypeConsumption,
    expressionChannels,
    channelCount: 6,
    adapterStatus: "AVAILABLE_FOR_FUTURE_PROTOTYPE_RENDERER",
    boundary: ADAPTER_BOUNDARY,
  });
}
