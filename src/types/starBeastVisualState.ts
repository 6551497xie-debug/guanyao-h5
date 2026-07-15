export type StarBeastVisualReferenceKind =
  | "STAR_BEAST_IDENTITY"
  | "LIFE_ARCHETYPE"
  | "STAR_BEAST_MEMORY"
  | "CRYSTAL";

export type StarBeastVisualReference<
  Kind extends StarBeastVisualReferenceKind,
> = Readonly<{
  referenceType: Kind;
  referenceId: string;
}>;

export type StarBeastIdentityReference =
  StarBeastVisualReference<"STAR_BEAST_IDENTITY">;

export type StarBeastArchetypeReference =
  StarBeastVisualReference<"LIFE_ARCHETYPE">;

export type StarBeastMemoryVisualReference =
  StarBeastVisualReference<"STAR_BEAST_MEMORY">;

export type StarBeastCrystalVisualReference =
  StarBeastVisualReference<"CRYSTAL">;

export type StarBeastVisualJourneyState =
  | "ORIGIN"
  | "PRESSURE"
  | "AWARENESS"
  | "CRYSTAL";

export type StarBeastLifeStateReference = Readonly<{
  referenceType: "STAR_BEAST_LIFE_STATE";
  referenceId: string;
  identityReference: StarBeastIdentityReference;
  archetypeReference: StarBeastArchetypeReference;
  journeyState: StarBeastVisualJourneyState;
}>;

export type StarBeastVisualMappingInput = Readonly<{
  lifeStateReference: StarBeastLifeStateReference;
  memoryReference: StarBeastMemoryVisualReference | null;
  crystalReference: StarBeastCrystalVisualReference | null;
}>;

export type StarBeastVisualExpression = Readonly<{
  intensity: number;
  particleDensity: number;
  lightFlowDirection: "INWARD" | "CONTAINED" | "OUTWARD" | "RADIAL";
  breathingRhythm: "SLOW" | "HELD" | "RECOVERING" | "RESONANT";
  constellationComplexity: number;
  expressionParametersOnly: true;
  notLifeFacts: true;
}>;

export type StarBeastVisualState = Readonly<{
  semanticRole: "STAR_BEAST_VISUAL_STATE";
  identity: StarBeastIdentityReference;
  archetype: StarBeastArchetypeReference;
  journeyState: StarBeastVisualJourneyState;
  manifestationDepth:
    | "FOUNDATIONAL"
    | "CONSTRAINED"
    | "EMERGING"
    | "IMPRINTED";
  energyFlowState: "RESTING" | "RESTRICTED" | "RECOVERING" | "INTEGRATED";
  lightState: "SEED_LIGHT" | "OCCLUDED" | "RETURNING" | "CRYSTALLIZED";
  starPatternState:
    | "BASE_PATTERN"
    | "COMPRESSED_PATTERN"
    | "RECONNECTING_PATTERN"
    | "LIFE_TEXTURE_ADDED";
  crystalPresenceState: "NOT_REFERENCED" | "REFERENCE_PENDING" | "PRESENT";
  presenceState:
    | "QUIETLY_PRESENT"
    | "WITHDRAWN_UNDER_PRESSURE"
    | "RETURNING_TO_PRESENCE"
    | "INTEGRATED_PRESENCE";
  expression: StarBeastVisualExpression;
  sourceReferences: Readonly<{
    lifeStateReference: StarBeastLifeStateReference;
    memoryReference: StarBeastMemoryVisualReference | null;
    crystalReference: StarBeastCrystalVisualReference | null;
  }>;
  visualMappingOnly: true;
  noLifeStateMutation: true;
  noRendering: true;
  noMemoryGrowthInference: true;
}>;
