import type {
  PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandBlockedReason,
  PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandBoundary,
  PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandInput,
  PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandResult,
  PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandUnavailableReason,
} from "../types/personalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommand";

const DECISION_COMMAND_BOUNDARY: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandBoundary = Object.freeze({
  decisionCommandContractOnly: true,
  referenceOnly: true,
  decisionCommandAccepted: true,
  authorizationDecisionResolved: false,
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
  input: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandInput,
  reason: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandUnavailableReason,
): PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandResult => Object.freeze({
  status: "UNAVAILABLE" as const,
  commandStatus: "UNAVAILABLE" as const,
  source: "personal_star_beast_identity_real_user_storage_implementation_authorization_decision_command" as const,
  reason,
  input,
  commandReference: null,
  boundary: DECISION_COMMAND_BOUNDARY,
});

const blocked = (
  input: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandInput,
  reason: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandBlockedReason,
): PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandResult => Object.freeze({
  status: "BLOCKED" as const,
  commandStatus: "BLOCKED" as const,
  source: "personal_star_beast_identity_real_user_storage_implementation_authorization_decision_command" as const,
  reason,
  input,
  commandReference: null,
  boundary: DECISION_COMMAND_BOUNDARY,
});

export function createPersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommand(
  input: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandInput,
): PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandResult {
  const resolutionResult = input.resolutionResult;
  if (resolutionResult === null) {
    return unavailable(input, "AUTHORITY_RESOLUTION_REQUIRED");
  }
  if (resolutionResult.status === "UNAVAILABLE") {
    return unavailable(input, "AUTHORITY_RESOLUTION_UNAVAILABLE");
  }
  if (resolutionResult.status === "BLOCKED") {
    return blocked(input, "AUTHORITY_RESOLUTION_BLOCKED");
  }

  if (
    resolutionResult.status !== "READY" ||
    resolutionResult.resolutionStatus !==
      "READY_FOR_EXPLICIT_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION_DECISION" ||
    resolutionResult.source !==
      "personal_star_beast_identity_real_user_storage_implementation_authority_resolution" ||
    resolutionResult.boundary.resolutionOnly !== true ||
    resolutionResult.boundary.referenceOnly !== true ||
    resolutionResult.boundary.authorizationDecisionPending !== true ||
    resolutionResult.boundary.authorizationGranted !== false ||
    resolutionResult.boundary.implementationAuthorized !== false ||
    resolutionResult.boundary.realAuthenticationPerformed !== false ||
    resolutionResult.boundary.storageWritePerformed !== false ||
    resolutionResult.boundary.storageReadPerformed !== false ||
    resolutionResult.boundary.productIntegrationPerformed !== false ||
    resolutionResult.boundary.noAutomaticAuthorization !== true ||
    resolutionResult.boundary.noUIIntegration !== true ||
    resolutionResult.boundary.noEngineInvocation !== true ||
    resolutionResult.boundary.noRendererInvocation !== true ||
    resolutionResult.boundary.noLifeStateMutation !== true
  ) {
    return blocked(input, "AUTHORITY_RESOLUTION_BOUNDARY_INVALID");
  }

  const resolutionReference = resolutionResult.resolutionReference;
  if (
    resolutionReference.referenceType !==
      "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORITY_RESOLUTION" ||
    resolutionReference.resolutionStatus !==
      "PENDING_EXPLICIT_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION" ||
    resolutionReference.authorizationStatus !== "NOT_AUTHORIZED" ||
    resolutionReference.implementationAuthorized !== false ||
    resolutionReference.realAuthentication !== "NOT_AUTHORIZED" ||
    resolutionReference.storageAdapter !== "NOT_AUTHORIZED" ||
    resolutionReference.productIntegration !== "NOT_AUTHORIZED" ||
    resolutionReference.futureAuthorizationDecisionRequired !== true ||
    resolutionReference.resolutionOnly !== true ||
    resolutionReference.referenceOnly !== true ||
    resolutionReference.noAutomaticAuthorization !== true ||
    resolutionReference.noUIIntegration !== true ||
    resolutionReference.noEngineInvocation !== true ||
    resolutionReference.noRendererInvocation !== true ||
    resolutionReference.noLifeStateMutation !== true
  ) {
    return blocked(input, "AUTHORITY_RESOLUTION_REFERENCE_INVALID");
  }

  if (
    resolutionReference.commandReference.command.commandType !==
      "EXPLICIT_REAL_USER_STORAGE_ADAPTER_IMPLEMENTATION_AUTHORITY_COMMAND" ||
    resolutionReference.commandReference.command.subjectDecision !==
      "AUTHORIZE_REAL_USER_STORAGE_ADAPTER_IMPLEMENTATION" ||
    resolutionReference.commandReference.command.identityReferenceAccepted !== true ||
    resolutionReference.commandReference.command.implementationScope !==
      "REAL_AUTHENTICATION_AND_STORAGE_ADAPTER_IMPLEMENTATION_ONLY"
  ) {
    return blocked(input, "DECISION_SCOPE_INVALID");
  }

  const command = input.command;
  if (command === null) {
    return unavailable(input, "EXPLICIT_DECISION_COMMAND_REQUIRED");
  }
  if (
    command.commandType !==
    "EXPLICIT_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION_DECISION"
  ) {
    return blocked(input, "DECISION_COMMAND_TYPE_INVALID");
  }
  if (command.subjectDecision !== "GRANT" && command.subjectDecision !== "DECLINE") {
    return blocked(input, "DECISION_VALUE_INVALID");
  }
  if (
    command.identityReferenceAccepted !== true ||
    command.decisionScope !== "REAL_USER_STORAGE_IMPLEMENTATION_ONLY"
  ) {
    return blocked(input, "DECISION_SCOPE_INVALID");
  }
  if (
    typeof command.commandId !== "string" ||
    command.commandId.length === 0 ||
    typeof command.decisionReference !== "string" ||
    command.decisionReference.length === 0
  ) {
    return blocked(input, "DECISION_REFERENCE_INVALID");
  }

  return Object.freeze({
    status: "READY" as const,
    commandStatus: "READY_FOR_AUTHORIZATION_DECISION_RESOLUTION" as const,
    source: "personal_star_beast_identity_real_user_storage_implementation_authorization_decision_command" as const,
    input,
    commandReference: Object.freeze({
      referenceType:
        "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION_DECISION_COMMAND_REFERENCE" as const,
      referenceId: `personal-star-beast-real-user-storage-implementation-decision-command:${command.commandId}`,
      commandVersion: "V1" as const,
      resolutionReference,
      command,
      inputContract: Object.freeze({
        acceptedResolutionType:
          "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORITY_RESOLUTION" as const,
        requiredResolutionStatus:
          "READY_FOR_EXPLICIT_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION_DECISION" as const,
        requiredCommandType:
          "EXPLICIT_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION_DECISION" as const,
        allowedDecisions: ["GRANT", "DECLINE"] as const,
        explicitDecisionRequired: true as const,
        decisionReferenceRequired: true as const,
        decisionScope: "REAL_USER_STORAGE_IMPLEMENTATION_ONLY" as const,
        noRawUserIdentityPayload: true as const,
        noAutomaticAuthorization: true as const,
      }),
      outputContract: Object.freeze({
        outputReferenceType:
          "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION_DECISION_COMMAND_REFERENCE" as const,
        commandStatus: "READY_FOR_AUTHORIZATION_DECISION_RESOLUTION" as const,
        subjectDecision: command.subjectDecision,
        authorizationDecisionResolved: false as const,
        authorizationStatus: "NOT_AUTHORIZED" as const,
        implementationAuthorized: false as const,
        realAuthentication: "NOT_AUTHORIZED" as const,
        storageAdapter: "NOT_AUTHORIZED" as const,
        productIntegration: "NOT_AUTHORIZED" as const,
        futureDecisionResolutionRequired: true as const,
        noAutomaticAuthorization: true as const,
      }),
      decisionCommandContractOnly: true as const,
      referenceOnly: true as const,
      decisionCommandAccepted: true as const,
      subjectDecision: command.subjectDecision,
      authorizationDecisionResolved: false as const,
      authorizationStatus: "NOT_AUTHORIZED" as const,
      implementationAuthorized: false as const,
      realAuthentication: "NOT_AUTHORIZED" as const,
      storageAdapter: "NOT_AUTHORIZED" as const,
      productIntegration: "NOT_AUTHORIZED" as const,
      futureDecisionResolutionRequired: true as const,
      noDefaultDecision: true as const,
      noAutomaticAuthorization: true as const,
      noUIIntegration: true as const,
      noEngineInvocation: true as const,
      noRendererInvocation: true as const,
      noLifeStateMutation: true as const,
    }),
    boundary: DECISION_COMMAND_BOUNDARY,
  });
}
