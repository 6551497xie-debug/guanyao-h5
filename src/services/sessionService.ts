import type { ChronoProfile, GuanyaoSession, MotherCodeResult, SceneSeed, SceneSlice } from "../types";
import type { GenesisStarBeastPresenceVisualRealization } from "../types/genesisStarBeastPresenceVisualRealization";
import type { LaunchLifeSourceSession } from "../types/launchLifeSourceSession";
import type { RealUserGenesisVisualSourceContext } from "../types/realUserGenesisVisualSourceContext";
import type { RealityProductionHostProps } from "../types/realityProductionRouteEntry";
import { buildYuanCodeResult, normalizeGuaFieldFromLegacy } from "./codeContractService";
import {
  authorizeGenesisProductionRoute,
  GENESIS_PRODUCTION_ROUTE_TARGET,
} from "./genesisProductionRouteAuthorization";
import {
  advanceGenesisProductionRuntime,
  initializeGenesisProductionRuntime,
} from "./genesisProductionRuntimeConsumer";
import { bridgeGenesisProductionRuntimeToVisualCalibration } from "./genesisProductionVisualCalibrationBridge";
import { calibrateGenesisFourSymbolDirectionField } from "./genesisFourSymbolDirectionFieldVisualCalibration";
import { calibrateGenesisLifeArchetypeForceCondensation } from "./genesisLifeArchetypeForceCondensationVisualCalibration";
import { createLaunchLifeSourceSession } from "./launchLifeSourceSession";
import { resolveLaunchLifeVisualSource } from "./launchLifeVisualSourceResolver";
import { resolveRealGenesisVisualConsumerSource } from "./realGenesisVisualConsumerSource";
import {
  activateRealUserGenesisVisualSourceContext,
  readRealUserGenesisVisualSourceContext,
} from "./realUserGenesisVisualSourceContext";
import {
  clearPersistedSessionState,
  readPersistedSessionState,
  writePersistedSessionState,
} from "./guanyaoSessionPersistenceAdapter";
import {
  readPersistedOriginMotherContext,
  writeOriginMotherContext,
} from "./guanyaoOriginMotherContextPersistenceAdapter";
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

const LIFE_SOURCE_SESSION_ASSET_KEY = "launchLifeSourceSession";
const GENESIS_VISUAL_CONTINUITY_ASSET_KEY = "genesisVisualContinuity";
const GENESIS_PRESENCE_REALIZATION_ASSET_KEY =
  "genesisPresenceVisualRealization";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

const readPersistedAsset = (key: string): unknown => {
  const session = readPersistedSessionState<Record<string, unknown>>();
  return session?.[key] ?? null;
};

const writePersistedAssets = (
  assets: Readonly<Record<string, unknown>>,
): void => {
  const session =
    readPersistedSessionState<Record<string, unknown>>() ?? defaultSession;
  writePersistedSessionState({
    ...session,
    ...assets,
  });
};

export function persistLaunchLifeSourceSession(
  lifeSourceSession: LaunchLifeSourceSession,
): void {
  writePersistedAssets({
    [LIFE_SOURCE_SESSION_ASSET_KEY]: lifeSourceSession,
  });
  if (
    readPersistedLaunchLifeSourceSession()?.sourceReferenceId !==
    lifeSourceSession.sourceReferenceId
  ) {
    console.warn(
      "[PlayerLifeIdentity] life source session could not be restored",
    );
  }
}

export function readPersistedLaunchLifeSourceSession():
  LaunchLifeSourceSession | null {
  const sessionValue = readPersistedAsset(LIFE_SOURCE_SESSION_ASSET_KEY);
  const originMotherContext = readPersistedOriginMotherContext();
  const originLifeSourceSession =
    isRecord(originMotherContext) &&
    "lifeSourceSession" in originMotherContext
      ? originMotherContext.lifeSourceSession
      : null;
  const value = sessionValue ?? originLifeSourceSession;
  if (
    !isRecord(value) ||
    value.schemaVersion !== "GUANYAO_LAUNCH_LIFE_SOURCE_SESSION_V1" ||
    value.source !== "launch_life_source_session" ||
    value.sourceKind !== "REAL_ENGINE_RESULT" ||
    typeof value.sourceReferenceId !== "string" ||
    value.sourceReferenceId.trim().length === 0 ||
    !isRecord(value.birthCoordinate) ||
    !isRecord(value.starbeastDerivationResult) ||
    !isRecord(value.motherCodeLandingResult) ||
    !isRecord(value.originMotherResult)
  ) {
    return null;
  }
  return value as LaunchLifeSourceSession;
}

