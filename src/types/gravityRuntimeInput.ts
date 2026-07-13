import type { MotherCodeProfile } from "./guanyaoCausalEngine";
import type { SelectedPressureSeedContext } from "./primaryPetal";

export type StoredSelectedPressureSeedContext = SelectedPressureSeedContext & {
  schemaVersion?: "GUANYAO_SELECTED_PRESSURE_SEED_CONTEXT_V2";
};

export type StoredMotherCodeProfile = Partial<MotherCodeProfile> & {
  schemaVersion?: "GUANYAO_MOTHER_CODE_PROFILE_V2";
  motherCodeName?: string;
  motherCodeTitle?: string;
  trigram?: string;
  lowerTrigram?: string;
  trigramSymbol?: string;
  baseDrive?: string;
};

export type StoredPersonaOutputSnapshot = {
  schemaVersion?: "GUANYAO_PERSONA_SNAPSHOT_V2";
  motherCode?: string;
  motherCodeName?: string;
  trigram?: string;
  trigramSymbol?: string;
  starbeast?: {
    fourSymbol?: string;
  };
};

export type StoredOriginMotherContext = {
  schemaVersion?: "GUANYAO_ORIGIN_MOTHER_CONTEXT_V2";
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
  selectedPressureSeedContext: StoredSelectedPressureSeedContext | null;
  motherCodeProfile: StoredMotherCodeProfile | null;
  originMotherContext: StoredOriginMotherContext | null;
  personaOutputSnapshot: StoredPersonaOutputSnapshot | null;
};
