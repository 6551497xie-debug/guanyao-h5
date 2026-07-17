import type {
  PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumptionBlockedReason,
  PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumptionInput,
  PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumptionResult,
  PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumptionUnavailableReason,
} from "../types/personalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumption";
import type { PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionUnavailable } from "../types/personalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolution";

const unavailable = (
  input: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumptionInput,
  reason: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumptionUnavailableReason,
  sourceDecisionResolutionResult: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionUnavailable | null = null,
): PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumptionResult => Object.freeze({
  status: "UNAVAILABLE" as const,
  source: "personal_star_beast_identity_real_user_storage_implementation_authorization_consumption" as const,
  reason,
  input,
  sourceDecisionResolutionResult,
  noAuthorizationConsumption: true as const,
  noImplementation: true as const,
});

const blocked = (
  input: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumptionInput,
  reason: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumptionBlockedReason,
): PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumptionResult => Object.freeze({
  status: "BLOCKED" as const,
  source: "personal_star_beast_identity_real_user_storage_implementation_authorization_consumption" as const,
  reason,
  input,
  sourceDecisionResolutionResult: null,
  noAuthorizationConsumption: true as const,
  noImplementation: true as const,
});

export function consumePersonalStarBeastIdentityRealUserStorageImplementationAuthorization(
  input: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumptionInput,
): PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumptionResult {
  const sourceDecisionResolutionResult = input.decisionResolutionResult;
  if (sourceDecisionResolutionResult === null) {
    return unavailable(input, "DECISION_RESOLUTION_RESULT_REQUIRED");
  }
  if (sourceDecisionResolutionResult.status === "UNAVAILABLE") {
    return unavailable(input, "DECISION_RESOLUTION_RESULT_UNAVAILABLE", sourceDecisionResolutionResult);
  }
  if (sourceDecisionResolutionResult.status === "BLOCKED") {
    return blocked(input, "DECISION_RESOLUTION_RESULT_BLOCKED");
  }

  if (
    sourceDecisionResolutionResult.status !== "READY" ||
    sourceDecisionResolutionResult.resolutionStatus !==
      "READY_FOR_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION_CONSUMPTION" ||
    sourceDecisionResolutionResult.source !==
      "personal_star_beast_identity_real_user_storage_implementation_authorization_decision_resolution" ||
    sourceDecisionResolutionResult.boundary.decisionResolutionOnly !== true ||
    sourceDecisionResolutionResult.boundary.referenceOnly !== true ||
    sourceDecisionResolutionResult.boundary.authorizationDecisionResolved !== true ||
    sourceDecisionResolutionResult.boundary.realAuthenticationPerformed !== false ||
    sourceDecisionResolutionResult.boundary.storageWritePerformed !== false ||
    sourceDecisionResolutionResult.boundary.storageReadPerformed !== false ||
    sourceDecisionResolutionResult.boundary.productIntegrationPerformed !== false ||
    sourceDecisionResolutionResult.boundary.noDefaultDecision !== true ||
    sourceDecisionResolutionResult.boundary.noAutomaticAuthorization !== true ||
    sourceDecisionResolutionResult.boundary.noUIIntegration !== true ||
    sourceDecisionResolutionResult.boundary.noEngineInvocation !== true ||
    sourceDecisionResolutionResult.boundary.noRendererInvocation !== true ||
    sourceDecisionResolutionResult.boundary.noLifeStateMutation !== true
  ) {
    return blocked(input, "DECISION_RESOLUTION_BOUNDARY_INVALID");
  }

  const resolutionReference = sourceDecisionResolutionResult.resolutionReference;
  if (
    resolutionReference.referenceType !==
      "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION_DECISION_RESOLUTION" ||
    resolutionReference.authorizationDecisionResolved !== true ||
    resolutionReference.decisionResolutionOnly !== true ||
    resolutionReference.referenceOnly !== true ||
    resolutionReference.futureImplementationConsumptionRequired !== true ||
    resolutionReference.noDefaultDecision !== true ||
    resolutionReference.noAutomaticAuthorization !== true ||
    resolutionReference.noUIIntegration !== true ||
    resolutionReference.noEngineInvocation !== true ||
    resolutionReference.noRendererInvocation !== true ||
    resolutionReference.noLifeStateMutation !== true
  ) {
    return blocked(input, "DECISION_RESOLUTION_REFERENCE_INVALID");
  }

  if (resolutionReference.decisionOutcome === "DECLINED") {
    return Object.freeze({
      status: "NOT_AUTHORIZED" as const,
      source: "personal_star_beast_identity_real_user_storage_implementation_authorization_consumption" as const,
      reason: "IMPLEMENTATION_AUTHORIZATION_DECLINED" as const,
      input,
      sourceDecisionResolutionResult,
      noAuthorizationConsumption: true as const,
      noImplementation: true as const,
      noRealAuthentication: true as const,
      noStorageWrite: true as const,
    });
  }

  if (
    resolutionReference.decisionOutcome !== "GRANTED" ||
    resolutionReference.authorizationStatus !== "AUTHORIZED" ||
    resolutionReference.implementationAuthorized !== true ||
    resolutionReference.realAuthentication !== "AUTHORIZED_FOR_FUTURE_IMPLEMENTATION" ||
    resolutionReference.storageAdapter !== "AUTHORIZED_FOR_FUTURE_IMPLEMENTATION" ||
    resolutionReference.productIntegration !== "NOT_AUTHORIZED"
  ) {
    return blocked(input, "DECISION_RESOLUTION_REFERENCE_INVALID");
  }

  const consumption = Object.freeze({
    semanticRole: "REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION_CONSUMPTION" as const,
    authorizationDecisionResolutionReference: resolutionReference,
    sourceDecisionResolutionResult,
    decisionOutcome: "GRANTED" as const,
    authorizationStatus: "AUTHORIZED" as const,
    implementationAuthorized: true as const,
    consumptionStatus: "AVAILABLE_FOR_FUTURE_REAL_USER_STORAGE_IMPLEMENTATION" as const,
    authorizationConsumedOnly: true as const,
    implementationDeferred: true as const,
    realAuthenticationDeferred: true as const,
    storageWriteDeferred: true as const,
    productIntegrationDeferred: true as const,
    noUIIntegration: true as const,
    noEngineInvocation: true as const,
    noRendererInvocation: true as const,
    noLifeStateMutation: true as const,
  });

  return Object.freeze({
    status: "AVAILABLE" as const,
    source: "personal_star_beast_identity_real_user_storage_implementation_authorization_consumption" as const,
    input,
    consumption,
  });
}
