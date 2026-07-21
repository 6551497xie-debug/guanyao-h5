import type {
  GenesisLifeForceManifestationBridge,
} from "../types/genesisLifeForceManifestationBridge";
import type {
  GenesisManifestationExperienceAdvanceInput,
  GenesisManifestationExperienceCopyKey,
  GenesisManifestationExperienceState,
  GenesisManifestationExperienceStateBlockedReason,
  GenesisManifestationExperienceStateBoundary,
  GenesisManifestationExperienceStateInput,
  GenesisManifestationExperienceStateResult,
  GenesisManifestationExperienceStateSession,
} from "../types/genesisManifestationExperienceState";
import type { GenesisProductionRuntimeSession } from "../types/genesisProductionRuntimeConsumer";

export const GENESIS_MANIFESTATION_EXPERIENCE_STATE_BOUNDARY:
  GenesisManifestationExperienceStateBoundary = Object.freeze({
    experienceStateOnly: true,
    sourceContinuityRequired: true,
    immutableSessionOnly: true,
    frozenExperienceOrderOnly: true,
    timeDeliveryOnlyManifestationStartAction: true,
    explicitRecognitionOnlyCompletionAction: true,
    noEngineInvocation: true,
    noEngineResultMutation: true,
    noSourceMutation: true,
    noProjectionMutation: true,
    noVisualStateMutation: true,
    noRendererInvocation: true,
    noRendererInputMutation: true,
    noTimelineSpeedMutation: true,
    noTimelineReordering: true,
    noFixtureSource: true,
    noReality: true,
    noPressure: true,
    noGravity: true,
    noChoice: true,
    noCrystal: true,
    noStorageWrite: true,
  });

const STATE_ORDER = Object.freeze([
  "DORMANT",
  "TIME_ACCEPTED",
  "COORDINATE_SEEKING",
  "COORDINATE_FOUND",
  "DIRECTION_AWAKENING",
  "FORCE_CONDENSING",
  "PRESENCE_APPROACHING",
  "PRESENCE_RECOGNIZED",
] as const);

const COPY_KEY_BY_STATE: Readonly<Record<GenesisManifestationExperienceState, GenesisManifestationExperienceCopyKey>> = Object.freeze({
  DORMANT: "WAIT_FOR_TIME_DELIVERY",
  TIME_ACCEPTED: "STAR_RIVER_RESPONDS",
  COORDINATE_SEEKING: "FIND_MY_POSITION",
  COORDINATE_FOUND: "MANSION_COORDINATE_FOUND",
  DIRECTION_AWAKENING: "FOUR_SYMBOL_DIRECTION_AWAKENS",
  FORCE_CONDENSING: "LIFE_FORCE_CONDENSES",
  PRESENCE_APPROACHING: "STAR_BEAST_APPROACHES",
  PRESENCE_RECOGNIZED: "RECOGNIZE_EXISTING_PRESENCE",
});

const blocked = (
  operation: "INITIALIZE" | "ADVANCE",
  reason: GenesisManifestationExperienceStateBlockedReason,
  session: GenesisManifestationExperienceStateSession | null,
): GenesisManifestationExperienceStateResult => Object.freeze({
  status: "BLOCKED" as const,
  operation,
  source: "genesis_manifestation_experience_state" as const,
  reason,
  session,
  boundary: GENESIS_MANIFESTATION_EXPERIENCE_STATE_BOUNDARY,
});

const isValidRuntimeSession = (session: GenesisProductionRuntimeSession | null): session is GenesisProductionRuntimeSession => session !== null &&
  session.sourceExperienceMode === "REAL_USER_EXPERIENCE" &&
  session.sourceProvenance === "REAL_USER_SESSION" &&
  session.sourceReferenceId.trim().length > 0 &&
  session.boundary.noPreviewFixture === true &&
  session.boundary.noEngineInvocation === true &&
  session.boundary.noRendererInvocation === true;

const isValidBridge = (bridge: GenesisLifeForceManifestationBridge | null, sourceReferenceId: string): bridge is GenesisLifeForceManifestationBridge => bridge !== null &&
  bridge.semanticRole === "GENESIS_LIFE_FORCE_MANIFESTATION_BRIDGE" &&
  bridge.sourceReferenceId === sourceReferenceId &&
  bridge.provenance.sourceKind === "REAL_ENGINE_RESULT" &&
  bridge.sourceOnly === true &&
  bridge.noPresenceTransition === true &&
  bridge.noStarBeastGeneration === true &&
  bridge.noFallback === true &&
  bridge.presenceState === "DORMANT";

const nextStateFor = (state: GenesisManifestationExperienceState): GenesisManifestationExperienceState | null => {
  const index = STATE_ORDER.indexOf(state);
  return index === -1 || index === STATE_ORDER.length - 1 ? null : STATE_ORDER[index + 1]!;
};

const createSession = (
  runtimeSession: GenesisProductionRuntimeSession,
  bridge: GenesisLifeForceManifestationBridge,
  currentState: GenesisManifestationExperienceState,
  previousState: GenesisManifestationExperienceState | null,
  timeDeliveryAccepted: boolean,
): GenesisManifestationExperienceStateSession => Object.freeze({
  semanticRole: "GENESIS_MANIFESTATION_EXPERIENCE_STATE" as const,
  sourceReferenceId: runtimeSession.sourceReferenceId,
  bridgeReferenceId: bridge.provenance.manifestationSourceReferenceId,
  runtimeStage: runtimeSession.currentStage,
  currentState,
  previousState,
  nextState: nextStateFor(currentState),
  copyKey: COPY_KEY_BY_STATE[currentState],
  timeDeliveryAccepted,
  manifestationBridge: bridge,
  sourceProvenance: "REAL_USER_SESSION" as const,
  boundary: GENESIS_MANIFESTATION_EXPERIENCE_STATE_BOUNDARY,
});

