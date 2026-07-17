import type {
  PersonalStarBeastIdentityRealUserStorageImplementationReadinessReady,
  PersonalStarBeastIdentityRealUserStorageImplementationReadinessResult,
} from "./personalStarBeastIdentityRealUserStorageImplementationReadiness";

export type PersonalStarBeastRealUserSystemInterfaceContractInput = Readonly<{
  implementationReadinessResult:
    | PersonalStarBeastIdentityRealUserStorageImplementationReadinessResult
    | null;
}>;

export type PersonalStarBeastRealUserSystemInterfaceContractUnavailableReason =
  | "IMPLEMENTATION_READINESS_RESULT_REQUIRED"
  | "IMPLEMENTATION_READINESS_RESULT_UNAVAILABLE";

export type PersonalStarBeastRealUserSystemInterfaceContractBlockedReason =
  | "IMPLEMENTATION_READINESS_RESULT_BLOCKED"
  | "IMPLEMENTATION_READINESS_BOUNDARY_INVALID"
  | "INTERFACE_BOUNDARY_INVALID";

export type PersonalStarBeastRealUserSystemInterfaceContractBoundary = Readonly<{
  contractOnly: true;
  referenceOnly: true;
  designFreezeOnly: true;
  implementationNotStarted: true;
  authenticationImplemented: false;
  identityBindingImplemented: false;
  storageImplemented: false;
  realAuthenticationPerformed: false;
  realUserBound: false;
  storageReadPerformed: false;
  storageWritePerformed: false;
  lifeIdentityCalculated: false;
  lifeIdentityMutated: false;
  noRawUserData: true;
  noUIIntegration: true;
  noEngineInvocation: true;
  noRendererInvocation: true;
}>;

export type PersonalStarBeastRealUserSystemAuthenticationBoundary = Readonly<{
  boundary: "AUTHENTICATION";
  responsibility: "WHO_THE_USER_IS";
  inputReferenceType: "AUTHENTICATION_REQUEST_REFERENCE";
  outputReferenceType: "AUTHENTICATED_USER_REFERENCE";
  operations: readonly ["AUTHENTICATE", "RESTORE_SESSION", "SIGN_OUT"];
  mayDecideLifeIdentity: false;
  mayCalculateLifeIdentity: false;
  mayReadLifeState: false;
  mayWriteStorage: false;
  mayBindIdentity: false;
}>;

export type PersonalStarBeastRealUserSystemIdentityBindingBoundary = Readonly<{
  boundary: "IDENTITY_BINDING";
  responsibility: "WHICH_LIFE_IDENTITY_BELONGS_TO_USER";
  inputReferenceTypes: readonly [
    "AUTHENTICATED_USER_REFERENCE",
    "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE",
  ];
  outputReferenceType: "IDENTITY_BINDING_REFERENCE";
  operations: readonly ["BIND_IDENTITY", "RESOLVE_BINDING", "UNBIND_IDENTITY"];
  mayCalculateLifeIdentity: false;
  mayRecalculateLifeIdentity: false;
  mayChangeMansionResult: false;
  mayChangeFourSymbolResult: false;
  mayChangeMotherCode: false;
  mayWriteStorage: false;
}>;

export type PersonalStarBeastRealUserSystemStorageRecordKind =
  | "AUTHENTICATED_USER_REFERENCE"
  | "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE"
  | "LIFE_JOURNEY_REFERENCE"
  | "CRYSTAL_REFERENCE"
  | "ARCHIVE_REFERENCE";

export type PersonalStarBeastRealUserSystemStorageBoundary = Readonly<{
  boundary: "STORAGE";
  responsibility: "WHAT_MUST_BE_PERSISTED";
  inputReferenceType: "USER_BOUND_STORAGE_RECORD_REFERENCE";
  outputReferenceType: "USER_BOUND_STORAGE_RECORD_REFERENCE";
  operations: readonly ["SAVE_USER_BOUND_RECORD", "LOAD_USER_BOUND_RECORD", "DELETE_USER_BOUND_RECORD"];
  allowedRecordKinds: readonly PersonalStarBeastRealUserSystemStorageRecordKind[];
  storesReferencesOnly: true;
  mayCalculateLifeIdentity: false;
  mayInvokeLifeEngines: false;
  mayReconstructLifeIdentity: false;
  mayWriteUnboundUserData: false;
}>;

