import type { LivedResponseOutcome } from "./xinmaiLivedResponse";
import type {
  RealityEncounterIdentityReferences,
  RealityEncounterIntent,
  RealityEncounterRequestDisposition,
} from "./xinmaiRealityEncounterIntent";

export type XinmaiPostOwnershipNextRealityCycleCommand = Readonly<{
  identityReferences: RealityEncounterIdentityReferences;
  choiceActionIntentionReferenceId: string;
  formationReferenceId: string;
}>;

export type XinmaiCompletedReturnTargetProof = Readonly<{
  proofReferenceId: string;
  identityReferences: RealityEncounterIdentityReferences;
  choiceActionIntentionReferenceId: string;
  sourceEncounterCycleId: string;
  targetEncounterCycleId: string;
  targetRealityIntentReferenceId: string;
  targetRealityProofCanonicalRevision: number;
  targetRealityProofFencingToken: number;
  departureReceiptReferenceId: string;
  returnReceiptReferenceId: string;
  livedResponseReferenceId: string;
  livedResponseOutcome: Extract<
    LivedResponseOutcome,
    "ATTEMPTED" | "COMPLETED_AS_INTENDED" | "CHANGED_RESPONSE"
  >;
  crystalEligibilityReferenceId: string;
  formationReferenceId: string;
  crystalReferenceId: string;
  bodyImprintReferenceId: string;
  observedGrowthEnvelopeRevision: number;
}>;

export type XinmaiCompletedReturnProofFailureReason =
  | "COMMAND_INVALID"
  | "GROWTH_RECOVERY_UNAVAILABLE"
  | "GROWTH_RECOVERY_CORRUPTED"
  | "CHOICE_LINEAGE_NOT_UNIQUE"
  | "CHOICE_NOT_REPORTED"
  | "DEPARTURE_LINEAGE_NOT_UNIQUE"
  | "RETURN_LINEAGE_NOT_UNIQUE"
  | "RETURN_NOT_CONSUMED_BY_FACT"
  | "FACT_LINEAGE_NOT_UNIQUE"
  | "LIVED_RESPONSE_NOT_QUALIFYING"
  | "ELIGIBILITY_LINEAGE_NOT_UNIQUE"
  | "ELIGIBILITY_NOT_CONSUMED"
  | "FORMATION_LINEAGE_NOT_UNIQUE"
  | "FORMATION_NOT_CANONICAL"
  | "CRYSTAL_PROJECTION_NOT_UNIQUE"
  | "BODY_IMPRINT_NOT_CURRENT"
  | "TARGET_ENCOUNTER_NOT_BOUND"
  | "UNRESOLVED_NEWER_CHOICE"
  | "PROOF_MISMATCH";

export type XinmaiCompletedReturnProofReadResult =
  | Readonly<{
      status: "READY";
      proof: XinmaiCompletedReturnTargetProof;
      reason: null;
      retryability: "NOT_NEEDED";
    }>
  | Readonly<{
      status: "SAFE_WITHHELD";
      proof: null;
      reason: XinmaiCompletedReturnProofFailureReason;
      innerCause: string;
      retryability: "RETRYABLE" | "NON_RETRYABLE";
    }>;

export type XinmaiCompletedReturnTargetReconciliationReason =
  | "MUTATION_PAUSED"
  | "TARGET_NOT_FOUND"
  | "PROOF_MISMATCH"
  | "TARGET_STATE_NOT_ELIGIBLE"
  | "TARGET_HAS_UNRESOLVED_CHOICE"
  | "TARGET_CONTINUITY_CORRUPTED"
  | "GRAVITY_ADMISSION_MISSING"
  | "TERMINAL_REASON_CONFLICT"
  | "STALE_REVISION"
  | "TRANSACTION_STORAGE_UNAVAILABLE"
  | "TRANSACTION_OPEN_BLOCKED"
  | "TRANSACTION_ABORTED"
  | "TRANSACTION_CONNECTION_CLOSED"
  | "WRITE_UNCONFIRMED"
  | "RECOVERY_CORRUPTED"
  | "LEGACY_WRITER_DETECTED"
  | "LEGACY_SOURCE_CORRUPTED"
  | "UNIQUE_CONSTRAINT_REJECTED";

export type XinmaiCompletedReturnTargetReconciliationResult =
  | Readonly<{
      status: "RECONCILED" | "ALREADY_RECONCILED";
      targetEncounterCycleId: string;
      targetRealityIntentReferenceId: string;
      terminalReason: "START_NEW_ENCOUNTER";
      canonicalRevision: number;
      fencingToken: number;
      reason: null;
      retryability: "NOT_NEEDED";
    }>
  | Readonly<{
      status: "SAFE_WITHHELD";
      targetEncounterCycleId: string | null;
      targetRealityIntentReferenceId: string | null;
      terminalReason: null;
      canonicalRevision: number | null;
      fencingToken: number | null;
      reason: XinmaiCompletedReturnTargetReconciliationReason;
      retryability: "RETRYABLE" | "NON_RETRYABLE";
    }>;

export type XinmaiPostOwnershipNextRealityCycleCause = Readonly<{
  stage:
    | "COMPLETION_PROOF"
    | "TARGET_RECONCILIATION"
    | "FRESH_INTENT_REQUEST";
  reason: string;
  innerCause: string | null;
}>;

export type XinmaiPostOwnershipNextRealityCycleResult =
  | Readonly<{
      status: "READY";
      operation: "BEGIN_NEXT_REALITY_CYCLE";
      reconciliationDisposition:
        | "RECONCILED"
        | "ALREADY_RECONCILED";
      requestDisposition: RealityEncounterRequestDisposition;
      previousEncounterCycleId: string;
      previousIntentReferenceId: string;
      freshIntent: RealityEncounterIntent;
      cause: null;
      retryability: "NOT_NEEDED";
    }>
  | Readonly<{
      status: "SAFE_WITHHELD";
      operation: "BEGIN_NEXT_REALITY_CYCLE";
      reconciliationDisposition:
        | "NOT_STARTED"
        | "RECONCILED"
        | "ALREADY_RECONCILED";
      requestDisposition: null;
      previousEncounterCycleId: string | null;
      previousIntentReferenceId: string | null;
      freshIntent: null;
      cause: XinmaiPostOwnershipNextRealityCycleCause;
      retryability: "RETRYABLE" | "NON_RETRYABLE";
    }>;
