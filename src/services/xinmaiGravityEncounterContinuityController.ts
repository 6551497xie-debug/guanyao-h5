import type {
  GravityEntryAdmission,
} from "../types/xinmaiGravityEntryAdmission";
import type {
  GravitySurfaceAdmissionTransaction,
} from "../types/xinmaiGravitySurfaceAdmission";
import {
  XINMAI_GRAVITY_OBSERVATION_CONTINUITY_SCHEMA_VERSION,
  type GravityObservationContinuityRecord,
  type GravityObservationRecognitionOutcome,
  type GravityObservationRecognitionProvenance,
  type GravityObservationResumeDecision,
} from "../types/xinmaiGravityObservationContinuity";
import type {
  RealityEncounterIdentityReferences,
} from "../types/xinmaiRealityEncounterIntent";
import {
  readXinmaiGravityObservationContinuityState,
  transactXinmaiGravityObservationContinuity,
} from "./xinmaiLivedGrowthTransactionalStore";

export const GRAVITY_ENCOUNTER_CONTINUITY_CONTROLLER_BOUNDARY =
  Object.freeze({
    admissionOwnsStableObservationReference: true as const,
    typedMinimumSurfaceRequired: true as const,
    explicitUserRecognitionRequired: true as const,
    canonicalCheckpointStore: "INDEXED_DB" as const,
    transactionCompleteIsSuccess: true as const,
    noPageAuthority: true as const,
    noAdmissionRevisionIdentity: true as const,
    noDimensionProgressPersistence: true as const,
    noAnimationPersistence: true as const,
    noRendererAuthority: true as const,
    noGrowthFactAuthority: true as const,
    noCrystalAuthority: true as const,
  });

const recordIdFor = (sourceReferenceId: string): string =>
  `CURRENT:${sourceReferenceId}`;

const identityMatches = (
  left: RealityEncounterIdentityReferences,
  right: RealityEncounterIdentityReferences,
): boolean =>
  left.sourceReferenceId === right.sourceReferenceId &&
  left.starBeastIdentityReferenceId ===
    right.starBeastIdentityReferenceId &&
  left.mansionCoordinateReferenceId ===
    right.mansionCoordinateReferenceId;

const recordMatchesAdmission = (
  record: GravityObservationContinuityRecord,
  admission: GravityEntryAdmission,
): boolean =>
  identityMatches(record.identityReferences, admission.identityReferences) &&
  record.gravityObservationReferenceId ===
    admission.gravityObservationReferenceId &&
  record.sourceReality.intentReferenceId ===
    admission.sourceReality.intentReferenceId &&
  record.sourceReality.encounterCycleId ===
    admission.sourceReality.encounterCycleId &&
  record.gravityAdmission.admissionReferenceId ===
    admission.admissionReferenceId &&
  record.gravityAdmission.gravityCycleId === admission.gravityCycleId &&
  record.pressureProvenance.candidateBundleReferenceId ===
    admission.currentPressure.candidateBundleReferenceId &&
  record.pressureProvenance.selectedPressureSeedId ===
    admission.currentPressure.selectedPressureSeedId &&
  record.pressureProvenance.candidateReferenceId ===
    admission.currentPressure.captureProvenance.candidateReferenceId;

const blockedDecision = (
  admission: GravityEntryAdmission,
  status: "BLOCKED" | "SAFE_WITHHELD",
  reason: Extract<
    GravityObservationResumeDecision,
    { status: "BLOCKED" | "SAFE_WITHHELD" }
  >["reason"],
): Extract<
  GravityObservationResumeDecision,
  { status: "BLOCKED" | "SAFE_WITHHELD" }
> =>
  Object.freeze({
    status,
    gravityObservationReferenceId:
      admission.gravityObservationReferenceId,
    checkpointRevision: 0,
    recognition: null,
    choiceActionIntention: null,
    reason,
  });

