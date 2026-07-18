import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/firstLifeJourneyExperienceFlow.ts",
  service: "src/services/firstLifeJourneyExperienceFlow.ts",
  journeyType: "src/types/lifeJourneyArchitecture.ts",
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
    "FirstLifeJourneyExperienceFlow",
    "entryExperience",
    "genesisJourney",
    "recognitionMoment",
    "realityTransition",
    "realityJourney",
    "transformationMoment",
    "completionState",
    "FIRST_LIFE_JOURNEY_EXPERIENCE_FLOW",
    "ENTRY_TO_GUANYAO",
    "LIFE_RECOGNITION",
    "REALITY_ENTRY",
    "PRESSURE_RECOGNITION",
    "GRAVITY",
    "CHOICE",
    "CRYSTAL",
    "TIME_DELIVERY_ONLY",
    "CHOICE_ACTIVE_RESPONSE",
    "SLOW_STATIC_ENTERING",
    "OBSERVE_AWARE_CHOOSE",
    "DEPOSITION_NOT_REWARD",
    "noTestEntry",
    "noQuestionnaireEntry",
    "noCommercialFlow",
    "noUserAnimalChoice",
    "noUserFourSymbolChoice",
    "noUserHexagramChoice",
    "noUserMotherCodeChoice",
    "noImmediateProblemAnalysis",
    "noTaskFlow",
    "noGameProgression",
    "noBehaviorRecommendation",
    "noReward",
    "noLevel",
    "noStorageRecord",
    "noUiIntegration",
    "noRouteIntegration",
    "noUserAccount",
    "noStorageWrite",
    "noPayment",
    "noIdentityCalculation",
    "noEngineResult",
    "noPageNavigation",
    "noBusinessLogic",
    "noGenesisMutation",
    "noRealityCalculation",
    "noCrystalGeneration",
    "noArchiveGeneration",
    "noRendererInvocation",
    "noProductionIntegration",
  ].forEach((marker) => assertIncludes("P28 flow type", source.type, marker));

  [
    "reviewFirstLifeJourneyExperienceFlow",
    "LIFE_JOURNEY_ARCHITECTURE_REQUIRED",
    "LIFE_JOURNEY_ARCHITECTURE_INVALID",
    "FIRST_LIFE_JOURNEY_EXPERIENCE_FLOW",
    "GUANYAO_ENTRY_EXPERIENCE",
    "FIRST_GENESIS_JOURNEY",
    "LIFE_RECOGNITION_MOMENT",
    "GENESIS_TO_REALITY_TRANSITION",
    "FIRST_REALITY_JOURNEY",
    "FIRST_TRANSFORMATION_MOMENT",
    "FIRST_CRYSTAL_COMPLETION",
    "TIME_DELIVERY_ONLY",
    "CHOICE_ACTIVE_RESPONSE",
    "noUiIntegration",
    "noRouteIntegration",
    "noUserAccount",
    "noStorageWrite",
    "noPayment",
    "noIdentityCalculation",
    "noEngineResult",
    "noPageNavigation",
    "noBusinessLogic",
    "noGenesisMutation",
    "noRealityCalculation",
    "noCrystalGeneration",
    "noArchiveGeneration",
    "noRendererInvocation",
    "noProductionIntegration",
  ].forEach((marker) => assertIncludes("P28 flow service", source.service, marker));

  [
    "createUser",
    "saveUser",
    "navigateTo",
    "pushState",
    "replaceState",
    "persistJourney",
    "calculateIdentity",
    "createCrystal",
    "generateCrystal",
    "createArchive",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "document.",
  ].forEach((marker) => assertExcludes("P28 remains flow review only", source.service, marker));

  [
    "LifeJourneyArchitecture",
    "semanticRole: \"LIFE_JOURNEY_ARCHITECTURE\"",
    "noStorageWrite",
    "noArchiveGeneration",
    "noGenesisMutation",
  ].forEach((marker) => assertIncludes("P28 upstream journey boundary", source.journeyType + source.type, marker));

  [
    "FirstLifeJourneyStage",
    "FirstLifeJourneyExperienceFlowResult",
    "from \"./firstLifeJourneyExperienceFlow\"",
  ].forEach((marker) => assertIncludes("P28 type index export", source.typeIndex, marker));
  assertIncludes(
    "P28 gate registered",
    packageJson.scripts?.["check-first-life-journey-experience-flow"] ?? "",
    "node scripts/check-first-life-journey-experience-flow.mjs",
  );
  assertIncludes(
    "P28 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-first-life-journey-experience-flow",
  );

  const modulePath = path.join(os.tmpdir(), `guanyao-first-life-journey-experience-flow-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { reviewFirstLifeJourneyExperienceFlow } from "./src/services/firstLifeJourneyExperienceFlow.ts";`,
      resolveDir: rootDir,
      sourcefile: "first-life-journey-experience-flow-gate-entry.ts",
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
  const journeyReference = Object.freeze({
    semanticRole: "LIFE_JOURNEY_ARCHITECTURE",
    genesisLayer: Object.freeze({
      answer: "WHAT_LIFE_AM_I",
      noRealityInterpretation: true,
    }),
    realityLayer: Object.freeze({
      answer: "WHAT_AM_I_EXPERIENCING",
      noGenesisMutation: true,
    }),
    transformationLayer: Object.freeze({
      answer: "DID_NEW_RESPONSE_OCCUR",
      noChoiceEvaluation: true,
    }),
    crystalLayer: Object.freeze({
      answer: "WHAT_CHANGE_REMAINS",
      noReward: true,
      noLevel: true,
    }),
    archiveBoundary: Object.freeze({
      boundaryMode: "FUTURE_DIRECTION_ONLY",
      noArchiveImplementation: true,
      noStorageSchema: true,
    }),
    boundary: Object.freeze({
      noStorageWrite: true,
      noUserBinding: true,
      noCrystalGeneration: true,
      noArchiveGeneration: true,
      noIdentityCalculation: true,
      noGenesisMutation: true,
    }),
  });
  const ready = runtime.reviewFirstLifeJourneyExperienceFlow({
    lifeJourneyArchitecture: journeyReference,
  });
  assertEqual("P28 valid flow ready", ready.status, "READY");
  if (ready.status === "READY") {
    assertEqual("P28 entry is curiosity", ready.flow.entryExperience.userState, "CURIOSITY");
    assertEqual("P28 Genesis participation", ready.flow.genesisJourney.userParticipation, "TIME_DELIVERY_ONLY");
    assertEqual("P28 reality transition", ready.flow.realityTransition.outputMode, "BRIDGE_NOT_ANALYSIS");
    assertEqual("P28 Choice participation", ready.flow.transformationMoment.choiceParticipation, "CHOICE_ACTIVE_RESPONSE");
    assertEqual("P28 completion is deposition", ready.flow.completionState.outputMode, "DEPOSITION_NOT_REWARD");
    assertEqual("P28 stage sequence ends Crystal", ready.flow.stageSequence.at(-1), "CRYSTAL");
    assertEqual("P28 no Storage", ready.boundary.noStorage, true);
    assertEqual("P28 no UI", ready.boundary.noUi, true);
    assertEqual("P28 no business logic", ready.boundary.noBusinessLogic, true);
  }
  const missing = runtime.reviewFirstLifeJourneyExperienceFlow({
    lifeJourneyArchitecture: null,
  });
  assertEqual("P28 missing journey unavailable", missing.status, "UNAVAILABLE");
  assertEqual("P28 missing journey reason", missing.reason, "LIFE_JOURNEY_ARCHITECTURE_REQUIRED");
  const invalid = runtime.reviewFirstLifeJourneyExperienceFlow({
    lifeJourneyArchitecture: Object.freeze({
      ...journeyReference,
      boundary: Object.freeze({
        ...journeyReference.boundary,
        noStorageWrite: false,
      }),
    }),
  });
  assertEqual("P28 invalid journey blocked", invalid.status, "BLOCKED");
  assertEqual("P28 invalid journey reason", invalid.reason, "LIFE_JOURNEY_ARCHITECTURE_INVALID");
}

if (failures.length > 0) {
  console.error("\nFirst Life Journey Experience Flow gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nFirst Life Journey Experience Flow gate passed.");
