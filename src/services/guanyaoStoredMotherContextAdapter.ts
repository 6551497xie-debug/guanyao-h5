import type { DynamicsInputContext } from "../types/gravityRuntimeInput";

type LegacyStoredOriginMotherContext = NonNullable<DynamicsInputContext["originMotherContext"]> & {
  geo?: {
    symbol?: string;
  };
  fourBeast?: string;
};

type LegacyStoredPersonaOutputSnapshot = NonNullable<DynamicsInputContext["personaOutputSnapshot"]> & {
  fourBeast?: string;
  direction?: string;
};

export function resolveStoredMotherFourSymbol(input: DynamicsInputContext): string | undefined {
  const legacyContext = input.originMotherContext as LegacyStoredOriginMotherContext | null;
  const legacyPersona = input.personaOutputSnapshot as LegacyStoredPersonaOutputSnapshot | null;

  return (
    input.originMotherContext?.starbeast?.fourSymbol ??
    input.personaOutputSnapshot?.starbeast?.fourSymbol ??
    legacyContext?.fourBeast ??
    legacyContext?.geo?.symbol ??
    legacyPersona?.fourBeast ??
    legacyPersona?.direction
  );
}
