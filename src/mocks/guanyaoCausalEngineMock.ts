import type {
  ChronoCoordinate,
  DynamicFieldModifiers,
  ExternalEnvironmentType,
  LocationAnchor,
  MotherCodeProfile,
  PressureSeed,
  RepairMethod,
  Trigram,
  YaoLayer,
  YaoPosition,
  YaoDevice,
} from "../types/guanyaoCausalEngine";

export const mockLocationAnchors = [
  {
    anchorId: "geo-high-competition-city",
    anchorType: "high_competition_city",
    label: "高竞争城市",
    pressureBiasTags: ["工作责任压力", "自我证明压力", "金钱安全压力"],
    fieldBiasModifier: ["硬撑轨道", "控制防线"],
    weightModifier: 8,
  },
  {
    anchorId: "geo-family-dense-environment",
    anchorType: "family_dense_environment",
    label: "家庭关系密集环境",
    pressureBiasTags: ["家庭牵引压力", "关系评价压力", "边界侵入压力"],
    fieldBiasModifier: ["责任吞咽", "讨好回路", "边界塌陷"],
    weightModifier: 7,
  },
  {
    anchorId: "geo-unstable-migration",
    anchorType: "unstable_migration",
    label: "漂泊 / 迁移不稳定",
    pressureBiasTags: ["失控压力", "金钱安全压力", "沉默消耗压力"],
    fieldBiasModifier: ["后撤惯性", "失控预警"],
    weightModifier: 6,
  },
  {
    anchorId: "geo-business-pressure-field",
    anchorType: "business_pressure_field",
    label: "商业高压场",
    pressureBiasTags: ["工作责任压力", "自我证明压力", "关系评价压力"],
    fieldBiasModifier: ["控制防线", "解释冲动"],
    weightModifier: 8,
  },
  {
    anchorId: "geo-low-support-space",
    anchorType: "low_support_space",
    label: "低支持空间",
    pressureBiasTags: ["沉默消耗压力", "家庭牵引压力", "边界侵入压力"],
    fieldBiasModifier: ["后撤惯性", "责任吞咽"],
    weightModifier: 5,
  },
  {
    anchorId: "geo-unknown",
    anchorType: "unknown",
    label: "未知地利锚点",
    pressureBiasTags: [],
    fieldBiasModifier: [],
    weightModifier: 0,
  },
] satisfies LocationAnchor[];

export const mockChronoCoordinate = {
  year: 1995,
  month: 6,
  day: 2,
  hourBranch: "子时",
  locationAnchor: mockLocationAnchors[0],
} satisfies ChronoCoordinate;

export const mockDynamicFieldModifiers = {
  emotionalIntensity: 4,
  pressureDuration: "within_one_month",
} satisfies DynamicFieldModifiers;

export const mockDynamicFieldModifierCases = {
  lightNew: {
    emotionalIntensity: 2,
    pressureDuration: "just_happened",
  },
  highRecent: {
    emotionalIntensity: 4,
    pressureDuration: "within_one_week",
  },
  longRunningCritical: {
    emotionalIntensity: 5,
    pressureDuration: "long_running",
  },
} satisfies Record<string, DynamicFieldModifiers>;

export const mockMotherCodeProfiles = [
  {
    motherCodeId: "mother-hard-hold",
    motherCodeName: "硬撑底盘",
    lowerTrigram: "坤",
    baseForce: "用持续承压维持局面不散。",
    defaultReactionPattern: "压力升高时先压住自己，再替局面补缺口。",
    pressureSensitiveZones: ["工作压力", "自我证明压力", "家庭压力"],
    defenseTendency: "把停顿误判为失控。",
    behaviorBias: "用过量承担换取短暂掌控。",
  },
  {
    motherCodeId: "mother-control-line",
    motherCodeName: "控制防线",
    lowerTrigram: "乾",
    baseForce: "通过预判和校准降低不确定性。",
    defaultReactionPattern: "先收紧规则，再收紧关系里的变量。",
    pressureSensitiveZones: ["失控压力", "关系压力", "金钱压力"],
    defenseTendency: "把未确认的变化视为风险入口。",
    behaviorBias: "用控制替代真实确认。",
  },
  {
    motherCodeId: "mother-retreat-loop",
    motherCodeName: "后撤惯性",
    lowerTrigram: "艮",
    baseForce: "通过后退保存反应余地。",
    defaultReactionPattern: "先撤出现场，再在脑内反复复盘。",
    pressureSensitiveZones: ["关系压力", "家庭压力", "自我证明压力"],
    defenseTendency: "把暴露需求等同于失去位置。",
    behaviorBias: "用沉默保留表面稳定。",
  },
] satisfies MotherCodeProfile[];

