import type {
  MotherCodeDefinition,
  MotherCodeProfile,
} from "./guanyaoCausalEngine";
import type { LunarTrigramLandingResult } from "./guanyaoLunarTrigramLanding";

export type LunarMotherCodeLandingResult = Readonly<LunarTrigramLandingResult & {
  motherCodeDefinition: MotherCodeDefinition;
  motherCodeProfile: MotherCodeProfile;
  trigramLanding: LunarTrigramLandingResult;
  formulaLines: readonly string[];
}>;
