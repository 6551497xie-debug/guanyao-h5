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

export type MotherCodeId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type XiantianNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type Wuxing = "金" | "木" | "水" | "火" | "土";
export type NumericProtocolRole = "field" | "change";

export type EightDivisionFieldMapping = {
  remainder: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  display: string;
  trigram: Trigram;
  trigramSymbol: string;
  trigramImage: string;
  wuxing: Wuxing;
  protocolRole: "field";
  protocolName: "卦以八除";
  userFacingMeaning: string;
};

export type SixDivisionChangeMapping = {
  remainder: 0 | 1 | 2 | 3 | 4 | 5;
  display: string;
  changeNode: 1 | 2 | 3 | 4 | 5 | 6;
  dimensionKey: "body" | "emotion" | "thought" | "behavior" | "memory" | "motivation";
  dimensionName: "身体空间" | "情绪空间" | "思想空间" | "行为空间" | "记忆空间" | "动机空间";
  protocolRole: "change";
  protocolName: "爻以六分";
  userFacingMeaning: string;
};

export type GuanyaoNumericProtocol = {
  fieldProtocol: {
    name: "卦以八除";
    moduloBase: 8;
    role: "field";
    explanation: string;
  };
  changeProtocol: {
    name: "爻以六分";
    moduloBase: 6;
    role: "change";
    explanation: string;
  };
  fieldMappings: EightDivisionFieldMapping[];
  changeMappings: SixDivisionChangeMapping[];
};

export interface MotherCodeDefinition {
  motherCodeId: MotherCodeId;
  trigram: Trigram;
  motherCodeName: string;
  motherCodeTitle: string;
  baseDrive: string;
  causalPosition: string;
  pressureEntry: string;
  shadowInertia: string;
  pressureMode: string;
  defaultReactionChain: string;
  unlockPotential: string;
  personalityAsset: string;
  assetSummary: string;
  visualAssetKey: string;
  visualAssetCode: string;
  xiantianNumber: XiantianNumber;
  xiantianDisplay: string;
  trigramSymbol: string;
  trigramImage: string;
  wuxing: Wuxing;
  visualAssetStatus: "existing";
  visualAssetPackage: string;
  visualTags: {
    force: string;
    mirror: string;
    unlock: string;
  };
  uiBindingStatus: "existing";
  uiSurface: "MotherCodePage";
}

export interface MotherCodeProfile {
  motherCodeId: string;
  motherCodeDefinitionId?: MotherCodeId;
  motherCodeName: string;
  motherCodeTitle?: string;
  lowerTrigram?: Trigram;
  baseForce: string;
  causalPosition?: string;
  pressureEntry?: string;
  defaultReactionPattern: string;
  pressureSensitiveZones: string[];
  defenseTendency: string;
  behaviorBias: string;
  shadowInertia?: string;
  pressureMode?: string;
  defaultReactionChain?: string;
  unlockPotential?: string;
  personalityAsset?: string;
  assetSummary?: string;
  visualAssetKey?: string;
  visualAssetCode?: string;
  xiantianNumber?: XiantianNumber;
  xiantianDisplay?: string;
  trigramSymbol?: string;
  trigramImage?: string;
  wuxing?: Wuxing;
  visualAssetStatus?: "existing";
  visualAssetPackage?: string;
  visualTags?: {
    force: string;
    mirror: string;
    unlock: string;
  };
  uiBindingStatus?: "existing";
  uiSurface?: "MotherCodePage";
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

export type YaoPosition = 1 | 2 | 3 | 4 | 5 | 6;

export type YaoLayer = "body" | "emotion" | "thought" | "behavior" | "memory" | "motivation";

export type PauseSignal = "none" | "soft" | "clear" | "strong";

export interface YaoTransmissionProfile {
  yaoPosition: YaoPosition;
  yaoName: string;
  yaoLayer: YaoLayer;
  layerLabel: string;
  layerQuestion: string;
  pressureReading: string;
  motherCodeInfluence: string;
  hexagramInfluence: string;
  transmissionReading: string;
  inertiaSignal: string;
  antiInstinctHint: string;
  cutPotential: number;
  interventionPotential: number;
  pauseSignal: PauseSignal;
  pauseReason: string;
  userFacingPausePrompt: string;
  userFacingContinuePrompt: string;
}

export interface CutCandidate {
  yaoPosition: YaoPosition;
  yaoLayer: YaoLayer;
  activationIntensity: number;
  inertiaTakeover: number;
  consequenceAmplification: number;
  interventionLeverage: number;
  userAgency: number;
  totalScore: number;
  cutRole: "main" | "secondary" | "root" | "candidate";
  internalCutReason: string;
  userFacingReason: string;
}

export interface YaoTransmissionChain {
  sourceHexagramCode: string;
  sourceHexagramName: string;
  sourceHexagramTitle: string;
  motherCode: string;
  lowerTrigram: Trigram;
  upperTrigram: Trigram;
  gravityValue: PersonalityGravityValue;
  transmissions: YaoTransmissionProfile[];
  cutCandidates: CutCandidate[];
  mainCut: CutCandidate;
  secondaryCut: CutCandidate;
  rootCut: CutCandidate;
  chainSummary: string;
}

export type DeviceMethodType =
  | "stop"
  | "clarify"
  | "separate"
  | "reframe"
  | "boundary"
  | "rebuild"
  | "communicate";

export interface DeviceMethod {
  sourceCut: CutCandidate;
  deviceName: string;
  deviceType: DeviceMethodType;
  methodSummary: string;
  antiInstinctAction: string;
  firstAction: string;
  next72HoursAction: string;
  thirtyDayAction: string;
  doNotDo: string[];
  realityCheck: string[];
  userFacingMethodPrompt: string;
}

export interface DeviceMethodPackage {
  sourceHexagramCode: string;
  sourceHexagramName: string;
  sourceHexagramTitle: string;
  selectedCut: CutCandidate;
  mainDeviceMethod: DeviceMethod;
  secondaryDeviceMethod?: DeviceMethod;
  rootDeviceMethod?: DeviceMethod;
  methodPackageSummary: string;
}

export interface DefensePhase {
  phaseId: "first_72_hours" | "day_1_to_30" | "day_31_to_90";
  phaseName: string;
  phaseGoal: string;
  keyAction: string;
  riskSignal: string;
  defenseInstruction: string;
}

export interface DefensePath90d {
  pathName: string;
  sourceDeviceMethod: DeviceMethod;
  phases: DefensePhase[];
  relapseWarning: string[];
  antiInstinctReminder: string;
}

export type PersonalityAssetType =
  | "clarity"
  | "boundary"
  | "rebuild"
  | "communication"
  | "risk_control"
  | "responsibility"
  | "self_regulation";

export interface PersonalityAssetDeposition {
  assetId: string;
  sourceHexagramCode: string;
  sourceHexagramName: string;
  sourceHexagramTitle: string;
  motherCode: string;
  upperTrigram: Trigram;
  lowerTrigram: Trigram;
  sourcePressureLabel: string;
  sourceGravityValue: PersonalityGravityValue;
  sourceMainCut: CutCandidate;
  sourceDeviceMethod: DeviceMethod;
  assetName: string;
  assetType: PersonalityAssetType;
  assetSummary: string;
  beforePattern: string;
  afterCapability: string;
  defensePath90d: DefensePath90d;
  archiveSummary: string;
  migrationTrace: string[];
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
  yaoTransmissionChain?: YaoTransmissionChain;
  deviceMethodPackage?: DeviceMethodPackage;
  personalityAssetDeposition?: PersonalityAssetDeposition;
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
