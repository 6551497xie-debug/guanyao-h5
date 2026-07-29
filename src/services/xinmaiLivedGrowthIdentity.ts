import type { RealityEncounterIdentityReferences } from "../types/xinmaiRealityEncounterIntent";

export const xinmaiGrowthIdentityMatches = (
  left: RealityEncounterIdentityReferences,
  right: RealityEncounterIdentityReferences,
): boolean =>
  left.sourceReferenceId === right.sourceReferenceId &&
  left.starBeastIdentityReferenceId === right.starBeastIdentityReferenceId &&
  left.mansionCoordinateReferenceId === right.mansionCoordinateReferenceId;
