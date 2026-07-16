import type {
  PersonalStarBeastIdentityProductConsumptionContractReference,
  PersonalStarBeastIdentityProductConsumptionContractResult,
} from "./personalStarBeastIdentityProductConsumptionContract";

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewInput =
  Readonly<{
    productConsumptionContractResult: PersonalStarBeastIdentityProductConsumptionContractResult | null;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewUnavailableReason =
  | "PRODUCT_CONSUMPTION_CONTRACT_REQUIRED"
  | "PRODUCT_CONSUMPTION_CONTRACT_UNAVAILABLE";

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewBlockedReason =
  | "PRODUCT_CONSUMPTION_CONTRACT_BLOCKED"
  | "CONTRACT_BOUNDARY_INVALID"
  | "CONTRACT_REFERENCE_INVALID"
  | "EXPLICIT_BINDING_SCOPE_INVALID"
  | "IDENTITY_REFERENCE_DRIFT";

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewBoundary =
  Readonly<{
    reviewOnly: true;
    referenceOnly: true;
    authorizationReviewOnly: true;
    authorizationGranted: false;
    userBindingPerformed: false;
    userConsentCaptured: false;
    productConsumptionPerformed: false;
    noAutomaticUserBinding: true;
    noUserProfileCreation: true;
    noStorageWrite: true;
    noEngineInvocation: true;
    noRendererInvocation: true;
    noLifeStateMutation: true;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationInputContract =
  Readonly<{
    acceptedReferenceType: "PERSONAL_STAR_BEAST_IDENTITY_PRODUCT_CONSUMPTION_CONTRACT";
    requiredContractStatus: "PERSONAL_STAR_BEAST_IDENTITY_PRODUCT_CONSUMPTION_CONTRACT_READY";
    explicitUserConsentRequired: true;
    bindingRequestMustBeExplicit: true;
    identityReferenceOnly: true;
    noAutomaticBinding: true;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationOutputContract =
  Readonly<{
    outputReferenceType: "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_AUTHORIZATION_REVIEW";
    reviewOnly: true;
    authorizationStatus: "NOT_AUTHORIZED";
    userBinding: "NOT_PERFORMED";
    userConsent: "NOT_CAPTURED";
    productConsumption: "NOT_PERFORMED";
    futureExplicitAuthorizationRequired: true;
    noAutomaticUserBinding: true;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewReference =
  Readonly<{
    referenceType: "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_AUTHORIZATION_REVIEW";
    referenceId: string;
    reviewVersion: "V1";
    authorizationScope: "EXPLICIT_USER_BINDING_REVIEW_ONLY";
    contractReference: PersonalStarBeastIdentityProductConsumptionContractReference;
    inputContract: PersonalStarBeastIdentityExplicitUserBindingAuthorizationInputContract;
    outputContract: PersonalStarBeastIdentityExplicitUserBindingAuthorizationOutputContract;
    reviewOnly: true;
    referenceOnly: true;
    authorizationStatus: "NOT_AUTHORIZED";
    userBinding: "NOT_PERFORMED";
    userConsent: "NOT_CAPTURED";
    productConsumption: "NOT_PERFORMED";
    futureExplicitAuthorizationRequired: true;
    noAutomaticUserBinding: true;
    noUserProfileCreation: true;
    noStorageWrite: true;
    noEngineInvocation: true;
    noRendererInvocation: true;
    noLifeStateMutation: true;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewReady =
  Readonly<{
    status: "READY";
    reviewStatus: "READY_FOR_EXPLICIT_USER_BINDING_AUTHORIZATION";
    source: "personal_star_beast_identity_explicit_user_binding_authorization_review";
    input: PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewInput;
    reviewReference: PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewReference;
    boundary: PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewBoundary;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewUnavailable =
  Readonly<{
    status: "UNAVAILABLE";
    reviewStatus: "UNAVAILABLE";
    source: "personal_star_beast_identity_explicit_user_binding_authorization_review";
    reason: PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewUnavailableReason;
    input: PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewInput;
    reviewReference: null;
    boundary: PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewBoundary;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewBlocked =
  Readonly<{
    status: "BLOCKED";
    reviewStatus: "BLOCKED";
    source: "personal_star_beast_identity_explicit_user_binding_authorization_review";
    reason: PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewBlockedReason;
    input: PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewInput;
    reviewReference: null;
    boundary: PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewBoundary;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewResult =
  | PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewReady
  | PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewUnavailable
  | PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewBlocked;
