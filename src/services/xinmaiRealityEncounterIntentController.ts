import type {
  RealityAdventureContinuityFailureReason,
  RealityAdventureContinuityMutationDecision,
  RealityAdventureEncounterContinuityRecord,
} from "../types/xinmaiRealityAdventureContinuity";
import type {
  RealityEncounterAdmission,
  RealityEncounterAdmissionRollbackResult,
  RealityEncounterAdmissionResult,
  RealityEncounterCommitResult,
  RealityEncounterFailure,
  RealityEncounterFailureReason,
  RealityEncounterFailureResult,
  RealityEncounterFailureStage,
  RealityEncounterIdentityReferences,
  RealityEncounterIntent,
  RealityEncounterQualification,
  RealityEncounterRequestInput,
  RealityEncounterRequestResult,
  RealityEncounterTerminationCommand,
  RealityEncounterTerminationResult,
  RealityHostAcceptanceOutcome,
} from "../types/xinmaiRealityEncounterIntent";
import {
  XINMAI_REALITY_ENCOUNTER_INTENT_SCHEMA_VERSION,
} from "../types/xinmaiRealityEncounterIntent";
import {
  readRealityAdventureContinuity,
  transactRealityAdventureContinuity,
} from "./xinmaiRealityAdventureContinuityTransactionalStore";
import {
  publishRealityAdventureContinuityRevision,
} from "./xinmaiRealityAdventureContinuityRevisionObserver";
import { isRealitySurfaceAdmissionTransactionValid } from "./xinmaiRealitySurfaceAdmissionTransaction";

const INTENT_TTL_MS = 2 * 60 * 60 * 1_000;
let currentIntent: RealityEncounterIntent | null = null;

const opaqueId = (): string =>
  typeof crypto !== "undefined" &&
  typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;

const normalizeIdentityReferences = (
  identity: RealityEncounterIdentityReferences,
): RealityEncounterIdentityReferences | null => {
  const sourceReferenceId = identity.sourceReferenceId.trim();
  const starBeastIdentityReferenceId =
    identity.starBeastIdentityReferenceId.trim();
  const mansionCoordinateReferenceId =
    identity.mansionCoordinateReferenceId.trim();
  if (
    !sourceReferenceId ||
    !starBeastIdentityReferenceId ||
    !mansionCoordinateReferenceId
  ) {
    return null;
  }
  return Object.freeze({
    sourceReferenceId,
    starBeastIdentityReferenceId,
    mansionCoordinateReferenceId,
  });
};

const identityMatches = (
  intent: RealityEncounterIntent,
  identity: RealityEncounterIdentityReferences,
): boolean =>
  intent.sourceReferenceId === identity.sourceReferenceId &&
  intent.starBeastIdentityReferenceId ===
    identity.starBeastIdentityReferenceId &&
  intent.mansionCoordinateReferenceId ===
    identity.mansionCoordinateReferenceId;

const qualificationMatchesOrigin = (
  origin: RealityEncounterRequestInput["origin"],
  qualification: RealityEncounterQualification,
): boolean =>
  origin === "CHOICE_RETURN"
    ? qualification === "EXPLICIT_RETURN_TO_CHOICE"
    : origin === "CHOICE_CONTINUATION"
      ? false
    : qualification === "WHISPER_RESPONSE_SETTLED" ||
      qualification === "WHISPER_SKIPPED" ||
      qualification ===
        "RESPONSE_UNAVAILABLE_EXPLICITLY_CONTINUED";

const isExpired = (intent: RealityEncounterIntent): boolean => {
  const issuedAt = Date.parse(intent.issuedAt);
  const expiresAt = Date.parse(intent.expiresAt);
  return (
    !Number.isFinite(issuedAt) ||
    !Number.isFinite(expiresAt) ||
    expiresAt <= issuedAt ||
    Math.min(expiresAt, issuedAt + INTENT_TTL_MS) <= Date.now()
  );
};

const nextIntent = (
  intent: RealityEncounterIntent,
  patch: Partial<
    Pick<
      RealityEncounterIntent,
      "state" | "failure" | "terminalReason"
    >
  >,
): RealityEncounterIntent =>
  Object.freeze({
    ...intent,
    ...patch,
    updatedAt: new Date().toISOString(),
    revision: intent.revision + 1,
  });

