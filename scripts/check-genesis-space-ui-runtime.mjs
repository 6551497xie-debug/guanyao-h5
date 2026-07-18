import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/genesisSpaceUIRuntime.ts",
  service: "src/services/genesisSpaceUIRuntime.ts",
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
    "GenesisSpaceUIRuntime",
    "currentGenesisStage",
    "runtimePresentationState",
    "interactionAvailability",
    "visualConsumptionReference",
    "recognitionEntryState",
    "TIME_DELIVERY",
    "RECOGNITION_ENTRY",
    "GENESIS_COMPLETED",
    "noStorage",
    "noReality",
    "noEngineInvocation",
    "timeDeliveryOnlyUserInput",
  ].forEach((marker) => assertIncludes("P33 UI runtime type", source.type, marker));

  [
    "resolveGenesisSpaceUIRuntime",
    "TIME_RESONANCE_WAITING",
    "TIME_DELIVERY",
    "RECOGNITION_READY",
    "RECOGNITION_ENTERED",
    "GENESIS_RUNTIME_AND_VISUAL_STATE",
    "noRuntimeRuleMutation",
    "noEngineInvocation",
  ].forEach((marker) => assertIncludes("P33 UI runtime service", source.service, marker));

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
    "runMotherCodeLandingEngine",
    "resolveStarbeastFromBirthDate",
    "generateCrystal",
  ].forEach((marker) => assertExcludes("P33 service stays UI-only", source.service, marker));

  [
    "resolveGenesisSpaceUIRuntime",
    "data-genesis-space=\"GENESIS_SPACE\"",
    "data-genesis-ui-runtime-stage",
    "data-genesis-ui-interaction",
    "data-genesis-recognition-entry",
    "TIME_DELIVERY",
    "RECOGNITION_ENTRY",
    "TIME_RESONANCE",
    "进入生命认领",
  ].forEach((marker) => assertIncludes("P33 Genesis Space UI", source.harness, marker));

  [
    ".gy-p33__runtime-panel",
    ".gy-p33__interaction-hint",
    ".gy-p33__recognition-status",
  ].forEach((marker) => assertIncludes("P33 UI presentation styles", source.styles, marker));

  assertIncludes("P33 type index export", source.typeIndex, "./genesisSpaceUIRuntime");
  assertIncludes(
    "P33 gate registered",
    packageJson.scripts?.["check-genesis-space-ui-runtime"] ?? "",
    "node scripts/check-genesis-space-ui-runtime.mjs",
  );
  assertIncludes(
    "P33 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-genesis-space-ui-runtime",
  );

  const modulePath = path.join(os.tmpdir(), `guanyao-genesis-space-ui-runtime-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { resolveGenesisSpaceUIRuntime } from "./src/services/genesisSpaceUIRuntime.ts";`,
      resolveDir: rootDir,
      sourcefile: "genesis-space-ui-runtime-gate-entry.ts",
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
  const baseInput = {
    previewLifecycle: "RUNNING",
    recognitionEntered: false,
    visualStateAvailable: true,
  };
  const moon = runtime.resolveGenesisSpaceUIRuntime({
    ...baseInput,
    currentGenesisStage: "MOON_ORIGIN",
    timeDelivered: false,
  });
  assertEqual("P33 Moon ready", moon.status, "READY");
  assertEqual("P33 Moon has no interaction", moon.uiRuntime?.interactionAvailability, "NONE");

  const waiting = runtime.resolveGenesisSpaceUIRuntime({
    ...baseInput,
    currentGenesisStage: "TIME_RESONANCE",
    timeDelivered: false,
  });
  assertEqual("P33 Time waits for delivery", waiting.status, "READY");
  assertEqual("P33 Time action", waiting.uiRuntime?.interactionAvailability, "TIME_DELIVERY");
  assertEqual("P33 Time presentation", waiting.uiRuntime?.runtimePresentationState, "TIME_RESONANCE_WAITING");

  const revealed = runtime.resolveGenesisSpaceUIRuntime({
    ...baseInput,
    currentGenesisStage: "TIME_RESONANCE",
    timeDelivered: true,
  });
  assertEqual("P33 Time delivered has no extra action", revealed.uiRuntime?.interactionAvailability, "NONE");

  const recognition = runtime.resolveGenesisSpaceUIRuntime({
    ...baseInput,
    currentGenesisStage: "COMPLETION",
    timeDelivered: true,
  });
  assertEqual("P33 Completion ready", recognition.status, "READY");
  assertEqual("P33 Recognition action", recognition.uiRuntime?.interactionAvailability, "RECOGNITION_ENTRY");
  assertEqual("P33 Recognition ready", recognition.uiRuntime?.recognitionEntryState, "RECOGNITION_READY");

  const entered = runtime.resolveGenesisSpaceUIRuntime({
    ...baseInput,
    currentGenesisStage: "COMPLETION",
    timeDelivered: true,
    recognitionEntered: true,
  });
  assertEqual("P33 Recognition entered", entered.uiRuntime?.recognitionEntryState, "RECOGNITION_ENTERED");
  assertEqual("P33 Recognition ends actions", entered.uiRuntime?.interactionAvailability, "NONE");

  const blocked = runtime.resolveGenesisSpaceUIRuntime({
    ...baseInput,
    currentGenesisStage: "LIFE_FORCE",
    timeDelivered: true,
    recognitionEntered: true,
  });
  assertEqual("P33 Recognition cannot precede completion", blocked.status, "BLOCKED");

  const unavailable = runtime.resolveGenesisSpaceUIRuntime({
    ...baseInput,
    currentGenesisStage: "MOON_ORIGIN",
    timeDelivered: false,
    visualStateAvailable: false,
  });
  assertEqual("P33 Visual state required", unavailable.status, "UNAVAILABLE");
}

if (failures.length > 0) {
  console.error("\nGenesis Space UI Runtime gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Genesis Space UI Runtime gate passed.");
