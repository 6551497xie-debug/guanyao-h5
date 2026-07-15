import type {
  StarBeastRendererImplementationUnfreezeReadinessInput,
  StarBeastRendererImplementationUnfreezeReadinessResult,
} from "../types/starBeastRendererImplementationUnfreezeReadiness";

const UNFREEZE_READINESS_GUARDRAILS = Object.freeze({
  explicitUnfreezeDeclarationRequired: true,
  unfreezeDeferred: true,
  noUnfreezeIssued: true,
  noAuthorizationEndpointConsumption: true,
  noFinalBackendSelection: true,
  noRendererCreation: true,
  noRenderExecution: true,
} as const);

export function resolveStarBeastRendererImplementationUnfreezeReadiness(
  input: StarBeastRendererImplementationUnfreezeReadinessInput,
): StarBeastRendererImplementationUnfreezeReadinessResult {
  const authorizationEndpointGovernanceReference =
    input.authorizationEndpointGovernanceReference;

  if (authorizationEndpointGovernanceReference === null) {
    return Object.freeze({
      status: "UNAVAILABLE",
      readiness: "UNAVAILABLE",
      source: "star_beast_renderer_implementation_unfreeze_readiness",
      reason: "AUTHORIZATION_ENDPOINT_GOVERNANCE_REFERENCE_REQUIRED",
      input,
      ...UNFREEZE_READINESS_GUARDRAILS,
    });
  }

  if (
    authorizationEndpointGovernanceReference.referenceType !==
      "STAR_BEAST_RENDERER_AUTHORIZATION_ENDPOINT_GOVERNANCE" ||
    authorizationEndpointGovernanceReference.referenceId.trim().length === 0
  ) {
    return Object.freeze({
      status: "UNAVAILABLE",
      readiness: "UNAVAILABLE",
      source: "star_beast_renderer_implementation_unfreeze_readiness",
      reason: "AUTHORIZATION_ENDPOINT_GOVERNANCE_REFERENCE_INVALID",
      input,
      ...UNFREEZE_READINESS_GUARDRAILS,
    });
  }

  if (input.implementationScenarioReference === null) {
    return Object.freeze({
      status: "NOT_READY",
      readiness: "NOT_READY",
      source: "star_beast_renderer_implementation_unfreeze_readiness",
      reason: "IMPLEMENTATION_SCENARIO_REFERENCE_REQUIRED",
      input,
      ...UNFREEZE_READINESS_GUARDRAILS,
    });
  }

  if (
    input.implementationScenarioReference.referenceType !==
      "STAR_BEAST_RENDERER_IMPLEMENTATION_SCENARIO" ||
    input.implementationScenarioReference.referenceId.trim().length === 0
  ) {
    return Object.freeze({
      status: "NOT_READY",
      readiness: "NOT_READY",
      source: "star_beast_renderer_implementation_unfreeze_readiness",
      reason: "IMPLEMENTATION_SCENARIO_REFERENCE_INVALID",
      input,
      ...UNFREEZE_READINESS_GUARDRAILS,
    });
  }

  if (input.backendCandidateReferences.length === 0) {
    return Object.freeze({
      status: "NOT_READY",
      readiness: "NOT_READY",
      source: "star_beast_renderer_implementation_unfreeze_readiness",
      reason: "BACKEND_CANDIDATE_REFERENCES_REQUIRED",
      input,
      ...UNFREEZE_READINESS_GUARDRAILS,
    });
  }

  const backendCandidateReferencesAreValid =
    input.backendCandidateReferences.every(
      (reference) =>
        reference.referenceType ===
          "STAR_BEAST_RENDERER_BACKEND_CANDIDATE" &&
        reference.referenceId.trim().length > 0,
    ) &&
    new Set(
      input.backendCandidateReferences.map((reference) => reference.referenceId),
    ).size === input.backendCandidateReferences.length;

  if (!backendCandidateReferencesAreValid) {
    return Object.freeze({
      status: "NOT_READY",
      readiness: "NOT_READY",
      source: "star_beast_renderer_implementation_unfreeze_readiness",
      reason: "BACKEND_CANDIDATE_REFERENCES_INVALID",
      input,
      ...UNFREEZE_READINESS_GUARDRAILS,
    });
  }

  if (input.fallbackStrategyReference === null) {
    return Object.freeze({
      status: "NOT_READY",
      readiness: "NOT_READY",
      source: "star_beast_renderer_implementation_unfreeze_readiness",
      reason: "FALLBACK_STRATEGY_REFERENCE_REQUIRED",
      input,
      ...UNFREEZE_READINESS_GUARDRAILS,
    });
  }

  if (
    input.fallbackStrategyReference.referenceType !==
      "STAR_BEAST_RENDERER_FALLBACK_STRATEGY" ||
    input.fallbackStrategyReference.referenceId.trim().length === 0
  ) {
    return Object.freeze({
      status: "NOT_READY",
      readiness: "NOT_READY",
      source: "star_beast_renderer_implementation_unfreeze_readiness",
      reason: "FALLBACK_STRATEGY_REFERENCE_INVALID",
      input,
      ...UNFREEZE_READINESS_GUARDRAILS,
    });
  }

  if (input.acceptanceScopeReference === null) {
    return Object.freeze({
      status: "NOT_READY",
      readiness: "NOT_READY",
      source: "star_beast_renderer_implementation_unfreeze_readiness",
      reason: "ACCEPTANCE_SCOPE_REFERENCE_REQUIRED",
      input,
      ...UNFREEZE_READINESS_GUARDRAILS,
    });
  }

  if (
    input.acceptanceScopeReference.referenceType !==
      "STAR_BEAST_RENDERER_IMPLEMENTATION_ACCEPTANCE_SCOPE" ||
    input.acceptanceScopeReference.referenceId.trim().length === 0
  ) {
    return Object.freeze({
      status: "NOT_READY",
      readiness: "NOT_READY",
      source: "star_beast_renderer_implementation_unfreeze_readiness",
      reason: "ACCEPTANCE_SCOPE_REFERENCE_INVALID",
      input,
      ...UNFREEZE_READINESS_GUARDRAILS,
    });
  }

  return Object.freeze({
    status: "READY",
    readiness: "READY_FOR_EXPLICIT_IMPLEMENTATION_UNFREEZE_DECLARATION",
    source: "star_beast_renderer_implementation_unfreeze_readiness",
    input,
    authorizationEndpointGovernanceReference,
    implementationScenarioReference: input.implementationScenarioReference,
    backendCandidateReferences: input.backendCandidateReferences,
    fallbackStrategyReference: input.fallbackStrategyReference,
    acceptanceScopeReference: input.acceptanceScopeReference,
    explicitUnfreezeDeclarationRequired: true,
    unfreezeDeferred: true,
    noUnfreezeIssued: true,
    noAuthorizationEndpointConsumption: true,
    noFinalBackendSelection: true,
    noRendererCreation: true,
    noRenderExecution: true,
    noUIIntegration: true,
    noRuntimeIntegration: true,
    noStorageWrite: true,
  });
}
