import type { MotherCodeProfile } from "./guanyaoCausalEngine";
import type { SelectedPressureSeedContext } from "./primaryPetal";

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
    province?: string;
    city?: string;
    role?: string;
  };
  chrono?: {
    lockPoint?: string;
  };
  starbeast?: {
    fourSymbol?: string;
    primaryNode?: string;
    originLightTrace?: string;
    role?: string;
  };
  mother?: {
    trigram?: string;
    profile?: StoredMotherCodeProfile;
  };
  trigram?: string;
};

export type DynamicsInputContext = {
  selectedPressureSeedContext: SelectedPressureSeedContext | null;
  motherCodeProfile: StoredMotherCodeProfile | null;
  originMotherContext: StoredOriginMotherContext | null;
  personaOutputSnapshot: StoredPersonaOutputSnapshot | null;
};
