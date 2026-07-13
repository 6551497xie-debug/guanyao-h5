import type { ChronoProfile, GuanyaoSession, MotherCodeResult, SceneSeed, SceneSlice } from "../types";
import { buildYuanCodeResult, normalizeGuaFieldFromLegacy } from "./codeContractService";
import {
  clearPersistedSessionState,
  readPersistedSessionState,
  writePersistedSessionState,
} from "./guanyaoSessionPersistenceAdapter";
import { initializeTimeSandglassAfterChrono } from "./timeSandglassService";

const defaultSession: GuanyaoSession = {
  chronoProfile: null,
  chronoHash: null,
  chronoPrototypeCard: null,
  chronoCode: null,
  yuanCode: null,
  identityFragment: null,
  selectedForceId: null,
  selectedForceName: null,
  selectedSceneSeed: null,
  selectedSceneSlice: null,
  selectedSceneId: null,
  guaField: null,
  guaFieldResult: null,
  motherCode: null,
  motherCodeResult: null,
  currentMotherCode: null,
  autoYaoPath: [],
  interactiveYaoPath: [],
  sixthYaoChoice: null,
  finalChoiceCode: "",
  choiceHistory: [],
  timeSandglass: null,
  energyState: null,
};

export function getSession(): GuanyaoSession {
  const persistedSession = readPersistedSessionState<Partial<GuanyaoSession>>();
  return {
    ...defaultSession,
    ...persistedSession,
  };
}

export function updateSession(partial: Partial<GuanyaoSession>): GuanyaoSession {
  const nextSession = {
    ...getSession(),
    ...partial,
  };
  writePersistedSessionState(nextSession);

  return nextSession;
}

export function setSelectedSceneSlice(sceneSlice: SceneSlice): GuanyaoSession {
  return updateSession({
    selectedSceneSlice: sceneSlice,
    selectedSceneId: sceneSlice.id,
    realitySeed: sceneSlice,
    sceneText: sceneSlice.fixedLines.join("\n"),
  });
}

export function setSelectedSceneSeed(sceneSeed: SceneSeed): GuanyaoSession {
  const legacySceneSlice: SceneSlice = {
    id: sceneSeed.id,
    forceId: sceneSeed.yuanCodeKey,
    forceName: sceneSeed.pressureLayerLabel,
    title: sceneSeed.title,
    flashLine: sceneSeed.seedLine,
    fixedLines: [sceneSeed.realitySnapshot, sceneSeed.behaviorInertia],
    bodyReaction: sceneSeed.bodySignalHint ?? sceneSeed.behaviorInertia,
    behaviorInertia: sceneSeed.behaviorInertia,
    gravityHook: sceneSeed.gravityHook,
    tone: sceneSeed.pressureLayerId,
    intensity: sceneSeed.intensity,
  };

  return updateSession({
    selectedSceneSeed: sceneSeed,
    selectedSceneSlice: legacySceneSlice,
    selectedSceneId: sceneSeed.id,
    realitySeed: sceneSeed,
    sceneText: [sceneSeed.realitySnapshot, sceneSeed.behaviorInertia, sceneSeed.gravityHook]
      .filter(Boolean)
      .join("\n"),
  });
}

export function setChronoProfile(chronoProfile: ChronoProfile): GuanyaoSession {
  const yuanCode = buildYuanCodeResult(chronoProfile);
  const timeSandglass = initializeTimeSandglassAfterChrono(chronoProfile);

  return updateSession({
    chronoProfile,
    chronoHash: chronoProfile.chronoHash ?? null,
    chronoPrototypeCard: chronoProfile.chronoPrototypeCard ?? null,
    chronoCode: yuanCode,
    yuanCode,
    timeSandglass,
    energyState: timeSandglass,
  });
}

export function setMotherCodeResult(motherCode: MotherCodeResult): GuanyaoSession {
  const guaField = normalizeGuaFieldFromLegacy(motherCode);

  return updateSession({
    guaField,
    guaFieldResult: guaField,
    motherCode,
    motherCodeResult: motherCode,
    currentMotherCode: motherCode,
  });
}

export function resetSession(): GuanyaoSession {
  clearPersistedSessionState();
  return { ...defaultSession };
}
