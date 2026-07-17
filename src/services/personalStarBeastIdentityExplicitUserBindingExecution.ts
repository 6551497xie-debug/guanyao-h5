import type {
  PersonalStarBeastIdentityExplicitUserBindingExecutionBlockedReason,
  PersonalStarBeastIdentityExplicitUserBindingExecutionBoundary,
  PersonalStarBeastIdentityExplicitUserBindingExecutionInput,
  PersonalStarBeastIdentityExplicitUserBindingExecutionResult,
  PersonalStarBeastIdentityExplicitUserBindingExecutionUnavailableReason,
} from "../types/personalStarBeastIdentityExplicitUserBindingExecution";

const EXECUTED_BOUNDARY: PersonalStarBeastIdentityExplicitUserBindingExecutionBoundary = Object.freeze({
  bindingExecutionOnly: true,
  referenceOnly: true,
  bindingExecutionPerformed: true,
  userBindingPerformed: true,
  storageWritePerformed: false,
  productConsumptionPerformed: false,
  noUserProfileCreation: true,
  persistenceDeferred: true,
  noEngineInvocation: true,
  noRendererInvocation: true,
  noLifeStateMutation: true,
});

const NOT_EXECUTED_BOUNDARY: PersonalStarBeastIdentityExplicitUserBindingExecutionBoundary = Object.freeze({
  ...EXECUTED_BOUNDARY,
  bindingExecutionPerformed: false,
  userBindingPerformed: false,
});

const unavailable = (
  input: PersonalStarBeastIdentityExplicitUserBindingExecutionInput,
  reason: PersonalStarBeastIdentityExplicitUserBindingExecutionUnavailableReason,
): PersonalStarBeastIdentityExplicitUserBindingExecutionResult => Object.freeze({
  status: "UNAVAILABLE" as const,
  executionStatus: "UNAVAILABLE" as const,
  source: "personal_star_beast_identity_explicit_user_binding_execution" as const,
  reason,
  input,
  bindingReference: null,
  boundary: NOT_EXECUTED_BOUNDARY,
});

const blocked = (
  input: PersonalStarBeastIdentityExplicitUserBindingExecutionInput,
  reason: PersonalStarBeastIdentityExplicitUserBindingExecutionBlockedReason,
): PersonalStarBeastIdentityExplicitUserBindingExecutionResult => Object.freeze({
  status: "BLOCKED" as const,
  executionStatus: "BLOCKED" as const,
  source: "personal_star_beast_identity_explicit_user_binding_execution" as const,
  reason,
  input,
  bindingReference: null,
  boundary: NOT_EXECUTED_BOUNDARY,
});

