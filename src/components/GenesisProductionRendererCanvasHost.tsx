import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createXinmaiContinuousSceneGenesisRendererAdapter } from "../renderers/xinmaiContinuousSceneRendererAdapter";
import { createIsolatedWebGLPrototypeRenderPlanReference } from "../services/isolatedWebGLPrototypeRenderPlanReference";
import {
  useXinmaiContinuousScenePresentation,
} from "./XinmaiContinuousSceneHostContext";
import type {
  GenesisProductionCanvasHostBoundary,
  GenesisProductionCanvasHostState,
  GenesisProductionRendererCanvasHostProps,
} from "../types/genesisProductionExperiencePage";
import type { GenesisWebGLRendererCoreFallback } from "../types/genesisWebGLRendererCore";
import type { LifeWhisperSurfaceVisualResponseOutcome } from "../types/xinmaiLifeWhisperRelationship";
import {
  XINMAI_CONTINUOUS_SCENE_PRESENTATION_VERSION,
} from "../types/xinmaiContinuousScenePresentation";

type LifeWhisperSurfaceVisualResponseOutcomeInput =
  LifeWhisperSurfaceVisualResponseOutcome extends infer Outcome
    ? Outcome extends LifeWhisperSurfaceVisualResponseOutcome
      ? Omit<Outcome, "sourceReferenceId">
      : never
    : never;

const isDevelopmentBrowserOverrideEnabled = (name: string): boolean => {
  if (!import.meta.env.DEV) {
    return false;
  }
  if (new URLSearchParams(window.location.search).get(name) === "1") {
    return true;
  }
  const initialNavigationUrl =
    (
      window.performance.getEntriesByType(
        "navigation",
      )[0] as PerformanceNavigationTiming | undefined
    )?.name ?? "";
  return (
    initialNavigationUrl.length > 0 &&
    new URL(initialNavigationUrl).searchParams.get(name) === "1"
  );
};

export const GENESIS_PRODUCTION_CANVAS_HOST_BOUNDARY:
  GenesisProductionCanvasHostBoundary = Object.freeze({
    productionCanvasHostOnly: true,
    authorizedRouteInputOnly: true,
    realUserConsumerSourceOnly: true,
    productionRendererHostOnly: true,
    manualFrameDriverOnly: true,
    rendererLifecycleOwned: true,
    contextLossHandledByRendererCore: true,
    noFixtureSource: true,
    noPrototypeAuthorization: true,
    noEngineInvocation: true,
    noRendererCoreInvocation: true,
    noRenderPlanMutation: true,
    noProjectionMutation: true,
    noVisualCalibrationMutation: true,
    noTimelineMutation: true,
    noRouteRegistration: true,
    noNavigationMutation: true,
    noStorageWrite: true,
  });

