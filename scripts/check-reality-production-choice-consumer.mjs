import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  type: "src/types/realityProductionChoiceConsumer.ts",
  service: "src/services/realityProductionChoiceConsumer.ts",
  choiceType: "src/types/choiceExperienceUIRuntime.ts",
  choiceService: "src/services/choiceExperienceUIRuntime.ts",
  gravityType: "src/types/realityProductionGravityConsumer.ts",
  gravityService: "src/services/realityProductionGravityConsumer.ts",
  host: "src/components/RealityProductionHost.tsx",
  harness: "src/pages/PersonalStarBeastWebGLPrototypeHarness.tsx",
  legacyChoice: "src/pages/ChoicePage.tsx",
  architecture: "src/services/realityChoiceExperienceArchitecture.ts",
  packageManifest: "package.json",
};
const source = Object.fromEntries(
  Object.entries(paths).map(([name, file]) => [
    name,
    fs.readFileSync(path.join(rootDir, file), "utf8"),
  ]),
);
const tempDir = fs.mkdtempSync(
  path.join(os.tmpdir(), "guanyao-reality-production-choice-consumer-"),
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
    "RealityProductionChoiceConsumerBoundary",
    "RealityProductionChoiceGravitySessionReference",
    "RealityProductionChoiceSession",
    "RealityProductionChoiceConsumerInitializeInput",
    "RealityProductionChoiceConsumerAdvanceInput",
    '"CHOICE_ACTIVE_RESPONSE"',
    'schemaVersion: "GUANYAO_REALITY_PRODUCTION_CHOICE_SESSION_V1"',
    'sourceExperienceMode: "REAL_USER_EXPERIENCE"',
    'sourceProvenance: "REAL_USER_SESSION"',
    'stateResolverReference: "choice_experience_ui_runtime"',
    "gravitySessionReference:",
    "choiceStageState:",
    "responseGapState:",
    "alternativeResponseState:",
    "crystalReadiness:",
    "interactionAvailability:",
    "confirmedGravitySessionOnly: true",
    "existingChoiceStateResolverOnly: true",
    "reviewRuntimeResultNotExposed: true",
    "crystalReadinessOutputOnly: true",
    "userOwnedResponseOnly: true",
    "noBehaviorEngine: true",
    "noRecommendedAction: true",
    "noBestChoice: true",
    "noCrystalExecution: true",
    "noUiIntegration: true",
  ].forEach((marker) =>
    assertIncludes("Production Choice consumer contract", source.type, marker),
  );

  [
    "SelectedPressureSeedContext",
    "pressureResult:",
    "gravityResult:",
    "choiceResult:",
    "crystalResult:",
    "RenderPlan",
    "SceneModel",
    "fixture:",
  ].forEach((marker) =>
    assertExcludes(
      "Production Choice contract carries no engine result, visual, or fixture",
      source.type,
      marker,
    ),
  );

  [
    "initializeRealityProductionChoiceConsumer",
    "advanceRealityProductionChoiceConsumer",
    "resolveChoiceExperienceUIRuntime({",
    'gravitySession.choiceReadiness !== "READY"',
    "gravitySession.gravityObservationConfirmed !== true",
    'choiceStageState === "ALTERNATIVE_RESPONSE_AWARENESS"',
    'choiceStageState === "CRYSTAL_READY"',
    "gravitySessionReference.sourceReferenceId ===",
    '"CHOICE_NOT_READY"',
    '"CHOICE_ACTIVE_RESPONSE_ALREADY_CONFIRMED"',
    '"CHOICE_STATE_RESOLVER_NOT_READY"',
  ].forEach((marker) =>
    assertIncludes("Production Choice consumer service", source.service, marker),
  );

  [
    "GuanyaoRuntimeEngine",
    "resolveGravityExperienceUIRuntime",
    "initializeRealityProductionGravityConsumer",
    "advanceRealityProductionGravityConsumer",
    "reviewRealityChoiceExperienceArchitecture",
    "resolveCrystalExperienceUIRuntime",
    "ChoicePage",
    "PersonalStarBeastWebGLPrototypeHarness",
    "isolatedWebGLRendererPrototype",
    "react-router-dom",
    "useNavigate",
    "localStorage",
    "sessionStorage",
    "fetch(",
  ].forEach((marker) =>
    assertExcludes(
      "Production Choice consumer starts no upstream, engine, downstream, UI, router, or storage",
      source.service,
      marker,
    ),
  );

  assertIncludes("existing Choice resolver remains review-only", source.choiceType, "choiceSpaceReviewOnly: true");
  assertIncludes("existing Choice resolver still owns frozen transition", source.choiceService, "resolveChoiceExperienceUIRuntime");
  assertIncludes("Gravity session remains Choice-readiness-only", source.gravityType, "choiceReadinessOutputOnly: true");
  assertExcludes("Gravity consumer does not activate Choice", source.gravityService, "initializeRealityProductionChoiceConsumer");
  assertIncludes("Production Host initializes the authorized Choice consumer", source.host, "initializeRealityProductionChoiceConsumer");
  assertIncludes("Production Host advances only explicit active response", source.host, "advanceRealityProductionChoiceConsumer");
  assertIncludes("Production Host stops at Crystal readiness", source.host, '"CRYSTAL_READY_HOLD"');
  assertExcludes("Production Host does not call the review resolver directly", source.host, "resolveChoiceExperienceUIRuntime");
  assertIncludes("Prototype Harness still uses frozen Choice resolver", source.harness, "resolveChoiceExperienceUIRuntime");
  assertIncludes("Prototype Harness remains fixture-only", source.harness, 'sourceExperienceMode !== "FIXTURE_PREVIEW_ONLY"');
  assertIncludes("legacy Choice remains persistence-bound and isolated", source.legacyChoice, "writeBreachSelectionState");
  assertIncludes("Choice architecture remains non-production review", source.architecture, "noProductionIntegration: true");

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "Production Choice consumer gate is registered",
    packageJson.scripts?.["check-reality-production-choice-consumer"] ?? "",
    "node scripts/check-reality-production-choice-consumer.mjs",
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
  assertEqual("Production Choice consumer compiles independently", compileResult.errors.length, 0);
  const bundleInputs = Object.keys(compileResult.metafile.inputs);
  assertEqual(
    "Production Choice bundle includes frozen state resolver",
    bundleInputs.some((input) => input.includes("choiceExperienceUIRuntime.ts")),
    true,
  );
  for (const forbiddenInput of [
    "realityProductionGravityConsumer.ts",
    "gravityExperienceUIRuntime.ts",
    "realityChoiceExperienceArchitecture.ts",
    "crystalExperienceUIRuntime.ts",
    "ChoicePage.tsx",
    "PersonalStarBeastWebGLPrototypeHarness.tsx",
    "guanyaoRuntimeEngine",
  ]) {
    assertEqual(
      `Production Choice bundle excludes ${forbiddenInput}`,
      bundleInputs.some((input) => input.includes(forbiddenInput)),
      false,
    );
  }

  const runtime = await import(`file://${outPath}?t=${Date.now()}`);
  const gravityBoundary = Object.freeze({
    productionGravityConsumerOnly: true,
    confirmedPressureSessionOnly: true,
    existingGravityStateResolverOnly: true,
    reviewRuntimeResultNotExposed: true,
    sourceReferenceContinuityRequired: true,
    immutableSessionOnly: true,
    explicitObservationConfirmationRequired: true,
    choiceReadinessOutputOnly: true,
    noFixtureSource: true,
    noPrototypeSource: true,
    noDefaultSource: true,
    noInertiaEngine: true,
    noBehaviorScoring: true,
    noBehaviorPrediction: true,
    noUserDiagnosis: true,
    noPersonalityLabel: true,
    noPressureMutation: true,
    noChoiceExecution: true,
    noCrystalExecution: true,
    noRendererInvocation: true,
    noUiIntegration: true,
    noRouteMutation: true,
    noNavigationMutation: true,
    noStorageRead: true,
    noStorageWrite: true,
  });
  const sourceReferenceId = "launch:real-user:002.9b";
  const pressureReference = Object.freeze({
    schemaVersion: "GUANYAO_REALITY_PRODUCTION_PRESSURE_SESSION_V1",
    source: "reality_production_pressure_consumer",
    sourceReferenceId,
    pressureObservationConfirmed: true,
    gravityReadiness: "READY",
  });
  const waitingGravitySession = Object.freeze({
    schemaVersion: "GUANYAO_REALITY_PRODUCTION_GRAVITY_SESSION_V1",
    source: "reality_production_gravity_consumer",
    sourceExperienceMode: "REAL_USER_EXPERIENCE",
    sourceProvenance: "REAL_USER_SESSION",
    sourceReferenceId,
    pressureSessionReference: pressureReference,
    stateResolverReference: "gravity_experience_ui_runtime",
    gravityStageState: "AUTOMATIC_RESPONSE_AWARENESS",
    automaticResponseState: "VISIBLE",
    patternAwarenessState: "EMERGING",
    choiceReadiness: "NOT_READY",
    interactionAvailability: "GRAVITY_OBSERVATION_CONFIRM",
    gravityObservationConfirmed: false,
    boundary: gravityBoundary,
  });
  const waiting = runtime.initializeRealityProductionChoiceConsumer({
    gravitySession: waitingGravitySession,
  });
  assertEqual("unconfirmed Gravity cannot initialize Choice", waiting.status, "BLOCKED");
  assertEqual("Choice readiness failure is explicit", waiting.reason, "CHOICE_NOT_READY");

  const readyGravitySession = Object.freeze({
    ...waitingGravitySession,
    gravityStageState: "CHOICE_READY",
    automaticResponseState: "ACKNOWLEDGED",
    patternAwarenessState: "ACKNOWLEDGED",
    choiceReadiness: "READY",
    interactionAvailability: "NONE",
    gravityObservationConfirmed: true,
  });
  const initialized = runtime.initializeRealityProductionChoiceConsumer({
    gravitySession: readyGravitySession,
  });
  assertEqual("confirmed Gravity initializes Choice", initialized.status, "READY");
  assertEqual("Choice begins with alternative response awareness", initialized.session.choiceStageState, "ALTERNATIVE_RESPONSE_AWARENESS");
  assertEqual("response gap opens", initialized.session.responseGapState, "OPEN");
  assertEqual("alternative response becomes visible", initialized.session.alternativeResponseState, "VISIBLE");
  assertEqual("explicit active response is available", initialized.session.interactionAvailability, "CHOICE_ACTIVE_RESPONSE");
  assertEqual("Crystal has not started", initialized.session.crystalReadiness, "NOT_READY");
  assertEqual("source reference remains continuous", initialized.session.sourceReferenceId, sourceReferenceId);
  assertEqual("Gravity reference remains traceable", initialized.session.gravitySessionReference.sourceReferenceId, sourceReferenceId);
  assertEqual("Choice session is immutable", Object.isFrozen(initialized.session), true);
  assertEqual("Gravity reference is immutable", Object.isFrozen(initialized.session.gravitySessionReference), true);

  const advanced = runtime.advanceRealityProductionChoiceConsumer({
    session: initialized.session,
    event: "CHOICE_ACTIVE_RESPONSE",
  });
  assertEqual("explicit active response advances", advanced.status, "READY");
  assertEqual("acknowledged Choice exposes Crystal readiness", advanced.session.choiceStageState, "CRYSTAL_READY");
  assertEqual("response gap is acknowledged", advanced.session.responseGapState, "ACKNOWLEDGED");
  assertEqual("alternative response is acknowledged", advanced.session.alternativeResponseState, "ACKNOWLEDGED");
  assertEqual("Crystal is ready but not executed", advanced.session.crystalReadiness, "READY");
  assertEqual("no second Choice action exists", advanced.session.interactionAvailability, "NONE");
  assertEqual("advanced Choice session remains immutable", Object.isFrozen(advanced.session), true);

  const repeated = runtime.advanceRealityProductionChoiceConsumer({
    session: advanced.session,
    event: "CHOICE_ACTIVE_RESPONSE",
  });
  assertEqual("repeated active response is blocked", repeated.status, "BLOCKED");
  assertEqual("repeated active response reason is explicit", repeated.reason, "CHOICE_ACTIVE_RESPONSE_ALREADY_CONFIRMED");

  const forbidden = runtime.initializeRealityProductionChoiceConsumer({
    gravitySession: Object.freeze({
      ...readyGravitySession,
      sourceReferenceId: "prototype:choice",
    }),
  });
  assertEqual("prototype source cannot initialize Choice", forbidden.status, "BLOCKED");
  assertEqual("prototype source reason is explicit", forbidden.reason, "FORBIDDEN_SOURCE_REFERENCE");

  const tampered = runtime.advanceRealityProductionChoiceConsumer({
    session: {
      ...initialized.session,
      sourceReferenceId: "launch:other-session",
    },
    event: "CHOICE_ACTIVE_RESPONSE",
  });
  assertEqual("cross-session Choice state is blocked", tampered.status, "BLOCKED");
  assertEqual("cross-session Choice reason is explicit", tampered.reason, "CHOICE_SESSION_INVALID");

  for (const forbiddenOutputKey of [
    "uiRuntime",
    "reviewBoundary",
    "gravitySession",
    "gravityResult",
    "choiceResult",
    "crystalResult",
    "recommendedAction",
    "bestChoice",
  ]) {
    assertEqual(
      `Production Choice session excludes ${forbiddenOutputKey}`,
      Object.prototype.hasOwnProperty.call(initialized.session, forbiddenOutputKey),
      false,
    );
  }

  console.log("\n[REALITY PRODUCTION CHOICE CONSUMER] PASS");
} catch (error) {
  console.error("[REALITY PRODUCTION CHOICE CONSUMER] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
