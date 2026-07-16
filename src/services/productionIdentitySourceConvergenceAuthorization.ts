import type { ProductionIdentitySourceConvergenceReadinessReady } from "../types/productionIdentitySourceConvergenceReadiness";
import type {
  ProductionIdentitySourceConvergenceAuthorizationBlockedReason,
  ProductionIdentitySourceConvergenceAuthorizationBoundary,
  ProductionIdentitySourceConvergenceAuthorizationInput,
  ProductionIdentitySourceConvergenceAuthorizationResult,
  ProductionIdentitySourceConvergenceAuthorizationUnavailableReason,
} from "../types/productionIdentitySourceConvergenceAuthorization";

const AUTHORIZATION_BOUNDARY: ProductionIdentitySourceConvergenceAuthorizationBoundary =
  Object.freeze({
    authorizationReviewOnly: true,
    isolatedConvergenceOnly: true,
    referenceOnly: true,
    noEngineInvocation: true,
    noIdentityConvergence: true,
    noPersonalStarBeastCreation: true,
    noUserInputBinding: true,
    noProductIntegration: true,
    noRendererInvocation: true,
    noStorageWrite: true,
    noLifeStateMutation: true,
  });

const unavailable = (
  input: ProductionIdentitySourceConvergenceAuthorizationInput,
  reason: ProductionIdentitySourceConvergenceAuthorizationUnavailableReason,
): ProductionIdentitySourceConvergenceAuthorizationResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    authorization: "UNAVAILABLE" as const,
    source: "production_identity_source_convergence_authorization" as const,
    reason,
    input,
    authorizationReference: null,
    boundary: AUTHORIZATION_BOUNDARY,
  });

const blocked = (
  input: ProductionIdentitySourceConvergenceAuthorizationInput,
  reason: ProductionIdentitySourceConvergenceAuthorizationBlockedReason,
): ProductionIdentitySourceConvergenceAuthorizationResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    authorization: "BLOCKED" as const,
    source: "production_identity_source_convergence_authorization" as const,
    reason,
    input,
    authorizationReference: null,
    boundary: AUTHORIZATION_BOUNDARY,
  });

function isReady(
  result: ProductionIdentitySourceConvergenceAuthorizationInput["readinessResult"],
): result is ProductionIdentitySourceConvergenceReadinessReady {
  if (result === null || result.status !== "READY") return false;
  const reference = result.readinessReference;
  return (
    result.readiness === "READY_FOR_FORMAL_IDENTITY_SOURCE_CONVERGENCE" &&
    result.source === "production_identity_source_convergence_readiness" &&
    result.boundary.readinessOnly === true &&
    result.boundary.convergenceContractOnly === true &&
    result.boundary.referenceOnly === true &&
    result.boundary.noEngineInvocation === true &&
    result.boundary.noIdentityConvergence === true &&
    result.boundary.noPersonalStarBeastCreation === true &&
    result.boundary.noUserInputBinding === true &&
    result.boundary.noProductIntegration === true &&
    result.boundary.noRendererInvocation === true &&
    result.boundary.noStorageWrite === true &&
    result.boundary.noLifeStateMutation === true &&
    reference.referenceType === "FORMAL_IDENTITY_SOURCE_CONVERGENCE_READINESS" &&
    reference.convergence === "NOT_PERFORMED" &&
    reference.personalStarBeastCreation === false &&
    reference.productionIntegration === false &&
    reference.userBinding === false &&
    reference.referenceOnly === true &&
    reference.sourceIndependence.mansionAndFourSymbolFromSameFormalEngine === true &&
    reference.sourceIndependence.motherCodeFromIndependentFormalEngine === true &&
    reference.sourceIndependence.fourSymbolDoesNotDeriveMotherCode === true &&
    reference.sourceIndependence.motherCodeDoesNotDeriveFourSymbol === true
  );
}

export function authorizeProductionIdentitySourceConvergence(
  input: ProductionIdentitySourceConvergenceAuthorizationInput,
): ProductionIdentitySourceConvergenceAuthorizationResult {
  const readiness = input.readinessResult;
  if (readiness === null) return unavailable(input, "READINESS_RESULT_REQUIRED");
  if (readiness.status === "UNAVAILABLE") {
    return unavailable(input, "READINESS_RESULT_UNAVAILABLE");
  }
  if (readiness.status === "BLOCKED") {
    return blocked(input, "READINESS_RESULT_BLOCKED");
  }
  if (!isReady(readiness)) {
    return blocked(input, "READINESS_BOUNDARY_INVALID");
  }

  return Object.freeze({
    status: "AUTHORIZED" as const,
    authorization: "AUTHORIZED_FOR_ISOLATED_IDENTITY_SOURCE_CONVERGENCE" as const,
    source: "production_identity_source_convergence_authorization" as const,
    input,
    authorizationReference: Object.freeze({
      referenceType: "FORMAL_IDENTITY_SOURCE_CONVERGENCE_AUTHORIZATION" as const,
      referenceId: `formal-identity-source-convergence-authorization:${readiness.readinessReference.referenceId}`,
      readinessReference: readiness.readinessReference,
      authorizationScope: "ISOLATED_FORMAL_IDENTITY_SOURCE_CONVERGENCE_ONLY" as const,
      convergenceAuthorization: "AUTHORIZED_FOR_ISOLATED_IDENTITY_SOURCE_CONVERGENCE" as const,
      convergenceExecution: "NOT_PERFORMED" as const,
      identityConvergence: "NOT_PERFORMED" as const,
      personalStarBeastCreation: false as const,
      productionIntegration: false as const,
      userBinding: false as const,
      referenceOnly: true as const,
    }),
    boundary: AUTHORIZATION_BOUNDARY,
  });
}
