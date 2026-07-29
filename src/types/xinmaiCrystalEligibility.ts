import type { RuntimeCurrentCrystalEndState } from "../services/hexagramCrystalRuntimeEndpointService";
import type { RealityEncounterIdentityReferences } from "./xinmaiRealityEncounterIntent";

export const XINMAI_CRYSTAL_ELIGIBILITY_SCHEMA_VERSION =
  "XINMAI_CRYSTAL_ELIGIBILITY_V1" as const;
export const XINMAI_CRYSTAL_FORMATION_RECEIPT_SCHEMA_VERSION =
  "XINMAI_CRYSTAL_FORMATION_RECEIPT_V1" as const;

export type CrystalEligibility = Readonly<{
  schemaVersion: typeof XINMAI_CRYSTAL_ELIGIBILITY_SCHEMA_VERSION;
  source: "xinmai_crystal_eligibility_authority";
  crystalEligibilityReferenceId: string;
  livedResponseReferenceId: string;
  livedResponseRevision: number;
  choiceActionIntentionReferenceId: string;
  identityReferences: RealityEncounterIdentityReferences;
  state:
    | "WITHHELD"
    | "ELIGIBLE"
    | "FORMATION_PENDING"
    | "CONSUMED"
    | "INVALIDATED";
  withheldReason:
    | "LIVED_RESPONSE_NOT_ATTEMPTED"
    | "LIVED_RESPONSE_UNABLE_TO_CONTINUE"
    | "FACT_NOT_CONFIRMED"
    | "PROVENANCE_MISMATCH"
    | "AUTHORITY_UNAVAILABLE"
    | null;
  eligibilityRevision: number;
  reservation: Readonly<{
    reservationReferenceId: string;
    formationReferenceId: string;
    crystalReferenceId: string;
    fencingToken: number;
    reservedAt: string;
  }> | null;
  consumedByFormationReferenceId: string | null;
  resolvedAt: string;
  updatedAt: string;
}>;

export type CrystalFormationReceipt = Readonly<{
  schemaVersion:
    typeof XINMAI_CRYSTAL_FORMATION_RECEIPT_SCHEMA_VERSION;
  source: "xinmai_crystal_formation_consumer";
  formationReferenceId: string;
  crystalReferenceId: string;
  crystalEligibilityReferenceId: string;
  eligibilityRevision: number;
  livedResponseReferenceId: string;
  choiceActionIntentionReferenceId: string;
  identityReferences: RealityEncounterIdentityReferences;
  formationKey: string;
  fencingToken: number;
  formedCrystal: RuntimeCurrentCrystalEndState;
  status: "FORMED";
  formedAt: string;
  projection: "PENDING" | "PROJECTED" | "RETRYABLE";
  projectionUpdatedAt: string;
  provenance: Readonly<{
    factAuthority: "XINMAI_LIVED_RESPONSE_FACT";
    eligibilityAuthority: "XINMAI_CRYSTAL_ELIGIBILITY";
    deterministicFormation: true;
    noBackfill: true;
  }>;
}>;
