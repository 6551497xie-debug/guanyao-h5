import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  host: "src/components/RealityProductionHost.tsx",
  hostType: "src/types/realityProductionRouteEntry.ts",
  route: "src/pages/RealityProductionRouteEntry.tsx",
  continuationType: "src/types/realityPressureSeedContinuationContext.ts",
  continuationService: "src/services/realityPressureSeedContinuationContext.ts",
  v2Presentation: "src/components/RealityPressureSeedPresentation.tsx",
  v2Consumer: "src/services/realityProductionPressureSeedConsumer.ts",
  v1Consumer: "src/services/realityProductionPressureConsumer.ts",
  gravityConsumer: "src/services/realityProductionGravityConsumer.ts",
  packageManifest: "package.json",
};
const source = Object.fromEntries(
  Object.entries(paths).map(([name, file]) => [
    name,
    fs.readFileSync(path.join(rootDir, file), "utf8"),
  ]),
);

const assertEqual = (name, actual, expected) => {
  if (actual !== expected) {
    throw new Error(`${name} expected=${expected} actual=${actual}`);
  }
  console.log(`PASS | ${name}`);
};
const assertIncludes = (name, text, marker) => {
  if (!text.includes(marker)) throw new Error(`${name} missing=${marker}`);
  console.log(`PASS | ${name}`);
};
const assertExcludes = (name, text, marker) => {
  if (text.includes(marker)) throw new Error(`${name} forbidden=${marker}`);
  console.log(`PASS | ${name}`);
};

try {
  [
    "initializeRealityProductionPressureSeedConsumer",
    "advanceRealityProductionPressureSeedConsumer",
    "RealityPressureSeedPresentation",
    "attachRealityPressureSeedSessionToContinuationContext",
    "advanceRealityPressureSeedContinuationContext",
    "bridgeRealityPressureActivationCandidateRequestContext",
    "advanceRealityPressureActivationDeliveryOrchestration",
    '"PRESSURE_SEED_RECOGNIZE"',
    '"PRESSURE_SEED_REQUEST_NEXT_BUNDLE"',
    '"PRESSURE_SEED_PAUSE"',
    '"GRAVITY_READY_HOLD"',
    'data-pressure-runtime="V2_PRESSURE_SEED_ONLY"',
    'data-gravity-stage="NOT_STARTED"',
  ].forEach((marker) =>
    assertIncludes("Production Host runs the V2 Pressure Seed chain", source.host, marker),
  );

  [
    "initializeRealityProductionPressureConsumer",
    "advanceRealityProductionPressureConsumer",
    "RealityPressurePresentation",
    "initializeRealityProductionGravityConsumer",
    "advanceRealityProductionGravityConsumer",
    "RealityGravityPresentation",
    "initializeRealityProductionChoiceConsumer",
    "advanceRealityProductionChoiceConsumer",
    "RealityChoicePresentation",
    "candidates[0]",
    "selectedCandidate",
    "localStorage",
    "sessionStorage",
    "useNavigate",
  ].forEach((marker) =>
    assertExcludes(
      "Production Host has no V1, downstream execution, automatic selection, storage, or navigation path",
      source.host,
      marker,
    ),
  );

  [
    "productionPressureSeedConsumerOnly: true",
    "pressureSeedContinuationContextRequired: true",
    "pressureSeedConsumerActivated: true",
    "v1PressureConsumerForbidden: true",
    "v2PressureSeedPresentationOnly: true",
    "explicitPressureSeedRecognitionOnly: true",
    "explicitNextBundleRequestOnly: true",
    "gravityReadinessHoldOnly: true",
    "noAutomaticSelection: true",
    "noGravityExecution: true",
    "noChoiceExecution: true",
  ].forEach((marker) =>
    assertIncludes("atomic Host boundary", source.hostType, marker),
  );

  assertIncludes(
    "Route passes initial continuation context",
    source.route,
    "pressureSeedContinuationContext={pressureSeedContinuationResult.context}",
  );
  assertIncludes(
    "Route requires initial continuation phase",
    source.route,
    '"READY_FOR_CONSUMER_INITIALIZATION"',
  );
  assertIncludes(
    "Continuation supports a new delivery bundle",
    source.continuationService,
    "advanceRealityPressureSeedContinuationContext",
  );
  assertIncludes(
    "Continuation carries no automatic selection",
    source.continuationType,
    "noCandidateSelection: true",
  );
  assertExcludes(
    "V2 Presentation remains consumer-neutral",
    source.v2Presentation,
    "../services/",
  );
  assertExcludes(
    "V2 Consumer invokes no Gravity",
    source.v2Consumer,
    "initializeRealityProductionGravityConsumer",
  );
  assertExcludes(
    "V1 Consumer is not rewritten to impersonate V2",
    source.v1Consumer,
    "RealityProductionPressureSeedSession",
  );
  assertExcludes(
    "Gravity Consumer does not import V2 Host",
    source.gravityConsumer,
    "RealityProductionHost",
  );

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "atomic cutover gate is registered",
    packageJson.scripts?.[
      "check-reality-pressure-v2-atomic-host-cutover"
    ] ?? "",
    "node scripts/check-reality-pressure-v2-atomic-host-cutover.mjs",
  );

  const compileResult = await build({
    entryPoints: [path.join(rootDir, paths.host)],
    bundle: true,
    platform: "browser",
    format: "esm",
    target: "es2022",
    write: false,
    metafile: true,
    logLevel: "silent",
    loader: { ".css": "empty" },
  });
  assertEqual("V2 Production Host compiles independently", compileResult.errors.length, 0);
  const bundleInputs = Object.keys(compileResult.metafile.inputs);
  for (const requiredInput of [
    "RealityPressureSeedPresentation.tsx",
    "realityProductionPressureSeedConsumer.ts",
    "realityPressureSeedContinuationContext.ts",
    "realityPressureActivationDeliveryOrchestrationBridge.ts",
  ]) {
    assertEqual(
      `V2 Host bundle includes ${requiredInput}`,
      bundleInputs.some((input) => input.includes(requiredInput)),
      true,
    );
  }
  for (const forbiddenInput of [
    "RealityPressurePresentation.tsx",
    "realityProductionPressureConsumer.ts",
    "RealityGravityPresentation.tsx",
    "realityProductionGravityConsumer.ts",
    "RealityChoicePresentation.tsx",
    "realityProductionChoiceConsumer.ts",
    "PersonalStarBeastWebGLPrototypeHarness",
    "isolatedWebGLRendererPrototype.ts",
    "guanyaoRuntimeEngine",
  ]) {
    assertEqual(
      `V2 Host bundle excludes ${forbiddenInput}`,
      bundleInputs.some((input) => input.includes(forbiddenInput)),
      false,
    );
  }

  console.log("\n[REALITY PRESSURE V2 ATOMIC HOST CUTOVER] PASS");
} catch (error) {
  console.error("[REALITY PRESSURE V2 ATOMIC HOST CUTOVER] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
