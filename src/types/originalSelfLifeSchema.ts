import type { Trigram } from "./guanyaoCausalEngine";
import type { LifeArchetypeState, OriginalSelfJourneyPhase } from "./originalSelf";

export type LifeJourneyStage =
  | "ORIGIN"
  | "AWAKENING"
  | "REALITY"
  | "PRESSURE"
  | "CHOICE"
  | "CRYSTAL"
  | "ARCHIVE";

export type LifeJourneySchemaPath = readonly [
  "ORIGIN",
  "AWAKENING",
  "REALITY",
  "PRESSURE",
  "CHOICE",
  "CRYSTAL",
  "ARCHIVE",
];

export type LifeArchetypeCode =
  | "QIAN"
  | "KUN"
  | "ZHEN"
  | "XUN"
  | "KAN"
  | "LI"
  | "GEN"
  | "DUI";

type LifeArchetypeProfileFor<
  Code extends LifeArchetypeCode,
  ArchetypeTrigram extends Trigram,
> = Readonly<{
  code: Code;
  trigram: ArchetypeTrigram;
  semanticRole: "ORIGINAL_LIFE_FORCE";
  nonFinalIdentity: true;
  notHexagram: true;
  notPersonalityLabel: true;
}>;

export type LifeArchetypeProfile =
  | LifeArchetypeProfileFor<"QIAN", "乾">
  | LifeArchetypeProfileFor<"KUN", "坤">
  | LifeArchetypeProfileFor<"ZHEN", "震">
  | LifeArchetypeProfileFor<"XUN", "巽">
  | LifeArchetypeProfileFor<"KAN", "坎">
  | LifeArchetypeProfileFor<"LI", "离">
  | LifeArchetypeProfileFor<"GEN", "艮">
  | LifeArchetypeProfileFor<"DUI", "兑">;

export type LifeJourneySchemaState = Readonly<{
  semanticPath: LifeJourneySchemaPath;
  currentStage: LifeJourneyStage;
}>;

export type OriginalSelfLifeSchemaMappingBoundary = Readonly<{
  explicitProfileRequired: true;
  explicitJourneyStageRequired: true;
  noFourSymbolInference: true;
  noFoundationMutation: true;
  noRuntimeProgression: true;
  noPersistence: true;
}>;

export type OriginalSelfLifeSchemaMappingInput = Readonly<{
  lifeArchetypeProfile: LifeArchetypeProfile;
  lifeJourneyStage: LifeJourneyStage;
  lifeArchetypeState: LifeArchetypeState;
  foundationJourneyPhase: OriginalSelfJourneyPhase;
}>;

export type OriginalSelfLifeSchemaMapping = Readonly<{
  source: "original_self_life_schema_mapping";
  schema: Readonly<{
    lifeArchetypeProfile: LifeArchetypeProfile;
    journey: LifeJourneySchemaState;
  }>;
  foundation: Readonly<{
    lifeArchetypeState: LifeArchetypeState;
    journeyPhase: OriginalSelfJourneyPhase;
  }>;
  boundary: OriginalSelfLifeSchemaMappingBoundary;
}>;
