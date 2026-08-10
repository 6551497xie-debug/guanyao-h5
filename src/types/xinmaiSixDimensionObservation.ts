import type { RealityEncounterIdentityReferences } from "./xinmaiRealityEncounterIntent";

export const XINMAI_SIX_DIMENSION_PROTOCOL_REVISION =
  "XINMAI_SIX_DIMENSION_PROTOCOL_2026_08_10_V2" as const;
export const XINMAI_SIX_DIMENSION_OBSERVATION_SCHEMA_VERSION =
  "XINMAI_SIX_DIMENSION_OBSERVATION_SET_V2" as const;
export const XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_SCHEMA_VERSION =
  "XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_V1" as const;

export const XINMAI_SIX_DIMENSION_OBSERVATION_SET_STORE =
  "six-dimension-observation-set" as const;
export const XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_STORE =
  "six-dimension-completion-receipt" as const;
export const XINMAI_SIX_DIMENSION_COMMAND_FENCE_STORE =
  "six-dimension-command-fence" as const;

export const XINMAI_SIX_DIMENSION_IDS = Object.freeze([
  "body",
  "emotion",
  "thought",
  "action",
  "memory",
  "goal",
] as const);

export type SixDimensionId =
  (typeof XINMAI_SIX_DIMENSION_IDS)[number];

export type SixDimensionItemState =
  | "PENDING"
  | "OBSERVED"
  | "SKIPPED"
  | "DECLINED"
  | "UNAVAILABLE";

export type SixDimensionTypedAcknowledgement =
  | "IMPACT_RECOGNIZED_PRESENT"
  | "IMPACT_RECOGNIZED_ABSENT"
  | "IMPACT_RECOGNIZED_UNCERTAIN";

export type SixDimensionObservationLifecycle =
  | "OPEN"
  | "COMPLETED"
  | "CONSUMED_BY_CHOICE"
  | "TERMINAL";

export type CanonicalSixDimensionObservationItem = Readonly<{
  dimensionId: SixDimensionId;
  ordinal: 1 | 2 | 3 | 4 | 5 | 6;
  state: SixDimensionItemState;
  sourceReferenceId: string;
  outcomeReferenceId: string | null;
  acknowledgement: SixDimensionTypedAcknowledgement | null;
  itemRevision: number;
  committedByCommandReferenceId: string | null;
  presentedAt: null;
  observedAt: string | null;
  updatedAt: string;
  terminalReason: "USER_DECLINED" | "SOURCE_UNAVAILABLE" | null;
}>;

export type CanonicalSixDimensionObservationSet = Readonly<{
  schemaVersion:
    typeof XINMAI_SIX_DIMENSION_OBSERVATION_SCHEMA_VERSION;
  observationSetId: string;
  canonicalLineageKey: string;
  identityKey: string;
  identityReferences: RealityEncounterIdentityReferences;
  encounterCycleId: string;
  gravityCycleId: string;
  gravityObservationReferenceId: string;
  pressure: Readonly<{
    runtimeSeedId: string;
    candidateReferenceId: string;
    catalogRevision: string;
  }>;
  dimensionProtocolRevision:
    typeof XINMAI_SIX_DIMENSION_PROTOCOL_REVISION;
  dimensionOrder: typeof XINMAI_SIX_DIMENSION_IDS;
  items: readonly CanonicalSixDimensionObservationItem[];
  lifecycle: SixDimensionObservationLifecycle;
  revision: number;
  lastCommittedCommandReferenceId: string | null;
  contentDigest: string;
  evidenceDigest: string | null;
  completionReceiptReferenceId: string | null;
  createdAt: string;
  updatedAt: string;
  committedAt: string | null;
  provenance: Readonly<{
    authority: "XINMAI_SIX_DIMENSION_OBSERVATION_AUTHORITY";
    explicitUserAcknowledgementRequired: true;
    noRawWhisperPersistence: true;
    noPrivateFreeTextPersistence: true;
    noChoiceAuthority: true;
    noCrystalAuthority: true;
    noRendererAuthority: true;
  }>;
}>;

export type SixDimensionCompletionReceipt = Readonly<{
  schemaVersion:
    typeof XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_SCHEMA_VERSION;
  completionReceiptReferenceId: string;
  observationSetId: string;
  observationSetRevision: number;
  identityKey: string;
  identityReferences: RealityEncounterIdentityReferences;
  encounterCycleId: string;
  gravityCycleId: string;
  gravityObservationReferenceId: string;
  pressure: Readonly<{
    runtimeSeedId: string;
    candidateReferenceId: string;
    catalogRevision: string;
  }>;
  dimensionProtocolRevision:
    typeof XINMAI_SIX_DIMENSION_PROTOCOL_REVISION;
  itemOutcomeReferences: readonly [
    string,
    string,
    string,
    string,
    string,
    string,
  ];
  contentDigest: string;
  evidenceDigest: string;
  completedAt: string;
  provenance: Readonly<{
    authority: "XINMAI_SIX_DIMENSION_OBSERVATION_AUTHORITY";
    allSixDistinctObserved: true;
    noChoiceAuthority: true;
    noActionAuthority: true;
    noFactAuthority: true;
    noCrystalAuthority: true;
  }>;
}>;

export type SixDimensionCommandFenceRecord = Readonly<{
  commandReferenceId: string;
  observationSetId: string;
  commandType:
    | "CREATE_OBSERVATION_SET"
    | "ACKNOWLEDGE_DIMENSION"
    | "SKIP_DIMENSION"
    | "DECLINE_DIMENSION";
  inputDigest: string;
  outcomeReferenceId: string | null;
  resultingObservationSetRevision: number;
  status: "COMMITTED";
  committedAt: string;
}>;

