import {
  XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_SCHEMA_VERSION,
  XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_V2_SCHEMA_VERSION,
  XINMAI_SIX_DIMENSION_OBSERVATION_SCHEMA_VERSION,
  XINMAI_SIX_DIMENSION_OBSERVATION_V3_SCHEMA_VERSION,
  XINMAI_SIX_DIMENSION_SEMANTIC_GRAMMAR_REVISION,
  type CanonicalSixDimensionObservationSetRecord,
  type SixDimensionCompletionReceiptRecord,
  type SixDimensionFailureCause,
} from "../types/xinmaiSixDimensionObservation";
import type {
  SixDimensionSemanticSelectionRecoveryResult,
} from "../types/xinmaiSixDimensionSemanticSelection";
import { readXinmaiSixDimensionAuthoritySnapshot } from "./xinmaiLivedGrowthTransactionalStore";
import {
  isCanonicalSixDimensionObservationSetV3,
  isCanonicalSixDimensionObservationSetRecord,
  isSixDimensionCompletionReceiptRecord,
  isSixDimensionCompletionReceiptV2,
  validateSixDimensionSemanticSelectionIntegrity,
} from "./xinmaiSixDimensionSemanticSelectionEvidenceValidator";
import {
  isCanonicalSixDimensionObservationSet,
  isSixDimensionCompletionReceipt,
  validateSixDimensionSetReceiptPair,
} from "./xinmaiSixDimensionObservationEvidenceValidator";

export const XINMAI_SIX_DIMENSION_SEMANTIC_SELECTION_RECOVERY_BOUNDARY =
  Object.freeze({
    canonicalReader: "XINMAI_LIVED_GROWTH_TRANSACTIONAL_STORE_V3" as const,
    mutationAllowed: false as const,
    noBackfill: true as const,
    noDefaultSelection: true as const,
    noCurrentGrammarReinterpretation: true as const,
    noRawTextRecovery: true as const,
  });

const cause = (
  code: SixDimensionFailureCause["code"],
): SixDimensionFailureCause => Object.freeze({
  owner: "SIX_DIMENSION_AUTHORITY" as const,
  code,
  retryability: "NOT_RETRYABLE" as const,
  innerCause: null,
});

const safeWithheld = (
  code: SixDimensionFailureCause["code"],
): SixDimensionSemanticSelectionRecoveryResult => Object.freeze({
  status: "SAFE_WITHHELD" as const,
  observationSet: null,
  completionReceipt: null,
  selections: null,
  cause: cause(code),
});

const readSchemaVersion = (value: unknown): unknown =>
  typeof value === "object" && value !== null && "schemaVersion" in value
    ? (value as { schemaVersion?: unknown }).schemaVersion
    : null;

