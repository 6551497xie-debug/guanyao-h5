import type {
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandReference,
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandResult,
} from "./personalStarBeastIdentityExplicitUserBindingAuthorizationCommand";

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionInput =
  Readonly<{
    commandResult: PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandResult | null;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionUnavailableReason =
  | "COMMAND_RESULT_REQUIRED"
  | "COMMAND_RESULT_UNAVAILABLE";

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionBlockedReason =
  | "COMMAND_RESULT_BLOCKED"
  | "COMMAND_BOUNDARY_INVALID"
  | "COMMAND_REFERENCE_INVALID"
  | "COMMAND_SCOPE_INVALID"
  | "IDENTITY_REFERENCE_DRIFT";

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionBoundary =
  Readonly<{
    resolutionOnly: true;
    referenceOnly: true;
    authorizationDecisionPending: true;
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

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionReference =
  Readonly<{
    referenceType: "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_AUTHORIZATION_RESOLUTION";
    referenceId: string;
    resolutionVersion: "V1";
    commandReference: PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandReference;
    resolutionStatus: "PENDING_EXPLICIT_USER_BINDING_AUTHORIZATION";
    authorizationStatus: "NOT_AUTHORIZED";
    userBinding: "NOT_PERFORMED";
    productConsumption: "NOT_PERFORMED";
    futureAuthorizationDecisionRequired: true;
    resolutionOnly: true;
    referenceOnly: true;
    noAutomaticUserBinding: true;
    noUserProfileCreation: true;
    noStorageWrite: true;
    noEngineInvocation: true;
    noRendererInvocation: true;
    noLifeStateMutation: true;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionReady =
  Readonly<{
    status: "READY";
    resolutionStatus: "READY_FOR_EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION";
    source: "personal_star_beast_identity_explicit_user_binding_authorization_resolution";
    input: PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionInput;
    resolutionReference: PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionReference;
    boundary: PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionBoundary;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionUnavailable =
  Readonly<{
    status: "UNAVAILABLE";
    resolutionStatus: "UNAVAILABLE";
    source: "personal_star_beast_identity_explicit_user_binding_authorization_resolution";
    reason: PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionUnavailableReason;
    input: PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionInput;
    resolutionReference: null;
    boundary: PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionBoundary;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionBlocked =
  Readonly<{
    status: "BLOCKED";
    resolutionStatus: "BLOCKED";
    source: "personal_star_beast_identity_explicit_user_binding_authorization_resolution";
    reason: PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionBlockedReason;
    input: PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionInput;
    resolutionReference: null;
    boundary: PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionBoundary;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionResult =
  | PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionReady
  | PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionUnavailable
  | PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionBlocked;
