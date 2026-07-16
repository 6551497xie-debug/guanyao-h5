import type { LifeArchetypeProfile } from "../types/originalSelfLifeSchema";
import type {
  GenLifeArchetypeProfile,
  StarBeastGenesisPrototypeAsset,
  StarBeastGenesisPrototypeAssetBlockedReason,
  StarBeastGenesisPrototypeAssetInput,
  StarBeastGenesisPrototypeAssetResult,
  StarBeastGenesisPrototypeExpressionLayer,
  StarBeastGenesisPrototypeStageDefinition,
  WesternSevenMansion,
} from "../types/starBeastGenesisPrototypeAsset";

const WESTERN_SEVEN_MANSIONS: readonly WesternSevenMansion[] = Object.freeze([
  "奎",
  "娄",
  "胃",
  "昴",
  "毕",
  "觜",
  "参",
]);

const EXPRESSION_LAYERS: readonly StarBeastGenesisPrototypeExpressionLayer[] =
  Object.freeze([
    Object.freeze({
      order: 1,
      kind: "MANSION_BONE",
      semanticRole: "WESTERN_MANSION_LIFE_STRUCTURE",
      expressionOnly: true,
      notAnimalAsset: true,
    }),
    Object.freeze({
      order: 2,
      kind: "FOUR_SYMBOL_FORM",
      semanticRole: "WHITE_TIGER_COSMIC_PRESENCE",
      expressionOnly: true,
      notAnimalAsset: true,
    }),
    Object.freeze({
      order: 3,
      kind: "LIFE_FORCE_CORE",
      semanticRole: "GEN_STABLE_WATCHING_FORCE",
      expressionOnly: true,
      notAnimalAsset: true,
    }),
    Object.freeze({
      order: 4,
      kind: "COSMIC_CONSCIOUSNESS",
      semanticRole: "STARDUST_BREATHING_AWARENESS",
      expressionOnly: true,
      notAnimalAsset: true,
    }),
    Object.freeze({
      order: 5,
      kind: "CRYSTAL_READINESS",
      semanticRole: "FUTURE_CRYSTAL_IMPRINT_ENTRY",
      expressionOnly: true,
      notAnimalAsset: true,
    }),
  ]);

const GENESIS_STAGES: readonly StarBeastGenesisPrototypeStageDefinition[] =
  Object.freeze([
    Object.freeze({
      order: 1,
      stage: "COSMIC_FIELD",
      expression: "DEEP_SPACE_AWAITING_MANIFESTATION",
      assetDefinitionOnly: true,
    }),
    Object.freeze({
      order: 2,
      stage: "WESTERN_MANSION_ALIGNMENT",
      expression: "SEVEN_MANSION_NODES_EMERGE",
      assetDefinitionOnly: true,
    }),
    Object.freeze({
      order: 3,
      stage: "WHITE_TIGER_FORMATION",
      expression: "SEVEN_MANSIONS_FORM_LIFE_STRUCTURE",
      assetDefinitionOnly: true,
    }),
    Object.freeze({
      order: 4,
      stage: "GEN_INFUSION",
      expression: "GEN_FORCE_STABILIZES_STAR_CORE",
      assetDefinitionOnly: true,
    }),
    Object.freeze({
      order: 5,
      stage: "WHITE_TIGER_REVEAL",
      expression: "FIRST_GENERATION_STAR_BEAST_MANIFESTS",
      assetDefinitionOnly: true,
    }),
  ]);

const isGenLifeArchetypeProfile = (
  profile: LifeArchetypeProfile,
): profile is GenLifeArchetypeProfile =>
  profile.source === "mother_code_profile" &&
  profile.code === "GEN" &&
  profile.trigram === "艮";

const blocked = (
  input: StarBeastGenesisPrototypeAssetInput,
  reason: StarBeastGenesisPrototypeAssetBlockedReason,
): StarBeastGenesisPrototypeAssetResult =>
  Object.freeze({ status: "BLOCKED", reason, input, noAsset: true });

const createAsset = (
  input: StarBeastGenesisPrototypeAssetInput,
  lifeArchetypeProfile: GenLifeArchetypeProfile,
): StarBeastGenesisPrototypeAsset =>
  Object.freeze({
    semanticRole: "STAR_BEAST_GENESIS_PROTOTYPE_ASSET",
    protocolVersion: "RC-STAR-BEAST-GENESIS-PROTOTYPE-ASSET-P84",
    identity: "WHITE_TIGER_GENGENESIS",
    origin: "WESTERN_SEVEN_MANSIONS",
    symbolicForm: "WHITE_TIGER",
    lifeArchetype: "GEN",
    sourceReferences: Object.freeze({
      westernMansionReference: input.westernMansionReference,
      lifeArchetypeProfileReference: lifeArchetypeProfile,
    }),
    westernMansionBone: Object.freeze({
      mansions: WESTERN_SEVEN_MANSIONS,
      formation: "SEVEN_MANSION_LIFE_STRUCTURE",
      notAnimalOutline: true,
    }),
    lifeForceCore: Object.freeze({
      force: "GEN_STABLE_WATCHING_FORCE",
      mountainStability: true,
      boundaryLight: true,
      steadyCore: true,
    }),
    expressionLayers: EXPRESSION_LAYERS,
    genesisStages: GENESIS_STAGES,
    sourceBoundary: Object.freeze({
      mansionToFourSymbolIdentity: true,
      motherCodeToLifeArchetype: true,
      fourSymbolToLifeArchetype: false,
      independentSourcesMergeAtAsset: true,
      noFourSymbolInference: true,
    }),
    boundary: Object.freeze({
      assetDefinitionOnly: true,
      noAnimalAsset: true,
      noImageGeneration: true,
      noModelGeneration: true,
      noRendererInvocation: true,
      noCanvasInvocation: true,
      noUIIntegration: true,
      noRuntimeIntegration: true,
      noStorageWrite: true,
      noLifeStateMutation: true,
    }),
  });

export function resolveWhiteTigerGenGenesisPrototypeAsset(
  input: StarBeastGenesisPrototypeAssetInput,
): StarBeastGenesisPrototypeAssetResult {
  const westernMansion = input.westernMansionReference;
  if (
    westernMansion.direction !== "西" ||
    !WESTERN_SEVEN_MANSIONS.includes(
      westernMansion.mansion as WesternSevenMansion,
    )
  ) {
    return blocked(input, "WESTERN_MANSION_SOURCE_INVALID");
  }

  if (westernMansion.fourSymbol !== "白虎") {
    return blocked(input, "WHITE_TIGER_SOURCE_INVALID");
  }

  const lifeArchetypeProfile = input.lifeArchetypeProfileReference;
  if (!isGenLifeArchetypeProfile(lifeArchetypeProfile)) {
    return blocked(input, "GEN_LIFE_ARCHETYPE_SOURCE_INVALID");
  }

  return Object.freeze({
    status: "AVAILABLE",
    input,
    asset: createAsset(input, lifeArchetypeProfile),
  });
}
