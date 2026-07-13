import {
  getMotherCodeDefinitionByTrigram,
  toMotherCodeProfile,
} from "../data/guanyaoMotherCodeRegistry";
import type { ChronoCoordinate } from "../types/guanyaoCausalEngine";
import type { LunarMotherCodeLandingResult } from "../types/guanyaoLunarMotherCode";
import { resolveLunarTrigramLanding } from "./guanyaoLunarTrigramLandingResolver";

export function runMotherCodeLandingEngine(
  input: ChronoCoordinate,
): LunarMotherCodeLandingResult {
  const trigramLanding = resolveLunarTrigramLanding(input);
  const motherCodeDefinition = getMotherCodeDefinitionByTrigram(trigramLanding.fieldMapping.trigram);

  if (!motherCodeDefinition) {
    throw new Error(`Missing mother code definition for trigram ${trigramLanding.fieldMapping.trigram}`);
  }

  return {
    ...trigramLanding,
    motherCodeDefinition,
    motherCodeProfile: toMotherCodeProfile(motherCodeDefinition),
    trigramLanding,
    formulaLines: [
      ...trigramLanding.formulaLines,
      "→ 映射到 8 母码 registry",
      "→ 输出 MotherCodeProfile",
    ],
  };
}

export const GuanyaoLunarMotherCodeLandingAdapter = {
  runMotherCodeLandingEngine,
} as const;
