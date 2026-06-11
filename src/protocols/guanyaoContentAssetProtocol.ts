export type GuanyaoContentAssetType =
  | "mother_code"
  | "pressure_seed"
  | "hexagram_field"
  | "breach_point"
  | "yao_device"
  | "repair_method"
  | "defense_90d"
  | "archive_asset";

export type GuanyaoContentSource = "mock" | "template" | "engine" | "manual_reviewed";

export type ContentAssetMeta = {
  assetId: string;
  assetType: GuanyaoContentAssetType;
  version: string;
  source: GuanyaoContentSource;
  variables: Record<string, string>;
  generationRule?: string;
  usageCount: number;
  feedbackScore?: number;
  lastUpdatedAt: string;
};

export type PressureSeedIntensity = "low" | "mid" | "high";

export type PressureSeedAsset = {
  id: string;
  meta: ContentAssetMeta;
  title: string;
  scene: string;
  pressureType: string;
  roleContext: string;
  triggerScene: string;
  agePhase: string;
  intensity: PressureSeedIntensity;
  motherCodeBias?: string;
  geoContextWeight?: string;
  hiddenMechanism: string;
  likelyBehaviorReaction: string;
  upperGuaCandidate?: string;
  reuseScore?: number;
  feedbackScore?: number;
};

export type YaoDeviceType = "stop" | "delay" | "cut" | "anchor" | "boundary" | "recover" | "cooldown" | "mirror";

export type YaoDeviceAsset = {
  id: string;
  meta: ContentAssetMeta;
  name: string;
  deviceType: YaoDeviceType;
  sourceBreachType: string;
  targetBehaviorPattern: string;
  coreFunction: string;
  deviceLine: string;
  applicablePressureTypes: string[];
  applicableMotherCodes?: string[];
  riskLevel: "light" | "medium" | "heavy";
  reuseScore?: number;
};

export type RepairMethodAsset = {
  id: string;
  meta: ContentAssetMeta;
  methodName: string;
  sourceDeviceId: string;
  sourceBreachId: string;
  firstAction: string;
  forbiddenAction: string;
  substituteAction?: string;
  relapseWarning: string;
  executionWindow: string;
  difficulty: "easy" | "medium" | "hard";
  expectedResistance: string;
  completionCheck: string;
  feedbackScore?: number;
};

export type Defense90dPhase = {
  phase: "stop_loss" | "relapse_detection" | "behavior_rewrite";
  range: "1-7" | "8-30" | "31-90";
  name: string;
  goal: string;
  userTask: string;
  warningSignal: string;
  reviewPrompt: string;
};

export type Defense90dAsset = {
  id: string;
  meta: ContentAssetMeta;
  sourceArchiveId: string;
  phases: Defense90dPhase[];
};

function demoMeta(assetId: string, assetType: GuanyaoContentAssetType, variables: Record<string, string> = {}): ContentAssetMeta {
  return {
    assetId,
    assetType,
    version: "v1.0.0",
    source: "mock",
    variables,
    usageCount: 0,
    lastUpdatedAt: "2026-06-11T00:00:00.000Z",
  };
}

export const demoPressureSeedPool: PressureSeedAsset[] = [
  {
    id: "pressure-seed-project-overload",
    meta: demoMeta("pressure-seed-project-overload", "pressure_seed", { pressureType: "合作压力" }),
    title: "合作项目吃力",
    scene: "合作项目已经开始超出你的承载，但你仍然不想让别人看出来。",
    pressureType: "合作压力",
    roleContext: "项目推进者",
    triggerScene: "对方继续催进度，你下意识说还能处理。",
    agePhase: "责任叠压期",
    intensity: "high",
    motherCodeBias: "硬撑轨道",
    geoContextWeight: "工作场域",
    hiddenMechanism: "用继续推进维持体面。",
    likelyBehaviorReaction: "继续接住责任，不开口求助。",
    upperGuaCandidate: "困锁",
    reuseScore: 0.7,
  },
  {
    id: "pressure-seed-family-default",
    meta: demoMeta("pressure-seed-family-default", "pressure_seed", { pressureType: "家庭责任" }),
    title: "家庭责任默认回流",
    scene: "家里没有人真正开口，但事情最后又变成你来安排。",
    pressureType: "家庭责任",
    roleContext: "默认补位者",
    triggerScene: "一个检查结果、一通电话或一笔账单把责任推回你身上。",
    agePhase: "承担扩张期",
    intensity: "mid",
    motherCodeBias: "承接轨道",
    geoContextWeight: "家庭场域",
    hiddenMechanism: "关系没有明说，但默认你会补位。",
    likelyBehaviorReaction: "先替别人处理，再感到耗空。",
    upperGuaCandidate: "归属",
    reuseScore: 0.62,
  },
];

