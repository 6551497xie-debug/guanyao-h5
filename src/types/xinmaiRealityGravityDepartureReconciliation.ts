import type { RealityEncounterIdentityReferences } from "./xinmaiRealityEncounterIntent";

export const XINMAI_REALITY_GRAVITY_DEPARTURE_RECONCILIATION_SCHEMA_VERSION =
  "XINMAI_REALITY_GRAVITY_DEPARTURE_RECONCILIATION_V1" as const;

export type XinmaiChoiceDepartureReconciliationProof = Readonly<{
  schemaVersion:
    typeof XINMAI_REALITY_GRAVITY_DEPARTURE_RECONCILIATION_SCHEMA_VERSION;
  source: "xinmai_choice_departure_reconciliation_proof_adapter";
  reconciliationReferenceId: string;
  departureReceiptReferenceId: string;
  departureReceiptRevision: number;
  choiceActionIntentionReferenceId: string;
  sourceEncounterCycleId: string;
  gravityCycleId: string;
  gravityObservationReferenceId: string;
  identityReferences: RealityEncounterIdentityReferences;
  observedGrowthEnvelopeRevision: number;
  observedAt: string;
  provenance: Readonly<{
    departureAuthority: "XINMAI_LIVED_GROWTH_TRANSACTION_AUTHORITY";
    readOnly: true;
    crossStoreAtomicityClaim: false;
    noActionCompletionClaim: true;
  }>;
}>;

export type RealityAdventureDepartureReconciliation = Readonly<{
  schemaVersion:
    typeof XINMAI_REALITY_GRAVITY_DEPARTURE_RECONCILIATION_SCHEMA_VERSION;
  reconciliationReferenceId: string;
  departureReceiptReferenceId: string;
  departureReceiptRevision: number;
  choiceActionIntentionReferenceId: string;
  sourceEncounterCycleId: string;
  gravityCycleId: string;
  gravityObservationReferenceId: string;
  identityReferences: RealityEncounterIdentityReferences;
  observedGrowthEnvelopeRevision: number;
  reconciledCanonicalRevision: number;
  reconciledFencingToken: number;
  state: "EXPLICIT_DEPARTURE_RECONCILED";
  reconciledAt: string;
  provenance: Readonly<{
    departureAuthority: "XINMAI_LIVED_GROWTH_TRANSACTION_AUTHORITY";
    realityAuthority: "XINMAI_REALITY_ADVENTURE_CONTINUITY";
    crossStoreAtomicityClaim: false;
    noActionCompletionClaim: true;
  }>;
}>;

export type XinmaiChoiceDepartureReconciliationProofResult =
  | Readonly<{
      status: "READY";
      proof: XinmaiChoiceDepartureReconciliationProof;
      reason: null;
    }>
  | Readonly<{
      status: "SAFE_WITHHELD";
      proof: null;
      reason:
        | "GROWTH_RECOVERY_UNAVAILABLE"
        | "GROWTH_RECOVERY_CORRUPTED"
        | "CHOICE_NOT_CURRENT"
        | "DEPARTURE_RECEIPT_NOT_CURRENT"
        | "IDENTITY_OR_LINEAGE_MISMATCH"
        | "PROVENANCE_NOT_UNIQUE";
    }>;

export type XinmaiRealityAdventureLifecycleReconciliationResult =
  | Readonly<{
      status: "RECONCILED" | "ALREADY_RECONCILED";
      reconciliation: RealityAdventureDepartureReconciliation;
      canonicalRevision: number;
      fencingToken: number;
      reason: null;
    }>
  | Readonly<{
      status: "SAFE_WITHHELD";
      reconciliation: null;
      canonicalRevision: null;
      fencingToken: null;
      reason:
        | "MUTATION_PAUSED"
        | "SOURCE_NOT_FOUND"
        | "SOURCE_NOT_ACTIVE_IN_GRAVITY"
        | "SOURCE_NOT_TERMINAL"
        | "ACTIVE_IDENTITY_KEY_STILL_PRESENT"
        | "IDENTITY_OR_LINEAGE_MISMATCH"
        | "RECONCILIATION_PROOF_MISMATCH"
        | "TRANSACTION_STORAGE_UNAVAILABLE"
        | "TRANSACTION_OPEN_BLOCKED"
        | "TRANSACTION_ABORTED"
        | "TRANSACTION_CONNECTION_CLOSED"
        | "WRITE_UNCONFIRMED"
        | "RECOVERY_CORRUPTED"
        | "LEGACY_WRITER_DETECTED"
        | "LEGACY_SOURCE_CORRUPTED"
        | "UNIQUE_CONSTRAINT_REJECTED";
    }>;

export type XinmaiRealityAdventureDepartureReconciliationReadResult =
  | Readonly<{
      status: "CURRENT";
      reconciliation: RealityAdventureDepartureReconciliation;
      reason: null;
    }>
  | Readonly<{
      status: "PENDING";
      reconciliation: null;
      reason: "DEPARTURE_RECONCILIATION_PENDING";
    }>
  | Readonly<{
      status: "SAFE_WITHHELD";
      reconciliation: null;
      reason:
        | "SOURCE_NOT_FOUND"
        | "RECONCILIATION_PROOF_MISMATCH"
        | "IDENTITY_OR_LINEAGE_MISMATCH"
        | "RECOVERY_UNAVAILABLE"
        | "RECOVERY_CORRUPTED";
    }>;
