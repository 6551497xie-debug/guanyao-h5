import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/gravityExperienceUIRuntime.ts",
  service: "src/services/gravityExperienceUIRuntime.ts",
  presentation: "src/components/RealityGravityPresentation.tsx",
  harness: "src/pages/PersonalStarBeastWebGLPrototypeHarness.tsx",
  styles: "src/styles/reality-gravity-presentation.css",
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
    "GravityExperienceUIRuntime",
    "gravityStageState",
    "inertiaObservationReference",
    "automaticResponseState",
    "patternAwarenessState",
    "choiceReadiness",
    "GRAVITY_OBSERVATION_CONFIRM",
    "noBehaviorScore",
    "noPersonalityLabel",
    "noUserDiagnosis",
    "noChoiceResult",
    "noCrystalResult",
  ].forEach((marker) => assertIncludes("P37 Gravity UI type", source.type, marker));

  [
    "resolveGravityExperienceUIRuntime",
    "GRAVITY_READY_REQUIRED",
    "GRAVITY_OBSERVATION_BEFORE_GRAVITY_READY",
    "INERTIA_OBSERVATION",
    "AUTOMATIC_RESPONSE_AWARENESS",
    "CHOICE_READY",
    "GRAVITY_OBSERVATION_CONFIRM",
    "noBehaviorScore",
    "noPersonalityLabel",
    "noUserDiagnosis",
    "noChoiceExecution",
    "noCrystalExecution",
  ].forEach((marker) => assertIncludes("P37 Gravity UI service", source.service, marker));

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
    "generateGravity",
    "resolveGravity(",
    "generateChoice",
    "generateCrystal",
    "saveStorage",
    "bindUser",
    "diagnose",
    "personalityLabel",
    "behaviorScore",
  ].forEach((marker) => assertExcludes("P37 service stays observation-only", source.service, marker));

  [
    "export function RealityGravityPresentation",
    'data-interaction="GRAVITY_OBSERVATION_CONFIRM"',
    "Gravity Experience Space惯性观察",
    "看见惯性如何带动你。",
    "Choice Experience 已准备好",
  ].forEach((marker) => assertIncludes("P37 Gravity Experience UI", source.presentation, marker));

  assertIncludes("P37 Harness consumes shared presentation", source.harness, "<RealityGravityPresentation");
  assertIncludes("P37 Harness still owns fixture state resolver", source.harness, "resolveGravityExperienceUIRuntime");
  assertExcludes("P37 Harness no longer owns duplicate presentation markup", source.harness, 'className="gy-p37__gravity-space"');

  [
    ".gy-p37__gravity-space",
    ".gy-p37__gravity-head",
    ".gy-p37__response-list",
    ".gy-p37__choice-ready",
  ].forEach((marker) => assertIncludes("P37 Gravity presentation styles", source.styles, marker));

  assertIncludes("P37 type index export", source.typeIndex, "./gravityExperienceUIRuntime");
  assertIncludes(
    "P37 gate registered",
    packageJson.scripts?.["check-gravity-experience-ui-runtime"] ?? "",
    "node scripts/check-gravity-experience-ui-runtime.mjs",
  );
  assertIncludes(
    "P37 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-gravity-experience-ui-runtime",
  );

  const modulePath = path.join(os.tmpdir(), `guanyao-gravity-experience-ui-runtime-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { resolveGravityExperienceUIRuntime } from "./src/services/gravityExperienceUIRuntime.ts";`,
      resolveDir: rootDir,
      sourcefile: "gravity-experience-ui-runtime-gate-entry.ts",
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

  const waiting = runtime.resolveGravityExperienceUIRuntime({
    gravityReady: false,
    gravityObservationConfirmed: false,
  });
  assertEqual("P37 Gravity Ready required", waiting.status, "UNAVAILABLE");
  assertEqual("P37 missing Gravity reason", waiting.reason, "GRAVITY_READY_REQUIRED");

  const observing = runtime.resolveGravityExperienceUIRuntime({
    gravityReady: true,
    gravityObservationConfirmed: false,
  });
  assertEqual("P37 Gravity observation ready", observing.status, "READY");
  assertEqual(
    "P37 automatic response state",
    observing.uiRuntime?.gravityStageState,
    "AUTOMATIC_RESPONSE_AWARENESS",
  );
  assertEqual(
    "P37 observation action",
    observing.uiRuntime?.interactionAvailability,
    "GRAVITY_OBSERVATION_CONFIRM",
  );
  assertEqual("P37 Choice not started", observing.uiRuntime?.choiceReadiness, "NOT_READY");

  const acknowledged = runtime.resolveGravityExperienceUIRuntime({
    gravityReady: true,
    gravityObservationConfirmed: true,
  });
  assertEqual("P37 observation acknowledged", acknowledged.status, "READY");
  assertEqual("P37 Choice ready state", acknowledged.uiRuntime?.gravityStageState, "CHOICE_READY");
  assertEqual("P37 Choice readiness", acknowledged.uiRuntime?.choiceReadiness, "READY");
  assertEqual("P37 no second action", acknowledged.uiRuntime?.interactionAvailability, "NONE");

  const premature = runtime.resolveGravityExperienceUIRuntime({
    gravityReady: false,
    gravityObservationConfirmed: true,
  });
  assertEqual("P37 premature observation blocked", premature.status, "BLOCKED");
  assertEqual(
    "P37 premature observation reason",
    premature.reason,
    "GRAVITY_OBSERVATION_BEFORE_GRAVITY_READY",
  );
}

if (failures.length > 0) {
  console.error("\nGravity Experience UI Runtime gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Gravity Experience UI Runtime gate passed.");
