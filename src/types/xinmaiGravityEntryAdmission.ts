import type { LaunchLifeSourceSession } from "./launchLifeSourceSession";
import type { SelectedPressureSeedContext } from "./primaryPetal";
import type {
  RealityPressureSeedCaptureProvenance,
} from "./realityPressureSeedCaptureContract";
import type {
  RealityProductionPressureSeedSession,
} from "./realityProductionPressureSeedConsumer";
import type {
  RealityEncounterIdentityReferences,
  RealityEncounterOrigin,
  RealityEncounterQualification,
} from "./xinmaiRealityEncounterIntent";
import type {
  GenesisVisualConsumerSourceResult,
} from "./genesisVisualConsumerSource";
import type {
  GenesisProductionVisualCalibrationBundle,
} from "./genesisProductionVisualCalibrationBridge";
import type {
  GenesisFourSymbolDirectionFieldVisualCalibration,
} from "./genesisFourSymbolDirectionFieldVisualCalibration";
import type {
  GenesisLifeArchetypeForceCondensationVisualCalibration,
} from "./genesisLifeArchetypeForceCondensationVisualCalibration";
import type {
  GravitySurfaceAdmissionTransaction,
} from "./xinmaiGravitySurfaceAdmission";

export const XINMAI_GRAVITY_ENTRY_ADMISSION_SCHEMA_VERSION =
  "XINMAI_GRAVITY_ENTRY_ADMISSION_V1" as const;
export const XINMAI_REALITY_TO_GRAVITY_CUTOVER_SCHEMA_VERSION =
  "XINMAI_REALITY_TO_GRAVITY_CUTOVER_V1" as const;
export const XINMAI_GRAVITY_ENTRY_RECOVERY_SCHEMA_VERSION =
  "XINMAI_GRAVITY_ENTRY_RECOVERY_V1" as const;
export const XINMAI_GRAVITY_ROUTE_TICKET_SCHEMA_VERSION =
  "XINMAI_GRAVITY_ROUTE_TICKET_V1" as const;

export type GravityEntryAdmissionState =
  | "TRANSFER_PREPARED"
  | "READY_TO_ENTER_GRAVITY"
  | "ACCEPTING_GRAVITY"
  | "FAILED_RETRYABLE"
  | "ACTIVE_IN_GRAVITY"
  | "TERMINAL";

export type GravitySourceRealityProof = Readonly<{
  intentReferenceId: string;
  encounterCycleId: string;
  intentRevision: number;
  origin: RealityEncounterOrigin;
  qualification: RealityEncounterQualification;
  sourceState: "ACTIVE_IN_REALITY";
  terminalReason: "ENCOUNTER_COMPLETED";
  cutoverMeaning: "SUPERSEDED_BY_GRAVITY_TRANSFER";
  activeConfirmed: true;
}>;

export type GravityCurrentPressureProof = Readonly<{
  pressureSessionSchemaVersion:
    "GUANYAO_REALITY_PRODUCTION_PRESSURE_SEED_SESSION_V2";
  sourceReferenceId: string;
  candidateBundleReferenceId: string;
  selectedPressureSeedId: string;
  captureProvenance: RealityPressureSeedCaptureProvenance;
  gravityReadiness: "READY";
  userRecognitionConfirmed: true;
  selectedPressureSeedContext: Readonly<SelectedPressureSeedContext>;
}>;

export type GravityBodyApproachProof = Readonly<{
  source: "reality_inner_view_approach";
  innerViewEntry: "CURRENT_LIFE_WEATHER_BODY_APPROACHED";
  bodyApproachConfirmed: true;
  confirmedAt: string;
  sourceReferenceId: string;
  encounterCycleId: string;
}>;

export type GravityEntryFailureStage =
  | "TRANSFER_PREPARE"
  | "CUTOVER_RECOVERY"
  | "SOURCE_SUPERSESSION"
  | "ROUTE_LOAD"
  | "ROUTE_ADMISSION"
  | "RUNTIME_INPUT"
  | "LIFE_SURFACE"
  | "OBSERVATION_SURFACE"
  | "MINIMUM_SURFACE"
  | "RECOVERY";

