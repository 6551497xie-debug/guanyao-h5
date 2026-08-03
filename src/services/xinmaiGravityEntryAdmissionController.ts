import type {
  RealityAdventureEncounterContinuityRecord,
} from "../types/xinmaiRealityAdventureContinuity";
import type {
  GravityEntryAdmission,
  GravityEntryFailure,
  GravityEntryFailureReason,
  GravityEntryFailureStage,
  GravityHostAcceptanceOutcome,
  GravityRouteAdmission,
  GravityRouteAdmissionResult,
  GravityRouteTicket,
} from "../types/xinmaiGravityEntryAdmission";
import type {
  RealityEncounterIdentityReferences,
} from "../types/xinmaiRealityEncounterIntent";
import {
  readGravityEntryRecoveryCandidate,
} from "./xinmaiGravityEntryRecoveryAdapter";
import {
  readRealityAdventureContinuity,
  transactRealityAdventureContinuity,
} from "./xinmaiRealityAdventureContinuityTransactionalStore";
import {
  publishRealityAdventureContinuityRevision,
} from "./xinmaiRealityAdventureContinuityRevisionObserver";
import {
  isGravitySurfaceAdmissionTransactionValid,
} from "./xinmaiGravitySurfaceAdmissionTransaction";
import {
  terminalizeXinmaiRealityAdventureLifecycleRecord,
} from "./xinmaiRealityAdventureLifecycleReconciliationController";
import { isXinmaiRealityAdventureLifecycleReconciliationMutationEnabled } from "./xinmaiRealityAdventureLifecycleReconciliationMutationPolicy";

const GRAVITY_ENTRY_TTL_MS = 2 * 60 * 60 * 1_000;
let currentAdmission: GravityEntryAdmission | null = null;
let currentAdmissionAuthority:
  | "CANONICAL_INDEXED_DB"
  | "READ_ONLY_LEGACY"
  | null = null;

export const GRAVITY_ENTRY_ADMISSION_CONTROLLER_BOUNDARY =
  Object.freeze({
    singleCurrentAdmission: true as const,
    canonicalIndexedDbRecoveryOnlyForNewRuntime: true as const,
    readOnlyLegacyRecoveryAllowed: true as const,
    noLegacyBackfill: true as const,
    existingIdentityReferencesOnly: true as const,
    routeCannotCommitActive: true as const,
    hostTypedOutcomeRequired: true as const,
    transactionCompleteSuccessOnly: true as const,
    noSessionStorageWriter: true as const,
    noIdentityMutation: true as const,
    noPressureInference: true as const,
    noNavigation: true as const,
    noRendererInvocation: true as const,
    noChoiceExecution: true as const,
    noCrystalExecution: true as const,
    noArchiveWrite: true as const,
  });

const identityMatches = (
  left: RealityEncounterIdentityReferences,
  right: RealityEncounterIdentityReferences,
): boolean =>
  left.sourceReferenceId === right.sourceReferenceId &&
  left.starBeastIdentityReferenceId ===
    right.starBeastIdentityReferenceId &&
  left.mansionCoordinateReferenceId ===
    right.mansionCoordinateReferenceId;

const isExpired = (admission: GravityEntryAdmission): boolean => {
  const issuedAt = Date.parse(admission.issuedAt);
  const expiresAt = Date.parse(admission.expiresAt);
  return (
    !Number.isFinite(issuedAt) ||
    !Number.isFinite(expiresAt) ||
    expiresAt <= issuedAt ||
    Math.min(
      expiresAt,
      issuedAt + GRAVITY_ENTRY_TTL_MS,
    ) <= Date.now()
  );
};

const nextAdmission = (
  admission: GravityEntryAdmission,
  patch: Partial<
    Pick<
      GravityEntryAdmission,
      "state" | "failure" | "terminalReason"
    >
  >,
): GravityEntryAdmission =>
  Object.freeze({
    ...admission,
    ...patch,
    updatedAt: new Date().toISOString(),
    revision: admission.revision + 1,
  });