const createAdmission = (
  intent: RealityEncounterIntent,
): RealityEncounterAdmission =>
  Object.freeze({
    schemaVersion: "XINMAI_REALITY_ENCOUNTER_ADMISSION_V1" as const,
    source: "xinmai_reality_encounter_intent_controller" as const,
    intentReferenceId: intent.intentReferenceId,
    encounterCycleId: intent.encounterCycleId,
    intentRevision: intent.revision,
    state: "ACCEPTING_REALITY" as const,
    routeTarget: "/reality" as const,
    origin: intent.origin,
    qualification: intent.qualification,
    choiceActionIntentionReferenceId:
      intent.choiceActionIntentionReferenceId,
    departureReceiptReferenceId:
      intent.departureReceiptReferenceId,
    returnIntentRequestReferenceId:
      intent.returnIntentRequestReferenceId,
    returnAttemptRevision: intent.returnAttemptRevision,
    sourceEncounterCycleId: intent.sourceEncounterCycleId,
    identityReferences: Object.freeze({
      sourceReferenceId: intent.sourceReferenceId,
      starBeastIdentityReferenceId:
        intent.starBeastIdentityReferenceId,
      mansionCoordinateReferenceId:
        intent.mansionCoordinateReferenceId,
    }),
    expiresAt: intent.expiresAt,
  });

const createContinuityRecord = (
  intent: RealityEncounterIntent,
): RealityAdventureEncounterContinuityRecord =>
  Object.freeze({
    schemaVersion:
      "XINMAI_REALITY_ADVENTURE_ENCOUNTER_CONTINUITY_V1" as const,
    encounterCycleId: intent.encounterCycleId,
    canonicalRevision: 1,
    fencingToken: 1,
    activeIdentityKey: [
      intent.sourceReferenceId,
      intent.starBeastIdentityReferenceId,
      intent.mansionCoordinateReferenceId,
    ].join("::"),
    identityReferences: Object.freeze({
      sourceReferenceId: intent.sourceReferenceId,
      starBeastIdentityReferenceId:
        intent.starBeastIdentityReferenceId,
      mansionCoordinateReferenceId:
        intent.mansionCoordinateReferenceId,
    }),
    realityIntent: intent,
    candidateRevision: null,
    recognitionReceipt: null,
    gravityTransfer: null,
    gravityAdmission: null,
    lifecycle:
      intent.state === "ACTIVE_IN_REALITY"
        ? "REALITY_ACTIVE" as const
        : "REALITY_PENDING" as const,
    issuedAt: intent.issuedAt,
    updatedAt: intent.updatedAt,
    expiresAt: intent.expiresAt,
    terminalReason: intent.terminalReason,
    provenance: Object.freeze({
      explicitUserIntentRequired: true as const,
      explicitUserRecognitionRequired: true as const,
      explicitBodyApproachRequired: true as const,
      noBackfill: true as const,
      noDomAuthority: true as const,
      noRendererAuthority: true as const,
      noGrowthAuthority: true as const,
    }),
  });

const updateRecordIntent = (
  record: RealityAdventureEncounterContinuityRecord,
  intent: RealityEncounterIntent,
  lifecycle: RealityAdventureEncounterContinuityRecord["lifecycle"] =
    record.lifecycle,
): RealityAdventureEncounterContinuityRecord =>
  Object.freeze({
    ...record,
    canonicalRevision: record.canonicalRevision + 1,
    fencingToken: record.fencingToken + 1,
    realityIntent: intent,
    lifecycle,
    updatedAt: intent.updatedAt,
    terminalReason: intent.terminalReason,
    activeIdentityKey:
      intent.state === "TERMINAL"
        ? undefined
        : record.activeIdentityKey,
  });

const publish = (
  record: RealityAdventureEncounterContinuityRecord | null,
): void => {
  if (record === null) return;
  currentIntent = record.realityIntent;
  publishRealityAdventureContinuityRevision({
    encounterCycleId: record.encounterCycleId,
    canonicalRevision: record.canonicalRevision,
    fencingToken: record.fencingToken,
  });
};

const storageBlockedRequest = (
  intent: RealityEncounterIntent | null,
  reason: RealityAdventureContinuityFailureReason,
): RealityEncounterRequestResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    operation: "REQUEST" as const,
    intent,
    persistence: null,
    reason,
  });

