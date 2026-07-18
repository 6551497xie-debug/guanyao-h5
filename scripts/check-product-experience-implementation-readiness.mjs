import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/productExperienceImplementationReadiness.ts",
  service: "src/services/productExperienceImplementationReadiness.ts",
  upstreamType: "src/types/firstLifeJourneyExperienceFlow.ts",
  upstreamService: "src/services/firstLifeJourneyExperienceFlow.ts",
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
    "ProductExperienceImplementationReadiness",
    "experienceRuntimeBoundary",
    "uiConsumptionBoundary",
    "sessionBoundary",
    "persistenceBoundary",
    "userOwnershipBoundary",
    "PRODUCT_EXPERIENCE_IMPLEMENTATION_READINESS",
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
    "temporaryStateOnly",
    "FUTURE_PERSISTENCE_BOUNDARY",
    "FUTURE_USER_OWNERSHIP_BOUNDARY",
    "NOT_IMPLEMENTED",
    "noUiImplementation",
    "noRouteImplementation",
    "noStorageImplementation",
    "noUserAccountImplementation",
    "noAuthenticationImplementation",
    "noGenesisMutation",
    "noRealityEngineImplementation",
    "noCrystalEngineImplementation",
  ].forEach((marker) => assertIncludes("P29 readiness type", source.type, marker));

  [
    "reviewProductExperienceImplementationReadiness",
    "FIRST_LIFE_JOURNEY_EXPERIENCE_FLOW_REQUIRED",
    "FIRST_LIFE_JOURNEY_EXPERIENCE_FLOW_UNAVAILABLE",
    "FIRST_LIFE_JOURNEY_EXPERIENCE_FLOW_BLOCKED",
    "FIRST_LIFE_JOURNEY_FLOW_BOUNDARY_INVALID",
    "PRODUCT_EXPERIENCE_SEQUENCE_INVALID",
    "PRODUCT_EXPERIENCE_PARTICIPATION_BOUNDARY_INVALID",
    "EXPERIENCE_RUNTIME_BOUNDARY",
    "UI_CONSUMPTION_BOUNDARY",
    "PERSISTENCE_BOUNDARY",
    "USER_OWNERSHIP_BOUNDARY",
    "READY_FOR_PRODUCT_EXPERIENCE_IMPLEMENTATION_DESIGN",
    "noUiImplementation",
    "noRouteImplementation",
    "noSessionImplementation",
    "noStorageImplementation",
    "noUserAccountImplementation",
    "noAuthenticationImplementation",
    "noGenesisMutation",
    "noRealityEngineImplementation",
    "noGravityEngineImplementation",
    "noChoiceEngineImplementation",
    "noCrystalEngineImplementation",
  ].forEach((marker) => assertIncludes("P29 readiness service", source.service, marker));

  [
    "createUser",
    "saveUser",
    "navigateTo",
    "pushState",
    "replaceState",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "document.",
    "window.",
    "createAccount",
    "authenticateUser",
    "persistJourney",
    "writeStorage",
    "saveCrystal",
  ].forEach((marker) => assertExcludes("P29 remains readiness review only", source.service, marker));

  [
    "FirstLifeJourneyExperienceFlowResult",
    "FirstLifeJourneyExperienceFlow",
    "stageSequence",
    "activeParticipationNodes",
    "noStorageWrite",
    "noProductionIntegration",
  ].forEach((marker) => assertIncludes("P29 upstream flow contract", source.upstreamType, marker));
  assertIncludes("P29 upstream flow service", source.upstreamService, "reviewFirstLifeJourneyExperienceFlow");

  [
    "ProductExperienceImplementationReadiness",
    "ProductExperienceImplementationReadinessResult",
    "from \"./productExperienceImplementationReadiness\"",
  ].forEach((marker) => assertIncludes("P29 type index export", source.typeIndex, marker));
  assertIncludes(
    "P29 gate registered",
    packageJson.scripts?.["check-product-experience-implementation-readiness"] ?? "",
    "node scripts/check-product-experience-implementation-readiness.mjs",
  );
  assertIncludes(
    "P29 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-product-experience-implementation-readiness",
  );

  const modulePath = path.join(os.tmpdir(), `guanyao-product-experience-readiness-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { reviewProductExperienceImplementationReadiness } from "./src/services/productExperienceImplementationReadiness.ts";`,
      resolveDir: rootDir,
      sourcefile: "product-experience-readiness-gate-entry.ts",
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
  const flow = Object.freeze({
    stageSequence: [
      "ENTRY_TO_GUANYAO",
      "GENESIS",
      "LIFE_RECOGNITION",
      "REALITY_ENTRY",
      "PRESSURE_RECOGNITION",
      "GRAVITY",
      "CHOICE",
      "CRYSTAL",
    ],
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
  const ready = runtime.reviewProductExperienceImplementationReadiness({
    firstLifeJourneyExperienceFlow: {
      status: "READY",
      flow,
    },
  });
  assertEqual("P29 valid readiness", ready.status, "READY");
  assertEqual(
    "P29 readiness state",
    ready.readinessContract?.readinessState,
    "READY_FOR_PRODUCT_EXPERIENCE_IMPLEMENTATION_DESIGN",
  );
  assertEqual(
    "P29 UI presentation only",
    ready.readinessContract?.uiConsumptionBoundary.presentationAndInteractionOnly,
    true,
  );
  assertEqual(
    "P29 session temporary only",
    ready.readinessContract?.sessionBoundary.noLongTermPersistence,
    true,
  );
  assertEqual(
    "P29 persistence future only",
    ready.readinessContract?.persistenceBoundary.implementationState,
    "NOT_IMPLEMENTED",
  );
  assertEqual(
    "P29 ownership future only",
    ready.readinessContract?.userOwnershipBoundary.ownershipState,
    "NOT_IMPLEMENTED",
  );
  assertEqual(
    "P29 no Storage",
    ready.readinessContract?.boundary.noStorageImplementation,
    true,
  );
  assertEqual(
    "P29 no account",
    ready.readinessContract?.boundary.noUserAccountImplementation,
    true,
  );
  assertEqual(
    "P29 no life calculation",
    ready.readinessContract?.boundary.noGenesisMutation,
    true,
  );

  const unavailable = runtime.reviewProductExperienceImplementationReadiness({
    firstLifeJourneyExperienceFlow: null,
  });
  assertEqual("P29 missing flow unavailable", unavailable.status, "UNAVAILABLE");
  assertEqual(
    "P29 missing flow reason",
    unavailable.reason,
    "FIRST_LIFE_JOURNEY_EXPERIENCE_FLOW_REQUIRED",
  );

  const blocked = runtime.reviewProductExperienceImplementationReadiness({
    firstLifeJourneyExperienceFlow: { status: "BLOCKED" },
  });
  assertEqual("P29 blocked flow blocked", blocked.status, "BLOCKED");
  assertEqual(
    "P29 blocked flow reason",
    blocked.reason,
    "FIRST_LIFE_JOURNEY_EXPERIENCE_FLOW_BLOCKED",
  );
  fs.rmSync(modulePath, { force: true });
}

if (failures.length > 0) {
  console.error("Product Experience Implementation Readiness gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log("Product Experience Implementation Readiness gate passed.");
}
