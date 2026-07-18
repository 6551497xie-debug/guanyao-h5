import type { RealityProductionRouteActivationAuthorization } from "./realityProductionRouteAuthorization";

export type RealityProductionRouteEntryBoundary = Readonly<{
  productionRouteEntryOnly: true;
  exactRealityRouteOnly: true;
  inMemoryRealityEntryContextOnly: true;
  realityRouteActivationSourceContextRequired: true;
  pressureCandidateActivationContextRequired: true;
  pressureCandidateRequestContextRequired: true;
  pressureDeliveryOrchestrationRequired: true;
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
  productionPressureConsumerOnly: true;
  sharedFrozenPressurePresentationOnly: true;
  explicitPressureObservationOnly: true;
  productionGravityConsumerOnly: true;
  sharedFrozenGravityPresentationOnly: true;
  explicitGravityObservationOnly: true;
  productionChoiceConsumerOnly: true;
  sharedFrozenChoicePresentationOnly: true;
  explicitChoiceActiveResponseOnly: true;
  crystalReadinessHoldOnly: true;
  noFixtureSource: true;
  noPrototypeSource: true;
  noDefaultSource: true;
  noEngineInvocation: true;
  noPressureEngine: true;
  noPressureSeedMatching: true;
  noPressureResult: true;
  noInertiaEngine: true;
  noBehaviorEngine: true;
  noRecommendedAction: true;
  noBestChoice: true;
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