export const mockPressureSeeds = [
  {
    seedId: "seed-relationship-unanswered",
    sceneText: "对方没有回应，你开始替沉默补完整个结论。",
    pressureType: "关系压力",
    relationshipRole: "亲密关系",
    triggerMoment: "信息停在已读之后。",
    intensityLevel: "high",
    costHint: "你会先收紧表达，再用冷处理防止自己显得需要。",
    fieldBias: "确认缺口",
    locationTags: ["关系评价压力", "沉默消耗压力", "低支持空间"],
  },
  {
    seedId: "seed-work-extra-load",
    sceneText: "任务临时加码，你第一反应是接住，而不是校准边界。",
    pressureType: "工作压力",
    relationshipRole: "协作关系",
    triggerMoment: "截止时间被压缩。",
    intensityLevel: "critical",
    costHint: "你会把不合理变成自己的执行问题。",
    fieldBias: "承压过载",
    locationTags: ["工作责任压力", "自我证明压力", "硬撑轨道"],
  },
  {
    seedId: "seed-family-demand",
    sceneText: "家人的要求压过你的节奏，你开始自动让位。",
    pressureType: "家庭压力",
    relationshipRole: "家庭关系",
    triggerMoment: "对方把期待说成理所当然。",
    intensityLevel: "medium",
    costHint: "你会用顺从换安静，再把不满延后处理。",
    fieldBias: "边界让渡",
    locationTags: ["家庭牵引压力", "边界侵入压力", "责任吞咽"],
  },
  {
    seedId: "seed-money-tight-window",
    sceneText: "一笔支出逼近，你开始用更高控制感抵消不安。",
    pressureType: "金钱压力",
    relationshipRole: "资源关系",
    triggerMoment: "预算窗口突然收紧。",
    intensityLevel: "high",
    costHint: "你会削减必要需求，同时提高对所有细节的监控。",
    fieldBias: "资源收缩",
    locationTags: ["金钱安全压力", "失控压力", "控制防线"],
  },
  {
    seedId: "seed-self-proof",
    sceneText: "你被看见的机会出现了，但你先检查自己够不够硬。",
    pressureType: "自我证明压力",
    relationshipRole: "公开场域",
    triggerMoment: "评价即将落到你身上。",
    intensityLevel: "medium",
    costHint: "你会把表达变成过度准备，把行动推迟到更稳的时候。",
    fieldBias: "证明负荷",
    locationTags: ["自我证明压力", "关系评价压力", "解释冲动"],
  },
  {
    seedId: "seed-control-break",
    sceneText: "计划被打断，你立刻开始寻找新的控制点。",
    pressureType: "失控压力",
    relationshipRole: "现场变量",
    triggerMoment: "原有安排失去效力。",
    intensityLevel: "critical",
    costHint: "你会把恢复秩序放到真实判断之前。",
    fieldBias: "秩序断裂",
    locationTags: ["失控压力", "失控预警", "控制防线"],
  },
] satisfies PressureSeed[];

export const mockYaoDevices = [
  {
    deviceId: "device-boundary-needle",
    deviceName: "边界针",
    deviceType: "cut",
    deviceFunction: "把自动承担切成可确认的责任段。",
    activationContext: "对方把紧急感推给你时启动。",
    counterPattern: "先定边界，再决定是否接住。",
  },
  {
    deviceId: "device-delay-lock",
    deviceName: "延迟锁",
    deviceType: "hold",
    deviceFunction: "阻断立刻控制现场的旧反应。",
    activationContext: "变量失控、你准备马上重排全局时启动。",
    counterPattern: "先延迟介入，再读取真实损失。",
  },
  {
    deviceId: "device-signal-pin",
    deviceName: "显影钉",
    deviceType: "mark",
    deviceFunction: "把沉默里的猜测钉回一个可验证信号。",
    activationContext: "你开始替对方补结论时启动。",
    counterPattern: "先索取一个明确信号，再决定下一步。",
  },
  {
    deviceId: "device-cost-marker",
    deviceName: "代价标尺",
    deviceType: "measure",
    deviceFunction: "把被遮蔽的代价拉回当前决策。",
    activationContext: "你准备忽略损耗继续推进时启动。",
    counterPattern: "先命名代价，再继续执行。",
  },
] satisfies YaoDevice[];

