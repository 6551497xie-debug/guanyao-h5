import type {
  PrimaryPetalId,
  PrimaryPetalProtocolDimension,
} from "./primaryPetal";

export type DynamicsBaiHuCoreStar = readonly [number, number, number];

export type DynamicsBaiHuPressureBeastSeed = Readonly<{
  index: number;
  intensity: number;
  resonance: number;
}>;

export type DynamicsBaiHuCoreStarsAdapterInput = Readonly<{
  seedId: string;
  seedText: string;
  primaryDimension: PrimaryPetalProtocolDimension;
  beastTone: "calm" | "strain" | "charge" | "sovereign";
  currentNode: number;
  runtimePrimarySpaceId: PrimaryPetalId;
  beastResonance: number;
  seedIntensity?: number;
  selectedPressureSeedSurface: string;
}>;

export type DynamicsBaiHuCoreStarsResult = Readonly<{
  semanticRole: "BAIHU_CORE_STARS";
  deterministic: true;
  hashes: Readonly<{
    constellation: number;
    pressure: number;
  }>;
  pressureBeastSeed: DynamicsBaiHuPressureBeastSeed;
  coreStars: readonly DynamicsBaiHuCoreStar[];
  guardrails: Readonly<{
    usesRandom: false;
    advancesRuntime: false;
    writesStorage: false;
  }>;
}>;
