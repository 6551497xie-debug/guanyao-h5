import type { LifeArchetypeProfile } from "./originalSelfLifeSchema";
import type {
  StarbeastDerivationReady,
  TwentyEightMansion,
} from "./guanyaoStarbeast";

export type WesternSevenMansion = Extract<
  TwentyEightMansion,
  "奎" | "娄" | "胃" | "昴" | "毕" | "觜" | "参"
>;

export type GenLifeArchetypeProfile = Extract<
  LifeArchetypeProfile,
  { code: "GEN"; trigram: "艮" }
>;

export type StarBeastGenesisPrototypeExpressionLayerKind =
  | "MANSION_BONE"
  | "FOUR_SYMBOL_FORM"
  | "LIFE_FORCE_CORE"
  | "COSMIC_CONSCIOUSNESS"
  | "CRYSTAL_READINESS";

export type StarBeastGenesisPrototypeExpressionLayer = Readonly<{
  order: 1 | 2 | 3 | 4 | 5;
  kind: StarBeastGenesisPrototypeExpressionLayerKind;
  semanticRole:
    | "WESTERN_MANSION_LIFE_STRUCTURE"
    | "WHITE_TIGER_COSMIC_PRESENCE"
    | "GEN_STABLE_WATCHING_FORCE"
    | "STARDUST_BREATHING_AWARENESS"
    | "FUTURE_CRYSTAL_IMPRINT_ENTRY";
  expressionOnly: true;
  notAnimalAsset: true;
}>;

export type StarBeastGenesisPrototypeStage =
  | "COSMIC_FIELD"
  | "WESTERN_MANSION_ALIGNMENT"
  | "WHITE_TIGER_FORMATION"
  | "GEN_INFUSION"
  | "WHITE_TIGER_REVEAL";

export type StarBeastGenesisPrototypeStageDefinition = Readonly<{
  order: 1 | 2 | 3 | 4 | 5;
  stage: StarBeastGenesisPrototypeStage;
  expression:
    | "DEEP_SPACE_AWAITING_MANIFESTATION"
    | "SEVEN_MANSION_NODES_EMERGE"
    | "SEVEN_MANSIONS_FORM_LIFE_STRUCTURE"
    | "GEN_FORCE_STABILIZES_STAR_CORE"
    | "FIRST_GENERATION_STAR_BEAST_MANIFESTS";
  assetDefinitionOnly: true;
}>;

export type StarBeastGenesisPrototypeAssetInput = Readonly<{
  westernMansionReference: StarbeastDerivationReady;
  lifeArchetypeProfileReference: LifeArchetypeProfile;
}>;

export type StarBeastGenesisPrototypeAsset = Readonly<{
  semanticRole: "STAR_BEAST_GENESIS_PROTOTYPE_ASSET";
  protocolVersion: "RC-STAR-BEAST-GENESIS-PROTOTYPE-ASSET-P84";
  identity: "WHITE_TIGER_GENGENESIS";
  origin: "WESTERN_SEVEN_MANSIONS";
  symbolicForm: "WHITE_TIGER";
  lifeArchetype: "GEN";
  sourceReferences: Readonly<{
    westernMansionReference: StarbeastDerivationReady;
    lifeArchetypeProfileReference: GenLifeArchetypeProfile;
  }>;
  westernMansionBone: Readonly<{
    mansions: readonly WesternSevenMansion[];
    formation: "SEVEN_MANSION_LIFE_STRUCTURE";
    notAnimalOutline: true;
  }>;
  lifeForceCore: Readonly<{
    force: "GEN_STABLE_WATCHING_FORCE";
    mountainStability: true;
    boundaryLight: true;
    steadyCore: true;
  }>;
  expressionLayers: readonly StarBeastGenesisPrototypeExpressionLayer[];
  genesisStages: readonly StarBeastGenesisPrototypeStageDefinition[];
  sourceBoundary: Readonly<{
    mansionToFourSymbolIdentity: true;
    motherCodeToLifeArchetype: true;
    fourSymbolToLifeArchetype: false;
    independentSourcesMergeAtAsset: true;
    noFourSymbolInference: true;
  }>;
  boundary: Readonly<{
    assetDefinitionOnly: true;
    noAnimalAsset: true;
    noImageGeneration: true;
    noModelGeneration: true;
    noRendererInvocation: true;
    noCanvasInvocation: true;
    noUIIntegration: true;
    noRuntimeIntegration: true;
    noStorageWrite: true;
    noLifeStateMutation: true;
  }>;
}>;

export type StarBeastGenesisPrototypeAssetBlockedReason =
  | "WESTERN_MANSION_SOURCE_INVALID"
  | "WHITE_TIGER_SOURCE_INVALID"
  | "GEN_LIFE_ARCHETYPE_SOURCE_INVALID";

export type StarBeastGenesisPrototypeAssetResult =
  | Readonly<{
      status: "AVAILABLE";
      input: StarBeastGenesisPrototypeAssetInput;
      asset: StarBeastGenesisPrototypeAsset;
    }>
  | Readonly<{
      status: "BLOCKED";
      reason: StarBeastGenesisPrototypeAssetBlockedReason;
      input: StarBeastGenesisPrototypeAssetInput;
      noAsset: true;
    }>;
