import type {
  StarBeastGenesisRevealBlocked,
  StarBeastGenesisRevealReady,
  StarBeastGenesisRevealUnavailable,
} from "../types/starBeastGenesisExperience";
import type {
  StarBeastGenesisExperiencePresentationReadinessBlockedReason,
  StarBeastGenesisExperiencePresentationReadinessInput,
  StarBeastGenesisExperiencePresentationReadinessResult,
  StarBeastGenesisExperiencePresentationReadinessUnavailableReason,
} from "../types/starBeastGenesisExperiencePresentationReadiness";

const PRESENTATION_READINESS_BOUNDARY = Object.freeze({
  readinessOnly: true,
  noPresentationCreation: true,
  noUIIntegration: true,
  noLaunchIntegration: true,
  noRendererInvocation: true,
  noCanvasConnection: true,
  noLifeStateMutation: true,
  noAssetMutation: true,
  noRuntimeIntegration: true,
  noStorageWrite: true,
});

const unavailable = (
  input: StarBeastGenesisExperiencePresentationReadinessInput,
  genesisRevealResultReference:
    | StarBeastGenesisRevealReady
    | StarBeastGenesisRevealUnavailable
    | null,
  reason: StarBeastGenesisExperiencePresentationReadinessUnavailableReason,
): StarBeastGenesisExperiencePresentationReadinessResult =>
  Object.freeze({
    status: "UNAVAILABLE",
    readiness: "UNAVAILABLE",
    source: "star_beast_genesis_experience_presentation_readiness",
    reason,
    input,
    genesisRevealResultReference,
    sourceUnavailableReason:
      genesisRevealResultReference?.status === "UNAVAILABLE"
        ? genesisRevealResultReference.reason
        : null,
    boundary: PRESENTATION_READINESS_BOUNDARY,
  });

const blocked = (
  input: StarBeastGenesisExperiencePresentationReadinessInput,
  genesisRevealResultReference:
    | StarBeastGenesisRevealReady
    | StarBeastGenesisRevealBlocked,
  reason: StarBeastGenesisExperiencePresentationReadinessBlockedReason,
): StarBeastGenesisExperiencePresentationReadinessResult =>
  Object.freeze({
    status: "BLOCKED",
    readiness: "BLOCKED",
    source: "star_beast_genesis_experience_presentation_readiness",
    reason,
    input,
    genesisRevealResultReference,
    sourceBlockedReason:
      genesisRevealResultReference.status === "BLOCKED"
        ? genesisRevealResultReference.reason
        : null,
    boundary: PRESENTATION_READINESS_BOUNDARY,
  });

export function resolveStarBeastGenesisExperiencePresentationReadiness(
  input: StarBeastGenesisExperiencePresentationReadinessInput,
): StarBeastGenesisExperiencePresentationReadinessResult {
  const reveal = input.genesisRevealResultReference;
  if (reveal === null) {
    return unavailable(input, null, "GENESIS_REVEAL_RESULT_REFERENCE_REQUIRED");
  }
  if (reveal.status === "UNAVAILABLE") {
    return unavailable(input, reveal, "GENESIS_REVEAL_UNAVAILABLE");
  }
  if (reveal.status === "BLOCKED") {
    return blocked(input, reveal, "GENESIS_REVEAL_BLOCKED");
  }
  if (input.genesisExperienceStateReference === null) {
    return unavailable(input, reveal, "GENESIS_EXPERIENCE_STATE_REFERENCE_REQUIRED");
  }
  if (input.previewScopeReference === null) {
    return unavailable(input, reveal, "PREVIEW_SCOPE_REFERENCE_REQUIRED");
  }
  if (input.manualAcceptanceReference === null) {
    return unavailable(input, reveal, "MANUAL_ACCEPTANCE_REFERENCE_REQUIRED");
  }
  if (input.genesisExperienceStateReference !== reveal.experienceState) {
    return blocked(input, reveal, "GENESIS_EXPERIENCE_STATE_REFERENCE_MISMATCH");
  }
  if (
    reveal.revealStatus !==
      "READY_FOR_FUTURE_GENESIS_EXPERIENCE_PRESENTATION" ||
    reveal.experienceState.currentStage !== "STAR_BEAST_REVEAL" ||
    reveal.experienceState.presentationSequenceOnly !== true ||
    reveal.experienceState.notCausalDerivationSequence !== true ||
    reveal.boundary.experienceSchemaOnly !== true ||
    reveal.boundary.referenceOnly !== true ||
    reveal.boundary.noFourSymbolToLifeArchetypeInference !== true ||
    reveal.boundary.noBirthLocationToStarBeastDerivation !== true ||
    reveal.boundary.noStarBeastGeneration !== true ||
    reveal.boundary.noAssetMutation !== true ||
    reveal.boundary.noLifeStateMutation !== true ||
    reveal.boundary.noRendererInvocation !== true ||
    reveal.boundary.noUIIntegration !== true ||
    reveal.boundary.noRuntimeIntegration !== true ||
    reveal.boundary.noStorageWrite !== true
  ) {
    return blocked(input, reveal, "GENESIS_REVEAL_BOUNDARY_INVALID");
  }
  if (
    input.previewScopeReference.referenceType !==
      "STAR_BEAST_GENESIS_PREVIEW_SCOPE" ||
    input.previewScopeReference.referenceId.trim().length === 0 ||
    input.previewScopeReference.scope !== "ISOLATED_GENESIS_PREVIEW_ONLY"
  ) {
    return blocked(input, reveal, "PREVIEW_SCOPE_REFERENCE_INVALID");
  }
  if (
    input.manualAcceptanceReference.referenceType !==
      "STAR_BEAST_GENESIS_MANUAL_ACCEPTANCE" ||
    input.manualAcceptanceReference.referenceId.trim().length === 0 ||
    input.manualAcceptanceReference.humanReviewRequired !== true ||
    input.manualAcceptanceReference.noAutomaticProductAcceptance !== true
  ) {
    return blocked(input, reveal, "MANUAL_ACCEPTANCE_REFERENCE_INVALID");
  }

  return Object.freeze({
    status: "READY",
    readiness: "READY_FOR_ISOLATED_GENESIS_EXPERIENCE_PREVIEW",
    source: "star_beast_genesis_experience_presentation_readiness",
    input,
    genesisRevealResultReference: reveal,
    genesisExperienceStateReference: reveal.experienceState,
    previewScopeReference: input.previewScopeReference,
    manualAcceptanceReference: input.manualAcceptanceReference,
    boundary: PRESENTATION_READINESS_BOUNDARY,
  });
}
