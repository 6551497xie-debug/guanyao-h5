import type { PersonalStarBeastIdentityReference } from "./starBeastIdentitySource";
import type {
  PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationReference,
  PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationResult,
} from "./personalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmation";

export type PersonalStarBeastIdentityExplicitUserBindingExecutionInput = Readonly<{
  authorizationConfirmationResult: PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationResult | null;
  userSubjectReference: string | null;
}>;

export type PersonalStarBeastIdentityExplicitUserBindingExecutionUnavailableReason =
  | "AUTHORIZATION_CONFIRMATION_REQUIRED"
  | "AUTHORIZATION_CONFIRMATION_UNAVAILABLE"
  | "USER_SUBJECT_REFERENCE_REQUIRED";

export type PersonalStarBeastIdentityExplicitUserBindingExecutionBlockedReason =
  | "AUTHORIZATION_CONFIRMATION_BLOCKED"
  | "CONFIRMATION_BOUNDARY_INVALID"
  | "CONFIRMATION_REFERENCE_INVALID"
  | "USER_SUBJECT_REFERENCE_INVALID"
  | "IDENTITY_REFERENCE_DRIFT";

export type PersonalStarBeastIdentityExplicitUserBindingExecutionBoundary = Readonly<{
  bindingExecutionOnly: true;
  referenceOnly: true;
  bindingExecutionPerformed: boolean;
  userBindingPerformed: boolean;
  storageWritePerformed: false;
  productConsumptionPerformed: false;
  noUserProfileCreation: true;
  persistenceDeferred: true;
  noEngineInvocation: true;
  noRendererInvocation: true;
  noLifeStateMutation: true;
}>;

export type PersonalStarBeastIdentityExplicitUserBindingExecutionInputContract = Readonly<{
  acceptedConfirmationType: "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_EXECUTION_AUTHORIZATION_CONFIRMATION";
  requiredConfirmationStatus: "READY_FOR_EXPLICIT_USER_BINDING_EXECUTION";
  requiredUserSubjectReference: true;
  bindingScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY";
  opaqueUserReferenceOnly: true;
  noRawUserIdentityPayload: true;
}>;

export type PersonalStarBeastIdentityExplicitUserBindingExecutionOutputContract = Readonly<{
  outputReferenceType: "PERSONAL_STAR_BEAST_IDENTITY_USER_BINDING_REFERENCE";
  executionStatus: "EXPLICIT_USER_BINDING_EXECUTED";
  bindingExecutionStatus: "PERFORMED";
  userBinding: "PERFORMED";
  storagePersistence: "DEFERRED";
  productConsumption: "NOT_PERFORMED";
  noUserProfileCreation: true;
  persistenceDeferred: true;
}>;

export type PersonalStarBeastIdentityExplicitUserBindingReference = Readonly<{
  referenceType: "PERSONAL_STAR_BEAST_IDENTITY_USER_BINDING_REFERENCE";
  referenceId: string;
  bindingVersion: "V1";
  authorizationConfirmationReference: PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmationReference;
  userSubjectReference: string;
  personalStarBeastIdentityReference: PersonalStarBeastIdentityReference;
  inputContract: PersonalStarBeastIdentityExplicitUserBindingExecutionInputContract;
  outputContract: PersonalStarBeastIdentityExplicitUserBindingExecutionOutputContract;
  bindingScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY";
  bindingExecutionOnly: true;
  referenceOnly: true;
  bindingExecutionStatus: "PERFORMED";
  userBinding: "PERFORMED";
  storagePersistence: "DEFERRED";
  productConsumption: "NOT_PERFORMED";
  noUserProfileCreation: true;
  persistenceDeferred: true;
  noEngineInvocation: true;
  noRendererInvocation: true;
  noLifeStateMutation: true;
}>;

export type PersonalStarBeastIdentityExplicitUserBindingExecutionBound = Readonly<{
  status: "BOUND";
  executionStatus: "EXPLICIT_USER_BINDING_EXECUTED";
  source: "personal_star_beast_identity_explicit_user_binding_execution";
  input: PersonalStarBeastIdentityExplicitUserBindingExecutionInput;
  bindingReference: PersonalStarBeastIdentityExplicitUserBindingReference;
  boundary: PersonalStarBeastIdentityExplicitUserBindingExecutionBoundary;
}>;

export type PersonalStarBeastIdentityExplicitUserBindingExecutionUnavailable = Readonly<{
  status: "UNAVAILABLE";
  executionStatus: "UNAVAILABLE";
  source: "personal_star_beast_identity_explicit_user_binding_execution";
  reason: PersonalStarBeastIdentityExplicitUserBindingExecutionUnavailableReason;
  input: PersonalStarBeastIdentityExplicitUserBindingExecutionInput;
  bindingReference: null;
  boundary: PersonalStarBeastIdentityExplicitUserBindingExecutionBoundary;
}>;

export type PersonalStarBeastIdentityExplicitUserBindingExecutionBlocked = Readonly<{
  status: "BLOCKED";
  executionStatus: "BLOCKED";
  source: "personal_star_beast_identity_explicit_user_binding_execution";
  reason: PersonalStarBeastIdentityExplicitUserBindingExecutionBlockedReason;
  input: PersonalStarBeastIdentityExplicitUserBindingExecutionInput;
  bindingReference: null;
  boundary: PersonalStarBeastIdentityExplicitUserBindingExecutionBoundary;
}>;

export type PersonalStarBeastIdentityExplicitUserBindingExecutionResult =
  | PersonalStarBeastIdentityExplicitUserBindingExecutionBound
  | PersonalStarBeastIdentityExplicitUserBindingExecutionUnavailable
  | PersonalStarBeastIdentityExplicitUserBindingExecutionBlocked;
