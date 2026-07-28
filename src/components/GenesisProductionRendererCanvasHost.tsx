import { useCallback, useEffect, useRef, useState } from "react";
import { createGenesisProductionRendererHost } from "../renderers/genesisProductionRendererHost";
import type {
  GenesisProductionCanvasHostBoundary,
  GenesisProductionCanvasHostState,
  GenesisProductionRendererCanvasHostProps,
} from "../types/genesisProductionExperiencePage";
import type { GenesisWebGLRendererCoreFallback } from "../types/genesisWebGLRendererCore";
import type { LifeWhisperSurfaceVisualResponseOutcome } from "../types/xinmaiLifeWhisperRelationship";

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
  const reducedMotionRequested =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    isDevelopmentBrowserOverrideEnabled("__xinmaiReducedMotion");
  const rendererFailureRequested =
    isDevelopmentBrowserOverrideEnabled("__xinmaiRendererFailure");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
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
  const staticLifeWhisperResponseRef = useRef<SVGSVGElement | null>(null);
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
    const updateState = (state: GenesisProductionCanvasHostState) => {
      setHostState(state);
      onStateChange?.(state);
    };
    const canvas = canvasRef.current;
    if (canvas === null) {
      setRendererFallbackReason(null);
      updateState("BLOCKED");
      return undefined;
    }
    if (rendererFailureRequested) {
      setRendererFallbackReason(null);
      updateState("BLOCKED");
      return undefined;
    }

    const bounds = canvas.getBoundingClientRect();
    const rendererResult = createGenesisProductionRendererHost({
      canvas,
      consumerSourceResult,
      authorization: routeAuthorization.productionRendererAuthorization,
      width: Math.max(1, bounds.width),
      height: Math.max(1, bounds.height),
      pixelRatio: window.devicePixelRatio || 1,
      reducedMotion: reducedMotionRequested,
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
    });

    if (rendererResult.status === "BLOCKED") {
      setRendererFallbackReason(null);
      updateState("BLOCKED");
      return undefined;
    }
    if (rendererResult.status === "FALLBACK_REQUIRED") {
      setRendererFallbackReason(rendererResult.fallback.reason);
      updateState("FALLBACK_REQUIRED");
      return undefined;
    }

    setRendererFallbackReason(null);
    updateState("RENDERING");
    const controller = rendererResult.controller;
    const stageStartedAt = performance.now();
    let animationFrame = 0;
    const renderFrame = (timestamp: number) => {
      controller.renderFrame(timestamp - stageStartedAt);
      const visualOutcome =
        controller.getSnapshot().lifeWhisperVisualResponseOutcome;
      if (visualOutcome !== null) {
        emitLifeWhisperVisualResponseOutcome(visualOutcome);
      }
      animationFrame = window.requestAnimationFrame(renderFrame);
    };
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry === undefined) return;
      controller.resize(
        Math.max(1, entry.contentRect.width),
        Math.max(1, entry.contentRect.height),
        window.devicePixelRatio || 1,
      );
    });

    resizeObserver.observe(canvas);
    animationFrame = window.requestAnimationFrame(renderFrame);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      controller.dispose();
    };
  }, [
    consumerSourceResult,
    emitLifeWhisperVisualResponseOutcome,
    fourSymbolDirectionFieldVisualCalibration,
    lifeArchetypeForceCondensationVisualCalibration,
    onStateChange,
    readLifeWhisperRelationshipVisualFact,
    reducedMotionRequested,
    rendererFailureRequested,
    routeAuthorization,
    visualCalibrationBundle,
  ]);

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

    let firstFrame = 0;
    let presentedFrame = 0;
    firstFrame = window.requestAnimationFrame(() => {
      presentedFrame = window.requestAnimationFrame(() => {
        if (staticLifeWhisperResponseRef.current?.isConnected !== true) {
          return;
        }
        emitLifeWhisperVisualResponseOutcome({
          responseCycleId:
            lifeWhisperRelationshipVisualFact.responseCycleId as string,
          status: "STATIC_RESPONSE_PRESENTED",
          surfaceMode: "SEMANTIC_STATIC_FALLBACK",
          reason: rendererFallbackReason,
        });
      });
    });
    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(presentedFrame);
    };
  }, [
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

  const isLifeOriginDiscovery =
    visualCalibrationBundle.runtimeStage === "COMPLETION";
  const mansionProjection =
    consumerSourceResult.consumerSource.projectionBundle
      .twentyEightMansionCoordinateProjection;
  const directionProjection =
    consumerSourceResult.consumerSource.projectionBundle
      .fourSymbolLifeDirectionProjection;
  const lifeOriginIdentityLabel = `${directionProjection.direction}方${directionProjection.fourSymbol} · ${mansionProjection.birthMansion.mansion}宿`;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="gy-genesis-production-experience__canvas"
        data-production-renderer-host-state={hostState}
        data-source-provenance={
          consumerSourceResult.consumerSource.sourceProvenance
        }
        data-source-reference-id={
          consumerSourceResult.consumerSource.sourceReferenceId
        }
        data-genesis-runtime-stage={visualCalibrationBundle.runtimeStage}
        data-genesis-direction-field-phase={
          fourSymbolDirectionFieldVisualCalibration.phase
        }
        data-genesis-archetype-force-phase={
          lifeArchetypeForceCondensationVisualCalibration.phase
        }
        data-life-origin-discovery-phase={
          isLifeOriginDiscovery ? lifeOriginDiscoveryPhase : undefined
        }
        aria-hidden={
          isLifeOriginDiscovery &&
          lifeOriginDiscoveryPhase === "DORMANT"
            ? undefined
            : true
        }
        aria-label={
          isLifeOriginDiscovery &&
          lifeOriginDiscoveryPhase === "DORMANT"
            ? "轻触星河，发现属于你的生命星宿"
            : undefined
        }
        role={
          isLifeOriginDiscovery &&
          lifeOriginDiscoveryPhase === "DORMANT"
            ? "button"
            : undefined
        }
        tabIndex={
          isLifeOriginDiscovery &&
          lifeOriginDiscoveryPhase === "DORMANT"
            ? 0
            : undefined
        }
        onClick={
          isLifeOriginDiscovery &&
          lifeOriginDiscoveryPhase === "DORMANT"
            ? onLifeOriginDiscoveryRequest
            : undefined
        }
        onKeyDown={(event) => {
          if (
            isLifeOriginDiscovery &&
            lifeOriginDiscoveryPhase === "DORMANT" &&
            (event.key === "Enter" || event.key === " ")
          ) {
            event.preventDefault();
            onLifeOriginDiscoveryRequest();
          }
        }}
      />
      {staticLifeWhisperResponseVisible ? (
        <svg
          ref={staticLifeWhisperResponseRef}
          className="gy-genesis-production-experience__static-life-response"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          data-life-whisper-static-response="SAME_LIFE_PRESENTED"
          data-source-reference-id={
            consumerSourceResult.consumerSource.sourceReferenceId
          }
        >
          <ellipse
            cx="50"
            cy="49"
            rx="18"
            ry="12"
            fill="rgba(170, 213, 216, 0.035)"
            stroke="rgba(190, 220, 220, 0.16)"
            strokeWidth="0.22"
          />
          <path
            d="M 34 50 Q 42 41 50 46 Q 58 40 67 50 Q 59 58 50 54 Q 41 59 34 50"
            fill="none"
            stroke="rgba(190, 220, 220, 0.24)"
            strokeWidth="0.3"
            strokeLinecap="round"
          />
          <circle
            cx="50"
            cy="50"
            r="2.5"
            fill="rgba(244, 235, 206, 0.34)"
          />
        </svg>
      ) : null}
      {isLifeOriginDiscovery &&
      lifeOriginDiscoveryPhase === "DORMANT" ? (
        <p
          className="gy-genesis-production-experience__origin-invitation"
          aria-hidden="true"
        >
          轻触星河
        </p>
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
