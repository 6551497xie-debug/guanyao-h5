import type {
  RealitySurfaceAdmissionTransaction,
} from "./xinmaiRealitySurfaceAdmission";
import type {
  RealityPressureRecognitionReceipt,
} from "./xinmaiRealityAdventureContinuity";

export const XINMAI_REALITY_ENCOUNTER_INTENT_SCHEMA_VERSION =
  "XINMAI_REALITY_ENCOUNTER_INTENT_V1" as const;

export const XINMAI_REALITY_ENCOUNTER_RECOVERY_SCHEMA_VERSION =
  "XINMAI_REALITY_ENCOUNTER_RECOVERY_V1" as const;

export type RealityEncounterIntentState =
  | "READY_TO_ENTER_REALITY"
  | "ACCEPTING_REALITY"
  | "FAILED_RETRYABLE"
  | "ACTIVE_IN_REALITY"
  | "RECOVERING"
  | "TERMINAL";

export type RealityEncounterOrigin =
  | "FIRST_ENCOUNTER"
  | "RETURNING_LIFE_WORLD"
  | "CHOICE_RETURN"
  | "CHOICE_CONTINUATION";

export type RealityEncounterQualification =
  | "WHISPER_RESPONSE_SETTLED"
  | "WHISPER_SKIPPED"
  | "RESPONSE_UNAVAILABLE_EXPLICITLY_CONTINUED"
  | "EXPLICIT_RETURN_TO_CHOICE"
  | "CHOICE_ACTION_INTENTION_COMMITTED";

export type RealityEncounterIdentityReferences = Readonly<{
  sourceReferenceId: string;
  starBeastIdentityReferenceId: string;
  mansionCoordinateReferenceId: string;
}>;

export type RealityEncounterFailureStage =
  | "RECOVERY"
  | "ROUTE_LOAD"
  | "ROUTE_AUTHORIZATION"
  | "ACTIVATION_SOURCE"
  | "CANDIDATE_ACTIVATION"
  | "CANDIDATE_REQUEST"
  | "DELIVERY"
  | "HOST_INPUT"
  | "MINIMUM_SURFACE";

export type RealityEncounterFailureReason =
  | "ROUTE_LOAD_UNAVAILABLE"
  | "INTENT_NOT_CURRENT"
  | "IDENTITY_MISMATCH"
  | "INTENT_EXPIRED"
  | "ROUTE_AUTHORIZATION_REJECTED"
  | "ACTIVATION_SOURCE_UNAVAILABLE"
  | "CANDIDATE_ACTIVATION_UNAVAILABLE"
  | "CANDIDATE_REQUEST_UNAVAILABLE"
  | "DELIVERY_UNAVAILABLE"
  | "HOST_INPUT_UNAVAILABLE"
  | "MINIMUM_SURFACE_NOT_PRESENTED"
  | "HOST_OUTCOME_MISMATCH"
  | "RECOVERY_CANDIDATE_INVALID"
  | "RECOVERY_STORAGE_UNAVAILABLE"
  | "RECOVERY_AFTER_INCOMPLETE_ACCEPTANCE";

export type RealityEncounterFailure = Readonly<{
  stage: RealityEncounterFailureStage;
  reason: RealityEncounterFailureReason;
  failedAt: string;
  retryAllowed: true;
}>;

export type RealityEncounterTerminalReason =
  | "EXPLICIT_LEAVE"
  | "ENCOUNTER_COMPLETED"
  | "START_NEW_ENCOUNTER"
  | "INTENT_EXPIRED"
  | "IDENTITY_MISMATCH"
  | "RECOVERY_CANDIDATE_INVALID"
  | "RETURN_WITHOUT_LIVED_RESPONSE"
  | "USER_DECLINED_RECORD"
  | "USER_DATA_CLEARED";

export type RealityEncounterIntent = Readonly<{
  schemaVersion: typeof XINMAI_REALITY_ENCOUNTER_INTENT_SCHEMA_VERSION;
  source: "xinmai_reality_encounter_intent_controller";
  intentReferenceId: string;
  encounterCycleId: string;
  sourceReferenceId: string;
  starBeastIdentityReferenceId: string;
  mansionCoordinateReferenceId: string;
  origin: RealityEncounterOrigin;
  qualification: RealityEncounterQualification;
  choiceActionIntentionReferenceId: string | null;
  departureReceiptReferenceId: string | null;
  departureReconciliationReferenceId?: string | null;
  returnIntentRequestReferenceId: string | null;
  returnAttemptRevision: number | null;
  sourceEncounterCycleId: string | null;
  state: RealityEncounterIntentState;
  routeTarget: "/reality";
  issuedAt: string;
  updatedAt: string;
  expiresAt: string;
  revision: number;
  failure: RealityEncounterFailure | null;
  terminalReason: RealityEncounterTerminalReason | null;
  provenance: Readonly<{
    userExplicitRequest: true;
    identityAuthority: "EXISTING_RECOGNIZED_LIFE";
    relationshipAuthority: "EXISTING_RELATIONSHIP_RUNTIME";
    noGrowthAuthority: true;
  }>;
}>;

