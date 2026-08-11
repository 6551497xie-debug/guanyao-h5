import {
  XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_SCHEMA_VERSION,
  XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_V2_SCHEMA_VERSION,
  XINMAI_SIX_DIMENSION_IDS,
  XINMAI_SIX_DIMENSION_OBSERVATION_SCHEMA_VERSION,
  XINMAI_SIX_DIMENSION_OBSERVATION_V3_SCHEMA_VERSION,
  XINMAI_SIX_DIMENSION_PROTOCOL_REVISION,
  XINMAI_SIX_DIMENSION_SEMANTIC_GRAMMAR_REVISION,
  XINMAI_SIX_DIMENSION_V3_PROTOCOL_REVISION,
  type CanonicalSixDimensionObservationItem,
  type CanonicalSixDimensionObservationSet,
  type CanonicalSixDimensionObservationItemV3,
  type CanonicalSixDimensionObservationSetRecord,
  type CanonicalSixDimensionObservationSetV3,
  type SixDimensionCommandFenceRecord,
  type SixDimensionCompletionReceipt,
  type SixDimensionCompletionReceiptRecord,
  type SixDimensionCompletionReceiptV2,
  type SixDimensionFailureCause,
  type SixDimensionObservationCommand,
  type SixDimensionObservationResult,
} from "../types/xinmaiSixDimensionObservation";
import {
  createSixDimensionCanonicalLineageKey,
  createSixDimensionCompletionReceiptReferenceId,
  createSixDimensionContentDigest,
  createSixDimensionEvidenceDigest,
  createSixDimensionIdentityKey,
  createSixDimensionItemSourceReferenceId,
  createSixDimensionObservationSetId,
  createSixDimensionOutcomeReferenceId,
  sha256CanonicalValue,
} from "./xinmaiSixDimensionObservationEvidenceValidator";
import {
  createSixDimensionSemanticSelectionAggregateDigest,
  createSixDimensionSemanticSelectionDigest,
  createSixDimensionSemanticSelectionReferenceId,
  createSixDimensionV3ContentDigest,
  createSixDimensionV3EvidenceDigest,
  isCanonicalSixDimensionObservationSetV3,
  isSixDimensionCompletionReceiptV2,
  isAllowedSixDimensionSemanticResponseId,
} from "./xinmaiSixDimensionSemanticSelectionEvidenceValidator";
import {
  recoverXinmaiSixDimensionObservation,
} from "./xinmaiSixDimensionObservationRecoveryAdapter";
import {
  readXinmaiGravityObservationContinuityState,
  readXinmaiSixDimensionAuthoritySnapshot,
  transactXinmaiSixDimensionObservation,
} from "./xinmaiLivedGrowthTransactionalStore";
import {
  XINMAI_SIX_DIMENSION_PHASE_2_POLICY,
  canMutateXinmaiSixDimensionObservation,
} from "./xinmaiSixDimensionObservationRuntimePolicy";
import {
  canMutateXinmaiSixDimensionSemanticSelection,
} from "./xinmaiSixDimensionSemanticSelectionMutationPolicy";

export const XINMAI_SIX_DIMENSION_AUTHORITY_FOUNDATION = Object.freeze({
  canonicalOwner:
    "XINMAI_SIX_DIMENSION_OBSERVATION_AUTHORITY" as const,
  phase: "CANONICAL_AUTHORITY_ATOMIC_ACTIVATION_PHASE_2" as const,
  mutationPolicy:
    XINMAI_SIX_DIMENSION_PHASE_2_POLICY.mutationPolicy,
  transactionWriterEnabled:
    canMutateXinmaiSixDimensionObservation(),
  noPageAuthority: true as const,
  noLocalStorageAuthority: true as const,
  noSessionStorageAuthority: true as const,
  noChoiceAuthority: true as const,
});

const cause = (
  code: string,
  retryability:
    | "RETRY_AFTER_REREAD"
    | "RETRY_AFTER_ENVIRONMENT_RECOVERY"
    | "NOT_RETRYABLE" = "NOT_RETRYABLE",
): SixDimensionFailureCause =>
  Object.freeze({
    owner: "SIX_DIMENSION_AUTHORITY" as const,
    code,
    retryability,
    innerCause: null,
  });

const rejected = (
  code: string,
  observationSet: CanonicalSixDimensionObservationSetRecord | null = null,
  completionReceipt: SixDimensionCompletionReceiptRecord | null = null,
  retryability:
    | "RETRY_AFTER_REREAD"
    | "RETRY_AFTER_ENVIRONMENT_RECOVERY"
    | "NOT_RETRYABLE" = "NOT_RETRYABLE",
): SixDimensionObservationResult<CanonicalSixDimensionObservationSetRecord> =>
  Object.freeze({
    status: "REJECTED" as const,
    value: null,
    observationSet,
    completionReceipt,
    cause: cause(code, retryability),
  });

