import type { LaunchLifeSourceSession } from "../types/launchLifeSourceSession";
import type { RealityPressureExplicitRequestDateSource } from "../types/realityPressureCandidateActivationContext";
import type {
  RealityExplicitRequestDateSourceInput,
  RealityRouteActivationSourceContext,
  RealityRouteActivationSourceContextBlockedReason,
  RealityRouteActivationSourceContextBoundary,
  RealityRouteActivationSourceContextClearResult,
  RealityRouteActivationSourceContextInput,
  RealityRouteActivationSourceContextResult,
} from "../types/realityRouteActivationSourceContext";
import { isTrustedXinmaiLaunchLifeSourceSession } from "./xinmaiLaunchLifeSourceSessionValidator";

export const REALITY_ROUTE_ACTIVATION_SOURCE_CONTEXT_BOUNDARY:
  RealityRouteActivationSourceContextBoundary = Object.freeze({
    explicitRealityEntryOnly: true,
    encounterAdmissionRequired: true,
    inMemoryContextOnly: true,
    existingRealityEntryContextOnly: true,
    existingLaunchLifeSourceSessionOnly: true,
    explicitRequestDateSourceOnly: true,
    requestDateCapturedOnceOnly: true,
    sourceReferenceContinuityRequired: true,
    immutableContextOnly: true,
    noFixtureSource: true,
    noPrototypeSource: true,
    noDefaultSource: true,
    noReferenceOnlySource: true,
    noSourceFallback: true,
    noEngineInvocation: true,
    noSourceRecalculation: true,
    noRouteAuthorizationInvocation: true,
    noCandidateActivation: true,
    noCandidateSourceInvocation: true,
    noConsumerInvocation: true,
    noGravityIntegration: true,
    noUiIntegration: true,
    noRendererInvocation: true,
    noNavigationInvocation: true,
    noStorageRead: true,
    noStorageWrite: true,
  });

let activeContext: RealityRouteActivationSourceContext | null = null;

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
  reason: RealityRouteActivationSourceContextBlockedReason,
): RealityRouteActivationSourceContextResult => Object.freeze({
  status,
  context: null,
  reason,
});

const pad = (value: number): string => String(value).padStart(2, "0");

const isLeapYear = (year: number): boolean =>
  year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);

