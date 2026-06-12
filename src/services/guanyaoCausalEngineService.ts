import {
  mockChronoCoordinate,
  mockDynamicFieldModifiers,
  mockHexagramFormationCases,
  mockLocationAnchors,
  mockMotherCodeProfiles,
  mockPressureSeeds,
  mockRepairMethods,
  mockYaoDevices,
} from "../mocks/guanyaoCausalEngineMock";
import type {
  BehaviorEngineScan,
  BreachPoint,
  CausalTraceEntry,
  ChronoCoordinate,
  CurrentHexagramProfile,
  DynamicFieldModifiers,
  EmotionalIntensity,
  ExternalEnvironmentType,
  GuanyaoCausalPipelineResult,
  HexagramField,
  HexagramLayerClassification,
  HourBranch,
  LocationAnchor,
  MotherCodeProfile,
  PersonalityAsset,
  PersonalityGravityValue,
  PressureField,
  PressureDuration,
  PressureIntensity,
  PressureSeed,
  RepairMethod,
  Trigram,
  UpperCodeFormation,
  YaoDevice,
} from "../types/guanyaoCausalEngine";

const hourBranches: HourBranch[] = [
  "子时",
  "丑时",
  "寅时",
  "卯时",
  "辰时",
  "巳时",
  "午时",
  "未时",
  "申时",
  "酉时",
  "戌时",
  "亥时",
];

const intensityWeight: Record<PressureIntensity, number> = {
  low: 25,
  medium: 50,
  high: 75,
  critical: 90,
};

const emotionalIntensityWeight: Record<EmotionalIntensity, number> = {
  1: -8,
  2: -4,
  3: 0,
  4: 8,
  5: 14,
};

const pressureDurationWeight: Record<PressureDuration, number> = {
  just_happened: -4,
  within_one_week: 0,
  within_one_month: 6,
  long_running: 12,
};

const pressureDepthByDuration: Record<PressureDuration, string> = {
  just_happened: "早期触发",
  within_one_week: "中段放大",
  within_one_month: "旧反应接管",
  long_running: "长期复发",
};

const externalEnvironmentProfiles: Record<
  ExternalEnvironmentType,
  {
    name: string;
    upperTrigram: Trigram;
    personalityKeywords: string[];
    systemKeywords: string[];
    lifecycleKeywords: string[];
    personalityDynamics: string;
    systemMechanism: string;
    lifecycleStage: string;
    externalPressureReading: string;
    upperCodeReading: string;
  }
> = {
  qian_control_decision: {
    name: "乾型环境｜控制权 / 决策权压力",
    upperTrigram: "乾",
    personalityKeywords: ["掌控", "主导权", "方向", "判断", "必须拍板"],
    systemKeywords: ["控制权", "决策权", "权力", "权责", "规则", "谁说了算"],
    lifecycleKeywords: ["被迫", "必须", "拍板", "挑战", "夺走"],
    personalityDynamics: "控制反应被迫上提，个体试图用决断感压住不确定。",
    systemMechanism: "权责结构收紧，外部要求你给出明确判断。",
    lifecycleStage: "进入需要定向、承担选择后果的阶段。",
    externalPressureReading: "外部压力来自控制权和决策权的集中。",
    upperCodeReading: "现实种子撞击后，控制权与决策权成为主导压力，上码显影为乾。",
  },
  kun_responsibility_support: {
    name: "坤型环境｜责任 / 承载 / 家庭托底压力",
    upperTrigram: "坤",
    personalityKeywords: ["接住", "扛住", "补位", "让位", "顺从"],
    systemKeywords: ["家庭", "财务", "责任", "承载", "托底", "供养", "团队", "家里"],
    lifecycleKeywords: ["长期", "不能塌", "稳定", "支出", "同时压到"],
    personalityDynamics: "承担惯性被放大，个体倾向先接住别人再处理自己。",
    systemMechanism: "责任和资源需求向你聚拢，形成承载型外压。",
    lifecycleStage: "进入被要求托底、补位或维持稳定的阶段。",
    externalPressureReading: "外部压力来自家庭、责任与承载结构。",
    upperCodeReading: "现实种子撞击后，责任与承载成为主导压力，上码显影为坤。",
  },
  zhen_change_push: {
    name: "震型环境｜推进 / 变化 / 突发压力",
    upperTrigram: "震",
    personalityKeywords: ["行动", "应激", "马上", "推进", "启动"],
    systemKeywords: ["项目", "外部催促", "局面", "安排", "任务"],
    lifecycleKeywords: ["突然", "变化", "打断", "不能再拖", "加速", "临时"],
    personalityDynamics: "应激推进被点燃，个体容易先动作后判断。",
    systemMechanism: "外部变量突然上场，逼迫系统快速改轨。",
    lifecycleStage: "进入变化启动、旧节奏被打断的阶段。",
    externalPressureReading: "外部压力来自突发变化和推进要求。",
    upperCodeReading: "现实种子撞击后，变化与推进成为主导压力，上码显影为震。",
  },
  xun_uncertainty_choice: {
    name: "巽型环境｜不确定 / 选择 / 渗透压力",
    upperTrigram: "巽",
    personalityKeywords: ["犹豫", "试探", "摇摆", "比较", "不知道"],
    systemKeywords: ["信息不清", "规则模糊", "局面暧昧", "入口", "路径"],
    lifecycleKeywords: ["选择太多", "进入", "从哪里", "分岔", "未显形"],
    personalityDynamics: "判断被细小变量渗透，个体容易反复比较。",
    systemMechanism: "多个选项持续进入，边界难以一次性确定。",
    lifecycleStage: "进入选择分岔、信号未完全显形的阶段。",
    externalPressureReading: "外部压力来自不确定性和选择渗透。",
    upperCodeReading: "现实种子撞击后，不确定性与进入路径成为主导压力，上码显影为巽。",
  },
  kan_trapped_debt: {
    name: "坎型环境｜深陷困局 / 债务 / 难以抽离压力",
    upperTrigram: "坎",
    personalityKeywords: ["隐瞒", "硬撑", "独自", "收缩", "压低需求"],
    systemKeywords: ["负债", "债务", "现金流", "资源缺口", "周转", "还款"],
    lifecycleKeywords: ["困局", "深陷", "难以抽离", "滚动", "一环扣一环", "越想解决越难"],
    personalityDynamics: "风险感下沉，个体容易收缩、隐瞒或独自硬撑。",
    systemMechanism: "资源缺口与抽离成本叠加，形成困局型外压。",
    lifecycleStage: "进入低余量、难退出、必须面对风险窗口的阶段。",
    externalPressureReading: "外部压力来自债务、困局与难以抽离的资源陷落。",
    upperCodeReading: "现实种子撞击后，困局与难以抽离成为主导压力，上码显影为坎。",
  },
  li_expression_truth: {
    name: "离型环境｜表达 / 误解 / 真相不被重视压力",
    upperTrigram: "离",
    personalityKeywords: ["表达", "证明", "解释", "说不清", "被看见"],
    systemKeywords: ["误解", "真相", "信息", "曲解", "遮蔽"],
    lifecycleKeywords: ["需要证明", "没人看见", "不被重视", "公开", "显影"],
    personalityDynamics: "表达需求被点亮，同时害怕真实信号不被接住。",
    systemMechanism: "信息可见度升高，误读和评价开始制造外压。",
    lifecycleStage: "进入需要显影、说明或被公开读取的阶段。",
    externalPressureReading: "外部压力来自表达、误解与真相显影。",
    upperCodeReading: "现实种子撞击后，表达与真相显影成为主导压力，上码显影为离。",
  },
  gen_boundary_stop: {
    name: "艮型环境｜边界 / 停滞 / 止损压力",
    upperTrigram: "艮",
    personalityKeywords: ["拒绝", "挡住", "设限", "停下", "不能再"],
    systemKeywords: ["边界", "止损", "消耗", "突破", "继续做"],
    lifecycleKeywords: ["停滞", "暂停", "卡住", "终止", "该挡住了"],
    personalityDynamics: "停止动作被迫出现，个体需要从惯性里切出边界。",
    systemMechanism: "外部结构不再允许继续推进，要求止损或设限。",
    lifecycleStage: "进入收束、暂停和重定边界的阶段。",
    externalPressureReading: "外部压力来自边界、停滞和止损要求。",
    upperCodeReading: "现实种子撞击后，边界与止损成为主导压力，上码显影为艮。",
  },
  dui_relationship_exchange: {
    name: "兑型环境｜关系 / 冲突 / 沟通 / 交换压力",
    upperTrigram: "兑",
    personalityKeywords: ["沟通", "回应", "缓和", "转译", "表达"],
    systemKeywords: ["关系", "冲突", "交换", "合作", "谈判"],
    lifecycleKeywords: ["紧张", "搁置", "不平衡", "卡住", "僵硬", "失真"],
    personalityDynamics: "关系反馈变成主压力，个体倾向通过沟通换取稳定。",
    systemMechanism: "交换结构发生摩擦，沟通成本开始上升。",
    lifecycleStage: "进入关系协商、冲突处理或交换重估的阶段。",
    externalPressureReading: "外部压力来自关系、沟通与交换摩擦。",
    upperCodeReading: "现实种子撞击后，关系与交换成为主导压力，上码显影为兑。",
  },
};

