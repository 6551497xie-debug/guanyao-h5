import type {
  ChoiceExperienceInterventionBoundary,
  RealityChoiceExperienceArchitecture,
  RealityChoiceExperienceArchitectureBlockedReason,
  RealityChoiceExperienceArchitectureBoundary,
  RealityChoiceExperienceArchitectureInput,
  RealityChoiceExperienceArchitectureResult,
  RealityChoiceExperienceArchitectureUnavailableReason,
} from "../types/realityChoiceExperienceArchitecture";
import type { RealityGravityExperienceArchitecture } from "../types/realityGravityExperienceArchitecture";

const ARCHITECTURE_BOUNDARY: RealityChoiceExperienceArchitectureBoundary =
  Object.freeze({
    architectureReviewOnly: true,
    choiceSemanticOnly: true,
    noBehaviorEngine: true,
    noDecisionAdvice: true,
    noTaskAssignment: true,
    noResultPrediction: true,
    noAiSubstitution: true,
    noGravityMutation: true,
    noCrystal: true,
    noArchive: true,
    noGenesisMutation: true,
    noIdentityMutation: true,
    noUserProfile: true,
    noStorage: true,
    noUi: true,
    noRenderer: true,
    noProductionIntegration: true,
  });

const INTERVENTION_BOUNDARY: ChoiceExperienceInterventionBoundary =
  Object.freeze({
    choiceExperienceOnly: true,
    noBehaviorGeneration: true,
    noDecisionAdvice: true,
    noTaskAssignment: true,
    noResultPrediction: true,
    noAiSubstitution: true,
    noGravityMutation: true,
    noCrystalGeneration: true,
    noArchiveGeneration: true,
    noGenesisMutation: true,
    noIdentityMutation: true,
    noUserProfile: true,
    noStorageWrite: true,
    noUiIntegration: true,
    noRendererInvocation: true,
    noProductionIntegration: true,
    isolatedReviewOnly: true,
  });

const unavailable = (
  input: RealityChoiceExperienceArchitectureInput,
  reason: RealityChoiceExperienceArchitectureUnavailableReason,
): RealityChoiceExperienceArchitectureResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    readiness: "UNAVAILABLE" as const,
    source: "reality_choice_experience_architecture" as const,
    reason,
    input,
    architecture: null,
    boundary: ARCHITECTURE_BOUNDARY,
  });

const blocked = (
  input: RealityChoiceExperienceArchitectureInput,
  reason: RealityChoiceExperienceArchitectureBlockedReason,
): RealityChoiceExperienceArchitectureResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    readiness: "BLOCKED" as const,
    source: "reality_choice_experience_architecture" as const,
    reason,
    input,
    architecture: null,
    boundary: ARCHITECTURE_BOUNDARY,
  });

const isValidGravityReference = (
  reference: RealityGravityExperienceArchitecture,
): boolean =>
  reference.semanticRole === "REALITY_GRAVITY_EXPERIENCE_ARCHITECTURE" &&
  reference.readinessState === "CHOICE_READINESS_BOUNDARY_READY" &&
  reference.gravityEntryState === "PRESSURE_RECOGNITION_COMPLETED" &&
  reference.pressureGravityBoundary ===
    "PRESSURE_OBSERVATION_TO_INERTIA_OBSERVATION" &&
  reference.genesisBoundary === "GENESIS_REMAINS_ISOLATED" &&
  reference.inertiaObservationLayer.noBehaviorScoring === true &&
  reference.inertiaObservationLayer.noPersonalityLabel === true &&
  reference.inertiaObservationLayer.noUserConclusion === true &&
  reference.automaticResponseLayer.noBehaviorPrediction === true &&
  reference.automaticResponseLayer.noCorrection === true &&
  reference.patternRecognitionLayer.noPersonalityLabel === true &&
  reference.patternRecognitionLayer.noDestinyJudgment === true &&
  reference.inertiaTensionLayer.noBehaviorAdvice === true &&
  reference.interventionBoundary.noInertiaCalculation === true &&
  reference.interventionBoundary.noBehaviorScoring === true &&
  reference.interventionBoundary.noBehaviorPrediction === true &&
  reference.interventionBoundary.noUserEvaluation === true &&
  reference.interventionBoundary.noBehaviorAdvice === true &&
  reference.interventionBoundary.noChoiceInvocation === true &&
  reference.interventionBoundary.noChoiceResult === true &&
  reference.interventionBoundary.noCrystalGeneration === true;

