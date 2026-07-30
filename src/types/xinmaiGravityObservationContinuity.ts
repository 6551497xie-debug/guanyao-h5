import type { ChoiceActionIntention } from "./xinmaiChoiceActionIntention";
import type { XinmaiLivedGrowthEnvelope } from "./xinmaiLivedGrowthRecovery";
import type {
  RealityEncounterIdentityReferences,
} from "./xinmaiRealityEncounterIntent";

export const XINMAI_GRAVITY_OBSERVATION_CONTINUITY_SCHEMA_VERSION =
  "XINMAI_GRAVITY_OBSERVATION_CONTINUITY_V1" as const;

export const XINMAI_GRAVITY_OBSERVATION_CONTINUITY_STORE =
  "gravity-observation-continuity" as const;

export type GravityObservationCheckpointState =
  | "OBSERVATION_AVAILABLE"
  | "OBSERVATION_RECOGNIZED";

export type GravityObservationLifecycleState =
  | "CURRENT"
  | "CONSUMED_BY_CHOICE"
  | "TERMINAL";

export type GravityObservationRecognitionProvenance =
  | "USER_CONFIRMED"
  | "USER_SELF_NAMED";

export type GravityObservationContinuityRecord = Readonly<{
  schemaVersion:
    typeof XINMAI_GRAVITY_OBSERVATION_CONTINUITY_SCHEMA_VERSION;
  recordId: string;
  gravityObservationReferenceId: string;
  gravityObservationLineageRevision: number;
  identityReferences: RealityEncounterIdentityReferences;
  sourceReality: Readonly<{
    intentReferenceId: string;
    encounterCycleId: string;
  }>;
  gravityAdmission: Readonly<{
    admissionReferenceId: string;
    gravityCycleId: string;
  }>;
  pressureProvenance: Readonly<{
    candidateBundleReferenceId: string;
    selectedPressureSeedId: string;
    candidateReferenceId: string;
  }>;
  checkpointState: GravityObservationCheckpointState;
  checkpointRevision: number;
  lifecycleState: GravityObservationLifecycleState;
  recognitionProvenance: Readonly<{
    source: GravityObservationRecognitionProvenance;
    confirmedAt: string;
  }> | null;
  consumedByChoiceActionIntentionReferenceId: string | null;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  terminalAt: string | null;
  provenance: Readonly<{
    admissionAuthority: "XINMAI_GRAVITY_ENTRY_ADMISSION";
    surfaceAuthority: "TYPED_GRAVITY_MINIMUM_SURFACE";
    recognitionAuthority: "USER_EXPLICIT_GRAVITY_RECOGNITION";
    noSixDimensionAuthority: true;
    noChoiceAuthority: true;
    noLivedResponseAuthority: true;
    noCrystalAuthority: true;
    noRendererAuthority: true;
  }>;
}>;

export type GravityObservationContinuitySafeWithheldReason =
  | "TRANSACTION_STORAGE_UNAVAILABLE"
  | "TRANSACTION_OPEN_BLOCKED"
  | "TRANSACTION_ABORTED"
  | "TRANSACTION_CONNECTION_CLOSED"
  | "RECOVERY_UNAVAILABLE"
  | "RECOVERY_CORRUPTED"
  | "LEGACY_IMPORT_CONFLICT"
  | "LEGACY_WRITER_DETECTED"
  | "CANONICAL_UNIQUENESS_VIOLATION"
  | "WRITE_UNCONFIRMED";

export type GravityObservationContinuityRejectReason =
  | "INVALID_INPUT"
  | "ADMISSION_NOT_CURRENT"
  | "OBSERVATION_NOT_AVAILABLE"
  | "OBSERVATION_NOT_RECOGNIZED"
  | "OBSERVATION_ALREADY_CONSUMED"
  | "OBSERVATION_TERMINAL"
  | "OBSERVATION_STALE"
  | "ACTION_ROUTE_STALE"
  | "IDENTITY_MISMATCH"
  | "REALITY_PROVENANCE_MISMATCH"
  | "PRESSURE_PROVENANCE_MISMATCH"
  | "GRAVITY_PROVENANCE_MISMATCH"
  | "CHOICE_ALREADY_EXISTS"
  | "HIGHER_GROWTH_ASSET_EXISTS";

