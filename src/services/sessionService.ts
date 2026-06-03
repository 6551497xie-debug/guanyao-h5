import type { ChronoProfile, GuanyaoSession, SceneSlice } from "../types";

const SESSION_KEY = "guanyao_h5_session";

const defaultSession: GuanyaoSession = {
  chronoProfile: null,
  selectedForceId: null,
  selectedForceName: null,
  selectedSceneSlice: null,
  selectedSceneId: null,
  autoYaoPath: [],
  interactiveYaoPath: [],
  sixthYaoChoice: null,
  finalChoiceCode: "",
  choiceHistory: [],
};

function canUseStorage(): boolean {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

export function getSession(): GuanyaoSession {
  if (!canUseStorage()) {
    return { ...defaultSession };
  }

  try {
    const rawSession = window.localStorage.getItem(SESSION_KEY);
    if (!rawSession) {
      return { ...defaultSession };
    }

    return {
      ...defaultSession,
      ...(JSON.parse(rawSession) as Partial<GuanyaoSession>),
    };
  } catch {
    return { ...defaultSession };
  }
}

export function updateSession(partial: Partial<GuanyaoSession>): GuanyaoSession {
  const nextSession = {
    ...getSession(),
    ...partial,
  };

  if (canUseStorage()) {
    try {
      window.localStorage.setItem(SESSION_KEY, JSON.stringify(nextSession));
    } catch {
      return nextSession;
    }
  }

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

export function setChronoProfile(chronoProfile: ChronoProfile): GuanyaoSession {
  return updateSession({
    chronoProfile,
  });
}

export function resetSession(): GuanyaoSession {
  if (canUseStorage()) {
    try {
      window.localStorage.removeItem(SESSION_KEY);
    } catch {
      return { ...defaultSession };
    }
  }

  return { ...defaultSession };
}
