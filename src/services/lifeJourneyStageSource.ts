import type { LifeJourneyStage } from "../types/originalSelfLifeSchema";

export type LifeJourneyStageSourceInput = Readonly<{
  source: "upper_schema_caller";
  lifeJourneyStage?: LifeJourneyStage | null;
}>;

export type LifeJourneyStageSourceProfile = Readonly<{
  source: "upper_schema_caller";
  semanticRole: "EXPLICIT_LIFE_JOURNEY_STAGE";
  currentStage: LifeJourneyStage;
  explicit: true;
  noRuntimeInference: true;
}>;

export type LifeJourneyStageSourceNotReadyReason =
  | "LIFE_JOURNEY_STAGE_MISSING"
  | "LIFE_JOURNEY_STAGE_INVALID";

export type LifeJourneyStageSourceResult =
  | Readonly<{
      status: "NOT_READY";
      source: "upper_schema_caller";
      reason: LifeJourneyStageSourceNotReadyReason;
      input: LifeJourneyStageSourceInput;
    }>
  | Readonly<{
      status: "READY";
      source: "upper_schema_caller";
      input: LifeJourneyStageSourceInput;
      stageSource: LifeJourneyStageSourceProfile;
    }>;

const LIFE_JOURNEY_STAGES: readonly LifeJourneyStage[] = Object.freeze([
  "ORIGIN",
  "AWAKENING",
  "REALITY",
  "PRESSURE",
  "CHOICE",
  "CRYSTAL",
  "ARCHIVE",
]);

export function resolveLifeJourneyStageSource(
  input: LifeJourneyStageSourceInput,
): LifeJourneyStageSourceResult {
  if (input.lifeJourneyStage == null) {
    return Object.freeze({
      status: "NOT_READY",
      source: "upper_schema_caller",
      reason: "LIFE_JOURNEY_STAGE_MISSING",
      input,
    });
  }

  if (!LIFE_JOURNEY_STAGES.includes(input.lifeJourneyStage)) {
    return Object.freeze({
      status: "NOT_READY",
      source: "upper_schema_caller",
      reason: "LIFE_JOURNEY_STAGE_INVALID",
      input,
    });
  }

  return Object.freeze({
    status: "READY",
    source: "upper_schema_caller",
    input,
    stageSource: Object.freeze({
      source: "upper_schema_caller",
      semanticRole: "EXPLICIT_LIFE_JOURNEY_STAGE",
      currentStage: input.lifeJourneyStage,
      explicit: true,
      noRuntimeInference: true,
    }),
  });
}
