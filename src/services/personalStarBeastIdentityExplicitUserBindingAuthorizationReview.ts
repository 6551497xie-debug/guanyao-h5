import type {
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewBlockedReason,
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewBoundary,
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewInput,
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewResult,
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewUnavailableReason,
} from "../types/personalStarBeastIdentityExplicitUserBindingAuthorizationReview";

const REVIEW_BOUNDARY: PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewBoundary =
  Object.freeze({
    reviewOnly: true,
    referenceOnly: true,
    authorizationReviewOnly: true,
    authorizationGranted: false,
    userBindingPerformed: false,
    userConsentCaptured: false,
    productConsumptionPerformed: false,
    noAutomaticUserBinding: true,
    noUserProfileCreation: true,
    noStorageWrite: true,
    noEngineInvocation: true,
    noRendererInvocation: true,
    noLifeStateMutation: true,
  });

const unavailable = (
  input: PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewInput,
  reason: PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewUnavailableReason,
): PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    reviewStatus: "UNAVAILABLE" as const,
    source:
      "personal_star_beast_identity_explicit_user_binding_authorization_review" as const,
    reason,
    input,
    reviewReference: null,
    boundary: REVIEW_BOUNDARY,
  });

const blocked = (
  input: PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewInput,
  reason: PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewBlockedReason,
): PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    reviewStatus: "BLOCKED" as const,
    source:
      "personal_star_beast_identity_explicit_user_binding_authorization_review" as const,
    reason,
    input,
    reviewReference: null,
    boundary: REVIEW_BOUNDARY,
  });

export function reviewPersonalStarBeastIdentityExplicitUserBindingAuthorization(
  input: PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewInput,
): PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewResult {
  const contractResult = input.productConsumptionContractResult;
  if (contractResult === null) {
    return unavailable(input, "PRODUCT_CONSUMPTION_CONTRACT_REQUIRED");
  }
  if (contractResult.status === "UNAVAILABLE") {
    return unavailable(input, "PRODUCT_CONSUMPTION_CONTRACT_UNAVAILABLE");
  }
  if (contractResult.status === "BLOCKED") {
    return blocked(input, "PRODUCT_CONSUMPTION_CONTRACT_BLOCKED");
  }

  if (
    contractResult.status !== "READY" ||
    contractResult.contractStatus !==
      "PERSONAL_STAR_BEAST_IDENTITY_PRODUCT_CONSUMPTION_CONTRACT_READY" ||
    contractResult.source !==
      "personal_star_beast_identity_product_consumption_contract" ||
    contractResult.boundary.contractOnly !== true ||
    contractResult.boundary.referenceOnly !== true ||
    contractResult.boundary.noProductConsumption !== true ||
    contractResult.boundary.noUserBinding !== true ||
    contractResult.boundary.noConsumerCreation !== true ||
    contractResult.boundary.noEngineInvocation !== true ||
    contractResult.boundary.noRendererInvocation !== true ||
    contractResult.boundary.noStorageWrite !== true ||
    contractResult.boundary.noUserProfileCreation !== true ||
    contractResult.boundary.noLifeStateMutation !== true
  ) {
    return blocked(input, "CONTRACT_BOUNDARY_INVALID");
  }

  const contractReference = contractResult.contractReference;
  if (
    contractReference.referenceType !==
      "PERSONAL_STAR_BEAST_IDENTITY_PRODUCT_CONSUMPTION_CONTRACT" ||
    contractReference.consumerScope !==
      "FUTURE_PERSONAL_STAR_BEAST_PRODUCT_CONSUMER_ONLY" ||
    contractReference.contractOnly !== true ||
    contractReference.referenceOnly !== true ||
    contractReference.productConsumption !== "NOT_PERFORMED" ||
    contractReference.explicitUserBindingRequired !== true ||
    contractReference.noAutomaticUserBinding !== true ||
    contractReference.noRendererInvocation !== true ||
    contractReference.noStorageWrite !== true
  ) {
    return blocked(input, "CONTRACT_REFERENCE_INVALID");
  }

  if (
    contractReference.outputContract.explicitUserBindingRequired !== true ||
    contractReference.outputContract.noAutomaticUserBinding !== true ||
    contractReference.outputContract.productConsumption !== "NOT_PERFORMED"
  ) {
    return blocked(input, "EXPLICIT_BINDING_SCOPE_INVALID");
  }

  if (
    contractReference.readinessReference.identityReference !==
      contractReference.readinessReference.identitySourceReference.personalStarBeastReference
  ) {
    return blocked(input, "IDENTITY_REFERENCE_DRIFT");
  }

  return Object.freeze({
    status: "READY" as const,
    reviewStatus:
      "READY_FOR_EXPLICIT_USER_BINDING_AUTHORIZATION" as const,
    source:
      "personal_star_beast_identity_explicit_user_binding_authorization_review" as const,
    input,
    reviewReference: Object.freeze({
      referenceType:
        "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_AUTHORIZATION_REVIEW" as const,
      referenceId: `personal-star-beast-identity-explicit-user-binding-authorization:${contractReference.referenceId}`,
      reviewVersion: "V1" as const,
      authorizationScope: "EXPLICIT_USER_BINDING_REVIEW_ONLY" as const,
      contractReference,
      inputContract: Object.freeze({
        acceptedReferenceType:
          "PERSONAL_STAR_BEAST_IDENTITY_PRODUCT_CONSUMPTION_CONTRACT" as const,
        requiredContractStatus:
          "PERSONAL_STAR_BEAST_IDENTITY_PRODUCT_CONSUMPTION_CONTRACT_READY" as const,
        explicitUserConsentRequired: true as const,
        bindingRequestMustBeExplicit: true as const,
        identityReferenceOnly: true as const,
        noAutomaticBinding: true as const,
      }),
      outputContract: Object.freeze({
        outputReferenceType:
          "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_AUTHORIZATION_REVIEW" as const,
        reviewOnly: true as const,
        authorizationStatus: "NOT_AUTHORIZED" as const,
        userBinding: "NOT_PERFORMED" as const,
        userConsent: "NOT_CAPTURED" as const,
        productConsumption: "NOT_PERFORMED" as const,
        futureExplicitAuthorizationRequired: true as const,
        noAutomaticUserBinding: true as const,
      }),
      reviewOnly: true as const,
      referenceOnly: true as const,
      authorizationStatus: "NOT_AUTHORIZED" as const,
      userBinding: "NOT_PERFORMED" as const,
      userConsent: "NOT_CAPTURED" as const,
      productConsumption: "NOT_PERFORMED" as const,
      futureExplicitAuthorizationRequired: true as const,
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