export async function requestRealityEncounter(
  input: RealityEncounterRequestInput,
): Promise<RealityEncounterRequestResult> {
  const identity = normalizeIdentityReferences(input.identityReferences);
  if (identity === null) {
    return Object.freeze({
      status: "BLOCKED" as const,
      operation: "REQUEST" as const,
      intent: currentIntent,
      persistence: null,
      reason: "IDENTITY_REFERENCES_INVALID" as const,
    });
  }
  const choiceActionIntentionReferenceId =
    input.choiceActionIntentionReferenceId?.trim() || null;
  const departureReceiptReferenceId =
    input.departureReceiptReferenceId?.trim() || null;
  const returnIntentRequestReferenceId =
    input.returnIntentRequestReferenceId?.trim() || null;
  const sourceEncounterCycleId =
    input.sourceEncounterCycleId?.trim() || null;
  const returnAttemptRevision =
    Number.isInteger(input.returnAttemptRevision) &&
    Number(input.returnAttemptRevision) > 0
      ? Number(input.returnAttemptRevision)
      : null;
  const choiceReturnRequestValid =
    input.origin === "CHOICE_RETURN" &&
    input.qualification === "EXPLICIT_RETURN_TO_CHOICE" &&
    choiceActionIntentionReferenceId !== null &&
    departureReceiptReferenceId !== null &&
    returnIntentRequestReferenceId !== null &&
    sourceEncounterCycleId !== null &&
    returnAttemptRevision !== null;
  const nonChoiceReturnRequestClean =
    input.origin !== "CHOICE_RETURN" &&
    departureReceiptReferenceId === null &&
    returnIntentRequestReferenceId === null &&
    sourceEncounterCycleId === null &&
    returnAttemptRevision === null;
  if (
    !qualificationMatchesOrigin(input.origin, input.qualification) ||
    (input.origin === "CHOICE_RETURN" && !choiceReturnRequestValid) ||
    (input.origin !== "CHOICE_RETURN" &&
      (choiceActionIntentionReferenceId !== null ||
        !nonChoiceReturnRequestClean))
  ) {
    return Object.freeze({
      status: "BLOCKED" as const,
      operation: "REQUEST" as const,
      intent: currentIntent,
      persistence: null,
      reason:
        input.origin === "CHOICE_RETURN"
          ? "RETURN_INTENT_REQUEST_INVALID" as const
          : "QUALIFICATION_NOT_ALLOWED_FOR_ORIGIN" as const,
    });
  }
  const activeIdentityKey = [
    identity.sourceReferenceId,
    identity.starBeastIdentityReferenceId,
    identity.mansionCoordinateReferenceId,
  ].join("::");
  const canStartChoiceReturnFromRecord = (
    record: RealityAdventureEncounterContinuityRecord,
  ): boolean =>
    input.origin === "CHOICE_RETURN" &&
    record.encounterCycleId === sourceEncounterCycleId &&
    (record.lifecycle === "GRAVITY_ADMITTED" ||
      record.lifecycle === "ACTIVE_IN_GRAVITY" ||
      (record.lifecycle === "TERMINAL" &&
        record.terminalReason === "START_NEW_ENCOUNTER" &&
        record.gravityAdmission !== null));
  const createRequestedIntent = (
    issuedAt: string,
  ): RealityEncounterIntent =>
    Object.freeze({
      schemaVersion:
        XINMAI_REALITY_ENCOUNTER_INTENT_SCHEMA_VERSION,
      source:
        "xinmai_reality_encounter_intent_controller" as const,
      intentReferenceId: `reality-intent:${opaqueId()}`,
      encounterCycleId: `reality-encounter:${opaqueId()}`,
      ...identity,
      origin: input.origin,
      qualification: input.qualification,
      choiceActionIntentionReferenceId,
      departureReceiptReferenceId,
      returnIntentRequestReferenceId,
      returnAttemptRevision,
      sourceEncounterCycleId,
      state: "READY_TO_ENTER_REALITY" as const,
      routeTarget: "/reality" as const,
      issuedAt,
      updatedAt: issuedAt,
      expiresAt: new Date(
        Date.parse(issuedAt) + INTENT_TTL_MS,
      ).toISOString(),
      revision: 1,
      failure: null,
      terminalReason: null,
      provenance: Object.freeze({
        userExplicitRequest: true as const,
        identityAuthority:
          "EXISTING_RECOGNIZED_LIFE" as const,
        relationshipAuthority:
          "EXISTING_RELATIONSHIP_RUNTIME" as const,
        noGrowthAuthority: true as const,
      }),
    });
  const activeChoiceReturnRecovery =
    input.origin === "CHOICE_RETURN"
      ? await readRealityAdventureContinuity({
          kind: "ACTIVE_IDENTITY",
          value: activeIdentityKey,
        })
      : null;
  if (activeChoiceReturnRecovery?.status === "SAFE_WITHHELD") {
    return storageBlockedRequest(
      currentIntent,
      activeChoiceReturnRecovery.reason,
    );
  }
  const requestLookup =
    input.origin === "CHOICE_RETURN" &&
    activeChoiceReturnRecovery?.status === "NOT_FOUND"
      ? Object.freeze({
          kind: "ENCOUNTER" as const,
          value: sourceEncounterCycleId as string,
        })
      : Object.freeze({
          kind: "ACTIVE_IDENTITY" as const,
          value: activeIdentityKey,
        });
  const transaction =
    await transactRealityAdventureContinuity<RealityEncounterRequestResult>({
      lookup: requestLookup,
      mutate: (record) => {
        if (
          record !== null &&
          (record.realityIntent.state !== "TERMINAL" ||
            canStartChoiceReturnFromRecord(record))
        ) {
          const existing = record.realityIntent;
          if (!identityMatches(existing, identity)) {
            return Object.freeze({
              status: "REJECTED" as const,
              record,
              value: Object.freeze({
                status: "BLOCKED" as const,
                operation: "REQUEST" as const,
                intent: existing,
                persistence: null,
                reason: "CURRENT_IDENTITY_MISMATCH" as const,
              }),
            });
          }
          if (
            !isExpired(existing) &&
            existing.state === "READY_TO_ENTER_REALITY" &&
            existing.origin === input.origin &&
            existing.qualification === input.qualification &&
            existing.choiceActionIntentionReferenceId ===
              choiceActionIntentionReferenceId &&
            existing.departureReceiptReferenceId ===
              departureReceiptReferenceId &&
            existing.returnIntentRequestReferenceId ===
              returnIntentRequestReferenceId &&
            existing.returnAttemptRevision ===
              returnAttemptRevision &&
            existing.sourceEncounterCycleId ===
              sourceEncounterCycleId
          ) {
            return Object.freeze({
              status: "UNCHANGED" as const,
              record,
              value: Object.freeze({
                status: "READY" as const,
                operation: "REQUEST" as const,
                intent: existing,
                persistence: "CONFIRMED" as const,
                reason: null,
              }),
            });
          }
          if (
            input.origin === "CHOICE_RETURN" &&
            existing.returnIntentRequestReferenceId ===
              returnIntentRequestReferenceId
          ) {
            return Object.freeze({
              status: "REJECTED" as const,
              record,
              value: Object.freeze({
                status: "BLOCKED" as const,
                operation: "REQUEST" as const,
                intent: existing,
                persistence: null,
                reason: "RETURN_INTENT_REQUEST_CONFLICT" as const,
              }),
            });
          }
          if (
            canStartChoiceReturnFromRecord(record)
          ) {
            const retiredAt = new Date().toISOString();
            const terminalIntent =
              existing.state === "TERMINAL"
                ? existing
                : Object.freeze({
                    ...existing,
                    state: "TERMINAL" as const,
                    updatedAt: retiredAt,
                    revision: existing.revision + 1,
                    failure: null,
                    terminalReason: "START_NEW_ENCOUNTER" as const,
                  });
            const retiredRecord =
              record.lifecycle === "TERMINAL"
                ? record
                : Object.freeze({
                    ...record,
                    canonicalRevision: record.canonicalRevision + 1,
                    fencingToken: record.fencingToken + 1,
                    activeIdentityKey: undefined,
                    realityIntent: terminalIntent,
                    recognitionReceipt:
                      record.recognitionReceipt === null
                        ? null
                        : Object.freeze({
                            ...record.recognitionReceipt,
                            revision:
                              record.recognitionReceipt.revision + 1,
                            lifecycle: "TERMINAL" as const,
                            updatedAt: retiredAt,
                            terminalReason: "START_NEW_ENCOUNTER" as const,
                          }),
                    lifecycle: "TERMINAL" as const,
                    updatedAt: retiredAt,
                    terminalReason: "START_NEW_ENCOUNTER" as const,
                  });
            const nextReturnIntent = createRequestedIntent(retiredAt);
            return Object.freeze({
              status: "COMMIT" as const,
              record: createContinuityRecord(nextReturnIntent),
              retainedRecords: Object.freeze([retiredRecord]),
              value: Object.freeze({
                status: "READY" as const,
                operation: "REQUEST" as const,
                intent: nextReturnIntent,
                persistence: "CONFIRMED" as const,
                reason: null,
              }),
            });
          }
          if (
            input.origin === "CHOICE_RETURN" &&
            record.encounterCycleId !== sourceEncounterCycleId
          ) {
            return Object.freeze({
              status: "REJECTED" as const,
              record,
              value: Object.freeze({
                status: "BLOCKED" as const,
                operation: "REQUEST" as const,
                intent: existing,
                persistence: null,
                reason: "RETURN_SOURCE_ENCOUNTER_MISMATCH" as const,
              }),
            });
          }
          if (isExpired(existing)) {
            const retiredAt = new Date().toISOString();
            const terminalIntent = Object.freeze({
              ...existing,
              state: "TERMINAL" as const,
              updatedAt: retiredAt,
              revision: existing.revision + 1,
              failure: null,
              terminalReason: "INTENT_EXPIRED" as const,
            });
            const retiredRecord = Object.freeze({
              ...record,
              canonicalRevision:
                record.canonicalRevision + 1,
              fencingToken: record.fencingToken + 1,
              activeIdentityKey: undefined,
              realityIntent: terminalIntent,
              recognitionReceipt:
                record.recognitionReceipt === null
                  ? null
                  : Object.freeze({
                      ...record.recognitionReceipt,
                      revision:
                        record.recognitionReceipt.revision + 1,
                      lifecycle: "TERMINAL" as const,
                      updatedAt: retiredAt,
                      terminalReason: "INTENT_EXPIRED" as const,
                    }),
              lifecycle: "TERMINAL" as const,
              updatedAt: retiredAt,
              terminalReason: "INTENT_EXPIRED" as const,
            });
            const nextIntent = createRequestedIntent(retiredAt);
            return Object.freeze({
              status: "COMMIT" as const,
              record: createContinuityRecord(nextIntent),
              retainedRecords: Object.freeze([retiredRecord]),
              value: Object.freeze({
                status: "READY" as const,
                operation: "REQUEST" as const,
                intent: nextIntent,
                persistence: "CONFIRMED" as const,
                reason: null,
              }),
            });
          }
          return Object.freeze({
            status: "REJECTED" as const,
            record,
            value: Object.freeze({
              status: "BLOCKED" as const,
              operation: "REQUEST" as const,
              intent: existing,
              persistence: null,
              reason: "ENCOUNTER_ALREADY_ACTIVE" as const,
            }),
          });
        }
        if (input.origin === "CHOICE_RETURN") {
          return Object.freeze({
            status: "REJECTED" as const,
            record: null,
            value: Object.freeze({
              status: "BLOCKED" as const,
              operation: "REQUEST" as const,
              intent: null,
              persistence: null,
              reason: "RETURN_SOURCE_ENCOUNTER_MISMATCH" as const,
            }),
          });
        }
        const intent = createRequestedIntent(
          new Date().toISOString(),
        );
        return Object.freeze({
          status: "COMMIT" as const,
          record: createContinuityRecord(intent),
          value: Object.freeze({
            status: "READY" as const,
            operation: "REQUEST" as const,
            intent,
            persistence: "CONFIRMED" as const,
            reason: null,
          }),
        });
      },
    });
  if (transaction.status === "SAFE_WITHHELD") {
    return storageBlockedRequest(
      currentIntent,
      transaction.reason,
    );
  }
  publish(transaction.record);
  return transaction.value;
}

