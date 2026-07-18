import type { RealityPressureSeedCandidateSourceResult } from "../types/realityPressureSeedCandidateSource";
import type {
  RealityPressureCandidateDeliverySession,
  RealityPressureCandidateDeliverySessionAdvanceInput,
  RealityPressureCandidateDeliverySessionBlockedReason,
  RealityPressureCandidateDeliverySessionBoundary,
  RealityPressureCandidateDeliverySessionInitializeInput,
  RealityPressureCandidateDeliverySessionResult,
} from "../types/realityPressureCandidateDeliverySession";

export const REALITY_PRESSURE_CANDIDATE_DELIVERY_SESSION_BOUNDARY:
  RealityPressureCandidateDeliverySessionBoundary = Object.freeze({
    deliverySessionOnly: true,
    readyCandidateSourceResultOnly: true,
    immutableDeliveryHistoryOnly: true,
    sourceReferenceContinuityRequired: true,
    candidateCursorContinuityRequired: true,
    cumulativeCandidateHistoryRequired: true,
    uniqueCandidateDeliveryRequired: true,
    noFixtureSource: true,
    noPrototypeSource: true,
    noDefaultSource: true,
    noReferenceOnlySource: true,
    noSourceFallback: true,
    noCandidateSourceResolution: true,
    noCandidateAssembly: true,
    noEngineInvocation: true,
    noCaptureExecution: true,
    noPressureConsumerIntegration: true,
    noGravityIntegration: true,
    noUiIntegration: true,
    noRendererInvocation: true,
    noRouteMutation: true,
    noNavigationMutation: true,
    noStorageRead: true,
    noStorageWrite: true,
  });

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

const freezeArray = <T>(values: readonly T[]): readonly T[] =>
  Object.freeze([...values]);

const arraysEqual = (
  left: readonly string[],
  right: readonly string[],
): boolean =>
  left.length === right.length &&
  left.every((value, index) => value === right[index]);

const blocked = (
  operation: "INITIALIZE" | "ADVANCE",
  reason: RealityPressureCandidateDeliverySessionBlockedReason,
  session: RealityPressureCandidateDeliverySession | null,
): RealityPressureCandidateDeliverySessionResult => Object.freeze({
  status: "BLOCKED" as const,
  operation,
  session,
  reason,
  boundary: REALITY_PRESSURE_CANDIDATE_DELIVERY_SESSION_BOUNDARY,
});

const isReadySourceResult = (
  result: RealityPressureSeedCandidateSourceResult,
): result is Extract<RealityPressureSeedCandidateSourceResult, { status: "READY" }> =>
  result.status === "READY" &&
  result.context.sourceExperienceMode === "REAL_USER_EXPERIENCE" &&
  result.context.sourceReferenceId === result.request.sourceReferenceId.trim() &&
  result.context.bundleReferenceId ===
    result.context.candidateBundle.bundleReferenceId &&
  result.context.candidateBundle.candidates.length === 3 &&
  result.context.candidateRecords.length === 3 &&
  result.context.candidateBundle.provenance.candidateSource ===
    "PRESSURE_SEED_MATRIX_V2" &&
  Object.isFrozen(result.context) &&
  Object.isFrozen(result.context.candidateBundle) &&
  Object.isFrozen(result.context.candidateBundle.candidates) &&
  Object.isFrozen(result.context.candidateRecords);

const isSessionValid = (
  session: RealityPressureCandidateDeliverySession,
): boolean =>
  Object.isFrozen(session) &&
  Object.isFrozen(session.deliveredBundleReferenceIds) &&
  Object.isFrozen(session.deliveredCandidateReferenceIds) &&
  session.schemaVersion ===
    "GUANYAO_REALITY_PRESSURE_CANDIDATE_DELIVERY_SESSION_V1" &&
  session.source === "reality_pressure_candidate_delivery_session" &&
  session.sourceExperienceMode === "REAL_USER_EXPERIENCE" &&
  session.sourceProvenance === "REAL_USER_SESSION" &&
  session.candidateSource === "PRESSURE_SEED_MATRIX_V2" &&
  session.deliveryState === "BUNDLE_READY" &&
  session.sourceReferenceId.trim().length > 0 &&
  !hasForbiddenSourceReference(session.sourceReferenceId) &&
  session.deliverySequence === session.deliveredBundleReferenceIds.length &&
  session.deliveredCandidateReferenceIds.length ===
    session.deliverySequence * 3 &&
  new Set(session.deliveredBundleReferenceIds).size ===
    session.deliveredBundleReferenceIds.length &&
  new Set(session.deliveredCandidateReferenceIds).size ===
    session.deliveredCandidateReferenceIds.length &&
  session.currentBundleReferenceId ===
    session.deliveredBundleReferenceIds[
      session.deliveredBundleReferenceIds.length - 1
    ] &&
  session.boundary === REALITY_PRESSURE_CANDIDATE_DELIVERY_SESSION_BOUNDARY;

