import {
  XINMAI_LIVED_GROWTH_RECOVERY_SCHEMA_VERSION,
  XINMAI_LIVED_GROWTH_RECOVERY_V1_SCHEMA_VERSION,
  type XinmaiLivedGrowthEnvelope,
  type XinmaiLivedGrowthEnvelopeV1,
} from "../types/xinmaiLivedGrowthRecovery";
import {
  XINMAI_CHOICE_DEPARTURE_RECEIPT_SCHEMA_VERSION,
  XINMAI_CHOICE_RETURN_RECEIPT_SCHEMA_VERSION,
  XINMAI_CHOICE_RETURNING_REALITY_PROOF_SCHEMA_VERSION,
} from "../types/xinmaiChoiceReturningProvenance";

export const XINMAI_LIVED_GROWTH_RECOVERY_STORAGE_KEY =
  "xinmai:lived-growth-authority:v1";

export type XinmaiLivedGrowthRecoveryReadResult =
  | Readonly<{
      status: "FOUND";
      envelope: XinmaiLivedGrowthEnvelopeV1;
      raw: string;
    }>
  | Readonly<{
      status: "NOT_FOUND" | "UNAVAILABLE" | "CORRUPTED";
      envelope: null;
      raw: string | null;
    }>;

const canUseStorage = (): boolean => {
  try {
    return typeof window !== "undefined" && Boolean(window.localStorage);
  } catch {
    return false;
  }
};

export const createEmptyXinmaiLivedGrowthEnvelope =
  (): XinmaiLivedGrowthEnvelope =>
    Object.freeze({
      schemaVersion: XINMAI_LIVED_GROWTH_RECOVERY_SCHEMA_VERSION,
      source: "xinmai_lived_growth_recovery_adapter" as const,
      revision: 0,
      updatedAt: new Date(0).toISOString(),
      choiceActionIntentions: Object.freeze([]),
      livedResponseFacts: Object.freeze([]),
      crystalEligibilities: Object.freeze([]),
      formationReceipts: Object.freeze([]),
      choiceExplicitDepartureReceipts: Object.freeze([]),
      choiceExplicitReturnReceipts: Object.freeze([]),
      noBackfill: true as const,
    });

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const validText = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const validTimestamp = (value: unknown): value is string =>
  typeof value === "string" && Number.isFinite(Date.parse(value));

const isIdentity = (value: unknown): boolean =>
  isRecord(value) &&
  validText(value.sourceReferenceId) &&
  validText(value.starBeastIdentityReferenceId) &&
  validText(value.mansionCoordinateReferenceId);

const isRealityProof = (value: unknown): boolean =>
  isRecord(value) &&
  value.schemaVersion ===
    XINMAI_CHOICE_RETURNING_REALITY_PROOF_SCHEMA_VERSION &&
  value.source === "xinmai_choice_returning_reality_proof_adapter" &&
  validText(value.realityIntentReferenceId) &&
  validText(value.returnIntentRequestReferenceId) &&
  validText(value.departureReceiptReferenceId) &&
  validText(value.sourceEncounterCycleId) &&
  validText(value.targetEncounterCycleId) &&
  Number.isInteger(value.returnAttemptRevision) &&
  Number(value.returnAttemptRevision) > 0 &&
  validText(value.choiceActionIntentionReferenceId) &&
  isIdentity(value.identityReferences) &&
  Number.isInteger(value.canonicalRevision) &&
  Number(value.canonicalRevision) > 0 &&
  Number.isInteger(value.fencingToken) &&
  Number(value.fencingToken) > 0 &&
  Number.isInteger(value.realityIntentRevision) &&
  Number(value.realityIntentRevision) > 0 &&
  validTimestamp(value.observedAt) &&
  isRecord(value.provenance) &&
  value.provenance.origin === "CHOICE_RETURN" &&
  value.provenance.qualification === "EXPLICIT_RETURN_TO_CHOICE" &&
  value.provenance.routeTarget === "/reality" &&
  value.provenance.readOnly === true &&
  value.provenance.noGrowthAuthority === true;

