import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  type: "src/types/realityProductionGravityConsumer.ts",
  service: "src/services/realityProductionGravityConsumer.ts",
  gravityType: "src/types/gravityExperienceUIRuntime.ts",
  gravityService: "src/services/gravityExperienceUIRuntime.ts",
  pressureType: "src/types/realityProductionPressureConsumer.ts",
  pressureService: "src/services/realityProductionPressureConsumer.ts",
  host: "src/components/RealityProductionHost.tsx",
  harness: "src/pages/PersonalStarBeastWebGLPrototypeHarness.tsx",
  dynamics: "src/pages/GravityPage.tsx",
  architecture: "src/services/realityGravityExperienceArchitecture.ts",
  packageManifest: "package.json",
};
const source = Object.fromEntries(
  Object.entries(paths).map(([name, file]) => [
    name,
    fs.readFileSync(path.join(rootDir, file), "utf8"),
  ]),
);
const tempDir = fs.mkdtempSync(
  path.join(os.tmpdir(), "guanyao-reality-production-gravity-consumer-"),
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
    "RealityProductionGravityConsumerBoundary",
    "RealityProductionGravityPressureSessionReference",
    "RealityProductionGravitySession",
    "RealityProductionGravityConsumerInitializeInput",
    "RealityProductionGravityConsumerAdvanceInput",
    '"GRAVITY_OBSERVATION_CONFIRM"',
    'schemaVersion: "GUANYAO_REALITY_PRODUCTION_GRAVITY_SESSION_V1"',
    'sourceExperienceMode: "REAL_USER_EXPERIENCE"',
    'sourceProvenance: "REAL_USER_SESSION"',
    'stateResolverReference: "gravity_experience_ui_runtime"',
    "pressureSessionReference:",
    "gravityStageState:",
    "automaticResponseState:",
    "patternAwarenessState:",
    "choiceReadiness:",
    "interactionAvailability:",
    "confirmedPressureSessionOnly: true",
    "existingGravityStateResolverOnly: true",
    "reviewRuntimeResultNotExposed: true",
    "choiceReadinessOutputOnly: true",
    "noInertiaEngine: true",
    "noPressureMutation: true",
    "noChoiceExecution: true",
    "noUiIntegration: true",
  ].forEach((marker) =>
    assertIncludes("Production Gravity consumer contract", source.type, marker),
  );

  [
    "SelectedPressureSeedContext",
    "pressureSeed:",
    "pressureResult:",
    "gravityResult:",
    "choiceResult:",
    "RenderPlan",
    "SceneModel",
    "fixture:",
  ].forEach((marker) =>
    assertExcludes(
      "Production Gravity contract carries no engine result, visual, or fixture",
      source.type,
      marker,
    ),
  );

  [
    "initializeRealityProductionGravityConsumer",
    "advanceRealityProductionGravityConsumer",
    "resolveGravityExperienceUIRuntime({",
    'pressureSession.gravityReadiness !== "READY"',
    'pressureSession.pressureObservationConfirmed !== true',
    'gravityStageState === "AUTOMATIC_RESPONSE_AWARENESS"',
    'gravityStageState === "CHOICE_READY"',
    'pressureSessionReference.sourceReferenceId ===',
    '"GRAVITY_NOT_READY"',
    '"GRAVITY_OBSERVATION_ALREADY_CONFIRMED"',
    '"GRAVITY_STATE_RESOLVER_NOT_READY"',
  ].forEach((marker) =>
    assertIncludes("Production Gravity consumer service", source.service, marker),
  );

  [
    "GuanyaoRuntimeEngine",
    "resolvePressureRecognitionUIRuntime",
    "initializeRealityProductionPressureConsumer",
    "advanceRealityProductionPressureConsumer",
    "reviewRealityGravityExperienceArchitecture",
    "resolveChoiceExperienceUIRuntime",
    "resolveCrystalExperienceUIRuntime",
    "GravityPage",
    "PersonalStarBeastWebGLPrototypeHarness",
    "isolatedWebGLRendererPrototype",
    "react-router-dom",
    "useNavigate",
    "localStorage",
    "sessionStorage",
    "fetch(",
  ].forEach((marker) =>
    assertExcludes(
      "Production Gravity consumer starts no upstream, engine, downstream, UI, router, or storage",
      source.service,
      marker,
    ),
  );

  assertIncludes(
    "existing Gravity resolver remains review-only",
    source.gravityType,
    "inertiaReviewOnly: true",
  );
  assertIncludes(
    "existing Gravity resolver still owns frozen transition",
    source.gravityService,
    "resolveGravityExperienceUIRuntime",
  );
  assertIncludes(
    "Pressure session remains Gravity-readiness-only",
    source.pressureType,
    "gravityReadinessOutputOnly: true",
  );
  assertExcludes(
    "Pressure consumer does not activate Gravity",
    source.pressureService,
    "initializeRealityProductionGravityConsumer",
  );
  assertIncludes(
    "Production Host initializes the authorized Gravity consumer",
    source.host,
    "initializeRealityProductionGravityConsumer",
  );
  assertIncludes(
    "Production Host advances only explicit Gravity confirmation",
    source.host,
    "advanceRealityProductionGravityConsumer",
  );
  assertIncludes(
    "Production Host stops at Choice readiness",
    source.host,
    '"CHOICE_READY_HOLD"',
  );
  assertExcludes(
    "Production Host does not call the review resolver directly",
    source.host,
    "resolveGravityExperienceUIRuntime",
  );
  assertIncludes(
    "Prototype Harness still uses frozen Gravity resolver",
    source.harness,
    "resolveGravityExperienceUIRuntime",
  );
  assertIncludes(
    "Prototype Harness remains fixture-only",
    source.harness,
    'sourceExperienceMode !== "FIXTURE_PREVIEW_ONLY"',
  );
  assertIncludes(
    "legacy Dynamics remains isolated",
    source.dynamics,
    "LEGACY_DYNAMICS_FLOW_ISOLATED",
  );
  assertIncludes(
    "Gravity architecture remains non-production review",
    source.architecture,
    "noProductionIntegration: true",
  );

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "Production Gravity consumer gate is registered",
    packageJson.scripts?.["check-reality-production-gravity-consumer"] ?? "",
    "node scripts/check-reality-production-gravity-consumer.mjs",
  );

  const outPath = path.join(tempDir, "consumer.mjs");
  const compileResult = await build({
    entryPoints: [path.join(rootDir, paths.service)],
    outfile: outPath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    metafile: true,
    logLevel: "silent",
  });
  assertEqual("Production Gravity consumer compiles independently", compileResult.errors.length, 0);
  const bundleInputs = Object.keys(compileResult.metafile.inputs);
  assertEqual(
    "Production Gravity bundle includes frozen state resolver",
    bundleInputs.some((input) => input.includes("gravityExperienceUIRuntime.ts")),
    true,
  );
  for (const forbiddenInput of [
    "realityProductionPressureConsumer.ts",
    "pressureRecognitionUIRuntime.ts",
    "realityGravityExperienceArchitecture.ts",
    "choiceExperienceUIRuntime.ts",
    "crystalExperienceUIRuntime.ts",
    "GravityPage.tsx",
    "PersonalStarBeastWebGLPrototypeHarness.tsx",
    "guanyaoRuntimeEngine",
  ]) {
    assertEqual(
      `Production Gravity bundle excludes ${forbiddenInput}`,
      bundleInputs.some((input) => input.includes(forbiddenInput)),
      false,
    );
  }

  const runtime = await import(`file://${outPath}?t=${Date.now()}`);
  const pressureBoundary = Object.freeze({
    productionPressureConsumerOnly: true,
    authorizedRealitySourceOnly: true,
    existingPressureStateResolverOnly: true,
    reviewRuntimeResultNotExposed: true,
    sourceReferenceContinuityRequired: true,
    immutableSessionOnly: true,
    explicitObservationConfirmationRequired: true,
    gravityReadinessOutputOnly: true,
    noFixtureSource: true,
    noPrototypeSource: true,
    noDefaultSource: true,
    noPressureEngine: true,
    noPressureSeedMatching: true,
    noPressureResult: true,
    noDiagnosis: true,
    noPersonalityLabel: true,
    noGravityExecution: true,
    noChoiceExecution: true,
    noCrystalExecution: true,
    noRendererInvocation: true,
    noUiIntegration: true,
    noRouteMutation: true,
    noNavigationMutation: true,
    noStorageRead: true,
    noStorageWrite: true,
  });
  const sourceReferenceId = "launch:real-user:002.8b";
  const waitingPressureSession = Object.freeze({
    schemaVersion: "GUANYAO_REALITY_PRODUCTION_PRESSURE_SESSION_V1",
    source: "reality_production_pressure_consumer",
    sourceExperienceMode: "REAL_USER_EXPERIENCE",
    sourceProvenance: "REAL_USER_SESSION",
    sourceReferenceId,
    realityEntryEligibility: "ELIGIBLE",
    stateResolverReference: "pressure_recognition_ui_runtime",
    pressureStageState: "PRESSURE_TENSION_OBSERVATION",
    observationState: "OBSERVING_SIGNALS",
    tensionAwareness: "PRESENT",
    gravityReadiness: "NOT_READY",
    interactionAvailability: "PRESSURE_OBSERVATION_CONFIRM",
    pressureObservationConfirmed: false,
    boundary: pressureBoundary,
  });
  const waiting = runtime.initializeRealityProductionGravityConsumer({
    pressureSession: waitingPressureSession,
  });
  assertEqual("unconfirmed Pressure cannot initialize Gravity", waiting.status, "BLOCKED");
  assertEqual("Gravity readiness failure is explicit", waiting.reason, "GRAVITY_NOT_READY");

  const readyPressureSession = Object.freeze({
    ...waitingPressureSession,
    pressureStageState: "GRAVITY_READY",
    observationState: "TENSION_ACKNOWLEDGED",
    tensionAwareness: "ACKNOWLEDGED",
    gravityReadiness: "READY",
    interactionAvailability: "NONE",
    pressureObservationConfirmed: true,
  });
  const initialized = runtime.initializeRealityProductionGravityConsumer({
    pressureSession: readyPressureSession,
  });
  assertEqual("confirmed Pressure initializes Gravity", initialized.status, "READY");
  assertEqual("Gravity begins with automatic response awareness", initialized.session.gravityStageState, "AUTOMATIC_RESPONSE_AWARENESS");
  assertEqual("automatic response becomes visible", initialized.session.automaticResponseState, "VISIBLE");
  assertEqual("pattern awareness emerges", initialized.session.patternAwarenessState, "EMERGING");
  assertEqual("explicit Gravity confirmation is available", initialized.session.interactionAvailability, "GRAVITY_OBSERVATION_CONFIRM");
  assertEqual("Choice has not started", initialized.session.choiceReadiness, "NOT_READY");
  assertEqual("source reference remains continuous", initialized.session.sourceReferenceId, sourceReferenceId);
  assertEqual("Pressure reference remains traceable", initialized.session.pressureSessionReference.sourceReferenceId, sourceReferenceId);
  assertEqual("Gravity session is immutable", Object.isFrozen(initialized.session), true);
  assertEqual("Pressure reference is immutable", Object.isFrozen(initialized.session.pressureSessionReference), true);

  const advanced = runtime.advanceRealityProductionGravityConsumer({
    session: initialized.session,
    event: "GRAVITY_OBSERVATION_CONFIRM",
  });
  assertEqual("explicit Gravity observation advances", advanced.status, "READY");
  assertEqual("acknowledged Gravity exposes Choice readiness", advanced.session.gravityStageState, "CHOICE_READY");
  assertEqual("automatic response is acknowledged", advanced.session.automaticResponseState, "ACKNOWLEDGED");
  assertEqual("pattern awareness is acknowledged", advanced.session.patternAwarenessState, "ACKNOWLEDGED");
  assertEqual("Choice is ready but not executed", advanced.session.choiceReadiness, "READY");
  assertEqual("no second Gravity action exists", advanced.session.interactionAvailability, "NONE");
  assertEqual("advanced Gravity session remains immutable", Object.isFrozen(advanced.session), true);

  const repeated = runtime.advanceRealityProductionGravityConsumer({
    session: advanced.session,
    event: "GRAVITY_OBSERVATION_CONFIRM",
  });
  assertEqual("repeated Gravity confirmation is blocked", repeated.status, "BLOCKED");
  assertEqual("repeated Gravity confirmation reason is explicit", repeated.reason, "GRAVITY_OBSERVATION_ALREADY_CONFIRMED");

  const forbidden = runtime.initializeRealityProductionGravityConsumer({
    pressureSession: Object.freeze({
      ...readyPressureSession,
      sourceReferenceId: "fixture:case-a",
    }),
  });
  assertEqual("fixture source cannot initialize Gravity", forbidden.status, "BLOCKED");
  assertEqual("fixture source reason is explicit", forbidden.reason, "FORBIDDEN_SOURCE_REFERENCE");

  const tampered = runtime.advanceRealityProductionGravityConsumer({
    session: {
      ...initialized.session,
      sourceReferenceId: "launch:other-session",
    },
    event: "GRAVITY_OBSERVATION_CONFIRM",
  });
  assertEqual("cross-session Gravity state is blocked", tampered.status, "BLOCKED");
  assertEqual("cross-session Gravity reason is explicit", tampered.reason, "GRAVITY_SESSION_INVALID");

  for (const forbiddenOutputKey of [
    "uiRuntime",
    "reviewBoundary",
    "pressureSession",
    "pressureResult",
    "gravityResult",
    "choiceResult",
  ]) {
    assertEqual(
      `Production Gravity session excludes ${forbiddenOutputKey}`,
      Object.prototype.hasOwnProperty.call(initialized.session, forbiddenOutputKey),
      false,
    );
  }

  console.log("\n[REALITY PRODUCTION GRAVITY CONSUMER] PASS");
} catch (error) {
  console.error("[REALITY PRODUCTION GRAVITY CONSUMER] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
