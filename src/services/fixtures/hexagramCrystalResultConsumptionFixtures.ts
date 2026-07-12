import type {
  HexagramCrystalResultConsumption,
  HexagramCrystalResultConsumptionInput,
} from "../../types/personaTransmission";
import {
  actionFiveAwarenessHexagramCrystalEngineInput,
  actionFiveAwarenessHexagramCrystalResult,
} from "./hexagramCrystalEngineFixtures";

export const actionFiveAwarenessHexagramCrystalResultConsumptionInput: HexagramCrystalResultConsumptionInput = {
  result: actionFiveAwarenessHexagramCrystalResult,
  source: "fixture",
};

export const actionFiveAwarenessHexagramCrystalResultConsumption: HexagramCrystalResultConsumption = {
  status: "READY_FOR_HEXAGRAM_EXPRESSION_LAYER",
  payload: {
    sourceExpression: actionFiveAwarenessHexagramCrystalResult.expression,
    inheritedIdentity: actionFiveAwarenessHexagramCrystalEngineInput.sourceHexagram,
    crystalLine: actionFiveAwarenessHexagramCrystalResult.expression.crystalLine,
    migrationLine: actionFiveAwarenessHexagramCrystalResult.expression.migrationLine,
    boundary: {
      canEnterHexagramExpressionLayer: true,
      canMutateHexagramMatrix: false,
      canRenderUi: false,
      canWriteStorage: false,
      canCreateCollectibleAsset: false,
      canConnect384: false,
      canConnectOldR8: false,
    },
  },
};
