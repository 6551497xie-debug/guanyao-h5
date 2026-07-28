import type {
  RealityProductionRouteActivationAuthorization,
  RealityProductionRouteAuthorizationBoundary,
  RealityProductionRouteAuthorizationInput,
  RealityProductionRouteGuardReason,
  RealityProductionSourceContext,
} from "../types/realityProductionRouteAuthorization";

export const REALITY_PRODUCTION_ROUTE_TARGET = "/reality" as const;

export const REALITY_PRODUCTION_ROUTE_AUTHORIZATION_BOUNDARY:
  RealityProductionRouteAuthorizationBoundary = Object.freeze({
    routeAuthorizationAndSourceAssemblyOnly: true,
    explicitRealityEntryRequired: true,
    realUserSessionProvenanceOnly: true,
    sourceReferenceContinuityRequired: true,
    encounterAdmissionRequired: true,
    explicitAuthorizationInputOnly: true,
    immutableSourceContextOnly: true,
    pressureRecognitionNotStarted: true,
    noFixtureSource: true,
    noPrototypeSource: true,
    noDefaultSource: true,
    noReferenceOnlySource: true,
    noSourceFallback: true,
    noEngineInvocation: true,
    noPressureExecution: true,
    noGravityExecution: true,
    noChoiceExecution: true,
    noCrystalExecution: true,
    noRendererInvocation: true,
    noRouteRegistration: true,
    noNavigationMutation: true,
    noUiIntegration: true,
    noStorageWrite: true,
    noStorageRead: true,
  });

const sourceNotReady = (
  sourceReferenceId: string | null,
  encounterAdmission:
    RealityProductionRouteAuthorizationInput["encounterAdmission"],
  guardReason: Exclude<
    RealityProductionRouteGuardReason,
    "ROUTE_TARGET_NOT_AUTHORIZED" | "FORBIDDEN_SOURCE_REFERENCE"
  >,
): RealityProductionRouteActivationAuthorization => Object.freeze({
  status: "SOURCE_NOT_READY" as const,
  source: "reality_production_route_authorization" as const,
  routeTarget: REALITY_PRODUCTION_ROUTE_TARGET,
  sourceReferenceId,
  intentReferenceId: encounterAdmission?.intentReferenceId ?? null,
  encounterCycleId: encounterAdmission?.encounterCycleId ?? null,
  intentRevision: encounterAdmission?.intentRevision ?? null,
  authorizationState: "SOURCE_NOT_READY" as const,
  guardReason,
  sourceContext: null,
  boundary: REALITY_PRODUCTION_ROUTE_AUTHORIZATION_BOUNDARY,
});

const blocked = (
  input: RealityProductionRouteAuthorizationInput,
  guardReason: "ROUTE_TARGET_NOT_AUTHORIZED" | "FORBIDDEN_SOURCE_REFERENCE",
): RealityProductionRouteActivationAuthorization => Object.freeze({
  status: "BLOCKED" as const,
  source: "reality_production_route_authorization" as const,
  routeTarget: input.routeTarget,
  sourceReferenceId:
    input.encounterAdmission?.identityReferences.sourceReferenceId ??
    input.identityEntryContext?.sourceReferenceId ??
    null,
  intentReferenceId: input.encounterAdmission?.intentReferenceId ?? null,
  encounterCycleId: input.encounterAdmission?.encounterCycleId ?? null,
  intentRevision: input.encounterAdmission?.intentRevision ?? null,
  authorizationState: "BLOCKED" as const,
  guardReason,
  sourceContext: null,
  boundary: REALITY_PRODUCTION_ROUTE_AUTHORIZATION_BOUNDARY,
});

const hasForbiddenSourceReference = (sourceReferenceId: string): boolean => {
  const normalized = sourceReferenceId.toLowerCase();
  return ["fixture", "prototype", "default", "referenceonly"].some((marker) =>
    normalized.includes(marker),
  );
};