const isDepartureReceipt = (value: unknown): boolean =>
  isRecord(value) &&
  value.schemaVersion ===
    XINMAI_CHOICE_DEPARTURE_RECEIPT_SCHEMA_VERSION &&
  value.source === "xinmai_choice_returning_provenance_controller" &&
  validText(value.departureReceiptReferenceId) &&
  validText(value.choiceActionIntentionReferenceId) &&
  isIdentity(value.identityReferences) &&
  validText(value.actionRouteReferenceId) &&
  Number.isInteger(value.actionRoutePrototypeVersion) &&
  Number(value.actionRoutePrototypeVersion) > 0 &&
  validText(value.gravityObservationReferenceId) &&
  validText(value.sourceEncounterCycleId) &&
  Number.isInteger(value.choiceRevisionAtDeparture) &&
  Number(value.choiceRevisionAtDeparture) > 0 &&
  Number.isInteger(value.revision) &&
  Number(value.revision) > 0 &&
  (value.state === "DORMANT_DEPARTURE" ||
    value.state === "RETURN_IN_PROGRESS" ||
    value.state === "RETURNED" ||
    value.state === "INVALIDATED") &&
  validTimestamp(value.departedAt) &&
  validTimestamp(value.updatedAt) &&
  isRecord(value.provenance) &&
  value.provenance.userExplicitDeparture === true &&
  value.provenance.growthTransactionConfirmed === true &&
  value.provenance.noTargetEncounterYet === true &&
  value.provenance.noActionCompletionClaim === true &&
  value.provenance.noLivedResponseAuthority === true &&
  value.provenance.noCrystalAuthority === true;

const isReturnReceipt = (value: unknown): boolean =>
  isRecord(value) &&
  value.schemaVersion === XINMAI_CHOICE_RETURN_RECEIPT_SCHEMA_VERSION &&
  value.source === "xinmai_choice_returning_provenance_controller" &&
  validText(value.returnReceiptReferenceId) &&
  validText(value.returnIntentRequestReferenceId) &&
  validText(value.departureReceiptReferenceId) &&
  validText(value.choiceActionIntentionReferenceId) &&
  isIdentity(value.identityReferences) &&
  validText(value.actionRouteReferenceId) &&
  validText(value.gravityObservationReferenceId) &&
  validText(value.sourceEncounterCycleId) &&
  validText(value.targetEncounterCycleId) &&
  Number.isInteger(value.returnAttemptRevision) &&
  Number(value.returnAttemptRevision) > 0 &&
  Number.isInteger(value.revision) &&
  Number(value.revision) > 0 &&
  (value.state === "READY_FOR_LIVED_RESPONSE" ||
    value.state === "CONSUMED_BY_FACT" ||
    value.state === "RESOLVED_WITHOUT_FACT" ||
    value.state === "INVALIDATED") &&
  (value.consumedLivedResponseReferenceId === null ||
    validText(value.consumedLivedResponseReferenceId)) &&
  (value.noFactReason === null ||
    value.noFactReason === "NOT_ATTEMPTED" ||
    value.noFactReason === "USER_REJECTED_RECORD") &&
  isRealityProof(value.realityProof) &&
  validTimestamp(value.returnedAt) &&
  validTimestamp(value.updatedAt) &&
  isRecord(value.provenance) &&
  value.provenance.userExplicitReturn === true &&
  value.provenance.realityIntentCommittedBeforeReceipt === true &&
  value.provenance.noRealityActivationClaim === true &&
  value.provenance.noActionCompletionClaim === true &&
  value.provenance.noLivedResponseAuthority === true &&
  value.provenance.noCrystalAuthority === true;

