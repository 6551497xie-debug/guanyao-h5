import type {
  LifeArchetypeState,
  OriginalSelfFoundationGuardrails,
  OriginalSelfFoundationInput,
  OriginalSelfSemanticPath,
  OriginalSelfState,
  StarBeastSemanticBoundary,
  StarBeastState,
} from "../types/originalSelf";

export const ORIGINAL_SELF_SEMANTIC_PATH = Object.freeze([
  "ORIGINAL_SELF",
  "STAR_BEAST",
  "LIFE_ARCHETYPE",
  "HEXAGRAM",
  "YAO",
  "CRYSTAL",
] as const) satisfies OriginalSelfSemanticPath;

const STAR_BEAST_SEMANTIC_BOUNDARY = Object.freeze({
  originalSelfManifestation: true,
  notRole: true,
  notPet: true,
  notPersonalityLabel: true,
} as const) satisfies StarBeastSemanticBoundary;

const ORIGINAL_SELF_FOUNDATION_GUARDRAILS = Object.freeze({
  noMotherCodeMutation: true,
  noHexagramGeneration: true,
  noCrystalEngineMutation: true,
  noStorageWrite: true,
  noUIContract: true,
  noAIDependency: true,
} as const) satisfies OriginalSelfFoundationGuardrails;

export function adaptOriginalSelfFoundation(input: OriginalSelfFoundationInput): OriginalSelfState {
  const lifeArchetype = Object.freeze({
    source: "starBeast",
    semanticRole: "LIFE_ARCHETYPE",
    fourSymbol: input.starBeast.fourSymbol,
    stableOrigin: true,
    nonFinalIdentity: true,
  } as const) satisfies LifeArchetypeState;

  const starBeast = Object.freeze({
    source: "starbeast_derivation",
    semanticRole: "ORIGINAL_SELF_LIFE_MANIFESTATION",
    fourSymbol: input.starBeast.fourSymbol,
    mansion: input.starBeast.mansion,
    lifeArchetype,
    boundary: STAR_BEAST_SEMANTIC_BOUNDARY,
  } as const) satisfies StarBeastState;

  const journey = Object.freeze({
    source: "lifeArchetype",
    semanticPath: ORIGINAL_SELF_SEMANTIC_PATH,
    currentPhase: input.currentPhase,
    lifeArchetype,
    hexagram: input.hexagram,
    yao: input.yao,
    crystal: input.crystal,
  } as const);

  return Object.freeze({
    semanticRole: "ORIGINAL_SELF",
    starBeast,
    journey,
    guardrails: ORIGINAL_SELF_FOUNDATION_GUARDRAILS,
  });
}
