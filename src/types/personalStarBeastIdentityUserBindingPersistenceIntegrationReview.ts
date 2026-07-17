import type {
  PersonalStarBeastIdentityExplicitUserBindingExecutionBound,
  PersonalStarBeastIdentityExplicitUserBindingExecutionResult,
} from "./personalStarBeastIdentityExplicitUserBindingExecution";

export type PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewInput = Readonly<{
  executionResult: PersonalStarBeastIdentityExplicitUserBindingExecutionResult | null;
}>;

export type PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewUnavailableReason =
  | "BINDING_EXECUTION_RESULT_REQUIRED"
  | "BINDING_EXECUTION_RESULT_UNAVAILABLE";

export type PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewBlockedReason =
  | "BINDING_EXECUTION_RESULT_BLOCKED"
  | "BINDING_EXECUTION_BOUNDARY_INVALID"
  | "BINDING_REFERENCE_INVALID"
  | "IDENTITY_REFERENCE_DRIFT";

export type PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewBoundary = Readonly<{
  reviewOnly: true;
  referenceOnly: true;
  integrationAuthorized: false;
  storageWritePerformed: false;
  realUserBindingPerformed: false;
  productIntegrationPerformed: false;
  noStorageWrite: true;
  noUserProfileCreation: true;
  noUIIntegration: true;
  noEngineInvocation: true;
  noRendererInvocation: true;
  noLifeStateMutation: true;
}>;

export type PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewInputContract = Readonly<{
  acceptedBindingReferenceType: "PERSONAL_STAR_BEAST_IDENTITY_USER_BINDING_REFERENCE";
  requiredExecutionStatus: "EXPLICIT_USER_BINDING_EXECUTED";
  requiredBindingExecutionStatus: "PERFORMED";
  requiredStoragePersistence: "DEFERRED";
  realAuthenticationRequired: true;
  storageAdapterRequired: true;
  reviewOnly: true;
}>;

export type PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewOutputContract = Readonly<{
  outputReferenceType: "PERSONAL_STAR_BEAST_IDENTITY_USER_BINDING_PERSISTENCE_INTEGRATION_REVIEW";
  reviewStatus: "READY_FOR_REAL_USER_STORAGE_BINDING_INTEGRATION_REVIEW";
  integrationAuthorized: false;
  storagePersistence: "DEFERRED";
  realUserBinding: "DOMAIN_REFERENCE_BOUND";
  productIntegration: "NOT_PERFORMED";
  futureIntegrationReviewRequired: true;
  noAutomaticIntegration: true;
}>;

export type PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewReference = Readonly<{
  referenceType: "PERSONAL_STAR_BEAST_IDENTITY_USER_BINDING_PERSISTENCE_INTEGRATION_REVIEW";
  referenceId: string;
  reviewVersion: "V1";
  bindingReference: PersonalStarBeastIdentityExplicitUserBindingExecutionBound["bindingReference"];
  inputContract: PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewInputContract;
  outputContract: PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewOutputContract;
  reviewOnly: true;
  referenceOnly: true;
  integrationAuthorized: false;
  storagePersistence: "DEFERRED";
  realUserBinding: "DOMAIN_REFERENCE_BOUND";
  productIntegration: "NOT_PERFORMED";
  futureIntegrationReviewRequired: true;
  noAutomaticIntegration: true;
  noStorageWrite: true;
  noUserProfileCreation: true;
  noUIIntegration: true;
  noEngineInvocation: true;
  noRendererInvocation: true;
  noLifeStateMutation: true;
}>;

export type PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewReady = Readonly<{
  status: "READY";
  reviewStatus: "READY_FOR_REAL_USER_STORAGE_BINDING_INTEGRATION_REVIEW";
  source: "personal_star_beast_identity_user_binding_persistence_integration_review";
  input: PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewInput;
  reviewReference: PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewReference;
  boundary: PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewBoundary;
}>;

export type PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewUnavailable = Readonly<{
  status: "UNAVAILABLE";
  reviewStatus: "UNAVAILABLE";
  source: "personal_star_beast_identity_user_binding_persistence_integration_review";
  reason: PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewUnavailableReason;
  input: PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewInput;
  reviewReference: null;
  boundary: PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewBoundary;
}>;

export type PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewBlocked = Readonly<{
  status: "BLOCKED";
  reviewStatus: "BLOCKED";
  source: "personal_star_beast_identity_user_binding_persistence_integration_review";
  reason: PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewBlockedReason;
  input: PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewInput;
  reviewReference: null;
  boundary: PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewBoundary;
}>;

export type PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewResult =
  | PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewReady
  | PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewUnavailable
  | PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewBlocked;
