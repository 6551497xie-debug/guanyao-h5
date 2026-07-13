import type { MotherCodeProfile } from "./guanyaoCausalEngine";
import type { SelectedPressureSeedContext } from "../services/guanyaoPrimaryPetalResolver";

export type StoredMotherCodeProfile = Partial<MotherCodeProfile> & {
  motherCodeName?: string;
  motherCodeTitle?: string;
  trigram?: string;
  lowerTrigram?: string;
  trigramSymbol?: string;
  baseDrive?: string;
};

export type StoredPersonaOutputSnapshot = {
  motherCode?: string;
  motherCodeName?: string;
  trigram?: string;
  trigramSymbol?: string;
  fourBeast?: string;
  direction?: string;
};

export type StoredOriginMotherContext = {
  source?: string;
  geo?: {
    symbol?: string;
    province?: string;
  };
  chrono?: {
    lockPoint?: string;
  };
  mother?: {
    trigram?: string;
    profile?: StoredMotherCodeProfile;
  };
  fourBeast?: string;
  trigram?: string;
};

export type DynamicsInputContext = {
  selectedPressureSeedContext: SelectedPressureSeedContext | null;
  motherCodeProfile: StoredMotherCodeProfile | null;
  originMotherContext: StoredOriginMotherContext | null;
  personaOutputSnapshot: StoredPersonaOutputSnapshot | null;
};
