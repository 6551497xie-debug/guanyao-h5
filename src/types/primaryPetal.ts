export type PrimaryPetalId = "body" | "emotion" | "thought" | "action" | "memory" | "goal";

export type PrimaryPetalProtocolDimension =
  | "body"
  | "emotion"
  | "thought"
  | "behavior"
  | "memory"
  | "motivation";

export type SelectedPressureSeedContext = {
  selectedPressureSeedId?: string;
  matrixCode?: string;
  surface?: string;
  shell?: string;
  category?: string;
  pressureField?: string;
  pressureNature?: string;
  scenarioDomain?: string;
  emotionalTone?: string;
  bodySignal?: string;
  thoughtPattern?: string;
  behaviorBlock?: string;
  memoryEcho?: string;
  motivationLoss?: string;
  tags?: string[];
  semanticTags?: string[];
};
