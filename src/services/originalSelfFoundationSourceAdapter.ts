import type { CurrentHexagramFormationResult } from "../types/currentHexagramFormation";
import type { YaoTransmissionProfile } from "../types/guanyaoCausalEngine";
import type { StarbeastDerivationResult } from "../types/guanyaoStarbeast";
import type { OriginalSelfJourneyPhase } from "../types/originalSelf";
import type { CrystalState } from "../types/personaTransmission";
import type { OriginalSelfFoundationResolverInput } from "./originalSelfFoundationResolver";

export type OriginalSelfFoundationSourceInput = Readonly<{
  starBeastResult: StarbeastDerivationResult;
  currentPhase: OriginalSelfJourneyPhase;
  formation: CurrentHexagramFormationResult | null;
  yao: YaoTransmissionProfile | null;
  crystal: CrystalState | null;
}>;

export function adaptOriginalSelfFoundationSource(
  input: OriginalSelfFoundationSourceInput,
): OriginalSelfFoundationResolverInput {
  return Object.freeze({
    starBeast: input.starBeastResult,
    currentPhase: input.currentPhase,
    hexagram: input.formation?.currentHexagramProfile ?? null,
    yao: input.yao,
    crystal: input.crystal,
  });
}
