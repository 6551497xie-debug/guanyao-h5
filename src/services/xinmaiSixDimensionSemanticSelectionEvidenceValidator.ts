import {
  XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_V2_SCHEMA_VERSION,
  XINMAI_SIX_DIMENSION_IDS,
  XINMAI_SIX_DIMENSION_OBSERVATION_V3_SCHEMA_VERSION,
  XINMAI_SIX_DIMENSION_SEMANTIC_GRAMMAR_REVISION,
  XINMAI_SIX_DIMENSION_SEMANTIC_RESPONSE_IDS,
  XINMAI_SIX_DIMENSION_V3_PROTOCOL_REVISION,
  type CanonicalSixDimensionObservationItemV3,
  type CanonicalSixDimensionObservationSetRecord,
  type CanonicalSixDimensionObservationSetV3,
  type CanonicalSixDimensionSemanticSelection,
  type SixDimensionCompletionReceiptRecord,
  type SixDimensionCompletionReceiptV2,
  type SixDimensionId,
  type SixDimensionSemanticResponseId,
} from "../types/xinmaiSixDimensionObservation";
import {
  isCanonicalSixDimensionObservationSet,
  isSixDimensionCompletionReceipt,
  sha256CanonicalValue,
  validateSixDimensionSetReceiptPair,
} from "./xinmaiSixDimensionObservationEvidenceValidator";

const ITEM_STATES = new Set([
  "PENDING",
  "OBSERVED",
  "SKIPPED",
  "DECLINED",
  "UNAVAILABLE",
]);
const ACKNOWLEDGEMENTS = new Set([
  "IMPACT_RECOGNIZED_PRESENT",
  "IMPACT_RECOGNIZED_ABSENT",
  "IMPACT_RECOGNIZED_UNCERTAIN",
]);
const LIFECYCLES = new Set([
  "OPEN",
  "COMPLETED",
  "CONSUMED_BY_CHOICE",
  "TERMINAL",
]);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const hasText = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const isIsoTimestamp = (value: unknown): value is string =>
  hasText(value) && Number.isFinite(Date.parse(value));

const hasExactKeys = (
  value: Record<string, unknown>,
  keys: readonly string[],
): boolean => {
  const actual = Object.keys(value).sort();
  const expected = [...keys].sort();
  return actual.length === expected.length &&
    actual.every((key, index) => key === expected[index]);
};

const isIdentityReferences = (value: unknown): boolean =>
  isRecord(value) &&
  hasExactKeys(value, [
    "sourceReferenceId",
    "starBeastIdentityReferenceId",
    "mansionCoordinateReferenceId",
  ]) &&
  hasText(value.sourceReferenceId) &&
  hasText(value.starBeastIdentityReferenceId) &&
  hasText(value.mansionCoordinateReferenceId);

const isPressureReference = (value: unknown): boolean =>
  isRecord(value) &&
  hasExactKeys(value, [
    "runtimeSeedId",
    "candidateReferenceId",
    "catalogRevision",
  ]) &&
  hasText(value.runtimeSeedId) &&
  hasText(value.candidateReferenceId) &&
  hasText(value.catalogRevision);

const isDimensionId = (value: unknown): value is SixDimensionId =>
  typeof value === "string" &&
  (XINMAI_SIX_DIMENSION_IDS as readonly string[]).includes(value);

export function isAllowedSixDimensionSemanticResponseId(
  dimensionId: SixDimensionId,
  responseId: unknown,
): responseId is SixDimensionSemanticResponseId {
  return typeof responseId === "string" &&
    (XINMAI_SIX_DIMENSION_SEMANTIC_RESPONSE_IDS[dimensionId] as readonly string[])
      .includes(responseId);
}

export function isCanonicalSixDimensionSemanticSelection(
  value: unknown,
  dimensionId: SixDimensionId,
): value is CanonicalSixDimensionSemanticSelection {
  return isRecord(value) &&
    hasExactKeys(value, [
      "semanticGrammarRevision",
      "semanticResponseId",
      "semanticSelectionReferenceId",
      "semanticSelectionDigest",
    ]) &&
    value.semanticGrammarRevision ===
      XINMAI_SIX_DIMENSION_SEMANTIC_GRAMMAR_REVISION &&
    isAllowedSixDimensionSemanticResponseId(
      dimensionId,
      value.semanticResponseId,
    ) &&
    hasText(value.semanticSelectionReferenceId) &&
    hasText(value.semanticSelectionDigest);
}

