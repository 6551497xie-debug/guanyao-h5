import type {
  PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandReference,
  PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandResult,
} from "./personalStarBeastIdentityRealUserStorageImplementationAuthorityCommand";

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionInput = Readonly<{
  commandResult:
    | PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandResult
    | null;
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionUnavailableReason =
  | "COMMAND_RESULT_REQUIRED"
  | "COMMAND_RESULT_UNAVAILABLE";

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionBlockedReason =
  | "COMMAND_RESULT_BLOCKED"
  | "COMMAND_BOUNDARY_INVALID"
  | "COMMAND_REFERENCE_INVALID"
  | "COMMAND_SCOPE_INVALID";

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionBoundary = Readonly<{
  resolutionOnly: true;
  referenceOnly: true;
  authorizationDecisionPending: true;
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

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionReference = Readonly<{
  referenceType: "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORITY_RESOLUTION";
  referenceId: string;
  resolutionVersion: "V1";
  commandReference: PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandReference;
  resolutionStatus: "PENDING_EXPLICIT_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION";
  authorizationStatus: "NOT_AUTHORIZED";
  implementationAuthorized: false;
  realAuthentication: "NOT_AUTHORIZED";
  storageAdapter: "NOT_AUTHORIZED";
  productIntegration: "NOT_AUTHORIZED";
  futureAuthorizationDecisionRequired: true;
  resolutionOnly: true;
  referenceOnly: true;
  noAutomaticAuthorization: true;
  noUIIntegration: true;
  noEngineInvocation: true;
  noRendererInvocation: true;
  noLifeStateMutation: true;
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionReady = Readonly<{
  status: "READY";
  resolutionStatus: "READY_FOR_EXPLICIT_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION_DECISION";
  source: "personal_star_beast_identity_real_user_storage_implementation_authority_resolution";
  input: PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionInput;
  resolutionReference: PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionReference;
  boundary: PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionBoundary;
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionUnavailable = Readonly<{
  status: "UNAVAILABLE";
  resolutionStatus: "UNAVAILABLE";
  source: "personal_star_beast_identity_real_user_storage_implementation_authority_resolution";
  reason: PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionUnavailableReason;
  input: PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionInput;
  resolutionReference: null;
  boundary: PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionBoundary;
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionBlocked = Readonly<{
  status: "BLOCKED";
  resolutionStatus: "BLOCKED";
  source: "personal_star_beast_identity_real_user_storage_implementation_authority_resolution";
  reason: PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionBlockedReason;
  input: PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionInput;
  resolutionReference: null;
  boundary: PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionBoundary;
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionResult =
  | PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionReady
  | PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionUnavailable
  | PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionBlocked;