export type RealityEncounterAdmission = Readonly<{
  schemaVersion: "XINMAI_REALITY_ENCOUNTER_ADMISSION_V1";
  source: "xinmai_reality_encounter_intent_controller";
  intentReferenceId: string;
  encounterCycleId: string;
  intentRevision: number;
  state: "ACCEPTING_REALITY";
  routeTarget: "/reality";
  origin: RealityEncounterOrigin;
  qualification: RealityEncounterQualification;
  choiceActionIntentionReferenceId: string | null;
  departureReceiptReferenceId: string | null;
  departureReconciliationReferenceId: string | null;
  returnIntentRequestReferenceId: string | null;
  returnAttemptRevision: number | null;
  sourceEncounterCycleId: string | null;
  identityReferences: RealityEncounterIdentityReferences;
  expiresAt: string;
}>;

export type RealityEncounterRequestInput = Readonly<{
  origin: RealityEncounterOrigin;
  qualification: RealityEncounterQualification;
  choiceActionIntentionReferenceId?: string | null;
  departureReceiptReferenceId?: string | null;
  departureReconciliationReferenceId?: string | null;
  returnIntentRequestReferenceId?: string | null;
  returnAttemptRevision?: number | null;
  sourceEncounterCycleId?: string | null;
  identityReferences: RealityEncounterIdentityReferences;
  requestedAt?: string;
}>;

export type RealityEncounterRequestDisposition =
  | "CREATED"
  | "ALREADY_CURRENT"
  | "RECOVERED_EXACT_CHOICE_RETURN";

export type RealityEncounterRequestResult =
  | Readonly<{
      status: "READY";
      operation: "REQUEST";
      intent: RealityEncounterIntent;
      persistence: "CONFIRMED" | "CURRENT_RUNTIME_ONLY";
      requestDisposition: RealityEncounterRequestDisposition;
      reason: null;
    }>
  | Readonly<{
      status: "BLOCKED";
      operation: "REQUEST";
      intent: RealityEncounterIntent | null;
      persistence: null;
      reason:
        | "IDENTITY_REFERENCES_INVALID"
        | "QUALIFICATION_NOT_ALLOWED_FOR_ORIGIN"
        | "RETURN_INTENT_REQUEST_INVALID"
        | "RETURN_SOURCE_ENCOUNTER_MISMATCH"
        | "RETURN_INTENT_REQUEST_CONFLICT"
        | "DEPARTURE_RECONCILIATION_REQUIRED"
        | "ACTIVE_ADVENTURE_REQUIRES_CONTINUATION"
        | "ENCOUNTER_ALREADY_ACTIVE"
        | "CURRENT_IDENTITY_MISMATCH"
        | "TRANSACTION_STORAGE_UNAVAILABLE"
        | "TRANSACTION_OPEN_BLOCKED"
        | "TRANSACTION_ABORTED"
        | "TRANSACTION_CONNECTION_CLOSED"
        | "WRITE_UNCONFIRMED"
        | "RECOVERY_CORRUPTED"
        | "MUTATION_PAUSED"
        | "LEGACY_WRITER_DETECTED"
        | "LEGACY_SOURCE_CORRUPTED"
        | "RETURN_CONFLICT_WINNER_NOT_VISIBLE"
        | "RETURN_CONFLICT_PROOF_MISMATCH"
        | "UNIQUE_CONSTRAINT_REJECTED";
    }>;

export type RealityEncounterAdmissionResult =
  | Readonly<{
      status: "READY";
      operation: "ADMIT" | "RETRY" | "RECOVER";
      admission: RealityEncounterAdmission;
      intent: RealityEncounterIntent;
      reason: null;
    }>
  | Readonly<{
      status: "RETRY_REQUIRED" | "BLOCKED";
      operation: "ADMIT" | "RETRY" | "RECOVER";
      admission: null;
      intent: RealityEncounterIntent | null;
      reason:
        | "INTENT_REFERENCE_REQUIRED"
        | "INTENT_NOT_CURRENT"
        | "INTENT_STATE_NOT_ADMISSIBLE"
        | "RETRY_NOT_AVAILABLE"
        | "IDENTITY_MISMATCH"
        | "INTENT_EXPIRED"
        | "RECOVERY_CANDIDATE_NOT_FOUND"
        | "RECOVERY_CANDIDATE_INVALID"
        | "RECOVERY_STORAGE_UNAVAILABLE";
    }>;

export type RealityEncounterAdmissionRollbackResult =
  | Readonly<{
      status: "ROLLED_BACK";
      operation: "ROLLBACK_ADMISSION";
      intent: RealityEncounterIntent;
      reason: null;
    }>
  | Readonly<{
      status: "REJECTED";
      operation: "ROLLBACK_ADMISSION";
      intent: RealityEncounterIntent | null;
      reason:
        | "INTENT_NOT_CURRENT"
        | "INTENT_STATE_NOT_ACCEPTING"
        | "RECOVERY_STORAGE_UNAVAILABLE";
    }>;

