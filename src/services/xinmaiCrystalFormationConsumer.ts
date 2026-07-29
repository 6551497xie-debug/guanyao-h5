import {
  XINMAI_CRYSTAL_FORMATION_RECEIPT_SCHEMA_VERSION,
  type CrystalEligibility,
  type CrystalFormationReceipt,
} from "../types/xinmaiCrystalEligibility";
import type { RealityEncounterIdentityReferences } from "../types/xinmaiRealityEncounterIntent";
import { resolveDynamicsCurrentCrystalEndState } from "./guanyaoDynamicsCrystalRuntimeAdapter";
import { depositDynamicsCurrentCrystalToPersonalityRing } from "./guanyaoDynamicsPersonalityRingDepositAdapter";
import {
  readXinmaiLivedGrowthRecoveryCandidate,
  transactXinmaiLivedGrowthRecovery,
} from "./xinmaiLivedGrowthRecoveryPersistenceAdapter";
import { createStableXinmaiGrowthReference } from "./xinmaiLivedGrowthReference";
import { xinmaiGrowthIdentityMatches } from "./xinmaiChoiceActionIntentionController";

export const XINMAI_CRYSTAL_FORMATION_AUTHORITY_MODE =
  "FORMAL_AUTHORITY" as const;

type BrowserLockManager = Readonly<{
  request: <T>(
    name: string,
    options: Readonly<{ mode: "exclusive" }>,
    callback: () => Promise<T>,
  ) => Promise<T>;
}>;

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
        | "FORMATION_LOCK_UNAVAILABLE"
        | "ELIGIBILITY_NOT_CURRENT"
        | "PROVENANCE_MISMATCH"
        | "RECOVERY_UNAVAILABLE"
        | "RESERVATION_UNCONFIRMED"
        | "CRYSTAL_ENGINE_UNAVAILABLE"
        | "RECEIPT_UNCONFIRMED";
    }>;

const safeWithheld = (
  reason: Extract<
    XinmaiCrystalFormationResult,
    { status: "SAFE_WITHHELD" }
  >["reason"],
): XinmaiCrystalFormationResult =>
  Object.freeze({ status: "SAFE_WITHHELD" as const, receipt: null, reason });

const projectReceipt = (
  receipt: CrystalFormationReceipt,
): CrystalFormationReceipt => {
  const result = depositDynamicsCurrentCrystalToPersonalityRing({
    formationReceipt: receipt,
  });
  const projection =
    result.status === "DEPOSITED" || result.status === "DUPLICATE"
      ? "PROJECTED"
      : "RETRYABLE";
  const updated: CrystalFormationReceipt = Object.freeze({
    ...receipt,
    projection,
    projectionUpdatedAt: new Date().toISOString(),
  });
  const write = transactXinmaiLivedGrowthRecovery((current) => ({
    ...current,
    formationReceipts: Object.freeze(
      current.formationReceipts.map((candidate) =>
        candidate.formationReferenceId === receipt.formationReferenceId
          ? updated
          : candidate,
      ),
    ),
  }));
  return write.status === "CONFIRMED" ? updated : receipt;
};

