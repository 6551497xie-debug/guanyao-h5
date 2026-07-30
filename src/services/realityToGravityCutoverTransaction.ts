import type {
  GravityEntryAdmission,
  GravityEntryFailureReason,
  GravityEntryTransferRequest,
  GravityRouteTicket,
  RealityToGravityCutoverEnvelope,
  RealityToGravityCutoverTransactionResult,
} from "../types/xinmaiGravityEntryAdmission";
import {
  XINMAI_GRAVITY_ENTRY_ADMISSION_SCHEMA_VERSION,
  XINMAI_GRAVITY_ROUTE_TICKET_SCHEMA_VERSION,
  XINMAI_REALITY_TO_GRAVITY_CUTOVER_SCHEMA_VERSION,
} from "../types/xinmaiGravityEntryAdmission";
import type {
  RealityAdventureContinuityMutationDecision,
  RealityToGravityTransferProof,
} from "../types/xinmaiRealityAdventureContinuity";
import {
  transactRealityAdventureContinuity,
} from "./xinmaiRealityAdventureContinuityTransactionalStore";
import {
  publishRealityAdventureContinuityRevision,
} from "./xinmaiRealityAdventureContinuityRevisionObserver";

export const REALITY_TO_GRAVITY_CUTOVER_TRANSACTION_BOUNDARY =
  Object.freeze({
    singleCanonicalCommitPoint: true as const,
    indexedDbReadwriteTransactionRequired: true as const,
    transactionCompleteSuccessOnly: true as const,
    currentRecognitionReceiptRequired: true as const,
    deterministicTransferAndAdmissionReferences: true as const,
    sourceRealitySupersededAtomically: true as const,
    targetGravityAdmissionCreatedAtomically: true as const,
    noSessionStorageAuthority: true as const,
    noSelectedPressureInference: true as const,
    noIdentityMutation: true as const,
    noNavigation: true as const,
    noRendererInvocation: true as const,
    noChoiceExecution: true as const,
    noCrystalExecution: true as const,
  });

