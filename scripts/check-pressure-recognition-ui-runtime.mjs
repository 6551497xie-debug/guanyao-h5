import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/pressureRecognitionUIRuntime.ts",
  service: "src/services/pressureRecognitionUIRuntime.ts",
  harness: "src/pages/PersonalStarBeastWebGLPrototypeHarness.tsx",
  styles: "src/styles/personal-star-beast-webgl-prototype-harness.css",
  typeIndex: "src/types/index.ts",
  packageManifest: "package.json",
});
const failures = [];
const source = {};

const assertIncludes = (name, value, marker) => {
  if (value.includes(marker)) console.log(`PASS | ${name} | includes=${marker}`);
  else failures.push(`${name} missing=${marker}`);
};
const assertExcludes = (name, value, marker) => {
  if (value.includes(marker)) failures.push(`${name} forbidden=${marker}`);
  else console.log(`PASS | ${name} | forbidden=absent`);
};
const assertEqual = (name, actual, expected) => {
  if (actual === expected) console.log(`PASS | ${name} | expected=${String(expected)}`);
  else failures.push(`${name} expected=${String(expected)} actual=${String(actual)}`);
};

for (const [name, relative] of Object.entries(files)) {
  const filePath = path.join(rootDir, relative);
  if (!fs.existsSync(filePath)) failures.push(`${name} missing=${filePath}`);
  else {
    source[name] = fs.readFileSync(filePath, "utf8");
    console.log(`PASS | ${name} file exists`);
  }
}

if (failures.length === 0) {
  const packageJson = JSON.parse(source.packageManifest);

  [
    "PressureRecognitionUIRuntime",
    "pressureStageState",
    "realitySignalReference",
    "observationState",
    "tensionAwareness",
    "gravityReadiness",
    "PRESSURE_OBSERVATION_CONFIRM",
    "noPressureResult",
    "noUserDiagnosis",
    "noPersonalityLabel",
    "noGravityResult",
    "noChoiceResult",
    "noCrystalResult",
  ].forEach((marker) => assertIncludes("P36 Pressure UI type", source.type, marker));

  [
    "resolvePressureRecognitionUIRuntime",
    "REALITY_READY_REQUIRED",
    "PRESSURE_OBSERVATION_BEFORE_REALITY_READY",
    "REALITY_SIGNAL_OBSERVATION",
    "PRESSURE_TENSION_OBSERVATION",
    "GRAVITY_READY",
    "PRESSURE_OBSERVATION_CONFIRM",
    "noPressureExecution",
    "noUserDiagnosis",
    "noPersonalityLabel",
    "noGravityExecution",
    "noChoiceExecution",
    "noCrystalExecution",
  ].forEach((marker) => assertIncludes("P36 Pressure UI service", source.service, marker));

  [
    "createUser",
    "saveUser",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "document.",
    "navigateTo",
    "pushState",
    "replaceState",
    "generatePressure",
    "resolvePressure(",
    "generateGravity",
    "generateChoice",
    "generateCrystal",
    "saveStorage",
    "bindUser",
    "diagnose",
    "personalityLabel",
  ].forEach((marker) => assertExcludes("P36 service stays observation-only", source.service, marker));

  [
    "resolvePressureRecognitionUIRuntime",
    "data-pressure-space",
    "data-pressure-stage",
    "data-pressure-observation-state",
    "data-pressure-tension-awareness",
    "data-gravity-readiness",
    "data-pressure-interaction",
    'data-interaction="PRESSURE_OBSERVATION_CONFIRM"',
    "Pressure Recognition Space现实作用观察",
    "先看见，什么正在作用于你。",
    "Gravity Experience 已准备好",
  ].forEach((marker) => assertIncludes("P36 Pressure Recognition UI", source.harness, marker));

  [
    ".gy-p36__pressure-space",
    ".gy-p36__pressure-head",
    ".gy-p36__signal-list",
    ".gy-p36__gravity-ready",
  ].forEach((marker) => assertIncludes("P36 Pressure presentation styles", source.styles, marker));

  assertIncludes("P36 type index export", source.typeIndex, "./pressureRecognitionUIRuntime");
  assertIncludes(
    "P36 gate registered",
    packageJson.scripts?.["check-pressure-recognition-ui-runtime"] ?? "",
    "node scripts/check-pressure-recognition-ui-runtime.mjs",
  );
  assertIncludes(
    "P36 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-pressure-recognition-ui-runtime",
  );

  const modulePath = path.join(os.tmpdir(), `guanyao-pressure-recognition-ui-runtime-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { resolvePressureRecognitionUIRuntime } from "./src/services/pressureRecognitionUIRuntime.ts";`,
      resolveDir: rootDir,
      sourcefile: "pressure-recognition-ui-runtime-gate-entry.ts",
      loader: "ts",
    },
    outfile: modulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const runtime = await import(`file://${modulePath}?t=${Date.now()}`);

  const waiting = runtime.resolvePressureRecognitionUIRuntime({
    realityReady: false,
    pressureObservationConfirmed: false,
  });
  assertEqual("P36 Reality Ready required", waiting.status, "UNAVAILABLE");
  assertEqual("P36 missing Reality reason", waiting.reason, "REALITY_READY_REQUIRED");

  const observing = runtime.resolvePressureRecognitionUIRuntime({
    realityReady: true,
    pressureObservationConfirmed: false,
  });
  assertEqual("P36 Pressure observation ready", observing.status, "READY");
  assertEqual(
    "P36 signal observation state",
    observing.uiRuntime?.pressureStageState,
    "PRESSURE_TENSION_OBSERVATION",
  );
  assertEqual(
    "P36 observation action",
    observing.uiRuntime?.interactionAvailability,
    "PRESSURE_OBSERVATION_CONFIRM",
  );
  assertEqual("P36 Gravity not started", observing.uiRuntime?.gravityReadiness, "NOT_READY");

  const acknowledged = runtime.resolvePressureRecognitionUIRuntime({
    realityReady: true,
    pressureObservationConfirmed: true,
  });
  assertEqual("P36 observation acknowledged", acknowledged.status, "READY");
  assertEqual("P36 Gravity ready state", acknowledged.uiRuntime?.pressureStageState, "GRAVITY_READY");
  assertEqual("P36 Gravity readiness", acknowledged.uiRuntime?.gravityReadiness, "READY");
  assertEqual("P36 no second action", acknowledged.uiRuntime?.interactionAvailability, "NONE");

  const premature = runtime.resolvePressureRecognitionUIRuntime({
    realityReady: false,
    pressureObservationConfirmed: true,
  });
  assertEqual("P36 premature observation blocked", premature.status, "BLOCKED");
  assertEqual(
    "P36 premature observation reason",
    premature.reason,
    "PRESSURE_OBSERVATION_BEFORE_REALITY_READY",
  );
}

if (failures.length > 0) {
  console.error("\nPressure Recognition UI Runtime gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Pressure Recognition UI Runtime gate passed.");
