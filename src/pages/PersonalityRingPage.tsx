import {
  lazy,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  drawLifeUniverseDeepSpace2D,
  resolveLifeUniverseCrystalImprintGeometry,
  resolveLifeUniverseCrystalSourceSlot,
} from "../renderers/lifeUniverseStarField";
import { readPersonalityRingLite } from "../services/personalityRingLiteService";
import { readPersistedGenesisVisualContinuity } from "../services/sessionService";
import type { RealityProductionHostProps } from "../types/realityProductionRouteEntry";
import "../styles/reality-pressure-presentation.css";

const RealityLifeUniverseCanvas = lazy(() =>
  import("../components/RealityLifeUniverseCanvas").then((module) => ({
    default: module.RealityLifeUniverseCanvas,
  })),
);

function SharedLifeUniverseFallback() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return undefined;

    let animationFrame = 0;
    const draw = () => {
      const bounds = canvas.getBoundingClientRect();
      const width = Math.max(1, bounds.width);
      const height = Math.max(1, bounds.height);
      const pixelRatio = Math.min(2, Math.max(1, window.devicePixelRatio || 1));
      const targetWidth = Math.round(width * pixelRatio);
      const targetHeight = Math.round(height * pixelRatio);
      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      const universeSeconds = performance.now() / 1000;
      drawLifeUniverseDeepSpace2D(context, width, height, universeSeconds);
      animationFrame = window.requestAnimationFrame(draw);
    };

    animationFrame = window.requestAnimationFrame(draw);
    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-personality-ring-fallback="DEEP_SPACE_ONLY_IDENTITY_WITHHELD"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}

function formatRingTime(createdAt: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(createdAt));
}

const PRESSURE_FIELD_DEPTH: Record<string, number> = {
  POWER: 0.04,
  INTEREST: 0.13,
  RELATION: 0.22,
  FAMILY: 0.31,
  SOCIAL: 0.4,
  EXISTENCE: 0.49,
  BODY: 0.55,
  EMOTION: 0.64,
  THOUGHT: 0.73,
  ACTION: 0.82,
  MEMORY: 0.91,
  MOTIVATION: 0.98,
};

function resolvePressureFieldDepth(pressureField: string | undefined) {
  const normalizedField = pressureField?.trim().toUpperCase() ?? "";
  return PRESSURE_FIELD_DEPTH[normalizedField] ?? 0.5;
}

