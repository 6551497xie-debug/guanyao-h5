import type { GenesisTimeDeliveryResponseCalibrationBoundary, GenesisTimeDeliveryResponseCalibrationInput, GenesisTimeDeliveryResponseCalibrationResult, GenesisTimeDeliveryResponseCalibrationBlockedReason } from "../types/genesisTimeDeliveryResponseCalibration";

const RESPONSE_BOUNDARY: GenesisTimeDeliveryResponseCalibrationBoundary = Object.freeze({
  timeDeliveryResponseOnly: true,
  existingRuntimeSessionOnly: true,
  existingManifestationBridgeOnly: true,
  explicitTimeDeliveryOnly: true,
  noEngineInvocation: true,
  noSourceMutation: true,
  noProjectionMutation: true,
  noRendererInvocation: true,
  noRendererParameterMutation: true,
  noTimelineSpeedMutation: true,
  noTimelineReordering: true,
  noVisualAssetMutation: true,
  noFixtureSource: true,
  noFallback: true,
});

const blocked = (
  input: GenesisTimeDeliveryResponseCalibrationInput,
  reason: GenesisTimeDeliveryResponseCalibrationBlockedReason,
): GenesisTimeDeliveryResponseCalibrationResult => Object.freeze({
  status: "BLOCKED" as const,
  source: "genesis_time_delivery_response_calibration" as const,
  reason,
  calibration: null,
  input,
  boundary: RESPONSE_BOUNDARY,
});

export function calibrateGenesisTimeDeliveryResponse(
  input: GenesisTimeDeliveryResponseCalibrationInput,
): GenesisTimeDeliveryResponseCalibrationResult {
  const runtime = input.runtimeSession;
  if (runtime === null) return blocked(input, "RUNTIME_SESSION_REQUIRED");
  if (
    runtime.sourceExperienceMode !== "REAL_USER_EXPERIENCE" ||
    runtime.sourceProvenance !== "REAL_USER_SESSION" ||
    runtime.sourceReferenceId.trim().length === 0 ||
    runtime.boundary.noPreviewFixture !== true ||
    runtime.boundary.noEngineInvocation !== true ||
    runtime.boundary.noRendererInvocation !== true
  ) {
    return blocked(input, "RUNTIME_SESSION_INVALID");
  }
  if (runtime.currentStage !== "TIME_RESONANCE") {
    return blocked(input, "TIME_RESONANCE_REQUIRED");
  }
  if (runtime.interactionAvailability !== "TIME_DELIVERY") {
    return blocked(input, "TIME_DELIVERY_INTERACTION_REQUIRED");
  }
  const bridge = input.lifeForceManifestationBridge;
  if (bridge === null) return blocked(input, "LIFE_FORCE_MANIFESTATION_BRIDGE_REQUIRED");
  if (
    bridge.semanticRole !== "GENESIS_LIFE_FORCE_MANIFESTATION_BRIDGE" ||
    bridge.sourceReferenceId !== runtime.sourceReferenceId ||
    bridge.provenance.sourceKind !== "REAL_ENGINE_RESULT" ||
    bridge.sourceOnly !== true ||
    bridge.noPresenceTransition !== true ||
    bridge.noStarBeastGeneration !== true ||
    bridge.noFallback !== true
  ) {
    return blocked(
      input,
      bridge.sourceReferenceId !== runtime.sourceReferenceId
        ? "SOURCE_REFERENCE_MISMATCH"
        : "LIFE_FORCE_MANIFESTATION_BRIDGE_INVALID",
    );
  }
  const experience = input.acceptedExperienceSession;
  if (experience === null) {
    return blocked(input, "EXPERIENCE_SESSION_REQUIRED");
  }
  if (
    experience.semanticRole !== "GENESIS_MANIFESTATION_EXPERIENCE_STATE" ||
    experience.currentState !== "TIME_ACCEPTED" ||
    experience.previousState !== "DORMANT" ||
    experience.nextState !== "COORDINATE_SEEKING" ||
    experience.copyKey !== "STAR_RIVER_RESPONDS" ||
    experience.timeDeliveryAccepted !== true ||
    experience.sourceProvenance !== "REAL_USER_SESSION" ||
    experience.sourceReferenceId !== runtime.sourceReferenceId ||
    experience.manifestationBridge !== bridge ||
    experience.boundary.timeDeliveryOnlyManifestationStartAction !== true ||
    experience.boundary.noEngineInvocation !== true ||
    experience.boundary.noSourceMutation !== true ||
    experience.boundary.noRendererInputMutation !== true
  ) {
    return blocked(input, "EXPERIENCE_STATE_INVALID");
  }
  return Object.freeze({
    status: "READY" as const,
    source: "genesis_time_delivery_response_calibration" as const,
    calibration: Object.freeze({
      semanticRole: "GENESIS_TIME_DELIVERY_RESPONSE_CALIBRATION" as const,
      sourceReferenceId: runtime.sourceReferenceId,
      responseState: "TIME_ACCEPTED" as const,
      nextExperienceState: "COORDINATE_SEEKING" as const,
      copyKey: "STAR_RIVER_RESPONDS" as const,
      nextCopyKey: "FIND_MY_POSITION" as const,
      responseMessage: "星河回应：你的时间已进入时序。" as const,
      seekingMessage: "星河正在寻找你的位置。" as const,
      moonPhaseResponse: "MOONLIGHT_GATHERS_TO_TIME" as const,
      starFieldResponse: "STELLAR_RHYTHM_RESPONDS" as const,
      temporalResponse: "TEMPORAL_MOMENT_STABILIZED" as const,
      runtimeStage: "TIME_RESONANCE" as const,
      manifestationBridge: bridge,
      sourceProvenance: "REAL_USER_SESSION" as const,
      noEngineInvocation: true,
      noSourceMutation: true,
      noProjectionMutation: true,
      noRendererParameterMutation: true,
      noTimelineSpeedMutation: true,
      noTimelineReordering: true,
      noFallback: true,
    }),
    input,
    boundary: RESPONSE_BOUNDARY,
  });
}
