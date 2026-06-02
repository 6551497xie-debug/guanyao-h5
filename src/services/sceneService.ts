import { sceneSlices } from "../data/sceneSlices";
import type { GuanyaoSession, SceneSlice } from "../types";

const forceIdByForceKey: Record<string, string> = {
  "乾": "qian",
  "☰": "qian",
  qian: "qian",
  "坤": "kun",
  "☷": "kun",
  kun: "kun",
  "震": "zhen",
  "☳": "zhen",
  zhen: "zhen",
  "巽": "xun",
  "☴": "xun",
  xun: "xun",
  "坎": "kan",
  "☵": "kan",
  kan: "kan",
  "离": "li",
  "☲": "li",
  li: "li",
  "艮": "gen",
  "☶": "gen",
  gen: "gen",
  "兑": "dui",
  "☱": "dui",
  dui: "dui",
};

export function normalizeSceneForceId(forceKey?: string | null): string | null {
  if (!forceKey) {
    return null;
  }

  return forceIdByForceKey[forceKey] ?? forceKey.toLowerCase();
}

export function getSceneSlicesByForce(forceId: string): SceneSlice[] {
  const normalizedForceId = normalizeSceneForceId(forceId);
  const matchedSlices = sceneSlices.filter((item) => item.forceId === normalizedForceId);

  return matchedSlices.length > 0 ? matchedSlices : sceneSlices;
}

export function getSceneSliceById(id: string): SceneSlice | undefined {
  return sceneSlices.find((item) => item.id === id);
}

export function getDefaultSceneSlice(forceId?: string): SceneSlice {
  return getSceneSlicesByForce(forceId ?? "")[0] ?? sceneSlices[0];
}

export function pickSceneSlicesForForce(forceId: string, count = 12): SceneSlice[] {
  const normalizedForceId = normalizeSceneForceId(forceId);
  const primarySlices = sceneSlices.filter((item) => item.forceId === normalizedForceId);
  const fallbackSlices = sceneSlices.filter((item) => item.forceId !== normalizedForceId);
  const pickedSlices = [...primarySlices, ...fallbackSlices];

  return pickedSlices.slice(0, Math.max(1, count));
}

export function getSessionForceId(session: GuanyaoSession): string | null {
  return (
    normalizeSceneForceId(session.selectedForceId) ??
    normalizeSceneForceId(session.forceReading?.forceKey) ??
    normalizeSceneForceId(session.forceProfile?.forceKey) ??
    normalizeSceneForceId(session.selectedFragment?.forceMapping?.[0])
  );
}
