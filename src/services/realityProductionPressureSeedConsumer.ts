import type { SelectedPressureSeedContext } from "../types/primaryPetal";
import type {
  RealityPressureSeedCandidateBundle,
  RealityPressureSeedCaptureCommand,
  RealityPressureSeedCaptureProvenance,
  RealityPressureSeedCaptureState,
} from "../types/realityPressureSeedCaptureContract";
import type { RealityPressureSeedCandidateSourceContext } from "../types/realityPressureSeedCandidateSource";
import type {
  RealityProductionPressureSeedConsumerAdvanceInput,
  RealityProductionPressureSeedConsumerBlockedReason,
  RealityProductionPressureSeedConsumerBoundary,
  RealityProductionPressureSeedConsumerInitializeInput,
  RealityProductionPressureSeedConsumerResult,
  RealityProductionPressureSeedSession,
} from "../types/realityProductionPressureSeedConsumer";
import { captureRealityPressureSeed } from "./realityPressureSeedCaptureAdapter";

export const REALITY_PRODUCTION_PRESSURE_SEED_CONSUMER_BOUNDARY:
  RealityProductionPressureSeedConsumerBoundary = Object.freeze({
    productionPressureSeedConsumerOnly: true,
    authorizedRealitySourceOnly: true,
    authorizedCandidateSourceContextOnly: true,
    existingCaptureAdapterOnly: true,
    immutableSessionOnly: true,
    sourceReferenceContinuityRequired: true,
    bundleReferenceContinuityRequired: true,
    explicitUserRecognitionRequired: true,
    gravityReadinessOutputOnly: true,
    noFixtureSource: true,
    noPrototypeSource: true,
    noDefaultSource: true,
    noReferenceOnlySource: true,
    noSourceFallback: true,
    noCandidateSourceResolution: true,
    noCandidateAssembly: true,
    noNewPressureEngine: true,
    noAutomaticSelection: true,
    noGravityExecution: true,
    noChoiceExecution: true,
    noCrystalExecution: true,
    noUiIntegration: true,
    noRendererInvocation: true,
    noRouteMutation: true,
    noNavigationMutation: true,
    noStorageRead: true,
    noStorageWrite: true,
  });

const ALL_CAPTURE_EVENTS = Object.freeze([
  "PRESSURE_SEED_RECOGNIZE",
  "PRESSURE_SEED_REQUEST_NEXT_BUNDLE",
  "PRESSURE_SEED_PAUSE",
] as const);
const NO_EVENTS = Object.freeze([]) as readonly [];

const forbiddenSourceMarkers = [
  "fixture",
  "prototype",
  "default",
  "referenceonly",
] as const;

const hasForbiddenSourceReference = (sourceReferenceId: string): boolean => {
  const normalized = sourceReferenceId.toLowerCase();
  return forbiddenSourceMarkers.some((marker) => normalized.includes(marker));
};

const blocked = (
  operation: "INITIALIZE" | "ADVANCE",
  reason: RealityProductionPressureSeedConsumerBlockedReason,
  session: RealityProductionPressureSeedSession | null,
): RealityProductionPressureSeedConsumerResult => Object.freeze({
  status: "BLOCKED" as const,
  operation,
  session,
  reason,
  boundary: REALITY_PRODUCTION_PRESSURE_SEED_CONSUMER_BOUNDARY,
});

