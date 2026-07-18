import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/realityExperienceContinuityOptimization.ts",
  service: "src/services/realityExperienceContinuityOptimization.ts",
  carry: "src/services/presenceCarryRealityTransition.ts",
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
    "RealityExperienceContinuityOptimization",
    "pressureContinuity",
    "gravityContinuity",
    "choiceContinuity",
    "presenceCarryReference",
    "realityFlowIntegrity",
    "REALITY_SIGNAL_OBSERVATION",
    "INERTIA_AWARENESS",
    "RESPONSE_SPACE",
    "noPressureMutation",
    "noGravityMutation",
    "noChoiceMutation",
    "noUserDiagnosis",
    "noBehaviorScore",
    "noStorage",
  ].forEach((marker) => assertIncludes("P46 continuity type", source.type, marker));

  [
    "resolveRealityExperienceContinuityOptimization",
    "PRESENCE_CARRY_REQUIRED",
    "PRESSURE_RUNTIME_REQUIRED",
    "PRESENCE_CARRY_DISCONTINUITY",
    "GRAVITY_RUNTIME_BEFORE_PRESSURE",
    "CHOICE_RUNTIME_BEFORE_GRAVITY",
    "REALITY_EXPERIENCE_CONTINUITY_OPTIMIZATION_BOUNDARY",
    "RESPONSE_GAP_OPEN",
  ].forEach((marker) => assertIncludes("P46 continuity service", source.service, marker));

  [
    "IdentitySource",
    "MotherCode",
    "LifeArchetype",
    "localStorage",
    "sessionStorage",
    "generatePressure",
    "generateGravity",
    "generateChoice",
    "generateCrystal",
    "setPreviewStageIndex",
  ].forEach((marker) => assertExcludes("P46 service remains optimization-only", source.service, marker));

  [
    "resolveRealityExperienceContinuityOptimization",
    "data-reality-flow-integrity",
    "data-reality-pressure-continuity",
    "data-reality-gravity-continuity",
    "data-reality-choice-continuity",
    "data-reality-observation-mode",
    "presenceCarryRealityTransition",
  ].forEach((marker) => assertIncludes("P46 harness continuity consumption", source.harness, marker));

  [
    "[data-reality-flow-integrity=\"CONTINUOUS\"]",
    "[data-reality-pressure-continuity=\"OBSERVING\"]",
    "[data-reality-gravity-continuity=\"OBSERVING\"]",
    "[data-reality-choice-continuity=\"RESPONSE_GAP_OPEN\"]",
  ].forEach((marker) => assertIncludes("P46 continuity presentation", source.styles, marker));

  assertIncludes("P46 type index export", source.typeIndex, "./realityExperienceContinuityOptimization");
  assertIncludes(
    "P46 gate registered",
    packageJson.scripts?.["check-reality-experience-continuity-optimization"] ?? "",
    "node scripts/check-reality-experience-continuity-optimization.mjs",
  );
  assertIncludes(
    "P46 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-reality-experience-continuity-optimization",
  );

  const modulePath = path.join(os.tmpdir(), `guanyao-reality-continuity-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: [
        'export { resolvePresenceCarryRealityTransition } from "./src/services/presenceCarryRealityTransition.ts";',
        'export { resolvePressureRecognitionUIRuntime } from "./src/services/pressureRecognitionUIRuntime.ts";',
        'export { resolveGravityExperienceUIRuntime } from "./src/services/gravityExperienceUIRuntime.ts";',
        'export { resolveChoiceExperienceUIRuntime } from "./src/services/choiceExperienceUIRuntime.ts";',
        'export { resolveRealityExperienceContinuityOptimization } from "./src/services/realityExperienceContinuityOptimization.ts";',
      ].join("\n"),
      resolveDir: rootDir,
      sourcefile: "reality-continuity-gate-entry.ts",
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

  const carryInput = Object.freeze({
    recognitionSpaceRuntime: Object.freeze({
      recognitionConfirmed: true,
      presenceReference: "PERSONAL_STAR_BEAST_PRESENCE_VISUAL_STATE",
    }),
    bridgeFix: Object.freeze({ bridgeState: "BRIDGE_READY", bridgeIntegrity: "CONTINUOUS" }),
    realityEntryRuntime: Object.freeze({ realityReadiness: "READY" }),
    pressureRuntime: null,
    recognitionEntered: true,
    realityEntryConfirmed: true,
    pressureObservationConfirmed: false,
  });
  const carryResult = runtime.resolvePresenceCarryRealityTransition(carryInput);
  assertEqual("P46 P45 carry source", carryResult.status, "READY");
  const presenceCarry = carryResult.status === "READY" ? carryResult.transition : null;

  const pressure = (confirmed) => runtime.resolvePressureRecognitionUIRuntime({
    realityReady: true,
    pressureObservationConfirmed: confirmed,
  }).uiRuntime;
  const gravity = (confirmed) => runtime.resolveGravityExperienceUIRuntime({
    gravityReady: true,
    gravityObservationConfirmed: confirmed,
  }).uiRuntime;
  const choice = (confirmed) => runtime.resolveChoiceExperienceUIRuntime({
    choiceReady: true,
    choiceActiveResponseConfirmed: confirmed,
  }).uiRuntime;
  const review = (input) => runtime.resolveRealityExperienceContinuityOptimization({
    presenceCarry,
    ...input,
  });

  const pressureReview = review({
    pressureRuntime: pressure(false),
    gravityRuntime: null,
    choiceRuntime: null,
    pressureObservationConfirmed: false,
    gravityObservationConfirmed: false,
    choiceActiveResponseConfirmed: false,
  });
  assertEqual("P46 Pressure continuity ready", pressureReview.status, "READY");
  if (pressureReview.status === "READY") {
    assertEqual("P46 Pressure observing", pressureReview.continuity.pressureContinuity, "OBSERVING");
    assertEqual("P46 Gravity waits for Pressure", pressureReview.continuity.gravityContinuity, "WAITING_FOR_PRESSURE");
    assertEqual("P46 flow continuous at Pressure", pressureReview.continuity.realityFlowIntegrity, "CONTINUOUS");
  }

  const gravityReview = review({
    pressureRuntime: pressure(true),
    gravityRuntime: gravity(false),
    choiceRuntime: null,
    pressureObservationConfirmed: true,
    gravityObservationConfirmed: false,
    choiceActiveResponseConfirmed: false,
  });
  assertEqual("P46 Gravity continuity ready", gravityReview.status, "READY");
  if (gravityReview.status === "READY") {
    assertEqual("P46 Gravity observing", gravityReview.continuity.gravityContinuity, "OBSERVING");
    assertEqual("P46 Gravity observation mode", gravityReview.continuity.observationMode, "INERTIA_AWARENESS");
  }

  const choiceReview = review({
    pressureRuntime: pressure(true),
    gravityRuntime: gravity(true),
    choiceRuntime: choice(false),
    pressureObservationConfirmed: true,
    gravityObservationConfirmed: true,
    choiceActiveResponseConfirmed: false,
  });
  assertEqual("P46 Choice continuity ready", choiceReview.status, "READY");
  if (choiceReview.status === "READY") {
    assertEqual("P46 response gap open", choiceReview.continuity.choiceContinuity, "RESPONSE_GAP_OPEN");
    assertEqual("P46 Choice observation mode", choiceReview.continuity.observationMode, "RESPONSE_SPACE");
  }

  const activeChoiceReview = review({
    pressureRuntime: pressure(true),
    gravityRuntime: gravity(true),
    choiceRuntime: choice(true),
    pressureObservationConfirmed: true,
    gravityObservationConfirmed: true,
    choiceActiveResponseConfirmed: true,
  });
  assertEqual("P46 active Choice continuity ready", activeChoiceReview.status, "READY");
  if (activeChoiceReview.status === "READY") {
    assertEqual("P46 active response continuity", activeChoiceReview.continuity.choiceContinuity, "ACTIVE_RESPONSE");
    assertEqual("P46 active response mode", activeChoiceReview.continuity.observationMode, "RESPONSE_ACKNOWLEDGED");
  }

  const missingCarry = runtime.resolveRealityExperienceContinuityOptimization({
    presenceCarry: null,
    pressureRuntime: pressure(false),
    gravityRuntime: null,
    choiceRuntime: null,
    pressureObservationConfirmed: false,
    gravityObservationConfirmed: false,
    choiceActiveResponseConfirmed: false,
  });
  assertEqual("P46 missing Presence Carry unavailable", missingCarry.status, "UNAVAILABLE");
  if (missingCarry.status === "UNAVAILABLE") assertEqual("P46 missing Presence Carry reason", missingCarry.reason, "PRESENCE_CARRY_REQUIRED");

  const brokenCarry = runtime.resolveRealityExperienceContinuityOptimization({
    presenceCarry: { ...presenceCarry, presenceContinuity: "BROKEN" },
    pressureRuntime: pressure(false),
    gravityRuntime: null,
    choiceRuntime: null,
    pressureObservationConfirmed: false,
    gravityObservationConfirmed: false,
    choiceActiveResponseConfirmed: false,
  });
  assertEqual("P46 broken Presence Carry blocked", brokenCarry.status, "BLOCKED");
  if (brokenCarry.status === "BLOCKED") assertEqual("P46 broken Presence Carry reason", brokenCarry.reason, "PRESENCE_CARRY_DISCONTINUITY");
}

if (failures.length > 0) {
  console.error(`FAIL | check-reality-experience-continuity-optimization | count=${failures.length}`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log("PASS | check-reality-experience-continuity-optimization");
}
