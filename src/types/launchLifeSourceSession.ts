import type { ChronoCoordinate } from "./guanyaoCausalEngine";
import type { GeoChronoMotherFusionResult } from "./guanyaoGeoChronoMotherFusion";
import type { LunarMotherCodeLandingResult } from "./guanyaoLunarMotherCode";
import type { StarbeastDerivationReady } from "./guanyaoStarbeast";

export type LaunchLifeSourceSessionInput = Readonly<{
  sourceReferenceId: string;
  birthCoordinate: ChronoCoordinate;
  starbeastDerivationResult: StarbeastDerivationReady;
  motherCodeLandingResult: LunarMotherCodeLandingResult;
  originMotherResult: GeoChronoMotherFusionResult;
}>;

export type LaunchLifeSourceSessionProvenance = Readonly<{
  sourceKind: "REAL_ENGINE_RESULT";
  sourceReferenceId: string;
  birthSource: "LAUNCH_USER_CONFIRMED";
  starbeastSource: "guanyao_starbeast_engine";
  motherCodeSource: "guanyao_lunar_mother_code_landing";
  originMotherSource: "guanyao_geo_chrono_mother_fusion";
}>;

export type LaunchLifeSourceSessionBoundary = Readonly<{
  immutableCarrier: true;
  existingEngineResultsOnly: true;
  noEngineInvocation: true;
  noVisualAdapterInvocation: true;
  noRendererInvocation: true;
  noRuntimeMutation: true;
  noVisualMutation: true;
  noUIMutation: true;
  noStorageWrite: true;
}>;

export type LaunchLifeSourceSession = Readonly<{
  schemaVersion: "GUANYAO_LAUNCH_LIFE_SOURCE_SESSION_V1";
  source: "launch_life_source_session";
  sourceKind: "REAL_ENGINE_RESULT";
  sourceReferenceId: string;
  birthCoordinate: ChronoCoordinate;
  starbeastDerivationResult: StarbeastDerivationReady;
  motherCodeLandingResult: LunarMotherCodeLandingResult;
  originMotherResult: GeoChronoMotherFusionResult;
  provenance: LaunchLifeSourceSessionProvenance;
  boundary: LaunchLifeSourceSessionBoundary;
}>;

export type LaunchLifeSourceSessionBlockedReason =
  | "SOURCE_REFERENCE_ID_REQUIRED"
  | "BIRTH_SOURCE_MISMATCH"
  | "FOUR_SYMBOL_SOURCE_MISMATCH"
  | "MOTHER_CODE_SOURCE_MISMATCH";

export type LaunchLifeSourceSessionResult =
  | Readonly<{
      status: "AVAILABLE";
      session: LaunchLifeSourceSession;
    }>
  | Readonly<{
      status: "BLOCKED";
      reason: LaunchLifeSourceSessionBlockedReason;
      session: null;
    }>;