const resumeFromRecord = (
  admission: GravityEntryAdmission,
  record: GravityObservationContinuityRecord,
  choiceActionIntention:
    | Extract<
        Awaited<
          ReturnType<
            typeof readXinmaiGravityObservationContinuityState
          >
        >,
        { status: "FOUND" }
      >["growthEnvelope"]["choiceActionIntentions"][number]
    | null,
): GravityObservationResumeDecision => {
  if (!recordMatchesAdmission(record, admission)) {
    return blockedDecision(
      admission,
      "BLOCKED",
      "OBSERVATION_STALE",
    );
  }
  if (choiceActionIntention !== null) {
    return Object.freeze({
      status: "CHOICE_COMMITTED" as const,
      gravityObservationReferenceId:
        record.gravityObservationReferenceId,
      checkpointRevision: record.checkpointRevision,
      recognition:
        record.recognitionProvenance?.source ?? "USER_CONFIRMED",
      choiceActionIntention,
    });
  }
  if (record.lifecycleState !== "CURRENT") {
    return blockedDecision(
      admission,
      "BLOCKED",
      record.lifecycleState === "CONSUMED_BY_CHOICE"
        ? "OBSERVATION_ALREADY_CONSUMED"
        : "OBSERVATION_TERMINAL",
    );
  }
  if (record.checkpointState === "OBSERVATION_RECOGNIZED") {
    return Object.freeze({
      status: "OBSERVATION_RECOGNIZED" as const,
      gravityObservationReferenceId:
        record.gravityObservationReferenceId,
      checkpointRevision: record.checkpointRevision,
      recognition:
        record.recognitionProvenance?.source ?? "USER_CONFIRMED",
      choiceActionIntention: null,
    });
  }
  return Object.freeze({
    status: "OBSERVATION_AVAILABLE" as const,
    gravityObservationReferenceId:
      record.gravityObservationReferenceId,
    checkpointRevision: record.checkpointRevision,
    recognition: null,
    choiceActionIntention: null,
  });
};

export async function recoverGravityEncounterContinuity(
  admission: GravityEntryAdmission,
): Promise<GravityObservationResumeDecision> {
  const recovered =
    await readXinmaiGravityObservationContinuityState(
      recordIdFor(admission.identityReferences.sourceReferenceId),
    );
  if (recovered.status !== "FOUND") {
    return blockedDecision(
      admission,
      "SAFE_WITHHELD",
      recovered.reason,
    );
  }
  const canonicalChoice =
    recovered.growthEnvelope.choiceActionIntentions.find(
      (candidate) =>
        candidate.gravityObservationReferenceId ===
          admission.gravityObservationReferenceId &&
        candidate.sourceEncounterCycleId ===
          admission.sourceReality.encounterCycleId &&
        candidate.gravityCycleId === admission.gravityCycleId &&
        identityMatches(
          candidate.identityReferences,
          admission.identityReferences,
        ),
    ) ?? null;
  if (recovered.record === null) {
    if (canonicalChoice !== null) {
      return Object.freeze({
        status: "CHOICE_COMMITTED" as const,
        gravityObservationReferenceId:
          admission.gravityObservationReferenceId,
        checkpointRevision: 0,
        recognition: "USER_CONFIRMED" as const,
        choiceActionIntention: canonicalChoice,
      });
    }
    return Object.freeze({
      status: "SURFACE_REQUIRED" as const,
      gravityObservationReferenceId:
        admission.gravityObservationReferenceId,
      checkpointRevision: 0 as const,
      recognition: null,
      choiceActionIntention: null,
    });
  }
  return resumeFromRecord(
    admission,
    recovered.record,
    canonicalChoice,
  );
}