const knownHexagramMatrix: Record<string, { code: string; name: string; title: string }> = {
  "坤-兑": { code: "019", name: "临", title: "悬崖边" },
  "坎-兑": { code: "047", name: "困", title: "围墙里的沉默者" },
};

const fallbackTrigramByMotherCode: Record<string, Trigram> = {
  硬撑底盘: "坤",
  控制防线: "乾",
  后撤惯性: "艮",
  转化者: "兑",
};

const executionWindowByDuration: Record<PressureDuration, string> = {
  just_happened: "第一秒截断",
  within_one_week: "下一次触发时立刻截断",
  within_one_month: "先停止复发动作，再做第一动作",
  long_running: "先做低强度反向动作，不要求一次扭转",
};

const requiredTraceSteps = [
  "chrono_to_mother_code",
  "mother_code_to_pressure_seed",
  "dynamic_modifiers_to_pressure_field",
  "pressure_seed_to_pressure_field",
  "pressure_field_to_current_hexagram_profile",
  "pressure_field_to_hexagram_field",
  "hexagram_field_to_behavior_scan",
  "behavior_scan_to_breach_points",
  "breach_point_to_yao_device",
  "yao_device_to_repair_method",
  "repair_method_to_personality_asset",
] as const;

const stableHash = (value: string): number =>
  Array.from(value).reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 7);

const scoreTextOverlap = (source: string, target: string): number => {
  const sourceTokens = source.split(/[，。；、\s/]+/).filter((token) => token.length >= 2);
  return sourceTokens.some((token) => target.includes(token)) ? 1 : 0;
};

const pickByScore = <T>(
  items: T[],
  scoreItem: (item: T) => number,
  tieKey: (item: T) => string,
): T =>
  [...items].sort((left, right) => {
    const scoreDelta = scoreItem(right) - scoreItem(left);

    if (scoreDelta !== 0) {
      return scoreDelta;
    }

    return stableHash(tieKey(left)) - stableHash(tieKey(right));
  })[0];

const getPressureLevelName = (upperFieldWeight: number): string => {
  if (upperFieldWeight < 40) return "低压惯性场";
  if (upperFieldWeight < 70) return "中压冲突场";
  if (upperFieldWeight < 85) return "高压接管场";
  return "临界暴露场";
};

const getRiskWindow = (upperFieldWeight: number): string => {
  if (upperFieldWeight < 40) return "低压观察窗口";
  if (upperFieldWeight < 70) return "冲突放大窗口";
  if (upperFieldWeight < 85) return "旧反应接管窗口";
  return "临界暴露窗口";
};

