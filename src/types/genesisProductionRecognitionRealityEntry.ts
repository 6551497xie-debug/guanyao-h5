import type { GenesisProductionRuntimeSession } from "./genesisProductionRuntimeConsumer";

export type GenesisProductionRealityEntryEvent =
  | "RECOGNITION_CONFIRM"
  | "ENTER_REALITY";

export type GenesisProductionRealityEntryPhase =
  | "AWAITING_RECOGNITION_CONFIRMATION"
  | "AWAITING_REALITY_ENTRY_CONFIRMATION"
  | "REALITY_ENTRY_ELIGIBLE";

export type GenesisProductionRealityEntryInteraction =
  | GenesisProductionRealityEntryEvent
  | "NONE";

export type GenesisProductionRecognitionRealityBoundary = Readonly<{
  productionRecognitionRealityBridgeOnly: true;
  genesisCompletionRequired: true;
  recognitionConfirmationRequired: true;
  explicitRealityEntryRequired: true;
  sourceReferenceContinuityRequired: true;
  immutableSessionOnly: true;
  noAutomaticRealityEntry: true;
  noFixtureSource: true;
  noPrototypeSource: true;
  noEngineInvocation: true;
  noRendererInvocation: true;
  noRealityRouteActivation: true;
  noPressureExecution: true;
  noGravityExecution: true;
  noChoiceExecution: true;
  noCrystalExecution: true;
  noStorageWrite: true;
}>;

export type GenesisProductionRealityEntrySession = Readonly<{
  schemaVersion: "GUANYAO_GENESIS_PRODUCTION_REALITY_ENTRY_SESSION_V1";
  source: "genesis_production_recognition_reality_bridge";
  sourceExperienceMode: "REAL_USER_EXPERIENCE";
  sourceProvenance: "REAL_USER_SESSION";
  sourceReferenceId: string;
  genesisCompletionStage: "COMPLETION";
  phase: GenesisProductionRealityEntryPhase;
  interactionAvailability: GenesisProductionRealityEntryInteraction;
  recognitionConfirmed: boolean;
  realityEntryConfirmed: boolean;
  realityEntryEligibility: "NOT_ELIGIBLE" | "ELIGIBLE";
  boundary: GenesisProductionRecognitionRealityBoundary;
}>;

export type GenesisProductionRecognitionRealityResult =
  | Readonly<{
      status: "READY";
      operation: "INITIALIZE" | "ADVANCE";
      session: GenesisProductionRealityEntrySession;
      boundary: GenesisProductionRecognitionRealityBoundary;
    }>
  | Readonly<{
      status: "BLOCKED";
      operation: "INITIALIZE" | "ADVANCE";
      reason:
        | "GENESIS_COMPLETION_REQUIRED"
        | "SOURCE_REFERENCE_INVALID"
        | "SESSION_INVALID"
        | "RECOGNITION_CONFIRM_REQUIRED"
        | "REALITY_ENTRY_CONFIRM_REQUIRED"
        | "REALITY_ENTRY_ALREADY_ELIGIBLE";
      session: GenesisProductionRealityEntrySession | null;
      boundary: GenesisProductionRecognitionRealityBoundary;
    }>;

export type GenesisProductionRealityEntryContext = Readonly<{
  schemaVersion: "GUANYAO_GENESIS_PRODUCTION_REALITY_ENTRY_CONTEXT_V1";
  source: "genesis_production_reality_entry_context";
  sourceReferenceId: string;
  sourceProvenance: "REAL_USER_SESSION";
  eligibility: "ELIGIBLE";
  recognitionRealitySession: GenesisProductionRealityEntrySession;
}>;