const createSession = (
  sourceResult: Extract<
    RealityPressureSeedCandidateSourceResult,
    { status: "READY" }
  >,
  deliveredBundleReferenceIds: readonly string[],
  deliveredCandidateReferenceIds: readonly string[],
): RealityPressureCandidateDeliverySession => Object.freeze({
  schemaVersion:
    "GUANYAO_REALITY_PRESSURE_CANDIDATE_DELIVERY_SESSION_V1" as const,
  source: "reality_pressure_candidate_delivery_session" as const,
  sourceExperienceMode: "REAL_USER_EXPERIENCE" as const,
  sourceProvenance: "REAL_USER_SESSION" as const,
  candidateSource: "PRESSURE_SEED_MATRIX_V2" as const,
  sourceReferenceId: sourceResult.context.sourceReferenceId,
  deliverySequence: deliveredBundleReferenceIds.length,
  deliveryState: "BUNDLE_READY" as const,
  currentBundleReferenceId: sourceResult.context.bundleReferenceId,
  nextCandidateCursor:
    sourceResult.context.candidateBundle.nextCandidateCursor,
  deliveredBundleReferenceIds: freezeArray(deliveredBundleReferenceIds),
  deliveredCandidateReferenceIds: freezeArray(
    deliveredCandidateReferenceIds,
  ),
  boundary: REALITY_PRESSURE_CANDIDATE_DELIVERY_SESSION_BOUNDARY,
});

const candidateIdsFrom = (
  sourceResult: Extract<
    RealityPressureSeedCandidateSourceResult,
    { status: "READY" }
  >,
): readonly string[] =>
  sourceResult.context.candidateBundle.candidates.map(
    (candidate) => candidate.candidateReferenceId,
  );

export function initializeRealityPressureCandidateDeliverySession(
  input: RealityPressureCandidateDeliverySessionInitializeInput,
): RealityPressureCandidateDeliverySessionResult {
  const sourceResult = input.candidateSourceResult;
  if (sourceResult.status !== "READY") {
    return blocked("INITIALIZE", "CANDIDATE_SOURCE_NOT_READY", null);
  }
  if (!isReadySourceResult(sourceResult)) {
    return blocked("INITIALIZE", "CANDIDATE_SOURCE_CONTEXT_INVALID", null);
  }
  if (hasForbiddenSourceReference(sourceResult.context.sourceReferenceId)) {
    return blocked("INITIALIZE", "FORBIDDEN_SOURCE_REFERENCE", null);
  }
  if (
    sourceResult.request.candidateCursor !== null ||
    sourceResult.request.excludedCandidateReferenceIds.length !== 0
  ) {
    return blocked("INITIALIZE", "DELIVERY_HISTORY_MISMATCH", null);
  }

  const bundleReferenceIds = [sourceResult.context.bundleReferenceId];
  const candidateReferenceIds = candidateIdsFrom(sourceResult);
  if (new Set(candidateReferenceIds).size !== candidateReferenceIds.length) {
    return blocked("INITIALIZE", "DUPLICATE_CANDIDATE_DELIVERY", null);
  }
  const session = createSession(
    sourceResult,
    bundleReferenceIds,
    candidateReferenceIds,
  );
  return Object.freeze({
    status: "READY" as const,
    operation: "INITIALIZE" as const,
    session,
    reason: null,
    boundary: REALITY_PRESSURE_CANDIDATE_DELIVERY_SESSION_BOUNDARY,
  });
}

export function advanceRealityPressureCandidateDeliverySession(
  input: RealityPressureCandidateDeliverySessionAdvanceInput,
): RealityPressureCandidateDeliverySessionResult {
  const { session, candidateSourceResult: sourceResult } = input;
  if (!isSessionValid(session)) {
    return blocked("ADVANCE", "DELIVERY_SESSION_INVALID", session);
  }
  if (sourceResult.status !== "READY") {
    return blocked("ADVANCE", "CANDIDATE_SOURCE_NOT_READY", session);
  }
  if (!isReadySourceResult(sourceResult)) {
    return blocked("ADVANCE", "CANDIDATE_SOURCE_CONTEXT_INVALID", session);
  }
  if (sourceResult.context.sourceReferenceId !== session.sourceReferenceId) {
    return blocked("ADVANCE", "SOURCE_REFERENCE_MISMATCH", session);
  }
  if (sourceResult.request.candidateCursor !== session.nextCandidateCursor) {
    return blocked("ADVANCE", "CANDIDATE_CURSOR_MISMATCH", session);
  }
  if (
    !arraysEqual(
      sourceResult.request.excludedCandidateReferenceIds,
      session.deliveredCandidateReferenceIds,
    )
  ) {
    return blocked("ADVANCE", "DELIVERY_HISTORY_MISMATCH", session);
  }

  const nextCandidateReferenceIds = candidateIdsFrom(sourceResult);
  const deliveredCandidateReferences = new Set(
    session.deliveredCandidateReferenceIds,
  );
  if (
    session.deliveredBundleReferenceIds.includes(
      sourceResult.context.bundleReferenceId,
    ) ||
    nextCandidateReferenceIds.some((reference) =>
      deliveredCandidateReferences.has(reference),
    )
  ) {
    return blocked("ADVANCE", "DUPLICATE_CANDIDATE_DELIVERY", session);
  }

  const nextSession = createSession(
    sourceResult,
    [
      ...session.deliveredBundleReferenceIds,
      sourceResult.context.bundleReferenceId,
    ],
    [
      ...session.deliveredCandidateReferenceIds,
      ...nextCandidateReferenceIds,
    ],
  );
  return Object.freeze({
    status: "READY" as const,
    operation: "ADVANCE" as const,
    session: nextSession,
    reason: null,
    boundary: REALITY_PRESSURE_CANDIDATE_DELIVERY_SESSION_BOUNDARY,
  });
}
