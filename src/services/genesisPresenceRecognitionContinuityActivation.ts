import type {
  GenesisPresenceRecognitionContinuityActivation,
  GenesisPresenceRecognitionContinuityActivationBlockedReason,
  GenesisPresenceRecognitionContinuityActivationBoundary,
  GenesisPresenceRecognitionContinuityActivationInput,
  GenesisPresenceRecognitionContinuityActivationResult,
} from "../types/genesisPresenceRecognitionContinuityActivation";

export const GENESIS_PRESENCE_RECOGNITION_CONTINUITY_ACTIVATION_BOUNDARY: GenesisPresenceRecognitionContinuityActivationBoundary =
  Object.freeze({
    continuityActivationOnly: true,
    explicitRecognitionConfirmationRequired: true,
    presenceApproachBeforeRecognition: true,
    realUserSourceOnly: true,
    noAutomaticRecognition: true,
    noEntityGeneration: true,
    noAssetGeneration: true,
    noPresenceSourceMutation: true,
    noEngineInvocation: true,
    noRendererInvocation: true,
    noRendererParameterMutation: true,
    noTimelineSpeedMutation: true,
    noVisualAssetMutation: true,
    noRealityEntry: true,
    noFixtureSource: true,
    noStorageWrite: true,
    noFallback: true,
  });

const blocked = (
  input: GenesisPresenceRecognitionContinuityActivationInput,
  reason: GenesisPresenceRecognitionContinuityActivationBlockedReason,
): GenesisPresenceRecognitionContinuityActivationResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    source: "genesis_presence_recognition_continuity_activation" as const,
    reason,
    activation: null,
    input,
    boundary: GENESIS_PRESENCE_RECOGNITION_CONTINUITY_ACTIVATION_BOUNDARY,
  });

export function activateGenesisPresenceRecognitionContinuity(
  input: GenesisPresenceRecognitionContinuityActivationInput,
): GenesisPresenceRecognitionContinuityActivationResult {
  const experience = input.manifestationExperienceSession;
  if (experience === null) return blocked(input, "EXPERIENCE_SESSION_REQUIRED");
  const presence = input.presenceVisualRealization;
  if (presence === null) return blocked(input, "PRESENCE_REALIZATION_REQUIRED");
  const recognition = input.recognitionRealitySession;
  if (recognition === null) return blocked(input, "RECOGNITION_SESSION_REQUIRED");
  if (
    experience.semanticRole !== "GENESIS_MANIFESTATION_EXPERIENCE_STATE" ||
    experience.currentState !== "PRESENCE_RECOGNIZED" ||
    experience.previousState !== "PRESENCE_APPROACHING" ||
    experience.copyKey !== "RECOGNIZE_EXISTING_PRESENCE" ||
    experience.sourceProvenance !== "REAL_USER_SESSION"
  ) {
    return blocked(input, "EXPERIENCE_STATE_INVALID");
  }
  if (
    presence.semanticRole !== "GENESIS_STAR_BEAST_PRESENCE_VISUAL_REALIZATION" ||
    presence.visualPresenceState !== "RECOGNIZED" ||
    presence.copyKey !== "LIFE_PRESENCE_RECOGNIZED" ||
    presence.sourcePresenceState !== "DORMANT" ||
    presence.presenceOrigin !== "EXISTING_IN_LIFE_COORDINATE" ||
    presence.appearanceMeaning !== "BECOMES_VISIBLE_NOT_GENERATED" ||
    presence.sourceProvenance !== "REAL_USER_SESSION" ||
    presence.noEntityGeneration !== true ||
    presence.noAssetGeneration !== true ||
    presence.noPresenceSourceMutation !== true ||
    presence.noFallback !== true
  ) {
    return blocked(input, "PRESENCE_STATE_INVALID");
  }
  if (
    recognition.sourceExperienceMode !== "REAL_USER_EXPERIENCE" ||
    recognition.sourceProvenance !== "REAL_USER_SESSION" ||
    recognition.phase !== "AWAITING_REALITY_ENTRY_CONFIRMATION" ||
    recognition.interactionAvailability !== "ENTER_REALITY" ||
    recognition.recognitionConfirmed !== true ||
    recognition.realityEntryConfirmed !== false ||
    recognition.realityEntryEligibility !== "NOT_ELIGIBLE"
  ) {
    return blocked(input, "EXPLICIT_RECOGNITION_REQUIRED");
  }
  if (
    experience.sourceReferenceId !== presence.sourceReferenceId ||
    experience.sourceReferenceId !== recognition.sourceReferenceId
  ) {
    return blocked(input, "SOURCE_REFERENCE_MISMATCH");
  }
  if (
    experience.bridgeReferenceId !== presence.manifestationSourceReferenceId ||
    experience.manifestationBridge.provenance.manifestationSourceReferenceId !==
      presence.manifestationSourceReferenceId
  ) {
    return blocked(input, "MANIFESTATION_SOURCE_REFERENCE_MISMATCH");
  }

  const activation: GenesisPresenceRecognitionContinuityActivation =
    Object.freeze({
      semanticRole: "GENESIS_PRESENCE_RECOGNITION_CONTINUITY_ACTIVATION",
      sourceReferenceId: experience.sourceReferenceId,
      bridgeReferenceId: experience.bridgeReferenceId,
      manifestationSourceReferenceId: presence.manifestationSourceReferenceId,
      experienceState: "PRESENCE_RECOGNIZED",
      previousExperienceState: "PRESENCE_APPROACHING",
      visualPresenceState: "RECOGNIZED",
      sourcePresenceState: "DORMANT",
      recognitionPhase: "AWAITING_REALITY_ENTRY_CONFIRMATION",
      recognitionConfirmed: true,
      presenceOrigin: "EXISTING_IN_LIFE_COORDINATE",
      recognitionMeaning: "RECOGNIZES_EXISTING_PRESENCE",
      sourceProvenance: "REAL_USER_SESSION",
      continuity: Object.freeze({
        presenceApproachCompleted: true,
        explicitRecognitionConfirmed: true,
        manifestationSourceContinuous: true,
        experienceAndVisualPresenceAligned: true,
      }),
      existingExperienceSessionOnly: true,
      existingPresenceRealizationOnly: true,
      existingRecognitionSessionOnly: true,
      noAutomaticRecognition: true,
      noEntityGeneration: true,
      noAssetGeneration: true,
      noPresenceSourceMutation: true,
      noEngineInvocation: true,
      noRendererParameterMutation: true,
      noTimelineMutation: true,
      noRealityEntry: true,
      noFallback: true,
    });

  return Object.freeze({
    status: "READY" as const,
    source: "genesis_presence_recognition_continuity_activation" as const,
    activation,
    input,
    boundary: GENESIS_PRESENCE_RECOGNITION_CONTINUITY_ACTIVATION_BOUNDARY,
  });
}