export type RealityHostAcceptanceOutcome =
  | Readonly<{
      status: "REALITY_MINIMUM_PRESENTED";
      intentReferenceId: string;
      encounterCycleId: string;
      intentRevision: number;
      sourceReferenceId: string;
      presentedSurface:
        | "REALITY_LIFE_UNIVERSE_AND_PRESSURE_CANDIDATES"
        | "REALITY_STATIC_LIFE_UNIVERSE_AND_PRESSURE_CANDIDATES";
      transaction: RealitySurfaceAdmissionTransaction;
      committedAt: string;
    }>
  | Readonly<{
      status: "REALITY_HOST_UNAVAILABLE";
      intentReferenceId: string;
      encounterCycleId: string;
      intentRevision: number;
      sourceReferenceId: string;
      reason:
        | "HOST_INPUT_NOT_READY"
        | "PRESSURE_CONSUMER_NOT_READY"
        | "MINIMUM_SURFACE_NOT_PRESENTED"
        | "LIFE_SURFACE_OUTCOME_REJECTED"
        | "PRESSURE_SURFACE_OUTCOME_REJECTED"
        | "SURFACE_OUTCOME_WATCHDOG_EXPIRED";
      reportedAt: string;
    }>;

export type RealityEncounterCommitResult =
  | Readonly<{
      status: "ACTIVE";
      operation: "COMMIT_ACTIVE";
      intent: RealityEncounterIntent;
      canonicalRevision: number;
      recognitionReceipt:
        RealityPressureRecognitionReceipt | null;
      reason: null;
    }>
  | Readonly<{
      status: "REJECTED";
      operation: "COMMIT_ACTIVE";
      intent: RealityEncounterIntent | null;
      reason:
        | "INTENT_NOT_CURRENT"
        | "INTENT_STATE_NOT_ACCEPTING"
        | "HOST_OUTCOME_MISMATCH"
        | "IDENTITY_MISMATCH"
        | "INTENT_EXPIRED";
    }>;

export type RealityEncounterFailureResult = Readonly<{
  status: "FAILED_RETRYABLE" | "REJECTED";
  operation: "FAIL_ACCEPTANCE";
  intent: RealityEncounterIntent | null;
  reason: RealityEncounterFailureReason | "INTENT_STATE_NOT_FAILABLE";
}>;

export type RealityEncounterTerminationCommand = Readonly<{
  intentReferenceId: string;
  encounterCycleId: string;
  expectedIntentRevision: number;
  identityReferences: RealityEncounterIdentityReferences;
  terminalReason: RealityEncounterTerminalReason;
}>;

export type RealityEncounterTerminationResult =
  | Readonly<{
      status: "TERMINATED";
      operation: "TERMINATE";
      intent: RealityEncounterIntent;
      reason: RealityEncounterTerminalReason;
    }>
  | Readonly<{
      status: "NOT_ACTIVE";
      operation: "TERMINATE";
      intent: RealityEncounterIntent | null;
      reason: "NO_CURRENT_INTENT" | "INTENT_ALREADY_TERMINAL";
    }>
  | Readonly<{
      status: "REJECTED_STALE";
      operation: "TERMINATE";
      intent: RealityEncounterIntent | null;
      reason:
        | "INTENT_REFERENCE_MISMATCH"
        | "ENCOUNTER_CYCLE_MISMATCH"
        | "INTENT_REVISION_MISMATCH"
        | "IDENTITY_MISMATCH"
        | "TERMINAL_REASON_CONFLICT";
    }>
  | Readonly<{
      status: "TERMINATION_RETRYABLE";
      operation: "TERMINATE";
      intent: RealityEncounterIntent;
      reason:
        | "RECOVERY_CLEAR_UNAVAILABLE"
        | "RECOVERY_CLEAR_UNCONFIRMED";
    }>;

export type RealityEncounterRecoverySnapshot = Readonly<{
  schemaVersion: typeof XINMAI_REALITY_ENCOUNTER_RECOVERY_SCHEMA_VERSION;
  source: "xinmai_reality_encounter_intent_recovery_adapter";
  intent: RealityEncounterIntent;
  writtenAt: string;
}>;

export type RealityEncounterRecoveryWriteResult = Readonly<{
  status: "CONFIRMED" | "UNAVAILABLE" | "UNCONFIRMED";
  snapshot: RealityEncounterRecoverySnapshot;
}>;

export type RealityEncounterRecoveryReadResult =
  | Readonly<{
      status: "FOUND";
      snapshot: RealityEncounterRecoverySnapshot;
    }>
  | Readonly<{
      status: "NOT_FOUND" | "UNAVAILABLE" | "CORRUPTED";
      snapshot: null;
    }>;

export type RealityEncounterRecoveryClearResult = Readonly<{
  status: "CONFIRMED" | "UNAVAILABLE" | "UNCONFIRMED";
  intentReferenceId: string;
}>;