export function isCanonicalSixDimensionObservationItemV3(
  value: unknown,
): value is CanonicalSixDimensionObservationItemV3 {
  if (
    !isRecord(value) ||
    !hasExactKeys(value, [
      "dimensionId",
      "ordinal",
      "state",
      "sourceReferenceId",
      "outcomeReferenceId",
      "acknowledgement",
      "semanticSelection",
      "itemRevision",
      "committedByCommandReferenceId",
      "presentedAt",
      "observedAt",
      "updatedAt",
      "terminalReason",
    ]) ||
    !isDimensionId(value.dimensionId) ||
    !Number.isInteger(value.ordinal) ||
    Number(value.ordinal) < 1 ||
    Number(value.ordinal) > 6 ||
    typeof value.state !== "string" ||
    !ITEM_STATES.has(value.state) ||
    !hasText(value.sourceReferenceId) ||
    !(value.outcomeReferenceId === null || hasText(value.outcomeReferenceId)) ||
    !(value.acknowledgement === null ||
      (typeof value.acknowledgement === "string" &&
        ACKNOWLEDGEMENTS.has(value.acknowledgement))) ||
    !Number.isInteger(value.itemRevision) ||
    Number(value.itemRevision) < 0 ||
    !(value.committedByCommandReferenceId === null ||
      hasText(value.committedByCommandReferenceId)) ||
    value.presentedAt !== null ||
    !(value.observedAt === null || isIsoTimestamp(value.observedAt)) ||
    !isIsoTimestamp(value.updatedAt) ||
    !(value.terminalReason === null ||
      value.terminalReason === "USER_DECLINED" ||
      value.terminalReason === "SOURCE_UNAVAILABLE")
  ) {
    return false;
  }

  if (value.state === "OBSERVED") {
    return hasText(value.outcomeReferenceId) &&
      typeof value.acknowledgement === "string" &&
      ACKNOWLEDGEMENTS.has(value.acknowledgement) &&
      isCanonicalSixDimensionSemanticSelection(
        value.semanticSelection,
        value.dimensionId,
      ) &&
      hasText(value.committedByCommandReferenceId) &&
      isIsoTimestamp(value.observedAt) &&
      value.terminalReason === null;
  }

  if (value.semanticSelection !== null || value.acknowledgement !== null ||
      value.observedAt !== null) {
    return false;
  }
  if (value.state === "DECLINED") {
    return value.terminalReason === "USER_DECLINED" &&
      hasText(value.outcomeReferenceId) &&
      hasText(value.committedByCommandReferenceId);
  }
  if (value.state === "UNAVAILABLE") {
    return value.terminalReason === "SOURCE_UNAVAILABLE";
  }
  return value.terminalReason === null;
}

const hasCanonicalDimensionOrder = (value: unknown): boolean =>
  Array.isArray(value) && value.length === XINMAI_SIX_DIMENSION_IDS.length &&
  value.every(
    (dimension, index) => dimension === XINMAI_SIX_DIMENSION_IDS[index],
  );

const hasCanonicalV3Items = (value: unknown): boolean =>
  Array.isArray(value) && value.length === XINMAI_SIX_DIMENSION_IDS.length &&
  value.every(
    (item, index) =>
      isCanonicalSixDimensionObservationItemV3(item) &&
      item.dimensionId === XINMAI_SIX_DIMENSION_IDS[index] &&
      item.ordinal === index + 1,
  );

const isObservationProvenance = (value: unknown): boolean =>
  isRecord(value) &&
  hasExactKeys(value, [
    "authority",
    "explicitUserAcknowledgementRequired",
    "noRawWhisperPersistence",
    "noPrivateFreeTextPersistence",
    "noChoiceAuthority",
    "noCrystalAuthority",
    "noRendererAuthority",
  ]) &&
  value.authority === "XINMAI_SIX_DIMENSION_OBSERVATION_AUTHORITY" &&
  value.explicitUserAcknowledgementRequired === true &&
  value.noRawWhisperPersistence === true &&
  value.noPrivateFreeTextPersistence === true &&
  value.noChoiceAuthority === true &&
  value.noCrystalAuthority === true &&
  value.noRendererAuthority === true;

