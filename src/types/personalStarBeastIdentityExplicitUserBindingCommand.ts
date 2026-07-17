import type {
  PersonalStarBeastIdentityExplicitUserBindingEligibilityReference,
  PersonalStarBeastIdentityExplicitUserBindingEligibilityResult,
} from "./personalStarBeastIdentityExplicitUserBindingEligibility";

export type PersonalStarBeastIdentityExplicitUserBindingCommand = Readonly<{
  commandType: "EXPLICIT_PERSONAL_STAR_BEAST_IDENTITY_BINDING";
  commandId: string;
  subjectIntent: "EXECUTE_EXPLICIT_USER_BINDING";
  executionReference: string;
  identityReferenceAccepted: true;
  bindingScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY";
}>;

export type PersonalStarBeastIdentityExplicitUserBindingCommandInput = Readonly<{
  eligibilityResult: PersonalStarBeastIdentityExplicitUserBindingEligibilityResult | null;
  command: PersonalStarBeastIdentityExplicitUserBindingCommand | null;
}>;

export type PersonalStarBeastIdentityExplicitUserBindingCommandUnavailableReason =
  | "ELIGIBILITY_RESULT_REQUIRED"
  | "ELIGIBILITY_RESULT_UNAVAILABLE"
  | "BINDING_NOT_ELIGIBLE"
  | "EXPLICIT_BINDING_COMMAND_REQUIRED";

export type PersonalStarBeastIdentityExplicitUserBindingCommandBlockedReason =
  | "ELIGIBILITY_RESULT_BLOCKED"
  | "ELIGIBILITY_BOUNDARY_INVALID"
  | "ELIGIBILITY_REFERENCE_INVALID"
  | "COMMAND_TYPE_INVALID"
  | "COMMAND_SCOPE_INVALID"
  | "COMMAND_REFERENCE_INVALID"
  | "IDENTITY_REFERENCE_DRIFT";

export type PersonalStarBeastIdentityExplicitUserBindingCommandBoundary = Readonly<{
  commandOnly: true;
  referenceOnly: true;
  bindingExecutionPerformed: false;
  userBindingPerformed: false;
  productConsumptionPerformed: false;
  noAutomaticUserBinding: true;
  noUserProfileCreation: true;
  noStorageWrite: true;
  noEngineInvocation: true;
  noRendererInvocation: true;
  noLifeStateMutation: true;
}>;

export type PersonalStarBeastIdentityExplicitUserBindingCommandInputContract = Readonly<{
  acceptedEligibilityType: "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_ELIGIBILITY_REFERENCE";
  requiredEligibilityStatus: "READY_FOR_EXPLICIT_USER_BINDING_ELIGIBILITY";
  requiredEligibility: "ELIGIBLE";
  requiredCommandType: "EXPLICIT_PERSONAL_STAR_BEAST_IDENTITY_BINDING";
  bindingScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY";
  explicitCommandRequired: true;
  noRawUserIdentityPayload: true;
  noAutomaticBinding: true;
}>;

export type PersonalStarBeastIdentityExplicitUserBindingCommandOutputContract = Readonly<{
  outputReferenceType: "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_COMMAND_REFERENCE";
  commandStatus: "READY_FOR_EXPLICIT_USER_BINDING_EXECUTION";
  bindingScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY";
  bindingExecutionDeferred: true;
  userBinding: "NOT_PERFORMED";
  productConsumption: "NOT_PERFORMED";
  futureBindingExecutionRequired: true;
  noAutomaticUserBinding: true;
}>;

export type PersonalStarBeastIdentityExplicitUserBindingCommandReference = Readonly<{
  referenceType: "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_COMMAND_REFERENCE";
  referenceId: string;
  commandVersion: "V1";
  eligibilityReference: PersonalStarBeastIdentityExplicitUserBindingEligibilityReference;
  command: PersonalStarBeastIdentityExplicitUserBindingCommand;
  inputContract: PersonalStarBeastIdentityExplicitUserBindingCommandInputContract;
  outputContract: PersonalStarBeastIdentityExplicitUserBindingCommandOutputContract;
  commandOnly: true;
  referenceOnly: true;
  bindingExecutionDeferred: true;
  userBinding: "NOT_PERFORMED";
  productConsumption: "NOT_PERFORMED";
  futureBindingExecutionRequired: true;
  noAutomaticUserBinding: true;
  noUserProfileCreation: true;
  noStorageWrite: true;
  noEngineInvocation: true;
  noRendererInvocation: true;
  noLifeStateMutation: true;
}>;

export type PersonalStarBeastIdentityExplicitUserBindingCommandReady = Readonly<{
  status: "READY";
  commandStatus: "READY_FOR_EXPLICIT_USER_BINDING_EXECUTION";
  source: "personal_star_beast_identity_explicit_user_binding_command";
  input: PersonalStarBeastIdentityExplicitUserBindingCommandInput;
  commandReference: PersonalStarBeastIdentityExplicitUserBindingCommandReference;
  boundary: PersonalStarBeastIdentityExplicitUserBindingCommandBoundary;
}>;

export type PersonalStarBeastIdentityExplicitUserBindingCommandUnavailable = Readonly<{
  status: "UNAVAILABLE";
  commandStatus: "UNAVAILABLE";
  source: "personal_star_beast_identity_explicit_user_binding_command";
  reason: PersonalStarBeastIdentityExplicitUserBindingCommandUnavailableReason;
  input: PersonalStarBeastIdentityExplicitUserBindingCommandInput;
  commandReference: null;
  boundary: PersonalStarBeastIdentityExplicitUserBindingCommandBoundary;
}>;

export type PersonalStarBeastIdentityExplicitUserBindingCommandBlocked = Readonly<{
  status: "BLOCKED";
  commandStatus: "BLOCKED";
  source: "personal_star_beast_identity_explicit_user_binding_command";
  reason: PersonalStarBeastIdentityExplicitUserBindingCommandBlockedReason;
  input: PersonalStarBeastIdentityExplicitUserBindingCommandInput;
  commandReference: null;
  boundary: PersonalStarBeastIdentityExplicitUserBindingCommandBoundary;
}>;

export type PersonalStarBeastIdentityExplicitUserBindingCommandResult =
  | PersonalStarBeastIdentityExplicitUserBindingCommandReady
  | PersonalStarBeastIdentityExplicitUserBindingCommandUnavailable
  | PersonalStarBeastIdentityExplicitUserBindingCommandBlocked;
