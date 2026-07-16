import type {
  StarBeastAssetDefinition,
  StarBeastVisualLayer,
} from "./starBeastAssetArchitecture";
import type { StarBeastAssetPrototypeConsumption } from "./starBeastAssetPrototypeConsumption";
import type {
  StarBeastAssetVisualCompatibilityReference,
  StarBeastRendererContractReference,
} from "./starBeastAssetPrototypeReadiness";

export type StarBeastPrototypeVisualStateReference = Readonly<{
  referenceType: "STAR_BEAST_PROTOTYPE_VISUAL_STATE";
  referenceId: string;
  compatibilityReference: StarBeastAssetVisualCompatibilityReference;
}>;

export type StarBeastAssetPrototypeAdapterInput = Readonly<{
  assetDefinitionReference: StarBeastAssetDefinition | null;
  prototypeConsumptionReference: StarBeastAssetPrototypeConsumption | null;
  visualStateReference: StarBeastPrototypeVisualStateReference | null;
  rendererContractReference: StarBeastRendererContractReference | null;
}>;

type StarBeastPrototypeChannelSource = Readonly<{
  sourceAssetDefinitionReference: StarBeastAssetDefinition;
  sourceLayerReference: StarBeastVisualLayer;
  sourceVisualStateReference: StarBeastPrototypeVisualStateReference;
}>;

export type StarBeastPrototypeCoreBoneChannel =
  StarBeastPrototypeChannelSource &
    Readonly<{
      channelKind: "CORE_BONE_CHANNEL";
      semanticRole: "LIFE_STRUCTURE_EXPRESSION";
      structureDirectionReference: StarBeastAssetDefinition["coreSystem"];
    }>;

export type StarBeastPrototypeStarCoreChannel =
  StarBeastPrototypeChannelSource &
    Readonly<{
      channelKind: "STAR_CORE_CHANNEL";
      semanticRole: "ORIGINAL_SELF_SOURCE_EXPRESSION";
      corePositionReference: StarBeastAssetDefinition["coreSystem"];
      manifestationIntensityReference: StarBeastPrototypeVisualStateReference;
    }>;

export type StarBeastPrototypeStarPatternChannel =
  StarBeastPrototypeChannelSource &
    Readonly<{
      channelKind: "STAR_PATTERN_CHANNEL";
      semanticRole: "LIFE_TRAJECTORY_EXPRESSION";
      lifePathReference: StarBeastAssetDefinition["patternSystem"];
    }>;

export type StarBeastPrototypeLightBoundaryChannel =
  StarBeastPrototypeChannelSource &
    Readonly<{
      channelKind: "LIGHT_BOUNDARY_CHANNEL";
      semanticRole: "LIFE_PRESENCE_EXPRESSION";
      presenceBoundaryReference: StarBeastAssetDefinition["boundarySystem"];
    }>;

export type StarBeastPrototypeCosmicConsciousnessChannel =
  StarBeastPrototypeChannelSource &
    Readonly<{
      channelKind: "COSMIC_CONSCIOUSNESS_CHANNEL";
      semanticRole: "BREATH_FLOW_SPACE_EXPRESSION";
      consciousnessFlowReference: StarBeastAssetDefinition["consciousnessSystem"];
    }>;

export type StarBeastPrototypeCrystalImprintChannel =
  StarBeastPrototypeChannelSource &
    Readonly<{
      channelKind: "CRYSTAL_IMPRINT_CHANNEL";
      semanticRole: "LIFE_IMPRINT_EXPRESSION";
      crystalImprintReference: StarBeastAssetDefinition["crystalSystem"];
    }>;

export type StarBeastPrototypeExpressionChannel =
  | StarBeastPrototypeCoreBoneChannel
  | StarBeastPrototypeStarCoreChannel
  | StarBeastPrototypeStarPatternChannel
  | StarBeastPrototypeLightBoundaryChannel
  | StarBeastPrototypeCosmicConsciousnessChannel
  | StarBeastPrototypeCrystalImprintChannel;

export type StarBeastPrototypeExpressionChannels = readonly [
  StarBeastPrototypeCoreBoneChannel,
  StarBeastPrototypeStarCoreChannel,
  StarBeastPrototypeStarPatternChannel,
  StarBeastPrototypeLightBoundaryChannel,
  StarBeastPrototypeCosmicConsciousnessChannel,
  StarBeastPrototypeCrystalImprintChannel,
];

type StarBeastAssetPrototypeAdapterBoundary = Readonly<{
  referenceProjectionOnly: true;
  noAssetFactCopy: true;
  noRenderExecution: true;
  noCanvasConnection: true;
  noAnimationDevelopment: true;
  noLifeStateMutation: true;
  noStorageWrite: true;
}>;

export type StarBeastAssetPrototypeAdapterAvailable = Readonly<{
  status: "AVAILABLE";
  source: "star_beast_asset_prototype_adapter";
  input: StarBeastAssetPrototypeAdapterInput;
  sourceConsumptionReference: StarBeastAssetPrototypeConsumption;
  expressionChannels: StarBeastPrototypeExpressionChannels;
  channelCount: 6;
  adapterStatus: "AVAILABLE_FOR_FUTURE_PROTOTYPE_RENDERER";
  boundary: StarBeastAssetPrototypeAdapterBoundary;
}>;

export type StarBeastAssetPrototypeAdapterUnavailableReason =
  | "ASSET_DEFINITION_REFERENCE_REQUIRED"
  | "PROTOTYPE_CONSUMPTION_REFERENCE_REQUIRED"
  | "VISUAL_STATE_REFERENCE_REQUIRED"
  | "RENDERER_CONTRACT_REFERENCE_REQUIRED";

export type StarBeastAssetPrototypeAdapterUnavailable = Readonly<{
  status: "UNAVAILABLE";
  source: "star_beast_asset_prototype_adapter";
  reason: StarBeastAssetPrototypeAdapterUnavailableReason;
  input: StarBeastAssetPrototypeAdapterInput;
  noExpressionChannels: true;
  boundary: StarBeastAssetPrototypeAdapterBoundary;
}>;

export type StarBeastAssetPrototypeAdapterBlockedReason =
  | "ASSET_CONSUMPTION_REFERENCE_MISMATCH"
  | "VISUAL_STATE_COMPATIBILITY_REFERENCE_MISMATCH"
  | "RENDERER_CONTRACT_REFERENCE_MISMATCH"
  | "PROTOTYPE_CONSUMPTION_BOUNDARY_INVALID"
  | "ASSET_EXPRESSION_LAYER_MISSING";

export type StarBeastAssetPrototypeAdapterBlocked = Readonly<{
  status: "BLOCKED";
  source: "star_beast_asset_prototype_adapter";
  reason: StarBeastAssetPrototypeAdapterBlockedReason;
  input: StarBeastAssetPrototypeAdapterInput;
  missingChannelSources: readonly string[];
  noExpressionChannels: true;
  boundary: StarBeastAssetPrototypeAdapterBoundary;
}>;

export type StarBeastAssetPrototypeAdapterResult =
  | StarBeastAssetPrototypeAdapterAvailable
  | StarBeastAssetPrototypeAdapterUnavailable
  | StarBeastAssetPrototypeAdapterBlocked;