export function isCanonicalSixDimensionObservationSetV3(
  value: unknown,
): value is CanonicalSixDimensionObservationSetV3 {
  return isRecord(value) &&
    hasExactKeys(value, [
      "schemaVersion",
      "observationSetId",
      "canonicalLineageKey",
      "identityKey",
      "identityReferences",
      "encounterCycleId",
      "gravityCycleId",
      "gravityObservationReferenceId",
      "pressure",
      "dimensionProtocolRevision",
      "semanticGrammarRevision",
      "dimensionOrder",
      "items",
      "lifecycle",
      "revision",
      "lastCommittedCommandReferenceId",
      "contentDigest",
      "evidenceDigest",
      "completionReceiptReferenceId",
      "createdAt",
      "updatedAt",
      "committedAt",
      "provenance",
    ]) &&
    value.schemaVersion ===
      XINMAI_SIX_DIMENSION_OBSERVATION_V3_SCHEMA_VERSION &&
    hasText(value.observationSetId) &&
    hasText(value.canonicalLineageKey) &&
    hasText(value.identityKey) &&
    isIdentityReferences(value.identityReferences) &&
    hasText(value.encounterCycleId) &&
    hasText(value.gravityCycleId) &&
    hasText(value.gravityObservationReferenceId) &&
    isPressureReference(value.pressure) &&
    value.dimensionProtocolRevision ===
      XINMAI_SIX_DIMENSION_V3_PROTOCOL_REVISION &&
    value.semanticGrammarRevision ===
      XINMAI_SIX_DIMENSION_SEMANTIC_GRAMMAR_REVISION &&
    hasCanonicalDimensionOrder(value.dimensionOrder) &&
    hasCanonicalV3Items(value.items) &&
    typeof value.lifecycle === "string" &&
    LIFECYCLES.has(value.lifecycle) &&
    Number.isInteger(value.revision) &&
    Number(value.revision) >= 1 &&
    (value.lastCommittedCommandReferenceId === null ||
      hasText(value.lastCommittedCommandReferenceId)) &&
    hasText(value.contentDigest) &&
    (value.evidenceDigest === null || hasText(value.evidenceDigest)) &&
    (value.completionReceiptReferenceId === null ||
      hasText(value.completionReceiptReferenceId)) &&
    isIsoTimestamp(value.createdAt) &&
    isIsoTimestamp(value.updatedAt) &&
    (value.committedAt === null || isIsoTimestamp(value.committedAt)) &&
    isObservationProvenance(value.provenance) &&
    ((value.lifecycle === "OPEN" &&
      value.completionReceiptReferenceId === null &&
      value.evidenceDigest === null &&
      value.committedAt === null) ||
      (value.lifecycle !== "OPEN" &&
        hasText(value.completionReceiptReferenceId) &&
        hasText(value.evidenceDigest) &&
        isIsoTimestamp(value.committedAt)));
}

const isReceiptProvenance = (value: unknown): boolean =>
  isRecord(value) &&
  hasExactKeys(value, [
    "authority",
    "allSixDistinctObserved",
    "noChoiceAuthority",
    "noActionAuthority",
    "noFactAuthority",
    "noCrystalAuthority",
  ]) &&
  value.authority === "XINMAI_SIX_DIMENSION_OBSERVATION_AUTHORITY" &&
  value.allSixDistinctObserved === true &&
  value.noChoiceAuthority === true &&
  value.noActionAuthority === true &&
  value.noFactAuthority === true &&
  value.noCrystalAuthority === true;

const isSixTextTuple = (value: unknown): value is readonly [
  string, string, string, string, string, string,
] => Array.isArray(value) && value.length === 6 &&
  value.every(hasText) && new Set(value).size === 6;

export function isSixDimensionCompletionReceiptV2(
  value: unknown,
): value is SixDimensionCompletionReceiptV2 {
  return isRecord(value) &&
    hasExactKeys(value, [
      "schemaVersion",
      "completionReceiptReferenceId",
      "observationSetId",
      "observationSetRevision",
      "identityKey",
      "identityReferences",
      "encounterCycleId",
      "gravityCycleId",
      "gravityObservationReferenceId",
      "pressure",
      "dimensionProtocolRevision",
      "semanticGrammarRevision",
      "itemOutcomeReferences",
      "semanticSelectionReferences",
      "semanticSelectionDigests",
      "semanticSelectionAggregateDigest",
      "contentDigest",
      "evidenceDigest",
      "completedAt",
      "provenance",
    ]) &&
    value.schemaVersion ===
      XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_V2_SCHEMA_VERSION &&
    hasText(value.completionReceiptReferenceId) &&
    hasText(value.observationSetId) &&
    Number.isInteger(value.observationSetRevision) &&
    Number(value.observationSetRevision) >= 1 &&
    hasText(value.identityKey) &&
    isIdentityReferences(value.identityReferences) &&
    hasText(value.encounterCycleId) &&
    hasText(value.gravityCycleId) &&
    hasText(value.gravityObservationReferenceId) &&
    isPressureReference(value.pressure) &&
    value.dimensionProtocolRevision ===
      XINMAI_SIX_DIMENSION_V3_PROTOCOL_REVISION &&
    value.semanticGrammarRevision ===
      XINMAI_SIX_DIMENSION_SEMANTIC_GRAMMAR_REVISION &&
    isSixTextTuple(value.itemOutcomeReferences) &&
    isSixTextTuple(value.semanticSelectionReferences) &&
    isSixTextTuple(value.semanticSelectionDigests) &&
    hasText(value.semanticSelectionAggregateDigest) &&
    hasText(value.contentDigest) &&
    hasText(value.evidenceDigest) &&
    isIsoTimestamp(value.completedAt) &&
    isReceiptProvenance(value.provenance);
}

