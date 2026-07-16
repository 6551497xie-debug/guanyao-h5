import type {
  StarBeastPrototypeExpressionChannelConsumption,
  StarBeastPrototypeExpressionChannelConsumptionBlockedReason,
  StarBeastPrototypeExpressionChannelConsumptionInput,
  StarBeastPrototypeExpressionChannelConsumptionResult,
  StarBeastPrototypeExpressionChannelConsumptionUnavailableReason,
  StarBeastPrototypeRendererInputReference,
} from "../types/starBeastPrototypeExpressionChannelConsumption";
import type {
  StarBeastPrototypeExpressionChannelReadinessBlocked,
  StarBeastPrototypeExpressionChannelReadinessReady,
  StarBeastPrototypeExpressionChannelReadinessUnavailable,
} from "../types/starBeastPrototypeExpressionChannelReadiness";

const CONSUMPTION_BOUNDARY = Object.freeze({
  referenceConsumptionOnly: true,
  noRendererInvocation: true,
  noRenderPlanGeneration: true,
  noExpressionChannelMutation: true,
  noAssetDefinitionMutation: true,
  noCanvasConnection: true,
  noStarbeastLabConnection: true,
  noRuntimeIntegration: true,
  noStorageWrite: true,
});

const unavailable = (
  input: StarBeastPrototypeExpressionChannelConsumptionInput,
  sourceReadinessReference:
    | StarBeastPrototypeExpressionChannelReadinessReady
    | StarBeastPrototypeExpressionChannelReadinessUnavailable
    | null,
  reason: StarBeastPrototypeExpressionChannelConsumptionUnavailableReason,
): StarBeastPrototypeExpressionChannelConsumptionResult =>
  Object.freeze({
    status: "UNAVAILABLE",
    source: "star_beast_prototype_expression_channel_consumption",
    reason,
    input,
    sourceReadinessReference,
    sourceUnavailableReason:
      sourceReadinessReference?.status === "UNAVAILABLE"
        ? sourceReadinessReference.reason
        : null,
    noPrototypeRendererInputReference: true,
    boundary: CONSUMPTION_BOUNDARY,
  });

const blocked = (
  input: StarBeastPrototypeExpressionChannelConsumptionInput,
  sourceReadinessReference:
    | StarBeastPrototypeExpressionChannelReadinessReady
    | StarBeastPrototypeExpressionChannelReadinessBlocked,
  reason: StarBeastPrototypeExpressionChannelConsumptionBlockedReason,
): StarBeastPrototypeExpressionChannelConsumptionResult =>
  Object.freeze({
    status: "BLOCKED",
    source: "star_beast_prototype_expression_channel_consumption",
    reason,
    input,
    sourceReadinessReference,
    sourceBlockedReason:
      sourceReadinessReference.status === "BLOCKED"
        ? sourceReadinessReference.reason
        : null,
    noPrototypeRendererInputReference: true,
    boundary: CONSUMPTION_BOUNDARY,
  });

export function consumeStarBeastPrototypeExpressionChannels(
  input: StarBeastPrototypeExpressionChannelConsumptionInput,
): StarBeastPrototypeExpressionChannelConsumptionResult {
  const readiness = input.expressionChannelReadinessReference;

  if (readiness === null) {
    return unavailable(
      input,
      null,
      "EXPRESSION_CHANNEL_READINESS_REFERENCE_REQUIRED",
    );
  }
  if (readiness.status === "UNAVAILABLE") {
    return unavailable(
      input,
      readiness,
      "EXPRESSION_CHANNEL_READINESS_UNAVAILABLE",
    );
  }
  if (readiness.status === "BLOCKED") {
    return blocked(input, readiness, "EXPRESSION_CHANNEL_READINESS_BLOCKED");
  }
  if (input.prototypeAdapterReference === null) {
    return unavailable(input, readiness, "PROTOTYPE_ADAPTER_REFERENCE_REQUIRED");
  }
  if (input.rendererContractReference === null) {
    return unavailable(input, readiness, "RENDERER_CONTRACT_REFERENCE_REQUIRED");
  }
  if (input.isolatedPrototypeScopeReference === null) {
    return unavailable(
      input,
      readiness,
      "ISOLATED_PROTOTYPE_SCOPE_REFERENCE_REQUIRED",
    );
  }
  if (input.prototypeAdapterReference !== readiness.sourceAdapterResultReference) {
    return blocked(input, readiness, "PROTOTYPE_ADAPTER_REFERENCE_MISMATCH");
  }
  if (input.rendererContractReference !== readiness.rendererContractReference) {
    return blocked(input, readiness, "RENDERER_CONTRACT_REFERENCE_MISMATCH");
  }
  if (
    input.isolatedPrototypeScopeReference !== readiness.isolationScopeReference
  ) {
    return blocked(
      input,
      readiness,
      "ISOLATED_PROTOTYPE_SCOPE_REFERENCE_MISMATCH",
    );
  }
  if (
    input.isolatedPrototypeScopeReference.referenceType !==
      "STAR_BEAST_PROTOTYPE_ISOLATION_SCOPE" ||
    input.isolatedPrototypeScopeReference.scope !== "ISOLATED_PROTOTYPE_ONLY"
  ) {
    return blocked(
      input,
      readiness,
      "ISOLATED_PROTOTYPE_SCOPE_REFERENCE_INVALID",
    );
  }
  if (
    readiness.readiness !==
      "READY_FOR_ISOLATED_PROTOTYPE_RENDERER_CONSUMPTION" ||
    readiness.expressionChannelsReference !==
      input.prototypeAdapterReference.expressionChannels ||
    readiness.boundary.readinessOnly !== true ||
    readiness.boundary.noChannelConsumption !== true ||
    readiness.boundary.noRenderExecution !== true ||
    readiness.boundary.noCanvasConnection !== true ||
    readiness.boundary.noStarbeastLabConnection !== true ||
    readiness.boundary.noLifeStateMutation !== true ||
    readiness.boundary.noStorageWrite !== true
  ) {
    return blocked(input, readiness, "READINESS_BOUNDARY_INVALID");
  }

  const prototypeRendererInputReference: StarBeastPrototypeRendererInputReference =
    Object.freeze({
      referenceType: "STAR_BEAST_PROTOTYPE_RENDERER_INPUT_REFERENCE",
      sourceReadinessReference: readiness,
      prototypeAdapterReference: input.prototypeAdapterReference,
      expressionChannelsReference: readiness.expressionChannelsReference,
      rendererContractReference: input.rendererContractReference,
      isolatedPrototypeScopeReference:
        input.isolatedPrototypeScopeReference,
      stableConsumptionReference: true,
      notRenderInput: true,
      notRenderPlan: true,
      notVisualOutput: true,
      noVisualParametersCopied: true,
    });

  const consumption: StarBeastPrototypeExpressionChannelConsumption =
    Object.freeze({
      semanticRole: "STAR_BEAST_PROTOTYPE_EXPRESSION_CHANNEL_CONSUMPTION",
      sourceReadinessReference: readiness,
      prototypeRendererInputReference,
      consumptionStatus:
        "AVAILABLE_FOR_FUTURE_ISOLATED_PROTOTYPE_RENDERER",
      boundary: CONSUMPTION_BOUNDARY,
    });

  return Object.freeze({
    status: "AVAILABLE",
    source: "star_beast_prototype_expression_channel_consumption",
    input,
    consumption,
  });
}
