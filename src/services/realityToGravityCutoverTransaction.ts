import {
  commitRealityEncounterGravitySupersession,
  readCurrentRealityEncounterIntent,
} from "./xinmaiRealityEncounterIntentController";
import {
  commitPreparedGravityTransfer,
  failGravityEntryAcceptance,
  prepareGravityEntryTransfer,
} from "./xinmaiGravityEntryAdmissionController";
import {
  writeRealityToGravityCutoverEnvelope,
} from "./xinmaiGravityEntryRecoveryAdapter";
import type {
  GravityEntryAdmission,
  GravityEntryTransferRequest,
  GravityRouteTicket,
  RealityToGravityCutoverEnvelope,
  RealityToGravityCutoverTransactionResult,
} from "../types/xinmaiGravityEntryAdmission";
import {
  XINMAI_REALITY_TO_GRAVITY_CUTOVER_SCHEMA_VERSION,
  XINMAI_GRAVITY_ROUTE_TICKET_SCHEMA_VERSION,
} from "../types/xinmaiGravityEntryAdmission";

export const REALITY_TO_GRAVITY_CUTOVER_TRANSACTION_BOUNDARY =
  Object.freeze({
    singleDurableCommitPoint: true as const,
    confirmedRecoveryEnvelopeRequired: true as const,
    sourceRealityMustBeActive: true as const,
    targetGravityPreparedBeforeCommit: true as const,
    targetGravityReadyOnlyAfterCommit: true as const,
    sourceRealitySupersededOnlyAfterCommit: true as const,
    noSelectedPressurePersistence: true as const,
    noIdentityMutation: true as const,
    noNavigation: true as const,
    noRendererInvocation: true as const,
    noPressureInference: true as const,
    noChoiceExecution: true as const,
    noCrystalExecution: true as const,
  });

const createReadyAdmission = (
  prepared: GravityEntryAdmission,
): GravityEntryAdmission =>
  Object.freeze({
    ...prepared,
    revision: prepared.revision + 1,
    state: "READY_TO_ENTER_GRAVITY" as const,
    updatedAt: new Date().toISOString(),
    failure: null,
    terminalReason: null,
  });

const createEnvelope = (
  ready: GravityEntryAdmission,
): RealityToGravityCutoverEnvelope =>
  Object.freeze({
    schemaVersion:
      XINMAI_REALITY_TO_GRAVITY_CUTOVER_SCHEMA_VERSION,
    source: "xinmai_gravity_entry_recovery_adapter" as const,
    envelopeReferenceId:
      `gravity-cutover:${ready.gravityCycleId}:${ready.revision}`,
    committedAt: ready.updatedAt,
    expiresAt: ready.expiresAt,
    sourceReality: Object.freeze({
      terminalProof: ready.sourceReality,
      identityReferences: ready.identityReferences,
      supersededByGravityTransfer: true as const,
    }),
    targetGravity: Object.freeze({
      admission: ready,
      identityReferences: ready.identityReferences,
    }),
    integrity: Object.freeze({
      sourceAndTargetIdentityMatch: true as const,
      sourceAndTargetCycleBound: true as const,
      pressureBelongsToSourceReference: true as const,
      bodyApproachBelongsToEncounter: true as const,
      singleRouteTarget: "/dynamics" as const,
    }),
  });

const createRouteTicket = (
  envelope: RealityToGravityCutoverEnvelope,
): GravityRouteTicket =>
  Object.freeze({
    schemaVersion: XINMAI_GRAVITY_ROUTE_TICKET_SCHEMA_VERSION,
    source: "reality_to_gravity_cutover_transaction" as const,
    admissionReferenceId:
      envelope.targetGravity.admission.admissionReferenceId,
    gravityCycleId: envelope.targetGravity.admission.gravityCycleId,
    gravityObservationReferenceId:
      envelope.targetGravity.admission.gravityObservationReferenceId,
    expectedAdmissionRevision:
      envelope.targetGravity.admission.revision,
    identityReferences:
      envelope.targetGravity.admission.identityReferences,
    routeTarget: "/dynamics" as const,
    cutoverEnvelopeReferenceId: envelope.envelopeReferenceId,
    issuedAt: envelope.committedAt,
    expiresAt: envelope.expiresAt,
  });

const failed = (
  status: "RETRYABLE" | "BLOCKED",
  gravityAdmission: GravityEntryAdmission | null,
  realityRemainsActive: boolean,
  reason: Extract<
    RealityToGravityCutoverTransactionResult,
    { status: "RETRYABLE" | "BLOCKED" }
  >["reason"],
): RealityToGravityCutoverTransactionResult =>
  Object.freeze({
    status,
    routeTicket: null,
    gravityAdmission,
    realityRemainsActive,
    reason,
  });

export function executeRealityToGravityCutover(
  request: GravityEntryTransferRequest,
): RealityToGravityCutoverTransactionResult {
  const currentRealityIntent = readCurrentRealityEncounterIntent();
  if (
    currentRealityIntent === null ||
    currentRealityIntent.state !== "ACTIVE_IN_REALITY"
  ) {
    return failed(
      "BLOCKED",
      null,
      false,
      "SOURCE_REALITY_NOT_ACTIVE",
    );
  }

  const preparation = prepareGravityEntryTransfer({
    request,
    currentRealityIntent,
  });
  if (preparation.status !== "PREPARED") {
    return failed(
      "BLOCKED",
      preparation.admission,
      true,
      preparation.reason,
    );
  }

  const ready = createReadyAdmission(preparation.admission);
  const envelope = createEnvelope(ready);
  const durableWrite = writeRealityToGravityCutoverEnvelope(envelope);
  if (durableWrite.status !== "CONFIRMED") {
    const gravityAdmission = failGravityEntryAcceptance({
      admissionReferenceId:
        preparation.admission.admissionReferenceId,
      gravityCycleId: preparation.admission.gravityCycleId,
      admissionRevision: preparation.admission.revision,
      stage: "CUTOVER_RECOVERY",
      reason:
        durableWrite.status === "UNAVAILABLE"
          ? "CUTOVER_STORAGE_UNAVAILABLE"
          : "CUTOVER_WRITE_UNCONFIRMED",
    });
    return failed(
      "RETRYABLE",
      gravityAdmission,
      true,
      durableWrite.status === "UNAVAILABLE"
        ? "CUTOVER_STORAGE_UNAVAILABLE"
        : "CUTOVER_WRITE_UNCONFIRMED",
    );
  }

  const targetCommit = commitPreparedGravityTransfer(envelope);
  if (targetCommit.status !== "READY") {
    return failed(
      "RETRYABLE",
      targetCommit.admission,
      false,
      targetCommit.reason,
    );
  }

  const sourceCommit =
    commitRealityEncounterGravitySupersession(envelope);
  if (sourceCommit.status !== "SUPERSEDED") {
    return failed(
      "RETRYABLE",
      targetCommit.admission,
      false,
      "SOURCE_SUPERSESSION_STALE",
    );
  }

  return Object.freeze({
    status: "COMMITTED" as const,
    routeTicket: createRouteTicket(envelope),
    envelope,
    cleanup: sourceCommit.cleanup,
    reason: null,
  });
}

export const RealityToGravityCutoverTransaction = Object.freeze({
  execute: executeRealityToGravityCutover,
  boundary: REALITY_TO_GRAVITY_CUTOVER_TRANSACTION_BOUNDARY,
});
