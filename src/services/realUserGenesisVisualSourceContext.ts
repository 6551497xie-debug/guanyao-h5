import type { LaunchLifeSourceSession } from "../types/launchLifeSourceSession";
import type {
  RealUserGenesisVisualSourceContext,
  RealUserGenesisVisualSourceContextActivationResult,
  RealUserGenesisVisualSourceContextBlockedReason,
  RealUserGenesisVisualSourceContextBoundary,
  RealUserGenesisVisualSourceContextInput,
} from "../types/realUserGenesisVisualSourceContext";

export const REAL_USER_GENESIS_VISUAL_SOURCE_CONTEXT_BOUNDARY:
  RealUserGenesisVisualSourceContextBoundary = Object.freeze({
    inMemorySessionOnly: true,
    realUserSourceOnly: true,
    existingLifeSourceSessionOnly: true,
    existingVisualSourceOnly: true,
    noFixtureFallback: true,
    noEngineInvocation: true,
    noRendererInvocation: true,
    noGenesisRuntimeActivation: true,
    noNavigationMutation: true,
    noVisualCalibrationMutation: true,
    noUIMutation: true,
    noPersistentStorage: true,
  });

let activeContext: RealUserGenesisVisualSourceContext | null = null;

const blocked = (
  reason: RealUserGenesisVisualSourceContextBlockedReason,
): RealUserGenesisVisualSourceContextActivationResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    reason,
    context: null,
  });

export function activateRealUserGenesisVisualSourceContext(
  input: RealUserGenesisVisualSourceContextInput,
): RealUserGenesisVisualSourceContextActivationResult {
  const session: LaunchLifeSourceSession = input.lifeSourceSession;
  if (session.sourceKind !== "REAL_ENGINE_RESULT") {
    return blocked("SOURCE_KIND_NOT_REAL");
  }

  if (activeContext?.sourceReferenceId === session.sourceReferenceId) {
    return Object.freeze({
      status: "AVAILABLE" as const,
      context: activeContext,
    });
  }

  if (input.visualSourceAdapterInput.sourceReferenceId !== session.sourceReferenceId) {
    return blocked("SOURCE_REFERENCE_MISMATCH");
  }
  if (
    input.visualSource.provenance.sourceKind !== "REAL_ENGINE_RESULT" ||
    input.visualSource.provenance.sourceReferenceId !==
      session.sourceReferenceId
  ) {
    return blocked("VISUAL_PROVENANCE_MISMATCH");
  }

  activeContext = Object.freeze({
    schemaVersion: "GUANYAO_REAL_USER_GENESIS_VISUAL_SOURCE_CONTEXT_V1",
    source: "real_user_genesis_visual_source_context",
    sourceMode: "REAL_USER_EXPERIENCE",
    sourceReferenceId: session.sourceReferenceId,
    lifeSourceSession: session,
    visualSourceAdapterInput: input.visualSourceAdapterInput,
    visualSource: input.visualSource,
    boundary: REAL_USER_GENESIS_VISUAL_SOURCE_CONTEXT_BOUNDARY,
  });

  return Object.freeze({
    status: "AVAILABLE" as const,
    context: activeContext,
  });
}

export function readRealUserGenesisVisualSourceContext():
  RealUserGenesisVisualSourceContext | null {
  return activeContext;
}

export function clearRealUserGenesisVisualSourceContext(): void {
  activeContext = null;
}

export const RealUserGenesisVisualSourceContextService = Object.freeze({
  activate: activateRealUserGenesisVisualSourceContext,
  read: readRealUserGenesisVisualSourceContext,
  clear: clearRealUserGenesisVisualSourceContext,
  boundary: REAL_USER_GENESIS_VISUAL_SOURCE_CONTEXT_BOUNDARY,
});
