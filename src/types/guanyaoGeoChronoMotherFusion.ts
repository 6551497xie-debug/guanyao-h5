import type { MotherCodeDefinition, MotherCodeProfile, Trigram } from "./guanyaoCausalEngine";
import type { LunarTrigramLandingResult } from "./guanyaoLunarTrigramLanding";
import type { FourSymbol } from "./guanyaoStarbeast";

export type GeoDirectionSymbol = FourSymbol;

export type GeoLayerInput = Readonly<{
  province: string;
  city: string;
}>;

export type ChronoLayerInput = Readonly<{
  year: number;
  month: number;
  day: number;
  periodIndex: number;
}>;

export type StarbeastLayerInput = Readonly<{
  nodeCount: number;
  primaryNodeIndex: number;
  originLightTrace: string;
}>;

export type MotherSeed = Readonly<{
  direction: GeoDirectionSymbol;
  timePhase: string;
  starResidue: string;
}>;

export type GeoChronoMotherFusionInput = Readonly<{
  geo: GeoLayerInput;
  chrono: ChronoLayerInput;
  starbeast: StarbeastLayerInput;
  fourSymbol: FourSymbol;
  trigramLanding: LunarTrigramLandingResult;
}>;

export type GeoChronoMotherFusionResult = Readonly<{
  mother_seed: MotherSeed;
  geo: Readonly<{
    province: string;
    city: string;
    symbol: GeoDirectionSymbol;
    role: "directional bias";
  }>;
  chrono: Readonly<{
    lockPoint: string;
    timePhaseIndex: number;
    calibrationIndex: number;
    role: "temporal axis";
  }>;
  starbeast: Readonly<{
    primaryNode: string;
    originLightTrace: string;
    role: "identity residue";
  }>;
  mother: Readonly<{
    trigram: Trigram;
    definition: MotherCodeDefinition;
    profile: MotherCodeProfile;
  }>;
}>;
