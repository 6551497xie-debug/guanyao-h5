import type {
  FirstLifeJourneyExperienceFlow,
  FirstLifeJourneyExperienceFlowResult,
} from "../types/firstLifeJourneyExperienceFlow";
import type {
  FirstLifeJourneyProductFlow,
  FirstLifeJourneyProductFlowBlockedReason,
  FirstLifeJourneyProductFlowBoundary,
  FirstLifeJourneyProductFlowInput,
  FirstLifeJourneyProductFlowResult,
  FirstLifeJourneyProductFlowReviewBoundary,
  FirstLifeJourneyProductFlowUnavailableReason,
} from "../types/firstLifeJourneyProductFlow";

const REVIEW_BOUNDARY: FirstLifeJourneyProductFlowReviewBoundary =
  Object.freeze({
    flowDesignReviewOnly: true,
    noUiImplementation: true,
    noRouteImplementation: true,
    noStorage: true,
    noUserAccount: true,
    noAuthentication: true,
    noPayment: true,
    noEngineResult: true,
    noProductionIntegration: true,
  });

const PRODUCT_FLOW_BOUNDARY: FirstLifeJourneyProductFlowBoundary = Object.freeze({
  productFlowDesignOnly: true,
  noUiStructure: true,
  noPageComponents: true,
  noRouteNavigation: true,
  noStorageSchema: true,
  noStorageWrite: true,
  noUserAccount: true,
  noAuthentication: true,
  noPayment: true,
  noSessionImplementation: true,
  noPersistence: true,
  noGenesisMutation: true,
  noRealityEngineImplementation: true,
  noGravityEngineImplementation: true,
  noChoiceEngineImplementation: true,
  noCrystalEngineImplementation: true,
  noProductionIntegration: true,
  isolatedDesignOnly: true,
});

const STAGE_SEQUENCE = Object.freeze([
  "ENTRY_TO_GUANYAO",
  "GENESIS",
  "LIFE_RECOGNITION",
  "REALITY_ENTRY",
  "PRESSURE_RECOGNITION",
  "GRAVITY",
  "CHOICE",
  "CRYSTAL",
] as const);

const INTERACTION_POINTS = Object.freeze([
  "TIME_DELIVERY",
  "CHOICE_ACTIVE_RESPONSE",
] as const);

const unavailable = (
  input: FirstLifeJourneyProductFlowInput,
  reason: FirstLifeJourneyProductFlowUnavailableReason,
): FirstLifeJourneyProductFlowResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    readiness: "UNAVAILABLE" as const,
    source: "first_life_journey_product_flow" as const,
    reason,
    input,
    productFlow: null,
    boundary: REVIEW_BOUNDARY,
  });

const blocked = (
  input: FirstLifeJourneyProductFlowInput,
  reason: FirstLifeJourneyProductFlowBlockedReason,
): FirstLifeJourneyProductFlowResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    readiness: "BLOCKED" as const,
    source: "first_life_journey_product_flow" as const,
    reason,
    input,
    productFlow: null,
    boundary: REVIEW_BOUNDARY,
  });

const hasExpectedSequence = (
  values: readonly string[],
  expected: readonly string[],
): boolean =>
  values.length === expected.length &&
  values.every((value, index) => value === expected[index]);

const isReadyFlow = (
  result: FirstLifeJourneyExperienceFlowResult | null,
): result is Extract<FirstLifeJourneyExperienceFlowResult, { status: "READY" }> =>
  result !== null && result.status === "READY";

const hasValidUpstreamBoundary = (flow: FirstLifeJourneyExperienceFlow): boolean =>
  flow.boundary.noUiIntegration === true &&
  flow.boundary.noRouteIntegration === true &&
  flow.boundary.noUserAccount === true &&
  flow.boundary.noStorageWrite === true &&
  flow.boundary.noPayment === true &&
  flow.boundary.noIdentityCalculation === true &&
  flow.boundary.noEngineResult === true &&
  flow.boundary.noPageNavigation === true &&
  flow.boundary.noBusinessLogic === true &&
  flow.boundary.noGenesisMutation === true &&
  flow.boundary.noRealityCalculation === true &&
  flow.boundary.noCrystalGeneration === true &&
  flow.boundary.noArchiveGeneration === true &&
  flow.boundary.noRendererInvocation === true &&
  flow.boundary.noProductionIntegration === true &&
  flow.boundary.isolatedReviewOnly === true;

