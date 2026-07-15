import type {
  StarBeastVisualExpression,
  StarBeastVisualJourneyState,
  StarBeastVisualMappingInput,
  StarBeastVisualState,
} from "../types/starBeastVisualState";

type StarBeastVisualPhaseProjection = Readonly<{
  manifestationDepth: StarBeastVisualState["manifestationDepth"];
  energyFlowState: StarBeastVisualState["energyFlowState"];
  lightState: StarBeastVisualState["lightState"];
  starPatternState: StarBeastVisualState["starPatternState"];
  presenceState: StarBeastVisualState["presenceState"];
  expression: StarBeastVisualExpression;
}>;

const STAR_BEAST_VISUAL_PHASE_PROJECTIONS: Readonly<
  Record<StarBeastVisualJourneyState, StarBeastVisualPhaseProjection>
> = Object.freeze({
  ORIGIN: Object.freeze({
    manifestationDepth: "FOUNDATIONAL",
    energyFlowState: "RESTING",
    lightState: "SEED_LIGHT",
    starPatternState: "BASE_PATTERN",
    presenceState: "QUIETLY_PRESENT",
    expression: Object.freeze({
      intensity: 0.28,
      particleDensity: 0.18,
      lightFlowDirection: "INWARD",
      breathingRhythm: "SLOW",
      constellationComplexity: 0.2,
      expressionParametersOnly: true,
      notLifeFacts: true,
    }),
  }),
  PRESSURE: Object.freeze({
    manifestationDepth: "CONSTRAINED",
    energyFlowState: "RESTRICTED",
    lightState: "OCCLUDED",
    starPatternState: "COMPRESSED_PATTERN",
    presenceState: "WITHDRAWN_UNDER_PRESSURE",
    expression: Object.freeze({
      intensity: 0.46,
      particleDensity: 0.3,
      lightFlowDirection: "CONTAINED",
      breathingRhythm: "HELD",
      constellationComplexity: 0.32,
      expressionParametersOnly: true,
      notLifeFacts: true,
    }),
  }),
  AWARENESS: Object.freeze({
    manifestationDepth: "EMERGING",
    energyFlowState: "RECOVERING",
    lightState: "RETURNING",
    starPatternState: "RECONNECTING_PATTERN",
    presenceState: "RETURNING_TO_PRESENCE",
    expression: Object.freeze({
      intensity: 0.68,
      particleDensity: 0.52,
      lightFlowDirection: "OUTWARD",
      breathingRhythm: "RECOVERING",
      constellationComplexity: 0.58,
      expressionParametersOnly: true,
      notLifeFacts: true,
    }),
  }),
  CRYSTAL: Object.freeze({
    manifestationDepth: "IMPRINTED",
    energyFlowState: "INTEGRATED",
    lightState: "CRYSTALLIZED",
    starPatternState: "LIFE_TEXTURE_ADDED",
    presenceState: "INTEGRATED_PRESENCE",
    expression: Object.freeze({
      intensity: 0.88,
      particleDensity: 0.76,
      lightFlowDirection: "RADIAL",
      breathingRhythm: "RESONANT",
      constellationComplexity: 0.84,
      expressionParametersOnly: true,
      notLifeFacts: true,
    }),
  }),
});

export function mapStarBeastLifeStateToVisualState(
  input: StarBeastVisualMappingInput,
): StarBeastVisualState {
  const lifeStateReference = input.lifeStateReference;
  const projection =
    STAR_BEAST_VISUAL_PHASE_PROJECTIONS[lifeStateReference.journeyState];
  const crystalPresenceState: StarBeastVisualState["crystalPresenceState"] =
    input.crystalReference !== null
      ? "PRESENT"
      : lifeStateReference.journeyState === "CRYSTAL"
        ? "REFERENCE_PENDING"
        : "NOT_REFERENCED";

  return Object.freeze({
    semanticRole: "STAR_BEAST_VISUAL_STATE",
    identity: lifeStateReference.identityReference,
    archetype: lifeStateReference.archetypeReference,
    journeyState: lifeStateReference.journeyState,
    manifestationDepth: projection.manifestationDepth,
    energyFlowState: projection.energyFlowState,
    lightState: projection.lightState,
    starPatternState: projection.starPatternState,
    crystalPresenceState,
    presenceState: projection.presenceState,
    expression: projection.expression,
    sourceReferences: Object.freeze({
      lifeStateReference,
      memoryReference: input.memoryReference,
      crystalReference: input.crystalReference,
    }),
    visualMappingOnly: true,
    noLifeStateMutation: true,
    noRendering: true,
    noMemoryGrowthInference: true,
  });
}
