import { resolveStoredMotherFourSymbol } from "./guanyaoStoredMotherContextAdapter";
import type { DynamicsInputContext } from "../types/gravityRuntimeInput";

export type DynamicsMotherPresentationSnapshot = Readonly<{
  motherCode?: string;
  trigram?: string;
  fourSymbol?: string;
}>;

export type DynamicsMotherPresentationAdapterInput = Readonly<{
  context: DynamicsInputContext;
}>;

export type DynamicsMotherPresentationResult = Readonly<{
  motherCodeName: string;
  personaSnapshot: DynamicsMotherPresentationSnapshot | null;
}>;

export function resolveDynamicsMotherPresentation(
  input: DynamicsMotherPresentationAdapterInput,
): DynamicsMotherPresentationResult {
  const { context } = input;
  const motherCodeName =
    context.motherCodeProfile?.motherCodeName ??
    context.originMotherContext?.mother?.profile?.motherCodeName ??
    context.personaOutputSnapshot?.motherCodeName ??
    context.personaOutputSnapshot?.motherCode ??
    "";
  const trigram =
    context.motherCodeProfile?.trigram ??
    context.motherCodeProfile?.lowerTrigram ??
    context.originMotherContext?.mother?.trigram ??
    context.originMotherContext?.trigram ??
    context.personaOutputSnapshot?.trigram;
  const fourSymbol = resolveStoredMotherFourSymbol(context);
  const personaSnapshot = motherCodeName || trigram || fourSymbol
    ? {
        motherCode: motherCodeName,
        trigram,
        fourSymbol,
      }
    : null;

  return {
    motherCodeName,
    personaSnapshot,
  };
}
