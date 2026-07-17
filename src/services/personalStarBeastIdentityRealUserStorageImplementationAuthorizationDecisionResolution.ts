import type {
  PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionBlockedReason,
  PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionBoundary,
  PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionInput,
  PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionResult,
  PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionUnavailableReason,
} from "../types/personalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolution";

const unavailableBoundary = (): PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionBoundary => Object.freeze({
  decisionResolutionOnly: true,
  referenceOnly: true,
  authorizationDecisionResolved: true,
  authorizationGranted: false,
  implementationAuthorized: false,
  realAuthenticationPerformed: false,
  storageWritePerformed: false,
  storageReadPerformed: false,
  productIntegrationPerformed: false,
  noDefaultDecision: true,
  noAutomaticAuthorization: true,
  noUIIntegration: true,
  noEngineInvocation: true,
  noRendererInvocation: true,
  noLifeStateMutation: true,
});

const unavailable = (
  input: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionInput,
  reason: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionUnavailableReason,
): PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionResult => Object.freeze({
  status: "UNAVAILABLE" as const,
  resolutionStatus: "UNAVAILABLE" as const,
  source: "personal_star_beast_identity_real_user_storage_implementation_authorization_decision_resolution" as const,
  reason,
  input,
  resolutionReference: null,
  boundary: unavailableBoundary(),
});

const blocked = (
  input: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionInput,
  reason: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionBlockedReason,
): PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionResult => Object.freeze({
  status: "BLOCKED" as const,
  resolutionStatus: "BLOCKED" as const,
  source: "personal_star_beast_identity_real_user_storage_implementation_authorization_decision_resolution" as const,
  reason,
  input,
  resolutionReference: null,
  boundary: unavailableBoundary(),
});

