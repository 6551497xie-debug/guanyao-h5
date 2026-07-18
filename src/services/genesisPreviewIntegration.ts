import type { GenesisRendererConsumerContract } from "../types/genesisRendererConsumerContract";
import type {
  GenesisPreviewIntegration,
  GenesisPreviewIntegrationBlockedReason,
  GenesisPreviewIntegrationBoundary,
  GenesisPreviewIntegrationInput,
  GenesisPreviewIntegrationResult,
  GenesisPreviewIntegrationUnavailableReason,
} from "../types/genesisPreviewIntegration";

export const GENESIS_PREVIEW_INTEGRATION_BOUNDARY: GenesisPreviewIntegrationBoundary =
  Object.freeze({
    isolatedPreviewOnly: true,
    devOnly: true,
    noProductionRoute: true,
    noProductionNavigation: true,
    noProductionBuildConsumption: true,
    noIdentity: true,
    noUserData: true,
    noEngineResult: true,
    noEngineInvocation: true,
    noStorage: true,
    noReality: true,
    noGravity: true,
    noChoice: true,
    noCrystal: true,
    noVisualStateMutation: true,
    noRuntimeStateMachineMutation: true,
    noTimelineMutation: true,
    noRendererSemanticMutation: true,
    noAutomaticLoop: true,
    completionRequired: true,
  });

const unavailable = (
  operation: "INITIALIZE" | "START" | "PAUSE" | "RESET" | "COMPLETE",
  reason: GenesisPreviewIntegrationUnavailableReason,
): GenesisPreviewIntegrationResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    operation,
    source: "genesis_preview_integration" as const,
    reason,
    integration: null,
    boundary: GENESIS_PREVIEW_INTEGRATION_BOUNDARY,
  });

const blocked = (
  operation: "INITIALIZE" | "START" | "PAUSE" | "RESET" | "COMPLETE",
  reason: GenesisPreviewIntegrationBlockedReason,
  integration: GenesisPreviewIntegration | null = null,
): GenesisPreviewIntegrationResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    operation,
    source: "genesis_preview_integration" as const,
    reason,
    integration,
    boundary: GENESIS_PREVIEW_INTEGRATION_BOUNDARY,
  });

const hasHarnessBoundary = (
  session: GenesisPreviewIntegrationInput["runtimeSession"],
): boolean =>
  session !== null &&
  session.harnessMode === "ISOLATED_GENESIS_PREVIEW" &&
  session.boundary.isolatedPreviewOnly === true &&
  session.boundary.devOnly === true &&
  session.boundary.noProductionRoute === true &&
  session.boundary.noProductionBuildConsumption === true &&
  session.boundary.noIdentity === true &&
  session.boundary.noUserData === true &&
  session.boundary.noEngineResult === true &&
  session.boundary.noEngineInvocation === true &&
  session.boundary.noStorageReference === true &&
  session.boundary.noReality === true &&
  session.boundary.noGravity === true &&
  session.boundary.noChoice === true &&
  session.boundary.noCrystal === true &&
  session.boundary.noVisualStateMutation === true &&
  session.boundary.noSceneModelMutation === true &&
  session.boundary.noRenderPlanMutation === true &&
  session.boundary.noRendererSemanticMutation === true &&
  session.boundary.noParallelStages === true &&
  session.boundary.noStageSkipping === true &&
  session.boundary.noAutomaticLoop === true &&
  session.boundary.completionRequired === true;

const hasRendererConsumerBoundary = (
  state: GenesisPreviewIntegrationInput["rendererConsumerState"],
): state is GenesisRendererConsumerContract =>
  state !== null &&
  state.runtimeStage === state.visualStateReference.stage &&
  state.runtimeStage === state.timelineState.stage &&
  Number.isFinite(state.transitionProgress) &&
  state.transitionProgress >= 0 &&
  state.transitionProgress <= 1;

const hasIntegrationBoundary = (
  integration: GenesisPreviewIntegration,
): boolean =>
  integration.previewMode === "ISOLATED_GENESIS_PREVIEW" &&
  integration.boundary.isolatedPreviewOnly === true &&
  integration.boundary.devOnly === true &&
  integration.boundary.noProductionRoute === true &&
  integration.boundary.noProductionNavigation === true &&
  integration.boundary.noProductionBuildConsumption === true &&
  integration.boundary.noIdentity === true &&
  integration.boundary.noUserData === true &&
  integration.boundary.noEngineResult === true &&
  integration.boundary.noEngineInvocation === true &&
  integration.boundary.noStorage === true &&
  integration.boundary.noReality === true &&
  integration.boundary.noGravity === true &&
  integration.boundary.noChoice === true &&
  integration.boundary.noCrystal === true &&
  integration.boundary.noVisualStateMutation === true &&
  integration.boundary.noRuntimeStateMachineMutation === true &&
  integration.boundary.noTimelineMutation === true &&
  integration.boundary.noRendererSemanticMutation === true &&
  integration.boundary.noAutomaticLoop === true &&
  integration.boundary.completionRequired === true &&
  hasHarnessBoundary(integration.runtimeSession) &&
  hasRendererConsumerBoundary(integration.rendererConsumerState) &&
  integration.runtimeSession.rendererConsumerReference ===
    integration.rendererConsumerState &&
  integration.runtimeSession.previewState.rendererConsumerInput ===
    integration.rendererConsumerState &&
  integration.runtimeSession.previewState.currentStage ===
    integration.rendererConsumerState.runtimeStage;

