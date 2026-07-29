import type { RealityProductionRouteActivationAuthorization } from "./realityProductionRouteAuthorization";
import type { RealityProductionPressureHostInput } from "./realityProductionPressureHostInputContract";
import type { RealityPressureSeedContinuationContext } from "./realityPressureSeedContinuationContext";
import type { GenesisRealityPresenceContinuityContext } from "./genesisRealityPresenceContinuityBridge";
import type { GenesisVisualConsumerSourceResult } from "./genesisVisualConsumerSource";
import type { GenesisProductionVisualCalibrationBundle } from "./genesisProductionVisualCalibrationBridge";
import type { GenesisFourSymbolDirectionFieldVisualCalibration } from "./genesisFourSymbolDirectionFieldVisualCalibration";
import type { GenesisLifeArchetypeForceCondensationVisualCalibration } from "./genesisLifeArchetypeForceCondensationVisualCalibration";
import type {
  RealityEncounterAdmission,
  RealityEncounterIdentityReferences,
  RealityEncounterIntent,
  RealityHostAcceptanceOutcome,
} from "./xinmaiRealityEncounterIntent";
import type {
  GravityEntryTransferRequest,
  RealityToGravityCutoverTransactionResult,
} from "./xinmaiGravityEntryAdmission";

export type RealityExplicitLeaveRequest = Readonly<{
  intentReferenceId: string;
  encounterCycleId: string;
  expectedIntentRevision: number;
  identityReferences: RealityEncounterIdentityReferences;
  routeTarget: "/reality";
  terminalReason: "EXPLICIT_LEAVE";
}>;

export type RealityExplicitLeaveTransactionResult =
  | Readonly<{
      status: "TERMINATED_AND_LEFT";
      request: RealityExplicitLeaveRequest;
      reason: "EXPLICIT_LEAVE";
    }>
  | Readonly<{
      status: "NO_ACTIVE_ENCOUNTER";
      request: RealityExplicitLeaveRequest;
      reason: "NO_CURRENT_INTENT" | "INTENT_ALREADY_TERMINAL";
    }>
  | Readonly<{
      status: "STALE_REQUEST_REJECTED";
      request: RealityExplicitLeaveRequest;
      reason:
        | "INTENT_REFERENCE_MISMATCH"
        | "ENCOUNTER_CYCLE_MISMATCH"
        | "INTENT_REVISION_MISMATCH"
        | "IDENTITY_MISMATCH"
        | "TERMINAL_REASON_CONFLICT"
        | "ACTIVATION_ADMISSION_MISMATCH";
    }>
  | Readonly<{
      status: "TERMINATION_RETRYABLE";
      request: RealityExplicitLeaveRequest;
      reason:
        | "RECOVERY_CLEAR_UNAVAILABLE"
        | "RECOVERY_CLEAR_UNCONFIRMED";
    }>;

export type RealityExplicitLeaveUiState =
  | Readonly<{
      status: "IDLE";
      transactionKey: null;
      reason: null;
    }>
  | Readonly<{
      status: "PENDING";
      transactionKey: string;
      reason: null;
    }>
  | Readonly<{
      status: "RETRYABLE";
      transactionKey: string;
      reason: Exclude<
        RealityExplicitLeaveTransactionResult,
        { status: "TERMINATED_AND_LEFT" | "NO_ACTIVE_ENCOUNTER" }
      >["reason"];
    }>;

export type RealityProductionRouteEntryProps = Readonly<{
  explicitLeaveState: RealityExplicitLeaveUiState;
  onExplicitLeaveRequest: (
    request: RealityExplicitLeaveRequest,
  ) => void;
  onReturnToLifeWorld: () => void;
}>;

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
  typedGravityTransferRequestOnly: true;
  gravityCutoverTransactionRequired: true;
  noGenesisNavigationMutation: true;
  noPresenceMutation: true;
  typedSurfaceAdmissionTransactionRequired: true;
  postCommitAdmissionTransactionRequired: true;
  renderPhaseAdmissionMutationForbidden: true;
  ordinaryCleanupDoesNotTerminateIntent: true;
  singleAdmissionSuccessPath: true;
  preActiveHostSurfaceRequired: true;
  singleHostPhaseTransitionRequired: true;
  controllerActiveAuthorityOnly: true;
  admissionActiveRevisionSeparationRequired: true;
  explicitLeaveTransactionRequired: true;
  routeOwnsExplicitLeaveTransaction: true;
  noDirectIntentTerminationFromHost: true;
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
  typedGravityTransferRequestOnly: true;
  explicitLeaveCallbackOnly: true;
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
  preActiveSurfacePresentationRequired: true;
  activeInteractionAuthorityRequired: true;
  singleHostPhaseTransitionRequired: true;
  preActivePressureInteractionForbidden: true;
  admissionActiveRevisionSeparationRequired: true;
}>;

export type RealityHostInteractionAuthority =
  | Readonly<{
      phase: "PRE_ACTIVE_PRESENTATION";
      admissionRevision: number;
      activeRevision: null;
      activeIntent: null;
    }>
  | Readonly<{
      phase: "ACTIVE_INTERACTION";
      admissionRevision: number;
      activeRevision: number;
      activeIntent: RealityEncounterIntent;
    }>;

export type RealityProductionHostProps = Readonly<{
  routeAuthorization: Extract<
    RealityProductionRouteActivationAuthorization,
    { status: "READY" }
  >;
  encounterAdmission: RealityEncounterAdmission;
  realityInteractionAuthority: RealityHostInteractionAuthority;
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
  choiceContinuation?: "CHOICE_ACTION_INTENTION_CONTINUATION" | null;
  choiceLifeTraceMemoryKey?: string | null;
  choiceLifeTraceSourceSlot?: number | null;
  onRealityAcceptanceOutcome: (
    outcome: RealityHostAcceptanceOutcome,
  ) => void;
  explicitLeaveState: RealityExplicitLeaveUiState;
  onExplicitLeaveRequest: () => void;
  onRequestGravityTransfer: (
    request: GravityEntryTransferRequest,
  ) => RealityToGravityCutoverTransactionResult;
}>;
