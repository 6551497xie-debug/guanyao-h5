import {
  getEightDivisionFieldMapping,
  getSixDivisionChangeMapping,
  guanyaoNumericProtocol,
  normalizeEightRemainder,
  normalizeSixRemainder,
} from "../data/guanyaoNumericProtocol";
import {
  getRealityPressureFieldDefinition,
  guanyaoRealityPressureFields,
  listRealityPressureFields,
} from "../data/guanyaoRealityPressureFields";
import { GUANYAO_HEXAGRAM_MATRIX_REGISTRY } from "../data/guanyaoHexagramMatrixRegistry";
import {
  composePressureSeedUserPrompt,
  listPressureSeedLanguageExamples,
  pressureSeedLanguageProtocol,
} from "../data/guanyaoPressureSeedLanguageProtocol";
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
import { guanyaoMotherCodeRegistry } from "../data/guanyaoMotherCodeRegistry";
import type {
  BehaviorEngineScan,
  BreachPoint,
  CausalTraceEntry,
  ChronoCoordinate,
  CutCandidate,
  CurrentHexagramProfile,
  DeviceMethod,
  DeviceMethodPackage,
  DeviceMethodType,
  DefensePath90d,
  PersonalityAssetDeposition,
  PersonalityAssetType,
  DynamicFieldModifiers,
  EmotionalIntensity,
  ExternalEnvironmentType,
  GuanyaoCausalPipelineResult,
  HexagramField,
  HexagramLayerClassification,
  HourBranch,
  LocationAnchor,
  MotherCodeDefinition,
  MotherCodeProfile,
  PersonalityAsset,
  PersonalityGravityValue,
  PauseSignal,
  PressureField,
  PressureDuration,
  PressureIntensity,
  PressureSeed,
  RepairMethod,
  Trigram,
  UpperCodeFormation,
  YaoLayer,
  YaoPosition,
  YaoTransmissionChain,
  YaoTransmissionProfile,
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

const knownHexagramMatrix = GUANYAO_HEXAGRAM_MATRIX_REGISTRY;

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
  "current_hexagram_profile_to_yao_transmission_chain",
  "yao_transmission_chain_to_device_method_package",
  "device_method_package_to_personality_asset_deposition",
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

const yaoLayerDefinitions = [
  { yaoPosition: 1, yaoName: "初爻", yaoLayer: "body", layerLabel: "身体", layerQuestion: "身体先在哪里收紧？" },
  { yaoPosition: 2, yaoName: "二爻", yaoLayer: "emotion", layerLabel: "情绪", layerQuestion: "哪一种情绪先接管？" },
  { yaoPosition: 3, yaoName: "三爻", yaoLayer: "thought", layerLabel: "思想", layerQuestion: "脑内叙事如何解释压力？" },
  { yaoPosition: 4, yaoName: "四爻", yaoLayer: "behavior", layerLabel: "行为", layerQuestion: "旧反应正在做什么？" },
  { yaoPosition: 5, yaoName: "五爻", yaoLayer: "memory", layerLabel: "记忆", layerQuestion: "哪段旧经验正在回放？" },
  { yaoPosition: 6, yaoName: "上爻", yaoLayer: "motivation", layerLabel: "目标 / 动机", layerQuestion: "真正想保护的是什么？" },
] satisfies Array<{
  yaoPosition: YaoPosition;
  yaoName: string;
  yaoLayer: YaoLayer;
  layerLabel: string;
  layerQuestion: string;
}>;

type YaoTransmissionDraft = Pick<
  YaoTransmissionProfile,
  "pressureReading" | "transmissionReading" | "inertiaSignal" | "antiInstinctHint" | "cutPotential"
>;

type YaoTransmissionScenario = {
  transmissions: Record<YaoLayer, YaoTransmissionDraft>;
  chainSummary: string;
};

const yaoTransmissionScenarios: Record<string, YaoTransmissionScenario> = {
  "019": {
    transmissions: {
      body: {
        pressureReading: "家庭财务压力一出现，身体先进入紧绷状态；开始算账、盘资源、想缺口。",
        transmissionReading: "身体层先把家庭财务压力翻译成资源缺口和即时紧绷。",
        inertiaSignal: "自动算账、盘资源、想缺口。",
        antiInstinctHint: "先标记身体紧绷，不急着立刻补位。",
        cutPotential: 2,
      },
      emotion: {
        pressureReading: "担心、亏欠、焦虑，怕家庭不稳，也怕关系因为钱变僵。",
        transmissionReading: "情绪层把财务压力推成家庭稳定和关系僵硬的双重担心。",
        inertiaSignal: "亏欠感和焦虑感同时升高。",
        antiInstinctHint: "把担心和责任分开，不把所有不稳都算成自己的错。",
        cutPotential: 3,
      },
      thought: {
        pressureReading: "先别说太重，先缓一缓，我再想办法周转，可能还有别的办法。",
        transmissionReading: "思想层开始用“先缓一缓”降低冲突感，同时把关键对话后移。",
        inertiaSignal: "先别说太重，先缓一缓。",
        antiInstinctHint: "把真实数字和责任边界列出来，不继续只在脑内周转。",
        cutPotential: 5,
      },
      behavior: {
        pressureReading: "缓和、转开、腾挪、延后关键对话；先稳住气氛，而不是立刻摊开真实数字和责任边界。",
        transmissionReading: "行为层用缓和、转开和延后关键对话来暂时稳住局面。",
        inertiaSignal: "转开关键对话，用腾挪替代边界确认。",
        antiInstinctHint: "停止转开，先把一段真实数字和责任边界摊开。",
        cutPotential: 6,
      },
      memory: {
        pressureReading: "过去钱一旦摊开就容易伤关系；话说重了，家里会更紧张。",
        transmissionReading: "记忆层调用“钱会伤关系”的旧经验，让当前对话继续变轻。",
        inertiaSignal: "怕说穿以后关系更紧张。",
        antiInstinctHint: "识别旧经验，不把过去的紧张直接套到当前。",
        cutPotential: 4,
      },
      motivation: {
        pressureReading: "真正想保护的是家庭稳定、关系不破、局面还能继续转动。",
        transmissionReading: "目标 / 动机层不是只想解决钱，而是想保住家庭稳定和关系转动。",
        inertiaSignal: "用稳定关系压过真实压力处理。",
        antiInstinctHint: "允许稳定和真实同时出现，不用隐去压力换稳定。",
        cutPotential: 3,
      },
    },
    chainSummary:
      "家庭财务压力压在兑的沟通转化底盘上，六爻传导表现为：身体紧绷 → 情绪担心 → 思想缓一缓 → 行为转开 → 记忆怕伤关系 → 动机保护家庭稳定。",
  },
  "047": {
    transmissions: {
      body: {
        pressureReading: "一想到债务，身体先紧；胸口压、脑子自动算还款，睡眠被期限感打断。",
        transmissionReading: "身体层先把负债压力翻译成胸口压、还款计算和睡眠打断。",
        inertiaSignal: "胸口压，脑子自动算还款。",
        antiInstinctHint: "先承认身体进入债务警报，不立刻用新周转压下警报。",
        cutPotential: 3,
      },
      emotion: {
        pressureReading: "焦虑、羞耻、担心，怕拖累家人，也怕债务问题被摊开后关系失控。",
        transmissionReading: "情绪层让焦虑和羞耻叠加，债务被感知成关系失控风险。",
        inertiaSignal: "羞耻感让问题更难摊开。",
        antiInstinctHint: "把债务事实和羞耻感拆开，不让羞耻决定是否沟通。",
        cutPotential: 4,
      },
      thought: {
        pressureReading: "先别让大家太紧张，我再想办法周转一下；只要这关过去，后面应该能缓过来。",
        transmissionReading: "思想层用“再周转一下”解释当前困局，让真实重组继续后移。",
        inertiaSignal: "我再周转一下，这关先过去。",
        antiInstinctHint: "停止把周转当成解决，先命名债务结构。",
        cutPotential: 5,
      },
      behavior: {
        pressureReading: "继续周转、拆东补西、延后关键沟通，用短期缓和替代真实重组。",
        transmissionReading: "行为层用继续周转、拆东补西和延后沟通维持表面缓和。",
        inertiaSignal: "拆东补西，用短期缓和替代真实重组。",
        antiInstinctHint: "停止新增周转动作，先做一次完整债务摊开。",
        cutPotential: 6,
      },
      memory: {
        pressureReading: "过去靠腾挪也撑过去过；债务一旦说穿，关系和体面都会受损。",
        transmissionReading: "记忆层调用“腾挪曾经撑过去”的经验，继续保护体面。",
        inertiaSignal: "过去撑过去过，所以这次也许还能撑。",
        antiInstinctHint: "区分过去过关和当前结构性滚动，不用旧成功遮住新风险。",
        cutPotential: 4,
      },
      motivation: {
        pressureReading: "真正想保护的不是钱本身，而是家庭稳定、关系不破、自己还能维持体面和控制感。",
        transmissionReading: "目标 / 动机层想保护家庭、关系、体面和控制感，而不只是钱。",
        inertiaSignal: "为了体面和控制感继续隐住债务。",
        antiInstinctHint: "把体面从债务事实里分离出来，先保护结构安全。",
        cutPotential: 3,
      },
    },
    chainSummary:
      "负债压力压在兑的沟通转化底盘上，六爻传导表现为：身体紧绷 → 情绪羞耻焦虑 → 思想再周转一下 → 行为拆东补西 → 记忆害怕说穿 → 动机保护家庭、关系和体面。",
  },
};

const buildFallbackYaoScenario = (
  motherCodeProfile: MotherCodeProfile,
  pressureSeed: PressureSeed,
  currentHexagramProfile: CurrentHexagramProfile,
): YaoTransmissionScenario => ({
  transmissions: {
    body: {
      pressureReading: `${pressureSeed.pressureType}出现时，身体先读取到「${pressureSeed.triggerMoment}」带来的紧绷。`,
      transmissionReading: "身体层先把现实压力转成可感知的警报。",
      inertiaSignal: "身体先紧，行动还没有校准。",
      antiInstinctHint: "先标记身体信号，不急着进入旧反应。",
      cutPotential: 2,
    },
    emotion: {
      pressureReading: `${pressureSeed.pressureType}触发情绪波动，关系角色为「${pressureSeed.relationshipRole}」。`,
      transmissionReading: "情绪层开始放大关系风险和自我成本。",
      inertiaSignal: "情绪先替压力定性。",
      antiInstinctHint: "先命名情绪，不让情绪替代判断。",
      cutPotential: 3,
    },
    thought: {
      pressureReading: `脑内开始解释「${pressureSeed.fieldBias}」，试图维持${motherCodeProfile.motherCodeName}的旧稳定。`,
      transmissionReading: "思想层形成一条自我说服叙事。",
      inertiaSignal: motherCodeProfile.defenseTendency,
      antiInstinctHint: "把脑内叙事写出来，检查它是否推迟真实动作。",
      cutPotential: 4,
    },
    behavior: {
      pressureReading: `${motherCodeProfile.defaultReactionPattern}${pressureSeed.costHint}`,
      transmissionReading: "行为层最接近真实切口，旧反应开始落地。",
      inertiaSignal: motherCodeProfile.behaviorBias,
      antiInstinctHint: "在行为落地前切出一个反本能动作。",
      cutPotential: 5,
    },
    memory: {
      pressureReading: "旧经验开始回放，并给当前压力附加熟悉的风险解释。",
      transmissionReading: "记忆层让当前局面看起来像过去某次危险。",
      inertiaSignal: "过去经验正在覆盖当前事实。",
      antiInstinctHint: "区分旧经验和当前证据。",
      cutPotential: 3,
    },
    motivation: {
      pressureReading: `真正想保护的是「${motherCodeProfile.baseForce}」背后的稳定感。`,
      transmissionReading: `目标 / 动机层把本局导向「${currentHexagramProfile.hexagramName}」。`,
      inertiaSignal: "动机在保护旧稳定。",
      antiInstinctHint: "允许目标被重新校准，而不是只保护旧反应。",
      cutPotential: 2,
    },
  },
  chainSummary: `${pressureSeed.pressureType}压在${motherCodeProfile.motherCodeName}上，六爻传导表现为：身体警报 → 情绪放大 → 思想解释 → 行为落地 → 记忆回放 → 动机护住旧稳定。`,
});

const resolvePauseSignal = (interventionPotential: number): PauseSignal => {
  if (interventionPotential <= 0) return "none";
  if (interventionPotential <= 2) return "soft";
  if (interventionPotential <= 4) return "clear";
  return "strong";
};

const pausePromptBySignal: Record<PauseSignal, string> = {
  none: "继续看下一层。",
  soft: "如果这里很像你，可以先停在这一层。",
  clear: "这一层，已经值得先处理。",
  strong: "这里可以先停一下。",
};

const continuePromptBySignal: Record<PauseSignal, string> = {
  none: "继续看下一层。",
  soft: "继续向后看。",
  clear: "继续观下一爻。",
  strong: "继续看下一层。",
};

const rootReasonByHexagramCode: Record<string, string> = {
  "019": "上爻显示真正想保护的是家庭稳定、关系不破、局面还能继续转动，这是本局反应链的根部保护对象。",
  "047": "上爻显示真正想保护的是家庭稳定、关系不破、体面和控制感，这是债务困局持续滚动的根部保护对象。",
};

const layerScoreProfile: Record<
  YaoLayer,
  Pick<
    CutCandidate,
    "activationIntensity" | "inertiaTakeover" | "consequenceAmplification" | "interventionLeverage" | "userAgency"
  >
> = {
  body: {
    activationIntensity: 4,
    inertiaTakeover: 2,
    consequenceAmplification: 2,
    interventionLeverage: 2,
    userAgency: 3,
  },
  emotion: {
    activationIntensity: 4,
    inertiaTakeover: 3,
    consequenceAmplification: 3,
    interventionLeverage: 3,
    userAgency: 3,
  },
  thought: {
    activationIntensity: 5,
    inertiaTakeover: 5,
    consequenceAmplification: 4,
    interventionLeverage: 5,
    userAgency: 5,
  },
  behavior: {
    activationIntensity: 6,
    inertiaTakeover: 6,
    consequenceAmplification: 6,
    interventionLeverage: 6,
    userAgency: 6,
  },
  memory: {
    activationIntensity: 4,
    inertiaTakeover: 5,
    consequenceAmplification: 4,
    interventionLeverage: 3,
    userAgency: 3,
  },
  motivation: {
    activationIntensity: 5,
    inertiaTakeover: 5,
    consequenceAmplification: 5,
    interventionLeverage: 4,
    userAgency: 2,
  },
};

const buildCutCandidates = (
  transmissions: YaoTransmissionProfile[],
  hexagramCode: string,
): CutCandidate[] =>
  transmissions.map((transmission) => {
    const scoreProfile = layerScoreProfile[transmission.yaoLayer];
    const totalScore =
      scoreProfile.activationIntensity +
      scoreProfile.inertiaTakeover +
      scoreProfile.consequenceAmplification +
      scoreProfile.interventionLeverage +
      scoreProfile.userAgency;

    return {
      yaoPosition: transmission.yaoPosition,
      yaoLayer: transmission.yaoLayer,
      ...scoreProfile,
      totalScore,
      cutRole: "candidate",
      internalCutReason:
        transmission.yaoLayer === "motivation"
          ? rootReasonByHexagramCode[hexagramCode] ?? "上爻显示本局真正想保护的对象，是反应链的根部。"
          : `${transmission.layerLabel}层出现「${transmission.inertiaSignal}」，干预潜力为 ${transmission.interventionPotential}。`,
      userFacingReason:
        transmission.yaoLayer === "motivation"
          ? "这一层显示你真正想保护的东西。"
          : transmission.pauseReason,
    } satisfies CutCandidate;
  });

const selectCutCandidate = (
  cutCandidates: CutCandidate[],
  preferredLayer: YaoLayer,
  cutRole: CutCandidate["cutRole"],
): CutCandidate => {
  const selected =
    cutCandidates.find((candidate) => candidate.yaoLayer === preferredLayer) ??
    [...cutCandidates].sort((left, right) => right.totalScore - left.totalScore)[0];

  return {
    ...selected,
    cutRole,
  };
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
  const hexagramName = knownHexagram?.name ?? "本局卦码";
  const hexagramCode = knownHexagram?.code ?? "000";
  const hexagramTitle = knownHexagram?.title ?? "读取中";

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

export const buildYaoTransmissionChain = (
  motherCodeProfile: MotherCodeProfile,
  pressureSeed: PressureSeed,
  currentHexagramProfile: CurrentHexagramProfile,
  options?: { preferRuntimePressureSeed?: boolean },
): YaoTransmissionChain => {
  const fallbackScenario = buildFallbackYaoScenario(motherCodeProfile, pressureSeed, currentHexagramProfile);
  const scenario = options?.preferRuntimePressureSeed
    ? fallbackScenario
    : yaoTransmissionScenarios[currentHexagramProfile.hexagramCode] ?? fallbackScenario;
  const transmissions = yaoLayerDefinitions.map((definition): YaoTransmissionProfile => {
    const draft = scenario.transmissions[definition.yaoLayer];
    const interventionPotential = Math.min(6, Math.max(0, draft.cutPotential));
    const pauseSignal = resolvePauseSignal(interventionPotential);

    return {
      ...definition,
      pressureReading: draft.pressureReading,
      motherCodeInfluence: `母码「${motherCodeProfile.motherCodeName}」使这一层倾向于：${motherCodeProfile.defaultReactionPattern}`,
      hexagramInfluence: `本局「${currentHexagramProfile.hexagramCode}｜${currentHexagramProfile.hexagramName}｜${currentHexagramProfile.hexagramTitle}」把上码「${currentHexagramProfile.upperTrigram}」的外压传入下码「${currentHexagramProfile.lowerTrigram}」的反应底盘。`,
      transmissionReading: draft.transmissionReading,
      inertiaSignal: draft.inertiaSignal,
      antiInstinctHint: draft.antiInstinctHint,
      cutPotential: interventionPotential,
      interventionPotential,
      pauseSignal,
      pauseReason:
        pauseSignal === "none"
          ? `${definition.layerLabel}层当前只作为传导展示。`
          : `${definition.layerLabel}层出现「${draft.inertiaSignal}」，可以作为本局停留点。`,
      userFacingPausePrompt: pausePromptBySignal[pauseSignal],
      userFacingContinuePrompt: continuePromptBySignal[pauseSignal],
    };
  });
  const cutCandidates = buildCutCandidates(transmissions, currentHexagramProfile.hexagramCode);
  const mainCut = selectCutCandidate(cutCandidates, "behavior", "main");
  const secondaryCut = selectCutCandidate(cutCandidates, "thought", "secondary");
  const rootCut = selectCutCandidate(cutCandidates, "motivation", "root");

  return {
    sourceHexagramCode: currentHexagramProfile.hexagramCode,
    sourceHexagramName: currentHexagramProfile.hexagramName,
    sourceHexagramTitle: currentHexagramProfile.hexagramTitle,
    motherCode: motherCodeProfile.motherCodeName,
    lowerTrigram: currentHexagramProfile.lowerTrigram,
    upperTrigram: currentHexagramProfile.upperTrigram,
    gravityValue: currentHexagramProfile.gravityValue,
    transmissions,
    cutCandidates: cutCandidates.map((candidate) => {
      if (candidate.yaoLayer === mainCut.yaoLayer) return mainCut;
      if (candidate.yaoLayer === secondaryCut.yaoLayer) return secondaryCut;
      if (candidate.yaoLayer === rootCut.yaoLayer) return rootCut;
      return candidate;
    }),
    mainCut,
    secondaryCut,
    rootCut,
    chainSummary: scenario.chainSummary,
  };
};

type DeviceMethodTemplate = Omit<DeviceMethod, "sourceCut">;

const deviceMethodByHexagramCode: Record<string, DeviceMethodTemplate> = {
  "019": {
    deviceName: "清账定界法",
    deviceType: "clarify",
    methodSummary: "把家庭财务压力从模糊焦虑，拆成真实账目、责任边界和下一步顺序。",
    antiInstinctAction: "不要继续只用缓和与腾挪稳住气氛，而是先把真实数字和责任边界摊开。",
    firstAction: "列出当前必须处理的三项真实财务压力：金额、期限、责任人。",
    next72HoursAction: "完成一次不超过30分钟的家庭财务沟通，只讨论事实、数字、期限，不讨论情绪对错。",
    thirtyDayAction: "建立一张家庭财务优先级表，把必要支出、可延后支出、必须协商支出分开。",
    doNotDo: [
      "不要继续用“先缓一缓”替代真实沟通",
      "不要把所有责任都默默揽到自己身上",
      "不要只处理气氛，不处理数字",
    ],
    realityCheck: [
      "哪一笔压力已经不能再靠缓和解决？",
      "哪一项责任其实需要重新分配？",
      "哪一个期限最先逼近？",
    ],
    userFacingMethodPrompt:
      "这一层可以先从“把账说清”开始。不是为了制造冲突，而是为了让家庭压力不再继续模糊下去。",
  },
  "047": {
    deviceName: "止滚清债法",
    deviceType: "rebuild",
    methodSummary: "停止用短期周转维持表面缓和，先拆开债务结构，阻止困局继续滚大。",
    antiInstinctAction: "不要再用拆东补西替代真实重组，先停止新增滚动压力。",
    firstAction: "列出全部债务：本金、利息、期限、逾期风险、关系风险。",
    next72HoursAction: "标记最高风险的三项债务，并确定哪一项必须优先止滚。",
    thirtyDayAction: "建立债务分层表：高息债、逾期风险债、人情债、家庭债、经营债，分别制定处理顺序。",
    doNotDo: [
      "不要继续用新周转掩盖旧问题",
      "不要只安抚关系而不拆债务结构",
      "不要把“还能撑一下”当成解决方案",
    ],
    realityCheck: [
      "哪一笔债务正在滚大？",
      "哪一笔不能再拖？",
      "哪一笔只是关系压力，不是真正的优先债务？",
    ],
    userFacingMethodPrompt:
      "这一层可以先从“停止继续滚大”开始。你不是没有想办法，而是需要把周转从本能反应，改成有顺序的债务重组。",
  },
};

const deviceTypeByLayer: Record<YaoLayer, DeviceMethodType> = {
  body: "stop",
  emotion: "separate",
  thought: "reframe",
  behavior: "clarify",
  memory: "separate",
  motivation: "rebuild",
};

const methodDirectionByLayer: Record<YaoLayer, string> = {
  body: "先稳住身体反应，降低压力对身体的即时接管。",
  emotion: "先区分情绪与事实，避免情绪直接决定后续行为。",
  thought: "替换接管叙事，找到一句新的判断语。",
  behavior: "停止正在放大代价的动作，替换成一个具体反本能动作。",
  memory: "识别旧经验是否正在替当前现实做决定。",
  motivation: "看清真正想保护的东西，并重新选择保护方式。",
};

const buildFallbackDeviceMethod = (
  sourceCut: CutCandidate,
  yaoTransmissionChain: YaoTransmissionChain,
): DeviceMethod => {
  const direction = methodDirectionByLayer[sourceCut.yaoLayer];

  return {
    sourceCut,
    deviceName: `${sourceCut.yaoLayer.toUpperCase()}层反本能器法`,
    deviceType: deviceTypeByLayer[sourceCut.yaoLayer],
    methodSummary: `${direction}本局切口来自 ${sourceCut.yaoPosition} / ${sourceCut.yaoLayer}。`,
    antiInstinctAction: `不要继续顺着「${sourceCut.userFacingReason}」往下走，先做一个反向确认。`,
    firstAction: "写下这一层正在自动发生的旧反应，并圈出一个可以暂停的动作。",
    next72HoursAction: "在下一次同类压力出现时，只替换一个最小动作，不追求一次性解决全局。",
    thirtyDayAction: "记录三次触发、三次替换动作和三次现实反馈，形成新的处理顺序。",
    doNotDo: [
      "不要把旧反应解释成唯一选择",
      "不要同时处理所有层级",
      "不要跳过现实检查直接下结论",
    ],
    realityCheck: [
      "哪一个动作正在放大代价？",
      "哪一个判断只是旧反应的解释？",
      "哪一步是现在就能做的小动作？",
    ],
    userFacingMethodPrompt: `这一层可以先从一个小动作开始。先处理「${yaoTransmissionChain.sourceHexagramName}」里最具体的一步。`,
  };
};

const attachSourceCut = (sourceCut: CutCandidate, template: DeviceMethodTemplate): DeviceMethod => ({
  sourceCut,
  ...template,
});

export const buildDeviceMethodPackage = (
  yaoTransmissionChain: YaoTransmissionChain,
): DeviceMethodPackage => {
  const selectedCut = yaoTransmissionChain.mainCut;
  const mainTemplate = deviceMethodByHexagramCode[yaoTransmissionChain.sourceHexagramCode];
  const mainDeviceMethod = mainTemplate
    ? attachSourceCut(selectedCut, mainTemplate)
    : buildFallbackDeviceMethod(selectedCut, yaoTransmissionChain);
  const secondaryDeviceMethod = buildFallbackDeviceMethod(yaoTransmissionChain.secondaryCut, yaoTransmissionChain);
  const rootDeviceMethod = buildFallbackDeviceMethod(yaoTransmissionChain.rootCut, yaoTransmissionChain);

  return {
    sourceHexagramCode: yaoTransmissionChain.sourceHexagramCode,
    sourceHexagramName: yaoTransmissionChain.sourceHexagramName,
    sourceHexagramTitle: yaoTransmissionChain.sourceHexagramTitle,
    selectedCut,
    mainDeviceMethod,
    secondaryDeviceMethod,
    rootDeviceMethod,
    methodPackageSummary: `切口定点，器法成形。本局从 ${selectedCut.yaoPosition} / ${selectedCut.yaoLayer} 进入「${mainDeviceMethod.deviceName}」。`,
  };
};

type PersonalityAssetDepositionTemplate = {
  assetName: string;
  assetType: PersonalityAssetType;
  assetSummary: string;
  beforePattern: string;
  afterCapability: string;
  defensePath90d: Omit<DefensePath90d, "sourceDeviceMethod">;
  archiveSummary: string;
  migrationTrace: string[];
};

const personalityAssetDepositionByHexagramCode: Record<string, PersonalityAssetDepositionTemplate> = {
  "019": {
    assetName: "家庭压力中的清晰沟通资产",
    assetType: "communication",
    assetSummary: "把家庭财务压力从模糊焦虑，沉积为清账、定界、分责的沟通能力。",
    beforePattern: "用缓和、转开和腾挪暂时稳住气氛，但真实财务压力继续模糊。",
    afterCapability: "能把家庭财务压力拆成真实账目、责任边界和下一步顺序。",
    defensePath90d: {
      pathName: "清账定界 90 天防御路径",
      phases: [
        {
          phaseId: "first_72_hours",
          phaseName: "前 72 小时｜停止模糊焦虑",
          phaseGoal: "先停止模糊焦虑",
          keyAction: "列出三项真实财务压力：金额、期限、责任人",
          riskSignal: "又想说“先缓一缓”",
          defenseInstruction: "只处理事实和数字，不讨论谁对谁错",
        },
        {
          phaseId: "day_1_to_30",
          phaseName: "第 1-30 天｜建立家庭财务优先级",
          phaseGoal: "建立家庭财务优先级",
          keyAction: "把必要支出、可延后支出、必须协商支出分开",
          riskSignal: "重新把所有责任揽回自己身上",
          defenseInstruction: "每一项支出都要对应责任边界",
        },
        {
          phaseId: "day_31_to_90",
          phaseName: "第 31-90 天｜防止重新模糊承压",
          phaseGoal: "防止重新回到模糊承压",
          keyAction: "每周复盘一次财务压力是否又被说轻或拖后",
          riskSignal: "只处理气氛，不处理数字",
          defenseInstruction: "用清晰账本替代表面缓和",
        },
      ],
      relapseWarning: [
        "又开始说“先缓一缓”",
        "又把真实数字藏起来",
        "又只想稳住气氛，不想定责任",
      ],
      antiInstinctReminder: "缓和不是问题，问题是用缓和替代清晰。",
    },
    archiveSummary: "家庭财务压力已沉积为清账、定界、分责的沟通资产。",
    migrationTrace: [
      "家庭财务压力显影为 019｜临｜悬崖边。",
      "主切口落在四爻 behavior：缓和、转开、延后关键对话。",
      "器法进入清账定界法。",
      "资产沉积为家庭压力中的清晰沟通资产。",
    ],
  },
  "047": {
    assetName: "债务困局中的止滚重组资产",
    assetType: "risk_control",
    assetSummary: "把负债压力从反复周转，沉积为止滚、清债、分层重组的风险控制能力。",
    beforePattern: "用拆东补西、短期周转和延后沟通维持表面缓和，但债务结构继续滚动。",
    afterCapability: "能先停止债务继续滚大，再拆开债务结构，按风险优先级处理。",
    defensePath90d: {
      pathName: "止滚清债 90 天防御路径",
      phases: [
        {
          phaseId: "first_72_hours",
          phaseName: "前 72 小时｜先停止继续滚大",
          phaseGoal: "先停止继续滚大",
          keyAction: "列出全部债务：本金、利息、期限、逾期风险、关系风险",
          riskSignal: "又想找一个新周转先顶过去",
          defenseInstruction: "新增周转前，必须先看旧债是否继续滚大",
        },
        {
          phaseId: "day_1_to_30",
          phaseName: "第 1-30 天｜完成债务分层",
          phaseGoal: "完成债务分层",
          keyAction: "区分高息债、逾期风险债、人情债、家庭债、经营债",
          riskSignal: "把“还能撑一下”当成解决方案",
          defenseInstruction: "只按风险优先级处理，不按情绪压力处理",
        },
        {
          phaseId: "day_31_to_90",
          phaseName: "第 31-90 天｜建立复发防御",
          phaseGoal: "建立复发防御",
          keyAction: "每周检查是否出现新债补旧债、关系安抚替代结构处理",
          riskSignal: "为了体面继续不说穿",
          defenseInstruction: "体面不能靠拖延维持，只能靠结构重组恢复",
        },
      ],
      relapseWarning: [
        "又开始拆东补西",
        "又把周转当解决",
        "又为了关系和体面延后真实沟通",
      ],
      antiInstinctReminder: "能周转不等于能解决；止滚才是第一步。",
    },
    archiveSummary: "负债压力已沉积为止滚、清债、分层重组的风险控制资产。",
    migrationTrace: [
      "负债压力显影为 047｜困｜围墙里的沉默者。",
      "主切口落在四爻 behavior：继续周转、拆东补西、延后沟通。",
      "器法进入止滚清债法。",
      "资产沉积为债务困局中的止滚重组资产。",
    ],
  },
};

const buildFallbackPersonalityAssetTemplate = (
  deviceMethodPackage: DeviceMethodPackage,
): PersonalityAssetDepositionTemplate => ({
  assetName: `${deviceMethodPackage.mainDeviceMethod.deviceName}沉积资产`,
  assetType: deviceMethodPackage.mainDeviceMethod.deviceType === "rebuild" ? "rebuild" : "self_regulation",
  assetSummary: `把「${deviceMethodPackage.sourceHexagramName}」中的旧反应沉积为可复盘的反本能处理能力。`,
  beforePattern: `旧反应顺着 ${deviceMethodPackage.selectedCut.yaoPosition} / ${deviceMethodPackage.selectedCut.yaoLayer} 自动展开。`,
  afterCapability: deviceMethodPackage.mainDeviceMethod.methodSummary,
  defensePath90d: {
    pathName: `${deviceMethodPackage.mainDeviceMethod.deviceName} 90 天防御路径`,
    phases: [
      {
        phaseId: "first_72_hours",
        phaseName: "前 72 小时｜停止旧惯性",
        phaseGoal: "先停止旧惯性",
        keyAction: deviceMethodPackage.mainDeviceMethod.firstAction,
        riskSignal: "又想照旧反应继续处理",
        defenseInstruction: deviceMethodPackage.mainDeviceMethod.antiInstinctAction,
      },
      {
        phaseId: "day_1_to_30",
        phaseName: "第 1-30 天｜稳定新动作",
        phaseGoal: "结构重建 / 新动作稳定",
        keyAction: deviceMethodPackage.mainDeviceMethod.next72HoursAction,
        riskSignal: "只做一次动作后又回到旧链路",
        defenseInstruction: "把新动作拆成可重复的小步骤。",
      },
      {
        phaseId: "day_31_to_90",
        phaseName: "第 31-90 天｜复发防御",
        phaseGoal: "复发防御 / 人格资产沉积",
        keyAction: deviceMethodPackage.mainDeviceMethod.thirtyDayAction,
        riskSignal: "压力回升时重新相信旧反应",
        defenseInstruction: "每周复盘一次触发、动作和现实反馈。",
      },
    ],
    relapseWarning: [
      "又把旧反应解释成唯一选择",
      "又跳过现实检查",
      "又试图一次性解决所有层级",
    ],
    antiInstinctReminder: deviceMethodPackage.mainDeviceMethod.antiInstinctAction,
  },
  archiveSummary: `${deviceMethodPackage.mainDeviceMethod.deviceName}已沉积为可复盘行为资产。`,
  migrationTrace: [
    `${deviceMethodPackage.sourceHexagramCode}｜${deviceMethodPackage.sourceHexagramName}形成当前局。`,
    `主切口落在 ${deviceMethodPackage.selectedCut.yaoPosition} / ${deviceMethodPackage.selectedCut.yaoLayer}。`,
    `器法进入${deviceMethodPackage.mainDeviceMethod.deviceName}。`,
    "反本能动作沉积为人格资产。",
  ],
});

export const buildPersonalityAssetDeposition = (args: {
  motherCodeProfile: MotherCodeProfile;
  pressureSeed: PressureSeed;
  currentHexagramProfile: CurrentHexagramProfile;
  deviceMethodPackage: DeviceMethodPackage;
}): PersonalityAssetDeposition => {
  const template =
    personalityAssetDepositionByHexagramCode[args.deviceMethodPackage.sourceHexagramCode] ??
    buildFallbackPersonalityAssetTemplate(args.deviceMethodPackage);
  const sourceDeviceMethod = args.deviceMethodPackage.mainDeviceMethod;

  return {
    assetId: `asset-deposition-${args.deviceMethodPackage.sourceHexagramCode}-${stableHash([
      args.motherCodeProfile.motherCodeId,
      args.pressureSeed.seedId,
      sourceDeviceMethod.deviceName,
    ].join(":"))}`,
    sourceHexagramCode: args.deviceMethodPackage.sourceHexagramCode,
    sourceHexagramName: args.deviceMethodPackage.sourceHexagramName,
    sourceHexagramTitle: args.deviceMethodPackage.sourceHexagramTitle,
    motherCode: args.motherCodeProfile.motherCodeName,
    upperTrigram: args.currentHexagramProfile.upperTrigram,
    lowerTrigram: args.currentHexagramProfile.lowerTrigram,
    sourcePressureLabel: `${args.pressureSeed.pressureType}｜${args.pressureSeed.fieldBias}`,
    sourceGravityValue: args.currentHexagramProfile.gravityValue,
    sourceMainCut: args.deviceMethodPackage.selectedCut,
    sourceDeviceMethod,
    assetName: template.assetName,
    assetType: template.assetType,
    assetSummary: template.assetSummary,
    beforePattern: template.beforePattern,
    afterCapability: template.afterCapability,
    defensePath90d: {
      ...template.defensePath90d,
      sourceDeviceMethod,
    },
    archiveSummary: template.archiveSummary,
    migrationTrace: template.migrationTrace,
  };
};

const buildMockCaseFullPipeline = (formationCase: (typeof mockHexagramFormationCases)[keyof typeof mockHexagramFormationCases]) => {
  const pressureField = buildPressureField(
    formationCase.motherCodeProfile,
    formationCase.pressureSeed,
    undefined,
    mockDynamicFieldModifiers,
  );
  const currentHexagramProfile = formCurrentHexagramProfile(
    formationCase.motherCodeProfile,
    formationCase.pressureSeed,
    pressureField,
  );
  const yaoTransmissionChain = buildYaoTransmissionChain(
    formationCase.motherCodeProfile,
    formationCase.pressureSeed,
    currentHexagramProfile,
  );
  const deviceMethodPackage = buildDeviceMethodPackage(yaoTransmissionChain);
  const personalityAssetDeposition = buildPersonalityAssetDeposition({
    motherCodeProfile: formationCase.motherCodeProfile,
    pressureSeed: formationCase.pressureSeed,
    currentHexagramProfile,
    deviceMethodPackage,
  });

  return {
    formationCase,
    motherCodeProfile: formationCase.motherCodeProfile,
    pressureSeed: formationCase.pressureSeed,
    pressureField,
    upperCodeFormation: currentHexagramProfile.upperCodeFormation,
    currentHexagramProfile,
    yaoTransmissionChain,
    deviceMethodPackage,
    personalityAssetDeposition,
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
      step: "current_hexagram_profile_to_yao_transmission_chain",
      reason: result.yaoTransmissionChain
        ? `卦码「${result.yaoTransmissionChain.sourceHexagramCode}｜${result.yaoTransmissionChain.sourceHexagramName}」定局后展开六爻人格传导，主切口落在「${result.yaoTransmissionChain.mainCut.yaoPosition}｜${result.yaoTransmissionChain.mainCut.yaoLayer}」。`
        : "本局尚未展开六爻人格传导。",
    },
    {
      step: "yao_transmission_chain_to_device_method_package",
      reason: result.deviceMethodPackage
        ? `切口「${result.deviceMethodPackage.selectedCut.yaoPosition}｜${result.deviceMethodPackage.selectedCut.yaoLayer}」定点，生成器法「${result.deviceMethodPackage.mainDeviceMethod.deviceName}」。`
        : "本局尚未生成器法包。",
    },
    {
      step: "device_method_package_to_personality_asset_deposition",
      reason: result.personalityAssetDeposition
        ? `器法「${result.personalityAssetDeposition.sourceDeviceMethod.deviceName}」执行后，沉积为「${result.personalityAssetDeposition.assetName}」。`
        : "本局尚未沉积人格资产。",
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
  const yaoTransmissionChain = buildYaoTransmissionChain(motherCodeProfile, pressureSeed, currentHexagramProfile);
  const deviceMethodPackage = buildDeviceMethodPackage(yaoTransmissionChain);
  const personalityAssetDeposition = buildPersonalityAssetDeposition({
    motherCodeProfile,
    pressureSeed,
    currentHexagramProfile,
    deviceMethodPackage,
  });
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
    yaoTransmissionChain,
    deviceMethodPackage,
    personalityAssetDeposition,
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
    ["has yaoTransmissionChain", Boolean(result.yaoTransmissionChain)],
    ["yaoTransmissionChain has 6 transmissions", result.yaoTransmissionChain?.transmissions.length === 6],
    ["has deviceMethodPackage", Boolean(result.deviceMethodPackage)],
    ["deviceMethodPackage has mainDeviceMethod", Boolean(result.deviceMethodPackage?.mainDeviceMethod)],
    ["has personalityAssetDeposition", Boolean(result.personalityAssetDeposition)],
    ["personalityAssetDeposition has 90d path", result.personalityAssetDeposition?.defensePath90d.phases.length === 3],
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
    ["causalTrace includes current_hexagram_profile_to_yao_transmission_chain", traceSteps.has("current_hexagram_profile_to_yao_transmission_chain")],
    ["causalTrace includes yao_transmission_chain_to_device_method_package", traceSteps.has("yao_transmission_chain_to_device_method_package")],
    ["causalTrace includes device_method_package_to_personality_asset_deposition", traceSteps.has("device_method_package_to_personality_asset_deposition")],
    ["pipeline works without locationAnchor", Boolean(resultWithoutLocation.personalityAsset)],
    ["dynamic modifiers can change field weight", result.pressureField.upperFieldWeight !== lightDynamicResult.pressureField.upperFieldWeight],
  ] satisfies [string, boolean][];

  return {
    result,
    passed: checkResults.every(([, passed]) => passed),
    checks: checkResults.map(([label, passed]) => `${label}: ${passed ? "passed" : "failed"}`),
  };
}

export function auditGuanyaoMotherCodeRegistry(): {
  passed: boolean;
  checks: string[];
  registry: MotherCodeDefinition[];
  defaultMotherCodeProfile: MotherCodeProfile;
} {
  const result = runGuanyaoCausalPipeline();
  const expectedMotherCodes = [
    { motherCodeId: 1, trigram: "乾", motherCodeName: "乾｜创世者", motherCodeTitle: "创世者" },
    { motherCodeId: 2, trigram: "坤", motherCodeName: "坤｜承载者", motherCodeTitle: "承载者" },
    { motherCodeId: 3, trigram: "震", motherCodeName: "震｜行动者", motherCodeTitle: "行动者" },
    { motherCodeId: 4, trigram: "巽", motherCodeName: "巽｜渗透者", motherCodeTitle: "渗透者" },
    { motherCodeId: 5, trigram: "坎", motherCodeName: "坎｜深陷者", motherCodeTitle: "深陷者" },
    { motherCodeId: 6, trigram: "离", motherCodeName: "离｜照见者", motherCodeTitle: "照见者" },
    { motherCodeId: 7, trigram: "艮", motherCodeName: "艮｜停滞者", motherCodeTitle: "停滞者" },
    { motherCodeId: 8, trigram: "兑", motherCodeName: "兑｜转化者", motherCodeTitle: "转化者" },
  ] as const;
  const requiredDefinitionFields: (keyof MotherCodeDefinition)[] = [
    "motherCodeId",
    "trigram",
    "motherCodeName",
    "motherCodeTitle",
    "baseDrive",
    "causalPosition",
    "pressureEntry",
    "shadowInertia",
    "pressureMode",
    "defaultReactionChain",
    "unlockPotential",
    "personalityAsset",
    "assetSummary",
    "visualAssetKey",
    "visualAssetCode",
    "xiantianDisplay",
    "trigramSymbol",
    "trigramImage",
    "wuxing",
    "visualAssetStatus",
    "visualAssetPackage",
    "visualTags",
    "uiBindingStatus",
    "uiSurface",
  ];
  const registryMatchesDefaultProfile = guanyaoMotherCodeRegistry.some(
    (definition) =>
      definition.motherCodeId === result.motherCodeProfile.motherCodeDefinitionId &&
      definition.trigram === result.motherCodeProfile.lowerTrigram &&
      definition.motherCodeName === result.motherCodeProfile.motherCodeName &&
      definition.baseDrive === result.motherCodeProfile.baseForce &&
      definition.causalPosition === result.motherCodeProfile.causalPosition &&
      definition.pressureEntry === result.motherCodeProfile.pressureEntry &&
      definition.shadowInertia === result.motherCodeProfile.shadowInertia &&
      definition.pressureMode === result.motherCodeProfile.pressureMode &&
      definition.defaultReactionChain === result.motherCodeProfile.defaultReactionChain &&
      definition.unlockPotential === result.motherCodeProfile.unlockPotential &&
      definition.personalityAsset === result.motherCodeProfile.personalityAsset &&
      definition.assetSummary === result.motherCodeProfile.assetSummary &&
      definition.visualAssetKey === result.motherCodeProfile.visualAssetKey &&
      definition.visualAssetCode === result.motherCodeProfile.visualAssetCode &&
      definition.xiantianNumber === result.motherCodeProfile.xiantianNumber &&
      definition.xiantianDisplay === result.motherCodeProfile.xiantianDisplay &&
      definition.trigramSymbol === result.motherCodeProfile.trigramSymbol &&
      definition.trigramImage === result.motherCodeProfile.trigramImage &&
      definition.wuxing === result.motherCodeProfile.wuxing &&
      definition.visualAssetStatus === result.motherCodeProfile.visualAssetStatus &&
      definition.visualAssetPackage === result.motherCodeProfile.visualAssetPackage &&
      definition.visualTags.force === result.motherCodeProfile.visualTags?.force &&
      definition.visualTags.mirror === result.motherCodeProfile.visualTags?.mirror &&
      definition.visualTags.unlock === result.motherCodeProfile.visualTags?.unlock &&
      definition.uiBindingStatus === result.motherCodeProfile.uiBindingStatus &&
      definition.uiSurface === result.motherCodeProfile.uiSurface,
  );
  const checkResults = [
    ["registry has 8 mother codes", guanyaoMotherCodeRegistry.length === 8],
    [
      "every mother code has required fields",
      guanyaoMotherCodeRegistry.every((definition) =>
        requiredDefinitionFields.every((field) => Boolean(definition[field])) &&
        Boolean(definition.visualTags.force) &&
        Boolean(definition.visualTags.mirror) &&
        Boolean(definition.visualTags.unlock),
      ),
    ],
    [
      "every mother code has visual asset key",
      guanyaoMotherCodeRegistry.every((definition) => Boolean(definition.visualAssetKey)),
    ],
    [
      "every mother code has visual asset code",
      guanyaoMotherCodeRegistry.every((definition) => Boolean(definition.visualAssetCode)),
    ],
    [
      "every mother code has existing visual asset status",
      guanyaoMotherCodeRegistry.every((definition) => definition.visualAssetStatus === "existing"),
    ],
    [
      "every mother code has mother-code visual package",
      guanyaoMotherCodeRegistry.every(
        (definition) => definition.visualAssetPackage === "mother-code-visual-pack-v1",
      ),
    ],
    [
      "visual asset codes match MC-01 to MC-08",
      guanyaoMotherCodeRegistry.every(
        (definition, index) =>
          definition.visualAssetCode ===
          [
            "MC-01-QIAN",
            "MC-02-KUN",
            "MC-03-ZHEN",
            "MC-04-XUN",
            "MC-05-KAN",
            "MC-06-LI",
            "MC-07-GEN",
            "MC-08-DUI",
          ][index],
      ),
    ],
    [
      "every mother code has xiantian mapping fields",
      guanyaoMotherCodeRegistry.every(
        (definition) =>
          typeof definition.xiantianNumber === "number" &&
          Boolean(definition.xiantianDisplay) &&
          Boolean(definition.trigramSymbol) &&
          Boolean(definition.trigramImage) &&
          Boolean(definition.wuxing),
      ),
    ],
    [
      "xiantian mapping matches trigram contract",
      [
        { trigram: "乾", xiantianNumber: 1, xiantianDisplay: "1", trigramSymbol: "☰", trigramImage: "天", wuxing: "金" },
        { trigram: "兑", xiantianNumber: 2, xiantianDisplay: "2", trigramSymbol: "☱", trigramImage: "泽", wuxing: "金" },
        { trigram: "离", xiantianNumber: 3, xiantianDisplay: "3", trigramSymbol: "☲", trigramImage: "火", wuxing: "火" },
        { trigram: "震", xiantianNumber: 4, xiantianDisplay: "4", trigramSymbol: "☳", trigramImage: "雷", wuxing: "木" },
        { trigram: "巽", xiantianNumber: 5, xiantianDisplay: "5", trigramSymbol: "☴", trigramImage: "风", wuxing: "木" },
        { trigram: "坎", xiantianNumber: 6, xiantianDisplay: "6", trigramSymbol: "☵", trigramImage: "水", wuxing: "水" },
        { trigram: "艮", xiantianNumber: 7, xiantianDisplay: "7", trigramSymbol: "☶", trigramImage: "山", wuxing: "土" },
        { trigram: "坤", xiantianNumber: 0, xiantianDisplay: "0/8", trigramSymbol: "☷", trigramImage: "地", wuxing: "土" },
      ].every((expected) => {
        const definition = guanyaoMotherCodeRegistry.find((item) => item.trigram === expected.trigram);

        return (
          definition?.xiantianNumber === expected.xiantianNumber &&
          definition.xiantianDisplay === expected.xiantianDisplay &&
          definition.trigramSymbol === expected.trigramSymbol &&
          definition.trigramImage === expected.trigramImage &&
          definition.wuxing === expected.wuxing
        );
      }),
    ],
    [
      "default dui keeps asset code and xiantian mapping separated",
      result.motherCodeProfile.motherCodeName === "兑｜转化者" &&
        result.motherCodeProfile.visualAssetCode === "MC-08-DUI" &&
        result.motherCodeProfile.xiantianDisplay === "2" &&
        result.motherCodeProfile.trigramSymbol === "☱" &&
        result.motherCodeProfile.trigramImage === "泽" &&
        result.motherCodeProfile.wuxing === "金",
    ],
    [
      "registry order and identity match 1-8 mother codes",
      expectedMotherCodes.every((expected, index) => {
        const definition = guanyaoMotherCodeRegistry[index];

        return (
          definition?.motherCodeId === expected.motherCodeId &&
          definition.trigram === expected.trigram &&
          definition.motherCodeName === expected.motherCodeName &&
          definition.motherCodeTitle === expected.motherCodeTitle
        );
      }),
    ],
    ["1 = 乾｜创世者", guanyaoMotherCodeRegistry[0]?.motherCodeName === "乾｜创世者"],
    ["2 = 坤｜承载者", guanyaoMotherCodeRegistry[1]?.motherCodeName === "坤｜承载者"],
    ["3 = 震｜行动者", guanyaoMotherCodeRegistry[2]?.motherCodeName === "震｜行动者"],
    ["4 = 巽｜渗透者", guanyaoMotherCodeRegistry[3]?.motherCodeName === "巽｜渗透者"],
    ["5 = 坎｜深陷者", guanyaoMotherCodeRegistry[4]?.motherCodeName === "坎｜深陷者"],
    ["6 = 离｜照见者", guanyaoMotherCodeRegistry[5]?.motherCodeName === "离｜照见者"],
    ["7 = 艮｜停滞者", guanyaoMotherCodeRegistry[6]?.motherCodeName === "艮｜停滞者"],
    ["8 = 兑｜转化者", guanyaoMotherCodeRegistry[7]?.motherCodeName === "兑｜转化者"],
    [
      "every mother code has causal position",
      guanyaoMotherCodeRegistry.every(
        (definition) => definition.causalPosition === "母码底盘 / 下码 / 内在原力",
      ),
    ],
    [
      "every mother code has pressure entry",
      guanyaoMotherCodeRegistry.every((definition) => Boolean(definition.pressureEntry)),
    ],
    [
      "every mother code has personality asset",
      guanyaoMotherCodeRegistry.every((definition) => Boolean(definition.personalityAsset)),
    ],
    [
      "every mother code has existing UI binding",
      guanyaoMotherCodeRegistry.every((definition) => definition.uiBindingStatus === "existing"),
    ],
    [
      "every mother code binds to MotherCodePage",
      guanyaoMotherCodeRegistry.every((definition) => definition.uiSurface === "MotherCodePage"),
    ],
    ["default motherCodeProfile reads registry content", registryMatchesDefaultProfile],
  ] satisfies [string, boolean][];

  return {
    passed: checkResults.every(([, passed]) => passed),
    checks: checkResults.map(([label, passed]) => `${label}: ${passed ? "passed" : "failed"}`),
    registry: guanyaoMotherCodeRegistry,
    defaultMotherCodeProfile: result.motherCodeProfile,
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

export function auditGuanyaoYaoTransmission(): {
  passed: boolean;
  checks: string[];
  samples: YaoTransmissionChain[];
} {
  const forbiddenUserPromptTerms = ["购买", "付费", "生成器法", "长按下刀", "本爻器法"];
  const cases = Object.values(mockHexagramFormationCases);
  const samples = cases.map((formationCase) => {
    const pressureField = buildPressureField(
      formationCase.motherCodeProfile,
      formationCase.pressureSeed,
      undefined,
      mockDynamicFieldModifiers,
    );
    const currentHexagramProfile = formCurrentHexagramProfile(
      formationCase.motherCodeProfile,
      formationCase.pressureSeed,
      pressureField,
    );

    return buildYaoTransmissionChain(
      formationCase.motherCodeProfile,
      formationCase.pressureSeed,
      currentHexagramProfile,
    );
  });
  const checkTransmissionFields = (transmission: YaoTransmissionProfile): boolean =>
    Boolean(
      transmission.yaoPosition &&
        transmission.yaoLayer &&
        transmission.pressureReading &&
        transmission.transmissionReading &&
        transmission.inertiaSignal &&
        transmission.antiInstinctHint &&
        typeof transmission.cutPotential === "number" &&
        typeof transmission.interventionPotential === "number" &&
        transmission.pauseSignal &&
        transmission.pauseReason &&
        transmission.userFacingPausePrompt &&
        transmission.userFacingContinuePrompt,
    );
  const promptsAreClean = (sample: YaoTransmissionChain): boolean =>
    sample.transmissions.every((transmission) =>
      forbiddenUserPromptTerms.every(
        (term) =>
          !transmission.userFacingPausePrompt.includes(term) &&
          !transmission.userFacingContinuePrompt.includes(term),
      ),
    );
  const checkResults = cases.flatMap((formationCase, index) => {
    const sample = samples[index];
    const maxInterventionPotential = Math.max(
      ...sample.transmissions.map((transmission) => transmission.interventionPotential),
    );
    const behaviorTransmission = sample.transmissions.find((transmission) => transmission.yaoLayer === "behavior");
    const thoughtCandidate = sample.cutCandidates.find((candidate) => candidate.yaoLayer === "thought");

    return [
      [
        `${formationCase.caseId} has 6 transmissions`,
        sample.transmissions.length === 6,
      ],
      [
        `${formationCase.caseId} all transmissions expose required fields`,
        sample.transmissions.every(checkTransmissionFields),
      ],
      [
        `${formationCase.caseId} all user prompts avoid forbidden commercial terms`,
        promptsAreClean(sample),
      ],
      [
        `${formationCase.caseId} has cutCandidates >= 6`,
        sample.cutCandidates.length >= 6,
      ],
      [
        `${formationCase.caseId} mainCut ${formationCase.expectedMainCut.yaoPosition} / ${formationCase.expectedMainCut.yaoLayer}`,
        sample.mainCut.yaoPosition === formationCase.expectedMainCut.yaoPosition &&
          sample.mainCut.yaoLayer === formationCase.expectedMainCut.yaoLayer,
      ],
      [
        `${formationCase.caseId} secondaryCut ${formationCase.expectedSecondaryCut.yaoPosition} / ${formationCase.expectedSecondaryCut.yaoLayer}`,
        sample.secondaryCut.yaoPosition === formationCase.expectedSecondaryCut.yaoPosition &&
          sample.secondaryCut.yaoLayer === formationCase.expectedSecondaryCut.yaoLayer,
      ],
      [
        `${formationCase.caseId} rootCut 6 / motivation`,
        sample.rootCut.yaoPosition === 6 && sample.rootCut.yaoLayer === "motivation",
      ],
      [
        `${formationCase.caseId} behavior interventionPotential highest or tied`,
        Boolean(behaviorTransmission) &&
          behaviorTransmission?.interventionPotential === maxInterventionPotential,
      ],
      [
        `${formationCase.caseId} thought is secondary candidate`,
        thoughtCandidate?.cutRole === "secondary",
      ],
      [
        `${formationCase.caseId} chain source hexagram`,
        sample.sourceHexagramCode === formationCase.expectedHexagramCode &&
          sample.sourceHexagramName === formationCase.expectedHexagramName &&
          sample.sourceHexagramTitle === formationCase.expectedHexagramTitle,
      ],
      [
        `${formationCase.caseId} fixed yao layer order`,
        sample.transmissions.map((transmission) => transmission.yaoLayer).join("/") ===
          "body/emotion/thought/behavior/memory/motivation",
      ],
      [
        `${formationCase.caseId} chainSummary present`,
        Boolean(sample.chainSummary),
      ],
    ] satisfies [string, boolean][];
  });

  return {
    passed: checkResults.every(([, passed]) => passed),
    checks: checkResults.map(([label, passed]) => `${label}: ${passed ? "passed" : "failed"}`),
    samples,
  };
}

export function auditGuanyaoDeviceMethod(): {
  passed: boolean;
  checks: string[];
  samples: DeviceMethodPackage[];
} {
  const forbiddenUserPromptTerms = ["购买", "付费", "长按下刀", "本爻器法"];
  const cases = Object.values(mockHexagramFormationCases);
  const samples = cases.map((formationCase) => {
    const pressureField = buildPressureField(
      formationCase.motherCodeProfile,
      formationCase.pressureSeed,
      undefined,
      mockDynamicFieldModifiers,
    );
    const currentHexagramProfile = formCurrentHexagramProfile(
      formationCase.motherCodeProfile,
      formationCase.pressureSeed,
      pressureField,
    );
    const yaoTransmissionChain = buildYaoTransmissionChain(
      formationCase.motherCodeProfile,
      formationCase.pressureSeed,
      currentHexagramProfile,
    );

    return buildDeviceMethodPackage(yaoTransmissionChain);
  });
  const methodHasRequiredActions = (method: DeviceMethod): boolean =>
    Boolean(method.firstAction && method.next72HoursAction && method.thirtyDayAction);
  const methodPromptIsClean = (method: DeviceMethod): boolean =>
    forbiddenUserPromptTerms.every((term) => !method.userFacingMethodPrompt.includes(term));
  const checkResults = cases.flatMap((formationCase, index) => {
    const sample = samples[index];

    return [
      [
        `${formationCase.caseId} has DeviceMethodPackage`,
        Boolean(sample),
      ],
      [
        `${formationCase.caseId} mainDeviceMethod sourceCut ${formationCase.expectedMainCut.yaoPosition} / ${formationCase.expectedMainCut.yaoLayer}`,
        sample.mainDeviceMethod.sourceCut.yaoPosition === formationCase.expectedMainCut.yaoPosition &&
          sample.mainDeviceMethod.sourceCut.yaoLayer === formationCase.expectedMainCut.yaoLayer,
      ],
      [
        `${formationCase.caseId} deviceName ${formationCase.expectedMainDeviceName}`,
        sample.mainDeviceMethod.deviceName === formationCase.expectedMainDeviceName,
      ],
      [
        `${formationCase.caseId} mainDeviceMethod has first / 72h / 30d actions`,
        methodHasRequiredActions(sample.mainDeviceMethod),
      ],
      [
        `${formationCase.caseId} mainDeviceMethod prompt avoids forbidden commercial terms`,
        methodPromptIsClean(sample.mainDeviceMethod),
      ],
      [
        `${formationCase.caseId} source hexagram matches`,
        sample.sourceHexagramCode === formationCase.expectedHexagramCode &&
          sample.sourceHexagramName === formationCase.expectedHexagramName &&
          sample.sourceHexagramTitle === formationCase.expectedHexagramTitle,
      ],
      [
        `${formationCase.caseId} has secondary and root methods`,
        Boolean(sample.secondaryDeviceMethod && sample.rootDeviceMethod),
      ],
    ] satisfies [string, boolean][];
  });

  return {
    passed: checkResults.every(([, passed]) => passed),
    checks: checkResults.map(([label, passed]) => `${label}: ${passed ? "passed" : "failed"}`),
    samples,
  };
}

export function auditGuanyaoPersonalityAssetDeposition(): {
  passed: boolean;
  checks: string[];
  samples: PersonalityAssetDeposition[];
} {
  const cases = Object.values(mockHexagramFormationCases);
  const samples = cases.map((formationCase) => {
    const pressureField = buildPressureField(
      formationCase.motherCodeProfile,
      formationCase.pressureSeed,
      undefined,
      mockDynamicFieldModifiers,
    );
    const currentHexagramProfile = formCurrentHexagramProfile(
      formationCase.motherCodeProfile,
      formationCase.pressureSeed,
      pressureField,
    );
    const yaoTransmissionChain = buildYaoTransmissionChain(
      formationCase.motherCodeProfile,
      formationCase.pressureSeed,
      currentHexagramProfile,
    );
    const deviceMethodPackage = buildDeviceMethodPackage(yaoTransmissionChain);

    return buildPersonalityAssetDeposition({
      motherCodeProfile: formationCase.motherCodeProfile,
      pressureSeed: formationCase.pressureSeed,
      currentHexagramProfile,
      deviceMethodPackage,
    });
  });
  const requiredPhaseIds = ["first_72_hours", "day_1_to_30", "day_31_to_90"] as const;
  const hasRequiredPhases = (deposition: PersonalityAssetDeposition): boolean => {
    const phaseIds = new Set(deposition.defensePath90d.phases.map((phase) => phase.phaseId));

    return requiredPhaseIds.every((phaseId) => phaseIds.has(phaseId));
  };
  const checkResults = cases.flatMap((formationCase, index) => {
    const sample = samples[index];

    return [
      [
        `${formationCase.caseId} has PersonalityAssetDeposition`,
        Boolean(sample),
      ],
      [
        `${formationCase.caseId} assetName ${formationCase.expectedAssetName}`,
        sample.assetName === formationCase.expectedAssetName,
      ],
      [
        `${formationCase.caseId} defensePath90d has 3 phases`,
        sample.defensePath90d.phases.length === 3,
      ],
      [
        `${formationCase.caseId} defensePath90d has required phase ids`,
        hasRequiredPhases(sample),
      ],
      [
        `${formationCase.caseId} relapseWarning >= 3`,
        sample.defensePath90d.relapseWarning.length >= 3,
      ],
      [
        `${formationCase.caseId} antiInstinctReminder present`,
        Boolean(sample.defensePath90d.antiInstinctReminder),
      ],
      [
        `${formationCase.caseId} source method matches main device`,
        sample.sourceDeviceMethod.deviceName === formationCase.expectedMainDeviceName,
      ],
      [
        `${formationCase.caseId} source hexagram matches`,
        sample.sourceHexagramCode === formationCase.expectedHexagramCode &&
          sample.sourceHexagramName === formationCase.expectedHexagramName &&
          sample.sourceHexagramTitle === formationCase.expectedHexagramTitle,
      ],
    ] satisfies [string, boolean][];
  });

  return {
    passed: checkResults.every(([, passed]) => passed),
    checks: checkResults.map(([label, passed]) => `${label}: ${passed ? "passed" : "failed"}`),
    samples,
  };
}

export function auditGuanyaoFullPipeline(): {
  passed: boolean;
  checks: string[];
  samples: ReturnType<typeof buildMockCaseFullPipeline>[];
} {
  const forbiddenUserPromptTerms = ["购买", "付费", "长按下刀", "本爻器法"];
  const requiredYaoLayerOrder = "body/emotion/thought/behavior/memory/motivation";
  const requiredPhaseIds = ["first_72_hours", "day_1_to_30", "day_31_to_90"] as const;
  const cases = Object.values(mockHexagramFormationCases);
  const samples = cases.map(buildMockCaseFullPipeline);
  const allTransmissionPromptsAreClean = (sample: ReturnType<typeof buildMockCaseFullPipeline>): boolean =>
    sample.yaoTransmissionChain.transmissions.every((transmission) =>
      forbiddenUserPromptTerms.every(
        (term) =>
          !transmission.userFacingPausePrompt.includes(term) &&
          !transmission.userFacingContinuePrompt.includes(term),
      ),
    );
  const userMethodPromptIsClean = (sample: ReturnType<typeof buildMockCaseFullPipeline>): boolean =>
    forbiddenUserPromptTerms.every(
      (term) => !sample.deviceMethodPackage.mainDeviceMethod.userFacingMethodPrompt.includes(term),
    );
  const assetTextIsClean = (sample: ReturnType<typeof buildMockCaseFullPipeline>): boolean =>
    forbiddenUserPromptTerms.every(
      (term) =>
        !sample.personalityAssetDeposition.assetSummary.includes(term) &&
        !sample.personalityAssetDeposition.archiveSummary.includes(term),
    );
  const everyTransmissionHasPauseFields = (sample: ReturnType<typeof buildMockCaseFullPipeline>): boolean =>
    sample.yaoTransmissionChain.transmissions.every(
      (transmission) =>
        typeof transmission.interventionPotential === "number" &&
        Boolean(
          transmission.pauseSignal &&
            transmission.pauseReason &&
            transmission.userFacingPausePrompt &&
            transmission.userFacingContinuePrompt,
        ),
    );
  const hasRequiredPhases = (sample: ReturnType<typeof buildMockCaseFullPipeline>): boolean => {
    const phaseIds = new Set(sample.personalityAssetDeposition.defensePath90d.phases.map((phase) => phase.phaseId));

    return requiredPhaseIds.every((phaseId) => phaseIds.has(phaseId));
  };
  const checkResults = samples.flatMap((sample) => {
    const formationCase = sample.formationCase;
    const isDebtCase = formationCase.expectedHexagramCode === "047";
    const expectedUpperCodePhrase = isDebtCase
      ? "困局与难以抽离成为主导压力，上码显影为坎"
      : "责任与承载成为主导压力，上码显影为坤";
    const expectedLineImpact = isDebtCase
      ? { personalityDynamicsLine: 6, systemMechanismLine: 6, lifecycleStageLine: 6 }
      : { personalityDynamicsLine: 2, systemMechanismLine: 6, lifecycleStageLine: 4 };
    const expectedDominantLine = isDebtCase ? "mixed" : "system";

    return [
      [`${formationCase.caseId} has motherCodeProfile`, Boolean(sample.motherCodeProfile)],
      [`${formationCase.caseId} has pressureSeed`, Boolean(sample.pressureSeed)],
      [`${formationCase.caseId} has pressureField`, Boolean(sample.pressureField)],
      [`${formationCase.caseId} has UpperCodeFormation`, Boolean(sample.upperCodeFormation)],
      [`${formationCase.caseId} has CurrentHexagramProfile`, Boolean(sample.currentHexagramProfile)],
      [`${formationCase.caseId} has YaoTransmissionChain`, Boolean(sample.yaoTransmissionChain)],
      [`${formationCase.caseId} has DeviceMethodPackage`, Boolean(sample.deviceMethodPackage)],
      [`${formationCase.caseId} has PersonalityAssetDeposition`, Boolean(sample.personalityAssetDeposition)],
      [
        `${formationCase.caseId} upperCode lineImpact stable`,
        sample.upperCodeFormation.lineImpact.personalityDynamicsLine === expectedLineImpact.personalityDynamicsLine &&
          sample.upperCodeFormation.lineImpact.systemMechanismLine === expectedLineImpact.systemMechanismLine &&
          sample.upperCodeFormation.lineImpact.lifecycleStageLine === expectedLineImpact.lifecycleStageLine,
      ],
      [
        `${formationCase.caseId} upperCode dominantLine ${expectedDominantLine}`,
        sample.upperCodeFormation.dominantLine === expectedDominantLine,
      ],
      [
        `${formationCase.caseId} upperCode externalEnvironmentType ${formationCase.expectedExternalEnvironmentType}`,
        sample.upperCodeFormation.externalEnvironmentType === formationCase.expectedExternalEnvironmentType,
      ],
      [
        `${formationCase.caseId} upperCode upperTrigram ${formationCase.expectedUpperTrigram}`,
        sample.upperCodeFormation.upperTrigram === formationCase.expectedUpperTrigram,
      ],
      [
        `${formationCase.caseId} upperCodeReading contains expected phrase`,
        sample.upperCodeFormation.upperCodeReading.includes(expectedUpperCodePhrase),
      ],
      [
        `${formationCase.caseId} currentHexagramProfile stable`,
        sample.currentHexagramProfile.lowerTrigram === formationCase.expectedLowerTrigram &&
          sample.currentHexagramProfile.upperTrigram === formationCase.expectedUpperTrigram &&
          sample.currentHexagramProfile.hexagramCode === formationCase.expectedHexagramCode &&
          sample.currentHexagramProfile.hexagramName === formationCase.expectedHexagramName &&
          sample.currentHexagramProfile.hexagramTitle === formationCase.expectedHexagramTitle,
      ],
      [
        `${formationCase.caseId} yao transmissions length 6`,
        sample.yaoTransmissionChain.transmissions.length === 6,
      ],
      [
        `${formationCase.caseId} yao layer order stable`,
        sample.yaoTransmissionChain.transmissions.map((transmission) => transmission.yaoLayer).join("/") ===
          requiredYaoLayerOrder,
      ],
      [
        `${formationCase.caseId} main / secondary / root cuts stable`,
        sample.yaoTransmissionChain.mainCut.yaoPosition === 4 &&
          sample.yaoTransmissionChain.mainCut.yaoLayer === "behavior" &&
          sample.yaoTransmissionChain.secondaryCut.yaoPosition === 3 &&
          sample.yaoTransmissionChain.secondaryCut.yaoLayer === "thought" &&
          sample.yaoTransmissionChain.rootCut.yaoPosition === 6 &&
          sample.yaoTransmissionChain.rootCut.yaoLayer === "motivation",
      ],
      [
        `${formationCase.caseId} cutCandidates >= 6`,
        sample.yaoTransmissionChain.cutCandidates.length >= 6,
      ],
      [
        `${formationCase.caseId} transmissions include pause fields`,
        everyTransmissionHasPauseFields(sample),
      ],
      [
        `${formationCase.caseId} device method stable`,
        sample.deviceMethodPackage.mainDeviceMethod.sourceCut.yaoPosition === 4 &&
          sample.deviceMethodPackage.mainDeviceMethod.sourceCut.yaoLayer === "behavior" &&
          sample.deviceMethodPackage.mainDeviceMethod.deviceName === formationCase.expectedMainDeviceName &&
          Boolean(
            sample.deviceMethodPackage.mainDeviceMethod.firstAction &&
              sample.deviceMethodPackage.mainDeviceMethod.next72HoursAction &&
              sample.deviceMethodPackage.mainDeviceMethod.thirtyDayAction,
          ),
      ],
      [
        `${formationCase.caseId} asset deposition stable`,
        sample.personalityAssetDeposition.assetName === formationCase.expectedAssetName &&
          sample.personalityAssetDeposition.defensePath90d.phases.length === 3 &&
          hasRequiredPhases(sample) &&
          sample.personalityAssetDeposition.defensePath90d.relapseWarning.length >= 3 &&
          Boolean(sample.personalityAssetDeposition.defensePath90d.antiInstinctReminder),
      ],
      [
        `${formationCase.caseId} forbidden user prompt terms absent`,
        allTransmissionPromptsAreClean(sample) && userMethodPromptIsClean(sample) && assetTextIsClean(sample),
      ],
    ] satisfies [string, boolean][];
  });

  return {
    passed: checkResults.every(([, passed]) => passed),
    checks: checkResults.map(([label, passed]) => `${label}: ${passed ? "passed" : "failed"}`),
    samples,
  };
}

export function auditGuanyaoNumericProtocol(): {
  passed: boolean;
  checks: string[];
  protocol: typeof guanyaoNumericProtocol;
} {
  const expectedFieldMappings = [
    { remainder: 1, display: "1", trigram: "乾", trigramSymbol: "☰", trigramImage: "天", wuxing: "金" },
    { remainder: 2, display: "2", trigram: "兑", trigramSymbol: "☱", trigramImage: "泽", wuxing: "金" },
    { remainder: 3, display: "3", trigram: "离", trigramSymbol: "☲", trigramImage: "火", wuxing: "火" },
    { remainder: 4, display: "4", trigram: "震", trigramSymbol: "☳", trigramImage: "雷", wuxing: "木" },
    { remainder: 5, display: "5", trigram: "巽", trigramSymbol: "☴", trigramImage: "风", wuxing: "木" },
    { remainder: 6, display: "6", trigram: "坎", trigramSymbol: "☵", trigramImage: "水", wuxing: "水" },
    { remainder: 7, display: "7", trigram: "艮", trigramSymbol: "☶", trigramImage: "山", wuxing: "土" },
    { remainder: 0, display: "0/8", trigram: "坤", trigramSymbol: "☷", trigramImage: "地", wuxing: "土" },
  ] as const;
  const expectedChangeMappings = [
    { remainder: 1, display: "1", changeNode: 1, dimensionName: "身体空间" },
    { remainder: 2, display: "2", changeNode: 2, dimensionName: "情绪空间" },
    { remainder: 3, display: "3", changeNode: 3, dimensionName: "思想空间" },
    { remainder: 4, display: "4", changeNode: 4, dimensionName: "行为空间" },
    { remainder: 5, display: "5", changeNode: 5, dimensionName: "记忆空间" },
    { remainder: 0, display: "0/6", changeNode: 6, dimensionName: "动机空间" },
  ] as const;
  const fieldMappingMatches = expectedFieldMappings.every((expected) => {
    const mapping = guanyaoNumericProtocol.fieldMappings.find((item) => item.remainder === expected.remainder);

    return (
      mapping?.display === expected.display &&
      mapping.trigram === expected.trigram &&
      mapping.trigramSymbol === expected.trigramSymbol &&
      mapping.trigramImage === expected.trigramImage &&
      mapping.wuxing === expected.wuxing &&
      mapping.protocolRole === "field" &&
      mapping.protocolName === "卦以八除"
    );
  });
  const changeMappingMatches = expectedChangeMappings.every((expected) => {
    const mapping = guanyaoNumericProtocol.changeMappings.find((item) => item.remainder === expected.remainder);

    return (
      mapping?.display === expected.display &&
      mapping.changeNode === expected.changeNode &&
      mapping.dimensionName === expected.dimensionName &&
      mapping.protocolRole === "change" &&
      mapping.protocolName === "爻以六分"
    );
  });
  const checkResults = [
    [
      "fieldProtocol is 卦以八除 / 8 / field",
      guanyaoNumericProtocol.fieldProtocol.name === "卦以八除" &&
        guanyaoNumericProtocol.fieldProtocol.moduloBase === 8 &&
        guanyaoNumericProtocol.fieldProtocol.role === "field",
    ],
    [
      "changeProtocol is 爻以六分 / 6 / change",
      guanyaoNumericProtocol.changeProtocol.name === "爻以六分" &&
        guanyaoNumericProtocol.changeProtocol.moduloBase === 6 &&
        guanyaoNumericProtocol.changeProtocol.role === "change",
    ],
    ["eight-division mappings length is 8", guanyaoNumericProtocol.fieldMappings.length === 8],
    ["eight-division mappings match xiantian contract", fieldMappingMatches],
    ["six-division mappings length is 6", guanyaoNumericProtocol.changeMappings.length === 6],
    ["six-division mappings match dimension contract", changeMappingMatches],
    ["normalizeEightRemainder(8) returns 0", normalizeEightRemainder(8) === 0],
    ["normalizeEightRemainder(10) returns 2", normalizeEightRemainder(10) === 2],
    ["normalizeSixRemainder(6) returns 0", normalizeSixRemainder(6) === 0],
    ["normalizeSixRemainder(8) returns 2", normalizeSixRemainder(8) === 2],
    ["getEightDivisionFieldMapping(8) returns 坤", getEightDivisionFieldMapping(8).trigram === "坤"],
    ["getEightDivisionFieldMapping(10) returns 兑", getEightDivisionFieldMapping(10).trigram === "兑"],
    ["getSixDivisionChangeMapping(6) returns 动机空间", getSixDivisionChangeMapping(6).dimensionName === "动机空间"],
    ["getSixDivisionChangeMapping(8) returns 情绪空间", getSixDivisionChangeMapping(8).dimensionName === "情绪空间"],
  ] satisfies [string, boolean][];

  return {
    passed: checkResults.every(([, passed]) => passed),
    checks: checkResults.map(([label, passed]) => `${label}: ${passed ? "passed" : "failed"}`),
    protocol: guanyaoNumericProtocol,
  };
}

export function auditGuanyaoRealityPressureFields(): {
  passed: boolean;
  checks: string[];
  fields: typeof guanyaoRealityPressureFields;
} {
  const requiredFieldCodes = ["POWER", "INTEREST", "RELATION", "FAMILY", "SOCIAL", "EXISTENTIAL"] as const;
  const forbiddenTerms = [
    `命中${"注定"}`,
    `天命${"已定"}`,
    `注定${"如此"}`,
    `算${"命"}`,
    `断${"命"}`,
    `吉${"凶"}${"断语"}`,
  ];
  const fields = listRealityPressureFields();
  const fieldCodes = new Set(fields.map((field) => field.fieldCode));
  const everyFieldHasRequiredShape = fields.every(
    (field) =>
      Boolean(
        field.fieldCode &&
          field.fieldName &&
          field.englishName &&
          field.pressureNature &&
          field.userFacingQuestion &&
          field.engineRole &&
          field.distinctionFromSixDimensions,
      ) &&
      field.coreRelations.length > 0 &&
      field.typicalPressureSlices.length >= 3,
  );
  const everyFieldSeparatesExternalAndInternal = fields.every(
    (field) =>
      field.distinctionFromSixDimensions.includes("外部") &&
      field.distinctionFromSixDimensions.includes("六维人格空间"),
  );
  const fieldTextsAreClean = fields.every((field) => {
    const joinedText = [
      field.fieldName,
      field.englishName,
      ...field.coreRelations,
      field.pressureNature,
      field.userFacingQuestion,
      ...field.typicalPressureSlices,
      field.engineRole,
      field.distinctionFromSixDimensions,
    ].join("\n");

    return forbiddenTerms.every((term) => !joinedText.includes(term));
  });
  const checkResults = [
    ["reality pressure field registry length is 6", fields.length === 6],
    [
      "reality pressure field registry contains all required codes",
      requiredFieldCodes.every((fieldCode) => fieldCodes.has(fieldCode)),
    ],
    ["every reality pressure field has required fields", everyFieldHasRequiredShape],
    ["every reality pressure field has at least 3 pressure slices", fields.every((field) => field.typicalPressureSlices.length >= 3)],
    ["every reality pressure field distinguishes external pressure from six dimensions", everyFieldSeparatesExternalAndInternal],
    ["getRealityPressureFieldDefinition(POWER) returns 权力场", getRealityPressureFieldDefinition("POWER").fieldName === "权力场"],
    [
      "getRealityPressureFieldDefinition(EXISTENTIAL) returns 存在场",
      getRealityPressureFieldDefinition("EXISTENTIAL").fieldName === "存在场",
    ],
    ["forbidden fatalistic terms absent from reality pressure fields", fieldTextsAreClean],
  ] satisfies [string, boolean][];

  return {
    passed: checkResults.every(([, passed]) => passed),
    checks: checkResults.map(([label, passed]) => `${label}: ${passed ? "passed" : "failed"}`),
    fields,
  };
}

export function auditGuanyaoPressureSeedLanguageProtocol(): {
  passed: boolean;
  checks: string[];
  examples: ReturnType<typeof listPressureSeedLanguageExamples>;
} {
  const examples = listPressureSeedLanguageExamples();
  const requiredLayerNames = ["Surface", "Core", "Shell"] as const;
  const forbiddenSurfaceFragments = ["人格模式", "系统逻辑", "控制课题", "正在被激活"];
  const forbiddenShellFragments = ["你应该", "解决方案", "完整分析", "安慰"];
  const hasAllLayers = requiredLayerNames.every((layerName) =>
    pressureSeedLanguageProtocol.layers.some((layer) => layer.layer === layerName),
  );
  const userPromptsUseOnlySurfaceAndShell = examples.every(
    (example) => example.userFacingSeedPrompt === composePressureSeedUserPrompt(example),
  );
  const everyExampleHasThreeLayers = examples.every(
    (example) =>
      Boolean(example.surface) &&
      Boolean(example.core.fieldBias) &&
      Boolean(example.core.pressureNatureBias) &&
      Boolean(example.core.relationshipRoleBias) &&
      example.core.sixDimensionEntryBias.length > 0 &&
      Boolean(example.shell.costHint) &&
      Boolean(example.shell.oldReactionHint) &&
      Boolean(example.shell.primaryDimension) &&
      Boolean(example.userFacingSeedPrompt),
  );
  const surfacesAreConcrete = examples.every((example) => {
    const hasSubjectAction = /你|他|她|对方|父母|客户|老板/.test(example.surface);
    const hasPunctuation = /。|？|！/.test(example.surface);

    return hasSubjectAction && hasPunctuation && forbiddenSurfaceFragments.every((fragment) => !example.surface.includes(fragment));
  });
  const shellTextsAreShortAndBounded = examples.every(
    (example) =>
      example.shell.costHint.length <= 32 &&
      example.shell.oldReactionHint.length <= 32 &&
      forbiddenShellFragments.every(
        (fragment) => !example.shell.costHint.includes(fragment) && !example.shell.oldReactionHint.includes(fragment),
      ),
  );
  const coreIsNotDirectlyDisplayed = examples.every((example) => {
    const coreValues = [
      example.pressureField,
      example.pressureNature,
      example.relationshipRole,
      example.core.fieldBias,
      example.core.pressureNatureBias,
      example.core.relationshipRoleBias,
      ...example.core.sixDimensionEntryBias,
    ];

    return coreValues.every((value) => !example.userFacingSeedPrompt.includes(value));
  });
  const checkResults = [
    ["pressure seed language protocol has Surface / Core / Shell", hasAllLayers],
    ["pressure seed examples length is 3", examples.length === 3],
    ["every pressure seed example has Surface / Core / Shell fields", everyExampleHasThreeLayers],
    ["userFacingSeedPrompt uses Surface + Shell only", userPromptsUseOnlySurfaceAndShell],
    ["Core fields are not directly displayed in userFacingSeedPrompt", coreIsNotDirectlyDisplayed],
    ["Surface examples stay concrete and non-abstract", surfacesAreConcrete],
    ["Shell examples stay short and bounded", shellTextsAreShortAndBounded],
    ["POWER example maps evaluation pressure", examples.some((example) => example.pressureField === "POWER" && example.pressureNature === "EVALUATION")],
    [
      "RELATION example maps attachment pressure",
      examples.some((example) => example.pressureField === "RELATION" && example.pressureNature === "ATTACHMENT"),
    ],
    ["FAMILY example maps control pressure", examples.some((example) => example.pressureField === "FAMILY" && example.pressureNature === "CONTROL")],
  ] satisfies [string, boolean][];

  return {
    passed: checkResults.every(([, passed]) => passed),
    checks: checkResults.map(([label, passed]) => `${label}: ${passed ? "passed" : "failed"}`),
    examples,
  };
}
