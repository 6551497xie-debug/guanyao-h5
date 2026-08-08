import type { ChronoProfile, GuanyaoSession, MotherCodeResult, SceneSeed, SceneSlice } from "../types";
import type { GenesisStarBeastPresenceVisualRealization } from "../types/genesisStarBeastPresenceVisualRealization";
import type { LaunchLifeSourceSession } from "../types/launchLifeSourceSession";
import type { RealUserGenesisVisualSourceContext } from "../types/realUserGenesisVisualSourceContext";
import type { XinmaiGenesisBirthSourcePersistenceRepresentations } from "../types/xinmaiGenesisBirthSourceRecovery";
import type { RealityProductionHostProps } from "../types/realityProductionRouteEntry";
import {
  STARBEAST_RELATIONSHIP_NAME_MAX_CODE_POINTS,
  STARBEAST_RELATIONSHIP_NAMING_ASSET_KIND,
  STARBEAST_RELATIONSHIP_NAMING_ASSET_SCHEMA_VERSION,
  type StarBeastRelationshipNamingAsset,
  type StarBeastRelationshipNamingDeleteResult,
  type StarBeastRelationshipNamingMutationResult,
  type StarBeastRelationshipNamingReadResult,
} from "../types/starBeastRelationshipNamingAsset";
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
const STARBEAST_RELATIONSHIP_NAMING_ASSET_KEY =
  "starBeastRelationshipNamingAsset";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

const isLaunchLifeSourceSession = (
  value: unknown,
): value is LaunchLifeSourceSession =>
  isRecord(value) &&
  value.schemaVersion === "GUANYAO_LAUNCH_LIFE_SOURCE_SESSION_V1" &&
  value.source === "launch_life_source_session" &&
  value.sourceKind === "REAL_ENGINE_RESULT" &&
  typeof value.sourceReferenceId === "string" &&
  value.sourceReferenceId.trim().length > 0 &&
  isRecord(value.birthCoordinate) &&
  isRecord(value.starbeastDerivationResult) &&
  isRecord(value.motherCodeLandingResult) &&
  isRecord(value.originMotherResult);

const XINMAI_GENESIS_BIRTH_SOURCE_PERSISTENCE_BOUNDARY = Object.freeze({
  canonicalPrimary: true as const,
  originMirrorCorroborationOnly: true as const,
  conflictSafeWithheld: true as const,
  noBackfill: true as const,
  noMutation: true as const,
});

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

const removePersistedAsset = (key: string): void => {
  const session = readPersistedSessionState<Record<string, unknown>>();
  if (session === null || !(key in session)) return;
  const nextSession = { ...session };
  delete nextSession[key];
  writePersistedSessionState(nextSession);
};

const normalizeRelationshipName = (value: string): string | null => {
  const normalized = value.trim();
  if (
    normalized.length === 0 ||
    Array.from(normalized).length >
      STARBEAST_RELATIONSHIP_NAME_MAX_CODE_POINTS ||
    /[\u0000-\u001f\u007f]/u.test(normalized)
  ) {
    return null;
  }
  return normalized;
};

const isStarBeastRelationshipNamingAsset = (
  value: unknown,
): value is StarBeastRelationshipNamingAsset =>
  isRecord(value) &&
  value.schemaVersion ===
    STARBEAST_RELATIONSHIP_NAMING_ASSET_SCHEMA_VERSION &&
  value.assetKind === STARBEAST_RELATIONSHIP_NAMING_ASSET_KIND &&
  typeof value.sourceReferenceId === "string" &&
  value.sourceReferenceId.trim().length > 0 &&
  typeof value.starBeastIdentityReferenceId === "string" &&
  value.starBeastIdentityReferenceId.trim().length > 0 &&
  typeof value.mansionCoordinateReferenceId === "string" &&
  value.mansionCoordinateReferenceId.trim().length > 0 &&
  (value.nameState === "NAMED" || value.nameState === "CLEARED") &&
  (value.nameState === "NAMED"
    ? typeof value.relationshipName === "string" &&
      normalizeRelationshipName(value.relationshipName) ===
        value.relationshipName
    : value.relationshipName === null) &&
  typeof value.createdAt === "string" &&
  value.createdAt.trim().length > 0 &&
  typeof value.updatedAt === "string" &&
  value.updatedAt.trim().length > 0 &&
  typeof value.revision === "number" &&
  Number.isInteger(value.revision) &&
  value.revision > 0;

