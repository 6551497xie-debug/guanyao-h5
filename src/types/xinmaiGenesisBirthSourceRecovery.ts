import type { LaunchLifeSourceSession } from "./launchLifeSourceSession";
import type { RealUserGenesisVisualSourceContext } from "./realUserGenesisVisualSourceContext";

export type XinmaiGenesisBirthSourcePersistenceState =
  | "NOT_FOUND"
  | "PRIMARY_ONLY"
  | "ORIGIN_MIRROR_ONLY"
  | "MATCHED"
  | "CONFLICT"
  | "INVALID_PRIMARY"
  | "INVALID_ORIGIN_MIRROR";

export type XinmaiGenesisBirthSourcePersistenceRepresentations = Readonly<{
  status: XinmaiGenesisBirthSourcePersistenceState;
  primary: LaunchLifeSourceSession | null;
  originMirror: LaunchLifeSourceSession | null;
  primarySourceReferenceId: string | null;
  originMirrorSourceReferenceId: string | null;
  boundary: Readonly<{
    canonicalPrimary: true;
    originMirrorCorroborationOnly: true;
    conflictSafeWithheld: true;
    noBackfill: true;
    noMutation: true;
  }>;
}>;

export type XinmaiGenesisBirthSourceRecoveryIntent =
  | "AUTHORIZE_GENESIS_ROUTE"
  | "RESTORE_RETURNING_LIFE"
  | "RESTORE_RECOGNIZED_REALITY";

export type XinmaiGenesisBirthSourceRecoveryRequest = Readonly<{
  intent: XinmaiGenesisBirthSourceRecoveryIntent;
  expectedSourceReferenceId?: string | null;
  recognizedSourceReferenceId?: string | null;
}>;

export type XinmaiGenesisBirthSourceRecoveryReadyOutcome =
  | "ALREADY_ACTIVE"
  | "RECOVERED_EXACT_SOURCE"
  | "RECOVERED_LEGACY_SOURCE";

export type XinmaiGenesisBirthSourceRecoveryProof =
  | "PRIMARY"
  | "PRIMARY_AND_ORIGIN_MATCHED"
  | "LEGACY_RECOGNIZED_MATCH";

export type XinmaiGenesisBirthSourceRecoveryWithheldReason =
  | "ACTIVE_SOURCE_REFERENCE_CONFLICT"
  | "PERSISTED_SOURCE_CONFLICT"
  | "PRIMARY_SOURCE_INVALID"
  | "ORIGIN_MIRROR_INVALID"
  | "RECOGNIZED_PROOF_MISMATCH"
  | "VISUAL_SOURCE_RECOVERY_BLOCKED"
  | "STALE_EXPECTED_REFERENCE";

export type XinmaiGenesisBirthSourceRecoveryNotReadyReason =
  | "PERSISTED_SOURCE_NOT_FOUND"
  | "PRIMARY_SOURCE_REQUIRED";

export type XinmaiGenesisBirthSourceRecoveryResult =
  | Readonly<{
      status: "READY";
      outcome: XinmaiGenesisBirthSourceRecoveryReadyOutcome;
      sourceReferenceId: string;
      context: RealUserGenesisVisualSourceContext;
      lifeSourceSession: LaunchLifeSourceSession;
      proof: XinmaiGenesisBirthSourceRecoveryProof;
      persistence: XinmaiGenesisBirthSourcePersistenceRepresentations;
    }>
  | Readonly<{
      status: "SOURCE_NOT_READY";
      reason: XinmaiGenesisBirthSourceRecoveryNotReadyReason;
      sourceReferenceId: null;
      context: null;
      lifeSourceSession: null;
      proof: null;
      persistence: XinmaiGenesisBirthSourcePersistenceRepresentations;
    }>
  | Readonly<{
      status: "SAFE_WITHHELD";
      reason: XinmaiGenesisBirthSourceRecoveryWithheldReason;
      sourceReferenceId: string | null;
      context: null;
      lifeSourceSession: null;
      proof: null;
      persistence: XinmaiGenesisBirthSourcePersistenceRepresentations;
    }>;

export type XinmaiGenesisBirthSourceRecoveryBoundary = Readonly<{
  singleOwner: true;
  typedPersistenceOnly: true;
  noSourceEngineInvocation: true;
  noDefaultSource: true;
  noSilentPrecedence: true;
  noBackfill: true;
  noStorageWrite: true;
  noDom: true;
  noTimer: true;
  noRendererAuthority: true;
}>;
