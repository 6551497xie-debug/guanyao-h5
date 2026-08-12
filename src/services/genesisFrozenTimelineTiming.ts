import type { GenesisRuntimeStage } from "../types/genesisRuntimeStateMachine";

export const GENESIS_FROZEN_STAGE_HOLD_MS: Readonly<
  Record<Exclude<GenesisRuntimeStage, "TIME_RESONANCE" | "COMPLETION">, number>
> = Object.freeze({
  MOON_ORIGIN: 900,
  STAR_RIVER: 700,
  SYMBOL_REVEAL: 1200,
  HEXAGRAM_IMPRINT: 900,
  LIFE_FORCE: 1200,
  STAR_BEAST_REVEAL: 800,
});
