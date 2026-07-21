import type { GenesisFourSymbolLifeDirectionProjection } from "./genesisFourSymbolLifeDirectionProjection";
import type { GenesisRendererVisualRealizationLayer } from "./genesisRendererVisualRealization";

export type GenesisFourSymbolDirectionFieldPhase =
  | "HIDDEN"
  | "AWAKENING"
  | "ESTABLISHED";

export type GenesisFourSymbolDirectionFieldVisualCalibrationInput = Readonly<{
  lifeDirectionProjection: GenesisFourSymbolLifeDirectionProjection | null;
  activeVisualLayer: GenesisRendererVisualRealizationLayer | null;
}>;

export type GenesisFourSymbolDirectionFieldVisualCalibration = Readonly<{
  semanticRole: "GENESIS_FOUR_SYMBOL_DIRECTION_FIELD_VISUAL_CALIBRATION";
  sourceReferenceId: string;
  mansionCoordinateReferenceId: string;
  directionProjectionReference: "GENESIS_FOUR_SYMBOL_LIFE_DIRECTION_PROJECTION";
  activeVisualLayer: GenesisRendererVisualRealizationLayer | null;
  phase: GenesisFourSymbolDirectionFieldPhase;
  direction: GenesisFourSymbolLifeDirectionProjection["direction"];
  lifeDirection: GenesisFourSymbolLifeDirectionProjection["lifeDirection"];
  directionFieldExpression: Readonly<{
    axisX: number;
    axisY: number;
    fieldReach: number;
    parallelSpread: number;
    lineCount: 5;
    lineOpacity: number;
    driftDistance: number;
    breathingPeriodSeconds: number;
    breathingAmplitude: number;
  }>;
  responseMessage: string;
  provenance: Readonly<{
    sourceKind: GenesisFourSymbolLifeDirectionProjection["provenance"]["sourceKind"];
    sourceReferenceId: string;
    mansionCoordinateReferenceId: string;
    directionProjectionSemanticRole: "GENESIS_FOUR_SYMBOL_LIFE_DIRECTION_PROJECTION";
  }>;
  existingDirectionProjectionOnly: true;
  noFourSymbolCalculation: true;
  noAnimalIdentity: true;
  noAnimalGeometry: true;
  noArchetypeInference: true;
  noStarBeastAmplification: true;
  noEngineInvocation: true;
  noSourceMutation: true;
  noTimelineMutation: true;
}>;

export type GenesisFourSymbolDirectionFieldVisualCalibrationBoundary =
  Readonly<{
    visualCalibrationOnly: true;
    existingLifeDirectionProjectionOnly: true;
    coordinateFoundBeforeDirectionAwakening: true;
    directionFieldNotAnimalDisplay: true;
    noFourSymbolCalculation: true;
    noAnimalAsset: true;
    noArchetypeInference: true;
    noStarBeastAmplification: true;
    noEngineInvocation: true;
    noSourceMutation: true;
    noTimelineSpeedMutation: true;
    noRendererAuthorizationMutation: true;
    noUIFlowMutation: true;
    noStorageWrite: true;
  }>;

export type GenesisFourSymbolDirectionFieldVisualCalibrationResult =
  | Readonly<{
      status: "AVAILABLE";
      calibration: GenesisFourSymbolDirectionFieldVisualCalibration;
      input: GenesisFourSymbolDirectionFieldVisualCalibrationInput;
      boundary: GenesisFourSymbolDirectionFieldVisualCalibrationBoundary;
    }>
  | Readonly<{
      status: "UNAVAILABLE";
      reason: "LIFE_DIRECTION_PROJECTION_REQUIRED";
      calibration: null;
      input: GenesisFourSymbolDirectionFieldVisualCalibrationInput;
      boundary: GenesisFourSymbolDirectionFieldVisualCalibrationBoundary;
    }>;
