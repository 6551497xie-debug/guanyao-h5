import type {
  RealityAdventureContinuityFailureReason,
  RealityAdventureEncounterContinuityRecord,
} from "../types/xinmaiRealityAdventureContinuity";
import type { GravityEntryTerminalReason } from "../types/xinmaiGravityEntryAdmission";
import type { RealityEncounterTerminalReason } from "../types/xinmaiRealityEncounterIntent";
import type {
  RealityAdventureDepartureReconciliation,
  XinmaiChoiceDepartureReconciliationProof,
  XinmaiRealityAdventureDepartureReconciliationReadResult,
  XinmaiRealityAdventureLifecycleReconciliationResult,
} from "../types/xinmaiRealityGravityDepartureReconciliation";
import {
  readRealityAdventureContinuity,
  transactRealityAdventureContinuity,
} from "./xinmaiRealityAdventureContinuityTransactionalStore";
import { isXinmaiRealityAdventureLifecycleReconciliationMutationEnabled } from "./xinmaiRealityAdventureLifecycleReconciliationMutationPolicy";
import { publishRealityAdventureContinuityRevision } from "./xinmaiRealityAdventureContinuityRevisionObserver";

const identityMatches = (
  left: XinmaiChoiceDepartureReconciliationProof["identityReferences"],
  right: XinmaiChoiceDepartureReconciliationProof["identityReferences"],
): boolean =>
  left.sourceReferenceId === right.sourceReferenceId &&
  left.starBeastIdentityReferenceId === right.starBeastIdentityReferenceId &&
  left.mansionCoordinateReferenceId === right.mansionCoordinateReferenceId;

const gravityTerminalReason = (
  reason: RealityEncounterTerminalReason,
): GravityEntryTerminalReason =>
  reason === "EXPLICIT_LEAVE"
    ? "EXPLICIT_LEAVE"
    : reason === "INTENT_EXPIRED"
      ? "ADMISSION_EXPIRED"
      : reason === "IDENTITY_MISMATCH"
        ? "IDENTITY_MISMATCH"
        : reason === "RECOVERY_CANDIDATE_INVALID"
          ? "RECOVERY_CANDIDATE_INVALID"
          : reason === "USER_DATA_CLEARED"
            ? "USER_DATA_CLEARED"
            : "START_NEW_REALITY_ENCOUNTER";

export function terminalizeXinmaiRealityAdventureLifecycleRecord(input: Readonly<{
  record: RealityAdventureEncounterContinuityRecord;
  terminalReason: RealityEncounterTerminalReason;
  terminalAt: string;
  departureReconciliation?: RealityAdventureDepartureReconciliation | null;
}>): RealityAdventureEncounterContinuityRecord {
  const nextCanonicalRevision = input.record.canonicalRevision + 1;
  const nextFencingToken = input.record.fencingToken + 1;
  const currentIntent = input.record.realityIntent;
  const terminalIntent =
    currentIntent.state === "TERMINAL"
      ? currentIntent
      : Object.freeze({
          ...currentIntent,
          state: "TERMINAL" as const,
          updatedAt: input.terminalAt,
          revision: currentIntent.revision + 1,
          failure: null,
          terminalReason: input.terminalReason,
        });
  const currentAdmission = input.record.gravityAdmission;
  const terminalAdmission =
    currentAdmission === null || currentAdmission.state === "TERMINAL"
      ? currentAdmission
      : Object.freeze({
          ...currentAdmission,
          revision: currentAdmission.revision + 1,
          state: "TERMINAL" as const,
          updatedAt: input.terminalAt,
          failure: null,
          terminalReason: gravityTerminalReason(input.terminalReason),
        });
  const existingReconciliation =
    "departureReconciliation" in input.record
      ? input.record.departureReconciliation
      : null;
  return Object.freeze({
    ...input.record,
    schemaVersion:
      "XINMAI_REALITY_ADVENTURE_ENCOUNTER_CONTINUITY_V2" as const,
    canonicalRevision: nextCanonicalRevision,
    fencingToken: nextFencingToken,
    activeIdentityKey: undefined,
    realityIntent: terminalIntent,
    gravityAdmission: terminalAdmission,
    lifecycle: "TERMINAL" as const,
    updatedAt: input.terminalAt,
    terminalReason: input.terminalReason,
    departureReconciliation:
      input.departureReconciliation === undefined
        ? existingReconciliation
        : input.departureReconciliation,
  });
}

