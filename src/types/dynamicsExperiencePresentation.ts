export type DynamicsExperienceStage =
  | "PRESSURE"
  | "AWARENESS"
  | "ACTION"
  | "TRANSFORMATION"
  | "CRYSTAL";

export type DynamicsExperiencePrimaryFocus =
  | "PRESSURE_FIELD"
  | "PRESSURE_AND_BEAST"
  | "BEAST_AND_DIMENSION"
  | "DIMENSION_FLOW"
  | "CRYSTALLIZATION";

export type DynamicsExperienceNodeCopy = Readonly<{
  title: string;
  text: string;
  dimensionInsight?: string;
  dimensionUnderstanding?: string;
  actionText: string;
}>;

export type DynamicsExperienceState = Readonly<{
  stage: DynamicsExperienceStage;
  primaryFocus: DynamicsExperiencePrimaryFocus;
  loopLabel: string;
  headline: string;
  supportingCopy: string;
  pressureCopy: string;
  beastCopy: string;
  nodeCopy: DynamicsExperienceNodeCopy;
  crystalCopy: string;
}>;
