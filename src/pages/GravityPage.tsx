/**
 * GravityPage = passive UI visualization layer for presenting existing causal state transitions
 * without any influence on engine or data flow.
 */
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { GuanyaoText } from "../components/visual/GuanyaoText";
import {
  runCosmicBotanicsRuntimeEngine,
  type CosmicPetalState,
  type StarbeastFeedback,
  type StarFlowerGrowthState,
} from "../services/guanyaoCosmicBotanicsRuntimeEngine";
import {
  buildPressureField,
  formCurrentHexagramProfile,
} from "../services/guanyaoCausalEngineService";
import { resolveHexagramAssetCandidate } from "../services/guanyaoHexagramAssetCandidateResolver";
import {
  createPersonalityRingLiteEntryFromCrystal,
  readPersonalityRingLite,
  savePersonalityRingLiteEntry,
} from "../services/personalityRingLiteService";
import type { SelectedPressureSeedContext } from "../services/guanyaoPrimaryPetalResolver";
import type {
  CurrentHexagramProfile,
  MotherCodeProfile,
  PressureIntensity,
  PressureSeed,
  Trigram,
} from "../types/guanyaoCausalEngine";
import {
  GuanyaoRuntimeEngine,
  type ExecutionSnapshot,
  type RuntimeProjection,
  type SixSpaceConfig,
  type SixSpaceId,
  type SpatialIntent,
} from "../runtime/guanyaoRuntimeEngine";
import { LegacyDynamicsDormant } from "./legacy/LegacyDynamicsDormant";

const USE_COSMIC_BOTANICS_SIX_SPACE = true;
const LEGACY_DYNAMICS_FLOW_ISOLATED = true;
const DEV_PRIMARY_PETAL_FIXTURES: Record<string, SelectedPressureSeedContext> = {
  body: {
    selectedPressureSeedId: "dev-fixture-body",
    surface: "你在这个行业十年了，抬头还是经理。",
    bodySignal: "胸口发闷，肩膀沉重。",
  },
  emotion: {
    selectedPressureSeedId: "dev-fixture-emotion",
    surface: "对方一个眼神，你瞬间被不安接管。",
    emotionalTone: "fear",
  },
  thought: {
    selectedPressureSeedId: "dev-fixture-thought",
    surface: "你还没说完，脑子里已经开始组织下一句解释了。",
    thoughtPattern: "反复解释，用证明换安全。",
  },
  behavior: {
    selectedPressureSeedId: "dev-fixture-behavior",
    surface: "你脑子里想了无数遍，手还在原处。",
    behaviorBlock: "想做，但卡住很久了。",
  },
  memory: {
    selectedPressureSeedId: "dev-fixture-memory",
    surface: "以前也这样过，你还没反应，记忆已经先替你回答了。",
    memoryEcho: "旧经验正在把你拉回过去。",
  },
  motivation: {
    selectedPressureSeedId: "dev-fixture-motivation",
    surface: "你不知道该往哪走，假装不需要，就不怕得不到。",
    motivationLoss: "方向感变得模糊。",
  },
};

type PressureBeastSeed = {
  index: number;
  intensity: number;
  resonance: number;
};
type RuntimeCoreStar = readonly [number, number, number];
type StoredMotherCodeProfile = Partial<MotherCodeProfile> & {
  motherCodeName?: string;
  motherCodeTitle?: string;
  trigram?: string;
  lowerTrigram?: string;
  trigramSymbol?: string;
  baseDrive?: string;
};
type StoredOriginMotherContext = {
  source?: string;
  geo?: {
    symbol?: string;
    province?: string;
  };
  chrono?: {
    lockPoint?: string;
  };
  mother?: {
    trigram?: string;
    profile?: StoredMotherCodeProfile;
  };
  fourBeast?: string;
  trigram?: string;
};
type StoredPersonaOutputSnapshot = {
  motherCode?: string;
  motherCodeName?: string;
  trigram?: string;
  trigramSymbol?: string;
  fourBeast?: string;
  direction?: string;
};
type DynamicsInputContext = {
  selectedPressureSeedContext: SelectedPressureSeedContext | null;
  motherCodeProfile: StoredMotherCodeProfile | null;
  originMotherContext: StoredOriginMotherContext | null;
  personaOutputSnapshot: StoredPersonaOutputSnapshot | null;
};
type ActiveCurrentHexagramContext = {
  source: "dynamics";
  createdAt: string;
  motherCodeProfile: {
    motherCodeName: string;
    motherCodeTitle?: string;
    lowerTrigram?: string;
    trigram?: string;
  };
  selectedPressureSeedContext: {
    selectedPressureSeedId?: string;
    matrixCode?: string;
    pressureField?: string;
    pressureNature?: string;
    surface?: string;
  };
  currentHexagramProfile: CurrentHexagramProfile;
};
type CurrentCrystalEndState = {
  source: "dynamics";
  status: "CRYSTALLIZED";
  createdAt: string;
  mother: {
    motherCodeName: string;
    lowerTrigram: string;
  };
  pressure: {
    selectedPressureSeedId?: string;
    surface?: string;
    pressureField?: string;
  };
  hexagram: {
    lowerTrigram: string;
    upperTrigram: string;
    hexagramCode?: string;
    hexagramName?: string;
    hexagramTitle?: string;
  };
  transmission: {
    completedNodeCount: 6;
    primaryDimension?: string;
  };
  crystal: {
    title: "本局结晶";
    copy: string;
  };
};

function readJsonFromStorage<T>(key: string): T | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;

    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function readDevPrimaryPetalFixture(): SelectedPressureSeedContext | null {
  const viteEnv = (import.meta as ImportMeta & { env?: { DEV?: boolean } }).env;
  if (!viteEnv?.DEV || typeof window === "undefined") return null;

  const fixtureKey = new URLSearchParams(window.location.search).get("fixture");
  if (!fixtureKey) return null;

  return DEV_PRIMARY_PETAL_FIXTURES[fixtureKey] ?? null;
}

function readDynamicsInputContext(): DynamicsInputContext {
  return {
    selectedPressureSeedContext:
      readDevPrimaryPetalFixture() ?? readJsonFromStorage<SelectedPressureSeedContext>("guanyao:selectedPressureSeedContext"),
    motherCodeProfile: readJsonFromStorage<StoredMotherCodeProfile>("guanyao:motherCodeProfile"),
    originMotherContext: readJsonFromStorage<StoredOriginMotherContext>("guanyao:originMotherContext"),
    personaOutputSnapshot: readJsonFromStorage<StoredPersonaOutputSnapshot>("guanyao:personaOutputSnapshot"),
  };
}

function writeJsonToStorage(key: string, value: unknown) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage must never block the active /dynamics runtime.
  }
}

function resolveMotherCodeName(input: DynamicsInputContext) {
  return (
    input.motherCodeProfile?.motherCodeName ??
    input.originMotherContext?.mother?.profile?.motherCodeName ??
    input.personaOutputSnapshot?.motherCodeName ??
    input.personaOutputSnapshot?.motherCode ??
    ""
  );
}

function resolveMotherPersonaSnapshot(input: DynamicsInputContext) {
  const motherCode = resolveMotherCodeName(input);
  const trigram =
    input.motherCodeProfile?.trigram ??
    input.motherCodeProfile?.lowerTrigram ??
    input.originMotherContext?.mother?.trigram ??
    input.originMotherContext?.trigram ??
    input.personaOutputSnapshot?.trigram;
  const fourSymbol =
    input.originMotherContext?.fourBeast ??
    input.originMotherContext?.geo?.symbol ??
    input.personaOutputSnapshot?.fourBeast ??
    input.personaOutputSnapshot?.direction;

  if (!motherCode && !trigram && !fourSymbol) return null;

  return {
    motherCode,
    trigram,
    fourSymbol,
  };
}

function normalizePressureIntensity(value: unknown): PressureIntensity {
  if (typeof value === "number") {
    if (value >= 88) return "critical";
    if (value >= 72) return "high";
    if (value >= 42) return "medium";
    return "low";
  }

  return "medium";
}

function pressureFieldLabel(value: unknown) {
  const source = String(value ?? "").trim();
  const labels: Record<string, string> = {
    POWER: "权力压力",
    INTEREST: "利益压力",
    RELATION: "关系压力",
    FAMILY: "家庭压力",
    SOCIAL: "社会压力",
    EXISTENCE: "存在压力",
  };

  return labels[source] ?? (source || "现实压力");
}

function pressureNatureLabel(value: unknown) {
  const source = String(value ?? "").trim();
  const labels: Record<string, string> = {
    EVALUATION: "评价威胁",
    RESOURCE: "资源冲突",
    ATTACHMENT: "依恋断裂",
    CONTROL: "控制压迫",
    OBLIGATION: "责任义务",
    BELONGING: "归属压力",
    IDENTITY: "身份压力",
    SURVIVAL: "生存压力",
  };

  return labels[source] ?? (source || "现实触发");
}

function relationLabel(value: unknown) {
  const source = String(value ?? "").trim();
  const labels: Record<string, string> = {
    BOSS: "上级 / 权力关系",
    CLIENT: "客户关系",
    PARTNER_BUSINESS: "合作关系",
    PARTNER_ROMANTIC: "亲密关系",
    PARENT: "父母关系",
    CHILD: "子女关系",
    FRIEND: "朋友关系",
    COLLEAGUE: "同事关系",
    SELF: "自我关系",
    SYSTEM: "系统结构",
  };

  return labels[source] ?? (source || "关系结构");
}

function isTrigram(value: unknown): value is Trigram {
  return value === "乾" || value === "坤" || value === "震" || value === "巽" || value === "坎" || value === "离" || value === "艮" || value === "兑";
}

function normalizeMotherCodeProfileForHexagram(
  input: DynamicsInputContext,
): MotherCodeProfile | null {
  const profile = input.motherCodeProfile ?? input.originMotherContext?.mother?.profile;
  const lowerTrigramCandidate = profile?.lowerTrigram ?? profile?.trigram ?? input.originMotherContext?.mother?.trigram ?? input.originMotherContext?.trigram;
  const motherCodeName = profile?.motherCodeName ?? input.personaOutputSnapshot?.motherCodeName ?? input.personaOutputSnapshot?.motherCode;

  if (!profile || !motherCodeName || !isTrigram(lowerTrigramCandidate)) return null;

  return {
    motherCodeId: profile.motherCodeId ?? motherCodeName,
    motherCodeDefinitionId: profile.motherCodeDefinitionId,
    motherCodeName,
    motherCodeTitle: profile.motherCodeTitle,
    lowerTrigram: lowerTrigramCandidate,
    baseForce: profile.baseForce ?? profile.baseDrive ?? "母码底盘已接入。",
    causalPosition: profile.causalPosition,
    pressureEntry: profile.pressureEntry,
    defaultReactionPattern: profile.defaultReactionPattern ?? profile.defaultReactionChain ?? "默认反应链待显影。",
    pressureSensitiveZones: profile.pressureSensitiveZones ?? ["现实压力"],
    defenseTendency: profile.defenseTendency ?? profile.pressureMode ?? "防御倾向待显影。",
    behaviorBias: profile.behaviorBias ?? profile.shadowInertia ?? "行为惯性待显影。",
    shadowInertia: profile.shadowInertia,
    pressureMode: profile.pressureMode,
    defaultReactionChain: profile.defaultReactionChain,
    unlockPotential: profile.unlockPotential,
    personalityAsset: profile.personalityAsset,
    assetSummary: profile.assetSummary,
    visualAssetKey: profile.visualAssetKey,
    visualAssetCode: profile.visualAssetCode,
    xiantianNumber: profile.xiantianNumber,
    xiantianDisplay: profile.xiantianDisplay,
    trigramSymbol: profile.trigramSymbol,
    trigramImage: profile.trigramImage,
    wuxing: profile.wuxing,
    visualAssetStatus: profile.visualAssetStatus,
    visualAssetPackage: profile.visualAssetPackage,
    visualTags: profile.visualTags,
    uiBindingStatus: profile.uiBindingStatus,
    uiSurface: profile.uiSurface,
  };
}

