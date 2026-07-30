import type { PressureSeedField, GuanyaoPressureNature } from "./guanyaoPressureSeed";
import type { Trigram } from "./guanyaoCausalEngine";
import type { RealityEncounterIdentityReferences } from "./xinmaiRealityEncounterIntent";

export const XINMAI_CHOICE_ACTION_ROUTE_SCHEMA_VERSION =
  "XINMAI_CHOICE_ACTION_ROUTE_CANDIDATE_V1" as const;
export const XINMAI_CHOICE_ACTION_ROUTE_CATALOG_REVISION =
  "XINMAI_CHOICE_ACTION_ROUTE_CATALOG_P0_R1" as const;
export const XINMAI_CHOICE_ACTION_ROUTE_RESOLVER_VERSION =
  "XINMAI_CHOICE_ACTION_ROUTE_RESOLVER_V1" as const;
export const XINMAI_CHOICE_ACTION_ROUTE_VALIDATOR_VERSION =
  "XINMAI_CHOICE_ACTION_ROUTE_VALIDATOR_V1" as const;

export type ChoiceActionRoutePrototypeId =
  | "ROUGH_FIRST_STEP"
  | "PAUSE_ONE_AUTOMATIC_RESPONSE"
  | "ASK_ONE_CONCRETE_QUESTION"
  | "STATE_ONE_MINIMUM_BOUNDARY"
  | "SHRINK_TO_STARTABLE_UNIT"
  | "VERIFY_ONE_TENSING_ASSUMPTION"
  | "BODY_RECOVERY_WINDOW";

export type ChoiceActionRouteSceneKind =
  | "CURRENT_WORK_OR_AUTHORITY_CONTEXT"
  | "CURRENT_RESOURCE_FACT_CONTEXT"
  | "NEXT_SAME_RELATION_TRIGGER"
  | "NEXT_NON_URGENT_RESPONSIBILITY_CONTEXT"
  | "NEXT_SAFE_SOCIAL_TRIGGER"
  | "CURRENT_SELF_DIRECTION_CONTEXT";

export type ChoiceActionRouteTargetKind =
  | "CURRENT_TASK"
  | "CURRENT_ASSUMPTION"
  | "CURRENT_AUTOMATIC_RESPONSE"
  | "CURRENT_BODY_STATE"
  | "ONE_OBSERVABLE_FACT"
  | "FIRST_REVERSIBLE_UNIT";

export type ChoiceActionRouteEffortBoundary =
  | "ONE_BREATH"
  | "ONE_PAUSE"
  | "ONE_FACT"
  | "ONE_STEP"
  | "TWO_MINUTES"
  | "TEN_MINUTES"
  | "ONE_SAFE_QUESTION"
  | "ONE_MINIMUM_BOUNDARY";

export type ChoiceActionRouteScale =
  | "SMALLEST"
  | "SMALL"
  | "SINGLE_STEP";

export type ChoiceActionRoutePrototype = Readonly<{
  prototypeId: ChoiceActionRoutePrototypeId;
  prototypeVersion: 1;
  title: string;
  actionVerb: string;
  allowedTargetKinds: readonly ChoiceActionRouteTargetKind[];
  allowedSceneKinds: readonly ChoiceActionRouteSceneKind[];
  allowedEffortBoundaries: readonly ChoiceActionRouteEffortBoundary[];
  interactionSafetyConfirmationRequired: boolean;
  safetyLevel: "P0_LOW_RISK_REVERSIBLE";
  userMayDecline: true;
  userMayDefer: true;
  noOutcomePromise: true;
}>;

export type ChoiceActionRouteParameters = Readonly<{
  targetKind: ChoiceActionRouteTargetKind;
  sceneKind: ChoiceActionRouteSceneKind;
  scale: ChoiceActionRouteScale;
  effortBoundary: ChoiceActionRouteEffortBoundary;
  requiresUserSafetyConfirmation: boolean;
}>;

export type ChoiceActionRouteResolverInput = Readonly<{
  identityReferences: RealityEncounterIdentityReferences;
  sourceEncounterCycleId: string;
  gravityCycleId: string;
  gravityObservationReferenceId: string;
  observationCheckpointRevision: number;
  observationStatus: "OBSERVATION_RECOGNIZED";
  pressure: Readonly<{
    selectedPressureSeedId: string;
    candidateReferenceId: string;
    pressureField: PressureSeedField;
    pressureNature: GuanyaoPressureNature;
  }>;
  motherCode: Readonly<{
    motherCodeProfileId: string;
    motherCodeDefinitionId: string;
    lowerTrigram: Trigram;
  }>;
}>;

