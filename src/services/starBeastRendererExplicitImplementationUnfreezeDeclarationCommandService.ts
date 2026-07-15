import type {
  StarBeastRendererExplicitImplementationUnfreezeDeclarationCommand,
  StarBeastRendererExplicitImplementationUnfreezeDeclarationCommandInput,
  StarBeastRendererExplicitImplementationUnfreezeDeclarationCommandResult,
} from "../types/starBeastRendererExplicitImplementationUnfreezeDeclarationCommand";

const isValidAuthorityReference = (
  reference: StarBeastRendererExplicitImplementationUnfreezeDeclarationCommandInput["authorityReference"],
): reference is NonNullable<
  StarBeastRendererExplicitImplementationUnfreezeDeclarationCommandInput["authorityReference"]
> =>
  reference !== null &&
  reference.referenceType ===
    "STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE_AUTHORITY" &&
  reference.referenceId.trim().length > 0;

export function resolveStarBeastRendererExplicitImplementationUnfreezeDeclarationCommand(
  input: StarBeastRendererExplicitImplementationUnfreezeDeclarationCommandInput,
): StarBeastRendererExplicitImplementationUnfreezeDeclarationCommandResult {
  const readiness = input.readinessResult;

  if (readiness === null) {
    return Object.freeze({
      status: "UNAVAILABLE",
      source:
        "star_beast_renderer_explicit_implementation_unfreeze_declaration_command",
      reason: "UNFREEZE_READINESS_RESULT_REQUIRED",
      input,
      readiness: null,
      sourceReadinessReason: null,
      noCommand: true,
      notUnfreezeDeclaration: true,
      noUnfreezeIssued: true,
      noRenderExecution: true,
    });
  }

  if (readiness.status === "UNAVAILABLE") {
    return Object.freeze({
      status: "UNAVAILABLE",
      source:
        "star_beast_renderer_explicit_implementation_unfreeze_declaration_command",
      reason: "UNFREEZE_READINESS_UNAVAILABLE",
      input,
      readiness,
      sourceReadinessReason: readiness.reason,
      noCommand: true,
      notUnfreezeDeclaration: true,
      noUnfreezeIssued: true,
      noRenderExecution: true,
    });
  }

  if (readiness.status === "NOT_READY") {
    return Object.freeze({
      status: "NOT_READY",
      source:
        "star_beast_renderer_explicit_implementation_unfreeze_declaration_command",
      reason: "UNFREEZE_READINESS_NOT_READY",
      input,
      readiness,
      sourceReadinessReason: readiness.reason,
      noCommand: true,
      notUnfreezeDeclaration: true,
      noUnfreezeIssued: true,
      noRenderExecution: true,
    });
  }

  if (input.authorityReference === null) {
    return Object.freeze({
      status: "NOT_READY",
      source:
        "star_beast_renderer_explicit_implementation_unfreeze_declaration_command",
      reason: "UNFREEZE_AUTHORITY_REFERENCE_REQUIRED",
      input,
      readiness,
      sourceReadinessReason: null,
      noCommand: true,
      notUnfreezeDeclaration: true,
      noUnfreezeIssued: true,
      noRenderExecution: true,
    });
  }

  if (!isValidAuthorityReference(input.authorityReference)) {
    return Object.freeze({
      status: "NOT_READY",
      source:
        "star_beast_renderer_explicit_implementation_unfreeze_declaration_command",
      reason: "UNFREEZE_AUTHORITY_REFERENCE_INVALID",
      input,
      readiness,
      sourceReadinessReason: null,
      noCommand: true,
      notUnfreezeDeclaration: true,
      noUnfreezeIssued: true,
      noRenderExecution: true,
    });
  }

  if (input.decision !== "DECLARE_UNFREEZE") {
    return Object.freeze({
      status: "NOT_READY",
      source:
        "star_beast_renderer_explicit_implementation_unfreeze_declaration_command",
      reason: "EXPLICIT_DECLARE_UNFREEZE_DECISION_REQUIRED",
      input,
      readiness,
      sourceReadinessReason: null,
      noCommand: true,
      notUnfreezeDeclaration: true,
      noUnfreezeIssued: true,
      noRenderExecution: true,
    });
  }

  const command: StarBeastRendererExplicitImplementationUnfreezeDeclarationCommand =
    Object.freeze({
      source: "explicit_renderer_implementation_unfreeze_decision",
      semanticRole:
        "STAR_BEAST_RENDERER_EXPLICIT_IMPLEMENTATION_UNFREEZE_DECLARATION_COMMAND",
      authorityReference: input.authorityReference,
      decision: input.decision,
      declarationIntent:
        "DECLARE_STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE",
      readinessReference: readiness,
      authorizationEndpointGovernanceReference:
        readiness.authorizationEndpointGovernanceReference,
      implementationScenarioReference: readiness.implementationScenarioReference,
      backendCandidateReferences: readiness.backendCandidateReferences,
      fallbackStrategyReference: readiness.fallbackStrategyReference,
      acceptanceScopeReference: readiness.acceptanceScopeReference,
      authorityConfirmed: true,
      explicit: true,
      commandOnly: true,
      notUnfreezeDeclaration: true,
      noUnfreezeIssued: true,
      noAuthorizationEndpointConsumption: true,
      noFinalBackendSelection: true,
      noRendererCreation: true,
      noRenderExecution: true,
      noUIIntegration: true,
      noRuntimeIntegration: true,
      noStorageWrite: true,
    });

  return Object.freeze({
    status: "AVAILABLE",
    source:
      "star_beast_renderer_explicit_implementation_unfreeze_declaration_command",
    input,
    readiness,
    command,
  });
}
