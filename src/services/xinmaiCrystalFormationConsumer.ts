import {
  XINMAI_CRYSTAL_FORMATION_RECEIPT_SCHEMA_VERSION,
  type CrystalFormationReceipt,
} from "../types/xinmaiCrystalEligibility";
import type { RealityEncounterIdentityReferences } from "../types/xinmaiRealityEncounterIntent";
import {
  commitXinmaiLivedGrowthTransaction,
  preserveXinmaiLivedGrowthTransaction,
  rejectXinmaiLivedGrowthTransaction,
} from "../types/xinmaiLivedGrowthTransaction";
import { resolveDynamicsCurrentCrystalEndState } from "./guanyaoDynamicsCrystalRuntimeAdapter";
import { reconcileCanonicalFormationReceiptsToPersonalityRing } from "./guanyaoDynamicsPersonalityRingDepositAdapter";
import { xinmaiGrowthIdentityMatches } from "./xinmaiLivedGrowthIdentity";
import { createStableXinmaiGrowthReference } from "./xinmaiLivedGrowthReference";
import { executeXinmaiLivedGrowthTransaction } from "./xinmaiLivedGrowthTransactionAuthority";

export const XINMAI_CRYSTAL_FORMATION_AUTHORITY_MODE =
  "FORMAL_AUTHORITY" as const;

export type XinmaiCrystalFormationResult =
  | Readonly<{
      status: "FORMED" | "ALREADY_FORMED";
      receipt: CrystalFormationReceipt;
      reason: null;
    }>
  | Readonly<{
      status: "SAFE_WITHHELD";
      receipt: null;
      reason:
        | "TRANSACTION_STORAGE_UNAVAILABLE"
        | "TRANSACTION_OPEN_BLOCKED"
        | "TRANSACTION_ABORTED"
        | "TRANSACTION_CONNECTION_CLOSED"
        | "ELIGIBILITY_NOT_CURRENT"
        | "PROVENANCE_MISMATCH"
        | "RECOVERY_UNAVAILABLE"
        | "RECOVERY_CORRUPTED"
        | "LEGACY_IMPORT_CONFLICT"
        | "LEGACY_WRITER_DETECTED"
        | "CANONICAL_UNIQUENESS_VIOLATION"
        | "WRITE_UNCONFIRMED"
        | "CRYSTAL_ENGINE_UNAVAILABLE"
        | "LEGACY_MULTIPLE_FORMATION_RECEIPTS";
    }>;

const safeWithheld = (
  reason: Extract<
    XinmaiCrystalFormationResult,
    { status: "SAFE_WITHHELD" }
  >["reason"],
): XinmaiCrystalFormationResult =>
  Object.freeze({ status: "SAFE_WITHHELD" as const, receipt: null, reason });

const projectReceipt = async (
  receipt: CrystalFormationReceipt,
  canonicalReceipts: readonly CrystalFormationReceipt[],
): Promise<CrystalFormationReceipt> => {
  if (receipt.projection === "PROJECTED") return receipt;
  const mirror =
    reconcileCanonicalFormationReceiptsToPersonalityRing(
      canonicalReceipts,
    );
  const projection =
    mirror.status === "RECONCILED" ? "PROJECTED" : "RETRYABLE";
  const transaction = await executeXinmaiLivedGrowthTransaction(
    Object.freeze({
      commandReferenceId: createStableXinmaiGrowthReference(
        "growth-command:project-crystal",
        receipt.formationReferenceId,
      ),
      commandType: "UPDATE_CRYSTAL_PROJECTION" as const,
      identityReferences: receipt.identityReferences,
      issuedAt: new Date().toISOString(),
    }),
    (current) => {
      const currentReceipt = current.formationReceipts.find(
        (candidate) =>
          candidate.formationReferenceId ===
          receipt.formationReferenceId,
      );
      if (
        !currentReceipt ||
        !xinmaiGrowthIdentityMatches(
          currentReceipt.identityReferences,
          receipt.identityReferences,
        )
      ) {
        return rejectXinmaiLivedGrowthTransaction(
          "PROVENANCE_MISMATCH",
        );
      }
      if (currentReceipt.projection === "PROJECTED") {
        return preserveXinmaiLivedGrowthTransaction(currentReceipt);
      }
      const updated: CrystalFormationReceipt = Object.freeze({
        ...currentReceipt,
        projection,
        projectionUpdatedAt: new Date().toISOString(),
      });
      return commitXinmaiLivedGrowthTransaction(
        {
          ...current,
          formationReceipts: Object.freeze(
            current.formationReceipts.map((candidate) =>
              candidate.formationReferenceId ===
              receipt.formationReferenceId
                ? updated
                : candidate,
            ),
          ),
        },
        updated,
      );
    },
  );
  return transaction.status === "COMMITTED" ||
    transaction.status === "ALREADY_COMMITTED"
    ? transaction.value
    : receipt;
};

