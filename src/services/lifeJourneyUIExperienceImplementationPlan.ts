import type {
  FirstLifeJourneyProductFlow,
  FirstLifeJourneyProductFlowResult,
} from "../types/firstLifeJourneyProductFlow";
import type {
  LifeJourneyUIRuntimeReadiness,
  LifeJourneyUIRuntimeReadinessResult,
} from "../types/lifeJourneyUIRuntimeReadiness";
import type {
  LifeJourneyUIExperienceImplementationBoundary,
  LifeJourneyUIExperienceImplementationPlan,
  LifeJourneyUIExperienceImplementationPlanBlockedReason,
  LifeJourneyUIExperienceImplementationPlanInput,
  LifeJourneyUIExperienceImplementationPlanResult,
  LifeJourneyUIExperienceImplementationPlanReviewBoundary,
  LifeJourneyUIExperienceImplementationPlanUnavailableReason,
  LifeJourneyUIExperienceImplementationScope,
  LifeJourneyUIExperienceInteractionMapping,
  LifeJourneyUIExperienceRuntimeConsumption,
  LifeJourneyUIExperienceSpaceArchitecture,
  LifeJourneyUIExperienceStagePresentation,
  LifeJourneyUIExperienceVisualConsumption,
} from "../types/lifeJourneyUIExperienceImplementationPlan";

const REVIEW_BOUNDARY: LifeJourneyUIExperienceImplementationPlanReviewBoundary =
  Object.freeze({
    planReviewOnly: true,
    noUiImplementation: true,
    noRouteImplementation: true,
    noStorage: true,
    noUserAccount: true,
    noAuthentication: true,
    noEngineResult: true,
    noProductionIntegration: true,
  });

const IMPLEMENTATION_BOUNDARY: LifeJourneyUIExperienceImplementationBoundary =
  Object.freeze({
    implementationPlanOnly: true,
    noUiComponentCode: true,
    noPageImplementation: true,
    noRouteImplementation: true,
    noRuntimeWiring: true,
    noStorageSchema: true,
    noStorageWrite: true,
    noSessionPersistence: true,
    noUserAccount: true,
    noAuthentication: true,
    noPayment: true,
    noEngineResult: true,
    noGenesisMutation: true,
    noRealityMutation: true,
    noCrystalGeneration: true,
    noProductionIntegration: true,
    isolatedPlanOnly: true,
  });

const EXPERIENCE_SEQUENCE = Object.freeze([
  "ENTRY_TO_GUANYAO",
  "GENESIS",
  "LIFE_RECOGNITION",
  "REALITY_ENTRY",
  "PRESSURE_RECOGNITION",
  "GRAVITY",
  "CHOICE",
  "CRYSTAL",
] as const);

const unavailable = (
  input: LifeJourneyUIExperienceImplementationPlanInput,
  reason: LifeJourneyUIExperienceImplementationPlanUnavailableReason,
): LifeJourneyUIExperienceImplementationPlanResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    readiness: "UNAVAILABLE" as const,
    source: "life_journey_ui_experience_implementation_plan" as const,
    reason,
    input,
    plan: null,
    boundary: REVIEW_BOUNDARY,
  });

const blocked = (
  input: LifeJourneyUIExperienceImplementationPlanInput,
  reason: LifeJourneyUIExperienceImplementationPlanBlockedReason,
): LifeJourneyUIExperienceImplementationPlanResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    readiness: "BLOCKED" as const,
    source: "life_journey_ui_experience_implementation_plan" as const,
    reason,
    input,
    plan: null,
    boundary: REVIEW_BOUNDARY,
  });

const hasExpectedSequence = (
  values: readonly string[],
  expected: readonly string[],
): boolean =>
  values.length === expected.length &&
  values.every((value, index) => value === expected[index]);

const isReadyRuntime = (
  result: LifeJourneyUIRuntimeReadinessResult | null,
): result is Extract<LifeJourneyUIRuntimeReadinessResult, { status: "READY" }> =>
  result !== null && result.status === "READY";

const hasValidRuntimeBoundary = (
  readiness: LifeJourneyUIRuntimeReadiness,
): boolean =>
  readiness.boundary.uiRuntimeReadinessOnly === true &&
  readiness.boundary.noReactComponentImplementation === true &&
  readiness.boundary.noPageImplementation === true &&
  readiness.boundary.noRouteImplementation === true &&
  readiness.boundary.noUiRendering === true &&
  readiness.boundary.noStorageImplementation === true &&
  readiness.boundary.noSessionPersistence === true &&
  readiness.boundary.noUserAccount === true &&
  readiness.boundary.noAuthentication === true &&
  readiness.boundary.noPayment === true &&
  readiness.boundary.noGenesisMutation === true &&
  readiness.boundary.noRealityEngineImplementation === true &&
  readiness.boundary.noGravityEngineImplementation === true &&
  readiness.boundary.noChoiceEngineImplementation === true &&
  readiness.boundary.noCrystalEngineImplementation === true &&
  readiness.boundary.noProductionIntegration === true &&
  readiness.boundary.isolatedReadinessReviewOnly === true;