const getPrimaryConflict = (hexagramField: HexagramField): string => {
  if (hexagramField.conflictStructure.includes("控制")) return "控制反应接管点";
  if (hexagramField.inertiaPattern.includes("沉默")) return "沉默补全接管点";
  if (hexagramField.inertiaPattern.includes("承担")) return "过量承担接管点";
  return "旧反应接管点";
};

const getAntiInstinctOpportunity = (hexagramField: HexagramField): string => {
  if (hexagramField.conflictStructure.includes("控制")) return "延迟介入，先读损失";
  if (hexagramField.inertiaPattern.includes("沉默")) return "索取信号，停止补结论";
  if (hexagramField.costPattern.includes("损耗") || hexagramField.costPattern.includes("代价")) return "先命名代价，再继续执行";
  return "先切边界，再接责任";
};

const shortText = (value: string): string => value.replace(/[。；，]/g, " ").trim().slice(0, 34);

const resolveDynamicModifiers = (
  dynamicModifiers?: Partial<DynamicFieldModifiers>,
): DynamicFieldModifiers => ({
  ...mockDynamicFieldModifiers,
  ...dynamicModifiers,
});

const unknownLocationAnchor = mockLocationAnchors.find((anchor) => anchor.anchorType === "unknown") ?? mockLocationAnchors[0];

const resolveLocationAnchor = (locationAnchor?: LocationAnchor): LocationAnchor =>
  locationAnchor ?? unknownLocationAnchor;

const hasFlexibleTagMatch = (sourceTags: string[], targetTags: string[]): boolean =>
  sourceTags.some((sourceTag) =>
    targetTags.some((targetTag) => sourceTag.includes(targetTag) || targetTag.includes(sourceTag)),
  );

export const resolveMotherCode = (
  chronoCoordinate: ChronoCoordinate,
): MotherCodeProfile => {
  const hourBranchIndex = Math.max(hourBranches.indexOf(chronoCoordinate.hourBranch), 0);
  const cycleSeed = chronoCoordinate.year + chronoCoordinate.month * 3 + chronoCoordinate.day * 5 + hourBranchIndex * 8;
  const motherCodeIndex = Math.abs(cycleSeed) % mockMotherCodeProfiles.length;

  return mockMotherCodeProfiles[motherCodeIndex];
};

export const selectPressureSeed = (
  motherCodeProfile: MotherCodeProfile,
  chronoCoordinate?: ChronoCoordinate,
): PressureSeed =>
  pickByScore(
    mockPressureSeeds,
    (seed) => {
      const zoneHit = motherCodeProfile.pressureSensitiveZones.includes(seed.pressureType) ? 3 : 0;
      const fieldBiasHit = scoreTextOverlap(seed.fieldBias, motherCodeProfile.behaviorBias) ? 2 : 0;
      const sceneHit = scoreTextOverlap(motherCodeProfile.defenseTendency, seed.sceneText) ? 1 : 0;
      const intensityHit = seed.intensityLevel === "high" || seed.intensityLevel === "critical" ? 1 : 0;
      const relationshipHit = motherCodeProfile.pressureSensitiveZones.some((zone) =>
        seed.relationshipRole.includes(zone.replace("压力", "")),
      )
        ? 1
        : 0;
      const motherScore = zoneHit + fieldBiasHit + sceneHit + intensityHit + relationshipHit;
      const locationAnchor = resolveLocationAnchor(chronoCoordinate?.locationAnchor);
      const seedLocationTags = [seed.pressureType, seed.fieldBias, ...(seed.locationTags ?? [])];
      const locationPressureHit = hasFlexibleTagMatch(seedLocationTags, locationAnchor.pressureBiasTags)
        ? locationAnchor.weightModifier
        : 0;
      const locationFieldHit = hasFlexibleTagMatch(seedLocationTags, locationAnchor.fieldBiasModifier)
        ? Math.round(locationAnchor.weightModifier * 0.75)
        : 0;
      const locationScore = motherScore > 0 ? locationPressureHit + locationFieldHit : 0;

      return motherScore + locationScore;
    },
    (seed) => `${motherCodeProfile.motherCodeId}:${seed.seedId}`,
  );

export const buildPressureField = (
  motherCodeProfile: MotherCodeProfile,
  pressureSeed: PressureSeed,
  locationAnchor?: LocationAnchor,
  dynamicModifiers: DynamicFieldModifiers = mockDynamicFieldModifiers,
): PressureField => {
  const anchor = resolveLocationAnchor(locationAnchor);
  const baseWeight = intensityWeight[pressureSeed.intensityLevel];
  const seedLocationTags = [pressureSeed.pressureType, pressureSeed.fieldBias, ...(pressureSeed.locationTags ?? [])];
  const pressureLocationWeight = hasFlexibleTagMatch(seedLocationTags, anchor.pressureBiasTags)
    ? Math.min(anchor.weightModifier, 8)
    : 0;
  const fieldLocationWeight = hasFlexibleTagMatch(seedLocationTags, anchor.fieldBiasModifier)
    ? Math.min(Math.round(anchor.weightModifier * 0.5), 5)
    : 0;
  const locationWeight = pressureLocationWeight + fieldLocationWeight;
  const intensityModifier = emotionalIntensityWeight[dynamicModifiers.emotionalIntensity];
  const durationModifier = pressureDurationWeight[dynamicModifiers.pressureDuration];
  const dynamicWeight = intensityModifier + durationModifier;
  const upperFieldWeight = Math.min(100, Math.max(0, baseWeight + locationWeight + dynamicWeight));
  const activatedPressureZone = pressureSeed.fieldBias || motherCodeProfile.pressureSensitiveZones[0];

  return {
    fieldId: `field-${pressureSeed.pressureType}-${pressureSeed.fieldBias}-${pressureSeed.intensityLevel}`,
    fieldName: `${pressureSeed.pressureType} / ${pressureSeed.fieldBias} / ${pressureSeed.intensityLevel}`,
    activatedPressureZone,
    reactionTrigger: pressureSeed.triggerMoment,
    costDirection: pressureSeed.costHint,
    riskWindow: getRiskWindow(upperFieldWeight),
    upperFieldWeight,
    locationWeight,
    locationFieldNote:
      anchor.anchorType === "unknown"
        ? "本局未提供地利锚点，压力场按母码与现实压力种子构建。"
        : `地利锚点「${anchor.label}」为当前压力场增加 ${locationWeight} 点语境权重。`,
    emotionalIntensity: dynamicModifiers.emotionalIntensity,
    pressureDuration: dynamicModifiers.pressureDuration,
    dynamicWeight,
    intensityFieldNote: `本局压力强度为 ${dynamicModifiers.emotionalIntensity}，权重修正 ${intensityModifier}。`,
    durationFieldNote: `本局困扰时间为 ${dynamicModifiers.pressureDuration}，权重修正 ${durationModifier}。`,
  };
};

