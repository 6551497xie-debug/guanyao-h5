import { mapGenesisPerspectiveCalibration } from "./genesisPerspectiveCalibration";
import { mapGenesisPresenceRecognitionCalibration } from "./genesisPresenceRecognitionCalibration";
import { mapGenesisRendererVisualRealization } from "./genesisRendererVisualRealization";
import { mapGenesisSpatialDistanceCalibration } from "./genesisSpatialDistanceCalibration";
import type { GenesisRendererConsumerContract } from "../types/genesisRendererConsumerContract";
import type { GenesisProductionRuntimeSession } from "../types/genesisProductionRuntimeConsumer";
import type {
  GenesisPerspectiveCalibrationCore,
  GenesisPresenceRecognitionCalibrationCore,
  GenesisProductionVisualCalibrationBridgeBoundary,
  GenesisProductionVisualCalibrationBridgeResult,
  GenesisRendererVisualRealizationCore,
  GenesisSpatialDistanceCalibrationCore,
} from "../types/genesisProductionVisualCalibrationBridge";

export const GENESIS_PRODUCTION_VISUAL_CALIBRATION_BRIDGE_BOUNDARY: GenesisProductionVisualCalibrationBridgeBoundary = Object.freeze({
  productionCalibrationBridgeOnly: true,
  realUserRuntimeSessionOnly: true,
  frozenCalibrationSourceOnly: true,
  rendererCoreShapeOnly: true,
  prototypeAuthorizationNotInherited: true,
  noFixtureSource: true,
  noPreviewRuntime: true,
  noEngineInvocation: true,
  noRendererInvocation: true,
  noCalibrationValueMutation: true,
  noVisualSemanticMutation: true,
  noTimelineMutation: true,
  noStorageWrite: true,
});

const RENDER_INTENT_BY_STAGE: Readonly<Record<GenesisProductionRuntimeSession["currentStage"], GenesisRendererConsumerContract["renderIntent"]>> = Object.freeze({
  MOON_ORIGIN: "TAIYIN_ENTRY",
  STAR_RIVER: "STELLAR_ORDER",
  TIME_RESONANCE: "TIME_RESPONSE",
  SYMBOL_REVEAL: "SYMBOLIC_FIELD",
  HEXAGRAM_IMPRINT: "CHANGE_IMPRINT",
  LIFE_FORCE: "LIFE_FORCE_MOTION",
  STAR_BEAST_REVEAL: "LIFE_PRESENCE",
  COMPLETION: "RECOGNITION_HOLD",
});

const REFERENCE_TYPE_BY_STAGE = Object.freeze({
  MOON_ORIGIN: "MOON_ORIGIN_VISUAL_STATE",
  STAR_RIVER: "STAR_RIVER_VISUAL_STATE",
  TIME_RESONANCE: "TIME_RESONANCE_VISUAL_STATE",
  SYMBOL_REVEAL: "SYMBOL_VISUAL_STATE",
  HEXAGRAM_IMPRINT: "HEXAGRAM_VISUAL_STATE",
  LIFE_FORCE: "LIFE_FORCE_VISUAL_STATE",
  STAR_BEAST_REVEAL: "PERSONAL_STAR_BEAST_PRESENCE_VISUAL_STATE",
  COMPLETION: "GENESIS_COMPLETION_MOMENT_REVIEW",
} as const);

const createFrozenCalibrationContract = (session: GenesisProductionRuntimeSession): GenesisRendererConsumerContract => {
  const state = session.currentStage === "COMPLETION"
    ? { runtimeBoundary: { genesisLayerOnly: true, noIdentityMutation: true, noEngineInvocation: true, noRendererInvocation: true, noVisualStateMutation: true, noRealityCalculation: true, noCrystal: true, noStorage: true } }
    : { visualOnly: true, identityBlind: true, noEngineInvocation: true, noRendererInvocation: true, noIdentity: true };
  return Object.freeze({
    runtimeStage: session.currentStage,
    visualStateReference: Object.freeze({ stage: session.currentStage, referenceType: REFERENCE_TYPE_BY_STAGE[session.currentStage], state }) as GenesisRendererConsumerContract["visualStateReference"],
    timelineState: session.timelineState,
    renderIntent: RENDER_INTENT_BY_STAGE[session.currentStage],
    transitionProgress: 1,
  });
};

const withoutPrototypeAuthorization = <T extends { isolatedPrototypeOnly: true }>(value: T): Omit<T, "isolatedPrototypeOnly"> => {
  const { isolatedPrototypeOnly: _prototypeAuthorization, ...coreValue } = value;
  return Object.freeze(coreValue);
};

const blocked = (reason: "RUNTIME_SESSION_INVALID" | "FROZEN_CALIBRATION_NOT_READY"): GenesisProductionVisualCalibrationBridgeResult => Object.freeze({
  status: "BLOCKED" as const,
  reason,
  bundle: null,
  boundary: GENESIS_PRODUCTION_VISUAL_CALIBRATION_BRIDGE_BOUNDARY,
});

export function bridgeGenesisProductionRuntimeToVisualCalibration(session: GenesisProductionRuntimeSession): GenesisProductionVisualCalibrationBridgeResult {
  if (session.sourceExperienceMode !== "REAL_USER_EXPERIENCE" || session.sourceProvenance !== "REAL_USER_SESSION" || session.sourceReferenceId.trim().length === 0 || session.timelineState.stage !== session.currentStage || session.boundary.noPreviewFixture !== true || session.boundary.noEngineInvocation !== true || session.boundary.noRendererInvocation !== true) {
    return blocked("RUNTIME_SESSION_INVALID");
  }
  const realizationResult = mapGenesisRendererVisualRealization({ rendererConsumerContract: createFrozenCalibrationContract(session) });
  if (realizationResult.status !== "READY") return blocked("FROZEN_CALIBRATION_NOT_READY");
  const perspectiveResult = mapGenesisPerspectiveCalibration({ visualRealization: realizationResult.realization });
  if (perspectiveResult.status !== "READY") return blocked("FROZEN_CALIBRATION_NOT_READY");
  const presenceResult = mapGenesisPresenceRecognitionCalibration({ perspectiveCalibration: perspectiveResult.calibration });
  const presence = presenceResult.status === "READY" ? presenceResult.calibration : null;
  const spatialResult = mapGenesisSpatialDistanceCalibration({ visualRealization: realizationResult.realization, perspectiveCalibration: perspectiveResult.calibration, presenceRecognitionCalibration: presence });
  if (spatialResult.status !== "READY") return blocked("FROZEN_CALIBRATION_NOT_READY");
  return Object.freeze({
    status: "READY" as const,
    bundle: Object.freeze({
      source: "genesis_production_visual_calibration_bridge" as const,
      sourceReferenceId: session.sourceReferenceId,
      sourceProvenance: "REAL_USER_SESSION" as const,
      runtimeStage: session.currentStage,
      genesisVisualRealization: withoutPrototypeAuthorization(realizationResult.realization) as GenesisRendererVisualRealizationCore,
      genesisPerspectiveCalibration: withoutPrototypeAuthorization(perspectiveResult.calibration) as GenesisPerspectiveCalibrationCore,
      genesisPresenceRecognitionCalibration: presence === null ? null : withoutPrototypeAuthorization(presence) as GenesisPresenceRecognitionCalibrationCore,
      genesisSpatialDistanceCalibration: withoutPrototypeAuthorization(spatialResult.calibration) as GenesisSpatialDistanceCalibrationCore,
    }),
    boundary: GENESIS_PRODUCTION_VISUAL_CALIBRATION_BRIDGE_BOUNDARY,
  });
}
