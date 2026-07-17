import type {
  PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionResult,
  PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionReady,
  PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionUnavailable,
} from "./personalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolution";

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumptionInput = Readonly<{
  decisionResolutionResult:
    | PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionResult
    | null;
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumption = Readonly<{
  semanticRole: "REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION_CONSUMPTION";
  authorizationDecisionResolutionReference: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionReady["resolutionReference"];
  sourceDecisionResolutionResult: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionReady;
  decisionOutcome: "GRANTED";
  authorizationStatus: "AUTHORIZED";
  implementationAuthorized: true;
  consumptionStatus: "AVAILABLE_FOR_FUTURE_REAL_USER_STORAGE_IMPLEMENTATION";
  authorizationConsumedOnly: true;
  implementationDeferred: true;
  realAuthenticationDeferred: true;
  storageWriteDeferred: true;
  productIntegrationDeferred: true;
  noUIIntegration: true;
  noEngineInvocation: true;
  noRendererInvocation: true;
  noLifeStateMutation: true;
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumptionAvailable = Readonly<{
  status: "AVAILABLE";
  source: "personal_star_beast_identity_real_user_storage_implementation_authorization_consumption";
  input: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumptionInput;
  consumption: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumption;
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumptionNotAuthorized = Readonly<{
  status: "NOT_AUTHORIZED";
  source: "personal_star_beast_identity_real_user_storage_implementation_authorization_consumption";
  reason: "IMPLEMENTATION_AUTHORIZATION_DECLINED";
  input: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumptionInput;
  sourceDecisionResolutionResult: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionReady;
  noAuthorizationConsumption: true;
  noImplementation: true;
  noRealAuthentication: true;
  noStorageWrite: true;
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumptionUnavailableReason =
  | "DECISION_RESOLUTION_RESULT_REQUIRED"
  | "DECISION_RESOLUTION_RESULT_UNAVAILABLE";

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumptionUnavailable = Readonly<{
  status: "UNAVAILABLE";
  source: "personal_star_beast_identity_real_user_storage_implementation_authorization_consumption";
  reason: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumptionUnavailableReason;
  input: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumptionInput;
  sourceDecisionResolutionResult: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionUnavailable | null;
  noAuthorizationConsumption: true;
  noImplementation: true;
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumptionBlockedReason =
  | "DECISION_RESOLUTION_RESULT_BLOCKED"
  | "DECISION_RESOLUTION_BOUNDARY_INVALID"
  | "DECISION_RESOLUTION_REFERENCE_INVALID";

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumptionBlocked = Readonly<{
  status: "BLOCKED";
  source: "personal_star_beast_identity_real_user_storage_implementation_authorization_consumption";
  reason: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumptionBlockedReason;
  input: PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumptionInput;
  sourceDecisionResolutionResult: null;
  noAuthorizationConsumption: true;
  noImplementation: true;
}>;

export type PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumptionResult =
  | PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumptionAvailable
  | PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumptionNotAuthorized
  | PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumptionUnavailable
  | PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumptionBlocked;
