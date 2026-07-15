export type { RUEEngagementEvent, RUEEntryEvent, RUEEventType, RUEExitEvent, RUEFlowEvent } from "./rueTrace";
export type {
  BaseRUEPayload,
  EngagementEventPayload,
  EntryEventPayload,
  ExitEventPayload,
  FlowEventPayload,
  RUEPayloadFor,
  RUETracePayloadByEvent,
} from "./rueTracePayloadSpec";
export type {
  ChangeExperienceContext,
  ChangeExperienceDimension,
  ChangeExperienceMeaning,
  ChangeExperiencePresentation,
  ChangeExperiencePresentationContext,
  ChangeExperiencePresentationInput,
  ChangeExperiencePresentationMeaning,
  ChangeExperiencePresentationRecognition,
  ChangeExperiencePresentationRevision,
  ChangeExperiencePresentationStarbeastVisual,
  ChangeExperiencePresentationTraceVisual,
  ChangeExperiencePresentationVisual,
  ChangeExperienceRecognition,
  ChangeExperienceRevision,
  ChangeExperienceType,
  ChangeExperienceUnit,
} from "./changeExperience";
export type {
  JourneyState,
  LifeArchetypeState,
  OriginalSelfFoundationInput,
  OriginalSelfFoundationGuardrails,
  OriginalSelfJourneyPhase,
  OriginalSelfSemanticPath,
  OriginalSelfState,
  StarBeastSemanticBoundary,
  StarBeastState,
} from "./originalSelf";
export type {
  LifeArchetypeCode,
  LifeArchetypeProfile,
  LifeJourneySchemaPath,
  LifeJourneySchemaState,
  LifeJourneyStage,
  OriginalSelfLifeSchemaMapping,
  OriginalSelfLifeSchemaMappingBoundary,
  OriginalSelfLifeSchemaMappingInput,
} from "./originalSelfLifeSchema";
export type {
  LifeJourneyStageAuthority,
  LifeJourneyStageAuthorityBoundary,
  LifeJourneyStageAuthorityDeclaration,
} from "./lifeJourneyStageAuthority";
export type {
  LifeJourneyStageTrigger,
  LifeJourneyStageTriggerBoundary,
  LifeJourneyStageTriggerCode,
} from "./lifeJourneyStageTrigger";
export type {
  LifeJourneyStageTriggerEvidenceBoundary,
  LifeJourneyStageTriggerEvidenceCandidate,
  LifeJourneyStageTriggerEvidenceSource,
} from "./lifeJourneyStageTriggerEvidence";
export type {
  LifeJourneyStageEvidenceAccepted,
  LifeJourneyStageEvidenceRejected,
  LifeJourneyStageEvidenceRejectionReason,
  LifeJourneyStageEvidenceReview,
  LifeJourneyStageEvidenceReviewBoundary,
} from "./lifeJourneyStageEvidenceReview";
export type {
  LifeJourneyStageAuthorityEvidenceInput,
  LifeJourneyStageAuthorityEvidenceInputBoundary,
} from "./lifeJourneyStageAuthorityEvidenceInput";
export type {
  StarBeastMemoryCandidate,
  StarBeastMemoryCrystalReference,
  StarBeastMemoryEligibilityAvailable,
  StarBeastMemoryEligibilityInput,
  StarBeastMemoryEligibilityNotApplicable,
  StarBeastMemoryEligibilityReason,
  StarBeastMemoryEligibilityResult,
  StarBeastMemoryEligibilityUnavailable,
  StarBeastMemoryEligibilityUnavailableReason,
  StarBeastMemoryJourneyReference,
  StarBeastMemoryLifeSubjectReference,
  StarBeastMemoryReference,
  StarBeastMemoryReferenceKind,
} from "./starBeastMemoryEligibility";
export type {
  StarBeastMemoryCandidateConsumption,
  StarBeastMemoryCandidateConsumptionAvailable,
  StarBeastMemoryCandidateConsumptionInput,
  StarBeastMemoryCandidateConsumptionNotApplicable,
  StarBeastMemoryCandidateConsumptionReason,
  StarBeastMemoryCandidateConsumptionResult,
  StarBeastMemoryCandidateConsumptionUnavailable,
  StarBeastMemoryCandidateConsumptionUnavailableReason,
} from "./starBeastMemoryCandidateConsumption";
export type {
  StarBeastArchetypeReference,
  StarBeastCrystalVisualReference,
  StarBeastIdentityReference,
  StarBeastLifeStateReference,
  StarBeastMemoryVisualReference,
  StarBeastVisualExpression,
  StarBeastVisualJourneyState,
  StarBeastVisualMappingInput,
  StarBeastVisualReference,
  StarBeastVisualReferenceKind,
  StarBeastVisualState,
} from "./starBeastVisualState";
export type {
  StarBeastRenderPlan,
  StarBeastRenderRequestReference,
  StarBeastRendererBoundary,
  StarBeastRendererCapability,
  StarBeastRendererCapabilityDeclaration,
  StarBeastRendererInput,
  StarBeastRendererOutput,
  StarBeastRendererPlanned,
  StarBeastRendererUnavailable,
  StarBeastRendererUnavailableReason,
} from "./starBeastRendererContract";
export type {
  StarBeastRenderPlanConsumption,
  StarBeastRenderPlanConsumptionAvailable,
  StarBeastRenderPlanConsumptionInput,
  StarBeastRenderPlanConsumptionResult,
  StarBeastRenderPlanConsumptionUnavailable,
  StarBeastRenderPlanConsumptionUnavailableReason,
} from "./starBeastRenderPlanConsumption";
export type {
  CrystalEndStateAdapterBoundary,
  CrystalEndStateAdapterInput,
  CrystalEndStateAdapterNotReady,
  CrystalEndStateAdapterNotReadyReason,
  CrystalEndStateAdapterReadiness,
  CrystalEndStateAdapterResult,
  CrystalEndStateAdapterSuccess,
  CrystalMappingInput,
  CrystalMappingNotReady,
  CrystalMappingNotReadyReason,
  CrystalMappingResult,
  CrystalMappingSource,
  CrystalMappingSuccess,
  CrystalState,
  CrystalStateAssetBoundary,
  CrystalStateGuardrails,
  CrystalStateReadiness,
  CrystalStateRingDepositMeaning,
  CrystalStateStructureSource,
  CurrentCrystalEndStateLike,
  HexagramCrystalAdapterInput,
  HexagramCrystalAdapterNotReady,
  HexagramCrystalAdapterNotReadyReason,
  HexagramCrystalAdapterResult,
  HexagramCrystalAdapterSuccess,
  HexagramCrystalInput,
  HexagramCrystalInputDominantShift,
  HexagramCrystalInputGuardrails,
  HexagramCrystalInputMigrationTrace,
  HexagramCrystalInputReadiness,
  HexagramCrystalInputSourceCrystal,
  HexagramCrystalInputSourceHexagram,
  PersonaDimension,
  PersonaMigrationImpact,
  PersonaMigrationImpactBeastImpact,
  PersonaMigrationImpactCrystalImprint,
  PersonaMigrationImpactGuardrails,
  PersonaMigrationImpactReadiness,
  PersonaMigrationImpactSourceUnit,
  PersonaTransmissionCurrentContext,
  PersonaTransmissionBeastCue,
  PersonaTransmissionCrystalTrace,
  PersonaTransmissionCutContext,
  PersonaTransmissionExperienceFallback,
  PersonaTransmissionExperienceIdentity,
  PersonaTransmissionExperienceModel,
  PersonaTransmissionExperienceOrientation,
  PersonaTransmissionExperienceRecognition,
  PersonaTransmissionExperienceResult,
  PersonaTransmissionExperienceRevision,
  PersonaTransmissionExperienceStarbeast,
  PersonaTransmissionExperienceTrace,
  PersonaTransmissionIdentity,
  PersonaTransmissionMappingFailure,
  PersonaTransmissionMappingInput,
  PersonaTransmissionMappingNeedsTranslation,
  PersonaTransmissionMappingResult,
  PersonaTransmissionMappingStatus,
  PersonaTransmissionMappingSuccess,
  PersonaTransmissionPressureContext,
  PersonaTransmissionRuntimeGuardrails,
  PersonaTransmissionRuntimeSource,
  PersonaTransmissionRuntimeUnit,
  PersonaTransmissionTriggerContext,
  PersonaYaoStage,
} from "./personaTransmission";
export type {
  HexagramCrystalEngineChangedLineContext,
  HexagramCrystalEngineInput,
  HexagramCrystalEngineNotReady,
  HexagramCrystalEngineNotReadyReason,
  HexagramCrystalEngineSuccess,
  HexagramCrystalExpression,
  HexagramCrystalResult,
  HexagramCrystalResultGuardrails,
  HexagramCrystalResultReadiness,
} from "./hexagramCrystalEngine";
export type {
  HexagramCrystalResultConsumption,
  HexagramCrystalResultConsumptionBoundary,
  HexagramCrystalResultConsumptionInput,
  HexagramCrystalResultConsumptionNotReady,
  HexagramCrystalResultConsumptionNotReadyReason,
  HexagramCrystalResultConsumptionPayload,
  HexagramCrystalResultConsumptionReady,
} from "./hexagramCrystalResultConsumption";

