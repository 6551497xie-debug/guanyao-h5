import { getMotherCodeDefinitionByTrigram, toMotherCodeProfile } from "../data/guanyaoMotherCodeRegistry";
import type { MotherCodeDefinition, MotherCodeProfile, Trigram } from "../types/guanyaoCausalEngine";

export type GeoDirectionSymbol = "青龙" | "朱雀" | "白虎" | "玄武";

export type GeoLayerInput = {
  province: string;
  city: string;
};

export type ChronoLayerInput = {
  year: number;
  month: number;
  day: number;
  periodIndex: number;
};

export type StarbeastLayerInput = {
  nodeCount: number;
  primaryNodeIndex: number;
  originLightTrace: string;
};

export type MotherSeed = {
  direction: GeoDirectionSymbol;
  timePhase: string;
  starResidue: string;
};

export type GeoChronoMotherFusionResult = {
  mother_seed: MotherSeed;
  geo: {
    province: string;
    city: string;
    symbol: GeoDirectionSymbol;
    role: "directional bias";
  };
  chrono: {
    lockPoint: string;
    timePhaseIndex: number;
    calibrationIndex: number;
    role: "temporal axis";
  };
  starbeast: {
    primaryNode: string;
    originLightTrace: string;
    role: "identity residue";
  };
  mother: {
    trigram: Trigram;
    definition: MotherCodeDefinition;
    profile: MotherCodeProfile;
  };
};

const directionOrder: GeoDirectionSymbol[] = ["青龙", "朱雀", "白虎", "玄武"];
const trigramOrder: Trigram[] = ["乾", "兑", "离", "震", "巽", "坎", "艮", "坤"];

const southHints = ["广东", "广西", "海南", "福建", "香港", "澳门", "广州", "深圳", "珠海", "南宁", "海口", "福州", "厦门"];
const eastHints = ["上海", "江苏", "浙江", "安徽", "山东", "南京", "杭州", "苏州", "宁波", "青岛"];
const westHints = ["四川", "重庆", "云南", "贵州", "陕西", "甘肃", "新疆", "成都", "昆明", "西安", "兰州"];

function resolveGeoSymbol(input: GeoLayerInput): GeoDirectionSymbol {
  const text = `${input.province}${input.city}`;
  if (southHints.some((hint) => text.includes(hint))) return "朱雀";
  if (eastHints.some((hint) => text.includes(hint))) return "青龙";
  if (westHints.some((hint) => text.includes(hint))) return "白虎";
  return "玄武";
}

function resolveChronoLockPoint(input: ChronoLayerInput) {
  const timePhaseIndex = Math.abs(input.periodIndex) % 7;
  const calibrationIndex = Math.abs(input.year + input.month * 2 + input.day * 3 + input.periodIndex) % 21;
  return {
    lockPoint: `X${timePhaseIndex + 1}-Y${calibrationIndex + 1}`,
    timePhaseIndex,
    calibrationIndex,
  };
}

function resolveStarbeastResidue(input: StarbeastLayerInput) {
  const count = Math.max(1, input.nodeCount);
  const index = ((input.primaryNodeIndex % count) + count) % count;
  return {
    primaryNode: `28宿节点-${String(index + 1).padStart(2, "0")}`,
    index,
  };
}

export function runGeoChronoMotherFusionEngine(input: {
  geo: GeoLayerInput;
  chrono: ChronoLayerInput;
  starbeast: StarbeastLayerInput;
}): GeoChronoMotherFusionResult {
  const symbol = resolveGeoSymbol(input.geo);
  const chrono = resolveChronoLockPoint(input.chrono);
  const starbeast = resolveStarbeastResidue(input.starbeast);
  const directionIndex = directionOrder.indexOf(symbol);
  const fusionIndex = (directionIndex * 2 + chrono.timePhaseIndex + chrono.calibrationIndex + starbeast.index) % trigramOrder.length;
  const trigram = trigramOrder[fusionIndex] ?? "乾";
  const definition = getMotherCodeDefinitionByTrigram(trigram);

  if (!definition) {
    throw new Error(`Missing mother code definition for fusion trigram ${trigram}`);
  }

  return {
    mother_seed: {
      direction: symbol,
      timePhase: chrono.lockPoint,
      starResidue: starbeast.primaryNode,
    },
    geo: {
      province: input.geo.province,
      city: input.geo.city,
      symbol,
      role: "directional bias",
    },
    chrono: {
      ...chrono,
      role: "temporal axis",
    },
    starbeast: {
      primaryNode: starbeast.primaryNode,
      originLightTrace: input.starbeast.originLightTrace,
      role: "identity residue",
    },
    mother: {
      trigram,
      definition,
      profile: toMotherCodeProfile(definition),
    },
  };
}
