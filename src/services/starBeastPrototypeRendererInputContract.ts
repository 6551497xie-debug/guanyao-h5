import type {
  StarBeastPrototypeExpressionChannelConsumptionAvailable,
  StarBeastPrototypeExpressionChannelConsumptionBlocked,
  StarBeastPrototypeExpressionChannelConsumptionUnavailable,
} from "../types/starBeastPrototypeExpressionChannelConsumption";
import type {
  StarBeastPrototypeRendererInputContract,
  StarBeastPrototypeRendererInputContractBlockedReason,
  StarBeastPrototypeRendererInputContractInput,
  StarBeastPrototypeRendererInputContractResult,
  StarBeastPrototypeRendererInputContractUnavailableReason,
} from "../types/starBeastPrototypeRendererInputContract";

const INPUT_CONTRACT_BOUNDARY = Object.freeze({
  inputContractOnly: true,
  noRendererInvocation: true,
  noRenderExecution: true,
  noDrawCommands: true,
  noPixelParameters: true,
  noRenderPlanGeneration: true,
  noExpressionChannelMutation: true,
  noAssetDefinitionMutation: true,
  noCanvasConnection: true,
  noStarbeastLabConnection: true,
  noRuntimeIntegration: true,
  noStorageWrite: true,
});

const unavailable = (
  input: StarBeastPrototypeRendererInputContractInput,
  sourceConsumptionResultReference:
    | StarBeastPrototypeExpressionChannelConsumptionAvailable
    | StarBeastPrototypeExpressionChannelConsumptionUnavailable
    | null,
  reason: StarBeastPrototypeRendererInputContractUnavailableReason,
): StarBeastPrototypeRendererInputContractResult =>
  Object.freeze({
    status: "UNAVAILABLE",
    source: "star_beast_prototype_renderer_input_contract",
    reason,
    input,
    sourceConsumptionResultReference,
    sourceUnavailableReason:
      sourceConsumptionResultReference?.status === "UNAVAILABLE"
        ? sourceConsumptionResultReference.reason
        : null,
    noInputContract: true,
    boundary: INPUT_CONTRACT_BOUNDARY,
  });

const blocked = (
  input: StarBeastPrototypeRendererInputContractInput,
  sourceConsumptionResultReference:
    | StarBeastPrototypeExpressionChannelConsumptionAvailable
    | StarBeastPrototypeExpressionChannelConsumptionBlocked,
  reason: StarBeastPrototypeRendererInputContractBlockedReason,
): StarBeastPrototypeRendererInputContractResult =>
  Object.freeze({
    status: "BLOCKED",
    source: "star_beast_prototype_renderer_input_contract",
    reason,
    input,
    sourceConsumptionResultReference,
    sourceBlockedReason:
      sourceConsumptionResultReference.status === "BLOCKED"
        ? sourceConsumptionResultReference.reason
        : null,
    noInputContract: true,
    boundary: INPUT_CONTRACT_BOUNDARY,
  });

