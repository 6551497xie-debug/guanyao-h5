import type { DynamicsMotherPresentationResult } from "./guanyaoDynamicsMotherPresentationAdapter";
import type { CurrentHexagramFormationResult } from "../types/currentHexagramFormation";
import type { Trigram } from "../types/guanyaoCausalEngine";

export type DynamicsCurrentHexagramPresentationGuardrails = Readonly<{
  isCurrentRoundOrientation: true;
  isFinalCrystal: false;
  isPersonalityLabel: false;
}>;

export type DynamicsCurrentHexagramPresentationAdapterInput = Readonly<{
  formation: CurrentHexagramFormationResult | null;
  motherPresentation: DynamicsMotherPresentationResult;
}>;

export type DynamicsCurrentHexagramPresentation = Readonly<{
  semanticRole: "CURRENT_HEXAGRAM_ORIENTATION";
  title: string;
  trigramMark: string;
  starbeastIngress: string;
  lowerTrigram: Trigram;
  upperTrigram: Trigram;
  guardrails: DynamicsCurrentHexagramPresentationGuardrails;
}>;

const trigramSymbols: Readonly<Record<Trigram, string>> = {
  乾: "☰",
  坤: "☷",
  震: "☳",
  巽: "☴",
  坎: "☵",
  离: "☲",
  艮: "☶",
  兑: "☱",
};

export function resolveDynamicsCurrentHexagramPresentation(
  input: DynamicsCurrentHexagramPresentationAdapterInput,
): DynamicsCurrentHexagramPresentation | null {
  const profile = input.formation?.currentHexagramProfile;
  if (!profile) return null;

  const fourSymbol = input.motherPresentation.personaSnapshot?.fourSymbol;

  return {
    semanticRole: "CURRENT_HEXAGRAM_ORIENTATION",
    title: profile.hexagramName || profile.hexagramTitle || profile.hexagramCode,
    trigramMark: `${trigramSymbols[profile.lowerTrigram]}${trigramSymbols[profile.upperTrigram]}`,
    starbeastIngress: fourSymbol ? `${fourSymbol}入${profile.lowerTrigram}` : "",
    lowerTrigram: profile.lowerTrigram,
    upperTrigram: profile.upperTrigram,
    guardrails: {
      isCurrentRoundOrientation: true,
      isFinalCrystal: false,
      isPersonalityLabel: false,
    },
  };
}
