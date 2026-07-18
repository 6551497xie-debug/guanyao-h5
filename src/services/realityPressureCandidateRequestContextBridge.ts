import type { GuanyaoAgeSegment } from "../types/guanyaoPressureSeed";
import type { LaunchLifeSourceSession } from "../types/launchLifeSourceSession";
import type {
  RealityPressureCandidateRequestContextBridgeBlockedReason,
  RealityPressureCandidateRequestContextBridgeBoundary,
  RealityPressureCandidateRequestContextBridgeInput,
  RealityPressureCandidateRequestContextBridgeResult,
} from "../types/realityPressureCandidateRequestContextBridge";

export const REALITY_PRESSURE_CANDIDATE_REQUEST_CONTEXT_BRIDGE_BOUNDARY:
  RealityPressureCandidateRequestContextBridgeBoundary = Object.freeze({
    requestContextBridgeOnly: true,
    existingLaunchLifeSourceSessionOnly: true,
    confirmedBirthCoordinateOnly: true,
    ageSegmentCatalogRoutingOnly: true,
    explicitAsOfDateRequired: true,
    deterministicAgeResolutionOnly: true,
    sourceReferenceContinuityRequired: true,
    immutableOutputOnly: true,
    noFixtureSource: true,
    noPrototypeSource: true,
    noDefaultSource: true,
    noReferenceOnlySource: true,
    noSourceFallback: true,
    noSystemClock: true,
    noEngineInvocation: true,
    noMatrixRead: true,
    noCandidateSourceInvocation: true,
    noCandidateAssembly: true,
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

type CalendarDate = Readonly<{
  year: number;
  month: number;
  day: number;
}>;

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

const isValidCalendarDate = (date: CalendarDate): boolean => {
  if (
    !Number.isInteger(date.year) ||
    !Number.isInteger(date.month) ||
    !Number.isInteger(date.day)
  ) {
    return false;
  }
  const parsed = new Date(Date.UTC(date.year, date.month - 1, date.day));
  return (
    parsed.getUTCFullYear() === date.year &&
    parsed.getUTCMonth() + 1 === date.month &&
    parsed.getUTCDate() === date.day
  );
};

const parseIsoDate = (value: string): CalendarDate | null => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const date = Object.freeze({
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3]),
  });
  return isValidCalendarDate(date) ? date : null;
};

const compareCalendarDate = (left: CalendarDate, right: CalendarDate): number =>
  left.year !== right.year
    ? left.year - right.year
    : left.month !== right.month
      ? left.month - right.month
      : left.day - right.day;

const resolveAge = (birth: CalendarDate, asOf: CalendarDate): number => {
  const birthdayHasOccurred =
    asOf.month > birth.month ||
    (asOf.month === birth.month && asOf.day >= birth.day);
  return asOf.year - birth.year - (birthdayHasOccurred ? 0 : 1);
};

const resolveAgeSegment = (age: number): GuanyaoAgeSegment | null => {
  if (age < 18) return null;
  if (age <= 24) return "YOUTH";
  if (age <= 34) return "ESTABLISHING";
  if (age <= 44) return "MID_LIFE";
  if (age <= 59) return "RESTRUCTURING";
  return "SIXTY_PLUS";
};

const sourceNotReady = (
  reason: RealityPressureCandidateRequestContextBridgeBlockedReason,
): RealityPressureCandidateRequestContextBridgeResult => Object.freeze({
  status: "SOURCE_NOT_READY" as const,
  source: "reality_pressure_candidate_request_context_bridge" as const,
  context: null,
  reason,
  boundary: REALITY_PRESSURE_CANDIDATE_REQUEST_CONTEXT_BRIDGE_BOUNDARY,
});

const blocked = (
  reason: RealityPressureCandidateRequestContextBridgeBlockedReason,
): RealityPressureCandidateRequestContextBridgeResult => Object.freeze({
  status: "BLOCKED" as const,
  source: "reality_pressure_candidate_request_context_bridge" as const,
  context: null,
  reason,
  boundary: REALITY_PRESSURE_CANDIDATE_REQUEST_CONTEXT_BRIDGE_BOUNDARY,
});

