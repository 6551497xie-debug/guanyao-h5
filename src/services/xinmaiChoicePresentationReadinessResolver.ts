import type {
  ChoicePresentationLineage,
  ChoicePresentationReadinessDecision,
  ChoicePresentationReadinessInput,
  ChoicePresentationSafeWithheldReason,
  ChoicePresentationWithheldReason,
} from "../types/xinmaiChoicePresentationReadiness";
import type { RealityEncounterIdentityReferences } from "../types/xinmaiRealityEncounterIntent";
import {
  validateChoiceActionIntentionPrerequisites,
} from "./xinmaiChoiceActionIntentionPrerequisiteValidator";
import {
  createChoiceRouteFormationSourceSnapshot,
} from "./xinmaiChoiceActionRouteGrowthProjection";
import {
  canCreateXinmaiChoiceFromActionRoute,
} from "./xinmaiChoiceActionRouteRuntimePolicy";

const identityMatches = (
  left: RealityEncounterIdentityReferences,
  right: RealityEncounterIdentityReferences,
): boolean =>
  left.sourceReferenceId === right.sourceReferenceId &&
  left.starBeastIdentityReferenceId ===
    right.starBeastIdentityReferenceId &&
  left.mansionCoordinateReferenceId ===
    right.mansionCoordinateReferenceId;

const withheld = (
  input: ChoicePresentationReadinessInput,
  reason: ChoicePresentationWithheldReason,
  lineage: ChoicePresentationLineage | null,
): ChoicePresentationReadinessDecision =>
  Object.freeze({
    state: "WITHHELD" as const,
    reason,
    lineage,
    experienceStage: input.experienceStage,
    resolvedAt: new Date().toISOString(),
    actionRouteCandidate: null,
    formationSourceSnapshot: null,
    structuralInput: null,
    choiceActionIntention: null,
    terminalTarget: null,
    growthReferenceId: null,
  });

const safeWithheld = (
  input: ChoicePresentationReadinessInput,
  reason: ChoicePresentationSafeWithheldReason,
  lineage: ChoicePresentationLineage | null,
): ChoicePresentationReadinessDecision =>
  Object.freeze({
    state: "SAFE_WITHHELD" as const,
    reason,
    lineage,
    experienceStage: input.experienceStage,
    resolvedAt: new Date().toISOString(),
    actionRouteCandidate: null,
    formationSourceSnapshot: null,
    structuralInput: null,
    choiceActionIntention: null,
    terminalTarget: null,
    growthReferenceId: null,
  });