const isValidCalendarDate = (value: string): boolean => {
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

export function captureExplicitRealityRequestDateSource(
  input: RealityExplicitRequestDateSourceInput,
): RealityPressureExplicitRequestDateSource | null {
  const sourceReferenceId = input?.sourceReferenceId?.trim() ?? "";
  const calendarInstant = input?.calendarInstant;
  if (
    sourceReferenceId.length === 0 ||
    hasForbiddenSourceReference(sourceReferenceId) ||
    !(calendarInstant instanceof Date) ||
    Number.isNaN(calendarInstant.getTime())
  ) {
    return null;
  }
  const asOfDate = [
    String(calendarInstant.getFullYear()).padStart(4, "0"),
    pad(calendarInstant.getMonth() + 1),
    pad(calendarInstant.getDate()),
  ].join("-");
  return Object.freeze({
    schemaVersion: "GUANYAO_REALITY_PRESSURE_REQUEST_DATE_SOURCE_V1" as const,
    source: "reality_pressure_explicit_request_date_source" as const,
    sourceExperienceMode: "REAL_USER_EXPERIENCE" as const,
    sourceProvenance: "EXPLICIT_CALLER_PROVIDED" as const,
    sourceReferenceId,
    asOfDate,
    captureBoundary: "REALITY_ROUTE_ACTIVATION" as const,
  });
}

const isExplicitRequestDateSource = (
  source: RealityPressureExplicitRequestDateSource | null | undefined,
): source is RealityPressureExplicitRequestDateSource =>
  Boolean(
    source &&
      Object.isFrozen(source) &&
      source.schemaVersion ===
        "GUANYAO_REALITY_PRESSURE_REQUEST_DATE_SOURCE_V1" &&
      source.source === "reality_pressure_explicit_request_date_source" &&
      source.sourceExperienceMode === "REAL_USER_EXPERIENCE" &&
      source.sourceProvenance === "EXPLICIT_CALLER_PROVIDED" &&
      source.captureBoundary === "REALITY_ROUTE_ACTIVATION" &&
      isValidCalendarDate(source.asOfDate),
  );

export function activateRealityRouteActivationSourceContext(
  input: RealityRouteActivationSourceContextInput,
): RealityRouteActivationSourceContextResult {
  const entryContext = input?.realityEntryContext;
  if (!entryContext) {
    return unavailable("SOURCE_NOT_READY", "REALITY_ENTRY_CONTEXT_REQUIRED");
  }
  if (
    !Object.isFrozen(entryContext) ||
    !Object.isFrozen(entryContext.recognitionRealitySession) ||
    entryContext.schemaVersion !==
      "GUANYAO_GENESIS_PRODUCTION_REALITY_ENTRY_CONTEXT_V1" ||
    entryContext.source !== "genesis_production_reality_entry_context" ||
    entryContext.sourceProvenance !== "REAL_USER_SESSION" ||
    entryContext.eligibility !== "ELIGIBLE" ||
    entryContext.recognitionRealitySession.phase !==
      "REALITY_ENTRY_ELIGIBLE" ||
    entryContext.recognitionRealitySession.realityEntryConfirmed !== true
  ) {
    return unavailable("BLOCKED", "REALITY_ENTRY_CONTEXT_INVALID");
  }
  const routeAuthorization = input.routeAuthorization;
  const encounterAdmission = input.encounterAdmission;
  if (!encounterAdmission) {
    return unavailable(
      "SOURCE_NOT_READY",
      "ENCOUNTER_ADMISSION_REQUIRED",
    );
  }
  if (
    routeAuthorization.status !== "READY" ||
    encounterAdmission.state !== "ACCEPTING_REALITY" ||
    routeAuthorization.intentReferenceId !==
      encounterAdmission.intentReferenceId ||
    routeAuthorization.encounterCycleId !==
      encounterAdmission.encounterCycleId ||
    routeAuthorization.intentRevision !==
      encounterAdmission.intentRevision
  ) {
    return unavailable("BLOCKED", "ENCOUNTER_ADMISSION_INVALID");
  }
  const lifeSourceSession = input.lifeSourceSession;
  if (!isTrustedXinmaiLaunchLifeSourceSession(lifeSourceSession)) {
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
    return unavailable("BLOCKED", "EXPLICIT_REQUEST_DATE_INVALID");
  }

  const sourceReferenceId = entryContext.sourceReferenceId;
  if (
    hasForbiddenSourceReference(sourceReferenceId) ||
    hasForbiddenSourceReference(lifeSourceSession.sourceReferenceId) ||
    hasForbiddenSourceReference(requestDateSource.sourceReferenceId)
  ) {
    return unavailable("BLOCKED", "FORBIDDEN_SOURCE_REFERENCE");
  }
  if (
    sourceReferenceId !==
      entryContext.recognitionRealitySession.sourceReferenceId ||
    sourceReferenceId !== lifeSourceSession.sourceReferenceId ||
    sourceReferenceId !== requestDateSource.sourceReferenceId ||
    sourceReferenceId !== routeAuthorization.sourceReferenceId ||
    sourceReferenceId !==
      encounterAdmission.identityReferences.sourceReferenceId
  ) {
    return unavailable("BLOCKED", "SOURCE_REFERENCE_MISMATCH");
  }
  if (
    activeContext?.intentReferenceId ===
      encounterAdmission.intentReferenceId &&
    activeContext.encounterCycleId ===
      encounterAdmission.encounterCycleId &&
    activeContext.intentRevision === encounterAdmission.intentRevision
  ) {
    return Object.freeze({
      status: "AVAILABLE" as const,
      context: activeContext,
      reason: null,
    });
  }

  activeContext = Object.freeze({
    schemaVersion: "GUANYAO_REALITY_ROUTE_ACTIVATION_SOURCE_CONTEXT_V1" as const,
    source: "reality_route_activation_source_context" as const,
    contextReferenceId:
      `reality-route-activation:${encounterAdmission.encounterCycleId}:${encounterAdmission.intentRevision}`,
    sourceExperienceMode: "REAL_USER_EXPERIENCE" as const,
    sourceProvenance: "REAL_USER_SESSION" as const,
    sourceReferenceId,
    intentReferenceId: encounterAdmission.intentReferenceId,
    encounterCycleId: encounterAdmission.encounterCycleId,
    intentRevision: encounterAdmission.intentRevision,
    activationBoundary: "EXPLICIT_ENTER_REALITY" as const,
    realityEntryContext: entryContext,
    lifeSourceSession,
    requestDateSource,
    provenance: Object.freeze({
      realityEntrySource:
        "GENESIS_PRODUCTION_REALITY_ENTRY_CONTEXT" as const,
      lifeSource: "LAUNCH_LIFE_SOURCE_SESSION" as const,
      requestDateSource: "EXPLICIT_REALITY_ENTRY_CALENDAR_SOURCE" as const,
      sourceReferenceId,
      intentReferenceId: encounterAdmission.intentReferenceId,
      encounterCycleId: encounterAdmission.encounterCycleId,
      intentRevision: encounterAdmission.intentRevision,
      noPressureInference: true as const,
      noCandidateSelection: true as const,
    }),
    boundary: REALITY_ROUTE_ACTIVATION_SOURCE_CONTEXT_BOUNDARY,
  });

  return Object.freeze({
    status: "AVAILABLE" as const,
    context: activeContext,
    reason: null,
  });
}

export function readRealityRouteActivationSourceContext():
  RealityRouteActivationSourceContext | null {
  return activeContext;
}

export function clearRealityRouteActivationSourceContext(): void {
  activeContext = null;
}

export function clearRealityRouteActivationSourceContextForAdmission(
  encounterAdmission: Readonly<{
    intentReferenceId: string;
    encounterCycleId: string;
    intentRevision: number;
  }>,
): RealityRouteActivationSourceContextClearResult {
  if (activeContext === null) {
    return Object.freeze({
      status: "ALREADY_ABSENT" as const,
      reason: null,
    });
  }
  if (
    activeContext.intentReferenceId !==
      encounterAdmission.intentReferenceId ||
    activeContext.encounterCycleId !==
      encounterAdmission.encounterCycleId ||
    activeContext.intentRevision !==
      encounterAdmission.intentRevision
  ) {
    return Object.freeze({
      status: "MISMATCH" as const,
      reason: "ACTIVATION_ADMISSION_MISMATCH" as const,
    });
  }
  activeContext = null;
  return Object.freeze({
    status: "CLEARED" as const,
    reason: null,
  });
}

export const RealityRouteActivationSourceContextService = Object.freeze({
  captureDate: captureExplicitRealityRequestDateSource,
  activate: activateRealityRouteActivationSourceContext,
  read: readRealityRouteActivationSourceContext,
  clear: clearRealityRouteActivationSourceContext,
  clearForAdmission:
    clearRealityRouteActivationSourceContextForAdmission,
  boundary: REALITY_ROUTE_ACTIVATION_SOURCE_CONTEXT_BOUNDARY,
});
