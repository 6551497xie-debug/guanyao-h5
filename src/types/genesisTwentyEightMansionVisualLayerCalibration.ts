import type { GenesisRendererVisualRealizationLayer } from "./genesisRendererVisualRealization";
import type { GenesisTwentyEightMansionCoordinateProjection } from "./genesisTwentyEightMansionCoordinateProjection";

export type GenesisTwentyEightMansionVisualLayerVisibility =
  | "HIDDEN"
  | "MANSION_FIELD_VISIBLE"
  | "BIRTH_MANSION_COORDINATE_REVEALED";

export type GenesisTwentyEightMansionVisualCoordinate = Readonly<{
  referenceId: string;
  coordinateIndex: number;
  x: number;
  y: number;
  z: number;
  visualRole: "MANSION_COORDINATE" | "BIRTH_MANSION_COORDINATE";
}>;

export type GenesisTwentyEightMansionVisualLayerCalibrationInput = Readonly<{
  coordinateProjection: GenesisTwentyEightMansionCoordinateProjection | null;
  activeVisualLayer: GenesisRendererVisualRealizationLayer | null;
}>;

export type GenesisTwentyEightMansionVisualLayerCalibration = Readonly<{
  semanticRole: "GENESIS_TWENTY_EIGHT_MANSION_VISUAL_LAYER_CALIBRATION";
  activeVisualLayer: GenesisRendererVisualRealizationLayer | null;
  visibility: GenesisTwentyEightMansionVisualLayerVisibility;
  coordinates: readonly GenesisTwentyEightMansionVisualCoordinate[];
  birthCoordinate: GenesisTwentyEightMansionVisualCoordinate;
  fieldExpression: Readonly<{
    neutralPointSize: number;
    neutralOpacity: number;
    color: "STELLAR_BLUE_WHITE";
  }>;
  birthCoordinateExpression: Readonly<{
    pointSize: number;
    opacity: number;
    color: "LUNAR_GOLD_WHITE";
    breathingPeriodSeconds: number;
    breathingAmplitude: number;
  }>;
  existingProjectionOnly: true;
  noMansionName: true;
  noIdentityCalculation: true;
  noEngineInvocation: true;
  noTimelineMutation: true;
  noExistingCalibrationMutation: true;
}>;

export type GenesisTwentyEightMansionVisualLayerCalibrationBoundary = Readonly<{
  visualCalibrationOnly: true;
  existingCoordinateProjectionOnly: true;
  starRiverShowsCompleteField: true;
  timeResonanceKeepsFieldUnclaimed: true;
  postTimeDeliveryRevealsBirthCoordinate: true;
  noMansionCalculation: true;
  noIdentityCalculation: true;
  noEngineInvocation: true;
  noSourceMutation: true;
  noTimelineMutation: true;
  noExistingCalibrationMutation: true;
  noUIIntegration: true;
  noStorageWrite: true;
}>;

export type GenesisTwentyEightMansionVisualLayerCalibrationResult =
  | Readonly<{
      status: "AVAILABLE";
      calibration: GenesisTwentyEightMansionVisualLayerCalibration;
      input: GenesisTwentyEightMansionVisualLayerCalibrationInput;
      boundary: GenesisTwentyEightMansionVisualLayerCalibrationBoundary;
    }>
  | Readonly<{
      status: "UNAVAILABLE";
      reason: "MANSION_COORDINATE_PROJECTION_REQUIRED";
      calibration: null;
      input: GenesisTwentyEightMansionVisualLayerCalibrationInput;
      boundary: GenesisTwentyEightMansionVisualLayerCalibrationBoundary;
    }>;
