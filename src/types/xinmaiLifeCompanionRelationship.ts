export const XINMAI_LIFE_COMPANION_FIRST_ENCOUNTER_SCHEMA_VERSION =
  "XINMAI_LIFE_COMPANION_FIRST_ENCOUNTER_V1" as const;

export const XINMAI_LIFE_COMPANION_RELATIONSHIP_PROTOCOL_REVISION =
  "XINMAI_LIFE_COMPANION_RELATIONSHIP_2026_08_13_P0" as const;

export type XinmaiFirstEncounterUserInitiation =
  | "WHISPER_SHARED"
  | "SILENCE_CHOSEN";

export type XinmaiFirstEncounterStarBeastResponse =
  | "MOTION_RESPONSE"
  | "STATIC_RESPONSE"
  | "RESPONSE_UNAVAILABLE_ACCEPTED"
  | "SILENCE_HELD";

export type XinmaiLifeCompanionFirstEncounterReceipt = Readonly<{
  schemaVersion: typeof XINMAI_LIFE_COMPANION_FIRST_ENCOUNTER_SCHEMA_VERSION;
  protocolRevision: typeof XINMAI_LIFE_COMPANION_RELATIONSHIP_PROTOCOL_REVISION;
  receiptReferenceId: string;
  sourceReferenceId: string;
  starBeastIdentityReferenceId: string;
  mansionCoordinateReferenceId: string;
  userInitiation: XinmaiFirstEncounterUserInitiation;
  starBeastResponse: XinmaiFirstEncounterStarBeastResponse;
  encounterState: "FIRST_ENCOUNTER_COMPLETED";
  trustState: "FIRST_EXCHANGE_ESTABLISHED";
  companionState: "MET";
  rawWhisperPersisted: false;
  createdAt: string;
  revision: 1;
}>;

export type XinmaiLifeCompanionFirstEncounterReadResult =
  | Readonly<{
      status: "AVAILABLE";
      receipt: XinmaiLifeCompanionFirstEncounterReceipt;
    }>
  | Readonly<{
      status: "NOT_FOUND";
      receipt: null;
    }>
  | Readonly<{
      status: "UNAVAILABLE";
      reason: "RECEIPT_INVALID" | "IDENTITY_REFERENCE_MISMATCH";
      receipt: null;
    }>;

export type XinmaiLifeCompanionFirstEncounterCommitResult =
  | Readonly<{
      status: "READY" | "ALREADY_ESTABLISHED";
      receipt: XinmaiLifeCompanionFirstEncounterReceipt;
      retryability: "NON_RETRYABLE";
    }>
  | Readonly<{
      status: "BLOCKED";
      reason:
        | "MUTATION_SAFE_WITHHELD"
        | "RECOGNIZED_IDENTITY_REQUIRED"
        | "IDENTITY_REFERENCE_MISMATCH"
        | "ENCOUNTER_OUTCOME_INVALID"
        | "PERSISTENCE_UNAVAILABLE"
        | "RECEIPT_CONFLICT";
      receipt: null;
      retryability: "RETRYABLE" | "NON_RETRYABLE";
    }>;

export type XinmaiLifeCompanionRelationshipState = Readonly<{
  status: "READY";
  sourceReferenceId: string;
  encounter: "FIRST_ENCOUNTER_COMPLETED";
  trust: "FIRST_EXCHANGE_ESTABLISHED";
  companionState: "MET";
  encounterReceiptReferenceId: string;
}>;

export type XinmaiLifeCompanionRelationshipRecoveryResult =
  | XinmaiLifeCompanionRelationshipState
  | Readonly<{
      status: "NOT_ESTABLISHED" | "BLOCKED";
      reason:
        | "FIRST_ENCOUNTER_NOT_COMPLETED"
        | "RECEIPT_INVALID"
        | "IDENTITY_REFERENCE_MISMATCH";
    }>;
