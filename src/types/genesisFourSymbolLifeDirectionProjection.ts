import type {
  FourSymbol,
  FourSymbolDirection,
} from "./guanyaoStarbeast";
import type { GenesisTwentyEightMansionCoordinateProjection } from "./genesisTwentyEightMansionCoordinateProjection";
import type { StarBeastGenesisFourSymbolResultReference } from "./starBeastGenesisSourceIdentity";

export type GenesisFourSymbolLifeDirection =
  | "生发"
  | "显化"
  | "行动"
  | "沉潜";

export type GenesisFourSymbolLifeDirectionProjectionInput = Readonly<{
  sourceReferenceId: string;
  mansionCoordinateProjection:
    | GenesisTwentyEightMansionCoordinateProjection
    | null;
  fourSymbolResultReference:
    | StarBeastGenesisFourSymbolResultReference
    | null;
}>;

export type GenesisFourSymbolLifeDirectionProvenance = Readonly<{
  sourceKind: GenesisTwentyEightMansionCoordinateProjection["sourceKind"];
  sourceReferenceId: string;
  sourceEngine: "guanyao_starbeast_engine";
  sourceProtocolVersion: "GUANYAO_LUNAR_MANSION_V1";
  mansionCoordinateReferenceId: string;
  fourSymbolResultReferenceType:
    "STAR_BEAST_GENESIS_FOUR_SYMBOL_ENGINE_RESULT";
}>;

export type GenesisFourSymbolLifeDirectionProjection = Readonly<{
  semanticRole: "GENESIS_FOUR_SYMBOL_LIFE_DIRECTION_PROJECTION";
  sourceReferenceId: string;
  mansionCoordinateReference: Readonly<{
    referenceType: "GENESIS_MANSION_COORDINATE_SLOT";
    referenceId: string;
    coordinateIndex: number;
    coordinateOrdinal: number;
  }>;
  fourSymbol: FourSymbol;
  direction: FourSymbolDirection;
  lifeDirection: GenesisFourSymbolLifeDirection;
  provenance: GenesisFourSymbolLifeDirectionProvenance;
  existingFourSymbolResultOnly: true;
  existingMansionCoordinateProjectionOnly: true;
  noEngineInvocation: true;
  noFourSymbolCalculation: true;
  noMansionCalculation: true;
  noIdentitySelection: true;
  noRendererParameters: true;
  noTimelineMutation: true;
  noVisualCalibrationMutation: true;
  noFallback: true;
}>;

export type GenesisFourSymbolLifeDirectionProjectionBlockedReason =
  | "SOURCE_REFERENCE_ID_REQUIRED"
  | "MANSION_COORDINATE_PROJECTION_REQUIRED"
  | "MANSION_COORDINATE_PROJECTION_INVALID"
  | "FOUR_SYMBOL_RESULT_REFERENCE_REQUIRED"
  | "FOUR_SYMBOL_RESULT_REFERENCE_INVALID"
  | "FOUR_SYMBOL_RESULT_NOT_READY"
  | "SOURCE_REFERENCE_MISMATCH"
  | "MANSION_SOURCE_MISMATCH"
  | "FOUR_SYMBOL_DIRECTION_MISMATCH";

export type GenesisFourSymbolLifeDirectionProjectionBoundary = Readonly<{
  projectionOnly: true;
  existingFourSymbolResultOnly: true;
  existingMansionCoordinateProjectionOnly: true;
  noEngineInvocation: true;
  noFourSymbolCalculation: true;
  noMansionCalculation: true;
  noIdentitySelection: true;
  noRendererInvocation: true;
  noRendererInputMutation: true;
  noTimelineMutation: true;
  noVisualCalibrationMutation: true;
  noUIIntegration: true;
  noRuntimeIntegration: true;
  noStorageWrite: true;
  noFallback: true;
}>;

export type GenesisFourSymbolLifeDirectionProjectionResult =
  | Readonly<{
      status: "AVAILABLE";
      projection: GenesisFourSymbolLifeDirectionProjection;
      input: GenesisFourSymbolLifeDirectionProjectionInput;
      boundary: GenesisFourSymbolLifeDirectionProjectionBoundary;
    }>
  | Readonly<{
      status: "BLOCKED";
      reason: GenesisFourSymbolLifeDirectionProjectionBlockedReason;
      projection: null;
      input: GenesisFourSymbolLifeDirectionProjectionInput;
      boundary: GenesisFourSymbolLifeDirectionProjectionBoundary;
    }>;