export async function establishGravityObservationAvailable(input: Readonly<{
  admission: GravityEntryAdmission;
  transaction: GravitySurfaceAdmissionTransaction;
}>): Promise<GravityObservationResumeDecision> {
  const { admission, transaction } = input;
  if (
    admission.state !== "ACTIVE_IN_GRAVITY" ||
    transaction.admissionReferenceId !==
      admission.admissionReferenceId ||
    transaction.gravityCycleId !== admission.gravityCycleId ||
    transaction.gravityObservationReferenceId !==
      admission.gravityObservationReferenceId ||
    !identityMatches(
      transaction.identityReferences,
      admission.identityReferences,
    ) ||
    transaction.sourceEncounterCycleId !==
      admission.sourceReality.encounterCycleId ||
    transaction.selectedPressureSeedId !==
      admission.currentPressure.selectedPressureSeedId
  ) {
    return blockedDecision(
      admission,
      "BLOCKED",
      "INVALID_INPUT",
    );
  }
  const recordId = recordIdFor(
    admission.identityReferences.sourceReferenceId,
  );
  const result =
    await transactXinmaiGravityObservationContinuity(
      recordId,
      (current, growth) => {
        const existingChoice =
          growth.choiceActionIntentions.find(
            (candidate) =>
              candidate.gravityObservationReferenceId ===
                admission.gravityObservationReferenceId &&
              identityMatches(
                candidate.identityReferences,
                admission.identityReferences,
              ),
          ) ?? null;
        if (current && recordMatchesAdmission(current, admission)) {
          const decision = resumeFromRecord(
            admission,
            current,
            existingChoice,
          );
          return Object.freeze({
            status: "ALREADY_COMMITTED" as const,
            value: decision,
          });
        }
        if (
          current !== null &&
          current.lifecycleState === "CURRENT" &&
          Date.parse(current.expiresAt) > Date.now()
        ) {
          return Object.freeze({
            status: "REJECTED" as const,
            reason: "OBSERVATION_STALE" as const,
          });
        }
        const now = new Date().toISOString();
        const record: GravityObservationContinuityRecord =
          Object.freeze({
            schemaVersion:
              XINMAI_GRAVITY_OBSERVATION_CONTINUITY_SCHEMA_VERSION,
            recordId,
            gravityObservationReferenceId:
              admission.gravityObservationReferenceId,
            gravityObservationLineageRevision:
              (current?.gravityObservationLineageRevision ?? 0) + 1,
            identityReferences: admission.identityReferences,
            sourceReality: Object.freeze({
              intentReferenceId:
                admission.sourceReality.intentReferenceId,
              encounterCycleId:
                admission.sourceReality.encounterCycleId,
            }),
            gravityAdmission: Object.freeze({
              admissionReferenceId: admission.admissionReferenceId,
              gravityCycleId: admission.gravityCycleId,
            }),
            pressureProvenance: Object.freeze({
              candidateBundleReferenceId:
                admission.currentPressure
                  .candidateBundleReferenceId,
              selectedPressureSeedId:
                admission.currentPressure.selectedPressureSeedId,
              candidateReferenceId:
                admission.currentPressure.captureProvenance
                  .candidateReferenceId,
            }),
            checkpointState: "OBSERVATION_AVAILABLE" as const,
            checkpointRevision: 1,
            lifecycleState: "CURRENT" as const,
            recognitionProvenance: null,
            consumedByChoiceActionIntentionReferenceId: null,
            createdAt: now,
            updatedAt: now,
            expiresAt: admission.expiresAt,
            terminalAt: null,
            provenance: Object.freeze({
              admissionAuthority:
                "XINMAI_GRAVITY_ENTRY_ADMISSION" as const,
              surfaceAuthority:
                "TYPED_GRAVITY_MINIMUM_SURFACE" as const,
              recognitionAuthority:
                "USER_EXPLICIT_GRAVITY_RECOGNITION" as const,
              noSixDimensionAuthority: true as const,
              noChoiceAuthority: true as const,
              noLivedResponseAuthority: true as const,
              noCrystalAuthority: true as const,
              noRendererAuthority: true as const,
            }),
          });
        return Object.freeze({
          status: "COMMIT" as const,
          value: resumeFromRecord(admission, record, null),
          record,
          growthEnvelope: null,
        });
      },
    );
  if (
    result.status === "COMMITTED" ||
    result.status === "ALREADY_COMMITTED"
  ) {
    return result.value;
  }
  return blockedDecision(
    admission,
    result.status === "SAFE_WITHHELD"
      ? "SAFE_WITHHELD"
      : "BLOCKED",
    "reason" in result
      ? result.reason
      : "RECOVERY_UNAVAILABLE",
  );
}

