import type {
  PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewReference,
  PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewResult,
} from "./personalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReview";

export type PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmation =
  Readonly<{
    commandType: "EXPLICIT_USER_BINDING_EXECUTION_AUTHORIZATION_CONFIRMATION";
    commandId: string;
    subjectDecision: "CONFIRM_EXPLICIT_USER_BINDING_EXECUTION_AUTHORIZATION";
    confirmationReference: string;
    identityReferenceAccepted: true;
    bindingScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY";
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationInput =
  Readonly<{
    reviewResult: PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewResult | null;
    confirmation: PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmation | null;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationUnavailableReason =
  | "EXECUTION_AUTHORIZATION_REVIEW_REQUIRED"
  | "EXECUTION_AUTHORIZATION_REVIEW_UNAVAILABLE"
  | "EXPLICIT_EXECUTION_AUTHORIZATION_CONFIRMATION_REQUIRED";

export type PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationBlockedReason =
  | "EXECUTION_AUTHORIZATION_REVIEW_BLOCKED"
  | "REVIEW_BOUNDARY_INVALID"
  | "REVIEW_REFERENCE_INVALID"
  | "CONFIRMATION_TYPE_INVALID"
  | "CONFIRMATION_SCOPE_INVALID"
  | "CONFIRMATION_REFERENCE_INVALID"
  | "IDENTITY_REFERENCE_DRIFT";

export type PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationBoundary =
  Readonly<{
    confirmationOnly: true;
    referenceOnly: true;
    executionAuthorized: true;
    bindingExecutionPerformed: false;
    userBindingPerformed: false;
    productConsumptionPerformed: false;
    noAutomaticUserBinding: true;
    noUserProfileCreation: true;
    noStorageWrite: true;
    noEngineInvocation: true;
    noRendererInvocation: true;
    noLifeStateMutation: true;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationInputContract =
  Readonly<{
    acceptedReviewType: "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_EXECUTION_AUTHORIZATION_REVIEW";
    requiredReviewStatus: "READY_FOR_EXPLICIT_USER_BINDING_EXECUTION";
    confirmationRequired: true;
    bindingScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY";
    noAutomaticExecution: true;
    noRawUserIdentityPayload: true;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationOutputContract =
  Readonly<{
    outputReferenceType: "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_EXECUTION_AUTHORIZATION_CONFIRMATION";
    confirmationStatus: "READY_FOR_EXPLICIT_USER_BINDING_EXECUTION";
    executionAuthorized: true;
    bindingExecutionStatus: "NOT_PERFORMED";
    userBinding: "NOT_PERFORMED";
    productConsumption: "NOT_PERFORMED";
    explicitExecutionStillRequired: true;
    noAutomaticUserBinding: true;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationReference =
  Readonly<{
    referenceType: "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_EXECUTION_AUTHORIZATION_CONFIRMATION";
    referenceId: string;
    confirmationVersion: "V1";
    reviewReference: PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewReference;
    confirmation: PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmation;
    inputContract: PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationInputContract;
    outputContract: PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationOutputContract;
    confirmationOnly: true;
    referenceOnly: true;
    executionAuthorized: true;
    bindingExecutionStatus: "NOT_PERFORMED";
    userBinding: "NOT_PERFORMED";
    productConsumption: "NOT_PERFORMED";
    explicitExecutionStillRequired: true;
    noAutomaticUserBinding: true;
    noUserProfileCreation: true;
    noStorageWrite: true;
    noEngineInvocation: true;
    noRendererInvocation: true;
    noLifeStateMutation: true;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationReady =
  Readonly<{
    status: "READY";
    confirmationStatus: "READY_FOR_EXPLICIT_USER_BINDING_EXECUTION";
    source: "personal_star_beast_identity_explicit_user_binding_execution_authorization_confirmation";
    input: PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationInput;
    confirmationReference: PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationReference;
    boundary: PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationBoundary;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationUnavailable =
  Readonly<{
    status: "UNAVAILABLE";
    confirmationStatus: "UNAVAILABLE";
    source: "personal_star_beast_identity_explicit_user_binding_execution_authorization_confirmation";
    reason: PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationUnavailableReason;
    input: PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationInput;
    confirmationReference: null;
    boundary: PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationBoundary;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationBlocked =
  Readonly<{
    status: "BLOCKED";
    confirmationStatus: "BLOCKED";
    source: "personal_star_beast_identity_explicit_user_binding_execution_authorization_confirmation";
    reason: PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationBlockedReason;
    input: PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationInput;
    confirmationReference: null;
    boundary: PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationBoundary;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationResult =
  | PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationReady
  | PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationUnavailable
  | PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationBlocked;
