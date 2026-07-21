import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = Object.freeze({
  app: "src/App.tsx",
  home: "src/pages/GenesisLab.tsx",
  launch: "src/pages/LaunchLab.tsx",
  genesis: "src/pages/GenesisProductionExperiencePage.tsx",
  reality: "src/pages/RealityProductionRouteEntry.tsx",
  routes: "src/routes/guanyaoRoutes.ts",
  rendererHost: "src/renderers/genesisProductionRendererHost.ts",
  rendererCore: "src/renderers/genesisWebGLRendererCore.ts",
  engine: "src/services/guanyaoStarbeastEngineService.ts",
  packageManifest: "package.json",
});
const source = Object.fromEntries(
  Object.entries(paths).map(([name, file]) => [
    name,
    fs.readFileSync(path.join(rootDir, file), "utf8"),
  ]),
);
const assertEqual = (name, actual, expected) => {
  if (actual !== expected) {
    throw new Error(`${name} expected=${String(expected)} actual=${String(actual)}`);
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

const tempDir = fs.mkdtempSync(
  path.join(os.tmpdir(), "guanyao-genesis-manifestation-e2e-"),
);

try {
  [
    "你来到世界时，已经带着自己的生命坐标。",
    "先看见它从哪里来，再看见现实如何作用于你。",
    "进入观爻",
  ].forEach((marker) => assertIncludes("Home opens the Life Coordinate journey", source.home, marker));
  [
    'return <GenesisLab onComplete={() => navigate("/launch-lab")} />',
    'path="/launch-lab" element={<LaunchLab />} />',
    "path={GUANYAO_ROUTES.genesis}",
    "path={GUANYAO_ROUTES.reality}",
  ].forEach((marker) => assertIncludes("formal route chain is registered", source.app, marker));
  [
    'kicker: "生命坐标"',
    'bodyPrimary: "建立你的生命坐标"',
    "captureLaunchLifeSourceSession",
    "activateRealUserGenesisVisualSourceContext",
    "resolveLaunchGenesisProductionRouteHandoff",
    "navigate(handoff.routeTarget)",
  ].forEach((marker) => assertIncludes("Launch creates and hands off the real life source", source.launch, marker));
  [
    'trigger: "TIME_DELIVERY"',
    '"COORDINATE_SEEKING"',
    '"COORDINATE_FOUND"',
    '"DIRECTION_AWAKENING"',
    '"FORCE_CONDENSING"',
    '"PRESENCE_APPROACHING"',
    'trigger: "RECOGNITION_CONFIRM"',
    "activateGenesisPresenceRecognitionContinuity",
    "activateGenesisRealityPresenceContinuityContext",
    "navigate(handoff.routeTarget, {",
  ].forEach((marker) => assertIncludes("Genesis owns the complete manifestation journey", source.genesis, marker));
  [
    "readGenesisRealityPresenceContinuityContext",
    'continuityState !==\n      "CARRIED_TO_REALITY"',
    "genesisPresenceContinuityContext={genesisPresenceContinuityContext}",
  ].forEach((marker) => assertIncludes("Reality requires the recognized Presence", source.reality, marker));
  assertIncludes("formal Genesis route remains exact", source.routes, 'genesis: "/genesis"');
  assertIncludes("formal Reality route remains exact", source.routes, 'reality: "/reality"');
  assertExcludes("Renderer Host owns no E2E acceptance", source.rendererHost, "ManifestationExperienceE2EAcceptance");
  assertExcludes("Renderer Core owns no E2E acceptance", source.rendererCore, "ManifestationExperienceE2EAcceptance");
  assertExcludes("Engine owns no E2E acceptance", source.engine, "ManifestationExperienceE2EAcceptance");

  const packageJson = JSON.parse(source.packageManifest);
  assertEqual(
    "E2E acceptance gate is registered",
    packageJson.scripts?.["check-genesis-manifestation-experience-e2e-acceptance"],
    "node scripts/check-genesis-manifestation-experience-e2e-acceptance.mjs",
  );

  const entryPath = path.join(tempDir, "manifestation-e2e-entry.ts");
  const outPath = path.join(tempDir, "manifestation-e2e-entry.mjs");
  fs.writeFileSync(
    entryPath,
    [
      "src/services/guanyaoLaunchOriginMotherInputAdapter.ts",
      "src/services/launchLifeSourceSession.ts",
      "src/services/launchLifeVisualSourceResolver.ts",
      "src/services/realUserGenesisVisualSourceContext.ts",
      "src/services/launchGenesisProductionRouteHandoff.ts",
      "src/services/genesisProductionRouteAuthorization.ts",
      "src/services/genesisProductionRuntimeConsumer.ts",
      "src/services/genesisManifestationExperienceState.ts",
      "src/services/genesisStarBeastPresenceVisualRealization.ts",
      "src/services/genesisPresenceRecognitionContinuityActivation.ts",
      "src/services/genesisProductionRecognitionRealityEntry.ts",
      "src/services/genesisProductionRealityRouteHandoff.ts",
      "src/services/realityRouteActivationSourceContext.ts",
      "src/services/genesisRealityPresenceContinuityBridge.ts",
      "src/services/realityProductionRouteAuthorization.ts",
    ]
      .map((file) => `export * from ${JSON.stringify(path.join(rootDir, file))};`)
      .join("\n"),
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
  const runtime = await import(`file://${outPath}?acceptance=${Date.now()}`);

  runtime.clearRealUserGenesisVisualSourceContext();
  runtime.clearGenesisProductionRealityEntryContext();
  runtime.clearRealityRouteActivationSourceContext();
  runtime.clearGenesisRealityPresenceContinuityContext();

  const sourceReferenceId = "launch:1995-06-02:酉时:广东:广州:e2e";
  const originResults = runtime.resolveLaunchOriginMotherSourceResults({
    birth: { year: 1995, month: 6, day: 2, hourBranch: "酉时" },
    periodIndex: 0,
    geo: { province: "广东", city: "广州" },
    starbeast: {
      nodeCount: 28,
      primaryNodeIndex: 0,
      originLightTrace: "28光兽入口",
    },
  });
  const lifeSessionResult = runtime.createLaunchLifeSourceSession({
    sourceReferenceId,
    birthCoordinate: { year: 1995, month: 6, day: 2, hourBranch: "酉时" },
    ...originResults,
  });
  assertEqual("Launch creates immutable real life session", lifeSessionResult.status, "AVAILABLE");
  const visualSourceResult = runtime.resolveLaunchLifeVisualSource(lifeSessionResult.session);
  assertEqual("Launch resolves real visual source", visualSourceResult.status, "AVAILABLE");
  const visualContextResult = runtime.activateRealUserGenesisVisualSourceContext({
    lifeSourceSession: lifeSessionResult.session,
    visualSourceAdapterInput: visualSourceResult.input,
    visualSource: visualSourceResult.visualSource,
  });
  assertEqual("Launch activates real Genesis context", visualContextResult.status, "AVAILABLE");
  const launchHandoff = runtime.resolveLaunchGenesisProductionRouteHandoff({
    lifeSourceSession: lifeSessionResult.session,
  });
  assertEqual("Launch handoff is ready", launchHandoff.status, "READY");
  assertEqual("Launch targets Genesis", launchHandoff.routeTarget, "/genesis");

  const genesisAuthorization = runtime.authorizeGenesisProductionRoute({
    routeTarget: launchHandoff.routeTarget,
    sourceReferenceId,
  });
  assertEqual("Genesis production route is authorized", genesisAuthorization.status, "READY");
  let production = runtime.initializeGenesisProductionRuntime({
    routeAuthorization: genesisAuthorization,
  }).session;
  const bridge = visualSourceResult.visualSource.projectionBundle.lifeForceManifestationBridge;
  let experience = runtime.initializeGenesisManifestationExperienceState({
    runtimeSession: production,
    lifeForceManifestationBridge: bridge,
  }).session;
  const observedRuntimeStages = [production.currentStage];
  const observedExperienceStates = [experience.currentState];

  for (let index = 0; index < 2; index += 1) {
    production = runtime.advanceGenesisProductionRuntime({
      session: production,
      trigger: "AUTO_ADVANCE",
    }).session;
    observedRuntimeStages.push(production.currentStage);
  }
  assertEqual("Time waits at Time Resonance", production.currentStage, "TIME_RESONANCE");
  experience = runtime.advanceGenesisManifestationExperienceState({
    session: experience,
    runtimeSession: production,
    lifeForceManifestationBridge: bridge,
    trigger: "TIME_DELIVERY",
  }).session;
  observedExperienceStates.push(experience.currentState);
  production = runtime.advanceGenesisProductionRuntime({
    session: production,
    trigger: "TIME_DELIVERY",
  }).session;
  observedRuntimeStages.push(production.currentStage);

  for (const expectedState of ["COORDINATE_SEEKING", "COORDINATE_FOUND"]) {
    experience = runtime.advanceGenesisManifestationExperienceState({
      session: experience,
      runtimeSession: production,
      lifeForceManifestationBridge: bridge,
      trigger: "AUTO_ADVANCE",
    }).session;
    observedExperienceStates.push(experience.currentState);
    assertEqual(`${expectedState} is experienced`, experience.currentState, expectedState);
  }

  for (const expectedState of [
    "DIRECTION_AWAKENING",
    "FORCE_CONDENSING",
    "PRESENCE_APPROACHING",
  ]) {
    production = runtime.advanceGenesisProductionRuntime({
      session: production,
      trigger: "AUTO_ADVANCE",
    }).session;
    observedRuntimeStages.push(production.currentStage);
    experience = runtime.advanceGenesisManifestationExperienceState({
      session: experience,
      runtimeSession: production,
      lifeForceManifestationBridge: bridge,
      trigger: "AUTO_ADVANCE",
    }).session;
    observedExperienceStates.push(experience.currentState);
    assertEqual(`${expectedState} is experienced`, experience.currentState, expectedState);
  }

  production = runtime.advanceGenesisProductionRuntime({
    session: production,
    trigger: "AUTO_ADVANCE",
  }).session;
  observedRuntimeStages.push(production.currentStage);
  assertEqual("Genesis reaches Completion", production.currentStage, "COMPLETION");
  const recognitionInitialized = runtime.initializeGenesisProductionRecognitionRealityEntry(production);
  assertEqual("Presence meeting waits for recognition", recognitionInitialized.session.interactionAvailability, "RECOGNITION_CONFIRM");
  const presentPresence = runtime.realizeGenesisStarBeastPresence({
    runtimeSession: production,
    lifeForceManifestationBridge: bridge,
    recognitionPhase: "RECOGNITION_HOLD",
  });
  assertEqual("StarBeast is present before claim", presentPresence.realization.visualPresenceState, "PRESENT");

  const recognitionConfirmed = runtime.advanceGenesisProductionRecognitionRealityEntry(
    recognitionInitialized.session,
    "RECOGNITION_CONFIRM",
  );
  experience = runtime.advanceGenesisManifestationExperienceState({
    session: experience,
    runtimeSession: production,
    lifeForceManifestationBridge: bridge,
    trigger: "RECOGNITION_CONFIRM",
  }).session;
  observedExperienceStates.push(experience.currentState);
  const recognizedPresence = runtime.realizeGenesisStarBeastPresence({
    runtimeSession: production,
    lifeForceManifestationBridge: bridge,
    recognitionPhase: "RECOGNIZED",
  });
  const recognitionContinuity = runtime.activateGenesisPresenceRecognitionContinuity({
    manifestationExperienceSession: experience,
    presenceVisualRealization: recognizedPresence.realization,
    recognitionRealitySession: recognitionConfirmed.session,
  });
  assertEqual("explicit recognition completes Presence continuity", recognitionContinuity.status, "READY");
  assertEqual("experience reaches Presence Recognized", experience.currentState, "PRESENCE_RECOGNIZED");

  const realityEligible = runtime.advanceGenesisProductionRecognitionRealityEntry(
    recognitionConfirmed.session,
    "ENTER_REALITY",
  );
  const realityEntryContext = runtime.activateGenesisProductionRealityEntryContext(
    realityEligible.session,
  );
  const requestDateSource = runtime.captureExplicitRealityRequestDateSource({
    sourceReferenceId,
    calendarInstant: new Date("2026-07-22T12:00:00+05:30"),
  });
  const routeActivationContext = runtime.activateRealityRouteActivationSourceContext({
    realityEntryContext,
    lifeSourceSession: lifeSessionResult.session,
    requestDateSource,
  });
  assertEqual("Reality activation keeps the real life source", routeActivationContext.status, "AVAILABLE");
  const realityHandoff = runtime.resolveGenesisProductionRealityRouteHandoff({
    entryContext: realityEntryContext,
    sourceReferenceId,
  });
  assertEqual("explicit handoff targets Reality", realityHandoff.routeTarget, "/reality");
  const presenceContinuityContext = runtime.activateGenesisRealityPresenceContinuityContext({
    presenceRealization: recognizedPresence.realization,
    realityEntryContext,
  });
  assertEqual("same Presence is carried to Reality", presenceContinuityContext.bridge.continuityState, "CARRIED_TO_REALITY");
  assertEqual("Presence arrives without regeneration", presenceContinuityContext.bridge.noEntityGeneration, true);
  assertEqual("Presence reference remains continuous", presenceContinuityContext.bridge.manifestationSourceReferenceId, bridge.provenance.manifestationSourceReferenceId);
  const realityAuthorization = runtime.authorizeRealityProductionRoute({
    routeTarget: realityHandoff.routeTarget,
    sourceReferenceId,
  });
  assertEqual("Reality production route is authorized", realityAuthorization.status, "READY");
  assertEqual("Reality keeps real-user provenance", realityAuthorization.sourceContext.sourceProvenance, "REAL_USER_SESSION");
  assertEqual("Reality has not started Pressure", realityAuthorization.sourceContext.pressureRecognitionState, "NOT_STARTED");

  assertEqual(
    "runtime stages stay frozen",
    observedRuntimeStages.join(" > "),
    "MOON_ORIGIN > STAR_RIVER > TIME_RESONANCE > SYMBOL_REVEAL > HEXAGRAM_IMPRINT > LIFE_FORCE > STAR_BEAST_REVEAL > COMPLETION",
  );
  assertEqual(
    "manifestation experience stays causal",
    observedExperienceStates.join(" > "),
    "DORMANT > TIME_ACCEPTED > COORDINATE_SEEKING > COORDINATE_FOUND > DIRECTION_AWAKENING > FORCE_CONDENSING > PRESENCE_APPROACHING > PRESENCE_RECOGNIZED",
  );
  assertEqual("one source reference survives the full journey", realityAuthorization.sourceReferenceId, sourceReferenceId);

  console.log("\n[GENESIS MANIFESTATION EXPERIENCE E2E ACCEPTANCE] PASS");
} catch (error) {
  console.error("[GENESIS MANIFESTATION EXPERIENCE E2E ACCEPTANCE] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
