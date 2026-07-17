import type {
  PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionReference,
  PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionResult,
} from "./personalStarBeastIdentityRealUserStorageImplementationAuthorityResolution";

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommand = Readonly<{
  commandType: "EXPLICIT_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION_DECISION";
  commandId: string;
  subjectDecision: "GRANT" | "DECLINE";
  decisionReference: string;
  identityReferenceAccepted: true;
  decisionScope: "REAL_USER_STORAGE_IMPLEMENTATION_ONLY";
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandInput = Readonly<{
  resolutionResult:
    | PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionResult
    | null;
  command: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommand | null;
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandUnavailableReason =
  | "AUTHORITY_RESOLUTION_REQUIRED"
  | "AUTHORITY_RESOLUTION_UNAVAILABLE"
  | "EXPLICIT_DECISION_COMMAND_REQUIRED";

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandBlockedReason =
  | "AUTHORITY_RESOLUTION_BLOCKED"
  | "AUTHORITY_RESOLUTION_BOUNDARY_INVALID"
  | "AUTHORITY_RESOLUTION_REFERENCE_INVALID"
  | "DECISION_COMMAND_TYPE_INVALID"
  | "DECISION_VALUE_INVALID"
  | "DECISION_SCOPE_INVALID"
  | "DECISION_REFERENCE_INVALID";

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandBoundary = Readonly<{
  decisionCommandContractOnly: true;
  referenceOnly: true;
  decisionCommandAccepted: true;
  authorizationDecisionResolved: false;
  authorizationGranted: false;
  implementationAuthorized: false;
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

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandInputContract = Readonly<{
  acceptedResolutionType: "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORITY_RESOLUTION";
  requiredResolutionStatus: "READY_FOR_EXPLICIT_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION_DECISION";
  requiredCommandType: "EXPLICIT_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION_DECISION";
  allowedDecisions: readonly ["GRANT", "DECLINE"];
  explicitDecisionRequired: true;
  decisionReferenceRequired: true;
  decisionScope: "REAL_USER_STORAGE_IMPLEMENTATION_ONLY";
  noRawUserIdentityPayload: true;
  noAutomaticAuthorization: true;
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandOutputContract = Readonly<{
  outputReferenceType: "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION_DECISION_COMMAND_REFERENCE";
  commandStatus: "READY_FOR_AUTHORIZATION_DECISION_RESOLUTION";
  subjectDecision: "GRANT" | "DECLINE";
  authorizationDecisionResolved: false;
  authorizationStatus: "NOT_AUTHORIZED";
  implementationAuthorized: false;
  realAuthentication: "NOT_AUTHORIZED";
  storageAdapter: "NOT_AUTHORIZED";
  productIntegration: "NOT_AUTHORIZED";
  futureDecisionResolutionRequired: true;
  noAutomaticAuthorization: true;
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandReference = Readonly<{
  referenceType: "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION_DECISION_COMMAND_REFERENCE";
  referenceId: string;
  commandVersion: "V1";
  resolutionReference: PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionReference;
  command: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommand;
  inputContract: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandInputContract;
  outputContract: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandOutputContract;
  decisionCommandContractOnly: true;
  referenceOnly: true;
  decisionCommandAccepted: true;
  subjectDecision: "GRANT" | "DECLINE";
  authorizationDecisionResolved: false;
  authorizationStatus: "NOT_AUTHORIZED";
  implementationAuthorized: false;
  realAuthentication: "NOT_AUTHORIZED";
  storageAdapter: "NOT_AUTHORIZED";
  productIntegration: "NOT_AUTHORIZED";
  futureDecisionResolutionRequired: true;
  noDefaultDecision: true;
  noAutomaticAuthorization: true;
  noUIIntegration: true;
  noEngineInvocation: true;
  noRendererInvocation: true;
  noLifeStateMutation: true;
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandReady = Readonly<{
  status: "READY";
  commandStatus: "READY_FOR_AUTHORIZATION_DECISION_RESOLUTION";
  source: "personal_star_beast_identity_real_user_storage_implementation_authorization_decision_command";
  input: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandInput;
  commandReference: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandReference;
  boundary: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandBoundary;
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandUnavailable = Readonly<{
  status: "UNAVAILABLE";
  commandStatus: "UNAVAILABLE";
  source: "personal_star_beast_identity_real_user_storage_implementation_authorization_decision_command";
  reason: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandUnavailableReason;
  input: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandInput;
  commandReference: null;
  boundary: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandBoundary;
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandBlocked = Readonly<{
  status: "BLOCKED";
  commandStatus: "BLOCKED";
  source: "personal_star_beast_identity_real_user_storage_implementation_authorization_decision_command";
  reason: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandBlockedReason;
  input: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandInput;
  commandReference: null;
  boundary: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandBoundary;
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandResult =
  | PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandReady
  | PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandUnavailable
  | PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandBlocked;
