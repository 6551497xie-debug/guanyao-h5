import type { LaunchLifeSourceSession } from "../types/launchLifeSourceSession";
import type {
  XinmaiGenesisBirthSourcePersistenceRepresentations,
  XinmaiGenesisBirthSourceRecoveryBoundary,
  XinmaiGenesisBirthSourceRecoveryNotReadyReason,
  XinmaiGenesisBirthSourceRecoveryProof,
  XinmaiGenesisBirthSourceRecoveryRequest,
  XinmaiGenesisBirthSourceRecoveryResult,
  XinmaiGenesisBirthSourceRecoveryWithheldReason,
} from "../types/xinmaiGenesisBirthSourceRecovery";
import { readRealUserGenesisVisualSourceContext } from "./realUserGenesisVisualSourceContext";
import {
  readPersistedLaunchLifeSourceRecoveryRepresentations,
  restorePersistedRealUserGenesisVisualSourceContext,
} from "./sessionService";

type XinmaiGenesisBirthSourceRecoveryUnavailableResult = Exclude<
  XinmaiGenesisBirthSourceRecoveryResult,
  { status: "READY" }
>;

export const XINMAI_GENESIS_BIRTH_SOURCE_RECOVERY_BOUNDARY:
  XinmaiGenesisBirthSourceRecoveryBoundary = Object.freeze({
    singleOwner: true,
    typedPersistenceOnly: true,
    noSourceEngineInvocation: true,
    noDefaultSource: true,
    noSilentPrecedence: true,
    noBackfill: true,
    noStorageWrite: true,
    noDom: true,
    noTimer: true,
    noRendererAuthority: true,
  });

const sourceNotReady = (
  reason: XinmaiGenesisBirthSourceRecoveryNotReadyReason,
  persistence: XinmaiGenesisBirthSourcePersistenceRepresentations,
): XinmaiGenesisBirthSourceRecoveryUnavailableResult =>
  Object.freeze({
    status: "SOURCE_NOT_READY" as const,
    reason,
    sourceReferenceId: null,
    context: null,
    lifeSourceSession: null,
    proof: null,
    persistence,
  });

const withheld = (
  reason: XinmaiGenesisBirthSourceRecoveryWithheldReason,
  persistence: XinmaiGenesisBirthSourcePersistenceRepresentations,
  sourceReferenceId: string | null = null,
): XinmaiGenesisBirthSourceRecoveryUnavailableResult =>
  Object.freeze({
    status: "SAFE_WITHHELD" as const,
    reason,
    sourceReferenceId,
    context: null,
    lifeSourceSession: null,
    proof: null,
    persistence,
  });

const normalizedReference = (value: string | null | undefined): string | null => {
  const normalized = value?.trim() ?? "";
  return normalized.length > 0 ? normalized : null;
};

const selectPersistedSource = (
  request: XinmaiGenesisBirthSourceRecoveryRequest,
  persistence: XinmaiGenesisBirthSourcePersistenceRepresentations,
):
  | Readonly<{
      status: "READY";
      session: LaunchLifeSourceSession;
      proof: XinmaiGenesisBirthSourceRecoveryProof;
    }>
  | XinmaiGenesisBirthSourceRecoveryUnavailableResult => {
  if (persistence.status === "NOT_FOUND") {
    return sourceNotReady("PERSISTED_SOURCE_NOT_FOUND", persistence);
  }
  if (persistence.status === "INVALID_PRIMARY") {
    return withheld("PRIMARY_SOURCE_INVALID", persistence);
  }
  if (persistence.status === "INVALID_ORIGIN_MIRROR") {
    return withheld("ORIGIN_MIRROR_INVALID", persistence);
  }
  if (persistence.status === "CONFLICT") {
    return withheld("PERSISTED_SOURCE_CONFLICT", persistence);
  }
  if (
    persistence.status === "MATCHED" &&
    persistence.primary !== null
  ) {
    return Object.freeze({
      status: "READY" as const,
      session: persistence.primary,
      proof: "PRIMARY_AND_ORIGIN_MATCHED" as const,
    });
  }
  if (
    persistence.status === "PRIMARY_ONLY" &&
    persistence.primary !== null
  ) {
    return Object.freeze({
      status: "READY" as const,
      session: persistence.primary,
      proof: "PRIMARY" as const,
    });
  }
  if (
    persistence.status === "ORIGIN_MIRROR_ONLY" &&
    persistence.originMirror !== null
  ) {
    if (request.intent === "AUTHORIZE_GENESIS_ROUTE") {
      return sourceNotReady("PRIMARY_SOURCE_REQUIRED", persistence);
    }
    const recognizedSourceReferenceId = normalizedReference(
      request.recognizedSourceReferenceId,
    );
    if (
      recognizedSourceReferenceId === null ||
      recognizedSourceReferenceId !==
        persistence.originMirror.sourceReferenceId
    ) {
      return withheld(
        "RECOGNIZED_PROOF_MISMATCH",
        persistence,
        persistence.originMirror.sourceReferenceId,
      );
    }
    return Object.freeze({
      status: "READY" as const,
      session: persistence.originMirror,
      proof: "LEGACY_RECOGNIZED_MATCH" as const,
    });
  }
  return withheld("VISUAL_SOURCE_RECOVERY_BLOCKED", persistence);
};

export function recoverXinmaiGenesisBirthSource(
  request: XinmaiGenesisBirthSourceRecoveryRequest,
): XinmaiGenesisBirthSourceRecoveryResult {
  const persistence =
    readPersistedLaunchLifeSourceRecoveryRepresentations();
  const selected = selectPersistedSource(request, persistence);
  if (selected.status !== "READY") return selected;

  const sourceReferenceId = selected.session.sourceReferenceId;
  const expectedSourceReferenceId = normalizedReference(
    request.expectedSourceReferenceId,
  );
  if (
    expectedSourceReferenceId !== null &&
    expectedSourceReferenceId !== sourceReferenceId
  ) {
    return withheld(
      "STALE_EXPECTED_REFERENCE",
      persistence,
      sourceReferenceId,
    );
  }

  const activeContext = readRealUserGenesisVisualSourceContext();
  if (
    activeContext !== null &&
    activeContext.sourceReferenceId !== sourceReferenceId
  ) {
    return withheld(
      "ACTIVE_SOURCE_REFERENCE_CONFLICT",
      persistence,
      sourceReferenceId,
    );
  }

  const context = restorePersistedRealUserGenesisVisualSourceContext(
    sourceReferenceId,
  );
  if (
    context === null ||
    context.sourceReferenceId !== sourceReferenceId ||
    context.lifeSourceSession.sourceReferenceId !== sourceReferenceId
  ) {
    return withheld(
      "VISUAL_SOURCE_RECOVERY_BLOCKED",
      persistence,
      sourceReferenceId,
    );
  }

  return Object.freeze({
    status: "READY" as const,
    outcome:
      activeContext !== null
        ? "ALREADY_ACTIVE" as const
        : selected.proof === "LEGACY_RECOGNIZED_MATCH"
          ? "RECOVERED_LEGACY_SOURCE" as const
          : "RECOVERED_EXACT_SOURCE" as const,
    sourceReferenceId,
    context,
    lifeSourceSession: context.lifeSourceSession,
    proof: selected.proof,
    persistence,
  });
}

export const XinmaiGenesisBirthSourceRecoveryController = Object.freeze({
  recover: recoverXinmaiGenesisBirthSource,
  boundary: XINMAI_GENESIS_BIRTH_SOURCE_RECOVERY_BOUNDARY,
});
