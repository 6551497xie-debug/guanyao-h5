export type XinmaiChoiceActionRouteRuntimeMode =
  | "ENABLED"
  | "SAFE_WITHHELD";

const resolveXinmaiChoiceActionRouteRuntimeMode =
  (): XinmaiChoiceActionRouteRuntimeMode => "ENABLED";

export const XINMAI_CHOICE_ACTION_ROUTE_RUNTIME_MODE =
  resolveXinmaiChoiceActionRouteRuntimeMode();

export const canCreateXinmaiChoiceFromActionRoute = (): boolean =>
  XINMAI_CHOICE_ACTION_ROUTE_RUNTIME_MODE === "ENABLED";

export const XinmaiChoiceActionRouteRuntimePolicy =
  Object.freeze({
    mode: XINMAI_CHOICE_ACTION_ROUTE_RUNTIME_MODE,
    canCreateNewChoice:
      canCreateXinmaiChoiceFromActionRoute,
    existingGrowthRemainsRecoverable: true as const,
    noLegacyPresentationFallback: true as const,
    noLegacyMutationFallback: true as const,
  });
