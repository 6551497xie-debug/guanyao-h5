import type {
  PersonalStarBeastIdentityRealUserStorageImplementationReadinessBlockedReason,
  PersonalStarBeastIdentityRealUserStorageImplementationReadinessBoundary,
  PersonalStarBeastIdentityRealUserStorageImplementationReadinessInput,
  PersonalStarBeastIdentityRealUserStorageImplementationReadinessResult,
  PersonalStarBeastIdentityRealUserStorageImplementationReadinessUnavailableReason,
} from "../types/personalStarBeastIdentityRealUserStorageImplementationReadiness";

const READINESS_BOUNDARY: PersonalStarBeastIdentityRealUserStorageImplementationReadinessBoundary = Object.freeze({
  readinessOnly: true,
  referenceOnly: true,
  implementationNotStarted: true,
  authorizationConsumedOnly: true,
  realAuthenticationPerformed: false,
  storageAdapterCreated: false,
  storageReadPerformed: false,
  storageWritePerformed: false,
  productIntegrationPerformed: false,
  noRawUserData: true,
  noUserBinding: true,
  noUIIntegration: true,
  noEngineInvocation: true,
  noRendererInvocation: true,
  noLifeStateMutation: true,
});

const unavailable = (
  input: PersonalStarBeastIdentityRealUserStorageImplementationReadinessInput,
  reason: PersonalStarBeastIdentityRealUserStorageImplementationReadinessUnavailableReason,
): PersonalStarBeastIdentityRealUserStorageImplementationReadinessResult => Object.freeze({
  status: "UNAVAILABLE" as const,
  readiness: "UNAVAILABLE" as const,
  source: "personal_star_beast_identity_real_user_storage_implementation_readiness" as const,
  reason,
  input,
  readinessReference: null,
  boundary: READINESS_BOUNDARY,
});

const blocked = (
  input: PersonalStarBeastIdentityRealUserStorageImplementationReadinessInput,
  reason: PersonalStarBeastIdentityRealUserStorageImplementationReadinessBlockedReason,
): PersonalStarBeastIdentityRealUserStorageImplementationReadinessResult => Object.freeze({
  status: "BLOCKED" as const,
  readiness: "BLOCKED" as const,
  source: "personal_star_beast_identity_real_user_storage_implementation_readiness" as const,
  reason,
  input,
  readinessReference: null,
  boundary: READINESS_BOUNDARY,
});

const notAuthorized = (
  input: PersonalStarBeastIdentityRealUserStorageImplementationReadinessInput,
): PersonalStarBeastIdentityRealUserStorageImplementationReadinessResult => Object.freeze({
  status: "NOT_AUTHORIZED" as const,
  readiness: "NOT_AUTHORIZED" as const,
  source: "personal_star_beast_identity_real_user_storage_implementation_readiness" as const,
  reason: "IMPLEMENTATION_AUTHORIZATION_DECLINED" as const,
  input,
  readinessReference: null,
  boundary: READINESS_BOUNDARY,
});

export function resolvePersonalStarBeastIdentityRealUserStorageImplementationReadiness(
  input: PersonalStarBeastIdentityRealUserStorageImplementationReadinessInput,
): PersonalStarBeastIdentityRealUserStorageImplementationReadinessResult {
  const consumption = input.authorizationConsumptionResult;
  if (consumption === null) {
    return unavailable(input, "AUTHORIZATION_CONSUMPTION_RESULT_REQUIRED");
  }
  if (consumption.status === "UNAVAILABLE") {
    return unavailable(input, "AUTHORIZATION_CONSUMPTION_RESULT_UNAVAILABLE");
  }
  if (consumption.status === "BLOCKED") {
    return blocked(input, "AUTHORIZATION_CONSUMPTION_RESULT_BLOCKED");
  }
  if (consumption.status === "NOT_AUTHORIZED") {
    if (consumption.reason !== "IMPLEMENTATION_AUTHORIZATION_DECLINED") {
      return blocked(input, "AUTHORIZATION_CONSUMPTION_REFERENCE_INVALID");
    }
    return notAuthorized(input);
  }

  if (
    consumption.status !== "AVAILABLE" ||
    consumption.source !==
      "personal_star_beast_identity_real_user_storage_implementation_authorization_consumption" ||
    consumption.consumption.semanticRole !==
      "REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION_CONSUMPTION" ||
    consumption.consumption.decisionOutcome !== "GRANTED" ||
    consumption.consumption.authorizationStatus !== "AUTHORIZED" ||
    consumption.consumption.implementationAuthorized !== true ||
    consumption.consumption.consumptionStatus !==
      "AVAILABLE_FOR_FUTURE_REAL_USER_STORAGE_IMPLEMENTATION" ||
    consumption.consumption.authorizationConsumedOnly !== true ||
    consumption.consumption.implementationDeferred !== true ||
    consumption.consumption.realAuthenticationDeferred !== true ||
    consumption.consumption.storageWriteDeferred !== true ||
    consumption.consumption.productIntegrationDeferred !== true ||
    consumption.consumption.noUIIntegration !== true ||
    consumption.consumption.noEngineInvocation !== true ||
    consumption.consumption.noRendererInvocation !== true ||
    consumption.consumption.noLifeStateMutation !== true
  ) {
    return blocked(input, "AUTHORIZATION_CONSUMPTION_BOUNDARY_INVALID");
  }

  const consumptionReference = consumption.consumption;
  return Object.freeze({
    status: "READY" as const,
    readiness: "READY_FOR_REAL_USER_STORAGE_IMPLEMENTATION_REVIEW" as const,
    source: "personal_star_beast_identity_real_user_storage_implementation_readiness" as const,
    input,
    readinessReference: Object.freeze({
      referenceType:
        "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_IMPLEMENTATION_READINESS" as const,
      referenceId: `personal-star-beast-real-user-storage-implementation-readiness:${consumptionReference.authorizationDecisionResolutionReference.referenceId}`,
      readinessScope:
        "FUTURE_REAL_USER_STORAGE_IMPLEMENTATION_REVIEW_ONLY" as const,
      authorizationConsumptionReference: consumptionReference,
      implementationScope: Object.freeze({
        scope: "REAL_USER_STORAGE_IMPLEMENTATION_REVIEW_ONLY" as const,
        mayDesignAuthenticationAdapter: true as const,
        mayDesignStorageAdapter: true as const,
        mayCreateAuthenticationAdapter: false as const,
        mayCreateStorageAdapter: false as const,
        mayInvokeAuthentication: false as const,
        mayReadStorage: false as const,
        mayWriteStorage: false as const,
        mayBindRealUser: false as const,
        mayIntegrateProduct: false as const,
        mayIntegrateUi: false as const,
      }),
      readinessOnly: true as const,
      referenceOnly: true as const,
      implementationNotStarted: true as const,
      authorizationConsumedOnly: true as const,
      noRawUserData: true as const,
      noUserBinding: true as const,
      noUIIntegration: true as const,
      noEngineInvocation: true as const,
      noRendererInvocation: true as const,
      noLifeStateMutation: true as const,
    }),
    boundary: READINESS_BOUNDARY,
  });
}
