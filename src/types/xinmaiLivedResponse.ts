import type { RealityEncounterIdentityReferences } from "./xinmaiRealityEncounterIntent";

export const XINMAI_LIVED_RESPONSE_FACT_SCHEMA_VERSION =
  "XINMAI_LIVED_RESPONSE_FACT_V1" as const;

export type LivedResponseOutcome =
  | "NOT_ATTEMPTED"
  | "ATTEMPTED"
  | "COMPLETED_AS_INTENDED"
  | "CHANGED_RESPONSE"
  | "UNABLE_TO_CONTINUE";

export type LivedResponseCandidate = Readonly<{
  source: "xinmai_lived_response_return_surface";
  candidateReferenceId: string;
  choiceActionIntentionReferenceId: string;
  candidateRevision: number;
  responseOutcome: LivedResponseOutcome;
  factualSummary: string;
  state: "AWAITING_USER_CONFIRMATION" | "USER_REJECTED";
  createdAt: string;
}>;

export type LivedResponseFact = Readonly<{
  schemaVersion: typeof XINMAI_LIVED_RESPONSE_FACT_SCHEMA_VERSION;
  source: "xinmai_lived_response_authority_controller";
  livedResponseReferenceId: string;
  choiceActionIntentionReferenceId: string;
  identityReferences: RealityEncounterIdentityReferences;
  sourceEncounterCycleId: string;
  targetEncounterCycleId: string;
  gravityCycleId: string;
  gravityObservationReferenceId: string;
  responseOutcome: LivedResponseOutcome;
  factualSummary: string | null;
  state: "CONFIRMED" | "SUPERSEDED" | "REVOKED";
  userConfirmationRevision: number;
  occurredAt: string;
  confirmedAt: string;
  updatedAt: string;
  provenance: Readonly<{
    confirmationAuthority: "USER_EXPLICIT_CONFIRMATION";
    candidateReferenceId: string;
    noAiConfirmation: true;
    noObjectiveRealityClaim: true;
  }>;
}>;
