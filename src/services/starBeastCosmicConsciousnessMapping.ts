import type {
  StarBeastConsciousnessMode,
  StarBeastCoreBreathReference,
  StarBeastCosmicConsciousnessResult,
  StarBeastCosmicConsciousnessState,
  StarBeastInnerLightReference,
  StarBeastPresenceReference,
  StarBeastStarDustFlowReference,
} from "../types/starBeastCosmicConsciousness";
import type {
  GenesisVisualStage,
  StarBeastGenesisVisualState,
} from "../types/starBeastGenesisVisualState";

type CosmicConsciousnessStageExpression = Readonly<{
  consciousnessMode: StarBeastConsciousnessMode;
  starDustFlowReference: StarBeastStarDustFlowReference;
  coreBreathReference: StarBeastCoreBreathReference;
  innerLightReference: StarBeastInnerLightReference;
  presenceReference: StarBeastPresenceReference;
}>;

const expressionReference = <
  const T extends Readonly<Record<string, string>>,
>(
  reference: T,
): T => Object.freeze(reference);

const COSMIC_CONSCIOUSNESS_STAGE_MAPPING: Readonly<
  Record<GenesisVisualStage, CosmicConsciousnessStageExpression>
> = Object.freeze({
  COSMIC_FIELD: Object.freeze({
    consciousnessMode: "DORMANT",
    starDustFlowReference: expressionReference({
      referenceType: "STAR_DUST_FLOW_EXPRESSION",
      expressionState: "SUSPENDED",
    }),
    coreBreathReference: expressionReference({
      referenceType: "STAR_CORE_BREATH_EXPRESSION",
      expressionState: "DORMANT",
    }),
    innerLightReference: expressionReference({
      referenceType: "INNER_LIGHT_FLOW_EXPRESSION",
      expressionState: "DORMANT",
    }),
    presenceReference: expressionReference({
      referenceType: "QUIET_PRESENCE_EXPRESSION",
      expressionState: "ABSENT",
    }),
  }),
  WESTERN_MANSION_ALIGNMENT: Object.freeze({
    consciousnessMode: "ORDERING",
    starDustFlowReference: expressionReference({
      referenceType: "STAR_DUST_FLOW_EXPRESSION",
      expressionState: "SUSPENDED",
    }),
    coreBreathReference: expressionReference({
      referenceType: "STAR_CORE_BREATH_EXPRESSION",
      expressionState: "DORMANT",
    }),
    innerLightReference: expressionReference({
      referenceType: "INNER_LIGHT_FLOW_EXPRESSION",
      expressionState: "DORMANT",
    }),
    presenceReference: expressionReference({
      referenceType: "QUIET_PRESENCE_EXPRESSION",
      expressionState: "FORMING",
    }),
  }),
  WHITE_TIGER_FORMATION: Object.freeze({
    consciousnessMode: "EMERGING",
    starDustFlowReference: expressionReference({
      referenceType: "STAR_DUST_FLOW_EXPRESSION",
      expressionState: "SPARSE_CONTINUOUS_FLOW",
    }),
    coreBreathReference: expressionReference({
      referenceType: "STAR_CORE_BREATH_EXPRESSION",
      expressionState: "FAINT_BREATH",
    }),
    innerLightReference: expressionReference({
      referenceType: "INNER_LIGHT_FLOW_EXPRESSION",
      expressionState: "DORMANT",
    }),
    presenceReference: expressionReference({
      referenceType: "QUIET_PRESENCE_EXPRESSION",
      expressionState: "FORMING",
    }),
  }),
  GEN_INFUSION: Object.freeze({
    consciousnessMode: "AWAKENING",
    starDustFlowReference: expressionReference({
      referenceType: "STAR_DUST_FLOW_EXPRESSION",
      expressionState: "SPARSE_CONTINUOUS_FLOW",
    }),
    coreBreathReference: expressionReference({
      referenceType: "STAR_CORE_BREATH_EXPRESSION",
      expressionState: "SLOW_STABLE_BREATH",
    }),
    innerLightReference: expressionReference({
      referenceType: "INNER_LIGHT_FLOW_EXPRESSION",
      expressionState: "STABLE_SETTLING_FLOW",
    }),
    presenceReference: expressionReference({
      referenceType: "QUIET_PRESENCE_EXPRESSION",
      expressionState: "STABLE",
    }),
  }),
  WHITE_TIGER_REVEAL: Object.freeze({
    consciousnessMode: "QUIET_PRESENCE",
    starDustFlowReference: expressionReference({
      referenceType: "STAR_DUST_FLOW_EXPRESSION",
      expressionState: "SPARSE_CONTINUOUS_FLOW",
    }),
    coreBreathReference: expressionReference({
      referenceType: "STAR_CORE_BREATH_EXPRESSION",
      expressionState: "SLOW_STABLE_BREATH",
    }),
    innerLightReference: expressionReference({
      referenceType: "INNER_LIGHT_FLOW_EXPRESSION",
      expressionState: "STABLE_SETTLING_FLOW",
    }),
    presenceReference: expressionReference({
      referenceType: "QUIET_PRESENCE_EXPRESSION",
      expressionState: "SILENT_PRESENCE",
    }),
  }),
});

const blocked = (
  sourceGenesisVisualStateReference: StarBeastGenesisVisualState,
  reason: Extract<
    StarBeastCosmicConsciousnessResult,
    { status: "BLOCKED" }
  >["reason"],
): StarBeastCosmicConsciousnessResult =>
  Object.freeze({
    status: "BLOCKED",
    reason,
    sourceGenesisVisualStateReference,
    noConsciousnessState: true,
  });

export function resolveStarBeastCosmicConsciousness(
  sourceGenesisVisualStateReference: StarBeastGenesisVisualState,
): StarBeastCosmicConsciousnessResult {
  if (
    sourceGenesisVisualStateReference.isolatedPrototypeScope !==
    "ISOLATED_PROTOTYPE_ONLY"
  ) {
    return blocked(
      sourceGenesisVisualStateReference,
      "ISOLATED_SCOPE_REQUIRED",
    );
  }

  if (
    !sourceGenesisVisualStateReference.assetReference.expressionLayers.some(
      ({ kind }) => kind === "COSMIC_CONSCIOUSNESS",
    )
  ) {
    return blocked(
      sourceGenesisVisualStateReference,
      "COSMIC_CONSCIOUSNESS_ASSET_LAYER_REQUIRED",
    );
  }

  const stageExpression =
    COSMIC_CONSCIOUSNESS_STAGE_MAPPING[
      sourceGenesisVisualStateReference.stage
    ];
  if (!stageExpression) {
    return blocked(
      sourceGenesisVisualStateReference,
      "GENESIS_STAGE_REFERENCE_INVALID",
    );
  }

  const state: StarBeastCosmicConsciousnessState = Object.freeze({
    semanticRole: "STAR_BEAST_COSMIC_CONSCIOUSNESS_STATE",
    sourceGenesisVisualStateReference,
    ...stageExpression,
    isolatedPrototypeScope: "ISOLATED_PROTOTYPE_ONLY",
    expressionReferenceOnly: true,
    noLifeFactCopy: true,
    noAssetMutation: true,
    noLifeStateMutation: true,
    noMemoryCreation: true,
    noGrowthCreation: true,
  });

  return Object.freeze({ status: "AVAILABLE", state });
}

export const STAR_BEAST_COSMIC_CONSCIOUSNESS_STAGE_MAPPING =
  COSMIC_CONSCIOUSNESS_STAGE_MAPPING;
