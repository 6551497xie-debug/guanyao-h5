import type {
  PersonalStarBeastIdentityExplicitUserBindingEligibilityBlockedReason,
  PersonalStarBeastIdentityExplicitUserBindingEligibilityBoundary,
  PersonalStarBeastIdentityExplicitUserBindingEligibilityInput,
  PersonalStarBeastIdentityExplicitUserBindingEligibilityResult,
  PersonalStarBeastIdentityExplicitUserBindingEligibilityUnavailableReason,
} from "../types/personalStarBeastIdentityExplicitUserBindingEligibility";

const unavailableBoundary = (bindingEligible = false): PersonalStarBeastIdentityExplicitUserBindingEligibilityBoundary =>
  Object.freeze({
    eligibilityOnly: true,
    referenceOnly: true,
    authorizationDecisionConsumed: true,
    bindingEligible,
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
  input: PersonalStarBeastIdentityExplicitUserBindingEligibilityInput,
  reason: PersonalStarBeastIdentityExplicitUserBindingEligibilityUnavailableReason,
): PersonalStarBeastIdentityExplicitUserBindingEligibilityResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    eligibilityStatus: "UNAVAILABLE" as const,
    source: "personal_star_beast_identity_explicit_user_binding_eligibility" as const,
    reason,
    input,
    eligibilityReference: null,
    boundary: unavailableBoundary(),
  });

const blocked = (
  input: PersonalStarBeastIdentityExplicitUserBindingEligibilityInput,
  reason: PersonalStarBeastIdentityExplicitUserBindingEligibilityBlockedReason,
): PersonalStarBeastIdentityExplicitUserBindingEligibilityResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    eligibilityStatus: "BLOCKED" as const,
    source: "personal_star_beast_identity_explicit_user_binding_eligibility" as const,
    reason,
    input,
    eligibilityReference: null,
    boundary: unavailableBoundary(),
  });