export function reviewFirstLifeJourneyProductFlow(
  input: FirstLifeJourneyProductFlowInput,
): FirstLifeJourneyProductFlowResult {
  const experienceFlowResult = input.firstLifeJourneyExperienceFlow;
  if (experienceFlowResult === null) {
    return unavailable(input, "FIRST_LIFE_JOURNEY_EXPERIENCE_FLOW_REQUIRED");
  }
  if (experienceFlowResult.status === "UNAVAILABLE") {
    return unavailable(
      input,
      "FIRST_LIFE_JOURNEY_EXPERIENCE_FLOW_UNAVAILABLE",
    );
  }
  if (experienceFlowResult.status === "BLOCKED") {
    return blocked(input, "FIRST_LIFE_JOURNEY_EXPERIENCE_FLOW_BLOCKED");
  }
  if (!isReadyFlow(experienceFlowResult)) {
    return blocked(input, "FIRST_LIFE_JOURNEY_EXPERIENCE_FLOW_BOUNDARY_INVALID");
  }

  const flow = experienceFlowResult.flow;
  if (!hasValidUpstreamBoundary(flow)) {
    return blocked(input, "FIRST_LIFE_JOURNEY_EXPERIENCE_FLOW_BOUNDARY_INVALID");
  }
  if (!hasExpectedSequence(flow.stageSequence, STAGE_SEQUENCE)) {
    return blocked(input, "FIRST_PRODUCT_FLOW_SEQUENCE_INVALID");
  }
  if (!hasExpectedSequence(flow.activeParticipationNodes, INTERACTION_POINTS)) {
    return blocked(input, "FIRST_PRODUCT_FLOW_INTERACTION_BOUNDARY_INVALID");
  }

  const productFlow: FirstLifeJourneyProductFlow = Object.freeze({
    semanticRole: "FIRST_LIFE_JOURNEY_PRODUCT_FLOW",
    entryStage: Object.freeze({
      stage: "ENTRY_TO_GUANYAO",
      userPsychology: "CURIOSITY",
      experienceGoal: "ENTER_LIFE_OBSERVATION_SPACE",
      systemResponse: "OPEN_OBSERVATION_SPACE",
      userAction: "NONE_AUTOMATIC_ENTRY",
      noTestFeeling: true,
      noQuestionnaireFeeling: true,
      noCommercialFlow: true,
    }),
    genesisExperienceStage: Object.freeze({
      stage: "GENESIS",
      userPsychology: "EXPLORATION",
      visualSequence: [
        "MOON",
        "STAR",
        "TIME",
        "SYMBOL",
        "HEXAGRAM",
        "FORCE",
        "BEAST",
      ] as const,
      userAction: "TIME_DELIVERY",
      autoReveal: true,
      rhythm: "ENTERING",
      noAnimalSelection: true,
      noFourSymbolSelection: true,
      noHexagramSelection: true,
      noForceSelection: true,
      recognitionMoment: Object.freeze({
        stage: "LIFE_RECOGNITION",
        userPsychology: "CONFIRMATION",
        experience: "SEE_PERSONAL_LIFE_FORM",
        outputMode: "RECOGNITION_NOT_RESULT_REPORT",
        noResultReport: true,
      }),
    }),
    realityTransitionStage: Object.freeze({
      stage: "REALITY_ENTRY",
      userPsychology: "PREPARATION",
      experience: "CARRY_RECOGNITION_INTO_REALITY",
      systemResponse: "BRIDGE_TO_REALITY",
      noImmediateProblemAnalysis: true,
      noPressureResult: true,
    }),
    realityExperienceStage: Object.freeze({
      stage: "REALITY_EXPERIENCE",
      pressure: Object.freeze({
        stage: "PRESSURE_RECOGNITION",
        userPsychology: "OBSERVATION",
        experience: "REALITY_TENSION_APPEARS",
        systemRole: "REFLECT_REALITY_SIGNALS",
      }),
      gravity: Object.freeze({
        stage: "GRAVITY",
        userPsychology: "AWARENESS",
        experience: "SEE_INERTIA_IN_OPERATION",
        systemRole: "REFLECT_AUTOMATIC_RESPONSE",
      }),
      choice: Object.freeze({
        stage: "CHOICE",
        userPsychology: "ACTIVE",
        experience: "NEW_RESPONSE_BECOMES_POSSIBLE",
        userAction: "CHOICE_ACTIVE_RESPONSE",
        systemRole: "OPEN_RESPONSE_SPACE",
      }),
      noTaskFlow: true,
      noGameProgression: true,
      noStrongGuidance: true,
    }),
    transformationStage: Object.freeze({
      stage: "TRANSFORMATION",
      userPsychology: "ACTIVE",
      userAction: "CHOICE_ACTIVE_RESPONSE",
      experience: "A_NEW_RESPONSE_OCCURS",
      systemRole: "WITNESS_CHANGE_NOT_EVALUATE",
      noSystemAnswer: true,
      noBehaviorRecommendation: true,
    }),
    completionStage: Object.freeze({
      stage: "CRYSTAL",
      userPsychology: "SETTLING",
      experience: "CHANGE_LEAVES_AN_IMPRINT",
      systemResponse: "DEPOSIT_CHANGE_NOT_REWARD",
      noRewardFeeling: true,
      noLevelFeeling: true,
      noCollectionFeeling: true,
    }),
    userInteractionPoints: INTERACTION_POINTS,
    stageSequence: STAGE_SEQUENCE,
    firstLifeJourneyExperienceFlowReference: flow,
    boundary: PRODUCT_FLOW_BOUNDARY,
  });

  return Object.freeze({
    status: "READY" as const,
    readiness: "READY_FOR_FIRST_PRODUCT_EXPERIENCE_DESIGN" as const,
    source: "first_life_journey_product_flow" as const,
    input,
    productFlow,
    boundary: REVIEW_BOUNDARY,
  });
}