export type YaoBit = 0 | 1;

export type ChronoAgeRange = "18_22" | "23_31" | "32_39" | "40_52" | "53_plus";

export type ChronoPrototypeCard = {
  trigramId: string;
  trigramSymbol: string;
  trigramName: string;
  archetypeName: string;
  timeRange: string;
  hourBranch: string;
  prototypeName: string;
  pressureWeights: string[];
  shortReading: string;
  shadowReading: string;
};

export type ChronoProfile = {
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  birthDate: string;
  birthTimeRange?: string;
  birthHourBranch?: string;
  birthHourBranchLabel?: string;
  chronoHash?: string;
  ageRange: ChronoAgeRange;
  lifeStageLabel: string;
  pressureField: string[];
  sceneWeightTags: string[];
  chronoPrototypeCard?: ChronoPrototypeCard;
};

export type YuanCodeResult = {
  id: string;
  code8: string;
  trigramKey?: string;
  trigramSymbol?: string;
  trigramName?: string;
  forceName?: string;
  userFacingName?: string;
  frontName?: string;
  trigram: string;
  name: string;
  title: string;
  personalitySourceCode: string;
  gravityVector?: string;
  sourceMechanism?: string;
  sourceCore?: string;
  sourceShadow?: string;
  sourceCodeSlice?: string;
  grayNote?: string;
  sourceSeal?: string;
  shortSeal: string;
  systemPerspective?: string[];
  thematicField?: string[];
  coreImpulse?: string;
  shadowInertia?: string;
  pressureTrigger?: string;
  bodySignal?: string;
  behaviorPattern?: string;
  antiInstinctHint?: string;
  chronoRevealLine?: string;
  sourceCodeReading?: string;
  identityBiasTags?: string[];
  sceneBiasTags?: string[];
  forbiddenToneTags?: string[];
};

