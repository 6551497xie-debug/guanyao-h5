import type { CurrentHexagramProfile, CutCandidate, YaoTransmissionProfile } from "./guanyaoCausalEngine";

export type PersonaDimension = "body" | "emotion" | "thought" | "action" | "memory" | "motivation";

export type PersonaYaoStage = "trigger" | "takeover" | "explain" | "solidify" | "awareness" | "revision";

export type PersonaTransmissionRuntimeSource = "runtime" | "fixture" | "fallback";

export type PersonaTransmissionMappingStatus = "PASS" | "NEEDS_TRANSLATION" | "NOT_READY";

export type PersonaTransmissionIdentity = Readonly<{
  unitId: string;
}>;

export type PersonaTransmissionTriggerContext = Readonly<{
  pressureSeed?: string;
  pressureField?: string;
  motherCodeInfluence?: string;
  motherCodeName?: string;
  currentHexagramProfile?: string;
  currentHexagramName?: string;
  source: PersonaTransmissionRuntimeSource;
}>;

export type PersonaTransmissionBeastCue = Readonly<{
  before: string;
  after: string;
  cue: string;
}>;

export type PersonaTransmissionCrystalTrace = Readonly<{
  traceLine: string;
  shouldDepositToCrystal: boolean;
  shouldDepositToRingLite: boolean;
}>;

export type PersonaTransmissionRuntimeGuardrails = Readonly<{
  noStorageWrite: true;
  noLongTermProfile: true;
  noRawEngineLanguage: true;
  no384Yao: true;
  noArchive: true;
}>;

export type PersonaTransmissionRuntimeUnit = Readonly<{
  identity: PersonaTransmissionIdentity;
  dimension: PersonaDimension;
  yaoStage: PersonaYaoStage;
  triggerContext: PersonaTransmissionTriggerContext;
  oldModel: string;
  inertiaPattern: string;
  insight: string;
  revisionDirection: string;
  microAction: string;
  beastCue: PersonaTransmissionBeastCue;
  crystalTrace: PersonaTransmissionCrystalTrace;
  guardrails: PersonaTransmissionRuntimeGuardrails;
}>;

export type PersonaMigrationImpactReadiness = "NOT_READY" | "READY_FOR_CRYSTAL";

export type PersonaMigrationImpactSourceUnit = Readonly<{
  unitId: string;
  dimension: PersonaDimension;
  yaoStage: PersonaYaoStage;
}>;

export type PersonaMigrationImpactBeastImpact = Readonly<{
  before: string;
  after: string;
  cue: string;
}>;

export type PersonaMigrationImpactCrystalImprint = Readonly<{
  imprintLine: string;
  shouldFeedCrystal: boolean;
  shouldDepositToRingLite: boolean;
}>;

export type PersonaMigrationImpactGuardrails = Readonly<{
  noStorageWrite: true;
  noLongTermProfile: true;
  noScore: true;
  noGrowthValue: true;
  noRawEngineLanguage: true;
  no384Yao: true;
  noArchive: true;
}>;

export type PersonaMigrationImpact = Readonly<{
  sourceUnit: PersonaMigrationImpactSourceUnit;
  dimension: PersonaDimension;
  yaoStage: PersonaYaoStage;
  fromModel: string;
  toResponse: string;
  deflectionVector: string;
  beastImpact: PersonaMigrationImpactBeastImpact;
  crystalImprint: PersonaMigrationImpactCrystalImprint;
  impactReadiness: PersonaMigrationImpactReadiness;
  guardrails: PersonaMigrationImpactGuardrails;
}>;

export type CrystalStateReadiness = "NOT_READY" | "READY_TO_CRYSTALLIZE" | "CRYSTALLIZED";

export type CrystalStateStructureSource = Readonly<{
  source: "currentHexagramProfile";
  currentHexagramProfile: CurrentHexagramProfile;
}>;

export type CrystalStateAssetBoundary = Readonly<{
  canCreateCurrentCrystalEndState: boolean;
  canExposeHexagramAsset: boolean;
  canDepositToRingLite: boolean;
}>;

export type CrystalStateRingDepositMeaning = Readonly<{
  traceLine: string;
  shouldDepositToRingLite: boolean;
}>;

export type CrystalStateGuardrails = Readonly<{
  noStorageWrite: true;
  noHexagramGeneration: true;
  noCrystalEngineMutation: true;
  noCollectibleAsset: true;
  noScore: true;
  noLevel: true;
  noGrowthValue: true;
  noPetGrowth: true;
  no384Yao: true;
  noArchive: true;
  noOldR8: true;
}>;

