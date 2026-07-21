import type {
  FourSymbol,
  FourSymbolDirection,
} from "../types/guanyaoStarbeast";
import type {
  GenesisFourSymbolLifeDirection,
  GenesisFourSymbolLifeDirectionProjection,
  GenesisFourSymbolLifeDirectionProjectionBlockedReason,
  GenesisFourSymbolLifeDirectionProjectionBoundary,
  GenesisFourSymbolLifeDirectionProjectionInput,
  GenesisFourSymbolLifeDirectionProjectionResult,
} from "../types/genesisFourSymbolLifeDirectionProjection";

export const GENESIS_FOUR_SYMBOL_LIFE_DIRECTION_PROJECTION_BOUNDARY: GenesisFourSymbolLifeDirectionProjectionBoundary =
  Object.freeze({
    projectionOnly: true,
    existingFourSymbolResultOnly: true,
    existingMansionCoordinateProjectionOnly: true,
    noEngineInvocation: true,
    noFourSymbolCalculation: true,
    noMansionCalculation: true,
    noIdentitySelection: true,
    noRendererInvocation: true,
    noRendererInputMutation: true,
    noTimelineMutation: true,
    noVisualCalibrationMutation: true,
    noUIIntegration: true,
    noRuntimeIntegration: true,
    noStorageWrite: true,
    noFallback: true,
  });

const blocked = (
  input: GenesisFourSymbolLifeDirectionProjectionInput,
  reason: GenesisFourSymbolLifeDirectionProjectionBlockedReason,
): GenesisFourSymbolLifeDirectionProjectionResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    reason,
    projection: null,
    input,
    boundary: GENESIS_FOUR_SYMBOL_LIFE_DIRECTION_PROJECTION_BOUNDARY,
  });

const DIRECTION_BY_SYMBOL: Readonly<
  Record<FourSymbol, Readonly<{ direction: FourSymbolDirection; lifeDirection: GenesisFourSymbolLifeDirection }>>
> = Object.freeze({
  青龙: Object.freeze({ direction: "东", lifeDirection: "生发" }),
  朱雀: Object.freeze({ direction: "南", lifeDirection: "显化" }),
  白虎: Object.freeze({ direction: "西", lifeDirection: "行动" }),
  玄武: Object.freeze({ direction: "北", lifeDirection: "沉潜" }),
});

export function projectGenesisFourSymbolLifeDirection(
  input: GenesisFourSymbolLifeDirectionProjectionInput,
): GenesisFourSymbolLifeDirectionProjectionResult {
  const sourceReferenceId = input.sourceReferenceId.trim();
  if (!sourceReferenceId) {
    return blocked(input, "SOURCE_REFERENCE_ID_REQUIRED");
  }

  const mansionProjection = input.mansionCoordinateProjection;
  if (mansionProjection === null) {
    return blocked(input, "MANSION_COORDINATE_PROJECTION_REQUIRED");
  }
  if (
    mansionProjection.semanticRole !==
      "GENESIS_TWENTY_EIGHT_MANSION_COORDINATE_PROJECTION" ||
    mansionProjection.coordinateCount !== 28 ||
    mansionProjection.existingMansionResultOnly !== true ||
    mansionProjection.noFallback !== true ||
    mansionProjection.sourceReferenceId !== sourceReferenceId
  ) {
    return blocked(
      input,
      mansionProjection.sourceReferenceId !== sourceReferenceId
        ? "SOURCE_REFERENCE_MISMATCH"
        : "MANSION_COORDINATE_PROJECTION_INVALID",
    );
  }

  const fourSymbolReference = input.fourSymbolResultReference;
  if (fourSymbolReference === null) {
    return blocked(input, "FOUR_SYMBOL_RESULT_REFERENCE_REQUIRED");
  }
  if (
    fourSymbolReference.referenceType !==
      "STAR_BEAST_GENESIS_FOUR_SYMBOL_ENGINE_RESULT" ||
    fourSymbolReference.sourceEngine !== "guanyao_starbeast_engine"
  ) {
    return blocked(input, "FOUR_SYMBOL_RESULT_REFERENCE_INVALID");
  }

  const result = fourSymbolReference.resultReference;
  if (
    result.status !== "READY" ||
    result.protocolVersion !== "GUANYAO_LUNAR_MANSION_V1" ||
    result.calculationBasis !== "GREGORIAN_TO_LUNAR_MONTH_DAY_MANSION"
  ) {
    return blocked(input, "FOUR_SYMBOL_RESULT_NOT_READY");
  }
  if (
    result.mansionIndex !== mansionProjection.birthMansion.mansionIndex ||
    result.mansion !== mansionProjection.birthMansion.mansion
  ) {
    return blocked(input, "MANSION_SOURCE_MISMATCH");
  }

  const mapping = DIRECTION_BY_SYMBOL[result.fourSymbol];
  if (mapping === undefined || mapping.direction !== result.direction) {
    return blocked(input, "FOUR_SYMBOL_DIRECTION_MISMATCH");
  }

  const birthCoordinate = mansionProjection.coordinates.find(
    (coordinate) =>
      coordinate.referenceId === mansionProjection.birthMansion.coordinateReferenceId &&
      coordinate.coordinateIndex === mansionProjection.birthMansion.mansionIndex &&
      coordinate.isBirthMansionCoordinate,
  );
  if (birthCoordinate === undefined) {
    return blocked(input, "MANSION_COORDINATE_PROJECTION_INVALID");
  }

  const projection: GenesisFourSymbolLifeDirectionProjection = Object.freeze({
    semanticRole: "GENESIS_FOUR_SYMBOL_LIFE_DIRECTION_PROJECTION",
    sourceReferenceId,
    mansionCoordinateReference: Object.freeze({
      referenceType: birthCoordinate.referenceType,
      referenceId: birthCoordinate.referenceId,
      coordinateIndex: birthCoordinate.coordinateIndex,
      coordinateOrdinal: birthCoordinate.coordinateOrdinal,
    }),
    fourSymbol: result.fourSymbol,
    direction: mapping.direction,
    lifeDirection: mapping.lifeDirection,
    provenance: Object.freeze({
      sourceKind: mansionProjection.sourceKind,
      sourceReferenceId,
      sourceEngine: "guanyao_starbeast_engine",
      sourceProtocolVersion: "GUANYAO_LUNAR_MANSION_V1",
      mansionCoordinateReferenceId: birthCoordinate.referenceId,
      fourSymbolResultReferenceType: fourSymbolReference.referenceType,
    }),
    existingFourSymbolResultOnly: true,
    existingMansionCoordinateProjectionOnly: true,
    noEngineInvocation: true,
    noFourSymbolCalculation: true,
    noMansionCalculation: true,
    noIdentitySelection: true,
    noRendererParameters: true,
    noTimelineMutation: true,
    noVisualCalibrationMutation: true,
    noFallback: true,
  });

  return Object.freeze({
    status: "AVAILABLE" as const,
    projection,
    input,
    boundary: GENESIS_FOUR_SYMBOL_LIFE_DIRECTION_PROJECTION_BOUNDARY,
  });
}