const admissionBlocked = (
  operation: "ADMIT" | "RETRY" | "RECOVER",
  reason: Extract<
    RealityEncounterAdmissionResult,
    { status: "RETRY_REQUIRED" | "BLOCKED" }
  >["reason"],
  intent: RealityEncounterIntent | null = currentIntent,
  retry = false,
): RealityEncounterAdmissionResult =>
  Object.freeze({
    status: retry ? "RETRY_REQUIRED" as const : "BLOCKED" as const,
    operation,
    admission: null,
    intent,
    reason,
  });

const admissionReady = (
  operation: "ADMIT" | "RETRY" | "RECOVER",
  record: RealityAdventureEncounterContinuityRecord,
): RealityEncounterAdmissionResult =>
  Object.freeze({
    status: "READY" as const,
    operation,
    admission: createAdmission(record.realityIntent),
    intent: record.realityIntent,
    reason: null,
  });

export async function establishRealityEncounterAdmission(input: Readonly<{
  intentReferenceId: string | null;
  identityReferences: RealityEncounterIdentityReferences;
}>): Promise<RealityEncounterAdmissionResult> {
  const identity = normalizeIdentityReferences(input.identityReferences);
  if (identity === null) {
    return admissionBlocked("ADMIT", "IDENTITY_MISMATCH");
  }
  const requestedId = input.intentReferenceId?.trim() || null;
  const activeIdentityKey = [
    identity.sourceReferenceId,
    identity.starBeastIdentityReferenceId,
    identity.mansionCoordinateReferenceId,
  ].join("::");
  type AdmissionValue =
    | Readonly<{
        status: "READY";
        operation: "ADMIT" | "RECOVER";
      }>
    | Readonly<{
        status: "BLOCKED" | "RETRY_REQUIRED";
        reason: Extract<
          RealityEncounterAdmissionResult,
          { status: "RETRY_REQUIRED" | "BLOCKED" }
        >["reason"];
      }>;
  const transaction =
    await transactRealityAdventureContinuity<AdmissionValue>({
      lookup:
        requestedId === null
          ? Object.freeze({
              kind: "ACTIVE_IDENTITY" as const,
              value: activeIdentityKey,
            })
          : Object.freeze({
              kind: "INTENT" as const,
              value: requestedId,
            }),
      mutate: (existing) => {
        const record = existing;
        let operation: "ADMIT" | "RECOVER" = "ADMIT";
        if (record === null) {
          return Object.freeze({
            status: "REJECTED" as const,
            record: null,
            value: Object.freeze({
              status: "BLOCKED" as const,
              reason: "RECOVERY_CANDIDATE_NOT_FOUND" as const,
            }),
          });
        }
        const intent = record.realityIntent;
        if (
          (requestedId !== null &&
            intent.intentReferenceId !== requestedId) ||
          !identityMatches(intent, identity)
        ) {
          return Object.freeze({
            status: "REJECTED" as const,
            record,
            value: Object.freeze({
              status: "BLOCKED" as const,
              reason: "IDENTITY_MISMATCH" as const,
            }),
          });
        }
        if (isExpired(intent)) {
          return Object.freeze({
            status: "REJECTED" as const,
            record,
            value: Object.freeze({
              status: "BLOCKED" as const,
              reason: "INTENT_EXPIRED" as const,
            }),
          });
        }
        if (intent.state === "ACCEPTING_REALITY") {
          return Object.freeze({
            status: "UNCHANGED" as const,
            record,
            value: Object.freeze({
              status: "READY" as const,
              operation,
            }),
          });
        }
        if (intent.state === "FAILED_RETRYABLE") {
          return Object.freeze({
            status: "REJECTED" as const,
            record,
            value: Object.freeze({
              status: "RETRY_REQUIRED" as const,
              reason: "RETRY_NOT_AVAILABLE" as const,
            }),
          });
        }
        if (
          intent.state !== "READY_TO_ENTER_REALITY" &&
          intent.state !== "ACTIVE_IN_REALITY" &&
          intent.state !== "RECOVERING"
        ) {
          return Object.freeze({
            status: "REJECTED" as const,
            record,
            value: Object.freeze({
              status: "BLOCKED" as const,
              reason: "INTENT_STATE_NOT_ADMISSIBLE" as const,
            }),
          });
        }
        if (intent.state === "ACTIVE_IN_REALITY") {
          operation = "RECOVER";
        }
        const accepting = nextIntent(intent, {
          state: "ACCEPTING_REALITY",
          failure: null,
          terminalReason: null,
        });
        return Object.freeze({
          status: "COMMIT" as const,
          record: updateRecordIntent(
            record,
            accepting,
            "REALITY_PENDING",
          ),
          value: Object.freeze({
            status: "READY" as const,
            operation,
          }),
        });
      },
    });
  if (transaction.status === "SAFE_WITHHELD") {
    return admissionBlocked(
      "RECOVER",
      "RECOVERY_STORAGE_UNAVAILABLE",
    );
  }
  if (transaction.value.status !== "READY") {
    publish(transaction.record);
    return admissionBlocked(
      "ADMIT",
      transaction.value.reason,
      transaction.record?.realityIntent ?? null,
      transaction.value.status === "RETRY_REQUIRED",
    );
  }
  publish(transaction.record);
  return admissionReady(
    transaction.value.operation,
    transaction.record!,
  );
}