export function persistRecognizedGenesisLifeAssets(input: Readonly<{
  visualContinuity: RealityProductionHostProps["visualContinuity"];
  presenceVisualRealization: GenesisStarBeastPresenceVisualRealization;
}>): void {
  const realUserContext = readRealUserGenesisVisualSourceContext();
  if (
    realUserContext === null ||
    input.visualContinuity.sourceReferenceId !==
      input.presenceVisualRealization.sourceReferenceId ||
    input.visualContinuity.sourceReferenceId !==
      realUserContext.sourceReferenceId ||
    input.presenceVisualRealization.visualPresenceState !== "RECOGNIZED"
  ) {
    return;
  }
  writePersistedAssets({
    [LIFE_SOURCE_SESSION_ASSET_KEY]: realUserContext.lifeSourceSession,
    [GENESIS_VISUAL_CONTINUITY_ASSET_KEY]: null,
    [GENESIS_PRESENCE_REALIZATION_ASSET_KEY]:
      input.presenceVisualRealization,
  });
  const originMotherContext = readPersistedOriginMotherContext();
  writeOriginMotherContext({
    ...(isRecord(originMotherContext) ? originMotherContext : {}),
    lifeSourceSession: realUserContext.lifeSourceSession,
  });
  if (
    readPersistedLaunchLifeSourceSession()?.sourceReferenceId !==
      realUserContext.sourceReferenceId ||
    readPersistedGenesisPresenceVisualRealization()?.sourceReferenceId !==
      input.presenceVisualRealization.sourceReferenceId
  ) {
    console.warn(
      "[PlayerLifeIdentity] recognized life identity could not be restored",
    );
  }
}

export function readPersistedGenesisVisualContinuity():
  RealityProductionHostProps["visualContinuity"] | null {
  const value = readPersistedAsset(GENESIS_VISUAL_CONTINUITY_ASSET_KEY);
  if (
    isRecord(value) &&
    typeof value.sourceReferenceId === "string" &&
    value.sourceReferenceId.trim().length > 0 &&
    isRecord(value.consumerSourceResult) &&
    isRecord(value.visualCalibrationBundle) &&
    isRecord(value.fourSymbolDirectionFieldVisualCalibration) &&
    isRecord(value.lifeArchetypeForceCondensationVisualCalibration)
  ) {
    return value as RealityProductionHostProps["visualContinuity"];
  }
  return resolvePersistedGenesisVisualContinuity();
}

export function readPersistedGenesisPresenceVisualRealization():
  GenesisStarBeastPresenceVisualRealization | null {
  const value = readPersistedAsset(GENESIS_PRESENCE_REALIZATION_ASSET_KEY);
  if (
    !isRecord(value) ||
    value.visualPresenceState !== "RECOGNIZED" ||
    value.sourceProvenance !== "REAL_USER_SESSION" ||
    typeof value.sourceReferenceId !== "string" ||
    value.sourceReferenceId.trim().length === 0
  ) {
    return null;
  }
  return value as GenesisStarBeastPresenceVisualRealization;
}

export function hasPersistedRecognizedLifeIdentity(): boolean {
  const lifeSourceSession = readPersistedLaunchLifeSourceSession();
  const visualContinuity = readPersistedGenesisVisualContinuity();
  const presenceVisualRealization =
    readPersistedGenesisPresenceVisualRealization();
  return Boolean(
    lifeSourceSession &&
      visualContinuity &&
      presenceVisualRealization &&
      lifeSourceSession.sourceReferenceId ===
        visualContinuity.sourceReferenceId &&
      lifeSourceSession.sourceReferenceId ===
        presenceVisualRealization.sourceReferenceId,
  );
}

