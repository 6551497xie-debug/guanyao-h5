import type {
  RealityAdventureContinuityMutationDecision,
  RealityPressureRecognitionCommand,
  RealityPressureRecognitionOutcome,
  RealityPressureRecognitionReceipt,
} from "../types/xinmaiRealityAdventureContinuity";
import {
  advanceRealityProductionPressureSeedConsumer,
} from "./realityProductionPressureSeedConsumer";
import {
  transactRealityAdventureContinuity,
} from "./xinmaiRealityAdventureContinuityTransactionalStore";
import {
  publishRealityAdventureContinuityRevision,
} from "./xinmaiRealityAdventureContinuityRevisionObserver";

type RecognitionTransactionValue =
  | Readonly<{
      status: "RECOGNIZED" | "ALREADY_RECOGNIZED";
      receipt: RealityPressureRecognitionReceipt;
      reason: null;
    }>
  | Readonly<{
      status: "STALE" | "BLOCKED";
      receipt: RealityPressureRecognitionReceipt | null;
      reason: Exclude<
        Extract<
          RealityPressureRecognitionOutcome,
          { status: "STALE" | "BLOCKED" | "SAFE_WITHHELD" }
        >["reason"],
        "TRANSACTION_STORAGE_UNAVAILABLE"
          | "TRANSACTION_OPEN_BLOCKED"
          | "TRANSACTION_ABORTED"
          | "TRANSACTION_CONNECTION_CLOSED"
          | "WRITE_UNCONFIRMED"
          | "RECOVERY_CORRUPTED"
          | "LEGACY_WRITER_DETECTED"
          | "LEGACY_SOURCE_CORRUPTED"
          | "UNIQUE_CONSTRAINT_REJECTED"
      >;
    }>;

const identityMatches = (
  left: RealityPressureRecognitionCommand["identityReferences"],
  right: RealityPressureRecognitionCommand["identityReferences"],
): boolean =>
  left.sourceReferenceId === right.sourceReferenceId &&
  left.starBeastIdentityReferenceId ===
    right.starBeastIdentityReferenceId &&
  left.mansionCoordinateReferenceId ===
    right.mansionCoordinateReferenceId;

const deterministicDigest = (value: string): string => {
  let hash = 0x811c9dc5;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
};

const rejected = (
  status: "STALE" | "BLOCKED",
  reason: Extract<
    RecognitionTransactionValue,
    { status: "STALE" | "BLOCKED" }
  >["reason"],
  receipt: RealityPressureRecognitionReceipt | null = null,
): RealityAdventureContinuityMutationDecision<RecognitionTransactionValue> =>
  Object.freeze({
    status: "REJECTED" as const,
    record: null,
    value: Object.freeze({ status, receipt, reason }),
  });

