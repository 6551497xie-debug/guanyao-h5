import type { CurrentHexagramFormationResult } from "../types/currentHexagramFormation";
import type { YaoTransmissionProfile } from "../types/guanyaoCausalEngine";
import type { StarbeastDerivationResult } from "../types/guanyaoStarbeast";
import type { OriginalSelfJourneyPhase } from "../types/originalSelf";
import type { CrystalState } from "../types/personaTransmission";
import {
  resolveOriginalSelfFoundationConsumption,
  type OriginalSelfFoundationConsumption,
} from "./originalSelfFoundationEndpoint";

export type DynamicsOriginalSelfFoundationAdapterInput = Readonly<{
  starBeastResult: StarbeastDerivationResult;
  journeyPhase: OriginalSelfJourneyPhase;
  currentHexagramFormation: CurrentHexagramFormationResult | null;
  yaoTransmissionProfile: YaoTransmissionProfile | null;
  crystalState: CrystalState | null;
}>;

export function resolveDynamicsOriginalSelfFoundation(
  input: DynamicsOriginalSelfFoundationAdapterInput,
): OriginalSelfFoundationConsumption {
  return resolveOriginalSelfFoundationConsumption(
    Object.freeze({
      starBeastResult: input.starBeastResult,
      currentPhase: input.journeyPhase,
      formation: input.currentHexagramFormation,
      yao: input.yaoTransmissionProfile,
      crystal: input.crystalState,
    }),
  );
}
