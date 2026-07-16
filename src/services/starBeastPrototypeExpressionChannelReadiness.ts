import type {
  StarBeastAssetPrototypeAdapterAvailable,
  StarBeastAssetPrototypeAdapterBlocked,
  StarBeastAssetPrototypeAdapterUnavailable,
  StarBeastPrototypeExpressionChannel,
} from "../types/starBeastAssetPrototypeAdapter";
import type {
  StarBeastPrototypeExpressionChannelReadinessBlockedReason,
  StarBeastPrototypeExpressionChannelReadinessInput,
  StarBeastPrototypeExpressionChannelReadinessResult,
  StarBeastPrototypeExpressionChannelReadinessUnavailableReason,
} from "../types/starBeastPrototypeExpressionChannelReadiness";

const READINESS_BOUNDARY = Object.freeze({
  readinessOnly: true,
  noChannelConsumption: true,
  noRenderExecution: true,
  noCanvasConnection: true,
  noStarbeastLabConnection: true,
  noLifeStateMutation: true,
  noStorageWrite: true,
});

const EXPECTED_CHANNEL_KINDS = Object.freeze([
  "CORE_BONE_CHANNEL",
  "STAR_CORE_CHANNEL",
  "STAR_PATTERN_CHANNEL",
  "LIGHT_BOUNDARY_CHANNEL",
  "COSMIC_CONSCIOUSNESS_CHANNEL",
  "CRYSTAL_IMPRINT_CHANNEL",
] as const);

const unavailable = (
  input: StarBeastPrototypeExpressionChannelReadinessInput,
  sourceAdapterResultReference:
    | StarBeastAssetPrototypeAdapterAvailable
    | StarBeastAssetPrototypeAdapterUnavailable
    | null,
  reason: StarBeastPrototypeExpressionChannelReadinessUnavailableReason,
): StarBeastPrototypeExpressionChannelReadinessResult =>
  Object.freeze({
    status: "UNAVAILABLE",
    readiness: "UNAVAILABLE",
    source: "star_beast_prototype_expression_channel_readiness",
    reason,
    input,
    sourceAdapterResultReference,
    sourceUnavailableReason:
      sourceAdapterResultReference?.status === "UNAVAILABLE"
        ? sourceAdapterResultReference.reason
        : null,
    boundary: READINESS_BOUNDARY,
  });

const blocked = (
  input: StarBeastPrototypeExpressionChannelReadinessInput,
  sourceAdapterResultReference:
    | StarBeastAssetPrototypeAdapterAvailable
    | StarBeastAssetPrototypeAdapterBlocked,
  reason: StarBeastPrototypeExpressionChannelReadinessBlockedReason,
): StarBeastPrototypeExpressionChannelReadinessResult =>
  Object.freeze({
    status: "BLOCKED",
    readiness: "BLOCKED",
    source: "star_beast_prototype_expression_channel_readiness",
    reason,
    input,
    sourceAdapterResultReference,
    sourceBlockedReason:
      sourceAdapterResultReference.status === "BLOCKED"
        ? sourceAdapterResultReference.reason
        : null,
    boundary: READINESS_BOUNDARY,
  });

const hasValidSystemReference = (
  channel: StarBeastPrototypeExpressionChannel,
): boolean => {
  const assetDefinition = channel.sourceAssetDefinitionReference;
  switch (channel.channelKind) {
    case "CORE_BONE_CHANNEL":
      return channel.structureDirectionReference === assetDefinition.coreSystem;
    case "STAR_CORE_CHANNEL":
      return (
        channel.corePositionReference === assetDefinition.coreSystem &&
        channel.manifestationIntensityReference ===
          channel.sourceVisualStateReference
      );
    case "STAR_PATTERN_CHANNEL":
      return channel.lifePathReference === assetDefinition.patternSystem;
    case "LIGHT_BOUNDARY_CHANNEL":
      return channel.presenceBoundaryReference === assetDefinition.boundarySystem;
    case "COSMIC_CONSCIOUSNESS_CHANNEL":
      return (
        channel.consciousnessFlowReference ===
        assetDefinition.consciousnessSystem
      );
    case "CRYSTAL_IMPRINT_CHANNEL":
      return channel.crystalImprintReference === assetDefinition.crystalSystem;
  }
};