export type IdentityLifeStageId = "18_22" | "23_31" | "32_42" | "43_55";

export type IdentityFragment = {
  id: string;
  sourceYuanCodeId: string;
  yuanCodeKey: "qian" | "kun" | "zhen" | "xun" | "kan" | "li" | "gen" | "dui";
  lifeStageId: IdentityLifeStageId;
  lifeStageLabel: string;
  fragmentGroup: string;
  title: string;
  fragmentLine: string;
  systemPerspective: string[];
  identityHook: string;
  shadowInertia: string;
  misrecognitionPattern: string;
  thematicField: string[];
  pressureLayerHints: string[];
  sceneSeedBiasTags: string[];
  intensity: 1 | 2 | 3 | 4 | 5;
  forbiddenToneTags: string[];
};

export type SceneSlice = {
  id: string;
  forceId: string;
  forceName: string;
  title: string;
  flashLine: string;
  fixedLines: string[];
  bodyReaction: string;
  behaviorInertia: string;
  gravityHook: string;
  tone: string;
  intensity: 1 | 2 | 3 | 4 | 5;
};

export type ScenePressureLayer = {
  id: string;
  label: string;
  applicableLifeStages: IdentityLifeStageId[];
  description: string;
};

export type SceneSeed = {
  id: string;
  sourceYuanCodeId: string;
  yuanCodeKey: IdentityFragment["yuanCodeKey"];
  lifeStageId: IdentityLifeStageId;
  sourceIdentityFragmentId: string;
  pressureLayerId: string;
  pressureLayerLabel: string;
  seedGroupId: string;
  seedIndex: 1 | 2 | 3;
  title: string;
  seedLine: string;
  realitySnapshot: string;
  behaviorInertia: string;
  gravityHook: string;
  bodySignalHint?: string;
  thematicField: string[];
  motherCodeBiasTags: string[];
  yaoCodeBiasTags: string[];
  intensity: 1 | 2 | 3 | 4 | 5;
  forbiddenToneTags: string[];
};