export type CrystalState = Readonly<{
  structureSource: CrystalStateStructureSource | null;
  impactSources: readonly PersonaMigrationImpact[];
  dominantImpact: PersonaMigrationImpact | null;
  readiness: CrystalStateReadiness;
  crystalMeaning: string;
  assetBoundary: CrystalStateAssetBoundary;
  ringDepositMeaning: CrystalStateRingDepositMeaning;
  guardrails: CrystalStateGuardrails;
}>;

export type CrystalMappingSource = "runtime" | "fixture" | "fallback";

export type CrystalMappingInput = Readonly<{
  structureSource: CrystalStateStructureSource | null;
  migrationImpacts: readonly PersonaMigrationImpact[];
  source: CrystalMappingSource;
}>;

export type CrystalMappingSuccess = Readonly<{
  status: "PASS";
  crystalState: CrystalState;
}>;

export type CrystalMappingNotReadyReason =
  | "CURRENT_HEXAGRAM_PROFILE_MISSING"
  | "READY_MIGRATION_IMPACT_MISSING"
  | "DOMINANT_IMPACT_UNRESOLVED"
  | "RAW_ENGINE_LANGUAGE_DETECTED"
  | "BOUNDARY_VIOLATION";

export type CrystalMappingNotReady = Readonly<{
  status: "NOT_READY";
  reason: CrystalMappingNotReadyReason;
  crystalState?: CrystalState;
}>;

export type CrystalMappingResult = CrystalMappingSuccess | CrystalMappingNotReady;

export type CrystalEndStateAdapterInput = Readonly<{
  crystalState: CrystalState;
  source: CrystalMappingSource;
}>;

export type CrystalEndStateAdapterReadiness = "NOT_READY" | "READY_FOR_CURRENT_CRYSTAL_END_STATE";

export type CrystalEndStateAdapterBoundary = Readonly<{
  canAdaptToCurrentCrystalEndState: boolean;
  nextCrystalStateReadiness: CrystalStateReadiness;
  canExposeHexagramAssetAfterAdapt: boolean;
  canDepositToRingLiteAfterAdapt: boolean;
}>;

export type CrystalEndStateAdapterSuccess = Readonly<{
  status: "READY";
  readiness: "READY_FOR_CURRENT_CRYSTAL_END_STATE";
  crystalState: CrystalState;
  boundary: CrystalEndStateAdapterBoundary;
}>;

export type CrystalEndStateAdapterNotReadyReason =
  | "CRYSTAL_STATE_NOT_READY_TO_CRYSTALLIZE"
  | "CURRENT_CRYSTAL_END_STATE_BOUNDARY_CLOSED"
  | "HEXAGRAM_ASSET_BOUNDARY_PREMATURE"
  | "RING_DEPOSIT_BOUNDARY_PREMATURE"
  | "BOUNDARY_VIOLATION";

export type CrystalEndStateAdapterNotReady = Readonly<{
  status: "NOT_READY";
  readiness: "NOT_READY";
  reason: CrystalEndStateAdapterNotReadyReason;
  crystalState: CrystalState;
  boundary: CrystalEndStateAdapterBoundary;
}>;

export type CrystalEndStateAdapterResult =
  | CrystalEndStateAdapterSuccess
  | CrystalEndStateAdapterNotReady;

export type HexagramCrystalInputReadiness = "NOT_READY" | "READY_FOR_HEXAGRAM_CRYSTAL";

export type HexagramCrystalInputSourceCrystal = Readonly<{
  source: "currentCrystalEndState";
  status: "CRYSTALLIZED";
  crystalMeaning: string;
}>;

export type HexagramCrystalInputSourceHexagram = Readonly<{
  lowerTrigram?: string;
  upperTrigram?: string;
  hexagramCode?: string;
  hexagramName?: string;
  hexagramTitle?: string;
}>;

export type HexagramCrystalInputMigrationTrace = Readonly<{
  traceLine: string;
  sourceUnitId?: string;
  dimension?: PersonaDimension;
  yaoStage?: PersonaYaoStage;
}>;

export type HexagramCrystalInputDominantShift = Readonly<{
  fromModel: string;
  toResponse: string;
  deflectionVector?: string;
}>;

export type HexagramCrystalInputGuardrails = Readonly<{
  noStorageWrite: true;
  noHexagramGeneration: true;
  noCurrentCrystalEndStateMutation: true;
  noCrystalEngineMutation: true;
  noCollectibleAsset: true;
  noScore: true;
  noLevel: true;
  noGrowthValue: true;
  noPetGrowth: true;
  no384Yao: true;
  noArchive: true;
  noOldR8: true;
}>;

