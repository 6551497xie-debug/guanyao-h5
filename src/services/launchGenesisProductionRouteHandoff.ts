import type {
  LaunchGenesisProductionRouteHandoffBoundary,
  LaunchGenesisProductionRouteHandoffGuardReason,
  LaunchGenesisProductionRouteHandoffInput,
  LaunchGenesisProductionRouteHandoffResult,
} from "../types/launchGenesisProductionRouteHandoff";
import { GENESIS_PRODUCTION_ROUTE_TARGET } from "./genesisProductionRouteAuthorization";
import { readRealUserGenesisVisualSourceContext } from "./realUserGenesisVisualSourceContext";

export const LAUNCH_GENESIS_PRODUCTION_ROUTE_HANDOFF_BOUNDARY:
  LaunchGenesisProductionRouteHandoffBoundary = Object.freeze({
    productionGenesisRouteHandoffOnly: true,
    completedLaunchLifeSourceSessionRequired: true,
    existingGenesisVisualSourceContextRequired: true,
    realEngineResultOnly: true,
    realUserSessionProvenanceOnly: true,
    sourceReferenceContinuityRequired: true,
    sourceReferenceExcludedFromUrl: true,
    immutableResultOnly: true,
    noFixtureSource: true,
    noPrototypeSource: true,
    noDefaultSource: true,
    noReferenceOnlySource: true,
    noSourceFallback: true,
    noEngineInvocation: true,
    noSourceRecalculation: true,
    noRendererInvocation: true,
    noGenesisRuntimeActivation: true,
    noRouterInvocation: true,
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

const unavailable = (
  status: "SOURCE_NOT_READY" | "BLOCKED",
  sourceReferenceId: string | null,
  guardReason: LaunchGenesisProductionRouteHandoffGuardReason,
): LaunchGenesisProductionRouteHandoffResult => Object.freeze({
  status,
  source: "launch_genesis_production_route_handoff" as const,
  routeTarget: null,
  navigationMode: "BLOCKED" as const,
  sourceReferenceId,
  guardReason,
  boundary: LAUNCH_GENESIS_PRODUCTION_ROUTE_HANDOFF_BOUNDARY,
});

export function resolveLaunchGenesisProductionRouteHandoff(
  input: LaunchGenesisProductionRouteHandoffInput,
): LaunchGenesisProductionRouteHandoffResult {
  const session = input?.lifeSourceSession;
  if (
    !session ||
    !Object.isFrozen(session) ||
    session.source !== "launch_life_source_session" ||
    session.sourceKind !== "REAL_ENGINE_RESULT"
  ) {
    return unavailable(
      "SOURCE_NOT_READY",
      session?.sourceReferenceId ?? null,
      "LAUNCH_LIFE_SOURCE_SESSION_REQUIRED",
    );
  }
  const sourceReferenceId = session.sourceReferenceId.trim();
  if (hasForbiddenSourceReference(sourceReferenceId)) {
    return unavailable(
      "BLOCKED",
      sourceReferenceId || null,
      "FORBIDDEN_SOURCE_REFERENCE",
    );
  }
  const context = readRealUserGenesisVisualSourceContext();
  if (context === null) {
    return unavailable(
      "SOURCE_NOT_READY",
      sourceReferenceId || null,
      "GENESIS_VISUAL_SOURCE_CONTEXT_REQUIRED",
    );
  }
  if (
    !Object.isFrozen(context) ||
    context.schemaVersion !==
      "GUANYAO_REAL_USER_GENESIS_VISUAL_SOURCE_CONTEXT_V1" ||
    context.source !== "real_user_genesis_visual_source_context" ||
    context.sourceMode !== "REAL_USER_EXPERIENCE" ||
    context.lifeSourceSession !== session ||
    context.lifeSourceSession.sourceKind !== "REAL_ENGINE_RESULT" ||
    context.visualSourceAdapterInput.sourceKind !== "REAL_ENGINE_RESULT" ||
    context.visualSource.provenance.sourceKind !== "REAL_ENGINE_RESULT" ||
    context.boundary.realUserSourceOnly !== true ||
    context.boundary.noFixtureFallback !== true
  ) {
    return unavailable(
      "SOURCE_NOT_READY",
      sourceReferenceId || null,
      "GENESIS_VISUAL_SOURCE_CONTEXT_INVALID",
    );
  }
  if (
    sourceReferenceId.length === 0 ||
    session.provenance.sourceReferenceId !== sourceReferenceId ||
    context.sourceReferenceId !== sourceReferenceId ||
    context.visualSourceAdapterInput.sourceReferenceId !== sourceReferenceId ||
    context.visualSource.provenance.sourceReferenceId !== sourceReferenceId
  ) {
    return unavailable(
      "SOURCE_NOT_READY",
      sourceReferenceId || null,
      "SOURCE_REFERENCE_MISMATCH",
    );
  }

  return Object.freeze({
    status: "READY" as const,
    source: "launch_genesis_production_route_handoff" as const,
    routeTarget: GENESIS_PRODUCTION_ROUTE_TARGET,
    navigationMode: "EXPLICIT_LAUNCH_COMPLETION" as const,
    sourceReferenceId,
    guardReason: null,
    boundary: LAUNCH_GENESIS_PRODUCTION_ROUTE_HANDOFF_BOUNDARY,
  });
}