const hasBaseEnvelopeShape = (value: unknown): boolean =>
  isRecord(value) &&
  value.source === "xinmai_lived_growth_recovery_adapter" &&
  value.noBackfill === true &&
  Number.isInteger(value.revision) &&
  Number(value.revision) >= 0 &&
  validTimestamp(value.updatedAt) &&
  Array.isArray(value.choiceActionIntentions) &&
  Array.isArray(value.livedResponseFacts) &&
  Array.isArray(value.crystalEligibilities) &&
  Array.isArray(value.formationReceipts);

export const isXinmaiLivedGrowthLegacyEnvelopeV1 = (
  value: unknown,
): value is XinmaiLivedGrowthEnvelopeV1 =>
  hasBaseEnvelopeShape(value) &&
  (value as XinmaiLivedGrowthEnvelopeV1).schemaVersion ===
    XINMAI_LIVED_GROWTH_RECOVERY_V1_SCHEMA_VERSION;

export const upgradeXinmaiLivedGrowthEnvelopeV1 = (
  envelope: XinmaiLivedGrowthEnvelopeV1,
): XinmaiLivedGrowthEnvelope =>
  Object.freeze({
    ...envelope,
    schemaVersion: XINMAI_LIVED_GROWTH_RECOVERY_SCHEMA_VERSION,
    choiceExplicitDepartureReceipts: Object.freeze([]),
    choiceExplicitReturnReceipts: Object.freeze([]),
  });

export const isXinmaiLivedGrowthEnvelope = (
  value: unknown,
): value is XinmaiLivedGrowthEnvelope => {
  if (!hasBaseEnvelopeShape(value)) return false;
  const candidate = value as Partial<XinmaiLivedGrowthEnvelope>;
  return (
    candidate.schemaVersion ===
      XINMAI_LIVED_GROWTH_RECOVERY_SCHEMA_VERSION &&
    Array.isArray(candidate.choiceExplicitDepartureReceipts) &&
    candidate.choiceExplicitDepartureReceipts.every(isDepartureReceipt) &&
    Array.isArray(candidate.choiceExplicitReturnReceipts) &&
    candidate.choiceExplicitReturnReceipts.every(isReturnReceipt)
  );
};

export function readXinmaiLivedGrowthRecoveryCandidate():
  XinmaiLivedGrowthRecoveryReadResult {
  if (!canUseStorage()) {
    return Object.freeze({
      status: "UNAVAILABLE" as const,
      envelope: null,
      raw: null,
    });
  }
  try {
    const raw = window.localStorage.getItem(
      XINMAI_LIVED_GROWTH_RECOVERY_STORAGE_KEY,
    );
    if (raw === null) {
      return Object.freeze({
        status: "NOT_FOUND" as const,
        envelope: null,
        raw: null,
      });
    }
    const parsed = JSON.parse(raw) as unknown;
    return isXinmaiLivedGrowthLegacyEnvelopeV1(parsed)
      ? Object.freeze({ status: "FOUND" as const, envelope: parsed, raw })
      : Object.freeze({
          status: "CORRUPTED" as const,
          envelope: null,
          raw,
        });
  } catch {
    return Object.freeze({
      status: "CORRUPTED" as const,
      envelope: null,
      raw: null,
    });
  }
}

export const isXinmaiLivedGrowthLegacyStorageEvent = (
  event: StorageEvent,
): boolean => {
  try {
    return (
      typeof window !== "undefined" &&
      event.storageArea === window.localStorage &&
      event.key === XINMAI_LIVED_GROWTH_RECOVERY_STORAGE_KEY
    );
  } catch {
    return false;
  }
};

export const XinmaiLivedGrowthRecoveryAdapter = Object.freeze({
  storageKey: XINMAI_LIVED_GROWTH_RECOVERY_STORAGE_KEY,
  read: readXinmaiLivedGrowthRecoveryCandidate,
  observesLegacyMutation: isXinmaiLivedGrowthLegacyStorageEvent,
  authority: "LEGACY_READ_ONLY_SOURCE" as const,
  noBackfill: true as const,
});
