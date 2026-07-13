import type { ChronoCoordinate } from "./guanyaoCausalEngine";
import type {
  GeoLayerInput,
  StarbeastLayerInput,
} from "./guanyaoGeoChronoMotherFusion";

export type LaunchOriginMotherInput = Readonly<{
  birth: ChronoCoordinate;
  periodIndex: number;
  geo: GeoLayerInput;
  starbeast: StarbeastLayerInput;
}>;
