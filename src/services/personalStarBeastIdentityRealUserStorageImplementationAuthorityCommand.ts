import type {
  PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandBlockedReason,
  PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandBoundary,
  PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandInput,
  PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandResult,
  PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandUnavailableReason,
} from "../types/personalStarBeastIdentityRealUserStorageImplementationAuthorityCommand";

const COMMAND_BOUNDARY: PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandBoundary = Object.freeze({
  commandContractOnly: true,
  referenceOnly: true,
  commandExecutionPerformed: false,
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
  input: PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandInput,
  reason: PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandUnavailableReason,
): PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandResult => Object.freeze({
  status: "UNAVAILABLE" as const,
  commandStatus: "UNAVAILABLE" as const,
  source: "personal_star_beast_identity_real_user_storage_implementation_authority_command" as const,
  reason,
  input,
  commandReference: null,
  boundary: COMMAND_BOUNDARY,
});

const blocked = (
  input: PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandInput,
  reason: PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandBlockedReason,
): PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandResult => Object.freeze({
  status: "BLOCKED" as const,
  commandStatus: "BLOCKED" as const,
  source: "personal_star_beast_identity_real_user_storage_implementation_authority_command" as const,
  reason,
  input,
  commandReference: null,
  boundary: COMMAND_BOUNDARY,
});

export function createPersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommand(
  input: PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandInput,
): PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandResult {
  const authorizationReview = input.authorizationReviewResult;
  if (authorizationReview === null) {
    return unavailable(input, "AUTHORIZATION_REVIEW_REQUIRED");
  }
  if (authorizationReview.status === "UNAVAILABLE") {
    return unavailable(input, "AUTHORIZATION_REVIEW_UNAVAILABLE");
  }
  if (authorizationReview.status === "BLOCKED") {
    return blocked(input, "AUTHORIZATION_REVIEW_BLOCKED");
  }

  if (
    authorizationReview.status !== "READY" ||
    authorizationReview.reviewStatus !==
      "READY_FOR_EXPLICIT_REAL_USER_STORAGE_ADAPTER_IMPLEMENTATION_AUTHORITY" ||
    authorizationReview.source !==
      "personal_star_beast_identity_real_user_storage_integration_authorization_review" ||
    authorizationReview.boundary.reviewOnly !== true ||
    authorizationReview.boundary.authorizationGranted !== false ||
    authorizationReview.boundary.implementationAuthorized !== false ||
    authorizationReview.boundary.realAuthenticationPerformed !== false ||
    authorizationReview.boundary.storageWritePerformed !== false ||
    authorizationReview.boundary.storageReadPerformed !== false ||
    authorizationReview.boundary.productIntegrationPerformed !== false ||
    authorizationReview.boundary.noAutomaticAuthorization !== true ||
    authorizationReview.boundary.noUIIntegration !== true ||
    authorizationReview.boundary.noEngineInvocation !== true ||
    authorizationReview.boundary.noRendererInvocation !== true ||
    authorizationReview.boundary.noLifeStateMutation !== true
  ) {
    return blocked(input, "REVIEW_BOUNDARY_INVALID");
  }

  const reviewReference = authorizationReview.reviewReference;
  if (
    reviewReference.referenceType !==
      "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_INTEGRATION_AUTHORIZATION_REVIEW" ||
    reviewReference.reviewVersion !== "V1" ||
    reviewReference.reviewOnly !== true ||
    reviewReference.authorizationStatus !==
      "AWAITING_EXPLICIT_IMPLEMENTATION_AUTHORITY" ||
    reviewReference.authorizationGranted !== false ||
    reviewReference.implementationAuthorized !== false ||
    reviewReference.realAuthentication !== "NOT_AUTHORIZED" ||
    reviewReference.storageAdapter !== "NOT_AUTHORIZED" ||
    reviewReference.productIntegration !== "NOT_AUTHORIZED" ||
    reviewReference.explicitAuthorityRequired !== true ||
    reviewReference.futureExplicitAuthorityCommandRequired !== true ||
    reviewReference.noAutomaticAuthorization !== true ||
    reviewReference.noUIIntegration !== true ||
    reviewReference.noEngineInvocation !== true ||
    reviewReference.noRendererInvocation !== true ||
    reviewReference.noLifeStateMutation !== true
  ) {
    return blocked(input, "REVIEW_REFERENCE_INVALID");
  }

  const command = input.command;
  if (command === null) {
    return unavailable(input, "EXPLICIT_AUTHORITY_COMMAND_REQUIRED");
  }
  if (
    command.commandType !==
    "EXPLICIT_REAL_USER_STORAGE_ADAPTER_IMPLEMENTATION_AUTHORITY_COMMAND"
  ) {
    return blocked(input, "COMMAND_TYPE_INVALID");
  }
  if (command.subjectDecision !== "AUTHORIZE_REAL_USER_STORAGE_ADAPTER_IMPLEMENTATION") {
    return blocked(input, "COMMAND_DECISION_INVALID");
  }
  if (
    command.identityReferenceAccepted !== true ||
    command.implementationScope !==
      "REAL_AUTHENTICATION_AND_STORAGE_ADAPTER_IMPLEMENTATION_ONLY" ||
    typeof command.commandId !== "string" ||
    command.commandId.length === 0 ||
    typeof command.authorityReference !== "string" ||
    command.authorityReference.length === 0
  ) {
    return blocked(input, "COMMAND_SCOPE_INVALID");
  }

  return Object.freeze({
    status: "READY" as const,
    commandStatus: "READY_FOR_AUTHORIZATION_RESOLUTION" as const,
    source: "personal_star_beast_identity_real_user_storage_implementation_authority_command" as const,
    input,
    commandReference: Object.freeze({
      referenceType:
        "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORITY_COMMAND_REFERENCE" as const,
      referenceId: `personal-star-beast-real-user-storage-implementation-authority-command:${command.commandId}`,
      commandVersion: "V1" as const,
      authorizationReviewReference: reviewReference,
      command,
      inputContract: Object.freeze({
        acceptedReviewType:
          "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_INTEGRATION_AUTHORIZATION_REVIEW" as const,
        requiredReviewStatus:
          "READY_FOR_EXPLICIT_REAL_USER_STORAGE_ADAPTER_IMPLEMENTATION_AUTHORITY" as const,
        requiredCommandType:
          "EXPLICIT_REAL_USER_STORAGE_ADAPTER_IMPLEMENTATION_AUTHORITY_COMMAND" as const,
        explicitSubjectDecisionRequired: true as const,
        implementationScope:
          "REAL_AUTHENTICATION_AND_STORAGE_ADAPTER_IMPLEMENTATION_ONLY" as const,
        noRawUserIdentityPayload: true as const,
        noAutomaticAuthorization: true as const,
      }),
      outputContract: Object.freeze({
        outputReferenceType:
          "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORITY_COMMAND_REFERENCE" as const,
        commandStatus: "AVAILABLE_FOR_AUTHORIZATION_RESOLUTION" as const,
        subjectIntent: "DECLARED" as const,
        authorizationStatus: "NOT_AUTHORIZED" as const,
        implementationAuthorized: false as const,
        realAuthentication: "NOT_AUTHORIZED" as const,
        storageAdapter: "NOT_AUTHORIZED" as const,
        productIntegration: "NOT_AUTHORIZED" as const,
        futureAuthorizationResolutionRequired: true as const,
        noAutomaticAuthorization: true as const,
      }),
      commandContractOnly: true as const,
      referenceOnly: true as const,
      commandStatus: "AVAILABLE_FOR_AUTHORIZATION_RESOLUTION" as const,
      subjectIntent: "DECLARED" as const,
      authorizationStatus: "NOT_AUTHORIZED" as const,
      implementationAuthorized: false as const,
      realAuthentication: "NOT_AUTHORIZED" as const,
      storageAdapter: "NOT_AUTHORIZED" as const,
      productIntegration: "NOT_AUTHORIZED" as const,
      futureAuthorizationResolutionRequired: true as const,
      noAutomaticAuthorization: true as const,
      noUIIntegration: true as const,
      noEngineInvocation: true as const,
      noRendererInvocation: true as const,
      noLifeStateMutation: true as const,
    }),
    boundary: COMMAND_BOUNDARY,
  });
}
