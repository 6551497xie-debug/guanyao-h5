import type {
  GeoChronoMotherFusionInput,
  GeoChronoMotherFusionResult,
} from "../types/guanyaoGeoChronoMotherFusion";
import type {
  LaunchOriginMotherInput,
  LaunchOriginMotherSourceResults,
} from "../types/guanyaoLaunchOriginMother";
import type { LunarMotherCodeLandingResult } from "../types/guanyaoLunarMotherCode";
import type { StarbeastDerivationReady } from "../types/guanyaoStarbeast";
import { runGeoChronoMotherFusionEngine } from "./guanyaoGeoChronoMotherFusionEngine";
import { resolveLaunchStarbeastDerivationSource } from "./guanyaoLaunchStarbeastDerivationSourceAdapter";
import { runMotherCodeLandingEngine } from "./guanyaoLunarMotherCodeLandingAdapter";

type LaunchResolvedLifeSources = Readonly<{
  starbeastDerivationResult: StarbeastDerivationReady;
  motherCodeLandingResult: LunarMotherCodeLandingResult;
}>;

function resolveLaunchLifeSources(
  input: LaunchOriginMotherInput,
): LaunchResolvedLifeSources {
  const { year, month, day } = input.birth;
  const starbeastSource = resolveLaunchStarbeastDerivationSource({
    year,
    month,
    day,
  });
  const starbeastDerivationResult = starbeastSource.starBeastResult;

  if (starbeastDerivationResult.status !== "READY") {
    throw new Error(
      `STARBEAST_DERIVATION_NOT_READY:${starbeastDerivationResult.reason}`,
    );
  }

  return Object.freeze({
    starbeastDerivationResult,
    motherCodeLandingResult: runMotherCodeLandingEngine(input.birth),
  });
}

function adaptResolvedLaunchOriginMotherInput(
  input: LaunchOriginMotherInput,
  sources: LaunchResolvedLifeSources,
): GeoChronoMotherFusionInput {
  const { year, month, day } = input.birth;

  return {
    geo: input.geo,
    chrono: {
      year,
      month,
      day,
      periodIndex: input.periodIndex,
    },
    starbeast: input.starbeast,
    fourSymbol: sources.starbeastDerivationResult.fourSymbol,
    trigramLanding: sources.motherCodeLandingResult.trigramLanding,
  };
}

export function adaptLaunchOriginMotherInput(
  input: LaunchOriginMotherInput,
): GeoChronoMotherFusionInput {
  return adaptResolvedLaunchOriginMotherInput(
    input,
    resolveLaunchLifeSources(input),
  );
}

export function resolveLaunchOriginMotherSourceResults(
  input: LaunchOriginMotherInput,
): LaunchOriginMotherSourceResults {
  const sources = resolveLaunchLifeSources(input);
  const originMotherResult = runGeoChronoMotherFusionEngine(
    adaptResolvedLaunchOriginMotherInput(input, sources),
  );

  return Object.freeze({
    ...sources,
    originMotherResult,
  });
}

export function resolveLaunchOriginMother(
  input: LaunchOriginMotherInput,
): GeoChronoMotherFusionResult {
  return resolveLaunchOriginMotherSourceResults(input).originMotherResult;
}

export const GuanyaoLaunchOriginMotherInputAdapter = {
  adaptLaunchOriginMotherInput,
  resolveLaunchOriginMotherSourceResults,
  resolveLaunchOriginMother,
} as const;
