import type {
  GenesisRealityPresenceContinuityBridge,
  GenesisRealityPresenceContinuityBridgeBlockedReason,
  GenesisRealityPresenceContinuityBridgeBoundary,
  GenesisRealityPresenceContinuityBridgeInput,
  GenesisRealityPresenceContinuityBridgeResult,
  GenesisRealityPresenceContinuityContext,
} from "../types/genesisRealityPresenceContinuityBridge";

export const GENESIS_REALITY_PRESENCE_CONTINUITY_BRIDGE_BOUNDARY:
  GenesisRealityPresenceContinuityBridgeBoundary = Object.freeze({
    productionContinuityBridgeOnly: true,
    recognizedGenesisPresenceOnly: true,
    eligibleRealityEntryContextOnly: true,
    sourceReferenceContinuityRequired: true,
    immutableBridgeOnly: true,
    noEntityGeneration: true,
    noAssetGeneration: true,
    noPresenceMutation: true,
    noEngineInvocation: true,
    noRendererInvocation: true,
    noPressureMutation: true,
    noGravityMutation: true,
    noChoiceMutation: true,
    noCrystalMutation: true,
    noFixtureSource: true,
    noFallback: true,
    noStorage: true,
  });

let activeContext: GenesisRealityPresenceContinuityContext | null = null;

const unavailable = (
  input: GenesisRealityPresenceContinuityBridgeInput,
  reason: GenesisRealityPresenceContinuityBridgeBlockedReason,
): GenesisRealityPresenceContinuityBridgeResult => Object.freeze({
  status: "SOURCE_NOT_READY" as const,
  source: "genesis_reality_presence_continuity_bridge" as const,
  reason,
  bridge: null,
  input,
  boundary: GENESIS_REALITY_PRESENCE_CONTINUITY_BRIDGE_BOUNDARY,
});

const blocked = (
  input: GenesisRealityPresenceContinuityBridgeInput,
  reason: GenesisRealityPresenceContinuityBridgeBlockedReason,
): GenesisRealityPresenceContinuityBridgeResult => Object.freeze({
  status: "BLOCKED" as const,
  source: "genesis_reality_presence_continuity_bridge" as const,
  reason,
  bridge: null,
  input,
  boundary: GENESIS_REALITY_PRESENCE_CONTINUITY_BRIDGE_BOUNDARY,
});

const hasForbiddenReference = (referenceId: string): boolean =>
  ["fixture", "prototype", "default", "referenceonly"].some((marker) =>
    referenceId.toLowerCase().includes(marker),
  );

export function bridgeGenesisPresenceToReality(
  input: GenesisRealityPresenceContinuityBridgeInput,
): GenesisRealityPresenceContinuityBridgeResult {
  const presence = input.presenceRealization;
  if (presence === null) return unavailable(input, "GENESIS_PRESENCE_REQUIRED");
  if (presence.visualPresenceState !== "RECOGNIZED") {
    return blocked(input, "GENESIS_PRESENCE_NOT_RECOGNIZED");
  }
  if (
    presence.sourceProvenance !== "REAL_USER_SESSION" ||
    presence.presenceOrigin !== "EXISTING_IN_LIFE_COORDINATE" ||
    presence.appearanceMeaning !== "BECOMES_VISIBLE_NOT_GENERATED" ||
    presence.noEntityGeneration !== true ||
    presence.noAssetGeneration !== true ||
    presence.noPresenceSourceMutation !== true ||
    presence.noEngineInvocation !== true ||
    presence.noRendererParameterMutation !== true ||
    presence.noTimelineMutation !== true ||
    presence.noFallback !== true ||
    hasForbiddenReference(presence.sourceReferenceId)
  ) {
    return blocked(input, "PRESENCE_SOURCE_INVALID");
  }

  const entryContext = input.realityEntryContext;
  if (entryContext === null) {
    return unavailable(input, "REALITY_ENTRY_CONTEXT_REQUIRED");
  }
  if (
    entryContext.source !== "genesis_production_reality_entry_context" ||
    entryContext.sourceProvenance !== "REAL_USER_SESSION" ||
    entryContext.eligibility !== "ELIGIBLE" ||
    entryContext.recognitionRealitySession.phase !== "REALITY_ENTRY_ELIGIBLE" ||
    entryContext.recognitionRealitySession.recognitionConfirmed !== true ||
    entryContext.recognitionRealitySession.realityEntryConfirmed !== true ||
    hasForbiddenReference(entryContext.sourceReferenceId)
  ) {
    return blocked(input, "REALITY_ENTRY_CONTEXT_INVALID");
  }
  if (presence.sourceReferenceId !== entryContext.sourceReferenceId) {
    return blocked(input, "SOURCE_REFERENCE_MISMATCH");
  }

  const bridge: GenesisRealityPresenceContinuityBridge = Object.freeze({
    semanticRole: "GENESIS_REALITY_PRESENCE_CONTINUITY_BRIDGE" as const,
    sourceReferenceId: presence.sourceReferenceId,
    manifestationSourceReferenceId: presence.manifestationSourceReferenceId,
    presenceState: "RECOGNIZED" as const,
    continuityState: "CARRIED_TO_REALITY" as const,
    arrivalState: "REALITY_APPROACHING" as const,
    presenceOrigin: "EXISTING_IN_LIFE_COORDINATE" as const,
    appearanceMeaning: "RECOGNIZED_PRESENCE_CONTINUES" as const,
    sourceProvenance: "REAL_USER_SESSION" as const,
    genesisPresenceReference:
      "GENESIS_STAR_BEAST_PRESENCE_VISUAL_REALIZATION" as const,
    realityEntryReference:
      "GENESIS_PRODUCTION_REALITY_ENTRY_CONTEXT" as const,
    noEntityGeneration: true,
    noAssetGeneration: true,
    noPresenceMutation: true,
    noEngineInvocation: true,
    noRendererInvocation: true,
    noPressureMutation: true,
    noGravityMutation: true,
    noChoiceMutation: true,
    noCrystalMutation: true,
    noStorage: true,
  });
  return Object.freeze({
    status: "READY" as const,
    source: "genesis_reality_presence_continuity_bridge" as const,
    bridge,
    input,
    boundary: GENESIS_REALITY_PRESENCE_CONTINUITY_BRIDGE_BOUNDARY,
  });
}

export function activateGenesisRealityPresenceContinuityContext(
  input: GenesisRealityPresenceContinuityBridgeInput,
): GenesisRealityPresenceContinuityContext | null {
  const result = bridgeGenesisPresenceToReality(input);
  if (result.status !== "READY" || input.realityEntryContext === null) {
    return null;
  }
  activeContext = Object.freeze({
    schemaVersion:
      "GUANYAO_GENESIS_REALITY_PRESENCE_CONTINUITY_CONTEXT_V1" as const,
    source: "genesis_reality_presence_continuity_context" as const,
    sourceReferenceId: result.bridge.sourceReferenceId,
    bridge: result.bridge,
    realityEntryContext: input.realityEntryContext,
    boundary: GENESIS_REALITY_PRESENCE_CONTINUITY_BRIDGE_BOUNDARY,
  });
  return activeContext;
}

export const readGenesisRealityPresenceContinuityContext =
  (): GenesisRealityPresenceContinuityContext | null => activeContext;

export const clearGenesisRealityPresenceContinuityContext = (): void => {
  activeContext = null;
};
