import type {
  PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandReference,
  PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandResult,
} from "./personalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommand";

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionInput = Readonly<{
  decisionCommandResult:
    | PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandResult
    | null;
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionUnavailableReason =
  | "DECISION_COMMAND_RESULT_REQUIRED"
  | "DECISION_COMMAND_RESULT_UNAVAILABLE";

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionBlockedReason =
  | "DECISION_COMMAND_RESULT_BLOCKED"
  | "DECISION_COMMAND_BOUNDARY_INVALID"
  | "DECISION_COMMAND_REFERENCE_INVALID"
  | "DECISION_COMMAND_TYPE_INVALID"
  | "DECISION_SCOPE_INVALID";

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionBoundary = Readonly<{
  decisionResolutionOnly: true;
  referenceOnly: true;
  authorizationDecisionResolved: true;
  authorizationGranted: boolean;
  implementationAuthorized: boolean;
  realAuthenticationPerformed: false;
  storageWritePerformed: false;
  storageReadPerformed: false;
  productIntegrationPerformed: false;
  noDefaultDecision: true;
  noAutomaticAuthorization: true;
  noUIIntegration: true;
  noEngineInvocation: true;
  noRendererInvocation: true;
  noLifeStateMutation: true;
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionReference = Readonly<{
  referenceType: "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION_DECISION_RESOLUTION";
  referenceId: string;
  resolutionVersion: "V1";
  decisionCommandReference: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandReference;
  decisionOutcome: "GRANTED" | "DECLINED";
  authorizationStatus: "AUTHORIZED" | "NOT_AUTHORIZED";
  implementationAuthorized: boolean;
  realAuthentication: "AUTHORIZED_FOR_FUTURE_IMPLEMENTATION" | "NOT_AUTHORIZED";
  storageAdapter: "AUTHORIZED_FOR_FUTURE_IMPLEMENTATION" | "NOT_AUTHORIZED";
  productIntegration: "NOT_AUTHORIZED";
  authorizationDecisionResolved: true;
  decisionResolutionOnly: true;
  referenceOnly: true;
  futureImplementationConsumptionRequired: true;
  noDefaultDecision: true;
  noAutomaticAuthorization: true;
  noUIIntegration: true;
  noEngineInvocation: true;
  noRendererInvocation: true;
  noLifeStateMutation: true;
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionReady = Readonly<{
  status: "READY";
  resolutionStatus: "READY_FOR_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION_CONSUMPTION";
  source: "personal_star_beast_identity_real_user_storage_implementation_authorization_decision_resolution";
  input: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionInput;
  resolutionReference: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionReference;
  boundary: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionBoundary;
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionUnavailable = Readonly<{
  status: "UNAVAILABLE";
  resolutionStatus: "UNAVAILABLE";
  source: "personal_star_beast_identity_real_user_storage_implementation_authorization_decision_resolution";
  reason: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionUnavailableReason;
  input: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionInput;
  resolutionReference: null;
  boundary: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionBoundary;
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionBlocked = Readonly<{
  status: "BLOCKED";
  resolutionStatus: "BLOCKED";
  source: "personal_star_beast_identity_real_user_storage_implementation_authorization_decision_resolution";
  reason: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionBlockedReason;
  input: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionInput;
  resolutionReference: null;
  boundary: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionBoundary;
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionResult =
  | PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionReady
  | PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionUnavailable
  | PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionBlocked;