export type GravityEntryFailureReason =
  | "SOURCE_REALITY_NOT_ACTIVE"
  | "IDENTITY_MISMATCH"
  | "PRESSURE_SESSION_NOT_CURRENT"
  | "PRESSURE_NOT_RECOGNIZED"
  | "BODY_APPROACH_NOT_CONFIRMED"
  | "CUTOVER_STORAGE_UNAVAILABLE"
  | "CUTOVER_WRITE_UNCONFIRMED"
  | "SOURCE_SUPERSESSION_STALE"
  | "ROUTE_LOAD_UNAVAILABLE"
  | "ADMISSION_NOT_CURRENT"
  | "ADMISSION_EXPIRED"
  | "RUNTIME_INPUT_UNAVAILABLE"
  | "LIFE_SURFACE_UNAVAILABLE"
  | "OBSERVATION_SURFACE_UNAVAILABLE"
  | "MINIMUM_SURFACE_NOT_PRESENTED"
  | "SURFACE_OUTCOME_MISMATCH"
  | "RECOVERY_CANDIDATE_INVALID"
  | "RECOVERY_AFTER_INCOMPLETE_ACCEPTANCE";

export type GravityEntryFailure = Readonly<{
  stage: GravityEntryFailureStage;
  reason: GravityEntryFailureReason;
  failedAt: string;
  retryAllowed: true;
}>;

export type GravityEntryTerminalReason =
  | "EXPLICIT_LEAVE"
  | "GRAVITY_OBSERVATION_COMPLETED"
  | "START_NEW_REALITY_ENCOUNTER"
  | "ADMISSION_EXPIRED"
  | "IDENTITY_MISMATCH"
  | "RECOVERY_CANDIDATE_INVALID"
  | "USER_DATA_CLEARED";

export type GravityEntryAdmission = Readonly<{
  schemaVersion: typeof XINMAI_GRAVITY_ENTRY_ADMISSION_SCHEMA_VERSION;
  source: "reality_to_gravity_entry_admission_controller";
  admissionReferenceId: string;
  gravityCycleId: string;
  revision: number;
  state: GravityEntryAdmissionState;
  routeTarget: "/dynamics";
  identityReferences: RealityEncounterIdentityReferences;
  sourceReality: GravitySourceRealityProof;
  currentPressure: GravityCurrentPressureProof;
  bodyApproach: GravityBodyApproachProof;
  issuedAt: string;
  updatedAt: string;
  expiresAt: string;
  failure: GravityEntryFailure | null;
  terminalReason: GravityEntryTerminalReason | null;
  provenance: Readonly<{
    userExplicitRequest: true;
    identityAuthority: "EXISTING_RECOGNIZED_LIFE";
    realityAuthority: "XINMAI_REALITY_ENCOUNTER_INTENT";
    pressureAuthority: "REALITY_PRESSURE_SEED_SESSION_V2";
    bodyApproachAuthority: "REALITY_INNER_VIEW_APPROACH";
    noIdentityMutation: true;
    noPressureInference: true;
    noAutomaticSelection: true;
    noChoiceExecution: true;
    noCrystalExecution: true;
    noLegacyDynamicsAuthority: true;
  }>;
}>;

export type GravityEntryVisualContinuity = Readonly<{
  sourceReferenceId: string;
  consumerSourceResult: Extract<
    GenesisVisualConsumerSourceResult,
    { status: "READY" }
  >;
  visualCalibrationBundle: GenesisProductionVisualCalibrationBundle;
  fourSymbolDirectionFieldVisualCalibration:
    GenesisFourSymbolDirectionFieldVisualCalibration;
  lifeArchetypeForceCondensationVisualCalibration:
    GenesisLifeArchetypeForceCondensationVisualCalibration;
}>;