export function GenesisProductionRendererCanvasHost({
  routeAuthorization,
  consumerSourceResult,
  visualCalibrationBundle,
  fourSymbolDirectionFieldVisualCalibration,
  lifeArchetypeForceCondensationVisualCalibration,
  lifeOriginDiscoveryPhase,
  lifeWhisperRelationshipVisualFact,
  onLifeWhisperVisualResponseOutcome,
  onLifeOriginDiscoveryRequest,
  onStateChange,
}: GenesisProductionRendererCanvasHostProps) {
  const [nativeReducedMotion, setNativeReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const reducedMotionRequested =
    nativeReducedMotion ||
    isDevelopmentBrowserOverrideEnabled("__xinmaiReducedMotion");
  const rendererFailureRequested =
    isDevelopmentBrowserOverrideEnabled("__xinmaiRendererFailure");
  const lifeWhisperRelationshipVisualFactRef = useRef(
    lifeWhisperRelationshipVisualFact,
  );
  lifeWhisperRelationshipVisualFactRef.current =
    lifeWhisperRelationshipVisualFact;
  const readLifeWhisperRelationshipVisualFact = useCallback(
    () => lifeWhisperRelationshipVisualFactRef.current,
    [],
  );
  const onLifeWhisperVisualResponseOutcomeRef = useRef(
    onLifeWhisperVisualResponseOutcome,
  );
  onLifeWhisperVisualResponseOutcomeRef.current =
    onLifeWhisperVisualResponseOutcome;
  const lastDeliveredLifeWhisperOutcomeKeyRef = useRef<string | null>(null);
  const emitLifeWhisperVisualResponseOutcome = useCallback(
    (outcome: LifeWhisperSurfaceVisualResponseOutcomeInput) => {
      const outcomeKey =
        `${consumerSourceResult.consumerSource.sourceReferenceId}:` +
        `${outcome.responseCycleId}:${outcome.status}`;
      if (lastDeliveredLifeWhisperOutcomeKeyRef.current === outcomeKey) {
        return;
      }
      lastDeliveredLifeWhisperOutcomeKeyRef.current = outcomeKey;
      onLifeWhisperVisualResponseOutcomeRef.current?.(
        Object.freeze({
          ...outcome,
          sourceReferenceId:
            consumerSourceResult.consumerSource.sourceReferenceId,
        }) as LifeWhisperSurfaceVisualResponseOutcome,
      );
    },
    [consumerSourceResult.consumerSource.sourceReferenceId],
  );
  const [hostState, setHostState] =
    useState<GenesisProductionCanvasHostState>("STARTING");
  const [rendererFallbackReason, setRendererFallbackReason] =
    useState<GenesisWebGLRendererCoreFallback["reason"] | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setNativeReducedMotion(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const source = consumerSourceResult.consumerSource;
  const sourceRenderPlanReferenceId = useMemo(
    () =>
      createIsolatedWebGLPrototypeRenderPlanReference(
        source.renderPlanResult.plan,
      ).referenceId,
    [source.renderPlanResult.plan],
  );
  const runtimeFactory = useMemo(
    () =>
      rendererFailureRequested
        ? null
        : createXinmaiContinuousSceneGenesisRendererAdapter({
            factoryReferenceId:
              `CONTINUOUS_SCENE_GENESIS:${sourceRenderPlanReferenceId}`,
            rendererInput: {
              consumerSourceResult,
              authorization:
                routeAuthorization.productionRendererAuthorization,
              readLifeWhisperRelationshipVisualFact,
              genesisVisualRealization:
                visualCalibrationBundle.genesisVisualRealization,
              genesisPerspectiveCalibration:
                visualCalibrationBundle.genesisPerspectiveCalibration,
              genesisPresenceRecognitionCalibration:
                visualCalibrationBundle.genesisPresenceRecognitionCalibration,
              genesisSpatialDistanceCalibration:
                visualCalibrationBundle.genesisSpatialDistanceCalibration,
              fourSymbolDirectionFieldVisualCalibration,
              lifeArchetypeForceCondensationVisualCalibration,
            },
            onLifeWhisperVisualOutcome: (outcome) => {
              if (outcome !== null) {
                emitLifeWhisperVisualResponseOutcome(outcome);
              }
            },
          }),
    [
      consumerSourceResult,
      emitLifeWhisperVisualResponseOutcome,
      fourSymbolDirectionFieldVisualCalibration,
      lifeArchetypeForceCondensationVisualCalibration,
      readLifeWhisperRelationshipVisualFact,
      rendererFailureRequested,
      routeAuthorization.productionRendererAuthorization,
      sourceRenderPlanReferenceId,
      visualCalibrationBundle,
    ],
  );
  const isLifeOriginDiscovery =
    visualCalibrationBundle.runtimeStage === "COMPLETION";
  const sceneRegistration = useMemo(
    () =>
      Object.freeze({
        registrationReferenceId: "CONTINUOUS_SCENE:GENESIS",
        priority: 80,
        input: Object.freeze({
          schemaVersion: XINMAI_CONTINUOUS_SCENE_PRESENTATION_VERSION,
          consumerSurface: "GENESIS" as const,
          sourceReferenceId: source.sourceReferenceId,
          sourceRenderPlanReferenceId,
          identityReferenceId: null,
          bodyReferenceId: null,
          routeAdmissionEvidence: Object.freeze({
            status: "CURRENT" as const,
            admissionReferenceId:
              routeAuthorization.productionRendererAuthorization
                .authorizationId,
            revision: 0,
          }),
          nearObjectKind:
            isLifeOriginDiscovery && lifeOriginDiscoveryPhase === "DORMANT"
              ? "LIFE_ORIGIN" as const
              : "NONE" as const,
          nearObjectReferenceId:
            isLifeOriginDiscovery && lifeOriginDiscoveryPhase === "DORMANT"
              ? source.sourceReferenceId
              : null,
          nativeMotionPreference: reducedMotionRequested
            ? "REDUCED_MOTION" as const
            : "MOTION_ALLOWED" as const,
          qualityTier: "FULL" as const,
          sameLifeSurface: null,
          semanticProjection: null,
        }),
        runtimeFactory,
        staticSurface: null,
        canvasClassName: "gy-genesis-production-experience__canvas",
        canvasAttributes: Object.freeze({
          "data-production-renderer-host-state": hostState,
          "data-source-provenance": source.sourceProvenance,
          "data-source-reference-id": source.sourceReferenceId,
          "data-genesis-runtime-stage": visualCalibrationBundle.runtimeStage,
          "data-genesis-direction-field-phase":
            fourSymbolDirectionFieldVisualCalibration.phase,
          "data-genesis-archetype-force-phase":
            lifeArchetypeForceCondensationVisualCalibration.phase,
          "data-life-origin-discovery-phase": isLifeOriginDiscovery
            ? lifeOriginDiscoveryPhase
            : "INACTIVE",
        }),
        pointerInteraction: "NONE" as const,
      }),
    [
      fourSymbolDirectionFieldVisualCalibration.phase,
      hostState,
      isLifeOriginDiscovery,
      lifeArchetypeForceCondensationVisualCalibration.phase,
      lifeOriginDiscoveryPhase,
      reducedMotionRequested,
      routeAuthorization.productionRendererAuthorization.authorizationId,
      runtimeFactory,
      source.sourceProvenance,
      source.sourceReferenceId,
      sourceRenderPlanReferenceId,
      visualCalibrationBundle.runtimeStage,
    ],
  );
  const continuousSceneOutcome =
    useXinmaiContinuousScenePresentation(sceneRegistration);

  useEffect(() => {
    const updateState = (state: GenesisProductionCanvasHostState) => {
      setHostState(state);
      onStateChange?.(state);
    };
    if (continuousSceneOutcome === null) {
      updateState("STARTING");
      return;
    }
    if (
      continuousSceneOutcome.status ===
      "CONTINUOUS_SCENE_MOTION_PRESENTED"
    ) {
      setRendererFallbackReason(null);
      updateState("RENDERING");
      return;
    }
    if (
      continuousSceneOutcome.status ===
      "CONTINUOUS_SCENE_STATIC_PRESENTED"
    ) {
      setRendererFallbackReason(
        reducedMotionRequested
          ? "REDUCED_MOTION_REQUESTED"
          : "RENDERER_INITIALIZATION_FAILED",
      );
      updateState("FALLBACK_REQUIRED");
      return;
    }
    setRendererFallbackReason(null);
    updateState("BLOCKED");
  }, [continuousSceneOutcome, onStateChange, reducedMotionRequested]);

  const staticLifeWhisperResponseVisible =
    hostState === "FALLBACK_REQUIRED" &&
    rendererFallbackReason !== null &&
    lifeWhisperRelationshipVisualFact.lifeWhisperFact ===
      "WHISPER_SUBMITTED" &&
    (lifeWhisperRelationshipVisualFact.lifeWhisperResponsePhase ===
      "RESPONDING" ||
      lifeWhisperRelationshipVisualFact.lifeWhisperResponsePhase ===
        "SETTLED") &&
    lifeWhisperRelationshipVisualFact.responseCycleId !== null;

  useEffect(() => {
    if (
      !staticLifeWhisperResponseVisible ||
      lifeWhisperRelationshipVisualFact.lifeWhisperResponsePhase !==
        "RESPONDING" ||
      lifeWhisperRelationshipVisualFact.responseCycleId === null ||
      rendererFallbackReason === null
    ) {
      return undefined;
    }

    if (
      continuousSceneOutcome?.status !==
      "CONTINUOUS_SCENE_STATIC_PRESENTED"
    ) {
      return undefined;
    }
    emitLifeWhisperVisualResponseOutcome({
      responseCycleId:
        lifeWhisperRelationshipVisualFact.responseCycleId as string,
      status: "STATIC_RESPONSE_PRESENTED",
      surfaceMode: "SEMANTIC_STATIC_FALLBACK",
      reason: rendererFallbackReason,
    });
    return undefined;
  }, [
    continuousSceneOutcome?.status,
    emitLifeWhisperVisualResponseOutcome,
    lifeWhisperRelationshipVisualFact.lifeWhisperResponsePhase,
    lifeWhisperRelationshipVisualFact.responseCycleId,
    rendererFallbackReason,
    staticLifeWhisperResponseVisible,
  ]);

  useEffect(() => {
    if (
      hostState !== "BLOCKED" ||
      lifeWhisperRelationshipVisualFact.lifeWhisperFact !==
        "WHISPER_SUBMITTED" ||
      lifeWhisperRelationshipVisualFact.lifeWhisperResponsePhase !==
        "RESPONDING" ||
      lifeWhisperRelationshipVisualFact.responseCycleId === null
    ) {
      return;
    }
    emitLifeWhisperVisualResponseOutcome({
      responseCycleId:
        lifeWhisperRelationshipVisualFact.responseCycleId,
      status: "VISUAL_RESPONSE_UNAVAILABLE",
      surfaceMode: "SEMANTIC_STATIC_FALLBACK",
      reason: "SURFACE_BLOCKED",
    });
  }, [
    emitLifeWhisperVisualResponseOutcome,
    hostState,
    lifeWhisperRelationshipVisualFact.lifeWhisperFact,
    lifeWhisperRelationshipVisualFact.lifeWhisperResponsePhase,
    lifeWhisperRelationshipVisualFact.responseCycleId,
  ]);

  const mansionProjection =
    consumerSourceResult.consumerSource.projectionBundle
      .twentyEightMansionCoordinateProjection;
  const directionProjection =
    consumerSourceResult.consumerSource.projectionBundle
      .fourSymbolLifeDirectionProjection;
  const lifeOriginIdentityLabel = `${directionProjection.direction}方${directionProjection.fourSymbol} · ${mansionProjection.birthMansion.mansion}宿`;

  return (
    <>
      {isLifeOriginDiscovery &&
      lifeOriginDiscoveryPhase === "DORMANT" ? (
        <button
          type="button"
          className="gy-genesis-production-experience__origin-invitation"
          aria-label="轻触这束光，发现属于你的生命星宿"
          data-continuous-scene-near-control="LIFE_ORIGIN"
          onClick={onLifeOriginDiscoveryRequest}
        >
          轻触这束光
        </button>
      ) : null}
      {isLifeOriginDiscovery &&
      lifeOriginDiscoveryPhase === "REVEALED" ? (
        <p
          className="gy-genesis-production-experience__origin-identity"
          data-life-origin-identity={lifeOriginIdentityLabel}
          role="status"
        >
          {lifeOriginIdentityLabel}
        </p>
      ) : null}
    </>
  );
}
