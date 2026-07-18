import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/lifeJourneyExperienceOptimizationReview.ts",
  service: "src/services/lifeJourneyExperienceOptimizationReview.ts",
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
    "LifeJourneyExperienceOptimizationReview",
    "firstEntryExperience",
    "genesisExperienceQuality",
    "recognitionExperienceQuality",
    "realityTransitionQuality",
    "agencyExperienceQuality",
    "crystalExperienceQuality",
    "optimizationIssues",
    "SEMANTIC_DRIFT",
    "VISUAL_WEIGHT_IMBALANCE",
    "IMMERSION_BREAK",
    "INTERACTION_MECHANICAL",
    "LIFE_PRESENCE_WEAK",
    "REALITY_TRANSITION_WEAK",
    "CHOICE_AGENCY_WEAK",
    "CRYSTAL_MEANING_WEAK",
    "manualOptimizationSuggestion",
    "PENDING_MANUAL_REVIEW",
  ].forEach((marker) => assertIncludes("P41 optimization review type", source.type, marker));

  [
    "reviewLifeJourneyExperienceOptimization",
    "LIFE_JOURNEY_OPTIMIZATION_SEQUENCE",
    "LIFE_JOURNEY_OPTIMIZATION_PRIORITY",
    "FULL_LOOP_ACCEPTANCE_REQUIRED",
    "FULL_LOOP_ACCEPTANCE_UNAVAILABLE",
    "FULL_LOOP_ACCEPTANCE_BLOCKED",
    "FULL_LOOP_SEQUENCE_INVALID",
    "OPTIMIZATION_REVIEW_BOUNDARY_INVALID",
    "manualObservationOnly",
    "noAutomaticOptimization",
    "noRuntimeMutation",
    "noUIMutation",
    "noVisualStateMutation",
    "noEngineMutation",
    "automaticOptimizationConclusion: false",
  ].forEach((marker) => assertIncludes("P41 optimization review service", source.service, marker));

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
    "autoOptimize",
  ].forEach((marker) => assertExcludes("P41 remains review-only", source.service, marker));

  [
    "LifeJourneyExperienceOptimizationReview",
    "LifeJourneyExperienceOptimizationReviewInput",
    "LifeJourneyExperienceOptimizationReviewResult",
    "LifeJourneyOptimizationIssueType",
    "from \"./lifeJourneyExperienceOptimizationReview\"",
  ].forEach((marker) => assertIncludes("P41 type index export", source.typeIndex, marker));
  assertIncludes(
    "P41 gate registered",
    packageJson.scripts?.["check-life-journey-experience-optimization-review"] ?? "",
    "node scripts/check-life-journey-experience-optimization-review.mjs",
  );
  assertIncludes(
    "P41 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-life-journey-experience-optimization-review",
  );

  const modulePath = path.join(os.tmpdir(), `guanyao-life-journey-optimization-review-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { reviewLifeJourneyExperienceOptimization } from "./src/services/lifeJourneyExperienceOptimizationReview.ts";`,
      resolveDir: rootDir,
      sourcefile: "life-journey-optimization-review-gate-entry.ts",
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
  const completeAcceptance = Object.freeze({
    status: "READY",
    reviewStatus: "PENDING_HUMAN_REVIEW",
    source: "life_journey_full_loop_acceptance",
    input: Object.freeze({ observedStages: sequence, observedActions: [] }),
    review: Object.freeze({
      sequence,
      actions: [],
      journeyIntegrity: "PASS",
      journeyCompleteReachable: true,
    }),
    boundary: Object.freeze({}),
  });
  const issue = Object.freeze({
    stage: "ENTRY",
    issueType: "INTERACTION_MECHANICAL",
    observation: "入口动作需要人工走查。",
    manualOptimizationSuggestion: "由人工体验者记录更自然的进入语义。",
  });
  const baseInput = {
    fullLoopAcceptance: completeAcceptance,
    firstEntryExperience: "NEEDS_REVIEW",
    genesisExperienceQuality: "PASS",
    recognitionExperienceQuality: "PASS",
    realityTransitionQuality: "NEEDS_REVIEW",
    agencyExperienceQuality: "PASS",
    crystalExperienceQuality: "PASS",
    optimizationIssues: [issue],
  };

  const reviewed = runtime.reviewLifeJourneyExperienceOptimization(baseInput);
  assertEqual("P41 review status", reviewed.status, "READY");
  assertEqual("P41 manual review state", reviewed.reviewStatus, "PENDING_MANUAL_REVIEW");
  assertEqual("P41 issue preserved", reviewed.review?.optimizationIssues.length, 1);
  assertEqual("P41 issue observation preserved", reviewed.review?.optimizationIssues[0].observation, issue.observation);
  assertEqual("P41 no automatic conclusion", reviewed.review?.automaticOptimizationConclusion, false);
  assertEqual("P41 priority starts with semantics", reviewed.review?.optimizationPriority[0], "SEMANTIC_CONSISTENCY");
  assertEqual("P41 priority ends with engineering", reviewed.review?.optimizationPriority[4], "ENGINEERING_OPTIMIZATION");

  const missingAcceptance = runtime.reviewLifeJourneyExperienceOptimization({
    ...baseInput,
    fullLoopAcceptance: null,
  });
  assertEqual("P41 missing P40 unavailable", missingAcceptance.status, "UNAVAILABLE");
  assertEqual("P41 missing P40 reason", missingAcceptance.reason, "FULL_LOOP_ACCEPTANCE_REQUIRED");

  const blockedAcceptance = runtime.reviewLifeJourneyExperienceOptimization({
    ...baseInput,
    fullLoopAcceptance: { ...completeAcceptance, status: "BLOCKED" },
  });
  assertEqual("P41 blocked P40 blocked", blockedAcceptance.status, "BLOCKED");
  assertEqual("P41 blocked P40 reason", blockedAcceptance.reason, "FULL_LOOP_ACCEPTANCE_BLOCKED");

  const invalidSequence = runtime.reviewLifeJourneyExperienceOptimization({
    ...baseInput,
    fullLoopAcceptance: {
      ...completeAcceptance,
      review: { ...completeAcceptance.review, journeyCompleteReachable: false },
    },
  });
  assertEqual("P41 invalid P40 sequence blocked", invalidSequence.status, "BLOCKED");
  assertEqual("P41 invalid P40 sequence reason", invalidSequence.reason, "FULL_LOOP_SEQUENCE_INVALID");
}

if (failures.length > 0) {
  console.error(`FAIL | check-life-journey-experience-optimization-review | count=${failures.length}`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("PASS | check-life-journey-experience-optimization-review");
}