export function authorizeRealityProductionRoute(
  input: RealityProductionRouteAuthorizationInput,
): RealityProductionRouteActivationAuthorization {
  if (input.routeTarget !== REALITY_PRODUCTION_ROUTE_TARGET) {
    return blocked(input, "ROUTE_TARGET_NOT_AUTHORIZED");
  }

  const entryContext = input.identityEntryContext;
  const encounterAdmission = input.encounterAdmission;
  if (encounterAdmission === null) {
    return sourceNotReady(
      entryContext?.sourceReferenceId ?? null,
      null,
      "ENCOUNTER_ADMISSION_REQUIRED",
    );
  }
  if (
    encounterAdmission.schemaVersion !==
      "XINMAI_REALITY_ENCOUNTER_ADMISSION_V1" ||
    encounterAdmission.source !==
      "xinmai_reality_encounter_intent_controller" ||
    encounterAdmission.state !== "ACCEPTING_REALITY" ||
    encounterAdmission.routeTarget !== REALITY_PRODUCTION_ROUTE_TARGET ||
    encounterAdmission.intentReferenceId.trim().length === 0 ||
    encounterAdmission.encounterCycleId.trim().length === 0 ||
    !Number.isInteger(encounterAdmission.intentRevision) ||
    encounterAdmission.intentRevision <= 0
  ) {
    return sourceNotReady(
      encounterAdmission.identityReferences.sourceReferenceId,
      encounterAdmission,
      "ENCOUNTER_ADMISSION_INVALID",
    );
  }
  if (Date.parse(encounterAdmission.expiresAt) <= Date.now()) {
    return sourceNotReady(
      encounterAdmission.identityReferences.sourceReferenceId,
      encounterAdmission,
      "ENCOUNTER_ADMISSION_EXPIRED",
    );
  }
  const requestedReference =
    encounterAdmission.identityReferences.sourceReferenceId.trim();
  if (requestedReference.length === 0) {
    return sourceNotReady(
      null,
      encounterAdmission,
      "SOURCE_REFERENCE_REQUIRED",
    );
  }
  if (hasForbiddenSourceReference(requestedReference)) {
    return blocked(input, "FORBIDDEN_SOURCE_REFERENCE");
  }

  if (entryContext === null) {
    return sourceNotReady(
      requestedReference,
      encounterAdmission,
      "REALITY_ENTRY_CONTEXT_NOT_AVAILABLE",
    );
  }
  if (
    entryContext.source !== "genesis_production_reality_entry_context" ||
    entryContext.sourceProvenance !== "REAL_USER_SESSION"
  ) {
    return sourceNotReady(
      requestedReference,
      encounterAdmission,
      "SOURCE_PROVENANCE_INVALID",
    );
  }
  if (entryContext.eligibility !== "ELIGIBLE") {
    return sourceNotReady(
      requestedReference,
      encounterAdmission,
      "REALITY_ENTRY_NOT_ELIGIBLE",
    );
  }

  const session = entryContext.recognitionRealitySession;
  if (
    session.sourceExperienceMode !== "REAL_USER_EXPERIENCE" ||
    session.sourceProvenance !== "REAL_USER_SESSION" ||
    session.genesisCompletionStage !== "COMPLETION" ||
    session.phase !== "REALITY_ENTRY_ELIGIBLE" ||
    session.recognitionConfirmed !== true ||
    session.realityEntryConfirmed !== true ||
    session.realityEntryEligibility !== "ELIGIBLE"
  ) {
    return sourceNotReady(
      requestedReference,
      encounterAdmission,
      "REALITY_ENTRY_SESSION_INVALID",
    );
  }
  if (
    requestedReference !== entryContext.sourceReferenceId ||
    requestedReference !== session.sourceReferenceId
  ) {
    return sourceNotReady(
      requestedReference,
      encounterAdmission,
      "SOURCE_REFERENCE_MISMATCH",
    );
  }
  if (
    encounterAdmission.identityReferences.sourceReferenceId !==
      entryContext.sourceReferenceId ||
    encounterAdmission.identityReferences.starBeastIdentityReferenceId
      .trim().length === 0 ||
    encounterAdmission.identityReferences.mansionCoordinateReferenceId
      .trim().length === 0
  ) {
    return sourceNotReady(
      requestedReference,
      encounterAdmission,
      "ENCOUNTER_IDENTITY_MISMATCH",
    );
  }

  const sourceContext: RealityProductionSourceContext = Object.freeze({
    schemaVersion: "GUANYAO_REALITY_PRODUCTION_SOURCE_CONTEXT_V1" as const,
    source: "reality_production_source_context" as const,
    sourceExperienceMode: "REAL_USER_EXPERIENCE" as const,
    sourceProvenance: "REAL_USER_SESSION" as const,
    sourceReferenceId: requestedReference,
    intentReferenceId: encounterAdmission.intentReferenceId,
    encounterCycleId: encounterAdmission.encounterCycleId,
    intentRevision: encounterAdmission.intentRevision,
    realityEntryEligibility: "ELIGIBLE" as const,
    genesisCompletionReference: Object.freeze({
      stage: "COMPLETION" as const,
      sourceReferenceId: requestedReference,
    }),
    recognitionConfirmationReference: Object.freeze({
      confirmed: true as const,
      sourceReferenceId: requestedReference,
    }),
    pressureRecognitionState: "NOT_STARTED" as const,
    realityExperienceArchitectureReference: Object.freeze({
      referenceType: "REALITY_EXPERIENCE_ARCHITECTURE_REFERENCE" as const,
      referenceId: requestedReference,
      sourceRole: "REALITY_EXPERIENCE_ARCHITECTURE" as const,
      realityStage: "REALITY_ENTRY" as const,
      genesisBoundary: "GENESIS_COMPLETION_HELD" as const,
      pressureRecognitionNotStarted: true as const,
      noPressureResult: true as const,
      noGravityResult: true as const,
      noChoiceResult: true as const,
      noCrystalResult: true as const,
      noUserProfile: true as const,
    }),
    boundary: REALITY_PRODUCTION_ROUTE_AUTHORIZATION_BOUNDARY,
  });

  return Object.freeze({
    status: "READY" as const,
    source: "reality_production_route_authorization" as const,
    routeTarget: REALITY_PRODUCTION_ROUTE_TARGET,
    sourceReferenceId: requestedReference,
    intentReferenceId: encounterAdmission.intentReferenceId,
    encounterCycleId: encounterAdmission.encounterCycleId,
    intentRevision: encounterAdmission.intentRevision,
    authorizationState: "AUTHORIZED_PRODUCTION_REALITY_SOURCE" as const,
    guardReason: null,
    sourceContext,
    boundary: REALITY_PRODUCTION_ROUTE_AUTHORIZATION_BOUNDARY,
  });
}
