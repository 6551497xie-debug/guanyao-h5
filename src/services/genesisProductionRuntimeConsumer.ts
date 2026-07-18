import type { GenesisRuntimeStage } from "../types/genesisRuntimeStateMachine";
import type {
  GenesisProductionRuntimeAdvanceInput,
  GenesisProductionRuntimeBlockedReason,
  GenesisProductionRuntimeConsumerBoundary,
  GenesisProductionRuntimeConsumerResult,
  GenesisProductionRuntimeInitializeInput,
  GenesisProductionRuntimeInteraction,
  GenesisProductionRuntimeOperation,
  GenesisProductionRuntimeSession,
} from "../types/genesisProductionRuntimeConsumer";
import type { GenesisTransitionTimelineStage } from "../types/genesisTransitionTimeline";

export const GENESIS_PRODUCTION_RUNTIME_CONSUMER_BOUNDARY:
  GenesisProductionRuntimeConsumerBoundary = Object.freeze({
    productionRuntimeConsumerOnly: true,
    authorizedProductionGenesisOnly: true,
    immutableSessionOnly: true,
    frozenStageOrderOnly: true,
    frozenTimelineSemanticsOnly: true,
    timeDeliveryOnlyInteraction: true,
    completionRecognitionHoldRequired: true,
    noPreviewFixture: true,
    noVisualStateCreation: true,
    noRenderPlanConsumption: true,
    noProjectionMutation: true,
    noEngineResult: true,
    noUserData: true,
    noEngineInvocation: true,
    noRendererInvocation: true,
    noRendererCoreInvocation: true,
    noRouteRegistration: true,
    noNavigationMutation: true,
    noReality: true,
    noPressure: true,
    noGravity: true,
    noChoice: true,
    noCrystal: true,
    noStorageWrite: true,
  });

const STAGE_ORDER = Object.freeze([
  "MOON_ORIGIN",
  "STAR_RIVER",
  "TIME_RESONANCE",
  "SYMBOL_REVEAL",
  "HEXAGRAM_IMPRINT",
  "LIFE_FORCE",
  "STAR_BEAST_REVEAL",
  "COMPLETION",
] as const);

const TIMELINE_BY_STAGE: Readonly<
  Record<GenesisRuntimeStage, GenesisTransitionTimelineStage>
> = Object.freeze({
  MOON_ORIGIN: Object.freeze({
    stage: "MOON_ORIGIN",
    stageDuration: "DEEPLY_HELD",
    transitionDuration: "LONG",
    rhythmProfile: "DEEP",
    transitionEasing: "QUIET_DISSOLVE",
    userPauseWindow: "OBSERVATION_WINDOW",
  }),
  STAR_RIVER: Object.freeze({
    stage: "STAR_RIVER",
    stageDuration: "SLOWLY_FLOWING",
    transitionDuration: "GRADUAL",
    rhythmProfile: "FLOW",
    transitionEasing: "STEADY_EXPANSION",
    userPauseWindow: "OBSERVATION_WINDOW",
  }),
  TIME_RESONANCE: Object.freeze({
    stage: "TIME_RESONANCE",
    stageDuration: "RESPONSE_WINDOW",
    transitionDuration: "PATIENT",
    rhythmProfile: "RESPONSE",
    transitionEasing: "PATIENT_RESPONSE",
    userPauseWindow: "TIME_DELIVERY_WINDOW",
  }),
  SYMBOL_REVEAL: Object.freeze({
    stage: "SYMBOL_REVEAL",
    stageDuration: "SLOWLY_FLOWING",
    transitionDuration: "GRADUAL",
    rhythmProfile: "FLOW",
    transitionEasing: "GRADUAL_AGGREGATION",
    userPauseWindow: "OBSERVATION_WINDOW",
  }),
  HEXAGRAM_IMPRINT: Object.freeze({
    stage: "HEXAGRAM_IMPRINT",
    stageDuration: "RESPONSE_WINDOW",
    transitionDuration: "PATIENT",
    rhythmProfile: "RESPONSE",
    transitionEasing: "SLOW_IMPRINT",
    userPauseWindow: "OBSERVATION_WINDOW",
  }),
  LIFE_FORCE: Object.freeze({
    stage: "LIFE_FORCE",
    stageDuration: "SLOWLY_FLOWING",
    transitionDuration: "GRADUAL",
    rhythmProfile: "FLOW",
    transitionEasing: "GENTLE_AWAKENING",
    userPauseWindow: "OBSERVATION_WINDOW",
  }),
  STAR_BEAST_REVEAL: Object.freeze({
    stage: "STAR_BEAST_REVEAL",
    stageDuration: "DEEPLY_HELD",
    transitionDuration: "LONG",
    rhythmProfile: "DEEP",
    transitionEasing: "QUIET_RETURN",
    userPauseWindow: "OBSERVATION_WINDOW",
  }),
  COMPLETION: Object.freeze({
    stage: "COMPLETION",
    stageDuration: "COMPLETION_HOLD",
    transitionDuration: "NO_AUTOMATIC_TRANSITION",
    rhythmProfile: "DEEP",
    transitionEasing: "NO_AUTOMATIC_TRANSITION",
    userPauseWindow: "RECOGNITION_WINDOW",
  }),
});

const interactionFor = (
  stage: GenesisRuntimeStage,
): GenesisProductionRuntimeInteraction =>
  stage === "TIME_RESONANCE"
    ? "TIME_DELIVERY"
    : stage === "COMPLETION"
      ? "RECOGNITION_HOLD"
      : "NONE";