const createRouteAdmission = (
  admission: GravityEntryAdmission,
): GravityRouteAdmission =>
  Object.freeze({
    schemaVersion: "XINMAI_GRAVITY_ROUTE_ADMISSION_V2" as const,
    source:
      "reality_to_gravity_entry_admission_controller" as const,
    admissionReferenceId: admission.admissionReferenceId,
    gravityCycleId: admission.gravityCycleId,
    gravityObservationReferenceId:
      admission.gravityObservationReferenceId,
    admissionRevision: admission.revision,
    identityReferences: admission.identityReferences,
    selectedPressureSeedId:
      admission.currentPressure.selectedPressureSeedId,
    routeTarget: "/dynamics" as const,
    expiresAt: admission.expiresAt,
  });

const ready = (
  operation: "ADMIT" | "RETRY" | "RECOVER",
  admission: GravityEntryAdmission,
): GravityRouteAdmissionResult =>
  Object.freeze({
    status: "READY" as const,
    operation,
    admission: createRouteAdmission(admission),
    intent: admission,
    reason: null,
  });

const blocked = (
  operation: "ADMIT" | "RETRY" | "RECOVER",
  reason: GravityEntryFailureReason,
  status: "BLOCKED" | "RETRY_REQUIRED" = "BLOCKED",
  admission: GravityEntryAdmission | null = currentAdmission,
): GravityRouteAdmissionResult =>
  Object.freeze({
    status,
    operation,
    admission: null,
    intent: admission,
    reason,
  });

const updateCanonicalAdmission = (
  record: RealityAdventureEncounterContinuityRecord,
  admission: GravityEntryAdmission,
  lifecycle: RealityAdventureEncounterContinuityRecord["lifecycle"] =
    record.lifecycle,
): RealityAdventureEncounterContinuityRecord =>
  Object.freeze({
    ...record,
    canonicalRevision: record.canonicalRevision + 1,
    fencingToken: record.fencingToken + 1,
    gravityAdmission: admission,
    lifecycle,
    updatedAt: admission.updatedAt,
  });

const publish = (
  record: RealityAdventureEncounterContinuityRecord | null,
): void => {
  if (record === null || record.gravityAdmission === null) return;
  currentAdmission = record.gravityAdmission;
  currentAdmissionAuthority = "CANONICAL_INDEXED_DB";
  publishRealityAdventureContinuityRevision({
    encounterCycleId: record.encounterCycleId,
    canonicalRevision: record.canonicalRevision,
    fencingToken: record.fencingToken,
  });
};

const recoverLegacyAdmission = (
  identity: RealityEncounterIdentityReferences,
  routeTicket: GravityRouteTicket | null,
): GravityRouteAdmissionResult | null => {
  const recovery = readGravityEntryRecoveryCandidate();
  if (recovery.status !== "FOUND") return null;
  const candidate = recovery.snapshot.currentGravityAdmission;
  if (
    !identityMatches(candidate.identityReferences, identity) ||
    isExpired(candidate) ||
    (routeTicket !== null &&
      (routeTicket.admissionReferenceId !==
        candidate.admissionReferenceId ||
        routeTicket.gravityCycleId !== candidate.gravityCycleId ||
        routeTicket.gravityObservationReferenceId !==
          candidate.gravityObservationReferenceId))
  ) {
    return blocked(
      "RECOVER",
      "RECOVERY_CANDIDATE_INVALID",
      "BLOCKED",
      candidate,
    );
  }
  if (
    candidate.state !== "READY_TO_ENTER_GRAVITY" &&
    candidate.state !== "ACCEPTING_GRAVITY" &&
    candidate.state !== "ACTIVE_IN_GRAVITY"
  ) {
    return blocked(
      "RECOVER",
      "ADMISSION_NOT_CURRENT",
      "BLOCKED",
      candidate,
    );
  }
  currentAdmission =
    candidate.state === "ACCEPTING_GRAVITY"
      ? candidate
      : nextAdmission(candidate, {
          state: "ACCEPTING_GRAVITY",
          failure: null,
          terminalReason: null,
        });
  currentAdmissionAuthority = "READ_ONLY_LEGACY";
  return ready("RECOVER", currentAdmission);
};

