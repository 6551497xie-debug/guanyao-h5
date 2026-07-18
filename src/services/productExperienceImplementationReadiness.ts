import type {
  FirstLifeJourneyExperienceFlow,
  FirstLifeJourneyExperienceFlowResult,
} from "../types/firstLifeJourneyExperienceFlow";
import type {
  ProductExperienceImplementationReadiness,
  ProductExperienceImplementationReadinessBlockedReason,
  ProductExperienceImplementationReadinessBoundary,
  ProductExperienceImplementationBoundary,
  ProductExperienceImplementationReadinessInput,
  ProductExperienceImplementationReadinessResult,
  ProductExperienceImplementationReadinessUnavailableReason,
  ProductExperiencePersistenceBoundary,
  ProductExperienceRuntimeBoundary,
  ProductExperienceSessionBoundary,
  ProductExperienceUIConsumptionBoundary,
  ProductExperienceUserOwnershipBoundary,
} from "../types/productExperienceImplementationReadiness";

const READINESS_BOUNDARY: ProductExperienceImplementationReadinessBoundary =
  Object.freeze({
    readinessReviewOnly: true,
    noUiImplementation: true,
    noRouteImplementation: true,
    noUserAccount: true,
    noAuthentication: true,
    noStorage: true,
    noPayment: true,
    noLifeCalculation: true,
    noEngineResult: true,
    noProductionIntegration: true,
  });

const EXPERIENCE_RUNTIME_BOUNDARY: ProductExperienceRuntimeBoundary =
  Object.freeze({
    semanticRole: "PRODUCT_EXPERIENCE_RUNTIME_BOUNDARY",
    consumes: "FIRST_LIFE_JOURNEY_EXPERIENCE_FLOW",
    owns: "EXPERIENCE_SEQUENCE_AND_CURRENT_STAGE",
    temporaryStateOnly: true,
    noLifeCalculation: true,
    noIdentityCalculation: true,
    noEngineResult: true,
    noGenesisMutation: true,
    noRealityCalculation: true,
    noCrystalGeneration: true,
  });

const UI_CONSUMPTION_BOUNDARY: ProductExperienceUIConsumptionBoundary =
  Object.freeze({
    semanticRole: "PRODUCT_EXPERIENCE_UI_CONSUMPTION_BOUNDARY",
    consumes: "EXPERIENCE_FLOW_RUNTIME_STATE_VISUAL_STATE",
    presentationAndInteractionOnly: true,
    noLifeDefinition: true,
    noIdentitySourceRead: true,
    noEngineRead: true,
    noStorageRead: true,
    noStageDefinition: true,
  });

const SESSION_BOUNDARY: ProductExperienceSessionBoundary = Object.freeze({
  semanticRole: "PRODUCT_EXPERIENCE_SESSION_BOUNDARY",
  sessionMode: "ONE_FIRST_LIFE_JOURNEY_SESSION",
  temporaryState: [
    "CURRENT_JOURNEY_STAGE",
    "CURRENT_TRANSITION",
    "CURRENT_CHOICE_WINDOW",
  ] as const,
  noLongTermPersistence: true,
  noAccountRequired: true,
  noStorageWrite: true,
  noArchiveBrowsing: true,
});

const PERSISTENCE_BOUNDARY: ProductExperiencePersistenceBoundary =
  Object.freeze({
    semanticRole: "FUTURE_PERSISTENCE_BOUNDARY",
    futureScope: ["CRYSTAL", "ARCHIVE_BOUNDARY"] as const,
    implementationState: "NOT_IMPLEMENTED",
    noStorageSchema: true,
    noStorageWrite: true,
    noDataPersistence: true,
    noArchiveImplementation: true,
  });

const USER_OWNERSHIP_BOUNDARY: ProductExperienceUserOwnershipBoundary =
  Object.freeze({
    semanticRole: "FUTURE_USER_OWNERSHIP_BOUNDARY",
    ownershipState: "NOT_IMPLEMENTED",
    futureRelation: "USER_TO_LIFE_JOURNEY",
    noUserAccount: true,
    noAuthentication: true,
    noUserBinding: true,
    noIdentityMutation: true,
  });

const FIRST_EXPERIENCE_SEQUENCE = Object.freeze([
  "ENTRY_TO_GUANYAO",
  "GENESIS",
  "LIFE_RECOGNITION",
  "REALITY_ENTRY",
  "PRESSURE_RECOGNITION",
  "GRAVITY",
  "CHOICE",
  "CRYSTAL",
] as const);

const ACTIVE_PARTICIPATION_NODES = Object.freeze([
  "TIME_DELIVERY",
  "CHOICE_ACTIVE_RESPONSE",
] as const);

