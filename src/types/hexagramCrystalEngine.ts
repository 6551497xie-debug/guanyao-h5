import type {
  CrystalMappingSource,
  HexagramCrystalInputDominantShift,
  HexagramCrystalInputMigrationTrace,
  HexagramCrystalInputSourceHexagram,
  PersonaDimension,
  PersonaYaoStage,
} from "./personaTransmission";

export type HexagramCrystalEngineChangedLineContext = Readonly<{
  sourceUnitId?: string;
  dimension?: PersonaDimension;
  yaoStage?: PersonaYaoStage;
  changedLineHint?: string;
}>;

export type HexagramCrystalEngineInput = Readonly<{
  sourceHexagram: HexagramCrystalInputSourceHexagram;
  crystalMeaning: string;
  migrationTrace: HexagramCrystalInputMigrationTrace;
  dominantShift: HexagramCrystalInputDominantShift;
  changedLineContext: HexagramCrystalEngineChangedLineContext;
  source: CrystalMappingSource;
}>;

export type HexagramCrystalResultReadiness = "NOT_READY" | "READY_FOR_HEXAGRAM_CRYSTAL_EXPRESSION";

export type HexagramCrystalExpression = Readonly<{
  hexagramCode?: string;
  hexagramName?: string;
  hexagramTitle?: string;
  crystalLine: string;
  migrationLine: string;
  assetBoundary: "CURRENT_ROUND_HEXAGRAM_CRYSTAL";
}>;

export type HexagramCrystalResultGuardrails = Readonly<{
  noStorageWrite: true;
  noHexagramMatrixMutation: true;
  noCurrentHexagramProfileMutation: true;
  noCurrentCrystalEndStateMutation: true;
  noCollectibleAsset: true;
  noScore: true;
  noLevel: true;
  noGrowthValue: true;
  noPetGrowth: true;
  no384Yao: true;
  noArchive: true;
  noOldR8: true;
}>;

export type HexagramCrystalEngineSuccess = Readonly<{
  status: "READY";
  readiness: "READY_FOR_HEXAGRAM_CRYSTAL_EXPRESSION";
  expression: HexagramCrystalExpression;
  sourceInput: HexagramCrystalEngineInput;
  guardrails: HexagramCrystalResultGuardrails;
}>;

export type HexagramCrystalEngineNotReadyReason =
  | "HEXAGRAM_CRYSTAL_INPUT_MISSING"
  | "HEXAGRAM_CRYSTAL_INPUT_NOT_READY"
  | "SOURCE_HEXAGRAM_MISSING"
  | "MIGRATION_TRACE_MISSING"
  | "DOMINANT_SHIFT_MISSING"
  | "BOUNDARY_VIOLATION";

export type HexagramCrystalEngineNotReady = Readonly<{
  status: "NOT_READY";
  readiness: "NOT_READY";
  reason: HexagramCrystalEngineNotReadyReason;
}>;

export type HexagramCrystalResult =
  | HexagramCrystalEngineSuccess
  | HexagramCrystalEngineNotReady;
