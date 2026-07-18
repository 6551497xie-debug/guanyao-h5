import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  type: "src/types/genesisProductionRuntimeConsumer.ts",
  service: "src/services/genesisProductionRuntimeConsumer.ts",
  frozenTimeline: "src/services/genesisTransitionTimeline.ts",
  routeAuthorization: "src/services/genesisProductionRouteAuthorization.ts",
  page: "src/pages/GenesisProductionExperiencePage.tsx",
  host: "src/renderers/genesisProductionRendererHost.ts",
  prototype: "src/prototypes/isolatedWebGLRendererPrototype.ts",
  routes: "src/routes/guanyaoRoutes.ts",
  app: "src/App.tsx",
  launch: "src/pages/LaunchLab.tsx",
  packageManifest: "package.json",
};
const source = Object.fromEntries(
  Object.entries(paths).map(([name, file]) => [
    name,
    fs.readFileSync(path.join(rootDir, file), "utf8"),
  ]),
);
const tempDir = fs.mkdtempSync(
  path.join(os.tmpdir(), "guanyao-genesis-production-runtime-"),
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

const expectedStages = [
  "MOON_ORIGIN",
  "STAR_RIVER",
  "TIME_RESONANCE",
  "SYMBOL_REVEAL",
  "HEXAGRAM_IMPRINT",
  "LIFE_FORCE",
  "STAR_BEAST_REVEAL",
  "COMPLETION",
];
const expectedTimeline = {
  MOON_ORIGIN: ["DEEPLY_HELD", "LONG", "DEEP", "QUIET_DISSOLVE", "OBSERVATION_WINDOW"],
  STAR_RIVER: ["SLOWLY_FLOWING", "GRADUAL", "FLOW", "STEADY_EXPANSION", "OBSERVATION_WINDOW"],
  TIME_RESONANCE: ["RESPONSE_WINDOW", "PATIENT", "RESPONSE", "PATIENT_RESPONSE", "TIME_DELIVERY_WINDOW"],
  SYMBOL_REVEAL: ["SLOWLY_FLOWING", "GRADUAL", "FLOW", "GRADUAL_AGGREGATION", "OBSERVATION_WINDOW"],
  HEXAGRAM_IMPRINT: ["RESPONSE_WINDOW", "PATIENT", "RESPONSE", "SLOW_IMPRINT", "OBSERVATION_WINDOW"],
  LIFE_FORCE: ["SLOWLY_FLOWING", "GRADUAL", "FLOW", "GENTLE_AWAKENING", "OBSERVATION_WINDOW"],
  STAR_BEAST_REVEAL: ["DEEPLY_HELD", "LONG", "DEEP", "QUIET_RETURN", "OBSERVATION_WINDOW"],
  COMPLETION: ["COMPLETION_HOLD", "NO_AUTOMATIC_TRANSITION", "DEEP", "NO_AUTOMATIC_TRANSITION", "RECOGNITION_WINDOW"],
};

try {
  [
    "GenesisProductionRuntimeTrigger",
    '"AUTO_ADVANCE"',
    '"TIME_DELIVERY"',
    "GenesisProductionRuntimeSession",
    'schemaVersion: "GUANYAO_GENESIS_PRODUCTION_RUNTIME_SESSION_V1"',
    'sourceExperienceMode: "REAL_USER_EXPERIENCE"',
    'sourceProvenance: "REAL_USER_SESSION"',
    "currentStage: GenesisRuntimeStage",
    "timelineState: GenesisTransitionTimelineStage",
    'runtimeStatus: GenesisProductionRuntimeStatus',
    "immutableSessionOnly: true",
    "frozenStageOrderOnly: true",
    "frozenTimelineSemanticsOnly: true",
    "timeDeliveryOnlyInteraction: true",
    "completionRecognitionHoldRequired: true",
    "noPreviewFixture: true",
    "noVisualStateCreation: true",
    "noRenderPlanConsumption: true",
    "noEngineResult: true",
    "noRendererInvocation: true",
  ].forEach((marker) => assertIncludes("production runtime contract", source.type, marker));

  [
    "StarbeastDerivationReady",
    "LunarMotherCodeLandingResult",
    "PersonalStarBeastRenderPlan",
    "RealLifeVisualProjectionBundle",
    "GenesisRendererVisualRealization",
    "SelectedPressureSeedContext",
  ].forEach((marker) => assertExcludes("runtime session carries no life or visual payload", source.type, marker));

  [
    "export function initializeGenesisProductionRuntime",
    "export function advanceGenesisProductionRuntime",
    "const STAGE_ORDER = Object.freeze([",
    "const TIMELINE_BY_STAGE:",
    'authorizationState !== "AUTHORIZED_PRODUCTION_GENESIS"',
    'return blocked("ADVANCE", "TIME_DELIVERY_REQUIRED", session)',
    '"TIME_DELIVERY_ONLY_AT_TIME_RESONANCE"',
    '"SEQUENCE_ALREADY_AT_RECOGNITION_HOLD"',
    'stage === "COMPLETION"',
    '"RECOGNITION_HOLD" as const',
    "Object.freeze({",
  ].forEach((marker) => assertIncludes("production runtime orchestration", source.service, marker));

  for (const stage of expectedStages) {
    assertIncludes("production stage order", source.service, `"${stage}"`);
    assertIncludes("frozen timeline retains stage", source.frozenTimeline, `stage: "${stage}"`);
  }
  for (const values of Object.values(expectedTimeline)) {
    for (const value of values) {
      assertIncludes("production timeline semantic", source.service, `"${value}"`);
      assertIncludes("frozen timeline semantic", source.frozenTimeline, `"${value}"`);
    }
  }

  [
    "genesisPreviewIntegration",
    "genesisPreviewIntegrationFixture",
    "genesisVisualHarness",
    "createGenesisProductionRendererHost",
    "createGenesisWebGLRendererCore",
    "createIsolatedWebGLRendererPrototype",
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "adaptRealLifeVisualSource",
    "react-router-dom",
    "useNavigate",
    "localStorage",
    "sessionStorage",
  ].forEach((marker) => assertExcludes("runtime invokes no preview, engine, renderer, route, or storage", source.service, marker));

  assertIncludes(
    "route authorization remains upstream",
    source.routeAuthorization,
    'authorizationState: "AUTHORIZED_PRODUCTION_GENESIS"',
  );
  assertExcludes("production page connection is deferred", source.page, "genesisProductionRuntimeConsumer");
  assertExcludes("production host stays runtime blind", source.host, "genesisProductionRuntimeConsumer");
  assertIncludes(
    "prototype remains forbidden",
    source.prototype,
    'authorization.productionStatus !== "FORBIDDEN"',
  );
  assertExcludes("formal route remains unregistered", source.routes, 'genesis: "/genesis"');
  assertExcludes("app does not mount production page", source.app, "GenesisProductionExperiencePage");
  assertExcludes("launch navigation remains unchanged", source.launch, "GenesisProductionExperiencePage");

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "production runtime gate is registered",
    packageJson.scripts?.["check-genesis-production-runtime-consumer"] ?? "",
    "node scripts/check-genesis-production-runtime-consumer.mjs",
  );

  const entryPath = path.join(tempDir, "runtime-entry.ts");
  const outPath = path.join(tempDir, "runtime-entry.mjs");
  fs.writeFileSync(
    entryPath,
    [
      `export * from ${JSON.stringify(path.join(rootDir, "src/services/guanyaoLaunchOriginMotherInputAdapter.ts"))};`,
      `export * from ${JSON.stringify(path.join(rootDir, "src/services/launchLifeSourceSession.ts"))};`,
      `export * from ${JSON.stringify(path.join(rootDir, "src/services/launchLifeVisualSourceResolver.ts"))};`,
      `export * from ${JSON.stringify(path.join(rootDir, "src/services/realUserGenesisVisualSourceContext.ts"))};`,
      `export * from ${JSON.stringify(path.join(rootDir, "src/services/genesisProductionRouteAuthorization.ts"))};`,
      `export * from ${JSON.stringify(path.join(rootDir, "src/services/genesisProductionRuntimeConsumer.ts"))};`,
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

  runtime.clearRealUserGenesisVisualSourceContext();
  const sourceReferenceId = "launch:1979-04-15:子时:甘肃:兰州";
  const originResults = runtime.resolveLaunchOriginMotherSourceResults({
    birth: { year: 1979, month: 4, day: 15, hourBranch: "子时" },
    periodIndex: 0,
    geo: { province: "甘肃", city: "兰州" },
    starbeast: { nodeCount: 28, primaryNodeIndex: 6, originLightTrace: "28光兽入口" },
  });
  const sessionResult = runtime.createLaunchLifeSourceSession({
    sourceReferenceId,
    birthCoordinate: { year: 1979, month: 4, day: 15, hourBranch: "子时" },
    ...originResults,
  });
  const visualResult = runtime.resolveLaunchLifeVisualSource(sessionResult.session);
  runtime.activateRealUserGenesisVisualSourceContext({
    lifeSourceSession: sessionResult.session,
    visualSourceAdapterInput: visualResult.input,
    visualSource: visualResult.visualSource,
  });
  const routeAuthorization = runtime.authorizeGenesisProductionRoute({
    routeTarget: "/genesis",
    sourceReferenceId,
  });
  assertEqual("route is authorized", routeAuthorization.status, "READY");

  const initialized = runtime.initializeGenesisProductionRuntime({
    routeAuthorization,
  });
  assertEqual("runtime initializes", initialized.status, "READY");
  assertEqual("runtime begins at Moon", initialized.session.currentStage, "MOON_ORIGIN");
  assertEqual("runtime session is immutable", Object.isFrozen(initialized.session), true);
  assertEqual("runtime source remains continuous", initialized.session.sourceReferenceId, sourceReferenceId);

  const invalidTimeDelivery = runtime.advanceGenesisProductionRuntime({
    session: initialized.session,
    trigger: "TIME_DELIVERY",
  });
  assertEqual("time delivery outside Time is blocked", invalidTimeDelivery.reason, "TIME_DELIVERY_ONLY_AT_TIME_RESONANCE");

  const visited = [initialized.session];
  let current = initialized.session;
  for (const expectedStage of ["STAR_RIVER", "TIME_RESONANCE"]) {
    const result = runtime.advanceGenesisProductionRuntime({
      session: current,
      trigger: "AUTO_ADVANCE",
    });
    assertEqual(`advance to ${expectedStage}`, result.status, "READY");
    assertEqual(`current stage ${expectedStage}`, result.session.currentStage, expectedStage);
    current = result.session;
    visited.push(current);
  }
  assertEqual("Time exposes the only delivery interaction", current.interactionAvailability, "TIME_DELIVERY");
  const timeAutoAdvance = runtime.advanceGenesisProductionRuntime({
    session: current,
    trigger: "AUTO_ADVANCE",
  });
  assertEqual("Time cannot auto advance", timeAutoAdvance.reason, "TIME_DELIVERY_REQUIRED");

  const delivered = runtime.advanceGenesisProductionRuntime({
    session: current,
    trigger: "TIME_DELIVERY",
  });
  assertEqual("time delivery advances to Symbol", delivered.session.currentStage, "SYMBOL_REVEAL");
  current = delivered.session;
  visited.push(current);

  for (const expectedStage of [
    "HEXAGRAM_IMPRINT",
    "LIFE_FORCE",
    "STAR_BEAST_REVEAL",
    "COMPLETION",
  ]) {
    const result = runtime.advanceGenesisProductionRuntime({
      session: current,
      trigger: "AUTO_ADVANCE",
    });
    assertEqual(`advance to ${expectedStage}`, result.status, "READY");
    assertEqual(`current stage ${expectedStage}`, result.session.currentStage, expectedStage);
    current = result.session;
    visited.push(current);
  }

  assertEqual("all frozen stages are visited", visited.map((session) => session.currentStage).join(","), expectedStages.join(","));
  assertEqual("initial session was not mutated", initialized.session.currentStage, "MOON_ORIGIN");
  assertEqual("completion holds recognition", current.runtimeStatus, "RECOGNITION_HOLD");
  assertEqual("completion interaction is recognition hold", current.interactionAvailability, "RECOGNITION_HOLD");
  assertEqual("completion has no next stage", current.nextStage, null);
  const afterCompletion = runtime.advanceGenesisProductionRuntime({
    session: current,
    trigger: "AUTO_ADVANCE",
  });
  assertEqual("completion cannot advance", afterCompletion.reason, "SEQUENCE_ALREADY_AT_RECOGNITION_HOLD");

  for (const session of visited) {
    const values = expectedTimeline[session.currentStage];
    assertEqual(`${session.currentStage} timeline stage`, session.timelineState.stage, session.currentStage);
    assertEqual(`${session.currentStage} duration`, session.timelineState.stageDuration, values[0]);
    assertEqual(`${session.currentStage} transition`, session.timelineState.transitionDuration, values[1]);
    assertEqual(`${session.currentStage} rhythm`, session.timelineState.rhythmProfile, values[2]);
    assertEqual(`${session.currentStage} easing`, session.timelineState.transitionEasing, values[3]);
    assertEqual(`${session.currentStage} pause window`, session.timelineState.userPauseWindow, values[4]);
    assertEqual(`${session.currentStage} source continuity`, session.sourceReferenceId, sourceReferenceId);
  }

  console.log("\n[GENESIS PRODUCTION RUNTIME CONSUMER] PASS");
} catch (error) {
  console.error("[GENESIS PRODUCTION RUNTIME CONSUMER] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