export type HexagramCrystalInput = Readonly<{
  sourceCrystal: HexagramCrystalInputSourceCrystal;
  sourceHexagram: HexagramCrystalInputSourceHexagram;
  migrationTrace: HexagramCrystalInputMigrationTrace;
  dominantShift: HexagramCrystalInputDominantShift;
  crystalMeaning: string;
  readiness: HexagramCrystalInputReadiness;
  source: CrystalMappingSource;
  guardrails: HexagramCrystalInputGuardrails;
}>;

export type CurrentCrystalEndStateLike = Readonly<{
  source: "dynamics";
  status: "CRYSTALLIZED";
  hexagram: HexagramCrystalInputSourceHexagram;
  crystal: Readonly<{
    title: string;
    copy: string;
  }>;
  transmission?: Readonly<{
    completedNodeCount?: number;
    primaryDimension?: string;
  }>;
}>;

export type HexagramCrystalAdapterInput = Readonly<{
  sourceCrystal?: CurrentCrystalEndStateLike | null;
  source: CrystalMappingSource;
}>;

export type HexagramCrystalAdapterSuccess = Readonly<{
  status: "READY";
  input: HexagramCrystalInput;
}>;

export type HexagramCrystalAdapterNotReadyReason =
  | "CURRENT_CRYSTAL_END_STATE_MISSING"
  | "CURRENT_CRYSTAL_END_STATE_NOT_CRYSTALLIZED"
  | "HEXAGRAM_STRUCTURE_MISSING"
  | "MOVEMENT_TRACE_MISSING"
  | "BOUNDARY_VIOLATION";

export type HexagramCrystalAdapterNotReady = Readonly<{
  status: "NOT_READY";
  reason: HexagramCrystalAdapterNotReadyReason;
}>;

export type HexagramCrystalAdapterResult =
  | HexagramCrystalAdapterSuccess
  | HexagramCrystalAdapterNotReady;

export type HexagramCrystalEngineChangedLineContext = Readonly<{
  sourceUnitId?: string;
  dimension?: PersonaDimension;
  yaoStage?: PersonaYaoStage;
  changedLineHint?: string;
}>;

export type HexagramCrystalEngineInput = Readonly<{
  sourceHexagram: HexagramCrystalInputSourceHexagram;
  crystalMeaning: string;
  migrationTrace: HexagramCrystalInputMigrationTrace;
  dominantShift: HexagramCrystalInputDominantShift;
  changedLineContext: HexagramCrystalEngineChangedLineContext;
  source: CrystalMappingSource;
}>;

export type HexagramCrystalResultReadiness = "NOT_READY" | "READY_FOR_HEXAGRAM_CRYSTAL_EXPRESSION";

export type HexagramCrystalExpression = Readonly<{
  hexagramCode?: string;
  hexagramName?: string;
  hexagramTitle?: string;
  crystalLine: string;
  migrationLine: string;
  assetBoundary: "CURRENT_ROUND_HEXAGRAM_CRYSTAL";
}>;

export type HexagramCrystalResultGuardrails = Readonly<{
  noStorageWrite: true;
  noHexagramMatrixMutation: true;
  noCurrentHexagramProfileMutation: true;
  noCurrentCrystalEndStateMutation: true;
  noCollectibleAsset: true;
  noScore: true;
  noLevel: true;
  noGrowthValue: true;
  noPetGrowth: true;
  no384Yao: true;
  noArchive: true;
  noOldR8: true;
}>;

export type HexagramCrystalEngineSuccess = Readonly<{
  status: "READY";
  readiness: "READY_FOR_HEXAGRAM_CRYSTAL_EXPRESSION";
  expression: HexagramCrystalExpression;
  sourceInput: HexagramCrystalEngineInput;
  guardrails: HexagramCrystalResultGuardrails;
}>;

export type HexagramCrystalEngineNotReadyReason =
  | "HEXAGRAM_CRYSTAL_INPUT_MISSING"
  | "HEXAGRAM_CRYSTAL_INPUT_NOT_READY"
  | "SOURCE_HEXAGRAM_MISSING"
  | "MIGRATION_TRACE_MISSING"
  | "DOMINANT_SHIFT_MISSING"
  | "BOUNDARY_VIOLATION";

export type HexagramCrystalEngineNotReady = Readonly<{
  status: "NOT_READY";
  readiness: "NOT_READY";
  reason: HexagramCrystalEngineNotReadyReason;
}>;

export type HexagramCrystalResult =
  | HexagramCrystalEngineSuccess
  | HexagramCrystalEngineNotReady;

export type HexagramCrystalResultConsumptionBoundary = Readonly<{
  canEnterHexagramExpressionLayer: boolean;
  canMutateHexagramMatrix: false;
  canRenderUi: false;
  canWriteStorage: false;
  canCreateCollectibleAsset: false;
  canConnect384: false;
  canConnectOldR8: false;
}>;

export type HexagramCrystalResultConsumptionInput = Readonly<{
  result: HexagramCrystalResult;
  source: CrystalMappingSource;
}>;

