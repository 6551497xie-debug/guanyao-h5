import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  type: "src/types/realityProductionPressureConsumer.ts",
  service: "src/services/realityProductionPressureConsumer.ts",
  pressureType: "src/types/pressureRecognitionUIRuntime.ts",
  pressureService: "src/services/pressureRecognitionUIRuntime.ts",
  host: "src/components/RealityProductionHost.tsx",
  harness: "src/pages/PersonalStarBeastWebGLPrototypeHarness.tsx",
  dynamics: "src/pages/GravityPage.tsx",
  packageManifest: "package.json",
};
const source = Object.fromEntries(
  Object.entries(paths).map(([name, file]) => [
    name,
    fs.readFileSync(path.join(rootDir, file), "utf8"),
  ]),
);
const tempDir = fs.mkdtempSync(
  path.join(os.tmpdir(), "guanyao-reality-production-pressure-consumer-"),
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
    "RealityProductionPressureConsumerBoundary",
    "RealityProductionPressureSession",
    "RealityProductionPressureConsumerInitializeInput",
    "RealityProductionPressureConsumerAdvanceInput",
    '"PRESSURE_OBSERVATION_CONFIRM"',
    'schemaVersion: "GUANYAO_REALITY_PRODUCTION_PRESSURE_SESSION_V1"',
    'sourceExperienceMode: "REAL_USER_EXPERIENCE"',
    'sourceProvenance: "REAL_USER_SESSION"',
    'stateResolverReference: "pressure_recognition_ui_runtime"',
    "pressureStageState:",
    "observationState:",
    "tensionAwareness:",
    "gravityReadiness:",
    "interactionAvailability:",
    "existingPressureStateResolverOnly: true",
    "reviewRuntimeResultNotExposed: true",
    "noPressureEngine: true",
    "noPressureSeedMatching: true",
    "noGravityExecution: true",
    "noUiIntegration: true",
  ].forEach((marker) =>
    assertIncludes("Production Pressure consumer contract", source.type, marker),
  );

  [
    "SelectedPressureSeedContext",
    "pressureSeed:",
    "pressureResult:",
    "gravityResult:",
    "RenderPlan",
    "SceneModel",
    "fixture:",
  ].forEach((marker) =>
    assertExcludes("Production Pressure contract carries no seed, engine result, visual, or fixture", source.type, marker),
  );

  [
    "initializeRealityProductionPressureConsumer",
    "advanceRealityProductionPressureConsumer",
    "resolvePressureRecognitionUIRuntime({",
    "authorization.status !== \"READY\"",
    'authorization.routeTarget !== "/reality"',
    'context.pressureRecognitionState !== "NOT_STARTED"',
    "context.genesisCompletionReference.sourceReferenceId",
    "context.recognitionConfirmationReference.sourceReferenceId",
    "context.realityExperienceArchitectureReference.referenceId",
    'pressureStageState === "PRESSURE_TENSION_OBSERVATION"',
    'pressureStageState === "GRAVITY_READY"',
    '"PRESSURE_OBSERVATION_ALREADY_CONFIRMED"',
    '"PRESSURE_STATE_RESOLVER_NOT_READY"',
  ].forEach((marker) =>
    assertIncludes("Production Pressure consumer service", source.service, marker),
  );

  [
    "GuanyaoRuntimeEngine",
    "buildSelectedPressureSeedContext",
    "resolvePressureSeed",
    "generatePressure",
    "reviewRealityPressureRecognitionArchitecture",
    "resolveGravityExperienceUIRuntime",
    "GravityPage",
    "PersonalStarBeastWebGLPrototypeHarness",
    "isolatedWebGLRendererPrototype",
    "react-router-dom",
    "useNavigate",
    "localStorage",
    "sessionStorage",
    "fetch(",
  ].forEach((marker) =>
    assertExcludes("Production Pressure consumer starts no engine, seed, downstream runtime, prototype, router, or storage", source.service, marker),
  );

  assertIncludes("existing Pressure resolver remains review-only", source.pressureType, "observationReviewOnly: true");
  assertIncludes("existing Pressure resolver still owns frozen transition", source.pressureService, "resolvePressureRecognitionUIRuntime");
  assertIncludes("Prototype Harness still uses the same resolver", source.harness, "resolvePressureRecognitionUIRuntime");
  assertIncludes("Prototype Harness remains fixture-only", source.harness, 'sourceExperienceMode !== "FIXTURE_PREVIEW_ONLY"');
  assertIncludes("Production Host initializes the authorized Pressure consumer", source.host, "initializeRealityProductionPressureConsumer");
  assertIncludes("Production Host advances only explicit Pressure confirmation", source.host, "advanceRealityProductionPressureConsumer");
  assertExcludes("Production Host does not call the review resolver directly", source.host, "resolvePressureRecognitionUIRuntime");
  assertIncludes("legacy Dynamics remains isolated", source.dynamics, "LEGACY_DYNAMICS_FLOW_ISOLATED");

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "Production Pressure consumer gate is registered",
    packageJson.scripts?.["check-reality-production-pressure-consumer"] ?? "",
    "node scripts/check-reality-production-pressure-consumer.mjs",
  );

  const entryPath = path.join(tempDir, "entry.ts");
  const outPath = path.join(tempDir, "entry.mjs");
  fs.writeFileSync(
    entryPath,
    [
      `export * from ${JSON.stringify(path.join(rootDir, "src/services/genesisProductionRecognitionRealityEntry.ts"))};`,
      `export * from ${JSON.stringify(path.join(rootDir, "src/services/realityProductionRouteAuthorization.ts"))};`,
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

  const unavailableAuthorization = {
    status: "SOURCE_NOT_READY",
    sourceReferenceId: null,
    sourceContext: null,
  };
  const unavailable = runtime.initializeRealityProductionPressureConsumer({
    routeAuthorization: unavailableAuthorization,
  });
  assertEqual("missing route authorization blocks initialization", unavailable.status, "BLOCKED");
  assertEqual("missing route authorization reason is explicit", unavailable.reason, "REALITY_ROUTE_AUTHORIZATION_REQUIRED");

  runtime.clearGenesisProductionRealityEntryContext();
  const sourceReferenceId = "launch:real-user:002.7b";
  const completionRuntime = {
    currentStage: "COMPLETION",
    runtimeStatus: "RECOGNITION_HOLD",
    interactionAvailability: "RECOGNITION_HOLD",
    sourceExperienceMode: "REAL_USER_EXPERIENCE",
    sourceProvenance: "REAL_USER_SESSION",
    sourceReferenceId,
  };
  const recognition = runtime.initializeGenesisProductionRecognitionRealityEntry(completionRuntime);
  const recognized = runtime.advanceGenesisProductionRecognitionRealityEntry(
    recognition.session,
    "RECOGNITION_CONFIRM",
  );
  const eligible = runtime.advanceGenesisProductionRecognitionRealityEntry(
    recognized.session,
    "ENTER_REALITY",
  );
  runtime.activateGenesisProductionRealityEntryContext(eligible.session);
  const authorization = runtime.authorizeRealityProductionRoute({
    routeTarget: "/reality",
    sourceReferenceId,
  });
  assertEqual("real Reality route authorization is ready", authorization.status, "READY");

  const forbidden = runtime.initializeRealityProductionPressureConsumer({
    routeAuthorization: {
      ...authorization,
      sourceReferenceId: "fixture:case-a",
    },
  });
  assertEqual("fixture source cannot initialize Pressure", forbidden.status, "BLOCKED");
  assertEqual("fixture source reason is explicit", forbidden.reason, "FORBIDDEN_SOURCE_REFERENCE");

  const mismatch = runtime.initializeRealityProductionPressureConsumer({
    routeAuthorization: {
      ...authorization,
      sourceReferenceId: "launch:other-session",
    },
  });
  assertEqual("cross-session source cannot initialize Pressure", mismatch.status, "BLOCKED");
  assertEqual("cross-session reason is explicit", mismatch.reason, "SOURCE_REFERENCE_MISMATCH");

  const initialized = runtime.initializeRealityProductionPressureConsumer({
    routeAuthorization: authorization,
  });
  assertEqual("real Pressure session initializes", initialized.status, "READY");
  assertEqual("initial Pressure stage observes tension", initialized.session.pressureStageState, "PRESSURE_TENSION_OBSERVATION");
  assertEqual("initial observation is active", initialized.session.observationState, "OBSERVING_SIGNALS");
  assertEqual("initial tension is present", initialized.session.tensionAwareness, "PRESENT");
  assertEqual("explicit confirmation is available", initialized.session.interactionAvailability, "PRESSURE_OBSERVATION_CONFIRM");
  assertEqual("Gravity has not started", initialized.session.gravityReadiness, "NOT_READY");
  assertEqual("session preserves source reference", initialized.session.sourceReferenceId, sourceReferenceId);
  assertEqual("session is immutable", Object.isFrozen(initialized.session), true);

  const advanced = runtime.advanceRealityProductionPressureConsumer({
    session: initialized.session,
    event: "PRESSURE_OBSERVATION_CONFIRM",
  });
  assertEqual("explicit observation confirmation advances", advanced.status, "READY");
  assertEqual("acknowledged Pressure exposes Gravity readiness", advanced.session.pressureStageState, "GRAVITY_READY");
  assertEqual("observation is acknowledged", advanced.session.observationState, "TENSION_ACKNOWLEDGED");
  assertEqual("tension awareness is acknowledged", advanced.session.tensionAwareness, "ACKNOWLEDGED");
  assertEqual("Gravity is ready but not executed", advanced.session.gravityReadiness, "READY");
  assertEqual("no second Pressure action exists", advanced.session.interactionAvailability, "NONE");
  assertEqual("advanced session remains immutable", Object.isFrozen(advanced.session), true);

  const repeated = runtime.advanceRealityProductionPressureConsumer({
    session: advanced.session,
    event: "PRESSURE_OBSERVATION_CONFIRM",
  });
  assertEqual("repeated confirmation is blocked", repeated.status, "BLOCKED");
  assertEqual("repeated confirmation reason is explicit", repeated.reason, "PRESSURE_OBSERVATION_ALREADY_CONFIRMED");

  const tampered = runtime.advanceRealityProductionPressureConsumer({
    session: {
      ...initialized.session,
      sourceReferenceId: "prototype:pressure",
    },
    event: "PRESSURE_OBSERVATION_CONFIRM",
  });
  assertEqual("tampered session is blocked", tampered.status, "BLOCKED");
  assertEqual("tampered session reason is explicit", tampered.reason, "PRESSURE_SESSION_INVALID");

  for (const forbiddenOutputKey of [
    "uiRuntime",
    "reviewBoundary",
    "pressureSeed",
    "pressureResult",
    "gravityResult",
  ]) {
    assertEqual(
      `Production session excludes ${forbiddenOutputKey}`,
      Object.prototype.hasOwnProperty.call(initialized.session, forbiddenOutputKey),
      false,
    );
  }

  console.log("\n[REALITY PRODUCTION PRESSURE CONSUMER] PASS");
} catch (error) {
  console.error("[REALITY PRODUCTION PRESSURE CONSUMER] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
