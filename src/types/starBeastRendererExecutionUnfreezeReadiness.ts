import type { StarBeastRendererAuthorizationEndpointGovernanceReference } from "./starBeastRendererImplementationUnfreezeReadiness";

export type StarBeastRendererUnfreezeDeclarationEndpointGovernanceReference =
  Readonly<{
    referenceType: "STAR_BEAST_RENDERER_UNFREEZE_DECLARATION_ENDPOINT_GOVERNANCE";
    referenceId: string;
  }>;

export type StarBeastRendererExecutionScopeReference = Readonly<{
  referenceType: "STAR_BEAST_RENDERER_EXECUTION_SCOPE";
  referenceId: string;
}>;

export type StarBeastRendererRuntimeBoundaryReference = Readonly<{
  referenceType: "STAR_BEAST_RENDERER_RUNTIME_BOUNDARY";
  referenceId: string;
}>;

export type StarBeastRendererExecutionRollbackStrategyReference = Readonly<{
  referenceType: "STAR_BEAST_RENDERER_EXECUTION_ROLLBACK_STRATEGY";
  referenceId: string;
}>;

export type StarBeastRendererExecutionAcceptanceScopeReference = Readonly<{
  referenceType: "STAR_BEAST_RENDERER_EXECUTION_ACCEPTANCE_SCOPE";
  referenceId: string;
}>;

export type StarBeastRendererExecutionUnfreezeReadinessInput = Readonly<{
  unfreezeDeclarationEndpointGovernanceReference:
    | StarBeastRendererUnfreezeDeclarationEndpointGovernanceReference
    | null;
  authorizationEndpointGovernanceReference:
    | StarBeastRendererAuthorizationEndpointGovernanceReference
    | null;
  executionScopeReference: StarBeastRendererExecutionScopeReference | null;
  runtimeBoundaryReference: StarBeastRendererRuntimeBoundaryReference | null;
  rollbackStrategyReference:
    | StarBeastRendererExecutionRollbackStrategyReference
    | null;
  acceptanceScopeReference:
    | StarBeastRendererExecutionAcceptanceScopeReference
    | null;
}>;

export type StarBeastRendererExecutionUnfreezeReadinessReady = Readonly<{
  status: "READY";
  readiness: "READY_FOR_EXPLICIT_RENDERER_EXECUTION_UNFREEZE_DECLARATION";
  source: "star_beast_renderer_execution_unfreeze_readiness";
  input: StarBeastRendererExecutionUnfreezeReadinessInput;
  unfreezeDeclarationEndpointGovernanceReference: StarBeastRendererUnfreezeDeclarationEndpointGovernanceReference;
  authorizationEndpointGovernanceReference: StarBeastRendererAuthorizationEndpointGovernanceReference;
  executionScopeReference: StarBeastRendererExecutionScopeReference;
  runtimeBoundaryReference: StarBeastRendererRuntimeBoundaryReference;
  rollbackStrategyReference: StarBeastRendererExecutionRollbackStrategyReference;
  acceptanceScopeReference: StarBeastRendererExecutionAcceptanceScopeReference;
  explicitExecutionUnfreezeDeclarationRequired: true;
  executionUnfreezeDeferred: true;
  noP53ResultConsumption: true;
  noP59ResultConsumption: true;
  noFrozenEndpointResultConsumption: true;
  noFinalBackendSelection: true;
  noRendererCreation: true;
  noRenderExecution: true;
  noUIIntegration: true;
  noRuntimeIntegration: true;
  noStorageWrite: true;
}>;

export type StarBeastRendererExecutionUnfreezeReadinessNotReadyReason =
  | "EXECUTION_SCOPE_REFERENCE_REQUIRED"
  | "EXECUTION_SCOPE_REFERENCE_INVALID"
  | "RUNTIME_BOUNDARY_REFERENCE_REQUIRED"
  | "RUNTIME_BOUNDARY_REFERENCE_INVALID"
  | "ROLLBACK_STRATEGY_REFERENCE_REQUIRED"
  | "ROLLBACK_STRATEGY_REFERENCE_INVALID"
  | "EXECUTION_ACCEPTANCE_SCOPE_REFERENCE_REQUIRED"
  | "EXECUTION_ACCEPTANCE_SCOPE_REFERENCE_INVALID";

export type StarBeastRendererExecutionUnfreezeReadinessNotReady = Readonly<{
  status: "NOT_READY";
  readiness: "NOT_READY";
  source: "star_beast_renderer_execution_unfreeze_readiness";
  reason: StarBeastRendererExecutionUnfreezeReadinessNotReadyReason;
  input: StarBeastRendererExecutionUnfreezeReadinessInput;
  explicitExecutionUnfreezeDeclarationRequired: true;
  executionUnfreezeDeferred: true;
  noP53ResultConsumption: true;
  noP59ResultConsumption: true;
  noFrozenEndpointResultConsumption: true;
  noFinalBackendSelection: true;
  noRendererCreation: true;
  noRenderExecution: true;
}>;

export type StarBeastRendererExecutionUnfreezeReadinessUnavailableReason =
  | "UNFREEZE_DECLARATION_ENDPOINT_GOVERNANCE_REFERENCE_REQUIRED"
  | "UNFREEZE_DECLARATION_ENDPOINT_GOVERNANCE_REFERENCE_INVALID"
  | "AUTHORIZATION_ENDPOINT_GOVERNANCE_REFERENCE_REQUIRED"
  | "AUTHORIZATION_ENDPOINT_GOVERNANCE_REFERENCE_INVALID";

export type StarBeastRendererExecutionUnfreezeReadinessUnavailable = Readonly<{
  status: "UNAVAILABLE";
  readiness: "UNAVAILABLE";
  source: "star_beast_renderer_execution_unfreeze_readiness";
  reason: StarBeastRendererExecutionUnfreezeReadinessUnavailableReason;
  input: StarBeastRendererExecutionUnfreezeReadinessInput;
  explicitExecutionUnfreezeDeclarationRequired: true;
  executionUnfreezeDeferred: true;
  noP53ResultConsumption: true;
  noP59ResultConsumption: true;
  noFrozenEndpointResultConsumption: true;
  noFinalBackendSelection: true;
  noRendererCreation: true;
  noRenderExecution: true;
}>;

export type StarBeastRendererExecutionUnfreezeReadinessResult =
  | StarBeastRendererExecutionUnfreezeReadinessReady
  | StarBeastRendererExecutionUnfreezeReadinessNotReady
  | StarBeastRendererExecutionUnfreezeReadinessUnavailable;