function buildPressureSeedForHexagram(context: SelectedPressureSeedContext): PressureSeed {
  const runtimeContext = context as SelectedPressureSeedContext & {
    pressureIntensity?: unknown;
    primaryRelation?: unknown;
    core?: { mechanism?: string; engineHint?: string };
    mappingHint?: string;
  };
  const pressureType = pressureFieldLabel(context.pressureField ?? context.category);
  const pressureNature = pressureNatureLabel(context.pressureNature ?? context.emotionalTone);
  const relationshipRole = relationLabel(runtimeContext.primaryRelation ?? context.scenarioDomain);
  const locationTags = [
    context.matrixCode,
    context.category,
    context.pressureField,
    context.pressureNature,
    context.scenarioDomain,
    context.emotionalTone,
    runtimeContext.primaryRelation,
    runtimeContext.mappingHint,
    runtimeContext.core?.mechanism,
    runtimeContext.core?.engineHint,
    ...(context.tags ?? []),
    ...(context.semanticTags ?? []),
  ]
    .filter((value): value is string => typeof value === "string" && value.trim().length > 0);

  return {
    seedId: context.selectedPressureSeedId ?? "pressure-seed-runtime",
    sceneText: [context.surface, context.shell].filter(Boolean).join(" "),
    pressureType,
    relationshipRole,
    triggerMoment: context.surface ?? "现实压力正在进入。",
    intensityLevel: normalizePressureIntensity(runtimeContext.pressureIntensity),
    costHint: context.shell ?? runtimeContext.mappingHint ?? "当前压力代价待显影。",
    fieldBias: `${pressureNature}｜${relationshipRole}`,
    locationTags,
  };
}

function resolveActiveCurrentHexagramContext(input: DynamicsInputContext): ActiveCurrentHexagramContext | null {
  if (!input.selectedPressureSeedContext) return null;

  const motherCodeProfile = normalizeMotherCodeProfileForHexagram(input);
  if (!motherCodeProfile) return null;

  const pressureSeed = buildPressureSeedForHexagram(input.selectedPressureSeedContext);
  const pressureField = buildPressureField(motherCodeProfile, pressureSeed);
  const currentHexagramProfile = formCurrentHexagramProfile(motherCodeProfile, pressureSeed, pressureField);

  return {
    source: "dynamics",
    createdAt: new Date().toISOString(),
    motherCodeProfile: {
      motherCodeName: motherCodeProfile.motherCodeName,
      motherCodeTitle: motherCodeProfile.motherCodeTitle,
      lowerTrigram: motherCodeProfile.lowerTrigram,
      trigram: input.motherCodeProfile?.trigram ?? input.originMotherContext?.mother?.trigram ?? input.originMotherContext?.trigram,
    },
    selectedPressureSeedContext: {
      selectedPressureSeedId: input.selectedPressureSeedContext.selectedPressureSeedId,
      matrixCode: input.selectedPressureSeedContext.matrixCode,
      pressureField: input.selectedPressureSeedContext.pressureField,
      pressureNature: input.selectedPressureSeedContext.pressureNature,
      surface: input.selectedPressureSeedContext.surface,
    },
    currentHexagramProfile,
  };
}

function resolveCurrentCrystalEndState({
  currentHexagramProfile,
  motherCodeName,
  selectedPressureSeedContext,
  completedNodeCount,
  primaryDimension,
  readyToCrystallize,
}: {
  currentHexagramProfile: CurrentHexagramProfile | null;
  motherCodeName: string;
  selectedPressureSeedContext: SelectedPressureSeedContext | null;
  completedNodeCount: number;
  primaryDimension?: string;
  readyToCrystallize: boolean;
}): CurrentCrystalEndState | null {
  if (!currentHexagramProfile || !readyToCrystallize || completedNodeCount < 6) return null;

  return {
    source: "dynamics",
    status: "CRYSTALLIZED",
    createdAt: new Date().toISOString(),
    mother: {
      motherCodeName: motherCodeName || currentHexagramProfile.lowerTrigram,
      lowerTrigram: currentHexagramProfile.lowerTrigram,
    },
    pressure: {
      selectedPressureSeedId: selectedPressureSeedContext?.selectedPressureSeedId,
      surface: selectedPressureSeedContext?.surface,
      pressureField: selectedPressureSeedContext?.pressureField,
    },
    hexagram: {
      lowerTrigram: currentHexagramProfile.lowerTrigram,
      upperTrigram: currentHexagramProfile.upperTrigram,
      hexagramCode: currentHexagramProfile.hexagramCode,
      hexagramName: currentHexagramProfile.hexagramName,
      hexagramTitle: currentHexagramProfile.hexagramTitle,
    },
    transmission: {
      completedNodeCount: 6,
      primaryDimension,
    },
    crystal: {
      title: "本局结晶",
      copy: "这粒压力已经完成六维传导，沉积为一枚可保存的本局结晶。",
    },
  };
}

function shouldAutoCompleteFinalDimension(snapshot: ExecutionSnapshot) {
  return (
    snapshot.runtime.enginePhase !== "COMPLETE" &&
    snapshot.node.current === 6 &&
    snapshot.node.completed.length >= 5
  );
}

function buildSpaceRecord<T>(value: T): Record<SixSpaceId, T> {
  return {
    body: value,
    emotion: value,
    thought: value,
    action: value,
    memory: value,
    goal: value,
  };
}

function hashPressureBeastInput(input: string) {
  let hash = 2166136261;

  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return Math.abs(hash >>> 0);
}

function resolvePressureBeastSeed(snapshot: ExecutionSnapshot, projection: RuntimeProjection): PressureBeastSeed {
  const fallbackSeed = hashPressureBeastInput(
    [
      snapshot.seed.id,
      snapshot.seed.text,
      snapshot.primaryDimension,
      snapshot.beast.tone,
      snapshot.node.current,
      projection.currentPrimarySpaceId,
    ].join("|"),
  );

  return {
    index: fallbackSeed % 28,
    intensity: Math.max(1, Math.min(7, Math.round(snapshot.beast.resonance * 7) || ((fallbackSeed % 7) + 1))),
    resonance: Math.max(1, Math.min(5, Math.round((snapshot.seed.intensity ?? 0.5) * 5) || ((fallbackSeed % 5) + 1))),
  };
}

function buildRuntimeBaiHuCoreStars(snapshot: ExecutionSnapshot, projection: RuntimeProjection): RuntimeCoreStar[] {
  const beastSeed = resolvePressureBeastSeed(snapshot, projection);
  const pressureSeed = hashPressureBeastInput(`${snapshot.seed.id}|${snapshot.seed.text}|${projection.selectedPressureSeedSurface}`);
  const phase = (beastSeed.index % 7) - 3;
  const lift = (beastSeed.resonance - 3) * 0.72;
  const stretch = 1 + (beastSeed.intensity - 4) * 0.012;
  const tailRise = (pressureSeed % 4) * 0.8;
  const baseStars: RuntimeCoreStar[] = [
    [20, 42, 6.2],
    [31, 35, 5.2],
    [44, 31, 5.6],
    [58, 28, 6.8],
    [70, 31, 5.4],
    [79, 36, 5.8],
    [86, 42, 5.2],
  ];

  return baseStars.map(([x, y, size], index) => {
    const spineWave = Math.sin((index + phase) * 0.84) * 1.8;
    const tailBias = index >= 5 ? -tailRise * (index - 4) : 0;
    const shoulderBias = index === 1 || index === 2 ? -beastSeed.intensity * 0.16 : 0;

    return [
      50 + (x - 50) * stretch,
      y + spineWave + lift + tailBias + shoulderBias,
      size + (index === beastSeed.index % 7 ? 1.1 : 0),
    ] as RuntimeCoreStar;
  });
}

type CosmicNarrativePhase = "field_intro" | "seed_visible" | "beast_guide" | "node_active" | "node_complete";

type VisualDepthState = "background_calm" | "structural_activation" | "entity_emergence" | "interaction_focus" | "crystallization";
type VisualPrimitive = "BEAST" | "PRESSURE" | "DIMENSION" | "PARTICLE";
type VisualPrimitiveState = Readonly<{
  primitive: VisualPrimitive;
  intensity: number;
  meaning: "state_container" | "tension_metric" | "behavioral_structure" | "execution_feedback";
}>;
type VisualState = Readonly<{
  nodeIndex: number;
  visualDepthState: VisualDepthState;
  colorTemperature: string;
  spatialComposition: "calm_state" | "blackhole_activation" | "beast_emergence" | "node_focus_collapse" | "supernova_crystallization";
  focalDimension: SixSpaceId;
  primitives: {
    BEAST: VisualPrimitiveState & {
      coherence: number;
      stability: number;
    };
    PRESSURE: VisualPrimitiveState & {
      instability: number;
      urgency: number;
    };
    DIMENSION: VisualPrimitiveState & {
      activeDimension: SixSpaceId;
      state: "active" | "dormant" | "destabilized";
    };
    PARTICLE: VisualPrimitiveState & {
      transitionEnergy: number;
      nodeActivity: number;
    };
  };
  zDepth: {
    background: number;
    structural: number;
    entity: number;
    interaction: number;
    narrative: number;
  };
  timeline: {
    current: "T0.0" | "T0.95" | "T2.4" | "T3.6" | "completion";
    label: string;
  };
}>;

type BehaviorSignal = "NODE_PROGRESS" | "NODE_STALL" | "NODE_BREAKTHROUGH" | "COMPLETION_EVENT";
type PressureState = "LOW" | "MEDIUM" | "HIGH";
type EmotionalState = "CALM" | "TENSION" | "STRUGGLE" | "BREAKTHROUGH" | "CRYSTALLIZATION";
type AssetTrigger = "NONE" | "SEED_ASSET" | "EMOTIONAL_PEAK_ASSET" | "64_HEXAGRAM_CRYSTAL_ASSET";
type MonetizationEvent = "NONE" | "UNLOCK_ENHANCEMENT_OFFER" | "ASSET_UPGRADE_OFFER" | "HOURGLASS_INVERSION_OFFER";
type ValueFlowState = Readonly<{
  behaviorSignals: readonly BehaviorSignal[];
  pressureState: PressureState;
  emotionalState: EmotionalState;
  assetTrigger: AssetTrigger;
  monetizationEvent: MonetizationEvent;
  hourglassLoopClosed: boolean;
  nonInvasive: true;
}>;
type ExperienceStage = "PRESSURE" | "AWARENESS" | "ACTION" | "TRANSFORMATION" | "CRYSTAL";
type ExperiencePrimaryFocus = "PRESSURE_FIELD" | "PRESSURE_AND_BEAST" | "BEAST_AND_DIMENSION" | "DIMENSION_FLOW" | "CRYSTALLIZATION";
type ExperienceState = Readonly<{
  stage: ExperienceStage;
  primaryFocus: ExperiencePrimaryFocus;
  loopLabel: string;
  headline: string;
  supportingCopy: string;
  pressureCopy: string;
  beastCopy: string;
  nodeCopy: {
    title: string;
    text: string;
    actionText: string;
  };
  crystalCopy: string;
}>;

const SIX_DIMENSION_RESPONSE_COPY: Record<SixSpaceId, string> = {
  body: "身体先留下了反应。",
  emotion: "情绪开始浮出水面。",
  thought: "念头正在聚焦。",
  action: "行动的方向露出来了。",
  memory: "旧痕被照见。",
  goal: "真正想守住的东西出现了。",
};
type ProductRuntimeDefinition = Readonly<{
  officialDefinition: string;
  threeSecondModel: "压力种子已锁定 → 六维传导 → 惯性反应显影";
  experienceLoop: readonly [
    "压力种子已锁定",
    "进入六维传导",
    "读取惯性反应",
    "完成六维显影",
    "沉积为结晶",
  ];
  onboardingFlow: readonly [
    "确认当前压力种子",
    "进入六维传导",
    "逐维读取惯性反应",
    "完成后形成结晶",
  ];
  userPerception: readonly [
    "压力种子入口",
    "六维传导场",
    "惯性反应显影",
    "结晶沉积过程",
  ];
  positioning: "压力种子六维传导系统";
}>;

