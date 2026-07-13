import type {
  GeoChronoMotherFusionInput,
  GeoChronoMotherFusionResult,
} from "../types/guanyaoGeoChronoMotherFusion";
import type { LaunchOriginMotherInput } from "../types/guanyaoLaunchOriginMother";
import { runGeoChronoMotherFusionEngine } from "./guanyaoGeoChronoMotherFusionEngine";
import { resolveLunarTrigramLanding } from "./guanyaoLunarTrigramLandingResolver";
import { resolveStarbeastFromBirthDate } from "./guanyaoStarbeastEngineService";

export function adaptLaunchOriginMotherInput(
  input: LaunchOriginMotherInput,
): GeoChronoMotherFusionInput {
  const { year, month, day, hourBranch } = input.birth;
  const birthDate = { year, month, day };
  const trigramLanding = resolveLunarTrigramLanding({
    ...birthDate,
    hourBranch,
  });
  const starbeastDerivation = resolveStarbeastFromBirthDate(birthDate);

  if (starbeastDerivation.status !== "READY") {
    throw new Error(`STARBEAST_DERIVATION_NOT_READY:${starbeastDerivation.reason}`);
  }

  return {
    geo: input.geo,
    chrono: {
      ...birthDate,
      periodIndex: input.periodIndex,
    },
    starbeast: input.starbeast,
    fourSymbol: starbeastDerivation.fourSymbol,
    trigramLanding,
  };
}

export function resolveLaunchOriginMother(
  input: LaunchOriginMotherInput,
): GeoChronoMotherFusionResult {
  return runGeoChronoMotherFusionEngine(adaptLaunchOriginMotherInput(input));
}

export const GuanyaoLaunchOriginMotherInputAdapter = {
  adaptLaunchOriginMotherInput,
  resolveLaunchOriginMother,
} as const;
