import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (path) =>
  readFileSync(resolve(process.cwd(), path), "utf8");

const gravity = read("src/pages/GravityPage.tsx");
const guide = read("src/components/XinmaiLifeReflectionGuide.tsx");
const productionSurfaceHost = read(
  "src/components/GravityProductionSurfaceHost.tsx",
);
const styles = read("src/styles/xinmai-inner-view-three-approach.css");

const requireSource = (source, fragment, message) => {
  if (!source.includes(fragment)) {
    throw new Error(message);
  }
};

requireSource(
  productionSurfaceHost,
  'innerViewEntry="CURRENT_LIFE_WEATHER_BODY_APPROACHED"',
  "The production Gravity Host must preserve the explicit same-body Inner View handoff.",
);
requireSource(
  gravity,
  'data-inner-view-entry-continuity=',
  "Gravity must expose the Reality-to-Inner-View body continuity.",
);
requireSource(
  gravity,
  'data-dynamics-inner-view-sequence="SEE_UNDERSTAND_TRANSFORM"',
  "Inner View must preserve the see-understand-transform sequence.",
);
requireSource(
  gravity,
  'data-inner-view-meridian-source="EXISTING_BIRTH_MANSION_BODY_RELATION"',
  "The revelation must consume the existing life-body relation.",
);
requireSource(
  gravity,
  'data-inner-view-meridian-scoring="NONE"',
  "The meridian revelation must never become a score.",
);
requireSource(
  gravity,
  'data-inner-view-meridian-revelation="SAME_BODY"',
  "The revealed flow must stay inside the same life body.",
);
requireSource(
  gravity,
  'phase === "CONFIRMED" || phase === "SELF_NAMED"',
  "Choice must remain gated until the user establishes the relation.",
);

const firstApproach = guide.indexOf("第一次靠近 · 看见");
const secondApproach = guide.indexOf("第二次靠近 · 理解");
const thirdApproach = guide.indexOf("第三次靠近 · 让它流动");
if (
  firstApproach < 0 ||
  secondApproach <= firstApproach ||
  thirdApproach <= secondApproach
) {
  throw new Error("The three user-led approaches are missing or out of order.");
}

for (const phase of [
  "FIRST_APPROACH",
  "SECOND_APPROACH",
  "THIRD_APPROACH",
]) {
  requireSource(
    guide,
    `"${phase}"`,
    `Inner View phase ${phase} is missing.`,
  );
  requireSource(
    gravity,
    `"${phase}"`,
    `Gravity does not consume Inner View phase ${phase}.`,
  );
}

requireSource(
  guide,
  "先看见这处变化，不急着把它解释成你。",
  "The first approach must reveal before interpreting.",
);
requireSource(
  guide,
  "这种回应，也许曾经用自己的方式保护过你。",
  "The second approach must validate a protective possibility.",
);
requireSource(
  guide,
  "回应仍然由你决定。",
  "The third approach must return agency to the user.",
);
requireSource(
  styles,
  ".gy-inner-view-life-meridian__flow",
  "The same-body life flow needs a quiet visual language.",
);

for (const forbidden of ["诊断", "人格评分", "奖励动画", "解锁成功"]) {
  if (
    guide.includes(forbidden) ||
    gravity.includes(forbidden) ||
    styles.includes(forbidden)
  ) {
    throw new Error(`Forbidden Inner View language detected: ${forbidden}`);
  }
}

console.log("XINMAI Inner View three-approach life revelation gate: PASS");
