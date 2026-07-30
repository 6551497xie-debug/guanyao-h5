import type {
  CommitChoiceActionIntentionInput,
} from "../types/xinmaiChoiceActionIntention";

export type ChoiceActionIntentionPrerequisiteInvalidReason =
  | "IDENTITY_REFERENCES_INVALID"
  | "LINEAGE_REFERENCES_INVALID"
  | "OBSERVATION_PROOF_INVALID"
  | "ACTION_SUMMARY_INVALID"
  | "FORMATION_SOURCE_INCOMPLETE"
  | "ROUTE_IMPACT_MISMATCH";

export type ChoiceActionIntentionPrerequisiteValidation =
  | Readonly<{
      status: "VALID";
      input: CommitChoiceActionIntentionInput;
      reason: null;
    }>
  | Readonly<{
      status: "INVALID";
      input: null;
      reason: ChoiceActionIntentionPrerequisiteInvalidReason;
    }>;

const hasText = (value: string): boolean => value.trim().length > 0;

export function validateChoiceActionIntentionPrerequisites(
  input: CommitChoiceActionIntentionInput,
): ChoiceActionIntentionPrerequisiteValidation {
  if (
    Object.values(input.identityReferences).some(
      (value) => !hasText(value),
    )
  ) {
    return Object.freeze({
      status: "INVALID" as const,
      input: null,
      reason: "IDENTITY_REFERENCES_INVALID" as const,
    });
  }
  if (
    !hasText(input.sourceEncounterCycleId) ||
    !hasText(input.gravityCycleId) ||
    !hasText(input.gravityObservationReferenceId)
  ) {
    return Object.freeze({
      status: "INVALID" as const,
      input: null,
      reason: "LINEAGE_REFERENCES_INVALID" as const,
    });
  }
  if (
    input.observationProof.status !== "OBSERVATION_RECOGNIZED" ||
    input.observationProof.gravityObservationReferenceId !==
      input.gravityObservationReferenceId ||
    input.observationProof.checkpointRevision !==
      input.expectedObservationCheckpointRevision ||
    !Number.isInteger(input.expectedObservationCheckpointRevision) ||
    input.expectedObservationCheckpointRevision < 1
  ) {
    return Object.freeze({
      status: "INVALID" as const,
      input: null,
      reason: "OBSERVATION_PROOF_INVALID" as const,
    });
  }
  if (
    !hasText(input.actionSummary) ||
    input.actionSummary.trim() !==
      input.formationSourceSnapshot.action.actionLine.trim()
  ) {
    return Object.freeze({
      status: "INVALID" as const,
      input: null,
      reason: "ACTION_SUMMARY_INVALID" as const,
    });
  }
  if (
    input.formationSourceSnapshot.formation.source !== "dynamics" ||
    input.formationSourceSnapshot.completedNodeCount < 6 ||
    input.formationSourceSnapshot.assetCompletionState !==
      "READY_TO_CRYSTALLIZE" ||
    !hasText(input.formationSourceSnapshot.primaryDimension)
  ) {
    return Object.freeze({
      status: "INVALID" as const,
      input: null,
      reason: "FORMATION_SOURCE_INCOMPLETE" as const,
    });
  }
  if (
    !hasText(input.changeExperienceRouteProof.sourceUnitId) ||
    input.changeExperienceRouteProof.dimension !==
      input.formationSourceSnapshot.primaryDimension ||
    input.formationSourceSnapshot.migrationImpact.dimension !==
      input.changeExperienceRouteProof.dimension ||
    input.formationSourceSnapshot.migrationImpact.sourceUnit
      .dimension !== input.changeExperienceRouteProof.dimension ||
    input.formationSourceSnapshot.migrationImpact.sourceUnit.unitId !==
      input.changeExperienceRouteProof.sourceUnitId ||
    input.formationSourceSnapshot.migrationImpact.impactReadiness !==
      "READY_FOR_CRYSTAL"
  ) {
    return Object.freeze({
      status: "INVALID" as const,
      input: null,
      reason: "ROUTE_IMPACT_MISMATCH" as const,
    });
  }
  return Object.freeze({
    status: "VALID" as const,
    input,
    reason: null,
  });
}

export const XinmaiChoiceActionIntentionPrerequisiteValidator =
  Object.freeze({
    validate: validateChoiceActionIntentionPrerequisites,
    pure: true as const,
    noStorageRead: true as const,
    noStorageWrite: true as const,
    noControllerCall: true as const,
    noAuthorityProof: true as const,
  });