const isCandidateSourceContextValid = (
  context: RealityPressureSeedCandidateSourceContext,
): boolean =>
  Object.isFrozen(context) &&
  Object.isFrozen(context.candidateBundle) &&
  Object.isFrozen(context.candidateBundle.candidates) &&
  Object.isFrozen(context.candidateRecords) &&
  context.schemaVersion ===
    "GUANYAO_REALITY_PRESSURE_CANDIDATE_SOURCE_CONTEXT_V1" &&
  context.source === "reality_pressure_seed_candidate_source" &&
  context.sourceExperienceMode === "REAL_USER_EXPERIENCE" &&
  context.sourceReferenceId.trim().length > 0 &&
  context.bundleReferenceId === context.candidateBundle.bundleReferenceId &&
  context.sourceReferenceId === context.candidateBundle.sourceReferenceId &&
  context.candidateBundle.selectionMode === "USER_RECOGNITION_REQUIRED" &&
  context.candidateBundle.provenance.candidateSource ===
    "PRESSURE_SEED_MATRIX_V2" &&
  context.candidateBundle.provenance.userRecognitionRequired === true &&
  context.candidateBundle.provenance.noAutomaticSelection === true &&
  context.candidateBundle.provenance.noDefaultCandidate === true &&
  context.boundary.productionCandidateSourceOnly === true &&
  context.boundary.noDefaultSource === true &&
  context.boundary.noAutomaticSelection === true &&
  context.boundary.noCaptureExecution === true;

const createSession = (input: Readonly<{
  sourceReferenceId: string;
  candidateBundle: RealityPressureSeedCandidateBundle;
  captureState: RealityPressureSeedCaptureState;
  selectedPressureSeedContext: Readonly<SelectedPressureSeedContext> | null;
  captureProvenance: RealityPressureSeedCaptureProvenance | null;
  gravityReadiness: "NOT_READY" | "READY";
}>): RealityProductionPressureSeedSession => Object.freeze({
  schemaVersion: "GUANYAO_REALITY_PRODUCTION_PRESSURE_SEED_SESSION_V2" as const,
  source: "reality_production_pressure_seed_consumer" as const,
  sourceExperienceMode: "REAL_USER_EXPERIENCE" as const,
  sourceProvenance: "REAL_USER_SESSION" as const,
  sourceReferenceId: input.sourceReferenceId,
  realityEntryEligibility: "ELIGIBLE" as const,
  candidateBundle: input.candidateBundle,
  candidateBundleReferenceId: input.candidateBundle.bundleReferenceId,
  captureState: input.captureState,
  selectedPressureSeedContext: input.selectedPressureSeedContext,
  captureProvenance: input.captureProvenance,
  gravityReadiness: input.gravityReadiness,
  availableEvents:
    input.captureState === "SEED_RECOGNIZED" ? NO_EVENTS : ALL_CAPTURE_EVENTS,
  boundary: REALITY_PRODUCTION_PRESSURE_SEED_CONSUMER_BOUNDARY,
});

const isSessionValid = (
  session: RealityProductionPressureSeedSession,
): boolean =>
  Object.isFrozen(session) &&
  Object.isFrozen(session.candidateBundle) &&
  Object.isFrozen(session.candidateBundle.candidates) &&
  Object.isFrozen(session.availableEvents) &&
  session.schemaVersion ===
    "GUANYAO_REALITY_PRODUCTION_PRESSURE_SEED_SESSION_V2" &&
  session.source === "reality_production_pressure_seed_consumer" &&
  session.sourceExperienceMode === "REAL_USER_EXPERIENCE" &&
  session.sourceProvenance === "REAL_USER_SESSION" &&
  session.sourceReferenceId.trim().length > 0 &&
  !hasForbiddenSourceReference(session.sourceReferenceId) &&
  session.realityEntryEligibility === "ELIGIBLE" &&
  session.candidateBundle.sourceReferenceId === session.sourceReferenceId &&
  session.candidateBundleReferenceId ===
    session.candidateBundle.bundleReferenceId &&
  session.candidateBundle.selectionMode === "USER_RECOGNITION_REQUIRED" &&
  session.boundary === REALITY_PRODUCTION_PRESSURE_SEED_CONSUMER_BOUNDARY &&
  (
    ((session.captureState === "OBSERVING_CANDIDATES" ||
      session.captureState === "PAUSED") &&
      session.selectedPressureSeedContext === null &&
      session.captureProvenance === null &&
      session.gravityReadiness === "NOT_READY" &&
      session.availableEvents.length === ALL_CAPTURE_EVENTS.length) ||
    (session.captureState === "SEED_RECOGNIZED" &&
      session.selectedPressureSeedContext !== null &&
      session.captureProvenance !== null &&
      session.captureProvenance.sourceReferenceId ===
        session.sourceReferenceId &&
      session.captureProvenance.bundleReferenceId ===
        session.candidateBundleReferenceId &&
      session.captureProvenance.candidateReferenceId ===
        session.selectedPressureSeedContext.selectedPressureSeedId &&
      session.gravityReadiness === "READY" &&
      session.availableEvents.length === 0)
  );

