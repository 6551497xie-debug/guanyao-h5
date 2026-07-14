import type {
  LifeJourneySchemaPath,
  OriginalSelfLifeSchemaMapping,
  OriginalSelfLifeSchemaMappingBoundary,
  OriginalSelfLifeSchemaMappingInput,
} from "../types/originalSelfLifeSchema";

export const LIFE_JOURNEY_SCHEMA_PATH: LifeJourneySchemaPath = Object.freeze([
  "ORIGIN",
  "AWAKENING",
  "REALITY",
  "PRESSURE",
  "CHOICE",
  "CRYSTAL",
  "ARCHIVE",
]);

const ORIGINAL_SELF_LIFE_SCHEMA_MAPPING_BOUNDARY: OriginalSelfLifeSchemaMappingBoundary =
  Object.freeze({
    explicitProfileRequired: true,
    explicitJourneyStageRequired: true,
    noFourSymbolInference: true,
    noFoundationMutation: true,
    noRuntimeProgression: true,
    noPersistence: true,
  });

export function mapOriginalSelfLifeSchemaToFoundation(
  input: OriginalSelfLifeSchemaMappingInput,
): OriginalSelfLifeSchemaMapping {
  return Object.freeze({
    source: "original_self_life_schema_mapping",
    schema: Object.freeze({
      lifeArchetypeProfile: input.lifeArchetypeProfile,
      journey: Object.freeze({
        semanticPath: LIFE_JOURNEY_SCHEMA_PATH,
        currentStage: input.lifeJourneyStage,
      }),
    }),
    foundation: Object.freeze({
      lifeArchetypeState: input.lifeArchetypeState,
      journeyPhase: input.foundationJourneyPhase,
    }),
    boundary: ORIGINAL_SELF_LIFE_SCHEMA_MAPPING_BOUNDARY,
  });
}
