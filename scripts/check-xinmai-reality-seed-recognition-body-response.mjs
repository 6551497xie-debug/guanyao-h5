import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const read = (relativePath) =>
  fs.readFileSync(path.join(rootDir, relativePath), "utf8");

const canvas = read("src/components/RealityLifeUniverseCanvas.tsx");
const host = read("src/components/RealityProductionHost.tsx");
const presentation = read(
  "src/components/RealityPressureSeedPresentation.tsx",
);
const styles = read("src/styles/xinmai-reality-seed-body-response.css");
const packageJson = JSON.parse(read("package.json"));

const checks = [
  [
    "recognized reality dissolves from presentation form into the same life",
    canvas.includes(
      'data-reality-seed-recognition="FRAGMENT_ENTERING_SAME_LIFE"',
    ) &&
      canvas.includes(
        'data-reality-seed-presentation-state="DISSOLVED_FROM_CARD"',
      ),
  ],
  [
    "existing pressure projection remains the only current-response source",
    canvas.includes(
      'realityPressureConsumer.status === "RESPONDING"',
    ) &&
      canvas.includes("realityPressureConsumer.projection"),
  ],
  [
    "ingress stops at the existing life-weather body position",
    canvas.includes(
      'data-reality-seed-body-target="EXISTING_LIFE_WEATHER_POSITION"',
    ) &&
      canvas.includes("realitySeedBodyTargetX") &&
      canvas.includes("left: `${realitySeedBodyTargetX}%`"),
  ],
  [
    "recognition preserves identity and does not start analysis",
    canvas.includes(
      'data-reality-seed-identity-invariant="SAME_CORE_SAME_BODY_SAME_LIFE"',
    ) &&
      canvas.includes('data-reality-seed-analysis-stage="NOT_STARTED"') &&
      host.includes('data-reality-seed-analysis-stage="NOT_STARTED"'),
  ],
  [
    "recognized copy asks the user to observe the body rather than a result",
    presentation.includes(
      "先让文字退远一点，看生命身体里哪一处开始回应。",
    ) &&
      presentation.includes("TEXT_RECEDES_LIFE_RESPONDS"),
  ],
  [
    "visual bridge is restrained and contains no burst or reward language",
    styles.includes("xinmai-reality-seed-enter-body") &&
      styles.includes("xinmai-reality-seed-body-breathe") &&
      !styles.includes("explosion") &&
      !styles.includes("reward"),
  ],
  [
    "reduced motion keeps a visible body relation",
    styles.includes("@media (prefers-reduced-motion: reduce)") &&
      styles.includes("opacity: 0.18"),
  ],
  [
    "gate is registered",
    packageJson.scripts?.[
      "check-xinmai-reality-seed-recognition-body-response"
    ] ===
      "node scripts/check-xinmai-reality-seed-recognition-body-response.mjs",
  ],
];

let failed = false;
for (const [label, passed] of checks) {
  if (passed) {
    console.log(`PASS | ${label}`);
  } else {
    failed = true;
    console.error(`FAIL | ${label}`);
  }
}

if (failed) process.exit(1);
console.log(
  "\n[XINMAI REALITY SEED RECOGNITION BODY RESPONSE] PASS",
);