export async function retryRealityEncounterAcceptance(input: Readonly<{
  intentReferenceId: string;
  identityReferences?: RealityEncounterIdentityReferences;
}>): Promise<RealityEncounterAdmissionResult> {
  const transaction =
    await transactRealityAdventureContinuity<"READY" | "REJECTED">({
      lookup: Object.freeze({
        kind: "INTENT" as const,
        value: input.intentReferenceId,
      }),
      mutate: (record) => {
        if (
          record === null ||
          (input.identityReferences &&
            !identityMatches(
              record.realityIntent,
              input.identityReferences,
            )) ||
          record.realityIntent.state !== "FAILED_RETRYABLE" ||
          isExpired(record.realityIntent)
        ) {
          return Object.freeze({
            status: "REJECTED" as const,
            record,
            value: "REJECTED" as const,
          });
        }
        const accepting = nextIntent(record.realityIntent, {
          state: "ACCEPTING_REALITY",
          failure: null,
          terminalReason: null,
        });
        return Object.freeze({
          status: "COMMIT" as const,
          record: updateRecordIntent(
            record,
            accepting,
            "REALITY_PENDING",
          ),
          value: "READY" as const,
        });
      },
    });
  if (
    transaction.status === "SAFE_WITHHELD" ||
    transaction.value !== "READY" ||
    transaction.record === null
  ) {
    return admissionBlocked("RETRY", "RETRY_NOT_AVAILABLE");
  }
  publish(transaction.record);
  return admissionReady("RETRY", transaction.record);
}

