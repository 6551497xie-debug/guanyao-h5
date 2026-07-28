import {
  readGenesisProductionRealityEntryContext,
  restoreGenesisProductionRealityEntryContext,
} from "./genesisProductionRecognitionRealityEntry";
import {
  readPersistedGenesisPresenceVisualRealization,
  readPersistedGenesisVisualContinuity,
  readPersistedLaunchLifeSourceSession,
  restorePersistedRealUserGenesisVisualSourceContext,
} from "./sessionService";
import { readRealUserGenesisVisualSourceContext } from "./realUserGenesisVisualSourceContext";
import type { GenesisProductionRealityEntryContext } from "../types/genesisProductionRecognitionRealityEntry";
import type { GenesisStarBeastPresenceVisualRealization } from "../types/genesisStarBeastPresenceVisualRealization";
import type { LaunchLifeSourceSession } from "../types/launchLifeSourceSession";
import type { RealityProductionHostProps } from "../types/realityProductionRouteEntry";
import type { RealityEncounterIdentityReferences } from "../types/xinmaiRealityEncounterIntent";

export type RealityRecognizedIdentityRecoveryResult =
  | Readonly<{
      status: "READY";
      identityReferences: RealityEncounterIdentityReferences;
      realityEntryContext: GenesisProductionRealityEntryContext;
      lifeSourceSession: LaunchLifeSourceSession;
      visualContinuity: RealityProductionHostProps["visualContinuity"];
      presenceVisualRealization: GenesisStarBeastPresenceVisualRealization;
      reason: null;
    }>
  | Readonly<{
      status: "SOURCE_NOT_READY" | "BLOCKED";
      identityReferences: null;
      realityEntryContext: null;
      lifeSourceSession: null;
      visualContinuity: null;
      presenceVisualRealization: null;
      reason:
        | "RECOGNIZED_IDENTITY_NOT_AVAILABLE"
        | "VISUAL_CONTINUITY_NOT_AVAILABLE"
        | "PRESENCE_CONTINUITY_NOT_AVAILABLE"
        | "IDENTITY_REFERENCE_MISMATCH"
        | "IDENTITY_REFERENCE_INVALID"
        | "REALITY_ENTRY_CONTEXT_NOT_AVAILABLE";
    }>;

export type RealityRecognizedIdentityRecoveryInput = Readonly<{
  visualContinuity?: RealityProductionHostProps["visualContinuity"] | null;
  presenceVisualRealization?: GenesisStarBeastPresenceVisualRealization | null;
}>;

const unavailable = (
  status: "SOURCE_NOT_READY" | "BLOCKED",
  reason: Extract<
    RealityRecognizedIdentityRecoveryResult,
    { status: "SOURCE_NOT_READY" | "BLOCKED" }
  >["reason"],
): RealityRecognizedIdentityRecoveryResult =>
  Object.freeze({
    status,
    identityReferences: null,
    realityEntryContext: null,
    lifeSourceSession: null,
    visualContinuity: null,
    presenceVisualRealization: null,
    reason,
  });

export function recoverRealityRecognizedIdentity(
  input: RealityRecognizedIdentityRecoveryInput = {},
): RealityRecognizedIdentityRecoveryResult {
  const realUserContext =
    readRealUserGenesisVisualSourceContext() ??
    restorePersistedRealUserGenesisVisualSourceContext();
  const lifeSourceSession =
    realUserContext?.lifeSourceSession ??
    readPersistedLaunchLifeSourceSession();
  if (realUserContext === null || lifeSourceSession === null) {
    return unavailable(
      "SOURCE_NOT_READY",
      "RECOGNIZED_IDENTITY_NOT_AVAILABLE",
    );
  }

  const visualContinuity =
    input.visualContinuity ?? readPersistedGenesisVisualContinuity();
  if (visualContinuity === null) {
    return unavailable(
      "SOURCE_NOT_READY",
      "VISUAL_CONTINUITY_NOT_AVAILABLE",
    );
  }
  const presenceVisualRealization =
    input.presenceVisualRealization ??
    readPersistedGenesisPresenceVisualRealization();
  if (presenceVisualRealization === null) {
    return unavailable(
      "SOURCE_NOT_READY",
      "PRESENCE_CONTINUITY_NOT_AVAILABLE",
    );
  }

  const sourceReferenceId = visualContinuity.sourceReferenceId;
  const consumerSource =
    visualContinuity.consumerSourceResult.consumerSource;
  if (
    sourceReferenceId !== realUserContext.sourceReferenceId ||
    sourceReferenceId !== lifeSourceSession.sourceReferenceId ||
    sourceReferenceId !== presenceVisualRealization.sourceReferenceId ||
    sourceReferenceId !== consumerSource.sourceReferenceId
  ) {
    return unavailable("BLOCKED", "IDENTITY_REFERENCE_MISMATCH");
  }

  const starBeastIdentityReferenceId =
    consumerSource.projectionBundle.personalRevealProjection
      .identityReferenceId;
  const mansionCoordinateReferenceId =
    consumerSource.projectionBundle
      .twentyEightMansionCoordinateProjection.birthMansion
      .coordinateReferenceId;
  if (
    sourceReferenceId.trim().length === 0 ||
    starBeastIdentityReferenceId.trim().length === 0 ||
    mansionCoordinateReferenceId.trim().length === 0
  ) {
    return unavailable("BLOCKED", "IDENTITY_REFERENCE_INVALID");
  }

  const realityEntryContext =
    readGenesisProductionRealityEntryContext() ??
    restoreGenesisProductionRealityEntryContext(sourceReferenceId);
  if (
    realityEntryContext === null ||
    realityEntryContext.sourceReferenceId !== sourceReferenceId
  ) {
    return unavailable(
      "SOURCE_NOT_READY",
      "REALITY_ENTRY_CONTEXT_NOT_AVAILABLE",
    );
  }

  return Object.freeze({
    status: "READY" as const,
    identityReferences: Object.freeze({
      sourceReferenceId,
      starBeastIdentityReferenceId,
      mansionCoordinateReferenceId,
    }),
    realityEntryContext,
    lifeSourceSession,
    visualContinuity,
    presenceVisualRealization,
    reason: null,
  });
}

export const RealityRecognizedIdentityRecoveryAdapter = Object.freeze({
  recover: recoverRealityRecognizedIdentity,
});
