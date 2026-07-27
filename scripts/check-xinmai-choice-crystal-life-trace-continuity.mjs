import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (path) =>
  readFileSync(resolve(process.cwd(), path), "utf8");

const gravity = read("src/pages/GravityPage.tsx");
const styles = read("src/styles/xinmai-choice-crystal-life-trace.css");

const requireSource = (source, fragment, message) => {
  if (!source.includes(fragment)) {
    throw new Error(message);
  }
};

requireSource(
  gravity,
  'data-choice-response-trace-sequence="FLOW_THEN_SETTLE_THEN_TRACE"',
  "Choice must let the new flow settle before leaving a life trace.",
);
requireSource(
  gravity,
  'data-choice-response-trace-continuity="SAME_SOURCE_POSITION_SAME_BODY"',
  "The response trace must stay at the same source position and body.",
);
requireSource(
  gravity,
  'data-choice-response-trace-form="MERIDIAN_MEMORY_NOT_OBJECT"',
  "The response trace must remain a meridian memory, not a collectible.",
);
requireSource(
  gravity,
  'data-choice-crystal-materialization="NOT_STARTED"',
  "Choice must not materialize a Crystal before lived recognition.",
);
requireSource(
  gravity,
  'data-choice-life-trace="PRE_CRYSTAL_BODY_MEMORY"',
  "The same life body needs a restrained pre-Crystal memory trace.",
);
requireSource(
  gravity,
  "resolveLifeUniverseCrystalSourceSlot(responseDimension)",
  "Choice and Crystal must consume the same existing source-slot mapping.",
);
requireSource(
  gravity,
  'responseDimension={',
  "The active response dimension must enter the existing visual consumer.",
);
requireSource(
  gravity,
  '"NEW_FLOW" | "LIFE_SETTLING" | "QUIET_TRACE"',
  "The visual sequence must distinguish flow, settling, and quiet trace.",
);
requireSource(
  gravity,
  "这里留下了一点未被命名的变化",
  "The trace must be framed as an unclaimed change, not a reward.",
);
requireSource(
  styles,
  '.gy-choice-response-gap[data-choice-response-trace-phase="QUIET_TRACE"]',
  "The quiet trace must have a distinct settled visual state.",
);
requireSource(
  styles,
  "xinmai-choice-response-memory",
  "The settled trace needs a low-frequency memory rhythm.",
);

for (const forbidden of [
  "获得Crystal",
  "Crystal已生成",
  "领取印记",
  "奖励解锁",
  "升级成功",
]) {
  if (gravity.includes(forbidden) || styles.includes(forbidden)) {
    throw new Error(`Forbidden reward language detected: ${forbidden}`);
  }
}

console.log("XINMAI Choice breath -> Crystal life trace continuity gate: PASS");
