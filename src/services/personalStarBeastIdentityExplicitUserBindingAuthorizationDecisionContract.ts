import type {
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractBlockedReason,
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractBoundary,
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractInput,
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractResult,
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractUnavailableReason,
} from "../types/personalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContract";

const DECISION_BOUNDARY: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractBoundary =
  Object.freeze({
    decisionContractOnly: true,
    referenceOnly: true,
    decisionCaptured: false,
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
  input: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractInput,
  reason: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractUnavailableReason,
): PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    contractStatus: "UNAVAILABLE" as const,
    source:
      "personal_star_beast_identity_explicit_user_binding_authorization_decision_contract" as const,
    reason,
    input,
    contractReference: null,
    boundary: DECISION_BOUNDARY,
  });

const blocked = (
  input: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractInput,
  reason: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractBlockedReason,
): PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    contractStatus: "BLOCKED" as const,
    source:
      "personal_star_beast_identity_explicit_user_binding_authorization_decision_contract" as const,
    reason,
    input,
    contractReference: null,
    boundary: DECISION_BOUNDARY,
  });

export function reviewPersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContract(
  input: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractInput,
): PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractResult {
  const resolutionResult = input.resolutionResult;
  if (resolutionResult === null) {
    return unavailable(input, "RESOLUTION_RESULT_REQUIRED");
  }
  if (resolutionResult.status === "UNAVAILABLE") {
    return unavailable(input, "RESOLUTION_RESULT_UNAVAILABLE");
  }
  if (resolutionResult.status === "BLOCKED") {
    return blocked(input, "RESOLUTION_RESULT_BLOCKED");
  }

  if (
    resolutionResult.status !== "READY" ||
    resolutionResult.resolutionStatus !==
      "READY_FOR_EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION" ||
    resolutionResult.source !==
      "personal_star_beast_identity_explicit_user_binding_authorization_resolution" ||
    resolutionResult.boundary.resolutionOnly !== true ||
    resolutionResult.boundary.referenceOnly !== true ||
    resolutionResult.boundary.authorizationDecisionPending !== true ||
    resolutionResult.boundary.authorizationGranted !== false ||
    resolutionResult.boundary.userBindingPerformed !== false ||
    resolutionResult.boundary.productConsumptionPerformed !== false ||
    resolutionResult.boundary.noAutomaticUserBinding !== true ||
    resolutionResult.boundary.noUserProfileCreation !== true ||
    resolutionResult.boundary.noStorageWrite !== true ||
    resolutionResult.boundary.noEngineInvocation !== true ||
    resolutionResult.boundary.noRendererInvocation !== true ||
    resolutionResult.boundary.noLifeStateMutation !== true
  ) {
    return blocked(input, "RESOLUTION_BOUNDARY_INVALID");
  }

  const resolutionReference = resolutionResult.resolutionReference;
  if (
    resolutionReference.referenceType !==
      "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_AUTHORIZATION_RESOLUTION" ||
    resolutionReference.resolutionStatus !==
      "PENDING_EXPLICIT_USER_BINDING_AUTHORIZATION" ||
    resolutionReference.authorizationStatus !== "NOT_AUTHORIZED" ||
    resolutionReference.userBinding !== "NOT_PERFORMED" ||
    resolutionReference.productConsumption !== "NOT_PERFORMED" ||
    resolutionReference.futureAuthorizationDecisionRequired !== true ||
    resolutionReference.resolutionOnly !== true ||
    resolutionReference.referenceOnly !== true ||
    resolutionReference.noAutomaticUserBinding !== true
  ) {
    return blocked(input, "RESOLUTION_REFERENCE_INVALID");
  }

  if (
    resolutionReference.commandReference.command.bindingScope !==
      "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY" ||
    resolutionReference.commandReference.command.identityReferenceAccepted !== true
  ) {
    return blocked(input, "DECISION_SCOPE_INVALID");
  }

  if (
    resolutionReference.commandReference.reviewReference.contractReference.readinessReference.identityReference !==
    resolutionReference.commandReference.reviewReference.contractReference.readinessReference.identitySourceReference.personalStarBeastReference
  ) {
    return blocked(input, "IDENTITY_REFERENCE_DRIFT");
  }

  return Object.freeze({
    status: "READY" as const,
    contractStatus:
      "READY_FOR_EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION" as const,
    source:
      "personal_star_beast_identity_explicit_user_binding_authorization_decision_contract" as const,
    input,
    contractReference: Object.freeze({
      referenceType:
        "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION_CONTRACT" as const,
      referenceId: `personal-star-beast-identity-explicit-user-binding-decision-contract:${resolutionReference.referenceId}`,
      contractVersion: "V1" as const,
      resolutionReference,
      inputContract: Object.freeze({
        acceptedResolutionType:
          "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_AUTHORIZATION_RESOLUTION" as const,
        requiredResolutionStatus:
          "PENDING_EXPLICIT_USER_BINDING_AUTHORIZATION" as const,
        decisionScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY" as const,
        allowedDecisions: ["GRANT", "DECLINE"] as const,
        decisionMustBeExplicit: true as const,
        noDefaultDecision: true as const,
        noRawUserIdentityPayload: true as const,
      }),
      outputContract: Object.freeze({
        outputReferenceType:
          "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION_CONTRACT" as const,
        decisionStatus: "NOT_DECIDED" as const,
        authorizationStatus: "NOT_AUTHORIZED" as const,
        userBinding: "NOT_PERFORMED" as const,
        productConsumption: "NOT_PERFORMED" as const,
        futureExplicitDecisionRequired: true as const,
        noDefaultDecision: true as const,
        noAutomaticUserBinding: true as const,
      }),
      decisionContractOnly: true as const,
      referenceOnly: true as const,
      decisionStatus: "NOT_DECIDED" as const,
      authorizationStatus: "NOT_AUTHORIZED" as const,
      userBinding: "NOT_PERFORMED" as const,
      productConsumption: "NOT_PERFORMED" as const,
      futureExplicitDecisionRequired: true as const,
      noDefaultDecision: true as const,
      noAutomaticUserBinding: true as const,
      noUserProfileCreation: true as const,
      noStorageWrite: true as const,
      noEngineInvocation: true as const,
      noRendererInvocation: true as const,
      noLifeStateMutation: true as const,
    }),
    boundary: DECISION_BOUNDARY,
  });
}
