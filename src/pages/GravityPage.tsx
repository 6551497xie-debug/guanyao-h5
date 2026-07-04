/**
 * GravityPage = passive UI visualization layer for presenting existing causal state transitions
 * without any influence on engine or data flow.
 */
import { useEffect, useState, type CSSProperties } from "react";
import { GuanyaoText } from "../components/visual/GuanyaoText";
import {
  runCosmicBotanicsRuntimeEngine,
  type CosmicPetalState,
  type StarbeastFeedback,
  type StarFlowerGrowthState,
} from "../services/guanyaoCosmicBotanicsRuntimeEngine";
import { resolveHexagramAssetCandidate } from "../services/guanyaoHexagramAssetCandidateResolver";
import type { SelectedPressureSeedContext } from "../services/guanyaoPrimaryPetalResolver";
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
type ProductRuntimeDefinition = Readonly<{
  officialDefinition: string;
  threeSecondModel: "PRESSURE → TRANSFORMATION → ASSET";
  experienceLoop: readonly [
    "Enter pressure field",
    "System detects behavioral state",
    "User performs 6-step interaction cycle",
    "System transforms internal state",
    "System generates crystallized asset",
  ];
  onboardingFlow: readonly [
    "Enter your current state",
    "System maps your pressure",
    "You begin 6-step transformation",
    "You receive crystallized asset",
  ];
  userPerception: readonly [
    "internal pressure mirror",
    "transformation engine",
    "behavioral pressure map",
    "collectible asset system",
  ];
  positioning: "Deterministic consciousness transformation runtime system";
}>;

