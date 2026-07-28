import type { RealityProductionRouteActivationAuthorization } from "./realityProductionRouteAuthorization";
import type { RealityProductionPressureHostInput } from "./realityProductionPressureHostInputContract";
import type { RealityPressureSeedContinuationContext } from "./realityPressureSeedContinuationContext";
import type { GenesisRealityPresenceContinuityContext } from "./genesisRealityPresenceContinuityBridge";
import type { GenesisVisualConsumerSourceResult } from "./genesisVisualConsumerSource";
import type { GenesisProductionVisualCalibrationBundle } from "./genesisProductionVisualCalibrationBridge";
import type { GenesisFourSymbolDirectionFieldVisualCalibration } from "./genesisFourSymbolDirectionFieldVisualCalibration";
import type { GenesisLifeArchetypeForceCondensationVisualCalibration } from "./genesisLifeArchetypeForceCondensationVisualCalibration";
import type { SelectedPressureSeedContext } from "./primaryPetal";
import type {
  RealityEncounterAdmission,
  RealityHostAcceptanceOutcome,
} from "./xinmaiRealityEncounterIntent";

export type RealityProductionRouteEntryBoundary = Readonly<{
  productionRouteEntryOnly: true;
  exactRealityRouteOnly: true;
  typedIdentityRecoveryAdapterConsumptionOnly: true;
  typedIntentRecoveryViaControllerOnly: true;
  noDirectStorageRead: true;
  recoveryCandidateIsNotAuthority: true;
  identityOnlyAuthorizationForbidden: true;
  realityEncounterIntentAuthorityRequired: true;
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
  routeStateIsPresentationOnly: true;
  selectedPressureSeedHandoffWriteOnly: true;
  explicitDynamicsNavigationOnly: true;
  noGenesisNavigationMutation: true;
  noPresenceMutation: true;
  typedSurfaceAdmissionTransactionRequired: true;
  postCommitAdmissionTransactionRequired: true;
  renderPhaseAdmissionMutationForbidden: true;
  ordinaryCleanupDoesNotTerminateIntent: true;
  singleAdmissionSuccessPath: true;
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
  explicitGravityContinuationCallbackOnly: true;
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
  hostAcceptanceOutcomeRequired: true;
  typedLifeSurfaceOutcomeRequired: true;
  typedPressureSurfaceOutcomeRequired: true;
  domSurfaceInspectionForbidden: true;
  fixedTimerSuccessForbidden: true;
}>;

export type RealityProductionHostProps = Readonly<{
  routeAuthorization: Extract<
    RealityProductionRouteActivationAuthorization,
    { status: "READY" }
  >;
  encounterAdmission: RealityEncounterAdmission;
  pressureSeedHostInput: RealityProductionPressureHostInput;
  pressureSeedContinuationContext: Extract<
    RealityPressureSeedContinuationContext,
    { phase: "READY_FOR_CONSUMER_INITIALIZATION" }
  >;
  genesisPresenceContinuityContext: GenesisRealityPresenceContinuityContext;
  visualContinuity: Readonly<{
    sourceReferenceId: string;
    consumerSourceResult: Extract<
      GenesisVisualConsumerSourceResult,
      { status: "READY" }
    >;
    visualCalibrationBundle: GenesisProductionVisualCalibrationBundle;
    fourSymbolDirectionFieldVisualCalibration: GenesisFourSymbolDirectionFieldVisualCalibration;
    lifeArchetypeForceCondensationVisualCalibration: GenesisLifeArchetypeForceCondensationVisualCalibration;
  }>;
  historicalRealityMemoryKey?: string | null;
  latestCrystalMemoryKey?: string | null;
  latestCrystalSourceSlot?: number | null;
  returningLifeWorldEntry?: boolean;
  choiceContinuation?: "AWAITING_LIVED_RESPONSE_RECOGNITION" | null;
  choiceLifeTraceMemoryKey?: string | null;
  choiceLifeTraceSourceSlot?: number | null;
  onRealityAcceptanceOutcome: (
    outcome: RealityHostAcceptanceOutcome,
  ) => void;
  onContinueToGravity: (
    selectedPressureSeedContext: Readonly<SelectedPressureSeedContext>,
  ) => void;
}>;
