import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/lifeJourneyFullLoopAcceptance.ts",
  service: "src/services/lifeJourneyFullLoopAcceptance.ts",
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
    "LifeJourneyFullLoopAcceptance",
    "entryExperience",
    "genesisContinuity",
    "recognitionExperience",
    "realityTransition",
    "transformationFlow",
    "crystalCompletion",
    "journeyIntegrity",
    "ENTRY_DISCONNECTION",
    "GENESIS_DISRUPTION",
    "RECOGNITION_WEAK",
    "REALITY_TRANSITION_BREAK",
    "CHOICE_AGENCY_WEAK",
    "CRYSTAL_IMPRINT_WEAK",
    "TIME_DELIVERY",
    "CHOICE_ACTIVE_RESPONSE",
    "CRYSTAL_RECOGNITION_CONFIRM",
    "JOURNEY_COMPLETE",
    "PENDING_HUMAN_REVIEW",
  ].forEach((marker) => assertIncludes("P40 full loop type", source.type, marker));

  [
    "reviewLifeJourneyFullLoop",
    "LIFE_JOURNEY_FULL_LOOP_SEQUENCE",
    "LIFE_JOURNEY_FULL_LOOP_ACTIONS",
    "FULL_LOOP_SEQUENCE_INVALID",
    "JOURNEY_COMPLETE_NOT_REACHABLE",
    "USER_ACTION_SEQUENCE_INVALID",
    "FULL_LOOP_ACCEPTANCE_BOUNDARY_INVALID",
    "acceptanceReviewOnly",
    "noRuntimeMutation",
    "noUIMutation",
    "noVisualStateMutation",
    "noGenesisMutation",
    "noRealityMutation",
    "noCrystalMutation",
    "PENDING_HUMAN_REVIEW",
  ].forEach((marker) => assertIncludes("P40 full loop service", source.service, marker));

  [
    "resolveStarbeastFromBirthDate",
    "resolveLifeArchetypeProfileFromMotherCode",
    "runMotherCodeLandingEngine",
    "runLifeArchetypeEngine",
    "runHexagramCalculation",
    "runFourSymbolEngine",
    "createRenderer",
    "createRenderPlan",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "document.",
    "window.",
    "requestAnimationFrame",
    "saveStorage",
    "createAccount",
    "payment",
  ].forEach((marker) => assertExcludes("P40 remains acceptance-only", source.service, marker));

  [
    "LifeJourneyFullLoopAcceptance",
    "LifeJourneyFullLoopAcceptanceInput",
    "LifeJourneyFullLoopAcceptanceResult",
    "LifeJourneyExperienceIssueCategory",
    "from \"./lifeJourneyFullLoopAcceptance\"",
  ].forEach((marker) => assertIncludes("P40 type index export", source.typeIndex, marker));
  assertIncludes(
    "P40 gate registered",
    packageJson.scripts?.["check-life-journey-full-loop-acceptance"] ?? "",
    "node scripts/check-life-journey-full-loop-acceptance.mjs",
  );
  assertIncludes(
    "P40 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-life-journey-full-loop-acceptance",
  );

  const modulePath = path.join(os.tmpdir(), `guanyao-life-journey-full-loop-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { reviewLifeJourneyFullLoop } from "./src/services/lifeJourneyFullLoopAcceptance.ts";`,
      resolveDir: rootDir,
      sourcefile: "life-journey-full-loop-acceptance-gate-entry.ts",
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

  const sequence = Object.freeze([
    "ENTRY",
    "GENESIS",
    "RECOGNITION",
    "REALITY_ENTRY",
    "PRESSURE",
    "GRAVITY",
    "CHOICE",
    "CRYSTAL",
    "JOURNEY_COMPLETE",
  ]);
  const actions = Object.freeze([
    "TIME_DELIVERY",
    "CHOICE_ACTIVE_RESPONSE",
    "CRYSTAL_RECOGNITION_CONFIRM",
  ]);
  const baseInput = {
    observedStages: sequence,
    observedActions: actions,
    entryExperience: "PASS",
    genesisContinuity: "PASS",
    recognitionExperience: "PASS",
    realityTransition: "PASS",
    transformationFlow: "PASS",
    crystalCompletion: "PASS",
    issueCategories: ["RECOGNITION_WEAK"],
  };

  const accepted = runtime.reviewLifeJourneyFullLoop(baseInput);
  assertEqual("P40 full loop review status", accepted.status, "READY");
  assertEqual("P40 human review status", accepted.reviewStatus, "PENDING_HUMAN_REVIEW");
  assertEqual("P40 journey integrity", accepted.review?.journeyIntegrity, "PASS");
  assertEqual("P40 completion reachable", accepted.review?.journeyCompleteReachable, true);
  assertEqual("P40 action count", accepted.review?.actions.length, 3);
  assertEqual("P40 issue category count", accepted.review?.issueCategories.length, 1);

  const missingSequence = runtime.reviewLifeJourneyFullLoop({
    ...baseInput,
    observedStages: [],
  });
  assertEqual("P40 missing sequence unavailable", missingSequence.status, "UNAVAILABLE");
  assertEqual("P40 missing sequence reason", missingSequence.reason, "OBSERVED_SEQUENCE_REQUIRED");

  const skippedCrystal = runtime.reviewLifeJourneyFullLoop({
    ...baseInput,
    observedStages: sequence.slice(0, 8),
  });
  assertEqual("P40 skipped completion blocked", skippedCrystal.status, "BLOCKED");
  assertEqual("P40 skipped completion reason", skippedCrystal.reason, "FULL_LOOP_SEQUENCE_INVALID");

  const reordered = runtime.reviewLifeJourneyFullLoop({
    ...baseInput,
    observedStages: Object.freeze([
      "ENTRY",
      "GENESIS",
      "RECOGNITION",
      "REALITY_ENTRY",
      "PRESSURE",
      "CHOICE",
      "GRAVITY",
      "CRYSTAL",
      "JOURNEY_COMPLETE",
    ]),
  });
  assertEqual("P40 reordered stages blocked", reordered.reason, "FULL_LOOP_SEQUENCE_INVALID");

  const wrongAction = runtime.reviewLifeJourneyFullLoop({
    ...baseInput,
    observedActions: Object.freeze(["TIME_DELIVERY", "CRYSTAL_RECOGNITION_CONFIRM"]),
  });
  assertEqual("P40 wrong action sequence blocked", wrongAction.status, "BLOCKED");
  assertEqual("P40 wrong action reason", wrongAction.reason, "USER_ACTION_SEQUENCE_INVALID");
}

if (failures.length > 0) {
  console.error(`FAIL | check-life-journey-full-loop-acceptance | count=${failures.length}`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("PASS | check-life-journey-full-loop-acceptance");
}
