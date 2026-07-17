import type {
  PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionBlockedReason,
  PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionBoundary,
  PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionInput,
  PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionResult,
  PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionUnavailableReason,
} from "../types/personalStarBeastIdentityRealUserStorageImplementationAuthorityResolution";

const RESOLUTION_BOUNDARY: PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionBoundary = Object.freeze({
  resolutionOnly: true,
  referenceOnly: true,
  authorizationDecisionPending: true,
  authorizationGranted: false,
  implementationAuthorized: false,
  realAuthenticationPerformed: false,
  storageWritePerformed: false,
  storageReadPerformed: false,
  productIntegrationPerformed: false,
  noAutomaticAuthorization: true,
  noUIIntegration: true,
  noEngineInvocation: true,
  noRendererInvocation: true,
  noLifeStateMutation: true,
});

const unavailable = (
  input: PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionInput,
  reason: PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionUnavailableReason,
): PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionResult => Object.freeze({
  status: "UNAVAILABLE" as const,
  resolutionStatus: "UNAVAILABLE" as const,
  source: "personal_star_beast_identity_real_user_storage_implementation_authority_resolution" as const,
  reason,
  input,
  resolutionReference: null,
  boundary: RESOLUTION_BOUNDARY,
});

const blocked = (
  input: PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionInput,
  reason: PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionBlockedReason,
): PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionResult => Object.freeze({
  status: "BLOCKED" as const,
  resolutionStatus: "BLOCKED" as const,
  source: "personal_star_beast_identity_real_user_storage_implementation_authority_resolution" as const,
  reason,
  input,
  resolutionReference: null,
  boundary: RESOLUTION_BOUNDARY,
});

export function resolvePersonalStarBeastIdentityRealUserStorageImplementationAuthority(
  input: PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionInput,
): PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionResult {
  const commandResult = input.commandResult;
  if (commandResult === null) {
    return unavailable(input, "COMMAND_RESULT_REQUIRED");
  }
  if (commandResult.status === "UNAVAILABLE") {
    return unavailable(input, "COMMAND_RESULT_UNAVAILABLE");
  }
  if (commandResult.status === "BLOCKED") {
    return blocked(input, "COMMAND_RESULT_BLOCKED");
  }

  if (
    commandResult.status !== "READY" ||
    commandResult.commandStatus !== "READY_FOR_AUTHORIZATION_RESOLUTION" ||
    commandResult.source !==
      "personal_star_beast_identity_real_user_storage_implementation_authority_command" ||
    commandResult.boundary.commandContractOnly !== true ||
    commandResult.boundary.referenceOnly !== true ||
    commandResult.boundary.commandExecutionPerformed !== false ||
    commandResult.boundary.authorizationGranted !== false ||
    commandResult.boundary.implementationAuthorized !== false ||
    commandResult.boundary.realAuthenticationPerformed !== false ||
    commandResult.boundary.storageWritePerformed !== false ||
    commandResult.boundary.storageReadPerformed !== false ||
    commandResult.boundary.productIntegrationPerformed !== false ||
    commandResult.boundary.noAutomaticAuthorization !== true ||
    commandResult.boundary.noUIIntegration !== true ||
    commandResult.boundary.noEngineInvocation !== true ||
    commandResult.boundary.noRendererInvocation !== true ||
    commandResult.boundary.noLifeStateMutation !== true
  ) {
    return blocked(input, "COMMAND_BOUNDARY_INVALID");
  }

  const commandReference = commandResult.commandReference;
  if (
    commandReference.referenceType !==
      "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORITY_COMMAND_REFERENCE" ||
    commandReference.commandStatus !== "AVAILABLE_FOR_AUTHORIZATION_RESOLUTION" ||
    commandReference.subjectIntent !== "DECLARED" ||
    commandReference.authorizationStatus !== "NOT_AUTHORIZED" ||
    commandReference.implementationAuthorized !== false ||
    commandReference.realAuthentication !== "NOT_AUTHORIZED" ||
    commandReference.storageAdapter !== "NOT_AUTHORIZED" ||
    commandReference.productIntegration !== "NOT_AUTHORIZED" ||
    commandReference.futureAuthorizationResolutionRequired !== true ||
    commandReference.noAutomaticAuthorization !== true ||
    commandReference.noUIIntegration !== true ||
    commandReference.noEngineInvocation !== true ||
    commandReference.noRendererInvocation !== true ||
    commandReference.noLifeStateMutation !== true
  ) {
    return blocked(input, "COMMAND_REFERENCE_INVALID");
  }

  if (
    commandReference.command.commandType !==
      "EXPLICIT_REAL_USER_STORAGE_ADAPTER_IMPLEMENTATION_AUTHORITY_COMMAND" ||
    commandReference.command.subjectDecision !==
      "AUTHORIZE_REAL_USER_STORAGE_ADAPTER_IMPLEMENTATION" ||
    commandReference.command.identityReferenceAccepted !== true ||
    commandReference.command.implementationScope !==
      "REAL_AUTHENTICATION_AND_STORAGE_ADAPTER_IMPLEMENTATION_ONLY"
  ) {
    return blocked(input, "COMMAND_SCOPE_INVALID");
  }

  return Object.freeze({
    status: "READY" as const,
    resolutionStatus:
      "READY_FOR_EXPLICIT_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION_DECISION" as const,
    source: "personal_star_beast_identity_real_user_storage_implementation_authority_resolution" as const,
    input,
    resolutionReference: Object.freeze({
      referenceType:
        "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORITY_RESOLUTION" as const,
      referenceId: `personal-star-beast-real-user-storage-implementation-authority-resolution:${commandReference.referenceId}`,
      resolutionVersion: "V1" as const,
      commandReference,
      resolutionStatus:
        "PENDING_EXPLICIT_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION" as const,
      authorizationStatus: "NOT_AUTHORIZED" as const,
      implementationAuthorized: false as const,
      realAuthentication: "NOT_AUTHORIZED" as const,
      storageAdapter: "NOT_AUTHORIZED" as const,
      productIntegration: "NOT_AUTHORIZED" as const,
      futureAuthorizationDecisionRequired: true as const,
      resolutionOnly: true as const,
      referenceOnly: true as const,
      noAutomaticAuthorization: true as const,
      noUIIntegration: true as const,
      noEngineInvocation: true as const,
      noRendererInvocation: true as const,
      noLifeStateMutation: true as const,
    }),
    boundary: RESOLUTION_BOUNDARY,
  });
}
