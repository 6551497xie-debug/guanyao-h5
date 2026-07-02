export type CosmicBotanicsDimensionId = "body" | "emotion" | "thought" | "action" | "memory" | "goal";

export type CosmicPetalState = "dormant" | "active" | "blooming";

export type StarFlowerGrowthState = "dormant" | "active" | "blooming" | "unstable" | "collapse" | "rebirth";

export type StarFlowerForm = "qinglong" | "baihu" | "zhuque" | "xuanwu";

export type CosmicBotanicsDimensionChannel =
  | "root stability"
  | "petal expansion"
  | "light refraction"
  | "direction vector"
  | "structural depth"
  | "growth force";

export type CosmicBotanicsSixDimensionState = Record<
  CosmicBotanicsDimensionId,
  {
    petalState: CosmicPetalState;
    bloomCount: number;
  }
>;

export type CosmicBotanicsRuntimeInput = {
  pressureSeed: string;
  sixDimensionState: CosmicBotanicsSixDimensionState;
};

export type CosmicBotanicsBloomAction = {
  type: "bloom";
  dimensionId: CosmicBotanicsDimensionId;
};

export type StarFlowerMutation = {
  form: StarFlowerForm;
  growthState: StarFlowerGrowthState;
  externalDisturbance: number;
  bloomRatio: number;
  dimensionChannels: Record<CosmicBotanicsDimensionId, CosmicBotanicsDimensionChannel>;
};

export type StarbeastFeedback = {
  energyRing: number;
  glowIntensity: number;
  postureShift: "resting" | "leaning" | "opening" | "guarding" | "released";
};

export type HexagramCardGenerationSignal = {
  state: "waiting" | "collecting" | "primed" | "ready";
  readiness: number;
  reason: string;
};

export type CosmicBotanicsRuntimeSnapshot = {
  pressureSeed: string;
  sixDimensionState: CosmicBotanicsSixDimensionState;
  starFlower: StarFlowerMutation;
  starbeast: StarbeastFeedback;
  hexagramCardGeneration: HexagramCardGenerationSignal;
};

const dimensionChannels: Record<CosmicBotanicsDimensionId, CosmicBotanicsDimensionChannel> = {
  body: "root stability",
  emotion: "petal expansion",
  thought: "light refraction",
  action: "direction vector",
  memory: "structural depth",
  goal: "growth force",
};

export const cosmicBotanicsDimensionOrder: CosmicBotanicsDimensionId[] = [
  "body",
  "emotion",
  "thought",
  "action",
  "memory",
  "goal",
];

export function createDormantCosmicBotanicsSixDimensionState(): CosmicBotanicsSixDimensionState {
  return cosmicBotanicsDimensionOrder.reduce<CosmicBotanicsSixDimensionState>((acc, dimensionId) => {
    acc[dimensionId] = {
      petalState: "dormant",
      bloomCount: 0,
    };
    return acc;
  }, {} as CosmicBotanicsSixDimensionState);
}

