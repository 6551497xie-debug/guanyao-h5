import type {
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandBlockedReason,
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandBoundary,
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandInput,
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandResult,
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandUnavailableReason,
} from "../types/personalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommand";

const DECISION_COMMAND_BOUNDARY: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandBoundary =
  Object.freeze({
    decisionCommandContractOnly: true,
    referenceOnly: true,
    decisionCommandAccepted: true,
    authorizationDecisionResolved: false,
    authorizationGranted: false,
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

const unavailable = (
  input: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandInput,
  reason: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandUnavailableReason,
): PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    commandStatus: "UNAVAILABLE" as const,
    source:
      "personal_star_beast_identity_explicit_user_binding_authorization_decision_command" as const,
    reason,
    input,
    commandReference: null,
    boundary: DECISION_COMMAND_BOUNDARY,
  });

const blocked = (
  input: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandInput,
  reason: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandBlockedReason,
): PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    commandStatus: "BLOCKED" as const,
    source:
      "personal_star_beast_identity_explicit_user_binding_authorization_decision_command" as const,
    reason,
    input,
    commandReference: null,
    boundary: DECISION_COMMAND_BOUNDARY,
  });

export function createPersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommand(
  input: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandInput,
): PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandResult {
  const decisionContractResult = input.decisionContractResult;
  if (decisionContractResult === null) {
    return unavailable(input, "DECISION_CONTRACT_REQUIRED");
  }
  if (decisionContractResult.status === "UNAVAILABLE") {
    return unavailable(input, "DECISION_CONTRACT_UNAVAILABLE");
  }
  if (decisionContractResult.status === "BLOCKED") {
    return blocked(input, "DECISION_CONTRACT_BLOCKED");
  }

  if (
    decisionContractResult.status !== "READY" ||
    decisionContractResult.contractStatus !==
      "READY_FOR_EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION" ||
    decisionContractResult.source !==
      "personal_star_beast_identity_explicit_user_binding_authorization_decision_contract" ||
    decisionContractResult.boundary.decisionContractOnly !== true ||
    decisionContractResult.boundary.referenceOnly !== true ||
    decisionContractResult.boundary.decisionCaptured !== false ||
    decisionContractResult.boundary.authorizationGranted !== false ||
    decisionContractResult.boundary.userBindingPerformed !== false ||
    decisionContractResult.boundary.productConsumptionPerformed !== false ||
    decisionContractResult.boundary.noDefaultDecision !== true ||
    decisionContractResult.boundary.noAutomaticUserBinding !== true ||
    decisionContractResult.boundary.noUserProfileCreation !== true ||
    decisionContractResult.boundary.noStorageWrite !== true ||
    decisionContractResult.boundary.noEngineInvocation !== true ||
    decisionContractResult.boundary.noRendererInvocation !== true ||
    decisionContractResult.boundary.noLifeStateMutation !== true
  ) {
    return blocked(input, "DECISION_CONTRACT_BOUNDARY_INVALID");
  }

  const decisionContractReference = decisionContractResult.contractReference;
  if (
    decisionContractReference.referenceType !==
      "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION_CONTRACT" ||
    decisionContractReference.decisionStatus !== "NOT_DECIDED" ||
    decisionContractReference.authorizationStatus !== "NOT_AUTHORIZED" ||
    decisionContractReference.userBinding !== "NOT_PERFORMED" ||
    decisionContractReference.productConsumption !== "NOT_PERFORMED" ||
    decisionContractReference.futureExplicitDecisionRequired !== true ||
    decisionContractReference.decisionContractOnly !== true ||
    decisionContractReference.referenceOnly !== true ||
    decisionContractReference.noDefaultDecision !== true ||
    decisionContractReference.noAutomaticUserBinding !== true
  ) {
    return blocked(input, "DECISION_CONTRACT_REFERENCE_INVALID");
  }

  if (decisionContractReference.inputContract.allowedDecisions.join(",") !== "GRANT,DECLINE") {
    return blocked(input, "DECISION_SCOPE_INVALID");
  }

  const command = input.command;
  if (command === null) {
    return unavailable(input, "EXPLICIT_DECISION_COMMAND_REQUIRED");
  }
  if (command.commandType !== "EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION") {
    return blocked(input, "DECISION_COMMAND_TYPE_INVALID");
  }
  if (command.subjectDecision !== "GRANT" && command.subjectDecision !== "DECLINE") {
    return blocked(input, "DECISION_VALUE_INVALID");
  }
  if (
    command.identityReferenceAccepted !== true ||
    command.decisionScope !== "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY"
  ) {
    return blocked(input, "DECISION_SCOPE_INVALID");
  }
  if (
    typeof command.commandId !== "string" ||
    command.commandId.length === 0 ||
    typeof command.decisionReference !== "string" ||
    command.decisionReference.length === 0
  ) {
    return blocked(input, "DECISION_REFERENCE_INVALID");
  }

  if (
    decisionContractReference.resolutionReference.commandReference.reviewReference.contractReference.readinessReference.identityReference !==
    decisionContractReference.resolutionReference.commandReference.reviewReference.contractReference.readinessReference.identitySourceReference.personalStarBeastReference
  ) {
    return blocked(input, "IDENTITY_REFERENCE_DRIFT");
  }

  return Object.freeze({
    status: "READY" as const,
    commandStatus: "READY_FOR_AUTHORIZATION_DECISION_RESOLUTION" as const,
    source:
      "personal_star_beast_identity_explicit_user_binding_authorization_decision_command" as const,
    input,
    commandReference: Object.freeze({
      referenceType:
        "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION_COMMAND_REFERENCE" as const,
      referenceId: `personal-star-beast-identity-explicit-user-binding-decision-command:${command.commandId}`,
      commandVersion: "V1" as const,
      decisionContractReference,
      command,
      inputContract: Object.freeze({
        acceptedDecisionContractType:
          "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION_CONTRACT" as const,
        requiredDecisionContractStatus:
          "READY_FOR_EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION" as const,
        requiredCommandType:
          "EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION" as const,
        allowedDecisions: ["GRANT", "DECLINE"] as const,
        explicitDecisionRequired: true as const,
        decisionReferenceRequired: true as const,
        identityReferenceOnly: true as const,
        noRawUserIdentityPayload: true as const,
        noAutomaticAuthorization: true as const,
      }),
      outputContract: Object.freeze({
        outputReferenceType:
          "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION_COMMAND_REFERENCE" as const,
        commandStatus:
          "READY_FOR_AUTHORIZATION_DECISION_RESOLUTION" as const,
        subjectDecision: command.subjectDecision,
        authorizationDecisionResolved: false as const,
        authorizationStatus: "NOT_AUTHORIZED" as const,
        userBinding: "NOT_PERFORMED" as const,
        productConsumption: "NOT_PERFORMED" as const,
        futureAuthorizationResolutionRequired: true as const,
        noAutomaticAuthorization: true as const,
        noAutomaticUserBinding: true as const,
      }),
      decisionCommandContractOnly: true as const,
      referenceOnly: true as const,
      decisionCommandAccepted: true as const,
      subjectDecision: command.subjectDecision,
      authorizationDecisionResolved: false as const,
      authorizationStatus: "NOT_AUTHORIZED" as const,
      userBinding: "NOT_PERFORMED" as const,
      productConsumption: "NOT_PERFORMED" as const,
      futureAuthorizationResolutionRequired: true as const,
      noDefaultDecision: true as const,
      noAutomaticAuthorization: true as const,
      noAutomaticUserBinding: true as const,
      noUserProfileCreation: true as const,
      noStorageWrite: true as const,
      noEngineInvocation: true as const,
      noRendererInvocation: true as const,
      noLifeStateMutation: true as const,
    }),
    boundary: DECISION_COMMAND_BOUNDARY,
  });
}
