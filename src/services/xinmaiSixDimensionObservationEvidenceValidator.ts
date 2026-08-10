import {
  XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_SCHEMA_VERSION,
  XINMAI_SIX_DIMENSION_IDS,
  XINMAI_SIX_DIMENSION_OBSERVATION_SCHEMA_VERSION,
  XINMAI_SIX_DIMENSION_PROTOCOL_REVISION,
  type CanonicalSixDimensionObservationItem,
  type CanonicalSixDimensionObservationSet,
  type SixDimensionCommandFenceRecord,
  type SixDimensionCompletionReceipt,
  type SixDimensionId,
} from "../types/xinmaiSixDimensionObservation";

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
const COMMAND_TYPES = new Set([
  "CREATE_OBSERVATION_SET",
  "ACKNOWLEDGE_DIMENSION",
  "SKIP_DIMENSION",
  "DECLINE_DIMENSION",
  "MARK_DIMENSION_UNAVAILABLE",
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
  return (
    actual.length === expected.length &&
    actual.every((key, index) => key === expected[index])
  );
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

const hasObservedShape = (
  value: Record<string, unknown>,
): boolean => {
  if (value.state === "OBSERVED") {
    return (
      hasText(value.outcomeReferenceId) &&
      typeof value.acknowledgement === "string" &&
      ACKNOWLEDGEMENTS.has(value.acknowledgement) &&
      hasText(value.committedByCommandReferenceId) &&
      isIsoTimestamp(value.observedAt) &&
      value.terminalReason === null
    );
  }
  if (value.state === "DECLINED") {
    return (
      value.acknowledgement === null &&
      value.observedAt === null &&
      value.terminalReason === "USER_DECLINED" &&
      hasText(value.outcomeReferenceId) &&
      hasText(value.committedByCommandReferenceId)
    );
  }
  if (value.state === "UNAVAILABLE") {
    return (
      value.acknowledgement === null &&
      value.observedAt === null &&
      value.terminalReason === "SOURCE_UNAVAILABLE"
    );
  }
  return (
    value.acknowledgement === null &&
    value.observedAt === null &&
    value.terminalReason === null
  );
};

export const isCanonicalSixDimensionObservationItem = (
  value: unknown,
): value is CanonicalSixDimensionObservationItem =>
  isRecord(value) &&
  hasExactKeys(value, [
    "dimensionId",
    "ordinal",
    "state",
    "sourceReferenceId",
    "outcomeReferenceId",
    "acknowledgement",
    "itemRevision",
    "committedByCommandReferenceId",
    "presentedAt",
    "observedAt",
    "updatedAt",
    "terminalReason",
  ]) &&
  isDimensionId(value.dimensionId) &&
  Number.isInteger(value.ordinal) &&
  Number(value.ordinal) >= 1 &&
  Number(value.ordinal) <= 6 &&
  typeof value.state === "string" &&
  ITEM_STATES.has(value.state) &&
  hasText(value.sourceReferenceId) &&
  (value.outcomeReferenceId === null || hasText(value.outcomeReferenceId)) &&
  (value.acknowledgement === null ||
    (typeof value.acknowledgement === "string" &&
      ACKNOWLEDGEMENTS.has(value.acknowledgement))) &&
  Number.isInteger(value.itemRevision) &&
  Number(value.itemRevision) >= 0 &&
  (value.committedByCommandReferenceId === null ||
    hasText(value.committedByCommandReferenceId)) &&
  value.presentedAt === null &&
  (value.observedAt === null || isIsoTimestamp(value.observedAt)) &&
  isIsoTimestamp(value.updatedAt) &&
  (value.terminalReason === null ||
    value.terminalReason === "USER_DECLINED" ||
    value.terminalReason === "SOURCE_UNAVAILABLE") &&
  hasObservedShape(value);

const hasCanonicalDimensionOrder = (value: unknown): boolean =>
  Array.isArray(value) &&
  value.length === XINMAI_SIX_DIMENSION_IDS.length &&
  value.every(
    (dimension, index) => dimension === XINMAI_SIX_DIMENSION_IDS[index],
  );

const hasCanonicalItems = (value: unknown): boolean =>
  Array.isArray(value) &&
  value.length === XINMAI_SIX_DIMENSION_IDS.length &&
  value.every(
    (item, index) =>
      isCanonicalSixDimensionObservationItem(item) &&
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

export const isCanonicalSixDimensionObservationSet = (
  value: unknown,
): value is CanonicalSixDimensionObservationSet =>
  isRecord(value) &&
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
    XINMAI_SIX_DIMENSION_OBSERVATION_SCHEMA_VERSION &&
  hasText(value.observationSetId) &&
  hasText(value.canonicalLineageKey) &&
  hasText(value.identityKey) &&
  isIdentityReferences(value.identityReferences) &&
  hasText(value.encounterCycleId) &&
  hasText(value.gravityCycleId) &&
  hasText(value.gravityObservationReferenceId) &&
  isPressureReference(value.pressure) &&
  value.dimensionProtocolRevision ===
    XINMAI_SIX_DIMENSION_PROTOCOL_REVISION &&
  hasCanonicalDimensionOrder(value.dimensionOrder) &&
  hasCanonicalItems(value.items) &&
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

export const isSixDimensionCompletionReceipt = (
  value: unknown,
): value is SixDimensionCompletionReceipt =>
  isRecord(value) &&
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
    "itemOutcomeReferences",
    "contentDigest",
    "evidenceDigest",
    "completedAt",
    "provenance",
  ]) &&
  value.schemaVersion ===
    XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_SCHEMA_VERSION &&
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
    XINMAI_SIX_DIMENSION_PROTOCOL_REVISION &&
  Array.isArray(value.itemOutcomeReferences) &&
  value.itemOutcomeReferences.length === 6 &&
  value.itemOutcomeReferences.every(hasText) &&
  new Set(value.itemOutcomeReferences).size === 6 &&
  hasText(value.contentDigest) &&
  hasText(value.evidenceDigest) &&
  isIsoTimestamp(value.completedAt) &&
  isReceiptProvenance(value.provenance);

export const isSixDimensionCommandFenceRecord = (
  value: unknown,
): value is SixDimensionCommandFenceRecord =>
  isRecord(value) &&
  hasExactKeys(value, [
    "commandReferenceId",
    "observationSetId",
    "commandType",
    "inputDigest",
    "outcomeReferenceId",
    "resultingObservationSetRevision",
    "status",
    "committedAt",
  ]) &&
  hasText(value.commandReferenceId) &&
  hasText(value.observationSetId) &&
  typeof value.commandType === "string" &&
  COMMAND_TYPES.has(value.commandType) &&
  hasText(value.inputDigest) &&
  (value.outcomeReferenceId === null || hasText(value.outcomeReferenceId)) &&
  Number.isInteger(value.resultingObservationSetRevision) &&
  Number(value.resultingObservationSetRevision) >= 1 &&
  value.status === "COMMITTED" &&
  isIsoTimestamp(value.committedAt);

const encodeReferencePart = (value: string): string =>
  encodeURIComponent(value.trim());

export const createSixDimensionIdentityKey = (
  sourceReferenceId: string,
  starBeastIdentityReferenceId: string,
  mansionCoordinateReferenceId: string,
): string =>
  [
    sourceReferenceId,
    starBeastIdentityReferenceId,
    mansionCoordinateReferenceId,
  ]
    .map(encodeReferencePart)
    .join("::");

export const createSixDimensionCanonicalLineageKey = (
  identityKey: string,
  encounterCycleId: string,
  gravityCycleId: string,
  runtimeSeedId: string,
  catalogRevision: string,
): string =>
  [
    identityKey,
    encounterCycleId,
    gravityCycleId,
    runtimeSeedId,
    catalogRevision,
    XINMAI_SIX_DIMENSION_PROTOCOL_REVISION,
  ]
    .map(encodeReferencePart)
    .join("::");

export const createSixDimensionObservationSetId = (
  canonicalLineageKey: string,
): string => `six-dimension-observation-set:${canonicalLineageKey}`;

export const createSixDimensionItemSourceReferenceId = (
  observationSetId: string,
  dimensionId: SixDimensionId,
): string =>
  `six-dimension-source:${encodeReferencePart(observationSetId)}:${dimensionId}:${XINMAI_SIX_DIMENSION_PROTOCOL_REVISION}`;

export const createSixDimensionCommandReferenceId = (
  observationSetId: string,
  dimensionId: SixDimensionId,
  expectedSetRevision: number,
  expectedItemRevision: number,
  action: string,
): string =>
  [
    "six-dimension-command",
    observationSetId,
    dimensionId,
    String(expectedSetRevision),
    String(expectedItemRevision),
    action,
  ]
    .map(encodeReferencePart)
    .join(":");

export const createSixDimensionOutcomeReferenceId = (
  observationSetId: string,
  dimensionId: SixDimensionId,
  itemRevision: number,
  commandReferenceId: string,
): string =>
  [
    "six-dimension-outcome",
    observationSetId,
    dimensionId,
    String(itemRevision),
    commandReferenceId,
  ]
    .map(encodeReferencePart)
    .join(":");

export const createSixDimensionCompletionReceiptReferenceId = (
  observationSetId: string,
  evidenceDigest: string,
): string =>
  `six-dimension-completion:${encodeReferencePart(observationSetId)}:${evidenceDigest}`;

const canonicalSerialize = (value: unknown): string => {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map(canonicalSerialize).join(",")}]`;
  }
  const record = value as Record<string, unknown>;
  return `{${Object.keys(record)
    .sort()
    .map(
      (key) =>
        `${JSON.stringify(key)}:${canonicalSerialize(record[key])}`,
    )
    .join(",")}}`;
};

export const sha256CanonicalValue = async (
  value: unknown,
): Promise<string> => {
  if (
    typeof crypto === "undefined" ||
    !crypto.subtle ||
    typeof TextEncoder === "undefined"
  ) {
    throw new Error("SIX_DIMENSION_DIGEST_UNAVAILABLE");
  }
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(canonicalSerialize(value)),
  );
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

export const createSixDimensionContentDigest = async (
  observationSet: CanonicalSixDimensionObservationSet,
): Promise<string> =>
  sha256CanonicalValue({
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
    dimensionProtocolRevision:
      observationSet.dimensionProtocolRevision,
    dimensionOrder: observationSet.dimensionOrder,
    itemSources: observationSet.items.map((item) => ({
      dimensionId: item.dimensionId,
      ordinal: item.ordinal,
      sourceReferenceId: item.sourceReferenceId,
    })),
  });

export const createSixDimensionEvidenceDigest = async (
  observationSet: CanonicalSixDimensionObservationSet,
): Promise<string> =>
  sha256CanonicalValue({
    contentDigest: observationSet.contentDigest,
    items: observationSet.items.map((item) => ({
      dimensionId: item.dimensionId,
      state: item.state,
      itemRevision: item.itemRevision,
      outcomeReferenceId: item.outcomeReferenceId,
      acknowledgement: item.acknowledgement,
    })),
  });

export const validateSixDimensionSetReceiptPair = (
  observationSet: CanonicalSixDimensionObservationSet,
  receipt: SixDimensionCompletionReceipt | null,
): boolean => {
  if (observationSet.lifecycle === "OPEN") {
    return receipt === null;
  }
  if (
    receipt === null ||
    observationSet.completionReceiptReferenceId !==
      receipt.completionReceiptReferenceId ||
    observationSet.observationSetId !== receipt.observationSetId ||
    observationSet.identityKey !== receipt.identityKey ||
    observationSet.encounterCycleId !== receipt.encounterCycleId ||
    observationSet.gravityCycleId !== receipt.gravityCycleId ||
    observationSet.gravityObservationReferenceId !==
      receipt.gravityObservationReferenceId ||
    observationSet.dimensionProtocolRevision !==
      receipt.dimensionProtocolRevision ||
    observationSet.contentDigest !== receipt.contentDigest ||
    observationSet.evidenceDigest !== receipt.evidenceDigest ||
    observationSet.pressure.runtimeSeedId !==
      receipt.pressure.runtimeSeedId ||
    observationSet.pressure.candidateReferenceId !==
      receipt.pressure.candidateReferenceId ||
    observationSet.pressure.catalogRevision !==
      receipt.pressure.catalogRevision
  ) {
    return false;
  }
  const observedItems = observationSet.items.filter(
    (item) => item.state === "OBSERVED",
  );
  return (
    observedItems.length === 6 &&
    observedItems.every(
      (item, index) =>
        item.dimensionId === XINMAI_SIX_DIMENSION_IDS[index] &&
        item.outcomeReferenceId ===
          receipt.itemOutcomeReferences[index],
    )
  );
};
