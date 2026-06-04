import { sceneSeeds } from "../data/sceneSeeds";
import type { IdentityFragment, IdentityLifeStageId, SceneSeed } from "../types";

export type SceneSeedGroupMatchType = "identityFragment" | "yuanCodeLifeStage" | "yuanCode" | "fallback";

export type SceneSeedGroupParams = {
  yuanCodeKey?: IdentityFragment["yuanCodeKey"] | string | null;
  lifeStageId?: IdentityLifeStageId | string | null;
  identityFragmentId?: string | null;
};

export type SceneSeedGroupResult = {
  seedGroupId: string;
  pressureLayerId: string;
  pressureLayerLabel: string;
  seeds: SceneSeed[];
  matchedBy: SceneSeedGroupMatchType;
};

export const defaultSceneSeedGroupId = "SEED-GROUP-KUN-32-42-FAMILY-001";

const requiredSeedIndexes = [1, 2, 3];

const sortBySeedIndex = (seeds: SceneSeed[]) => [...seeds].sort((a, b) => a.seedIndex - b.seedIndex);

const hasCompleteSeedIndexes = (seeds: SceneSeed[]) => {
  const indexes = new Set(seeds.map((seed) => seed.seedIndex));
  return requiredSeedIndexes.every((index) => indexes.has(index as SceneSeed["seedIndex"]));
};

const normalizeSeedGroup = (seeds: SceneSeed[]) => {
  if (seeds.length < 3) {
    return null;
  }

  const orderedSeeds = sortBySeedIndex(seeds).slice(0, 3);
  const seedGroupIds = new Set(orderedSeeds.map((seed) => seed.seedGroupId));
  const pressureLayerIds = new Set(orderedSeeds.map((seed) => seed.pressureLayerId));

  if (orderedSeeds.length !== 3 || seedGroupIds.size !== 1 || pressureLayerIds.size !== 1) {
    return null;
  }

  if (!hasCompleteSeedIndexes(orderedSeeds)) {
    return null;
  }

  return orderedSeeds;
};

const pickFirstValidSeedGroup = (candidates: SceneSeed[]) => {
  const groupIds = [...new Set(candidates.map((seed) => seed.seedGroupId))];

  for (const groupId of groupIds) {
    const normalizedGroup = normalizeSeedGroup(candidates.filter((seed) => seed.seedGroupId === groupId));
    if (normalizedGroup) {
      return normalizedGroup;
    }
  }

  return null;
};

const createResult = (seeds: SceneSeed[], matchedBy: SceneSeedGroupMatchType): SceneSeedGroupResult => {
  const [firstSeed] = seeds;

  return {
    seedGroupId: firstSeed.seedGroupId,
    pressureLayerId: firstSeed.pressureLayerId,
    pressureLayerLabel: firstSeed.pressureLayerLabel,
    seeds,
    matchedBy,
  };
};

const getFallbackSeedGroup = () => {
  const fallbackSeeds = normalizeSeedGroup(
    sceneSeeds.filter((seed) => seed.seedGroupId === defaultSceneSeedGroupId),
  );

  if (fallbackSeeds) {
    return fallbackSeeds;
  }

  const firstValidGroup = pickFirstValidSeedGroup(sceneSeeds);
  if (firstValidGroup) {
    return firstValidGroup;
  }

  throw new Error("SceneSeed data requires at least one complete group of three seeds.");
};

export function getSceneSeedGroup(params: SceneSeedGroupParams = {}): SceneSeedGroupResult {
  const yuanCodeKey = params.yuanCodeKey ?? undefined;
  const lifeStageId = params.lifeStageId ?? undefined;
  const identityFragmentId = params.identityFragmentId ?? undefined;

  if (identityFragmentId) {
    const identityFragmentGroup = pickFirstValidSeedGroup(
      sceneSeeds.filter((seed) => seed.sourceIdentityFragmentId === identityFragmentId),
    );

    if (identityFragmentGroup) {
      return createResult(identityFragmentGroup, "identityFragment");
    }
  }

  if (yuanCodeKey && lifeStageId) {
    const yuanCodeLifeStageGroup = pickFirstValidSeedGroup(
      sceneSeeds.filter((seed) => seed.yuanCodeKey === yuanCodeKey && seed.lifeStageId === lifeStageId),
    );

    if (yuanCodeLifeStageGroup) {
      return createResult(yuanCodeLifeStageGroup, "yuanCodeLifeStage");
    }
  }

  if (yuanCodeKey) {
    const yuanCodeGroup = pickFirstValidSeedGroup(sceneSeeds.filter((seed) => seed.yuanCodeKey === yuanCodeKey));

    if (yuanCodeGroup) {
      return createResult(yuanCodeGroup, "yuanCode");
    }
  }

  console.warn("SceneSeed fallback: using the stable default seed group.");
  return createResult(getFallbackSeedGroup(), "fallback");
}
