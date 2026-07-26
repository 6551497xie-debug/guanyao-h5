import { LIFE_UNIVERSE_CORE_IDENTITY } from "../renderers/lifeUniverseStarField";
import "../styles/reality-gravity-presentation.css";

const RESPONSE_TENDENCIES = Object.freeze([
  "M 52 50 C 57 50, 60 47, 64 44 C 68 41, 71 38, 76 35",
  "M 52 52 C 57 53, 60 50, 64 47 C 68 44, 70 41, 75 39",
]);

const RECOVERY_SEDIMENTS = Object.freeze([
  [53.4, 49.7, 0.2],
  [55.1, 49.1, 0.16],
  [56.6, 48.2, 0.12],
] as const);

export function RealityGravityInertiaField({
  repetitionDepth,
  activeObservation,
  visible,
}: Readonly<{
  repetitionDepth: number;
  activeObservation: string;
  visible: boolean;
}>) {
  const safeDepth = Math.max(1, Math.min(6, repetitionDepth));

  return (
    <div
      aria-hidden="true"
      className="gy-gravity-inertia-field"
      data-gravity-visual-consumer="RECOVERED_TRACE_RESPONSE_BIAS"
      data-inertia-path-state={
        visible ? "MEMORY_GUIDING" : "MEMORY_RESTING"
      }
      data-inertia-meaning="PAST_SHAPES_NEXT_RESPONSE_NOT_DESTINY"
      data-recovery-trace-consumption="DIRECTIONAL_BIAS_ONLY"
      data-life-identity-effect="STATE_ONLY"
      data-choice-space="RESERVED_NOT_ACTIVE"
      data-observation-entry={activeObservation}
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
                opacity: visible ? 0.32 - index * 0.075 : 0,
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
                  opacity: visible ? opacity : 0,
                }}
              />
            ),
          )}
        </g>
      </svg>
    </div>
  );
}
