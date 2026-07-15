import type {
  StarBeastRendererExecutionUnfreezeReadinessInput,
  StarBeastRendererExecutionUnfreezeReadinessResult,
} from "../types/starBeastRendererExecutionUnfreezeReadiness";

const EXECUTION_UNFREEZE_READINESS_GUARDRAILS = Object.freeze({
  explicitExecutionUnfreezeDeclarationRequired: true,
  executionUnfreezeDeferred: true,
  noP53ResultConsumption: true,
  noP59ResultConsumption: true,
  noFrozenEndpointResultConsumption: true,
  noFinalBackendSelection: true,
  noRendererCreation: true,
  noRenderExecution: true,
} as const);

export function resolveStarBeastRendererExecutionUnfreezeReadiness(
  input: StarBeastRendererExecutionUnfreezeReadinessInput,
): StarBeastRendererExecutionUnfreezeReadinessResult {
  const unfreezeGovernanceReference =
    input.unfreezeDeclarationEndpointGovernanceReference;

  if (unfreezeGovernanceReference === null) {
    return Object.freeze({
      status: "UNAVAILABLE",
      readiness: "UNAVAILABLE",
      source: "star_beast_renderer_execution_unfreeze_readiness",
      reason:
        "UNFREEZE_DECLARATION_ENDPOINT_GOVERNANCE_REFERENCE_REQUIRED",
      input,
      ...EXECUTION_UNFREEZE_READINESS_GUARDRAILS,
    });
  }

  if (
    unfreezeGovernanceReference.referenceType !==
      "STAR_BEAST_RENDERER_UNFREEZE_DECLARATION_ENDPOINT_GOVERNANCE" ||
    unfreezeGovernanceReference.referenceId.trim().length === 0
  ) {
    return Object.freeze({
      status: "UNAVAILABLE",
      readiness: "UNAVAILABLE",
      source: "star_beast_renderer_execution_unfreeze_readiness",
      reason: "UNFREEZE_DECLARATION_ENDPOINT_GOVERNANCE_REFERENCE_INVALID",
      input,
      ...EXECUTION_UNFREEZE_READINESS_GUARDRAILS,
    });
  }

  const authorizationGovernanceReference =
    input.authorizationEndpointGovernanceReference;

  if (authorizationGovernanceReference === null) {
    return Object.freeze({
      status: "UNAVAILABLE",
      readiness: "UNAVAILABLE",
      source: "star_beast_renderer_execution_unfreeze_readiness",
      reason: "AUTHORIZATION_ENDPOINT_GOVERNANCE_REFERENCE_REQUIRED",
      input,
      ...EXECUTION_UNFREEZE_READINESS_GUARDRAILS,
    });
  }

  if (
    authorizationGovernanceReference.referenceType !==
      "STAR_BEAST_RENDERER_AUTHORIZATION_ENDPOINT_GOVERNANCE" ||
    authorizationGovernanceReference.referenceId.trim().length === 0
  ) {
    return Object.freeze({
      status: "UNAVAILABLE",
      readiness: "UNAVAILABLE",
      source: "star_beast_renderer_execution_unfreeze_readiness",
      reason: "AUTHORIZATION_ENDPOINT_GOVERNANCE_REFERENCE_INVALID",
      input,
      ...EXECUTION_UNFREEZE_READINESS_GUARDRAILS,
    });
  }

  if (input.executionScopeReference === null) {
    return Object.freeze({
      status: "NOT_READY",
      readiness: "NOT_READY",
      source: "star_beast_renderer_execution_unfreeze_readiness",
      reason: "EXECUTION_SCOPE_REFERENCE_REQUIRED",
      input,
      ...EXECUTION_UNFREEZE_READINESS_GUARDRAILS,
    });
  }

  if (
    input.executionScopeReference.referenceType !==
      "STAR_BEAST_RENDERER_EXECUTION_SCOPE" ||
    input.executionScopeReference.referenceId.trim().length === 0
  ) {
    return Object.freeze({
      status: "NOT_READY",
      readiness: "NOT_READY",
      source: "star_beast_renderer_execution_unfreeze_readiness",
      reason: "EXECUTION_SCOPE_REFERENCE_INVALID",
      input,
      ...EXECUTION_UNFREEZE_READINESS_GUARDRAILS,
    });
  }

  if (input.runtimeBoundaryReference === null) {
    return Object.freeze({
      status: "NOT_READY",
      readiness: "NOT_READY",
      source: "star_beast_renderer_execution_unfreeze_readiness",
      reason: "RUNTIME_BOUNDARY_REFERENCE_REQUIRED",
      input,
      ...EXECUTION_UNFREEZE_READINESS_GUARDRAILS,
    });
  }

  if (
    input.runtimeBoundaryReference.referenceType !==
      "STAR_BEAST_RENDERER_RUNTIME_BOUNDARY" ||
    input.runtimeBoundaryReference.referenceId.trim().length === 0
  ) {
    return Object.freeze({
      status: "NOT_READY",
      readiness: "NOT_READY",
      source: "star_beast_renderer_execution_unfreeze_readiness",
      reason: "RUNTIME_BOUNDARY_REFERENCE_INVALID",
      input,
      ...EXECUTION_UNFREEZE_READINESS_GUARDRAILS,
    });
  }

  if (input.rollbackStrategyReference === null) {
    return Object.freeze({
      status: "NOT_READY",
      readiness: "NOT_READY",
      source: "star_beast_renderer_execution_unfreeze_readiness",
      reason: "ROLLBACK_STRATEGY_REFERENCE_REQUIRED",
      input,
      ...EXECUTION_UNFREEZE_READINESS_GUARDRAILS,
    });
  }

  if (
    input.rollbackStrategyReference.referenceType !==
      "STAR_BEAST_RENDERER_EXECUTION_ROLLBACK_STRATEGY" ||
    input.rollbackStrategyReference.referenceId.trim().length === 0
  ) {
    return Object.freeze({
      status: "NOT_READY",
      readiness: "NOT_READY",
      source: "star_beast_renderer_execution_unfreeze_readiness",
      reason: "ROLLBACK_STRATEGY_REFERENCE_INVALID",
      input,
      ...EXECUTION_UNFREEZE_READINESS_GUARDRAILS,
    });
  }

  if (input.acceptanceScopeReference === null) {
    return Object.freeze({
      status: "NOT_READY",
      readiness: "NOT_READY",
      source: "star_beast_renderer_execution_unfreeze_readiness",
      reason: "EXECUTION_ACCEPTANCE_SCOPE_REFERENCE_REQUIRED",
      input,
      ...EXECUTION_UNFREEZE_READINESS_GUARDRAILS,
    });
  }

  if (
    input.acceptanceScopeReference.referenceType !==
      "STAR_BEAST_RENDERER_EXECUTION_ACCEPTANCE_SCOPE" ||
    input.acceptanceScopeReference.referenceId.trim().length === 0
  ) {
    return Object.freeze({
      status: "NOT_READY",
      readiness: "NOT_READY",
      source: "star_beast_renderer_execution_unfreeze_readiness",
      reason: "EXECUTION_ACCEPTANCE_SCOPE_REFERENCE_INVALID",
      input,
      ...EXECUTION_UNFREEZE_READINESS_GUARDRAILS,
    });
  }

  return Object.freeze({
    status: "READY",
    readiness:
      "READY_FOR_EXPLICIT_RENDERER_EXECUTION_UNFREEZE_DECLARATION",
    source: "star_beast_renderer_execution_unfreeze_readiness",
    input,
    unfreezeDeclarationEndpointGovernanceReference:
      unfreezeGovernanceReference,
    authorizationEndpointGovernanceReference:
      authorizationGovernanceReference,
    executionScopeReference: input.executionScopeReference,
    runtimeBoundaryReference: input.runtimeBoundaryReference,
    rollbackStrategyReference: input.rollbackStrategyReference,
    acceptanceScopeReference: input.acceptanceScopeReference,
    explicitExecutionUnfreezeDeclarationRequired: true,
    executionUnfreezeDeferred: true,
    noP53ResultConsumption: true,
    noP59ResultConsumption: true,
    noFrozenEndpointResultConsumption: true,
    noFinalBackendSelection: true,
    noRendererCreation: true,
    noRenderExecution: true,
    noUIIntegration: true,
    noRuntimeIntegration: true,
    noStorageWrite: true,
  });
}
