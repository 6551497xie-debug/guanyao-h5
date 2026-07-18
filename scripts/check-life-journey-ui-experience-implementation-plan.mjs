import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/lifeJourneyUIExperienceImplementationPlan.ts",
  service: "src/services/lifeJourneyUIExperienceImplementationPlan.ts",
  upstreamType: "src/types/lifeJourneyUIRuntimeReadiness.ts",
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
    "LifeJourneyUIExperienceImplementationPlan",
    "spaceArchitecture",
    "stagePresentation",
    "interactionMapping",
    "runtimeConsumption",
    "visualConsumption",
    "implementationBoundary",
    "GENESIS_SPACE",
    "RECOGNITION_SPACE",
    "REALITY_SPACE",
    "CRYSTAL_SPACE",
    "TIME_DELIVERY",
    "CONFIRM_REALITY_ENTRY",
    "CHOICE_ACTIVE_RESPONSE",
    "GENESIS_RUNTIME_STATE",
    "GENESIS_VISUAL_STATE",
    "PRESSURE_STATE",
    "GRAVITY_STATE",
    "CHOICE_STATE",
    "CRYSTAL_EXPERIENCE_STATE",
    "RUNTIME_STATE",
    "RUNTIME_EVENT_TO_RUNTIME_RESPONSE",
    "noUiComponentCode",
    "noRouteImplementation",
    "noRuntimeWiring",
    "noStorageSchema",
    "noStorageWrite",
    "noSessionPersistence",
    "noUserAccount",
    "noAuthentication",
    "noGenesisMutation",
    "noRealityMutation",
    "noCrystalGeneration",
    "noProductionIntegration",
    "firstVersion",
    "COMPLETE_REALITY_EXPERIENCE",
    "CRYSTAL_PERSISTENCE",
    "ARCHIVE",
    "USER_ACCOUNT",
  ].forEach((marker) => assertIncludes("P32 plan type", source.type, marker));

  [
    "reviewLifeJourneyUIExperienceImplementationPlan",
    "UI_RUNTIME_READINESS_REQUIRED",
    "UI_RUNTIME_READINESS_UNAVAILABLE",
    "UI_RUNTIME_READINESS_BLOCKED",
    "UI_RUNTIME_READINESS_BOUNDARY_INVALID",
    "UI_EXPERIENCE_SEQUENCE_INVALID",
    "UI_INTERACTION_MAPPING_INVALID",
    "LIFE_JOURNEY_UI_EXPERIENCE_IMPLEMENTATION_PLAN",
    "LIFE_JOURNEY_UI_SPACE_ARCHITECTURE",
    "UI_STAGE_PRESENTATION_RULE",
    "UI_INTERACTION_MAPPING",
    "UI_RUNTIME_CONSUMPTION_MAPPING",
    "UI_VISUAL_CONSUMPTION_MAPPING",
    "TIME_DELIVERY_EVENT",
    "REALITY_ENTRY_CONFIRMATION_EVENT",
    "CHOICE_ACTIVE_RESPONSE_EVENT",
    "RUNTIME_EVENT_TO_RUNTIME_RESPONSE",
    "noEngineInvocation",
    "noStageMutation",
    "noVisualSemanticCreation",
    "noRendererCommandCreation",
    "noRuntimeWiring",
    "READY_FOR_UI_EXPERIENCE_IMPLEMENTATION",
  ].forEach((marker) => assertIncludes("P32 plan service", source.service, marker));

  [
    "createElement(",
    "useState(",
    "useEffect(",
    "<div",
    "navigateTo",
    "pushState",
    "replaceState",
    "createPage",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "document.",
    "window.",
    "saveUser",
    "createUser",
    "writeStorage",
    "renderUI",
    "persistSession",
  ].forEach((marker) => assertExcludes("P32 remains plan only", source.service, marker));

  [
    "LifeJourneyUIRuntimeReadinessResult",
    "experienceSequence",
    "interactionBoundary",
    "noUiRendering",
    "noStorageImplementation",
    "noProductionIntegration",
  ].forEach((marker) => assertIncludes("P32 upstream UI runtime", source.upstreamType, marker));
  [
    "LifeJourneyUIExperienceImplementationPlan",
    "LifeJourneyUIExperienceImplementationPlanResult",
    "from \"./lifeJourneyUIExperienceImplementationPlan\"",
  ].forEach((marker) => assertIncludes("P32 type index export", source.typeIndex, marker));
  assertIncludes(
    "P32 gate registered",
    packageJson.scripts?.["check-life-journey-ui-experience-implementation-plan"] ?? "",
    "node scripts/check-life-journey-ui-experience-implementation-plan.mjs",
  );
  assertIncludes(
    "P32 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-life-journey-ui-experience-implementation-plan",
  );

  const modulePath = path.join(os.tmpdir(), `guanyao-life-journey-ui-plan-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { reviewLifeJourneyUIExperienceImplementationPlan } from "./src/services/lifeJourneyUIExperienceImplementationPlan.ts";`,
      resolveDir: rootDir,
      sourcefile: "life-journey-ui-plan-gate-entry.ts",
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
  const sequence = [
    "ENTRY_TO_GUANYAO",
    "GENESIS",
    "LIFE_RECOGNITION",
    "REALITY_ENTRY",
    "PRESSURE_RECOGNITION",
    "GRAVITY",
    "CHOICE",
    "CRYSTAL",
  ];
  const productFlowReference = Object.freeze({
    stageSequence: sequence,
    boundary: Object.freeze({
      productFlowDesignOnly: true,
      noUiStructure: true,
      noPageComponents: true,
      noRouteNavigation: true,
      noStorageSchema: true,
      noStorageWrite: true,
      noUserAccount: true,
      noAuthentication: true,
      noPayment: true,
      noSessionImplementation: true,
      noPersistence: true,
      noGenesisMutation: true,
      noRealityEngineImplementation: true,
      noGravityEngineImplementation: true,
      noChoiceEngineImplementation: true,
      noCrystalEngineImplementation: true,
      noProductionIntegration: true,
      isolatedDesignOnly: true,
    }),
  });
  const readiness = Object.freeze({
    experienceSequence: sequence,
    interactionBoundary: {
      allowedUserActions: ["TIME_DELIVERY", "CHOICE_ACTIVE_RESPONSE"],
    },
    productFlowReference,
    boundary: Object.freeze({
      uiRuntimeReadinessOnly: true,
      noReactComponentImplementation: true,
      noPageImplementation: true,
      noRouteImplementation: true,
      noUiRendering: true,
      noStorageImplementation: true,
      noSessionPersistence: true,
      noUserAccount: true,
      noAuthentication: true,
      noPayment: true,
      noGenesisMutation: true,
      noRealityEngineImplementation: true,
      noGravityEngineImplementation: true,
      noChoiceEngineImplementation: true,
      noCrystalEngineImplementation: true,
      noProductionIntegration: true,
      isolatedReadinessReviewOnly: true,
    }),
  });
  const ready = runtime.reviewLifeJourneyUIExperienceImplementationPlan({
    uiRuntimeReadiness: { status: "READY", readinessContract: readiness },
  });
  assertEqual("P32 valid plan ready", ready.status, "READY");
  assertEqual(
    "P32 readiness state",
    ready.readiness,
    "READY_FOR_UI_EXPERIENCE_IMPLEMENTATION",
  );
  assertEqual(
    "P32 first version Genesis",
    ready.plan?.implementationScope.firstVersion[0],
    "GENESIS_SPACE",
  );
  assertEqual(
    "P32 first version Reality Entry",
    ready.plan?.implementationScope.firstVersion[2],
    "REALITY_ENTRY",
  );
  assertEqual(
    "P32 no Storage",
    ready.plan?.implementationBoundary.noStorageWrite,
    true,
  );
  assertEqual(
    "P32 runtime owns stage",
    ready.plan?.runtimeConsumption.runtimeOwnsStage,
    true,
  );
  assertEqual(
    "P32 UI does not advance stage",
    ready.plan?.runtimeConsumption.uiDoesNotAdvanceStage,
    true,
  );

  const invalidSequence = runtime.reviewLifeJourneyUIExperienceImplementationPlan({
    uiRuntimeReadiness: {
      status: "READY",
      readinessContract: { ...readiness, experienceSequence: ["GENESIS"] },
    },
  });
  assertEqual("P32 invalid sequence blocked", invalidSequence.status, "BLOCKED");
  assertEqual(
    "P32 invalid sequence reason",
    invalidSequence.reason,
    "UI_EXPERIENCE_SEQUENCE_INVALID",
  );

  const unavailable = runtime.reviewLifeJourneyUIExperienceImplementationPlan({
    uiRuntimeReadiness: null,
  });
  assertEqual("P32 missing readiness unavailable", unavailable.status, "UNAVAILABLE");
  assertEqual(
    "P32 missing readiness reason",
    unavailable.reason,
    "UI_RUNTIME_READINESS_REQUIRED",
  );
  fs.rmSync(modulePath, { force: true });
}

if (failures.length > 0) {
  console.error("Life Journey UI Experience Implementation Plan gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log("Life Journey UI Experience Implementation Plan gate passed.");
}
