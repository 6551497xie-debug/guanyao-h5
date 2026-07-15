import type {
  StarBeastRendererExecutionProtocolReadinessInput,
  StarBeastRendererExecutionProtocolReadinessResult,
} from "../types/starBeastRendererExecutionProtocolReadiness";

const EXECUTION_PROTOCOL_READINESS_GUARDRAILS = Object.freeze({
  explicitExecutionProtocolAuthorizationRequired: true,
  executionProtocolAuthorizationDeferred: true,
  noP65ResultConsumption: true,
  noFrozenEndpointResultConsumption: true,
  noBackendSelection: true,
  noRendererCreation: true,
  noRenderExecution: true,
} as const);

export function resolveStarBeastRendererExecutionProtocolReadiness(
  input: StarBeastRendererExecutionProtocolReadinessInput,
): StarBeastRendererExecutionProtocolReadinessResult {
  const endpointGovernanceReference =
    input.executionUnfreezeEndpointGovernanceReference;

  if (endpointGovernanceReference === null) {
    return Object.freeze({
      status: "UNAVAILABLE",
      readiness: "UNAVAILABLE",
      source: "star_beast_renderer_execution_protocol_readiness",
      reason: "EXECUTION_UNFREEZE_ENDPOINT_GOVERNANCE_REFERENCE_REQUIRED",
      input,
      ...EXECUTION_PROTOCOL_READINESS_GUARDRAILS,
    });
  }

  if (
    endpointGovernanceReference.referenceType !==
      "STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_ENDPOINT_GOVERNANCE" ||
    endpointGovernanceReference.referenceId.trim().length === 0
  ) {
    return Object.freeze({
      status: "UNAVAILABLE",
      readiness: "UNAVAILABLE",
      source: "star_beast_renderer_execution_protocol_readiness",
      reason: "EXECUTION_UNFREEZE_ENDPOINT_GOVERNANCE_REFERENCE_INVALID",
      input,
      ...EXECUTION_PROTOCOL_READINESS_GUARDRAILS,
    });
  }

  if (input.backendSelectionAuthorityReference === null) {
    return Object.freeze({
      status: "NOT_READY",
      readiness: "NOT_READY",
      source: "star_beast_renderer_execution_protocol_readiness",
      reason: "BACKEND_SELECTION_AUTHORITY_REFERENCE_REQUIRED",
      input,
      ...EXECUTION_PROTOCOL_READINESS_GUARDRAILS,
    });
  }

  if (
    input.backendSelectionAuthorityReference.referenceType !==
      "STAR_BEAST_RENDERER_BACKEND_SELECTION_AUTHORITY" ||
    input.backendSelectionAuthorityReference.referenceId.trim().length === 0
  ) {
    return Object.freeze({
      status: "NOT_READY",
      readiness: "NOT_READY",
      source: "star_beast_renderer_execution_protocol_readiness",
      reason: "BACKEND_SELECTION_AUTHORITY_REFERENCE_INVALID",
      input,
      ...EXECUTION_PROTOCOL_READINESS_GUARDRAILS,
    });
  }

  if (input.executionSliceReference === null) {
    return Object.freeze({
      status: "NOT_READY",
      readiness: "NOT_READY",
      source: "star_beast_renderer_execution_protocol_readiness",
      reason: "EXECUTION_SLICE_REFERENCE_REQUIRED",
      input,
      ...EXECUTION_PROTOCOL_READINESS_GUARDRAILS,
    });
  }

  if (
    input.executionSliceReference.referenceType !==
      "STAR_BEAST_RENDERER_EXECUTION_SLICE" ||
    input.executionSliceReference.referenceId.trim().length === 0
  ) {
    return Object.freeze({
      status: "NOT_READY",
      readiness: "NOT_READY",
      source: "star_beast_renderer_execution_protocol_readiness",
      reason: "EXECUTION_SLICE_REFERENCE_INVALID",
      input,
      ...EXECUTION_PROTOCOL_READINESS_GUARDRAILS,
    });
  }

  if (input.failureStopReference === null) {
    return Object.freeze({
      status: "NOT_READY",
      readiness: "NOT_READY",
      source: "star_beast_renderer_execution_protocol_readiness",
      reason: "FAILURE_STOP_REFERENCE_REQUIRED",
      input,
      ...EXECUTION_PROTOCOL_READINESS_GUARDRAILS,
    });
  }

  if (
    input.failureStopReference.referenceType !==
      "STAR_BEAST_RENDERER_EXECUTION_FAILURE_STOP" ||
    input.failureStopReference.referenceId.trim().length === 0
  ) {
    return Object.freeze({
      status: "NOT_READY",
      readiness: "NOT_READY",
      source: "star_beast_renderer_execution_protocol_readiness",
      reason: "FAILURE_STOP_REFERENCE_INVALID",
      input,
      ...EXECUTION_PROTOCOL_READINESS_GUARDRAILS,
    });
  }

  if (input.rollbackReference === null) {
    return Object.freeze({
      status: "NOT_READY",
      readiness: "NOT_READY",
      source: "star_beast_renderer_execution_protocol_readiness",
      reason: "EXECUTION_PROTOCOL_ROLLBACK_REFERENCE_REQUIRED",
      input,
      ...EXECUTION_PROTOCOL_READINESS_GUARDRAILS,
    });
  }

  if (
    input.rollbackReference.referenceType !==
      "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_ROLLBACK" ||
    input.rollbackReference.referenceId.trim().length === 0
  ) {
    return Object.freeze({
      status: "NOT_READY",
      readiness: "NOT_READY",
      source: "star_beast_renderer_execution_protocol_readiness",
      reason: "EXECUTION_PROTOCOL_ROLLBACK_REFERENCE_INVALID",
      input,
      ...EXECUTION_PROTOCOL_READINESS_GUARDRAILS,
    });
  }

  if (input.acceptanceReference === null) {
    return Object.freeze({
      status: "NOT_READY",
      readiness: "NOT_READY",
      source: "star_beast_renderer_execution_protocol_readiness",
      reason: "EXECUTION_PROTOCOL_ACCEPTANCE_REFERENCE_REQUIRED",
      input,
      ...EXECUTION_PROTOCOL_READINESS_GUARDRAILS,
    });
  }

  if (
    input.acceptanceReference.referenceType !==
      "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_ACCEPTANCE" ||
    input.acceptanceReference.referenceId.trim().length === 0
  ) {
    return Object.freeze({
      status: "NOT_READY",
      readiness: "NOT_READY",
      source: "star_beast_renderer_execution_protocol_readiness",
      reason: "EXECUTION_PROTOCOL_ACCEPTANCE_REFERENCE_INVALID",
      input,
      ...EXECUTION_PROTOCOL_READINESS_GUARDRAILS,
    });
  }

  return Object.freeze({
    status: "READY",
    readiness:
      "READY_FOR_EXPLICIT_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION",
    source: "star_beast_renderer_execution_protocol_readiness",
    input,
    executionUnfreezeEndpointGovernanceReference:
      endpointGovernanceReference,
    backendSelectionAuthorityReference:
      input.backendSelectionAuthorityReference,
    executionSliceReference: input.executionSliceReference,
    failureStopReference: input.failureStopReference,
    rollbackReference: input.rollbackReference,
    acceptanceReference: input.acceptanceReference,
    explicitExecutionProtocolAuthorizationRequired: true,
    executionProtocolAuthorizationDeferred: true,
    noP65ResultConsumption: true,
    noFrozenEndpointResultConsumption: true,
    noBackendSelection: true,
    noRendererCreation: true,
    noRenderExecution: true,
    noUIIntegration: true,
    noRuntimeIntegration: true,
    noStorageWrite: true,
  });
}