export async function rollbackRealityEncounterAdmission(input: Readonly<{
  admission: RealityEncounterAdmission;
}>): Promise<RealityEncounterAdmissionRollbackResult> {
  const transaction =
    await transactRealityAdventureContinuity<"ROLLED_BACK" | "REJECTED">({
      lookup: Object.freeze({
        kind: "ENCOUNTER" as const,
        value: input.admission.encounterCycleId,
      }),
      mutate: (record) => {
        if (
          record === null ||
          record.realityIntent.intentReferenceId !==
            input.admission.intentReferenceId ||
          record.realityIntent.revision !==
            input.admission.intentRevision ||
          record.realityIntent.state !== "ACCEPTING_REALITY"
        ) {
          return Object.freeze({
            status: "REJECTED" as const,
            record,
            value: "REJECTED" as const,
          });
        }
        const ready = nextIntent(record.realityIntent, {
          state: "READY_TO_ENTER_REALITY",
          failure: null,
          terminalReason: null,
        });
        return Object.freeze({
          status: "COMMIT" as const,
          record: updateRecordIntent(
            record,
            ready,
            "REALITY_PENDING",
          ),
          value: "ROLLED_BACK" as const,
        });
      },
    });
  if (
    transaction.status === "SAFE_WITHHELD" ||
    transaction.value !== "ROLLED_BACK" ||
    transaction.record === null
  ) {
    return Object.freeze({
      status: "REJECTED" as const,
      operation: "ROLLBACK_ADMISSION" as const,
      intent: transaction.record?.realityIntent ?? currentIntent,
      reason:
        transaction.status === "SAFE_WITHHELD"
          ? "RECOVERY_STORAGE_UNAVAILABLE" as const
          : "INTENT_NOT_CURRENT" as const,
    });
  }
  publish(transaction.record);
  return Object.freeze({
    status: "ROLLED_BACK" as const,
    operation: "ROLLBACK_ADMISSION" as const,
    intent: transaction.record.realityIntent,
    reason: null,
  });
}