export function restorePersistedRealUserGenesisVisualSourceContext():
  RealUserGenesisVisualSourceContext | null {
  const activeContext = readRealUserGenesisVisualSourceContext();
  if (activeContext !== null) return activeContext;

  const persistedSession = readPersistedLaunchLifeSourceSession();
  if (persistedSession === null) return null;

  const restoredMotherCodeLandingResult = Object.freeze({
    ...persistedSession.motherCodeLandingResult,
    trigramLanding: Object.freeze({
      ...persistedSession.motherCodeLandingResult.trigramLanding,
      input: persistedSession.motherCodeLandingResult.input,
      fieldMapping:
        persistedSession.motherCodeLandingResult.fieldMapping,
    }),
  });
  const sessionResult = createLaunchLifeSourceSession({
    sourceReferenceId: persistedSession.sourceReferenceId,
    birthCoordinate: persistedSession.birthCoordinate,
    starbeastDerivationResult:
      persistedSession.starbeastDerivationResult,
    motherCodeLandingResult: restoredMotherCodeLandingResult,
    originMotherResult: persistedSession.originMotherResult,
  });
  if (sessionResult.status !== "AVAILABLE") {
    console.warn(
      "[PlayerLifeIdentity] persisted life source normalization blocked",
      sessionResult.reason,
    );
    return null;
  }

  const visualSourceResult = resolveLaunchLifeVisualSource(
    sessionResult.session,
  );
  if (visualSourceResult.status !== "AVAILABLE") {
    console.warn(
      "[PlayerLifeIdentity] persisted visual source resolution blocked",
      visualSourceResult.reason,
    );
    return null;
  }

  const activationResult = activateRealUserGenesisVisualSourceContext({
    lifeSourceSession: sessionResult.session,
    visualSourceAdapterInput: visualSourceResult.input,
    visualSource: visualSourceResult.visualSource,
  });
  if (activationResult.status !== "AVAILABLE") {
    console.warn(
      "[PlayerLifeIdentity] persisted visual context activation blocked",
      activationResult.reason,
    );
  }
  return activationResult.status === "AVAILABLE"
    ? activationResult.context
    : null;
}

function resolvePersistedGenesisVisualContinuity():
  RealityProductionHostProps["visualContinuity"] | null {
  const presenceVisualRealization =
    readPersistedGenesisPresenceVisualRealization();
  const realUserContext =
    restorePersistedRealUserGenesisVisualSourceContext();
  if (
    presenceVisualRealization === null ||
    realUserContext === null ||
    presenceVisualRealization.sourceReferenceId !==
      realUserContext.sourceReferenceId
  ) {
    return null;
  }

  const routeAuthorization = authorizeGenesisProductionRoute({
    routeTarget: GENESIS_PRODUCTION_ROUTE_TARGET,
    sourceReferenceId: realUserContext.sourceReferenceId,
  });
  if (routeAuthorization.status !== "READY") return null;

  let runtimeResult = initializeGenesisProductionRuntime({
    routeAuthorization,
  });
  for (let stageIndex = 0; stageIndex < 8; stageIndex += 1) {
    if (
      runtimeResult.status !== "READY" ||
      runtimeResult.session.currentStage === "COMPLETION"
    ) {
      break;
    }
    runtimeResult = advanceGenesisProductionRuntime({
      session: runtimeResult.session,
      trigger:
        runtimeResult.session.currentStage === "TIME_RESONANCE"
          ? "TIME_DELIVERY"
          : "AUTO_ADVANCE",
    });
  }
  if (
    runtimeResult.status !== "READY" ||
    runtimeResult.session.currentStage !== "COMPLETION"
  ) {
    return null;
  }

  const consumerSourceResult = resolveRealGenesisVisualConsumerSource();
  const visualCalibrationResult =
    bridgeGenesisProductionRuntimeToVisualCalibration(
      runtimeResult.session,
    );
  if (
    consumerSourceResult.status !== "READY" ||
    visualCalibrationResult.status !== "READY"
  ) {
    return null;
  }

  const directionFieldCalibrationResult =
    calibrateGenesisFourSymbolDirectionField({
      lifeDirectionProjection:
        consumerSourceResult.consumerSource.projectionBundle
          .fourSymbolLifeDirectionProjection,
      activeVisualLayer:
        visualCalibrationResult.bundle.genesisVisualRealization
          .activeVisualLayer,
    });
  if (directionFieldCalibrationResult.status !== "AVAILABLE") {
    return null;
  }

  const archetypeForceCalibrationResult =
    calibrateGenesisLifeArchetypeForceCondensation({
      lifeArchetypeProjection:
        consumerSourceResult.consumerSource.projectionBundle
          .lifeArchetypeProjection,
      directionFieldCalibration:
        directionFieldCalibrationResult.calibration,
      activeVisualLayer:
        visualCalibrationResult.bundle.genesisVisualRealization
          .activeVisualLayer,
    });
  if (archetypeForceCalibrationResult.status !== "AVAILABLE") {
    return null;
  }

  return Object.freeze({
    sourceReferenceId: realUserContext.sourceReferenceId,
    consumerSourceResult,
    visualCalibrationBundle: visualCalibrationResult.bundle,
    fourSymbolDirectionFieldVisualCalibration:
      directionFieldCalibrationResult.calibration,
    lifeArchetypeForceCondensationVisualCalibration:
      archetypeForceCalibrationResult.calibration,
  });
}

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
