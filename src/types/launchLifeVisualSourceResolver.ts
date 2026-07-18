export type LaunchLifeVisualSourceResolverBoundary = Readonly<{
  sessionToVisualSourceOnly: true;
  existingSessionOnly: true;
  delegatesInputMapping: true;
  delegatesVisualSourceAdapter: true;
  realUserSourceOnly: true;
  noFixtureFallback: true;
  noEngineInvocation: true;
  noRendererInvocation: true;
  noRuntimeMutation: true;
  noVisualCalibrationMutation: true;
  noUIMutation: true;
  noStorageWrite: true;
}>;