export function resolveStarBeastPrototypeExpressionChannelReadiness(
  input: StarBeastPrototypeExpressionChannelReadinessInput,
): StarBeastPrototypeExpressionChannelReadinessResult {
  const adapterResult = input.adapterResultReference;

  if (adapterResult === null) {
    return unavailable(input, null, "ADAPTER_RESULT_REFERENCE_REQUIRED");
  }
  if (adapterResult.status === "UNAVAILABLE") {
    return unavailable(input, adapterResult, "ADAPTER_RESULT_UNAVAILABLE");
  }
  if (adapterResult.status === "BLOCKED") {
    return blocked(input, adapterResult, "ADAPTER_RESULT_BLOCKED");
  }
  if (input.expressionChannelsReference === null) {
    return unavailable(
      input,
      adapterResult,
      "EXPRESSION_CHANNELS_REFERENCE_REQUIRED",
    );
  }
  if (input.rendererContractReference === null) {
    return unavailable(
      input,
      adapterResult,
      "RENDERER_CONTRACT_REFERENCE_REQUIRED",
    );
  }
  if (input.isolationScopeReference === null) {
    return unavailable(
      input,
      adapterResult,
      "ISOLATION_SCOPE_REFERENCE_REQUIRED",
    );
  }
  if (input.expressionChannelsReference !== adapterResult.expressionChannels) {
    return blocked(
      input,
      adapterResult,
      "EXPRESSION_CHANNELS_REFERENCE_MISMATCH",
    );
  }
  if (
    input.rendererContractReference !==
    adapterResult.input.rendererContractReference
  ) {
    return blocked(
      input,
      adapterResult,
      "RENDERER_CONTRACT_REFERENCE_MISMATCH",
    );
  }
  if (
    input.isolationScopeReference.referenceType !==
      "STAR_BEAST_PROTOTYPE_ISOLATION_SCOPE" ||
    input.isolationScopeReference.scope !== "ISOLATED_PROTOTYPE_ONLY"
  ) {
    return blocked(input, adapterResult, "ISOLATION_SCOPE_REFERENCE_INVALID");
  }
  if (
    adapterResult.adapterStatus !==
      "AVAILABLE_FOR_FUTURE_PROTOTYPE_RENDERER" ||
    adapterResult.channelCount !== 6 ||
    adapterResult.boundary.referenceProjectionOnly !== true ||
    adapterResult.boundary.noAssetFactCopy !== true ||
    adapterResult.boundary.noRenderExecution !== true ||
    adapterResult.boundary.noCanvasConnection !== true ||
    adapterResult.boundary.noAnimationDevelopment !== true ||
    adapterResult.boundary.noLifeStateMutation !== true ||
    adapterResult.boundary.noStorageWrite !== true
  ) {
    return blocked(input, adapterResult, "ADAPTER_BOUNDARY_INVALID");
  }

  const channels = input.expressionChannelsReference;
  const channelKindsAreValid = EXPECTED_CHANNEL_KINDS.every(
    (expectedKind, index) => channels[index]?.channelKind === expectedKind,
  );
  if (channels.length !== 6 || !channelKindsAreValid) {
    return blocked(input, adapterResult, "EXPRESSION_CHANNEL_CONTRACT_INVALID");
  }

  const assetDefinition = adapterResult.input.assetDefinitionReference;
  const visualStateReference = adapterResult.input.visualStateReference;
  const sourcesAreValid = channels.every(
    (channel) =>
      channel.sourceAssetDefinitionReference === assetDefinition &&
      channel.sourceVisualStateReference === visualStateReference &&
      channel.sourceLayerReference.kind ===
        channel.channelKind.replace("_CHANNEL", "") &&
      hasValidSystemReference(channel),
  );
  if (!sourcesAreValid) {
    return blocked(input, adapterResult, "EXPRESSION_CHANNEL_SOURCE_MISMATCH");
  }

  return Object.freeze({
    status: "READY",
    readiness: "READY_FOR_ISOLATED_PROTOTYPE_RENDERER_CONSUMPTION",
    source: "star_beast_prototype_expression_channel_readiness",
    input,
    sourceAdapterResultReference: adapterResult,
    expressionChannelsReference: channels,
    rendererContractReference: input.rendererContractReference,
    isolationScopeReference: input.isolationScopeReference,
    boundary: READINESS_BOUNDARY,
  });
}
