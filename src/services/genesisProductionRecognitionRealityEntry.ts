import type { GenesisProductionRuntimeSession } from "../types/genesisProductionRuntimeConsumer";
import type {
  GenesisProductionRealityEntryContext,
  GenesisProductionRealityEntryEvent,
  GenesisProductionRealityEntrySession,
  GenesisProductionRecognitionRealityBoundary,
  GenesisProductionRecognitionRealityResult,
} from "../types/genesisProductionRecognitionRealityEntry";

export const GENESIS_PRODUCTION_RECOGNITION_REALITY_BOUNDARY:
  GenesisProductionRecognitionRealityBoundary = Object.freeze({
    productionRecognitionRealityBridgeOnly: true,
    genesisCompletionRequired: true,
    recognitionConfirmationRequired: true,
    explicitRealityEntryRequired: true,
    sourceReferenceContinuityRequired: true,
    immutableSessionOnly: true,
    noAutomaticRealityEntry: true,
    noFixtureSource: true,
    noPrototypeSource: true,
    noEngineInvocation: true,
    noRendererInvocation: true,
    noRealityRouteActivation: true,
    noPressureExecution: true,
    noGravityExecution: true,
    noChoiceExecution: true,
    noCrystalExecution: true,
    noStorageWrite: true,
  });

let activeRealityEntryContext: GenesisProductionRealityEntryContext | null = null;

const createSession = (
  sourceReferenceId: string,
  phase: GenesisProductionRealityEntrySession["phase"],
): GenesisProductionRealityEntrySession => Object.freeze({
  schemaVersion: "GUANYAO_GENESIS_PRODUCTION_REALITY_ENTRY_SESSION_V1" as const,
  source: "genesis_production_recognition_reality_bridge" as const,
  sourceExperienceMode: "REAL_USER_EXPERIENCE" as const,
  sourceProvenance: "REAL_USER_SESSION" as const,
  sourceReferenceId,
  genesisCompletionStage: "COMPLETION" as const,
  phase,
  interactionAvailability:
    phase === "AWAITING_RECOGNITION_CONFIRMATION"
      ? "RECOGNITION_CONFIRM" as const
      : phase === "AWAITING_REALITY_ENTRY_CONFIRMATION"
        ? "ENTER_REALITY" as const
        : "NONE" as const,
  recognitionConfirmed: phase !== "AWAITING_RECOGNITION_CONFIRMATION",
  realityEntryConfirmed: phase === "REALITY_ENTRY_ELIGIBLE",
  realityEntryEligibility:
    phase === "REALITY_ENTRY_ELIGIBLE" ? "ELIGIBLE" as const : "NOT_ELIGIBLE" as const,
  boundary: GENESIS_PRODUCTION_RECOGNITION_REALITY_BOUNDARY,
});

const blocked = (
  operation: "INITIALIZE" | "ADVANCE",
  reason: Extract<GenesisProductionRecognitionRealityResult, { status: "BLOCKED" }>["reason"],
  session: GenesisProductionRealityEntrySession | null,
): GenesisProductionRecognitionRealityResult => Object.freeze({
  status: "BLOCKED" as const,
  operation,
  reason,
  session,
  boundary: GENESIS_PRODUCTION_RECOGNITION_REALITY_BOUNDARY,
});

const ready = (
  operation: "INITIALIZE" | "ADVANCE",
  session: GenesisProductionRealityEntrySession,
): GenesisProductionRecognitionRealityResult => Object.freeze({
  status: "READY" as const,
  operation,
  session,
  boundary: GENESIS_PRODUCTION_RECOGNITION_REALITY_BOUNDARY,
});

const isSessionValid = (session: GenesisProductionRealityEntrySession): boolean =>
  session.schemaVersion === "GUANYAO_GENESIS_PRODUCTION_REALITY_ENTRY_SESSION_V1" &&
  session.source === "genesis_production_recognition_reality_bridge" &&
  session.sourceExperienceMode === "REAL_USER_EXPERIENCE" &&
  session.sourceProvenance === "REAL_USER_SESSION" &&
  session.sourceReferenceId.trim().length > 0 &&
  session.genesisCompletionStage === "COMPLETION" &&
  session.boundary === GENESIS_PRODUCTION_RECOGNITION_REALITY_BOUNDARY &&
  (
    (session.phase === "AWAITING_RECOGNITION_CONFIRMATION" &&
      session.interactionAvailability === "RECOGNITION_CONFIRM" &&
      session.recognitionConfirmed === false &&
      session.realityEntryConfirmed === false &&
      session.realityEntryEligibility === "NOT_ELIGIBLE") ||
    (session.phase === "AWAITING_REALITY_ENTRY_CONFIRMATION" &&
      session.interactionAvailability === "ENTER_REALITY" &&
      session.recognitionConfirmed === true &&
      session.realityEntryConfirmed === false &&
      session.realityEntryEligibility === "NOT_ELIGIBLE") ||
    (session.phase === "REALITY_ENTRY_ELIGIBLE" &&
      session.interactionAvailability === "NONE" &&
      session.recognitionConfirmed === true &&
      session.realityEntryConfirmed === true &&
      session.realityEntryEligibility === "ELIGIBLE")
  );

