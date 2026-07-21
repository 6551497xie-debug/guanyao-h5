import type { RealityProductionRouteActivationAuthorization } from "./realityProductionRouteAuthorization";
import type { RealityProductionPressureHostInput } from "./realityProductionPressureHostInputContract";
import type { RealityPressureSeedContinuationContext } from "./realityPressureSeedContinuationContext";
import type { GenesisRealityPresenceContinuityContext } from "./genesisRealityPresenceContinuityBridge";

export type RealityProductionRouteEntryBoundary = Readonly<{
  productionRouteEntryOnly: true;
  exactRealityRouteOnly: true;
  inMemoryRealityEntryContextOnly: true;
  realityRouteActivationSourceContextRequired: true;
  pressureCandidateActivationContextRequired: true;
  pressureCandidateRequestContextRequired: true;
  pressureDeliveryOrchestrationRequired: true;
  pressureSeedContinuationContextRequired: true;
  genesisPresenceContinuityContextRequired: true;
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
  noPresenceMutation: true;
}>;

export type RealityProductionHostBoundary = Readonly<{
  productionRealityHostOnly: true;
  authorizedRealitySourceOnly: true;
  productionPressureSeedConsumerOnly: true;
  productionPressureHostInputRequired: true;
  pressureSeedContinuationContextRequired: true;
  pressureSeedConsumerActivated: true;
  v1PressureConsumerForbidden: true;
  v2PressureSeedPresentationOnly: true;
  explicitPressureSeedRecognitionOnly: true;
  explicitNextBundleRequestOnly: true;
  gravityReadinessHoldOnly: true;
  noFixtureSource: true;
  noPrototypeSource: true;
  noDefaultSource: true;
  noEngineInvocation: true;
  noPressureEngine: true;
  noPressureSeedMatching: true;
  noAutomaticSelection: true;
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
  pressureSeedHostInput: RealityProductionPressureHostInput;
  pressureSeedContinuationContext: Extract<
    RealityPressureSeedContinuationContext,
    { phase: "READY_FOR_CONSUMER_INITIALIZATION" }
  >;
  genesisPresenceContinuityContext: GenesisRealityPresenceContinuityContext;
}>;