export type GravityObservationContinuityTransactionDecision<TValue> =
  | Readonly<{
      status: "COMMIT";
      value: TValue;
      record: GravityObservationContinuityRecord;
      growthEnvelope: XinmaiLivedGrowthEnvelope | null;
    }>
  | Readonly<{
      status: "ALREADY_COMMITTED";
      value: TValue;
    }>
  | Readonly<{
      status: "REJECTED";
      reason: GravityObservationContinuityRejectReason;
    }>;

export type GravityObservationContinuityTransactionOutcome<TValue> =
  | Readonly<{
      status: "COMMITTED" | "ALREADY_COMMITTED";
      value: TValue;
      record: GravityObservationContinuityRecord | null;
      growthEnvelope: XinmaiLivedGrowthEnvelope;
    }>
  | Readonly<{
      status: "REJECTED";
      value: null;
      record: GravityObservationContinuityRecord | null;
      growthEnvelope: XinmaiLivedGrowthEnvelope;
      reason: GravityObservationContinuityRejectReason;
    }>
  | Readonly<{
      status: "SAFE_WITHHELD";
      value: null;
      record: null;
      growthEnvelope: null;
      reason: GravityObservationContinuitySafeWithheldReason;
    }>;

export type GravityObservationContinuityReadResult =
  | Readonly<{
      status: "FOUND";
      record: GravityObservationContinuityRecord | null;
      growthEnvelope: XinmaiLivedGrowthEnvelope;
    }>
  | Readonly<{
      status: "SAFE_WITHHELD" | "UNAVAILABLE" | "CORRUPTED";
      record: null;
      growthEnvelope: null;
      reason: GravityObservationContinuitySafeWithheldReason;
    }>;

export type GravityObservationResumeDecision =
  | Readonly<{
      status: "SURFACE_REQUIRED";
      gravityObservationReferenceId: string;
      checkpointRevision: 0;
      recognition: null;
      choiceActionIntention: null;
    }>
  | Readonly<{
      status: "OBSERVATION_AVAILABLE";
      gravityObservationReferenceId: string;
      checkpointRevision: number;
      recognition: null;
      choiceActionIntention: null;
    }>
  | Readonly<{
      status: "OBSERVATION_RECOGNIZED";
      gravityObservationReferenceId: string;
      checkpointRevision: number;
      recognition: GravityObservationRecognitionProvenance;
      choiceActionIntention: null;
    }>
  | Readonly<{
      status: "CHOICE_COMMITTED";
      gravityObservationReferenceId: string;
      checkpointRevision: number;
      recognition: GravityObservationRecognitionProvenance;
      choiceActionIntention: ChoiceActionIntention;
    }>
  | Readonly<{
      status: "BLOCKED" | "SAFE_WITHHELD";
      gravityObservationReferenceId: string;
      checkpointRevision: number;
      recognition: null;
      choiceActionIntention: null;
      reason:
        | GravityObservationContinuityRejectReason
        | GravityObservationContinuitySafeWithheldReason;
    }>;

export type GravityObservationRecognitionOutcome =
  | Readonly<{
      status: "RECOGNIZED" | "ALREADY_RECOGNIZED";
      decision: Extract<
        GravityObservationResumeDecision,
        { status: "OBSERVATION_RECOGNIZED" }
      >;
    }>
  | Readonly<{
      status: "REJECTED" | "SAFE_WITHHELD";
      decision: Extract<
        GravityObservationResumeDecision,
        { status: "BLOCKED" | "SAFE_WITHHELD" }
      >;
    }>;
