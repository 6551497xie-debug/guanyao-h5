import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (path) =>
  readFileSync(resolve(process.cwd(), path), "utf8");

const gravity = read("src/pages/GravityPage.tsx");
const styles = read("src/styles/xinmai-inner-view-choice-continuity.css");

const requireSource = (source, fragment, message) => {
  if (!source.includes(fragment)) {
    throw new Error(message);
  }
};

for (const phase of [
  "MERIDIAN_SETTLING",
  "LIFE_PAUSING",
  "RESPONSE_GAP_OPEN",
]) {
  requireSource(
    gravity,
    `"${phase}"`,
    `Choice transition phase ${phase} is missing.`,
  );
  requireSource(
    styles,
    `data-choice-transition-phase="${phase}"`,
    `Choice visual phase ${phase} is not represented.`,
  );
}

requireSource(
  gravity,
  'data-choice-transition-source="THIRD_APPROACH_SAME_BODY_MERIDIAN"',
  "Choice must continue from the third approach on the same body.",
);
requireSource(
  gravity,
  'data-choice-body-continuity-layer="EXISTING_BIRTH_MANSION_BODY"',
  "Choice must reuse the existing birth-mansion life body.",
);
requireSource(
  gravity,
  'data-choice-transition-source="SAME_MERIDIAN_AFTER_PAUSE"',
  "The new response space must retain the same meridian after the pause.",
);
requireSource(
  gravity,
  'innerViewRelation !== "AWAITING"',
  "Choice availability must depend on a user-established Inner View relation.",
);
requireSource(
  gravity,
  'data-choice-availability=',
  "Choice must expose whether the response gap is genuinely available.",
);
requireSource(
  gravity,
  'data-choice-crystal-stage="NOT_STARTED"',
  "Crystal must remain unavailable during the response-gap transition.",
);
requireSource(
  gravity,
  'data-choice-answer-model="NONE"',
  "The response gap must not become an answer model.",
);
requireSource(
  gravity,
  'data-choice-new-path="NONE"',
  "The response gap must not draw a second answer road.",
);
requireSource(
  styles,
  ".gy-choice-response-gap__body-continuity",
  "The same-body visual continuity layer is missing.",
);

const continuityLayerCount = gravity
  .split('data-choice-body-continuity-layer="EXISTING_BIRTH_MANSION_BODY"')
  .length - 1;
if (continuityLayerCount < 2) {
  throw new Error(
    "The same life body must remain visible both before and after Choice participation.",
  );
}

for (const forbidden of [
  "正确答案",
  "选择成功",
  "获得奖励",
  "新生命核心",
  "技能释放",
]) {
  if (gravity.includes(forbidden) || styles.includes(forbidden)) {
    throw new Error(`Forbidden Choice transition language detected: ${forbidden}`);
  }
}

console.log(
  "XINMAI third approach -> Choice response continuity gate: PASS",
);