async function formUnderLock(input: Readonly<{
  crystalEligibilityReferenceId: string;
  expectedEligibilityRevision: number;
  identityReferences: RealityEncounterIdentityReferences;
}>): Promise<XinmaiCrystalFormationResult> {
  const recovered = readXinmaiLivedGrowthRecoveryCandidate();
  if (recovered.status !== "FOUND") {
    return safeWithheld("RECOVERY_UNAVAILABLE");
  }
  const previousReceipt = recovered.envelope.formationReceipts.find(
    (receipt) =>
      receipt.crystalEligibilityReferenceId ===
      input.crystalEligibilityReferenceId,
  );
  if (previousReceipt) {
    return Object.freeze({
      status: "ALREADY_FORMED" as const,
      receipt:
        previousReceipt.projection === "PROJECTED"
          ? previousReceipt
          : projectReceipt(previousReceipt),
      reason: null,
    });
  }
  let eligibility = recovered.envelope.crystalEligibilities.find(
    (candidate) =>
      candidate.crystalEligibilityReferenceId ===
      input.crystalEligibilityReferenceId,
  );
  if (
    !eligibility ||
    eligibility.eligibilityRevision !== input.expectedEligibilityRevision ||
    (eligibility.state !== "ELIGIBLE" &&
      eligibility.state !== "FORMATION_PENDING")
  ) {
    return safeWithheld("ELIGIBILITY_NOT_CURRENT");
  }
  const fact = recovered.envelope.livedResponseFacts.find(
    (candidate) =>
      candidate.livedResponseReferenceId ===
        eligibility?.livedResponseReferenceId &&
      candidate.userConfirmationRevision ===
        eligibility?.livedResponseRevision &&
      candidate.state === "CONFIRMED",
  );
  const intention = recovered.envelope.choiceActionIntentions.find(
    (candidate) =>
      candidate.choiceActionIntentionReferenceId ===
      eligibility?.choiceActionIntentionReferenceId,
  );
  if (
    !fact ||
    !intention ||
    !xinmaiGrowthIdentityMatches(
      eligibility.identityReferences,
      input.identityReferences,
    ) ||
    !xinmaiGrowthIdentityMatches(fact.identityReferences, input.identityReferences) ||
    !xinmaiGrowthIdentityMatches(
      intention.identityReferences,
      input.identityReferences,
    ) ||
    fact.gravityObservationReferenceId !==
      intention.gravityObservationReferenceId ||
    fact.targetEncounterCycleId !== intention.targetEncounterCycleId
  ) {
    return safeWithheld("PROVENANCE_MISMATCH");
  }
  const formationKey = `${eligibility.crystalEligibilityReferenceId}:${eligibility.eligibilityRevision}`;
  const formationReferenceId = createStableXinmaiGrowthReference(
    "crystal-formation",
    formationKey,
  );
  const crystalReferenceId = createStableXinmaiGrowthReference(
    "crystal",
    formationKey,
  );
  const reservationReferenceId = createStableXinmaiGrowthReference(
    "crystal-reservation",
    formationKey,
  );
  const reservedAt =
    eligibility.reservation?.reservedAt ?? new Date().toISOString();
  const fencingToken =
    eligibility.reservation?.fencingToken ?? recovered.envelope.revision + 1;

  if (eligibility.state === "ELIGIBLE") {
    let reserved: CrystalEligibility | null = null;
    const reservationWrite = transactXinmaiLivedGrowthRecovery((current) => ({
      ...current,
      crystalEligibilities: Object.freeze(
        current.crystalEligibilities.map((candidate) => {
          if (
            candidate.crystalEligibilityReferenceId !==
              eligibility?.crystalEligibilityReferenceId ||
            candidate.eligibilityRevision !== eligibility.eligibilityRevision ||
            candidate.state !== "ELIGIBLE"
          ) return candidate;
          reserved = Object.freeze({
            ...candidate,
            state: "FORMATION_PENDING" as const,
            reservation: Object.freeze({
              reservationReferenceId,
              formationReferenceId,
              crystalReferenceId,
              fencingToken,
              reservedAt,
            }),
            updatedAt: reservedAt,
          });
          return reserved;
        }),
      ),
    }));
    if (reservationWrite.status !== "CONFIRMED" || reserved === null) {
      return safeWithheld("RESERVATION_UNCONFIRMED");
    }
    eligibility = reserved;
  } else if (
    eligibility.reservation?.reservationReferenceId !==
      reservationReferenceId ||
    eligibility.reservation.formationReferenceId !== formationReferenceId ||
    eligibility.reservation.crystalReferenceId !== crystalReferenceId
  ) {
    return safeWithheld("PROVENANCE_MISMATCH");
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
      formedAt: reservedAt,
    },
  });
  if (!formedCrystal) return safeWithheld("CRYSTAL_ENGINE_UNAVAILABLE");

  const receipt: CrystalFormationReceipt = Object.freeze({
    schemaVersion: XINMAI_CRYSTAL_FORMATION_RECEIPT_SCHEMA_VERSION,
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
    formedAt: reservedAt,
    projection: "PENDING" as const,
    projectionUpdatedAt: reservedAt,
    provenance: Object.freeze({
      factAuthority: "XINMAI_LIVED_RESPONSE_FACT" as const,
      eligibilityAuthority: "XINMAI_CRYSTAL_ELIGIBILITY" as const,
      deterministicFormation: true as const,
      noBackfill: true as const,
    }),
  });
  let committed = false;
  const receiptWrite = transactXinmaiLivedGrowthRecovery((current) => {
    const eligibilities = current.crystalEligibilities.map((candidate) => {
      if (
        candidate.crystalEligibilityReferenceId !==
          eligibility?.crystalEligibilityReferenceId ||
        candidate.state !== "FORMATION_PENDING" ||
        candidate.reservation?.reservationReferenceId !==
          reservationReferenceId ||
        candidate.reservation.fencingToken !== fencingToken
      ) return candidate;
      committed = true;
      return Object.freeze({
        ...candidate,
        state: "CONSUMED" as const,
        consumedByFormationReferenceId: formationReferenceId,
        updatedAt: new Date().toISOString(),
      });
    });
    return {
      ...current,
      crystalEligibilities: Object.freeze(eligibilities),
      formationReceipts: committed
        ? Object.freeze([...current.formationReceipts, receipt])
        : current.formationReceipts,
    };
  });
  if (
    receiptWrite.status !== "CONFIRMED" ||
    !committed ||
    !receiptWrite.envelope.formationReceipts.some(
      (candidate) =>
        candidate.formationReferenceId === formationReferenceId,
    )
  ) {
    return safeWithheld("RECEIPT_UNCONFIRMED");
  }
  return Object.freeze({
    status: "FORMED" as const,
    receipt: projectReceipt(receipt),
    reason: null,
  });
}

export async function formCrystalFromEligibility(input: Readonly<{
  crystalEligibilityReferenceId: string;
  expectedEligibilityRevision: number;
  identityReferences: RealityEncounterIdentityReferences;
}>): Promise<XinmaiCrystalFormationResult> {
  const locks =
    typeof navigator === "undefined"
      ? undefined
      : (navigator as unknown as { locks?: BrowserLockManager }).locks;
  if (!locks) return safeWithheld("FORMATION_LOCK_UNAVAILABLE");
  return locks.request(
    `xinmai-crystal-formation:${input.crystalEligibilityReferenceId}:${input.expectedEligibilityRevision}`,
    { mode: "exclusive" },
    () => formUnderLock(input),
  );
}
