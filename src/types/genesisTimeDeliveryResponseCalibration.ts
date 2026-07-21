import type { GenesisLifeForceManifestationBridge } from "./genesisLifeForceManifestationBridge";
import type { GenesisProductionRuntimeSession } from "./genesisProductionRuntimeConsumer";
import type { GenesisManifestationExperienceStateSession } from "./genesisManifestationExperienceState";

export type GenesisTimeDeliveryResponseState = "TIME_ACCEPTED";
export type GenesisTimeDeliveryResponseCopyKey = "STAR_RIVER_RESPONDS";

export type GenesisTimeDeliveryResponseCalibration = Readonly<{
  semanticRole: "GENESIS_TIME_DELIVERY_RESPONSE_CALIBRATION";
  sourceReferenceId: string;
  responseState: GenesisTimeDeliveryResponseState;
  nextExperienceState: "COORDINATE_SEEKING";
  copyKey: GenesisTimeDeliveryResponseCopyKey;
  nextCopyKey: "FIND_MY_POSITION";
  responseMessage: "星河回应：你的时间已进入时序。";
  seekingMessage: "星河正在寻找你的位置。";
  moonPhaseResponse: "MOONLIGHT_GATHERS_TO_TIME";
  starFieldResponse: "STELLAR_RHYTHM_RESPONDS";
  temporalResponse: "TEMPORAL_MOMENT_STABILIZED";
  runtimeStage: "TIME_RESONANCE";
  manifestationBridge: GenesisLifeForceManifestationBridge;
  sourceProvenance: "REAL_USER_SESSION";
  noEngineInvocation: true;
  noSourceMutation: true;
  noProjectionMutation: true;
  noRendererParameterMutation: true;
  noTimelineSpeedMutation: true;
  noTimelineReordering: true;
  noFallback: true;
}>;

export type GenesisTimeDeliveryResponseCalibrationBoundary = Readonly<{
  timeDeliveryResponseOnly: true;
  existingRuntimeSessionOnly: true;
  existingManifestationBridgeOnly: true;
  explicitTimeDeliveryOnly: true;
  noEngineInvocation: true;
  noSourceMutation: true;
  noProjectionMutation: true;
  noRendererInvocation: true;
  noRendererParameterMutation: true;
  noTimelineSpeedMutation: true;
  noTimelineReordering: true;
  noVisualAssetMutation: true;
  noFixtureSource: true;
  noFallback: true;
}>;

export type GenesisTimeDeliveryResponseCalibrationInput = Readonly<{
  runtimeSession: GenesisProductionRuntimeSession | null;
  lifeForceManifestationBridge: GenesisLifeForceManifestationBridge | null;
  acceptedExperienceSession: GenesisManifestationExperienceStateSession | null;
}>;

export type GenesisTimeDeliveryResponseCalibrationBlockedReason =
  | "RUNTIME_SESSION_REQUIRED"
  | "RUNTIME_SESSION_INVALID"
  | "TIME_RESONANCE_REQUIRED"
  | "TIME_DELIVERY_INTERACTION_REQUIRED"
  | "LIFE_FORCE_MANIFESTATION_BRIDGE_REQUIRED"
  | "LIFE_FORCE_MANIFESTATION_BRIDGE_INVALID"
  | "SOURCE_REFERENCE_MISMATCH"
  | "EXPERIENCE_SESSION_REQUIRED"
  | "EXPERIENCE_STATE_INVALID";

export type GenesisTimeDeliveryResponseCalibrationResult =
  | Readonly<{
      status: "READY";
      source: "genesis_time_delivery_response_calibration";
      calibration: GenesisTimeDeliveryResponseCalibration;
      input: GenesisTimeDeliveryResponseCalibrationInput;
      boundary: GenesisTimeDeliveryResponseCalibrationBoundary;
    }>
  | Readonly<{
      status: "BLOCKED";
      source: "genesis_time_delivery_response_calibration";
      reason: GenesisTimeDeliveryResponseCalibrationBlockedReason;
      calibration: null;
      input: GenesisTimeDeliveryResponseCalibrationInput;
      boundary: GenesisTimeDeliveryResponseCalibrationBoundary;
    }>;
