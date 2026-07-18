import type {
  FirstLifeJourneyProductFlow,
  FirstLifeJourneyProductFlowResult,
} from "../types/firstLifeJourneyProductFlow";
import type {
  LifeJourneyUIRuntimeConsumptionBoundary,
  LifeJourneyUIRuntimeExperienceRuntimeReference,
  LifeJourneyUIRuntimeImplementationBoundary,
  LifeJourneyUIRuntimeInteractionBoundary,
  LifeJourneyUIRuntimeNavigationBoundary,
  LifeJourneyUIRuntimeReadiness,
  LifeJourneyUIRuntimeReadinessBlockedReason,
  LifeJourneyUIRuntimeReadinessBoundary,
  LifeJourneyUIRuntimeReadinessInput,
  LifeJourneyUIRuntimeReadinessResult,
  LifeJourneyUIRuntimeReadinessUnavailableReason,
  LifeJourneyUIRuntimeSpaceStructure,
  LifeJourneyUIRuntimeVisualPresentationBoundary,
} from "../types/lifeJourneyUIRuntimeReadiness";

const REVIEW_BOUNDARY: LifeJourneyUIRuntimeReadinessBoundary = Object.freeze({
  readinessReviewOnly: true,
  noUiImplementation: true,
  noPageImplementation: true,
  noRouteImplementation: true,
  noStorage: true,
  noUserAccount: true,
  noAuthentication: true,
  noEngineResult: true,
  noProductionIntegration: true,
});

const EXPERIENCE_RUNTIME_REFERENCE: LifeJourneyUIRuntimeExperienceRuntimeReference =
  Object.freeze({
    semanticRole: "UI_RUNTIME_EXPERIENCE_RUNTIME_REFERENCE",
    source: "FIRST_LIFE_JOURNEY_PRODUCT_FLOW",
    runtimeInput: "PRODUCT_FLOW_RUNTIME_STATE_VISUAL_STATE",
    runtimeOutput: "CURRENT_STAGE_AND_ALLOWED_USER_ACTION",
    noLifeCalculation: true,
    noIdentityRead: true,
    noEngineResult: true,
    noStorageState: true,
  });

const UI_CONSUMPTION_BOUNDARY: LifeJourneyUIRuntimeConsumptionBoundary =
  Object.freeze({
    semanticRole: "UI_RUNTIME_CONSUMPTION_BOUNDARY",
    consumes: "RUNTIME_STATE_AND_VISUAL_STATE",
    presentationOnly: true,
    interactionSurfaceOnly: true,
    noLifeDefinition: true,
    noEngineInvocation: true,
    noIdentitySourceRead: true,
    noStorageRead: true,
  });

const INTERACTION_BOUNDARY: LifeJourneyUIRuntimeInteractionBoundary =
  Object.freeze({
    semanticRole: "UI_RUNTIME_INTERACTION_BOUNDARY",
    allowedUserActions: ["TIME_DELIVERY", "CHOICE_ACTIVE_RESPONSE"] as const,
    automaticStages: [
      "ENTRY_TO_GUANYAO",
      "GENESIS_REVEAL",
      "LIFE_RECOGNITION",
      "REALITY_ENTRY",
      "PRESSURE_RECOGNITION",
      "GRAVITY",
      "CRYSTAL_SETTLING",
    ] as const,
    actionResponseRoute: "USER_ACTION_TO_RUNTIME_RESPONSE",
    noLifeSourceEditing: true,
    noAnimalSelection: true,
    noFourSymbolSelection: true,
    noHexagramSelection: true,
    noForceSelection: true,
  });

const VISUAL_PRESENTATION_BOUNDARY: LifeJourneyUIRuntimeVisualPresentationBoundary =
  Object.freeze({
    semanticRole: "UI_RUNTIME_VISUAL_PRESENTATION_BOUNDARY",
    consumes: "VISUAL_STATE_REFERENCE",
    presentationOnly: true,
    noVisualSemanticCreation: true,
    noRendererCalculation: true,
    noIdentityRead: true,
    noEngineRead: true,
    noVisualStateMutation: true,
  });

const NAVIGATION_BOUNDARY: LifeJourneyUIRuntimeNavigationBoundary = Object.freeze({
  semanticRole: "UI_RUNTIME_NAVIGATION_BOUNDARY",
  navigationMode: "EXPERIENCE_STAGE_TRANSITION_ONLY",
  spaces: ["GENESIS_SPACE", "RECOGNITION_SPACE", "REALITY_SPACE", "CRYSTAL_SPACE"] as const,
  noRouteImplementation: true,
  noPageNavigation: true,
  noExternalNavigation: true,
  noBusinessFlow: true,
});

const SPACE_STRUCTURE: LifeJourneyUIRuntimeSpaceStructure = Object.freeze({
  semanticRole: "LIFE_JOURNEY_SPACE_STRUCTURE",
  genesisSpace: "MOON_TO_STAR_BEAST_WITH_TIME_DELIVERY",
  recognitionSpace: "LIFE_RECOGNITION_WITH_REALITY_ENTRY_CONFIRMATION",
  realitySpace: "PRESSURE_TO_GRAVITY_TO_CHOICE",
  crystalSpace: "CHANGE_DEPOSITION_OBSERVATION",
  noPageComponentDefinition: true,
  noRouteDefinition: true,
});