export function resolveStarBeastPrototypeRendererInputContract(
  input: StarBeastPrototypeRendererInputContractInput,
): StarBeastPrototypeRendererInputContractResult {
  const consumptionResult =
    input.expressionChannelConsumptionResultReference;

  if (consumptionResult === null) {
    return unavailable(
      input,
      null,
      "EXPRESSION_CHANNEL_CONSUMPTION_RESULT_REQUIRED",
    );
  }
  if (consumptionResult.status === "UNAVAILABLE") {
    return unavailable(
      input,
      consumptionResult,
      "EXPRESSION_CHANNEL_CONSUMPTION_UNAVAILABLE",
    );
  }
  if (consumptionResult.status === "BLOCKED") {
    return blocked(
      input,
      consumptionResult,
      "EXPRESSION_CHANNEL_CONSUMPTION_BLOCKED",
    );
  }
  if (input.prototypeRendererInputReference === null) {
    return unavailable(
      input,
      consumptionResult,
      "PROTOTYPE_RENDERER_INPUT_REFERENCE_REQUIRED",
    );
  }
  if (input.rendererRequestReference === null) {
    return unavailable(
      input,
      consumptionResult,
      "PROTOTYPE_RENDERER_REQUEST_REFERENCE_REQUIRED",
    );
  }
  if (
    input.prototypeRendererInputReference !==
    consumptionResult.consumption.prototypeRendererInputReference
  ) {
    return blocked(
      input,
      consumptionResult,
      "PROTOTYPE_RENDERER_INPUT_REFERENCE_MISMATCH",
    );
  }
  if (
    input.rendererRequestReference.referenceType !==
      "STAR_BEAST_PROTOTYPE_RENDERER_REQUEST" ||
    input.rendererRequestReference.requestPurpose !==
      "VALIDATE_ISOLATED_PROTOTYPE_EXPRESSION"
  ) {
    return blocked(
      input,
      consumptionResult,
      "PROTOTYPE_RENDERER_REQUEST_REFERENCE_INVALID",
    );
  }

  const sourceInputReference = input.prototypeRendererInputReference;
  if (
    sourceInputReference.referenceType !==
      "STAR_BEAST_PROTOTYPE_RENDERER_INPUT_REFERENCE" ||
    sourceInputReference.stableConsumptionReference !== true ||
    sourceInputReference.notRenderInput !== true ||
    sourceInputReference.notRenderPlan !== true ||
    sourceInputReference.notVisualOutput !== true ||
    sourceInputReference.noVisualParametersCopied !== true ||
    sourceInputReference.isolatedPrototypeScopeReference.scope !==
      "ISOLATED_PROTOTYPE_ONLY"
  ) {
    return blocked(
      input,
      consumptionResult,
      "PROTOTYPE_RENDERER_INPUT_REFERENCE_BOUNDARY_INVALID",
    );
  }
  if (
    consumptionResult.consumption.semanticRole !==
      "STAR_BEAST_PROTOTYPE_EXPRESSION_CHANNEL_CONSUMPTION" ||
    consumptionResult.consumption.consumptionStatus !==
      "AVAILABLE_FOR_FUTURE_ISOLATED_PROTOTYPE_RENDERER" ||
    consumptionResult.consumption.boundary.referenceConsumptionOnly !== true ||
    consumptionResult.consumption.boundary.noRendererInvocation !== true ||
    consumptionResult.consumption.boundary.noRenderPlanGeneration !== true ||
    consumptionResult.consumption.boundary.noExpressionChannelMutation !==
      true ||
    consumptionResult.consumption.boundary.noAssetDefinitionMutation !== true ||
    consumptionResult.consumption.boundary.noCanvasConnection !== true ||
    consumptionResult.consumption.boundary.noStarbeastLabConnection !== true ||
    consumptionResult.consumption.boundary.noRuntimeIntegration !== true ||
    consumptionResult.consumption.boundary.noStorageWrite !== true
  ) {
    return blocked(
      input,
      consumptionResult,
      "EXPRESSION_CHANNEL_CONSUMPTION_BOUNDARY_INVALID",
    );
  }

  const contract: StarBeastPrototypeRendererInputContract = Object.freeze({
    semanticRole: "STAR_BEAST_PROTOTYPE_RENDERER_INPUT_CONTRACT",
    sourceConsumptionResultReference: consumptionResult,
    sourceInputReference,
    rendererRequestReference: input.rendererRequestReference,
    expressionChannelsReference:
      sourceInputReference.expressionChannelsReference,
    rendererContractReference: sourceInputReference.rendererContractReference,
    isolatedPrototypeScopeReference:
      sourceInputReference.isolatedPrototypeScopeReference,
    contractStatus:
      "AVAILABLE_FOR_FUTURE_PROTOTYPE_RENDERER_EXECUTION_READINESS",
    rendererNeutral: true,
    referenceOnly: true,
    boundary: INPUT_CONTRACT_BOUNDARY,
  });

  return Object.freeze({
    status: "AVAILABLE",
    source: "star_beast_prototype_renderer_input_contract",
    input,
    contract,
  });
}
