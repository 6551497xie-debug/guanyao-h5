import type {
  HexagramCrystalEngineInput,
  HexagramCrystalResult,
} from "../../types/personaTransmission";
import { actionFiveAwarenessHexagramCrystalInput } from "./hexagramCrystalInputFixtures";

export const actionFiveAwarenessHexagramCrystalEngineInput: HexagramCrystalEngineInput = {
  sourceHexagram: actionFiveAwarenessHexagramCrystalInput.sourceHexagram,
  crystalMeaning: actionFiveAwarenessHexagramCrystalInput.crystalMeaning,
  migrationTrace: actionFiveAwarenessHexagramCrystalInput.migrationTrace,
  dominantShift: actionFiveAwarenessHexagramCrystalInput.dominantShift,
  changedLineContext: {
    sourceUnitId: actionFiveAwarenessHexagramCrystalInput.migrationTrace.sourceUnitId,
    dimension: actionFiveAwarenessHexagramCrystalInput.migrationTrace.dimension,
    yaoStage: actionFiveAwarenessHexagramCrystalInput.migrationTrace.yaoStage,
    changedLineHint: actionFiveAwarenessHexagramCrystalInput.migrationTrace.traceLine,
  },
  source: "fixture",
};

export const actionFiveAwarenessHexagramCrystalResult: HexagramCrystalResult = {
  status: "READY",
  readiness: "READY_FOR_HEXAGRAM_CRYSTAL_EXPRESSION",
  expression: {
    hexagramCode: actionFiveAwarenessHexagramCrystalInput.sourceHexagram.hexagramCode,
    hexagramName: actionFiveAwarenessHexagramCrystalInput.sourceHexagram.hexagramName,
    hexagramTitle: actionFiveAwarenessHexagramCrystalInput.sourceHexagram.hexagramTitle,
    crystalLine: actionFiveAwarenessHexagramCrystalInput.crystalMeaning,
    migrationLine: `${actionFiveAwarenessHexagramCrystalInput.dominantShift.fromModel} → ${actionFiveAwarenessHexagramCrystalInput.dominantShift.toResponse}`,
    assetBoundary: "CURRENT_ROUND_HEXAGRAM_CRYSTAL",
  },
  sourceInput: actionFiveAwarenessHexagramCrystalEngineInput,
  guardrails: {
    noStorageWrite: true,
    noHexagramMatrixMutation: true,
    noCurrentHexagramProfileMutation: true,
    noCurrentCrystalEndStateMutation: true,
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