export function initializeGenesisManifestationExperienceState(
  input: GenesisManifestationExperienceStateInput,
): GenesisManifestationExperienceStateResult {
  if (input.runtimeSession === null) return blocked("INITIALIZE", "RUNTIME_SESSION_REQUIRED", null);
  if (!isValidRuntimeSession(input.runtimeSession)) return blocked("INITIALIZE", "RUNTIME_SESSION_INVALID", null);
  if (input.lifeForceManifestationBridge === null) return blocked("INITIALIZE", "LIFE_FORCE_MANIFESTATION_BRIDGE_REQUIRED", null);
  if (!isValidBridge(input.lifeForceManifestationBridge, input.runtimeSession.sourceReferenceId)) return blocked("INITIALIZE", "LIFE_FORCE_MANIFESTATION_BRIDGE_INVALID", null);
  if (input.runtimeSession.currentStage !== "MOON_ORIGIN") return blocked("INITIALIZE", "INITIAL_RUNTIME_STAGE_INVALID", null);
  return Object.freeze({
    status: "READY" as const,
    operation: "INITIALIZE" as const,
    source: "genesis_manifestation_experience_state" as const,
    session: createSession(input.runtimeSession, input.lifeForceManifestationBridge, "DORMANT", null, false),
    boundary: GENESIS_MANIFESTATION_EXPERIENCE_STATE_BOUNDARY,
  });
}

const isValidStateSession = (session: GenesisManifestationExperienceStateSession): boolean => {
  const index = STATE_ORDER.indexOf(session.currentState);
  return session.semanticRole === "GENESIS_MANIFESTATION_EXPERIENCE_STATE" &&
    index >= 0 &&
    session.nextState === nextStateFor(session.currentState) &&
    session.copyKey === COPY_KEY_BY_STATE[session.currentState] &&
    session.sourceProvenance === "REAL_USER_SESSION" &&
    session.boundary === GENESIS_MANIFESTATION_EXPERIENCE_STATE_BOUNDARY &&
    session.manifestationBridge.sourceReferenceId === session.sourceReferenceId;
};

const canAdvance = (
  currentState: GenesisManifestationExperienceState,
  runtimeStage: GenesisProductionRuntimeSession["currentStage"],
  trigger: GenesisManifestationExperienceAdvanceInput["trigger"],
): boolean => {
  if (currentState === "DORMANT") return runtimeStage === "TIME_RESONANCE" && trigger === "TIME_DELIVERY";
  if (currentState === "TIME_ACCEPTED") return runtimeStage === "SYMBOL_REVEAL" && trigger === "AUTO_ADVANCE";
  if (currentState === "COORDINATE_SEEKING") return runtimeStage === "SYMBOL_REVEAL" && trigger === "AUTO_ADVANCE";
  if (currentState === "COORDINATE_FOUND") return runtimeStage === "HEXAGRAM_IMPRINT" && trigger === "AUTO_ADVANCE";
  if (currentState === "DIRECTION_AWAKENING") return runtimeStage === "LIFE_FORCE" && trigger === "AUTO_ADVANCE";
  if (currentState === "FORCE_CONDENSING") return runtimeStage === "STAR_BEAST_REVEAL" && trigger === "AUTO_ADVANCE";
  if (currentState === "PRESENCE_APPROACHING") return runtimeStage === "COMPLETION" && trigger === "RECOGNITION_CONFIRM";
  return false;
};

export function advanceGenesisManifestationExperienceState(
  input: GenesisManifestationExperienceAdvanceInput,
): GenesisManifestationExperienceStateResult {
  const session = input.session;
  if (!isValidStateSession(session)) return blocked("ADVANCE", "STATE_BOUNDARY_INVALID", session);
  const runtimeSession = input.runtimeSession;
  if (!isValidRuntimeSession(runtimeSession)) return blocked("ADVANCE", "RUNTIME_SESSION_INVALID", session);
  if (runtimeSession.sourceReferenceId !== session.sourceReferenceId) return blocked("ADVANCE", "SOURCE_REFERENCE_MISMATCH", session);
  if (!isValidBridge(input.lifeForceManifestationBridge, session.sourceReferenceId) || input.lifeForceManifestationBridge !== session.manifestationBridge) return blocked("ADVANCE", "LIFE_FORCE_MANIFESTATION_BRIDGE_INVALID", session);
  if (session.currentState === "PRESENCE_RECOGNIZED") return blocked("ADVANCE", "SEQUENCE_ALREADY_RECOGNIZED", session);
  if (session.currentState === "DORMANT" && input.trigger !== "TIME_DELIVERY") return blocked("ADVANCE", "TIME_DELIVERY_REQUIRED", session);
  if (input.trigger === "TIME_DELIVERY" && runtimeSession.currentStage !== "TIME_RESONANCE") return blocked("ADVANCE", "TIME_DELIVERY_ONLY_AT_TIME_RESONANCE", session);
  if (!canAdvance(session.currentState, runtimeSession.currentStage, input.trigger)) return blocked("ADVANCE", "INVALID_RUNTIME_STAGE_FOR_STATE", session);
  const nextState = session.nextState;
  if (nextState === null) return blocked("ADVANCE", "SEQUENCE_ALREADY_RECOGNIZED", session);
  return Object.freeze({
    status: "READY" as const,
    operation: "ADVANCE" as const,
    source: "genesis_manifestation_experience_state" as const,
    session: createSession(runtimeSession, session.manifestationBridge, nextState, session.currentState, session.timeDeliveryAccepted || input.trigger === "TIME_DELIVERY"),
    boundary: GENESIS_MANIFESTATION_EXPERIENCE_STATE_BOUNDARY,
  });
}