export type GravityEntryTransferRequest = Readonly<{
  schemaVersion: "XINMAI_GRAVITY_ENTRY_TRANSFER_REQUEST_V1";
  source: "reality_production_host";
  requestedAt: string;
  userExplicitRequest: true;
  identityReferences: RealityEncounterIdentityReferences;
  sourceReality: Readonly<{
    intentReferenceId: string;
    encounterCycleId: string;
    intentRevision: number;
    origin: RealityEncounterOrigin;
    qualification: RealityEncounterQualification;
    state: "ACTIVE_IN_REALITY";
  }>;
  pressureSession: RealityProductionPressureSeedSession;
  bodyApproachProof: GravityBodyApproachProof;
  visualContinuity: GravityEntryVisualContinuity;
}>;

export type GravityRouteTicket = Readonly<{
  schemaVersion: typeof XINMAI_GRAVITY_ROUTE_TICKET_SCHEMA_VERSION;
  source: "reality_to_gravity_cutover_transaction";
  admissionReferenceId: string;
  gravityCycleId: string;
  expectedAdmissionRevision: number;
  identityReferences: RealityEncounterIdentityReferences;
  routeTarget: "/dynamics";
  cutoverEnvelopeReferenceId: string;
  issuedAt: string;
  expiresAt: string;
}>;

export type RealityToGravityCutoverEnvelope = Readonly<{
  schemaVersion: typeof XINMAI_REALITY_TO_GRAVITY_CUTOVER_SCHEMA_VERSION;
  source: "xinmai_gravity_entry_recovery_adapter";
  envelopeReferenceId: string;
  committedAt: string;
  expiresAt: string;
  sourceReality: Readonly<{
    terminalProof: GravitySourceRealityProof;
    identityReferences: RealityEncounterIdentityReferences;
    supersededByGravityTransfer: true;
  }>;
  targetGravity: Readonly<{
    admission: GravityEntryAdmission;
    identityReferences: RealityEncounterIdentityReferences;
  }>;
  integrity: Readonly<{
    sourceAndTargetIdentityMatch: true;
    sourceAndTargetCycleBound: true;
    pressureBelongsToSourceReference: true;
    bodyApproachBelongsToEncounter: true;
    singleRouteTarget: "/dynamics";
  }>;
}>;

export type GravityEntryRecoverySnapshot = Readonly<{
  schemaVersion: typeof XINMAI_GRAVITY_ENTRY_RECOVERY_SCHEMA_VERSION;
  source: "xinmai_gravity_entry_recovery_adapter";
  envelope: RealityToGravityCutoverEnvelope;
  currentGravityAdmission: GravityEntryAdmission;
  writtenAt: string;
}>;

export type GravityEntryRecoveryWriteResult = Readonly<{
  status: "CONFIRMED" | "UNAVAILABLE" | "UNCONFIRMED";
  snapshot: GravityEntryRecoverySnapshot;
}>;

export type GravityEntryRecoveryReadResult =
  | Readonly<{
      status: "FOUND";
      snapshot: GravityEntryRecoverySnapshot;
    }>
  | Readonly<{
      status: "NOT_FOUND" | "UNAVAILABLE" | "CORRUPTED";
      snapshot: null;
    }>;

export type GravityEntryRecoveryClearResult = Readonly<{
  status: "CONFIRMED" | "UNAVAILABLE" | "UNCONFIRMED";
  admissionReferenceId: string;
}>;

export type GravityEntryTransferPrepareResult =
  | Readonly<{
      status: "PREPARED";
      admission: GravityEntryAdmission;
      reason: null;
    }>
  | Readonly<{
      status: "BLOCKED";
      admission: GravityEntryAdmission | null;
      reason: GravityEntryFailureReason;
    }>;

export type GravityEntryCutoverCommitResult =
  | Readonly<{
      status: "READY";
      admission: GravityEntryAdmission;
      reason: null;
    }>
  | Readonly<{
      status: "REJECTED";
      admission: GravityEntryAdmission | null;
      reason: GravityEntryFailureReason;
    }>;

