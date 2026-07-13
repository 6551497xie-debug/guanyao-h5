import type {
  CrystalMappingSource,
  HexagramCrystalInputDominantShift,
  HexagramCrystalInputMigrationTrace,
  HexagramCrystalInputSourceHexagram,
} from "./personaTransmission";
import type {
  HexagramCrystalExpression,
  HexagramCrystalResult,
  HexagramCrystalResultReadiness,
} from "./hexagramCrystalEngine";

export type HexagramCrystalResultConsumptionBoundary = Readonly<{
  canEnterHexagramExpressionLayer: boolean;
  canMutateHexagramMatrix: false;
  canRenderUi: false;
  canWriteStorage: false;
  canCreateCollectibleAsset: false;
  canConnect384: false;
  canConnectOldR8: false;
}>;

export type HexagramCrystalResultConsumptionInput = Readonly<{
  result: HexagramCrystalResult;
  source: CrystalMappingSource;
}>;

export type HexagramCrystalResultConsumptionPayload = Readonly<{
  sourceExpression: HexagramCrystalExpression;
  inheritedIdentity: HexagramCrystalInputSourceHexagram;
  crystalLine: string;
  migrationLine: string;
  crystalMeaning: string;
  migrationTrace: HexagramCrystalInputMigrationTrace;
  dominantShift: HexagramCrystalInputDominantShift;
  readiness: HexagramCrystalResultReadiness;
  boundary: HexagramCrystalResultConsumptionBoundary;
}>;

export type HexagramCrystalResultConsumptionReady = Readonly<{
  status: "READY_FOR_HEXAGRAM_EXPRESSION_LAYER";
  payload: HexagramCrystalResultConsumptionPayload;
}>;

export type HexagramCrystalResultConsumptionNotReadyReason =
  | "HEXAGRAM_CRYSTAL_RESULT_NOT_READY"
  | "HEXAGRAM_CRYSTAL_EXPRESSION_MISSING"
  | "HEXAGRAM_CRYSTAL_IDENTITY_MISSING"
  | "HEXAGRAM_CRYSTAL_MIGRATION_LINE_MISSING"
  | "BOUNDARY_VIOLATION";

export type HexagramCrystalResultConsumptionNotReady = Readonly<{
  status: "NOT_READY";
  reason: HexagramCrystalResultConsumptionNotReadyReason;
}>;

export type HexagramCrystalResultConsumption =
  | HexagramCrystalResultConsumptionReady
  | HexagramCrystalResultConsumptionNotReady;
