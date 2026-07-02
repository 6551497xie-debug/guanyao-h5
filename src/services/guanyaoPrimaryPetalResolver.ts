export type PrimaryPetalId = "body" | "emotion" | "thought" | "action" | "memory" | "goal";

export type PrimaryPetalProtocolDimension = "body" | "emotion" | "thought" | "behavior" | "memory" | "motivation";

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

const primaryPetalPriority: PrimaryPetalId[] = ["body", "action", "thought", "emotion", "memory", "goal"];

const primaryPetalTextRules: Array<{ id: PrimaryPetalId; keywords: string[] }> = [
  {
    id: "body",
    keywords: [
      "身体",
      "胸口",
      "肩",
      "呼吸",
      "睡",
      "疲",
      "累",
      "沉重",
      "僵",
      "冷汗",
      "发闷",
      "行业",
      "十年",
      "经理",
      "职级",
      "年龄",
      "抬头",
    ],
  },
  {
    id: "action",
    keywords: ["行动", "行为", "卡住", "拖延", "不敢", "动不了", "停在原地", "迟迟", "想做", "没做", "开口", "迈出"],
  },
  {
    id: "thought",
    keywords: ["解释", "证明", "想不通", "反复", "脑子", "逻辑", "担心", "盘算", "预判", "分析", "回合", "念头"],
  },
  {
    id: "emotion",
    keywords: ["情绪", "不安", "委屈", "害怕", "愤怒", "生气", "难过", "焦虑", "心口", "眼神", "忽略", "关系"],
  },
  {
    id: "memory",
    keywords: ["以前", "过去", "旧", "又一次", "还是", "曾经", "失败", "记忆", "阴影", "童年", "熟悉"],
  },
  {
    id: "goal",
    keywords: ["方向", "目标", "不知道往哪", "不想走", "得不到", "意义", "动力", "愿望", "未来", "迷茫", "失焦"],
  },
];

const primaryPetalCodedHints: Record<string, PrimaryPetalId> = {
  BODY: "body",
  SOMATIC: "body",
  HEALTH: "body",
  SURVIVAL: "body",
  TIRED: "body",
  FATIGUE: "body",
  EMOTION: "emotion",
  EMOTIONAL: "emotion",
  ATTACHMENT: "emotion",
  RELATION: "emotion",
  RELATIONSHIP: "emotion",
  FEAR: "emotion",
  ANGER: "emotion",
  GRIEF: "emotion",
  SHAME: "emotion",
  THOUGHT: "thought",
  THINKING: "thought",
  ANALYSIS: "thought",
  EXPLANATION: "thought",
  EVALUATION: "thought",
  PROOF: "thought",
  ACTION: "action",
  BEHAVIOR: "action",
  BEHAVIOUR: "action",
  CONTROL: "action",
  AVOIDANCE: "action",
  DELAY: "action",
  MEMORY: "memory",
  PAST: "memory",
  OLD_PATTERN: "memory",
  MOTIVATION: "goal",
  GOAL: "goal",
  DIRECTION: "goal",
  FUTURE: "goal",
  DESIRE: "goal",
};

function buildPetalScoreRecord(value: number): Record<PrimaryPetalId, number> {
  return {
    body: value,
    emotion: value,
    thought: value,
    action: value,
    memory: value,
    goal: value,
  };
}

function collectPressureSeedText(value: unknown, depth = 0): string[] {
  if (depth > 2 || value == null) return [];
  if (typeof value === "string") return [value];
  if (typeof value === "number" || typeof value === "boolean") return [String(value)];
  if (Array.isArray(value)) return value.flatMap((item) => collectPressureSeedText(item, depth + 1));
  if (typeof value === "object") {
    return Object.entries(value as Record<string, unknown>).flatMap(([key, item]) => {
      if (/id|code|index/i.test(key) && typeof item !== "string") return [];
      return collectPressureSeedText(item, depth + 1);
    });
  }

  return [];
}

function resolvePetalFromCodedHint(value: unknown): PrimaryPetalId | null {
  if (typeof value !== "string") return null;
  const normalized = value.trim().replace(/[\s-]+/g, "_").toUpperCase();
  return primaryPetalCodedHints[normalized] ?? null;
}

export function derivePrimaryPetal(context: SelectedPressureSeedContext | null): PrimaryPetalId {
  if (!context) return "body";

  if (context.bodySignal) return "body";
  if (context.behaviorBlock) return "action";
  if (context.thoughtPattern) return "thought";
  if (context.emotionalTone && context.emotionalTone !== "unknown") return "emotion";
  if (context.memoryEcho) return "memory";
  if (context.motivationLoss) return "goal";

  const scores = buildPetalScoreRecord(0);
  const codedHints = [
    context.category,
    context.pressureField,
    context.pressureNature,
    context.scenarioDomain,
    context.emotionalTone,
    ...(context.tags ?? []),
    ...(context.semanticTags ?? []),
  ];

  codedHints.forEach((hint) => {
    const petal = resolvePetalFromCodedHint(hint);
    if (petal) scores[petal] += 2;
  });

  const seedText = collectPressureSeedText(context).join(" ").toLowerCase();
  primaryPetalTextRules.forEach((rule) => {
    rule.keywords.forEach((keyword) => {
      if (seedText.includes(keyword.toLowerCase())) {
        scores[rule.id] += 3;
      }
    });
  });

  let winner: PrimaryPetalId = "body";
  let highestScore = 0;
  primaryPetalPriority.forEach((petal) => {
    if (scores[petal] > highestScore) {
      winner = petal;
      highestScore = scores[petal];
    }
  });

  return highestScore > 0 ? winner : "body";
}

export function toProtocolPrimaryPetal(petal: PrimaryPetalId): PrimaryPetalProtocolDimension {
  if (petal === "action") return "behavior";
  if (petal === "goal") return "motivation";
  return petal;
}
