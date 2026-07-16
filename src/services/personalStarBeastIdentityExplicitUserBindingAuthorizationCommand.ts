import type {
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandBlockedReason,
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandBoundary,
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandInput,
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandResult,
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandUnavailableReason,
} from "../types/personalStarBeastIdentityExplicitUserBindingAuthorizationCommand";

const COMMAND_BOUNDARY: PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandBoundary =
  Object.freeze({
    commandContractOnly: true,
    referenceOnly: true,
    commandExecutionPerformed: false,
    authorizationGranted: false,
    userBindingPerformed: false,
    productConsumptionPerformed: false,
    noAutomaticUserBinding: true,
    noUserProfileCreation: true,
    noStorageWrite: true,
    noEngineInvocation: true,
    noRendererInvocation: true,
    noLifeStateMutation: true,
  });

const unavailable = (
  input: PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandInput,
  reason: PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandUnavailableReason,
): PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    commandStatus: "UNAVAILABLE" as const,
    source:
      "personal_star_beast_identity_explicit_user_binding_authorization_command" as const,
    reason,
    input,
    commandReference: null,
    boundary: COMMAND_BOUNDARY,
  });

const blocked = (
  input: PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandInput,
  reason: PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandBlockedReason,
): PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    commandStatus: "BLOCKED" as const,
    source:
      "personal_star_beast_identity_explicit_user_binding_authorization_command" as const,
    reason,
    input,
    commandReference: null,
    boundary: COMMAND_BOUNDARY,
  });

export function createPersonalStarBeastIdentityExplicitUserBindingAuthorizationCommand(
  input: PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandInput,
): PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandResult {
  const reviewResult = input.reviewResult;
  if (reviewResult === null) {
    return unavailable(input, "AUTHORIZATION_REVIEW_REQUIRED");
  }
  if (reviewResult.status === "UNAVAILABLE") {
    return unavailable(input, "AUTHORIZATION_REVIEW_UNAVAILABLE");
  }
  if (reviewResult.status === "BLOCKED") {
    return blocked(input, "AUTHORIZATION_REVIEW_BLOCKED");
  }

  if (
    reviewResult.status !== "READY" ||
    reviewResult.reviewStatus !==
      "READY_FOR_EXPLICIT_USER_BINDING_AUTHORIZATION" ||
    reviewResult.source !==
      "personal_star_beast_identity_explicit_user_binding_authorization_review" ||
    reviewResult.boundary.reviewOnly !== true ||
    reviewResult.boundary.referenceOnly !== true ||
    reviewResult.boundary.authorizationReviewOnly !== true ||
    reviewResult.boundary.authorizationGranted !== false ||
    reviewResult.boundary.userBindingPerformed !== false ||
    reviewResult.boundary.userConsentCaptured !== false ||
    reviewResult.boundary.productConsumptionPerformed !== false ||
    reviewResult.boundary.noAutomaticUserBinding !== true ||
    reviewResult.boundary.noUserProfileCreation !== true ||
    reviewResult.boundary.noStorageWrite !== true ||
    reviewResult.boundary.noEngineInvocation !== true ||
    reviewResult.boundary.noRendererInvocation !== true ||
    reviewResult.boundary.noLifeStateMutation !== true
  ) {
    return blocked(input, "REVIEW_BOUNDARY_INVALID");
  }

  const reviewReference = reviewResult.reviewReference;
  if (
    reviewReference.referenceType !==
      "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_AUTHORIZATION_REVIEW" ||
    reviewReference.authorizationScope !== "EXPLICIT_USER_BINDING_REVIEW_ONLY" ||
    reviewReference.reviewOnly !== true ||
    reviewReference.referenceOnly !== true ||
    reviewReference.authorizationStatus !== "NOT_AUTHORIZED" ||
    reviewReference.userBinding !== "NOT_PERFORMED" ||
    reviewReference.userConsent !== "NOT_CAPTURED" ||
    reviewReference.productConsumption !== "NOT_PERFORMED" ||
    reviewReference.futureExplicitAuthorizationRequired !== true ||
    reviewReference.noAutomaticUserBinding !== true
  ) {
    return blocked(input, "REVIEW_REFERENCE_INVALID");
  }

  const command = input.command;
  if (command === null) {
    return unavailable(input, "EXPLICIT_COMMAND_REQUIRED");
  }
  if (command.commandType !== "EXPLICIT_USER_BINDING_INTENT") {
    return blocked(input, "COMMAND_TYPE_INVALID");
  }
  if (command.subjectDecision !== "DECLARE_EXPLICIT_USER_BINDING_INTENT") {
    return blocked(input, "COMMAND_DECISION_INVALID");
  }
  if (
    command.identityReferenceAccepted !== true ||
    command.bindingScope !== "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY" ||
    typeof command.commandId !== "string" ||
    command.commandId.length === 0 ||
    typeof command.confirmationReference !== "string" ||
    command.confirmationReference.length === 0
  ) {
    return blocked(input, "COMMAND_SCOPE_INVALID");
  }

  if (
    reviewReference.contractReference.readinessReference.identityReference !==
    reviewReference.contractReference.readinessReference.identitySourceReference.personalStarBeastReference
  ) {
    return blocked(input, "IDENTITY_REFERENCE_DRIFT");
  }

  return Object.freeze({
    status: "READY" as const,
    commandStatus: "READY_FOR_AUTHORIZATION_RESOLUTION" as const,
    source:
      "personal_star_beast_identity_explicit_user_binding_authorization_command" as const,
    input,
    commandReference: Object.freeze({
      referenceType:
        "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_AUTHORIZATION_COMMAND_REFERENCE" as const,
      referenceId: `personal-star-beast-identity-explicit-user-binding-command:${command.commandId}`,
      commandVersion: "V1" as const,
      reviewReference,
      command,
      inputContract: Object.freeze({
        acceptedReviewType:
          "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_AUTHORIZATION_REVIEW" as const,
        requiredReviewStatus:
          "READY_FOR_EXPLICIT_USER_BINDING_AUTHORIZATION" as const,
        requiredCommandType: "EXPLICIT_USER_BINDING_INTENT" as const,
        explicitSubjectDecisionRequired: true as const,
        identityReferenceOnly: true as const,
        noRawUserIdentityPayload: true as const,
        noAutomaticBinding: true as const,
      }),
      outputContract: Object.freeze({
        outputReferenceType:
          "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_AUTHORIZATION_COMMAND_REFERENCE" as const,
        commandStatus: "AVAILABLE_FOR_AUTHORIZATION_RESOLUTION" as const,
        subjectIntent: "DECLARED" as const,
        authorizationStatus: "NOT_AUTHORIZED" as const,
        userBinding: "NOT_PERFORMED" as const,
        productConsumption: "NOT_PERFORMED" as const,
        futureAuthorizationResolutionRequired: true as const,
        noAutomaticUserBinding: true as const,
      }),
      commandContractOnly: true as const,
      referenceOnly: true as const,
      commandStatus: "AVAILABLE_FOR_AUTHORIZATION_RESOLUTION" as const,
      subjectIntent: "DECLARED" as const,
      authorizationStatus: "NOT_AUTHORIZED" as const,
      userBinding: "NOT_PERFORMED" as const,
      productConsumption: "NOT_PERFORMED" as const,
      futureAuthorizationResolutionRequired: true as const,
      noAutomaticUserBinding: true as const,
      noUserProfileCreation: true as const,
      noStorageWrite: true as const,
      noEngineInvocation: true as const,
      noRendererInvocation: true as const,
      noLifeStateMutation: true as const,
    }),
    boundary: COMMAND_BOUNDARY,
  });
}
