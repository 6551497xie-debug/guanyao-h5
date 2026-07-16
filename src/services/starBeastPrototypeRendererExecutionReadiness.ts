import type {
  StarBeastPrototypeRendererInputContractAvailable,
  StarBeastPrototypeRendererInputContractBlocked,
  StarBeastPrototypeRendererInputContractUnavailable,
} from "../types/starBeastPrototypeRendererInputContract";
import type {
  StarBeastPrototypeRendererExecutionReadinessBlockedReason,
  StarBeastPrototypeRendererExecutionReadinessInput,
  StarBeastPrototypeRendererExecutionReadinessResult,
  StarBeastPrototypeRendererExecutionReadinessUnavailableReason,
} from "../types/starBeastPrototypeRendererExecutionReadiness";

const EXECUTION_READINESS_BOUNDARY = Object.freeze({
  readinessOnly: true,
  explicitExecutionAuthorizationRequired: true,
  executionAuthorizationDeferred: true,
  noRendererInvocation: true,
  noRenderExecution: true,
  noDrawCommands: true,
  noBackendSelection: true,
  noRenderPlanGeneration: true,
  noCanvasConnection: true,
  noStarbeastLabConnection: true,
  noRuntimeIntegration: true,
  noStorageWrite: true,
});

const unavailable = (
  input: StarBeastPrototypeRendererExecutionReadinessInput,
  sourceInputContractResultReference:
    | StarBeastPrototypeRendererInputContractAvailable
    | StarBeastPrototypeRendererInputContractUnavailable
    | null,
  reason: StarBeastPrototypeRendererExecutionReadinessUnavailableReason,
): StarBeastPrototypeRendererExecutionReadinessResult =>
  Object.freeze({
    status: "UNAVAILABLE",
    readiness: "UNAVAILABLE",
    source: "star_beast_prototype_renderer_execution_readiness",
    reason,
    input,
    sourceInputContractResultReference,
    sourceUnavailableReason:
      sourceInputContractResultReference?.status === "UNAVAILABLE"
        ? sourceInputContractResultReference.reason
        : null,
    boundary: EXECUTION_READINESS_BOUNDARY,
  });

const blocked = (
  input: StarBeastPrototypeRendererExecutionReadinessInput,
  sourceInputContractResultReference:
    | StarBeastPrototypeRendererInputContractAvailable
    | StarBeastPrototypeRendererInputContractBlocked,
  reason: StarBeastPrototypeRendererExecutionReadinessBlockedReason,
): StarBeastPrototypeRendererExecutionReadinessResult =>
  Object.freeze({
    status: "BLOCKED",
    readiness: "BLOCKED",
    source: "star_beast_prototype_renderer_execution_readiness",
    reason,
    input,
    sourceInputContractResultReference,
    sourceBlockedReason:
      sourceInputContractResultReference.status === "BLOCKED"
        ? sourceInputContractResultReference.reason
        : null,
    boundary: EXECUTION_READINESS_BOUNDARY,
  });

export function resolveStarBeastPrototypeRendererExecutionReadiness(
  input: StarBeastPrototypeRendererExecutionReadinessInput,
): StarBeastPrototypeRendererExecutionReadinessResult {
  const inputContractResult = input.inputContractResultReference;

  if (inputContractResult === null) {
    return unavailable(
      input,
      null,
      "INPUT_CONTRACT_RESULT_REFERENCE_REQUIRED",
    );
  }
  if (inputContractResult.status === "UNAVAILABLE") {
    return unavailable(
      input,
      inputContractResult,
      "INPUT_CONTRACT_RESULT_UNAVAILABLE",
    );
  }
  if (inputContractResult.status === "BLOCKED") {
    return blocked(
      input,
      inputContractResult,
      "INPUT_CONTRACT_RESULT_BLOCKED",
    );
  }
  if (input.inputContractReference === null) {
    return unavailable(input, inputContractResult, "INPUT_CONTRACT_REFERENCE_REQUIRED");
  }
  if (input.executionSliceReference === null) {
    return unavailable(input, inputContractResult, "EXECUTION_SLICE_REFERENCE_REQUIRED");
  }
  if (input.executionStopReference === null) {
    return unavailable(input, inputContractResult, "EXECUTION_STOP_REFERENCE_REQUIRED");
  }
  if (input.inputContractReference !== inputContractResult.contract) {
    return blocked(input, inputContractResult, "INPUT_CONTRACT_REFERENCE_MISMATCH");
  }

  const contract = input.inputContractReference;
  if (
    contract.semanticRole !== "STAR_BEAST_PROTOTYPE_RENDERER_INPUT_CONTRACT" ||
    contract.contractStatus !==
      "AVAILABLE_FOR_FUTURE_PROTOTYPE_RENDERER_EXECUTION_READINESS" ||
    contract.rendererNeutral !== true ||
    contract.referenceOnly !== true ||
    contract.isolatedPrototypeScopeReference.scope !==
      "ISOLATED_PROTOTYPE_ONLY" ||
    contract.boundary.inputContractOnly !== true ||
    contract.boundary.noRendererInvocation !== true ||
    contract.boundary.noRenderExecution !== true ||
    contract.boundary.noDrawCommands !== true ||
    contract.boundary.noPixelParameters !== true ||
    contract.boundary.noRenderPlanGeneration !== true ||
    contract.boundary.noCanvasConnection !== true ||
    contract.boundary.noStarbeastLabConnection !== true ||
    contract.boundary.noRuntimeIntegration !== true ||
    contract.boundary.noStorageWrite !== true
  ) {
    return blocked(input, inputContractResult, "INPUT_CONTRACT_BOUNDARY_INVALID");
  }

  if (
    input.executionSliceReference.referenceType !==
      "STAR_BEAST_PROTOTYPE_EXECUTION_SLICE" ||
    input.executionSliceReference.referenceId.trim().length === 0 ||
    input.executionSliceReference.scope !== "ISOLATED_PROTOTYPE_ONLY" ||
    input.executionSliceReference.reversible !== true
  ) {
    return blocked(input, inputContractResult, "EXECUTION_SLICE_REFERENCE_INVALID");
  }
  if (
    input.executionStopReference.referenceType !==
      "STAR_BEAST_PROTOTYPE_EXECUTION_STOP" ||
    input.executionStopReference.referenceId.trim().length === 0 ||
    input.executionStopReference.stopOnBoundaryViolation !== true
  ) {
    return blocked(input, inputContractResult, "EXECUTION_STOP_REFERENCE_INVALID");
  }

  return Object.freeze({
    status: "READY",
    readiness:
      "READY_FOR_EXPLICIT_ISOLATED_PROTOTYPE_EXECUTION_AUTHORIZATION",
    source: "star_beast_prototype_renderer_execution_readiness",
    input,
    sourceInputContractResultReference: inputContractResult,
    inputContractReference: contract,
    executionSliceReference: input.executionSliceReference,
    executionStopReference: input.executionStopReference,
    boundary: EXECUTION_READINESS_BOUNDARY,
  });
}