type RecognizedRelationshipIdentityReferences = Readonly<{
  sourceReferenceId: string;
  starBeastIdentityReferenceId: string;
  mansionCoordinateReferenceId: string;
}>;

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
  const representations =
    readPersistedLaunchLifeSourceRecoveryRepresentations();
  if (
    representations.status === "MATCHED" ||
    representations.status === "PRIMARY_ONLY"
  ) {
    return representations.primary;
  }
  if (representations.status === "ORIGIN_MIRROR_ONLY") {
    return representations.originMirror;
  }
  return null;
}

export function readPersistedLaunchLifeSourceRecoveryRepresentations():
  XinmaiGenesisBirthSourcePersistenceRepresentations {
  const primaryValue = readPersistedAsset(LIFE_SOURCE_SESSION_ASSET_KEY);
  const originMotherContext = readPersistedOriginMotherContext();
  const originMirrorValue =
    isRecord(originMotherContext) &&
    "lifeSourceSession" in originMotherContext
      ? originMotherContext.lifeSourceSession
      : null;
  const primary = isLaunchLifeSourceSession(primaryValue)
    ? primaryValue
    : null;
  const originMirror = isLaunchLifeSourceSession(originMirrorValue)
    ? originMirrorValue
    : null;
  const primaryPresent = primaryValue !== null;
  const originMirrorPresent = originMirrorValue !== null;

  let status: XinmaiGenesisBirthSourcePersistenceRepresentations["status"];
  if (primaryPresent && primary === null) {
    status = "INVALID_PRIMARY";
  } else if (originMirrorPresent && originMirror === null) {
    status = "INVALID_ORIGIN_MIRROR";
  } else if (primary === null && originMirror === null) {
    status = "NOT_FOUND";
  } else if (primary !== null && originMirror === null) {
    status = "PRIMARY_ONLY";
  } else if (primary === null && originMirror !== null) {
    status = "ORIGIN_MIRROR_ONLY";
  } else if (
    primary?.sourceReferenceId === originMirror?.sourceReferenceId
  ) {
    status = "MATCHED";
  } else {
    status = "CONFLICT";
  }

  return Object.freeze({
    status,
    primary,
    originMirror,
    primarySourceReferenceId: primary?.sourceReferenceId ?? null,
    originMirrorSourceReferenceId:
      originMirror?.sourceReferenceId ?? null,
    boundary: XINMAI_GENESIS_BIRTH_SOURCE_PERSISTENCE_BOUNDARY,
  });
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

const resolveRecognizedRelationshipIdentityReferences = (
  visualContinuityInput?: RealityProductionHostProps["visualContinuity"],
): RecognizedRelationshipIdentityReferences | null => {
  const lifeSourceSession = readPersistedLaunchLifeSourceSession();
  const presenceVisualRealization =
    readPersistedGenesisPresenceVisualRealization();
  const visualContinuity =
    visualContinuityInput ?? readPersistedGenesisVisualContinuity();
  if (
    visualContinuity === null ||
    (visualContinuityInput === undefined &&
      (lifeSourceSession === null ||
        presenceVisualRealization === null))
  ) {
    return null;
  }

  const consumerSource =
    visualContinuity.consumerSourceResult.consumerSource;
  if (
    consumerSource.sourceExperienceMode !== "REAL_USER_EXPERIENCE" ||
    consumerSource.sourceProvenance !== "REAL_USER_SESSION" ||
    consumerSource.sourceReferenceId !== visualContinuity.sourceReferenceId ||
    (lifeSourceSession !== null &&
      lifeSourceSession.sourceReferenceId !==
        visualContinuity.sourceReferenceId) ||
    (presenceVisualRealization !== null &&
      presenceVisualRealization.sourceReferenceId !==
        visualContinuity.sourceReferenceId)
  ) {
    return null;
  }

  const starBeastIdentityReferenceId =
    consumerSource.projectionBundle.personalRevealProjection
      .identityReferenceId;
  const mansionCoordinateReferenceId =
    consumerSource.projectionBundle
      .twentyEightMansionCoordinateProjection.birthMansion
      .coordinateReferenceId;
  if (
    starBeastIdentityReferenceId.trim().length === 0 ||
    mansionCoordinateReferenceId.trim().length === 0
  ) {
    return null;
  }

  return Object.freeze({
    sourceReferenceId: visualContinuity.sourceReferenceId,
    starBeastIdentityReferenceId,
    mansionCoordinateReferenceId,
  });
};

const relationshipAssetMatchesIdentity = (
  asset: StarBeastRelationshipNamingAsset,
  identityReferences: RecognizedRelationshipIdentityReferences,
): boolean =>
  asset.sourceReferenceId === identityReferences.sourceReferenceId &&
  asset.starBeastIdentityReferenceId ===
    identityReferences.starBeastIdentityReferenceId &&
  asset.mansionCoordinateReferenceId ===
    identityReferences.mansionCoordinateReferenceId;

export function readStarBeastRelationshipNamingAsset():
  StarBeastRelationshipNamingReadResult {
  const identityReferences =
    resolveRecognizedRelationshipIdentityReferences();
  if (identityReferences === null) {
    return Object.freeze({
      status: "UNAVAILABLE",
      reason: "RECOGNIZED_IDENTITY_REQUIRED",
      asset: null,
    });
  }

  const value = readPersistedAsset(
    STARBEAST_RELATIONSHIP_NAMING_ASSET_KEY,
  );
  if (value === null) {
    return Object.freeze({ status: "UNNAMED", asset: null });
  }
  if (!isStarBeastRelationshipNamingAsset(value)) {
    return Object.freeze({
      status: "UNAVAILABLE",
      reason: "ASSET_INVALID",
      asset: null,
    });
  }
  if (!relationshipAssetMatchesIdentity(value, identityReferences)) {
    return Object.freeze({
      status: "UNAVAILABLE",
      reason: "IDENTITY_REFERENCE_MISMATCH",
      asset: null,
    });
  }
  return value.nameState === "NAMED"
    ? Object.freeze({ status: "AVAILABLE", asset: value })
    : Object.freeze({ status: "CLEARED", asset: value });
}

const persistRelationshipNamingAsset = (
  asset: StarBeastRelationshipNamingAsset,
): StarBeastRelationshipNamingMutationResult => {
  writePersistedAssets({
    [STARBEAST_RELATIONSHIP_NAMING_ASSET_KEY]: asset,
  });
  const stored = readPersistedAsset(
    STARBEAST_RELATIONSHIP_NAMING_ASSET_KEY,
  );
  const persisted =
    isStarBeastRelationshipNamingAsset(stored) &&
    relationshipAssetMatchesIdentity(stored, asset) &&
    stored.nameState === asset.nameState &&
    stored.relationshipName === asset.relationshipName &&
    stored.revision === asset.revision;
  return Object.freeze({
    status: "READY",
    asset,
    persistence: persisted ? "PERSISTED" : "CURRENT_CYCLE_ONLY",
  });
};

export function createStarBeastRelationshipNamingAsset(input: Readonly<{
  relationshipName: string;
  visualContinuity?: RealityProductionHostProps["visualContinuity"];
}>): StarBeastRelationshipNamingMutationResult {
  const relationshipName = normalizeRelationshipName(
    input.relationshipName,
  );
  if (relationshipName === null) {
    return Object.freeze({
      status: "BLOCKED",
      reason: "RELATIONSHIP_NAME_INVALID",
      asset: null,
    });
  }
  const identityReferences =
    resolveRecognizedRelationshipIdentityReferences(
      input.visualContinuity,
    );
  if (identityReferences === null) {
    return Object.freeze({
      status: "BLOCKED",
      reason: "RECOGNIZED_IDENTITY_REQUIRED",
      asset: null,
    });
  }

  const value = readPersistedAsset(
    STARBEAST_RELATIONSHIP_NAMING_ASSET_KEY,
  );
  if (value !== null && !isStarBeastRelationshipNamingAsset(value)) {
    return Object.freeze({
      status: "BLOCKED",
      reason: "ASSET_INVALID",
      asset: null,
    });
  }
  if (
    value !== null &&
    !relationshipAssetMatchesIdentity(value, identityReferences)
  ) {
    return Object.freeze({
      status: "BLOCKED",
      reason: "IDENTITY_REFERENCE_MISMATCH",
      asset: null,
    });
  }
  if (value?.nameState === "NAMED") {
    return Object.freeze({
      status: "BLOCKED",
      reason: "RELATIONSHIP_NAME_ALREADY_EXISTS",
      asset: null,
    });
  }

  const now = new Date().toISOString();
  return persistRelationshipNamingAsset(
    Object.freeze({
      schemaVersion:
        STARBEAST_RELATIONSHIP_NAMING_ASSET_SCHEMA_VERSION,
      assetKind: STARBEAST_RELATIONSHIP_NAMING_ASSET_KIND,
      ...identityReferences,
      nameState: "NAMED",
      relationshipName,
      createdAt: value?.createdAt ?? now,
      updatedAt: now,
      revision: (value?.revision ?? 0) + 1,
    }),
  );
}

export function renameStarBeastRelationshipNamingAsset(input: Readonly<{
  relationshipName: string;
}>): StarBeastRelationshipNamingMutationResult {
  const relationshipName = normalizeRelationshipName(
    input.relationshipName,
  );
  if (relationshipName === null) {
    return Object.freeze({
      status: "BLOCKED",
      reason: "RELATIONSHIP_NAME_INVALID",
      asset: null,
    });
  }
  const current = readStarBeastRelationshipNamingAsset();
  if (current.status !== "AVAILABLE") {
    return Object.freeze({
      status: "BLOCKED",
      reason:
        current.status === "UNAVAILABLE"
          ? current.reason
          : "RELATIONSHIP_NAME_REQUIRED",
      asset: null,
    });
  }
  return persistRelationshipNamingAsset(
    Object.freeze({
      ...current.asset,
      relationshipName,
      updatedAt: new Date().toISOString(),
      revision: current.asset.revision + 1,
    }),
  );
}

export function clearStarBeastRelationshipNamingAsset():
  StarBeastRelationshipNamingMutationResult {
  const current = readStarBeastRelationshipNamingAsset();
  if (current.status === "UNAVAILABLE") {
    return Object.freeze({
      status: "BLOCKED",
      reason: current.reason,
      asset: null,
    });
  }
  if (current.status === "UNNAMED") {
    return Object.freeze({
      status: "BLOCKED",
      reason: "RELATIONSHIP_NAME_REQUIRED",
      asset: null,
    });
  }
  if (current.status === "CLEARED") {
    return Object.freeze({
      status: "READY",
      asset: current.asset,
      persistence: "PERSISTED",
    });
  }
  return persistRelationshipNamingAsset(
    Object.freeze({
      ...current.asset,
      nameState: "CLEARED",
      relationshipName: null,
      updatedAt: new Date().toISOString(),
      revision: current.asset.revision + 1,
    }),
  );
}

export function deleteStarBeastRelationshipNamingAsset():
  StarBeastRelationshipNamingDeleteResult {
  const current = readStarBeastRelationshipNamingAsset();
  if (current.status === "UNNAMED") {
    return Object.freeze({
      status: "READY",
      outcome: "ALREADY_UNNAMED",
    });
  }
  if (current.status === "UNAVAILABLE") {
    return Object.freeze({
      status: "READY",
      outcome: "DELETE_UNCONFIRMED",
    });
  }
  removePersistedAsset(STARBEAST_RELATIONSHIP_NAMING_ASSET_KEY);
  const afterDelete = readStarBeastRelationshipNamingAsset();
  return Object.freeze({
    status: "READY",
    outcome:
      afterDelete.status === "UNNAMED"
        ? "DELETED"
        : "DELETE_UNCONFIRMED",
  });
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

export function restorePersistedRealUserGenesisVisualSourceContext(
  expectedSourceReferenceId: string | null = null,
): RealUserGenesisVisualSourceContext | null {
  const persistedSession = readPersistedLaunchLifeSourceSession();
  const activeContext = readRealUserGenesisVisualSourceContext();
  if (
    activeContext !== null &&
    persistedSession !== null &&
    activeContext.sourceReferenceId === persistedSession.sourceReferenceId &&
    (expectedSourceReferenceId === null ||
      activeContext.sourceReferenceId === expectedSourceReferenceId)
  ) {
    return activeContext;
  }
  if (activeContext !== null) return null;
  if (persistedSession === null) return null;
  if (
    expectedSourceReferenceId !== null &&
    persistedSession.sourceReferenceId !== expectedSourceReferenceId
  ) {
    return null;
  }

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
  const realUserContext = readRealUserGenesisVisualSourceContext();
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