const getHexagramClassifierText = (pressureSeed: PressureSeed): string =>
  [
    pressureSeed.sceneText,
    pressureSeed.pressureType,
    pressureSeed.relationshipRole,
    pressureSeed.triggerMoment,
    pressureSeed.costHint,
    pressureSeed.fieldBias,
    ...(pressureSeed.locationTags ?? []),
  ].join(" ");

const scoreLineImpact = (keywords: string[], text: string): number => {
  const hitCount = keywords.reduce((score, keyword) => score + (text.includes(keyword) ? 1 : 0), 0);

  if (hitCount <= 0) return 0;
  if (hitCount <= 1) return 2;
  if (hitCount <= 2) return 4;
  return 6;
};

const resolveDominantLine = (lineImpact: UpperCodeFormation["lineImpact"]): HexagramLayerClassification["dominantLayer"] => {
  const lineScores = [
    ["personality", lineImpact.personalityDynamicsLine],
    ["system", lineImpact.systemMechanismLine],
    ["lifecycle", lineImpact.lifecycleStageLine],
  ] as const;
  const sortedScores = [...lineScores].sort((left, right) => right[1] - left[1]);

  return sortedScores[0][1] === sortedScores[1][1] ? "mixed" : sortedScores[0][0];
};

const scoreUpperCodeFormation = (
  formation: Pick<UpperCodeFormation, "lineImpact">,
): number =>
  formation.lineImpact.personalityDynamicsLine +
  formation.lineImpact.systemMechanismLine +
  formation.lineImpact.lifecycleStageLine;

export const formUpperCodeFromPressureSeed = (pressureSeed: PressureSeed): UpperCodeFormation => {
  const text = getHexagramClassifierText(pressureSeed);
  const formationCandidates = (Object.keys(externalEnvironmentProfiles) as ExternalEnvironmentType[]).map((environmentType) => {
    const profile = externalEnvironmentProfiles[environmentType];
    const lineImpact = {
      personalityDynamicsLine: scoreLineImpact(profile.personalityKeywords, text),
      systemMechanismLine: scoreLineImpact(profile.systemKeywords, text),
      lifecycleStageLine: scoreLineImpact(profile.lifecycleKeywords, text),
    };

    return {
      pressureSeedLabel: `${pressureSeed.pressureType}｜${pressureSeed.fieldBias}`,
      lineImpact,
      dominantLine: resolveDominantLine(lineImpact),
      externalEnvironmentType: environmentType,
      upperTrigram: profile.upperTrigram,
      formationReason: `现实种子「${pressureSeed.seedId}」撞击人格动力线 ${lineImpact.personalityDynamicsLine}、系统机制线 ${lineImpact.systemMechanismLine}、生命周期线 ${lineImpact.lifecycleStageLine}，因此显影为「${profile.name}」。`,
      upperCodeReading: profile.upperCodeReading,
    } satisfies UpperCodeFormation;
  });

  return [...formationCandidates].sort((left, right) => {
    const scoreDelta = scoreUpperCodeFormation(right) - scoreUpperCodeFormation(left);

    if (scoreDelta !== 0) {
      return scoreDelta;
    }

    return stableHash(left.externalEnvironmentType) - stableHash(right.externalEnvironmentType);
  })[0];
};

export const classifyPressureSeedForHexagram = (
  pressureSeed: PressureSeed,
): HexagramLayerClassification => {
  const upperCodeFormation = formUpperCodeFromPressureSeed(pressureSeed);
  const profile = externalEnvironmentProfiles[upperCodeFormation.externalEnvironmentType];

  return {
    personalityDynamics: profile.personalityDynamics,
    systemMechanism: profile.systemMechanism,
    lifecycleStage: profile.lifecycleStage,
    dominantLayer: upperCodeFormation.dominantLine,
    externalEnvironmentType: upperCodeFormation.externalEnvironmentType,
    externalEnvironmentName: profile.name,
    upperTrigram: upperCodeFormation.upperTrigram,
    externalPressureReading: profile.externalPressureReading,
    classificationReason: upperCodeFormation.formationReason,
  };
};

export const resolveMotherCodeLowerTrigram = (motherCodeProfile: MotherCodeProfile): Trigram => {
  if (motherCodeProfile.lowerTrigram) {
    return motherCodeProfile.lowerTrigram;
  }

  const matchedName = Object.keys(fallbackTrigramByMotherCode).find((keyword) =>
    motherCodeProfile.motherCodeName.includes(keyword),
  );

  return matchedName ? fallbackTrigramByMotherCode[matchedName] : "坤";
};

export const resolvePersonalityGravityValue = (
  pressureField: PressureField,
): PersonalityGravityValue => {
  const weight = pressureField.upperFieldWeight;

  if (weight < 25) return "P1";
  if (weight < 45) return "P2";
  if (weight < 65) return "P3";
  if (weight < 80) return "P4";
  if (weight < 92) return "P5";
  return "P6";
};

