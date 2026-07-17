import type {
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionBlockedReason,
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionBoundary,
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionInput,
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionResult,
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionUnavailableReason,
} from "../types/personalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolution";

const unavailable = (
  input: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionInput,
  reason: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionUnavailableReason,
): PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    resolutionStatus: "UNAVAILABLE" as const,
    source:
      "personal_star_beast_identity_explicit_user_binding_authorization_decision_resolution" as const,
    reason,
    input,
    resolutionReference: null,
    boundary: Object.freeze({
      decisionResolutionOnly: true as const,
      referenceOnly: true as const,
      authorizationDecisionResolved: true as const,
      authorizationGranted: false,
      userBindingPerformed: false as const,
      productConsumptionPerformed: false as const,
      noDefaultDecision: true as const,
      noAutomaticUserBinding: true as const,
      noUserProfileCreation: true as const,
      noStorageWrite: true as const,
      noEngineInvocation: true as const,
      noRendererInvocation: true as const,
      noLifeStateMutation: true as const,
    }),
  });

const blocked = (
  input: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionInput,
  reason: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionBlockedReason,
): PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    resolutionStatus: "BLOCKED" as const,
    source:
      "personal_star_beast_identity_explicit_user_binding_authorization_decision_resolution" as const,
    reason,
    input,
    resolutionReference: null,
    boundary: Object.freeze({
      decisionResolutionOnly: true as const,
      referenceOnly: true as const,
      authorizationDecisionResolved: true as const,
      authorizationGranted: false,
      userBindingPerformed: false as const,
      productConsumptionPerformed: false as const,
      noDefaultDecision: true as const,
      noAutomaticUserBinding: true as const,
      noUserProfileCreation: true as const,
      noStorageWrite: true as const,
      noEngineInvocation: true as const,
      noRendererInvocation: true as const,
      noLifeStateMutation: true as const,
    }),
  });

