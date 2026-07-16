import type { StarBeastGenesisVisualState } from "./starBeastGenesisVisualState";

export type StarBeastConsciousnessMode =
  | "DORMANT"
  | "ORDERING"
  | "EMERGING"
  | "AWAKENING"
  | "QUIET_PRESENCE";

export type StarBeastStarDustFlowReference = Readonly<{
  referenceType: "STAR_DUST_FLOW_EXPRESSION";
  expressionState: "SUSPENDED" | "SPARSE_CONTINUOUS_FLOW";
}>;

export type StarBeastCoreBreathReference = Readonly<{
  referenceType: "STAR_CORE_BREATH_EXPRESSION";
  expressionState: "DORMANT" | "FAINT_BREATH" | "SLOW_STABLE_BREATH";
}>;

export type StarBeastInnerLightReference = Readonly<{
  referenceType: "INNER_LIGHT_FLOW_EXPRESSION";
  expressionState: "DORMANT" | "STABLE_SETTLING_FLOW";
}>;

export type StarBeastPresenceReference = Readonly<{
  referenceType: "QUIET_PRESENCE_EXPRESSION";
  expressionState: "ABSENT" | "FORMING" | "STABLE" | "SILENT_PRESENCE";
}>;

export type StarBeastCosmicConsciousnessState = Readonly<{
  semanticRole: "STAR_BEAST_COSMIC_CONSCIOUSNESS_STATE";
  sourceGenesisVisualStateReference: StarBeastGenesisVisualState;
  consciousnessMode: StarBeastConsciousnessMode;
  starDustFlowReference: StarBeastStarDustFlowReference;
  coreBreathReference: StarBeastCoreBreathReference;
  innerLightReference: StarBeastInnerLightReference;
  presenceReference: StarBeastPresenceReference;
  isolatedPrototypeScope: "ISOLATED_PROTOTYPE_ONLY";
  expressionReferenceOnly: true;
  noLifeFactCopy: true;
  noAssetMutation: true;
  noLifeStateMutation: true;
  noMemoryCreation: true;
  noGrowthCreation: true;
}>;

export type StarBeastCosmicConsciousnessResult =
  | Readonly<{
      status: "AVAILABLE";
      state: StarBeastCosmicConsciousnessState;
    }>
  | Readonly<{
      status: "BLOCKED";
      reason:
        | "ISOLATED_SCOPE_REQUIRED"
        | "COSMIC_CONSCIOUSNESS_ASSET_LAYER_REQUIRED"
        | "GENESIS_STAGE_REFERENCE_INVALID";
      sourceGenesisVisualStateReference: StarBeastGenesisVisualState;
      noConsciousnessState: true;
    }>;