export function resolvePersonalStarBeastIdentityExplicitUserBindingEligibility(
  input: PersonalStarBeastIdentityExplicitUserBindingEligibilityInput,
): PersonalStarBeastIdentityExplicitUserBindingEligibilityResult {
  const decisionResolutionResult = input.decisionResolutionResult;
  if (decisionResolutionResult === null) {
    return unavailable(input, "DECISION_RESOLUTION_REQUIRED");
  }
  if (decisionResolutionResult.status === "UNAVAILABLE") {
    return unavailable(input, "DECISION_RESOLUTION_UNAVAILABLE");
  }
  if (decisionResolutionResult.status === "BLOCKED") {
    return blocked(input, "DECISION_RESOLUTION_BLOCKED");
  }

  if (
    decisionResolutionResult.status !== "READY" ||
    decisionResolutionResult.resolutionStatus !==
      "READY_FOR_EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION_CONSUMPTION" ||
    decisionResolutionResult.source !==
      "personal_star_beast_identity_explicit_user_binding_authorization_decision_resolution" ||
    decisionResolutionResult.boundary.decisionResolutionOnly !== true ||
    decisionResolutionResult.boundary.referenceOnly !== true ||
    decisionResolutionResult.boundary.authorizationDecisionResolved !== true ||
    decisionResolutionResult.boundary.userBindingPerformed !== false ||
    decisionResolutionResult.boundary.productConsumptionPerformed !== false ||
    decisionResolutionResult.boundary.noDefaultDecision !== true ||
    decisionResolutionResult.boundary.noAutomaticUserBinding !== true ||
    decisionResolutionResult.boundary.noUserProfileCreation !== true ||
    decisionResolutionResult.boundary.noStorageWrite !== true ||
    decisionResolutionResult.boundary.noEngineInvocation !== true ||
    decisionResolutionResult.boundary.noRendererInvocation !== true ||
    decisionResolutionResult.boundary.noLifeStateMutation !== true
  ) {
    return blocked(input, "DECISION_RESOLUTION_BOUNDARY_INVALID");
  }

  const decisionResolutionReference = decisionResolutionResult.resolutionReference;
  if (
    decisionResolutionReference.referenceType !==
      "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION_RESOLUTION" ||
    decisionResolutionReference.authorizationDecisionResolved !== true ||
    decisionResolutionReference.userBinding !== "NOT_PERFORMED" ||
    decisionResolutionReference.productConsumption !== "NOT_PERFORMED" ||
    decisionResolutionReference.futureUserBindingRequired !== true ||
    decisionResolutionReference.decisionResolutionOnly !== true ||
    decisionResolutionReference.referenceOnly !== true ||
    decisionResolutionReference.noDefaultDecision !== true ||
    decisionResolutionReference.noAutomaticUserBinding !== true
  ) {
    return blocked(input, "DECISION_RESOLUTION_REFERENCE_INVALID");
  }

  if (
    decisionResolutionReference.decisionOutcome !== "GRANTED" &&
    decisionResolutionReference.decisionOutcome !== "DECLINED"
  ) {
    return blocked(input, "DECISION_OUTCOME_INVALID");
  }
  const bindingEligible = decisionResolutionReference.decisionOutcome === "GRANTED";
  const expectedAuthorizationStatus = bindingEligible ? "AUTHORIZED" : "NOT_AUTHORIZED";
  if (decisionResolutionReference.authorizationStatus !== expectedAuthorizationStatus) {
    return blocked(input, "DECISION_SCOPE_INVALID");
  }

  if (
    decisionResolutionReference.decisionCommandReference.command.decisionScope !==
      "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY" ||
    decisionResolutionReference.decisionCommandReference.command.identityReferenceAccepted !== true
  ) {
    return blocked(input, "DECISION_SCOPE_INVALID");
  }

  if (
    decisionResolutionReference.decisionCommandReference.decisionContractReference.resolutionReference.commandReference.reviewReference.contractReference.readinessReference.identityReference !==
    decisionResolutionReference.decisionCommandReference.decisionContractReference.resolutionReference.commandReference.reviewReference.contractReference.readinessReference.identitySourceReference.personalStarBeastReference
  ) {
    return blocked(input, "IDENTITY_REFERENCE_DRIFT");
  }

  const boundary: PersonalStarBeastIdentityExplicitUserBindingEligibilityBoundary =
    unavailableBoundary(bindingEligible);
  return Object.freeze({
    status: "READY" as const,
    eligibilityStatus: "READY_FOR_EXPLICIT_USER_BINDING_ELIGIBILITY" as const,
    source: "personal_star_beast_identity_explicit_user_binding_eligibility" as const,
    input,
    eligibilityReference: Object.freeze({
      referenceType:
        "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_ELIGIBILITY_REFERENCE" as const,
      referenceId: `personal-star-beast-identity-explicit-user-binding-eligibility:${decisionResolutionReference.referenceId}`,
      eligibilityVersion: "V1" as const,
      decisionResolutionReference,
      inputContract: Object.freeze({
        acceptedResolutionType:
          "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION_RESOLUTION" as const,
        requiredResolutionStatus:
          "READY_FOR_EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION_CONSUMPTION" as const,
        acceptedDecisionOutcomes: ["GRANTED", "DECLINED"] as const,
        identityReferenceOnly: true as const,
        noAutomaticBinding: true as const,
        noRawUserIdentityPayload: true as const,
      }),
      outputContract: Object.freeze({
        outputReferenceType:
          "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_ELIGIBILITY_REFERENCE" as const,
        eligibilityStatus:
          "READY_FOR_EXPLICIT_USER_BINDING_ELIGIBILITY" as const,
        eligibility: bindingEligible ? "ELIGIBLE" : "NOT_ELIGIBLE",
        authorizationStatus: expectedAuthorizationStatus,
        userBinding: "NOT_PERFORMED" as const,
        productConsumption: "NOT_PERFORMED" as const,
        futureExplicitBindingRequired: true as const,
        noAutomaticUserBinding: true as const,
      }),
      eligibilityStatus:
        "READY_FOR_EXPLICIT_USER_BINDING_ELIGIBILITY" as const,
      eligibility: bindingEligible ? "ELIGIBLE" : "NOT_ELIGIBLE",
      eligibilityReason: bindingEligible
        ? "AUTHORIZED_DECISION"
        : "AUTHORIZATION_DECLINED",
      authorizationStatus: expectedAuthorizationStatus,
      userBinding: "NOT_PERFORMED" as const,
      productConsumption: "NOT_PERFORMED" as const,
      futureExplicitBindingRequired: true as const,
      eligibilityOnly: true as const,
      referenceOnly: true as const,
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
