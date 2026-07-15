import type { LifeJourneyStage } from "./originalSelfLifeSchema";

export type LifeJourneyStageTriggerCode =
  | "LIFE_ORIGIN_ESTABLISHED"
  | "ORIGINAL_SELF_AWAKENED"
  | "REALITY_EXPERIENCE_ENTERED"
  | "REALITY_PRESSURE_ENCOUNTERED"
  | "LIFE_DIRECTION_CHOICE_COMPLETED"
  | "LIFE_IMPRINT_CRYSTALLIZED"
  | "LIFE_IMPRINT_ARCHIVED";

type LifeJourneyStageTriggerFor<
  TriggerCode extends LifeJourneyStageTriggerCode,
  SemanticStage extends LifeJourneyStage,
> = Readonly<{
  trigger: TriggerCode;
  semanticStage: SemanticStage;
  semanticRole: "LIFE_JOURNEY_STAGE_TRIGGER_EVIDENCE";
  explicit: true;
  requiresAuthorityDeclaration: true;
  noTransitionDecision: true;
  noAutomaticProgression: true;
}>;

export type LifeJourneyStageTrigger =
  | LifeJourneyStageTriggerFor<"LIFE_ORIGIN_ESTABLISHED", "ORIGIN">
  | LifeJourneyStageTriggerFor<"ORIGINAL_SELF_AWAKENED", "AWAKENING">
  | LifeJourneyStageTriggerFor<"REALITY_EXPERIENCE_ENTERED", "REALITY">
  | LifeJourneyStageTriggerFor<"REALITY_PRESSURE_ENCOUNTERED", "PRESSURE">
  | LifeJourneyStageTriggerFor<"LIFE_DIRECTION_CHOICE_COMPLETED", "CHOICE">
  | LifeJourneyStageTriggerFor<"LIFE_IMPRINT_CRYSTALLIZED", "CRYSTAL">
  | LifeJourneyStageTriggerFor<"LIFE_IMPRINT_ARCHIVED", "ARCHIVE">;

export type LifeJourneyStageTriggerBoundary = Readonly<{
  closedVocabulary: true;
  oneTriggerOneSemanticStage: true;
  requiresAuthorityDeclaration: true;
  noTransitionOrder: true;
  noStageCompletionInference: true;
  noAutomaticProgression: true;
  noRuntimeAdapter: true;
  noPersistence: true;
}>;
