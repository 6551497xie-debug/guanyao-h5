import type {
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewReference,
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewResult,
} from "./personalStarBeastIdentityExplicitUserBindingAuthorizationReview";

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommand =
  Readonly<{
    commandType: "EXPLICIT_USER_BINDING_INTENT";
    commandId: string;
    subjectDecision: "DECLARE_EXPLICIT_USER_BINDING_INTENT";
    confirmationReference: string;
    identityReferenceAccepted: true;
    bindingScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY";
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandInput =
  Readonly<{
    reviewResult: PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewResult | null;
    command: PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommand | null;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandUnavailableReason =
  | "AUTHORIZATION_REVIEW_REQUIRED"
  | "AUTHORIZATION_REVIEW_UNAVAILABLE"
  | "EXPLICIT_COMMAND_REQUIRED";

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandBlockedReason =
  | "AUTHORIZATION_REVIEW_BLOCKED"
  | "REVIEW_BOUNDARY_INVALID"
  | "REVIEW_REFERENCE_INVALID"
  | "COMMAND_TYPE_INVALID"
  | "COMMAND_DECISION_INVALID"
  | "COMMAND_SCOPE_INVALID"
  | "IDENTITY_REFERENCE_DRIFT";

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandBoundary =
  Readonly<{
    commandContractOnly: true;
    referenceOnly: true;
    commandExecutionPerformed: false;
    authorizationGranted: false;
    userBindingPerformed: false;
    productConsumptionPerformed: false;
    noAutomaticUserBinding: true;
    noUserProfileCreation: true;
    noStorageWrite: true;
    noEngineInvocation: true;
    noRendererInvocation: true;
    noLifeStateMutation: true;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandInputContract =
  Readonly<{
    acceptedReviewType: "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_AUTHORIZATION_REVIEW";
    requiredReviewStatus: "READY_FOR_EXPLICIT_USER_BINDING_AUTHORIZATION";
    requiredCommandType: "EXPLICIT_USER_BINDING_INTENT";
    explicitSubjectDecisionRequired: true;
    identityReferenceOnly: true;
    noRawUserIdentityPayload: true;
    noAutomaticBinding: true;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandOutputContract =
  Readonly<{
    outputReferenceType: "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_AUTHORIZATION_COMMAND_REFERENCE";
    commandStatus: "AVAILABLE_FOR_AUTHORIZATION_RESOLUTION";
    subjectIntent: "DECLARED";
    authorizationStatus: "NOT_AUTHORIZED";
    userBinding: "NOT_PERFORMED";
    productConsumption: "NOT_PERFORMED";
    futureAuthorizationResolutionRequired: true;
    noAutomaticUserBinding: true;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandReference =
  Readonly<{
    referenceType: "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_AUTHORIZATION_COMMAND_REFERENCE";
    referenceId: string;
    commandVersion: "V1";
    reviewReference: PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewReference;
    command: PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommand;
    inputContract: PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandInputContract;
    outputContract: PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandOutputContract;
    commandContractOnly: true;
    referenceOnly: true;
    commandStatus: "AVAILABLE_FOR_AUTHORIZATION_RESOLUTION";
    subjectIntent: "DECLARED";
    authorizationStatus: "NOT_AUTHORIZED";
    userBinding: "NOT_PERFORMED";
    productConsumption: "NOT_PERFORMED";
    futureAuthorizationResolutionRequired: true;
    noAutomaticUserBinding: true;
    noUserProfileCreation: true;
    noStorageWrite: true;
    noEngineInvocation: true;
    noRendererInvocation: true;
    noLifeStateMutation: true;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandReady =
  Readonly<{
    status: "READY";
    commandStatus: "READY_FOR_AUTHORIZATION_RESOLUTION";
    source: "personal_star_beast_identity_explicit_user_binding_authorization_command";
    input: PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandInput;
    commandReference: PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandReference;
    boundary: PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandBoundary;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandUnavailable =
  Readonly<{
    status: "UNAVAILABLE";
    commandStatus: "UNAVAILABLE";
    source: "personal_star_beast_identity_explicit_user_binding_authorization_command";
    reason: PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandUnavailableReason;
    input: PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandInput;
    commandReference: null;
    boundary: PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandBoundary;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandBlocked =
  Readonly<{
    status: "BLOCKED";
    commandStatus: "BLOCKED";
    source: "personal_star_beast_identity_explicit_user_binding_authorization_command";
    reason: PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandBlockedReason;
    input: PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandInput;
    commandReference: null;
    boundary: PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandBoundary;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandResult =
  | PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandReady
  | PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandUnavailable
  | PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandBlocked;
