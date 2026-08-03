import type {
  RealityPressureSeedCaptureProvenance,
} from "./realityPressureSeedCaptureContract";
import type {
  RealityEncounterIdentityReferences,
  RealityEncounterIntent,
} from "./xinmaiRealityEncounterIntent";
import type {
  GravityBodyApproachProof,
  GravityEntryAdmission,
} from "./xinmaiGravityEntryAdmission";
import type {
  RealityPressureSeedCandidateSourceContext,
} from "./realityPressureSeedCandidateSource";
import type {
  RealityProductionPressureSeedConsumerResult,
  RealityProductionPressureSeedSession,
} from "./realityProductionPressureSeedConsumer";
import type {
  RealityAdventureDepartureReconciliation,
} from "./xinmaiRealityGravityDepartureReconciliation";

export const XINMAI_REALITY_ADVENTURE_CONTINUITY_DATABASE_NAME =
  "xinmai-reality-adventure-continuity" as const;
export const XINMAI_REALITY_ADVENTURE_CONTINUITY_DATABASE_VERSION =
  1 as const;
export const XINMAI_REALITY_ADVENTURE_CONTINUITY_STORE =
  "reality-adventure-encounter-continuity" as const;
export const XINMAI_REALITY_ADVENTURE_CONTINUITY_MIGRATION_META_STORE =
  "reality-adventure-continuity-migration-meta" as const;
export const XINMAI_REALITY_ADVENTURE_CONTINUITY_MIGRATION_META_ID =
  "SESSION_STORAGE_CUTOVER_V1" as const;

export type RealityPressureCandidateRevisionProof = Readonly<{
  catalogRevision: string;
  candidateSourceSchemaVersion:
    "GUANYAO_REALITY_PRESSURE_CANDIDATE_SOURCE_CONTEXT_V1";
  candidateBundleSchemaVersion:
    "GUANYAO_REALITY_PRESSURE_CANDIDATE_BUNDLE_V1";
  sourceReferenceId: string;
  candidateBundleReferenceId: string;
  candidateBundleRevisionReferenceId: string;
  candidateReferenceId: string;
  candidateRevisionReferenceId: string;
}>;

export type RealityPressureRecognitionFact = Readonly<{
  schemaVersion:
    "XINMAI_REALITY_PRESSURE_RECOGNITION_FACT_V1";
  source:
    "xinmai_reality_pressure_recognition_controller";
  identityReferences: RealityEncounterIdentityReferences;
  realityIntentReferenceId: string;
  encounterCycleId: string;
  realityActiveRevision: number;
  candidateRevision: RealityPressureCandidateRevisionProof;
  pressureProvenance: RealityPressureSeedCaptureProvenance;
  userRecognitionAction: "EXPLICIT_CANDIDATE_RECOGNITION";
  recognizedAt: string;
}>;

export type RealityPressureRecognitionReceiptLifecycle =
  | "RECOGNIZED"
  | "CONSUMED_BY_GRAVITY_TRANSFER"
  | "TERMINAL";

export type RealityPressureRecognitionReceipt = Readonly<{
  schemaVersion:
    "XINMAI_REALITY_PRESSURE_RECOGNITION_RECEIPT_V1";
  source:
    "xinmai_reality_pressure_recognition_controller";
  recognitionReceiptReferenceId: string;
  revision: number;
  lifecycle: RealityPressureRecognitionReceiptLifecycle;
  fact: RealityPressureRecognitionFact;
  issuedAt: string;
  updatedAt: string;
  expiresAt: string;
  consumedGravityTransferReferenceId: string | null;
  consumedGravityAdmissionReferenceId: string | null;
  terminalReason:
    | null
    | "EXPLICIT_LEAVE"
    | "START_NEW_ENCOUNTER"
    | "INTENT_EXPIRED"
    | "IDENTITY_MISMATCH"
    | "CANDIDATE_REVISION_STALE"
    | "RECOVERY_CORRUPTED"
    | "USER_DATA_CLEARED";
  provenance: Readonly<{
    explicitUserRecognitionRequired: true;
    recoveryWriteConfirmed: true;
    noAutomaticSelection: true;
    noDomAuthority: true;
    noRendererAuthority: true;
    noGrowthAuthority: true;
  }>;
}>;

