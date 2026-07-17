import type {
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionReference,
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionResult,
} from "./personalStarBeastIdentityExplicitUserBindingAuthorizationResolution";

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractInput =
  Readonly<{
    resolutionResult: PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionResult | null;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractUnavailableReason =
  | "RESOLUTION_RESULT_REQUIRED"
  | "RESOLUTION_RESULT_UNAVAILABLE";

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractBlockedReason =
  | "RESOLUTION_RESULT_BLOCKED"
  | "RESOLUTION_BOUNDARY_INVALID"
  | "RESOLUTION_REFERENCE_INVALID"
  | "DECISION_SCOPE_INVALID"
  | "IDENTITY_REFERENCE_DRIFT";

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractBoundary =
  Readonly<{
    decisionContractOnly: true;
    referenceOnly: true;
    decisionCaptured: false;
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

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionInputContract =
  Readonly<{
    acceptedResolutionType: "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_AUTHORIZATION_RESOLUTION";
    requiredResolutionStatus: "PENDING_EXPLICIT_USER_BINDING_AUTHORIZATION";
    decisionScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY";
    allowedDecisions: readonly ["GRANT", "DECLINE"];
    decisionMustBeExplicit: true;
    noDefaultDecision: true;
    noRawUserIdentityPayload: true;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionOutputContract =
  Readonly<{
    outputReferenceType: "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION_CONTRACT";
    decisionStatus: "NOT_DECIDED";
    authorizationStatus: "NOT_AUTHORIZED";
    userBinding: "NOT_PERFORMED";
    productConsumption: "NOT_PERFORMED";
    futureExplicitDecisionRequired: true;
    noDefaultDecision: true;
    noAutomaticUserBinding: true;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractReference =
  Readonly<{
    referenceType: "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION_CONTRACT";
    referenceId: string;
    contractVersion: "V1";
    resolutionReference: PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionReference;
    inputContract: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionInputContract;
    outputContract: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionOutputContract;
    decisionContractOnly: true;
    referenceOnly: true;
    decisionStatus: "NOT_DECIDED";
    authorizationStatus: "NOT_AUTHORIZED";
    userBinding: "NOT_PERFORMED";
    productConsumption: "NOT_PERFORMED";
    futureExplicitDecisionRequired: true;
    noDefaultDecision: true;
    noAutomaticUserBinding: true;
    noUserProfileCreation: true;
    noStorageWrite: true;
    noEngineInvocation: true;
    noRendererInvocation: true;
    noLifeStateMutation: true;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractReady =
  Readonly<{
    status: "READY";
    contractStatus: "READY_FOR_EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION";
    source: "personal_star_beast_identity_explicit_user_binding_authorization_decision_contract";
    input: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractInput;
    contractReference: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractReference;
    boundary: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractBoundary;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractUnavailable =
  Readonly<{
    status: "UNAVAILABLE";
    contractStatus: "UNAVAILABLE";
    source: "personal_star_beast_identity_explicit_user_binding_authorization_decision_contract";
    reason: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractUnavailableReason;
    input: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractInput;
    contractReference: null;
    boundary: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractBoundary;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractBlocked =
  Readonly<{
    status: "BLOCKED";
    contractStatus: "BLOCKED";
    source: "personal_star_beast_identity_explicit_user_binding_authorization_decision_contract";
    reason: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractBlockedReason;
    input: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractInput;
    contractReference: null;
    boundary: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractBoundary;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractResult =
  | PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractReady
  | PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractUnavailable
  | PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractBlocked;
