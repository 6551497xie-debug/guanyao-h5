import {
  XINMAI_SIX_DIMENSION_PROTOCOL_REVISION,
  type CanonicalSixDimensionObservationSet,
  type SixDimensionFailureCause,
  type SixDimensionObservationReadExpectation,
  type SixDimensionObservationRecoveryResult,
} from "../types/xinmaiSixDimensionObservation";
import { readXinmaiSixDimensionAuthoritySnapshot } from "./xinmaiLivedGrowthTransactionalStore";

export const XINMAI_SIX_DIMENSION_RECOVERY_BOUNDARY = Object.freeze({
  canonicalReader:
    "XINMAI_LIVED_GROWTH_TRANSACTIONAL_STORE_V3" as const,
  mutationAllowed: false as const,
  noBackfill: true as const,
  noInferredCompletion: true as const,
  noCurrentRevisionReinterpretation: true as const,
  noRendererStorageRead: true as const,
});

const authorityCause = (
  code: SixDimensionFailureCause["code"],
): SixDimensionFailureCause =>
  Object.freeze({
    owner: "SIX_DIMENSION_AUTHORITY" as const,
    code,
    retryability: "NOT_RETRYABLE" as const,
    innerCause: null,
  });

const expectationMismatch = (
  record: CanonicalSixDimensionObservationSet,
  expected: SixDimensionObservationReadExpectation,
): SixDimensionFailureCause["code"] | null => {
  if (
    expected.dimensionProtocolRevision !== undefined &&
    expected.dimensionProtocolRevision !==
      XINMAI_SIX_DIMENSION_PROTOCOL_REVISION
  ) {
    return "DIMENSION_PROTOCOL_REVISION_UNKNOWN";
  }
  if (
    (expected.identityKey !== undefined &&
      record.identityKey !== expected.identityKey) ||
    (expected.encounterCycleId !== undefined &&
      record.encounterCycleId !== expected.encounterCycleId) ||
    (expected.gravityCycleId !== undefined &&
      record.gravityCycleId !== expected.gravityCycleId) ||
    (expected.gravityObservationReferenceId !== undefined &&
      record.gravityObservationReferenceId !==
        expected.gravityObservationReferenceId)
  ) {
    return "ENCOUNTER_MISMATCH";
  }
  if (
    (expected.runtimeSeedId !== undefined &&
      record.pressure.runtimeSeedId !== expected.runtimeSeedId) ||
    (expected.candidateReferenceId !== undefined &&
      record.pressure.candidateReferenceId !==
        expected.candidateReferenceId)
  ) {
    return "PRESSURE_PROVENANCE_MISMATCH";
  }
  if (
    expected.catalogRevision !== undefined &&
    record.pressure.catalogRevision !== expected.catalogRevision
  ) {
    return "CATALOG_REVISION_MISMATCH";
  }
  if (
    expected.contentDigest !== undefined &&
    record.contentDigest !== expected.contentDigest
  ) {
    return "SOURCE_REFERENCE_MISMATCH";
  }
  if (
    expected.evidenceDigest !== undefined &&
    record.evidenceDigest !== expected.evidenceDigest
  ) {
    return "EVIDENCE_DIGEST_MISMATCH";
  }
  return null;
};

export async function recoverXinmaiSixDimensionObservation(
  expected: SixDimensionObservationReadExpectation,
): Promise<SixDimensionObservationRecoveryResult> {
  if (expected.observationSetId.trim().length === 0) {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      observationSet: null,
      completionReceipt: null,
      cause: authorityCause("INVALID_COMMAND"),
    });
  }
  const read = await readXinmaiSixDimensionAuthoritySnapshot();
  if (read.status !== "FOUND") {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      observationSet: null,
      completionReceipt: null,
      cause: read.cause,
    });
  }
  const observationSet =
    read.snapshot.observationSets.find(
      (candidate) =>
        candidate.observationSetId === expected.observationSetId,
    ) ?? null;
  if (observationSet === null) {
    return Object.freeze({
      status: "NOT_FOUND" as const,
      observationSet: null,
      completionReceipt: null,
      cause: authorityCause("OBSERVATION_SET_NOT_FOUND"),
    });
  }
  const mismatch = expectationMismatch(observationSet, expected);
  if (mismatch !== null) {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      observationSet: null,
      completionReceipt: null,
      cause: authorityCause(mismatch),
    });
  }
  const completionReceipt =
    read.snapshot.completionReceipts.find(
      (candidate) =>
        candidate.observationSetId === observationSet.observationSetId,
    ) ?? null;
  if (
    observationSet.lifecycle !== "OPEN" &&
    completionReceipt === null
  ) {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      observationSet: null,
      completionReceipt: null,
      cause: authorityCause("COMPLETION_RECEIPT_MISSING"),
    });
  }
  return Object.freeze({
    status: "FOUND" as const,
    observationSet,
    completionReceipt,
    cause: null,
  });
}