export function PersonalityRingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const archiveArrivalCreatedAt = (
    location.state as
      | {
          archiveEntryCreatedAt?: string;
          visualContinuity?: RealityProductionHostProps["visualContinuity"];
        }
      | null
  )?.archiveEntryCreatedAt;
  const [ringState] = useState(() => readPersonalityRingLite());
  const entries = useMemo(
    () =>
      [...ringState.entries].sort(
        (left, right) =>
          new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
      ),
    [ringState.entries],
  );
  const [selectedCreatedAt, setSelectedCreatedAt] = useState<string | null>(
    () =>
      entries.find((entry) => entry.createdAt === archiveArrivalCreatedAt)
        ?.createdAt ??
      entries[0]?.createdAt ??
      null,
  );
  const [revealedCreatedAt, setRevealedCreatedAt] = useState<string | null>(
    () =>
      entries.find((entry) => entry.createdAt === archiveArrivalCreatedAt)
        ?.createdAt ??
      entries[0]?.createdAt ??
      null,
  );
  const [imprintMemoryVisible, setImprintMemoryVisible] = useState(
    () => !archiveArrivalCreatedAt,
  );
  const imprintRevealTimerRef = useRef<number | null>(null);
  const [imprintReplaySequence, setImprintReplaySequence] = useState(0);
  const [imprintReplayPressurePosition, setImprintReplayPressurePosition] = useState(0.5);
  useEffect(() => {
    if (imprintReplaySequence === 0) return undefined;
    const replayTimer = window.setTimeout(() => {
      setImprintReplaySequence(0);
    }, 1760);
    return () => window.clearTimeout(replayTimer);
  }, [imprintReplaySequence]);
  useEffect(
    () => () => {
      if (imprintRevealTimerRef.current !== null) {
        window.clearTimeout(imprintRevealTimerRef.current);
      }
    },
    [],
  );
  useEffect(() => {
    if (!archiveArrivalCreatedAt) return undefined;
    imprintRevealTimerRef.current = window.setTimeout(() => {
      setImprintMemoryVisible(true);
      imprintRevealTimerRef.current = null;
    }, 1_450);
    return () => {
      if (imprintRevealTimerRef.current !== null) {
        window.clearTimeout(imprintRevealTimerRef.current);
        imprintRevealTimerRef.current = null;
      }
    };
  }, [archiveArrivalCreatedAt]);
  const selectedEntry =
    entries.find((entry) => entry.createdAt === selectedCreatedAt) ??
    entries[0] ??
    null;
  const revealedEntry =
    entries.find((entry) => entry.createdAt === revealedCreatedAt) ??
    entries[0] ??
    null;
  const visibleEntries = entries.slice(0, 12);
  const visibleTimeCoordinates = visibleEntries
    .map((entry) => Date.parse(entry.createdAt))
    .filter((coordinate) => Number.isFinite(coordinate));
  const oldestVisibleTime =
    visibleTimeCoordinates.length > 0 ? Math.min(...visibleTimeCoordinates) : 0;
  const newestVisibleTime =
    visibleTimeCoordinates.length > 0 ? Math.max(...visibleTimeCoordinates) : 0;
  const visibleTimeSpan = Math.max(0, newestVisibleTime - oldestVisibleTime);
  const visiblePositionedEntries = visibleEntries.map((entry) => {
    const entryTime = Date.parse(entry.createdAt);
    const timePosition =
      Number.isFinite(entryTime) && visibleTimeSpan > 0
        ? (entryTime - oldestVisibleTime) / visibleTimeSpan
        : 1;
    const pressureField = entry.pressure.pressureField?.trim() || "UNSPECIFIED";
    return {
      entry,
      timePosition,
      pressureField,
      pressureFieldDepth: resolvePressureFieldDepth(pressureField),
    };
  });
  const visualContinuity = (
    location.state as
      | { visualContinuity?: RealityProductionHostProps["visualContinuity"] }
      | null
  )?.visualContinuity ?? readPersistedGenesisVisualContinuity();
  const visualContinuityReady =
    visualContinuity !== null &&
    visualContinuity.consumerSourceResult.consumerSource.sourceReferenceId ===
      visualContinuity.sourceReferenceId &&
    visualContinuity.consumerSourceResult.consumerSource.sourceExperienceMode ===
      "REAL_USER_EXPERIENCE" &&
    visualContinuity.consumerSourceResult.consumerSource.sourceProvenance ===
      "REAL_USER_SESSION" &&
    visualContinuity.visualCalibrationBundle.sourceReferenceId ===
      visualContinuity.sourceReferenceId &&
    visualContinuity.visualCalibrationBundle.runtimeStage === "COMPLETION";
  const visibleLifeImprints = (() => {
    if (!visualContinuityReady || !visualContinuity) return [];
    const projectionBundle =
      visualContinuity.consumerSourceResult.consumerSource.projectionBundle;
    const morphology =
      projectionBundle.morphologicalFieldAlignmentProjection
        .morphologicalFieldExpression;
    const birthMansionIndex =
      projectionBundle.twentyEightMansionCoordinateProjection.birthMansion
        .mansionIndex;
    const normalizedOrbitPositions =
      projectionBundle.twentyEightMansionCoordinateProjection.coordinates.map(
        (coordinate) => coordinate.normalizedOrbitPosition,
      );
    return visiblePositionedEntries.flatMap((positionedEntry) => {
      const sourceDimension =
        positionedEntry.entry.transmission.primaryDimension?.trim().toLowerCase() ??
        "unknown";
      const sourceSlot =
        resolveLifeUniverseCrystalSourceSlot(sourceDimension);
      const geometry = resolveLifeUniverseCrystalImprintGeometry({
        identityKey: `${visualContinuity.sourceReferenceId}:${positionedEntry.entry.crystal.copy}`,
        birthMansionIndex,
        normalizedOrbitPositions,
        envelopeScale: morphology.envelopeScale,
        postureBias: morphology.postureBias,
        sourceSlot,
      });
      return geometry
        ? [{ ...positionedEntry, geometry, sourceDimension, sourceSlot }]
        : [];
    });
  })();
  const selectedLifeImprint =
    visibleLifeImprints.find(
      ({ entry }) => entry.createdAt === selectedEntry?.createdAt,
    ) ?? null;
  const isCrystalArrival =
    Boolean(archiveArrivalCreatedAt) &&
    selectedEntry?.createdAt === archiveArrivalCreatedAt;
  const selectedImprintGeometry = selectedLifeImprint?.geometry ?? null;
  const selectedHexagramCoordinate = selectedEntry
    ? selectedEntry.hexagram.hexagramName ??
      selectedEntry.hexagram.hexagramTitle ??
      selectedEntry.hexagram.hexagramCode ??
      "本局坐标"
    : "NONE";
  const selectedLifeImprintAxis =
    selectedEntry?.transmission.primaryDimension?.trim().toUpperCase() ||
    selectedEntry?.pressure.pressureField?.trim().toUpperCase() ||
    "UNSPECIFIED";

  const replayLifeImprint = (
    createdAt: string,
    pressureField: string | undefined,
  ) => {
    if (!visualContinuityReady) {
      if (imprintRevealTimerRef.current !== null) {
        window.clearTimeout(imprintRevealTimerRef.current);
        imprintRevealTimerRef.current = null;
      }
      setSelectedCreatedAt(createdAt);
      setRevealedCreatedAt(createdAt);
      setImprintMemoryVisible(true);
      setImprintReplaySequence(0);
      return;
    }
    setImprintReplayPressurePosition(resolvePressureFieldDepth(pressureField));
    setSelectedCreatedAt(createdAt);
    if (imprintRevealTimerRef.current !== null) {
      window.clearTimeout(imprintRevealTimerRef.current);
    }
    setImprintMemoryVisible(false);
    imprintRevealTimerRef.current = window.setTimeout(() => {
      setRevealedCreatedAt(createdAt);
      setImprintMemoryVisible(true);
      imprintRevealTimerRef.current = null;
    }, 980);
    setImprintReplaySequence((sequence) => sequence + 1);
  };

  return (
    <main
      aria-label="生命年轮"
      data-personality-ring-page="ACTIVE_1_0"
      data-personality-ring-source="PERSONALITY_RING_LITE"
      data-personality-ring-entry-count={entries.length}
      data-personality-ring-visual-language="SAME_LIFE_UNIVERSE_TRAJECTORY"
      data-personality-ring-coordinate-system="TIME_DEPTH_X_REALITY_PHASE"
      data-personality-ring-pressure-privacy="FIELD_ONLY_NO_RAW_SURFACE"
      data-personality-ring-coordinate-density="ONE_BODY_TWELVE_TRACE_BUDGET"
      data-personality-ring-stack-interaction="REPEATED_SELECTED_NODE_TAP_NEWEST_TO_OLDEST"
      data-personality-ring-selected-depth="BRIGHT_CURRENT_DIM_HISTORY"
      data-personality-ring-continuity-priority="SAME_LIFE_BEFORE_HISTORY"
      data-personality-ring-arrival={
        isCrystalArrival
          ? "CRYSTAL_SEDIMENT_CONTINUES_IN_SAME_BODY"
          : "RETURNING_TO_LIFE_MEMORY"
      }
      data-personality-ring-memory-transition="PRESENT_BODY_TEXTURE_TO_TIME_MEMORY"
      data-personality-ring-arrival-source-continuity={
        isCrystalArrival
          ? "SAME_SOURCE_POSITION_SAME_GEOMETRY"
          : "ARCHIVED_BODY_MEMORY"
      }
      data-personality-ring-first-perception="LIFE_REMEMBERS_CHANGE"
      data-personality-ring-collection-metaphor="EXCLUDED"
      data-personality-ring-identity-mode={
        visualContinuityReady
          ? "REAL_USER_GENESIS_IDENTITY"
          : "IDENTITY_UNAVAILABLE_SHARED_DEEP_SPACE"
      }
      data-personality-ring-core-presence={
        visualContinuityReady ? "REAL_USER_GENESIS_CORE" : "WITHHELD_WITHOUT_IDENTITY"
      }
      data-personality-ring-source-reference={
        visualContinuityReady && visualContinuity
          ? visualContinuity.sourceReferenceId
          : "NONE"
      }
      data-personality-ring-life-replay={
        imprintReplaySequence > 0 ? "SAME_CORE_HISTORICAL_IMPRINT" : "IDLE"
      }
      data-personality-ring-replay-surface="NO_DETAIL_CARD"
      data-personality-ring-replay-raw-pressure="EXCLUDED"
      data-personality-ring-visual-authority={
        visualContinuityReady
          ? "REAL_USER_GENESIS_WEBGL"
          : "SHARED_DEEP_SPACE_IDENTITY_WITHHELD"
      }
      data-legacy-r7-archive="ISOLATED_OUTSIDE_ACTIVE_1_0"
      data-selected-imprint-identity={selectedEntry?.crystal.copy ?? "NONE"}
      data-selected-imprint-source-dimension={
        selectedLifeImprint?.sourceDimension ?? "NONE"
      }
      data-selected-imprint-source-slot={
        selectedLifeImprint?.sourceSlot ?? "NONE"
      }
      data-selected-hexagram-coordinate={selectedHexagramCoordinate}
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        background: "#020306",
        color: "rgba(255,239,196,0.94)",
      }}
    >
      <div aria-hidden="true" style={{ position: "absolute", inset: 0 }}>
        {visualContinuityReady && visualContinuity ? (
          <Suspense fallback={<SharedLifeUniverseFallback />}>
            <RealityLifeUniverseCanvas visualContinuity={visualContinuity} />
          </Suspense>
        ) : (
          <SharedLifeUniverseFallback />
        )}
      </div>

      {visibleLifeImprints.length > 0 ? (
        <section
          aria-label="生命骨架中的历史印记"
          data-personality-ring-memory-field="SAME_BODY_ACCUMULATION"
          data-personality-ring-memory-budget={visibleLifeImprints.length}
          data-personality-ring-time-axis="CREATED_AT_MEMORY_DEPTH"
          data-personality-ring-pressure-axis="PRESSURE_FIELD_BREATH_PHASE"
          data-time-axis-start={oldestVisibleTime || "NONE"}
          data-time-axis-end={newestVisibleTime || "NONE"}
          style={{
            position: "absolute",
            zIndex: 1,
            inset: 0,
            pointerEvents: "none",
          }}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            data-personality-ring-life-imprint-anchor="LIFE_CORE_TO_ACTIVE_SEVEN_MANSION_BODY"
            data-personality-ring-life-imprint-topology="ATTACHED_NO_SECOND_SYMBOL"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              display: "block",
              overflow: "visible",
            }}
          >
            {visibleLifeImprints
              .filter(({ entry }) => entry.createdAt !== selectedEntry?.createdAt)
              .map(({ entry, timePosition, pressureFieldDepth, geometry }) => {
                const pathDensity = visibleLifeImprints.filter(
                  (candidate) => candidate.geometry.path === geometry.path,
                ).length;
                const traceOpacity =
                  (0.055 + timePosition * 0.07) / Math.sqrt(pathDensity);
                return (
                  <g
                    key={entry.id}
                    className="gy-personality-ring__memory-trace"
                    data-personality-ring-memory-trace="DIM_ARCHIVED_BODY_BRANCH"
                    data-imprint-created-at={entry.createdAt}
                    data-imprint-time-position={timePosition.toFixed(6)}
                    data-imprint-pressure-position={pressureFieldDepth.toFixed(6)}
                    style={{
                      opacity: traceOpacity,
                      animationDuration: `${6.8 + pressureFieldDepth * 2.4}s`,
                      animationDelay: `${-pressureFieldDepth * 5.4}s`,
                    }}
                  >
                    <path
                      d={geometry.path}
                      fill="none"
                      stroke="rgba(185,203,236,0.9)"
                      strokeWidth="0.28"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <rect
                      x={geometry.target[0] - 0.2}
                      y={geometry.target[1] - 0.2}
                      width="0.4"
                      height="0.4"
                      rx="0.07"
                      fill="rgba(185,203,236,0.88)"
                    />
                  </g>
                );
              })}
            {selectedImprintGeometry && selectedEntry ? (
              <g
                key={selectedEntry.id}
                className={`gy-personality-ring__selected-body-trace${
                  isCrystalArrival
                    ? " gy-personality-ring__arrival-body-trace"
                    : ""
                }`}
                data-personality-ring-memory-trace={
                  isCrystalArrival
                    ? "CURRENT_CRYSTAL_SETTLING_IN_SAME_BODY"
                    : "BRIGHT_SELECTED_BODY_BRANCH"
                }
                data-personality-ring-imprint-form="BODY_TEXTURE_NOT_COLLECTIBLE"
                data-personality-ring-imprint-temporal-state={
                  isCrystalArrival
                    ? "SETTLING_FROM_PRESENT_INTO_MEMORY"
                    : "REMEMBERED_BODY_TEXTURE"
                }
              >
                <path
                  d={selectedImprintGeometry.path}
                  fill="none"
                  stroke="rgba(232,200,138,0.15)"
                  strokeWidth="1.45"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="blur(1.15px)"
                />
                <path
                  d={selectedImprintGeometry.path}
                  fill="none"
                  stroke="rgba(255,239,190,0.74)"
                  strokeWidth="0.58"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            ) : null}
          </svg>

          {selectedLifeImprint ? (
            <button
              type="button"
              aria-label="回望上一道生命印记"
              className="gy-personality-ring__selected-memory-node"
              data-personality-ring-memory-target="SELECTED_NODE_ONLY"
              data-imprint-created-at={selectedLifeImprint.entry.createdAt}
              data-imprint-time-position={selectedLifeImprint.timePosition.toFixed(6)}
              data-imprint-pressure-field={selectedLifeImprint.pressureField}
              data-imprint-pressure-position={selectedLifeImprint.pressureFieldDepth.toFixed(6)}
              onClick={() => {
                const selectedIndex = visibleLifeImprints.findIndex(
                  (candidate) =>
                    candidate.entry.createdAt === selectedLifeImprint.entry.createdAt,
                );
                const replayTarget =
                  visibleLifeImprints[
                    selectedIndex >= 0
                      ? (selectedIndex + 1) % visibleLifeImprints.length
                      : 0
                  ];
                if (!replayTarget) return;
                replayLifeImprint(
                  replayTarget.entry.createdAt,
                  replayTarget.entry.pressure.pressureField,
                );
              }}
              style={{
                position: "absolute",
                zIndex: 2_000_000,
                left: `${selectedLifeImprint.geometry.target[0]}%`,
                top: `${selectedLifeImprint.geometry.target[1]}%`,
                width: 30,
                height: 30,
                border: 0,
                borderRadius: "50%",
                padding: 0,
                background: "transparent",
                transform: "translate(-50%, -50%)",
                cursor: "pointer",
                pointerEvents: "auto",
              }}
            />
          ) : null}
        </section>
      ) : null}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(2,3,6,0.34), transparent 28%, transparent 62%, rgba(2,3,6,0.9) 100%)",
          pointerEvents: "none",
        }}
      />

      {selectedEntry && imprintReplaySequence > 0 ? (
        <div
          key={`${selectedEntry.id}:${imprintReplaySequence}`}
          aria-hidden="true"
          className="gy-personality-ring__replay"
          data-life-imprint-replay="SELECTED_BODY_TRACE_TO_SAME_CORE"
          data-life-imprint-origin-created-at={selectedEntry.createdAt}
          data-life-imprint-pressure-coordinate="ARCHIVED_PRESSURE_FIELD_PHASE"
          data-life-imprint-pressure-position={imprintReplayPressurePosition.toFixed(6)}
        >
          <div
            className="gy-personality-ring__life-echo"
            data-life-imprint-response="CORE_RECOGNITION_OF_ATTACHED_MEMORY"
            data-life-imprint-axis={selectedLifeImprintAxis}
          >
            <span />
          </div>
        </div>
      ) : null}

      <header
        style={{
          position: "absolute",
          zIndex: 3,
          top: "max(20px, env(safe-area-inset-top))",
          right: 20,
          left: 20,
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
        }}
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{
            justifySelf: "start",
            border: 0,
            padding: "7px 0",
            background: "transparent",
            color: "rgba(220,205,169,0.48)",
            fontSize: 10,
            letterSpacing: "0.08em",
          }}
        >
          返回
        </button>
        <span
          style={{
            color: "rgba(220,205,169,0.58)",
            fontSize: 10,
            letterSpacing: "0.16em",
          }}
        >
          生命年轮
        </span>
        <span />
      </header>

      <section
        aria-live="polite"
        data-personality-ring-memory-reveal={
          imprintMemoryVisible
            ? visualContinuityReady
              ? "VISIBLE_AFTER_CORE"
              : "VISIBLE_WITHOUT_IDENTITY_REPLAY"
            : "WITHDRAWN_DURING_RETURN"
        }
        style={{
          position: "absolute",
          zIndex: 3,
          right: 30,
          bottom: "max(54px, calc(30px + env(safe-area-inset-bottom)))",
          left: 30,
          display: "grid",
          justifyItems: "center",
          gap: 10,
          textAlign: "center",
          textShadow: "0 0 22px rgba(2,3,6,0.96)",
          opacity: imprintMemoryVisible ? 1 : 0,
          transform: imprintMemoryVisible ? "translateY(0)" : "translateY(5px)",
          transition: "opacity 360ms ease, transform 520ms cubic-bezier(0.2, 0.72, 0.22, 1)",
        }}
      >
        <strong
          data-personality-ring-selected-imprint="LIFE_IMPRINT_LINE"
          style={{
            maxWidth: 314,
            color: isCrystalArrival
              ? "rgba(245,236,210,0.72)"
              : "rgba(255,239,196,0.9)",
            fontSize: isCrystalArrival ? 13 : 16,
            lineHeight: isCrystalArrival ? 1.72 : 1.65,
            fontWeight: isCrystalArrival ? 540 : 620,
            textWrap: "balance",
          }}
        >
          {revealedEntry?.crystal.copy ?? "你的第一道生命印记，仍在星河中等待发生。"}
        </strong>
        {revealedEntry && isCrystalArrival ? (
          <span
            data-personality-ring-arrival-copy="CHANGE_REMEMBERED_BY_LIFE"
            style={{
              color: "rgba(220,205,169,0.58)",
              fontSize: 10,
              lineHeight: 1.65,
              letterSpacing: "0.06em",
            }}
          >
            这次回应，已经成为生命走过的一道纹理。
          </span>
        ) : null}
        {revealedEntry ? (
          <time
            dateTime={revealedEntry.createdAt}
            style={{ color: "rgba(199,169,107,0.42)", fontSize: 9, letterSpacing: "0.08em" }}
          >
            {formatRingTime(revealedEntry.createdAt)}
          </time>
        ) : (
          <button
            type="button"
            onClick={() => navigate("/launch-lab")}
            style={{
              border: 0,
              borderBottom: "1px solid rgba(199,169,107,0.26)",
              padding: "5px 2px",
              background: "transparent",
              color: "rgba(255,226,158,0.64)",
              fontSize: 10,
            }}
          >
            回到生命星河
          </button>
        )}
      </section>
    </main>
  );
}