export type ChoiceActionRouteCandidate = Readonly<{
  schemaVersion: typeof XINMAI_CHOICE_ACTION_ROUTE_SCHEMA_VERSION;
  source: "xinmai_choice_action_route_authority";
  actionRouteReferenceId: string;
  routeSetReferenceId: string;
  canonicalIdentityKey: string;
  catalogRevision: typeof XINMAI_CHOICE_ACTION_ROUTE_CATALOG_REVISION;
  resolverVersion: typeof XINMAI_CHOICE_ACTION_ROUTE_RESOLVER_VERSION;
  validatorVersion: typeof XINMAI_CHOICE_ACTION_ROUTE_VALIDATOR_VERSION;
  prototypeId: ChoiceActionRoutePrototypeId;
  prototypeVersion: 1;
  identityReferences: RealityEncounterIdentityReferences;
  sourceEncounterCycleId: string;
  pressureProvenance: Readonly<{
    selectedPressureSeedId: string;
    candidateReferenceId: string;
    pressureField: PressureSeedField;
    pressureNature: GuanyaoPressureNature;
  }>;
  gravityProvenance: Readonly<{
    gravityCycleId: string;
    gravityObservationReferenceId: string;
    observationCheckpointRevision: number;
  }>;
  motherCodeProvenance: Readonly<{
    motherCodeProfileId: string;
    motherCodeDefinitionId: string;
    lowerTrigram: Trigram;
  }>;
  parameters: ChoiceActionRouteParameters;
  action: Readonly<{
    visibleAction: string;
    actionVerb: string;
    actionObject: string;
    sceneBoundary: string;
    effortBoundary: ChoiceActionRouteEffortBoundary;
    completionPrompt: string;
  }>;
  safety: Readonly<{
    safetyLevel: "P0_LOW_RISK_REVERSIBLE";
    validatorVersion: typeof XINMAI_CHOICE_ACTION_ROUTE_VALIDATOR_VERSION;
    forbiddenContextMatches: readonly [];
    userMayDecline: true;
    userMayDefer: true;
    noOutcomePromise: true;
  }>;
  provenance: Readonly<{
    authoringSource: "CURATED_PARAMETERIZED_PROTOTYPE";
    aiDraftUsed: false;
    aiHasNoAuthority: true;
    userHasNotActedYet: true;
    noLivedResponseAuthority: true;
    noCrystalEligibilityAuthority: true;
  }>;
  lifecycle: "ROUTE_CANDIDATE_AVAILABLE";
  revision: 1;
  expiryRule: "CURRENT_RECOGNIZED_OBSERVATION_ONLY";
}>;

export type ChoiceActionRouteSnapshot = Readonly<
  Omit<ChoiceActionRouteCandidate, "lifecycle" | "revision"> & {
    lifecycle: "CONSUMED_BY_CHOICE";
    revision: 1;
    userExplicitSelection: true;
  }
>;

export type ChoiceActionRouteWithheldReason =
  | "OBSERVATION_NOT_RECOGNIZED"
  | "IDENTITY_PROVENANCE_INCOMPLETE"
  | "PRESSURE_PROVENANCE_INCOMPLETE"
  | "MOTHER_CODE_PROVENANCE_INCOMPLETE"
  | "SURVIVAL_CONTEXT_SAFE_WITHHELD"
  | "PROTOTYPE_MAPPING_UNAVAILABLE"
  | "PARAMETER_VALIDATION_FAILED";

export type ChoiceActionRouteResolution =
  | Readonly<{
      status: "READY";
      routeSetReferenceId: string;
      resolverInput: ChoiceActionRouteResolverInput;
      candidates: readonly ChoiceActionRouteCandidate[];
      reason: null;
    }>
  | Readonly<{
      status: "SAFE_WITHHELD";
      routeSetReferenceId: null;
      resolverInput: ChoiceActionRouteResolverInput | null;
      candidates: readonly [];
      reason: ChoiceActionRouteWithheldReason;
    }>;

export type ChoiceActionRouteValidationReason =
  | "SCHEMA_VERSION_MISMATCH"
  | "CATALOG_VERSION_MISMATCH"
  | "PROTOTYPE_NOT_FOUND"
  | "PROTOTYPE_VERSION_MISMATCH"
  | "IDENTITY_OR_LINEAGE_MISMATCH"
  | "PRESSURE_PROVENANCE_MISMATCH"
  | "MOTHER_CODE_PROVENANCE_MISMATCH"
  | "SURVIVAL_CONTEXT_FORBIDDEN"
  | "PARAMETER_NOT_ALLOWED"
  | "ACTION_NOT_JUDGEABLE"
  | "SAFETY_BOUNDARY_INVALID"
  | "REFERENCE_MISMATCH";

export type ChoiceActionRouteValidation =
  | Readonly<{
      status: "VALID";
      candidate: ChoiceActionRouteCandidate;
      reason: null;
    }>
  | Readonly<{
      status: "SAFE_WITHHELD";
      candidate: null;
      reason: ChoiceActionRouteValidationReason;
    }>;
