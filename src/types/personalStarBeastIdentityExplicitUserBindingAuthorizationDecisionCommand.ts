import type {
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractReference,
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractResult,
} from "./personalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContract";

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommand =
  Readonly<{
    commandType: "EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION";
    commandId: string;
    subjectDecision: "GRANT" | "DECLINE";
    decisionReference: string;
    identityReferenceAccepted: true;
    decisionScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY";
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandInput =
  Readonly<{
    decisionContractResult: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractResult | null;
    command: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommand | null;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandUnavailableReason =
  | "DECISION_CONTRACT_REQUIRED"
  | "DECISION_CONTRACT_UNAVAILABLE"
  | "EXPLICIT_DECISION_COMMAND_REQUIRED";

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandBlockedReason =
  | "DECISION_CONTRACT_BLOCKED"
  | "DECISION_CONTRACT_BOUNDARY_INVALID"
  | "DECISION_CONTRACT_REFERENCE_INVALID"
  | "DECISION_COMMAND_TYPE_INVALID"
  | "DECISION_VALUE_INVALID"
  | "DECISION_SCOPE_INVALID"
  | "DECISION_REFERENCE_INVALID"
  | "IDENTITY_REFERENCE_DRIFT";

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandBoundary =
  Readonly<{
    decisionCommandContractOnly: true;
    referenceOnly: true;
    decisionCommandAccepted: true;
    authorizationDecisionResolved: false;
    authorizationGranted: false;
    userBindingPerformed: false;
    productConsumptionPerformed: false;
    noDefaultDecision: true;
    noAutomaticUserBinding: true;
    noUserProfileCreation: true;
    noStorageWrite: true;
    noEngineInvocation: true;
    noRendererInvocation: true;
    noLifeStateMutation: true;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandInputContract =
  Readonly<{
    acceptedDecisionContractType: "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION_CONTRACT";
    requiredDecisionContractStatus: "READY_FOR_EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION";
    requiredCommandType: "EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION";
    allowedDecisions: readonly ["GRANT", "DECLINE"];
    explicitDecisionRequired: true;
    decisionReferenceRequired: true;
    identityReferenceOnly: true;
    noRawUserIdentityPayload: true;
    noAutomaticAuthorization: true;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandOutputContract =
  Readonly<{
    outputReferenceType: "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION_COMMAND_REFERENCE";
    commandStatus: "READY_FOR_AUTHORIZATION_DECISION_RESOLUTION";
    subjectDecision: "GRANT" | "DECLINE";
    authorizationDecisionResolved: false;
    authorizationStatus: "NOT_AUTHORIZED";
    userBinding: "NOT_PERFORMED";
    productConsumption: "NOT_PERFORMED";
    futureAuthorizationResolutionRequired: true;
    noAutomaticAuthorization: true;
    noAutomaticUserBinding: true;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandReference =
  Readonly<{
    referenceType: "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION_COMMAND_REFERENCE";
    referenceId: string;
    commandVersion: "V1";
    decisionContractReference: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractReference;
    command: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommand;
    inputContract: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandInputContract;
    outputContract: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandOutputContract;
    decisionCommandContractOnly: true;
    referenceOnly: true;
    decisionCommandAccepted: true;
    subjectDecision: "GRANT" | "DECLINE";
    authorizationDecisionResolved: false;
    authorizationStatus: "NOT_AUTHORIZED";
    userBinding: "NOT_PERFORMED";
    productConsumption: "NOT_PERFORMED";
    futureAuthorizationResolutionRequired: true;
    noDefaultDecision: true;
    noAutomaticAuthorization: true;
    noAutomaticUserBinding: true;
    noUserProfileCreation: true;
    noStorageWrite: true;
    noEngineInvocation: true;
    noRendererInvocation: true;
    noLifeStateMutation: true;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandReady =
  Readonly<{
    status: "READY";
    commandStatus: "READY_FOR_AUTHORIZATION_DECISION_RESOLUTION";
    source: "personal_star_beast_identity_explicit_user_binding_authorization_decision_command";
    input: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandInput;
    commandReference: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandReference;
    boundary: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandBoundary;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandUnavailable =
  Readonly<{
    status: "UNAVAILABLE";
    commandStatus: "UNAVAILABLE";
    source: "personal_star_beast_identity_explicit_user_binding_authorization_decision_command";
    reason: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandUnavailableReason;
    input: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandInput;
    commandReference: null;
    boundary: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandBoundary;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandBlocked =
  Readonly<{
    status: "BLOCKED";
    commandStatus: "BLOCKED";
    source: "personal_star_beast_identity_explicit_user_binding_authorization_decision_command";
    reason: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandBlockedReason;
    input: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandInput;
    commandReference: null;
    boundary: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandBoundary;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandResult =
  | PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandReady
  | PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandUnavailable
  | PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandBlocked;