export function runCosmicBotanicsRuntimeEngine(input: CosmicBotanicsRuntimeInput): CosmicBotanicsRuntimeSnapshot {
  const states = cosmicBotanicsDimensionOrder.map((dimensionId) => input.sixDimensionState[dimensionId]);
  const bloomCount = states.filter((state) => state.petalState === "blooming" || state.bloomCount > 0).length;
  const totalBloomEvents = states.reduce((sum, state) => sum + state.bloomCount, 0);
  const bloomRatio = bloomCount / cosmicBotanicsDimensionOrder.length;
  const externalDisturbance = resolvePressureSeedDisturbance(input.pressureSeed);
  const form = resolveStarFlowerForm(input.pressureSeed);
  const growthState = resolveStarFlowerGrowthState({
    bloomCount,
    totalBloomEvents,
    externalDisturbance,
  });
  const readiness = Math.min(1, bloomRatio * 0.78 + Math.min(0.22, totalBloomEvents * 0.035));

  return {
    pressureSeed: input.pressureSeed,
    sixDimensionState: input.sixDimensionState,
    starFlower: {
      form,
      growthState,
      externalDisturbance,
      bloomRatio,
      dimensionChannels,
    },
    starbeast: {
      energyRing: Math.round(74 + readiness * 48 + externalDisturbance * 10),
      glowIntensity: Math.min(1, 0.18 + readiness * 0.62 + externalDisturbance * 0.2),
      postureShift: resolveStarbeastPosture(growthState),
    },
    hexagramCardGeneration: {
      state: readiness >= 0.98 ? "ready" : readiness >= 0.64 ? "primed" : readiness > 0 ? "collecting" : "waiting",
      readiness,
      reason:
        readiness >= 0.98
          ? "六维花冠已完成能量回收，卦码资产可以进入结晶。"
          : readiness >= 0.64
            ? "星兽反馈已经稳定，卦码资产正在聚合。"
            : readiness > 0
              ? "花瓣正在接住压力种子，星兽开始回收能量。"
              : "压力种子仍是外部扰动，等待第一片花瓣回应。",
    },
  };
}

export function applyCosmicBotanicsRuntimeAction(
  input: CosmicBotanicsRuntimeInput,
  action: CosmicBotanicsBloomAction,
): CosmicBotanicsRuntimeSnapshot {
  const nextSixDimensionState: CosmicBotanicsSixDimensionState = {
    ...input.sixDimensionState,
    [action.dimensionId]: {
      petalState: "blooming",
      bloomCount: input.sixDimensionState[action.dimensionId].bloomCount + 1,
    },
  };

  return runCosmicBotanicsRuntimeEngine({
    pressureSeed: input.pressureSeed,
    sixDimensionState: nextSixDimensionState,
  });
}

export function settleCosmicBotanicsBloomState(
  state: CosmicBotanicsSixDimensionState,
  dimensionId: CosmicBotanicsDimensionId,
): CosmicBotanicsSixDimensionState {
  if (state[dimensionId].petalState !== "blooming") {
    return state;
  }

  return {
    ...state,
    [dimensionId]: {
      ...state[dimensionId],
      petalState: "active",
    },
  };
}

function resolvePressureSeedDisturbance(pressureSeed: string) {
  const normalizedLength = Math.min(1, Math.max(0.16, pressureSeed.trim().length / 72));
  const tensionScore = ["怕", "不敢", "压", "墙", "替代", "算", "撑", "失去"].reduce(
    (sum, keyword) => sum + (pressureSeed.includes(keyword) ? 0.06 : 0),
    0,
  );

  return Math.min(1, normalizedLength + tensionScore);
}

function resolveStarFlowerForm(pressureSeed: string): StarFlowerForm {
  const hash = Array.from(pressureSeed || "观爻").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const forms: StarFlowerForm[] = ["qinglong", "baihu", "zhuque", "xuanwu"];
  return forms[hash % forms.length];
}

function resolveStarFlowerGrowthState({
  bloomCount,
  totalBloomEvents,
  externalDisturbance,
}: {
  bloomCount: number;
  totalBloomEvents: number;
  externalDisturbance: number;
}): StarFlowerGrowthState {
  if (bloomCount === 0) return externalDisturbance > 0.72 ? "unstable" : "dormant";
  if (bloomCount < 3) return "active";
  if (bloomCount < 5) return externalDisturbance > 0.78 && totalBloomEvents < 5 ? "unstable" : "blooming";
  if (bloomCount < 6) return "collapse";
  return "rebirth";
}

function resolveStarbeastPosture(growthState: StarFlowerGrowthState): StarbeastFeedback["postureShift"] {
  switch (growthState) {
    case "dormant":
      return "resting";
    case "active":
      return "leaning";
    case "blooming":
      return "opening";
    case "unstable":
      return "guarding";
    case "collapse":
    case "rebirth":
      return "released";
    default:
      return "resting";
  }
}