const GUANYAO_PRODUCT_RUNTIME_DEFINITION = Object.freeze({
  officialDefinition:
    "观爻将已锁定的压力种子送入六维传导，读取现实压力下的惯性反应，并在完成后沉积为结晶。",
  threeSecondModel: "压力种子已锁定 → 六维传导 → 惯性反应显影",
  experienceLoop: Object.freeze([
    "压力种子已锁定",
    "进入六维传导",
    "读取惯性反应",
    "完成六维显影",
    "沉积为结晶",
  ]),
  onboardingFlow: Object.freeze([
    "确认当前压力种子",
    "进入六维传导",
    "逐维读取惯性反应",
    "完成后形成结晶",
  ]),
  userPerception: Object.freeze([
    "压力种子入口",
    "六维传导场",
    "惯性反应显影",
    "结晶沉积过程",
  ]),
  positioning: "压力种子六维传导系统",
} satisfies ProductRuntimeDefinition);

const VISUAL_TIMELINE_SYNC = Object.freeze({
  calm: "T0.0 -> calm state",
  blackhole: "T0.95 -> blackhole activation",
  beast: "T2.4 -> beast emergence",
  node: "T3.6 -> node focus collapse",
  completion: "completion -> supernova crystallization",
});

function resolveVisualColorTemperature(dimension: SixSpaceId, beastTone: ExecutionSnapshot["beast"]["tone"]) {
  if (beastTone === "sovereign") return "222,196,154";
  if (beastTone === "charge") return "199,169,107";
  if (beastTone === "strain") return "176,210,206";

  const toneByDimension: Record<SixSpaceId, string> = {
    body: "176,210,206",
    emotion: "199,169,107",
    thought: "184,200,224",
    action: "222,196,154",
    memory: "190,178,214",
    goal: "210,190,150",
  };

  return toneByDimension[dimension];
}

function resolveVisualState(snapshot: ExecutionSnapshot, projection: RuntimeProjection): VisualState {
  const nodeProgress = Math.min(1, Math.max(0, snapshot.node.completed.length / 6));
  const resonance = Math.min(1, Math.max(0, snapshot.beast.resonance));
  const pressureIntensity = Math.min(1, snapshot.seed.intensity ?? 0.32);
  const visualDepthState: VisualDepthState =
    snapshot.runtime.uiPhase === "COMPLETE"
      ? "crystallization"
      : snapshot.runtime.uiPhase === "NODE_RUNNING"
        ? "interaction_focus"
        : snapshot.runtime.uiPhase === "DIMENSION_LOCKED"
          ? "entity_emergence"
          : snapshot.runtime.uiPhase === "SEED_ACTIVE"
            ? "structural_activation"
            : "background_calm";
  const spatialComposition: VisualState["spatialComposition"] =
    visualDepthState === "crystallization"
      ? "supernova_crystallization"
      : visualDepthState === "interaction_focus"
        ? "node_focus_collapse"
        : visualDepthState === "entity_emergence"
          ? "beast_emergence"
          : visualDepthState === "structural_activation"
            ? "blackhole_activation"
            : "calm_state";
  const timeline: VisualState["timeline"] =
    visualDepthState === "crystallization"
      ? { current: "completion", label: VISUAL_TIMELINE_SYNC.completion }
      : visualDepthState === "interaction_focus"
        ? { current: "T3.6", label: VISUAL_TIMELINE_SYNC.node }
        : visualDepthState === "entity_emergence"
          ? { current: "T2.4", label: VISUAL_TIMELINE_SYNC.beast }
          : visualDepthState === "structural_activation"
            ? { current: "T0.95", label: VISUAL_TIMELINE_SYNC.blackhole }
            : { current: "T0.0", label: VISUAL_TIMELINE_SYNC.calm };

  return Object.freeze({
    nodeIndex: snapshot.node.current,
    visualDepthState,
    colorTemperature: resolveVisualColorTemperature(projection.currentPrimarySpaceId, snapshot.beast.tone),
    spatialComposition,
    focalDimension: projection.currentPrimarySpaceId,
    primitives: {
      BEAST: {
        primitive: "BEAST",
        meaning: "state_container",
        intensity: pressureIntensity,
        coherence: resonance,
        stability: snapshot.beast.tone === "sovereign" ? 1 : snapshot.beast.tone === "charge" ? 0.74 : snapshot.beast.tone === "calm" ? 0.58 : 0.32,
      },
      PRESSURE: {
        primitive: "PRESSURE",
        meaning: "tension_metric",
        intensity: pressureIntensity,
        instability: snapshot.runtime.enginePhase === "COMPLETE" ? 0 : Math.min(1, pressureIntensity * (1 - nodeProgress * 0.42)),
        urgency: snapshot.runtime.enginePhase === "NODE_RUNNING" ? pressureIntensity : pressureIntensity * 0.72,
      },
      DIMENSION: {
        primitive: "DIMENSION",
        meaning: "behavioral_structure",
        intensity: visualDepthState === "background_calm" ? 0.28 : 0.62 + nodeProgress * 0.28,
        activeDimension: projection.currentPrimarySpaceId,
        state: visualDepthState === "background_calm" ? "dormant" : pressureIntensity > 0.72 && nodeProgress < 0.34 ? "destabilized" : "active",
      },
      PARTICLE: {
        primitive: "PARTICLE",
        meaning: "execution_feedback",
        intensity: Math.min(1, 0.18 + nodeProgress * 0.54 + resonance * 0.28),
        transitionEnergy: visualDepthState === "crystallization" ? 1 : visualDepthState === "interaction_focus" ? nodeProgress : resonance * 0.42,
        nodeActivity: nodeProgress,
      },
    },
    zDepth: {
      background: 0,
      structural: 1,
      entity: 2,
      interaction: 3,
      narrative: 4,
    },
    timeline,
  } satisfies VisualState);
}

function resolveBehaviorSignals(snapshot: ExecutionSnapshot): readonly BehaviorSignal[] {
  const signals: BehaviorSignal[] = [];
  const completedNodeCount = snapshot.node.completed.length;

  if (completedNodeCount > 0) signals.push("NODE_PROGRESS");
  if (snapshot.node.locked || (snapshot.runtime.enginePhase === "NODE_RUNNING" && completedNodeCount === 0)) {
    signals.push("NODE_STALL");
  }
  if (snapshot.runtime.enginePhase === "NODE_RUNNING" && completedNodeCount > 0 && completedNodeCount < 6) {
    signals.push("NODE_BREAKTHROUGH");
  }
  if (snapshot.runtime.enginePhase === "COMPLETE" || completedNodeCount >= 6) signals.push("COMPLETION_EVENT");

  return Object.freeze(signals);
}

function resolveValuePressureState(snapshot: ExecutionSnapshot, behaviorSignals: readonly BehaviorSignal[]): PressureState {
  const seedIntensity = Math.min(1, Math.max(0, snapshot.seed.intensity ?? 0));
  const structuralStallBoost = behaviorSignals.includes("NODE_STALL") ? 0.22 : 0;
  const externalConflictBoost = snapshot.seed.category ? 0.08 : 0;
  const pressureScore = Math.min(1, seedIntensity + structuralStallBoost + externalConflictBoost);

  if (pressureScore >= 0.72) return "HIGH";
  if (pressureScore >= 0.38) return "MEDIUM";
  return "LOW";
}

function resolveValueEmotionalState({
  pressureState,
  completedNodeCount,
  enginePhase,
}: {
  pressureState: PressureState;
  completedNodeCount: number;
  enginePhase: ExecutionSnapshot["runtime"]["enginePhase"];
}): EmotionalState {
  if (enginePhase === "COMPLETE" || completedNodeCount >= 6) return "CRYSTALLIZATION";
  if (completedNodeCount >= 5) return "BREAKTHROUGH";
  if (pressureState === "HIGH") return "STRUGGLE";
  if (pressureState === "MEDIUM") return "TENSION";
  return "CALM";
}

function resolveAssetTrigger(snapshot: ExecutionSnapshot): AssetTrigger {
  const completedNodeCount = snapshot.node.completed.length;

  if (snapshot.runtime.enginePhase === "COMPLETE" || completedNodeCount >= 6) return "64_HEXAGRAM_CRYSTAL_ASSET";
  if (completedNodeCount >= 5) return "EMOTIONAL_PEAK_ASSET";
  if (completedNodeCount >= 3) return "SEED_ASSET";
  return "NONE";
}

function resolveMonetizationEvent({
  emotionalState,
  pressureState,
  completedNodeCount,
  behaviorSignals,
}: {
  emotionalState: EmotionalState;
  pressureState: PressureState;
  completedNodeCount: number;
  behaviorSignals: readonly BehaviorSignal[];
}): MonetizationEvent {
  if (emotionalState === "BREAKTHROUGH" && completedNodeCount === 5) return "UNLOCK_ENHANCEMENT_OFFER";
  if (emotionalState === "CRYSTALLIZATION" && completedNodeCount >= 6) return "ASSET_UPGRADE_OFFER";
  if (pressureState === "HIGH" && behaviorSignals.includes("NODE_STALL")) return "HOURGLASS_INVERSION_OFFER";
  return "NONE";
}

function resolveValueFlow(snapshot: ExecutionSnapshot): ValueFlowState {
  const behaviorSignals = resolveBehaviorSignals(snapshot);
  const completedNodeCount = snapshot.node.completed.length;
  const pressureState = resolveValuePressureState(snapshot, behaviorSignals);
  const emotionalState = resolveValueEmotionalState({
    pressureState,
    completedNodeCount,
    enginePhase: snapshot.runtime.enginePhase,
  });

  return Object.freeze({
    behaviorSignals,
    pressureState,
    emotionalState,
    assetTrigger: resolveAssetTrigger(snapshot),
    monetizationEvent: resolveMonetizationEvent({
      emotionalState,
      pressureState,
      completedNodeCount,
      behaviorSignals,
    }),
    hourglassLoopClosed: true,
    nonInvasive: true,
  } satisfies ValueFlowState);
}

function resolveExperienceState(snapshot: ExecutionSnapshot, visualState: VisualState): ExperienceState {
  const completedNodeCount = snapshot.node.completed.length;
  const nodeNumber = Math.min(6, Math.max(1, snapshot.node.current));
  const stage: ExperienceStage =
    snapshot.runtime.enginePhase === "COMPLETE" || completedNodeCount >= 6
      ? "CRYSTAL"
      : completedNodeCount >= 5
        ? "TRANSFORMATION"
        : snapshot.runtime.uiPhase === "NODE_RUNNING"
          ? "ACTION"
          : snapshot.runtime.uiPhase === "DIMENSION_LOCKED"
            ? "AWARENESS"
            : "PRESSURE";
  const primaryFocus: ExperiencePrimaryFocus =
    stage === "CRYSTAL"
      ? "CRYSTALLIZATION"
      : stage === "TRANSFORMATION" || stage === "ACTION"
        ? "DIMENSION_FLOW"
        : stage === "AWARENESS"
          ? "BEAST_AND_DIMENSION"
          : visualState.timeline.current === "T0.95"
            ? "PRESSURE_AND_BEAST"
            : "PRESSURE_FIELD";
  const nodeCopy = {
    title: `第 ${nodeNumber} 维正在显影`,
    text: SIX_DIMENSION_RESPONSE_COPY[visualState.focalDimension] ?? "这一层，留下了痕迹。",
    actionText: "你走过了这一层。",
  };

  if (stage === "CRYSTAL") {
    return Object.freeze({
      stage,
      primaryFocus,
      loopLabel: GUANYAO_PRODUCT_RUNTIME_DEFINITION.threeSecondModel,
      headline: "六维传导已完成。",
      supportingCopy: "本局上下文完整后，结晶会成形。",
      pressureCopy: "这一颗压力已经穿过六维。",
      beastCopy: "反应已进入结晶候选态。",
      nodeCopy: {
        title: "六维传导已完成",
        text: "你走完了六层。",
        actionText: "本局正在等待结晶成形。",
      },
      crystalCopy: "你走完了六层，本局正在等待结晶成形。",
    });
  }

  if (stage === "TRANSFORMATION") {
    return Object.freeze({
      stage,
      primaryFocus,
      loopLabel: GUANYAO_PRODUCT_RUNTIME_DEFINITION.threeSecondModel,
      headline: "六维传导正在收束。",
      supportingCopy: "反应即将完成显影，正在沉积成可保存的形状。",
      pressureCopy: "压力种子正在进入传导末段。",
      beastCopy: "惯性反应正在趋稳。",
      nodeCopy,
      crystalCopy: "尚未形成结晶。",
    });
  }

  if (stage === "ACTION") {
    return Object.freeze({
      stage,
      primaryFocus,
      loopLabel: GUANYAO_PRODUCT_RUNTIME_DEFINITION.threeSecondModel,
      headline: "本局开始显影。",
      supportingCopy: "每一次轻触，只看见一维惯性反应。",
      pressureCopy: "压力种子正在穿过当前维度。",
      beastCopy: "惯性反应正在随触点显影。",
      nodeCopy,
      crystalCopy: "完成六维后，反应会沉积成一枚结晶。",
    });
  }

  if (stage === "AWARENESS") {
    return Object.freeze({
      stage,
      primaryFocus,
      loopLabel: GUANYAO_PRODUCT_RUNTIME_DEFINITION.threeSecondModel,
      headline: "这一颗压力，被看见了。",
      supportingCopy: "它将穿过身体、情绪、思想、行动、记忆与动机。",
      pressureCopy: "这一颗压力，被看见了。",
      beastCopy: "六维传导即将展开。",
      nodeCopy,
      crystalCopy: "完成六维后，反应会沉积成一枚结晶。",
    });
  }

  return Object.freeze({
    stage,
    primaryFocus,
    loopLabel: GUANYAO_PRODUCT_RUNTIME_DEFINITION.threeSecondModel,
    headline: "你的压力正在穿过你。",
    supportingCopy: "本局开始显出你在现实压力下的惯性反应。",
    pressureCopy: "压力种子正在进入。",
    beastCopy: "惯性反应即将显影。",
    nodeCopy,
    crystalCopy: "尚未形成结晶。",
  });
}

