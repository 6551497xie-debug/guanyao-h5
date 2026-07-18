import type {
  CrystalExperienceInterventionBoundary,
  RealityCrystalExperienceArchitecture,
  RealityCrystalExperienceArchitectureBlockedReason,
  RealityCrystalExperienceArchitectureBoundary,
  RealityCrystalExperienceArchitectureInput,
  RealityCrystalExperienceArchitectureResult,
  RealityCrystalExperienceArchitectureUnavailableReason,
} from "../types/realityCrystalExperienceArchitecture";
import type { RealityChoiceExperienceArchitecture } from "../types/realityChoiceExperienceArchitecture";

const ARCHITECTURE_BOUNDARY: RealityCrystalExperienceArchitectureBoundary =
  Object.freeze({
    architectureReviewOnly: true,
    crystalSemanticOnly: true,
    noCrystalEngine: true,
    noStorage: true,
    noArchive: true,
    noReward: true,
    noLevel: true,
    noBadge: true,
    noScore: true,
    noChoiceMutation: true,
    noChoiceEvaluation: true,
    noGenesisMutation: true,
    noIdentityMutation: true,
    noUserProfile: true,
    noUi: true,
    noRenderer: true,
    noProductionIntegration: true,
  });

const INTERVENTION_BOUNDARY: CrystalExperienceInterventionBoundary =
  Object.freeze({
    crystalExperienceOnly: true,
    noCrystalGeneration: true,
    noStorageWrite: true,
    noArchiveGeneration: true,
    noRewardLogic: true,
    noLevelLogic: true,
    noBadgeLogic: true,
    noAssetPersistence: true,
    noChoiceMutation: true,
    noChoiceEvaluation: true,
    noGenesisMutation: true,
    noIdentityMutation: true,
    noUserProfile: true,
    noUiIntegration: true,
    noRendererInvocation: true,
    noProductionIntegration: true,
    isolatedReviewOnly: true,
  });

const unavailable = (
  input: RealityCrystalExperienceArchitectureInput,
  reason: RealityCrystalExperienceArchitectureUnavailableReason,
): RealityCrystalExperienceArchitectureResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    readiness: "UNAVAILABLE" as const,
    source: "reality_crystal_experience_architecture" as const,
    reason,
    input,
    architecture: null,
    boundary: ARCHITECTURE_BOUNDARY,
  });

const blocked = (
  input: RealityCrystalExperienceArchitectureInput,
  reason: RealityCrystalExperienceArchitectureBlockedReason,
): RealityCrystalExperienceArchitectureResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    readiness: "BLOCKED" as const,
    source: "reality_crystal_experience_architecture" as const,
    reason,
    input,
    architecture: null,
    boundary: ARCHITECTURE_BOUNDARY,
  });

const isValidChoiceReference = (
  reference: RealityChoiceExperienceArchitecture,
): boolean =>
  reference.semanticRole === "REALITY_CHOICE_EXPERIENCE_ARCHITECTURE" &&
  reference.readinessState === "CRYSTAL_READINESS_BOUNDARY_READY" &&
  reference.choiceEntryState === "GRAVITY_OBSERVATION_COMPLETED" &&
  reference.gravityChoiceBoundary ===
    "INERTIA_OBSERVATION_TO_RESPONSE_SPACE" &&
  reference.genesisBoundary === "GENESIS_REMAINS_ISOLATED" &&
  reference.responseGapLayer.noImmediateChangeRequired === true &&
  reference.responseGapLayer.noSystemDecision === true &&
  reference.alternativeResponseLayer.noSingleAnswer === true &&
  reference.alternativeResponseLayer.noBehaviorPlan === true &&
  reference.alternativeResponseLayer.noRecommendation === true &&
  reference.activeChoiceLayer.noAiSubstitution === true &&
  reference.activeChoiceLayer.noForcedAction === true &&
  reference.activeChoiceLayer.noTaskAssignment === true &&
  reference.choiceReadinessBoundary.noRecommendedAnswer === true &&
  reference.choiceReadinessBoundary.noBehaviorPlan === true &&
  reference.choiceReadinessBoundary.noChoiceResult === true &&
  reference.choiceReadinessBoundary.noCrystalResult === true &&
  reference.interventionBoundary.noBehaviorGeneration === true &&
  reference.interventionBoundary.noDecisionAdvice === true &&
  reference.interventionBoundary.noTaskAssignment === true &&
  reference.interventionBoundary.noResultPrediction === true &&
  reference.interventionBoundary.noAiSubstitution === true &&
  reference.interventionBoundary.noCrystalGeneration === true;

export function reviewRealityCrystalExperienceArchitecture(
  input: RealityCrystalExperienceArchitectureInput,
): RealityCrystalExperienceArchitectureResult {
  const choice = input.choiceExperienceArchitecture;
  if (choice === null) {
    return unavailable(input, "CHOICE_EXPERIENCE_ARCHITECTURE_REQUIRED");
  }
  if (!isValidChoiceReference(choice)) {
    return blocked(input, "CHOICE_EXPERIENCE_ARCHITECTURE_INVALID");
  }

  const architecture: RealityCrystalExperienceArchitecture = Object.freeze({
    semanticRole: "REALITY_CRYSTAL_EXPERIENCE_ARCHITECTURE",
    transformationEntryState: "CHOICE_RESPONSE_OCCURRED",
    responseChangeLayer: Object.freeze({
      semanticRole: "RESPONSE_CHANGE",
      changeMode: "NEW_RESPONSE_OCCURRED",
      noTaskCompletion: true,
      noBehaviorScore: true,
      noChoiceEvaluation: true,
    }),
    lifeImprintLayer: Object.freeze({
      semanticRole: "LIFE_IMPRINT",
      imprintMode: "STRUCTURAL_CHANGE_OBSERVED",
      noLabel: true,
      noFixedPersonality: true,
      noValueJudgment: true,
    }),
    crystalFormationLayer: Object.freeze({
      semanticRole: "CRYSTAL_FORMATION_OBSERVATION",
      formationMode: "CHANGE_DEPOSIT_OBSERVED",
      noReward: true,
      noCollection: true,
      noAssetCreation: true,
      noStorageRecord: true,
    }),
    futureCarryLayer: Object.freeze({
      semanticRole: "FUTURE_CARRY",
      carryMode: "CHANGE_CARRIED_FORWARD",
      noFixedIdentity: true,
      noGenesisMutation: true,
      noUserValueJudgment: true,
    }),
    interventionBoundary: INTERVENTION_BOUNDARY,
    readinessState: "FUTURE_CRYSTAL_EXPERIENCE_BOUNDARY_READY",
    choiceReference: choice,
    choiceCrystalBoundary: "CHOICE_RESPONSE_TO_CHANGE_DEPOSIT",
    genesisBoundary: "GENESIS_SOURCE_REMAINS_UNCHANGED",
  });

  return Object.freeze({
    status: "READY" as const,
    readiness: "FUTURE_CRYSTAL_EXPERIENCE_BOUNDARY_READY" as const,
    source: "reality_crystal_experience_architecture" as const,
    input,
    architecture,
    boundary: ARCHITECTURE_BOUNDARY,
  });
}