const gravityReading: Record<PersonalityGravityValue, string> = {
  P1: "P1 轻微牵引",
  P2: "P2 局部承压",
  P3: "P3 冲突放大",
  P4: "P4 结构承压",
  P5: "P5 临界暴露",
  P6: "P6 重组关口",
};

export const formCurrentHexagramProfile = (
  motherCodeProfile: MotherCodeProfile,
  pressureSeed: PressureSeed,
  pressureField: PressureField,
): CurrentHexagramProfile => {
  const lowerTrigram = resolveMotherCodeLowerTrigram(motherCodeProfile);
  const upperCodeFormation = formUpperCodeFromPressureSeed(pressureSeed);
  const layerClassification = classifyPressureSeedForHexagram(pressureSeed);
  const upperTrigram = upperCodeFormation.upperTrigram;
  const matrixKey = `${upperTrigram}-${lowerTrigram}`;
  const knownHexagram = knownHexagramMatrix[matrixKey];
  const gravityValue = resolvePersonalityGravityValue(pressureField);
  const hexagramName = knownHexagram?.name ?? `${upperTrigram}${lowerTrigram}未命名局`;
  const hexagramCode = knownHexagram?.code ?? `V1-${upperTrigram}${lowerTrigram}`;
  const hexagramTitle = knownHexagram?.title ?? `${layerClassification.externalEnvironmentName}压入${motherCodeProfile.motherCodeName}`;

  return {
    lowerTrigram,
    lowerSource: "mother_code",
    upperTrigram,
    upperSource: "pressure_field",
    hexagramCode,
    hexagramName,
    hexagramTitle,
    upperCodeFormation,
    layerClassification,
    gravityValue,
    innerForceReading: `下卦「${lowerTrigram}」来自母码「${motherCodeProfile.motherCodeName}」，代表本局内在反应底盘。`,
    externalPressureReading: `${upperCodeFormation.upperCodeReading}上卦取「${upperTrigram}」。`,
    interactionReading: `上卦「${upperTrigram}」压入下卦「${lowerTrigram}」，形成本局卦码「${hexagramCode}｜${hexagramName}｜${hexagramTitle}」。`,
    currentSandboxReading: `${gravityReading[gravityValue]}。人格重力值不改变卦名，只决定本局风险窗口、六爻传导语气与器法干预强度。`,
  };
};

export const buildHexagramField = (
  motherCodeProfile: MotherCodeProfile,
  pressureField: PressureField,
  currentHexagramProfile?: CurrentHexagramProfile,
): HexagramField => {
  const pressureLevelName = getPressureLevelName(pressureField.upperFieldWeight);

  return {
    hexagramId: currentHexagramProfile
      ? `HEX-${currentHexagramProfile.hexagramCode}-${motherCodeProfile.motherCodeId}-${pressureField.fieldId}`
      : `HEX-${motherCodeProfile.motherCodeId}-${pressureField.fieldId}`,
    hexagramName: currentHexagramProfile
      ? `${currentHexagramProfile.hexagramCode}｜${currentHexagramProfile.hexagramName}｜${currentHexagramProfile.hexagramTitle}`
      : `${pressureLevelName} / ${motherCodeProfile.motherCodeName}`,
    behaviorFieldName: currentHexagramProfile
      ? `${currentHexagramProfile.hexagramName}${currentHexagramProfile.hexagramTitle}`
      : `${pressureLevelName}${motherCodeProfile.motherCodeName}`,
    currentTrack: `${motherCodeProfile.defaultReactionPattern}${pressureField.activatedPressureZone}`,
    inertiaPattern: `${motherCodeProfile.behaviorBias}正在接管当前反应`,
    conflictStructure: `想保持掌控，但${pressureField.activatedPressureZone}正在逼近代价`,
    costPattern: pressureField.costDirection,
    engineEntrySignal: `${pressureLevelName}_ENGINE_ENTRY`,
    pressureDepth: pressureField.pressureDuration
      ? pressureDepthByDuration[pressureField.pressureDuration]
      : undefined,
  };
};

export const runBehaviorEngineScan = (
  hexagramField: HexagramField,
): BehaviorEngineScan => {
  const primaryBreachCandidate = getPrimaryConflict(hexagramField);
  const antiInstinctOpportunity = getAntiInstinctOpportunity(hexagramField);

  return {
    scanId: `scan-${hexagramField.hexagramId}`,
    primaryBreachCandidate,
    secondaryBreachCandidates: [
      `${shortText(hexagramField.currentTrack)}的触发点`,
      `${shortText(hexagramField.costPattern)}的代价点`,
    ],
    oldReactionLoop: `${hexagramField.inertiaPattern} / ${hexagramField.currentTrack}`,
    hiddenCost: hexagramField.costPattern,
    antiInstinctOpportunity,
  };
};

export const resolveBreachPoints = (
  behaviorEngineScan: BehaviorEngineScan,
): BreachPoint[] => {
  const primary: BreachPoint = {
    breachId: `breach-primary-${stableHash(behaviorEngineScan.scanId)}`,
    breachType: "primary",
    breachTitle: behaviorEngineScan.primaryBreachCandidate,
    oldReaction: behaviorEngineScan.oldReactionLoop,
    triggerCondition: "第一轮压力到达时",
    costIfUnchanged: behaviorEngineScan.hiddenCost,
    antiInstinctDirection: behaviorEngineScan.antiInstinctOpportunity,
  };

  const secondary = behaviorEngineScan.secondaryBreachCandidates.map((candidate, index): BreachPoint => ({
    breachId: `breach-secondary-${index + 1}-${stableHash(`${behaviorEngineScan.scanId}:${candidate}`)}`,
    breachType: "secondary",
    breachTitle: candidate,
    oldReaction: shortText(behaviorEngineScan.oldReactionLoop),
    triggerCondition: index === 0 ? "你准备立刻补救时" : "你准备忽略损耗时",
    costIfUnchanged: shortText(behaviorEngineScan.hiddenCost),
    antiInstinctDirection: index === 0 ? "把反应延迟一个动作" : "先命名代价，再继续执行",
  }));

  return [primary, ...secondary];
};