const createIntegration = (
  session: NonNullable<GenesisPreviewIntegrationInput["runtimeSession"]>,
  rendererConsumerState: GenesisRendererConsumerContract,
  lifecycle: GenesisPreviewIntegration["previewLifecycle"],
  initialRuntimeSession = session,
  initialRendererConsumerState = rendererConsumerState,
): GenesisPreviewIntegration =>
  Object.freeze({
    previewMode: "ISOLATED_GENESIS_PREVIEW" as const,
    runtimeSession: session,
    rendererConsumerState,
    previewLifecycle: lifecycle,
    initialRuntimeSession,
    initialRendererConsumerState,
    boundary: GENESIS_PREVIEW_INTEGRATION_BOUNDARY,
  });

const ready = (
  operation: "INITIALIZE" | "START" | "PAUSE" | "RESET" | "COMPLETE",
  integration: GenesisPreviewIntegration,
): GenesisPreviewIntegrationResult =>
  Object.freeze({
    status: "READY" as const,
    operation,
    source: "genesis_preview_integration" as const,
    integration,
    boundary: GENESIS_PREVIEW_INTEGRATION_BOUNDARY,
  });

export function initializeGenesisPreviewIntegration(
  input: GenesisPreviewIntegrationInput,
): GenesisPreviewIntegrationResult {
  if (input.runtimeSession === null) {
    return unavailable("INITIALIZE", "RUNTIME_SESSION_REQUIRED");
  }
  if (input.rendererConsumerState === null) {
    return unavailable("INITIALIZE", "RENDERER_CONSUMER_STATE_REQUIRED");
  }
  if (!hasHarnessBoundary(input.runtimeSession)) {
    return blocked("INITIALIZE", "HARNESS_BOUNDARY_INVALID");
  }
  if (!hasRendererConsumerBoundary(input.rendererConsumerState)) {
    return blocked("INITIALIZE", "RENDERER_CONSUMER_BOUNDARY_INVALID");
  }
  if (
    input.runtimeSession.rendererConsumerReference !==
      input.rendererConsumerState ||
    input.runtimeSession.previewState.rendererConsumerInput !==
      input.rendererConsumerState
  ) {
    return blocked("INITIALIZE", "HARNESS_CONSUMER_REFERENCE_MISMATCH");
  }
  return ready(
    "INITIALIZE",
    createIntegration(input.runtimeSession, input.rendererConsumerState, "INITIALIZED"),
  );
}

export function startGenesisPreviewIntegration(
  integration: GenesisPreviewIntegration,
): GenesisPreviewIntegrationResult {
  if (!hasIntegrationBoundary(integration)) {
    return blocked("START", "PREVIEW_BOUNDARY_INVALID", integration);
  }
  if (integration.previewLifecycle === "COMPLETED") {
    return blocked("START", "PREVIEW_ALREADY_COMPLETED", integration);
  }
  return ready(
    "START",
    createIntegration(
      integration.runtimeSession,
      integration.rendererConsumerState,
      "RUNNING",
      integration.initialRuntimeSession,
      integration.initialRendererConsumerState,
    ),
  );
}

export function pauseGenesisPreviewIntegration(
  integration: GenesisPreviewIntegration,
): GenesisPreviewIntegrationResult {
  if (!hasIntegrationBoundary(integration)) {
    return blocked("PAUSE", "PREVIEW_BOUNDARY_INVALID", integration);
  }
  if (integration.previewLifecycle !== "RUNNING") {
    return blocked("PAUSE", "PREVIEW_NOT_RUNNING", integration);
  }
  return ready(
    "PAUSE",
    createIntegration(
      integration.runtimeSession,
      integration.rendererConsumerState,
      "PAUSED",
      integration.initialRuntimeSession,
      integration.initialRendererConsumerState,
    ),
  );
}

export function resetGenesisPreviewIntegration(
  integration: GenesisPreviewIntegration,
): GenesisPreviewIntegrationResult {
  if (!hasIntegrationBoundary(integration)) {
    return blocked("RESET", "PREVIEW_BOUNDARY_INVALID", integration);
  }
  return ready(
    "RESET",
    createIntegration(
      integration.initialRuntimeSession,
      integration.initialRendererConsumerState,
      "RESET",
      integration.initialRuntimeSession,
      integration.initialRendererConsumerState,
    ),
  );
}

export function completeGenesisPreviewIntegration(
  integration: GenesisPreviewIntegration,
): GenesisPreviewIntegrationResult {
  if (!hasIntegrationBoundary(integration)) {
    return blocked("COMPLETE", "PREVIEW_BOUNDARY_INVALID", integration);
  }
  if (integration.runtimeSession.previewState.currentStage !== "COMPLETION") {
    return blocked("COMPLETE", "COMPLETION_STAGE_REQUIRED", integration);
  }
  if (integration.runtimeSession.previewState.lifecycle !== "COMPLETED") {
    return blocked("COMPLETE", "COMPLETION_HOLD_REQUIRED", integration);
  }
  return ready(
    "COMPLETE",
    createIntegration(
      integration.runtimeSession,
      integration.rendererConsumerState,
      "COMPLETED",
      integration.initialRuntimeSession,
      integration.initialRendererConsumerState,
    ),
  );
}