const IMPLEMENTATION_BOUNDARY: LifeJourneyUIRuntimeImplementationBoundary =
  Object.freeze({
    uiRuntimeReadinessOnly: true,
    noReactComponentImplementation: true,
    noPageImplementation: true,
    noRouteImplementation: true,
    noUiRendering: true,
    noStorageImplementation: true,
    noSessionPersistence: true,
    noUserAccount: true,
    noAuthentication: true,
    noPayment: true,
    noGenesisMutation: true,
    noRealityEngineImplementation: true,
    noGravityEngineImplementation: true,
    noChoiceEngineImplementation: true,
    noCrystalEngineImplementation: true,
    noProductionIntegration: true,
    isolatedReadinessReviewOnly: true,
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
  input: LifeJourneyUIRuntimeReadinessInput,
  reason: LifeJourneyUIRuntimeReadinessUnavailableReason,
): LifeJourneyUIRuntimeReadinessResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    readiness: "UNAVAILABLE" as const,
    source: "life_journey_ui_runtime_readiness" as const,
    reason,
    input,
    readinessContract: null,
    boundary: REVIEW_BOUNDARY,
  });

const blocked = (
  input: LifeJourneyUIRuntimeReadinessInput,
  reason: LifeJourneyUIRuntimeReadinessBlockedReason,
): LifeJourneyUIRuntimeReadinessResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    readiness: "BLOCKED" as const,
    source: "life_journey_ui_runtime_readiness" as const,
    reason,
    input,
    readinessContract: null,
    boundary: REVIEW_BOUNDARY,
  });

const hasExpectedSequence = (
  values: readonly string[],
  expected: readonly string[],
): boolean =>
  values.length === expected.length &&
  values.every((value, index) => value === expected[index]);

const isReadyProductFlow = (
  result: FirstLifeJourneyProductFlowResult | null,
): result is Extract<FirstLifeJourneyProductFlowResult, { status: "READY" }> =>
  result !== null && result.status === "READY";

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

export function reviewLifeJourneyUIRuntimeReadiness(
  input: LifeJourneyUIRuntimeReadinessInput,
): LifeJourneyUIRuntimeReadinessResult {
  const productFlowResult = input.firstLifeJourneyProductFlow;
  if (productFlowResult === null) {
    return unavailable(input, "FIRST_LIFE_JOURNEY_PRODUCT_FLOW_REQUIRED");
  }
  if (productFlowResult.status === "UNAVAILABLE") {
    return unavailable(
      input,
      "FIRST_LIFE_JOURNEY_PRODUCT_FLOW_UNAVAILABLE",
    );
  }
  if (productFlowResult.status === "BLOCKED") {
    return blocked(input, "FIRST_LIFE_JOURNEY_PRODUCT_FLOW_BLOCKED");
  }
  if (!isReadyProductFlow(productFlowResult)) {
    return blocked(input, "FIRST_LIFE_JOURNEY_PRODUCT_FLOW_BOUNDARY_INVALID");
  }

  const productFlow = productFlowResult.productFlow;
  if (!hasValidProductFlowBoundary(productFlow)) {
    return blocked(input, "FIRST_LIFE_JOURNEY_PRODUCT_FLOW_BOUNDARY_INVALID");
  }
  if (!hasExpectedSequence(productFlow.stageSequence, EXPERIENCE_SEQUENCE)) {
    return blocked(input, "UI_RUNTIME_SEQUENCE_INVALID");
  }
  if (!hasExpectedSequence(productFlow.userInteractionPoints, [
    "TIME_DELIVERY",
    "CHOICE_ACTIVE_RESPONSE",
  ])) {
    return blocked(input, "UI_RUNTIME_INTERACTION_BOUNDARY_INVALID");
  }

  const readinessContract: LifeJourneyUIRuntimeReadiness = Object.freeze({
    semanticRole: "LIFE_JOURNEY_UI_RUNTIME_READINESS",
    experienceRuntimeReference: EXPERIENCE_RUNTIME_REFERENCE,
    uiConsumptionBoundary: UI_CONSUMPTION_BOUNDARY,
    interactionBoundary: INTERACTION_BOUNDARY,
    visualPresentationBoundary: VISUAL_PRESENTATION_BOUNDARY,
    navigationBoundary: NAVIGATION_BOUNDARY,
    spaceStructure: SPACE_STRUCTURE,
    experienceSequence: EXPERIENCE_SEQUENCE,
    productFlowReference: productFlow,
    readinessState: "READY_FOR_UI_RUNTIME_IMPLEMENTATION",
    boundary: IMPLEMENTATION_BOUNDARY,
  });

  return Object.freeze({
    status: "READY" as const,
    readiness: "READY_FOR_UI_RUNTIME_IMPLEMENTATION" as const,
    source: "life_journey_ui_runtime_readiness" as const,
    input,
    readinessContract,
    boundary: REVIEW_BOUNDARY,
  });
}
