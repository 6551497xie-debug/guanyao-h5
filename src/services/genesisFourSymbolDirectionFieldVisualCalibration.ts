import type {
  GenesisFourSymbolDirectionFieldVisualCalibration,
  GenesisFourSymbolDirectionFieldVisualCalibrationBoundary,
  GenesisFourSymbolDirectionFieldVisualCalibrationInput,
  GenesisFourSymbolDirectionFieldVisualCalibrationResult,
  GenesisFourSymbolDirectionFieldPhase,
} from "../types/genesisFourSymbolDirectionFieldVisualCalibration";

export const GENESIS_FOUR_SYMBOL_DIRECTION_FIELD_VISUAL_CALIBRATION_BOUNDARY: GenesisFourSymbolDirectionFieldVisualCalibrationBoundary =
  Object.freeze({
    visualCalibrationOnly: true,
    existingLifeDirectionProjectionOnly: true,
    coordinateFoundBeforeDirectionAwakening: true,
    directionFieldNotAnimalDisplay: true,
    noFourSymbolCalculation: true,
    noAnimalAsset: true,
    noArchetypeInference: true,
    noStarBeastAmplification: true,
    noEngineInvocation: true,
    noSourceMutation: true,
    noTimelineSpeedMutation: true,
    noRendererAuthorizationMutation: true,
    noUIFlowMutation: true,
    noStorageWrite: true,
  });

const FIELD_BY_DIRECTION = Object.freeze({
  东: Object.freeze({ axisX: 1, axisY: 0, responseMessage: "生命力量正在东方展开。" }),
  南: Object.freeze({ axisX: 0, axisY: -1, responseMessage: "生命力量正在南方显化。" }),
  西: Object.freeze({ axisX: -1, axisY: 0, responseMessage: "生命力量正在西方聚成行动。" }),
  北: Object.freeze({ axisX: 0, axisY: 1, responseMessage: "生命力量正在北方沉潜。" }),
});

const phaseFor = (
  activeVisualLayer: GenesisFourSymbolDirectionFieldVisualCalibrationInput["activeVisualLayer"],
): GenesisFourSymbolDirectionFieldPhase => {
  if (activeVisualLayer === "HEXAGRAM_IMPRINT") return "AWAKENING";
  if (
    activeVisualLayer === "LIFE_FORCE" ||
    activeVisualLayer === "STAR_BEAST_REVEAL" ||
    activeVisualLayer === "COMPLETION"
  ) {
    return "ESTABLISHED";
  }
  return "HIDDEN";
};

export function calibrateGenesisFourSymbolDirectionField(
  input: GenesisFourSymbolDirectionFieldVisualCalibrationInput,
): GenesisFourSymbolDirectionFieldVisualCalibrationResult {
  const projection = input.lifeDirectionProjection;
  if (projection === null) {
    return Object.freeze({
      status: "UNAVAILABLE" as const,
      reason: "LIFE_DIRECTION_PROJECTION_REQUIRED" as const,
      calibration: null,
      input,
      boundary:
        GENESIS_FOUR_SYMBOL_DIRECTION_FIELD_VISUAL_CALIBRATION_BOUNDARY,
    });
  }

  const field = FIELD_BY_DIRECTION[projection.direction];
  const phase = phaseFor(input.activeVisualLayer);
  const calibration: GenesisFourSymbolDirectionFieldVisualCalibration =
    Object.freeze({
      semanticRole:
        "GENESIS_FOUR_SYMBOL_DIRECTION_FIELD_VISUAL_CALIBRATION",
      sourceReferenceId: projection.sourceReferenceId,
      mansionCoordinateReferenceId:
        projection.mansionCoordinateReference.referenceId,
      directionProjectionReference:
        "GENESIS_FOUR_SYMBOL_LIFE_DIRECTION_PROJECTION",
      activeVisualLayer: input.activeVisualLayer,
      phase,
      direction: projection.direction,
      lifeDirection: projection.lifeDirection,
      directionFieldExpression: Object.freeze({
        axisX: field.axisX,
        axisY: field.axisY,
        fieldReach: 2.9,
        parallelSpread: 0.62,
        lineCount: 5 as const,
        lineOpacity: phase === "AWAKENING" ? 0.2 : phase === "ESTABLISHED" ? 0.09 : 0,
        driftDistance: phase === "AWAKENING" ? 0.18 : phase === "ESTABLISHED" ? 0.06 : 0,
        breathingPeriodSeconds: 6.4,
        breathingAmplitude: 0.12,
      }),
      responseMessage: field.responseMessage,
      provenance: Object.freeze({
        sourceKind: projection.provenance.sourceKind,
        sourceReferenceId: projection.sourceReferenceId,
        mansionCoordinateReferenceId:
          projection.mansionCoordinateReference.referenceId,
        directionProjectionSemanticRole: projection.semanticRole,
      }),
      existingDirectionProjectionOnly: true,
      noFourSymbolCalculation: true,
      noAnimalIdentity: true,
      noAnimalGeometry: true,
      noArchetypeInference: true,
      noStarBeastAmplification: true,
      noEngineInvocation: true,
      noSourceMutation: true,
      noTimelineMutation: true,
    });

  return Object.freeze({
    status: "AVAILABLE" as const,
    calibration,
    input,
    boundary: GENESIS_FOUR_SYMBOL_DIRECTION_FIELD_VISUAL_CALIBRATION_BOUNDARY,
  });
}