export const demoYaoDeviceAssets: YaoDeviceAsset[] = [
  {
    id: "yao-device-stop-anchor",
    meta: demoMeta("yao-device-stop-anchor", "yao_device", { deviceType: "anchor" }),
    name: "止进锚",
    deviceType: "anchor",
    sourceBreachType: "硬撑切口",
    targetBehaviorPattern: "继续硬推",
    coreFunction: "把用户从继续硬撑的自动反应里钉住。",
    deviceLine: "它不是让你更强，而是在你再次想硬推时，把你钉回一个可等待的位置。",
    applicablePressureTypes: ["合作压力", "家庭责任"],
    applicableMotherCodes: ["021", "043", "047"],
    riskLevel: "medium",
    reuseScore: 0.74,
  },
  {
    id: "yao-device-boundary-shield",
    meta: demoMeta("yao-device-boundary-shield", "yao_device", { deviceType: "boundary" }),
    name: "边界钉",
    deviceType: "boundary",
    sourceBreachType: "补位切口",
    targetBehaviorPattern: "快速补位",
    coreFunction: "阻断自动接手，把责任留在原现场。",
    deviceLine: "它不替你争辩，只把那句过早答应钉回喉咙里。",
    applicablePressureTypes: ["关系责任", "家庭责任"],
    applicableMotherCodes: ["002", "037", "045"],
    riskLevel: "heavy",
    reuseScore: 0.68,
  },
];

export const demoRepairMethodAssets: RepairMethodAsset[] = [
  {
    id: "repair-method-withdraw-commitment",
    meta: demoMeta("repair-method-withdraw-commitment", "repair_method", { deviceId: "yao-device-stop-anchor" }),
    methodName: "撤回一个过早承诺",
    sourceDeviceId: "yao-device-stop-anchor",
    sourceBreachId: "mud-point",
    firstAction: "今天暂停一个你已经答应、但其实风险未明的推进动作。",
    forbiddenAction: "不要继续用“我能处理”掩盖你已经陷进去。",
    substituteAction: "把承诺改成一次信息确认，而不是继续执行。",
    relapseWarning: "你最容易在别人质疑你能力时，重新启动强行推进。",
    executionWindow: "24小时内",
    difficulty: "medium",
    expectedResistance: "你会担心别人觉得你不可靠。",
    completionCheck: "至少撤回或暂停一个过早承诺。",
    feedbackScore: 4,
  },
  {
    id: "repair-method-return-responsibility",
    meta: demoMeta("repair-method-return-responsibility", "repair_method", { deviceId: "yao-device-boundary-shield" }),
    methodName: "归还一项不属于你的责任",
    sourceDeviceId: "yao-device-boundary-shield",
    sourceBreachId: "standby-point",
    firstAction: "把一项你准备接手的事项退回给原责任人。",
    forbiddenAction: "不要用“顺手”继续替别人收尾。",
    substituteAction: "只说明当前边界，不补充额外解释。",
    relapseWarning: "你会想用补位换取关系里的安全感。",
    executionWindow: "48小时内",
    difficulty: "hard",
    expectedResistance: "你会害怕关系因此变冷。",
    completionCheck: "责任被明确退回，且你没有补做收尾。",
  },
];

export const demoDefense90dAssets: Defense90dAsset[] = [
  {
    id: "defense-90d-hard-push",
    meta: demoMeta("defense-90d-hard-push", "defense_90d", { sourceArchiveId: "archive-asset-001" }),
    sourceArchiveId: "archive-asset-001",
    phases: [
      {
        phase: "stop_loss",
        range: "1-7",
        name: "止血期",
        goal: "先停止旧反应扩大损失。",
        userTask: "暂停一个过早推进动作。",
        warningSignal: "开始说“我能处理”。",
        reviewPrompt: "今天有没有把一个不确定动作按下暂停？",
      },
      {
        phase: "relapse_detection",
        range: "8-30",
        name: "复发识别期",
        goal: "识别旧习惯回潮的触发器。",
        userTask: "记录三次想硬推的场景。",
        warningSignal: "被质疑能力时立刻加速。",
        reviewPrompt: "这次加速是在解决问题，还是在证明自己？",
      },
      {
        phase: "behavior_rewrite",
        range: "31-90",
        name: "行为重写期",
        goal: "把本局器法沉积成新的行为路径。",
        userTask: "把暂停动作变成固定边界。",
        warningSignal: "把等待误判成无能。",
        reviewPrompt: "今天有没有允许自己先观察再推进？",
      },
    ],
  },
  {
    id: "defense-90d-boundary-return",
    meta: demoMeta("defense-90d-boundary-return", "defense_90d", { sourceArchiveId: "archive-asset-002" }),
    sourceArchiveId: "archive-asset-002",
    phases: [
      {
        phase: "stop_loss",
        range: "1-7",
        name: "止血期",
        goal: "先让责任停止继续外溢。",
        userTask: "写下一项不是你该接的责任。",
        warningSignal: "对方沉默时你已经开始安排。",
        reviewPrompt: "今天有没有把责任留在原位？",
      },
      {
        phase: "relapse_detection",
        range: "8-30",
        name: "复发识别期",
        goal: "识别补位冲动出现的时刻。",
        userTask: "记录一次想替别人解决的冲动。",
        warningSignal: "别人还没要求，你已经开始补。",
        reviewPrompt: "这次补位是必要，还是旧习惯？",
      },
      {
        phase: "behavior_rewrite",
        range: "31-90",
        name: "行为重写期",
        goal: "建立责任边界的新路径。",
        userTask: "明确说出一次责任归属。",
        warningSignal: "害怕拒绝后关系变冷。",
        reviewPrompt: "今天有没有把关系和责任分开？",
      },
    ],
  },
];