const safeWithheld = ():
  SixDimensionObservationResult<CanonicalSixDimensionObservationSetRecord> =>
  Object.freeze({
    status: "SAFE_WITHHELD" as const,
    value: null,
    observationSet: null,
    completionReceipt: null,
    cause: cause("MUTATION_POLICY_SAFE_WITHHELD"),
  });

const makeFence = async (
  command: SixDimensionObservationCommand,
  observationSetId: string,
  resultingObservationSetRevision: number,
  outcomeReferenceId: string | null,
  committedAt: string,
): Promise<SixDimensionCommandFenceRecord> =>
  Object.freeze({
    commandReferenceId: command.commandReferenceId,
    observationSetId,
    commandType: command.type,
    inputDigest: await sha256CanonicalValue(command),
    outcomeReferenceId,
    resultingObservationSetRevision,
    status: "COMMITTED" as const,
    committedAt,
  });

const createObservationSetV2 = async (
  command: Extract<
    SixDimensionObservationCommand,
    { type: "CREATE_OBSERVATION_SET" }
  >,
): Promise<
  SixDimensionObservationResult<CanonicalSixDimensionObservationSetRecord>
> => {
  if (
    command.dimensionProtocolRevision !==
      XINMAI_SIX_DIMENSION_PROTOCOL_REVISION ||
    command.expectedGravityObservationRevision < 1 ||
    Object.values(command.identityReferences).some(
      (value) => value.trim().length === 0,
    ) ||
    [
      command.encounterCycleId,
      command.gravityCycleId,
      command.gravityObservationReferenceId,
      command.runtimeSeedId,
      command.candidateReferenceId,
      command.catalogRevision,
    ].some((value) => value.trim().length === 0)
  ) {
    return rejected("INVALID_COMMAND");
  }
  const identityKey = createSixDimensionIdentityKey(
    command.identityReferences.sourceReferenceId,
    command.identityReferences.starBeastIdentityReferenceId,
    command.identityReferences.mansionCoordinateReferenceId,
  );
  const canonicalLineageKey = createSixDimensionCanonicalLineageKey(
    identityKey,
    command.encounterCycleId,
    command.gravityCycleId,
    command.runtimeSeedId,
    command.catalogRevision,
  );
  const observationSetId =
    createSixDimensionObservationSetId(canonicalLineageKey);
  const recovered = await recoverXinmaiSixDimensionObservation({
    observationSetId,
    identityKey,
    encounterCycleId: command.encounterCycleId,
    gravityCycleId: command.gravityCycleId,
    gravityObservationReferenceId:
      command.gravityObservationReferenceId,
    runtimeSeedId: command.runtimeSeedId,
    candidateReferenceId: command.candidateReferenceId,
    catalogRevision: command.catalogRevision,
    dimensionProtocolRevision:
      command.dimensionProtocolRevision,
  });
  if (recovered.status === "FOUND") {
    return Object.freeze({
      status: "ALREADY_COMMITTED" as const,
      value: recovered.observationSet,
      observationSet: recovered.observationSet,
      completionReceipt: recovered.completionReceipt,
      cause: null,
    });
  }
  if (
    recovered.status === "SAFE_WITHHELD" &&
    recovered.cause.code !== "OBSERVATION_SET_NOT_FOUND"
  ) {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      value: null,
      observationSet: null,
      completionReceipt: null,
      cause: recovered.cause,
    });
  }
  const now = new Date().toISOString();
  const items = Object.freeze(
    XINMAI_SIX_DIMENSION_IDS.map(
      (dimensionId, index): CanonicalSixDimensionObservationItem =>
        Object.freeze({
          dimensionId,
          ordinal: (index + 1) as 1 | 2 | 3 | 4 | 5 | 6,
          state: "PENDING" as const,
          sourceReferenceId:
            createSixDimensionItemSourceReferenceId(
              observationSetId,
              dimensionId,
            ),
          outcomeReferenceId: null,
          acknowledgement: null,
          itemRevision: 0,
          committedByCommandReferenceId: null,
          presentedAt: null,
          observedAt: null,
          updatedAt: now,
          terminalReason: null,
        }),
    ),
  );
  const provisional: CanonicalSixDimensionObservationSet = Object.freeze({
    schemaVersion:
      XINMAI_SIX_DIMENSION_OBSERVATION_SCHEMA_VERSION,
    observationSetId,
    canonicalLineageKey,
    identityKey,
    identityReferences: Object.freeze({
      ...command.identityReferences,
    }),
    encounterCycleId: command.encounterCycleId,
    gravityCycleId: command.gravityCycleId,
    gravityObservationReferenceId:
      command.gravityObservationReferenceId,
    pressure: Object.freeze({
      runtimeSeedId: command.runtimeSeedId,
      candidateReferenceId: command.candidateReferenceId,
      catalogRevision: command.catalogRevision,
    }),
    dimensionProtocolRevision:
      XINMAI_SIX_DIMENSION_PROTOCOL_REVISION,
    dimensionOrder: XINMAI_SIX_DIMENSION_IDS,
    items,
    lifecycle: "OPEN" as const,
    revision: 1,
    lastCommittedCommandReferenceId: command.commandReferenceId,
    contentDigest: "DIGEST_PENDING",
    evidenceDigest: null,
    completionReceiptReferenceId: null,
    createdAt: now,
    updatedAt: now,
    committedAt: null,
    provenance: Object.freeze({
      authority:
        "XINMAI_SIX_DIMENSION_OBSERVATION_AUTHORITY" as const,
      explicitUserAcknowledgementRequired: true as const,
      noRawWhisperPersistence: true as const,
      noPrivateFreeTextPersistence: true as const,
      noChoiceAuthority: true as const,
      noCrystalAuthority: true as const,
      noRendererAuthority: true as const,
    }),
  });
  const observationSet = Object.freeze({
    ...provisional,
    contentDigest: await createSixDimensionContentDigest(provisional),
  });
  return transactXinmaiSixDimensionObservation({
    gravityRecordId:
      `CURRENT:${command.identityReferences.sourceReferenceId}`,
    expectedGravityObservationReferenceId:
      command.gravityObservationReferenceId,
    expectedGravityObservationLineageRevision:
      command.expectedGravityObservationRevision,
    expectedObservationSetRevision: 0,
    observationSet,
    completionReceipt: null,
    commandFence: await makeFence(
      command,
      observationSetId,
      1,
      null,
      now,
    ),
  });
};