export function initializeRealityProductionPressureSeedConsumer(
  input: RealityProductionPressureSeedConsumerInitializeInput,
): RealityProductionPressureSeedConsumerResult {
  const authorization = input.routeAuthorization;
  if (
    authorization.status !== "READY" ||
    authorization.authorizationState !==
      "AUTHORIZED_PRODUCTION_REALITY_SOURCE" ||
    authorization.routeTarget !== "/reality" ||
    authorization.sourceContext.sourceExperienceMode !==
      "REAL_USER_EXPERIENCE" ||
    authorization.sourceContext.sourceProvenance !== "REAL_USER_SESSION" ||
    authorization.sourceContext.realityEntryEligibility !== "ELIGIBLE"
  ) {
    return blocked(
      "INITIALIZE",
      "REALITY_ROUTE_AUTHORIZATION_REQUIRED",
      null,
    );
  }
  const sourceReferenceId = authorization.sourceReferenceId;
  const candidateSourceContext = input.candidateSourceContext;
  if (
    hasForbiddenSourceReference(sourceReferenceId) ||
    hasForbiddenSourceReference(candidateSourceContext.sourceReferenceId)
  ) {
    return blocked("INITIALIZE", "FORBIDDEN_SOURCE_REFERENCE", null);
  }
  if (!isCandidateSourceContextValid(candidateSourceContext)) {
    return blocked("INITIALIZE", "CANDIDATE_SOURCE_CONTEXT_INVALID", null);
  }
  if (
    sourceReferenceId !== candidateSourceContext.sourceReferenceId ||
    sourceReferenceId !==
      authorization.sourceContext.sourceReferenceId
  ) {
    return blocked("INITIALIZE", "SOURCE_REFERENCE_MISMATCH", null);
  }

  return Object.freeze({
    status: "READY" as const,
    operation: "INITIALIZE" as const,
    session: createSession({
      sourceReferenceId,
      candidateBundle: candidateSourceContext.candidateBundle,
      captureState: "OBSERVING_CANDIDATES",
      selectedPressureSeedContext: null,
      captureProvenance: null,
      gravityReadiness: "NOT_READY",
    }),
    reason: null,
    boundary: REALITY_PRODUCTION_PRESSURE_SEED_CONSUMER_BOUNDARY,
  });
}

