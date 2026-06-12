import {
  mockChronoCoordinate,
  mockDynamicFieldModifiers,
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
  DynamicFieldModifiers,
  EmotionalIntensity,
  GuanyaoCausalPipelineResult,
  HexagramField,
  HourBranch,
  LocationAnchor,
  MotherCodeProfile,
  PersonalityAsset,
  PressureField,
  PressureDuration,
  PressureIntensity,
  PressureSeed,
  RepairMethod,
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

export const buildHexagramField = (
  motherCodeProfile: MotherCodeProfile,
  pressureField: PressureField,
): HexagramField => {
  const pressureLevelName = getPressureLevelName(pressureField.upperFieldWeight);

  return {
    hexagramId: `HEX-${motherCodeProfile.motherCodeId}-${pressureField.fieldId}`,
    hexagramName: `${pressureLevelName} / ${motherCodeProfile.motherCodeName}`,
    behaviorFieldName: `${pressureLevelName}${motherCodeProfile.motherCodeName}`,
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
  const hexagramField = buildHexagramField(motherCodeProfile, pressureField);
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
    ["pipeline works without locationAnchor", Boolean(resultWithoutLocation.personalityAsset)],
    ["dynamic modifiers can change field weight", result.pressureField.upperFieldWeight !== lightDynamicResult.pressureField.upperFieldWeight],
  ] satisfies [string, boolean][];

  return {
    result,
    passed: checkResults.every(([, passed]) => passed),
    checks: checkResults.map(([label, passed]) => `${label}: ${passed ? "passed" : "failed"}`),
  };
}