const proofMatchesReconciliation = (
  proof: XinmaiChoiceDepartureReconciliationProof,
  reconciliation: RealityAdventureDepartureReconciliation,
): boolean =>
  proof.reconciliationReferenceId ===
    reconciliation.reconciliationReferenceId &&
  proof.departureReceiptReferenceId ===
    reconciliation.departureReceiptReferenceId &&
  proof.choiceActionIntentionReferenceId ===
    reconciliation.choiceActionIntentionReferenceId &&
  proof.sourceEncounterCycleId === reconciliation.sourceEncounterCycleId &&
  proof.gravityCycleId === reconciliation.gravityCycleId &&
  proof.gravityObservationReferenceId ===
    reconciliation.gravityObservationReferenceId &&
  identityMatches(proof.identityReferences, reconciliation.identityReferences);

const storageReason = (
  reason: RealityAdventureContinuityFailureReason,
): Extract<
  XinmaiRealityAdventureLifecycleReconciliationResult,
  { status: "SAFE_WITHHELD" }
>["reason"] => reason;

export async function reconcileXinmaiChoiceExplicitDeparture(
  proof: XinmaiChoiceDepartureReconciliationProof,
): Promise<XinmaiRealityAdventureLifecycleReconciliationResult> {
  if (!isXinmaiRealityAdventureLifecycleReconciliationMutationEnabled()) {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      reconciliation: null,
      canonicalRevision: null,
      fencingToken: null,
      reason: "MUTATION_PAUSED" as const,
    });
  }
  type Decision =
    | Readonly<{
        status: "RECONCILED" | "ALREADY_RECONCILED";
        reconciliation: RealityAdventureDepartureReconciliation;
      }>
    | Readonly<{
        status: "REJECTED";
        reason: Extract<
          XinmaiRealityAdventureLifecycleReconciliationResult,
          { status: "SAFE_WITHHELD" }
        >["reason"];
      }>;
  const transaction = await transactRealityAdventureContinuity<Decision>({
    lookup: Object.freeze({
      kind: "ENCOUNTER" as const,
      value: proof.sourceEncounterCycleId,
    }),
    mutate: (record) => {
      if (record === null) {
        return Object.freeze({
          status: "REJECTED" as const,
          record: null,
          value: Object.freeze({
            status: "REJECTED" as const,
            reason: "SOURCE_NOT_FOUND" as const,
          }),
        });
      }
      if (
        !identityMatches(record.identityReferences, proof.identityReferences) ||
        record.encounterCycleId !== proof.sourceEncounterCycleId ||
        record.gravityAdmission === null ||
        record.gravityAdmission.gravityCycleId !== proof.gravityCycleId ||
        record.gravityAdmission.gravityObservationReferenceId !==
          proof.gravityObservationReferenceId
      ) {
        return Object.freeze({
          status: "REJECTED" as const,
          record,
          value: Object.freeze({
            status: "REJECTED" as const,
            reason: "IDENTITY_OR_LINEAGE_MISMATCH" as const,
          }),
        });
      }
      const existing =
        "departureReconciliation" in record
          ? record.departureReconciliation
          : null;
      if (existing !== null) {
        const exact = proofMatchesReconciliation(proof, existing);
        return Object.freeze({
          status: exact ? "UNCHANGED" as const : "REJECTED" as const,
          record,
          value: exact
            ? Object.freeze({
                status: "ALREADY_RECONCILED" as const,
                reconciliation: existing,
              })
            : Object.freeze({
                status: "REJECTED" as const,
                reason: "RECONCILIATION_PROOF_MISMATCH" as const,
              }),
        });
      }
      if (
        record.lifecycle !== "GRAVITY_ADMITTED" &&
        record.lifecycle !== "ACTIVE_IN_GRAVITY"
      ) {
        return Object.freeze({
          status: "REJECTED" as const,
          record,
          value: Object.freeze({
            status: "REJECTED" as const,
            reason: "SOURCE_NOT_ACTIVE_IN_GRAVITY" as const,
          }),
        });
      }
      const reconciledAt = new Date().toISOString();
      const nextCanonicalRevision = record.canonicalRevision + 1;
      const nextFencingToken = record.fencingToken + 1;
      const reconciliation: RealityAdventureDepartureReconciliation =
        Object.freeze({
          schemaVersion:
            "XINMAI_REALITY_GRAVITY_DEPARTURE_RECONCILIATION_V1" as const,
          reconciliationReferenceId: proof.reconciliationReferenceId,
          departureReceiptReferenceId: proof.departureReceiptReferenceId,
          departureReceiptRevision: proof.departureReceiptRevision,
          choiceActionIntentionReferenceId:
            proof.choiceActionIntentionReferenceId,
          sourceEncounterCycleId: proof.sourceEncounterCycleId,
          gravityCycleId: proof.gravityCycleId,
          gravityObservationReferenceId: proof.gravityObservationReferenceId,
          identityReferences: Object.freeze({ ...proof.identityReferences }),
          observedGrowthEnvelopeRevision:
            proof.observedGrowthEnvelopeRevision,
          reconciledCanonicalRevision: nextCanonicalRevision,
          reconciledFencingToken: nextFencingToken,
          state: "EXPLICIT_DEPARTURE_RECONCILED" as const,
          reconciledAt,
          provenance: Object.freeze({
            departureAuthority:
              "XINMAI_LIVED_GROWTH_TRANSACTION_AUTHORITY" as const,
            realityAuthority:
              "XINMAI_REALITY_ADVENTURE_CONTINUITY" as const,
            crossStoreAtomicityClaim: false as const,
            noActionCompletionClaim: true as const,
          }),
        });
      return Object.freeze({
        status: "COMMIT" as const,
        record: terminalizeXinmaiRealityAdventureLifecycleRecord({
          record,
          terminalReason: "EXPLICIT_LEAVE",
          terminalAt: reconciledAt,
          departureReconciliation: reconciliation,
        }),
        value: Object.freeze({
          status: "RECONCILED" as const,
          reconciliation,
        }),
      });
    },
  });
  if (transaction.status === "SAFE_WITHHELD") {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      reconciliation: null,
      canonicalRevision: null,
      fencingToken: null,
      reason: storageReason(transaction.reason),
    });
  }
  if (transaction.value.status === "REJECTED" || transaction.record === null) {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      reconciliation: null,
      canonicalRevision: null,
      fencingToken: null,
      reason:
        transaction.value.status === "REJECTED"
          ? transaction.value.reason
          : "RECOVERY_CORRUPTED" as const,
    });
  }
  publishRealityAdventureContinuityRevision({
    encounterCycleId: transaction.record.encounterCycleId,
    canonicalRevision: transaction.record.canonicalRevision,
    fencingToken: transaction.record.fencingToken,
  });
  return Object.freeze({
    status: transaction.value.status,
    reconciliation: transaction.value.reconciliation,
    canonicalRevision: transaction.record.canonicalRevision,
    fencingToken: transaction.record.fencingToken,
    reason: null,
  });
}

