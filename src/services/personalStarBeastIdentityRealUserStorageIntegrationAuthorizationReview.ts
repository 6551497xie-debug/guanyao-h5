import type {
  PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewBlockedReason,
  PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewBoundary,
  PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewInput,
  PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewResult,
  PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewUnavailableReason,
} from "../types/personalStarBeastIdentityRealUserStorageIntegrationAuthorizationReview";

const REVIEW_BOUNDARY: PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewBoundary = Object.freeze({
  reviewOnly: true,
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
  input: PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewInput,
  reason: PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewUnavailableReason,
): PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewResult => Object.freeze({
  status: "UNAVAILABLE" as const,
  reviewStatus: "UNAVAILABLE" as const,
  source: "personal_star_beast_identity_real_user_storage_integration_authorization_review" as const,
  reason,
  input,
  reviewReference: null,
  boundary: REVIEW_BOUNDARY,
});

const blocked = (
  input: PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewInput,
  reason: PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewBlockedReason,
): PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewResult => Object.freeze({
  status: "BLOCKED" as const,
  reviewStatus: "BLOCKED" as const,
  source: "personal_star_beast_identity_real_user_storage_integration_authorization_review" as const,
  reason,
  input,
  reviewReference: null,
  boundary: REVIEW_BOUNDARY,
});

export function reviewPersonalStarBeastIdentityRealUserStorageIntegrationAuthorization(
  input: PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewInput,
): PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewResult {
  const planReview = input.planReviewResult;
  if (planReview === null) {
    return unavailable(input, "INTEGRATION_PLAN_REVIEW_REQUIRED");
  }
  if (planReview.status === "UNAVAILABLE") {
    return unavailable(input, "INTEGRATION_PLAN_REVIEW_UNAVAILABLE");
  }
  if (planReview.status === "BLOCKED") {
    return blocked(input, "INTEGRATION_PLAN_REVIEW_BLOCKED");
  }

  if (
    planReview.status !== "READY" ||
    planReview.reviewStatus !== "READY_FOR_REAL_USER_STORAGE_ADAPTER_INTEGRATION_PLAN" ||
    planReview.source !== "personal_star_beast_identity_real_user_storage_integration_plan_review" ||
    planReview.boundary.planOnly !== true ||
    planReview.boundary.reviewOnly !== true ||
    planReview.boundary.implementationAuthorized !== false ||
    planReview.boundary.realAuthenticationPerformed !== false ||
    planReview.boundary.storageWritePerformed !== false ||
    planReview.boundary.storageReadPerformed !== false ||
    planReview.boundary.productIntegrationPerformed !== false ||
    planReview.boundary.noUIIntegration !== true ||
    planReview.boundary.noEngineInvocation !== true ||
    planReview.boundary.noRendererInvocation !== true ||
    planReview.boundary.noLifeStateMutation !== true
  ) {
    return blocked(input, "INTEGRATION_PLAN_REVIEW_BOUNDARY_INVALID");
  }

  const planReference = planReview.reviewReference;
  if (
    planReference === null ||
    planReference.referenceType !==
      "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_INTEGRATION_PLAN_REVIEW" ||
    planReference.reviewVersion !== "V1" ||
    planReference.planOnly !== true ||
    planReference.reviewOnly !== true ||
    planReference.integrationAuthorized !== false ||
    planReference.realAuthentication !== "DEFERRED" ||
    planReference.storageAdapter !== "DESIGN_ONLY" ||
    planReference.productConsumption !== "DEFERRED" ||
    planReference.implementationAuthorized !== false ||
    planReference.futureImplementationReviewRequired !== true ||
    planReference.noAutomaticIntegration !== true ||
    planReference.noUIIntegration !== true ||
    planReference.noEngineInvocation !== true ||
    planReference.noRendererInvocation !== true ||
    planReference.noLifeStateMutation !== true ||
    planReference.authenticationSubjectContract.opaqueSubjectOnly !== true ||
    planReference.authenticationSubjectContract.rawIdentityPayloadAccepted !== false ||
    planReference.storageAdapterContract.writeAuthority !== "FUTURE_AUTHORIZED_ADAPTER_ONLY" ||
    planReference.storageAdapterContract.identityRecomputationForbidden !== true ||
    planReference.storageAdapterContract.lifeStateMutationForbidden !== true ||
    planReference.productConsumerContract.automaticBindingForbidden !== true ||
    planReference.productConsumerContract.uiIntegrationDeferred !== true ||
    planReference.productConsumerContract.rendererAccessForbidden !== true ||
    planReference.productConsumerContract.engineInvocationForbidden !== true ||
    planReference.productConsumerContract.lifeStateMutationForbidden !== true
  ) {
    return blocked(input, "INTEGRATION_PLAN_REVIEW_REFERENCE_INVALID");
  }

  return Object.freeze({
    status: "READY" as const,
    reviewStatus:
      "READY_FOR_EXPLICIT_REAL_USER_STORAGE_ADAPTER_IMPLEMENTATION_AUTHORITY" as const,
    source: "personal_star_beast_identity_real_user_storage_integration_authorization_review" as const,
    input,
    reviewReference: Object.freeze({
      referenceType:
        "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_INTEGRATION_AUTHORIZATION_REVIEW" as const,
      referenceId: `personal-star-beast-real-user-storage-integration-authorization:${planReference.referenceId}`,
      reviewVersion: "V1" as const,
      planReviewReference: planReference,
      inputContract: Object.freeze({
        acceptedPlanReviewType:
          "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_INTEGRATION_PLAN_REVIEW" as const,
        requiredPlanReviewStatus:
          "READY_FOR_REAL_USER_STORAGE_ADAPTER_INTEGRATION_PLAN" as const,
        requiredPlanOnly: true as const,
        requiredImplementationUnauthorized: true as const,
        explicitAuthorityRequired: true as const,
        reviewOnly: true as const,
      }),
      outputContract: Object.freeze({
        outputReferenceType:
          "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_INTEGRATION_AUTHORIZATION_REVIEW" as const,
        reviewStatus:
          "READY_FOR_EXPLICIT_REAL_USER_STORAGE_ADAPTER_IMPLEMENTATION_AUTHORITY" as const,
        authorizationStatus: "AWAITING_EXPLICIT_IMPLEMENTATION_AUTHORITY" as const,
        authorizationGranted: false as const,
        implementationAuthorized: false as const,
        realAuthentication: "NOT_AUTHORIZED" as const,
        storageAdapter: "NOT_AUTHORIZED" as const,
        productIntegration: "NOT_AUTHORIZED" as const,
        explicitAuthorityRequired: true as const,
        futureExplicitAuthorityCommandRequired: true as const,
        noAutomaticAuthorization: true as const,
      }),
      reviewOnly: true as const,
      authorizationStatus: "AWAITING_EXPLICIT_IMPLEMENTATION_AUTHORITY" as const,
      authorizationGranted: false as const,
      implementationAuthorized: false as const,
      realAuthentication: "NOT_AUTHORIZED" as const,
      storageAdapter: "NOT_AUTHORIZED" as const,
      productIntegration: "NOT_AUTHORIZED" as const,
      explicitAuthorityRequired: true as const,
      futureExplicitAuthorityCommandRequired: true as const,
      noAutomaticAuthorization: true as const,
      noUIIntegration: true as const,
      noEngineInvocation: true as const,
      noRendererInvocation: true as const,
      noLifeStateMutation: true as const,
    }),
    boundary: REVIEW_BOUNDARY,
  });
}
