import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/choiceExperienceUIRuntime.ts",
  service: "src/services/choiceExperienceUIRuntime.ts",
  presentation: "src/components/RealityChoicePresentation.tsx",
  harness: "src/pages/PersonalStarBeastWebGLPrototypeHarness.tsx",
  styles: "src/styles/reality-choice-presentation.css",
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
    "ChoiceExperienceUIRuntime",
    "choiceStageState",
    "inertiaReference",
    "responseGapState",
    "alternativeResponseState",
    "crystalReadiness",
    "CHOICE_ACTIVE_RESPONSE",
    "noRecommendedAction",
    "noBestChoice",
    "noBehaviorScore",
    "noUserJudgement",
    "noCrystalResult",
  ].forEach((marker) => assertIncludes("P38 Choice UI type", source.type, marker));

  [
    "resolveChoiceExperienceUIRuntime",
    "CHOICE_READY_REQUIRED",
    "CHOICE_BEFORE_CHOICE_READY",
    "RESPONSE_GAP",
    "ALTERNATIVE_RESPONSE_AWARENESS",
    "CHOICE_ACTIVE_RESPONSE",
    "CRYSTAL_READY",
    "noRecommendedAction",
    "noBestChoice",
    "noBehaviorScore",
    "noUserJudgement",
    "noCrystalExecution",
  ].forEach((marker) => assertIncludes("P38 Choice UI service", source.service, marker));

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
    "generateChoice",
    "resolveChoice(",
    "generateCrystal",
    "saveStorage",
    "bindUser",
    "diagnose",
    "recommendedAction",
    "bestChoice",
    "behaviorScore",
  ].forEach((marker) => assertExcludes("P38 service stays response-space-only", source.service, marker));

  [
    "export function RealityChoicePresentation",
    'data-interaction="CHOICE_ACTIVE_RESPONSE"',
    "Choice Experience Space回应空间",
    "反应间隙已经打开。",
    "Crystal Experience 已准备好",
  ].forEach((marker) => assertIncludes("P38 Choice Experience UI", source.presentation, marker));

  assertIncludes("P38 Harness consumes shared presentation", source.harness, "<RealityChoicePresentation");
  assertIncludes("P38 Harness still owns fixture state resolver", source.harness, "resolveChoiceExperienceUIRuntime");
  assertExcludes("P38 Harness no longer owns duplicate presentation markup", source.harness, 'className="gy-p38__choice-space"');

  [
    ".gy-p38__choice-space",
    ".gy-p38__choice-head",
    ".gy-p38__possibility-list",
    ".gy-p38__crystal-ready",
  ].forEach((marker) => assertIncludes("P38 Choice presentation styles", source.styles, marker));

  assertIncludes("P38 type index export", source.typeIndex, "./choiceExperienceUIRuntime");
  assertIncludes(
    "P38 gate registered",
    packageJson.scripts?.["check-choice-experience-ui-runtime"] ?? "",
    "node scripts/check-choice-experience-ui-runtime.mjs",
  );
  assertIncludes(
    "P38 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-choice-experience-ui-runtime",
  );

  const modulePath = path.join(os.tmpdir(), `guanyao-choice-experience-ui-runtime-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { resolveChoiceExperienceUIRuntime } from "./src/services/choiceExperienceUIRuntime.ts";`,
      resolveDir: rootDir,
      sourcefile: "choice-experience-ui-runtime-gate-entry.ts",
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

  const waiting = runtime.resolveChoiceExperienceUIRuntime({
    choiceReady: false,
    choiceActiveResponseConfirmed: false,
  });
  assertEqual("P38 Choice Ready required", waiting.status, "UNAVAILABLE");
  assertEqual("P38 missing Choice reason", waiting.reason, "CHOICE_READY_REQUIRED");

  const open = runtime.resolveChoiceExperienceUIRuntime({
    choiceReady: true,
    choiceActiveResponseConfirmed: false,
  });
  assertEqual("P38 Choice space ready", open.status, "READY");
  assertEqual("P38 response gap open", open.uiRuntime?.responseGapState, "OPEN");
  assertEqual(
    "P38 active response action",
    open.uiRuntime?.interactionAvailability,
    "CHOICE_ACTIVE_RESPONSE",
  );
  assertEqual("P38 Crystal not started", open.uiRuntime?.crystalReadiness, "NOT_READY");

  const active = runtime.resolveChoiceExperienceUIRuntime({
    choiceReady: true,
    choiceActiveResponseConfirmed: true,
  });
  assertEqual("P38 active response acknowledged", active.status, "READY");
  assertEqual("P38 Crystal ready state", active.uiRuntime?.choiceStageState, "CRYSTAL_READY");
  assertEqual("P38 Crystal readiness", active.uiRuntime?.crystalReadiness, "READY");
  assertEqual("P38 no second action", active.uiRuntime?.interactionAvailability, "NONE");

  const premature = runtime.resolveChoiceExperienceUIRuntime({
    choiceReady: false,
    choiceActiveResponseConfirmed: true,
  });
  assertEqual("P38 premature response blocked", premature.status, "BLOCKED");
  assertEqual(
    "P38 premature response reason",
    premature.reason,
    "CHOICE_BEFORE_CHOICE_READY",
  );
}

if (failures.length > 0) {
  console.error("\nChoice Experience UI Runtime gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Choice Experience UI Runtime gate passed.");
