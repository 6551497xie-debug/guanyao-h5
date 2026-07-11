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
