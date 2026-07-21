import type { GenesisRendererVisualRealizationLayer } from "../types/genesisRendererVisualRealization";
import type {
  GenesisTwentyEightMansionVisualLayerCalibration,
  GenesisTwentyEightMansionVisualLayerCalibrationBoundary,
  GenesisTwentyEightMansionVisualLayerCalibrationInput,
  GenesisTwentyEightMansionVisualLayerCalibrationResult,
  GenesisTwentyEightMansionVisualLayerVisibility,
} from "../types/genesisTwentyEightMansionVisualLayerCalibration";

const MANSION_VISUAL_CALIBRATION = Object.freeze({
  orbitRadiusX: 2.65,
  orbitRadiusY: 1.32,
  depth: -0.55,
  neutralPointSize: 0.042,
  neutralOpacity: 0.34,
  birthPointSize: 0.085,
  birthOpacity: 0.92,
  birthBreathingPeriodSeconds: 5.8,
  birthBreathingAmplitude: 0.12,
});

export const GENESIS_TWENTY_EIGHT_MANSION_VISUAL_LAYER_CALIBRATION_BOUNDARY: GenesisTwentyEightMansionVisualLayerCalibrationBoundary =
  Object.freeze({
    visualCalibrationOnly: true,
    existingCoordinateProjectionOnly: true,
    starRiverShowsCompleteField: true,
    timeResonanceKeepsFieldUnclaimed: true,
    postTimeDeliveryRevealsBirthCoordinate: true,
    noMansionCalculation: true,
    noIdentityCalculation: true,
    noEngineInvocation: true,
    noSourceMutation: true,
    noTimelineMutation: true,
    noExistingCalibrationMutation: true,
    noUIIntegration: true,
    noStorageWrite: true,
  });

const BIRTH_COORDINATE_REVEAL_LAYERS: ReadonlySet<GenesisRendererVisualRealizationLayer> =
  new Set([
    "SYMBOL_REVEAL",
    "HEXAGRAM_IMPRINT",
    "LIFE_FORCE",
    "STAR_BEAST_REVEAL",
    "COMPLETION",
  ]);

const visibilityFor = (
  activeVisualLayer: GenesisRendererVisualRealizationLayer | null,
): GenesisTwentyEightMansionVisualLayerVisibility => {
  if (activeVisualLayer === "STAR_RIVER" || activeVisualLayer === "TIME_RESONANCE") {
    return "MANSION_FIELD_VISIBLE";
  }
  if (
    activeVisualLayer !== null &&
    BIRTH_COORDINATE_REVEAL_LAYERS.has(activeVisualLayer)
  ) {
    return "BIRTH_MANSION_COORDINATE_REVEALED";
  }
  return "HIDDEN";
};

export function calibrateGenesisTwentyEightMansionVisualLayer(
  input: GenesisTwentyEightMansionVisualLayerCalibrationInput,
): GenesisTwentyEightMansionVisualLayerCalibrationResult {
  const projection = input.coordinateProjection;
  if (projection === null) {
    return Object.freeze({
      status: "UNAVAILABLE" as const,
      reason: "MANSION_COORDINATE_PROJECTION_REQUIRED" as const,
      calibration: null,
      input,
      boundary:
        GENESIS_TWENTY_EIGHT_MANSION_VISUAL_LAYER_CALIBRATION_BOUNDARY,
    });
  }

  const visibility = visibilityFor(input.activeVisualLayer);
  const revealBirthCoordinate =
    visibility === "BIRTH_MANSION_COORDINATE_REVEALED";
  const coordinates = Object.freeze(
    projection.coordinates.map((coordinate) => {
      const angle = coordinate.normalizedOrbitPosition * Math.PI * 2 - Math.PI / 2;
      return Object.freeze({
        referenceId: coordinate.referenceId,
        coordinateIndex: coordinate.coordinateIndex,
        x: Math.cos(angle) * MANSION_VISUAL_CALIBRATION.orbitRadiusX,
        y: Math.sin(angle) * MANSION_VISUAL_CALIBRATION.orbitRadiusY,
        z: MANSION_VISUAL_CALIBRATION.depth,
        visualRole:
          revealBirthCoordinate && coordinate.isBirthMansionCoordinate
            ? "BIRTH_MANSION_COORDINATE" as const
            : "MANSION_COORDINATE" as const,
      });
    }),
  );
  const birthCoordinate = coordinates[projection.birthMansion.mansionIndex]!;

  const calibration: GenesisTwentyEightMansionVisualLayerCalibration =
    Object.freeze({
      semanticRole:
        "GENESIS_TWENTY_EIGHT_MANSION_VISUAL_LAYER_CALIBRATION",
      activeVisualLayer: input.activeVisualLayer,
      visibility,
      coordinates,
      birthCoordinate,
      fieldExpression: Object.freeze({
        neutralPointSize: MANSION_VISUAL_CALIBRATION.neutralPointSize,
        neutralOpacity: MANSION_VISUAL_CALIBRATION.neutralOpacity,
        color: "STELLAR_BLUE_WHITE" as const,
      }),
      birthCoordinateExpression: Object.freeze({
        pointSize: MANSION_VISUAL_CALIBRATION.birthPointSize,
        opacity: MANSION_VISUAL_CALIBRATION.birthOpacity,
        color: "LUNAR_GOLD_WHITE" as const,
        breathingPeriodSeconds:
          MANSION_VISUAL_CALIBRATION.birthBreathingPeriodSeconds,
        breathingAmplitude:
          MANSION_VISUAL_CALIBRATION.birthBreathingAmplitude,
      }),
      existingProjectionOnly: true,
      noMansionName: true,
      noIdentityCalculation: true,
      noEngineInvocation: true,
      noTimelineMutation: true,
      noExistingCalibrationMutation: true,
    });

  return Object.freeze({
    status: "AVAILABLE" as const,
    calibration,
    input,
    boundary:
      GENESIS_TWENTY_EIGHT_MANSION_VISUAL_LAYER_CALIBRATION_BOUNDARY,
  });
}
