import type { GenesisPerspectiveCalibration } from "./genesisPerspectiveCalibration";
import type { GenesisPresenceRecognitionCalibration } from "./genesisPresenceRecognitionCalibration";
import type { GenesisProductionRuntimeSession } from "./genesisProductionRuntimeConsumer";
import type { GenesisRendererVisualRealization } from "./genesisRendererVisualRealization";
import type { GenesisSpatialDistanceCalibration } from "./genesisSpatialDistanceCalibration";

export type GenesisRendererVisualRealizationCore = Omit<GenesisRendererVisualRealization, "isolatedPrototypeOnly">;
export type GenesisPerspectiveCalibrationCore = Omit<GenesisPerspectiveCalibration, "isolatedPrototypeOnly">;
export type GenesisPresenceRecognitionCalibrationCore = Omit<GenesisPresenceRecognitionCalibration, "isolatedPrototypeOnly">;
export type GenesisSpatialDistanceCalibrationCore = Omit<GenesisSpatialDistanceCalibration, "isolatedPrototypeOnly">;

export type GenesisProductionVisualCalibrationBundle = Readonly<{
  source: "genesis_production_visual_calibration_bridge";
  sourceReferenceId: string;
  sourceProvenance: "REAL_USER_SESSION";
  runtimeStage: GenesisProductionRuntimeSession["currentStage"];
  genesisVisualRealization: GenesisRendererVisualRealizationCore;
  genesisPerspectiveCalibration: GenesisPerspectiveCalibrationCore;
  genesisPresenceRecognitionCalibration: GenesisPresenceRecognitionCalibrationCore | null;
  genesisSpatialDistanceCalibration: GenesisSpatialDistanceCalibrationCore;
}>;

export type GenesisProductionVisualCalibrationBridgeBoundary = Readonly<{
  productionCalibrationBridgeOnly: true;
  realUserRuntimeSessionOnly: true;
  frozenCalibrationSourceOnly: true;
  rendererCoreShapeOnly: true;
  prototypeAuthorizationNotInherited: true;
  noFixtureSource: true;
  noPreviewRuntime: true;
  noEngineInvocation: true;
  noRendererInvocation: true;
  noCalibrationValueMutation: true;
  noVisualSemanticMutation: true;
  noTimelineMutation: true;
  noStorageWrite: true;
}>;

export type GenesisProductionVisualCalibrationBridgeResult =
  | Readonly<{
      status: "READY";
      bundle: GenesisProductionVisualCalibrationBundle;
      boundary: GenesisProductionVisualCalibrationBridgeBoundary;
    }>
  | Readonly<{
      status: "BLOCKED";
      reason: "RUNTIME_SESSION_INVALID" | "FROZEN_CALIBRATION_NOT_READY";
      bundle: null;
      boundary: GenesisProductionVisualCalibrationBridgeBoundary;
    }>;
