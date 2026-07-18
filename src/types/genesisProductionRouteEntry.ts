export type GenesisProductionRouteEntryBoundary = Readonly<{
  productionRouteEntryOnly: true;
  exactGenesisRouteOnly: true;
  inMemoryRealUserContextOnly: true;
  routeAuthorizationRequired: true;
  sourceNotReadyRecoveryRequired: true;
  sourceReferenceExcludedFromUrl: true;
  noFixtureSource: true;
  noPrototypeSource: true;
  noDefaultSource: true;
  noEngineInvocation: true;
  noRendererInvocation: true;
  noSourceRecalculation: true;
  noStorageRead: true;
  noStorageWrite: true;
  noLaunchNavigationMutation: true;
}>;
