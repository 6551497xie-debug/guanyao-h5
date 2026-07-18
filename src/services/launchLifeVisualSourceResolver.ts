import type { LaunchLifeSourceSession } from "../types/launchLifeSourceSession";
import type { LaunchLifeVisualSourceResolverBoundary } from "../types/launchLifeVisualSourceResolver";
import type { RealLifeVisualSourceAdapterResult } from "../types/realLifeVisualSourceAdapter";
import { mapLaunchLifeSourceSessionToVisualAdapterInput } from "./launchLifeSourceVisualAdapterInputBridge";
import { adaptRealLifeVisualSource } from "./realLifeVisualSourceAdapter";

export const LAUNCH_LIFE_VISUAL_SOURCE_RESOLVER_BOUNDARY:
  LaunchLifeVisualSourceResolverBoundary = Object.freeze({
    sessionToVisualSourceOnly: true,
    existingSessionOnly: true,
    delegatesInputMapping: true,
    delegatesVisualSourceAdapter: true,
    realUserSourceOnly: true,
    noFixtureFallback: true,
    noEngineInvocation: true,
    noRendererInvocation: true,
    noRuntimeMutation: true,
    noVisualCalibrationMutation: true,
    noUIMutation: true,
    noStorageWrite: true,
  });

export function resolveLaunchLifeVisualSource(
  session: LaunchLifeSourceSession,
): RealLifeVisualSourceAdapterResult {
  return adaptRealLifeVisualSource(
    mapLaunchLifeSourceSessionToVisualAdapterInput(session),
  );
}

export const LaunchLifeVisualSourceResolver = Object.freeze({
  resolve: resolveLaunchLifeVisualSource,
  boundary: LAUNCH_LIFE_VISUAL_SOURCE_RESOLVER_BOUNDARY,
});
