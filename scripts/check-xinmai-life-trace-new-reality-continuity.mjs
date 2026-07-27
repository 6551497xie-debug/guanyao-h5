import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (path) =>
  readFileSync(resolve(process.cwd(), path), "utf8");

const gravity = read("src/pages/GravityPage.tsx");
const route = read("src/pages/RealityProductionRouteEntry.tsx");
const host = read("src/components/RealityProductionHost.tsx");
const canvas = read("src/components/RealityLifeUniverseCanvas.tsx");
const styles = read(
  "src/styles/xinmai-choice-life-trace-reality-continuity.css",
);

const requireSource = (source, fragment, message) => {
  if (!source.includes(fragment)) {
    throw new Error(message);
  }
};

requireSource(
  gravity,
  "choiceLifeTraceMemoryKey: choiceResponseTraceIdentityKey",
  "Choice must carry the exact visual trace identity into the new Reality.",
);
requireSource(
  gravity,
  "choiceLifeTraceSourceSlot: choiceResponseTraceSourceSlot",
  "Choice must carry the existing response source slot into Reality.",
);
requireSource(
  route,
  "choiceLifeTraceMemoryKey={choiceLifeTraceMemoryKey}",
  "Reality Route Entry must pass the carried trace to its existing host.",
);
requireSource(
  route,
  "choiceLifeTraceSourceSlot={choiceLifeTraceSourceSlot}",
  "Reality Route Entry must preserve the carried trace source slot.",
);
requireSource(
  host,
  'data-choice-life-trace-continuity=',
  "Reality Host must expose the same-body trace continuity.",
);
requireSource(
  host,
  '"SAME_TRACE_SAME_BODY_NEW_REALITY"',
  "The carried trace must remain on the same life body.",
);
requireSource(
  host,
  'data-choice-life-trace-pressure-role="MEMORY_INFLUENCE_NOT_CURRENT_PRESSURE"',
  "The carried trace must not restore old pressure as the current event.",
);
requireSource(
  host,
  'data-choice-crystal-stage="NOT_STARTED"',
  "A carried Choice trace must not claim Crystal materialization.",
);
requireSource(
  canvas,
  'data-choice-life-trace-memory="SAME_BODY_FROM_CHOICE"',
  "The existing Reality canvas must render the carried trace on the life body.",
);
requireSource(
  canvas,
  'data-choice-life-trace-crystal-state="NOT_MATERIALIZED"',
  "The Reality trace must remain pre-Crystal.",
);
requireSource(
  canvas,
  "identityKey: choiceLifeTraceMemoryKey",
  "Reality must consume the exact Choice trace geometry key.",
);
requireSource(
  styles,
  ".gy-reality-life-universe__choice-life-trace",
  "The carried trace needs a restrained Reality visual state.",
);

for (const forbidden of [
  "RESTORE_OLD_PRESSURE",
  "CRYSTAL_GENERATED",
  "成长完成",
  "获得奖励",
  "升级",
]) {
  if (
    gravity.includes(forbidden) ||
    route.includes(forbidden) ||
    host.includes(forbidden) ||
    canvas.includes(forbidden) ||
    styles.includes(forbidden)
  ) {
    throw new Error(`Forbidden continuity claim detected: ${forbidden}`);
  }
}

console.log("XINMAI life trace -> new Reality continuity gate: PASS");
