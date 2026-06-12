export type HourBranch =
  | "子时"
  | "丑时"
  | "寅时"
  | "卯时"
  | "辰时"
  | "巳时"
  | "午时"
  | "未时"
  | "申时"
  | "酉时"
  | "戌时"
  | "亥时";

export type LocationAnchorType =
  | "high_competition_city"
  | "family_dense_environment"
  | "unstable_migration"
  | "business_pressure_field"
  | "low_support_space"
  | "unknown";

export interface LocationAnchor {
  anchorId: string;
  anchorType: LocationAnchorType;
  label: string;
  pressureBiasTags: string[];
  fieldBiasModifier: string[];
  weightModifier: number;
}

export interface ChronoCoordinate {
  year: number;
  month: number;
  day: number;
  hourBranch: HourBranch;
  locationAnchor?: LocationAnchor;
  locationAnchorLabel?: string;
  existingUserState?: string;
}

export interface MotherCodeProfile {
  motherCodeId: string;
  motherCodeName: string;
  lowerTrigram?: Trigram;
  baseForce: string;
  defaultReactionPattern: string;
  pressureSensitiveZones: string[];
  defenseTendency: string;
  behaviorBias: string;
}

export type PressureIntensity = "low" | "medium" | "high" | "critical";

export type EmotionalIntensity = 1 | 2 | 3 | 4 | 5;

export type PressureDuration =
  | "just_happened"
  | "within_one_week"
  | "within_one_month"
  | "long_running";

export interface DynamicFieldModifiers {
  emotionalIntensity: EmotionalIntensity;
  pressureDuration: PressureDuration;
}

export interface PressureSeed {
  seedId: string;
  sceneText: string;
  pressureType: string;
  relationshipRole: string;
  triggerMoment: string;
  intensityLevel: PressureIntensity;
  costHint: string;
  fieldBias: string;
  locationTags?: string[];
}

export interface PressureField {
  fieldId: string;
  fieldName: string;
  activatedPressureZone: string;
  reactionTrigger: string;
  costDirection: string;
  riskWindow: string;
  upperFieldWeight: number;
  locationWeight?: number;
  locationFieldNote?: string;
  emotionalIntensity?: EmotionalIntensity;
  pressureDuration?: PressureDuration;
  dynamicWeight?: number;
  durationFieldNote?: string;
  intensityFieldNote?: string;
}

export interface HexagramField {
  hexagramId: string;
  hexagramName: string;
  behaviorFieldName: string;
  currentTrack: string;
  inertiaPattern: string;
  conflictStructure: string;
  costPattern: string;
  engineEntrySignal: string;
  pressureDepth?: string;
}

export type Trigram = "乾" | "坤" | "震" | "巽" | "坎" | "离" | "艮" | "兑";

export type HexagramLayerKey = "personality" | "system" | "lifecycle";

export type HexagramDominantLayer = HexagramLayerKey | "mixed";

export type ExternalEnvironmentType =
  | "qian_control_decision"
  | "kun_responsibility_support"
  | "zhen_change_push"
  | "xun_uncertainty_choice"
  | "kan_trapped_debt"
  | "li_expression_truth"
  | "gen_boundary_stop"
  | "dui_relationship_exchange";

export type PersonalityGravityValue = "P1" | "P2" | "P3" | "P4" | "P5" | "P6";

export interface UpperCodeFormation {
  pressureSeedLabel: string;
  lineImpact: {
    personalityDynamicsLine: number;
    systemMechanismLine: number;
    lifecycleStageLine: number;
  };
  dominantLine: HexagramDominantLayer;
  externalEnvironmentType: ExternalEnvironmentType;
  upperTrigram: Trigram;
  formationReason: string;
  upperCodeReading: string;
}

export interface HexagramLayerClassification {
  personalityDynamics: string;
  systemMechanism: string;
  lifecycleStage: string;
  dominantLayer: HexagramDominantLayer;
  externalEnvironmentType: ExternalEnvironmentType;
  externalEnvironmentName: string;
  upperTrigram: Trigram;
  externalPressureReading: string;
  classificationReason: string;
}

export interface CurrentHexagramProfile {
  lowerTrigram: Trigram;
  lowerSource: "mother_code";
  upperTrigram: Trigram;
  upperSource: "pressure_field";
  hexagramCode: string;
  hexagramName: string;
  hexagramTitle: string;
  upperCodeFormation: UpperCodeFormation;
  layerClassification: HexagramLayerClassification;
  gravityValue: PersonalityGravityValue;
  innerForceReading: string;
  externalPressureReading: string;
  interactionReading: string;
  currentSandboxReading: string;
}

export interface BehaviorEngineScan {
  scanId: string;
  primaryBreachCandidate: string;
  secondaryBreachCandidates: string[];
  oldReactionLoop: string;
  hiddenCost: string;
  antiInstinctOpportunity: string;
}

export type BreachType = "primary" | "secondary";

export interface BreachPoint {
  breachId: string;
  breachType: BreachType;
  breachTitle: string;
  oldReaction: string;
  triggerCondition: string;
  costIfUnchanged: string;
  antiInstinctDirection: string;
}

export interface YaoDevice {
  deviceId: string;
  deviceName: string;
  deviceType: string;
  deviceFunction: string;
  activationContext: string;
  counterPattern: string;
}

export interface RepairMethod {
  methodId: string;
  firstAction: string;
  forbiddenAction: string;
  executionWindow: string;
  fallbackMove: string;
  relapseWarning: string;
}

export interface PersonalityAsset {
  assetId: string;
  assetTitle: string;
  motherCodeSnapshot: MotherCodeProfile;
  pressureSeedSnapshot: PressureSeed;
  hexagramSnapshot: HexagramField;
  breachSnapshot: BreachPoint;
  deviceSnapshot: YaoDevice;
  methodSnapshot: RepairMethod;
  dynamicModifiersSnapshot?: DynamicFieldModifiers;
  assetSummary: string;
  futureDefenseHint: string;
  createdAt: string;
}

export interface CausalTraceEntry {
  step: string;
  reason: string;
}

export interface GuanyaoCausalPipelineResult {
  chronoCoordinate: ChronoCoordinate;
  motherCodeProfile: MotherCodeProfile;
  pressureSeed: PressureSeed;
  pressureField: PressureField;
  currentHexagramProfile: CurrentHexagramProfile;
  hexagramField: HexagramField;
  behaviorEngineScan: BehaviorEngineScan;
  breachPoints: BreachPoint[];
  selectedBreachPoint: BreachPoint;
  yaoDevice: YaoDevice;
  repairMethod: RepairMethod;
  personalityAsset: PersonalityAsset;
  dynamicModifiers: DynamicFieldModifiers;
  causalTrace: CausalTraceEntry[];
}
