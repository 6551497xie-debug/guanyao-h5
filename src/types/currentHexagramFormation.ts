import type {
  CurrentHexagramProfile,
  MotherCodeProfile,
  PressureField,
  PressureSeed,
} from "./guanyaoCausalEngine";
import type { SelectedPressureSeedContext } from "./primaryPetal";

export type CurrentHexagramFormationResult = Readonly<{
  source: "dynamics";
  createdAt: string;
  motherCodeProfile: MotherCodeProfile;
  selectedPressureSeedContext: SelectedPressureSeedContext;
  pressureSeed: PressureSeed;
  pressureField: PressureField;
  currentHexagramProfile: CurrentHexagramProfile;
}>;
