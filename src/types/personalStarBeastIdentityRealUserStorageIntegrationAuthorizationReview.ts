import type {
  PersonalStarBeastIdentityRealUserStorageIntegrationPlanReviewResult,
} from "./personalStarBeastIdentityRealUserStorageIntegrationPlanReview";

export type PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewInput = Readonly<{
  planReviewResult:
    | PersonalStarBeastIdentityRealUserStorageIntegrationPlanReviewResult
    | null;
}>;

export type PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewUnavailableReason =
  | "INTEGRATION_PLAN_REVIEW_REQUIRED"
  | "INTEGRATION_PLAN_REVIEW_UNAVAILABLE";

export type PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewBlockedReason =
  | "INTEGRATION_PLAN_REVIEW_BLOCKED"
  | "INTEGRATION_PLAN_REVIEW_BOUNDARY_INVALID"
  | "INTEGRATION_PLAN_REVIEW_REFERENCE_INVALID";

export type PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewBoundary = Readonly<{
  reviewOnly: true;
  authorizationGranted: false;
  implementationAuthorized: false;
  realAuthenticationPerformed: false;
  storageWritePerformed: false;
  storageReadPerformed: false;
  productIntegrationPerformed: false;
  noAutomaticAuthorization: true;
  noUIIntegration: true;
  noEngineInvocation: true;
  noRendererInvocation: true;
  noLifeStateMutation: true;
}>;

export type PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewInputContract = Readonly<{
  acceptedPlanReviewType: "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_INTEGRATION_PLAN_REVIEW";
  requiredPlanReviewStatus: "READY_FOR_REAL_USER_STORAGE_ADAPTER_INTEGRATION_PLAN";
  requiredPlanOnly: true;
  requiredImplementationUnauthorized: true;
  explicitAuthorityRequired: true;
  reviewOnly: true;
}>;

export type PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewOutputContract = Readonly<{
  outputReferenceType: "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_INTEGRATION_AUTHORIZATION_REVIEW";
  reviewStatus: "READY_FOR_EXPLICIT_REAL_USER_STORAGE_ADAPTER_IMPLEMENTATION_AUTHORITY";
  authorizationStatus: "AWAITING_EXPLICIT_IMPLEMENTATION_AUTHORITY";
  authorizationGranted: false;
  implementationAuthorized: false;
  realAuthentication: "NOT_AUTHORIZED";
  storageAdapter: "NOT_AUTHORIZED";
  productIntegration: "NOT_AUTHORIZED";
  explicitAuthorityRequired: true;
  futureExplicitAuthorityCommandRequired: true;
  noAutomaticAuthorization: true;
}>;

export type PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewReference = Readonly<{
  referenceType: "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_INTEGRATION_AUTHORIZATION_REVIEW";
  referenceId: string;
  reviewVersion: "V1";
  planReviewReference: NonNullable<
    PersonalStarBeastIdentityRealUserStorageIntegrationPlanReviewResult["reviewReference"]
  >;
  inputContract: PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewInputContract;
  outputContract: PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewOutputContract;
  reviewOnly: true;
  authorizationStatus: "AWAITING_EXPLICIT_IMPLEMENTATION_AUTHORITY";
  authorizationGranted: false;
  implementationAuthorized: false;
  realAuthentication: "NOT_AUTHORIZED";
  storageAdapter: "NOT_AUTHORIZED";
  productIntegration: "NOT_AUTHORIZED";
  explicitAuthorityRequired: true;
  futureExplicitAuthorityCommandRequired: true;
  noAutomaticAuthorization: true;
  noUIIntegration: true;
  noEngineInvocation: true;
  noRendererInvocation: true;
  noLifeStateMutation: true;
}>;

export type PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewReady = Readonly<{
  status: "READY";
  reviewStatus: "READY_FOR_EXPLICIT_REAL_USER_STORAGE_ADAPTER_IMPLEMENTATION_AUTHORITY";
  source: "personal_star_beast_identity_real_user_storage_integration_authorization_review";
  input: PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewInput;
  reviewReference: PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewReference;
  boundary: PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewBoundary;
}>;

export type PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewUnavailable = Readonly<{
  status: "UNAVAILABLE";
  reviewStatus: "UNAVAILABLE";
  source: "personal_star_beast_identity_real_user_storage_integration_authorization_review";
  reason: PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewUnavailableReason;
  input: PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewInput;
  reviewReference: null;
  boundary: PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewBoundary;
}>;

export type PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewBlocked = Readonly<{
  status: "BLOCKED";
  reviewStatus: "BLOCKED";
  source: "personal_star_beast_identity_real_user_storage_integration_authorization_review";
  reason: PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewBlockedReason;
  input: PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewInput;
  reviewReference: null;
  boundary: PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewBoundary;
}>;

export type PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewResult =
  | PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewReady
  | PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewUnavailable
  | PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewBlocked;