export async function recognizeGravityObservation(input: Readonly<{
  admission: GravityEntryAdmission;
  gravityObservationReferenceId: string;
  expectedCheckpointRevision: number;
  recognition: GravityObservationRecognitionProvenance;
}>): Promise<GravityObservationRecognitionOutcome> {
  const { admission } = input;
  const result =
    await transactXinmaiGravityObservationContinuity(
      recordIdFor(admission.identityReferences.sourceReferenceId),
      (current, growth) => {
        if (
          current === null ||
          !recordMatchesAdmission(current, admission) ||
          current.gravityObservationReferenceId !==
            input.gravityObservationReferenceId
        ) {
          return Object.freeze({
            status: "REJECTED" as const,
            reason: "OBSERVATION_STALE" as const,
          });
        }
        if (
          growth.choiceActionIntentions.some(
            (choice) =>
              choice.gravityObservationReferenceId ===
              current.gravityObservationReferenceId,
          ) ||
          current.lifecycleState === "CONSUMED_BY_CHOICE"
        ) {
          return Object.freeze({
            status: "REJECTED" as const,
            reason: "OBSERVATION_ALREADY_CONSUMED" as const,
          });
        }
        if (current.lifecycleState !== "CURRENT") {
          return Object.freeze({
            status: "REJECTED" as const,
            reason: "OBSERVATION_TERMINAL" as const,
          });
        }
        if (
          current.checkpointState === "OBSERVATION_RECOGNIZED"
        ) {
          return Object.freeze({
            status: "ALREADY_COMMITTED" as const,
            value: resumeFromRecord(admission, current, null) as Extract<
              GravityObservationResumeDecision,
              { status: "OBSERVATION_RECOGNIZED" }
            >,
          });
        }
        if (
          current.checkpointState !== "OBSERVATION_AVAILABLE" ||
          current.checkpointRevision !==
            input.expectedCheckpointRevision
        ) {
          return Object.freeze({
            status: "REJECTED" as const,
            reason: "OBSERVATION_NOT_AVAILABLE" as const,
          });
        }
        const now = new Date().toISOString();
        const next: GravityObservationContinuityRecord =
          Object.freeze({
            ...current,
            checkpointState: "OBSERVATION_RECOGNIZED" as const,
            checkpointRevision: current.checkpointRevision + 1,
            recognitionProvenance: Object.freeze({
              source: input.recognition,
              confirmedAt: now,
            }),
            updatedAt: now,
          });
        return Object.freeze({
          status: "COMMIT" as const,
          value: resumeFromRecord(
            admission,
            next,
            null,
          ) as Extract<
            GravityObservationResumeDecision,
            { status: "OBSERVATION_RECOGNIZED" }
          >,
          record: next,
          growthEnvelope: null,
        });
      },
    );
  if (
    result.status === "COMMITTED" ||
    result.status === "ALREADY_COMMITTED"
  ) {
    return Object.freeze({
      status:
        result.status === "COMMITTED"
          ? "RECOGNIZED" as const
          : "ALREADY_RECOGNIZED" as const,
      decision: result.value,
    });
  }
  return Object.freeze({
    status: result.status,
    decision: blockedDecision(
      admission,
      result.status === "SAFE_WITHHELD"
        ? "SAFE_WITHHELD"
        : "BLOCKED",
      "reason" in result
        ? result.reason
        : "RECOVERY_UNAVAILABLE",
    ),
  });
}

export const XinmaiGravityEncounterContinuityController =
  Object.freeze({
    establishAvailable: establishGravityObservationAvailable,
    recognize: recognizeGravityObservation,
    recover: recoverGravityEncounterContinuity,
    boundary: GRAVITY_ENCOUNTER_CONTINUITY_CONTROLLER_BOUNDARY,
  });
