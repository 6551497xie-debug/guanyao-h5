import type {
  ChronoCoordinate,
  EightDivisionFieldMapping,
  GuanyaoNumericProtocol,
  MotherCodeDefinition,
  MotherCodeProfile,
  SixDivisionChangeMapping,
} from "../types/guanyaoCausalEngine";
import {
  getMotherCodeDefinitionByTrigram,
  toMotherCodeProfile,
} from "./guanyaoMotherCodeRegistry";

export const guanyaoNumericProtocol: GuanyaoNumericProtocol = {
  fieldProtocol: {
    name: "卦以八除",
    moduloBase: 8,
    role: "field",
    explanation: "八除不是宿命判断，而是场域定位；用于确定母码、上码与卦场映射。",
  },
  changeProtocol: {
    name: "爻以六分",
    moduloBase: 6,
    role: "change",
    explanation: "六分不是命运断语，而是变化节点定位；用于确定观变节点、动态变化位置与行动信号位置。",
  },
  fieldMappings: [
    {
      remainder: 1,
      display: "1",
      trigram: "乾",
      trigramSymbol: "☰",
      trigramImage: "天",
      wuxing: "金",
      protocolRole: "field",
      protocolName: "卦以八除",
      userFacingMeaning: "八除定场：乾为开局、方向与主动创造的场域坐标。",
    },
    {
      remainder: 2,
      display: "2",
      trigram: "兑",
      trigramSymbol: "☱",
      trigramImage: "泽",
      wuxing: "金",
      protocolRole: "field",
      protocolName: "卦以八除",
      userFacingMeaning: "八除定场：兑为沟通、交换与关系转化的场域坐标。",
    },
    {
      remainder: 3,
      display: "3",
      trigram: "离",
      trigramSymbol: "☲",
      trigramImage: "火",
      wuxing: "火",
      protocolRole: "field",
      protocolName: "卦以八除",
      userFacingMeaning: "八除定场：离为照见、表达与问题显影的场域坐标。",
    },
    {
      remainder: 4,
      display: "4",
      trigram: "震",
      trigramSymbol: "☳",
      trigramImage: "雷",
      wuxing: "木",
      protocolRole: "field",
      protocolName: "卦以八除",
      userFacingMeaning: "八除定场：震为启动、行动与破局推进的场域坐标。",
    },
    {
      remainder: 5,
      display: "5",
      trigram: "巽",
      trigramSymbol: "☴",
      trigramImage: "风",
      wuxing: "木",
      protocolRole: "field",
      protocolName: "卦以八除",
      userFacingMeaning: "八除定场：巽为渗透、绕行与缝隙判断的场域坐标。",
    },
    {
      remainder: 6,
      display: "6",
      trigram: "坎",
      trigramSymbol: "☵",
      trigramImage: "水",
      wuxing: "水",
      protocolRole: "field",
      protocolName: "卦以八除",
      userFacingMeaning: "八除定场：坎为深陷、复盘与穿越困局的场域坐标。",
    },
    {
      remainder: 7,
      display: "7",
      trigram: "艮",
      trigramSymbol: "☶",
      trigramImage: "山",
      wuxing: "土",
      protocolRole: "field",
      protocolName: "卦以八除",
      userFacingMeaning: "八除定场：艮为停止、边界与及时止损的场域坐标。",
    },
    {
      remainder: 0,
      display: "0/8",
      trigram: "坤",
      trigramSymbol: "☷",
      trigramImage: "地",
      wuxing: "土",
      protocolRole: "field",
      protocolName: "卦以八除",
      userFacingMeaning: "八除定场：坤为承载、托底与稳定关系的场域坐标。",
    },
  ],
  changeMappings: [
    {
      remainder: 1,
      display: "1",
      changeNode: 1,
      dimensionKey: "body",
      dimensionName: "身体空间",
      protocolRole: "change",
      protocolName: "爻以六分",
      userFacingMeaning: "六分定时：变化最先落在身体反应与本能警报。",
    },
    {
      remainder: 2,
      display: "2",
      changeNode: 2,
      dimensionKey: "emotion",
      dimensionName: "情绪空间",
      protocolRole: "change",
      protocolName: "爻以六分",
      userFacingMeaning: "六分定时：变化进入情绪放大与感受波动。",
    },
    {
      remainder: 3,
      display: "3",
      changeNode: 3,
      dimensionKey: "thought",
      dimensionName: "思想空间",
      protocolRole: "change",
      protocolName: "爻以六分",
      userFacingMeaning: "六分定时：变化进入解释、判断与自我叙事。",
    },
    {
      remainder: 4,
      display: "4",
      changeNode: 4,
      dimensionKey: "behavior",
      dimensionName: "行为空间",
      protocolRole: "change",
      protocolName: "爻以六分",
      userFacingMeaning: "六分定时：变化进入外显动作与惯性执行。",
    },
    {
      remainder: 5,
      display: "5",
      changeNode: 5,
      dimensionKey: "memory",
      dimensionName: "记忆空间",
      protocolRole: "change",
      protocolName: "爻以六分",
      userFacingMeaning: "六分定时：变化回流到旧经验、旧记忆和熟悉脚本。",
    },
    {
      remainder: 0,
      display: "0/6",
      changeNode: 6,
      dimensionKey: "motivation",
      dimensionName: "动机空间",
      protocolRole: "change",
      protocolName: "爻以六分",
      userFacingMeaning: "六分定时：变化落到最深层的保护动机与旧稳定需求。",
    },
  ],
};

