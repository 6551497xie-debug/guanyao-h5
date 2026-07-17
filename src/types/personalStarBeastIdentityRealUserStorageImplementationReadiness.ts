import type {
  PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumptionAvailable,
  PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumptionResult,
} from "./personalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumption";

export type PersonalStarBeastIdentityRealUserStorageImplementationReadinessInput = Readonly<{
  authorizationConsumptionResult:
    | PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumptionResult
    | null;
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationReadinessUnavailableReason =
  | "AUTHORIZATION_CONSUMPTION_RESULT_REQUIRED"
  | "AUTHORIZATION_CONSUMPTION_RESULT_UNAVAILABLE";

export type PersonalStarBeastIdentityRealUserStorageImplementationReadinessBlockedReason =
  | "AUTHORIZATION_CONSUMPTION_RESULT_BLOCKED"
  | "AUTHORIZATION_CONSUMPTION_BOUNDARY_INVALID"
  | "AUTHORIZATION_CONSUMPTION_REFERENCE_INVALID"
  | "IMPLEMENTATION_SCOPE_INVALID";

export type PersonalStarBeastIdentityRealUserStorageImplementationReadinessBoundary = Readonly<{
  readinessOnly: true;
  referenceOnly: true;
  implementationNotStarted: true;
  authorizationConsumedOnly: true;
  realAuthenticationPerformed: false;
  storageAdapterCreated: false;
  storageReadPerformed: false;
  storageWritePerformed: false;
  productIntegrationPerformed: false;
  noRawUserData: true;
  noUserBinding: true;
  noUIIntegration: true;
  noEngineInvocation: true;
  noRendererInvocation: true;
  noLifeStateMutation: true;
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationScope = Readonly<{
  scope: "REAL_USER_STORAGE_IMPLEMENTATION_REVIEW_ONLY";
  mayDesignAuthenticationAdapter: true;
  mayDesignStorageAdapter: true;
  mayCreateAuthenticationAdapter: false;
  mayCreateStorageAdapter: false;
  mayInvokeAuthentication: false;
  mayReadStorage: false;
  mayWriteStorage: false;
  mayBindRealUser: false;
  mayIntegrateProduct: false;
  mayIntegrateUi: false;
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationReadinessReference = Readonly<{
  referenceType: "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_IMPLEMENTATION_READINESS";
  referenceId: string;
  readinessScope: "FUTURE_REAL_USER_STORAGE_IMPLEMENTATION_REVIEW_ONLY";
  authorizationConsumptionReference: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumptionAvailable["consumption"];
  implementationScope: PersonalStarBeastIdentityRealUserStorageImplementationScope;
  readinessOnly: true;
  referenceOnly: true;
  implementationNotStarted: true;
  authorizationConsumedOnly: true;
  noRawUserData: true;
  noUserBinding: true;
  noUIIntegration: true;
  noEngineInvocation: true;
  noRendererInvocation: true;
  noLifeStateMutation: true;
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationReadinessBoundaryResult =
  PersonalStarBeastIdentityRealUserStorageImplementationReadinessBoundary;

export type PersonalStarBeastIdentityRealUserStorageImplementationReadinessReady = Readonly<{
  status: "READY";
  readiness: "READY_FOR_REAL_USER_STORAGE_IMPLEMENTATION_REVIEW";
  source: "personal_star_beast_identity_real_user_storage_implementation_readiness";
  input: PersonalStarBeastIdentityRealUserStorageImplementationReadinessInput;
  readinessReference: PersonalStarBeastIdentityRealUserStorageImplementationReadinessReference;
  boundary: PersonalStarBeastIdentityRealUserStorageImplementationReadinessBoundary;
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationReadinessNotAuthorized = Readonly<{
  status: "NOT_AUTHORIZED";
  readiness: "NOT_AUTHORIZED";
  source: "personal_star_beast_identity_real_user_storage_implementation_readiness";
  reason: "IMPLEMENTATION_AUTHORIZATION_DECLINED";
  input: PersonalStarBeastIdentityRealUserStorageImplementationReadinessInput;
  readinessReference: null;
  boundary: PersonalStarBeastIdentityRealUserStorageImplementationReadinessBoundary;
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationReadinessUnavailable = Readonly<{
  status: "UNAVAILABLE";
  readiness: "UNAVAILABLE";
  source: "personal_star_beast_identity_real_user_storage_implementation_readiness";
  reason: PersonalStarBeastIdentityRealUserStorageImplementationReadinessUnavailableReason;
  input: PersonalStarBeastIdentityRealUserStorageImplementationReadinessInput;
  readinessReference: null;
  boundary: PersonalStarBeastIdentityRealUserStorageImplementationReadinessBoundary;
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationReadinessBlocked = Readonly<{
  status: "BLOCKED";
  readiness: "BLOCKED";
  source: "personal_star_beast_identity_real_user_storage_implementation_readiness";
  reason: PersonalStarBeastIdentityRealUserStorageImplementationReadinessBlockedReason;
  input: PersonalStarBeastIdentityRealUserStorageImplementationReadinessInput;
  readinessReference: null;
  boundary: PersonalStarBeastIdentityRealUserStorageImplementationReadinessBoundary;
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationReadinessResult =
  | PersonalStarBeastIdentityRealUserStorageImplementationReadinessReady
  | PersonalStarBeastIdentityRealUserStorageImplementationReadinessNotAuthorized
  | PersonalStarBeastIdentityRealUserStorageImplementationReadinessUnavailable
  | PersonalStarBeastIdentityRealUserStorageImplementationReadinessBlocked;

export type PersonalStarBeastIdentityRealUserStorageImplementationReadiness =
  PersonalStarBeastIdentityRealUserStorageImplementationReadinessResult;