export const mockRepairMethods = [
  {
    methodId: "method-boundary-needle",
    firstAction: "先说出你能接住的一段，不接整件事。",
    forbiddenAction: "不要立刻补位，也不要替对方压缩成本。",
    executionWindow: "触发后的前 90 秒。",
    fallbackMove: "如果现场催促，只重复边界，不解释动机。",
    relapseWarning: "你一旦开始证明自己扛得住，旧链条已经接管。",
  },
  {
    methodId: "method-delay-lock",
    firstAction: "先停 30 秒，只记录失控点，不立刻修正。",
    forbiddenAction: "不要马上重排计划，也不要用命令感压回秩序。",
    executionWindow: "变量打断后的第一轮反应。",
    fallbackMove: "如果必须回应，只给一个最小确认句。",
    relapseWarning: "你越快恢复秩序，越容易忽略真正的代价。",
  },
  {
    methodId: "method-signal-pin",
    firstAction: "只问一个可回答的问题，拿回真实信号。",
    forbiddenAction: "不要继续推演对方的态度，也不要提前撤退。",
    executionWindow: "你准备沉默或冷处理之前。",
    fallbackMove: "如果对方仍不回应，先停止补结论，保留下一次确认窗口。",
    relapseWarning: "你把沉默解释完整时，切口已经关闭。",
  },
  {
    methodId: "method-cost-marker",
    firstAction: "先说出这一步会消耗什么，再决定是否继续。",
    forbiddenAction: "不要把损耗吞掉，也不要用效率覆盖代价。",
    executionWindow: "你准备继续推进之前。",
    fallbackMove: "如果现场不能展开，只记录一个代价词。",
    relapseWarning: "你不命名代价，旧反应就会把它算到你身上。",
  },
] satisfies RepairMethod[];

export const mockHexagramFormationMotherCode = {
  motherCodeId: "mother-dui-transformer",
  motherCodeName: "兑｜转化者",
  lowerTrigram: "兑",
  baseForce: "把关系、交换与表达中的压力转化为下一步行动。",
  defaultReactionPattern: "压力升高时先读取关系反馈，再决定是否继续交换。",
  pressureSensitiveZones: ["家庭压力", "金钱压力", "关系压力"],
  defenseTendency: "把资源压力和关系评价混在一起处理。",
  behaviorBias: "用沟通、缓和或转译来维持关系可交换性。",
} satisfies MotherCodeProfile;

export const mockHexagramFormationCases = {
  familyFinance: {
    caseId: "hexagram-sample-a-family-finance",
    motherCodeProfile: mockHexagramFormationMotherCode,
    pressureSeed: {
      seedId: "seed-family-finance-pressure",
      sceneText: "家庭财务压力逼近，你开始替整个家庭托底。",
      pressureType: "家庭财务压力",
      relationshipRole: "家庭关系",
      triggerMoment: "家里的支出和责任同时压到你身上。",
      intensityLevel: "high",
      costHint: "你会先扛住责任，再延后处理自己的边界。",
      fieldBias: "家庭托底",
      locationTags: ["家庭牵引压力", "责任吞咽", "金钱安全压力"],
    },
    expectedUpperTrigram: "坤",
    expectedExternalEnvironmentType: "kun_responsibility_support",
    expectedLowerTrigram: "兑",
    expectedHexagramCode: "019",
    expectedHexagramName: "临",
    expectedHexagramTitle: "悬崖边",
    expectedMainCut: { yaoPosition: 4, yaoLayer: "behavior" },
    expectedSecondaryCut: { yaoPosition: 3, yaoLayer: "thought" },
    expectedMainDeviceName: "清账定界法",
  },
  debt: {
    caseId: "hexagram-sample-b-debt",
    motherCodeProfile: mockHexagramFormationMotherCode,
    pressureSeed: {
      seedId: "seed-debt-pressure",
      sceneText: "负债压力把你困在原地，你很难从资源缺口里抽离。",
      pressureType: "负债压力",
      relationshipRole: "资源关系",
      triggerMoment: "还款窗口逼近，现金流无法覆盖。",
      intensityLevel: "critical",
      costHint: "你会压低需求、隐瞒困局，并试图独自撑住。",
      fieldBias: "债务困局",
      locationTags: ["金钱安全压力", "深陷困局", "难以抽离压力"],
    },
    expectedUpperTrigram: "坎",
    expectedExternalEnvironmentType: "kan_trapped_debt",
    expectedLowerTrigram: "兑",
    expectedHexagramCode: "047",
    expectedHexagramName: "困",
    expectedHexagramTitle: "围墙里的沉默者",
    expectedMainCut: { yaoPosition: 4, yaoLayer: "behavior" },
    expectedSecondaryCut: { yaoPosition: 3, yaoLayer: "thought" },
    expectedMainDeviceName: "止滚清债法",
  },
} satisfies Record<
  string,
  {
    caseId: string;
    motherCodeProfile: MotherCodeProfile & { lowerTrigram: Trigram };
    pressureSeed: PressureSeed;
    expectedUpperTrigram: Trigram;
    expectedExternalEnvironmentType: ExternalEnvironmentType;
    expectedLowerTrigram: Trigram;
    expectedHexagramCode: string;
    expectedHexagramName: string;
    expectedHexagramTitle: string;
    expectedMainCut: { yaoPosition: YaoPosition; yaoLayer: YaoLayer };
    expectedSecondaryCut: { yaoPosition: YaoPosition; yaoLayer: YaoLayer };
    expectedMainDeviceName: string;
  }
>;