export function reviewRealityChoiceExperienceArchitecture(
  input: RealityChoiceExperienceArchitectureInput,
): RealityChoiceExperienceArchitectureResult {
  const gravity = input.gravityExperienceArchitecture;
  if (gravity === null) {
    return unavailable(input, "GRAVITY_EXPERIENCE_ARCHITECTURE_REQUIRED");
  }
  if (!isValidGravityReference(gravity)) {
    return blocked(input, "GRAVITY_EXPERIENCE_ARCHITECTURE_INVALID");
  }

  const architecture: RealityChoiceExperienceArchitecture = Object.freeze({
    semanticRole: "REALITY_CHOICE_EXPERIENCE_ARCHITECTURE",
    choiceEntryState: "GRAVITY_OBSERVATION_COMPLETED",
    inertiaAwarenessLayer: Object.freeze({
      semanticRole: "INERTIA_AWARENESS",
      awarenessMode: "RECOGNIZE_AUTOMATIC_RESPONSE",
      noBehaviorRecommendation: true,
      noUserScoring: true,
      noPersonalityJudgment: true,
    }),
    responseGapLayer: Object.freeze({
      semanticRole: "RESPONSE_GAP_OPENING",
      gapMode: "STIMULUS_TO_RESPONSE_SPACE",
      agencyMode: "USER_OWNED_PAUSE",
      noImmediateChangeRequired: true,
      noSystemDecision: true,
    }),
    alternativeResponseLayer: Object.freeze({
      semanticRole: "ALTERNATIVE_RESPONSE_POSSIBILITY",
      possibilityMode: "MULTIPLE_RESPONSES_MAY_EXIST",
      noSingleAnswer: true,
      noBehaviorPlan: true,
      noRecommendation: true,
    }),
    activeChoiceLayer: Object.freeze({
      semanticRole: "USER_OWNED_ACTIVE_CHOICE",
      agencyMode: "USER_DECIDES_WHETHER_TO_TRY",
      noAiSubstitution: true,
      noForcedAction: true,
      noTaskAssignment: true,
    }),
    choiceReadinessBoundary: Object.freeze({
      semanticRole: "CHOICE_READINESS_BOUNDARY",
      choiceReadiness: "USER_DECISION_NOT_SYSTEM_DECISION",
      noRecommendedAnswer: true,
      noBehaviorPlan: true,
      noChoiceResult: true,
      noCrystalResult: true,
    }),
    crystalPreparationBoundary: Object.freeze({
      semanticRole: "CRYSTAL_PREPARATION_BOUNDARY",
      preparationMode: "FUTURE_DEPOSIT_ONLY",
      noCrystalGeneration: true,
      noArchiveGeneration: true,
    }),
    interventionBoundary: INTERVENTION_BOUNDARY,
    readinessState: "CRYSTAL_READINESS_BOUNDARY_READY",
    gravityReference: gravity,
    gravityChoiceBoundary: "INERTIA_OBSERVATION_TO_RESPONSE_SPACE",
    genesisBoundary: "GENESIS_REMAINS_ISOLATED",
  });

  return Object.freeze({
    status: "READY" as const,
    readiness: "CRYSTAL_READINESS_BOUNDARY_READY" as const,
    source: "reality_choice_experience_architecture" as const,
    input,
    architecture,
    boundary: ARCHITECTURE_BOUNDARY,
  });
}
