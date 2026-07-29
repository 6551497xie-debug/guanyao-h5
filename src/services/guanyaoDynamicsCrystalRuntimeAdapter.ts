import {
  resolveRuntimeCurrentCrystalEndState,
  type RuntimeCurrentCrystalEndState,
} from "./hexagramCrystalRuntimeEndpointService";
import type { ChoiceFormationSourceSnapshot } from "../types/xinmaiChoiceActionIntention";

export type DynamicsCurrentCrystalEndState = RuntimeCurrentCrystalEndState;

export type DynamicsCrystalRuntimeAdapterInput = Readonly<{
  formationSourceSnapshot: ChoiceFormationSourceSnapshot;
  formationAuthorization: Readonly<{
    authority: "XINMAI_CRYSTAL_ELIGIBILITY";
    status: "AUTHORIZED";
    crystalEligibilityReferenceId: string;
    eligibilityRevision: number;
    livedResponseReferenceId: string;
    formationReferenceId: string;
    crystalReferenceId: string;
    formedAt: string;
  }>;
}>;

export function resolveDynamicsCurrentCrystalEndState(
  input: DynamicsCrystalRuntimeAdapterInput,
): DynamicsCurrentCrystalEndState | null {
  const { formationSourceSnapshot, formationAuthorization } = input;
  const { formation } = formationSourceSnapshot;
  if (
    formationAuthorization.authority !== "XINMAI_CRYSTAL_ELIGIBILITY" ||
    formationAuthorization.status !== "AUTHORIZED" ||
    formationSourceSnapshot.assetCompletionState !== "READY_TO_CRYSTALLIZE"
  ) return null;

  return resolveRuntimeCurrentCrystalEndState({
    currentHexagramProfile: formation.currentHexagramProfile,
    motherCodeName: formation.motherCodeProfile.motherCodeName,
    selectedPressureSeedContext: formation.selectedPressureSeedContext,
    completedNodeCount: formationSourceSnapshot.completedNodeCount,
    primaryDimension: formationSourceSnapshot.primaryDimension,
    readyToCrystallize: true,
    migrationImpact: formationSourceSnapshot.migrationImpact,
    formationIdentity: {
      crystalEligibilityReferenceId:
        formationAuthorization.crystalEligibilityReferenceId,
      eligibilityRevision: formationAuthorization.eligibilityRevision,
      livedResponseReferenceId:
        formationAuthorization.livedResponseReferenceId,
      formationReferenceId: formationAuthorization.formationReferenceId,
      crystalReferenceId: formationAuthorization.crystalReferenceId,
      formedAt: formationAuthorization.formedAt,
    },
  });
}
