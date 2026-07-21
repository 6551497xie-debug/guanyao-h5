import type { TwentyEightMansion } from "./guanyaoStarbeast";
import type { StarBeastGenesisMansionResultReference } from "./starBeastGenesisSourceIdentity";

export type GenesisMansionCoordinateSourceKind =
  | "REAL_ENGINE_RESULT"
  | "ISOLATED_FIXTURE_ENGINE_RESULT";

export type GenesisTwentyEightMansionCoordinateProjectionInput = Readonly<{
  sourceKind: GenesisMansionCoordinateSourceKind;
  sourceReferenceId: string;
  mansionResultReference: StarBeastGenesisMansionResultReference | null;
}>;

export type GenesisTwentyEightMansionCoordinateSlot = Readonly<{
  referenceType: "GENESIS_MANSION_COORDINATE_SLOT";
  referenceId: string;
  coordinateIndex: number;
  coordinateOrdinal: number;
  normalizedOrbitPosition: number;
  isBirthMansionCoordinate: boolean;
}>;

export type GenesisTwentyEightMansionCoordinateProjection = Readonly<{
  semanticRole: "GENESIS_TWENTY_EIGHT_MANSION_COORDINATE_PROJECTION";
  sourceKind: GenesisMansionCoordinateSourceKind;
  sourceReferenceId: string;
  sourceEngine: "guanyao_starbeast_engine";
  sourceProtocolVersion: "GUANYAO_LUNAR_MANSION_V1";
  coordinateSystem: "GENESIS_NORMALIZED_MANSION_ORBIT";
  coordinateCount: 28;
  coordinates: readonly GenesisTwentyEightMansionCoordinateSlot[];
  birthMansion: Readonly<{
    mansion: TwentyEightMansion;
    mansionIndex: number;
    coordinateReferenceId: string;
  }>;
  existingMansionResultOnly: true;
  noMansionCalculation: true;
  noIdentitySelection: true;
  noAstronomicalMeasurementClaim: true;
  noRendererParameters: true;
  noTimelineMutation: true;
  noVisualCalibrationMutation: true;
  noFallback: true;
}>;

export type GenesisTwentyEightMansionCoordinateProjectionBlockedReason =
  | "SOURCE_REFERENCE_ID_REQUIRED"
  | "MANSION_RESULT_REFERENCE_REQUIRED"
  | "MANSION_RESULT_REFERENCE_INVALID"
  | "MANSION_RESULT_NOT_READY"
  | "MANSION_COORDINATE_INDEX_INVALID";

export type GenesisTwentyEightMansionCoordinateProjectionBoundary = Readonly<{
  projectionOnly: true;
  existingMansionResultOnly: true;
  noEngineInvocation: true;
  noMansionCalculation: true;
  noIdentitySelection: true;
  noAstronomicalMeasurementClaim: true;
  noRendererInvocation: true;
  noRendererInputMutation: true;
  noTimelineMutation: true;
  noVisualCalibrationMutation: true;
  noUIIntegration: true;
  noStorageWrite: true;
}>;

export type GenesisTwentyEightMansionCoordinateProjectionResult =
  | Readonly<{
      status: "AVAILABLE";
      projection: GenesisTwentyEightMansionCoordinateProjection;
      input: GenesisTwentyEightMansionCoordinateProjectionInput;
      boundary: GenesisTwentyEightMansionCoordinateProjectionBoundary;
    }>
  | Readonly<{
      status: "BLOCKED";
      reason: GenesisTwentyEightMansionCoordinateProjectionBlockedReason;
      projection: null;
      input: GenesisTwentyEightMansionCoordinateProjectionInput;
      boundary: GenesisTwentyEightMansionCoordinateProjectionBoundary;
    }>;