export type RealityToGravityTransferProof = Readonly<{
  schemaVersion:
    "XINMAI_REALITY_TO_GRAVITY_TRANSFER_PROOF_V1";
  source:
    "xinmai_reality_to_gravity_continuity_controller";
  gravityTransferReferenceId: string;
  recognitionReceiptReferenceId: string;
  recognitionReceiptRevision: number;
  encounterCycleId: string;
  identityReferences: RealityEncounterIdentityReferences;
  bodyApproachProof: GravityBodyApproachProof;
  requestedAt: string;
  committedAt: string;
  routeTarget: "/dynamics";
  provenance: Readonly<{
    explicitBodyApproachRequired: true;
    sourceRealitySupersededAtomically: true;
    admissionCreatedAtomically: true;
    noGrowthAuthority: true;
  }>;
}>;

export type RealityAdventureContinuityLifecycle =
  | "REALITY_PENDING"
  | "REALITY_ACTIVE"
  | "PRESSURE_RECOGNIZED"
  | "GRAVITY_ADMITTED"
  | "ACTIVE_IN_GRAVITY"
  | "TERMINAL";

type RealityAdventureEncounterContinuityRecordBase = Readonly<{
  encounterCycleId: string;
  canonicalRevision: number;
  fencingToken: number;
  activeIdentityKey?: string;
  identityReferences: RealityEncounterIdentityReferences;
  realityIntent: RealityEncounterIntent;
  candidateRevision: RealityPressureCandidateRevisionProof | null;
  recognitionReceipt: RealityPressureRecognitionReceipt | null;
  gravityTransfer: RealityToGravityTransferProof | null;
  gravityAdmission: GravityEntryAdmission | null;
  lifecycle: RealityAdventureContinuityLifecycle;
  issuedAt: string;
  updatedAt: string;
  expiresAt: string;
  terminalReason: RealityEncounterIntent["terminalReason"];
  provenance: Readonly<{
    explicitUserIntentRequired: true;
    explicitUserRecognitionRequired: true;
    explicitBodyApproachRequired: true;
    noBackfill: true;
    noDomAuthority: true;
    noRendererAuthority: true;
    noGrowthAuthority: true;
  }>;
}>;

export type RealityAdventureEncounterContinuityRecordV1 =
  RealityAdventureEncounterContinuityRecordBase &
  Readonly<{
    schemaVersion:
      "XINMAI_REALITY_ADVENTURE_ENCOUNTER_CONTINUITY_V1";
  }>;

export type RealityAdventureEncounterContinuityRecordV2 =
  RealityAdventureEncounterContinuityRecordBase &
  Readonly<{
    schemaVersion:
      "XINMAI_REALITY_ADVENTURE_ENCOUNTER_CONTINUITY_V2";
    departureReconciliation:
      RealityAdventureDepartureReconciliation | null;
  }>;

export type RealityAdventureEncounterContinuityRecord =
  | RealityAdventureEncounterContinuityRecordV1
  | RealityAdventureEncounterContinuityRecordV2;

export type RealityAdventureLegacyMigrationStatus =
  | "CUTOVER_READY"
  | "LEGACY_WRITER_DETECTED"
  | "LEGACY_SOURCE_CORRUPTED";

export type RealityAdventureContinuityMigrationMetaRecord = Readonly<{
  id: typeof XINMAI_REALITY_ADVENTURE_CONTINUITY_MIGRATION_META_ID;
  schemaVersion:
    "XINMAI_REALITY_ADVENTURE_CONTINUITY_MIGRATION_META_V1";
  realityLegacyStorageKey:
    "xinmaiRealityEncounterIntentRecovery";
  gravityLegacyStorageKey:
    "xinmaiRealityToGravityCutoverRecovery";
  realityLegacyDigest: string;
  gravityLegacyDigest: string;
  realityLegacyRawLength: number;
  gravityLegacyRawLength: number;
  status: RealityAdventureLegacyMigrationStatus;
  noBackfill: true;
  cutoverAt: string;
  lastCheckedAt: string;
}>;

