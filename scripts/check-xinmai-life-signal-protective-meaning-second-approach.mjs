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
    "SECOND_APPROACH consumes one existing dimension understanding",
    guide.includes(
      'const secondProtectiveMeaningVisible = phase === "SECOND_APPROACH"',
    ) &&
      guide.includes(
        'data-xinmai-protective-meaning="EXISTING_DIMENSION_UNDERSTANDING"',
      ) &&
      guide.includes('data-xinmai-protective-meaning-count="ONE"') &&
      guide.includes("{understanding ??"),
  ],
  [
    "protective meaning remains a possibility rather than a conclusion",
    guide.includes(
      'data-xinmai-protective-meaning-certainty="POSSIBILITY_NOT_CONCLUSION"',
    ) &&
      guide.includes("它也许曾这样保护过你") &&
      guide.includes('data-xinmai-dust-layer="UNRESOLVED"'),
  ],
  [
    "the focused meaning replaces sequence, observation, explanation, and boundary layers",
    guide.includes(
      "const focusedInnerViewMeaningVisible =\n    firstLifeSignalVisible || secondProtectiveMeaningVisible",
    ) &&
      guide.includes(
        "focusedInnerViewMeaningVisible || thirdUnfinishedFlowVisible",
      ) &&
      guide.includes("{!focusedInnerViewMomentVisible ? (") &&
      guide.includes(
        'phase !== "OBSERVING" && !focusedInnerViewMomentVisible',
      ),
  ],
  [
    "second approach stays beside the same existing response side",
    styles.includes(
      '[data-xinmai-life-signal-mode="SINGLE_EXISTING_PROTECTIVE_MEANING"]',
    ) &&
      styles.includes(
        '.gy-reality-life-universe__canvas[data-reality-pressure-flow-side="RIGHT"]',
      ) &&
      styles.includes(
        '.gy-reality-life-universe__canvas[data-reality-pressure-flow-side="LEFT"]',
      ),
  ],
  [
    "the protective meaning uses restrained living rhythm rather than a result card",
    styles.includes(
      ".xinmai-life-reflection-guide__protective-meaning > i",
    ) &&
      styles.includes("animation-duration: 5.8s") &&
      !styles.includes("PROTECTIVE_RESULT_CARD") &&
      !styles.includes("box-shadow: 0 0 30px"),
  ],
  [
    "reduced motion keeps the protective meaning readable",
    styles.includes("@media (prefers-reduced-motion: reduce)") &&
      styles.includes(
        ".xinmai-life-reflection-guide__protective-meaning,",
      ) &&
      styles.includes("transform: none"),
  ],
  [
    "no dust classifier, AI verdict, or new life model is introduced",
    !/DUST_CLASSIFIER|AI_VERDICT|NEW_LIFE_MODEL|DIAGNOSIS_RESULT/.test(
      `${guide}\n${styles}`,
    ),
  ],
  [
    "gate is registered",
    packageJson.scripts?.[
      "check-xinmai-life-signal-protective-meaning-second-approach"
    ] ===
      "node scripts/check-xinmai-life-signal-protective-meaning-second-approach.mjs",
  ],
];

let failed = false;
for (const [name, passed] of checks) {
  console.log(`${passed ? "PASS" : "FAIL"} | ${name}`);
  failed ||= !passed;
}

if (failed) {
  console.error(
    "\n[XINMAI LIFE SIGNAL -> PROTECTIVE MEANING SECOND APPROACH] FAILED",
  );
  process.exit(1);
}

console.log(
  "\n[XINMAI LIFE SIGNAL -> PROTECTIVE MEANING SECOND APPROACH] PASS",
);
