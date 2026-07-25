import { LIFE_UNIVERSE_CORE_IDENTITY } from "../renderers/lifeUniverseStarField";
import "../styles/reality-gravity-presentation.css";

const RESPONSE_PATHS = Object.freeze([
  "M 91 23 C 77 24, 75 39, 56 44 C 47 46, 45 53, 56 58",
  "M 94 35 C 79 34, 73 43, 55 46 C 46 48, 46 55, 58 59",
  "M 89 49 C 75 45, 68 48, 54 47 C 47 48, 49 55, 60 57",
]);

const RESPONSE_DEPOSITS = Object.freeze([
  [55.2, 46.1, 0.46],
  [52.8, 47.4, 0.34],
  [55.8, 49.2, 0.3],
  [53.6, 51.1, 0.26],
  [57.1, 53.4, 0.22],
  [59.2, 56.1, 0.18],
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
  const visiblePathCount = Math.max(1, Math.ceil(safeDepth / 2));

  return (
    <div
      aria-hidden="true"
      className="gy-gravity-inertia-field"
      data-gravity-visual-consumer="REPEATED_RESPONSE_PATH"
      data-inertia-path-state={visible ? "FORMING" : "WAITING"}
      data-inertia-meaning="FREQUENT_NOT_FIXED"
      data-life-identity-effect="STATE_ONLY"
      data-choice-space="RESERVED_NOT_ACTIVE"
      data-observation-entry={activeObservation}
      data-repetition-depth={safeDepth}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <g
          className="gy-gravity-inertia-field__direction"
          style={{
            transformOrigin: `${LIFE_UNIVERSE_CORE_IDENTITY.anchorX * 100}% ${LIFE_UNIVERSE_CORE_IDENTITY.anchorY * 100}%`,
          }}
        >
          {RESPONSE_PATHS.slice(0, visiblePathCount).map((path, index) => (
            <path
              key={path}
              className="gy-gravity-inertia-field__path"
              data-response-trace={index + 1}
              d={path}
              pathLength="1"
              style={{
                animationDelay: `${index * 820}ms`,
                opacity: visible ? 0.18 + index * 0.06 : 0,
              }}
            />
          ))}
          {RESPONSE_DEPOSITS.slice(0, safeDepth).map(
            ([cx, cy, opacity], index) => (
              <circle
                key={`${cx}-${cy}`}
                className="gy-gravity-inertia-field__deposit"
                cx={cx}
                cy={cy}
                r={index === 0 ? 0.42 : 0.24}
                style={{
                  animationDelay: `${1_000 + index * 460}ms`,
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
