export const XINMAI_LIFE_COMPANION_CANONICAL_DATABASE_NAME =
  "xinmai-life-companion-canonical" as const;
export const XINMAI_LIFE_COMPANION_CANONICAL_DATABASE_VERSION = 1 as const;
export const XINMAI_LIFE_COMPANION_RELATIONSHIP_STORE =
  "life-companion-relationship" as const;
export const XINMAI_LIFE_COMPANION_COMMAND_FENCE_STORE =
  "life-companion-command-fence" as const;

export const XINMAI_LIFE_COMPANION_RELATIONSHIP_SCHEMA_VERSION =
  "XINMAI_LIFE_COMPANION_RELATIONSHIP_V1" as const;
export const XINMAI_LIFE_COMPANION_FIRST_ENCOUNTER_RECEIPT_SCHEMA_VERSION =
  "XINMAI_LIFE_COMPANION_FIRST_ENCOUNTER_RECEIPT_V1" as const;
export const XINMAI_LIFE_COMPANION_RELATIONSHIP_PROTOCOL_REVISION =
  "XINMAI_LIFE_COMPANION_RELATIONSHIP_PROTOCOL_2026_08_13_P1" as const;
export const XINMAI_LIFE_COMPANION_COMMAND_FENCE_SCHEMA_VERSION =
  "XINMAI_LIFE_COMPANION_COMMAND_FENCE_V1" as const;

export type XinmaiLifeCompanionIdentityReferences = Readonly<{
  sourceReferenceId: string;
  starBeastIdentityReferenceId: string;
  mansionCoordinateReferenceId: string;
}>;

export type XinmaiLifeCompanionFirstEncounterVisualOutcome =
  | "MOTION_RESPONSE"
  | "STATIC_RESPONSE"
  | "RESPONSE_UNAVAILABLE_ACCEPTED";

export type XinmaiLifeCompanionFirstEncounterReceipt = Readonly<{
  schemaVersion:
    typeof XINMAI_LIFE_COMPANION_FIRST_ENCOUNTER_RECEIPT_SCHEMA_VERSION;
  receiptReferenceId: string;
  relationshipId: string;
  identityKey: string;
  identityReferences: XinmaiLifeCompanionIdentityReferences;
  responseCycleReferenceId: string;
  visualOutcomeReferenceId: string;
  visualOutcome: XinmaiLifeCompanionFirstEncounterVisualOutcome;
  evidenceDigest: string;
  observedAt: string;
}>;

export type XinmaiLifeCompanionRelationshipAggregate = Readonly<{
  schemaVersion:
    typeof XINMAI_LIFE_COMPANION_RELATIONSHIP_SCHEMA_VERSION;
  protocolRevision:
    typeof XINMAI_LIFE_COMPANION_RELATIONSHIP_PROTOCOL_REVISION;
  relationshipId: string;
  identityKey: string;
  identityReferences: XinmaiLifeCompanionIdentityReferences;
  state: "COMPANIONSHIP_CONFIRMED";
  firstEncounterReceiptReferenceId: string;
  firstEncounterReceipt: XinmaiLifeCompanionFirstEncounterReceipt;
  relationshipDigest: string;
  revision: 1;
  createdAt: string;
  updatedAt: string;
  provenance: Readonly<{
    identityAuthority: "EXISTING_RECOGNIZED_LIFE";
    relationshipAuthority:
      "XINMAI_LIFE_COMPANION_RELATIONSHIP_CONTROLLER";
    explicitCompanionshipConfirmationRequired: true;
    lifeWhisperRequired: false;
    namingRequired: false;
    realityRequired: false;
    noRawWhisperPersistence: true;
    noPrivateFreeTextPersistence: true;
    noBackfill: true;
  }>;
}>;

export type XinmaiLifeCompanionCommandFence = Readonly<{
  schemaVersion:
    typeof XINMAI_LIFE_COMPANION_COMMAND_FENCE_SCHEMA_VERSION;
  commandReferenceId: string;
  outcomeReferenceId: string;
  relationshipId: string;
  identityKey: string;
  commandDigest: string;
  outcome: "COMPANIONSHIP_CONFIRMED";
  committedAt: string;
}>;

export type XinmaiLifeCompanionCanonicalReadResult =
  | Readonly<{
      status: "AVAILABLE";
      relationship: XinmaiLifeCompanionRelationshipAggregate;
    }>
  | Readonly<{
      status: "NOT_FOUND";
      relationship: null;
    }>
  | Readonly<{
      status: "UNAVAILABLE";
      reason:
        | "STORAGE_UNAVAILABLE"
        | "STORAGE_BLOCKED"
        | "STORAGE_FAILED"
        | "TRANSACTION_ABORTED"
        | "RELATIONSHIP_CORRUPTED"
        | "IDENTITY_REFERENCE_MISMATCH";
      relationship: null;
    }>;

export type XinmaiLifeCompanionCanonicalCommitResult =
  | Readonly<{
      status: "COMMITTED" | "ALREADY_COMMITTED";
      relationship: XinmaiLifeCompanionRelationshipAggregate;
      fence: XinmaiLifeCompanionCommandFence;
    }>
  | Readonly<{
      status: "CONFLICT" | "UNAVAILABLE";
      reason:
        | "COMMAND_FENCE_CONFLICT"
        | "IDENTITY_ALREADY_BOUND"
        | "STORAGE_UNAVAILABLE"
        | "STORAGE_BLOCKED"
        | "STORAGE_FAILED"
        | "STORAGE_QUOTA_EXCEEDED"
        | "TRANSACTION_ABORTED";
      relationship: null;
      fence: null;
    }>;

export type XinmaiLifeCompanionRelationshipCommand = Readonly<{
  type: "CONFIRM_COMPANIONSHIP";
  commandReferenceId: string;
  identityReferences: XinmaiLifeCompanionIdentityReferences;
  responseCycleReferenceId: string;
  visualOutcomeReferenceId: string;
  visualOutcome: XinmaiLifeCompanionFirstEncounterVisualOutcome;
}>;

export type XinmaiLifeCompanionRelationshipCommandResult = Readonly<{
  status: "SAFE_WITHHELD";
  code: "MUTATION_POLICY_SAFE_WITHHELD";
  retryability: "NOT_RETRYABLE";
  relationship: null;
}>;

export type XinmaiLifeCompanionRelationshipRecoveryResult =
  | Readonly<{
      status: "READY";
      relationship: XinmaiLifeCompanionRelationshipAggregate;
    }>
  | Readonly<{
      status: "NOT_ESTABLISHED" | "BLOCKED";
      reason:
        | "RELATIONSHIP_NOT_FOUND"
        | "RELATIONSHIP_CORRUPTED"
        | "IDENTITY_REFERENCE_MISMATCH"
        | "STORAGE_UNAVAILABLE"
        | "STORAGE_BLOCKED"
        | "STORAGE_FAILED"
        | "TRANSACTION_ABORTED";
      relationship: null;
    }>;
