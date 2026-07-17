import type {
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandReference,
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandResult,
} from "./personalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommand";

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionInput =
  Readonly<{
    decisionCommandResult: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandResult | null;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionUnavailableReason =
  | "DECISION_COMMAND_RESULT_REQUIRED"
  | "DECISION_COMMAND_RESULT_UNAVAILABLE";

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionBlockedReason =
  | "DECISION_COMMAND_RESULT_BLOCKED"
  | "DECISION_COMMAND_BOUNDARY_INVALID"
  | "DECISION_COMMAND_REFERENCE_INVALID"
  | "DECISION_COMMAND_TYPE_INVALID"
  | "DECISION_SCOPE_INVALID"
  | "IDENTITY_REFERENCE_DRIFT";

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionBoundary =
  Readonly<{
    decisionResolutionOnly: true;
    referenceOnly: true;
    authorizationDecisionResolved: true;
    authorizationGranted: boolean;
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

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionReference =
  Readonly<{
    referenceType: "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION_RESOLUTION";
    referenceId: string;
    resolutionVersion: "V1";
    decisionCommandReference: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandReference;
    decisionOutcome: "GRANTED" | "DECLINED";
    authorizationStatus: "AUTHORIZED" | "NOT_AUTHORIZED";
    userBinding: "NOT_PERFORMED";
    productConsumption: "NOT_PERFORMED";
    authorizationDecisionResolved: true;
    decisionResolutionOnly: true;
    referenceOnly: true;
    futureUserBindingRequired: true;
    noDefaultDecision: true;
    noAutomaticUserBinding: true;
    noUserProfileCreation: true;
    noStorageWrite: true;
    noEngineInvocation: true;
    noRendererInvocation: true;
    noLifeStateMutation: true;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionReady =
  Readonly<{
    status: "READY";
    resolutionStatus: "READY_FOR_EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION_CONSUMPTION";
    source: "personal_star_beast_identity_explicit_user_binding_authorization_decision_resolution";
    input: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionInput;
    resolutionReference: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionReference;
    boundary: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionBoundary;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionUnavailable =
  Readonly<{
    status: "UNAVAILABLE";
    resolutionStatus: "UNAVAILABLE";
    source: "personal_star_beast_identity_explicit_user_binding_authorization_decision_resolution";
    reason: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionUnavailableReason;
    input: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionInput;
    resolutionReference: null;
    boundary: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionBoundary;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionBlocked =
  Readonly<{
    status: "BLOCKED";
    resolutionStatus: "BLOCKED";
    source: "personal_star_beast_identity_explicit_user_binding_authorization_decision_resolution";
    reason: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionBlockedReason;
    input: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionInput;
    resolutionReference: null;
    boundary: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionBoundary;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionResult =
  | PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionReady
  | PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionUnavailable
  | PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionBlocked;