function CosmicPageStarField() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.5 }}>
      {Array.from({ length: 42 }).map((_, index) => (
        <span
          key={index}
          style={{
            position: "absolute",
            left: `${4 + ((index * 19) % 92)}%`,
            top: `${5 + ((index * 31) % 88)}%`,
            width: index % 9 === 0 ? 3 : 2,
            height: index % 9 === 0 ? 3 : 2,
            borderRadius: 999,
            background: index % 6 === 0 ? "rgba(199,169,107,0.5)" : "rgba(245,245,245,0.32)",
            boxShadow: index % 6 === 0 ? "0 0 12px rgba(199,169,107,0.32)" : "0 0 8px rgba(245,245,245,0.18)",
          }}
        />
      ))}
    </div>
  );
}

function CosmicFieldKeyframes() {
  return (
    <style>{`
      @keyframes gy-nebula-drift {
        0%, 100% { transform: translate3d(-1%, -1%, 0) scale(1); opacity: 0.48; }
        50% { transform: translate3d(1%, 1%, 0) scale(1.04); opacity: 0.68; }
      }
      @keyframes gy-blackhole-spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
      }
      @keyframes gy-stardust-drift {
        0%, 100% { transform: translateX(-2px); opacity: 0.42; }
        50% { transform: translateX(4px); opacity: 0.78; }
      }
      @keyframes gy-petal-bloom {
        0% { transform: translate(-50%, -50%) rotate(var(--petal-rotate)) scale(0.92); opacity: 0.62; }
        45% { transform: translate(-50%, -50%) rotate(var(--petal-rotate)) scale(1.08); opacity: 1; }
        100% { transform: translate(-50%, -50%) rotate(var(--petal-rotate)) scale(1); opacity: 0.88; }
      }
      @keyframes gy-petal-float {
        0%, 100% { transform: translate(-50%, -50%) rotate(var(--petal-rotate)) scale(1); }
        50% { transform: translate(-50%, calc(-50% - 4px)) rotate(var(--petal-rotate)) scale(1.03); }
      }
      @keyframes gy-pollen-rise {
        0% { transform: translate(-50%, -50%) scale(0.2); opacity: 0; }
        25% { opacity: 1; }
        100% { transform: translate(calc(-50% + var(--pollen-x)), calc(-50% + var(--pollen-y))) scale(1); opacity: 0; }
      }
      @keyframes gy-node-pulse {
        0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.82; }
        50% { transform: translate(-50%, -50%) scale(1.16); opacity: 1; }
      }
      @keyframes gy-starbeast-ignite {
        0% { opacity: 0.18; transform: translate(-50%, -50%) scale(0.72); }
        55% { opacity: 1; transform: translate(-50%, -50%) scale(1.18); }
        100% { opacity: 0.86; transform: translate(-50%, -50%) scale(1); }
      }
      @keyframes gy-starbeast-line {
        0% { stroke-dashoffset: 220; opacity: 0; }
        100% { stroke-dashoffset: 0; opacity: 1; }
      }
      @keyframes gy-starbeast-breathe {
        0%, 100% { transform: translate(-50%, -50%) scale(0.98); opacity: 0.72; }
        50% { transform: translate(-50%, calc(-50% - 3px)) scale(1.03); opacity: 0.92; }
      }
      @keyframes gy-starbeast-ripple {
        0% { transform: translate(-50%, -50%) scale(0.92); opacity: 0.34; }
        100% { transform: translate(-50%, -50%) scale(1.32); opacity: 0; }
      }
      @keyframes gy-starbeast-dust {
        0%, 100% { transform: translate(-50%, -50%) scale(0.82); opacity: 0.36; }
        50% { transform: translate(calc(-50% + 2px), calc(-50% - 2px)) scale(1.08); opacity: 0.86; }
      }
      @keyframes gy-starbeast-inner-breathe {
        0%, 100% { transform: translate(-50%, -50%) scale(0.72); opacity: 0.24; }
        50% { transform: translate(-50%, -50%) scale(1.08); opacity: 0.72; }
      }
      @keyframes gy-copy-fade-in {
        from { opacity: 0; transform: translateY(6px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `}</style>
  );
}

function CosmicNebulaScene({ toneColor }: { toneColor: string }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: "-10%",
        background:
          `radial-gradient(circle at 28% 30%, rgba(${toneColor},0.1), transparent 24%), radial-gradient(circle at 74% 62%, rgba(120,92,150,0.12), transparent 28%), radial-gradient(circle at 50% 50%, rgba(176,210,206,0.08), transparent 34%)`,
        filter: "blur(12px)",
        animation: "gy-nebula-drift 8s ease-in-out infinite",
        pointerEvents: "none",
      }}
    />
  );
}

function CosmicAmbientStars() {
  return (
    <div style={{ position: "absolute", inset: 0, opacity: 0.38, pointerEvents: "none" }}>
      {Array.from({ length: 28 }).map((_, index) => {
        const left = 8 + ((index * 17) % 84);
        const top = 10 + ((index * 29) % 78);
        return (
          <span
            key={index}
            style={{
              position: "absolute",
              left: `${left}%`,
              top: `${top}%`,
              width: index % 7 === 0 ? 3 : 2,
              height: index % 7 === 0 ? 3 : 2,
              borderRadius: 999,
              background: "rgba(245,245,245,0.62)",
              boxShadow: "0 0 10px rgba(245,245,245,0.36)",
            }}
          />
        );
      })}
    </div>
  );
}

function BlackholeVortexScene({ toneColor, visible, status }: { toneColor: string; visible: boolean; status: string }) {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "32%",
        width: "78%",
        minHeight: 108,
        transform: "translateX(-50%)",
        display: visible ? "grid" : "none",
        placeItems: "center",
        color: "rgba(245,245,245,0.86)",
        pointerEvents: "none",
        textAlign: "center",
        animation: "gy-copy-fade-in 360ms ease both",
      }}
    >
      <span
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 124,
          height: 124,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(5,6,7,0.92) 0 27%, rgba(40,22,64,0.72) 44%, rgba(199,169,107,0.1) 58%, transparent 72%)",
          boxShadow: "inset 0 0 32px rgba(5,6,7,0.9), 0 0 38px rgba(80,58,120,0.34)",
        }}
      />
      <span
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 148,
          height: 148,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          border: "1px solid rgba(199,169,107,0.12)",
          borderTopColor: "rgba(176,210,206,0.28)",
          animation: "gy-blackhole-spin 12s linear infinite",
        }}
      />
      <span
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          placeItems: "center",
          gap: 6,
          width: "100%",
          maxWidth: 188,
          color: "rgba(245,245,245,0.82)",
          fontSize: 12,
          lineHeight: 1.46,
          fontWeight: 520,
          textShadow: `0 0 16px rgba(${toneColor},0.18)`,
          animation: "gy-stardust-drift 4s ease-in-out infinite",
        }}
      >
        <span>{status}</span>
      </span>
    </div>
  );
}

function NodeProgressionPanel({
  visible,
  toneColor,
  activeNode,
}: {
  visible: boolean;
  toneColor: string;
  activeNode: { title: string; text: string; actionText: string };
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: 22,
        right: 22,
        bottom: 18,
        gap: 6,
        pointerEvents: "none",
        padding: "11px 13px 10px",
        borderRadius: 14,
        background: "linear-gradient(180deg, rgba(5,6,7,0.5), rgba(5,6,7,0.18))",
        border: `1px solid rgba(${toneColor},0.14)`,
        backdropFilter: "blur(4px)",
        display: visible ? "grid" : "none",
        animation: "gy-copy-fade-in 360ms ease both",
      }}
    >
      <GuanyaoText size="eyebrow" tone="gold">
        {activeNode.title}
      </GuanyaoText>
      <p style={{ margin: 0, whiteSpace: "pre-line", color: "rgba(245,245,245,0.76)", fontSize: 12, lineHeight: 1.46 }}>
        {activeNode.text}
      </p>
      <GuanyaoText size="eyebrow" tone="gold">
        {activeNode.actionText}
      </GuanyaoText>
    </div>
  );
}

