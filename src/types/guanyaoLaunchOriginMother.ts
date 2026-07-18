import type { ChronoCoordinate } from "./guanyaoCausalEngine";
import type {
  GeoLayerInput,
  GeoChronoMotherFusionResult,
  StarbeastLayerInput,
} from "./guanyaoGeoChronoMotherFusion";
import type { LunarMotherCodeLandingResult } from "./guanyaoLunarMotherCode";
import type { StarbeastDerivationReady } from "./guanyaoStarbeast";

export type LaunchOriginMotherInput = Readonly<{
  birth: ChronoCoordinate;
  periodIndex: number;
  geo: GeoLayerInput;
  starbeast: StarbeastLayerInput;
}>;

export type LaunchOriginMotherSourceResults = Readonly<{
  starbeastDerivationResult: StarbeastDerivationReady;
  motherCodeLandingResult: LunarMotherCodeLandingResult;
  originMotherResult: GeoChronoMotherFusionResult;
}>;
