import type {
  LifeArchetypeCode,
  LifeArchetypeProfile,
} from "./originalSelfLifeSchema";

export type StarBeastVisualLayerKind =
  | "CORE_BONE"
  | "STAR_CORE"
  | "STAR_PATTERN"
  | "LIGHT_BOUNDARY"
  | "COSMIC_CONSCIOUSNESS"
  | "CRYSTAL_IMPRINT";

export type StarBeastVisualLayer = Readonly<{
  order: 1 | 2 | 3 | 4 | 5 | 6;
  kind: StarBeastVisualLayerKind;
  semanticRole:
    | "LIFE_STRUCTURE"
    | "ORIGINAL_SELF_SOURCE"
    | "LIFE_TRAJECTORY"
    | "LIFE_PRESENCE"
    | "BREATH_FLOW_CONSCIOUSNESS"
    | "LIFE_EXPERIENCE_IMPRINT";
  expressionOnly: true;
  notLifeFact: true;
}>;

export type StarBeastAssetNormalizedAnchor = Readonly<{
  anchorId: string;
  x: number;
  y: number;
  normalized: true;
}>;

export type StarBeastAssetIdentityReference = Readonly<{
  referenceType: "STAR_BEAST_ASSET_IDENTITY";
  referenceId: string;
}>;

export type StarBeastAssetArchetypeReference = Readonly<{
  referenceType: "LIFE_ARCHETYPE_PROFILE";
  code: LifeArchetypeCode;
  sourceProfileReference: LifeArchetypeProfile;
}>;

export type StarBeastAssetDefinition = Readonly<{
  semanticRole: "STAR_BEAST_ASSET_DEFINITION";
  assetDefinitionId: string;
  identity: StarBeastAssetIdentityReference;
  archetype: StarBeastAssetArchetypeReference;
  visualLayers: readonly StarBeastVisualLayer[];
  coreSystem: Readonly<{
    structureDirection: "UPWARD_OUTWARD";
    boneLogic: "RADIANT_LOAD_BEARING_AXIS";
    starCoreAnchors: readonly StarBeastAssetNormalizedAnchor[];
  }>;
  patternSystem: Readonly<{
    patternLogic: "CENTER_TO_PERIPHERY_ASCENDING";
    trajectoryContinuity: "UNBROKEN";
  }>;
  boundarySystem: Readonly<{
    boundaryBehavior: "OPEN_EXPANSION";
    lightFlowDirection: "RADIAL_ASCENDING";
  }>;
  consciousnessSystem: Readonly<{
    stardustDistribution: "CORE_TO_PERIPHERY";
    consciousnessFlow: "RISING_CIRCULATION";
  }>;
  crystalSystem: Readonly<{
    crystalAnchors: readonly StarBeastAssetNormalizedAnchor[];
    imprintLogic: "ORBIT_PRIMARY_CORE";
    presenceSource: "CRYSTAL_REFERENCE_ONLY";
  }>;
  rendererConsumable: true;
  visualReferenceOnly: true;
  noFourSymbolInference: true;
  noLifeStateMutation: true;
  noImageGeneration: true;
  noModelGeneration: true;
  noRendererCreation: true;
}>;

export type StarBeastAssetArchitectureResult =
  | Readonly<{
      status: "AVAILABLE";
      sourceLifeArchetypeReference: LifeArchetypeProfile;
      assetDefinition: StarBeastAssetDefinition;
    }>
  | Readonly<{
      status: "NOT_AVAILABLE";
      reason: "ASSET_DEFINITION_NOT_ESTABLISHED";
      sourceLifeArchetypeReference: LifeArchetypeProfile;
    }>;
