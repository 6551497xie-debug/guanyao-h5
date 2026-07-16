import type {
  StarBeastAssetPrototypeConsumption,
  StarBeastAssetPrototypeConsumptionBlockedReason,
  StarBeastAssetPrototypeConsumptionInput,
  StarBeastAssetPrototypeConsumptionResult,
  StarBeastAssetPrototypeConsumptionUnavailableReason,
} from "../types/starBeastAssetPrototypeConsumption";
import type {
  StarBeastAssetPrototypeReadinessBlocked,
  StarBeastAssetPrototypeReadinessReady,
  StarBeastAssetPrototypeReadinessUnavailable,
} from "../types/starBeastAssetPrototypeReadiness";

const CONSUMPTION_BOUNDARY = Object.freeze({
  noAssetCreation: true,
  noRenderExecution: true,
  noCanvasConnection: true,
  noLifeStateMutation: true,
  noStorageWrite: true,
});

const unavailable = (
  input: StarBeastAssetPrototypeConsumptionInput,
  sourceReadinessReference:
    | StarBeastAssetPrototypeReadinessReady
    | StarBeastAssetPrototypeReadinessUnavailable,
  reason: StarBeastAssetPrototypeConsumptionUnavailableReason,
): StarBeastAssetPrototypeConsumptionResult =>
  Object.freeze({
    status: "UNAVAILABLE",
    source: "star_beast_asset_prototype_consumption",
    reason,
    input,
    sourceReadinessReference,
    sourceUnavailableReason:
      sourceReadinessReference.status === "UNAVAILABLE"
        ? sourceReadinessReference.reason
        : null,
    noPrototypeConsumption: true,
    boundary: CONSUMPTION_BOUNDARY,
  });

const blocked = (
  input: StarBeastAssetPrototypeConsumptionInput,
  sourceReadinessReference:
    | StarBeastAssetPrototypeReadinessReady
    | StarBeastAssetPrototypeReadinessBlocked,
  reason: StarBeastAssetPrototypeConsumptionBlockedReason,
): StarBeastAssetPrototypeConsumptionResult =>
  Object.freeze({
    status: "BLOCKED",
    source: "star_beast_asset_prototype_consumption",
    reason,
    input,
    sourceReadinessReference,
    sourceBlockedReason:
      sourceReadinessReference.status === "BLOCKED"
        ? sourceReadinessReference.reason
        : null,
    noPrototypeConsumption: true,
    boundary: CONSUMPTION_BOUNDARY,
  });

export function consumeStarBeastAssetPrototype(
  input: StarBeastAssetPrototypeConsumptionInput,
): StarBeastAssetPrototypeConsumptionResult {
  const readinessResult = input.readinessResultReference;

  if (readinessResult.status === "UNAVAILABLE") {
    return unavailable(
      input,
      readinessResult,
      "ASSET_PROTOTYPE_READINESS_UNAVAILABLE",
    );
  }
  if (readinessResult.status === "BLOCKED") {
    return blocked(
      input,
      readinessResult,
      "ASSET_PROTOTYPE_READINESS_BLOCKED",
    );
  }
  if (input.assetDefinitionReference === null) {
    return unavailable(
      input,
      readinessResult,
      "ASSET_DEFINITION_REFERENCE_REQUIRED",
    );
  }
  if (input.visualStateCompatibilityReference === null) {
    return unavailable(
      input,
      readinessResult,
      "VISUAL_STATE_COMPATIBILITY_REFERENCE_REQUIRED",
    );
  }
  if (input.rendererContractReference === null) {
    return unavailable(
      input,
      readinessResult,
      "RENDERER_CONTRACT_REFERENCE_REQUIRED",
    );
  }
  if (
    input.assetDefinitionReference !==
    readinessResult.assetDefinitionReference
  ) {
    return blocked(
      input,
      readinessResult,
      "ASSET_DEFINITION_REFERENCE_MISMATCH",
    );
  }
  if (
    input.visualStateCompatibilityReference !==
    readinessResult.visualStateCompatibilityReference
  ) {
    return blocked(
      input,
      readinessResult,
      "VISUAL_STATE_COMPATIBILITY_REFERENCE_MISMATCH",
    );
  }
  if (
    input.rendererContractReference !== readinessResult.rendererContractReference
  ) {
    return blocked(
      input,
      readinessResult,
      "RENDERER_CONTRACT_REFERENCE_MISMATCH",
    );
  }

  const consumption: StarBeastAssetPrototypeConsumption = Object.freeze({
    semanticRole: "STAR_BEAST_ASSET_PROTOTYPE_CONSUMPTION",
    sourceReadinessReference: readinessResult,
    assetDefinitionReference: input.assetDefinitionReference,
    visualStateCompatibilityReference: input.visualStateCompatibilityReference,
    rendererContractReference: input.rendererContractReference,
    consumptionStatus: "AVAILABLE_FOR_FUTURE_PROTOTYPE_ADAPTER",
    referenceOnly: true,
    notRendererOutput: true,
    boundary: CONSUMPTION_BOUNDARY,
  });

  return Object.freeze({
    status: "AVAILABLE",
    source: "star_beast_asset_prototype_consumption",
    input,
    consumption,
  });
}