export async function recognizeRealityPressureCandidate(
  command: RealityPressureRecognitionCommand,
): Promise<RealityPressureRecognitionOutcome> {
  const candidate = command.candidateSourceContext.candidateRecords
    .find(
      (entry) =>
        entry.candidateReferenceId === command.candidateReferenceId,
    );
  if (
    !candidate ||
    candidate.candidateRevisionReferenceId !==
      command.candidateRevisionReferenceId ||
    command.candidateSourceContext.bundleReferenceId !==
      command.candidateBundleReferenceId ||
    command.candidateSourceContext.bundleRevisionReferenceId !==
      command.candidateBundleRevisionReferenceId ||
    command.candidateSourceContext.catalogRevision !==
      command.catalogRevision
  ) {
    return Object.freeze({
      status: "BLOCKED" as const,
      receipt: null,
      consumerResult: null,
      canonicalRevision: null,
      reason: "CANDIDATE_REVISION_MISMATCH" as const,
    });
  }

  const consumerResult =
    advanceRealityProductionPressureSeedConsumer({
      session: command.pressureSession,
      candidateSourceContext: command.candidateSourceContext,
      command: Object.freeze({
        event: "PRESSURE_SEED_RECOGNIZE" as const,
        sourceReferenceId:
          command.identityReferences.sourceReferenceId,
        candidateBundleReferenceId:
          command.candidateBundleReferenceId,
        recognizedCandidateReferenceId:
          command.candidateReferenceId,
        recognizedCandidateRevisionReferenceId:
          command.candidateRevisionReferenceId,
      }),
    });
  if (
    consumerResult.status !== "READY" ||
    consumerResult.session.captureState !== "SEED_RECOGNIZED" ||
    consumerResult.session.captureProvenance === null
  ) {
    return Object.freeze({
      status: "BLOCKED" as const,
      receipt: null,
      consumerResult: null,
      canonicalRevision: null,
      reason: "PRESSURE_CAPTURE_REJECTED" as const,
    });
  }

  const transaction =
    await transactRealityAdventureContinuity<RecognitionTransactionValue>({
      lookup: Object.freeze({
        kind: "ENCOUNTER" as const,
        value: command.encounterCycleId,
      }),
      mutate: (record) => {
        if (record === null) {
          return rejected("BLOCKED", "INTENT_NOT_ACTIVE");
        }
        if (
          !identityMatches(
            record.identityReferences,
            command.identityReferences,
          )
        ) {
          return rejected("BLOCKED", "IDENTITY_MISMATCH");
        }
        if (
          record.realityIntent.state !== "ACTIVE_IN_REALITY" ||
          (record.lifecycle !== "REALITY_ACTIVE" &&
            record.lifecycle !== "PRESSURE_RECOGNIZED")
        ) {
          return rejected("BLOCKED", "INTENT_NOT_ACTIVE");
        }
        if (Date.parse(record.expiresAt) <= Date.now()) {
          return rejected("BLOCKED", "INTENT_EXPIRED");
        }
        if (
          record.gravityTransfer !== null ||
          record.gravityAdmission !== null
        ) {
          return rejected(
            "BLOCKED",
            "GRAVITY_ALREADY_ADMITTED",
            record.recognitionReceipt,
          );
        }
        if (record.recognitionReceipt !== null) {
          const receipt = record.recognitionReceipt;
          if (
            receipt.fact.candidateRevision.candidateReferenceId ===
              command.candidateReferenceId &&
            receipt.fact.candidateRevision
              .candidateRevisionReferenceId ===
              command.candidateRevisionReferenceId
          ) {
            return Object.freeze({
              status: "UNCHANGED" as const,
              record,
              value: Object.freeze({
                status: "ALREADY_RECOGNIZED" as const,
                receipt,
                reason: null,
              }),
            });
          }
          return rejected(
            "STALE",
            "CANDIDATE_NOT_IN_CURRENT_BUNDLE",
            receipt,
          );
        }
        if (
          record.canonicalRevision !==
          command.expectedCanonicalRevision
        ) {
          return rejected(
            "STALE",
            "CANONICAL_REVISION_MISMATCH",
          );
        }

        const recognizedAt = new Date().toISOString();
        const candidateRevision = Object.freeze({
          catalogRevision: command.catalogRevision,
          candidateSourceSchemaVersion:
            "GUANYAO_REALITY_PRESSURE_CANDIDATE_SOURCE_CONTEXT_V1" as const,
          candidateBundleSchemaVersion:
            "GUANYAO_REALITY_PRESSURE_CANDIDATE_BUNDLE_V1" as const,
          sourceReferenceId:
            command.identityReferences.sourceReferenceId,
          candidateBundleReferenceId:
            command.candidateBundleReferenceId,
          candidateBundleRevisionReferenceId:
            command.candidateBundleRevisionReferenceId,
          candidateReferenceId: command.candidateReferenceId,
          candidateRevisionReferenceId:
            command.candidateRevisionReferenceId,
        });
        const fact = Object.freeze({
          schemaVersion:
            "XINMAI_REALITY_PRESSURE_RECOGNITION_FACT_V1" as const,
          source:
            "xinmai_reality_pressure_recognition_controller" as const,
          identityReferences: Object.freeze({
            ...command.identityReferences,
          }),
          realityIntentReferenceId:
            record.realityIntent.intentReferenceId,
          encounterCycleId: record.encounterCycleId,
          realityActiveRevision: record.realityIntent.revision,
          candidateRevision,
          pressureProvenance:
            consumerResult.session.captureProvenance!,
          userRecognitionAction:
            "EXPLICIT_CANDIDATE_RECOGNITION" as const,
          recognizedAt,
        });
        const receipt = Object.freeze({
          schemaVersion:
            "XINMAI_REALITY_PRESSURE_RECOGNITION_RECEIPT_V1" as const,
          source:
            "xinmai_reality_pressure_recognition_controller" as const,
          recognitionReceiptReferenceId:
            `pressure-recognition-receipt:${deterministicDigest(
              JSON.stringify([
                record.encounterCycleId,
                command.candidateReferenceId,
                command.candidateRevisionReferenceId,
              ]),
            )}`,
          revision: 1,
          lifecycle: "RECOGNIZED" as const,
          fact,
          issuedAt: recognizedAt,
          updatedAt: recognizedAt,
          expiresAt: record.expiresAt,
          consumedGravityTransferReferenceId: null,
          consumedGravityAdmissionReferenceId: null,
          terminalReason: null,
          provenance: Object.freeze({
            explicitUserRecognitionRequired: true as const,
            recoveryWriteConfirmed: true as const,
            noAutomaticSelection: true as const,
            noDomAuthority: true as const,
            noRendererAuthority: true as const,
            noGrowthAuthority: true as const,
          }),
        });
        const nextRecord = Object.freeze({
          ...record,
          canonicalRevision: record.canonicalRevision + 1,
          fencingToken: record.fencingToken + 1,
          candidateRevision,
          recognitionReceipt: receipt,
          lifecycle: "PRESSURE_RECOGNIZED" as const,
          updatedAt: recognizedAt,
        });
        return Object.freeze({
          status: "COMMIT" as const,
          record: nextRecord,
          value: Object.freeze({
            status: "RECOGNIZED" as const,
            receipt,
            reason: null,
          }),
        });
      },
    });

  if (transaction.status === "SAFE_WITHHELD") {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      receipt: null,
      consumerResult: null,
      canonicalRevision: null,
      reason: transaction.reason,
    });
  }
  if (
    transaction.value.status === "STALE" ||
    transaction.value.status === "BLOCKED"
  ) {
    return Object.freeze({
      status: transaction.value.status,
      receipt: transaction.value.receipt,
      consumerResult: null,
      canonicalRevision:
        transaction.record?.canonicalRevision ?? null,
      reason: transaction.value.reason,
    });
  }
  const committedRecord = transaction.record;
  if (
    transaction.value.receipt === null ||
    committedRecord === null
  ) {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      receipt: null,
      consumerResult: null,
      canonicalRevision: null,
      reason: "WRITE_UNCONFIRMED" as const,
    });
  }
  publishRealityAdventureContinuityRevision({
    encounterCycleId: committedRecord.encounterCycleId,
    canonicalRevision: committedRecord.canonicalRevision,
    fencingToken: committedRecord.fencingToken,
  });
  return Object.freeze({
    status: transaction.value.status,
    receipt: transaction.value.receipt,
    consumerResult,
    canonicalRevision: committedRecord.canonicalRevision,
    reason: null,
  });
}

export const REALITY_PRESSURE_RECOGNITION_CONTROLLER_BOUNDARY =
  Object.freeze({
    explicitUserRecognitionOnly: true as const,
    candidateRevisionProofRequired: true as const,
    canonicalTransactionRequired: true as const,
    transactionCompleteSuccessOnly: true as const,
    atMostOneCurrentReceipt: true as const,
    noHostLocalAuthority: true as const,
    noSessionStorageAuthority: true as const,
    noDomAuthority: true as const,
    noRendererAuthority: true as const,
    noGrowthAuthority: true as const,
  });