const hasValidProductFlowBoundary = (
  flow: FirstLifeJourneyProductFlow,
): boolean =>
  flow.boundary.productFlowDesignOnly === true &&
  flow.boundary.noUiStructure === true &&
  flow.boundary.noPageComponents === true &&
  flow.boundary.noRouteNavigation === true &&
  flow.boundary.noStorageSchema === true &&
  flow.boundary.noStorageWrite === true &&
  flow.boundary.noUserAccount === true &&
  flow.boundary.noAuthentication === true &&
  flow.boundary.noPayment === true &&
  flow.boundary.noSessionImplementation === true &&
  flow.boundary.noPersistence === true &&
  flow.boundary.noGenesisMutation === true &&
  flow.boundary.noRealityEngineImplementation === true &&
  flow.boundary.noGravityEngineImplementation === true &&
  flow.boundary.noChoiceEngineImplementation === true &&
  flow.boundary.noCrystalEngineImplementation === true &&
  flow.boundary.noProductionIntegration === true &&
  flow.boundary.isolatedDesignOnly === true;

const SPACE_ARCHITECTURE: LifeJourneyUIExperienceSpaceArchitecture =
  Object.freeze({
    semanticRole: "LIFE_JOURNEY_UI_SPACE_ARCHITECTURE",
    spaces: [
      "GENESIS_SPACE",
      "RECOGNITION_SPACE",
      "REALITY_SPACE",
      "CRYSTAL_SPACE",
    ] as const,
    genesisSpace: Object.freeze({
      purpose: "LIFE_REVELATION_SPACE",
      consumes: ["GENESIS_RUNTIME_STATE", "GENESIS_VISUAL_STATE"] as const,
      presentation: "MOON_TO_STAR_BEAST",
      allowedInteraction: "TIME_DELIVERY",
      noLifeFormSelection: true,
      noGenesisEditing: true,
    }),
    recognitionSpace: Object.freeze({
      purpose: "LIFE_RECOGNITION_SPACE",
      consumes: ["COMPLETION_STATE", "PRESENCE_STATE"] as const,
      presentation: "PERSONAL_STAR_BEAST_PRESENCE_AND_RECOGNITION",
      allowedInteraction: "CONFIRM_REALITY_ENTRY",
      noResultReport: true,
    }),
    realitySpace: Object.freeze({
      purpose: "REALITY_EXPERIENCE_SPACE",
      consumes: ["PRESSURE_STATE", "GRAVITY_STATE", "CHOICE_STATE"] as const,
      presentation: "PRESSURE_TO_GRAVITY_TO_CHOICE",
      allowedInteraction: "CHOICE_ACTIVE_RESPONSE",
      noAiChoice: true,
    }),
    crystalSpace: Object.freeze({
      purpose: "CHANGE_DEPOSITION_SPACE",
      consumes: "CRYSTAL_EXPERIENCE_STATE",
      presentation: ["CHANGE_IMPRINT", "FUTURE_CARRY"] as const,
      allowedInteraction: "OBSERVE",
      noRewardPresentation: true,
    }),
    noPageComponentDefinition: true,
    noRouteDefinition: true,
  });

const STAGE_PRESENTATION: LifeJourneyUIExperienceStagePresentation =
  Object.freeze({
    semanticRole: "UI_STAGE_PRESENTATION_RULE",
    source: "RUNTIME_STATE_AND_VISUAL_STATE",
    presentationOnly: true,
    stageOrder: EXPERIENCE_SEQUENCE,
    noLifeDefinition: true,
    noIdentityInterpretation: true,
  });

const INTERACTION_MAPPING: LifeJourneyUIExperienceInteractionMapping =
  Object.freeze({
    semanticRole: "UI_INTERACTION_MAPPING",
    timeDelivery: Object.freeze({
      inputStage: "TIME_RESONANCE",
      userAction: "TIME_DELIVERY",
      runtimeEvent: "TIME_DELIVERY_EVENT",
      response: "ADVANCE_GENESIS_RUNTIME",
    }),
    recognitionConfirmation: Object.freeze({
      inputStage: "LIFE_RECOGNITION",
      userAction: "CONFIRM_REALITY_ENTRY",
      runtimeEvent: "REALITY_ENTRY_CONFIRMATION_EVENT",
      response: "ADVANCE_REALITY_ENTRY",
    }),
    choiceResponse: Object.freeze({
      inputStage: "CHOICE",
      userAction: "CHOICE_ACTIVE_RESPONSE",
      runtimeEvent: "CHOICE_ACTIVE_RESPONSE_EVENT",
      response: "ADVANCE_TRANSFORMATION",
    }),
    automaticStages: [
      "ENTRY_TO_GUANYAO",
      "GENESIS_REVEAL",
      "PRESSURE_RECOGNITION",
      "GRAVITY",
      "CRYSTAL_SETTLING",
    ] as const,
    noEngineInvocation: true,
    noStageMutation: true,
  });