export const resolveYaoDevice = (
  breachPoint: BreachPoint,
): YaoDevice =>
  pickByScore(
    mockYaoDevices,
    (device) => {
      const counterHit = scoreTextOverlap(device.counterPattern, breachPoint.antiInstinctDirection) ? 3 : 0;
      const contextHit = scoreTextOverlap(device.activationContext, breachPoint.triggerCondition) ? 2 : 0;
      const functionHit = scoreTextOverlap(device.deviceFunction, breachPoint.breachTitle) ? 2 : 0;
      const typeHit =
        (device.deviceType === "hold" && breachPoint.oldReaction.includes("控制")) ||
        (device.deviceType === "mark" && breachPoint.oldReaction.includes("沉默")) ||
        (device.deviceType === "measure" && breachPoint.costIfUnchanged.includes("代价")) ||
        (device.deviceType === "cut" && breachPoint.oldReaction.includes("承担"))
          ? 1
          : 0;

      return counterHit + contextHit + functionHit + typeHit;
    },
    (device) => `${breachPoint.breachId}:${device.deviceId}`,
  );

export const resolveRepairMethod = (
  yaoDevice: YaoDevice,
  breachPoint: BreachPoint,
  dynamicModifiers: DynamicFieldModifiers = mockDynamicFieldModifiers,
): RepairMethod => {
  const template = pickByScore(
    mockRepairMethods,
    (method) => {
      const methodKey = method.methodId.replace("method-", "");
      const deviceKey = yaoDevice.deviceId.replace("device-", "");
      const idHit = methodKey === deviceKey ? 4 : 0;
      const firstActionHit = scoreTextOverlap(yaoDevice.counterPattern, method.firstAction) ? 2 : 0;
      const warningHit = scoreTextOverlap(breachPoint.costIfUnchanged, method.relapseWarning) ? 1 : 0;

      return idHit + firstActionHit + warningHit;
    },
    (method) => `${yaoDevice.deviceId}:${breachPoint.breachId}:${method.methodId}`,
  );

  return {
    methodId: `${template.methodId}-${stableHash(`${yaoDevice.deviceId}:${breachPoint.breachId}`)}`,
    firstAction: `${yaoDevice.counterPattern}${template.firstAction}`,
    forbiddenAction: `不要回到${shortText(breachPoint.oldReaction)}。${template.forbiddenAction}`,
    executionWindow: `${executionWindowByDuration[dynamicModifiers.pressureDuration]}；${breachPoint.triggerCondition}，${template.executionWindow}`,
    fallbackMove: template.fallbackMove,
    relapseWarning: `${shortText(breachPoint.costIfUnchanged)}。${template.relapseWarning}`,
  };
};

export const createPersonalityAsset = (args: {
  motherCodeProfile: MotherCodeProfile;
  pressureSeed: PressureSeed;
  hexagramField: HexagramField;
  breachPoint: BreachPoint;
  yaoDevice: YaoDevice;
  repairMethod: RepairMethod;
  dynamicModifiers: DynamicFieldModifiers;
}): PersonalityAsset => ({
  assetId: `asset-${stableHash([
    args.motherCodeProfile.motherCodeId,
    args.pressureSeed.seedId,
    args.hexagramField.hexagramId,
    args.breachPoint.breachId,
    args.yaoDevice.deviceId,
  ].join(":"))}`,
  assetTitle: `${args.hexagramField.behaviorFieldName}｜${args.breachPoint.breachTitle}`,
  motherCodeSnapshot: args.motherCodeProfile,
  pressureSeedSnapshot: args.pressureSeed,
  hexagramSnapshot: args.hexagramField,
  breachSnapshot: args.breachPoint,
  deviceSnapshot: args.yaoDevice,
  methodSnapshot: args.repairMethod,
  dynamicModifiersSnapshot: args.dynamicModifiers,
  assetSummary: `${args.pressureSeed.sceneText}本局压力已进入${pressureDepthByDuration[args.dynamicModifiers.pressureDuration]}，旧反应是${shortText(args.breachPoint.oldReaction)}，第一动作是${args.repairMethod.firstAction}`,
  futureDefenseHint: `${args.repairMethod.relapseWarning}${args.breachPoint.antiInstinctDirection}`,
  createdAt: "2026-06-12T00:00:00.000Z",
});

