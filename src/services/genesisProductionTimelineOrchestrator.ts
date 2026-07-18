import { GENESIS_FROZEN_STAGE_HOLD_MS } from "./genesisFrozenTimelineTiming";
import type { GenesisProductionRuntimeSession } from "../types/genesisProductionRuntimeConsumer";
import type {
  GenesisProductionTimelineOrchestrationResult,
  GenesisProductionTimelineOrchestratorBoundary,
} from "../types/genesisProductionTimelineOrchestrator";

export const GENESIS_PRODUCTION_TIMELINE_ORCHESTRATOR_BOUNDARY:
  GenesisProductionTimelineOrchestratorBoundary = Object.freeze({
    productionTimelineOrchestrationOnly: true,
    frozenTimingValuesOnly: true,
    runtimeSessionConsumed: true,
    timeDeliveryOnlyInteraction: true,
    completionRecognitionHoldRequired: true,
    noFixtureSource: true,
    noPreviewRuntime: true,
    noEngineInvocation: true,
    noRendererInvocation: true,
    noCalibrationMutation: true,
    noTimelineSemanticMutation: true,
    noRouteRegistration: true,
    noNavigationMutation: true,
    noStorageWrite: true,
  });

const blocked = (
  reason: "RUNTIME_SESSION_INVALID" | "TIMELINE_SEMANTIC_INVALID",
): GenesisProductionTimelineOrchestrationResult => Object.freeze({
  status: "BLOCKED" as const,
  reason,
  directive: null,
  boundary: GENESIS_PRODUCTION_TIMELINE_ORCHESTRATOR_BOUNDARY,
});

export function orchestrateGenesisProductionTimeline(
  session: GenesisProductionRuntimeSession,
): GenesisProductionTimelineOrchestrationResult {
  if (
    session.sourceExperienceMode !== "REAL_USER_EXPERIENCE" ||
    session.sourceProvenance !== "REAL_USER_SESSION" ||
    session.sourceReferenceId.trim().length === 0 ||
    session.timelineState.stage !== session.currentStage ||
    session.boundary.frozenTimelineSemanticsOnly !== true ||
    session.boundary.noPreviewFixture !== true
  ) {
    return blocked("RUNTIME_SESSION_INVALID");
  }

  if (session.currentStage === "TIME_RESONANCE") {
    if (
      session.interactionAvailability !== "TIME_DELIVERY" ||
      session.timelineState.userPauseWindow !== "TIME_DELIVERY_WINDOW"
    ) {
      return blocked("TIMELINE_SEMANTIC_INVALID");
    }
    return Object.freeze({
      status: "READY" as const,
      directive: Object.freeze({
        behavior: "WAIT_FOR_TIME_DELIVERY" as const,
        stage: "TIME_RESONANCE" as const,
        delayMs: null,
      }),
      boundary: GENESIS_PRODUCTION_TIMELINE_ORCHESTRATOR_BOUNDARY,
    });
  }

  if (session.currentStage === "COMPLETION") {
    if (
      session.runtimeStatus !== "RECOGNITION_HOLD" ||
      session.interactionAvailability !== "RECOGNITION_HOLD" ||
      session.timelineState.transitionDuration !== "NO_AUTOMATIC_TRANSITION"
    ) {
      return blocked("TIMELINE_SEMANTIC_INVALID");
    }
    return Object.freeze({
      status: "READY" as const,
      directive: Object.freeze({
        behavior: "RECOGNITION_HOLD" as const,
        stage: "COMPLETION" as const,
        delayMs: null,
      }),
      boundary: GENESIS_PRODUCTION_TIMELINE_ORCHESTRATOR_BOUNDARY,
    });
  }

  if (
    session.interactionAvailability !== "NONE" ||
    session.timelineState.userPauseWindow !== "OBSERVATION_WINDOW"
  ) {
    return blocked("TIMELINE_SEMANTIC_INVALID");
  }
  return Object.freeze({
    status: "READY" as const,
    directive: Object.freeze({
      behavior: "AUTO_ADVANCE" as const,
      stage: session.currentStage,
      delayMs: GENESIS_FROZEN_STAGE_HOLD_MS[session.currentStage],
    }),
    boundary: GENESIS_PRODUCTION_TIMELINE_ORCHESTRATOR_BOUNDARY,
  });
}