function StarFlowerCoreRepresentation({
  visible,
  activeNodeIndex,
  nodeCount,
  coreReadiness,
  coreTone,
  coreGlow,
}: {
  visible: boolean;
  activeNodeIndex: number;
  nodeCount: number;
  coreReadiness: number;
  coreTone: string;
  coreGlow: number;
}) {
  return (
    <div
      aria-hidden="true"
      data-visual-primitive="DIMENSION"
      data-visual-layer="dimension-six-node-core"
      style={{
        position: "absolute",
        left: "50%",
        top: "57%",
        width: 104 + coreReadiness * 14,
        height: 104 + coreReadiness * 14,
        transform: `translate(-50%, -50%) scale(${visible ? 1 : 0.9})`,
        pointerEvents: "none",
        opacity: visible ? 0.38 + coreReadiness * 0.24 : 0,
        filter: `drop-shadow(0 0 ${14 + coreReadiness * 12}px rgba(${coreTone},${coreGlow}))`,
        transition: "opacity 360ms ease, width 360ms ease, height 360ms ease, transform 360ms ease, filter 360ms ease",
      }}
    >
      <span
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 18 + coreReadiness * 8,
          height: 18 + coreReadiness * 8,
          borderRadius: 999,
          transform: "translate(-50%, -50%)",
          background: `rgba(${coreTone},${0.32 + coreReadiness * 0.16})`,
          boxShadow: `0 0 ${18 + coreReadiness * 20}px rgba(${coreTone},${coreGlow})`,
          transition: "width 360ms ease, height 360ms ease, background 360ms ease, box-shadow 360ms ease",
        }}
      />
      {Array.from({ length: 6 }).map((_, index) => {
        const angle = -90 + index * 60;
        const isComplete = index < activeNodeIndex;
        const isCurrent = index === Math.min(activeNodeIndex, nodeCount - 1);
        const nodeAlpha = isComplete ? 0.62 : isCurrent ? 0.78 : 0.2;
        const nodeSize = isCurrent ? 9 : isComplete ? 7 : 5;
        return (
          <span
            key={`flower-core-${index}`}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: nodeSize,
              height: 26 + coreReadiness * 13,
              borderRadius: 999,
              transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(${-28 - coreReadiness * 8}px)`,
              transformOrigin: `50% ${28 + coreReadiness * 8}px`,
              background: `linear-gradient(180deg, rgba(${coreTone},${nodeAlpha}), rgba(${coreTone},0.03))`,
              boxShadow: isComplete || isCurrent ? `0 0 ${12 + coreReadiness * 10}px rgba(${coreTone},${coreGlow})` : "none",
              transition: "width 360ms ease, height 360ms ease, transform 360ms ease, background 360ms ease, box-shadow 360ms ease",
            }}
          />
        );
      })}
    </div>
  );
}

function EnergyReturnFlow({
  visible,
  activeNodeIndex,
  coreReadiness,
  coreTone,
  coreGlow,
}: {
  visible: boolean;
  activeNodeIndex: number;
  coreReadiness: number;
  coreTone: string;
  coreGlow: number;
}) {
  if (!visible || activeNodeIndex <= 0) return null;

  return (
    <div
      aria-hidden="true"
      data-visual-primitive="PARTICLE"
      data-visual-layer="particle-energy-return-flow"
      style={{
        position: "absolute",
        left: "50%",
        top: "45%",
        width: 42,
        height: 104,
        transform: "translateX(-50%)",
        pointerEvents: "none",
        opacity: 0.34 + coreReadiness * 0.18,
      }}
    >
      {Array.from({ length: Math.min(6, activeNodeIndex + 1) }).map((_, index) => (
        <span
          key={`return-flow-${index}`}
          style={{
            "--pollen-x": `${(index % 2 === 0 ? -1 : 1) * (4 + index)}px`,
            "--pollen-y": `${-44 - index * 6}px`,
            position: "absolute",
            left: `${44 + ((index * 7) % 16)}%`,
            top: `${76 - index * 13}%`,
            width: 2 + (index % 2),
            height: 2 + (index % 2),
            borderRadius: 999,
            background: `rgba(${coreTone},${0.34 + coreReadiness * 0.18})`,
            boxShadow: `0 0 10px rgba(${coreTone},${coreGlow})`,
            animation: `gy-pollen-rise ${900 + index * 90}ms ease-out infinite ${index * 120}ms`,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}

function SixDimensionWheel({
  configs,
  activeConfig,
  petalStates,
  toneColor,
  shortPetalNames,
}: {
  configs: SixSpaceConfig[];
  activeConfig: SixSpaceConfig;
  petalStates: Record<SixSpaceId, CosmicPetalState>;
  toneColor: string;
  shortPetalNames: string[];
}) {
  return (
    <>
      {configs.map((config, index) => {
        const angle = -90 + index * 60;
        const rad = (angle * Math.PI) / 180;
        const isActive = config.id === activeConfig.id;
        const state = petalStates[config.id];
        const isBlooming = state === "blooming";
        const petalWidth = isActive ? 72 : isBlooming ? 46 : 42;
        const petalHeight = isActive ? 29 : isBlooming ? 19 : 17;
        const petalOpacity = isActive ? 1 : isBlooming ? 0.5 : 0.36;
        const petalGlow = isActive ? `0 0 30px rgba(${toneColor},0.3), 0 0 7px rgba(245,245,245,0.1)` : isBlooming ? `0 0 12px rgba(${toneColor},0.1)` : "none";
        const petalBorderAlpha = isActive ? 0.58 : isBlooming ? 0.2 : 0.11;
        const petalToneAlpha = isActive ? 0.34 : isBlooming ? 0.11 : 0.055;
        const petalLightAlpha = isActive ? 0.2 : isBlooming ? 0.1 : 0.028;
        const left = 50 + Math.cos(rad) * 32;
        const top = 58 + Math.sin(rad) * 18;

        return (
          <span
            key={config.id}
            data-visual-primitive="DIMENSION"
            data-visual-layer="dimension-six-space-petal"
            style={{
              "--petal-rotate": `${angle + 90}deg`,
              position: "absolute",
              left: `${left}%`,
              top: `${top}%`,
              width: petalWidth,
              height: petalHeight,
              borderRadius: "50%",
              transform: `translate(-50%, -50%) rotate(${angle + 90}deg)`,
              background: `linear-gradient(90deg, rgba(${toneColor},${petalToneAlpha}), rgba(245,245,245,${petalLightAlpha}))`,
              border: `1px solid rgba(${toneColor},${petalBorderAlpha})`,
              boxShadow: petalGlow,
              opacity: petalOpacity,
              pointerEvents: "none",
              animation: "gy-petal-float 4.6s ease-in-out infinite",
              transition: "width 320ms ease, height 320ms ease, opacity 320ms ease, border-color 320ms ease, box-shadow 320ms ease, background 320ms ease",
            } as CSSProperties}
          >
            <span
              style={{
                display: "block",
                transform: `rotate(${-angle - 90}deg)`,
                color: isActive ? "rgba(245,245,245,0.86)" : isBlooming ? "rgba(245,245,245,0.38)" : "rgba(245,245,245,0.24)",
                fontSize: isActive ? 10 : 9,
                fontWeight: isActive ? 650 : 500,
                lineHeight: `${petalHeight}px`,
                textAlign: "center",
                letterSpacing: "0.04em",
                textShadow: isActive ? `0 0 12px rgba(${toneColor},0.28)` : "none",
                transition: "color 320ms ease, line-height 320ms ease, text-shadow 320ms ease",
              }}
            >
              {shortPetalNames[index]}
            </span>
          </span>
        );
      })}
    </>
  );
}

type BaiHuConstellationLayerProps = {
  toneColor: string;
  narrativePhase: CosmicNarrativePhase;
  activeNodeIndex: number;
  onCoreStarClick: () => void;
  coreStars: RuntimeCoreStar[];
  showInteractionHint: boolean;
};

function CoreStarInteractionLayer({
  coreStars,
  toneColor,
  reveal,
  nodeCharge,
  coreGlow,
  onCoreStarClick,
}: {
  coreStars: RuntimeCoreStar[];
  toneColor: string;
  reveal: number;
  nodeCharge: number;
  coreGlow: number;
  onCoreStarClick: () => void;
}) {
  return (
    <>
      {coreStars.map(([left, top, size], index) => (
        <span
          key={`core-${index}`}
          role="button"
          aria-label="轻触光点，读取这一维反应。"
          tabIndex={0}
          onClick={onCoreStarClick}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onCoreStarClick();
            }
          }}
          style={{
            position: "absolute",
            left: `${left}%`,
            top: `${top}%`,
            width: Math.max(28, size + nodeCharge * 1.8),
            height: Math.max(28, size + nodeCharge * 1.8),
            borderRadius: 999,
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, rgba(255,247,220,${0.54 + reveal * 0.36}) 0 ${Math.max(2, size / 2)}px, transparent ${Math.max(3, size / 2 + 1)}px)`,
            boxShadow: `0 0 ${10 + reveal * 14 + nodeCharge * 16}px rgba(${toneColor},${coreGlow})`,
            animation: `gy-starbeast-ignite 760ms ease both ${index * 90}ms`,
            cursor: "pointer",
            pointerEvents: "auto",
          }}
        />
      ))}
    </>
  );
}

function BaiHuConstellationLayer({
  toneColor,
  narrativePhase,
  activeNodeIndex,
  onCoreStarClick,
  coreStars,
  showInteractionHint,
}: BaiHuConstellationLayerProps) {
  const reveal = narrativePhase === "field_intro" ? 0.34 : narrativePhase === "seed_visible" ? 0.66 : 1;
  const bodyAlpha = narrativePhase === "beast_guide" || narrativePhase === "node_active" || narrativePhase === "node_complete" ? 0.82 : 0.2;
  const nodeCharge = Math.min(1, Math.max(0, activeNodeIndex / 6));
  const coreGlow = 0.26 + reveal * 0.24 + nodeCharge * 0.22;
  const coreLineAlpha = 0.04 + reveal * 0.14 + nodeCharge * 0.06;
  const headShape = [
    [7, 44, 1.7], [9, 39, 1.6], [12, 35, 1.7], [15, 32, 1.8], [19, 33, 1.6],
    [22, 36, 1.8], [24, 40, 1.7], [23, 44, 1.5], [20, 48, 1.5], [17, 51, 1.7],
    [13, 52, 1.6], [9, 50, 1.8], [5, 48, 1.4], [4, 43, 1.2], [6, 38, 1.3],
    [10, 34, 1.4], [13, 29, 1.5], [17, 29, 1.4], [21, 31, 1.3], [26, 37, 1.2],
    [6, 53, 1.2], [10, 56, 1.4], [15, 56, 1.5], [20, 53, 1.3], [20, 42, 3.3],
    [12, 41, 1.7], [14, 45, 1.6], [16, 39, 1.4], [18, 36, 1.3],
  ] as const;
  const headDust = headShape.map(([left, top, size], index) => ({
    left,
    top,
    size,
    delay: (index % 8) * 115,
    alpha: index === headShape.length - 1 ? 0.68 : 0.26 + ((index * 5) % 9) / 78,
  }));
  const backDust = Array.from({ length: 38 }).map((_, index) => {
    const t = index / 37;
    return {
      left: 24 + t * 59,
      top: 42 - Math.sin(t * Math.PI) * 16 + Math.sin(t * 14) * 1.2,
      size: 1.4 + (index % 4) * 0.25,
      delay: (index % 10) * 110,
      alpha: 0.2 + ((index * 7) % 8) / 86,
    };
  });
  const bellyDust = Array.from({ length: 18 }).map((_, index) => {
    const t = index / 17;
    return {
      left: 25 + t * 49,
      top: 56 + Math.sin(t * Math.PI) * 5 + Math.cos(t * 13) * 1.8,
      size: 1.2 + (index % 3) * 0.3,
      delay: (index % 9) * 125,
      alpha: 0.15 + ((index * 3) % 8) / 100,
    };
  });
  const legDust = [
    ...Array.from({ length: 9 }).map((_, index) => ({ left: 29 + index * 0.35 + Math.sin(index * 0.8) * 2, top: 56 + index * 3.4, group: 0 })),
    ...Array.from({ length: 8 }).map((_, index) => ({ left: 42 + index * 0.75 - Math.sin(index * 0.7) * 1.7, top: 55 + index * 3.3, group: 1 })),
    ...Array.from({ length: 10 }).map((_, index) => ({ left: 60 + index * 0.45 + Math.sin(index * 0.65) * 2.2, top: 55 + index * 3.6, group: 2 })),
    ...Array.from({ length: 8 }).map((_, index) => ({ left: 75 + index * 0.92 - Math.sin(index * 0.75) * 1.6, top: 53 + index * 3.2, group: 3 })),
  ].map((particle, index) => ({
    left: particle.left,
    top: particle.top,
    size: 1.25 + (particle.group % 2) * 0.34,
    delay: (index % 12) * 95,
    alpha: 0.18 + ((index * 4) % 8) / 96,
  }));
  const tailDust = Array.from({ length: 38 }).map((_, index) => {
    const t = index / 37;
    const angle = t * Math.PI * 1.92;
    return {
      left: 78 + Math.sin(angle) * 13 + t * 12,
      top: 42 - Math.sin(t * Math.PI) * 39 + Math.cos(angle) * 5,
      size: 1.1 + (index % 4) * 0.25,
      delay: (index % 10) * 105,
      alpha: 0.16 + ((index * 6) % 8) / 100,
    };
  });
  const tailTipDust = [
    [95, 21, 2.5],
    [97, 17, 1.7],
    [93, 14, 1.5],
    [90, 18, 1.3],
    [91, 24, 1.4],
  ] as const;
  const tailTipParticles = tailTipDust.map(([left, top, size], index) => ({
    left,
    top,
    size,
    delay: index * 130,
    alpha: index === 0 ? 0.54 : 0.24 + index * 0.04,
  }));
  const silhouetteDust = [...headDust, ...backDust, ...bellyDust, ...legDust, ...tailDust, ...tailTipParticles];
  const innerDust = Array.from({ length: 32 }).map((_, index) => ({
    left: 27 + ((index * 17) % 48),
    top: 39 + ((index * 19) % 19),
    size: 1.2 + (index % 3) * 0.45,
    delay: (index % 9) * 170,
    alpha: 0.08 + nodeCharge * 0.16 + ((index * 5) % 8) / 110,
  }));

  return (
    <div
      role="group"
      aria-label="压力种子六维传导入口。"
      data-visual-primitive="BEAST"
      data-visual-layer="beast-state-container"
      style={{
        position: "absolute",
        left: "50%",
        top: "18%",
        width: 242,
        height: 146,
        transform: "translate(-50%, -50%)",
        opacity: 0.62 + reveal * 0.3,
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "visible",
          filter: `drop-shadow(0 0 ${10 + nodeCharge * 14}px rgba(${toneColor},${coreGlow}))`,
        }}
      >
        <path
          d={coreStars.map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x} ${y}`).join(" ")}
          fill="none"
          stroke={`rgba(${toneColor},${coreLineAlpha})`}
          strokeWidth="0.42"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            animation:
              narrativePhase === "seed_visible" || narrativePhase === "beast_guide"
                ? "gy-starbeast-line 680ms ease-out both"
                : "none",
            }}
          />
      </svg>

      {silhouetteDust.map((particle, index) => (
        <span
          key={`silhouette-${index}`}
          style={{
            position: "absolute",
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: particle.size,
            height: particle.size,
            borderRadius: 999,
            transform: "translate(-50%, -50%)",
            background: `rgba(255,248,224,${particle.alpha + bodyAlpha * 0.34})`,
            boxShadow: `0 0 ${5 + nodeCharge * 5}px rgba(${toneColor},${0.14 + bodyAlpha * 0.16})`,
            animation: `gy-starbeast-dust 3.4s ease-in-out infinite ${particle.delay}ms`,
          }}
        />
      ))}

      {innerDust.map((particle, index) => (
        <span
          key={`inner-${index}`}
          style={{
            position: "absolute",
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: particle.size,
            height: particle.size,
            borderRadius: 999,
            transform: "translate(-50%, -50%)",
            background: `rgba(${toneColor},${particle.alpha + reveal * 0.08})`,
            boxShadow: `0 0 ${4 + nodeCharge * 8}px rgba(${toneColor},${0.12 + nodeCharge * 0.16})`,
            animation: `gy-starbeast-inner-breathe 4.2s ease-in-out infinite ${particle.delay}ms`,
          }}
        />
      ))}

      <CoreStarInteractionLayer
        coreStars={coreStars}
        toneColor={toneColor}
        reveal={reveal}
        nodeCharge={nodeCharge}
        coreGlow={coreGlow}
        onCoreStarClick={onCoreStarClick}
      />

      {showInteractionHint ? (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "50%",
            bottom: -8,
            transform: "translateX(-50%)",
            color: `rgba(255,248,224,${0.28 + reveal * 0.12})`,
            fontSize: 10,
            lineHeight: 1,
            letterSpacing: "0.08em",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            textShadow: `0 0 10px rgba(${toneColor},0.16)`,
          }}
        >
          轻触光点，读取这一维。
        </span>
      ) : null}

      <span
        style={{
          position: "absolute",
          left: "55%",
          top: "49%",
          width: 116 + nodeCharge * 18,
          height: 58 + nodeCharge * 12,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(ellipse, rgba(${toneColor},${0.08 + bodyAlpha * 0.12}), transparent 68%)`,
          filter: "blur(3px)",
          animation: "gy-starbeast-breathe 4.8s ease-in-out infinite",
        }}
      />

      {narrativePhase === "node_active" || narrativePhase === "node_complete" ? (
        <span
          style={{
            position: "absolute",
            left: "55%",
            top: "50%",
            width: 126 + nodeCharge * 18,
            height: 70 + nodeCharge * 10,
            borderRadius: "50%",
            border: `1px solid rgba(${toneColor},${0.18 + nodeCharge * 0.14})`,
            animation: "gy-starbeast-ripple 1.8s ease-out infinite",
          }}
        />
      ) : null}
    </div>
  );
}

