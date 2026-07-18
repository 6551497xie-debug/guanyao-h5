import type { GenesisProductionRealityEntryContext } from "./genesisProductionRecognitionRealityEntry";

export type GenesisProductionRealityRouteHandoffBoundary = Readonly<{
  productionRealityRouteHandoffOnly: true;
  explicitUserConfirmedHandoffOnly: true;
  eligibleRealityEntryContextRequired: true;
  realUserSessionProvenanceOnly: true;
  sourceReferenceContinuityRequired: true;
  sourceReferenceExcludedFromUrl: true;
  noAutomaticNavigation: true;
  noFixtureSource: true;
  noPrototypeSource: true;
  noDefaultSource: true;
  noEngineInvocation: true;
  noPressureExecution: true;
  noGravityExecution: true;
  noChoiceExecution: true;
  noCrystalExecution: true;
  noRendererInvocation: true;
  noRouterInvocation: true;
  noStorageRead: true;
  noStorageWrite: true;
}>;

export type GenesisProductionRealityRouteHandoffInput = Readonly<{
  entryContext: GenesisProductionRealityEntryContext | null;
  sourceReferenceId: string;
}>;

export type GenesisProductionRealityRouteHandoffResult =
  | Readonly<{
      status: "READY";
      source: "genesis_production_reality_route_handoff";
      routeTarget: "/reality";
      navigationMode: "EXPLICIT_USER_CONFIRMED";
      sourceReferenceId: string;
      guardReason: null;
      boundary: GenesisProductionRealityRouteHandoffBoundary;
    }>
  | Readonly<{
      status: "SOURCE_NOT_READY";
      source: "genesis_production_reality_route_handoff";
      routeTarget: null;
      navigationMode: "BLOCKED";
      sourceReferenceId: string | null;
      guardReason:
        | "REALITY_ENTRY_CONTEXT_REQUIRED"
        | "REALITY_ENTRY_CONTEXT_INVALID"
        | "SOURCE_REFERENCE_MISMATCH";
      boundary: GenesisProductionRealityRouteHandoffBoundary;
    }>
  | Readonly<{
      status: "BLOCKED";
      source: "genesis_production_reality_route_handoff";
      routeTarget: null;
      navigationMode: "BLOCKED";
      sourceReferenceId: string | null;
      guardReason: "FORBIDDEN_SOURCE_REFERENCE";
      boundary: GenesisProductionRealityRouteHandoffBoundary;
    }>;
