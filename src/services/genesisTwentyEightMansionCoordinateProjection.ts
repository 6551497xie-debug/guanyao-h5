import type {
  GenesisTwentyEightMansionCoordinateProjection,
  GenesisTwentyEightMansionCoordinateProjectionBlockedReason,
  GenesisTwentyEightMansionCoordinateProjectionBoundary,
  GenesisTwentyEightMansionCoordinateProjectionInput,
  GenesisTwentyEightMansionCoordinateProjectionResult,
} from "../types/genesisTwentyEightMansionCoordinateProjection";

const COORDINATE_COUNT = 28;

export const GENESIS_TWENTY_EIGHT_MANSION_COORDINATE_PROJECTION_BOUNDARY: GenesisTwentyEightMansionCoordinateProjectionBoundary =
  Object.freeze({
    projectionOnly: true,
    existingMansionResultOnly: true,
    noEngineInvocation: true,
    noMansionCalculation: true,
    noIdentitySelection: true,
    noAstronomicalMeasurementClaim: true,
    noRendererInvocation: true,
    noRendererInputMutation: true,
    noTimelineMutation: true,
    noVisualCalibrationMutation: true,
    noUIIntegration: true,
    noStorageWrite: true,
  });

const blocked = (
  input: GenesisTwentyEightMansionCoordinateProjectionInput,
  reason: GenesisTwentyEightMansionCoordinateProjectionBlockedReason,
): GenesisTwentyEightMansionCoordinateProjectionResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    reason,
    projection: null,
    input,
    boundary: GENESIS_TWENTY_EIGHT_MANSION_COORDINATE_PROJECTION_BOUNDARY,
  });

export function projectGenesisTwentyEightMansionCoordinates(
  input: GenesisTwentyEightMansionCoordinateProjectionInput,
): GenesisTwentyEightMansionCoordinateProjectionResult {
  const sourceReferenceId = input.sourceReferenceId.trim();
  if (!sourceReferenceId) {
    return blocked(input, "SOURCE_REFERENCE_ID_REQUIRED");
  }

  const mansionReference = input.mansionResultReference;
  if (mansionReference === null) {
    return blocked(input, "MANSION_RESULT_REFERENCE_REQUIRED");
  }
  if (
    mansionReference.referenceType !==
      "STAR_BEAST_GENESIS_MANSION_ENGINE_RESULT" ||
    mansionReference.sourceEngine !== "guanyao_starbeast_engine"
  ) {
    return blocked(input, "MANSION_RESULT_REFERENCE_INVALID");
  }

  const mansionResult = mansionReference.resultReference;
  if (
    mansionResult.status !== "READY" ||
    mansionResult.protocolVersion !== "GUANYAO_LUNAR_MANSION_V1" ||
    mansionResult.calculationBasis !==
      "GREGORIAN_TO_LUNAR_MONTH_DAY_MANSION"
  ) {
    return blocked(input, "MANSION_RESULT_NOT_READY");
  }
  if (
    !Number.isInteger(mansionResult.mansionIndex) ||
    mansionResult.mansionIndex < 0 ||
    mansionResult.mansionIndex >= COORDINATE_COUNT
  ) {
    return blocked(input, "MANSION_COORDINATE_INDEX_INVALID");
  }

  const coordinates = Object.freeze(
    Array.from({ length: COORDINATE_COUNT }, (_, coordinateIndex) =>
      Object.freeze({
        referenceType: "GENESIS_MANSION_COORDINATE_SLOT" as const,
        referenceId: `genesis:mansion-coordinate:${String(coordinateIndex + 1).padStart(2, "0")}`,
        coordinateIndex,
        coordinateOrdinal: coordinateIndex + 1,
        normalizedOrbitPosition: coordinateIndex / COORDINATE_COUNT,
        isBirthMansionCoordinate:
          coordinateIndex === mansionResult.mansionIndex,
      }),
    ),
  );
  const activeCoordinate = coordinates[mansionResult.mansionIndex];

  const projection: GenesisTwentyEightMansionCoordinateProjection =
    Object.freeze({
      semanticRole:
        "GENESIS_TWENTY_EIGHT_MANSION_COORDINATE_PROJECTION",
      sourceKind: input.sourceKind,
      sourceReferenceId,
      sourceEngine: "guanyao_starbeast_engine",
      sourceProtocolVersion: "GUANYAO_LUNAR_MANSION_V1",
      coordinateSystem: "GENESIS_NORMALIZED_MANSION_ORBIT",
      coordinateCount: COORDINATE_COUNT,
      coordinates,
      birthMansion: Object.freeze({
        mansion: mansionResult.mansion,
        mansionIndex: mansionResult.mansionIndex,
        coordinateReferenceId: activeCoordinate.referenceId,
      }),
      existingMansionResultOnly: true,
      noMansionCalculation: true,
      noIdentitySelection: true,
      noAstronomicalMeasurementClaim: true,
      noRendererParameters: true,
      noTimelineMutation: true,
      noVisualCalibrationMutation: true,
      noFallback: true,
    });

  return Object.freeze({
    status: "AVAILABLE" as const,
    projection,
    input,
    boundary: GENESIS_TWENTY_EIGHT_MANSION_COORDINATE_PROJECTION_BOUNDARY,
  });
}
