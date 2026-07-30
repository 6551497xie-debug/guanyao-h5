import type {
  GravityEntryAdmission,
} from "../types/xinmaiGravityEntryAdmission";
import type {
  GravityObservationResumeDecision,
} from "../types/xinmaiGravityObservationContinuity";
import {
  recoverGravityEncounterContinuity,
} from "./xinmaiGravityEncounterContinuityController";

export const GRAVITY_ENCOUNTER_CONTINUITY_RECOVERY_BOUNDARY =
  Object.freeze({
    uniquePublicProgressRecoveryOwner: true as const,
    typedAdmissionCandidateRequired: true as const,
    canonicalCheckpointReadOnly: true as const,
    canonicalGrowthReadOnly: true as const,
    higherGrowthAssetsWin: true as const,
    noV1ObservationBackfill: true as const,
    noDirectSessionStorageRead: true as const,
    noPageStorageRead: true as const,
    noRouteStorageRead: true as const,
    noRendererStorageRead: true as const,
  });

export async function resolveGravityEncounterResumeDecision(
  admission: GravityEntryAdmission,
): Promise<GravityObservationResumeDecision> {
  return recoverGravityEncounterContinuity(admission);
}

export const XinmaiGravityEncounterContinuityRecoveryAdapter =
  Object.freeze({
    resolve: resolveGravityEncounterResumeDecision,
    boundary: GRAVITY_ENCOUNTER_CONTINUITY_RECOVERY_BOUNDARY,
  });
