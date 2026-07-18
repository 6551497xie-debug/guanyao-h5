import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/firstImpressionExperienceCalibration.ts",
  service: "src/services/firstImpressionExperienceCalibration.ts",
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
    "FirstImpressionExperienceCalibration",
    "entryAtmosphere",
    "expectationAlignment",
    "identityDistance",
    "curiosityState",
    "firstActionClarity",
    "COSMIC_LIFE_ENTRY",
    "LIFE_JOURNEY",
    "DISTANT_FROM_TESTING",
    "AWAKENED",
    "TIME_DELIVERY_CLEAR",
    "TIME_DELIVERY_ONLY",
    "TEST_PERCEPTION_DRIFT",
    "ENTRY_MEANING_WEAK",
    "FIRST_ACTION_UNCLEAR",
    "COSMIC_SCALE_WEAK",
    "LIFE_JOURNEY_UNDERSTANDING_WEAK",
    "noTestFlow",
    "noCommercialFlow",
  ].forEach((marker) =>
    assertIncludes("P48 first-impression type", source.type, marker),
  );

  [
    "reviewFirstImpressionExperienceCalibration",
    "FIRST_IMPRESSION_UPSTREAM_REVIEW_REFERENCES",
    "FIRST_IMPRESSION_EXPERIENCE_SEQUENCE",
    "UPSTREAM_REVIEW_REFERENCES_REQUIRED",
    "OBSERVED_ENTRY_SEQUENCE_REQUIRED",
    "UPSTREAM_REVIEW_REFERENCE_INVALID",
    "OBSERVED_ENTRY_SEQUENCE_INVALID",
    "TIME_DELIVERY_BOUNDARY_MISSING",
    "FIRST_IMPRESSION_CALIBRATION_BOUNDARY_INVALID",
    "P40_FULL_LOOP_ACCEPTANCE",
    "P41_EXPERIENCE_OPTIMIZATION_REVIEW",
    "P43_FULL_LOOP_REVALIDATION",
    "P44_SPATIAL_DISTANCE_CALIBRATION",
    "P45_PRESENCE_CARRY",
    "P46_REALITY_CONTINUITY",
    "P47_REALITY_FULL_EXPERIENCE_ACCEPTANCE",
    "calibrationReviewOnly",
    "manualObservationOnly",
    "noAutomaticOptimization",
    "noRuntimeMutation",
    "noLifeSystemMutation",
    "noGenesisMutation",
    "noRealityMutation",
    "noEngineMutation",
    "noStorage",
    "noPayment",
    "noMarketingFunnel",
  ].forEach((marker) =>
    assertIncludes("P48 first-impression service", source.service, marker),
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
    assertExcludes("P48 remains calibration-only", source.service, marker),
  );

  assertIncludes(
    "P48 type index export",
    source.typeIndex,
    "./firstImpressionExperienceCalibration",
  );
  assertIncludes(
    "P48 gate registered",
    packageJson.scripts?.["check-first-impression-experience-calibration"] ?? "",
    "node scripts/check-first-impression-experience-calibration.mjs",
  );
  assertIncludes(
    "P48 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-first-impression-experience-calibration",
  );

  const modulePath = path.join(
    os.tmpdir(),
    `guanyao-first-impression-calibration-${process.pid}.mjs`,
  );
  await build({
    stdin: {
      contents:
        'export { reviewFirstImpressionExperienceCalibration } from "./src/services/firstImpressionExperienceCalibration.ts";',
      resolveDir: rootDir,
      sourcefile: "first-impression-calibration-gate-entry.ts",
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

  const references = Object.freeze([
    "P40_FULL_LOOP_ACCEPTANCE",
    "P41_EXPERIENCE_OPTIMIZATION_REVIEW",
    "P43_FULL_LOOP_REVALIDATION",
    "P44_SPATIAL_DISTANCE_CALIBRATION",
    "P45_PRESENCE_CARRY",
    "P46_REALITY_CONTINUITY",
    "P47_REALITY_FULL_EXPERIENCE_ACCEPTANCE",
  ]);
  const stages = Object.freeze([
    "ENTRY",
    "GENESIS",
    "RECOGNITION",
    "REALITY_ENTRY",
    "PRESSURE",
    "GRAVITY",
    "CHOICE",
    "CRYSTAL",
  ]);
  const calibrated = runtime.reviewFirstImpressionExperienceCalibration({
    upstreamReviewReferences: references,
    observedStages: stages,
    timeDeliveryAvailable: true,
    entryAtmosphere: "COSMIC_LIFE_ENTRY",
    expectationAlignment: "LIFE_JOURNEY",
    identityDistance: "DISTANT_FROM_TESTING",
    curiosityState: "AWAKENED",
    firstActionClarity: "TIME_DELIVERY_CLEAR",
  });
  assertEqual("P48 calibrated result ready", calibrated.status, "READY");
  assertEqual("P48 calibrated status", calibrated.reviewStatus, "CALIBRATED");
  assertEqual("P48 entry atmosphere", calibrated.review?.entryAtmosphere, "COSMIC_LIFE_ENTRY");
  assertEqual("P48 expectation alignment", calibrated.review?.expectationAlignment, "LIFE_JOURNEY");
  assertEqual("P48 TIME_DELIVERY boundary", calibrated.review?.timeDeliveryBoundary, "TIME_DELIVERY_ONLY");
  assertEqual("P48 no test flow", calibrated.review?.noTestFlow, true);

  const pending = runtime.reviewFirstImpressionExperienceCalibration({
    upstreamReviewReferences: references,
    observedStages: stages,
    timeDeliveryAvailable: true,
  });
  assertEqual("P48 pending manual calibration", pending.reviewStatus, "PENDING_MANUAL_CALIBRATION");
  assertEqual("P48 pending quality", pending.review?.overallQuality, "PENDING");

  const issue = runtime.reviewFirstImpressionExperienceCalibration({
    upstreamReviewReferences: references,
    observedStages: stages,
    timeDeliveryAvailable: true,
    entryAtmosphere: "TOOL_LIKE",
    expectationAlignment: "TEST_ORIENTED",
    identityDistance: "TESTING_PRESENT",
    curiosityState: "QUIET",
    firstActionClarity: "TIME_DELIVERY_UNCLEAR",
    issues: Object.freeze([
      Object.freeze({
        stage: "ENTRY",
        issueType: "TEST_PERCEPTION_DRIFT",
        observation: "入口仍被理解为测试工具",
        manualCalibrationNote: "恢复生命观察旅程语义",
      }),
    ]),
  });
  assertEqual("P48 issue status", issue.reviewStatus, "NEEDS_REVIEW");
  assertEqual("P48 issue category", issue.review?.issueTypes[0], "TEST_PERCEPTION_DRIFT");

  const missingReferences = runtime.reviewFirstImpressionExperienceCalibration({
    upstreamReviewReferences: Object.freeze([]),
    observedStages: stages,
    timeDeliveryAvailable: true,
  });
  assertEqual("P48 missing upstream unavailable", missingReferences.status, "UNAVAILABLE");
  assertEqual("P48 missing upstream reason", missingReferences.reason, "UPSTREAM_REVIEW_REFERENCES_REQUIRED");

  const missingTimeDelivery = runtime.reviewFirstImpressionExperienceCalibration({
    upstreamReviewReferences: references,
    observedStages: stages,
    timeDeliveryAvailable: false,
  });
  assertEqual("P48 missing TIME_DELIVERY blocked", missingTimeDelivery.status, "BLOCKED");
  assertEqual("P48 missing TIME_DELIVERY reason", missingTimeDelivery.reason, "TIME_DELIVERY_BOUNDARY_MISSING");

  const invalidSequence = runtime.reviewFirstImpressionExperienceCalibration({
    upstreamReviewReferences: references,
    observedStages: Object.freeze([
      "ENTRY",
      "GENESIS",
      "REALITY_ENTRY",
      "RECOGNITION",
      "PRESSURE",
      "GRAVITY",
      "CHOICE",
      "CRYSTAL",
    ]),
    timeDeliveryAvailable: true,
  });
  assertEqual("P48 invalid sequence blocked", invalidSequence.status, "BLOCKED");
  assertEqual("P48 invalid sequence reason", invalidSequence.reason, "OBSERVED_ENTRY_SEQUENCE_INVALID");
}

if (failures.length > 0) {
  console.error(`FAIL | check-first-impression-experience-calibration | count=${failures.length}`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("PASS | check-first-impression-experience-calibration");
}