export function resolvePersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecision(
  input: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionInput,
): PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionResult {
  const decisionCommandResult = input.decisionCommandResult;
  if (decisionCommandResult === null) {
    return unavailable(input, "DECISION_COMMAND_RESULT_REQUIRED");
  }
  if (decisionCommandResult.status === "UNAVAILABLE") {
    return unavailable(input, "DECISION_COMMAND_RESULT_UNAVAILABLE");
  }
  if (decisionCommandResult.status === "BLOCKED") {
    return blocked(input, "DECISION_COMMAND_RESULT_BLOCKED");
  }

  if (
    decisionCommandResult.status !== "READY" ||
    decisionCommandResult.commandStatus !== "READY_FOR_AUTHORIZATION_DECISION_RESOLUTION" ||
    decisionCommandResult.source !==
      "personal_star_beast_identity_real_user_storage_implementation_authorization_decision_command" ||
    decisionCommandResult.boundary.decisionCommandContractOnly !== true ||
    decisionCommandResult.boundary.referenceOnly !== true ||
    decisionCommandResult.boundary.decisionCommandAccepted !== true ||
    decisionCommandResult.boundary.authorizationDecisionResolved !== false ||
    decisionCommandResult.boundary.authorizationGranted !== false ||
    decisionCommandResult.boundary.implementationAuthorized !== false ||
    decisionCommandResult.boundary.realAuthenticationPerformed !== false ||
    decisionCommandResult.boundary.storageWritePerformed !== false ||
    decisionCommandResult.boundary.storageReadPerformed !== false ||
    decisionCommandResult.boundary.productIntegrationPerformed !== false ||
    decisionCommandResult.boundary.noDefaultDecision !== true ||
    decisionCommandResult.boundary.noAutomaticAuthorization !== true ||
    decisionCommandResult.boundary.noUIIntegration !== true ||
    decisionCommandResult.boundary.noEngineInvocation !== true ||
    decisionCommandResult.boundary.noRendererInvocation !== true ||
    decisionCommandResult.boundary.noLifeStateMutation !== true
  ) {
    return blocked(input, "DECISION_COMMAND_BOUNDARY_INVALID");
  }

  const commandReference = decisionCommandResult.commandReference;
  if (
    commandReference.referenceType !==
      "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION_DECISION_COMMAND_REFERENCE" ||
    commandReference.decisionCommandContractOnly !== true ||
    commandReference.referenceOnly !== true ||
    commandReference.decisionCommandAccepted !== true ||
    commandReference.authorizationDecisionResolved !== false ||
    commandReference.authorizationStatus !== "NOT_AUTHORIZED" ||
    commandReference.implementationAuthorized !== false ||
    commandReference.realAuthentication !== "NOT_AUTHORIZED" ||
    commandReference.storageAdapter !== "NOT_AUTHORIZED" ||
    commandReference.productIntegration !== "NOT_AUTHORIZED" ||
    commandReference.futureDecisionResolutionRequired !== true ||
    commandReference.noDefaultDecision !== true ||
    commandReference.noAutomaticAuthorization !== true ||
    commandReference.noUIIntegration !== true ||
    commandReference.noEngineInvocation !== true ||
    commandReference.noRendererInvocation !== true ||
    commandReference.noLifeStateMutation !== true
  ) {
    return blocked(input, "DECISION_COMMAND_REFERENCE_INVALID");
  }

  const command = commandReference.command;
  if (
    command.commandType !==
      "EXPLICIT_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION_DECISION"
  ) {
    return blocked(input, "DECISION_COMMAND_TYPE_INVALID");
  }
  if (
    command.identityReferenceAccepted !== true ||
    command.decisionScope !== "REAL_USER_STORAGE_IMPLEMENTATION_ONLY"
  ) {
    return blocked(input, "DECISION_SCOPE_INVALID");
  }
  const decisionOutcome =
    command.subjectDecision === "GRANT"
      ? "GRANTED"
      : command.subjectDecision === "DECLINE"
        ? "DECLINED"
        : null;
  if (decisionOutcome === null) {
    return blocked(input, "DECISION_COMMAND_TYPE_INVALID");
  }

  const authorizationGranted = decisionOutcome === "GRANTED";
  const authorizationStatus = authorizationGranted ? "AUTHORIZED" : "NOT_AUTHORIZED";
  const implementationAuthorized = authorizationGranted;
  const futureAuthorizationStatus = authorizationGranted
    ? "AUTHORIZED_FOR_FUTURE_IMPLEMENTATION"
    : "NOT_AUTHORIZED";

  const boundary: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionBoundary =
    Object.freeze({
      decisionResolutionOnly: true,
      referenceOnly: true,
      authorizationDecisionResolved: true,
      authorizationGranted,
      implementationAuthorized,
      realAuthenticationPerformed: false,
      storageWritePerformed: false,
      storageReadPerformed: false,
      productIntegrationPerformed: false,
      noDefaultDecision: true,
      noAutomaticAuthorization: true,
      noUIIntegration: true,
      noEngineInvocation: true,
      noRendererInvocation: true,
      noLifeStateMutation: true,
    });

  return Object.freeze({
    status: "READY" as const,
    resolutionStatus:
      "READY_FOR_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION_CONSUMPTION" as const,
    source: "personal_star_beast_identity_real_user_storage_implementation_authorization_decision_resolution" as const,
    input,
    resolutionReference: Object.freeze({
      referenceType:
        "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION_DECISION_RESOLUTION" as const,
      referenceId: `personal-star-beast-real-user-storage-implementation-decision-resolution:${commandReference.referenceId}`,
      resolutionVersion: "V1" as const,
      decisionCommandReference: commandReference,
      decisionOutcome,
      authorizationStatus,
      implementationAuthorized,
      realAuthentication: futureAuthorizationStatus,
      storageAdapter: futureAuthorizationStatus,
      productIntegration: "NOT_AUTHORIZED" as const,
      authorizationDecisionResolved: true as const,
      decisionResolutionOnly: true as const,
      referenceOnly: true as const,
      futureImplementationConsumptionRequired: true as const,
      noDefaultDecision: true as const,
      noAutomaticAuthorization: true as const,
      noUIIntegration: true as const,
      noEngineInvocation: true as const,
      noRendererInvocation: true as const,
      noLifeStateMutation: true as const,
    }),
    boundary,
  });
}
