import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/lifeJourneyFullLoopRevalidation.ts",
  service: "src/services/lifeJourneyFullLoopRevalidation.ts",
  optimizationType: "src/types/lifeJourneyExperienceOptimizationReview.ts",
  p40Service: "src/services/lifeJourneyFullLoopAcceptance.ts",
  p42Service: "src/services/recognitionRealityEntryBridgeFix.ts",
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
    "LifeJourneyFullLoopRevalidation",
    "genesisContinuity",
    "recognitionContinuity",
    "realityEntryContinuity",
    "pressureExperienceState",
    "gravityExperienceState",
    "choiceAgencyState",
    "crystalCompletionState",
    "overallJourneyState",
    "noGenesisReset",
    "noPrematureRealityEntry",
    "PENDING_HUMAN_REVALIDATION",
    "noAutomaticRepair",
    "noStorageData",
    "noEngineResult",
  ].forEach((marker) => assertIncludes("P43 revalidation type", source.type, marker));

  [
    "reviewLifeJourneyFullLoopRevalidation",
    "LIFE_JOURNEY_FULL_LOOP_REVALIDATION_SEQUENCE",
    "LIFE_JOURNEY_FULL_LOOP_REVALIDATION_ACTIONS",
    "FULL_LOOP_ACCEPTANCE_REQUIRED",
    "BRIDGE_FIX_REQUIRED",
    "FULL_LOOP_SEQUENCE_INVALID",
    "USER_ACTION_SEQUENCE_INVALID",
    "P42_BRIDGE_NOT_CONTINUOUS",
    "noAutomaticRepair",
    "noRuntimeMutation",
    "noUIMutation",
    "noVisualStateMutation",
    "noGenesisMutation",
    "noRealityMutation",
    "noCrystalMutation",
    "BRIDGE_READY",
    "CONTINUOUS",
  ].forEach((marker) => assertIncludes("P43 revalidation service", source.service, marker));

  [
    "PRESENCE_CARRY_BREAK",
    "DISTANCE_LANGUAGE_MISMATCH",
  ].forEach((marker) => assertIncludes("P43 issue category extension", source.optimizationType, marker));

  [
    "setPreviewStageIndex(0)",
    "resetGenesisPreviewIntegration",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "createRenderer",
    "generatePressure",
    "generateGravity",
    "generateChoice",
    "generateCrystal",
  ].forEach((marker) => assertExcludes("P43 service remains review-only", source.service, marker));

  [
    "resolveRecognitionRealityEntryBridgeFix",
    "data-recognition-reality-bridge-state",
    "data-recognition-reality-bridge-integrity",
    "effectivePreviewStageIndex",
    "const revealComplete = crystalRecognitionConfirmed",
    "if (recognitionEntered && !crystalRecognitionConfirmed)",
  ].forEach((marker) => assertIncludes("P43 P42 bridge evidence", source.harness, marker));

  [
    "BRIDGE_READY",
    "CONTINUOUS",
    "REALITY_ENTRY_READY",
    "PRESSURE_READY",
  ].forEach((marker) => assertIncludes("P43 P42 bridge contract", source.p42Service, marker));

  [
    "LifeJourneyFullLoopRevalidation",
    "LifeJourneyFullLoopRevalidationInput",
    "LifeJourneyFullLoopRevalidationResult",
    "from \"./lifeJourneyFullLoopRevalidation\"",
  ].forEach((marker) => assertIncludes("P43 type index export", source.typeIndex, marker));
  assertIncludes(
    "P43 gate registered",
    packageJson.scripts?.["check-life-journey-full-loop-revalidation"] ?? "",
    "node scripts/check-life-journey-full-loop-revalidation.mjs",
  );
  assertIncludes(
    "P43 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-life-journey-full-loop-revalidation",
  );

  const modulePath = path.join(
    os.tmpdir(),
    `guanyao-life-journey-full-loop-revalidation-${process.pid}.mjs`,
  );
  await build({
    stdin: {
      contents: `
        export { reviewLifeJourneyFullLoopRevalidation } from "./src/services/lifeJourneyFullLoopRevalidation.ts";
        export { reviewLifeJourneyFullLoop } from "./src/services/lifeJourneyFullLoopAcceptance.ts";
        export { resolveRecognitionRealityEntryBridgeFix } from "./src/services/recognitionRealityEntryBridgeFix.ts";
      `,
      resolveDir: rootDir,
      sourcefile: "life-journey-full-loop-revalidation-gate-entry.ts",
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
  const fullLoopAcceptance = runtime.reviewLifeJourneyFullLoop({
    observedStages: sequence,
    observedActions: actions,
    entryExperience: "PASS",
    genesisContinuity: "PASS",
    recognitionExperience: "PASS",
    realityTransition: "PASS",
    transformationFlow: "PASS",
    crystalCompletion: "PASS",
  });
  const bridgeFix = runtime.resolveRecognitionRealityEntryBridgeFix({
    genesisCompleted: true,
    recognitionConfirmed: true,
    realityEntryConfirmed: true,
    sessionContinuityState: "CONTINUOUS",
  });
  const baseInput = {
    fullLoopAcceptance,
    bridgeFix,
    observedStages: sequence,
    observedActions: actions,
    genesisContinuity: "PASS",
    recognitionContinuity: "PASS",
    realityEntryContinuity: "PASS",
    pressureExperienceState: "PASS",
    gravityExperienceState: "PASS",
    choiceAgencyState: "PASS",
    crystalCompletionState: "PASS",
    revalidationIssues: [
      {
        stage: "RECOGNITION",
        issueType: "PRESENCE_CARRY_BREAK",
        observation: "待人工确认生命陪伴是否持续。",
        manualAcceptanceNote: "复验时确认 Presence 是否保持。",
      },
      {
        stage: "REALITY_ENTRY",
        issueType: "DISTANCE_LANGUAGE_MISMATCH",
        observation: "检查空间距离语言是否连贯。",
        manualAcceptanceNote: "复验时确认入口语言。",
      },
    ],
  };
  const revalidated = runtime.reviewLifeJourneyFullLoopRevalidation(baseInput);
  assertEqual("P43 revalidation status", revalidated.status, "READY");
  assertEqual("P43 revalidation review status", revalidated.reviewStatus, "REVALIDATED");
  assertEqual("P43 overall journey state", revalidated.review?.overallJourneyState, "PASS");
  assertEqual("P43 bridge state", revalidated.review?.bridgeState, "BRIDGE_READY");
  assertEqual("P43 bridge integrity", revalidated.review?.bridgeIntegrity, "CONTINUOUS");
  assertEqual("P43 no Genesis reset", revalidated.review?.noGenesisReset, true);
  assertEqual("P43 no premature Reality", revalidated.review?.noPrematureRealityEntry, true);
  assertEqual("P43 issue count", revalidated.review?.revalidationIssues.length, 2);

  const missingP40 = runtime.reviewLifeJourneyFullLoopRevalidation({
    ...baseInput,
    fullLoopAcceptance: null,
  });
  assertEqual("P43 missing P40 unavailable", missingP40.status, "UNAVAILABLE");
  assertEqual("P43 missing P40 reason", missingP40.reason, "FULL_LOOP_ACCEPTANCE_REQUIRED");

  const missingP42 = runtime.reviewLifeJourneyFullLoopRevalidation({
    ...baseInput,
    bridgeFix: null,
  });
  assertEqual("P43 missing P42 unavailable", missingP42.status, "UNAVAILABLE");
  assertEqual("P43 missing P42 reason", missingP42.reason, "BRIDGE_FIX_REQUIRED");

  const brokenBridge = runtime.resolveRecognitionRealityEntryBridgeFix({
    genesisCompleted: true,
    recognitionConfirmed: true,
    realityEntryConfirmed: false,
    sessionContinuityState: "RESET_DETECTED",
  });
  const brokenReview = runtime.reviewLifeJourneyFullLoopRevalidation({
    ...baseInput,
    bridgeFix: brokenBridge,
  });
  assertEqual("P43 broken P42 blocked", brokenReview.status, "BLOCKED");
  assertEqual("P43 broken P42 reason", brokenReview.reason, "BRIDGE_FIX_BLOCKED");

  const invalidSequence = runtime.reviewLifeJourneyFullLoopRevalidation({
    ...baseInput,
    observedStages: Object.freeze(sequence.slice(0, 8)),
  });
  assertEqual("P43 invalid sequence blocked", invalidSequence.status, "BLOCKED");
  assertEqual("P43 invalid sequence reason", invalidSequence.reason, "FULL_LOOP_SEQUENCE_INVALID");
}

if (failures.length > 0) {
  console.error(`FAIL | check-life-journey-full-loop-revalidation | count=${failures.length}`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log("PASS | check-life-journey-full-loop-revalidation");
}
