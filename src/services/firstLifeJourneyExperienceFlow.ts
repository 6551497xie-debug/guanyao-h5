import type {
  FirstLifeJourneyExperienceBoundary,
  FirstLifeJourneyExperienceFlow,
  FirstLifeJourneyExperienceFlowBlockedReason,
  FirstLifeJourneyExperienceFlowBoundary,
  FirstLifeJourneyExperienceFlowInput,
  FirstLifeJourneyExperienceFlowResult,
  FirstLifeJourneyExperienceFlowUnavailableReason,
} from "../types/firstLifeJourneyExperienceFlow";
import type { LifeJourneyArchitecture } from "../types/lifeJourneyArchitecture";

const FLOW_BOUNDARY: FirstLifeJourneyExperienceFlowBoundary = Object.freeze({
  flowReviewOnly: true,
  noUi: true,
  noRoute: true,
  noUserAccount: true,
  noStorage: true,
  noPayment: true,
  noIdentityCalculation: true,
  noEngineResult: true,
  noBusinessLogic: true,
  noGenesisMutation: true,
  noRealityCalculation: true,
  noCrystalGeneration: true,
  noArchiveGeneration: true,
  noProductionIntegration: true,
});

const EXPERIENCE_BOUNDARY: FirstLifeJourneyExperienceBoundary = Object.freeze({
  experienceFlowReviewOnly: true,
  noUiIntegration: true,
  noRouteIntegration: true,
  noUserAccount: true,
  noStorageWrite: true,
  noPayment: true,
  noIdentityCalculation: true,
  noEngineResult: true,
  noPageNavigation: true,
  noBusinessLogic: true,
  noGenesisMutation: true,
  noRealityCalculation: true,
  noCrystalGeneration: true,
  noArchiveGeneration: true,
  noRendererInvocation: true,
  noProductionIntegration: true,
  isolatedReviewOnly: true,
});

const unavailable = (
  input: FirstLifeJourneyExperienceFlowInput,
  reason: FirstLifeJourneyExperienceFlowUnavailableReason,
): FirstLifeJourneyExperienceFlowResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    readiness: "UNAVAILABLE" as const,
    source: "first_life_journey_experience_flow" as const,
    reason,
    input,
    flow: null,
    boundary: FLOW_BOUNDARY,
  });

const blocked = (
  input: FirstLifeJourneyExperienceFlowInput,
  reason: FirstLifeJourneyExperienceFlowBlockedReason,
): FirstLifeJourneyExperienceFlowResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    readiness: "BLOCKED" as const,
    source: "first_life_journey_experience_flow" as const,
    reason,
    input,
    flow: null,
    boundary: FLOW_BOUNDARY,
  });

const isValidJourneyReference = (
  reference: LifeJourneyArchitecture,
): boolean =>
  reference.semanticRole === "LIFE_JOURNEY_ARCHITECTURE" &&
  reference.genesisLayer.answer === "WHAT_LIFE_AM_I" &&
  reference.genesisLayer.noRealityInterpretation === true &&
  reference.realityLayer.answer === "WHAT_AM_I_EXPERIENCING" &&
  reference.realityLayer.noGenesisMutation === true &&
  reference.transformationLayer.answer === "DID_NEW_RESPONSE_OCCUR" &&
  reference.transformationLayer.noChoiceEvaluation === true &&
  reference.crystalLayer.answer === "WHAT_CHANGE_REMAINS" &&
  reference.crystalLayer.noReward === true &&
  reference.crystalLayer.noLevel === true &&
  reference.archiveBoundary.boundaryMode === "FUTURE_DIRECTION_ONLY" &&
  reference.archiveBoundary.noArchiveImplementation === true &&
  reference.archiveBoundary.noStorageSchema === true &&
  reference.boundary.noStorageWrite === true &&
  reference.boundary.noUserBinding === true &&
  reference.boundary.noCrystalGeneration === true &&
  reference.boundary.noArchiveGeneration === true &&
  reference.boundary.noIdentityCalculation === true &&
  reference.boundary.noGenesisMutation === true;

