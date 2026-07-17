import type {
  PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewBlockedReason,
  PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewBoundary,
  PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewInput,
  PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewResult,
  PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewUnavailableReason,
} from "../types/personalStarBeastIdentityUserBindingPersistenceIntegrationReview";

const REVIEW_BOUNDARY: PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewBoundary = Object.freeze({
  reviewOnly: true,
  referenceOnly: true,
  integrationAuthorized: false,
  storageWritePerformed: false,
  realUserBindingPerformed: false,
  productIntegrationPerformed: false,
  noStorageWrite: true,
  noUserProfileCreation: true,
  noUIIntegration: true,
  noEngineInvocation: true,
  noRendererInvocation: true,
  noLifeStateMutation: true,
});

const unavailable = (
  input: PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewInput,
  reason: PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewUnavailableReason,
): PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewResult => Object.freeze({
  status: "UNAVAILABLE" as const,
  reviewStatus: "UNAVAILABLE" as const,
  source: "personal_star_beast_identity_user_binding_persistence_integration_review" as const,
  reason,
  input,
  reviewReference: null,
  boundary: REVIEW_BOUNDARY,
});

const blocked = (
  input: PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewInput,
  reason: PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewBlockedReason,
): PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewResult => Object.freeze({
  status: "BLOCKED" as const,
  reviewStatus: "BLOCKED" as const,
  source: "personal_star_beast_identity_user_binding_persistence_integration_review" as const,
  reason,
  input,
  reviewReference: null,
  boundary: REVIEW_BOUNDARY,
});

export function reviewPersonalStarBeastIdentityUserBindingPersistenceIntegration(
  input: PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewInput,
): PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewResult {
  const executionResult = input.executionResult;
  if (executionResult === null) {
    return unavailable(input, "BINDING_EXECUTION_RESULT_REQUIRED");
  }
  if (executionResult.status === "UNAVAILABLE") {
    return unavailable(input, "BINDING_EXECUTION_RESULT_UNAVAILABLE");
  }
  if (executionResult.status === "BLOCKED") {
    return blocked(input, "BINDING_EXECUTION_RESULT_BLOCKED");
  }

  if (
    executionResult.status !== "BOUND" ||
    executionResult.executionStatus !== "EXPLICIT_USER_BINDING_EXECUTED" ||
    executionResult.source !== "personal_star_beast_identity_explicit_user_binding_execution" ||
    executionResult.boundary.bindingExecutionOnly !== true ||
    executionResult.boundary.referenceOnly !== true ||
    executionResult.boundary.bindingExecutionPerformed !== true ||
    executionResult.boundary.userBindingPerformed !== true ||
    executionResult.boundary.storageWritePerformed !== false ||
    executionResult.boundary.productConsumptionPerformed !== false ||
    executionResult.boundary.persistenceDeferred !== true ||
    executionResult.boundary.noUserProfileCreation !== true ||
    executionResult.boundary.noEngineInvocation !== true ||
    executionResult.boundary.noRendererInvocation !== true ||
    executionResult.boundary.noLifeStateMutation !== true
  ) {
    return blocked(input, "BINDING_EXECUTION_BOUNDARY_INVALID");
  }

  const bindingReference = executionResult.bindingReference;
  if (
    bindingReference.referenceType !== "PERSONAL_STAR_BEAST_IDENTITY_USER_BINDING_REFERENCE" ||
    bindingReference.bindingVersion !== "V1" ||
    bindingReference.bindingExecutionOnly !== true ||
    bindingReference.referenceOnly !== true ||
    bindingReference.bindingExecutionStatus !== "PERFORMED" ||
    bindingReference.userBinding !== "PERFORMED" ||
    bindingReference.storagePersistence !== "DEFERRED" ||
    bindingReference.productConsumption !== "NOT_PERFORMED" ||
    bindingReference.persistenceDeferred !== true ||
    bindingReference.noUserProfileCreation !== true ||
    bindingReference.noEngineInvocation !== true ||
    bindingReference.noRendererInvocation !== true ||
    bindingReference.noLifeStateMutation !== true
  ) {
    return blocked(input, "BINDING_REFERENCE_INVALID");
  }

  const identityReference = bindingReference.personalStarBeastIdentityReference;
  const acceptedIdentityReference =
    bindingReference.authorizationConfirmationReference.reviewReference.commandReference
      .eligibilityReference.decisionResolutionReference.decisionCommandReference
      .decisionContractReference.resolutionReference.commandReference.reviewReference
      .contractReference.readinessReference.identitySourceReference.personalStarBeastReference;
  if (identityReference !== acceptedIdentityReference) {
    return blocked(input, "IDENTITY_REFERENCE_DRIFT");
  }

  return Object.freeze({
    status: "READY" as const,
    reviewStatus: "READY_FOR_REAL_USER_STORAGE_BINDING_INTEGRATION_REVIEW" as const,
    source: "personal_star_beast_identity_user_binding_persistence_integration_review" as const,
    input,
    reviewReference: Object.freeze({
      referenceType:
        "PERSONAL_STAR_BEAST_IDENTITY_USER_BINDING_PERSISTENCE_INTEGRATION_REVIEW" as const,
      referenceId: `personal-star-beast-user-binding-persistence-review:${bindingReference.referenceId}`,
      reviewVersion: "V1" as const,
      bindingReference,
      inputContract: Object.freeze({
        acceptedBindingReferenceType:
          "PERSONAL_STAR_BEAST_IDENTITY_USER_BINDING_REFERENCE" as const,
        requiredExecutionStatus: "EXPLICIT_USER_BINDING_EXECUTED" as const,
        requiredBindingExecutionStatus: "PERFORMED" as const,
        requiredStoragePersistence: "DEFERRED" as const,
        realAuthenticationRequired: true as const,
        storageAdapterRequired: true as const,
        reviewOnly: true as const,
      }),
      outputContract: Object.freeze({
        outputReferenceType:
          "PERSONAL_STAR_BEAST_IDENTITY_USER_BINDING_PERSISTENCE_INTEGRATION_REVIEW" as const,
        reviewStatus: "READY_FOR_REAL_USER_STORAGE_BINDING_INTEGRATION_REVIEW" as const,
        integrationAuthorized: false as const,
        storagePersistence: "DEFERRED" as const,
        realUserBinding: "DOMAIN_REFERENCE_BOUND" as const,
        productIntegration: "NOT_PERFORMED" as const,
        futureIntegrationReviewRequired: true as const,
        noAutomaticIntegration: true as const,
      }),
      reviewOnly: true as const,
      referenceOnly: true as const,
      integrationAuthorized: false as const,
      storagePersistence: "DEFERRED" as const,
      realUserBinding: "DOMAIN_REFERENCE_BOUND" as const,
      productIntegration: "NOT_PERFORMED" as const,
      futureIntegrationReviewRequired: true as const,
      noAutomaticIntegration: true as const,
      noStorageWrite: true as const,
      noUserProfileCreation: true as const,
      noUIIntegration: true as const,
      noEngineInvocation: true as const,
      noRendererInvocation: true as const,
      noLifeStateMutation: true as const,
    }),
    boundary: REVIEW_BOUNDARY,
  });
}
