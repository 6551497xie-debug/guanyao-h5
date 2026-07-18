import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/realityCrystalExperienceArchitecture.ts",
  service: "src/services/realityCrystalExperienceArchitecture.ts",
  choiceType: "src/types/realityChoiceExperienceArchitecture.ts",
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
    "RealityCrystalExperienceArchitecture",
    "transformationEntryState",
    "responseChangeLayer",
    "lifeImprintLayer",
    "crystalFormationLayer",
    "futureCarryLayer",
    "ResponseChangeLayer",
    "LifeImprintLayer",
    "CrystalFormationLayer",
    "FutureCarryLayer",
    "FUTURE_CRYSTAL_EXPERIENCE_BOUNDARY_READY",
    "NEW_RESPONSE_OCCURRED",
    "STRUCTURAL_CHANGE_OBSERVED",
    "CHANGE_DEPOSIT_OBSERVED",
    "CHANGE_CARRIED_FORWARD",
    "noTaskCompletion",
    "noBehaviorScore",
    "noChoiceEvaluation",
    "noLabel",
    "noFixedPersonality",
    "noValueJudgment",
    "noReward",
    "noCollection",
    "noAssetCreation",
    "noStorageRecord",
    "noFixedIdentity",
    "noGenesisMutation",
    "noCrystalGeneration",
    "noStorageWrite",
    "noArchiveGeneration",
    "noRewardLogic",
    "noLevelLogic",
    "noBadgeLogic",
    "noAssetPersistence",
    "noChoiceMutation",
    "noChoiceEvaluation",
    "noIdentityMutation",
    "noUserProfile",
    "noUiIntegration",
    "noRendererInvocation",
    "noProductionIntegration",
  ].forEach((marker) => assertIncludes("P26 architecture type", source.type, marker));

  [
    "reviewRealityCrystalExperienceArchitecture",
    "CHOICE_EXPERIENCE_ARCHITECTURE_REQUIRED",
    "CHOICE_EXPERIENCE_ARCHITECTURE_INVALID",
    "CHOICE_RESPONSE_OCCURRED",
    "REALITY_CRYSTAL_EXPERIENCE_ARCHITECTURE",
    "RESPONSE_CHANGE",
    "LIFE_IMPRINT",
    "CRYSTAL_FORMATION_OBSERVATION",
    "FUTURE_CARRY",
    "CHOICE_RESPONSE_TO_CHANGE_DEPOSIT",
    "GENESIS_SOURCE_REMAINS_UNCHANGED",
    "noCrystalGeneration",
    "noStorageWrite",
    "noArchiveGeneration",
    "noRewardLogic",
    "noLevelLogic",
    "noBadgeLogic",
    "noAssetPersistence",
    "noChoiceMutation",
    "noChoiceEvaluation",
    "noGenesisMutation",
    "noIdentityMutation",
    "noUserProfile",
    "noUiIntegration",
    "noRendererInvocation",
    "noProductionIntegration",
  ].forEach((marker) => assertIncludes("P26 architecture service", source.service, marker));

  [
    "createCrystal",
    "generateCrystal",
    "persistCrystal",
    "saveCrystal",
    "archiveCrystal",
    "rewardUser",
    "scoreChoice",
    "evaluateChoice",
    "reviewRealityChoiceExperienceArchitecture",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "document.",
  ].forEach((marker) => assertExcludes("P26 remains architecture review only", source.service, marker));

  [
    "RealityChoiceExperienceArchitecture",
    "choiceReference",
    "CRYSTAL_READINESS_BOUNDARY_READY",
    "noBehaviorGeneration",
    "noDecisionAdvice",
    "noTaskAssignment",
    "noResultPrediction",
    "noAiSubstitution",
    "noCrystalGeneration",
    "noChoiceMutation",
  ].forEach((marker) => assertIncludes("P26 Choice upstream boundary", source.choiceType + source.type, marker));

  [
    "TransformationEntryState",
    "RealityCrystalExperienceArchitectureResult",
    "from \"./realityCrystalExperienceArchitecture\"",
  ].forEach((marker) => assertIncludes("P26 type index export", source.typeIndex, marker));
  assertIncludes(
    "P26 gate registered",
    packageJson.scripts?.["check-reality-crystal-experience-architecture"] ?? "",
    "node scripts/check-reality-crystal-experience-architecture.mjs",
  );
  assertIncludes(
    "P26 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-reality-crystal-experience-architecture",
  );

  const modulePath = path.join(os.tmpdir(), `guanyao-reality-crystal-experience-architecture-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { reviewRealityCrystalExperienceArchitecture } from "./src/services/realityCrystalExperienceArchitecture.ts";`,
      resolveDir: rootDir,
      sourcefile: "reality-crystal-experience-architecture-gate-entry.ts",
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
  const choiceReference = Object.freeze({
    semanticRole: "REALITY_CHOICE_EXPERIENCE_ARCHITECTURE",
    choiceEntryState: "GRAVITY_OBSERVATION_COMPLETED",
    gravityChoiceBoundary: "INERTIA_OBSERVATION_TO_RESPONSE_SPACE",
    genesisBoundary: "GENESIS_REMAINS_ISOLATED",
    responseGapLayer: Object.freeze({
      noImmediateChangeRequired: true,
      noSystemDecision: true,
    }),
    alternativeResponseLayer: Object.freeze({
      noSingleAnswer: true,
      noBehaviorPlan: true,
      noRecommendation: true,
    }),
    activeChoiceLayer: Object.freeze({
      noAiSubstitution: true,
      noForcedAction: true,
      noTaskAssignment: true,
    }),
    choiceReadinessBoundary: Object.freeze({
      noRecommendedAnswer: true,
      noBehaviorPlan: true,
      noChoiceResult: true,
      noCrystalResult: true,
    }),
    interventionBoundary: Object.freeze({
      noBehaviorGeneration: true,
      noDecisionAdvice: true,
      noTaskAssignment: true,
      noResultPrediction: true,
      noAiSubstitution: true,
      noCrystalGeneration: true,
    }),
    readinessState: "CRYSTAL_READINESS_BOUNDARY_READY",
  });
  const ready = runtime.reviewRealityCrystalExperienceArchitecture({
    choiceExperienceArchitecture: choiceReference,
  });
  assertEqual("P26 valid architecture ready", ready.status, "READY");
  if (ready.status === "READY") {
    assertEqual(
      "P26 preserves Choice reference",
      ready.architecture.choiceReference,
      choiceReference,
    );
    assertEqual("P26 transformation entry", ready.architecture.transformationEntryState, "CHOICE_RESPONSE_OCCURRED");
    assertEqual(
      "P26 response change is observed",
      ready.architecture.responseChangeLayer.changeMode,
      "NEW_RESPONSE_OCCURRED",
    );
    assertEqual(
      "P26 life imprint is structural",
      ready.architecture.lifeImprintLayer.imprintMode,
      "STRUCTURAL_CHANGE_OBSERVED",
    );
    assertEqual(
      "P26 future carry is open",
      ready.architecture.futureCarryLayer.carryMode,
      "CHANGE_CARRIED_FORWARD",
    );
    assertEqual("P26 no Storage", ready.boundary.noStorage, true);
    assertEqual("P26 no reward", ready.boundary.noReward, true);
    assertEqual("P26 no level", ready.boundary.noLevel, true);
    assertEqual("P26 no Choice mutation", ready.boundary.noChoiceMutation, true);
  }
  const missing = runtime.reviewRealityCrystalExperienceArchitecture({
    choiceExperienceArchitecture: null,
  });
  assertEqual("P26 missing Choice unavailable", missing.status, "UNAVAILABLE");
  assertEqual(
    "P26 missing Choice reason",
    missing.reason,
    "CHOICE_EXPERIENCE_ARCHITECTURE_REQUIRED",
  );
  const invalid = runtime.reviewRealityCrystalExperienceArchitecture({
    choiceExperienceArchitecture: Object.freeze({
      ...choiceReference,
      interventionBoundary: Object.freeze({
        ...choiceReference.interventionBoundary,
        noCrystalGeneration: false,
      }),
    }),
  });
  assertEqual("P26 invalid Choice blocked", invalid.status, "BLOCKED");
  assertEqual(
    "P26 invalid Choice reason",
    invalid.reason,
    "CHOICE_EXPERIENCE_ARCHITECTURE_INVALID",
  );
}

if (failures.length > 0) {
  console.error("\nReality Crystal Experience Architecture gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nReality Crystal Experience Architecture gate passed.");