export function resolveChoicePresentationReadiness(
  input: ChoicePresentationReadinessInput,
): ChoicePresentationReadinessDecision {
  const attempt = input.surfaceAttempt;
  const observation = input.observationDecision;
  const lineage =
    attempt === null
      ? null
      : Object.freeze({
          identityReferences: attempt.identityReferences,
          sourceEncounterCycleId: attempt.sourceEncounterCycleId,
          gravityCycleId: attempt.gravityCycleId,
          gravityObservationReferenceId:
            attempt.gravityObservationReferenceId,
          observationCheckpointRevision:
            observation.checkpointRevision,
        });
  if (input.operationalState.summaryPending) {
    return safeWithheld(input, "SUMMARY_PENDING", lineage);
  }
  if (input.operationalState.choiceMutationPending) {
    return safeWithheld(input, "CHOICE_MUTATION_PENDING", lineage);
  }
  if (input.operationalState.recoveryFailure !== null) {
    return safeWithheld(
      input,
      "RUNTIME_RECOVERY_FAILURE",
      lineage,
    );
  }
  const summary = input.growthTerminalSummary;
  if (summary.state === "RECOVERY_UNAVAILABLE") {
    return safeWithheld(input, "RECOVERY_UNAVAILABLE", lineage);
  }
  if (summary.state === "RECOVERY_CORRUPTED") {
    return safeWithheld(input, "RECOVERY_CORRUPTED", lineage);
  }
  if (attempt === null) {
    return withheld(input, "SURFACE_ATTEMPT_REQUIRED", null);
  }
  const currentLineage = lineage as ChoicePresentationLineage;
  if (
    !identityMatches(
      summary.request.identityReferences,
      attempt.identityReferences,
    )
  ) {
    return safeWithheld(
      input,
      "IDENTITY_MISMATCH",
      currentLineage,
    );
  }
  if (
    summary.request.sourceEncounterCycleId !==
      attempt.sourceEncounterCycleId
  ) {
    return safeWithheld(
      input,
      "ENCOUNTER_MISMATCH",
      currentLineage,
    );
  }
  if (
    summary.request.gravityCycleId !== attempt.gravityCycleId
  ) {
    return safeWithheld(
      input,
      "GRAVITY_LINEAGE_MISMATCH",
      currentLineage,
    );
  }
  if (
    summary.request.gravityObservationReferenceId !==
      attempt.gravityObservationReferenceId ||
    observation.gravityObservationReferenceId !==
      attempt.gravityObservationReferenceId
  ) {
    return safeWithheld(
      input,
      "OBSERVATION_LINEAGE_MISMATCH",
      currentLineage,
    );
  }
  if (summary.state === "CRYSTAL_FORMED") {
    return Object.freeze({
      state: "TERMINAL_BY_GROWTH" as const,
      reason: "HIGHER_GROWTH_ASSET_EXISTS" as const,
      lineage: currentLineage,
      experienceStage: input.experienceStage,
      resolvedAt: new Date().toISOString(),
      actionRouteCandidate: null,
      formationSourceSnapshot: null,
      structuralInput: null,
      choiceActionIntention: summary.choiceActionIntention,
      terminalTarget: "RETURNING_BODY_IMPRINT" as const,
      growthReferenceId:
        summary.formationReceipt.formationReferenceId,
    });
  }
  if (summary.state === "ELIGIBILITY_AVAILABLE") {
    return Object.freeze({
      state: "TERMINAL_BY_GROWTH" as const,
      reason: "HIGHER_GROWTH_ASSET_EXISTS" as const,
      lineage: currentLineage,
      experienceStage: input.experienceStage,
      resolvedAt: new Date().toISOString(),
      actionRouteCandidate: null,
      formationSourceSnapshot: null,
      structuralInput: null,
      choiceActionIntention: summary.choiceActionIntention,
      terminalTarget: "CRYSTAL_FORMATION" as const,
      growthReferenceId:
        summary.crystalEligibility.crystalEligibilityReferenceId,
    });
  }
  if (summary.state === "LIVED_RESPONSE_RECORDED") {
    return Object.freeze({
      state: "TERMINAL_BY_GROWTH" as const,
      reason: "HIGHER_GROWTH_ASSET_EXISTS" as const,
      lineage: currentLineage,
      experienceStage: input.experienceStage,
      resolvedAt: new Date().toISOString(),
      actionRouteCandidate: null,
      formationSourceSnapshot: null,
      structuralInput: null,
      choiceActionIntention: summary.choiceActionIntention,
      terminalTarget: "LIVED_RESPONSE_RETURN" as const,
      growthReferenceId:
        summary.livedResponseFact.livedResponseReferenceId,
    });
  }
  if (summary.state === "CHOICE_COMMITTED") {
    return Object.freeze({
      state: "RESUME_COMMITTED" as const,
      reason: "CANONICAL_CHOICE_EXISTS" as const,
      lineage: currentLineage,
      experienceStage: input.experienceStage,
      resolvedAt: new Date().toISOString(),
      actionRouteCandidate: null,
      formationSourceSnapshot: null,
      structuralInput: null,
      choiceActionIntention: summary.choiceActionIntention,
      terminalTarget: null,
      growthReferenceId:
        summary.choiceActionIntention
          .choiceActionIntentionReferenceId,
    });
  }
  if (observation.status === "CHOICE_COMMITTED") {
    return safeWithheld(
      input,
      "SUMMARY_CONFLICT",
      currentLineage,
    );
  }
  if (!canCreateXinmaiChoiceFromActionRoute()) {
    return safeWithheld(
      input,
      "ACTION_ROUTE_RUNTIME_PAUSED",
      currentLineage,
    );
  }
  if (
    observation.status === "BLOCKED" ||
    observation.status === "SAFE_WITHHELD"
  ) {
    return safeWithheld(
      input,
      observation.status === "SAFE_WITHHELD"
        ? "RECOVERY_UNAVAILABLE"
        : "OBSERVATION_LINEAGE_MISMATCH",
      currentLineage,
    );
  }
  if (observation.status !== "OBSERVATION_RECOGNIZED") {
    return withheld(
      input,
      "OBSERVATION_NOT_RECOGNIZED",
      currentLineage,
    );
  }
  if (input.actionRouteResolution.status !== "READY") {
    return safeWithheld(
      input,
      "ACTION_ROUTE_SAFE_WITHHELD",
      currentLineage,
    );
  }
  const actionRouteCandidate =
    input.actionRouteResolution.candidates[0] ?? null;
  if (actionRouteCandidate === null) {
    return withheld(
      input,
      "ACTION_ROUTE_REQUIRED",
      currentLineage,
    );
  }
  if (input.formation === null) {
    return withheld(
      input,
      "FORMATION_SOURCE_REQUIRED",
      currentLineage,
    );
  }
  if (
    input.assetCandidate.completionState !==
      "READY_TO_CRYSTALLIZE"
  ) {
    return withheld(
      input,
      "FORMATION_SOURCE_INCOMPLETE",
      currentLineage,
    );
  }
  const formationSourceSnapshot =
    createChoiceRouteFormationSourceSnapshot({
      candidate: actionRouteCandidate,
      formation: input.formation,
      completedNodeCount: input.assetCandidate.completedNodeCount,
      assetCompletionState:
        input.assetCandidate.completionState,
    });
  if (formationSourceSnapshot === null) {
    return withheld(
      input,
      "FORMATION_SOURCE_INCOMPLETE",
      currentLineage,
    );
  }
  const structuralInput = Object.freeze({
    identityReferences: attempt.identityReferences,
    sourceEncounterCycleId: attempt.sourceEncounterCycleId,
    gravityCycleId: attempt.gravityCycleId,
    gravityObservationReferenceId:
      attempt.gravityObservationReferenceId,
    expectedObservationCheckpointRevision:
      observation.checkpointRevision,
    observationProof: Object.freeze({
      status: "OBSERVATION_RECOGNIZED" as const,
      gravityObservationReferenceId:
        observation.gravityObservationReferenceId,
      checkpointRevision: observation.checkpointRevision,
    }),
    actionRouteResolverInput:
      input.actionRouteResolution.resolverInput,
    selectedActionRouteReferenceId:
      actionRouteCandidate.actionRouteReferenceId,
    formationSourceSnapshot,
  });
  const validation =
    validateChoiceActionIntentionPrerequisites(structuralInput);
  if (validation.status !== "VALID") {
    return withheld(
      input,
      "STRUCTURAL_PREREQUISITE_INVALID",
      currentLineage,
    );
  }
  return Object.freeze({
    state: "READY_TO_PRESENT" as const,
    reason: "ALL_TYPED_PREREQUISITES_READY" as const,
    lineage: currentLineage,
    experienceStage: input.experienceStage,
    resolvedAt: new Date().toISOString(),
    actionRouteCandidate,
    formationSourceSnapshot,
    structuralInput: validation.input,
    choiceActionIntention: null,
    terminalTarget: null,
    growthReferenceId: null,
  });
}

export const XinmaiChoicePresentationReadinessResolver =
  Object.freeze({
    resolve: resolveChoicePresentationReadiness,
    states: Object.freeze([
      "READY_TO_PRESENT",
      "WITHHELD",
      "RESUME_COMMITTED",
      "TERMINAL_BY_GROWTH",
      "SAFE_WITHHELD",
    ] as const),
    pure: true as const,
    readOnly: true as const,
    noStorageRead: true as const,
    noStorageWrite: true as const,
    noControllerCall: true as const,
    noCommitAuthority: true as const,
  });
