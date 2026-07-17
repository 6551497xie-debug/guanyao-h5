import type {
  PersonalStarBeastIdentityRealUserAuthenticationSubjectContract,
  PersonalStarBeastIdentityRealUserStorageIntegrationPlanReviewBlockedReason,
  PersonalStarBeastIdentityRealUserStorageIntegrationPlanReviewBoundary,
  PersonalStarBeastIdentityRealUserStorageIntegrationPlanReviewInput,
  PersonalStarBeastIdentityRealUserStorageIntegrationPlanReviewResult,
  PersonalStarBeastIdentityRealUserStorageIntegrationPlanReviewUnavailableReason,
  PersonalStarBeastIdentityStorageAdapterIntegrationContract,
  PersonalStarBeastIdentityProductConsumerIntegrationContract,
} from "../types/personalStarBeastIdentityRealUserStorageIntegrationPlanReview";

const REVIEW_BOUNDARY: PersonalStarBeastIdentityRealUserStorageIntegrationPlanReviewBoundary = Object.freeze({
  planOnly: true,
  reviewOnly: true,
  implementationAuthorized: false,
  realAuthenticationPerformed: false,
  storageWritePerformed: false,
  storageReadPerformed: false,
  productIntegrationPerformed: false,
  noUIIntegration: true,
  noEngineInvocation: true,
  noRendererInvocation: true,
  noLifeStateMutation: true,
});

const AUTHENTICATION_SUBJECT_CONTRACT: PersonalStarBeastIdentityRealUserAuthenticationSubjectContract = Object.freeze({
  contractType: "REAL_USER_AUTHENTICATION_SUBJECT_REFERENCE",
  subjectReferenceType: "OPAQUE_EXTERNAL_AUTH_SUBJECT_REFERENCE",
  opaqueSubjectOnly: true,
  rawIdentityPayloadAccepted: false,
  authenticationOwnedByHostProduct: true,
  identityEngineInput: false,
  subjectVerificationRequired: true,
});

const STORAGE_ADAPTER_CONTRACT: PersonalStarBeastIdentityStorageAdapterIntegrationContract = Object.freeze({
  contractType: "PERSONAL_STAR_BEAST_IDENTITY_BINDING_STORAGE_ADAPTER",
  persistenceMode: "EXPLICIT_BOUND_IDENTITY_REFERENCE",
  writeAuthority: "FUTURE_AUTHORIZED_ADAPTER_ONLY",
  idempotentWriteRequired: true,
  readBackVerificationRequired: true,
  identityRecomputationForbidden: true,
  lifeStateMutationForbidden: true,
  storageKeyOwnershipRequired: true,
});

const PRODUCT_CONSUMER_CONTRACT: PersonalStarBeastIdentityProductConsumerIntegrationContract = Object.freeze({
  contractType: "PERSONAL_STAR_BEAST_IDENTITY_PRODUCT_CONSUMER",
  consumptionMode: "EXPLICIT_USER_BINDING_REFERENCE_ONLY",
  automaticBindingForbidden: true,
  uiIntegrationDeferred: true,
  rendererAccessForbidden: true,
  engineInvocationForbidden: true,
  lifeStateMutationForbidden: true,
});

const unavailable = (
  input: PersonalStarBeastIdentityRealUserStorageIntegrationPlanReviewInput,
  reason: PersonalStarBeastIdentityRealUserStorageIntegrationPlanReviewUnavailableReason,
): PersonalStarBeastIdentityRealUserStorageIntegrationPlanReviewResult => Object.freeze({
  status: "UNAVAILABLE" as const,
  reviewStatus: "UNAVAILABLE" as const,
  source: "personal_star_beast_identity_real_user_storage_integration_plan_review" as const,
  reason,
  input,
  reviewReference: null,
  boundary: REVIEW_BOUNDARY,
});

const blocked = (
  input: PersonalStarBeastIdentityRealUserStorageIntegrationPlanReviewInput,
  reason: PersonalStarBeastIdentityRealUserStorageIntegrationPlanReviewBlockedReason,
): PersonalStarBeastIdentityRealUserStorageIntegrationPlanReviewResult => Object.freeze({
  status: "BLOCKED" as const,
  reviewStatus: "BLOCKED" as const,
  source: "personal_star_beast_identity_real_user_storage_integration_plan_review" as const,
  reason,
  input,
  reviewReference: null,
  boundary: REVIEW_BOUNDARY,
});