function CosmicBotanicsField({
  configs,
  currentStep,
  activeDimensionStep,
  pressureSeedSurface,
  petalStates,
  pollenBursts,
  starbeast,
  starFlowerState,
  hexagramReadiness,
  activeNodeIndex,
  narrativePhase,
  onNodeBloom,
  coreStars,
  visualState,
  experienceState,
}: {
  configs: SixSpaceConfig[];
  currentStep: number;
  activeDimensionStep: number;
  pressureSeedSurface: string;
  petalStates: Record<SixSpaceId, CosmicPetalState>;
  pollenBursts: Record<SixSpaceId, number>;
  starbeast: StarbeastFeedback;
  starFlowerState: StarFlowerGrowthState;
  hexagramReadiness: number;
  activeNodeIndex: number;
  narrativePhase: CosmicNarrativePhase;
  onNodeBloom: () => void;
  coreStars: RuntimeCoreStar[];
  visualState: VisualState;
  experienceState: ExperienceState;
}) {
  const seedTone = pressureSeedSurface.length % 3;
  const toneColor = visualState.colorTemperature || (seedTone === 0 ? "199,169,107" : seedTone === 1 ? "222,196,154" : "176,210,206");
  const activeConfig = configs[Math.max(0, Math.min(configs.length - 1, activeDimensionStep - 1))] ?? configs[0];
  const activePetalState = activeConfig ? petalStates[activeConfig.id] : "active";
  const showBlackholeStatus = narrativePhase === "seed_visible" || narrativePhase === "beast_guide";
  const showPressureText = narrativePhase === "seed_visible" || narrativePhase === "beast_guide";
  const showBeastIntro = narrativePhase === "beast_guide";
  const showNodePanel = narrativePhase === "node_active" || narrativePhase === "node_complete";
  const shortPetalNames = ["身体", "情绪", "思维", "行为", "记忆", "目标"];
  const coreReadiness = Math.max(hexagramReadiness, activeNodeIndex / 6);
  const coreVisible = narrativePhase === "node_active" || narrativePhase === "node_complete";
  const coreGlow = 0.1 + visualState.primitives.PARTICLE.intensity * 0.14 + coreReadiness * 0.12;
  const coreTone = starFlowerState === "blooming" || starFlowerState === "rebirth" ? toneColor : "176,210,206";
  const pressureLayerOpacity = experienceState.primaryFocus === "PRESSURE_FIELD" ? 1 : experienceState.primaryFocus === "PRESSURE_AND_BEAST" ? 0.82 : 0.34;
  const beastLayerOpacity = experienceState.primaryFocus === "BEAST_AND_DIMENSION" ? 1 : experienceState.primaryFocus === "PRESSURE_AND_BEAST" ? 0.72 : experienceState.primaryFocus === "CRYSTALLIZATION" ? 0.62 : 0.5;
  const dimensionLayerOpacity = experienceState.primaryFocus === "DIMENSION_FLOW" ? 1 : experienceState.primaryFocus === "BEAST_AND_DIMENSION" ? 0.72 : experienceState.primaryFocus === "CRYSTALLIZATION" ? 0.76 : 0.38;
  const particleLayerOpacity = experienceState.primaryFocus === "CRYSTALLIZATION" ? 1 : experienceState.primaryFocus === "DIMENSION_FLOW" ? 0.78 : 0.42;

  return (
    <section
      aria-label="压力种子进入六维传导区"
      data-experience-layer="pure-visual-projection"
      data-visual-grammar="BEAST_PRESSURE_DIMENSION_PARTICLE"
      data-visual-depth-state={visualState.visualDepthState}
      data-visual-composition={visualState.spatialComposition}
      data-visual-timeline={visualState.timeline.current}
      data-visual-focal-dimension={visualState.focalDimension}
      data-experience-loop="压力种子_六维传导_惯性显影_结晶"
      data-experience-stage={experienceState.stage}
      data-experience-focus={experienceState.primaryFocus}
      style={{
        "--visual-beast-intensity": visualState.primitives.BEAST.intensity,
        "--visual-pressure-intensity": visualState.primitives.PRESSURE.intensity,
        "--visual-dimension-intensity": visualState.primitives.DIMENSION.intensity,
        "--visual-particle-intensity": visualState.primitives.PARTICLE.intensity,
        position: "relative",
        minHeight: 536,
        border: "1px solid rgba(199,169,107,0.16)",
        borderRadius: 24,
        overflow: "hidden",
        padding: "18px 16px",
        background:
          `radial-gradient(circle at 52% 24%, rgba(80,58,120,${0.12 + visualState.primitives.PRESSURE.intensity * 0.1}), transparent 28%), radial-gradient(circle at 50% 58%, rgba(${toneColor},${0.1 + visualState.primitives.BEAST.coherence * 0.08}), rgba(5,6,7,0.12) 36%, rgba(5,6,7,0.04) 100%)`,
        boxShadow:
          activePetalState === "blooming" || visualState.primitives.PARTICLE.transitionEnergy > 0
            ? `0 0 ${24 + visualState.primitives.PARTICLE.transitionEnergy * 18}px rgba(${toneColor},${0.1 + visualState.primitives.BEAST.coherence * 0.08})`
            : "none",
      } as CSSProperties}
    >
      <CosmicFieldKeyframes />
      <div data-visual-primitive="PARTICLE" data-visual-layer="particle-nebula-field" style={{ position: "absolute", inset: 0, zIndex: visualState.zDepth.background, pointerEvents: "none", opacity: particleLayerOpacity }}>
        <CosmicNebulaScene toneColor={toneColor} />
        <CosmicAmbientStars />
      </div>

      <div style={{ position: "absolute", inset: 0, zIndex: visualState.zDepth.entity, pointerEvents: coreVisible ? "auto" : "none", opacity: beastLayerOpacity }}>
        <BaiHuConstellationLayer
          toneColor={toneColor}
          narrativePhase={narrativePhase}
          activeNodeIndex={activeNodeIndex}
          onCoreStarClick={onNodeBloom}
          coreStars={coreStars}
          showInteractionHint={experienceState.primaryFocus !== "CRYSTALLIZATION"}
        />
      </div>

      <div data-visual-primitive="PRESSURE" data-visual-layer="pressure-blackhole-field" style={{ position: "absolute", inset: 0, zIndex: visualState.zDepth.structural, pointerEvents: "none", opacity: pressureLayerOpacity }}>
        <BlackholeVortexScene toneColor={toneColor} visible={showBlackholeStatus} status={experienceState.pressureCopy} />
      </div>

      <p
        data-visual-primitive="PRESSURE"
        data-visual-layer="pressure-text-field"
        style={{
          position: "absolute",
          left: 28,
          right: 28,
          top: "43%",
          zIndex: visualState.zDepth.narrative,
          margin: 0,
          color: "rgba(245,245,245,0.78)",
          fontSize: 13,
          lineHeight: 1.52,
          fontWeight: 560,
          textAlign: "center",
          pointerEvents: "none",
          display: showPressureText ? "block" : "none",
          animation: "gy-copy-fade-in 360ms ease both",
        }}
      >
        {experienceState.pressureCopy}
      </p>

      <div data-visual-primitive="PARTICLE" data-visual-layer="particle-node-feedback" style={{ position: "absolute", inset: 0, zIndex: visualState.zDepth.interaction, pointerEvents: "none" }}>
        <NodeProgressionPanel visible={showNodePanel} toneColor={toneColor} activeNode={experienceState.nodeCopy} />
      </div>

      <p
        data-visual-primitive="BEAST"
        data-visual-layer="beast-state-text"
        style={{
          position: "absolute",
          left: 22,
          right: 22,
          top: "47%",
          zIndex: visualState.zDepth.narrative,
          margin: 0,
          whiteSpace: "pre-line",
          color: `rgba(${toneColor},0.72)`,
          fontSize: 11,
          lineHeight: 1.5,
          pointerEvents: "none",
          display: showBeastIntro ? "block" : "none",
          animation: "gy-copy-fade-in 360ms ease both",
        }}
      >
        {experienceState.beastCopy}
      </p>

      <div style={{ position: "absolute", inset: 0, zIndex: visualState.zDepth.interaction, pointerEvents: "none", opacity: dimensionLayerOpacity }}>
        <StarFlowerCoreRepresentation
          visible={coreVisible}
          activeNodeIndex={activeNodeIndex}
          nodeCount={6}
          coreReadiness={coreReadiness}
          coreTone={coreTone}
          coreGlow={Math.min(1, coreGlow + visualState.primitives.PARTICLE.intensity * 0.04)}
        />

        <EnergyReturnFlow
          visible={coreVisible}
          activeNodeIndex={activeNodeIndex}
          coreReadiness={coreReadiness}
          coreTone={coreTone}
          coreGlow={Math.min(1, coreGlow + visualState.primitives.PARTICLE.intensity * 0.04)}
        />

        <SixDimensionWheel
          configs={configs}
          activeConfig={activeConfig}
          petalStates={petalStates}
          toneColor={toneColor}
          shortPetalNames={shortPetalNames}
        />
      </div>

    </section>
  );
}

type CrystalView = "MOLD" | "CARD";

