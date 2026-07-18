import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  type: "src/types/realityProductionPressureSeedConsumer.ts",
  service: "src/services/realityProductionPressureSeedConsumer.ts",
  candidateSource: "src/services/realityPressureSeedCandidateSource.ts",
  captureAdapter: "src/services/realityPressureSeedCaptureAdapter.ts",
  legacyPressureConsumer: "src/services/realityProductionPressureConsumer.ts",
  productionHost: "src/components/RealityProductionHost.tsx",
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
    "RealityProductionPressureSeedConsumerBoundary",
    "RealityProductionPressureSeedSession",
    "RealityProductionPressureSeedConsumerInitializeInput",
    "RealityProductionPressureSeedConsumerAdvanceInput",
    "RealityProductionPressureSeedConsumerResult",
    'schemaVersion: "GUANYAO_REALITY_PRODUCTION_PRESSURE_SEED_SESSION_V2"',
    'sourceProvenance: "REAL_USER_SESSION"',
    "candidateBundle: RealityPressureSeedCandidateBundle",
    "selectedPressureSeedContext: Readonly<SelectedPressureSeedContext> | null",
    "captureProvenance: RealityPressureSeedCaptureProvenance | null",
    'gravityReadiness: "NOT_READY" | "READY"',
  ].forEach((marker) =>
    assertIncludes("Production Pressure Seed session contract", source.type, marker),
  );

  [
    "productionPressureSeedConsumerOnly: true",
    "authorizedRealitySourceOnly: true",
    "authorizedCandidateSourceContextOnly: true",
    "existingCaptureAdapterOnly: true",
    "immutableSessionOnly: true",
    "sourceReferenceContinuityRequired: true",
    "bundleReferenceContinuityRequired: true",
    "explicitUserRecognitionRequired: true",
    "gravityReadinessOutputOnly: true",
    "noFixtureSource: true",
    "noPrototypeSource: true",
    "noDefaultSource: true",
    "noSourceFallback: true",
    "noCandidateSourceResolution: true",
    "noCandidateAssembly: true",
    "noNewPressureEngine: true",
    "noAutomaticSelection: true",
    "noGravityExecution: true",
    "noChoiceExecution: true",
    "noCrystalExecution: true",
    "noUiIntegration: true",
    "noStorageRead: true",
    "noStorageWrite: true",
  ].forEach((marker) =>
    assertIncludes("Production Pressure Seed consumer boundary", source.service, marker),
  );

  [
    "initializeRealityProductionPressureSeedConsumer",
    "advanceRealityProductionPressureSeedConsumer",
    "captureRealityPressureSeed({",
    'captureState: "OBSERVING_CANDIDATES"',
    'captureState: "PAUSED"',
    'command.event === "PRESSURE_SEED_REQUEST_NEXT_BUNDLE"',
    'command.event === "PRESSURE_SEED_PAUSE"',
    '"PRESSURE_SEED_ALREADY_RECOGNIZED"',
    '"CANDIDATE_BUNDLE_REFERENCE_MISMATCH"',
    '"NEXT_CANDIDATE_BUNDLE_REQUIRED"',
  ].forEach((marker) =>
    assertIncludes("Production Pressure Seed state transitions", source.service, marker),
  );

  [
    "GUANYAO_PRESSURE_SEED_MATRIX_V2",
    "getPressureSeedSceneTriplet",
    "buildSelectedPressureSeedContext",
    "resolveRealityPressureSeedCandidateSource",
    "resolvePressureRecognitionUIRuntime",
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
      "consumer starts no candidate source, engine, Gravity, UI, renderer, route, or storage",
      source.service,
      marker,
    ),
  );

  assertExcludes(
    "existing Pressure consumer remains unchanged",
    source.legacyPressureConsumer,
    "GUANYAO_REALITY_PRODUCTION_PRESSURE_SEED_SESSION_V2",
  );
  assertExcludes(
    "Production Host does not consume V2 session in WORK-003D",
    source.productionHost,
    "initializeRealityProductionPressureSeedConsumer",
  );
  assertExcludes(
    "Pressure UI does not consume V2 session in WORK-003D",
    source.pressurePresentation,
    "RealityProductionPressureSeedSession",
  );
  assertExcludes(
    "Gravity does not consume V2 session in WORK-003D",
    source.gravityConsumer,
    "GUANYAO_REALITY_PRODUCTION_PRESSURE_SEED_SESSION_V2",
  );

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "Production Pressure Seed consumer gate is registered",
    packageJson.scripts?.["check-reality-production-pressure-seed-consumer"] ?? "",
    "node scripts/check-reality-production-pressure-seed-consumer.mjs",
  );

  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "guanyao-production-pressure-seed-consumer-"),
  );
  const entryPath = path.join(tempDir, "entry.ts");
  const outPath = path.join(tempDir, "entry.mjs");
  fs.writeFileSync(
    entryPath,
    [
      `export * from ${JSON.stringify(path.join(rootDir, paths.candidateSource))};`,
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

  const sourceReferenceId = "launch:real-user:work-003d";
  const routeAuthorization = {
    status: "READY",
    authorizationState: "AUTHORIZED_PRODUCTION_REALITY_SOURCE",
    routeTarget: "/reality",
    sourceReferenceId,
    sourceContext: {
      sourceExperienceMode: "REAL_USER_EXPERIENCE",
      sourceProvenance: "REAL_USER_SESSION",
      sourceReferenceId,
      realityEntryEligibility: "ELIGIBLE",
    },
  };
  const candidateRequest = {
    sourceExperienceMode: "REAL_USER_EXPERIENCE",
    sourceReferenceId,
    candidateCursor: null,
    excludedCandidateReferenceIds: [],
    ageSegment: "ESTABLISHING",
    ageSegmentRole: "CATALOG_ROUTING_ONLY",
  };
  const candidateSource = runtime.resolveRealityPressureSeedCandidateSource(
    candidateRequest,
  );
  assertEqual("candidate source prerequisite is ready", candidateSource.status, "READY");

  const unauthorized = runtime.initializeRealityProductionPressureSeedConsumer({
    routeAuthorization: { ...routeAuthorization, status: "BLOCKED" },
    candidateSourceContext: candidateSource.context,
  });
  assertEqual("unauthorized route is blocked", unauthorized.status, "BLOCKED");
  assertEqual("unauthorized route creates no session", unauthorized.session, null);

  const initialized = runtime.initializeRealityProductionPressureSeedConsumer({
    routeAuthorization,
    candidateSourceContext: candidateSource.context,
  });
  assertEqual("authorized source initializes V2 session", initialized.status, "READY");
  assertEqual("initial session observes candidates", initialized.session.captureState, "OBSERVING_CANDIDATES");
  assertEqual("initial session carries no selected Seed", initialized.session.selectedPressureSeedContext, null);
  assertEqual("initial session keeps Gravity closed", initialized.session.gravityReadiness, "NOT_READY");
  assertEqual("initial session exposes three explicit events", initialized.session.availableEvents.length, 3);
  assertEqual("initial session is immutable", Object.isFrozen(initialized.session), true);

  const firstCandidate = initialized.session.candidateBundle.candidates[0];
  const baseCommand = {
    event: "PRESSURE_SEED_RECOGNIZE",
    sourceReferenceId,
    candidateBundleReferenceId:
      initialized.session.candidateBundleReferenceId,
    recognizedCandidateReferenceId: firstCandidate.candidateReferenceId,
  };
  const paused = runtime.advanceRealityProductionPressureSeedConsumer({
    session: initialized.session,
    candidateSourceContext: candidateSource.context,
    command: {
      ...baseCommand,
      event: "PRESSURE_SEED_PAUSE",
      recognizedCandidateReferenceId: null,
    },
  });
  assertEqual("pause remains a valid session state", paused.status, "READY");
  assertEqual("pause is explicit", paused.session.captureState, "PAUSED");
  assertEqual("pause keeps Gravity closed", paused.session.gravityReadiness, "NOT_READY");

  const captured = runtime.advanceRealityProductionPressureSeedConsumer({
    session: paused.session,
    candidateSourceContext: candidateSource.context,
    command: baseCommand,
  });
  assertEqual("explicit recognition advances V2 session", captured.status, "READY");
  assertEqual("recognized state is retained", captured.session.captureState, "SEED_RECOGNIZED");
  assertEqual("selected Seed enters session", captured.session.selectedPressureSeedContext.selectedPressureSeedId, firstCandidate.candidateReferenceId);
  assertEqual("Matrix provenance enters session", captured.session.captureProvenance.candidateSource, "PRESSURE_SEED_MATRIX_V2");
  assertEqual("real user provenance enters session", captured.session.captureProvenance.recognitionSource, "REAL_USER_SESSION");
  assertEqual("recognized session opens Gravity readiness", captured.session.gravityReadiness, "READY");
  assertEqual("recognized session exposes no further capture events", captured.session.availableEvents.length, 0);

  const repeated = runtime.advanceRealityProductionPressureSeedConsumer({
    session: captured.session,
    candidateSourceContext: candidateSource.context,
    command: baseCommand,
  });
  assertEqual("repeated recognition is blocked", repeated.status, "BLOCKED");
  assertEqual("repeated recognition reason is explicit", repeated.reason, "PRESSURE_SEED_ALREADY_RECOGNIZED");

  const currentIds = initialized.session.candidateBundle.candidates.map(
    (candidate) => candidate.candidateReferenceId,
  );
  const nextSource = runtime.resolveRealityPressureSeedCandidateSource({
    ...candidateRequest,
    candidateCursor:
      initialized.session.candidateBundle.nextCandidateCursor,
    excludedCandidateReferenceIds: currentIds,
  });
  assertEqual("next candidate source is ready", nextSource.status, "READY");
  const nextBundle = runtime.advanceRealityProductionPressureSeedConsumer({
    session: initialized.session,
    candidateSourceContext: nextSource.context,
    command: {
      event: "PRESSURE_SEED_REQUEST_NEXT_BUNDLE",
      sourceReferenceId,
      candidateBundleReferenceId: nextSource.context.bundleReferenceId,
      recognizedCandidateReferenceId: null,
    },
  });
  assertEqual("explicit next bundle advances session", nextBundle.status, "READY");
  assertEqual("next bundle returns to observation", nextBundle.session.captureState, "OBSERVING_CANDIDATES");
  assertEqual("next bundle reference changes", nextBundle.session.candidateBundleReferenceId === initialized.session.candidateBundleReferenceId, false);
  assertEqual("next bundle keeps Gravity closed", nextBundle.session.gravityReadiness, "NOT_READY");

  assertEqual("consumer boundary is frozen", Object.isFrozen(initialized.boundary), true);
  assertEqual("consumer invokes no Gravity", initialized.boundary.noGravityExecution, true);
  assertEqual("consumer writes no storage", initialized.boundary.noStorageWrite, true);

  console.log("\n[REALITY PRODUCTION PRESSURE SEED CONSUMER] PASS");
} catch (error) {
  console.error("[REALITY PRODUCTION PRESSURE SEED CONSUMER] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