export function reviewPersonalStarBeastIdentityRealUserStorageIntegrationPlan(
  input: PersonalStarBeastIdentityRealUserStorageIntegrationPlanReviewInput,
): PersonalStarBeastIdentityRealUserStorageIntegrationPlanReviewResult {
  const persistenceReview = input.persistenceIntegrationReviewResult;
  if (persistenceReview === null) {
    return unavailable(input, "PERSISTENCE_INTEGRATION_REVIEW_REQUIRED");
  }
  if (persistenceReview.status === "UNAVAILABLE") {
    return unavailable(input, "PERSISTENCE_INTEGRATION_REVIEW_UNAVAILABLE");
  }
  if (persistenceReview.status === "BLOCKED") {
    return blocked(input, "PERSISTENCE_INTEGRATION_REVIEW_BLOCKED");
  }

  if (
    persistenceReview.status !== "READY" ||
    persistenceReview.reviewStatus !== "READY_FOR_REAL_USER_STORAGE_BINDING_INTEGRATION_REVIEW" ||
    persistenceReview.source !== "personal_star_beast_identity_user_binding_persistence_integration_review" ||
    persistenceReview.boundary.reviewOnly !== true ||
    persistenceReview.boundary.referenceOnly !== true ||
    persistenceReview.boundary.integrationAuthorized !== false ||
    persistenceReview.boundary.storageWritePerformed !== false ||
    persistenceReview.boundary.realUserBindingPerformed !== false ||
    persistenceReview.boundary.productIntegrationPerformed !== false ||
    persistenceReview.boundary.noStorageWrite !== true ||
    persistenceReview.boundary.noUserProfileCreation !== true ||
    persistenceReview.boundary.noUIIntegration !== true ||
    persistenceReview.boundary.noEngineInvocation !== true ||
    persistenceReview.boundary.noRendererInvocation !== true ||
    persistenceReview.boundary.noLifeStateMutation !== true
  ) {
    return blocked(input, "PERSISTENCE_INTEGRATION_REVIEW_BOUNDARY_INVALID");
  }

  const persistenceReviewReference = persistenceReview.reviewReference;
  if (
    persistenceReviewReference === null ||
    persistenceReviewReference.referenceType !==
      "PERSONAL_STAR_BEAST_IDENTITY_USER_BINDING_PERSISTENCE_INTEGRATION_REVIEW" ||
    persistenceReviewReference.reviewVersion !== "V1" ||
    persistenceReviewReference.integrationAuthorized !== false ||
    persistenceReviewReference.storagePersistence !== "DEFERRED" ||
    persistenceReviewReference.realUserBinding !== "DOMAIN_REFERENCE_BOUND" ||
    persistenceReviewReference.productIntegration !== "NOT_PERFORMED" ||
    persistenceReviewReference.futureIntegrationReviewRequired !== true ||
    persistenceReviewReference.noAutomaticIntegration !== true ||
    persistenceReviewReference.noStorageWrite !== true ||
    persistenceReviewReference.noUserProfileCreation !== true ||
    persistenceReviewReference.noUIIntegration !== true ||
    persistenceReviewReference.noEngineInvocation !== true ||
    persistenceReviewReference.noRendererInvocation !== true ||
    persistenceReviewReference.noLifeStateMutation !== true
  ) {
    return blocked(input, "PERSISTENCE_INTEGRATION_REVIEW_REFERENCE_INVALID");
  }

  return Object.freeze({
    status: "READY" as const,
    reviewStatus: "READY_FOR_REAL_USER_STORAGE_ADAPTER_INTEGRATION_PLAN" as const,
    source: "personal_star_beast_identity_real_user_storage_integration_plan_review" as const,
    input,
    reviewReference: Object.freeze({
      referenceType:
        "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_INTEGRATION_PLAN_REVIEW" as const,
      referenceId: `personal-star-beast-real-user-storage-integration-plan:${persistenceReviewReference.referenceId}`,
      reviewVersion: "V1" as const,
      persistenceIntegrationReviewReference: persistenceReviewReference,
      inputContract: Object.freeze({
        acceptedReviewType:
          "PERSONAL_STAR_BEAST_IDENTITY_USER_BINDING_PERSISTENCE_INTEGRATION_REVIEW" as const,
        requiredReviewStatus:
          "READY_FOR_REAL_USER_STORAGE_BINDING_INTEGRATION_REVIEW" as const,
        authenticationSubjectContractRequired: true as const,
        storageAdapterContractRequired: true as const,
        productConsumerContractRequired: true as const,
        planOnly: true as const,
      }),
      outputContract: Object.freeze({
        outputReferenceType:
          "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_INTEGRATION_PLAN_REVIEW" as const,
        reviewStatus: "READY_FOR_REAL_USER_STORAGE_ADAPTER_INTEGRATION_PLAN" as const,
        integrationAuthorized: false as const,
        realAuthentication: "DEFERRED" as const,
        storageAdapter: "DESIGN_ONLY" as const,
        productConsumption: "DEFERRED" as const,
        implementationAuthorized: false as const,
        futureImplementationReviewRequired: true as const,
        noAutomaticIntegration: true as const,
      }),
      authenticationSubjectContract: AUTHENTICATION_SUBJECT_CONTRACT,
      storageAdapterContract: STORAGE_ADAPTER_CONTRACT,
      productConsumerContract: PRODUCT_CONSUMER_CONTRACT,
      planOnly: true as const,
      reviewOnly: true as const,
      integrationAuthorized: false as const,
      realAuthentication: "DEFERRED" as const,
      storageAdapter: "DESIGN_ONLY" as const,
      productConsumption: "DEFERRED" as const,
      implementationAuthorized: false as const,
      futureImplementationReviewRequired: true as const,
      noAutomaticIntegration: true as const,
      noUIIntegration: true as const,
      noEngineInvocation: true as const,
      noRendererInvocation: true as const,
      noLifeStateMutation: true as const,
    }),
    boundary: REVIEW_BOUNDARY,
  });
}