const createObservationSetV3 = async (
  command: Extract<
    SixDimensionObservationCommand,
    { type: "CREATE_OBSERVATION_SET" }
  >,
): Promise<
  SixDimensionObservationResult<CanonicalSixDimensionObservationSetRecord>
> => {
  if (
    command.dimensionProtocolRevision !==
      XINMAI_SIX_DIMENSION_V3_PROTOCOL_REVISION ||
    command.expectedGravityObservationRevision < 1 ||
    Object.values(command.identityReferences).some(
      (value) => value.trim().length === 0,
    ) ||
    [
      command.encounterCycleId,
      command.gravityCycleId,
      command.gravityObservationReferenceId,
      command.runtimeSeedId,
      command.candidateReferenceId,
      command.catalogRevision,
    ].some((value) => value.trim().length === 0)
  ) {
    return rejected("INVALID_COMMAND");
  }
  const identityKey = createSixDimensionIdentityKey(
    command.identityReferences.sourceReferenceId,
    command.identityReferences.starBeastIdentityReferenceId,
    command.identityReferences.mansionCoordinateReferenceId,
  );
  const canonicalLineageKey = createSixDimensionCanonicalLineageKey(
    identityKey,
    command.encounterCycleId,
    command.gravityCycleId,
    command.runtimeSeedId,
    command.catalogRevision,
  );
  const observationSetId =
    createSixDimensionObservationSetId(canonicalLineageKey);
  const snapshotRead = await readXinmaiSixDimensionAuthoritySnapshot();
  if (snapshotRead.status !== "FOUND") {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      value: null,
      observationSet: null,
      completionReceipt: null,
      cause: snapshotRead.cause,
    });
  }
  const existing = snapshotRead.snapshot.observationSets.find(
    (candidate) => candidate.observationSetId === observationSetId,
  ) ?? null;
  if (existing !== null) {
    const existingReceipt =
      snapshotRead.snapshot.completionReceipts.find(
        (candidate) => candidate.observationSetId === observationSetId,
      ) ?? null;
    if (
      existing.identityKey !== identityKey ||
      existing.canonicalLineageKey !== canonicalLineageKey ||
      existing.encounterCycleId !== command.encounterCycleId ||
      existing.gravityCycleId !== command.gravityCycleId ||
      existing.gravityObservationReferenceId !==
        command.gravityObservationReferenceId ||
      existing.pressure.runtimeSeedId !== command.runtimeSeedId ||
      existing.pressure.candidateReferenceId !==
        command.candidateReferenceId ||
      existing.pressure.catalogRevision !== command.catalogRevision
    ) {
      return rejected(
        "IDEMPOTENCY_CONFLICT",
        existing,
        existingReceipt,
      );
    }
    return Object.freeze({
      status: "ALREADY_COMMITTED" as const,
      value: existing,
      observationSet: existing,
      completionReceipt: existingReceipt,
      cause: null,
    });
  }
  const now = new Date().toISOString();
  const items = Object.freeze(
    XINMAI_SIX_DIMENSION_IDS.map(
      (dimensionId, index): CanonicalSixDimensionObservationItemV3 =>
        Object.freeze({
          dimensionId,
          ordinal: (index + 1) as 1 | 2 | 3 | 4 | 5 | 6,
          state: "PENDING" as const,
          sourceReferenceId: createSixDimensionItemSourceReferenceId(
            observationSetId,
            dimensionId,
          ),
          outcomeReferenceId: null,
          acknowledgement: null,
          semanticSelection: null,
          itemRevision: 0,
          committedByCommandReferenceId: null,
          presentedAt: null,
          observedAt: null,
          updatedAt: now,
          terminalReason: null,
        }),
    ),
  );
  const provisional: CanonicalSixDimensionObservationSetV3 = Object.freeze({
    schemaVersion: XINMAI_SIX_DIMENSION_OBSERVATION_V3_SCHEMA_VERSION,
    observationSetId,
    canonicalLineageKey,
    identityKey,
    identityReferences: Object.freeze({ ...command.identityReferences }),
    encounterCycleId: command.encounterCycleId,
    gravityCycleId: command.gravityCycleId,
    gravityObservationReferenceId: command.gravityObservationReferenceId,
    pressure: Object.freeze({
      runtimeSeedId: command.runtimeSeedId,
      candidateReferenceId: command.candidateReferenceId,
      catalogRevision: command.catalogRevision,
    }),
    dimensionProtocolRevision: XINMAI_SIX_DIMENSION_V3_PROTOCOL_REVISION,
    semanticGrammarRevision:
      XINMAI_SIX_DIMENSION_SEMANTIC_GRAMMAR_REVISION,
    dimensionOrder: XINMAI_SIX_DIMENSION_IDS,
    items,
    lifecycle: "OPEN" as const,
    revision: 1,
    lastCommittedCommandReferenceId: command.commandReferenceId,
    contentDigest: "DIGEST_PENDING",
    evidenceDigest: null,
    completionReceiptReferenceId: null,
    createdAt: now,
    updatedAt: now,
    committedAt: null,
    provenance: Object.freeze({
      authority: "XINMAI_SIX_DIMENSION_OBSERVATION_AUTHORITY" as const,
      explicitUserAcknowledgementRequired: true as const,
      noRawWhisperPersistence: true as const,
      noPrivateFreeTextPersistence: true as const,
      noChoiceAuthority: true as const,
      noCrystalAuthority: true as const,
      noRendererAuthority: true as const,
    }),
  });
  const observationSet = Object.freeze({
    ...provisional,
    contentDigest: await createSixDimensionV3ContentDigest(provisional),
  });
  return transactXinmaiSixDimensionObservation({
    gravityRecordId:
      `CURRENT:${command.identityReferences.sourceReferenceId}`,
    expectedGravityObservationReferenceId:
      command.gravityObservationReferenceId,
    expectedGravityObservationLineageRevision:
      command.expectedGravityObservationRevision,
    expectedObservationSetRevision: 0,
    observationSet,
    completionReceipt: null,
    commandFence: await makeFence(
      command,
      observationSetId,
      1,
      null,
      now,
    ),
  });
};