export type RealityAdventureContinuityFailureReason =
  | "TRANSACTION_STORAGE_UNAVAILABLE"
  | "TRANSACTION_OPEN_BLOCKED"
  | "TRANSACTION_ABORTED"
  | "TRANSACTION_CONNECTION_CLOSED"
  | "WRITE_UNCONFIRMED"
  | "RECOVERY_CORRUPTED"
  | "MUTATION_PAUSED"
  | "LEGACY_WRITER_DETECTED"
  | "LEGACY_SOURCE_CORRUPTED"
  | "UNIQUE_CONSTRAINT_REJECTED";

export type RealityAdventureContinuityUniqueConstraintContext = Readonly<{
  operation:
    | "CANONICAL_RECORD_PUT"
    | "RETAINED_RECORD_PUT"
    | "TRANSACTION_UNKNOWN";
  attemptedEncounterCycleId: string | null;
  attemptedActiveIdentityKey: string | null;
}>;

export type RealityAdventureContinuityReadResult =
  | Readonly<{
      status: "FOUND";
      record: RealityAdventureEncounterContinuityRecord;
      migration: RealityAdventureContinuityMigrationMetaRecord;
      reason: null;
    }>
  | Readonly<{
      status: "NOT_FOUND";
      record: null;
      migration: RealityAdventureContinuityMigrationMetaRecord | null;
      reason: null;
    }>
  | Readonly<{
      status: "SAFE_WITHHELD";
      record: null;
      migration: RealityAdventureContinuityMigrationMetaRecord | null;
      reason: RealityAdventureContinuityFailureReason;
    }>;

export type RealityAdventureContinuityMutationDecision<TValue> =
  | Readonly<{
      status: "COMMIT";
      record: RealityAdventureEncounterContinuityRecord;
      retainedRecords?: readonly RealityAdventureEncounterContinuityRecord[];
      value: TValue;
    }>
  | Readonly<{
      status: "UNCHANGED" | "REJECTED";
      record: RealityAdventureEncounterContinuityRecord | null;
      value: TValue;
    }>;

export type RealityAdventureContinuityMutationResult<TValue> =
  | Readonly<{
      status: "COMMITTED" | "UNCHANGED" | "REJECTED";
      record: RealityAdventureEncounterContinuityRecord | null;
      value: TValue;
      reason: null;
    }>
  | Readonly<{
      status: "SAFE_WITHHELD";
      record: null;
      value: null;
      reason: RealityAdventureContinuityFailureReason;
      uniqueConstraint:
        | RealityAdventureContinuityUniqueConstraintContext
        | null;
    }>;

export type RealityPressureRecognitionCommand = Readonly<{
  encounterCycleId: string;
  expectedCanonicalRevision: number;
  identityReferences: RealityEncounterIdentityReferences;
  candidateReferenceId: string;
  candidateRevisionReferenceId: string;
  candidateBundleReferenceId: string;
  candidateBundleRevisionReferenceId: string;
  catalogRevision: string;
  candidateSourceContext: RealityPressureSeedCandidateSourceContext;
  pressureSession: RealityProductionPressureSeedSession;
  requestedAt: string;
}>;

export type RealityPressureRecognitionOutcome =
  | Readonly<{
      status: "RECOGNIZED" | "ALREADY_RECOGNIZED";
      receipt: RealityPressureRecognitionReceipt;
      consumerResult: Extract<
        RealityProductionPressureSeedConsumerResult,
        { status: "READY" }
      >;
      canonicalRevision: number;
      reason: null;
    }>
  | Readonly<{
      status: "STALE" | "BLOCKED" | "SAFE_WITHHELD";
      receipt: RealityPressureRecognitionReceipt | null;
      consumerResult: null;
      canonicalRevision: number | null;
      reason:
        | RealityAdventureContinuityFailureReason
        | "INTENT_NOT_ACTIVE"
        | "IDENTITY_MISMATCH"
        | "INTENT_EXPIRED"
        | "CANONICAL_REVISION_MISMATCH"
        | "CANDIDATE_REVISION_MISMATCH"
        | "CANDIDATE_NOT_IN_CURRENT_BUNDLE"
        | "PRESSURE_CAPTURE_REJECTED"
        | "RECOGNITION_ALREADY_CONSUMED"
        | "GRAVITY_ALREADY_ADMITTED";
    }>;