const GUANYAO_PRODUCT_RUNTIME_DEFINITION = Object.freeze({
  officialDefinition:
    "Guanyao is a deterministic behavioral runtime system that converts human pressure into structured consciousness transformation and crystallized digital assets.",
  threeSecondModel: "PRESSURE → TRANSFORMATION → ASSET",
  experienceLoop: Object.freeze([
    "Enter pressure field",
    "System detects behavioral state",
    "User performs 6-step interaction cycle",
    "System transforms internal state",
    "System generates crystallized asset",
  ]),
  onboardingFlow: Object.freeze([
    "Enter your current state",
    "System maps your pressure",
    "You begin 6-step transformation",
    "You receive crystallized asset",
  ]),
  userPerception: Object.freeze([
    "internal pressure mirror",
    "transformation engine",
    "behavioral pressure map",
    "collectible asset system",
  ]),
  positioning: "Deterministic consciousness transformation runtime system",
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
    title: `第 ${nodeNumber} / 6 步`,
    text: "选择一个最小动作，让压力开始移动。",
    actionText: "轻触光点，推进这一格。",
  };

  if (stage === "CRYSTAL") {
    return Object.freeze({
      stage,
      primaryFocus,
      loopLabel: GUANYAO_PRODUCT_RUNTIME_DEFINITION.threeSecondModel,
      headline: "结晶已经出现。",
      supportingCopy: "这一轮压力已经穿过六步，正在形成结晶资产。",
      pressureCopy: "压力已经完成回收。",
      beastCopy: "状态稳定，转化完成。",
      nodeCopy,
      crystalCopy: "这一局，已经开始结晶。",
    });
  }

  if (stage === "TRANSFORMATION") {
    return Object.freeze({
      stage,
      primaryFocus,
      loopLabel: GUANYAO_PRODUCT_RUNTIME_DEFINITION.threeSecondModel,
      headline: "转化正在收束。",
      supportingCopy: "六步即将完成，压力开始变成可保存的形状。",
      pressureCopy: "压力正在被收回。",
      beastCopy: "状态正在趋稳。",
      nodeCopy,
      crystalCopy: "结晶还未压印。",
    });
  }

  if (stage === "ACTION") {
    return Object.freeze({
      stage,
      primaryFocus,
      loopLabel: GUANYAO_PRODUCT_RUNTIME_DEFINITION.threeSecondModel,
      headline: "进入六步行动。",
      supportingCopy: "每一次轻触，只推进一个最小选择。",
      pressureCopy: "压力成为行动入口。",
      beastCopy: "状态正在跟随行动变化。",
      nodeCopy,
      crystalCopy: "继续推进，结晶会自然出现。",
    });
  }

  if (stage === "AWARENESS") {
    return Object.freeze({
      stage,
      primaryFocus,
      loopLabel: GUANYAO_PRODUCT_RUNTIME_DEFINITION.threeSecondModel,
      headline: "当前状态已识别。",
      supportingCopy: "它不是评判，只是把压力转成可推进的状态。",
      pressureCopy: "压力已经显影。",
      beastCopy: "状态被接住了。",
      nodeCopy,
      crystalCopy: "行动完成后才会结晶。",
    });
  }

  return Object.freeze({
    stage,
    primaryFocus,
    loopLabel: GUANYAO_PRODUCT_RUNTIME_DEFINITION.threeSecondModel,
    headline: "压力正在进入。",
    supportingCopy: "先识别它，再做一个最小选择。",
    pressureCopy: "压力正在显影。",
    beastCopy: "状态即将被识别。",
    nodeCopy,
    crystalCopy: "结晶还未开始。",
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
              width: isActive ? 64 : 50,
              height: isActive ? 26 : 20,
              borderRadius: "50%",
              transform: `translate(-50%, -50%) rotate(${angle + 90}deg)`,
              background: `linear-gradient(90deg, rgba(${toneColor},${isActive ? 0.28 : 0.08}), rgba(245,245,245,${state === "blooming" ? 0.16 : 0.04}))`,
              border: `1px solid rgba(${toneColor},${isActive ? 0.42 : 0.14})`,
              boxShadow: isActive ? `0 0 24px rgba(${toneColor},0.22)` : "none",
              opacity: isActive ? 0.96 : 0.54,
              pointerEvents: "none",
              animation: "gy-petal-float 4.6s ease-in-out infinite",
            } as CSSProperties}
          >
            <span
              style={{
                display: "block",
                transform: `rotate(${-angle - 90}deg)`,
                color: isActive ? "rgba(245,245,245,0.72)" : "rgba(245,245,245,0.32)",
                fontSize: 9,
                lineHeight: "26px",
                textAlign: "center",
                letterSpacing: "0.04em",
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
          aria-label="轻触光点，推进当前一步。"
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

function BaiHuConstellationLayer({ toneColor, narrativePhase, activeNodeIndex, onCoreStarClick, coreStars }: BaiHuConstellationLayerProps) {
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
      aria-label="状态镜像与六步推进入口。"
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
        轻触光点，推进当前一步。
      </span>

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
      aria-label="压力到结晶的六步转化区"
      data-experience-layer="pure-visual-projection"
      data-visual-grammar="BEAST_PRESSURE_DIMENSION_PARTICLE"
      data-visual-depth-state={visualState.visualDepthState}
      data-visual-composition={visualState.spatialComposition}
      data-visual-timeline={visualState.timeline.current}
      data-visual-focal-dimension={visualState.focalDimension}
      data-experience-loop="PRESSURE_AWARENESS_ACTION_TRANSFORMATION_CRYSTAL"
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

function HexagramCodeDeliveryShell() {
  const [executionSnapshot, setExecutionSnapshot] = useState<ExecutionSnapshot>(() =>
    GuanyaoRuntimeEngine.createSnapshot(
      readDevPrimaryPetalFixture() ?? readJsonFromStorage<SelectedPressureSeedContext>("guanyao:selectedPressureSeedContext"),
    ),
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
    selectedPressureSeedContext: pressureSeedContext,
    currentPrimarySpaceId,
    completedNodeCount: cosmicNodeStep,
    starbeastFeedbackComplete,
    pressureSeedFallbackText: selectedPressureSeedSurface,
  });

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
            {experienceState.loopLabel}
          </span>

          <p style={{ margin: 0, maxWidth: 292, color: "rgba(245,245,245,0.64)", fontSize: 15, lineHeight: 1.6 }}>
            {experienceState.headline}
            <br />
            {experienceState.supportingCopy}
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
            experienceState={experienceState}
          />
        </section>

        <footer
          data-hexagram-asset-candidate-status={hexagramAssetCandidate.status}
          data-hexagram-asset-candidate-state={hexagramAssetCandidate.completionState}
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
          {cosmicNarrativePhase === "node_complete" &&
          hexagramAssetCandidate.completionState === "READY_TO_CRYSTALLIZE"
            ? experienceState.crystalCopy
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
