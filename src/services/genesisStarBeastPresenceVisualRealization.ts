import type {
  GenesisStarBeastPresenceVisualCopyKey,
  GenesisStarBeastPresenceVisualRealization,
  GenesisStarBeastPresenceVisualRealizationBlockedReason,
  GenesisStarBeastPresenceVisualRealizationBoundary,
  GenesisStarBeastPresenceVisualRealizationInput,
  GenesisStarBeastPresenceVisualRealizationResult,
  GenesisStarBeastPresenceVisualState,
} from "../types/genesisStarBeastPresenceVisualRealization";

const PRESENCE_BOUNDARY: GenesisStarBeastPresenceVisualRealizationBoundary = Object.freeze({
  presenceVisualRealizationOnly: true,
  existingManifestationBridgeOnly: true,
  existingRuntimeSessionOnly: true,
  explicitRecognitionPhaseOnly: true,
  noEntityGeneration: true,
  noAssetGeneration: true,
  noPresenceSourceMutation: true,
  noEngineInvocation: true,
  noRendererInvocation: true,
  noRendererParameterMutation: true,
  noTimelineMutation: true,
  noVisualAssetMutation: true,
  noFixtureSource: true,
  noFallback: true,
});

const blocked = (
  input: GenesisStarBeastPresenceVisualRealizationInput,
  reason: GenesisStarBeastPresenceVisualRealizationBlockedReason,
): GenesisStarBeastPresenceVisualRealizationResult => Object.freeze({
  status: "BLOCKED" as const,
  source: "genesis_starbeast_presence_visual_realization" as const,
  reason,
  realization: null,
  input,
  boundary: PRESENCE_BOUNDARY,
});

const copyKeyFor = (state: GenesisStarBeastPresenceVisualState): GenesisStarBeastPresenceVisualCopyKey =>
  state === "APPROACHING"
    ? "STAR_BEAST_APPROACHING"
    : state === "PRESENT"
      ? "STAR_BEAST_PRESENT"
      : state === "RECOGNIZED"
        ? "LIFE_PRESENCE_RECOGNIZED"
        : "LIFE_PRESENCE_DORMANT";

const stateFor = (
  runtimeStage: NonNullable<GenesisStarBeastPresenceVisualRealizationInput["runtimeSession"]>["currentStage"],
  recognitionPhase: GenesisStarBeastPresenceVisualRealizationInput["recognitionPhase"],
): GenesisStarBeastPresenceVisualState | null => {
  if (runtimeStage === "STAR_BEAST_REVEAL" && recognitionPhase === "NOT_REACHED") return "APPROACHING";
  if (runtimeStage === "COMPLETION" && recognitionPhase === "RECOGNITION_HOLD") return "PRESENT";
  if (runtimeStage === "COMPLETION" && recognitionPhase === "RECOGNIZED") return "RECOGNIZED";
  if (recognitionPhase !== "NOT_REACHED") return null;
  return runtimeStage === "COMPLETION" ? null : "DORMANT";
};

export function realizeGenesisStarBeastPresence(
  input: GenesisStarBeastPresenceVisualRealizationInput,
): GenesisStarBeastPresenceVisualRealizationResult {
  const runtime = input.runtimeSession;
  if (runtime === null) return blocked(input, "RUNTIME_SESSION_REQUIRED");
  if (
    runtime.sourceExperienceMode !== "REAL_USER_EXPERIENCE" ||
    runtime.sourceProvenance !== "REAL_USER_SESSION" ||
    runtime.sourceReferenceId.trim().length === 0 ||
    runtime.boundary.noPreviewFixture !== true ||
    runtime.boundary.noEngineInvocation !== true ||
    runtime.boundary.noRendererInvocation !== true
  ) return blocked(input, "RUNTIME_SESSION_INVALID");
  if (input.recognitionPhase === "RECOGNITION_HOLD" && runtime.currentStage !== "COMPLETION") return blocked(input, "RECOGNITION_PHASE_INVALID");
  if (input.recognitionPhase === "RECOGNIZED" && runtime.currentStage !== "COMPLETION") return blocked(input, "RECOGNITION_PHASE_INVALID");
  const bridge = input.lifeForceManifestationBridge;
  if (bridge === null) return blocked(input, "LIFE_FORCE_MANIFESTATION_BRIDGE_REQUIRED");
  if (
    bridge.semanticRole !== "GENESIS_LIFE_FORCE_MANIFESTATION_BRIDGE" ||
    bridge.sourceReferenceId !== runtime.sourceReferenceId ||
    bridge.provenance.sourceKind !== "REAL_ENGINE_RESULT" ||
    bridge.presenceState !== "DORMANT" ||
    bridge.sourceOnly !== true ||
    bridge.noPresenceTransition !== true ||
    bridge.noStarBeastGeneration !== true ||
    bridge.noFallback !== true
  ) return blocked(input, bridge.sourceReferenceId !== runtime.sourceReferenceId ? "SOURCE_REFERENCE_MISMATCH" : "LIFE_FORCE_MANIFESTATION_BRIDGE_INVALID");
  const visualPresenceState = stateFor(runtime.currentStage, input.recognitionPhase);
  if (visualPresenceState === null) return blocked(input, "PRESENCE_STAGE_INVALID");
  const realization: GenesisStarBeastPresenceVisualRealization = Object.freeze({
    semanticRole: "GENESIS_STAR_BEAST_PRESENCE_VISUAL_REALIZATION" as const,
    sourceReferenceId: runtime.sourceReferenceId,
    manifestationSourceReferenceId: bridge.provenance.manifestationSourceReferenceId,
    sourcePresenceState: "DORMANT" as const,
    visualPresenceState,
    copyKey: copyKeyFor(visualPresenceState),
    presenceOrigin: "EXISTING_IN_LIFE_COORDINATE" as const,
    appearanceMeaning: "BECOMES_VISIBLE_NOT_GENERATED" as const,
    manifestationBridge: bridge,
    sourceProvenance: "REAL_USER_SESSION" as const,
    noEntityGeneration: true,
    noAssetGeneration: true,
    noPresenceSourceMutation: true,
    noEngineInvocation: true,
    noRendererParameterMutation: true,
    noTimelineMutation: true,
    noFallback: true,
  });
  return Object.freeze({
    status: "READY" as const,
    source: "genesis_starbeast_presence_visual_realization" as const,
    realization,
    input,
    boundary: PRESENCE_BOUNDARY,
  });
}
