import { useEffect, useMemo, useRef, useState } from "react";
import { createGenesisWebGLRendererCore } from "../renderers/genesisWebGLRendererCore";
import { adaptRealLifeVisualSource } from "../services/realLifeVisualSourceAdapter";
import { readRealUserGenesisVisualSourceContext } from "../services/realUserGenesisVisualSourceContext";
import "../styles/reality-life-entry-continuity.css";
import type {
  GenesisProductionCanvasHostState,
} from "../types/genesisProductionExperiencePage";
import type { RealityProductionHostProps } from "../types/realityProductionRouteEntry";

const REALITY_ARRIVAL_TIMING_MS = Object.freeze({
  IDENTITY_HOLD: 760,
  SETTLED: 4_200,
});

export function RealityLifeUniverseCanvas({
  visualContinuity,
  selectedPressureSeedContext = null,
}: Pick<RealityProductionHostProps, "visualContinuity"> &
  Readonly<{
    selectedPressureSeedContext?:
      | Parameters<RealityProductionHostProps["onContinueToGravity"]>[0]
      | null;
  }>) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rendererState, setRendererState] =
    useState<GenesisProductionCanvasHostState>("STARTING");
  const [arrivalPhase, setArrivalPhase] = useState("IDENTITY_HOLD");
  const realityPressureConsumer = useMemo(() => {
    const frozenProjection =
      visualContinuity.consumerSourceResult.consumerSource.projectionBundle
        .realityPressureProjection;
    if (selectedPressureSeedContext === null) {
      return Object.freeze({
        status: "WAITING" as const,
        projection: frozenProjection,
      });
    }

    const sourceContext = readRealUserGenesisVisualSourceContext();
    if (
      sourceContext === null ||
      sourceContext.sourceReferenceId !== visualContinuity.sourceReferenceId
    ) {
      return Object.freeze({
        status: "BLOCKED" as const,
        projection: null,
      });
    }

    const adaptedSource = adaptRealLifeVisualSource(
      Object.freeze({
        ...sourceContext.visualSourceAdapterInput,
        selectedPressureSeedContext,
      }),
    );
    const projection =
      adaptedSource.status === "AVAILABLE"
        ? adaptedSource.visualSource.projectionBundle.realityPressureProjection
        : null;
    if (
      adaptedSource.status !== "AVAILABLE" ||
      adaptedSource.visualSource.provenance.selectedPressureSeedId !==
        selectedPressureSeedContext.selectedPressureSeedId ||
      projection === null
    ) {
      return Object.freeze({
        status: "BLOCKED" as const,
        projection: null,
      });
    }

    return Object.freeze({
      status: "RESPONDING" as const,
      projection,
    });
  }, [selectedPressureSeedContext, visualContinuity]);
  const realityPressureFlowSide =
    (realityPressureConsumer.projection?.pressureExpression.flowDeflection ??
      0) >= 0
      ? "RIGHT"
      : "LEFT";

  useEffect(() => {
    setArrivalPhase("IDENTITY_HOLD");
    const revealTimer = window.setTimeout(() => {
      setArrivalPhase("REALITY_REVEAL");
    }, REALITY_ARRIVAL_TIMING_MS.IDENTITY_HOLD);
    const settleTimer = window.setTimeout(() => {
      setArrivalPhase("SETTLED");
    }, REALITY_ARRIVAL_TIMING_MS.SETTLED);
    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(settleTimer);
    };
  }, [visualContinuity.sourceReferenceId]);

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
      visualContinuity.visualCalibrationBundle.runtimeStage !== "COMPLETION" ||
      realityPressureConsumer.status === "BLOCKED"
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
      realityPressureProjection: realityPressureConsumer.projection,
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
  }, [realityPressureConsumer, visualContinuity]);

  return (
    <canvas
      ref={canvasRef}
      className="gy-reality-life-universe__canvas"
      data-reality-life-universe-renderer={rendererState}
      data-reality-arrival-phase={arrivalPhase}
      data-reality-pressure-flow-side={realityPressureFlowSide}
      data-genesis-presence-visual-state="RECOGNIZED"
      data-source-reference-id={visualContinuity.sourceReferenceId}
      aria-hidden="true"
    />
  );
}
