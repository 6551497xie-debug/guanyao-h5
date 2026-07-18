import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/crystalExperienceUIRuntime.ts",
  service: "src/services/crystalExperienceUIRuntime.ts",
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
    "CrystalExperienceUIRuntime",
    "crystalStageState",
    "transformationReference",
    "lifeImprintState",
    "crystalPresenceState",
    "futureCarryState",
    "CRYSTAL_RECOGNITION_CONFIRM",
    "noReward",
    "noScore",
    "noLevel",
    "noBadge",
    "noAchievement",
    "noStorageRecord",
    "noArchiveRecord",
  ].forEach((marker) => assertIncludes("P39 Crystal UI type", source.type, marker));

  [
    "resolveCrystalExperienceUIRuntime",
    "CRYSTAL_READY_REQUIRED",
    "CRYSTAL_RECOGNITION_BEFORE_CRYSTAL_READY",
    "TRANSFORMATION_RECOGNITION",
    "LIFE_IMPRINT",
    "CRYSTAL_PRESENCE",
    "FUTURE_CARRY",
    "JOURNEY_COMPLETE",
    "CRYSTAL_RECOGNITION_CONFIRM",
    "noReward",
    "noScore",
    "noLevel",
    "noBadge",
    "noAchievement",
    "noStorage",
    "noArchive",
    "noCrystalExecution",
  ].forEach((marker) => assertIncludes("P39 Crystal UI service", source.service, marker));

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
    "saveCrystal",
    "createArchive",
    "saveArchive",
    "saveStorage",
    "bindUser",
    "reward",
    "badge",
    "achievement",
    "level",
    "score",
  ].forEach((marker) => assertExcludes("P39 service stays imprint-only", source.service, marker));

  [
    "resolveCrystalExperienceUIRuntime",
    "data-crystal-space",
    "data-crystal-stage",
    "data-transformation-reference-state",
    "data-life-imprint-state",
    "data-crystal-presence-state",
    "data-future-carry-state",
    "data-crystal-interaction",
    'data-interaction="CRYSTAL_RECOGNITION_CONFIRM"',
    "Crystal Experience Space变化沉积",
    "这次回应，留下了什么。",
    "生命旅程的这次变化已完成",
  ].forEach((marker) => assertIncludes("P39 Crystal Experience UI", source.harness, marker));

  [
    ".gy-p39__crystal-space",
    ".gy-p39__crystal-head",
    ".gy-p39__imprint-list",
    ".gy-p39__journey-complete",
  ].forEach((marker) => assertIncludes("P39 Crystal presentation styles", source.styles, marker));

  assertIncludes("P39 type index export", source.typeIndex, "./crystalExperienceUIRuntime");
  assertIncludes(
    "P39 gate registered",
    packageJson.scripts?.["check-crystal-experience-ui-runtime"] ?? "",
    "node scripts/check-crystal-experience-ui-runtime.mjs",
  );
  assertIncludes(
    "P39 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-crystal-experience-ui-runtime",
  );

  const modulePath = path.join(os.tmpdir(), `guanyao-crystal-experience-ui-runtime-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { resolveCrystalExperienceUIRuntime } from "./src/services/crystalExperienceUIRuntime.ts";`,
      resolveDir: rootDir,
      sourcefile: "crystal-experience-ui-runtime-gate-entry.ts",
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

  const waiting = runtime.resolveCrystalExperienceUIRuntime({
    crystalReady: false,
    crystalRecognitionConfirmed: false,
  });
  assertEqual("P39 Crystal Ready required", waiting.status, "UNAVAILABLE");
  assertEqual("P39 missing Crystal reason", waiting.reason, "CRYSTAL_READY_REQUIRED");

  const ready = runtime.resolveCrystalExperienceUIRuntime({
    crystalReady: true,
    crystalRecognitionConfirmed: false,
  });
  assertEqual("P39 Crystal space ready", ready.status, "READY");
  assertEqual(
    "P39 transformation recognition stage",
    ready.uiRuntime?.crystalStageState,
    "TRANSFORMATION_RECOGNITION",
  );
  assertEqual("P39 life imprint emerging", ready.uiRuntime?.lifeImprintState, "EMERGING");
  assertEqual("P39 Crystal presence", ready.uiRuntime?.crystalPresenceState, "PRESENT");
  assertEqual("P39 future carry visible", ready.uiRuntime?.futureCarryState, "VISIBLE");
  assertEqual(
    "P39 recognition action",
    ready.uiRuntime?.interactionAvailability,
    "CRYSTAL_RECOGNITION_CONFIRM",
  );

  const complete = runtime.resolveCrystalExperienceUIRuntime({
    crystalReady: true,
    crystalRecognitionConfirmed: true,
  });
  assertEqual("P39 journey completion ready", complete.status, "READY");
  assertEqual("P39 journey complete state", complete.uiRuntime?.crystalStageState, "JOURNEY_COMPLETE");
  assertEqual("P39 life imprint acknowledged", complete.uiRuntime?.lifeImprintState, "ACKNOWLEDGED");
  assertEqual("P39 Crystal stable", complete.uiRuntime?.crystalPresenceState, "STABLE");
  assertEqual("P39 future carry acknowledged", complete.uiRuntime?.futureCarryState, "ACKNOWLEDGED");
  assertEqual("P39 no second action", complete.uiRuntime?.interactionAvailability, "NONE");

  const premature = runtime.resolveCrystalExperienceUIRuntime({
    crystalReady: false,
    crystalRecognitionConfirmed: true,
  });
  assertEqual("P39 premature recognition blocked", premature.status, "BLOCKED");
  assertEqual(
    "P39 premature recognition reason",
    premature.reason,
    "CRYSTAL_RECOGNITION_BEFORE_CRYSTAL_READY",
  );
}

if (failures.length > 0) {
  console.error("\nCrystal Experience UI Runtime gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Crystal Experience UI Runtime gate passed.");
