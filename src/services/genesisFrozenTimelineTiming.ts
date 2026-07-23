import type { GenesisRuntimeStage } from "../types/genesisRuntimeStateMachine";

export const GENESIS_FROZEN_STAGE_HOLD_MS: Readonly<
  Record<Exclude<GenesisRuntimeStage, "TIME_RESONANCE" | "COMPLETION">, number>
> = Object.freeze({
  MOON_ORIGIN: 2200,
  STAR_RIVER: 1800,
  SYMBOL_REVEAL: 3400,
  HEXAGRAM_IMPRINT: 3000,
  LIFE_FORCE: 3600,
  STAR_BEAST_REVEAL: 1800,
});