const IMPLEMENTATION_BOUNDARY: ProductExperienceImplementationBoundary =
  Object.freeze({
    implementationReadinessOnly: true,
    noUiImplementation: true,
    noRouteImplementation: true,
    noSessionImplementation: true,
    noStorageImplementation: true,
    noUserAccountImplementation: true,
    noAuthenticationImplementation: true,
    noPayment: true,
    noGenesisMutation: true,
    noRealityEngineImplementation: true,
    noGravityEngineImplementation: true,
    noChoiceEngineImplementation: true,
    noCrystalEngineImplementation: true,
    noProductionIntegration: true,
    isolatedBoundaryReviewOnly: true,
  });

const unavailable = (
  input: ProductExperienceImplementationReadinessInput,
  reason: ProductExperienceImplementationReadinessUnavailableReason,
): ProductExperienceImplementationReadinessResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    readiness: "UNAVAILABLE" as const,
    source: "product_experience_implementation_readiness" as const,
    reason,
    input,
    readinessContract: null,
    boundary: READINESS_BOUNDARY,
  });

const blocked = (
  input: ProductExperienceImplementationReadinessInput,
  reason: ProductExperienceImplementationReadinessBlockedReason,
): ProductExperienceImplementationReadinessResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    readiness: "BLOCKED" as const,
    source: "product_experience_implementation_readiness" as const,
    reason,
    input,
    readinessContract: null,
    boundary: READINESS_BOUNDARY,
  });

const hasExpectedSequence = (
  values: readonly string[],
  expected: readonly string[],
): boolean =>
  values.length === expected.length &&
  values.every((value, index) => value === expected[index]);

const hasValidFlowBoundary = (flow: FirstLifeJourneyExperienceFlow): boolean =>
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

const isReadyFlow = (
  result: FirstLifeJourneyExperienceFlowResult | null,
): result is Extract<FirstLifeJourneyExperienceFlowResult, { status: "READY" }> =>
  result !== null && result.status === "READY";

export function reviewProductExperienceImplementationReadiness(
  input: ProductExperienceImplementationReadinessInput,
): ProductExperienceImplementationReadinessResult {
  const flowResult = input.firstLifeJourneyExperienceFlow;
  if (flowResult === null) {
    return unavailable(input, "FIRST_LIFE_JOURNEY_EXPERIENCE_FLOW_REQUIRED");
  }
  if (flowResult.status === "UNAVAILABLE") {
    return unavailable(
      input,
      "FIRST_LIFE_JOURNEY_EXPERIENCE_FLOW_UNAVAILABLE",
    );
  }
  if (flowResult.status === "BLOCKED") {
    return blocked(input, "FIRST_LIFE_JOURNEY_EXPERIENCE_FLOW_BLOCKED");
  }
  if (!isReadyFlow(flowResult)) {
    return blocked(input, "FIRST_LIFE_JOURNEY_FLOW_BOUNDARY_INVALID");
  }

  const flow = flowResult.flow;
  if (!hasValidFlowBoundary(flow)) {
    return blocked(input, "FIRST_LIFE_JOURNEY_FLOW_BOUNDARY_INVALID");
  }
  if (!hasExpectedSequence(flow.stageSequence, FIRST_EXPERIENCE_SEQUENCE)) {
    return blocked(input, "PRODUCT_EXPERIENCE_SEQUENCE_INVALID");
  }
  if (!hasExpectedSequence(flow.activeParticipationNodes, ACTIVE_PARTICIPATION_NODES)) {
    return blocked(input, "PRODUCT_EXPERIENCE_PARTICIPATION_BOUNDARY_INVALID");
  }

  const readinessContract: ProductExperienceImplementationReadiness =
    Object.freeze({
      semanticRole: "PRODUCT_EXPERIENCE_IMPLEMENTATION_READINESS",
      experienceRuntimeBoundary: EXPERIENCE_RUNTIME_BOUNDARY,
      uiConsumptionBoundary: UI_CONSUMPTION_BOUNDARY,
      sessionBoundary: SESSION_BOUNDARY,
      persistenceBoundary: PERSISTENCE_BOUNDARY,
      userOwnershipBoundary: USER_OWNERSHIP_BOUNDARY,
      firstExperienceSequence: FIRST_EXPERIENCE_SEQUENCE,
      activeParticipationNodes: ACTIVE_PARTICIPATION_NODES,
      firstLifeJourneyExperienceFlowReference: flow,
      readinessState: "READY_FOR_PRODUCT_EXPERIENCE_IMPLEMENTATION_DESIGN",
      boundary: IMPLEMENTATION_BOUNDARY,
    });

  return Object.freeze({
    status: "READY" as const,
    readiness: "READY_FOR_PRODUCT_EXPERIENCE_IMPLEMENTATION_DESIGN" as const,
    source: "product_experience_implementation_readiness" as const,
    input,
    readinessContract,
    boundary: READINESS_BOUNDARY,
  });
}
