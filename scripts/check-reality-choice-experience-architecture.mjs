import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/realityChoiceExperienceArchitecture.ts",
  service: "src/services/realityChoiceExperienceArchitecture.ts",
  gravityType: "src/types/realityGravityExperienceArchitecture.ts",
  typeIndex: "src/types/index.ts",
  packageManifest: "package.json",
});
const failures = [];
const assertIncludes = (name, source, marker) => {
  if (source.includes(marker)) console.log(`PASS | ${name} | includes=${marker}`);
  else failures.push(`${name} missing=${marker}`);
};
const assertExcludes = (name, source, marker) => {
  if (source.includes(marker)) failures.push(`${name} forbidden=${marker}`);
  else console.log(`PASS | ${name} | forbidden=absent`);
};
const assertEqual = (name, actual, expected) => {
  if (actual === expected) console.log(`PASS | ${name} | expected=${String(expected)}`);
  else failures.push(`${name} expected=${String(expected)} actual=${String(actual)}`);
};
const absolute = Object.fromEntries(
  Object.entries(files).map(([name, relative]) => [name, path.join(rootDir, relative)]),
);

for (const [name, filePath] of Object.entries(absolute)) {
  if (fs.existsSync(filePath)) console.log(`PASS | ${name} file exists`);
  else failures.push(`${name} missing=${filePath}`);
}

