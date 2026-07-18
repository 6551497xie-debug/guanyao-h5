import type { GenesisRuntimeStage } from "../types/genesisRuntimeStateMachine";

export const GENESIS_FROZEN_STAGE_HOLD_MS: Readonly<
  Record<Exclude<GenesisRuntimeStage, "TIME_RESONANCE" | "COMPLETION">, number>
> = Object.freeze({
  MOON_ORIGIN: 2200,
  STAR_RIVER: 1800,
  SYMBOL_REVEAL: 1800,
  HEXAGRAM_IMPRINT: 1800,
  LIFE_FORCE: 1800,
  STAR_BEAST_REVEAL: 1800,
});
