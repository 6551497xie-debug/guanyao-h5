export type LaunchLifeSourceVisualAdapterInputBridgeBoundary = Readonly<{
  inputMappingOnly: true;
  existingSessionOnly: true;
  preservesSourceProvenance: true;
  preservesEngineResultReferences: true;
  noEngineInvocation: true;
  noVisualAdapterInvocation: true;
  noSceneModelAssembly: true;
  noRenderPlanAssembly: true;
  noProjectionAssembly: true;
  noRendererInvocation: true;
  noRuntimeMutation: true;
  noVisualMutation: true;
  noUIMutation: true;
  noStorageWrite: true;
}>;
