import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const read = (relativePath) =>
  fs.readFileSync(path.join(rootDir, relativePath), "utf8");

const canvas = read("src/components/RealityLifeUniverseCanvas.tsx");
const styles = read(
  "src/styles/xinmai-choice-life-trace-reality-continuity.css",
);
const packageJson = JSON.parse(read("package.json"));

const checks = [
  [
    "same carried trace becomes cadence influence only after a new reality is recognized",
    canvas.includes('"CADENCE_BIAS_ONLY"') &&
      canvas.includes("selectedPressureSeedContext !== null"),
  ],
  [
    "carried trace has no authority over the new response outcome",
    canvas.includes('data-choice-life-trace-outcome-authority="NONE"'),
  ],
  [
    "trace influence remains attached to the existing same-body memory geometry",
    canvas.includes(
      'data-choice-life-trace-identity-invariant="SAME_CORE_SAME_BODY_SAME_LIFE"',
    ) &&
      canvas.includes("choiceLifeTraceBodyPoint"),
  ],
  [
    "memory pulse precedes the existing current-reality response",
    canvas.includes(
      'data-choice-life-trace-response-order="MEMORY_PULSES_BEFORE_CURRENT_RESPONSE"',
    ) &&
      styles.includes("xinmai-choice-trace-inform-current-response"),
  ],
  [
    "same body receives a restrained cadence calibration",
    canvas.includes(
      "data-choice-life-trace-response-influence={",
    ) &&
      styles.includes("xinmai-choice-trace-informed-body-cadence"),
  ],
  [
    "reduced motion keeps the response available without effect animation",
    styles.includes("@media (prefers-reduced-motion: reduce)") &&
      styles.includes("choice-life-trace-response-echo"),
  ],
  [
    "gate is registered",
    packageJson.scripts?.[
      "check-xinmai-new-reality-trace-response-calibration"
    ] ===
      "node scripts/check-xinmai-new-reality-trace-response-calibration.mjs",
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
  "\n[XINMAI NEW REALITY TRACE RESPONSE CALIBRATION] PASS",
);
