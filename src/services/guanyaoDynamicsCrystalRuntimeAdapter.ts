import {
  resolveRuntimeCurrentCrystalEndState,
  type RuntimeCurrentCrystalEndState,
} from "./hexagramCrystalRuntimeEndpointService";
import type { HexagramAssetCandidateCompletionState } from "./guanyaoHexagramAssetCandidateResolver";
import type { CurrentHexagramFormationResult } from "../types/currentHexagramFormation";
import type { SingleModelRevisionAction } from "../types/dynamicsRevisionAction";
import type { PersonaMigrationImpact } from "../types/personaTransmission";

export type DynamicsCurrentCrystalEndState = RuntimeCurrentCrystalEndState;

export type DynamicsCrystalRuntimeAdapterInput = Readonly<{
  formation: CurrentHexagramFormationResult | null;
  migrationImpact: PersonaMigrationImpact | null;
  completedNodeCount: number;
  primaryDimension?: string;
  assetCompletionState: HexagramAssetCandidateCompletionState;
  revisionAction: SingleModelRevisionAction | null;
  revisionActionConfirmed: boolean;
  createdAt?: string;
}>;

export function resolveDynamicsCurrentCrystalEndState(
  input: DynamicsCrystalRuntimeAdapterInput,
): DynamicsCurrentCrystalEndState | null {
  const { formation } = input;
  if (!formation) return null;

  const readyToCrystallize =
    input.assetCompletionState === "READY_TO_CRYSTALLIZE" &&
    (!input.revisionAction || input.revisionActionConfirmed);

  return resolveRuntimeCurrentCrystalEndState({
    currentHexagramProfile: formation.currentHexagramProfile,
    motherCodeName: formation.motherCodeProfile.motherCodeName,
    selectedPressureSeedContext: formation.selectedPressureSeedContext,
    completedNodeCount: input.completedNodeCount,
    primaryDimension: input.primaryDimension,
    readyToCrystallize,
    migrationImpact: input.migrationImpact,
    createdAt: input.createdAt,
  });
}
