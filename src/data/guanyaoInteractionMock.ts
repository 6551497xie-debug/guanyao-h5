import type {
  BreachScanResult,
  DynamicsResult,
  MotherCodeAsset,
  PressureExposureOption,
  PressureSeed,
  RepairMethod,
  YaoDevice,
} from "../types";

export const motherCodeAssets: MotherCodeAsset[] = [
  {
    id: "qian",
    index: "01",
    trigram: "乾",
    name: "创世者",
    title: "乾｜创世者",
    englishName: "The Genesis Engine",
    tags: {
      force: "孤王",
      exposure: "坠空",
      trait: "刚健",
    },
  },
  {
    id: "kun",
    index: "02",
    trigram: "坤",
    name: "承载者",
    title: "坤｜承载者",
    englishName: "The Bearing Field",
    tags: {
      force: "大地",
      exposure: "深降",
      trait: "柔顺",
    },
  },
  {
    id: "zhen",
    index: "03",
    trigram: "震",
    name: "行动者",
    title: "震｜行动者",
    englishName: "The Thunder Drive",
    tags: {
      force: "雷暴",
      exposure: "狂飙",
      trait: "震动",
    },
  },
  {
    id: "xun",
    index: "04",
    trigram: "巽",
    name: "渗透者",
    title: "巽｜渗透者",
    englishName: "The Infiltration Field",
    tags: {
      force: "裂缝",
      exposure: "盲区",
      trait: "顺入",
    },
  },
  {
    id: "kan",
    index: "05",
    trigram: "坎",
    name: "深陷者",
    title: "坎｜深陷者",
    englishName: "The Abyssal Current",
    tags: {
      force: "怒潮",
      exposure: "吞噬",
      trait: "险阻",
    },
  },
  {
    id: "li",
    index: "06",
    trigram: "离",
    name: "照见者",
    title: "离｜照见者",
    englishName: "The Seeing Flame",
    tags: {
      force: "天眼",
      exposure: "悬虚",
      trait: "光明",
    },
  },
  {
    id: "gen",
    index: "07",
    trigram: "艮",
    name: "停滞者",
    title: "艮｜停滞者",
    englishName: "The Still Wall",
    tags: {
      force: "绝壁",
      exposure: "死寂",
      trait: "静止",
    },
  },
  {
    id: "dui",
    index: "08",
    trigram: "兑",
    name: "交换者",
    title: "兑｜交换者",
    englishName: "The Exchange Hub",
    tags: {
      force: "枢纽",
      exposure: "溢价",
      trait: "愉悦",
    },
  },
];

export const demoPressureSeed: PressureSeed = {
  id: "pressure-demo-qian-risk",
  text: "我最近在一个合作项目里，明明很吃力，但我不想让别人看出来，也不想求助。",
  relationType: "合作 / 职场",
  intensity: 4,
  isRecurring: true,
  createdAt: new Date().toISOString(),
};

export const demoPressureExposureOptions: PressureExposureOption[] = [
  {
    id: "control-back",
    label: "夺回控制",
    sentence: "我想立刻夺回控制权。",
  },
  {
    id: "hide-collapse",
    label: "隐藏撑不住",
    sentence: "我不想让别人看出我撑不住。",
  },
  {
    id: "hard-push-alone",
    label: "独自硬推",
    sentence: "我宁可自己硬推，也不想开口求助。",
  },
];

export const demoDynamicsResult: DynamicsResult = {
  id: "dynamics-qian-risk",
  title: "强推进人格撞上高风险压力场",
  summary: "你不是没有力量。你是带着太强的主导惯性，撞上了一个不能硬闯的压力场。",
  oldReaction: "你越想证明自己还能推进，越容易把自己推入风险。",
  pressurePattern: "现实正在要求你停下、观察、补给，而不是继续硬推。",
  behaviorInertia: "一旦被质疑能力，你会重新启动强行推进。",
};

export const demoBreachScan: BreachScanResult = {
  id: "breach-scan-qian-risk",
  mainBreachId: "mud-point",
  breaches: [
    {
      id: "mud-point",
      name: "沾泥处",
      positionLabel: "主破口",
      intensity: "primary",
      oldReaction: "你已经陷入，却还在用“我能推进”维持体面。",
      breachSentence: "从这里破，就是暂停一个过早推进的动作。",
      deviceId: "stop-anchor",
    },
    {
      id: "wound-point",
      name: "受伤处",
      positionLabel: "备选破口",
      intensity: "secondary",
      oldReaction: "你已经受损，却还不肯退出或求援。",
      breachSentence: "从这里破，就是承认真实风险并请求协助。",
      deviceId: "exit-hook",
    },
    {
      id: "standby-point",
      name: "待机处",
      positionLabel: "备选破口",
      intensity: "secondary",
      oldReaction: "你把等待误解成了无能。",
      breachSentence: "从这里破，就是把等待变成补给，而不是羞耻。",
      deviceId: "standby-disk",
    },
  ],
};

export const demoYaoDevices: YaoDevice[] = [
  {
    id: "stop-anchor",
    name: "止进锚",
    shortDefinition: "它不是让你更强，而是在你再次想硬推时，把你钉回一个可等待的位置。",
    breaksReaction: "继续主导、继续推进、继续证明自己还能处理。",
    notFor: "不是逃避，也不是认输。",
  },
  {
    id: "exit-hook",
    name: "出穴钩",
    shortDefinition: "它负责把你从已经受损的位置拉出来。",
    breaksReaction: "已经受伤，却还假装自己没事。",
    notFor: "不是抱怨，也不是甩锅。",
  },
  {
    id: "standby-disk",
    name: "待机盘",
    shortDefinition: "它负责把等待变成补给，而不是羞耻。",
    breaksReaction: "把不立刻推进理解为失败。",
    notFor: "不是拖延，也不是摆烂。",
  },
];

export const demoRepairMethods: RepairMethod[] = [
  {
    id: "withdraw-premature-commitment",
    name: "撤回一个过早承诺",
    firstAction: "今天暂停一个你已经答应、但其实风险未明的推进动作。",
    forbiddenAction: "不要继续用“我能处理”掩盖你已经陷进去。",
    relapseReminder: "你最容易在别人质疑你能力时，重新启动强行推进。",
  },
];
