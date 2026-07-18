import type {
  GenesisProductionRealityRouteHandoffBoundary,
  GenesisProductionRealityRouteHandoffInput,
  GenesisProductionRealityRouteHandoffResult,
} from "../types/genesisProductionRealityRouteHandoff";
import { REALITY_PRODUCTION_ROUTE_TARGET } from "./realityProductionRouteAuthorization";

export const GENESIS_PRODUCTION_REALITY_ROUTE_HANDOFF_BOUNDARY:
  GenesisProductionRealityRouteHandoffBoundary = Object.freeze({
    productionRealityRouteHandoffOnly: true,
    explicitUserConfirmedHandoffOnly: true,
    eligibleRealityEntryContextRequired: true,
    realUserSessionProvenanceOnly: true,
    sourceReferenceContinuityRequired: true,
    sourceReferenceExcludedFromUrl: true,
    noAutomaticNavigation: true,
    noFixtureSource: true,
    noPrototypeSource: true,
    noDefaultSource: true,
    noEngineInvocation: true,
    noPressureExecution: true,
    noGravityExecution: true,
    noChoiceExecution: true,
    noCrystalExecution: true,
    noRendererInvocation: true,
    noRouterInvocation: true,
    noStorageRead: true,
    noStorageWrite: true,
  });

const sourceNotReady = (
  sourceReferenceId: string | null,
  guardReason: Extract<
    GenesisProductionRealityRouteHandoffResult,
    { status: "SOURCE_NOT_READY" }
  >["guardReason"],
): GenesisProductionRealityRouteHandoffResult => Object.freeze({
  status: "SOURCE_NOT_READY" as const,
  source: "genesis_production_reality_route_handoff" as const,
  routeTarget: null,
  navigationMode: "BLOCKED" as const,
  sourceReferenceId,
  guardReason,
  boundary: GENESIS_PRODUCTION_REALITY_ROUTE_HANDOFF_BOUNDARY,
});

const hasForbiddenSourceReference = (sourceReferenceId: string): boolean => {
  const normalized = sourceReferenceId.toLowerCase();
  return ["fixture", "prototype", "default", "referenceonly"].some((marker) =>
    normalized.includes(marker),
  );
};

export function resolveGenesisProductionRealityRouteHandoff(
  input: GenesisProductionRealityRouteHandoffInput,
): GenesisProductionRealityRouteHandoffResult {
  const requestedReference = input.sourceReferenceId.trim();
  if (hasForbiddenSourceReference(requestedReference)) {
    return Object.freeze({
      status: "BLOCKED" as const,
      source: "genesis_production_reality_route_handoff" as const,
      routeTarget: null,
      navigationMode: "BLOCKED" as const,
      sourceReferenceId: requestedReference || null,
      guardReason: "FORBIDDEN_SOURCE_REFERENCE" as const,
      boundary: GENESIS_PRODUCTION_REALITY_ROUTE_HANDOFF_BOUNDARY,
    });
  }
  if (input.entryContext === null) {
    return sourceNotReady(
      requestedReference || null,
      "REALITY_ENTRY_CONTEXT_REQUIRED",
    );
  }

  const context = input.entryContext;
  const session = context.recognitionRealitySession;
  if (
    requestedReference.length === 0 ||
    context.source !== "genesis_production_reality_entry_context" ||
    context.sourceProvenance !== "REAL_USER_SESSION" ||
    context.eligibility !== "ELIGIBLE" ||
    session.sourceExperienceMode !== "REAL_USER_EXPERIENCE" ||
    session.sourceProvenance !== "REAL_USER_SESSION" ||
    session.genesisCompletionStage !== "COMPLETION" ||
    session.phase !== "REALITY_ENTRY_ELIGIBLE" ||
    session.recognitionConfirmed !== true ||
    session.realityEntryConfirmed !== true ||
    session.realityEntryEligibility !== "ELIGIBLE"
  ) {
    return sourceNotReady(requestedReference || null, "REALITY_ENTRY_CONTEXT_INVALID");
  }
  if (
    requestedReference !== context.sourceReferenceId ||
    requestedReference !== session.sourceReferenceId
  ) {
    return sourceNotReady(requestedReference, "SOURCE_REFERENCE_MISMATCH");
  }

  return Object.freeze({
    status: "READY" as const,
    source: "genesis_production_reality_route_handoff" as const,
    routeTarget: REALITY_PRODUCTION_ROUTE_TARGET,
    navigationMode: "EXPLICIT_USER_CONFIRMED" as const,
    sourceReferenceId: requestedReference,
    guardReason: null,
    boundary: GENESIS_PRODUCTION_REALITY_ROUTE_HANDOFF_BOUNDARY,
  });
}
