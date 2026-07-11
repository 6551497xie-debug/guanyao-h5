import type {
  CurrentCrystalEndStateLike,
  HexagramCrystalAdapterInput,
  HexagramCrystalAdapterResult,
} from "../../types/personaTransmission";
import { actionFiveAwarenessCrystalState, actionFiveAwarenessCrystalStructureSource } from "./crystalMappingFixtures";
import { actionFiveAwarenessHexagramCrystalInput } from "./hexagramCrystalInputFixtures";

export const actionFiveAwarenessCurrentCrystalEndState: CurrentCrystalEndStateLike = {
  source: "dynamics",
  status: "CRYSTALLIZED",
  hexagram: {
    lowerTrigram: actionFiveAwarenessCrystalStructureSource.currentHexagramProfile.lowerTrigram,
    upperTrigram: actionFiveAwarenessCrystalStructureSource.currentHexagramProfile.upperTrigram,
    hexagramCode: actionFiveAwarenessCrystalStructureSource.currentHexagramProfile.hexagramCode,
    hexagramName: actionFiveAwarenessCrystalStructureSource.currentHexagramProfile.hexagramName,
    hexagramTitle: actionFiveAwarenessCrystalStructureSource.currentHexagramProfile.hexagramTitle,
  },
  crystal: {
    title: "本局结晶",
    copy: actionFiveAwarenessCrystalState.crystalMeaning,
  },
  transmission: {
    completedNodeCount: 6,
    primaryDimension: "action",
  },
};

export const actionFiveAwarenessHexagramCrystalAdapterInput: HexagramCrystalAdapterInput = {
  sourceCrystal: actionFiveAwarenessCurrentCrystalEndState,
  source: "fixture",
};

export const actionFiveAwarenessHexagramCrystalAdapterResult: HexagramCrystalAdapterResult = {
  status: "READY",
  input: actionFiveAwarenessHexagramCrystalInput,
};
