import type {
  PersonalStarBeastRealUserSystemAuthenticationBoundary,
  PersonalStarBeastRealUserSystemIdentityBindingBoundary,
  PersonalStarBeastRealUserSystemInterfaceContractBlockedReason,
  PersonalStarBeastRealUserSystemInterfaceContractBoundary,
  PersonalStarBeastRealUserSystemInterfaceContractInput,
  PersonalStarBeastRealUserSystemInterfaceContractResult,
  PersonalStarBeastRealUserSystemInterfaceContractUnavailableReason,
  PersonalStarBeastRealUserSystemStorageBoundary,
} from "../types/personalStarBeastRealUserSystemInterfaceContract";

const CONTRACT_BOUNDARY: PersonalStarBeastRealUserSystemInterfaceContractBoundary = Object.freeze({
  contractOnly: true,
  referenceOnly: true,
  designFreezeOnly: true,
  implementationNotStarted: true,
  authenticationImplemented: false,
  identityBindingImplemented: false,
  storageImplemented: false,
  realAuthenticationPerformed: false,
  realUserBound: false,
  storageReadPerformed: false,
  storageWritePerformed: false,
  lifeIdentityCalculated: false,
  lifeIdentityMutated: false,
  noRawUserData: true,
  noUIIntegration: true,
  noEngineInvocation: true,
  noRendererInvocation: true,
});

const AUTHENTICATION_BOUNDARY: PersonalStarBeastRealUserSystemAuthenticationBoundary = Object.freeze({
  boundary: "AUTHENTICATION",
  responsibility: "WHO_THE_USER_IS",
  inputReferenceType: "AUTHENTICATION_REQUEST_REFERENCE",
  outputReferenceType: "AUTHENTICATED_USER_REFERENCE",
  operations: ["AUTHENTICATE", "RESTORE_SESSION", "SIGN_OUT"] as const,
  mayDecideLifeIdentity: false,
  mayCalculateLifeIdentity: false,
  mayReadLifeState: false,
  mayWriteStorage: false,
  mayBindIdentity: false,
});

const IDENTITY_BINDING_BOUNDARY: PersonalStarBeastRealUserSystemIdentityBindingBoundary = Object.freeze({
  boundary: "IDENTITY_BINDING",
  responsibility: "WHICH_LIFE_IDENTITY_BELONGS_TO_USER",
  inputReferenceTypes: [
    "AUTHENTICATED_USER_REFERENCE",
    "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE",
  ] as const,
  outputReferenceType: "IDENTITY_BINDING_REFERENCE",
  operations: ["BIND_IDENTITY", "RESOLVE_BINDING", "UNBIND_IDENTITY"] as const,
  mayCalculateLifeIdentity: false,
  mayRecalculateLifeIdentity: false,
  mayChangeMansionResult: false,
  mayChangeFourSymbolResult: false,
  mayChangeMotherCode: false,
  mayWriteStorage: false,
});

const STORAGE_BOUNDARY: PersonalStarBeastRealUserSystemStorageBoundary = Object.freeze({
  boundary: "STORAGE",
  responsibility: "WHAT_MUST_BE_PERSISTED",
  inputReferenceType: "USER_BOUND_STORAGE_RECORD_REFERENCE",
  outputReferenceType: "USER_BOUND_STORAGE_RECORD_REFERENCE",
  operations: ["SAVE_USER_BOUND_RECORD", "LOAD_USER_BOUND_RECORD", "DELETE_USER_BOUND_RECORD"] as const,
  allowedRecordKinds: [
    "AUTHENTICATED_USER_REFERENCE",
    "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE",
    "LIFE_JOURNEY_REFERENCE",
    "CRYSTAL_REFERENCE",
    "ARCHIVE_REFERENCE",
  ] as const,
  storesReferencesOnly: true,
  mayCalculateLifeIdentity: false,
  mayInvokeLifeEngines: false,
  mayReconstructLifeIdentity: false,
  mayWriteUnboundUserData: false,
});

const unavailable = (
  input: PersonalStarBeastRealUserSystemInterfaceContractInput,
  reason: PersonalStarBeastRealUserSystemInterfaceContractUnavailableReason,
): PersonalStarBeastRealUserSystemInterfaceContractResult => Object.freeze({
  status: "UNAVAILABLE" as const,
  contractStatus: "UNAVAILABLE" as const,
  source: "personal_star_beast_real_user_system_interface_contract" as const,
  reason,
  input,
  contractReference: null,
  boundary: CONTRACT_BOUNDARY,
});

const blocked = (
  input: PersonalStarBeastRealUserSystemInterfaceContractInput,
  reason: PersonalStarBeastRealUserSystemInterfaceContractBlockedReason,
): PersonalStarBeastRealUserSystemInterfaceContractResult => Object.freeze({
  status: "BLOCKED" as const,
  contractStatus: "BLOCKED" as const,
  source: "personal_star_beast_real_user_system_interface_contract" as const,
  reason,
  input,
  contractReference: null,
  boundary: CONTRACT_BOUNDARY,
});

