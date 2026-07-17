import type {
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionReference,
  PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionResult,
} from "./personalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolution";

export type PersonalStarBeastIdentityExplicitUserBindingEligibilityInput =
  Readonly<{
    decisionResolutionResult: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionResult | null;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingEligibilityUnavailableReason =
  | "DECISION_RESOLUTION_REQUIRED"
  | "DECISION_RESOLUTION_UNAVAILABLE";

export type PersonalStarBeastIdentityExplicitUserBindingEligibilityBlockedReason =
  | "DECISION_RESOLUTION_BLOCKED"
  | "DECISION_RESOLUTION_BOUNDARY_INVALID"
  | "DECISION_RESOLUTION_REFERENCE_INVALID"
  | "DECISION_OUTCOME_INVALID"
  | "DECISION_SCOPE_INVALID"
  | "IDENTITY_REFERENCE_DRIFT";

export type PersonalStarBeastIdentityExplicitUserBindingEligibilityBoundary =
  Readonly<{
    eligibilityOnly: true;
    referenceOnly: true;
    authorizationDecisionConsumed: true;
    bindingEligible: boolean;
    userBindingPerformed: false;
    productConsumptionPerformed: false;
    noAutomaticUserBinding: true;
    noUserProfileCreation: true;
    noStorageWrite: true;
    noEngineInvocation: true;
    noRendererInvocation: true;
    noLifeStateMutation: true;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingEligibilityInputContract =
  Readonly<{
    acceptedResolutionType: "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION_RESOLUTION";
    requiredResolutionStatus: "READY_FOR_EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION_CONSUMPTION";
    acceptedDecisionOutcomes: readonly ["GRANTED", "DECLINED"];
    identityReferenceOnly: true;
    noAutomaticBinding: true;
    noRawUserIdentityPayload: true;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingEligibilityOutputContract =
  Readonly<{
    outputReferenceType: "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_ELIGIBILITY_REFERENCE";
    eligibilityStatus: "READY_FOR_EXPLICIT_USER_BINDING_ELIGIBILITY";
    eligibility: "ELIGIBLE" | "NOT_ELIGIBLE";
    authorizationStatus: "AUTHORIZED" | "NOT_AUTHORIZED";
    userBinding: "NOT_PERFORMED";
    productConsumption: "NOT_PERFORMED";
    futureExplicitBindingRequired: true;
    noAutomaticUserBinding: true;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingEligibilityReference =
  Readonly<{
    referenceType: "PERSONAL_STAR_BEAST_IDENTITY_EXPLICIT_USER_BINDING_ELIGIBILITY_REFERENCE";
    referenceId: string;
    eligibilityVersion: "V1";
    decisionResolutionReference: PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionReference;
    inputContract: PersonalStarBeastIdentityExplicitUserBindingEligibilityInputContract;
    outputContract: PersonalStarBeastIdentityExplicitUserBindingEligibilityOutputContract;
    eligibilityStatus: "READY_FOR_EXPLICIT_USER_BINDING_ELIGIBILITY";
    eligibility: "ELIGIBLE" | "NOT_ELIGIBLE";
    eligibilityReason: "AUTHORIZED_DECISION" | "AUTHORIZATION_DECLINED";
    authorizationStatus: "AUTHORIZED" | "NOT_AUTHORIZED";
    userBinding: "NOT_PERFORMED";
    productConsumption: "NOT_PERFORMED";
    futureExplicitBindingRequired: true;
    eligibilityOnly: true;
    referenceOnly: true;
    noAutomaticUserBinding: true;
    noUserProfileCreation: true;
    noStorageWrite: true;
    noEngineInvocation: true;
    noRendererInvocation: true;
    noLifeStateMutation: true;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingEligibilityReady =
  Readonly<{
    status: "READY";
    eligibilityStatus: "READY_FOR_EXPLICIT_USER_BINDING_ELIGIBILITY";
    source: "personal_star_beast_identity_explicit_user_binding_eligibility";
    input: PersonalStarBeastIdentityExplicitUserBindingEligibilityInput;
    eligibilityReference: PersonalStarBeastIdentityExplicitUserBindingEligibilityReference;
    boundary: PersonalStarBeastIdentityExplicitUserBindingEligibilityBoundary;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingEligibilityUnavailable =
  Readonly<{
    status: "UNAVAILABLE";
    eligibilityStatus: "UNAVAILABLE";
    source: "personal_star_beast_identity_explicit_user_binding_eligibility";
    reason: PersonalStarBeastIdentityExplicitUserBindingEligibilityUnavailableReason;
    input: PersonalStarBeastIdentityExplicitUserBindingEligibilityInput;
    eligibilityReference: null;
    boundary: PersonalStarBeastIdentityExplicitUserBindingEligibilityBoundary;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingEligibilityBlocked =
  Readonly<{
    status: "BLOCKED";
    eligibilityStatus: "BLOCKED";
    source: "personal_star_beast_identity_explicit_user_binding_eligibility";
    reason: PersonalStarBeastIdentityExplicitUserBindingEligibilityBlockedReason;
    input: PersonalStarBeastIdentityExplicitUserBindingEligibilityInput;
    eligibilityReference: null;
    boundary: PersonalStarBeastIdentityExplicitUserBindingEligibilityBoundary;
  }>;

export type PersonalStarBeastIdentityExplicitUserBindingEligibilityResult =
  | PersonalStarBeastIdentityExplicitUserBindingEligibilityReady
  | PersonalStarBeastIdentityExplicitUserBindingEligibilityUnavailable
  | PersonalStarBeastIdentityExplicitUserBindingEligibilityBlocked;