const settleObservationItemV2 = async (
  command: Exclude<
    SixDimensionObservationCommand,
    | { type: "CREATE_OBSERVATION_SET" }
    | { type: "ACKNOWLEDGE_SEMANTIC_SELECTION_V3" }
  >,
): Promise<
  SixDimensionObservationResult<CanonicalSixDimensionObservationSetRecord>
> => {
  const recovered = await recoverXinmaiSixDimensionObservation({
    observationSetId: command.observationSetId,
    dimensionProtocolRevision:
      XINMAI_SIX_DIMENSION_PROTOCOL_REVISION,
  });
  if (recovered.status !== "FOUND") {
    return Object.freeze({
      status: recovered.status === "NOT_FOUND" ? "REJECTED" : "SAFE_WITHHELD",
      value: null,
      observationSet: null,
      completionReceipt: null,
      cause: recovered.cause,
    });
  }
  const current = recovered.observationSet;
  const index = XINMAI_SIX_DIMENSION_IDS.indexOf(command.dimensionId);
  const currentItem = current.items[index];
  if (
    index < 0 ||
    current.lifecycle !== "OPEN" ||
    current.revision !== command.expectedSetRevision ||
    currentItem.itemRevision !== command.expectedItemRevision
  ) {
    return rejected(
      current.lifecycle !== "OPEN"
        ? "OBSERVATION_SET_TERMINAL"
        : "STALE_REVISION",
      current,
      recovered.completionReceipt,
      current.lifecycle !== "OPEN"
        ? "NOT_RETRYABLE"
        : "RETRY_AFTER_REREAD",
    );
  }
  if (
    command.type === "ACKNOWLEDGE_DIMENSION" &&
    command.sourceReferenceId !== currentItem.sourceReferenceId
  ) {
    return rejected(
      "SOURCE_REFERENCE_MISMATCH",
      current,
      null,
    );
  }
  const gravityRead = await readXinmaiGravityObservationContinuityState(
    `CURRENT:${current.identityReferences.sourceReferenceId}`,
  );
  if (gravityRead.status !== "FOUND") {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      value: null,
      observationSet: current,
      completionReceipt: recovered.completionReceipt,
      cause: Object.freeze({
        owner: "SIX_DIMENSION_AUTHORITY" as const,
        code: "GRAVITY_NOT_RECOGNIZED" as const,
        retryability: "RETRY_AFTER_ENVIRONMENT_RECOVERY" as const,
        innerCause: Object.freeze({
          owner: "STORAGE" as const,
          code: gravityRead.reason,
          retryability: "RETRY_AFTER_ENVIRONMENT_RECOVERY" as const,
          innerCause: null,
        }),
      }),
    });
  }
  if (
    gravityRead.record === null ||
    gravityRead.record.gravityObservationReferenceId !==
      current.gravityObservationReferenceId ||
    gravityRead.record.lifecycleState !== "CURRENT" ||
    gravityRead.record.checkpointState !== "OBSERVATION_RECOGNIZED"
  ) {
    return rejected(
      "GRAVITY_NOT_RECOGNIZED",
      current,
      recovered.completionReceipt,
      "RETRY_AFTER_REREAD",
    );
  }
  const now = new Date().toISOString();
  const itemRevision = currentItem.itemRevision + 1;
  const outcomeReferenceId = createSixDimensionOutcomeReferenceId(
    current.observationSetId,
    currentItem.dimensionId,
    itemRevision,
    command.commandReferenceId,
  );
  const state =
    command.type === "ACKNOWLEDGE_DIMENSION"
      ? "OBSERVED" as const
      : command.type === "SKIP_DIMENSION"
        ? "SKIPPED" as const
        : command.type === "DECLINE_DIMENSION"
          ? "DECLINED" as const
          : "UNAVAILABLE" as const;
  const nextItem: CanonicalSixDimensionObservationItem = Object.freeze({
    ...currentItem,
    state,
    outcomeReferenceId,
    acknowledgement:
      command.type === "ACKNOWLEDGE_DIMENSION"
        ? command.acknowledgement
        : null,
    itemRevision,
    committedByCommandReferenceId: command.commandReferenceId,
    observedAt:
      command.type === "ACKNOWLEDGE_DIMENSION" ? now : null,
    updatedAt: now,
    terminalReason:
      command.type === "DECLINE_DIMENSION"
        ? "USER_DECLINED" as const
        : command.type === "MARK_DIMENSION_UNAVAILABLE"
          ? "SOURCE_UNAVAILABLE" as const
          : null,
  });
  const items = Object.freeze(
    current.items.map((item, itemIndex) =>
      itemIndex === index ? nextItem : item,
    ),
  );
  const qualifiesForCompletion = items.every(
    (item) => item.state === "OBSERVED",
  );
  let next: CanonicalSixDimensionObservationSet = Object.freeze({
    ...current,
    items,
    lifecycle: qualifiesForCompletion
      ? "COMPLETED" as const
      : "OPEN" as const,
    revision: current.revision + 1,
    lastCommittedCommandReferenceId: command.commandReferenceId,
    evidenceDigest: null,
    completionReceiptReferenceId: null,
    updatedAt: now,
    committedAt: qualifiesForCompletion ? now : null,
  });
  let receipt: SixDimensionCompletionReceipt | null = null;
  if (qualifiesForCompletion) {
    const evidenceDigest = await createSixDimensionEvidenceDigest(next);
    const completionReceiptReferenceId =
      createSixDimensionCompletionReceiptReferenceId(
        next.observationSetId,
        evidenceDigest,
      );
    next = Object.freeze({
      ...next,
      evidenceDigest,
      completionReceiptReferenceId,
    });
    receipt = Object.freeze({
      schemaVersion:
        XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_SCHEMA_VERSION,
      completionReceiptReferenceId,
      observationSetId: next.observationSetId,
      observationSetRevision: next.revision,
      identityKey: next.identityKey,
      identityReferences: next.identityReferences,
      encounterCycleId: next.encounterCycleId,
      gravityCycleId: next.gravityCycleId,
      gravityObservationReferenceId:
        next.gravityObservationReferenceId,
      pressure: next.pressure,
      dimensionProtocolRevision:
        next.dimensionProtocolRevision,
      itemOutcomeReferences: Object.freeze(
        next.items.map((item) => item.outcomeReferenceId),
      ) as SixDimensionCompletionReceipt["itemOutcomeReferences"],
      contentDigest: next.contentDigest,
      evidenceDigest,
      completedAt: now,
      provenance: Object.freeze({
        authority:
          "XINMAI_SIX_DIMENSION_OBSERVATION_AUTHORITY" as const,
        allSixDistinctObserved: true as const,
        noChoiceAuthority: true as const,
        noActionAuthority: true as const,
        noFactAuthority: true as const,
        noCrystalAuthority: true as const,
      }),
    });
  }
  const fence = await makeFence(
    command,
    current.observationSetId,
    next.revision,
    outcomeReferenceId,
    now,
  );
  return transactXinmaiSixDimensionObservation({
    gravityRecordId:
      `CURRENT:${current.identityReferences.sourceReferenceId}`,
    expectedGravityObservationReferenceId:
      current.gravityObservationReferenceId,
    expectedGravityObservationLineageRevision:
      gravityRead.record.gravityObservationLineageRevision,
    expectedObservationSetRevision: current.revision,
    observationSet: next,
    completionReceipt: receipt,
    commandFence: fence,
  });
};

