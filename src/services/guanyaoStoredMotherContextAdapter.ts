import type { DynamicsInputContext } from "../types/gravityRuntimeInput";

type LegacyStoredOriginMotherContext = NonNullable<DynamicsInputContext["originMotherContext"]> & {
  geo?: {
    symbol?: string;
  };
  fourBeast?: string;
};

export function resolveStoredMotherFourSymbol(input: DynamicsInputContext): string | undefined {
  const legacyContext = input.originMotherContext as LegacyStoredOriginMotherContext | null;

  return (
    input.originMotherContext?.starbeast?.fourSymbol ??
    legacyContext?.fourBeast ??
    legacyContext?.geo?.symbol ??
    input.personaOutputSnapshot?.fourBeast ??
    input.personaOutputSnapshot?.direction
  );
}
