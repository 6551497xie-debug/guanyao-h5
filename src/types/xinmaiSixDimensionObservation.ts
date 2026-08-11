import type { RealityEncounterIdentityReferences } from "./xinmaiRealityEncounterIntent";

export const XINMAI_SIX_DIMENSION_PROTOCOL_REVISION =
  "XINMAI_SIX_DIMENSION_PROTOCOL_2026_08_10_V2" as const;
export const XINMAI_SIX_DIMENSION_OBSERVATION_SCHEMA_VERSION =
  "XINMAI_SIX_DIMENSION_OBSERVATION_SET_V2" as const;
export const XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_SCHEMA_VERSION =
  "XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_V1" as const;
export const XINMAI_SIX_DIMENSION_V3_PROTOCOL_REVISION =
  "XINMAI_SIX_DIMENSION_PROTOCOL_2026_08_11_V3" as const;
export const XINMAI_SIX_DIMENSION_SEMANTIC_GRAMMAR_REVISION =
  "XINMAI_SIX_DIMENSION_SEMANTIC_GRAMMAR_2026_08_11_V1" as const;
export const XINMAI_SIX_DIMENSION_OBSERVATION_V3_SCHEMA_VERSION =
  "XINMAI_SIX_DIMENSION_OBSERVATION_SET_V3" as const;
export const XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_V2_SCHEMA_VERSION =
  "XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_V2" as const;

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

export const XINMAI_SIX_DIMENSION_SEMANTIC_RESPONSE_IDS = Object.freeze({
  body: Object.freeze(["LOCATED", "UNLOCATED"] as const),
  emotion: Object.freeze(["CLEAR", "MIXED", "UNCERTAIN"] as const),
  thought: Object.freeze(["SENTENCE", "FRAGMENT", "PRIVATE"] as const),
  action: Object.freeze(["ADVANCE", "WITHDRAW", "PAUSE"] as const),
  memory: Object.freeze(["THEN", "NOW", "UNCERTAIN"] as const),
  goal: Object.freeze(["NEED", "VALUE", "UNCERTAIN"] as const),
} satisfies Readonly<Record<SixDimensionId, readonly string[]>>);

export type SixDimensionSemanticResponseIdByDimension = Readonly<{
  body: (typeof XINMAI_SIX_DIMENSION_SEMANTIC_RESPONSE_IDS.body)[number];
  emotion: (typeof XINMAI_SIX_DIMENSION_SEMANTIC_RESPONSE_IDS.emotion)[number];
  thought: (typeof XINMAI_SIX_DIMENSION_SEMANTIC_RESPONSE_IDS.thought)[number];
  action: (typeof XINMAI_SIX_DIMENSION_SEMANTIC_RESPONSE_IDS.action)[number];
  memory: (typeof XINMAI_SIX_DIMENSION_SEMANTIC_RESPONSE_IDS.memory)[number];
  goal: (typeof XINMAI_SIX_DIMENSION_SEMANTIC_RESPONSE_IDS.goal)[number];
}>;

export type SixDimensionSemanticResponseId =
  SixDimensionSemanticResponseIdByDimension[SixDimensionId];

export type CanonicalSixDimensionSemanticSelection = Readonly<{
  semanticGrammarRevision:
    typeof XINMAI_SIX_DIMENSION_SEMANTIC_GRAMMAR_REVISION;
  semanticResponseId: SixDimensionSemanticResponseId;
  semanticSelectionReferenceId: string;
  semanticSelectionDigest: string;
}>;

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

export type CanonicalSixDimensionObservationItemV2 =
  CanonicalSixDimensionObservationItem;