export function executePersonalStarBeastIdentityExplicitUserBinding(
  input: PersonalStarBeastIdentityExplicitUserBindingExecutionInput,
): PersonalStarBeastIdentityExplicitUserBindingExecutionResult {
  const confirmationResult = input.authorizationConfirmationResult;
  if (confirmationResult === null) {
    return unavailable(input, "AUTHORIZATION_CONFIRMATION_REQUIRED");
  }
  if (confirmationResult.status === "UNAVAILABLE") {
    return unavailable(input, "AUTHORIZATION_CONFIRMATION_UNAVAILABLE");
  }
  if (confirmationResult.status === "BLOCKED") {
    return blocked(input, "AUTHORIZATION_CONFIRMATION_BLOCKED");
  }

  if (
    confirmationResult.status !== "READY" ||
    confirmationResult.confirmationStatus !== "READY_FOR_EXPLICIT_USER_BINDING_EXECUTION" ||
    confirmationResult.source !==
      "personal_star_beast_identity_explicit_user_binding_execution_authorization_confirmation" ||
    confirmationResult.boundary.confirmationOnly !== true ||
    confirmationResult.boundary.referenceOnly !== true ||
    confirmationResult.boundary.executionAuthorized !== true ||
    confirmationResult.boundary.bindingExecutionPerformed !== false ||
    confirmationResult.boundary.userBindingPerformed !== false ||
    confirmationResult.boundary.productConsumptionPerformed !== false ||
    confirmationResult.boundary.noAutomaticUserBinding !== true ||
    confirmationResult.boundary.noUserProfileCreation !== true ||
    confirmationResult.boundary.noStorageWrite !== true ||
    confirmationResult.boundary.noEngineInvocation !== true ||
    confirmationResult.boundary.noRendererInvocation !== true ||
    confirmationResult.boundary.noLifeStateMutation !== true
  ) {
    return blocked(input, "CONFIRMATION_BOUNDARY_INVALID");
  }

  const confirmationReference = confirmationResult.confirmationReference;
  if (
    confirmationReference.referenceType !==
      "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_EXECUTION_AUTHORIZATION_CONFIRMATION" ||
    confirmationReference.confirmationVersion !== "V1" ||
    confirmationReference.confirmationOnly !== true ||
    confirmationReference.referenceOnly !== true ||
    confirmationReference.executionAuthorized !== true ||
    confirmationReference.bindingExecutionStatus !== "NOT_PERFORMED" ||
    confirmationReference.userBinding !== "NOT_PERFORMED" ||
    confirmationReference.productConsumption !== "NOT_PERFORMED" ||
    confirmationReference.explicitExecutionStillRequired !== true ||
    confirmationReference.noAutomaticUserBinding !== true ||
    confirmationReference.noUserProfileCreation !== true ||
    confirmationReference.noStorageWrite !== true ||
    confirmationReference.noEngineInvocation !== true ||
    confirmationReference.noRendererInvocation !== true ||
    confirmationReference.noLifeStateMutation !== true
  ) {
    return blocked(input, "CONFIRMATION_REFERENCE_INVALID");
  }

  const userSubjectReference = input.userSubjectReference;
  if (userSubjectReference === null) {
    return unavailable(input, "USER_SUBJECT_REFERENCE_REQUIRED");
  }
  if (
    typeof userSubjectReference !== "string" ||
    userSubjectReference.length === 0 ||
    !userSubjectReference.startsWith("user-subject:")
  ) {
    return blocked(input, "USER_SUBJECT_REFERENCE_INVALID");
  }

  const identityReference =
    confirmationReference.reviewReference.commandReference.eligibilityReference
      .decisionResolutionReference.decisionCommandReference
      .decisionContractReference.resolutionReference.commandReference
      .reviewReference.contractReference.readinessReference.identityReference;
  const acceptedIdentityReference =
    confirmationReference.reviewReference.commandReference.eligibilityReference
      .decisionResolutionReference.decisionCommandReference
      .decisionContractReference.resolutionReference.commandReference
      .reviewReference.contractReference.readinessReference.identitySourceReference
      .personalStarBeastReference;
  if (identityReference !== acceptedIdentityReference) {
    return blocked(input, "IDENTITY_REFERENCE_DRIFT");
  }

  return Object.freeze({
    status: "BOUND" as const,
    executionStatus: "EXPLICIT_USER_BINDING_EXECUTED" as const,
    source: "personal_star_beast_identity_explicit_user_binding_execution" as const,
    input,
    bindingReference: Object.freeze({
      referenceType: "PERSONAL_STAR_BEAST_IDENTITY_USER_BINDING_REFERENCE" as const,
      referenceId: `personal-star-beast-user-binding:${userSubjectReference}:${confirmationReference.confirmation.commandId}`,
      bindingVersion: "V1" as const,
      authorizationConfirmationReference: confirmationReference,
      userSubjectReference,
      personalStarBeastIdentityReference: identityReference,
      inputContract: Object.freeze({
        acceptedConfirmationType:
          "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_EXECUTION_AUTHORIZATION_CONFIRMATION" as const,
        requiredConfirmationStatus:
          "READY_FOR_EXPLICIT_USER_BINDING_EXECUTION" as const,
        requiredUserSubjectReference: true as const,
        bindingScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY" as const,
        opaqueUserReferenceOnly: true as const,
        noRawUserIdentityPayload: true as const,
      }),
      outputContract: Object.freeze({
        outputReferenceType:
          "PERSONAL_STAR_BEAST_IDENTITY_USER_BINDING_REFERENCE" as const,
        executionStatus: "EXPLICIT_USER_BINDING_EXECUTED" as const,
        bindingExecutionStatus: "PERFORMED" as const,
        userBinding: "PERFORMED" as const,
        storagePersistence: "DEFERRED" as const,
        productConsumption: "NOT_PERFORMED" as const,
        noUserProfileCreation: true as const,
        persistenceDeferred: true as const,
      }),
      bindingScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY" as const,
      bindingExecutionOnly: true as const,
      referenceOnly: true as const,
      bindingExecutionStatus: "PERFORMED" as const,
      userBinding: "PERFORMED" as const,
      storagePersistence: "DEFERRED" as const,
      productConsumption: "NOT_PERFORMED" as const,
      noUserProfileCreation: true as const,
      persistenceDeferred: true as const,
      noEngineInvocation: true as const,
      noRendererInvocation: true as const,
      noLifeStateMutation: true as const,
    }),
    boundary: EXECUTED_BOUNDARY,
  });
}
