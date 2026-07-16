import type {
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionBlockedReason,
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionBoundary,
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionInput,
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionResult,
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionUnavailableReason,
} from "../types/personalStarBeastIdentityExplicitUserBindingAuthorizationResolution";

const RESOLUTION_BOUNDARY: PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionBoundary =
  Object.freeze({
    resolutionOnly: true,
    referenceOnly: true,
    authorizationDecisionPending: true,
    authorizationGranted: false,
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
  input: PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionInput,
  reason: PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionUnavailableReason,
): PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    resolutionStatus: "UNAVAILABLE" as const,
    source:
      "personal_star_beast_identity_explicit_user_binding_authorization_resolution" as const,
    reason,
    input,
    resolutionReference: null,
    boundary: RESOLUTION_BOUNDARY,
  });

const blocked = (
  input: PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionInput,
  reason: PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionBlockedReason,
): PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    resolutionStatus: "BLOCKED" as const,
    source:
      "personal_star_beast_identity_explicit_user_binding_authorization_resolution" as const,
    reason,
    input,
    resolutionReference: null,
    boundary: RESOLUTION_BOUNDARY,
  });

export function resolvePersonalStarBeastIdentityExplicitUserBindingAuthorization(
  input: PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionInput,
): PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionResult {
  const commandResult = input.commandResult;
  if (commandResult === null) {
    return unavailable(input, "COMMAND_RESULT_REQUIRED");
  }
  if (commandResult.status === "UNAVAILABLE") {
    return unavailable(input, "COMMAND_RESULT_UNAVAILABLE");
  }
  if (commandResult.status === "BLOCKED") {
    return blocked(input, "COMMAND_RESULT_BLOCKED");
  }

  if (
    commandResult.status !== "READY" ||
    commandResult.commandStatus !== "READY_FOR_AUTHORIZATION_RESOLUTION" ||
    commandResult.source !==
      "personal_star_beast_identity_explicit_user_binding_authorization_command" ||
    commandResult.boundary.commandContractOnly !== true ||
    commandResult.boundary.referenceOnly !== true ||
    commandResult.boundary.commandExecutionPerformed !== false ||
    commandResult.boundary.authorizationGranted !== false ||
    commandResult.boundary.userBindingPerformed !== false ||
    commandResult.boundary.productConsumptionPerformed !== false ||
    commandResult.boundary.noAutomaticUserBinding !== true ||
    commandResult.boundary.noUserProfileCreation !== true ||
    commandResult.boundary.noStorageWrite !== true ||
    commandResult.boundary.noEngineInvocation !== true ||
    commandResult.boundary.noRendererInvocation !== true ||
    commandResult.boundary.noLifeStateMutation !== true
  ) {
    return blocked(input, "COMMAND_BOUNDARY_INVALID");
  }

  const commandReference = commandResult.commandReference;
  if (
    commandReference.referenceType !==
      "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_AUTHORIZATION_COMMAND_REFERENCE" ||
    commandReference.commandStatus !== "AVAILABLE_FOR_AUTHORIZATION_RESOLUTION" ||
    commandReference.subjectIntent !== "DECLARED" ||
    commandReference.authorizationStatus !== "NOT_AUTHORIZED" ||
    commandReference.userBinding !== "NOT_PERFORMED" ||
    commandReference.productConsumption !== "NOT_PERFORMED" ||
    commandReference.futureAuthorizationResolutionRequired !== true ||
    commandReference.noAutomaticUserBinding !== true
  ) {
    return blocked(input, "COMMAND_REFERENCE_INVALID");
  }

  if (
    commandReference.command.commandType !== "EXPLICIT_USER_BINDING_INTENT" ||
    commandReference.command.subjectDecision !==
      "DECLARE_EXPLICIT_USER_BINDING_INTENT" ||
    commandReference.command.identityReferenceAccepted !== true ||
    commandReference.command.bindingScope !==
      "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY"
  ) {
    return blocked(input, "COMMAND_SCOPE_INVALID");
  }

  if (
    commandReference.reviewReference.contractReference.readinessReference.identityReference !==
    commandReference.reviewReference.contractReference.readinessReference.identitySourceReference.personalStarBeastReference
  ) {
    return blocked(input, "IDENTITY_REFERENCE_DRIFT");
  }

  return Object.freeze({
    status: "READY" as const,
    resolutionStatus:
      "READY_FOR_EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION" as const,
    source:
      "personal_star_beast_identity_explicit_user_binding_authorization_resolution" as const,
    input,
    resolutionReference: Object.freeze({
      referenceType:
        "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_AUTHORIZATION_RESOLUTION" as const,
      referenceId: `personal-star-beast-identity-explicit-user-binding-resolution:${commandReference.referenceId}`,
      resolutionVersion: "V1" as const,
      commandReference,
      resolutionStatus:
        "PENDING_EXPLICIT_USER_BINDING_AUTHORIZATION" as const,
      authorizationStatus: "NOT_AUTHORIZED" as const,
      userBinding: "NOT_PERFORMED" as const,
      productConsumption: "NOT_PERFORMED" as const,
      futureAuthorizationDecisionRequired: true as const,
      resolutionOnly: true as const,
      referenceOnly: true as const,
      noAutomaticUserBinding: true as const,
      noUserProfileCreation: true as const,
      noStorageWrite: true as const,
      noEngineInvocation: true as const,
      noRendererInvocation: true as const,
      noLifeStateMutation: true as const,
    }),
    boundary: RESOLUTION_BOUNDARY,
  });
}
