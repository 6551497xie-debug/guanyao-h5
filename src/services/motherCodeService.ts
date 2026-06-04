import type { GuanyaoSession, MotherCodeResult } from "../types";

const motherCodeFallbacks = [
  {
    code64: "043",
    name: "夬",
    title: "决口",
    shortSeal: "你的人格惯性与现实种子，正在把退让推到决口。",
    gravityField: "这不是结论，而是本次行为重力场的显影。接下来，系统会观察它如何在五爻中变形。",
  },
  {
    code64: "029",
    name: "坎",
    title: "低处",
    shortSeal: "你被推到更深的低处，开始看见自己反复回到同一种反应。",
    gravityField: "这片卦场承载的是压力逼近时的旧路径。六爻闭合后，才会压印成本次爻码卡。",
  },
  {
    code64: "052",
    name: "艮",
    title: "停住",
    shortSeal: "你最难的不是继续行动，而是在惯性要求你动的时候停住。",
    gravityField: "这片卦场正在收束人格映照与现实种子之间的拉扯。",
  },
  {
    code64: "021",
    name: "噬嗑",
    title: "硬骨",
    shortSeal: "真正的阻力不是外部压力，而是你迟迟没有咬开的那块硬骨。",
    gravityField: "这不是最终判词。它只是五爻推进前被照出的行为重力场。",
  },
] as const;

function stableIndex(input: string, length: number) {
  const hash = Array.from(input).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return hash % length;
}

export function buildMotherCodeResult(session: GuanyaoSession): MotherCodeResult {
  const identityId = session.selectedFragment?.id;
  const sceneId = session.selectedSceneSlice?.id ?? session.selectedSceneId ?? session.realitySeed?.id;
  const forceId = session.selectedForceId ?? session.forceReading?.forceKey ?? session.forceProfile?.forceKey;
  const seed = [identityId, sceneId, forceId].filter(Boolean).join("|") || "guanyao-mother-code";
  const fallback = motherCodeFallbacks[stableIndex(seed, motherCodeFallbacks.length)];

  return {
    id: `mother_${fallback.code64}_${stableIndex(seed, 10000).toString().padStart(4, "0")}`,
    code64: fallback.code64,
    name: fallback.name,
    title: fallback.title,
    sourceIdentityId: identityId,
    sourceSceneId: sceneId,
    sourceForceId: forceId,
    shortSeal: fallback.shortSeal,
    gravityField: fallback.gravityField,
  };
}