export type CanonicalSixDimensionObservationItemV3 = Readonly<{
  dimensionId: SixDimensionId;
  ordinal: 1 | 2 | 3 | 4 | 5 | 6;
  state: SixDimensionItemState;
  sourceReferenceId: string;
  outcomeReferenceId: string | null;
  acknowledgement: SixDimensionTypedAcknowledgement | null;
  semanticSelection: CanonicalSixDimensionSemanticSelection | null;
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

export type CanonicalSixDimensionObservationSetV2 =
  CanonicalSixDimensionObservationSet;

export type CanonicalSixDimensionObservationSetV3 = Readonly<
  Omit<
    CanonicalSixDimensionObservationSetV2,
    "schemaVersion" | "dimensionProtocolRevision" | "items"
  > & {
    schemaVersion:
      typeof XINMAI_SIX_DIMENSION_OBSERVATION_V3_SCHEMA_VERSION;
    dimensionProtocolRevision:
      typeof XINMAI_SIX_DIMENSION_V3_PROTOCOL_REVISION;
    semanticGrammarRevision:
      typeof XINMAI_SIX_DIMENSION_SEMANTIC_GRAMMAR_REVISION;
    items: readonly CanonicalSixDimensionObservationItemV3[];
  }
>;

export type CanonicalSixDimensionObservationSetRecord =
  | CanonicalSixDimensionObservationSetV2
  | CanonicalSixDimensionObservationSetV3;

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

export type SixDimensionCompletionReceiptV1 =
  SixDimensionCompletionReceipt;

export type SixDimensionCompletionReceiptV2 = Readonly<
  Omit<
    SixDimensionCompletionReceiptV1,
    "schemaVersion" | "dimensionProtocolRevision"
  > & {
    schemaVersion:
      typeof XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_V2_SCHEMA_VERSION;
    dimensionProtocolRevision:
      typeof XINMAI_SIX_DIMENSION_V3_PROTOCOL_REVISION;
    semanticGrammarRevision:
      typeof XINMAI_SIX_DIMENSION_SEMANTIC_GRAMMAR_REVISION;
    semanticSelectionReferences: readonly [
      string,
      string,
      string,
      string,
      string,
      string,
    ];
    semanticSelectionDigests: readonly [
      string,
      string,
      string,
      string,
      string,
      string,
    ];
    semanticSelectionAggregateDigest: string;
  }
>;

export type SixDimensionCompletionReceiptRecord =
  | SixDimensionCompletionReceiptV1
  | SixDimensionCompletionReceiptV2;

export type SixDimensionCommandFenceRecord = Readonly<{
  commandReferenceId: string;
  observationSetId: string;
  commandType:
    | "CREATE_OBSERVATION_SET"
    | "ACKNOWLEDGE_DIMENSION"
    | "ACKNOWLEDGE_SEMANTIC_SELECTION_V3"
    | "SKIP_DIMENSION"
    | "DECLINE_DIMENSION"
    | "MARK_DIMENSION_UNAVAILABLE";
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
        | typeof XINMAI_SIX_DIMENSION_PROTOCOL_REVISION
        | typeof XINMAI_SIX_DIMENSION_V3_PROTOCOL_REVISION;
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
      type: "ACKNOWLEDGE_SEMANTIC_SELECTION_V3";
      commandReferenceId: string;
      observationSetId: string;
      dimensionId: SixDimensionId;
      acknowledgement: SixDimensionTypedAcknowledgement;
      semanticGrammarRevision:
        typeof XINMAI_SIX_DIMENSION_SEMANTIC_GRAMMAR_REVISION;
      semanticResponseId: SixDimensionSemanticResponseId;
      expectedSetRevision: number;
      expectedItemRevision: number;
      sourceReferenceId: string;
    }>
  | Readonly<{
      type:
        | "SKIP_DIMENSION"
        | "DECLINE_DIMENSION"
        | "MARK_DIMENSION_UNAVAILABLE";
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
  | "SEMANTIC_SELECTION_NOT_RECORDED"
  | "SEMANTIC_RESPONSE_NOT_ALLOWED"
  | "SEMANTIC_GRAMMAR_REVISION_UNKNOWN"
  | "SEMANTIC_SELECTION_MISSING"
  | "SEMANTIC_SELECTION_DIGEST_MISMATCH"
  | "SEMANTIC_SELECTION_AGGREGATE_DIGEST_MISMATCH"
  | "MIXED_OBSERVATION_PROTOCOL_VERSIONS"
  | "CHOICE_SEMANTIC_BINDING_MISMATCH"
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
      observationSet: CanonicalSixDimensionObservationSetRecord;
      completionReceipt: SixDimensionCompletionReceiptRecord | null;
      cause: null;
    }>
  | Readonly<{
      status: "REJECTED" | "SAFE_WITHHELD";
      value: null;
      observationSet: CanonicalSixDimensionObservationSetRecord | null;
      completionReceipt: SixDimensionCompletionReceiptRecord | null;
      cause: SixDimensionFailureCause;
    }>;

export type SixDimensionAuthoritySnapshot = Readonly<{
  observationSets: readonly CanonicalSixDimensionObservationSetRecord[];
  completionReceipts: readonly SixDimensionCompletionReceiptRecord[];
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

export type SixDimensionObservationMutationTransactionInput = Readonly<{
  gravityRecordId: string;
  expectedGravityObservationReferenceId: string;
  expectedGravityObservationLineageRevision: number;
  expectedObservationSetRevision: number;
  observationSet: CanonicalSixDimensionObservationSetRecord;
  completionReceipt: SixDimensionCompletionReceiptRecord | null;
  commandFence: SixDimensionCommandFenceRecord;
}>;

export type SixDimensionPresentationAuthorityState = Readonly<{
  status: "LOADING" | "OPEN" | "COMPLETED" | "SAFE_WITHHELD";
  observationSet: CanonicalSixDimensionObservationSetRecord | null;
  completionReceipt: SixDimensionCompletionReceiptRecord | null;
  cause: SixDimensionFailureCause | null;
}>;
