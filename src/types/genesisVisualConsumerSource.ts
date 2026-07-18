import type { RealLifeVisualProjectionBundle } from "./realLifeVisualSourceAdapter";
import type { PersonalStarBeastRenderPlanAdapterResult } from "./personalStarBeastRenderPlan";

export type GenesisVisualConsumerSourceExperienceMode =
  | "REAL_USER_EXPERIENCE"
  | "FIXTURE_PREVIEW_ONLY";

export type GenesisVisualConsumerSourceProvenance =
  | "REAL_USER_SESSION"
  | "FIXTURE_CASE_A"
  | "FIXTURE_CASE_B";

export type GenesisVisualConsumerSource = Readonly<{
  sourceExperienceMode: GenesisVisualConsumerSourceExperienceMode;
  sourceProvenance: GenesisVisualConsumerSourceProvenance;
  sourceReferenceId: string;
  renderPlanResult: Extract<
    PersonalStarBeastRenderPlanAdapterResult,
    { status: "PLANNED" }
  >;
  projectionBundle: RealLifeVisualProjectionBundle;
}>;

export type GenesisVisualConsumerSourceBoundary = Readonly<{
  consumerSourceSelectionOnly: true;
  explicitExperienceModeRequired: true;
  realUserContextOnly: true;
  fixturePreviewOnly: true;
  noCrossModeFallback: true;
  noEngineInvocation: true;
  noRendererInvocation: true;
  rendererInputShapePreserved: true;
  noRenderPlanMutation: true;
  noProjectionMutation: true;
  noVisualCalibrationMutation: true;
  noTimelineMutation: true;
  noUIMutation: true;
  noStorageWrite: true;
  productionRendererActivation: false;
}>;

export type GenesisVisualConsumerSourceResult =
  | Readonly<{
      status: "READY";
      source: "genesis_visual_consumer_source";
      consumerSource: GenesisVisualConsumerSource;
      boundary: GenesisVisualConsumerSourceBoundary;
    }>
  | Readonly<{
      status: "SOURCE_NOT_READY";
      source: "genesis_visual_consumer_source";
      consumerSource: null;
      boundary: GenesisVisualConsumerSourceBoundary;
    }>;

export type GenesisVisualConsumerSourceResolutionInput = Readonly<{
  sourceExperienceMode: GenesisVisualConsumerSourceExperienceMode;
  fixtureCaseIndex: 0 | 1;
}>;
