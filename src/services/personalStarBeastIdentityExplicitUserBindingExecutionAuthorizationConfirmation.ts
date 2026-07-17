import type {
  PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationBlockedReason,
  PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationBoundary,
  PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationInput,
  PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationResult,
  PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationUnavailableReason,
} from "../types/personalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmation";

const CONFIRMATION_BOUNDARY: PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationBoundary =
  Object.freeze({
    confirmationOnly: true,
    referenceOnly: true,
    executionAuthorized: true,
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
  input: PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationInput,
  reason: PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationUnavailableReason,
): PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    confirmationStatus: "UNAVAILABLE" as const,
    source:
      "personal_star_beast_identity_explicit_user_binding_execution_authorization_confirmation" as const,
    reason,
    input,
    confirmationReference: null,
    boundary: CONFIRMATION_BOUNDARY,
  });

const blocked = (
  input: PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationInput,
  reason: PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationBlockedReason,
): PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    confirmationStatus: "BLOCKED" as const,
    source:
      "personal_star_beast_identity_explicit_user_binding_execution_authorization_confirmation" as const,
    reason,
    input,
    confirmationReference: null,
    boundary: CONFIRMATION_BOUNDARY,
  });

export function confirmPersonalStarBeastIdentityExplicitUserBindingExecutionAuthorization(
  input: PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationInput,
): PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationResult {
  const reviewResult = input.reviewResult;
  if (reviewResult === null) {
    return unavailable(input, "EXECUTION_AUTHORIZATION_REVIEW_REQUIRED");
  }
  if (reviewResult.status === "UNAVAILABLE") {
    return unavailable(input, "EXECUTION_AUTHORIZATION_REVIEW_UNAVAILABLE");
  }
  if (reviewResult.status === "BLOCKED") {
    return blocked(input, "EXECUTION_AUTHORIZATION_REVIEW_BLOCKED");
  }

  if (
    reviewResult.status !== "READY" ||
    reviewResult.reviewStatus !== "READY_FOR_EXPLICIT_USER_BINDING_EXECUTION" ||
    reviewResult.source !==
      "personal_star_beast_identity_explicit_user_binding_execution_authorization_review" ||
    reviewResult.boundary.reviewOnly !== true ||
    reviewResult.boundary.referenceOnly !== true ||
    reviewResult.boundary.executionAuthorized !== false ||
    reviewResult.boundary.bindingExecutionPerformed !== false ||
    reviewResult.boundary.userBindingPerformed !== false ||
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
      "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_EXECUTION_AUTHORIZATION_REVIEW" ||
    reviewReference.reviewVersion !== "V1" ||
    reviewReference.reviewScope !==
      "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY" ||
    reviewReference.reviewOnly !== true ||
    reviewReference.referenceOnly !== true ||
    reviewReference.executionAuthorized !== false ||
    reviewReference.bindingExecutionStatus !== "NOT_PERFORMED" ||
    reviewReference.userBinding !== "NOT_PERFORMED" ||
    reviewReference.productConsumption !== "NOT_PERFORMED" ||
    reviewReference.futureExplicitExecutionRequired !== true ||
    reviewReference.noAutomaticUserBinding !== true ||
    reviewReference.noUserProfileCreation !== true ||
    reviewReference.noStorageWrite !== true ||
    reviewReference.noEngineInvocation !== true ||
    reviewReference.noRendererInvocation !== true ||
    reviewReference.noLifeStateMutation !== true
  ) {
    return blocked(input, "REVIEW_REFERENCE_INVALID");
  }

  const confirmation = input.confirmation;
  if (confirmation === null) {
    return unavailable(input, "EXPLICIT_EXECUTION_AUTHORIZATION_CONFIRMATION_REQUIRED");
  }
  if (
    confirmation.commandType !==
    "EXPLICIT_USER_BINDING_EXECUTION_AUTHORIZATION_CONFIRMATION"
  ) {
    return blocked(input, "CONFIRMATION_TYPE_INVALID");
  }
  if (
    confirmation.subjectDecision !==
      "CONFIRM_EXPLICIT_USER_BINDING_EXECUTION_AUTHORIZATION" ||
    confirmation.identityReferenceAccepted !== true ||
    confirmation.bindingScope !==
      "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY"
  ) {
    return blocked(input, "CONFIRMATION_SCOPE_INVALID");
  }
  if (
    typeof confirmation.commandId !== "string" ||
    confirmation.commandId.length === 0 ||
    typeof confirmation.confirmationReference !== "string" ||
    confirmation.confirmationReference.length === 0
  ) {
    return blocked(input, "CONFIRMATION_REFERENCE_INVALID");
  }

  const identityReference =
    reviewReference.commandReference.eligibilityReference
      .decisionResolutionReference.decisionCommandReference
      .decisionContractReference.resolutionReference.commandReference
      .reviewReference.contractReference.readinessReference.identityReference;
  const acceptedIdentityReference =
    reviewReference.commandReference.eligibilityReference
      .decisionResolutionReference.decisionCommandReference
      .decisionContractReference.resolutionReference.commandReference
      .reviewReference.contractReference.readinessReference.identitySourceReference
      .personalStarBeastReference;
  if (identityReference !== acceptedIdentityReference) {
    return blocked(input, "IDENTITY_REFERENCE_DRIFT");
  }

  return Object.freeze({
    status: "READY" as const,
    confirmationStatus: "READY_FOR_EXPLICIT_USER_BINDING_EXECUTION" as const,
    source:
      "personal_star_beast_identity_explicit_user_binding_execution_authorization_confirmation" as const,
    input,
    confirmationReference: Object.freeze({
      referenceType:
        "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_EXECUTION_AUTHORIZATION_CONFIRMATION" as const,
      referenceId: `personal-star-beast-identity-explicit-binding-execution-authorization:${confirmation.commandId}`,
      confirmationVersion: "V1" as const,
      reviewReference,
      confirmation,
      inputContract: Object.freeze({
        acceptedReviewType:
          "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_EXECUTION_AUTHORIZATION_REVIEW" as const,
        requiredReviewStatus:
          "READY_FOR_EXPLICIT_USER_BINDING_EXECUTION" as const,
        confirmationRequired: true as const,
        bindingScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY" as const,
        noAutomaticExecution: true as const,
        noRawUserIdentityPayload: true as const,
      }),
      outputContract: Object.freeze({
        outputReferenceType:
          "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_EXECUTION_AUTHORIZATION_CONFIRMATION" as const,
        confirmationStatus:
          "READY_FOR_EXPLICIT_USER_BINDING_EXECUTION" as const,
        executionAuthorized: true as const,
        bindingExecutionStatus: "NOT_PERFORMED" as const,
        userBinding: "NOT_PERFORMED" as const,
        productConsumption: "NOT_PERFORMED" as const,
        explicitExecutionStillRequired: true as const,
        noAutomaticUserBinding: true as const,
      }),
      confirmationOnly: true as const,
      referenceOnly: true as const,
      executionAuthorized: true as const,
      bindingExecutionStatus: "NOT_PERFORMED" as const,
      userBinding: "NOT_PERFORMED" as const,
      productConsumption: "NOT_PERFORMED" as const,
      explicitExecutionStillRequired: true as const,
      noAutomaticUserBinding: true as const,
      noUserProfileCreation: true as const,
      noStorageWrite: true as const,
      noEngineInvocation: true as const,
      noRendererInvocation: true as const,
      noLifeStateMutation: true as const,
    }),
    boundary: CONFIRMATION_BOUNDARY,
  });
}
