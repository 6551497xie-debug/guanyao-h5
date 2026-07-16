import type { ProductionIdentitySourceConvergenceReadinessResult } from "./productionIdentitySourceConvergenceReadiness";

export type ProductionIdentitySourceConvergenceAuthorizationInput = Readonly<{
  readinessResult: ProductionIdentitySourceConvergenceReadinessResult | null;
}>;

export type ProductionIdentitySourceConvergenceAuthorizationUnavailableReason =
  | "READINESS_RESULT_REQUIRED"
  | "READINESS_RESULT_UNAVAILABLE";

export type ProductionIdentitySourceConvergenceAuthorizationBlockedReason =
  | "READINESS_RESULT_BLOCKED"
  | "READINESS_BOUNDARY_INVALID";

export type ProductionIdentitySourceConvergenceAuthorizationBoundary = Readonly<{
  authorizationReviewOnly: true;
  isolatedConvergenceOnly: true;
  referenceOnly: true;
  noEngineInvocation: true;
  noIdentityConvergence: true;
  noPersonalStarBeastCreation: true;
  noUserInputBinding: true;
  noProductIntegration: true;
  noRendererInvocation: true;
  noStorageWrite: true;
  noLifeStateMutation: true;
}>;

export type ProductionIdentitySourceConvergenceAuthorizationReference = Readonly<{
  referenceType: "FORMAL_IDENTITY_SOURCE_CONVERGENCE_AUTHORIZATION";
  referenceId: string;
  readinessReference: Extract<
    ProductionIdentitySourceConvergenceReadinessResult,
    { status: "READY" }
  >["readinessReference"];
  authorizationScope: "ISOLATED_FORMAL_IDENTITY_SOURCE_CONVERGENCE_ONLY";
  convergenceAuthorization: "AUTHORIZED_FOR_ISOLATED_IDENTITY_SOURCE_CONVERGENCE";
  convergenceExecution: "NOT_PERFORMED";
  identityConvergence: "NOT_PERFORMED";
  personalStarBeastCreation: false;
  productionIntegration: false;
  userBinding: false;
  referenceOnly: true;
}>;

export type ProductionIdentitySourceConvergenceAuthorizationAuthorized = Readonly<{
  status: "AUTHORIZED";
  authorization: "AUTHORIZED_FOR_ISOLATED_IDENTITY_SOURCE_CONVERGENCE";
  source: "production_identity_source_convergence_authorization";
  input: ProductionIdentitySourceConvergenceAuthorizationInput;
  authorizationReference: ProductionIdentitySourceConvergenceAuthorizationReference;
  boundary: ProductionIdentitySourceConvergenceAuthorizationBoundary;
}>;

export type ProductionIdentitySourceConvergenceAuthorizationUnavailable = Readonly<{
  status: "UNAVAILABLE";
  authorization: "UNAVAILABLE";
  source: "production_identity_source_convergence_authorization";
  reason: ProductionIdentitySourceConvergenceAuthorizationUnavailableReason;
  input: ProductionIdentitySourceConvergenceAuthorizationInput;
  authorizationReference: null;
  boundary: ProductionIdentitySourceConvergenceAuthorizationBoundary;
}>;

export type ProductionIdentitySourceConvergenceAuthorizationBlocked = Readonly<{
  status: "BLOCKED";
  authorization: "BLOCKED";
  source: "production_identity_source_convergence_authorization";
  reason: ProductionIdentitySourceConvergenceAuthorizationBlockedReason;
  input: ProductionIdentitySourceConvergenceAuthorizationInput;
  authorizationReference: null;
  boundary: ProductionIdentitySourceConvergenceAuthorizationBoundary;
}>;

export type ProductionIdentitySourceConvergenceAuthorizationResult =
  | ProductionIdentitySourceConvergenceAuthorizationAuthorized
  | ProductionIdentitySourceConvergenceAuthorizationUnavailable
  | ProductionIdentitySourceConvergenceAuthorizationBlocked;