export type SixDimensionObservationCommand =
  | Readonly<{
      type: "CREATE_OBSERVATION_SET";
      commandReferenceId: string;
      expectedGravityObservationRevision: number;
      identityReferences: RealityEncounterIdentityReferences;
      encounterCycleId: string;
      gravityCycleId: string;
      gravityObservationReferenceId: string;
      runtimeSeedId: string;
      candidateReferenceId: string;
      catalogRevision: string;
      dimensionProtocolRevision:
        typeof XINMAI_SIX_DIMENSION_PROTOCOL_REVISION;
    }>
  | Readonly<{
      type: "ACKNOWLEDGE_DIMENSION";
      commandReferenceId: string;
      observationSetId: string;
      dimensionId: SixDimensionId;
      acknowledgement: SixDimensionTypedAcknowledgement;
      expectedSetRevision: number;
      expectedItemRevision: number;
      sourceReferenceId: string;
    }>
  | Readonly<{
      type: "SKIP_DIMENSION" | "DECLINE_DIMENSION";
      commandReferenceId: string;
      observationSetId: string;
      dimensionId: SixDimensionId;
      expectedSetRevision: number;
      expectedItemRevision: number;
    }>;

export type SixDimensionObservationCauseCode =
  | "MUTATION_POLICY_SAFE_WITHHELD"
  | "INVALID_COMMAND"
  | "IDENTITY_MISMATCH"
  | "ENCOUNTER_MISMATCH"
  | "GRAVITY_NOT_RECOGNIZED"
  | "GRAVITY_TERMINAL"
  | "PRESSURE_PROVENANCE_MISMATCH"
  | "CATALOG_REVISION_MISMATCH"
  | "DIMENSION_PROTOCOL_REVISION_UNKNOWN"
  | "OBSERVATION_SET_NOT_FOUND"
  | "OBSERVATION_SET_ALREADY_EXISTS"
  | "OBSERVATION_SET_TERMINAL"
  | "DIMENSION_NOT_IN_PROTOCOL"
  | "ITEM_ALREADY_DECLINED"
  | "SOURCE_REFERENCE_MISMATCH"
  | "STALE_REVISION"
  | "IDEMPOTENCY_CONFLICT"
  | "COMPLETION_NOT_QUALIFIED"
  | "COMPLETION_RECEIPT_MISSING"
  | "COMPLETION_RECEIPT_MISMATCH"
  | "EVIDENCE_DIGEST_MISMATCH"
  | "CHOICE_VERSION_MISMATCH"
  | "TRANSACTION_STORAGE_UNAVAILABLE"
  | "TRANSACTION_OPEN_BLOCKED"
  | "TRANSACTION_ABORTED"
  | "TRANSACTION_CONNECTION_CLOSED"
  | "WRITE_UNCONFIRMED"
  | "RECOVERY_CORRUPTED"
  | "CANONICAL_UNIQUENESS_VIOLATION";

export type SixDimensionRetryability =
  | "RETRY_AFTER_REREAD"
  | "RETRY_AFTER_ENVIRONMENT_RECOVERY"
  | "NOT_RETRYABLE";

export type SixDimensionFailureCause = Readonly<{
  owner: "SIX_DIMENSION_AUTHORITY" | "GRAVITY" | "CHOICE" | "STORAGE";
  code: SixDimensionObservationCauseCode | string;
  retryability: SixDimensionRetryability;
  innerCause: SixDimensionFailureCause | null;
}>;

export type SixDimensionObservationResult<TValue> =
  | Readonly<{
      status: "COMMITTED" | "ALREADY_COMMITTED";
      value: TValue;
      observationSet: CanonicalSixDimensionObservationSet;
      completionReceipt: SixDimensionCompletionReceipt | null;
      cause: null;
    }>
  | Readonly<{
      status: "REJECTED" | "SAFE_WITHHELD";
      value: null;
      observationSet: CanonicalSixDimensionObservationSet | null;
      completionReceipt: SixDimensionCompletionReceipt | null;
      cause: SixDimensionFailureCause;
    }>;

export type SixDimensionAuthoritySnapshot = Readonly<{
  observationSets: readonly CanonicalSixDimensionObservationSet[];
  completionReceipts: readonly SixDimensionCompletionReceipt[];
  commandFences: readonly SixDimensionCommandFenceRecord[];
}>;

export type SixDimensionAuthorityReadResult =
  | Readonly<{
      status: "FOUND";
      snapshot: SixDimensionAuthoritySnapshot;
      cause: null;
    }>
  | Readonly<{
      status: "UNAVAILABLE" | "SAFE_WITHHELD" | "CORRUPTED";
      snapshot: null;
      cause: SixDimensionFailureCause;
    }>;

export type SixDimensionObservationReadExpectation = Readonly<{
  observationSetId: string;
  identityKey?: string;
  encounterCycleId?: string;
  gravityCycleId?: string;
  gravityObservationReferenceId?: string;
  runtimeSeedId?: string;
  candidateReferenceId?: string;
  catalogRevision?: string;
  dimensionProtocolRevision?: string;
  contentDigest?: string;
  evidenceDigest?: string | null;
}>;

export type SixDimensionObservationRecoveryResult =
  | Readonly<{
      status: "FOUND";
      observationSet: CanonicalSixDimensionObservationSet;
      completionReceipt: SixDimensionCompletionReceipt | null;
      cause: null;
    }>
  | Readonly<{
      status: "NOT_FOUND" | "SAFE_WITHHELD";
      observationSet: null;
      completionReceipt: null;
      cause: SixDimensionFailureCause;
    }>;