if (failures.length === 0) {
  const source = Object.fromEntries(
    Object.entries(absolute).map(([name, filePath]) => [name, fs.readFileSync(filePath, "utf8")]),
  );
  const packageJson = JSON.parse(source.packageManifest);

  [
    "RealityChoiceExperienceArchitecture",
    "choiceEntryState",
    "inertiaAwarenessLayer",
    "responseGapLayer",
    "alternativeResponseLayer",
    "activeChoiceLayer",
    "choiceReadinessBoundary",
    "crystalPreparationBoundary",
    "InertiaAwarenessLayer",
    "ResponseGapLayer",
    "AlternativeResponseLayer",
    "ActiveChoiceLayer",
    "CRYSTAL_READINESS_BOUNDARY_READY",
    "RECOGNIZE_AUTOMATIC_RESPONSE",
    "STIMULUS_TO_RESPONSE_SPACE",
    "MULTIPLE_RESPONSES_MAY_EXIST",
    "USER_DECIDES_WHETHER_TO_TRY",
    "USER_DECISION_NOT_SYSTEM_DECISION",
    "FUTURE_DEPOSIT_ONLY",
    "noBehaviorRecommendation",
    "noUserScoring",
    "noPersonalityJudgment",
    "noImmediateChangeRequired",
    "noSystemDecision",
    "noSingleAnswer",
    "noBehaviorPlan",
    "noRecommendation",
    "noAiSubstitution",
    "noForcedAction",
    "noTaskAssignment",
    "noRecommendedAnswer",
    "noChoiceResult",
    "noCrystalResult",
    "noCrystalGeneration",
    "noArchiveGeneration",
    "noGravityMutation",
    "noGenesisMutation",
    "noIdentityMutation",
    "noUserProfile",
    "noStorageWrite",
    "noUiIntegration",
    "noRendererInvocation",
    "noProductionIntegration",
  ].forEach((marker) => assertIncludes("P25 architecture type", source.type, marker));

  [
    "reviewRealityChoiceExperienceArchitecture",
    "GRAVITY_EXPERIENCE_ARCHITECTURE_REQUIRED",
    "GRAVITY_EXPERIENCE_ARCHITECTURE_INVALID",
    "GRAVITY_OBSERVATION_COMPLETED",
    "REALITY_CHOICE_EXPERIENCE_ARCHITECTURE",
    "INERTIA_AWARENESS",
    "RESPONSE_GAP_OPENING",
    "ALTERNATIVE_RESPONSE_POSSIBILITY",
    "USER_OWNED_ACTIVE_CHOICE",
    "CHOICE_READINESS_BOUNDARY",
    "CRYSTAL_PREPARATION_BOUNDARY",
    "INERTIA_OBSERVATION_TO_RESPONSE_SPACE",
    "GENESIS_REMAINS_ISOLATED",
    "noBehaviorGeneration",
    "noDecisionAdvice",
    "noTaskAssignment",
    "noResultPrediction",
    "noAiSubstitution",
    "noGravityMutation",
    "noCrystalGeneration",
    "noArchiveGeneration",
    "noGenesisMutation",
    "noIdentityMutation",
    "noUserProfile",
    "noStorageWrite",
    "noUiIntegration",
    "noRendererInvocation",
    "noProductionIntegration",
  ].forEach((marker) => assertIncludes("P25 architecture service", source.service, marker));

  [
    "generateBehavior",
    "recommendBehavior",
    "assignTask",
    "predictChoice",
    "resolveChoice",
    "generateCrystal",
    "createCrystal",
    "reviewRealityGravityExperienceArchitecture",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "document.",
  ].forEach((marker) => assertExcludes("P25 remains architecture review only", source.service, marker));

  [
    "RealityGravityExperienceArchitecture",
    "gravityReference",
    "CHOICE_READINESS_BOUNDARY_READY",
    "noBehaviorScoring",
    "noBehaviorPrediction",
    "noBehaviorAdvice",
    "noChoiceInvocation",
    "noChoiceResult",
    "noCrystalGeneration",
  ].forEach((marker) => assertIncludes("P25 Gravity upstream boundary", source.gravityType + source.type, marker));

  [
    "ChoiceEntryState",
    "RealityChoiceExperienceArchitectureResult",
    "from \"./realityChoiceExperienceArchitecture\"",
  ].forEach((marker) => assertIncludes("P25 type index export", source.typeIndex, marker));
  assertIncludes(
    "P25 gate registered",
    packageJson.scripts?.["check-reality-choice-experience-architecture"] ?? "",
    "node scripts/check-reality-choice-experience-architecture.mjs",
  );
  assertIncludes(
    "P25 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-reality-choice-experience-architecture",
  );

  const modulePath = path.join(os.tmpdir(), `guanyao-reality-choice-experience-architecture-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { reviewRealityChoiceExperienceArchitecture } from "./src/services/realityChoiceExperienceArchitecture.ts";`,
      resolveDir: rootDir,
      sourcefile: "reality-choice-experience-architecture-gate-entry.ts",
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
  const gravityReference = Object.freeze({
    semanticRole: "REALITY_GRAVITY_EXPERIENCE_ARCHITECTURE",
    gravityEntryState: "PRESSURE_RECOGNITION_COMPLETED",
    pressureGravityBoundary: "PRESSURE_OBSERVATION_TO_INERTIA_OBSERVATION",
    genesisBoundary: "GENESIS_REMAINS_ISOLATED",
    inertiaObservationLayer: Object.freeze({
      noBehaviorScoring: true,
      noPersonalityLabel: true,
      noUserConclusion: true,
    }),
    automaticResponseLayer: Object.freeze({
      noBehaviorPrediction: true,
      noCorrection: true,
    }),
    patternRecognitionLayer: Object.freeze({
      noPersonalityLabel: true,
      noDestinyJudgment: true,
    }),
    inertiaTensionLayer: Object.freeze({
      noBehaviorAdvice: true,
    }),
    interventionBoundary: Object.freeze({
      noInertiaCalculation: true,
      noBehaviorScoring: true,
      noBehaviorPrediction: true,
      noUserEvaluation: true,
      noBehaviorAdvice: true,
      noChoiceInvocation: true,
      noChoiceResult: true,
      noCrystalGeneration: true,
    }),
    readinessState: "CHOICE_READINESS_BOUNDARY_READY",
  });
  const ready = runtime.reviewRealityChoiceExperienceArchitecture({
    gravityExperienceArchitecture: gravityReference,
  });
  assertEqual("P25 valid architecture ready", ready.status, "READY");
  if (ready.status === "READY") {
    assertEqual(
      "P25 preserves Gravity reference",
      ready.architecture.gravityReference,
      gravityReference,
    );
    assertEqual("P25 Choice entry", ready.architecture.choiceEntryState, "GRAVITY_OBSERVATION_COMPLETED");
    assertEqual(
      "P25 response gap opens",
      ready.architecture.responseGapLayer.gapMode,
      "STIMULUS_TO_RESPONSE_SPACE",
    );
    assertEqual(
      "P25 alternatives remain open",
      ready.architecture.alternativeResponseLayer.possibilityMode,
      "MULTIPLE_RESPONSES_MAY_EXIST",
    );
    assertEqual(
      "P25 active choice remains user-owned",
      ready.architecture.activeChoiceLayer.agencyMode,
      "USER_DECIDES_WHETHER_TO_TRY",
    );
    assertEqual("P25 no behavior recommendation", ready.boundary.noDecisionAdvice, true);
    assertEqual("P25 no Crystal", ready.boundary.noCrystal, true);
    assertEqual("P25 Gravity not mutated", ready.boundary.noGravityMutation, true);
  }
  const missing = runtime.reviewRealityChoiceExperienceArchitecture({
    gravityExperienceArchitecture: null,
  });
  assertEqual("P25 missing Gravity unavailable", missing.status, "UNAVAILABLE");
  assertEqual(
    "P25 missing Gravity reason",
    missing.reason,
    "GRAVITY_EXPERIENCE_ARCHITECTURE_REQUIRED",
  );
  const invalid = runtime.reviewRealityChoiceExperienceArchitecture({
    gravityExperienceArchitecture: Object.freeze({
      ...gravityReference,
      interventionBoundary: Object.freeze({
        ...gravityReference.interventionBoundary,
        noCrystalGeneration: false,
      }),
    }),
  });
  assertEqual("P25 invalid Gravity blocked", invalid.status, "BLOCKED");
  assertEqual(
    "P25 invalid Gravity reason",
    invalid.reason,
    "GRAVITY_EXPERIENCE_ARCHITECTURE_INVALID",
  );
}

if (failures.length > 0) {
  console.error("\nReality Choice Experience Architecture gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nReality Choice Experience Architecture gate passed.");