export type GuaFieldResult = {
  id: string;
  code64: string;
  hexagramName: string;
  title: string;
  upperTrigram?: string;
  lowerTrigram?: string;
  sourceYuanCodeId?: string;
  sourceIdentityId?: string;
  sourceSceneId?: string;
  sourceForceId?: string;
  personalityField: string;
  shortSeal: string;
  fieldDescription: string;
};

export type MotherCodeResult = GuaFieldResult & {
  name: string;
  gravityField: string;
};

export type MotherCodeRegistryEntry = {
  code: string;
  name: string;
  entityType: "mother_code" | "PERSONALITY" | "SYSTEM" | "TRIGGER";
  registryType:
    | "mother_code_registry_v1"
    | "MAIN_TRACK"
    | "CROSS_STATE"
    | "SYSTEM_CAPABILITY"
    | "SYSTEM_STATE"
    | "SYSTEM_LIFECYCLE"
    | "TRIGGER_EVENT";
  primaryForce?: string | null;
  secondaryForce?: string | null;
  forceRatio?: Record<string, number> | null;
  track?: string | null;
  stage?: string | null;
  collapseTarget?: string | null;
  recognitionLine?: string | null;
  coreConflict?: string | null;
  systemFunction?: string | null;
  title?: string | null;
  shortSeal?: string | null;
  gravityField?: string | null;
};

export type YaoCodeType = "INTERRUPT" | "REDIRECT" | "EXPOSE" | "RELEASE" | "REFRAME";

export type RepairLayer = "SELF" | "RELATIONSHIP" | "DIRECTION" | "MEANING" | "GROWTH";

export type RepairTarget =
  | "情绪系统"
  | "身份系统"
  | "主体系统"
  | "边界系统"
  | "责任系统"
  | "依附系统"
  | "归属系统"
  | "方向系统"
  | "意义系统"
  | "同行系统";

export type YaoCodeRegistryEntry = {
  id: string;
  motherCode: string;
  title: string;
  type: YaoCodeType;
  trigger: string;
  action: string;
  expectedShift: string;
  risk: string;
  repairTarget: RepairTarget;
  repairLayer: RepairLayer;
};

export type RepairTargetResult = {
  repairLayer: RepairLayer;
  repairTargetName: RepairTarget;
  damagePattern: string;
  antiInstinctAction: string;
  riskWindow: string;
  archiveStatus: string;
};

export type YaoCodeResult = {
  id: string;
  code384: string;
  sourceGuaFieldId: string;
  yaoIndex: number;
  finalChoiceCode: string;
  personalityBehaviorTrack: string;
  trackSeal: string;
  dynamicState: string;
};

export type YaoCodeCard = {
  id: string;
  sourceYuanCode?: YuanCodeResult | null;
  sourceGuaField?: GuaFieldResult | MotherCodeResult | null;
  sourceYaoCode?: YaoCodeResult | null;
  title: string;
  coreSeal: string;
  antiInstinctNode: string;
  defenseBook90d?: {
    title: string;
    sections: string[];
  };
};

export type TimeSandglassStatus = "stable" | "low" | "empty" | "recharging" | "mock_paid";

export type TimeSandglassUnlocks = {
  canStartSandbox: boolean;
  canRevealGuaField: boolean;
  canCompleteYaoFlow: boolean;
  canViewYaoCodeCard: boolean;
  canViewDefenseBook90d: boolean;
  canSaveArchive: boolean;
  canViewDeepSource: boolean;
};

export type TimeSandglassConsumptionLog = {
  id: string;
  action: string;
  amount: number;
  occurredAt: string;
  note?: string;
};

export type TimeSandglassState = {
  id: string;
  currentEnergy: number;
  maxEnergy: number;
  unitName: string;
  status: TimeSandglassStatus;
  lastRecoveredAt?: string;
  nextRecoveryAt?: string;
  recoveryIntervalMinutes?: number;
  recoveryAmount?: number;
  totalConsumed?: number;
  totalRecharged?: number;
  unlocks?: TimeSandglassUnlocks;
  consumptionLog?: TimeSandglassConsumptionLog[];
  mockPayment?: {
    enabled: boolean;
    lastMockPaidAt?: string;
    lastMockAmount?: number;
    packageId?: string;
  };
};

