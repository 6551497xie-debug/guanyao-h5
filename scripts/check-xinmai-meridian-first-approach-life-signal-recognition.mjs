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
    "FIRST_APPROACH consumes one existing six-dimension observation",
    guide.includes(
      'const firstLifeSignalVisible = phase === "FIRST_APPROACH"',
    ) &&
      guide.includes(
        'data-xinmai-life-signal="EXISTING_SIX_DIMENSION_OBSERVATION"',
      ) &&
      guide.includes('data-xinmai-life-signal-count="ONE"') &&
      guide.includes(
        '{observation ?? "生命在这里停留了一下。"}',
      ),
  ],
  [
    "the signal is a state change rather than a diagnosis",
    guide.includes(
      'data-xinmai-life-signal-meaning="STATE_CHANGE_NOT_DIAGNOSIS"',
    ) &&
      guide.includes("这一处，先有了回应") &&
      !guide.includes("你的问题是"),
  ],
  [
    "sequence, explanation, and boundary copy recede during first approach",
    guide.includes("{firstLifeSignalVisible ? (") &&
      guide.includes("{!focusedInnerViewMomentVisible ? (") &&
      guide.includes(
        'phase !== "OBSERVING" && !focusedInnerViewMomentVisible',
      ),
  ],
  [
    "the signal remains next to the existing response side",
    styles.includes(
      '.gy-reality-life-universe__canvas[data-reality-pressure-flow-side="RIGHT"]',
    ) &&
      styles.includes(
        '.gy-reality-life-universe__canvas[data-reality-pressure-flow-side="LEFT"]',
      ) &&
      styles.includes(
        '[data-xinmai-life-signal-mode="SINGLE_EXISTING_DIMENSION_SIGNAL"]',
      ),
  ],
  [
    "visual language stays restrained and does not become a card",
    styles.includes("width: min(238px, 64vw)") &&
      styles.includes("border-left") === false &&
      !styles.includes("box-shadow: 0 0 30px") &&
      !styles.includes("background: rgba(255"),
  ],
  [
    "reduced motion preserves a readable signal",
    styles.includes("@media (prefers-reduced-motion: reduce)") &&
      styles.includes(
        ".xinmai-life-reflection-guide__life-signal > i,",
      ) &&
      styles.includes("transform: none"),
  ],
  [
    "no new six-dimension model, dust result, or analysis engine is introduced",
    !/NEW_SIX_DIMENSION|DUST_RESULT|ANALYSIS_ENGINE|DIAGNOSIS_RESULT/.test(
      `${guide}\n${styles}`,
    ),
  ],
  [
    "gate is registered",
    packageJson.scripts?.[
      "check-xinmai-meridian-first-approach-life-signal-recognition"
    ] ===
      "node scripts/check-xinmai-meridian-first-approach-life-signal-recognition.mjs",
  ],
];

let failed = false;
for (const [name, passed] of checks) {
  console.log(`${passed ? "PASS" : "FAIL"} | ${name}`);
  failed ||= !passed;
}

if (failed) {
  console.error(
    "\n[XINMAI MERIDIAN FIRST APPROACH LIFE SIGNAL RECOGNITION] FAILED",
  );
  process.exit(1);
}

console.log(
  "\n[XINMAI MERIDIAN FIRST APPROACH LIFE SIGNAL RECOGNITION] PASS",
);
