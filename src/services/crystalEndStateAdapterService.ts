import type {
  CrystalEndStateAdapterBoundary,
  CrystalEndStateAdapterInput,
  CrystalEndStateAdapterNotReady,
  CrystalEndStateAdapterNotReadyReason,
  CrystalEndStateAdapterResult,
  CrystalEndStateAdapterSuccess,
  CrystalState,
} from "../types/personaTransmission";

const createBoundary = (
  crystalState: CrystalState,
  canAdaptToCurrentCrystalEndState: boolean,
): CrystalEndStateAdapterBoundary => ({
  canAdaptToCurrentCrystalEndState,
  nextCrystalStateReadiness: canAdaptToCurrentCrystalEndState ? "CRYSTALLIZED" : crystalState.readiness,
  canExposeHexagramAssetAfterAdapt: canAdaptToCurrentCrystalEndState,
  canDepositToRingLiteAfterAdapt: canAdaptToCurrentCrystalEndState,
});

const createNotReadyResult = (
  crystalState: CrystalState,
  reason: CrystalEndStateAdapterNotReadyReason,
): CrystalEndStateAdapterNotReady => ({
  status: "NOT_READY",
  readiness: "NOT_READY",
  reason,
  crystalState,
  boundary: createBoundary(crystalState, false),
});

const createReadyResult = (crystalState: CrystalState): CrystalEndStateAdapterSuccess => ({
  status: "READY",
  readiness: "READY_FOR_CURRENT_CRYSTAL_END_STATE",
  crystalState,
  boundary: createBoundary(crystalState, true),
});

export const adaptCrystalState = (input: CrystalEndStateAdapterInput): CrystalEndStateAdapterResult => {
  const { crystalState } = input;

  if (crystalState.readiness !== "READY_TO_CRYSTALLIZE") {
    return createNotReadyResult(crystalState, "CRYSTAL_STATE_NOT_READY_TO_CRYSTALLIZE");
  }

  if (!crystalState.assetBoundary.canCreateCurrentCrystalEndState) {
    return createNotReadyResult(crystalState, "CURRENT_CRYSTAL_END_STATE_BOUNDARY_CLOSED");
  }

  if (crystalState.assetBoundary.canExposeHexagramAsset) {
    return createNotReadyResult(crystalState, "HEXAGRAM_ASSET_BOUNDARY_PREMATURE");
  }

  if (crystalState.assetBoundary.canDepositToRingLite || crystalState.ringDepositMeaning.shouldDepositToRingLite) {
    return createNotReadyResult(crystalState, "RING_DEPOSIT_BOUNDARY_PREMATURE");
  }

  return createReadyResult(crystalState);
};

export const CrystalEndStateAdapterService = {
  adaptCrystalState,
} as const;
