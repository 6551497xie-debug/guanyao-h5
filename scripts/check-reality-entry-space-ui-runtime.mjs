import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/realityEntrySpaceUIRuntime.ts",
  service: "src/services/realityEntrySpaceUIRuntime.ts",
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
    "RealityEntrySpaceUIRuntime",
    "entryState",
    "recognitionReference",
    "realityReadiness",
    "transitionPresentation",
    "pressureReadiness",
    "ENTER_REALITY",
    "noPressureResult",
    "noGravityResult",
    "noChoiceResult",
    "noCrystalResult",
    "noUserProfile",
    "noRealityAnalysis",
  ].forEach((marker) => assertIncludes("P35 Reality Entry UI type", source.type, marker));

  [
    "resolveRealityEntrySpaceUIRuntime",
    "RECOGNITION_CONFIRMATION_REQUIRED",
    "PRESENCE_REFERENCE_REQUIRED",
    "ENTER_REALITY_BEFORE_RECOGNITION",
    "ENTER_REALITY_WITHOUT_PRESENCE",
    "TRANSITIONING",
    "REALITY_READY",
    "pressureReadiness",
    "noPressureExecution",
    "noGravityExecution",
    "noChoiceExecution",
    "noCrystalExecution",
    "noRealityAnalysis",
  ].forEach((marker) => assertIncludes("P35 Reality Entry UI service", source.service, marker));

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
    "resolvePressure",
    "generateGravity",
    "generateChoice",
    "generateCrystal",
    "saveStorage",
    "bindUser",
  ].forEach((marker) => assertExcludes("P35 service stays entry-only", source.service, marker));

  [
    "resolveRealityEntrySpaceUIRuntime",
    "data-reality-entry-space",
    "data-reality-entry-state",
    "data-reality-readiness",
    "data-pressure-readiness",
    "data-reality-entry-interaction",
    'data-interaction="ENTER_REALITY"',
    "Reality Entry Space现实入口",
    "进入现实观察",
    "Pressure Experience 已准备好",
  ].forEach((marker) => assertIncludes("P35 Reality Entry Space UI", source.harness, marker));

  [
    ".gy-p35__reality-entry-space",
    ".gy-p35__reality-entry-head",
    ".gy-p35__pressure-ready",
  ].forEach((marker) => assertIncludes("P35 Reality Entry presentation styles", source.styles, marker));

  assertIncludes("P35 type index export", source.typeIndex, "./realityEntrySpaceUIRuntime");
  assertIncludes(
    "P35 gate registered",
    packageJson.scripts?.["check-reality-entry-space-ui-runtime"] ?? "",
    "node scripts/check-reality-entry-space-ui-runtime.mjs",
  );
  assertIncludes(
    "P35 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-reality-entry-space-ui-runtime",
  );

  const modulePath = path.join(os.tmpdir(), `guanyao-reality-entry-space-ui-runtime-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { resolveRealityEntrySpaceUIRuntime } from "./src/services/realityEntrySpaceUIRuntime.ts";`,
      resolveDir: rootDir,
      sourcefile: "reality-entry-space-ui-runtime-gate-entry.ts",
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
    realityEntryConfirmed: false,
  });
  const missingRecognition = runtime.resolveRealityEntrySpaceUIRuntime({
    ...baseInput,
    recognitionConfirmed: false,
  });
  assertEqual("P35 recognition confirmation required", missingRecognition.status, "UNAVAILABLE");
  assertEqual(
    "P35 missing recognition reason",
    missingRecognition.reason,
    "RECOGNITION_CONFIRMATION_REQUIRED",
  );

  const transitioning = runtime.resolveRealityEntrySpaceUIRuntime({
    ...baseInput,
    recognitionConfirmed: true,
  });
  assertEqual("P35 Reality Entry available", transitioning.status, "READY");
  assertEqual("P35 transition state", transitioning.uiRuntime?.entryState, "TRANSITIONING");
  assertEqual("P35 enter action", transitioning.uiRuntime?.interactionAvailability, "ENTER_REALITY");
  assertEqual("P35 pressure not started", transitioning.uiRuntime?.pressureReadiness, "NOT_READY");

  const entered = runtime.resolveRealityEntrySpaceUIRuntime({
    ...baseInput,
    recognitionConfirmed: true,
    realityEntryConfirmed: true,
  });
  assertEqual("P35 Reality Entry confirmed", entered.status, "READY");
  assertEqual("P35 Reality ready state", entered.uiRuntime?.entryState, "REALITY_READY");
  assertEqual("P35 pressure ready", entered.uiRuntime?.pressureReadiness, "READY");
  assertEqual("P35 no second action", entered.uiRuntime?.interactionAvailability, "NONE");

  const noPresence = runtime.resolveRealityEntrySpaceUIRuntime({
    presenceAvailable: false,
    recognitionConfirmed: true,
    realityEntryConfirmed: false,
  });
  assertEqual("P35 Presence required", noPresence.status, "UNAVAILABLE");
  assertEqual("P35 missing Presence reason", noPresence.reason, "PRESENCE_REFERENCE_REQUIRED");

  const premature = runtime.resolveRealityEntrySpaceUIRuntime({
    presenceAvailable: true,
    recognitionConfirmed: false,
    realityEntryConfirmed: true,
  });
  assertEqual("P35 premature Reality Entry blocked", premature.status, "BLOCKED");
  assertEqual(
    "P35 premature Reality Entry reason",
    premature.reason,
    "ENTER_REALITY_BEFORE_RECOGNITION",
  );

  const noPresenceConfirmation = runtime.resolveRealityEntrySpaceUIRuntime({
    presenceAvailable: false,
    recognitionConfirmed: true,
    realityEntryConfirmed: true,
  });
  assertEqual("P35 Reality Entry without Presence blocked", noPresenceConfirmation.status, "BLOCKED");
  assertEqual(
    "P35 missing Presence confirmation reason",
    noPresenceConfirmation.reason,
    "ENTER_REALITY_WITHOUT_PRESENCE",
  );
}

if (failures.length > 0) {
  console.error("\nReality Entry Space UI Runtime gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Reality Entry Space UI Runtime gate passed.");
