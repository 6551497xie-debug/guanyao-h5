import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/firstLifeJourneyProductFlow.ts",
  service: "src/services/firstLifeJourneyProductFlow.ts",
  upstreamType: "src/types/firstLifeJourneyExperienceFlow.ts",
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
    "FirstLifeJourneyProductFlow",
    "entryStage",
    "genesisExperienceStage",
    "realityTransitionStage",
    "realityExperienceStage",
    "transformationStage",
    "completionStage",
    "userInteractionPoints",
    "FIRST_LIFE_JOURNEY_PRODUCT_FLOW",
    "ENTRY_TO_GUANYAO",
    "GENESIS",
    "LIFE_RECOGNITION",
    "REALITY_ENTRY",
    "PRESSURE_RECOGNITION",
    "GRAVITY",
    "CHOICE",
    "CRYSTAL",
    "TIME_DELIVERY",
    "CHOICE_ACTIVE_RESPONSE",
    "CURIOSITY",
    "EXPLORATION",
    "PREPARATION",
    "OBSERVATION",
    "AWARENESS",
    "ACTIVE",
    "SETTLING",
    "noTestFeeling",
    "noQuestionnaireFeeling",
    "noAnimalSelection",
    "noFourSymbolSelection",
    "noHexagramSelection",
    "noForceSelection",
    "noImmediateProblemAnalysis",
    "noTaskFlow",
    "noGameProgression",
    "noStrongGuidance",
    "noRewardFeeling",
    "noCollectionFeeling",
    "noUiStructure",
    "noPageComponents",
    "noRouteNavigation",
    "noStorageSchema",
    "noStorageWrite",
    "noUserAccount",
    "noPayment",
    "noGenesisMutation",
    "noRealityEngineImplementation",
    "noChoiceEngineImplementation",
    "isolatedDesignOnly",
  ].forEach((marker) => assertIncludes("P30 product flow type", source.type, marker));

  [
    "reviewFirstLifeJourneyProductFlow",
    "FIRST_LIFE_JOURNEY_EXPERIENCE_FLOW_REQUIRED",
    "FIRST_LIFE_JOURNEY_EXPERIENCE_FLOW_UNAVAILABLE",
    "FIRST_LIFE_JOURNEY_EXPERIENCE_FLOW_BLOCKED",
    "FIRST_LIFE_JOURNEY_EXPERIENCE_FLOW_BOUNDARY_INVALID",
    "FIRST_PRODUCT_FLOW_SEQUENCE_INVALID",
    "FIRST_PRODUCT_FLOW_INTERACTION_BOUNDARY_INVALID",
    "FIRST_LIFE_JOURNEY_PRODUCT_FLOW",
    "TIME_DELIVERY",
    "CHOICE_ACTIVE_RESPONSE",
    "RECOGNITION_NOT_RESULT_REPORT",
    "BRIDGE_TO_REALITY",
    "WITNESS_CHANGE_NOT_EVALUATE",
    "DEPOSIT_CHANGE_NOT_REWARD",
    "noUiStructure",
    "noRouteNavigation",
    "noStorageWrite",
    "noUserAccount",
    "noSessionImplementation",
    "noGenesisMutation",
    "noRealityEngineImplementation",
    "noCrystalEngineImplementation",
  ].forEach((marker) => assertIncludes("P30 product flow service", source.service, marker));

  [
    "createPage",
    "navigateTo",
    "pushState",
    "replaceState",
    "saveUser",
    "createUser",
    "persistJourney",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "document.",
    "window.",
  ].forEach((marker) => assertExcludes("P30 remains product design only", source.service, marker));

  [
    "FirstLifeJourneyExperienceFlowResult",
    "stageSequence",
    "activeParticipationNodes",
    "noUiIntegration",
    "noStorageWrite",
    "noProductionIntegration",
  ].forEach((marker) => assertIncludes("P30 upstream flow boundary", source.upstreamType, marker));
  [
    "FirstLifeJourneyProductFlow",
    "FirstLifeJourneyProductFlowResult",
    "from \"./firstLifeJourneyProductFlow\"",
  ].forEach((marker) => assertIncludes("P30 type index export", source.typeIndex, marker));
  assertIncludes(
    "P30 gate registered",
    packageJson.scripts?.["check-first-life-journey-product-flow"] ?? "",
    "node scripts/check-first-life-journey-product-flow.mjs",
  );
  assertIncludes(
    "P30 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-first-life-journey-product-flow",
  );

  const modulePath = path.join(os.tmpdir(), `guanyao-first-life-journey-product-flow-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { reviewFirstLifeJourneyProductFlow } from "./src/services/firstLifeJourneyProductFlow.ts";`,
      resolveDir: rootDir,
      sourcefile: "first-life-journey-product-flow-gate-entry.ts",
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
  const stageSequence = [
    "ENTRY_TO_GUANYAO",
    "GENESIS",
    "LIFE_RECOGNITION",
    "REALITY_ENTRY",
    "PRESSURE_RECOGNITION",
    "GRAVITY",
    "CHOICE",
    "CRYSTAL",
  ];
  const flow = Object.freeze({
    stageSequence,
    activeParticipationNodes: ["TIME_DELIVERY", "CHOICE_ACTIVE_RESPONSE"],
    boundary: Object.freeze({
      noUiIntegration: true,
      noRouteIntegration: true,
      noUserAccount: true,
      noStorageWrite: true,
      noPayment: true,
      noIdentityCalculation: true,
      noEngineResult: true,
      noPageNavigation: true,
      noBusinessLogic: true,
      noGenesisMutation: true,
      noRealityCalculation: true,
      noCrystalGeneration: true,
      noArchiveGeneration: true,
      noRendererInvocation: true,
      noProductionIntegration: true,
      isolatedReviewOnly: true,
    }),
  });
  const ready = runtime.reviewFirstLifeJourneyProductFlow({
    firstLifeJourneyExperienceFlow: { status: "READY", flow },
  });
  assertEqual("P30 valid product flow ready", ready.status, "READY");
  assertEqual(
    "P30 product flow readiness",
    ready.readiness,
    "READY_FOR_FIRST_PRODUCT_EXPERIENCE_DESIGN",
  );
  assertEqual(
    "P30 Genesis interaction",
    ready.productFlow?.genesisExperienceStage.userAction,
    "TIME_DELIVERY",
  );
  assertEqual(
    "P30 Choice interaction",
    ready.productFlow?.realityExperienceStage.choice.userAction,
    "CHOICE_ACTIVE_RESPONSE",
  );
  assertEqual(
    "P30 no UI structure",
    ready.productFlow?.boundary.noUiStructure,
    true,
  );
  assertEqual(
    "P30 no Storage",
    ready.productFlow?.boundary.noStorageWrite,
    true,
  );
  assertEqual(
    "P30 Crystal is deposition",
    ready.productFlow?.completionStage.systemResponse,
    "DEPOSIT_CHANGE_NOT_REWARD",
  );

  const invalidSequence = runtime.reviewFirstLifeJourneyProductFlow({
    firstLifeJourneyExperienceFlow: {
      status: "READY",
      flow: { ...flow, stageSequence: ["GENESIS"] },
    },
  });
  assertEqual("P30 invalid sequence blocked", invalidSequence.status, "BLOCKED");
  assertEqual(
    "P30 invalid sequence reason",
    invalidSequence.reason,
    "FIRST_PRODUCT_FLOW_SEQUENCE_INVALID",
  );

  const unavailable = runtime.reviewFirstLifeJourneyProductFlow({
    firstLifeJourneyExperienceFlow: null,
  });
  assertEqual("P30 missing flow unavailable", unavailable.status, "UNAVAILABLE");
  assertEqual(
    "P30 missing flow reason",
    unavailable.reason,
    "FIRST_LIFE_JOURNEY_EXPERIENCE_FLOW_REQUIRED",
  );
  fs.rmSync(modulePath, { force: true });
}

if (failures.length > 0) {
  console.error("First Life Journey Product Flow gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log("First Life Journey Product Flow gate passed.");
}
