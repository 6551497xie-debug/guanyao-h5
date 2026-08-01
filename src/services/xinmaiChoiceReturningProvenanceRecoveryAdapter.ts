import type { RealityEncounterIdentityReferences } from "../types/xinmaiRealityEncounterIntent";
import { readXinmaiChoiceReturningProvenanceAdmissions } from "./xinmaiChoiceReturningProvenanceController";

export const readXinmaiChoiceReturningProvenanceRecovery = (
  identityReferences: RealityEncounterIdentityReferences,
) => readXinmaiChoiceReturningProvenanceAdmissions(identityReferences);

export const XinmaiChoiceReturningProvenanceRecoveryAdapter = Object.freeze({
  read: readXinmaiChoiceReturningProvenanceRecovery,
  canonicalReader: "XINMAI_LIVED_GROWTH_TRANSACTIONAL_STORE" as const,
  realityProofReader: "XINMAI_CHOICE_RETURNING_REALITY_PROOF_ADAPTER" as const,
  readOnly: true as const,
  noMutation: true as const,
  noBackfill: true as const,
});
