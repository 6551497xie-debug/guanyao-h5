import type {
  HexagramCrystalEngineInput,
  HexagramCrystalEngineNotReady,
  HexagramCrystalEngineNotReadyReason,
  HexagramCrystalEngineSuccess,
  HexagramCrystalResult,
  HexagramCrystalResultGuardrails,
} from "../types/personaTransmission";

const createNotReadyResult = (reason: HexagramCrystalEngineNotReadyReason): HexagramCrystalEngineNotReady => ({
  status: "NOT_READY",
  readiness: "NOT_READY",
  reason,
});

const createGuardrails = (): HexagramCrystalResultGuardrails => ({
  noStorageWrite: true,
  noHexagramMatrixMutation: true,
  noCurrentHexagramProfileMutation: true,
  noCurrentCrystalEndStateMutation: true,
  noCollectibleAsset: true,
  noScore: true,
  noLevel: true,
  noGrowthValue: true,
  noPetGrowth: true,
  no384Yao: true,
  noArchive: true,
  noOldR8: true,
});

const hasText = (value?: string): boolean => Boolean(value && value.trim().length > 0);

const hasSourceHexagram = (input: HexagramCrystalEngineInput): boolean =>
  Boolean(
    hasText(input.sourceHexagram.lowerTrigram) &&
      hasText(input.sourceHexagram.upperTrigram) &&
      (hasText(input.sourceHexagram.hexagramCode) ||
        hasText(input.sourceHexagram.hexagramName) ||
        hasText(input.sourceHexagram.hexagramTitle)),
  );

const createMigrationLine = (input: HexagramCrystalEngineInput): string =>
  `${input.dominantShift.fromModel} → ${input.dominantShift.toResponse}`;

const createReadyResult = (input: HexagramCrystalEngineInput): HexagramCrystalEngineSuccess => ({
  status: "READY",
  readiness: "READY_FOR_HEXAGRAM_CRYSTAL_EXPRESSION",
  expression: {
    hexagramCode: input.sourceHexagram.hexagramCode,
    hexagramName: input.sourceHexagram.hexagramName,
    hexagramTitle: input.sourceHexagram.hexagramTitle,
    crystalLine: input.crystalMeaning,
    migrationLine: createMigrationLine(input),
    assetBoundary: "CURRENT_ROUND_HEXAGRAM_CRYSTAL",
  },
  sourceInput: input,
  guardrails: createGuardrails(),
});

export const formHexagramCrystalResult = (
  input?: HexagramCrystalEngineInput | null,
): HexagramCrystalResult => {
  if (!input) return createNotReadyResult("HEXAGRAM_CRYSTAL_INPUT_MISSING");

  if (!hasSourceHexagram(input)) {
    return createNotReadyResult("SOURCE_HEXAGRAM_MISSING");
  }

  if (!hasText(input.migrationTrace.traceLine)) {
    return createNotReadyResult("MIGRATION_TRACE_MISSING");
  }

  if (!hasText(input.dominantShift.fromModel) || !hasText(input.dominantShift.toResponse)) {
    return createNotReadyResult("DOMINANT_SHIFT_MISSING");
  }

  return createReadyResult(input);
};

export const HexagramCrystalEngineService = {
  formHexagramCrystalResult,
} as const;
