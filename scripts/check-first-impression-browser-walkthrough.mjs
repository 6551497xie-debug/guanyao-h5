import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/firstImpressionBrowserWalkthrough.ts",
  service: "src/services/firstImpressionBrowserWalkthrough.ts",
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
    "FirstImpressionBrowserWalkthrough",
    "entryFirstView",
    "genesisJourneyFeeling",
    "timeDeliveryClarity",
    "recognitionFeeling",
    "realityTransitionFeeling",
    "blockingIssues",
    "ENTRY",
    "GENESIS",
    "RECOGNITION",
    "REALITY_ENTRY",
    "PRESSURE_READY",
    "FIRST_IMPRESSION_GAP",
    "GENESIS_SEMANTIC_DRIFT",
    "TIME_DELIVERY_CONFUSION",
    "RECOGNITION_EMOTION_WEAK",
    "REALITY_ENTRY_TRANSITION_WEAK",
    "noAutomaticRepair",
    "noRuntimeMutation",
    "noProductMetrics",
  ].forEach((marker) =>
    assertIncludes("P50 walkthrough type", source.type, marker),
  );

  [
    "reviewFirstImpressionBrowserWalkthrough",
    "FIRST_IMPRESSION_WALKTHROUGH_UPSTREAM_REFERENCES",
    "FIRST_IMPRESSION_BROWSER_WALKTHROUGH_SEQUENCE",
    "UPSTREAM_REFERENCES_REQUIRED",
    "OBSERVED_STAGES_REQUIRED",
    "UPSTREAM_REFERENCE_INVALID",
    "OBSERVED_SEQUENCE_INVALID",
    "WALKTHROUGH_BOUNDARY_INVALID",
    "P40_FULL_LOOP_ACCEPTANCE",
    "P41_EXPERIENCE_OPTIMIZATION_REVIEW",
    "P43_FULL_LOOP_REVALIDATION",
    "P44_SPATIAL_DISTANCE_CALIBRATION",
    "P45_PRESENCE_CARRY",
    "P46_REALITY_CONTINUITY",
    "P47_REALITY_FULL_EXPERIENCE_ACCEPTANCE",
    "P48_FIRST_IMPRESSION_CALIBRATION",
    "P49_RELEASE_GATE_ALIGNMENT",
    "walkthroughReviewOnly",
    "manualObservationOnly",
    "noAutomaticRepair",
    "noRuntimeMutation",
    "noUIMutation",
    "noGenesisMutation",
    "noRealityMutation",
    "noEngineMutation",
    "noStorage",
    "noArchive",
    "noProductMetrics",
    "noCommercialFlow",
  ].forEach((marker) =>
    assertIncludes("P50 walkthrough service", source.service, marker),
  );

  [
    "localStorage",
    "sessionStorage",
    "fetch(",
    "window.",
    "document.",
    "requestAnimationFrame",
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "runHexagramCalculation",
    "setPreviewStageIndex",
    "resetGenesis",
    "createRenderer",
    "createRenderPlan",
  ].forEach((marker) =>
    assertExcludes("P50 remains manual-review-only", source.service, marker),
  );

  assertIncludes(
    "P50 type index export",
    source.typeIndex,
    "./firstImpressionBrowserWalkthrough",
  );
  assertIncludes(
    "P50 standalone gate registered",
    packageJson.scripts?.["check-first-impression-browser-walkthrough"] ?? "",
    "node scripts/check-first-impression-browser-walkthrough.mjs",
  );
  assertIncludes(
    "P50 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-first-impression-browser-walkthrough",
  );

  const modulePath = path.join(
    os.tmpdir(),
    `guanyao-first-impression-browser-walkthrough-${process.pid}.mjs`,
  );
  await build({
    stdin: {
      contents:
        'export { reviewFirstImpressionBrowserWalkthrough } from "./src/services/firstImpressionBrowserWalkthrough.ts";',
      resolveDir: rootDir,
      sourcefile: "first-impression-browser-walkthrough-gate-entry.ts",
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
  const upstreamReferences = Object.freeze([
    "P40_FULL_LOOP_ACCEPTANCE",
    "P41_EXPERIENCE_OPTIMIZATION_REVIEW",
    "P43_FULL_LOOP_REVALIDATION",
    "P44_SPATIAL_DISTANCE_CALIBRATION",
    "P45_PRESENCE_CARRY",
    "P46_REALITY_CONTINUITY",
    "P47_REALITY_FULL_EXPERIENCE_ACCEPTANCE",
    "P48_FIRST_IMPRESSION_CALIBRATION",
    "P49_RELEASE_GATE_ALIGNMENT",
  ]);
  const observedStages = Object.freeze([
    "ENTRY",
    "GENESIS",
    "RECOGNITION",
    "REALITY_ENTRY",
    "PRESSURE_READY",
  ]);
  const complete = runtime.reviewFirstImpressionBrowserWalkthrough({
    upstreamReferences,
    observedStages,
    entryFirstView: "LIFE_OBSERVATION_SPACE",
    genesisJourneyFeeling: "COSMIC_LIFE_JOURNEY",
    timeDeliveryClarity: "LIFE_TIME_DELIVERY",
    recognitionFeeling: "LIFE_RECOGNITION",
    realityTransitionFeeling: "PRESENCE_CARRIES_INTO_REALITY",
  });
  assertEqual("P50 complete result ready", complete.status, "READY");
  assertEqual("P50 complete walkthrough", complete.reviewStatus, "WALKTHROUGH_COMPLETE");
  assertEqual("P50 entry first view", complete.review?.entryFirstView, "LIFE_OBSERVATION_SPACE");
  assertEqual("P50 TIME_DELIVERY clarity", complete.review?.timeDeliveryClarity, "LIFE_TIME_DELIVERY");
  assertEqual("P50 Reality carry", complete.review?.realityTransitionFeeling, "PRESENCE_CARRIES_INTO_REALITY");
  assertEqual("P50 no automatic repair", complete.review?.noAutomaticRepair, true);

  const issue = runtime.reviewFirstImpressionBrowserWalkthrough({
    upstreamReferences,
    observedStages,
    entryFirstView: "TEST_TOOL_PERCEPTION",
    genesisJourneyFeeling: "ANIMATION_OR_TOOL",
    timeDeliveryClarity: "FORM_SUBMISSION",
    recognitionFeeling: "RESULT_GENERATION",
    realityTransitionFeeling: "SEPARATE_ANALYSIS_SPACE",
    blockingIssues: [
      {
        stage: "ENTRY",
        issueType: "FIRST_IMPRESSION_GAP",
        observation: "首屏仍像测试工具。",
        manualReviewNote: "记录体验问题，不自动修复。",
      },
    ],
  });
  assertEqual("P50 issue result ready", issue.status, "READY");
  assertEqual("P50 issue review status", issue.reviewStatus, "NEEDS_REVIEW");
  assertEqual("P50 issue category", issue.review?.issueTypes[0], "FIRST_IMPRESSION_GAP");

  const missingUpstream = runtime.reviewFirstImpressionBrowserWalkthrough({
    upstreamReferences: Object.freeze([]),
    observedStages,
  });
  assertEqual("P50 missing upstream unavailable", missingUpstream.status, "UNAVAILABLE");
  assertEqual("P50 missing upstream reason", missingUpstream.reason, "UPSTREAM_REFERENCES_REQUIRED");

  const invalidSequence = runtime.reviewFirstImpressionBrowserWalkthrough({
    upstreamReferences,
    observedStages: Object.freeze([
      "ENTRY",
      "GENESIS",
      "REALITY_ENTRY",
      "RECOGNITION",
      "PRESSURE_READY",
    ]),
  });
  assertEqual("P50 invalid sequence blocked", invalidSequence.status, "BLOCKED");
  assertEqual("P50 invalid sequence reason", invalidSequence.reason, "OBSERVED_SEQUENCE_INVALID");
}

if (failures.length > 0) {
  console.error(`FAIL | check-first-impression-browser-walkthrough | count=${failures.length}`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("PASS | check-first-impression-browser-walkthrough");
}
