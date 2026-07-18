import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/lifeJourneyUIRuntimeReadiness.ts",
  service: "src/services/lifeJourneyUIRuntimeReadiness.ts",
  upstreamType: "src/types/firstLifeJourneyProductFlow.ts",
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
    "LifeJourneyUIRuntimeReadiness",
    "experienceRuntimeReference",
    "uiConsumptionBoundary",
    "interactionBoundary",
    "visualPresentationBoundary",
    "navigationBoundary",
    "GENESIS_SPACE",
    "RECOGNITION_SPACE",
    "REALITY_SPACE",
    "CRYSTAL_SPACE",
    "TIME_DELIVERY",
    "CHOICE_ACTIVE_RESPONSE",
    "RUNTIME_STATE_AND_VISUAL_STATE",
    "USER_ACTION_TO_RUNTIME_RESPONSE",
    "noLifeSourceEditing",
    "noAnimalSelection",
    "noFourSymbolSelection",
    "noHexagramSelection",
    "noForceSelection",
    "noUiRendering",
    "noStorageImplementation",
    "noSessionPersistence",
    "noUserAccount",
    "noAuthentication",
    "noGenesisMutation",
    "noRealityEngineImplementation",
    "noChoiceEngineImplementation",
    "noCrystalEngineImplementation",
    "isolatedReadinessReviewOnly",
  ].forEach((marker) => assertIncludes("P31 UI runtime type", source.type, marker));

  [
    "reviewLifeJourneyUIRuntimeReadiness",
    "FIRST_LIFE_JOURNEY_PRODUCT_FLOW_REQUIRED",
    "FIRST_LIFE_JOURNEY_PRODUCT_FLOW_UNAVAILABLE",
    "FIRST_LIFE_JOURNEY_PRODUCT_FLOW_BLOCKED",
    "FIRST_LIFE_JOURNEY_PRODUCT_FLOW_BOUNDARY_INVALID",
    "UI_RUNTIME_SEQUENCE_INVALID",
    "UI_RUNTIME_INTERACTION_BOUNDARY_INVALID",
    "UI_RUNTIME_EXPERIENCE_RUNTIME_REFERENCE",
    "UI_RUNTIME_CONSUMPTION_BOUNDARY",
    "UI_RUNTIME_INTERACTION_BOUNDARY",
    "UI_RUNTIME_VISUAL_PRESENTATION_BOUNDARY",
    "UI_RUNTIME_NAVIGATION_BOUNDARY",
    "LIFE_JOURNEY_SPACE_STRUCTURE",
    "RUNTIME_STATE_AND_VISUAL_STATE",
    "USER_ACTION_TO_RUNTIME_RESPONSE",
    "noEngineInvocation",
    "noIdentitySourceRead",
    "noStorageRead",
    "noVisualSemanticCreation",
    "noRendererCalculation",
    "noRouteImplementation",
    "noPageNavigation",
    "noBusinessFlow",
    "READY_FOR_UI_RUNTIME_IMPLEMENTATION",
  ].forEach((marker) => assertIncludes("P31 UI runtime service", source.service, marker));

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
    "calculateIdentity",
    "invokeEngine",
    "saveUser",
    "writeStorage",
  ].forEach((marker) => assertExcludes("P31 remains readiness only", source.service, marker));

  [
    "FirstLifeJourneyProductFlowResult",
    "stageSequence",
    "userInteractionPoints",
    "noUiStructure",
    "noRouteNavigation",
    "noStorageWrite",
    "noProductionIntegration",
  ].forEach((marker) => assertIncludes("P31 upstream product flow", source.upstreamType, marker));
  [
    "LifeJourneyUIRuntimeReadiness",
    "LifeJourneyUIRuntimeReadinessResult",
    "from \"./lifeJourneyUIRuntimeReadiness\"",
  ].forEach((marker) => assertIncludes("P31 type index export", source.typeIndex, marker));
  assertIncludes(
    "P31 gate registered",
    packageJson.scripts?.["check-life-journey-ui-runtime-readiness"] ?? "",
    "node scripts/check-life-journey-ui-runtime-readiness.mjs",
  );
  assertIncludes(
    "P31 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-life-journey-ui-runtime-readiness",
  );

  const modulePath = path.join(os.tmpdir(), `guanyao-life-journey-ui-runtime-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { reviewLifeJourneyUIRuntimeReadiness } from "./src/services/lifeJourneyUIRuntimeReadiness.ts";`,
      resolveDir: rootDir,
      sourcefile: "life-journey-ui-runtime-gate-entry.ts",
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
  const productFlow = Object.freeze({
    stageSequence: sequence,
    userInteractionPoints: ["TIME_DELIVERY", "CHOICE_ACTIVE_RESPONSE"],
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
  const ready = runtime.reviewLifeJourneyUIRuntimeReadiness({
    firstLifeJourneyProductFlow: { status: "READY", productFlow },
  });
  assertEqual("P31 valid readiness", ready.status, "READY");
  assertEqual(
    "P31 readiness state",
    ready.readiness,
    "READY_FOR_UI_RUNTIME_IMPLEMENTATION",
  );
  assertEqual(
    "P31 UI consumes runtime and visual state",
    ready.readinessContract?.uiConsumptionBoundary.consumes,
    "RUNTIME_STATE_AND_VISUAL_STATE",
  );
  assertEqual(
    "P31 allowed time action",
    ready.readinessContract?.interactionBoundary.allowedUserActions[0],
    "TIME_DELIVERY",
  );
  assertEqual(
    "P31 allowed choice action",
    ready.readinessContract?.interactionBoundary.allowedUserActions[1],
    "CHOICE_ACTIVE_RESPONSE",
  );
  assertEqual(
    "P31 no UI rendering",
    ready.readinessContract?.boundary.noUiRendering,
    true,
  );
  assertEqual(
    "P31 no Storage",
    ready.readinessContract?.boundary.noStorageImplementation,
    true,
  );
  assertEqual(
    "P31 spaces",
    ready.readinessContract?.navigationBoundary.spaces[2],
    "REALITY_SPACE",
  );

  const invalidSequence = runtime.reviewLifeJourneyUIRuntimeReadiness({
    firstLifeJourneyProductFlow: {
      status: "READY",
      productFlow: { ...productFlow, stageSequence: ["GENESIS"] },
    },
  });
  assertEqual("P31 invalid sequence blocked", invalidSequence.status, "BLOCKED");
  assertEqual(
    "P31 invalid sequence reason",
    invalidSequence.reason,
    "UI_RUNTIME_SEQUENCE_INVALID",
  );

  const unavailable = runtime.reviewLifeJourneyUIRuntimeReadiness({
    firstLifeJourneyProductFlow: null,
  });
  assertEqual("P31 missing flow unavailable", unavailable.status, "UNAVAILABLE");
  assertEqual(
    "P31 missing flow reason",
    unavailable.reason,
    "FIRST_LIFE_JOURNEY_PRODUCT_FLOW_REQUIRED",
  );
  fs.rmSync(modulePath, { force: true });
}

if (failures.length > 0) {
  console.error("Life Journey UI Runtime Readiness gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log("Life Journey UI Runtime Readiness gate passed.");
}
