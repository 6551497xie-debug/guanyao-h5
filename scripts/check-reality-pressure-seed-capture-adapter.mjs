import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  type: "src/types/realityPressureSeedCaptureAdapter.ts",
  service: "src/services/realityPressureSeedCaptureAdapter.ts",
  sourceService: "src/services/realityPressureSeedCandidateSource.ts",
  pressureConsumer: "src/services/realityProductionPressureConsumer.ts",
  pressurePresentation: "src/components/RealityPressurePresentation.tsx",
  productionHost: "src/components/RealityProductionHost.tsx",
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
    "RealityPressureSeedCaptureAdapterBoundary",
    "RealityPressureSeedCaptureAdapterInput",
    "RealityPressureSeedCaptureAdapterResult",
    "RealityPressureSeedCandidateSourceContext",
    "RealityPressureSeedCaptureCommand",
    "RealityPressureSeedCaptureResult",
  ].forEach((marker) =>
    assertIncludes("capture adapter type contract", source.type, marker),
  );

  [
    "captureAdapterOnly: true",
    "authorizedCandidateSourceContextOnly: true",
    "explicitUserRecognitionOnly: true",
    "existingSelectedContextBuilderOnly: true",
    "sourceReferenceContinuityRequired: true",
    "bundleReferenceContinuityRequired: true",
    "candidateMembershipRequired: true",
    "immutableOutputOnly: true",
    "dualSourceProvenanceRequired: true",
    "noFixtureSource: true",
    "noPrototypeSource: true",
    "noDefaultSource: true",
    "noSourceFallback: true",
    "noCandidateSourceResolution: true",
    "noCandidateAssembly: true",
    "noNewPressureEngine: true",
    "noAutomaticSelection: true",
    "noPressureConsumerIntegration: true",
    "noGravityIntegration: true",
    "noUiIntegration: true",
    "noStorageRead: true",
    "noStorageWrite: true",
  ].forEach((marker) =>
    assertIncludes("capture adapter boundary", source.service, marker),
  );

  [
    "export function captureRealityPressureSeed",
    "buildSelectedPressureSeedContext",
    'command.event !== "PRESSURE_SEED_RECOGNIZE"',
    '"USER_RECOGNITION_REQUIRED"',
    '"CANDIDATE_NOT_IN_BUNDLE"',
    'candidateSource: "PRESSURE_SEED_MATRIX_V2"',
    'recognitionSource: "REAL_USER_SESSION"',
    'captureState: "SEED_RECOGNIZED"',
    'gravityReadiness: "READY"',
  ].forEach((marker) =>
    assertIncludes("capture adapter behavior", source.service, marker),
  );

  [
    "GUANYAO_PRESSURE_SEED_MATRIX_V2",
    "getPressureSeedSceneTriplet",
    "resolveRealityPressureSeedCandidateSource",
    "initializeRealityProductionPressureConsumer",
    "advanceRealityProductionPressureConsumer",
    "initializeRealityProductionGravityConsumer",
    "writeSelectedPressureSeedContext",
    "readPersistedSelectedPressureSeedContext",
    "localStorage",
    "sessionStorage",
    "react",
    "useNavigate",
    "createGenesisWebGLRendererCore",
  ].forEach((marker) =>
    assertExcludes(
      "adapter starts no source resolution, engine, consumer, UI, renderer, route, or storage",
      source.service,
      marker,
    ),
  );

  assertExcludes(
    "Pressure consumer is not integrated in WORK-003C",
    source.pressureConsumer,
    "captureRealityPressureSeed",
  );
  assertExcludes(
    "Pressure presentation is not integrated in WORK-003C",
    source.pressurePresentation,
    "RealityPressureSeedCaptureAdapter",
  );
  assertExcludes(
    "Production host is not integrated in WORK-003C",
    source.productionHost,
    "captureRealityPressureSeed",
  );
  assertExcludes(
    "Gravity is not integrated in WORK-003C",
    source.gravityConsumer,
    "selectedPressureSeedContext",
  );

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "capture adapter gate is registered",
    packageJson.scripts?.["check-reality-pressure-seed-capture-adapter"] ?? "",
    "node scripts/check-reality-pressure-seed-capture-adapter.mjs",
  );

  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "guanyao-pressure-seed-capture-adapter-"),
  );
  const entryPath = path.join(tempDir, "entry.ts");
  const outPath = path.join(tempDir, "entry.mjs");
  fs.writeFileSync(
    entryPath,
    [
      `export * from ${JSON.stringify(path.join(rootDir, paths.sourceService))};`,
      `export * from ${JSON.stringify(path.join(rootDir, paths.service))};`,
    ].join("\n"),
  );
  await build({
    entryPoints: [entryPath],
    outfile: outPath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const runtime = await import(`file://${outPath}?t=${Date.now()}`);
  const sourceResult = runtime.resolveRealityPressureSeedCandidateSource({
    sourceExperienceMode: "REAL_USER_EXPERIENCE",
    sourceReferenceId: "launch:real-user:work-003c",
    candidateCursor: null,
    excludedCandidateReferenceIds: [],
    ageSegment: "ESTABLISHING",
    ageSegmentRole: "CATALOG_ROUTING_ONLY",
  });
  assertEqual("candidate source prerequisite is ready", sourceResult.status, "READY");

  const sourceContext = sourceResult.context;
  const candidate = sourceContext.candidateBundle.candidates[0];
  const baseCommand = {
    event: "PRESSURE_SEED_RECOGNIZE",
    sourceReferenceId: sourceContext.sourceReferenceId,
    candidateBundleReferenceId: sourceContext.bundleReferenceId,
    recognizedCandidateReferenceId: candidate.candidateReferenceId,
  };

  const paused = runtime.captureRealityPressureSeed({
    sourceContext,
    command: {
      ...baseCommand,
      event: "PRESSURE_SEED_PAUSE",
      recognizedCandidateReferenceId: null,
    },
  });
  assertEqual("pause never captures a Seed", paused.status, "BLOCKED");
  assertEqual("pause remains explicit", paused.captureState, "PAUSED");
  assertEqual("pause creates no selected context", paused.selectedPressureSeedContext, null);
  assertEqual("pause keeps Gravity closed", paused.gravityReadiness, "NOT_READY");

  const nextBundle = runtime.captureRealityPressureSeed({
    sourceContext,
    command: {
      ...baseCommand,
      event: "PRESSURE_SEED_REQUEST_NEXT_BUNDLE",
      recognizedCandidateReferenceId: null,
    },
  });
  assertEqual("next-bundle request does not auto-capture", nextBundle.status, "BLOCKED");
  assertEqual("next-bundle requires later recognition", nextBundle.reason, "USER_RECOGNITION_REQUIRED");

  const sourceMismatch = runtime.captureRealityPressureSeed({
    sourceContext,
    command: { ...baseCommand, sourceReferenceId: "launch:other-user" },
  });
  assertEqual("source mismatch is blocked", sourceMismatch.status, "BLOCKED");
  assertEqual("source mismatch is explicit", sourceMismatch.reason, "SOURCE_REFERENCE_MISMATCH");

  const bundleMismatch = runtime.captureRealityPressureSeed({
    sourceContext,
    command: { ...baseCommand, candidateBundleReferenceId: "other-bundle" },
  });
  assertEqual("bundle mismatch is blocked", bundleMismatch.status, "BLOCKED");
  assertEqual("bundle mismatch creates no context", bundleMismatch.selectedPressureSeedContext, null);

  const candidateMismatch = runtime.captureRealityPressureSeed({
    sourceContext,
    command: { ...baseCommand, recognizedCandidateReferenceId: "unknown-seed" },
  });
  assertEqual("candidate outside bundle is blocked", candidateMismatch.status, "BLOCKED");
  assertEqual("candidate membership reason is explicit", candidateMismatch.reason, "CANDIDATE_NOT_IN_BUNDLE");

  const captured = runtime.captureRealityPressureSeed({
    sourceContext,
    command: baseCommand,
  });
  assertEqual("explicit recognition captures Seed", captured.status, "CAPTURED");
  assertEqual("capture state is recognized", captured.captureState, "SEED_RECOGNIZED");
  assertEqual("selected Seed remains identical", captured.selectedPressureSeedContext.selectedPressureSeedId, candidate.candidateReferenceId);
  assertEqual("Matrix provenance is retained", captured.provenance.candidateSource, "PRESSURE_SEED_MATRIX_V2");
  assertEqual("recognition provenance is real user", captured.provenance.recognitionSource, "REAL_USER_SESSION");
  assertEqual("source reference remains continuous", captured.provenance.sourceReferenceId, sourceContext.sourceReferenceId);
  assertEqual("bundle reference remains continuous", captured.provenance.bundleReferenceId, sourceContext.bundleReferenceId);
  assertEqual("candidate reference remains continuous", captured.provenance.candidateReferenceId, candidate.candidateReferenceId);
  assertEqual("recognized Seed opens Gravity readiness", captured.gravityReadiness, "READY");
  assertEqual("selected context is immutable", Object.isFrozen(captured.selectedPressureSeedContext), true);
  assertEqual("capture provenance is immutable", Object.isFrozen(captured.provenance), true);
  assertEqual("capture result is immutable", Object.isFrozen(captured), true);
  assertEqual("adapter performs no Gravity integration", captured.boundary.noGravityIntegration, true);
  assertEqual("adapter writes no storage", captured.boundary.noStorageWrite, true);

  console.log("\n[REALITY PRESSURE SEED CAPTURE ADAPTER] PASS");
} catch (error) {
  console.error("[REALITY PRESSURE SEED CAPTURE ADAPTER] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
