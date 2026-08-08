import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (path) =>
  readFileSync(resolve(process.cwd(), path), "utf8");

const canvas = read("src/components/RealityLifeUniverseCanvas.tsx");
const host = read("src/components/RealityProductionHost.tsx");
const renderer = read("src/renderers/genesisWebGLRendererCore.ts");

const requireSource = (source, fragment, message) => {
  if (!source.includes(fragment)) {
    throw new Error(message);
  }
};

requireSource(
  canvas,
  'status: "WAITING" as const,\n        // A persisted projection belongs to history.',
  "Reality must not consume a persisted pressure projection as the current event.",
);
requireSource(
  canvas,
  "projection: null",
  "A new Reality must remain visually quiet before current recognition.",
);
requireSource(
  canvas,
  '"CURRENT_REALITY_SENSING"',
  "The recognized current event must enter through a restrained sensing phase.",
);
requireSource(
  canvas,
  '"data-reality-life-weather-source":',
  "The visual consumer must expose the source of current life weather.",
);
requireSource(
  canvas,
  '"CURRENT_RECOGNIZED_REALITY_ONLY"',
  "Only the currently recognized Reality may drive current life weather.",
);
requireSource(
  host,
  '"CURRENT_REALITY_MOVING_THROUGH_SAME_LIFE"',
  "Reality must describe current state change on the same life.",
);
requireSource(
  host,
  'data-reality-life-weather-memory-boundary="PAST_IN_BODY_NOT_CURRENT_STATE"',
  "Past memory must remain in the body without becoming the current state.",
);
requireSource(
  host,
  'data-reality-life-weather-identity-invariant="SAME_CORE_SAME_BODY_SAME_LIFE"',
  "Current weather must preserve life identity.",
);
requireSource(
  renderer,
  "realityLifeWeatherProgress",
  "The existing renderer must consume the restrained life-weather transition.",
);
requireSource(
  renderer,
  ") * realityLifeWeatherProgress;",
  "Current pressure expression must be gated by current life-weather progress.",
);

for (const forbidden of [
  "new Dust",
  "battle",
  "skill",
  "damage",
  "defeat",
]) {
  if (canvas.includes(forbidden) || host.includes(forbidden)) {
    throw new Error(`Forbidden current-weather language detected: ${forbidden}`);
  }
}

console.log("XINMAI new Reality life-weather response gate: PASS");