export async function readXinmaiChoiceDepartureReconciliation(input: Readonly<{
  proof: XinmaiChoiceDepartureReconciliationProof;
}>): Promise<XinmaiRealityAdventureDepartureReconciliationReadResult> {
  const result = await readRealityAdventureContinuity({
    kind: "ENCOUNTER",
    value: input.proof.sourceEncounterCycleId,
  });
  if (result.status === "SAFE_WITHHELD") {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      reconciliation: null,
      reason:
        result.reason === "RECOVERY_CORRUPTED"
          ? "RECOVERY_CORRUPTED" as const
          : "RECOVERY_UNAVAILABLE" as const,
    });
  }
  if (result.status === "NOT_FOUND") {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      reconciliation: null,
      reason: "SOURCE_NOT_FOUND" as const,
    });
  }
  if (!identityMatches(result.record.identityReferences, input.proof.identityReferences)) {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      reconciliation: null,
      reason: "IDENTITY_OR_LINEAGE_MISMATCH" as const,
    });
  }
  const reconciliation =
    "departureReconciliation" in result.record
      ? result.record.departureReconciliation
      : null;
  if (reconciliation === null) {
    return Object.freeze({
      status: "PENDING" as const,
      reconciliation: null,
      reason: "DEPARTURE_RECONCILIATION_PENDING" as const,
    });
  }
  if (
    !proofMatchesReconciliation(input.proof, reconciliation) ||
    result.record.lifecycle !== "TERMINAL" ||
    result.record.activeIdentityKey !== undefined ||
    result.record.terminalReason !== "EXPLICIT_LEAVE"
  ) {
    return Object.freeze({
      status: "SAFE_WITHHELD" as const,
      reconciliation: null,
      reason: "RECONCILIATION_PROOF_MISMATCH" as const,
    });
  }
  return Object.freeze({
    status: "CURRENT" as const,
    reconciliation,
    reason: null,
  });
}

export const XinmaiRealityAdventureLifecycleReconciliationController =
  Object.freeze({
    reconcileExplicitDeparture: reconcileXinmaiChoiceExplicitDeparture,
    readExplicitDeparture: readXinmaiChoiceDepartureReconciliation,
    terminalizeRecord: terminalizeXinmaiRealityAdventureLifecycleRecord,
    activeIdentityKeyReleaseOwner: true as const,
    canonicalWriter:
      "XINMAI_REALITY_ADVENTURE_CONTINUITY_TRANSACTIONAL_STORE" as const,
    crossStoreAtomicityClaim: false as const,
    noBackfill: true as const,
  });