export async function establishGravityRouteAdmission(input: Readonly<{
  routeTicket: GravityRouteTicket | null;
  identityReferences: RealityEncounterIdentityReferences;
}>): Promise<GravityRouteAdmissionResult> {
  const lookup =
    input.routeTicket === null
      ? Object.freeze({
          kind: "ACTIVE_IDENTITY" as const,
          value: [
            input.identityReferences.sourceReferenceId,
            input.identityReferences.starBeastIdentityReferenceId,
            input.identityReferences.mansionCoordinateReferenceId,
          ].join("::"),
        })
      : Object.freeze({
          kind: "ADMISSION" as const,
          value: input.routeTicket.admissionReferenceId,
        });
  const transaction =
    await transactRealityAdventureContinuity<
      | Readonly<{
          status: "READY";
          operation: "ADMIT" | "RECOVER";
        }>
      | Readonly<{
          status: "BLOCKED" | "RETRY_REQUIRED";
          reason: GravityEntryFailureReason;
        }>
    >({
      lookup,
      mutate: (record) => {
        const admission = record?.gravityAdmission ?? null;
        if (record === null || admission === null) {
          return Object.freeze({
            status: "REJECTED" as const,
            record,
            value: Object.freeze({
              status: "BLOCKED" as const,
              reason: "ADMISSION_NOT_CURRENT" as const,
            }),
          });
        }
        if (
          !identityMatches(
            admission.identityReferences,
            input.identityReferences,
          ) ||
          (input.routeTicket !== null &&
            (input.routeTicket.admissionReferenceId !==
              admission.admissionReferenceId ||
              input.routeTicket.gravityCycleId !==
                admission.gravityCycleId ||
              input.routeTicket.gravityObservationReferenceId !==
                admission.gravityObservationReferenceId))
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
        if (isExpired(admission)) {
          return Object.freeze({
            status: "REJECTED" as const,
            record,
            value: Object.freeze({
              status: "BLOCKED" as const,
              reason: "ADMISSION_EXPIRED" as const,
            }),
          });
        }
        if (admission.state === "ACCEPTING_GRAVITY") {
          return Object.freeze({
            status: "UNCHANGED" as const,
            record,
            value: Object.freeze({
              status: "READY" as const,
              operation: "ADMIT" as const,
            }),
          });
        }
        if (admission.state === "FAILED_RETRYABLE") {
          return Object.freeze({
            status: "REJECTED" as const,
            record,
            value: Object.freeze({
              status: "RETRY_REQUIRED" as const,
              reason:
                "RECOVERY_AFTER_INCOMPLETE_ACCEPTANCE" as const,
            }),
          });
        }
        if (
          admission.state !== "READY_TO_ENTER_GRAVITY" &&
          admission.state !== "ACTIVE_IN_GRAVITY"
        ) {
          return Object.freeze({
            status: "REJECTED" as const,
            record,
            value: Object.freeze({
              status: "BLOCKED" as const,
              reason: "ADMISSION_NOT_CURRENT" as const,
            }),
          });
        }
        const operation =
          admission.state === "ACTIVE_IN_GRAVITY"
            ? "RECOVER" as const
            : "ADMIT" as const;
        const accepting = nextAdmission(admission, {
          state: "ACCEPTING_GRAVITY",
          failure: null,
          terminalReason: null,
        });
        return Object.freeze({
          status: "COMMIT" as const,
          record: updateCanonicalAdmission(record, accepting),
          value: Object.freeze({
            status: "READY" as const,
            operation,
          }),
        });
      },
    });
  if (
    transaction.status === "SAFE_WITHHELD" ||
    transaction.value.status !== "READY" ||
    transaction.record === null ||
    transaction.record.gravityAdmission === null
  ) {
    if (
      transaction.status === "SAFE_WITHHELD" &&
      transaction.reason === "MUTATION_PAUSED"
    ) {
      const legacy = recoverLegacyAdmission(
        input.identityReferences,
        input.routeTicket,
      );
      return (
        legacy ??
        blocked("RECOVER", "CUTOVER_STORAGE_UNAVAILABLE")
      );
    }
    if (transaction.status === "SAFE_WITHHELD") {
      return blocked("RECOVER", "CUTOVER_STORAGE_UNAVAILABLE");
    }
    if (transaction.value.status !== "READY") {
      const legacy = recoverLegacyAdmission(
        input.identityReferences,
        input.routeTicket,
      );
      if (legacy !== null) return legacy;
      return blocked(
        "ADMIT",
        transaction.value.reason,
        transaction.value.status,
        transaction.record?.gravityAdmission ?? null,
      );
    }
    return blocked("RECOVER", "CUTOVER_STORAGE_UNAVAILABLE");
  }
  publish(transaction.record);
  return ready(
    transaction.value.operation,
    transaction.record.gravityAdmission,
  );
}

export async function retryGravityEntryAcceptance(input: Readonly<{
  admissionReferenceId: string;
  gravityCycleId: string;
  identityReferences: RealityEncounterIdentityReferences;
}>): Promise<GravityRouteAdmissionResult> {
  if (
    currentAdmissionAuthority === "READ_ONLY_LEGACY" &&
    currentAdmission !== null &&
    currentAdmission.admissionReferenceId ===
      input.admissionReferenceId &&
    currentAdmission.gravityCycleId === input.gravityCycleId &&
    identityMatches(
      currentAdmission.identityReferences,
      input.identityReferences,
    )
  ) {
    currentAdmission = nextAdmission(currentAdmission, {
      state: "ACCEPTING_GRAVITY",
      failure: null,
      terminalReason: null,
    });
    return ready("RETRY", currentAdmission);
  }
  const transaction =
    await transactRealityAdventureContinuity<"READY" | "REJECTED">({
      lookup: Object.freeze({
        kind: "ADMISSION" as const,
        value: input.admissionReferenceId,
      }),
      mutate: (record) => {
        const admission = record?.gravityAdmission ?? null;
        if (
          record === null ||
          admission === null ||
          admission.gravityCycleId !== input.gravityCycleId ||
          !identityMatches(
            admission.identityReferences,
            input.identityReferences,
          ) ||
          admission.state !== "FAILED_RETRYABLE" ||
          isExpired(admission)
        ) {
          return Object.freeze({
            status: "REJECTED" as const,
            record,
            value: "REJECTED" as const,
          });
        }
        const accepting = nextAdmission(admission, {
          state: "ACCEPTING_GRAVITY",
          failure: null,
          terminalReason: null,
        });
        return Object.freeze({
          status: "COMMIT" as const,
          record: updateCanonicalAdmission(record, accepting),
          value: "READY" as const,
        });
      },
    });
  if (
    transaction.status === "SAFE_WITHHELD" ||
    transaction.value !== "READY" ||
    transaction.record?.gravityAdmission === null ||
    transaction.record === null
  ) {
    return blocked("RETRY", "ADMISSION_NOT_CURRENT");
  }
  publish(transaction.record);
  return ready("RETRY", transaction.record.gravityAdmission);
}

export async function failGravityEntryAcceptance(input: Readonly<{
  admissionReferenceId: string;
  gravityCycleId: string;
  admissionRevision: number;
  stage: GravityEntryFailureStage;
  reason: GravityEntryFailureReason;
}>): Promise<GravityEntryAdmission | null> {
  if (
    currentAdmissionAuthority === "READ_ONLY_LEGACY" &&
    currentAdmission?.admissionReferenceId ===
      input.admissionReferenceId &&
    currentAdmission.gravityCycleId === input.gravityCycleId &&
    currentAdmission.revision === input.admissionRevision
  ) {
    currentAdmission = nextAdmission(currentAdmission, {
      state: "FAILED_RETRYABLE",
      failure: Object.freeze({
        stage: input.stage,
        reason: input.reason,
        failedAt: new Date().toISOString(),
        retryAllowed: true as const,
      }),
      terminalReason: null,
    });
    return currentAdmission;
  }
  const transaction =
    await transactRealityAdventureContinuity<"FAILED" | "REJECTED">({
      lookup: Object.freeze({
        kind: "ADMISSION" as const,
        value: input.admissionReferenceId,
      }),
      mutate: (record) => {
        const admission = record?.gravityAdmission ?? null;
        if (
          record === null ||
          admission === null ||
          admission.gravityCycleId !== input.gravityCycleId ||
          admission.revision !== input.admissionRevision ||
          (admission.state !== "READY_TO_ENTER_GRAVITY" &&
            admission.state !== "ACCEPTING_GRAVITY")
        ) {
          return Object.freeze({
            status: "REJECTED" as const,
            record,
            value: "REJECTED" as const,
          });
        }
        const failure: GravityEntryFailure = Object.freeze({
          stage: input.stage,
          reason: input.reason,
          failedAt: new Date().toISOString(),
          retryAllowed: true as const,
        });
        const failedAdmission = nextAdmission(admission, {
          state: "FAILED_RETRYABLE",
          failure,
          terminalReason: null,
        });
        return Object.freeze({
          status: "COMMIT" as const,
          record: updateCanonicalAdmission(
            record,
            failedAdmission,
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
    return currentAdmission;
  }
  publish(transaction.record);
  return transaction.record.gravityAdmission;
}

export async function commitGravityEntryActive(
  outcome: GravityHostAcceptanceOutcome,
): Promise<GravityEntryAdmission | null> {
  if (
    currentAdmissionAuthority === "READ_ONLY_LEGACY" &&
    currentAdmission !== null &&
    outcome.status === "GRAVITY_MINIMUM_PRESENTED" &&
    currentAdmission.admissionReferenceId ===
      outcome.admissionReferenceId &&
    currentAdmission.gravityCycleId === outcome.gravityCycleId &&
    currentAdmission.revision === outcome.admissionRevision
  ) {
    currentAdmission = nextAdmission(currentAdmission, {
      state: "ACTIVE_IN_GRAVITY",
      failure: null,
      terminalReason: null,
    });
    return currentAdmission;
  }
  const transaction =
    await transactRealityAdventureContinuity<"ACTIVE" | "REJECTED">({
      lookup: Object.freeze({
        kind: "ADMISSION" as const,
        value: outcome.admissionReferenceId,
      }),
      mutate: (record) => {
        const admission = record?.gravityAdmission ?? null;
        if (
          record === null ||
          admission === null ||
          outcome.status !== "GRAVITY_MINIMUM_PRESENTED" ||
          admission.state !== "ACCEPTING_GRAVITY" ||
          admission.gravityCycleId !== outcome.gravityCycleId ||
          admission.revision !== outcome.admissionRevision ||
          admission.currentPressure.selectedPressureSeedId !==
            outcome.selectedPressureSeedId ||
          !identityMatches(
            admission.identityReferences,
            outcome.identityReferences,
          ) ||
          !isGravitySurfaceAdmissionTransactionValid(
            outcome.transaction,
            Object.freeze({
              admissionReferenceId:
                admission.admissionReferenceId,
              gravityCycleId: admission.gravityCycleId,
              admissionRevision: admission.revision,
              identityReferences:
                admission.identityReferences,
              selectedPressureSeedId:
                admission.currentPressure
                  .selectedPressureSeedId,
              sourceEncounterCycleId:
                admission.sourceReality.encounterCycleId,
              choiceActionIntentionReferenceId:
                admission.sourceReality
                  .choiceActionIntentionReferenceId,
              gravityObservationReferenceId:
                admission.gravityObservationReferenceId,
            }),
          ) ||
          outcome.committedAt !==
            outcome.transaction.committedAt ||
          isExpired(admission)
        ) {
          return Object.freeze({
            status: "REJECTED" as const,
            record,
            value: "REJECTED" as const,
          });
        }
        const active = nextAdmission(admission, {
          state: "ACTIVE_IN_GRAVITY",
          failure: null,
          terminalReason: null,
        });
        return Object.freeze({
          status: "COMMIT" as const,
          record: updateCanonicalAdmission(
            record,
            active,
            "ACTIVE_IN_GRAVITY",
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
    return currentAdmission;
  }
  publish(transaction.record);
  return transaction.record.gravityAdmission;
}

export async function terminateGravityEntry(input: Readonly<{
  admissionReferenceId: string;
  gravityCycleId: string;
  expectedRevision: number;
  identityReferences: RealityEncounterIdentityReferences;
  terminalReason: GravityEntryAdmission["terminalReason"];
}>): Promise<GravityEntryAdmission | null> {
  if (input.terminalReason === null) return currentAdmission;
  if (!isXinmaiRealityAdventureLifecycleReconciliationMutationEnabled()) {
    return currentAdmission;
  }
  if (
    currentAdmissionAuthority === "READ_ONLY_LEGACY" &&
    currentAdmission?.admissionReferenceId ===
      input.admissionReferenceId
  ) {
    const terminal = nextAdmission(currentAdmission, {
      state: "TERMINAL",
      failure: null,
      terminalReason: input.terminalReason,
    });
    currentAdmission = null;
    currentAdmissionAuthority = null;
    return terminal;
  }
  const transaction =
    await transactRealityAdventureContinuity<"TERMINATED" | "REJECTED">({
      lookup: Object.freeze({
        kind: "ADMISSION" as const,
        value: input.admissionReferenceId,
      }),
      mutate: (record) => {
        const admission = record?.gravityAdmission ?? null;
        if (
          record === null ||
          admission === null ||
          admission.gravityCycleId !== input.gravityCycleId ||
          admission.revision !== input.expectedRevision ||
          !identityMatches(
            admission.identityReferences,
            input.identityReferences,
          )
        ) {
          return Object.freeze({
            status: "REJECTED" as const,
            record,
            value: "REJECTED" as const,
          });
        }
        const terminal = nextAdmission(admission, {
          state: "TERMINAL",
          failure: null,
          terminalReason: input.terminalReason,
        });
        const realityTerminalReason =
          input.terminalReason === "EXPLICIT_LEAVE"
            ? "EXPLICIT_LEAVE" as const
            : input.terminalReason === "ADMISSION_EXPIRED"
              ? "INTENT_EXPIRED" as const
              : input.terminalReason === "IDENTITY_MISMATCH"
                ? "IDENTITY_MISMATCH" as const
                : input.terminalReason === "RECOVERY_CANDIDATE_INVALID"
                  ? "RECOVERY_CANDIDATE_INVALID" as const
                  : input.terminalReason === "USER_DATA_CLEARED"
                    ? "USER_DATA_CLEARED" as const
                    : "START_NEW_ENCOUNTER" as const;
        return Object.freeze({
          status: "COMMIT" as const,
          record: terminalizeXinmaiRealityAdventureLifecycleRecord({
            record: Object.freeze({
              ...record,
              gravityAdmission: terminal,
            }),
            terminalReason: realityTerminalReason,
            terminalAt: terminal.updatedAt,
          }),
          value: "TERMINATED" as const,
        });
      },
    });
  if (
    transaction.status === "SAFE_WITHHELD" ||
    transaction.value !== "TERMINATED" ||
    transaction.record === null
  ) {
    return currentAdmission;
  }
  const terminal = transaction.record.gravityAdmission;
  publish(transaction.record);
  currentAdmission = null;
  currentAdmissionAuthority = null;
  return terminal;
}

export async function readCanonicalGravityAdmission(input: Readonly<{
  admissionReferenceId: string;
}>): Promise<GravityEntryAdmission | null> {
  const result = await readRealityAdventureContinuity(
    Object.freeze({
      kind: "ADMISSION" as const,
      value: input.admissionReferenceId,
    }),
  );
  return result.status === "FOUND"
    ? result.record.gravityAdmission
    : null;
}

export function readCurrentGravityEntryAdmission():
  GravityEntryAdmission | null {
  return currentAdmission;
}

export const RealityToGravityEntryAdmissionController =
  Object.freeze({
    establishRouteAdmission: establishGravityRouteAdmission,
    retryAcceptance: retryGravityEntryAcceptance,
    failAcceptance: failGravityEntryAcceptance,
    commitActive: commitGravityEntryActive,
    terminate: terminateGravityEntry,
    readCanonicalAdmission: readCanonicalGravityAdmission,
    readCurrentAdmission: readCurrentGravityEntryAdmission,
    boundary: GRAVITY_ENTRY_ADMISSION_CONTROLLER_BOUNDARY,
  });