export async function recoverXinmaiSixDimensionSemanticSelectionFromRecords(
  observationSetValue: unknown,
  completionReceiptValue: unknown,
): Promise<SixDimensionSemanticSelectionRecoveryResult> {
  const setSchema = readSchemaVersion(observationSetValue);
  const receiptSchema = completionReceiptValue === null
    ? null
    : readSchemaVersion(completionReceiptValue);

  const recognizedSetSchema =
    setSchema === XINMAI_SIX_DIMENSION_OBSERVATION_SCHEMA_VERSION ||
    setSchema === XINMAI_SIX_DIMENSION_OBSERVATION_V3_SCHEMA_VERSION;
  const recognizedReceiptSchema =
    receiptSchema === null ||
    receiptSchema === XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_SCHEMA_VERSION ||
    receiptSchema ===
      XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_V2_SCHEMA_VERSION;
  if (!recognizedSetSchema || !recognizedReceiptSchema) {
    return safeWithheld("RECOVERY_CORRUPTED");
  }
  if (
    (setSchema === XINMAI_SIX_DIMENSION_OBSERVATION_SCHEMA_VERSION &&
      receiptSchema ===
        XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_V2_SCHEMA_VERSION) ||
    (setSchema === XINMAI_SIX_DIMENSION_OBSERVATION_V3_SCHEMA_VERSION &&
      receiptSchema ===
        XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_SCHEMA_VERSION)
  ) {
    return safeWithheld("MIXED_OBSERVATION_PROTOCOL_VERSIONS");
  }

  if (setSchema === XINMAI_SIX_DIMENSION_OBSERVATION_SCHEMA_VERSION) {
    if (!isCanonicalSixDimensionObservationSet(observationSetValue) ||
        !(completionReceiptValue === null ||
          isSixDimensionCompletionReceipt(completionReceiptValue)) ||
        !validateSixDimensionSetReceiptPair(
          observationSetValue,
          completionReceiptValue,
        )) {
      return safeWithheld("RECOVERY_CORRUPTED");
    }
    return Object.freeze({
      status: "LEGACY_GENERIC_ONLY" as const,
      observationSet: observationSetValue,
      completionReceipt: completionReceiptValue,
      observedDimensionIds: Object.freeze(
        observationSetValue.items
          .filter((item) => item.state === "OBSERVED")
          .map((item) => item.dimensionId),
      ),
      selections: null,
      cause: Object.freeze({
        owner: "SIX_DIMENSION_AUTHORITY" as const,
        code: "SEMANTIC_SELECTION_NOT_RECORDED" as const,
        retryability: "NOT_RETRYABLE" as const,
        innerCause: null,
      }),
    });
  }

  if (!isCanonicalSixDimensionObservationSetV3(observationSetValue)) {
    const grammarRevision =
      typeof observationSetValue === "object" &&
      observationSetValue !== null &&
      "semanticGrammarRevision" in observationSetValue
        ? (observationSetValue as { semanticGrammarRevision?: unknown })
          .semanticGrammarRevision
        : null;
    return safeWithheld(
      grammarRevision !== null &&
      grammarRevision !== XINMAI_SIX_DIMENSION_SEMANTIC_GRAMMAR_REVISION
        ? "SEMANTIC_GRAMMAR_REVISION_UNKNOWN"
        : "RECOVERY_CORRUPTED",
    );
  }
  if (!(completionReceiptValue === null ||
      isSixDimensionCompletionReceiptV2(completionReceiptValue))) {
    return safeWithheld("RECOVERY_CORRUPTED");
  }
  if (observationSetValue.items.some(
    (item) => item.state === "OBSERVED" && item.semanticSelection === null,
  )) {
    return safeWithheld("SEMANTIC_SELECTION_MISSING");
  }
  if (!await validateSixDimensionSemanticSelectionIntegrity(
    observationSetValue,
    completionReceiptValue,
  )) {
    return safeWithheld("SEMANTIC_SELECTION_DIGEST_MISMATCH");
  }
  const selections = Object.freeze(
    observationSetValue.items.flatMap((item) =>
      item.state === "OBSERVED" && item.semanticSelection !== null
        ? [Object.freeze({
            dimensionId: item.dimensionId,
            state: "OBSERVED" as const,
            selection: item.semanticSelection,
          })]
        : []),
  );
  return Object.freeze({
    status: completionReceiptValue === null
      ? "EXACT_SUBSET" as const
      : "EXACT_COMPLETE" as const,
    observationSet: observationSetValue,
    completionReceipt: completionReceiptValue,
    selections,
    cause: null,
  });
}

export async function recoverXinmaiSixDimensionSemanticSelection(
  observationSetId: string,
): Promise<SixDimensionSemanticSelectionRecoveryResult> {
  if (observationSetId.trim().length === 0) {
    return safeWithheld("INVALID_COMMAND");
  }
  const read = await readXinmaiSixDimensionAuthoritySnapshot();
  if (read.status !== "FOUND") {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      observationSet: null,
      completionReceipt: null,
      selections: null,
      cause: read.cause,
    });
  }
  const observationSet = read.snapshot.observationSets.find(
    (candidate) => candidate.observationSetId === observationSetId,
  );
  if (observationSet === undefined) {
    return safeWithheld("OBSERVATION_SET_NOT_FOUND");
  }
  const receipt = read.snapshot.completionReceipts.find(
    (candidate) => candidate.observationSetId === observationSetId,
  ) ?? null;
  return recoverXinmaiSixDimensionSemanticSelectionFromRecords(
    observationSet,
    receipt,
  );
}

export const XinmaiSixDimensionSemanticSelectionRecoveryAdapter =
  Object.freeze({
    recover: recoverXinmaiSixDimensionSemanticSelection,
    recoverFromRecords:
      recoverXinmaiSixDimensionSemanticSelectionFromRecords,
    boundary: XINMAI_SIX_DIMENSION_SEMANTIC_SELECTION_RECOVERY_BOUNDARY,
    writesAuthority: false as const,
  });

export type XinmaiSixDimensionSemanticSelectionRecordPair = Readonly<{
  observationSet: CanonicalSixDimensionObservationSetRecord;
  completionReceipt: SixDimensionCompletionReceiptRecord | null;
}>;

export const isXinmaiSixDimensionSemanticSelectionRecordPair = (
  value: unknown,
): value is XinmaiSixDimensionSemanticSelectionRecordPair =>
  typeof value === "object" && value !== null &&
  "observationSet" in value && "completionReceipt" in value &&
  isCanonicalSixDimensionObservationSetRecord(
    (value as { observationSet: unknown }).observationSet,
  ) &&
  (((value as { completionReceipt: unknown }).completionReceipt === null) ||
    isSixDimensionCompletionReceiptRecord(
      (value as { completionReceipt: unknown }).completionReceipt,
    ));