const buildCausalTrace = (result: Omit<GuanyaoCausalPipelineResult, "causalTrace">): CausalTraceEntry[] => {
  const locationAnchor = resolveLocationAnchor(result.chronoCoordinate.locationAnchor);
  const hasLocationAnchor = locationAnchor.anchorType !== "unknown";
  const locationPressureReason = hasLocationAnchor
    ? `地利锚点「${locationAnchor.label}」增强了候选权重，但最终排序仍由母码敏感区主导。`
    : "本局未提供地利锚点，压力种子排序仅由母码敏感区与现实压力匹配决定。";
  const locationFieldReason = hasLocationAnchor
    ? `当前地利锚点修正了 ${result.pressureField.locationWeight ?? 0} 点压力权重。${result.pressureField.locationFieldNote}`
    : "本局未提供地利锚点，压力场按母码与现实压力种子构建。";
  const dynamicReason =
    result.dynamicModifiers.emotionalIntensity >= 4 || result.dynamicModifiers.pressureDuration !== "just_happened"
      ? `本局压力强度为 ${result.dynamicModifiers.emotionalIntensity}，且困扰时间为 ${result.dynamicModifiers.pressureDuration}，压力场动态权重修正 ${result.pressureField.dynamicWeight ?? 0}，风险窗口进入「${result.pressureField.riskWindow}」。`
      : `本局压力强度较低，且刚刚发生，压力场动态权重修正 ${result.pressureField.dynamicWeight ?? 0}，风险窗口停留在「${result.pressureField.riskWindow}」。`;

  return [
    {
      step: "chrono_to_mother_code",
      reason: `时辰底色、日期颗粒与年月周期共同形成稳定索引，因此母码落在「${result.motherCodeProfile.motherCodeName}」。`,
    },
    {
      step: "mother_code_to_pressure_seed",
      reason: `母码敏感区命中「${result.pressureSeed.pressureType}」，现实切片被优先拦截为「${result.pressureSeed.seedId}」。${locationPressureReason}`,
    },
    {
      step: "dynamic_modifiers_to_pressure_field",
      reason: dynamicReason,
    },
    {
      step: "pressure_seed_to_pressure_field",
      reason: `压力强度为 ${result.pressureSeed.intensityLevel}，场权重写入 ${result.pressureField.upperFieldWeight}，进入「${result.pressureField.riskWindow}」。${locationFieldReason}`,
    },
    {
      step: "pressure_field_to_hexagram_field",
      reason: `压力场「${result.pressureField.fieldName}」撞击「${result.motherCodeProfile.motherCodeName}」，坍缩为「${result.hexagramField.behaviorFieldName}」。`,
    },
    {
      step: "pressure_field_to_current_hexagram_profile",
      reason: `${result.currentHexagramProfile.upperCodeFormation.formationReason}${result.currentHexagramProfile.upperCodeFormation.upperCodeReading}上码「${result.currentHexagramProfile.upperTrigram}」与母码下码「${result.currentHexagramProfile.lowerTrigram}」成局为「${result.currentHexagramProfile.hexagramCode}｜${result.currentHexagramProfile.hexagramName}」。人格重力值为「${result.currentHexagramProfile.gravityValue}」。`,
    },
    {
      step: "hexagram_field_to_behavior_scan",
      reason: `本局惯性为「${result.hexagramField.inertiaPattern}」，扫描锁定「${result.behaviorEngineScan.primaryBreachCandidate}」。`,
    },
    {
      step: "behavior_scan_to_breach_points",
      reason: `扫描输出一个主切口与两个副切口，主切口保持最高下刀权重。`,
    },
    {
      step: "breach_point_to_yao_device",
      reason: `切口的反本能方向为「${result.selectedBreachPoint.antiInstinctDirection}」，匹配爻器「${result.yaoDevice.deviceName}」。`,
    },
    {
      step: "yao_device_to_repair_method",
      reason: `爻器 counterPattern 与切口触发条件组装为器法「${result.repairMethod.methodId}」。`,
    },
    {
      step: "repair_method_to_personality_asset",
      reason: `初始坐标、现实压力、卦码场、切口、爻器与器法已成链，因此沉积为「${result.personalityAsset.assetTitle}」。`,
    },
  ];
};

export const runGuanyaoCausalPipeline = (
  chronoCoordinate: ChronoCoordinate = mockChronoCoordinate,
  dynamicModifiers?: Partial<DynamicFieldModifiers>,
): GuanyaoCausalPipelineResult => {
  const resolvedDynamicModifiers = resolveDynamicModifiers(dynamicModifiers);
  const motherCodeProfile = resolveMotherCode(chronoCoordinate);
  const pressureSeed = selectPressureSeed(motherCodeProfile, chronoCoordinate);
  const pressureField = buildPressureField(
    motherCodeProfile,
    pressureSeed,
    chronoCoordinate.locationAnchor,
    resolvedDynamicModifiers,
  );
  const currentHexagramProfile = formCurrentHexagramProfile(motherCodeProfile, pressureSeed, pressureField);
  const hexagramField = buildHexagramField(motherCodeProfile, pressureField, currentHexagramProfile);
  const behaviorEngineScan = runBehaviorEngineScan(hexagramField);
  const breachPoints = resolveBreachPoints(behaviorEngineScan);
  const selectedBreachPoint = breachPoints[0];
  const yaoDevice = resolveYaoDevice(selectedBreachPoint);
  const repairMethod = resolveRepairMethod(yaoDevice, selectedBreachPoint, resolvedDynamicModifiers);
  const personalityAsset = createPersonalityAsset({
    motherCodeProfile,
    pressureSeed,
    hexagramField,
    breachPoint: selectedBreachPoint,
    yaoDevice,
    repairMethod,
    dynamicModifiers: resolvedDynamicModifiers,
  });
  const resultWithoutTrace = {
    chronoCoordinate,
    dynamicModifiers: resolvedDynamicModifiers,
    motherCodeProfile,
    pressureSeed,
    pressureField,
    currentHexagramProfile,
    hexagramField,
    behaviorEngineScan,
    breachPoints,
    selectedBreachPoint,
    yaoDevice,
    repairMethod,
    personalityAsset,
  };

  return {
    ...resultWithoutTrace,
    causalTrace: buildCausalTrace(resultWithoutTrace),
  };
};