export function freezePersonalStarBeastRealUserSystemInterfaceContract(
  input: PersonalStarBeastRealUserSystemInterfaceContractInput,
): PersonalStarBeastRealUserSystemInterfaceContractResult {
  const readiness = input.implementationReadinessResult;
  if (readiness === null) {
    return unavailable(input, "IMPLEMENTATION_READINESS_RESULT_REQUIRED");
  }
  if (readiness.status === "UNAVAILABLE") {
    return unavailable(input, "IMPLEMENTATION_READINESS_RESULT_UNAVAILABLE");
  }
  if (readiness.status === "BLOCKED") {
    return blocked(input, "IMPLEMENTATION_READINESS_RESULT_BLOCKED");
  }
  if (readiness.status === "NOT_AUTHORIZED") {
    return Object.freeze({
      status: "NOT_AUTHORIZED" as const,
      contractStatus: "NOT_AUTHORIZED" as const,
      source: "personal_star_beast_real_user_system_interface_contract" as const,
      reason: "IMPLEMENTATION_AUTHORIZATION_DECLINED" as const,
      input,
      contractReference: null,
      boundary: CONTRACT_BOUNDARY,
    });
  }

  if (
    readiness.status !== "READY" ||
    readiness.readiness !== "READY_FOR_REAL_USER_STORAGE_IMPLEMENTATION_REVIEW" ||
    readiness.source !== "personal_star_beast_identity_real_user_storage_implementation_readiness" ||
    readiness.boundary.readinessOnly !== true ||
    readiness.boundary.referenceOnly !== true ||
    readiness.boundary.implementationNotStarted !== true ||
    readiness.boundary.realAuthenticationPerformed !== false ||
    readiness.boundary.storageAdapterCreated !== false ||
    readiness.boundary.storageReadPerformed !== false ||
    readiness.boundary.storageWritePerformed !== false ||
    readiness.boundary.productIntegrationPerformed !== false ||
    readiness.boundary.noUserBinding !== true ||
    readiness.boundary.noUIIntegration !== true ||
    readiness.boundary.noEngineInvocation !== true ||
    readiness.boundary.noRendererInvocation !== true ||
    readiness.boundary.noLifeStateMutation !== true
  ) {
    return blocked(input, "IMPLEMENTATION_READINESS_BOUNDARY_INVALID");
  }

  const readinessReference = readiness.readinessReference;
  if (
    readinessReference.referenceType !==
      "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_IMPLEMENTATION_READINESS" ||
    readinessReference.readinessScope !==
      "FUTURE_REAL_USER_STORAGE_IMPLEMENTATION_REVIEW_ONLY" ||
    readinessReference.readinessOnly !== true ||
    readinessReference.referenceOnly !== true ||
    readinessReference.implementationNotStarted !== true ||
    readinessReference.implementationScope.scope !==
      "REAL_USER_STORAGE_IMPLEMENTATION_REVIEW_ONLY" ||
    readinessReference.implementationScope.mayCreateAuthenticationAdapter !== false ||
    readinessReference.implementationScope.mayCreateStorageAdapter !== false ||
    readinessReference.implementationScope.mayInvokeAuthentication !== false ||
    readinessReference.implementationScope.mayReadStorage !== false ||
    readinessReference.implementationScope.mayWriteStorage !== false ||
    readinessReference.implementationScope.mayBindRealUser !== false ||
    readinessReference.noUserBinding !== true ||
    readinessReference.noUIIntegration !== true ||
    readinessReference.noEngineInvocation !== true ||
    readinessReference.noRendererInvocation !== true ||
    readinessReference.noLifeStateMutation !== true
  ) {
    return blocked(input, "INTERFACE_BOUNDARY_INVALID");
  }

  return Object.freeze({
    status: "READY" as const,
    contractStatus: "REAL_USER_SYSTEM_INTERFACE_CONTRACT_FROZEN" as const,
    source: "personal_star_beast_real_user_system_interface_contract" as const,
    input,
    contractReference: Object.freeze({
      referenceType: "PERSONAL_STAR_BEAST_REAL_USER_SYSTEM_INTERFACE_CONTRACT" as const,
      referenceId: `personal-star-beast-real-user-system-interface-contract:${readinessReference.referenceId}`,
      contractVersion: "V1" as const,
      sourceReadinessReference: readinessReference,
      authenticationBoundary: AUTHENTICATION_BOUNDARY,
      identityBindingBoundary: IDENTITY_BINDING_BOUNDARY,
      storageBoundary: STORAGE_BOUNDARY,
      contractOnly: true as const,
      referenceOnly: true as const,
      designFreezeOnly: true as const,
      implementationNotStarted: true as const,
      noLifeIdentityCalculation: true as const,
      noStorageCalculation: true as const,
      noUIIntegration: true as const,
    }),
    boundary: CONTRACT_BOUNDARY,
  });
}