export type PersonalStarBeastRealUserSystemInterfaceContractReference = Readonly<{
  referenceType: "PERSONAL_STAR_BEAST_REAL_USER_SYSTEM_INTERFACE_CONTRACT";
  referenceId: string;
  contractVersion: "V1";
  sourceReadinessReference: PersonalStarBeastIdentityRealUserStorageImplementationReadinessReady["readinessReference"];
  authenticationBoundary: PersonalStarBeastRealUserSystemAuthenticationBoundary;
  identityBindingBoundary: PersonalStarBeastRealUserSystemIdentityBindingBoundary;
  storageBoundary: PersonalStarBeastRealUserSystemStorageBoundary;
  contractOnly: true;
  referenceOnly: true;
  designFreezeOnly: true;
  implementationNotStarted: true;
  noLifeIdentityCalculation: true;
  noStorageCalculation: true;
  noUIIntegration: true;
}>;

export type PersonalStarBeastRealUserSystemInterfaceContractReady = Readonly<{
  status: "READY";
  contractStatus: "REAL_USER_SYSTEM_INTERFACE_CONTRACT_FROZEN";
  source: "personal_star_beast_real_user_system_interface_contract";
  input: PersonalStarBeastRealUserSystemInterfaceContractInput;
  contractReference: PersonalStarBeastRealUserSystemInterfaceContractReference;
  boundary: PersonalStarBeastRealUserSystemInterfaceContractBoundary;
}>;

export type PersonalStarBeastRealUserSystemInterfaceContractNotAuthorized = Readonly<{
  status: "NOT_AUTHORIZED";
  contractStatus: "NOT_AUTHORIZED";
  source: "personal_star_beast_real_user_system_interface_contract";
  reason: "IMPLEMENTATION_AUTHORIZATION_DECLINED";
  input: PersonalStarBeastRealUserSystemInterfaceContractInput;
  contractReference: null;
  boundary: PersonalStarBeastRealUserSystemInterfaceContractBoundary;
}>;

export type PersonalStarBeastRealUserSystemInterfaceContractUnavailable = Readonly<{
  status: "UNAVAILABLE";
  contractStatus: "UNAVAILABLE";
  source: "personal_star_beast_real_user_system_interface_contract";
  reason: PersonalStarBeastRealUserSystemInterfaceContractUnavailableReason;
  input: PersonalStarBeastRealUserSystemInterfaceContractInput;
  contractReference: null;
  boundary: PersonalStarBeastRealUserSystemInterfaceContractBoundary;
}>;

export type PersonalStarBeastRealUserSystemInterfaceContractBlocked = Readonly<{
  status: "BLOCKED";
  contractStatus: "BLOCKED";
  source: "personal_star_beast_real_user_system_interface_contract";
  reason: PersonalStarBeastRealUserSystemInterfaceContractBlockedReason;
  input: PersonalStarBeastRealUserSystemInterfaceContractInput;
  contractReference: null;
  boundary: PersonalStarBeastRealUserSystemInterfaceContractBoundary;
}>;

export type PersonalStarBeastRealUserSystemInterfaceContractResult =
  | PersonalStarBeastRealUserSystemInterfaceContractReady
  | PersonalStarBeastRealUserSystemInterfaceContractNotAuthorized
  | PersonalStarBeastRealUserSystemInterfaceContractUnavailable
  | PersonalStarBeastRealUserSystemInterfaceContractBlocked;

export type PersonalStarBeastRealUserSystemInterfaceContract =
  PersonalStarBeastRealUserSystemInterfaceContractResult;
