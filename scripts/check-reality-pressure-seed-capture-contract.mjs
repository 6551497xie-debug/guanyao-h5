import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  type: "src/types/realityPressureSeedCaptureContract.ts",
  service: "src/services/realityPressureSeedCaptureContract.ts",
  pressureConsumer: "src/services/realityProductionPressureConsumer.ts",
  pressurePresentation: "src/components/RealityPressurePresentation.tsx",
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
    "RealityPressureSeedCandidateRequest",
    "RealityPressureSeedCandidateBundle",
    "RealityPressureSeedCaptureCommand",
    "RealityPressureSeedCaptureResult",
    "RealityPressureSeedCaptureContractBoundary",
    "candidateSource: RealityPressureSeedCandidateSource",
    "recognitionSource: RealityPressureSeedRecognitionSource",
    'selectionMode: "USER_RECOGNITION_REQUIRED"',
    'ageSegmentRole?: "CATALOG_ROUTING_ONLY"',
    'status: "CAPTURED"',
    'selectedPressureSeedContext: SelectedPressureSeedContext',
    'gravityReadiness: "READY"',
    'selectedPressureSeedContext: null',
    'gravityReadiness: "NOT_READY"',
    '"CANDIDATE_NOT_IN_BUNDLE"',
    '"USER_RECOGNITION_REQUIRED"',
  ].forEach((marker) =>
    assertIncludes("Pressure Seed capture type contract", source.type, marker),
  );

  [
    "contractOnly: true",
    "explicitUserRecognitionRequired: true",
    "dualSourceProvenanceRequired: true",
    "sourceReferenceContinuityRequired: true",
    "noFixtureSource: true",
    "noPrototypeSource: true",
    "noDefaultSource: true",
    "noSourceFallback: true",
    "noEngineInvocation: true",
    "noCandidateSourceImplementation: true",
    "noCandidateAssembly: true",
    "noCaptureExecution: true",
    "noPressureConsumerIntegration: true",
    "noGravityIntegration: true",
    "noUiIntegration: true",
    "noStorageRead: true",
    "noStorageWrite: true",
  ].forEach((marker) =>
    assertIncludes("Pressure Seed capture boundary", source.service, marker),
  );

  [
    '"PRESSURE_SEED_RECOGNIZE"',
    '"PRESSURE_SEED_REQUEST_NEXT_BUNDLE"',
    '"PRESSURE_SEED_PAUSE"',
    'readyState: "SEED_RECOGNIZED"',
    'gravityReadyState: "READY"',
  ].forEach((marker) =>
    assertIncludes("Pressure Seed capture events", source.service, marker),
  );

  [
    "GUANYAO_PRESSURE_SEED_MATRIX_V2",
    "getPressureSeedSceneTriplet",
    "buildSelectedPressureSeedContext",
    "resolvePressureRecognitionUIRuntime",
    "initializeRealityProductionPressureConsumer",
    "initializeRealityProductionGravityConsumer",
    "writeSelectedPressureSeedContext",
    "readPersistedSelectedPressureSeedContext",
    "localStorage",
    "sessionStorage",
    "react",
    "createGenesisWebGLRendererCore",
    "isolatedWebGLRendererPrototype",
    "useNavigate",
  ].forEach((marker) =>
    assertExcludes(
      "contract starts no source, engine, consumer, UI, renderer, route, or storage",
      source.service,
      marker,
    ),
  );

  assertExcludes(
    "Pressure consumer is not integrated in WORK-003A",
    source.pressureConsumer,
    "RealityPressureSeedCaptureContract",
  );
  assertExcludes(
    "Pressure presentation is not integrated in WORK-003A",
    source.pressurePresentation,
    "RealityPressureSeedCandidateBundle",
  );
  assertExcludes(
    "Gravity consumer is not integrated in WORK-003A",
    source.gravityConsumer,
    "SelectedPressureSeedContext",
  );

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "Pressure Seed capture contract gate is registered",
    packageJson.scripts?.["check-reality-pressure-seed-capture-contract"] ?? "",
    "node scripts/check-reality-pressure-seed-capture-contract.mjs",
  );

  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "guanyao-pressure-seed-capture-contract-"),
  );
  const outPath = path.join(tempDir, "contract.mjs");
  await build({
    entryPoints: [path.join(rootDir, paths.service)],
    outfile: outPath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const runtime = await import(`file://${outPath}?t=${Date.now()}`);
  const contract = runtime.REALITY_PRESSURE_SEED_CAPTURE_CONTRACT;

  assertEqual("contract schema is frozen", Object.isFrozen(contract), true);
  assertEqual("contract boundary is frozen", Object.isFrozen(contract.boundary), true);
  assertEqual("contract event list is frozen", Object.isFrozen(contract.allowedEvents), true);
  assertEqual("candidate source is Matrix V2", contract.candidateSource, "PRESSURE_SEED_MATRIX_V2");
  assertEqual("recognition source is real user", contract.recognitionSource, "REAL_USER_SESSION");
  assertEqual("selection requires user recognition", contract.selectionMode, "USER_RECOGNITION_REQUIRED");
  assertEqual("contract exposes three allowed events", contract.allowedEvents.length, 3);
  assertEqual("recognized Seed alone opens Gravity", contract.gravityReadyState, "READY");
  assertEqual("contract executes no capture", contract.boundary.noCaptureExecution, true);

  console.log("\n[REALITY PRESSURE SEED CAPTURE CONTRACT] PASS");
} catch (error) {
  console.error("[REALITY PRESSURE SEED CAPTURE CONTRACT] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
