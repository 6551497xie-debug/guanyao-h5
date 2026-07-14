import type { GregorianBirthDateInput } from "../types/guanyaoBirthCalendar";
import type { StarbeastDerivationResult } from "../types/guanyaoStarbeast";
import { resolveStarbeastFromBirthDate } from "./guanyaoStarbeastEngineService";

export type LaunchStarbeastDerivationSourceCarrier = Readonly<{
  source: "launch_starbeast_derivation_source";
  starBeastResult: StarbeastDerivationResult;
}>;

export function resolveLaunchStarbeastDerivationSource(
  input: GregorianBirthDateInput,
): LaunchStarbeastDerivationSourceCarrier {
  return Object.freeze({
    source: "launch_starbeast_derivation_source",
    starBeastResult: resolveStarbeastFromBirthDate(input),
  });
}