const settleSemanticSelectionV3 = async (
  command: Extract<
    SixDimensionObservationCommand,
    { type: "ACKNOWLEDGE_SEMANTIC_SELECTION_V3" }
  >,
): Promise<
  SixDimensionObservationResult<CanonicalSixDimensionObservationSetRecord>
> => {
  if (
    command.semanticGrammarRevision !==
      XINMAI_SIX_DIMENSION_SEMANTIC_GRAMMAR_REVISION ||
    !isAllowedSixDimensionSemanticResponseId(
      command.dimensionId,
      command.semanticResponseId,
    )
  ) {
    return rejected(
      command.semanticGrammarRevision !==
          XINMAI_SIX_DIMENSION_SEMANTIC_GRAMMAR_REVISION
        ? "SEMANTIC_GRAMMAR_REVISION_UNKNOWN"
        : "SEMANTIC_RESPONSE_NOT_ALLOWED",
    );
  }
  const read = await readXinmaiSixDimensionAuthoritySnapshot();
  if (read.status !== "FOUND") {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      value: null,
      observationSet: null,
      completionReceipt: null,
      cause: read.cause,
    });
  }
  const currentValue = read.snapshot.observationSets.find(
    (candidate) => candidate.observationSetId === command.observationSetId,
  ) ?? null;
  const receiptValue = read.snapshot.completionReceipts.find(
    (candidate) => candidate.observationSetId === command.observationSetId,
  ) ?? null;
  if (!isCanonicalSixDimensionObservationSetV3(currentValue)) {
    return rejected(
      currentValue === null
        ? "OBSERVATION_SET_NOT_FOUND"
        : "MIXED_OBSERVATION_PROTOCOL_VERSIONS",
      currentValue,
      receiptValue,
    );
  }
  if (
    receiptValue !== null &&
    !isSixDimensionCompletionReceiptV2(receiptValue)
  ) {
    return rejected(
      "MIXED_OBSERVATION_PROTOCOL_VERSIONS",
      currentValue,
      receiptValue,
    );
  }
  const current = currentValue;
  const index = XINMAI_SIX_DIMENSION_IDS.indexOf(command.dimensionId);
  const currentItem = current.items[index];
  if (index < 0 || currentItem === undefined) {
    return rejected("DIMENSION_NOT_IN_PROTOCOL", current, receiptValue);
  }
  if (currentItem.state === "OBSERVED") {
    const sameSelection =
      currentItem.semanticSelection?.semanticGrammarRevision ===
        command.semanticGrammarRevision &&
      currentItem.semanticSelection.semanticResponseId ===
        command.semanticResponseId;
    return sameSelection
      ? Object.freeze({
          status: "ALREADY_COMMITTED" as const,
          value: current,
          observationSet: current,
          completionReceipt: receiptValue,
          cause: null,
        })
      : rejected(
          "SEMANTIC_SELECTION_DIGEST_MISMATCH",
          current,
          receiptValue,
        );
  }
  if (
    current.lifecycle !== "OPEN" ||
    current.revision !== command.expectedSetRevision ||
    currentItem.itemRevision !== command.expectedItemRevision
  ) {
    return rejected(
      current.lifecycle !== "OPEN"
        ? "OBSERVATION_SET_TERMINAL"
        : "STALE_REVISION",
      current,
      receiptValue,
      current.lifecycle !== "OPEN"
        ? "NOT_RETRYABLE"
        : "RETRY_AFTER_REREAD",
    );
  }
  if (command.sourceReferenceId !== currentItem.sourceReferenceId) {
    return rejected(
      "SOURCE_REFERENCE_MISMATCH",
      current,
      receiptValue,
    );
  }
  const gravityRead = await readXinmaiGravityObservationContinuityState(
    `CURRENT:${current.identityReferences.sourceReferenceId}`,
  );
  if (gravityRead.status !== "FOUND" || gravityRead.record === null) {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      value: null,
      observationSet: current,
      completionReceipt: receiptValue,
      cause: Object.freeze({
        owner: "SIX_DIMENSION_AUTHORITY" as const,
        code: "GRAVITY_NOT_RECOGNIZED" as const,
        retryability: "RETRY_AFTER_ENVIRONMENT_RECOVERY" as const,
        innerCause: gravityRead.status === "FOUND"
          ? null
          : Object.freeze({
              owner: "STORAGE" as const,
              code: gravityRead.reason,
              retryability: "RETRY_AFTER_ENVIRONMENT_RECOVERY" as const,
              innerCause: null,
            }),
      }),
    });
  }
  if (
    gravityRead.record.gravityObservationReferenceId !==
      current.gravityObservationReferenceId ||
    gravityRead.record.lifecycleState !== "CURRENT" ||
    gravityRead.record.checkpointState !== "OBSERVATION_RECOGNIZED"
  ) {
    return rejected(
      "GRAVITY_NOT_RECOGNIZED",
      current,
      receiptValue,
      "RETRY_AFTER_REREAD",
    );
  }
  const now = new Date().toISOString();
  const itemRevision = currentItem.itemRevision + 1;
  const outcomeReferenceId = createSixDimensionOutcomeReferenceId(
    current.observationSetId,
    currentItem.dimensionId,
    itemRevision,
    command.commandReferenceId,
  );
  const semanticSelectionDigest =
    await createSixDimensionSemanticSelectionDigest({
      schemaVersion: current.schemaVersion,
      dimensionProtocolRevision: current.dimensionProtocolRevision,
      canonicalLineageKey: current.canonicalLineageKey,
      observationSetId: current.observationSetId,
      dimensionId: command.dimensionId,
      semanticGrammarRevision: command.semanticGrammarRevision,
      semanticResponseId: command.semanticResponseId,
    });
  const nextItem: CanonicalSixDimensionObservationItemV3 = Object.freeze({
    ...currentItem,
    state: "OBSERVED" as const,
    outcomeReferenceId,
    acknowledgement: command.acknowledgement,
    semanticSelection: Object.freeze({
      semanticGrammarRevision: command.semanticGrammarRevision,
      semanticResponseId: command.semanticResponseId,
      semanticSelectionReferenceId:
        createSixDimensionSemanticSelectionReferenceId(
          {
            observationSetId: current.observationSetId,
            dimensionId: command.dimensionId,
          },
          semanticSelectionDigest,
        ),
      semanticSelectionDigest,
    }),
    itemRevision,
    committedByCommandReferenceId: command.commandReferenceId,
    observedAt: now,
    updatedAt: now,
    terminalReason: null,
  });
  const items = Object.freeze(
    current.items.map((item, itemIndex) =>
      itemIndex === index ? nextItem : item,
    ),
  );
  const qualifiesForCompletion = items.every(
    (item) =>
      item.state === "OBSERVED" && item.semanticSelection !== null,
  );
  let next: CanonicalSixDimensionObservationSetV3 = Object.freeze({
    ...current,
    items,
    lifecycle: qualifiesForCompletion
      ? "COMPLETED" as const
      : "OPEN" as const,
    revision: current.revision + 1,
    lastCommittedCommandReferenceId: command.commandReferenceId,
    evidenceDigest: null,
    completionReceiptReferenceId: null,
    updatedAt: now,
    committedAt: qualifiesForCompletion ? now : null,
  });
  let receipt: SixDimensionCompletionReceiptV2 | null = null;
  if (qualifiesForCompletion) {
    const evidenceDigest = await createSixDimensionV3EvidenceDigest(next);
    const selectionReferences = next.items.map(
      (item) => item.semanticSelection?.semanticSelectionReferenceId ?? "",
    ) as unknown as SixDimensionCompletionReceiptV2["semanticSelectionReferences"];
    const selectionDigests = next.items.map(
      (item) => item.semanticSelection?.semanticSelectionDigest ?? "",
    ) as unknown as SixDimensionCompletionReceiptV2["semanticSelectionDigests"];
    const semanticSelectionAggregateDigest =
      await createSixDimensionSemanticSelectionAggregateDigest(
        selectionDigests,
      );
    const completionReceiptReferenceId =
      createSixDimensionCompletionReceiptReferenceId(
        next.observationSetId,
        evidenceDigest,
      );
    next = Object.freeze({
      ...next,
      evidenceDigest,
      completionReceiptReferenceId,
    });
    receipt = Object.freeze({
      schemaVersion:
        XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_V2_SCHEMA_VERSION,
      completionReceiptReferenceId,
      observationSetId: next.observationSetId,
      observationSetRevision: next.revision,
      identityKey: next.identityKey,
      identityReferences: next.identityReferences,
      encounterCycleId: next.encounterCycleId,
      gravityCycleId: next.gravityCycleId,
      gravityObservationReferenceId: next.gravityObservationReferenceId,
      pressure: next.pressure,
      dimensionProtocolRevision: next.dimensionProtocolRevision,
      semanticGrammarRevision: next.semanticGrammarRevision,
      itemOutcomeReferences: Object.freeze(
        next.items.map((item) => item.outcomeReferenceId),
      ) as SixDimensionCompletionReceiptV2["itemOutcomeReferences"],
      semanticSelectionReferences: Object.freeze(selectionReferences),
      semanticSelectionDigests: Object.freeze(selectionDigests),
      semanticSelectionAggregateDigest,
      contentDigest: next.contentDigest,
      evidenceDigest,
      completedAt: now,
      provenance: Object.freeze({
        authority: "XINMAI_SIX_DIMENSION_OBSERVATION_AUTHORITY" as const,
        allSixDistinctObserved: true as const,
        noChoiceAuthority: true as const,
        noActionAuthority: true as const,
        noFactAuthority: true as const,
        noCrystalAuthority: true as const,
      }),
    });
  }
  return transactXinmaiSixDimensionObservation({
    gravityRecordId:
      `CURRENT:${current.identityReferences.sourceReferenceId}`,
    expectedGravityObservationReferenceId:
      current.gravityObservationReferenceId,
    expectedGravityObservationLineageRevision:
      gravityRead.record.gravityObservationLineageRevision,
    expectedObservationSetRevision: current.revision,
    observationSet: next,
    completionReceipt: receipt,
    commandFence: await makeFence(
      command,
      current.observationSetId,
      next.revision,
      outcomeReferenceId,
      now,
    ),
  });
};

