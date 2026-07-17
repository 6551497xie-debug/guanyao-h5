import type {
  PersonalStarBeastIdentityExplicitUserBindingCommandBlockedReason,
  PersonalStarBeastIdentityExplicitUserBindingCommandBoundary,
  PersonalStarBeastIdentityExplicitUserBindingCommandInput,
  PersonalStarBeastIdentityExplicitUserBindingCommandResult,
  PersonalStarBeastIdentityExplicitUserBindingCommandUnavailableReason,
} from "../types/personalStarBeastIdentityExplicitUserBindingCommand";

const COMMAND_BOUNDARY: PersonalStarBeastIdentityExplicitUserBindingCommandBoundary = Object.freeze({
  commandOnly: true,
  referenceOnly: true,
  bindingExecutionPerformed: false,
  userBindingPerformed: false,
  productConsumptionPerformed: false,
  noAutomaticUserBinding: true,
  noUserProfileCreation: true,
  noStorageWrite: true,
  noEngineInvocation: true,
  noRendererInvocation: true,
  noLifeStateMutation: true,
});

const unavailable = (
  input: PersonalStarBeastIdentityExplicitUserBindingCommandInput,
  reason: PersonalStarBeastIdentityExplicitUserBindingCommandUnavailableReason,
): PersonalStarBeastIdentityExplicitUserBindingCommandResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    commandStatus: "UNAVAILABLE" as const,
    source: "personal_star_beast_identity_explicit_user_binding_command" as const,
    reason,
    input,
    commandReference: null,
    boundary: COMMAND_BOUNDARY,
  });

const blocked = (
  input: PersonalStarBeastIdentityExplicitUserBindingCommandInput,
  reason: PersonalStarBeastIdentityExplicitUserBindingCommandBlockedReason,
): PersonalStarBeastIdentityExplicitUserBindingCommandResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    commandStatus: "BLOCKED" as const,
    source: "personal_star_beast_identity_explicit_user_binding_command" as const,
    reason,
    input,
    commandReference: null,
    boundary: COMMAND_BOUNDARY,
  });

