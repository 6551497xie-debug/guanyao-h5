import type { LaunchLifeSourceSession } from "../types/launchLifeSourceSession";
import type {
  RealityPressureCandidateActivationContext,
  RealityPressureCandidateActivationContextBlockedReason,
  RealityPressureCandidateActivationContextInput,
  RealityPressureCandidateActivationContextResult,
  RealityPressureExplicitRequestDateSource,
} from "../types/realityPressureCandidateActivationContext";
import { REALITY_PRESSURE_CANDIDATE_ACTIVATION_CONTEXT_BOUNDARY } from "./realityPressureCandidateActivationContextContract";

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

const unavailable = (
  status: "SOURCE_NOT_READY" | "BLOCKED",
  reason: RealityPressureCandidateActivationContextBlockedReason,
): RealityPressureCandidateActivationContextResult => Object.freeze({
  status,
  context: null,
  reason,
  boundary: REALITY_PRESSURE_CANDIDATE_ACTIVATION_CONTEXT_BOUNDARY,
});

const isLeapYear = (year: number): boolean =>
  year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);

const isValidExplicitCalendarDate = (value: string): boolean => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (year < 1 || month < 1 || month > 12 || day < 1) return false;
  const daysInMonth = [
    31,
    isLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  return day <= (daysInMonth[month - 1] ?? 0);
};

const isAuthorizedRealitySource = (
  authorization: RealityPressureCandidateActivationContextInput["routeAuthorization"],
): authorization is Extract<
  RealityPressureCandidateActivationContextInput["routeAuthorization"],
  { status: "READY" }
> =>
  authorization?.status === "READY" &&
  authorization.authorizationState ===
    "AUTHORIZED_PRODUCTION_REALITY_SOURCE" &&
  authorization.routeTarget === "/reality" &&
  authorization.sourceContext.sourceExperienceMode ===
    "REAL_USER_EXPERIENCE" &&
  authorization.sourceContext.sourceProvenance === "REAL_USER_SESSION" &&
  authorization.sourceContext.realityEntryEligibility === "ELIGIBLE" &&
  authorization.sourceContext.sourceReferenceId ===
    authorization.sourceReferenceId;

const isRealLifeSourceSession = (
  session: LaunchLifeSourceSession | null | undefined,
): session is LaunchLifeSourceSession =>
  Boolean(
    session &&
      Object.isFrozen(session) &&
      Object.isFrozen(session.provenance) &&
      session.schemaVersion === "GUANYAO_LAUNCH_LIFE_SOURCE_SESSION_V1" &&
      session.source === "launch_life_source_session" &&
      session.sourceKind === "REAL_ENGINE_RESULT" &&
      session.sourceReferenceId.trim().length > 0 &&
      session.provenance.sourceKind === "REAL_ENGINE_RESULT" &&
      session.provenance.birthSource === "LAUNCH_USER_CONFIRMED" &&
      session.provenance.sourceReferenceId === session.sourceReferenceId &&
      session.boundary.immutableCarrier === true &&
      session.boundary.existingEngineResultsOnly === true &&
      session.boundary.noEngineInvocation === true,
  );

const isExplicitRequestDateSource = (
  requestDateSource: RealityPressureExplicitRequestDateSource | null | undefined,
): requestDateSource is RealityPressureExplicitRequestDateSource =>
  Boolean(
    requestDateSource &&
      requestDateSource.schemaVersion ===
        "GUANYAO_REALITY_PRESSURE_REQUEST_DATE_SOURCE_V1" &&
      requestDateSource.source ===
        "reality_pressure_explicit_request_date_source" &&
      requestDateSource.sourceExperienceMode === "REAL_USER_EXPERIENCE" &&
      requestDateSource.sourceProvenance === "EXPLICIT_CALLER_PROVIDED" &&
      requestDateSource.captureBoundary === "REALITY_ROUTE_ACTIVATION" &&
      requestDateSource.sourceReferenceId.trim().length > 0 &&
      isValidExplicitCalendarDate(requestDateSource.asOfDate),
  );