export async function formCrystalFromEligibility(input: Readonly<{
  crystalEligibilityReferenceId: string;
  expectedEligibilityRevision: number;
  identityReferences: RealityEncounterIdentityReferences;
}>): Promise<XinmaiCrystalFormationResult> {
  let crystalEngineUnavailable = false;
  const transaction = await executeXinmaiLivedGrowthTransaction(
    Object.freeze({
      commandReferenceId: createStableXinmaiGrowthReference(
        "growth-command:form-crystal",
        input.crystalEligibilityReferenceId,
        String(input.expectedEligibilityRevision),
      ),
      commandType: "FORM_CRYSTAL" as const,
      identityReferences: input.identityReferences,
      issuedAt: new Date().toISOString(),
    }),
    (current) => {
      const eligibility = current.crystalEligibilities.find(
        (candidate) =>
          candidate.crystalEligibilityReferenceId ===
          input.crystalEligibilityReferenceId,
      );
      if (!eligibility) {
        return rejectXinmaiLivedGrowthTransaction(
          "ELIGIBILITY_NOT_CURRENT",
        );
      }
      if (
        !xinmaiGrowthIdentityMatches(
          eligibility.identityReferences,
          input.identityReferences,
        )
      ) {
        return rejectXinmaiLivedGrowthTransaction("PROVENANCE_MISMATCH");
      }
      const lineageReceipts = current.formationReceipts.filter(
        (receipt) =>
          receipt.choiceActionIntentionReferenceId ===
          eligibility.choiceActionIntentionReferenceId,
      );
      if (lineageReceipts.length > 1) {
        return rejectXinmaiLivedGrowthTransaction(
          "LEGACY_MULTIPLE_FORMATION_RECEIPTS",
        );
      }
      if (lineageReceipts.length === 1) {
        const existing = lineageReceipts[0];
        if (
          !xinmaiGrowthIdentityMatches(
            existing.identityReferences,
            input.identityReferences,
          )
        ) {
          return rejectXinmaiLivedGrowthTransaction(
            "PROVENANCE_MISMATCH",
          );
        }
        return preserveXinmaiLivedGrowthTransaction(existing);
      }
      if (
        eligibility.eligibilityRevision !==
          input.expectedEligibilityRevision ||
        (eligibility.state !== "ELIGIBLE" &&
          eligibility.state !== "FORMATION_PENDING")
      ) {
        return rejectXinmaiLivedGrowthTransaction(
          "ELIGIBILITY_NOT_CURRENT",
        );
      }
      const fact = current.livedResponseFacts.find(
        (candidate) =>
          candidate.livedResponseReferenceId ===
            eligibility.livedResponseReferenceId &&
          candidate.userConfirmationRevision ===
            eligibility.livedResponseRevision &&
          candidate.state === "CONFIRMED",
      );
      const intention = current.choiceActionIntentions.find(
        (candidate) =>
          candidate.choiceActionIntentionReferenceId ===
          eligibility.choiceActionIntentionReferenceId,
      );
      if (
        !fact ||
        !intention ||
        !xinmaiGrowthIdentityMatches(
          fact.identityReferences,
          input.identityReferences,
        ) ||
        !xinmaiGrowthIdentityMatches(
          intention.identityReferences,
          input.identityReferences,
        ) ||
        fact.gravityObservationReferenceId !==
          intention.gravityObservationReferenceId ||
        fact.targetEncounterCycleId !==
          intention.targetEncounterCycleId ||
        fact.choiceActionIntentionReferenceId !==
          intention.choiceActionIntentionReferenceId
      ) {
        return rejectXinmaiLivedGrowthTransaction(
          "PROVENANCE_MISMATCH",
        );
      }
      const formationKey =
        `${eligibility.crystalEligibilityReferenceId}:` +
        eligibility.eligibilityRevision;
      const formationReferenceId = createStableXinmaiGrowthReference(
        "crystal-formation",
        formationKey,
      );
      const crystalReferenceId = createStableXinmaiGrowthReference(
        "crystal",
        formationKey,
      );
      const reservationReferenceId =
        createStableXinmaiGrowthReference(
          "crystal-reservation",
          formationKey,
        );
      const formedAt =
        eligibility.reservation?.reservedAt ?? new Date().toISOString();
      const fencingToken =
        eligibility.reservation?.fencingToken ?? current.revision + 1;
      if (
        eligibility.state === "FORMATION_PENDING" &&
        (eligibility.reservation?.reservationReferenceId !==
          reservationReferenceId ||
          eligibility.reservation.formationReferenceId !==
            formationReferenceId ||
          eligibility.reservation.crystalReferenceId !==
            crystalReferenceId)
      ) {
        return rejectXinmaiLivedGrowthTransaction(
          "PROVENANCE_MISMATCH",
        );
      }
      const formedCrystal = resolveDynamicsCurrentCrystalEndState({
        formationSourceSnapshot: intention.formationSourceSnapshot,
        formationAuthorization: {
          authority: "XINMAI_CRYSTAL_ELIGIBILITY",
          status: "AUTHORIZED",
          crystalEligibilityReferenceId:
            eligibility.crystalEligibilityReferenceId,
          eligibilityRevision: eligibility.eligibilityRevision,
          livedResponseReferenceId: fact.livedResponseReferenceId,
          formationReferenceId,
          crystalReferenceId,
          formedAt,
        },
      });
      if (!formedCrystal) {
        crystalEngineUnavailable = true;
        return rejectXinmaiLivedGrowthTransaction(
          "CRYSTAL_ENGINE_UNAVAILABLE",
        );
      }
      const receipt: CrystalFormationReceipt = Object.freeze({
        schemaVersion:
          XINMAI_CRYSTAL_FORMATION_RECEIPT_SCHEMA_VERSION,
        source: "xinmai_crystal_formation_consumer" as const,
        formationReferenceId,
        crystalReferenceId,
        crystalEligibilityReferenceId:
          eligibility.crystalEligibilityReferenceId,
        eligibilityRevision: eligibility.eligibilityRevision,
        livedResponseReferenceId: fact.livedResponseReferenceId,
        choiceActionIntentionReferenceId:
          intention.choiceActionIntentionReferenceId,
        identityReferences: eligibility.identityReferences,
        formationKey,
        fencingToken,
        formedCrystal,
        status: "FORMED" as const,
        formedAt,
        projection: "PENDING" as const,
        projectionUpdatedAt: formedAt,
        provenance: Object.freeze({
          factAuthority: "XINMAI_LIVED_RESPONSE_FACT" as const,
          eligibilityAuthority:
            "XINMAI_CRYSTAL_ELIGIBILITY" as const,
          deterministicFormation: true as const,
          noBackfill: true as const,
        }),
      });
      return commitXinmaiLivedGrowthTransaction(
        {
          ...current,
          crystalEligibilities: Object.freeze(
            current.crystalEligibilities.map((candidate) =>
              candidate.crystalEligibilityReferenceId ===
              eligibility.crystalEligibilityReferenceId
                ? Object.freeze({
                    ...candidate,
                    state: "CONSUMED" as const,
                    reservation: Object.freeze({
                      reservationReferenceId,
                      formationReferenceId,
                      crystalReferenceId,
                      fencingToken,
                      reservedAt: formedAt,
                    }),
                    consumedByFormationReferenceId:
                      formationReferenceId,
                    updatedAt: formedAt,
                  })
                : candidate,
            ),
          ),
          formationReceipts: Object.freeze([
            ...current.formationReceipts,
            receipt,
          ]),
        },
        receipt,
      );
    },
  );
  if (
    transaction.status === "COMMITTED" ||
    transaction.status === "ALREADY_COMMITTED"
  ) {
    const projected = await projectReceipt(
      transaction.value,
      transaction.envelope.formationReceipts,
    );
    return Object.freeze({
      status:
        transaction.status === "COMMITTED"
          ? "FORMED" as const
          : "ALREADY_FORMED" as const,
      receipt: projected,
      reason: null,
    });
  }
  if (
    transaction.status === "REJECTED" &&
    transaction.reason === "CRYSTAL_ENGINE_UNAVAILABLE" &&
    crystalEngineUnavailable
  ) {
    return safeWithheld("CRYSTAL_ENGINE_UNAVAILABLE");
  }
  if (transaction.status === "REJECTED") {
    return safeWithheld(
      transaction.reason === "LEGACY_MULTIPLE_FORMATION_RECEIPTS"
        ? "LEGACY_MULTIPLE_FORMATION_RECEIPTS"
        : transaction.reason === "PROVENANCE_MISMATCH"
          ? "PROVENANCE_MISMATCH"
          : "ELIGIBILITY_NOT_CURRENT",
    );
  }
  return safeWithheld(transaction.reason);
}