export interface GuanyaoSession {
  chronoProfile?: ChronoProfile | null;
  chronoHash?: string | null;
  chronoPrototypeCard?: ChronoPrototypeCard | null;
  chronoCode?: YuanCodeResult | null;
  yuanCode?: YuanCodeResult | null;
  identityFragment?: IdentityFragment | null;
  selectedFragment?: any;
  selectedForceId?: string | null;
  selectedForceName?: string | null;
  forceProfile?: any;
  forceReading?: any;
  realitySeed?: any;
  selectedSceneSeed?: SceneSeed | null;
  selectedSceneSlice?: SceneSlice | null;
  selectedSceneId?: string | null;
  guaField?: GuaFieldResult | MotherCodeResult | null;
  guaFieldResult?: GuaFieldResult | MotherCodeResult | null;
  motherCode?: MotherCodeResult | null;
  motherCodeResult?: MotherCodeResult | null;
  currentMotherCode?: MotherCodeResult | null;
  sceneText?: string;
  autoYaoPath: YaoBit[];
  interactiveYaoPath?: YaoBit[];
  sixthYaoChoice: YaoBit | null;
  finalChoiceCode: string;
  choiceHistory: YaoBit[];
  yaoCode?: YaoCodeResult | null;
  yaoCodeResult?: YaoCodeResult | null;
  yaoCodeCard?: YaoCodeCard | null;
  repairTarget?: RepairTargetResult | null;
  defenseBook90d?: {
    title: string;
    sections: string[];
  } | null;
  timeSandglass?: TimeSandglassState | null;
  energyState?: TimeSandglassState | null;
}

export interface ConflictScript90d {
  act1: {
    title: string;
    lines: string[];
  };
  act2: {
    title: string;
    lines: string[];
  };
  act3: {
    title: string;
    lines: string[];
  };
}

export interface OriginGravityCoordinate {
  title: string;
  coordinate: string;
  primaryFactor: {
    forceKey: string;
    archetype: string;
    role: "体";
    lines: string[];
  };
  secondaryFactor: {
    forceKey: string;
    archetype: string;
    role: "用";
    lines: string[];
  };
  collapsePoint: string[];
}

export interface MigrationCard {
  choiceCode: string;
  currentTrack: {
    code: string;
    symbol: string;
    traditionalName: string;
    scriptTitle: string;
  };
  migrationDirection: {
    code: string;
    symbol: string;
    traditionalName: string;
    scriptTitle: string;
  };
  cardTitle: string;
  shortReading: string[];
  originGravityCoordinate?: OriginGravityCoordinate;
  conflictScript90d: ConflictScript90d;
  antiInstinctNode: string;
  status: "active";
}

export type CausalContextPackage = {
  chronoProfile?: ChronoProfile | null;
  yuanCode?: YuanCodeResult | null;
  chronoCode?: YuanCodeResult | null;
  identityFragment?: any;
  forceResult?: any;
  sceneSeed?: any;
  guaField?: GuaFieldResult | MotherCodeResult | null;
  motherCode?: MotherCodeResult | null;
  autoYaoPath?: YaoBit[];
  interactiveYaoPath?: YaoBit[];
  sixthYaoChoice?: YaoBit | null;
  finalChoiceCode: string;
  yaoCode?: YaoCodeResult | null;
  yaoCodeCard: {
    code: string;
    title: string;
    track: string;
    source: string;
  };
  repairTarget?: RepairTargetResult | null;
  defenseBook90d: {
    title: string;
    sections: string[];
  };
  timeSandglass?: TimeSandglassState | null;
  energyState?: TimeSandglassState | null;
};

export interface ArchiveItem extends MigrationCard {
  archiveId: string;
  createdAt: string;
  finalChoiceCode: string;
  causalContext?: CausalContextPackage;
  repairTarget?: RepairTargetResult | null;
}

export type MotherCodeTag = {
  force: string;
  exposure: string;
  trait: string;
};

export type MotherCodeAsset = {
  id: string;
  index: string;
  trigram: string;
  name: string;
  title: string;
  englishName: string;
  tags: MotherCodeTag;
};

export type InitialCoordinates = {
  birthChrono: string;
  agePhase: string;
  behaviorRing: string;
  geoAnchor: string;
};

export type PressureSeed = {
  id: string;
  text: string;
  relationType?: string;
  intensity?: 1 | 2 | 3 | 4 | 5;
  isRecurring?: boolean;
  createdAt: string;
};

export type PressureExposureOption = {
  id: string;
  label: string;
  sentence: string;
};

