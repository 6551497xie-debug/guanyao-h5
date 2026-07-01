/**
 * GUANYAO Expression Layer V1
 *
 * Product surface contract:
 * 1. Behavioral Persona Language
 * 2. Light Beast System
 * 3. Mother Card Output Format
 *
 * This layer is NOT expandable.
 * This layer does not modify Chrono, Geo, Generation, Inference, or UI state.
 */

export const EXPRESSION_LAYER_VERSION = "v1" as const;

export type BehavioralPersonaMode = "decision" | "action" | "relationship";

export type LightBeastState = "收缩" | "展开" | "稳定" | "波动";

export type MotherCardExpressionOutput = {
  behaviorProfile: Record<BehavioralPersonaMode, string>;
  lightBeastState: {
    state: LightBeastState;
    expression: string;
  };
  geoAnchor: string;
  chronoState: string;
};

export const BEHAVIORAL_PERSONA_LANGUAGE: Record<BehavioralPersonaMode, string> = Object.freeze({
  decision: "你在压力下更倾向于：先收敛再行动",
  action: "你会在观察完成后才启动关键决策",
  relationship: "你更倾向保持边界清晰，而非持续融合",
});

export const LIGHT_BEAST_STATE_MAP: Record<LightBeastState, string> = Object.freeze({
  收缩: "光点聚合",
  展开: "光场扩散",
  稳定: "光点均匀",
  波动: "光点闪烁",
});

export const MOTHER_CARD_OUTPUT_KEYS = Object.freeze([
  "behaviorProfile",
  "lightBeastState",
  "geoAnchor",
  "chronoState",
] as const);

export const EXPRESSION_LAYER_FORBIDDEN_EXPANSIONS = Object.freeze([
  "new_personality_frameworks",
  "new_symbolic_systems",
  "arbitrary_emotional_vocabulary",
  "engine_level_changes",
  "chrono_geo_engine_changes",
] as const);

export function buildMotherCardExpressionOutput(args: {
  geoAnchor: string;
  chronoState: string;
  lightBeastState: LightBeastState;
}): MotherCardExpressionOutput {
  return {
    behaviorProfile: BEHAVIORAL_PERSONA_LANGUAGE,
    lightBeastState: {
      state: args.lightBeastState,
      expression: LIGHT_BEAST_STATE_MAP[args.lightBeastState],
    },
    geoAnchor: args.geoAnchor,
    chronoState: args.chronoState,
  };
}

export function formatMotherCardExpressionLines(output: MotherCardExpressionOutput): string[] {
  return [
    `${output.chronoState} · ${output.geoAnchor}`,
    output.behaviorProfile.decision,
    output.behaviorProfile.action,
    output.behaviorProfile.relationship,
    output.lightBeastState.expression,
  ];
}