const RUNTIME_CONSUMPTION: LifeJourneyUIExperienceRuntimeConsumption =
  Object.freeze({
    semanticRole: "UI_RUNTIME_CONSUMPTION_MAPPING",
    input: "RUNTIME_STATE",
    output: "UI_PRESENTATION_AND_INTERACTION_EVENT",
    responsePath: "RUNTIME_EVENT_TO_RUNTIME_RESPONSE",
    runtimeOwnsStage: true,
    runtimeOwnsTransition: true,
    uiDoesNotAdvanceStage: true,
    uiDoesNotCallEngine: true,
  });

const VISUAL_CONSUMPTION: LifeJourneyUIExperienceVisualConsumption =
  Object.freeze({
    semanticRole: "UI_VISUAL_CONSUMPTION_MAPPING",
    input: "VISUAL_STATE_REFERENCE",
    output: "PRESENTATION_ONLY",
    noVisualSemanticCreation: true,
    noRendererCommandCreation: true,
    noVisualStateMutation: true,
  });

const IMPLEMENTATION_SCOPE: LifeJourneyUIExperienceImplementationScope =
  Object.freeze({
    firstVersion: [
      "GENESIS_SPACE",
      "RECOGNITION_SPACE",
      "REALITY_ENTRY",
    ] as const,
    deferred: [
      "COMPLETE_REALITY_EXPERIENCE",
      "CRYSTAL_PERSISTENCE",
      "ARCHIVE",
      "USER_ACCOUNT",
    ] as const,
    rationale: "COMPLETE_FIRST_LIFE_RECOGNITION_BEFORE_LONG_TERM_SYSTEMS",
  });

export function reviewLifeJourneyUIExperienceImplementationPlan(
  input: LifeJourneyUIExperienceImplementationPlanInput,
): LifeJourneyUIExperienceImplementationPlanResult {
  const runtimeResult = input.uiRuntimeReadiness;
  if (runtimeResult === null) {
    return unavailable(input, "UI_RUNTIME_READINESS_REQUIRED");
  }
  if (runtimeResult.status === "UNAVAILABLE") {
    return unavailable(input, "UI_RUNTIME_READINESS_UNAVAILABLE");
  }
  if (runtimeResult.status === "BLOCKED") {
    return blocked(input, "UI_RUNTIME_READINESS_BLOCKED");
  }
  if (!isReadyRuntime(runtimeResult)) {
    return blocked(input, "UI_RUNTIME_READINESS_BOUNDARY_INVALID");
  }

  const readiness = runtimeResult.readinessContract;
  if (!hasValidRuntimeBoundary(readiness)) {
    return blocked(input, "UI_RUNTIME_READINESS_BOUNDARY_INVALID");
  }
  if (!hasExpectedSequence(readiness.experienceSequence, EXPERIENCE_SEQUENCE)) {
    return blocked(input, "UI_EXPERIENCE_SEQUENCE_INVALID");
  }
  if (!hasExpectedSequence(readiness.interactionBoundary.allowedUserActions, [
    "TIME_DELIVERY",
    "CHOICE_ACTIVE_RESPONSE",
  ])) {
    return blocked(input, "UI_INTERACTION_MAPPING_INVALID");
  }
  if (!hasValidProductFlowBoundary(readiness.productFlowReference)) {
    return blocked(input, "UI_RUNTIME_READINESS_BOUNDARY_INVALID");
  }

  const plan: LifeJourneyUIExperienceImplementationPlan = Object.freeze({
    semanticRole: "LIFE_JOURNEY_UI_EXPERIENCE_IMPLEMENTATION_PLAN",
    spaceArchitecture: SPACE_ARCHITECTURE,
    stagePresentation: STAGE_PRESENTATION,
    interactionMapping: INTERACTION_MAPPING,
    runtimeConsumption: RUNTIME_CONSUMPTION,
    visualConsumption: VISUAL_CONSUMPTION,
    implementationBoundary: IMPLEMENTATION_BOUNDARY,
    implementationScope: IMPLEMENTATION_SCOPE,
    uiRuntimeReadinessReference: readiness,
    readinessState: "READY_FOR_UI_EXPERIENCE_IMPLEMENTATION",
  });

  return Object.freeze({
    status: "READY" as const,
    readiness: "READY_FOR_UI_EXPERIENCE_IMPLEMENTATION" as const,
    source: "life_journey_ui_experience_implementation_plan" as const,
    input,
    plan,
    boundary: REVIEW_BOUNDARY,
  });
}