export const isCanonicalSixDimensionObservationSetRecord = (
  value: unknown,
): value is CanonicalSixDimensionObservationSetRecord =>
  isCanonicalSixDimensionObservationSet(value) ||
  isCanonicalSixDimensionObservationSetV3(value);

export const isSixDimensionCompletionReceiptRecord = (
  value: unknown,
): value is SixDimensionCompletionReceiptRecord =>
  isSixDimensionCompletionReceipt(value) ||
  isSixDimensionCompletionReceiptV2(value);

export type SemanticSelectionDigestInput = Readonly<{
  schemaVersion:
    typeof XINMAI_SIX_DIMENSION_OBSERVATION_V3_SCHEMA_VERSION;
  dimensionProtocolRevision:
    typeof XINMAI_SIX_DIMENSION_V3_PROTOCOL_REVISION;
  canonicalLineageKey: string;
  observationSetId: string;
  dimensionId: SixDimensionId;
  semanticGrammarRevision:
    typeof XINMAI_SIX_DIMENSION_SEMANTIC_GRAMMAR_REVISION;
  semanticResponseId: SixDimensionSemanticResponseId;
}>;

export async function createSixDimensionSemanticSelectionDigest(
  input: SemanticSelectionDigestInput,
): Promise<string> {
  return sha256CanonicalValue(input);
}

export function createSixDimensionSemanticSelectionReferenceId(
  input: Pick<SemanticSelectionDigestInput, "observationSetId" | "dimensionId">,
  semanticSelectionDigest: string,
): string {
  return [
    "six-dimension-semantic-selection",
    encodeURIComponent(input.observationSetId.trim()),
    input.dimensionId,
    semanticSelectionDigest,
  ].join(":");
}

export async function createSixDimensionSemanticSelectionAggregateDigest(
  semanticSelectionDigests: readonly string[],
): Promise<string> {
  return sha256CanonicalValue({
    semanticGrammarRevision:
      XINMAI_SIX_DIMENSION_SEMANTIC_GRAMMAR_REVISION,
    dimensionOrder: XINMAI_SIX_DIMENSION_IDS,
    semanticSelectionDigests,
  });
}

export async function createSixDimensionV3ContentDigest(
  observationSet: CanonicalSixDimensionObservationSetV3,
): Promise<string> {
  return sha256CanonicalValue({
    schemaVersion: observationSet.schemaVersion,
    observationSetId: observationSet.observationSetId,
    canonicalLineageKey: observationSet.canonicalLineageKey,
    identityKey: observationSet.identityKey,
    identityReferences: observationSet.identityReferences,
    encounterCycleId: observationSet.encounterCycleId,
    gravityCycleId: observationSet.gravityCycleId,
    gravityObservationReferenceId:
      observationSet.gravityObservationReferenceId,
    pressure: observationSet.pressure,
    dimensionProtocolRevision: observationSet.dimensionProtocolRevision,
    semanticGrammarRevision: observationSet.semanticGrammarRevision,
    dimensionOrder: observationSet.dimensionOrder,
    itemSources: observationSet.items.map((item) => ({
      dimensionId: item.dimensionId,
      ordinal: item.ordinal,
      sourceReferenceId: item.sourceReferenceId,
    })),
  });
}

