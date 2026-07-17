import type {
  PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewBlockedReason,
  PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewBoundary,
  PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewInput,
  PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewResult,
  PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewUnavailableReason,
} from "../types/personalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReview";

const REVIEW_BOUNDARY: PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewBoundary =
  Object.freeze({
    reviewOnly: true,
    referenceOnly: true,
    executionAuthorized: false,
    bindingExecutionPerformed: false,
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
  input: PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewInput,
  reason: PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewUnavailableReason,
): PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    reviewStatus: "UNAVAILABLE" as const,
    source:
      "personal_star_beast_identity_explicit_user_binding_execution_authorization_review" as const,
    reason,
    input,
    reviewReference: null,
    boundary: REVIEW_BOUNDARY,
  });

const blocked = (
  input: PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewInput,
  reason: PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewBlockedReason,
): PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    reviewStatus: "BLOCKED" as const,
    source:
      "personal_star_beast_identity_explicit_user_binding_execution_authorization_review" as const,
    reason,
    input,
    reviewReference: null,
    boundary: REVIEW_BOUNDARY,
  });

export function reviewPersonalStarBeastIdentityExplicitUserBindingExecutionAuthorization(
  input: PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewInput,
): PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewResult {
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
    commandResult.commandStatus !==
      "READY_FOR_EXPLICIT_USER_BINDING_EXECUTION" ||
    commandResult.source !==
      "personal_star_beast_identity_explicit_user_binding_command" ||
    commandResult.boundary.commandOnly !== true ||
    commandResult.boundary.referenceOnly !== true ||
    commandResult.boundary.bindingExecutionPerformed !== false ||
    commandResult.boundary.userBindingPerformed !== false ||
    commandResult.boundary.productConsumptionPerformed !== false ||
    commandResult.boundary.noAutomaticUserBinding !== true ||
    commandResult.boundary.noUserProfileCreation !== true ||
    commandResult.boundary.noStorageWrite !== true ||
    commandResult.boundary.noEngineInvocation !== true ||
    commandResult.boundary.noRendererInvocation !== true ||
    commandResult.boundary.noLifeStateMutation !== true
  ) {
    return blocked(input, "COMMAND_BOUNDARY_INVALID");
  }

  const commandReference = commandResult.commandReference;
  if (
    commandReference.referenceType !==
      "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_COMMAND_REFERENCE" ||
    commandReference.commandVersion !== "V1" ||
    commandReference.commandOnly !== true ||
    commandReference.referenceOnly !== true ||
    commandReference.bindingExecutionDeferred !== true ||
    commandReference.userBinding !== "NOT_PERFORMED" ||
    commandReference.productConsumption !== "NOT_PERFORMED" ||
    commandReference.futureBindingExecutionRequired !== true ||
    commandReference.noAutomaticUserBinding !== true ||
    commandReference.noUserProfileCreation !== true ||
    commandReference.noStorageWrite !== true ||
    commandReference.noEngineInvocation !== true ||
    commandReference.noRendererInvocation !== true ||
    commandReference.noLifeStateMutation !== true
  ) {
    return blocked(input, "COMMAND_REFERENCE_INVALID");
  }

  if (
    commandReference.command.commandType !==
      "EXPLICIT_PERSONAL_STAR_BEAST_IDENTITY_BINDING" ||
    commandReference.command.subjectIntent !== "EXECUTE_EXPLICIT_USER_BINDING" ||
    commandReference.command.identityReferenceAccepted !== true ||
    commandReference.command.bindingScope !==
      "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY"
  ) {
    return blocked(input, "COMMAND_SCOPE_INVALID");
  }

  if (
    commandReference.inputContract.requiredCommandType !==
      "EXPLICIT_PERSONAL_STAR_BEAST_IDENTITY_BINDING" ||
    commandReference.inputContract.bindingScope !==
      "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY" ||
    commandReference.inputContract.explicitCommandRequired !== true ||
    commandReference.inputContract.noRawUserIdentityPayload !== true ||
    commandReference.inputContract.noAutomaticBinding !== true ||
    commandReference.outputContract.commandStatus !==
      "READY_FOR_EXPLICIT_USER_BINDING_EXECUTION" ||
    commandReference.outputContract.bindingExecutionDeferred !== true ||
    commandReference.outputContract.userBinding !== "NOT_PERFORMED" ||
    commandReference.outputContract.productConsumption !== "NOT_PERFORMED" ||
    commandReference.outputContract.futureBindingExecutionRequired !== true ||
    commandReference.outputContract.noAutomaticUserBinding !== true
  ) {
    return blocked(input, "COMMAND_SCOPE_INVALID");
  }

  const identityReference =
    commandReference.eligibilityReference.decisionResolutionReference
      .decisionCommandReference.decisionContractReference.resolutionReference
      .commandReference.reviewReference.contractReference.readinessReference
      .identityReference;
  const acceptedIdentityReference =
    commandReference.eligibilityReference.decisionResolutionReference
      .decisionCommandReference.decisionContractReference.resolutionReference
      .commandReference.reviewReference.contractReference.readinessReference
      .identitySourceReference.personalStarBeastReference;
  if (identityReference !== acceptedIdentityReference) {
    return blocked(input, "IDENTITY_REFERENCE_DRIFT");
  }

  return Object.freeze({
    status: "READY" as const,
    reviewStatus: "READY_FOR_EXPLICIT_USER_BINDING_EXECUTION" as const,
    source:
      "personal_star_beast_identity_explicit_user_binding_execution_authorization_review" as const,
    input,
    reviewReference: Object.freeze({
      referenceType:
        "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_EXECUTION_AUTHORIZATION_REVIEW" as const,
      referenceId: `personal-star-beast-identity-explicit-binding-execution-review:${commandReference.referenceId}`,
      reviewVersion: "V1" as const,
      reviewScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY" as const,
      authorizationStatus: "AUTHORIZED" as const,
      commandReference,
      inputContract: Object.freeze({
        acceptedCommandType:
          "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_COMMAND" as const,
        requiredCommandStatus:
          "READY_FOR_EXPLICIT_USER_BINDING_EXECUTION" as const,
        bindingScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY" as const,
        reviewOnly: true as const,
        noAutomaticExecution: true as const,
        noRawUserIdentityPayload: true as const,
      }),
      outputContract: Object.freeze({
        outputReferenceType:
          "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_EXECUTION_AUTHORIZATION_REVIEW" as const,
        reviewStatus: "READY_FOR_EXPLICIT_USER_BINDING_EXECUTION" as const,
        executionAuthorized: false as const,
        bindingExecutionStatus: "NOT_PERFORMED" as const,
        userBinding: "NOT_PERFORMED" as const,
        productConsumption: "NOT_PERFORMED" as const,
        futureExplicitExecutionRequired: true as const,
        noAutomaticUserBinding: true as const,
      }),
      reviewOnly: true as const,
      referenceOnly: true as const,
      executionAuthorized: false as const,
      bindingExecutionStatus: "NOT_PERFORMED" as const,
      userBinding: "NOT_PERFORMED" as const,
      productConsumption: "NOT_PERFORMED" as const,
      futureExplicitExecutionRequired: true as const,
      noAutomaticUserBinding: true as const,
      noUserProfileCreation: true as const,
      noStorageWrite: true as const,
      noEngineInvocation: true as const,
      noRendererInvocation: true as const,
      noLifeStateMutation: true as const,
    }),
    boundary: REVIEW_BOUNDARY,
  });
}
