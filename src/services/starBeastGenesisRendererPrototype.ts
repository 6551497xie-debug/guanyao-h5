import type {
  GenesisVisualStage,
  StarBeastGenesisRendererPrototypeInput,
  StarBeastGenesisRendererPrototypeResult,
  StarBeastGenesisStageExpression,
  StarBeastGenesisVisualState,
} from "../types/starBeastGenesisVisualState";

const stageExpression = (
  expression: StarBeastGenesisStageExpression,
): StarBeastGenesisStageExpression => Object.freeze(expression);

const GENESIS_STAGE_MAPPING: Readonly<
  Record<GenesisVisualStage, StarBeastGenesisStageExpression>
> = Object.freeze({
  COSMIC_FIELD: stageExpression({
    stage: "COSMIC_FIELD",
    field: "DEEP_SPACE_WITH_FAINT_LIGHT",
    mansionVisibility: "HIDDEN",
    symbolicFormVisibility: "HIDDEN",
    lifeForcePresence: "DORMANT",
    beastPresence: "ABSENT",
    boundaryPresence: "FAINT",
    noAnimalOutlineBeforeReveal: true,
    noCombatPose: true,
    noTrigramText: true,
    semanticExpressionOnly: true,
  }),
  WESTERN_MANSION_ALIGNMENT: stageExpression({
    stage: "WESTERN_MANSION_ALIGNMENT",
    field: "WESTERN_SEVEN_MANSION_ORDER",
    mansionVisibility: "SEVEN_NODES",
    symbolicFormVisibility: "HIDDEN",
    lifeForcePresence: "DORMANT",
    beastPresence: "ABSENT",
    boundaryPresence: "FAINT",
    noAnimalOutlineBeforeReveal: true,
    noCombatPose: true,
    noTrigramText: true,
    semanticExpressionOnly: true,
  }),
  WHITE_TIGER_FORMATION: stageExpression({
    stage: "WHITE_TIGER_FORMATION",
    field: "STAR_BONE_LIFE_STRUCTURE",
    mansionVisibility: "CONNECTED_STAR_BONE",
    symbolicFormVisibility: "FORMING",
    lifeForcePresence: "DORMANT",
    beastPresence: "LIFE_STRUCTURE_ONLY",
    boundaryPresence: "EMERGING",
    noAnimalOutlineBeforeReveal: true,
    noCombatPose: true,
    noTrigramText: true,
    semanticExpressionOnly: true,
  }),
  GEN_INFUSION: stageExpression({
    stage: "GEN_INFUSION",
    field: "GEN_STABLE_FORCE_FIELD",
    mansionVisibility: "CONNECTED_STAR_BONE",
    symbolicFormVisibility: "FORMING",
    lifeForcePresence: "STABLE_CORE",
    beastPresence: "LIFE_STRUCTURE_ONLY",
    boundaryPresence: "STABLE",
    noAnimalOutlineBeforeReveal: true,
    noCombatPose: true,
    noTrigramText: true,
    semanticExpressionOnly: true,
  }),
  WHITE_TIGER_REVEAL: stageExpression({
    stage: "WHITE_TIGER_REVEAL",
    field: "QUIET_WHITE_TIGER_PRESENCE",
    mansionVisibility: "CONNECTED_STAR_BONE",
    symbolicFormVisibility: "REVEALED",
    lifeForcePresence: "EMBODIED",
    beastPresence: "QUIET_WATCHING_PRESENCE",
    boundaryPresence: "STABLE",
    noAnimalOutlineBeforeReveal: true,
    noCombatPose: true,
    noTrigramText: true,
    semanticExpressionOnly: true,
  }),
});

const blocked = (
  visualStateReference: StarBeastGenesisVisualState,
  reason: Extract<
    StarBeastGenesisRendererPrototypeResult,
    { status: "BLOCKED" }
  >["reason"],
): StarBeastGenesisRendererPrototypeResult =>
  Object.freeze({
    status: "BLOCKED",
    reason,
    visualStateReference,
    noPrototypeInput: true,
  });

export function resolveStarBeastGenesisRendererPrototype(
  visualStateReference: StarBeastGenesisVisualState,
): StarBeastGenesisRendererPrototypeResult {
  if (visualStateReference.isolatedPrototypeScope !== "ISOLATED_PROTOTYPE_ONLY") {
    return blocked(visualStateReference, "ISOLATED_SCOPE_REQUIRED");
  }

  const assetReference = visualStateReference.assetReference;
  if (
    assetReference.semanticRole !== "STAR_BEAST_GENESIS_PROTOTYPE_ASSET" ||
    assetReference.protocolVersion !==
      "RC-STAR-BEAST-GENESIS-PROTOTYPE-ASSET-P84" ||
    assetReference.boundary.assetDefinitionOnly !== true
  ) {
    return blocked(visualStateReference, "P84_ASSET_REFERENCE_INVALID");
  }

  if (
    visualStateReference.expressionChannelReference.referenceType !==
      "P80_EXPRESSION_CHANNEL_CONTRACT" ||
    visualStateReference.expressionChannelReference.referenceId !==
      "STAR_BEAST_ASSET_PROTOTYPE_ADAPTER_CONTRACT"
  ) {
    return blocked(
      visualStateReference,
      "P80_EXPRESSION_CHANNEL_REFERENCE_INVALID",
    );
  }

  if (
    visualStateReference.rendererContractReference.referenceType !==
      "STAR_BEAST_RENDERER_CONTRACT" ||
    !visualStateReference.rendererContractReference.referenceId
  ) {
    return blocked(
      visualStateReference,
      "RENDERER_CONTRACT_REFERENCE_INVALID",
    );
  }

  const expression = GENESIS_STAGE_MAPPING[visualStateReference.stage];
  if (
    !expression ||
    !assetReference.genesisStages.some(
      ({ stage }) => stage === visualStateReference.stage,
    )
  ) {
    return blocked(visualStateReference, "GENESIS_STAGE_REFERENCE_INVALID");
  }

  const input: StarBeastGenesisRendererPrototypeInput = Object.freeze({
    semanticRole: "STAR_BEAST_GENESIS_RENDERER_PROTOTYPE_INPUT",
    visualStateReference,
    stageExpressionReference: expression,
    rendererMode: "CANVAS_2D_ISOLATED_PROTOTYPE",
    isolatedPrototypeScope: "ISOLATED_PROTOTYPE_ONLY",
    noAssetCreation: true,
    noLifeJudgment: true,
    noLifeStateMutation: true,
    noAssetMutation: true,
    noRuntimeIntegration: true,
    noStorageWrite: true,
  });

  return Object.freeze({ status: "AVAILABLE", input });
}

export const STAR_BEAST_GENESIS_STAGE_ORDER: readonly GenesisVisualStage[] =
  Object.freeze([
    "COSMIC_FIELD",
    "WESTERN_MANSION_ALIGNMENT",
    "WHITE_TIGER_FORMATION",
    "GEN_INFUSION",
    "WHITE_TIGER_REVEAL",
  ]);
