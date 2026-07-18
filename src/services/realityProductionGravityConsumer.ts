import type { GravityExperienceUIRuntime } from "../types/gravityExperienceUIRuntime";
import type {
  RealityProductionGravityConsumerAdvanceInput,
  RealityProductionGravityConsumerBlockedReason,
  RealityProductionGravityConsumerBoundary,
  RealityProductionGravityConsumerInitializeInput,
  RealityProductionGravityConsumerResult,
  RealityProductionGravityPressureSessionReference,
  RealityProductionGravitySession,
} from "../types/realityProductionGravityConsumer";
import type {
  RealityProductionPressureSession,
} from "../types/realityProductionPressureConsumer";
import { resolveGravityExperienceUIRuntime } from "./gravityExperienceUIRuntime";

export const REALITY_PRODUCTION_GRAVITY_CONSUMER_BOUNDARY:
  RealityProductionGravityConsumerBoundary = Object.freeze({
    productionGravityConsumerOnly: true,
    confirmedPressureSessionOnly: true,
    existingGravityStateResolverOnly: true,
    reviewRuntimeResultNotExposed: true,
    sourceReferenceContinuityRequired: true,
    immutableSessionOnly: true,
    explicitObservationConfirmationRequired: true,
    choiceReadinessOutputOnly: true,
    noFixtureSource: true,
    noPrototypeSource: true,
    noDefaultSource: true,
    noInertiaEngine: true,
    noBehaviorScoring: true,
    noBehaviorPrediction: true,
    noUserDiagnosis: true,
    noPersonalityLabel: true,
    noPressureMutation: true,
    noChoiceExecution: true,
    noCrystalExecution: true,
    noRendererInvocation: true,
    noUiIntegration: true,
    noRouteMutation: true,
    noNavigationMutation: true,
    noStorageRead: true,
    noStorageWrite: true,
  });

const blocked = (
  operation: "INITIALIZE" | "ADVANCE",
  reason: RealityProductionGravityConsumerBlockedReason,
  session: RealityProductionGravitySession | null,
): RealityProductionGravityConsumerResult => Object.freeze({
  status: "BLOCKED" as const,
  operation,
  session,
  reason,
  boundary: REALITY_PRODUCTION_GRAVITY_CONSUMER_BOUNDARY,
});

const hasForbiddenSourceReference = (sourceReferenceId: string): boolean => {
  const normalized = sourceReferenceId.toLowerCase();
  return ["fixture", "prototype", "default", "referenceonly"].some((marker) =>
    normalized.includes(marker),
  );
};

const hasValidPressureBoundary = (
  session: RealityProductionPressureSession,
): boolean =>
  session.boundary.productionPressureConsumerOnly === true &&
  session.boundary.authorizedRealitySourceOnly === true &&
  session.boundary.existingPressureStateResolverOnly === true &&
  session.boundary.sourceReferenceContinuityRequired === true &&
  session.boundary.immutableSessionOnly === true &&
  session.boundary.noFixtureSource === true &&
  session.boundary.noPrototypeSource === true &&
  session.boundary.noDefaultSource === true &&
  session.boundary.noGravityExecution === true;

const isPressureSessionAuthentic = (
  session: RealityProductionPressureSession,
): boolean =>
  Object.isFrozen(session) &&
  Object.isFrozen(session.boundary) &&
  session.schemaVersion ===
    "GUANYAO_REALITY_PRODUCTION_PRESSURE_SESSION_V1" &&
  session.source === "reality_production_pressure_consumer" &&
  session.sourceExperienceMode === "REAL_USER_EXPERIENCE" &&
  session.sourceProvenance === "REAL_USER_SESSION" &&
  session.sourceReferenceId.trim().length > 0 &&
  session.realityEntryEligibility === "ELIGIBLE" &&
  session.stateResolverReference === "pressure_recognition_ui_runtime" &&
  hasValidPressureBoundary(session) &&
  (
    (session.pressureObservationConfirmed === false &&
      session.pressureStageState === "PRESSURE_TENSION_OBSERVATION" &&
      session.observationState === "OBSERVING_SIGNALS" &&
      session.tensionAwareness === "PRESENT" &&
      session.gravityReadiness === "NOT_READY" &&
      session.interactionAvailability ===
        "PRESSURE_OBSERVATION_CONFIRM") ||
    (session.pressureObservationConfirmed === true &&
      session.pressureStageState === "GRAVITY_READY" &&
      session.observationState === "TENSION_ACKNOWLEDGED" &&
      session.tensionAwareness === "ACKNOWLEDGED" &&
      session.gravityReadiness === "READY" &&
      session.interactionAvailability === "NONE")
  );

const resolveGravityState = (
  gravityObservationConfirmed: boolean,
): GravityExperienceUIRuntime | null => {
  const result = resolveGravityExperienceUIRuntime({
    gravityReady: true,
    gravityObservationConfirmed,
  });
  return result.status === "READY" ? result.uiRuntime : null;
};