export async function executeXinmaiSixDimensionObservationCommand(
  command: SixDimensionObservationCommand,
): Promise<
  SixDimensionObservationResult<CanonicalSixDimensionObservationSetRecord>
> {
  if (
    !canMutateXinmaiSixDimensionObservation() ||
    ((command.type === "ACKNOWLEDGE_SEMANTIC_SELECTION_V3" ||
      (command.type === "CREATE_OBSERVATION_SET" &&
        command.dimensionProtocolRevision ===
          XINMAI_SIX_DIMENSION_V3_PROTOCOL_REVISION)) &&
      !canMutateXinmaiSixDimensionSemanticSelection())
  ) {
    return safeWithheld();
  }
  try {
    if (command.type === "CREATE_OBSERVATION_SET") {
      return command.dimensionProtocolRevision ===
          XINMAI_SIX_DIMENSION_V3_PROTOCOL_REVISION
        ? await createObservationSetV3(command)
        : await createObservationSetV2(command);
    }
    return command.type === "ACKNOWLEDGE_SEMANTIC_SELECTION_V3"
      ? await settleSemanticSelectionV3(command)
      : await settleObservationItemV2(command);
  } catch {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      value: null,
      observationSet: null,
      completionReceipt: null,
      cause: cause(
        "TRANSACTION_STORAGE_UNAVAILABLE",
        "RETRY_AFTER_ENVIRONMENT_RECOVERY",
      ),
    });
  }
}
