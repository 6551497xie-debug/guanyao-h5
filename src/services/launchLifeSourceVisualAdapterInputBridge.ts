import type { LaunchLifeSourceSession } from "../types/launchLifeSourceSession";
import type { LaunchLifeSourceVisualAdapterInputBridgeBoundary } from "../types/launchLifeSourceVisualAdapterInputBridge";
import type { RealLifeVisualSourceAdapterInput } from "../types/realLifeVisualSourceAdapter";

export const LAUNCH_LIFE_SOURCE_VISUAL_ADAPTER_INPUT_BRIDGE_BOUNDARY:
  LaunchLifeSourceVisualAdapterInputBridgeBoundary = Object.freeze({
    inputMappingOnly: true,
    existingSessionOnly: true,
    preservesSourceProvenance: true,
    preservesEngineResultReferences: true,
    noEngineInvocation: true,
    noVisualAdapterInvocation: true,
    noSceneModelAssembly: true,
    noRenderPlanAssembly: true,
    noProjectionAssembly: true,
    noRendererInvocation: true,
    noRuntimeMutation: true,
    noVisualMutation: true,
    noUIMutation: true,
    noStorageWrite: true,
  });

export function mapLaunchLifeSourceSessionToVisualAdapterInput(
  session: LaunchLifeSourceSession,
): RealLifeVisualSourceAdapterInput {
  return Object.freeze({
    sourceKind: session.sourceKind,
    sourceReferenceId: session.sourceReferenceId,
    starbeastDerivationResult: session.starbeastDerivationResult,
    motherCodeLandingResult: session.motherCodeLandingResult,
    selectedPressureSeedContext: null,
  });
}

export const LaunchLifeSourceVisualAdapterInputBridge = Object.freeze({
  map: mapLaunchLifeSourceSessionToVisualAdapterInput,
  boundary: LAUNCH_LIFE_SOURCE_VISUAL_ADAPTER_INPUT_BRIDGE_BOUNDARY,
});
