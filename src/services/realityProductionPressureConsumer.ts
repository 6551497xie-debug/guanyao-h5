import type { PressureRecognitionUIRuntime } from "../types/pressureRecognitionUIRuntime";
import type {
  RealityProductionPressureConsumerAdvanceInput,
  RealityProductionPressureConsumerBlockedReason,
  RealityProductionPressureConsumerBoundary,
  RealityProductionPressureConsumerInitializeInput,
  RealityProductionPressureConsumerResult,
  RealityProductionPressureSession,
} from "../types/realityProductionPressureConsumer";
import { resolvePressureRecognitionUIRuntime } from "./pressureRecognitionUIRuntime";

export const REALITY_PRODUCTION_PRESSURE_CONSUMER_BOUNDARY:
  RealityProductionPressureConsumerBoundary = Object.freeze({
    productionPressureConsumerOnly: true,
    authorizedRealitySourceOnly: true,
    existingPressureStateResolverOnly: true,
    reviewRuntimeResultNotExposed: true,
    sourceReferenceContinuityRequired: true,
    immutableSessionOnly: true,
    explicitObservationConfirmationRequired: true,
    gravityReadinessOutputOnly: true,
    noFixtureSource: true,
    noPrototypeSource: true,
    noDefaultSource: true,
    noPressureEngine: true,
    noPressureSeedMatching: true,
    noPressureResult: true,
    noDiagnosis: true,
    noPersonalityLabel: true,
    noGravityExecution: true,
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
  reason: RealityProductionPressureConsumerBlockedReason,
  session: RealityProductionPressureSession | null,
): RealityProductionPressureConsumerResult => Object.freeze({
  status: "BLOCKED" as const,
  operation,
  session,
  reason,
  boundary: REALITY_PRODUCTION_PRESSURE_CONSUMER_BOUNDARY,
});

const hasForbiddenSourceReference = (sourceReferenceId: string): boolean => {
  const normalized = sourceReferenceId.toLowerCase();
  return ["fixture", "prototype", "default", "referenceonly"].some((marker) =>
    normalized.includes(marker),
  );
};

const resolvePressureState = (
  pressureObservationConfirmed: boolean,
): PressureRecognitionUIRuntime | null => {
  const result = resolvePressureRecognitionUIRuntime({
    realityReady: true,
    pressureObservationConfirmed,
  });
  return result.status === "READY" ? result.uiRuntime : null;
};

const createSession = (
  sourceReferenceId: string,
  pressureObservationConfirmed: boolean,
): RealityProductionPressureSession | null => {
  const pressureState = resolvePressureState(pressureObservationConfirmed);
  if (pressureState === null) return null;

  return Object.freeze({
    schemaVersion: "GUANYAO_REALITY_PRODUCTION_PRESSURE_SESSION_V1" as const,
    source: "reality_production_pressure_consumer" as const,
    sourceExperienceMode: "REAL_USER_EXPERIENCE" as const,
    sourceProvenance: "REAL_USER_SESSION" as const,
    sourceReferenceId,
    realityEntryEligibility: "ELIGIBLE" as const,
    stateResolverReference: "pressure_recognition_ui_runtime" as const,
    pressureStageState: pressureState.pressureStageState,
    observationState: pressureState.observationState,
    tensionAwareness: pressureState.tensionAwareness,
    gravityReadiness: pressureState.gravityReadiness,
    interactionAvailability: pressureState.interactionAvailability,
    pressureObservationConfirmed:
      pressureState.pressureObservationConfirmed,
    boundary: REALITY_PRODUCTION_PRESSURE_CONSUMER_BOUNDARY,
  });
};

const isSessionValid = (
  session: RealityProductionPressureSession,
): boolean =>
  session.schemaVersion ===
    "GUANYAO_REALITY_PRODUCTION_PRESSURE_SESSION_V1" &&
  session.source === "reality_production_pressure_consumer" &&
  session.sourceExperienceMode === "REAL_USER_EXPERIENCE" &&
  session.sourceProvenance === "REAL_USER_SESSION" &&
  session.sourceReferenceId.trim().length > 0 &&
  !hasForbiddenSourceReference(session.sourceReferenceId) &&
  session.realityEntryEligibility === "ELIGIBLE" &&
  session.stateResolverReference === "pressure_recognition_ui_runtime" &&
  session.boundary === REALITY_PRODUCTION_PRESSURE_CONSUMER_BOUNDARY &&
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

export function initializeRealityProductionPressureConsumer(
  input: RealityProductionPressureConsumerInitializeInput,
): RealityProductionPressureConsumerResult {
  const authorization = input.routeAuthorization;
  if (
    authorization.status !== "READY" ||
    authorization.authorizationState !==
      "AUTHORIZED_PRODUCTION_REALITY_SOURCE" ||
    authorization.routeTarget !== "/reality"
  ) {
    return blocked(
      "INITIALIZE",
      "REALITY_ROUTE_AUTHORIZATION_REQUIRED",
      null,
    );
  }

  const context = authorization.sourceContext;
  const sourceReferenceId = authorization.sourceReferenceId;
  if (
    context.source !== "reality_production_source_context" ||
    context.sourceExperienceMode !== "REAL_USER_EXPERIENCE" ||
    context.sourceProvenance !== "REAL_USER_SESSION" ||
    context.realityEntryEligibility !== "ELIGIBLE" ||
    context.pressureRecognitionState !== "NOT_STARTED"
  ) {
    return blocked("INITIALIZE", "REALITY_SOURCE_CONTEXT_INVALID", null);
  }
  if (hasForbiddenSourceReference(sourceReferenceId)) {
    return blocked("INITIALIZE", "FORBIDDEN_SOURCE_REFERENCE", null);
  }
  if (
    sourceReferenceId !== context.sourceReferenceId ||
    sourceReferenceId !==
      context.genesisCompletionReference.sourceReferenceId ||
    sourceReferenceId !==
      context.recognitionConfirmationReference.sourceReferenceId ||
    sourceReferenceId !==
      context.realityExperienceArchitectureReference.referenceId
  ) {
    return blocked("INITIALIZE", "SOURCE_REFERENCE_MISMATCH", null);
  }

  const session = createSession(sourceReferenceId, false);
  return session === null
    ? blocked("INITIALIZE", "PRESSURE_STATE_RESOLVER_NOT_READY", null)
    : Object.freeze({
        status: "READY" as const,
        operation: "INITIALIZE" as const,
        session,
        reason: null,
        boundary: REALITY_PRODUCTION_PRESSURE_CONSUMER_BOUNDARY,
      });
}

export function advanceRealityProductionPressureConsumer(
  input: RealityProductionPressureConsumerAdvanceInput,
): RealityProductionPressureConsumerResult {
  if (!isSessionValid(input.session)) {
    return blocked("ADVANCE", "PRESSURE_SESSION_INVALID", input.session);
  }
  if (input.session.pressureObservationConfirmed) {
    return blocked(
      "ADVANCE",
      "PRESSURE_OBSERVATION_ALREADY_CONFIRMED",
      input.session,
    );
  }
  if (
    input.event !== "PRESSURE_OBSERVATION_CONFIRM" ||
    input.session.interactionAvailability !==
      "PRESSURE_OBSERVATION_CONFIRM"
  ) {
    return blocked(
      "ADVANCE",
      "PRESSURE_OBSERVATION_CONFIRM_NOT_AVAILABLE",
      input.session,
    );
  }

  const session = createSession(input.session.sourceReferenceId, true);
  return session === null
    ? blocked(
        "ADVANCE",
        "PRESSURE_STATE_RESOLVER_NOT_READY",
        input.session,
      )
    : Object.freeze({
        status: "READY" as const,
        operation: "ADVANCE" as const,
        session,
        reason: null,
        boundary: REALITY_PRODUCTION_PRESSURE_CONSUMER_BOUNDARY,
      });
}