export async function failRealityEncounterAcceptance(input: Readonly<{
  intentReferenceId: string;
  encounterCycleId: string;
  intentRevision: number;
  stage: RealityEncounterFailureStage;
  reason: RealityEncounterFailureReason;
}>): Promise<RealityEncounterFailureResult> {
  const transaction =
    await transactRealityAdventureContinuity<"FAILED" | "REJECTED">({
      lookup: Object.freeze({
        kind: "ENCOUNTER" as const,
        value: input.encounterCycleId,
      }),
      mutate: (record) => {
        if (
          record === null ||
          record.realityIntent.intentReferenceId !==
            input.intentReferenceId ||
          record.realityIntent.revision !== input.intentRevision ||
          (record.realityIntent.state !== "ACCEPTING_REALITY" &&
            record.realityIntent.state !==
              "READY_TO_ENTER_REALITY")
        ) {
          return Object.freeze({
            status: "REJECTED" as const,
            record,
            value: "REJECTED" as const,
          });
        }
        const failure: RealityEncounterFailure = Object.freeze({
          stage: input.stage,
          reason: input.reason,
          failedAt: new Date().toISOString(),
          retryAllowed: true as const,
        });
        const failed = nextIntent(record.realityIntent, {
          state: "FAILED_RETRYABLE",
          failure,
          terminalReason: null,
        });
        return Object.freeze({
          status: "COMMIT" as const,
          record: updateRecordIntent(
            record,
            failed,
            "REALITY_PENDING",
          ),
          value: "FAILED" as const,
        });
      },
    });
  if (
    transaction.status === "SAFE_WITHHELD" ||
    transaction.value !== "FAILED" ||
    transaction.record === null
  ) {
    return Object.freeze({
      status: "REJECTED" as const,
      operation: "FAIL_ACCEPTANCE" as const,
      intent: transaction.record?.realityIntent ?? currentIntent,
      reason: "INTENT_STATE_NOT_FAILABLE" as const,
    });
  }
  publish(transaction.record);
  return Object.freeze({
    status: "FAILED_RETRYABLE" as const,
    operation: "FAIL_ACCEPTANCE" as const,
    intent: transaction.record.realityIntent,
    reason: input.reason,
  });
}

export async function commitRealityEncounterActive(
  outcome: RealityHostAcceptanceOutcome,
): Promise<RealityEncounterCommitResult> {
  const transaction =
    await transactRealityAdventureContinuity<"ACTIVE" | "REJECTED">({
      lookup: Object.freeze({
        kind: "ENCOUNTER" as const,
        value: outcome.encounterCycleId,
      }),
      mutate: (record) => {
        const intent = record?.realityIntent ?? null;
        if (
          record === null ||
          intent === null ||
          outcome.status !== "REALITY_MINIMUM_PRESENTED" ||
          intent.state !== "ACCEPTING_REALITY" ||
          intent.intentReferenceId !== outcome.intentReferenceId ||
          intent.revision !== outcome.intentRevision ||
          intent.sourceReferenceId !== outcome.sourceReferenceId ||
          !isRealitySurfaceAdmissionTransactionValid(
            outcome.transaction,
            Object.freeze({
              intentReferenceId: intent.intentReferenceId,
              encounterCycleId: intent.encounterCycleId,
              intentRevision: intent.revision,
              identityReferences: record.identityReferences,
            }),
          ) ||
          outcome.committedAt !==
            outcome.transaction.committedAt ||
          isExpired(intent)
        ) {
          return Object.freeze({
            status: "REJECTED" as const,
            record,
            value: "REJECTED" as const,
          });
        }
        const active = nextIntent(intent, {
          state: "ACTIVE_IN_REALITY",
          failure: null,
          terminalReason: null,
        });
        return Object.freeze({
          status: "COMMIT" as const,
          record: updateRecordIntent(
            record,
            active,
            record.recognitionReceipt === null
              ? "REALITY_ACTIVE"
              : "PRESSURE_RECOGNIZED",
          ),
          value: "ACTIVE" as const,
        });
      },
    });
  if (
    transaction.status === "SAFE_WITHHELD" ||
    transaction.value !== "ACTIVE" ||
    transaction.record === null
  ) {
    return Object.freeze({
      status: "REJECTED" as const,
      operation: "COMMIT_ACTIVE" as const,
      intent: transaction.record?.realityIntent ?? currentIntent,
      reason: "INTENT_NOT_CURRENT" as const,
    });
  }
  publish(transaction.record);
  return Object.freeze({
    status: "ACTIVE" as const,
    operation: "COMMIT_ACTIVE" as const,
    intent: transaction.record.realityIntent,
    canonicalRevision:
      transaction.record.canonicalRevision,
    recognitionReceipt:
      transaction.record.recognitionReceipt,
    reason: null,
  });
}

