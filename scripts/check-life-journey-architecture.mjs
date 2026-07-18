import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/lifeJourneyArchitecture.ts",
  service: "src/services/lifeJourneyArchitecture.ts",
  crystalType: "src/types/realityCrystalExperienceArchitecture.ts",
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
    "LifeJourneyArchitecture",
    "genesisLayer",
    "realityLayer",
    "transformationLayer",
    "crystalLayer",
    "archiveBoundary",
    "LifeJourneyGenesisLayer",
    "LifeJourneyRealityLayer",
    "LifeJourneyTransformationLayer",
    "LifeJourneyCrystalLayer",
    "LifeJourneyArchiveBoundary",
    "FUTURE_ARCHIVE_BOUNDARY_READY",
    "WHAT_LIFE_AM_I",
    "WHAT_AM_I_EXPERIENCING",
    "DID_NEW_RESPONSE_OCCUR",
    "WHAT_CHANGE_REMAINS",
    "HOW_FUTURE_HOLDS_CHANGE",
    "TIME_STAR_SYMBOL_HEXAGRAM_FORCE_STAR_BEAST",
    "PRESSURE_RECOGNITION",
    "GRAVITY_EXPERIENCE",
    "CHOICE_SPACE",
    "CHANGE_NOT_EVALUATION",
    "CHANGE_IMPRINT_NOT_REWARD",
    "FUTURE_DIRECTION_ONLY",
    "noStorageSchema",
    "noStorageWrite",
    "noUserBinding",
    "noCrystalGeneration",
    "noArchiveGeneration",
    "noIdentityCalculation",
    "noGenesisMutation",
    "noRealityCalculation",
    "noChoiceMutation",
    "noCrystalMutation",
    "noUserData",
    "noRendererInvocation",
    "noUiIntegration",
    "noProductionIntegration",
  ].forEach((marker) => assertIncludes("P27 architecture type", source.type, marker));

  [
    "reviewLifeJourneyArchitecture",
    "GENESIS_REFERENCE_REQUIRED",
    "REALITY_REFERENCE_REQUIRED",
    "CRYSTAL_EXPERIENCE_ARCHITECTURE_REQUIRED",
    "GENESIS_REFERENCE_INVALID",
    "REALITY_REFERENCE_INVALID",
    "CRYSTAL_EXPERIENCE_ARCHITECTURE_INVALID",
    "LIFE_JOURNEY_ARCHITECTURE",
    "GENESIS_LIFE_SOURCE_LAYER",
    "REALITY_EXPERIENCE_LAYER",
    "TRANSFORMATION_LAYER",
    "CRYSTAL_DEPOSITION_LAYER",
    "FUTURE_ARCHIVE_BOUNDARY",
    "GENESIS",
    "REALITY",
    "TRANSFORMATION",
    "CRYSTAL",
    "ARCHIVE_BOUNDARY",
    "noStorageSchema",
    "noStorageWrite",
    "noUserBinding",
    "noCrystalGeneration",
    "noArchiveGeneration",
    "noIdentityCalculation",
    "noGenesisMutation",
    "noRealityCalculation",
    "noChoiceMutation",
    "noCrystalMutation",
    "noUserData",
    "noRendererInvocation",
    "noUiIntegration",
    "noProductionIntegration",
  ].forEach((marker) => assertIncludes("P27 architecture service", source.service, marker));

  [
    "saveLifeJourney",
    "persistLifeJourney",
    "bindUser",
    "createCrystal",
    "generateCrystal",
    "createArchive",
    "generateArchive",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "document.",
  ].forEach((marker) => assertExcludes("P27 remains lifecycle review only", source.service, marker));

  [
    "RealityCrystalExperienceArchitecture",
    "crystalExperienceArchitecture",
    "FUTURE_CRYSTAL_EXPERIENCE_BOUNDARY_READY",
    "noStorageWrite",
    "noArchiveGeneration",
    "noRewardLogic",
    "noChoiceMutation",
    "noGenesisMutation",
  ].forEach((marker) => assertIncludes("P27 Crystal upstream boundary", source.crystalType + source.type, marker));

  [
    "LifeJourneyGenesisLayer",
    "LifeJourneyArchitectureResult",
    "from \"./lifeJourneyArchitecture\"",
  ].forEach((marker) => assertIncludes("P27 type index export", source.typeIndex, marker));
  assertIncludes(
    "P27 gate registered",
    packageJson.scripts?.["check-life-journey-architecture"] ?? "",
    "node scripts/check-life-journey-architecture.mjs",
  );
  assertIncludes(
    "P27 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-life-journey-architecture",
  );

  const modulePath = path.join(os.tmpdir(), `guanyao-life-journey-architecture-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { reviewLifeJourneyArchitecture } from "./src/services/lifeJourneyArchitecture.ts";`,
      resolveDir: rootDir,
      sourcefile: "life-journey-architecture-gate-entry.ts",
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
  const genesisReference = Object.freeze({
    referenceType: "GENESIS_ARCHITECTURE_REFERENCE",
    referenceId: "genesis-p27",
    sourceRole: "GENESIS_VISUAL_SEMANTIC_CHAIN",
    noRealityInterpretation: true,
    noIdentityCalculation: true,
    noUserData: true,
  });
  const realityReference = Object.freeze({
    referenceType: "REALITY_ARCHITECTURE_REFERENCE",
    referenceId: "reality-p27",
    sourceRole: "PRESSURE_GRAVITY_CHOICE_ARCHITECTURES",
    noGenesisMutation: true,
    noIdentityRedefinition: true,
    noStorage: true,
    noUserData: true,
  });
  const crystalReference = Object.freeze({
    semanticRole: "REALITY_CRYSTAL_EXPERIENCE_ARCHITECTURE",
    readinessState: "FUTURE_CRYSTAL_EXPERIENCE_BOUNDARY_READY",
    choiceCrystalBoundary: "CHOICE_RESPONSE_TO_CHANGE_DEPOSIT",
    genesisBoundary: "GENESIS_SOURCE_REMAINS_UNCHANGED",
    responseChangeLayer: Object.freeze({
      noTaskCompletion: true,
      noChoiceEvaluation: true,
    }),
    lifeImprintLayer: Object.freeze({
      noLabel: true,
      noFixedPersonality: true,
    }),
    crystalFormationLayer: Object.freeze({
      noReward: true,
      noStorageRecord: true,
    }),
    futureCarryLayer: Object.freeze({
      noFixedIdentity: true,
      noGenesisMutation: true,
    }),
    interventionBoundary: Object.freeze({
      noCrystalGeneration: true,
      noStorageWrite: true,
      noArchiveGeneration: true,
      noChoiceMutation: true,
      noGenesisMutation: true,
    }),
  });
  const ready = runtime.reviewLifeJourneyArchitecture({
    genesisReference,
    realityReference,
    crystalExperienceArchitecture: crystalReference,
  });
  assertEqual("P27 valid journey ready", ready.status, "READY");
  if (ready.status === "READY") {
    assertEqual("P27 Genesis answer", ready.architecture.genesisLayer.answer, "WHAT_LIFE_AM_I");
    assertEqual("P27 Reality answer", ready.architecture.realityLayer.answer, "WHAT_AM_I_EXPERIENCING");
    assertEqual("P27 Transformation answer", ready.architecture.transformationLayer.answer, "DID_NEW_RESPONSE_OCCUR");
    assertEqual("P27 Crystal answer", ready.architecture.crystalLayer.answer, "WHAT_CHANGE_REMAINS");
    assertEqual("P27 Archive is boundary", ready.architecture.archiveBoundary.boundaryMode, "FUTURE_DIRECTION_ONLY");
    assertEqual("P27 causal end is Archive boundary", ready.architecture.causalSequence.at(-1), "ARCHIVE_BOUNDARY");
    assertEqual("P27 no Storage", ready.boundary.noStorageWrite, true);
    assertEqual("P27 no Archive generation", ready.boundary.noArchiveGeneration, true);
    assertEqual("P27 no Genesis mutation", ready.boundary.noGenesisMutation, true);
  }
  const missing = runtime.reviewLifeJourneyArchitecture({
    genesisReference: null,
    realityReference,
    crystalExperienceArchitecture: crystalReference,
  });
  assertEqual("P27 missing Genesis unavailable", missing.status, "UNAVAILABLE");
  assertEqual("P27 missing Genesis reason", missing.reason, "GENESIS_REFERENCE_REQUIRED");
  const invalid = runtime.reviewLifeJourneyArchitecture({
    genesisReference,
    realityReference,
    crystalExperienceArchitecture: Object.freeze({
      ...crystalReference,
      interventionBoundary: Object.freeze({
        ...crystalReference.interventionBoundary,
        noStorageWrite: false,
      }),
    }),
  });
  assertEqual("P27 invalid Crystal boundary blocked", invalid.status, "BLOCKED");
  assertEqual(
    "P27 invalid Crystal reason",
    invalid.reason,
    "CRYSTAL_EXPERIENCE_ARCHITECTURE_INVALID",
  );
}

if (failures.length > 0) {
  console.error("\nLife Journey Architecture gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nLife Journey Architecture gate passed.");
