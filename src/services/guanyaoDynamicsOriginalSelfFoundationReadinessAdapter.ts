import type { CurrentHexagramFormationResult } from "../types/currentHexagramFormation";
import type { YaoTransmissionProfile } from "../types/guanyaoCausalEngine";
import type { StarbeastDerivationResult } from "../types/guanyaoStarbeast";
import type { OriginalSelfJourneyPhase } from "../types/originalSelf";
import type { CrystalState } from "../types/personaTransmission";
import {
  resolveDynamicsOriginalSelfFoundation,
  type DynamicsOriginalSelfFoundationAdapterInput,
} from "./guanyaoDynamicsOriginalSelfFoundationAdapter";
import type { OriginalSelfFoundationConsumption } from "./originalSelfFoundationEndpoint";

export type DynamicsOriginalSelfFoundationReadinessInput = Readonly<{
  starBeastResult: StarbeastDerivationResult | null;
  journeyPhase: OriginalSelfJourneyPhase | null;
  currentHexagramFormation: CurrentHexagramFormationResult | null;
  yaoTransmissionProfile: YaoTransmissionProfile | null;
  crystalState: CrystalState | null;
}>;

export type DynamicsOriginalSelfFoundationNotReadyReason =
  | "STAR_BEAST_RESULT_MISSING"
  | "JOURNEY_PHASE_MISSING"
  | "CURRENT_HEXAGRAM_FORMATION_MISSING"
  | "YAO_TRANSMISSION_PROFILE_MISSING"
  | "CRYSTAL_STATE_MISSING";

export type DynamicsOriginalSelfFoundationReadiness =
  | Readonly<{
      status: "NOT_READY";
      readiness: "NOT_READY";
      source: "dynamics_original_self_foundation_readiness";
      reason: DynamicsOriginalSelfFoundationNotReadyReason;
    }>
  | Readonly<{
      status: "READY";
      readiness: "READY_FOR_ORIGINAL_SELF_FOUNDATION";
      source: "dynamics_original_self_foundation_readiness";
      consumption: OriginalSelfFoundationConsumption;
    }>;

const createNotReady = (
  reason: DynamicsOriginalSelfFoundationNotReadyReason,
): DynamicsOriginalSelfFoundationReadiness =>
  Object.freeze({
    status: "NOT_READY",
    readiness: "NOT_READY",
    source: "dynamics_original_self_foundation_readiness",
    reason,
  });

const requiresHexagram = (phase: OriginalSelfJourneyPhase): boolean =>
  phase === "HEXAGRAM" || phase === "YAO" || phase === "CRYSTAL";

const requiresYao = (phase: OriginalSelfJourneyPhase): boolean =>
  phase === "YAO" || phase === "CRYSTAL";

export function resolveDynamicsOriginalSelfFoundationReadiness(
  input: DynamicsOriginalSelfFoundationReadinessInput,
): DynamicsOriginalSelfFoundationReadiness {
  if (!input.starBeastResult) return createNotReady("STAR_BEAST_RESULT_MISSING");
  if (!input.journeyPhase) return createNotReady("JOURNEY_PHASE_MISSING");
  if (requiresHexagram(input.journeyPhase) && !input.currentHexagramFormation) {
    return createNotReady("CURRENT_HEXAGRAM_FORMATION_MISSING");
  }
  if (requiresYao(input.journeyPhase) && !input.yaoTransmissionProfile) {
    return createNotReady("YAO_TRANSMISSION_PROFILE_MISSING");
  }
  if (input.journeyPhase === "CRYSTAL" && !input.crystalState) {
    return createNotReady("CRYSTAL_STATE_MISSING");
  }

  const bridgeInput: DynamicsOriginalSelfFoundationAdapterInput = Object.freeze({
    starBeastResult: input.starBeastResult,
    journeyPhase: input.journeyPhase,
    currentHexagramFormation: input.currentHexagramFormation,
    yaoTransmissionProfile: input.yaoTransmissionProfile,
    crystalState: input.crystalState,
  });

  return Object.freeze({
    status: "READY",
    readiness: "READY_FOR_ORIGINAL_SELF_FOUNDATION",
    source: "dynamics_original_self_foundation_readiness",
    consumption: resolveDynamicsOriginalSelfFoundation(bridgeInput),
  });
}
