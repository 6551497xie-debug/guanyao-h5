import { useEffect, useRef, useState } from "react";
import { createGenesisWebGLRendererCore } from "../renderers/genesisWebGLRendererCore";
import type {
  GenesisProductionCanvasHostState,
} from "../types/genesisProductionExperiencePage";
import type { RealityProductionHostProps } from "../types/realityProductionRouteEntry";

export function RealityLifeUniverseCanvas({
  visualContinuity,
}: Pick<RealityProductionHostProps, "visualContinuity">) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rendererState, setRendererState] =
    useState<GenesisProductionCanvasHostState>("STARTING");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) {
      setRendererState("BLOCKED");
      return undefined;
    }

    const source = visualContinuity.consumerSourceResult.consumerSource;
    const projectionBundle = source.projectionBundle;
    if (
      source.sourceExperienceMode !== "REAL_USER_EXPERIENCE" ||
      source.sourceProvenance !== "REAL_USER_SESSION" ||
      source.sourceReferenceId !== visualContinuity.sourceReferenceId ||
      visualContinuity.visualCalibrationBundle.sourceReferenceId !==
        visualContinuity.sourceReferenceId ||
      visualContinuity.visualCalibrationBundle.runtimeStage !== "COMPLETION"
    ) {
      setRendererState("BLOCKED");
      return undefined;
    }

    const bounds = canvas.getBoundingClientRect();
    const rendererResult = createGenesisWebGLRendererCore({
      canvas,
      renderPlan: source.renderPlanResult.plan,
      width: Math.max(1, bounds.width),
      height: Math.max(1, bounds.height),
      pixelRatio: window.devicePixelRatio || 1,
      reducedMotion: window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches,
      twentyEightMansionCoordinateProjection:
        projectionBundle.twentyEightMansionCoordinateProjection,
      timeSequenceRecognitionProjection:
        projectionBundle.timeSequenceRecognitionProjection,
      birthMansionIgnitionProjection:
        projectionBundle.birthMansionIgnitionProjection,
      morphologicalFieldAlignmentProjection:
        projectionBundle.morphologicalFieldAlignmentProjection,
      fourSymbolDirectionFieldVisualCalibration:
        visualContinuity.fourSymbolDirectionFieldVisualCalibration,
      lifeArchetypeForceCondensationVisualCalibration:
        visualContinuity.lifeArchetypeForceCondensationVisualCalibration,
      lifeForceInfusionProjection:
        projectionBundle.lifeForceInfusionProjection,
      personalRevealProjection: projectionBundle.personalRevealProjection,
      realityPressureProjection: projectionBundle.realityPressureProjection,
      genesisVisualRealization:
        visualContinuity.visualCalibrationBundle.genesisVisualRealization,
      genesisPerspectiveCalibration:
        visualContinuity.visualCalibrationBundle
          .genesisPerspectiveCalibration,
      genesisPresenceRecognitionCalibration:
        visualContinuity.visualCalibrationBundle
          .genesisPresenceRecognitionCalibration,
      genesisSpatialDistanceCalibration:
        visualContinuity.visualCalibrationBundle
          .genesisSpatialDistanceCalibration,
    });

    if (rendererResult.status === "BLOCKED") {
      setRendererState("BLOCKED");
      return undefined;
    }
    if (rendererResult.status === "FALLBACK_REQUIRED") {
      setRendererState("FALLBACK_REQUIRED");
      return undefined;
    }

    setRendererState("RENDERING");
    const controller = rendererResult.controller;
    const startedAt = performance.now();
    let animationFrame = 0;
    const renderFrame = (timestamp: number) => {
      controller.renderFrame(timestamp - startedAt);
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
  }, [visualContinuity]);

  return (
    <canvas
      ref={canvasRef}
      className="gy-reality-life-universe__canvas"
      data-reality-life-universe-renderer={rendererState}
      data-source-reference-id={visualContinuity.sourceReferenceId}
      aria-hidden="true"
    />
  );
}
