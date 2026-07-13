import type {
  HexagramCrystalResultConsumption,
  HexagramCrystalResultConsumptionBoundary,
  HexagramCrystalResultConsumptionInput,
  HexagramCrystalResultConsumptionNotReady,
} from "../types/hexagramCrystalResultConsumption";

const createBoundary = (): HexagramCrystalResultConsumptionBoundary => ({
  canEnterHexagramExpressionLayer: true,
  canMutateHexagramMatrix: false,
  canRenderUi: false,
  canWriteStorage: false,
  canCreateCollectibleAsset: false,
  canConnect384: false,
  canConnectOldR8: false,
});

const createNotReady = (
  reason: HexagramCrystalResultConsumptionNotReady["reason"],
): HexagramCrystalResultConsumptionNotReady => ({
  status: "NOT_READY",
  reason,
});

const hasText = (value?: string): boolean => Boolean(value && value.trim().length > 0);

export const consumeHexagramCrystalResult = (
  input: HexagramCrystalResultConsumptionInput,
): HexagramCrystalResultConsumption => {
  const { result } = input;

  if (result.status !== "READY") return createNotReady("HEXAGRAM_CRYSTAL_RESULT_NOT_READY");

  if (!result.expression) return createNotReady("HEXAGRAM_CRYSTAL_EXPRESSION_MISSING");

  const inheritedIdentity = result.sourceInput.sourceHexagram;
  if (
    !hasText(inheritedIdentity.lowerTrigram) ||
    !hasText(inheritedIdentity.upperTrigram) ||
    (!hasText(inheritedIdentity.hexagramCode) &&
      !hasText(inheritedIdentity.hexagramName) &&
      !hasText(inheritedIdentity.hexagramTitle))
  ) {
    return createNotReady("HEXAGRAM_CRYSTAL_IDENTITY_MISSING");
  }

  if (!hasText(result.expression.migrationLine)) {
    return createNotReady("HEXAGRAM_CRYSTAL_MIGRATION_LINE_MISSING");
  }

  return {
    status: "READY_FOR_HEXAGRAM_EXPRESSION_LAYER",
    payload: {
      sourceExpression: result.expression,
      inheritedIdentity,
      crystalLine: result.expression.crystalLine,
      migrationLine: result.expression.migrationLine,
      crystalMeaning: result.sourceInput.crystalMeaning,
      migrationTrace: result.sourceInput.migrationTrace,
      dominantShift: result.sourceInput.dominantShift,
      readiness: result.readiness,
      boundary: createBoundary(),
    },
  };
};

export const HexagramCrystalResultConsumptionService = {
  consumeHexagramCrystalResult,
} as const;