export function reviewFirstLifeJourneyExperienceFlow(
  input: FirstLifeJourneyExperienceFlowInput,
): FirstLifeJourneyExperienceFlowResult {
  const journey = input.lifeJourneyArchitecture;
  if (journey === null) {
    return unavailable(input, "LIFE_JOURNEY_ARCHITECTURE_REQUIRED");
  }
  if (!isValidJourneyReference(journey)) {
    return blocked(input, "LIFE_JOURNEY_ARCHITECTURE_INVALID");
  }

  const flow: FirstLifeJourneyExperienceFlow = Object.freeze({
    semanticRole: "FIRST_LIFE_JOURNEY_EXPERIENCE_FLOW",
    entryExperience: Object.freeze({
      semanticRole: "GUANYAO_ENTRY_EXPERIENCE",
      userState: "CURIOSITY",
      goal: "ENTER_LIFE_OBSERVATION_SPACE",
      noTestEntry: true,
      noQuestionnaireEntry: true,
      noCommercialFlow: true,
    }),
    genesisJourney: Object.freeze({
      semanticRole: "FIRST_GENESIS_JOURNEY",
      visualSequence: [
        "MOON",
        "STAR",
        "TIME",
        "SYMBOL",
        "HEXAGRAM",
        "FORCE",
        "BEAST",
      ] as const,
      userState: "EXPLORATION",
      userParticipation: "TIME_DELIVERY_ONLY",
      rhythm: "SLOW_STATIC_ENTERING",
      noUserAnimalChoice: true,
      noUserFourSymbolChoice: true,
      noUserHexagramChoice: true,
      noUserMotherCodeChoice: true,
    }),
    recognitionMoment: Object.freeze({
      semanticRole: "LIFE_RECOGNITION_MOMENT",
      userState: "CONFIRMATION",
      experience: "SEE_PERSONAL_LIFE_FORM",
      outputMode: "RECOGNITION_NOT_RESULT_REPORT",
      noResultReport: true,
      noCollectionAction: true,
    }),
    realityTransition: Object.freeze({
      semanticRole: "GENESIS_TO_REALITY_TRANSITION",
      userState: "PREPARATION",
      transitionIntent: "CARRY_RECOGNITION_INTO_WORLD",
      outputMode: "BRIDGE_NOT_ANALYSIS",
      noImmediateProblemAnalysis: true,
      noPressureResult: true,
    }),
    realityJourney: Object.freeze({
      semanticRole: "FIRST_REALITY_JOURNEY",
      stages: ["PRESSURE_RECOGNITION", "GRAVITY", "CHOICE"] as const,
      userStates: ["OBSERVATION", "AWARENESS", "SPACE_OPENING"] as const,
      rhythm: "OBSERVE_AWARE_CHOOSE",
      noTaskFlow: true,
      noGameProgression: true,
    }),
    transformationMoment: Object.freeze({
      semanticRole: "FIRST_TRANSFORMATION_MOMENT",
      userState: "ACTIVE_RESPONSE",
      choiceParticipation: "CHOICE_ACTIVE_RESPONSE",
      outputMode: "NEW_RESPONSE_NOT_SYSTEM_ANSWER",
      noSystemDecision: true,
      noBehaviorRecommendation: true,
    }),
    completionState: Object.freeze({
      semanticRole: "FIRST_CRYSTAL_COMPLETION",
      userState: "SETTLING",
      experience: "CHANGE_LEAVES_A_TRACE",
      outputMode: "DEPOSITION_NOT_REWARD",
      noReward: true,
      noLevel: true,
      noStorageRecord: true,
    }),
    stageSequence: [
      "ENTRY_TO_GUANYAO",
      "GENESIS",
      "LIFE_RECOGNITION",
      "REALITY_ENTRY",
      "PRESSURE_RECOGNITION",
      "GRAVITY",
      "CHOICE",
      "CRYSTAL",
    ] as const,
    activeParticipationNodes: ["TIME_DELIVERY", "CHOICE_ACTIVE_RESPONSE"] as const,
    lifeJourneyArchitectureReference: journey,
    boundary: EXPERIENCE_BOUNDARY,
  });

  return Object.freeze({
    status: "READY" as const,
    readiness: "FUTURE_PRODUCT_EXPERIENCE_DESIGN_READY" as const,
    source: "first_life_journey_experience_flow" as const,
    input,
    flow,
    boundary: FLOW_BOUNDARY,
  });
}