export function createPersonalStarBeastIdentityExplicitUserBindingCommand(
  input: PersonalStarBeastIdentityExplicitUserBindingCommandInput,
): PersonalStarBeastIdentityExplicitUserBindingCommandResult {
  const eligibilityResult = input.eligibilityResult;
  if (eligibilityResult === null) {
    return unavailable(input, "ELIGIBILITY_RESULT_REQUIRED");
  }
  if (eligibilityResult.status === "UNAVAILABLE") {
    return unavailable(input, "ELIGIBILITY_RESULT_UNAVAILABLE");
  }
  if (eligibilityResult.status === "BLOCKED") {
    return blocked(input, "ELIGIBILITY_RESULT_BLOCKED");
  }

  if (
    eligibilityResult.status !== "READY" ||
    eligibilityResult.eligibilityStatus !==
      "READY_FOR_EXPLICIT_USER_BINDING_ELIGIBILITY" ||
    eligibilityResult.source !==
      "personal_star_beast_identity_explicit_user_binding_eligibility" ||
    eligibilityResult.boundary.eligibilityOnly !== true ||
    eligibilityResult.boundary.referenceOnly !== true ||
    eligibilityResult.boundary.authorizationDecisionConsumed !== true ||
    eligibilityResult.boundary.userBindingPerformed !== false ||
    eligibilityResult.boundary.productConsumptionPerformed !== false ||
    eligibilityResult.boundary.noAutomaticUserBinding !== true ||
    eligibilityResult.boundary.noUserProfileCreation !== true ||
    eligibilityResult.boundary.noStorageWrite !== true ||
    eligibilityResult.boundary.noEngineInvocation !== true ||
    eligibilityResult.boundary.noRendererInvocation !== true ||
    eligibilityResult.boundary.noLifeStateMutation !== true
  ) {
    return blocked(input, "ELIGIBILITY_BOUNDARY_INVALID");
  }

  const eligibilityReference = eligibilityResult.eligibilityReference;
  if (
    eligibilityReference.referenceType !==
      "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_ELIGIBILITY_REFERENCE" ||
    eligibilityReference.eligibilityStatus !==
      "READY_FOR_EXPLICIT_USER_BINDING_ELIGIBILITY" ||
    eligibilityReference.eligibility !== "ELIGIBLE" ||
    eligibilityReference.eligibilityReason !== "AUTHORIZED_DECISION" ||
    eligibilityReference.authorizationStatus !== "AUTHORIZED" ||
    eligibilityReference.userBinding !== "NOT_PERFORMED" ||
    eligibilityReference.productConsumption !== "NOT_PERFORMED" ||
    eligibilityReference.futureExplicitBindingRequired !== true ||
    eligibilityReference.eligibilityOnly !== true ||
    eligibilityReference.referenceOnly !== true ||
    eligibilityReference.noAutomaticUserBinding !== true
  ) {
    if (eligibilityReference.eligibility === "NOT_ELIGIBLE") {
      return unavailable(input, "BINDING_NOT_ELIGIBLE");
    }
    return blocked(input, "ELIGIBILITY_REFERENCE_INVALID");
  }

  if (
    eligibilityReference.decisionResolutionReference.decisionCommandReference.command
      .decisionScope !== "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY" ||
    eligibilityReference.decisionResolutionReference.decisionCommandReference.command
      .identityReferenceAccepted !== true
  ) {
    return blocked(input, "COMMAND_SCOPE_INVALID");
  }

  const command = input.command;
  if (command === null) {
    return unavailable(input, "EXPLICIT_BINDING_COMMAND_REQUIRED");
  }
  if (command.commandType !== "EXPLICIT_PERSONAL_STAR_BEAST_IDENTITY_BINDING") {
    return blocked(input, "COMMAND_TYPE_INVALID");
  }
  if (
    command.subjectIntent !== "EXECUTE_EXPLICIT_USER_BINDING" ||
    command.identityReferenceAccepted !== true ||
    command.bindingScope !== "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY"
  ) {
    return blocked(input, "COMMAND_SCOPE_INVALID");
  }
  if (
    typeof command.commandId !== "string" ||
    command.commandId.length === 0 ||
    typeof command.executionReference !== "string" ||
    command.executionReference.length === 0
  ) {
    return blocked(input, "COMMAND_REFERENCE_INVALID");
  }

  if (
    eligibilityReference.decisionResolutionReference.decisionCommandReference
      .decisionContractReference.resolutionReference.commandReference.reviewReference
      .contractReference.readinessReference.identityReference !==
    eligibilityReference.decisionResolutionReference.decisionCommandReference
      .decisionContractReference.resolutionReference.commandReference.reviewReference
      .contractReference.readinessReference.identitySourceReference.personalStarBeastReference
  ) {
    return blocked(input, "IDENTITY_REFERENCE_DRIFT");
  }

  return Object.freeze({
    status: "READY" as const,
    commandStatus: "READY_FOR_EXPLICIT_USER_BINDING_EXECUTION" as const,
    source: "personal_star_beast_identity_explicit_user_binding_command" as const,
    input,
    commandReference: Object.freeze({
      referenceType:
        "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_COMMAND_REFERENCE" as const,
      referenceId: `personal-star-beast-identity-explicit-binding-command:${command.commandId}`,
      commandVersion: "V1" as const,
      eligibilityReference,
      command,
      inputContract: Object.freeze({
        acceptedEligibilityType:
          "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_ELIGIBILITY_REFERENCE" as const,
        requiredEligibilityStatus:
          "READY_FOR_EXPLICIT_USER_BINDING_ELIGIBILITY" as const,
        requiredEligibility: "ELIGIBLE" as const,
        requiredCommandType:
          "EXPLICIT_PERSONAL_STAR_BEAST_IDENTITY_BINDING" as const,
        bindingScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY" as const,
        explicitCommandRequired: true as const,
        noRawUserIdentityPayload: true as const,
        noAutomaticBinding: true as const,
      }),
      outputContract: Object.freeze({
        outputReferenceType:
          "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_COMMAND_REFERENCE" as const,
        commandStatus: "READY_FOR_EXPLICIT_USER_BINDING_EXECUTION" as const,
        bindingScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY" as const,
        bindingExecutionDeferred: true as const,
        userBinding: "NOT_PERFORMED" as const,
        productConsumption: "NOT_PERFORMED" as const,
        futureBindingExecutionRequired: true as const,
        noAutomaticUserBinding: true as const,
      }),
      commandOnly: true as const,
      referenceOnly: true as const,
      bindingExecutionDeferred: true as const,
      userBinding: "NOT_PERFORMED" as const,
      productConsumption: "NOT_PERFORMED" as const,
      futureBindingExecutionRequired: true as const,
      noAutomaticUserBinding: true as const,
      noUserProfileCreation: true as const,
      noStorageWrite: true as const,
      noEngineInvocation: true as const,
      noRendererInvocation: true as const,
      noLifeStateMutation: true as const,
    }),
    boundary: COMMAND_BOUNDARY,
  });
}
