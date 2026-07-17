import type {
  PersonalStarBeastIdentityExplicitUserBindingCommandReference,
  PersonalStarBeastIdentityExplicitUserBindingCommandResult,
} from "./personalStarBeastIdentityExplicitUserBindingCommand";

export type PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewInput =
  Readonly<{
    commandResult: PersonalStarBeastIdentityExplicitUserBindingCommandResult | null;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewUnavailableReason =
  | "COMMAND_RESULT_REQUIRED"
  | "COMMAND_RESULT_UNAVAILABLE";

export type PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewBlockedReason =
  | "COMMAND_RESULT_BLOCKED"
  | "COMMAND_BOUNDARY_INVALID"
  | "COMMAND_REFERENCE_INVALID"
  | "COMMAND_SCOPE_INVALID"
  | "IDENTITY_REFERENCE_DRIFT";

export type PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewBoundary =
  Readonly<{
    reviewOnly: true;
    referenceOnly: true;
    executionAuthorized: false;
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

export type PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewInputContract =
  Readonly<{
    acceptedCommandType: "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_COMMAND";
    requiredCommandStatus: "READY_FOR_EXPLICIT_USER_BINDING_EXECUTION";
    bindingScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY";
    reviewOnly: true;
    noAutomaticExecution: true;
    noRawUserIdentityPayload: true;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewOutputContract =
  Readonly<{
    outputReferenceType: "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_EXECUTION_AUTHORIZATION_REVIEW";
    reviewStatus: "READY_FOR_EXPLICIT_USER_BINDING_EXECUTION";
    executionAuthorized: false;
    bindingExecutionStatus: "NOT_PERFORMED";
    userBinding: "NOT_PERFORMED";
    productConsumption: "NOT_PERFORMED";
    futureExplicitExecutionRequired: true;
    noAutomaticUserBinding: true;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewReference =
  Readonly<{
    referenceType: "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_EXECUTION_AUTHORIZATION_REVIEW";
    referenceId: string;
    reviewVersion: "V1";
    reviewScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY";
    authorizationStatus: "AUTHORIZED";
    commandReference: PersonalStarBeastIdentityExplicitUserBindingCommandReference;
    inputContract: PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewInputContract;
    outputContract: PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewOutputContract;
    reviewOnly: true;
    referenceOnly: true;
    executionAuthorized: false;
    bindingExecutionStatus: "NOT_PERFORMED";
    userBinding: "NOT_PERFORMED";
    productConsumption: "NOT_PERFORMED";
    futureExplicitExecutionRequired: true;
    noAutomaticUserBinding: true;
    noUserProfileCreation: true;
    noStorageWrite: true;
    noEngineInvocation: true;
    noRendererInvocation: true;
    noLifeStateMutation: true;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewReady =
  Readonly<{
    status: "READY";
    reviewStatus: "READY_FOR_EXPLICIT_USER_BINDING_EXECUTION";
    source: "personal_star_beast_identity_explicit_user_binding_execution_authorization_review";
    input: PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewInput;
    reviewReference: PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewReference;
    boundary: PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewBoundary;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewUnavailable =
  Readonly<{
    status: "UNAVAILABLE";
    reviewStatus: "UNAVAILABLE";
    source: "personal_star_beast_identity_explicit_user_binding_execution_authorization_review";
    reason: PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewUnavailableReason;
    input: PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewInput;
    reviewReference: null;
    boundary: PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewBoundary;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewBlocked =
  Readonly<{
    status: "BLOCKED";
    reviewStatus: "BLOCKED";
    source: "personal_star_beast_identity_explicit_user_binding_execution_authorization_review";
    reason: PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewBlockedReason;
    input: PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewInput;
    reviewReference: null;
    boundary: PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewBoundary;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewResult =
  | PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewReady
  | PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewUnavailable
  | PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewBlocked;