export async function terminateRealityEncounter(
  command: RealityEncounterTerminationCommand,
): Promise<RealityEncounterTerminationResult> {
  const transaction =
    await transactRealityAdventureContinuity<"TERMINATED" | "REJECTED">({
      lookup: Object.freeze({
        kind: "ENCOUNTER" as const,
        value: command.encounterCycleId,
      }),
      mutate: (record) => {
        const intent = record?.realityIntent ?? null;
        if (
          record === null ||
          intent === null ||
          intent.intentReferenceId !== command.intentReferenceId ||
          intent.revision !== command.expectedIntentRevision ||
          !identityMatches(intent, command.identityReferences) ||
          intent.state === "TERMINAL"
        ) {
          return Object.freeze({
            status: "REJECTED" as const,
            record,
            value: "REJECTED" as const,
          });
        }
        const terminal = nextIntent(intent, {
          state: "TERMINAL",
          failure: null,
          terminalReason: command.terminalReason,
        });
        return Object.freeze({
          status: "COMMIT" as const,
          record: updateRecordIntent(record, terminal, "TERMINAL"),
          value: "TERMINATED" as const,
        });
      },
    });
  if (
    transaction.status === "SAFE_WITHHELD"
  ) {
    if (currentIntent === null) {
      return Object.freeze({
        status: "NOT_ACTIVE" as const,
        operation: "TERMINATE" as const,
        intent: null,
        reason: "NO_CURRENT_INTENT" as const,
      });
    }
    return Object.freeze({
      status: "TERMINATION_RETRYABLE" as const,
      operation: "TERMINATE" as const,
      intent: currentIntent,
      reason: "RECOVERY_CLEAR_UNAVAILABLE" as const,
    });
  }
  if (
    transaction.value !== "TERMINATED" ||
    transaction.record === null
  ) {
    if (currentIntent === null) {
      return Object.freeze({
        status: "NOT_ACTIVE" as const,
        operation: "TERMINATE" as const,
        intent: null,
        reason: "NO_CURRENT_INTENT" as const,
      });
    }
    return Object.freeze({
      status: "REJECTED_STALE" as const,
      operation: "TERMINATE" as const,
      intent: transaction.record?.realityIntent ?? currentIntent,
      reason: "INTENT_REFERENCE_MISMATCH" as const,
    });
  }
  publish(transaction.record);
  currentIntent = null;
  return Object.freeze({
    status: "TERMINATED" as const,
    operation: "TERMINATE" as const,
    intent: transaction.record.realityIntent,
    reason: command.terminalReason,
  });
}

export async function recoverCurrentRealityEncounter(input: Readonly<{
  identityReferences: RealityEncounterIdentityReferences;
}>): Promise<RealityAdventureEncounterContinuityRecord | null> {
  const identityKey = [
    input.identityReferences.sourceReferenceId,
    input.identityReferences.starBeastIdentityReferenceId,
    input.identityReferences.mansionCoordinateReferenceId,
  ].join("::");
  const result = await readRealityAdventureContinuity(
    Object.freeze({
      kind: "ACTIVE_IDENTITY" as const,
      value: identityKey,
    }),
  );
  if (result.status !== "FOUND") return null;
  currentIntent = result.record.realityIntent;
  return result.record;
}

export function readCurrentRealityEncounterIntent():
  RealityEncounterIntent | null {
  return currentIntent;
}

export const REALITY_ENCOUNTER_INTENT_CONTROLLER_BOUNDARY =
  Object.freeze({
    singleIntentAuthority: true as const,
    canonicalIndexedDbPersistenceOnly: true as const,
    transactionCompleteSuccessOnly: true as const,
    twoHourTtlPreserved: true as const,
    noSessionStorageWriter: true as const,
    noRouteActiveAuthority: true as const,
    noDomAuthority: true as const,
    noRendererAuthority: true as const,
    noGrowthAuthority: true as const,
  });

export const XinmaiRealityEncounterIntentController = Object.freeze({
  requestEncounter: requestRealityEncounter,
  establishAdmission: establishRealityEncounterAdmission,
  retryCurrentEncounter: retryRealityEncounterAcceptance,
  rollbackAdmission: rollbackRealityEncounterAdmission,
  commitActive: commitRealityEncounterActive,
  failAcceptance: failRealityEncounterAcceptance,
  terminateCurrentEncounter: terminateRealityEncounter,
  recoverCurrentEncounter: recoverCurrentRealityEncounter,
  readCurrentIntent: readCurrentRealityEncounterIntent,
  boundary: REALITY_ENCOUNTER_INTENT_CONTROLLER_BOUNDARY,
});