function crystalDimensionLabel(value: string | undefined) {
  const labels: Record<string, string> = {
    body: "身体维度",
    emotion: "情绪维度",
    thought: "思维维度",
    behavior: "行动维度",
    memory: "记忆维度",
    motivation: "动机维度",
  };

  return labels[value ?? ""] ?? "六维结构";
}

function buildCrystalBehaviorReading(state: CurrentCrystalEndState) {
  const motherName = state.mother.motherCodeName || state.mother.lowerTrigram;
  const hexagramTitle = state.hexagram.hexagramName ?? state.hexagram.hexagramTitle ?? state.hexagram.hexagramCode ?? "本局卦码";
  const pressureField = `这一次压力来自${pressureFieldLabel(state.pressure.pressureField)}。`;
  const dimensionLine = state.transmission.primaryDimension
    ? `它优先沉积在${crystalDimensionLabel(state.transmission.primaryDimension)}上。`
    : "它已经穿过六维传导。";

  return [
    "这枚结晶不记录你的压力原句。",
    `它留下的是压力穿过你的${motherName}母码底盘后，在${hexagramTitle}中沉积出的行为结构。`,
    `${pressureField}${dimensionLine}`,
    "当外部压力升高时，你的力量会先收束，重新确认边界，再在更精准的坐标上保留下一次行动的可能。",
  ];
}

