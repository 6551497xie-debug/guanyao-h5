import { useEffect, useMemo, useRef, useState } from "react";
import { createGenesisWebGLRendererCore } from "../renderers/genesisWebGLRendererCore";
import { resolveLifeUniverseCrystalImprintGeometry } from "../renderers/lifeUniverseStarField";
import { adaptRealLifeVisualSource } from "../services/realLifeVisualSourceAdapter";
import { readRealUserGenesisVisualSourceContext } from "../services/realUserGenesisVisualSourceContext";
import "../styles/reality-life-entry-continuity.css";
import "../styles/reality-inner-view-entry.css";
import "../styles/xinmai-reality-seed-body-response.css";
import type {
  GenesisProductionCanvasHostState,
} from "../types/genesisProductionExperiencePage";
import type { RealityProductionHostProps } from "../types/realityProductionRouteEntry";

const REALITY_ARRIVAL_TIMING_MS = Object.freeze({
  IDENTITY_HOLD: 1_600,
  SETTLED: 4_600,
  LIFE_WEATHER_SETTLE: 2_800,
});

export function RealityLifeUniverseCanvas({
  visualContinuity,
  selectedPressureSeedContext = null,
  currentRealityWeatherEnabled = false,
  innerViewApproachState = "INACTIVE",
  onApproachCurrentWeather,
  historicalRealityMemoryKey = null,
  latestCrystalMemoryKey = null,
  latestCrystalSourceSlot = null,
  choiceLifeTraceMemoryKey = null,
  choiceLifeTraceSourceSlot = null,
}: Pick<RealityProductionHostProps, "visualContinuity"> &
  Readonly<{
    selectedPressureSeedContext?:
      | Parameters<RealityProductionHostProps["onContinueToGravity"]>[0]
      | null;
    currentRealityWeatherEnabled?: boolean;
    innerViewApproachState?:
      | "INACTIVE"
      | "AWAITING_BODY_APPROACH"
      | "BODY_APPROACHED";
    onApproachCurrentWeather?: () => void;
    historicalRealityMemoryKey?: string | null;
    latestCrystalMemoryKey?: string | null;
    latestCrystalSourceSlot?: number | null;
    choiceLifeTraceMemoryKey?: string | null;
    choiceLifeTraceSourceSlot?: number | null;
  }>) {
  const continuesRecognizedPressure = selectedPressureSeedContext !== null;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rendererState, setRendererState] =
    useState<GenesisProductionCanvasHostState>("STARTING");
  const [arrivalPhase, setArrivalPhase] = useState(() =>
    continuesRecognizedPressure ? "SETTLED" : "IDENTITY_HOLD",
  );
  const [lifeWeatherPhase, setLifeWeatherPhase] = useState<
    "QUIET_WITH_MEMORY" | "CURRENT_REALITY_SENSING" | "CURRENT_REALITY_SETTLED"
  >(() =>
    selectedPressureSeedContext === null
      ? "QUIET_WITH_MEMORY"
      : currentRealityWeatherEnabled
        ? "CURRENT_REALITY_SENSING"
        : "CURRENT_REALITY_SETTLED",
  );
  const realityPressureConsumer = useMemo(() => {
    if (selectedPressureSeedContext === null) {
      return Object.freeze({
        status: "WAITING" as const,
        // A persisted projection belongs to history. A new Reality encounter
        // stays visually quiet until the user recognizes what is happening now.
        projection: null,
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
  const realitySeedBodyTargetX =
    realityPressureFlowSide === "RIGHT" ? 59 : 41;
  const realitySeedIngressOriginX =
    realityPressureFlowSide === "RIGHT" ? 96 : 4;
  const realitySeedIngressControlX =
    realityPressureFlowSide === "RIGHT" ? 78 : 22;
  const realitySeedBodyResponsePath =
    selectedPressureSeedContext === null
      ? ""
      : `M ${realitySeedIngressOriginX} 72 C ${realitySeedIngressControlX} 69 ${realitySeedBodyTargetX + (realityPressureFlowSide === "RIGHT" ? 7 : -7)} 57 ${realitySeedBodyTargetX} 48`;
  const lifeMemoryGeometry = useMemo(() => {
    const projectionBundle =
      visualContinuity.consumerSourceResult.consumerSource.projectionBundle;
    const morphology =
      projectionBundle.morphologicalFieldAlignmentProjection
        .morphologicalFieldExpression;
    const sharedInput = {
      birthMansionIndex:
        projectionBundle.twentyEightMansionCoordinateProjection.birthMansion
          .mansionIndex,
      normalizedOrbitPositions:
        projectionBundle.twentyEightMansionCoordinateProjection.coordinates.map(
          (coordinate) => coordinate.normalizedOrbitPosition,
        ),
      envelopeScale: morphology.envelopeScale,
      postureBias: morphology.postureBias,
    };
    return Object.freeze({
      historicalReality: historicalRealityMemoryKey
        ? resolveLifeUniverseCrystalImprintGeometry({
            identityKey: historicalRealityMemoryKey,
            ...sharedInput,
          })
        : null,
      latestCrystal: latestCrystalMemoryKey
        ? resolveLifeUniverseCrystalImprintGeometry({
            identityKey: latestCrystalMemoryKey,
            ...sharedInput,
            sourceSlot: latestCrystalSourceSlot,
          })
        : null,
      choiceLifeTrace:
        choiceLifeTraceMemoryKey && choiceLifeTraceSourceSlot !== null
          ? resolveLifeUniverseCrystalImprintGeometry({
              identityKey: choiceLifeTraceMemoryKey,
              ...sharedInput,
              sourceSlot: choiceLifeTraceSourceSlot,
            })
          : null,
    });
  }, [
    choiceLifeTraceMemoryKey,
    choiceLifeTraceSourceSlot,
    historicalRealityMemoryKey,
    latestCrystalMemoryKey,
    latestCrystalSourceSlot,
    visualContinuity,
  ]);
  const latestCrystalBodyPath = lifeMemoryGeometry.latestCrystal
    ? `M ${lifeMemoryGeometry.latestCrystal.target[0]} ${lifeMemoryGeometry.latestCrystal.target[1]} L ${lifeMemoryGeometry.latestCrystal.stem[0]} ${lifeMemoryGeometry.latestCrystal.stem[1]} L ${lifeMemoryGeometry.latestCrystal.branchTarget[0]} ${lifeMemoryGeometry.latestCrystal.branchTarget[1]}`
    : "";
  const latestCrystalBodyPoint =
    lifeMemoryGeometry.latestCrystal?.branchTarget ?? null;
  const choiceLifeTraceBodyPath = lifeMemoryGeometry.choiceLifeTrace
    ? `M ${lifeMemoryGeometry.choiceLifeTrace.target[0]} ${lifeMemoryGeometry.choiceLifeTrace.target[1]} L ${lifeMemoryGeometry.choiceLifeTrace.stem[0]} ${lifeMemoryGeometry.choiceLifeTrace.stem[1]} L ${lifeMemoryGeometry.choiceLifeTrace.branchTarget[0]} ${lifeMemoryGeometry.choiceLifeTrace.branchTarget[1]}`
    : "";
  const choiceLifeTraceBodyPoint =
    lifeMemoryGeometry.choiceLifeTrace?.branchTarget ?? null;
  const choiceLifeTraceResponseInfluence =
    lifeMemoryGeometry.choiceLifeTrace !== null &&
    selectedPressureSeedContext !== null
      ? "CADENCE_BIAS_ONLY"
      : "NONE";
  const choiceLifeTraceCadenceSignature =
    choiceLifeTraceSourceSlot === null
      ? "NONE"
      : `SOURCE_SLOT_${choiceLifeTraceSourceSlot}`;

  useEffect(() => {
    if (continuesRecognizedPressure) {
      setArrivalPhase("SETTLED");
      return undefined;
    }

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
  }, [continuesRecognizedPressure, visualContinuity.sourceReferenceId]);

  useEffect(() => {
    if (selectedPressureSeedContext === null) {
      setLifeWeatherPhase("QUIET_WITH_MEMORY");
      return undefined;
    }
    if (
      !currentRealityWeatherEnabled ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setLifeWeatherPhase("CURRENT_REALITY_SETTLED");
      return undefined;
    }

    setLifeWeatherPhase("CURRENT_REALITY_SENSING");
    const settleTimer = window.setTimeout(() => {
      setLifeWeatherPhase("CURRENT_REALITY_SETTLED");
    }, REALITY_ARRIVAL_TIMING_MS.LIFE_WEATHER_SETTLE);
    return () => window.clearTimeout(settleTimer);
  }, [
    currentRealityWeatherEnabled,
    selectedPressureSeedContext?.selectedPressureSeedId,
  ]);

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
    <>
      {lifeMemoryGeometry.historicalReality ||
      lifeMemoryGeometry.latestCrystal ||
      lifeMemoryGeometry.choiceLifeTrace ? (
        <svg
          className="gy-reality-life-universe__memory-layer"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          data-reality-life-memory="PAST_AS_TEXTURE_NOT_CURRENT_EVENT"
          data-reality-history-pressure={
            lifeMemoryGeometry.historicalReality ? "MEMORY_ONLY" : "NONE"
          }
          data-reality-history-crystal={
            lifeMemoryGeometry.latestCrystal ? "BODY_IMPRINT" : "NONE"
          }
          data-reality-choice-life-trace={
            lifeMemoryGeometry.choiceLifeTrace
              ? "PRE_CRYSTAL_BODY_MEMORY"
              : "NONE"
          }
        >
          {lifeMemoryGeometry.historicalReality ? (
            <path
              className="gy-reality-life-universe__reality-memory"
              d={lifeMemoryGeometry.historicalReality.path}
              fill="none"
              stroke="rgba(185,203,236,0.32)"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="blur(2.2px)"
            />
          ) : null}
          {lifeMemoryGeometry.latestCrystal && latestCrystalBodyPoint ? (
            <g
              className="gy-reality-life-universe__crystal-memory"
              data-reality-crystal-imprint-source="ARCHIVED_USER_RECOGNIZED_RESPONSE"
              data-reality-crystal-imprint-direction="SAME_RESPONSE_POSITION_INTO_SAME_BODY"
              data-reality-crystal-imprint-form="LIFE_TEXTURE_NOT_COLLECTIBLE"
              data-reality-crystal-imprint-status="REMEMBERED_NOT_CURRENT_EVENT"
              data-reality-crystal-identity-invariant="SAME_CORE_SAME_BODY_SAME_LIFE"
            >
              <path
                d={latestCrystalBodyPath}
                fill="none"
                stroke="rgba(232,200,138,0.08)"
                strokeWidth="1.08"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="blur(1.1px)"
              />
              <path
                className="gy-reality-life-universe__crystal-memory-flow"
                d={latestCrystalBodyPath}
                fill="none"
                stroke="rgba(255,239,190,0.48)"
                strokeWidth="0.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                className="gy-reality-life-universe__crystal-memory-origin"
                cx={lifeMemoryGeometry.latestCrystal.target[0]}
                cy={lifeMemoryGeometry.latestCrystal.target[1]}
                r="0.34"
                fill="rgba(255,247,220,0.06)"
                stroke="rgba(255,239,190,0.2)"
                strokeWidth="0.14"
              />
              <g className="gy-reality-life-universe__crystal-memory-trace">
                <path
                  d={`M ${latestCrystalBodyPoint[0] - 0.62} ${latestCrystalBodyPoint[1] + 0.08} L ${latestCrystalBodyPoint[0] - 0.14} ${latestCrystalBodyPoint[1] - 0.46} L ${latestCrystalBodyPoint[0] + 0.5} ${latestCrystalBodyPoint[1] - 0.12} M ${latestCrystalBodyPoint[0] - 0.14} ${latestCrystalBodyPoint[1] - 0.46} L ${latestCrystalBodyPoint[0] - 0.08} ${latestCrystalBodyPoint[1] + 0.58}`}
                  fill="none"
                  stroke="rgba(255,239,190,0.48)"
                  strokeWidth="0.24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx={latestCrystalBodyPoint[0]}
                  cy={latestCrystalBodyPoint[1]}
                  r="0.17"
                  fill="rgba(255,247,220,0.5)"
                />
              </g>
            </g>
          ) : null}
          {lifeMemoryGeometry.choiceLifeTrace &&
          choiceLifeTraceBodyPoint ? (
            <g
              className="gy-reality-life-universe__choice-life-trace"
              data-choice-life-trace-memory="SAME_BODY_FROM_CHOICE"
              data-choice-life-trace-pressure-role="PAST_INFLUENCE_NOT_CURRENT_PRESSURE"
              data-choice-life-trace-crystal-state="NOT_MATERIALIZED"
              data-choice-life-trace-identity-invariant="SAME_CORE_SAME_BODY_SAME_LIFE"
              data-choice-life-trace-response-influence={
                choiceLifeTraceResponseInfluence
              }
              data-choice-life-trace-response-order="MEMORY_PULSES_BEFORE_CURRENT_RESPONSE"
              data-choice-life-trace-outcome-authority="NONE"
              data-choice-life-trace-cadence-signature={
                choiceLifeTraceCadenceSignature
              }
            >
              <path
                className="gy-reality-life-universe__choice-life-trace-bed"
                d={choiceLifeTraceBodyPath}
                fill="none"
                stroke="rgba(185,203,236,0.13)"
                strokeWidth="0.48"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                className="gy-reality-life-universe__choice-life-trace-flow"
                d={choiceLifeTraceBodyPath}
                pathLength="1"
                fill="none"
                stroke="rgba(255,239,190,0.34)"
                strokeWidth="0.22"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g className="gy-reality-life-universe__choice-life-trace-memory">
                <path
                  d={`M ${choiceLifeTraceBodyPoint[0] - 0.38} ${choiceLifeTraceBodyPoint[1] + 0.12} Q ${choiceLifeTraceBodyPoint[0]} ${choiceLifeTraceBodyPoint[1] - 0.38} ${choiceLifeTraceBodyPoint[0] + 0.42} ${choiceLifeTraceBodyPoint[1] + 0.08}`}
                  fill="none"
                  stroke="rgba(255,239,190,0.4)"
                  strokeWidth="0.2"
                  strokeLinecap="round"
                />
                <circle
                  cx={choiceLifeTraceBodyPoint[0]}
                  cy={choiceLifeTraceBodyPoint[1]}
                  r="0.14"
                  fill="rgba(255,247,220,0.48)"
                />
              </g>
              {choiceLifeTraceResponseInfluence === "CADENCE_BIAS_ONLY" ? (
                <circle
                  className="gy-reality-life-universe__choice-life-trace-response-echo"
                  cx={choiceLifeTraceBodyPoint[0]}
                  cy={choiceLifeTraceBodyPoint[1]}
                  r="0.54"
                  fill="none"
                  stroke="rgba(255,239,190,0.36)"
                  strokeWidth="0.16"
                />
              ) : null}
            </g>
          ) : null}
        </svg>
      ) : null}
      <canvas
        ref={canvasRef}
        className="gy-reality-life-universe__canvas"
        data-reality-life-universe-renderer={rendererState}
        data-reality-arrival-phase={arrivalPhase}
        data-reality-life-weather-phase={lifeWeatherPhase}
        data-reality-life-weather-source={
          realityPressureConsumer.status === "RESPONDING"
            ? "CURRENT_RECOGNIZED_REALITY_ONLY"
            : "NO_CURRENT_REALITY"
        }
        data-reality-life-weather-identity="SAME_CORE_SAME_BODY"
        data-reality-pressure-flow-side={realityPressureFlowSide}
        data-choice-life-trace-response-influence={
          choiceLifeTraceResponseInfluence
        }
        data-choice-life-trace-outcome-authority="NONE"
        data-choice-life-trace-cadence-signature={
          choiceLifeTraceCadenceSignature
        }
        data-genesis-presence-visual-state="RECOGNIZED"
        data-source-reference-id={visualContinuity.sourceReferenceId}
        aria-hidden="true"
      />
      {selectedPressureSeedContext !== null &&
      realityPressureConsumer.status === "RESPONDING" ? (
        <svg
          className="gy-reality-life-universe__seed-body-response"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          data-reality-seed-recognition="FRAGMENT_ENTERING_SAME_LIFE"
          data-reality-seed-presentation-state="DISSOLVED_FROM_CARD"
          data-reality-seed-body-target="EXISTING_LIFE_WEATHER_POSITION"
          data-reality-seed-analysis-stage="NOT_STARTED"
          data-reality-seed-identity-invariant="SAME_CORE_SAME_BODY_SAME_LIFE"
          data-reality-seed-reference={
            selectedPressureSeedContext.selectedPressureSeedId
          }
          data-reality-seed-pressure-field={
            selectedPressureSeedContext.pressureField ?? "UNSPECIFIED"
          }
          data-reality-seed-flow-side={realityPressureFlowSide}
          data-inner-view-approach-state={innerViewApproachState}
        >
          <path
            className="gy-reality-life-universe__seed-body-response-bed"
            d={realitySeedBodyResponsePath}
            fill="none"
            stroke="rgba(185,203,236,0.16)"
            strokeWidth="0.34"
            strokeLinecap="round"
          />
          <path
            className="gy-reality-life-universe__seed-body-response-flow"
            d={realitySeedBodyResponsePath}
            pathLength="1"
            fill="none"
            stroke="rgba(238,226,198,0.38)"
            strokeWidth="0.18"
            strokeLinecap="round"
          />
          <path
            className="gy-reality-life-universe__seed-body-response-breath"
            d={`M ${realitySeedBodyTargetX - 0.72} 48.12 Q ${realitySeedBodyTargetX} 47.46 ${realitySeedBodyTargetX + 0.74} 48.08`}
            fill="none"
            stroke="rgba(255,239,190,0.42)"
            strokeWidth="0.18"
            strokeLinecap="round"
          />
        </svg>
      ) : null}
      {selectedPressureSeedContext !== null &&
      innerViewApproachState !== "INACTIVE" &&
      onApproachCurrentWeather ? (
        <button
          type="button"
          className="gy-reality-inner-view-entry"
          style={{
            left: `${realitySeedBodyTargetX}%`,
          }}
          aria-label="靠近生命正在变化的位置"
          data-inner-view-entry="SAME_BODY_LIFE_WEATHER_TRACE"
          data-inner-view-approach-state={innerViewApproachState}
          data-inner-view-entry-visual="HAIRLINE_BREATH_NOT_SECOND_CORE"
          disabled={innerViewApproachState === "BODY_APPROACHED"}
          onClick={onApproachCurrentWeather}
        >
          <span aria-hidden="true" />
        </button>
      ) : null}
    </>
  );
}