export function auditGuanyaoCausalPipeline(): {
  result: GuanyaoCausalPipelineResult;
  passed: boolean;
  checks: string[];
} {
  const result = runGuanyaoCausalPipeline();
  const resultWithoutLocation = runGuanyaoCausalPipeline({
    year: result.chronoCoordinate.year,
    month: result.chronoCoordinate.month,
    day: result.chronoCoordinate.day,
    hourBranch: result.chronoCoordinate.hourBranch,
  });
  const lightDynamicResult = runGuanyaoCausalPipeline(result.chronoCoordinate, {
    emotionalIntensity: 1,
    pressureDuration: "just_happened",
  });
  const traceSteps = new Set(result.causalTrace.map((entry) => entry.step));
  const checkResults = [
    ["has chronoCoordinate", Boolean(result.chronoCoordinate)],
    ["has motherCodeProfile", Boolean(result.motherCodeProfile)],
    ["has pressureSeed", Boolean(result.pressureSeed)],
    ["has pressureField", Boolean(result.pressureField)],
    ["has dynamicModifiers", Boolean(result.dynamicModifiers)],
    ["pressureField has emotionalIntensity", Boolean(result.pressureField.emotionalIntensity)],
    ["pressureField has pressureDuration", Boolean(result.pressureField.pressureDuration)],
    ["pressureField has dynamicWeight", typeof result.pressureField.dynamicWeight === "number"],
    ["has currentHexagramProfile", Boolean(result.currentHexagramProfile)],
    ["currentHexagramProfile lowerSource mother_code", result.currentHexagramProfile.lowerSource === "mother_code"],
    ["currentHexagramProfile upperSource pressure_field", result.currentHexagramProfile.upperSource === "pressure_field"],
    ["currentHexagramProfile has upperCodeFormation", Boolean(result.currentHexagramProfile.upperCodeFormation)],
    ["upperCodeFormation reads three line impact", typeof result.currentHexagramProfile.upperCodeFormation.lineImpact.systemMechanismLine === "number"],
    ["currentHexagramProfile has gravityValue", Boolean(result.currentHexagramProfile.gravityValue)],
    ["has hexagramField", Boolean(result.hexagramField)],
    ["has behaviorEngineScan", Boolean(result.behaviorEngineScan)],
    ["has breachPoints >= 3", result.breachPoints.length >= 3],
    ["has selectedBreachPoint primary", result.selectedBreachPoint.breachType === "primary"],
    ["has yaoDevice", Boolean(result.yaoDevice)],
    ["has repairMethod", Boolean(result.repairMethod)],
    ["has personalityAsset", Boolean(result.personalityAsset)],
    ["personalityAsset has dynamicModifiersSnapshot", Boolean(result.personalityAsset.dynamicModifiersSnapshot)],
    ["has causalTrace", result.causalTrace.length > 0],
    [
      "causalTrace has all required steps",
      requiredTraceSteps.every((step) => traceSteps.has(step)),
    ],
    ["causalTrace includes dynamic_modifiers_to_pressure_field", traceSteps.has("dynamic_modifiers_to_pressure_field")],
    ["causalTrace includes pressure_field_to_current_hexagram_profile", traceSteps.has("pressure_field_to_current_hexagram_profile")],
    ["pipeline works without locationAnchor", Boolean(resultWithoutLocation.personalityAsset)],
    ["dynamic modifiers can change field weight", result.pressureField.upperFieldWeight !== lightDynamicResult.pressureField.upperFieldWeight],
  ] satisfies [string, boolean][];

  return {
    result,
    passed: checkResults.every(([, passed]) => passed),
    checks: checkResults.map(([label, passed]) => `${label}: ${passed ? "passed" : "failed"}`),
  };
}

export function auditGuanyaoHexagramFormation(): {
  passed: boolean;
  checks: string[];
  samples: CurrentHexagramProfile[];
} {
  const cases = Object.values(mockHexagramFormationCases);
  const samples = cases.map((formationCase) => {
    const pressureField = buildPressureField(
      formationCase.motherCodeProfile,
      formationCase.pressureSeed,
      undefined,
      mockDynamicFieldModifiers,
    );

    return formCurrentHexagramProfile(
      formationCase.motherCodeProfile,
      formationCase.pressureSeed,
      pressureField,
    );
  });
  const checkResults = cases.flatMap((formationCase, index) => {
    const sample = samples[index];

    return [
      [
        `${formationCase.caseId} upperTrigram ${formationCase.expectedUpperTrigram}`,
        sample.upperTrigram === formationCase.expectedUpperTrigram,
      ],
      [
        `${formationCase.caseId} upperCodeFormation upperTrigram ${formationCase.expectedUpperTrigram}`,
        sample.upperCodeFormation.upperTrigram === formationCase.expectedUpperTrigram,
      ],
      [
        `${formationCase.caseId} externalEnvironmentType ${formationCase.expectedExternalEnvironmentType}`,
        sample.upperCodeFormation.externalEnvironmentType === formationCase.expectedExternalEnvironmentType &&
          sample.layerClassification.externalEnvironmentType === formationCase.expectedExternalEnvironmentType,
      ],
      [
        `${formationCase.caseId} systemMechanismLine is high`,
        sample.upperCodeFormation.lineImpact.systemMechanismLine >= 4,
      ],
      [
        `${formationCase.caseId} lifecycleStageLine is present when trapped debt`,
        formationCase.expectedExternalEnvironmentType === "kan_trapped_debt"
          ? sample.upperCodeFormation.lineImpact.lifecycleStageLine >= 3
          : true,
      ],
      [
        `${formationCase.caseId} system line dominates or mixes`,
        sample.upperCodeFormation.dominantLine === "system" || sample.upperCodeFormation.dominantLine === "mixed",
      ],
      [
        `${formationCase.caseId} lowerTrigram ${formationCase.expectedLowerTrigram}`,
        sample.lowerTrigram === formationCase.expectedLowerTrigram,
      ],
      [
        `${formationCase.caseId} hexagramCode ${formationCase.expectedHexagramCode}`,
        sample.hexagramCode === formationCase.expectedHexagramCode,
      ],
      [
        `${formationCase.caseId} hexagramName ${formationCase.expectedHexagramName}`,
        sample.hexagramName === formationCase.expectedHexagramName,
      ],
      [
        `${formationCase.caseId} hexagramTitle ${formationCase.expectedHexagramTitle}`,
        sample.hexagramTitle === formationCase.expectedHexagramTitle,
      ],
      [
        `${formationCase.caseId} upperCodeReading contains expected phrase`,
        sample.upperCodeFormation.upperCodeReading.includes(
          formationCase.expectedUpperTrigram === "坤"
            ? "责任与承载成为主导压力，上码显影为坤"
            : "困局与难以抽离成为主导压力，上码显影为坎",
        ),
      ],
      [
        `${formationCase.caseId} gravity does not choose trigram`,
        Boolean(sample.gravityValue) && sample.upperSource === "pressure_field" && sample.lowerSource === "mother_code",
      ],
    ] satisfies [string, boolean][];
  });

  return {
    passed: checkResults.every(([, passed]) => passed),
    checks: checkResults.map(([label, passed]) => `${label}: ${passed ? "passed" : "failed"}`),
    samples,
  };
}
