import { motherCodes } from "../data/motherCodes";
import type { GuanyaoSession, MotherCodeResult } from "../types";

const motherCodeFallbacks = motherCodes.filter(
  (motherCode) => motherCode.registryType === "MAIN_TRACK" || (motherCode.title && motherCode.shortSeal && motherCode.gravityField),
);

function stableIndex(input: string, length: number) {
  const hash = Array.from(input).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return hash % length;
}

export function buildMotherCodeResult(session: GuanyaoSession): MotherCodeResult {
  const yuanCode = session.yuanCode ?? session.chronoCode;
  const identityId = session.selectedFragment?.id;
  const sceneId = session.selectedSceneSlice?.id ?? session.selectedSceneId ?? session.realitySeed?.id;
  const forceId = session.selectedForceId ?? session.forceReading?.forceKey ?? session.forceProfile?.forceKey;
  const seed = [identityId, sceneId, forceId].filter(Boolean).join("|") || "guanyao-mother-code";
  const fallback = motherCodeFallbacks[stableIndex(seed, motherCodeFallbacks.length)];

  return {
    id: `mother_${fallback.code}_${stableIndex(seed, 10000).toString().padStart(4, "0")}`,
    code64: fallback.code,
    name: fallback.name,
    hexagramName: fallback.name,
    title: fallback.title ?? fallback.name,
    sourceYuanCodeId: yuanCode?.id,
    sourceIdentityId: identityId,
    sourceSceneId: sceneId,
    sourceForceId: forceId,
    personalityField: `${fallback.name}｜${fallback.title ?? fallback.name}`,
    shortSeal: fallback.shortSeal ?? fallback.recognitionLine ?? "本次人格惯性与现实压力已经形成母码压印。",
    fieldDescription: fallback.gravityField ?? fallback.coreConflict ?? fallback.track ?? "行为母型已经进入压印状态。",
    gravityField: fallback.gravityField ?? fallback.coreConflict ?? fallback.track ?? "行为母型已经进入压印状态。",
  };
}