export function normalizeEightRemainder(input: number): 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 {
  return (((input % 8) + 8) % 8) as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

export function normalizeSixRemainder(input: number): 0 | 1 | 2 | 3 | 4 | 5 {
  return (((input % 6) + 6) % 6) as 0 | 1 | 2 | 3 | 4 | 5;
}

export function getEightDivisionFieldMapping(input: number): EightDivisionFieldMapping {
  const remainder = normalizeEightRemainder(input);
  const mapping = guanyaoNumericProtocol.fieldMappings.find((item) => item.remainder === remainder);

  if (!mapping) {
    throw new Error(`Missing eight-division field mapping for remainder ${remainder}`);
  }

  return mapping;
}

export function getSixDivisionChangeMapping(input: number): SixDivisionChangeMapping {
  const remainder = normalizeSixRemainder(input);
  const mapping = guanyaoNumericProtocol.changeMappings.find((item) => item.remainder === remainder);

  if (!mapping) {
    throw new Error(`Missing six-division change mapping for remainder ${remainder}`);
  }

  return mapping;
}

const hourBranchOrdinals: Record<ChronoCoordinate["hourBranch"], number> = {
  子时: 1,
  丑时: 2,
  寅时: 3,
  卯时: 4,
  辰时: 5,
  巳时: 6,
  午时: 7,
  未时: 8,
  申时: 9,
  酉时: 10,
  戌时: 11,
  亥时: 12,
};

export type MotherCodeLandingEngineResult = {
  input: ChronoCoordinate;
  digitSum: number;
  hourBranchOrdinal: number;
  fieldSeed: number;
  fieldRemainder: EightDivisionFieldMapping["remainder"];
  fieldMapping: EightDivisionFieldMapping;
  motherCodeDefinition: MotherCodeDefinition;
  motherCodeProfile: MotherCodeProfile;
  formulaLines: string[];
};

function sumDigits(value: number): number {
  return String(Math.abs(value))
    .split("")
    .reduce((total, digit) => total + Number(digit), 0);
}

export function runMotherCodeLandingEngine(input: ChronoCoordinate): MotherCodeLandingEngineResult {
  const digitSum = sumDigits(input.year) + sumDigits(input.month) + sumDigits(input.day);
  const hourBranchOrdinal = hourBranchOrdinals[input.hourBranch];
  const fieldSeed = digitSum + hourBranchOrdinal;
  const fieldMapping = getEightDivisionFieldMapping(fieldSeed);
  const motherCodeDefinition = getMotherCodeDefinitionByTrigram(fieldMapping.trigram);

  if (!motherCodeDefinition) {
    throw new Error(`Missing mother code definition for trigram ${fieldMapping.trigram}`);
  }

  return {
    input,
    digitSum,
    hourBranchOrdinal,
    fieldSeed,
    fieldRemainder: fieldMapping.remainder,
    fieldMapping,
    motherCodeDefinition,
    motherCodeProfile: toMotherCodeProfile(motherCodeDefinition),
    formulaLines: [
      "原始坐标 ChronoCoordinate",
      "→ 年月日数字和 + 时辰序号",
      "→ 卦以八除",
      `→ ${fieldSeed} mod 8 = ${fieldMapping.display}`,
      "→ 映射到 8 母码 registry",
      "→ 输出 MotherCodeProfile",
    ],
  };
}
