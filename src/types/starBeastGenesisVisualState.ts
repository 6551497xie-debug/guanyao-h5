import type { StarBeastRendererContractReference } from "./starBeastAssetPrototypeReadiness";
import type { StarBeastGenesisPrototypeAsset } from "./starBeastGenesisPrototypeAsset";

export type GenesisVisualStage =
  | "COSMIC_FIELD"
  | "WESTERN_MANSION_ALIGNMENT"
  | "WHITE_TIGER_FORMATION"
  | "GEN_INFUSION"
  | "WHITE_TIGER_REVEAL";

export type StarBeastGenesisExpressionChannelReference = Readonly<{
  referenceType: "P80_EXPRESSION_CHANNEL_CONTRACT";
  referenceId: "STAR_BEAST_ASSET_PROTOTYPE_ADAPTER_CONTRACT";
}>;

export type StarBeastGenesisVisualState = Readonly<{
  semanticRole: "STAR_BEAST_GENESIS_VISUAL_STATE";
  stage: GenesisVisualStage;
  assetReference: StarBeastGenesisPrototypeAsset;
  expressionChannelReference: StarBeastGenesisExpressionChannelReference;
  rendererContractReference: StarBeastRendererContractReference;
  isolatedPrototypeScope: "ISOLATED_PROTOTYPE_ONLY";
  referenceOnly: true;
  noCoordinateCopy: true;
  noParticleParameterCopy: true;
  noAnimationParameterCopy: true;
  noLifeFactCopy: true;
}>;

export type StarBeastGenesisStageExpression = Readonly<{
  stage: GenesisVisualStage;
  field:
    | "DEEP_SPACE_WITH_FAINT_LIGHT"
    | "WESTERN_SEVEN_MANSION_ORDER"
    | "STAR_BONE_LIFE_STRUCTURE"
    | "GEN_STABLE_FORCE_FIELD"
    | "QUIET_WHITE_TIGER_PRESENCE";
  mansionVisibility: "HIDDEN" | "SEVEN_NODES" | "CONNECTED_STAR_BONE";
  symbolicFormVisibility: "HIDDEN" | "FORMING" | "REVEALED";
  lifeForcePresence: "DORMANT" | "STABLE_CORE" | "EMBODIED";
  beastPresence: "ABSENT" | "LIFE_STRUCTURE_ONLY" | "QUIET_WATCHING_PRESENCE";
  boundaryPresence: "FAINT" | "EMERGING" | "STABLE";
  noAnimalOutlineBeforeReveal: true;
  noCombatPose: true;
  noTrigramText: true;
  semanticExpressionOnly: true;
}>;

export type StarBeastGenesisRendererPrototypeInput = Readonly<{
  semanticRole: "STAR_BEAST_GENESIS_RENDERER_PROTOTYPE_INPUT";
  visualStateReference: StarBeastGenesisVisualState;
  stageExpressionReference: StarBeastGenesisStageExpression;
  rendererMode: "CANVAS_2D_ISOLATED_PROTOTYPE";
  isolatedPrototypeScope: "ISOLATED_PROTOTYPE_ONLY";
  noAssetCreation: true;
  noLifeJudgment: true;
  noLifeStateMutation: true;
  noAssetMutation: true;
  noRuntimeIntegration: true;
  noStorageWrite: true;
}>;

export type StarBeastGenesisRendererPrototypeResult =
  | Readonly<{
      status: "AVAILABLE";
      input: StarBeastGenesisRendererPrototypeInput;
    }>
  | Readonly<{
      status: "BLOCKED";
      reason:
        | "ISOLATED_SCOPE_REQUIRED"
        | "P84_ASSET_REFERENCE_INVALID"
        | "P80_EXPRESSION_CHANNEL_REFERENCE_INVALID"
        | "RENDERER_CONTRACT_REFERENCE_INVALID"
        | "GENESIS_STAGE_REFERENCE_INVALID";
      visualStateReference: StarBeastGenesisVisualState;
      noPrototypeInput: true;
    }>;
