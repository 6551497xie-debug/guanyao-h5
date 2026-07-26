import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const read = (relativePath) =>
  readFileSync(path.join(root, relativePath), "utf8");

const realitySource = read(
  "src/components/RealityPressureSeedPresentation.tsx",
);
const reflectionGuideSource = read(
  "src/components/XinmaiLifeReflectionGuide.tsx",
);
const experienceCopySource = read(
  "src/services/guanyaoDynamicsExperienceStateAdapter.ts",
);
const refinementStyles = read(
  "src/styles/xinmai-life-reflection-refinement.css",
);

const assertions = [
  [
    "Reality keeps life before analysis",
    realitySource.includes(
      'data-reality-experience-order="LIFE_FIRST_REALITY_SECOND_RECOGNITION_THIRD"',
    ) && realitySource.includes('data-reality-analysis-stage="NOT_STARTED"'),
  ],
  [
    "Reality presents fragments instead of test candidates",
    realitySource.includes(
      'data-reality-fragment="WORLD_APPROACHING_LIFE"',
    ) && realitySource.includes("停在这一幕"),
  ],
  [
    "Reflection guide contains the four-step mirror sequence",
    ["MIRROR", "IDENTIFY", "VALIDATE", "SHIFT"].every((step) =>
      reflectionGuideSource.includes(`id: "${step}"`),
    ),
  ],
  [
    "AI mirror keeps user agency",
    reflectionGuideSource.includes("它只帮助你看见，不替你决定。"),
  ],
  [
    "Choice and Crystal no longer use claim or task-completion copy",
    !experienceCopySource.includes("认领一个新的回应") &&
      !experienceCopySource.includes("你走完了六层"),
  ],
  [
    "Crystal remains attached to the existing life body",
    refinementStyles.includes(
      '[data-crystal-current-body-imprint="SOURCE_ATTACHED"]',
    ) &&
      refinementStyles.includes('[data-crystal-view="LIFE_IMPRINT"]'),
  ],
];

let failed = false;
for (const [name, passed] of assertions) {
  if (passed) {
    console.log(`PASS | ${name}`);
    continue;
  }
  failed = true;
  console.error(`FAIL | ${name}`);
}

if (failed) process.exit(1);

console.log(
  "PASS | XINMAI Screen 7–11 life reflection refinement is structurally aligned",
);
