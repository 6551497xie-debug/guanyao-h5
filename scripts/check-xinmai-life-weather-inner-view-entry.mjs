import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (path) =>
  readFileSync(resolve(process.cwd(), path), "utf8");

const host = read("src/components/RealityProductionHost.tsx");
const canvas = read("src/components/RealityLifeUniverseCanvas.tsx");
const presentation = read("src/components/RealityPressureSeedPresentation.tsx");
const styles = read("src/styles/reality-inner-view-entry.css");

const requireSource = (source, fragment, message) => {
  if (!source.includes(fragment)) {
    throw new Error(message);
  }
};

requireSource(
  host,
  '"AWAITING_BODY_APPROACH"',
  "A recognized Reality must wait for the user to approach the life body.",
);
requireSource(
  host,
  'data-inner-view-entry-source="CURRENT_LIFE_WEATHER_ON_SAME_BODY"',
  "Inner View must originate from current life weather on the same body.",
);
requireSource(
  host,
  'data-inner-view-entry-action="USER_APPROACH_REQUIRED"',
  "Inner View must require an explicit user approach.",
);
requireSource(
  host,
  'data-inner-view-analysis-stage="NOT_STARTED"',
  "Approaching life must happen before analysis begins.",
);
requireSource(
  canvas,
  'aria-label="靠近生命正在变化的位置"',
  "The approach action must live on the changing life position.",
);
requireSource(
  canvas,
  'data-inner-view-entry="SAME_BODY_LIFE_WEATHER_TRACE"',
  "The interaction must remain attached to the same life body.",
);
requireSource(
  canvas,
  'data-inner-view-entry-visual="HAIRLINE_BREATH_NOT_SECOND_CORE"',
  "The Inner View marker must not become a second life core.",
);
requireSource(
  presentation,
  'data-direct-gravity-action="WITHHELD"',
  "The conventional direct-to-Gravity action must be withheld.",
);
requireSource(
  presentation,
  "轻触生命本身，靠近它。",
  "The user must be invited to approach life rather than start analysis.",
);

if (presentation.includes('data-interaction="CONTINUE_TO_GRAVITY"')) {
  throw new Error(
    "The presentation must not bypass life by exposing a direct Gravity button.",
  );
}

for (const forbidden of ["诊断", "扫描", "病灶", "解谜", "奖励"]) {
  if (presentation.includes(forbidden) || styles.includes(forbidden)) {
    throw new Error(`Forbidden Inner View language detected: ${forbidden}`);
  }
}

console.log("XINMAI life-weather -> Inner View entry gate: PASS");
