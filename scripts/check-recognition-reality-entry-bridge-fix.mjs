import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/recognitionRealityEntryBridgeFix.ts",
  service: "src/services/recognitionRealityEntryBridgeFix.ts",
  harness: "src/pages/PersonalStarBeastWebGLPrototypeHarness.tsx",
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
    "RecognitionRealityEntryBridgeFix",
    "recognitionCompletionState",
    "transitionEventState",
    "realityEntryState",
    "pressureReadiness",
    "sessionContinuityState",
    "bridgeIntegrity",
    "GENESIS_COMPLETE",
    "RECOGNITION_CONFIRMED",
    "REALITY_ENTRY_READY",
    "PRESSURE_READY",
    "noGenesisMutation",
    "noStorage",
    "noEngineResult",
  ].forEach((marker) => assertIncludes("P42 bridge fix type", source.type, marker));

  [
    "resolveRecognitionRealityEntryBridgeFix",
    "RECOGNITION_CONFIRM",
    "ENTER_REALITY",
    "GENESIS_RESET_DETECTED",
    "REALITY_ENTRY_BEFORE_RECOGNITION",
    "BRIDGE_HELD",
    "BRIDGE_READY",
    "BRIDGE_BROKEN",
    "CONTINUOUS",
    "noGenesisMutation",
    "noPressureExecution",
    "noGravityExecution",
    "noChoiceExecution",
    "noCrystalExecution",
  ].forEach((marker) => assertIncludes("P42 bridge fix service", source.service, marker));

  [
    "resetGenesis()",
    "resetGenesisPreviewIntegration",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "generatePressure",
    "generateGravity",
    "generateChoice",
    "generateCrystal",
  ].forEach((marker) => assertExcludes("P42 bridge stays state-only", source.service, marker));

  [
    "resolveRecognitionRealityEntryBridgeFix",
    "data-recognition-reality-bridge-state",
    "data-recognition-reality-bridge-integrity",
    "effectivePreviewStageIndex",
    "effectivePreviewIntegration",
    "const revealComplete = crystalRecognitionConfirmed",
    "if (recognitionEntered && !crystalRecognitionConfirmed)",
    'data-interaction="RECOGNITION_CONFIRM"',
    'data-interaction="ENTER_REALITY"',
  ].forEach((marker) => assertIncludes("P42 harness continuity", source.harness, marker));

  [
    "resetGenesis()",
    "localStorage",
    "sessionStorage",
    "generatePressure",
    "generateGravity",
    "generateChoice",
    "generateCrystal",
  ].forEach((marker) => assertExcludes("P42 harness boundary", source.harness, marker));

  assertIncludes("P42 type index export", source.typeIndex, "./recognitionRealityEntryBridgeFix");
  assertIncludes(
    "P42 gate registered",
    packageJson.scripts?.["check-recognition-reality-entry-bridge-fix"] ?? "",
    "node scripts/check-recognition-reality-entry-bridge-fix.mjs",
  );
  assertIncludes(
    "P42 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-recognition-reality-entry-bridge-fix",
  );

  const modulePath = path.join(
    os.tmpdir(),
    `guanyao-recognition-reality-entry-bridge-fix-${process.pid}.mjs`,
  );
  await build({
    stdin: {
      contents:
        'export { resolveRecognitionRealityEntryBridgeFix } from "./src/services/recognitionRealityEntryBridgeFix.ts";',
      resolveDir: rootDir,
      sourcefile: "recognition-reality-entry-bridge-fix-gate-entry.ts",
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
  const baseInput = Object.freeze({
    genesisCompleted: true,
    sessionContinuityState: "CONTINUOUS",
  });
  const waiting = runtime.resolveRecognitionRealityEntryBridgeFix({
    ...baseInput,
    recognitionConfirmed: false,
    realityEntryConfirmed: false,
  });
  assertEqual("P42 Recognition Confirm reachable", waiting.status, "READY");
  assertEqual("P42 Recognition transition event", waiting.bridge?.transitionEventState, "RECOGNITION_CONFIRM");
  assertEqual("P42 bridge held before confirm", waiting.bridge?.bridgeState, "BRIDGE_HELD");

  const confirmed = runtime.resolveRecognitionRealityEntryBridgeFix({
    ...baseInput,
    recognitionConfirmed: true,
    realityEntryConfirmed: false,
  });
  assertEqual("P42 Enter Reality reachable", confirmed.status, "READY");
  assertEqual("P42 Enter Reality transition event", confirmed.bridge?.transitionEventState, "ENTER_REALITY");
  assertEqual("P42 Reality transition state", confirmed.bridge?.realityEntryState, "TRANSITIONING");

  const entered = runtime.resolveRecognitionRealityEntryBridgeFix({
    ...baseInput,
    recognitionConfirmed: true,
    realityEntryConfirmed: true,
  });
  assertEqual("P42 Reality Entry ready", entered.status, "READY");
  assertEqual("P42 Reality Entry ready", entered.bridge?.realityEntryState, "REALITY_ENTRY_READY");
  assertEqual("P42 Pressure ready", entered.bridge?.pressureReadiness, "PRESSURE_READY");
  assertEqual("P42 session continuous", entered.bridge?.bridgeIntegrity, "CONTINUOUS");

  const reset = runtime.resolveRecognitionRealityEntryBridgeFix({
    ...baseInput,
    recognitionConfirmed: true,
    realityEntryConfirmed: false,
    sessionContinuityState: "RESET_DETECTED",
  });
  assertEqual("P42 reset detected", reset.status, "BLOCKED");
  assertEqual("P42 reset reason", reset.reason, "GENESIS_RESET_DETECTED");
  assertEqual("P42 broken bridge", reset.bridge?.bridgeState, "BRIDGE_BROKEN");

  const premature = runtime.resolveRecognitionRealityEntryBridgeFix({
    ...baseInput,
    recognitionConfirmed: false,
    realityEntryConfirmed: true,
  });
  assertEqual("P42 premature Reality blocked", premature.status, "BLOCKED");
  assertEqual("P42 premature Reality reason", premature.reason, "REALITY_ENTRY_BEFORE_RECOGNITION");
}

if (failures.length > 0) {
  console.error("\nRecognition → Reality Entry bridge fix gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Recognition → Reality Entry bridge fix gate passed.");