export type HexagramCrystalResultConsumptionPayload = Readonly<{
  sourceExpression: HexagramCrystalExpression;
  inheritedIdentity: HexagramCrystalInputSourceHexagram;
  crystalLine: string;
  migrationLine: string;
  boundary: HexagramCrystalResultConsumptionBoundary;
}>;

export type HexagramCrystalResultConsumptionReady = Readonly<{
  status: "READY_FOR_HEXAGRAM_EXPRESSION_LAYER";
  payload: HexagramCrystalResultConsumptionPayload;
}>;

export type HexagramCrystalResultConsumptionNotReadyReason =
  | "HEXAGRAM_CRYSTAL_RESULT_NOT_READY"
  | "HEXAGRAM_CRYSTAL_EXPRESSION_MISSING"
  | "HEXAGRAM_CRYSTAL_IDENTITY_MISSING"
  | "HEXAGRAM_CRYSTAL_MIGRATION_LINE_MISSING"
  | "BOUNDARY_VIOLATION";

export type HexagramCrystalResultConsumptionNotReady = Readonly<{
  status: "NOT_READY";
  reason: HexagramCrystalResultConsumptionNotReadyReason;
}>;

export type HexagramCrystalResultConsumption =
  | HexagramCrystalResultConsumptionReady
  | HexagramCrystalResultConsumptionNotReady;

export type PersonaTransmissionPressureContext = Readonly<{
  pressureSeedId?: string;
  pressureSeed?: string;
  pressureField?: string;
}>;

export type PersonaTransmissionCurrentContext = Readonly<{
  currentHexagramProfile?: string;
  currentHexagramName?: string;
  motherCodeProfile?: string;
  motherCodeName?: string;
  motherCodeInfluence?: string;
}>;

export type PersonaTransmissionCutContext = Readonly<{
  mainCut?: CutCandidate;
  secondaryCut?: CutCandidate;
  rootCut?: CutCandidate;
  userAgency?: number;
}>;

export type PersonaTransmissionMappingInput = Readonly<{
  yaoTransmissionProfile?: YaoTransmissionProfile;
  pressureContext: PersonaTransmissionPressureContext;
  currentContext: PersonaTransmissionCurrentContext;
  cutContext?: PersonaTransmissionCutContext;
  source: PersonaTransmissionRuntimeSource;
}>;

export type PersonaTransmissionMappingSuccess = Readonly<{
  status: "PASS";
  unit: PersonaTransmissionRuntimeUnit;
}>;

export type PersonaTransmissionMappingNeedsTranslation = Readonly<{
  status: "NEEDS_TRANSLATION";
  reason: string;
  partialUnit?: Partial<PersonaTransmissionRuntimeUnit>;
}>;

export type PersonaTransmissionMappingFailure = Readonly<{
  status: "NOT_READY";
  reason: string;
}>;

export type PersonaTransmissionMappingResult =
  | PersonaTransmissionMappingSuccess
  | PersonaTransmissionMappingNeedsTranslation
  | PersonaTransmissionMappingFailure;

export type PersonaTransmissionExperienceIdentity = Readonly<{
  unitId: string;
  dimension: PersonaDimension;
  yaoStage: PersonaYaoStage;
}>;

export type PersonaTransmissionExperienceOrientation = Readonly<{
  pressureLine: string;
  currentRoundLine?: string;
}>;

export type PersonaTransmissionExperienceRecognition = Readonly<{
  oldModelLine: string;
  inertiaLine: string;
  insightLine: string;
}>;

export type PersonaTransmissionExperienceRevision = Readonly<{
  directionLine: string;
  microActionLine: string;
}>;

export type PersonaTransmissionExperienceStarbeast = Readonly<{
  beforeLine: string;
  afterLine: string;
  cueLine: string;
}>;

export type PersonaTransmissionExperienceTrace = Readonly<{
  crystalLine: string;
  depositsToCrystal: boolean;
  depositsToRingLite: boolean;
}>;

export type PersonaTransmissionExperienceModel = Readonly<{
  status: "READY";
  identity: PersonaTransmissionExperienceIdentity;
  orientation: PersonaTransmissionExperienceOrientation;
  recognition: PersonaTransmissionExperienceRecognition;
  revision: PersonaTransmissionExperienceRevision;
  starbeast: PersonaTransmissionExperienceStarbeast;
  trace: PersonaTransmissionExperienceTrace;
}>;

export type PersonaTransmissionExperienceFallback = Readonly<{
  status: "NOT_READY";
  reason: string;
}>;

export type PersonaTransmissionExperienceResult =
  | PersonaTransmissionExperienceModel
  | PersonaTransmissionExperienceFallback;