export function createRealityPressureCandidateActivationContext(
  input: RealityPressureCandidateActivationContextInput,
): RealityPressureCandidateActivationContextResult {
  const authorization = input?.routeAuthorization;
  if (!isAuthorizedRealitySource(authorization)) {
    return unavailable(
      "SOURCE_NOT_READY",
      "REALITY_ROUTE_AUTHORIZATION_REQUIRED",
    );
  }
  const lifeSourceSession = input.lifeSourceSession;
  if (!isRealLifeSourceSession(lifeSourceSession)) {
    return unavailable(
      "SOURCE_NOT_READY",
      "REAL_LIFE_SOURCE_SESSION_REQUIRED",
    );
  }
  const requestDateSource = input.requestDateSource;
  if (!requestDateSource) {
    return unavailable("SOURCE_NOT_READY", "EXPLICIT_REQUEST_DATE_REQUIRED");
  }
  if (!isExplicitRequestDateSource(requestDateSource)) {
    return unavailable("BLOCKED", "REQUEST_DATE_INVALID");
  }

  const sourceReferenceId = authorization.sourceReferenceId;
  if (
    hasForbiddenSourceReference(sourceReferenceId) ||
    hasForbiddenSourceReference(lifeSourceSession.sourceReferenceId) ||
    hasForbiddenSourceReference(requestDateSource.sourceReferenceId)
  ) {
    return unavailable("BLOCKED", "FORBIDDEN_SOURCE_REFERENCE");
  }
  if (
    sourceReferenceId !== lifeSourceSession.sourceReferenceId ||
    sourceReferenceId !== requestDateSource.sourceReferenceId
  ) {
    return unavailable("BLOCKED", "SOURCE_REFERENCE_MISMATCH");
  }
  if (
    lifeSourceSession.sourceKind !== "REAL_ENGINE_RESULT" ||
    lifeSourceSession.provenance.sourceKind !== "REAL_ENGINE_RESULT"
  ) {
    return unavailable("BLOCKED", "SOURCE_PROVENANCE_INVALID");
  }

  const frozenRequestDateSource = Object.freeze({ ...requestDateSource });
  const excludedCandidateIds = Object.freeze([]) as readonly [];
  const provenance = Object.freeze({
    routeAuthorizationSource:
      "REALITY_PRODUCTION_ROUTE_AUTHORIZATION" as const,
    lifeSource: "LAUNCH_LIFE_SOURCE_SESSION" as const,
    requestDateSource: "EXPLICIT_REQUEST_DATE_SOURCE" as const,
    sourceReferenceId,
    noPressureInference: true as const,
    noCandidateSelection: true as const,
  });
  const context: RealityPressureCandidateActivationContext = Object.freeze({
    schemaVersion:
      "GUANYAO_REALITY_PRESSURE_CANDIDATE_ACTIVATION_CONTEXT_V1" as const,
    source: "reality_pressure_candidate_activation_context" as const,
    contextReferenceId: [
      "reality-pressure-candidate-activation",
      sourceReferenceId,
      frozenRequestDateSource.asOfDate,
    ].join(":"),
    sourceMode: "REAL_USER_EXPERIENCE" as const,
    sourceExperienceMode: "REAL_USER_EXPERIENCE" as const,
    sourceProvenance: "REAL_USER_SESSION" as const,
    sourceReferenceId,
    routeTarget: "/reality" as const,
    authorizationState:
      "AUTHORIZED_PRODUCTION_REALITY_SOURCE" as const,
    activationEligibility: "ELIGIBLE" as const,
    activationBoundary: "REALITY_ROUTE_ACTIVATION" as const,
    lifeSourceSession,
    requestDateSource: frozenRequestDateSource,
    candidateCursor: null,
    excludedCandidateIds,
    provenance,
    boundary: REALITY_PRESSURE_CANDIDATE_ACTIVATION_CONTEXT_BOUNDARY,
  });

  return Object.freeze({
    status: "READY" as const,
    context,
    reason: null,
    boundary: REALITY_PRESSURE_CANDIDATE_ACTIVATION_CONTEXT_BOUNDARY,
  });
}
