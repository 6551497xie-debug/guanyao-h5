import type {
  GenesisPresenceApproachContinuityActivation,
  GenesisPresenceApproachContinuityActivationBlockedReason,
  GenesisPresenceApproachContinuityActivationBoundary,
  GenesisPresenceApproachContinuityActivationInput,
  GenesisPresenceApproachContinuityActivationResult,
} from "../types/genesisPresenceApproachContinuityActivation";

export const GENESIS_PRESENCE_APPROACH_CONTINUITY_ACTIVATION_BOUNDARY: GenesisPresenceApproachContinuityActivationBoundary =
  Object.freeze({
    continuityActivationOnly: true,
    existingExperienceSessionOnly: true,
    existingPresenceRealizationOnly: true,
    forceCondensationBeforePresenceApproach: true,
    realUserSourceOnly: true,
    noEntityGeneration: true,
    noAssetGeneration: true,
    noPresenceSourceMutation: true,
    noEngineInvocation: true,
    noRendererInvocation: true,
    noRendererParameterMutation: true,
    noTimelineSpeedMutation: true,
    noVisualAssetMutation: true,
    noFixtureSource: true,
    noStorageWrite: true,
    noFallback: true,
  });

const blocked = (
  input: GenesisPresenceApproachContinuityActivationInput,
  reason: GenesisPresenceApproachContinuityActivationBlockedReason,
): GenesisPresenceApproachContinuityActivationResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    source: "genesis_presence_approach_continuity_activation" as const,
    reason,
    activation: null,
    input,
    boundary: GENESIS_PRESENCE_APPROACH_CONTINUITY_ACTIVATION_BOUNDARY,
  });

export function activateGenesisPresenceApproachContinuity(
  input: GenesisPresenceApproachContinuityActivationInput,
): GenesisPresenceApproachContinuityActivationResult {
  const experience = input.manifestationExperienceSession;
  if (experience === null) {
    return blocked(input, "EXPERIENCE_SESSION_REQUIRED");
  }
  const presence = input.presenceVisualRealization;
  if (presence === null) {
    return blocked(input, "PRESENCE_REALIZATION_REQUIRED");
  }
  if (
    experience.semanticRole !== "GENESIS_MANIFESTATION_EXPERIENCE_STATE" ||
    experience.currentState !== "PRESENCE_APPROACHING" ||
    experience.previousState !== "FORCE_CONDENSING" ||
    experience.copyKey !== "STAR_BEAST_APPROACHES" ||
    experience.sourceProvenance !== "REAL_USER_SESSION"
  ) {
    return blocked(input, "EXPERIENCE_STATE_INVALID");
  }
  if (
    presence.semanticRole !==
      "GENESIS_STAR_BEAST_PRESENCE_VISUAL_REALIZATION" ||
    presence.visualPresenceState !== "APPROACHING" ||
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
  if (experience.sourceReferenceId !== presence.sourceReferenceId) {
    return blocked(input, "SOURCE_REFERENCE_MISMATCH");
  }
  if (
    experience.bridgeReferenceId !==
      presence.manifestationSourceReferenceId ||
    experience.manifestationBridge.provenance
      .manifestationSourceReferenceId !==
      presence.manifestationSourceReferenceId
  ) {
    return blocked(input, "MANIFESTATION_SOURCE_REFERENCE_MISMATCH");
  }

  const activation: GenesisPresenceApproachContinuityActivation =
    Object.freeze({
      semanticRole: "GENESIS_PRESENCE_APPROACH_CONTINUITY_ACTIVATION",
      sourceReferenceId: experience.sourceReferenceId,
      bridgeReferenceId: experience.bridgeReferenceId,
      manifestationSourceReferenceId:
        presence.manifestationSourceReferenceId,
      experienceState: "PRESENCE_APPROACHING",
      previousExperienceState: "FORCE_CONDENSING",
      visualPresenceState: "APPROACHING",
      sourcePresenceState: "DORMANT",
      presenceOrigin: "EXISTING_IN_LIFE_COORDINATE",
      appearanceMeaning: "BECOMES_VISIBLE_NOT_GENERATED",
      sourceProvenance: "REAL_USER_SESSION",
      continuity: Object.freeze({
        forceCondensationCompleted: true,
        manifestationSourceContinuous: true,
        experienceAndVisualPresenceAligned: true,
      }),
      existingExperienceSessionOnly: true,
      existingPresenceRealizationOnly: true,
      noEntityGeneration: true,
      noAssetGeneration: true,
      noPresenceSourceMutation: true,
      noEngineInvocation: true,
      noRendererParameterMutation: true,
      noTimelineMutation: true,
      noFallback: true,
    });

  return Object.freeze({
    status: "READY" as const,
    source: "genesis_presence_approach_continuity_activation" as const,
    activation,
    input,
    boundary: GENESIS_PRESENCE_APPROACH_CONTINUITY_ACTIVATION_BOUNDARY,
  });
}
