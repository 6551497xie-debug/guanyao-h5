import { resolveFixtureGenesisVisualConsumerSource } from "./fixtureGenesisVisualConsumerSource";
import { resolveRealGenesisVisualConsumerSource } from "./realGenesisVisualConsumerSource";
import type {
  GenesisVisualConsumerSourceResolutionInput,
  GenesisVisualConsumerSourceResult,
} from "../types/genesisVisualConsumerSource";

export function resolveGenesisVisualConsumerSource(
  input: GenesisVisualConsumerSourceResolutionInput,
): GenesisVisualConsumerSourceResult {
  if (input.sourceExperienceMode === "REAL_USER_EXPERIENCE") {
    return resolveRealGenesisVisualConsumerSource();
  }

  return resolveFixtureGenesisVisualConsumerSource(input.fixtureCaseIndex);
}