const createSession = (
  sourceReferenceId: string,
  stage: GenesisRuntimeStage,
): GenesisProductionRuntimeSession => {
  const index = STAGE_ORDER.indexOf(stage);
  return Object.freeze({
    schemaVersion: "GUANYAO_GENESIS_PRODUCTION_RUNTIME_SESSION_V1" as const,
    source: "genesis_production_runtime_consumer" as const,
    sourceExperienceMode: "REAL_USER_EXPERIENCE" as const,
    sourceProvenance: "REAL_USER_SESSION" as const,
    sourceReferenceId,
    currentStage: stage,
    previousStage: index > 0 ? STAGE_ORDER[index - 1]! : null,
    nextStage:
      index < STAGE_ORDER.length - 1 ? STAGE_ORDER[index + 1]! : null,
    timelineState: TIMELINE_BY_STAGE[stage],
    interactionAvailability: interactionFor(stage),
    runtimeStatus:
      stage === "COMPLETION"
        ? "RECOGNITION_HOLD" as const
        : "RUNNING" as const,
    boundary: GENESIS_PRODUCTION_RUNTIME_CONSUMER_BOUNDARY,
  });
};

const blocked = (
  operation: GenesisProductionRuntimeOperation,
  reason: GenesisProductionRuntimeBlockedReason,
  session: GenesisProductionRuntimeSession | null,
): GenesisProductionRuntimeConsumerResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    operation,
    source: "genesis_production_runtime_consumer" as const,
    reason,
    session,
    boundary: GENESIS_PRODUCTION_RUNTIME_CONSUMER_BOUNDARY,
  });

const ready = (
  operation: GenesisProductionRuntimeOperation,
  session: GenesisProductionRuntimeSession,
): GenesisProductionRuntimeConsumerResult =>
  Object.freeze({
    status: "READY" as const,
    operation,
    source: "genesis_production_runtime_consumer" as const,
    session,
    boundary: GENESIS_PRODUCTION_RUNTIME_CONSUMER_BOUNDARY,
  });

const isSessionValid = (session: GenesisProductionRuntimeSession): boolean => {
  const stageIndex = STAGE_ORDER.indexOf(session.currentStage);
  return (
    session.schemaVersion === "GUANYAO_GENESIS_PRODUCTION_RUNTIME_SESSION_V1" &&
    session.source === "genesis_production_runtime_consumer" &&
    session.sourceExperienceMode === "REAL_USER_EXPERIENCE" &&
    session.sourceProvenance === "REAL_USER_SESSION" &&
    session.sourceReferenceId.trim().length > 0 &&
    stageIndex >= 0 &&
    session.previousStage === (stageIndex > 0 ? STAGE_ORDER[stageIndex - 1] : null) &&
    session.nextStage ===
      (stageIndex < STAGE_ORDER.length - 1
        ? STAGE_ORDER[stageIndex + 1]
        : null) &&
    session.timelineState === TIMELINE_BY_STAGE[session.currentStage] &&
    session.interactionAvailability === interactionFor(session.currentStage) &&
    session.runtimeStatus ===
      (session.currentStage === "COMPLETION" ? "RECOGNITION_HOLD" : "RUNNING") &&
    session.boundary === GENESIS_PRODUCTION_RUNTIME_CONSUMER_BOUNDARY
  );
};

export function initializeGenesisProductionRuntime(
  input: GenesisProductionRuntimeInitializeInput,
): GenesisProductionRuntimeConsumerResult {
  const authorization = input.routeAuthorization;
  if (
    authorization.status !== "READY" ||
    authorization.authorizationState !== "AUTHORIZED_PRODUCTION_GENESIS" ||
    authorization.routeTarget !== "/genesis" ||
    authorization.sourceExperienceMode !== "REAL_USER_EXPERIENCE" ||
    authorization.sourceProvenance !== "REAL_USER_SESSION" ||
    authorization.productionRendererAuthorization.authorizedSourceReferenceId !==
      authorization.sourceReferenceId
  ) {
    return blocked("INITIALIZE", "ROUTE_AUTHORIZATION_INVALID", null);
  }
  if (authorization.sourceReferenceId.trim().length === 0) {
    return blocked("INITIALIZE", "SOURCE_REFERENCE_INVALID", null);
  }

  return ready(
    "INITIALIZE",
    createSession(authorization.sourceReferenceId, "MOON_ORIGIN"),
  );
}

export function advanceGenesisProductionRuntime(
  input: GenesisProductionRuntimeAdvanceInput,
): GenesisProductionRuntimeConsumerResult {
  const session = input.session;
  if (!isSessionValid(session)) {
    return blocked("ADVANCE", "RUNTIME_SESSION_INVALID", session);
  }
  if (session.currentStage === "COMPLETION" || session.nextStage === null) {
    return blocked(
      "ADVANCE",
      "SEQUENCE_ALREADY_AT_RECOGNITION_HOLD",
      session,
    );
  }
  if (
    session.currentStage === "TIME_RESONANCE" &&
    input.trigger !== "TIME_DELIVERY"
  ) {
    return blocked("ADVANCE", "TIME_DELIVERY_REQUIRED", session);
  }
  if (
    session.currentStage !== "TIME_RESONANCE" &&
    input.trigger === "TIME_DELIVERY"
  ) {
    return blocked(
      "ADVANCE",
      "TIME_DELIVERY_ONLY_AT_TIME_RESONANCE",
      session,
    );
  }

  return ready(
    "ADVANCE",
    createSession(session.sourceReferenceId, session.nextStage),
  );
}
