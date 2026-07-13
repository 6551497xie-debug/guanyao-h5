import { buildYaoTransmissionChain } from "./guanyaoCausalEngineService";
import type { CurrentHexagramFormationResult } from "../types/currentHexagramFormation";
import type { SingleModelRevisionAction } from "../types/dynamicsRevisionAction";

export function resolveDynamicsRevisionAction(
  formation: CurrentHexagramFormationResult | null,
): SingleModelRevisionAction | null {
  if (!formation) return null;

  const yaoTransmissionChain = buildYaoTransmissionChain(
    formation.motherCodeProfile,
    formation.pressureSeed,
    formation.currentHexagramProfile,
    {
      preferRuntimePressureSeed: true,
    },
  );
  const mainTransmission =
    yaoTransmissionChain.transmissions.find(
      (transmission) => transmission.yaoLayer === yaoTransmissionChain.mainCut.yaoLayer,
    ) ?? yaoTransmissionChain.transmissions[0];

  if (!mainTransmission) return null;

  return {
    layerLabel: mainTransmission.layerLabel,
    yaoName: mainTransmission.yaoName,
    actionLine: mainTransmission.antiInstinctHint,
    sourceReason: mainTransmission.inertiaSignal,
    interventionPotential: yaoTransmissionChain.mainCut.interventionLeverage,
    userAgency: yaoTransmissionChain.mainCut.userAgency,
  };
}
