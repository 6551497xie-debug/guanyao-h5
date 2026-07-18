import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/recognitionSpaceUIRuntime.ts",
  service: "src/services/recognitionSpaceUIRuntime.ts",
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
    "RecognitionSpaceUIRuntime",
    "recognitionState",
    "presenceReference",
    "completionReference",
    "realityEntryAvailability",
    "interactionAvailability",
    "RECOGNITION_CONFIRM",
    "noIdentityBinding",
    "noStorageRecord",
    "noEngineResult",
    "noOwnershipData",
    "noRealityExecution",
  ].forEach((marker) => assertIncludes("P34 Recognition UI type", source.type, marker));

  [
    "resolveRecognitionSpaceUIRuntime",
    "GENESIS_COMPLETION_REQUIRED",
    "PRESENCE_STATE_REQUIRED",
    "RECOGNITION_CONFIRMATION_BEFORE_COMPLETION",
    "RECOGNITION_CONFIRMATION_WITHOUT_PRESENCE",
    "RECOGNITION_READY",
    "REALITY_ENTRY_READY",
    "RECOGNITION_CONFIRM",
    "noStorageWrite",
    "noStarBeastMutation",
    "noGenesisMutation",
    "noRealityExecution",
  ].forEach((marker) => assertIncludes("P34 Recognition UI service", source.service, marker));

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
    "generateCrystal",
    "bindUser",
    "saveOwnership",
  ].forEach((marker) => assertExcludes("P34 service stays recognition-only", source.service, marker));

  [
    "resolveRecognitionSpaceUIRuntime",
    "data-recognition-space",
    "data-recognition-state",
    "data-reality-entry-availability",
    "data-recognition-interaction",
    "data-interaction=\"RECOGNITION_CONFIRM\"",
    "Recognition Space生命认领",
    "Reality Entry 已准备好",
    "带着这份看见进入现实准备",
  ].forEach((marker) => assertIncludes("P34 Recognition Space UI", source.harness, marker));

  [
    ".gy-p34__recognition-space",
    ".gy-p34__recognition-head",
    ".gy-p34__reality-ready",
  ].forEach((marker) => assertIncludes("P34 Recognition presentation styles", source.styles, marker));

  assertIncludes("P34 type index export", source.typeIndex, "./recognitionSpaceUIRuntime");
  assertIncludes(
    "P34 gate registered",
    packageJson.scripts?.["check-recognition-space-ui-runtime"] ?? "",
    "node scripts/check-recognition-space-ui-runtime.mjs",
  );
  assertIncludes(
    "P34 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-recognition-space-ui-runtime",
  );

  const modulePath = path.join(os.tmpdir(), `guanyao-recognition-space-ui-runtime-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { resolveRecognitionSpaceUIRuntime } from "./src/services/recognitionSpaceUIRuntime.ts";`,
      resolveDir: rootDir,
      sourcefile: "recognition-space-ui-runtime-gate-entry.ts",
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
    presenceAvailable: true,
    recognitionConfirmed: false,
  });
  const waiting = runtime.resolveRecognitionSpaceUIRuntime({
    ...baseInput,
    genesisCompleted: false,
  });
  assertEqual("P34 Genesis completion required", waiting.status, "UNAVAILABLE");
  assertEqual("P34 missing completion reason", waiting.reason, "GENESIS_COMPLETION_REQUIRED");

  const ready = runtime.resolveRecognitionSpaceUIRuntime({
    ...baseInput,
    genesisCompleted: true,
  });
  assertEqual("P34 Recognition ready", ready.status, "READY");
  assertEqual("P34 Recognition state", ready.uiRuntime?.recognitionState, "RECOGNITION_READY");
  assertEqual("P34 Recognition confirmation", ready.uiRuntime?.interactionAvailability, "RECOGNITION_CONFIRM");
  assertEqual("P34 Reality not yet ready", ready.uiRuntime?.realityEntryAvailability, "NOT_READY");

  const entered = runtime.resolveRecognitionSpaceUIRuntime({
    ...baseInput,
    genesisCompleted: true,
    recognitionConfirmed: true,
  });
  assertEqual("P34 confirmed Recognition ready", entered.status, "READY");
  assertEqual("P34 Reality Entry readiness", entered.uiRuntime?.recognitionState, "REALITY_ENTRY_READY");
  assertEqual("P34 Reality Entry available", entered.uiRuntime?.realityEntryAvailability, "READY");
  assertEqual("P34 no second action", entered.uiRuntime?.interactionAvailability, "NONE");

  const noPresence = runtime.resolveRecognitionSpaceUIRuntime({
    genesisCompleted: true,
    presenceAvailable: false,
    recognitionConfirmed: false,
  });
  assertEqual("P34 Presence required", noPresence.status, "UNAVAILABLE");
  assertEqual("P34 missing Presence reason", noPresence.reason, "PRESENCE_STATE_REQUIRED");

  const premature = runtime.resolveRecognitionSpaceUIRuntime({
    genesisCompleted: false,
    presenceAvailable: true,
    recognitionConfirmed: true,
  });
  assertEqual("P34 premature confirmation blocked", premature.status, "BLOCKED");
  assertEqual(
    "P34 premature confirmation reason",
    premature.reason,
    "RECOGNITION_CONFIRMATION_BEFORE_COMPLETION",
  );

  const noPresenceConfirmation = runtime.resolveRecognitionSpaceUIRuntime({
    genesisCompleted: true,
    presenceAvailable: false,
    recognitionConfirmed: true,
  });
  assertEqual("P34 confirmation without Presence blocked", noPresenceConfirmation.status, "BLOCKED");
}

if (failures.length > 0) {
  console.error("\nRecognition Space UI Runtime gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Recognition Space UI Runtime gate passed.");