const createSession = (
  pressureSessionReference: RealityProductionGravityPressureSessionReference,
  gravityObservationConfirmed: boolean,
): RealityProductionGravitySession | null => {
  const gravityState = resolveGravityState(gravityObservationConfirmed);
  if (gravityState === null) return null;

  return Object.freeze({
    schemaVersion: "GUANYAO_REALITY_PRODUCTION_GRAVITY_SESSION_V1" as const,
    source: "reality_production_gravity_consumer" as const,
    sourceExperienceMode: "REAL_USER_EXPERIENCE" as const,
    sourceProvenance: "REAL_USER_SESSION" as const,
    sourceReferenceId: pressureSessionReference.sourceReferenceId,
    pressureSessionReference: Object.freeze({
      schemaVersion: pressureSessionReference.schemaVersion,
      source: pressureSessionReference.source,
      sourceReferenceId: pressureSessionReference.sourceReferenceId,
      pressureObservationConfirmed: true as const,
      gravityReadiness: "READY" as const,
    }),
    stateResolverReference: "gravity_experience_ui_runtime" as const,
    gravityStageState: gravityState.gravityStageState,
    automaticResponseState: gravityState.automaticResponseState,
    patternAwarenessState: gravityState.patternAwarenessState,
    choiceReadiness: gravityState.choiceReadiness,
    interactionAvailability: gravityState.interactionAvailability,
    gravityObservationConfirmed: gravityState.gravityObservationConfirmed,
    boundary: REALITY_PRODUCTION_GRAVITY_CONSUMER_BOUNDARY,
  });
};

const isSessionValid = (
  session: RealityProductionGravitySession,
): boolean =>
  Object.isFrozen(session) &&
  Object.isFrozen(session.pressureSessionReference) &&
  session.schemaVersion ===
    "GUANYAO_REALITY_PRODUCTION_GRAVITY_SESSION_V1" &&
  session.source === "reality_production_gravity_consumer" &&
  session.sourceExperienceMode === "REAL_USER_EXPERIENCE" &&
  session.sourceProvenance === "REAL_USER_SESSION" &&
  session.sourceReferenceId.trim().length > 0 &&
  !hasForbiddenSourceReference(session.sourceReferenceId) &&
  session.pressureSessionReference.schemaVersion ===
    "GUANYAO_REALITY_PRODUCTION_PRESSURE_SESSION_V1" &&
  session.pressureSessionReference.source ===
    "reality_production_pressure_consumer" &&
  session.pressureSessionReference.sourceReferenceId ===
    session.sourceReferenceId &&
  session.pressureSessionReference.pressureObservationConfirmed === true &&
  session.pressureSessionReference.gravityReadiness === "READY" &&
  session.stateResolverReference === "gravity_experience_ui_runtime" &&
  session.boundary === REALITY_PRODUCTION_GRAVITY_CONSUMER_BOUNDARY &&
  (
    (session.gravityObservationConfirmed === false &&
      session.gravityStageState === "AUTOMATIC_RESPONSE_AWARENESS" &&
      session.automaticResponseState === "VISIBLE" &&
      session.patternAwarenessState === "EMERGING" &&
      session.choiceReadiness === "NOT_READY" &&
      session.interactionAvailability ===
        "GRAVITY_OBSERVATION_CONFIRM") ||
    (session.gravityObservationConfirmed === true &&
      session.gravityStageState === "CHOICE_READY" &&
      session.automaticResponseState === "ACKNOWLEDGED" &&
      session.patternAwarenessState === "ACKNOWLEDGED" &&
      session.choiceReadiness === "READY" &&
      session.interactionAvailability === "NONE")
  );

export function initializeRealityProductionGravityConsumer(
  input: RealityProductionGravityConsumerInitializeInput,
): RealityProductionGravityConsumerResult {
  const pressureSession = input.pressureSession;
  if (hasForbiddenSourceReference(pressureSession.sourceReferenceId)) {
    return blocked("INITIALIZE", "FORBIDDEN_SOURCE_REFERENCE", null);
  }
  if (!isPressureSessionAuthentic(pressureSession)) {
    return blocked("INITIALIZE", "PRESSURE_SESSION_INVALID", null);
  }
  if (
    pressureSession.pressureObservationConfirmed !== true ||
    pressureSession.gravityReadiness !== "READY"
  ) {
    return blocked("INITIALIZE", "GRAVITY_NOT_READY", null);
  }

  const session = createSession(
    Object.freeze({
      schemaVersion: pressureSession.schemaVersion,
      source: pressureSession.source,
      sourceReferenceId: pressureSession.sourceReferenceId,
      pressureObservationConfirmed: true,
      gravityReadiness: "READY",
    }),
    false,
  );
  return session === null
    ? blocked("INITIALIZE", "GRAVITY_STATE_RESOLVER_NOT_READY", null)
    : Object.freeze({
        status: "READY" as const,
        operation: "INITIALIZE" as const,
        session,
        reason: null,
        boundary: REALITY_PRODUCTION_GRAVITY_CONSUMER_BOUNDARY,
      });
}

export function advanceRealityProductionGravityConsumer(
  input: RealityProductionGravityConsumerAdvanceInput,
): RealityProductionGravityConsumerResult {
  if (!isSessionValid(input.session)) {
    return blocked("ADVANCE", "GRAVITY_SESSION_INVALID", input.session);
  }
  if (input.session.gravityObservationConfirmed) {
    return blocked(
      "ADVANCE",
      "GRAVITY_OBSERVATION_ALREADY_CONFIRMED",
      input.session,
    );
  }
  if (
    input.event !== "GRAVITY_OBSERVATION_CONFIRM" ||
    input.session.interactionAvailability !==
      "GRAVITY_OBSERVATION_CONFIRM"
  ) {
    return blocked(
      "ADVANCE",
      "GRAVITY_OBSERVATION_CONFIRM_NOT_AVAILABLE",
      input.session,
    );
  }

  const session = createSession(input.session.pressureSessionReference, true);
  return session === null
    ? blocked("ADVANCE", "GRAVITY_STATE_RESOLVER_NOT_READY", input.session)
    : Object.freeze({
        status: "READY" as const,
        operation: "ADVANCE" as const,
        session,
        reason: null,
        boundary: REALITY_PRODUCTION_GRAVITY_CONSUMER_BOUNDARY,
      });
}