export async function createSixDimensionV3EvidenceDigest(
  observationSet: CanonicalSixDimensionObservationSetV3,
): Promise<string> {
  return sha256CanonicalValue({
    contentDigest: observationSet.contentDigest,
    semanticGrammarRevision: observationSet.semanticGrammarRevision,
    items: observationSet.items.map((item) => ({
      dimensionId: item.dimensionId,
      state: item.state,
      itemRevision: item.itemRevision,
      outcomeReferenceId: item.outcomeReferenceId,
      acknowledgement: item.acknowledgement,
      semanticSelectionReferenceId:
        item.semanticSelection?.semanticSelectionReferenceId ?? null,
      semanticSelectionDigest:
        item.semanticSelection?.semanticSelectionDigest ?? null,
    })),
  });
}

export async function validateSixDimensionSemanticSelectionIntegrity(
  observationSet: CanonicalSixDimensionObservationSetV3,
  receipt: SixDimensionCompletionReceiptV2 | null,
): Promise<boolean> {
  if (!isCanonicalSixDimensionObservationSetV3(observationSet) ||
      !(receipt === null || isSixDimensionCompletionReceiptV2(receipt))) {
    return false;
  }
  if (observationSet.contentDigest !==
      await createSixDimensionV3ContentDigest(observationSet)) {
    return false;
  }
  for (const item of observationSet.items) {
    if (item.state !== "OBSERVED") continue;
    const selection = item.semanticSelection;
    if (selection === null) return false;
    const digest = await createSixDimensionSemanticSelectionDigest({
      schemaVersion: observationSet.schemaVersion,
      dimensionProtocolRevision: observationSet.dimensionProtocolRevision,
      canonicalLineageKey: observationSet.canonicalLineageKey,
      observationSetId: observationSet.observationSetId,
      dimensionId: item.dimensionId,
      semanticGrammarRevision: observationSet.semanticGrammarRevision,
      semanticResponseId: selection.semanticResponseId,
    });
    if (selection.semanticSelectionDigest !== digest ||
        selection.semanticSelectionReferenceId !==
          createSixDimensionSemanticSelectionReferenceId(
            {
              observationSetId: observationSet.observationSetId,
              dimensionId: item.dimensionId,
            },
            digest,
          )) {
      return false;
    }
  }

  if (observationSet.lifecycle === "OPEN") {
    return receipt === null && observationSet.evidenceDigest === null &&
      observationSet.completionReceiptReferenceId === null;
  }
  if (receipt === null ||
      observationSet.evidenceDigest !==
        await createSixDimensionV3EvidenceDigest(observationSet) ||
      observationSet.completionReceiptReferenceId !==
        receipt.completionReceiptReferenceId ||
      observationSet.observationSetId !== receipt.observationSetId ||
      observationSet.revision !== receipt.observationSetRevision ||
      observationSet.identityKey !== receipt.identityKey ||
      observationSet.encounterCycleId !== receipt.encounterCycleId ||
      observationSet.gravityCycleId !== receipt.gravityCycleId ||
      observationSet.gravityObservationReferenceId !==
        receipt.gravityObservationReferenceId ||
      observationSet.contentDigest !== receipt.contentDigest ||
      observationSet.evidenceDigest !== receipt.evidenceDigest) {
    return false;
  }
  const observed = observationSet.items.filter(
    (item) => item.state === "OBSERVED" && item.semanticSelection !== null,
  );
  if (observed.length !== 6) return false;
  const references = observed.map(
    (item) => item.semanticSelection!.semanticSelectionReferenceId,
  );
  const digests = observed.map(
    (item) => item.semanticSelection!.semanticSelectionDigest,
  );
  return observed.every(
    (item, index) =>
      item.dimensionId === XINMAI_SIX_DIMENSION_IDS[index] &&
      item.outcomeReferenceId === receipt.itemOutcomeReferences[index] &&
      references[index] === receipt.semanticSelectionReferences[index] &&
      digests[index] === receipt.semanticSelectionDigests[index],
  ) &&
    receipt.semanticSelectionAggregateDigest ===
      await createSixDimensionSemanticSelectionAggregateDigest(digests);
}

export function validateSixDimensionSetReceiptRecordPair(
  observationSet: CanonicalSixDimensionObservationSetRecord,
  receipt: SixDimensionCompletionReceiptRecord | null,
): boolean {
  if (isCanonicalSixDimensionObservationSet(observationSet)) {
    return receipt === null || isSixDimensionCompletionReceipt(receipt)
      ? validateSixDimensionSetReceiptPair(observationSet, receipt)
      : false;
  }
  if (receipt === null) return observationSet.lifecycle === "OPEN";
  return isSixDimensionCompletionReceiptV2(receipt) &&
    observationSet.observationSetId === receipt.observationSetId &&
    observationSet.dimensionProtocolRevision ===
      receipt.dimensionProtocolRevision;
}
