import { useEffect, useRef, useState } from "react";
import { createGenesisProductionRendererHost } from "../renderers/genesisProductionRendererHost";
import type {
  GenesisProductionCanvasHostBoundary,
  GenesisProductionCanvasHostState,
  GenesisProductionRendererCanvasHostProps,
} from "../types/genesisProductionExperiencePage";

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
  onLifeOriginDiscoveryRequest,
  onStateChange,
}: GenesisProductionRendererCanvasHostProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hostState, setHostState] =
    useState<GenesisProductionCanvasHostState>("STARTING");

  useEffect(() => {
    const updateState = (state: GenesisProductionCanvasHostState) => {
      setHostState(state);
      onStateChange?.(state);
    };
    const canvas = canvasRef.current;
    if (canvas === null) {
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
      reducedMotion: window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches,
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
      updateState("BLOCKED");
      return undefined;
    }
    if (rendererResult.status === "FALLBACK_REQUIRED") {
      updateState("FALLBACK_REQUIRED");
      return undefined;
    }

    updateState("RENDERING");
    const controller = rendererResult.controller;
    const stageStartedAt = performance.now();
    let animationFrame = 0;
    const renderFrame = (timestamp: number) => {
      controller.renderFrame(timestamp - stageStartedAt);
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
  }, [consumerSourceResult, fourSymbolDirectionFieldVisualCalibration, lifeArchetypeForceCondensationVisualCalibration, onStateChange, routeAuthorization, visualCalibrationBundle]);

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
