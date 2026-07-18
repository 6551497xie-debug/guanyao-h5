import type { ChoiceExperienceUIRuntime } from "../types/choiceExperienceUIRuntime";
import type {
  RealityProductionChoiceConsumerAdvanceInput,
  RealityProductionChoiceConsumerBlockedReason,
  RealityProductionChoiceConsumerBoundary,
  RealityProductionChoiceConsumerInitializeInput,
  RealityProductionChoiceConsumerResult,
  RealityProductionChoiceGravitySessionReference,
  RealityProductionChoiceSession,
} from "../types/realityProductionChoiceConsumer";
import type {
  RealityProductionGravitySession,
} from "../types/realityProductionGravityConsumer";
import { resolveChoiceExperienceUIRuntime } from "./choiceExperienceUIRuntime";

export const REALITY_PRODUCTION_CHOICE_CONSUMER_BOUNDARY:
  RealityProductionChoiceConsumerBoundary = Object.freeze({
    productionChoiceConsumerOnly: true,
    confirmedGravitySessionOnly: true,
    existingChoiceStateResolverOnly: true,
    reviewRuntimeResultNotExposed: true,
    sourceReferenceContinuityRequired: true,
    immutableSessionOnly: true,
    explicitActiveResponseRequired: true,
    crystalReadinessOutputOnly: true,
    userOwnedResponseOnly: true,
    noFixtureSource: true,
    noPrototypeSource: true,
    noDefaultSource: true,
    noBehaviorEngine: true,
    noRecommendedAction: true,
    noBestChoice: true,
    noBehaviorScore: true,
    noUserJudgement: true,
    noGravityMutation: true,
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
  reason: RealityProductionChoiceConsumerBlockedReason,
  session: RealityProductionChoiceSession | null,
): RealityProductionChoiceConsumerResult => Object.freeze({
  status: "BLOCKED" as const,
  operation,
  session,
  reason,
  boundary: REALITY_PRODUCTION_CHOICE_CONSUMER_BOUNDARY,
});

const hasForbiddenSourceReference = (sourceReferenceId: string): boolean => {
  const normalized = sourceReferenceId.toLowerCase();
  return ["fixture", "prototype", "default", "referenceonly"].some((marker) =>
    normalized.includes(marker),
  );
};

const hasValidGravityBoundary = (
  session: RealityProductionGravitySession,
): boolean =>
  session.boundary.productionGravityConsumerOnly === true &&
  session.boundary.confirmedPressureSessionOnly === true &&
  session.boundary.existingGravityStateResolverOnly === true &&
  session.boundary.sourceReferenceContinuityRequired === true &&
  session.boundary.immutableSessionOnly === true &&
  session.boundary.noFixtureSource === true &&
  session.boundary.noPrototypeSource === true &&
  session.boundary.noDefaultSource === true &&
  session.boundary.noChoiceExecution === true;

const isGravitySessionAuthentic = (
  session: RealityProductionGravitySession,
): boolean =>
  Object.isFrozen(session) &&
  Object.isFrozen(session.pressureSessionReference) &&
  Object.isFrozen(session.boundary) &&
  session.schemaVersion ===
    "GUANYAO_REALITY_PRODUCTION_GRAVITY_SESSION_V1" &&
  session.source === "reality_production_gravity_consumer" &&
  session.sourceExperienceMode === "REAL_USER_EXPERIENCE" &&
  session.sourceProvenance === "REAL_USER_SESSION" &&
  session.sourceReferenceId.trim().length > 0 &&
  session.pressureSessionReference.schemaVersion ===
    "GUANYAO_REALITY_PRODUCTION_PRESSURE_SESSION_V1" &&
  session.pressureSessionReference.source ===
    "reality_production_pressure_consumer" &&
  session.pressureSessionReference.sourceReferenceId ===
    session.sourceReferenceId &&
  session.pressureSessionReference.pressureObservationConfirmed === true &&
  session.pressureSessionReference.gravityReadiness === "READY" &&
  session.stateResolverReference === "gravity_experience_ui_runtime" &&
  hasValidGravityBoundary(session) &&
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

const resolveChoiceState = (
  choiceActiveResponseConfirmed: boolean,
): ChoiceExperienceUIRuntime | null => {
  const result = resolveChoiceExperienceUIRuntime({
    choiceReady: true,
    choiceActiveResponseConfirmed,
  });
  return result.status === "READY" ? result.uiRuntime : null;
};

const createSession = (
  gravitySessionReference: RealityProductionChoiceGravitySessionReference,
  choiceActiveResponseConfirmed: boolean,
): RealityProductionChoiceSession | null => {
  const choiceState = resolveChoiceState(choiceActiveResponseConfirmed);
  if (choiceState === null) return null;

  return Object.freeze({
    schemaVersion: "GUANYAO_REALITY_PRODUCTION_CHOICE_SESSION_V1" as const,
    source: "reality_production_choice_consumer" as const,
    sourceExperienceMode: "REAL_USER_EXPERIENCE" as const,
    sourceProvenance: "REAL_USER_SESSION" as const,
    sourceReferenceId: gravitySessionReference.sourceReferenceId,
    gravitySessionReference: Object.freeze({
      schemaVersion: gravitySessionReference.schemaVersion,
      source: gravitySessionReference.source,
      sourceReferenceId: gravitySessionReference.sourceReferenceId,
      gravityObservationConfirmed: true as const,
      choiceReadiness: "READY" as const,
    }),
    stateResolverReference: "choice_experience_ui_runtime" as const,
    choiceStageState: choiceState.choiceStageState,
    responseGapState: choiceState.responseGapState,
    alternativeResponseState: choiceState.alternativeResponseState,
    crystalReadiness: choiceState.crystalReadiness,
    interactionAvailability: choiceState.interactionAvailability,
    choiceActiveResponseConfirmed:
      choiceState.choiceActiveResponseConfirmed,
    boundary: REALITY_PRODUCTION_CHOICE_CONSUMER_BOUNDARY,
  });
};

const isSessionValid = (
  session: RealityProductionChoiceSession,
): boolean =>
  Object.isFrozen(session) &&
  Object.isFrozen(session.gravitySessionReference) &&
  session.schemaVersion ===
    "GUANYAO_REALITY_PRODUCTION_CHOICE_SESSION_V1" &&
  session.source === "reality_production_choice_consumer" &&
  session.sourceExperienceMode === "REAL_USER_EXPERIENCE" &&
  session.sourceProvenance === "REAL_USER_SESSION" &&
  session.sourceReferenceId.trim().length > 0 &&
  !hasForbiddenSourceReference(session.sourceReferenceId) &&
  session.gravitySessionReference.schemaVersion ===
    "GUANYAO_REALITY_PRODUCTION_GRAVITY_SESSION_V1" &&
  session.gravitySessionReference.source ===
    "reality_production_gravity_consumer" &&
  session.gravitySessionReference.sourceReferenceId ===
    session.sourceReferenceId &&
  session.gravitySessionReference.gravityObservationConfirmed === true &&
  session.gravitySessionReference.choiceReadiness === "READY" &&
  session.stateResolverReference === "choice_experience_ui_runtime" &&
  session.boundary === REALITY_PRODUCTION_CHOICE_CONSUMER_BOUNDARY &&
  (
    (session.choiceActiveResponseConfirmed === false &&
      session.choiceStageState === "ALTERNATIVE_RESPONSE_AWARENESS" &&
      session.responseGapState === "OPEN" &&
      session.alternativeResponseState === "VISIBLE" &&
      session.crystalReadiness === "NOT_READY" &&
      session.interactionAvailability === "CHOICE_ACTIVE_RESPONSE") ||
    (session.choiceActiveResponseConfirmed === true &&
      session.choiceStageState === "CRYSTAL_READY" &&
      session.responseGapState === "ACKNOWLEDGED" &&
      session.alternativeResponseState === "ACKNOWLEDGED" &&
      session.crystalReadiness === "READY" &&
      session.interactionAvailability === "NONE")
  );

export function initializeRealityProductionChoiceConsumer(
  input: RealityProductionChoiceConsumerInitializeInput,
): RealityProductionChoiceConsumerResult {
  const gravitySession = input.gravitySession;
  if (hasForbiddenSourceReference(gravitySession.sourceReferenceId)) {
    return blocked("INITIALIZE", "FORBIDDEN_SOURCE_REFERENCE", null);
  }
  if (!isGravitySessionAuthentic(gravitySession)) {
    return blocked("INITIALIZE", "GRAVITY_SESSION_INVALID", null);
  }
  if (
    gravitySession.gravityObservationConfirmed !== true ||
    gravitySession.choiceReadiness !== "READY"
  ) {
    return blocked("INITIALIZE", "CHOICE_NOT_READY", null);
  }

  const session = createSession(
    Object.freeze({
      schemaVersion: gravitySession.schemaVersion,
      source: gravitySession.source,
      sourceReferenceId: gravitySession.sourceReferenceId,
      gravityObservationConfirmed: true,
      choiceReadiness: "READY",
    }),
    false,
  );
  return session === null
    ? blocked("INITIALIZE", "CHOICE_STATE_RESOLVER_NOT_READY", null)
    : Object.freeze({
        status: "READY" as const,
        operation: "INITIALIZE" as const,
        session,
        reason: null,
        boundary: REALITY_PRODUCTION_CHOICE_CONSUMER_BOUNDARY,
      });
}

export function advanceRealityProductionChoiceConsumer(
  input: RealityProductionChoiceConsumerAdvanceInput,
): RealityProductionChoiceConsumerResult {
  if (!isSessionValid(input.session)) {
    return blocked("ADVANCE", "CHOICE_SESSION_INVALID", input.session);
  }
  if (input.session.choiceActiveResponseConfirmed) {
    return blocked(
      "ADVANCE",
      "CHOICE_ACTIVE_RESPONSE_ALREADY_CONFIRMED",
      input.session,
    );
  }
  if (
    input.event !== "CHOICE_ACTIVE_RESPONSE" ||
    input.session.interactionAvailability !== "CHOICE_ACTIVE_RESPONSE"
  ) {
    return blocked(
      "ADVANCE",
      "CHOICE_ACTIVE_RESPONSE_NOT_AVAILABLE",
      input.session,
    );
  }

  const session = createSession(input.session.gravitySessionReference, true);
  return session === null
    ? blocked("ADVANCE", "CHOICE_STATE_RESOLVER_NOT_READY", input.session)
    : Object.freeze({
        status: "READY" as const,
        operation: "ADVANCE" as const,
        session,
        reason: null,
        boundary: REALITY_PRODUCTION_CHOICE_CONSUMER_BOUNDARY,
      });
}
