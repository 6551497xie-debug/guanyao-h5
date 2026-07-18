import type { GenesisRuntimeStage } from "../types/genesisRuntimeStateMachine";
import type {
  GenesisSpaceUIInteractionAvailability,
  GenesisSpaceUIRuntime,
  GenesisSpaceUIRuntimeBlockedReason,
  GenesisSpaceUIRuntimeBoundary,
  GenesisSpaceUIRuntimeInput,
  GenesisSpaceUIRuntimeResult,
  GenesisSpaceUIRuntimeUnavailableReason,
  GenesisSpaceUIRuntimePresentationState,
  GenesisSpaceUIRecognitionEntryState,
} from "../types/genesisSpaceUIRuntime";

const RUNTIME_BOUNDARY: GenesisSpaceUIRuntimeBoundary = Object.freeze({
  runtimeReviewOnly: true,
  noReality: true,
  noStorage: true,
  noAccount: true,
  noEngineResult: true,
  noIdentity: true,
});

const UI_BOUNDARY = Object.freeze({
  genesisSpaceOnly: true,
  uiPresentationOnly: true,
  noIdentity: true,
  noEngineResult: true,
  noMotherCode: true,
  noLifeArchetype: true,
  noStorage: true,
  noAccount: true,
  noReality: true,
  noRuntimeRuleMutation: true,
  noEngineInvocation: true,
  noVisualStateMutation: true,
  timeDeliveryOnlyUserInput: true,
  recognitionEntryOnlyAfterCompletion: true,
} as const);

const unavailable = (
  input: GenesisSpaceUIRuntimeInput,
  reason: GenesisSpaceUIRuntimeUnavailableReason,
): GenesisSpaceUIRuntimeResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    source: "genesis_space_ui_runtime" as const,
    reason,
    uiRuntime: null,
    input,
    boundary: RUNTIME_BOUNDARY,
  });

const createRuntime = (
  input: GenesisSpaceUIRuntimeInput,
  values: Readonly<{
    runtimePresentationState: GenesisSpaceUIRuntimePresentationState;
    interactionAvailability: GenesisSpaceUIInteractionAvailability;
    recognitionEntryState: GenesisSpaceUIRecognitionEntryState;
  }>,
): GenesisSpaceUIRuntime =>
  Object.freeze({
    semanticRole: "GENESIS_SPACE_UI_RUNTIME" as const,
    currentGenesisStage: input.currentGenesisStage,
    runtimePresentationState: values.runtimePresentationState,
    interactionAvailability: values.interactionAvailability,
    visualConsumptionReference: "GENESIS_RUNTIME_AND_VISUAL_STATE" as const,
    recognitionEntryState: values.recognitionEntryState,
    timeDelivered: input.timeDelivered,
    boundary: UI_BOUNDARY,
  });

const blocked = (
  input: GenesisSpaceUIRuntimeInput,
  reason: GenesisSpaceUIRuntimeBlockedReason,
  runtime: GenesisSpaceUIRuntime,
): GenesisSpaceUIRuntimeResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    source: "genesis_space_ui_runtime" as const,
    reason,
    uiRuntime: runtime,
    input,
    boundary: RUNTIME_BOUNDARY,
  });

export function resolveGenesisSpaceUIRuntime(
  input: GenesisSpaceUIRuntimeInput,
): GenesisSpaceUIRuntimeResult {
  if (!input.currentGenesisStage) {
    return unavailable(input, "GENESIS_STAGE_REQUIRED");
  }
  if (!input.visualStateAvailable) {
    return unavailable(input, "VISUAL_STATE_REQUIRED");
  }

  if (input.recognitionEntered && input.currentGenesisStage !== "COMPLETION") {
    return blocked(
      input,
      "RECOGNITION_BEFORE_COMPLETION",
      createRuntime(input, {
        runtimePresentationState: "REVEALING",
        interactionAvailability: "NONE",
        recognitionEntryState: "RECOGNITION_ENTERED",
      }),
    );
  }

  if (input.previewLifecycle === "COMPLETED" && input.currentGenesisStage !== "COMPLETION") {
    return blocked(
      input,
      "COMPLETED_PREVIEW_NOT_AT_COMPLETION",
      createRuntime(input, {
        runtimePresentationState: "REVEALING",
        interactionAvailability: "NONE",
        recognitionEntryState: "NOT_READY",
      }),
    );
  }

  if (input.currentGenesisStage === "TIME_RESONANCE" && !input.timeDelivered) {
    return Object.freeze({
      status: "READY" as const,
      source: "genesis_space_ui_runtime" as const,
      uiRuntime: createRuntime(input, {
        runtimePresentationState: "TIME_RESONANCE_WAITING",
        interactionAvailability: "TIME_DELIVERY",
        recognitionEntryState: "NOT_READY",
      }),
      input,
      boundary: RUNTIME_BOUNDARY,
    });
  }

  if (input.currentGenesisStage === "COMPLETION") {
    return Object.freeze({
      status: "READY" as const,
      source: "genesis_space_ui_runtime" as const,
      uiRuntime: createRuntime(input, {
        runtimePresentationState: "GENESIS_COMPLETED",
        interactionAvailability: input.recognitionEntered
          ? "NONE"
          : "RECOGNITION_ENTRY",
        recognitionEntryState: input.recognitionEntered
          ? "RECOGNITION_ENTERED"
          : "RECOGNITION_READY",
      }),
      input,
      boundary: RUNTIME_BOUNDARY,
    });
  }

  const presentationState: GenesisSpaceUIRuntimePresentationState =
    input.currentGenesisStage === "MOON_ORIGIN"
      ? "ENTERING"
      : input.currentGenesisStage === "TIME_RESONANCE"
        ? "REVEALING"
        : "OBSERVING";

  return Object.freeze({
    status: "READY" as const,
    source: "genesis_space_ui_runtime" as const,
    uiRuntime: createRuntime(input, {
      runtimePresentationState: presentationState,
      interactionAvailability: "NONE",
      recognitionEntryState: "NOT_READY",
    }),
    input,
    boundary: RUNTIME_BOUNDARY,
  });
}