export type GravityRouteAdmission = Readonly<{
  schemaVersion: "XINMAI_GRAVITY_ROUTE_ADMISSION_V1";
  source: "reality_to_gravity_entry_admission_controller";
  admissionReferenceId: string;
  gravityCycleId: string;
  admissionRevision: number;
  identityReferences: RealityEncounterIdentityReferences;
  selectedPressureSeedId: string;
  routeTarget: "/dynamics";
  expiresAt: string;
}>;

export type GravityRouteAdmissionResult =
  | Readonly<{
      status: "READY";
      operation: "ADMIT" | "RETRY" | "RECOVER";
      admission: GravityRouteAdmission;
      intent: GravityEntryAdmission;
      reason: null;
    }>
  | Readonly<{
      status: "BLOCKED" | "RETRY_REQUIRED";
      operation: "ADMIT" | "RETRY" | "RECOVER";
      admission: null;
      intent: GravityEntryAdmission | null;
      reason: GravityEntryFailureReason;
    }>;

export type GravityHostAcceptanceOutcome =
  | Readonly<{
      status: "GRAVITY_MINIMUM_PRESENTED";
      admissionReferenceId: string;
      gravityCycleId: string;
      admissionRevision: number;
      identityReferences: RealityEncounterIdentityReferences;
      selectedPressureSeedId: string;
      transaction: GravitySurfaceAdmissionTransaction;
      committedAt: string;
    }>
  | Readonly<{
      status: "GRAVITY_HOST_UNAVAILABLE";
      admissionReferenceId: string;
      gravityCycleId: string;
      admissionRevision: number;
      identityReferences: RealityEncounterIdentityReferences;
      selectedPressureSeedId: string;
      reason:
        | "RUNTIME_INPUT_NOT_READY"
        | "LIFE_SURFACE_OUTCOME_REJECTED"
        | "OBSERVATION_SURFACE_OUTCOME_REJECTED"
        | "SURFACE_OUTCOME_WATCHDOG_EXPIRED";
      reportedAt: string;
    }>;

export type GravityProductionRuntimeInput = Readonly<{
  schemaVersion: "XINMAI_GRAVITY_PRODUCTION_RUNTIME_INPUT_V1";
  source: "gravity_production_runtime_input_adapter";
  admissionReferenceId: string;
  gravityCycleId: string;
  admissionRevision: number;
  identityReferences: RealityEncounterIdentityReferences;
  currentPressure: Readonly<SelectedPressureSeedContext>;
  pressureProvenance: GravityCurrentPressureProof;
  lifeSourceSession: LaunchLifeSourceSession;
  visualContinuity: GravityEntryVisualContinuity;
  dynamicsInputContext: Readonly<{
    selectedPressureSeedContext: Readonly<SelectedPressureSeedContext>;
    motherCodeProfile:
      LaunchLifeSourceSession["motherCodeLandingResult"]["motherCodeProfile"];
    originMotherContext: LaunchLifeSourceSession["originMotherResult"];
    personaOutputSnapshot: Readonly<{
      motherCode: string;
      motherCodeName: string;
      trigram: string;
      starbeast: Readonly<{ fourSymbol: string }>;
    }>;
  }>;
  bodyApproachProof: GravityBodyApproachProof;
  boundary: Readonly<{
    admissionOnly: true;
    recognizedIdentityOnly: true;
    launchLifeSourceOnly: true;
    currentPressureOnly: true;
    noRouteStateAuthority: true;
    noHistoricalStorageAuthority: true;
    noFixtureSource: true;
  }>;
}>;

export type RealityToGravityCutoverTransactionResult =
  | Readonly<{
      status: "COMMITTED";
      routeTicket: GravityRouteTicket;
      envelope: RealityToGravityCutoverEnvelope;
      cleanup:
        | "SOURCE_RECOVERY_CLEARED"
        | "SOURCE_RECOVERY_SUPERSEDED_PENDING_CLEANUP";
      reason: null;
    }>
  | Readonly<{
      status: "RETRYABLE" | "BLOCKED";
      routeTicket: null;
      gravityAdmission: GravityEntryAdmission | null;
      realityRemainsActive: boolean;
      reason: GravityEntryFailureReason;
    }>;
