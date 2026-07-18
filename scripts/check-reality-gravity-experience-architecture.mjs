import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/realityGravityExperienceArchitecture.ts",
  service: "src/services/realityGravityExperienceArchitecture.ts",
  pressureType: "src/types/realityPressureRecognitionArchitecture.ts",
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
    "RealityGravityExperienceArchitecture",
    "gravityEntryState",
    "inertiaObservationLayer",
    "automaticResponseLayer",
    "patternRecognitionLayer",
    "choicePreparationBoundary",
    "InertiaObservationLayer",
    "AutomaticResponseLayer",
    "PatternRecognitionLayer",
    "InertiaTensionLayer",
    "CHOICE_READINESS_BOUNDARY_READY",
    "OBSERVE_PAST_RESPONSES",
    "BODY_EMOTION_THOUGHT",
    "NOTICE_REPETITION",
    "OBSERVE_OLD_RESPONSE_AGAINST_REALITY",
    "SPACE_OPEN_NOT_CHOICE",
    "noBehaviorScoring",
    "noBehaviorPrediction",
    "noUserEvaluation",
    "noPersonalityJudgment",
    "noUserConclusion",
    "noBehaviorAdvice",
    "noPressureMutation",
    "noChoiceInvocation",
    "noChoiceResult",
    "noCrystalGeneration",
    "noGenesisMutation",
    "noIdentityMutation",
    "noUserProfile",
    "noStorageWrite",
    "noUiIntegration",
    "noRendererInvocation",
    "noProductionIntegration",
  ].forEach((marker) => assertIncludes("P24 architecture type", source.type, marker));

  [
    "reviewRealityGravityExperienceArchitecture",
    "PRESSURE_RECOGNITION_ARCHITECTURE_REQUIRED",
    "PRESSURE_RECOGNITION_ARCHITECTURE_INVALID",
    "PRESSURE_RECOGNITION_COMPLETED",
    "REALITY_GRAVITY_EXPERIENCE_ARCHITECTURE",
    "INERTIA_OBSERVATION",
    "AUTOMATIC_RESPONSE_OBSERVATION",
    "REPEATED_LIFE_PATTERN_OBSERVATION",
    "INERTIA_REALITY_TENSION_OBSERVATION",
    "CHOICE_SPACE_PREPARATION",
    "PRESSURE_OBSERVATION_TO_INERTIA_OBSERVATION",
    "GENESIS_REMAINS_ISOLATED",
    "noInertiaCalculation",
    "noBehaviorScoring",
    "noBehaviorPrediction",
    "noUserEvaluation",
    "noPersonalityJudgment",
    "noUserConclusion",
    "noBehaviorAdvice",
    "noPressureMutation",
    "noChoiceInvocation",
    "noChoiceResult",
    "noCrystalGeneration",
    "noGenesisMutation",
    "noIdentityMutation",
    "noUserProfile",
    "noStorageWrite",
    "noUiIntegration",
    "noRendererInvocation",
    "noProductionIntegration",
  ].forEach((marker) => assertIncludes("P24 architecture service", source.service, marker));

  [
    "calculateInertia",
    "scoreBehavior",
    "predictBehavior",
    "judgeUser",
    "analyzeUser",
    "recommendBehavior",
    "resolveChoice",
    "generateCrystal",
    "reviewRealityPressureRecognitionArchitecture",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "document.",
  ].forEach((marker) => assertExcludes("P24 remains architecture review only", source.service, marker));

  [
    "RealityPressureRecognitionArchitecture",
    "pressureRecognitionReference",
    "PRESSURE_RECOGNITION_BOUNDARY_READY",
    "noPressureCalculation",
    "noPressureSeedMatching",
    "noGravityInvocation",
    "noChoiceInvocation",
    "noCrystalGeneration",
  ].forEach((marker) => assertIncludes("P24 Pressure upstream boundary", source.pressureType + source.type, marker));

  [
    "GravityEntryState",
    "RealityGravityExperienceArchitectureResult",
    "from \"./realityGravityExperienceArchitecture\"",
  ].forEach((marker) => assertIncludes("P24 type index export", source.typeIndex, marker));
  assertIncludes(
    "P24 gate registered",
    packageJson.scripts?.["check-reality-gravity-experience-architecture"] ?? "",
    "node scripts/check-reality-gravity-experience-architecture.mjs",
  );
  assertIncludes(
    "P24 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-reality-gravity-experience-architecture",
  );

  const modulePath = path.join(os.tmpdir(), `guanyao-reality-gravity-experience-architecture-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { reviewRealityGravityExperienceArchitecture } from "./src/services/realityGravityExperienceArchitecture.ts";`,
      resolveDir: rootDir,
      sourcefile: "reality-gravity-experience-architecture-gate-entry.ts",
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
  const pressureReference = Object.freeze({
    semanticRole: "REALITY_PRESSURE_RECOGNITION_ARCHITECTURE",
    pressureEntryState: "REALITY_ENTRY_RECEIVED",
    realitySignalLayer: Object.freeze({
      noPressureCalculation: true,
      noDiagnosis: true,
      noUserJudgment: true,
    }),
    pressureObservationLayer: Object.freeze({
      outputMode: "OBSERVATION_NOT_CONCLUSION",
      noPersonalityLabel: true,
      noDestinyJudgment: true,
    }),
    inertiaPreparationLayer: Object.freeze({
      gravityPreparationOnly: true,
      noBehaviorAdvice: true,
    }),
    interventionBoundary: Object.freeze({
      noPressureCalculation: true,
      noPressureSeedMatching: true,
      noUserJudgment: true,
      noGravityInvocation: true,
      noChoiceInvocation: true,
      noCrystalGeneration: true,
      noGenesisMutation: true,
    }),
    readinessState: "PRESSURE_RECOGNITION_BOUNDARY_READY",
    genesisBoundary: "GENESIS_COMPLETION_HELD_AND_NOT_REDEFINED",
  });
  const ready = runtime.reviewRealityGravityExperienceArchitecture({
    pressureRecognitionArchitecture: pressureReference,
  });
  assertEqual("P24 valid architecture ready", ready.status, "READY");
  if (ready.status === "READY") {
    assertEqual(
      "P24 preserves Pressure reference",
      ready.architecture.pressureRecognitionReference,
      pressureReference,
    );
    assertEqual("P24 Gravity entry", ready.architecture.gravityEntryState, "PRESSURE_RECOGNITION_COMPLETED");
    assertEqual(
      "P24 observes automatic response",
      ready.architecture.automaticResponseLayer.responseScope,
      "BODY_EMOTION_THOUGHT",
    );
    assertEqual(
      "P24 recognizes repetition",
      ready.architecture.patternRecognitionLayer.recognitionMode,
      "NOTICE_REPETITION",
    );
    assertEqual(
      "P24 opens Choice space without Choice",
      ready.architecture.choicePreparationBoundary.choiceReadiness,
      "SPACE_OPEN_NOT_CHOICE",
    );
    assertEqual("P24 no behavior scoring", ready.boundary.noBehaviorScoring, true);
    assertEqual("P24 no Choice", ready.boundary.noChoice, true);
    assertEqual("P24 no Crystal", ready.boundary.noCrystal, true);
    assertEqual("P24 Pressure not mutated", ready.boundary.noPressureMutation, true);
  }
  const missing = runtime.reviewRealityGravityExperienceArchitecture({
    pressureRecognitionArchitecture: null,
  });
  assertEqual("P24 missing Pressure unavailable", missing.status, "UNAVAILABLE");
  assertEqual(
    "P24 missing Pressure reason",
    missing.reason,
    "PRESSURE_RECOGNITION_ARCHITECTURE_REQUIRED",
  );
  const invalid = runtime.reviewRealityGravityExperienceArchitecture({
    pressureRecognitionArchitecture: Object.freeze({
      ...pressureReference,
      interventionBoundary: Object.freeze({
        ...pressureReference.interventionBoundary,
        noChoiceInvocation: false,
      }),
    }),
  });
  assertEqual("P24 invalid Pressure blocked", invalid.status, "BLOCKED");
  assertEqual(
    "P24 invalid Pressure reason",
    invalid.reason,
    "PRESSURE_RECOGNITION_ARCHITECTURE_INVALID",
  );
}

if (failures.length > 0) {
  console.error("\nReality Gravity Experience Architecture gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nReality Gravity Experience Architecture gate passed.");
