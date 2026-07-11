import type {
  CrystalEndStateAdapterInput,
  CrystalEndStateAdapterResult,
} from "../../types/personaTransmission";
import { actionFiveAwarenessCrystalState } from "./crystalMappingFixtures";

export const actionFiveAwarenessCrystalEndStateAdapterInput: CrystalEndStateAdapterInput = {
  crystalState: actionFiveAwarenessCrystalState,
  source: "fixture",
};

export const actionFiveAwarenessCrystalEndStateAdapterResult: CrystalEndStateAdapterResult = {
  status: "READY",
  readiness: "READY_FOR_CURRENT_CRYSTAL_END_STATE",
  crystalState: actionFiveAwarenessCrystalState,
  boundary: {
    canAdaptToCurrentCrystalEndState: true,
    nextCrystalStateReadiness: "CRYSTALLIZED",
    canExposeHexagramAssetAfterAdapt: true,
    canDepositToRingLiteAfterAdapt: true,
  },
};