export function resolvePersonalStarBeastIdentityExplicitUserBindingAuthorizationDecision(
  input: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionInput,
): PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionResult {
  const decisionCommandResult = input.decisionCommandResult;
  if (decisionCommandResult === null) {
    return unavailable(input, "DECISION_COMMAND_RESULT_REQUIRED");
  }
  if (decisionCommandResult.status === "UNAVAILABLE") {
    return unavailable(input, "DECISION_COMMAND_RESULT_UNAVAILABLE");
  }
  if (decisionCommandResult.status === "BLOCKED") {
    return blocked(input, "DECISION_COMMAND_RESULT_BLOCKED");
  }

  if (
    decisionCommandResult.status !== "READY" ||
    decisionCommandResult.commandStatus !==
      "READY_FOR_AUTHORIZATION_DECISION_RESOLUTION" ||
    decisionCommandResult.source !==
      "personal_star_beast_identity_explicit_user_binding_authorization_decision_command" ||
    decisionCommandResult.boundary.decisionCommandContractOnly !== true ||
    decisionCommandResult.boundary.referenceOnly !== true ||
    decisionCommandResult.boundary.decisionCommandAccepted !== true ||
    decisionCommandResult.boundary.authorizationDecisionResolved !== false ||
    decisionCommandResult.boundary.authorizationGranted !== false ||
    decisionCommandResult.boundary.userBindingPerformed !== false ||
    decisionCommandResult.boundary.productConsumptionPerformed !== false ||
    decisionCommandResult.boundary.noDefaultDecision !== true ||
    decisionCommandResult.boundary.noAutomaticUserBinding !== true ||
    decisionCommandResult.boundary.noUserProfileCreation !== true ||
    decisionCommandResult.boundary.noStorageWrite !== true ||
    decisionCommandResult.boundary.noEngineInvocation !== true ||
    decisionCommandResult.boundary.noRendererInvocation !== true ||
    decisionCommandResult.boundary.noLifeStateMutation !== true
  ) {
    return blocked(input, "DECISION_COMMAND_BOUNDARY_INVALID");
  }

  const commandReference = decisionCommandResult.commandReference;
  if (
    commandReference.referenceType !==
      "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION_COMMAND_REFERENCE" ||
    commandReference.decisionCommandContractOnly !== true ||
    commandReference.referenceOnly !== true ||
    commandReference.decisionCommandAccepted !== true ||
    commandReference.authorizationDecisionResolved !== false ||
    commandReference.authorizationStatus !== "NOT_AUTHORIZED" ||
    commandReference.userBinding !== "NOT_PERFORMED" ||
    commandReference.productConsumption !== "NOT_PERFORMED" ||
    commandReference.futureAuthorizationResolutionRequired !== true ||
    commandReference.noDefaultDecision !== true ||
    commandReference.noAutomaticAuthorization !== true ||
    commandReference.noAutomaticUserBinding !== true
  ) {
    return blocked(input, "DECISION_COMMAND_REFERENCE_INVALID");
  }

  const command = commandReference.command;
  if (command.commandType !== "EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION") {
    return blocked(input, "DECISION_COMMAND_TYPE_INVALID");
  }
  if (
    command.identityReferenceAccepted !== true ||
    command.decisionScope !== "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY"
  ) {
    return blocked(input, "DECISION_SCOPE_INVALID");
  }
  if (
    commandReference.decisionContractReference.inputContract.allowedDecisions.join(",") !==
    "GRANT,DECLINE"
  ) {
    return blocked(input, "DECISION_SCOPE_INVALID");
  }

  const decisionOutcome =
    command.subjectDecision === "GRANT" ? "GRANTED" : command.subjectDecision === "DECLINE" ? "DECLINED" : null;
  if (decisionOutcome === null) {
    return blocked(input, "DECISION_COMMAND_TYPE_INVALID");
  }
  const authorizationGranted = decisionOutcome === "GRANTED";

  if (
    commandReference.decisionContractReference.resolutionReference.commandReference.reviewReference.contractReference.readinessReference.identityReference !==
    commandReference.decisionContractReference.resolutionReference.commandReference.reviewReference.contractReference.readinessReference.identitySourceReference.personalStarBeastReference
  ) {
    return blocked(input, "IDENTITY_REFERENCE_DRIFT");
  }

  const boundary: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionBoundary =
    Object.freeze({
      decisionResolutionOnly: true,
      referenceOnly: true,
      authorizationDecisionResolved: true,
      authorizationGranted,
      userBindingPerformed: false,
      productConsumptionPerformed: false,
      noDefaultDecision: true,
      noAutomaticUserBinding: true,
      noUserProfileCreation: true,
      noStorageWrite: true,
      noEngineInvocation: true,
      noRendererInvocation: true,
      noLifeStateMutation: true,
    });

  return Object.freeze({
    status: "READY" as const,
    resolutionStatus:
      "READY_FOR_EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION_CONSUMPTION" as const,
    source:
      "personal_star_beast_identity_explicit_user_binding_authorization_decision_resolution" as const,
    input,
    resolutionReference: Object.freeze({
      referenceType:
        "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION_RESOLUTION" as const,
      referenceId: `personal-star-beast-identity-explicit-user-binding-decision-resolution:${commandReference.referenceId}`,
      resolutionVersion: "V1" as const,
      decisionCommandReference: commandReference,
      decisionOutcome,
      authorizationStatus: authorizationGranted ? "AUTHORIZED" : "NOT_AUTHORIZED",
      userBinding: "NOT_PERFORMED" as const,
      productConsumption: "NOT_PERFORMED" as const,
      authorizationDecisionResolved: true as const,
      decisionResolutionOnly: true as const,
      referenceOnly: true as const,
      futureUserBindingRequired: true as const,
      noDefaultDecision: true as const,
      noAutomaticUserBinding: true as const,
      noUserProfileCreation: true as const,
      noStorageWrite: true as const,
      noEngineInvocation: true as const,
      noRendererInvocation: true as const,
      noLifeStateMutation: true as const,
    }),
    boundary,
  });
}
