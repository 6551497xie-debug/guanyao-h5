import { useEffect, useRef } from "react";
import { LIFE_UNIVERSE_CORE_IDENTITY } from "../renderers/lifeUniverseStarField";
import { projectGravityObservationSurfaceOutcomes } from "../services/gravityEntryAcceptanceRuntimePort";
import type {
  GravityObservationSurfaceOutcome,
  GravitySurfaceAdmissionAttempt,
} from "../types/xinmaiGravitySurfaceAdmission";
import type {
  XinmaiRealityGravityChoiceSceneSemanticProjection,
} from "../types/xinmaiRealityGravityChoiceSceneSemanticPresentation";
import "../styles/reality-gravity-presentation.css";
import { useXinmaiContinuousSceneHost } from "./XinmaiContinuousSceneHostContext";

const RESPONSE_TENDENCIES = Object.freeze([
  "M 52 50 C 57 50, 60 47, 64 44 C 68 41, 71 38, 76 35",
  "M 52 52 C 57 53, 60 50, 64 47 C 68 44, 70 41, 75 39",
]);

const RECOVERY_SEDIMENTS = Object.freeze([
  [53.4, 49.7, 0.2],
  [55.1, 49.1, 0.16],
  [56.6, 48.2, 0.12],
] as const);

const CHOICE_FIELD_PATHS = Object.freeze({
  protection:
    "M 51 51 C 46 47, 40 43, 33 39 C 27 36, 23 33, 19 29",
  possibility:
    "M 51 51 C 57 48, 63 44, 69 39 C 74 35, 79 32, 84 28",
});