const hasForbiddenSourceReference = (sourceReferenceId: string): boolean => {
  const normalized = sourceReferenceId.toLowerCase();
  return ["fixture", "prototype", "default", "referenceonly"].some((marker) =>
    normalized.includes(marker),
  );
};

export function initializeGenesisProductionRecognitionRealityEntry(
  runtimeSession: GenesisProductionRuntimeSession,
): GenesisProductionRecognitionRealityResult {
  if (
    runtimeSession.currentStage !== "COMPLETION" ||
    runtimeSession.runtimeStatus !== "RECOGNITION_HOLD" ||
    runtimeSession.interactionAvailability !== "RECOGNITION_HOLD"
  ) {
    return blocked("INITIALIZE", "GENESIS_COMPLETION_REQUIRED", null);
  }
  if (
    runtimeSession.sourceExperienceMode !== "REAL_USER_EXPERIENCE" ||
    runtimeSession.sourceProvenance !== "REAL_USER_SESSION" ||
    runtimeSession.sourceReferenceId.trim().length === 0 ||
    hasForbiddenSourceReference(runtimeSession.sourceReferenceId)
  ) {
    return blocked("INITIALIZE", "SOURCE_REFERENCE_INVALID", null);
  }
  return ready(
    "INITIALIZE",
    createSession(
      runtimeSession.sourceReferenceId,
      "AWAITING_RECOGNITION_CONFIRMATION",
    ),
  );
}

export function advanceGenesisProductionRecognitionRealityEntry(
  session: GenesisProductionRealityEntrySession,
  event: GenesisProductionRealityEntryEvent,
): GenesisProductionRecognitionRealityResult {
  if (!isSessionValid(session)) return blocked("ADVANCE", "SESSION_INVALID", session);
  if (session.phase === "REALITY_ENTRY_ELIGIBLE") {
    return blocked("ADVANCE", "REALITY_ENTRY_ALREADY_ELIGIBLE", session);
  }
  if (
    session.phase === "AWAITING_RECOGNITION_CONFIRMATION" &&
    event !== "RECOGNITION_CONFIRM"
  ) {
    return blocked("ADVANCE", "RECOGNITION_CONFIRM_REQUIRED", session);
  }
  if (
    session.phase === "AWAITING_REALITY_ENTRY_CONFIRMATION" &&
    event !== "ENTER_REALITY"
  ) {
    return blocked("ADVANCE", "REALITY_ENTRY_CONFIRM_REQUIRED", session);
  }
  return ready(
    "ADVANCE",
    createSession(
      session.sourceReferenceId,
      session.phase === "AWAITING_RECOGNITION_CONFIRMATION"
        ? "AWAITING_REALITY_ENTRY_CONFIRMATION"
        : "REALITY_ENTRY_ELIGIBLE",
    ),
  );
}

export function activateGenesisProductionRealityEntryContext(
  session: GenesisProductionRealityEntrySession,
): GenesisProductionRealityEntryContext | null {
  if (
    !isSessionValid(session) ||
    session.phase !== "REALITY_ENTRY_ELIGIBLE" ||
    session.recognitionConfirmed !== true ||
    session.realityEntryConfirmed !== true ||
    session.realityEntryEligibility !== "ELIGIBLE"
  ) {
    return null;
  }
  activeRealityEntryContext = Object.freeze({
    schemaVersion: "GUANYAO_GENESIS_PRODUCTION_REALITY_ENTRY_CONTEXT_V1" as const,
    source: "genesis_production_reality_entry_context" as const,
    sourceReferenceId: session.sourceReferenceId,
    sourceProvenance: "REAL_USER_SESSION" as const,
    eligibility: "ELIGIBLE" as const,
    recognitionRealitySession: session,
  });
  return activeRealityEntryContext;
}

export const readGenesisProductionRealityEntryContext = ():
  GenesisProductionRealityEntryContext | null => activeRealityEntryContext;

export function clearGenesisProductionRealityEntryContext(): void {
  activeRealityEntryContext = null;
}