const advanceToNextBundle = (
  session: RealityProductionPressureSeedSession,
  sourceContext: RealityPressureSeedCandidateSourceContext,
  command: RealityPressureSeedCaptureCommand,
): RealityProductionPressureSeedConsumerResult => {
  if (
    !isCandidateSourceContextValid(sourceContext) ||
    sourceContext.sourceReferenceId !== session.sourceReferenceId
  ) {
    return blocked("ADVANCE", "CANDIDATE_SOURCE_CONTEXT_INVALID", session);
  }
  if (
    sourceContext.bundleReferenceId === session.candidateBundleReferenceId ||
    command.candidateBundleReferenceId !== sourceContext.bundleReferenceId
  ) {
    return blocked("ADVANCE", "NEXT_CANDIDATE_BUNDLE_REQUIRED", session);
  }
  const previousCandidateIds = new Set(
    session.candidateBundle.candidates.map(
      (candidate) => candidate.candidateReferenceId,
    ),
  );
  if (
    sourceContext.candidateBundle.candidates.some((candidate) =>
      previousCandidateIds.has(candidate.candidateReferenceId),
    )
  ) {
    return blocked("ADVANCE", "CANDIDATE_SOURCE_CONTEXT_INVALID", session);
  }

  return Object.freeze({
    status: "READY" as const,
    operation: "ADVANCE" as const,
    session: createSession({
      sourceReferenceId: session.sourceReferenceId,
      candidateBundle: sourceContext.candidateBundle,
      captureState: "OBSERVING_CANDIDATES",
      selectedPressureSeedContext: null,
      captureProvenance: null,
      gravityReadiness: "NOT_READY",
    }),
    reason: null,
    boundary: REALITY_PRODUCTION_PRESSURE_SEED_CONSUMER_BOUNDARY,
  });
};

export function advanceRealityProductionPressureSeedConsumer(
  input: RealityProductionPressureSeedConsumerAdvanceInput,
): RealityProductionPressureSeedConsumerResult {
  const { session, candidateSourceContext, command } = input;
  if (!isSessionValid(session)) {
    return blocked("ADVANCE", "PRESSURE_SEED_SESSION_INVALID", session);
  }
  if (session.captureState === "SEED_RECOGNIZED") {
    return blocked("ADVANCE", "PRESSURE_SEED_ALREADY_RECOGNIZED", session);
  }
  if (hasForbiddenSourceReference(command.sourceReferenceId)) {
    return blocked("ADVANCE", "FORBIDDEN_SOURCE_REFERENCE", session);
  }
  if (
    command.sourceReferenceId !== session.sourceReferenceId ||
    candidateSourceContext.sourceReferenceId !== session.sourceReferenceId
  ) {
    return blocked("ADVANCE", "SOURCE_REFERENCE_MISMATCH", session);
  }

  if (command.event === "PRESSURE_SEED_REQUEST_NEXT_BUNDLE") {
    return advanceToNextBundle(session, candidateSourceContext, command);
  }
  if (
    candidateSourceContext.bundleReferenceId !==
      session.candidateBundleReferenceId ||
    command.candidateBundleReferenceId !==
      session.candidateBundleReferenceId
  ) {
    return blocked(
      "ADVANCE",
      "CANDIDATE_BUNDLE_REFERENCE_MISMATCH",
      session,
    );
  }
  if (command.event === "PRESSURE_SEED_PAUSE") {
    return Object.freeze({
      status: "READY" as const,
      operation: "ADVANCE" as const,
      session: createSession({
        sourceReferenceId: session.sourceReferenceId,
        candidateBundle: session.candidateBundle,
        captureState: "PAUSED",
        selectedPressureSeedContext: null,
        captureProvenance: null,
        gravityReadiness: "NOT_READY",
      }),
      reason: null,
      boundary: REALITY_PRODUCTION_PRESSURE_SEED_CONSUMER_BOUNDARY,
    });
  }

  const captureResult = captureRealityPressureSeed({
    sourceContext: candidateSourceContext,
    command,
  });
  if (captureResult.status !== "CAPTURED") {
    return blocked("ADVANCE", "CAPTURE_ADAPTER_BLOCKED", session);
  }

  return Object.freeze({
    status: "READY" as const,
    operation: "ADVANCE" as const,
    session: createSession({
      sourceReferenceId: session.sourceReferenceId,
      candidateBundle: session.candidateBundle,
      captureState: captureResult.captureState,
      selectedPressureSeedContext:
        captureResult.selectedPressureSeedContext,
      captureProvenance: captureResult.provenance,
      gravityReadiness: captureResult.gravityReadiness,
    }),
    reason: null,
    boundary: REALITY_PRODUCTION_PRESSURE_SEED_CONSUMER_BOUNDARY,
  });
}