export function RealityGravityInertiaField({
  repetitionDepth,
  activeObservation,
  visible,
  semanticProjection,
  gravitySurfaceAdmissionAttempt,
  onGravityObservationSurfaceOutcome,
}: Readonly<{
  repetitionDepth: number;
  activeObservation: string;
  visible: boolean;
  semanticProjection:
    | XinmaiRealityGravityChoiceSceneSemanticProjection
    | null;
  gravitySurfaceAdmissionAttempt?: GravitySurfaceAdmissionAttempt;
  onGravityObservationSurfaceOutcome?: (
    outcome: GravityObservationSurfaceOutcome,
  ) => void;
}>) {
  const safeDepth = Math.max(1, Math.min(6, repetitionDepth));
  const lastOutcomeKeyRef = useRef<string | null>(null);
  const { currentOutcome: continuousSceneOutcome } =
    useXinmaiContinuousSceneHost();
  const motionPresented =
    continuousSceneOutcome?.status ===
    "CONTINUOUS_SCENE_MOTION_PRESENTED";
  const reducedMotion =
    continuousSceneOutcome?.status ===
    "CONTINUOUS_SCENE_STATIC_PRESENTED";
  const semanticStage =
    semanticProjection?.status === "PRESENTABLE"
      ? semanticProjection.semanticStage
      : "SAFE_WITHHELD";
  const observationVisible =
    visible &&
    (semanticStage === "GRAVITY_OBSERVING" ||
      semanticStage === "GRAVITY_RECOGNIZED");
  const choiceReady = visible && semanticStage === "CHOICE_READY";
  const choiceCommitted =
    visible && semanticStage === "CHOICE_COMMITTED";

  useEffect(() => {
    if (
      !visible ||
      gravitySurfaceAdmissionAttempt === undefined ||
      continuousSceneOutcome === null ||
      continuousSceneOutcome.consumerSurface !== "GRAVITY_CHOICE" ||
      (!motionPresented && !reducedMotion)
    ) {
      return;
    }
    const key =
      `${gravitySurfaceAdmissionAttempt.admissionReferenceId}:` +
      `${gravitySurfaceAdmissionAttempt.gravityCycleId}:` +
      `${gravitySurfaceAdmissionAttempt.admissionRevision}`;
    if (lastOutcomeKeyRef.current === key) return;
    lastOutcomeKeyRef.current = key;
    const typedOutcome = Object.freeze({
      ...gravitySurfaceAdmissionAttempt,
      status: "GRAVITY_OBSERVATION_SURFACE_PRESENTED" as const,
      sourceReferenceId:
        gravitySurfaceAdmissionAttempt.identityReferences
          .sourceReferenceId,
      surfaceMode: reducedMotion
        ? "STATIC_FIRST_GRAVITY_OBSERVATION" as const
        : "MOTION_FIRST_GRAVITY_OBSERVATION" as const,
      currentRealityTraceVisible: true as const,
      firstObservationAffordanceAvailable: true as const,
      presentedAt: new Date().toISOString(),
    });
    for (const projectedOutcome of
      projectGravityObservationSurfaceOutcomes(typedOutcome)) {
      onGravityObservationSurfaceOutcome?.(projectedOutcome);
    }
  }, [
    gravitySurfaceAdmissionAttempt,
    continuousSceneOutcome,
    motionPresented,
    onGravityObservationSurfaceOutcome,
    reducedMotion,
    visible,
  ]);

  return (
    <div
      aria-hidden="true"
      className="gy-gravity-inertia-field"
      data-gravity-visual-consumer="RECOVERED_TRACE_RESPONSE_BIAS"
      data-inertia-path-state={
        observationVisible
          ? "MEMORY_GUIDING"
          : choiceReady
            ? "CHOICE_COMPARISON_READY"
            : choiceCommitted
              ? "CHOICE_DIRECTION_HELD"
              : "MEMORY_RESTING"
      }
      data-inertia-meaning="PAST_SHAPES_NEXT_RESPONSE_NOT_DESTINY"
      data-recovery-trace-consumption="DIRECTIONAL_BIAS_ONLY"
      data-life-identity-effect="STATE_ONLY"
      data-choice-space={
        choiceReady
          ? "PROTECTION_BENEFIT_COST_BALANCE"
          : choiceCommitted
            ? "COMMITTED_NOT_LIVED"
            : "RESERVED_NOT_ACTIVE"
      }
      data-scene-semantic-stage={semanticStage}
      data-observation-entry={activeObservation}
      data-observation-surface-mode={
        reducedMotion
          ? "STATIC_FIRST_GRAVITY_OBSERVATION"
          : "MOTION_FIRST_GRAVITY_OBSERVATION"
      }
      data-repetition-depth={safeDepth}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient
            id="gy-gravity-memory-guidance"
            x1="51%"
            y1="50%"
            x2="77%"
            y2="35%"
          >
            <stop offset="0%" stopColor="rgb(230 222 204 / 42%)" />
            <stop offset="52%" stopColor="rgb(185 203 236 / 28%)" />
            <stop offset="100%" stopColor="rgb(185 203 236 / 4%)" />
          </linearGradient>
        </defs>
        <g
          className="gy-gravity-inertia-field__direction"
          style={{
            transformOrigin: `${LIFE_UNIVERSE_CORE_IDENTITY.anchorX * 100}% ${LIFE_UNIVERSE_CORE_IDENTITY.anchorY * 100}%`,
          }}
        >
          {RESPONSE_TENDENCIES.map((path, index) => (
            <path
              key={path}
              className="gy-gravity-inertia-field__path"
              data-response-tendency={index + 1}
              d={path}
              pathLength="1"
              stroke="url(#gy-gravity-memory-guidance)"
              style={{
                animationDelay: `${index * 2_700}ms`,
                  opacity: observationVisible
                    ? 0.32 - index * 0.075
                    : 0,
              }}
            />
          ))}
          {RECOVERY_SEDIMENTS.map(
            ([cx, cy, opacity], index) => (
              <circle
                key={`${cx}-${cy}`}
                className="gy-gravity-inertia-field__deposit"
                cx={cx}
                cy={cy}
                r={index === 0 ? 0.28 : 0.19}
                style={{
                  animationDelay: `${900 + index * 520}ms`,
                  opacity: observationVisible ? opacity : 0,
                }}
              />
            ),
          )}
        </g>
        <g
          data-choice-force-field={
            choiceReady
              ? "COMPARABLE_WITHOUT_JUDGMENT"
              : choiceCommitted
                ? "COMMITTED_WITHOUT_COMPLETION"
                : "INACTIVE"
          }
          style={{
            opacity: choiceReady || choiceCommitted ? 1 : 0,
            transition: reducedMotion ? "none" : "opacity 420ms ease",
          }}
        >
          <path
            d={CHOICE_FIELD_PATHS.protection}
            fill="none"
            stroke="rgba(210, 224, 238, 0.34)"
            strokeWidth="0.42"
            strokeLinecap="round"
            strokeDasharray={choiceCommitted ? "1.4 2.8" : "none"}
          />
          <path
            d={CHOICE_FIELD_PATHS.possibility}
            fill="none"
            stroke="rgba(222, 202, 156, 0.42)"
            strokeWidth={choiceCommitted ? "0.72" : "0.42"}
            strokeLinecap="round"
          />
          <circle
            cx="19"
            cy="29"
            r="1.15"
            fill="rgba(210, 224, 238, 0.42)"
          />
          <circle
            cx="84"
            cy="28"
            r={choiceCommitted ? "1.8" : "1.15"}
            fill="rgba(222, 202, 156, 0.52)"
          />
          <circle
            cx="51"
            cy="51"
            r="1.4"
            fill="rgba(245, 241, 226, 0.56)"
          />
        </g>
      </svg>
    </div>
  );
}