function CurrentCrystalEndStateFocus({ state }: { state: CurrentCrystalEndState }) {
  const hexagramTitle = state.hexagram.hexagramName ?? state.hexagram.hexagramTitle ?? state.hexagram.hexagramCode ?? "本局卦码";
  const [crystalView, setCrystalView] = useState<CrystalView>("MOLD");
  const [ringLiteState, setRingLiteState] = useState(() => readPersonalityRingLite());
  const savedEntry = ringLiteState.entries.find((entry) => entry.createdAt === state.createdAt);
  const behaviorReading = buildCrystalBehaviorReading(state);
  const isCardView = crystalView === "CARD";

  function saveToPersonalityRingLite() {
    const entry = createPersonalityRingLiteEntryFromCrystal(state);
    if (!entry) return;

    setRingLiteState(savePersonalityRingLiteEntry(entry));
  }

  return (
    <section
      aria-label={isCardView ? "本局卦码卡" : "本局结晶承接态"}
      data-crystal-view={crystalView}
      style={{
        minHeight: isCardView ? 548 : 424,
        position: "relative",
        display: "grid",
        placeItems: "center",
        padding: isCardView ? "16px 0 8px" : "22px 0 8px",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: isCardView ? "38%" : "45%",
          width: isCardView ? 330 : 292,
          height: isCardView ? 330 : 292,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(255,244,205,0.2) 0 7%, rgba(199,169,107,0.14) 8% 22%, rgba(199,169,107,0.05) 23% 48%, transparent 68%)",
          filter: "blur(0.2px)",
          boxShadow: "0 0 60px rgba(199,169,107,0.08)",
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: "45%",
          width: 108,
          height: 108,
          borderRadius: "42% 58% 45% 55%",
          transform: "translate(-50%, -50%) rotate(45deg)",
          border: "1px solid rgba(255,236,184,0.42)",
          background:
            "linear-gradient(135deg, rgba(255,246,216,0.3), rgba(199,169,107,0.08) 48%, rgba(245,245,245,0.04))",
          boxShadow: "0 0 34px rgba(199,169,107,0.2), inset 0 0 28px rgba(255,246,216,0.08)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "min(100%, 342px)",
          display: "grid",
          justifyItems: "center",
          textAlign: "center",
          gap: isCardView ? 11 : 13,
        }}
      >
        <GuanyaoText size="eyebrow" tone="gold">
          {isCardView ? "64 卦码资产" : "六维传导已完成"}
        </GuanyaoText>

        {isCardView ? (
          <article
            aria-label="本局卦码卡内容"
            style={{
              width: "100%",
              display: "grid",
              gap: 12,
              padding: "20px 18px",
              border: "1px solid rgba(255,226,158,0.26)",
              borderRadius: 22,
              background:
                "linear-gradient(160deg, rgba(255,226,158,0.1), rgba(199,169,107,0.04) 48%, rgba(5,6,7,0.38)), radial-gradient(circle at 50% 20%, rgba(255,244,205,0.14), transparent 44%)",
              boxShadow: "0 0 38px rgba(199,169,107,0.12), inset 0 0 26px rgba(255,246,216,0.04)",
            }}
          >
            <h1
              style={{
                margin: 0,
                color: "rgba(255,226,158,0.96)",
                fontSize: 30,
                lineHeight: 1.12,
                fontWeight: 720,
                letterSpacing: 0,
                textShadow: "0 0 24px rgba(199,169,107,0.2)",
              }}
            >
              {hexagramTitle}
            </h1>

            <strong
              style={{
                margin: "-2px 0 0",
                color: "rgba(255,226,158,0.78)",
                fontSize: 13,
                lineHeight: 1.4,
                fontWeight: 650,
              }}
            >
              本局卦码卡
            </strong>

            <span
              style={{
                justifySelf: "center",
                padding: "4px 10px",
                border: "1px solid rgba(255,226,158,0.18)",
                borderRadius: 999,
                color: "rgba(199,169,107,0.68)",
                fontSize: 11,
                fontWeight: 650,
              }}
            >
              64 卦码 · 本局资产
            </span>

            <p style={{ margin: 0, color: "rgba(245,245,245,0.58)", fontSize: 13, lineHeight: 1.55 }}>
              从【{state.mother.motherCodeName || state.mother.lowerTrigram}】进入【{hexagramTitle}】，这一局沉积为 64 卦码。
            </p>
          </article>
        ) : (
          <>
            <h1
              style={{
                margin: "92px 0 0",
                color: "rgba(245,245,245,0.92)",
                fontSize: 30,
                lineHeight: 1.16,
                fontWeight: 720,
                letterSpacing: 0,
                textShadow: "0 0 24px rgba(199,169,107,0.18)",
              }}
            >
              本局结晶已经形成
            </h1>

            <strong
              style={{
                color: "rgba(255,226,158,0.94)",
                fontSize: 24,
                lineHeight: 1.18,
                fontWeight: 680,
                letterSpacing: 0,
              }}
            >
              本局：{hexagramTitle}
            </strong>
          </>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            width: "100%",
            maxWidth: 278,
          }}
        >
          {[
            ["下卦", state.hexagram.lowerTrigram],
            ["上卦", state.hexagram.upperTrigram],
          ].map(([label, value]) => (
            <span
              key={label}
              style={{
                display: "grid",
                gap: 3,
                padding: "8px 10px",
                borderTop: "1px solid rgba(199,169,107,0.3)",
                borderBottom: "1px solid rgba(199,169,107,0.12)",
                color: "rgba(245,245,245,0.7)",
              }}
            >
              <span style={{ color: "rgba(199,169,107,0.62)", fontSize: 11 }}>{label}</span>
              <span style={{ color: "rgba(245,245,245,0.9)", fontSize: 18, fontWeight: 650 }}>{value}</span>
            </span>
          ))}
        </div>

        <p
          style={{
            margin: "3px 0 0",
            maxWidth: 310,
            color: "rgba(245,245,245,0.66)",
            fontSize: 14,
            lineHeight: 1.62,
          }}
        >
          {isCardView ? "认领这一局留下的卦码。它只保留人格动态，不暴露具体压力原句。" : state.crystal.copy}
        </p>

        {isCardView ? (
          <section
            aria-label="行为特征解码"
            style={{
              display: "grid",
              gap: 8,
              width: "100%",
              maxWidth: 318,
              textAlign: "left",
              padding: "12px 14px",
              borderTop: "1px solid rgba(199,169,107,0.24)",
              borderBottom: "1px solid rgba(199,169,107,0.12)",
              color: "rgba(245,245,245,0.68)",
              fontSize: 13,
              lineHeight: 1.56,
            }}
          >
            <strong style={{ color: "rgba(255,226,158,0.82)", fontSize: 13 }}>行为特征解码</strong>
            {behaviorReading.map((line) => (
              <p key={line} style={{ margin: 0 }}>
                {line}
              </p>
            ))}
          </section>
        ) : null}

        <div
          style={{
            display: "grid",
            justifyItems: "center",
            gap: 8,
            marginTop: 3,
          }}
        >
          {isCardView ? (
            <button
              type="button"
              onClick={saveToPersonalityRingLite}
              disabled={Boolean(savedEntry)}
              style={{
                appearance: "none",
                border: "1px solid rgba(255,226,158,0.42)",
                borderRadius: 999,
                padding: "10px 18px",
                background: savedEntry
                  ? "rgba(199,169,107,0.16)"
                  : "linear-gradient(135deg, rgba(255,226,158,0.18), rgba(199,169,107,0.07))",
                color: "rgba(255,236,184,0.92)",
                fontSize: 14,
                fontWeight: 650,
                letterSpacing: 0,
                cursor: savedEntry ? "default" : "pointer",
                boxShadow: savedEntry ? "0 0 18px rgba(199,169,107,0.1)" : "0 0 24px rgba(199,169,107,0.14)",
              }}
            >
              {savedEntry ? "已留痕" : "保存入人格年轮"}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCrystalView("CARD")}
              style={{
                appearance: "none",
                border: "1px solid rgba(255,226,158,0.42)",
                borderRadius: 999,
                padding: "10px 18px",
                background: "linear-gradient(135deg, rgba(255,226,158,0.2), rgba(199,169,107,0.08))",
                color: "rgba(255,236,184,0.94)",
                fontSize: 14,
                fontWeight: 650,
                letterSpacing: 0,
                cursor: "pointer",
                boxShadow: "0 0 24px rgba(199,169,107,0.14)",
              }}
            >
              提取这一局留下的形状
            </button>
          )}

          {isCardView && savedEntry ? (
            <div
              style={{
                display: "grid",
                justifyItems: "center",
                gap: 4,
                color: "rgba(245,245,245,0.62)",
                fontSize: 12,
                lineHeight: 1.55,
              }}
            >
              <strong style={{ color: "rgba(255,226,158,0.84)", fontSize: 14, fontWeight: 650 }}>人格年轮已点亮</strong>
              <span>这一局，已经成为你人格年轮上的一枚星点。</span>
              <span style={{ color: "rgba(199,169,107,0.58)" }}>
                已留痕 · {ringLiteState.entries.length} 枚结晶
                {hexagramTitle ? ` · 最近一枚：${hexagramTitle}` : ""}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function HexagramCodeDeliveryShell() {
  const [dynamicsInputContext] = useState<DynamicsInputContext>(() => readDynamicsInputContext());
  const [activeCurrentHexagramContext] = useState<ActiveCurrentHexagramContext | null>(() =>
    resolveActiveCurrentHexagramContext(readDynamicsInputContext()),
  );
  const [executionSnapshot, setExecutionSnapshot] = useState<ExecutionSnapshot>(() =>
    GuanyaoRuntimeEngine.createSnapshot(dynamicsInputContext.selectedPressureSeedContext),
  );
  const runtimeProjection = GuanyaoRuntimeEngine.project(executionSnapshot);
  const {
    sixSpaceConfigs,
    currentPrimarySpaceId,
    sixDimensionStep,
    selectedPressureSeedSurface,
    cosmicSixDimensionState,
    cosmicNodeStep,
    cosmicNarrativePhase,
    pressureSeedContext,
    starbeastFeedback,
  } = runtimeProjection;
  const visualState = resolveVisualState(executionSnapshot, runtimeProjection);
  const experienceState = resolveExperienceState(executionSnapshot, visualState);
  const motherPersonaSnapshot = resolveMotherPersonaSnapshot(dynamicsInputContext);
  const motherCodeName = resolveMotherCodeName(dynamicsInputContext);
  const currentHexagramProfile = activeCurrentHexagramContext?.currentHexagramProfile ?? null;
  const hasLockedPressureSeed = Boolean(dynamicsInputContext.selectedPressureSeedContext);
  const displayExperienceState: ExperienceState = !hasLockedPressureSeed
    ? {
        ...experienceState,
        loopLabel: "六维传导预览",
        headline: "等待这一局压力被看见。",
        supportingCopy: "当前为安全预览状态，缺少本局上下文。",
        pressureCopy: "等待这一颗压力进入。",
        beastCopy: "六维传导将在压力种子锁定后展开。",
      }
    : motherCodeName && experienceState.stage === "PRESSURE"
      ? {
        ...experienceState,
        headline: "母码已接入。",
        supportingCopy: "这一颗压力正在穿过你的母码。",
        pressureCopy: "母码已接入，压力开始进入六维传导。",
      }
      : experienceState;
  const valueFlow = resolveValueFlow(executionSnapshot);
  const cosmicBotanicsRuntime = runCosmicBotanicsRuntimeEngine({
    pressureSeed: selectedPressureSeedSurface,
    sixDimensionState: cosmicSixDimensionState,
  });
  const baiHuRuntimeCoreStars = buildRuntimeBaiHuCoreStars(executionSnapshot, runtimeProjection);

  const visiblePetalStates = sixSpaceConfigs.reduce<Record<SixSpaceId, CosmicPetalState>>((acc, config, index) => {
    const baseState = cosmicBotanicsRuntime.sixDimensionState[config.id].petalState;
    const isCurrent = sixDimensionStep === index + 1;
    const isCompleted = cosmicNodeStep >= 6;
    acc[config.id] = isCompleted ? "blooming" : isCurrent && baseState === "dormant" ? "active" : baseState;
    return acc;
  }, buildSpaceRecord<CosmicPetalState>("dormant"));
  const cosmicPollenBursts = sixSpaceConfigs.reduce<Record<SixSpaceId, number>>((acc, config) => {
    acc[config.id] = cosmicBotanicsRuntime.sixDimensionState[config.id].bloomCount;
    return acc;
  }, buildSpaceRecord(0));
  const starbeastFeedbackComplete = executionSnapshot.runtime.enginePhase === "COMPLETE" && visiblePetalStates[currentPrimarySpaceId] === "blooming";
  const hexagramAssetCandidate = resolveHexagramAssetCandidate({
    personaSnapshot: motherPersonaSnapshot,
    selectedPressureSeedContext: pressureSeedContext,
    currentPrimarySpaceId,
    completedNodeCount: cosmicNodeStep,
    starbeastFeedbackComplete,
    pressureSeedFallbackText: selectedPressureSeedSurface,
  });
  const currentCrystalEndState = useMemo(() =>
    resolveCurrentCrystalEndState({
      currentHexagramProfile,
      motherCodeName,
      selectedPressureSeedContext: dynamicsInputContext.selectedPressureSeedContext,
      completedNodeCount: cosmicNodeStep,
      primaryDimension: currentPrimarySpaceId,
      readyToCrystallize: hexagramAssetCandidate.completionState === "READY_TO_CRYSTALLIZE",
    }), [
      currentHexagramProfile,
      motherCodeName,
      dynamicsInputContext.selectedPressureSeedContext,
      cosmicNodeStep,
      currentPrimarySpaceId,
      hexagramAssetCandidate.completionState,
    ]);

  useEffect(() => {
    if (!activeCurrentHexagramContext) return;
    writeJsonToStorage("guanyao:currentHexagramProfile", activeCurrentHexagramContext);
  }, [activeCurrentHexagramContext]);

  useEffect(() => {
    if (!currentCrystalEndState) return;
    writeJsonToStorage("guanyao:currentCrystalEndState", currentCrystalEndState);
  }, [currentCrystalEndState]);

  useEffect(() => {
    if (!shouldAutoCompleteFinalDimension(executionSnapshot)) return;

    const finalDimensionTimer = window.setTimeout(() => {
      setExecutionSnapshot((current) =>
        shouldAutoCompleteFinalDimension(current) ? GuanyaoRuntimeEngine.advance(current) : current,
      );
    }, 620);

    return () => window.clearTimeout(finalDimensionTimer);
  }, [executionSnapshot]);

  function handleSpatialInteraction(eventType: SpatialIntent["type"], context: SpatialIntent["payload"] = {}) {
    setExecutionSnapshot((current) =>
      eventType === "CORE_STAR_BLOOM" && current.node.current === 6 && current.runtime.enginePhase !== "COMPLETE"
        ? GuanyaoRuntimeEngine.advance(current)
        : GuanyaoRuntimeEngine.run(current, { type: eventType, payload: context }),
    );
  }

  function bloomCosmicNode() {
    handleSpatialInteraction("CORE_STAR_BLOOM", {
      nodeIndex: executionSnapshot.node.current,
      dimension: currentPrimarySpaceId,
      context: "focus",
      triggerStrength: 1,
    });
  }

  useEffect(() => {
    const seedTimer = window.setTimeout(() => {
      setExecutionSnapshot((current) => {
        const nextEngine =
          current.runtime.enginePhase === "INIT"
            ? GuanyaoRuntimeEngine.run(current, { type: "SET_ENGINE_PHASE", payload: { enginePhase: "SEED_ACTIVE" } })
            : current;
        return current.runtime.uiPhase === "INIT"
          ? GuanyaoRuntimeEngine.run(nextEngine, { type: "SET_UI_PHASE", payload: { uiPhase: "SEED_ACTIVE" } })
          : nextEngine;
      });
    }, 950);
    const beastTimer = window.setTimeout(() => {
      setExecutionSnapshot((current) =>
        current.runtime.uiPhase === "SEED_ACTIVE" || current.runtime.uiPhase === "INIT"
          ? GuanyaoRuntimeEngine.run(current, { type: "SET_UI_PHASE", payload: { uiPhase: "DIMENSION_LOCKED" } })
          : current,
      );
    }, 2400);
    const nodeTimer = window.setTimeout(() => {
      setExecutionSnapshot((current) => {
        const nextEngine =
          current.runtime.enginePhase === "SEED_ACTIVE" || current.runtime.enginePhase === "INIT"
            ? GuanyaoRuntimeEngine.run(current, { type: "SET_ENGINE_PHASE", payload: { enginePhase: "NODE_RUNNING" } })
            : current;
        return current.runtime.uiPhase === "DIMENSION_LOCKED" || current.runtime.uiPhase === "SEED_ACTIVE" || current.runtime.uiPhase === "INIT"
          ? GuanyaoRuntimeEngine.run(nextEngine, { type: "SET_UI_PHASE", payload: { uiPhase: "NODE_RUNNING" } })
          : nextEngine;
      });
    }, 3600);

    return () => {
      window.clearTimeout(seedTimer);
      window.clearTimeout(beastTimer);
      window.clearTimeout(nodeTimer);
    };
  }, []);

  if (USE_COSMIC_BOTANICS_SIX_SPACE || LEGACY_DYNAMICS_FLOW_ISOLATED) {
    const cosmicTopCopyOpacity =
      cosmicNarrativePhase === "field_intro"
        ? 1
        : cosmicNarrativePhase === "seed_visible"
          ? 0.82
          : cosmicNarrativePhase === "beast_guide"
            ? 0.42
            : 0;

    return (
      <main
        data-product-definition={GUANYAO_PRODUCT_RUNTIME_DEFINITION.officialDefinition}
        data-product-model={GUANYAO_PRODUCT_RUNTIME_DEFINITION.threeSecondModel}
        data-product-positioning={GUANYAO_PRODUCT_RUNTIME_DEFINITION.positioning}
        data-product-onboarding={GUANYAO_PRODUCT_RUNTIME_DEFINITION.onboardingFlow.join("|")}
        data-product-perception={GUANYAO_PRODUCT_RUNTIME_DEFINITION.userPerception.join("|")}
        data-dynamics-mother-context={motherPersonaSnapshot ? "connected" : "missing"}
        data-dynamics-pressure-context={dynamicsInputContext.selectedPressureSeedContext ? "connected" : "fallback"}
        data-dynamics-current-hexagram={currentHexagramProfile ? "connected" : "missing"}
        data-dynamics-mother-code={motherCodeName || "missing"}
        data-dynamics-four-beast={motherPersonaSnapshot?.fourSymbol ?? "missing"}
        data-dynamics-lower-trigram={currentHexagramProfile?.lowerTrigram ?? "missing"}
        data-dynamics-upper-trigram={currentHexagramProfile?.upperTrigram ?? "missing"}
        style={{
          minHeight: "100dvh",
          width: "100%",
          boxSizing: "border-box",
          padding: "46px 20px calc(34px + env(safe-area-inset-bottom))",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 22,
          background:
            "radial-gradient(circle at 50% 28%, rgba(199,169,107,0.08), transparent 32%), radial-gradient(circle at 50% 64%, rgba(0,184,212,0.05), transparent 42%), #050607",
          color: "#f5f5f5",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <CosmicPageStarField />

        <section
          style={{
            position: "relative",
            zIndex: 1,
            display: "grid",
            gap: 18,
            opacity: cosmicTopCopyOpacity,
            transition: "opacity 360ms ease",
            pointerEvents: cosmicTopCopyOpacity > 0 ? "auto" : "none",
          }}
        >
          <span
            style={{
              color: "rgba(199,169,107,0.76)",
              fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              fontSize: 12,
              letterSpacing: "0.16em",
            }}
          >
            {displayExperienceState.loopLabel}
          </span>

          <p style={{ margin: 0, maxWidth: 292, color: "rgba(245,245,245,0.64)", fontSize: 15, lineHeight: 1.6 }}>
            {displayExperienceState.headline}
            <br />
            {displayExperienceState.supportingCopy}
            {motherCodeName ? (
              <>
                <br />
                <span style={{ color: "rgba(199,169,107,0.66)" }}>母码：{motherCodeName}</span>
              </>
            ) : null}
            {currentHexagramProfile ? (
              <>
                <br />
                <span style={{ color: "rgba(199,169,107,0.62)" }}>
                  下卦：{currentHexagramProfile.lowerTrigram} · 上卦：{currentHexagramProfile.upperTrigram}
                </span>
              </>
            ) : null}
          </p>
        </section>

        <section
          style={{
            position: "relative",
            zIndex: 1,
            display: "grid",
            gap: 18,
          }}
        >
          {currentCrystalEndState ? (
            <CurrentCrystalEndStateFocus state={currentCrystalEndState} />
          ) : (
            <CosmicBotanicsField
              configs={sixSpaceConfigs}
              currentStep={executionSnapshot.node.current}
              activeDimensionStep={sixDimensionStep}
              pressureSeedSurface={selectedPressureSeedSurface}
              petalStates={visiblePetalStates}
              pollenBursts={cosmicPollenBursts}
              starbeast={starbeastFeedback}
              starFlowerState={cosmicBotanicsRuntime.starFlower.growthState}
              hexagramReadiness={cosmicBotanicsRuntime.hexagramCardGeneration.readiness}
              activeNodeIndex={cosmicNodeStep}
              narrativePhase={cosmicNarrativePhase}
              onNodeBloom={bloomCosmicNode}
              coreStars={baiHuRuntimeCoreStars}
              visualState={visualState}
              experienceState={displayExperienceState}
            />
          )}
        </section>

        <footer
          data-hexagram-asset-candidate-status={hexagramAssetCandidate.status}
          data-hexagram-asset-candidate-state={hexagramAssetCandidate.completionState}
          data-current-crystal-end-state={currentCrystalEndState ? "connected" : "missing"}
          data-value-flow-behavior={valueFlow.behaviorSignals.join("|") || "NONE"}
          data-value-flow-pressure={valueFlow.pressureState}
          data-value-flow-emotion={valueFlow.emotionalState}
          data-value-flow-asset={valueFlow.assetTrigger}
          data-value-flow-monetization={valueFlow.monetizationEvent}
          style={{
            position: "relative",
            zIndex: 1,
            display: "block",
            color: "rgba(245,245,245,0.5)",
            fontSize: 12,
            lineHeight: 1.55,
          }}
        >
          {currentCrystalEndState ? (
            <span style={{ display: "block", textAlign: "center", color: "rgba(199,169,107,0.54)" }}>
              六维传导已完成
            </span>
          ) : cosmicNarrativePhase === "node_complete" &&
            hexagramAssetCandidate.completionState === "READY_TO_CRYSTALLIZE"
              ? displayExperienceState.crystalCopy
              : ""}
        </footer>
      </main>
    );
  }



  // DEPRECATED / ISOLATED / NOT IN ACTIVE 1.0 FLOW.
  return <LegacyDynamicsDormant branch="six-space-weapon-annular-asset" />;
}

export function GravityPage() {
  return <HexagramCodeDeliveryShell />;
}