const identityMatches = (
  left: GravityEntryTransferRequest["identityReferences"],
  right: GravityEntryTransferRequest["identityReferences"],
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

const failed = (
  status: "RETRYABLE" | "BLOCKED",
  gravityAdmission: GravityEntryAdmission | null,
  realityRemainsActive: boolean,
  reason: GravityEntryFailureReason,
): RealityToGravityCutoverTransactionResult =>
  Object.freeze({
    status,
    routeTicket: null,
    gravityAdmission,
    realityRemainsActive,
    reason,
  });

const createEnvelope = (
  admission: GravityEntryAdmission,
): RealityToGravityCutoverEnvelope =>
  Object.freeze({
    schemaVersion:
      XINMAI_REALITY_TO_GRAVITY_CUTOVER_SCHEMA_VERSION,
    source:
      "xinmai_reality_adventure_continuity_transactional_store" as const,
    envelopeReferenceId:
      `gravity-cutover:${admission.admissionReferenceId}`,
    committedAt: admission.updatedAt,
    expiresAt: admission.expiresAt,
    sourceReality: Object.freeze({
      terminalProof: admission.sourceReality,
      identityReferences: admission.identityReferences,
      supersededByGravityTransfer: true as const,
    }),
    targetGravity: Object.freeze({
      admission,
      identityReferences: admission.identityReferences,
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
    gravityCycleId:
      envelope.targetGravity.admission.gravityCycleId,
    gravityObservationReferenceId:
      envelope.targetGravity.admission
        .gravityObservationReferenceId,
    expectedAdmissionRevision:
      envelope.targetGravity.admission.revision,
    identityReferences:
      envelope.targetGravity.admission.identityReferences,
    routeTarget: "/dynamics" as const,
    cutoverEnvelopeReferenceId:
      envelope.envelopeReferenceId,
    issuedAt: envelope.committedAt,
    expiresAt: envelope.expiresAt,
  });

type CutoverValue =
  | Readonly<{
      status: "COMMITTED";
      admission: GravityEntryAdmission;
    }>
  | Readonly<{
      status: "RETRYABLE" | "BLOCKED";
      admission: GravityEntryAdmission | null;
      reason: GravityEntryFailureReason;
    }>;

const reject = (
  status: "RETRYABLE" | "BLOCKED",
  reason: GravityEntryFailureReason,
  admission: GravityEntryAdmission | null,
): RealityAdventureContinuityMutationDecision<CutoverValue> =>
  Object.freeze({
    status: "REJECTED" as const,
    record: null,
    value: Object.freeze({ status, admission, reason }),
  });

export async function executeRealityToGravityCutover(
  request: GravityEntryTransferRequest,
): Promise<RealityToGravityCutoverTransactionResult> {
  const pressure = request.pressureSession;
  if (
    request.schemaVersion !==
      "XINMAI_GRAVITY_ENTRY_TRANSFER_REQUEST_V1" ||
    request.source !== "reality_production_host" ||
    request.userExplicitRequest !== true ||
    request.sourceReality.state !== "ACTIVE_IN_REALITY"
  ) {
    return failed(
      "BLOCKED",
      null,
      false,
      "SOURCE_REALITY_NOT_ACTIVE",
    );
  }
  const selectedPressureSeedContext =
    pressure.selectedPressureSeedContext;
  const captureProvenance = pressure.captureProvenance;
  if (
    selectedPressureSeedContext === null ||
    captureProvenance === null
  ) {
    return failed(
      "BLOCKED",
      null,
      true,
      "PRESSURE_NOT_RECOGNIZED",
    );
  }
  if (
    request.identityReferences.sourceReferenceId !==
      pressure.sourceReferenceId ||
    request.visualContinuity.sourceReferenceId !==
      request.identityReferences.sourceReferenceId
  ) {
    return failed("BLOCKED", null, true, "IDENTITY_MISMATCH");
  }
  if (
    pressure.captureState !== "SEED_RECOGNIZED" ||
    pressure.gravityReadiness !== "READY" ||
    pressure.selectedPressureSeedContext === null ||
    pressure.captureProvenance === null
  ) {
    return failed(
      "BLOCKED",
      null,
      true,
      "PRESSURE_NOT_RECOGNIZED",
    );
  }
  if (
    request.bodyApproachProof.source !==
      "reality_inner_view_approach" ||
    request.bodyApproachProof.bodyApproachConfirmed !== true ||
    request.bodyApproachProof.innerViewEntry !==
      "CURRENT_LIFE_WEATHER_BODY_APPROACHED" ||
    request.bodyApproachProof.encounterCycleId !==
      request.sourceReality.encounterCycleId
  ) {
    return failed(
      "BLOCKED",
      null,
      true,
      "BODY_APPROACH_NOT_CONFIRMED",
    );
  }

  const transaction =
    await transactRealityAdventureContinuity<CutoverValue>({
      lookup: Object.freeze({
        kind: "ENCOUNTER" as const,
        value: request.sourceReality.encounterCycleId,
      }),
      mutate: (record) => {
        if (record === null) {
          return reject(
            "BLOCKED",
            "SOURCE_REALITY_NOT_ACTIVE",
            null,
          );
        }
        const intent = record.realityIntent;
        if (
          !identityMatches(
            record.identityReferences,
            request.identityReferences,
          )
        ) {
          return reject(
            "BLOCKED",
            "IDENTITY_MISMATCH",
            record.gravityAdmission,
          );
        }
        if (
          record.gravityTransfer !== null &&
          record.gravityAdmission !== null &&
          record.gravityTransfer.recognitionReceiptReferenceId ===
            request.recognitionReceiptReferenceId
        ) {
          return Object.freeze({
            status: "UNCHANGED" as const,
            record,
            value: Object.freeze({
              status: "COMMITTED" as const,
              admission: record.gravityAdmission,
            }),
          });
        }
        if (
          intent.state !== "ACTIVE_IN_REALITY" ||
          record.lifecycle !== "PRESSURE_RECOGNIZED"
        ) {
          return reject(
            "BLOCKED",
            "SOURCE_REALITY_NOT_ACTIVE",
            record.gravityAdmission,
          );
        }
        const receipt = record.recognitionReceipt;
        if (
          receipt === null ||
          receipt.lifecycle !== "RECOGNIZED" ||
          receipt.recognitionReceiptReferenceId !==
            request.recognitionReceiptReferenceId ||
          receipt.revision !==
            request.recognitionReceiptRevision ||
          record.candidateRevision === null ||
          record.candidateRevision.candidateReferenceId !==
            captureProvenance.candidateReferenceId ||
          record.candidateRevision
            .candidateRevisionReferenceId !==
            captureProvenance.candidateRevisionReferenceId
        ) {
          return reject(
            "BLOCKED",
            "PRESSURE_SESSION_NOT_CURRENT",
            record.gravityAdmission,
          );
        }
        if (
          record.canonicalRevision !==
          request.expectedCanonicalRevision
        ) {
          return reject(
            "RETRYABLE",
            "SOURCE_SUPERSESSION_STALE",
            record.gravityAdmission,
          );
        }

        const digest = deterministicDigest(
          JSON.stringify([
            record.encounterCycleId,
            receipt.recognitionReceiptReferenceId,
          ]),
        );
        const gravityTransferReferenceId =
          `gravity-transfer:${digest}`;
        const admissionReferenceId =
          `gravity-admission:${digest}`;
        const gravityCycleId = `gravity-cycle:${digest}`;
        const gravityObservationReferenceId =
          `gravity-observation:${digest}`;
        const committedAt = new Date().toISOString();
        const admission: GravityEntryAdmission = Object.freeze({
          schemaVersion:
            XINMAI_GRAVITY_ENTRY_ADMISSION_SCHEMA_VERSION,
          source:
            "reality_to_gravity_entry_admission_controller" as const,
          admissionReferenceId,
          gravityCycleId,
          gravityObservationReferenceId,
          revision: 1,
          state: "READY_TO_ENTER_GRAVITY" as const,
          routeTarget: "/dynamics" as const,
          identityReferences: Object.freeze({
            ...record.identityReferences,
          }),
          sourceReality: Object.freeze({
            intentReferenceId: intent.intentReferenceId,
            encounterCycleId: intent.encounterCycleId,
            intentRevision: intent.revision,
            origin: intent.origin,
            qualification: intent.qualification,
            choiceActionIntentionReferenceId:
              intent.choiceActionIntentionReferenceId,
            sourceState: "ACTIVE_IN_REALITY" as const,
            terminalReason: "ENCOUNTER_COMPLETED" as const,
            cutoverMeaning:
              "SUPERSEDED_BY_GRAVITY_TRANSFER" as const,
            activeConfirmed: true as const,
          }),
          currentPressure: Object.freeze({
            pressureSessionSchemaVersion:
              "GUANYAO_REALITY_PRODUCTION_PRESSURE_SEED_SESSION_V2" as const,
            sourceReferenceId: pressure.sourceReferenceId,
            candidateBundleReferenceId:
              pressure.candidateBundleReferenceId,
            selectedPressureSeedId:
              selectedPressureSeedContext
                .selectedPressureSeedId ??
              captureProvenance.candidateReferenceId,
            captureProvenance:
              captureProvenance,
            gravityReadiness: "READY" as const,
            userRecognitionConfirmed: true as const,
            selectedPressureSeedContext: Object.freeze({
              ...selectedPressureSeedContext,
            }),
          }),
          bodyApproach: request.bodyApproachProof,
          issuedAt: committedAt,
          updatedAt: committedAt,
          expiresAt: record.expiresAt,
          failure: null,
          terminalReason: null,
          provenance: Object.freeze({
            userExplicitRequest: true as const,
            identityAuthority:
              "EXISTING_RECOGNIZED_LIFE" as const,
            realityAuthority:
              "XINMAI_REALITY_ENCOUNTER_INTENT" as const,
            pressureAuthority:
              "REALITY_PRESSURE_SEED_SESSION_V2" as const,
            bodyApproachAuthority:
              "REALITY_INNER_VIEW_APPROACH" as const,
            noIdentityMutation: true as const,
            noPressureInference: true as const,
            noAutomaticSelection: true as const,
            noChoiceExecution: true as const,
            noCrystalExecution: true as const,
            noLegacyDynamicsAuthority: true as const,
          }),
        });
        const transfer: RealityToGravityTransferProof =
          Object.freeze({
            schemaVersion:
              "XINMAI_REALITY_TO_GRAVITY_TRANSFER_PROOF_V1" as const,
            source:
              "xinmai_reality_to_gravity_continuity_controller" as const,
            gravityTransferReferenceId,
            recognitionReceiptReferenceId:
              receipt.recognitionReceiptReferenceId,
            recognitionReceiptRevision: receipt.revision,
            encounterCycleId: record.encounterCycleId,
            identityReferences: Object.freeze({
              ...record.identityReferences,
            }),
            bodyApproachProof: request.bodyApproachProof,
            requestedAt: request.requestedAt,
            committedAt,
            routeTarget: "/dynamics" as const,
            provenance: Object.freeze({
              explicitBodyApproachRequired: true as const,
              sourceRealitySupersededAtomically: true as const,
              admissionCreatedAtomically: true as const,
              noGrowthAuthority: true as const,
            }),
          });
        const consumedReceipt = Object.freeze({
          ...receipt,
          revision: receipt.revision + 1,
          lifecycle:
            "CONSUMED_BY_GRAVITY_TRANSFER" as const,
          updatedAt: committedAt,
          consumedGravityTransferReferenceId:
            gravityTransferReferenceId,
          consumedGravityAdmissionReferenceId:
            admissionReferenceId,
        });
        const terminalIntent = Object.freeze({
          ...intent,
          state: "TERMINAL" as const,
          updatedAt: committedAt,
          revision: intent.revision + 1,
          failure: null,
          terminalReason: "ENCOUNTER_COMPLETED" as const,
        });
        return Object.freeze({
          status: "COMMIT" as const,
          record: Object.freeze({
            ...record,
            canonicalRevision:
              record.canonicalRevision + 1,
            fencingToken: record.fencingToken + 1,
            realityIntent: terminalIntent,
            recognitionReceipt: consumedReceipt,
            gravityTransfer: transfer,
            gravityAdmission: admission,
            lifecycle: "GRAVITY_ADMITTED" as const,
            updatedAt: committedAt,
            terminalReason: "ENCOUNTER_COMPLETED" as const,
          }),
          value: Object.freeze({
            status: "COMMITTED" as const,
            admission,
          }),
        });
      },
    });
  if (transaction.status === "SAFE_WITHHELD") {
    return failed(
      "RETRYABLE",
      null,
      true,
      "CUTOVER_STORAGE_UNAVAILABLE",
    );
  }
  if (transaction.value.status !== "COMMITTED") {
    return failed(
      transaction.value.status,
      transaction.value.admission,
      true,
      transaction.value.reason,
    );
  }
  const envelope = createEnvelope(transaction.value.admission);
  if (transaction.record !== null) {
    publishRealityAdventureContinuityRevision({
      encounterCycleId: transaction.record.encounterCycleId,
      canonicalRevision:
        transaction.record.canonicalRevision,
      fencingToken: transaction.record.fencingToken,
    });
  }
  return Object.freeze({
    status: "COMMITTED" as const,
    routeTicket: createRouteTicket(envelope),
    envelope,
    cleanup: "SOURCE_CANONICAL_SUPERSEDED" as const,
    reason: null,
  });
}

export const RealityToGravityCutoverTransaction = Object.freeze({
  execute: executeRealityToGravityCutover,
  boundary: REALITY_TO_GRAVITY_CUTOVER_TRANSACTION_BOUNDARY,
});
