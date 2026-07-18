import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/realityPressureRecognitionArchitecture.ts",
  service: "src/services/realityPressureRecognitionArchitecture.ts",
  entryBridgeType: "src/types/genesisRealityEntryBridge.ts",
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
    "RealityPressureRecognitionArchitecture",
    "pressureEntryState",
    "realitySignalLayer",
    "pressureObservationLayer",
    "inertiaPreparationLayer",
    "interventionBoundary",
    "RealitySignalLayer",
    "PressureObservationLayer",
    "InertiaPreparationLayer",
    "PRESSURE_RECOGNITION_BOUNDARY_READY",
    "OBSERVE_REALITY_INFLUENCES",
    "USER_PARTICIPATORY_OBSERVATION",
    "OBSERVE_PRIOR_RESPONSE",
    "OBSERVATION_NOT_CONCLUSION",
    "noDiagnosis",
    "noPersonalityLabel",
    "noDestinyJudgment",
    "noBehaviorAdvice",
    "noGravityInvocation",
    "noChoiceInvocation",
    "noCrystalGeneration",
    "noGenesisMutation",
    "noIdentityMutation",
    "noUserProfile",
    "noStorageWrite",
    "noUiIntegration",
    "noRendererInvocation",
    "noProductionIntegration",
  ].forEach((marker) => assertIncludes("P23 architecture type", source.type, marker));

  [
    "reviewRealityPressureRecognitionArchitecture",
    "REALITY_EXPERIENCE_ARCHITECTURE_REFERENCE_REQUIRED",
    "REALITY_EXPERIENCE_ARCHITECTURE_REFERENCE_INVALID",
    "GENESIS_BOUNDARY_INVALID",
    "REALITY_ENTRY_RECEIVED",
    "REALITY_PRESSURE_RECOGNITION_ARCHITECTURE",
    "WHAT_IS_ACTING_ON_ME",
    "PRESSURE_TENSION_OBSERVATION",
    "INERTIA_OBSERVATION_PREPARATION",
    "PRESSURE_RECOGNITION_BOUNDARY_READY",
    "noPressureCalculation",
    "noPressureSeedMatching",
    "noDiagnosis",
    "noUserJudgment",
    "noPersonalityConclusion",
    "noDestinyJudgment",
    "noBehaviorAdvice",
    "noGravityInvocation",
    "noChoiceInvocation",
    "noCrystalGeneration",
    "noGenesisMutation",
    "noIdentityMutation",
    "noUserProfile",
    "noStorageWrite",
    "noUiIntegration",
    "noRendererInvocation",
    "noProductionIntegration",
  ].forEach((marker) => assertIncludes("P23 architecture service", source.service, marker));

  [
    "calculatePressure",
    "resolvePressure",
    "matchPressureSeed",
    "analyzePressure",
    "diagnoseUser",
    "generateDiagnosis",
    "createUserProfile",
    "calculateGravity",
    "resolveChoice",
    "generateCrystal",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "document.",
  ].forEach((marker) => assertExcludes("P23 remains semantic review only", source.service, marker));

  [
    "RealityExperienceArchitectureReference",
    "realityExperienceArchitectureReference",
    "GENESIS_COMPLETION_HELD",
    "noPressureResult",
    "noGravityResult",
    "noChoiceResult",
    "noCrystalResult",
  ].forEach((marker) => assertIncludes("P23 upstream boundary", source.entryBridgeType + source.type, marker));

  [
    "RealityPressureEntryState",
    "RealityPressureRecognitionArchitectureResult",
    "from \"./realityPressureRecognitionArchitecture\"",
  ].forEach((marker) => assertIncludes("P23 type index export", source.typeIndex, marker));
  assertIncludes(
    "P23 gate registered",
    packageJson.scripts?.["check-reality-pressure-recognition-architecture"] ?? "",
    "node scripts/check-reality-pressure-recognition-architecture.mjs",
  );
  assertIncludes(
    "P23 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-reality-pressure-recognition-architecture",
  );

  const modulePath = path.join(os.tmpdir(), `guanyao-reality-pressure-recognition-architecture-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { reviewRealityPressureRecognitionArchitecture } from "./src/services/realityPressureRecognitionArchitecture.ts";`,
      resolveDir: rootDir,
      sourcefile: "reality-pressure-recognition-architecture-gate-entry.ts",
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
  const reference = Object.freeze({
    referenceType: "REALITY_EXPERIENCE_ARCHITECTURE_REFERENCE",
    referenceId: "reality-entry-p23",
    sourceRole: "REALITY_EXPERIENCE_ARCHITECTURE",
    realityStage: "REALITY_ENTRY",
    genesisBoundary: "GENESIS_COMPLETION_HELD",
    pressureRecognitionNotStarted: true,
    noPressureResult: true,
    noGravityResult: true,
    noChoiceResult: true,
    noCrystalResult: true,
    noUserProfile: true,
  });
  const ready = runtime.reviewRealityPressureRecognitionArchitecture({
    realityExperienceArchitectureReference: reference,
  });
  assertEqual("P23 valid architecture ready", ready.status, "READY");
  if (ready.status === "READY") {
    assertEqual(
      "P23 preserves architecture reference",
      ready.architecture.realityExperienceArchitectureReference,
      reference,
    );
    assertEqual("P23 pressure entry received", ready.architecture.pressureEntryState, "REALITY_ENTRY_RECEIVED");
    assertEqual(
      "P23 signal observes influences",
      ready.architecture.realitySignalLayer.observationMode,
      "OBSERVE_REALITY_INFLUENCES",
    );
    assertEqual(
      "P23 observation remains participatory",
      ready.architecture.pressureObservationLayer.observationMode,
      "USER_PARTICIPATORY_OBSERVATION",
    );
    assertEqual(
      "P23 inertia prepares observation",
      ready.architecture.inertiaPreparationLayer.preparationMode,
      "OBSERVE_PRIOR_RESPONSE",
    );
    assertEqual("P23 no diagnosis", ready.boundary.noDiagnosis, true);
    assertEqual("P23 no Gravity", ready.boundary.noGravity, true);
    assertEqual("P23 no Choice", ready.boundary.noChoice, true);
    assertEqual("P23 no Crystal", ready.boundary.noCrystal, true);
    assertEqual("P23 Genesis not mutated", ready.boundary.noGenesisMutation, true);
  }
  const missing = runtime.reviewRealityPressureRecognitionArchitecture({
    realityExperienceArchitectureReference: null,
  });
  assertEqual("P23 missing architecture unavailable", missing.status, "UNAVAILABLE");
  assertEqual(
    "P23 missing architecture reason",
    missing.reason,
    "REALITY_EXPERIENCE_ARCHITECTURE_REFERENCE_REQUIRED",
  );
  const invalid = runtime.reviewRealityPressureRecognitionArchitecture({
    realityExperienceArchitectureReference: Object.freeze({
      ...reference,
      noPressureResult: false,
    }),
  });
  assertEqual("P23 invalid architecture blocked", invalid.status, "BLOCKED");
  assertEqual(
    "P23 invalid architecture reason",
    invalid.reason,
    "REALITY_EXPERIENCE_ARCHITECTURE_REFERENCE_INVALID",
  );
}

if (failures.length > 0) {
  console.error("\nReality Pressure Recognition Architecture gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nReality Pressure Recognition Architecture gate passed.");
