import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const read = (relativePath) =>
  fs.readFileSync(path.join(root, relativePath), "utf8");

const guide = read("src/components/XinmaiLifeReflectionGuide.tsx");
const styles = read("src/styles/xinmai-inner-view-three-approach.css");
const packageJson = JSON.parse(read("package.json"));

const checks = [
  [
    "THIRD_APPROACH reveals one unfinished flow from the existing meridian",
    guide.includes(
      'const thirdUnfinishedFlowVisible = phase === "THIRD_APPROACH"',
    ) &&
      guide.includes(
        'data-xinmai-new-flow="EXISTING_SAME_BODY_MERIDIAN"',
      ) &&
      guide.includes('data-xinmai-new-flow-count="ONE"') &&
      guide.includes('data-xinmai-new-flow-state="EMERGING_NOT_RESOLVED"'),
  ],
  [
    "the old protective path remains without automatically taking over",
    guide.includes(
      'data-xinmai-old-protective-path="PRESENT_NOT_AUTOMATIC"',
    ) &&
      styles.includes(
        '.gy-inner-view-life-meridian[data-inner-view-meridian-depth="3"]\n  .gy-inner-view-life-meridian__breath',
      ),
  ],
  [
    "the new flow is a short settling segment on the same depth-three meridian",
    styles.includes(
      '.gy-inner-view-life-meridian[data-inner-view-meridian-depth="3"]\n  .gy-inner-view-life-meridian__flow',
    ) &&
      styles.includes("stroke-dasharray: 0.16 0.84") &&
      styles.includes("@keyframes xinmai-inner-view-unfinished-new-flow") &&
      styles.includes("stroke-dashoffset: 0.36"),
  ],
  [
    "third approach keeps the visual moment focused",
    guide.includes(
      "focusedInnerViewMeaningVisible || thirdUnfinishedFlowVisible",
    ) &&
      guide.includes(
        '? "SAME_MERIDIAN_UNFINISHED_NEW_FLOW"',
      ) &&
      guide.includes("{!focusedInnerViewMomentVisible ? ("),
  ],
  [
    "user actions confirm the relationship rather than choose an answer",
    guide.includes(
      'data-xinmai-agency-purpose="RELATION_CONFIRMATION_NOT_CHOICE_ANSWER"',
    ) &&
      guide.includes('data-xinmai-new-flow-agency="回应仍然由你决定。"'),
  ],
  [
    "Choice and Crystal remain unstarted",
    guide.includes('data-xinmai-choice-stage="NOT_STARTED"') &&
      guide.includes('data-xinmai-crystal-stage="NOT_STARTED"'),
  ],
  [
    "reduced motion keeps the unfinished flow legible",
    styles.includes("@media (prefers-reduced-motion: reduce)") &&
      styles.includes(".xinmai-life-reflection-guide__new-flow,") &&
      styles.includes(".gy-inner-view-life-meridian__flow,"),
  ],
  [
    "no answer road, success animation, result, or new life model is introduced",
    !/SECOND_ANSWER_ROAD|CHOICE_RESULT|SUCCESS_ANIMATION|CRYSTAL_RESULT|NEW_LIFE_MODEL/.test(
      `${guide}\n${styles}`,
    ),
  ],
  [
    "gate is registered",
    packageJson.scripts?.[
      "check-xinmai-protective-meaning-new-flow-third-approach"
    ] ===
      "node scripts/check-xinmai-protective-meaning-new-flow-third-approach.mjs",
  ],
];

let failed = false;
for (const [name, passed] of checks) {
  console.log(`${passed ? "PASS" : "FAIL"} | ${name}`);
  failed ||= !passed;
}

if (failed) {
  console.error(
    "\n[XINMAI PROTECTIVE MEANING -> NEW FLOW THIRD APPROACH] FAILED",
  );
  process.exit(1);
}

console.log(
  "\n[XINMAI PROTECTIVE MEANING -> NEW FLOW THIRD APPROACH] PASS",
);
