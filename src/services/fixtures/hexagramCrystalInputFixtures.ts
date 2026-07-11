import type { HexagramCrystalInput } from "../../types/personaTransmission";
import {
  actionFiveAwarenessCrystalState,
  actionFiveAwarenessCrystalStructureSource,
  actionFiveAwarenessMigrationImpact,
} from "./crystalMappingFixtures";

export const actionFiveAwarenessHexagramCrystalInput: HexagramCrystalInput = {
  sourceCrystal: {
    source: "currentCrystalEndState",
    status: "CRYSTALLIZED",
    crystalMeaning: actionFiveAwarenessCrystalState.crystalMeaning,
  },
  sourceHexagram: {
    lowerTrigram: actionFiveAwarenessCrystalStructureSource.currentHexagramProfile.lowerTrigram,
    upperTrigram: actionFiveAwarenessCrystalStructureSource.currentHexagramProfile.upperTrigram,
    hexagramCode: actionFiveAwarenessCrystalStructureSource.currentHexagramProfile.hexagramCode,
    hexagramName: actionFiveAwarenessCrystalStructureSource.currentHexagramProfile.hexagramName,
    hexagramTitle: actionFiveAwarenessCrystalStructureSource.currentHexagramProfile.hexagramTitle,
  },
  migrationTrace: {
    traceLine: actionFiveAwarenessMigrationImpact.crystalImprint.imprintLine,
    sourceUnitId: actionFiveAwarenessMigrationImpact.sourceUnit.unitId,
    dimension: actionFiveAwarenessMigrationImpact.dimension,
    yaoStage: actionFiveAwarenessMigrationImpact.yaoStage,
  },
  dominantShift: {
    fromModel: actionFiveAwarenessMigrationImpact.fromModel,
    toResponse: actionFiveAwarenessMigrationImpact.toResponse,
    deflectionVector: actionFiveAwarenessMigrationImpact.deflectionVector,
  },
  crystalMeaning: actionFiveAwarenessCrystalState.crystalMeaning,
  readiness: "READY_FOR_HEXAGRAM_CRYSTAL",
  source: "fixture",
  guardrails: {
    noStorageWrite: true,
    noHexagramGeneration: true,
    noCurrentCrystalEndStateMutation: true,
    noCrystalEngineMutation: true,
    noCollectibleAsset: true,
    noScore: true,
    noLevel: true,
    noGrowthValue: true,
    noPetGrowth: true,
    no384Yao: true,
    noArchive: true,
    noOldR8: true,
  },
};
