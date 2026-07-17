import type {
  PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewReference,
  PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewResult,
} from "./personalStarBeastIdentityRealUserStorageIntegrationAuthorizationReview";

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommand = Readonly<{
  commandType: "EXPLICIT_REAL_USER_STORAGE_ADAPTER_IMPLEMENTATION_AUTHORITY_COMMAND";
  commandId: string;
  subjectDecision: "AUTHORIZE_REAL_USER_STORAGE_ADAPTER_IMPLEMENTATION";
  authorityReference: string;
  identityReferenceAccepted: true;
  implementationScope: "REAL_AUTHENTICATION_AND_STORAGE_ADAPTER_IMPLEMENTATION_ONLY";
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandInput = Readonly<{
  authorizationReviewResult:
    | PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewResult
    | null;
  command: PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommand | null;
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandUnavailableReason =
  | "AUTHORIZATION_REVIEW_REQUIRED"
  | "AUTHORIZATION_REVIEW_UNAVAILABLE"
  | "EXPLICIT_AUTHORITY_COMMAND_REQUIRED";

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandBlockedReason =
  | "AUTHORIZATION_REVIEW_BLOCKED"
  | "REVIEW_BOUNDARY_INVALID"
  | "REVIEW_REFERENCE_INVALID"
  | "COMMAND_TYPE_INVALID"
  | "COMMAND_DECISION_INVALID"
  | "COMMAND_SCOPE_INVALID";

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandBoundary = Readonly<{
  commandContractOnly: true;
  referenceOnly: true;
  commandExecutionPerformed: false;
  authorizationGranted: false;
  implementationAuthorized: false;
  realAuthenticationPerformed: false;
  storageWritePerformed: false;
  storageReadPerformed: false;
  productIntegrationPerformed: false;
  noAutomaticAuthorization: true;
  noUIIntegration: true;
  noEngineInvocation: true;
  noRendererInvocation: true;
  noLifeStateMutation: true;
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandInputContract = Readonly<{
  acceptedReviewType: "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_INTEGRATION_AUTHORIZATION_REVIEW";
  requiredReviewStatus: "READY_FOR_EXPLICIT_REAL_USER_STORAGE_ADAPTER_IMPLEMENTATION_AUTHORITY";
  requiredCommandType: "EXPLICIT_REAL_USER_STORAGE_ADAPTER_IMPLEMENTATION_AUTHORITY_COMMAND";
  explicitSubjectDecisionRequired: true;
  implementationScope: "REAL_AUTHENTICATION_AND_STORAGE_ADAPTER_IMPLEMENTATION_ONLY";
  noRawUserIdentityPayload: true;
  noAutomaticAuthorization: true;
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandOutputContract = Readonly<{
  outputReferenceType: "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORITY_COMMAND_REFERENCE";
  commandStatus: "AVAILABLE_FOR_AUTHORIZATION_RESOLUTION";
  subjectIntent: "DECLARED";
  authorizationStatus: "NOT_AUTHORIZED";
  implementationAuthorized: false;
  realAuthentication: "NOT_AUTHORIZED";
  storageAdapter: "NOT_AUTHORIZED";
  productIntegration: "NOT_AUTHORIZED";
  futureAuthorizationResolutionRequired: true;
  noAutomaticAuthorization: true;
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandReference = Readonly<{
  referenceType: "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORITY_COMMAND_REFERENCE";
  referenceId: string;
  commandVersion: "V1";
  authorizationReviewReference: PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewReference;
  command: PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommand;
  inputContract: PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandInputContract;
  outputContract: PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandOutputContract;
  commandContractOnly: true;
  referenceOnly: true;
  commandStatus: "AVAILABLE_FOR_AUTHORIZATION_RESOLUTION";
  subjectIntent: "DECLARED";
  authorizationStatus: "NOT_AUTHORIZED";
  implementationAuthorized: false;
  realAuthentication: "NOT_AUTHORIZED";
  storageAdapter: "NOT_AUTHORIZED";
  productIntegration: "NOT_AUTHORIZED";
  futureAuthorizationResolutionRequired: true;
  noAutomaticAuthorization: true;
  noUIIntegration: true;
  noEngineInvocation: true;
  noRendererInvocation: true;
  noLifeStateMutation: true;
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandReady = Readonly<{
  status: "READY";
  commandStatus: "READY_FOR_AUTHORIZATION_RESOLUTION";
  source: "personal_star_beast_identity_real_user_storage_implementation_authority_command";
  input: PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandInput;
  commandReference: PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandReference;
  boundary: PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandBoundary;
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandUnavailable = Readonly<{
  status: "UNAVAILABLE";
  commandStatus: "UNAVAILABLE";
  source: "personal_star_beast_identity_real_user_storage_implementation_authority_command";
  reason: PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandUnavailableReason;
  input: PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandInput;
  commandReference: null;
  boundary: PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandBoundary;
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandBlocked = Readonly<{
  status: "BLOCKED";
  commandStatus: "BLOCKED";
  source: "personal_star_beast_identity_real_user_storage_implementation_authority_command";
  reason: PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandBlockedReason;
  input: PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandInput;
  commandReference: null;
  boundary: PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandBoundary;
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandResult =
  | PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandReady
  | PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandUnavailable
  | PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandBlocked;
