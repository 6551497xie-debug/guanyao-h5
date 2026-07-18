import type { LaunchLifeSourceSession } from "./launchLifeSourceSession";

export type LaunchGenesisProductionRouteHandoffBoundary = Readonly<{
  productionGenesisRouteHandoffOnly: true;
  completedLaunchLifeSourceSessionRequired: true;
  existingGenesisVisualSourceContextRequired: true;
  realEngineResultOnly: true;
  realUserSessionProvenanceOnly: true;
  sourceReferenceContinuityRequired: true;
  sourceReferenceExcludedFromUrl: true;
  immutableResultOnly: true;
  noFixtureSource: true;
  noPrototypeSource: true;
  noDefaultSource: true;
  noReferenceOnlySource: true;
  noSourceFallback: true;
  noEngineInvocation: true;
  noSourceRecalculation: true;
  noRendererInvocation: true;
  noGenesisRuntimeActivation: true;
  noRouterInvocation: true;
  noStorageRead: true;
  noStorageWrite: true;
}>;

export type LaunchGenesisProductionRouteHandoffInput = Readonly<{
  lifeSourceSession: LaunchLifeSourceSession;
}>;

export type LaunchGenesisProductionRouteHandoffGuardReason =
  | "LAUNCH_LIFE_SOURCE_SESSION_REQUIRED"
  | "GENESIS_VISUAL_SOURCE_CONTEXT_REQUIRED"
  | "GENESIS_VISUAL_SOURCE_CONTEXT_INVALID"
  | "SOURCE_REFERENCE_MISMATCH"
  | "FORBIDDEN_SOURCE_REFERENCE";

export type LaunchGenesisProductionRouteHandoffResult =
  | Readonly<{
      status: "READY";
      source: "launch_genesis_production_route_handoff";
      routeTarget: "/genesis";
      navigationMode: "EXPLICIT_LAUNCH_COMPLETION";
      sourceReferenceId: string;
      guardReason: null;
      boundary: LaunchGenesisProductionRouteHandoffBoundary;
    }>
  | Readonly<{
      status: "SOURCE_NOT_READY" | "BLOCKED";
      source: "launch_genesis_production_route_handoff";
      routeTarget: null;
      navigationMode: "BLOCKED";
      sourceReferenceId: string | null;
      guardReason: LaunchGenesisProductionRouteHandoffGuardReason;
      boundary: LaunchGenesisProductionRouteHandoffBoundary;
    }>;
