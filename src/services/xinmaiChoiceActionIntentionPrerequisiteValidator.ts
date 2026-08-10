import type {
  CommitChoiceActionIntentionInput,
} from "../types/xinmaiChoiceActionIntention";
import {
  resolveChoiceActionRoutes,
} from "./xinmaiChoiceActionRouteResolver";
import {
  validateChoiceActionRouteCandidate,
} from "./xinmaiChoiceActionRouteValidator";

export type ChoiceActionIntentionPrerequisiteInvalidReason =
  | "IDENTITY_REFERENCES_INVALID"
  | "LINEAGE_REFERENCES_INVALID"
  | "OBSERVATION_PROOF_INVALID"
  | "ACTION_ROUTE_INVALID"
  | "SIX_DIMENSION_COMPLETION_RECEIPT_REQUIRED"
  | "FORMATION_SOURCE_INCOMPLETE"
  | "ROUTE_PROJECTION_MISMATCH";

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
  const routeResolution = resolveChoiceActionRoutes(
    input.actionRouteResolverInput,
  );
  if (routeResolution.status !== "READY") {
    return Object.freeze({
      status: "INVALID" as const,
      input: null,
      reason: "ACTION_ROUTE_INVALID" as const,
    });
  }
  const selectedRoute = routeResolution.candidates.find(
    (candidate) =>
      candidate.actionRouteReferenceId ===
      input.selectedActionRouteReferenceId,
  );
  if (
    !selectedRoute ||
    validateChoiceActionRouteCandidate(
      selectedRoute,
      input.actionRouteResolverInput,
    ).status !== "VALID"
  ) {
    return Object.freeze({
      status: "INVALID" as const,
      input: null,
      reason: "ACTION_ROUTE_INVALID" as const,
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
    input.formationSourceSnapshot.action.actionLine.trim() !==
      selectedRoute.action.visibleAction.trim() ||
    input.formationSourceSnapshot.migrationImpact.dimension !==
      input.formationSourceSnapshot.primaryDimension ||
    input.formationSourceSnapshot.migrationImpact.sourceUnit
      .dimension !== input.formationSourceSnapshot.primaryDimension ||
    input.formationSourceSnapshot.migrationImpact.sourceUnit.unitId !==
      selectedRoute.actionRouteReferenceId ||
    input.formationSourceSnapshot.migrationImpact.impactReadiness !==
      "READY_FOR_CRYSTAL"
  ) {
    return Object.freeze({
      status: "INVALID" as const,
      input: null,
      reason: "ROUTE_PROJECTION_MISMATCH" as const,
    });
  }
  return Object.freeze({
    status: "VALID" as const,
    input,
    reason: null,
  });
}

export function validateChoiceActionIntentionV3Prerequisites(
  input: CommitChoiceActionIntentionInput,
): ChoiceActionIntentionPrerequisiteValidation {
  const base = validateChoiceActionIntentionPrerequisites(input);
  if (base.status !== "VALID") return base;
  const receipt = input.sixDimensionCompletionReceipt;
  const snapshot = input.formationSourceSnapshot;
  if (
    receipt === null ||
    !("schemaVersion" in snapshot) ||
    snapshot.schemaVersion !==
      "XINMAI_CHOICE_FORMATION_SOURCE_SNAPSHOT_V2" ||
    snapshot.sixDimensionObservation.completionReceiptReferenceId !==
      receipt.completionReceiptReferenceId ||
    snapshot.sixDimensionObservation.observationSetId !==
      receipt.observationSetId ||
    snapshot.sixDimensionObservation.observationSetRevision !==
      receipt.observationSetRevision ||
    snapshot.sixDimensionObservation.dimensionProtocolRevision !==
      receipt.dimensionProtocolRevision ||
    snapshot.sixDimensionObservation.contentDigest !==
      receipt.contentDigest ||
    snapshot.sixDimensionObservation.evidenceDigest !==
      receipt.evidenceDigest
  ) {
    return Object.freeze({
      status: "INVALID" as const,
      input: null,
      reason: "SIX_DIMENSION_COMPLETION_RECEIPT_REQUIRED" as const,
    });
  }
  return base;
}

export const XinmaiChoiceActionIntentionPrerequisiteValidator =
  Object.freeze({
    validate: validateChoiceActionIntentionPrerequisites,
    validateV3: validateChoiceActionIntentionV3Prerequisites,
    pure: true as const,
    noStorageRead: true as const,
    noStorageWrite: true as const,
    noControllerCall: true as const,
    noAuthorityProof: true as const,
  });