export type PressureExposureResult = {
  selectedOptionId: string;
  selectedSentence: string;
};

export type DynamicsResult = {
  id: string;
  title: string;
  summary: string;
  oldReaction: string;
  pressurePattern: string;
  behaviorInertia: string;
};

export type HexagramFieldReading = {
  identity: {
    hexagramNo: string;
    hexagramName: string;
    fieldTitle: string;
    lowerGuaLabel: string;
    upperGuaLabel: string;
    hexagramCode: string;
    renderStatus: "HEXAGRAM_CODE_RENDERED";
  };
  formation: {
    lowerSource: string;
    upperSource: string;
    collisionLine: string;
  };
  scriptState: {
    scriptName: string;
    stateTag: string;
    shareableTitle: string;
  };
  hitText: {
    line1: string;
    line2: string;
    line3?: string;
  };
  fieldReadings: Array<{
    dimension: "母码惯性" | "压力牵引" | "现实切片" | "行为反应";
    tag: string;
    text: string;
  }>;
  next: {
    prompt: string;
    cta: "启动人格行为动力引擎";
  };
};

export type BreachPoint = {
  id: string;
  name: string;
  positionLabel: string;
  intensity: "primary" | "secondary";
  oldReaction: string;
  breachSentence: string;
  deviceId: string;
};

export type BreachScanResult = {
  id: string;
  mainBreachId: string;
  breaches: BreachPoint[];
};

export type BreachCutPoint = {
  id: string;
  type: "primary" | "secondary";
  title: string;
  tag: string;
  description: string;
  riskLine: string;
};

export type BreachScanReading = {
  engineStatus: "BEHAVIOR_ENGINE_ACTIVATED";
  headline: string;
  intro: string;
  primaryBreach: BreachCutPoint;
  secondaryBreaches: BreachCutPoint[];
  next: {
    prompt: string;
    cta: "从这里下刀";
  };
};

export type YaoDevice = {
  id: string;
  name: string;
  shortDefinition: string;
  breaksReaction: string;
  notFor: string;
};

export type RepairMethod = {
  id: string;
  name: string;
  firstAction: string;
  forbiddenAction: string;
  relapseReminder: string;
};

export type YaoDeviceDelivery = {
  deviceId: string;
  deviceName: string;
  deviceCode: string;
  sourceBreachId: string;
  sourceBreachTitle: string;
  deviceStatus: "YAO_DEVICE_ACTIVATED";
  coreFunction: string;
  deviceLine: string;
};

export type RepairMethodDelivery = {
  methodId: string;
  methodName: string;
  methodStatus: "REPAIR_METHOD_RENDERED";
  sourceDeviceId: string;
  firstAction: string;
  forbiddenAction: string;
  relapseWarning: string;
  executionWindow: string;
};

export type ArchiveAssetSnapshot = {
  assetId: string;
  archiveStatus: "PERSONALITY_ASSET_ARCHIVED";
  title: string;
  motherCodeRef: string;
  pressureSeedRef: string;
  hexagramRef: string;
  breachRef: string;
  yaoDeviceRef: string;
  repairMethodRef: string;
  assetLine: string;
  package: {
    title: string;
    scriptName: string;
    primaryBreach: string;
    yaoDevice: string;
    firstCut: string;
  };
  todayFirstCut: {
    methodName: string;
    firstAction: string;
    forbiddenAction: string;
    executionWindow: string;
    relapseWarning: string;
  };
  defense90d: {
    title: string;
    intro: string;
    phases: Array<{
      range: string;
      name: string;
      goal: string;
    }>;
  };
  deposit: Array<{
    label: string;
    value: string;
  }>;
};

export type GuanyaoSessionState =
  | "mother_code_ready"
  | "pressure_seed_ready"
  | "pressure_exposure_ready"
  | "dynamics_ready"
  | "breach_scanned"
  | "sealed"
  | "device_activated"
  | "repair_ready"
  | "archived";

export type GuanyaoAsset = {
  id: string;
  motherCodeId: string;
  pressureSeed: PressureSeed;
  pressureExposure?: PressureExposureResult;
  dynamicsResult?: DynamicsResult;
  breachScan?: BreachScanResult;
  selectedBreachId?: string;
  isBroken: boolean;
  yaoDevice?: YaoDevice;
  repairMethod?: RepairMethod;
  status: "sealed" | "activated" | "completed";
  createdAt: string;
  updatedAt: string;
};
