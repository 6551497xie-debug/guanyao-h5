import type { LifeJourneyStage } from "./originalSelfLifeSchema";

export type LifeJourneyStageAuthority = "original_self_life_journey_orchestrator";

export type LifeJourneyStageAuthorityDeclaration = Readonly<{
  authority: LifeJourneyStageAuthority;
  sourceBoundary: "upper_schema";
  semanticRole: "EXPLICIT_LIFE_JOURNEY_STAGE_DECLARATION";
  lifeJourneyStage: LifeJourneyStage;
  explicit: true;
  noAutomaticProgression: true;
  noRuntimeInference: true;
  noFoundationPhaseInference: true;
}>;

export type LifeJourneyStageAuthorityBoundary = Readonly<{
  exclusiveAuthority: true;
  triggerRulesDeferred: true;
  noStageTransition: true;
  noRuntimeAdapter: true;
  noPersistence: true;
  noUIAuthority: true;
}>;
