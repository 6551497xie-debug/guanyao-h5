import {
  XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_SCHEMA_VERSION,
  XINMAI_SIX_DIMENSION_IDS,
  XINMAI_SIX_DIMENSION_OBSERVATION_SCHEMA_VERSION,
  XINMAI_SIX_DIMENSION_PROTOCOL_REVISION,
  type CanonicalSixDimensionObservationItem,
  type CanonicalSixDimensionObservationSet,
  type SixDimensionCommandFenceRecord,
  type SixDimensionCompletionReceipt,
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
  recoverXinmaiSixDimensionObservation,
} from "./xinmaiSixDimensionObservationRecoveryAdapter";
import {
  readXinmaiGravityObservationContinuityState,
  transactXinmaiSixDimensionObservation,
} from "./xinmaiLivedGrowthTransactionalStore";
import {
  XINMAI_SIX_DIMENSION_PHASE_2_POLICY,
  canMutateXinmaiSixDimensionObservation,
} from "./xinmaiSixDimensionObservationRuntimePolicy";

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
  observationSet: CanonicalSixDimensionObservationSet | null = null,
  completionReceipt: SixDimensionCompletionReceipt | null = null,
  retryability:
    | "RETRY_AFTER_REREAD"
    | "RETRY_AFTER_ENVIRONMENT_RECOVERY"
    | "NOT_RETRYABLE" = "NOT_RETRYABLE",
): SixDimensionObservationResult<CanonicalSixDimensionObservationSet> =>
  Object.freeze({
    status: "REJECTED" as const,
    value: null,
    observationSet,
    completionReceipt,
    cause: cause(code, retryability),
  });

const safeWithheld = ():
  SixDimensionObservationResult<CanonicalSixDimensionObservationSet> =>
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

const createObservationSet = async (
  command: Extract<
    SixDimensionObservationCommand,
    { type: "CREATE_OBSERVATION_SET" }
  >,
): Promise<
  SixDimensionObservationResult<CanonicalSixDimensionObservationSet>
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

const settleObservationItem = async (
  command: Exclude<
    SixDimensionObservationCommand,
    { type: "CREATE_OBSERVATION_SET" }
  >,
): Promise<
  SixDimensionObservationResult<CanonicalSixDimensionObservationSet>
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

export async function executeXinmaiSixDimensionObservationCommand(
  command: SixDimensionObservationCommand,
): Promise<
  SixDimensionObservationResult<CanonicalSixDimensionObservationSet>
> {
  if (!canMutateXinmaiSixDimensionObservation()) {
    return safeWithheld();
  }
  try {
    return command.type === "CREATE_OBSERVATION_SET"
      ? await createObservationSet(command)
      : await settleObservationItem(command);
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