const isRealLifeSourceSession = (
  session: LaunchLifeSourceSession,
): boolean =>
  Object.isFrozen(session) &&
  session.schemaVersion === "GUANYAO_LAUNCH_LIFE_SOURCE_SESSION_V1" &&
  session.source === "launch_life_source_session" &&
  session.sourceKind === "REAL_ENGINE_RESULT" &&
  session.provenance.sourceKind === "REAL_ENGINE_RESULT" &&
  session.provenance.birthSource === "LAUNCH_USER_CONFIRMED" &&
  session.boundary.immutableCarrier === true &&
  session.boundary.existingEngineResultsOnly === true &&
  session.boundary.noEngineInvocation === true &&
  session.boundary.noStorageWrite === true;

export function bridgeRealityPressureCandidateRequestContext(
  input: RealityPressureCandidateRequestContextBridgeInput,
): RealityPressureCandidateRequestContextBridgeResult {
  const session = input.lifeSourceSession;
  if (!isRealLifeSourceSession(session)) {
    return sourceNotReady("REAL_LIFE_SOURCE_SESSION_REQUIRED");
  }
  const sourceReferenceId = session.sourceReferenceId.trim();
  if (!sourceReferenceId) return sourceNotReady("SOURCE_REFERENCE_REQUIRED");
  if (hasForbiddenSourceReference(sourceReferenceId)) {
    return blocked("FORBIDDEN_SOURCE_REFERENCE");
  }
  if (session.provenance.sourceReferenceId !== sourceReferenceId) {
    return blocked("SOURCE_REFERENCE_MISMATCH");
  }

  const asOfDateValue = input.asOfDate.trim();
  if (!asOfDateValue) return sourceNotReady("AS_OF_DATE_REQUIRED");
  const asOfDate = parseIsoDate(asOfDateValue);
  if (!asOfDate) return blocked("AS_OF_DATE_INVALID");

  const birthCoordinate = session.birthCoordinate;
  const birthDate = Object.freeze({
    year: birthCoordinate.year,
    month: birthCoordinate.month,
    day: birthCoordinate.day,
  });
  if (!isValidCalendarDate(birthDate)) {
    return blocked("BIRTH_COORDINATE_INVALID");
  }
  if (compareCalendarDate(birthDate, asOfDate) > 0) {
    return blocked("BIRTH_DATE_AFTER_AS_OF_DATE");
  }
  const ageAtRequest = resolveAge(birthDate, asOfDate);
  const ageSegment = resolveAgeSegment(ageAtRequest);
  if (!ageSegment) return blocked("AGE_NOT_SUPPORTED");

  const excludedCandidateReferenceIds = [
    ...input.excludedCandidateReferenceIds,
  ];
  if (
    excludedCandidateReferenceIds.some((reference) => !reference.trim()) ||
    new Set(excludedCandidateReferenceIds).size !==
      excludedCandidateReferenceIds.length
  ) {
    return blocked("EXCLUDED_CANDIDATE_REFERENCES_INVALID");
  }
  Object.freeze(excludedCandidateReferenceIds);

  const candidateRequest = Object.freeze({
    sourceExperienceMode: "REAL_USER_EXPERIENCE" as const,
    sourceReferenceId,
    candidateCursor: input.candidateCursor,
    excludedCandidateReferenceIds,
    ageSegment,
    ageSegmentRole: "CATALOG_ROUTING_ONLY" as const,
  });
  const provenance = Object.freeze({
    lifeSource: "LAUNCH_LIFE_SOURCE_SESSION" as const,
    birthSource: "LAUNCH_USER_CONFIRMED" as const,
    ageResolution:
      "CONFIRMED_BIRTH_COORDINATE_AGE_ROUTING" as const,
    noPressureInference: true as const,
  });
  const context = Object.freeze({
    schemaVersion:
      "GUANYAO_REALITY_PRESSURE_CANDIDATE_REQUEST_CONTEXT_V1" as const,
    source: "reality_pressure_candidate_request_context_bridge" as const,
    sourceExperienceMode: "REAL_USER_EXPERIENCE" as const,
    sourceProvenance: "REAL_USER_SESSION" as const,
    sourceReferenceId,
    asOfDate: asOfDateValue,
    ageAtRequest,
    ageSegment,
    ageSegmentRole: "CATALOG_ROUTING_ONLY" as const,
    candidateRequest,
    provenance,
    boundary: REALITY_PRESSURE_CANDIDATE_REQUEST_CONTEXT_BRIDGE_BOUNDARY,
  });

  return Object.freeze({
    status: "READY" as const,
    source: "reality_pressure_candidate_request_context_bridge" as const,
    context,
    reason: null,
    boundary: REALITY_PRESSURE_CANDIDATE_REQUEST_CONTEXT_BRIDGE_BOUNDARY,
  });
}
