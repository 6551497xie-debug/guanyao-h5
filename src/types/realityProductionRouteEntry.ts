import type { RealityProductionRouteActivationAuthorization } from "./realityProductionRouteAuthorization";

export type RealityProductionRouteEntryBoundary = Readonly<{
  productionRouteEntryOnly: true;
  exactRealityRouteOnly: true;
  inMemoryRealityEntryContextOnly: true;
  routeAuthorizationRequired: true;
  sourceNotReadyRecoveryRequired: true;
  sourceReferenceExcludedFromUrl: true;
  noFixtureSource: true;
  noPrototypeSource: true;
  noDefaultSource: true;
  noEngineInvocation: true;
  noPressureExecution: true;
  noGravityExecution: true;
  noChoiceExecution: true;
  noCrystalExecution: true;
  noRendererInvocation: true;
  noSourceRecalculation: true;
  noStorageRead: true;
  noStorageWrite: true;
  noGenesisNavigationMutation: true;
}>;

export type RealityProductionHostBoundary = Readonly<{
  productionRealityHostOnly: true;
  authorizedRealitySourceOnly: true;
  entryReadyPresentationOnly: true;
  pressureRecognitionNotStarted: true;
  noFixtureSource: true;
  noPrototypeSource: true;
  noDefaultSource: true;
  noEngineInvocation: true;
  noPressureExecution: true;
  noGravityExecution: true;
  noChoiceExecution: true;
  noCrystalExecution: true;
  noRendererInvocation: true;
  noLegacyDynamicsRuntime: true;
  noSourceMutation: true;
  noStorageRead: true;
  noStorageWrite: true;
  noNavigationMutation: true;
}>;

export type RealityProductionHostProps = Readonly<{
  routeAuthorization: Extract<
    RealityProductionRouteActivationAuthorization,
    { status: "READY" }
  >;
}>;
